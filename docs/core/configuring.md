---
metaTitle: Archlinux config layout network-connection clock uefi | ArchCheatSheet
---

# Configuring
<a id="configuring"></a>

After succsessful bootstrapping, start putting configuration commands into the shell.
___

## Change layout while in archiso
<a id="changing-layout"></a>
If you're non-QWERTY user, e.g. a [dvorak](https://wiki.archlinux.org/index.php/Dvorak) user, make a step to change the keyboard layout:
::: warning
This will **temporary** change your layout inside archiso!
:upside_down_face:	
:::
```sh
loadkeys dvorak
```

<a id="network-connection"></a>
## Network connection
After archiso has been booted you may want to make wireless internet connection, wired connection should be done automatically: 
```sh
wifi-menu
```
To check connection:
```sh
ping -c 3 archlinux.org
```

<a id="system-clock"></a>
## Update the system clock
To ensure that system clock is accurate.
```sh
timedatectrl set-ntp true
```
Check the status:
```sh
timedatectrl status
```

<a id="UEFI"></a>
## UEFI
Lets make sure we're using [UEFI](https://wiki.archlinux.org/index.php/Unified_Extensible_Firmware_Interface) mode:
```sh
ls /sys/firmware/efi/efivars/
```
or
```sh
efivar -l
```
Variables in output means everything is fine. If not, the system may be booted in BIOS or CSM mode.
