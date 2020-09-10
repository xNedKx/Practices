(function (scope){
  return scope.inputHeightAutoExpand = function(dom){

    var oldStyle = getComputedStyle(dom);

    var hidden = document.createElement("div");
    
    Array.from( oldStyle, prop=>hidden.style.setProperty(prop,oldStyle.getPropertyValue(prop),oldStyle.getPropertyPriority(prop)) )

    hidden.style.opacity = 0;
    hidden.style.cursor = "";
    hidden.style.pointerEvent = "none";
    hidden.style.position = "absolute";
    hidden.style.height = "auto";
    hidden.style.maxHeight = "";
    hidden.style.minHeight = "";

    hidden.innerHTML = dom.value.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
      return '&#' + i.charCodeAt(0) + ';';
    }).replace(/\n/g,"<br>") + "<br>";

    dom.parentNode.insertBefore(hidden, dom);

    dom.style.height = hidden.offsetHeight + "px";

    dom.parentNode.removeChild(hidden);

  };
})(this);