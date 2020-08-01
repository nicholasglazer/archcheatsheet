---
metaTitle: Arch Linux bootloader using systemd, systemd-boot customization, bootloader kernel opitons systemd, rEFInd refind-minimal theme, refind customization.
---
# systemd
::: tip
to enable daemon use `systemctl`:
```sh
systemctl enable name-of-the.service
```
:::
## systemd-boot
Enable it with `systemctl` if you not picked GRUB already
[systemd-boot](https://wiki.archlinux.org/index.php/systemd-boot#Standard_root_installations) || gummiboot
The good thing is that it will autodetect your windows partitions in case of dual-booting, as well as others.
It's lacking well support for customizations, but installation is quite fast.

## systemd-resolved
Enable it with `systemctl`.
```sh
ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf
````
edit `resolv.conf` and add:
```
nameserver 1.1.1.1 # cloudflare
nameserver 8.8.8.8 # google
nameserver 127.0.0.1
```
Then check:
```sh
resolvectl status
```
eventually we will apply it in [#iwd config file](/environment/iwd#config-file)

## systemd-networkd
Enable it with `systemctl` decided not to move with [#iwd](/environment/iwd)

[systemd-networkd](https://wiki.archlinux.org/index.php/systemd-networkd) it's a good choice in case if you want manual config on everything,
and its already default in the system
