'use strict';

require('colors');

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

    var renameTheme = function(src, prefix) {
            var name = grunt.config('theme.name'),
            filename = prefix + (name === 'default' ? 'Cyanide' : 'Cyanide - ' + name);
            return src.replace('template', filename).replace('hidden-', '');
        },
        renameLanguage = function(language) {
            return 'Cyanide/file_types/icon_' + language + '.tmPreferences';
        },
        share = function(key, data) {
            // tasks can share anything into grunt.config:
            grunt.registerTask('__taskshare', '', function() {
                grunt.config(key, data);
            });
            grunt.task.run('__taskshare');
        },
        header = function(msg, before) {
            !before || grunt.log.write( '\n' + before.bold.yellow );
            var d  = grunt.util.repeat(60, '-');
            grunt.log.subhead( d + '\n' + msg.cyan + '\n' + d );
        };

    // Tasks options
    var tasks = {

        // Bump task
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

        // Clean task
        clean: [
            '*.sublime-theme',
            '*.tmTheme',

            'Cyanide/*.stTheme',
            'Cyanide/*.sublime-settings',

            'Cyanide/file_types/icon_*.tmPreferences'
        ],

        // Copy task
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

        // Replace task
        replace: {
            themes: {
                overwrite: true,
                replacements: [
                    {from: '{{name}}',       to: '<%= theme.name %>'},
                    {from: '{{rgb}}',        to: '<%= theme.rgb %>'},
                    {from: '{{hex}}',        to: '<%= theme.hex %>'},
                    {from: '{{widgetName}}', to: '<%= theme.widgetName %>'}
                ]
            },
            icons: {
                src: 'templates/icon.hidden-tmPreferences',
                replacements: [
                    {from: '{{icon}}',       to: '<%= icon.icon %>'},
                    {from: '{{scopes}}',     to: "<%= icon.scopes.join(',') %>"}
                ]
            }
        }

    };

    // Merge tasks options with config
    grunt.util._.merge(config, tasks);

    require('load-grunt-tasks')(grunt);

    // Define grunt tasks:
    grunt.registerTask('default', []);

    // Validate task
    grunt.registerTask('build', 'Build custom themes', function() {
        header( 'Current version: ' + grunt.config('pkg.version') + '\n' +
                'Github repository: https://github.com/lefoy/cyanide-theme',
                'Cyanide Theme Builder');
        grunt.log.writeln();
        grunt.task.run(['clean', 'themes', 'languages']);
    });

    // Languages task:
    grunt.registerTask('languages', 'Build language files', function() {
        header( 'Building icon language files' );
        var data = grunt.config('languages');

        // Generate icon tmPreferences:
        data.icons.forEach(function(elem) {
            grunt.log.subhead('Generating ' + elem.icon + ' icon-preference-file...');
            share('icon', elem);
            share('replace.languages.dest', renameLanguage( elem.icon ));
            grunt.task.run('replace:icons');
        });

    });

    // Themes task:
    grunt.registerTask('themes', 'Build custom themes', function() {
        header( 'Building theme files' );
        grunt.config('colors').colors.forEach(function(elem) {
            grunt.log.subhead('Generating ' + elem.name + ' theme...');

            elem.widgetName = elem.name === 'default'
                            ? 'Widget - Cyanide'
                            : 'Widget - Cyanide - ' + elem.name;

            if (elem.name === 'default') {
                var src = [
                    'Cyanide.sublime-theme',
                    'Cyanide.tmTheme',
                    'Cyanide/Widget - Cyanide.stTheme',
                    'Cyanide/Widget - Cyanide.sublime-settings'
                ];
            } else {
                var src = [
                    'Cyanide - ' + elem.name + '.sublime-theme',
                    'Cyanide - ' + elem.name + '.tmTheme',
                    'Cyanide/Widget - Cyanide - ' + elem.name + '.stTheme',
                    'Cyanide/Widget - Cyanide - ' + elem.name + '.sublime-settings'
                ];
            }

            share('theme', elem);
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
