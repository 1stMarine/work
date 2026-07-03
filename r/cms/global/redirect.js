/* 
 * redirect.js v1.1
 * Copyright 2021 cdl371#126.com
 * Released under the MIT license
 */
(function(){
	var HOSTNAME_REGEX = [/\.gov\.cn/i];

	var maskTemplate = '<div style="position:fixed;z-index:99999999;top:0;left:0;bottom:0;right:0;overflow:auto;background-color:#f3f3f3;font-family:Verdana,\'Microsoft Yahei\';">'
		+ '	<div style="margin:64px auto 0;width:75%;min-width:300px;max-width:480px;">'
		+ '		<div style="padding-left:24px;padding-bottom:8px;">'
		+ '			<span style="font-size:20px;display:inline-block;">即将离开本站</span>'
		+ '			<span style="font-size:14px;display:inline-block;color:#999;">( ${hostname} )</span>'
		+ '		</div>'
		+ '		<div style="background-color:white;border:1px solid #ddd;border-radius:6px;padding:18px 24px;font-size:14px;color:#666;">'
		+ '			<div>您将要访问的网址是:</div>'
		+ '			<div style="margin-top:12px;font-size:13px;word-break:break-all;">${url}</div>'
		+ '			<div style="margin-top:12px;padding-top:12px;border-top:1px solid #ddd;text-align:right;">'
		+ '				<i style="display:inline-block;text-decoration:none;padding:5px 10px;border-radius:5px;color:#666666;border:1px solid #dddddd;margin-right:8px;cursor:pointer;font-style:normal;">放弃</i>'
		+ '				<a style="display:inline-block;text-decoration:none;padding:5px 10px;border-radius:5px;color:#ffffff;border:1px solid #0e68b1;background-color:#0e68b1;outline:none;" href="${href}" target="${target}">继续访问</a>'
		+ '			</div>'
		+ '		</div>'
		+ '	</div>'
		+ '</div>';

	var validateHostname = function(hostname) {
		if(!hostname || location.hostname.toUpperCase() == hostname.toUpperCase()) return true;
		for(var i=0;i<HOSTNAME_REGEX.length;i++) {
			if(HOSTNAME_REGEX[i].test(hostname)) return true;
		}
		return false;
	}

	var handleEvent = function(node, event) {
		if(node.nodeName.toUpperCase() == "A") {
			if(!event.defaultPrevented) {
				var href = (node.href || "").trim();
				if(href && !validateHostname(node.hostname)) {
					event.preventDefault();
					showRedirect(href, node.target);
				}
			}
		} else if(node.parentNode && node.parentNode.nodeName != "body") {
			handleEvent(node.parentNode, event);
		}
	}

	var handleClick = function(event) {
		handleEvent(event.target, event);
	}

	var open = window.open;
	window.open = function(url, name, features) {
		var a = document.createElement("A");
		a.href = url;
		if(validateHostname(a.hostname)) {
			return open(url, name, features);
		} else {
			showRedirect(a.href, name || "_blank");
		}
	}

	var showRedirect = function(url, target) {
		var mask = document.createElement("DIV");
		mask.innerHTML = maskTemplate.replace("${hostname}", location.hostname).replace("${url}", url).replace("${href}", url).replace("${target}", target || "");
		var hideHandler = hideRedirect(mask);
		mask.querySelector("i").addEventListener("click", hideHandler);
		mask.querySelector("a").addEventListener("click", hideHandler);
		document.addEventListener("keydown", hideHandler);
		document.removeEventListener("click", handleClick);
		document.body.appendChild(mask);
		mask.querySelector("a").focus();
	}

	var hideRedirect = function(mask) {
		var handler = function(event) {
			if(event.type.toUpperCase() == "CLICK" || (event.type.toUpperCase() == "KEYDOWN" && event.which == 27)) {
				event.stopPropagation();
				mask.parentNode.removeChild(mask);
				document.removeEventListener("keydown", handler);
				document.addEventListener("click", handleClick);
			}
		}
		return handler;
	}

	document.addEventListener("click", handleClick);
})();
