let obj={
    a:1,
    b:"string",
    c:false,
    d:undefined,
    e:null,
    c:['a',1,true,null]
};
let prop='a';
let bucket = ['a',1,true,null];
console.log(typeof obj);
console.log(obj.a);
delete obj.a;
console.log(obj[prop]);
console.log(typeof bucket);
console.log(bucket[bucket.length-1])

console.log("typeof bucket:"+typeof bucket);
console.log("access bucket by bucket[index]:"+bucket[0]);
console.log("accessbucket unshift"+bucket.unshift(0));
console.log("access bucket push:"+bucket.push("str 2"));
console.log("access bucket shift"+bucket.shift());
console.log("access bucket pop:"+bucket.pop());