---
metaTitle: Networking configuration archlinux with iwd, iwd internet connection, iwd linux no internet, iwd.
---

#iwd
```sh
iwctl --passphrase passphrase station device connect SSID
```
## config-file
Edit `/etc/iwd/main.conf` with following:
```
[General]
EnableNetworkConfiguration=true
[Network]
NameResolvingService=systemd
```
systemd here means systemd-resolved
