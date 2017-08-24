function anchorScroller(el, duration) {
if (this.criticalSection) {
return false;
}
 
if ((typeof el != 'object') || (typeof el.href != 'string'))
return true;
 
var address = el.href.split('#');
if (address.length < 2)
return true;
 
address = address[address.length-1];
el = 0;
 
for (var i=0; i<document.anchors.length; i++) {
if (document.anchors[i].name == address) {
el = document.anchors[i];
break;
}
}
if (el === 0)
return true;
 
this.stopX = 0;
this.stopY = 0;
do {
this.stopX += el.offsetLeft;
this.stopY += el.offsetTop;
} while (el = el.offsetParent);
 
this.startX = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
this.startY = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
 
this. stopX = this.stopX - this.startX;
this.stopY = this.stopY - this.startY;
 
if ( (this.stopX == 0) && (this.stopY == 0) )
return false;
 
this.criticalSection = true;
if (typeof duration == 'undefined')
this.duration = 500;
else
this.duration = duration;
 
var date = new Date();
this.start = date.getTime();
this.timer = setInterval(function () {
var date = new Date();
var X = (date.getTime() - this.start) / this.duration;
if (X > 1)
X = 1;
var Y = ((-Math.cos(X*Math.PI)/2) + 0.5);
 
cX = Math.round(this.startX + this.stopX*Y);
cY = Math.round(this.startY + this.stopY*Y);
 
document.documentElement.scrollLeft = cX;
document.documentElement.scrollTop = cY;
document.body.scrollLeft = cX;
document.body.scrollTop = cY;
 
if (X == 1) {
clearInterval( this.timer);
this.criticalSection = false;
}
}, 10);
return false;
}