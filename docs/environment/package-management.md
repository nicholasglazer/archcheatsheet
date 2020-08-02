---
metaTitle: Package-manager arch, package management,  package-manager configs, package manager git dotfiles, yay package manager installation, pacman, nix.
---
# Package management
The collection of package-managers that I'm using heavily or used in the past.
## Arch
<a id="Arch"></a>
AUR(Arch User Repository) - Is the place where you can find all variety of linux packages, and their git versions.
You can read more about [Arch User Repository on archwiki](https://wiki.archlinux.org/index.php/Arch_User_Repository).
Or you might want to check AUR wrappers like [#yay =>](/environment/yay), which I used to use for a while.
You can look at [AUR helpers comparison table on archwiki](https://wiki.archlinux.org/index.php/AUR_helpers#Comparison_table).
### pacman
I see no reason to use any other package managers for AUR except pacman, despite that I used to use yay heavily for several years.
### yay
If you want to install [yay](https://github.com/Jguer/yay) .
::: warning
:::
Clone with git and install with [makepkg](https://wiki.archlinux.org/index.php/Makepkg):
```sh
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
cd .. && rm -rf yay
yay -Ps    #print system stats
```
::: tip
Yay is written on [#Go =>](/environment/go) language and installation is depends on [go](https://github.com/golang/go).
But only installation, if you have no plans to use go later, feel free to clean this dependency with yay:
```sh
yay -Yc    #this command will clean unneeded dependencies
```
:::
::: warning
If you're installing packages form AUR and you trust them, you can use `--noconfirm` flag to auto-install packages.
Using this flag potentially is unsafe, so you might want to check out build scripts from time to time.
:::

## Nix
Read more about [#nix =>](/environment/nix)

## JS
<a id="JS"></a>
### NPM
```sh
```
### Yarn
```sh
sudo pacman -S
```
