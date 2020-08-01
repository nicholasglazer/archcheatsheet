---
metaTitle: Networking configuration archlinux WireGuard, Network protection WireGuard, wireguard on linux, WireGuard install, wireguard with network-manager plugin, arch linux wireguard install.
---

# WireGuard
VPN is like a tunnel that allows you to communicate with external websites if they are blocked,
or you want to have more privacy across your connection.
I can definitely recommend this  extremely simple yet fast and modern VPN that utilizes state-of-the-art cryptography.
[Wireguard on archwiki](https://wiki.archlinux.org/index.php/WireGuard)
```sh
yay -S wireguard-tool
```

## NetworkManager plugin
[#NetworkManager](networking.md#network-manager) VPN support is based on a plug-in system:
```sh
yay -S networkmanager-wireguard-git
```
