function addAndExcute(x,y,callback){
    let sum=x+y;
    if(typeof callback==="function")
    {
      callback(sum);
    }
    else
    {
      console.log("123");
    }
  }
  let fn=function(x){
    console.log("call back"+x);
  };
  
  addAndExcute(1,2,fn);