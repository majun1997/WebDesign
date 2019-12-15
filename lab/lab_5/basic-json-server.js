let http= require('http');
let port = 3002;
let hostname= "localhost" //可以用本机地址？
let person={
    "firstname":"john",
    lastname:"adams",
    state:"ma"
}
const server=http.createServer((request,response)=>{
    response.statusCode=200;
    response.setHeader("Content-Type","application/json");
    response.end(JSON.stringify(person));
});
server.listen(port,hostname,()=>{
    console.log(`starting JSON SERVICE ON PORT ${port}`)
});