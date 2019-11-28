module.exports = (app, allModels) => {

    var multer = require('multer');
    var upload = multer({ dest: './uploads/' });
    var cloudinary = require('cloudinary');

  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR CODERSEARCH CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const codersearchCC = require('./controllers/codersearch')(allModels);

  app.get('/', codersearchCC.landingPage);

  app.post('/registerCoder', codersearchCC.registerCoder);
  app.post('/loginCoder', codersearchCC.loginCoder);

  app.post('/registerSearcher', codersearchCC.registerSearcher);
  app.post('/loginSearcher', codersearchCC.loginSearcher);

  app.get('/logout', codersearchCC.logout);

  app.get('/editProfile', codersearchCC.editProfile);
  app.post('/saveProfile', codersearchCC.saveProfile);
  app.post('/changePassword', codersearchCC.changePassword);
  app.post('/changeProfilePic', upload.single('myFile'), codersearchCC.changeProfilePic);

};