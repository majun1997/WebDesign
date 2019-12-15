// reference:https://www.bigocheatsheet.com/
// also reference:https://www.youtube.com/watch?v=PgBzjlCcFvc BY GEEKSFORGEEKS
/*
    QUICK SORT is an algorithm using the idea of divide and conquer.
    the detail of this:
        use the latest number as pivot,and find the number all below it as left over it as right
        than sort left and right part.
*/
/**
 * @public
 * @version 0.0.1
 * @todo
 * @param {Array} list
 * @param {let} left
 * @param {let} right
 */
function QuickSort(list,left,right)
{
    if(list.constructor!=Array)
        return "error input"
    if(list.length<=0)
        return "error input"
    //bad input!!! then return error    
    if(left>=right)
        return;
    let pivot=list[right];
    let i=left-1;
    let temp;
    let n;
    //set the default things for loop

    //console.log("the list is:"+list+" left:"+left+" right:"+right+" the pivot is:"+pivot)    //to have a display of how to sort
    
    for(n=left;n<right;n++)
    {
        if(list[n]<pivot)
        {
            temp=list[n];
            list[n]=list[++i];
            list[i]=temp;            
        }
    } 
    //find the right pos for the right item;   
    temp=list[n];
    list[n]=list[++i];
    list[i]=temp;    

    //begin to sort the left part and the right part.
    QuickSort(list,left,i-1);
    QuickSort(list,i+1,right);
    
    
}
/**
 * @public
 * test
 * @todo
 */
var list=new Array();

for(let i=0;i<20;i++)
{
    list[i]=20-i*2;
}
console.log("the origin set is:"+list);
QuickSort(list,0,list.length)
console.log("the sort set is:"+list);
