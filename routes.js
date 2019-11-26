module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const codersearchCC = require('./controllers/codersearch')(allModels);

  app.get('/', codersearchCC.landingPage);
  //app.get('/pokemons/:id', pokemons.getPokemon);
};