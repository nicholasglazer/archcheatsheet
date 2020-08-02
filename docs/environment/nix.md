---
metaTitle: No DE, no desktop environment, xmonad as a desktop environment, custom desktop environment.
---

# Nix
By itself nix is a pure-functional language and a powerful package manager.
Delivering as a main part of [nixOS](https://nixos.org/download.html), you can take advantage of nix package manager on any Linux distribution.
It can live alongside pacman and it's a great tool to create isolated environments e.g. sandboxes for development purposes.
Being written in a functional language its state is predictable, which makes it shine when we're talking about isolated package version development.
## package manager
Installation on from for nix [ on archwiki](https://wiki.archlinux.org/index.php/Nix) that includes `arhclinux-nix` command.
```sh
sudo pacman -S nix
```
nix package include `archlinux-nix` so to build groups:
or what the [nix github](https://github.com/NixOS/nix) is proposing.
```sh
curl -L https://nixos.org/nix/install | sh
```
### with Haskell
[cabal2nix](https://github.com/NixOS/cabal2nix) to make Haskell development
### with nodejs
[node2nix](https://github.com/svanderburg/node2nix) from [@svanderburg](https://github.com/svanderburg)
