/*
  Mocking
  
  Author: xNedKx
  last edited: 2022/05/23
  
  "No more missing properties."
  
  Wrapping an object|function to make non-assigned arbitrary properties|methods returns the same proxy object.
  It makes a shallow copy of the original object and returns a proxied function.
  Get|Set|Delete properties on the proxied copy are still available.

  It could be used when scripts halt due to missing properties errors. Though this does not resolve the problem, it might bypass them when they not that critical.

  Ex:
    console.log(Mocking(["any object"])['any_name']['any_function']().as.you.like === Mocking.loop) // true
    console.log(Mocking({})()()()()()()()() === Mocking.loop) // true
    console.log(Mocking(()=>{}).happy === Mocking(({}).unhappy()) // true
    console.log(Mocking({a:0}).a != Mocking({a:1}).a) // true
    console.log(Mocking({b:()=>0}).b() === Mocking((x)=>x)(0)) // true
  
  Config values:
    Mocking.overwriteNull = false
    - Set to true to retrun Mocking.loop when the returned value is null.
    Mocking.overwriteUndefined = false
    - Set to true to retrun Mocking.loop when the returned value does not exist.
    Mocking.overwriteUndefinedProperty = false
    - Set to true to retrun Mocking.loop when the returned value is undefined.
    Mocking.overwriteNullLike = false
    - Set to true to retrun Mocking.loop when the returned value is null or undefined.
    Mocking.depth = Infinity
    - The levels that should be wrapped by Mocking. 0 mean only the input object itself, the proxy's siblings will not be wrapped. Invalid param will make Mocking return the input itself.
    Mocking.currentDepth = 0
    - When running with initial = true, this value will be reset to 0. After function runs, this value is the number of levels it traversed.
  
  To get the original returned value from Mocking object, use <returned Proxy>[Mocking.getOrigin] to access it.
  
  Caveat:
  Use == to compare a non-object return value from Mocking wrapped object with Mocking.loop might cause "Cannot convert object to primitive value" error.
  
  If there are infinte looping preoperties, the function will create infinte new proxy objects and crash.
  
  
*/

function Mocking(obj,initial=true,isprop=false){
  if(initial){
    Mocking.currentDepth = 0
  }else{
    Mocking.currentDepth += 1
  }
  if(!(Mocking.currentDepth <= Mocking.depth)){
    if(obj === Mocking.loop){
      return undefined
    }else{
      return obj
    }
  }else if(obj === Mocking.loop){
    return obj
  }else if(obj instanceof Object && obj != null){
    if(obj instanceof Function){
      return new Proxy(obj,Mocking.handler)
    }else{
      const mock = Object.assign(function(){return Mocking.loop},obj)
      return new Proxy(mock,Mocking.handler)
    }
  }else if( (Mocking.overwriteNull && obj === null) || (Mocking.overwriteUndefined && typeof obj === 'undefined' && !isprop) || (Mocking.overwriteUndefinedProperty && typeof obj === 'undefined') || (Mocking.overwriteNullLike && (obj === null || typeof obj === 'undefined')) ){
    return Mocking.loop
  }else{
    return obj
  }
}
Object.defineProperty(Mocking, 'handler', {
  value: {
    get: function(o,p,r){
      if(p === Mocking.getOrigin){
        return o[Mocking.getOrigin]
      }else if(Reflect.has(o,p)){
        let value = Reflect.get(o,p)
        if(!(value instanceof Function) && Function.prototype.hasOwnProperty(p) && !value.hasOwnProperty(p)){
          return Mocking.loop
        }else{
          let m = Mocking( value, false, true )
          if(m != value && m instanceof Object && m != null){
            Object.defineProperty(m, Mocking.getOrigin, {value})
          }
          return m
        }
      }else{
        return Mocking.loop
      }
    },
    apply: function(o,t,a){
      if(o instanceof Object && Reflect.getPrototypeOf(o) instanceof Function){
        let value = o.call(t,...a), m = Mocking( value, false, true )
        if(m != value && m instanceof Object && m != null){
          Object.defineProperty(m, Mocking.getOrigin, {value})
        }
        return m
      }else{
        return Mocking.loop
      }
    },
  },
})
Object.defineProperties(Mocking, {
  loop: {
    enumerable: true,
    value: function(){
      const handler = {
        get: function(o,p,r){
          return Mocking( !Function.prototype.hasOwnProperty(p)&&Reflect.has(o,p)? Reflect.get(o,p) : Mocking.loop, false )
        },
        apply: function(o,t,a){
          return Mocking( (o instanceof Object && Reflect.getPrototypeOf(o) instanceof Function)? o.call(t,...a) : Mocking.loop, false )
        }
      }
      const s = Symbol(), l = {}
      const mock = function(){ return l[s] }
      const p = new Proxy(mock,handler)
      Object.defineProperty(l,s,{ value: p })
      return p
    }(),
  },
  getOrigin: {
    value: Symbol(),
  },
  depth: {
    writable: true,
    enumerable: true,
    value: Infinity,
  },
  currentDepth: {
    writable: true,
    enumerable: true,
    value: 0,
  },
  overwriteNull: {
    writable: true,
    enumerable: true,
    value: false,
  },
  overwriteUndefined: {
    writable: true,
    enumerable: true,
    value: false,
  },
  overwriteUndefinedProperty: {
    writable: true,
    enumerable: true,
    value: false,
  },
  overwriteNullLike: {
    writable: true,
    enumerable: true,
    value: false,
  },
})

