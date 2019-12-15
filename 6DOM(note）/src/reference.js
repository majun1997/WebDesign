let body=document.getElementsByTagName('body').item(0);
let createDiv=(value,parent)=>{
        
    let div = document.createElement('div');
    div.classList=`container container-${value}`;
    div.setAttribute('name',`container-${value}`);
    div.setAttribute('data-value',`${value}`);
    div.innerHTML= `<span class="value">${value}</span>`;
    parent.appendChild(div);
    return div;
};





let div1=createDiv(1,body)

let div2=createDiv(2,div1);

let div3=createDiv(3,div2);
// let div4=createDiv(4,div3);


let divs=document.querySelectorAll('[data-value]');
// let intervalId=setTimeout(()=>{
//     div4.remove();
// },2000);

let listener=function(event){
    event.preventDefault()
    event.stopPropagation();
    let target1=event.currentTarget;
    let targetvalue=target1.getAttribute('data-value')

    let phase=event.eventPhase;
    console.log(`context value:${this.value}`);
    console.log(`element ${targetvalue} clicked at phase ${phase}`)
    console.log(this);
}; 
let context={
    value:"new context"
}
divs.forEach(item=>{
    //item.addEventListener('click',listener,true);
    item.addEventListener('click',listener.bind(context));
});

// div3.addEventListener('click',listener);
// div1.addEventListener('click',listener);
// div2.addEventListener('click',listener);

let callback=function(){
    let respones= JSON.parse(this.responsetext);
    values.forEach(item=>{
        div3.innerHTML += item;
    })
    console.log(this.responsetext)
}

let xhr=new XMLHttpRequest();
xhr.addEventListener('load',callback);

xhr.open('GET','data.json');
xhr.setRequestHeader('content-Type','application/json')
setTimeout(()=>{
    xhr.send();
},2000);