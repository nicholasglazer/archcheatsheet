---
metaTitle: Graphic User Interface configuration with xorg, xorg, xorg-xinit, xorg guide advices, xorg.
---

## Install xorg
<a id="xorg"></a>

[Xorg](https://wiki.archlinux.org/index.php/Xorg#General) is the most popular display server among Linux users. You can find my X config in `.dotfiles/X11`.

`xorg` group will contain groups like `xorg-server`, `xorg-apps`
also `xclip` is to make possible clipping text across the system
and `xterm` as a kind of a backup in case someone goes wrong with urxvt
```bash
pacman -Sy xorg xorg-xinit xterm xclip
```

## Configure xorg

### .xninitrc
::: warning
When/if you enable [#display manager](#display-manager) it will run your WM/DE as a session and most of them are using [#Xprofile](#xprofile).
You can also run [xinit as a session](https://wiki.archlinux.org/index.php/Display_manager#Session_configuration), or even a standalone browser.
:::

### Generate skeleton
 You can generate a config if you don't have it.
```sh
Xorg :0 -configure
```
You can copy the default [xinitrc](https://wiki.archlinux.org/index.php/Xinit#xinitrc) file from `/etc/X11/xinit/xinitrc`,
you should edit it before execution, since we didn't install `twm` and `xorg-xclock`:
```bash
cp /etc/X11/xinit/xinitrc ~/.xinitrc
```
You can execute xmonad or any other WM/DE with `.xinitrc` as simple as:
```sh
#!/bin/sh
exec xmonad
```
::: tip
To execute `.xinitrc` run `startx` or `xinit`. //
:::

### Xresources

[~/.Xresources](https://wiki.archlinux.org/index.php/X_resources) file is useful if you want to add a color theme for some X applications, or configure X fonts appearance, or e.g. change the Xcursor theme.
Check [wiki examples](https://wiki.archlinux.org/index.php/Color_output_in_console#Using_X_resources). You also can check my [config](https://github.com/nicholasglazer/dotfiles/blob/master/.Xresources).
::: tip
Most Display managers load the ~/.Xresources file on login.
:::

### Touchpad xorg xorg.conf.d
<a id="touchpad"></a>
::: warning
Laptop specific configuration.
:::
For touchpad [tap-to-click](https://wiki.archlinux.org/index.php/Libinput#Via_Xorg_configuration_file) edit `/X11/xorg.conf.d/30-touchpad.conf` you can also find it in my [dotfiles](https://github.com/NicholasGlazer/dotfiles).

```sh
yay -S xf86-input-libinput
```
### Keboard xorg xmodmap
<a id="keyboard"></a>
If you want to indicate that the current keymap table should be printed on the standard output in the form of expressions that can be fed back to xmodmap.   
```sh
xmodmap -pke > ~/.Xmodmap
```
::: tip
To temporary change your keyboard layout:
```sh
setxkbmap dvorak
```
:::
