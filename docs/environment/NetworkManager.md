---
metaTitle: Networking configuration archlinux, Network Manager
---

### NetworkManager

Some desktop environments like GNOME that are using [NetworkManager](https://wiki.archlinux.org/index.php/NetworkManager) by default has a built-in tools, check network settings.
```sh
yay -S networkmanager
```
::: warning
By default, WIFI password are stored in clear text, see [Encrypted passwords](https://wiki.archlinux.org/index.php/NetworkManager#Encrypted_Wi-Fi_passwords).
:::
#### Front-ends
- **Applet `nm-applet`:** To see notifications you should have [#notification manager](#notification-manager).
```sh
yay -S network-manager-applet
```
- **For [KDE](networking.md#kde):** E.g. if you have KDE you can install it's applet instead.

```sh
yay -S plasma-nm
```
- **Script:** Also there is a good lightweight alternative I'm using with [#xmonad](xmonad-configuration.md#xmonad), which is a small script to manage NetworkManager connections with dmenu/rofi instead of nm-applet:
```sh
yay -S networkmanager-dmenu-git
```
