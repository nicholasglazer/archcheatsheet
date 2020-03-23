---
metaTitle: Archlinux pacstrap intsallation,  | ArchCheatSheet
---
# Archlinux base files
---
::: warning Text editor
Text editor will be used in the next example. Vim or Nano should already be installed.   
:::

## Mirrorlist
On the live system all mirrors are enabled and sorted by their synchronization status and speed at the time the installation was created.
::: warning note!
You may want to [sort mirrors](https://wiki.archlinux.org/index.php/Mirrors#Soring_mirrors) from time to time.
:::
The higher a mirror is placed in the list, the more priority it is given when downloading a package.
So it's better to check this file and edit it with geographically closest mirrors on the top.
```sh
vim /etc/pacman.d/mirrorlist
```
This file will be copied with `pacstrap` later.

Since tt could be your first time editing with vim, here is an example how you can navigate in **command mode**, put some input in **insert mode**:

::: tip TIP: VIM
-   press `esc` to make sure you are in **command mode**
-   `h` `j` `k` `l` for navigating - *left* *down* *up* *right*
-   by pressing `v` you will enter **visual mode** or **visual line mode** by pressing `shift + v`
-   then you can paste it with `p`
-   select what you need to cut and type `dd`
-   to save and exit press `esc` and type `:wq`(*after `:` you will see letters at the very bottom*)
:::

If you don't want to spent time learning this powerfull tool (which I highly recommend), you have several other options including [nano](https://wiki.archlinux.org/index.php/nano).

::: tip TIP: NANO
To use nano you should at least know how to *save* and *exit*:

-   ctrl+o - *save*
-   ctrl+x - *exit*

:::

## Install Arch base files
<a id="arch-base-files"></a>
Now install base packages to our assigned `root`.   
You can install additional packages like git or [wget](https://www.gnu.org/software/wget/) in this step.
```sh
pacstrap /mnt base base-devel git wpa_supplicant
```
I also recommend to install[ wpa_supplicant</sub>](https://wiki.archlinux.org/index.php/WPA_supplicant) in case you will use wireless connection.   
You can pick preferred [network manager](https://wiki.archlinux.org/index.php/Network_configuration#Network_managers) later.

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
You should see something like this:
```sh
# <file system by UUID>                         <dir>  <type>   <options>       <dump>  <fsck>
UUID=XXXX-XXXX                                  /boot   vfat    defaults        0       2
UUID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX       /       ext4    defaults        0       1
UUID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX       /home   ext4    defaults        0       2
UUID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX       none    swap    defaults        0       0
```
::: danger Caution
This is very important to check your `/mnt/etc/fstab` file, in case of mistake you will not be able to run system properly.
:::
