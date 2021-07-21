let PatternLock=(function(){function noop(){}function toArray(list){return list instanceof NodeList||list instanceof HTMLCollection?Array.prototype.slice.call(list):[list]}function assign(target){for(var _len=arguments.length,rest=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)rest[_key-1]=arguments[_key];rest.forEach(function(obj){Object.keys(obj).forEach(function(key){target[key]=obj[key]})});return target}function css(element,properties){if('string'==typeof properties)return window.getComputedStyle(element)[properties];Object.keys(properties).forEach(function(key){var value=properties[key];element.style[key]=value})}function addClass(el,className){var classNameAry=className.split(' ');classNameAry.length>1?classNameAry.forEach(function(classItem){return addClass(el,classItem)}):el.classList?el.classList.add(className):el.className+=' '+className}function removeClass(el,className){var classNameAry=className.split(' ');classNameAry.length>1?classNameAry.forEach(function(classItem){return removeClass(el,classItem)}):el.classList?el.classList.remove(className):el.className=el.className.replace(new RegExp('(^|\\b)'+className.split(' ').join('|')+'(\\b|$)','gi'),' ')}function remove(nodes){toArray(nodes).forEach(function(el){el.parentNode.removeChild(el)})}function createDom(str){var div=document.createElement('div');div.innerHTML=str;return div.children[0]}function getLengthAngle(x1,x2,y1,y2){var xDiff=x2-x1;var yDiff=y2-y1;return{length:Math.ceil(Math.sqrt(xDiff*xDiff+yDiff*yDiff)),angle:Math.round(180*Math.atan2(yDiff,xDiff)/Math.PI)}}var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&'function'==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;'value'in descriptor&&(descriptor.writable=true);Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){protoProps&&defineProperties(Constructor.prototype,protoProps);staticProps&&defineProperties(Constructor,staticProps);return Constructor}}();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError('Cannot call a class as a function')}var privateMap=new WeakMap;var PatternLockInternal=function(){function PatternLockInternal(){_classCallCheck(this,PatternLockInternal);this.holder=null;this.option=null;this.mapperFunc=noop;this.wrapLeft=0;this.wrapTop=0;this.disabled=false;this.patternAry=[];this.lastPosObj=[];this.rightPattern=null;this.onSuccess=noop;this.onError=noop;this.pattCircle=null;this.lineX1=0;this.lineY1=0;this.line=null;this.lastPosObj=null}_createClass(PatternLockInternal,[{key:'getIdxFromPoint',value:function getIdxFromPoint(x,y){var option=this.option;var matrix=option.matrix,margin=option.margin;var xi=x-this.wrapLeft;var yi=y-this.wrapTop;var plotLn=2*option.radius+2*margin;var qsntX=Math.ceil(xi/plotLn);var qsntY=Math.ceil(yi/plotLn);var remX=xi%plotLn;var remY=yi%plotLn;var idx=null;qsntX<=matrix[1]&&qsntY<=matrix[0]&&remX>2*margin&&remY>2*margin&&(idx=(qsntY-1)*matrix[1]+qsntX);return{idx:idx,i:qsntX,j:qsntY,x:xi,y:yi}}},{key:'markPoint',value:function markPoint(elm,pattId){addClass(elm,'hovered');this.patternAry.push(pattId);this.lastElm=elm}},{key:'addLine',value:function addLine(posObj){var patternAry=this.patternAry,option=this.option;var lineOnMove=option.lineOnMove,margin=option.margin,radius=option.radius;var newX=(posObj.i-1)*(2*margin+2*radius)+2*margin+radius;var newY=(posObj.j-1)*(2*margin+2*radius)+2*margin+radius;if(patternAry.length>1){var _getLengthAngle=getLengthAngle(this.lineX1,newX,this.lineY1,newY),length=_getLengthAngle.length,angle=_getLengthAngle.angle;css(this.line,{width:length+10+'px',transform:'rotate('+angle+'deg)'});lineOnMove||css(this.line,{display:'block'})}var line=createDom('<div class="patt-lines" style="top:'+(newY-5)+'px; left: '+(newX-5)+'px;"></div>');this.line=line;this.lineX1=newX;this.lineY1=newY;this.holder.appendChild(line);lineOnMove||css(this.line,{display:'none'})}},{key:'addDirectionClass',value:function addDirectionClass(curPos){var point=this.lastElm,line=this.line,lastPos=this.lastPosObj;var direction=[];curPos.j-lastPos.j>0?direction.push('s'):curPos.j-lastPos.j<0&&direction.push('n');curPos.i-lastPos.i>0?direction.push('e'):curPos.i-lastPos.i<0&&direction.push('w');if(direction=direction.join('-')){var className=direction+' dir';addClass(point,className);addClass(line,className)}}}]);return PatternLockInternal}();var PatternLock=function(){function PatternLock(selector){var option=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,PatternLock);_initialiseProps.call(this);var iObj=new PatternLockInternal;var holder=document.querySelector(selector);if(holder&&0!==holder.length){var defaultsFixes={onDraw:noop};var matrix=option.matrix;matrix&&matrix[0]*matrix[1]>9&&(defaultsFixes.delimiter=',');iObj.option=assign({},PatternLock.defaults,defaultsFixes,option);var mapper=iObj.option.mapper;'object'===('undefined'==typeof mapper?'undefined':_typeof(mapper))?iObj.mapperFunc=function(idx){return mapper[idx]}:iObj.mapperFunc='function'==typeof mapper?mapper:noop;iObj.option.mapper=null;iObj.holder=holder;privateMap.set(this,iObj);this._render();addClass(holder,'patt-holder');'static'===css(holder,'position')&&css(holder,{position:'relative'});holder.addEventListener('touchstart',this._onStart);holder.addEventListener('mousedown',this._onStart)}}_createClass(PatternLock,[{key:'getPattern',value:function getPattern(){var _privateMap$get=privateMap.get(this),patternAry=_privateMap$get.patternAry,option=_privateMap$get.option;return(patternAry||[]).join(option.delimiter)}},{key:'setPattern',value:function setPattern(pattern){var iObj=privateMap.get(this);var option=iObj.option;var matrix=option.matrix,margin=option.margin,radius=option.radius,enableSetPattern=option.enableSetPattern,delimiter=option.delimiter;if(enableSetPattern){var patternAry='string'==typeof pattern?pattern.split(delimiter):pattern;this.reset();iObj.wrapLeft=0;iObj.wrapTop=0;for(var i=0;i<patternAry.length;i+=1){var idx=patternAry[i]-1;var clientX=idx%matrix[1]*(2*margin+2*radius)+2*margin+radius;var clientY=Math.floor(idx/matrix[1])*(2*margin+2*radius)+2*margin+radius;this._onMove.call(null,{clientX:clientX,clientY:clientY,preventDefault:noop},this)}}}},{key:'enable',value:function enable(){privateMap.get(this).disabled=false}},{key:'disable',value:function disable(){privateMap.get(this).disabled=true}},{key:'reset',value:function reset(){var iObj=privateMap.get(this);toArray(iObj.pattCircle).forEach(function(el){return removeClass(el,'hovered dir s n w e s-w s-e n-w n-e')});remove(iObj.holder.querySelectorAll('.patt-lines'));iObj.patternAry=[];iObj.lastPosObj=null;removeClass(iObj.holder,'patt-error')}},{key:'error',value:function error(){addClass(privateMap.get(this).holder,'patt-error')}},{key:'checkForPattern',value:function checkForPattern(pattern,success,error){var iObj=privateMap.get(this);iObj.rightPattern=pattern;iObj.onSuccess=success||noop;iObj.onError=error||noop}},{key:'_render',value:function _render(){var iObj=privateMap.get(this);var option=iObj.option,holder=iObj.holder;var matrix=option.matrix,margin=option.margin,radius=option.radius;var html='<ul class="patt-wrap" style="padding: '+margin+'px">\n      '+Array.apply(void 0,_toConsumableArray({length:matrix[0]*matrix[1]})).map(this._renderCircle).join('')+'\n    </ul>';holder.innerHTML=html;css(holder,{width:matrix[1]*(2*radius+2*margin)+2*margin+'px',height:matrix[0]*(2*radius+2*margin)+2*margin+'px'});iObj.pattCircle=iObj.holder.querySelectorAll('.patt-circ')}},{key:'option',value:function option(key,val){var option=privateMap.get(this).option;if(void 0===val)return option[key];option[key]=val;'margin'!==key&&'matrix'!==key&&'radius'!==key||this._render();return this}}]);return PatternLock}();var _initialiseProps=function _initialiseProps(){var _this=this;this._onStart=function(e){e.preventDefault();var iObj=privateMap.get(_this);var holder=iObj.holder;if(!iObj.disabled){iObj.option.patternVisible||addClass(iObj.holder,'patt-hidden');_this.moveEvent='touchstart'===e.type?'touchmove':'mousemove';_this.endEvent='touchstart'===e.type?'touchend':'mouseup';holder.addEventListener(_this.moveEvent,_this._onMove);document.addEventListener(_this.endEvent,_this._onEnd);var offset=iObj.holder.querySelector('.patt-wrap').getBoundingClientRect();iObj.wrapTop=offset.top;iObj.wrapLeft=offset.left;_this.reset()}};this._onMove=function(e){e.preventDefault();var iObj=privateMap.get(_this);var option=iObj.option,patternAry=iObj.patternAry;var x=e.clientX||e.touches[0].clientX;var y=e.clientY||e.touches[0].clientY;var li=iObj.pattCircle;var posObj=iObj.getIdxFromPoint(x,y);var idx=posObj.idx;var pattId=iObj.mapperFunc(idx)||idx;if(patternAry.length>0){var _getLengthAngle2=getLengthAngle(iObj.lineX1,posObj.x,iObj.lineY1,posObj.y),length=_getLengthAngle2.length,angle=_getLengthAngle2.angle;css(iObj.line,{width:length+10+'px',transform:'rotate('+angle+'deg)'})}if(idx&&(option.allowRepeat&&patternAry[patternAry.length-1]!==pattId||-1===patternAry.indexOf(pattId))){var elm=li[idx-1];if(iObj.lastPosObj){var lastPosObj=iObj.lastPosObj;var xDelta=posObj.i-lastPosObj.i>0?1:-1;var yDelta=posObj.j-lastPosObj.j>0?1:-1;var ip=lastPosObj.i;var jp=lastPosObj.j;var iDiff=Math.abs(posObj.i-ip);var jDiff=Math.abs(posObj.j-jp);while(0===iDiff&&jDiff>1||0===jDiff&&iDiff>1||jDiff===iDiff&&jDiff>1){ip=iDiff?ip+xDelta:ip;jp=jDiff?jp+yDelta:jp;iDiff=Math.abs(posObj.i-ip);jDiff=Math.abs(posObj.j-jp);var nextIdx=(jp-1)*option.matrix[1]+ip;var nextPattId=iObj.mapperFunc(nextIdx)||nextIdx;if(option.allowRepeat||-1===patternAry.indexOf(nextPattId)){iObj.addDirectionClass({i:ip,j:jp});iObj.markPoint(li[nextPattId-1],nextPattId);iObj.addLine({i:ip,j:jp})}}}iObj.lastPosObj&&iObj.addDirectionClass(posObj);iObj.markPoint(elm,pattId);iObj.addLine(posObj);iObj.lastPosObj=posObj}};this._onEnd=function(e){e.preventDefault();var iObj=privateMap.get(_this);var option=iObj.option;var pattern=iObj.patternAry.join(option.delimiter);iObj.holder.removeEventListener(_this.moveEvent,_this._onMove);document.removeEventListener(_this.endEvent,_this._onEnd);removeClass(iObj.holder,'patt-hidden');if(pattern){remove(iObj.line);option.onDraw(pattern);if(iObj.rightPattern)if(pattern===iObj.rightPattern)iObj.onSuccess();else{iObj.onError();_this.error()}}};this._renderCircle=function(){var _privateMap$get$optio=privateMap.get(_this).option,margin=_privateMap$get$optio.margin,radius=_privateMap$get$optio.radius;return'<li \n      class="patt-circ"\n      style="margin: '+margin+'px; width: '+2*radius+'px; height: '+2*radius+'px; border-radius: '+radius+'px;"\n    >\n      <div class="patt-dots"></div>\n    </li>'}};PatternLock.defaults={matrix:[3,3],margin:20,radius:25,patternVisible:true,lineOnMove:true,delimiter:'',enableSetPattern:false,allowRepeat:false};return PatternLock})()

$('.card')[0].replaceWith($('#PatternLock')[0])
let _pattern = null

var lock = new PatternLock('#PatternLock',{
	matrix:[4,4],
	onDraw: (pattern) => {
		if (options.confirm && _pattern == null) {
			_pattern = pattern
			$.notify('Confirm pattern')
			return lock.reset()
		}
		if (!options.confirm) {
			_pattern = pattern
		}
		if (pattern != _pattern) {
			$.notify('Patterns do not match', 'error')
			_pattern = null
			return lock.reset()
		}
		UiX.Done({pattern: pattern})
	}
})

UiX.Ready(options)
