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

var classie = {
    has: function has(elem, c) {
        if (!elem || !c) return false;
        return 'classList' in elem ? hasClassInList(elem, c) : hasClassInName(elem, c);
    },
    add: function add(elem, c) {
        if (!elem || !c) return;
        return 'classList' in elem ? addClassInList(elem, c) : addClassInName(elem, c);
    },
    remove: function remove(elem, c) {
        if (!elem || !c) return;
        return 'classList' in elem ? removeClassInList(elem, c) : removeClassInName(elem, c);
    },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbGVnby1kYXRhL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sZWdvLWRhdGEvc3JjL3V0aWxzL2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9sZWdvLWRhdGEvc3JjL3V0aWxzL3N0cmluZy5qcyIsInNyYy9lczUtdG9nZ2xlLmpzIiwic3JjL2dyb3VwLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3BhbmVsLmpzIiwic3JjL3RyaWdnZXIuanMiLCJzcmMvdXRpbHMvYXNzaWduLmpzIiwic3JjL3V0aWxzL3N0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O2tCQ0tlLFVBQVUsSUFBVixFQUFnQixHQUFoQixFQUFxQixLQUFyQixFQUE0Qjs7QUFFdkMsUUFBSSxDQUFDLElBQUQsRUFBTyxPQUFYOzs7QUFGdUMsUUFLbkMsT0FBTyxLQUFLLFFBQUwsSUFBaUIsS0FBSyxRQUFMLEtBQWtCLEVBQWxCOzs7QUFMVyxRQVFuQyxRQUFPLGlEQUFQLEtBQWUsUUFBZixFQUF5QjtBQUN6QixlQUFPLHNCQUFPLElBQVAsRUFBYSxHQUFiLENBQVAsQ0FEeUI7S0FBN0I7OztBQVJ1QyxRQWFuQyxPQUFPLEtBQVAsS0FBaUIsV0FBakIsRUFBOEI7QUFDOUIsZUFBTyxLQUFLLEdBQUwsSUFBWSxLQUFaLENBRHVCO0tBQWxDOzs7QUFidUMsUUFrQm5DLE9BQU8sR0FBUCxLQUFlLFdBQWYsRUFBNEI7OztBQUU1QixnQkFBSSxLQUFLLFFBQUwsTUFBbUIsSUFBbkIsRUFBeUI7dUJBQU87aUJBQVAsQ0FBN0I7QUFDQSxpQkFBSyxRQUFMLElBQWlCLElBQWpCOzs7QUFHQSxnQkFBSSxLQUFLLE9BQUwsRUFBYzs7QUFFZDt1QkFBTyxPQUFPLHNCQUFPLEVBQVAsRUFBVyxLQUFLLE9BQUwsRUFBYyxJQUF6QixD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S0FBSyxlQUFBLEFBQWUsTUFGckUsQUFBcUIsQUFFZixBQUFnRCxBQUFxQixBQUVoRjtLQUpLOzRCQUlHLEFBQVcsTUFBWCxBQUFpQixHQUFJLEFBQ3pCO1lBQUssQ0FBQSxBQUFDLFFBQVEsQ0FBQSxBQUFDLEdBQWYsQUFBbUIsQUFDbkI7ZUFBTyxlQUFBLEFBQWUsT0FBTyxrQkFBQSxBQUFrQixNQUF4QyxBQUFzQixBQUF3QixLQUFLLGtCQUFBLEFBQWtCLE1BRnhFLEFBQXFCLEFBRWxCLEFBQW1ELEFBQXdCLEFBRXRGO0tBSlE7NEJBSUEsQUFBVyxNQUFYLEFBQWlCLEdBQUksQUFDekI7WUFBSyxDQUFDLEtBQUEsQUFBSyxJQUFMLEFBQVUsTUFBWCxBQUFDLEFBQWdCO2lCQUNsQixBQUFLLElBQUwsQUFBVSxNQURkLEFBQTRCLEFBQ3hCLEFBQWdCLEdBRFEsQUFDeEI7ZUFFQyxBQUNEO2lCQUFBLEFBQUssT0FBTCxBQUFhLE1BbEJuQixBQWFNLEFBQ0osQUFHSyxBQUNELEFBQW1COztLQUxuQjtDQWJOOztBQXVCUyxTQUFBLEFBQVMsTUFBVCxBQUFlLE1BQWYsQUFBcUIsV0FBckIsQUFBZ0M7O1FBRXZDLE9BQUEsQUFBTyxXQUFQLEFBQWtCLGFBQWEsQUFDL0I7ZUFBTyxRQUFBLEFBQVEsSUFBUixBQUFZLGNBRHZCLEFBQW1DLEFBQy9CLEFBQU8sQUFBd0IsQUFHbkM7OztRQUFJLFVBQVUsV0FBQSxBQUFXLFdBQVgsQUFBc0IsV0FBVyxTQUFBLEFBQVMsUUFOTCxBQU1KLEFBQWlCLEFBRWhFOztZQUFBLEFBQVEsU0FBUixBQUFpQixjQVJrQyxBQVFuRCxBQUE2QixBQUM3QjtXQUFPLENBQUMsQ0FURyxBQUF3QyxBQVMzQyxBQUFDLE9BVDBDLEFBRW5EIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBhc3NpZ24gZnJvbSAnLi91dGlscy9hc3NpZ24nO1xuaW1wb3J0IHsgY2FtZWxDYXNlLCBrZWJhYkNhc2UgfSBmcm9tICcuL3V0aWxzL3N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBEQVRBX0tFWSA9IFN5bWJvbCAmJiBTeW1ib2woJ2RhdGEnKSB8fCAnX19VTklPTl9fYXBwRGF0YUtleSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChlbGVtLCBrZXksIHZhbHVlKSB7XG4gICAgLy8gZGllIGlmIGVsZW0gbnVsbFxuICAgIGlmICghZWxlbSkgcmV0dXJuO1xuXG4gICAgLy8gZ2V0IGRhdGEgY2FjaGVcbiAgICBsZXQgZGF0YSA9IGVsZW1bREFUQV9LRVldID0gZWxlbVtEQVRBX0tFWV0gfHwge307XG5cbiAgICAvLyBhc3NpZ24gbXVsdGlwbGUgdmFsdWVzIHRvIGNhY2hlIGlmIGtleSBpcyBhbiBvYmplY3RcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGFzc2lnbihkYXRhLCBrZXkpO1xuICAgIH1cblxuICAgIC8vIHNldCB2YWx1ZSBpZiB2YWx1ZSBpcyBkZWZpbmVkXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGdldCBhbGwgZGF0YSB2YWx1ZXMgaWYga2V5IGlzIG5vdCBkZWZpbmVkXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIGlmIGRhdGFzZXQgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQsIHJldHVybiBkYXRhIGNhY2hlXG4gICAgICAgIGlmIChkYXRhW0RBVEFfS0VZXSA9PT0gdHJ1ZSkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGFbREFUQV9LRVldID0gdHJ1ZTtcblxuICAgICAgICAvLyB1c2UgbmF0aXZlIGRhdGFzZXQgaWYgc3VwcG9ydGVkXG4gICAgICAgIGlmIChlbGVtLmRhdGFzZXQpIHtcbiAgICAgICAgICAgIC8vIGFueSBleGlzdGluZyBkYXRhIGluIGNhY2hlIHRha2VzIHByZWNlZGVuY2Ugb3ZlciBkYXRhc2V0XG4gICAgICAgICAgICByZXR1cm4gZGF0YSA9IGFzc2lnbih7fSwgZWxlbS5kYXRhc2V0LCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmQgZWxlbWVudCBhdHRyaWJ1dGVzIHRoYXQgc3RhcnQgd2l0aCAnZGF0YS0nIGFuZCBhc3NpZ24gdGhlaXIgdmFsdWUgdG8gZGF0YSBjYWNoZSB3aXRoIGEgY2FtZWxDYXNlIGtleVxuICAgICAgICBsZXQgZGF0YXNldCA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhlbGVtLmF0dHJpYnV0ZXMpLmZpbHRlcihrZXkgPT4gZWxlbS5hdHRyaWJ1dGVzW2tleV0uaW5kZXhPZignZGF0YS0nKSA9PT0gMCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgZGF0YXNldFtjYW1lbENhc2Uoa2V5LnJlcGxhY2UoJ2RhdGEtJywgJycpKV0gPSBlbGVtLmdldEF0dHJpYnV0ZShrZXkpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gYW55IGV4aXN0aW5nIGRhdGEgaW4gY2FjaGUgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGRhdGFzZXRcbiAgICAgICAgcmV0dXJuIGRhdGEgPSBhc3NpZ24oe30sIGRhdGFzZXQsIGRhdGEpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGEgdmFsdWUgaGFzIGFscmVhZHkgYmVlbiBwbGFjZWQgaW4gY2FjaGUgZm9yIHByb3ZpZGVkIGtleVxuICAgIGlmICh0eXBlb2YgZGF0YVtrZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBjaGVjayBkYXRhc2V0IChvciBhdHRyaWJ1dGUgaWYgZGF0YXNldCBub3Qgc3VwcG9ydGVkKSBhbmQgYXR0ZW1wdCB0byBzZXQgY2FjaGUgdmFsdWVcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XSA9IGVsZW0uZGF0YXNldCA/IGVsZW0uZGF0YXNldFtrZXldIDogZWxlbS5nZXRBdHRyaWJ1dGUoYGRhdGEtJHtrZWJhYkNhc2Uoa2V5KX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YVtrZXldO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXNzaWduKC4uLm9ianMpIHtcblx0cmV0dXJuIG9ianMucmVkdWNlKChyZXMsIG9iaikgPT4ge1xuXHRcdGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhIW9iaikge1xuXHRcdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKHByb3AgPT4gcmVzW3Byb3BdID0gb2JqW3Byb3BdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcztcblx0fSk7XG59XG4iLCJ2YXIgZGVidXJyZWRMZXR0ZXJzID0ge1xuXHQnXFx4YzAnOiAnQScsICAnXFx4YzEnOiAnQScsICdcXHhjMic6ICdBJywgJ1xceGMzJzogJ0EnLCAnXFx4YzQnOiAnQScsICdcXHhjNSc6ICdBJyxcblx0J1xceGUwJzogJ2EnLCAgJ1xceGUxJzogJ2EnLCAnXFx4ZTInOiAnYScsICdcXHhlMyc6ICdhJywgJ1xceGU0JzogJ2EnLCAnXFx4ZTUnOiAnYScsXG5cdCdcXHhjNyc6ICdDJywgICdcXHhlNyc6ICdjJyxcblx0J1xceGQwJzogJ0QnLCAgJ1xceGYwJzogJ2QnLFxuXHQnXFx4YzgnOiAnRScsICAnXFx4YzknOiAnRScsICdcXHhjYSc6ICdFJywgJ1xceGNiJzogJ0UnLFxuXHQnXFx4ZTgnOiAnZScsICAnXFx4ZTknOiAnZScsICdcXHhlYSc6ICdlJywgJ1xceGViJzogJ2UnLFxuXHQnXFx4Y0MnOiAnSScsICAnXFx4Y2QnOiAnSScsICdcXHhjZSc6ICdJJywgJ1xceGNmJzogJ0knLFxuXHQnXFx4ZUMnOiAnaScsICAnXFx4ZWQnOiAnaScsICdcXHhlZSc6ICdpJywgJ1xceGVmJzogJ2knLFxuXHQnXFx4ZDEnOiAnTicsICAnXFx4ZjEnOiAnbicsXG5cdCdcXHhkMic6ICdPJywgICdcXHhkMyc6ICdPJywgJ1xceGQ0JzogJ08nLCAnXFx4ZDUnOiAnTycsICdcXHhkNic6ICdPJywgJ1xceGQ4JzogJ08nLFxuXHQnXFx4ZjInOiAnbycsICAnXFx4ZjMnOiAnbycsICdcXHhmNCc6ICdvJywgJ1xceGY1JzogJ28nLCAnXFx4ZjYnOiAnbycsICdcXHhmOCc6ICdvJyxcblx0J1xceGQ5JzogJ1UnLCAgJ1xceGRhJzogJ1UnLCAnXFx4ZGInOiAnVScsICdcXHhkYyc6ICdVJyxcblx0J1xceGY5JzogJ3UnLCAgJ1xceGZhJzogJ3UnLCAnXFx4ZmInOiAndScsICdcXHhmYyc6ICd1Jyxcblx0J1xceGRkJzogJ1knLCAgJ1xceGZkJzogJ3knLCAnXFx4ZmYnOiAneScsXG5cdCdcXHhjNic6ICdBZScsICdcXHhlNic6ICdhZScsXG5cdCdcXHhkZSc6ICdUaCcsICdcXHhmZSc6ICd0aCcsXG5cdCdcXHhkZic6ICdzcydcbn07XG5cbmZ1bmN0aW9uIGRlYnVyckxldHRlcihsZXR0ZXIpIHtcblx0cmV0dXJuIGRlYnVycmVkTGV0dGVyc1tsZXR0ZXJdO1xufVxuXG5mdW5jdGlvbiBkZWJ1cnIoc3RyaW5nKSB7XG4gICAgc3RyaW5nID0gU3RyaW5nKHN0cmluZyk7XG4gICAgcmV0dXJuIHN0cmluZyAmJiBzdHJpbmdcbiAgICBcdC5yZXBsYWNlKC9bXFx4YzAtXFx4ZDZcXHhkOC1cXHhkZVxceGRmLVxceGY2XFx4ZjgtXFx4ZmZdL2csIGRlYnVyckxldHRlcilcbiAgICBcdC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXFx1ZmUyMC1cXHVmZTIzXFx1MjBkMC1cXHUyMGYwXS9nLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZSgvXiguKS8sIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gd29yZHMoc3RyaW5nKSB7XG5cdHJldHVybiBkZWJ1cnIoc3RyaW5nKVxuXHRcdC5yZXBsYWNlKC9cXHMqKFtBLVpdKS9nLCAnICQxJylcblx0XHQucmVwbGFjZSgvW1xccy1dKy9nLCAnICcpXG5cdFx0LnNwbGl0KCcgJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2Uoc3RyaW5nKSB7XG5cdHJldHVybiB3b3JkcyhzdHJpbmcpLnJlZHVjZSgocmVzdWx0LCB3b3JkLCBpbmRleCkgPT4gcmVzdWx0ICsgKGluZGV4ID8gY2FwaXRhbGl6ZSh3b3JkLnRvTG93ZXJDYXNlKCkpIDogd29yZC50b0xvd2VyQ2FzZSgpKSwgJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga2ViYWJDYXNlKHN0cmluZykge1xuXHRyZXR1cm4gd29yZHMoc3RyaW5nKS5qb2luKCctJykudG9Mb3dlckNhc2UoKTtcbn0iLCJpbXBvcnQgKiBhcyB0b2dnbGUgZnJvbSAnLi9pbmRleCc7XG53aW5kb3cudG9nZ2xlID0gdG9nZ2xlO1xuIiwiaW1wb3J0IGFzc2lnbiBmcm9tICcuL3V0aWxzL2Fzc2lnbic7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUUyA9IHtcbiAgICBzdGF0ZTogJ2FjdGl2ZScsXG4gICAgYWZ0ZXJTdGF0ZUNoYW5nZTogdW5kZWZpbmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGxldCBncm91cCA9IHRoaXM7XG4gICAgICAgIGdyb3VwLm9wdHMgPSBhc3NpZ24oe30sIERFRkFVTFRTLCBvcHRpb25zKTtcbiAgICAgICAgZ3JvdXAucGFuZWxzID0gW107XG4gICAgICAgIGdyb3VwLmFjdGl2ZVBhbmVsID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGFkZFBhbmVsKHBhbmVsKSB7XG4gICAgICAgIGxldCBncm91cCA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFncm91cC5wYW5lbHMuc29tZShwID0+IHAgPT09IHBhbmVsKSkge1xuICAgICAgICAgICAgZ3JvdXAucGFuZWxzLnB1c2gocGFuZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVBhbmVsKGFjdGl2ZVBhbmVsKSB7XG4gICAgICAgIGxldCBncm91cCA9IHRoaXM7XG4gICAgICAgIGlmIChhY3RpdmVQYW5lbCA9PT0gZ3JvdXAuYWN0aXZlUGFuZWwpIHJldHVybiBncm91cDtcblxuICAgICAgICBncm91cC5hY3RpdmVQYW5lbCA9IGFjdGl2ZVBhbmVsO1xuICAgICAgICBncm91cC5wYW5lbHMuZm9yRWFjaChwID0+IHAgPT09IGFjdGl2ZVBhbmVsIHx8IHAuc2V0U3RhdGUoZmFsc2UsIHRydWUpKTtcbiAgICAgICAgZ3JvdXAuYWZ0ZXJTdGF0ZUNoYW5nZSgpO1xuXG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICB9XG5cbiAgICByZW1vdmVBY3RpdmF0ZVBhbmVsKCkge1xuICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzO1xuXG4gICAgICAgIGdyb3VwLmFjdGl2ZVBhbmVsID0gZmFsc2U7XG4gICAgICAgIGdyb3VwLnBhbmVscy5mb3JFYWNoKHAgPT4gcC5zZXRTdGF0ZShmYWxzZSwgdHJ1ZSkpO1xuICAgICAgICBncm91cC5hZnRlclN0YXRlQ2hhbmdlKCk7XG5cbiAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgIH1cblxuICAgIGFmdGVyU3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLmFmdGVyU3RhdGVDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMub3B0cy5hZnRlclN0YXRlQ2hhbmdlKHRoaXMsICEhdGhpcy5hY3RpdmVQYW5lbCwgdGhpcy5hY3RpdmVQYW5lbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgYXNzaWduKHRoaXMub3B0cywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgR3JvdXAgfSBmcm9tICcuL2dyb3VwJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGFuZWwgfSBmcm9tICcuL3BhbmVsJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHJpZ2dlciB9IGZyb20gJy4vdHJpZ2dlcic7XG4iLCJpbXBvcnQgYXNzaWduIGZyb20gJy4vdXRpbHMvYXNzaWduJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuL3V0aWxzL3N0YXRlJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRTID0ge1xuICAgIGNhblR1cm5TZWxmT2ZmOiB0cnVlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihkb20sIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhbmVsID0gdGhpcztcblxuICAgICAgICBwYW5lbC5vcHRzID0gYXNzaWduKHt9LCBERUZBVUxUUywgb3B0aW9ucyk7XG4gICAgICAgIHBhbmVsLmVsZW0gPSBkb207XG4gICAgICAgIHBhbmVsLnRyaWdnZXJzID0gW107XG4gICAgICAgIHBhbmVsLnN0YXRlID0gZmFsc2U7XG4gICAgICAgIHBhbmVsLmdyb3VwID0gb3B0aW9ucy5ncm91cC5hZGRQYW5lbChwYW5lbCk7XG4gICAgICAgIHBhbmVsLnNldFN0YXRlKHN0YXRlKHBhbmVsLmVsZW0sIHBhbmVsLmdyb3VwLm9wdHMuc3RhdGUpIHx8ICEhKHdpbmRvdy5sb2NhdGlvbi5oYXNoICYmIGRvbS5pZCA9PT0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKSk7XG4gICAgfVxuXG4gICAgYWRkVHJpZ2dlcih0cmlnZ2VyKSB7XG4gICAgICAgIGxldCBwYW5lbCA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFwYW5lbC50cmlnZ2Vycy5zb21lKHQgPT4gdCA9PT0gdHJpZ2dlcikpIHtcbiAgICAgICAgICAgIHRyaWdnZXIuaW5kZXggPSBwYW5lbC50cmlnZ2Vycy5sZW5ndGg7XG4gICAgICAgICAgICBwYW5lbC50cmlnZ2Vycy5wdXNoKHRyaWdnZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhbmVsO1xuICAgIH1cblxuICAgIHJlbW92ZVRyaWdnZXIodHJpZ2dlcikge1xuICAgICAgICBsZXQgcGFuZWwgPSB0aGlzO1xuXG4gICAgICAgIHBhbmVsLnRyaWdnZXJzLnNwbGljZSh0cmlnZ2VyLmluZGV4LCAxKTtcblxuICAgICAgICByZXR1cm4gcGFuZWw7XG4gICAgfVxuXG4gICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLm9wdHMsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShhY3RpdmUsIGNhbGxlZEJ5R3JvdXApIHtcbiAgICAgICAgbGV0IHBhbmVsID0gdGhpcztcblxuICAgICAgICBhY3RpdmUgPSBhY3RpdmUgPT09ICd0b2dnbGUnID8gIXBhbmVsLnN0YXRlIDogYWN0aXZlO1xuICAgICAgICBpZiAoYWN0aXZlICE9PSBwYW5lbC5zdGF0ZSkge1xuICAgICAgICAgICAgc3RhdGUocGFuZWwuZWxlbSwgcGFuZWwuZ3JvdXAub3B0cy5zdGF0ZSwgcGFuZWwuc3RhdGUgPSBhY3RpdmUpO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHBhbmVsLmdyb3VwLnNldEFjdGl2ZVBhbmVsKHBhbmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFjYWxsZWRCeUdyb3VwKSB7XG4gICAgICAgICAgICAgICAgcGFuZWwuZ3JvdXAucmVtb3ZlQWN0aXZhdGVQYW5lbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcGFuZWwudHJpZ2dlcnMuZm9yRWFjaCh0ID0+IHQuc2V0U3RhdGUoKSk7XG5cbiAgICAgICAgcmV0dXJuIHBhbmVsO1xuICAgIH1cbn1cbiIsImltcG9ydCBkYXRhIGZyb20gJ2xlZ28tZGF0YSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy4vdXRpbHMvYXNzaWduJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuL3V0aWxzL3N0YXRlJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRTID0ge1xuICAgIGFjdGl2ZUV2ZW50OiAnY2xpY2snLFxuICAgIGluYWN0aXZlRXZlbnQ6ICdjbGljaydcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyaWdnZXIge1xuXG4gICAgY29uc3RydWN0b3IoZWxlbSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgdHJpZ2dlciA9IGRhdGEoZWxlbSwgJ190cmlnZ2VyJyk7XG4gICAgICAgIGlmICh0cmlnZ2VyIGluc3RhbmNlb2YgVHJpZ2dlcikgcmV0dXJuIHRyaWdnZXI7XG5cbiAgICAgICAgdHJpZ2dlciA9IHRoaXM7XG4gICAgICAgIHRyaWdnZXIub3B0cyA9IGFzc2lnbih7fSwgREVGQVVMVFMsIG9wdGlvbnMpO1xuICAgICAgICB0cmlnZ2VyLmVsZW0gPSBlbGVtO1xuICAgICAgICB0cmlnZ2VyLnBhbmVsID0gb3B0aW9ucy5wYW5lbC5hZGRUcmlnZ2VyKHRyaWdnZXIpO1xuICAgICAgICB0cmlnZ2VyLnNldFN0YXRlKCk7XG5cbiAgICAgICAgaWYgKGVsZW0udGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYScgfHwgZWxlbS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdidXR0b24nKSB7XG4gICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpXG4gICAgICAgIH1cbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKHRyaWdnZXIub3B0cy5hY3RpdmVFdmVudCwgdHJpZ2dlciwgZmFsc2UpO1xuXG4gICAgICAgIGlmICh0cmlnZ2VyLm9wdHMuYWN0aXZlRXZlbnQgIT09IHRyaWdnZXIub3B0cy5pbmFjdGl2ZUV2ZW50KSB7XG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIodHJpZ2dlci5vcHRzLmluYWN0aXZlRXZlbnQsIHRyaWdnZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhKGVsZW0sICdfdHJpZ2dlcicsIHRyaWdnZXIpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKCkge1xuICAgICAgICBsZXQgdHJpZ2dlciA9IHRoaXM7XG5cbiAgICAgICAgc3RhdGUodHJpZ2dlci5lbGVtLCB0cmlnZ2VyLnBhbmVsLmdyb3VwLm9wdHMuc3RhdGUsIHRyaWdnZXIucGFuZWwuc3RhdGUpO1xuXG4gICAgICAgIHJldHVybiB0cmlnZ2VyO1xuICAgIH1cblxuICAgIGhhbmRsZUV2ZW50KGUpIHtcbiAgICAgICAgbGV0IHRyaWdnZXIgPSB0aGlzO1xuICAgICAgICBpZiAoZS50eXBlID09PSB0cmlnZ2VyLm9wdHMuYWN0aXZlRXZlbnQgJiYgIXRyaWdnZXIucGFuZWwuc3RhdGUpIHtcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT09ICdjbGljaycgJiYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpKSByZXR1cm47XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0cmlnZ2VyLnBhbmVsLnNldFN0YXRlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGUudHlwZSA9PT0gdHJpZ2dlci5vcHRzLmluYWN0aXZlRXZlbnQgJiYgdHJpZ2dlci5wYW5lbC5zdGF0ZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdHJpZ2dlci5wYW5lbC5zZXRTdGF0ZSghdHJpZ2dlci5wYW5lbC5vcHRzLmNhblR1cm5TZWxmT2ZmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRldGFjaCgpIHtcbiAgICAgICAgbGV0IHRyaWdnZXIgPSB0aGlzO1xuXG4gICAgICAgIHRyaWdnZXIucGFuZWwucmVtb3ZlVHJpZ2dlcih0cmlnZ2VyKTtcbiAgICAgICAgdHJpZ2dlci5lbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIodHJpZ2dlci5vcHRzLmFjdGl2ZUV2ZW50LCB0cmlnZ2VyKTtcbiAgICAgICAgaWYgKHRyaWdnZXIub3B0cy5hY3RpdmVFdmVudCAhPT0gdHJpZ2dlci5vcHRzLmluYWN0aXZlRXZlbnQpIHtcbiAgICAgICAgICAgIHRyaWdnZXIuZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKHRyaWdnZXIub3B0cy5pbmFjdGl2ZUV2ZW50LCB0cmlnZ2VyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cmlnZ2VyO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGxldCB0cmlnZ2VyID0gdGhpcztcblxuICAgICAgICB0cmlnZ2VyLmRldGFjaCgpO1xuICAgICAgICB0cmlnZ2VyLmVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0cmlnZ2VyLmVsZW0pO1xuXG4gICAgICAgIHJldHVybiB0cmlnZ2VyO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzc2lnbiguLi5vYmpzKSB7XG5cdHJldHVybiBvYmpzLnJlZHVjZSgocmVzLCBvYmopID0+IHtcblx0XHRpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgISFvYmopIHtcblx0XHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChwcm9wID0+IHJlc1twcm9wXSA9IG9ialtwcm9wXSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXM7XG5cdH0pO1xufVxuIiwiZnVuY3Rpb24gaGFzQ2xhc3NJbkxpc3QoIGVsZW0sIGMgKSB7XG4gICAgcmV0dXJuIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCBjICk7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzSW5MaXN0KCBlbGVtLCBjICkge1xuICAgIGVsZW0uY2xhc3NMaXN0LmFkZCggYyApO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzc0luTGlzdCggZWxlbSwgYyApIHtcbiAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoIGMgKTtcbn1cblxuZnVuY3Rpb24gaGFzQ2xhc3NJbk5hbWUoIGVsZW0sIGMgKSB7XG4gICAgcmV0dXJuIGAgJHsgZWxlbS5jbGFzc05hbWUgfSBgLmluZGV4T2YoIGAgJHsgYyB9IGAgKSA+IC0xO1xufVxuXG5mdW5jdGlvbiBhZGRDbGFzc0luTmFtZSggZWxlbSwgYyApIHtcbiAgICBpZiAoICFoYXNDbGFzc0luTmFtZSggZWxlbSwgYyApICkge1xuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGAke2VsZW0uY2xhc3NOYW1lfSAke2N9YDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzSW5OYW1lKCBlbGVtLCBjICkge1xuICAgIGVsZW0uY2xhc3NOYW1lID0gYCAkeyBlbGVtLmNsYXNzTmFtZSB9IGAucmVwbGFjZSggbmV3IFJlZ0V4cCggYCAkeyBjIH0gYCwgJ2cnICksICcgJyApLnRyaW0oKTtcbn1cblxuY29uc3QgY2xhc3NpZSA9IHtcbiAgICBoYXM6IGZ1bmN0aW9uICggZWxlbSwgYyApIHtcbiAgICAgICAgaWYgKCAhZWxlbSB8fCAhYyApIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuICdjbGFzc0xpc3QnIGluIGVsZW0gPyBoYXNDbGFzc0luTGlzdChlbGVtLCBjKSA6IGhhc0NsYXNzSW5OYW1lKGVsZW0sIGMpO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbiAoIGVsZW0sIGMgKSB7XG4gICAgICAgIGlmICggIWVsZW0gfHwgIWMgKSByZXR1cm47XG4gICAgICAgIHJldHVybiAnY2xhc3NMaXN0JyBpbiBlbGVtID8gYWRkQ2xhc3NJbkxpc3QoZWxlbSwgYykgOiBhZGRDbGFzc0luTmFtZShlbGVtLCBjKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gKCBlbGVtLCBjICkge1xuICAgICAgICBpZiAoICFlbGVtIHx8ICFjICkgcmV0dXJuO1xuICAgICAgICByZXR1cm4gJ2NsYXNzTGlzdCcgaW4gZWxlbSA/IHJlbW92ZUNsYXNzSW5MaXN0KGVsZW0sIGMpIDogcmVtb3ZlQ2xhc3NJbk5hbWUoZWxlbSwgYyk7XG4gICAgICAgIH0sXG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAoIGVsZW0sIGMgKSB7XG4gICAgICAgIGlmICggIXRoaXMuaGFzKCBlbGVtLCBjICkgKSB7XG4gICAgICAgICAgICB0aGlzLmFkZCggZWxlbSwgYyApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoIGVsZW0sIGMgKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXRlKGVsZW0sIGNsYXNzTmFtZSwgYWN0aXZlKSB7XG5cbiAgICBpZiAodHlwZW9mIGFjdGl2ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzaWUuaGFzKGVsZW0sIGBpcy0ke2NsYXNzTmFtZX1gKTtcbiAgICB9XG5cbiAgICB2YXIgc2VydmljZSA9IGFjdGl2ZSA9PT0gJ3RvZ2dsZScgPyAndG9nZ2xlJyA6IGFjdGl2ZSA/ICdhZGQnIDogJ3JlbW92ZSc7XG5cbiAgICBjbGFzc2llW3NlcnZpY2VdKGVsZW0sIGBpcy0ke2NsYXNzTmFtZX1gKTtcbiAgICByZXR1cm4gISFhY3RpdmU7XG59XG4iXX0=
