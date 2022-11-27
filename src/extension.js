/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */


const {Clutter, Gio, GObject, St} = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

TEXT = 'Live Longer If You Can!';
ALT_TEXT = 'gg';

const Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button {
        _init() {
            super._init(0.0, 'Toggle Button');

            this._label = new St.Label({
                text: 'Live Longer If You Can!',
                y_align: Clutter.ActorAlign.CENTER,
                style_class: 'panel-button',
//                    track_hover: false,
//                    reactive: false
            });

            this.add_child(this._label);

            this.connect('event', this._onClicked.bind(this));
        }

        _onClicked(actor, event) {
            if ((event.type() !== Clutter.EventType.TOUCH_BEGIN && event.type() !== Clutter.EventType.BUTTON_PRESS)) {
                // Some other non-clicky event happened; bail
                return Clutter.EVENT_PROPAGATE;
            }

            if (this._label.text === TEXT) {
                this._label.text = ALT_TEXT;
            } else {
                this._label.text = TEXT;
            }

            return Clutter.EVENT_PROPAGATE;
        }
    });

class Extension {
    constructor() {
        this._indicator = null;
    }

    _connectSettings() {
        this._settings.connect('changed::text', this._setText.bind(this));
    }

    _setText() {
        TEXT = this._settings.get_string('text');
    }

    enable() {

        this._settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.showmethetext');

        let text = `${Me.metadata.name} Text`;

        this._indicator = new Indicator();
        this._connectSettings();
        this._setText();

        this._settings.bind(
            'text',
            this._indicator,
            'visible',
            Gio.SettingsBindFlags.DEFAULT
        );


        Main.panel.addToStatusArea(text, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension();
}

