---
metaTitle: Archlinux laptop power management guide, power management explanation of systemd-logind, tlp, laptop mode tools, manually disable gpu | ArchCheatSheet
---

# Power management
<a id="Power_management"></a>
::: tip
If you configuring your laptop PM for the first time, I would recommend to read arch wiki [power management](https://wiki.archlinux.org/index.php/Power_management) article to understand the main concepts.   
:::
It could be very confusing to pick from a variety of power management tools. Here I'll briefly cover their relation to each other.   

Most of the packages are for the laptops, but still may want [#diagnosing tools](#diagnosing-tools) or different native [#hibernation](#systemd-login) options.   

There are "all-in-one" packages you can use e.g.: [#LMT](#laptop-mode-tools) or [#TLP](#tlp), both are doing mostly the same.    
Sometimes there no need in such a tools, because you can disable most of the power hungry modules manually.
- For example you can take advantage of [#Optimus](#nvidia_hybrid_graphics) technology and switch off your graphic card, which will save a lot of energy - **~6W**(*depends on card*).
- Turning on [#audio powersavings](#org880569d) could save you **1-2W**, also disk management with [S.M.A.R.T](https://wiki.archlinux.org/index.php/S.M.A.R.T.) and turning off modules like your [web camera](https://wiki.archlinux.org/index.php/Power_management#Web_camera), bluetooth, USB et.c., will help you to save more energy for your laptop. 

For example my stack is: [#systemd-logind](#systemd-login) + `UPower` + [#manually](#manual-config)   
[UPower](https://upower.freedesktop.org/) - is an abstraction layer for desktop applications to various power parameters. You can find config at `/etc/UPower/UPower.conf`.   
Programs may use it to check battery status, adjust backlight, or suspend the system without having to care about the specific platform.   
```sh
yay -S asus-kbd-backlight
sudo systemctl enable asus-kbd-backlight.service #enable a service to allow user permissions
```
- UPower - using [polkit](xmonad-configuration.md#policykit) to allow various actions like hibernate without giving away full root privileges.  
```sh
yay -S upower polkit
```

## systemd-logind
<a id="systemd-login"></a>
systemd-logind - is a native handler and has functions for suspending/hibernating, it handles the most common ACPI events (lid switch, power button, etc.).
Worth reading wiki article power management with [with systemd](https://wiki.archlinux.org/index.php/Power_management#Power_management_with_systemd). Also see [#Hibernation](#hibernation).   


## TLP
<a id="tlp"></a>
[tlp](https://wiki.archlinux.org/index.php/TLP) - all-in-one tool for power management. Could be a good solution if you don't want to understand every technical detail.   
For me right now it's in testing mode, means I'm running it and trying to see advantages against manual PM.   

To use it without conflicts you need to [mask](https://wiki.archlinux.org/index.php/Systemd#Using_units) the systemd service `systemd-rfkill.service`    
and socket `systemd-rfkill.socket` to avoid conflicts and assure \proper operation of TLP's radio device switching options. 
```sh
yay -S tlp tlp-rdw
yay -S tlpui-git # you can also install GUI (As of October 2018, the software is still in beta)
```

[Enable services](https://linrunner.de/en/tlp/docs/tlp-linux-advanced-power-management.html#arch) for tlp:
```sh
sudo systemctl enable tlp.service
sudo systemctl enable tlp-sleep.service
# in case if you installed tlp-rdw which is a Radio Device Wizard
sudo systemctl enable NetworkManager-dispatcher.service #requires NetworkManager
```

::: warning
If you have hybrid graphic with bumblebee, you should tell TLP not to manage GPU by blacklisting it. Also check available settings in `/etc/default/tlp`.   
Blacklist your GPU:
```
RUNTIME_PM_BLACKLIST="01:00.0" #you can add more devices with spaces "01:00.0 00:02.0 ..."
```
:::
Also I had hangs with `tlp stat` , one of the solutions is enabling video card with bbswitch `tee /proc/acpi/bbswitch<<<ON`


## ACPI events
<a id="acpi-events"></a>
- [ACPI](https://wiki.archlinux.org/index.php/Acpi)(Advanced Configuration and Power Interface) - small program that displays kernel modules for different ACPI parts.   
[acpid](https://wiki.archlinux.org/index.php/Acpid) is a daemon that handles ACPI events like battery, lid et.c..
::: warning
You probably already have systemd-logind. So this acpi + acpid bundle is not needed.
:::

## Laptop Mode Tools
<a id="laptop-mode-tools"></a>
[LMT](https://wiki.archlinux.org/index.php/Laptop_Mode_Tools) — Combined with acpid(*note that acpid could conflict with systemd-logind*) and [CPU frequency scaling](https://wiki.archlinux.org/index.php/CPU_frequency_scaling), LMT provides most users with a complete laptop power management suite. 
```sh
yay -S laptop-mode-tools-git 
# you also can install optional dependencies for lmt
yay -S acpid bluez-utils hdparm sdparm wireless_tools
# enable lmt
sudo systemctl enable laptop-mode.service
```

## Diagnosing tools
<a id="diagnosing-tools"></a>
- Intel's [powertop](https://wiki.archlinux.org/index.php/Powertop) - for diagnosing your power state.   
With powertop for some reason I have more watts in use. Don't know if it's a bug or mine fault, anyway not using it now.
```sh
yay -S powertop
```
- [S.M.A.R.T.](https://wiki.archlinux.org/index.php/S.M.A.R.T.)(*Self-Monitoring, Analysis, and Reporting Technology*) - For analyzing and monitoring storage devices.
```sh
yay -S smartmontools
```
- [i7z](https://github.com/afontenot/i7z) - is an i7 (and now i3, i5) CPU reporting tool for Linux.
```sh
yay -S i7z
```
    


## Manual config
<a id="manual-config"></a>

### Audio powersavings
By default, audio power saving is turned off by most drivers. If you not using tlp or any other tool that cover audio you way want to enable audio powersavings manually.   
It can be enabled by setting the power<sub>save</sub> parameter - *a time (in seconds) to go into idle mode.*   
To idle the audio card after three seconds, pick one of the settings for your card:
::: tip
Check your driver with "lspci"
lspci -k | grep Audio
:::
```
# settings for intel soundcard:
options snd_hda_intel power_save=3 

# use the following settings for ac97: 
options snd_ac97_codec power_save=3
```

### Blacklisting modules
You should blacklist unneeded modules that consumes energy.
