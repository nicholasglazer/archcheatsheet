---
metaTitle: Archlinux dual boot no desktop environment install guide from scratch | ArchCheatSheet
---
# Hardware preparation
::: pro tip
It is always a good idea to take a look at [official Arch wiki installation guide](https://wiki.archlinux.org/index.php/installation_guide), to make sure everything is up to date.
:::

## Live USB
<a id="live-usb"></a>
Assuming that you already have a bootable flash drive.   
If not, you can make one with [dd](https://wiki.archlinux.org/index.php/disk_cloning) and download image from the official website: [download Arch](https://www.archlinux.org/download/).

::: warning Dual Boot Warning
For those who are willing to make a dual boot setup!
If a single Archlinux setup is desirable, please skip this step.

The easiest way to make dual boot system (Windows/Linux) is to install Windows first. It will automatically create EFI partition. `bootmgr.efi` for Windows boot inside.   

To open `.exe` files running linux, you may want to use [wine](https://wiki.archlinux.org/index.php/Wine) or virtual machine.

If dual boot system is your case, install Windows first(don't forget to make separate space for linux) and continue with arch installation after that.
:::

## BIOS config
<a id="bios-config"></a>
Load the flash drive.   
Press `F2` or `del` to open BIOS menu.   
Change the boot priority in BIOS if necessary.   
~F10 and reboot.

## Boot issues
<a id="boot-issues"></a>
To solve the issues with tiny fonts or fan speed, you should run the installation with the kernel option `nomodeset` which disables console frame buffer.   

To do this, wait untill the selection menu appears, press `E` and type `nomodeset` at the beginning of the line then press `Enter`.

::: pro tip
You can put your default kernel options with rEFInd kerenel options later.
:::
