---
metaTitle: Arch linux partitioning, windows10 dual boot partition, windows file system ntfs, manage partitions, change partitions, mount partitions, make swap, partitioning guide Linux, btrfs partition guide, btrfs snapshots installation, linux snapshots, how to choose a filesystem, how to choose file system.
---

# Partitioning
<a id="partitioning"></a>

::: tip
Read more about file systems [on this page ->](/environment/file-system)
:::
___
Some helpful commands applied to file system.
```sh
lsblk
lsblk -f    # Output info about filesystems. This option is equivalent to "-o NAME,FSTYPE,SIZE,TYPE".
fdisk -l    # Another way to get more data about drives.
```

## Scheme example
<a id="Scheme example"></a>
You should see at least 1 drive, this example has 3 drives including temporary flash drive:

::: tip
Sizes are taken from my Zenbook Pro as an example. This sizes may varying depends on your system and your needs.

Table below is an output of `lsblk` and it is showing you what you might get once you format and mount everything.
This may varying if you pick to use LVM, dual-boot, etc., you should get the idea.

The `sda1`, `sda3`, `sda4` block devices will appear only if you're doing dual-boot with windows.
:::
```sh
NAME   FSTYPE   SIZE TYPE PARTITION TYPE               HEXCODE MOUNTPOINT DEVICE
sda             465G disk                                                 SSD
├─sda1 ntfs     505M part Windows recovery environment 0c01
├─sda2 vfat     100M part EFI System                   EF00    /boot
├─sda3           16M part Microsoft reserved           0c01
├─sda4 ntfs     145G part Microsoft basic data         0700    /winroot
└─sda5 ext4     240G part Linux file system            8300    /root
sdb             932G disk                                                 HDD
└─sdb1          932G part
sdc             7.5G disk                                                 Flash Drive
└─sdc1          7.5G part
```
::: warning
You shouldn't see any mount points now, unless you mounted partitions to them; mounting will be done later.
:::

# Create the partitions
<a id="create-partition"></a>
::: tip
If you're following [Windows dual-boot](/core/windows-dual-boot) way, means your system has been populated with Windows partitions, which means that **EFI System** has been created, but the size of this partition is only `100M`; It's not enough for my needs. The recommended size for the EFI System is about 250-500M.
I might have more then 3 Linux distros for tests, so I'm choosing `500M`, but if the dual boot is the case even 100M is ok. But be aware that it will be 90%+ full.
:::
---

## cgdisk
<a id="cgdisk"></a>
cgdisk has pseudo-GUI, so it could be easier to visualize the process of partitioning.
Generally [cgdisk man page](https://jlk.fjfi.cvut.cz/arch/manpages/man/cgdisk.8) - is a good source of understanding what this program can do.
Run it with:
```sh
root@archiso ~ # cgdisk /dev/sdX # where X is your drive name
```
::: danger disk manipulations
Some actions might destroy all the data on chosen drive. Use with caution!

In case of dual-booting don't wipe any Windows related partitions.
:::

## Create EFI system partition
<a id="create-efi-partition"></a>
::: warnnig dual-boot
If dual-booting, you may skip this, because Windows already created EFI system.
:::
Upper part of the screen shows you the disk - e.g. `/dev/sda`, one of the columns should contain `Free space`, select it and create a new partition.
- To do that, in the bottom part of the screen there is a menu with [ New ] selector is picked by default, then press `RET`.
- Now it's asking to allocate minimum and maximum space sector; starting from 2048 by default, you can press `RET` to accept its minimum.
- After that you can put your desired space in {`K`,`M`, `G`, `T`, `P`} formats.
example for vfat: `512M`.
```sh
512M
```
- Next we need to provide the hex code or default(8300) will be entered. The [EFI](https://wiki.archlinux.org/index.php/EFI_system_partition) hex code is `EF00`
```sh
EF00
```
- Next put any recognizable name, e.g. for this EFI system partition:
```sh
EFI
```
- At the bottom pick [Write] or press `w`. Accept write changes by typing `yes`. Then `q` to quit.

::: tip
Note that EFI partition shouldn't be a part of LVM. But you still have ability to use [GRUB LVM](https://wiki.archlinux.org/index.php/GRUB#LVM)
:::

### [Dual-boot only] EFI limited space issue
<a id="dual-boot-space"></a>
I'll take extra steps to move everything from 100M EFI partition created by Windows, to the newly created EFI partition with sufficient space that fit my needs.
```sh
root@archiso ~ # mkdir /mnt/boot /mnt/bootwin
root@archiso ~ # mkfs.fat -F32 /dev/sda5      # create new 500M EFI
root@archiso ~ # mount /dev/sda1 /mnt/bootwin # mount default windows 100M EFI
root@archiso ~ # mount /dev/sda5 /mnt/boot    # mount new 500M EFI
root@archiso ~ # cp /mnt/bootwin/* /mnt/boot  # copy from 100M EFI to 500M EFI
root@archiso ~ # unmount /dev/sda1            # unmount 100M EFI
root@archiso ~ # cgdisk /dev/sda              # wipe 100M EFI
```
Last but not least, wipe the `sda1`(100M) disk with gdisk or cgdisk, because we need only one EFI partition.
::: warning
If you've been warned that "Non-GPT or damaged disk detected. This program will attempt to convert to GPT form or repair damage to GPT data structures, but may not succeed.
Use gdisk or another disk repair tool if you have a damaged GPT disk.", usually it is a common case, you may skip it.
:::

# Linux Volume Manager
<a id="LVM"></a>
My choice is ext4 + [LVM](https://wiki.archlinux.org/index.php/LVM) - simple, stable and safe to use solution.
LVM is known as a common and pretty much recommended way to extend ext4 possibilities.

## Manipulate LVM
<a id="manipulate-lvm"></a>
You should have now free space left on your disks. If you still didn't allocated them run `cgdisk /dev/sdX` to allocate all the rest of a free space to a separate partition,
which we will use as a Physical Volume(PV) in lvm2.
In my case I'll use the rest of the SSD free space on which Windows is located, so I can divide it at any time later.

### Create PV and VG
Physical Volumes(PV) are combined in Volume Groups(VG).
Lets say you have 2 drives, each of it will be PV and we should add them to the VG.

There is a short way to create multiple PVs and combine them with VG simultaneously.
Using vgcreate you can add as many PVs as you want just adding them as an argument like so `vgcreate vg0 /dev/sda1 /dev/sda2 /dev/sdb4 /dev/sdc`:
In this case `vg0` - is a VG name which I defined for SSD.
And `vg1` - is a VG for HDD.
```sh
root@archiso ~ # vgcreate vg0 /dev/sda1
root@archiso ~ # vgcreate vg1 /dev/sdb1
```
::: tip
Lets say you have another PV to add to the VG, do it like so:
```sh
root@archiso ~ # vgextend vg0 /dev/sdb1
```
And removing PV from VG:
```sh
root@archiso ~ # vgreduce vg0 /dev/sdb1
```
:::

Separating concerns leads system to increase in performance.
Besides it's good idea to separate `/var`, so you will never mess with `/var/logs` full drive issue, which could be a result of kernel panic.

Next we will create Logical Volumes(LV) for two Virtual Groups(VG):
```sh
root@archiso ~ # lvcreate -L 80G vg0 -n lvroot
root@archiso ~ # lvcreate -L 300G vg1 -n lvhome
root@archiso ~ # lvcreate -L 16G vg1 -n lvswap
root@archiso ~ # lvcreate -L 10G vg1 -n lvtmp
root@archiso ~ # lvcreate -L 10G vg1 -n lvvar
```
::: tip
If you want full size to be populated: `lvcreate -l 100%FREE yourVGname -n yourEpicVolumeName`.
But you need to left some free space for snapshots.

Remember that you can start from small sizes and expand them later.

There are handy commands with which you can see more info:
`lvmdiskscan`
`pvs`,`vgs`,
`pvdisplay`, `vgdisplay`, `lvdisplay`
:::

::: tip NB
`[SWAP]` partition size depend on your RAM and a good practice to reserve between 100% to 150% of your swap disk space as RAM.
So if you have 16G of RAM, you should be fine with 16G of SWAP disc space.
Even if you will take less RAM, there is still a good chance of successful hibernating.
:::
## Format and mount LV
<a id="format-mount"></a>
::: tip
`/mnt` refers to the `root` partition
:::
We can manipulate logical volumes now, as if they were normal partitions like `sda` etc.
As you saw before, I've made two VGs one for SSD one for HDD.
### SSD - vg0
All dynamic folders comes to solid state drive:
- `/root` and the rest `/usr`, etc.
```sh
root@archiso ~ # mkfs.ext4 /dev/vg0/lvroot
root@archiso ~ # mount /dev/vg0/lvroot /mnt
```

- `/boot`
::: warning
Pay attention that we're not using LVM for the `/boot`!

If you dual-booting this is the case when you shouldn't formatting boot partition twice.
Same if you following [dual boot space step](#dual-boot-space)
:::
```sh
root@archiso ~ # mkdir /mnt/boot
root@archiso ~ # mkfs.fat -F32 /dev/sda5
root@archiso ~ # mount /dev/sda5 /mnt/boot
```

### HDD - vg1
And all media, cache, logs, tmp, swap and other static comes to the HDD:
```sh
root@archiso ~ # mkdir /mnt/home /mnt/var /mnt/tmp
```
`/home`
```sh
root@archiso ~ # mkfs.ext4 /dev/vg1/lvhome
root@archiso ~ # mount /dev/vg1/lvhome /mnt/home
```
`[SWAP]`
```sh
root@archiso ~ # mkswap /dev/vg1/lvswap
root@archiso ~ # swapon /dev/vg1/lvswap
```
`/var`
```sh
root@archiso ~ # mkfs.ext4 /dev/vg1/lvvar
root@archiso ~ # mount /dev/vg1/lvvar /mnt/var
```
`/tmp`
```sh
root@archiso ~ # mkfs.ext4 /dev/vg1/lvtmp
root@archiso ~ # mount /dev/vg1/lvtmp /mnt/tmp
```
## System snapshots
<a id="system-snapshots"></a>
Follow [this page ->](/environment/snapshots)

## TRIM
<a id="trim"></a>
We might take advantage of [TRIM](https://wiki.archlinux.org/index.php/Solid_state_drive#LVM) with LVM for SSD.
Available devices will appear in the DISC-GRAN and DISC-MAX columns.
```sh
lsblk --discard
```
## Encryption
<a id="encryption"></a>
[Disk encryption](https://wiki.archlinux.org/index.php/Dm-crypt) could be handy if you have any sensitive data that you want to protect with password.
