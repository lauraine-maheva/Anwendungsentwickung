'use strict';

function setattr(o, a){//permet de declare et attribuer les Werten 
    for(let i in a){
        o.setAttribute(i, a[i]);
    }
}
function SVG(c, f, a){
    let n =document.createElementNS('http://www.w3.org/2000/svg' , f);
    setattr(n, a);
    return c.appendChild(n);
}