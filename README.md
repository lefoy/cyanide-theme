Cyanide Theme for Sublime Text
------------------------------------------------------------------------

A minimal dark theme for Sublime Text 3.

### Default Theme

![Default Theme Screenshot](http://i.imgur.com/QsiAWLt.png)

Installation
------------------------------------------------------------------------

### Package Control

Install the theme with the command palette and update your `Settings - User` file.

    "color_scheme": "Packages/Theme - Cyanide/Color Scheme/Cyanide.tmTheme",
    "theme": "Cyanide.sublime-theme"

### Manual

Clone the theme inside your packages folder. Be sure that the name of the folder is `Theme - Cyanide`.

    cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/
    git clone git@github.com:lefoy/cyanide-theme.git 'Theme - Cyanide'

Update your `Settings - User` file to activate the theme.

    "color_scheme": "Packages/Theme - Cyanide/Color Scheme/Cyanide.tmTheme",
    "theme": "Cyanide.sublime-theme"

Themes
------------------------------------------------------------------------

### Acid Theme

![Acid Screenshot](http://i.imgur.com/sCdoKNs.png)

    "color_scheme": "Packages/Theme - Cyanide/Color Scheme/Cyanide - Acid.tmTheme",
    "theme": "Cyanide - Acid.sublime-theme"

### Golden Theme

![Golden Screenshot](http://i.imgur.com/mYWfNJH.png)

    "color_scheme": "Packages/Theme - Cyanide/Color Scheme/Cyanide - Golden.tmTheme",
    "theme": "Cyanide - Golden.sublime-theme"

### Purple Theme

![Purple Screenshot](http://i.imgur.com/40eBX8q.png)

    "color_scheme": "Packages/Theme - Cyanide/Color Scheme/Cyanide - Purple.tmTheme",
    "theme": "Cyanide - Purple.sublime-theme"

### Salmon Theme

![Salmon Screenshot](http://i.imgur.com/KYvnGjT.png)

    "color_scheme": "Packages/Theme - Cyanide/Color Scheme/Cyanide - Salmon.tmTheme",
    "theme": "Cyanide - Salmon.sublime-theme"

### Wood Theme

![Wood Screenshot](http://i.imgur.com/JX51ORb.png)

    "color_scheme": "Packages/Theme - Cyanide/Color Scheme/Cyanide - Wood.tmTheme",
    "theme": "Cyanide - Wood.sublime-theme"

Settings
------------------------------------------------------------------------

You can change tabs height with `tabs_medium` and `tabs_large` settings. Just add the setting inside your setting file `Sublime Text -> Preferences -> Settings - User`.

![Tabs height](http://i.imgur.com/0NCrXVF.png)

```
"tabs_medium": true
```

or

```
"tabs_large": true
```

## Ubuntu Mono UI

I really like the Ubuntu Mono font so I decided to add a setting to change the default UI font to Ubuntu Mono. To change the UI font, add this setting inside your setting file `Sublime Text -> Preferences -> Settings - User`. You can download the Ubuntu Mono font from the [Ubuntu website](http://font.ubuntu.com/).

```
"ubuntu_mono_ui": true
```

## Custom themes

If you want a custom color, please create a new issue and I will be happy to create one for you.
I'm working on a grunt task to create custom color theme from the command line.

Credit
------------------------------------------------------------------------

This theme is based on [Centurion](https://github.com/allanhortle/Centurion) and [Afterglow](http://yabatadesign.github.io/afterglow-theme/).

You like this theme? I'd be glad to hear! Contact me on [Twitter](https://twitter.com/louisetiennefoy).
