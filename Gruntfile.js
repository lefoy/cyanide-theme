'use strict';

// colors for terminal
require('colors');

// utility, lodash
const _ = require('lodash');
_.mixin(require('underscore.string').exports());

const bind = f => Function.prototype.apply.bind(f, null);

module.exports = grunt => {
    // Hide 'Running task' text from grunt output
    grunt.log.header = () => {};

    // Initial config
    const files  = ['package', 'colors', 'external', 'languages'];
    const config = _.object(files, _.map(files, f => grunt.file.readJSON(f + '.json')));
    const humanized = config.package.humanized;

    // General purpose functions.
    const share = (key, data) => {
            // tasks can share anything into grunt.config:
            grunt.registerTask('__taskshare', '', () => grunt.config(key, data));
            grunt.task.run('__taskshare');
        },
        header = (msg, before) => {
            !before || grunt.log.write('\n' + before.bold);
            const d = _('-').repeat(60);
            grunt.log.subhead(d + '\n' + msg.grey + '\n' + d);
        },
        generating = msg => grunt.log.subhead('Generating ' + msg + '...'),
        defaultOr = (name, base, ext) => (name === 'default' ? base : base + ' - ' + _.capitalize(name)) + (ext || ''),
        runTasks = (title, seq, fn) => { header(title); seq.forEach(fn); },
        genTasks = (title, tasks, _share) => {
            generating(title);
            _share.forEach( d => share( d[0], d[1] ) );
            grunt.task.run(tasks);
        };

    const widgetPrefix = humanized + '/Widget - ' + humanized,
        fileTypesDir = humanized + '/file_types/',
        template = path => 'templates/' + (path || ''),
        fileTypeIcon = icon => fileTypesDir + 'icon_' + icon + '.tmPreferences',
        externalRawUrl = external => "https://raw.githubusercontent.com/" + external.repo + '/' + external.version  + '/',
        externalId = external => _.slugify(external.name),
        externalTask = external => 'external-import-' + external.id,
        genColorSchemes = (copier, func) => grunt.config('colors').backgrounds.forEach( bg => {
                const renamer = _.partial(func(_.partial(defaultOr, bg.name)), '');
                share('renamer', renamer);
                share('bg', bg);
                share('replace.' + copier + '.src', [renamer() + '.tmTheme']);
                grunt.task.run(['copy:' + copier, 'replace:' + copier]);
            }),
        renameTheme = _.curry( (prefix, dest, src) =>
            grunt.config('renamer')(prefix) + '.' + _(src).strRight('.').value().replace('hidden-', '') ),
        copyTask = (sources, cwd, renamer) => ({files: [_.merge( cwd == '' ? {} : {cwd: cwd || template()}, {
                expand: true,
                flatten: true,
                src: sources,
                rename: renamer || renameTheme(humanized)
        })]}),
        replacements = r => r.map(e => ({
            from: '{{' + e[0] + '}}',
            to: _.isString(e[1]) ? '<%= ' + e[1] + ' %>' : e[1]
        })),
        replacer = (repls, overwrite, src) => ({
            overwrite: _.isUndefined(overwrite) ? true : overwrite,
            src: src || [],
            replacements: _.reduce(repls, (result, arr) => _.union(result, arr) )
        }),
        nameReplacements = replacements([['name', 'renamer(package.humanized)']]),
        bgReplacements = replacements(['rgb', 'hex'].map( v => ['bg_' + v, 'bg.' + v])),
        themesReplacements = replacements(['rgb', 'hex'].map( v => [v, 'theme.' + v]));

    // Tasks options
    const tasks = {
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
                    ['files', () => grunt.config('lang.files').map(f => '<string>' + f + '</string>').join('')]
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
    config.external.external.forEach(external => {
        external.id = externalId(external);
        const urlBase = externalRawUrl(external),
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
        grunt.registerTask(task, 'Imports ' + external.name + ' from its repository', () => {
            genTasks(external.name, ['curl:' + task], [] );
            genColorSchemes('external', func => _.partial(func, external.name));
        });
    });

    // Merge tasks options with config & load them.
    _.merge(config, tasks);
    require('load-grunt-tasks')(grunt);

    // Define grunt tasks:
    grunt.registerTask('default', []);

    // Build task:
    grunt.registerTask('build', 'Build custom themes', () => {
        header('Current version: ' + grunt.config('package.version') + '\n' +
            'Github repository: ' + grunt.config('package.repository'),
             humanized + ' Theme Builder');
        grunt.task.run(['verbosity', 'clean', 'themes', 'languages', 'external-colorschemes']);
    });

    // Import all external colorschemes task:
    grunt.registerTask('external-colorschemes', 'Imports all external from their repositories', () => {
        header('Importing external Color Schemes');
        grunt.task.run(_.map(config.external.external, externalTask));
    });

    // Languages task:
    grunt.registerTask('languages', 'Build language files', () => {
        const data = grunt.config('languages');

        // Generate icon_*.tmPreferences:
        runTasks('Building icon_*.tmPreferences files', data.icons, icon =>
            genTasks('icon_' + icon.icon + '.tmPreferences', ['replace:icons'],
                [['icon', icon], ['replace.icons.dest', fileTypeIcon(icon.icon)]]));

        // Generate *.tmLanguage:
        // runTasks('Building dummy *.tmLanguage files', data.languages, lang => {
        //     lang.include = lang.scopes.length > 1 ? lang.scopes[0] : 'text.plain';
        //     genTasks(lang.lang + '.tmLanguage', ['replace:languages'], [['lang', lang],
        //         ['replace.languages.dest', fileTypesDir + lang.lang + '.tmLanguage']]);
        // });
    });

    // Themes task:
    grunt.registerTask('themes', 'Build custom themes', () =>
        runTasks('Building theme files', grunt.config('colors').colors, theme => {
            // Generate theme & widget:
            const renamerT = _.partial(defaultOr, theme.name);
            genTasks(theme.name + ' theme', ['copy:themes', 'copy:widgets', 'replace:themes'], [
                ['renamer', renamerT], ['theme', theme], ['replace.themes.src', [
                    [humanized, '.sublime-theme'],
                    [widgetPrefix, '.stTheme'],
                    [widgetPrefix, '.sublime-settings']
                ].map(bind(renamerT))]]);

            // Generate color schemes:
            genColorSchemes('colorschemes', func => _.compose(func, _.partial(renamerT, humanized)) );
        }));

    // Load grunt config
    grunt.initConfig(config);

    // Load all npm tasks at once
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
