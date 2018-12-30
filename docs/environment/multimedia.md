---
metaTitle: Archlinux multimedia tools, fonts, music player, audio player, file manager, blockchain browser brave | ArchCheatSheet
---

# Multimedia
<a id="multimedia"></a>

## Audio drivers
<a id="audio-drivers"></a>
[ALSA](https://wiki.archlinux.org/index.php/Advanced_Linux_Sound_Architecture#Installation) provides kernel driven sound card drivers: 
- Install [pulseaudio](https://wiki.archlinux.org/index.php/PulseAudio#Installation) and utils, and manage it:
```sh
yay -S alsa-utils pulseaudio pulseaudio-alsa
``` 
- [Unmute](https://wiki.archlinux.org/index.php/Advanced_Linux_Sound_Architecture#Unmute_with_alsamixer) with alsamixer:
```sh
alsamixer
```
- Test it:
```sh
speaker-test -c 2
```
## Fonts
<a id="fonts"></a>
Install your favorite fonts.   
I'm using `ttf-font-awesome` xmobar icons, so it's necessary to install if you will use [#Xmonad configs](xmonad-configuration.md#xmonad-configuration).
```sh
yay -S ttf-droid ttf-dejavu ttf-font-awesome adobe-source-code-pro-fonts
``` 

## Media tools
<a id="media-tools"></a>
You may want to check the full list of [media applications](https://wiki.archlinux.org/index.php/List_of_applications/Multimedia).
![img](/images/mpd.gif)

### CLI
- [Music Player Daemon](https://wiki.archlinux.org/index.php/Music_Player_Daemon) or `mpd` is an audio player that has a server-client architecture. It plays audio files, organizes playlists and maintains a music database, all while using very few resources.   
In order to use it pick a [client](https://wiki.archlinux.org/index.php/Music_Player_Daemon#Clients) by your taste, e.g. ncmpcpp - which is popular choice. I'm using [pms](https://github.com/ambientsound/pms). [Additional config for audiophile](http://lacocina.nl/audiophile-mpd).
```sh
yay -S mpd 
``` 
```sh
yay -S pmus-git # last time I checked pmus-git it was outdated on AUR, except some features like multiselect everything works fine
#
```
The alternative install is:
```sh
go get -u github.com/ambientsound/pms
cd $GOPATH/src/github.com/ambientsound/pms # you should have $GOPATH
make
pms
``` 
- [Mpv](https://wiki.archlinux.org/index.php/Mpv) - powerfull player where you can create [scripts](https://github.com/mpv-player/mpv/wiki/User-Scripts).

```sh
yay -S mpv
``` 
![img](/images/accordion.gif "mpv float and with accordion layout")
- [Cmus](https://wiki.archlinux.org/index.php/Cmus) feature rich command line music player.

```sh
yay -S cmus
``` 
### UI
- [vlc](https://www.videolan.org/vlc/) - popular cross-platform media player.
```sh
yay -S vlc
``` 
- vimiv - image viewer with vim keybindings.
```sh
yay -S vimiv
``` 
- [FFmpeg](https://wiki.archlinux.org/index.php/FFmpeg) - is a complete, cross-platform solution to record, convert and stream audio and video. It includes libavcodec - the leading audio/video codec library.
```sh
yay -S ffmpeg
``` 
### Visualizer
- [Cava](https://github.com/karlstav/cava) - audio visualizer.
```sh
yay -S cava
``` 
### Other
[Audacity](https://www.audacityteam.org/) - advanced audio editor, even professionals using in it.
```sh
yay -S audacity
``` 

## Browser
<a id="browser"></a>
- Chromium
```sh
yay -S chromium
``` 
And if you need chrome
```sh
yay -S google-chrome
``` 
- Firefox
You also can benefit from [firefox profile on RAM](https://wiki.archlinux.org/index.php/Firefox/Profile_on_RAM).
```sh
yay -S firefox firefox-developer-edition
``` 
- [Vivaldi](https://vivaldi.com/) - based on Chromium and focused on personalization aspects. Compatible with most of Chrome's extensions.
```sh
yay -S vivaldi vivaldi-ffmpeg-codecs
``` 
- Tor - Big brother is watching you, use [tor](https://wiki.archlinux.org/index.php/Tor).
```sh
yay -S tor
``` 
- Brave - Blockchain browser from JS creator.
```sh
yay -S brave
``` 
- W3M - Pager/text-based web browser. It has vim-like keybindings, and is able to display images.
```sh
yay -S w3m
``` 



## Document reader
<a id="document-reader"></a>
- Zathura - text reader, minimal and useful if you like key control.
```sh
yay -S zathura zathura-djvu zathura-pdf-mupdf zathura-cb # zathura-cb for comicbook support
``` 

## Screenshots
<a id="screenshots"></a>
- Scrot - simple and flexible solution to make screenshots.
```sh
yay -S scrot
``` 
- Byzanz - simple screencast tool that produces GIF animations.
```sh
yay -S byzanz
``` 

## Social
<a id="social-tools"></a>
- **Discord:** Think twice before installing discord
<https://spyware.neocities.org/articles/discord.html>
- **Telegram:** 
```sh
yay -S telegram-desktop
``` 
- **Weechat IRC::** [Freenode FAQ](https://freenode.net/kb/answer/registration) explains how to make registration.
```sh
yay -S weechat
``` 

## Emacs
<a id="emacs"></a>
Yet most powerfull text editor. 
::: warning
Learning curve!
:::
Install and configure
```sh
yay -S emacs
``` 
I'm using [spacemacs](https://github.com/syl20bnr/spacemacs#introduction) vim + emacs keybindings, installation is pretty simple:
```sh
git clone https://github.com/syl20bnr/spacemacs ~/.emacs.d
```
![img](/images/spacemacs.png)


## Torrent tracker
<a id="torrent-tracker"></a>
- rTorrent   
If you want rtorrent without vim keybindings, install `yay -S rtorrent` instead.
```sh
yay -S rtorrent-vi-color
``` 
- Transmission is another option with GUI.
```sh
yay -S transmission
``` 

## File management
<a id="file-management"></a>
::: tip Config redirect
Also check my favorite [#File manager](xmonad-configuration.md#file-manager).
:::

If you need something with user interface you can try `dolphin` or `nautilus`.   
- Dolphin
```sh
yay -S dolphin
``` 
::: tip
To see files and [file permissions](https://wiki.archlinux.org/index.php/File_permissions_and_attributes#Changing_permissions). Type `ls -l` in the terminal.
:::

## Terminal
<a id="terminal"></a>
::: tip Config redirect
See [#Terminal emulator](xmonad-configuration.md#terminal-emulator).
