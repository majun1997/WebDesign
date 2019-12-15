let body=document.getElementsByTagName('body').item(0);//get the window.
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


/**
 *  this function is used to do something when the button is clicked and based on the attribute. 
 */

let BTNClickListener=(event)=>{
    // event.preventDefault();
    // let selection=document.getSelection();
    
   
    // // if(selection.anchorNode==selection.focusNode)
    // // {
    // //     right=selection.focusOffset;
    // // }
    // // else
    // // {
    // //     right=selection.anchorNode.textContent.length;
       
    // //     //
    // // }
    // //console.log(`${selection}`);
    // let final=`<span clss="fontbold">${selection}</span>`;
    // range = document.selection.createRange();
    // range.text = span;
    
    // //selection.focusNode.parentElement.innerHTML=final;
    // console.log(`${final}`);
    let target1=event.currentTarget;
    let targetvalue=target1.getAttribute('data-value')
    var sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            var html = "<span class="+targetvalue+">" + range + '</span>'    
            range.deleteContents();
            //get the selection and prepare a span to include it            
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(false);
        range.pasteHTML(html);
    }
};

let BTNTClickListener=(event)=>{
    //text-align
    let target1=event.currentTarget;
    let targetvalue=target1.getAttribute('data-value')
    let a=textpane.getAttribute("class");
    if(targetvalue=="left"){
        textpane.setAttribute("class","textEditor leftalign")
    }
    else if(targetvalue=="right"){
        textpane.setAttribute("class","textEditor rightalign")
    }
    else if(targetvalue=="cent"){
        textpane.setAttribute("class","textEditor centalign")
    }
    else if(targetvalue=="just"){
        textpane.setAttribute("class","textEditor justalign")
    }
};
/**
 * create a basic panel
 */
let documentDiv=createThings("div","document",body);
let controlPane=createThings("div","control",documentDiv);
let textpane=createThings("div","textEditor",documentDiv);
textpane.setAttribute("contenteditable",true);
let font_bolder=createThings("button","material-icons",controlPane);
font_bolder.setAttribute('data-value',"fontbold");
font_bolder.innerHTML="B";
let testtext=createThings("span",null,textpane);
testtext.innerHTML="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
let font_italic=createThings("button","material-icons",controlPane);
font_italic.setAttribute('data-value',"fontitalic");
font_italic.innerHTML="I";
let font_underline=createThings("button","material-icons",controlPane);
font_underline.setAttribute('data-value',"fontunderline");
font_underline.innerHTML="U";
let font_justify=createThings("button","material-icons",controlPane);
font_justify.setAttribute('data-value',"just");
font_justify.innerHTML="J";
let font_right=createThings("button","material-icons",controlPane);
font_right.setAttribute('data-value',"right");
font_right.innerHTML="R";
let font_left=createThings("button","material-icons",controlPane);
font_left.setAttribute('data-value',"left");
font_left.innerHTML="L";
let font_cent=createThings("button","material-icons",controlPane);
font_cent.setAttribute('data-value',"cent");
font_cent.innerHTML="C";
/**
 * create the event listener
 */

font_bolder.addEventListener('click',BTNClickListener);
font_italic.addEventListener('click',BTNClickListener);
font_underline.addEventListener('click',BTNClickListener);
font_justify.addEventListener('click',BTNTClickListener);
font_left.addEventListener('click',BTNTClickListener);
font_right.addEventListener('click',BTNTClickListener);
font_cent.addEventListener('click',BTNTClickListener);