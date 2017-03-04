# von-count
Counter app for iOS and Android written in Typescript and React Native.

<img src="./assets/vc.gif" height="662" width="370">

## Dev setup

### TypeScript
Run gulp to watch for changes in the `/src` folder
```bash
gulp dev
```

### iOS simulation
Run the iOS simulator
```bash
react-native run-ios
```

Don't forget to enable Hot Reloading in the iOS Device Simulator!

### Android emulation
Open the Android Virtual Device manager
```bash
android avd
```

Select one, and click `Start`.

Run the app in your virtual device:
```bash
react-native run-android
```

To reload, type `RR` from within the device
