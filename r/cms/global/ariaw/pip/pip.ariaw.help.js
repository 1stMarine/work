(function(A) {
	var module = function(a) {}

	module.prototype.ready = function(a) {
		A.removeElement(a.modules.help.dom.container.firstChild);
		var title = document.createElement("h3");
		title.innerHTML = '欢迎使用站内无障碍辅助应用';
		a.modules.help.dom.container.insertBefore(title, a.modules.help.dom.container.firstChild);
	}

	module.requires = ["help"];
	module.optional = true;

	A.modules["pip.help"] = module;
})(ARIAW);
