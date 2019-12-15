/**
 * @public
 * @version 0.0.1
 * @todo
 * @param {Array} list
 * @param {let} target
 */
function bianrySearch(list,target){
    if(list.constructor!=Array)
        return "error input"
    if(list.length<=0)
        return "error input"
    //bad input!!! then return error
    console.log("begin to search")
    //begin to search
    let up=list.length-1;
    let down=0;
    //set default things
    while(true){
        let point = parseInt((up+down)/2)//find the point which should be compared
        console.log("now is compare the point:"+point+"'s value")//print it
        if(target==list[point])
            return point;               //equal! return the point
        if(point>=list.length-1 || point==0)
            return null;                  // not in the list return null

        if(target<list[point])
            up=point;                   //target < compared, so change the up bound
        else{
            down=point                  //target > compared, so change the down bound
        }
            

    }
    
    //find no result
};
/**
 * @public
 * test
 * @todo
 */
let list=new Array();
let target=14;
for(let i=0;i<20;i++)
{
    list[i]=i*2;
}
console.log("the point is:"+bianrySearch(list,target)+"the target is"+target+" and the set is"+list);