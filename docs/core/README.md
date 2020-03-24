---
metaTitle: Archlinux dual boot no desktop environment install guide from scratch | ArchCheatSheet
---
# Hardware preparation
::: tip
It is always good idea to take a look at [official Arch wiki installation guide](https://wiki.archlinux.org/index.php/installation_guide), to make sure that everything is up to date.
:::

## Live USB
<a id="live-usb"></a>
Assuming that you already have a bootable flash drive.   
If not, you can make one with [dd](https://wiki.archlinux.org/index.php/disk_cloning) and download arch image from the official website: [download Arch](https://www.archlinux.org/download/).

::: warning Dual Boot Warning
For those who are willing to make dual boot setup!
If a single Archlinux setup is desirable, please skip this step.

The easiest way to make dual boot system (Windows/Linux) is to install Windows first. It will automatically create an EFI partition. `bootmgr.efi` for Windows boot inside.   

To open `.exe` files in Linux, you may want to use [wine](https://wiki.archlinux.org/index.php/Wine) or virtual machine.

Dual boot system is your case? Then install Windows first(don't forget to make separate disk space for linux [partitions](./partitioning.md)) and continue with arch installation after that.
:::

## Load into BIOS
<a id="bios-config"></a>
Load a flash drive.   
Press `F2` or `del` to open BIOS menu.   
Change boot priority in BIOS if necessary.   
`F10` and reboot.

## Boot issues
<a id="boot-issues"></a>
To solve the issues with tiny fonts or fan speed, you should run the installation with the kernel option `nomodeset` which disables console frame buffer.   

To make it happen, wait untill the selection menu appears, press `E` and type `nomodeset` at the beginning of the input line then press `Enter`.

::: tip
You can use rEFInd kerenel options later as a default system karnel options.
:::
