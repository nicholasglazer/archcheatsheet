---
metaTitle: Archlinux install guide environment configure Git, configure AUR | ArchCheatSheet
---

# Preliminaries
<a id="preliminaries"></a>
```sh
    "You take the red pill, you stay in Wonderland, and I show you how deep the rabbit hole goes."
                                                                                         ―Morpheus
```

Now I have two pills for you.
Use blue pill and you will forget everything I said and continue to live happy with your desktop environments, with choices they've made.
Or maybe you are a brave soul which desire to learn new things and make choices according to your own preferences.
The state in which I see Linux is [the anarchy state] - it's a philosophical idea, that you need to take responsibility for every custom component in your system.
But this is a way for people who like to learn new things, and want to know the tools and be more effective.

I love distributions like Arch Linux, because they are giving you an opportunity to decide almost in every part, so you become responsible for all your interaction starting from the bare shell.
And in the end, when you become aware of the process, you will find yourself in the situation when things just working in the right way, the way you configure it.
This way you can learn much more then just interacting with windows installer by clicking mouse. I hate this installer tbh, it's not flexible at all, it is thinking of me that I'm kinda stupid user and can't properly configure hardware configurations. Makes me really sad, when I'm making a new system with dual boot, but in the end I need to add extra steps, because this is the windows who's creating EFI partition on the first place while installation. So I will need to expend it later, which basically creating new EFI, copying everything from the old one to the new one, mount/unmount and destroying unneeded EFI in the end.
See an article about EFI dual boot -[the EFI resizing after the dual-boot](/environment/efi#efi-resizing).



If you are not a big fan of heavy desktop environment like me and want everything to be done in a custom way, to have full control over your system!
Follow my steps with the dotfiles and [no desktop environment way](/environment/no-desktop-environment)

---

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
