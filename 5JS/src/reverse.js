/**
 * @public
 * @version 0.0.1
 * @todo
 * @param {String} input
 */
function reverseString(input)
{
    if(input.constructor!=String)
        return "error input"
    if(input.length<=0)
        return "error input"
    //bad input!!! then return error
    let re=new String()
    //create the string used to return
    let i=input.length-1;
    //the point
    for(x in input){
        
        re=re+input.charAt(i-x);
        //reverse the String
    }
    return re;
}

//begin to set default things
/**
 * @public
 * test
 * @todo
 */
let a="majun finished this project"
console.log("the origin String is :\n"+a+" \nthe reverse String is:\n"+reverseString(a));