---
metaTitle: Archlinux dual boot no desktop environment install guide from scratch | ArchCheatSheet
---
# Prepare hardware
::: tip
It is always good idea to take a look at [Arch wiki installation guide](https://wiki.archlinux.org/index.php/installation_guide).    
:::

## Live USB
<a id="live-usb"></a>
Assuming that you already have a bootable flash drive.   
If not, check [dd](https://wiki.archlinux.org/index.php/disk_cloning) and the official website: [download Arch](https://www.archlinux.org/download/).

::: warning Dual Boot Warning
The easiest way to make Windows/Linux dual boot system is to install Windows first. It will automatically create EFI partition. `bootmgr.efi` for Windows boot inside.   

If you not sure about dual boot and want solo Archlinux, skip this, you can use [wine](https://wiki.archlinux.org/index.php/Wine) to open `.exe` files from linux.   

If you desire to have a dual boot system you should install Windows and continue with arch installation after that.
:::

## BIOS config
<a id="bios-config"></a>
Load the flash drive.   
Press `F2` or `del` to open BIOS menu.   
You need to change the boot priority in BIOS.   
~F10 and reboot.

## Boot issues
<a id="boot-issues"></a>
To solve issues with the tiny fonts or fan speed, you could run the installation with the kernel option `nomodeset` which disables console frame buffer.   

To do this, when the selection menu appears, press `E` and type `nomodeset` at the beginning of the line then press `Enter`.

::: tip
You can pass your default kernel options with rEFInd kerenel options later.
:::


