(()=>{"use strict";var e={currentValue:"0",firstValue:null,secondValue:null,operator:null,lastOperation:null};function r(){var r=document.getElementById("currentValue"),t=document.getElementById("lastOperation");r.value=e.currentValue,t.value=e.lastOperation,r.scrollLeft=r.scrollWidth}function t(){var t=e.secondValue||0;e.currentValue.startsWith("-")&&"-"===e.operator?e.firstValue="-"+e.currentValue.split(e.operator)[1]:e.firstValue=e.currentValue.split(e.operator)[0];var u=e.firstValue;if(t.includes("%")){for(;t.includes("%");)e.secondValue=parseFloat(e.secondValue)/100,t=t.slice(0,-1);u.includes("%")||(e.secondValue=e.secondValue*e.firstValue)}for(;u.includes("%");)e.firstValue=parseFloat(e.firstValue)/100,u=u.slice(0,-1);if(e.firstValue=parseFloat(e.firstValue),e.secondValue=parseFloat(e.secondValue),e.lastOperation=e.currentValue,"+"===e.operator)e.currentValue=e.firstValue+e.secondValue;else if("-"===e.operator)e.currentValue=e.firstValue-e.secondValue;else if("*"===e.operator)e.currentValue=e.firstValue*e.secondValue;else if("/"===e.operator)e.currentValue=e.firstValue/e.secondValue,0===e.secondValue&&(e.currentValue="Divide by zero");else if("%"===e.operator){var l=e.currentValue.split("%");l[1]?e.currentValue=l[0]%l[1]:e.currentValue=l[0]/100}e.currentValue.toString().includes(".")&&e.currentValue.toString().split(".")[1].length>9&&(e.currentValue=parseFloat(Number(e.currentValue).toFixed(9))),e.firstValue=e.currentValue,e.secondValue=null,e.operator=null,r()}var u,l=document.getElementById("themeImage");u=localStorage.getItem("theme")||"light",document.documentElement.setAttribute("data-theme",u),function(u){document.querySelectorAll(".btn").forEach((function(l){l.addEventListener("click",(function(l){var a,n,o=l.currentTarget.value;isNaN(o)&&"."!==o&&"%"!==o?"clear"===o?(e.currentValue="0",e.firstValue=null,e.secondValue=null,e.operator=null,e.lastOperation=null,r()):"negate"===o?"0"!==e.currentValue&&"Divide by zero"!==e.currentValue&&(e.operator||e.secondValue?e.operator&&e.secondValue&&(t(),e.currentValue=-e.currentValue):e.currentValue=-e.currentValue,r()):["/","*","-","+"].includes(o)?(a=o,e.operator&&e.secondValue?t():e.operator&&!e.secondValue&&(e.operator=a,e.currentValue=e.currentValue.slice(0,-1)),e.operator=a,e.firstValue=e.currentValue,"Divide by zero"!==e.currentValue&&(e.currentValue+=e.operator),r()):"equal"===o&&e.currentValue&&e.operator&&e.secondValue?t():e.operator||e.secondValue||!e.currentValue.includes("%")?"theme"===o&&function(e){var r=document.documentElement.getAttribute("data-theme"),t="light"===r?"dark":"light";document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t),e.src="light"===r?"https://i.imgur.com/snp1idS.png":"https://i.imgur.com/JZfjpM8.png"}(u):(e.operator="%",t()):("."===(n=o)?e.operator||e.currentValue.includes(".")?e.operator&&e.secondValue&&!e.secondValue.includes(".")&&(e.currentValue+="."):e.currentValue+=".":"%"===n?(!e.operator||e.secondValue.length>0)&&(e.currentValue+="%"):"0"===e.secondValue?e.currentValue=e.currentValue.slice(0,-1)+n:e.currentValue="0"===e.currentValue||"Divide by zero"===e.currentValue?n:e.currentValue+n,e.operator&&(e.secondValue=e.currentValue.split(e.firstValue+e.operator).join("")),(e.operator&&e.secondValue>94906264||!e.operator&&e.currentValue>94906264)&&(e.currentValue=e.currentValue.slice(0,-1),e.secondValue&&(e.secondValue=e.secondValue.slice(0,-1))),r())}))}))}(l)})();