self.addEventListener('install', (event) => {
    console.log('Service Worker installing.')
    event.waitUntil(
      caches.open('static-cache').then((cache) => {
        return cache.addAll([
          '/PWA_Tombola_beta/',
          '/PWA_Tombola_beta/index.html',
          '/PWA_Tombola_beta/favicon.ico'
        ])
      })
    )
  })
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
      })
    )
  })
  