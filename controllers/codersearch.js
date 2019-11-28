const sha256 = require('js-sha256');
var cloudinary = require('cloudinary');
const NodeGeocoder = require('node-geocoder');
const api = require('../api.json')

module.exports = (db) => {

    let SALT;
    if(process.env.SALT){
        SALT = process.env.SALT
    }else{
        SALT = require("../salt.json")
    }

    let success;
    let coderName;
    let searcherName;
    let alertMessage;


  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

// ============================================================
  let landingPageCC = (request, response) => {

    let coder_id = request.cookies['coder_id'];
    let hashedValueCoder = sha256( SALT + coder_id );
    let searcher_id = request.cookies['searcher_id'];
    let hashedValueSearcher = sha256( SALT + searcher_id );

    if( request.cookies['hasLoggedIn'] === hashedValueCoder ){
        response.redirect("/editProfile");
    } else if ( request.cookies['hasLoggedIn'] === hashedValueSearcher ){
        response.redirect("/editProfile");
    } else {

        let data={
            status: success,
            coder: coderName,
            searcher: searcherName
        }

        setTimeout(function(){success = null}, 200);
        setTimeout(function(){coderName = null}, 200);
        setTimeout(function(){searcherName = null}, 200);

        console.log(data);

        response.render('codersearch/index', data);

    };




  };
// ============================================================


// ============================================================
  let registerCoderCC = (request, response) => {

    let occupation = request.body.occupation;
    let name = request.body.name;
    let email = request.body.email;
    let hashedpassword = sha256(SALT + request.body.password);
    let image = "https://kaph.no/wp-content/uploads/2017/12/facebook-default-no-profile-pic.jpg"

    db.codersearch.getCoderRegistered(occupation, name, email, hashedpassword, image, (err, results) =>{

        coderName = request.body.name;

        if (results){
            success = true;
            response.redirect('/');
        } else {
            response.redirect('/');
        };
    });

  };
// ============================================================


// ============================================================
  let registerSearcherCC = (request, response) => {

    let name = request.body.name;
    let email = request.body.email;
    let hashedpassword = sha256(SALT + request.body.password);
    let image = "https://kaph.no/wp-content/uploads/2017/12/facebook-default-no-profile-pic.jpg"

    db.codersearch.getSearcherRegistered(name, email, hashedpassword, image, (err, results) =>{

        searcherName = request.body.name;

        if (results){
            success = true;
            response.redirect('/');
        } else {
            response.redirect('/');
        };
    });

  };
// ============================================================



//============================================================
  const loginCoderCC = async (request, response) => {
    try{

        const email = request.body.email;
        const password = request.body.password;
        const hashedpassword = sha256(SALT + password);

        const results = await db.codersearch.getCoderLoggedIn(email);

        if (hashedpassword === results[0].password){
            const id = results[0].id;
            const hashedcookie = sha256(SALT + id);

            response.cookie('coder_id', id);
            response.cookie('coder_name', results[0].name);
            response.cookie('hasLoggedIn', hashedcookie);

            response.redirect('/editProfile');
        } else {
            response.status(403).render('codersearch/errorLogin');
        }

    } catch(error){
        response.status(403).render('codersearch/errorLogin')
        console.log("codersearch#loginCoderCC controller error "+ error)
    };

  };
//============================================================



//============================================================
  const loginSearcherCC = async (request,response) => {
    try{

        const email = request.body.email;
        const password = request.body.password;
        const hashedpassword = sha256(SALT + password);

        const results = await db.codersearch.getSearcherLoggedIn(email)

        if (hashedpassword === results[0].password){
            const id = results[0].id;
            const hashedcookie = sha256(SALT + id);

            response.cookie('searcher_id', id);
            response.cookie('searcher_name', results[0].name);
            response.cookie('hasLoggedIn', hashedcookie);

            response.redirect('/editProfile');
        } else {
            response.status(403).render('codersearch/errorLogin');
        }

    }catch(error){
        response.status(403).render('codersearch/errorLogin');
        console.log("codersearch#loginSearcherCC controller error "+ error)
    }
  }
//============================================================



// ============================================================
  const editProfileCC = async (request,response) => {
    try{
        const coder_id = request.cookies['coder_id'];
        const hashedCoder = sha256( SALT + coder_id );
        const searcher_id = request.cookies['searcher_id'];
        const hashedSearcher = sha256( SALT + searcher_id );

        if( request.cookies['hasLoggedIn'] === hashedCoder ){
            const results = await db.codersearch.getCoder(coder_id);
            const data = {
                alertMessage: alertMessage,
                results: results
            }
            request.cookies['hasLoggedIn']
            setTimeout(function(){alertMessage = null}, 1000);
            console.log(data);
            response.render('codersearch/coderEdit', data);
        } else if ( request.cookies['hasLoggedIn'] === hashedSearcher ){
            const results = await db.codersearch.getSearcher(searcher_id);
            const data = {
                alertMessage: alertMessage,
                results: results
            }
            setTimeout(function(){alertMessage = null}, 1000);
            console.log(data);
            response.render('codersearch/searcherEdit', data);
        } else {
            response.redirect('/');
        }


    }catch(error){
        response.clearCookie('coder_id', { path: '/' });
        response.clearCookie('coder_name', { path: '/' });
        response.clearCookie('searcher_id', { path: '/' });
        response.clearCookie('searcher_name', { path: '/' });
        response.clearCookie('hasLoggedIn', { path: '/' });

        response.redirect('/')
        console.log("codersearch#editProfileCC controller error "+ error)
    }
  }
// ============================================================





// ============================================================
  const saveProfileCC = async (request,response) => {
    try{
        const coder_id = request.cookies['coder_id'];
        const hashedCoder = sha256( SALT + coder_id );
        const searcher_id = request.cookies['searcher_id'];
        const hashedSearcher = sha256( SALT + searcher_id );

        if( request.cookies['hasLoggedIn'] === hashedCoder ){

            const id = request.body.coder_id;
            const name = request.body.name;
            const occupation = request.body.occupation;
            const language = request.body.language;
            const framework = request.body.framework;
            const description = request.body.description;
            const street = request.body.street;
            const city = request.body.city;
            const state = request.body.state;
            const zip = request.body.zip;
            const country = request.body.country;
            const address = street + " " + city + " " + state + " " + zip + " " + country;

    // ==================================================================
    //                      Geocoding
    // ==================================================================
            const options = {
              provider: 'mapquest',

              // Optional depending on the providers
              httpAdapter: 'http', // Default
              apiKey: api, // for Mapquest, OpenCage, Google Premier
              formatter: null         // 'gpx', 'string', ...
            };

            const geocoder = NodeGeocoder(options);
            let lat;
            let long;
            geocoder.geocode(address)
              .then(async function(res) {
                console.log(res[0]);
                lat = res[0].latitude.toString();
                long = res[0].longitude.toString();
                const results = await db.codersearch.getCoderSaved(id, name, occupation, language, framework, description, street, city, state, zip, country, address, lat, long);
                response.redirect('/editProfile');
              })
              .catch(function(err) {
                console.log(err);
              });

            console.log("Geocoding done");

    // ==================================================================


        } else if ( request.cookies['hasLoggedIn'] === hashedSearcher ){


            const id = request.body.coder_id;
            const name = request.body.name;
            const language = request.body.language;
            const framework = request.body.framework;
            const description = request.body.description;
            const street = request.body.street;
            const city = request.body.city;
            const state = request.body.state;
            const zip = request.body.zip;
            const country = request.body.country;
            const address = street + " " + city + " " + state + " " + zip + " " + country;

    // ==================================================================
    //                      Geocoding
    // ==================================================================
            const options = {
              provider: 'mapquest',

              // Optional depending on the providers
              httpAdapter: 'http', // Default
              apiKey: api, // for Mapquest, OpenCage, Google Premier
              formatter: null         // 'gpx', 'string', ...
            };

            const geocoder = NodeGeocoder(options);
            let lat;
            let long;
            geocoder.geocode(address)
              .then(async function(res) {
                console.log(res[0]);
                lat = res[0].latitude.toString();
                long = res[0].longitude.toString();
                const results = await db.codersearch.getSearcherSaved(id, name, language, framework, description, street, city, state, zip, country, address, lat, long);
                response.redirect('/editProfile');
              })
              .catch(function(err) {
                console.log(err);
              });

            console.log("Geocoding done");

    // ==================================================================


        } else {
            response.redirect('/');
        }


    }catch(error){
        alertMessage = "Error saving profile"
        response.redirect('/');
        console.log("codersearch#saveProfileCC controller error "+ error)
    }
  }
// ============================================================







// ============================================================
  const logoutCC = async (request,response) => {
    try{

        response.clearCookie('coder_id', { path: '/' });
        response.clearCookie('coder_name', { path: '/' });
        response.clearCookie('searcher_id', { path: '/' });
        response.clearCookie('searcher_name', { path: '/' });
        response.clearCookie('hasLoggedIn', { path: '/' });
        response.clearCookie('street', { path: '/' });
        response.clearCookie('city', { path: '/' });
        response.clearCookie('state', { path: '/' });
        response.clearCookie('zip', { path: '/' });
        response.clearCookie('country', { path: '/' });


        response.redirect('/')

    }catch(error){
        console.log("codersearch#logoutCC controller error "+ error)
    }
  }
// ============================================================


// ============================================================
  const changePasswordCC = async (request,response) => {
    try{

        const coder_id = request.cookies['coder_id'];
        const hashedCoder = sha256( SALT + coder_id );
        const searcher_id = request.cookies['searcher_id'];
        const hashedSearcher = sha256( SALT + searcher_id );

        if( request.cookies['hasLoggedIn'] === hashedCoder ){
            const password = request.body.password;

            const hashedpassword = sha256(SALT + request.body.password);

            const results = await db.codersearch.getPwChangedCoder(coder_id, hashedpassword);

            alertMessage = "Changed password successfully"

            response.redirect('/editProfile');
        } else if ( request.cookies['hasLoggedIn'] === hashedSearcher ){
            const password = request.body.password;

            const hashedpassword = sha256(SALT + request.body.password);

            const results = await db.codersearch.getPwChangedSearcher(searcher_id, hashedpassword);

            alertMessage = "Changed password successfully"

            response.redirect('/editProfile');
        } else {
            response.redirect('/');
        }


    }catch(error){
        alertMessage = "Error changing password"
        console.log("codersearch#changePasswordCC controller error "+ error)
    }
  }
// ============================================================




// ============================================================
  const changeProfilePicCC = async (request,response) => {
    try{

        const coder_id = request.cookies['coder_id'];
        const hashedCoder = sha256( SALT + coder_id );
        const searcher_id = request.cookies['searcher_id'];
        const hashedSearcher = sha256( SALT + searcher_id );

        if( request.cookies['hasLoggedIn'] === hashedCoder ){

            cloudinary.uploader.upload(request.file.path, async function(image) {
                const results = await db.codersearch.getPPChangedCoder(coder_id, image.url);
                alertMessage = "Changed profile picture successfully"
                response.redirect('/editProfile');
            });

        } else if ( request.cookies['hasLoggedIn'] === hashedSearcher ){

            cloudinary.uploader.upload(request.file.path, async function(image) {
                const results = await db.codersearch.getPPChangedSearcher(searcher_id, image.url);
                alertMessage = "Changed profile picture successfully"
                response.redirect('/editProfile');
            });

        } else {
            response.redirect('/');
        }


    }catch(error){
        alertMessage = "Error changing password"
        console.log("codersearch#changeProfilePicCC controller error "+ error)
    }
  }
// ============================================================




// ============================================================
  const reactInfoCC = async (request,response) => {
    try{

        const coder_id = request.cookies['coder_id'];
        const hashedCoder = sha256( SALT + coder_id );
        const searcher_id = request.cookies['searcher_id'];
        const hashedSearcher = sha256( SALT + searcher_id );

        if( request.cookies['hasLoggedIn'] === hashedCoder ){

            const coders = await db.codersearch.getCoder(coder_id);
            const searchers = await db.codersearch.getAllSearchers();

            let data = {
                coders: coders,
                searchers: searchers
            }

            response.send(data);

        } else if ( request.cookies['hasLoggedIn'] === hashedSearcher ){

            const coders = await db.codersearch.getAllCoders();
            const searchers = await db.codersearch.getSearcher(searcher_id);

            let data = {
                coders: coders,
                searchers: searchers
            }

            response.send(data);

        } else {
            response.redirect('/');
        }


    }catch(error){
        console.log("codersearch#reactInfoCC controller error "+ error);
    }
  }
// ============================================================







  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    landingPage: landingPageCC,
    registerCoder: registerCoderCC,
    registerSearcher: registerSearcherCC,
    loginCoder: loginCoderCC,
    loginSearcher: loginSearcherCC,
    logout: logoutCC,
    editProfile: editProfileCC,
    saveProfile: saveProfileCC,
    changePassword: changePasswordCC,
    changeProfilePic: changeProfilePicCC,
    reactInfo: reactInfoCC,
  };

}