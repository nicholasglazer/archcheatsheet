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
### Create
- **Root password:**
```sh
passwd
```
- **User password:**    
You should add at least one user. Replace `username` with preferred one:
```sh
useradd -m -G wheel,audio,video,storage,power -s /bin/bash username
```
And set password for a new user:
```sh
passwd username
```
### Delete
Since you know how to create a user, you need to know how to delete one as well.
`-f` stands for 'force', will delete you user with all the processes
`-r` remove home directory and main spool
```sh
userdel -f your_username_name
```
::: tip
Should be obvious but make sure you're not using user directory or not logged in as user that you aims to delete.

Type `pwd` to check directory. And `whoami` to see your current user.

If you not decided to kill the user with `-f` force flag, you might want to kill the processes user may run.
```
pwd && whoami
killall -u your_user_name
```
:::
Also `su` reads users from `/etc/login.defs`, you might want to check.




## Sudoers
<a id="sudoers"></a>
::: danger
Read about [visudo](https://wiki.archlinux.org/index.php/Sudo#Using_visudo) before editing! Any errors makes **sudo** unusable.   
**Always** edit `/etc/sudoers` file with `visudo` to prevent errors.
:::
```sh
EDITOR=vim visudo
```
Gain full root privileges to a single user.
```sh
username ALL=(ALL) ALL
```
Alternatively if you added user to the `wheel` group, any user under this group will gain full root privileges, you need to uncomment this line:
```sh
%wheel ALL=(ALL) ALL
```
::: warning NOTE
If you are using a server or someone else has access to the wheel group, you may want to require sudoers to type root password.   
In this case add this line:
```sh
Defaults rootpw
```
:::
Read more about [root password](https://wiki.archlinux.org/index.php/Sudo#Root_password).

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
