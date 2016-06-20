function onDeviceReady() {
  System.config({
    packages: {
      app: {
        format: 'register',
        defaultExtension: 'js'
      }
    },
    map: {
      'app': 'appScripts'
    }
  });
  System.import('app/app').then(null, console.error.bind(console));
}
document.addEventListener("deviceready", onDeviceReady, false);