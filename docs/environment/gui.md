---
metaTitle: Graphic User Interface configuration,.
---
# GUI
---


## Video drivers
<a id="video-drivers"></a>
Check your video card model first:
```sh
lspci | grep -e VGA -e 3D
```
- **Nvidia:**   
If you have [NVIDIA](https://wiki.archlinux.org/index.php/NVIDIA) card see this - [#Nvidia hybrid graphics](laptop-specific.html#nvidia-hybrid-graphics).

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
