(function (scope){
  return scope.inputHeightAutoExpand = function(dom){

    var oldStyle = getComputedStyle(dom);

    var hidden = document.createElement("div");
    
    Array.from( oldStyle, prop=>hidden.style.setProperty(prop,oldStyle.getPropertyValue(prop),oldStyle.getPropertyPriority(prop)) )

    hidden.style.opacity = 0;
    hidden.style.cursor = "";
    hidden.style.pointerEvent = "none";
    hidden.style.position = "absolute";
    hidden.style.height = "unset";
    hidden.style.maxHeight = "";
    hidden.style.minHeight = "";
    hidden.style.userSelect = "none";
    hidden.style.overflow = 'scroll';

    hidden.textContent = dom.value

    dom.parentNode.insertBefore(hidden, dom);

    dom.style.height = hidden.offsetHeight + "px";

    dom.parentNode.removeChild(hidden);

  };
})(this);