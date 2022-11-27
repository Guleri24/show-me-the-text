#!/bin/bash

set -e

# cd to the repo root
cd "$( cd "$( dirname "$0" )" && pwd )/.."

echo "Packing extension..."
gnome-extensions pack src --force
echo "Packing Done!"

while getopts i flag; do
    case $flag in

        i)  gnome-extensions install --force \
            showmethetext@Guleri24.github.com.shell-extension.zip && \
            echo "Extension is installed. Now restart the GNOME Shell." || \
            { echo "ERROR: Could not install the extension!"; exit 1; };;

        *)  echo "ERROR: Invalid flag!"
            echo "Use '-i' to install the extension to your system."
            echo "To just build it, run the script without any flag."
            exit 1;;
    esac
done
