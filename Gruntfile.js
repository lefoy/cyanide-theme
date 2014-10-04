module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json'),
        currentVersion = pkg.version;

    // Project configuration.
    grunt.initConfig({
        pkg: pkg,

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

        exec: {
            build: {
                cmd: 'jekyll build --safe'
            },
            serve: {
                cmd: 'jekyll serve --safe'
            }
        },

        concurrent: {
            jekyll: {
                tasks: ['exec:serve', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        watch: {
            jekyll: {
                files: [
                    '*.{html, md, yml, js}',
                    '_includes/**/*.{html, md, yml, js, scss}',
                    '_layouts/**/*.{html, md, yml, js, scss}',
                    '_posts/**/*.{html, md, yml, js, scss}',
                    '_scss/**/*.{html, md, yml, js, scss}'
                ],
                tasks: ['exec:build']
            }
        }
    });

    // Load all npm tasks at once
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Tasks
    grunt.registerTask('default', ['concurrent:jekyll']);

};
