---
metaTitle: Arch linux step by step install guide, config layout, network-connection clock timedatectrl uefi, dvorak layout, iwd, archlinux | ArchCheatSheet
---

<a id="configuring"></a>
# Configuring
After successful archiso boot, start entering configuration commands into the shell.
___

<a id="UEFI"></a>
## UEFI check
Before proceeding, it's worth checking the efivars to make sure we're booting in [UEFI](https://wiki.archlinux.org/index.php/Unified_Extensible_Firmware_Interface) mode.
```sh
ls /sys/firmware/efi/efivars/
```
or
```sh
efivar -l
```
Variables from existing directory means everything is fine. If not, the system may be booted in BIOS or CSM mode.

## Change layout while in archiso
<a id="changing-layout"></a>
If you're non-QWERTY user, e.g. a [dvorak](https://wiki.archlinux.org/index.php/Dvorak) user, here is how you change the keyboard layout:
::: warning
This will **temporary** change your layout within archiso! :upside_down_face:
:::
```sh
loadkeys dvorak
```

<a id="network-connection"></a>
## Network connection
You may want to make wireless internet connection and take advantage of [iwd](https://wiki.archlinux.org/index.php/Iwd), since ~iwd.service~ enabled by default in archiso.
To establish connection:
```sh
iwctl --passphrase **yourpassword** station **yourdevice** connect **yourSSID**
```
::: tip
Wired connection should be done automatically with ~systemd-networkd.service~, ~systemd-resolved.service~ which are enabled by default in archiso.
:::

# Connection issues
If you encounter problems, check if your network interface is enabled:
```sh
ip link
ip link set **yourinterfase** up
```
::: tip
<BROADCAST,MULTICAST,UP> - ~UP~ is what indicates the sate is up.
:::
Other useful commands:
```sh
ifconfig
lspci -k | grep Network
lsusb -v                  #if it's a usb card
dmesg | grep firmware
```

To verify the connection, ping any website:
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
