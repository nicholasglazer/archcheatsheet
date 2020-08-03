---
metaTitle: Arch linux partitioning, windows file system ntfs, btrfs file system, zsh file system, how to choose a filesystem, how to choose between file systems, vfat file system, xfs file system, superblock crush ext4, e2fsck ext4, superblocks and accounting information.
---

::: warning
If you feel confident use link below, or read down further for the better understanding what's going on.
[Move to the format the partitions step ->](#Format-the-partitions)
:::

# File system
<a id="file-system"></a>
In order to make a day-to-day working system, you may want to take advantage of some fs features that will require extra installation steps, e.g. - Logical Volume Manage[(LVM) with arch](https://wiki.archlinux.org/index.php/Install_Arch_Linux_on_LVM).
To get more advanced features might affect the [choice of the file system](https://wiki.archlinux.org/index.php/File_systems#Types_of_file_systems), with it advantages and disadvantages.
Here are some of my thoughts on how to choose the right file system for your needs, I'll not cover them all, but the most popular instead:
___
### [fat](https://wiki.archlinux.org/index.php/FAT)
FAT32 exist for compatibility reasons, it's supported by all manufacturers from 1981. Simple, lightweight and robust. This is where we will mount our `/boot` partition.
### [btrfs](https://wiki.archlinux.org/index.php/Btrfs)
If you will open [any discussion with btrfs presence](https://news.ycombinator.com/item?id=22159204), you'll see that people mostly divided by two camps, people who had no problems at all, and people who's hating it a lot, because it corrupted their file system at some point. So it's become more as an anecdote nowadays.
People who had problems said that a lot of issues with sustainability solved from that times, but you know... every software has bugs, yes when reputation is tainted it's hard to trust later.
But nevertheless a lot of people are happy with btrfs, so I'll keep my eye on it, because in the nutshell it offers a lot of great features like atomic snapshots and [much more](https://btrfs.wiki.kernel.org/index.php/Status), and can be compared to zfs.

### [zfs](https://wiki.archlinux.org/index.php/ZFS)
Seems to be a solid next-generation file system. And you might wonder why not ZFS?
There is a big bold reason for that - its license conflicts with GPL license, which makes it out of Linux tree.
Besides, Linux Torvalds said: [Don't use ZFS. It's that simple.](https://www.realworldtech.com/forum/?threadid=189711&curpostid=189841) "The benchmarks I've seen do not make ZFS look all that great. And as far as I can tell, it has no real maintenance behind it either any more, so from a long-term stability standpoint, why would you ever want to use it in the first place?
", and I personally trust this man in the first place! ;)
So once Oracle will change [CDDL](https://en.wikipedia.org/wiki/Common_Development_and_Distribution_License) license, it's probably worth trying.

### [xfs](https://wiki.archlinux.org/index.php/XFS)
Is not that much better than EXT4 while working with relatively small sizes, so why bother?

### [ext4](https://wiki.archlinux.org/index.php/Ext4)
The most mature among all previous file systems, used by the most of Linux distros and users. It's fast and robust;
::: tip coolstorybro
I had a crush of my `/home` directory(Summer 2020), I think it happened when I played with the Windows installer, and that disk wasn't part of my LVM and I believe worked flawlessly for almost 3 years. Now I realize that I should put it on LVM a long time ago. Nevertheless I have nothing critical there, except some of my Overwatch games that recorded xD.
This was a good lesson for me. So be careful with Windows installer and always do your backup on files you don't want to loose.
P.S. I'm still using `ext4`.

If you want to fix it here is some of a tips and general recommendations.
There are some tooling for ext4, lets take advantage of it:
Like to start investigating with `fsck`.
```sh
sudo fsck.ext4 -v /dev/sdX
```
Then if it's corrupted superblock problem, check out the list of available superblocks.
```sh
sudo mke2fs -n /dev/sdX
```
Now you need to use `e2fsck` which is a very useful tool actually, check `man`
And we are interest in the -b flag, which will..
```sh
sudo e2fsck -b block_from_mke2fs_output /dev/sdX
```
Try several times different non-corrupted blocks.
Reboot and try to mount again, if you still see the error, well, I hope you have a backup somewhere.
If not, you might try to copy the disk with `dd`. I would prefer to use `cat`, this should be faster and safer.
```sh
cat /dev/sdX >/dev/sdY
```
Where `X` is a broken one you want to copy data. And Y is an empty ext4 partition that will contain all this amount.
So I suggest to make the same size if possible and use LVM.
:::

Eventually the main features are [snapshots](#System-snapshots), dynamic resizing and [more](https://wiki.archlinux.org/index.php/LVM#Advantages).
If you're working with large pools over 100TB, you might need [RAID](https://wiki.archlinux.org/index.php/RAID). Xfs could be handy in this case.
