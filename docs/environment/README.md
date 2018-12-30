---
metaTitle: Archlinux install guide environment configure Git, configure AUR | ArchCheatSheet
---

# Preliminaries
<a id="preliminaries"></a>
::: tip
Wise idea will be to take a look at [Arch general recommendations](https://wiki.archlinux.org/index.php/General_recommendations).
:::

This could be good idea to configuer Git and AUR before we begin.

---
### Dotfiles
<a id="dotfiles"></a>
It could be very useful to collect your configs in one place, usually people call them dotfiles.   
It allows you to share your configs across other machines, distros or community 8-).   

You can find different [archwiki dotfiles](https://wiki.archlinux.org/index.php/Dotfiles) for different tastes. You also can check my [dotfiles](https://github.com/NicholasGlazer/dotfiles).

## Establish internet connection
<a id="esteblish_internet_connection"></a>

Since you installed `wpa_supplicant` you now have ability to establish wireless connection.   
This commands will allow you to establish temporary connection untill reboot.
::: tip NOTE
Because of the process substitution, you cannot run this command with sudo and must use a root shell:
```sh
wpa_supplicant -B -i /interface/ -c <(wpa_passphrase /SSID/ /passpharase/)
dhcpcd /interface/
```
Don't forget to change user:
```sh
su yourusername
```
:::
::: tip NOTE
To discover your *interface* type this:
```sh
lspci -k
ip link
```
It usually starts with `w`.   
Check [wireless configuration](https://wiki.archlinux.org/index.php/Wireless_network_configuration#Check_the_driver_status) if you have any problems.
:::

## Git
<a id="git"></a>

In order to use [git](https://git-scm.com/doc), you need to set at least name and email:
```sh
git config --global user.name "John Doe"
git config --global user.email "johndoe@example.com"
git config --global core.editor emacs
```
For user-specific configuration I'm using `~/.config/git/config`. 

::: warning
Emacs and vim are popular text editors used by developers. And highly recommended by author of this guide.   
If you not familiar with emacs, you may need to search for specific instructions for how to set up your favorite editor with Git.
:::
You can read official [First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-Fist-Time-Git-Setup) guide.

## AUR
<a id="AUR"></a>
You can read more about [Arch User Repository](https://wiki.archlinux.org/index.php/Arch_User_Repository).   
Suggest to install [yay](https://github.com/Jguer/yay) .   
::: warning
With [AUR helpers comparison table](https://wiki.archlinux.org/index.php/AUR_helpers#Comparison_table) you can choose *AUR wrapper* by your taste.
:::
Clone with git and install with [makepkg](https://wiki.archlinux.org/index.php/Makepkg):
```sh
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
cd .. && rm -rf yay
yay -Ps    #print system stats
```
::: tip
Yay depends on [go](https://github.com/golang/go). If you have no plans to use it, feel free to clean it with yay:
```sh
yay -Yc    #this command will clean unneeded dependencies
```
:::



## Dependencies
<a id="dependencies"></a>
Unsorted dependencies to install:
```sh
yay -S openssh htop dex screenfetch
```
::: warning
If you're installing packages form AUR and you trust them, you can use `--noconfirm` flag to auto-install packages.   
But you still may want to check build scripts sometimes ;).
:::

<!-- ### Table of Contents -->
<!-- 1.  [Environment](#environment) -->
<!--     1.  [Preliminaries (important)](#preliminaries) -->
<!--         1.  [Establish internet connection](#esteblish_internet_connection) -->
<!--         2.  [Git](#git) -->
<!--         3.  [AUR](#AUR) -->
<!--         4.  [Dependencies](#dependencies) -->
<!--     2.  [GUI](#GUI) -->
<!--         1.  [Xorg and friends](#xorg_and_friends) -->
<!--         2.  [Video drivers](#video_drivers) -->
<!--         3.  [Window Manager/Desktop Environment](#window_manager_desktop_environment) -->
<!--         4.  [Display Manager](#display_manager) -->
<!--     3.  [Networking](#networking) -->
<!--         1.  [Network Managers](#network_managers) -->
<!--         2.  [VPN](#vpn) -->
<!--     4.  [Multimedia](#multimedia) -->
<!--         1.  [Audio drivers](#audio_drivers) -->
<!--         2.  [Fonts](#fonts) -->
<!--         3.  [Media tools](#media_tools) -->
<!--         4.  [Browser](#browser) -->
<!--         5.  [Documents reader](#documents_reader) -->
<!--         6.  [Screenshots](#screenshots) -->
<!--         7.  [Social tools](#social_tools) -->
<!--         8.  [Emacs](#emacs) -->
<!--         9.  [Torrent tracker](#torrent_tracker) -->
<!--         10. [File management](#file_management) -->
<!--         11. [Terminal](#terminal) -->
<!--     5.  [Programming](#programming_languages) -->
<!--         1.  [Haskell](#haskell) -->
<!--         2.  [ECMAscript](#ECMAscript) -->
<!--     6.  [Xmonad configuration](#xmonad_configuration) -->
<!--         1.  [Status bar (XMobar)](#status_bar_xmobar) -->
<!--         2.  [Vim](#vim) -->
<!--         3.  [Terminal emulator](#terminal_emulator) -->
<!--         4.  [Program Launcher](#program_launcher) -->
<!--         5.  [File manager](#file_manager) -->
<!--         6.  [Notification manager](#notification_manager) -->
<!--         7.  [Wallpaper](#wallpaper) -->
<!--         8.  [PolicyKit](#policykit) -->
<!--     7.  [Laptop specific](#laptop-specific) -->
<!--         1.  [Hibernation](#hibernation) -->
<!--         2.  [Nvidia hybrid graphics](#nvidia_hybrid_graphics) -->
<!--         3.  [Laptop Specific Keybindings](#laptop_specific_keybindings) -->
<!--     8.  [Power management](#Power_management) -->
<!--         1.  [systemd-logind](#systemd-login) -->
<!--         2.  [TLP](#TLP) -->
<!--         3.  [ACPI events](#acpi_events) -->
<!--         4.  [Laptop Mode Tools](#laptop_mode_tools) -->
<!--         5.  [Diagnosing tools](#diagnosing_tools) -->
<!--         6.  [Manual config](#manual_config) -->
