let http= require('http');
let fs=require('fs')
let port = 3001;
let hostname= "localhost" //可以用本机地址？
const server=http.createServer((req,res)=>{
    let filepath=__dirname+req.url;
    console.log(filepath);
    fs.readFile(__dirname+req.url,function(err,data){
        if(err){
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }else{
            res.writeHead(200)
            res.end(data)
        }
    });

    // res.statusCode=200;
    // res.setHeader(`Content-Type`,`text/html`);
    // res.end(`<html><body><h1>hello world</h1></body></html>`);
});
server.listen(port,hostname,()=>{
    console.log(`server is listening on :${port}`);
});