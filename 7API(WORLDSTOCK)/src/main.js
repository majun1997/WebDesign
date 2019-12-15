
import { fromEvent } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';
const colum= ["symbol",
"name",
"currency",
"price",
"price_open",
"day_high",
"day_low",
"52_week_high",
"52_week_low",
"day_change",
"change_pct",
"close_yesterday",
"market_cap",
"volume",
"volume_avg",
"shares",
"stock_exchange_long",
"stock_exchange_short",
"timezone",
"timezone_name",
"gmt_offset",
"last_trade_time",
"pe",
"eps"
]

let body=document.getElementsByTagName('body').item(0);//get the window.
/**
 * this function make a request in promise(asynchronous)
 * @param {*} url 
 * @param {*} method 
 */
var processResponseDemo=(text)=>{
    let conditions=document.getElementById("conditions").value;
    let res=JSON.parse(text);
    //console.log(res);

    //console.log(colum);
    for(let i=0;i<res.symbols_returned;i++){
        if(conditions.indexOf(res.data[i]["symbol"])!=-1){
            let tr=createThings("tr","contenttr",displaytable);
            for(let j=0;j<24;j++){
                let td=createThings("td","content",tr);
                td.innerHTML=res.data[i][colum[j]];
                console.log();
            }
        }
    }
    
}
var processResponse=(text)=>{
    let res=JSON.parse(text);
    //console.log(res);
    if(res.symbols_requested!==res.symbols_returned)
        alert("one of the code is wrong,please check")
    //console.log(colum);
    for(let i=0;i<res.symbols_returned;i++){
        let tr=createThings("tr","contenttr",displaytable);
        for(let j=0;j<24;j++){
            let td=createThings("td","content",tr);
            td.innerHTML=res.data[i][colum[j]];
            console.log();
        }
    }
    
}
var makeRequest = function (url, method) {

	// Create the XHR request
	var request = new XMLHttpRequest();

	// Return it as a Promise
	return new Promise(function (resolve, reject) {
		// Setup our listener to process compeleted requests
		request.onreadystatechange = function () {

			// Only run if the request is complete
			if (request.readyState !== 4) return;

			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful
				resolve(request);
			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

		};

		// Setup our HTTP request
		request.open(method || 'GET', url, true);
        
		// Send the request
		request.send();
	});
};

/**
 * this function is for the button in the html to direct the url of api
 * @param {*} event 
 */
let clearACT=(event)=>{
    
    for(let i=displaytable.childElementCount-1;i>0;i--)
    {
        //console.log(i);
        displaytable.removeChild(document.getElementById("contenttr"));
    }
};
let searchClickListener=(event)=>{
    let conditions=document.getElementById("conditions").value;
    let select=document.getElementById("select").value;
    console.log(select)
    if(select==="demo"){
        if(conditions===''){
            alert("no conditions found")
            return;
        }        
        let uri=`https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=demo`;    
        //console.log("this is the "+event+" requests:"+uri);
        makeRequest(uri)
        .then(function (posts) {
            //console.log('Success!', posts);
            let res=posts.response;
            processResponseDemo(res);
        })
        .catch(function (error) {
            console.log('Something went wrong', error);
        });
    }
    else{
        if(conditions===''){
            alert("no conditions found")
            return;
        }        
        let uri=`https://api.worldtradingdata.com/api/v1/stock?symbol=${conditions}&api_token=Z9ljawlsSHnZJIdCkWx7NvogNSae4DFVvmpGav4u5bNpgx9VvIQ18onxN99S`;    
        //console.log("this is the "+event+" requests:"+uri);
        makeRequest(uri)
        .then(function (posts) {
            //console.log('Success!', posts);
            let res=posts.response;
            processResponse(res);
        })
        .catch(function (error) {
            console.log('Something went wrong', error);
        });
    }
    

};
/**
 * this function is used to create an element in html
 * @param {*} tag 
 * @param {*} value 
 * @param {*} parent 
 */
let createThings=(tag,value,parent)=>{        
    let div = document.createElement(`${tag}`);
    div.classList=`${value}`;
    if(value!==null){
        div.setAttribute('name',`${value}`);
        div.setAttribute('type',`${value}`);
        div.setAttribute('id',`${value}`);
    }
    
    //div.innerHTML= `<span class="value">${value}</span>`;
    parent.appendChild(div);
    return div;
};

//basic panel as follow
let controlpane=createThings("div","control",body);
let controllabel=createThings("p","",controlpane);
controllabel.innerHTML="INPUT THE STOCKS AND SEPERATE BY ,";
let selection=createThings("select","select",controlpane);
let opt1=createThings("option","",selection);
let opt2=createThings("option","",selection);
opt1.setAttribute("value","demo")
opt2.setAttribute("value","real")
opt1.innerHTML="demo";
opt2.innerHTML="real";
let inputfield=createThings("input","conditions",controlpane);
let submitbutton=createThings("button","submit",controlpane);
let clear=createThings("button","clear",controlpane);
clear.innerHTML="clear"
submitbutton.innerHTML="Search"
let displaypane=createThings("div","displaypane",body);
//submitbutton.addEventListener('click',searchClickListener)
//add event listener with rxjs
fromEvent(submitbutton, 'click')
  .pipe(
    throttleTime(1000),
    scan(count => count + 1, 0)
  )
  .subscribe(count => searchClickListener(count));
fromEvent(clear, 'click')
  .pipe(
    throttleTime(1000),
    
  )
  .subscribe(count => clearACT());
let displaytable=createThings("table","",displaypane);
let displaytabletr=createThings("tr","tittle",displaytable);
for(let i=0;i<24;i++){
    let tr=createThings("td","tittle",displaytabletr);
    tr.innerHTML=`${colum[i]}`;
}
