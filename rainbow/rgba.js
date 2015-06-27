
var RGBA = (function(){
function RGBA(){
    this.setByParse.apply(this, arguments);
}
RGBA.prototype.keys = ["r", "g", "b", "a"];
RGBA.prototype.scale = {r: {min: 0 , max: 255, step: 1}, 
                        g: {min: 0 , max: 255, step: 1}, 
                        b:{min: 0 , max: 255, step: 1}, 
                        a:{min: 0 , max: 255, step: 1}};

RGBA.prototype.parseToArray = function(){
    var arr = [];
    if(typeof(arguments[0]) == "string"){
        var tmp;
        if(tmp = arguments[0].match(/^rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d?\.?\d+)\s*\)$/)){
            arr.push(parseFloat(tmp[1]));
            arr.push(parseFloat(tmp[2]));
            arr.push(parseFloat(tmp[3]));
            arr.push(parseFloat(tmp[4]));
        }else if(tmp = arguments[0].match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/)){
            arr.push(parseFloat(tmp[1]));
            arr.push(parseFloat(tmp[2]));
            arr.push(parseFloat(tmp[3]));
        }else if(tmp = arguments[0].match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/)){
            arr.push(parseInt(tmp[1] + tmp[1], 16));
            arr.push(parseInt(tmp[2] + tmp[2], 16));
            arr.push(parseInt(tmp[3] + tmp[3], 16));
        }else if(tmp = arguments[0].match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/)){
            arr.push(parseInt(tmp[1], 16));
            arr.push(parseInt(tmp[2], 16));
            arr.push(parseInt(tmp[3], 16));
        }
    }else if(Array.isArray(arguments[0])){
        arr.push(parseFloat(arguments[0][0]));
        arr.push(parseFloat(arguments[0][1]));
        arr.push(parseFloat(arguments[0][2]));
        arr.push(parseFloat(arguments[0][3]));
    }else if(typeof(arguments[0]) == "object"){
        arr.push(parseFloat(arguments[0]["r"]));
        arr.push(parseFloat(arguments[0]["g"]));
        arr.push(parseFloat(arguments[0]["b"]));
        arr.push(parseFloat(arguments[0]["a"]));
    }else {
        arr.push(parseFloat(arguments[0]));
        arr.push(parseFloat(arguments[1]));
        arr.push(parseFloat(arguments[2]));
        arr.push(parseFloat(arguments[3]));
    }
    return arr;
}

RGBA.prototype.setByArray = function(arr){
    if(!Array.isArray(arr)){arr = [];}
    for(var i in this.keys){
        if(isNaN(arr[i])){
            console.log("Key '" + this.keys[i] + "' is not valid and had been set to the default value: " + this.scale[this.keys[i]].max);
            this[this.keys[i]] = this.scale[this.keys[i]].max;
        }else if(arr[i] > this.scale[this.keys[i]].max){
            console.log("Key '" + this.keys[i] + "' is out of scale and had been set to the default value: " + this.scale[this.keys[i]].max);
            this[this.keys[i]] = this.scale[this.keys[i]].max;
        }else if(arr[i] < this.scale[this.keys[i]].min){
            console.log("Key '" + this.keys[i] + "' is out of scale and had been set to the default value: " + this.scale[this.keys[i]].min);
            this[this.keys[i]] = this.scale[this.keys[i]].min;
        }else{
            if(this.scale[this.keys[i]].step){
                this[this.keys[i]] = Math.round((arr[i] - this.scale[this.keys[i]].min) / this.scale[this.keys[i]].step) * this.scale[this.keys[i]].step + this.scale[this.keys[i]].min;
            }else{
                this[this.keys[i]] = arr[i];
            }
        }
    }
    return this;
}

RGBA.prototype.setByParse = function(){
    return this.setByArray(this.parseToArray.apply(this, arguments));
}

RGBA.prototype.validateArrayByKeyScale = function(arr, keys, scale, alpha){
    if(!Array.isArray(arr)){throw("Input is not an array.")}
    //if(arr.length > keys.length + (alpha? -1 : 0)){console.log("Input has more items than keys.")}
    return keys.slice(0, alpha? -1 : keys.length).reduce(function(r, v, i){
        if(isNaN(arr[i])){
            throw("Key '" + keys[i] + "' is not valid.");
        }else if(arr[i] > scale[keys[i]].max){
            throw("Key '" + keys[i] + "' is beyond the scale.");
        }else if(arr[i] < scale[keys[i]].min){
            throw("Key '" + keys[i] + "' is below the scale.");
        }else{
            if(scale[keys[i]].step && arr[i] != Math.round((arr[i] - scale[keys[i]].min) / scale[keys[i]].step) * scale[keys[i]].step + scale[keys[i]].min){
                throw("Key '" + keys[i] + "' does not fit its step.");
            }else{
                return true;
            }
        }
    }, true);
};

RGBA.prototype.validateArray  = function(){return this.validateArrayByKeyScale.call(this, arguments[0], this.keys, this.scale);}

RGBA.prototype.validateRGBArray = function(){return this.validateArrayByKeyScale.call(this, arguments[0], this.keys, this.scale , true);};

RGBA.prototype.toRGBArray = function(){return [this.r, this.g, this.b];};

RGBA.prototype.toArray = function(){return this.toRGBArray().concat(this.a);};

RGBA.prototype.toRGBRatioArray = function(){
    return this.toRatioArray().slice(0, 3);
};

RGBA.prototype.arrayToRatioArray = function(arr, keys, scale){
    var keys = keys || this.keys, scale = scale || this.scale;
    try{this.validateArrayByKeyScale(arr, keys, scale, true);}
    catch(e){
        try{this.validateArrayByKeyScale(arr, keys, scale);}
        catch(e){throw("Input is not valid");}
    }
    return arr.map(function(v, i){return (v - scale[keys[i]].min) / (scale[keys[i]].max - scale[keys[i]].min)});
};

RGBA.prototype.toRatioArray = function(){
    return this.arrayToRatioArray(this.toArray(), this.keys, this.scale);
};

RGBA.prototype.toHex = function(){
    return "#" + this.toArray().slice(0,3).map(function(i){return ("0" + i.toString(16)).substr(-2).toUpperCase();}).join("");
}

RGBA.prototype.toString = function(){return "rgba(" + this.toArray().slice(0, 3).concat(this.toRatioArray()[3]).join(", ") + ")";};

RGBA.prototype.toRGBString = function(){return "rgb(" + this.toRGBArray().join(", ") + ")";};

RGBA.prototype.toCSS = RGBA.prototype.toString;

RGBA.prototype.toRGBCSS = RGBA.prototype.toRGBString;

RGBA.prototype.ratioArrayToColor = function(arr, keys, scale){
    if(Array.isArray(arr) && arr.length >= keys.length - 1 && arr.reduce(function(r, v, i){return r && typeof(v) == "number" && v >= 0 && v <= 1}, true)){
        return arr.map(function(v, i){
            var tmp = v * (scale[keys[i]].max - scale[keys[i]].min);
            return scale[keys[i]].min + (scale[keys[i]].step? Math.round(tmp / scale[keys[i]].step) * scale[keys[i]].step + scale[keys[i]].min : tmp) ;
        })
    }else{
        console.log(arguments);
        throw( "Input is not valid.");
    }
}

RGBA.prototype.toHSVArray = function(){
    var rgba = this.toRatioArray(), rgb = rgba.slice(0,3), a = rgba[3],
    max = Math.max.apply(null, rgb), min = Math.min.apply(null, rgb),
    c = max - min, h = 0, s = max == 0 ? 0 : c / max, v = max,
    keys = ["h", "s", "v", "a"],
    scale = {h: {min: 0, max: 360, step: 1},
             s: {min: 0, max: 100, step: 1},
             v: {min: 0, max: 100, step: 1},
             a: {min: 0, max: 1, step: 0}};
    if(c != 0){
        switch(rgb.indexOf(max)){
        case 0:
            h = (rgb[1] - rgb[2])/c + (rgb[1] > rgb[2]? 0 : 6);
        break;
        case 1:
            h = (rgb[2] - rgb[0])/c + 2;
        break;
        case 2:
            h = (rgb[0] - rgb[1])/c + 4;
        break;
        }
        h /= 6;
    }
    return this.ratioArrayToColor([h, s, v, a], keys, scale);
}

RGBA.prototype.toCMYKArray = function(alpha){
    var rgb = this.toRGBRatioArray(),
    l = Math.max.apply(null, rgb), k = 1 - l, c = (l - rgb[0]) / l, m = (l - rgb[1]) / l, y = (l - rgb[2]) / l,
    keys = ["c", "m", "y", "k", "a"],
    scale = {c: {min: 0, max: 100, step: 1},
             m: {min: 0, max: 100, step: 1},
             y: {min: 0, max: 100, step: 1},
             k: {min: 0, max: 100, step: 1},
             a: {min: 0, max: 1, step: 0}};
    return this.ratioArrayToColor([c, m, y, k, this.a].slice(0, alpha? 5 : 4), keys, scale);
}

RGBA.prototype.parseHSVArray = function(arr, alpha){
    var keys = ["h", "s", "v", "a"],
    scale = {h: {min: 0, max: 360, step: 1},
             s: {min: 0, max: 100, step: 1},
             v: {min: 0, max: 100, step: 1},
             a: {min: 0, max: 1, step: 0}};
    try{this.validateArrayByKeyScale(arr, keys, scale, true);}
    catch(e){
        try{this.validateArrayByKeyScale(arr, keys, scale);}
        catch(e){throw("Input is not valid.")}
    }
    var hsv = this.arrayToRatioArray(arr, keys, scale, true), h = hsv[0]*6, s = hsv[1], v = hsv[2], r, g, b, a = alpha? hsv[3] : null;
    switch(Math.floor(h)){
    case 0:
        r = v;
        g = (1+(h-1)*s)*v;
        b = (1-s)*v;
    break;
    case 1:
        r = (1+(1-h)*s)*v;
        g = v;
        b = (1-s)*v;
    break;
    case 2:
        r = (1-s)*v;
        g = v;
        b = (1+(h-3)*s)*v;
    break;
    case 3:
        r = (1-s)*v;
        g = (1+(3-h)*s)*v;
        b = v;
    break;
    case 4:
        r = (1+(h-5)*s)*v;
        g = (1-s)*v;
        b = v;
    break;
    case 5:
        r = v;
        g = (1-s)*v;
        b = (1+(5-h)*s)*v;
    break;
    case 6:
        r = v;
        g = (1+(h-7)*s)*v;
        b = (1-s)*v;
    break;
    }
    return this.ratioArrayToColor([r, g, b, a].slice(0, alpha? 4 : 3), this.keys, this.scale);
}

RGBA.prototype.parseCMYKArray = function(arr, alpha){
    var keys = ["c", "m", "y", "k", "a"],
    scale = {c: {min: 0, max: 100, step: 1},
             m: {min: 0, max: 100, step: 1},
             y: {min: 0, max: 100, step: 1},
             k: {min: 0, max: 100, step: 1},
             a: {min: 0, max: 1, step: 0}};
    try{this.validateArrayByKeyScale(arr, keys, scale, true);}
    catch(e){
        try{this.validateArrayByKeyScale(arr, keys, scale);}
        catch(e){throw("Input is not valid.")}
    }
    var cmyk = this.arrayToRatioArray(arr, keys, scale), r = (1 - cmyk[0]) * (1 - cmyk[3]), g = (1 - cmyk[1]) * (1 - cmyk[3]), b = (1 - cmyk[2]) * (1 - cmyk[3]), a = cmyk[4];
    return this.ratioArrayToColor([r, g, b, a].slice(0, alpha? 4 : 3), this.keys, this.scale);
}


return RGBA;
})();
