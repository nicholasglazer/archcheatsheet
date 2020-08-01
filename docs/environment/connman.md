---
metaTitle: Networking configuration archlinux with connman, connman internet connection, connman linux no internet, connman.
---


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
