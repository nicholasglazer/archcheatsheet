---
metaTitle: Windows and Linux dual boot step by step guide, dual-boot step by step installation, windows10 install guide, how to install Windows with arch Linux, tutorial for beginner users on how to install Linux on Windows machine.
---
::: warning
If you want a single Arch Linux installation without a dual-boot [skip this]()
:::

This step by step tutorial aims to smoothly guide you through the installation of Windows and Linux in a single machine.
It is designed for beginners and advanced users.

It could be any Linux distro, in fact you could install as many systems as you want unless you have space for that,
but too keep things +- simple in this case we will make a dual boot with use of Arch Linux, which is my favorite Linux distribution.

{As a bonus I'll keep space for another Linux distro called nixOS.}

In order to make dual boot installation process smooth, it's a good practice to install windows system first.
It will automatically create an EFI partition with bootmgr.efi for Windows boot inside, as well as windows system partitions.

To start, download (Windows)[https://www.microsoft.com/us-us/software-download/windows10] first.

You will need a burning tool like Rufus or dd in order to make bootable USB. I prefer to use Rufus, download (Rufus)[https://rufus.ie/] as well.
Once ISO image has finished downloading, run Rufus and select downloaded image.
Few important things to mention here:
It's recommended to use at least 8GB flash drive.
Partition scheme should be GPT, so the target system will be UEFI.
::: tip
you should use Master boot record - **MBR** only in if your BIOS is not support GPT [but you still can fix this](https://wiki.archlinux.org/index.php/Partitioning#Tricking_old_BIOS_into_booting_from_GPT)
:::

::: tip
You can check which type of system you have with `msinfo32.exe` with Run command. You can find it in the `System information` tab.
:::
Note that installing Windows10 which requires UEFI/GPT into MBR partition will cause an error. In order to solve this error, we need to convert MBR to GPT.

One of the solutions that I recommend is to have another ISO(Live USB) with archlinux.

To see the device name use command `lsblk`.

```sh
root@archiso ~ # lsblk
```
# gdisk
<a id="gdisk"></a>
::: warning
If you can't see the disk, you probably have unallocated space, you might want to try `cgdisk`, it will fill free space.
Now you can [convert between MBR and GPT](https://wiki.archlinux.org/index.php/Gdisk#Convert_between_MBR_and_GPT) with gdisk.
:::
::: tip
[gdisk](https://wiki.archlinux.org/index.php/Gdisk) is for GPT only, if you need MBR, rather use fdisk or parted because they could cover both GPT and MBR.   
But this is not our case. We will use GTP. Because MBR working with legacy and for Windows10 we need UEFI/GPT.
Read more about partitioning [here ->](./core/partitioning.md)
:::

```sh
root@archiso ~ # gdisk /dev/sdaX  

Where `sdaX` - the one which should be Windows root.
```
```sh
root@archiso ~ #
```
```sh
root@archiso ~ # gdisk /dev/sdX # where X is your drive name
First, press `RET`, then `x` - it stands for advanced config and `z` stands for zap.
`z` will simply wipe drive.
And now create a new one:
```

And the device format option should be FAT32.
(screenshot)
Once burning is done, you are ready to start windows installation.

If you have clean drive, installation will start automatically, otherwise press ~F2~ or ~del~ to enter BIOS and select flash drive order in boot options.

{ optional make a selection between complete newbie and advanced user }

Follow trivial windows setup steps unless the partitioning step
(screenshot)
This is important step, because you will need to manually allocate free space for the windows partition.

Few words to mention about disc space and usage: usually it's recommended to pick around 60GB for the windows system,
it's varying on how you're planning to use your system, how much space is available and how many programs you want to put in your SSD.
And I'm not mentioning here HDD because it's kind of a bad practice to install system on HDD, it's just slow. But in case you don't have other options, feel free to use HDD.
E.g. in my case I'm using one of mine SSD 465.8GB. It's divided by 3 partitions: windows and 2 other Linux distributions (Archlinux and nixOS).
So my windows partition has got 145GB. This is enough to install all the software I'm using.
If you want to install games on your SSD, which is also a good practice because they will load much faster, you will probably need at least 300GB(from my experience),
but it's really depends, so feel free experimenting.

(screenshot inside allocate)
Pick desired drive, and if there is no unallocated space, press `Delete`.
!WARNING Be aware, that deleting will completely erase your drive and all the data will be lost.
Once you have that unallocated space, press `New` and pick size in MB.
Windows will create three additional drives, so now we have 4 partitions:
Microsoft basic data 145GB
16MB MSR(Reserved) space
EFI ~/boot~ partition - 100MB(System)
500MB Windows recovery environment

!TIP And this is that moment when Windows rly sucks, because in case if you want more then two systems, 100MB is not enough and there is no way to extend that space from Windows installer.


pick your Primary partition and press next
