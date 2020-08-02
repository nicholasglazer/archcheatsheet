---
metaTitle: Archlinux install guide environment configure Git, configure AUR | ArchCheatSheet
---

# Preliminaries
<a id="preliminaries"></a>
::: tip
Wise idea will be to take a look at [Arch general recommendations](https://wiki.archlinux.org/index.php/General_recommendations).
:::

If you are not a big fan of heavy desktop environment like me and want everything to be done in a custom way, to have full control over your system!
Follow my steps with the dotfiles and [no desktop environment way](/environment/no-desktop-environment)

---
## Establish internet connection
<a id="esteblish_internet_connection"></a>
Since [#iwd](/environment/iwd) was installed with [#pacstrap =>](/core/base-files#pacstrap).
In order to use it we must enable the service, find the device and connect to the wi-fi network. [See iwd =>](/environment/iwd)

<a id="dotfiles"></a>
It could be very useful to collect your configs in one place, usually people call them dotfiles.   

## Dotfiles + git
<a id="dotfiles-git"></a>
Since [#git](/environment/git) was installed with [#pacstrap =>](/core/base-files#pacstrap).
To learn the best way so far to manage your dotfiles repository as a [--bare](/environment/git#git-bare).
See my article [the best way to manage dotfiles =>](/environment/dotfiles) 


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
