 
 # Create proyecto
   ionic start qrscanner2 tabs
 
 # Antes de instlar plugin de cordova, se  debe instalar cordova
    npm i -g cordova

    
 #   Instala para la escanear codigo QR
    ionic cordova plugin add phonegap-plugin-barcodescanner    
    npm install @ionic-native/barcode-scanner


 # listar disppositios en el cmd
  adb devices

# Generate the native project, if it does not already exist.
# For Capacitor, run the following:

1xx-) #
ionic capacitor add android 
ionic capacitor copy android
o ejecutar
2-) 
 # Esta e ejecuto..
 1-)   npx cap add android 

3-)  ionic build 

3.1-)  npx cap add android 
       npx cap open android

4-) Navegar el mismo wifi



--Si da error (package android.support.v4.content does not exist import android.support.v4.content.FileProvider;)
-- https://github.com/ionic-team/capacitor/issues/2822
,.. Coregir con

npm install jetifier
npx jetify
npx cap sync android

------------end error--------------

   y ejecutar
     ionic capacitor run android -l --host=192.168.43.242 --external 

     escojer wifi

# Running with Capacitor
ionic capacitor copy android

# Si no corre con android..
# Instalar cordova
# Borrar carpeta de android primero
# Luego
ionic cordova platform add android

# Live reload
# To start a live-reload server run the following command.

# ionic capacitor run android -l

ionic capacitor run android -l --host=192.168.43.242 --external 

# Error al instalara un lugin capacitor
   # "@ionic-native/in-app-browser" has missing dependencies:  - @ionic-native/core

# Para correr  un plugin se necesitaba Primero correr
   npm install @ionic-native/core --save

# luego instalar el plugin
  
  npm install cordova-plugin-inappbrowser
  npm install @ionic-native/in-app-browser
  ionic cap sync

  # 
  # En la aplicación cuando el deploy en dispositivo fisico de android no me carga ninguna noticia, es como si # no hiciera la consulta, lo extraño es que en el emulador de android si funciona perfectamente. Que podrá # # ser?. Gracias

  camilo ya encontré el problema (en mi caso) la url que estaba utilizando en el enviroments.ts (y el prod) tiene "http" en vez de "https", revisa esto, tal ves sea de ayuda para ti.



cito:

changing the API URL to have HTTPS instead of HTTP typically resolves this issue.

(quita los espacios del link)

https:// stackoverflow .com/ questions/33507566/mixed-content-blocked-when-running-an-http-ajax-operation-in-an-https-page


# Instalar para enviar mails
ionic cordova plugin add cordova-plugin-email-composer
npm install @ionic-native/email-composer
# error en la primera instruccion de arribe, se ejecuta esta
npm i cordova-plugin-email-composer