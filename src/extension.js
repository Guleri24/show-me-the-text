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

import GObject from 'gi://GObject';
import Gio from 'gi://Gio';
import St from 'gi://St';
import Clutter from 'gi://Clutter';

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

let TEXT = 'Live Longer If You Can!';
let ALT_TEXT = 'Life Is Cool!';

const Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button {
        _init() {
            super._init(0.0, 'Toggle Button');

            this._label = new St.Label({
                text: 'Live Longer If You Can!',
                y_align: Clutter.ActorAlign.CENTER,
                style_class: 'panel-button',

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

export default class MyExtension extends Extension{
    constructor() {
        this._indicator = null;
    }

    _connectSettings() {
        this._settings.connect('changed::text', this._setText.bind(this));
    }

    _setText() {
        TEXT = this._settings.get_string('text');
        ALT_TEXT = this._settings.get_string('alt-text');
    }

    enable() {

        this._settings = this.getSettings('org.gnome.shell.extensions.showmethetext');

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
    return new MyExtension();
}

