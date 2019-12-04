const {resolve} = require('path');
const express = require('express');
const compression = require('compression');
const sha256 = require('js-sha256');

    let SALT;
    if(process.env.SALT){
        SALT = process.env.SALT
    }else{
        SALT = require("../salt.json")
    }


const clientBuildPath = resolve(__dirname, '..', 'build', 'client');

module.exports = function setup(app) {
  app.use(compression());
  app.use('/', express.static(clientBuildPath));

  // all other requests be handled by UI itself
  // app.get('/discover', (req, res) => res.sendFile(resolve(clientBuildPath, 'index.html')));


  app.get('/discover', (request, res) => {

    try{

        const coder_id = request.cookies['coder_id'];
        const hashedCoder = sha256( SALT + coder_id );
        const searcher_id = request.cookies['searcher_id'];
        const hashedSearcher = sha256( SALT + searcher_id );

        if( request.cookies['hasLoggedIn'] === hashedCoder || request.cookies['hasLoggedIn'] === hashedSearcher ){

            res.sendFile(resolve(clientBuildPath, 'index.html'));

        } else {
            res.redirect('/');
        }


    }catch(error){
        console.log("codersearch#discoverCC controller error "+ error);
    }




    });





};