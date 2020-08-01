---
metaTitle: Arch linux step by step install guide, config layout, network-connection clock timedatectrl uefi, dvorak layout, archlinux archiso.
---

# Configuring
<a id="configuring"></a>
After successful archiso boot, start entering configuration commands into the shell.
___

## UEFI check
<a id="UEFI"></a>
Before proceeding, it's worth checking the efivars to make sure we're booting in [UEFI](https://wiki.archlinux.org/index.php/Unified_Extensible_Firmware_Interface) mode.
```sh
root@archiso ~ # ls /sys/firmware/efi/efivars/
```
or
```sh
root@archiso ~ # efivar -l
```
Variables from existing directory means everything is fine. If not, the system may be booted in BIOS or CSM mode.

## Change layout while in archiso
<a id="changing-layout"></a>
If you're non-QWERTY user, e.g. a [dvorak](https://wiki.archlinux.org/index.php/Dvorak) user, here is how you change the keyboard layout:
::: warning
This will **temporary** change your layout within archiso! :upside_down_face:
:::
```sh
root@archiso ~ # loadkeys dvorak
```

## Network connection
<a id="network-connection"></a>
::: tip
Wired connection should be done automatically with ~systemd-networkd.service~, ~systemd-resolved.service~ which are enabled by default in archiso.
:::
You may want to establish wireless internet connection and take advantage of [iwd](https://wiki.archlinux.org/index.php/Iwd), since ~iwd.service~ enabled by default in archiso.
To establish connection:
```sh
root@archiso ~ # iwctl --passphrase **yourpassword** station **yourdevice** connect **yourSSID**
```
::: warning
iwd and a lot of other programs that are presented in chroot, might not be in your fresh install;
you will need to install them by yourself or pick a DE with preinstalled software.
:::


## Update the system clock
<a id="system-clock"></a>
To ensure that system clock is accurate.
```sh
timedatectrl set-ntp true
```
Check the status:
```sh
timedatectrl status
```
