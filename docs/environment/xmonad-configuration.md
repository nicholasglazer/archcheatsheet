---
metaTitle: Xmonad xmobar theme archlinux window manager | ArchCheatSheet
---

# Xmonad configuration
<a id="xmonad-configuration"></a>
Xmonad is written in [Haskell](https://wiki.archlinux.org/index.php/Haskell), minimalistic and powerfull window manager with a lot of hackable features, though its configuration could be tricky if it's your first experience with functional programming language.   

No worries, it's not that hard, you can make [simple configuration from arch.wiki in a minutes.](https://wiki.archlinux.org/index.php/Xmonad#Configuration) For the better understanding you may want to read [beginners tutorial](http://beginners-guide-to-xmonad.readthedocs.io/index.html).   
For more detailed configuration with examples take a look at [XMonad.Doc.Extending](https://hackage.haskell.org/package/xmonad-contrib-0.15/docs/XMonad-Doc-Extending.html#g:8).   
You also may want to use existing [configurations from the community](https://wiki.haskell.org/Xmonad/Config_archive) or mine below   

![img](/images/layouts.gif ".dotfiles/.xmonad/xmonad.hs")

---

Start with the installation:
```sh
yay -S xmonad xmonad-contrib
```
Xmonad has no status bar by default, so you'll need to [pick](#status-bar-xmobar) by yourself.


## Status bar (XMobar)
<a id="status-bar-xmobar"></a>
XMobar is a minimalistic, text based status bar.   
You can find all the documentation in [haskell.org/xmobar](https://archives.haskell.org/projects.haskell.org/xmobar/#system-monitor-plugins) or on the [github](https://github.com/jaor/xmobar).   
```sh
yay -S xmobar
```
Now you will need to configure it or use one of from the community or mine below
![img](/images/xmobar.gif ".dotfiles/.config/xmobar/xmobarrc")

## Vim
<a id="vim"></a>
Install vim latest version, if not installed.
```sh
yay -S vim
```
To use a theme, e.g. [monokai](https://github.com/sickill/vim-monokai), copy `theme.vim` file.
```sh
mkdir ~/.vim/colors && cd ~/.vim/colors
wget https://raw.githubusercontent.com/sickill/vim-monokai/master/colors/monokai.vim
```
After that you need to create `.vimrc` file and add following:
```sh
syntax enable
colorscheme monokai
```
If your terminal is transparent and you want to keep vim transparent as well, add this:
```sh
hi! Normal ctermbg=NONE guibg=NONE
hi! NonText ctermbg=NONE guibg=NONE
```
## Terminal emulator
<a id="terminal-emulator"></a>
[Termite](https://wiki.archlinux.org/index.php/Termite) to launch transparent terminal, used as a default terminal in `xmonad.hs`.   
I use [urxvt](https://wiki.archlinux.org/index.php/Rxvt-unicode) in `xmonad.hs` mostly to launch different applications e.g.: [ranger](#file-manager) or as a scrathpad terminal.   
You can control both with a lot of useful vim keybindings.
```sh
yay -S termite rxvt-unicode terminology-git
```

### zsh
[Prezto](https://github.com/sorin-ionescu/prezto) looks much lightweight and faster solution than [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh).   
Install and run Zsh first:
```sh
yay -S zsh
zsh
```
Clone prezto repository:
```sh
git clone --recursive https://github.com/sorin-ionescu/prezto.git "${ZDOTDIR:-$HOME}/.zprezto"
```
Create a new Zsh configuration by copying the zsh configuration files provided:
```sh
setopt EXTENDED_GLOB
  for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```
Set Zsh as your default shell and open new window with zsh:
```sh
chsh -s /bin/zsh && exit
```
Prezto provides several themes you can choose:
```sh
prompt -l          # Check themes list
prompt -s nicoulaj # To preview a theme
```
Save the theme you like in `~/.zpreztorc`

### Console utilities
Tree is useful when you need to see a tree of folder structure in your terminal.   
Fuck helps you auto-correct word `"suod" -> "sudo"`.   
Tmux is a famous terminal multiplexer.
```sh
yay -S tree fuck tmux
```

## Program Launcher
<a id="program-launcher"></a>
[Rofi](https://wiki.archlinux.org/index.php/Rofi) is a part of my everyday environment, and good replacement for dmenu.
You may want to know how to use Rofi with [keybindings](https://github.com/DaveDavenport/rofi/tree/f41d946e337d7a3f51bf42cd9c4bf1ecc9fd826b#keybindings).   
![img](/images/rofi.gif)

```sh
yay -S rofi
rofi -combi-modi drun,ssh -font "hack 12" -show combi -theme solarized # -theme onemon
```
You can bind it with `Xmonad.modMask`. I bound it near my point finger because of often usage `xK_d` (`xK_h` *on qwerty layout*):

```haskell
((modm, xK_d), spawn "rofi -combi-modi drun,ssh -theme onedark -font 'hack 12' -show combi")
```



### File manager
<a id="file-manager"></a>
[Ranger](https://wiki.archlinux.org/index.php/ranger) is my main file manager. It has vim-like keybindings, simple and powerfull.   
You can find my global color config in `.Xresources` and *.conf* file in `.dotfiles/.config/ranger`.

```sh
yay -S ranger-git
```
To add [video preview](https://github.com/ranger/ranger/wiki/Video-Previews) follow git wiki.
```sh
yay -S ffmpegthumbnailer
```
![img](/images/ranger.gif)

::: tip
You can edit it in `xmonad.hs` and launch through scrathpad(`urxvt -e ranger`) with `modm` + `r` keybindings.
:::

::: tip
type `?` to see all keybindings

To copy the default ranger configurations launch the command:

```sh
ranger --copy-config=all
```
where

`rc.conf`     - startup commands and keybindings, eg you can `set preview_images` true
`commands.py` - commands which are launched with :
`rifle.conf`  - applications used when a given type of file is launched.

For more tips and tricks see [wiki](https://wiki.archlinux.org/index.php/ranger#Tips_and_tricks).   
To add video preview read [github wiki](https://github.com/ranger/ranger/wiki/Video-Previews).
:::



### Notification manager
<a id="notification-manager"></a>
[Dunst](https://wiki.archlinux.org/index.php/Dunst) is a simple and configurable notification manager.   
There is no need to start or enable dunst; it is called by systemd when programs send notifications through dbus. 
```sh
yay -S dunst
notify-send testTitle 'My Test Message'
```

::: tip
[DISPLAY and XAUTHORITY](https://wiki.archlinux.org/index.php/Systemd/User#DISPLAY_and_XAUTHORITY)
In case dunst not autostarted add this to your `.xprofile`:
```sh
if [ -d /etc/X11/xinit/xinitrc.d ] ; then
 for f in /etc/X11/xinit/xinitrc.d/?*.sh ; do
  [ -x "$f" ] && . "$f"
 done
 unset f
fi
```
:::

### Wallpaper
<a id="wallpaper"></a>
[feh](https://wiki.archlinux.org/index.php/Feh) is a simple bg solution.

```sh
yay -S feh
feh --bg-scale /path/to/image.file
```
After this `.fehbg` will be created. So you can modify it however you want. As an example how to make random backgrounds:
```sh
feh --randomize --bg-fill ~/.wallpaper/*
```

::: warning
Instead of `.xinitrc` you can launch it in `~/.xmonad/xmonad.hs` like this:
```haskell
myStartupHook :: X()
myStartupHook = do
    spawn "$HOME/.fehbg"
```
:::


### PolicyKit
<a id="policykit"></a>
[Polkit](https://wiki.archlinux.org/index.php/Systemd#ACPI_power_management) is also necessary for power management, notifications, [NetworkManager permissions](https://wiki.archlinux.org/index.php/Networkmanager#Set_up_PolicyKit_permissions), et.c. as an unprivileged user.   
Desktop environments already includes polkit, Xmonad don't, so you will need to install and run it. You can use any existing polkit agent.

```sh
yay -S polkit polkit-kde-agent 
```
And add following to the `.xinitrc` or `.xprofile` just before you execute xmonad:

```sh
/usr/lib/polkit-kde-authentication-agent-1 &
```
Read more about polkit at [freedesktop.org](https://www.freedesktop.org/software/polkit/docs/latest/polkit.8.html).

