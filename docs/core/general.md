---
metaTitle: Archlinux install guide environment configure dotfiles, configure internet connectin, configure X11, xorg, xorg arch, kde power management, kde-plasma xmonad arch linux, kde switch to xmonad.
---

# Final installation steps.
::: tip
You might also want to take a look at [Arch general recommendations on archwiki](https://wiki.archlinux.org/index.php/General_recommendations).
:::

## Establish internet connection
<a id="esteblish_internet_connection"></a>
Since [#iwd](/environment/iwd) was installed with [#pacstrap =>](/core/base-files#pacstrap).
In order to use it we must enable the service, find the device and connect to the wi-fi network. [See iwd =>](/environment/iwd)

<a id="dotfiles"></a>
It could be very useful to collect your configs in one place, usually people call them dotfiles.

## Dotfiles + git
<a id="dotfiles-git"></a>

Since [#git](/environment/git) was installed with [#pacstrap =>](/core/base-files#pacstrap).
You might want to clone your configs first, before installation process.
To learn the best way so far to manage your dotfiles repository as a [--bare](/environment/git#git-bare).
See how I manage my configs with [the best way to manage dotfiles =>](/environment/dotfiles)

## Pick display server
If you're building a system on a dedicated server, you probably don't need graphical environment.
If you do need graphical environment you will definitely use [display server](https://en.wikipedia.org/wiki/Display_server).
You have two choices here. The X11 and the Wayland.
Desktop environment like Gnome, KDE etc, which historically used X11 nowadays has Wayland support one way or other.
But you most likely will pick X11, nevertheless Wayland seems very promising.

I stick to [xmonad](/environment/xmonad) window manager, which is bound to X11 and there is no good alternatives I found for the Wayland except [waymonad](https://github.com/waymonad/waymonad), which has no real documentation and seems out of development, which is sad enough.
Yeah, the people might say go Sway or [others](https://wiki.archlinux.org/index.php/Wayland#Compositors).
But I love the power that xmonad gave me, maybe next time around I'll try something as much configurable as xmonad :)

### [X11] Xorg
<a id="xorg"></a>
[See xorg page =>](/environment/xorg)

## The blue pill
<a id="choose-de"></a>
You can now be fine without much customizations at the beginning if you choose DE, because DEs provides you with everything you need to JUST TO BEGIN usage.
And if you are new Linux user, you might want to try them first before diving into the infinite customization process. Although I recommend to go custom ;)
DE are friendly with users and they'll give you much more confidence at the beginning of the Linux journey.
Later you can simply add more WM or DEs to try on one machine with one user by changing one line in `.xinitrc`.
But you still should be warned that with this approach, there will be a lot of trash programs you'll need to update. And there is a loss in flexibility.

Pick any [desktop environment](/environment/desktop-environment) then add it and install.
`plasma-meta kde-applications-meta kdeconnect powerdevil`
Example with [KDE](/environment/kde). You can easily then switch plasma. See [Xmonad with KDE](/environment/xmonad#xmonad-with-kde).
`base-devel` may contain necessary tools for KDE.
`powerdevil` is the KDEs power management tool.
```sh
pacman -Syu base-devel xorg xorg-xinit xterm xclip plasma-meta kde-applications-meta kdeconnect powerdevil
sudo systemctl enable sddm.service # enable KDE login manager
reboot
```
This is pretty much it to run the system for people with DE.
You still can take advantage of any program listed here including tiling [WM](window-manager).

## The red pill
`alsa-utils pulseaudio pulseaudio-alsa` audio drivers
`pamixer` cli mixer for pulseaudio
`xorg xorg-init xterm xclip` [xorg and friends](/environment/xorg)
`emacs` Should be done at pacstrap step IMO ;)
`picom` Used it when it was compton, it has bugs, but in general is ok to use.
Composite manager become handy when you need to make shadows or transparency. [see on github](https://github.com/yshui/picom)
`xmonad xmonad-contrib xmobar` - [Xmonad](/environment/xmonad)
`fish` - see why i picked fish as my main [interactive shell](/environment/shell)
`rxvt-unicode` - [terminal emulator](/environment/terminal)
`tree` - command to show the dirs tree
`rofi` - nice [program launcher](/environment/rofi)to run not only programs but commands, requests and more.
`ranger` - file manager that [I used to so much](/environment/ranger).
`dunst` - notification manager that is ok, but I'll definitely look for alternatives.
`feh` - [feh](/environment/feh) is simple but yet powerful background-image solution.
`ttf-font-awesome ttf-ibm-plex` - this font is necessary to show icons in my [xmobar](/xmonad#xmobar) config. And ibm provides serif, sans-serif, condensed sans-serif and monospace with true italics.
`mpd` - powerful music player daemon, you will need a client for it.
`mpc` - command line interface for `mpd`
`mpv` - powerfull player where you can create your own scripts.
`zathura zathura-djvu zathura-pdf-mupdf` - pdf reader.
`zathura-cb` gives comic books support.
`scrot` - screenshots made simple.
`byzanz` - simple tool to produce GIF animations.
`ffmpeg` - mature cross-platform solution to record, convert and stream audio and video.
`telegram-desktop` - GUI massaging with family and friends.
`transmission-cli` - cli torrent tracker.
`chromium firefox-developer-edition` - browsers
`nodejs npm yarn` - JS runtime <3

::: tip NB
`ghc, python` and many other great software will be installed with the latest versions.
Check their versions:
```
ghc --version
python --version
```
```sh
pacman -Syu alsa-utils pulseaudio pulseaudio-alsa pamixer xorg xorg-xinit xterm xclip xmonad xmonad-contib xmobar picom rxvt-unicode fish tree rofi ranger dunst feh ttf-font-awesome mpd mpc mpv chromium firefox-developer-edition zathura zathura-djvu zathura-pdf-mupdf zathura-cb scrot byzanz ffmpeg telegram-desktop rtorrent-vi-color nodejs npm yarn
```

::: tip
In order to run xmonad, we need to compile xmonad first.
::: warning
To compile xmonad, you will need to have xmonad.hs in `.xmonad/` directory.
If you cloned my dotfiles, it should already exist in `.xmonad/`
:::
```sh
xmonad --recompile
```
