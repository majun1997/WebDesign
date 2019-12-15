module.exports = function(app) {
  const jwtHelper = require('../config/jwtHelper'),
        memberCtrl = require('../controller/member-controller'),
        fileCtrl = require('../controller/file-controller'),
        passport = require('passport'),
        artworks=require('../controller/artwork-controller');
  
  
  //app.get('/', (req, res) => res.redirect('/login'));
  app.route('/auth/sign-up')
    .post(memberCtrl.member_sign_up);
  app.route('/auth/login')
    .post(memberCtrl.member_login);
  app.route('/auth/sign-out')
    .post(memberCtrl.member_sign_out);
  app.route('/auth/request-pass')
    .post(memberCtrl.member_request_pass);
  app.route('/auth/reset-pass')
    .post(memberCtrl.member_reset_pass);

  app.route('/artworks/myspace')
    .post(artworks.create);
  app.route('/artworks/byauth/:id')
    .get(artworks.findbyauth);
  app.route('/artworks/list')
    .get(artworks.list);
  app.route('/artworks/list/:id')
    .get(artworks.get)
    .put(artworks.artwork_update)
    .post(artworks.delete)
  app.route('/artworks/auth/:id')
    .get(memberCtrl.getUser)
    // publish artwork route
  app.route('/artworks/new')
    .post(jwtHelper.verifyJwtToken, artworks.publishArtwork)
  app.route('/members/:id')
    .get(memberCtrl.member_getInfo)
  app.route('/members/update-profile')
    .put(jwtHelper.verifyJwtToken, memberCtrl.member_update_profile);
  app.route('/members/follow')
    .post(jwtHelper.verifyJwtToken,memberCtrl.addfollowing);
  // when need to verify token, use middleware: jwtHelper.verifyJwtToken)
  app.route('/members/unfollow')
  .post(jwtHelper.verifyJwtToken,memberCtrl.unfollowing);
  app.route('/members/setfavourite')
  .post(jwtHelper.verifyJwtToken,memberCtrl.setfavourite);
  app.route('/members/unfavourite')
  .post(jwtHelper.verifyJwtToken,memberCtrl.unfavourite);
  // image file routes
  app.route('/images/:id/profileImg/*')
    .get(fileCtrl.sendImg);
  app.route('/images/:id/artworkPic/*')
    .get(fileCtrl.sendImg);
  app.route('/images/*')
    .get(fileCtrl.sendImg)
    
  app.route('/upload_img')
    .post(jwtHelper.verifyJwtToken,fileCtrl.uploadImg)
  app.route('/images/:id/artworkPic/:filename')
    .delete(fileCtrl.deletefailed);
  app.route('/upload_artworkPic')
    .post(jwtHelper.verifyJwtToken,fileCtrl.uploadArtworkPic);
  app.route('/sounds/*')
    .get(fileCtrl.sendImg);


};