module.exports = {
  base: '/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'ArchCheatSheet',
      description: 'Install archlinux guide without desktop environment. Xmonad/Xmobar as a window manager.'
    }
  },
  description: 'Archlinux cheatsheet.',
  head: [
    ['meta', { name: 'google-site-verification', content: 'ro0isjNlrmAESMtDHHzvwJKBBC_KNYvHIPY1aaFZMDw' }],
    ['link', { rel: 'icon', href: `/images/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/images/icons/icon-152x152.png` }],
    // ['link', { rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color: '#ffffff' }],
    ['meta', { name: 'msapplication-TileImage', content: '/images/icons/icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }]
  ],
  plugins: [
    ['@vuepress/last-updated', true],
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-131561336-1'
    }],
  ],
  themeConfig: {
    locales: {
      '/': {
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/core/': getCoreSidebar('Beginning of journey', 'Archlinux installation'),
          '/environment/': getEnvironmentSidebar('Environment', 'Laptop', 'The Way of Zen'),
        }
      }
    },
    repo: 'nicholasglazer/archcheatsheet.com',
    editLinks: true
  },
  evergreen: true
}

function getCoreSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'configuring',
        'partitioning'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'base-files',
        'arch-chroot',
        'bootloader'
      ]
    }
  ]
}

function getEnvironmentSidebar (groupA, groupB, groupC) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'gui',
        'networking',
        'multimedia',
        'programming'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'laptop-specific',
        'power-management'
      ]
    },
    {
      title: groupC,
      collapsable: false,
      children: [
        'xmonad-configuration',
      ]
    }
  ]
}
