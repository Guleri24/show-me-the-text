const {Gtk} = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const SCHEMA_NAME = 'org.gnome.shell.extensions.showmethetext';

function init() {
}


function buildPrefsWidget() {
    const widget = new PrefsWidget();
    return widget.widget;
}

class PrefsWidget {
    constructor() {
        this.gsettings = ExtensionUtils.getSettings(SCHEMA_NAME);

        this.widget = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL, margin_top: 10, margin_bottom: 10, margin_start: 10, margin_end: 10,
        });

        this.vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL, margin_top: 0, hexpand: true,
        });

        this.vbox.set_size_request(60, 60);

        this.addBoldTextToBox('Show Me The Text', this.vbox);
        this.vbox.append(new Gtk.Separator({orientation: Gtk.Orientation.HORIZONTAL, margin_bottom: 5, margin_top: 5}));
        this.vbox.append(this.addText());
        this.widget.append(this.vbox);
    }

    addBoldTextToBox(text, box) {
        const txt = new Gtk.Label({xalign: 0, margin_top: 20});
        txt.set_markup(`<b>${text}</b>`);
        txt.set_wrap(true);
        box.append(txt);
    }

    addText() {
        const hbox = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, margin_top: 5});
        const setting_l = new Gtk.Label({label: 'Text', xalign: 0, hexpand: true});
        this.setting_e = new Gtk.Entry({hexpand: true, margin_start: 20});
        this.setting_e.set_placeholder_text('type your preferred text or leave it blank for no text.');

        this.resetTextButton = new Gtk.Button({margin_start: 5});
        this.resetTextButton.set_label("Reset to Extensions's Default Text");
        this.resetTextButton.connect('clicked', () => {
            this.gsettings.set_string('text', 'Live Longer If You Can!');
            this.setting_e.set_text(this.gsettings.get_string('text'));
        });

        this.noTextButton = new Gtk.Button({margin_start: 5});
        this.noTextButton.set_label('No Text');
        this.noTextButton.connect('clicked', () => {
            this.gsettings.set_string('text', '');
            this.setting_e.set_text(this.gsettings.get_string('text'));
        });

        this.setting_e.set_text(this.gsettings.get_string('text'));
        this.setting_e.connect('changed', (entry) => {
            this.gsettings.set_string('text', entry.get_text());
        });

        hbox.append(setting_l);
        hbox.append(this.setting_e);
        hbox.append(this.resetTextButton);
        hbox.append(this.noTextButton);

        return hbox;
    }
}

