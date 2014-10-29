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
    var config = {
        // Read JSON files
        pkg: grunt.file.readJSON('package.json'),
        colors: grunt.file.readJSON('colors.json'),
        languages: grunt.file.readJSON('languages.json'),
    };

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

    var externalColorSchemes = {
            'monocyanide': 'centril',
            'twilightcyanide': 'centril'
        },
        importTask = function(colorscheme) {
            return 'import-' + colorscheme;
        },
        renameTheme = _.curry(function(prefix, dest, src) {
            var filename = prefix + grunt.config('renamer')('Cyanide');
            return src.replace('template', filename).replace('hidden-', '');
        }),
        themesReplacements = [{
            from: '{{name}}',
            to: '<%= renamer("Cyanide") %>'
        }, {
            from: '{{rgb}}',
            to: '<%= theme.rgb %>'
        }, {
            from: '{{hex}}',
            to: '<%= theme.hex %>'
        }];

    // Tasks options
    var tasks = {
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
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

            'Cyanide/*.stTheme',
            'Cyanide/*.sublime-settings',

            'Cyanide/file_types/icon_*.tmPreferences',

            'Monocyanide ColorScheme.CHANGES.md',
            'Monocyanide ColorScheme.LICENSE.md',
            'Twilightcyanide ColorScheme.CHANGES.md',
            'Twilightcyanide ColorScheme.LICENSE.md',
        ],
        copy: {
            colorschemes: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'templates',
                    src: ['template.hidden-tmTheme'],
                    rename: renameTheme('')
                }]
            },
            themes: {
                files: [{
                    // theme:
                    expand: true,
                    flatten: true,
                    cwd: 'templates',
                    src: ['template.sublime-theme'],
                    rename: renameTheme('')
                }, {
                    // widget:
                    expand: true,
                    flatten: true,
                    cwd: 'templates',
                    src: [
                        'template.sublime-settings',
                        'template.stTheme'
                    ],
                    rename: renameTheme('Cyanide/Widget - ')
                }]
            },
        },
        replace: {
            colorschemes: {
                overwrite: true,
                replacements: themesReplacements.concat([{
                    from: '{{bg_rgb}}',
                    to: '<%= bg.rgb %>'
                }, {
                    from: '{{bg_hex}}',
                    to: '<%= bg.hex %>'
                }])
            },
            themes: {
                overwrite: true,
                replacements: themesReplacements.concat([{
                    from: '{{widgetName}}',
                    to: '<%= renamer("Widget - Cyanide") %>'
                }])
            },
            icons: {
                src: 'templates/icon.hidden-tmPreferences',
                replacements: [{
                    from: '{{icon}}',
                    to: '<%= icon.icon %>'
                }, {
                    from: '{{scopes}}',
                    to: "<%= icon.scopes.join(', ') %>"
                }]
            },
            languages: {
                src: 'templates/language.hidden-tmLanguage',
                replacements: [{
                    from: '{{lang}}',
                    to: '<%= lang.lang %>'
                }, {
                    from: '{{scopes}}',
                    to: "<%= lang.scopes.join(', ') %>"
                }, {
                    from: '{{include}}',
                    to: '<%= lang.include %>'
                }, {
                    from: '{{files}}',
                    to: function() {
                        return grunt.config('lang.files').map(function(f) {
                            return '<string>' + f + '</string>'
                        }).join('')
                    }
                }]
            }
        },
        'curl-dir': {},
        verbosity: {
            hidden: {
                tasks: ['copy', 'clean', 'curl-dir']
            }
        }
    };

    // Add tasks for importing external colorschemes:
    _.forIn(externalColorSchemes, function(owner, colorscheme) {
        var urlBase = "https://raw.githubusercontent.com/" + owner + '/sublime-' + colorscheme + '-colorscheme/master/',
            capitalized = _(colorscheme).capitalize() + ' ColorScheme';

        tasks['curl-dir'][colorscheme] = {
            src: [urlBase + '{' + capitalized + '.tmTheme,LICENSE.md,CHANGES.md}'],
            dest: './',
            router: function(url) {
                return _(url).strRightBack('/').value().replace(/(\w+)\.md$/, capitalized + '.$1.md');
            }
        };

        grunt.registerTask(importTask(colorscheme), 'Imports ' + capitalized + ' from its repository', function() {
            generating(capitalized);
            grunt.task.run('curl-dir:' + colorscheme);
        });
    });

    // Merge tasks options with config
    _.merge(config, tasks);

    require('load-grunt-tasks')(grunt);

    // Define grunt tasks:
    grunt.registerTask('default', []);

    // Build task:
    grunt.registerTask('build', 'Build custom themes', function() {
        header('Current version: ' + grunt.config('pkg.version') + '\n' +
            'Github repository: https://github.com/lefoy/cyanide-theme',
            'Cyanide Theme Builder');
        grunt.task.run(['verbosity', 'clean', 'themes', 'languages', 'external-colorschemes']);
    });

    // Import all external colorschemes task:
    grunt.registerTask('external-colorschemes', 'Imports all external from their repositories', function() {
        header('Importing external Color Schemes');
        grunt.task.run(_.map(_.keys(externalColorSchemes), importTask));
    });

    // Languages task:
    grunt.registerTask('languages', 'Build language files', function() {
        var data = grunt.config('languages');

        header('Building icon_*.tmPreferences files');

        // Generate icon_*.tmPreferences:
        data.icons.forEach(function(icon) {
            generating('icon_' + icon.icon + '.tmPreferences');
            share('icon', icon);
            share('replace.icons.dest', 'Cyanide/file_types/icon_' + icon.icon + '.tmPreferences');
            grunt.task.run('replace:icons');
        });

        header('Building dummy *.tmLanguage files');

        // Generate *.tmLanguage:
        data.languages.forEach(function(lang) {
            generating(lang.lang + '.tmLanguage');
            lang.include = lang.scopes.length > 1 ? lang.scopes[0] : '';
            share('lang', lang);
            share('replace.languages.dest', 'Cyanide/file_types/' + lang.lang + '.tmLanguage');
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
                ['Cyanide', '.sublime-theme'],
                ['Cyanide/Widget - Cyanide', '.stTheme'],
                ['Cyanide/Widget - Cyanide', '.sublime-settings']
            ].map(bind(renamerT)));
            grunt.task.run(['copy:themes', 'replace:themes']);

            // Generate color schemes:
            colors.backgrounds.forEach(function(bg) {
                var renamerB = _.partial(defaultOr, bg.name);
                share('renamer', _.compose(renamerB, renamerT));
                share('bg', bg);
                share('replace.colorschemes.src', [renamerT('Cyanide', renamerB('') + '.tmTheme')]);
                grunt.task.run(['copy:colorschemes', 'replace:colorschemes']);
            });
        });
    });

    // Load grunt config
    grunt.initConfig(config);

    // Load all npm tasks at once
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
