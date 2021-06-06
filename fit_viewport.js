/*
  Module: Fit-Viewport
  
  - To find a way to resolve the viewport height problem on mobile browsers, where 100vh is too large when url bar shows and locks the height when the keyboard popup.
  
  Author: Yz Chen
  Version: 2021-05-08.a
  
  Description: 
    Force and trace the width and height of the document(the html tag) to fit the viewport after the document finishes loading.
    Then you can use % in styles in children nodes, and access the values via document.documentElement.offsetHeight and document.documentElement.offsetWidth. (not include scroll bars width/height)
    It could be toggled by the classname 'fit_viewport' on the html tag.
    To lock the height and Width, add 'lock_fit_viewport' classname on the html tag.
*/
;(function(){
'use strict'
window.addEventListener('DOMContentLoaded',function(){
let viewportHeight, viewportWidth
function getViewportDimension(){
  viewportHeight = window.innerHeight
  viewportWidth = window.innerWidth
}
getViewportDimension()

let styleObj = document.createElement('style')
styleObj.setAttribute('module','fit_viewport')
document.documentElement.insertBefore(styleObj,document.body)
let rule_index = NaN
function refreshViewportDimensionCSS(){
  if(!isNaN(rule_index)){
    styleObj.sheet.deleteRule(rule_index)
  }
  rule_index = styleObj.sheet.insertRule(`html.fit_viewport {top: 0; left: 0; margin: 0; padding: 0; box-sizing: border-box; max-height: ${viewportHeight}px; max-width: ${viewportWidth}px; overflow: auto; height: 100%;}`)
}
refreshViewportDimensionCSS()

function onresize(){
  if(!document.documentElement.classList.contains('lock_fit_viewport')){
    getViewportDimension()
    refreshViewportDimensionCSS()
  }
}

window.addEventListener('resize',onresize)
document.documentElement.classList.add('fit_viewport')
})
})();