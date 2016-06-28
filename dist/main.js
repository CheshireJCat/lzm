/*
 * by zhangxinxu(.com) on 2013-12-11
 * under MIT license
*/

(function(window, document, undefined) {
  /*
   * Object ES5 extend
  */
  if (!Object.create) {
    Object.create = function (o) {
      if (arguments.length > 1) {
        throw new Error('Object.create implementation only accepts the first parameter.');
      }
      function F() {}
      F.prototype = o;
      return new F();
    };
  }
  
  if (!Object.keys) {
    Object.keys = function(o) {
      if (o !== Object(o)) {
        throw new TypeError('Object.keys called on a non-object');
      }
      var k=[], p;
      for (p in o) {
        if (Object.prototype.hasOwnProperty.call(o,p)) {
          k.push(p);
        }
      }
      return k;
    };
  }
  
  /*
   * Date ES5 extend
  */
  if (!Date.now) {
    Date.now = function now() {
      return (new Date).valueOf();
    };
  }
  
  
  /*
   * JSON ES5 extend
   * Now use json2.js at the bottom of this file
  */  
  /*if (!window.JSON) {
    window.JSON = {
      parse: function (sJSON) { return eval("(" + sJSON + ")"); },
      stringify: function (vContent) {
        if (vContent instanceof Object) {
          var sOutput = "";
          if (vContent.constructor === Array) {
            for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
                return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
          }
          if (vContent.toString !== Object.prototype.toString) { 
            return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\"";
          }
          for (var sProp in vContent) {
            sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ",";
          }
          return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
        }
          return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
      }
      };
  }*/
  
  /*
   * Function ES5 extend
  */
  if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
          // closest thing possible to the ECMAScript 5 internal IsCallable function
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }
  
      var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                   ? this
                   : oThis || window,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
        };
  
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
  
      return fBound;
      };
  }
  
  /*
   * String ES5 extend
  */
  if(!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g,'');
    };
  }
  
  /*
   * Array ES5 extend
  */
  if(!Array.isArray) {
    Array.isArray = function (vArg) {
      return Object.prototype.toString.call(vArg) === "[object Array]";
    };
  }
  
  if (typeof Array.prototype.forEach != "function") {
      Array.prototype.forEach = function (fn, scope) {
      var i, len;
      for (i = 0, len = this.length; i < len; ++i) {
        if (i in this) {
          fn.call(scope, this[i], i, this);
        }
      }
      };
  }
  
  if (typeof Array.prototype.map != "function") {
    Array.prototype.map = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
      for (var k = 0, length = this.length; k < length; k++) {
        arr.push(fn.call(context, this[k], k, this));
      }
    }
    return arr;
    };
  }
  
  if (typeof Array.prototype.filter != "function") {
    Array.prototype.filter = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
      for (var k = 0, length = this.length; k < length; k++) {
        fn.call(context, this[k], k, this) && arr.push(this[k]);
      }
    }
    return arr;
    };
  }
  
  if (typeof Array.prototype.some != "function") {
    Array.prototype.some = function (fn, context) {
    var passed = false;
    if (typeof fn === "function") {
      for (var k = 0, length = this.length; k < length; k++) {
        if (passed === true) break;
        passed = !!fn.call(context, this[k], k, this);
      }
    }
    return passed;
    };
  }
  
  if (typeof Array.prototype.every != "function") {
    Array.prototype.every = function (fn, context) {
    var passed = true;
    if (typeof fn === "function") {
      for (var k = 0, length = this.length; k < length; k++) {
        if (passed === false) break;
        passed = !!fn.call(context, this[k], k, this);
      }
    }
    return passed;
    };
  }
  
  if (typeof Array.prototype.indexOf != "function") {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
    var index = -1;
    fromIndex = fromIndex * 1 || 0;
  
    for (var k = 0, length = this.length; k < length; k++) {
      if (k >= fromIndex && this[k] === searchElement) {
        index = k;
        break;
      }
    }
    return index;
    };
  }
  
  if (typeof Array.prototype.lastIndexOf != "function") {
    Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
    var index = -1, length = this.length;
    fromIndex = fromIndex * 1 || length - 1;
  
    for (var k = length - 1; k > -1; k-=1) {
      if (k <= fromIndex && this[k] === searchElement) {
        index = k;
        break;
      }
    }
    return index;
    };
  }
  
  if (typeof Array.prototype.reduce != "function") {
    Array.prototype.reduce = function (callback, initialValue ) {
     var previous = initialValue, k = 0, length = this.length;
     if (typeof initialValue === "undefined") {
      previous = this[0];
      k = 1;
     }
     
    if (typeof callback === "function") {
      for (k; k < length; k++) {
       this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
      }
    }
    return previous;
    };
  }
  
  if (typeof Array.prototype.reduceRight != "function") {
    Array.prototype.reduceRight = function (callback, initialValue ) {
    var length = this.length, k = length - 1, previous = initialValue;
    if (typeof initialValue === "undefined") {
      previous = this[length - 1];
      k--;
    }
    if (typeof callback === "function") {
       for (k; k > -1; k-=1) {          
        this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
       }
    }
    return previous;
    };
  }
  
  /**
   * dom method that extend
  */
  var oDomExtend = {
    // selector realtive
    querySelector: function(selector) {
      return oDomExtend.querySelectorAll.call(this, selector)[0] || null;
    },
    querySelectorAll: function(selector) {
      return fDomExtend(Sizzle(selector, this));
    },
    getElementsByClassName: function(classNames) {
      return this.querySelectorAll("." + classNames.trim().replace(/\s+/, "."));
    },
    // addEventListener
    addEventListener: function(eventType, funcHandle, useCapture) {
      var element = this, eventStoreType = '';
      if (eventType == "input") { eventType = "propertychange"; }
      if (typeof funcHandle != "function") return;
      // some compatibility deal
      var eventHandle = function(event) {
        event = event || window.event || {};
        
        if (!event.target) event.target = event.srcElement; 
        if (!event.preventDefault) event.preventDefault = function() {
          event.returnValue = false;
        };
        
        if (eventType == "propertychange") {
          if (event.propertyName !== "value" || element.r_oldvalue === element.value) return;
          element.r_oldvalue = element.value;
        } 
        return funcHandle.call(element, event || {});
      };
      eventHandle.initFuncHandle = funcHandle;
      
      // event bind
      element.attachEvent("on" + eventType, eventHandle);
      
      // event store
      if (element["event" + eventType]) {
        element["event" + eventType].push(eventHandle);
      } else {
        element["event" + eventType] = [eventHandle];
      }     
    },
    dispatchEvent: function(event) {
      var eventType = event && event.type;      
      if (eventType && this["event" + eventType]) {
        event.target = this;
        this["event" + eventType].forEach(function(eventHandle) {
          event.timeStamp = Date.now();
          eventHandle.call(this, event);
        }.bind(this));
      }     
    },
    removeEventListener: function(eventType, funcHandle, useCapture) {      
      var arrEventStore = this["event" + eventType];
      if (Array.isArray(arrEventStore)) {
        this["event" + eventType] = arrEventStore.filter(function(eventHandle) {
          if (eventHandle.initFuncHandle === funcHandle) {
            this.detachEvent("on" + eventType, eventHandle);
            return false;
          }         
          return true;
        }.bind(this));
      } 
    }
    
  };
  
  var fDomExtend = function(collection) {
    // collection extend some dom method
    collection.forEach(function(element, index) {
      for (var key in oDomExtend) {
        element[key] = oDomExtend[key].bind(element);
      }
    });
    return collection;
  };
  
  /* 
   * document.querySelector, document.querySelectorAll
  */
  document.querySelector = function(selector) {
    return document.querySelectorAll(selector)[0] || null;
  };
  document.querySelectorAll = function(selector) {
    var collection = Sizzle(selector);    
    return fDomExtend(collection);  
  };
  /* 
   * getElementsByClassName
  */
  if (!document.getElementsByClassName) {
    document.getElementsByClassName = function(classNames) {      
      return oDomExtend.getElementsByClassName.call(document, classNames);
    };
  }
  /* 
   * addEventListener
   * include event of "input"
  */
  if (typeof document.addEventListener == "undefined") {
    [window, document].forEach(function(global) {
      global.addEventListener = function(eventType, funcHandle, useCapture) {
        oDomExtend.addEventListener.call(global, eventType, funcHandle, useCapture);
      };
      global.dispatchEvent = function(event) {
        oDomExtend.dispatchEvent.call(global, event);
      };
      global.removeEventListener = function() {
        oDomExtend.removeEventListener.call(global, eventType, funcHandle, useCapture); 
      };
    }); 
  }
  if (!document.createEvent) {
    document.createEvent = function(type) {
      var event = {};
      switch (type) {
        case "Event": case "Events": case "HTMLEvents": {
          event = {
            initEvent: function(eventType, canBubble, cancelable) {
              event.type = eventType;
              event.canBubble = canBubble || false;
              event.cancelable = cancelable || false;
              delete(event.initEvent);
            },
            bubbles: false,
            cancelBubble: false,
            cancelable: false,
            clipboardData: undefined,
            currentTarget: null,
            defaultPrevented: false,
            eventPhase: 0,
            returnValue: true,
            srcElement: null,
            target: null,
            timeStamp: Date.now(),
            type: ""  
          };          
          
          break;  
        }
        case "MouseEvents": {         
          event = {
            initMouseEvent: function(eventType, canBubble, cancelable, view, 
              detail, screenX, screenY, clientX, clientY,
              ctrlKey, altKey, shiftKey, metaKey,
              button, relatedTarget
            ) {
              event.type = eventType;
              event.canBubble = canBubble || false;
              event.cancelable = cancelable || false;
              event.view = view || null;
              event.screenX = screenX || 0;
              event.screenY = screenY || 0;
              event.clientX = clientX || 0;
              event.clientY = clientY || 0;
              event.ctrlKey = ctrlKey || false;
              event.altKey = altKey || false;
              event.shiftKey = shiftKey || false;
              event.metaKey = metaKey || false;
              event.button = button || 0;
              event.relatedTarget = relatedTarget || null;
              delete(event.initMouseEvent);
            },
            altKey: false,
            bubbles: false,
            button: 0,
            cancelBubble: false,
            cancelable: false,
            charCode: 0,
            clientX: 0,
            clientY: 0,
            clipboardData: undefined,
            ctrlKey: false,
            currentTarget: null,
            dataTransfer: null,
            defaultPrevented: false,
            detail: 0,
            eventPhase: 0,
            fromElement: null,
            keyCode: 0,
            layerX: 0,
            layerY: 0,
            metaKey: false,
            offsetX: 0,
            offsetY: 0,
            pageX: 0,
            pageY: 0,
            relatedTarget: null,
            returnValue: true,
            screenX: 0,
            screenY: 0,
            shiftKey: false,
            srcElement: null,
            target: null,
            timeStamp: Date.now(),
            toElement: null,
            type: "",
            view: null,
            webkitMovementX: 0,
            webkitMovementY: 0,
            which: 0,
            x: 0,
            y: 0
          };
          
          break;
        }
        case "UIEvents": {          
          event = {
            initUIEvent: function(eventType, canBubble, cancelable, view, detail) {
              event.type = eventType;
              event.canBubble = canBubble || false;
              event.cancelable = cancelable || false;
              event.view = view || null;
              event.detail = detail || 0;
              delete(event.initUIEvent);
            },
            bubbles: false,
            cancelBubble: false,
            cancelable: false,
            charCode: 0,
            clipboardData: undefined,
            currentTarget: null,
            defaultPrevented: false,
            detail: 0,
            eventPhase: 0,
            keyCode: 0,
            layerX: 0,
            layerY: 0,
            pageX: 0,
            pageY: 0,
            returnValue: true,
            srcElement: null,
            target: null,
            timeStamp: Date.now(),
            type: "",
            view: null,
            which: 0  
          };          
          break;
        }
        default: {
          throw new TypeError("NotSupportedError: The implementation did not support the requested type of object or operation.");  
        }
      }
      return event;
    };    
  }
  
  /**
   * onhashchange
  */
  // exit if the browser implements that event
  if (!("addEventListener" in document.createElement("div"))) {
    var location = window.location,
      oldURL = location.href,
      oldHash = location.hash;
    
    // check the location hash on a 100ms interval
    setInterval(function() {
      var newURL = location.href,
        newHash = location.hash;
    
      // if the hash has changed and a handler has been bound...
      if ( newHash != oldHash && typeof window.onhashchange === "function" ) {
        // execute the handler
        window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
        });
    
        oldURL = newURL;
        oldHash = newHash;
      }
     }, 100);
  }
  
  /**
   * getComputedStyle
  */
  if (typeof window.getComputedStyle !== "function") {
    window.getComputedStyle = function(el, pseudo) {
      var oStyle = {};
      var oCurrentStyle = el.currentStyle || {};
      for (var key in oCurrentStyle) {
        oStyle[key] = oCurrentStyle[key];
      }
       
      oStyle.styleFloat = oStyle.cssFloat;
       
            oStyle.getPropertyValue = function(prop) {
        // return oCurrentStyle.getAttribute(prop) || null;  // IE6 do not support "key-key" but "keyKey"
        var re = /(\-([a-z]){1})/g;
        if (prop == 'float') prop = 'styleFloat';
        if (re.test(prop)) {
          prop = prop.replace(re, function () {
            return arguments[2].toUpperCase();
          });
        }
        return el.currentStyle[prop] ? el.currentStyle[prop] : null;
      }
      return oStyle;
    }
  }
  
})(window, document);
/*
    json2.js
    2013-05-26
    Public Domain.
    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    See http://www.JSON.org/js.html
    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
