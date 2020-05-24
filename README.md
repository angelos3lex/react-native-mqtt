[![npm](https://img.shields.io/npm/dt/react-native-mqtt.svg)]()

## Description

A [react-native](https://github.com/facebook/react-native) mqtt client module that works

## MQTT Features (inherited from the native MQTT framework)
* Uses [MQTT Framework](https://github.com/ckrey/MQTT-Client-Framework) for IOS, [Paho MQTT Client](https://eclipse.org/paho/clients/android/) for Android
* Supports both IOS and Android
* SSL/TLS
* Native library, support mqtt over tcp (forget websockets, we're on **mobile**)


## Getting started

### Installation

#### Step 1:
```bash
npm install sp-react-native-mqtt --save
```

or

```bash
yarn add sp-react-native-mqtt
```

#### Step 2: (Skip this step if you are using RN 0.60 or above as the module will be auto-linked)

```bash
react-native link sp-react-native-mqtt
```


#### Step 3:
##### iOS

Add `pod 'MQTTClient'` to your podfile and `pod install`

<details>
<summary>Alternatively you can manually link the library on iOS (click to expand)</summary>

In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
* Go to `node_modules` ➜ `sp-react-native-mqtt` and add `RCTMqtt.xcodeproj`
* In XCode, in the project navigator, select your project. Add `libRCTmqtt.a` and `libicucore.tbd` to your project's `Build Phases` ➜ `Link Binary With Libraries`
* Click `RCTMqtt.xcodeproj` in the project navigator and go the `Build Settings` tab. Make sure 'All' is toggled on (instead of 'Basic'). In the `Search Paths` section, look for `Header Search Paths` and make sure it contains both `$(SRCROOT)/../../react-native/React` - mark  as `recursive`.

</details>



##### Android

*   Modify the ReactInstanceManager.builder() calls chain in `android/app/main/java/.../MainActivity.java` to include:

```java
import com.tuanpm.RCTMqtt.*; // import

new RCTMqttPackage()           // as a child of the getPackages() returned array
```

* Append the following lines to `android/settings.gradle` before `include ':app'`:

```
include ':sp-react-native-mqtt'
project(':sp-react-native-mqtt').projectDir = new File(rootProject.projectDir,  '../node_modules/sp-react-native-mqtt/android')

```


- Insert the following lines inside the dependencies block in `android/app/build.gradle`, don't miss `apply plugin:'java'` on top:

```
compile project(':sp-react-native-mqtt')
```



## Usage

```javascript
import MQTT from 'sp-react-native-mqtt';

/* create mqtt client */
MQTT.createClient({
  uri: 'mqtt://test.mosquitto.org:1883',
  clientId: 'your_client_id'
}).then(function(client) {

  client.on('closed', function() {
    console.log('mqtt.event.closed');
  });

  client.on('error', function(msg) {
    console.log('mqtt.event.error', msg);
  });

  client.on('message', function(msg) {
    console.log('mqtt.event.message', msg);
  });

  client.on('connect', function() {
    console.log('connected');
    client.subscribe('/data', 0);
    client.publish('/data', "test", 0, false);
  });

  client.connect();
}).catch(function(err){
  console.log(err);
});

```

## API

* `mqtt.createClient(options)`  create new client instance with `options`, async operation
  * `uri`: `protocol://host:port`, protocol is [mqtt | mqtts]
  * `host`: ipaddress or host name (override by uri if set)
  * `port`: port number (override by uri if set)
  * `tls`: true/false (override by uri if set to mqtts or wss)
  * `user`: string username
  * `pass`: string password
  * `auth`: true/false - override = true if `user` or `pass` exist
  * `clientId`: string client id
  * `keepalive`

* `client`
  * `on(event, callback)`: add event listener for
    * event: `connect` - client connected
    * event: `closed` - client disconnected
    * event: `error` - error
    * event: `message` - message object
  * `connect`: begin connection
  * `disconnect`: disconnect
  * `subscribe(topic, qos)`
  * `publish(topic, payload, qos, retain)`

* `message`
  * `retain`: *boolean* `false`
  * `qos`: *number* `2`
  * `data`: *string* `"test message"`
  * `topic`: *string* `"/data"`

## Todo

* [ ] Use WeakReference for timer
* [ ] Add disconnecting event

## LICENSE

```text
INHERIT FROM MQTT LIBRARY (progress)
```
