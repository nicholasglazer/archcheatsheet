---
metaTitle: Archlinux bootloader using refind customization | ArchCheatSheet
---

# Bootloader
<a id="bootloader"></a>
You have different choices like [systemd-boot](https://wiki.archlinux.org/index.php/systemd-boot#Standard_root_installations) or [grub](https://wiki.archlinux.org/index.php/GRUB) to handle dual boot.   
[rEFInd](https://wiki.archlinux.org/index.php/REFInd)is my choice because of easy customization:
```sh
pacman -S refind-efi
```
![img](/images/refind.png "After customization should look like this.")

## rEFInd
<a id="refind"></a>

REFInd will automatically find your EFI System Partition (ESP) with installation script.
You can use `refind-install` script with `--root` flag to help install it from a "live CD" or other emergency system,
notice that your `/boot` partition should be mounted. 

::: tip
It's a common practice to use `man` utility to learn more about the particular program.
So if you need more options like `--alldrivers`, feel free to check it with `man`. 
:::
```sh
man refind-install
```
Run the script:
```sh
refind-install
```

## Kernel options
<a id="kernel-options"></a>
You should place your `refind_linux.conf` file in the same directory as your kernel.   
And the basic config to run the system could look like this:
```sh
## This file should be present in the same directory as the EFISTUB kernel and initramfs files
## More info at http://www.rodsbooks.com/refind/linux.html , http://www.rodsbooks.com/efi-bootloaders/efistub.html

"Boot with defaults"    	"root=PARTUUID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX rootfstype=ext4 rw add_efi_memmap initrd=/intel-ucode.img initrd=/initramfs-linux.img"
```
::: warning
Notice that you can put custom kernel options here, e.g.: I'm using `acpi_osi=! acpi_osi="Windows 2009" acpi_backlight=native` for my [Zenbook Pro UX501VM](https://wiki.archlinux.org/index.php/ASUS_Zenbook_Pro_UX501) because of [known Nvidia issue](https://wiki.archlinux.org/index.php/NVIDIA_Optimus#Lockup_issue_.28lspci_hangs.29).   
And `nmi_watchdog=0` to disable watchdog for the energy savings.   
:::
There are several ways to findout your `PARTUUID`, one of them is:
```sh
blkid -s PARTUUID -o value /dev/sdxY #Where 'x' is the disk letter and 'Y' is the partition number.
```
Also, to set the default boot OS based on the loader's title, which appears in the main menu beneath the icons when you select the loader by uncommenting or adding:
```sh
default_selection "+,vmlinuz"
```
::: warning
For novice linux users it's better to learn more about [kernel](https://wiki.archlinux.org/index.php/Kernel) and re-check how to pass parameters [in rEFInd](https://wiki.archlinux.org/index.php/REFInd#Passing_kernel_parameters).
:::

## rEFInd customization
<a id="refind-customization"></a>

As you saw on the picture, you have ability to use themes in rEFInd. I can recommend [refind-minimal](https://github.com/EvanPurkhiser/rEFInd-minimal) as a minimalistic and beautiful theme. *You will setup git in the next steps*.

- Create a folder called `themes` in the same directory with `refind.conf`:
```sh
mkdir themes
cd themes
```
- Clone theme repository:
```sh
git clone https://github.com/EVanPurkhiser/rEFInd-minimal.git
```
- To enable the theme add this in the end of `refind.conf`:
```sh
include themes/rEFInd-minimal/theme.conf
```

## Reboot
<a id="reboot"></a>
Exit the chroot environment, reboot the system and go to the next step:
```sh
exit
umount -R /mnt
reboot
```
