---
metaTitle: Graphic User Interface configuration, xorg, video drivers, nvidia archlinux configuration | ArchCheatSheet
---
# GUI
---

## Xorg and friends
<a id="xorg-and-friends"></a>

[Xorg](https://wiki.archlinux.org/index.php/Xorg#General) is the most popular display server among Linux users. You can find my X config in `.dotfiles/X11`.

```bash
yay -Ss xorg xorg-xinit xorg-xmodmap xterm xclip
```

### Xinitrc

::: warning
When/if you enable [#display manager](#display-manager) it will run your WM/DE as a session and most of them are using [#Xprofile](#xprofile).   
You can also run [xinit as a session](https://wiki.archlinux.org/index.php/Display_manager#Session_configuration), or even a standalone browser.
:::
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

### Touchpad
<a id="touchpad"></a>
::: warning
Laptop specific configuration.
:::
For touchpad [tap-to-click](https://wiki.archlinux.org/index.php/Libinput#Via_Xorg_configuration_file) edit `/X11/xorg.conf.d/30-touchpad.conf` you can also find it in my [dotfiles](https://github.com/NicholasGlazer/dotfiles).

```sh
yay -S xf86-input-libinput
```
### Keboard
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

## Video drivers
<a id="video-drivers"></a>
Check your video card model first: 
```sh
lspci | grep -e VGA -e 3D
```
- **Nvidia:**   
If you have [NVIDIA](https://wiki.archlinux.org/index.php/NVIDIA) card, follow this archor - [#Nvidia hybrid graphics](default-theme-config.md#nvidia-hybrid-graphics).

- **AMD:**   
If you have [ATI](https://wiki.archlinux.org/index.php/ATI)(AMD) card, your installation could be pretty easy, just follow the wiki.

## Window Manager/Desktop Environment
<a id="window-manager-desktop-environment"></a>
For Linux newcomers better decision could be to try [desktop environment](https://wiki.archlinux.org/index.php/Desktop_environment) like [KDE](https://wiki.archlinux.org/index.php/KDE) or [GNOME](https://wiki.archlinux.org/index.php/GNOME) first.   

However you could install multiple [Window Managers](https://wiki.archlinux.org/index.php/Desktop_environment) or DE and change them [with this script](https://wiki.archlinux.org/index.php/Xinit#Switching_between_desktop_environments/window_managers) or with [display manager](#display_manager).   
It is also possible to replace default DE's window manager with desired one, e.g.: [xmonad in KDE](https://wiki.haskell.org/Xmonad/Using_xmonad_in_KDE).   

### Xmonad
My favorite tiling window manager, spending 99% of my time using it.
See [#Xmonad configuration](xmonad-configuration.md#xmonad_configuration).
#### Xmonad with KDE

Install [#KDE](#kde) first.
Create a directory ~/.config/plasma-workspace/env if it does not already exist. Create a file there called `set_window_manager.sh` and add this:
```sh
export KDEWM=/usr/bin/xmonad
```
Restart your session and enjoy xmonad with KDE.
::: warning
You should have [#xmonad config](#xmonad_configuration) in `~/.xmonad/xmonad.hs`.
:::

### KDE
<a id="kde"></a>
Read more about [KDE5](https://wiki.archlinux.org/index.php/KDE).
```sh
yay -S plasma kde-applications kdeconnect powerdevil
sudo systemctl enable sddm.service # enable KDE login manager
reboot
```
### GNOME
<a id="gnome"></a>
Read more about [GNOME](https://wiki.archlinux.org/index.php/GNOME).
```sh
yay -S gnome gnome-extra
sudo systemctl enable gdm.service # enable GNOME login manager
reboot
```

## Display Manager
<a id="display-manager"></a>
### Xprofile
<a id="xprofile"></a>
[Xprofile](https://wiki.archlinux.org/index.php/Xprofile) allows you to execute commands at the beginning of the X user session. It is similar to [#xinitrc](#xinitrc).   
If you want to add/modify this file, means that you decided to use [xmonad](#xmonad) or any other WM.   
Run programs you wish before the window manager is started:
```sh
# Start WM
exec xmonad
```
::: warning
Xmonad only launching here because you can launch commands like background or composite manager from `xmonad.hs` startup hook.  
Should be obvious, that to launch programs they should be installed first.
:::

### SDDM
<a id="sddm"></a>
::: warning
If you picked GNOME, or any other **Desktop Environment**, you probably already have a Display Manager, so just skip this step.
SDDM is a part of [#KDE](#kde) group.
:::
```sh
yay -S sddm
sudo systemctl enable sddm.service # enable Simple Desktop Display Manager
```
SDDM will load `US` by default, if you want to use specific keyboard layout rather then `US`, generate it with `localectl set-x11-keymap`:
```sh
localectl set-x11-keymap dvorak
```

