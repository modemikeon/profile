// Componente TABS //////////////////////////////////////////////
$('.tabgroup > div').hide();
$('.tabgroup > div:first-of-type').show();
$('.tabs a').click(function (e) {
	e.preventDefault();
	var $this = $(this),
		tabgroup = '#' + $this.parents('.tabs').data('tabgroup'),
		others = $this.closest('li').siblings().children('a'),
		target = $this.attr('href');
	others.removeClass('active');
	$this.addClass('active');
	$(tabgroup).children('div').hide();
	$(target).show();
})
// Componente SEGMENT //////////////////////////////////////////////
//$('.tabgroup2 > div').hide();
//$('.tabgroup2 > div:first-of-type').show();
$('.segment a').click(function (e) {
	e.preventDefault();
	var $this = $(this),
		tabgroup = '#' + $this.parents('.segment').data('tabgroup2'),
		others = $this.closest('li').siblings().children('a'),
		target = $this.attr('href');
	others.removeClass('active');
	$this.addClass('active');
	//	$(tabgroup2).children('div').hide();
	//	$(target).show();
})



// Component PASSWORD //////////////////////////////////////////////
inputTogglePwd = {
	className: ".toggle-pwd",
	element: null,
	input: null,
	icon: null,
	iconHideClass: "icon-eye",
	iconShowClass: "icon-eye-press",
	init: function () {
		this.element = document.querySelector(this.className);
		if (this.element) {
			this.input = this.element.querySelector("input");
			this.view();
			this.addEvents();
		}
	},
	addEvents: function () {
		this.icon.addEventListener("click", this.toggle.bind(this))
	},
	toggle: function () {
		if (this.icon.className == this.iconShowClass) {
			this.icon.classList.remove(this.iconShowClass);
			this.icon.classList.add(this.iconHideClass);
			this.input.type = "password";
		} else {
			this.icon.classList.remove(this.iconHideClass);
			this.icon.classList.add(this.iconShowClass);
			this.input.type = "text";
		}
	}
	,
	view: function () {
		this.icon = document.createElement("i");
		this.icon.classList.add(this.iconHideClass);
		this.element.appendChild(this.icon);
	}
}
inputTogglePwd.init();



// SELECT //////////////////////////////////////////////
var util = {
	f: {
		addStyle: function (elem, prop, val, vendors) {
			var i, ii, property, value;
			if (!util.f.isElem(elem)) {
				elem = document.getElementById(elem);
			}
			if (!util.f.isArray(prop)) {
				prop = [prop];
				val = [val];
			}
			for (i = 0; i < prop.length; i += 1) {
				var thisProp = String(prop[i]),
					thisVal = String(val[i]);
				if (typeof vendors !== "undefined") {
					if (!util.f.isArray(vendors)) {
						vendors.toLowerCase() == "all"
							? (vendors = ["webkit", "moz", "ms", "o"])
							: (vendors = [vendors]);
					}
					for (ii = 0; ii < vendors.length; ii += 1) {
						elem.style[vendors[i] + thisProp] = thisVal;
					}
				}
				thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1);
				elem.style[thisProp] = thisVal;
			}
		},
		cssLoaded: function (event) {
			var child = util.f.getTrg(event);
			child.setAttribute("media", "all");
		},
		events: {
			cancel: function (event) {
				util.f.events.prevent(event);
				util.f.events.stop(event);
			},
			prevent: function (event) {
				event = event || window.event;
				event.preventDefault();
			},
			stop: function (event) {
				event = event || window.event;
				event.stopPropagation();
			}
		},
		getSize: function (elem, prop) {
			return parseInt(elem.getBoundingClientRect()[prop], 10);
		},
		getTrg: function (event) {
			event = event || window.event;
			if (event.srcElement) {
				return event.srcElement;
			} else {
				return event.target;
			}
		},
		isElem: function (elem) {
			return util.f.isNode(elem) && elem.nodeType == 1;
		},
		isArray: function (v) {
			return v.constructor === Array;
		},
		isNode: function (elem) {
			return typeof Node === "object"
				? elem instanceof Node
				: elem &&
				typeof elem === "object" &&
				typeof elem.nodeType === "number" &&
				typeof elem.nodeName === "string" &&
				elem.nodeType !== 3;
		},
		isObj: function (v) {
			return typeof v == "object";
		},
		replaceAt: function (str, index, char) {
			return str.substr(0, index) + char + str.substr(index + char.length);
		}
	}
},
	form = {
		f: {
			init: {
				register: function () {
					console.clear(); // just cuz codepen
					var child,
						children = document.getElementsByClassName("field"),
						i;
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						util.f.addStyle(child, "Opacity", 1);
					}
					children = document.getElementsByClassName("psuedo_select");
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						child.addEventListener("click", form.f.select.toggle);
					}
				},
				unregister: function () {
				}
			},
			select: {
				blur: function (field) {
					field.classList.remove("focused");
					var child,
						children = field.childNodes,
						i,
						ii,
						nested_child,
						nested_children;
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						if (util.f.isElem(child)) {
							if (child.classList.contains("deselect")) {
								child.parentNode.removeChild(child);
							} else if (child.tagName == "SPAN") {
								if (!field.dataset.value) {
									util.f.addStyle(child, ["FontSize", "Top"], ["16px", "32px"]);
								}
							} else if (child.classList.contains("psuedo_select")) {
								nested_children = child.childNodes;
								for (ii = 0; ii < nested_children.length; ii += 1) {
									nested_child = nested_children[ii];
									if (util.f.isElem(nested_child)) {
										if (nested_child.tagName == "SPAN") {
											if (!field.dataset.value) {
												util.f.addStyle(
													nested_child,
													["Opacity", "Transform"],
													[0, "translateY(24px)"]
												);
											}
										} else if (nested_child.tagName == "UL") {
											util.f.addStyle(
												nested_child,
												["Height", "Opacity"],
												[0, 0]
											);
										}
									}
								}
							}
						}
					}
				},
				focus: function (field) {
					field.classList.add("focused");
					var bool = false,
						child,
						children = field.childNodes,
						i,
						ii,
						iii,
						nested_child,
						nested_children,
						nested_nested_child,
						nested_nested_children,
						size = 0;
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						util.f.isElem(child) && child.classList.contains("deselect")
							? (bool = true)
							: null;
					}
					if (!bool) {
						child = document.createElement("div");
						child.className = "deselect";
						child.addEventListener("click", form.f.select.toggle);
						field.insertBefore(child, children[0]);
					}
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						if (
							util.f.isElem(child) &&
							child.classList.contains("psuedo_select")
						) {
							nested_children = child.childNodes;
							for (ii = 0; ii < nested_children.length; ii += 1) {
								nested_child = nested_children[ii];
								if (
									util.f.isElem(nested_child) &&
									nested_child.tagName == "UL"
								) {
									size = 0;
									nested_nested_children = nested_child.childNodes;
									for (iii = 0; iii < nested_nested_children.length; iii += 1) {
										nested_nested_child = nested_nested_children[iii];
										if (
											util.f.isElem(nested_nested_child) &&
											nested_nested_child.tagName == "LI"
										) {
											size += util.f.getSize(nested_nested_child, "height");
											console.log("size: " + size);
										}
									}
									util.f.addStyle(
										nested_child,
										["Height", "Opacity"],
										[size + "px", 1]
									);
								}
							}
						}
					}
				},
				selection: function (child, parent) {
					var children = parent.childNodes,
						i,
						ii,
						nested_child,
						nested_children,
						time = 0,
						value;
					if (util.f.isElem(child) && util.f.isElem(parent)) {
						parent.dataset.value = child.dataset.value;
						value = child.innerHTML;
					}
					for (i = 0; i < children.length; i += 1) {
						child = children[i];
						if (util.f.isElem(child)) {
							if (child.classList.contains("psuedo_select")) {
								nested_children = child.childNodes;
								for (ii = 0; ii < nested_children.length; ii += 1) {
									nested_child = nested_children[ii];
									if (
										util.f.isElem(nested_child) &&
										nested_child.classList.contains("selected")
									) {
										if (nested_child.innerHTML) {
											time = 1e2;
											util.f.addStyle(
												nested_child,
												["Opacity", "Transform"],
												[0, "translateY(24px)"],
												"all"
											);
										}
										setTimeout(
											function (c, v) {
												c.innerHTML = v;
												util.f.addStyle(
													c,
													["Opacity", "Transform", "TransitionDuration"],
													[1, "translateY(0px)", ".1s"],
													"all"
												);
											},
											time,
											nested_child,
											value
										);
									}
								}
							} else if (child.tagName == "SPAN") {
								util.f.addStyle(child, ["FontSize", "Top", "Color"], ["10px", "3px", "#A4A5A9"]);
							}
						}
					}
				},
				toggle: function (event) {
					util.f.events.stop(event);
					var child = util.f.getTrg(event),
						children,
						i,
						parent;
					switch (true) {
						case child.classList.contains("psuedo_select"):
						case child.classList.contains("deselect"):
							parent = child.parentNode;
							break;
						case child.classList.contains("options"):
							parent = child.parentNode.parentNode;
							break;
						case child.classList.contains("option"):
							parent = child.parentNode.parentNode.parentNode;
							form.f.select.selection(child, parent);
							break;
					}
					parent.classList.contains("focused")
						? form.f.select.blur(parent)
						: form.f.select.focus(parent);
				}
			}
		}
	};
window.onload = form.f.init.register;
