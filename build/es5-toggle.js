(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DATA_KEY = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (elem, key, value) {
    // die if elem null
    if (!elem) return;

    // get data cache
    var data = elem[DATA_KEY] = elem[DATA_KEY] || {};

    // assign multiple values to cache if key is an object
    if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
        return (0, _assign2.default)(data, key);
    }

    // set value if value is defined
    if (typeof value !== 'undefined') {
        return data[key] = value;
    }

    // get all data values if key is not defined
    if (typeof key === 'undefined') {
        var _ret = function () {
            // if dataset has already been processed, return data cache
            if (data[DATA_KEY] === true) return {
                    v: data
                };
            data[DATA_KEY] = true;

            // use native dataset if supported
            if (elem.dataset) {
                // any existing data in cache takes precedence over dataset
                return {
                    v: data = (0, _assign2.default)({}, elem.dataset, data)
                };
            }

            // find element attributes that start with 'data-' and assign their value to data cache with a camelCase key
            var dataset = {};
            Object.keys(elem.attributes).filter(function (key) {
                return elem.attributes[key].indexOf('data-') === 0;
            }).forEach(function (key) {
                dataset[(0, _string.camelCase)(key.replace('data-', ''))] = elem.getAttribute(key);
            });
            // any existing data in cache takes precedence over dataset
            return {
                v: data = (0, _assign2.default)({}, dataset, data)
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    // check if a value has already been placed in cache for provided key
    if (typeof data[key] === 'undefined') {
        // check dataset (or attribute if dataset not supported) and attempt to set cache value
        return data[key] = elem.dataset ? elem.dataset[key] : elem.getAttribute('data-' + (0, _string.kebabCase)(key));
    }

    return data[key];
};

var _assign = require('./utils/assign');

var _assign2 = _interopRequireDefault(_assign);

var _string = require('./utils/string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATA_KEY = exports.DATA_KEY = Symbol && Symbol('data') || '__UNION__appDataKey';

},{"./utils/assign":2,"./utils/string":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = assign;
function assign() {
	for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
		objs[_key] = arguments[_key];
	}

	return objs.reduce(function (res, obj) {
		if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !!obj) {
			Object.keys(obj).forEach(function (prop) {
				return res[prop] = obj[prop];
			});
		}
		return res;
	});
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.camelCase = camelCase;
exports.kebabCase = kebabCase;
var deburredLetters = {
	'\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	'\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	'\xc7': 'C', '\xe7': 'c',
	'\xd0': 'D', '\xf0': 'd',
	'\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	'\xe8': 'e', '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	'\xcC': 'I', '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	'\xeC': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
	'\xd1': 'N', '\xf1': 'n',
	'\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	'\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	'\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	'\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	'\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
	'\xc6': 'Ae', '\xe6': 'ae',
	'\xde': 'Th', '\xfe': 'th',
	'\xdf': 'ss'
};

function deburrLetter(letter) {
	return deburredLetters[letter];
}

function deburr(string) {
	string = String(string);
	return string && string.replace(/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g, deburrLetter).replace(/[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]/g, '');
}

function capitalize(string) {
	return string.replace(/^(.)/, function (l) {
		return l.toUpperCase();
	});
}

function words(string) {
	return deburr(string).replace(/\s*([A-Z])/g, ' $1').replace(/[\s-]+/g, ' ').split(' ');
}

function camelCase(string) {
	return words(string).reduce(function (result, word, index) {
		return result + (index ? capitalize(word.toLowerCase()) : word.toLowerCase());
	}, '');
}

function kebabCase(string) {
	return words(string).join('-').toLowerCase();
}

},{}],4:[function(require,module,exports){
'use strict';

var _index = require('./index');

var toggle = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

window.toggle = toggle;

},{"./index":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULTS = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _assign = require('./utils/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var DEFAULTS = exports.DEFAULTS = {
    state: 'active',
    afterStateChange: undefined
};

var _class = function () {
    function _class(options) {
        _classCallCheck(this, _class);

        var group = this;
        group.opts = (0, _assign2.default)({}, DEFAULTS, options);
        group.panels = [];
        group.activePanel = undefined;
    }

    _createClass(_class, [{
        key: 'addPanel',
        value: function addPanel(panel) {
            var group = this;

            if (!group.panels.some(function (p) {
                return p === panel;
            })) {
                group.panels.push(panel);
            }

            return group;
        }
    }, {
        key: 'setActivePanel',
        value: function setActivePanel(activePanel) {
            var group = this;
            if (activePanel === group.activePanel) return group;

            group.activePanel = activePanel;
            group.panels.forEach(function (p) {
                return p === activePanel || p.setState(false, true);
            });
            group.afterStateChange();

            return group;
        }
    }, {
        key: 'removeActivatePanel',
        value: function removeActivatePanel() {
            var group = this;

            group.activePanel = false;
            group.panels.forEach(function (p) {
                return p.setState(false, true);
            });
            group.afterStateChange();

            return group;
        }
    }, {
        key: 'afterStateChange',
        value: function afterStateChange() {
            if (typeof this.opts.afterStateChange === 'function') {
                this.opts.afterStateChange(this, !!this.activePanel, this.activePanel);
            }
        }
    }, {
        key: 'setOptions',
        value: function setOptions(options) {
            (0, _assign2.default)(this.opts, options);
            return this;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"./utils/assign":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _group = require('./group');

Object.defineProperty(exports, 'Group', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_group).default;
  }
});

var _panel = require('./panel');

Object.defineProperty(exports, 'Panel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_panel).default;
  }
});

var _trigger = require('./trigger');

Object.defineProperty(exports, 'Trigger', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_trigger).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

},{"./group":5,"./panel":7,"./trigger":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULTS = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _assign = require('./utils/assign');

var _assign2 = _interopRequireDefault(_assign);

var _state = require('./utils/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var DEFAULTS = exports.DEFAULTS = {
    canTurnSelfOff: true
};

var _class = function () {
    function _class(dom, options) {
        _classCallCheck(this, _class);

        var panel = this;

        panel.opts = (0, _assign2.default)({}, DEFAULTS, options);
        panel.elem = dom;
        panel.triggers = [];
        panel.state = false;
        panel.group = options.group.addPanel(panel);
        panel.setState((0, _state2.default)(panel.elem, panel.group.opts.state) || !!(window.location.hash && dom.id === window.location.hash.substr(1)));
    }

    _createClass(_class, [{
        key: 'addTrigger',
        value: function addTrigger(trigger) {
            var panel = this;

            if (!panel.triggers.some(function (t) {
                return t === trigger;
            })) {
                trigger.index = panel.triggers.length;
                panel.triggers.push(trigger);
            }

            return panel;
        }
    }, {
        key: 'removeTrigger',
        value: function removeTrigger(trigger) {
            var panel = this;

            panel.triggers.splice(trigger.index, 1);

            return panel;
        }
    }, {
        key: 'setOptions',
        value: function setOptions(options) {
            (0, _assign2.default)(this.opts, options);
            return this;
        }
    }, {
        key: 'setState',
        value: function setState(active, calledByGroup) {
            var panel = this;

            active = active === 'toggle' ? !panel.state : active;
            if (active !== panel.state) {
                (0, _state2.default)(panel.elem, panel.group.opts.state, panel.state = active);
                if (active) {
                    panel.group.setActivePanel(panel);
                } else if (!calledByGroup) {
                    panel.group.removeActivatePanel();
                }
            }

            panel.triggers.forEach(function (t) {
                return t.setState();
            });

            return panel;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{"./utils/assign":9,"./utils/state":10}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULTS = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _legoData = require('lego-data');

var _legoData2 = _interopRequireDefault(_legoData);

var _assign = require('./utils/assign');

var _assign2 = _interopRequireDefault(_assign);

var _state = require('./utils/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var DEFAULTS = exports.DEFAULTS = {
    activeEvent: 'click',
    inactiveEvent: 'click'
};

var Trigger = function () {
    function Trigger(elem, options) {
        _classCallCheck(this, Trigger);

        var trigger = (0, _legoData2.default)(elem, '_trigger');
        if (trigger instanceof Trigger) return trigger;

        trigger = this;
        trigger.opts = (0, _assign2.default)({}, DEFAULTS, options);
        trigger.elem = elem;
        trigger.panel = options.panel.addTrigger(trigger);
        trigger.setState();

        if (elem.tagName.toLowerCase() !== 'a' || elem.tagName.toLowerCase() !== 'button') {
            elem.setAttribute('tabindex', '0');
        }
        elem.addEventListener(trigger.opts.activeEvent, trigger, false);

        if (trigger.opts.activeEvent !== trigger.opts.inactiveEvent) {
            elem.addEventListener(trigger.opts.inactiveEvent, trigger, false);
        }
        (0, _legoData2.default)(elem, '_trigger', trigger);
    }

    _createClass(Trigger, [{
        key: 'setState',
        value: function setState() {
            var trigger = this;

            (0, _state2.default)(trigger.elem, trigger.panel.group.opts.state, trigger.panel.state);

            return trigger;
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(e) {
            var trigger = this;
            if (e.type === trigger.opts.activeEvent && !trigger.panel.state) {
                if (e.type === 'click' && (e.metaKey || e.ctrlKey)) return;
                e.preventDefault();
                trigger.panel.setState(true);
            } else if (e.type === trigger.opts.inactiveEvent && trigger.panel.state) {
                e.preventDefault();
                trigger.panel.setState(!trigger.panel.opts.canTurnSelfOff);
            }
        }
    }, {
        key: 'detach',
        value: function detach() {
            var trigger = this;

            trigger.panel.removeTrigger(trigger);
            trigger.elem.removeEventListener(trigger.opts.activeEvent, trigger);
            if (trigger.opts.activeEvent !== trigger.opts.inactiveEvent) {
                trigger.elem.removeEventListener(trigger.opts.inactiveEvent, trigger);
            }

            return trigger;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var trigger = this;

            trigger.detach();
            trigger.elem.parentNode.removeChild(trigger.elem);

            return trigger;
        }
    }]);

    return Trigger;
}();

exports.default = Trigger;

},{"./utils/assign":9,"./utils/state":10,"lego-data":1}],9:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

exports.default = assign;
function assign() {
	for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
		objs[_key] = arguments[_key];
	}

	return objs.reduce(function (res, obj) {
		if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !!obj) {
			Object.keys(obj).forEach(function (prop) {
				return res[prop] = obj[prop];
			});
		}
		return res;
	});
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = state;
function hasClassInList(elem, c) {
	return elem.classList.contains(c);
}

function addClassInList(elem, c) {
	elem.classList.add(c);
}

function removeClassInList(elem, c) {
	elem.classList.remove(c);
}

function hasClassInName(elem, c) {
	return (' ' + elem.className + ' ').indexOf(' ' + c + ' ') > -1;
}

function addClassInName(elem, c) {
	if (!hasClassInName(elem, c)) {
		elem.className = elem.className + ' ' + c;
	}
}

function removeClassInName(elem, c) {
	elem.className = (' ' + elem.className + ' ').replace(new RegExp(' ' + c + ' ', 'g'), ' ').trim();
}

var LIST_SUPPORT = 'classList' in document.documentElement;

var classie = {
	has: LIST_SUPPORT ? hasClassInList : hasClassInName,
	add: LIST_SUPPORT ? addClassInList : addClassInName,
	remove: LIST_SUPPORT ? removeClassInList : removeClassInName,
	toggle: function toggle(elem, c) {
		if (!this.has(elem, c)) {
			this.add(elem, c);
		} else {
			this.remove(elem, c);
		}
	}
};

function state(elem, className, active) {

	if (typeof active === 'undefined') {
		return classie.has(elem, 'is-' + className);
	}

	var service = active === 'toggle' ? 'toggle' : active ? 'add' : 'remove';

	classie[service](elem, 'is-' + className);
	return !!active;
}

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbGVnby1kYXRhL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sZWdvLWRhdGEvc3JjL3V0aWxzL2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9sZWdvLWRhdGEvc3JjL3V0aWxzL3N0cmluZy5qcyIsInNyYy9lczUtdG9nZ2xlLmpzIiwic3JjL2dyb3VwLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3BhbmVsLmpzIiwic3JjL3RyaWdnZXIuanMiLCJzcmMvdXRpbHMvYXNzaWduLmpzIiwic3JjL3V0aWxzL3N0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O2tCQ0tlLFVBQVUsSUFBVixFQUFnQixHQUFoQixFQUFxQixLQUFyQixFQUE0Qjs7QUFFdkMsUUFBSSxDQUFDLElBQUQsRUFBTyxPQUFYOzs7QUFGdUMsUUFLbkMsT0FBTyxLQUFLLFFBQUwsSUFBaUIsS0FBSyxRQUFMLEtBQWtCLEVBQWxCOzs7QUFMVyxRQVFuQyxRQUFPLGlEQUFQLEtBQWUsUUFBZixFQUF5QjtBQUN6QixlQUFPLHNCQUFPLElBQVAsRUFBYSxHQUFiLENBQVAsQ0FEeUI7S0FBN0I7OztBQVJ1QyxRQWFuQyxPQUFPLEtBQVAsS0FBaUIsV0FBakIsRUFBOEI7QUFDOUIsZUFBTyxLQUFLLEdBQUwsSUFBWSxLQUFaLENBRHVCO0tBQWxDOzs7QUFidUMsUUFrQm5DLE9BQU8sR0FBUCxLQUFlLFdBQWYsRUFBNEI7OztBQUU1QixnQkFBSSxLQUFLLFFBQUwsTUFBbUIsSUFBbkIsRUFBeUI7dUJBQU87aUJBQVAsQ0FBN0I7QUFDQSxpQkFBSyxRQUFMLElBQWlCLElBQWpCOzs7QUFHQSxnQkFBSSxLQUFLLE9BQUwsRUFBYzs7QUFFZDt1QkFBTyxPQUFPLHNCQUFPLEVBQVAsRUFBVyxLQUFLLE9BQUwsRUFBYyxJQUF6QixDQUFQO2lCQUFQLENBRmM7YUFBbEI7OztBQU1BLGdCQUFJLFVBQVUsRUFBVjtBQUNKLG1CQUFPLElBQVAsQ0FBWSxLQUFLLFVBQUwsQ0FBWixDQUE2QixNQUE3QixDQUFvQzt1QkFBTyxLQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsRUFBcUIsT0FBckIsQ0FBNkIsT0FBN0IsTUFBMEMsQ0FBMUM7YUFBUCxDQUFwQyxDQUF3RixPQUF4RixDQUFnRyxlQUFPO0FBQ25HLHdCQUFRLHVCQUFVLElBQUksT0FBSixDQUFZLE9BQVosRUFBcUIsRUFBckIsQ0FBVixDQUFSLElBQStDLEtBQUssWUFBTCxDQUFrQixHQUFsQixDQUEvQyxDQURtRzthQUFQLENBQWhHOztBQUlBO21CQUFPLE9BQU8sc0JBQU8sRUFBUCxFQUFXLE9BQVgsRUFBb0IsSUFBcEIsQ0FBUDthQUFQO1lBakI0Qjs7O0tBQWhDOzs7QUFsQnVDLFFBdUNuQyxPQUFPLEtBQUssR0FBTCxDQUFQLEtBQXFCLFdBQXJCLEVBQWtDOztBQUVsQyxlQUFPLEtBQUssR0FBTCxJQUFZLEtBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBZixHQUFtQyxLQUFLLFlBQUwsV0FBMEIsdUJBQVUsR0FBVixDQUExQixDQUFuQyxDQUZlO0tBQXRDOztBQUtBLFdBQU8sS0FBSyxHQUFMLENBQVAsQ0E1Q3VDO0NBQTVCOzs7Ozs7Ozs7O0FBRlIsSUFBTSw4QkFBVyxVQUFVLE9BQU8sTUFBUCxDQUFWLElBQTRCLHFCQUE1Qjs7Ozs7Ozs7Ozs7a0JDSEE7QUFBVCxTQUFTLE1BQVQsR0FBeUI7bUNBQU47O0VBQU07O0FBQ3ZDLFFBQU8sS0FBSyxNQUFMLENBQVksVUFBQyxHQUFELEVBQU0sR0FBTixFQUFjO0FBQ2hDLE1BQUksUUFBTyxpREFBUCxLQUFlLFFBQWYsSUFBMkIsQ0FBQyxDQUFDLEdBQUQsRUFBTTtBQUNyQyxVQUFPLElBQVAsQ0FBWSxHQUFaLEVBQWlCLE9BQWpCLENBQXlCO1dBQVEsSUFBSSxJQUFKLElBQVksSUFBSSxJQUFKLENBQVo7SUFBUixDQUF6QixDQURxQztHQUF0QztBQUdBLFNBQU8sR0FBUCxDQUpnQztFQUFkLENBQW5CLENBRHVDO0NBQXpCOzs7Ozs7OztRQzBDQztRQUlBO0FBOUNoQixJQUFJLGtCQUFrQjtBQUNyQixTQUFRLEdBQVIsRUFBYyxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVI7QUFDbEUsU0FBUSxHQUFSLEVBQWMsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSO0FBQ2xFLFNBQVEsR0FBUixFQUFjLFFBQVEsR0FBUjtBQUNkLFNBQVEsR0FBUixFQUFjLFFBQVEsR0FBUjtBQUNkLFNBQVEsR0FBUixFQUFjLFFBQVEsR0FBUixFQUFhLFFBQVEsR0FBUixFQUFhLFFBQVEsR0FBUjtBQUN4QyxTQUFRLEdBQVIsRUFBYyxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVI7QUFDeEMsU0FBUSxHQUFSLEVBQWMsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSO0FBQ3hDLFNBQVEsR0FBUixFQUFjLFFBQVEsR0FBUixFQUFhLFFBQVEsR0FBUixFQUFhLFFBQVEsR0FBUjtBQUN4QyxTQUFRLEdBQVIsRUFBYyxRQUFRLEdBQVI7QUFDZCxTQUFRLEdBQVIsRUFBYyxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVI7QUFDbEUsU0FBUSxHQUFSLEVBQWMsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSO0FBQ2xFLFNBQVEsR0FBUixFQUFjLFFBQVEsR0FBUixFQUFhLFFBQVEsR0FBUixFQUFhLFFBQVEsR0FBUjtBQUN4QyxTQUFRLEdBQVIsRUFBYyxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVIsRUFBYSxRQUFRLEdBQVI7QUFDeEMsU0FBUSxHQUFSLEVBQWMsUUFBUSxHQUFSLEVBQWEsUUFBUSxHQUFSO0FBQzNCLFNBQVEsSUFBUixFQUFjLFFBQVEsSUFBUjtBQUNkLFNBQVEsSUFBUixFQUFjLFFBQVEsSUFBUjtBQUNkLFNBQVEsSUFBUjtDQWpCRzs7QUFvQkosU0FBUyxZQUFULENBQXNCLE1BQXRCLEVBQThCO0FBQzdCLFFBQU8sZ0JBQWdCLE1BQWhCLENBQVAsQ0FENkI7Q0FBOUI7O0FBSUEsU0FBUyxNQUFULENBQWdCLE1BQWhCLEVBQXdCO0FBQ3BCLFVBQVMsT0FBTyxNQUFQLENBQVQsQ0FEb0I7QUFFcEIsUUFBTyxVQUFVLE9BQ2YsT0FEZSxDQUNQLHlDQURPLEVBQ29DLFlBRHBDLEVBRWYsT0FGZSxDQUVQLDRDQUZPLEVBRXVDLEVBRnZDLENBQVYsQ0FGYTtDQUF4Qjs7QUFPQSxTQUFTLFVBQVQsQ0FBb0IsTUFBcEIsRUFBNEI7QUFDM0IsUUFBTyxPQUFPLE9BQVAsQ0FBZSxNQUFmLEVBQXVCO1NBQUssRUFBRSxXQUFGO0VBQUwsQ0FBOUIsQ0FEMkI7Q0FBNUI7O0FBSUEsU0FBUyxLQUFULENBQWUsTUFBZixFQUF1QjtBQUN0QixRQUFPLE9BQU8sTUFBUCxFQUNMLE9BREssQ0FDRyxhQURILEVBQ2tCLEtBRGxCLEVBRUwsT0FGSyxDQUVHLFNBRkgsRUFFYyxHQUZkLEVBR0wsS0FISyxDQUdDLEdBSEQsQ0FBUCxDQURzQjtDQUF2Qjs7QUFPTyxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDakMsUUFBTyxNQUFNLE1BQU4sRUFBYyxNQUFkLENBQXFCLFVBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxLQUFmO1NBQXlCLFVBQVUsUUFBUSxXQUFXLEtBQUssV0FBTCxFQUFYLENBQVIsR0FBeUMsS0FBSyxXQUFMLEVBQXpDLENBQVY7RUFBekIsRUFBaUcsRUFBdEgsQ0FBUCxDQURpQztDQUEzQjs7QUFJQSxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDakMsUUFBTyxNQUFNLE1BQU4sRUFBYyxJQUFkLENBQW1CLEdBQW5CLEVBQXdCLFdBQXhCLEVBQVAsQ0FEaUM7Q0FBM0I7Ozs7Ozs7SUM5Q0s7Ozs7Ozs7Ozs7Ozs7O0FBQ1osT0FBQSxBQUFPLFNBQVAsQUFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDVCxJQUFNLDhCQUFXLEFBQ3BCO1dBQUEsQUFBTyxBQUNQO3NCQUZTLEFBRVQsQUFBa0I7Ozs7b0JBS2xCLEFBQVk7OEJBQ1I7O1lBQUksUUFEYSxBQUNiLEFBQVEsQUFDWixLQUZpQjtjQUVqQixBQUFNLE9BQU8sc0JBQUEsQUFBTyxJQUFQLEFBQVcsVUFGUCxBQUVqQixBQUFhLEFBQXFCLEFBQ2xDO2NBQUEsQUFBTSxTQUhXLEFBR2pCLEFBQWUsQUFDZjtjQUFBLEFBQU0sY0FKVixBQUFxQixBQUlqQixBQUFvQjs7Ozs7aUNBR2Y7Z0JBQ0QsUUFEUSxBQUNSLEFBQVEsQUFFWjs7aUJBQUssTUFBQSxBQUFNLE9BQU4sQUFBYTt1QkFBVSxNQUF4QixBQUFtQixBQUFLLEFBQU07YUFBWCxDQUFuQixFQUFzQyxBQUN0QztzQkFBQSxBQUFNLE9BQU4sQUFBYSxLQURqQixBQUEwQyxBQUN0QyxBQUFrQixBQUd0Qjs7O21CQVBZLEFBT1osQUFBTyxNQVBLLEFBQ1o7Ozs7dUNBU1c7Z0JBQ1AsUUFEb0IsQUFDcEIsQUFBUSxBQUNaO2dCQUFJLGdCQUFnQixNQUFBLEFBQU0sYUFBYSxPQUF2QyxBQUF1QyxBQUFPLEFBRTlDOztrQkFBQSxBQUFNLGNBSmtCLEFBSXhCLEFBQW9CLEFBQ3BCO2tCQUFBLEFBQU0sT0FBTixBQUFhO3VCQUFhLE1BQUEsQUFBTSxlQUFlLEVBQUEsQUFBRSxTQUFGLEFBQVcsT0FMbEMsQUFLeEIsQUFBcUIsQUFBSyxBQUFxQixBQUFrQixBQUNqRTthQURxQixFQUxHLEFBQ3hCO2tCQUR3QixBQU14QixBQUFNLEFBRU47O21CQVJ3QixBQVF4QixBQUFPOzs7OztnQkFJSCxRQURjLEFBQ2QsQUFBUSxBQUVaOztrQkFBQSxBQUFNLGNBSFksQUFHbEIsQUFBb0IsQUFDcEI7a0JBQUEsQUFBTSxPQUFOLEFBQWE7dUJBQWEsRUFBQSxBQUFFLFNBQUYsQUFBVyxPQUpuQixBQUlsQixBQUFxQixBQUFLLEFBQWtCLEFBQzVDO2FBRHFCLEVBSkgsQUFDbEI7a0JBRGtCLEFBS2xCLEFBQU0sQUFFTjs7bUJBUGtCLEFBT2xCLEFBQU87Ozs7MkNBR1EsQUFDZjtnQkFBSSxPQUFPLEtBQUEsQUFBSyxLQUFMLEFBQVUscUJBQWpCLEFBQXNDLFlBQVksQUFDbEQ7cUJBQUEsQUFBSyxLQUFMLEFBQVUsaUJBQVYsQUFBMkIsTUFBTSxDQUFDLENBQUMsS0FBQSxBQUFLLGFBQWEsS0FEekQsQUFBc0QsQUFDbEQsQUFBcUQsQUFBSzs7Ozs7bUNBSXZEO2tDQUNBLEtBQUEsQUFBSyxNQURJLEFBQ2hCLEFBQWtCLEFBQ2xCO21CQUZnQixBQUVoQixBQUFPLEtBRlMsQUFDaEI7O1FBN0NKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBDQ1RLOzs7Ozs7Ozs7MENBQ0E7Ozs7Ozs7Ozs0Q0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDRixJQUFNLDhCQUFXLEFBQ3BCO29CQURTLEFBQ1QsQUFBZ0I7Ozs7b0JBS2hCLEFBQVksS0FBWixBQUFpQjs4QkFDYjs7WUFBSSxRQURrQixBQUNsQixBQUFRLEFBRVosS0FIc0I7O2NBR3RCLEFBQU0sT0FBTyxzQkFBQSxBQUFPLElBQVAsQUFBVyxVQUhGLEFBR3RCLEFBQWEsQUFBcUIsQUFDbEM7Y0FBQSxBQUFNLE9BSmdCLEFBSXRCLEFBQWEsQUFDYjtjQUFBLEFBQU0sV0FMZ0IsQUFLdEIsQUFBaUIsQUFDakI7Y0FBQSxBQUFNLFFBTmdCLEFBTXRCLEFBQWMsQUFDZDtjQUFBLEFBQU0sUUFBUSxRQUFBLEFBQVEsTUFBUixBQUFjLFNBUE4sQUFPdEIsQUFBYyxBQUF1QixBQUNyQztjQUFBLEFBQU0sU0FBUyxxQkFBTSxNQUFBLEFBQU0sTUFBTSxNQUFBLEFBQU0sTUFBTixBQUFZLEtBQTlCLEFBQWtCLEFBQWlCLFVBQVUsQ0FBQyxFQUFFLE9BQUEsQUFBTyxTQUFQLEFBQWdCLFFBQVEsSUFBQSxBQUFJLE9BQU8sT0FBQSxBQUFPLFNBQVAsQUFBZ0IsS0FBaEIsQUFBcUIsT0FSM0gsQUFBMEIsQUFRdEIsQUFBNkQsQUFBMEIsQUFBVyxBQUE0Qjs7Ozs7bUNBR3ZIO2dCQUNILFFBRFksQUFDWixBQUFRLEFBRVo7O2lCQUFLLE1BQUEsQUFBTSxTQUFOLEFBQWU7dUJBQVUsTUFBMUIsQUFBcUIsQUFBSyxBQUFNO2FBQVgsQ0FBckIsRUFBMEMsQUFDMUM7d0JBQUEsQUFBUSxRQUFRLE1BQUEsQUFBTSxTQURvQixBQUMxQixBQUFlLEFBQy9CO3NCQUFBLEFBQU0sU0FBTixBQUFlLEtBRm5CLEFBQThDLEFBRTFDLEFBQW9CLEFBR3hCOzs7bUJBUmdCLEFBUWhCLEFBQU8sTUFSUyxBQUNoQjs7OztzQ0FVVTtnQkFDTixRQURlLEFBQ2YsQUFBUSxBQUVaOztrQkFBQSxBQUFNLFNBQU4sQUFBZSxPQUFPLFFBQUEsQUFBUSxPQUhYLEFBR25CLEFBQXFDLEFBRXJDOzttQkFMbUIsQUFLbkIsQUFBTyxNQUxZLEFBQ25COzs7O21DQU9PO2tDQUNBLEtBQUEsQUFBSyxNQURJLEFBQ2hCLEFBQWtCLEFBQ2xCO21CQUZnQixBQUVoQixBQUFPLEtBRlMsQUFDaEI7Ozs7aUNBSUssUUFBUTtnQkFDVCxRQUR3QixBQUN4QixBQUFRLEFBRVo7O3FCQUFTLFdBQUEsQUFBVyxXQUFXLENBQUMsTUFBQSxBQUFNLFFBSFYsQUFHbkIsQUFBcUMsQUFDOUM7Z0JBQUksV0FBVyxNQUFBLEFBQU0sT0FBTyxBQUN4QjtxQ0FBTSxNQUFBLEFBQU0sTUFBTSxNQUFBLEFBQU0sTUFBTixBQUFZLEtBQVosQUFBaUIsT0FBTyxNQUFBLEFBQU0sUUFEeEIsQUFDeEIsQUFBMEMsQUFBYyxBQUN4RDtvQkFBQSxBQUFJLFFBQVEsQUFDUjswQkFBQSxBQUFNLE1BQU4sQUFBWSxlQURoQixBQUFZLEFBQ1IsQUFBMkI7MkJBRXRCLENBQUEsQUFBQyxlQUFlLEFBQ3JCOzBCQUFBLEFBQU0sTUFOZCxBQUtTLEFBQW9CLEFBQ3JCLEFBQVksQUFJcEI7aUJBTFM7OztrQkFLVCxBQUFNLFNBQU4sQUFBZTt1QkFBYSxFQWRBLEFBYzVCLEFBQXVCLEFBQUssQUFBRSxBQUU5QjthQUZ1QixFQWRLLEFBQzVCOzttQkFENEIsQUFnQjVCLEFBQU87O1FBbkRYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xHLElBQU0sOEJBQVcsQUFDcEI7aUJBQUEsQUFBYSxBQUNiO21CQUZTLEFBRVQsQUFBZTs7OzthQUdFLEFBRWpCLFFBQUEsQUFBWSxNQUFaLEFBQWtCOzhCQUZELEFBRVUsQUFDdkI7O1lBQUksVUFBVSx3QkFBQSxBQUFLLE1BREksQUFDbkIsQUFBVSxBQUFXLEFBQ3pCO1lBQUksbUJBQUEsQUFBbUIsU0FBUyxPQUFoQyxBQUFnQyxBQUFPLEFBRXZDOztrQkFKdUIsQUFJdkIsQUFBVSxBQUNWLEtBTHVCO2dCQUt2QixBQUFRLE9BQU8sc0JBQUEsQUFBTyxJQUFQLEFBQVcsVUFMSCxBQUt2QixBQUFlLEFBQXFCLEFBQ3BDO2dCQUFBLEFBQVEsT0FOZSxBQU12QixBQUFlLEFBQ2Y7Z0JBQUEsQUFBUSxRQUFRLFFBQUEsQUFBUSxNQUFSLEFBQWMsV0FQUCxBQU92QixBQUFnQixBQUF5QixBQUN6QztnQkFSdUIsQUFRdkIsQUFBUSxBQUVSOztZQUFJLEtBQUEsQUFBSyxRQUFMLEFBQWEsa0JBQWIsQUFBK0IsT0FBTyxLQUFBLEFBQUssUUFBTCxBQUFhLGtCQUFiLEFBQStCO2lCQUNyRSxBQUFLLGFBQUwsQUFBa0IsWUFEdEIsQUFBbUYsQUFDL0UsQUFBOEIsQUFFbEMsS0FIbUYsQUFDL0U7O2FBRUosQUFBSyxpQkFBaUIsUUFBQSxBQUFRLEtBQVIsQUFBYSxhQUFuQyxBQUFnRCxTQWJ6QixBQWF2QixBQUF5RCxBQUV6RDs7WUFBSSxRQUFBLEFBQVEsS0FBUixBQUFhLGdCQUFnQixRQUFBLEFBQVEsS0FBUixBQUFhLGVBQWUsQUFDekQ7aUJBQUEsQUFBSyxpQkFBaUIsUUFBQSxBQUFRLEtBQVIsQUFBYSxlQUFuQyxBQUFrRCxTQUR0RCxBQUE2RCxBQUN6RCxBQUEyRCxBQUUvRDs7Z0NBQUEsQUFBSyxNQUFMLEFBQVcsWUFsQmYsQUFBMkIsQUFrQnZCLEFBQXVCOzs7aUJBcEJWOzs7Z0JBd0JULFVBREcsQUFDSCxBQUFVLEFBRWQ7O2lDQUFNLFFBQUEsQUFBUSxNQUFNLFFBQUEsQUFBUSxNQUFSLEFBQWMsTUFBZCxBQUFvQixLQUFwQixBQUF5QixPQUFPLFFBQUEsQUFBUSxNQUhyRCxBQUdQLEFBQW9ELEFBQWMsQUFFbEU7O21CQUxPLEFBS1AsQUFBTyxRQUxBLEFBQ1A7Ozs7b0NBT1E7Z0JBQ0osVUFETyxBQUNQLEFBQVUsQUFDZCxLQUZXLEFBQ1g7Z0JBQ0ksRUFBQSxBQUFFLFNBQVMsUUFBQSxBQUFRLEtBQVIsQUFBYSxlQUFlLENBQUMsUUFBQSxBQUFRLE1BQVIsQUFBYztvQkFDbEQsRUFBQSxBQUFFLFNBQUYsQUFBVyxZQUFZLEVBQUEsQUFBRSxXQUFXLEVBQXBDLEFBQW9DLEFBQUUsVUFBMUMsQUFBb0QsQUFDcEQ7a0JBRjZELEFBRTdELEFBQUUsQUFDRixpQkFINkQsQUFDN0Q7d0JBRUEsQUFBUSxNQUFSLEFBQWMsU0FIbEIsQUFBaUUsQUFHN0QsQUFBdUI7dUJBRWxCLEVBQUEsQUFBRSxTQUFTLFFBQUEsQUFBUSxLQUFSLEFBQWEsaUJBQWlCLFFBQUEsQUFBUSxNQUFSLEFBQWM7a0JBQU8sQUFDbkUsQUFBRSxBQUNGLGlCQUZtRSxBQUNuRTt3QkFDQSxBQUFRLE1BQVIsQUFBYyxTQUFTLENBQUMsUUFBQSxBQUFRLE1BQVIsQUFBYyxLQUZyQyxBQUFrRSxBQUVuRSxBQUF3QixBQUFtQjthQUYxQzs7Ozs7Z0JBT0QsVUFEQyxBQUNELEFBQVUsQUFFZDs7b0JBQUEsQUFBUSxNQUFSLEFBQWMsY0FIVCxBQUdMLEFBQTRCLEFBQzVCO29CQUFBLEFBQVEsS0FBUixBQUFhLG9CQUFvQixRQUFBLEFBQVEsS0FBUixBQUFhLGFBSnpDLEFBSUwsQUFBMkQsQUFDM0Q7Z0JBQUksUUFBQSxBQUFRLEtBQVIsQUFBYSxnQkFBZ0IsUUFBQSxBQUFRLEtBQVIsQUFBYSxlQUFlLEFBQ3pEO3dCQUFBLEFBQVEsS0FBUixBQUFhLG9CQUFvQixRQUFBLEFBQVEsS0FBUixBQUFhLGVBRGxELEFBQTZELEFBQ3pELEFBQTZELEFBR2pFOzs7bUJBVEssQUFTTCxBQUFPLFFBVEYsQUFDTDs7Ozs7Z0JBWUksVUFERSxBQUNGLEFBQVUsQUFFZDs7b0JBSE0sQUFHTixBQUFRLEFBQ1I7b0JBQUEsQUFBUSxLQUFSLEFBQWEsV0FBYixBQUF3QixZQUFZLFFBSjlCLEFBSU4sQUFBb0MsQUFBUSxBQUU1Qzs7bUJBTk0sQUFNTixBQUFPLFFBTkQsQUFDTjs7UUF2REo7O1dBRmlCO0dBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDVEc7QUFBVCxTQUFBLEFBQVM7bUNBQVU7eUJBQU0sQUFDdkM7OztRQUFPLEtBQUEsQUFBSyxpQkFBTyxBQUFDLEtBQUQsQUFBTTtNQUNwQixRQUFPLDRDQUFQLFVBQUEsQUFBZSxZQUFZLENBQUMsQ0FBQSxBQUFDO1VBQ2hDLEFBQU8sS0FBUCxBQUFZLEtBQVosQUFBaUI7V0FBZ0IsSUFBQSxBQUFJLFFBQVEsSUFEOUMsQUFBc0MsQUFDckMsQUFBeUIsQUFBUSxBQUFZLEFBQUksQUFFbEQ7SUFGMEIsRUFEWSxBQUNyQzs7U0FIWSxBQUF5QixBQUN2QyxBQUFtQixBQUFjLEFBSWhDLEFBQU8sSUFKeUIsQUFDaEM7RUFEa0IsRUFEb0I7Ozs7Ozs7OztrQkMwQ2hCO0FBMUN4QixTQUFBLEFBQVMsZUFBVCxBQUF5QixNQUF6QixBQUErQixHQUFJLEFBQ2xDO1FBQU8sS0FBQSxBQUFLLFVBQUwsQUFBZSxTQUR2QixBQUFtQyxBQUNsQyxBQUFPLEFBQXlCOzs7QUFHakMsU0FBQSxBQUFTLGVBQVQsQUFBeUIsTUFBekIsQUFBK0I7TUFDOUIsQUFBSyxVQUFMLEFBQWUsSUFEaEIsQUFBbUMsQUFDbEMsQUFBb0IsR0FEYyxBQUNsQzs7O0FBR0QsU0FBQSxBQUFTLGtCQUFULEFBQTRCLE1BQTVCLEFBQWtDO01BQ2pDLEFBQUssVUFBTCxBQUFlLE9BRGhCLEFBQXNDLEFBQ3JDLEFBQXVCLEdBRGMsQUFDckM7OztBQUdELFNBQUEsQUFBUyxlQUFULEFBQXlCLE1BQXpCLEFBQStCLEdBQUksQUFDbEM7UUFBTyxPQUFLLEtBQUEsQUFBSyxZQUFWLEtBQUEsQUFBd0IsY0FBYyxJQUF0QyxPQUFnRCxDQUR4RCxBQUFtQyxBQUNxQixBQUFDOzs7QUFHekQsU0FBQSxBQUFTLGVBQVQsQUFBeUIsTUFBekIsQUFBK0IsR0FBSSxBQUNsQztLQUFLLENBQUMsZUFBQSxBQUFnQixNQUFqQixBQUFDLEFBQXNCLElBQU0sQUFDakM7T0FBQSxBQUFLLFlBQWUsS0FBQSxBQUFLLGtCQUYzQixBQUNDLEFBQWtDLEFBQ2pDLEFBQXNDOzs7O0FBSXhDLFNBQUEsQUFBUyxrQkFBVCxBQUE0QixNQUE1QixBQUFrQyxHQUFJLEFBQ3JDO01BQUEsQUFBSyxZQUFZLE9BQUssS0FBQSxBQUFLLFlBQVYsS0FBQSxBQUF3QixRQUFTLElBQUEsQUFBSSxhQUFhLElBQWpCLEtBQWpDLEFBQWlDLEFBQXdCLE1BQXpELEFBQWdFLEtBRGxGLEFBQXNDLEFBQ3JDLEFBQWlCLEFBQXNFOzs7QUFHeEYsSUFBTSxlQUFlLGVBQWUsU0FBQSxBQUFTOztBQUU3QyxjQUFnQixBQUNmO01BQUssZUFBQSxBQUFlLGlCQUFmLEFBQWdDLEFBQ3JDO01BQUssZUFBQSxBQUFlLGlCQUFmLEFBQWdDLEFBQ3JDO1NBQVEsZUFBQSxBQUFlLG9CQUFmLEFBQW1DLEFBQzNDO3lCQUFRLEFBQVcsTUFBWCxBQUFpQixHQUFJLEFBQzVCO01BQUssQ0FBQyxLQUFBLEFBQUssSUFBTCxBQUFVLE1BQVgsQUFBQyxBQUFnQjtRQUNyQixBQUFLLElBQUwsQUFBVSxNQURYLEFBQTRCLEFBQzNCLEFBQWdCLEdBRFcsQUFDM0I7U0FFSSxBQUNKO1FBQUEsQUFBSyxPQUFMLEFBQWEsTUFUVixBQUlHLEFBQ1AsQUFHSyxBQUNKLEFBQW1COztFQUxiO0NBSkg7O0FBY1MsU0FBQSxBQUFTLE1BQVQsQUFBZSxNQUFmLEFBQXFCLFdBQXJCLEFBQWdDOztLQUUxQyxPQUFBLEFBQU8sV0FBUCxBQUFrQixhQUFhLEFBQ2xDO1NBQU8sUUFBQSxBQUFRLElBQVIsQUFBWSxjQURwQixBQUFtQyxBQUNsQyxBQUFPLEFBQXdCLEFBR2hDOzs7S0FBSSxVQUFVLFdBQUEsQUFBVyxXQUFYLEFBQXNCLFdBQVcsU0FBQSxBQUFTLFFBTkYsQUFNUCxBQUFpQixBQUVoRTs7U0FBQSxBQUFRLFNBQVIsQUFBaUIsY0FScUMsQUFRdEQsQUFBNkIsQUFDN0I7UUFBTyxDQUFDLENBVE0sQUFBd0MsQUFTOUMsQUFBQyxPQVQ2QyxBQUV0RCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgYXNzaWduIGZyb20gJy4vdXRpbHMvYXNzaWduJztcbmltcG9ydCB7IGNhbWVsQ2FzZSwga2ViYWJDYXNlIH0gZnJvbSAnLi91dGlscy9zdHJpbmcnO1xuXG5leHBvcnQgY29uc3QgREFUQV9LRVkgPSBTeW1ib2wgJiYgU3ltYm9sKCdkYXRhJykgfHwgJ19fVU5JT05fX2FwcERhdGFLZXknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZWxlbSwga2V5LCB2YWx1ZSkge1xuICAgIC8vIGRpZSBpZiBlbGVtIG51bGxcbiAgICBpZiAoIWVsZW0pIHJldHVybjtcblxuICAgIC8vIGdldCBkYXRhIGNhY2hlXG4gICAgbGV0IGRhdGEgPSBlbGVtW0RBVEFfS0VZXSA9IGVsZW1bREFUQV9LRVldIHx8IHt9O1xuXG4gICAgLy8gYXNzaWduIG11bHRpcGxlIHZhbHVlcyB0byBjYWNoZSBpZiBrZXkgaXMgYW4gb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBhc3NpZ24oZGF0YSwga2V5KTtcbiAgICB9XG5cbiAgICAvLyBzZXQgdmFsdWUgaWYgdmFsdWUgaXMgZGVmaW5lZFxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBkYXRhW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBnZXQgYWxsIGRhdGEgdmFsdWVzIGlmIGtleSBpcyBub3QgZGVmaW5lZFxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBpZiBkYXRhc2V0IGhhcyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkLCByZXR1cm4gZGF0YSBjYWNoZVxuICAgICAgICBpZiAoZGF0YVtEQVRBX0tFWV0gPT09IHRydWUpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhW0RBVEFfS0VZXSA9IHRydWU7XG5cbiAgICAgICAgLy8gdXNlIG5hdGl2ZSBkYXRhc2V0IGlmIHN1cHBvcnRlZFxuICAgICAgICBpZiAoZWxlbS5kYXRhc2V0KSB7XG4gICAgICAgICAgICAvLyBhbnkgZXhpc3RpbmcgZGF0YSBpbiBjYWNoZSB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgZGF0YXNldFxuICAgICAgICAgICAgcmV0dXJuIGRhdGEgPSBhc3NpZ24oe30sIGVsZW0uZGF0YXNldCwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5kIGVsZW1lbnQgYXR0cmlidXRlcyB0aGF0IHN0YXJ0IHdpdGggJ2RhdGEtJyBhbmQgYXNzaWduIHRoZWlyIHZhbHVlIHRvIGRhdGEgY2FjaGUgd2l0aCBhIGNhbWVsQ2FzZSBrZXlcbiAgICAgICAgbGV0IGRhdGFzZXQgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMoZWxlbS5hdHRyaWJ1dGVzKS5maWx0ZXIoa2V5ID0+IGVsZW0uYXR0cmlidXRlc1trZXldLmluZGV4T2YoJ2RhdGEtJykgPT09IDApLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGRhdGFzZXRbY2FtZWxDYXNlKGtleS5yZXBsYWNlKCdkYXRhLScsICcnKSldID0gZWxlbS5nZXRBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGFueSBleGlzdGluZyBkYXRhIGluIGNhY2hlIHRha2VzIHByZWNlZGVuY2Ugb3ZlciBkYXRhc2V0XG4gICAgICAgIHJldHVybiBkYXRhID0gYXNzaWduKHt9LCBkYXRhc2V0LCBkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiBhIHZhbHVlIGhhcyBhbHJlYWR5IGJlZW4gcGxhY2VkIGluIGNhY2hlIGZvciBwcm92aWRlZCBrZXlcbiAgICBpZiAodHlwZW9mIGRhdGFba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gY2hlY2sgZGF0YXNldCAob3IgYXR0cmlidXRlIGlmIGRhdGFzZXQgbm90IHN1cHBvcnRlZCkgYW5kIGF0dGVtcHQgdG8gc2V0IGNhY2hlIHZhbHVlXG4gICAgICAgIHJldHVybiBkYXRhW2tleV0gPSBlbGVtLmRhdGFzZXQgPyBlbGVtLmRhdGFzZXRba2V5XSA6IGVsZW0uZ2V0QXR0cmlidXRlKGBkYXRhLSR7a2ViYWJDYXNlKGtleSl9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGFba2V5XTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzc2lnbiguLi5vYmpzKSB7XG5cdHJldHVybiBvYmpzLnJlZHVjZSgocmVzLCBvYmopID0+IHtcblx0XHRpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgISFvYmopIHtcblx0XHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChwcm9wID0+IHJlc1twcm9wXSA9IG9ialtwcm9wXSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXM7XG5cdH0pO1xufVxuIiwidmFyIGRlYnVycmVkTGV0dGVycyA9IHtcblx0J1xceGMwJzogJ0EnLCAgJ1xceGMxJzogJ0EnLCAnXFx4YzInOiAnQScsICdcXHhjMyc6ICdBJywgJ1xceGM0JzogJ0EnLCAnXFx4YzUnOiAnQScsXG5cdCdcXHhlMCc6ICdhJywgICdcXHhlMSc6ICdhJywgJ1xceGUyJzogJ2EnLCAnXFx4ZTMnOiAnYScsICdcXHhlNCc6ICdhJywgJ1xceGU1JzogJ2EnLFxuXHQnXFx4YzcnOiAnQycsICAnXFx4ZTcnOiAnYycsXG5cdCdcXHhkMCc6ICdEJywgICdcXHhmMCc6ICdkJyxcblx0J1xceGM4JzogJ0UnLCAgJ1xceGM5JzogJ0UnLCAnXFx4Y2EnOiAnRScsICdcXHhjYic6ICdFJyxcblx0J1xceGU4JzogJ2UnLCAgJ1xceGU5JzogJ2UnLCAnXFx4ZWEnOiAnZScsICdcXHhlYic6ICdlJyxcblx0J1xceGNDJzogJ0knLCAgJ1xceGNkJzogJ0knLCAnXFx4Y2UnOiAnSScsICdcXHhjZic6ICdJJyxcblx0J1xceGVDJzogJ2knLCAgJ1xceGVkJzogJ2knLCAnXFx4ZWUnOiAnaScsICdcXHhlZic6ICdpJyxcblx0J1xceGQxJzogJ04nLCAgJ1xceGYxJzogJ24nLFxuXHQnXFx4ZDInOiAnTycsICAnXFx4ZDMnOiAnTycsICdcXHhkNCc6ICdPJywgJ1xceGQ1JzogJ08nLCAnXFx4ZDYnOiAnTycsICdcXHhkOCc6ICdPJyxcblx0J1xceGYyJzogJ28nLCAgJ1xceGYzJzogJ28nLCAnXFx4ZjQnOiAnbycsICdcXHhmNSc6ICdvJywgJ1xceGY2JzogJ28nLCAnXFx4ZjgnOiAnbycsXG5cdCdcXHhkOSc6ICdVJywgICdcXHhkYSc6ICdVJywgJ1xceGRiJzogJ1UnLCAnXFx4ZGMnOiAnVScsXG5cdCdcXHhmOSc6ICd1JywgICdcXHhmYSc6ICd1JywgJ1xceGZiJzogJ3UnLCAnXFx4ZmMnOiAndScsXG5cdCdcXHhkZCc6ICdZJywgICdcXHhmZCc6ICd5JywgJ1xceGZmJzogJ3knLFxuXHQnXFx4YzYnOiAnQWUnLCAnXFx4ZTYnOiAnYWUnLFxuXHQnXFx4ZGUnOiAnVGgnLCAnXFx4ZmUnOiAndGgnLFxuXHQnXFx4ZGYnOiAnc3MnXG59O1xuXG5mdW5jdGlvbiBkZWJ1cnJMZXR0ZXIobGV0dGVyKSB7XG5cdHJldHVybiBkZWJ1cnJlZExldHRlcnNbbGV0dGVyXTtcbn1cblxuZnVuY3Rpb24gZGVidXJyKHN0cmluZykge1xuICAgIHN0cmluZyA9IFN0cmluZyhzdHJpbmcpO1xuICAgIHJldHVybiBzdHJpbmcgJiYgc3RyaW5nXG4gICAgXHQucmVwbGFjZSgvW1xceGMwLVxceGQ2XFx4ZDgtXFx4ZGVcXHhkZi1cXHhmNlxceGY4LVxceGZmXS9nLCBkZWJ1cnJMZXR0ZXIpXG4gICAgXHQucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2ZlxcdWZlMjAtXFx1ZmUyM1xcdTIwZDAtXFx1MjBmMF0vZywgJycpO1xufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoL14oLikvLCBsID0+IGwudG9VcHBlckNhc2UoKSk7XG59XG5cbmZ1bmN0aW9uIHdvcmRzKHN0cmluZykge1xuXHRyZXR1cm4gZGVidXJyKHN0cmluZylcblx0XHQucmVwbGFjZSgvXFxzKihbQS1aXSkvZywgJyAkMScpXG5cdFx0LnJlcGxhY2UoL1tcXHMtXSsvZywgJyAnKVxuXHRcdC5zcGxpdCgnICcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxDYXNlKHN0cmluZykge1xuXHRyZXR1cm4gd29yZHMoc3RyaW5nKS5yZWR1Y2UoKHJlc3VsdCwgd29yZCwgaW5kZXgpID0+IHJlc3VsdCArIChpbmRleCA/IGNhcGl0YWxpemUod29yZC50b0xvd2VyQ2FzZSgpKSA6IHdvcmQudG9Mb3dlckNhc2UoKSksICcnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtlYmFiQ2FzZShzdHJpbmcpIHtcblx0cmV0dXJuIHdvcmRzKHN0cmluZykuam9pbignLScpLnRvTG93ZXJDYXNlKCk7XG59IiwiaW1wb3J0ICogYXMgdG9nZ2xlIGZyb20gJy4vaW5kZXgnO1xud2luZG93LnRvZ2dsZSA9IHRvZ2dsZTtcbiIsImltcG9ydCBhc3NpZ24gZnJvbSAnLi91dGlscy9hc3NpZ24nO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVFMgPSB7XG4gICAgc3RhdGU6ICdhY3RpdmUnLFxuICAgIGFmdGVyU3RhdGVDaGFuZ2U6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzO1xuICAgICAgICBncm91cC5vcHRzID0gYXNzaWduKHt9LCBERUZBVUxUUywgb3B0aW9ucyk7XG4gICAgICAgIGdyb3VwLnBhbmVscyA9IFtdO1xuICAgICAgICBncm91cC5hY3RpdmVQYW5lbCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBhZGRQYW5lbChwYW5lbCkge1xuICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzO1xuXG4gICAgICAgIGlmICghZ3JvdXAucGFuZWxzLnNvbWUocCA9PiBwID09PSBwYW5lbCkpIHtcbiAgICAgICAgICAgIGdyb3VwLnBhbmVscy5wdXNoKHBhbmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVQYW5lbChhY3RpdmVQYW5lbCkge1xuICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzO1xuICAgICAgICBpZiAoYWN0aXZlUGFuZWwgPT09IGdyb3VwLmFjdGl2ZVBhbmVsKSByZXR1cm4gZ3JvdXA7XG5cbiAgICAgICAgZ3JvdXAuYWN0aXZlUGFuZWwgPSBhY3RpdmVQYW5lbDtcbiAgICAgICAgZ3JvdXAucGFuZWxzLmZvckVhY2gocCA9PiBwID09PSBhY3RpdmVQYW5lbCB8fCBwLnNldFN0YXRlKGZhbHNlLCB0cnVlKSk7XG4gICAgICAgIGdyb3VwLmFmdGVyU3RhdGVDaGFuZ2UoKTtcblxuICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfVxuXG4gICAgcmVtb3ZlQWN0aXZhdGVQYW5lbCgpIHtcbiAgICAgICAgbGV0IGdyb3VwID0gdGhpcztcblxuICAgICAgICBncm91cC5hY3RpdmVQYW5lbCA9IGZhbHNlO1xuICAgICAgICBncm91cC5wYW5lbHMuZm9yRWFjaChwID0+IHAuc2V0U3RhdGUoZmFsc2UsIHRydWUpKTtcbiAgICAgICAgZ3JvdXAuYWZ0ZXJTdGF0ZUNoYW5nZSgpO1xuXG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICB9XG5cbiAgICBhZnRlclN0YXRlQ2hhbmdlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0cy5hZnRlclN0YXRlQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMuYWZ0ZXJTdGF0ZUNoYW5nZSh0aGlzLCAhIXRoaXMuYWN0aXZlUGFuZWwsIHRoaXMuYWN0aXZlUGFuZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLm9wdHMsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIEdyb3VwIH0gZnJvbSAnLi9ncm91cCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFBhbmVsIH0gZnJvbSAnLi9wYW5lbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRyaWdnZXIgfSBmcm9tICcuL3RyaWdnZXInO1xuIiwiaW1wb3J0IGFzc2lnbiBmcm9tICcuL3V0aWxzL2Fzc2lnbic7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi91dGlscy9zdGF0ZSc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUUyA9IHtcbiAgICBjYW5UdXJuU2VsZk9mZjogdHJ1ZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3IoZG9tLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYW5lbCA9IHRoaXM7XG5cbiAgICAgICAgcGFuZWwub3B0cyA9IGFzc2lnbih7fSwgREVGQVVMVFMsIG9wdGlvbnMpO1xuICAgICAgICBwYW5lbC5lbGVtID0gZG9tO1xuICAgICAgICBwYW5lbC50cmlnZ2VycyA9IFtdO1xuICAgICAgICBwYW5lbC5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICBwYW5lbC5ncm91cCA9IG9wdGlvbnMuZ3JvdXAuYWRkUGFuZWwocGFuZWwpO1xuICAgICAgICBwYW5lbC5zZXRTdGF0ZShzdGF0ZShwYW5lbC5lbGVtLCBwYW5lbC5ncm91cC5vcHRzLnN0YXRlKSB8fCAhISh3aW5kb3cubG9jYXRpb24uaGFzaCAmJiBkb20uaWQgPT09IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKSkpO1xuICAgIH1cblxuICAgIGFkZFRyaWdnZXIodHJpZ2dlcikge1xuICAgICAgICBsZXQgcGFuZWwgPSB0aGlzO1xuXG4gICAgICAgIGlmICghcGFuZWwudHJpZ2dlcnMuc29tZSh0ID0+IHQgPT09IHRyaWdnZXIpKSB7XG4gICAgICAgICAgICB0cmlnZ2VyLmluZGV4ID0gcGFuZWwudHJpZ2dlcnMubGVuZ3RoO1xuICAgICAgICAgICAgcGFuZWwudHJpZ2dlcnMucHVzaCh0cmlnZ2VyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYW5lbDtcbiAgICB9XG5cbiAgICByZW1vdmVUcmlnZ2VyKHRyaWdnZXIpIHtcbiAgICAgICAgbGV0IHBhbmVsID0gdGhpcztcblxuICAgICAgICBwYW5lbC50cmlnZ2Vycy5zcGxpY2UodHJpZ2dlci5pbmRleCwgMSk7XG5cbiAgICAgICAgcmV0dXJuIHBhbmVsO1xuICAgIH1cblxuICAgIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBhc3NpZ24odGhpcy5vcHRzLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoYWN0aXZlLCBjYWxsZWRCeUdyb3VwKSB7XG4gICAgICAgIGxldCBwYW5lbCA9IHRoaXM7XG5cbiAgICAgICAgYWN0aXZlID0gYWN0aXZlID09PSAndG9nZ2xlJyA/ICFwYW5lbC5zdGF0ZSA6IGFjdGl2ZTtcbiAgICAgICAgaWYgKGFjdGl2ZSAhPT0gcGFuZWwuc3RhdGUpIHtcbiAgICAgICAgICAgIHN0YXRlKHBhbmVsLmVsZW0sIHBhbmVsLmdyb3VwLm9wdHMuc3RhdGUsIHBhbmVsLnN0YXRlID0gYWN0aXZlKTtcbiAgICAgICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBwYW5lbC5ncm91cC5zZXRBY3RpdmVQYW5lbChwYW5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghY2FsbGVkQnlHcm91cCkge1xuICAgICAgICAgICAgICAgIHBhbmVsLmdyb3VwLnJlbW92ZUFjdGl2YXRlUGFuZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHBhbmVsLnRyaWdnZXJzLmZvckVhY2godCA9PiB0LnNldFN0YXRlKCkpO1xuXG4gICAgICAgIHJldHVybiBwYW5lbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgZGF0YSBmcm9tICdsZWdvLWRhdGEnO1xuaW1wb3J0IGFzc2lnbiBmcm9tICcuL3V0aWxzL2Fzc2lnbic7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi91dGlscy9zdGF0ZSc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUUyA9IHtcbiAgICBhY3RpdmVFdmVudDogJ2NsaWNrJyxcbiAgICBpbmFjdGl2ZUV2ZW50OiAnY2xpY2snXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmlnZ2VyIHtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW0sIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHRyaWdnZXIgPSBkYXRhKGVsZW0sICdfdHJpZ2dlcicpO1xuICAgICAgICBpZiAodHJpZ2dlciBpbnN0YW5jZW9mIFRyaWdnZXIpIHJldHVybiB0cmlnZ2VyO1xuXG4gICAgICAgIHRyaWdnZXIgPSB0aGlzO1xuICAgICAgICB0cmlnZ2VyLm9wdHMgPSBhc3NpZ24oe30sIERFRkFVTFRTLCBvcHRpb25zKTtcbiAgICAgICAgdHJpZ2dlci5lbGVtID0gZWxlbTtcbiAgICAgICAgdHJpZ2dlci5wYW5lbCA9IG9wdGlvbnMucGFuZWwuYWRkVHJpZ2dlcih0cmlnZ2VyKTtcbiAgICAgICAgdHJpZ2dlci5zZXRTdGF0ZSgpO1xuXG4gICAgICAgIGlmIChlbGVtLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2EnIHx8IGVsZW0udGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykge1xuICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKVxuICAgICAgICB9XG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0cmlnZ2VyLm9wdHMuYWN0aXZlRXZlbnQsIHRyaWdnZXIsIGZhbHNlKTtcblxuICAgICAgICBpZiAodHJpZ2dlci5vcHRzLmFjdGl2ZUV2ZW50ICE9PSB0cmlnZ2VyLm9wdHMuaW5hY3RpdmVFdmVudCkge1xuICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKHRyaWdnZXIub3B0cy5pbmFjdGl2ZUV2ZW50LCB0cmlnZ2VyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YShlbGVtLCAnX3RyaWdnZXInLCB0cmlnZ2VyKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZSgpIHtcbiAgICAgICAgbGV0IHRyaWdnZXIgPSB0aGlzO1xuXG4gICAgICAgIHN0YXRlKHRyaWdnZXIuZWxlbSwgdHJpZ2dlci5wYW5lbC5ncm91cC5vcHRzLnN0YXRlLCB0cmlnZ2VyLnBhbmVsLnN0YXRlKTtcblxuICAgICAgICByZXR1cm4gdHJpZ2dlcjtcbiAgICB9XG5cbiAgICBoYW5kbGVFdmVudChlKSB7XG4gICAgICAgIGxldCB0cmlnZ2VyID0gdGhpcztcbiAgICAgICAgaWYgKGUudHlwZSA9PT0gdHJpZ2dlci5vcHRzLmFjdGl2ZUV2ZW50ICYmICF0cmlnZ2VyLnBhbmVsLnN0YXRlKSB7XG4gICAgICAgICAgICBpZiAoZS50eXBlID09PSAnY2xpY2snICYmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSkgcmV0dXJuO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdHJpZ2dlci5wYW5lbC5zZXRTdGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlLnR5cGUgPT09IHRyaWdnZXIub3B0cy5pbmFjdGl2ZUV2ZW50ICYmIHRyaWdnZXIucGFuZWwuc3RhdGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRyaWdnZXIucGFuZWwuc2V0U3RhdGUoIXRyaWdnZXIucGFuZWwub3B0cy5jYW5UdXJuU2VsZk9mZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGxldCB0cmlnZ2VyID0gdGhpcztcblxuICAgICAgICB0cmlnZ2VyLnBhbmVsLnJlbW92ZVRyaWdnZXIodHJpZ2dlcik7XG4gICAgICAgIHRyaWdnZXIuZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKHRyaWdnZXIub3B0cy5hY3RpdmVFdmVudCwgdHJpZ2dlcik7XG4gICAgICAgIGlmICh0cmlnZ2VyLm9wdHMuYWN0aXZlRXZlbnQgIT09IHRyaWdnZXIub3B0cy5pbmFjdGl2ZUV2ZW50KSB7XG4gICAgICAgICAgICB0cmlnZ2VyLmVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0cmlnZ2VyLm9wdHMuaW5hY3RpdmVFdmVudCwgdHJpZ2dlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJpZ2dlcjtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBsZXQgdHJpZ2dlciA9IHRoaXM7XG5cbiAgICAgICAgdHJpZ2dlci5kZXRhY2goKTtcbiAgICAgICAgdHJpZ2dlci5lbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodHJpZ2dlci5lbGVtKTtcblxuICAgICAgICByZXR1cm4gdHJpZ2dlcjtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3NpZ24oLi4ub2Jqcykge1xuXHRyZXR1cm4gb2Jqcy5yZWR1Y2UoKHJlcywgb2JqKSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICEhb2JqKSB7XG5cdFx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2gocHJvcCA9PiByZXNbcHJvcF0gPSBvYmpbcHJvcF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzO1xuXHR9KTtcbn1cbiIsImZ1bmN0aW9uIGhhc0NsYXNzSW5MaXN0KCBlbGVtLCBjICkge1xuXHRyZXR1cm4gZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoIGMgKTtcbn1cblxuZnVuY3Rpb24gYWRkQ2xhc3NJbkxpc3QoIGVsZW0sIGMgKSB7XG5cdGVsZW0uY2xhc3NMaXN0LmFkZCggYyApO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzc0luTGlzdCggZWxlbSwgYyApIHtcblx0ZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCBjICk7XG59XG5cbmZ1bmN0aW9uIGhhc0NsYXNzSW5OYW1lKCBlbGVtLCBjICkge1xuXHRyZXR1cm4gYCAkeyBlbGVtLmNsYXNzTmFtZSB9IGAuaW5kZXhPZiggYCAkeyBjIH0gYCApID4gLTE7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzSW5OYW1lKCBlbGVtLCBjICkge1xuXHRpZiAoICFoYXNDbGFzc0luTmFtZSggZWxlbSwgYyApICkge1xuXHRcdGVsZW0uY2xhc3NOYW1lID0gYCR7ZWxlbS5jbGFzc05hbWV9ICR7Y31gO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzSW5OYW1lKCBlbGVtLCBjICkge1xuXHRlbGVtLmNsYXNzTmFtZSA9IGAgJHsgZWxlbS5jbGFzc05hbWUgfSBgLnJlcGxhY2UoIG5ldyBSZWdFeHAoIGAgJHsgYyB9IGAsICdnJyApLCAnICcgKS50cmltKCk7XG59XG5cbmNvbnN0IExJU1RfU1VQUE9SVCA9ICdjbGFzc0xpc3QnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuY29uc3QgY2xhc3NpZSA9IHtcblx0aGFzOiBMSVNUX1NVUFBPUlQgPyBoYXNDbGFzc0luTGlzdCA6IGhhc0NsYXNzSW5OYW1lLFxuXHRhZGQ6IExJU1RfU1VQUE9SVCA/IGFkZENsYXNzSW5MaXN0IDogYWRkQ2xhc3NJbk5hbWUsXG5cdHJlbW92ZTogTElTVF9TVVBQT1JUID8gcmVtb3ZlQ2xhc3NJbkxpc3QgOiByZW1vdmVDbGFzc0luTmFtZSxcblx0dG9nZ2xlOiBmdW5jdGlvbiAoIGVsZW0sIGMgKSB7XG5cdFx0aWYgKCAhdGhpcy5oYXMoIGVsZW0sIGMgKSApIHtcblx0XHRcdHRoaXMuYWRkKCBlbGVtLCBjICk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5yZW1vdmUoIGVsZW0sIGMgKTtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXRlKGVsZW0sIGNsYXNzTmFtZSwgYWN0aXZlKSB7XG5cblx0aWYgKHR5cGVvZiBhY3RpdmUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIGNsYXNzaWUuaGFzKGVsZW0sIGBpcy0ke2NsYXNzTmFtZX1gKTtcblx0fVxuXG5cdHZhciBzZXJ2aWNlID0gYWN0aXZlID09PSAndG9nZ2xlJyA/ICd0b2dnbGUnIDogYWN0aXZlID8gJ2FkZCcgOiAncmVtb3ZlJztcblxuXHRjbGFzc2llW3NlcnZpY2VdKGVsZW0sIGBpcy0ke2NsYXNzTmFtZX1gKTtcblx0cmV0dXJuICEhYWN0aXZlO1xufVxuIl19
