/*
  Author: YZ Chen

  SC:
    algs: {[algorithm_name]: {algorithm_params}}
    
    sign(key,data)
    verify(key,sign,data)
    encrypt(key,data,iv_ctr)
    decrypt(key,data,iv_ctr)
    wrap(key,wkey[,iv_ctr,inner_port])
    unwrap(type,key_data,wkey[,iv_ctr,ext,inner_port,usages])
    hash(data)|digest(data)
    derive(keys,type[,ext,usages]) // keys: [ dkey, pkey|salt ]
    deriveBits(keys,len) // keys: [ dkey, pkey|salt ]
    
    signAndEncrypt(data,sign_key,encrypt_key[,iv_ctr])
    decryptAndVerify(data,decrypt_key,verify_key[,iv_ctr])
    
    keyFn.createKey(alg_type)
    keyFn.loadKey(type,key_data[,ext,format,usages])
    keyFn.saveKey(key[,format])
    
    keyFn.parseKeys(...raws) // <jwk>, <id|alg|hex>, {type,kd,ext,format,usages}
    keyFn.unwrapKeys(type,kds,wkey[,iv_ctr,ext,wport,usages])
    KeyFn.exportKeys(keys)
    
    keyFn.passwordDeriveED(pwd[,salt]) //PBDKF2->AESGCM
    keyFn.passwordDeriveSV(pwd[,salt]) //PBDKF2->HMAC
    
    keyFn.protectKeys(key_array,default_key_id) // prompt to enter password
    keyFn.unprotectKeys(protected_key_data) // prompt to enter password
    
    keyFn.keyHash(key,format,hash_type)
    
    keyFn.AESCTR.getCounter()|setCounter(ctr)
    keyFn.AESCBC.getIV()|setIV(iv)
    keyFn.AESGCM.getIV()|setIV(iv)
    keyFn.HKDF.getSalt()|setSalt(salt)
    keyFn.PBKDF2.getSalt()|setSalt(salt)
    
    fns.b2h(arraybuffer)
    fns.b2s(arraybuffer)
    fns.s2b(string) // convert charatcers to UTF16 codepoint(2 Bytes) and return the buffer of the Uint16Array, the higher byte is always on the left despite endians.
    fns.h2b(hex)
    fns.randomU8(len)
    fns.randomHex(len)
    
    fns.toText(obj)
    fns.download(blob,name)
    fns.createFileInput(callback)
    fns.bindUpload(dom,callback)
    fns.bindUpload.unbind(dom)
*/

(function(){

const SC = crypto.subtle
if(!SC){throw Error("Unable to initiate SC.")}

// configs

let defaultExt = true

const hash_type = "SHA-512" // "SHA-1", "SHA-256", "SHA-384", "SHA-512"
const hash_length = {
  "SHA-1": 160,
  "SHA-256": 256,
  "SHA-384": 384,
  "SHA-512": 512,
}
const port_type = "jwk" // "raw", "pkcs8", "spki", "jwk"

const RSApublicExponent = new Uint8Array([1, 0, 1])
const RSAmodulusLength = 4096
const RSAsaltLength = 64
const RSAport = "jwk" //public: spki //private: pkcs8 //all: jwk
const RSAmaxEncryptBytes = Math.ceil(RSAmodulusLength / 8) - 2 * hash_length[hash_type]/8 - 2

const AESlength = 256 // 128, 192, 256
const AESport = "raw" //raw, jwk
const AESblockLength = 128
const AESCTRlength = AESblockLength
const AESCTRcounter = new Uint8Array(AESCTRlength/8)
const AESCBCiv = crypto.getRandomValues(new Uint8Array(AESblockLength/8))
const AESGCMiv = crypto.getRandomValues(new Uint8Array(AESblockLength/8))

const ECcurve = "P-521" // "P-256", "P-384", "P-512"
const ECport = "jwk" //public: raw, spki //private: pkcs8 //all: jwk

const HKDFsalt = crypto.getRandomValues( new Uint8Array(hash_length[hash_type]/8) )
const HKDFinfo = new Uint8Array()
const PBKDF2salt = crypto.getRandomValues( new Uint8Array(hash_length[hash_type]/8) )
const PBKDF2iteration = 8192
const KDFport = "raw"

// mixed param objects: import/generate/useful settings/[sign/verify/encrypt/decrypt/derive/wrap/unwrap] params

const RSAPKCS1 = {
  name: "RSASSA-PKCS1-v1_5",
  hash: hash_type,
  
  modulusLength: RSAmodulusLength,
  publicExponent: RSApublicExponent,
  
  usages: ["sign","verify"],
  privateUsages: ["sign"],
  publicUsages: ["verify"],
  
  port: RSAport, //public: spki //private: pkcs8 //all: jwk
}
const RSAPSS = {
  name: "RSA-PSS",
  hash: hash_type,
  
  modulusLength: RSAmodulusLength,
  publicExponent: RSApublicExponent,
  
  usages: ["sign","verify"],
  privateUsages: ["sign"],
  publicUsages: ["verify"],
  
  port: RSAport, //public: spki //private: pkcs8 //all: jwk
  
  saltLength: Math.max(Math.min(RSAsaltLength, Math.ceil(RSAmodulusLength/8) - Math.ceil(hash_length[hash_type]/8) - 2),0),
}
const RSAOAEP = {
  name: "RSA-OAEP",
  hash: hash_type,
  
  modulusLength: RSAmodulusLength,
  publicExponent: RSApublicExponent,
  
  usages: ["encrypt","decrypt","wrapKey","unwrapKey"],
  privateUsages: ["decrypt","unwrapKey"],
  publicUsages: ["encrypt","wrapKey"],
  
  port: RSAport,  //public: spki //private: pkcs8 //all: jwk
  
  //label: new Uint8Array([/*label*/]),
  
  maxEncryptBytes: RSAmaxEncryptBytes,
}

const AESGCM = {
  name: "AES-GCM",
  
  length: AESlength, // 128, 192, 256
  
  usages: ["encrypt","decrypt","wrapKey","unwrapKey"],
  
  port: AESport, //raw, jwk
  
  iv: AESGCMiv,
  //additionalData: new ArrayBuffer(),
  //tagLength: 128,
}
const AESCBC = {
  name: "AES-CBC",
  
  length: AESlength, // 128, 192, 256
  
  usages: ["encrypt","decrypt","wrapKey","unwrapKey"],
  
  port: AESport, //raw, jwk
  
  iv: AESCBCiv,
}
const AESCTR = {
  name: "AES-CTR",
  
  length: AESlength, // 128, 192, 256
  
  usages: ["encrypt","decrypt","wrapKey","unwrapKey"],
  
  port: AESport, //raw, jwk
  
  counter: AESCTRcounter,
  //length: AESCTRlength
}
const AESKW = {
  name: "AES-KW",
  
  length: AESlength, // 128, 192, 256
  
  usages: ["wrapKey","unwrapKey"],
  
  port: AESport, //raw, jwk
}

const HMAC = {
  name: "HMAC",
  hash: hash_type,
  //length: <digest function determined>
  
  usages: ["sign","verify"],
  
  port: AESport, //raw, jwk
}

const ECDSA = {
  name: "ECDSA",
  namedCurve: ECcurve, // "P-256", "P-384", "P-512"
  
  usages: ["sign","verify"],
  privateUsages: ["sign"],
  publicUsages: ["verify"],
  
  port: ECport, //public: raw, spki //private: pkcs8 //all: jwk
  
  hash: hash_type,
}
const ECDH = {
  name: "ECDH",
  namedCurve: ECcurve, // "P-256", "P-384", "P-512"
  
  usages: ["deriveBits","deriveKey"],
  privateUsages: ["deriveBits","deriveKey"],
  publicUsages: ["deriveBits","deriveKey"],
  
  port: ECport, //public: raw, spki //private: pkcs8 //all: jwk
  
  //public: <publicKey>,
}

const HKDF = {
  name: "HKDF",
  
  usages: ["deriveBits","deriveKey"],
  
  port: KDFport,
  
  hash: hash_type,
  salt: HKDFsalt,
  info: HKDFinfo,
}
const PBKDF2 = {
  name: "PBKDF2",
  
  usages: ["deriveBits","deriveKey"],
  
  port: KDFport,
  
  hash: hash_type,
  salt: PBKDF2salt,
  iterations: PBKDF2iteration,
}

// algorithms collection

const algs = {
  // sign/verify
  "RSA-PSS": RSAPSS, // pair
  "RSASSA-PKCS1-v1_5": RSAPKCS1, // pair
  "ECDSA": ECDSA, // pair
  "HMAC": HMAC,
  // encrypt/decrypt + wrap/unwrap
  "RSA-OAEP": RSAOAEP, // pair
  "AES-GCM": AESGCM,
  "AES-CBC": AESCBC,
  "AES-CTR": AESCTR,
  // wrap/unwrap
  "AES-KW": AESKW,
  // derive
  "ECDH": ECDH, // pair
  "HKDF": HKDF,
  "PBKDF2": PBKDF2,
  // digest
  "SHA-1": "SHA-1",
  "SHA-256": "SHA-256",
  "SHA-384": "SHA-384",
  "SHA-512": "SHA-512",
}

// key functions

async function createSVKey(type = "RSA-PSS"){ return await createKey(type) }
async function createEDKey(type = "RSA-OAEP"){ return await createKey(type) }
async function createWKey(type = "RSA-OAEP"){ return await createKey(type) }
async function createDKey(type = "ECDH"){ return await createKey(type) }

async function createKey(alg){
  if(typeof alg == "string"){
    alg = algs[alg]
  }
  if(!alg){throw TypeError("Invalid algorithm.")}
  return await SC.generateKey(alg,true,alg.usages)
}

async function saveKey(key,port){ return await SC.exportKey(port ?? algs[key.algorithm.name].port,key) }
async function loadKey(type,kd,ext,port,usages){
  let alg = algs[type]
  if(!alg){throw TypeError()}
  try{
    ext = ext ?? !(type == "PBKDF2" || type == "HKDF")
    port = port ?? alg.port
    if(/^RSA|^ECDSA$/.test(alg.name)){
      if(port == "jwk"){
        if(!kd.d){
          usages = usages ?? kd.key_ops ?? alg.publicUsages
        }else{
          usages = usages ?? kd.key_ops ?? alg.privateUsages
        }
      }else if(port == "pkcs8"){
        usages = usages ?? kd.key_ops ?? alg.privateUsages
      }else if(port == "spki"){
        usages = usages ?? kd.key_ops ?? alg.publicUsages
      }
    }
    usages = usages ?? kd.key_ops ?? alg.usages
    alg = alg.name == "PBKDF2" ? "PBKDF2" : alg
    return await SC.importKey( port, kd, alg, ext, usages)
  }catch(er){
    throw er
  }
}

// binary conversion functions

var littleEndian = (()=>{
  const buffer = new ArrayBuffer(2)
  new DataView(buffer).setInt16(0, 0xff, true /* littleEndian */)
  return new Int16Array(buffer)[0] === 0xff
})()

function s2b(str){
  if(str instanceof ArrayBuffer){return str}
  if(typeof str != "string"){throw TypeError()}
  const ui16a = new Uint16Array(str.length)
  const dv = new DataView(ui16a.buffer)
  for(let i in str){
    ui16a.set([str.charCodeAt(i)],i)
  }
  return ui16a.buffer
}
function b2s(ab){
  if(typeof ab == "string"){return ab}
  if(!((ab.buffer ?? ab) instanceof ArrayBuffer)){throw TypeError()}
  const b = ab.buffer ?? ab
  const dv = new DataView(b)
  const l = dv.byteLength
  const ui16a = new Uint16Array(Math.ceil(l/2))
  if(littleEndian){
    for(let i = 0; i < l; i+=2){
      let code = dv.getUint8(i)
      if(i+1 < l){
        code |= dv.getUint8(i+1) << 8
      }
      ui16a.set([code],i/2)
    }
  }else{
    for(let i = 0; i < l; i+=2){
      let code = dv.getUint8(i) << 8
      if(i+1 < l){
        code |= dv.getUint8(i+1)
      }
      ui16a.set([code],i/2)
    }
  }
  return String.fromCharCode.apply(this,ui16a)
}
function b2h(ab){
  if(typeof ab == "string"){return ab}
  if(!((ab.buffer ?? ab) instanceof ArrayBuffer)){throw TypeError()}
  const b = ab.buffer ?? ab
  const dv = new DataView(b)
  const l = dv.byteLength
  const c = (x)=>dv.getUint8(x).toString(16).padStart(2,"0")
  let hex = ""
  if(littleEndian){
    for(let i = 0; i < l; i+=2){
      if(i+1 < l){
        hex += c(i+1)
      }else{
        hex += "00"
      }
      hex += c(i)
    }
  }else{
    for(let i = 0; i < l; i++){
      hex += c(i)
    }
  }
  return hex.toUpperCase()
}
function h2b(hex){
  if(hex instanceof ArrayBuffer){return hex}
  if(typeof hex != "string"){throw TypeError()}
  //if(hex.length % 4){throw RangeError()}
  const ui16a = new Uint16Array(Math.ceil(hex.length/4))
  for(let i = 0; i < ui16a.length; i++){
    const j = i*4
    ui16a.set([parseInt(hex.slice(j,j+4).padEnd('0000'),16)],i)
  }
  return ui16a.buffer
}
function h2s(hex){
  return b2s(h2b(hex))
}
function s2h(str){
  return b2h(s2b(str))
}

// cryption functions

async function sign(key,data){
  if(typeof data == "string"){data = s2b(data)}
  return b2h(await SC.sign(algs[key.algorithm.name],key,data))
}
async function verify(key,sign,data){
  if(typeof data == "string"){data = s2b(data)}
  if(typeof sign == "string"){sign = h2b(sign)}
  return await SC.verify(algs[key.algorithm.name],key,sign,data)
}

async function encrypt(key,data,iv_ctr){
  if(typeof data == "string"){data = s2b(data)}
  let alg = Object.assign({},algs[key.algorithm.name])
  if(alg.name == "AES-CTR"){
    alg.length = AESCTRlength
  }
  if(/^AES-CBC$|^AES-GCM$/.test(alg.name) && iv_ctr){
    if(typeof iv_ctr == "string"){
      alg.iv = h2b(iv_ctr)
    }else if(iv_ctr instanceof Uint8Array){
      alg.iv = iv_ctr
    }
  }else if(alg.name == "AES-CTR" && iv_ctr){
    if(typeof iv_ctr == "string"){
      alg.counter = h2b(iv_ctr)
    }else if(iv_ctr instanceof Uint8Array){
      alg.counter = iv_ctr
    }else if(typeof iv_ctr == "number"){
      alg.counter = new Uint8Array(16)
      alg.counter.set(iv_ctr)
    }
  }
  return b2h(await SC.encrypt(alg,key,data))
}
async function decrypt(key,data,iv_ctr){
  if(typeof data == "string"){data = h2b(data)}
  let alg = Object.assign({},algs[key.algorithm.name])
  if(alg.name == "AES-CTR"){
    alg.length = AESCTRlength
  }
  if(/^AES-CBC$|^AES-GCM$/.test(alg.name) && iv_ctr){
    if(typeof iv_ctr == "string"){
      alg.iv = h2b(iv_ctr)
    }else if(iv_ctr instanceof Uint8Array){
      alg.iv = iv_ctr
    }
  }else if(alg.name == "AES-CTR" && iv_ctr){
    if(typeof iv_ctr == "string"){
      alg.counter = h2b(iv_ctr)
    }else if(iv_ctr instanceof Uint8Array){
      alg.counter = iv_ctr
    }else if(typeof iv_ctr == "number"){
      alg.counter = new Uint8Array(16)
      alg.counter.set(iv_ctr)
    }
  }
  return b2s(await SC.decrypt(alg,key,data))
}
async function wrap(key,wkey,iv_ctr,port){
  let alg = Object.assign({},algs[key.algorithm.name])
  port = port ?? alg.port
  let wa = Object.assign({},algs[wkey.algorithm.name])
  if(/^AES-CBC$|^AES-GCM$/.test(alg.name) && iv_ctr){
    if(typeof iv_ctr == "string"){
      wa.iv = h2b(iv_ctr)
    }else if(iv_ctr instanceof Uint8Array){
      wa.iv = iv_ctr
    }
  }else if(wa.name == "AES-CTR" && iv_ctr){
    if(typeof iv_ctr == "string"){
      wa.counter = h2b(iv_ctr)
    }else if(iv_ctr instanceof Uint8Array){
      wa.counter = iv_ctr
    }else if(typeof iv_ctr == "number"){
      wa.counter = new Uint8Array(16)
      wa.counter.set(iv_ctr)
    }
  }
  return b2h(await SC.wrapKey(port,key,wkey,wa))
}
async function unwrap(type,hex,wkey,iv_ctr,ext,wport,usages){
  let alg = Object.assign({},algs[type])
  let wa = Object.assign({},algs[wkey.algorithm.name])
  if(/^AES-CBC$|^AES-GCM$/.test(alg.name) && iv_ctr){
    if(typeof iv_ctr == "string"){
      wa.iv = h2b(iv_ctr)
    }else if(iv_ctr instanceof Uint8Array){
      wa.iv = iv_ctr
    }
  }else if(wa.name == "AES-CTR" && iv_ctr){
    if(typeof iv_ctr == "string"){
      wa.counter = h2b(iv_ctr)
    }else if(iv_ctr instanceof Uint8Array){
      wa.counter = iv_ctr
    }else if(typeof iv_ctr == "number"){
      wa.counter = new Uint8Array(16)
      wa.counter.set(iv_ctr)
    }
  }
  wport = wport ?? alg.port
  ext = ext ?? defaultExt
  const kd = (typeof hex == "string") ? h2b(hex) : hex
  let key
  if(usages){
    key = await SC.unwrapKey(wport,kd,wkey,wa,alg,ext,usages)
  }else{
    try{
      key = await SC.unwrapKey(wport,kd,wkey,wa,alg,ext,alg.publicUsages)
    }catch(er){
      try{
        key = await SC.unwrapKey(wport,kd,wkey,wa,alg,ext,alg.privateUsages)
      }catch(err){
        try{
          key = await SC.unwrapKey(wport,kd,wkey,wa,alg,ext,alg.usages)
        }catch(errr){
          throw TypeError(errr)
        }
      }
    }
  }
  return key
}

async function hash(data,type){
  if((data.buffer ?? data) instanceof ArrayBuffer){
    data = data.buffer ?? data
  }else if(typeof data == "string"){
    data = s2b(data)
  }
  return b2h(await SC.digest(type ?? hash_type,data))
}

async function derive(keys,type,ext,usages){
  let key, pkey_salt
  if(Array.isArray(keys)){
    key = keys[0]
    pkey_salt = keys[1]
  }else{
    key = keys
  }
  let da = Object.assign({},algs[key.algorithm.name]) // ECDH(private), HKDF(from import), PBKDF2(from import)
  let ta = algs[type] // HMAC, AES
  if(da.name == "ECDH" && pkey_salt){
    da.public = pkey_salt
  }
  if(/^PBKDF2$|^HKDF$/.test(da.name) && pkey_salt){
    if(typeof pkey_salt == "string"){
      da.salt = h2b(pkey_salt)
    }else if(pkey_salt instanceof Uint8Array){
      da.salt = pkey_salt
    }else if(pkeyt_salt instanceof ArrayBuffer){
      da.salt = new Uint8Array(pkey_salt)
    }
  }
  ext = ext ?? defaultExt
  usages = usages ?? ta.usages
  return await SC.deriveKey(da,key,ta,ext,usages)
}
async function deriveBits(keys,len){
  let key, pkey_salt
  if(Array.isArray(keys)){
    key = keys[0]
    pkey_salt = keys[1]
  }else{
    key = keys
  }
  const da = Object.assign({},algs[key.algorithm.name]) // ECDH(private), HKDF(from import), PBKDF2(from import)
  if(da.name == "ECDH" && pkey_salt){
    da.public = pkey_salt
  }
  if(/^PBKDF2$|^HKDF$/.test(da.name) && pkey_salt){
    if(typeof pkey_salt == "string"){
      da.salt = h2b(pkey_salt)
    }else if(pkey_salt instanceof Uint8Array){
      da.salt = pkey_salt
    }else if(pkeyt_salt instanceof ArrayBuffer){
      da.salt = new Uint8Array(pkey_salt)
    }
  }
  return await SC.deriveBits(da,key,len)
}

async function passwordDeriveED(pwd,salt){
  const dkey = await loadKey("PBKDF2",s2b(pwd))
  return await derive([dkey,salt],"AES-GCM")
}
async function passwordDeriveSV(pwd,salt){
  const dkey = await loadKey("PBKDF2",s2b(pwd))
  return await derive([dkey,salt],"HMAC")
}

async function randomU8(len){
  return await crypto.getRandomValues(new Uint8Array(len))
}
async function randomHex(len){
  return b2h(await random(len))
}

async function signAndEncrypt(data,skey,ekey,iv_ctr){
  let signature, encrypted
  try {
    signature =  await sign(skey,data)
  }catch(er){console.log(er)}
  try {
    encrypted = await encrypt(ekey,data,iv_ctr)
  }catch(er){console.log(er)}
  return signature && encrypted ? [signature,encrypted].join("|") : null
}

async function decryptAndVerify(data,dkey,vkey,iv_ctr){
  try{
    let [signature,encrypted] = data.split("|")
    let decrypted = await decrypt(dkey,encrypted,iv_ctr)
    let verified = await verify(vkey,signature,decrypted)
    if(decrypted && verified){
      return decrypted
    }else{
      return null
    }
  }catch(er){
    return null
  }
}

async function protectKeys(ks,kid){
  if(!ks){return}
  let pwd = prompt("Please input a password for protection:")
  if(pwd == ''){return}
  try{
    let wkey = await passwordDeriveED(pwd)
    let wks = []
    for(let k of ks){
      wks.push([await encrypt(wkey,k.kid ?? k.id ?? kid ?? ""), await encrypt(wkey,k.algorithm.name), await wrap(k,wkey)])
    }
    return wks.map(wk=>wk.join("|")).join("\n")
  }catch(er){console.log(er)}
  return null
}
async function unprotectKeys(str){
  let pwd = prompt("Please input the protection password: (Will override current keys. Leave blank or cancel to abort.)")
  if(pwd == ''){return}
  try{
    let wkey = await passwordDeriveED(pwd)
    let rows = str.split("\n").map(r=>r.split("|"))
    let ks = []
    for(let [eid,etype,hex] of rows){
      let id = await decrypt(wkey,eid)
      let type = await decrypt(wkey,etype)
      let key = await unwrap(type,hex,wkey)
      if(key){
        key.id = id
        ks.push(key)
      }
    }
    return ks
  }catch(er){console.log(er)}
  return null
}

async function parseKeys(...raws){
  let pkds = raws.reduce((r,raw)=>r.concat(parseKeys.r2kd(raw)),[])
  let keys = []
  for(let pkd of pkds){
    if(pkd instanceof CryptoKey){
      keys.push({key: pkd, raw: null, parsed: {type: pkd.algorithm.name, kd: null}, id: pkd.id})
      continue
    }
    let key, type = pkd.type
    if(pkd.type){
      key = await loadKey(pkd.type,pkd.kd,pkd.ext,pkd.port,pkd.usages).catch(x=>null)
    }
    if(pkd.kd.kty && pkd.kd.alg){
      for(let t in parseKeys.types){
        if(key){break}
        key = await loadKey(t,pkd.kd,pkd.ext,pkd.port,pkd.usages).catch(x=>null)
        type = t
      }
    }
    if(key){
      keys.push( {key, raw: pkd.raw, parsed: {type, kd: pkd.kd}, id: pkd.kid} )
    }
  }
  return keys
}
parseKeys.types = {
  "RSA-OAEP": RSAOAEP, // pair
  "RSA-PSS": RSAPSS, // pair
  "RSASSA-PKCS1-v1_5": RSAPKCS1, // pair
  "ECDH": ECDH, // pair
  "ECDSA": ECDSA, // pair
  "AES-GCM": AESGCM,
  "AES-CBC": AESCBC,
  "AES-CTR": AESCTR,
  "HMAC": HMAC,
}
parseKeys.autoGeneratePublic = false
parseKeys.parsed = new WeakSet()
parseKeys.r2kd = function(raw){
  if(raw instanceof CryptoKey){return [raw]}
  if(parseKeys.parsed.has(raw)){return []}
  if(typeof raw == "object"){
    parseKeys.parsed.add(raw)
  }
  let outputs //type, kd, ext, port, usages
  if(typeof raw == "string"){
    try{
      outputs = parseKeys.r2kd(JSON.parse(raw))
    }catch(er){
      let type = raw.match(/RSA-OAEP|RSA-PSS|RSASSA-PKCS1-v1_5|ECDH|ECDSA|AES-GCM|AES-CBC|AES-CTR|HMAC/)
      let hex = raw.replace(type[0] ?? "","").match(/^[0-9A-F]{16,}|[0-9A-F]{16,}$/)
      if(type && hex){
        let kid = raw.replace(type[0],"").replace(hex[0],"").replace(/[\p{Z}\p{C}\p{S}]+/gu,"")
        outputs = [{raw, type: type[0], kd: h2b(hex[0]), port: "raw", kid}]
      }
    }
  }else if(typeof raw == "object"){
    if(Array.isArray(raw)){
      outputs = raw.map(a=>parseKeys.r2kd(a))
    }else if(raw.keys){
      outputs = Object.values(raw.keys).map(kd=>parseKeys.r2kd(kd))
    }else if(raw.kd && raw.type){
      outputs = [raw]
    }else if(raw.kty && raw.alg){
      outputs = [{raw, kd: raw, kid: raw.kid}]
      if(parseKeys.autoGeneratePublic && raw.d){
        let p = Object.assign({},raw)
        delete p.d
        delete p.key_ops
        outputs.push({raw, kd: p, kid: raw.kid ? `${raw.kid}_public` : undefined})
      }
    }
  }
  return outputs
}

async function unwrapKeys(type,kds,wkey,iv_ctr,ext,wport,usages){
  try{
    let ks = []
    for(let kd of kds){
      let k = await unwrap(type,kd,wkey,iv_ctr,ext,wport,usages).catch(x=>null)
      if(k){
        ks.push(k)
      }
    }
    return ks
  }catch(er){}
}

async function exportKeys(keys){
  let ks = []
  for(let key of keys){
    ks.push(await saveKey(key).catch(x=>null))
  }
  return ks.filter(v=>v)
}

async function keyHash(key,port,h_type){
  return await hash(await saveKey(key,port),h_type)
}

// param functions

function loadJwkPrivateToPublic(type,jwk,ext,usages){
  let pb = Object.assign({},jwk)
  delete pb.d
  delete pb.key_ops
  return loadKey(type,pb,ext,usages)
}

function setDefaultExtractable(ext){
  return defaultExt = !!ext
}
function getDefaultExtractable(){
  return defaultExt
}

function setAESCTRcounter(hex){
  let bin
  if(hex instanceof Uint8Array){
    bin = hex
  }else if(typeof hex == "string"){
    if(/^[a-fA-F0-9]+$/.test(hex)){
      bin = h2b(hex)
    }else if(!isNaN(hex)){
      bin = new Uint8Array([Number(hex)])
    }else{
      bin = s2b(hex)
    }
  }else{
    bin = new Uint8Array(hex)
  }
  return algs["AES-CTR"].counter = bin
}
function getAESCTRcounter(){
  return b2h(algs["AES-CTR"].counter)
}
function setAESCBCiv(hex){
  let bin
  if(hex instanceof Uint8Array){
    bin = hex
  }else if(typeof hex == "string"){
    if(/^[a-fA-F0-9]+$/.test(hex)){
      bin = h2b(hex)
    }else{
      bin = s2b(hex)
    }
  }else{
    bin = new Uint8Array(hex)
  }
  return algs["AES-CBC"].iv = bin
}
function getAESCBCiv(){
  return b2h(algs["AES-CBC"].iv)
}
function setAESGCMiv(hex){
  let bin
  if(hex instanceof Uint8Array){
    bin = hex
  }else if(typeof hex == "string"){
    if(/^[a-fA-F0-9]+$/.test(hex)){
      bin = h2b(hex)
    }else{
      bin = s2b(hex)
    }
  }else{
    bin = new Uint8Array(hex)
  }
  return algs["AES-GCM"].iv = bin
}
function getAESGCMiv(){
  return b2h(algs["AES-GCM"].iv)
}
function setHKDFsalt(hex){
  let bin
  if(hex instanceof Uint8Array){
    bin = hex
  }else if(typeof hex == "string"){
    if(/^[a-fA-F0-9]+$/.test(hex)){
      bin = h2b(hex)
    }else{
      bin = s2b(hex)
    }
  }else{
    bin = new Uint8Array(hex)
  }
  return algs["HKDF"].salt = bin
}
function getHKDFsalt(){
  return b2h(algs["HKDF"].salt)
}
function setPBKDF2salt(hex){
  let bin
  if(hex instanceof Uint8Array){
    bin = hex
  }else if(typeof hex == "string"){
    if(/^[a-fA-F0-9]+$/.test(hex)){
      bin = h2b(hex)
    }else{
      bin = s2b(hex)
    }
  }else{
    bin = new Uint8Array(hex)
  }
  return algs["PBKDF2"].salt = bin
}
function getPBKDF2salt(){
  return b2h(algs["PBKDF2"].salt)
}

// misc(ui) functions

function download(blob,name,click = true){
  if(!(blob instanceof Blob)){
    if(typeof blob == "function"){
      [blob,name] = blob(name)
    }else if(blob){
      if(Array.isArray(blob)){
        blob = new Blob(blob)
      }else if(typeof blob == "object"){
        blob = new Blob([JSON.stringify(blob)])
      }else{
        blob = new Blob([blob])
      }
    }
  }
  a = document.createElement("a")
  a.target = "_blank"
  a.href = URL.createObjectURL(blob)
  a.addEventListener("click",download.revoke)
  a.download = name
  if(click){ a.click() }
  return a
}
download.revoke = function(e){
  this.removeEventListener("click",download.revoke)
  setTimeout(()=>{
    URL.revokeObjectURL(this.href)
    this.target = ""
    this.href = ""
    this.download = ""
  },0)
}

function toText(kd){
  if(!kd){return ""}
  if(typeof kd == "object"){
    if(kd instanceof ArrayBuffer || kd.buffer instanceof ArrayBuffer){
      return b2s(kd)
    }else{
      return Object.entries(kd).map(([k,v])=>{
        let o = `${k}: `
        if(Array.isArray(v)){
          o += `[${v.join(", ")}]`
        }else if(typeof v == "object"){
          o += "{" + Object.entries(v).map(([vk,vv])=>`${vk}: ${vv}`).join(", ") + "}"
        }else{
          o += `${v}`
        }
        return o
      }).join("\n")
    }
  }else{
    return `${kd}`
  }
}

function createFileInput(callback){
  if(typeof callback != "function"){throw TypeError()}
  const fi = document.createElement("input")
  fi.type = "file"
  fi.onchange = function(e){
    callback(this.files)
    this.value = ""
  }
  return fi
}

function bindUpload(dom,callback){
  if(dom instanceof HTMLElement){
    if(dom.fi instanceof HTMLInputElement){
      dom.fi.onChange = null
    }
    dom.fi = createFileInput(callback)
    dom.addEventListener("click",bindUpload.click)
  }
}
bindUpload.click = function(e){
  this.fi.click()
}
bindUpload.unbind = function(dom){
  if(dom instanceof HTMLElement){
    if(dom.fi instanceof HTMLInputElement){
      delete dom.fi
    }
    dom.removeEventListener("click",bindUpload.click)
  }
}


// module export

window["SC"]={encrypt,decrypt,sign,verify,hash,digest:hash,wrap,unwrap,derive,deriveBits,signAndEncrypt,decryptAndVerify,algs,fns:{s2b,b2s,b2h,h2b,h2s,download,toText,createFileInput,bindUpload,randomU8,randomHex},keyFn:{createKey,saveKey,loadKey,createSVKey,createEDKey,createWKey,createDKey,passwordDeriveED,passwordDeriveSV,loadJwkPrivateToPublic,AESCTR:{getCounter:getAESCTRcounter,setCounter:setAESCTRcounter},AESCBC:{getIV:getAESCBCiv,setIV:setAESCBCiv},AESGCM:{getIV:getAESGCMiv,setIV:setAESGCMiv},HKDF:{getSalt:getHKDFsalt,setSalt:setHKDFsalt},PBKDF2:{getSalt:getPBKDF2salt,setSalt:setPBKDF2salt},setDefaultExtractable,getDefaultExtractable,parseKeys,unwrapKeys,protectKeys,unprotectKeys,exportKeys,keyHash}}

})()