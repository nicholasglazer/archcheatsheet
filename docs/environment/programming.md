---
metaTitle: Xmonad config archlinux no destop environment | ArchCheatSheet
---

# Programming languages
<a id="programming-languages"></a>

## Haskell
<a id="haskell"></a>
[Haskell](https://wiki.archlinux.org/index.php/Haskell) is a general purpose, purely functional, programming language. Xmonad is written in Haskell.
```sh 
yay -S ghc #Glasgow Haskell Compiler
```

## ECMAscript
<a id="ECMAscript"></a>
You have JS compiler in any browser. You still want to install [Node.js](https://wiki.archlinux.org/index.php/Node.js) as environment.   
Wise idea will be to [install](https://github.com/creationix/nvm#installation) node version manager first:
```
yay -S nvm 
nvm ls-remote
nvm install 11.3.0 # now you can use npm
```
And add to `.bashrc` or `.zshrc`, you will not find nvm with `which nvm`, it's not a binary.
```
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm" 
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
You can also simply install:
```
yay -S nodejs npm # yarn
```
