importScripts("rgba.js");
var color = new RGBA(0,0,0,0), hsva;
function hToLeft(e){
    for(var i = 0; i < e.data.h; i++){
        for(var j = 0; j < e.data.w; j++){
            var pos = (i * e.data.w + j) * 4;
            color.setByArray([e.data.data.data[pos], e.data.data.data[pos+1], e.data.data.data[pos+2], e.data.data.data[pos+3]]);
            hsva = color.toHSVArray();
            switch(Math.floor((i / e.data.h)*6)){
            case 0:
                hsva[0] = 0;
            break;
            case 1:
                hsva[0] = 30;
            break;
            case 2:
                hsva[0] = 60;
            break;
            case 3:
                hsva[0] = 120;
            break;
            case 4:
                hsva[0] = 180;
            break;
            case 5:
                hsva[0] = 270;
            break;
            }
            hsva[1] = Math.round(hsva[1] * 0.7) + 30;
            hsva[2] = Math.round(hsva[2] * 0.8) + 20;
            color.setByArray(color.parseHSVArray(hsva, true));
            postMessage({color: color.toString(), x: j, y: i});
        }
    }
}
addEventListener("message", hToLeft, false);