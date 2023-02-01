### Setup

<details>
  <summary>Server Setup</summary>
  
  This is the Desciption for the server setup

  **1. Server Dependencies**
  - typescript
  - tslint
  ``` javascript
  yarn add -D typescript tslint
  ```

  **2. Create a typescript configuration file**
  ``` javascript
  tsc --init
  ```
  > This command will create a basic typescript configuration file

  Changes in the configuration file:
  1. Uncomment the outDir line and replace it with the following
  ``` javascript
  "outDir": "./dist"
  ```
  It tells the compiler where we are going to keep our compiled JavaScript files

  2. Uncomment the follwing lines
  - "noImplicitAny": true
  - "strictNullChecks": true
  - "strictFunctionTypes": true
  - "noUnusedLocals": true
  - "noUnusedParameters": true
  - "moduleResolution": "node"
  - "baseUrl": "./"


  **3. Uncomment the path line and replace it with the following**
  ``` javascript
  "paths": {
        "*": [
          "node_modules/*"
        ]
      },    
  ```

  **4. Adding exclude and include**
  - "exclude": ["node_modules"]
  - "include": ["./src/**/*.ts"],

  **5. Create a tslint.json file**
  Paste the following code in it 
  ```javascript
  {
      "extends": "tslint:recommended",
      "defaultSeverity": "error",
      "rules": {
          "no-console": {
              "severity": "warning",
              "options": ["debug", "info", "log", "time", "timeEnd", "trace"]
          }
      },
      "jsRules": {}
  }
  ```

  **6. Change the Entry point configuration in package.json**
  Replace "main": "index.js" by the follwing
  ``` javascript 
  "main": "dist/index.js"
  ```

  **7. Running the application for the first time**
  - First type tsc in the terminal (It will create a dist folder with index.js file in it)
  ``` javascript
  tsc
  ```
  - Now, Run the application with node .
  ``` javascript
  node .
  ```

  > Note: The Server wil run perfectly, but it stops after running once, hence addding nodemon to run the server on each backend change and some other typescript configurations

  ---


  **8. Adding Nodemon server dependency**
  ``` javascript
  yarn add -D nodemon
  ```

  **9. Adding scripts to package.json**
  Paste the follwing code in it
  ``` javascript
  "scripts": {
      "prebuild": "tslint -c tslint.json -p tsconfig.json --fix",
      "build": "tsc",
      "watch": "tsc -w",
      "prestart": "yarn build",
      "start": "nodemon ."
    },
  ```

  ```
  1. prebuild (Compilation): It checks the typescript code, -c compiles the tsline.json file -p passes the tsconfig.json as a additional parameter and --fix fixes any issues if exists
  2. build (Building): It simply build the application once all the typescript errors if exist are resolved
  3. watch (New): It watches out for any new changes 
  4. prestart (Installing Dependencies): Before starting the server, just making sure that all dependencies are installed
  5. start (Running Server): Start the server

  Flow of the Running Process: prebuild -> build -> watch -> prestart -> start
  ```

  **10. Running the application for the second time**
  Simply type the following command
  ``` javascript
  yarn start
  ```

  **8. Adding Concurrently server dependency**
  ``` javascript
  yarn add -D concurrently
  ```

  > This allows to run two commands simultaneously

  **11. Running the applicationfor the third time**
  Simple replace the scripts start line with the following
  ``` javascript
  "start" : "concurrently --kill-others \"yarn watch\" \"nodemon .\""
  ```

  **12. Creating a gitignore file**
  - Add the following files: node_modules, dist, logs, *.logs, *.env
  - Or simply paste the follwing
  ```
  node_modules 
  dist
  logs 
  *.logs
  *.env
  ```
</details>

<details>
  <summary>Client Setup</summary>

  This is the Desciption for client setup

  **1. Create a React Application with typescrip template**
  ``` javascript
  npx create-react-app . --template typescript
  ```
</details>