'use strict';

const fs = require('fs'),
    path = require('path');

exports.sendImg = (req, res) => {
    res.sendFile( path.resolve(__dirname + '/../' + req.url) );
}

exports.uploadImg = (req, res, next) => {
    // 获得图片base64
    const imgData = req.body.base64;
    const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = new Buffer(base64Data, 'base64');
    // 设置图像名
    const imgName =  req.body.name;
   
    let result = {
      code: 0,
      msg: 'ok',
      data: {}
    }
    delDir(`images/${req._id}/profileImg`);

    mkdirSync(`images/${req._id}/profileImg`, () => {
        // 保存图片
        fs.writeFile(`images/${req._id}/profileImg/` + imgName, dataBuffer, function(err) {
        if(err){
          result.code = -1;
          result.msg = 'error';
        }else{
          result.code = 0;
          // 返回图片位置
          result.data.url = `http://localhost:3000/images/${req._id}/profileImg/` + imgName;
        }
        res.send(JSON.stringify(result));
        });
    });
}

exports.uploadArtworkPic = (req, res, next) => {
    // 获得图片base64
    const imgData = req.body.base64;
    const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = new Buffer(base64Data, 'base64');
    // 设置图像名
    const imgName =  req.body.name;
    
    let result = {
        code: 0,
        msg: 'ok',
        data: {}
    }

    mkdirSync(`images/${req._id}/artworkPic`, () => {
        // 保存图片
        fs.writeFile(`images/${req._id}/artworkPic/` + imgName, dataBuffer, function(err) {
        if(err){
            result.code = -1;
            result.msg = 'error';
        }else{
            result.code = 0;
            // 返回图片位置
            result.data.url = `http://localhost:3000/images/${req._id}/artworkPic/` + imgName;
        }
        res.send(JSON.stringify(result));
        });
    });
}
exports.deletefailed=(request,response)=>{
  
  this.delete("./images/"+request.params.id+"/artworkPic/"+request.params.filename)
  response.status(200);
  response.json("ok");
}
exports.delete=(artworkurl)=>{
  var fs = require('fs');
  
  fs.unlinkSync(artworkurl);
  console.log("文件: " + artworkurl + "已经删除<br>");
}
/**
 *
 *
 * @param {*} path
 */
function delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}

/**
 *
 *
 * @param {*} dir
 * @param {*} cb
 */
function mkdirSync(dir,cb) {
    let paths = dir.split('/');
    let index  =1;
    function next(index) {
    //递归结束判断
      if(index>paths.length)return cb();
      let newPath = paths.slice(0,index).join('/');
      fs.access(newPath,function (err) {
        if(err){//如果文件不存在，就创建这个文件
          fs.mkdir(newPath,function (err) {
            next(index+1);
          });
        }else{
        //如果这个文件已经存在，就进入下一个循环
          next(index+1);
        }
      })
    }
    next(index);
  }
