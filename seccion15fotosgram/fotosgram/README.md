 
 # Create proyecto
   ionic start nameAplication tabs
 
 # Antes de instlar plugin de cordova, se  debe instalar cordova
    npm i -g cordova
    npm install @ionic-native/core
    ionic cordova plugin add cordova-sqlite-storage
    npm install --save @ionic/storage

    ionic info

    Resolvi.. Me faltaba ejecutar esto por proyecto: 


// Install Ionic Native core library (once per project) $ 

  npm install @ionic-native/core
   
   ionic cordova build


    # Geolocation
    ionic cordova plugin add cordova-plugin-geolocation
    npm install @ionic-native/geolocation

  # Camara
   

    ionic cordova plugin add cordova-plugin-camera
    npm install @ionic-native/camera

    ionic cordova run android -l



   #  Si da error, ir a pag https://www.thecodebuzz.com/cannot-find-module-angular-devkit-build-angular-package-json/ 
    
    #----------------OTHERS------------------------------------

       # Version de cordova
        cordova --version

    # listar disppositios en el cmd
  adb devices
 

3-)  ionic build 

  

4-) Navegar el mismo wifi
 
 

ionic cordova run android -l


# File transfer
ionic cordova plugin add cordova-plugin-file-transfer
npm install @ionic-native/file-transfer
# Deshabilitar capacitor
# ionic integrations disable capacitor

# Si sucede este error
# Cannot find module '@angular-devkit…/utils' when trying to run ionic on android

 

Change package.json file @angular-devkit/build-angular": "~0.1000.0"

# https://stackoverflow.com/questions/64867805/cannot-find-module-angular-devkit-utils-when-trying-to-run-ionic-on-androi

rm -rf node_module
npm i




