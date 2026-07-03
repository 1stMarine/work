document.addEventListener('DOMContentLoaded', function(event) {
	//A.target for aria-roledescription
	(function(){
		var elements = document.querySelectorAll("a");
		for(var i = 0; i < elements.length; i++){
			var element = elements[i];
			var roledescription = element.hasAttribute("aria-roledescription");
			var href = element.hasAttribute("href");
			if(!roledescription && href){
				var img = element.querySelector("img");
				if (img) {
					roledescription = "图片链接";
				} else {
					roledescription = "链接";
				}
				if (element.target) {
					roledescription += ",在";
					switch (element.target) {
					case "_blank":
						roledescription += "新";
						break;
					case "_parent":
						roledescription += "父";
						break;
					case "_top":
						roledescription += "顶层";
						break;
					default:
						roledescription += "指定";
						break;
					}
					roledescription += "窗口中打开";
				}
				element.setAttribute("aria-roledescription", roledescription);
			}
		}
	})();
	(function(){
		// select for aria-roledescription
		var elements = document.querySelectorAll("select");
		for(var i = 0; i < elements.length; i++){
			var element = elements[i];
			var roledescription = element.hasAttribute("aria-roledescription");
			if(!roledescription){
				roledescription = "下拉列表框,按Enter键展开或折叠,按上下键选择列表项,按Enter键确认";	
				element.setAttribute("aria-roledescription", roledescription);
			}
		}
	})();
	(function(){
		// vedio for aria-roledescription
		var videos = document.querySelectorAll("video");
		for(var i = 0; i < videos.length; i++){
			var element = videos[i];
			var hasRoledescription = element.hasAttribute("aria-roledescription");
			if(!hasRoledescription){
				var roledescription = "多媒体播放,按空格键播放或暂停,ALT+Enter键切换或退出全屏,左右方向键快退及快进,上下方向键调整音量大小";	
				element.setAttribute("aria-roledescription", roledescription);
			}
		}
	})();
	(function(ariaw) {
		var skipNav = function () {
				var childNodes=ariaw.modules.region.menu.children[0].childNodes;
				var count=-1;
				for(var i = 0; i < childNodes.length; i++){
					var text=childNodes[i].textContent;
					console.log(text);
					if(text=="导航区"){
						count=i;
					}
				}
				if(count>-1){
					var ariaw_jumpNode = document.createElement("a");
					ariaw_jumpNode.setAttribute("id", "skipCrossNav");
					ariaw_jumpNode.setAttribute("href", "javascript:jumpTo();");
					ariaw_jumpNode.setAttribute("tabindex", "0");
					ariaw_jumpNode.setAttribute("aria-label", "按下回车可跳过头部服务区");
					ariaw_jumpCrossText = '<span class="ariawSkipFont">跳过头部服务区</span><span class="ariawSkipCrossNavEnter"><svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="returnIconTitle" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#2329D6"> <title id="returnIconTitle">Return</title> <path d="M13,8 L13,11 13,13 L6,13"/> <polyline points="8 16 5 13 8 10"/></svg>按下回车</span>';
					ariaw_jumpNodeCss = document.createElement("style");
					ariaw_jumpNodeCssText = '#skipCrossNav{ border:3px solid #184f87; padding:20px 20px; border-radius: 30px; float:left; width:auto; position:fixed; left:100px; top:115px; box-shadow: 5px 3px 4px 2px #136ef84d; outline: solid 0 #136ef8; background:#fff; opacity:0.01; line-height:24px; display:inline-flex; color:#184f87; font-weight:bold; text-decoration:none;  -webkit-transition: all .15s ease; -moz-transition: all .15s ease; -o-transition: all .15s ease; transition: all .15s ease; z-index:-9999;}#skipCrossNav:focus {  opacity: 1; z-index: 99999;}#skipCrossNav .ariawSkipFont{ width:140px; font-size:18px;}#skipCrossNav span.ariawSkipCrossNavEnter{ padding: 0px 10px; border-radius: 50px; color: #fff; background-color: #2a6eb3; line-height:24px; font-size:16px;}#skipCrossNav span.ariawSkipCrossNavEnter svg{ float:left;}'
					ariaw_jumpNode.innerHTML = ariaw_jumpCrossText;
					ariaw_jumpNodeCss.innerHTML = ariaw_jumpNodeCssText
					var body = document.body;
					if (body.firstChild) {
						body.insertBefore(ariaw_jumpNode, body.firstChild);
						body.insertBefore(ariaw_jumpNodeCss, body.firstChild);
					} else {
						body.appendChild(ariaw_jumpNode);
						body.appendChild(ariaw_jumpNodeCss);
					}
				}
				
		};
		var rmSkipNav = function () {
				var element = document.getElementById("skipCrossNav");
				if(element){
					var parent = element.parentNode;
					parent.removeChild(element);
				}
		};
		if(ariaw.state){
				skipNav();
		}
		ariaw.handleState(function(state) {
			if(state){
				skipNav();
			}else{
				rmSkipNav();
			}
		});

	})(ARIAW.instance());	
	
});

var jumpTo= function (){
		document.getElementById("skipCrossNav").blur();
		var childNodes=ARIAW.instance().modules.region.menu.children[0].childNodes;
		var count=-1;
		var count_q=-1;
		for(var i = 0; i < childNodes.length; i++){
			var text=childNodes[i].textContent;
			console.log(text);
			if(text=="导航区"){
				count=i;
			}else if(text=="全文检索"){
				count_q=i;
			}
		}
		if(count>-1){
			  ARIAW.instance().modules.region.menu.selectItem(count>count_q?(count+1):(count_q+1));
		}
}

// add ariaw-selected Event to add tabindex
document.addEventListener('ariaw-selected', function(event) {
	if (event.selectedTarget &&!event.selectedFocus && !event.selectedTarget.hasAttribute('tabindex')) {
		var blur = (function() {
			this.removeAttribute('tabindex');
			this.removeEventListener('blur', blur);
		}).bind(event.selectedTarget);
		event.selectedTarget.setAttribute('tabindex', '0');
		event.selectedTarget.addEventListener('blur', blur);
		event.selectedTarget.focus();
	}
});
(function() {
	if (document.documentElement.requestFullscreen) {
		var requestFullscreen = document.documentElement.requestFullscreen, exitFullscreen = document.exitFullscreen, fullscreenElement = 'fullscreenElement';
	} else if (document.documentElement.webkitRequestFullscreen) {
		var requestFullscreen = document.documentElement.webkitRequestFullscreen, exitFullscreen = document.webkitExitFullscreen, fullscreenElement = 'webkitFullscreenElement';
	} else if (document.documentElement.mozRequestFullscreen) {
		var requestFullscreen = document.documentElement.mozRequestFullscreen, exitFullscreen = document.mozExitFullscreen, fullscreenElement = 'mozFullscreenElement';
	}
	document.addEventListener('DOMContentLoaded', function() {
		// vedio for aria-roledescription
		Array.prototype.forEach.call(document.querySelectorAll('video'), function(video) {
			requestFullscreen && video.addEventListener('keydown', function(event) {
				if (event.altKey && (event.key == 'Enter' || event.keyCode == 13)) {
					if (document[fullscreenElement]) {
						exitFullscreen.call(document);
					} else {
						requestFullscreen.call(event.target);
					}
				}
			});
		});
	});
})();