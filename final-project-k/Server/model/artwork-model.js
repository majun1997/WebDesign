'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// interface artworkdetail{
//   url:string;//link 链接
//   artworktype: string;//类型 暂时支持(support) youtube,local video,photo
//   poster: string; //海报
// }
// interface comment{//评论
//   comment:string; //内容
//   id:string;//评论人
// }
// export interface artwork {
//   id:string;  //id     
//   name: string;//name
//   createdate:Date;
//   auth:string; //作者
//   artworkdetail: artworkdetail;    
//   like:Array<string>;//喜欢
//   comments:Array<comment>;//评论
// }



var artworkSchema = new mongoose.Schema({
  artworkdetail:{
    type:Schema.Types.Mixed
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  createdate:{
    type: Date,
    default:new Date()
  },
  auth:{
    type:String,
  },
  like:{
    type:Array
  },
  comments:{
    type:Schema.Types.Mixed
  },
},{
  versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
artworkSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
// Ensure virtual fields are serialised.
artworkSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('artworks', artworkSchema);