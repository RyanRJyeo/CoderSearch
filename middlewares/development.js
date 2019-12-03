const {resolve} = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../config/webpack.config.dev');
const sha256 = require('js-sha256');


    let SALT;
    if(process.env.SALT){
        SALT = process.env.SALT
    }else{
        SALT = require("../salt.json")
    }


const compiler = webpack(webpackConfig);

module.exports = function setup(app) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));

  // all other requests be handled by UI itself
  app.get('/discover', (request, res) => {

    try{

        const coder_id = request.cookies['coder_id'];
        const hashedCoder = sha256( SALT + coder_id );
        const searcher_id = request.cookies['searcher_id'];
        const hashedSearcher = sha256( SALT + searcher_id );

        if( request.cookies['hasLoggedIn'] === hashedCoder || request.cookies['hasLoggedIn'] === hashedSearcher ){

            res.sendFile(resolve(__dirname, '..', 'build-dev', 'client', 'index.html'))

        } else {
            res.redirect('/');
        }


    }catch(error){
        console.log("codersearch#discoverCC controller error "+ error);
    }




    });
};