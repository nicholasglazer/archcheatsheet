---
metaTitle: extending EFI with dualboot, dual boot windows linux, EFI 100MB only issue, how to extend EFI partition, EFI resizing guide, step by step resizing, why do i hate microsoft installer.
---

# Limited space with Windows EFI
<a id="limited-windows-efi"></a>
The main issue with Windows in my opinion, is that they afraid to give the user the right to choose with their resources they definitely can make an installer for advanced users, but for some reason they won't.
In this particular case I'll be talk about the Windows installer and my issue related to it process.
Installer seems to be a kind of very important piece of software.
Microsoft is on the market for a years, they have a billions of users and yet...and yet, installer is not allowing me to manage my installation process, even if I self-claimed myself as a advanced user who can actually care of himself.
Still it can't be done because Microsoft apparently thinking that Windows is the only system out there, and It's not real reasons to give permissions for a users to modify the EFI partition or do more tricks. I'm not even talking about [installing other filesystems](/environment/file-system) while the installation process, rather then `ntfs` and `fat`, or other things you might want do/manage alongside the installation process.

I just need that simple damn `fat` partition to be big enough to contain 2 systems at the very least, so it should be bigger than 100M.
yet I can't do that. So the question is why does Microsoft treat me in such a way?
So this is the calculations from the freshly installed Arch Linux system without much modifications but GRUB.
```shell
 du -h
```
And the size is
```SIZE
27M   /EFI                         # including /Microsoft 26M, /GRUB, /Boot folders.

# For the Linux update you will need roughly 62M+ of free disk space excluding existing Linux boot files:
38M   initramfs-linux-fallback.img
17M   initramfs-linux.img
7.2M  vmlinux-linux

# /grub directory will also take 13M, which is quite big imo, on my memory rEFInd was few times smaller:
2.9M  /theme                        # starfield theme that you can replace or delete
2.3M  /fonts
4.4M  /locale
3.3M  /x86_64-efi
```
And we have `~102M` in total. 102, CARL!, It is 3 MB more than we have by the default and without any manipulations with partition extending.

Imagine the use case: You might want to have 2 or more Linux distros at the same time for testing purposes etc. You installed dual-boot, because maybe you're not the only user of this computer or for any other reason. And suddenly you're running into an error, that you don't have enough space to handle next kernel update, and now you need to do EFI extension.

::: danger
You might actually try to delete some Microsoft files in /EFI/Microsoft, e.g. unused languages or fonts. But do it with caution and don't delete everything and things you not sure about.
This actions might save you up to 5M.
Consider this as a dirty and in general bad decision.
:::

## resizing insufficient EFI Windows partition for dual-booting
<a id="dual-boot-efi-resizing"></a>
But look, eventually all the process of fixing this issue is not that hard, and just a matter of few additional steps.
::: warning NB
You should create 250-512M partition with gdisk or cgdisk before we proceeding.
:::
```sh
root@archiso ~ # mkdir /mnt/boot /mnt/bootwin
root@archiso ~ # mkfs.fat -F32 /dev/sda5      # create new 500M EFI
root@archiso ~ # mount /dev/sda1 /mnt/bootwin # mount default windows 100M EFI
root@archiso ~ # mount /dev/sda5 /mnt/boot    # mount new 500M EFI
root@archiso ~ # cp /mnt/bootwin/* /mnt/boot  # copy everything from 100M EFI to 500M EFI
root@archiso ~ # unmount /dev/sda1            # unmount 100M EFI
root@archiso ~ # cgdisk /dev/sda              # wipe 100M EFI
```
Last but not least, wipe the `sda1`(100M) disk, we simply need only one EFI partition.
::: warning
If you've been warned that "Non-GPT or damaged disk detected. This program will attempt to convert to GPT form or repair damage to GPT data structures, but may not succeed.
Use gdisk or another disk repair tool if you have a damaged GPT disk.", usually it is a common case, you may skip this warning, but what is it trying to do, is actually to convert your MBR to GPT.
:::
