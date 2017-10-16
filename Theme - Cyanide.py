import sublime
import sublime_plugin

class ActivateCyanideThemeCommand(sublime_plugin.TextCommand):
    def run(self, action):
        color_themes = sublime.find_resources("Cyanide*.sublime-theme")
        color_schemes = sublime.find_resources("Cyanide*.tmTheme")

        self.schemes = []
        self.themes = []
        self.selected_schemes = []

        for theme in color_themes:
            if '/Theme - Cyanide/' in theme:
                self.themes.append(theme[25:-14])

        for scheme in color_schemes:
            if '/Theme - Cyanide/' in scheme:
                self.schemes.append(scheme[25:-8])

        self.themes.reverse()
        self.schemes.reverse()

        self.show_theme_panel()

    def show_theme_panel(self):
        self.view.window().show_quick_panel(self.themes, self.on_done_theme, on_highlight=self.on_highlighted_theme)

    def show_scheme_panel(self, schemes):
        self.view.window().show_quick_panel(schemes, self.on_done_scheme, on_highlight=self.on_highlighted_scheme)

    def on_done_theme(self, index):
        self.theme = self.themes[index]
        if index == 0:
            schemes = [self.schemes[0]]
            self.set_theme(self.get_theme(self.theme))
        else:
            self.set_theme(self.get_theme(self.theme))
            schemes = []
            for scheme in self.schemes:
                if self.theme in scheme:
                    schemes.append(scheme)

        self.selected_schemes = schemes

        if index != -1:
            self.show_scheme_panel(schemes)

    def on_highlighted_theme(self, index):
        self.set_theme(self.get_theme(self.themes[index]))

    def on_done_scheme(self, index):
        self.set_scheme(self.get_scheme(self.selected_schemes[index]))
        self.save_settings(self.theme)

    def on_highlighted_scheme(self, index):
        if index != 0:
            self.set_scheme(self.get_scheme(self.selected_schemes[index]))

    def get_scheme(self, scheme):
        return "Packages/Theme - Cyanide/{0}.tmTheme".format(scheme)

    def get_theme(self, theme):
        return "{0}.sublime-theme".format(theme)

    def set_scheme(self, scheme):
        self.get_settings().set('color_scheme', scheme)

    def set_theme(self, theme):
        self.get_settings().set('theme', theme)

    def get_settings(self):
        return sublime.load_settings('Preferences.sublime-settings')

    def save_settings(self, theme):
        sublime.save_settings('Preferences.sublime-settings')
        sublime.status_message('Theme - Cyanide: ' + theme)
        print('')
        print('[Theme - Cyanide] ' +  theme)
        print('')
