// simple ROC curve with csv loading and canvas ploting
// author: xNedKx | gmail.com
// 2018/12/19
// copyright reserved

(()=>{
// global var
var data = [], n = 101, points = [], colCache = {};
var alertLv = 0;
function error(str, ret, ertype=Error){
  if(alertLv){
    throw ertype(str);
  }else{
    return ret;
  }
}

// parse csv, first row is header
function parseCSV(str){
  let cn = 0, output = [], separators = {"\t":0,",":0,";":0}, linebreakers = ["\n","\r"], sepOrder = [];
  let lines = str.split(RegExp(`${linebreakers.join("|")}`)).filter(s=>s.length);
  if( lines.length < 2 ){return error("unable to parse input due to no data rows detected",[]);}
  for( let k in separators ){
    separators[k] = (lines[0].match(RegExp(k,"g"))||[]).length;
    if(separators[k] == (lines[1].match(RegExp(k,"g"))||[]).length){
      sepOrder.push(k);
    }
  }
  if(sepOrder.length == 0){return error("unable to parse input due to unrecognized separator",[]);}
  sepOrder.sort((a,b)=>separators[b]-separators[a]);
  return lines.map(line=>line.split(sepOrder[0]));
}

function analyse(data, col){
  let i = col
  if(typeof col == "string"){
    i = data[0].indexOf(col);
  }
  if(!(isFinite(i)&&i>=0&&i<data[0].length)){
    return error("unable to locate the column in the data",null);
  }
  let min = Infinity, max = -Infinity, sum = 0, se, values = {}, mode, label = data[0][i], size = data.length-1, isn = true
  for( let j = 1; j < data.length; j++ ){
    let v = data[j][i];
    if(isn){
      if(isNaN(v)){
        isn = false;
        min = max = sum = se = NaN;
      }else{
        v = +v;
        min = Math.min(min,v);
        max = Math.max(max,v);
        sum += v;
      }
    }
    if(!values.hasOwnProperty(v)){
      values[v] = [j];
    }else{
      values[v].push(j);
    }
  }
  if(Object.keys(values).length <= 2){ // binary
    if(isn){ // binary number
      colCache[label] = {l: label, i, v: values, size, min, max, sum, binary: true}
    }else{ // binary discrete
      colCache[label] = {l: label, i, v: values, size, binary: true}
    }
  }else{ // non binary
    if(isn){ // numbers
      colCache[label] = {l: label, i, v: values, size, min, max, sum, factor: true}
    }else{ // multiple discrete
      colCache[label] = {l: label, i, v: values, size}
    }
  }
  return colCache[label]
}

// create curve => binary predict col, ordered measured factor col, sample number(freq)
function create_roc_model(m){
  switch(m){
    default:
    case 0:
    case "<=":
      return (t,v) => v <= t
    break;
    case 1:
    case "<":
      return (t,v) => v < t
    break;
    case 2:
    case ">=":
      return (t,v) => v >= t
    break;
    case 3:
    case ">":
      return (t,v) => v > t
    break;
  }
}

function roc(data,bl,fl,pn,params){
  let output = [], bin = colCache[bl]||analyse(data,bl), fac = colCache[fl]||analyse(data,fl);
  if(!(bin && fac)){return error("unable to calculate roc")}
  let target = params && params.target, model = params && params.model;
  let amin = params && params.amin, amax = params && params.amax;
  let min = isFinite(amin)? amin:fac.min, max = isFinite(amax)? amax:fac.max, range = max - min, steps = +pn - 2;
  let predL = typeof target != "undefined" && target ? target : Object.keys(bin.v)[0];
  predL = bin.factor ? +predL : predL;
  let tn = bin.v[predL].length, fn = bin.size - tn;
  let mf = typeof model == "function" ? model : create_roc_model(model);
  for( let i = 0; i <= +pn; i++ ){
    let t = min + range * ((i-1)/steps), tps = 0, tns = 0;
    for( let j = 1; j < data.length; j++ ){
      let p = mf(t,data[j][fac.i])
      if(p && data[j][bin.i] == predL){
        tps++;
      }else if(!p && data[j][bin.i] != predL){
        tns++;
      }
    }
    output.push({t, sen: tps/tn, spe: tns/fn, step: i});
  }
  return output;
}

function roc_to_points(roc){
  return roc.map(({t,sen,spe})=>[sen, 1-spe])
}

// DOM create, UI control
if(typeof document != "undefined"){
  let DOMroot = document.createElement("div");
  let DOMheader = document.createElement("div");
  let DOMbody = document.createElement("div");
  let DOMloaderLabel = document.createElement("label");
  let DOMloader = document.createElement("input");
  let DOMselectBinary = document.createElement("select");
  let DOMselectBinaryLabel = document.createElement("label");
  let DOMselectFactor = document.createElement("select");
  let DOMselectFactorLabel = document.createElement("label");
  let DOMselectMode = document.createElement("select");
  let DOMselectModeLabel = document.createElement("label");
  let DOMtarget = document.createElement("select");
  let DOMnumberLabel = document.createElement("label");
  let DOMnumber = document.createElement("input");
  let DOMmin = document.createElement("input");
  let DOMmax = document.createElement("input");
  let DOMstep = document.createElement("input");
  let DOMrun = document.createElement("button");
  let DOMreset = document.createElement("button");
  let DOMinfo = document.createElement("div");
  let DOMcanvas = document.createElement("canvas");
  let cnv = DOMcanvas.getContext("2d");
  
  DOMroot.style.backgroundColor = "#FFFD";
  DOMroot.style.textAlign = "center";
  
  DOMroot.append(DOMheader);
  DOMheader.innerHTML = "Simple ROC Curve";
  DOMheader.style.fontSize= "2em";
  DOMheader.style.backgroundColor = "#FFFF";
  DOMheader.style.marginBottom = "2px";
  
  DOMroot.append(DOMbody);
  
  DOMbody.append(DOMloaderLabel);
  DOMloaderLabel.innerText = "Import CSV file to run: ";
  DOMloaderLabel.style.padding = "6px 0";
  DOMloaderLabel.append(DOMloader);
  DOMloader.setAttribute("type","file");
  DOMloader.setAttribute("accept","text/csv, .csv");
  DOMloader.setAttribute("value","import csv to run");
  
  DOMbody.append(document.createElement("div"));
  DOMbody.lastChild.innerText = "Predict Model:"
  DOMbody.lastChild.style.border = "solid #1113";
  DOMbody.lastChild.style.borderWidth = "1px 0";
  DOMbody.lastChild.style.backgroundColor = "#FFF6";
  DOMbody.lastChild.style.margin = "2px auto";
  
  DOMbody.append(document.createElement("div"));
  DOMbody.lastChild.style.margin = "2px auto";
  
  DOMbody.lastChild.append(DOMselectFactorLabel);
  DOMselectFactorLabel.innerText = "If factor [";
  DOMselectFactorLabel.append(DOMselectFactor);
  DOMselectFactor.style.minWidth = "8em";
  
  DOMbody.lastChild.append(document.createElement("span"));
  DOMbody.lastChild.lastChild.innerText = "] "
  
  DOMbody.lastChild.append(DOMselectModeLabel);
  DOMselectModeLabel.append(DOMselectMode);
  DOMselectMode.appendChild(document.createElement("option"));
  DOMselectMode.lastChild.value = "<=";
  DOMselectMode.lastChild.innerText = "<=";
  DOMselectMode.appendChild(document.createElement("option"));
  DOMselectMode.lastChild.value = "<";
  DOMselectMode.lastChild.innerText = "<";
  DOMselectMode.appendChild(document.createElement("option"));
  DOMselectMode.lastChild.value = ">=";
  DOMselectMode.lastChild.innerText = ">=";
  DOMselectMode.appendChild(document.createElement("option"));
  DOMselectMode.lastChild.value = ">";
  DOMselectMode.lastChild.innerText = ">";
  
  DOMbody.lastChild.append(document.createElement("span"));
  DOMbody.lastChild.lastChild.innerText = " the threshold"
  
  DOMbody.lastChild.append(document.createElement("br"));
  
  DOMbody.lastChild.append(document.createElement("span"));
  DOMbody.lastChild.lastChild.innerText = "then "
  
  DOMbody.lastChild.append(DOMselectBinaryLabel);
  DOMselectBinaryLabel.innerText = "target [";
  DOMselectBinaryLabel.append(DOMselectBinary);
  DOMselectBinary.style.minWidth = "8em";
  
  DOMbody.lastChild.append(document.createElement("span"));
  DOMbody.lastChild.lastChild.innerText = "] is predicted to be:"
  
  DOMbody.lastChild.append(DOMtarget);
  DOMtarget.style.width = "8em";
  
  DOMbody.append(document.createElement("div"));
  DOMbody.lastChild.style.margin = "6px auto 1px";
  
  DOMbody.lastChild.append(DOMnumberLabel);
  DOMnumberLabel.innerText = "Threshold sampling times:"
  DOMnumberLabel.append(DOMnumber);
  DOMnumber.style.width = "2.5em";
  DOMnumber.defaultValue = n;
  
  DOMbody.append(document.createElement("div"));
  DOMbody.lastChild.style.border = "solid #1113";
  DOMbody.lastChild.style.borderWidth = "1px 0";
  DOMbody.lastChild.style.backgroundColor = "#FFF6";
  
  DOMbody.lastChild.append(DOMrun);
  DOMrun.innerText = "plot curve";
  
  DOMbody.lastChild.append(DOMreset);
  DOMreset.innerText = "clear plot";
  
  
  DOMbody.append(DOMcanvas);
  DOMcanvas.style.margin = "4px";
  
  DOMbody.append(DOMinfo);
  
  let addOption = (dom,opt)=>{
    let o = document.createElement("option");
    o.value = opt;
    o.innerText = opt
    dom.appendChild(o);
  }
  let removeOption = (dom,opt)=>{
    if(typeof opt == "undefined"){
      while(dom.childNodes.length)dom.removeChild(dom.firstChild);
    }else{
      let c = dom.querySelector(`[value=${opt}]`);
      if(c)dom.removeChild(c);
    }
  }
  let setupData = (d)=>{
    removeOption(DOMselectBinary);
    removeOption(DOMselectFactor);
    for( let i in d[0] ){
      addOption(DOMselectBinary, d[0][i]);
      addOption(DOMselectFactor, d[0][i]);
    }
    DOMinfo.innerText = "data imported";
    data = d;
    update_binary_option();
    check_factor();
    setupCanvas();
  }
  let readFile = (e)=>{
    return new Promise((s,j) =>{
      if(e.target.files[0] instanceof Blob){
        try{
          let fr = new FileReader()
          fr.addEventListener("loadend", ev => s(fr.result))
          fr.readAsText(e.target.files[0])
        }catch(er){j(er)}
      }else{
        j(TypeError("no file selected."))
      }
    }).then(text => {
      return parseCSV(text);
    }).then(d=>{
      setupData(d);
    })
  }
  let update_binary_option = (e)=>{
    let c = analyse(data, DOMselectBinary.value);
    removeOption(DOMtarget)
    Object.keys(c.v).forEach(k=>{
      addOption(DOMtarget,k);
    })
  }
  let check_factor = (e)=>{
    let c = analyse(data, DOMselectFactor.value);
    if(!c.factor){
      DOMselectFactor.selectedOptions[0].disabled = true;
      DOMselectFactor.style.textDecoration = "line-through";
    }else{
      DOMselectFactor.style.textDecoration = "";
    }
  }
  let check_number = (e)=>{
    let i = DOMnumber.value
    if(isFinite(i) && i > 2){
      n = +DOMnumber.value;
    }else if(isFinite(i)){
      DOMnumber.value = 3;
      n = +DOMnumber.value;
    }else{
      DOMnumber.value = n;
    }
  }
  let plot = (e)=>{
    let bl = DOMselectBinary.value, fl = DOMselectFactor.value;
    check_number();
    if(!data.length){
      DOMinfo.innerText = "import data first";
      return error("import data first");
    }
    if(DOMselectFactor.selectedOptions[0].disabled){
      DOMinfo.innerText = "unable to use selected column as factor";
      return error("unable to use selected column as factor");
    }
    let o = roc(data, bl, fl, n,{model:DOMselectMode.value,target:DOMtarget.value});
    points = roc_to_points(o);
    cnv.beginPath();
    cnv.moveTo(points[0][0]*300+10,(1-points[0][1])*300+10);
    cnv.lineWidth = 3;
    for( let i in points ){
      cnv.strokeStyle = "hsl("+Math.floor(360*i/points.length)+",90%,40%)";
      let x = points[i][0]*300+10;
      let y = (1-points[i][1])*300+10;
      cnv.lineTo(x,y);
      cnv.stroke();
      cnv.beginPath();
      cnv.moveTo(x,y);
    }
    DOMinfo.innerHTML = "<span>[ROC plotted]<br>If [" + fl + "] " + DOMselectMode.value + " 'threshold' then [" + bl + "] is predicted to be '" + DOMtarget.value + "'</span><table style='border-collapse: collapse; margin: 0 auto;'><tr style='background-color: #ffff; font-size: large; margin: 0; font-family: monospace; font-weight: bold;'><th>[Index]</th><th width='100'>Threshold:</th><th>(</th><th width='140'>Sensitivity</th><th>,</th><th width='140'>1 - specificity</th><th>)</th></tr><tr>" + o.map(({t,step,sen,spe})=>`<tr style="color: hsl(${Math.floor(360*step/points.length)},90%,40%); background-color: #ffff; font-size: large; margin: 0; font-family: monospace; font-weight: bold;"><td>[${step}]</td><td>${Math.round(t*1e8)/1e8}:</td><td>(</td><td>${Math.round(sen*1e8)/1e8}</td><td>,</td><td>${Math.round((1-spe)*1e8)/1e8}</td><td>)</td></tr>`).join("") + "</table>";
  }
  let setupCanvas = (e)=>{
    DOMcanvas.width = 320;
    DOMcanvas.height = 320;
    cnv.fillStyle = "#FFFF";
    cnv.fillRect(0,0,320,320);
    cnv.lineWidth = 1.5;
    cnv.strokeStyle = "#333C";
    cnv.strokeRect(10,10,300,300);
    cnv.lineWidth = 1;
    cnv.strokeStyle = "#6666";
    cnv.moveTo(10,310);
    cnv.lineTo(310,10);
    cnv.stroke();
    cnv.font = "10px serif";
    cnv.fillStyle = "#333F";
    cnv.fillText("sensitivity",0,7.5);
    cnv.textAlign = "right";
    cnv.fillText("1-specificity",320,318.5);
  }
  let reset = (e)=>{
    setupCanvas()
    DOMinfo.innerText = "plot reset";
  }
  DOMloader.addEventListener("change",readFile);
  DOMselectBinary.addEventListener("change",update_binary_option);
  DOMselectFactor.addEventListener("change",check_factor);
  DOMnumber.addEventListener("change",check_number);
  DOMrun.addEventListener("click",plot);
  DOMreset.addEventListener("click",reset);
  document.addEventListener('DOMContentLoaded', (e)=>{
    document.body.append(DOMroot);
    setupCanvas();
  })
}

})();