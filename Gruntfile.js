'use strict';

module.exports = function(grunt) {

    // Hide 'Running task' text from grunt output
    grunt.log.header = function() {};

    // Initial config
    var config = {

        // Read JSON files
        pkg: grunt.file.readJSON('package.json'),
        colors: grunt.file.readJSON('colors.json')

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
            'Cyanide/*.sublime-settings'
        ],

        // Copy task
        copy: {
            theme: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'templates',
                    src: [
                        'template.sublime-theme',
                        'template.hidden-tmTheme'
                    ],
                    rename: function(dest, src) {
                        var filename,
                            name = grunt.config.get('name');

                        if (name === 'default') {
                            filename = 'Cyanide';
                        } else {
                            filename = 'Cyanide - ' + grunt.config.get('name');
                        }

                        return src.replace('template', filename).replace('hidden-', '');
                    }
                }]
            },
            widgets: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'templates',
                    src: [
                        'template.sublime-settings',
                        'template.stTheme'
                    ],
                    rename: function(dest, src) {
                        var filename,
                            name = grunt.config.get('name');

                        if (name === 'default') {
                            filename = 'Cyanide/Widget - Cyanide';
                        } else {
                            filename = 'Cyanide/Widget - Cyanide - ' + grunt.config.get('name');
                        }

                        return src.replace('template', filename).replace('hidden-', '');
                    }
                }]
            }
        },

        // Replace task
        replace: {
            themes: {
                overwrite: true
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

        var colorsJSON = grunt.config.get('colors'),
            message = '\nCyanide Theme Builder' + '\n' + '\n' +
            '----------------------------------------------------------' + '\n' +
            'Current version: ' + grunt.config.get('pkg.version') + '\n' +
            'Github repository: https://github.com/lefoy/cyanide-theme' + '\n' +
            '----------------------------------------------------------';

        grunt.log.subhead(message);
        grunt.task.run('clean');

        for (var i = 0, l = colorsJSON.colors.length; i < l; i++) {
            grunt.task.run([
                'setName:' + colorsJSON.colors[i].name,
                'setColors:' + colorsJSON.colors[i].name + ':' + colorsJSON.colors[i].rgb + ':' + colorsJSON.colors[i].hex,
                'copy',
                'replace'
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

        var replacements = [{
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
