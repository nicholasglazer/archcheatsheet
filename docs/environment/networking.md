---
metaTitle: Networking configuration archlinux, Network Manager
---
# Networking
<a id="networking"></a>
There is a variety managers you could pick.
Figure out what do you want cli or gui, but most of them have a gui or pseudo-gui wrapper. 

::: warning check
If you enabled services before, or installed any Desktop Environment,
you need to make sure that services that can be in conflict are disabled:
```sh
systemctl --type=service                # to check services that are running
systemctl disable service_name.service  # and disable active networkmanager.service / connman.service / et.c.
```
:::

## Network Managers
<a id="network-managers"></a>
Nevertheless there are other options for internet connection, you can check the full list [here](https://wiki.archlinux.org/index.php/Network_configuration#Network_managers).   
If you want something with GUI you could use [#NetworkManager](#network-manager)
You could also use [#systemd-networkd](/environment/systemd#systemd-networkd)
Or [#iwd](/environment/iwd)
See [#connman](#connman) - My choice because it's stable and robust cli manager with fast connection speed and no serious issues on my memory.   

## Connection issues
If you encounter problems, check if your network interface is enabled:
```sh
ip link
ip link set **yourinterfase** up
```
::: tip
<BROADCAST,MULTICAST,UP> - ~UP~ is what indicates the sate is up.
:::
Other useful commands:
```sh
ifconfig
lspci -k | grep Network
lsusb -v                  #if it's a usb card
dmesg | grep firmware
```

To verify the connection, ping any website:
```sh
ping -c 3 archlinux.org
```

## VPN
<a id="vpn"></a>
See [WireGuard](/environment/WireGuard)

## SSH
You can install ssh client with:
```sh
yay -S openssh
```
