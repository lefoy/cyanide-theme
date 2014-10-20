Cyanide Theme for Sublime Text
------------------------------------------------------------------------

[![Build Status](https://travis-ci.org/lefoy/cyanide-theme.svg?branch=master)](https://travis-ci.org/lefoy/cyanide-theme)

A minimal dark theme for Sublime Text 3.

**NEW: [Cyanide Theme Builder](https://github.com/lefoy/cyanide-theme#cyanide-theme-builder)**

![Default Theme Screenshot](http://i.imgur.com/NOOomrQ.png)

![Acid Theme Screenshot](http://i.imgur.com/snmvuB4.png)

![Contrasted UI Screenshot](http://i.imgur.com/cfYkL92.png)

Installation
------------------------------------------------------------------------

### Package Control

Install the theme with the command palette and update your `Settings - User` file.

    "color_scheme": "Packages/Theme - Cyanide/Cyanide.tmTheme",
    "theme": "Cyanide.sublime-theme"

### Manual

Clone the theme inside your packages folder. Be sure that the name of the folder is `Theme - Cyanide`.

    cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/
    git clone git@github.com:lefoy/cyanide-theme.git 'Theme - Cyanide'

Update your `Settings - User` file to activate the theme.

    "color_scheme": "Packages/Theme - Cyanide/Cyanide.tmTheme",
    "theme": "Cyanide.sublime-theme"

Themes
------------------------------------------------------------------------

### Acid theme

![Acid screenshot](http://i.imgur.com/GbB80Aj.png)

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Acid.tmTheme",
    "theme": "Cyanide - Acid.sublime-theme"

### Alert theme

![Alert screenshot](http://i.imgur.com/fSXNPYH.png)

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Alert.tmTheme",
    "theme": "Cyanide - Alert.sublime-theme"

### Golden theme

![Golden screenshot](http://i.imgur.com/XpNt7rM.png)

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Golden.tmTheme",
    "theme": "Cyanide - Golden.sublime-theme"

### Love theme

![Love screenshot](http://i.imgur.com/cJPqBtT.png)

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Love.tmTheme",
    "theme": "Cyanide - Love.sublime-theme"

### Mint theme

![Mint screenshot](http://i.imgur.com/9PkgNGu.png)

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Mint.tmTheme",
    "theme": "Cyanide - Mint.sublime-theme"

### Purple theme

![Purple screenshot](http://i.imgur.com/YT1QGvH.png)

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Purple.tmTheme",
    "theme": "Cyanide - Purple.sublime-theme"

### Salmon theme

![Salmon screenshot](http://i.imgur.com/1SO5oms.png)

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Salmon.tmTheme",
    "theme": "Cyanide - Salmon.sublime-theme"

### Sky theme

![Sky screenshot](http://i.imgur.com/L8egKdc.png)

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Sky.tmTheme",
    "theme": "Cyanide - Sky.sublime-theme"

### Wood theme

![Wood screenshot](http://i.imgur.com/zTc44p7.png)

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Wood.tmTheme",
    "theme": "Cyanide - Wood.sublime-theme"


Settings
------------------------------------------------------------------------

### Centurion sidebar folder icons

![Sidebar folder icons](http://i.imgur.com/QVwmrGh.png)

You can change the sidebar folder icons to use the one from the Centurion theme. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

```
"centurion_folder_icons": true
```

### Afterglow sidebar folder icons

![Sidebar folder icons](http://i.imgur.com/Ov5hnv2.png)

You can change the sidebar folder icons to use the one from the Afterglow theme. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

```
"afterglow_folder_icons": true
```

### Spacefunk sidebar folder icons

![Sidebar folder icons](http://i.imgur.com/Xz2FqEG.png)

You can change the sidebar folder icons to use the one from the Spacefunk theme. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

```
"spacefunk_folder_icons": true
```

### Tabs height

![Tabs height](http://i.imgur.com/0NCrXVF.png)

You can change tabs height with `tabs_medium` and `tabs_large` settings. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

```
"tabs_medium": true
```

or

```
"tabs_large": true
```

### Contrasted UI

![Contrasted UI](http://i.imgur.com/cfYkL92.png)

You can change the color of the sidebar and tabs to contrast the editor. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

```
"contrasted_sidebar": true,
"contrasted_tabs": true,
"contrasted_quick_panel": true
```

You can also use these settings to make the UI even much lighter.

```
"contrasted_light_sidebar": true,
"contrasted_light_tabs": true,
"contrasted_light_quick_panel": true
```

## Custom UI font

You can change the UI font with these settings:

```
"ubuntu_mono_ui": true // Ubuntu Mono UI font
"monaco_ui": true // Monaco UI font
"inconsolata_ui": true // Inconsolata UI font
```

## Cyanide Theme Builder

*You must install the Cyanide theme manually if you want to use the Cyanide Theme Builder.*

You can create your own custom Cyanide theme with the theme builder. First, you need to have [grunt](http://gruntjs.com/) installed on your computer. After you have installed grunt, go to your local Cyanide theme folder and run this command:

```
npm install
```

Now that you have everything installed, you can edit the `colors.json` file to add your own custom color. After you saved the file, run the `grunt build` command and your theme will be generated. You can now update your Sublime Text settings to use your new theme.

*More information about the theme builder will be added soon. Meanwhile, you can open an issue on GitHub and I will be happy to help you.*

## Known issues

### Ubuntu Mono UI cuts off the tabs font

![Screenshot - Ubuntu Mono UI cuts off the tabs font](http://i.imgur.com/jdKUPoE.png)

Unfortunatly, this a Sublime Text bug and it hasn't been fixed yet. To temporarely fix this issue, you can add the setting `"small_ui_font": true` inside your setting file. If this setting doesn't fix the bug, please fill a new issue on GitHub.

## Plugins support

This theme currently support these Sublime Text plugins:

* [GitGutter](https://sublime.wbond.net/packages/GitGutter)
* [SublimeLinter3](https://github.com/SublimeLinter/SublimeLinter3)

<!--* [PlainTasks](https://sublime.wbond.net/packages/PlainTasks)-->
<!--* [FileBrowser](https://sublime.wbond.net/packages/FileBrowser)-->

## Custom themes

If you want a custom color, please create a new issue and I will be happy to create one for you.
I'm working on a grunt task to create custom color theme from the command line.

Credit
------------------------------------------------------------------------

This theme is based on [Centurion](https://github.com/allanhortle/Centurion), [Afterglow](http://yabatadesign.github.io/afterglow-theme/). and [Spacefunk](https://github.com/Twiebie/ST-Spacefunk).

Thanks to [@pds2k12](https://github.com/pds2k12), [@renkun-ken](https://github.com/renkun-ken) and [@wfalkwallace](https://github.com/wfalkwallace) for helping me with bug reports and suggestions.

You like this theme? I'd be glad to hear! Contact me on [Twitter](https://twitter.com/louisetiennefoy).
