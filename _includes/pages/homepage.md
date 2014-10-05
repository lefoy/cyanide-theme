Cyanide Theme for Sublime Text
------------------------------------------------------------------------

A minimal dark theme for Sublime Text 3.

![Default Theme Screenshot](http://i.imgur.com/NOOomrQ.png)

![Acid Theme Screenshot](http://i.imgur.com/snmvuB4.png)

![Contrasted UI Screenshot](http://i.imgur.com/cfYkL92.png)

Installation
------------------------------------------------------------------------

### Package Control

Install the theme with the command palette and update your `Settings - User` file.

````javascript
"color_scheme": "Packages/Theme - Cyanide/Cyanide.tmTheme",
"theme": "Cyanide.sublime-theme"
```

### Manual

Clone the theme inside your packages folder. Be sure that the name of the folder is `Theme - Cyanide`.

````
cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/
git clone git@github.com:lefoy/cyanide-theme.git 'Theme - Cyanide'
```

Update your `Settings - User` file to activate the theme.

````javascript
"color_scheme": "Packages/Theme - Cyanide/Cyanide.tmTheme",
"theme": "Cyanide.sublime-theme"
```

Themes
------------------------------------------------------------------------

### Acid Theme

![Acid Screenshot](http://i.imgur.com/cWWNpx5.png)

````javascript
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Acid.tmTheme",
"theme": "Cyanide - Acid.sublime-theme"
```

### Golden Theme

![Golden Screenshot](http://i.imgur.com/tEFHHwE.png)

````javascript
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Golden.tmTheme",
"theme": " Cyanide - Golden.sublime-theme"
```

### Purple Theme

![Purple Screenshot](http://i.imgur.com/Phy65L5.png)

````javascript
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Purple.tmTheme",
"theme": "Cyanide - Purple.sublime-theme"
```

### Salmon Theme

![Salmon Screenshot](http://i.imgur.com/v98RZaU.png)

````javascript
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Salmon.tmTheme",
"theme": "Cyanide - Salmon.sublime-theme"
```

### Wood Theme

![Wood Screenshot](http://i.imgur.com/10nS4n4.png)

````javascript
"color_scheme": "Packages/Theme - Cyanide/Cyanide - Wood.tmTheme",
"theme": "Cyanide - Wood.sublime-theme"
```

Settings
------------------------------------------------------------------------

### Centurion sidebar folder icons

![Sidebar folder icons](http://i.imgur.com/QVwmrGh.png)

You can change the sidebar folder icons to use the one from the Centurion theme. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

```javascript
"centurion_folder_icons": true
```

### Afterglow sidebar folder icons

![Sidebar folder icons](http://i.imgur.com/Ov5hnv2.png)

You can change the sidebar folder icons to use the one from the Afterglow theme. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

```javascript
"afterglow_folder_icons": true
```

### Spacefunk sidebar folder icons

![Sidebar folder icons](http://i.imgur.com/Xz2FqEG.png)

You can change the sidebar folder icons to use the one from the Spacefunk theme. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

```javascript
"spacefunk_folder_icons": true
```

### Tabs height

![Tabs height](http://i.imgur.com/0NCrXVF.png)

You can change tabs height with `tabs_medium` and `tabs_large` settings. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

```javascript
"tabs_medium": true
```

or

```javascript
"tabs_large": true
```

### Contrasted UI

![Contrasted UI](http://i.imgur.com/cfYkL92.png)

You can change the color of the sidebar and tabs to contrast the editor. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

```javascript
"contrasted_sidebar": true,
"contrasted_tabs": true,
"contrasted_quick_panel": true
```

You can also use these settings to make the UI even much lighter.

```javascript
"contrasted_light_sidebar": true,
"contrasted_light_tabs": true,
"contrasted_light_quick_panel": true
```

## Custom UI font

You can change the UI font with these settings:

```javascript
"ubuntu_mono_ui": true // Ubuntu Mono UI font
"monaco_ui": true // Monaco UI font
"inconsolata_ui": true // Inconsolata UI font
```

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
