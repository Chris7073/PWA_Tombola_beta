if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/PWA_Tombola_beta/sw.js', { scope: '/PWA_Tombola_beta/' })})}