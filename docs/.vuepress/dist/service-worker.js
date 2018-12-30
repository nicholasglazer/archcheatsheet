/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "7f4c97cc205a518a3711e25c19f1d8c2"
  },
  {
    "url": "assets/css/0.styles.8beda5c0.css",
    "revision": "14459ca040c6ea4b4e2245416a77e5c2"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.f010f029.js",
    "revision": "5c730334ffe75f474adf7fdee7094821"
  },
  {
    "url": "assets/js/11.43003a21.js",
    "revision": "18c6c8896094b55f37d862bc2e8832e5"
  },
  {
    "url": "assets/js/12.721ab1d3.js",
    "revision": "9217a0fef705426a2545af56a91c7b56"
  },
  {
    "url": "assets/js/13.c41acbb1.js",
    "revision": "898c01ab066b7f0fc8163ef057c908db"
  },
  {
    "url": "assets/js/14.efa1ac6a.js",
    "revision": "6764e3d56aa187d038f61f85bfec56b3"
  },
  {
    "url": "assets/js/15.af653d54.js",
    "revision": "ae9139a09601b20b00513880ef502ed3"
  },
  {
    "url": "assets/js/16.b8743297.js",
    "revision": "7e3fb7cf7747904c4366ff25dcaeb8ac"
  },
  {
    "url": "assets/js/17.0121d13d.js",
    "revision": "916091d6e00b38cf117be5abbefddcd1"
  },
  {
    "url": "assets/js/18.7dabfb1b.js",
    "revision": "e2f2c8aef47b5095fd4e2aa8b58bf508"
  },
  {
    "url": "assets/js/19.7ee53e86.js",
    "revision": "af8333e39c986b09fc42040bf5159203"
  },
  {
    "url": "assets/js/2.7c432076.js",
    "revision": "cf9d4d012830822f34c3049c08a55710"
  },
  {
    "url": "assets/js/20.1d34e8b5.js",
    "revision": "6117ef2ea06620334562451f3cf70758"
  },
  {
    "url": "assets/js/21.37669c44.js",
    "revision": "27c16da95acc9dc51dcfd720137d9c9e"
  },
  {
    "url": "assets/js/22.1e6adf12.js",
    "revision": "a582671c0811b09160aa654c2ff14811"
  },
  {
    "url": "assets/js/23.246ed182.js",
    "revision": "5f41ba029ce0552427eda7bc248053c5"
  },
  {
    "url": "assets/js/24.fb269130.js",
    "revision": "7c2c2ca477e4d2f179e5a371087006b0"
  },
  {
    "url": "assets/js/3.428fa45c.js",
    "revision": "8d4bc4989a4942c2897c8d77add6636a"
  },
  {
    "url": "assets/js/4.ffe8340f.js",
    "revision": "90ecd47018828fa5439fdc8337696691"
  },
  {
    "url": "assets/js/5.66575d91.js",
    "revision": "b72ef6f5236e9cd19b8a7fd953391376"
  },
  {
    "url": "assets/js/6.fcd05d1d.js",
    "revision": "32ddd452ed4754a4edb36b94008c31ec"
  },
  {
    "url": "assets/js/7.28c209ad.js",
    "revision": "b874ad42e92639e85146358068194cf3"
  },
  {
    "url": "assets/js/8.1684c35e.js",
    "revision": "448a83a8581a2926f6c6ebe462867cc9"
  },
  {
    "url": "assets/js/9.93a77fd1.js",
    "revision": "1dfdad289efcee3cbd2162315b6d3e9f"
  },
  {
    "url": "assets/js/app.18f5e9e7.js",
    "revision": "0e51741e87643f3520a98aabf3b39274"
  },
  {
    "url": "cheatsheet/arch-chroot.html",
    "revision": "ac620d25fab40c74261f018ebd461938"
  },
  {
    "url": "cheatsheet/base-files.html",
    "revision": "fbbcb73dadad067b25ac62f0f65ef5f5"
  },
  {
    "url": "cheatsheet/bootloader.html",
    "revision": "ecebfb764eb36225468836e1b09b6f23"
  },
  {
    "url": "cheatsheet/configuring.html",
    "revision": "ec8d212f1ed9cd6c7049349c9f93dc16"
  },
  {
    "url": "cheatsheet/index.html",
    "revision": "617ff0db255b4bb0d311d0e83b33bf1a"
  },
  {
    "url": "cheatsheet/partitioning.html",
    "revision": "db5c29f3cecccd6ca1ec85c8262f53c6"
  },
  {
    "url": "contributing/index.html",
    "revision": "32a0c52e1fdbb8e626aa0c90212fcde3"
  },
  {
    "url": "environment/gui.html",
    "revision": "e8f4acadd08e474d49409ff69232605e"
  },
  {
    "url": "environment/index.html",
    "revision": "cc556ace2311f10ee665c3ce65639616"
  },
  {
    "url": "environment/laptop-specific.html",
    "revision": "215fe87064984aeeea88c7d917ab60a4"
  },
  {
    "url": "environment/multimedia.html",
    "revision": "12cadea705d89c2a25c6acdd8f852317"
  },
  {
    "url": "environment/networking.html",
    "revision": "456620bb5e8522acdaee1cc9e761dcfb"
  },
  {
    "url": "environment/power-management.html",
    "revision": "1cb809943a510cb5bba4656da92f6ded"
  },
  {
    "url": "environment/programming.html",
    "revision": "4e71596b63283298e0dff943c7110fc7"
  },
  {
    "url": "environment/xmonad-configuration.html",
    "revision": "b5130b41b613e2fd10d06a9b0c7830f2"
  },
  {
    "url": "i18n/index.html",
    "revision": "c3d10774da1a0d8540f82f51d0d6f9fc"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "438925d2d80c0608991b7a1f739df261"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "1b49c61c732ad76cfe109c96a9cbc0e0"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "589798fa589400b5798c5895e67fdda7"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "4ed41134229f81540beecb9b821f158e"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "65ce9ba1efded325c2854667b94a6aa3"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "79ebb650664b6030a8438275dfb80e65"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "365901534ae17eb50323cc89533ad37e"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "76bb007309ba25e7f1a96c2ec6b0b8ea"
  },
  {
    "url": "images/logo.png",
    "revision": "708435d8d99f5a08d28e0e591868ceb1"
  },
  {
    "url": "images/mpd.gif",
    "revision": "d5fe24207723dbd23edecf13b3e608ab"
  },
  {
    "url": "images/ranger.gif",
    "revision": "bd6006e9cb20d6fef9f95953a9d2e78e"
  },
  {
    "url": "images/refind.png",
    "revision": "972ba323b67ddb4316818cd4bd09d444"
  },
  {
    "url": "images/rofi.gif",
    "revision": "3fb78c8aaab94cfa4fc5deccb90d4256"
  },
  {
    "url": "images/spacemacs.png",
    "revision": "bc45ab0d1e9182c725644ac15b2b97fb"
  },
  {
    "url": "images/xmobar.gif",
    "revision": "70f122efdee3c54921a0b68006cdcb98"
  },
  {
    "url": "index.html",
    "revision": "bf55703a26671bf9706441d8110720cc"
  },
  {
    "url": "ru/index.html",
    "revision": "d92f040971898b3d68c92a6e9e4ba4cd"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
