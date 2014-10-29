'use strict';

// colors for terminal
require('colors');

// utility, lodash
var _ = require('lodash');
_.mixin(require('underscore.string').exports());

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

    var externalColorSchemes = {
        'monocyanide': 'centril',
        'twilightcyanide': 'centril'
    };

    var renameTheme = function(src, prefix) {
            var name = grunt.config('theme.name'),
                filename = prefix + (name === 'default' ? 'Cyanide' : 'Cyanide - ' + name);
            return src.replace('template', filename).replace('hidden-', '');
        },
        // tasks can share anything into grunt.config:
        share = function(key, data) {
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
        };

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
            themes: {
                files: [
                    // theme:
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'templates',
                        src: [
                            'template.sublime-theme',
                            'template.hidden-tmTheme'
                        ],
                        rename: function(dest, src) {
                            return renameTheme(src, '');
                        }
                    },
                    // widget:
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'templates',
                        src: [
                            'template.sublime-settings',
                            'template.stTheme'
                        ],
                        rename: function(dest, src) {
                            return renameTheme(src, 'Cyanide/Widget - ');
                        }
                    }
                ]
            },
        },
        replace: {
            themes: {
                overwrite: true,
                replacements: [{
                    from: '{{name}}',
                    to: '<%= theme.name %>'
                }, {
                    from: '{{rgb}}',
                    to: '<%= theme.rgb %>'
                }, {
                    from: '{{hex}}',
                    to: '<%= theme.hex %>'
                }, {
                    from: '{{widgetName}}',
                    to: '<%= theme.widgetName %>'
                }]
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

    _.forIn(externalColorSchemes, function(owner, colorscheme) {
        var urlBase = "https://raw.githubusercontent.com/" + owner + '/sublime-' + colorscheme + '-colorscheme/master/',
            capitalized = _(colorscheme).capitalize() + ' ColorScheme';

        tasks['curl-dir'][colorscheme] = {
            src: [urlBase + '{' + capitalized + '.tmTheme,LICENSE.md,CHANGES.md}'],
            dest: './',
            router: function(url) {
                var fn = url.replace(/^.*[\\\/]/, '');
                return fn.replace(/(\w+)\.md$/, capitalized + '.$1.md');
            }
        };

        // register task:
        grunt.registerTask('import-' + colorscheme, 'Imports ' + capitalized + ' from its repository', function() {
            generating(capitalized);
            grunt.task.run('curl-dir:' + colorscheme);
        });
    });

    // Merge tasks options with config
    grunt.util._.merge(config, tasks);

    require('load-grunt-tasks')(grunt);

    // Define grunt tasks:
    grunt.registerTask('default', []);

    // Validate task
    grunt.registerTask('build', 'Build custom themes', function() {
        header('Current version: ' + grunt.config('pkg.version') + '\n' +
            'Github repository: https://github.com/lefoy/cyanide-theme',
            'Cyanide Theme Builder');
        grunt.task.run(['verbosity', 'clean', 'themes', 'languages', 'external-colorschemes']);
    });

    // Import all external colorschemes task:
    grunt.registerTask('external-colorschemes', 'Imports all external from their repositories', function() {
        header('Importing external Color Schemes');
        grunt.task.run(_.map(_.keys(externalColorSchemes), function(c) { return 'import-' + c }));
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
        grunt.config('colors').colors.forEach(function(theme) {
            generating(theme.name + ' theme');

            theme.widgetName = theme.name === 'default' ? 'Widget - Cyanide' : 'Widget - Cyanide - ' + theme.name;

            if (theme.name === 'default') {
                var src = [
                    'Cyanide.sublime-theme',
                    'Cyanide.tmTheme',
                    'Cyanide/Widget - Cyanide.stTheme',
                    'Cyanide/Widget - Cyanide.sublime-settings'
                ];
            } else {
                var src = [
                    'Cyanide - ' + theme.name + '.sublime-theme',
                    'Cyanide - ' + theme.name + '.tmTheme',
                    'Cyanide/Widget - Cyanide - ' + theme.name + '.stTheme',
                    'Cyanide/Widget - Cyanide - ' + theme.name + '.sublime-settings'
                ];
            }

            share('theme', theme);
            share('replace.themes.src', src);
            grunt.task.run([
                'copy:themes',
                'replace:themes'
            ]);
        });
    });

    // Load grunt config
    grunt.initConfig(config);

    // Load all npm tasks at once
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
