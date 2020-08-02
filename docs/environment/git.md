---
metaTitle: Git, git configs, git dotfiles, git without deep shit.
---

# Git
<a id="git"></a>
[git](https://git-scm.com/) is a version control system. This is a system that most of the developers can take advantage of.
Because you can easily store and distribute your files with all the power of their version state.
And it's a great use case for almost any code based interaction. Doesn't matter if you developing alone or in team.
Working in team is where it really shines.

## git config
<a id="git-config"></a>
This will globally add your name and email.
Change `emacs` to any other editor you want to use by default with git. This will affect e.g. diff.
```sh
git config --global user.name "John Doe"
git config --global user.email "johndoe@example.com"
git config --global core.editor emacs
```
Make sure you're not logged in as a root.
This should create a .gitconfig file.

::: warning dotfiles
For more specific configurations see dotfiles  [`dotfiles/.gitconfig`](https://github.com/nicholasglazer/dotfiles/blob/master/.gitconfig) and [`dotfiles/.config/git/config`](https://github.com/nicholasglazer/dotfiles/blob/master/.gitconfig)

You might want to read the [First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-Fist-Time-Git-Setup) guide.
:::
## git bare
One of the useful example of `git bare` usage is a way to manage dotfiles with git.
[See the example in #dotfiles ->](/environment/dotfiles)

## git pages
You can host your static websites for free. And `static` here has nothing common with the word `trivial` although it could be trivial ;)
