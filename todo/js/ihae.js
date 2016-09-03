(function (scope){
  return scope.inputHeightAutoExpand = function(dom){

    var oldStyle = getComputedStyle(dom);

    var hidden = document.createElement("div");

    hidden.style.opacity = 0;
    hidden.style.pointerEvent = "none";
    hidden.style.position = "absolute";
    hidden.style.overflow = "auto";
    hidden.style.height = "auto";
    hidden.style.width = oldStyle.width;
    hidden.style.padding = oldStyle.padding;
    hidden.style.paddingLeft = oldStyle.paddingLeft;
    hidden.style.paddingRight = oldStyle.paddingRight;
    hidden.style.paddingTop = oldStyle.paddingTop;
    hidden.style.paddingBottom = oldStyle.paddingBottom;
    hidden.style.border = oldStyle.border;
    hidden.style.borderWidth = oldStyle.borderWidth;
    hidden.style.borderStyle = oldStyle.borderStyle;
    hidden.style.borderLeft = oldStyle.borderLeft;
    hidden.style.borderRight = oldStyle.borderRight;
    hidden.style.borderTop = oldStyle.borderTop;
    hidden.style.borderBottom = oldStyle.borderBottom;
    hidden.style.boxSizing = oldStyle.boxSizing;
    hidden.style.fontFamily = oldStyle.fontFamily;
    hidden.style.fontSize = oldStyle.fontSize;
    hidden.style.fontWeight = oldStyle.fontWeight;
    hidden.style.lineHeight = oldStyle.lineHeight;
    hidden.style.whiteSpace = oldStyle.whiteSpace;
    hidden.style.wordWrap = oldStyle.wordWrap;

    hidden.innerHTML = dom.value.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
      return '&#' + i.charCodeAt(0) + ';';
    }).replace(/\n/g,"<br>") + "<br>";

    dom.parentNode.insertBefore(hidden, dom);

    dom.style.height = hidden.offsetHeight + "px";

    dom.parentNode.removeChild(hidden);

  };
})(this);