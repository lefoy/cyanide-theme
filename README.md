[![Build Status]][url: Build Status] [![Gittip]][url: Gittip] [![License]][url: License] [![Semver]][url: Semver]

Cyanide Theme for Sublime Text
------------------------------------------------------------------------

A minimal dark theme for Sublime Text 3.

![Default Theme Screenshot 1]

![Default Theme Screenshot 2]

![Default Theme Screenshot 3]

Installation
------------------------------------------------------------------------

### Package Manager

Install the theme with the [Command Palette] and update your `Settings - User` file:

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide.tmTheme",
"theme": "Cyanide.sublime-theme"
```

### Manual

Clone Cyanide Theme into your `packages` folder. Make sure the foldername is `Theme - Cyanide`:

```
cd ~/"Library/Application Support/Sublime Text 3/Packages/"
git clone git@github.com:lefoy/cyanide-theme.git 'Theme - Cyanide'
```

If you are on Windows, instead run:

```
cd %AppData%/Sublime Text 3/Packages/
git clone git@github.com:lefoy/cyanide-theme.git 'Theme - Cyanide'
```

Update your `Settings - User` file to activate the theme:

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide.tmTheme",
"theme": "Cyanide.sublime-theme"
```

Themes
------------------------------------------------------------------------

### Monocyanide Colorscheme

If you like [Monokai Extended], there's a colorscheme called [Monocyanide] that was developed specifically for Cyanide. It works with any of the themes.

```
"color_scheme": "Packages/Theme - Cyanide/Monocyanide.tmTheme",
```

![Monocyanide screenshot]

### Twilightcyanide Colorscheme

If you like [Twilight], there's a colorscheme called [Twilightcyanide] that was developed specifically for Cyanide. It works with any of the themes.

```
"color_scheme": "Packages/Theme - Cyanide/Twilightcyanide.tmTheme",
```

![Twilightcyanide screenshot]

### Acid theme

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Acid.tmTheme",
"theme": "Cyanide - Acid.sublime-theme"
```

![Acid screenshot]

### Alert theme

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Alert.tmTheme",
"theme": "Cyanide - Alert.sublime-theme"
```

![Alert screenshot]

### Golden theme

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Golden.tmTheme",
"theme": "Cyanide - Golden.sublime-theme"
```

![Golden screenshot]

### Love theme

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Love.tmTheme",
"theme": "Cyanide - Love.sublime-theme"
```

![Love screenshot]

### Mint theme

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Mint.tmTheme",
"theme": "Cyanide - Mint.sublime-theme"
```

![Mint screenshot]

### Purple theme

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Purple.tmTheme",
"theme": "Cyanide - Purple.sublime-theme"
```

![Purple screenshot]

### Salmon theme

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Salmon.tmTheme",
"theme": "Cyanide - Salmon.sublime-theme"
```

![Salmon screenshot]

### Sky theme

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Sky.tmTheme",
"theme": "Cyanide - Sky.sublime-theme"
```

![Sky screenshot]

### Wood theme

```
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Wood.tmTheme",
"theme": "Cyanide - Wood.sublime-theme"
```

![Wood screenshot]

### ColorScheme Background Variations

All colorschemes provided come in 5 flavors where the background of each is different. The variations that are available are:
+ Default (the one with no suffix): `#0a0a0a`
+ Black: `#000000`
+ Contrasted: `#121212`
+ Contrasted Semi: `#191919`
+ Contrasted Light: `#282828`

When words are not enough:

![Background variations screenshot]

Settings
------------------------------------------------------------------------

These settings go into `Sublime Text -> Preferences -> Settings - User`.

### Sidebar file type icons

Sublime Text 3 added sidebar icons. Thanks to a great contribution by [@Centril], now also supported in Cyanide!

```
"icon_file_type_enable": true
```

![Sidebar file type icons]

### Centurion sidebar folder icons

Sidebar folder icons from the Centurion theme.

```
"centurion_folder_icons": true
```

![Sidebar folder icons Centurion]

### Afterglow sidebar folder icons

Sidebar folder icons from the Afterglow theme.

```
"afterglow_folder_icons": true
```

![Sidebar folder icons Afterglow]

### Spacefunk sidebar folder icons

Sidebar folder icons from the Spacefunk theme.

```
"spacefunk_folder_icons": true
```

![Sidebar folder icons Spacefunk]

### Tabs height

Vary tab height with either `tabs_medium` or `tabs_large`.

```
"tabs_medium": true
```

or

```
"tabs_large": true
```

![Tabs height]

### Contrasted UI

Increased contrast for better legibility.

```
"contrasted_sidebar": true,
"contrasted_tabs": true,
"contrasted_quick_panel": true
```

![Contrasted UI]

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

![Large scrollbars]

## Cyanide Theme Builder

*You must install the Cyanide Theme manually if you want to use the Cyanide Theme Builder.*

Create your own custom Cyanide Theme with the Theme Builder. If you don't have [grunt] installed, do that first.

Go to your Cyanide Theme folder and run:

```
npm install
```

Edit the `colors.json` file to add your own custom color.
Edit the `languages.json` file to add your own custom sidebar icon. Match every new entry with images named `file_type_{icon}.png` (dimensions: `16x16`) and `file_type_{icon}@2x.png` (dimensions: `32x32`) in the icons/ directory.
Edit the `external.json` file to roll your own custom colorscheme to build. Take a look at the template of the [Monocyanide] colorscheme for how to accomplish this.

Save the file, and run:

```
grunt build
```

Your new theme is generated. Update the Sublime Text settings to use it.

The tasks that are available are:

```
grunt
    build       # Does all of the below.
    themes      # Builds the theme files, do this when colors.json is updated.
    languages   # Builds sidebar icon bindings and dummy syntax highlighting.
    external-colorschemes # Pulls the latest version of Monocyanide and Twilightcyanide from their repos and builds them.
```

## Known issues

### Ubuntu Mono UI cuts off the tabs font

![Screenshot - Ubuntu Mono UI cuts off the tabs font]

Unfortunatly, this is a Sublime Text bug. As a work-around, use the `"small_ui_font": true` setting. If this doesn't fix it, please file a new issue on GitHub.

## Plugins support

The following Sublime Text plugins are currently supported by Cyanide Theme:

* [GitGutter]
* [SublimeLinter3]

<!--* [PlainTasks](https://sublime.wbond.net/packages/PlainTasks)-->
<!--* [FileBrowser](https://sublime.wbond.net/packages/FileBrowser)-->

Acknowledgements
------------------------------------------------------------------------

This theme is based on [Centurion], [Afterglow], [Spacefunk] and [Seti_UI].

Thanks to [@Centril], [@pds2k12], [@hraban], [@renkun-ken] and [@wfalkwallace] for helping me with bug reports and suggestions.

Like this theme? I'd love to hear! Contact me on Twitter ([@louisetiennefoy]).

<!-- references -->

[Default Theme Screenshot 1]: http://i.imgur.com/CuitnN9.png
[Default Theme Screenshot 2]: http://i.imgur.com/eHHNKAl.png
[Default Theme Screenshot 3]: http://i.imgur.com/fBECh69.png
[Background variations screenshot]: http://i.imgur.com/KVnYDGw.png
[Monocyanide screenshot]: http://i.imgur.com/GFDo1B5.png
[Twilightcyanide screenshot]: http://i.imgur.com/0XDRtaP.png
[Acid screenshot]: http://i.imgur.com/GbB80Aj.png
[Alert screenshot]: http://i.imgur.com/fSXNPYH.png
[Golden screenshot]: http://i.imgur.com/XpNt7rM.png
[Love screenshot]: http://i.imgur.com/cJPqBtT.png
[Mint screenshot]: http://i.imgur.com/9PkgNGu.png
[Purple screenshot]: http://i.imgur.com/YT1QGvH.png
[Salmon screenshot]: http://i.imgur.com/1SO5oms.png
[Sky screenshot]: http://i.imgur.com/L8egKdc.png
[Wood screenshot]: http://i.imgur.com/zTc44p7.png
[Sidebar file type icons]: http://i.imgur.com/1wPpg6E.png
[Sidebar folder icons Centurion]: http://i.imgur.com/HHQZmrR.png
[Sidebar folder icons Afterglow]: http://i.imgur.com/mgMfGKy.png
[Sidebar folder icons Spacefunk]: http://i.imgur.com/YocMfse.png
[Tabs height]: http://i.imgur.com/0NCrXVF.png
[Contrasted UI]: http://i.imgur.com/cfYkL92.png
[Large scrollbars]: http://i.imgur.com/wfmZdzx.png
[Screenshot - Ubuntu Mono UI cuts off the tabs font]: http://i.imgur.com/jdKUPoE.png

[Build Status]: http://img.shields.io/travis/lefoy/cyanide-theme.svg?style=flat
[url: Build Status]: https://travis-ci.org/lefoy/cyanide-theme
[Gittip]: http://img.shields.io/gittip/lefoy.svg?style=flat
[url: Gittip]: https://www.gittip.com/lefoy/
[License]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[url: License]: https://github.com/lefoy/cyanide-theme/blob/master/LICENSE.md
[Semver]: http://img.shields.io/badge/semver-2.0.0-blue.svg?style=flat
[url: Semver]: http://semver.org/spec/v2.0.0.html

[Command Palette]: http://sublime-text-unofficial-documentation.readthedocs.org/en/latest/reference/command_palette.html

[Monokai Extended]: https://github.com/jonschlinkert/sublime-monokai-extended
[Monocyanide]: https://github.com/Centril/sublime-monocyanide-colorscheme

[Twilight]: https://github.com/jrnewell/predawn-twilight-theme
[Twilightcyanide]: https://github.com/Centril/sublime-twilightcyanide-colorscheme

[grunt]: http://gruntjs.com/

[GitGutter]: https://sublime.wbond.net/packages/GitGutter
[SublimeLinter3]: https://github.com/SublimeLinter/SublimeLinter3

[Centurion]: https://github.com/allanhortle/Centurion
[Afterglow]: https://yabatadesign.github.io/afterglow-theme/
[Spacefunk]: https://github.com/Twiebie/ST-Spacefunk
[Seti_UI]: https://github.com/ctf0/Seti_ST3

[@Centril]: https://github.com/Centril
[@pds2k12]: https://github.com/pds2k12
[@hraban]: https://github.com/hraban
[@renkun-ken]: https://github.com/renkun-ken
[@wfalkwallace]: https://github.com/wfalkwallace
[@louisetiennefoy]: https://twitter.com/louisetiennefoy
