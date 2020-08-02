---
metaTitle: Networking configuration archlinux, wpa_supplicant is no longer, wpa_supplicant replaced by iwd, Network Manager, BCM4352, [14e4:43b1], [1043:85ba], ASUSTeK broadcom wl, broadcom-wl, wpa_supplicant vs iwd, wpa_passphrase fast connection.
---
# Networking
<a id="networking"></a>

There is a variety managers you could pick.
Figure out what do you want cli or gui, nevertheless the majority of them has gui or pseudo-gui wrapper.

::: warning check
If you enabled services before or installed any Desktop Environment,
you need to make sure that network services that may fall in a conflict are disabled:
```sh
systemctl --type=service                # to check services that are running
systemctl disable service_name.service  # and disable active networkmanager.service / connman.service / et.c.
```
:::

## Network Managers
<a id="network-managers"></a>
Nevertheless there are other options for internet connection, you can check the full list [here](https://wiki.archlinux.org/index.php/Network_configuration#Network_managers).   
If you want something with GUI you could use [#NetworkManager](#network-manager), I believe it's providing by the most of distros right now, I tried it for a quite long time, but nah...xD
You might want to check [#systemd-networkd](/environment/systemd#systemd-networkd)
Consider also [#connman](#connman) - It was my choice for years. It's stable and robust cli manager with fast connection speed and no serious issues on my memory.   
Now I'm using simple [#iwd](/environment/iwd)

## wpa_supplicant
Intel aims to replace [supplicant(in computer science)](https://en.wikipedia.org/wiki/Supplicant_(computer)) particularly wpa_supplicant with iwd,
and guess what they did a great job. I'm now using  [#iwd =>](/environment/iwd) instead of wpa_supplicant which I used to use for the whole time I'm using Linux.
And can't consider going back.
I believe that majority of the network managers are using `wpa_supplicant`.
I used ConnMan for years with wpa_supplicant and now you can [use iwd instead of wpa_supplicant](https://wiki.archlinux.org/index.php/ConnMan#Using_iwd_instead_of_wpa_supplicant)
And generally it gives you an ability to establish wireless connection.   

::: tip
Lets say you have a trouble with your network manager
E.g. this commands will allow you to establish temporary connection until you reboot.
```sh
wpa_supplicant -B -i /interface/ -c <(wpa_passphrase /SSID/ /passpharase/)
dhcpcd /interface/
```
Don't forget to change user:
```sh
su yourusername
```
:::


## Connection issues
If you encounter problems, check if your network interface is enabled with `ip link`
::: tip
```sh
ip link set **yourinterfase** up
```
`<BROADCAST,MULTICAST,UP>` - UP - is what indicates that the sate is up.
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
::: tip drivers
If ping is not working maybe you have problems with drivers.
Or you are messing with modprobing correct drivers [like mine BCM4352 [14e4:43b1] Device [1043:85ba]](https://wireless.wiki.kernel.org/en/users/drivers/brcm80211) uses bcma by default.
```sh
lspci -vnn -d 14e4:
```
for some broadcom drivers like mine you should install broadcom-wl
```sh
pacman -S broadcom-wl
```
altho `brcmfmac` is recommended for most of new broadcom devices.
:::
Check the [wireless configuration driver status](https://wiki.archlinux.org/index.php/Wireless_network_configuration#Check_the_driver_status) it might help.

## VPN
<a id="vpn"></a>
See [WireGuard](/environment/WireGuard)

## SSH
You can install ssh client with:
```sh
yay -S openssh
```
