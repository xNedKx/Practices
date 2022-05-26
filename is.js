/*
  傳染數模擬 (固定參數)
  initial_states 起始狀態 [c]
  total_population 群體總數 100
  infect_powers 傳染期 [...傳染力]
  immune_period 免疫期 20
  
  progress(n) 前進 n 次變化
  getRecord() 取得紀錄
  detail(record) 解析紀錄為 [[...s0次數],[...s1次數],[...s2次數]]每個項目為一個個體單位
  getParam() 取得設定參數
*/

function createModel(initial_states=[],total_population=100,infect_powers=[0,1,1],immune_period=20,){
  let population = []
  for(let i = 0; i < total_population; i++){
    population[i]={s:0,c:1,n:0}
  }
  for(let i in initial_states){
    let c = initial_states[i]
    if(typeof c === 'number'){
      if(c > 0 && c <= infect_powers.length){
        population[i] = {s:1,c,n:1}
      }else if(c-infect_powers.length <= immune_period){
        population[i] = {s:2,c:c-infect_powers.length,n:2}
      }
    }
  }
  let cache = [population]
  function next(){
    let infects = 0, np = []
    for(let i in population){
      let p = population[i]
      if(p.s == 1){
        if(p.c <= infect_powers.length){
          infects += infect_powers[p.c-1]
          if(p.c === infect_powers.length){
            np[i] = 2
          }else{
            np[i] = 1
          }
        }else if(p.c > infect_powers.length){
          np[i] = 2
        }
      }else if(p.s == 2 && p.c >= immune_period){
        np[i] = 0
      }else{
        np[i] = p.s
      }
    }
    for(let i in population){
      if(infects > 0){
        if(population[i].s === 0){
          np[i] = 1
          infects--
        }
      }else{
        break
      }
    }
    for(let i in population){
      let p = population[i]
      if(p.s != np[i]){
        np[i] = Object.freeze({s:np[i],c:1,n:np[i]})
      }else{
        np[i] = Object.freeze({s:p.s,c:p.c+1,n:p.n})
      }
    }
    cache.push(Object.freeze(np))
    population = np
    return population
  }
  function getRecord(){
    return cache
  }
  function detail(c){
    let s = [[],[],[]]
    for(let p of c){
      s[p.s].push(p.c)
    }
    Object.freeze(s[0])
    Object.freeze(s[1])
    Object.freeze(s[2])
    Object.freeze(s)
    return s
  }
  function progress(n){
    n = n ?? 1
    for(let i = 0; i < n; i++){
      next()
    }
    return cache.slice(-n)
  }
  function getParam(){
    return {infect_powers,immune_period,total_population,initial_states:cache[0]}
  }
  return {progress,getRecord,detail,getParam}
}

/* optimise to record data by state instead of unit */
function setup(p=1,f=[1],m=1,s=[1]){
  const l = [f.length,m]
  let o = {p,a:Array(1+l[0]+l[1]).fill(0),t:[0],l}
  for(let i = 0; i < f.length; i++){
    o.t[i+1] = f[i]
  }
  for(let i = 0; i < m; i++){
    o.t.push(0)
  }
  o.a[0] = p
  for(let i = 0; i < s.length; i++){
    if(s[i]){
      let x = Math.min(Math.max(s[i],0),o.a[0])
      o.a[i+1] = x
      o.a[0] -= x
    }
  }
  return o
}
function next(o){
  let fn = 0
  for(let i = 1; i <= o.l[0]; i++){
    fn += o.a[i]*o.t[i]
  }
  fn = Math.min(Math.round(fn),o.a[0])
  let na = [o.a[0]-fn+o.a[o.a.length-1],fn,...o.a.slice(1,-1)]
  return {p:o.p,a:na,t:o.t.slice(),l:o.l.slice()}
}
function toGroup(o){
  let g = [o.a[0],0,0]
  for(let i = 0; i < o.l[0]; i++){
    g[1] += o.a[1+i]
  }
  for(let i = 0; i < o.l[1]; i++){
    g[2] += o.a[1+o.l[0]+i]
  }
  return g
}
function run(o,c){
  let r = [toGroup(o)], t = o
  for(let i = 0; i < c; i++){
    t = next(t)
    r.push(toGroup(t))
  }
  return {o,c,r,t}
}