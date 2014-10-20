'use strict';

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
            var name = grunt.config.get('name'),
            filename = prefix + (name === 'default' ? 'Cyanide' : 'Cyanide - ' + name);
            return src.replace('template', filename).replace('hidden-', '');
        },
        renameLanguage = function(language) {
            return 'Cyanide/file_types/icon_' + language + '.tmPreferences';
        }

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
                overwrite: true
            },
            languages: {
                src: 'templates/icon.hidden-tmPreferences',
                replacements: [
                    {
                        from: '{{icon}}',
                        to: function(matchedWord) {
                            return grunt.config.get('icon')
                        }
                    },
                    {
                        from: '{{scopes}}',
                        to: function(matchedWord) {
                            return grunt.config.get('scopes')
                        }
                    }
                ]
            }
        }

    };

    // Merge tasks options with config
    grunt.util._.merge(config, tasks);

    require('load-grunt-tasks')(grunt);

    // Define grunt tasks
    grunt.registerTask('default', []);

    // Validate task
    grunt.registerTask('build', 'Build custom themes', function() {
        var message = '\nCyanide Theme Builder' + '\n' + '\n' +
            '----------------------------------------------------------' + '\n' +
            'Current version: ' + grunt.config.get('pkg.version') + '\n' +
            'Github repository: https://github.com/lefoy/cyanide-theme' + '\n' +
            '----------------------------------------------------------' + '\n';

        grunt.log.subhead(message)
        grunt.task.run('clean');

        grunt.task.run('themes');
        grunt.task.run('languages')
    });

    // Languages task:
    grunt.registerTask('languages', 'Build language files', function() {
        var message =
            '----------------------------------------------------------'
             + '\n' + 'Building icon language files' + '\n' +
            '----------------------------------------------------------';
        grunt.log.subhead(message);

        var languagesJSON = grunt.config.get('languages').languages;

        for (var i = 0, l = languagesJSON.length; i < l; i++) {
            var icon = languagesJSON[i].icon,
                scopes = languagesJSON[i].scopes.join(',');

            grunt.log.subhead('Generating ' + icon + ' icon-preference-file...');

            grunt.task.run([
                'setConfig:icon:' + icon,
                'setConfig:scopes:' + scopes,
                'setConfig:replace.languages.dest:' + renameLanguage( icon ),
                'replace:languages'
            ]);
        }
    });

    grunt.registerTask('setConfig', 'Set config property', function(key, value) {

        grunt.config.set(key, value);

    });

    // Themes task:
    grunt.registerTask('themes', 'Build custom themes', function() {

        var message =
            '----------------------------------------------------------'
             + '\n' + 'Building theme files' + '\n' +
            '----------------------------------------------------------';
        grunt.log.subhead(message);

        var colorsJSON = grunt.config.get('colors').colors;

        for (var i = 0, l = colorsJSON.length; i < l; i++) {
            var colors = colorsJSON[i].name + ':' +
                colorsJSON[i].rgb + ':' +
                colorsJSON[i].hex;

            grunt.task.run([
                'setName:' + colorsJSON[i].name,
                'setColors:' + colors,
                'copy:themes',
                'replace:themes'
            ]);
        }

    });

    // Set theme name
    grunt.registerTask('setName', 'Set theme name', function(name) {

        if (name === 'default') {
            var src = [
                'Cyanide.sublime-theme',
                'Cyanide.tmTheme',
                'Cyanide/Widget - Cyanide.stTheme',
                'Cyanide/Widget - Cyanide.sublime-settings'
            ];
        } else {
            var src = [
                'Cyanide - ' + name + '.sublime-theme',
                'Cyanide - ' + name + '.tmTheme',
                'Cyanide/Widget - Cyanide - ' + name + '.stTheme',
                'Cyanide/Widget - Cyanide - ' + name + '.sublime-settings'
            ];
        }

        grunt.log.subhead('Generating ' + name + ' theme...');

        grunt.config.set('name', name);
        grunt.config.set('replace.themes.src', src);

    });

    // Set theme color
    grunt.registerTask('setColors', 'Set RGB color', function(name, rgb, hex) {

        var widgetName = (name === 'default' ? 'Widget - Cyanide' : 'Widget - Cyanide - ' + name),
            replacements = [{
                from: '{{widgetName}}',
                to: widgetName
            }, {
                from: '{{name}}',
                to: name
            }, {
                from: '{{rgb}}',
                to: rgb
            }, {
                from: '{{hex}}',
                to: hex
            }];

        grunt.config.set('replace.themes.replacements', replacements);
    });

    // Load grunt config
    grunt.initConfig(config);

    // Load all npm tasks at once
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};
