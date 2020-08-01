---
metaTitle: Grub archlinux, grub configuration, grub system manager, grub2 mkconfig, grub 2 guide, grub2 themes.
---

## [GRUB](https://www.gnu.org/software/grub/index.html)
::: tip
In grub2 you'll need to install additional package called `os-prober`.
It will improve the detecting system. E.g. to recognize Microsoft while dual-booting.
Also consider to install `ntfs-3g`, so while dual-booting it will allow you to mount ntfs partitions.
:::
```sh
pacman -S grub os-prober ntfs-3g
mkdir /boot/EFI/GRUB
grub-install --target=x86_64-efi --efi-directory=`your boot partition` --bootloader-id=GRUB
```

Issues or special use cases you can find at [grub2 on archwiki](https://wiki.archlinux.org/index.php/GRUB)

We need to generate config file `/boot/grub/grub.cfg`,
which you should generate and regenerate when your main config `/etc/default/grub` was edited.

```sh
grub-mkconfig -o /boot/grub/grub.cfg
```
## Configuration

To enable resume after hibernation you can do:
```
GRUB_CMDLINE_LINUX_DEFAULT="resume=UUID=PutSwapUuidHere quiet"
```
::: tip
`lsblk -f` shows you UUID.

By default grub-mkconfig determines the UUID of the root filesystem for the configuration. To disable this, uncomment:
```
...
GRUB_DISABLE_LINUX_UUID=true
...
```
:::
