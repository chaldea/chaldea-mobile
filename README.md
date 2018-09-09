## chaldea
Chaldea is an anime info web site.

## Features
- Latest bangumi & anime information
- Anime [video, comic, novel] online play
- A very interesting achievement system

## Installation & Run
```bash
npm install -g cordova
npm install -g ionic
npm install
npm run start
```

## Build Web
```bash
npm run build
OR
npm run build:prod
```

## Build Android
```bash
cordova platform add android

cordova build android --debug --buildConfig=build.json
```

## Build IOS
```bash
cordova platform add ios

cordova build ios --device --debug --buildConfig=build.json
```

## Tools
Create android keystore
```bash
keytool -genkey -v -keystore chaldea.keystore -alias chaldea -keyalg RSA -keysize 2048 -validity 10000
```
Unlock mac remote access limit
```bash
security -v unlock-keychain -p "password" "/Users/username/Library/Keychains/login.keychain-db"
```

## License
```
Copyright (C) 2038 Chaldea. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```