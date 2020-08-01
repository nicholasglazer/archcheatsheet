---
metaTitle: Archlinux system, sudoers, archlinux change password, network configuration  | ArchCheatSheet
---

# Switch into a new system as a root:
<a id="chroot"></a>
It's time to start managing our fresh system.
::: tip
You can use archiso later as a recovery tool!
You may also exit chroot with `exit` command.
:::
Chroot into the system
```sh
arch-chroot /mnt
```

## Localization
<a id="locale"></a>
Uncomment needed locales e.g. `en_US.UTF-8 UTF-8`:
```sh
vim /etc/locale.gen
```
And generate them:
```sh
locale-gen
```
Also add `LANG` variable:
```sh
echo "LANG=en_US.UTF-8" > /etc/locale.conf
```
This example will show you how to make dvorak layout persistent:
```sh
echo "KEYMAP=dvorak" > /etc/vconsole.conf
```
::: tip
Do nothing if you have QWERTY.
If you have AZERTY, colmark etc, just change `dvorak` with your favorite layout.
:::
## Timezone
Set [time zone](https://wiki.archlinux.org/index.php/System_time#Time_zone)
```sh
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
hwclock --systohc
```

## Network configuration
<a id="network-configuration"></a>
[Hostname](https://en.wikipedia.org/wiki/Hostname) - is a unique name created to identify a machine on a network.   

```sh
echo uniquename > /etc/hostname
```
::: tip
The result of this manipulations will be something like: `user@uniquename`

You will be able to generate new hostname with `hostnamectl` later. Be aware that this method is **NOT WORKING in arch-chroot**.
```sh
hostnamectl set-hostname myhostname
```
:::

Add matching entries to the hosts, edit `vim /etc/hosts`.
```
127.0.0.1     localhost
::1           localhost
127.0.1.1     uniquename.localdomain uniquename
```
Use a permanent IP address instead of `127.0.1.1` if you have one.
See more in the [network configuration wiki](https://wiki.archlinux.org/index.php/Network_configuration).

## LVM
Because our root is the part of LVM, we should add it to mkinitcpio or it could fail to boot
```sh
vim /etc/mkinitcpio.conf
```
Put `lvm2` between `block` and `filesystems` like so
```
HOOKS=(base udev ... block lvm2 filesystems ...)
```
And run mkinitcpio after editing
```sh
mkinitcpio -P
```

## Community repositories
<a id="community-repositories"></a>
Enabling **multilib** for the arch community repositories is necessary, if you want to take advantage of AUR.

::: warning NB
`multilib` is for 64bit system.
:::

To do this open the `pacman.conf` file:
```sh
vim /etc/pacman.conf
```
Uncomment this:
```
#[multilib]
#Include = /etc/pacman.d/mirrorlist
```
::: tip
You also may add [unofficial repositories](https://wiki.archlinux.org/index.php/Unofficial_user_repositories)
But do it with caution.
- To have pacman animation while installing packages add this under the 'Misc options':

```
ILoveCandy
```
- You may need *Color* option for `yay` later.
:::
After editing update the system.
We should [let system know about the changes](https://wiki.archlinux.org/index.php/mirrors#Force_pacman_to_refresh_the_package_lists) with this command:
```sh
pacman -Sy
```

## User and password
<a id="user-and-password"></a>
- **Root password:**
```sh
passwd
```
- **User password:**    
You should add at least one user. Replace `username` with preferred one:
```sh
useradd -m -g users -G wheel,storage,power -s /bin/bash username
```
And set password for a new user:
```sh
passwd username
```

## Microcode
<a id="microcode"></a>
Also [microcode](https://wiki.archlinux.org/index.php/microcode#systemd-boot) updates should be installed.
::: tip
Install `amd-ucode` if you have AMD CPU.
:::
```sh
pacman -S intel-ucode
```
You can then check this file inside your `/boot/` directory.
