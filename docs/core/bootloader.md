---
metaTitle: Arch Linux bootloader customization, bootloader grub2 customization, refind, systemd-boot, grub, grub2, bootloader installation process, which bootloader to pick.
---

# Bootloader step
<a id="bootloader"></a>
::: tip
There is also pages for other options:
[rEfInd](/environment/rEFInd)
[systemd-boot](/environment/systemd#systemd-boot)
[GRUB](/environment/GRUB)

You might also want to check [bootloaders fs support](https://wiki.archlinux.org/index.php/Arch_boot_process#Boot_loader)
:::

## Rebooting; the next steps
<a id="reboot"></a>
And after bootloader has been installed, we can exit the chroot environment, and reboot the system.
```sh
exit
umount -R /mnt
reboot
```

You might just follow my steps, but keep in mind that you can improve and change them however you want.
Next steps could vary depending on your preferences. Because choosing environment is very individual.
If the core installation does not contain huge variety of choices, [the next step will make you decide =>](/environment/)
