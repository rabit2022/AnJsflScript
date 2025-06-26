(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UniversalCookie = factory());
})(this, (function () { 'use strict';

    var dist = {};

    var hasRequiredDist;

    function requireDist () {
    	if (hasRequiredDist) return dist;
    	hasRequiredDist = 1;
    	Object.defineProperty(dist, "__esModule", { value: true });
    	dist.parse = parse;
    	dist.serialize = serialize;
    	/**
    	 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
    	 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
    	 * which has been replaced by the token definition in RFC 7230 appendix B.
    	 *
    	 * cookie-name       = token
    	 * token             = 1*tchar
    	 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
    	 *                     "*" / "+" / "-" / "." / "^" / "_" /
    	 *                     "`" / "|" / "~" / DIGIT / ALPHA
    	 *
    	 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
    	 * Allow same range as cookie value, except `=`, which delimits end of name.
    	 */
    	const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    	/**
    	 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
    	 *
    	 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
    	 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
    	 *                     ; US-ASCII characters excluding CTLs,
    	 *                     ; whitespace DQUOTE, comma, semicolon,
    	 *                     ; and backslash
    	 *
    	 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
    	 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
    	 */
    	const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    	/**
    	 * RegExp to match domain-value in RFC 6265 sec 4.1.1
    	 *
    	 * domain-value      = <subdomain>
    	 *                     ; defined in [RFC1034], Section 3.5, as
    	 *                     ; enhanced by [RFC1123], Section 2.1
    	 * <subdomain>       = <label> | <subdomain> "." <label>
    	 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
    	 *                     Labels must be 63 characters or less.
    	 *                     'let-dig' not 'letter' in the first char, per RFC1123
    	 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
    	 * <let-dig-hyp>     = <let-dig> | "-"
    	 * <let-dig>         = <letter> | <digit>
    	 * <letter>          = any one of the 52 alphabetic characters A through Z in
    	 *                     upper case and a through z in lower case
    	 * <digit>           = any one of the ten digits 0 through 9
    	 *
    	 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
    	 *
    	 * > (Note that a leading %x2E ("."), if present, is ignored even though that
    	 * character is not permitted, but a trailing %x2E ("."), if present, will
    	 * cause the user agent to ignore the attribute.)
    	 */
    	const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    	/**
    	 * RegExp to match path-value in RFC 6265 sec 4.1.1
    	 *
    	 * path-value        = <any CHAR except CTLs or ";">
    	 * CHAR              = %x01-7F
    	 *                     ; defined in RFC 5234 appendix B.1
    	 */
    	const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    	const __toString = Object.prototype.toString;
    	const NullObject = /* @__PURE__ */ (() => {
    	    const C = function () { };
    	    C.prototype = Object.create(null);
    	    return C;
    	})();
    	/**
    	 * Parse a cookie header.
    	 *
    	 * Parse the given cookie header string into an object
    	 * The object has the various cookies as keys(names) => values
    	 */
    	function parse(str, options) {
    	    const obj = new NullObject();
    	    const len = str.length;
    	    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    	    if (len < 2)
    	        return obj;
    	    const dec = options?.decode || decode;
    	    let index = 0;
    	    do {
    	        const eqIdx = str.indexOf("=", index);
    	        if (eqIdx === -1)
    	            break; // No more cookie pairs.
    	        const colonIdx = str.indexOf(";", index);
    	        const endIdx = colonIdx === -1 ? len : colonIdx;
    	        if (eqIdx > endIdx) {
    	            // backtrack on prior semicolon
    	            index = str.lastIndexOf(";", eqIdx - 1) + 1;
    	            continue;
    	        }
    	        const keyStartIdx = startIndex(str, index, eqIdx);
    	        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
    	        const key = str.slice(keyStartIdx, keyEndIdx);
    	        // only assign once
    	        if (obj[key] === undefined) {
    	            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
    	            let valEndIdx = endIndex(str, endIdx, valStartIdx);
    	            const value = dec(str.slice(valStartIdx, valEndIdx));
    	            obj[key] = value;
    	        }
    	        index = endIdx + 1;
    	    } while (index < len);
    	    return obj;
    	}
    	function startIndex(str, index, max) {
    	    do {
    	        const code = str.charCodeAt(index);
    	        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
    	            return index;
    	    } while (++index < max);
    	    return max;
    	}
    	function endIndex(str, index, min) {
    	    while (index > min) {
    	        const code = str.charCodeAt(--index);
    	        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
    	            return index + 1;
    	    }
    	    return min;
    	}
    	/**
    	 * Serialize data into a cookie header.
    	 *
    	 * Serialize a name value pair into a cookie string suitable for
    	 * http headers. An optional options object specifies cookie parameters.
    	 *
    	 * serialize('foo', 'bar', { httpOnly: true })
    	 *   => "foo=bar; httpOnly"
    	 */
    	function serialize(name, val, options) {
    	    const enc = options?.encode || encodeURIComponent;
    	    if (!cookieNameRegExp.test(name)) {
    	        throw new TypeError(`argument name is invalid: ${name}`);
    	    }
    	    const value = enc(val);
    	    if (!cookieValueRegExp.test(value)) {
    	        throw new TypeError(`argument val is invalid: ${val}`);
    	    }
    	    let str = name + "=" + value;
    	    if (!options)
    	        return str;
    	    if (options.maxAge !== undefined) {
    	        if (!Number.isInteger(options.maxAge)) {
    	            throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
    	        }
    	        str += "; Max-Age=" + options.maxAge;
    	    }
    	    if (options.domain) {
    	        if (!domainValueRegExp.test(options.domain)) {
    	            throw new TypeError(`option domain is invalid: ${options.domain}`);
    	        }
    	        str += "; Domain=" + options.domain;
    	    }
    	    if (options.path) {
    	        if (!pathValueRegExp.test(options.path)) {
    	            throw new TypeError(`option path is invalid: ${options.path}`);
    	        }
    	        str += "; Path=" + options.path;
    	    }
    	    if (options.expires) {
    	        if (!isDate(options.expires) ||
    	            !Number.isFinite(options.expires.valueOf())) {
    	            throw new TypeError(`option expires is invalid: ${options.expires}`);
    	        }
    	        str += "; Expires=" + options.expires.toUTCString();
    	    }
    	    if (options.httpOnly) {
    	        str += "; HttpOnly";
    	    }
    	    if (options.secure) {
    	        str += "; Secure";
    	    }
    	    if (options.partitioned) {
    	        str += "; Partitioned";
    	    }
    	    if (options.priority) {
    	        const priority = typeof options.priority === "string"
    	            ? options.priority.toLowerCase()
    	            : undefined;
    	        switch (priority) {
    	            case "low":
    	                str += "; Priority=Low";
    	                break;
    	            case "medium":
    	                str += "; Priority=Medium";
    	                break;
    	            case "high":
    	                str += "; Priority=High";
    	                break;
    	            default:
    	                throw new TypeError(`option priority is invalid: ${options.priority}`);
    	        }
    	    }
    	    if (options.sameSite) {
    	        const sameSite = typeof options.sameSite === "string"
    	            ? options.sameSite.toLowerCase()
    	            : options.sameSite;
    	        switch (sameSite) {
    	            case true:
    	            case "strict":
    	                str += "; SameSite=Strict";
    	                break;
    	            case "lax":
    	                str += "; SameSite=Lax";
    	                break;
    	            case "none":
    	                str += "; SameSite=None";
    	                break;
    	            default:
    	                throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
    	        }
    	    }
    	    return str;
    	}
    	/**
    	 * URL-decode string value. Optimized to skip native call when no %.
    	 */
    	function decode(str) {
    	    if (str.indexOf("%") === -1)
    	        return str;
    	    try {
    	        return decodeURIComponent(str);
    	    }
    	    catch (e) {
    	        return str;
    	    }
    	}
    	/**
    	 * Determine if value is a Date.
    	 */
    	function isDate(val) {
    	    return __toString.call(val) === "[object Date]";
    	}
    	
    	return dist;
    }

    var distExports = requireDist();

    function hasDocumentCookie() {
        const testingValue = typeof global === 'undefined'
            ? undefined
            : global.TEST_HAS_DOCUMENT_COOKIE;
        if (typeof testingValue === 'boolean') {
            return testingValue;
        }
        // Can we get/set cookies on document.cookie?
        // return typeof document === 'object' && typeof document.cookie === 'string';

		// 修改：不更改document.cookie，而是 UniversalCookie 替代 document.cookie
		return false;
    }
    function parseCookies(cookies) {
        if (typeof cookies === 'string') {
            return distExports.parse(cookies);
        }
        else if (typeof cookies === 'object' && cookies !== null) {
            return cookies;
        }
        else {
            return {};
        }
    }
    function readCookie(value, options = {}) {
        const cleanValue = cleanupCookieValue(value);
        if (!options.doNotParse) {
            try {
                return JSON.parse(cleanValue);
            }
            catch (e) {
                // At least we tried
            }
        }
        // Ignore clean value if we failed the deserialization
        // It is not relevant anymore to trim those values
        return value;
    }
    function cleanupCookieValue(value) {
        // express prepend j: before serializing a cookie
        if (value && value[0] === 'j' && value[1] === ':') {
            return value.substr(2);
        }
        return value;
    }

    class Cookies {
        constructor(cookies, defaultSetOptions = {}) {
            this.changeListeners = [];
            this.HAS_DOCUMENT_COOKIE = false;
            this.update = () => {
                if (!this.HAS_DOCUMENT_COOKIE) {
                    return;
                }
                const previousCookies = this.cookies;
                this.cookies = distExports.parse(document.cookie);
                this._checkChanges(previousCookies);
            };
            const domCookies = typeof document === 'undefined' ? '' : document.cookie;
            this.cookies = parseCookies(cookies || domCookies);
            this.defaultSetOptions = defaultSetOptions;
            this.HAS_DOCUMENT_COOKIE = hasDocumentCookie();
        }
        _emitChange(params) {
            for (let i = 0; i < this.changeListeners.length; ++i) {
                this.changeListeners[i](params);
            }
        }
        _checkChanges(previousCookies) {
            const names = new Set(Object.keys(previousCookies).concat(Object.keys(this.cookies)));
            names.forEach((name) => {
                if (previousCookies[name] !== this.cookies[name]) {
                    this._emitChange({
                        name,
                        value: readCookie(this.cookies[name]),
                    });
                }
            });
        }
        _startPolling() {
            this.pollingInterval = setInterval(this.update, 300);
        }
        _stopPolling() {
            if (this.pollingInterval) {
                clearInterval(this.pollingInterval);
            }
        }
        get(name, options = {}) {
            if (!options.doNotUpdate) {
                this.update();
            }
            return readCookie(this.cookies[name], options);
        }
        getAll(options = {}) {
            if (!options.doNotUpdate) {
                this.update();
            }
            const result = {};
            for (let name in this.cookies) {
                result[name] = readCookie(this.cookies[name], options);
            }
            return result;
        }
        set(name, value, options) {
            if (options) {
                options = Object.assign(Object.assign({}, this.defaultSetOptions), options);
            }
            else {
                options = this.defaultSetOptions;
            }
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            this.cookies = Object.assign(Object.assign({}, this.cookies), { [name]: stringValue });
            if (this.HAS_DOCUMENT_COOKIE) {
                document.cookie = distExports.serialize(name, stringValue, options);
            }
            this._emitChange({ name, value, options });
        }
        remove(name, options) {
            const finalOptions = (options = Object.assign(Object.assign(Object.assign({}, this.defaultSetOptions), options), { expires: new Date(1970, 1, 1, 0, 0, 1), maxAge: 0 }));
            this.cookies = Object.assign({}, this.cookies);
            delete this.cookies[name];
            if (this.HAS_DOCUMENT_COOKIE) {
                document.cookie = distExports.serialize(name, '', finalOptions);
            }
            this._emitChange({ name, value: undefined, options });
        }
        addChangeListener(callback) {
            this.changeListeners.push(callback);
            if (this.HAS_DOCUMENT_COOKIE && this.changeListeners.length === 1) {
                if (typeof window === 'object' && 'cookieStore' in window) {
                    window.cookieStore.addEventListener('change', this.update);
                }
                else {
                    this._startPolling();
                }
            }
        }
        removeChangeListener(callback) {
            const idx = this.changeListeners.indexOf(callback);
            if (idx >= 0) {
                this.changeListeners.splice(idx, 1);
            }
            if (this.HAS_DOCUMENT_COOKIE && this.changeListeners.length === 0) {
                if (typeof window === 'object' && 'cookieStore' in window) {
                    window.cookieStore.removeEventListener('change', this.update);
                }
                else {
                    this._stopPolling();
                }
            }
        }
        removeAllChangeListeners() {
            while (this.changeListeners.length > 0) {
                this.removeChangeListener(this.changeListeners[0]);
            }
        }
		// 修改: 增加toString方法
		toString() {
			// 构造cookie字符串
			let str = '';
			for (let name in this.cookies) {
				str += distExports.serialize(name, this.cookies[name]) +";";
			}
			return str;
		}
    }

    return Cookies;

}));
