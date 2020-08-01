---
metaTitle: ext4 snapshots guide, arch linux snapshots, lvm snaphots, lvm, why do I need snapshots.
---

# System snapshots
<a id="system-snapshots"></a>
[LVM snapshots | archwiki](https://wiki.archlinux.org/index.php/LVM#Snapshots).
So you might wonder, why even bother with snapshots? Well, think of it as a system backup. There are few reasons for that:
```sh
~> rm -rf        # sometimes it happens by accident, you can delete the wrong file or folders recursively
~> chmod         # there is a chance that you will mess with root permissions
~> pacman -Syu   # arch has rolling releases and updating a kernel with all other 3d party libraries that you have installed, this could break your system despite this happens very rarely and on some machines it never happens at all; nevertheless there is still a chance that the next system update will break your system, so I warned you ;)
```
For all this cases and others, you can make preserve your system state as a snapshot, it uses CoW Copy-on-Write method that will save you system state when something changed.
Its also possible to use a [cron](https://wiki.archlinux.org/index.php/Cron) job: every day, every hour, etc.
::: warning
Problems with it will arise once you're dual-booting, because Windows does not support LVM. And keep in mind that you will be unable to access any LVM partitions from Windows.
Nevertheless we can solve this disadvantage in other way.
:::

## Setup
<a id="setup-snapshots"></a>
```sh
root@archiso ~ # vim /etc/systemd/system/mk-lvm-snapshots.service
```
::: tip
`vim` could be substituted with `nano`
:::
Create this service and adjust your VGs:
```service
[Unit]
Description=make LVM snapshots
Requires=local-fs-pre.target
Wants=local-fs.target
DefaultDependencies=no
Conflicts=shutdown.target
After=local-fs-pre.target
Before=local-fs.target

[Install]
WantedBy=make-snapshots.target

[Service]
Type=oneshot
ExecStart=/usr/sbin/lvcreate -L 10G -n snap-root -s /dev/vg0/root
```
::: tip
You can create multiple ExecStart= , if you need to snapshot other partitions separated with ` ; ` and spaces.
:::

```sh
sudo systemctl enable mk-lvm-snapshots.service
```
