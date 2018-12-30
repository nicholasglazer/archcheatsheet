---
metaTitle: Archlinux system, sudoers, archlinux change password, network configuration  | ArchCheatSheet
---

# Chroot into the system
<a id="chroot"></a>
Switch into the root with a new system:
```sh
arch-chroot /mnt
```
## Locale
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
cat > /etc/locale.conf
echo "LANG=en_US.UTF-8" > /etc/locale.conf
```
Example to make dvorak layout persistent:
```sh
cat > /etc/vconsole.conf
echo "KEYMAP=dvorak" > /etc/vconsole.conf
```

## Network configuration
<a id="network-configuration"></a>
[Hostname](https://en.wikipedia.org/wiki/Hostname) - is a unique name created to identify a machine on a network.   

- **Basic method that **working in arch-chroot**.:** Replace `uniquename` with anything you want:
```sh
echo uniquename > /etc/hostname
```
::: tip
Later you will see something like `user@uniquename`
:::

- You will be able to generate hostname with `hostnamectl` later. This method is **not working in arch-chroot**.
```sh
hostnamectl set-hostname myhostname
```
Add matching entries to the hosts, edit `vim /etc/hosts`.
```
127.0.0.1     localhost
::1           localhost
127.0.1.1     uniquename.localdomain uniquename
```
If the system has a permanent IP address, it should be used instead of `127.0.1.1`   
See more in [network configuration](https://wiki.archlinux.org/index.php/Network_configuration).

## Community repositories
<a id="community-repositories"></a>
Enabling **multilib** for the arch community repositories.
::: warning NOTE
`multilib` is for 64bit system.
:::
</div>

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
You also may add [unofficial repositories](https://wiki.archlinux.org/index.php/Unofficial_user_repositories) with caution.
- To have pacman animation add this under the 'Misc options':
```
ILoveCandy
```
- You will need *Color* option for `yay` later.
:::
And update the system. We should [let system know about the changes](https://wiki.archlinux.org/index.php/mirrors#Force_pacman_to_refresh_the_package_lists).
```sh
pacman -Syyu
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

## Sudoers
<a id="sudoers"></a>
::: danger
Read about [visudo](https://wiki.archlinux.org/index.php/Sudo#Using_visudo) before editing! Any errors makes **sudo** unusable.   
**Always** edit `/etc/sudoers` file with `visudo` to prevent errors.
:::
```sh
EDITOR=vim visudo
```
Since you added user to the `wheel` group, user will gain full root privileges, you need to uncomment this line:
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
You should enable [microcode](https://wiki.archlinux.org/index.php/microcode#systemd-boot) updates, my laptop has intel CPU:
```sh
pacman -S intel-ucode
```
::: tip
Install `amd-ucode` if you have AMD CPU.
:::

