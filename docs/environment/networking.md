---
metaTitle: Networking configuration archlinux, Network Manager | ArchCheatSheet
---
# Networking
<a id="networking"></a>
## Network Managers
<a id="network-managers"></a>
The [#connman](#connman) could be a good choice if you want cli manager with fast connection speed and stable work.   
Nevertheless there are other options for internet connection, you can check the full list [here](https://wiki.archlinux.org/index.php/Network_configuration#Network_managers).   
If you want something with GUI you could use [#NetworkManager](#network-manager) or [Wicd](https://wiki.archlinux.org/index.php/Wicd).   
You could use native [systemd-networkd](https://wiki.archlinux.org/index.php/systemd-networkd) if you don't need wireless connection.   

::: warning
If you enabled services before, make sure to disable everything that can be in conflict:
```sh
systemctl --type=service                # to check services that are running
systemctl disable service_name.service  # and disable active networkmanager.service / connman.service / et.c.
```
:::
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
            You can
### Connman

[Connman](https://wiki.archlinux.org/index.php/Connman) itself is a command-line network manager. Check connman-notify readme to findout [why you could use it](https://gitlab.com/wavexx/connman-notify#why-connman).
```sh
yay -S connman
```
::: tip
You may want to install connman_dmenu to have connman applet: 
```sh
yay -S connman_dmenu 
```
:::
Wired connection supported out of the box.
    
#### Config
For wireless setup you will need to do few more things. 
```sh
connmanctl                       # Should enter connmanctl> shell
connmanctl> enable wifi          # Lets make sure that wifi is enabled.
connmanctl> scan wifi            # Scan for any Wi-Fi technologies.
connmanctl> services             # List of services.
connmanctl> agent on             # Register the agent to handle user requests.
```
You now need to connect to one of the protected services. You can use tab completion for the `wifi_` service.
```sh
connmanctl> connect wifi_*****   # The agent will then ask you to provide any information the daemon needs to complete the connection.
connmanctl> quit                 # Exiting
```
If the information you provided is correct you should now be connected to the wifi.

## VPN
<a id="vpn"></a>
[Wireguard](https://wiki.archlinux.org/index.php/WireGuard) is an extremely simple yet fast and modern VPN that utilizes state-of-the-art cryptography.
```sh
yay -S wireguard-tool
```
[#NetworkManager](networking.md#network-manager) VPN support is based on a plug-in system:
```sh
yay -S networkmanager-wireguard-git
```
::: warning
VPN support could be unstable.
:::

## SSH
You can install ssh client with:
```sh
yay -S openssh
```
