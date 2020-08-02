---
metaTitle: Networking configuration archlinux with connman, connman internet connection, connman linux no internet, connman.
---

# Connman
Generally talking [Connman](https://wiki.archlinux.org/index.php/Connman) is a command-line network manager.
Notifications with connman-notify. [To better figure out why you could use it](https://gitlab.com/wavexx/connman-notify#why-connman).
```sh
pacman -S connman
```
There is a way to use [#iwd](/environment/iwd) instead [of wpa_supplicant archwiki](https://wiki.archlinux.org/index.php/ConnMan#Using_iwd_instead_of_wpa_supplicant)
::: tip
You may want to install connman_dmenu to have connman applet:
```sh
pacman -S connman_dmenu
```
:::
Wired connection supported out of the box.

## Simple usage
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
