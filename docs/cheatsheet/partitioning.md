---
metaTitle: Archlinux change partitions, mont partitions, make swap. | ArchCheatSheet
---

# Partitioning
<a id="partitioning"></a>
Lets cover some basics here, because this part could be confusing.

To see your [partition](https://wiki.archlinux.org/index.php/Partitioning) scheme type:
```sh
lsblk
```

## Scheme example
<a id="Scheme example"></a>
You should see at least 1 drive, this example has 3, including temporary flash drive:
```sh
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0   465G  0 disk                   *SSD*
├─sda1   8:1    0   499M  0 part 
├─sda2   8:2    0   100M  0 part /boot          
├─sda3   8:3    0    16M  0 part 
├─sda4   8:4    0   185G  0 part 
└─sda5   8:5    0   200G  0 part /
sdb      8:16   0 931.5G  0 disk                   *HDD*
├─sdb1   8:17   0   400G  0 part /home
├─sdb2   8:18   0    24G  0 part [SWAP]
└─sdb3   8:19   0   508G  0 part 
sdc      8:32   1   7.5G  0 disk                   *Flash Drive*
└─sdc1   8:33   1   7.5G  0 part
```
::: warning
For now you shouldn't see any mount points unless you mount partitions to them, we will do it later.
:::

## Disks partitioning
<a id="disk-partitioning"></a>
If you are doing dual boot system with Windows, then **EFI System Partition** has been created with Windows installation.  
You must mount it as a `/boot` for the Linux bootloader.

---
If you want to make clean solo arch installation you can wipe your drive:

::: danger Wiping disk 
This will destroy all data on chosen drive. Use with caution!

Don't wipe `sda` in case you had installed Windows for dual boot system.
:::

```sh
gdisk /dev/sdX # where X is your drive name 
```

Press `RET` first, then `x` for advanced config and `z` for zap.
And now create a new one:

```sh
cgdisk /dev/sdX # where X is your drive name
```
::: warning Note!
[gdisk](https://wiki.archlinux.org/index.php/Gdisk) is for GPT only, if you need MBR(*old way*), rather use fdisk or parted because they could cover both GPT and MBR.   
It is also possible to [convert between MBR and GPT](https://wiki.archlinux.org/index.php/Gdisk#Convert_between_MBR_and_GPT) with gdisk.
:::

::: tip
If you want to create any stacked block devices for LVM, disk encryption or [RAID](https://wiki.archlinux.org/index.php/RAID), do it now.
You also can enable [TRIM](https://wiki.archlinux.org/index.php/Solid_state_drive#TRIM) for SSD.
:::

### SSD
<a id="SSD"></a>
It's better to use SSD ([sda](#scheme-example) in this case) for the system files where speed is important e.g.: bootloader, programs, et.c.
| Tables | size | FS type | mountpoint |
|--------|------|---------|------------|
| sda1   | 499M | 0c01    | -          |
| sda2   | 100M | EF00    | boot       |
| sda3   | 16M  | 0c01    | -          |
| sda4   | 185G | 0700    | -          |
| sda5   | 200G | 8300    | root       |
- **sda1,3** Microsoft reserved space.
- **sda2** To boot the system it must be exactly `EF00`. In case of dual boot, Windows will create this partition automatically.
- **sda4** Windows partition.
- **sda5** I set 200G for the `root`, but it could be less: ~60-100G should be fine, depends on your needs.

### HDD
<a id="HDD"></a>
On the other hand HDD([sdb](#scheme-example)) could be used as a place for user files e.g.: music, projects, configurations, et.c..
| Tables | size | FS type | mountpoint | description                |
|--------|------|---------|------------|----------------------------|
| sdb1   | 400G |    8300 | home       | linux file system          |
| sdb2   | 24G  |    8200 | swap       | 1.5 of my RAM memory (16G) |
| sdb3   | 508G |    0700 | winhome    | microsoft basic data       |
- **sdb1** `/home` place for your user files.
- **sdb2** `SWAP` depends on your RAM quantity. Usually you should take x1 or x1.5 of your RAM. 
::: warning SWAP NOTE
If you will take less RAM, there is still a chance of successfull hibernating.
:::
- **sdb3**  will contain Windows files.
::: tip
You also have choice to use space to mount e.g.: `/usr` or `/var`.
:::

## Mounting folders
<a id="mounting-folders"></a>
We want to assign `/mnt` to the `root` partition:
```sh
mount /dev/sda5 /mnt
```
Next we need to create some new folders in our `/mnt`:
```sh
mkdir /mnt/boot
mkdir /mnt/home
```

Mount them accordingly:
```sh
mount /dev/sda2 /mnt/boot
mount /dev/sdb1 /mnt/home
```

## Format the partitions
<a id="format-partitions"></a>
Partitions must be formatted with an appropriate file system:
- **SWAP:** 
```sh
mkswap /dev/sdb2
swapon /dev/sdb2
```
- **Linux:** 
```sh
mkfs.ext4 /dev/sda5
mkfs.ext4 /dev/sdb1
```
::: tip
Press `y` if you have this warning: `/dev/sdxY contains a ext4 file system`
:::
- **/boot:** 
```sh
mkfs.fat -F32 /dev/sda1
```
::: tip
Boot must be Fat32 as UEFI requirement.   

You already have EFI partition if you installed Windows.
:::
