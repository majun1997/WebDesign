let http= require('http');
let port = 3000;
let hostname= "10.110.166.141" //可以用本机地址？
const server=http.createServer((req,res)=>{
    
    res.statusCode=200;
    res.setHeader(`Content-Type`,`text/html`);
    res.end(`<html><body><h1>hello world</h1></body></html>`);
});
server.listen(port,hostname,()=>{
    console.log(`server is listening on :${port}`);
});