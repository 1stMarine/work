var _beianhao = function(){
	var duyin = ["零","幺","二","三","四","五","六","七","八","九"];
	var links = Array.from(document.getElementsByTagName('a'));
	for (var i = links.length-1; i>=0; i--){
		if(links[i].text.indexOf('豫公网安备') > -1){
			var labelValue = '';
			var target_link = links[i];
			var link_label= target_link.text;
			var chars = link_label.replace(/\s+/g,'').split('');
			for (var i = 0; i < chars.length; i++) {
				if(duyin[Number(chars[i])]){
					labelValue += duyin[Number(chars[i])];
				}else{
					labelValue += chars[i];
				}
			}
			target_link.setAttribute("aria-label", labelValue);
			break;
		}
	}
};

var beianhao = function(){
	var links = Array.from(document.getElementsByTagName('a'));
	for (var i = links.length-1; i>=0; i--){
		if(links[i].text.indexOf('豫公网安备') > -1){
			var labelValue = '';
			var target_link = links[i];
			var link_label= target_link.text;
			var chars = link_label.replace(/\s+/g,'').split('');
			for (var i = 0; i < chars.length; i++) {
				labelValue += (i==0?'':' ') + chars[i];
			}
			target_link.setAttribute("aria-label", labelValue);
			break;
		}
	}
};

var pageOperate = function(){
	if(document.querySelector(".news-content-function>span")){
		var btn_1 = document.querySelector(".news-content-function>span");
		var btn_2 = document.querySelector(".news-content-function>span:last-child");
		btn_1.setAttribute("tabindex", "0");
		btn_2.setAttribute("tabindex", "0");
		btn_1.onkeydown = function(event){
			if(event.keyCode == 13){
				this.click();
			}
		}
		btn_2.onkeydown = function(event){
			if(event.keyCode == 13){
				this.click();
			}
		}
	}
};

var forReadContentTxt = function(parentNode){
	//匹配可读字符（数字、字母、汉字）
	var reg = /([\p{Unified_Ideograph}0-9a-zA-Z])/u;
	if(!parentNode){
		var txt_1 = document.querySelector(".news_content_content");
		var txt_2 = document.querySelector(".content-txt");
		var txt_3 = document.querySelector(".single-article");
		var parentNode = txt_1 ? txt_1 : (txt_2 ? txt_2 : txt_3);
	}
	if(parentNode && !parentNode.getAttribute("aria-label")){
		var children = parentNode.children;
		for(var i = 0; i < children.length; i++){
			var child = children[i];
			var txt = child.textContent.replace(/\s+/g, "");
			if(txt.length == 1 && reg.test(txt)){
				child.setAttribute("aria-label", txt);
			}else if(child.children.length > 0){
				forReadContentTxt(child);
			}
		}
	}
};

(function ready(){
	if(document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function() {
			document.removeEventListener('DOMContentLoaded',arguments.callee, false);
			beianhao();
			pageOperate();
			forReadContentTxt();
		}, false);
	}else if(document.attachEvent) {
		document.attachEvent('onreadystatechange', function() {
			if(document.readyState == 'complete') {
				document.detachEvent('onreadystatechange', arguments.callee);
				beianhao();
				pageOperate();
				forReadContentTxt();
			}
		});
	}
})();