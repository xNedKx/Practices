// enum dice results, params: number/faces
function dice_result ( faces ) { // faces: [UINT]|Number
  if( isFinite(faces) && faces >= 1 ){
    faces = new Array(+faces>>0).fill(6)
  }
  let result = {faces, number: faces.length, collection: [[]]}
  for( let i = 0; i < result.number; i++ ){
    let append = []
    for( let j = 1; j < faces[i]+1; j++ ){
      for( let k = 0; k < result.collection.length; k++ ){
        append.push(result.collection[k].concat(j))
      }
    }
    result.collection = append
  }
  return result
}
// calculate dice results, ignore order
function result_prob ( result, ordered = false ) {
  let probs = {}
  if(!ordered && result.faces.filter(n=>n=result.faces[0]).length != result.faces.length){ ordered = true }
  let hash = (ar) => {
    let copy = ar.slice(), h = 0, m = 1
    if(!ordered){ copy.sort((a,b)=>a-b) }
    for( let i = copy.length-1; i >= 0; i-- ){
      h += (copy[i]-1)*m
      m *= result.faces[i]
    }
    return {item:copy,hash:h}
  }
  for( let i = 0; i < result.collection.length; i++ ){
    let d = result.collection[i]
    let h = hash(d)
    if(!probs.hasOwnProperty(h.hash)){
      probs[h.hash] = {item: h.item, set: [], count: 0}
    }
    probs[h.hash].set.push({i,d})
    probs[h.hash].count++
  }
  return probs
}
// enum result of spliting 4 6-faces dice into 2-2 group, indexed by the dice combinations
function group_divide_22 () {
  let dices = dice_result ( [6,6,6,6] )
  let probs = result_prob( dices )
  let output = {}
  for( let k in probs ){
    let {item,set,count} = probs[k]
    let h = item.join(""), c = [0,0,0,0,0,0], counts = {}, type, combs = [], combt = [], numbers = {}
    for( let i = 0; i < item.length; i++ ){
      c[item[i]-1]++
    }
    for( let i = 0; i < c.length; i++ ){
      if( c[i] > 0 ){
        if(!counts.hasOwnProperty(c[i])){
          counts[c[i]] = []
        }
        counts[c[i]].push(i+1)
      }
    }
    if(counts.hasOwnProperty(4)){ // 4
      type = 0
      combt.push([[counts[4][0],counts[4][0]],[counts[4][0],counts[4][0]]])
    }else if(counts.hasOwnProperty(3)){ // 31
      type = 1
      combt.push([[counts[3][0],counts[3][0]],[counts[3][0],counts[1][0]]])
    }else if(counts.hasOwnProperty(2)){
      if(!counts.hasOwnProperty(1)){ // 22
        type = 2
        combt.push([[counts[2][0],counts[2][0]],[counts[2][1],counts[2][1]]])
        combt.push([[counts[2][0],counts[2][1]],[counts[2][0],counts[2][1]]])
      }else{ // 211
        type = 3
        combt.push([[counts[2][0],counts[2][0]],[counts[1][0],counts[1][1]]])
        combt.push([[counts[2][0],counts[1][0]],[counts[2][0],counts[1][1]]])
      }
    }else{ // 1111
      type = 4
      combt.push([[counts[1][0],counts[1][1]],[counts[1][2],counts[1][3]]])
      combt.push([[counts[1][0],counts[1][2]],[counts[1][1],counts[1][3]]])
      combt.push([[counts[1][0],counts[1][3]],[counts[1][1],counts[1][2]]])
    }
    for( let i in combt ){
      let a = combt[i][0][0] + combt[i][0][1]
      let b = combt[i][1][0] + combt[i][1][1]
      combs.push({a,b,c:combt[i]})
      if(!numbers.hasOwnProperty(a)){
        numbers[a] = []
      }
      if(!numbers.hasOwnProperty(b)){
        numbers[b] = []
      }
      numbers[a].push(i)
      numbers[b].push(i)
    }
    output[h] = {hash: h, counts, type, combs, amount: combs.length, numbers, probs: probs[k]}
  }
  return output
}
// enum 2-2 dice pair results, indexed by the pair number
function pair_prob () {
  let dices = group_divide_22()
  let pairs = {}
  let hash = (c) => {
    let a = c.a, b = c.b
    if( a > b ){
      a = c.b
      b = c.a
    }
    return a.toString()+"&"+b.toString()
  }
  for( let h in dices ){
    for( let c of dices[h].combs ){
      let k = hash(c), [a,b] = k.split("&")
      if(!pairs.hasOwnProperty(k)){
        pairs[k] = {a: +a, b: +b, items: [], w: 0}
      }
      pairs[k].items.push(dices[h])
      pairs[k].w += dices[h].probs.count
    }
  }
  let wsum = 0
  for( let h in pairs ){ wsum += pairs[h].w }
  return { pairs, wsum }
}
let pairs = pair_prob ()
// enum chances of specific number shows
function number_prob () {
  let numbers = {}, wsum = pairs.wsum
  for(let k in pairs.pairs){
    let a = pairs.pairs[k].a, b = pairs.pairs[k].b
    if(!numbers.hasOwnProperty(a)){
      numbers[a] = {a: a, pairs: [], w: 0, d: 0}
    }
    if(!numbers.hasOwnProperty(b)){
      numbers[b] = {a: b, pairs: [], w: 0, d: 0}
    }
    numbers[a].pairs.push(pairs.pairs[k])
    numbers[a].w += pairs.pairs[k].w
    if(pairs.pairs[k].a == pairs.pairs[k].b){
      numbers[a].d += pairs.pairs[k].w
    }else{
      numbers[b].pairs.push(pairs.pairs[k])
      numbers[b].w += pairs.pairs[k].w
    }
  }
  return numbers
}
// enum N1 or N2 chances
function number_prob_2 () {
  let numbers = {}
  for( let a = 2; a < 13; a++ ){
    for( let b = a+1; b < 13; b++ ){
      let h = a.toString()+"|"+b.toString()
      numbers[h] = {a, b, pairs: [], w: 0}
      for( let k in pairs.pairs ){
        if( pairs.pairs[k].a == a || pairs.pairs[k].b == a || pairs.pairs[k].a == b || pairs.pairs[k].b == b ){
          numbers[h].pairs.push(pairs.pairs[k])
          numbers[h].w += pairs.pairs[k].w
        }
      }
    }
  }
  return numbers
}
// enum N1 or N2 or N3 chances
function number_prob_3 () {
  let numbers = {}
  for( let a = 2; a < 13; a++ ){
    for( let b = a+1; b < 13; b++ ){
      for( let c = b+1; c < 13; c++ ){
        let h = a.toString()+"|"+b.toString()+"|"+c.toString()
        numbers[h] = {a, b, c, pairs: [], w: 0}
        for( let k in pairs.pairs ){
          if( pairs.pairs[k].a == a || pairs.pairs[k].b == a || pairs.pairs[k].a == b || pairs.pairs[k].b == b || pairs.pairs[k].a == c || pairs.pairs[k].b == c ){
            numbers[h].pairs.push(pairs.pairs[k])
            numbers[h].w += pairs.pairs[k].w
          }
        }
      }
    }
  }
  return numbers
}
// enums
let d1 = number_prob(), d2 = number_prob_2(), d3 = number_prob_3()
// expection value of advances (ignore ending and double move)
function adv_exp (n1,n2,n3){
  let ns = 0
  if(isFinite(n1) && n1 > 1 && n1 < 13){
    n1 = n1 >> 0
    ns++
    if(isFinite(n2) && n2 > 1 && n2 < 13){
      n2 = n2 >> 0
      ns++
      if(isFinite(n3) && n3 > 1 && n3 < 13){
        n3 = n3 >> 0
        ns++
      }
    }
  }
  let wsum = pairs.wsum, e, a, b, c, dsum, w, p, h, da, db, dc
  switch(ns){
  case 3:
    [a,b,c] = [n1,n2,n3].sort((a,b)=>a-b)
    h = a.toString()+"|"+b.toString()+"|"+c.toString()
    w = d3[h].w
    da = d1[a].d
    db = d1[b].d
    dc = d1[c].d
    p = w / wsum
    dsum = (da + db + dc) / wsum
    e = p * ( 1 + dsum ) / Math.pow( 1 - p * ( 1 + dsum ), 2 )
    return {a,b,c,p,dsum,e}
  break
  case 2:
    [a,b] = [n1,n2].sort((a,b)=>a-b)
    h = a.toString()+"|"+b.toString()
    w = d2[h].w
    da = d1[a].d
    db = d1[b].d
    p = w / wsum
    dsum = (da + db) / wsum
    e = p * ( 1 + dsum ) / Math.pow( 1 - p * ( 1 + dsum ), 2 )
    return {a,b,p,dsum,e}
  break
  case 1:
    dsum = d1[n1].d / wsum
    p = d1[n1].w / wsum
    e = p * ( 1 + dsum ) / Math.pow( 1 - p * ( 1 + dsum ), 2 )
    return {a:n1,p,dsum,e}
  break
  case 0:
  default:
    e = NaN
    return {e}
  }
}
// burst chance
function burst () {
  let combs = []
  for( let i = 0; i < 11; i++ ){
    let tmp = [[]]
    for( let j = 0; j < i+1; j++ ){
      let copy = tmp.slice(), r = []
      for( let k = 0; k < tmp.length; k++ ){
        for( let n = 2; n < 13; n++ ){
          if( (tmp[k].length == 0 || tmp[k].slice(-1)[0] < n) && tmp[k].indexOf(n) == -1 ){
            r.push( tmp[k].concat(n) )
          }
        }
      }
      tmp = r
    }
    combs[i] = tmp
  }
  combs.unshift([[]])
  let output = {}
  for( let i in combs ){ // 0-11
    output[i] = {}
    for( let j in combs[i] ){ // 0-n
      let w = 0;
      for( let k in pairs.pairs ){
        if( combs[i][j].indexOf(pairs.pairs[k].a) != -1 && combs[i][j].indexOf(pairs.pairs[k].b) != -1 ){
          w += pairs.pairs[k].w
        }
      }
      output[i][combs[i][j].join(",")] = {numbers: combs[i][j], w}
    }
  }
  return output
}
function al () {
  for( let h in d1 ){
    Object.assign(d1[h],adv_exp(d1[h].a))
  }
  for( let h in d2 ){
    Object.assign(d2[h],adv_exp(d2[h].a,d2[h].b))
  }
  for( let h in d3 ){
    Object.assign(d3[h],adv_exp(d3[h].a,d3[h].b,d3[h].c))
  }
  let stops = burst()
  let output = {pairs,d1,d2,d3,stops}
  return output
}
let probs = al()