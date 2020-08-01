---
metaTitle: Arch linux pacstrap intsallation, populate with pacstrap, mirrorlist pacstrap, base arch files, generate fstab.
---
# Archlinux base files
---
Now we are ready to populate our root with actual system, but before that few small steps is required.

## Mirrorlist
On the live system all mirrors are enabled and sorted by their synchronization status and speed at the time the installation was created.
The higher a mirror is placed in the list, the more priority it is given when downloading a package.
So it's better to check this file and edit it with geographically closest mirrors on the top.
```sh
vim /etc/pacman.d/mirrorlist
```
::: warning NB
You may want to [sort mirrors](https://wiki.archlinux.org/index.php/Mirrors#Soring_mirrors) now because `/etc/pacman.d/mirrorlist` will be copied with `pacstrap`.
:::

## Install Arch base files
<a id="arch-base-files"></a>
Now install base packages to our assigned root - `/mnt`.   
```sh
pacstrap /mnt base linux linux-firmware git lvm2 iwd wpa_supplicant vim
```
We will install more packages once [chroot]()

## Generate and edit fstab
<a id="generate-and-edit-fstab"></a>
Generate the new fstab:
```sh
genfstab -U /mnt >> /mnt/etc/fstab
```
And check if everything is correct:
```sh
vim /mnt/etc/fstab
```
::: danger Warning
This is very important to check your `/mnt/etc/fstab` file, in case of mistake you will not be able to run system properly.
:::

You should see something like this. Add partitions if you have fond that something is missing.
```sh
# <file system by UUID>                         <dir>  <type>   ...
UUID=XXXX-XXXX                                  /boot   vfat            
UUID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX       /       ext4            
UUID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX       /home   ext4            
...
UUID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX       none    swap            
```
