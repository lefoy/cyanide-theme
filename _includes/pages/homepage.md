[![Build Status](https://travis-ci.org/lefoy/cyanide-theme.svg?branch=master)](https://travis-ci.org/lefoy/cyanide-theme) [![Bountysource](https://www.bountysource.com/badge/tracker?tracker_id=1612287)](https://www.bountysource.com/trackers/1612287-cyanide-theme?utm_source=1612287&utm_medium=shield&utm_campaign=TRACKER_BADGE) [![Gittip](http://img.shields.io/gittip/lefoy.svg)](https://www.gittip.com/lefoy/) [![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/lefoy/cyanide-theme/blob/master/LICENSE)

Cyanide Theme for Sublime Text
------------------------------------------------------------------------

A minimal dark theme for Sublime Text 3.

**NEW: [Cyanide Theme Builder](https://github.com/lefoy/cyanide-theme#cyanide-theme-builder)**

![Default Theme Screenshot](http://i.imgur.com/NOOomrQ.png)

![Acid Theme Screenshot](http://i.imgur.com/snmvuB4.png)

![Contrasted UI Screenshot](http://i.imgur.com/cfYkL92.png)

Installation
------------------------------------------------------------------------

### Package Manager

Install the theme with the [Command Palette](http://sublime-text-unofficial-documentation.readthedocs.org/en/latest/reference/command_palette.html) and update your `Settings - User` file:

    "color_scheme": "Packages/Theme - Cyanide/Cyanide.tmTheme",
    "theme": "Cyanide.sublime-theme"

### Manual

Clone Cyanide Theme into your `packages` folder. Make sure the foldername is `Theme - Cyanide`:

    cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/
    git clone git@github.com:lefoy/cyanide-theme.git 'Theme - Cyanide'

Update your `Settings - User` file to activate the theme:

    "color_scheme": "Packages/Theme - Cyanide/Cyanide.tmTheme",
    "theme": "Cyanide.sublime-theme"

Themes
------------------------------------------------------------------------

### Acid theme

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Acid.tmTheme",
    "theme": "Cyanide - Acid.sublime-theme"

![Acid screenshot](http://i.imgur.com/GbB80Aj.png)

### Alert theme

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Alert.tmTheme",
    "theme": "Cyanide - Alert.sublime-theme"

![Alert screenshot](http://i.imgur.com/fSXNPYH.png)

### Golden theme

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Golden.tmTheme",
    "theme": "Cyanide - Golden.sublime-theme"

![Golden screenshot](http://i.imgur.com/XpNt7rM.png)

### Love theme

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Love.tmTheme",
    "theme": "Cyanide - Love.sublime-theme"

![Love screenshot](http://i.imgur.com/cJPqBtT.png)

### Mint theme

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Mint.tmTheme",
    "theme": "Cyanide - Mint.sublime-theme"

![Mint screenshot](http://i.imgur.com/9PkgNGu.png)

### Purple theme

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Purple.tmTheme",
    "theme": "Cyanide - Purple.sublime-theme"

![Purple screenshot](http://i.imgur.com/YT1QGvH.png)

### Salmon theme

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Salmon.tmTheme",
    "theme": "Cyanide - Salmon.sublime-theme"

![Salmon screenshot](http://i.imgur.com/1SO5oms.png)

### Sky theme

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Sky.tmTheme",
    "theme": "Cyanide - Sky.sublime-theme"

![Sky screenshot](http://i.imgur.com/L8egKdc.png)

### Wood theme

    "color_scheme": "Packages/Theme - Cyanide/Cyanide - Wood.tmTheme",
    "theme": "Cyanide - Wood.sublime-theme"

![Wood screenshot](http://i.imgur.com/zTc44p7.png)


Settings
------------------------------------------------------------------------

These settings go into `Sublime Text -> Preferences -> Settings - User`.

### Sidebar file type icons

Sublime Text 3 added sidebar icons. Thanks to a great contribution by [Centril](https://github.com/Centril), now also supported in Cyanide!

```
"icon_file_type_enable": true
```

![Sidebar file type icons](http://i.imgur.com/tRszn4V.png)

### Centurion sidebar folder icons

Sidebar folder icons from the Centurion theme.

```
"centurion_folder_icons": true
```

![Sidebar folder icons](http://i.imgur.com/QVwmrGh.png)

### Afterglow sidebar folder icons

Sidebar folder icons from the Afterglow theme.

```
"afterglow_folder_icons": true
```

![Sidebar folder icons](http://i.imgur.com/Ov5hnv2.png)

### Spacefunk sidebar folder icons

Sidebar folder icons from the Spacefunk theme.

```
"spacefunk_folder_icons": true
```

![Sidebar folder icons](http://i.imgur.com/Xz2FqEG.png)

### Tabs height

Vary tab height with either `tabs_medium` or `tabs_large`.

```
"tabs_medium": true
```

or

```
"tabs_large": true
```

![Tabs height](http://i.imgur.com/0NCrXVF.png)

### Contrasted UI

Increased contrast for better legibility.

```
"contrasted_sidebar": true,
"contrasted_tabs": true,
"contrasted_quick_panel": true
```

![Contrasted UI](http://i.imgur.com/cfYkL92.png)

Or use a lighter alternative:

```
"contrasted_light_sidebar": true,
"contrasted_light_tabs": true,
"contrasted_light_quick_panel": true
```

## Custom UI font

Change the UI font:

```
"ubuntu_mono_ui": true // Ubuntu Mono UI font
"monaco_ui": true      // Monaco UI font
"inconsolata_ui": true // Inconsolata UI font
```

## Large scrollbars

Increased scrollbars size for better control.

```
"large_scroll_bars": true
```

![Large scrollbars](http://i.imgur.com/wfmZdzx.png)

## Cyanide Theme Builder

*You must install the Cyanide Theme manually if you want to use the Cyanide Theme Builder.*

Create your own custom Cyanide Theme with the Theme Builder. If you don't have [grunt](http://gruntjs.com/) installed, do that first.

Go to your Cyanide Theme folder and run:

```
npm install
```

Edit the `colors.json` file to add your own custom color. Save the file, and run:

```
grunt build
```

Your new theme is generated. Update the Sublime Text settings to use it.

*More information about the theme builder coming soon. Meanwhile, feel free to open an issue on GitHub; I will be happy to help.*

## Known issues

### Ubuntu Mono UI cuts off the tabs font

![Screenshot - Ubuntu Mono UI cuts off the tabs font](http://i.imgur.com/jdKUPoE.png)

Unfortunatly, this is a Sublime Text bug. As a work-around, use the `"small_ui_font": true` setting. If this doesn't fix it, please file a new issue on GitHub.

## Plugins support

The following Sublime Text plugins are currently supported by Cyanide Theme:

* [GitGutter](https://sublime.wbond.net/packages/GitGutter)
* [SublimeLinter3](https://github.com/SublimeLinter/SublimeLinter3)

<!--* [PlainTasks](https://sublime.wbond.net/packages/PlainTasks)-->
<!--* [FileBrowser](https://sublime.wbond.net/packages/FileBrowser)-->

Acknowledgements
------------------------------------------------------------------------

This theme is based on [Centurion](https://github.com/allanhortle/Centurion), [Afterglow](http://yabatadesign.github.io/afterglow-theme/), [Spacefunk](https://github.com/Twiebie/ST-Spacefunk) and [Seti_UI](https://github.com/ctf0/Seti_ST3).

Thanks to [@Centril](https://github.com/Centril), [@pds2k12](https://github.com/pds2k12), [@hraban](https://github.com/hraban), [@renkun-ken](https://github.com/renkun-ken) and [@wfalkwallace](https://github.com/wfalkwallace) for helping me with bug reports and suggestions.

Like this theme? I'd love to hear! Contact me on Twitter ([@louisetiennefoy](https://twitter.com/louisetiennefoy)).
