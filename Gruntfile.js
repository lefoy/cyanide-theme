'use strict';

// colors for terminal
require('colors');

// utility, lodash
var _ = require('lodash');
_.mixin(require('underscore.string').exports());

var bind = function(f) {
    return Function.prototype.apply.bind(f, null);
}

module.exports = function(grunt) {
    // Hide 'Running task' text from grunt output
    grunt.log.header = function() {};

    // Initial config
    var files  = ['package', 'colors', 'external', 'languages'];
    var config = _.object(files, _.map(files, function(f) {
        return grunt.file.readJSON(f + '.json');
    }));

    var humanized = config.package.humanized;

    // General purpose functions.
    var share = function(key, data) {
            // tasks can share anything into grunt.config:
            grunt.registerTask('__taskshare', '', function() {
                grunt.config(key, data);
            });
            grunt.task.run('__taskshare');
        },
        header = function(msg, before) {
            !before || grunt.log.write('\n' + before.bold);
            var d = _('-').repeat(60);
            grunt.log.subhead(d + '\n' + msg.grey + '\n' + d);
        },
        generating = function(msg) {
            grunt.log.subhead('Generating ' + msg + '...');
        },
        defaultOr = function(name, base, ext) {
            return (name === 'default' ? base : base + ' - ' + _.capitalize(name)) + (ext || '');
        };

    var widgetPrefix = humanized + '/Widget - ' + humanized,
        fileTypesDir = humanized + '/file_types/',
        template = function(path) {
            return 'templates/' + (path || '');
        },
        fileTypeIcon = function(icon) {
            return fileTypesDir + 'icon_' + icon + '.tmPreferences';
        },
        externalRawUrl = function(external) {
            return "https://raw.githubusercontent.com/" + external.repo + '/' + external.version  + '/';
        },
        externalId = function(external) {
            return _.slugify(external.name);
        },
        externalTask = function(external) {
            return 'external-import-' + external.id;
        },
        genColorSchemes = function(copier, func) {
            var colors = grunt.config('colors');
            colors.backgrounds.forEach(function(bg) {
                var renamer = _.partial(func(_.partial(defaultOr, bg.name)), '');
                share('renamer', renamer);
                share('bg', bg);
                share('replace.' + copier + '.src', [renamer() + '.tmTheme']);
                grunt.task.run(['copy:' + copier, 'replace:' + copier]);
            });
        },
        renameTheme = _.curry(function(prefix, dest, src) {
            var ext = _(src).strRight('.').value().replace('hidden-', '');
            return grunt.config('renamer')(prefix) + '.' + ext;
        }),
        copyTask = function(sources, cwd, renamer) {
            var f = {
                expand: true,
                flatten: true,
                src: sources,
                rename: renamer || renameTheme(humanized)
            };
            if ( cwd !== '' ) {
                f.cwd = cwd || template();
            }
            return {files: [f]};
        },
        replacements = function(r) {
            return r.map(function(e) {
                return {
                    from: '{{' + e[0] + '}}',
                    to: _.isString(e[1]) ? '<%= ' + e[1] + ' %>' : e[1]
                };
            });
        },
        replacer = function(repls, overwrite, src) {
            return {
                overwrite: _.isUndefined(overwrite) ? true : overwrite,
                src: src || [],
                replacements: _.reduce(repls, function(result, arr) {
                    return _.union(result, arr);
                })
            }
        },
        nameReplacements = replacements([['name', 'renamer(package.humanized)']]),
        bgReplacements = replacements([
            ['bg_rgb', 'bg.rgb'],
            ['bg_hex', 'bg.hex']
        ]),
        themesReplacements = replacements([
            ['rgb', 'theme.rgb'],
            ['hex', 'theme.hex']
        ]);

    // Tasks options
    var tasks = {
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['package'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
            }
        },
        clean: [
            '*.sublime-theme',
            '*.tmTheme',
            humanized + '/*.stTheme',
            humanized + '/*.sublime-settings',
            fileTypeIcon('*'),
            'build/'
        ],
        copy: {
            external: copyTask([], '' ),
            colorschemes: copyTask('template.hidden-tmTheme'),
            themes: copyTask('template.sublime-theme'),
            widgets: copyTask(['template.sublime-settings', 'template.stTheme'], template(), renameTheme(widgetPrefix))
        },
        replace: {
            external: replacer( [nameReplacements, bgReplacements] ),
            colorschemes: replacer( [nameReplacements, bgReplacements, themesReplacements] ),
            themes: replacer([nameReplacements, themesReplacements, replacements([
                ['widgetName', 'renamer("Widget - " + package.humanized)']])]),
            icons: replacer(
                [replacements([['icon', 'icon.icon'], ['scopes', "icon.scopes.join(', ')"]])],
                false, template('icon.hidden-tmPreferences')),
            languages: replacer([replacements([
                    ['lang', 'lang.lang'],
                    ['scopes', "lang.scopes.join(', ')"],
                    ['include', 'lang.include'],
                    ['files', function() {
                        return grunt.config('lang.files').map(function(f) {
                            return '<string>' + f + '</string>'
                        }).join('')
                    }]
                ])],
                false, template('language.hidden-tmLanguage'))
        },
        'curl': {},
        verbosity: {
            hidden: {
                tasks: ['copy', 'clean', 'curl']
            }
        }
    };

    // Add tasks for importing external colorschemes:
    config.external.external.forEach(function(external) {
        external.id = externalId(external);
        var urlBase = externalRawUrl(external),
            task    = externalTask(external),
            dest    = 'build/' + external.id + '.hidden-tmTheme',
            src     = template('template.hidden-tmTheme');

        // Setup copy & curl tasks:
        tasks.copy.external.files[0].src.push(dest);
        tasks['curl'][task] = {
            dest: dest,
            src: urlBase + src
        };

        // Setup generation task:
        grunt.registerTask(task, 'Imports ' + external.name + ' from its repository', function() {
            generating(external.name);
            grunt.task.run('curl:' + task);
            genColorSchemes('external', function(func) {
                return _.partial(func, external.name);
            });
        });
    });

    // Merge tasks options with config & load them.
    _.merge(config, tasks);
    require('load-grunt-tasks')(grunt);

    // Define grunt tasks:
    grunt.registerTask('default', []);

    // Build task:
    grunt.registerTask('build', 'Build custom themes', function() {
        header('Current version: ' + grunt.config('package.version') + '\n' +
            'Github repository: ' + grunt.config('package.repository'),
             humanized + ' Theme Builder');
        grunt.task.run(['verbosity', 'clean', 'themes', 'languages', 'external-colorschemes']);
    });

    // Import all external colorschemes task:
    grunt.registerTask('external-colorschemes', 'Imports all external from their repositories', function() {
        header('Importing external Color Schemes');
        grunt.task.run(_.map(config.external.external, externalTask));
    });

    // Languages task:
    grunt.registerTask('languages', 'Build language files', function() {
        var data = grunt.config('languages');

        header('Building icon_*.tmPreferences files');

        // Generate icon_*.tmPreferences:
        data.icons.forEach(function(icon) {
            generating('icon_' + icon.icon + '.tmPreferences');
            share('icon', icon);
            share('replace.icons.dest', fileTypeIcon(icon.icon));
            grunt.task.run('replace:icons');
        });

        header('Building dummy *.tmLanguage files');

        // Generate *.tmLanguage:
        data.languages.forEach(function(lang) {
            generating(lang.lang + '.tmLanguage');
            lang.include = lang.scopes.length > 1 ? lang.scopes[0] : 'text.plain';
            share('lang', lang);
            share('replace.languages.dest', fileTypesDir + lang.lang + '.tmLanguage');
            grunt.task.run('replace:languages');
        });
    });

    // Themes task:
    grunt.registerTask('themes', 'Build custom themes', function() {
        header('Building theme files');

        var colors = grunt.config('colors');
        colors.colors.forEach(function(theme) {
            generating(theme.name + ' theme');

            // Generate theme & widget:
            var renamerT = _.partial(defaultOr, theme.name);
            share('renamer', renamerT);
            share('theme', theme);
            share('replace.themes.src', [
                [humanized, '.sublime-theme'],
                [widgetPrefix, '.stTheme'],
                [widgetPrefix, '.sublime-settings']
            ].map(bind(renamerT)));
            grunt.task.run(['copy:themes', 'copy:widgets', 'replace:themes']);

            // Generate color schemes:
            var renamerC = _.partial(renamerT, humanized);
            genColorSchemes('colorschemes', function(func) {
                return _.compose(func, renamerC);
            });
        });
    });

    // Load grunt config
    grunt.initConfig(config);

    // Load all npm tasks at once
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
