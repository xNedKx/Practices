/*
  /Infinite Properties/

  Author: @xNedKx

  "No more missing properties."

  Wrapping an object|function to make non-assigned arbitrary properties|methods returns the same proxy object.
  It makes a shallow copy of the original object and returns a proxied function.
  Get|Set|Delete properties on the proxied copy are still available.

  It could be used when scripts halt due to missing properties errors. Though this does not resolve the problem, it might bypass them when they not that critical.

  Ex:
    console.log(Mocking("anything")['any_name']['any_function']().as.you.like === Mocking.unit) // true
    console.log(Mocking()()()()()()()()() === Mocking.unit) // true
    console.log(Mocking().happy === Mocking().unhappy()) // true
    console.log(Mocking({a:0}).a != Mocking({a:1}).a) // true
    console.log(Mocking({b:()=>0}).b() === Mocking((x)=>x)(0)) // true
*/

function Mocking(obj=Mocking.loop){
  if(obj instanceof Function){
    return new Proxy( Object.assign( (...args)=>obj(...args), obj ), Mocking.reflect )
  }else{
    return new Proxy( Object.assign( ()=>Mocking.unit, obj ), Mocking.loop )
  }
}
Mocking.create = function(){
  const s = Symbol(), l = {}
  const mock = ()=>l[s]
  const p = new Proxy(mock,{get:mock,apply:mock})
  Object.defineProperty(l,s,{ value: p })
  return p
}
Mocking.unit = Object.freeze(Mocking.create())
Mocking.handle = {
  get:(o,p)=>Reflect.has(o,p)?Reflect.get(o,p):Mocking.unit,
  set:(o,p,v)=>o[p]=v,
  deleteProperty:(o,p)=>Reflect.deleteProperty(o,p)
}
Mocking.loop = Object.assign({},Mocking.handle,{apply:()=>Mocking.unit})
Mocking.reflect = Object.assign({},Mocking.handle,{apply:(o,t,...args)=>Reflect.apply(o,t,...args)})
Object.freeze(Mocking)
