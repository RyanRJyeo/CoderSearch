const sha256 = require('js-sha256');
var cloudinary = require('cloudinary');

module.exports = (db) => {

    let SALT;
    if(process.env.SALT){
        SALT = process.env.SALT
    }else{
        SALT = require("../salt.json")
    }

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let landingPageCC = (request, response) => {
    response.render('codersearch/index');
      // db.pokemon.getAll((error, allPokemon) => {
      //   response.render('pokemon/index', { allPokemon });
      // });
  };


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    landingPage: landingPageCC,
  };

}