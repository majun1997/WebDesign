'use strict';
//import service
require('../config/passportConfig');
const memberService = require('../services/member-services'),
      passport = require('passport'),
      bcrypt = require('bcrypt');

// sign up api
/**
 *
 *
 * @param {*} request
 * @param {*} response
 */
exports.getUser = function (request, response) {
  const resolve = (list) => {
      response.status(200);
      response.json(list);
  };
  //console.log(request.params)
  memberService.getMember(request.params.id)
      .then(resolve)
      .catch(renderErrorResponse(response));
};
exports.member_sign_up = (req, res) => {
  let newMember = {};
  newMember.email = req.body.email;
  newMember.name = req.body.fullName;

  let password = req.body.password,
      confirmPassword = req.body.confirmPassword;
  // check if the two pass word is the same
  if(password !== confirmPassword){
    res.status(422)
      .json({message: 'the two password must be the same!'})
    return;
  }
  // encode the pass word
  newMember.password = bcrypt.hashSync(req.body.password, 10);
  // if success, return the token
  /**
   *
   *
   * @param {*} signedMember
   */
  let resolve = (signedMember) => {
    res.status(200)
      .json({'token': signedMember.generateJwt()})
  }
  // handle error
  /**
   *
   *
   * @param {*} res
   * @returns
   */
  let handleError = (res) => {
    const errorCallback = (error) => {
      if (error) {
        if(error.code === 11000){
          res.status(422).send(['Duplicate email address found.']);
        }else{
          res.status(500);
          res.json({
              message: error.message
          });
        }
      }
    }
    return errorCallback;
  };
  
  memberService.signUp(newMember)
    .then(resolve)
    .catch(handleError(res));

};

//login api
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.member_login = (req, res, next) => {
  // call for passport authentication
  // @ts-ignore
  passport.authenticate('local', (err, member, info) => {       
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered member
    else if (member) return res.status(200).json({ "token": member.generateJwt() });
    // unknown member or wrong password
    else return res.status(404).json(info);
  })(req, res, next);
}

exports.member_sign_out = (req, res) => {
  res.json({
    message:'Sign out successful!'
  })
}

exports.member_request_pass = (req, res) => {
  res.json({
    message:'Request pass connected!'
  })
}

exports.member_reset_pass = (req, res) => {
  res.json({
    message:'Reset pass connected!'
  })
}

exports.member_getInfo = (req, res) => {
  let resolve = (member) => {
    res.status(200)
      .json(member)
  };
  memberService.getMember(req.params.id)
    .then(resolve)
    .catch(renderErrorResponse(res));
}

exports.member_update_profile = (req, res) => {
  let update_member = req.body;
  console.log(update_member)
  const resolve = (member) => {
    res.status(200);
    res.json({ "token": member.generateJwt() , "msg": 'OK'});
  };
  memberService.updateProfile({_id: req._id}, update_member)
    .then(resolve)
    .catch(renderErrorResponse(res));
}

exports.addfollowing=(req,res)=>{
  // let memberId=req.body.id;
   let authorId=req.body; 
   let memberId=req._id;
  // Console.log(authorId);
  
  const resolve=()=>{
    res.status(200);
    res.json({"msg": "OK"})
    };
  memberService.addfollowing(memberId,req.body)
               .then(resolve)
               .catch(renderErrorResponse(res));
}
exports.unfollowing=(req,res)=>{
  // let memberId=req.body.id;
  // let authorId=req.body; 
   let memberId=req._id;
  // Console.log(authorId);
  const resolve=()=>{
    res.status(200);
    res.json({"msg": "OK"})
    };
  memberService.unfollowing(memberId,req.body)
               .then(resolve)
               .catch(renderErrorResponse(res));
}
exports.setfavourite=(req,res)=>{
  // let memberId=req.body.id;
  // let authorId=req.body; 
   let memberId=req._id;
  // Console.log(authorId);
  const resolve=()=>{
    res.status(200);
    res.json({"msg": "OK"})
    };
  memberService.setfavourite(memberId,req.body)
               .then(resolve)
               .catch(renderErrorResponse(res));
}
exports.unfavourite=(req,res)=>{
  // let memberId=req.body.id;
  // let authorId=req.body; 
   let memberId=req._id;
  // Console.log(authorId);
  const resolve=()=>{
    res.status(200);
    res.json({"msg": "OK"})
    };
  memberService.unfavourite(memberId,req.body)
               .then(resolve)
               .catch(renderErrorResponse(res));
}

// exports.list_all_members = (req, res) => {
//   const resolve = (members) => {
//     res.status(200);
//     res.json(members);
//   };
//   memberService.list()
//     .then(resolve)
//     .catch(renderErrorResponse(res));
// };

// exports.create_a_member = (req, res) => {
//   var newmember = req.body;
//   const resolve = () => {
//     res.status(200);
//     res.json(newmember);
//   };
//   memberService.create(newmember)
//     .then(resolve)
//     .catch(renderErrorResponse(res));
// };

// exports.read_a_member = (req, res) => {
//   const resolve = (member) => {
//     res.status(200);
//     res.json(member)
//   };
//   memberService.read(req.params.id)
//     .then(resolve)
//     .catch(renderErrorResponse(res));
// };

// exports.update_a_member = (req, res) => {
//   const updatedmember = req.body;
//   const resolve = () => {
//     res.status(200);
//     res.json(updatedmember);
//   };
//   memberService.update({_id: req.body.id}, updatedmember)
//     .then(resolve)
//     .catch(renderErrorResponse(res));
// };

// exports.delete_a_member = (req, res) => {
//   const resolve = (member) => {
//     res.status(200);
//     res.json({
//       message: 'member successfully deleted'
//     });
//   };
//   memberService.delete({_id: req.params.id})
//     .then(resolve)
//     .catch(renderErrorResponse(res));
// };

/**
 * Throws error if error object is present.
 */
let renderErrorResponse = (res) => {
  const errorCallback = (error) => {
      if (error) {
          res.status(500);
          res.json({
              message: error.message
          });
      }
  }
  return errorCallback;
};