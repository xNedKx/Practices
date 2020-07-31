

(function(){

const SC = crypto.subtle
if(!SC){throw Error()}

const RSAPSS = {
  name: "RSA-PSS",
  modulusLength: 4096,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-512",
  saltLength: 512/8,
  usages: ["sign","verify"],
  port: "jwk",
}
const RSAOAEP = {
  name: "RSA-OAEP",
  modulusLength: 4096,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-512",
  usages: ["encrypt","decrypt"],
  port: "jwk",
}
const algs = {
  "RSA-PSS": RSAPSS,
  "RSA-OAEP": RSAOAEP,
}

async function createSVKey(){ return await createKey(RSAPSS) }
async function createEDKey(){ return await createKey(RSAOAEP) }
async function createKey(alg){ return await SC.generateKey(alg,true,alg.usages) }
async function saveKey(key){ return await SC.exportKey(algs[key.algorithm.name].port,key) }
async function loadKey(alg,kd){ return await SC.importKey( alg.port, kd, alg, true, kd.key_ops) }

function s2b(str){
  if(typeof str != "string"){throw TypeError()}
  const ui16a = new Uint16Array(str.length)
  for(let i in str){
    ui16a.set([str.charCodeAt(i)],i)
  }
  return ui16a.buffer
}
function b2s(ab){
  if(!(ab.buffer ?? ab instanceof ArrayBuffer)){throw TypeError()}
  const ui16a = new Uint16Array(ab.buffer ?? ab)
  return String.fromCharCode.apply(this,ui16a)
}
function b2h(ab){
  if(!(ab.buffer ?? ab instanceof ArrayBuffer)){throw TypeError()}
  const ui16a = new Uint16Array(ab.buffer ?? ab)
  return ui16a.reduce((hex,c)=>hex+c.toString(16).padStart(4,"0"),"").toUpperCase()
}
function h2b(hex){
  if(typeof hex != "string"){throw TypeError()}
  if(hex.length % 4){throw RangeError()}
  const ui16a = new Uint16Array(hex.length/4)
  for(let i = 0; i < ui16a.length; i++){
    const j = i*4
    ui16a.set([parseInt(hex.slice(j,j+4),16)],i)
  }
  return ui16a.buffer
}
function h2s(hex){
  return b2s(h2b(hex))
}
function s2h(str){
  return b2h(s2b(str))
}

async function seh(key,data){
  if(typeof data == "string"){data = s2b(data)}
  return b2h(await SC.encrypt(algs[key.algorithm.name],key,data))
}
async function hds(key,data){
  if(typeof data == "string"){data = h2b(data)}
  return b2s(await SC.decrypt(algs[key.algorithm.name],key,data))
}

async function sign(key,data){
  if(typeof data == "string"){data = s2b(data)}
  return b2h(await SC.sign(algs[key.algorithm.name],key,data))
}

async function verify(key,sign,data){
  if(typeof data == "string"){data = s2b(data)}
  if(typeof sign == "string"){sign = h2b(sign)}
  return await SC.verify(algs[key.algorithm.name],key,sign,data)
}

window["SC"]={seh,hds,sign,verify,algs,fns:{s2b,b2s,b2h,h2b,h2s},keyFn:{createKey,saveKey,loadKey,createSVKey,createEDKey}}

})()