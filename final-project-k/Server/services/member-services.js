/**
 * Service for sticky operations.
 */
'use strict';

var mongoose = require('mongoose'),
  Member = mongoose.model('Member');

//and signup service
exports.signUp = (newMember) => {
  const promise = Member.create(newMember);
  return promise;
}



/**
 *
 *
 * @param {*} memberID
 * @returns
 */
exports.getMember = (memberID) => {
  const promise = Member.findById(memberID).exec();
  return promise;
}

/**
 *
 *
 * @param {*} newArtwork
 * @param {*} authorID
 * @returns 
 */
exports.AddArtwork = (newArtwork, authorID) => {
  const promise = Member.update({"_id": authorID},
  {
    $push: {
      artworks: newArtwork
    }
  }
  ).exec();
  return promise;
}

/**
 *
 *
 * @param {*} memberID
 * @param {*} update_content
 * @returns
 */
exports.updateProfile = (memberID, update_content) => {
  const promise = Member.findByIdAndUpdate(memberID, update_content).exec();
  return promise;
}
/**
 *
 *
 * @param {*} memberID
 * @param {*} author
 * @returns
 */
exports.addfollowing=(memberID,author)=>{
    const aid=author._id;
  const promise1 = Member.update({"_id": memberID},
   {$push: {
          following:aid
    }}).exec();
    const promise2 = Member.update({"_id": aid},
    {$push: {
           follower:memberID
     }}).exec();
   const promise3=promise1.then(promise2)
    return promise3;
  }   
  exports.unfollowing=(memberID,author)=>{
    const aid=author._id;
  const promise1 = Member.update({"_id": memberID},
   {$pull: {
          following:aid
    }}).exec();
    const promise2 = Member.update({"_id": aid},
    {$pull: {
           follower:memberID
     }}).exec();
   const promise3=promise1.then(promise2)
    return promise3;
  }  
  exports.setfavourite=(memberID,artworks)=>{
  const aid=artworks._id;
  const promise = Member.update({"_id": memberID},
   {$push: {
          favorites:aid
    }}).exec();
     return promise;
  }
  exports.unfavourite=(memberID,artworks)=>{
    const aid=artworks._id;
    const promise = Member.update({"_id": memberID},
     {$pull: {
            favorites:aid
      }}).exec();
       return promise;
    }

// // list all Members 
// exports.list = () => {
//     const promise = Members.find().exec();
//     return promise;
// }
// // create new Member
// exports.create = (newMember) => {
//     const promise = Members.create(newMember);
//     return promise;
// }
// // read a Member
// exports.read = (MemberId) => {
//     const promise = Members.findById(MemberId).exec();
//     return promise;
// } 
// // update a Member
// exports.update = (MemberId, Member) => {
//     const promise = Members.findByIdAndUpdate(MemberId, Member, {new: true}).exec();
//     return promise;
// }
// // delete a Member
// exports.delete = (MemberId) => {
//     const promise = Members.findByIdAndDelete(MemberId).exec();
//     return promise;
// }