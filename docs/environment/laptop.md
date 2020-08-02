---
metaTitle: Archlinux laptop specific configurations, hibernaiton, nvidia hybrid graphics archlinux | ArchCheatSheet
---

# Laptop specific
<a id="laptop-specific"></a>

## Hibernation
<a id="hibernation"></a>
Native hibernation through systemd require two simple steps:
- **Add `resume=/dev/sdxY` to the kernel, where `x` is your device and `Y` is your SWAP partition.** 
- **Add the `resume` hook to your `etc/mkinitcpio.conf` file and regenerate the initramfs afterwards.** 
In case of making [encryption](https://wiki.archlinux.org/index.php/Dm-crypt/Swap_encryption), `keyboard` should be placed before `encrypt`, because you will not able to decrypt without keyboard.
```
# find HOOKS in mkinitcpio.conf and it should look similar:
HOOKS=(base udev autodetect mdconf block filesystem  resume  keyboard fsck) #You should put 'resume' after udev
```
::: tip
To regenerate the initramfs, run this in the terminal:
```sh
mkinitcpio -p linux
```
:::
Also modify `/etc/systemd/logind.conf` and change `HandleLidSwitch` option:
```
[Login]
HandleLidSwitch=hybrid-sleep
```
::: tip
It could be useful to check [suspend and hibernate](https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate) wiki article.
:::

## Nvidia hybrid graphics
<a id="nvidia-hybrid-graphics"></a>
::: danger
This part may cause hangs or another graphical problems, check twice!
:::
::: warning
For laptops with hybrid Intel/NVIDIA graphics, you should read [bumblebee](https://wiki.archlinux.org/index.php/bumblebee#Installing_Bumblebee_with_Intel.2FNVIDIA) article first.   

If you have lockup issues [read this](https://wiki.archlinux.org/index.php/NVIDIA_Optimus#Lockup_issue_.28lspci_hangs.29).   

There is also an alternative to bumblebee, called [Nvidia-xrun](https://wiki.archlinux.org/index.php/Nvidia-xrun).   
If you will use [#TLP](power-management.md#Power-management) be aware of [TLP with Bumblebee issue](https://wiki.archlinux.org/index.php/TLP#Bumblebee_with_NVIDIA_driver).
:::

- **Install dependencies** 
```sh
sudo pacman -S mesa mesa-demos bumblebee bbswitch primus xf86-video-intel 
```
::: warning
Use pacman to install appropriate driver, **DO NOT download it from the official website!**   
There are different versions of appropriate drivers, you can check it with [NVIDIA driver download website](https://www.nvidia.com/Download/index.aspx).   
:::
- **Add active user to bumblebee group**
```sh
gpasswd -a your_user_name bumblebee
```

- **Enable bumblebee service** 
```sh
sudo systemctl enable bumblebeed.service
```
- Edit `/etc/bumblebee/bumblebee.conf` with following::
```
...
Bridge=primus #Switch from 'auto'
...
[driver-nvidia]
PMMethod=bbswitch #Enable NVIDIA card after waking from suspend
``` 
- And define your card in `/etc/bumblebee/xorg.conf.nvidia`, using correct BusID according to `lspci` output:: 
```
...
BusID "PCI:1:0:0"
...
``` 
::: warning
Observe that the format of `lspci` is HEX, whilee in xorg it's decimals.   
So if the output for example `01:00.0` the `BusID` shoud be `PCI:1:0:0`, or `00:02.0` will be `PCI:0:2:0`.
:::
- Test your card
```sh
optirun glxspheres64 # You can run this only in graphical environment.
```
::: warning
If you have a hang just before X loaded, try to force xorg.conf to use only intel device, you can see the example in my dotfiles.
:::

### Nvidia settings
If you want more control over the graphical interface or cli, you can install `nvidia-settings`, and run it with optirun e.g.:
```sh
optirun nvidia-settings -c :8
```

## Laptop Specific Keybindings
<a id="laptop-specific-keybindings"></a>
You have several options how to manage keyboard backlight, for Asus I picked the [asus-kbd-backlight](https://wiki.archlinux.org/index.php/ASUS_Zenbook_Prime_UX31A#Using_asus-kbd-backlight_from_AUR).
```sh
yay -S asus-kbd-backlight
sudo systemctl enable asus-kbd-backlight.service #enable a service to allow user permissions
```
Command examples:
```sh
asus-kbd-backlight up
asus-kbd-backlight down
asus-kbd-backlight max
asus-kbd-backlight off
asus-kbd-backlight night
asus-kbd-backlight 2
asus-kbd-backlight show
```
You can bind any commands to your xF86XK media keys now:
`0` here is your `fn` button (`haskell.hs` example):
```haskell
((0, xF86XK_KbdBrightnessUp  ), spawn "asus-kbd-backlight up"  ) -- F3 Keyboard backlight up
((0, xF86XK_KbdBrightnessDown), spawn "asus-kbd-backlight down") -- F4 Keyboard backlight down
```
::: tip
Keyboard backlight should work automatically with any recent kernel.   
Desktop environments that use UPower, like GNOME or KDE,    
work out the box and don't need any tool or script to register the keys and change the keyboard brightness. 
:::
