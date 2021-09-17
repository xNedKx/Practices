/*
  ImgList & ImgBox
  
  ImgList - A simple gallery like component.
  ImgBox - A responsive container that scales image into itself while keeping the image's aspect ratio.
  
  Author: xNedKx
  first edit: 2021/09/17
  
  This element requires its root element's width/height has been set. Use img-box::part(box) selector to config ImgBox's root and img-list::part(list) seletor to config ImgList.
  
  Set the src/srcset attribute on ImgBox then append it to load the image.
  Set src with a comma separated srcs and append the ImgList to auto load the list, or use append method to add one by one.
  
  <img-list>.append(src)
  <img-list>.deltet(src)
  <img-list>.next()
  <img-list>.previous()
  
  The thumb list currently is out against the root element's bottom border.
  
*/

;(function(){
'use strict'

class ImgBox extends HTMLElement {
  static parseTpl(tpl){
    let d = (new DOMParser()).parseFromString(tpl,'text/html')
    let f = document.createDocumentFragment()
    for(let c of d.head.childNodes){
      f.appendChild(c)
    }
    for(let c of d.body.childNodes){
      f.appendChild(c)
    }
    return f
  }
  static tpl_main = `
<style>
.box {
  position: relative;
  min-width: 0;
  min-height: 0;
}
.block {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
}
.block::before {
  content: "";
  display: block;
  width: 100%;
  padding-top: 100%;
  pointer-events: none;
}
.image {
  object-fit: scale-down;
  max-width: 100%;
  max-height: 100%;
}
.image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.block, .wrap {
  display: flex;
  align-items: center;
}
</style>
<div class="box" part='box'>
  <div class="block" part='block'>
    <div class="wrap" part='wrap'>
      <img class='image' part='image'>
    </div>
  </div>
</div>
`
  constructor(){super()
    this.attachShadow({mode: 'open'}).appendChild(ImgBox.parseTpl(ImgBox.tpl_main))
  }
  connectedCallback(){
    const img = this.shadowRoot.querySelector('.image')
    img.src = this.getAttribute('src') ?? img.src
    img.srcset = this.getAttribute('srcset') ?? img.srcset
  }
}
customElements.define('img-box',ImgBox)

class ImgList extends HTMLElement {
  static parseTpl(tpl){
    let d = (new DOMParser()).parseFromString(tpl,'text/html')
    let f = document.createDocumentFragment()
    for(let c of d.head.childNodes){
      f.appendChild(c)
    }
    for(let c of d.body.childNodes){
      f.appendChild(c)
    }
    return f
  }
  static tpl_main = `
<style>
.main {
  position: relative;
}
.list, .control {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.list img-box::part(box) {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  opacity: 0;
  transition: opacity 100ms ease-in-out;
}
.list img-box.show::part(box) {
  opacity: 1;
}
.thumbs {
  position: absolute;
  width: 100%;
  height: 10%;
  bottom: calc(-10% - 0.5em);
  overflow: auto hidden;
  background: #fff;
  padding: 0.1em;
}
.thumbs img-box::part(box) {
  height: 100%;
  aspect-ratio: 1 / 1;
  margin: 0 0.1em;
  display: inline-block;
  cursor: pointer;
  user-select: none;
}
.thumbs img-box:hover {
  filter: contrast(1.25) brightness(1.25);
}
.thumbs img-box.selected::part(box) {
  outline: solid 1px #000;
}
.btn {
  position: absolute;
  width: 10%;
  height: 100%;
  cursor: pointer;
}
.btn::before {
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
  color: #0000;
  background-color: #fff0;
}
.btn:hover::before {
  font-weight: bold;
  color: #3339;
  background-color: #fff9;
}
.prev {
  left: 0;
}
.next {
  right: 0;
}
.prev::before {
  content: '<';
}
.next::before {
  content: '>';
}
</style>
<div class='main' part='list'>
  <div class='list'></div>
  <div class='control'>
    <div class='thumbs'></div>
    <div class='prev btn'></div>
    <div class='next btn'></div>
  </div>
</div>
`
  constructor(){super()
    this.attachShadow({mode: 'open'}).appendChild(ImgList.parseTpl(ImgList.tpl_main))
    const pb = this.shadowRoot.querySelector('.prev.btn')
    const nb = this.shadowRoot.querySelector('.next.btn')
    pb.addEventListener('click',(e)=>{
      this.previous()
      e.preventDefault()
    })
    nb.addEventListener('click',(e)=>{
      this.next()
      e.preventDefault()
    })
  }
  connectedCallback(){
    let srcs = this.getAttribute('src')
    srcs.split(/\s*,\s*/).forEach(s=>this.append(s))
  }
  append(src){
    let ib = document.createElement('img-box')
    let ibt = document.createElement('img-box')
    try{
      ib.setAttribute('src',new URL(src,location).href)
      ibt.setAttribute('src',new URL(src,location).href)
      ib.ibsrc = src
      ib.thumb = ibt
    }catch(er){
      return null
    }
    const list = this.shadowRoot.querySelector('.list')
    list.appendChild(ib)
    const thumbs = this.shadowRoot.querySelector('.thumbs')
    thumbs.appendChild(ibt)
    ibt.onclick = (e)=>{
      let d =list.querySelector('.show')
      d.classList.remove('show')
      d.thumb.classList.remove('selected')
      ib.classList.add('show')
      ibt.classList.add('selected')
    }
    if(list.children.length == 1){
      ib.classList.add('show')
      ibt.classList.add('selected')
    }
    return ib
  }
  delete(src){
    const list = this.shadowRoot.querySelector('.list')
    list.children.forEach(d=>{
      if(d.ibsrc == src){
        if(d.classList.contains('show')){
          d.classList.remove('show')
          d.thumb.classList.remove('selected')
          if(list.children.length > 1){
            if(d == list.firstChild){
              list.lastChild.classList.add('show')
              list.lastChild.add('selected')
            }else{
              d.previousSibling.classList.add('show')
              d.thumb.classList.add('selected')
            }
          }
        }
        d.remove()
        d.thumb.remove()
      }
    })
  }
  next(){
    const list = this.shadowRoot.querySelector('.list')
    if(list.children.length){
      let d = list.querySelector('.show')
      if(d){
        d.classList.remove('show')
        d.thumb.classList.remove('selected')
        if(d == list.lastChild){
          list.firstChild.classList.add('show')
          list.firstChild.thumb.classList.add('selected')
        }else{
          d.nextSibling.classList.add('show')
          d.nextSibling.thumb.classList.add('selected')
        }
      }
    }
  }
  previous(){
    const list = this.shadowRoot.querySelector('.list')
    if(list.children.length){
      let d = list.querySelector('.show')
      if(d){
        d.classList.remove('show')
        d.thumb.classList.remove('selected')
        if(d == list.firstChild){
          list.lastChild.classList.add('show')
          list.lastChild.thumb.classList.add('selected')
        }else{
          d.previousSibling.classList.add('show')
          d.previousSibling.thumb.classList.add('selected')
        }
      }
    }
  }
}
customElements.define('img-list',ImgList)

})();