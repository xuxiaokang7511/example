/* Tiny PowerPaste plugin
 *
 * Copyright 2010-2019 Tiny Technologies LLC. All rights reserved.
 *
 * Version: 5.0.1-386
 */

/* eslint-disable */
!function(l) {
    "use strict";
    var n = function(t) {
        return parseInt(t, 10)
    }
      , r = function(t, e, n) {
        return {
            major: t,
            minor: e,
            patch: n
        }
    }
      , o = function(t) {
        var e = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t);
        return e ? r(n(e[1]), n(e[2]), n(e[3])) : r(0, 0, 0)
    }
      , i = function(t, e) {
        var n = t - e;
        return 0 === n ? 0 : 0 < n ? 1 : -1
    }
      , c = function(t, e) {
        return !!t && -1 === function(t, e) {
            var n = i(t.major, e.major);
            if (0 !== n)
                return n;
            var r = i(t.minor, e.minor);
            if (0 !== r)
                return r;
            var o = i(t.patch, e.patch);
            return 0 !== o ? o : 0
        }(o([(n = t).majorVersion, n.minorVersion].join(".").split(".").slice(0, 3).join(".")), o(e));
        var n
    }
      , t = function(r, o) {
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            var n = r.console;
            n && o in n && n[o].apply(n, arguments)
        }
    }
      , e = {
        log: t(window, "log"),
        error: t(window, "error"),
        warn: t(window, "warm")
    }
      , s = {
        register: function(t, e) {
            t.addCommand("mceTogglePlainTextPaste", e.toggle)
        }
    }
      , f = function(t) {
        return t.getParam("powerpaste_block_drop", !1, "boolean")
    }
      , a = function(t) {
        return void 0 !== t.settings.images_upload_url
    }
      , d = function(t) {
        return t.getParam("paste_as_text", !1)
    }
      , N = function(t) {
        return t.getParam("automatic_uploads", !0, "boolean")
    }
      , u = function(t, e) {
        t.dom.bind(e, "drop dragstart dragend dragover dragenter dragleave dragdrop draggesture", function(t) {
            t.preventDefault(),
            t.stopImmediatePropagation()
        })
    }
      , m = function(e) {
        e.on("init", function(t) {
            u(e, e.getBody()),
            e.inline || u(e, e.getDoc())
        })
    }
      , L = function() {}
      , g = function(n, r) {
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            return n(r.apply(null, t))
        }
    }
      , v = function(t) {
        return function() {
            return t
        }
    }
      , p = function(t) {
        return t
    };
    function y(r) {
        for (var o = [], t = 1; t < arguments.length; t++)
            o[t - 1] = arguments[t];
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            var n = o.concat(t);
            return r.apply(null, n)
        }
    }
    var h, b, T, x, E, w, I = function(t) {
        return function() {
            throw new Error(t)
        }
    }, S = v(!1), _ = v(!0), O = S, C = _, D = function() {
        return P
    }, P = (x = {
        fold: function(t, e) {
            return t()
        },
        is: O,
        isSome: O,
        isNone: C,
        getOr: T = function(t) {
            return t
        }
        ,
        getOrThunk: b = function(t) {
            return t()
        }
        ,
        getOrDie: function(t) {
            throw new Error(t || "error: getOrDie called on none.")
        },
        getOrNull: function() {
            return null
        },
        getOrUndefined: function() {},
        or: T,
        orThunk: b,
        map: D,
        ap: D,
        each: function() {},
        bind: D,
        flatten: D,
        exists: O,
        forall: C,
        filter: D,
        equals: h = function(t) {
            return t.isNone()
        }
        ,
        equals_: h,
        toArray: function() {
            return []
        },
        toString: v("none()")
    },
    Object.freeze && Object.freeze(x),
    x), A = function(n) {
        var t = function() {
            return n
        }
          , e = function() {
            return o
        }
          , r = function(t) {
            return t(n)
        }
          , o = {
            fold: function(t, e) {
                return e(n)
            },
            is: function(t) {
                return n === t
            },
            isSome: C,
            isNone: O,
            getOr: t,
            getOrThunk: t,
            getOrDie: t,
            getOrNull: t,
            getOrUndefined: t,
            or: e,
            orThunk: e,
            map: function(t) {
                return A(t(n))
            },
            ap: function(t) {
                return t.fold(D, function(t) {
                    return A(t(n))
                })
            },
            each: function(t) {
                t(n)
            },
            bind: r,
            flatten: t,
            exists: r,
            forall: r,
            filter: function(t) {
                return t(n) ? o : P
            },
            equals: function(t) {
                return t.is(n)
            },
            equals_: function(t, e) {
                return t.fold(O, function(t) {
                    return e(n, t)
                })
            },
            toArray: function() {
                return [n]
            },
            toString: function() {
                return "some(" + n + ")"
            }
        };
        return o
    }, k = {
        some: A,
        none: D,
        from: function(t) {
            return null == t ? P : A(t)
        }
    }, M = function(e) {
        return function(t) {
            return function(t) {
                if (null === t)
                    return "null";
                var e = typeof t;
                return "object" === e && (Array.prototype.isPrototypeOf(t) || t.constructor && "Array" === t.constructor.name) ? "array" : "object" === e && (String.prototype.isPrototypeOf(t) || t.constructor && "String" === t.constructor.name) ? "string" : e
            }(t) === e
        }
    }, R = M("string"), F = M("object"), j = M("array"), U = M("boolean"), B = M("function"), Y = M("number"), W = Array.prototype.slice, H = void 0 === (E = Array.prototype.indexOf) ? function(t, e) {
        return Q(t, e)
    }
    : function(t, e) {
        return E.call(t, e)
    }
    , q = function(t, e) {
        return -1 < H(t, e)
    }, $ = function(t, e) {
        return Z(t, e).isSome()
    }, V = function(t, e) {
        for (var n = t.length, r = new Array(n), o = 0; o < n; o++) {
            var i = t[o];
            r[o] = e(i, o, t)
        }
        return r
    }, X = function(t, e) {
        for (var n = 0, r = t.length; n < r; n++) {
            e(t[n], n, t)
        }
    }, G = function(t, e) {
        for (var n = [], r = [], o = 0, i = t.length; o < i; o++) {
            var a = t[o];
            (e(a, o, t) ? n : r).push(a)
        }
        return {
            pass: n,
            fail: r
        }
    }, z = function(t, e) {
        for (var n = [], r = 0, o = t.length; r < o; r++) {
            var i = t[r];
            e(i, r, t) && n.push(i)
        }
        return n
    }, K = function(t, e, n) {
        return X(t, function(t) {
            n = e(n, t)
        }),
        n
    }, J = function(t, e) {
        for (var n = 0, r = t.length; n < r; n++) {
            var o = t[n];
            if (e(o, n, t))
                return k.some(o)
        }
        return k.none()
    }, Z = function(t, e) {
        for (var n = 0, r = t.length; n < r; n++) {
            if (e(t[n], n, t))
                return k.some(n)
        }
        return k.none()
    }, Q = function(t, e) {
        for (var n = 0, r = t.length; n < r; ++n)
            if (t[n] === e)
                return n;
        return -1
    }, tt = Array.prototype.push, et = function(t) {
        for (var e = [], n = 0, r = t.length; n < r; ++n) {
            if (!Array.prototype.isPrototypeOf(t[n]))
                throw new Error("Arr.flatten item " + n + " was not an array, input: " + t);
            tt.apply(e, t[n])
        }
        return e
    }, nt = function(t, e) {
        var n = V(t, e);
        return et(n)
    }, rt = function(t, e) {
        for (var n = 0, r = t.length; n < r; ++n) {
            if (!0 !== e(t[n], n, t))
                return !1
        }
        return !0
    }, ot = (B(Array.from) && Array.from,
    Object.keys), it = function(t, e) {
        for (var n = ot(t), r = 0, o = n.length; r < o; r++) {
            var i = n[r];
            e(t[i], i, t)
        }
    }, at = function(t, r) {
        return ut(t, function(t, e, n) {
            return {
                k: e,
                v: r(t, e, n)
            }
        })
    }, ut = function(r, o) {
        var i = {};
        return it(r, function(t, e) {
            var n = o(t, e, r);
            i[n.k] = n.v
        }),
        i
    }, ct = function(t, n) {
        var r = [];
        return it(t, function(t, e) {
            r.push(n(t, e))
        }),
        r
    }, st = function(t) {
        return ct(t, function(t) {
            return t
        })
    }, ft = function(t) {
        return ot(t).length
    }, lt = function(a) {
        if (!j(a))
            throw new Error("cases must be an array");
        if (0 === a.length)
            throw new Error("there must be at least one case");
        var u = []
          , n = {};
        return X(a, function(t, r) {
            var e = ot(t);
            if (1 !== e.length)
                throw new Error("one and only one name per case");
            var o = e[0]
              , i = t[o];
            if (void 0 !== n[o])
                throw new Error("duplicate key detected:" + o);
            if ("cata" === o)
                throw new Error("cannot have a case named cata (sorry)");
            if (!j(i))
                throw new Error("case arguments must be an array");
            u.push(o),
            n[o] = function() {
                var t = arguments.length;
                if (t !== i.length)
                    throw new Error("Wrong number of arguments to case " + o + ". Expected " + i.length + " (" + i + "), got " + t);
                for (var n = new Array(t), e = 0; e < n.length; e++)
                    n[e] = arguments[e];
                return {
                    fold: function() {
                        if (arguments.length !== a.length)
                            throw new Error("Wrong number of arguments to fold. Expected " + a.length + ", got " + arguments.length);
                        return arguments[r].apply(null, n)
                    },
                    match: function(t) {
                        var e = ot(t);
                        if (u.length !== e.length)
                            throw new Error("Wrong number of arguments to match. Expected: " + u.join(",") + "\nActual: " + e.join(","));
                        if (!rt(u, function(t) {
                            return q(e, t)
                        }))
                            throw new Error("Not all branches were specified when using match. Specified: " + e.join(", ") + "\nRequired: " + u.join(", "));
                        return t[o].apply(null, n)
                    },
                    log: function(t) {
                        l.console.log(t, {
                            constructors: u,
                            constructor: o,
                            params: n
                        })
                    }
                }
            }
        }),
        n
    }, dt = Object.prototype.hasOwnProperty, mt = (w = function(t, e) {
        return e
    }
    ,
    function() {
        for (var t = new Array(arguments.length), e = 0; e < t.length; e++)
            t[e] = arguments[e];
        if (0 === t.length)
            throw new Error("Can't merge zero objects");
        for (var n = {}, r = 0; r < t.length; r++) {
            var o = t[r];
            for (var i in o)
                dt.call(o, i) && (n[i] = w(n[i], o[i]))
        }
        return n
    }
    ), pt = lt([{
        blob: ["id", "imageresult", "objurl"]
    }, {
        url: ["id", "url", "raw"]
    }]), gt = mt(pt, {
        cata: function(t, e, n) {
            return t.fold(e, n)
        }
    }), vt = void 0 !== l.window ? l.window : Function("return this;")(), ht = function(t, e) {
        return function(t, e) {
            for (var n = null != e ? e : vt, r = 0; r < t.length && null != n; ++r)
                n = n[t[r]];
            return n
        }(t.split("."), e)
    }, yt = function(t, e) {
        return function(t, e) {
            for (var n, r, o = void 0 !== e ? e : vt, i = 0; i < t.length; ++i)
                n = o,
                r = t[i],
                void 0 !== n[r] && null !== n[r] || (n[r] = {}),
                o = n[r];
            return o
        }(t.split("."), e)
    }, bt = {
        getOrDie: function(t, e) {
            var n = ht(t, e);
            if (null == n)
                throw t + " not available on this browser";
            return n
        }
    };
    function Tt(t, e) {
        return new (bt.getOrDie("Blob"))(t,e)
    }
    function xt(t) {
        return new (bt.getOrDie("Uint8Array"))(t)
    }
    var Et = {
        atob: function(t) {
            return bt.getOrDie("atob")(t)
        },
        requestAnimationFrame: function(t) {
            bt.getOrDie("requestAnimationFrame")(t)
        }
    };
    function wt(t, e) {
        return n = l.document.createElement("canvas"),
        r = t,
        o = e,
        n.width = r,
        n.height = o,
        n;
        var n, r, o
    }
    function It(t) {
        var e = wt(t.width, t.height);
        return St(e).drawImage(t, 0, 0),
        e
    }
    function St(t) {
        return t.getContext("2d")
    }
    var Nt = window.Promise ? window.Promise : function() {
        var i = function(t) {
            if ("object" != typeof this)
                throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof t)
                throw new TypeError("not a function");
            this._state = null,
            this._value = null,
            this._deferreds = [],
            f(t, n(o, this), n(u, this))
        }
          , t = i.immediateFn || "function" == typeof window.setImmediate && window.setImmediate || function(t) {
            l.setTimeout(t, 1)
        }
        ;
        function n(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        var r = Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }
        ;
        function a(n) {
            var r = this;
            null !== this._state ? t(function() {
                var t = r._state ? n.onFulfilled : n.onRejected;
                if (null !== t) {
                    var e;
                    try {
                        e = t(r._value)
                    } catch (t) {
                        return void n.reject(t)
                    }
                    n.resolve(e)
                } else
                    (r._state ? n.resolve : n.reject)(r._value)
            }) : this._deferreds.push(n)
        }
        function o(t) {
            try {
                if (t === this)
                    throw new TypeError("A promise cannot be resolved with itself.");
                if (t && ("object" == typeof t || "function" == typeof t)) {
                    var e = t.then;
                    if ("function" == typeof e)
                        return void f(n(e, t), n(o, this), n(u, this))
                }
                this._state = !0,
                this._value = t,
                c.call(this)
            } catch (t) {
                u.call(this, t)
            }
        }
        function u(t) {
            this._state = !1,
            this._value = t,
            c.call(this)
        }
        function c() {
            for (var t = 0, e = this._deferreds; t < e.length; t++) {
                var n = e[t];
                a.call(this, n)
            }
            this._deferreds = []
        }
        function s(t, e, n, r) {
            this.onFulfilled = "function" == typeof t ? t : null,
            this.onRejected = "function" == typeof e ? e : null,
            this.resolve = n,
            this.reject = r
        }
        function f(t, e, n) {
            var r = !1;
            try {
                t(function(t) {
                    r || (r = !0,
                    e(t))
                }, function(t) {
                    r || (r = !0,
                    n(t))
                })
            } catch (t) {
                if (r)
                    return;
                r = !0,
                n(t)
            }
        }
        return i.prototype.catch = function(t) {
            return this.then(null, t)
        }
        ,
        i.prototype.then = function(n, r) {
            var o = this;
            return new i(function(t, e) {
                a.call(o, new s(n,r,t,e))
            }
            )
        }
        ,
        i.all = function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            var u = Array.prototype.slice.call(1 === t.length && r(t[0]) ? t[0] : t);
            return new i(function(r, o) {
                if (0 === u.length)
                    return r([]);
                var i = u.length;
                function a(e, t) {
                    try {
                        if (t && ("object" == typeof t || "function" == typeof t)) {
                            var n = t.then;
                            if ("function" == typeof n)
                                return void n.call(t, function(t) {
                                    a(e, t)
                                }, o)
                        }
                        u[e] = t,
                        0 == --i && r(u)
                    } catch (t) {
                        o(t)
                    }
                }
                for (var t = 0; t < u.length; t++)
                    a(t, u[t])
            }
            )
        }
        ,
        i.resolve = function(e) {
            return e && "object" == typeof e && e.constructor === i ? e : new i(function(t) {
                t(e)
            }
            )
        }
        ,
        i.reject = function(n) {
            return new i(function(t, e) {
                e(n)
            }
            )
        }
        ,
        i.race = function(o) {
            return new i(function(t, e) {
                for (var n = 0, r = o; n < r.length; n++)
                    r[n].then(t, e)
            }
            )
        }
        ,
        i
    }();
    function Lt(r) {
        return new Nt(function(t, n) {
            var e = new l.XMLHttpRequest;
            e.open("GET", r, !0),
            e.responseType = "blob",
            e.onload = function() {
                200 === this.status && t(this.response)
            }
            ,
            e.onerror = function() {
                var t, e = this;
                n(0 === this.status ? ((t = new Error("No access to download image")).code = 18,
                t.name = "SecurityError",
                t) : new Error("Error " + e.status + " downloading image"))
            }
            ,
            e.send()
        }
        )
    }
    function _t(t) {
        var e = t.split(",")
          , n = /data:([^;]+)/.exec(e[0]);
        if (!n)
            return k.none();
        for (var r = n[1], o = e[1], i = Et.atob(o), a = i.length, u = Math.ceil(a / 1024), c = new Array(u), s = 0; s < u; ++s) {
            for (var f = 1024 * s, l = Math.min(f + 1024, a), d = new Array(l - f), m = f, p = 0; m < l; ++p,
            ++m)
                d[p] = i[m].charCodeAt(0);
            c[s] = xt(d)
        }
        return k.some(Tt(c, {
            type: r
        }))
    }
    function Ot(n) {
        return new Nt(function(t, e) {
            _t(n).fold(function() {
                e("uri is not base64: " + n)
            }, t)
        }
        )
    }
    function Ct(t, r, o) {
        return r = r || "image/png",
        l.HTMLCanvasElement.prototype.toBlob ? new Nt(function(e, n) {
            t.toBlob(function(t) {
                t ? e(t) : n()
            }, r, o)
        }
        ) : Ot(t.toDataURL(r, o))
    }
    function Dt(t) {
        return (u = t,
        new Nt(function(t, e) {
            var n = l.URL.createObjectURL(u)
              , r = new l.Image
              , o = function() {
                r.removeEventListener("load", i),
                r.removeEventListener("error", a)
            };
            function i() {
                o(),
                t(r)
            }
            function a() {
                o(),
                e("Unable to load data of type " + u.type + ": " + n)
            }
            r.addEventListener("load", i),
            r.addEventListener("error", a),
            r.src = n,
            r.complete && i()
        }
        )).then(function(t) {
            var e;
            e = t,
            l.URL.revokeObjectURL(e.src);
            var n, r, o = wt((r = t).naturalWidth || r.width, (n = t).naturalHeight || n.height);
            return St(o).drawImage(t, 0, 0),
            o
        });
        var u
    }
    function Pt(n) {
        return new Nt(function(t) {
            var e = new (bt.getOrDie("FileReader"));
            e.onloadend = function() {
                t(e.result)
            }
            ,
            e.readAsDataURL(n)
        }
        )
    }
    var At = function(t) {
        return Pt(t)
    }
      , kt = function(t) {
        return k.from(0 === (e = t).indexOf("blob:") ? Lt(e) : 0 === e.indexOf("data:") ? Ot(e) : null);
        var e
    };
    function Mt(t, e, n) {
        var r = e.type;
        function o(r, o) {
            return t.then(function(t) {
                return n = o,
                e = (e = r) || "image/png",
                t.toDataURL(e, n);
                var e, n
            })
        }
        return {
            getType: v(r),
            toBlob: function() {
                return Nt.resolve(e)
            },
            toDataURL: function() {
                return n
            },
            toBase64: function() {
                return n.split(",")[1]
            },
            toAdjustedBlob: function(e, n) {
                return t.then(function(t) {
                    return Ct(t, e, n)
                })
            },
            toAdjustedDataURL: o,
            toAdjustedBase64: function(t, e) {
                return o(t, e).then(function(t) {
                    return t.split(",")[1]
                })
            },
            toCanvas: function() {
                return t.then(It)
            }
        }
    }
    function Rt(t) {
        return (e = t,
        n = e.src,
        0 === n.indexOf("data:") ? Ot(n) : Lt(n)).then(function(t) {
            return Pt(e = t).then(function(t) {
                return Mt(Dt(e), e, t)
            });
            var e
        });
        var e, n
    }
    var Ft, jt, Ut = function(t, e) {
        return r = e,
        Mt(Dt(n = t), n, r);
        var n, r
    }, Bt = function(t, e, n) {
        return void 0 === e && void 0 === n ? Yt(t) : t.toAdjustedBlob(e, n)
    }, Yt = function(t) {
        return t.toBlob()
    }, Wt = function(t) {
        return t.toDataURL()
    }, Ht = function(t) {
        var n = k.none()
          , e = []
          , r = function(t) {
            o() ? a(t) : e.push(t)
        }
          , o = function() {
            return n.isSome()
        }
          , i = function(t) {
            X(t, a)
        }
          , a = function(e) {
            n.each(function(t) {
                l.setTimeout(function() {
                    e(t)
                }, 0)
            })
        };
        return t(function(t) {
            n = k.some(t),
            i(e),
            e = []
        }),
        {
            get: r,
            map: function(n) {
                return Ht(function(e) {
                    r(function(t) {
                        e(n(t))
                    })
                })
            },
            isReady: o
        }
    }, qt = {
        nu: Ht,
        pure: function(e) {
            return Ht(function(t) {
                t(e)
            })
        }
    }, $t = function(e) {
        var t = function(t) {
            var r;
            e((r = t,
            function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t[e] = arguments[e];
                var n = this;
                l.setTimeout(function() {
                    r.apply(n, t)
                }, 0)
            }
            ))
        }
          , n = function() {
            return qt.nu(t)
        };
        return {
            map: function(r) {
                return $t(function(n) {
                    t(function(t) {
                        var e = r(t);
                        n(e)
                    })
                })
            },
            bind: function(n) {
                return $t(function(e) {
                    t(function(t) {
                        n(t).get(e)
                    })
                })
            },
            anonBind: function(n) {
                return $t(function(e) {
                    t(function(t) {
                        n.get(e)
                    })
                })
            },
            toLazy: n,
            toCached: function() {
                var e = null;
                return $t(function(t) {
                    null === e && (e = n()),
                    e.get(t)
                })
            },
            get: t
        }
    }, Vt = {
        nu: $t,
        pure: function(e) {
            return $t(function(t) {
                t(e)
            })
        }
    }, Xt = function(a, t) {
        return t(function(r) {
            var o = []
              , i = 0;
            0 === a.length ? r([]) : X(a, function(t, e) {
                var n;
                t.get((n = e,
                function(t) {
                    o[n] = t,
                    ++i >= a.length && r(o)
                }
                ))
            })
        })
    }, Gt = function(t) {
        return Xt(t, Vt.nu)
    }, zt = function(t, e) {
        var n = V(t, e);
        return Gt(n)
    }, Kt = 0, Jt = function(t) {
        var e = (new Date).getTime();
        return t + "_" + Math.floor(1e9 * Math.random()) + ++Kt + String(e)
    }, Zt = function(n) {
        var r, o = !1;
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            return o || (o = !0,
            r = n.apply(null, t)),
            r
        }
    }, Qt = function() {
        return te(0, 0)
    }, te = function(t, e) {
        return {
            major: t,
            minor: e
        }
    }, ee = {
        nu: te,
        detect: function(t, e) {
            var n = String(e).toLowerCase();
            return 0 === t.length ? Qt() : function(t, e) {
                var n = function(t, e) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        if (r.test(e))
                            return r
                    }
                }(t, e);
                if (!n)
                    return {
                        major: 0,
                        minor: 0
                    };
                var r = function(t) {
                    return Number(e.replace(n, "$" + t))
                };
                return te(r(1), r(2))
            }(t, n)
        },
        unknown: Qt
    }, ne = "Firefox", re = function(t, e) {
        return function() {
            return e === t
        }
    }, oe = function(t) {
        var e = t.current;
        return {
            current: e,
            version: t.version,
            isEdge: re("Edge", e),
            isChrome: re("Chrome", e),
            isIE: re("IE", e),
            isOpera: re("Opera", e),
            isFirefox: re(ne, e),
            isSafari: re("Safari", e)
        }
    }, ie = {
        unknown: function() {
            return oe({
                current: void 0,
                version: ee.unknown()
            })
        },
        nu: oe,
        edge: v("Edge"),
        chrome: v("Chrome"),
        ie: v("IE"),
        opera: v("Opera"),
        firefox: v(ne),
        safari: v("Safari")
    }, ae = "Windows", ue = "Android", ce = "Solaris", se = "FreeBSD", fe = function(t, e) {
        return function() {
            return e === t
        }
    }, le = function(t) {
        var e = t.current;
        return {
            current: e,
            version: t.version,
            isWindows: fe(ae, e),
            isiOS: fe("iOS", e),
            isAndroid: fe(ue, e),
            isOSX: fe("OSX", e),
            isLinux: fe("Linux", e),
            isSolaris: fe(ce, e),
            isFreeBSD: fe(se, e)
        }
    }, de = {
        unknown: function() {
            return le({
                current: void 0,
                version: ee.unknown()
            })
        },
        nu: le,
        windows: v(ae),
        ios: v("iOS"),
        android: v(ue),
        linux: v("Linux"),
        osx: v("OSX"),
        solaris: v(ce),
        freebsd: v(se)
    }, me = function(t, e) {
        var n = String(e).toLowerCase();
        return J(t, function(t) {
            return t.search(n)
        })
    }, pe = function(t, n) {
        return me(t, n).map(function(t) {
            var e = ee.detect(t.versionRegexes, n);
            return {
                current: t.name,
                version: e
            }
        })
    }, ge = function(t, n) {
        return me(t, n).map(function(t) {
            var e = ee.detect(t.versionRegexes, n);
            return {
                current: t.name,
                version: e
            }
        })
    }, ve = function(t, e, n) {
        return "" === e || !(t.length < e.length) && t.substr(n, n + e.length) === e
    }, he = function(t, e) {
        return Te(t, e) ? (n = t,
        r = e.length,
        n.substring(r)) : t;
        var n, r
    }, ye = function(t, e) {
        return xe(t, e) ? (n = t,
        r = e.length,
        n.substring(0, n.length - r)) : t;
        var n, r
    }, be = function(t, e) {
        return -1 !== t.indexOf(e)
    }, Te = function(t, e) {
        return ve(t, e, 0)
    }, xe = function(t, e) {
        return ve(t, e, t.length - e.length)
    }, Ee = function(t) {
        return t.replace(/^\s+|\s+$/g, "")
    }, we = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/, Ie = function(e) {
        return function(t) {
            return be(t, e)
        }
    }, Se = [{
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function(t) {
            return be(t, "edge/") && be(t, "chrome") && be(t, "safari") && be(t, "applewebkit")
        }
    }, {
        name: "Chrome",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, we],
        search: function(t) {
            return be(t, "chrome") && !be(t, "chromeframe")
        }
    }, {
        name: "IE",
        versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
        search: function(t) {
            return be(t, "msie") || be(t, "trident")
        }
    }, {
        name: "Opera",
        versionRegexes: [we, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: Ie("opera")
    }, {
        name: "Firefox",
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: Ie("firefox")
    }, {
        name: "Safari",
        versionRegexes: [we, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: function(t) {
            return (be(t, "safari") || be(t, "mobile/")) && be(t, "applewebkit")
        }
    }], Ne = [{
        name: "Windows",
        search: Ie("win"),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "iOS",
        search: function(t) {
            return be(t, "iphone") || be(t, "ipad")
        },
        versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
    }, {
        name: "Android",
        search: Ie("android"),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "OSX",
        search: Ie("os x"),
        versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
    }, {
        name: "Linux",
        search: Ie("linux"),
        versionRegexes: []
    }, {
        name: "Solaris",
        search: Ie("sunos"),
        versionRegexes: []
    }, {
        name: "FreeBSD",
        search: Ie("freebsd"),
        versionRegexes: []
    }], Le = {
        browsers: v(Se),
        oses: v(Ne)
    }, _e = function(t) {
        var e, n, r, o, i, a, u, c, s, f, l, d = Le.browsers(), m = Le.oses(), p = pe(d, t).fold(ie.unknown, ie.nu), g = ge(m, t).fold(de.unknown, de.nu);
        return {
            browser: p,
            os: g,
            deviceType: (n = p,
            r = t,
            o = (e = g).isiOS() && !0 === /ipad/i.test(r),
            i = e.isiOS() && !o,
            a = e.isAndroid() && 3 === e.version.major,
            u = e.isAndroid() && 4 === e.version.major,
            c = o || a || u && !0 === /mobile/i.test(r),
            s = e.isiOS() || e.isAndroid(),
            f = s && !c,
            l = n.isSafari() && e.isiOS() && !1 === /safari/i.test(r),
            {
                isiPad: v(o),
                isiPhone: v(i),
                isTablet: v(c),
                isPhone: v(f),
                isTouch: v(s),
                isAndroid: e.isAndroid,
                isiOS: e.isiOS,
                isWebView: v(l)
            })
        }
    }, Oe = {
        detect: Zt(function() {
            var t = l.navigator.userAgent;
            return _e(t)
        })
    }, Ce = function() {
        return bt.getOrDie("URL")
    }, De = function(t) {
        return Ce().createObjectURL(t)
    }, Pe = function(t) {
        Ce().revokeObjectURL(t)
    }, Ae = (l.Node.ATTRIBUTE_NODE,
    l.Node.CDATA_SECTION_NODE,
    l.Node.COMMENT_NODE), ke = l.Node.DOCUMENT_NODE, Me = (l.Node.DOCUMENT_TYPE_NODE,
    l.Node.DOCUMENT_FRAGMENT_NODE,
    l.Node.ELEMENT_NODE), Re = l.Node.TEXT_NODE, Fe = (l.Node.PROCESSING_INSTRUCTION_NODE,
    l.Node.ENTITY_REFERENCE_NODE,
    l.Node.ENTITY_NODE,
    l.Node.NOTATION_NODE,
    function(t) {
        return t.dom().nodeName.toLowerCase()
    }
    ), je = function(t) {
        return t.dom().nodeType
    }, Ue = function(e) {
        return function(t) {
            return je(t) === e
        }
    }, Be = function(t) {
        return je(t) === Ae || "#comment" === Fe(t)
    }, Ye = Ue(Me), We = Ue(Re), He = function(t, e, n) {
        if (!(R(n) || U(n) || Y(n)))
            throw l.console.error("Invalid call to Attr.set. Key ", e, ":: Value ", n, ":: Element ", t),
            new Error("Attribute value was not simple");
        t.setAttribute(e, n + "")
    }, qe = function(t, e, n) {
        He(t.dom(), e, n)
    }, $e = function(t, e) {
        var n = t.dom();
        it(e, function(t, e) {
            He(n, e, t)
        })
    }, Ve = function(t, e) {
        var n = t.dom().getAttribute(e);
        return null === n ? void 0 : n
    }, Xe = function(t, e) {
        var n = t.dom();
        return !(!n || !n.hasAttribute) && n.hasAttribute(e)
    }, Ge = function(t, e) {
        t.dom().removeAttribute(e)
    }, ze = Oe.detect(), Ke = function(t) {
        var e = De(t);
        return Je(t, e)
    }, Je = function(i, a) {
        return Vt.nu(function(o) {
            At(i).then(function(t) {
                var e = Ut(i, t)
                  , n = Jt("image")
                  , r = gt.blob(n, e, a);
                o(r)
            })
        })
    }, Ze = function(t) {
        return 1 === t.length && q(t, "Files")
    }, Qe = function(t) {
        return !q(t, "text/_moz_htmlcontext")
    }, tn = function(t) {
        return q(t, "Files")
    }, en = function(t) {
        return !0
    }, nn = {
        multiple: function(t) {
            return 0 === t.length ? Vt.pure([]) : zt(t, Ke)
        },
        toFiles: function(t) {
            return t.raw().target.files || t.raw().dataTransfer.files
        },
        isFiles: ze.browser.isChrome() || ze.browser.isSafari() || ze.browser.isOpera() ? tn : ze.browser.isFirefox() ? Qe : ze.browser.isIE() ? Ze : en,
        fromImages: function(t) {
            var e = V(t, function(t) {
                var e = Jt("image");
                return gt.url(e, Ve(t, "src"), t)
            });
            return Vt.pure(e)
        },
        single: Ke,
        singleWithUrl: Je
    }, rn = {
        multiple: function(t) {
            return nn.multiple(t)
        },
        single: function(t) {
            return nn.single(t)
        },
        singleWithUrl: function(t, e) {
            return nn.singleWithUrl(t, e)
        }
    }, on = function(t) {
        if (null == t)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: v(t)
        }
    }, an = {
        fromHtml: function(t, e) {
            var n = (e || l.document).createElement("div");
            if (n.innerHTML = t,
            !n.hasChildNodes() || 1 < n.childNodes.length)
                throw l.console.error("HTML does not have a single root node", t),
                new Error("HTML must have a single root node");
            return on(n.childNodes[0])
        },
        fromTag: function(t, e) {
            var n = (e || l.document).createElement(t);
            return on(n)
        },
        fromText: function(t, e) {
            var n = (e || l.document).createTextNode(t);
            return on(n)
        },
        fromDom: on,
        fromPoint: function(t, e, n) {
            var r = t.dom();
            return k.from(r.elementFromPoint(e, n)).map(on)
        }
    }, un = {
        "cement.dialog.paste.title": "Paste Formatting Options",
        "cement.dialog.paste.instructions": "Choose to keep or remove formatting in the pasted content.",
        "cement.dialog.paste.merge": "Keep Formatting",
        "cement.dialog.paste.clean": "Remove Formatting",
        "loading.wait": "Please wait...",
        "safari.imagepaste": 'Safari does not support direct paste of images. <a href="https://support.ephox.com/entries/88543243-Safari-Direct-paste-of-images-does-not-work" style="text-decoration: underline">More information on image pasting for Safari</a>',
        "webview.imagepaste": 'Safari does not support direct paste of images. <a href="https://support.ephox.com/entries/88543243-Safari-Direct-paste-of-images-does-not-work" style="text-decoration: underline">More information on image pasting for Safari</a>',
        "error.code.images.not.found": "The images service was not found: (",
        "error.imageupload": "Image failed to upload: (",
        "error.full.stop": ").",
        "errors.local.images.disallowed": "Local image paste has been disabled. Local images have been removed from pasted content.",
        "errors.imageimport.failed": "Some images failed to import.",
        "errors.imageimport.unsupported": "Unsupported image type.",
        "errors.imageimport.invalid": "Image is invalid."
    }, cn = {
        translate: function(t) {
            return tinymce.translate(un[t])
        }
    }, sn = {
        insert: function(t, e) {
            var n, r = e.getDoc(), o = "ephoxInsertMarker", i = e.selection, a = e.dom;
            i.setContent('<span id="' + o + '">&nbsp;</span>'),
            n = a.get(o);
            for (var u = r.createDocumentFragment(); t.firstChild && !a.isBlock(t.firstChild); )
                u.appendChild(t.firstChild);
            for (var c = r.createDocumentFragment(); t.lastChild && !a.isBlock(t.lastChild); )
                c.appendChild(t.lastChild);
            if (n.parentNode.insertBefore(u, n),
            a.insertAfter(c, n),
            t.firstChild) {
                if (a.isBlock(t.firstChild)) {
                    for (; !a.isBlock(n.parentNode) && n.parentNode !== a.getRoot(); )
                        n = a.split(n.parentNode, n);
                    a.is(n.parentNode, "td,th") || n.parentNode === a.getRoot() || (n = a.split(n.parentNode, n))
                }
                a.replace(t, n)
            } else
                a.remove(n)
        }
    }, fn = {
        each: tinymce.each,
        trim: tinymce.trim,
        bind: function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        },
        extend: function(n) {
            for (var t = [], e = 1; e < arguments.length; e++)
                t[e - 1] = arguments[e];
            return tinymce.each(Array.prototype.slice.call(arguments, 1), function(t) {
                for (var e in t)
                    n[e] = t[e]
            }),
            n
        },
        ephoxGetComputedStyle: function(t) {
            return t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle || {}
        },
        log: function(t) {
            "undefined" != typeof console && console.log && console.log(t)
        },
        compose: function(t) {
            var r = Array.prototype.slice.call(t).reverse();
            return function(t) {
                for (var e = t, n = 0; n < r.length; n++)
                    e = (0,
                    r[n])(e);
                return e
            }
        }
    }, ln = {
        strip_class_attributes: "all",
        retain_style_properties: "none"
    }, dn = {
        strip_class_attributes: "none",
        retain_style_properties: "valid"
    }, mn = function(t, e, n) {
        var r = function(t, e) {
            if (t && "string" != typeof t)
                return t;
            switch (t) {
            case "clean":
                return ln;
            case "merge":
                return dn;
            default:
                return e
            }
        }(t, e);
        return r = fn.extend(r, {
            base_64_images: n
        })
    }, pn = {
        create: function(t, e, n) {
            var r = mn(t, ln, n)
              , o = mn(e, dn, n)
              , i = o;
            return {
                setWordContent: function(t) {
                    i = t ? r : o
                },
                get: function(t) {
                    return i[t]
                }
            }
        }
    }, gn = "startElement", vn = "endElement", hn = "text", yn = "comment", bn = function(o) {
        var i, e, a = 0, u = function() {
            return i
        };
        e = function() {
            return i = {},
            a = 0,
            fn.each(o.attributes, function(t) {
                var e, n = t.nodeName, r = t.value;
                (!1 !== (e = t).specified || "name" === e.nodeName && "" !== e.value) && null != r && (i[n] = r,
                a++)
            }),
            void 0 === i.style && o.style.cssText && (i.style = o.style.cssText,
            a++),
            e = u,
            i
        }
        ;
        var c, s, f = function(n) {
            fn.each(e(), function(t, e) {
                n(e, t)
            })
        };
        return {
            get: function(t) {
                return e()[t]
            },
            each: f,
            filter: function(t) {
                var n, r;
                c || (s = e),
                r = t,
                c = (n = c) && r ? function(t, e) {
                    return r(t, n(t, e))
                }
                : n || r,
                e = function() {
                    return e = s,
                    f(function(t, e) {
                        var n = c(t, e);
                        null === n ? (o.removeAttribute(t),
                        delete i[t],
                        a--) : n !== e && ("class" === t ? o.className = n : o.setAttribute(t, n),
                        i[t] = n)
                    }),
                    e = u,
                    i
                }
            },
            getAttributes: function() {
                return e()
            },
            getAttributeCount: function() {
                return e(),
                a
            }
        }
    }, Tn = function(t) {
        return t.replace(/-(.)/g, function(t, e) {
            return e.toUpperCase()
        })
    }, xn = !1, En = function(i, t, e) {
        var n, r, o, a, u, c, s, f, l, d;
        switch (i.nodeType) {
        case 1:
            t ? n = vn : (n = gn,
            a = bn(i),
            u = {},
            c = i,
            s = function(t, e) {
                u[t] = e
            }
            ,
            null != (d = e || c.getAttribute("style")) && d.split || (d = c.style.cssText),
            fn.each(d.split(";"), function(t) {
                var e = t.indexOf(":");
                0 < e && ((f = fn.trim(t.substring(0, e))).toUpperCase() === f && (f = f.toLowerCase()),
                f = f.replace(/([A-Z])/g, function(t, e) {
                    return "-" + e.toLowerCase()
                }),
                l = fn.trim(t.substring(e + 1)),
                xn || (xn = 0 === f.indexOf("mso-")),
                s(f, l))
            }),
            xn || (l = c.style["mso-list"]) && s("mso-list", l)),
            r = "HTML" !== i.scopeName && i.scopeName && i.tagName && i.tagName.indexOf(":") <= 0 ? (i.scopeName + ":" + i.tagName).toUpperCase() : i.tagName;
            break;
        case 3:
            n = hn,
            o = i.nodeValue;
            break;
        case 8:
            n = yn,
            o = i.nodeValue;
            break;
        default:
            fn.log("WARNING: Unsupported node type encountered: " + i.nodeType)
        }
        var m = function() {
            return n
        }
          , p = function(t) {
            n === gn && a.filter(t)
        };
        return {
            getNode: function() {
                return a && a.getAttributes(),
                i
            },
            tag: function() {
                return r
            },
            type: m,
            text: function() {
                return o
            },
            toString: function() {
                return "Type: " + n + ", Tag: " + r + " Text: " + o
            },
            getAttribute: function(t) {
                return a.get(t.toLowerCase())
            },
            filterAttributes: p,
            filterStyles: function(r) {
                if (m() === gn) {
                    var o = "";
                    fn.each(u, function(t, e) {
                        var n = r(e, t);
                        null === n ? (i.style.removeProperty ? i.style.removeProperty(Tn(e)) : i.style.removeAttribute(Tn(e)),
                        delete u[e]) : (o += e + ": " + n + "; ",
                        u[e] = n)
                    }),
                    o = o || null,
                    p(function(t, e) {
                        return "style" === t ? o : e
                    }),
                    i.style.cssText = o
                }
            },
            getAttributeCount: function() {
                return a.getAttributeCount()
            },
            attributes: function(t) {
                a.each(t)
            },
            getStyle: function(t) {
                return u[t]
            },
            styles: function(n) {
                fn.each(u, function(t, e) {
                    n(e, t)
                })
            },
            getComputedStyle: function() {
                return fn.ephoxGetComputedStyle(i)
            },
            isWhitespace: function() {
                return n === hn && /^[\s\u00A0]*$/.test(o)
            }
        }
    }, wn = function(t, e) {
        return En(e.createElement(t), !0)
    }, In = wn("HTML", window.document), Sn = {
        START_ELEMENT_TYPE: gn,
        END_ELEMENT_TYPE: vn,
        TEXT_TYPE: hn,
        COMMENT_TYPE: yn,
        FINISHED: In,
        token: En,
        createStartElement: function(t, e, n, r) {
            var o = r.createElement(t)
              , i = "";
            return fn.each(e, function(t, e) {
                o.setAttribute(e, t)
            }),
            fn.each(n, function(t, e) {
                i += e + ":" + t + ";",
                o.style[Tn(e)] = t
            }),
            En(o, !1, "" !== i ? i : null)
        },
        createEndElement: wn,
        createComment: function(t, e) {
            return En(e.createComment(t), !1)
        },
        createText: function(t, e) {
            return En(e.createTextNode(t))
        }
    }, Nn = function(i) {
        var a = i.createDocumentFragment()
          , u = function(t) {
            a.appendChild(t)
        };
        return {
            dom: a,
            receive: function(t) {
                var e, n, r, o;
                switch (t.type()) {
                case Sn.START_ELEMENT_TYPE:
                    o = t.getNode().cloneNode(!1),
                    u(r = o),
                    a = r;
                    break;
                case Sn.TEXT_TYPE:
                    e = t,
                    n = i.createTextNode(e.text()),
                    u(n);
                    break;
                case Sn.END_ELEMENT_TYPE:
                    a = a.parentNode;
                    break;
                case Sn.COMMENT_TYPE:
                    break;
                default:
                    throw {
                        message: "Unsupported token type: " + t.type()
                    }
                }
            }
        }
    }, Ln = function(t, o) {
        var i;
        o = o || window.document,
        i = o.createElement("div"),
        o.body.appendChild(i),
        i.style.position = "absolute",
        i.style.left = "-10000px",
        i.innerHTML = t;
        var a = i.firstChild || Sn.FINISHED
          , u = []
          , c = !1;
        return {
            hasNext: function() {
                return void 0 !== a
            },
            next: function() {
                var t, e, n = a, r = c;
                return !c && a.firstChild ? (u.push(a),
                a = a.firstChild) : c || 1 !== a.nodeType ? a.nextSibling ? (a = a.nextSibling,
                c = !1) : (a = u.pop(),
                c = !0) : c = !0,
                n === Sn.FINISHED || a || (o.body.removeChild(i),
                a = Sn.FINISHED),
                e = r,
                (t = n) === Sn.FINISHED ? t : t ? Sn.token(t, e) : void 0
            }
        }
    }, _n = function(p, g) {
        return function(e, t, n) {
            var r, o, i, a = !1, u = function() {
                g && g(m),
                a = !1,
                o = [],
                i = []
            }, c = function(t) {
                fn.each(t, function(t) {
                    e.receive(t)
                })
            }, s = function(t) {
                a ? i.push(t) : e.receive(t)
            }, f = function() {
                l(),
                c(i),
                u()
            }, l = function() {
                fn.each(r, function(t) {
                    s(t)
                }),
                d()
            }, d = function() {
                r = []
            }, m = {
                document: n || window.document,
                settings: t || {},
                emit: s,
                receive: function(t) {
                    g && o.push(t),
                    p(m, t),
                    t === Sn.FINISHED && f()
                },
                startTransaction: function() {
                    a = !0
                },
                rollback: function() {
                    c(o),
                    u()
                },
                commit: f,
                defer: function(t) {
                    (r = r || []).push(t)
                },
                hasDeferred: function() {
                    return r && 0 < r.length
                },
                emitDeferred: l,
                dropDeferred: d
            };
            return u(),
            m
        }
    }, On = _n, Cn = function(n) {
        return _n(function(t, e) {
            e.filterAttributes(fn.bind(n, t)),
            t.emit(e)
        })
    }, Dn = /^(P|H[1-6]|T[DH]|LI|DIV|BLOCKQUOTE|PRE|ADDRESS|FIELDSET|DD|DT|CENTER)$/, Pn = function() {
        return null
    }, An = !1, kn = On(function(t, e) {
        var n, r = function() {
            An || (t.emit(Sn.createStartElement("P", {}, {}, t.document)),
            An = !0)
        };
        switch (e.type()) {
        case Sn.TEXT_TYPE:
            r(),
            t.emit(e);
            break;
        case Sn.END_ELEMENT_TYPE:
            An && (n = e,
            Dn.test(n.tag()) || e === Sn.FINISHED) ? (t.emit(Sn.createEndElement("P", t.document)),
            An = !1) : "BR" === e.tag() && t.emit(e);
            break;
        case Sn.START_ELEMENT_TYPE:
            "BR" === e.tag() ? (e.filterAttributes(Pn),
            e.filterStyles(Pn),
            t.emit(e)) : "IMG" === e.tag() && e.getAttribute("alt") && (r(),
            t.emit(Sn.createText(e.getAttribute("alt"), t.document)))
        }
        e === Sn.FINISHED && t.emit(e)
    }), Mn = function(t) {
        var e = t;
        return 65279 === e.charCodeAt(e.length - 1) ? e.substring(0, e.length - 1) : t
    }, Rn = [Mn], Fn = tinymce.isIE && 9 <= document.documentMode ? [function(t) {
        return t.replace(/<BR><BR>/g, "<br>")
    }
    , function(t) {
        return t.replace(/<br>/g, " ")
    }
    , function(t) {
        return t.replace(/<br><br>/g, "<BR><BR>")
    }
    , function(t) {
        return /<(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)/.test(t) ? t.replace(/(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g, "$1") : t
    }
    ].concat(Rn) : Rn, jn = {
        all: fn.compose(Fn),
        textOnly: Mn
    }, Un = /^(mso-.*|tab-stops|tab-interval|language|text-underline|text-effect|text-line-through|font-color|horiz-align|list-image-[0-9]+|separator-image|table-border-color-(dark|light)|vert-align|vnd\..*)$/, Bn = On(function(t, e) {
        var r, n = t.settings.get("retain_style_properties");
        e.filterStyles((r = n,
        function(t, e) {
            var n = !1;
            switch (r) {
            case "all":
            case "*":
                n = !0;
                break;
            case "valid":
                n = !Un.test(t);
                break;
            case void 0:
            case "none":
                n = "list-style-type" === t;
                break;
            default:
                n = 0 <= ("," + r + ",").indexOf("," + t + ",")
            }
            return n ? e : null
        }
        )),
        t.emit(e)
    }), Yn = On(function(t, e) {
        t.seenList || (t.inferring ? "LI" === e.tag() && (e.type() === Sn.START_ELEMENT_TYPE ? t.inferring++ : (t.inferring--,
        t.inferring || (t.needsClosing = !0))) : ("OL" === e.tag() || "UL" === e.tag() ? t.seenList = !0 : "LI" === e.tag() && (t.inferring = 1,
        t.needsClosing || t.emit(Sn.createStartElement("UL", {}, {}, t.document))),
        !t.needsClosing || t.inferring || e.isWhitespace() || (t.needsClosing = !1,
        t.emit(Sn.createEndElement("UL", t.document))))),
        t.emit(e)
    }), Wn = Cn(function(t, e) {
        return "name" === t || "id" === t ? null : e
    }), Hn = Cn(function(t, e) {
        if ("class" === t)
            switch (this.settings.get("strip_class_attributes")) {
            case "mso":
                return 0 === e.indexOf("Mso") ? null : e;
            case "none":
                return e;
            default:
                return null
            }
        return e
    }), qn = function() {
        if (0 < navigator.userAgent.indexOf("Gecko") && navigator.userAgent.indexOf("WebKit") < 0)
            return !1;
        var t = document.createElement("div");
        try {
            t.innerHTML = '<p style="mso-list: Ignore;">&nbsp;</p>'
        } catch (t) {
            return !1
        }
        return "Ignore" === Sn.token(t.firstChild).getStyle("mso-list")
    }(), $n = function(t, e) {
        return t.type() === Sn.START_ELEMENT_TYPE ? 0 === t.getAttributeCount() || e && 1 === t.getAttributeCount() && null !== t.getAttribute("style") && void 0 !== t.getAttribute("style") : t.type() === Sn.END_ELEMENT_TYPE
    }, Vn = qn, Xn = function(t) {
        return "A" === t.tag() || "SPAN" === t.tag()
    }, Gn = function(t) {
        var e = t.getStyle("mso-list");
        return e && "skip" !== e
    }, zn = [], Kn = [], Jn = !1, Zn = function(t, e) {
        var n, r, o = 1;
        for (n = e + 1; n < t; n++)
            if ((r = zn[n]) && "SPAN" === r.tag())
                if (r.type() === Sn.START_ELEMENT_TYPE)
                    o++;
                else if (r.type() === Sn.END_ELEMENT_TYPE && 0 === --o)
                    return void (zn[n] = null)
    }, Qn = function(t, e) {
        if (zn.push(e),
        Kn = Kn || [],
        e.type() === Sn.START_ELEMENT_TYPE)
            Kn.push(e);
        else if (e.type() === Sn.END_ELEMENT_TYPE && (Kn.pop(),
        0 === Kn.length))
            return void function(t) {
                if (Jn) {
                    var e = void 0
                      , n = zn.length
                      , r = void 0;
                    for (r = 0; r < n; r++)
                        (e = zn[r]) && (e.type() === Sn.START_ELEMENT_TYPE && "SPAN" === e.tag() && $n(e) ? Zn(n, r) : t.emit(e))
                }
                zn = [],
                Kn = [],
                Jn = !1
            }(t)
    }, tr = On(function(t, e) {
        var n = function(t) {
            return !(0 <= ",FONT,EM,STRONG,SAMP,ACRONYM,CITE,CODE,DFN,KBD,TT,B,I,U,S,SUB,SUP,INS,DEL,VAR,SPAN,".indexOf("," + t.tag() + ",") && $n(t, !0))
        };
        0 === (zn = zn || []).length ? e.type() === Sn.START_ELEMENT_TYPE ? n(e) ? t.emit(e) : Qn(t, e) : t.emit(e) : (Jn || (Jn = n(e)),
        Qn(t, e))
    }), er = Cn(function(t, e) {
        return "style" === t && "" === e ? null : e
    }), nr = Cn(function(t, e) {
        return "lang" === t ? null : e
    }), rr = On(function(t, e) {
        if ("IMG" === e.tag()) {
            if (e.type() === Sn.END_ELEMENT_TYPE && t.skipEnd)
                return void (t.skipEnd = !1);
            if (e.type() === Sn.START_ELEMENT_TYPE) {
                if (/^file:/.test(e.getAttribute("src")))
                    return void (t.skipEnd = !0);
                if (t.settings.get("base_64_images") && /^data:image\/.*;base64/.test(e.getAttribute("src")))
                    return void (t.skipEnd = !0)
            }
        }
        t.emit(e)
    }), or = On(function(t, e) {
        "META" !== e.tag() && "LINK" !== e.tag() && t.emit(e)
    }), ir = function(t) {
        return !$n(t) && !/^OLE_LINK/.test(t.getAttribute("name"))
    }, ar = [], ur = On(function(t, e) {
        var n;
        e.type() === Sn.START_ELEMENT_TYPE && "A" === e.tag() ? (ar.push(e),
        ir(e) && t.defer(e)) : e.type() === Sn.END_ELEMENT_TYPE && "A" === e.tag() ? (n = ar.pop(),
        ir(n) && t.defer(e),
        0 === ar.length && t.emitDeferred()) : t.hasDeferred() ? t.defer(e) : t.emit(e)
    }), cr = !1, sr = [On(function(t, e) {
        "SCRIPT" === e.tag() ? cr = e.type() === Sn.START_ELEMENT_TYPE : cr || (e.filterAttributes(function(t, e) {
            return /^on/.test(t) || "language" === t ? null : e
        }),
        t.emit(e))
    }), Wn, rr, Bn, nr, er, Hn, ur, tr, or, Yn], fr = On(function(t, n) {
        n.filterAttributes(function(t, e) {
            return "align" === t ? null : "UL" !== n.tag() && "OL" !== n.tag() || "type" !== t ? e : null
        }),
        t.emit(n)
    }), lr = Cn(function(t, e) {
        return /^xmlns(:|$)/.test(t) ? null : e
    }), dr = On(function(t, e) {
        e.tag && /^([OVWXP]|U[0-9]+|ST[0-9]+):/.test(e.tag()) || t.emit(e)
    }), mr = Cn(function(t, e) {
        return "href" === t && (0 <= e.indexOf("#_Toc") || 0 <= e.indexOf("#_mso")) ? null : e
    }), pr = Cn(function(t, e) {
        return /^v:/.test(t) ? null : e
    }), gr = [{
        regex: /^\(?[dc][\.\)]$/,
        type: {
            tag: "OL",
            type: "lower-alpha"
        }
    }, {
        regex: /^\(?[DC][\.\)]$/,
        type: {
            tag: "OL",
            type: "upper-alpha"
        }
    }, {
        regex: /^\(?M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[\.\)]$/,
        type: {
            tag: "OL",
            type: "upper-roman"
        }
    }, {
        regex: /^\(?m*(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})[\.\)]$/,
        type: {
            tag: "OL",
            type: "lower-roman"
        }
    }, {
        regex: /^\(?[0-9]+[\.\)]$/,
        type: {
            tag: "OL"
        }
    }, {
        regex: /^([0-9]+\.)*[0-9]+\.?$/,
        type: {
            tag: "OL",
            variant: "outline"
        }
    }, {
        regex: /^\(?[a-z]+[\.\)]$/,
        type: {
            tag: "OL",
            type: "lower-alpha"
        }
    }, {
        regex: /^\(?[A-Z]+[\.\)]$/,
        type: {
            tag: "OL",
            type: "upper-alpha"
        }
    }], vr = {
        "\u2022": {
            tag: "UL",
            type: "disc"
        },
        "\xb7": {
            tag: "UL",
            type: "disc"
        },
        "\xa7": {
            tag: "UL",
            type: "square"
        }
    }, hr = {
        o: {
            tag: "UL",
            type: "circle"
        },
        "-": {
            tag: "UL",
            type: "disc"
        },
        "\u25cf": {
            tag: "UL",
            type: "disc"
        }
    }, yr = function(t, e) {
        var n = {
            tag: t.tag,
            type: t.type,
            variant: e
        };
        return t.start && (n.start = t.start),
        t.type || delete n.type,
        n
    }, br = function(t, e, n) {
        return t === e || t && e && t.tag === e.tag && t.type === e.type && (n || t.variant === e.variant)
    }, Tr = {
        guessListType: function(t, e, n) {
            var r, o, i, a = null;
            return t && (r = t.text,
            o = t.symbolFont),
            r = fn.trim(r),
            (a = hr[r]) ? a = yr(a, r) : o ? a = (a = vr[r]) ? yr(a, r) : {
                tag: "UL",
                variant: r
            } : (fn.each(gr, function(t) {
                if (t.regex.test(r)) {
                    if (e && br(t.type, e, !0))
                        return (a = t.type).start = parseInt(r, 10),
                        !1;
                    a || (a = t.type),
                    a.start = parseInt(r, 10)
                }
            }),
            a && !a.variant && (i = "(" === r.charAt(0) ? "()" : ")" === r.charAt(r.length - 1) ? ")" : ".",
            a = yr(a, i))),
            a && "OL" === a.tag && n && ("P" !== n.tag() || /^MsoHeading/.test(n.getAttribute("class"))) && (a = null),
            a
        },
        eqListType: br,
        checkFont: function(t, e) {
            if (t.type() === Sn.START_ELEMENT_TYPE) {
                var n = t.getStyle("font-family");
                n ? e = "Wingdings" === n || "Symbol" === n : /^(P|H[1-6]|DIV)$/.test(t.tag()) && (e = !1)
            }
            return e
        }
    }, xr = function(t) {
        var e = t.indexOf(".");
        if (0 <= e && void 0 === fn.trim(t.substring(e + 1)))
            return (void 0)[2],
            !1
    }, Er = (Ft = function(t, e) {
        var n, r = /([^{]+){([^}]+)}/g;
        for (r.lastIndex = 0; null !== (n = r.exec(t)); )
            fn.each(n[1].split(","), xr(void 0));
        return !1
    }
    ,
    jt = {},
    function(t, e) {
        var n, r = t + "," + e;
        return jt.hasOwnProperty(r) ? jt[r] : (n = Ft.call(null, t, e),
        jt[r] = n)
    }
    ), wr = function(t, e) {
        var n, r, o, i = !1, a = function(t) {
            var e = t.style.fontFamily;
            e && (i = "Wingdings" === e || "Symbol" === e)
        };
        if (t.type() === Sn.START_ELEMENT_TYPE && e.openedTag && "SPAN" === t.tag()) {
            for (a(n = e.openedTag.getNode()),
            1 < n.childNodes.length && "A" === n.firstChild.tagName && "" === n.firstChild.textContent && (n = n.childNodes[1]); n.firstChild && ("SPAN" === n.firstChild.tagName || "A" === n.firstChild.tagName); )
                a(n = n.firstChild);
            if (!(n = n.firstChild) || 3 !== n.nodeType)
                return n && "IMG" === n.tagName;
            if (r = n.value,
            fn.trim(r) || (r = (n = n.parentNode.nextSibling) ? n.value : ""),
            !n || fn.trim(n.parentNode.textContent) != r)
                return !1;
            if (o = Tr.guessListType({
                text: r,
                symbolFont: i
            }, null, e.originalToken))
                return n.nextSibling && "SPAN" === n.nextSibling.tagName && /^[\u00A0\s]/.test(n.nextSibling.firstChild.value) && ("P" === e.openedTag.tag() || "UL" === o.tag)
        }
        return !1
    }, Ir = function() {
        var a, u;
        return {
            guessIndentLevel: function(t, e, n, r) {
                var o, i;
                return r && /^([0-9]+\.)+[0-9]+\.?$/.test(r.text) ? r.text.replace(/([0-9]+|\.$)/g, "").length + 1 : (o = u || parseInt(Er(n, e.getAttribute("class"))),
                i = function(t, e) {
                    var n, r = 0;
                    for (n = t.parentNode; null != n && n !== e.parentNode; )
                        r += n.offsetLeft,
                        n = n.offsetParent;
                    return r
                }(t.getNode(), e.getNode()),
                o ? a ? i += a : 0 === i && (i += a = o) : o = 48,
                u = o = Math.min(i, o),
                Math.max(1, Math.floor(i / o)) || 1)
            }
        }
    }, Sr = function() {
        var e = !1;
        return {
            check: function(t) {
                return e && t.type() === Sn.TEXT_TYPE ? (t.text(),
                !0) : t.type() === Sn.START_ELEMENT_TYPE && "STYLE" === t.tag() ? e = !0 : t.type() === Sn.END_ELEMENT_TYPE && "STYLE" === t.tag() && !(e = !1)
            }
        }
    }, Nr = ["disc", "circle", "square"];
    function Lr(a, u) {
        var i, o = [], c = [], s = 0, f = function(t, e) {
            var n = {}
              , r = {};
            s++,
            e && t.type && (n = {
                "list-style-type": t.type
            }),
            t.start && 1 < t.start && (r = {
                start: t.start
            }),
            o.push(t),
            a.emit(Sn.createStartElement(t.tag, r, n, u)),
            i = t
        }, l = function() {
            a.emit(Sn.createEndElement(o.pop().tag, u)),
            s--,
            i = o[o.length - 1]
        }, d = function() {
            var t = c ? c.pop() : "P";
            "P" !== t && a.emit(Sn.createEndElement(t, u)),
            a.emit(Sn.createEndElement("LI", u))
        }, m = function(t, e, n) {
            var r = {};
            if (t) {
                var o = t.getStyle("margin-left");
                void 0 !== o && (r["margin-left"] = o)
            } else
                r["list-style-type"] = "none";
            i && !Tr.eqListType(i, e) && (l(),
            n && (a.emit(Sn.createStartElement("P", {}, {}, u)),
            a.emit(Sn.createText("\xa0", u)),
            a.emit(Sn.createEndElement("P", u))),
            f(e, !0)),
            a.emit(Sn.createStartElement("LI", {}, r, u)),
            t && "P" !== t.tag() ? (c.push(t.tag()),
            t.filterStyles(function() {
                return null
            }),
            a.emit(t)) : c.push("P")
        };
        return {
            openList: f,
            closelist: l,
            closeAllLists: function() {
                for (; 0 < s; )
                    d(),
                    l();
                a.commit()
            },
            closeItem: d,
            openLI: m,
            openItem: function(t, e, n, r) {
                if (n) {
                    for (s || (s = 0); t < s; )
                        d(),
                        l();
                    var o, i;
                    if (i = t,
                    "UL" === (o = n).tag && Nr[i - 1] === o.type && (o = {
                        tag: "UL"
                    }),
                    n = o,
                    s === t)
                        d(),
                        m(e, n, r);
                    else
                        for (1 < t && 0 < c.length && "P" !== c[c.length - 1] && (a.emit(Sn.createEndElement(c[c.length - 1], u)),
                        c[c.length - 1] = "P"); s < t; )
                            f(n, s === t - 1),
                            m(s === t ? e : void 0, n)
                }
            },
            getCurrentListType: function() {
                return i
            },
            getCurrentLevel: function() {
                return s
            }
        }
    }
    var _r = function(t, e) {
        fn.log("Unexpected token in list conversion: " + e.toString()),
        t.rollback()
    }
      , Or = function(t, e, n) {
        n.type() === Sn.TEXT_TYPE && "" === fn.trim(n.text()) ? t.defer(n) : e.skippedPara || n.type() !== Sn.START_ELEMENT_TYPE || "P" !== n.tag() || Gn(n) ? Dr(t, e, n) : (e.openedTag = n,
        t.defer(n),
        e.nextFilter = Cr)
    }
      , Cr = function(t, e, n) {
        n.type() !== Sn.START_ELEMENT_TYPE || "SPAN" !== n.tag() || 0 !== e.spanCount.length || !Vn && wr(n, e) || Gn(n) ? n.type() === Sn.END_ELEMENT_TYPE ? "SPAN" === n.tag() ? (t.defer(n),
        e.spanCount.pop()) : "P" === n.tag() ? (t.defer(n),
        e.skippedPara = !0,
        e.openedTag = null,
        e.nextFilter = Or) : (e.nextFilter = Dr,
        e.nextFilter(t, e, n)) : n.isWhitespace() ? t.defer(n) : (e.nextFilter = Dr,
        e.nextFilter(t, e, n)) : (t.defer(n),
        e.spanCount.push(n))
    }
      , Dr = function(t, e, n) {
        var r = function() {
            e.emitter.closeAllLists(),
            t.emitDeferred(),
            e.openedTag = null,
            t.emit(n),
            e.nextFilter = Dr
        };
        if (n.type() === Sn.START_ELEMENT_TYPE && Gn(n) && "LI" !== n.tag()) {
            var o = / level([0-9]+)/.exec(n.getStyle("mso-list"));
            o && o[1] ? (e.itemLevel = parseInt(o[1], 10) + e.styleLevelAdjust,
            e.nextFilter === Dr ? t.emitDeferred() : t.dropDeferred(),
            e.nextFilter = Ar,
            t.startTransaction(),
            e.originalToken = n,
            e.commentMode = !1) : r()
        } else
            !Vn && (n.type() === Sn.COMMENT_TYPE && "[if !supportLists]" === n.text() || wr(n, t)) ? (n.type() === Sn.START_ELEMENT_TYPE && "SPAN" === n.tag() && e.spanCount.push(n),
            e.nextFilter = Ar,
            t.startTransaction(),
            e.originalToken = e.openedTag,
            e.commentMode = !0,
            e.openedTag = null,
            t.dropDeferred()) : n.type() === Sn.END_ELEMENT_TYPE && Xn(n) ? (t.defer(n),
            e.spanCount.pop()) : n.type() === Sn.START_ELEMENT_TYPE ? Xn(n) ? (t.defer(n),
            e.spanCount.push(n)) : (e.openedTag && (e.emitter.closeAllLists(),
            t.emitDeferred()),
            e.openedTag = n,
            t.defer(n)) : r()
    }
      , Pr = function(t, e, n) {
        n.type() === Sn.END_ELEMENT_TYPE && e.originalToken.tag() === n.tag() && (e.nextFilter = Or,
        e.styleLevelAdjust = -1),
        t.emit(n)
    }
      , Ar = function(t, e, n) {
        if (n.type() === Sn.START_ELEMENT_TYPE && "Ignore" === n.getStyle("mso-list") && (e.nextFilter = kr),
        n.type() === Sn.START_ELEMENT_TYPE && "SPAN" === n.tag())
            e.spanCount.push(n),
            (e.commentMode && "" === n.getAttribute("style") || null === n.getAttribute("style")) && (e.nextFilter = kr);
        else if ("A" === n.tag())
            n.type() === Sn.START_ELEMENT_TYPE ? e.spanCount.push(n) : e.spanCount.pop();
        else if (n.type() === Sn.TEXT_TYPE)
            if (e.commentMode)
                e.nextFilter = kr,
                e.nextFilter(t, e, n);
            else {
                var r = e.originalToken
                  , o = e.spanCount;
                e.emitter.closeAllLists(),
                t.emit(r),
                fn.each(o, fn.bind(t.emit, t)),
                t.emit(n),
                t.commit(),
                e.originalToken = r,
                e.nextFilter = Pr
            }
        else
            (e.commentMode || n.type() !== Sn.COMMENT_TYPE) && _r(t, n)
    }
      , kr = function(t, e, n) {
        n.type() === Sn.TEXT_TYPE ? n.isWhitespace() || (e.nextFilter = Mr,
        e.bulletInfo = {
            text: n.text(),
            symbolFont: e.symbolFont
        }) : Xn(n) ? n.type() === Sn.START_ELEMENT_TYPE ? e.spanCount.push(n) : e.spanCount.pop() : n.type() === Sn.START_ELEMENT_TYPE && "IMG" === n.tag() ? (e.nextFilter = Mr,
        e.bulletInfo = {
            text: "\u2202",
            symbolFont: !0
        }) : _r(t, n)
    }
      , Mr = function(t, e, n) {
        n.type() === Sn.START_ELEMENT_TYPE && Xn(n) ? (e.spanCount.push(n),
        e.nextFilter = Rr) : n.type() === Sn.END_ELEMENT_TYPE && Xn(n) ? (e.spanCount.pop(),
        e.nextFilter = Fr) : n.type() === Sn.END_ELEMENT_TYPE && "IMG" === n.tag() || _r(t, n)
    }
      , Rr = function(t, e, n) {
        n.type() === Sn.END_ELEMENT_TYPE && (Xn(n) && e.spanCount.pop(),
        e.nextFilter = Fr)
    }
      , Fr = function(o, i, a) {
        var t = function(t) {
            var e, n, r;
            if (i.nextFilter = jr,
            i.commentMode && (i.itemLevel = i.indentGuesser.guessIndentLevel(a, i.originalToken, i.styles.styles, i.bulletInfo)),
            i.listType = Tr.guessListType(i.bulletInfo, (e = i.emitter.getCurrentListType(),
            n = i.emitter.getCurrentLevel(),
            r = i.itemLevel,
            n === r ? e : null), i.originalToken),
            i.listType) {
                for (i.emitter.openItem(i.itemLevel, i.originalToken, i.listType, i.skippedPara),
                o.emitDeferred(); 0 < i.spanCount.length; )
                    o.emit(i.spanCount.shift());
                t && o.emit(a)
            } else
                fn.log("Unknown list type: " + i.bulletInfo.text + " Symbol font? " + i.bulletInfo.symbolFont),
                o.rollback()
        };
        a.type() === Sn.TEXT_TYPE || a.type() === Sn.START_ELEMENT_TYPE ? t(!0) : a.type() === Sn.COMMENT_TYPE ? t("[endif]" !== a.text()) : a.type() === Sn.END_ELEMENT_TYPE ? Xn(a) && i.spanCount.pop() : _r(o, a)
    }
      , jr = function(t, e, n) {
        n.type() === Sn.END_ELEMENT_TYPE && n.tag() === e.originalToken.tag() ? (e.nextFilter = Or,
        e.skippedPara = !1) : t.emit(n)
    }
      , Ur = {
        initial: Dr
    }
      , Br = {}
      , Yr = function(t) {
        Br.nextFilter = Ur.initial,
        Br.itemLevel = 0,
        Br.originalToken = null,
        Br.commentMode = !1,
        Br.openedTag = null,
        Br.symbolFont = !1,
        Br.listType = null,
        Br.indentGuesser = Ir(),
        Br.emitter = Lr(t, t.document),
        Br.styles = Sr(),
        Br.spanCount = [],
        Br.skippedPara = !1,
        Br.styleLevelAdjust = 0,
        Br.bulletInfo = void 0
    };
    Yr({});
    var Wr = [dr, On(function(t, e) {
        Br.styles.check(e) || (Br.symbolFont = Tr.checkFont(e, Br.symbolFont),
        Br.nextFilter(t, Br, e))
    }, function(t) {
        Yr(t)
    }), mr, pr, lr, fr]
      , Hr = function(t, e, n, r) {
        for (var o = Nn(n), i = Ln(t, n), a = function(t, e, n, r) {
            var o, i = e;
            for (o = t.length - 1; 0 <= o; o--)
                i = t[o](i, n, r);
            return i
        }(r, o, e, n); i.hasNext(); )
            a.receive(i.next());
        return o.dom
    }
      , qr = function(t) {
        return 0 <= t.indexOf("<o:p>") || 0 <= t.indexOf("p.MsoNormal, li.MsoNormal, div.MsoNormal") || 0 <= t.indexOf("MsoListParagraphCxSpFirst") || 0 <= t.indexOf("<w:WordDocument>")
    }
      , $r = {
        filter: function(t, e, n) {
            var r = jn.all(t)
              , o = qr(r);
            e.setWordContent(o);
            var i = sr;
            return o && (i = Wr.concat(sr)),
            Hr(r, e, n, i)
        },
        filterPlainText: function(t, e, n) {
            var r = jn.textOnly(t);
            return Hr(r, e, n, [kn])
        },
        isWordContent: qr
    }
      , Vr = {
        officeStyles: "prompt",
        htmlStyles: "clean"
    }
      , Xr = {
        openDialog: function(t, e, n) {
            var r, o = e("cement.dialog.paste.clean"), i = e("cement.dialog.paste.merge"), a = [{
                text: o,
                ariaLabel: o,
                onclick: function() {
                    r.close(),
                    n("clean")
                }
            }, {
                text: i,
                ariaLabel: i,
                onclick: function() {
                    r.close(),
                    n("merge")
                }
            }], u = {
                title: e("cement.dialog.paste.title"),
                spacing: 10,
                padding: 10,
                items: [{
                    type: "container",
                    html: e("cement.dialog.paste.instructions")
                }],
                buttons: a
            };
            r = t.windowManager.open(u),
            setTimeout(function() {
                r && r.getEl().focus()
            }, 1)
        }
    }
      , Gr = {
        openDialog: function(t, e, n) {
            var r = e("cement.dialog.paste.clean")
              , o = e("cement.dialog.paste.merge")
              , i = {
                title: e("cement.dialog.paste.title"),
                body: {
                    type: "panel",
                    items: [{
                        type: "htmlpanel",
                        name: "instructions",
                        html: e("cement.dialog.paste.instructions")
                    }]
                },
                buttons: [{
                    text: r,
                    type: "custom",
                    name: "clean"
                }, {
                    text: o,
                    type: "custom",
                    name: "merge"
                }],
                onAction: function(t, e) {
                    switch (e.name) {
                    case "clean":
                        t.close(),
                        n("clean");
                        break;
                    case "merge":
                        t.close(),
                        n("merge")
                    }
                }
            };
            t.windowManager.open(i)
        }
    };
    function zr(a, u, c) {
        return {
            showDialog: function(o) {
                var t, e = a.settings.powerpaste_word_import || Vr.officeStyles, n = a.settings.powerpaste_html_import || Vr.htmlStyles, r = $r.isWordContent(o) ? e : n, i = function(t) {
                    var e = {
                        content: o
                    };
                    a.fire("PastePreProcess", {
                        content: e,
                        internal: !1
                    });
                    var n = pn.create(t, t, !0)
                      , r = $r.filter(e.content, n, a.getDoc());
                    a.fire("PastePostProcess", {
                        node: r,
                        internal: !1
                    }),
                    a.undoManager.transact(function() {
                        sn.insert(r, a)
                    })
                };
                "clean" === (t = r) || "merge" === t ? i(r) : (c ? Gr : Xr).openDialog(a, u, i)
            }
        }
    }
    function Kr(u, t, e, r, c) {
        var s, f = /^image\/(jpe?g|png|gif|bmp)$/i;
        u.on("dragstart dragend", function(t) {
            s = "dragstart" === t.type
        }),
        u.on("dragover dragend dragleave", function(t) {
            s || t.preventDefault()
        });
        var l = function(t, e) {
            return e in t && 0 < t[e].length
        }
          , d = function(t) {
            var e = t["text/plain"];
            return !!e && 0 === e.indexOf("file://")
        }
          , m = function(t) {
            rn.multiple(t).get(function(t) {
                var e = V(t, function(t) {
                    var e = an.fromTag("img")
                      , n = gt.cata(t, r.getLocalURL, function(t, e, n) {
                        return e
                    });
                    return qe(e, "src", n),
                    e.dom().outerHTML
                }).join("");
                u.insertContent(e, {
                    merge: !1 !== u.settings.paste_merge_formats
                }),
                N(u) && r.uploadImages(t)
            })
        };
        u.on("drop", function(t) {
            if (!s) {
                if (tinymce.dom.RangeUtils && tinymce.dom.RangeUtils.getCaretRangeFromPoint) {
                    var e = tinymce.dom.RangeUtils.getCaretRangeFromPoint(t.clientX, t.clientY, u.getDoc());
                    e && u.selection.setRng(e)
                }
                var n = (a = (i = t).target.files || i.dataTransfer.files,
                z(a, function(t) {
                    return f.test(t.type)
                }));
                if (0 < n.length)
                    return m(n),
                    void t.preventDefault();
                var r = function(t) {
                    var e = {};
                    if (t) {
                        if (t.getData) {
                            var n = t.getData("Text");
                            n && 0 < n.length && (e["text/plain"] = n)
                        }
                        if (t.types)
                            for (var r = 0; r < t.types.length; r++) {
                                var o = t.types[r];
                                e[o] = t.getData(o)
                            }
                    }
                    return e
                }(t.dataTransfer);
                d(o = r) || !l(o, "text/html") && !l(o, "text/plain") || (zr(u, cn.translate, c).showDialog(r["text/html"] || r["text/plain"]),
                t.preventDefault())
            }
            var o, i, a
        })
    }
    var Jr = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return function() {
            for (var n = [], t = 0; t < arguments.length; t++)
                n[t] = arguments[t];
            if (e.length !== n.length)
                throw new Error('Wrong number of arguments to struct. Expected "[' + e.length + ']", got ' + n.length + " arguments");
            var r = {};
            return X(e, function(t, e) {
                r[t] = v(n[e])
            }),
            r
        }
    }
      , Zr = function(t) {
        return t.slice(0).sort()
    }
      , Qr = function(e, t) {
        if (!j(t))
            throw new Error("The " + e + " fields must be an array. Was: " + t + ".");
        X(t, function(t) {
            if (!R(t))
                throw new Error("The value " + t + " in the " + e + " fields was not a string.")
        })
    }
      , to = function(o, i) {
        var n, a = o.concat(i);
        if (0 === a.length)
            throw new Error("You must specify at least one required or optional field.");
        return Qr("required", o),
        Qr("optional", i),
        n = Zr(a),
        J(n, function(t, e) {
            return e < n.length - 1 && t === n[e + 1]
        }).each(function(t) {
            throw new Error("The field: " + t + " occurs more than once in the combined fields: [" + n.join(", ") + "].")
        }),
        function(e) {
            var n = ot(e);
            rt(o, function(t) {
                return q(n, t)
            }) || function(t, e) {
                throw new Error("All required keys (" + Zr(t).join(", ") + ") were not specified. Specified keys were: " + Zr(e).join(", ") + ".")
            }(o, n);
            var t = z(n, function(t) {
                return !q(a, t)
            });
            0 < t.length && function(t) {
                throw new Error("Unsupported keys for object: " + Zr(t).join(", "))
            }(t);
            var r = {};
            return X(o, function(t) {
                r[t] = v(e[t])
            }),
            X(i, function(t) {
                r[t] = v(Object.prototype.hasOwnProperty.call(e, t) ? k.some(e[t]) : k.none())
            }),
            r
        }
    }
      , eo = Jr("id", "imageresult", "objurl");
    function no() {
        var o = {}
          , n = function(t) {
            Pe(t.objurl())
        };
        return {
            add: function(t, e, n) {
                var r = eo(t, e, n);
                return o[t] = r
            },
            get: function(t) {
                return k.from(o[t])
            },
            remove: function(t) {
                var e = o[t];
                delete o[t],
                void 0 !== e && n(e)
            },
            lookupByData: function(e) {
                return function(t, e) {
                    for (var n = ot(t), r = 0, o = n.length; r < o; r++) {
                        var i = n[r]
                          , a = t[i];
                        if (e(a, i, t))
                            return k.some(a)
                    }
                    return k.none()
                }(o, function(t) {
                    return Wt(t.imageresult()) === e
                })
            },
            destroy: function() {
                it(o, n),
                o = {}
            }
        }
    }
    var ro, oo, io = function(t) {
        var r = Jr.apply(null, t)
          , o = [];
        return {
            bind: function(t) {
                if (void 0 === t)
                    throw new Error("Event bind error: undefined handler");
                o.push(t)
            },
            unbind: function(e) {
                o = z(o, function(t) {
                    return t !== e
                })
            },
            trigger: function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t[e] = arguments[e];
                var n = r.apply(null, t);
                X(o, function(t) {
                    t(n)
                })
            }
        }
    }, ao = {
        create: function(t) {
            return {
                registry: at(t, function(t) {
                    return {
                        bind: t.bind,
                        unbind: t.unbind
                    }
                }),
                trigger: at(t, function(t) {
                    return t.trigger
                })
            }
        }
    }, uo = function(t) {
        return t.replace(/\./g, "-")
    }, co = function(t, e) {
        return t + "-" + e
    }, so = function(t) {
        var n = uo(t);
        return {
            resolve: function(t) {
                var e = t.split(" ");
                return V(e, function(t) {
                    return co(n, t)
                }).join(" ")
            }
        }
    }, fo = {
        resolve: so("ephox-salmon").resolve
    }, lo = fo.resolve("upload-image-in-progress"), mo = "data-" + fo.resolve("image-blob"), po = "data-" + fo.resolve("image-upload"), go = {
        uploadInProgress: v(lo),
        blobId: v(mo),
        trackedImage: v(po)
    }, vo = function(t) {
        var e = We(t) ? t.dom().parentNode : t.dom();
        return null != e && e.ownerDocument.body.contains(e)
    }, ho = function(t, e) {
        for (var n = [], r = function(t) {
            return n.push(t),
            e(t)
        }, o = e(t); (o = o.bind(r)).isSome(); )
            ;
        return n
    }, yo = function() {
        return bt.getOrDie("Node")
    }, bo = function(t, e, n) {
        return 0 != (t.compareDocumentPosition(e) & n)
    }, To = function(t, e) {
        return bo(t, e, yo().DOCUMENT_POSITION_CONTAINED_BY)
    }, xo = Me, Eo = ke, wo = function(t, e) {
        var n = t.dom();
        if (n.nodeType !== xo)
            return !1;
        if (void 0 !== n.matches)
            return n.matches(e);
        if (void 0 !== n.msMatchesSelector)
            return n.msMatchesSelector(e);
        if (void 0 !== n.webkitMatchesSelector)
            return n.webkitMatchesSelector(e);
        if (void 0 !== n.mozMatchesSelector)
            return n.mozMatchesSelector(e);
        throw new Error("Browser lacks native selectors")
    }, Io = function(t) {
        return t.nodeType !== xo && t.nodeType !== Eo || 0 === t.childElementCount
    }, So = function(t, e) {
        var n = void 0 === e ? l.document : e.dom();
        return Io(n) ? [] : V(n.querySelectorAll(t), an.fromDom)
    }, No = function(t, e) {
        return t.dom() === e.dom()
    }, Lo = (Oe.detect().browser.isIE(),
    wo), _o = function(t) {
        return an.fromDom(t.dom().ownerDocument)
    }, Oo = function(t) {
        var e = t.dom();
        return k.from(e.parentNode).map(an.fromDom)
    }, Co = function(t, e) {
        for (var n = B(e) ? e : v(!1), r = t.dom(), o = []; null !== r.parentNode && void 0 !== r.parentNode; ) {
            var i = r.parentNode
              , a = an.fromDom(i);
            if (o.push(a),
            !0 === n(a))
                break;
            r = i
        }
        return o
    }, Do = function(t) {
        var e = t.dom();
        return k.from(e.previousSibling).map(an.fromDom)
    }, Po = function(t) {
        var e = t.dom();
        return k.from(e.nextSibling).map(an.fromDom)
    }, Ao = function(t) {
        return e = ho(t, Do),
        (n = W.call(e, 0)).reverse(),
        n;
        var e, n
    }, ko = function(t) {
        var e = t.dom();
        return V(e.childNodes, an.fromDom)
    }, Mo = function(t) {
        return e = 0,
        n = t.dom().childNodes,
        k.from(n[e]).map(an.fromDom);
        var e, n
    }, Ro = function(t) {
        return t.dom().childNodes.length
    }, Fo = (Jr("element", "offset"),
    function(t, e) {
        var n = [];
        return X(ko(t), function(t) {
            e(t) && (n = n.concat([t])),
            n = n.concat(Fo(t, e))
        }),
        n
    }
    ), jo = function(t, e) {
        return So(e, t)
    }, Uo = go.trackedImage(), Bo = function(t, e) {
        return jo(t, "img[" + Uo + '="' + e + '"]')
    }, Yo = function(t) {
        return jo(t, "img:not([" + Uo + "])[" + go.blobId() + "]")
    };
    function Wo() {
        var o = []
          , i = []
          , t = ao.create({
            complete: io(["response"])
        })
          , a = function() {
            t.trigger.complete(i),
            i = []
        }
          , u = function() {
            return 0 < o.length
        };
        return {
            findById: Bo,
            findAll: Yo,
            register: function(t, e) {
                qe(t, Uo, e),
                o.push(e)
            },
            report: function(t, e, r) {
                var n;
                X(e, function(t) {
                    var e, n;
                    Ge(t, Uo),
                    e = r,
                    n = t,
                    i.push({
                        success: e,
                        element: n.dom()
                    })
                }),
                n = t,
                o = z(o, function(t, e) {
                    return t !== n
                }),
                !1 === u() && a()
            },
            inProgress: u,
            isActive: function(t) {
                return q(o, t)
            },
            events: t.registry
        }
    }
    (oo = ro || (ro = {})).JSON = "json",
    oo.Blob = "blob",
    oo.Text = "text",
    oo.FormData = "formdata",
    oo.MultipartFormData = "multipart/form-data";
    var Ho = function() {
        return (Ho = Object.assign || function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
                for (var o in e = arguments[n])
                    Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t
        }
        ).apply(this, arguments)
    }
      , qo = function(n) {
        return {
            is: function(t) {
                return n === t
            },
            isValue: _,
            isError: S,
            getOr: v(n),
            getOrThunk: v(n),
            getOrDie: v(n),
            or: function(t) {
                return qo(n)
            },
            orThunk: function(t) {
                return qo(n)
            },
            fold: function(t, e) {
                return e(n)
            },
            map: function(t) {
                return qo(t(n))
            },
            mapError: function(t) {
                return qo(n)
            },
            each: function(t) {
                t(n)
            },
            bind: function(t) {
                return t(n)
            },
            exists: function(t) {
                return t(n)
            },
            forall: function(t) {
                return t(n)
            },
            toOption: function() {
                return k.some(n)
            }
        }
    }
      , $o = function(n) {
        return {
            is: S,
            isValue: S,
            isError: _,
            getOr: p,
            getOrThunk: function(t) {
                return t()
            },
            getOrDie: function() {
                return I(String(n))()
            },
            or: function(t) {
                return t
            },
            orThunk: function(t) {
                return t()
            },
            fold: function(t, e) {
                return t(n)
            },
            map: function(t) {
                return $o(n)
            },
            mapError: function(t) {
                return $o(t(n))
            },
            each: L,
            bind: function(t) {
                return $o(n)
            },
            exists: S,
            forall: _,
            toOption: k.none
        }
    }
      , Vo = {
        value: qo,
        error: $o,
        fromOption: function(t, e) {
            return t.fold(function() {
                return $o(e)
            }, qo)
        }
    }
      , Xo = function(i) {
        return Ho({}, i, {
            toCached: function() {
                return Xo(i.toCached())
            },
            bindFuture: function(e) {
                return Xo(i.bind(function(t) {
                    return t.fold(function(t) {
                        return Vt.pure(Vo.error(t))
                    }, function(t) {
                        return e(t)
                    })
                }))
            },
            bindResult: function(e) {
                return Xo(i.map(function(t) {
                    return t.bind(e)
                }))
            },
            mapResult: function(e) {
                return Xo(i.map(function(t) {
                    return t.map(e)
                }))
            },
            mapError: function(e) {
                return Xo(i.map(function(t) {
                    return t.mapError(e)
                }))
            },
            foldResult: function(e, n) {
                return i.map(function(t) {
                    return t.fold(e, n)
                })
            },
            withTimeout: function(t, o) {
                return Xo(Vt.nu(function(e) {
                    var n = !1
                      , r = l.setTimeout(function() {
                        n = !0,
                        e(Vo.error(o()))
                    }, t);
                    i.get(function(t) {
                        n || (l.clearTimeout(r),
                        e(t))
                    })
                }))
            }
        })
    }
      , Go = function(t) {
        return Xo(Vt.nu(t))
    }
      , zo = function(t) {
        return Xo(Vt.pure(Vo.value(t)))
    }
      , Ko = Go
      , Jo = zo
      , Zo = function(t) {
        return Xo(Vt.pure(Vo.error(t)))
    }
      , Qo = function(t) {
        try {
            var e = JSON.parse(t);
            return Vo.value(e)
        } catch (t) {
            return Vo.error("Response was not JSON.")
        }
    }
      , ti = function(e) {
        return Vt.nu(function(n) {
            var t = new l.FileReader;
            t.onload = function(t) {
                var e = t.target ? t.target.result : new l.Blob([]);
                n(e)
            }
            ,
            t.readAsText(e)
        })
    }
      , ei = function(t) {
        return Vt.pure(t.response)
    }
      , ni = function(t, e) {
        switch (t) {
        case ro.JSON:
            return Qo(e.response).fold(function() {
                return ei(e)
            }, Vt.pure);
        case ro.Blob:
            return n = e,
            k.from(n.response).map(ti).getOr(Vt.pure("no response content"));
        case ro.Text:
        default:
            return ei(e)
        }
        var n
    }
      , ri = function(t) {
        var e, n = (e = t.body,
        k.from(e).bind(function(t) {
            switch (t.type) {
            case ro.JSON:
                return k.some("application/json");
            case ro.FormData:
                return k.some("application/x-www-form-urlencoded; charset=UTF-8");
            case ro.MultipartFormData:
                return k.none();
            case ro.Text:
            default:
                return k.some("text/plain")
            }
        })), r = !0 === t.credentials ? k.some(!0) : k.none(), o = function(t) {
            switch (t) {
            case ro.Blob:
                return "application/octet-stream";
            case ro.JSON:
                return "application/json, text/javascript";
            case ro.Text:
                return "text/plain";
            default:
                return ""
            }
        }(t.responseType) + ", */*; q=0.01", i = void 0 !== t.headers ? t.headers : {};
        return {
            contentType: n,
            responseType: function(t) {
                switch (t) {
                case ro.JSON:
                    return k.none();
                case ro.Blob:
                    return k.some("blob");
                case ro.Text:
                    return k.some("text");
                default:
                    return k.none()
                }
            }(t.responseType),
            credentials: r,
            accept: o,
            headers: i,
            progress: B(t.progress) ? k.some(t.progress) : k.none()
        }
    }
      , oi = function(t) {
        var n = new l.FormData;
        return it(t, function(t, e) {
            n.append(e, t)
        }),
        n
    }
      , ii = function(c) {
        return Ko(function(r) {
            var o, i = new l.XMLHttpRequest;
            i.open(c.method, (o = c.url,
            k.from(c.query).map(function(t) {
                var e = ct(t, function(t, e) {
                    return encodeURIComponent(e) + "=" + encodeURIComponent(t)
                })
                  , n = be(o, "?") ? "&" : "?";
                return 0 < e.length ? o + n + e.join("&") : o
            }).getOr(o)), !0);
            var n, t, e = ri(c);
            n = i,
            (t = e).contentType.each(function(t) {
                return n.setRequestHeader("Content-Type", t)
            }),
            n.setRequestHeader("Accept", t.accept),
            t.credentials.each(function(t) {
                return n.withCredentials = t
            }),
            t.responseType.each(function(t) {
                return n.responseType = t
            }),
            t.progress.each(function(e) {
                return n.upload.addEventListener("progress", function(t) {
                    return e(t.loaded, t.total)
                })
            }),
            it(t.headers, function(t, e) {
                return n.setRequestHeader(e, t)
            });
            var a, u = function() {
                var e, t, n;
                (e = c.url,
                t = c.responseType,
                n = i,
                ni(t, n).map(function(t) {
                    return {
                        message: 0 === n.status ? "Unknown HTTP error (possible cross-domain request)" : "Could not load url " + e + ": " + n.statusText,
                        status: n.status,
                        responseText: t
                    }
                })).get(function(t) {
                    return r(Vo.error(t))
                })
            };
            i.onerror = u,
            i.onload = function() {
                0 !== i.status || Te(c.url, "file:") ? i.status < 100 || 400 <= i.status ? u() : function(t, e) {
                    var n = function() {
                        return Jo(e.response)
                    }
                      , r = function(t) {
                        return Zo({
                            message: t,
                            status: e.status,
                            responseText: e.responseText
                        })
                    };
                    switch (t) {
                    case ro.JSON:
                        return Qo(e.response).fold(r, Jo);
                    case ro.Blob:
                    case ro.Text:
                        return n();
                    default:
                        return r("unknown data type")
                    }
                }(c.responseType, i).get(r) : u()
            }
            ,
            (a = c.body,
            k.from(a).map(function(t) {
                return t.type === ro.JSON ? JSON.stringify(t.data) : t.type === ro.FormData ? oi(t.data) : t.type === ro.MultipartFormData ? oi(t.data) : t
            })).fold(function() {
                return i.send()
            }, function(t) {
                i.send(t)
            })
        })
    };
    var ai = Jr("message", "status", "contents")
      , ui = ["jpg", "png", "gif", "jpeg"]
      , ci = {
        failureObject: ai,
        getFilename: function(t, e) {
            return R(t.name) && !xe(t.name, ".tmp") ? t.name : function(t, e) {
                if (R(t.type) && Te(t.type, "image/")) {
                    var n = t.type.substr("image/".length);
                    return q(ui, n) ? e + "." + n : e
                }
                return e
            }(t, e)
        },
        buildData: function(t, e, n) {
            var r = new (bt.getOrDie("FormData"));
            return r.append(t, e, n),
            r
        }
    }
      , si = function() {
        return bt.getOrDie("JSON")
    }
      , fi = function(t) {
        return si().parse(t)
    }
      , li = function(t) {
        var e = "";
        return "" !== t.protocol && (e += t.protocol,
        e += ":"),
        "" !== t.authority && (e += "//",
        e += t.authority),
        e += t.path,
        "" !== t.query && (e += "?",
        e += t.query),
        "" !== t.anchor && (e += "#",
        e += t.anchor),
        e
    }
      , di = {
        strictMode: !1,
        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@\/]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    }
      , mi = function(t, e) {
        return function(t, e) {
            for (var r = e, n = r.parser[r.strictMode ? "strict" : "loose"].exec(t), o = {}, i = 14; i--; )
                o[r.key[i]] = n[i] || "";
            return o[r.q.name] = {},
            o[r.key[12]].replace(r.q.parser, function(t, e, n) {
                e && (o[r.q.name][e] = n)
            }),
            o
        }(t, mt(di, e))
    }
      , pi = function(t) {
        return ye(t, gi(t))
    }
      , gi = function(t) {
        return t.substring(t.lastIndexOf("/"))
    }
      , vi = function(t) {
        for (var e = t, n = ""; "" !== e; )
            if (Te(e, "../"))
                e = he(e, "../");
            else if (Te(e, "./"))
                e = he(e, "./");
            else if (Te(e, "/./"))
                e = "/" + he(e, "/./");
            else if ("/." === e)
                e = "/";
            else if (Te(e, "/../"))
                e = "/" + he(e, "/../"),
                n = pi(n);
            else if ("/.." === e)
                e = "/",
                n = pi(n);
            else if ("." === e || ".." === e)
                e = "";
            else {
                var r = e.match(/(^\/?.*?)(\/|$)/)[1];
                e = he(e, r),
                n += r
            }
        return n
    }
      , hi = function(t, e, n) {
        if ("" !== n && "" === t)
            return "/" + e;
        var r = t.substring(t.lastIndexOf("/") + 1);
        return ye(t, r) + e
    }
      , yi = function(t, e) {
        var n = {
            strictMode: !0
        }
          , r = mi(t, n)
          , o = mi(e, n)
          , i = {};
        return "" !== o.protocol ? (i.protocol = o.protocol,
        i.authority = o.authority,
        i.path = vi(o.path),
        i.query = o.query) : ("" !== o.authority ? (i.authority = o.authority,
        i.path = vi(o.path),
        i.query = o.query) : ("" === o.path ? (i.path = r.path,
        "" !== o.query ? i.query = o.query : i.query = r.query) : (Te(o.path, "/") ? i.path = vi(o.path) : (i.path = hi(r.path, o.path, t.authority),
        i.path = vi(i.path)),
        i.query = o.query),
        i.authority = r.authority),
        i.protocol = r.protocol),
        i.anchor = o.anchor,
        i
    }
      , bi = function(t, e) {
        var n = yi(t, e);
        return li(n)
    };
    function Ti(i) {
        var t, e, n, r, d = (t = i.url,
        e = t.lastIndexOf("/"),
        n = 0 < e ? t.substr(0, e) : t,
        r = void 0 === i.basePath ? n : i.basePath,
        xe(r, "/") ? r : r + "/"), o = function(t, e, f) {
            var n, r, l = ci.getFilename(t, e), o = (n = ci.buildData("image", t, l).get("image"),
            {
                type: ro.Blob,
                data: n
            });
            (r = {
                url: i.url,
                body: o,
                responseType: ro.Text,
                credentials: !0 === i.credentials
            },
            ii(Ho({}, r, {
                method: "post"
            }))).get(function(t) {
                t.fold(function(t) {
                    f(Vo.error(ci.failureObject(t.message, t.status, t.responseText)))
                }, function(e) {
                    var n, t, r, o;
                    try {
                        var i = fi(e);
                        if (!R(i.location))
                            return t = "JSON response did not contain a string location",
                            r = 500,
                            o = e,
                            void f(Vo.error(ci.failureObject(t, r, o)));
                        n = i.location
                    } catch (t) {
                        n = e
                    }
                    var a, u, c, s = (a = l,
                    u = n.split(/\s+/),
                    c = 1 === u.length && "" !== u[0] ? u[0] : a,
                    bi(d, c));
                    f(Vo.value({
                        location: s
                    }))
                })
            })
        };
        return {
            upload: function(t, e, n) {
                var r = t.imageresult();
                Bt(r).then(function(t) {
                    o(t, e, n)
                })
            }
        }
    }
    Jr("id", "filename", "blob", "base64");
    var xi = function(t) {
        return Ti(t)
    }
      , Ei = function(t, e) {
        var n = Ve(t, e);
        return void 0 === n || "" === n ? [] : n.split(" ")
    }
      , wi = function(t) {
        return void 0 !== t.dom().classList
    }
      , Ii = function(t) {
        return Ei(t, "class")
    }
      , Si = function(t, e) {
        return o = e,
        i = Ei(n = t, r = "class").concat([o]),
        qe(n, r, i.join(" ")),
        !0;
        var n, r, o, i
    }
      , Ni = function(t, e) {
        return o = e,
        0 < (i = z(Ei(n = t, r = "class"), function(t) {
            return t !== o
        })).length ? qe(n, r, i.join(" ")) : Ge(n, r),
        !1;
        var n, r, o, i
    }
      , Li = function(t, e) {
        wi(t) ? t.dom().classList.add(e) : Si(t, e)
    }
      , _i = function(t, e) {
        var n;
        wi(t) ? t.dom().classList.remove(e) : Ni(t, e);
        0 === (wi(n = t) ? n.dom().classList : Ii(n)).length && Ge(n, "class")
    }
      , Oi = function(t, e) {
        return wi(t) && t.dom().classList.contains(e)
    }
      , Ci = function(e, t) {
        X(t, function(t) {
            Li(e, t)
        })
    }
      , Di = function(t) {
        return wi(t) ? function(t) {
            for (var e = t.dom().classList, n = new Array(e.length), r = 0; r < e.length; r++)
                n[r] = e.item(r);
            return n
        }(t) : Ii(t)
    }
      , Pi = function(e) {
        return function(t) {
            return Oi(t, e)
        }
    };
    var Ai = function(t, e, n) {
        for (var r = t.dom(), o = B(n) ? n : v(!1); r.parentNode; ) {
            r = r.parentNode;
            var i = an.fromDom(r);
            if (e(i))
                return k.some(i);
            if (o(i))
                break
        }
        return k.none()
    }
      , ki = function(t, e) {
        return J(t.dom().childNodes, g(e, an.fromDom)).map(an.fromDom)
    }
      , Mi = function(t, r) {
        var o = function(t) {
            for (var e = 0; e < t.childNodes.length; e++) {
                if (r(an.fromDom(t.childNodes[e])))
                    return k.some(an.fromDom(t.childNodes[e]));
                var n = o(t.childNodes[e]);
                if (n.isSome())
                    return n
            }
            return k.none()
        };
        return o(t.dom())
    }
      , Ri = function(t, e, n) {
        return Ai(t, function(t) {
            return wo(t, e)
        }, n)
    }
      , Fi = function(t, e) {
        return n = e,
        o = void 0 === (r = t) ? l.document : r.dom(),
        Io(o) ? k.none() : k.from(o.querySelector(n)).map(an.fromDom);
        var n, r, o
    }
      , ji = function(t, e, n) {
        return r = Ri,
        a = n,
        wo(o = t, i = e) ? k.some(o) : B(a) && a(o) ? k.none() : r(o, i, a);
        var r, o, i, a
    }
      , Ui = Jr("image", "blobInfo")
      , Bi = lt([{
        failure: ["error"]
    }, {
        success: ["result", "images", "blob"]
    }])
      , Yi = function(t, e, n, r, o) {
        var i = Wt(n)
          , a = t.lookupByData(i).getOrThunk(function() {
            return t.add(e, n, r)
        });
        return qe(o, go.blobId(), a.id()),
        Ui(o, a)
    }
      , Wi = function(e, n) {
        return e.get(n).fold(function() {
            return Vo.error("Internal error with blob cache")
        }, function(t) {
            return e.remove(n),
            Vo.value(t)
        })
    }
      , Hi = function(t, e, n) {
        var r = t.isActive(e);
        return t.register(n, e),
        Li(n, go.uploadInProgress()),
        r ? k.none() : k.some(e)
    }
      , qi = function(t, n, a, r, u, e, c) {
        var s = function() {
            l.console.error("Internal error with blob cache", u),
            c(Bi.failure({
                status: v(666)
            }))
        };
        t.upload(e, u, function(t) {
            var e, i = n.findById(r, u);
            X(i, (e = go.uploadInProgress(),
            function(t) {
                _i(t, e)
            }
            )),
            t.fold(function(t) {
                c(Bi.failure(t))
            }, function(e) {
                var t, n, r, o;
                (t = a,
                n = i,
                r = u,
                o = e,
                X(n, function(t) {
                    qe(t, "src", o.location),
                    Ge(t, go.blobId())
                }),
                Wi(t, r)).fold(s, function(t) {
                    c(Bi.success(e, i, t))
                })
            }),
            n.report(u, i, t.isValue())
        })
    }
      , $i = function(o, i, t) {
        return nt(t, function(t) {
            return gt.cata(t, function(e, n, r) {
                return Fi(i, 'img[src="' + r + '"]').fold(function() {
                    return [Vo.error("Image that was just inserted could not be found: " + r)]
                }, function(t) {
                    return [Vo.value(Yi(o, e, n, r, t))]
                })
            }, v([]))
        })
    }
      , Vi = function(t, o, e) {
        var n = t.findAll(e);
        return t.inProgress() ? [] : V(n, function(t) {
            return e = o,
            r = Ve(n = t, go.blobId()),
            e.get(r).fold(function() {
                return Vo.error(r)
            }, function(t) {
                return Vo.value(Ui(n, t))
            });
            var e, n, r
        })
    }
      , Xi = function(t) {
        return parseInt(t, 10)
    }
      , Gi = function(t, e, n) {
        return {
            major: v(t),
            minor: v(e),
            patch: v(n)
        }
    }
      , zi = {
        getTinymceVersion: function() {
            var t, e, n = [tinymce.majorVersion, tinymce.minorVersion].join(".");
            return t = n.split(".").slice(0, 3).join("."),
            (e = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t)) ? Gi(Xi(e[1]), Xi(e[2]), Xi(e[3])) : Gi(0, 0, 0)
        }
    };
    function Ki(c) {
        var s = function(t, e) {
            return v(4 === (o = zi.getTinymceVersion()).major() && o.minor() < 6 ? t : t + "." + (n = e.toLowerCase(),
            (r = {
                "image/jpeg": "jpg",
                "image/jpg": "jpg",
                "image/gif": "gif",
                "image/png": "png"
            }).hasOwnProperty(n) ? r[n] : "dat"));
            var n, r, o
        };
        return {
            importImages: function(t) {
                var e = nt(t, function(t) {
                    return gt.cata(t, function(t, e, n) {
                        var r, o, i, a, u = Wt(e);
                        return [(r = t,
                        o = e,
                        i = u,
                        a = n,
                        Vt.nu(function(e) {
                            Yt(o).then(function(t) {
                                c.editorUpload.blobCache.add({
                                    id: v(r),
                                    name: v(r),
                                    filename: s(r, t.type),
                                    blob: v(t),
                                    base64: v(i.split(",")[1]),
                                    blobUri: v(a),
                                    uri: v(null)
                                }),
                                e(t)
                            })
                        }))]
                    }, v([]))
                });
                return Gt(e)
            },
            uploadImages: function() {
                c.uploadImages()
            },
            prepareImages: L,
            getLocalURL: function(t, e, n) {
                return Wt(e)
            }
        }
    }
    var Ji = function(t, e) {
        var n = (e || l.document).createElement("div");
        return n.innerHTML = t,
        ko(an.fromDom(n))
    }
      , Zi = function(e, n) {
        Oo(e).each(function(t) {
            t.dom().insertBefore(n.dom(), e.dom())
        })
    }
      , Qi = function(t, e) {
        Po(t).fold(function() {
            Oo(t).each(function(t) {
                ea(t, e)
            })
        }, function(t) {
            Zi(t, e)
        })
    }
      , ta = function(e, n) {
        Mo(e).fold(function() {
            ea(e, n)
        }, function(t) {
            e.dom().insertBefore(n.dom(), t.dom())
        })
    }
      , ea = function(t, e) {
        t.dom().appendChild(e.dom())
    }
      , na = function(t, e) {
        Zi(t, e),
        ea(e, t)
    }
      , ra = function(r, o) {
        X(o, function(t, e) {
            var n = 0 === e ? r : o[e - 1];
            Qi(n, t)
        })
    }
      , oa = function(e, t) {
        X(t, function(t) {
            ea(e, t)
        })
    }
      , ia = function(t) {
        _i(t, go.uploadInProgress())
    }
      , aa = function(t) {
        for (var e = 0; e < t.undoManager.data.length; e++) {
            var n = t.undoManager.data[e].content
              , r = an.fromTag("div");
            oa(r, Ji(n));
            var o = jo(r, "." + go.uploadInProgress());
            X(o, ia),
            t.undoManager.data[e].content = r.dom().innerHTML
        }
    }
      , ua = function(t, e, n) {
        for (var r = 0; r < t.undoManager.data.length; r++)
            t.undoManager.data[r].content = t.undoManager.data[r].content.split(e.objurl()).join(n.location)
    }
      , ca = {
        showDialog: function(t, e) {
            var n, r = {
                title: "Error",
                spacing: 10,
                padding: 10,
                items: [{
                    type: "container",
                    html: e
                }],
                buttons: [{
                    text: "Ok",
                    onclick: function() {
                        n.close()
                    }
                }]
            };
            n = t.windowManager.open(r)
        }
    }
      , sa = function(r, t) {
        var o, e, i, a, u, n, c = no(), s = Wo(), f = (o = r,
        e = t.url,
        i = ca,
        a = function() {
            return cn.translate("error.code.images.not.found") + e + cn.translate("error.full.stop")
        }
        ,
        u = function() {
            return cn.translate("error.imageupload") + e + cn.translate("error.full.stop")
        }
        ,
        n = function(t) {
            var e = t.status()
              , n = 0 === e || 400 <= e || e < 500 ? a : u;
            i.showDialog(o, n())
        }
        ,
        {
            instance: function() {
                return t = n,
                e = !1,
                function() {
                    e || (e = !0,
                    t.apply(null, arguments))
                }
                ;
                var t, e
            }
        }), l = xi(t), d = function() {
            return an.fromDom(r.getBody())
        }, m = function(e, t, n) {
            X(t, function(t) {
                qe(t, "data-mce-src", e.location)
            }),
            ua(r, n, e)
        };
        s.events.complete.bind(function(t) {
            aa(r)
        });
        var p = function(o, i) {
            Hi(s, o.blobInfo().id(), o.image()).each(function(t) {
                var e, n, r;
                e = t,
                n = o.blobInfo(),
                r = i,
                qi(l, s, c, d(), e, n, function(t) {
                    t.fold(function(t) {
                        r(t)
                    }, m)
                })
            })
        };
        return {
            importImages: function() {
                return Vt.pure([])
            },
            uploadImages: function(t) {
                var e, n, r, o, i;
                e = f.instance(),
                n = Vi(s, c, d()),
                X(n, function(t) {
                    t.fold(function(t) {
                        s.report(t, k.none(), !1)
                    }, function(t) {
                        p(t, e)
                    })
                }),
                r = t,
                o = f.instance(),
                i = $i(c, d(), r),
                X(i, function(t) {
                    t.fold(function(t) {
                        console.error(t)
                    }, function(t) {
                        p(t, o)
                    })
                })
            },
            prepareImages: L,
            getLocalURL: function(t, e, n) {
                return n
            }
        }
    }
      , fa = function(o) {
        var t = Ki(o);
        return {
            importImages: function() {
                return Vt.pure([])
            },
            uploadImages: L,
            prepareImages: function(t) {
                X(t, function(t) {
                    gt.cata(t, function(t, e, n) {
                        var r = Wt(e);
                        X(o.dom.select('img[src="' + n + '"]'), function(t) {
                            o.dom.setAttrib(t, "src", r)
                        })
                    }, L)
                })
            },
            getLocalURL: t.getLocalURL
        }
    };
    function la(t) {
        return void 0 !== t.uploadImages ? Ki(t) : function(t) {
            if (a(t)) {
                var e = {
                    url: t.settings.images_upload_url,
                    basePath: t.settings.images_upload_base_path,
                    credentials: t.settings.images_upload_credentials
                };
                return sa(t, e)
            }
            return fa(t)
        }(t)
    }
    var da = function(e, r, t, n) {
        var o, i, a, u, c, s = e.selection, f = e.dom, l = e.getBody();
        if (c = t.isText(),
        t.reset(),
        n.clipboardData && n.clipboardData.getData("text/html")) {
            n.preventDefault();
            var d = n.clipboardData.getData("text/html")
              , m = d.match(/<html[\s\S]+<\/html>/i)
              , p = null === m ? d : m[0];
            return r(p)
        }
        if (!f.get("_mcePaste")) {
            if (o = f.add(l, "div", {
                id: "_mcePaste",
                class: "mcePaste"
            }, '\ufeff<br _mce_bogus="1">'),
            u = l !== e.getDoc().body ? f.getPos(e.selection.getStart(), l).y : l.scrollTop,
            f.setStyles(o, {
                position: "absolute",
                left: -1e4,
                top: u,
                width: 1,
                height: 1,
                overflow: "hidden"
            }),
            tinymce.isIE)
                return (a = f.doc.body.createTextRange()).moveToElementText(o),
                a.execCommand("Paste"),
                f.remove(o),
                "\ufeff" === o.innerHTML ? (e.execCommand("mcePasteWord"),
                void n.preventDefault()) : (r(c ? o.innerText : o.innerHTML),
                tinymce.dom.Event.cancel(n));
            var g = function(t) {
                t.preventDefault()
            };
            if (f.bind(e.getDoc(), "mousedown", g),
            f.bind(e.getDoc(), "keydown", g),
            tinymce.isGecko && (a = e.selection.getRng(!0)).startContainer === a.endContainer && 3 === a.startContainer.nodeType) {
                var v = f.select("p,h1,h2,h3,h4,h5,h6,pre", o);
                1 === v.length && f.remove(v.reverse(), !0)
            }
            i = e.selection.getRng(),
            o = o.firstChild,
            (a = e.getDoc().createRange()).setStart(o, 0),
            a.setEnd(o, 1),
            s.setRng(a),
            window.setTimeout(function() {
                var n = ""
                  , t = f.select("div.mcePaste");
                fn.each(t, function(t) {
                    var e = t.firstChild;
                    e && "DIV" === e.nodeName && e.style.marginTop && e.style.backgroundColor && f.remove(e, 1),
                    fn.each(f.select("div.mcePaste", t), function(t) {
                        f.remove(t, 1)
                    }),
                    fn.each(f.select("span.Apple-style-span", t), function(t) {
                        f.remove(t, 1)
                    }),
                    fn.each(f.select("br[_mce_bogus]", t), function(t) {
                        f.remove(t)
                    }),
                    n += t.innerHTML
                }),
                fn.each(t, function(t) {
                    f.remove(t)
                }),
                i && s.setRng(i),
                r(n),
                f.unbind(e.getDoc(), "mousedown", g),
                f.unbind(e.getDoc(), "keydown", g)
            }, 0)
        }
    }
      , ma = {
        getOnPasteFunction: function(e, n, r) {
            return function(t) {
                da(e, n, r, t)
            }
        },
        getOnKeyDownFunction: function(e, n, r) {
            return function(t) {
                (tinymce.isOpera || 0 < navigator.userAgent.indexOf("Firefox/2")) && ((tinymce.isMac ? t.metaKey : t.ctrlKey) && 86 === t.keyCode || t.shiftKey && 45 === t.keyCode) && da(e, n, r, t)
            }
        }
    };
    function pa() {
        var o = {};
        return {
            getOrSetIndexed: function(t, e) {
                return void 0 !== o[t] ? o[t] : (n = t,
                r = e(),
                o[n] = r);
                var n, r
            },
            waitForLoad: function() {
                var t = st(o);
                return Gt(t)
            }
        }
    }
    var ga = function(u) {
        var c = y(yt, u);
        yt("callbacks", c());
        var e = function(t, e) {
            var n, r, o, i = c(), a = (r = void 0 === (n = i).count ? 0 : n.count,
            o = "callback_" + r,
            n.count = r + 1,
            o);
            return i.callbacks[a] = function() {
                e || s(a),
                t.apply(null, arguments)
            }
            ,
            u + ".callbacks." + a
        }
          , s = function(t) {
            var e = t.substring(t.lastIndexOf(".") + 1)
              , n = c();
            void 0 !== n.callbacks[e] && delete n.callbacks[e]
        };
        return {
            ephemeral: function(t) {
                return e(t, !1)
            },
            permanent: function(t) {
                return e(t, !0)
            },
            unregister: s
        }
    }
      , va = function(m, p) {
        return function(t) {
            if (m(t)) {
                var e, n, r, o, i, a, u, c = an.fromDom(t.target), s = function() {
                    t.stopPropagation()
                }, f = function() {
                    t.preventDefault()
                }, l = g(f, s), d = (e = c,
                n = t.clientX,
                r = t.clientY,
                o = s,
                i = f,
                a = l,
                u = t,
                {
                    target: v(e),
                    x: v(n),
                    y: v(r),
                    stop: o,
                    prevent: i,
                    kill: a,
                    raw: v(u)
                });
                p(d)
            }
        }
    }
      , ha = function(t, e, n, r) {
        return o = t,
        i = e,
        a = !1,
        u = va(n, r),
        o.dom().addEventListener(i, u, a),
        {
            unbind: y(ya, o, i, u, a)
        };
        var o, i, a, u
    }
      , ya = function(t, e, n, r) {
        t.dom().removeEventListener(e, n, r)
    }
      , ba = v(!0)
      , Ta = function(t, e, n) {
        return ha(t, e, ba, n)
    }
      , xa = ga("ephox.henchman.features")
      , Ea = function(i) {
        return qt.nu(function(e) {
            var t = function() {
                r.unbind(),
                o.unbind()
            }
              , n = an.fromTag("script");
            qe(n, "src", i),
            qe(n, "type", "text/javascript"),
            qe(n, "async", "async"),
            qe(n, "data-main", xa.ephemeral(function(t) {
                e(Vo.value(t))
            }));
            var r = Ta(n, "error", function() {
                t(),
                e(Vo.error("Error loading external script tag " + i))
            })
              , o = Ta(n, "load", t);
            ea(an.fromDom(l.document.head), n)
        })
    }
      , wa = function(t, e) {
        var n, r, o, i = e || an.fromDom(l.document), a = an.fromTag("link", i.dom());
        return $e(a, {
            rel: "stylesheet",
            type: "text/css",
            href: t
        }),
        n = i,
        r = a,
        o = an.fromDom(n.dom().head),
        ea(o, r),
        a
    }
      , Ia = function(o, i) {
        return qt.nu(function(e) {
            var n = function(t) {
                X(r, function(t) {
                    t.unbind()
                }),
                e(t.fold(function(t) {
                    return Vo.error(t + 'Unable to download editor stylesheets from "' + o + '"')
                }, Vo.value))
            }
              , t = wa(o)
              , r = [Ta(t, "load", function(t) {
                !function(t) {
                    try {
                        var e = t.target().dom().sheet.cssRules;
                        return F(e) && 0 === e.length
                    } catch (t) {}
                    return !1
                }(t) ? i(n) : n(Vo.error(""))
            }), Ta(t, "error", y(n, Vo.error("")))]
        })
    };
    var Sa, Na, La = (Sa = pa(),
    {
        preload: function() {
            Na().get(p)
        },
        addStylesheet: function(t, e) {
            return Sa.getOrSetIndexed(t, function() {
                return Ia(t, e)
            })
        },
        addScript: function(t, e) {
            return Sa.getOrSetIndexed(t, function() {
                return Ea(t).map(e)
            })
        },
        waitForLoad: Na = function() {
            return Sa.waitForLoad()
        }
    }), _a = function(t, e) {
        return La.addScript(t, e)
    }, Oa = Oe.detect(), Ca = Oa.deviceType.isiOS() || Oa.deviceType.isAndroid(), Da = v({
        isSupported: v(!1),
        cleanDocument: v(Zo("not supported"))
    }), Pa = Ca ? Da : function(t) {
        var r = _a(t + "/wordimport.js", p);
        r.get(function(t) {
            t.fold(function(t) {
                l.console.error("Unable to load word import: ", t)
            }, L)
        });
        return {
            isSupported: v(!0),
            cleanDocument: function(e, n) {
                return r.map(function(t) {
                    return t.map(function(t) {
                        return t.cleanDocument(e, n)
                    })
                })
            }
        }
    }
    ;
    function Aa(t, e, n, r) {
        var o = No(t, n) && e === r;
        return {
            startContainer: v(t),
            startOffset: v(e),
            endContainer: v(n),
            endOffset: v(r),
            collapsed: v(o)
        }
    }
    var ka = function(t) {
        t.dom().textContent = "",
        X(ko(t), function(t) {
            Ma(t)
        })
    }
      , Ma = function(t) {
        var e = t.dom();
        null !== e.parentNode && e.parentNode.removeChild(e)
    }
      , Ra = function(t) {
        var e, n = ko(t);
        0 < n.length && (e = t,
        X(n, function(t) {
            Zi(e, t)
        })),
        Ma(t)
    };
    var Fa, ja, Ua = function() {
        var t = !1;
        return {
            isBlocked: function() {
                return t
            },
            block: function() {
                t = !0
            },
            unblock: function() {
                t = !1
            }
        }
    }, Ba = function(t, e) {
        return {
            control: t,
            instance: e
        }
    }, Ya = {
        tap: function(n) {
            var r = Ua();
            return Ba(r, function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t[e] = arguments[e];
                r.isBlocked() || n.apply(null, t)
            })
        }
    }, Wa = Oe.detect(), Ha = Wa.browser.isIE() && Wa.browser.version.major <= 10, qa = Ha ? function(t, e, n) {
        e.control.block(),
        t.dom().execCommand("paste"),
        n(),
        e.control.unblock()
    }
    : function(t, e, n) {
        setTimeout(n, 1)
    }
    , $a = {
        willBlock: v(Ha),
        run: function(t, e, n) {
            return qa(t, e, n)
        }
    }, Va = ["b", "i", "u", "sub", "sup", "strike"], Xa = function(t) {
        X(ko(t), function(t) {
            var e;
            Ye(e = t) && !e.dom().hasChildNodes() && q(Va, Fe(e)) && Ma(t)
        })
    }, Ga = function(t, o) {
        var e = ko(t);
        X(e, function(t) {
            var e, n, r;
            o(t) && (n = ko(e = t),
            r = an.fromTag("div", _o(e).dom()),
            oa(r, n),
            Zi(e, r),
            Ma(e))
        })
    }, za = {
        consolidate: function(n, t) {
            Po(n).filter(t).each(function(t) {
                var e = ko(t);
                oa(n, e),
                Ma(t)
            }),
            Ga(n, t),
            Xa(n)
        }
    }, Ka = {
        resolve: so("ephox-sloth").resolve
    }.resolve("bin"), Ja = {
        bin: v(Ka)
    }, Za = function(t) {
        return void 0 !== t.style && B(t.style.getPropertyValue)
    }, Qa = function(t, e, n) {
        if (!R(n))
            throw l.console.error("Invalid call to CSS.set. Property ", e, ":: Value ", n, ":: Element ", t),
            new Error("CSS value must be a string: " + n);
        Za(t) && t.style.setProperty(e, n)
    }, tu = function(t, e, n) {
        var r = t.dom();
        Qa(r, e, n)
    }, eu = function(t, e) {
        var n = t.dom();
        it(e, function(t, e) {
            Qa(n, e, t)
        })
    }, nu = function(t, e) {
        var n = t.dom()
          , r = l.window.getComputedStyle(n).getPropertyValue(e)
          , o = "" !== r || vo(t) ? r : ru(n, e);
        return null === o ? void 0 : o
    }, ru = function(t, e) {
        return Za(t) ? t.style.getPropertyValue(e) : ""
    }, ou = function(t, e) {
        var n = t.dom()
          , r = ru(n, e);
        return k.from(r).filter(function(t) {
            return 0 < t.length
        })
    }, iu = function(t, e) {
        var n, r, o = t.dom();
        r = e,
        Za(n = o) && n.style.removeProperty(r),
        Xe(t, "style") && "" === Ee(Ve(t, "style")) && Ge(t, "style")
    }, au = function(t) {
        return "rtl" === nu(t, "direction") ? "rtl" : "ltr"
    }, uu = function(t) {
        return t.dom().innerHTML
    }, cu = function(t, e) {
        var n = _o(t).dom()
          , r = an.fromDom(n.createDocumentFragment())
          , o = Ji(e, n);
        oa(r, o),
        ka(t),
        ea(t, r)
    }, su = Ja.bin(), fu = su + Jt(""), lu = (Fa = "-100000px",
    ja = "100000px",
    function(t) {
        return "rtl" === au(t) ? ja : Fa
    }
    );
    function du(e, t, n) {
        var r = function(e, t) {
            var n = an.fromTag("div");
            $e(n, t),
            $e(n, {
                contenteditable: "true",
                "aria-hidden": "true"
            }),
            eu(n, {
                position: "fixed",
                top: "0px",
                width: "100px",
                height: "100px",
                overflow: "hidden",
                opacity: "0"
            }),
            Ci(n, [su, fu]);
            var r = function(t) {
                return Oi(t, fu)
            };
            return {
                attach: function(t) {
                    ka(n),
                    tu(n, "left", lu(t)),
                    ea(t, n)
                },
                focus: function() {
                    Ri(n, "body").each(function(t) {
                        e.toOff(t, n)
                    })
                },
                contents: function() {
                    return za.consolidate(n, r),
                    Jr("elements", "html", "container")(ko(n), uu(n), n)
                },
                container: function() {
                    return n
                },
                detach: function() {
                    Ma(n)
                }
            }
        }(e, n)
          , o = function() {
            e.cleanup();
            var t = r.contents();
            r.detach(),
            a.trigger.after(t.elements(), t.html(), r.container())
        }
          , i = Ya.tap(function() {
            a.trigger.before(),
            r.attach(t),
            r.focus(),
            $a.run(_o(t), i, o)
        })
          , a = ao.create({
            before: io([]),
            after: io(["elements", "html", "container"])
        })
          , u = L;
        return {
            instance: v(function() {
                i.instance()
            }),
            destroy: u,
            events: a.registry
        }
    }
    var mu = function(t, e, n) {
        var r, o, i = t.document.createRange();
        return r = i,
        e.fold(function(t) {
            r.setStartBefore(t.dom())
        }, function(t, e) {
            r.setStart(t.dom(), e)
        }, function(t) {
            r.setStartAfter(t.dom())
        }),
        o = i,
        n.fold(function(t) {
            o.setEndBefore(t.dom())
        }, function(t, e) {
            o.setEnd(t.dom(), e)
        }, function(t) {
            o.setEndAfter(t.dom())
        }),
        i
    }
      , pu = function(t, e, n, r, o) {
        var i = t.document.createRange();
        return i.setStart(e.dom(), n),
        i.setEnd(r.dom(), o),
        i
    }
      , gu = lt([{
        ltr: ["start", "soffset", "finish", "foffset"]
    }, {
        rtl: ["start", "soffset", "finish", "foffset"]
    }])
      , vu = function(t, e, n) {
        return e(an.fromDom(n.startContainer), n.startOffset, an.fromDom(n.endContainer), n.endOffset)
    }
      , hu = function(t, e) {
        var o, n, r, i = (o = t,
        e.match({
            domRange: function(t) {
                return {
                    ltr: v(t),
                    rtl: k.none
                }
            },
            relative: function(t, e) {
                return {
                    ltr: Zt(function() {
                        return mu(o, t, e)
                    }),
                    rtl: Zt(function() {
                        return k.some(mu(o, e, t))
                    })
                }
            },
            exact: function(t, e, n, r) {
                return {
                    ltr: Zt(function() {
                        return pu(o, t, e, n, r)
                    }),
                    rtl: Zt(function() {
                        return k.some(pu(o, n, r, t, e))
                    })
                }
            }
        }));
        return (r = (n = i).ltr()).collapsed ? n.rtl().filter(function(t) {
            return !1 === t.collapsed
        }).map(function(t) {
            return gu.rtl(an.fromDom(t.endContainer), t.endOffset, an.fromDom(t.startContainer), t.startOffset)
        }).getOrThunk(function() {
            return vu(0, gu.ltr, r)
        }) : vu(0, gu.ltr, r)
    }
      , yu = {
        create: Jr("start", "soffset", "finish", "foffset")
    }
      , bu = function(t, e) {
        for (var n = 0; n < t.length; n++) {
            var r = e(t[n], n);
            if (r.isSome())
                return r
        }
        return k.none()
    }
      , Tu = function(t, e, n) {
        return e >= t.left && e <= t.right && n >= t.top && n <= t.bottom
    };
    function xu(n, r) {
        var e = function(t) {
            return n(t) ? k.from(t.dom().nodeValue) : k.none()
        }
          , t = Oe.detect().browser
          , o = t.isIE() && 10 === t.version.major ? function(t) {
            try {
                return e(t)
            } catch (t) {
                return k.none()
            }
        }
        : e;
        return {
            get: function(t) {
                if (!n(t))
                    throw new Error("Can only get " + r + " value of a " + r + " node");
                return o(t).getOr("")
            },
            getOption: o,
            set: function(t, e) {
                if (!n(t))
                    throw new Error("Can only set raw " + r + " value of a " + r + " node");
                t.dom().nodeValue = e
            }
        }
    }
    var Eu = xu(We, "text")
      , wu = function(t) {
        return Eu.get(t)
    }
      , Iu = function(t, e) {
        Eu.set(t, e)
    }
      , Su = function(n, r, t, e, o) {
        var i = function(t) {
            var e = n.dom().createRange();
            return e.setStart(r.dom(), t),
            e.collapse(!0),
            e
        }
          , a = wu(r).length
          , u = function(t, e, n, r, o) {
            if (0 === o)
                return 0;
            if (e === r)
                return o - 1;
            for (var i = r, a = 1; a < o; a++) {
                var u = t(a)
                  , c = Math.abs(e - u.left);
                if (n <= u.bottom) {
                    if (n < u.top || i < c)
                        return a - 1;
                    i = c
                }
            }
            return 0
        }(function(t) {
            return i(t).getBoundingClientRect()
        }, t, e, o.right, a);
        return i(u)
    }
      , Nu = function(e, n, r, o) {
        var t = e.dom().createRange();
        t.selectNode(n.dom());
        var i = t.getClientRects();
        return bu(i, function(t) {
            return Tu(t, r, o) ? k.some(t) : k.none()
        }).map(function(t) {
            return Su(e, n, r, o, t)
        })
    }
      , Lu = function(e, t, n, r) {
        var o = e.dom().createRange()
          , i = ko(t);
        return bu(i, function(t) {
            return o.selectNode(t.dom()),
            Tu(o.getBoundingClientRect(), n, r) ? _u(e, t, n, r) : k.none()
        })
    }
      , _u = function(t, e, n, r) {
        return (We(e) ? Nu : Lu)(t, e, n, r)
    }
      , Ou = function(t) {
        return (e = t,
        Eu.getOption(e)).filter(function(t) {
            return 0 !== t.trim().length || -1 < t.indexOf("\xa0")
        }).isSome();
        var e
    }
      , Cu = ["img", "br"]
      , Du = function(t) {
        return Ou(t) || q(Cu, Fe(t))
    }
      , Pu = function(t) {
        return Mi(t, Du)
    }
      , Au = function(t) {
        return ku(t, Du)
    }
      , ku = function(t, i) {
        var a = function(t) {
            for (var e = ko(t), n = e.length - 1; 0 <= n; n--) {
                var r = e[n];
                if (i(r))
                    return k.some(r);
                var o = a(r);
                if (o.isSome())
                    return o
            }
            return k.none()
        };
        return a(t)
    }
      , Mu = function(t, e) {
        return e - t.left < t.right - e
    }
      , Ru = function(t, e, n) {
        var r = t.dom().createRange();
        return r.selectNode(e.dom()),
        r.collapse(n),
        r
    }
      , Fu = function(e, t, n) {
        var r = e.dom().createRange();
        r.selectNode(t.dom());
        var o = r.getBoundingClientRect()
          , i = Mu(o, n);
        return (!0 === i ? Pu : Au)(t).map(function(t) {
            return Ru(e, t, i)
        })
    }
      , ju = function(t, e, n) {
        var r = e.dom().getBoundingClientRect()
          , o = Mu(r, n);
        return k.some(Ru(t, e, o))
    }
      , Uu = function(t, e, n, r) {
        var o = t.dom().createRange();
        o.selectNode(e.dom());
        var i = o.getBoundingClientRect();
        return function(t, e, n, r) {
            var o = t.dom().createRange();
            o.selectNode(e.dom());
            var i = o.getBoundingClientRect()
              , a = Math.max(i.left, Math.min(i.right, n))
              , u = Math.max(i.top, Math.min(i.bottom, r));
            return _u(t, e, a, u)
        }(t, e, Math.max(i.left, Math.min(i.right, n)), Math.max(i.top, Math.min(i.bottom, r)))
    }
      , Bu = (document.caretPositionFromPoint || document.caretRangeFromPoint,
    lt([{
        before: ["element"]
    }, {
        on: ["element", "offset"]
    }, {
        after: ["element"]
    }]))
      , Yu = {
        before: Bu.before,
        on: Bu.on,
        after: Bu.after,
        cata: function(t, e, n, r) {
            return t.fold(e, n, r)
        },
        getStart: function(t) {
            return t.fold(p, p, p)
        }
    }
      , Wu = lt([{
        domRange: ["rng"]
    }, {
        relative: ["startSitu", "finishSitu"]
    }, {
        exact: ["start", "soffset", "finish", "foffset"]
    }])
      , Hu = {
        domRange: Wu.domRange,
        relative: Wu.relative,
        exact: Wu.exact,
        exactFromRange: function(t) {
            return Wu.exact(t.start(), t.soffset(), t.finish(), t.foffset())
        },
        getWin: function(t) {
            var e, n = t.match({
                domRange: function(t) {
                    return an.fromDom(t.startContainer)
                },
                relative: function(t, e) {
                    return Yu.getStart(t)
                },
                exact: function(t, e, n, r) {
                    return t
                }
            });
            return e = n.dom().ownerDocument.defaultView,
            an.fromDom(e)
        },
        range: yu.create
    }
      , qu = function(t, e) {
        var n = Fe(t);
        return "input" === n ? Yu.after(t) : q(["br", "img"], n) ? 0 === e ? Yu.before(t) : Yu.after(t) : Yu.on(t, e)
    }
      , $u = function(t, e, n, r) {
        var o = _o(t).dom().createRange();
        return o.setStart(t.dom(), e),
        o.setEnd(n.dom(), r),
        o
    }
      , Vu = function(t, e, n, r, o) {
        var i, a, u = pu(t, e, n, r, o);
        i = t,
        a = u,
        k.from(i.getSelection()).each(function(t) {
            t.removeAllRanges(),
            t.addRange(a)
        })
    }
      , Xu = function(t, e, n, r, o) {
        var i, a, u, c, f, s = (i = r,
        a = o,
        u = qu(e, n),
        c = qu(i, a),
        Hu.relative(u, c));
        hu(f = t, s).match({
            ltr: function(t, e, n, r) {
                Vu(f, t, e, n, r)
            },
            rtl: function(e, n, r, o) {
                var t, i, a, u, c, s = f.getSelection();
                if (s.setBaseAndExtent)
                    s.setBaseAndExtent(e.dom(), n, r.dom(), o);
                else if (s.extend)
                    try {
                        i = e,
                        a = n,
                        u = r,
                        c = o,
                        (t = s).collapse(i.dom(), a),
                        t.extend(u.dom(), c)
                    } catch (t) {
                        Vu(f, r, o, e, n)
                    }
                else
                    Vu(f, r, o, e, n)
            }
        })
    }
      , Gu = function(t) {
        var e, n, r, o, i, a, u = an.fromDom(t.anchorNode), c = an.fromDom(t.focusNode);
        return e = u,
        n = t.anchorOffset,
        r = c,
        o = t.focusOffset,
        i = $u(e, n, r, o),
        a = No(e, r) && n === o,
        i.collapsed && !a ? k.some(yu.create(u, t.anchorOffset, c, t.focusOffset)) : function(t) {
            if (0 < t.rangeCount) {
                var e = t.getRangeAt(0)
                  , n = t.getRangeAt(t.rangeCount - 1);
                return k.some(yu.create(an.fromDom(e.startContainer), e.startOffset, an.fromDom(n.endContainer), n.endOffset))
            }
            return k.none()
        }(t)
    }
      , zu = function(t) {
        return k.from(t.getSelection()).filter(function(t) {
            return 0 < t.rangeCount
        }).bind(Gu)
    }
      , Ku = function(t) {
        return {
            startContainer: t.start,
            startOffset: t.soffset,
            endContainer: t.finish,
            endOffset: t.foffset
        }
    }
      , Ju = {
        set: function(t, e) {
            Xu(t, e.startContainer(), e.startOffset(), e.endContainer(), e.endOffset())
        },
        get: function(t) {
            return zu(t).map(Ku)
        }
    };
    function Zu(a) {
        return function(e) {
            var u, r, o, c, n = ao.create({
                after: io(["container"])
            }), i = (u = Ju,
            r = an.fromTag("br"),
            o = k.none(),
            c = function(t) {
                return _o(t).dom().defaultView
            }
            ,
            {
                cleanup: function() {
                    Ma(r)
                },
                toOn: function(i, t) {
                    var a = c(t);
                    o.each(function(t) {
                        var e = Ro(i)
                          , n = No(i, t.startContainer()) && e < t.startOffset() ? e : t.startOffset
                          , r = No(i, t.endContainer()) && e < t.endOffset() ? e : t.endOffset
                          , o = Aa(t.startContainer(), n, t.endContainer(), r);
                        u.set(a, o)
                    })
                },
                toOff: function(t, e) {
                    var n = c(e);
                    ea(e, r),
                    o = u.get(n, Aa),
                    u.set(n, Aa(r, 0, r, 0))
                }
            }), t = du(i, e, a);
            t.events.after.bind(function(t) {
                i.toOn(e, t.container()),
                n.trigger.after(t.container())
            });
            return {
                run: function() {
                    t.instance()()
                },
                events: n.registry
            }
        }
    }
    var Qu = lt([{
        error: ["message"]
    }, {
        paste: ["elements", "correlated"]
    }, {
        cancel: []
    }, {
        incomplete: ["elements", "correlated", "message"]
    }])
      , tc = function(t, e, n, r, o) {
        return t.fold(e, n, r, o)
    }
      , ec = {
        error: Qu.error,
        paste: Qu.paste,
        cancel: Qu.cancel,
        incomplete: Qu.incomplete,
        cata: tc,
        carry: function(t, r) {
            return tc(t, k.none, k.none, k.none, function(t, e, n) {
                return tc(r, k.none, function(t, e) {
                    return k.some(Qu.incomplete(t, e, n))
                }, k.none, k.none)
            }).getOr(r)
        }
    }
      , nc = ["officeStyles", "htmlStyles", "isWord", "isGoogleDocs", "proxyBin", "isInternal", "backgroundAssets"]
      , rc = function(t, n) {
        var r = {};
        return X(nc, function(e) {
            n[e]().or(t[e]()).each(function(t) {
                r[e] = t
            })
        }),
        oc(r)
    }
      , oc = to([], nc)
      , ic = to(["response", "bundle"], [])
      , ac = function(e) {
        return fc(function(t) {
            t(ic(e))
        })
    }
      , uc = function(t, e) {
        t(ic(e))
    }
      , cc = function(t) {
        return ac({
            response: t.response(),
            bundle: t.bundle()
        })
    }
      , sc = function(t) {
        return ac({
            response: ec.error(t),
            bundle: oc({})
        })
    }
      , fc = function(e) {
        var t = function(t) {
            e(t)
        }
          , o = fc;
        return {
            get: t,
            map: function(r) {
                return o(function(n) {
                    t(function(t) {
                        var e = r(t);
                        n(e)
                    })
                })
            },
            bind: function(n) {
                return o(function(e) {
                    t(function(t) {
                        n(t).get(e)
                    })
                })
            }
        }
    }
      , lc = Jr("steps", "input", "label", "capture")
      , dc = function(t, e, n) {
        var r;
        return (r = n,
        bu(t, function(e) {
            return e.getAvailable(r).map(function(t) {
                return lc(e.steps(), t, e.label(), e.capture())
            })
        })).getOrThunk(function() {
            var t = e.getAvailable(n);
            return lc(e.steps(), t, e.label(), e.capture())
        })
    }
      , mc = function(t, a) {
        return K(t, function(t, i) {
            return t.bind(function(t) {
                var r, e, n, o;
                return e = function() {
                    return i(a, t)
                }
                ,
                n = y(cc, r = t),
                o = function() {
                    return e().map(function(t) {
                        var e = rc(r.bundle(), t.bundle())
                          , n = ec.carry(r.response(), t.response());
                        return ic({
                            response: n,
                            bundle: e
                        })
                    })
                }
                ,
                ec.cata(r.response(), n, o, n, o)
            })
        }, ac({
            response: ec.paste([], []),
            bundle: oc({})
        }))
    }
      , pc = function(t) {
        return e = t,
        n = !1,
        an.fromDom(e.dom().cloneNode(n));
        var e, n
    }
      , gc = function(t) {
        return Be(t) ? (e = "v:shape",
        n = t.dom().nodeValue,
        r = an.fromTag("div"),
        o = n.indexOf("]>"),
        r.dom().innerHTML = n.substr(o + "]>".length),
        Mi(r, function(t) {
            return Fe(t) === e
        })) : k.none();
        var e, n, r, o
    }
      , vc = function(t) {
        return jo(t, ".rtf-data-image")
    }
      , hc = {
        local: function(t) {
            if ("img" === Fe(t)) {
                var e = Ve(t, "src");
                if (null != e && Te(e, "file://")) {
                    var n = pc(t)
                      , r = e.split(/[\/\\]/)
                      , o = r[r.length - 1];
                    return qe(n, "data-image-id", o),
                    Ge(n, "src"),
                    qe(n, "data-image-type", "local"),
                    Li(n, "rtf-data-image"),
                    k.some(n)
                }
                return k.none()
            }
            return k.none()
        },
        vshape: function(t) {
            return gc(t).map(function(t) {
                var e = Ve(t, "o:spid")
                  , n = void 0 === e ? Ve(t, "id") : e
                  , r = an.fromTag("img");
                return Li(r, "rtf-data-image"),
                qe(r, "data-image-id", n.substr("_x0000_".length)),
                qe(r, "data-image-type", "code"),
                eu(r, {
                    width: nu(t, "width"),
                    height: nu(t, "height")
                }),
                r
            })
        },
        find: vc,
        exists: function(t) {
            return 0 < vc(t).length
        },
        scour: gc
    }
      , yc = function() {
        return /^(mso-.*|tab-stops|tab-interval|language|text-underline|text-effect|text-line-through|font-color|horiz-align|list-image-[0-9]+|separator-image|table-border-color-(dark|light)|vert-align|vnd\..*)$/
    }
      , bc = function() {
        return /^(font|em|strong|samp|acronym|cite|code|dfn|kbd|tt|b|i|u|s|sub|sup|ins|del|var|span)$/
    }
      , Tc = lt([{
        starts: ["value", "f"]
    }, {
        pattern: ["regex", "f"]
    }, {
        contains: ["value", "f"]
    }, {
        exact: ["value", "f"]
    }, {
        all: []
    }, {
        not: ["stringMatch"]
    }])
      , xc = function(t, n) {
        return t.fold(function(t, e) {
            return 0 === e(n).indexOf(e(t))
        }, function(t, e) {
            return t.test(e(n))
        }, function(t, e) {
            return 0 <= e(n).indexOf(e(t))
        }, function(t, e) {
            return e(n) === e(t)
        }, function() {
            return !0
        }, function(t) {
            return !xc(t, n)
        })
    }
      , Ec = {
        starts: Tc.starts,
        pattern: Tc.pattern,
        contains: Tc.contains,
        exact: Tc.exact,
        all: Tc.all,
        not: Tc.not,
        cata: function(t, e, n, r, o, i, a) {
            return t.fold(e, n, r, o, i, a)
        },
        matches: xc,
        caseSensitive: function(t) {
            return t
        },
        caseInsensitive: function(t) {
            return t.toLowerCase()
        }
    }
      , wc = function(t, e, n, r) {
        var o = r.name
          , i = void 0 !== r.condition ? r.condition : v(!0)
          , a = void 0 !== r.value ? r.value : Ec.all();
        return Ec.matches(o, n) && Ec.matches(a, e) && i(t)
    }
      , Ic = function(t, e) {
        var n = Fe(t)
          , r = e.name
          , o = void 0 !== e.condition ? e.condition : v(!0);
        return Ec.matches(r, n) && o(t)
    }
      , Sc = function(t, e) {
        var n = {};
        return X(t.dom().attributes, function(t) {
            e(t.value, t.name) || (n[t.name] = t.value)
        }),
        n
    }
      , Nc = function(t, e, n) {
        var r, o, i = V(t.dom().attributes, function(t) {
            return t.name
        });
        ft(e) !== i.length && (r = t,
        o = e,
        X(i, function(t) {
            Ge(r, t)
        }),
        it(o, function(t, e) {
            qe(r, e, t)
        }))
    }
      , Lc = (v({}),
    function(e) {
        var t = ot(e);
        return V(t, function(t) {
            return t + ": " + e[t]
        }).join("; ")
    }
    )
      , _c = function(r, o) {
        var t = r.dom().style
          , i = {};
        return X(null == t ? [] : t, function(t) {
            var e, n = (e = t,
            r.dom().style.getPropertyValue(e));
            o(n, t) || (i[t] = n)
        }),
        i
    }
      , Oc = function(n, t, e) {
        qe(n, "style", "");
        var r = ft(t)
          , o = ft(e);
        if (0 === r && 0 === o)
            Ge(n, "style");
        else if (0 === r)
            qe(n, "style", Lc(e));
        else {
            it(t, function(t, e) {
                tu(n, e, t)
            });
            var i = Ve(n, "style")
              , a = 0 < o ? Lc(e) + "; " : "";
            qe(n, "style", a + i)
        }
    }
      , Cc = function(t, e, n) {
        var r, o, i, a = t.dom().getAttribute("style"), u = (o = {},
        i = null != (r = a) ? r.split(";") : [],
        X(i, function(t) {
            var e = t.split(":");
            2 === e.length && (o[Ee(e[0])] = Ee(e[1]))
        }),
        o), c = {};
        return X(e, function(t) {
            var e = u[t];
            void 0 === e || n(e, t) || (c[t] = e)
        }),
        c
    }
      , Dc = ["mso-list"]
      , Pc = function(t, e) {
        var n = Cc(t, Dc, e)
          , r = _c(t, e);
        Oc(t, r, n)
    }
      , Ac = function(t, e) {
        var n = Sc(t, e);
        Nc(t, n, {})
    }
      , kc = Pc
      , Mc = Ac
      , Rc = function(t, e) {
        Pc(an.fromDom(t), e)
    }
      , Fc = function(t, r, o) {
        t(o, function(e, n) {
            return $(r, function(t) {
                return wc(o, e, n, t)
            })
        })
    }
      , jc = function(t, e) {
        var r = mt({
            styles: [],
            attributes: [],
            classes: [],
            tags: []
        }, e)
          , n = jo(t, "*");
        X(n, function(n) {
            Fc(kc, r.styles, n),
            Fc(Mc, r.attributes, n),
            X(r.classes, function(e) {
                var t = Xe(n, "class") ? Di(n) : [];
                X(t, function(t) {
                    Ec.matches(e.name, t) && _i(n, t)
                })
            })
        });
        var o = jo(t, "*");
        X(o, function(t) {
            $(r.tags, y(Ic, t)) && Ma(t)
        })
    }
      , Uc = function(t, e) {
        var n = mt({
            tags: []
        }, e)
          , r = jo(t, "*");
        X(r, function(t) {
            $(n.tags, y(Ic, t)) && Ra(t)
        })
    }
      , Bc = function(t, e) {
        var n = mt({
            tags: []
        }, e)
          , r = jo(t, "*");
        X(r, function(e) {
            J(n.tags, y(Ic, e)).each(function(t) {
                t.mutate(e)
            })
        })
    }
      , Yc = "startElement"
      , Wc = "endElement"
      , Hc = "comment"
      , qc = function(t, e, n) {
        var r, o, i, a = an.fromDom(t);
        switch (t.nodeType) {
        case 1:
            e ? r = Wc : (r = Yc,
            eu(a, n || {})),
            o = "HTML" !== t.scopeName && t.scopeName && t.tagName && t.tagName.indexOf(":") <= 0 ? (t.scopeName + ":" + t.tagName).toUpperCase() : t.tagName;
            break;
        case 3:
            r = "text",
            i = t.nodeValue;
            break;
        case 8:
            r = Hc,
            i = t.nodeValue;
            break;
        default:
            l.console.log("WARNING: Unsupported node type encountered: " + t.nodeType)
        }
        return {
            getNode: function() {
                return t
            },
            tag: function() {
                return o
            },
            type: function() {
                return r
            },
            text: function() {
                return i
            }
        }
    }
      , $c = function(t, e) {
        return qc(e.createElement(t), !0)
    }
      , Vc = $c("HTML", l.window.document)
      , Xc = {
        START_ELEMENT_TYPE: Yc,
        END_ELEMENT_TYPE: Wc,
        TEXT_TYPE: "text",
        COMMENT_TYPE: Hc,
        FINISHED: Vc,
        token: qc,
        createStartElement: function(t, e, n, r) {
            var o = r.createElement(t);
            return it(e, function(t, e) {
                o.setAttribute(e, t)
            }),
            qc(o, !1, n)
        },
        createEndElement: $c,
        createComment: function(t, e) {
            return qc(e.createComment(t), !1)
        },
        createText: function(t, e) {
            return qc(e.createTextNode(t))
        }
    }
      , Gc = function(i) {
        var a = i.createDocumentFragment()
          , u = a
          , c = function(t) {
            a.appendChild(t)
        };
        return {
            dom: u,
            receive: function(t) {
                var e, n, r, o;
                switch (t.type()) {
                case Xc.START_ELEMENT_TYPE:
                    o = t.getNode().cloneNode(!1),
                    c(r = o),
                    a = r;
                    break;
                case Xc.TEXT_TYPE:
                    e = t,
                    n = i.createTextNode(e.text()),
                    c(n);
                    break;
                case Xc.END_ELEMENT_TYPE:
                    null === (a = a.parentNode) && (a = u);
                    break;
                case Xc.COMMENT_TYPE:
                    break;
                default:
                    throw {
                        message: "Unsupported token type: " + t.type()
                    }
                }
            },
            label: "SERIALISER"
        }
    }
      , zc = function(t, o) {
        var i;
        o = o || l.window.document,
        i = o.createElement("div"),
        o.body.appendChild(i),
        i.style.position = "absolute",
        i.style.left = "-10000px",
        i.innerHTML = t;
        var a = i.firstChild || Xc.FINISHED
          , u = []
          , c = !1;
        return {
            hasNext: function() {
                return void 0 !== a
            },
            next: function() {
                var t, e, n = a, r = c;
                return !c && a.firstChild ? (u.push(a),
                a = a.firstChild) : c || 1 !== a.nodeType ? a.nextSibling ? (a = a.nextSibling,
                c = !1) : (a = u.pop(),
                c = !0) : c = !0,
                n === Xc.FINISHED || a || (o.body.removeChild(i),
                a = Xc.FINISHED),
                e = r,
                (t = n) === Xc.FINISHED ? t : t ? Xc.token(t, e) : void 0
            }
        }
    }
      , Kc = function(t, e, n) {
        var r, o = n;
        for (r = e.length - 1; 0 <= r; r--)
            o = e[r](o, {}, t);
        return o
    }
      , Jc = function(t, e, n) {
        for (var r = Gc(t), o = zc(e, t), i = Kc(t, n, r); o.hasNext(); ) {
            var a = o.next();
            i.receive(a)
        }
        return r.dom
    }
      , Zc = function(e) {
        return function(t) {
            jc(t, e)
        }
    }
      , Qc = function(e) {
        return function(t) {
            Uc(t, e)
        }
    }
      , ts = function(e) {
        return function(t) {
            Bc(t, e)
        }
    }
      , es = function(o) {
        return function(t) {
            var e = uu(t)
              , n = _o(t)
              , r = Jc(n.dom(), e, o);
            ka(t),
            t.dom().appendChild(r)
        }
    }
      , ns = function(t, e) {
        return 0 <= t.indexOf("<o:p>") || e.browser.isEdge() && 0 <= t.indexOf('v:shapes="') || e.browser.isEdge() && 0 <= t.indexOf("mso-") || 0 <= t.indexOf("mso-list") || 0 <= t.indexOf("p.MsoNormal, li.MsoNormal, div.MsoNormal") || 0 <= t.indexOf("MsoListParagraphCxSpFirst") || 0 <= t.indexOf("<w:WordDocument>")
    }
      , rs = function(t, e, n) {
        var r = an.fromTag("div", t.dom());
        return r.dom().innerHTML = e,
        X(n, function(t) {
            t(r)
        }),
        uu(r)
    };
    function os(a, u, t) {
        return function(e, t, n) {
            var r = function(t) {
                e.receive(t)
            }
              , o = function(t, e, n) {
                return n = void 0 !== n ? n : t.type() === Xc.END_ELEMENT_TYPE,
                Xc.token(e, n, {})
            }
              , i = {
                emit: r,
                emitTokens: function(t) {
                    X(t, r)
                },
                receive: function(t) {
                    a(i, t, o)
                },
                document: l.window.document
            };
            return u(i),
            i
        }
    }
    var is = function(t, e) {
        var n = an.fromDom(t.getNode());
        return Ve(n, e)
    }
      , as = function(t, e) {
        var n = an.fromDom(t.getNode());
        return nu(n, e)
    }
      , us = function(t) {
        return t.type() === Xc.TEXT_TYPE && /^[\s\u00A0]*$/.test(t.text())
    }
      , cs = function(t, e, n) {
        return t === e || t && e && t.tag === e.tag && t.type === e.type && (n || t.variant === e.variant)
    }
      , ss = {
        guessFrom: function(e, n) {
            return J(e, function(t) {
                return "UL" === t.tag || n && cs(t, n, !0)
            }).orThunk(function() {
                return 0 === (t = e).length ? k.none() : k.some(t[0]);
                var t
            })
        },
        eqListType: cs
    }
      , fs = function(t, e) {
        if (void 0 === t || void 0 === e)
            throw l.console.trace(),
            "brick";
        t.nextFilter.set(e)
    }
      , ls = function(t, e, n) {
        e.nextFilter.get()(t, e, n)
    }
      , ds = fs
      , ms = ls
      , ps = Jr("level", "token", "type")
      , gs = function(t, n, e, r) {
        var o = e.getCurrentListType()
          , i = e.getCurrentLevel() == r.level() ? o : null;
        return ss.guessFrom(r.emblems(), i).filter(function(t) {
            return !("OL" === t.tag && (!q(["P"], (e = n).tag()) || /^MsoHeading/.test(is(e, "class"))));
            var e
        })
    }
      , vs = function(t, e) {
        return Xe(an.fromDom(e.getNode()), "data-list-level")
    }
      , hs = function(d) {
        return function(t, e, n) {
            var r, o, i, a, u = (r = an.fromDom(n.getNode()),
            o = parseInt(Ve(r, "data-list-level"), 10),
            i = Ve(r, "data-list-emblems"),
            a = JSON.parse(i),
            Ge(r, "data-list-level"),
            Ge(r, "data-list-emblems"),
            {
                level: v(o),
                emblems: v(a)
            });
            u.level(),
            e.originalToken.set(n);
            var c, s, f, l = (c = n,
            s = u,
            gs((f = e).listType.get(), c, f.emitter, s).each(f.listType.set),
            ps(s.level(), f.originalToken.get(), f.listType.get()));
            e.emitter.openItem(l.level(), l.token(), l.type()),
            ds(e, d.inside())
        }
    };
    function ys(t, e, n) {
        return {
            pred: t,
            action: e,
            label: v(n)
        }
    }
    var bs = function(t, r) {
        return function(t, e, n) {
            return r(t, e, n)
        }
    };
    function Ts(t, r, e) {
        var o = bs(0, e)
          , n = function(t, e, n) {
            J(r, function(t) {
                return t.pred(e, n)
            }).fold(v(o), function(t) {
                var e = t.label();
                return void 0 === e ? t.action : bs(0, t.action)
            })(t, e, n)
        };
        return n.toString = function() {
            return "Handlers for " + t
        }
        ,
        n
    }
    var xs = function(r) {
        return Ts("Inside.List.Item", [ys(function(t, e) {
            return e.type() === Xc.END_ELEMENT_TYPE && t.originalToken.get() && e.tag() === t.originalToken.get().tag()
        }, function(t, e, n) {
            ds(e, r.outside())
        }, "Closing open tag")], function(t, e, n) {
            t.emit(n)
        })
    }
      , Es = function(r) {
        return Ts("Outside.List.Item", [ys(vs, hs(r), "Data List ****"), ys(function(t, e) {
            return e.type() === Xc.TEXT_TYPE && us(e)
        }, function(t, e, n) {
            t.emit(n)
        }, "Whitespace")], function(t, e, n) {
            e.emitter.closeAllLists(),
            t.emit(n),
            ds(e, r.outside())
        })
    }
      , ws = Jr("state", "result")
      , Is = Jr("state", "value")
      , Ss = {
        state: Jr("level", "type", "types", "items"),
        value: Is,
        result: ws
    }
      , Ns = function(t, e) {
        var n = t.items().slice(0)
          , r = void 0 !== e && "P" !== e ? k.some(e) : k.none();
        r.fold(function() {
            n.push("P")
        }, function(t) {
            n.push(t)
        });
        var o = Ss.state(t.level(), t.type(), t.types(), n);
        return Ss.value(o, r)
    }
      , Ls = function(t) {
        var e = t.items().slice(0);
        if (0 < e.length && "P" !== e[e.length - 1]) {
            var n = e[e.length - 1];
            e[e.length - 1] = "P";
            var r = Ss.state(t.level(), t.type(), t.types(), e);
            return Ss.value(r, k.some(n))
        }
        return Ss.value(t, k.none())
    }
      , _s = function(t, e, n) {
        for (var r = [], o = t; e(o); ) {
            var i = n(o);
            o = i.state(),
            r = r.concat(i.result())
        }
        return Ss.result(o, r)
    }
      , Os = function(t, e, n) {
        return _s(t, function(t) {
            return t.level() < e
        }, n)
    }
      , Cs = function(t, e, n) {
        return _s(t, function(t) {
            return t.level() > e
        }, n)
    }
      , Ds = function(t) {
        var e;
        return t ? void 0 !== (e = as(t, "margin-left")) && "0px" !== e ? {
            "margin-left": e
        } : {} : {
            "list-style-type": "none"
        }
    }
      , Ps = function(t, e, n) {
        var r = e.start && 1 < e.start ? {
            start: e.start
        } : {}
          , o = t.level() + 1
          , i = e
          , a = t.types().concat([e])
          , u = [y(Xc.createStartElement, e.tag, r, n)]
          , c = Ss.state(o, i, a, t.items());
        return Ss.result(c, u)
    }
      , As = function(t) {
        var e = t.types().slice(0)
          , n = [y(Xc.createEndElement, e.pop().tag)]
          , r = t.level() - 1
          , o = e[e.length - 1]
          , i = Ss.state(r, o, e, t.items());
        return Ss.result(i, n)
    }
      , ks = Ps
      , Ms = function(t, e, n) {
        var r, o, i, a = Ds(e), u = t.type() && !ss.eqListType(t.type(), n) ? (r = n,
        o = As(t),
        i = Ps(o.state(), r, r.type ? {
            "list-style-type": r.type
        } : {}),
        Ss.result(i.state(), o.result().concat(i.result()))) : Ss.result(t, []), c = [y(Xc.createStartElement, "LI", {}, a)], s = Ns(u.state(), e && e.tag()), f = s.value().map(function(t) {
            return Rc(e.getNode(), v(!0)),
            [v(e)]
        }).getOr([]);
        return Ss.result(s.state(), u.result().concat(c).concat(f))
    }
      , Rs = As
      , Fs = function(t) {
        var e = y(Xc.createEndElement, "LI")
          , n = Ls(t)
          , r = n.value().fold(function() {
            return [e]
        }, function(t) {
            return [y(Xc.createEndElement, t), e]
        });
        return Ss.result(n.state(), r)
    }
      , js = function(t) {
        if (0 === t.length)
            throw "Compose must have at least one element in the list";
        var e = t[t.length - 1]
          , n = nt(t, function(t) {
            return t.result()
        });
        return Ss.result(e.state(), n)
    }
      , Us = function(t) {
        var e = Fs(t)
          , n = Rs(e.state());
        return js([e, n])
    }
      , Bs = function(t, c, s, f) {
        return Os(t, s, function(t) {
            return n = c,
            r = s,
            o = f,
            i = (e = t).level() === r - 1 && n.type ? {
                "list-style-type": n.type
            } : {},
            a = ks(e, n, i),
            u = Ms(a.state(), a.state().level() == r ? o : void 0, n),
            js([a, u]);
            var e, n, r, o, i, a, u
        })
    }
      , Ys = function(t, e) {
        return Cs(t, e, Us)
    }
      , Ws = {
        openItem: function(t, e, n, r) {
            var o, i, a, u, c, s, f, l, d, m, p, g, v = t.level() > e ? Ys(t, e) : Ss.result(t, []), h = v.state().level() === e ? (l = v.state(),
            d = r,
            m = n,
            p = 0 < l.level() ? Fs(l) : Ss.result(l, []),
            g = Ms(p.state(), m, d),
            js([p, g])) : (o = v.state(),
            i = r,
            u = n,
            c = 1 < (a = e) ? Ls(o) : Ss.value(o, k.none()),
            s = c.value().map(function(t) {
                return [y(Xc.createEndElement, t)]
            }).getOr([]),
            c.state().level(),
            f = Bs(c.state(), i, a, u),
            Ss.result(f.state(), s.concat(f.result())));
            return js([v, h])
        },
        closeAllLists: Ys
    }
      , Hs = ["disc", "circle", "square"]
      , qs = function(t, e) {
        return "UL" === t.tag && Hs[e - 1] === t.type && (t = {
            tag: "UL"
        }),
        t
    };
    var $s = function(t) {
        var e = t
          , n = function() {
            return e
        };
        return {
            get: n,
            set: function(t) {
                e = t
            },
            clone: function() {
                return $s(n())
            }
        }
    }
      , Vs = {
        getCurrentListType: function() {
            return Xs().getCurrentListType()
        },
        getCurrentLevel: function() {
            return Xs().getCurrentLevel()
        },
        closeAllLists: function() {
            return Xs().closeAllLists.apply(void 0, arguments)
        },
        openItem: function() {
            return Xs().openItem.apply(void 0, arguments)
        }
    }
      , Xs = function() {
        return {
            getCurrentListType: v({}),
            getCurrentLevel: v(1),
            closeAllLists: p,
            openItem: p
        }
    };
    var Gs, zs, Ks, Js, Zs, Qs = {
        inside: function() {
            return ef
        },
        outside: function() {
            return nf
        }
    }, tf = (Gs = !1,
    {
        check: function(t) {
            return Gs && t.type() === Xc.TEXT_TYPE ? (t.text(),
            !0) : t.type() === Xc.START_ELEMENT_TYPE && "STYLE" === t.tag() ? Gs = !0 : t.type() === Xc.END_ELEMENT_TYPE && "STYLE" === t.tag() && !(Gs = !1)
        }
    }), ef = xs(Qs), nf = Es(Qs), rf = (Ks = $s(zs = nf),
    Js = $s(null),
    Zs = $s(null),
    {
        reset: function(t) {
            Ks.set(zs),
            Js.set(null),
            Zs.set(null);
            var n, r, i, a, e = (r = (n = t).document,
            i = Ss.state(0, void 0, [], []),
            a = function(t) {
                X(t.result(), function(t) {
                    var e = t(r);
                    n.emit(e)
                })
            }
            ,
            {
                closeAllLists: function() {
                    var t = Ws.closeAllLists(i, 0);
                    i = t.state(),
                    a(t)
                },
                openItem: function(t, e, n) {
                    if (n) {
                        var r = qs(n, t)
                          , o = Ws.openItem(i, t, e, r);
                        i = o.state(),
                        a(o)
                    }
                },
                getCurrentListType: function() {
                    return i.type()
                },
                getCurrentLevel: function() {
                    return i.level()
                }
            });
            Xs = v(e)
        },
        nextFilter: Ks,
        originalToken: Js,
        listType: Zs,
        emitter: Vs
    }), of = os(function(t, e, n) {
        tf.check(e) || ms(t, rf, e)
    }, rf.reset), af = [{
        regex: /^\(?[dc][\.\)]$/,
        type: {
            tag: "OL",
            type: "lower-alpha"
        }
    }, {
        regex: /^\(?[DC][\.\)]$/,
        type: {
            tag: "OL",
            type: "upper-alpha"
        }
    }, {
        regex: /^\(?M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[\.\)]$/,
        type: {
            tag: "OL",
            type: "upper-roman"
        }
    }, {
        regex: /^\(?m*(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})[\.\)]$/,
        type: {
            tag: "OL",
            type: "lower-roman"
        }
    }, {
        regex: /^\(?[0-9]+[\.\)]$/,
        type: {
            tag: "OL"
        }
    }, {
        regex: /^([0-9]+\.)*[0-9]+\.?$/,
        type: {
            tag: "OL",
            variant: "outline"
        }
    }, {
        regex: /^\(?[a-z]+[\.\)]$/,
        type: {
            tag: "OL",
            type: "lower-alpha"
        }
    }, {
        regex: /^\(?[A-Z]+[\.\)]$/,
        type: {
            tag: "OL",
            type: "upper-alpha"
        }
    }], uf = {
        "\u2022": {
            tag: "UL",
            type: "disc"
        },
        "\xb7": {
            tag: "UL",
            type: "disc"
        },
        "\xa7": {
            tag: "UL",
            type: "square"
        }
    }, cf = {
        o: {
            tag: "UL",
            type: "circle"
        },
        "-": {
            tag: "UL",
            type: "disc"
        },
        "\u25cf": {
            tag: "UL",
            type: "disc"
        },
        "\ufffd": {
            tag: "UL",
            type: "circle"
        }
    }, sf = function(u, t) {
        var e = cf[u] ? [cf[u]] : []
          , n = t && uf[u] ? [uf[u]] : t ? [{
            tag: "UL",
            variant: u
        }] : []
          , r = nt(af, function(t) {
            return t.regex.test(u) ? [mt(t.type, (r = u,
            o = r.split("."),
            i = function() {
                if (0 === o.length)
                    return r;
                var t = o[o.length - 1];
                return 0 === t.length && 1 < o.length ? o[o.length - 2] : t
            }(),
            a = parseInt(i, 10),
            isNaN(a) ? {} : {
                start: a
            }), {
                variant: (e = t.type,
                n = u,
                void 0 !== e.variant ? e.variant : "(" === n.charAt(0) ? "()" : ")" === n.charAt(n.length - 1) ? ")" : ".")
            })] : [];
            var e, n, r, o, i, a
        })
          , o = e.concat(n).concat(r);
        return V(o, function(t) {
            return void 0 !== t.variant ? t : mt(t, {
                variant: u
            })
        })
    }, ff = function(t) {
        return t.dom().textContent
    }, lf = function(t) {
        return Cc(t, ["mso-list"], v(!1))["mso-list"]
    }, df = function(t) {
        return Ye(t) && ou(t, "font-family").exists(function(t) {
            return q(["wingdings", "symbol"], t.toLowerCase())
        })
    }, mf = {
        getMsoList: lf,
        extractLevel: function(t) {
            var e = lf(t)
              , n = / level([0-9]+)/.exec(e);
            return n && n[1] ? k.some(parseInt(n[1], 10)) : k.none()
        },
        extractEmblem: function(t, e) {
            var n = ff(t).trim()
              , r = sf(n, e);
            return 0 < r.length ? k.some(r) : k.none()
        },
        extractSymSpan: function(t) {
            return ki(t, df)
        },
        extractMsoIgnore: function(t) {
            return Mi(t, function(t) {
                return !!(Ye(t) ? Cc(t, ["mso-list"], v(!1)) : [])["mso-list"]
            })
        },
        extractCommentSpan: function(t) {
            return ki(t, Be).bind(Po).filter(function(t) {
                return "span" === Fe(t)
            })
        },
        isSymbol: df,
        deduceLevel: function(t) {
            return ou(t, "margin-left").bind(function(t) {
                var e = parseInt(t, 10);
                return isNaN(e) ? k.none() : k.some(Math.max(1, Math.ceil(e / 18)))
            })
        }
    };
    var pf, gf, vf, hf, yf, bf, Tf, xf = function(t) {
        for (var e = []; null !== t.nextNode(); )
            e.push(an.fromDom(t.currentNode));
        return e
    }, Ef = Oe.detect().browser, wf = Ef.isIE() || Ef.isEdge() ? function(t) {
        try {
            return xf(t)
        } catch (t) {
            return []
        }
    }
    : xf, If = v(v(!0)), Sf = function(t, e) {
        var n = e.fold(If, function(e) {
            return function(t) {
                return e(t.nodeValue)
            }
        });
        n.acceptNode = n;
        var r = l.document.createTreeWalker(t.dom(), bt.getOrDie("NodeFilter").SHOW_COMMENT, n, !1);
        return wf(r)
    }, Nf = function(t, e, n, r) {
        var o;
        !function(t, e, n) {
            qe(t, "data-list-level", e);
            var r = JSON.stringify(n);
            qe(t, "data-list-emblems", r)
        }(t, e, n),
        o = Sf(t, k.none()),
        X(o, Ma),
        X(r, Ma),
        Ge(t, "style"),
        Ge(t, "class")
    }, Lf = function(t) {
        return (r = t,
        mf.extractLevel(r).bind(function(n) {
            return mf.extractSymSpan(r).bind(function(e) {
                return mf.extractEmblem(e, !0).map(function(t) {
                    return {
                        mutate: function() {
                            Nf(r, n, t, [e])
                        }
                    }
                })
            })
        })).orThunk(function() {
            return r = t,
            mf.extractLevel(r).bind(function(n) {
                return mf.extractCommentSpan(r).bind(function(e) {
                    return mf.extractEmblem(e, mf.isSymbol(e)).map(function(t) {
                        return {
                            mutate: function() {
                                Nf(r, n, t, [e])
                            }
                        }
                    })
                })
            });
            var r
        }).orThunk(function() {
            return r = t,
            mf.extractLevel(r).bind(function(n) {
                return mf.extractCommentSpan(r).bind(function(e) {
                    return mf.extractEmblem(e, mf.isSymbol(e)).map(function(t) {
                        return {
                            mutate: function() {
                                Nf(r, n, t, [e])
                            }
                        }
                    })
                })
            });
            var r
        }).orThunk(function() {
            return "p" !== Fe(r = t) ? k.none() : mf.extractLevel(r).bind(function(n) {
                return mf.extractMsoIgnore(r).bind(function(e) {
                    return mf.extractEmblem(e, !1).map(function(t) {
                        return {
                            mutate: function() {
                                Nf(r, n, t, [Oo(e).getOr(e)])
                            }
                        }
                    })
                })
            });
            var r
        }).orThunk(function() {
            return "p" !== Fe(r = t) ? k.none() : mf.extractMsoIgnore(r).bind(function(t) {
                var n = Oo(t).getOr(t)
                  , e = mf.isSymbol(n);
                return mf.extractEmblem(t, e).bind(function(e) {
                    return mf.deduceLevel(r).map(function(t) {
                        return {
                            mutate: function() {
                                Nf(r, t, e, [n])
                            }
                        }
                    })
                })
            });
            var r
        });
        var r
    }, _f = {
        filter: of,
        preprocess: ts({
            tags: [{
                name: Ec.pattern(/^(p|h\d+)$/, Ec.caseInsensitive),
                mutate: function(t) {
                    Lf(t).each(function(t) {
                        t.mutate()
                    })
                }
            }]
        })
    }, Of = function(t, e) {
        return Mi(t, e).isSome()
    }, Cf = function(t) {
        return void 0 === t.dom().attributes || null === t.dom().attributes || (0 === t.dom().attributes.length || 1 === t.dom().attributes.length && "style" === t.dom().attributes[0].name)
    }, Df = {
        isNotImage: function(t) {
            return "img" !== Fe(t)
        },
        hasContent: function(t) {
            return !Cf(t) || (n = (e = t).dom().attributes,
            r = null != n && 0 < n.length,
            ("span" !== Fe(e) || r) && Of(t, function(t) {
                var e = !Cf(t)
                  , n = !q(["font", "em", "strong", "samp", "acronym", "cite", "code", "dfn", "kbd", "tt", "b", "i", "u", "s", "sub", "sup", "ins", "del", "var", "span"], Fe(t));
                return We(t) || e || n
            }));
            var e, n, r
        },
        isList: function(t) {
            return "ol" === Fe(t) || "ul" === Fe(t)
        },
        isLocal: function(t) {
            var e = Ve(t, "src");
            return /^file:/.test(e)
        },
        hasNoAttributes: Cf,
        isEmpty: function(t) {
            return 0 === uu(t).length
        }
    }, Pf = function(t, e) {
        var n = an.fromTag(t);
        Zi(e, n);
        var r = e.dom().attributes;
        X(r, function(t) {
            n.dom().setAttribute(t.name, t.value)
        });
        var o = ko(e);
        return oa(n, o),
        Ma(e),
        n
    }, Af = function(t) {
        return Do(t).bind(function(t) {
            return We(t) && 0 === wu(t).trim().length ? Af(t) : "li" === Fe(t) ? k.some(t) : k.none()
        })
    }, kf = {
        changeTag: Pf,
        addBrTag: function(t) {
            0 === uu(t).length && ea(t, an.fromTag("br"))
        },
        properlyNest: function(n) {
            Oo(n).each(function(t) {
                var e = Fe(t);
                q(["ol", "ul"], e) && Af(n).fold(function() {
                    var t = an.fromTag("li");
                    tu(t, "list-style-type", "none"),
                    na(n, t)
                }, function(t) {
                    ea(t, n)
                })
            })
        },
        fontToSpan: function(t) {
            var o = Pf("span", t)
              , i = {
                "font-size": {
                    1: "8pt",
                    2: "10pt",
                    3: "12pt",
                    4: "14pt",
                    5: "18pt",
                    6: "24pt",
                    7: "36pt"
                }
            };
            it({
                face: "font-family",
                size: "font-size",
                color: "color"
            }, function(t, e) {
                if (Xe(o, e)) {
                    var n = Ve(o, e)
                      , r = void 0 !== i[t] && void 0 !== i[t][n] ? i[t][n] : n;
                    tu(o, t, r),
                    Ge(o, e)
                }
            })
        }
    }, Mf = xu(Be, "comment"), Rf = function(t) {
        return Mf.get(t)
    }, Ff = Qc({
        tags: [{
            name: Ec.pattern(/^([OVWXP]|U[0-9]+|ST[0-9]+):/i, Ec.caseInsensitive)
        }]
    }), jf = Zc({
        attributes: [{
            name: Ec.exact("id", Ec.caseInsensitive),
            value: Ec.starts("docs-internal-guid", Ec.caseInsensitive)
        }]
    }), Uf = [es([_f.filter])], Bf = Zc({
        attributes: [{
            name: Ec.pattern(/^v:/, Ec.caseInsensitive)
        }, {
            name: Ec.exact("href", Ec.caseInsensitive),
            value: Ec.contains("#_toc", Ec.caseInsensitive)
        }, {
            name: Ec.exact("href", Ec.caseInsensitive),
            value: Ec.contains("#_mso", Ec.caseInsensitive)
        }, {
            name: Ec.pattern(/^xmlns(:|$)/, Ec.caseInsensitive)
        }, {
            name: Ec.exact("type", Ec.caseInsensitive),
            condition: Df.isList
        }]
    }), Yf = Zc({
        tags: [{
            name: Ec.exact("script", Ec.caseInsensitive)
        }, {
            name: Ec.exact("link", Ec.caseInsensitive)
        }, {
            name: Ec.exact("style", Ec.caseInsensitive),
            condition: Df.isEmpty
        }],
        attributes: [{
            name: Ec.starts("on", Ec.caseInsensitive)
        }, {
            name: Ec.exact('"', Ec.caseInsensitive)
        }, {
            name: Ec.exact("lang", Ec.caseInsensitive)
        }, {
            name: Ec.exact("language", Ec.caseInsensitive)
        }],
        styles: [{
            name: Ec.all(),
            value: Ec.pattern(/OLE_LINK/i, Ec.caseInsensitive)
        }]
    }), Wf = Zc({
        tags: [{
            name: Ec.exact("meta", Ec.caseInsensitive)
        }]
    }), Hf = Zc({
        tags: [{
            name: Ec.exact("style", Ec.caseInsensitive)
        }]
    }), qf = Zc({
        styles: [{
            name: Ec.not(Ec.pattern(/width|height|list-style-type/, Ec.caseInsensitive)),
            condition: function(t) {
                return !Oi(t, "ephox-limbo-transform")
            }
        }, {
            name: Ec.pattern(/width|height/, Ec.caseInsensitive),
            condition: Df.isNotImage
        }]
    }), $f = Qc({
        tags: [{
            name: Ec.exact("strong", Ec.caseInsensitive)
        }, {
            name: Ec.exact("em", Ec.caseInsensitive)
        }, {
            name: Ec.exact("b", Ec.caseInsensitive)
        }, {
            name: Ec.exact("i", Ec.caseInsensitive)
        }, {
            name: Ec.exact("u", Ec.caseInsensitive)
        }, {
            name: Ec.exact("strike", Ec.caseInsensitive)
        }, {
            name: Ec.exact("sub", Ec.caseInsensitive)
        }, {
            name: Ec.exact("sup", Ec.caseInsensitive)
        }, {
            name: Ec.exact("font", Ec.caseInsensitive)
        }]
    }), Vf = Zc({
        classes: [{
            name: Ec.not(Ec.exact("rtf-data-image", Ec.caseInsensitive))
        }]
    }), Xf = Zc({
        styles: [{
            name: Ec.pattern(yc(), Ec.caseInsensitive)
        }]
    }), Gf = Zc({
        classes: [{
            name: Ec.pattern(/mso/i, Ec.caseInsensitive)
        }]
    }), zf = Qc({
        tags: [{
            name: Ec.exact("img", Ec.caseInsensitive),
            condition: Df.isLocal
        }]
    }), Kf = Qc({
        tags: [{
            name: Ec.exact("a", Ec.caseInsensitive),
            condition: Df.hasNoAttributes
        }]
    }), Jf = Zc({
        attributes: [{
            name: Ec.exact("style", Ec.caseInsensitive),
            value: Ec.exact("", Ec.caseInsensitive),
            debug: !0
        }]
    }), Zf = Zc({
        attributes: [{
            name: Ec.exact("class", Ec.caseInsensitive),
            value: Ec.exact("", Ec.caseInsensitive),
            debug: !0
        }]
    }), Qf = Qc({
        tags: [{
            name: Ec.pattern(bc(), Ec.caseInsensitive),
            condition: (pf = Df.hasContent,
            function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t[e] = arguments[e];
                return !pf.apply(null, t)
            }
            )
        }]
    }), tl = Qc({
        tags: [{
            name: Ec.exact("p", Ec.caseInsensitive),
            condition: (gf = "li",
            function(t) {
                return Oo(t).exists(function(t) {
                    return Fe(t) === gf && 1 === ko(t).length
                })
            }
            )
        }]
    }), el = ts({
        tags: [{
            name: Ec.exact("p", Ec.caseInsensitive),
            mutate: kf.addBrTag
        }]
    }), nl = ts({
        tags: [{
            name: Ec.pattern(/ol|ul/, Ec.caseInsensitive),
            mutate: kf.properlyNest
        }]
    }), rl = ts({
        tags: [{
            name: Ec.exact("b", Ec.caseInsensitive),
            mutate: y(kf.changeTag, "strong")
        }, {
            name: Ec.exact("i", Ec.caseInsensitive),
            mutate: y(kf.changeTag, "em")
        }, {
            name: Ec.exact("u", Ec.caseInsensitive),
            mutate: function(t) {
                var e = kf.changeTag("span", t);
                Li(e, "ephox-limbo-transform"),
                tu(e, "text-decoration", "underline")
            }
        }, {
            name: Ec.exact("s", Ec.caseInsensitive),
            mutate: y(kf.changeTag, "strike")
        }, {
            name: Ec.exact("font", Ec.caseInsensitive),
            mutate: kf.fontToSpan,
            debug: !0
        }]
    }), ol = Zc({
        classes: [{
            name: Ec.exact("ephox-limbo-transform", Ec.caseInsensitive)
        }]
    }), il = Zc({
        tags: [{
            name: Ec.exact("br", Ec.caseInsensitive),
            condition: Pi("Apple-interchange-newline")
        }]
    }), al = {
        unwrapWordTags: Ff,
        removeWordAttributes: Bf,
        removeGoogleDocsId: jf,
        parseLists: Uf,
        removeExcess: Yf,
        removeMetaTags: Wf,
        removeStyleTags: Hf,
        cleanStyles: qf,
        cleanInlineStyleElements: $f,
        cleanClasses: Vf,
        cleanupBrowserCruft: Zc({
            styles: [{
                name: Ec.pattern(/^-/, Ec.caseInsensitive)
            }, {
                name: Ec.all(),
                value: Ec.exact("initial", Ec.caseInsensitive)
            }, {
                name: Ec.exact("background-color", Ec.caseInsensitive),
                value: Ec.exact("transparent", Ec.caseInsensitive)
            }, {
                name: Ec.exact("font-style", Ec.caseInsensitive),
                value: Ec.exact("normal", Ec.caseInsensitive)
            }, {
                name: Ec.pattern(/font-variant.*/, Ec.caseInsensitive)
            }, {
                name: Ec.exact("letter-spacing", Ec.caseInsensitive)
            }, {
                name: Ec.exact("font-weight", Ec.caseInsensitive),
                value: Ec.pattern(/400|normal/, Ec.caseInsensitive)
            }, {
                name: Ec.exact("orphans", Ec.caseInsensitive)
            }, {
                name: Ec.exact("text-decoration", Ec.caseInsensitive),
                value: Ec.exact("none", Ec.caseInsensitive)
            }, {
                name: Ec.exact("text-size-adjust", Ec.caseInsensitive)
            }, {
                name: Ec.exact("text-indent", Ec.caseInsensitive),
                value: Ec.exact("0px", Ec.caseInsensitive)
            }, {
                name: Ec.exact("text-transform", Ec.caseInsensitive),
                value: Ec.exact("none", Ec.caseInsensitive)
            }, {
                name: Ec.exact("white-space", Ec.caseInsensitive),
                value: Ec.exact("normal", Ec.caseInsensitive)
            }, {
                name: Ec.exact("widows", Ec.caseInsensitive)
            }, {
                name: Ec.exact("word-spacing", Ec.caseInsensitive),
                value: Ec.exact("0px", Ec.caseInsensitive)
            }, {
                name: Ec.exact("text-align", Ec.caseInsensitive),
                value: Ec.pattern(/start|end/, Ec.caseInsensitive)
            }, {
                name: Ec.exact("font-weight", Ec.caseInsensitive),
                value: Ec.pattern(/700|bold/, Ec.caseInsensitive),
                condition: function(t) {
                    return /^h\d$/.test(Fe(t))
                }
            }]
        }),
        cleanupBrowserTags: il,
        unwrapConvertedSpace: (hf = (vf = function(t, n) {
            return function(e) {
                return t(e).filter(function(t) {
                    return We(e) && n(ff(t), " ")
                }).isSome()
            }
        }
        )(Do, xe),
        yf = vf(Po, Te),
        ts({
            tags: [{
                name: Ec.exact("span", Ec.caseInsensitive),
                condition: Pi("Apple-converted-space"),
                mutate: function(t) {
                    "\xa0" === ff(t) && (hf(t) || yf(t) ? Ra(t) : (Zi(t, an.fromText(" ")),
                    Ma(t)))
                }
            }]
        })),
        mergeStyles: Xf,
        mergeClasses: Gf,
        removeLocalImages: zf,
        removeVacantLinks: Kf,
        removeEmptyStyle: Jf,
        removeEmptyClass: Zf,
        pruneInlineTags: Qf,
        unwrapSingleParagraphsInlists: tl,
        addPlaceholders: el,
        nestedListFixes: nl,
        inlineTagFixes: rl,
        cleanupFlags: ol,
        distillAnchorsFromLocalLinks: (bf = /^file:\/\/\/[^#]+(#[^#]+)$/,
        ts({
            tags: [{
                name: Ec.exact("a", Ec.caseInsensitive),
                condition: function(t) {
                    var e = Ve(t, "href");
                    return !!e && bf.test(e)
                },
                mutate: function(t) {
                    var e = Ve(t, "href");
                    qe(t, "href", e.replace(bf, "$1"))
                }
            }]
        })),
        removeLocalLinks: Zc({
            attributes: [{
                name: Ec.exact("href", Ec.caseInsensitive),
                value: Ec.starts("file:///", Ec.caseInsensitive),
                debug: !0
            }]
        }),
        replaceClipboardChangedUrls: ts({
            tags: [(Tf = function(t, n, r) {
                return {
                    name: Ec.exact(t, Ec.caseInsensitive),
                    condition: function(t) {
                        return Xe(t, n)
                    },
                    mutate: function(t) {
                        var e = Ve(t, n);
                        qe(t, r, e),
                        Ge(t, n)
                    }
                }
            }
            )("a", "data-ephox-href", "href"), Tf("img", "data-ephox-src", "src")]
        }),
        removeFragmentComments: function(a) {
            var u = ["table", "thead", "tbody", "tfoot", "th", "tr", "td", "ul", "ol", "li"]
              , t = Fo(a, Be)
              , e = J(t, function(t) {
                return be(Rf(t), "StartFragment")
            })
              , n = J(t, function(t) {
                return be(Rf(t), "EndFragment")
            });
            e.each(function(i) {
                n.each(function(t) {
                    for (var e, n = i, r = [], o = (e = $u(i, 0, t, 0),
                    an.fromDom(e.commonAncestorContainer)); void 0 !== o && !No(o, a); )
                        q(u, Fe(o)) ? n = o : r.push(o),
                        o = Oo(o).getOr(void 0);
                    X(r, Ra),
                    X(Ao(n), Ma)
                }),
                Ma(i)
            }),
            n.each(Ma)
        },
        none: L
    }, ul = function(t) {
        return t.browser.isIE() && 11 <= t.browser.version.major
    }, cl = function(i, a) {
        return os(function(t, e) {
            var r, o, n = (r = e,
            o = a,
            i(an.fromDom(r.getNode())).fold(function() {
                return [r]
            }, function(t) {
                var e = r.type() === Xc.END_ELEMENT_TYPE
                  , n = [Xc.token(t.dom(), e)];
                return !e && o && n.push(Xc.token(t.dom(), !0)),
                n
            }));
            X(n, t.emit)
        }, L)
    }, sl = function(t, e, n) {
        var r, o, i, a, u, c, s, f, l, d, m, p, g, v = (r = t,
        i = (o = n).browser.isFirefox() || o.browser.isEdge(),
        a = i ? hc.local : hc.vshape,
        u = !i,
        c = ul(o) ? al.none : es([cl(a, u)]),
        {
            annotate: [r ? c : al.none],
            local: [i ? al.none : al.removeLocalImages]
        });
        return et([v.local, (p = t,
        g = n,
        ul(g) || !p ? [] : [_f.preprocess]), v.annotate, [al.inlineTagFixes], function(t, e, n) {
            if (!t)
                return [al.none];
            var r = [al.unwrapWordTags]
              , o = ul(n) ? [] : al.parseLists;
            return r.concat(o).concat([al.removeWordAttributes])
        }(t, 0, n), [al.removeGoogleDocsId], [al.nestedListFixes], [al.removeExcess], [al.removeMetaTags], (m = e,
        m ? [al.mergeStyles, al.mergeClasses] : [al.cleanStyles, al.cleanInlineStyleElements, al.cleanClasses]), [al.distillAnchorsFromLocalLinks, al.removeLocalLinks, al.removeVacantLinks, al.replaceClipboardChangedUrls], [al.removeEmptyStyle], [al.removeEmptyClass], [al.pruneInlineTags], [al.cleanupBrowserTags], (l = t,
        d = e,
        !l && d ? [al.cleanupBrowserCruft] : []), [al.unwrapConvertedSpace], [al.addPlaceholders], (s = t,
        f = n,
        ul(f) && s ? [al.unwrapSingleParagraphsInlists] : []), [al.cleanupFlags], [al.removeStyleTags]])
    }, fl = ["body", "p", "div", "article", "aside", "figcaption", "figure", "footer", "header", "nav", "section", "ol", "ul", "li", "table", "thead", "tbody", "tfoot", "caption", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "address"];
    var ll = function(t) {
        return e = t,
        n = v(0),
        r = v(0),
        o = k.none(),
        {
            term: function() {
                return new RegExp(e,o.getOr("g"))
            },
            prefix: n,
            suffix: r
        };
        var e, n, r, o
    }
      , dl = function(t, e) {
        return Z(t, function(t) {
            return t.start() === e
        })
    }
      , ml = function(t, e, n) {
        var r, o, i = n(t, e);
        return r = i,
        o = t.start(),
        V(r, function(t) {
            return Ho({}, t, {
                start: v(t.start() + o),
                finish: v(t.finish() + o)
            })
        })
    }
      , pl = function(t, n, e) {
        return void 0 === e && (e = 0),
        K(t, function(e, t) {
            return n(t, e.len).fold(v(e), function(t) {
                return {
                    len: t.finish(),
                    list: e.list.concat([t])
                }
            })
        }, {
            len: e,
            list: []
        }).list
    }
      , gl = function(t, e, n) {
        return 0 === e.length ? t : nt(t, function(r) {
            var t = nt(e, function(t) {
                return (n = t) >= (e = r).start() && n <= e.finish() ? [t - r.start()] : [];
                var e, n
            });
            return 0 < t.length ? ml(r, t, n) : [r]
        })
    }
      , vl = function(o, t, i) {
        var e = dl(o, t)
          , a = dl(o, i);
        return e.bind(function(t) {
            var e, n, r = a.getOr((n = i,
            (e = o)[e.length - 1] && e[e.length - 1].finish() === n ? e.length + 1 : -1));
            return -1 < r ? k.some(o.slice(t, r)) : k.none()
        }).getOr([])
    }
      , hl = function(n, t) {
        var e, r, o = nt(t, function(e) {
            var t = function(t, e) {
                for (var n = e.term(), r = [], o = n.exec(t); o; ) {
                    var i = o.index + e.prefix(o)
                      , a = o[0].length - e.prefix(o) - e.suffix(o);
                    r.push({
                        start: v(i),
                        finish: v(i + a)
                    }),
                    n.lastIndex = i + a,
                    o = n.exec(t)
                }
                return r
            }(n, e.pattern());
            return V(t, function(t) {
                return Ho({}, e, t)
            })
        });
        return e = o,
        (r = Array.prototype.slice.call(e, 0)).sort(function(t, e) {
            return t.start() < e.start() ? -1 : e.start() < t.start() ? 1 : 0
        }),
        r
    }
      , yl = (Jr("word", "pattern"),
    Jr("element", "offset"),
    Jr("element", "deltaOffset"),
    Jr("element", "start", "finish"))
      , bl = (Jr("begin", "end"),
    Jr("element", "text"),
    lt([{
        include: ["item"]
    }, {
        excludeWith: ["item"]
    }, {
        excludeWithout: ["item"]
    }]))
      , Tl = {
        include: bl.include,
        excludeWith: bl.excludeWith,
        excludeWithout: bl.excludeWithout,
        cata: function(t, e, n, r) {
            return t.fold(e, n, r)
        }
    }
      , xl = function(t, n) {
        var r = []
          , o = [];
        return X(t, function(t) {
            var e = n(t);
            Tl.cata(e, function() {
                o.push(t)
            }, function() {
                0 < o.length && r.push(o),
                r.push([t]),
                o = []
            }, function() {
                0 < o.length && r.push(o),
                o = []
            })
        }),
        0 < o.length && r.push(o),
        r
    }
      , El = lt([{
        boundary: ["item", "universe"]
    }, {
        empty: ["item", "universe"]
    }, {
        text: ["item", "universe"]
    }])
      , wl = S
      , Il = _
      , Sl = v(0)
      , Nl = v(1)
      , Ll = function(t) {
        return Ho({}, t, {
            isBoundary: function() {
                return t.fold(Il, wl, wl)
            },
            toText: function() {
                return t.fold(k.none, k.none, function(t) {
                    return k.some(t)
                })
            },
            is: function(n) {
                return t.fold(wl, wl, function(t, e) {
                    return e.eq(t, n)
                })
            },
            len: function() {
                return t.fold(Sl, Nl, function(t, e) {
                    return e.property().getText(t).length
                })
            }
        })
    }
      , _l = {
        text: g(Ll, El.text),
        boundary: g(Ll, El.boundary),
        empty: g(Ll, El.empty),
        cata: function(t, e, n, r) {
            return t.fold(e, n, r)
        }
    }
      , Ol = function(e, t, n) {
        if (e.property().isText(t))
            return [_l.text(t, e)];
        if (e.property().isEmptyTag(t))
            return [_l.empty(t, e)];
        if (e.property().isElement(t)) {
            var r = e.property().children(t)
              , o = e.property().isBoundary(t) ? [_l.boundary(t, e)] : []
              , i = void 0 !== n && n(t) ? [] : nt(r, function(t) {
                return Ol(e, t, n)
            });
            return o.concat(i).concat(o)
        }
        return []
    }
      , Cl = Ol
      , Dl = function(e, t, n) {
        var r = nt(t, function(t) {
            return Cl(e, t, n)
        })
          , o = xl(r, function(t) {
            return t.match({
                boundary: function() {
                    return Tl.excludeWithout(t)
                },
                empty: function() {
                    return Tl.excludeWith(t)
                },
                text: function() {
                    return Tl.include(t)
                }
            })
        });
        return z(o, function(t) {
            return 0 < t.length
        })
    }
      , Pl = function(r, t) {
        if (0 === t.length)
            return [r];
        var e = K(t, function(t, e) {
            if (0 === e)
                return t;
            var n = r.substring(t.prev, e);
            return {
                prev: e,
                values: t.values.concat([n])
            }
        }, {
            prev: 0,
            values: []
        })
          , n = t[t.length - 1];
        return n < r.length ? e.values.concat(r.substring(n)) : e.values
    }
      , Al = function(o, t, e) {
        var n = nt(e, function(t) {
            return [t.start(), t.finish()]
        })
          , i = gl(t, n, function(t, e) {
            return function(o, t, e) {
                var n = o.property().getText(t)
                  , r = z(Pl(n, e), function(t) {
                    return 0 < t.length
                });
                if (r.length <= 1)
                    return [yl(t, 0, n.length)];
                o.property().setText(t, r[0]);
                var i = pl(r.slice(1), function(t, e) {
                    var n = o.create().text(t)
                      , r = yl(n, e, e + t.length);
                    return k.some(r)
                }, r[0].length)
                  , a = V(i, function(t) {
                    return t.element()
                });
                return o.insert().afterAll(t, a),
                [yl(t, 0, r[0].length)].concat(i)
            }(o, t.element(), e)
        });
        return V(e, function(t) {
            var e = vl(i, t.start(), t.finish())
              , n = V(e, function(t) {
                return t.element()
            })
              , r = V(n, o.property().getText).join("");
            return {
                elements: function() {
                    return n
                },
                word: t.word,
                exact: function() {
                    return r
                }
            }
        })
    }
      , kl = function(a, t, u, e) {
        var n = Dl(a, t, e);
        return nt(n, function(t) {
            var r, e = nt(t, function(t) {
                return t.fold(v([]), v([]), function(t) {
                    return [t]
                })
            }), n = V(e, a.property().getText).join(""), o = hl(n, u), i = (r = a,
            pl(e, function(t, e) {
                var n = e + r.property().getText(t).length;
                return k.from(yl(t, e, n))
            }));
            return Al(a, i, o)
        })
    }
      , Ml = {
        up: v({
            selector: Ri,
            closest: ji,
            predicate: Ai,
            all: Co
        }),
        down: v({
            selector: jo,
            predicate: Fo
        }),
        styles: v({
            get: nu,
            getRaw: ou,
            set: tu,
            remove: iu
        }),
        attrs: v({
            get: Ve,
            set: qe,
            remove: Ge,
            copyTo: function(t, e) {
                var n = K(t.dom().attributes, function(t, e) {
                    return t[e.name] = e.value,
                    t
                }, {});
                $e(e, n)
            }
        }),
        insert: v({
            before: Zi,
            after: Qi,
            afterAll: ra,
            append: ea,
            appendAll: oa,
            prepend: ta,
            wrap: na
        }),
        remove: v({
            unwrap: Ra,
            remove: Ma
        }),
        create: v({
            nu: an.fromTag,
            clone: function(t) {
                return an.fromDom(t.dom().cloneNode(!1))
            },
            text: an.fromText
        }),
        query: v({
            comparePosition: function(t, e) {
                return t.dom().compareDocumentPosition(e.dom())
            },
            prevSibling: Do,
            nextSibling: Po
        }),
        property: v({
            children: ko,
            name: Fe,
            parent: Oo,
            document: function(t) {
                return t.dom().ownerDocument
            },
            isText: We,
            isComment: Be,
            isElement: Ye,
            getText: wu,
            setText: Iu,
            isBoundary: function(t) {
                return !!Ye(t) && ("body" === Fe(t) || q(fl, Fe(t)))
            },
            isEmptyTag: function(t) {
                return !!Ye(t) && q(["br", "img", "hr", "input"], Fe(t))
            }
        }),
        eq: No,
        is: Lo
    }
      , Rl = /(?:(?:[A-Za-z]{3,9}:(?:\/\/))(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*|(?:www\.|[-;:&=+$,.\w]+@)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*)(?::[0-9]+)?(?:\/[-+~=%.()\/\w]*)?(?:\?(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?(?:#(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?/g.source
      , Fl = function(t) {
        var e, n = Jr("word", "pattern")("__INTERNAL__", ll(Rl));
        return kl(Ml, t, [n], e)
    }
      , jl = function(t) {
        return !ji(t, "a", e).isSome();
        var e
    }
      , Ul = function(t) {
        var e = t.indexOf("://");
        return 3 <= e && e <= 9
    }
      , Bl = {
        links: function(t) {
            var e = Fl(t);
            X(e, function(t) {
                var n, e = t.exact();
                (e.indexOf("@") < 0 || Ul(e)) && (n = t.elements(),
                k.from(n[0]).filter(jl).map(function(t) {
                    var e = an.fromTag("a");
                    return Zi(t, e),
                    oa(e, n),
                    qe(e, "href", ff(e)),
                    e
                }))
            })
        },
        position: function(t) {
            X(t, function(t) {
                Ye(t) && ou(t, "position").isSome() && iu(t, "position")
            })
        },
        list: function(t) {
            var e = z(t, function(t) {
                return "li" === Fe(t)
            });
            if (0 < e.length) {
                var n = Ao(e[0])
                  , r = an.fromTag("ul");
                if (Zi(t[0], r),
                0 < n.length) {
                    var o = an.fromTag("li");
                    ea(r, o),
                    oa(o, n)
                }
                oa(r, e)
            }
        }
    }
      , Yl = function(t) {
        var e = ko(t);
        X([Bl.links, Bl.position, Bl.list], function(t) {
            t(e)
        })
    }
      , Wl = function(t, e, n, r, o) {
        Yl(n);
        var i = uu(n)
          , a = sl(o, r, e);
        return rs(t, i, a)
    }
      , Hl = Yl
      , ql = function(t, e) {
        var n = uu(e);
        return rs(t, n, [al.removeMetaTags, al.replaceClipboardChangedUrls])
    }
      , $l = function(t, e) {
        var n = uu(e);
        return rs(t, n, [al.removeFragmentComments])
    }
      , Vl = {
        disabled: function() {
            return {
                discriminator: "disabled",
                data: {}
            }
        },
        fromClipboard: function(t) {
            return {
                discriminator: "fromClipboard",
                data: {
                    rtf: t
                }
            }
        }
    }
      , Xl = ot(Vl)
      , Gl = Vl.disabled
      , zl = Vl.fromClipboard
      , Kl = function(t, e) {
        var n = new RegExp(e,"i");
        return bu(t, function(t) {
            return null !== t.match(n) ? k.some({
                type: t,
                flavor: e
            }) : k.none()
        })
    }
      , Jl = {
        isValidData: function(t) {
            return void 0 !== t && void 0 !== t.types && null !== t.types
        },
        getPreferredFlavor: function(t, e) {
            return bu(t, function(t) {
                return Kl(e, t)
            })
        },
        getFlavor: Kl
    }
      , Zl = function(e) {
        return function(t) {
            return {
                discriminator: e,
                data: t
            }
        }
    }
      , Ql = function(e) {
        return function(t) {
            return t.discriminator === e ? k.some(t.data) : k.none()
        }
    }
      , td = Zl("event")
      , ed = Zl("html")
      , nd = Zl("images")
      , rd = Zl("word")
      , od = Zl("text")
      , id = Zl("void")
      , ad = Ql("event")
      , ud = Ql("html")
      , cd = Ql("images")
      , sd = Ql("word")
      , fd = Ql("text")
      , ld = Oe.detect().browser
      , dd = !(ld.isIE() || ld.isEdge() && ld.version.major < 16)
      , md = ["^image/", "file"]
      , pd = function(t) {
        return be(e = t, "<html") && (be(e, 'xmlns:o="urn:schemas-microsoft-com:office:office"') || be(e, 'xmlns:x="urn:schemas-microsoft-com:office:excel"')) || be(t, 'meta name="ProgId" content="Word.Document"');
        var e
    }
      , gd = function(t) {
        return be(t, "<meta") && be(t, 'id="docs-internal-guid')
    }
      , vd = function(t) {
        return 0 < t.length
    }
      , hd = function(e, t) {
        return Jl.getFlavor(e.types, t).map(function(t) {
            return e.getData(t.type)
        }).filter(vd)
    }
      , yd = function(t) {
        return hd(t, "html")
    }
      , bd = function(t) {
        return yd(t).filter(gd)
    }
      , Td = function(t) {
        return dd ? k.some(t.clipboardData).filter(Jl.isValidData) : k.none()
    }
      , xd = function(t) {
        var e = an.fromTag("div");
        cu(e, t);
        var n = $l(_o(e), e)
          , r = an.fromTag("div");
        return cu(r, n),
        ed({
            container: r
        })
    }
      , Ed = function(t) {
        var e = function(r) {
            return void 0 === r.items ? k.none() : Jl.getPreferredFlavor(md, r.types).map(function(t) {
                for (var e = [], n = 0; n < r.items.length; n++)
                    e.push(r.items[n]);
                return nd({
                    images: e
                })
            })
        }
          , r = function(e) {
            return bu(e.types, function(t) {
                return "text/plain" === t ? k.some(e.getData(t)).map(function(t) {
                    return od({
                        text: t
                    })
                }) : k.none()
            })
        };
        return {
            getWordData: function() {
                return Td(t).bind(function(n) {
                    return (t = n,
                    yd(t).filter(pd)).map(function(t) {
                        var e = hd(n, "rtf");
                        return rd({
                            html: t,
                            rtf: e.fold(function() {
                                return Gl()
                            }, function(t) {
                                return zl(t)
                            })
                        })
                    });
                    var t
                })
            },
            getGoogleDocsData: function() {
                return Td(t).bind(bd).map(xd)
            },
            getImage: function() {
                return Td(t).bind(e)
            },
            getText: function() {
                return Td(t).fold(function() {
                    var t = l.window.clipboardData;
                    return void 0 !== t ? k.some(od({
                        text: t.getData("text")
                    })) : k.none()
                }, r)
            },
            getHtml: function() {
                return Td(t).bind(yd).map(xd)
            },
            getOnlyText: function() {
                return Td(t).bind(function(t) {
                    return e = t.types,
                    n = "text/plain",
                    1 === e.length && e[0] === n ? r(t) : k.none();
                    var e, n
                })
            },
            getNative: function() {
                return td({
                    nativeEvent: t
                })
            },
            getVoid: function() {
                return id({})
            }
        }
    }
      , wd = function(t) {
        return {
            getWordData: function() {
                return k.some(rd({
                    html: t,
                    rtf: Gl()
                }))
            },
            getGoogleDocsData: k.none,
            getImage: k.none,
            getHtml: k.none,
            getText: k.none,
            getNative: I("There is no native event"),
            getOnlyText: k.none,
            getVoid: I("There is no paste event")
        }
    }
      , Id = function(t) {
        return {
            getWordData: k.none,
            getGoogleDocsData: k.none,
            getImage: k.none,
            getHtml: k.none,
            getText: function() {
                return k.some(od({
                    text: t
                }))
            },
            getNative: I("There is no native event"),
            getOnlyText: k.none,
            getVoid: I("There is no paste event")
        }
    }
      , Sd = function(t) {
        return V(t, function(t) {
            return t.asset()
        })
    }
      , Nd = function(i, a) {
        var u = ao.create({
            cancel: io([]),
            error: io(["message"]),
            insert: io(["elements", "assets", "correlated", "isInternal"])
        })
          , r = function(t, e, n) {
            var r = dc(i, a, t);
            r.capture() && n();
            var o = V(r.steps(), function(t) {
                return t(e)
            });
            mc(o, r.input()).get(function(t) {
                var r = t.bundle().isInternal().getOr(!1);
                ec.cata(t.response(), function(t) {
                    u.trigger.error(t)
                }, function(t, e) {
                    u.trigger.insert(t, Sd(e), e, r)
                }, function() {
                    u.trigger.cancel()
                }, function(t, e, n) {
                    u.trigger.insert(t, Sd(e), e, r),
                    u.trigger.error(n)
                })
            })
        }
          , o = Ya.tap(function(n) {
            zu(n.target.ownerDocument.defaultView).each(function(t) {
                if (!Oi(t.start(), Ja.bin())) {
                    var e = Ed(n);
                    $a.willBlock() && (o.control.block(),
                    n.preventDefault()),
                    r(e, o.control, function() {
                        n.preventDefault()
                    })
                }
            })
        });
        return {
            paste: o.instance,
            pasteCustom: function(t, e) {
                void 0 === e && (e = L);
                var n = Ya.tap(L);
                r(t, n.control, e)
            },
            isBlocked: o.control.isBlocked,
            destroy: L,
            events: u.registry
        }
    }
      , Ld = lt([{
        blob: ["id", "imageresult", "objurl"]
    }, {
        url: ["id", "url", "raw"]
    }])
      , _d = Ho({
        cata: function(t, e, n) {
            return t.fold(e, n)
        }
    }, Ld)
      , Od = function(t) {
        var e = De(t);
        return Cd(t, e)
    }
      , Cd = function(i, a) {
        return Vt.nu(function(o) {
            At(i).then(function(t) {
                var e = Ut(i, t)
                  , n = Jt("image")
                  , r = _d.blob(n, e, a);
                o(r)
            })
        })
    }
      , Dd = function(t) {
        return zt(t, Od)
    }
      , Pd = function() {
        var e = k.none();
        return {
            convert: function(t) {
                e = function(n) {
                    var t, e = ht("window.clipboardData.files"), r = void 0 !== (t = n).convertURL ? t.convertURL : void 0 !== t.msConvertURL ? t.msConvertURL : void 0;
                    if (void 0 !== e && void 0 !== r && 0 < e.length) {
                        var o = zt(e, function(t) {
                            var e = De(t);
                            return r.apply(n, [t, "specified", e]),
                            Cd(t, e)
                        });
                        return k.some(o)
                    }
                    return k.none()
                }(t)
            },
            listen: function(t) {
                return e.fold(function() {
                    return Vt.nu(function(t) {
                        t([])
                    })
                }, function(t) {
                    return t
                }).get(t)
            },
            clear: function() {
                e = k.none()
            }
        }
    }
      , Ad = Jr("asset", "image")
      , kd = function(t, r) {
        return _d.cata(t, function(t, e, n) {
            return qe(r, "src", n),
            !0
        }, S)
    }
      , Md = function(t, r) {
        var o = [];
        return X(t, function(t, e) {
            var n = r[e];
            kd(t, n) && o.push(Ad(t, n))
        }),
        o
    }
      , Rd = function(t) {
        return zt(t, function(u) {
            return Vt.nu(function(i) {
                var t, a = u.dom();
                (t = a,
                Rt(t)).then(function(o) {
                    o.toBlob().then(function(t) {
                        var e = Te(a.src, "blob:") ? a.src : l.URL.createObjectURL(t)
                          , n = Jt("image")
                          , r = _d.blob(n, o, e);
                        i(Ad(r, u))
                    })
                })
            })
        })
    }
      , Fd = Jr("futureAsset", "image")
      , jd = function(e, t) {
        return (n = t,
        _t(n)).map(function(t) {
            return Fd(Od(t), e)
        });
        var n
    }
      , Ud = function(t) {
        var e = an.fromTag("div");
        return oa(e, t),
        jo(e, "img[src]")
    }
      , Bd = function(t) {
        return 0 === t.indexOf("data:") && -1 < t.indexOf("base64")
    }
      , Yd = function(t) {
        return 0 === t.indexOf("blob:")
    }
      , Wd = function(t) {
        var e = Ve(t, "src");
        return Bd(e) || Yd(e)
    }
      , Hd = function(t) {
        return nt(Ud(t), function(t) {
            var n, e, r = Ve(t, "src");
            return Bd(r) ? jd(t, r).toArray() : Yd(r) ? (n = t,
            e = r,
            kt(e).map(function(t) {
                var e = Vt.nu(function(e) {
                    t.then(function(t) {
                        Od(t).get(e)
                    })
                });
                return Fd(e, n)
            })).toArray() : []
        })
    };
    function qd(f) {
        return function(t, s) {
            return fc(function(a) {
                var u = function() {
                    uc(a, {
                        response: s.response(),
                        bundle: s.bundle()
                    })
                }
                  , c = function(t) {
                    var e, n, r = z(Ud(t), Wd);
                    X(r, Ma),
                    uc(a, {
                        response: 0 < r.length ? (e = t,
                        n = z(e, function(t) {
                            return "img" !== Fe(t) || !Wd(t)
                        }),
                        ec.incomplete(n, [], "errors.local.images.disallowed")) : s.response(),
                        bundle: s.bundle()
                    })
                }
                  , t = function(t, e) {
                    var n, r, o, i;
                    !1 === f.allowLocalImages ? c(t) : 0 === e.length ? (r = Hd(n = t),
                    o = zt(r, function(t) {
                        return t.futureAsset()
                    }),
                    i = V(r, function(t) {
                        return t.image()
                    }),
                    o.get(function(t) {
                        var e = Md(t, i);
                        uc(a, {
                            response: ec.paste(n, e),
                            bundle: s.bundle()
                        })
                    })) : u()
                };
                ec.cata(s.response(), u, t, u, t)
            })
        }
    }
    var $d = function(t) {
        return t.officeStyles().getOr(!0)
    }
      , Vd = function(t) {
        return t.htmlStyles().getOr(!1)
    }
      , Xd = function(t) {
        return t.isWord().getOr(!1)
    }
      , Gd = {
        proxyBin: function(n) {
            return {
                handle: function(t, e) {
                    return n.proxyBin().fold(function() {
                        return l.console.error(t),
                        ac({
                            response: ec.cancel(),
                            bundle: oc({})
                        })
                    }, e)
                }
            }
        },
        backgroundAssets: function(t) {
            return Vt.nu(function(e) {
                t.backgroundAssets().fold(function() {
                    e([])
                }, function(t) {
                    t.listen(e)
                })
            })
        },
        merging: function(t) {
            var e = Xd(t);
            return e && $d(t) || !e && Vd(t)
        },
        mergeOffice: $d,
        mergeNormal: Vd,
        isWord: Xd,
        isGoogleDocs: function(t) {
            return t.isGoogleDocs().getOr(!1)
        },
        isInternal: function(t) {
            return t.isInternal().getOr(!1)
        }
    }
      , zd = {
        resolve: so("ephox-cement").resolve
    };
    function Kd(s, r) {
        var f = r.translations
          , l = function(t, e, n) {
            n(k.some(mt(e, {
                officeStyles: t,
                htmlStyles: t
            })))
        };
        return {
            get: function(t, e) {
                var n = r[t ? "officeStyles" : "htmlStyles"];
                "clean" === n ? l(!1, r, e) : "merge" === n ? l(!0, r, e) : function(t, e) {
                    var n = an.fromTag("div");
                    Li(n, zd.resolve("styles-dialog-content"));
                    var r = an.fromTag("p")
                      , o = Ji(f("cement.dialog.paste.instructions"));
                    oa(r, o),
                    ea(n, r);
                    var i = {
                        text: f("cement.dialog.paste.clean"),
                        tabindex: 0,
                        className: zd.resolve("clean-styles"),
                        click: function() {
                            u(),
                            l(!1, t, e)
                        }
                    }
                      , a = {
                        text: f("cement.dialog.paste.merge"),
                        tabindex: 1,
                        className: zd.resolve("merge-styles"),
                        click: function() {
                            u(),
                            l(!0, t, e)
                        }
                    }
                      , u = function() {
                        c.destroy()
                    }
                      , c = s(!0);
                    c.setTitle(f("cement.dialog.paste.title")),
                    c.setContent(n),
                    c.setButtons([i, a]),
                    c.events.close.bind(function() {
                        e(k.none()),
                        u()
                    }),
                    c.show()
                }(r, e)
            },
            destroy: L
        }
    }
    var Jd = function(t, e) {
        var i = Kd(t, e);
        return function(t, r) {
            var e = r.bundle()
              , o = r.response();
            return fc(function(n) {
                i.get(Gd.isWord(e), function(t) {
                    var e = t.fold(function() {
                        return {
                            response: ec.cancel(),
                            bundle: r.bundle()
                        }
                    }, function(t) {
                        return {
                            response: o,
                            bundle: oc({
                                officeStyles: t.officeStyles,
                                htmlStyles: t.htmlStyles
                            })
                        }
                    });
                    uc(n, e)
                })
            })
        }
    }
      , Zd = Jd
      , Qd = function(r, o) {
        return function(t, e) {
            var n = function(t) {
                return ac({
                    response: e.response(),
                    bundle: oc({
                        officeStyles: t,
                        htmlStyles: t
                    })
                })
            };
            return Gd.isInternal(e.bundle()) ? n(!0) : Gd.isGoogleDocs(e.bundle()) ? n(!1) : Jd(r, o)(t, e)
        }
    }
      , tm = function(t) {
        return function(t) {
            var e = t.dom();
            try {
                var n = e.contentWindow ? e.contentWindow.document : e.contentDocument;
                return null != n ? k.some(an.fromDom(n)) : k.none()
            } catch (t) {
                return l.console.log("Error reading iframe: ", e),
                l.console.log("Error was: " + t),
                k.none()
            }
        }(t).fold(function() {
            return t
        }, function(t) {
            return t
        })
    }
      , em = function(t, e) {
        if (!vo(t))
            throw "Internal error: attempted to write to an iframe that is not in the DOM";
        var n = tm(t).dom();
        n.open("text/html", "replace"),
        n.writeln(e),
        n.close()
    };
    var nm, rm, om, im = function(t) {
        var e = t.dom().styleSheets;
        return Array.prototype.slice.call(e)
    }, am = function(t) {
        var e = t.cssRules;
        return nt(e, function(t) {
            return t.type === l.CSSRule.IMPORT_RULE ? am(t.styleSheet) : t.type === l.CSSRule.STYLE_RULE ? [function(t) {
                var e = t.selectorText
                  , n = t.style.cssText;
                if (void 0 === n)
                    throw new Error("WARNING: Browser does not support cssText property");
                return {
                    selector: e,
                    style: n,
                    raw: t.style
                }
            }(t)] : []
        })
    }, um = function(t) {
        return nt(t, am)
    }, cm = {}, sm = {
        exports: cm
    };
    rm = cm,
    om = sm,
    nm = void 0,
    function(t) {
        "object" == typeof rm && void 0 !== om ? om.exports = t() : "function" == typeof nm && nm.amd ? nm([], t) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).EphoxContactWrapper = t()
    }(function() {
        return function i(a, u, c) {
            function s(e, t) {
                if (!u[e]) {
                    if (!a[e]) {
                        var n = !1;
                        if (!t && n)
                            return n(e, !0);
                        if (f)
                            return f(e, !0);
                        var r = new Error("Cannot find module '" + e + "'");
                        throw r.code = "MODULE_NOT_FOUND",
                        r
                    }
                    var o = u[e] = {
                        exports: {}
                    };
                    a[e][0].call(o.exports, function(t) {
                        return s(a[e][1][t] || t)
                    }, o, o.exports, i, a, u, c)
                }
                return u[e].exports
            }
            for (var f = !1, t = 0; t < c.length; t++)
                s(c[t]);
            return s
        }({
            1: [function(t, e, n) {
                var r, a, o = (r = function(t) {
                    var e, n, r, o, i = [];
                    for (r = 0,
                    o = (e = t.split(",")).length; r < o; r += 1)
                        0 < (n = e[r]).length && i.push(a(n));
                    return i
                }
                ,
                a = function(c) {
                    var t, e, n, s = c, f = {
                        a: 0,
                        b: 0,
                        c: 0
                    }, l = [];
                    return t = function(t, e) {
                        var n, r, o, i, a, u;
                        if (t.test(s))
                            for (r = 0,
                            o = (n = s.match(t)).length; r < o; r += 1)
                                f[e] += 1,
                                i = n[r],
                                a = s.indexOf(i),
                                u = i.length,
                                l.push({
                                    selector: c.substr(a, u),
                                    type: e,
                                    index: a,
                                    length: u
                                }),
                                s = s.replace(i, Array(u + 1).join(" "))
                    }
                    ,
                    (e = function(t) {
                        var e, n, r, o;
                        if (t.test(s))
                            for (n = 0,
                            r = (e = s.match(t)).length; n < r; n += 1)
                                o = e[n],
                                s = s.replace(o, Array(o.length + 1).join("A"))
                    }
                    )(/\\[0-9A-Fa-f]{6}\s?/g),
                    e(/\\[0-9A-Fa-f]{1,5}\s/g),
                    e(/\\./g),
                    (n = /:not\(([^\)]*)\)/g).test(s) && (s = s.replace(n, "     $1 ")),
                    function() {
                        var t, e, n, r, o = /{[^]*/gm;
                        if (o.test(s))
                            for (e = 0,
                            n = (t = s.match(o)).length; e < n; e += 1)
                                r = t[e],
                                s = s.replace(r, Array(r.length + 1).join(" "))
                    }(),
                    t(/(\[[^\]]+\])/g, "b"),
                    t(/(#[^\#\s\+>~\.\[:]+)/g, "a"),
                    t(/(\.[^\s\+>~\.\[:]+)/g, "b"),
                    t(/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi, "c"),
                    t(/(:[\w-]+\([^\)]*\))/gi, "b"),
                    t(/(:[^\s\+>~\.\[:]+)/g, "b"),
                    s = (s = s.replace(/[\*\s\+>~]/g, " ")).replace(/[#\.]/g, " "),
                    t(/([^\s\+>~\.\[:]+)/g, "c"),
                    l.sort(function(t, e) {
                        return t.index - e.index
                    }),
                    {
                        selector: c,
                        specificity: "0," + f.a.toString() + "," + f.b.toString() + "," + f.c.toString(),
                        specificityArray: [0, f.a, f.b, f.c],
                        parts: l
                    }
                }
                ,
                {
                    calculate: r,
                    compare: function(t, e) {
                        var n, r, o;
                        if ("string" == typeof t) {
                            if (-1 !== t.indexOf(","))
                                throw "Invalid CSS selector";
                            n = a(t).specificityArray
                        } else {
                            if (!Array.isArray(t))
                                throw "Invalid CSS selector or specificity array";
                            if (4 !== t.filter(function(t) {
                                return "number" == typeof t
                            }).length)
                                throw "Invalid specificity array";
                            n = t
                        }
                        if ("string" == typeof e) {
                            if (-1 !== e.indexOf(","))
                                throw "Invalid CSS selector";
                            r = a(e).specificityArray
                        } else {
                            if (!Array.isArray(e))
                                throw "Invalid CSS selector or specificity array";
                            if (4 !== e.filter(function(t) {
                                return "number" == typeof t
                            }).length)
                                throw "Invalid specificity array";
                            r = e
                        }
                        for (o = 0; o < 4; o += 1) {
                            if (n[o] < r[o])
                                return -1;
                            if (n[o] > r[o])
                                return 1
                        }
                        return 0
                    }
                });
                void 0 !== n && (n.calculate = o.calculate,
                n.compare = o.compare)
            }
            , {}],
            2: [function(t, e, n) {
                var r = t("specificity");
                e.exports = {
                    boltExport: r
                }
            }
            , {
                specificity: 1
            }]
        }, {}, [2])(2)
    });
    var fm = sm.exports.boltExport
      , lm = function(e, t) {
        var n = nt(t, function(i) {
            var t = jo(e, i.selector);
            return X(t, function(t) {
                var n, r, o, e = (n = i.raw,
                r = t,
                o = {},
                X(n, function(t) {
                    if (void 0 !== n[t]) {
                        var e = r.dom().style;
                        q(e, t) || (o[t] = n[t])
                    }
                }),
                o);
                eu(t, e)
            }),
            t
        });
        X(n, function(t) {
            Ge(t, "class")
        })
    }
      , dm = function(t, e) {
        var n = function(t) {
            return -1 !== t.selector.indexOf(",")
        }
          , r = nt(z(t, n), function(e) {
            var t = e.selector.split(",");
            return V(t, function(t) {
                return {
                    selector: t.trim(),
                    raw: e.raw
                }
            })
        })
          , o = z(t, function(t) {
            return !n(t)
        }).concat(r);
        o.sort(function(t, e) {
            return fm.compare(t.selector, e.selector)
        }).reverse(),
        lm(e, o)
    }
      , mm = {
        inlineStyles: function(t, e, n) {
            var r = im(t)
              , o = um(r).map(function(t) {
                var e = t.selector;
                return {
                    selector: n.hasOwnProperty(e) ? n[e] : e,
                    raw: t.raw
                }
            });
            dm(o, e)
        },
        inlinePrefixedStyles: function(t, e, n) {
            var r = im(t)
              , o = um(r)
              , i = z(o, function(t) {
                return Te(t.selector, n)
            });
            dm(i, e)
        }
    }
      , pm = {
        inlineStyles: mm.inlineStyles,
        inlinePrefixedStyles: mm.inlinePrefixedStyles
    }
      , gm = {
        p: "p, li[data-converted-paragraph]"
    }
      , vm = L
      , hm = function(f, t) {
        var l = function(n) {
            Ge(n, "data-list-level"),
            Ge(n, "data-text-indent-alt"),
            Ge(n, "data-border-margin"),
            iu(n, "margin-left"),
            iu(n, "text-indent"),
            it(function(t) {
                var e = {}
                  , n = t.dom();
                if (Za(n))
                    for (var r = 0; r < n.style.length; r++) {
                        var o = n.style.item(r);
                        e[o] = n.style[o]
                    }
                return e
            }(n), function(t, e) {
                !e.startsWith("border") || "border-image" !== e && "none" !== t.trim() && "initial" !== t.trim() || iu(n, e)
            })
        }
          , e = jo(f, "li[data-converted-paragraph]");
        if (X(e, function(t) {
            Ge(t, "data-converted-paragraph")
        }),
        t) {
            var n = jo(f, "li");
            X(n, function(t) {
                var e, n, r, o, i, a, u = (e = f,
                n = an.fromTag("span"),
                ta(e, n),
                r = n,
                {
                    convertToPx: function(t) {
                        var e;
                        return tu(r, "margin-left", t),
                        e = nu(r, "margin-left"),
                        parseFloat(e.match(/-?\d+\.?\d*/)[0])
                    },
                    destroy: function() {
                        return Ma(r)
                    }
                }), c = (i = u,
                a = Xe(o = f, "data-tab-interval") ? Ve(o, "data-tab-interval") : "36pt",
                i.convertToPx(a)), s = ym(t, c, u).getOr({});
                l(t),
                u.destroy(),
                eu(t, s)
            });
            var r = jo(f, "ol,ul");
            X(r, function(e) {
                var t = jo(e, "li");
                ou(e, "margin-top").isNone() && k.from(t[0]).each(function(t) {
                    tu(e, "margin-top", nu(t, "margin-top"))
                }),
                ou(e, "margin-bottom").isNone() && k.from(t[t.length - 1]).each(function(t) {
                    tu(e, "margin-bottom", nu(t, "margin-bottom"))
                })
            })
        }
        Ge(f, "data-tab-interval")
    }
      , ym = function(l, d, m) {
        var p = function(t) {
            return Xe(t, "data-list-level") ? parseInt(Ve(t, "data-list-level"), 10) : 1
        };
        return ou(l, "text-indent").bind(function(f) {
            return ou(l, "margin-left").map(function(t) {
                var e = ou(l, "list-style").exists(function(t) {
                    return be(t, "none")
                })
                  , n = Xe(l, "data-border-margin") ? Ve(l, "data-border-margin") : "0px"
                  , r = e ? p(l) + 1 : p(l)
                  , o = m.convertToPx(t) + m.convertToPx(n)
                  , i = d * r
                  , a = Xe(l, "data-text-indent-alt") ? m.convertToPx(Ve(l, "data-text-indent-alt")) : m.convertToPx(f)
                  , u = {}
                  , c = d / 2 * -1 - a;
                0 < c && (u["text-indent"] = c + "px");
                var s = o - i - c;
                return u["margin-left"] = 0 < s ? s + "px" : "0px",
                u
            })
        })
    }
      , bm = function(t, e, n) {
        var r = n.mergeInline();
        (r ? pm.inlineStyles : vm)(t, e, gm),
        hm(e, r)
    }
      , Tm = function(n) {
        var t, r = (t = an.fromDom(l.document.body),
        {
            play: function(i, a, u) {
                var c = an.fromTag("div")
                  , s = an.fromTag("iframe");
                eu(c, {
                    display: "none"
                });
                var f = Ta(s, "load", function() {
                    f.unbind(),
                    em(s, i);
                    var t = s.dom().contentWindow.document;
                    if (void 0 === t)
                        throw "sandbox iframe load event did not fire correctly";
                    var e = an.fromDom(t)
                      , n = t.body;
                    if (void 0 === n)
                        throw "sandbox iframe does not have a body";
                    var r = an.fromDom(n)
                      , o = a(e, r);
                    Ma(c),
                    l.setTimeout(y(u, o), 0)
                });
                ea(c, s),
                ea(t, c)
            }
        });
        return function(t, e) {
            r.play(t, function(t, e) {
                return bm(t, e, {
                    mergeInline: v(n)
                }),
                uu(e)
            }, e)
        }
    }
      , xm = function(t, i, e, c) {
        var n = t.html;
        return fc(function(o) {
            e.cleanDocument(n, i).get(function(t) {
                t.fold(function(t) {
                    console.error("PowerPaste error code: WIM01"),
                    uc(o, {
                        response: ec.error("errors.paste.process.failure"),
                        bundle: oc({})
                    })
                }, function(t) {
                    var e, n, a, u, r;
                    null == (r = t) || 0 === r.length ? uc(o, {
                        response: ec.paste([], []),
                        bundle: oc({})
                    }) : (e = o,
                    n = t,
                    a = c,
                    u = function(t) {
                        uc(e, {
                            response: t,
                            bundle: oc({})
                        })
                    }
                    ,
                    Tm(i)(n, function(t) {
                        var e = Ji(t)
                          , n = function(t) {
                            u(ec.paste(e, t))
                        }
                          , r = an.fromTag("div");
                        oa(r, e);
                        var o = So("img[src]", r);
                        if (0 === o.length)
                            n([]);
                        else if (a)
                            X(o, function(t) {
                                return Ge(t, "id")
                            }),
                            Rd(o).get(n);
                        else {
                            X(o, Ma);
                            var i = ko(r);
                            u(ec.incomplete(i, [], "errors.local.images.disallowed"))
                        }
                    }))
                })
            })
        })
    }
      , Em = function(t) {
        var e = z(t, function(t) {
            return "file" === t.kind && /image/.test(t.type)
        })
          , r = K(e, function(t, e) {
            var n = e.getAsFile();
            return null !== n ? t.concat(n) : t
        }, []);
        return fc(function(n) {
            Dd(r).get(function(t) {
                var i, a, e = (i = [],
                a = [],
                X(t, function(o) {
                    return _d.cata(o, function(t, e, n) {
                        var r = an.fromTag("img");
                        qe(r, "src", n),
                        i.push(r),
                        a.push(Ad(o, r))
                    }, function(t, e, n) {
                        l.console.error("Internal error: Paste operation produced an image URL instead of a Data URI: ", e)
                    })
                }),
                ec.paste(i, a));
                uc(n, {
                    response: e,
                    bundle: oc({})
                })
            })
        })
    }
      , wm = Oe.detect()
      , Im = function(t) {
        try {
            var e = t()
              , n = null != e && 0 < e.length ? Ji(e) : [];
            return Vo.value(n)
        } catch (t) {
            return l.console.error("PowerPaste error code: PT01. Message: ", t),
            Vo.error("errors.paste.process.failure")
        }
    }
      , Sm = function(t) {
        return t.fold(function(t) {
            return sc(t)
        }, function(t) {
            return ac({
                response: ec.paste(t, []),
                bundle: oc({})
            })
        })
    }
      , Nm = function(t, e, n, r) {
        return Im(function() {
            return Wl(t, wm, e, n, r)
        })
    }
      , Lm = function(t, e, n) {
        var r = Nm(t, e, n, !1);
        return Sm(r)
    }
      , _m = function(t, e) {
        var n = Im(function() {
            return ql(t, e)
        });
        return Sm(n)
    }
      , Om = function(t, e, n, r, o) {
        return Nm(t, e, r, n).fold(function(t) {
            return sc(t)
        }, function(a) {
            return fc(function(r) {
                o.get(function(t) {
                    var e, o, i, n = (e = t,
                    o = [],
                    i = nt(a, function(t) {
                        return "img" === Fe(t) ? [t] : jo(t, "img")
                    }),
                    X(e, function(r) {
                        _d.cata(r, function(t, e, n) {
                            X(i, function(t) {
                                Ve(t, "src") === n && o.push(Ad(r, t))
                            })
                        }, L)
                    }),
                    o);
                    uc(r, {
                        response: ec.paste(a, n),
                        bundle: oc({})
                    })
                })
            })
        })
    }
      , Cm = function(t, e, n) {
        var r = e.findClipboardTags(ko(n)).getOr([]);
        X(r, Ma);
        var o = Vt.nu(function(t) {
            return t([])
        });
        return Om(t, n, !1, !0, o)
    }
      , Dm = function(t, e, n, r, o) {
        return Om(t, e, r, n, o)
    }
      , Pm = function(t) {
        return "\n" === t || "\r" === t
    }
      , Am = function(o) {
        return K(o, function(t, e) {
            return -1 !== " \f\t\v".indexOf(e) || "\xa0" === e ? t.pcIsSpace || "" === t.str || t.str.length === o.length - 1 || (n = o,
            (r = t.str.length + 1) < n.length && 0 <= r && Pm(n[r])) ? {
                pcIsSpace: !1,
                str: t.str + "\xa0"
            } : {
                pcIsSpace: !0,
                str: t.str + " "
            } : {
                pcIsSpace: Pm(e),
                str: t.str + e
            };
            var n, r
        }, {
            pcIsSpace: !1,
            str: ""
        }).str
    }
      , km = function(t) {
        var e, n = an.fromTag("div");
        return e = t,
        n.dom().textContent = e,
        uu(n)
    }
      , Mm = function(t) {
        var e = Am(t).replace(/^[\r\n]*|[\r\n]*$/g, "").split(/\n{2,}|(?:\r\n){2,}/)
          , n = V(e, function(t) {
            return t.split(/\n|\r\n/).join("<br />")
        });
        return 1 === n.length ? n[0] : V(n, function(t) {
            return "<p>" + t + "</p>"
        }).join("")
    }
      , Rm = function(t) {
        var a = fd(t).getOrDie("Required text input for Text Handler");
        return fc(function(t) {
            var e, n, r, o, i = 0 < a.text.length ? (e = a.text,
            n = km(e),
            r = Mm(n),
            o = Ji(r),
            ec.paste(o, [])) : ec.cancel();
            uc(t, {
                response: i,
                bundle: oc({})
            })
        })
    }
      , Fm = function(t, e) {
        return Rm(t)
    }
      , jm = function(t, o) {
        var e = function(t, e) {
            var n = an.fromTag("div");
            oa(n, t),
            Hl(n);
            var r = ko(n);
            return ac({
                response: ec.paste(r, e),
                bundle: o.bundle()
            })
        }
          , n = y(cc, o);
        return ec.cata(o.response(), n, e, n, e)
    }
      , Um = function() {
        return function(t, e) {
            return sc("errors.local.images.disallowed")
        }
    }
      , Bm = function() {
        return function(t, e) {
            var n = cd(t).getOrDie("Must have image data for images handler");
            return Em(n.images)
        }
    }
      , Ym = function(i) {
        return function(t, e) {
            var n = ud(t).getOrDie("Wrong input type for HTML handler")
              , r = i.findClipboardTags(ko(n.container));
            r.each(function(t) {
                X(t, Ma)
            });
            var o = r.isSome();
            return ac({
                response: e.response(),
                bundle: oc({
                    isInternal: o
                })
            })
        }
    }
      , Wm = function(a, u) {
        return function(t, e) {
            var n = ud(t).getOrDie("Wrong input type for HTML handler").container
              , r = _o(u)
              , o = e.bundle();
            if (Gd.isInternal(o))
                return _m(r, n);
            a(n);
            var i = Gd.merging(o);
            return Lm(r, n, i)
        }
    }
      , Hm = function(u, c) {
        return function(t, e) {
            var a = e.bundle();
            return Gd.proxyBin(a).handle("There was no proxy bin setup. Ensure you have run proxyStep first.", function(t) {
                var e = Gd.merging(a)
                  , n = Gd.isWord(a)
                  , r = Gd.isInternal(a)
                  , o = Gd.backgroundAssets(a)
                  , i = _o(u);
                return r ? Cm(i, c, t) : Dm(i, t, e, n, o)
            })
        }
    }
      , qm = function(o, i) {
        return function(t, e) {
            var n = sd(t).getOrDie("Wrong input type for Word Import handler")
              , r = Gd.mergeOffice(e.bundle());
            return xm(n, r, o, i)
        }
    }
      , $m = function(r) {
        return function(t, e) {
            var n = rc(e.bundle(), oc(r));
            return ac({
                response: e.response(),
                bundle: n
            })
        }
    }
      , Vm = function(t, e) {
        return ac({
            response: ec.cancel(),
            bundle: oc({})
        })
    }
      , Xm = function(t, e) {
        return Of(t, function(t) {
            return !!Xe(t, "style") && -1 < Ve(t, "style").indexOf("mso-")
        })
    }
      , Gm = function(t, e) {
        var n = uu(t);
        return ns(n, e)
    }
      , zm = function(t, e) {
        var n = t.browser;
        return (n.isIE() && 11 <= n.version.major ? Xm : Gm)(e, t)
    }
      , Km = zd.resolve("smartpaste-eph-bin")
      , Jm = {
        binStyle: v(Km)
    }
      , Zm = Oe.detect();
    function Qm(r, f, o, l, i) {
        return function(t, e) {
            var n = ad(t).getOrDie("Must pass through event type").nativeEvent
              , c = i()
              , s = e.response();
            return fc(function(u) {
                var t = r(o);
                t.events.after.bind(function(t) {
                    var e = t.container();
                    if (Zm.browser.isSafari() && Fi(e, 'img[src^="webkit-fake-url"]').isSome()) {
                        var n = Zm.deviceType.isWebView() ? "webview.imagepaste" : "safari.imagepaste";
                        uc(u, {
                            response: ec.error(n),
                            bundle: oc({})
                        })
                    } else {
                        f(e),
                        Li(e, Jm.binStyle());
                        var r = zm(Zm, e)
                          , o = ko(e)
                          , i = l.findClipboardTags(o).isSome()
                          , a = $(o, function(t) {
                            return Xe(t, "id") && Te(Ve(t, "id"), "docs-internal-guid")
                        });
                        uc(u, {
                            response: s,
                            bundle: oc({
                                isWord: r,
                                isGoogleDocs: a,
                                isInternal: i,
                                proxyBin: e,
                                backgroundAssets: c
                            })
                        })
                    }
                }),
                c.convert(n),
                t.run()
            })
        }
    }
    var tp = function(t, e) {
        if (0 === t.length)
            throw new Error("Zero length content passed to Hex conversion");
        return Tt([xt(function(t) {
            for (var e = new Array(t.length / 2), n = 0; n < t.length; n += 2) {
                var r = t.substr(n, 2);
                e[Math.floor(n / 2)] = parseInt(r, 16)
            }
            return e
        }(t))], {
            type: e
        })
    }
      , ep = lt([{
        unsupported: ["id", "message", "isEquation", "attrs"]
    }, {
        supported: ["id", "contentType", "blob", "isEquation", "attrs"]
    }])
      , np = {
        unsupported: ep.unsupported,
        supported: ep.supported,
        cata: function(t, e, n) {
            return t.fold(e, n)
        }
    }
      , rp = function(t, e, n) {
        return e.indexOf(t, n)
    }
      , op = function(t, e, n, r, o, i, a) {
        return -1 === t || -1 === e ? k.none() : k.some({
            start: t,
            end: e,
            bower: n,
            regex: r,
            idRef: o,
            isEquation: i,
            attrs: a
        })
    }
      , ip = function(t, e, n) {
        return t.substring(e, n)
    }
      , ap = function(t, e) {
        if (-1 === e)
            return e;
        var n = 0
          , r = t.length;
        do {
            var o = t.indexOf("{", e)
              , i = t.indexOf("}", e);
            if (o < i && -1 !== o ? (e = o + 1,
            ++n) : (i < o || o < 0) && -1 !== i && (e = i + 1,
            --n),
            r < e || -1 === i)
                return -1
        } while (0 < n);return e
    }
      , up = function(t, e, n, r, o) {
        var i, a, u, c = ip(t, n, r), s = (a = rp("\\picscalex", i = t, n),
        u = rp("\\bliptag", i, a),
        -1 < a && a < u ? k.from(i.substring(a, u)) : k.none());
        return op(n, r, c, /[^a-fA-F0-9]([a-fA-F0-9]+)\}$/, "i", o, s)
    }
      , cp = function(t, e, n, r, o) {
        var i = ip(t, n, r);
        return op(n, r, i, /([a-fA-F0-9]{64,})(?:\}.*)/, "s", o, k.none())
    }
      , sp = function(t, e) {
        var n = rp("{\\pict{", t, e)
          , r = ap(t, n)
          , o = rp("{\\shp{", t, e)
          , i = ap(t, o)
          , a = rp("{\\mmathPict{", t, e)
          , u = ap(t, a)
          , c = -1 !== a && (a < n && r < u || a < o && i < u)
          , s = y(cp, t, e, o, i, c)
          , f = y(up, t, e, n, r, c);
        return -1 === n && -1 === o ? k.none() : -1 === n ? s() : -1 === o ? f() : o < n && r < i ? f() : n < o && i < r ? s() : n < o ? f() : o < n ? s() : k.none()
    }
      , fp = function(t, e) {
        return sp(t, e)
    }
      , lp = function(t) {
        return 0 <= t.indexOf("\\pngblip") ? Vo.value("image/png") : 0 <= t.indexOf("\\jpegblip") ? Vo.value("image/jpeg") : Vo.error("errors.imageimport.unsupported")
    }
      , dp = function(t, e) {
        var n = t.match(e);
        return n && n[1] && n[1].length % 2 == 0 ? Vo.value(n[1]) : Vo.error("errors.imageimport.invalid")
    }
      , mp = function(t) {
        var e = t.match(/\\shplid(\d+)/);
        return null !== e ? k.some(e[1]) : k.none()
    }
      , pp = function(t) {
        for (var u = [], e = function() {
            return t.length
        }, n = function(t) {
            var e, r, o, i, a, n = (r = (e = t).bower,
            o = e.regex,
            i = e.isEquation,
            a = e.attrs,
            mp(r).map(function(t) {
                var n = e.idRef + t;
                return lp(r).fold(function(t) {
                    return np.unsupported(n, t, i, a)
                }, function(e) {
                    return dp(r, o).fold(function(t) {
                        return np.unsupported(n, t, i, a)
                    }, function(t) {
                        return np.supported(n, e, tp(t, e), i, a)
                    })
                })
            }));
            return u = u.concat(n.toArray()),
            t.end
        }, r = 0; r < t.length; )
            r = fp(t, r).fold(e, n);
        return u
    }
      , gp = function(t) {
        var e = t.replace(/\r/g, "").replace(/\n/g, "");
        return pp(e)
    }
      , vp = function(t) {
        return gp(t)
    }
      , hp = function(t) {
        return np.cata(t, function(t, e, n) {
            return t
        }, function(t, e, n, r, o) {
            return t
        })
    }
      , yp = function(t) {
        return np.cata(t, function(t, e, n) {
            return n
        }, function(t, e, n, r, o) {
            return r
        })
    }
      , bp = function(t) {
        return np.cata(t, function(t, e, n) {
            return Vo.error(e)
        }, function(t, e, n, r, o) {
            return Vo.value(n)
        })
    };
    function Tp(u, c, s, f, l) {
        return u.toCanvas().then(function(t) {
            return e = t,
            n = u.getType(),
            r = c,
            o = s,
            St(i = wt(f, l)).drawImage(e, -r, -o),
            Ct(a = i, n).then(function(t) {
                return Mt(Nt.resolve(a), t, a.toDataURL())
            });
            var e, n, r, o, i, a
        })
    }
    var xp, Ep, wp, Ip = {}, Sp = {
        exports: Ip
    };
    Ep = Ip,
    wp = Sp,
    xp = void 0,
    function(t) {
        "object" == typeof Ep && void 0 !== wp ? wp.exports = t() : "function" == typeof xp && xp.amd ? xp([], t) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).EphoxContactWrapper = t()
    }(function() {
        return function i(a, u, c) {
            function s(e, t) {
                if (!u[e]) {
                    if (!a[e]) {
                        var n = !1;
                        if (!t && n)
                            return n(e, !0);
                        if (f)
                            return f(e, !0);
                        var r = new Error("Cannot find module '" + e + "'");
                        throw r.code = "MODULE_NOT_FOUND",
                        r
                    }
                    var o = u[e] = {
                        exports: {}
                    };
                    a[e][0].call(o.exports, function(t) {
                        return s(a[e][1][t] || t)
                    }, o, o.exports, i, a, u, c)
                }
                return u[e].exports
            }
            for (var f = !1, t = 0; t < c.length; t++)
                s(c[t]);
            return s
        }({
            1: [function(t, e, n) {
                var r, o, i = e.exports = {};
                function a() {
                    throw new Error("setTimeout has not been defined")
                }
                function u() {
                    throw new Error("clearTimeout has not been defined")
                }
                function c(e) {
                    if (r === setTimeout)
                        return setTimeout(e, 0);
                    if ((r === a || !r) && setTimeout)
                        return r = setTimeout,
                        setTimeout(e, 0);
                    try {
                        return r(e, 0)
                    } catch (t) {
                        try {
                            return r.call(null, e, 0)
                        } catch (t) {
                            return r.call(this, e, 0)
                        }
                    }
                }
                !function() {
                    try {
                        r = "function" == typeof setTimeout ? setTimeout : a
                    } catch (t) {
                        r = a
                    }
                    try {
                        o = "function" == typeof clearTimeout ? clearTimeout : u
                    } catch (t) {
                        o = u
                    }
                }();
                var s, f = [], l = !1, d = -1;
                function m() {
                    l && s && (l = !1,
                    s.length ? f = s.concat(f) : d = -1,
                    f.length && p())
                }
                function p() {
                    if (!l) {
                        var t = c(m);
                        l = !0;
                        for (var e = f.length; e; ) {
                            for (s = f,
                            f = []; ++d < e; )
                                s && s[d].run();
                            d = -1,
                            e = f.length
                        }
                        s = null,
                        l = !1,
                        function(e) {
                            if (o === clearTimeout)
                                return clearTimeout(e);
                            if ((o === u || !o) && clearTimeout)
                                return o = clearTimeout,
                                clearTimeout(e);
                            try {
                                o(e)
                            } catch (t) {
                                try {
                                    return o.call(null, e)
                                } catch (t) {
                                    return o.call(this, e)
                                }
                            }
                        }(t)
                    }
                }
                function g(t, e) {
                    this.fun = t,
                    this.array = e
                }
                function v() {}
                i.nextTick = function(t) {
                    var e = new Array(arguments.length - 1);
                    if (1 < arguments.length)
                        for (var n = 1; n < arguments.length; n++)
                            e[n - 1] = arguments[n];
                    f.push(new g(t,e)),
                    1 !== f.length || l || c(p)
                }
                ,
                g.prototype.run = function() {
                    this.fun.apply(null, this.array)
                }
                ,
                i.title = "browser",
                i.browser = !0,
                i.env = {},
                i.argv = [],
                i.version = "",
                i.versions = {},
                i.on = v,
                i.addListener = v,
                i.once = v,
                i.off = v,
                i.removeListener = v,
                i.removeAllListeners = v,
                i.emit = v,
                i.prependListener = v,
                i.prependOnceListener = v,
                i.listeners = function(t) {
                    return []
                }
                ,
                i.binding = function(t) {
                    throw new Error("process.binding is not supported")
                }
                ,
                i.cwd = function() {
                    return "/"
                }
                ,
                i.chdir = function(t) {
                    throw new Error("process.chdir is not supported")
                }
                ,
                i.umask = function() {
                    return 0
                }
            }
            , {}],
            2: [function(t, l, e) {
                (function(n) {
                    !function(t) {
                        var e = setTimeout;
                        function r() {}
                        function i(t) {
                            if ("object" != typeof this)
                                throw new TypeError("Promises must be constructed via new");
                            if ("function" != typeof t)
                                throw new TypeError("not a function");
                            this._state = 0,
                            this._handled = !1,
                            this._value = void 0,
                            this._deferreds = [],
                            f(t, this)
                        }
                        function o(n, r) {
                            for (; 3 === n._state; )
                                n = n._value;
                            0 !== n._state ? (n._handled = !0,
                            i._immediateFn(function() {
                                var t = 1 === n._state ? r.onFulfilled : r.onRejected;
                                if (null !== t) {
                                    var e;
                                    try {
                                        e = t(n._value)
                                    } catch (t) {
                                        return void u(r.promise, t)
                                    }
                                    a(r.promise, e)
                                } else
                                    (1 === n._state ? a : u)(r.promise, n._value)
                            })) : n._deferreds.push(r)
                        }
                        function a(e, t) {
                            try {
                                if (t === e)
                                    throw new TypeError("A promise cannot be resolved with itself.");
                                if (t && ("object" == typeof t || "function" == typeof t)) {
                                    var n = t.then;
                                    if (t instanceof i)
                                        return e._state = 3,
                                        e._value = t,
                                        void c(e);
                                    if ("function" == typeof n)
                                        return void f((r = n,
                                        o = t,
                                        function() {
                                            r.apply(o, arguments)
                                        }
                                        ), e)
                                }
                                e._state = 1,
                                e._value = t,
                                c(e)
                            } catch (t) {
                                u(e, t)
                            }
                            var r, o
                        }
                        function u(t, e) {
                            t._state = 2,
                            t._value = e,
                            c(t)
                        }
                        function c(t) {
                            2 === t._state && 0 === t._deferreds.length && i._immediateFn(function() {
                                t._handled || i._unhandledRejectionFn(t._value)
                            });
                            for (var e = 0, n = t._deferreds.length; e < n; e++)
                                o(t, t._deferreds[e]);
                            t._deferreds = null
                        }
                        function s(t, e, n) {
                            this.onFulfilled = "function" == typeof t ? t : null,
                            this.onRejected = "function" == typeof e ? e : null,
                            this.promise = n
                        }
                        function f(t, e) {
                            var n = !1;
                            try {
                                t(function(t) {
                                    n || (n = !0,
                                    a(e, t))
                                }, function(t) {
                                    n || (n = !0,
                                    u(e, t))
                                })
                            } catch (t) {
                                if (n)
                                    return;
                                n = !0,
                                u(e, t)
                            }
                        }
                        i.prototype.catch = function(t) {
                            return this.then(null, t)
                        }
                        ,
                        i.prototype.then = function(t, e) {
                            var n = new this.constructor(r);
                            return o(this, new s(t,e,n)),
                            n
                        }
                        ,
                        i.all = function(t) {
                            var u = Array.prototype.slice.call(t);
                            return new i(function(r, o) {
                                if (0 === u.length)
                                    return r([]);
                                var i = u.length;
                                function a(e, t) {
                                    try {
                                        if (t && ("object" == typeof t || "function" == typeof t)) {
                                            var n = t.then;
                                            if ("function" == typeof n)
                                                return void n.call(t, function(t) {
                                                    a(e, t)
                                                }, o)
                                        }
                                        u[e] = t,
                                        0 == --i && r(u)
                                    } catch (t) {
                                        o(t)
                                    }
                                }
                                for (var t = 0; t < u.length; t++)
                                    a(t, u[t])
                            }
                            )
                        }
                        ,
                        i.resolve = function(e) {
                            return e && "object" == typeof e && e.constructor === i ? e : new i(function(t) {
                                t(e)
                            }
                            )
                        }
                        ,
                        i.reject = function(n) {
                            return new i(function(t, e) {
                                e(n)
                            }
                            )
                        }
                        ,
                        i.race = function(o) {
                            return new i(function(t, e) {
                                for (var n = 0, r = o.length; n < r; n++)
                                    o[n].then(t, e)
                            }
                            )
                        }
                        ,
                        i._immediateFn = "function" == typeof n ? function(t) {
                            n(t)
                        }
                        : function(t) {
                            e(t, 0)
                        }
                        ,
                        i._unhandledRejectionFn = function(t) {
                            "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
                        }
                        ,
                        i._setImmediateFn = function(t) {
                            i._immediateFn = t
                        }
                        ,
                        i._setUnhandledRejectionFn = function(t) {
                            i._unhandledRejectionFn = t
                        }
                        ,
                        void 0 !== l && l.exports ? l.exports = i : t.Promise || (t.Promise = i)
                    }(this)
                }
                ).call(this, t("timers").setImmediate)
            }
            , {
                timers: 3
            }],
            3: [function(c, t, s) {
                (function(t, e) {
                    var r = c("process/browser.js").nextTick
                      , n = Function.prototype.apply
                      , o = Array.prototype.slice
                      , i = {}
                      , a = 0;
                    function u(t, e) {
                        this._id = t,
                        this._clearFn = e
                    }
                    s.setTimeout = function() {
                        return new u(n.call(setTimeout, window, arguments),clearTimeout)
                    }
                    ,
                    s.setInterval = function() {
                        return new u(n.call(setInterval, window, arguments),clearInterval)
                    }
                    ,
                    s.clearTimeout = s.clearInterval = function(t) {
                        t.close()
                    }
                    ,
                    u.prototype.unref = u.prototype.ref = function() {}
                    ,
                    u.prototype.close = function() {
                        this._clearFn.call(window, this._id)
                    }
                    ,
                    s.enroll = function(t, e) {
                        clearTimeout(t._idleTimeoutId),
                        t._idleTimeout = e
                    }
                    ,
                    s.unenroll = function(t) {
                        clearTimeout(t._idleTimeoutId),
                        t._idleTimeout = -1
                    }
                    ,
                    s._unrefActive = s.active = function(t) {
                        clearTimeout(t._idleTimeoutId);
                        var e = t._idleTimeout;
                        0 <= e && (t._idleTimeoutId = setTimeout(function() {
                            t._onTimeout && t._onTimeout()
                        }, e))
                    }
                    ,
                    s.setImmediate = "function" == typeof t ? t : function(t) {
                        var e = a++
                          , n = !(arguments.length < 2) && o.call(arguments, 1);
                        return i[e] = !0,
                        r(function() {
                            i[e] && (n ? t.apply(null, n) : t.call(null),
                            s.clearImmediate(e))
                        }),
                        e
                    }
                    ,
                    s.clearImmediate = "function" == typeof e ? e : function(t) {
                        delete i[t]
                    }
                }
                ).call(this, c("timers").setImmediate, c("timers").clearImmediate)
            }
            , {
                "process/browser.js": 1,
                timers: 3
            }],
            4: [function(t, e, n) {
                var r = t("promise-polyfill")
                  , o = "undefined" != typeof window ? window : Function("return this;")();
                e.exports = {
                    boltExport: o.Promise || r
                }
            }
            , {
                "promise-polyfill": 2
            }]
        }, {}, [4])(4)
    });
    var Np = Sp.exports.boltExport
      , Lp = function(t, e) {
        var n = new RegExp("\\\\pic" + e + "(\\d+)\\\\")
          , r = t.match(n)[1];
        return parseInt(r, 10)
    }
      , _p = function(t, e, n) {
        var r = y(Lp, t)
          , o = r("wgoal")
          , i = r("hgoal")
          , a = o / e
          , u = i / n
          , c = r("cropl")
          , s = r("cropt");
        return {
            cropl: c / a,
            cropt: s / u,
            cropw: (o - c - r("cropr")) / a,
            croph: (i - s - r("cropb")) / u
        }
    }
      , Op = function(r, t) {
        return t.fold(function() {
            return new Np(function(t) {
                return t(r)
            }
            )
        }, function(l) {
            return _d.cata(r, function(s, f, t) {
                return f.toCanvas().then(function(t) {
                    var e, n, r, o, i, a = parseInt(Ve(an.fromDom(t), "width"), 10) || 1, u = parseInt(Ve(an.fromDom(t), "height"), 10) || 1, c = _p(l, a, u);
                    return (e = f,
                    n = c.cropl,
                    r = c.cropt,
                    o = c.cropw,
                    i = c.croph,
                    Tp(e, n, r, o, i)).then(function(t) {
                        return _d.blob(s, t, t.toDataURL())
                    })
                })
            }, function(t, e, n) {
                return new Np(function(t) {
                    return t(r)
                }
                )
            })
        })
    }
      , Cp = function(t, n) {
        return t.length === n.length ? Np.all(V(t, function(t, e) {
            return Op(t, n[e])
        })) : Np.resolve(t)
    }
      , Dp = function(t, e, i, a) {
        var u = []
          , c = []
          , s = !1;
        return {
            blobs: nt(t, function(r, n) {
                var o = Ve(r, "data-image-id");
                return Ge(r, "rtf-data-image"),
                Ge(r, "data-image-id"),
                Ge(r, "data-ms-equation"),
                "unsupported" === o ? (s = !0,
                qe(r, "alt", i("errors.imageimport.unsupported")),
                []) : J(e, function(t, e) {
                    return a(t, e, o, n)
                }).fold(function() {
                    return l.console.log("WARNING: unable to find data for image ", r.dom()),
                    s = !0,
                    qe(r, "alt", i("errors.imageimport.unsupported")),
                    []
                }, function(n) {
                    return bp(n).fold(function(t) {
                        return s = !0,
                        l.console.error("PowerPaste error code: RTF04"),
                        qe(r, "alt", i(t)),
                        []
                    }, function(t) {
                        var e;
                        return u.push(r),
                        c.push((e = n,
                        np.cata(e, function(t, e, n) {
                            return k.none()
                        }, function(t, e, n, r, o) {
                            return o
                        }))),
                        [t]
                    })
                })
            }),
            filteredImages: u,
            imageAttrs: c,
            failedImage: s
        }
    }
      , Pp = {
        convert: function(t, e, n, r) {
            var o = K(e, function(e, n) {
                var r = hp(n)
                  , o = yp(n);
                return Z(e, function(t) {
                    return !(o || yp(t)) && hp(t) === r
                }).fold(function() {
                    return e.concat([n])
                }, function(t) {
                    return bp(e[t]).isValue() ? e : e.slice(0, t).concat(e.slice(t + 1)).concat([n])
                })
            }, [])
              , i = G(o, function(t) {
                return !yp(t)
            })
              , a = i.pass
              , u = i.fail
              , c = G(t, function(t) {
                return !("true" === Ve(t, "data-ms-equation"))
            })
              , s = c.pass
              , f = c.fail
              , l = Dp(s, a, r, function(t, e, n, r) {
                return hp(t) === n
            })
              , d = Dp(f, u, r, function(t, e, n, r) {
                return e === r
            })
              , m = l.filteredImages.concat(d.filteredImages)
              , p = l.imageAttrs.concat(d.imageAttrs)
              , g = l.blobs.concat(d.blobs)
              , v = l.failedImage || d.failedImage;
            Dd(g).get(function(t) {
                Cp(t, p).then(function(t) {
                    var e = Md(t, m);
                    n(e, v)
                })
            })
        }
    }
      , Ap = function(t) {
        return jo(t, "[rtf-data-image]")
    }
      , kp = {
        exists: function(t) {
            return 0 < Ap(t).length
        },
        find: Ap
    };
    function Mp(o) {
        var r, a, i = (r = o.translations,
        {
            events: (a = ao.create({
                insert: io(["elements", "correlated"]),
                incomplete: io(["elements", "correlated", "message"])
            })).registry,
            processRtf: function(o, i, t) {
                var e = vp(t)
                  , n = kp.find(o);
                Pp.convert(n, e, function(t, e) {
                    var n = ko(o)
                      , r = t.concat(i);
                    e ? (console.error("PowerPaste error code: RTF01"),
                    a.trigger.incomplete(n, r, "errors.imageimport.failed")) : a.trigger.insert(n, r)
                }, r)
            }
        }), u = $s(k.none()), c = function(e) {
            u.get().each(function(t) {
                uc(t, {
                    response: e,
                    bundle: oc({})
                })
            })
        };
        return i.events.insert.bind(function(t) {
            c(ec.paste(t.elements(), t.correlated()))
        }),
        i.events.incomplete.bind(function(t) {
            console.error("PowerPaste error code: RTF02"),
            c(ec.incomplete(t.elements(), t.correlated(), t.message()))
        }),
        function(t, r) {
            var e = sd(t).getOrDie("Word input required for rtf data")
              , n = function(o) {
                return fc(function(e) {
                    var t = function() {
                        uc(e, {
                            response: r.response(),
                            bundle: r.bundle()
                        })
                    }
                      , n = function(t, n) {
                        u.set(k.some(e));
                        var r = an.fromTag("div");
                        oa(r, t),
                        o.fold(function() {
                            var t, e = kp.find(r);
                            return 0 < e.length ? function(t) {
                                X(t, Ma);
                                var e = ko(r);
                                console.error("PowerPaste error code: RTF03"),
                                c(ec.incomplete(e, n, "errors.imageimport.failed"))
                            }(e) : (t = ko(r),
                            void c(ec.paste(t, n)))
                        }, function(t) {
                            i.processRtf(r, n, t)
                        })
                    };
                    ec.cata(r.response(), t, n, t, n)
                })
            };
            return function(e, n) {
                var t = ot(n);
                if (t.length !== Xl.length)
                    throw new Error("Partial match");
                return bu(t, function(t) {
                    return e.discriminator === t ? k.some(n[t]) : k.none()
                }).getOrDie("Must find branch for constructor: " + e.discriminator)(e.data)
            }(e.rtf, {
                disabled: function() {
                    return n(k.none())
                },
                fromClipboard: function(t) {
                    return n(!0 === o.allowLocalImages ? k.some(t.rtf) : k.none())
                }
            })
        }
    }
    var Rp = function(o) {
        var i = function() {
            return Vt.pure(o)
        };
        return _d.cata(o.asset(), function(t, e, n) {
            return /tiff$/.test(e.getType()) ? (r = e,
            Vt.nu(function(e) {
                var t = Bt(r, "image/png").then(function(t) {
                    Od(t).map(k.some).get(e)
                });
                return t.catch.call(t, function(t) {
                    return l.console.warn(t),
                    e(k.none()),
                    t
                })
            })).map(function(t) {
                return t.map(function(t) {
                    var e = o.image();
                    return Pe(n),
                    kd(t, e),
                    Ad(t, e)
                }).getOr(o)
            }) : i();
            var r
        }, i)
    };
    function Fp() {
        return function(t, o) {
            return fc(function(n) {
                var t = function() {
                    uc(n, {
                        response: o.response(),
                        bundle: o.bundle()
                    })
                }
                  , r = function(t, e) {
                    zt(t, Rp).get(function(t) {
                        uc(n, {
                            response: e(t),
                            bundle: o.bundle()
                        })
                    })
                };
                ec.cata(o.response(), t, function(e, t) {
                    r(t, function(t) {
                        return ec.paste(e, t)
                    })
                }, t, function(e, t, n) {
                    r(t, function(t) {
                        return l.console.error("PowerPaste error code:  IMG01"),
                        ec.incomplete(e, t, n)
                    })
                })
            })
        }
    }
    var jp = function(t) {
        return v(t)
    }
      , Up = function(t, e) {
        return t.isSupported() ? e.getWordData() : k.none()
    }
      , Bp = function(t) {
        return t.getNative()
    }
      , Yp = function(t) {
        return t.getImage()
    }
      , Wp = function(t) {
        return t.getHtml()
    }
      , Hp = function(t) {
        return t.getText()
    }
      , qp = function(t) {
        return t.getOnlyText()
    }
      , $p = function(t) {
        return t.getGoogleDocsData()
    }
      , Vp = function(t) {
        return t.getVoid()
    }
      , Xp = function(t, e, n, r) {
        return {
            _label: t,
            label: v(t),
            getAvailable: e,
            steps: v(n),
            capture: v(r)
        }
    }
      , Gp = function(t, e, n, r) {
        return {
            _label: t,
            label: v(t),
            getAvailable: e,
            steps: v(n),
            capture: v(r)
        }
    }
      , zp = function(t, e, n, r) {
        return Xp("Outside of Textbox.io pasting HTML5 API (could be internal)", Wp, [jp(Ym(e.intraFlag)), jp(Qd(t, e)), jp(Wm(n, r)), jp(qd(e)), jp(Fp())], !0)
    }
      , Kp = function(t, e, n, r, o) {
        return Gp("Outside of Textbox.io pasting offscreen (could be internal)", Bp, [jp(Qm(r, n, o, e.intraFlag, Pd)), jp(Qd(t, e)), jp(Hm(o, e.intraFlag)), jp(qd(e)), jp(Fp())], !1)
    }
      , Jp = function(t, e, n) {
        return Xp("Word Import pasting", y(Up, t), [jp($m({
            isWord: !0
        })), jp(Zd(e, n)), jp(qm(t, n.allowLocalImages)), (r = Mp(n),
        function(n) {
            return function(t, e) {
                return n.block(),
                r(t, e).map(function(t) {
                    return n.unblock(),
                    t
                })
            }
        }
        ), jp(Fp())], !0);
        var r
    }
      , Zp = function(t, e, n) {
        return Xp(" pasting", $p, [jp($m({
            officeStyles: !1,
            htmlStyles: !1
        })), jp(Wm(e, n)), jp(qd(t)), jp(Fp())], !0)
    }
      , Qp = function(t) {
        return Xp("Image pasting", Yp, [jp(!1 === t.allowLocalImages ? Um() : Bm()), jp(Fp())], !0)
    }
      , tg = function() {
        return Xp("Only plain text is available to paste", qp, [jp(Fm), jp(jm)], !0)
    }
      , eg = function() {
        return Xp("Plain text pasting", Hp, [jp(Fm), jp(jm)], !0)
    }
      , ng = function() {
        return Gp("There is no valid way to paste, discarding content", Vp, [jp(Vm)], !0)
    };
    var rg = "x-tinymce/html"
      , og = "\x3c!-- " + rg + " --\x3e"
      , ig = {
        mark: function(t) {
            return og + t
        },
        unmark: function(t) {
            return t.replace(og, "")
        },
        isMarked: function(t) {
            return -1 !== t.indexOf(og)
        },
        retainContentEditable: function(t) {
            return t.replace(/ contenteditable="([^"]+)"/g, ' data-mce-contenteditable="$1"')
        },
        restoreContentEditable: function(t) {
            return t.replace(/ data-mce-contenteditable="([^"]+)"/g, ' contenteditable="$1"')
        },
        internalHtmlMime: v(rg)
    }
      , ag = function() {}
      , ug = function(t, e, n) {
        if (r = t,
        !1 !== tinymce.Env.iOS || void 0 === r || "function" != typeof r.setData)
            return !1;
        try {
            return t.clearData(),
            t.setData("text/html", e),
            t.setData("text/plain", n),
            t.setData(ig.internalHtmlMime(), e),
            !0
        } catch (t) {
            return !1
        }
        var r
    }
      , cg = function(t, e, n, r) {
        ug(t.clipboardData, e.html, e.text) ? (t.preventDefault(),
        r()) : n(e.html, r)
    }
      , sg = function(a) {
        return function(t, e) {
            var n = a.dom.create("div", {
                contenteditable: "false",
                "data-mce-bogus": "all"
            })
              , r = a.dom.create("div", {
                contenteditable: "true",
                "data-mce-bogus": "all"
            }, t);
            a.dom.setStyles(n, {
                position: "fixed",
                top: "50%",
                left: "-3000px",
                width: "1000px",
                overflow: "hidden"
            }),
            n.appendChild(r),
            a.dom.add(a.getBody(), n);
            var o = a.selection.getRng();
            r.focus();
            var i = a.dom.createRng();
            i.selectNodeContents(r),
            a.selection.setRng(i),
            setTimeout(function() {
                a.selection.setRng(o),
                n.parentNode.removeChild(n),
                e()
            }, 0)
        }
    }
      , fg = function(t) {
        var e = ig.retainContentEditable(t.selection.getContent({
            contextual: !0
        }));
        return {
            html: ig.mark(e),
            text: t.selection.getContent({
                format: "text"
            })
        }
    }
      , lg = {
        register: function(t) {
            var e, n;
            t.on("cut", (e = t,
            function(t) {
                !1 === e.selection.isCollapsed() && cg(t, fg(e), sg(e), function() {
                    setTimeout(function() {
                        e.execCommand("Delete")
                    }, 0)
                })
            }
            )),
            t.on("copy", (n = t,
            function(t) {
                !1 === n.selection.isCollapsed() && cg(t, fg(n), sg(n), ag)
            }
            ))
        }
    }
      , dg = {
        nodeToString: function(t) {
            var e = document.createElement("div");
            e.appendChild(t.cloneNode(!0));
            var n = e.innerHTML;
            return e = t = null,
            n
        },
        restoreStyleAttrs: function(t) {
            X(V(t.getElementsByTagName("*"), an.fromDom), function(t) {
                Xe(t, "data-mce-style") && !Xe(t, "style") && qe(t, "style", Ve(t, "data-mce-style"))
            })
        }
    };
    var mg = {
        showDialog: function(t, e) {
            var n = {
                title: "Error",
                body: {
                    type: "panel",
                    items: [{
                        type: "htmlpanel",
                        name: "errorpanel",
                        html: e
                    }]
                },
                initialData: {},
                buttons: [{
                    text: "OK",
                    type: "cancel",
                    name: "ok",
                    primary: !0
                }]
            };
            t.windowManager.open(n)
        }
    }
      , pg = {
        init: function() {
            var r = $s([{
                text: "Close",
                name: "close",
                type: "custom",
                primary: !0
            }])
              , o = $s({});
            return {
                setButtons: function(t) {
                    var n = {}
                      , e = V(t, function(t) {
                        var e = t.text;
                        return n[e.toLowerCase()] = t.click,
                        {
                            text: e,
                            name: e.toLowerCase(),
                            type: "custom"
                        }
                    });
                    o.set(n),
                    r.set(e)
                },
                getButtons: r.get,
                getAction: function(t) {
                    var e = o.get();
                    return e.hasOwnProperty(t) ? k.some(e[t]) : k.none()
                }
            }
        }
    };
    var gg = Jr("url", "html")
      , vg = function(t) {
        return /^https?:\/\/[\w\?\-\/+=.&%@~#]+$/i.test(t)
    }
      , hg = vg
      , yg = function(t) {
        return vg(t) && /.(gif|jpe?g|png)$/.test(t)
    }
      , bg = function(n) {
        var t = /^<a href="([^"]+)">([^<]+)<\/a>$/.exec(n);
        return k.from(t).bind(function(t) {
            var e = gg(t[1], n);
            return t[1] === t[2] ? k.some(e) : k.none()
        })
    }
      , Tg = function(t, e, n) {
        return "extra"in t.undoManager ? (t.undoManager.extra(function() {
            xg(t, e)
        }, n),
        k.some(!0)) : k.none()
    }
      , xg = function(t, e) {
        return t.insertContent(e, {
            merge: !1 !== t.settings.paste_merge_formats,
            paste: !0
        }),
        k.some(!0)
    }
      , Eg = {
        until: function(e, n, t) {
            return bu(t, function(t) {
                return t(e, n)
            })
        },
        linkSelection: function(r, t) {
            return bg(t).bind(function(t) {
                var e, n;
                return !1 === r.selection.isCollapsed() && hg(t.url()) ? Tg(e = r, (n = t).html(), function() {
                    e.execCommand("mceInsertLink", !1, n.url())
                }) : k.none()
            })
        },
        insertImage: function(r, t) {
            return bg(t).bind(function(t) {
                return yg(t.url()) ? Tg(e = r, (n = t).html(), function() {
                    e.insertContent('<img src="' + n.url() + '">')
                }) : k.none();
                var e, n
            })
        },
        insertContent: xg
    }
      , wg = function(t, e) {
        return t.hasEventListeners(e)
    }
      , Ig = function(t) {
        return t.plugins.powerpaste
    }
      , Sg = {
        process: function(t, e, n) {
            var r, o, i, a, u, c, s, f, l, d, m, p, g, v = ig.unmark(e);
            return d = v,
            m = n,
            o = wg(l = r = t, "PastePreProcess") ? (p = d,
            g = m,
            l.fire("PastePreProcess", {
                internal: g,
                content: p
            }).content) : d,
            i = n,
            wg(r, "PastePostProcess") ? (u = o,
            c = i,
            s = (a = r).dom.add(a.getBody(), "div", {
                style: "display:none"
            }, u),
            f = a.fire("PastePostProcess", {
                internal: c,
                node: s
            }).node.innerHTML,
            a.dom.remove(s),
            f) : o
        },
        registerEvents: function(e) {
            var n = e.settings;
            n.paste_preprocess && e.on("PastePreProcess", function(t) {
                n.paste_preprocess.call(e, Ig(e), t)
            }),
            n.paste_postprocess && e.on("PastePostProcess", function(t) {
                n.paste_postprocess.call(e, Ig(e), t)
            })
        }
    };
    function Ng(h, y, t, e, b, T) {
        var x, E, n, r, w = $s(k.none());
        n = e ? e.jsUrl : t,
        r = "/js",
        E = n.replace(/\/$/, "") + "/" + r.replace(/^\//, "");
        // hack 改为本地地址
        E = '/vendor/tinymce/plugins/powerpaste/js'
        var I = function(t, e, n) {
            var r, o = !1 !== t.settings.smart_paste ? [Eg.linkSelection, Eg.insertImage] : [];
            Eg.until(t, e, o.concat([(r = n,
            function(t, e) {
                return t.undoManager.transact(function() {
                    Eg.insertContent(t, e),
                    dg.restoreStyleAttrs(t.getBody()),
                    b.prepareImages(r)
                }),
                k.some(!0)
            }
            )]))
        }
          , S = function() {
            x && h.selection.moveToBookmark(x),
            x = null
        };
        h.on("init", function(t) {
            var s, a, e, n, r, o, i, u, c, f, l = {
                baseUrl: E,
                officeStyles: h.settings.powerpaste_word_import || Vr.officeStyles,
                htmlStyles: h.settings.powerpaste_html_import || Vr.htmlStyles,
                translations: cn.translate,
                allowLocalImages: !1 !== h.settings.powerpaste_allow_local_images,
                pasteBinAttrs: {
                    "data-mce-bogus": "all"
                },
                intraFlag: {
                    clipboardType: ig.internalHtmlMime,
                    findClipboardTags: function(t) {
                        var e = z(t, function(t) {
                            return Be(t) && be(Rf(t), ig.internalHtmlMime())
                        });
                        return e.length ? k.some(e) : k.none()
                    }
                },
                preprocessor: function(t) {
                    return Vt.pure(t)
                }
            }, d = T ? (a = h,
            {
                createDialog: function() {
                    var n = ""
                      , r = null
                      , o = pg.init()
                      , e = ao.create({
                        close: io([])
                    })
                      , i = function(t) {
                        e.trigger.close()
                    };
                    return {
                        events: e.registry,
                        setTitle: function(t) {
                            return n = t
                        },
                        setContent: function(t) {
                            return r = t
                        },
                        setButtons: function(t) {
                            o.setButtons(t)
                        },
                        show: function() {
                            var t = dg.nodeToString(r.dom())
                              , e = {
                                title: n,
                                body: {
                                    type: "panel",
                                    items: [{
                                        type: "htmlpanel",
                                        name: "contentPanel",
                                        html: t
                                    }]
                                },
                                initialData: {},
                                buttons: o.getButtons(),
                                onCancel: i,
                                onAction: function(e, t) {
                                    o.getAction(t.name).each(function(t) {
                                        return t(e)
                                    }),
                                    e.close()
                                }
                            };
                            a.windowManager.open(e)
                        },
                        destroy: L,
                        reflow: function() {}
                    }
                }
            }) : (s = h,
            {
                createDialog: function() {
                    var r, o = "", i = "", a = [], u = null, e = ao.create({
                        close: io([])
                    }), c = function(t) {
                        e.trigger.close()
                    }, t = function() {
                        r.off("close", c),
                        r.close("close")
                    };
                    return {
                        events: e.registry,
                        setTitle: function(t) {
                            o = t
                        },
                        setContent: function(t) {
                            var e = dg.nodeToString(t.dom());
                            i = [{
                                type: "container",
                                html: e
                            }],
                            u = t
                        },
                        setButtons: function(t) {
                            var r = [];
                            t.forEach(function(t, e, n) {
                                r.push({
                                    text: t.text,
                                    ariaLabel: t.text,
                                    onclick: t.click
                                })
                            }),
                            a = r
                        },
                        show: function() {
                            0 === a.length && (a = [{
                                text: "Close",
                                onclick: function() {
                                    r.close()
                                }
                            }]);
                            var t = {
                                title: o,
                                spacing: 10,
                                padding: 10,
                                minWidth: 300,
                                minHeight: 100,
                                layout: "flex",
                                items: i,
                                buttons: a
                            };
                            r = s.windowManager.open(t);
                            var e = an.fromDom(r.getEl())
                              , n = Fi(e, "." + Ve(u, "class")).getOrDie("We must find this element or we cannot continue");
                            Zi(n, u),
                            Ma(n),
                            r.on("close", c)
                        },
                        hide: function() {
                            t()
                        },
                        destroy: function() {
                            t()
                        },
                        reflow: function() {}
                    }
                }
            }), m = an.fromDom(h.getBody()), p = (e = m,
            n = d.createDialog,
            r = L,
            i = Pa((o = l).baseUrl),
            u = Zu(void 0 !== o.pasteBinAttrs ? o.pasteBinAttrs : {}),
            c = [tg(), Jp(i, n, o), Zp(o, r, e), zp(n, o, r, e), Qp(o)],
            f = Kp(n, o, r, u, e),
            Nd(c, f)), g = Nd([eg()], ng());
            X([p, g], function(t) {
                t.events.cancel.bind(function() {
                    S()
                }),
                t.events.error.bind(function(t) {
                    S(),
                    h.notificationManager ? h.notificationManager.open({
                        text: cn.translate(t.message()),
                        type: "error"
                    }) : (T ? mg : ca).showDialog(h, cn.translate(t.message()))
                }),
                t.events.insert.bind(function(t) {
                    var e = V(t.elements(), function(t) {
                        return dg.nodeToString(t.dom())
                    }).join("")
                      , n = ig.restoreContentEditable(e);
                    h.focus(),
                    b.importImages(t.assets()).get(function() {
                        S(),
                        I(h, Sg.process(h, n, t.isInternal()), t.assets()),
                        N(h) && b.uploadImages(t.assets())
                    })
                })
            }),
            h.addCommand("mceInsertClipboardContent", function(t, e) {
                void 0 !== e.content ? p.pasteCustom(wd(e.content)) : void 0 !== e.text && g.pasteCustom(Id(e.text))
            });
            var v = Ta(m, "paste", function(t) {
                x || (x = h.selection.getBookmark(1)),
                (y.isText() ? g : p).paste(t.raw()),
                y.reset()
            });
            w.set(k.some(v)),
            lg.register(h)
        }),
        h.on("remove", function(t) {
            w.get().each(function(t) {
                return t.unbind()
            })
        })
    }
    var Lg, _g = function(t) {
        return tinymce.util.VK.metaKeyPressed(t) && 86 === t.keyCode && t.shiftKey
    };
    function Og(u) {
        return c(tinymce, "4.0.28") ? (e.error('The "powerpaste" plugin requires at least 4.0.28 version of TinyMCE.'),
        function() {}
        ) : function(n, t) {
            var e, r = !c(tinymce, "5.0.0"), o = function(e, n) {
                var r = $s(d(e))
                  , o = $s(!1);
                e.on("keydown", function(t) {
                    _g(t) && (o.set(!0),
                    tinymce.Env.ie && tinymce.Env.ie < 10 && (t.preventDefault(),
                    e.fire("paste", {})))
                });
                var i = function() {
                    var t = !r.get();
                    r.set(t),
                    e.fire("PastePlainTextToggle", {
                        state: t
                    }),
                    e.focus()
                };
                return {
                    buttonToggle: function(t) {
                        var e = !r.get();
                        n ? t.setActive(e) : this.active(e),
                        i()
                    },
                    toggle: i,
                    reset: function() {
                        o.set(!1)
                    },
                    isText: function() {
                        return o.get() || r.get()
                    }
                }
            }(n, r), i = function(e) {
                e.setActive(o.isText());
                var t = function(t) {
                    e.setActive(t.state)
                };
                return n.on("PastePlainTextToggle", t),
                function() {
                    return n.off("PastePlainTextToggle", t)
                }
            }, a = function() {
                var e = this;
                e.active(o.isText()),
                n.on("PastePlainTextToggle", function(t) {
                    e.active(t.state)
                })
            };
            tinymce.Env.ie && tinymce.Env.ie < 10 ? function(e, t, n) {
                var r, o, i = this, a = zr(e, cn.translate, !1), u = function(e) {
                    return function(t) {
                        e(t)
                    }
                };
                r = ma.getOnPasteFunction(e, a.showDialog, t),
                e.on("paste", u(r)),
                o = ma.getOnKeyDownFunction(e, a.showDialog, t),
                e.on("keydown", u(o)),
                e.addCommand("mceInsertClipboardContent", function(t, e) {
                    a.showDialog(e.content || e)
                }),
                e.settings.paste_preprocess && e.on("PastePreProcess", function(t) {
                    e.settings.paste_preprocess.call(i, i, t)
                })
            }(n, o) : (e = la(n),
            Ng(n, o, t, u, e, r),
            f(n) ? m(n) : Kr(n, 0, 0, e, r)),
            Sg.registerEvents(n),
            r ? (n.ui.registry.addToggleButton("pastetext", {
                icon: "paste-text",
                tooltip: "Paste as text",
                onAction: o.buttonToggle,
                onSetup: i
            }),
            n.ui.registry.addToggleMenuItem("pastetext", {
                icon: "paste-text",
                text: "Paste as text",
                selectable: !0,
                onAction: o.buttonToggle,
                onSetup: i
            })) : (n.addButton("pastetext", {
                icon: "pastetext",
                tooltip: "Paste as text",
                onclick: o.buttonToggle,
                onPostRender: a
            }),
            n.addMenuItem("pastetext", {
                text: "Paste as text",
                selectable: !0,
                onclick: o.buttonToggle,
                onPostRender: a
            })),
            s.register(n, o)
        }
    }
    tinymce.PluginManager.requireLangPack("powerpaste", "ar,ca,cs,da,de,el,es,fa,fi,fr_FR,he_IL,hr,hu_HU,it,ja,kk,ko_KR,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,zh_CN,zh_TW"),
    tinymce.PluginManager.add("powerpaste", Og(Lg))
}(window);
