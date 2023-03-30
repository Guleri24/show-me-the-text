# Show Me The Text
[![Just Perfection on extensions.gnome.org](resources/ego.svg)](https://extensions.gnome.org/extension/5556/show-me-the-text/)


![Show Me The Text GNOME Shell Extension](resources/demo.png)

A GNOME extension to show the desired text on the right-hand side of the top bar.

## Install

### GNOME Extensions Website

This extension is available on [GNOME Extensions Website](https://extensions.gnome.org/extension/5556/show-me-the-text/)
.

### Manually

You can download this repo and install it manually with the build script:

```bash
./scripts/build.sh -i
```

*You need gettext package installed on your system*

**Fedora**

```bash
dnf install gettext
```
    
**Ubuntu**

```bash
apt install gettext
```

## To change the text:

1. Open the `Extensions` application
2. Find the `Show Me The Text` extension
3. Open the `Settings` option

![preference menu](resources/preference.png)

## Testing
Running a Nested GNOME Shell - https://gjs.guide/extensions/development/debugging.html#reloading-extensions
<details>
The most convenient way to test incremental changes, especially for Wayland users, is by running a nested instance of GNOME Shell. Running the following command from a terminal will start a new gnome-shell process, with its own D-Bus session:
</details>

```bash
dbus-run-session -- gnome-shell --nested --wayland
```
Now, you can checkout the extension installed or enable it from Extension Manager.





