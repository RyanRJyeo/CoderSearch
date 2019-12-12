# FileUpp



## Technologies Used
  ```
  Javascript
  React.js
  Webpacker
  Node.js
  Express
  PostgreSQL
  Bootstrap 4
  Heroku
  Cloudinary
  Geocode NPM
  Mapbox
  Socket.io
  Boxicon
  ```

## Approach
The app was built based on a mobile-friendly-first approach. Making sure the app worked on a mobile interface was paramount as it is meant for users to be able to use it both on mobile and on desktop/laptop, but mostly on mobile. 


I've separated the project into two parts:

1. The MVP (minimum viable product). It consist of users logging in, updating and changing their own profile information, find other users, see other users on the Mapbox API as markers with popups revealing some info about the users, and finally see their full profile.

2. The further (additional goals). It consist of users being able to talk start a conversation with each other and chat in a real-time scenario, with the messages constantly updated if the database is updated. After the normal non-live version of the chat is done, I used Socket.io to link up the chat with my database.


This separation of project segments allowed me to pace myself accordingly as I worked on the project. 


## Installation Dependencies

```
  "dependencies": {
    "@babel/core": "^7.7.4",
    "@babel/preset-env": "^7.7.4",
    "@babel/preset-react": "^7.7.4",
    "axios": "^0.19.0",
    "babel-loader": ">=8.0.5",
    "babel-watch": ">=7.0.0",
    "classnames": "^2.2.6",
    "cloudinary": "^1.17.0",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.4",
    "cross-env": ">=5.2.0",
    "css-loader": "^3.2.1",
    "express": ">=4.16.4",
    "express-react-views": "^0.11.0",
    "extract-text-webpack-plugin": ">=4.0.0-beta.0",
    "html-loader": ">=0.5.5",
    "html-webpack-harddisk-plugin": ">=1.0.1",
    "html-webpack-plugin": ">=3.2.0",
    "jquery": "^3.4.1",
    "js-cookie": "^2.2.1",
    "js-sha256": "^0.9.0",
    "json-loader": "^0.5.7",
    "multer": "^1.4.2",
    "node-geocoder": "^3.25.0",
    "node-sass": "^4.12.0",
    "nodemailer": "^6.3.1",
    "pg": "^7.14.0",
    "postcss-load-config": ">=2.0.0",
    "postcss-loader": ">=3.0.0",
    "react": "^16.8.2",
    "react-dom": "^16.8.2",
    "react-hot-loader": ">=4.6.5",
    "react-map-gl": "^5.1.3",
    "react-router-dom": "^5.1.2",
    "react-scroll": "^1.7.14",
    "rimraf": ">=2.6.3",
    "sass-loader": ">=7.1.0",
    "sha-256": "^1.0.3",
    "socket.io": "^2.3.0",
    "style-loader": "^1.0.1",
    "webpack": "^4.29.4",
    "webpack-cli": ">=3.2.3",
    "webpack-dev-middleware": ">=3.5.2",
    "webpack-hot-middleware": "^2.25.0",
    "webpack-merge": ">=4.2.1"
  }
```