// ==UserScript==
// @name         Video Clip
// @namespace    https://xnedkx.github.io/
// @version      1
// @description  Copy the video frame to a canvas element. Select: ctrl + click; Clip: ctrl + D; Clip&Save: ctrl + alt + D; Download: ctrl + alt + S; Reset: ctrl + alt + Q;
// @author       xnedkx
// @include      http://*
// @include      https://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let seed = (Math.random()*16**8).toString(16).replace(/\.[0-9a-fA-F]*/,'').padStart(8,'0')
    let xid = `xdraw_${seed}`
    let xvid = (document.querySelector('video')||{id:null}).id

    let cache = []

    function draw( vid, shrink = 2 ){
        let c = document.getElementById(xid) || document.createElement('canvas')
        let t = c.getContext('2d')
        let v = document.getElementById(vid)

        if(!v){return}

        let w = v.videoWidth
        let h = v.videoHeight

        c.id = xid

        c.width = w
        c.height = h

        t.drawImage(v,0,0,w,h,0,0,w,h)
        c.t = Math.round(v.currentTime*100)/100


        c.style.position = 'fixed'
        c.style.zIndex = '99999'
        c.style.top = 0
        c.style.right = 0
        c.style.height = `${h/shrink}px`
        c.style.width = `${w/shrink}px`
        c.style.borderBottom = 'none'

        c.title = 'Click to close; Right click for the menu.'

        c.addEventListener('click',(e)=>{c.remove()})

        document.body.appendChild(c)

    }
    function save(){
        let c = document.getElementById(xid)
        c.title = 'Click to close; Right click for the menu. [image is cached]'
        c.style.borderBottom = '1em solid #000'
        cache.push({t:c.t,s:c.toDataURL()})
    }
    function download(){
        cache = cache.filter(s=>s)
        for(let i in cache){
            let a = document.createElement('a')
            a.href = cache[i].s
            a.download = `clip_${1+(+i)}[${cache[i].t}].png`
            a.click()
        }
    }
    function clear(){
        cache = []
    }

    // key binds
    document.body.addEventListener('keydown',(e)=>{
        if(e.code == "KeyD" && e.ctrlKey){ // ctrl + D = draw
            e.preventDefault()
            draw(xvid)
            if(e.altKey){ // ctrl + alt + D = draw & save
                save()
                console.log('image is cached')
            }
        }else if(e.code == "KeyS" && e.ctrlKey && e.altKey){ // ctrl + alt + S = download
            e.preventDefault()
            download()
        }else if(e.code == "KeyQ" && e.ctrlKey && e.altKey){ // ctrl + alt + Q = clear
            e.preventDefault()
            clear()
            console.log('cached images have been cleared')
        }
    })
    // element selection
    document.body.addEventListener('keydown',(e)=>{
        if(!document.body.classList.contains(`${xid}_detect`) && e.key == 'Control'){
            document.body.classList.add(`${xid}_detect`)
            //console.log('detect on')
        }
    })
    document.body.addEventListener('keyup',(e)=>{
        if(document.body.classList.contains(`${xid}_detect`) && e.key == 'Control'){
            document.body.classList.remove(`${xid}_detect`)
            //console.log('detect off')
        }
    })
    document.body.addEventListener('click',(e)=>{ // ctrl + click = select video element
        if(document.body.classList.contains(`${xid}_detect`)){
            e.preventDefault()
            let elms = document.elementsFromPoint(e.screenX,e.screenY)
            //console.log(e.screenX,e.screenY,elms)
            for(let i = 0; i < elms.length; i++){
                if(elms[i].tagName == "VIDEO"){
                    if(elms[i].id){
                        xvid = elms[i].id
                        console.log(`target video element id: ${xvid}`)
                        console.log(elms[i])
                        return
                    }else{
                        elms[i].id = `xvid_${seed}`
                        xvid = `xvid_${seed}`
                        console.log(`target video element has no id and set to 'xvid_${seed}'`)
                        console.log(elms[i])
                        return
                    }
                }
            }
        }
    })

    console.log('** <Video Clip> **\n[ctrl + click] to select a specific video element\n[ctrl + D] to get a clip\n[ctrl + alt + D] to get a clip and save it to the cache\n[ctrl + alt + S] to download images in the cache\n[ctrl + alt + Q] to clear the image cache\n\ndetecting video element...')

    if(!xvid){
        let ti, tl = 600
        ti = setInterval(()=>{
            if(!xvid){
                xvid = (document.querySelector('video')||{id:null}).id
            }
            if(xvid || tl <= 0){
                console.log(`target video element id: ${xvid}`)
                clearInterval(ti)
            }
            tl--
        }, 100)
    }else{
        console.log(`target video element id: ${xvid}`)
    }

})();