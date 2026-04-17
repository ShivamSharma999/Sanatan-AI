/**
 * Lordicon - The icon animator
 */

var gr = Object.defineProperty, vr = Object.defineProperties;
var yr = Object.getOwnPropertyDescriptors;
var qi = Object.getOwnPropertySymbols;
var br = Object.prototype.hasOwnProperty, _r = Object.prototype.propertyIsEnumerable;
var hi = (t, e, i) => e in t ? gr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, ke = (t, e) => {
  for (var i in e || (e = {}))
    br.call(e, i) && hi(t, i, e[i]);
  if (qi)
    for (var i of qi(e))
      _r.call(e, i) && hi(t, i, e[i]);
  return t;
}, Hi = (t, e) => vr(t, yr(e));
var Et = (t, e, i) => hi(t, typeof e != "symbol" ? e + "" : e, i);
function Pr(t) {
  return document.createElement(t);
}
function st(t, e) {
  var i, s = t.length, r;
  for (i = 0; i < s; i += 1) {
    r = t[i].prototype;
    for (var a in r)
      Object.prototype.hasOwnProperty.call(r, a) && (e.prototype[a] = r[a]);
  }
}
function Ae(t, e) {
  return Object.getOwnPropertyDescriptor(t, e);
}
function kr(t) {
  function e() {
  }
  return e.prototype = t, e;
}
const rt = /* @__PURE__ */ function() {
  function t(i, s) {
    var r = 0, a = [], n;
    switch (i) {
      case "int16":
      case "uint8c":
        n = 1;
        break;
      default:
        n = 1.1;
        break;
    }
    for (r = 0; r < s; r += 1)
      a.push(n);
    return a;
  }
  function e(i, s) {
    return i === "float32" ? new Float32Array(s) : i === "int16" ? new Int16Array(s) : i === "uint8c" ? new Uint8ClampedArray(s) : t(i, s);
  }
  return typeof Uint8ClampedArray == "function" && typeof Float32Array == "function" ? e : t;
}();
function mt(t) {
  return Array.apply(null, { length: t });
}
let ds = !0, gs = null, vs = null, ys = "";
const Ft = Math.pow, Xi = Math.sqrt, Vt = Math.floor, Ar = Math.min, zt = {};
(function() {
  var t = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"], e, i = t.length;
  for (e = 0; e < i; e += 1)
    zt[t[e]] = Math[t[e]];
})();
zt.random = Math.random;
zt.abs = function(t) {
  var e = typeof t;
  if (e === "object" && t.length) {
    var i = mt(t.length), s, r = t.length;
    for (s = 0; s < r; s += 1)
      i[s] = Math.abs(t[s]);
    return i;
  }
  return Math.abs(t);
};
let bs = 150;
const lt = Math.PI / 180, Ut = 0.5519;
function mi(t, e, i, s) {
  this.type = t, this.currentTime = e, this.totalTime = i, this.direction = s < 0 ? -1 : 1;
}
function Ui(t, e) {
  this.type = t, this.direction = e < 0 ? -1 : 1;
}
function Wi(t, e, i, s) {
  this.type = t, this.currentLoop = i, this.totalLoops = e, this.direction = s < 0 ? -1 : 1;
}
function $i(t, e, i) {
  this.type = t, this.firstFrame = e, this.totalFrames = i;
}
function Yi(t, e) {
  this.type = t, this.target = e;
}
function Er(t, e) {
  this.type = "renderFrameError", this.nativeError = t, this.currentTime = e;
}
function wr(t) {
  this.type = "configError", this.nativeError = t;
}
const vt = /* @__PURE__ */ function() {
  var t = 0;
  return function() {
    return t += 1, ys + "__lottie_element_" + t;
  };
}(), Sr = function() {
  var t = [], e, i;
  for (e = 0; e < 256; e += 1)
    i = e.toString(16), t[e] = i.length === 1 ? "0" + i : i;
  return function(s, r, a) {
    return s < 0 && (s = 0), r < 0 && (r = 0), a < 0 && (a = 0), "#" + t[s] + t[r] + t[a];
  };
}(), xr = (t) => {
  ds = !!t;
}, Dr = () => ds, _s = (t) => {
  gs = t;
}, Ze = () => gs, Cr = (t) => {
  vs = t;
}, Mr = () => vs, Be = (t) => {
  bs = t;
}, qe = () => bs, Ir = (t) => {
  ys = t;
};
function Ps() {
}
Ps.prototype = {
  triggerEvent: function(t, e) {
    if (this._cbs[t])
      for (var i = this._cbs[t], s = 0; s < i.length; s += 1)
        i[s](e);
  },
  addEventListener: function(t, e) {
    return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e), function() {
      this.removeEventListener(t, e);
    }.bind(this);
  },
  removeEventListener: function(t, e) {
    if (!e)
      this._cbs[t] = null;
    else if (this._cbs[t]) {
      for (var i = 0, s = this._cbs[t].length; i < s; )
        this._cbs[t][i] === e && (this._cbs[t].splice(i, 1), i -= 1, s -= 1), i += 1;
      this._cbs[t].length || (this._cbs[t] = null);
    }
  }
};
let ks = "";
const He = -999999, Tr = (t) => {
  ks = t;
}, At = () => ks, Je = /* @__PURE__ */ function() {
  var t = 1, e = [], i, s, r = {
    onmessage: function() {
    },
    postMessage: function(c) {
      i({
        data: c
      });
    }
  }, a = {
    postMessage: function(c) {
      r.onmessage({
        data: c
      });
    }
  };
  function n(c) {
    return i = c, r;
  }
  function f() {
    s || (s = n(function(c) {
      function v() {
        function d(C, T) {
          var F, M, _ = C.length, w, I, z, nt;
          for (M = 0; M < _; M += 1)
            if (F = C[M], "ks" in F && !F.completed) {
              if (F.completed = !0, F.hasMask) {
                var Q = F.masksProperties;
                for (I = Q.length, w = 0; w < I; w += 1)
                  if (Q[w].pt.k.i)
                    m(Q[w].pt.k);
                  else
                    for (nt = Q[w].pt.k.length, z = 0; z < nt; z += 1)
                      Q[w].pt.k[z].s && m(Q[w].pt.k[z].s[0]), Q[w].pt.k[z].e && m(Q[w].pt.k[z].e[0]);
              }
              F.ty === 0 ? (F.layers = h(F.refId, T), d(F.layers, T)) : F.ty === 4 ? p(F.shapes) : F.ty === 5 && Y(F);
            }
        }
        function k(C, T) {
          if (C) {
            var F = 0, M = C.length;
            for (F = 0; F < M; F += 1)
              C[F].t === 1 && (C[F].data.layers = h(C[F].data.refId, T), d(C[F].data.layers, T));
          }
        }
        function l(C, T) {
          for (var F = 0, M = T.length; F < M; ) {
            if (T[F].id === C)
              return T[F];
            F += 1;
          }
          return null;
        }
        function h(C, T) {
          var F = l(C, T);
          return F ? F.layers.__used ? JSON.parse(JSON.stringify(F.layers)) : (F.layers.__used = !0, F.layers) : null;
        }
        function p(C) {
          var T, F = C.length, M, _;
          for (T = F - 1; T >= 0; T -= 1)
            if (C[T].ty === "sh")
              if (C[T].ks.k.i)
                m(C[T].ks.k);
              else
                for (_ = C[T].ks.k.length, M = 0; M < _; M += 1)
                  C[T].ks.k[M].s && m(C[T].ks.k[M].s[0]), C[T].ks.k[M].e && m(C[T].ks.k[M].e[0]);
            else C[T].ty === "gr" && p(C[T].it);
        }
        function m(C) {
          var T, F = C.i.length;
          for (T = 0; T < F; T += 1)
            C.i[T][0] += C.v[T][0], C.i[T][1] += C.v[T][1], C.o[T][0] += C.v[T][0], C.o[T][1] += C.v[T][1];
        }
        function b(C, T) {
          var F = T ? T.split(".") : [100, 100, 100];
          return C[0] > F[0] ? !0 : F[0] > C[0] ? !1 : C[1] > F[1] ? !0 : F[1] > C[1] ? !1 : C[2] > F[2] ? !0 : F[2] > C[2] ? !1 : null;
        }
        var E = /* @__PURE__ */ function() {
          var C = [4, 4, 14];
          function T(M) {
            var _ = M.t.d;
            M.t.d = {
              k: [
                {
                  s: _,
                  t: 0
                }
              ]
            };
          }
          function F(M) {
            var _, w = M.length;
            for (_ = 0; _ < w; _ += 1)
              M[_].ty === 5 && T(M[_]);
          }
          return function(M) {
            if (b(C, M.v) && (F(M.layers), M.assets)) {
              var _, w = M.assets.length;
              for (_ = 0; _ < w; _ += 1)
                M.assets[_].layers && F(M.assets[_].layers);
            }
          };
        }(), x = /* @__PURE__ */ function() {
          var C = [4, 7, 99];
          return function(T) {
            if (T.chars && !b(C, T.v)) {
              var F, M = T.chars.length;
              for (F = 0; F < M; F += 1) {
                var _ = T.chars[F];
                _.data && _.data.shapes && (p(_.data.shapes), _.data.ip = 0, _.data.op = 99999, _.data.st = 0, _.data.sr = 1, _.data.ks = {
                  p: { k: [0, 0], a: 0 },
                  s: { k: [100, 100], a: 0 },
                  a: { k: [0, 0], a: 0 },
                  r: { k: 0, a: 0 },
                  o: { k: 100, a: 0 }
                }, T.chars[F].t || (_.data.shapes.push(
                  {
                    ty: "no"
                  }
                ), _.data.shapes[0].it.push(
                  {
                    p: { k: [0, 0], a: 0 },
                    s: { k: [100, 100], a: 0 },
                    a: { k: [0, 0], a: 0 },
                    r: { k: 0, a: 0 },
                    o: { k: 100, a: 0 },
                    sk: { k: 0, a: 0 },
                    sa: { k: 0, a: 0 },
                    ty: "tr"
                  }
                )));
              }
            }
          };
        }(), S = /* @__PURE__ */ function() {
          var C = [5, 7, 15];
          function T(M) {
            var _ = M.t.p;
            typeof _.a == "number" && (_.a = {
              a: 0,
              k: _.a
            }), typeof _.p == "number" && (_.p = {
              a: 0,
              k: _.p
            }), typeof _.r == "number" && (_.r = {
              a: 0,
              k: _.r
            });
          }
          function F(M) {
            var _, w = M.length;
            for (_ = 0; _ < w; _ += 1)
              M[_].ty === 5 && T(M[_]);
          }
          return function(M) {
            if (b(C, M.v) && (F(M.layers), M.assets)) {
              var _, w = M.assets.length;
              for (_ = 0; _ < w; _ += 1)
                M.assets[_].layers && F(M.assets[_].layers);
            }
          };
        }(), O = /* @__PURE__ */ function() {
          var C = [4, 1, 9];
          function T(M) {
            var _, w = M.length, I, z;
            for (_ = 0; _ < w; _ += 1)
              if (M[_].ty === "gr")
                T(M[_].it);
              else if (M[_].ty === "fl" || M[_].ty === "st")
                if (M[_].c.k && M[_].c.k[0].i)
                  for (z = M[_].c.k.length, I = 0; I < z; I += 1)
                    M[_].c.k[I].s && (M[_].c.k[I].s[0] /= 255, M[_].c.k[I].s[1] /= 255, M[_].c.k[I].s[2] /= 255, M[_].c.k[I].s[3] /= 255), M[_].c.k[I].e && (M[_].c.k[I].e[0] /= 255, M[_].c.k[I].e[1] /= 255, M[_].c.k[I].e[2] /= 255, M[_].c.k[I].e[3] /= 255);
                else
                  M[_].c.k[0] /= 255, M[_].c.k[1] /= 255, M[_].c.k[2] /= 255, M[_].c.k[3] /= 255;
          }
          function F(M) {
            var _, w = M.length;
            for (_ = 0; _ < w; _ += 1)
              M[_].ty === 4 && T(M[_].shapes);
          }
          return function(M) {
            if (b(C, M.v) && (F(M.layers), M.assets)) {
              var _, w = M.assets.length;
              for (_ = 0; _ < w; _ += 1)
                M.assets[_].layers && F(M.assets[_].layers);
            }
          };
        }(), j = /* @__PURE__ */ function() {
          var C = [4, 4, 18];
          function T(M) {
            var _, w = M.length, I, z;
            for (_ = w - 1; _ >= 0; _ -= 1)
              if (M[_].ty === "sh")
                if (M[_].ks.k.i)
                  M[_].ks.k.c = M[_].closed;
                else
                  for (z = M[_].ks.k.length, I = 0; I < z; I += 1)
                    M[_].ks.k[I].s && (M[_].ks.k[I].s[0].c = M[_].closed), M[_].ks.k[I].e && (M[_].ks.k[I].e[0].c = M[_].closed);
              else M[_].ty === "gr" && T(M[_].it);
          }
          function F(M) {
            var _, w, I = M.length, z, nt, Q, pt;
            for (w = 0; w < I; w += 1) {
              if (_ = M[w], _.hasMask) {
                var A = _.masksProperties;
                for (nt = A.length, z = 0; z < nt; z += 1)
                  if (A[z].pt.k.i)
                    A[z].pt.k.c = A[z].cl;
                  else
                    for (pt = A[z].pt.k.length, Q = 0; Q < pt; Q += 1)
                      A[z].pt.k[Q].s && (A[z].pt.k[Q].s[0].c = A[z].cl), A[z].pt.k[Q].e && (A[z].pt.k[Q].e[0].c = A[z].cl);
              }
              _.ty === 4 && T(_.shapes);
            }
          }
          return function(M) {
            if (b(C, M.v) && (F(M.layers), M.assets)) {
              var _, w = M.assets.length;
              for (_ = 0; _ < w; _ += 1)
                M.assets[_].layers && F(M.assets[_].layers);
            }
          };
        }();
        function X(C) {
          C.__complete || (O(C), E(C), x(C), S(C), j(C), d(C.layers, C.assets), k(C.chars, C.assets), C.__complete = !0);
        }
        function Y(C) {
          C.t.a.length === 0 && "m" in C.t.p;
        }
        var L = {};
        return L.completeData = X, L.checkColors = O, L.checkChars = x, L.checkPathProperties = S, L.checkShapes = j, L.completeLayers = d, L;
      }
      if (a.dataManager || (a.dataManager = v()), a.assetLoader || (a.assetLoader = /* @__PURE__ */ function() {
        function d(l) {
          var h = l.getResponseHeader("content-type");
          return h && l.responseType === "json" && h.indexOf("json") !== -1 || l.response && typeof l.response == "object" ? l.response : l.response && typeof l.response == "string" ? JSON.parse(l.response) : l.responseText ? JSON.parse(l.responseText) : null;
        }
        function k(l, h, p, m) {
          var b, E = new XMLHttpRequest();
          try {
            E.responseType = "json";
          } catch (x) {
          }
          E.onreadystatechange = function() {
            if (E.readyState === 4)
              if (E.status === 200)
                b = d(E), p(b);
              else
                try {
                  b = d(E), p(b);
                } catch (x) {
                  m && m(x);
                }
          };
          try {
            E.open(["G", "E", "T"].join(""), l, !0);
          } catch (x) {
            E.open(["G", "E", "T"].join(""), h + "/" + l, !0);
          }
          E.send();
        }
        return {
          load: k
        };
      }()), c.data.type === "loadAnimation")
        a.assetLoader.load(
          c.data.path,
          c.data.fullPath,
          function(d) {
            a.dataManager.completeData(d), a.postMessage({
              id: c.data.id,
              payload: d,
              status: "success"
            });
          },
          function() {
            a.postMessage({
              id: c.data.id,
              status: "error"
            });
          }
        );
      else if (c.data.type === "complete") {
        var g = c.data.animation;
        a.dataManager.completeData(g), a.postMessage({
          id: c.data.id,
          payload: g,
          status: "success"
        });
      } else c.data.type === "loadData" && a.assetLoader.load(
        c.data.path,
        c.data.fullPath,
        function(d) {
          a.postMessage({
            id: c.data.id,
            payload: d,
            status: "success"
          });
        },
        function() {
          a.postMessage({
            id: c.data.id,
            status: "error"
          });
        }
      );
    }), s.onmessage = function(c) {
      var v = c.data, g = v.id, d = e[g];
      e[g] = null, v.status === "success" ? d.onComplete(v.payload) : d.onError && d.onError();
    });
  }
  function o(c, v) {
    t += 1;
    var g = "processId_" + t;
    return e[g] = {
      onComplete: c,
      onError: v
    }, g;
  }
  function u(c, v, g) {
    f();
    var d = o(v, g);
    s.postMessage({
      type: "loadAnimation",
      path: c,
      fullPath: window.location.origin + window.location.pathname,
      id: d
    });
  }
  function y(c, v, g) {
    f();
    var d = o(v, g);
    s.postMessage({
      type: "loadData",
      path: c,
      fullPath: window.location.origin + window.location.pathname,
      id: d
    });
  }
  function P(c, v, g) {
    f();
    var d = o(v, g);
    s.postMessage({
      type: "complete",
      animation: c,
      id: d
    });
  }
  return {
    loadAnimation: u,
    loadData: y,
    completeAnimation: P
  };
}(), Fr = /* @__PURE__ */ function() {
  function t(e) {
    for (var i = e.split(`\r
`), s = {}, r, a = 0, n = 0; n < i.length; n += 1)
      r = i[n].split(":"), r.length === 2 && (s[r[0]] = r[1].trim(), a += 1);
    if (a === 0)
      throw new Error();
    return s;
  }
  return function(e) {
    for (var i = [], s = 0; s < e.length; s += 1) {
      var r = e[s], a = {
        time: r.tm,
        duration: r.dr
      };
      try {
        a.payload = JSON.parse(e[s].cm);
      } catch (n) {
        try {
          a.payload = t(e[s].cm);
        } catch (f) {
          a.payload = {
            name: e[s].cm
          };
        }
      }
      i.push(a);
    }
    return i;
  };
}(), Vr = /* @__PURE__ */ function() {
  function t(e) {
    this.compositions.push(e);
  }
  return function() {
    function e(i) {
      for (var s = 0, r = this.compositions.length; s < r; ) {
        if (this.compositions[s].data && this.compositions[s].data.nm === i)
          return this.compositions[s].prepareFrame && this.compositions[s].data.xt && this.compositions[s].prepareFrame(this.currentFrame), this.compositions[s].compInterface;
        s += 1;
      }
      return null;
    }
    return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e;
  };
}(), xe = {}, Lr = (t, e) => {
  xe[t] = e;
};
function Rr(t) {
  return xe[t];
}
function Or() {
  if (xe.canvas)
    return "canvas";
  for (const t in xe)
    if (xe[t])
      return t;
  return "";
}
const J = function() {
  this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = vt(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.isSubframeEnabled = Dr(), this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = Vr(), this.markers = [], this.configAnimation = this.configAnimation.bind(this), this.onSetupError = this.onSetupError.bind(this), this.onSegmentComplete = this.onSegmentComplete.bind(this), this.drawnFrameEvent = new mi("drawnFrame", 0, 0, 0), this.expressionsPlugin = Ze();
};
st([Ps], J);
J.prototype.setParams = function(t) {
  (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
  var e = "svg";
  t.animType ? e = t.animType : t.renderer && (e = t.renderer);
  const i = Rr(e);
  this.renderer = new i(this, t.rendererSettings), this.renderer.setProjectInterface(this.projectInterface), this.animType = e, t.loop === "" || t.loop === null || t.loop === void 0 || t.loop === !0 ? this.loop = !0 : t.loop === !1 ? this.loop = !1 : this.loop = parseInt(t.loop, 10), this.autoplay = "autoplay" in t ? t.autoplay : !0, this.name = t.name ? t.name : "", this.autoloadSegments = Object.prototype.hasOwnProperty.call(t, "autoloadSegments") ? t.autoloadSegments : !0, this.assetsPath = t.assetsPath, this.initialSegment = t.initialSegment, t.animationData ? this.setupAnimation(t.animationData) : t.path && (t.path.lastIndexOf("\\") !== -1 ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), Je.loadAnimation(
    t.path,
    this.configAnimation,
    this.onSetupError
  ));
};
J.prototype.onSetupError = function() {
  this.trigger("data_failed");
};
J.prototype.setupAnimation = function(t) {
  Je.completeAnimation(
    t,
    this.configAnimation
  );
};
J.prototype.setData = function(t, e) {
  e && typeof e != "object" && (e = JSON.parse(e));
  var i = {
    wrapper: t,
    animationData: e
  }, s = t.attributes;
  i.path = s.getNamedItem("data-animation-path") ? s.getNamedItem("data-animation-path").value : s.getNamedItem("data-bm-path") ? s.getNamedItem("data-bm-path").value : s.getNamedItem("bm-path") ? s.getNamedItem("bm-path").value : "", i.animType = s.getNamedItem("data-anim-type") ? s.getNamedItem("data-anim-type").value : s.getNamedItem("data-bm-type") ? s.getNamedItem("data-bm-type").value : s.getNamedItem("bm-type") ? s.getNamedItem("bm-type").value : s.getNamedItem("data-bm-renderer") ? s.getNamedItem("data-bm-renderer").value : s.getNamedItem("bm-renderer") ? s.getNamedItem("bm-renderer").value : Or() || "canvas";
  var r = s.getNamedItem("data-anim-loop") ? s.getNamedItem("data-anim-loop").value : s.getNamedItem("data-bm-loop") ? s.getNamedItem("data-bm-loop").value : s.getNamedItem("bm-loop") ? s.getNamedItem("bm-loop").value : "";
  r === "false" ? i.loop = !1 : r === "true" ? i.loop = !0 : r !== "" && (i.loop = parseInt(r, 10));
  var a = s.getNamedItem("data-anim-autoplay") ? s.getNamedItem("data-anim-autoplay").value : s.getNamedItem("data-bm-autoplay") ? s.getNamedItem("data-bm-autoplay").value : s.getNamedItem("bm-autoplay") ? s.getNamedItem("bm-autoplay").value : !0;
  i.autoplay = a !== "false", i.name = s.getNamedItem("data-name") ? s.getNamedItem("data-name").value : s.getNamedItem("data-bm-name") ? s.getNamedItem("data-bm-name").value : s.getNamedItem("bm-name") ? s.getNamedItem("bm-name").value : "";
  var n = s.getNamedItem("data-anim-prerender") ? s.getNamedItem("data-anim-prerender").value : s.getNamedItem("data-bm-prerender") ? s.getNamedItem("data-bm-prerender").value : s.getNamedItem("bm-prerender") ? s.getNamedItem("bm-prerender").value : "";
  n === "false" && (i.prerender = !1), i.path ? this.setParams(i) : this.trigger("destroy");
};
J.prototype.includeLayers = function(t) {
  t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
  var e = this.animationData.layers, i, s = e.length, r = t.layers, a, n = r.length;
  for (a = 0; a < n; a += 1)
    for (i = 0; i < s; ) {
      if (e[i].id === r[a].id) {
        e[i] = r[a];
        break;
      }
      i += 1;
    }
  if (t.assets)
    for (s = t.assets.length, i = 0; i < s; i += 1)
      this.animationData.assets.push(t.assets[i]);
  this.animationData.__complete = !1, Je.completeAnimation(
    this.animationData,
    this.onSegmentComplete
  );
};
J.prototype.onSegmentComplete = function(t) {
  this.animationData = t;
  var e = Ze();
  e && e.initExpressions(this), this.loadNextSegment();
};
J.prototype.loadNextSegment = function() {
  var t = this.animationData.segments;
  if (!t || t.length === 0 || !this.autoloadSegments) {
    this.trigger("data_ready"), this.timeCompleted = this.totalFrames;
    return;
  }
  var e = t.shift();
  this.timeCompleted = e.time * this.frameRate;
  var i = this.path + this.fileName + "_" + this.segmentPos + ".json";
  this.segmentPos += 1, Je.loadData(i, this.includeLayers.bind(this), function() {
    this.trigger("data_failed");
  }.bind(this));
};
J.prototype.loadSegments = function() {
  var t = this.animationData.segments;
  t || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
};
J.prototype.configAnimation = function(t) {
  if (this.renderer)
    try {
      this.animationData = t, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.markers = Fr(t.markers || []), this.trigger("config_ready"), this.loadSegments(), this.updaFrameModifier(), this.checkLoaded();
    } catch (e) {
      this.triggerConfigError(e);
    }
};
J.prototype.checkLoaded = function() {
  if (!this.isLoaded) {
    this.isLoaded = !0;
    var t = Ze();
    t && t.initExpressions(this), this.renderer.initItems(), setTimeout(function() {
      this.trigger("DOMLoaded");
    }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play();
  }
};
J.prototype.resize = function(t, e) {
  var i = typeof t == "number" ? t : void 0, s = typeof e == "number" ? e : void 0;
  this.renderer.updateContainerSize(i, s);
};
J.prototype.setSubframe = function(t) {
  this.isSubframeEnabled = !!t;
};
J.prototype.gotoFrame = function() {
  this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame(), this.trigger("drawnFrame");
};
J.prototype.renderFrame = function() {
  if (!(this.isLoaded === !1 || !this.renderer))
    try {
      this.expressionsPlugin && this.expressionsPlugin.resetFrame(), this.renderer.renderFrame(this.currentFrame + this.firstFrame);
    } catch (t) {
      this.triggerRenderFrameError(t);
    }
};
J.prototype.play = function(t) {
  t && this.name !== t || this.isPaused === !0 && (this.isPaused = !1, this.trigger("_play"), this._idle && (this._idle = !1, this.trigger("_active")));
};
J.prototype.pause = function(t) {
  t && this.name !== t || this.isPaused === !1 && (this.isPaused = !0, this.trigger("_pause"), this._idle = !0, this.trigger("_idle"));
};
J.prototype.togglePause = function(t) {
  t && this.name !== t || (this.isPaused === !0 ? this.play() : this.pause());
};
J.prototype.stop = function(t) {
  t && this.name !== t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0));
};
J.prototype.getMarkerData = function(t) {
  for (var e, i = 0; i < this.markers.length; i += 1)
    if (e = this.markers[i], e.payload && e.payload.name === t)
      return e;
  return null;
};
J.prototype.goToAndStop = function(t, e, i) {
  if (!(i && this.name !== i)) {
    var s = Number(t);
    if (isNaN(s)) {
      var r = this.getMarkerData(t);
      r && this.goToAndStop(r.time, !0);
    } else e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier);
    this.pause();
  }
};
J.prototype.goToAndPlay = function(t, e, i) {
  if (!(i && this.name !== i)) {
    var s = Number(t);
    if (isNaN(s)) {
      var r = this.getMarkerData(t);
      r && (r.duration ? this.playSegments([r.time, r.time + r.duration], !0) : this.goToAndStop(r.time, !0));
    } else
      this.goToAndStop(s, e, i);
    this.play();
  }
};
J.prototype.advanceTime = function(t) {
  if (!(this.isPaused === !0 || this.isLoaded === !1)) {
    var e = this.currentRawFrame + t * this.frameModifier, i = !1;
    e >= this.totalFrames - 1 && this.frameModifier > 0 ? !this.loop || this.playCount === this.loop ? this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (i = !0, e = this.totalFrames - 1) : e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : e < 0 ? this.checkSegments(e % this.totalFrames) || (this.loop && !(this.playCount-- <= 0 && this.loop !== !0) ? (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0) : (i = !0, e = 0)) : this.setCurrentRawFrameValue(e), i && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"));
  }
};
J.prototype.adjustSegment = function(t, e) {
  this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.totalFrames = t[0] - t[1], this.timeCompleted = this.totalFrames, this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - 1e-3 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.totalFrames = t[1] - t[0], this.timeCompleted = this.totalFrames, this.firstFrame = t[0], this.setCurrentRawFrameValue(1e-3 + e)), this.trigger("segmentStart");
};
J.prototype.setSegment = function(t, e) {
  var i = -1;
  this.isPaused && (this.currentRawFrame + this.firstFrame < t ? i = t : this.currentRawFrame + this.firstFrame > e && (i = e - t)), this.firstFrame = t, this.totalFrames = e - t, this.timeCompleted = this.totalFrames, i !== -1 && this.goToAndStop(i, !0);
};
J.prototype.playSegments = function(t, e) {
  if (e && (this.segments.length = 0), typeof t[0] == "object") {
    var i, s = t.length;
    for (i = 0; i < s; i += 1)
      this.segments.push(t[i]);
  } else
    this.segments.push(t);
  this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
};
J.prototype.resetSegments = function(t) {
  this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0);
};
J.prototype.checkSegments = function(t) {
  return this.segments.length ? (this.adjustSegment(this.segments.shift(), t), !0) : !1;
};
J.prototype.destroy = function(t) {
  t && this.name !== t || !this.renderer || (this.renderer.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = null, this.onLoopComplete = null, this.onComplete = null, this.onSegmentStart = null, this.onDestroy = null, this.renderer = null, this.expressionsPlugin = null, this.projectInterface = null);
};
J.prototype.setCurrentRawFrameValue = function(t) {
  this.currentRawFrame = t, this.gotoFrame();
};
J.prototype.setSpeed = function(t) {
  this.playSpeed = t, this.updaFrameModifier();
};
J.prototype.setDirection = function(t) {
  this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier();
};
J.prototype.setLoop = function(t) {
  this.loop = t;
};
J.prototype.updaFrameModifier = function() {
  this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
};
J.prototype.getPath = function() {
  return this.path;
};
J.prototype.getAssetsPath = function(t) {
  var e = "";
  return t.e ? e = t.p : (e = this.path, e += t.u ? t.u : "", e += t.p), e;
};
J.prototype.getAssetData = function(t) {
  for (var e = 0, i = this.assets.length; e < i; ) {
    if (t === this.assets[e].id)
      return this.assets[e];
    e += 1;
  }
  return null;
};
J.prototype.hide = function() {
  this.renderer.hide();
};
J.prototype.show = function() {
  this.renderer.show();
};
J.prototype.getDuration = function(t) {
  return t ? this.totalFrames : this.totalFrames / this.frameRate;
};
J.prototype.updateDocumentData = function(t, e, i) {
  try {
    var s = this.renderer.getElementByPath(t);
    s.updateDocumentData(e, i);
  } catch (r) {
  }
};
J.prototype.trigger = function(t) {
  if (this._cbs && this._cbs[t])
    switch (t) {
      case "enterFrame":
        this.triggerEvent(t, new mi(t, this.currentFrame, this.totalFrames, this.frameModifier));
        break;
      case "drawnFrame":
        this.drawnFrameEvent.currentTime = this.currentFrame, this.drawnFrameEvent.totalTime = this.totalFrames, this.drawnFrameEvent.direction = this.frameModifier, this.triggerEvent(t, this.drawnFrameEvent);
        break;
      case "loopComplete":
        this.triggerEvent(t, new Wi(t, this.loop, this.playCount, this.frameMult));
        break;
      case "complete":
        this.triggerEvent(t, new Ui(t, this.frameMult));
        break;
      case "segmentStart":
        this.triggerEvent(t, new $i(t, this.firstFrame, this.totalFrames));
        break;
      case "destroy":
        this.triggerEvent(t, new Yi(t, this));
        break;
      default:
        this.triggerEvent(t);
    }
  t === "enterFrame" && this.onEnterFrame && this.onEnterFrame.call(this, new mi(t, this.currentFrame, this.totalFrames, this.frameMult)), t === "loopComplete" && this.onLoopComplete && this.onLoopComplete.call(this, new Wi(t, this.loop, this.playCount, this.frameMult)), t === "complete" && this.onComplete && this.onComplete.call(this, new Ui(t, this.frameMult)), t === "segmentStart" && this.onSegmentStart && this.onSegmentStart.call(this, new $i(t, this.firstFrame, this.totalFrames)), t === "destroy" && this.onDestroy && this.onDestroy.call(this, new Yi(t, this));
};
J.prototype.triggerRenderFrameError = function(t) {
  var e = new Er(t, this.currentFrame);
  this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
};
J.prototype.triggerConfigError = function(t) {
  var e = new wr(t, this.currentFrame);
  this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
};
const Pt = function() {
  var t = {}, e = [], i = 0, s = 0, r = 0, a = !0, n = !1;
  function f(L) {
    for (var C = 0, T = L.target; C < s; )
      e[C].animation === T && (e.splice(C, 1), C -= 1, s -= 1, T.isPaused || P()), C += 1;
  }
  function o(L, C) {
    if (!L)
      return null;
    for (var T = 0; T < s; ) {
      if (e[T].elem === L && e[T].elem !== null)
        return e[T].animation;
      T += 1;
    }
    var F = new J();
    return c(F, L), F.setData(L, C), F;
  }
  function u() {
    var L, C = e.length, T = [];
    for (L = 0; L < C; L += 1)
      T.push(e[L].animation);
    return T;
  }
  function y() {
    r += 1, j();
  }
  function P() {
    r -= 1;
  }
  function c(L, C) {
    L.addEventListener("destroy", f), L.addEventListener("_active", y), L.addEventListener("_idle", P), e.push({ elem: C, animation: L }), s += 1;
  }
  function v(L) {
    var C = new J();
    return c(C, null), C.setParams(L), C;
  }
  function g(L, C) {
    var T;
    for (T = 0; T < s; T += 1)
      e[T].animation.setSpeed(L, C);
  }
  function d(L, C) {
    var T;
    for (T = 0; T < s; T += 1)
      e[T].animation.setDirection(L, C);
  }
  function k(L) {
    var C;
    for (C = 0; C < s; C += 1)
      e[C].animation.play(L);
  }
  function l(L) {
    var C = L - i, T;
    for (T = 0; T < s; T += 1)
      e[T].animation.advanceTime(C);
    i = L, r && !n ? window.requestAnimationFrame(l) : a = !0;
  }
  function h(L) {
    i = L, window.requestAnimationFrame(l);
  }
  function p(L) {
    var C;
    for (C = 0; C < s; C += 1)
      e[C].animation.pause(L);
  }
  function m(L, C, T) {
    var F;
    for (F = 0; F < s; F += 1)
      e[F].animation.goToAndStop(L, C, T);
  }
  function b(L) {
    var C;
    for (C = 0; C < s; C += 1)
      e[C].animation.stop(L);
  }
  function E(L) {
    var C;
    for (C = 0; C < s; C += 1)
      e[C].animation.togglePause(L);
  }
  function x(L) {
    var C;
    for (C = s - 1; C >= 0; C -= 1)
      e[C].animation.destroy(L);
  }
  function S(L, C, T) {
    var F = [].concat(
      [].slice.call(document.getElementsByClassName("lottie")),
      [].slice.call(document.getElementsByClassName("bodymovin"))
    ), M, _ = F.length;
    for (M = 0; M < _; M += 1)
      T && F[M].setAttribute("data-bm-type", T), o(F[M], L);
    if (C && _ === 0) {
      T || (T = "svg");
      var w = document.getElementsByTagName("body")[0];
      w.innerText = "";
      var I = Pr("div");
      I.style.width = "100%", I.style.height = "100%", I.setAttribute("data-bm-type", T), w.appendChild(I), o(I, L);
    }
  }
  function O() {
    var L;
    for (L = 0; L < s; L += 1)
      e[L].animation.resize();
  }
  function j() {
    !n && r && a && (window.requestAnimationFrame(h), a = !1);
  }
  function X() {
    n = !0;
  }
  function Y() {
    n = !1, j();
  }
  return t.registerAnimation = o, t.loadAnimation = v, t.setSpeed = g, t.setDirection = d, t.play = k, t.pause = p, t.stop = b, t.togglePause = E, t.searchAnimations = S, t.resize = O, t.goToAndStop = m, t.destroy = x, t.freeze = X, t.unfreeze = Y, t.getRegisteredAnimations = u, t;
}(), re = function() {
  var t = {};
  t.getBezierEasing = i;
  var e = {};
  function i(h, p, m, b, E) {
    var x = E || ("bez_" + h + "_" + p + "_" + m + "_" + b).replace(/\./g, "p");
    if (e[x])
      return e[x];
    var S = new l([h, p, m, b]);
    return e[x] = S, S;
  }
  var s = 4, r = 1e-3, a = 1e-7, n = 10, f = 11, o = 1 / (f - 1), u = typeof Float32Array == "function";
  function y(h, p) {
    return 1 - 3 * p + 3 * h;
  }
  function P(h, p) {
    return 3 * p - 6 * h;
  }
  function c(h) {
    return 3 * h;
  }
  function v(h, p, m) {
    return ((y(p, m) * h + P(p, m)) * h + c(p)) * h;
  }
  function g(h, p, m) {
    return 3 * y(p, m) * h * h + 2 * P(p, m) * h + c(p);
  }
  function d(h, p, m, b, E) {
    var x, S, O = 0;
    do
      S = p + (m - p) / 2, x = v(S, b, E) - h, x > 0 ? m = S : p = S;
    while (Math.abs(x) > a && ++O < n);
    return S;
  }
  function k(h, p, m, b) {
    for (var E = 0; E < s; ++E) {
      var x = g(p, m, b);
      if (x === 0) return p;
      var S = v(p, m, b) - h;
      p -= S / x;
    }
    return p;
  }
  function l(h) {
    this._p = h, this._mSampleValues = u ? new Float32Array(f) : new Array(f), this._precomputed = !1, this.get = this.get.bind(this);
  }
  return l.prototype = {
    get: function(h) {
      var p = this._p[0], m = this._p[1], b = this._p[2], E = this._p[3];
      return this._precomputed || this._precompute(), p === m && b === E ? h : h === 0 ? 0 : h === 1 ? 1 : v(this._getTForX(h), m, E);
    },
    // Private part
    _precompute: function() {
      var h = this._p[0], p = this._p[1], m = this._p[2], b = this._p[3];
      this._precomputed = !0, (h !== p || m !== b) && this._calcSampleValues();
    },
    _calcSampleValues: function() {
      for (var h = this._p[0], p = this._p[2], m = 0; m < f; ++m)
        this._mSampleValues[m] = v(m * o, h, p);
    },
    /**
         * getTForX chose the fastest heuristic to determine the percentage value precisely from a given X projection.
         */
    _getTForX: function(h) {
      for (var p = this._p[0], m = this._p[2], b = this._mSampleValues, E = 0, x = 1, S = f - 1; x !== S && b[x] <= h; ++x)
        E += o;
      --x;
      var O = (h - b[x]) / (b[x + 1] - b[x]), j = E + O * o, X = g(j, p, m);
      return X >= r ? k(h, j, p, m) : X === 0 ? j : d(h, E, E + o, p, m);
    }
  }, t;
}(), As = /* @__PURE__ */ function() {
  function t(e) {
    return e.concat(mt(e.length));
  }
  return {
    double: t
  };
}(), Ke = /* @__PURE__ */ function() {
  return function(t, e, i) {
    var s = 0, r = t, a = mt(r), n = {
      newElement: f,
      release: o
    };
    function f() {
      var u;
      return s ? (s -= 1, u = a[s]) : u = e(), u;
    }
    function o(u) {
      s === r && (a = As.double(a), r *= 2), i && i(u), a[s] = u, s += 1;
    }
    return n;
  };
}(), Es = function() {
  function t() {
    return {
      addedLength: 0,
      percents: rt("float32", qe()),
      lengths: rt("float32", qe())
    };
  }
  return Ke(8, t);
}(), ws = function() {
  function t() {
    return {
      lengths: [],
      totalLength: 0
    };
  }
  function e(i) {
    var s, r = i.lengths.length;
    for (s = 0; s < r; s += 1)
      Es.release(i.lengths[s]);
    i.lengths.length = 0;
  }
  return Ke(8, t, e);
}();
function zr() {
  var t = Math;
  function e(c, v, g, d, k, l) {
    var h = c * d + v * k + g * l - k * d - l * c - g * v;
    return h > -1e-3 && h < 1e-3;
  }
  function i(c, v, g, d, k, l, h, p, m) {
    if (g === 0 && l === 0 && m === 0)
      return e(c, v, d, k, h, p);
    var b = t.sqrt(t.pow(d - c, 2) + t.pow(k - v, 2) + t.pow(l - g, 2)), E = t.sqrt(t.pow(h - c, 2) + t.pow(p - v, 2) + t.pow(m - g, 2)), x = t.sqrt(t.pow(h - d, 2) + t.pow(p - k, 2) + t.pow(m - l, 2)), S;
    return b > E ? b > x ? S = b - E - x : S = x - E - b : x > E ? S = x - E - b : S = E - b - x, S > -1e-4 && S < 1e-4;
  }
  var s = /* @__PURE__ */ function() {
    return function(c, v, g, d) {
      var k = qe(), l, h, p, m, b, E = 0, x, S = [], O = [], j = Es.newElement();
      for (p = g.length, l = 0; l < k; l += 1) {
        for (b = l / (k - 1), x = 0, h = 0; h < p; h += 1)
          m = Ft(1 - b, 3) * c[h] + 3 * Ft(1 - b, 2) * b * g[h] + 3 * (1 - b) * Ft(b, 2) * d[h] + Ft(b, 3) * v[h], S[h] = m, O[h] !== null && (x += Ft(S[h] - O[h], 2)), O[h] = S[h];
        x && (x = Xi(x), E += x), j.percents[l] = b, j.lengths[l] = E;
      }
      return j.addedLength = E, j;
    };
  }();
  function r(c) {
    var v = ws.newElement(), g = c.c, d = c.v, k = c.o, l = c.i, h, p = c._length, m = v.lengths, b = 0;
    for (h = 0; h < p - 1; h += 1)
      m[h] = s(d[h], d[h + 1], k[h], l[h + 1]), b += m[h].addedLength;
    return g && p && (m[h] = s(d[h], d[0], k[h], l[0]), b += m[h].addedLength), v.totalLength = b, v;
  }
  function a(c) {
    this.segmentLength = 0, this.points = new Array(c);
  }
  function n(c, v) {
    this.partialLength = c, this.point = v;
  }
  var f = /* @__PURE__ */ function() {
    var c = {};
    return function(v, g, d, k) {
      var l = (v[0] + "_" + v[1] + "_" + g[0] + "_" + g[1] + "_" + d[0] + "_" + d[1] + "_" + k[0] + "_" + k[1]).replace(/\./g, "p");
      if (!c[l]) {
        var h = qe(), p, m, b, E, x, S = 0, O, j, X = null;
        v.length === 2 && (v[0] !== g[0] || v[1] !== g[1]) && e(v[0], v[1], g[0], g[1], v[0] + d[0], v[1] + d[1]) && e(v[0], v[1], g[0], g[1], g[0] + k[0], g[1] + k[1]) && (h = 2);
        var Y = new a(h);
        for (b = d.length, p = 0; p < h; p += 1) {
          for (j = mt(b), x = p / (h - 1), O = 0, m = 0; m < b; m += 1)
            E = Ft(1 - x, 3) * v[m] + 3 * Ft(1 - x, 2) * x * (v[m] + d[m]) + 3 * (1 - x) * Ft(x, 2) * (g[m] + k[m]) + Ft(x, 3) * g[m], j[m] = E, X !== null && (O += Ft(j[m] - X[m], 2));
          O = Xi(O), S += O, Y.points[p] = new n(O, j), X = j;
        }
        Y.segmentLength = S, c[l] = Y;
      }
      return c[l];
    };
  }();
  function o(c, v) {
    var g = v.percents, d = v.lengths, k = g.length, l = Vt((k - 1) * c), h = c * v.addedLength, p = 0;
    if (l === k - 1 || l === 0 || h === d[l])
      return g[l];
    for (var m = d[l] > h ? -1 : 1, b = !0; b; )
      if (d[l] <= h && d[l + 1] > h ? (p = (h - d[l]) / (d[l + 1] - d[l]), b = !1) : l += m, l < 0 || l >= k - 1) {
        if (l === k - 1)
          return g[l];
        b = !1;
      }
    return g[l] + (g[l + 1] - g[l]) * p;
  }
  function u(c, v, g, d, k, l) {
    var h = o(k, l), p = 1 - h, m = t.round((p * p * p * c[0] + (h * p * p + p * h * p + p * p * h) * g[0] + (h * h * p + p * h * h + h * p * h) * d[0] + h * h * h * v[0]) * 1e3) / 1e3, b = t.round((p * p * p * c[1] + (h * p * p + p * h * p + p * p * h) * g[1] + (h * h * p + p * h * h + h * p * h) * d[1] + h * h * h * v[1]) * 1e3) / 1e3;
    return [m, b];
  }
  var y = rt("float32", 8);
  function P(c, v, g, d, k, l, h) {
    k < 0 ? k = 0 : k > 1 && (k = 1);
    var p = o(k, h);
    l = l > 1 ? 1 : l;
    var m = o(l, h), b, E = c.length, x = 1 - p, S = 1 - m, O = x * x * x, j = p * x * x * 3, X = p * p * x * 3, Y = p * p * p, L = x * x * S, C = p * x * S + x * p * S + x * x * m, T = p * p * S + x * p * m + p * x * m, F = p * p * m, M = x * S * S, _ = p * S * S + x * m * S + x * S * m, w = p * m * S + x * m * m + p * S * m, I = p * m * m, z = S * S * S, nt = m * S * S + S * m * S + S * S * m, Q = m * m * S + S * m * m + m * S * m, pt = m * m * m;
    for (b = 0; b < E; b += 1)
      y[b * 4] = t.round((O * c[b] + j * g[b] + X * d[b] + Y * v[b]) * 1e3) / 1e3, y[b * 4 + 1] = t.round((L * c[b] + C * g[b] + T * d[b] + F * v[b]) * 1e3) / 1e3, y[b * 4 + 2] = t.round((M * c[b] + _ * g[b] + w * d[b] + I * v[b]) * 1e3) / 1e3, y[b * 4 + 3] = t.round((z * c[b] + nt * g[b] + Q * d[b] + pt * v[b]) * 1e3) / 1e3;
    return y;
  }
  return {
    getSegmentsLength: r,
    getNewSegment: P,
    getPointInSegment: u,
    buildBezierData: f,
    pointOnLine2D: e,
    pointOnLine3D: i
  };
}
const Lt = zr();
var ae = He, Zi = Math.abs;
function Ss(t, e) {
  var i = this.offsetTime, s;
  this.propType === "multidimensional" && (s = rt("float32", this.pv.length));
  for (var r = e.lastIndex, a = r, n = this.keyframes.length - 1, f = !0, o, u, y; f; ) {
    if (o = this.keyframes[a], u = this.keyframes[a + 1], a === n - 1 && t >= u.t - i) {
      o.h && (o = u), r = 0;
      break;
    }
    if (u.t - i > t) {
      r = a;
      break;
    }
    a < n - 1 ? a += 1 : (r = 0, f = !1);
  }
  y = this.keyframesMetadata[a] || {};
  var P, c, v, g, d, k, l = u.t - i, h = o.t - i, p;
  if (o.to) {
    y.bezierData || (y.bezierData = Lt.buildBezierData(o.s, u.s || o.e, o.to, o.ti));
    var m = y.bezierData;
    if (t >= l || t < h) {
      var b = t >= l ? m.points.length - 1 : 0;
      for (c = m.points[b].point.length, P = 0; P < c; P += 1)
        s[P] = m.points[b].point[P];
    } else {
      y.__fnct ? k = y.__fnct : (k = re.getBezierEasing(o.o.x, o.o.y, o.i.x, o.i.y, o.n).get, y.__fnct = k), v = k((t - h) / (l - h));
      var E = m.segmentLength * v, x, S = e.lastFrame < t && e._lastKeyframeIndex === a ? e._lastAddedLength : 0;
      for (d = e.lastFrame < t && e._lastKeyframeIndex === a ? e._lastPoint : 0, f = !0, g = m.points.length; f; ) {
        if (S += m.points[d].partialLength, E === 0 || v === 0 || d === m.points.length - 1) {
          for (c = m.points[d].point.length, P = 0; P < c; P += 1)
            s[P] = m.points[d].point[P];
          break;
        } else if (E >= S && E < S + m.points[d + 1].partialLength) {
          for (x = (E - S) / m.points[d + 1].partialLength, c = m.points[d].point.length, P = 0; P < c; P += 1)
            s[P] = m.points[d].point[P] + (m.points[d + 1].point[P] - m.points[d].point[P]) * x;
          break;
        }
        d < g - 1 ? d += 1 : f = !1;
      }
      e._lastPoint = d, e._lastAddedLength = S - m.points[d].partialLength, e._lastKeyframeIndex = a;
    }
  } else {
    var O, j, X, Y, L;
    if (n = o.s.length, p = u.s || o.e, this.sh && o.h !== 1)
      if (t >= l)
        s[0] = p[0], s[1] = p[1], s[2] = p[2];
      else if (t <= h)
        s[0] = o.s[0], s[1] = o.s[1], s[2] = o.s[2];
      else {
        var C = Ji(o.s), T = Ji(p), F = (t - h) / (l - h);
        Br(s, Gr(C, T, F));
      }
    else
      for (a = 0; a < n; a += 1)
        o.h !== 1 && (t >= l ? v = 1 : t < h ? v = 0 : (o.o.x.constructor === Array ? (y.__fnct || (y.__fnct = []), y.__fnct[a] ? k = y.__fnct[a] : (O = o.o.x[a] === void 0 ? o.o.x[0] : o.o.x[a], j = o.o.y[a] === void 0 ? o.o.y[0] : o.o.y[a], X = o.i.x[a] === void 0 ? o.i.x[0] : o.i.x[a], Y = o.i.y[a] === void 0 ? o.i.y[0] : o.i.y[a], k = re.getBezierEasing(O, j, X, Y).get, y.__fnct[a] = k)) : y.__fnct ? k = y.__fnct : (O = o.o.x, j = o.o.y, X = o.i.x, Y = o.i.y, k = re.getBezierEasing(O, j, X, Y).get, o.keyframeMetadata = k), v = k((t - h) / (l - h)))), p = u.s || o.e, L = o.h === 1 ? o.s[a] : o.s[a] + (p[a] - o.s[a]) * v, this.propType === "multidimensional" ? s[a] = L : s = L;
  }
  return e.lastIndex = r, s;
}
function Gr(t, e, i) {
  var s = [], r = t[0], a = t[1], n = t[2], f = t[3], o = e[0], u = e[1], y = e[2], P = e[3], c, v, g, d, k;
  return v = r * o + a * u + n * y + f * P, v < 0 && (v = -v, o = -o, u = -u, y = -y, P = -P), 1 - v > 1e-6 ? (c = Math.acos(v), g = Math.sin(c), d = Math.sin((1 - i) * c) / g, k = Math.sin(i * c) / g) : (d = 1 - i, k = i), s[0] = d * r + k * o, s[1] = d * a + k * u, s[2] = d * n + k * y, s[3] = d * f + k * P, s;
}
function Br(t, e) {
  var i = e[0], s = e[1], r = e[2], a = e[3], n = Math.atan2(2 * s * a - 2 * i * r, 1 - 2 * s * s - 2 * r * r), f = Math.asin(2 * i * s + 2 * r * a), o = Math.atan2(2 * i * a - 2 * s * r, 1 - 2 * i * i - 2 * r * r);
  t[0] = n / lt, t[1] = f / lt, t[2] = o / lt;
}
function Ji(t) {
  var e = t[0] * lt, i = t[1] * lt, s = t[2] * lt, r = Math.cos(e / 2), a = Math.cos(i / 2), n = Math.cos(s / 2), f = Math.sin(e / 2), o = Math.sin(i / 2), u = Math.sin(s / 2), y = r * a * n - f * o * u, P = f * o * n + r * a * u, c = f * a * n + r * o * u, v = r * o * n - f * a * u;
  return [P, c, v, y];
}
function xs() {
  var t = this.comp.renderedFrame - this.offsetTime, e = this.keyframes[0].t - this.offsetTime, i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
  if (!(t === this._caching.lastFrame || this._caching.lastFrame !== ae && (this._caching.lastFrame >= i && t >= i || this._caching.lastFrame < e && t < e))) {
    this._caching.lastFrame >= t && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
    var s = this.interpolateValue(t, this._caching);
    this.pv = s;
  }
  return this._caching.lastFrame = t, this.pv;
}
function Qe(t) {
  var e;
  if (this.propType === "unidimensional")
    e = t * this.mult, Zi(this.v - e) > 1e-5 && (this.v = e, this._mdf = !0);
  else
    for (var i = 0, s = this.v.length; i < s; )
      e = t[i] * this.mult, Zi(this.v[i] - e) > 1e-5 && (this.v[i] = e, this._mdf = !0), i += 1;
}
function ti() {
  if (!(this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length)) {
    if (this.lock) {
      this.setVValue(this.pv);
      return;
    }
    this.lock = !0, this._mdf = this._isFirstFrame;
    var t, e = this.effectsSequence.length, i = this.kf ? this.pv : this.data.k;
    for (t = 0; t < e; t += 1)
      i = this.effectsSequence[t](i);
    this.setVValue(i), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId;
  }
}
function ei(t) {
  this.effectsSequence.push(t), this.container.addDynamicProperty(this);
}
function Nr(t, e, i, s) {
  this.propType = "unidimensional", this.mult = i || 1, this.data = e, this.v = i ? e.k * i : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = s, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = ti, this.setVValue = Qe, this.addEffect = ei;
}
function jr(t, e, i, s) {
  this.propType = "multidimensional", this.mult = i || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = s, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
  var r, a = e.k.length;
  for (this.v = rt("float32", a), this.pv = rt("float32", a), this.vel = rt("float32", a), r = 0; r < a; r += 1)
    this.v[r] = e.k[r] * this.mult, this.pv[r] = e.k[r];
  this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = ti, this.setVValue = Qe, this.addEffect = ei;
}
function qr(t, e, i, s) {
  this.propType = "unidimensional", this.keyframes = e.k, this.keyframesMetadata = [], this.offsetTime = t.data.st, this.frameId = -1, this._caching = {
    lastFrame: ae,
    lastIndex: 0,
    value: 0,
    _lastKeyframeIndex: -1
  }, this.k = !0, this.kf = !0, this.data = e, this.mult = i || 1, this.elem = t, this.container = s, this.comp = t.comp, this.v = ae, this.pv = ae, this._isFirstFrame = !0, this.getValue = ti, this.setVValue = Qe, this.interpolateValue = Ss, this.effectsSequence = [xs.bind(this)], this.addEffect = ei;
}
function Hr(t, e, i, s) {
  this.propType = "multidimensional";
  var r, a = e.k.length, n, f, o, u;
  for (r = 0; r < a - 1; r += 1)
    e.k[r].to && e.k[r].s && e.k[r + 1] && e.k[r + 1].s && (n = e.k[r].s, f = e.k[r + 1].s, o = e.k[r].to, u = e.k[r].ti, (n.length === 2 && !(n[0] === f[0] && n[1] === f[1]) && Lt.pointOnLine2D(n[0], n[1], f[0], f[1], n[0] + o[0], n[1] + o[1]) && Lt.pointOnLine2D(n[0], n[1], f[0], f[1], f[0] + u[0], f[1] + u[1]) || n.length === 3 && !(n[0] === f[0] && n[1] === f[1] && n[2] === f[2]) && Lt.pointOnLine3D(n[0], n[1], n[2], f[0], f[1], f[2], n[0] + o[0], n[1] + o[1], n[2] + o[2]) && Lt.pointOnLine3D(n[0], n[1], n[2], f[0], f[1], f[2], f[0] + u[0], f[1] + u[1], f[2] + u[2])) && (e.k[r].to = null, e.k[r].ti = null), n[0] === f[0] && n[1] === f[1] && o[0] === 0 && o[1] === 0 && u[0] === 0 && u[1] === 0 && (n.length === 2 || n[2] === f[2] && o[2] === 0 && u[2] === 0) && (e.k[r].to = null, e.k[r].ti = null));
  this.effectsSequence = [xs.bind(this)], this.data = e, this.keyframes = e.k, this.keyframesMetadata = [], this.offsetTime = t.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = i || 1, this.elem = t, this.container = s, this.comp = t.comp, this.getValue = ti, this.setVValue = Qe, this.interpolateValue = Ss, this.frameId = -1;
  var y = e.k[0].s.length;
  for (this.v = rt("float32", y), this.pv = rt("float32", y), r = 0; r < y; r += 1)
    this.v[r] = ae, this.pv[r] = ae;
  this._caching = { lastFrame: ae, lastIndex: 0, value: rt("float32", y) }, this.addEffect = ei;
}
const N = /* @__PURE__ */ function() {
  function t(i, s, r, a, n) {
    s.sid && (s = i.globalData.slotManager.getProp(s));
    var f;
    if (!s.k.length)
      f = new Nr(i, s, a, n);
    else if (typeof s.k[0] == "number")
      f = new jr(i, s, a, n);
    else
      switch (r) {
        case 0:
          f = new qr(i, s, a, n);
          break;
        case 1:
          f = new Hr(i, s, a, n);
          break;
      }
    return f.effectsSequence.length && n.addDynamicProperty(f), f;
  }
  var e = {
    getProp: t
  };
  return e;
}();
function _t() {
}
_t.prototype = {
  addDynamicProperty: function(t) {
    this.dynamicProperties.indexOf(t) === -1 && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0);
  },
  iterateDynamicProperties: function() {
    this._mdf = !1;
    var t, e = this.dynamicProperties.length;
    for (t = 0; t < e; t += 1)
      this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
  },
  initDynamicPropertyContainer: function(t) {
    this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1;
  }
};
const ne = function() {
  function t() {
    return rt("float32", 2);
  }
  return Ke(8, t);
}();
function Gt() {
  this.c = !1, this._length = 0, this._maxLength = 8, this.v = mt(this._maxLength), this.o = mt(this._maxLength), this.i = mt(this._maxLength);
}
Gt.prototype.setPathData = function(t, e) {
  this.c = t, this.setLength(e);
  for (var i = 0; i < e; )
    this.v[i] = ne.newElement(), this.o[i] = ne.newElement(), this.i[i] = ne.newElement(), i += 1;
};
Gt.prototype.setLength = function(t) {
  for (; this._maxLength < t; )
    this.doubleArrayLength();
  this._length = t;
};
Gt.prototype.doubleArrayLength = function() {
  this.v = this.v.concat(mt(this._maxLength)), this.i = this.i.concat(mt(this._maxLength)), this.o = this.o.concat(mt(this._maxLength)), this._maxLength *= 2;
};
Gt.prototype.setXYAt = function(t, e, i, s, r) {
  var a;
  switch (this._length = Math.max(this._length, s + 1), this._length >= this._maxLength && this.doubleArrayLength(), i) {
    case "v":
      a = this.v;
      break;
    case "i":
      a = this.i;
      break;
    case "o":
      a = this.o;
      break;
    default:
      a = [];
      break;
  }
  (!a[s] || a[s] && !r) && (a[s] = ne.newElement()), a[s][0] = t, a[s][1] = e;
};
Gt.prototype.setTripleAt = function(t, e, i, s, r, a, n, f) {
  this.setXYAt(t, e, "v", n, f), this.setXYAt(i, s, "o", n, f), this.setXYAt(r, a, "i", n, f);
};
Gt.prototype.reverse = function() {
  var t = new Gt();
  t.setPathData(this.c, this._length);
  var e = this.v, i = this.o, s = this.i, r = 0;
  this.c && (t.setTripleAt(e[0][0], e[0][1], s[0][0], s[0][1], i[0][0], i[0][1], 0, !1), r = 1);
  var a = this._length - 1, n = this._length, f;
  for (f = r; f < n; f += 1)
    t.setTripleAt(e[a][0], e[a][1], s[a][0], s[a][1], i[a][0], i[a][1], f, !1), a -= 1;
  return t;
};
Gt.prototype.length = function() {
  return this._length;
};
const gt = function() {
  function t() {
    return new Gt();
  }
  function e(r) {
    var a = r._length, n;
    for (n = 0; n < a; n += 1)
      ne.release(r.v[n]), ne.release(r.i[n]), ne.release(r.o[n]), r.v[n] = null, r.i[n] = null, r.o[n] = null;
    r._length = 0, r.c = !1;
  }
  function i(r) {
    var a = s.newElement(), n, f = r._length === void 0 ? r.v.length : r._length;
    for (a.setLength(f), a.c = r.c, n = 0; n < f; n += 1)
      a.setTripleAt(r.v[n][0], r.v[n][1], r.o[n][0], r.o[n][1], r.i[n][0], r.i[n][1], n);
    return a;
  }
  var s = Ke(4, t, e);
  return s.clone = i, s;
}();
function gi() {
  this._length = 0, this._maxLength = 4, this.shapes = mt(this._maxLength);
}
gi.prototype.addShape = function(t) {
  this._length === this._maxLength && (this.shapes = this.shapes.concat(mt(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1;
};
gi.prototype.releaseShapes = function() {
  var t;
  for (t = 0; t < this._length; t += 1)
    gt.release(this.shapes[t]);
  this._length = 0;
};
const me = function() {
  var t = {
    newShapeCollection: r,
    release: a
  }, e = 0, i = 4, s = mt(i);
  function r() {
    var n;
    return e ? (e -= 1, n = s[e]) : n = new gi(), n;
  }
  function a(n) {
    var f, o = n._length;
    for (f = 0; f < o; f += 1)
      gt.release(n.shapes[f]);
    n._length = 0, e === i && (s = As.double(s), i *= 2), s[e] = n, e += 1;
  }
  return t;
}(), Wt = function() {
  var t = -999999;
  function e(l, h, p) {
    var m = p.lastIndex, b, E, x, S, O, j, X, Y, L, C = this.keyframes;
    if (l < C[0].t - this.offsetTime)
      b = C[0].s[0], x = !0, m = 0;
    else if (l >= C[C.length - 1].t - this.offsetTime)
      b = C[C.length - 1].s ? C[C.length - 1].s[0] : C[C.length - 2].e[0], x = !0;
    else {
      for (var T = m, F = C.length - 1, M = !0, _, w, I; M && (_ = C[T], w = C[T + 1], !(w.t - this.offsetTime > l)); )
        T < F - 1 ? T += 1 : M = !1;
      if (I = this.keyframesMetadata[T] || {}, x = _.h === 1, m = T, !x) {
        if (l >= w.t - this.offsetTime)
          Y = 1;
        else if (l < _.t - this.offsetTime)
          Y = 0;
        else {
          var z;
          I.__fnct ? z = I.__fnct : (z = re.getBezierEasing(_.o.x, _.o.y, _.i.x, _.i.y).get, I.__fnct = z), Y = z((l - (_.t - this.offsetTime)) / (w.t - this.offsetTime - (_.t - this.offsetTime)));
        }
        E = w.s ? w.s[0] : _.e[0];
      }
      b = _.s[0];
    }
    for (j = h._length, X = b.i[0].length, p.lastIndex = m, S = 0; S < j; S += 1)
      for (O = 0; O < X; O += 1)
        L = x ? b.i[S][O] : b.i[S][O] + (E.i[S][O] - b.i[S][O]) * Y, h.i[S][O] = L, L = x ? b.o[S][O] : b.o[S][O] + (E.o[S][O] - b.o[S][O]) * Y, h.o[S][O] = L, L = x ? b.v[S][O] : b.v[S][O] + (E.v[S][O] - b.v[S][O]) * Y, h.v[S][O] = L;
  }
  function i() {
    var l = this.comp.renderedFrame - this.offsetTime, h = this.keyframes[0].t - this.offsetTime, p = this.keyframes[this.keyframes.length - 1].t - this.offsetTime, m = this._caching.lastFrame;
    return m !== t && (m < h && l < h || m > p && l > p) || (this._caching.lastIndex = m < l ? this._caching.lastIndex : 0, this.interpolateShape(l, this.pv, this._caching)), this._caching.lastFrame = l, this.pv;
  }
  function s() {
    this.paths = this.localShapeCollection;
  }
  function r(l, h) {
    if (l._length !== h._length || l.c !== h.c)
      return !1;
    var p, m = l._length;
    for (p = 0; p < m; p += 1)
      if (l.v[p][0] !== h.v[p][0] || l.v[p][1] !== h.v[p][1] || l.o[p][0] !== h.o[p][0] || l.o[p][1] !== h.o[p][1] || l.i[p][0] !== h.i[p][0] || l.i[p][1] !== h.i[p][1])
        return !1;
    return !0;
  }
  function a(l) {
    r(this.v, l) || (this.v = gt.clone(l), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection);
  }
  function n() {
    if (this.elem.globalData.frameId !== this.frameId) {
      if (!this.effectsSequence.length) {
        this._mdf = !1;
        return;
      }
      if (this.lock) {
        this.setVValue(this.pv);
        return;
      }
      this.lock = !0, this._mdf = !1;
      var l;
      this.kf ? l = this.pv : this.data.ks ? l = this.data.ks.k : l = this.data.pt.k;
      var h, p = this.effectsSequence.length;
      for (h = 0; h < p; h += 1)
        l = this.effectsSequence[h](l);
      this.setVValue(l), this.lock = !1, this.frameId = this.elem.globalData.frameId;
    }
  }
  function f(l, h, p) {
    this.propType = "shape", this.comp = l.comp, this.container = l, this.elem = l, this.data = h, this.k = !1, this.kf = !1, this._mdf = !1;
    var m = p === 3 ? h.pt.k : h.ks.k;
    this.v = gt.clone(m), this.pv = gt.clone(this.v), this.localShapeCollection = me.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = s, this.effectsSequence = [];
  }
  function o(l) {
    this.effectsSequence.push(l), this.container.addDynamicProperty(this);
  }
  f.prototype.interpolateShape = e, f.prototype.getValue = n, f.prototype.setVValue = a, f.prototype.addEffect = o;
  function u(l, h, p) {
    this.propType = "shape", this.comp = l.comp, this.elem = l, this.container = l, this.offsetTime = l.data.st, this.keyframes = p === 3 ? h.pt.k : h.ks.k, this.keyframesMetadata = [], this.k = !0, this.kf = !0;
    var m = this.keyframes[0].s[0].i.length;
    this.v = gt.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, m), this.pv = gt.clone(this.v), this.localShapeCollection = me.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = t, this.reset = s, this._caching = { lastFrame: t, lastIndex: 0 }, this.effectsSequence = [i.bind(this)];
  }
  u.prototype.getValue = n, u.prototype.interpolateShape = e, u.prototype.setVValue = a, u.prototype.addEffect = o;
  var y = function() {
    var l = Ut;
    function h(p, m) {
      this.v = gt.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = me.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = m.d, this.elem = p, this.comp = p.comp, this.frameId = -1, this.initDynamicPropertyContainer(p), this.p = N.getProp(p, m.p, 1, 0, this), this.s = N.getProp(p, m.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath());
    }
    return h.prototype = {
      reset: s,
      getValue: function() {
        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
      },
      convertEllToPath: function() {
        var p = this.p.v[0], m = this.p.v[1], b = this.s.v[0] / 2, E = this.s.v[1] / 2, x = this.d !== 3, S = this.v;
        S.v[0][0] = p, S.v[0][1] = m - E, S.v[1][0] = x ? p + b : p - b, S.v[1][1] = m, S.v[2][0] = p, S.v[2][1] = m + E, S.v[3][0] = x ? p - b : p + b, S.v[3][1] = m, S.i[0][0] = x ? p - b * l : p + b * l, S.i[0][1] = m - E, S.i[1][0] = x ? p + b : p - b, S.i[1][1] = m - E * l, S.i[2][0] = x ? p + b * l : p - b * l, S.i[2][1] = m + E, S.i[3][0] = x ? p - b : p + b, S.i[3][1] = m + E * l, S.o[0][0] = x ? p + b * l : p - b * l, S.o[0][1] = m - E, S.o[1][0] = x ? p + b : p - b, S.o[1][1] = m + E * l, S.o[2][0] = x ? p - b * l : p + b * l, S.o[2][1] = m + E, S.o[3][0] = x ? p - b : p + b, S.o[3][1] = m - E * l;
      }
    }, st([_t], h), h;
  }(), P = function() {
    function l(h, p) {
      this.v = gt.newElement(), this.v.setPathData(!0, 0), this.elem = h, this.comp = h.comp, this.data = p, this.frameId = -1, this.d = p.d, this.initDynamicPropertyContainer(h), p.sy === 1 ? (this.ir = N.getProp(h, p.ir, 0, 0, this), this.is = N.getProp(h, p.is, 0, 0.01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = N.getProp(h, p.pt, 0, 0, this), this.p = N.getProp(h, p.p, 1, 0, this), this.r = N.getProp(h, p.r, 0, lt, this), this.or = N.getProp(h, p.or, 0, 0, this), this.os = N.getProp(h, p.os, 0, 0.01, this), this.localShapeCollection = me.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath());
    }
    return l.prototype = {
      reset: s,
      getValue: function() {
        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
      },
      convertStarToPath: function() {
        var h = Math.floor(this.pt.v) * 2, p = Math.PI * 2 / h, m = !0, b = this.or.v, E = this.ir.v, x = this.os.v, S = this.is.v, O = 2 * Math.PI * b / (h * 2), j = 2 * Math.PI * E / (h * 2), X, Y, L, C, T = -Math.PI / 2;
        T += this.r.v;
        var F = this.data.d === 3 ? -1 : 1;
        for (this.v._length = 0, X = 0; X < h; X += 1) {
          Y = m ? b : E, L = m ? x : S, C = m ? O : j;
          var M = Y * Math.cos(T), _ = Y * Math.sin(T), w = M === 0 && _ === 0 ? 0 : _ / Math.sqrt(M * M + _ * _), I = M === 0 && _ === 0 ? 0 : -M / Math.sqrt(M * M + _ * _);
          M += +this.p.v[0], _ += +this.p.v[1], this.v.setTripleAt(M, _, M - w * C * L * F, _ - I * C * L * F, M + w * C * L * F, _ + I * C * L * F, X, !0), m = !m, T += p * F;
        }
      },
      convertPolygonToPath: function() {
        var h = Math.floor(this.pt.v), p = Math.PI * 2 / h, m = this.or.v, b = this.os.v, E = 2 * Math.PI * m / (h * 4), x, S = -Math.PI * 0.5, O = this.data.d === 3 ? -1 : 1;
        for (S += this.r.v, this.v._length = 0, x = 0; x < h; x += 1) {
          var j = m * Math.cos(S), X = m * Math.sin(S), Y = j === 0 && X === 0 ? 0 : X / Math.sqrt(j * j + X * X), L = j === 0 && X === 0 ? 0 : -j / Math.sqrt(j * j + X * X);
          j += +this.p.v[0], X += +this.p.v[1], this.v.setTripleAt(j, X, j - Y * E * b * O, X - L * E * b * O, j + Y * E * b * O, X + L * E * b * O, x, !0), S += p * O;
        }
        this.paths.length = 0, this.paths[0] = this.v;
      }
    }, st([_t], l), l;
  }(), c = function() {
    function l(h, p) {
      this.v = gt.newElement(), this.v.c = !0, this.localShapeCollection = me.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = h, this.comp = h.comp, this.frameId = -1, this.d = p.d, this.initDynamicPropertyContainer(h), this.p = N.getProp(h, p.p, 1, 0, this), this.s = N.getProp(h, p.s, 1, 0, this), this.r = N.getProp(h, p.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath());
    }
    return l.prototype = {
      convertRectToPath: function() {
        var h = this.p.v[0], p = this.p.v[1], m = this.s.v[0] / 2, b = this.s.v[1] / 2, E = Ar(m, b, this.r.v), x = E * (1 - Ut);
        this.v._length = 0, this.d === 2 || this.d === 1 ? (this.v.setTripleAt(h + m, p - b + E, h + m, p - b + E, h + m, p - b + x, 0, !0), this.v.setTripleAt(h + m, p + b - E, h + m, p + b - x, h + m, p + b - E, 1, !0), E !== 0 ? (this.v.setTripleAt(h + m - E, p + b, h + m - E, p + b, h + m - x, p + b, 2, !0), this.v.setTripleAt(h - m + E, p + b, h - m + x, p + b, h - m + E, p + b, 3, !0), this.v.setTripleAt(h - m, p + b - E, h - m, p + b - E, h - m, p + b - x, 4, !0), this.v.setTripleAt(h - m, p - b + E, h - m, p - b + x, h - m, p - b + E, 5, !0), this.v.setTripleAt(h - m + E, p - b, h - m + E, p - b, h - m + x, p - b, 6, !0), this.v.setTripleAt(h + m - E, p - b, h + m - x, p - b, h + m - E, p - b, 7, !0)) : (this.v.setTripleAt(h - m, p + b, h - m + x, p + b, h - m, p + b, 2), this.v.setTripleAt(h - m, p - b, h - m, p - b + x, h - m, p - b, 3))) : (this.v.setTripleAt(h + m, p - b + E, h + m, p - b + x, h + m, p - b + E, 0, !0), E !== 0 ? (this.v.setTripleAt(h + m - E, p - b, h + m - E, p - b, h + m - x, p - b, 1, !0), this.v.setTripleAt(h - m + E, p - b, h - m + x, p - b, h - m + E, p - b, 2, !0), this.v.setTripleAt(h - m, p - b + E, h - m, p - b + E, h - m, p - b + x, 3, !0), this.v.setTripleAt(h - m, p + b - E, h - m, p + b - x, h - m, p + b - E, 4, !0), this.v.setTripleAt(h - m + E, p + b, h - m + E, p + b, h - m + x, p + b, 5, !0), this.v.setTripleAt(h + m - E, p + b, h + m - x, p + b, h + m - E, p + b, 6, !0), this.v.setTripleAt(h + m, p + b - E, h + m, p + b - E, h + m, p + b - x, 7, !0)) : (this.v.setTripleAt(h - m, p - b, h - m + x, p - b, h - m, p - b, 1, !0), this.v.setTripleAt(h - m, p + b, h - m, p + b - x, h - m, p + b, 2, !0), this.v.setTripleAt(h + m, p + b, h + m - x, p + b, h + m, p + b, 3, !0)));
      },
      getValue: function() {
        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
      },
      reset: s
    }, st([_t], l), l;
  }();
  function v(l, h, p) {
    var m;
    if (p === 3 || p === 4) {
      var b = p === 3 ? h.pt : h.ks, E = b.k;
      E.length ? m = new u(l, h, p) : m = new f(l, h, p);
    } else p === 5 ? m = new c(l, h) : p === 6 ? m = new y(l, h) : p === 7 && (m = new P(l, h));
    return m.k && l.addDynamicProperty(m), m;
  }
  function g() {
    return f;
  }
  function d() {
    return u;
  }
  var k = {};
  return k.getShapeProp = v, k.getConstructorFunction = g, k.getKeyframedConstructorFunction = d, k;
}();
/*!
 Transformation Matrix v2.0
 (c) Epistemex 2014-2015
 www.epistemex.com
 By Ken Fyrstenberg
 Contributions by leeoniya.
 License: MIT, header required.
 */
const ut = /* @__PURE__ */ function() {
  var t = Math.cos, e = Math.sin, i = Math.tan, s = Math.round;
  function r() {
    return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
  }
  function a(_) {
    if (_ === 0)
      return this;
    var w = t(_), I = e(_);
    return this._t(w, -I, 0, 0, I, w, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  function n(_) {
    if (_ === 0)
      return this;
    var w = t(_), I = e(_);
    return this._t(1, 0, 0, 0, 0, w, -I, 0, 0, I, w, 0, 0, 0, 0, 1);
  }
  function f(_) {
    if (_ === 0)
      return this;
    var w = t(_), I = e(_);
    return this._t(w, 0, I, 0, 0, 1, 0, 0, -I, 0, w, 0, 0, 0, 0, 1);
  }
  function o(_) {
    if (_ === 0)
      return this;
    var w = t(_), I = e(_);
    return this._t(w, -I, 0, 0, I, w, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  function u(_, w) {
    return this._t(1, w, _, 1, 0, 0);
  }
  function y(_, w) {
    return this.shear(i(_), i(w));
  }
  function P(_, w) {
    var I = t(w), z = e(w);
    return this._t(I, z, 0, 0, -z, I, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, i(_), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(I, -z, 0, 0, z, I, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  function c(_, w, I) {
    return !I && I !== 0 && (I = 1), _ === 1 && w === 1 && I === 1 ? this : this._t(_, 0, 0, 0, 0, w, 0, 0, 0, 0, I, 0, 0, 0, 0, 1);
  }
  function v(_, w, I, z, nt, Q, pt, A, D, R, q, V, W, Z, K, ot) {
    return this.props[0] = _, this.props[1] = w, this.props[2] = I, this.props[3] = z, this.props[4] = nt, this.props[5] = Q, this.props[6] = pt, this.props[7] = A, this.props[8] = D, this.props[9] = R, this.props[10] = q, this.props[11] = V, this.props[12] = W, this.props[13] = Z, this.props[14] = K, this.props[15] = ot, this;
  }
  function g(_, w, I) {
    return I = I || 0, _ !== 0 || w !== 0 || I !== 0 ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, _, w, I, 1) : this;
  }
  function d(_, w, I, z, nt, Q, pt, A, D, R, q, V, W, Z, K, ot) {
    var H = this.props;
    if (_ === 1 && w === 0 && I === 0 && z === 0 && nt === 0 && Q === 1 && pt === 0 && A === 0 && D === 0 && R === 0 && q === 1 && V === 0)
      return H[12] = H[12] * _ + H[15] * W, H[13] = H[13] * Q + H[15] * Z, H[14] = H[14] * q + H[15] * K, H[15] *= ot, this._identityCalculated = !1, this;
    var jt = H[0], ct = H[1], he = H[2], le = H[3], pe = H[4], fe = H[5], ue = H[6], qt = H[7], Zt = H[8], Ht = H[9], Jt = H[10], Kt = H[11], Qt = H[12], te = H[13], ee = H[14], ie = H[15];
    return H[0] = jt * _ + ct * nt + he * D + le * W, H[1] = jt * w + ct * Q + he * R + le * Z, H[2] = jt * I + ct * pt + he * q + le * K, H[3] = jt * z + ct * A + he * V + le * ot, H[4] = pe * _ + fe * nt + ue * D + qt * W, H[5] = pe * w + fe * Q + ue * R + qt * Z, H[6] = pe * I + fe * pt + ue * q + qt * K, H[7] = pe * z + fe * A + ue * V + qt * ot, H[8] = Zt * _ + Ht * nt + Jt * D + Kt * W, H[9] = Zt * w + Ht * Q + Jt * R + Kt * Z, H[10] = Zt * I + Ht * pt + Jt * q + Kt * K, H[11] = Zt * z + Ht * A + Jt * V + Kt * ot, H[12] = Qt * _ + te * nt + ee * D + ie * W, H[13] = Qt * w + te * Q + ee * R + ie * Z, H[14] = Qt * I + te * pt + ee * q + ie * K, H[15] = Qt * z + te * A + ee * V + ie * ot, this._identityCalculated = !1, this;
  }
  function k(_) {
    var w = _.props;
    return this.transform(
      w[0],
      w[1],
      w[2],
      w[3],
      w[4],
      w[5],
      w[6],
      w[7],
      w[8],
      w[9],
      w[10],
      w[11],
      w[12],
      w[13],
      w[14],
      w[15]
    );
  }
  function l() {
    return this._identityCalculated || (this._identity = !(this.props[0] !== 1 || this.props[1] !== 0 || this.props[2] !== 0 || this.props[3] !== 0 || this.props[4] !== 0 || this.props[5] !== 1 || this.props[6] !== 0 || this.props[7] !== 0 || this.props[8] !== 0 || this.props[9] !== 0 || this.props[10] !== 1 || this.props[11] !== 0 || this.props[12] !== 0 || this.props[13] !== 0 || this.props[14] !== 0 || this.props[15] !== 1), this._identityCalculated = !0), this._identity;
  }
  function h(_) {
    for (var w = 0; w < 16; ) {
      if (_.props[w] !== this.props[w])
        return !1;
      w += 1;
    }
    return !0;
  }
  function p(_) {
    var w;
    for (w = 0; w < 16; w += 1)
      _.props[w] = this.props[w];
    return _;
  }
  function m(_) {
    var w;
    for (w = 0; w < 16; w += 1)
      this.props[w] = _[w];
  }
  function b(_, w, I) {
    return {
      x: _ * this.props[0] + w * this.props[4] + I * this.props[8] + this.props[12],
      y: _ * this.props[1] + w * this.props[5] + I * this.props[9] + this.props[13],
      z: _ * this.props[2] + w * this.props[6] + I * this.props[10] + this.props[14]
    };
  }
  function E(_, w, I) {
    return _ * this.props[0] + w * this.props[4] + I * this.props[8] + this.props[12];
  }
  function x(_, w, I) {
    return _ * this.props[1] + w * this.props[5] + I * this.props[9] + this.props[13];
  }
  function S(_, w, I) {
    return _ * this.props[2] + w * this.props[6] + I * this.props[10] + this.props[14];
  }
  function O() {
    var _ = this.props[0] * this.props[5] - this.props[1] * this.props[4], w = this.props[5] / _, I = -this.props[1] / _, z = -this.props[4] / _, nt = this.props[0] / _, Q = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / _, pt = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / _, A = new ut();
    return A.props[0] = w, A.props[1] = I, A.props[4] = z, A.props[5] = nt, A.props[12] = Q, A.props[13] = pt, A;
  }
  function j(_) {
    var w = this.getInverseMatrix();
    return w.applyToPointArray(_[0], _[1], _[2] || 0);
  }
  function X(_) {
    var w, I = _.length, z = [];
    for (w = 0; w < I; w += 1)
      z[w] = j(_[w]);
    return z;
  }
  function Y(_, w, I) {
    var z = rt("float32", 6);
    if (this.isIdentity())
      z[0] = _[0], z[1] = _[1], z[2] = w[0], z[3] = w[1], z[4] = I[0], z[5] = I[1];
    else {
      var nt = this.props[0], Q = this.props[1], pt = this.props[4], A = this.props[5], D = this.props[12], R = this.props[13];
      z[0] = _[0] * nt + _[1] * pt + D, z[1] = _[0] * Q + _[1] * A + R, z[2] = w[0] * nt + w[1] * pt + D, z[3] = w[0] * Q + w[1] * A + R, z[4] = I[0] * nt + I[1] * pt + D, z[5] = I[0] * Q + I[1] * A + R;
    }
    return z;
  }
  function L(_, w, I) {
    var z;
    return this.isIdentity() ? z = [_, w, I] : z = [
      _ * this.props[0] + w * this.props[4] + I * this.props[8] + this.props[12],
      _ * this.props[1] + w * this.props[5] + I * this.props[9] + this.props[13],
      _ * this.props[2] + w * this.props[6] + I * this.props[10] + this.props[14]
    ], z;
  }
  function C(_, w) {
    if (this.isIdentity())
      return _ + "," + w;
    var I = this.props;
    return Math.round((_ * I[0] + w * I[4] + I[12]) * 100) / 100 + "," + Math.round((_ * I[1] + w * I[5] + I[13]) * 100) / 100;
  }
  function T() {
    for (var _ = 0, w = this.props, I = "matrix3d(", z = 1e4; _ < 16; )
      I += s(w[_] * z) / z, I += _ === 15 ? ")" : ",", _ += 1;
    return I;
  }
  function F(_) {
    var w = 1e4;
    return _ < 1e-6 && _ > 0 || _ > -1e-6 && _ < 0 ? s(_ * w) / w : _;
  }
  function M() {
    var _ = this.props, w = F(_[0]), I = F(_[1]), z = F(_[4]), nt = F(_[5]), Q = F(_[12]), pt = F(_[13]);
    return "matrix(" + w + "," + I + "," + z + "," + nt + "," + Q + "," + pt + ")";
  }
  return function() {
    this.reset = r, this.rotate = a, this.rotateX = n, this.rotateY = f, this.rotateZ = o, this.skew = y, this.skewFromAxis = P, this.shear = u, this.scale = c, this.setTransform = v, this.translate = g, this.transform = d, this.multiply = k, this.applyToPoint = b, this.applyToX = E, this.applyToY = x, this.applyToZ = S, this.applyToPointArray = L, this.applyToTriplePoints = Y, this.applyToPointStringified = C, this.toCSS = T, this.to2dCSS = M, this.clone = p, this.cloneFromProps = m, this.equals = h, this.inversePoints = X, this.inversePoint = j, this.getInverseMatrix = O, this._t = this.transform, this.isIdentity = l, this._identity = !0, this._identityCalculated = !1, this.props = rt("float32", 16), this.reset();
  };
}(), ht = {};
function Xr(t) {
  Tr(t);
}
function Ur() {
  Pt.searchAnimations();
}
function Wr(t) {
  xr(t);
}
function $r(t) {
  Ir(t);
}
function Yr(t) {
  return Pt.loadAnimation(t);
}
function Zr(t) {
  if (typeof t == "string")
    switch (t) {
      case "high":
        Be(200);
        break;
      default:
      case "medium":
        Be(50);
        break;
      case "low":
        Be(10);
        break;
    }
  else !isNaN(t) && t > 1 && Be(t);
}
function Jr() {
  return typeof navigator < "u";
}
function Kr(t, e) {
  t === "expressions" && _s(e);
}
function Qr(t) {
  switch (t) {
    case "propertyFactory":
      return N;
    case "shapePropertyFactory":
      return Wt;
    case "matrix":
      return ut;
    default:
      return null;
  }
}
ht.play = Pt.play;
ht.pause = Pt.pause;
ht.setLocationHref = Xr;
ht.togglePause = Pt.togglePause;
ht.setSpeed = Pt.setSpeed;
ht.setDirection = Pt.setDirection;
ht.stop = Pt.stop;
ht.searchAnimations = Ur;
ht.registerAnimation = Pt.registerAnimation;
ht.loadAnimation = Yr;
ht.setSubframeRendering = Wr;
ht.resize = Pt.resize;
ht.goToAndStop = Pt.goToAndStop;
ht.destroy = Pt.destroy;
ht.setQuality = Zr;
ht.inBrowser = Jr;
ht.installPlugin = Kr;
ht.freeze = Pt.freeze;
ht.unfreeze = Pt.unfreeze;
ht.getRegisteredAnimations = Pt.getRegisteredAnimations;
ht.setIDPrefix = $r;
ht.__getFactory = Qr;
ht.version = "[[BM_VERSION]]";
const $t = function() {
  var t = {}, e = {};
  t.registerModifier = i, t.getModifier = s;
  function i(r, a) {
    e[r] || (e[r] = a);
  }
  function s(r, a, n) {
    return new e[r](a, n);
  }
  return t;
}();
function xt() {
}
xt.prototype.initModifierProperties = function() {
};
xt.prototype.addShapeToModifier = function() {
};
xt.prototype.addShape = function(t) {
  if (!this.closed) {
    t.sh.container.addDynamicProperty(t.sh);
    var e = { shape: t.sh, data: t, localShapeCollection: me.newShapeCollection() };
    this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated();
  }
};
xt.prototype.init = function(t, e) {
  this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = He, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
};
xt.prototype.processKeys = function() {
  this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties());
};
st([_t], xt);
function Mt() {
}
st([xt], Mt);
Mt.prototype.initModifierProperties = function(t, e) {
  this.s = N.getProp(t, e.s, 0, 0.01, this), this.e = N.getProp(t, e.e, 0, 0.01, this), this.o = N.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
};
Mt.prototype.addShapeToModifier = function(t) {
  t.pathsData = [];
};
Mt.prototype.calculateShapeEdges = function(t, e, i, s, r) {
  var a = [];
  e <= 1 ? a.push({
    s: t,
    e
  }) : t >= 1 ? a.push({
    s: t - 1,
    e: e - 1
  }) : (a.push({
    s: t,
    e: 1
  }), a.push({
    s: 0,
    e: e - 1
  }));
  var n = [], f, o = a.length, u;
  for (f = 0; f < o; f += 1)
    if (u = a[f], !(u.e * r < s || u.s * r > s + i)) {
      var y, P;
      u.s * r <= s ? y = 0 : y = (u.s * r - s) / i, u.e * r >= s + i ? P = 1 : P = (u.e * r - s) / i, n.push([y, P]);
    }
  return n.length || n.push([0, 0]), n;
};
Mt.prototype.releasePathsData = function(t) {
  var e, i = t.length;
  for (e = 0; e < i; e += 1)
    ws.release(t[e]);
  return t.length = 0, t;
};
Mt.prototype.processShapes = function(t) {
  var e, i;
  if (this._mdf || t) {
    var s = this.o.v % 360 / 360;
    if (s < 0 && (s += 1), this.s.v > 1 ? e = 1 + s : this.s.v < 0 ? e = 0 + s : e = this.s.v + s, this.e.v > 1 ? i = 1 + s : this.e.v < 0 ? i = 0 + s : i = this.e.v + s, e > i) {
      var r = e;
      e = i, i = r;
    }
    e = Math.round(e * 1e4) * 1e-4, i = Math.round(i * 1e4) * 1e-4, this.sValue = e, this.eValue = i;
  } else
    e = this.sValue, i = this.eValue;
  var a, n, f = this.shapes.length, o, u, y, P, c, v = 0;
  if (i === e)
    for (n = 0; n < f; n += 1)
      this.shapes[n].localShapeCollection.releaseShapes(), this.shapes[n].shape._mdf = !0, this.shapes[n].shape.paths = this.shapes[n].localShapeCollection, this._mdf && (this.shapes[n].pathsData.length = 0);
  else if (i === 1 && e === 0 || i === 0 && e === 1) {
    if (this._mdf)
      for (n = 0; n < f; n += 1)
        this.shapes[n].pathsData.length = 0, this.shapes[n].shape._mdf = !0;
  } else {
    var g = [], d, k;
    for (n = 0; n < f; n += 1)
      if (d = this.shapes[n], !d.shape._mdf && !this._mdf && !t && this.m !== 2)
        d.shape.paths = d.localShapeCollection;
      else {
        if (a = d.shape.paths, u = a._length, c = 0, !d.shape._mdf && d.pathsData.length)
          c = d.totalShapeLength;
        else {
          for (y = this.releasePathsData(d.pathsData), o = 0; o < u; o += 1)
            P = Lt.getSegmentsLength(a.shapes[o]), y.push(P), c += P.totalLength;
          d.totalShapeLength = c, d.pathsData = y;
        }
        v += c, d.shape._mdf = !0;
      }
    var l = e, h = i, p = 0, m;
    for (n = f - 1; n >= 0; n -= 1)
      if (d = this.shapes[n], d.shape._mdf) {
        for (k = d.localShapeCollection, k.releaseShapes(), this.m === 2 && f > 1 ? (m = this.calculateShapeEdges(e, i, d.totalShapeLength, p, v), p += d.totalShapeLength) : m = [[l, h]], u = m.length, o = 0; o < u; o += 1) {
          l = m[o][0], h = m[o][1], g.length = 0, h <= 1 ? g.push({
            s: d.totalShapeLength * l,
            e: d.totalShapeLength * h
          }) : l >= 1 ? g.push({
            s: d.totalShapeLength * (l - 1),
            e: d.totalShapeLength * (h - 1)
          }) : (g.push({
            s: d.totalShapeLength * l,
            e: d.totalShapeLength
          }), g.push({
            s: 0,
            e: d.totalShapeLength * (h - 1)
          }));
          var b = this.addShapes(d, g[0]);
          if (g[0].s !== g[0].e) {
            if (g.length > 1) {
              var E = d.shape.paths.shapes[d.shape.paths._length - 1];
              if (E.c) {
                var x = b.pop();
                this.addPaths(b, k), b = this.addShapes(d, g[1], x);
              } else
                this.addPaths(b, k), b = this.addShapes(d, g[1]);
            }
            this.addPaths(b, k);
          }
        }
        d.shape.paths = k;
      }
  }
};
Mt.prototype.addPaths = function(t, e) {
  var i, s = t.length;
  for (i = 0; i < s; i += 1)
    e.addShape(t[i]);
};
Mt.prototype.addSegment = function(t, e, i, s, r, a, n) {
  r.setXYAt(e[0], e[1], "o", a), r.setXYAt(i[0], i[1], "i", a + 1), n && r.setXYAt(t[0], t[1], "v", a), r.setXYAt(s[0], s[1], "v", a + 1);
};
Mt.prototype.addSegmentFromArray = function(t, e, i, s) {
  e.setXYAt(t[1], t[5], "o", i), e.setXYAt(t[2], t[6], "i", i + 1), s && e.setXYAt(t[0], t[4], "v", i), e.setXYAt(t[3], t[7], "v", i + 1);
};
Mt.prototype.addShapes = function(t, e, i) {
  var s = t.pathsData, r = t.shape.paths.shapes, a, n = t.shape.paths._length, f, o, u = 0, y, P, c, v, g = [], d, k = !0;
  for (i ? (P = i._length, d = i._length) : (i = gt.newElement(), P = 0, d = 0), g.push(i), a = 0; a < n; a += 1) {
    for (c = s[a].lengths, i.c = r[a].c, o = r[a].c ? c.length : c.length + 1, f = 1; f < o; f += 1)
      if (y = c[f - 1], u + y.addedLength < e.s)
        u += y.addedLength, i.c = !1;
      else if (u > e.e) {
        i.c = !1;
        break;
      } else
        e.s <= u && e.e >= u + y.addedLength ? (this.addSegment(r[a].v[f - 1], r[a].o[f - 1], r[a].i[f], r[a].v[f], i, P, k), k = !1) : (v = Lt.getNewSegment(r[a].v[f - 1], r[a].v[f], r[a].o[f - 1], r[a].i[f], (e.s - u) / y.addedLength, (e.e - u) / y.addedLength, c[f - 1]), this.addSegmentFromArray(v, i, P, k), k = !1, i.c = !1), u += y.addedLength, P += 1;
    if (r[a].c && c.length) {
      if (y = c[f - 1], u <= e.e) {
        var l = c[f - 1].addedLength;
        e.s <= u && e.e >= u + l ? (this.addSegment(r[a].v[f - 1], r[a].o[f - 1], r[a].i[0], r[a].v[0], i, P, k), k = !1) : (v = Lt.getNewSegment(r[a].v[f - 1], r[a].v[0], r[a].o[f - 1], r[a].i[0], (e.s - u) / l, (e.e - u) / l, c[f - 1]), this.addSegmentFromArray(v, i, P, k), k = !1, i.c = !1);
      } else
        i.c = !1;
      u += y.addedLength, P += 1;
    }
    if (i._length && (i.setXYAt(i.v[d][0], i.v[d][1], "i", d), i.setXYAt(i.v[i._length - 1][0], i.v[i._length - 1][1], "o", i._length - 1)), u > e.e)
      break;
    a < n - 1 && (i = gt.newElement(), k = !0, g.push(i), P = 0);
  }
  return g;
};
function Me() {
}
st([xt], Me);
Me.prototype.initModifierProperties = function(t, e) {
  this.getValue = this.processKeys, this.amount = N.getProp(t, e.a, 0, null, this), this._isAnimated = !!this.amount.effectsSequence.length;
};
Me.prototype.processPath = function(t, e) {
  var i = e / 100, s = [0, 0], r = t._length, a = 0;
  for (a = 0; a < r; a += 1)
    s[0] += t.v[a][0], s[1] += t.v[a][1];
  s[0] /= r, s[1] /= r;
  var n = gt.newElement();
  n.c = t.c;
  var f, o, u, y, P, c;
  for (a = 0; a < r; a += 1)
    f = t.v[a][0] + (s[0] - t.v[a][0]) * i, o = t.v[a][1] + (s[1] - t.v[a][1]) * i, u = t.o[a][0] + (s[0] - t.o[a][0]) * -i, y = t.o[a][1] + (s[1] - t.o[a][1]) * -i, P = t.i[a][0] + (s[0] - t.i[a][0]) * -i, c = t.i[a][1] + (s[1] - t.i[a][1]) * -i, n.setTripleAt(f, o, u, y, P, c, a);
  return n;
};
Me.prototype.processShapes = function(t) {
  var e, i, s = this.shapes.length, r, a, n = this.amount.v;
  if (n !== 0) {
    var f, o;
    for (i = 0; i < s; i += 1) {
      if (f = this.shapes[i], o = f.localShapeCollection, !(!f.shape._mdf && !this._mdf && !t))
        for (o.releaseShapes(), f.shape._mdf = !0, e = f.shape.paths.shapes, a = f.shape.paths._length, r = 0; r < a; r += 1)
          o.addShape(this.processPath(e[r], n));
      f.shape.paths = f.localShapeCollection;
    }
  }
  this.dynamicProperties.length || (this._mdf = !1);
};
const De = function() {
  var t = [0, 0];
  function e(o) {
    var u = this._mdf;
    this.iterateDynamicProperties(), this._mdf = this._mdf || u, this.a && o.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && o.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && o.skewFromAxis(-this.sk.v, this.sa.v), this.r ? o.rotate(-this.r.v) : o.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? o.translate(this.px.v, this.py.v, -this.pz.v) : o.translate(this.px.v, this.py.v, 0) : o.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
  }
  function i(o) {
    if (this.elem.globalData.frameId !== this.frameId) {
      if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || o) {
        var u;
        if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
          var y, P;
          if (u = this.elem.globalData.frameRate, this.p && this.p.keyframes && this.p.getValueAtTime)
            this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (y = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / u, 0), P = this.p.getValueAtTime(this.p.keyframes[0].t / u, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (y = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / u, 0), P = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.05) / u, 0)) : (y = this.p.pv, P = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - 0.01) / u, this.p.offsetTime));
          else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
            y = [], P = [];
            var c = this.px, v = this.py;
            c._caching.lastFrame + c.offsetTime <= c.keyframes[0].t ? (y[0] = c.getValueAtTime((c.keyframes[0].t + 0.01) / u, 0), y[1] = v.getValueAtTime((v.keyframes[0].t + 0.01) / u, 0), P[0] = c.getValueAtTime(c.keyframes[0].t / u, 0), P[1] = v.getValueAtTime(v.keyframes[0].t / u, 0)) : c._caching.lastFrame + c.offsetTime >= c.keyframes[c.keyframes.length - 1].t ? (y[0] = c.getValueAtTime(c.keyframes[c.keyframes.length - 1].t / u, 0), y[1] = v.getValueAtTime(v.keyframes[v.keyframes.length - 1].t / u, 0), P[0] = c.getValueAtTime((c.keyframes[c.keyframes.length - 1].t - 0.01) / u, 0), P[1] = v.getValueAtTime((v.keyframes[v.keyframes.length - 1].t - 0.01) / u, 0)) : (y = [c.pv, v.pv], P[0] = c.getValueAtTime((c._caching.lastFrame + c.offsetTime - 0.01) / u, c.offsetTime), P[1] = v.getValueAtTime((v._caching.lastFrame + v.offsetTime - 0.01) / u, v.offsetTime));
          } else
            P = t, y = P;
          this.v.rotate(-Math.atan2(y[1] - P[1], y[0] - P[0]));
        }
        this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
      }
      this.frameId = this.elem.globalData.frameId;
    }
  }
  function s() {
    if (this.appliedTransformations = 0, this.pre.reset(), !this.a.effectsSequence.length)
      this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1;
    else
      return;
    if (!this.s.effectsSequence.length)
      this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2;
    else
      return;
    if (this.sk)
      if (!this.sk.effectsSequence.length && !this.sa.effectsSequence.length)
        this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3;
      else
        return;
    this.r ? this.r.effectsSequence.length || (this.pre.rotate(-this.r.v), this.appliedTransformations = 4) : !this.rz.effectsSequence.length && !this.ry.effectsSequence.length && !this.rx.effectsSequence.length && !this.or.effectsSequence.length && (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4);
  }
  function r() {
  }
  function a(o) {
    this._addDynamicProperty(o), this.elem.addDynamicProperty(o), this._isDirty = !0;
  }
  function n(o, u, y) {
    if (this.elem = o, this.frameId = -1, this.propType = "transform", this.data = u, this.v = new ut(), this.pre = new ut(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(y || o), u.p && u.p.s ? (this.px = N.getProp(o, u.p.x, 0, 0, this), this.py = N.getProp(o, u.p.y, 0, 0, this), u.p.z && (this.pz = N.getProp(o, u.p.z, 0, 0, this))) : this.p = N.getProp(o, u.p || { k: [0, 0, 0] }, 1, 0, this), u.rx) {
      if (this.rx = N.getProp(o, u.rx, 0, lt, this), this.ry = N.getProp(o, u.ry, 0, lt, this), this.rz = N.getProp(o, u.rz, 0, lt, this), u.or.k[0].ti) {
        var P, c = u.or.k.length;
        for (P = 0; P < c; P += 1)
          u.or.k[P].to = null, u.or.k[P].ti = null;
      }
      this.or = N.getProp(o, u.or, 1, lt, this), this.or.sh = !0;
    } else
      this.r = N.getProp(o, u.r || { k: 0 }, 0, lt, this);
    u.sk && (this.sk = N.getProp(o, u.sk, 0, lt, this), this.sa = N.getProp(o, u.sa, 0, lt, this)), this.a = N.getProp(o, u.a || { k: [0, 0, 0] }, 1, 0, this), this.s = N.getProp(o, u.s || { k: [100, 100, 100] }, 1, 0.01, this), u.o ? this.o = N.getProp(o, u.o, 0, 0.01, o) : this.o = { _mdf: !1, v: 1 }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0);
  }
  n.prototype = {
    applyToMatrix: e,
    getValue: i,
    precalculateMatrix: s,
    autoOrient: r
  }, st([_t], n), n.prototype.addDynamicProperty = a, n.prototype._addDynamicProperty = _t.prototype.addDynamicProperty;
  function f(o, u, y) {
    return new n(o, u, y);
  }
  return {
    getTransformProperty: f
  };
}();
function Rt() {
}
st([xt], Rt);
Rt.prototype.initModifierProperties = function(t, e) {
  this.getValue = this.processKeys, this.c = N.getProp(t, e.c, 0, null, this), this.o = N.getProp(t, e.o, 0, null, this), this.tr = De.getTransformProperty(t, e.tr, this), this.so = N.getProp(t, e.tr.so, 0, 0.01, this), this.eo = N.getProp(t, e.tr.eo, 0, 0.01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new ut(), this.rMatrix = new ut(), this.sMatrix = new ut(), this.tMatrix = new ut(), this.matrix = new ut();
};
Rt.prototype.applyTransforms = function(t, e, i, s, r, a) {
  var n = a ? -1 : 1, f = s.s.v[0] + (1 - s.s.v[0]) * (1 - r), o = s.s.v[1] + (1 - s.s.v[1]) * (1 - r);
  t.translate(s.p.v[0] * n * r, s.p.v[1] * n * r, s.p.v[2]), e.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]), e.rotate(-s.r.v * n * r), e.translate(s.a.v[0], s.a.v[1], s.a.v[2]), i.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]), i.scale(a ? 1 / f : f, a ? 1 / o : o), i.translate(s.a.v[0], s.a.v[1], s.a.v[2]);
};
Rt.prototype.init = function(t, e, i, s) {
  for (this.elem = t, this.arr = e, this.pos = i, this.elemsData = s, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[i]); i > 0; )
    i -= 1, this._elements.unshift(e[i]);
  this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
};
Rt.prototype.resetElements = function(t) {
  var e, i = t.length;
  for (e = 0; e < i; e += 1)
    t[e]._processed = !1, t[e].ty === "gr" && this.resetElements(t[e].it);
};
Rt.prototype.cloneElements = function(t) {
  var e = JSON.parse(JSON.stringify(t));
  return this.resetElements(e), e;
};
Rt.prototype.changeGroupRender = function(t, e) {
  var i, s = t.length;
  for (i = 0; i < s; i += 1)
    t[i]._render = e, t[i].ty === "gr" && this.changeGroupRender(t[i].it, e);
};
Rt.prototype.processShapes = function(t) {
  var e, i, s, r, a, n = !1;
  if (this._mdf || t) {
    var f = Math.ceil(this.c.v);
    if (this._groups.length < f) {
      for (; this._groups.length < f; ) {
        var o = {
          it: this.cloneElements(this._elements),
          ty: "gr"
        };
        o.it.push({
          a: { a: 0, ix: 1, k: [0, 0] },
          nm: "Transform",
          o: { a: 0, ix: 7, k: 100 },
          p: { a: 0, ix: 2, k: [0, 0] },
          r: { a: 1, ix: 6, k: [{ s: 0, e: 0, t: 0 }, { s: 0, e: 0, t: 1 }] },
          s: { a: 0, ix: 3, k: [100, 100] },
          sa: { a: 0, ix: 5, k: 0 },
          sk: { a: 0, ix: 4, k: 0 },
          ty: "tr"
        }), this.arr.splice(0, 0, o), this._groups.splice(0, 0, o), this._currentCopies += 1;
      }
      this.elem.reloadShapes(), n = !0;
    }
    a = 0;
    var u;
    for (s = 0; s <= this._groups.length - 1; s += 1) {
      if (u = a < f, this._groups[s]._render = u, this.changeGroupRender(this._groups[s].it, u), !u) {
        var y = this.elemsData[s].it, P = y[y.length - 1];
        P.transform.op.v !== 0 ? (P.transform.op._mdf = !0, P.transform.op.v = 0) : P.transform.op._mdf = !1;
      }
      a += 1;
    }
    this._currentCopies = f;
    var c = this.o.v, v = c % 1, g = c > 0 ? Math.floor(c) : Math.ceil(c), d = this.pMatrix.props, k = this.rMatrix.props, l = this.sMatrix.props;
    this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
    var h = 0;
    if (c > 0) {
      for (; h < g; )
        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), h += 1;
      v && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, v, !1), h += v);
    } else if (c < 0) {
      for (; h > g; )
        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), h -= 1;
      v && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -v, !0), h -= v);
    }
    s = this.data.m === 1 ? 0 : this._currentCopies - 1, r = this.data.m === 1 ? 1 : -1, a = this._currentCopies;
    for (var p, m; a; ) {
      if (e = this.elemsData[s].it, i = e[e.length - 1].transform.mProps.v.props, m = i.length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this._currentCopies === 1 ? this.so.v : this.so.v + (this.eo.v - this.so.v) * (s / (this._currentCopies - 1)), h !== 0) {
        for ((s !== 0 && r === 1 || s !== this._currentCopies - 1 && r === -1) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(k[0], k[1], k[2], k[3], k[4], k[5], k[6], k[7], k[8], k[9], k[10], k[11], k[12], k[13], k[14], k[15]), this.matrix.transform(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14], l[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), p = 0; p < m; p += 1)
          i[p] = this.matrix.props[p];
        this.matrix.reset();
      } else
        for (this.matrix.reset(), p = 0; p < m; p += 1)
          i[p] = this.matrix.props[p];
      h += 1, a -= 1, s += r;
    }
  } else
    for (a = this._currentCopies, s = 0, r = 1; a; )
      e = this.elemsData[s].it, i = e[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, a -= 1, s += r;
  return n;
};
Rt.prototype.addShape = function() {
};
function Ie() {
}
st([xt], Ie);
Ie.prototype.initModifierProperties = function(t, e) {
  this.getValue = this.processKeys, this.rd = N.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
};
Ie.prototype.processPath = function(t, e) {
  var i = gt.newElement();
  i.c = t.c;
  var s, r = t._length, a, n, f, o, u, y, P = 0, c, v, g, d, k, l;
  for (s = 0; s < r; s += 1)
    a = t.v[s], f = t.o[s], n = t.i[s], a[0] === f[0] && a[1] === f[1] && a[0] === n[0] && a[1] === n[1] ? (s === 0 || s === r - 1) && !t.c ? (i.setTripleAt(a[0], a[1], f[0], f[1], n[0], n[1], P), P += 1) : (s === 0 ? o = t.v[r - 1] : o = t.v[s - 1], u = Math.sqrt(Math.pow(a[0] - o[0], 2) + Math.pow(a[1] - o[1], 2)), y = u ? Math.min(u / 2, e) / u : 0, k = a[0] + (o[0] - a[0]) * y, c = k, l = a[1] - (a[1] - o[1]) * y, v = l, g = c - (c - a[0]) * Ut, d = v - (v - a[1]) * Ut, i.setTripleAt(c, v, g, d, k, l, P), P += 1, s === r - 1 ? o = t.v[0] : o = t.v[s + 1], u = Math.sqrt(Math.pow(a[0] - o[0], 2) + Math.pow(a[1] - o[1], 2)), y = u ? Math.min(u / 2, e) / u : 0, g = a[0] + (o[0] - a[0]) * y, c = g, d = a[1] + (o[1] - a[1]) * y, v = d, k = c - (c - a[0]) * Ut, l = v - (v - a[1]) * Ut, i.setTripleAt(c, v, g, d, k, l, P), P += 1) : (i.setTripleAt(t.v[s][0], t.v[s][1], t.o[s][0], t.o[s][1], t.i[s][0], t.i[s][1], P), P += 1);
  return i;
};
Ie.prototype.processShapes = function(t) {
  var e, i, s = this.shapes.length, r, a, n = this.rd.v;
  if (n !== 0) {
    var f, o;
    for (i = 0; i < s; i += 1) {
      if (f = this.shapes[i], o = f.localShapeCollection, !(!f.shape._mdf && !this._mdf && !t))
        for (o.releaseShapes(), f.shape._mdf = !0, e = f.shape.paths.shapes, a = f.shape.paths._length, r = 0; r < a; r += 1)
          o.addShape(this.processPath(e[r], n));
      f.shape.paths = f.localShapeCollection;
    }
  }
  this.dynamicProperties.length || (this._mdf = !1);
};
function Xe(t, e) {
  return Math.abs(t - e) * 1e5 <= Math.min(Math.abs(t), Math.abs(e));
}
function di(t) {
  return Math.abs(t) <= 1e-5;
}
function Ki(t, e, i) {
  return t * (1 - i) + e * i;
}
function Xt(t, e, i) {
  return [Ki(t[0], e[0], i), Ki(t[1], e[1], i)];
}
function ta(t, e, i) {
  if (t === 0) return [];
  var s = e * e - 4 * t * i;
  if (s < 0) return [];
  var r = -e / (2 * t);
  if (s === 0) return [r];
  var a = Math.sqrt(s) / (2 * t);
  return [r - a, r + a];
}
function Qi(t, e, i, s) {
  return [
    -t + 3 * e - 3 * i + s,
    3 * t - 6 * e + 3 * i,
    -3 * t + 3 * e,
    t
  ];
}
function ts(t) {
  return new ft(t, t, t, t, !1);
}
function ft(t, e, i, s, r) {
  r && ge(t, e) && (e = Xt(t, s, 1 / 3)), r && ge(i, s) && (i = Xt(t, s, 2 / 3));
  var a = Qi(t[0], e[0], i[0], s[0]), n = Qi(t[1], e[1], i[1], s[1]);
  this.a = [a[0], n[0]], this.b = [a[1], n[1]], this.c = [a[2], n[2]], this.d = [a[3], n[3]], this.points = [t, e, i, s];
}
ft.prototype.point = function(t) {
  return [
    ((this.a[0] * t + this.b[0]) * t + this.c[0]) * t + this.d[0],
    ((this.a[1] * t + this.b[1]) * t + this.c[1]) * t + this.d[1]
  ];
};
ft.prototype.derivative = function(t) {
  return [
    (3 * t * this.a[0] + 2 * this.b[0]) * t + this.c[0],
    (3 * t * this.a[1] + 2 * this.b[1]) * t + this.c[1]
  ];
};
ft.prototype.tangentAngle = function(t) {
  var e = this.derivative(t);
  return Math.atan2(e[1], e[0]);
};
ft.prototype.normalAngle = function(t) {
  var e = this.derivative(t);
  return Math.atan2(e[0], e[1]);
};
ft.prototype.inflectionPoints = function() {
  var t = this.a[1] * this.b[0] - this.a[0] * this.b[1];
  if (di(t)) return [];
  var e = -0.5 * (this.a[1] * this.c[0] - this.a[0] * this.c[1]) / t, i = e * e - 1 / 3 * (this.b[1] * this.c[0] - this.b[0] * this.c[1]) / t;
  if (i < 0) return [];
  var s = Math.sqrt(i);
  return di(s) ? s > 0 && s < 1 ? [e] : [] : [e - s, e + s].filter(function(r) {
    return r > 0 && r < 1;
  });
};
ft.prototype.split = function(t) {
  if (t <= 0) return [ts(this.points[0]), this];
  if (t >= 1) return [this, ts(this.points[this.points.length - 1])];
  var e = Xt(this.points[0], this.points[1], t), i = Xt(this.points[1], this.points[2], t), s = Xt(this.points[2], this.points[3], t), r = Xt(e, i, t), a = Xt(i, s, t), n = Xt(r, a, t);
  return [
    new ft(this.points[0], e, r, n, !0),
    new ft(n, a, s, this.points[3], !0)
  ];
};
function es(t, e) {
  var i = t.points[0][e], s = t.points[t.points.length - 1][e];
  if (i > s) {
    var r = s;
    s = i, i = r;
  }
  for (var a = ta(3 * t.a[e], 2 * t.b[e], t.c[e]), n = 0; n < a.length; n += 1)
    if (a[n] > 0 && a[n] < 1) {
      var f = t.point(a[n])[e];
      f < i ? i = f : f > s && (s = f);
    }
  return {
    min: i,
    max: s
  };
}
ft.prototype.bounds = function() {
  return {
    x: es(this, 0),
    y: es(this, 1)
  };
};
ft.prototype.boundingBox = function() {
  var t = this.bounds();
  return {
    left: t.x.min,
    right: t.x.max,
    top: t.y.min,
    bottom: t.y.max,
    width: t.x.max - t.x.min,
    height: t.y.max - t.y.min,
    cx: (t.x.max + t.x.min) / 2,
    cy: (t.y.max + t.y.min) / 2
  };
};
function Ue(t, e, i) {
  var s = t.boundingBox();
  return {
    cx: s.cx,
    cy: s.cy,
    width: s.width,
    height: s.height,
    bez: t,
    t: (e + i) / 2,
    t1: e,
    t2: i
  };
}
function is(t) {
  var e = t.bez.split(0.5);
  return [
    Ue(e[0], t.t1, t.t),
    Ue(e[1], t.t, t.t2)
  ];
}
function ea(t, e) {
  return Math.abs(t.cx - e.cx) * 2 < t.width + e.width && Math.abs(t.cy - e.cy) * 2 < t.height + e.height;
}
function Ee(t, e, i, s, r, a) {
  if (ea(t, e)) {
    if (i >= a || t.width <= s && t.height <= s && e.width <= s && e.height <= s) {
      r.push([t.t, e.t]);
      return;
    }
    var n = is(t), f = is(e);
    Ee(n[0], f[0], i + 1, s, r, a), Ee(n[0], f[1], i + 1, s, r, a), Ee(n[1], f[0], i + 1, s, r, a), Ee(n[1], f[1], i + 1, s, r, a);
  }
}
ft.prototype.intersections = function(t, e, i) {
  e === void 0 && (e = 2), i === void 0 && (i = 7);
  var s = [];
  return Ee(Ue(this, 0, 1), Ue(t, 0, 1), 0, e, s, i), s;
};
ft.shapeSegment = function(t, e) {
  var i = (e + 1) % t.length();
  return new ft(t.v[e], t.o[e], t.i[i], t.v[i], !0);
};
ft.shapeSegmentInverted = function(t, e) {
  var i = (e + 1) % t.length();
  return new ft(t.v[i], t.i[i], t.o[e], t.v[e], !0);
};
function li(t, e) {
  return [
    t[1] * e[2] - t[2] * e[1],
    t[2] * e[0] - t[0] * e[2],
    t[0] * e[1] - t[1] * e[0]
  ];
}
function We(t, e, i, s) {
  var r = [t[0], t[1], 1], a = [e[0], e[1], 1], n = [i[0], i[1], 1], f = [s[0], s[1], 1], o = li(
    li(r, a),
    li(n, f)
  );
  return di(o[2]) ? null : [o[0] / o[2], o[1] / o[2]];
}
function de(t, e, i) {
  return [
    t[0] + Math.cos(e) * i,
    t[1] - Math.sin(e) * i
  ];
}
function pi(t, e) {
  return Math.hypot(t[0] - e[0], t[1] - e[1]);
}
function ge(t, e) {
  return Xe(t[0], e[0]) && Xe(t[1], e[1]);
}
function Te() {
}
st([xt], Te);
Te.prototype.initModifierProperties = function(t, e) {
  this.getValue = this.processKeys, this.amplitude = N.getProp(t, e.s, 0, null, this), this.frequency = N.getProp(t, e.r, 0, null, this), this.pointsType = N.getProp(t, e.pt, 0, null, this), this._isAnimated = this.amplitude.effectsSequence.length !== 0 || this.frequency.effectsSequence.length !== 0 || this.pointsType.effectsSequence.length !== 0;
};
function Ds(t, e, i, s, r, a, n) {
  var f = i - Math.PI / 2, o = i + Math.PI / 2, u = e[0] + Math.cos(i) * s * r, y = e[1] - Math.sin(i) * s * r;
  t.setTripleAt(
    u,
    y,
    u + Math.cos(f) * a,
    y - Math.sin(f) * a,
    u + Math.cos(o) * n,
    y - Math.sin(o) * n,
    t.length()
  );
}
function ia(t, e) {
  var i = [
    e[0] - t[0],
    e[1] - t[1]
  ], s = -Math.PI * 0.5, r = [
    Math.cos(s) * i[0] - Math.sin(s) * i[1],
    Math.sin(s) * i[0] + Math.cos(s) * i[1]
  ];
  return r;
}
function sa(t, e) {
  var i = e === 0 ? t.length() - 1 : e - 1, s = (e + 1) % t.length(), r = t.v[i], a = t.v[s], n = ia(r, a);
  return Math.atan2(0, 1) - Math.atan2(n[1], n[0]);
}
function ss(t, e, i, s, r, a, n) {
  var f = sa(e, i), o = e.v[i % e._length], u = e.v[i === 0 ? e._length - 1 : i - 1], y = e.v[(i + 1) % e._length], P = a === 2 ? Math.sqrt(Math.pow(o[0] - u[0], 2) + Math.pow(o[1] - u[1], 2)) : 0, c = a === 2 ? Math.sqrt(Math.pow(o[0] - y[0], 2) + Math.pow(o[1] - y[1], 2)) : 0;
  Ds(
    t,
    e.v[i % e._length],
    f,
    n,
    s,
    c / ((r + 1) * 2),
    P / ((r + 1) * 2)
  );
}
function ra(t, e, i, s, r, a) {
  for (var n = 0; n < s; n += 1) {
    var f = (n + 1) / (s + 1), o = r === 2 ? Math.sqrt(Math.pow(e.points[3][0] - e.points[0][0], 2) + Math.pow(e.points[3][1] - e.points[0][1], 2)) : 0, u = e.normalAngle(f), y = e.point(f);
    Ds(
      t,
      y,
      u,
      a,
      i,
      o / ((s + 1) * 2),
      o / ((s + 1) * 2)
    ), a = -a;
  }
  return a;
}
Te.prototype.processPath = function(t, e, i, s) {
  var r = t._length, a = gt.newElement();
  if (a.c = t.c, t.c || (r -= 1), r === 0) return a;
  var n = -1, f = ft.shapeSegment(t, 0);
  ss(a, t, 0, e, i, s, n);
  for (var o = 0; o < r; o += 1)
    n = ra(a, f, e, i, s, -n), o === r - 1 && !t.c ? f = null : f = ft.shapeSegment(t, (o + 1) % r), ss(a, t, o + 1, e, i, s, n);
  return a;
};
Te.prototype.processShapes = function(t) {
  var e, i, s = this.shapes.length, r, a, n = this.amplitude.v, f = Math.max(0, Math.round(this.frequency.v)), o = this.pointsType.v;
  if (n !== 0) {
    var u, y;
    for (i = 0; i < s; i += 1) {
      if (u = this.shapes[i], y = u.localShapeCollection, !(!u.shape._mdf && !this._mdf && !t))
        for (y.releaseShapes(), u.shape._mdf = !0, e = u.shape.paths.shapes, a = u.shape.paths._length, r = 0; r < a; r += 1)
          y.addShape(this.processPath(e[r], n, f, o));
      u.shape.paths = u.localShapeCollection;
    }
  }
  this.dynamicProperties.length || (this._mdf = !1);
};
function fi(t, e, i) {
  var s = Math.atan2(e[0] - t[0], e[1] - t[1]);
  return [
    de(t, s, i),
    de(e, s, i)
  ];
}
function ce(t, e) {
  var i, s, r, a, n, f, o;
  o = fi(t.points[0], t.points[1], e), i = o[0], s = o[1], o = fi(t.points[1], t.points[2], e), r = o[0], a = o[1], o = fi(t.points[2], t.points[3], e), n = o[0], f = o[1];
  var u = We(i, s, r, a);
  u === null && (u = s);
  var y = We(n, f, r, a);
  return y === null && (y = n), new ft(i, u, y, f);
}
function rs(t, e, i, s, r) {
  var a = e.points[3], n = i.points[0];
  if (s === 3 || ge(a, n)) return a;
  if (s === 2) {
    var f = -e.tangentAngle(1), o = -i.tangentAngle(0) + Math.PI, u = We(
      a,
      de(a, f + Math.PI / 2, 100),
      n,
      de(n, f + Math.PI / 2, 100)
    ), y = u ? pi(u, a) : pi(a, n) / 2, P = de(a, f, 2 * y * Ut);
    return t.setXYAt(P[0], P[1], "o", t.length() - 1), P = de(n, o, 2 * y * Ut), t.setTripleAt(n[0], n[1], n[0], n[1], P[0], P[1], t.length()), n;
  }
  var c = ge(a, e.points[2]) ? e.points[0] : e.points[2], v = ge(n, i.points[1]) ? i.points[3] : i.points[1], g = We(c, a, n, v);
  return g && pi(g, a) < r ? (t.setTripleAt(
    g[0],
    g[1],
    g[0],
    g[1],
    g[0],
    g[1],
    t.length()
  ), g) : a;
}
function as(t, e) {
  const i = t.intersections(e);
  return i.length && Xe(i[0][0], 1) && i.shift(), i.length ? i[0] : null;
}
function ns(t, e) {
  var i = t.slice(), s = e.slice(), r = as(t[t.length - 1], e[0]);
  return r && (i[t.length - 1] = t[t.length - 1].split(r[0])[0], s[0] = e[0].split(r[1])[1]), t.length > 1 && e.length > 1 && (r = as(t[0], e[e.length - 1]), r) ? [
    [t[0].split(r[0])[0]],
    [e[e.length - 1].split(r[1])[1]]
  ] : [i, s];
}
function aa(t) {
  for (var e, i = 1; i < t.length; i += 1)
    e = ns(t[i - 1], t[i]), t[i - 1] = e[0], t[i] = e[1];
  return t.length > 1 && (e = ns(t[t.length - 1], t[0]), t[t.length - 1] = e[0], t[0] = e[1]), t;
}
function os(t, e) {
  var i = t.inflectionPoints(), s, r, a, n;
  if (i.length === 0)
    return [ce(t, e)];
  if (i.length === 1 || Xe(i[1], 1))
    return a = t.split(i[0]), s = a[0], r = a[1], [
      ce(s, e),
      ce(r, e)
    ];
  a = t.split(i[0]), s = a[0];
  var f = (i[1] - i[0]) / (1 - i[0]);
  return a = a[1].split(f), n = a[0], r = a[1], [
    ce(s, e),
    ce(n, e),
    ce(r, e)
  ];
}
function Fe() {
}
st([xt], Fe);
Fe.prototype.initModifierProperties = function(t, e) {
  this.getValue = this.processKeys, this.amount = N.getProp(t, e.a, 0, null, this), this.miterLimit = N.getProp(t, e.ml, 0, null, this), this.lineJoin = e.lj, this._isAnimated = this.amount.effectsSequence.length !== 0;
};
Fe.prototype.processPath = function(t, e, i, s) {
  var r = gt.newElement();
  r.c = t.c;
  var a = t.length();
  t.c || (a -= 1);
  var n, f, o, u = [];
  for (n = 0; n < a; n += 1)
    o = ft.shapeSegment(t, n), u.push(os(o, e));
  if (!t.c)
    for (n = a - 1; n >= 0; n -= 1)
      o = ft.shapeSegmentInverted(t, n), u.push(os(o, e));
  u = aa(u);
  var y = null, P = null;
  for (n = 0; n < u.length; n += 1) {
    var c = u[n];
    for (P && (y = rs(r, P, c[0], i, s)), P = c[c.length - 1], f = 0; f < c.length; f += 1)
      o = c[f], y && ge(o.points[0], y) ? r.setXYAt(o.points[1][0], o.points[1][1], "o", r.length() - 1) : r.setTripleAt(
        o.points[0][0],
        o.points[0][1],
        o.points[1][0],
        o.points[1][1],
        o.points[0][0],
        o.points[0][1],
        r.length()
      ), r.setTripleAt(
        o.points[3][0],
        o.points[3][1],
        o.points[3][0],
        o.points[3][1],
        o.points[2][0],
        o.points[2][1],
        r.length()
      ), y = o.points[3];
  }
  return u.length && rs(r, P, u[0][0], i, s), r;
};
Fe.prototype.processShapes = function(t) {
  var e, i, s = this.shapes.length, r, a, n = this.amount.v, f = this.miterLimit.v, o = this.lineJoin;
  if (n !== 0) {
    var u, y;
    for (i = 0; i < s; i += 1) {
      if (u = this.shapes[i], y = u.localShapeCollection, !(!u.shape._mdf && !this._mdf && !t))
        for (y.releaseShapes(), u.shape._mdf = !0, e = u.shape.paths.shapes, a = u.shape.paths._length, r = 0; r < a; r += 1)
          y.addShape(this.processPath(e[r], n, o, f));
      u.shape.paths = u.localShapeCollection;
    }
  }
  this.dynamicProperties.length || (this._mdf = !1);
};
const na = "http://www.w3.org/2000/svg";
function B(t) {
  return document.createElementNS(na, t);
}
function St() {
}
St.prototype.checkLayers = function(t) {
  var e, i = this.layers.length, s;
  for (this.completeLayers = !0, e = i - 1; e >= 0; e -= 1)
    this.elements[e] || (s = this.layers[e], s.ip - s.st <= t - this.layers[e].st && s.op - s.st > t - this.layers[e].st && this.buildItem(e)), this.completeLayers = this.elements[e] ? this.completeLayers : !1;
  this.checkPendingElements();
};
St.prototype.createItem = function(t) {
  switch (t.ty) {
    case 0:
      return this.createComp(t);
    case 1:
      return this.createSolid(t);
    case 3:
      return this.createNull(t);
    case 4:
      return this.createShape(t);
    default:
      return this.createNull(t);
  }
};
St.prototype.buildAllItems = function() {
  var t, e = this.layers.length;
  for (t = 0; t < e; t += 1)
    this.buildItem(t);
  this.checkPendingElements();
};
St.prototype.includeLayers = function(t) {
  this.completeLayers = !1;
  var e, i = t.length, s, r = this.layers.length;
  for (e = 0; e < i; e += 1)
    for (s = 0; s < r; ) {
      if (this.layers[s].id === t[e].id) {
        this.layers[s] = t[e];
        break;
      }
      s += 1;
    }
};
St.prototype.setProjectInterface = function(t) {
  this.globalData.projectInterface = t;
};
St.prototype.initItems = function() {
  this.globalData.progressiveLoad || this.buildAllItems();
};
St.prototype.buildElementParenting = function(t, e, i) {
  for (var s = this.elements, r = this.layers, a = 0, n = r.length; a < n; )
    r[a].ind == e && (!s[a] || s[a] === !0 ? (this.buildItem(a), this.addPendingElement(t)) : (i.push(s[a]), s[a].setAsParent(), r[a].parent !== void 0 ? this.buildElementParenting(t, r[a].parent, i) : t.setHierarchy(i))), a += 1;
};
St.prototype.addPendingElement = function(t) {
  this.pendingElements.push(t);
};
St.prototype.searchExtraCompositions = function(t) {
  var e, i = t.length;
  for (e = 0; e < i; e += 1)
    if (t[e].xt) {
      var s = this.createComp(t[e]);
      s.initExpressions(), this.globalData.projectInterface.registerComposition(s);
    }
};
St.prototype.getElementById = function(t) {
  var e, i = this.elements.length;
  for (e = 0; e < i; e += 1)
    if (this.elements[e].data.ind === t)
      return this.elements[e];
  return null;
};
St.prototype.getElementByPath = function(t) {
  var e = t.shift(), i;
  if (typeof e == "number")
    i = this.elements[e];
  else {
    var s, r = this.elements.length;
    for (s = 0; s < r; s += 1)
      if (this.elements[s].data.nm === e) {
        i = this.elements[s];
        break;
      }
  }
  return t.length === 0 ? i : i.getElementByPath(t);
};
St.prototype.setupGlobalData = function(t, e) {
  this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
    w: t.w,
    h: t.h
  };
};
const vi = /* @__PURE__ */ function() {
  var t = {
    0: "source-over",
    1: "multiply",
    2: "screen",
    3: "overlay",
    4: "darken",
    5: "lighten",
    6: "color-dodge",
    7: "color-burn",
    8: "hard-light",
    9: "soft-light",
    10: "difference",
    11: "exclusion",
    12: "hue",
    13: "saturation",
    14: "color",
    15: "luminosity"
  };
  return function(e) {
    return t[e] || "";
  };
}();
function oa(t, e, i) {
  this.p = N.getProp(e, t.v, 0, 0, i);
}
function ha(t, e, i) {
  this.p = N.getProp(e, t.v, 0, 0, i);
}
function la(t, e, i) {
  this.p = N.getProp(e, t.v, 1, 0, i);
}
function pa(t, e, i) {
  this.p = N.getProp(e, t.v, 1, 0, i);
}
function fa(t, e, i) {
  this.p = N.getProp(e, t.v, 0, 0, i);
}
function ua(t, e, i) {
  this.p = N.getProp(e, t.v, 0, 0, i);
}
function ca(t, e, i) {
  this.p = N.getProp(e, t.v, 0, 0, i);
}
function ma() {
  this.p = {};
}
function Cs(t, e) {
  var i = t.ef || [];
  this.effectElements = [];
  var s, r = i.length, a;
  for (s = 0; s < r; s += 1)
    a = new Ce(i[s], e), this.effectElements.push(a);
}
function Ce(t, e) {
  this.init(t, e);
}
st([_t], Ce);
Ce.prototype.getValue = Ce.prototype.iterateDynamicProperties;
Ce.prototype.init = function(t, e) {
  this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
  var i, s = this.data.ef.length, r, a = this.data.ef;
  for (i = 0; i < s; i += 1) {
    switch (r = null, a[i].ty) {
      case 0:
        r = new oa(a[i], e, this);
        break;
      case 1:
        r = new ha(a[i], e, this);
        break;
      case 2:
        r = new la(a[i], e, this);
        break;
      case 3:
        r = new pa(a[i], e, this);
        break;
      case 4:
      case 7:
        r = new ca(a[i], e, this);
        break;
      case 10:
        r = new fa(a[i], e, this);
        break;
      case 11:
        r = new ua(a[i], e, this);
        break;
      case 5:
        r = new Cs(a[i], e);
        break;
      // case 6:
      default:
        r = new ma(a[i]);
        break;
    }
    r && this.effectElements.push(r);
  }
};
function Ve() {
}
Ve.prototype = {
  checkMasks: function() {
    if (!this.data.hasMask)
      return !1;
    for (var t = 0, e = this.data.masksProperties.length; t < e; ) {
      if (this.data.masksProperties[t].mode !== "n" && this.data.masksProperties[t].cl !== !1)
        return !0;
      t += 1;
    }
    return !1;
  },
  initExpressions: function() {
    const t = Mr();
    if (!t)
      return;
    const e = t("layer"), i = t("effects"), s = t("shape"), r = t("comp");
    this.layerInterface = e(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
    var a = i.createEffectsInterface(this, this.layerInterface);
    this.layerInterface.registerEffectsInterface(a), this.data.ty === 0 || this.data.xt ? this.compInterface = r(this) : this.data.ty === 4 && (this.layerInterface.shapeInterface = s(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface);
  },
  setBlendMode: function() {
    var t = vi(this.data.bm), e = this.baseElement || this.layerElement;
    e.style["mix-blend-mode"] = t;
  },
  initBaseData: function(t, e, i) {
    this.globalData = e, this.comp = i, this.data = t, this.layerId = vt(), this.data.sr || (this.data.sr = 1), this.effectsManager = new Cs(this.data, this, this.dynamicProperties);
  },
  getType: function() {
    return this.type;
  },
  sourceRectAtTime: function() {
  }
};
const Ms = {
  TRANSFORM_EFFECT: "transformEFfect"
};
function Le() {
}
Le.prototype = {
  initTransform: function() {
    var t = new ut();
    this.finalTransform = {
      mProp: this.data.ks ? De.getTransformProperty(this, this.data.ks, this) : { o: 0 },
      _matMdf: !1,
      _localMatMdf: !1,
      _opMdf: !1,
      mat: t,
      localMat: t,
      localOpacity: 1
    }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty;
  },
  renderTransform: function() {
    if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
      var t, e = this.finalTransform.mat, i = 0, s = this.hierarchy.length;
      if (!this.finalTransform._matMdf)
        for (; i < s; ) {
          if (this.hierarchy[i].finalTransform.mProp._mdf) {
            this.finalTransform._matMdf = !0;
            break;
          }
          i += 1;
        }
      if (this.finalTransform._matMdf)
        for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), i = 0; i < s; i += 1)
          e.multiply(this.hierarchy[i].finalTransform.mProp.v);
    }
    (!this.localTransforms || this.finalTransform._matMdf) && (this.finalTransform._localMatMdf = this.finalTransform._matMdf), this.finalTransform._opMdf && (this.finalTransform.localOpacity = this.finalTransform.mProp.o.v);
  },
  renderLocalTransform: function() {
    if (this.localTransforms) {
      var t = 0, e = this.localTransforms.length;
      if (this.finalTransform._localMatMdf = this.finalTransform._matMdf, !this.finalTransform._localMatMdf || !this.finalTransform._opMdf)
        for (; t < e; )
          this.localTransforms[t]._mdf && (this.finalTransform._localMatMdf = !0), this.localTransforms[t]._opMdf && !this.finalTransform._opMdf && (this.finalTransform.localOpacity = this.finalTransform.mProp.o.v, this.finalTransform._opMdf = !0), t += 1;
      if (this.finalTransform._localMatMdf) {
        var i = this.finalTransform.localMat;
        for (this.localTransforms[0].matrix.clone(i), t = 1; t < e; t += 1) {
          var s = this.localTransforms[t].matrix;
          i.multiply(s);
        }
        i.multiply(this.finalTransform.mat);
      }
      if (this.finalTransform._opMdf) {
        var r = this.finalTransform.localOpacity;
        for (t = 0; t < e; t += 1)
          r *= this.localTransforms[t].opacity * 0.01;
        this.finalTransform.localOpacity = r;
      }
    }
  },
  searchEffectTransforms: function() {
    if (this.renderableEffectsManager) {
      var t = this.renderableEffectsManager.getEffects(Ms.TRANSFORM_EFFECT);
      if (t.length) {
        this.localTransforms = [], this.finalTransform.localMat = new ut();
        var e = 0, i = t.length;
        for (e = 0; e < i; e += 1)
          this.localTransforms.push(t[e]);
      }
    }
  },
  globalToLocal: function(t) {
    var e = [];
    e.push(this.finalTransform);
    for (var i = !0, s = this.comp; i; )
      s.finalTransform ? (s.data.hasMask && e.splice(0, 0, s.finalTransform), s = s.comp) : i = !1;
    var r, a = e.length, n;
    for (r = 0; r < a; r += 1)
      n = e[r].mat.applyToPointArray(0, 0, 0), t = [t[0] - n[0], t[1] - n[1], 0];
    return t;
  },
  mHelper: new ut()
};
function oe(t, e, i) {
  this.data = t, this.element = e, this.globalData = i, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
  var s = this.globalData.defs, r, a = this.masksProperties ? this.masksProperties.length : 0;
  this.viewData = mt(a), this.solidPath = "";
  var n, f = this.masksProperties, o = 0, u = [], y, P, c = vt(), v, g, d, k, l = "clipPath", h = "clip-path";
  for (r = 0; r < a; r += 1)
    if ((f[r].mode !== "a" && f[r].mode !== "n" || f[r].inv || f[r].o.k !== 100 || f[r].o.x) && (l = "mask", h = "mask"), (f[r].mode === "s" || f[r].mode === "i") && o === 0 ? (v = B("rect"), v.setAttribute("fill", "#ffffff"), v.setAttribute("width", this.element.comp.data.w || 0), v.setAttribute("height", this.element.comp.data.h || 0), u.push(v)) : v = null, n = B("path"), f[r].mode === "n")
      this.viewData[r] = {
        op: N.getProp(this.element, f[r].o, 0, 0.01, this.element),
        prop: Wt.getShapeProp(this.element, f[r], 3),
        elem: n,
        lastPath: ""
      }, s.appendChild(n);
    else {
      o += 1, n.setAttribute("fill", f[r].mode === "s" ? "#000000" : "#ffffff"), n.setAttribute("clip-rule", "nonzero");
      var p;
      if (f[r].x.k !== 0 ? (l = "mask", h = "mask", k = N.getProp(this.element, f[r].x, 0, null, this.element), p = vt(), g = B("filter"), g.setAttribute("id", p), d = B("feMorphology"), d.setAttribute("operator", "erode"), d.setAttribute("in", "SourceGraphic"), d.setAttribute("radius", "0"), g.appendChild(d), s.appendChild(g), n.setAttribute("stroke", f[r].mode === "s" ? "#000000" : "#ffffff")) : (d = null, k = null), this.storedData[r] = {
        elem: n,
        x: k,
        expan: d,
        lastPath: "",
        lastOperator: "",
        filterId: p,
        lastRadius: 0
      }, f[r].mode === "i") {
        P = u.length;
        var m = B("g");
        for (y = 0; y < P; y += 1)
          m.appendChild(u[y]);
        var b = B("mask");
        b.setAttribute("mask-type", "alpha"), b.setAttribute("id", c + "_" + o), b.appendChild(n), s.appendChild(b), m.setAttribute("mask", "url(" + At() + "#" + c + "_" + o + ")"), u.length = 0, u.push(m);
      } else
        u.push(n);
      f[r].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[r] = {
        elem: n,
        lastPath: "",
        op: N.getProp(this.element, f[r].o, 0, 0.01, this.element),
        prop: Wt.getShapeProp(this.element, f[r], 3),
        invRect: v
      }, this.viewData[r].prop.k || this.drawPath(f[r], this.viewData[r].prop.v, this.viewData[r]);
    }
  for (this.maskElement = B(l), a = u.length, r = 0; r < a; r += 1)
    this.maskElement.appendChild(u[r]);
  o > 0 && (this.maskElement.setAttribute("id", c), this.element.maskedElement.setAttribute(h, "url(" + At() + "#" + c + ")"), s.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
}
oe.prototype.getMaskProperty = function(t) {
  return this.viewData[t].prop;
};
oe.prototype.renderFrame = function(t) {
  var e = this.element.finalTransform.mat, i, s = this.masksProperties.length;
  for (i = 0; i < s; i += 1)
    if ((this.viewData[i].prop._mdf || t) && this.drawPath(this.masksProperties[i], this.viewData[i].prop.v, this.viewData[i]), (this.viewData[i].op._mdf || t) && this.viewData[i].elem.setAttribute("fill-opacity", this.viewData[i].op.v), this.masksProperties[i].mode !== "n" && (this.viewData[i].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[i].invRect.setAttribute("transform", e.getInverseMatrix().to2dCSS()), this.storedData[i].x && (this.storedData[i].x._mdf || t))) {
      var r = this.storedData[i].expan;
      this.storedData[i].x.v < 0 ? (this.storedData[i].lastOperator !== "erode" && (this.storedData[i].lastOperator = "erode", this.storedData[i].elem.setAttribute("filter", "url(" + At() + "#" + this.storedData[i].filterId + ")")), r.setAttribute("radius", -this.storedData[i].x.v)) : (this.storedData[i].lastOperator !== "dilate" && (this.storedData[i].lastOperator = "dilate", this.storedData[i].elem.setAttribute("filter", null)), this.storedData[i].elem.setAttribute("stroke-width", this.storedData[i].x.v * 2));
    }
};
oe.prototype.getMaskelement = function() {
  return this.maskElement;
};
oe.prototype.createLayerSolidPath = function() {
  var t = "M0,0 ";
  return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " ", t;
};
oe.prototype.drawPath = function(t, e, i) {
  var s = " M" + e.v[0][0] + "," + e.v[0][1], r, a;
  for (a = e._length, r = 1; r < a; r += 1)
    s += " C" + e.o[r - 1][0] + "," + e.o[r - 1][1] + " " + e.i[r][0] + "," + e.i[r][1] + " " + e.v[r][0] + "," + e.v[r][1];
  if (e.c && a > 1 && (s += " C" + e.o[r - 1][0] + "," + e.o[r - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), i.lastPath !== s) {
    var n = "";
    i.elem && (e.c && (n = t.inv ? this.solidPath + s : s), i.elem.setAttribute("d", n)), i.lastPath = s;
  }
};
oe.prototype.destroy = function() {
  this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
};
const we = function() {
  var t = {};
  t.createFilter = e, t.createAlphaToLuminanceFilter = i;
  function e(s, r) {
    var a = B("filter");
    return a.setAttribute("id", s), r !== !0 && (a.setAttribute("filterUnits", "objectBoundingBox"), a.setAttribute("x", "0%"), a.setAttribute("y", "0%"), a.setAttribute("width", "100%"), a.setAttribute("height", "100%")), a;
  }
  function i() {
    var s = B("feColorMatrix");
    return s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "sRGB"), s.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), s;
  }
  return t;
}(), hs = function() {
  var t = {
    maskType: !0,
    svgLumaHidden: !0,
    offscreenCanvas: typeof OffscreenCanvas < "u"
  };
  return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), /firefox/i.test(navigator.userAgent) && (t.svgLumaHidden = !1), t;
}();
var Ne = {}, ls = "filter_result_";
function yi(t) {
  var e, i = "SourceGraphic", s = t.data.ef ? t.data.ef.length : 0, r = vt(), a = we.createFilter(r, !0), n = 0;
  this.filters = [];
  var f;
  for (e = 0; e < s; e += 1) {
    f = null;
    var o = t.data.ef[e].ty;
    if (Ne[o]) {
      var u = Ne[o].effect;
      f = new u(a, t.effectsManager.effectElements[e], t, ls + n, i), i = ls + n, Ne[o].countsAsEffect && (n += 1);
    }
    f && this.filters.push(f);
  }
  n && (t.globalData.defs.appendChild(a), t.layerElement.setAttribute("filter", "url(" + At() + "#" + r + ")")), this.filters.length && t.addRenderableComponent(this);
}
yi.prototype.renderFrame = function(t) {
  var e, i = this.filters.length;
  for (e = 0; e < i; e += 1)
    this.filters[e].renderFrame(t);
};
yi.prototype.getEffects = function(t) {
  var e, i = this.filters.length, s = [];
  for (e = 0; e < i; e += 1)
    this.filters[e].type === t && s.push(this.filters[e]);
  return s;
};
function Bt(t, e, i) {
  Ne[t] = {
    effect: e,
    countsAsEffect: i
  };
}
function ii() {
}
ii.prototype = {
  initRendererElement: function() {
    this.layerElement = B("g");
  },
  createContainerElements: function() {
    this.matteElement = B("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
    var t = null;
    if (this.data.td) {
      this.matteMasks = {};
      var e = B("g");
      e.setAttribute("id", this.layerId), e.appendChild(this.layerElement), t = e, this.globalData.defs.appendChild(e);
    } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), t = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
    if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), this.data.ty === 0 && !this.data.hd) {
      var i = B("clipPath"), s = B("path");
      s.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
      var r = vt();
      if (i.setAttribute("id", r), i.appendChild(s), this.globalData.defs.appendChild(i), this.checkMasks()) {
        var a = B("g");
        a.setAttribute("clip-path", "url(" + At() + "#" + r + ")"), a.appendChild(this.layerElement), this.transformedElement = a, t ? t.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
      } else
        this.layerElement.setAttribute("clip-path", "url(" + At() + "#" + r + ")");
    }
    this.data.bm !== 0 && this.setBlendMode();
  },
  renderElement: function() {
    this.finalTransform._localMatMdf && this.transformedElement.setAttribute("transform", this.finalTransform.localMat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.localOpacity);
  },
  destroyBaseElement: function() {
    this.layerElement = null, this.matteElement = null, this.maskManager.destroy();
  },
  getBaseElement: function() {
    return this.data.hd ? null : this.baseElement;
  },
  createRenderableComponents: function() {
    this.maskManager = new oe(this.data, this, this.globalData), this.renderableEffectsManager = new yi(this), this.searchEffectTransforms();
  },
  getMatte: function(t) {
    if (this.matteMasks || (this.matteMasks = {}), !this.matteMasks[t]) {
      var e = this.layerId + "_" + t, i, s, r, a;
      if (t === 1 || t === 3) {
        var n = B("mask");
        n.setAttribute("id", e), n.setAttribute("mask-type", t === 3 ? "luminance" : "alpha"), r = B("use"), r.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + this.layerId), n.appendChild(r), this.globalData.defs.appendChild(n), !hs.maskType && t === 1 && (n.setAttribute("mask-type", "luminance"), i = vt(), s = we.createFilter(i), this.globalData.defs.appendChild(s), s.appendChild(we.createAlphaToLuminanceFilter()), a = B("g"), a.appendChild(r), n.appendChild(a), a.setAttribute("filter", "url(" + At() + "#" + i + ")"));
      } else if (t === 2) {
        const c = this.comp.data.w === this.globalData.compSize.w && this.comp.data.h === this.globalData.compSize.h;
        var f = B("mask");
        f.setAttribute("id", e), f.setAttribute("mask-type", "alpha"), c && f.setAttribute("maskUnits", "userSpaceOnUse");
        var o = B("g");
        f.appendChild(o), i = vt(), s = we.createFilter(i);
        var u = B("feComponentTransfer");
        u.setAttribute("in", "SourceGraphic"), s.appendChild(u);
        var y = B("feFuncA");
        y.setAttribute("type", "table"), y.setAttribute("tableValues", "1.0 0.0"), u.appendChild(y), this.globalData.defs.appendChild(s);
        var P = B("rect");
        P.setAttribute("width", this.comp.data.w), P.setAttribute("height", this.comp.data.h), P.setAttribute("x", "0"), P.setAttribute("y", "0"), P.setAttribute("fill", "#ffffff"), P.setAttribute("opacity", "0"), o.setAttribute("filter", "url(" + At() + "#" + i + ")"), o.appendChild(P), r = B("use"), r.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + this.layerId), o.appendChild(r), hs.maskType || (f.setAttribute("mask-type", "luminance"), s.appendChild(we.createAlphaToLuminanceFilter()), a = B("g"), o.appendChild(P), a.appendChild(this.layerElement), o.appendChild(a)), this.globalData.defs.appendChild(f);
      }
      this.matteMasks[t] = e;
    }
    return this.matteMasks[t];
  },
  setMatte: function(t) {
    this.matteElement && this.matteElement.setAttribute("mask", "url(" + At() + "#" + t + ")");
  }
};
function Re() {
}
Re.prototype = {
  /**
     * @function
     * Initializes hierarchy properties
     *
     */
  initHierarchy: function() {
    this.hierarchy = [], this._isParent = !1, this.checkParenting();
  },
  /**
     * @function
     * Sets layer's hierarchy.
     * @param {array} hierarch
     * layer's parent list
     *
     */
  setHierarchy: function(t) {
    this.hierarchy = t;
  },
  /**
     * @function
     * Sets layer as parent.
     *
     */
  setAsParent: function() {
    this._isParent = !0;
  },
  /**
     * @function
     * Searches layer's parenting chain
     *
     */
  checkParenting: function() {
    this.data.parent !== void 0 && this.comp.buildElementParenting(this, this.data.parent, []);
  }
};
function Oe() {
}
Oe.prototype = {
  /**
     * @function
     * Initializes frame related properties.
     *
     */
  initFrame: function() {
    this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1;
  },
  /**
     * @function
     * Calculates all dynamic values
     *
     * @param {number} num
     * current frame number in Layer's time
     * @param {boolean} isVisible
     * if layers is currently in range
     *
     */
  prepareProperties: function(t, e) {
    var i, s = this.dynamicProperties.length;
    for (i = 0; i < s; i += 1)
      (e || this._isParent && this.dynamicProperties[i].propType === "transform") && (this.dynamicProperties[i].getValue(), this.dynamicProperties[i]._mdf && (this.globalData._mdf = !0, this._mdf = !0));
  },
  addDynamicProperty: function(t) {
    this.dynamicProperties.indexOf(t) === -1 && this.dynamicProperties.push(t);
  }
};
function Is() {
}
Is.prototype = {
  initRenderable: function() {
    this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = [];
  },
  addRenderableComponent: function(t) {
    this.renderableComponents.indexOf(t) === -1 && this.renderableComponents.push(t);
  },
  removeRenderableComponent: function(t) {
    this.renderableComponents.indexOf(t) !== -1 && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1);
  },
  prepareRenderableFrame: function(t) {
    this.checkLayerLimits(t);
  },
  checkTransparency: function() {
    this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show());
  },
  /**
     * @function
     * Initializes frame related properties.
     *
     * @param {number} num
     * current frame number in Layer's time
     *
     */
  checkLayerLimits: function(t) {
    this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? this.isInRange !== !0 && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : this.isInRange !== !1 && (this.globalData._mdf = !0, this.isInRange = !1, this.hide());
  },
  renderRenderable: function() {
    var t, e = this.renderableComponents.length;
    for (t = 0; t < e; t += 1)
      this.renderableComponents[t].renderFrame(this._isFirstFrame);
  },
  sourceRectAtTime: function() {
    return {
      top: 0,
      left: 0,
      width: 100,
      height: 100
    };
  },
  getLayerSize: function() {
    return this.data.ty === 5 ? { w: this.data.textData.width, h: this.data.textData.height } : { w: this.data.width, h: this.data.height };
  }
};
function si() {
}
(function() {
  var t = {
    initElement: function(e, i, s) {
      this.initFrame(), this.initBaseData(e, i, s), this.initTransform(e, i, s), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
    },
    hide: function() {
      if (!this.hidden && (!this.isInRange || this.isTransparent)) {
        var e = this.baseElement || this.layerElement;
        e.style.display = "none", this.hidden = !0;
      }
    },
    show: function() {
      if (this.isInRange && !this.isTransparent) {
        if (!this.data.hd) {
          var e = this.baseElement || this.layerElement;
          e.style.display = "block";
        }
        this.hidden = !1, this._isFirstFrame = !0;
      }
    },
    renderFrame: function() {
      this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderLocalTransform(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
    },
    renderInnerContent: function() {
    },
    prepareFrame: function(e) {
      this._mdf = !1, this.prepareRenderableFrame(e), this.prepareProperties(e, this.isInRange), this.checkTransparency();
    },
    destroy: function() {
      this.innerElem = null, this.destroyBaseElement();
    }
  };
  st([Is, kr(t)], si);
})();
function da(t, e) {
  this.elem = t, this.pos = e;
}
function Ts() {
}
Ts.prototype = {
  addShapeToModifiers: function(t) {
    var e, i = this.shapeModifiers.length;
    for (e = 0; e < i; e += 1)
      this.shapeModifiers[e].addShape(t);
  },
  isShapeInAnimatedModifiers: function(t) {
    for (var e = 0, i = this.shapeModifiers.length; e < i; )
      if (this.shapeModifiers[e].isAnimatedWithShape(t))
        return !0;
    return !1;
  },
  renderModifiers: function() {
    if (this.shapeModifiers.length) {
      var t, e = this.shapes.length;
      for (t = 0; t < e; t += 1)
        this.shapes[t].sh.reset();
      e = this.shapeModifiers.length;
      var i;
      for (t = e - 1; t >= 0 && (i = this.shapeModifiers[t].processShapes(this._isFirstFrame), !i); t -= 1)
        ;
    }
  },
  searchProcessedElement: function(t) {
    for (var e = this.processedElements, i = 0, s = e.length; i < s; ) {
      if (e[i].elem === t)
        return e[i].pos;
      i += 1;
    }
    return 0;
  },
  addProcessedElement: function(t, e) {
    for (var i = this.processedElements, s = i.length; s; )
      if (s -= 1, i[s].elem === t) {
        i[s].pos = e;
        return;
      }
    i.push(new da(t, e));
  },
  prepareFrame: function(t) {
    this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
  }
};
const Fs = {
  1: "butt",
  2: "round",
  3: "square"
}, Vs = {
  1: "miter",
  2: "round",
  3: "bevel"
};
function Ls(t, e, i) {
  this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = i, this.lvl = e, this._isAnimated = !!i.k;
  for (var s = 0, r = t.length; s < r; ) {
    if (t[s].mProps.dynamicProperties.length) {
      this._isAnimated = !0;
      break;
    }
    s += 1;
  }
}
Ls.prototype.setAsAnimated = function() {
  this._isAnimated = !0;
};
function Rs(t, e) {
  this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = t.hd === !0, this.pElem = B("path"), this.msElem = null;
}
Rs.prototype.reset = function() {
  this.d = "", this._mdf = !1;
};
function ri(t, e, i, s) {
  this.elem = t, this.frameId = -1, this.dataProps = mt(e.length), this.renderer = i, this.k = !1, this.dashStr = "", this.dashArray = rt("float32", e.length ? e.length - 1 : 0), this.dashoffset = rt("float32", 1), this.initDynamicPropertyContainer(s);
  var r, a = e.length || 0, n;
  for (r = 0; r < a; r += 1)
    n = N.getProp(t, e[r].v, 0, 0, this), this.k = n.k || this.k, this.dataProps[r] = { n: e[r].n, p: n };
  this.k || this.getValue(!0), this._isAnimated = this.k;
}
ri.prototype.getValue = function(t) {
  if (!(this.elem.globalData.frameId === this.frameId && !t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
    var e = 0, i = this.dataProps.length;
    for (this.renderer === "svg" && (this.dashStr = ""), e = 0; e < i; e += 1)
      this.dataProps[e].n !== "o" ? this.renderer === "svg" ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v;
  }
};
st([_t], ri);
function Os(t, e, i) {
  this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = N.getProp(t, e.o, 0, 0.01, this), this.w = N.getProp(t, e.w, 0, null, this), this.d = new ri(t, e.d || {}, "svg", this), this.c = N.getProp(t, e.c, 1, 255, this), this.style = i, this._isAnimated = !!this._isAnimated;
}
st([_t], Os);
function zs(t, e, i) {
  this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = N.getProp(t, e.o, 0, 0.01, this), this.c = N.getProp(t, e.c, 1, 255, this), this.style = i;
}
st([_t], zs);
function Gs(t, e, i) {
  this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.style = i;
}
st([_t], Gs);
function ze(t, e, i) {
  this.data = e, this.c = rt("uint8c", e.p * 4);
  var s = e.k.k[0].s ? e.k.k[0].s.length - e.p * 4 : e.k.k.length - e.p * 4;
  this.o = rt("float32", s), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = s, this.initDynamicPropertyContainer(i), this.prop = N.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0);
}
ze.prototype.comparePoints = function(t, e) {
  for (var i = 0, s = this.o.length / 2, r; i < s; ) {
    if (r = Math.abs(t[i * 4] - t[e * 4 + i * 2]), r > 0.01)
      return !1;
    i += 1;
  }
  return !0;
};
ze.prototype.checkCollapsable = function() {
  if (this.o.length / 2 !== this.c.length / 4)
    return !1;
  if (this.data.k.k[0].s)
    for (var t = 0, e = this.data.k.k.length; t < e; ) {
      if (!this.comparePoints(this.data.k.k[t].s, this.data.p))
        return !1;
      t += 1;
    }
  else if (!this.comparePoints(this.data.k.k, this.data.p))
    return !1;
  return !0;
};
ze.prototype.getValue = function(t) {
  if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
    var e, i = this.data.p * 4, s, r;
    for (e = 0; e < i; e += 1)
      s = e % 4 === 0 ? 100 : 255, r = Math.round(this.prop.v[e] * s), this.c[e] !== r && (this.c[e] = r, this._cmdf = !t);
    if (this.o.length)
      for (i = this.prop.v.length, e = this.data.p * 4; e < i; e += 1)
        s = e % 2 === 0 ? 100 : 1, r = e % 2 === 0 ? Math.round(this.prop.v[e] * 100) : this.prop.v[e], this.o[e - this.data.p * 4] !== r && (this.o[e - this.data.p * 4] = r, this._omdf = !t);
    this._mdf = !t;
  }
};
st([_t], ze);
function ye(t, e, i) {
  this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, i);
}
ye.prototype.initGradientData = function(t, e, i) {
  this.o = N.getProp(t, e.o, 0, 0.01, this), this.s = N.getProp(t, e.s, 1, null, this), this.e = N.getProp(t, e.e, 1, null, this), this.h = N.getProp(t, e.h || { k: 0 }, 0, 0.01, this), this.a = N.getProp(t, e.a || { k: 0 }, 0, lt, this), this.g = new ze(t, e.g, this), this.style = i, this.stops = [], this.setGradientData(i.pElem, e), this.setGradientOpacity(e, i), this._isAnimated = !!this._isAnimated;
};
ye.prototype.setGradientData = function(t, e) {
  var i = vt(), s = B(e.t === 1 ? "linearGradient" : "radialGradient");
  s.setAttribute("id", i), s.setAttribute("spreadMethod", "pad"), s.setAttribute("gradientUnits", "userSpaceOnUse");
  var r = [], a, n, f;
  for (f = e.g.p * 4, n = 0; n < f; n += 4)
    a = B("stop"), s.appendChild(a), r.push(a);
  t.setAttribute(e.ty === "gf" ? "fill" : "stroke", "url(" + At() + "#" + i + ")"), this.gf = s, this.cst = r;
};
ye.prototype.setGradientOpacity = function(t, e) {
  if (this.g._hasOpacity && !this.g._collapsable) {
    var i, s, r, a = B("mask"), n = B("path");
    a.appendChild(n);
    var f = vt(), o = vt();
    a.setAttribute("id", o);
    var u = B(t.t === 1 ? "linearGradient" : "radialGradient");
    u.setAttribute("id", f), u.setAttribute("spreadMethod", "pad"), u.setAttribute("gradientUnits", "userSpaceOnUse"), r = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
    var y = this.stops;
    for (s = t.g.p * 4; s < r; s += 2)
      i = B("stop"), i.setAttribute("stop-color", "rgb(255,255,255)"), u.appendChild(i), y.push(i);
    n.setAttribute(t.ty === "gf" ? "fill" : "stroke", "url(" + At() + "#" + f + ")"), t.ty === "gs" && (n.setAttribute("stroke-linecap", Fs[t.lc || 2]), n.setAttribute("stroke-linejoin", Vs[t.lj || 2]), t.lj === 1 && n.setAttribute("stroke-miterlimit", t.ml)), this.of = u, this.ms = a, this.ost = y, this.maskId = o, e.msElem = n;
  }
};
st([_t], ye);
function Bs(t, e, i) {
  this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = N.getProp(t, e.w, 0, null, this), this.d = new ri(t, e.d || {}, "svg", this), this.initGradientData(t, e, i), this._isAnimated = !!this._isAnimated;
}
st([ye, _t], Bs);
function ga() {
  this.it = [], this.prevViewData = [], this.gr = B("g");
}
function va(t, e, i) {
  this.transform = {
    mProps: t,
    op: e,
    container: i
  }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
}
const ya = function(t, e, i, s) {
  if (e === 0)
    return "";
  var r = t.o, a = t.i, n = t.v, f, o = " M" + s.applyToPointStringified(n[0][0], n[0][1]);
  for (f = 1; f < e; f += 1)
    o += " C" + s.applyToPointStringified(r[f - 1][0], r[f - 1][1]) + " " + s.applyToPointStringified(a[f][0], a[f][1]) + " " + s.applyToPointStringified(n[f][0], n[f][1]);
  return i && e && (o += " C" + s.applyToPointStringified(r[f - 1][0], r[f - 1][1]) + " " + s.applyToPointStringified(a[0][0], a[0][1]) + " " + s.applyToPointStringified(n[0][0], n[0][1]), o += "z"), o;
}, ba = function() {
  var t = new ut(), e = new ut(), i = {
    createRenderFunction: s
  };
  function s(P) {
    switch (P.ty) {
      case "fl":
        return f;
      case "gf":
        return u;
      case "gs":
        return o;
      case "st":
        return y;
      case "sh":
      case "el":
      case "rc":
      case "sr":
        return n;
      case "tr":
        return r;
      case "no":
        return a;
      default:
        return null;
    }
  }
  function r(P, c, v) {
    (v || c.transform.op._mdf) && c.transform.container.setAttribute("opacity", c.transform.op.v), (v || c.transform.mProps._mdf) && c.transform.container.setAttribute("transform", c.transform.mProps.v.to2dCSS());
  }
  function a() {
  }
  function n(P, c, v) {
    var g, d, k, l, h, p, m = c.styles.length, b = c.lvl, E, x, S, O;
    for (p = 0; p < m; p += 1) {
      if (l = c.sh._mdf || v, c.styles[p].lvl < b) {
        for (x = e.reset(), S = b - c.styles[p].lvl, O = c.transformers.length - 1; !l && S > 0; )
          l = c.transformers[O].mProps._mdf || l, S -= 1, O -= 1;
        if (l)
          for (S = b - c.styles[p].lvl, O = c.transformers.length - 1; S > 0; )
            x.multiply(c.transformers[O].mProps.v), S -= 1, O -= 1;
      } else
        x = t;
      if (E = c.sh.paths, d = E._length, l) {
        for (k = "", g = 0; g < d; g += 1)
          h = E.shapes[g], h && h._length && (k += ya(h, h._length, h.c, x));
        c.caches[p] = k;
      } else
        k = c.caches[p];
      c.styles[p].d += P.hd === !0 ? "" : k, c.styles[p]._mdf = l || c.styles[p]._mdf;
    }
  }
  function f(P, c, v) {
    var g = c.style;
    (c.c._mdf || v) && g.pElem.setAttribute("fill", "rgb(" + Vt(c.c.v[0]) + "," + Vt(c.c.v[1]) + "," + Vt(c.c.v[2]) + ")"), (c.o._mdf || v) && g.pElem.setAttribute("fill-opacity", c.o.v);
  }
  function o(P, c, v) {
    u(P, c, v), y(P, c, v);
  }
  function u(P, c, v) {
    var g = c.gf, d = c.g._hasOpacity, k = c.s.v, l = c.e.v;
    if (c.o._mdf || v) {
      var h = P.ty === "gf" ? "fill-opacity" : "stroke-opacity";
      c.style.pElem.setAttribute(h, c.o.v);
    }
    if (c.s._mdf || v) {
      var p = P.t === 1 ? "x1" : "cx", m = p === "x1" ? "y1" : "cy";
      g.setAttribute(p, k[0]), g.setAttribute(m, k[1]), d && !c.g._collapsable && (c.of.setAttribute(p, k[0]), c.of.setAttribute(m, k[1]));
    }
    var b, E, x, S;
    if (c.g._cmdf || v) {
      b = c.cst;
      var O = c.g.c;
      for (x = b.length, E = 0; E < x; E += 1)
        S = b[E], S.setAttribute("offset", O[E * 4] + "%"), S.setAttribute("stop-color", "rgb(" + O[E * 4 + 1] + "," + O[E * 4 + 2] + "," + O[E * 4 + 3] + ")");
    }
    if (d && (c.g._omdf || v)) {
      var j = c.g.o;
      for (c.g._collapsable ? b = c.cst : b = c.ost, x = b.length, E = 0; E < x; E += 1)
        S = b[E], c.g._collapsable || S.setAttribute("offset", j[E * 2] + "%"), S.setAttribute("stop-opacity", j[E * 2 + 1]);
    }
    if (P.t === 1)
      (c.e._mdf || v) && (g.setAttribute("x2", l[0]), g.setAttribute("y2", l[1]), d && !c.g._collapsable && (c.of.setAttribute("x2", l[0]), c.of.setAttribute("y2", l[1])));
    else {
      var X;
      if ((c.s._mdf || c.e._mdf || v) && (X = Math.sqrt(Math.pow(k[0] - l[0], 2) + Math.pow(k[1] - l[1], 2)), g.setAttribute("r", X), d && !c.g._collapsable && c.of.setAttribute("r", X)), c.s._mdf || c.e._mdf || c.h._mdf || c.a._mdf || v) {
        X || (X = Math.sqrt(Math.pow(k[0] - l[0], 2) + Math.pow(k[1] - l[1], 2)));
        var Y = Math.atan2(l[1] - k[1], l[0] - k[0]), L = c.h.v;
        L >= 1 ? L = 0.99 : L <= -1 && (L = -0.99);
        var C = X * L, T = Math.cos(Y + c.a.v) * C + k[0], F = Math.sin(Y + c.a.v) * C + k[1];
        g.setAttribute("fx", T), g.setAttribute("fy", F), d && !c.g._collapsable && (c.of.setAttribute("fx", T), c.of.setAttribute("fy", F));
      }
    }
  }
  function y(P, c, v) {
    var g = c.style, d = c.d;
    d && (d._mdf || v) && d.dashStr && (g.pElem.setAttribute("stroke-dasharray", d.dashStr), g.pElem.setAttribute("stroke-dashoffset", d.dashoffset[0])), c.c && (c.c._mdf || v) && g.pElem.setAttribute("stroke", "rgb(" + Vt(c.c.v[0]) + "," + Vt(c.c.v[1]) + "," + Vt(c.c.v[2]) + ")"), (c.o._mdf || v) && g.pElem.setAttribute("stroke-opacity", c.o.v), (c.w._mdf || v) && (g.pElem.setAttribute("stroke-width", c.w.v), g.msElem && g.msElem.setAttribute("stroke-width", c.w.v));
  }
  return i;
}();
function dt(t, e, i) {
  this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, i), this.prevViewData = [];
}
st([Ve, Le, ii, Ts, Re, Oe, si], dt);
dt.prototype.initSecondaryElement = function() {
};
dt.prototype.identityMatrix = new ut();
dt.prototype.buildExpressionInterface = function() {
};
dt.prototype.createContent = function() {
  this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes();
};
dt.prototype.filterUniqueShapes = function() {
  var t, e = this.shapes.length, i, s, r = this.stylesList.length, a, n = [], f = !1;
  for (s = 0; s < r; s += 1) {
    for (a = this.stylesList[s], f = !1, n.length = 0, t = 0; t < e; t += 1)
      i = this.shapes[t], i.styles.indexOf(a) !== -1 && (n.push(i), f = i._isAnimated || f);
    n.length > 1 && f && this.setShapesAsAnimated(n);
  }
};
dt.prototype.setShapesAsAnimated = function(t) {
  var e, i = t.length;
  for (e = 0; e < i; e += 1)
    t[e].setAsAnimated();
};
dt.prototype.createStyleElement = function(t, e) {
  var i, s = new Rs(t, e), r = s.pElem;
  if (t.ty === "st")
    i = new Os(this, t, s);
  else if (t.ty === "fl")
    i = new zs(this, t, s);
  else if (t.ty === "gf" || t.ty === "gs") {
    var a = t.ty === "gf" ? ye : Bs;
    i = new a(this, t, s), this.globalData.defs.appendChild(i.gf), i.maskId && (this.globalData.defs.appendChild(i.ms), this.globalData.defs.appendChild(i.of), r.setAttribute("mask", "url(" + At() + "#" + i.maskId + ")"));
  } else t.ty === "no" && (i = new Gs(this, t, s));
  return (t.ty === "st" || t.ty === "gs") && (r.setAttribute("stroke-linecap", Fs[t.lc || 2]), r.setAttribute("stroke-linejoin", Vs[t.lj || 2]), r.setAttribute("fill-opacity", "0"), t.lj === 1 && r.setAttribute("stroke-miterlimit", t.ml)), t.r === 2 && r.setAttribute("fill-rule", "evenodd"), t.ln && r.setAttribute("id", t.ln), t.cl && r.setAttribute("class", t.cl), t.bm && (r.style["mix-blend-mode"] = vi(t.bm)), this.stylesList.push(s), this.addToAnimatedContents(t, i), i;
};
dt.prototype.createGroupElement = function(t) {
  var e = new ga();
  return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = vi(t.bm)), e;
};
dt.prototype.createTransformElement = function(t, e) {
  var i = De.getTransformProperty(this, t, this), s = new va(i, i.o, e);
  return this.addToAnimatedContents(t, s), s;
};
dt.prototype.createShapeElement = function(t, e, i) {
  var s = 4;
  t.ty === "rc" ? s = 5 : t.ty === "el" ? s = 6 : t.ty === "sr" && (s = 7);
  var r = Wt.getShapeProp(this, t, s, this), a = new Ls(e, i, r);
  return this.shapes.push(a), this.addShapeToModifiers(a), this.addToAnimatedContents(t, a), a;
};
dt.prototype.addToAnimatedContents = function(t, e) {
  for (var i = 0, s = this.animatedContents.length; i < s; ) {
    if (this.animatedContents[i].element === e)
      return;
    i += 1;
  }
  this.animatedContents.push({
    fn: ba.createRenderFunction(t),
    element: e,
    data: t
  });
};
dt.prototype.setElementStyles = function(t) {
  var e = t.styles, i, s = this.stylesList.length;
  for (i = 0; i < s; i += 1)
    e.indexOf(this.stylesList[i]) === -1 && !this.stylesList[i].closed && e.push(this.stylesList[i]);
};
dt.prototype.reloadShapes = function() {
  this._isFirstFrame = !0;
  var t, e = this.itemsData.length;
  for (t = 0; t < e; t += 1)
    this.prevViewData[t] = this.itemsData[t];
  for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1)
    this.dynamicProperties[t].getValue();
  this.renderModifiers();
};
dt.prototype.searchShapes = function(t, e, i, s, r, a, n) {
  var f = [].concat(a), o, u = t.length - 1, y, P, c = [], v = [], g, d, k;
  for (o = u; o >= 0; o -= 1) {
    if (k = this.searchProcessedElement(t[o]), k ? e[o] = i[k - 1] : t[o]._render = n, t[o].ty === "fl" || t[o].ty === "st" || t[o].ty === "gf" || t[o].ty === "gs" || t[o].ty === "no")
      k ? e[o].style.closed = t[o].hd : e[o] = this.createStyleElement(t[o], r), t[o]._render && e[o].style.pElem.parentNode !== s && s.appendChild(e[o].style.pElem), c.push(e[o].style);
    else if (t[o].ty === "gr") {
      if (!k)
        e[o] = this.createGroupElement(t[o]);
      else
        for (P = e[o].it.length, y = 0; y < P; y += 1)
          e[o].prevViewData[y] = e[o].it[y];
      this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, r + 1, f, n), t[o]._render && e[o].gr.parentNode !== s && s.appendChild(e[o].gr);
    } else t[o].ty === "tr" ? (k || (e[o] = this.createTransformElement(t[o], s)), g = e[o].transform, f.push(g)) : t[o].ty === "sh" || t[o].ty === "rc" || t[o].ty === "el" || t[o].ty === "sr" ? (k || (e[o] = this.createShapeElement(t[o], f, r)), this.setElementStyles(e[o])) : t[o].ty === "tm" || t[o].ty === "rd" || t[o].ty === "ms" || t[o].ty === "pb" || t[o].ty === "zz" || t[o].ty === "op" ? (k ? (d = e[o], d.closed = !1) : (d = $t.getModifier(t[o].ty), d.init(this, t[o]), e[o] = d, this.shapeModifiers.push(d)), v.push(d)) : t[o].ty === "rp" && (k ? (d = e[o], d.closed = !0) : (d = $t.getModifier(t[o].ty), e[o] = d, d.init(this, t, o, e), this.shapeModifiers.push(d), n = !1), v.push(d));
    this.addProcessedElement(t[o], o + 1);
  }
  for (u = c.length, o = 0; o < u; o += 1)
    c[o].closed = !0;
  for (u = v.length, o = 0; o < u; o += 1)
    v[o].closed = !0;
};
dt.prototype.renderInnerContent = function() {
  this.renderModifiers();
  var t, e = this.stylesList.length;
  for (t = 0; t < e; t += 1)
    this.stylesList[t].reset();
  for (this.renderShape(), t = 0; t < e; t += 1)
    (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"));
};
dt.prototype.renderShape = function() {
  var t, e = this.animatedContents.length, i;
  for (t = 0; t < e; t += 1)
    i = this.animatedContents[t], (this._isFirstFrame || i.element._isAnimated) && i.data !== !0 && i.fn(i.data, i.element, this._isFirstFrame);
};
dt.prototype.destroy = function() {
  this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
};
function bi(t, e, i) {
  this.initElement(t, e, i);
}
st([Ve, Le, ii, Re, Oe, si], bi);
bi.prototype.createContent = function() {
  var t = B("rect");
  t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t);
};
function Yt(t, e, i) {
  this.initFrame(), this.initBaseData(t, e, i), this.initFrame(), this.initTransform(t, e, i), this.initHierarchy();
}
Yt.prototype.prepareFrame = function(t) {
  this.prepareProperties(t, !0);
};
Yt.prototype.renderFrame = function() {
};
Yt.prototype.getBaseElement = function() {
  return null;
};
Yt.prototype.destroy = function() {
};
Yt.prototype.sourceRectAtTime = function() {
};
Yt.prototype.hide = function() {
};
st([Ve, Le, Re, Oe], Yt);
function yt() {
}
st([St], yt);
yt.prototype.createNull = function(t) {
  return new Yt(t, this.globalData, this);
};
yt.prototype.createShape = function(t) {
  return new dt(t, this.globalData, this);
};
yt.prototype.createSolid = function(t) {
  return new bi(t, this.globalData, this);
};
yt.prototype.configAnimation = function(t) {
  this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)", this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility), this.renderConfig.width && this.svgElement.setAttribute("width", this.renderConfig.width), this.renderConfig.height && this.svgElement.setAttribute("height", this.renderConfig.height), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), this.renderConfig.focusable !== void 0 && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
  var e = this.globalData.defs;
  this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
  var i = B("clipPath"), s = B("rect");
  s.setAttribute("width", t.w), s.setAttribute("height", t.h), s.setAttribute("x", 0), s.setAttribute("y", 0);
  var r = vt();
  i.setAttribute("id", r), i.appendChild(s), this.layerElement.setAttribute("clip-path", "url(" + At() + "#" + r + ")"), e.appendChild(i), this.layers = t.layers, this.elements = mt(t.layers.length);
};
yt.prototype.destroy = function() {
  this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.layerElement = null, this.globalData.defs = null;
  var t, e = this.layers ? this.layers.length : 0;
  for (t = 0; t < e; t += 1)
    this.elements[t] && this.elements[t].destroy && this.elements[t].destroy();
  this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
};
yt.prototype.updateContainerSize = function() {
};
yt.prototype.findIndexByInd = function(t) {
  var e = 0, i = this.layers.length;
  for (e = 0; e < i; e += 1)
    if (this.layers[e].ind === t)
      return e;
  return -1;
};
yt.prototype.buildItem = function(t) {
  var e = this.elements;
  if (!(e[t] || this.layers[t].ty === 99)) {
    e[t] = !0;
    var i = this.createItem(this.layers[t]);
    if (e[t] = i, Ze() && (this.layers[t].ty === 0 && this.globalData.projectInterface.registerComposition(i), i.initExpressions()), this.appendElementInPos(i, t), this.layers[t].tt) {
      var s = "tp" in this.layers[t] ? this.findIndexByInd(this.layers[t].tp) : t - 1;
      if (s === -1)
        return;
      if (!this.elements[s] || this.elements[s] === !0)
        this.buildItem(s), this.addPendingElement(i);
      else {
        var r = e[s], a = r.getMatte(this.layers[t].tt);
        i.setMatte(a);
      }
    }
  }
};
yt.prototype.checkPendingElements = function() {
  for (; this.pendingElements.length; ) {
    var t = this.pendingElements.pop();
    if (t.checkParenting(), t.data.tt)
      for (var e = 0, i = this.elements.length; e < i; ) {
        if (this.elements[e] === t) {
          var s = "tp" in t.data ? this.findIndexByInd(t.data.tp) : e - 1, r = this.elements[s], a = r.getMatte(this.layers[e].tt);
          t.setMatte(a);
          break;
        }
        e += 1;
      }
  }
};
yt.prototype.renderFrame = function(t) {
  if (!(this.renderedFrame === t || this.destroyed)) {
    t === null ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
    var e, i = this.layers.length;
    for (this.completeLayers || this.checkLayers(t), e = i - 1; e >= 0; e -= 1)
      (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
    if (this.globalData._mdf)
      for (e = 0; e < i; e += 1)
        (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
  }
};
yt.prototype.appendElementInPos = function(t, e) {
  var i = t.getBaseElement();
  if (i) {
    for (var s = 0, r; s < e; )
      this.elements[s] && this.elements[s] !== !0 && this.elements[s].getBaseElement() && (r = this.elements[s].getBaseElement()), s += 1;
    r ? this.layerElement.insertBefore(i, r) : this.layerElement.appendChild(i);
  }
};
yt.prototype.hide = function() {
  this.layerElement.style.display = "none";
};
yt.prototype.show = function() {
  this.layerElement.style.display = "block";
};
function Nt() {
}
st([Ve, Le, Re, Oe, si], Nt);
Nt.prototype.initElement = function(t, e, i) {
  this.initFrame(), this.initBaseData(t, e, i), this.initTransform(t, e, i), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), (this.data.xt || !e.progressiveLoad) && this.buildAllItems(), this.hide();
};
Nt.prototype.prepareFrame = function(t) {
  if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), !(!this.isInRange && !this.data.xt)) {
    if (this.tm._placeholder)
      this.renderedFrame = t / this.data.sr;
    else {
      var e = this.tm.v;
      e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e;
    }
    var i, s = this.elements.length;
    for (this.completeLayers || this.checkLayers(this.renderedFrame), i = s - 1; i >= 0; i -= 1)
      (this.completeLayers || this.elements[i]) && (this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st), this.elements[i]._mdf && (this._mdf = !0));
  }
};
Nt.prototype.renderInnerContent = function() {
  var t, e = this.layers.length;
  for (t = 0; t < e; t += 1)
    (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
};
Nt.prototype.setElements = function(t) {
  this.elements = t;
};
Nt.prototype.getElements = function() {
  return this.elements;
};
Nt.prototype.destroyElements = function() {
  var t, e = this.layers.length;
  for (t = 0; t < e; t += 1)
    this.elements[t] && this.elements[t].destroy();
};
Nt.prototype.destroy = function() {
  this.destroyElements(), this.destroyBaseElement();
};
function $e(t, e, i) {
  this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? mt(this.layers.length) : [], this.initElement(t, e, i), this.tm = t.tm ? N.getProp(this, t.tm, 0, e.frameRate, this) : { _placeholder: !0 };
}
st([yt, Nt, ii], $e);
$e.prototype.createComp = function(t) {
  return new $e(t, this.globalData, this);
};
function _i(t, e) {
  this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = B("svg");
  var i = "";
  if (e && e.title) {
    var s = B("title"), r = vt();
    s.setAttribute("id", r), s.textContent = e.title, this.svgElement.appendChild(s), i += r;
  }
  if (e && e.description) {
    var a = B("desc"), n = vt();
    a.setAttribute("id", n), a.textContent = e.description, this.svgElement.appendChild(a), i += " " + n;
  }
  i && this.svgElement.setAttribute("aria-labelledby", i);
  var f = B("defs");
  this.svgElement.appendChild(f);
  var o = B("g");
  this.svgElement.appendChild(o), this.layerElement = o, this.renderConfig = {
    preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
    contentVisibility: e && e.contentVisibility || "visible",
    progressiveLoad: e && e.progressiveLoad || !1,
    hideOnTransparent: !(e && e.hideOnTransparent === !1),
    viewBoxOnly: e && e.viewBoxOnly || !1,
    viewBoxSize: e && e.viewBoxSize || !1,
    className: e && e.className || "",
    id: e && e.id || "",
    focusable: e && e.focusable,
    filterSize: {
      width: e && e.filterSize && e.filterSize.width || "100%",
      height: e && e.filterSize && e.filterSize.height || "100%",
      x: e && e.filterSize && e.filterSize.x || "0%",
      y: e && e.filterSize && e.filterSize.y || "0%"
    },
    width: e && e.width,
    height: e && e.height,
    runExpressions: !e || e.runExpressions === void 0 || e.runExpressions
  }, this.globalData = {
    _mdf: !1,
    frameNum: -1,
    defs: f,
    renderConfig: this.renderConfig
  }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg";
}
st([yt], _i);
_i.prototype.createComp = function(t) {
  return new $e(t, this.globalData, this);
};
Lr("svg", _i);
$t.registerModifier("tm", Mt);
$t.registerModifier("pb", Me);
$t.registerModifier("rp", Rt);
$t.registerModifier("rd", Ie);
$t.registerModifier("zz", Te);
$t.registerModifier("op", Fe);
const Ns = /* @__PURE__ */ function() {
  return function(t) {
    function e(i) {
      for (var s = 0, r = t.layers.length; s < r; ) {
        if (t.layers[s].nm === i || t.layers[s].ind === i)
          return t.elements[s].layerInterface;
        s += 1;
      }
      return null;
    }
    return Object.defineProperty(e, "_name", { value: t.data.nm }), e.layer = e, e.pixelAspect = 1, e.height = t.data.h || t.globalData.compSize.h, e.width = t.data.w || t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e.displayStartTime = 0, e.numLayers = t.layers.length, e;
  };
}(), ps = {
  SHAPE: "shape"
}, _a = /thisComp.layer\('([^']+)'\).effect\('([^']+)'\)\('Menu'\)\s*==\s*([0-9]+)\)[\s\S]*?\$bm_rt\s*=\s*([0-9]+);[\s\S]*?\$bm_rt\s*=\s*([0-9]+)/, Pa = /comp\('([^']+)'\)\.layer\('([^']+)'\)\.effect\('([^']+)'\)\('Color'\)/, ka = /\$bm_mul\(\$bm_div\(value,\s*([0-9]+(?:\.[0-9]+)?)\),\s*comp\('([^']+)'\)\.layer\('([^']+)'\)\.effect\('([^']+)'\)\('([^']+)'\)\)/, Aa = /\$bm_mul\(thisComp\.layer\('([^']+)'\)\.effect\((\d+)\)\('([^']+)'\),\s*([0-9]+(?:\.[0-9]+)?)\)/, Ea = /thisComp\.layer\('([^']+)'\)\.effect\('Scale'\)\('Slider'\)/, wa = /thisComp\.layer\('([^']+)'\)\.effect\('Axis'\)\('Point'\)/, Sa = /effect\('Axis'\)\('Point'\)/, xa = /thisComp\.layer\('([^']+)'\)\.effect\('([^']+)'\)\('Color'\)/, Da = /thisComp\.layer\('02092020'\)\.effect\('([^']+)'\)\('([^']+)'\)/;
function se(t) {
  return t.map((e) => e.startsWith("'") && e.endsWith("'") || e.startsWith('"') && e.endsWith('"') ? e.slice(1, -1) : e);
}
function Ca(t) {
  const e = t.match(Pa);
  if (e) {
    const o = se(e.slice(1));
    return (u) => {
      var y;
      const { comp: P } = u;
      return (y = P(o[0]).layer(o[1]).effect(o[2])) == null ? void 0 : y("Color");
    };
  }
  const i = t.match(ka);
  if (i) {
    const o = se(i.slice(1));
    return (u) => {
      var y;
      const { comp: P, $bm_div: c, $bm_mul: v, value: g } = u;
      return v(
        c(g, +o[0]),
        (y = P(o[1]).layer(o[2]).effect(o[3])) == null ? void 0 : y(o[4])
      );
    };
  }
  const s = t.match(_a);
  if (s) {
    const o = se(s.slice(1));
    return (u) => {
      const { thisComp: y } = u;
      return y.layer(o[0]).effect(o[1])("Menu") == +o[2] ? +o[3] : +o[4];
    };
  }
  const r = t.match(Aa);
  if (r) {
    const o = se(r.slice(1));
    return (u) => {
      const { thisComp: y, $bm_mul: P } = u;
      return P(
        y.layer(o[0]).effect(+o[1])(o[2]),
        +o[3]
      );
    };
  }
  const a = t.match(Ea);
  if (a) {
    const o = se(a.slice(1));
    return (u) => {
      const { thisComp: y } = u, P = y.layer(o[0]).effect("Scale")("Slider");
      return [P, P];
    };
  }
  const n = t.match(wa);
  if (n) {
    const o = se(n.slice(1));
    return (u) => {
      const { thisComp: y } = u;
      return y.layer(o[0]).effect("Axis")("Point");
    };
  }
  if (t.match(Sa))
    return (o) => {
      const { effect: u } = o;
      return u("Axis")("Point");
    };
  const f = t.match(xa);
  if (f) {
    const o = se(f.slice(1));
    return (u) => {
      const { thisComp: y } = u;
      return y.layer(o[0]).effect(o[1])("Color");
    };
  }
  return t.match(Da) ? (o) => 0 : null;
}
const Pi = function() {
  var t = {}, e = zt, i = null, s = null, r = null, a = null, n = null, f = {};
  function o() {
    f = {};
  }
  function u(A) {
    return A.constructor === Array || A.constructor === Float32Array;
  }
  function y(A, D) {
    return A === "number" || D instanceof Number || A === "boolean" || A === "string";
  }
  function P(A) {
    var D = typeof A;
    if (D === "number" || A instanceof Number || D === "boolean")
      return -A;
    if (u(A)) {
      var R, q = A.length, V = [];
      for (R = 0; R < q; R += 1)
        V[R] = -A[R];
      return V;
    }
    return A.propType ? A.v : -A;
  }
  var c = re.getBezierEasing(0.333, 0, 0.833, 0.833, "easeIn").get, v = re.getBezierEasing(0.167, 0.167, 0.667, 1, "easeOut").get, g = re.getBezierEasing(0.33, 0, 0.667, 1, "easeInOut").get;
  function d(A, D) {
    var R = typeof A, q = typeof D;
    if (y(R, A) && y(q, D) || R === "string" || q === "string")
      return A + D;
    if (u(A) && y(q, D))
      return A = A.slice(0), A[0] += D, A;
    if (y(R, A) && u(D))
      return D = D.slice(0), D[0] = A + D[0], D;
    if (u(A) && u(D)) {
      for (var V = 0, W = A.length, Z = D.length, K = []; V < W || V < Z; )
        (typeof A[V] == "number" || A[V] instanceof Number) && (typeof D[V] == "number" || D[V] instanceof Number) ? K[V] = A[V] + D[V] : K[V] = D[V] === void 0 ? A[V] : A[V] || D[V], V += 1;
      return K;
    }
    return 0;
  }
  var k = d;
  function l(A, D) {
    var R = typeof A, q = typeof D;
    if (y(R, A) && y(q, D))
      return R === "string" && (A = parseInt(A, 10)), q === "string" && (D = parseInt(D, 10)), A - D;
    if (u(A) && y(q, D))
      return A = A.slice(0), A[0] -= D, A;
    if (y(R, A) && u(D))
      return D = D.slice(0), D[0] = A - D[0], D;
    if (u(A) && u(D)) {
      for (var V = 0, W = A.length, Z = D.length, K = []; V < W || V < Z; )
        (typeof A[V] == "number" || A[V] instanceof Number) && (typeof D[V] == "number" || D[V] instanceof Number) ? K[V] = A[V] - D[V] : K[V] = D[V] === void 0 ? A[V] : A[V] || D[V], V += 1;
      return K;
    }
    return 0;
  }
  function h(A, D) {
    var R = typeof A, q = typeof D, V;
    if (y(R, A) && y(q, D))
      return A * D;
    var W, Z;
    if (u(A) && y(q, D)) {
      for (Z = A.length, V = rt("float32", Z), W = 0; W < Z; W += 1)
        V[W] = A[W] * D;
      return V;
    }
    if (y(R, A) && u(D)) {
      for (Z = D.length, V = rt("float32", Z), W = 0; W < Z; W += 1)
        V[W] = A * D[W];
      return V;
    }
    return 0;
  }
  function p(A, D) {
    var R = typeof A, q = typeof D, V;
    if (y(R, A) && y(q, D))
      return A / D;
    var W, Z;
    if (u(A) && y(q, D)) {
      for (Z = A.length, V = rt("float32", Z), W = 0; W < Z; W += 1)
        V[W] = A[W] / D;
      return V;
    }
    if (y(R, A) && u(D)) {
      for (Z = D.length, V = rt("float32", Z), W = 0; W < Z; W += 1)
        V[W] = A / D[W];
      return V;
    }
    return 0;
  }
  function m(A, D) {
    return typeof A == "string" && (A = parseInt(A, 10)), typeof D == "string" && (D = parseInt(D, 10)), A % D;
  }
  var b = d, E = l, x = h, S = p, O = m;
  function j(A, D, R) {
    if (D > R) {
      var q = R;
      R = D, D = q;
    }
    return e.min(e.max(A, D), R);
  }
  function X(A) {
    return A / lt;
  }
  var Y = X;
  function L(A) {
    return A * lt;
  }
  var C = X, T = [0, 0, 0, 0, 0, 0];
  function F(A, D) {
    if (typeof A == "number" || A instanceof Number)
      return D = D || 0, e.abs(A - D);
    D || (D = T);
    var R, q = e.min(A.length, D.length), V = 0;
    for (R = 0; R < q; R += 1)
      V += e.pow(D[R] - A[R], 2);
    return e.sqrt(V);
  }
  function M(A) {
    return p(A, F(A));
  }
  function _(A) {
    var D = A[0], R = A[1], q = A[2], V = e.max(D, R, q), W = e.min(D, R, q), Z, K, ot = (V + W) / 2;
    if (V === W)
      Z = 0, K = 0;
    else {
      var H = V - W;
      switch (K = ot > 0.5 ? H / (2 - V - W) : H / (V + W), V) {
        case D:
          Z = (R - q) / H + (R < q ? 6 : 0);
          break;
        case R:
          Z = (q - D) / H + 2;
          break;
        case q:
          Z = (D - R) / H + 4;
          break;
      }
      Z /= 6;
    }
    return [Z, K, ot, A[3]];
  }
  function w(A, D, R) {
    return R < 0 && (R += 1), R > 1 && (R -= 1), R < 1 / 6 ? A + (D - A) * 6 * R : R < 1 / 2 ? D : R < 2 / 3 ? A + (D - A) * (2 / 3 - R) * 6 : A;
  }
  function I(A) {
    var D = A[0], R = A[1], q = A[2], V, W, Z;
    if (R === 0)
      V = q, Z = q, W = q;
    else {
      var K = q < 0.5 ? q * (1 + R) : q + R - q * R, ot = 2 * q - K;
      V = w(ot, K, D + 1 / 3), W = w(ot, K, D), Z = w(ot, K, D - 1 / 3);
    }
    return [V, W, Z, A[3]];
  }
  function z(A, D, R, q, V) {
    if ((q === void 0 || V === void 0) && (q = D, V = R, D = 0, R = 1), R < D) {
      var W = R;
      R = D, D = W;
    }
    if (A <= D)
      return q;
    if (A >= R)
      return V;
    var Z = R === D ? 0 : (A - D) / (R - D);
    if (!q.length)
      return q + (V - q) * Z;
    var K, ot = q.length, H = rt("float32", ot);
    for (K = 0; K < ot; K += 1)
      H[K] = q[K] + (V[K] - q[K]) * Z;
    return H;
  }
  function nt(A, D) {
    if (D === void 0 && (A === void 0 ? (A = 0, D = 1) : (D = A, A = void 0)), D.length) {
      var R, q = D.length;
      A || (A = rt("float32", q));
      var V = rt("float32", q), W = zt.random();
      for (R = 0; R < q; R += 1)
        V[R] = A[R] + W * (D[R] - A[R]);
      return V;
    }
    A === void 0 && (A = 0);
    var Z = zt.random();
    return A + Z * (D - A);
  }
  function Q(A, D, R, q) {
    var V, W = A.length, Z = gt.newElement();
    Z.setPathData(!!q, W);
    var K = [0, 0], ot, H;
    for (V = 0; V < W; V += 1)
      ot = D && D[V] ? D[V] : K, H = R && R[V] ? R[V] : K, Z.setTripleAt(A[V][0], A[V][1], H[0] + A[V][0], H[1] + A[V][1], ot[0] + A[V][0], ot[1] + A[V][1], V, !0);
    return Z;
  }
  function pt(A, D, R) {
    function q(U) {
      return U;
    }
    if (!A.globalData.renderConfig.runExpressions)
      return q;
    var V = D.x, W = /velocity(?![\w\d])/.test(V), Z = A.data.ty, K, ot, H, jt, ct = R;
    ct._name = A.data.nm, ct.valueAtTime = ct.getValueAtTime, Object.defineProperty(ct, "value", {
      get: function() {
        return ct.v;
      }
    }), A.comp.frameDuration = 1 / A.comp.globalData.frameRate, A.comp.displayStartTime = 0;
    var he = A.data.ip / A.comp.globalData.frameRate, le = A.data.op / A.comp.globalData.frameRate, pe = A.data.sw ? A.data.sw : 0, fe = A.data.sh ? A.data.sh : 0, ue = A.data.nm, qt, Zt, Ht, Jt, Kt, Qt, te, ee, ie, xi, $s, Ys, Di, Zs, bt, ni, Ci, Mi, Ii, Ti = V, Fi = Ca(Ti);
    if (!Fi)
      return q;
    var Js = R.kf ? D.k.length : 0, Ks = !this.data || this.data.hd !== !0, Qs = function(U, G) {
      var at, et, it = this.pv.length ? this.pv.length : 1, Dt = rt("float32", it);
      U = 5;
      var Ge = e.floor(Ot * U);
      for (at = 0, et = 0; at < Ge; ) {
        for (et = 0; et < it; et += 1)
          Dt[et] += -G + G * 2 * zt.random();
        at += 1;
      }
      var Tt = Ot * U, _e = Tt - e.floor(Tt), Pe = rt("float32", it);
      if (it > 1) {
        for (et = 0; et < it; et += 1)
          Pe[et] = this.pv[et] + Dt[et] + (-G + G * 2 * zt.random()) * _e;
        return Pe;
      }
      return this.pv + Dt[0] + (-G + G * 2 * zt.random()) * _e;
    }.bind(this);
    ct.loopIn && (qt = ct.loopIn.bind(ct), Zt = qt), ct.loopOut && (Ht = ct.loopOut.bind(ct), Jt = Ht), ct.smooth && (Kt = ct.smooth.bind(ct));
    function tr(U, G) {
      return qt(U, G, !0);
    }
    function er(U, G) {
      return Ht(U, G, !0);
    }
    this.getValueAtTime && (Mi = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (Ii = this.getVelocityAtTime.bind(this));
    var Vi = A.comp.globalData.projectInterface.bind(A.comp.globalData.projectInterface);
    function ir(U, G) {
      var at = [G[0] - U[0], G[1] - U[1], G[2] - U[2]], et = e.atan2(at[0], e.sqrt(at[1] * at[1] + at[2] * at[2])) / lt, it = -e.atan2(at[1], at[2]) / lt;
      return [it, et, 0];
    }
    function sr(U, G, at, et, it) {
      return oi(v, U, G, at, et, it);
    }
    function rr(U, G, at, et, it) {
      return oi(c, U, G, at, et, it);
    }
    function ar(U, G, at, et, it) {
      return oi(g, U, G, at, et, it);
    }
    function oi(U, G, at, et, it, Dt) {
      it === void 0 ? (it = at, Dt = et) : G = (G - at) / (et - at), G > 1 ? G = 1 : G < 0 && (G = 0);
      var Ge = U(G);
      if (u(it)) {
        var Tt, _e = it.length, Pe = rt("float32", _e);
        for (Tt = 0; Tt < _e; Tt += 1)
          Pe[Tt] = (Dt[Tt] - it[Tt]) * Ge + it[Tt];
        return Pe;
      }
      return (Dt - it) * Ge + it;
    }
    function nr(U) {
      var G, at = D.k.length, et, it;
      if (!D.k.length || typeof D.k[0] == "number")
        et = 0, it = 0;
      else if (et = -1, U *= A.comp.globalData.frameRate, U < D.k[0].t)
        et = 1, it = D.k[0].t;
      else {
        for (G = 0; G < at - 1; G += 1)
          if (U === D.k[G].t) {
            et = G + 1, it = D.k[G].t;
            break;
          } else if (U > D.k[G].t && U < D.k[G + 1].t) {
            U - D.k[G].t > D.k[G + 1].t - U ? (et = G + 2, it = D.k[G + 1].t) : (et = G + 1, it = D.k[G].t);
            break;
          }
        et === -1 && (et = G + 1, it = D.k[G].t);
      }
      var Dt = {};
      return Dt.index = et, Dt.time = it / A.comp.globalData.frameRate, Dt;
    }
    function or(U) {
      var G, at, et;
      if (!D.k.length || typeof D.k[0] == "number")
        throw new Error("The property has no keyframe at index " + U);
      U -= 1, G = {
        time: D.k[U].t / A.comp.globalData.frameRate,
        value: []
      };
      var it = Object.prototype.hasOwnProperty.call(D.k[U], "s") ? D.k[U].s : D.k[U - 1].e;
      for (et = it.length, at = 0; at < et; at += 1)
        G[at] = it[at], G.value[at] = it[at];
      return G;
    }
    function hr(U, G) {
      return G || (G = A.comp.globalData.frameRate), U / G;
    }
    function lr(U, G) {
      return !U && U !== 0 && (U = Ot), G || (G = A.comp.globalData.frameRate), U * G;
    }
    function pr() {
      return A.sourceRectAtTime();
    }
    function fr(U, G) {
      return typeof It == "string" ? G === void 0 ? It.substring(U) : It.substring(U, G) : "";
    }
    function ur(U, G) {
      return typeof It == "string" ? G === void 0 ? It.substr(U) : It.substr(U, G) : "";
    }
    function cr(U) {
      Ot = U === 0 ? 0 : e.floor(Ot * U) / U, It = Mi(Ot);
    }
    var Ot, Li, It, Ri, Oi, zi, Gi, mr = A.data.ind, Bi = !!(A.hierarchy && A.hierarchy.length), Ni, dr = A.globalData;
    function ji(U) {
      if (It = U, this.frameExpressionId === A.globalData.frameId && this.propType !== "textSelector")
        return It;
      this.propType === "textSelector" && (Oi = this.textIndex, zi = this.textTotal, Gi = this.selectorValue), bt || (Ri = A.layerInterface.text, bt = A.layerInterface, ni = A.comp.compInterface, Qt = bt.toWorld.bind(bt), te = bt.fromWorld.bind(bt), ee = bt.fromComp.bind(bt), ie = bt.toComp.bind(bt), Ci = bt.mask ? bt.mask.bind(bt) : null, xi = ee), K || (K = A.layerInterface("ADBE Transform Group"), ot = K, K && (Di = K.anchorPoint)), Z === 4 && !H && (H = bt("ADBE Root Vectors Group")), jt || (jt = bt(4)), Bi = !!(A.hierarchy && A.hierarchy.length), Bi && !Ni && (Ni = A.hierarchy[0].layerInterface), Ot = this.comp.renderedFrame / this.comp.globalData.frameRate, W && (Li = Ii(Ot)), this.frameExpressionId = A.globalData.frameId;
      try {
        let G = Fi({
          $bm_neg: P,
          add: k,
          $bm_sum: b,
          $bm_sub: E,
          $bm_mul: x,
          $bm_div: S,
          $bm_mod: O,
          clamp: j,
          radians_to_degrees: Y,
          degreesToRadians: L,
          degrees_to_radians: C,
          normalize: M,
          rgbToHsl: _,
          hslToRgb: I,
          linear: z,
          random: nt,
          createPath: Q,
          comp: Vi,
          value: It,
          thisComp: ni,
          effect: jt
        });
        return (G == null ? void 0 : G.propType) === ps.SHAPE ? G.v : G;
      } catch (G) {
        console.error(G, Ti);
      }
      return scoped_bm_rt = scoped_bm_rt.propType === ps.SHAPE ? scoped_bm_rt.v : scoped_bm_rt, scoped_bm_rt;
    }
    return ji.__preventDeadCodeRemoval = [ot, Di, Ot, Li, he, le, pe, fe, ue, Zt, Jt, Kt, ie, xi, Qt, te, Ci, $s, Ys, Zs, ni, Js, Ks, Qs, tr, er, Vi, ir, sr, rr, ar, nr, or, Ri, Oi, zi, Gi, hr, lr, pr, fr, ur, cr, mr, dr], ji;
  }
  return t.initiateExpression = pt, t.__preventDeadCodeRemoval = [i, s, r, a, n, P, k, b, E, x, S, O, j, Y, L, C, M, _, I, z, nt, Q, f], t.resetFrame = o, t;
}(), Ma = function() {
  var t = {};
  t.initExpressions = e, t.resetFrame = Pi.resetFrame;
  function e(i) {
    var s = 0, r = [];
    function a() {
      s += 1;
    }
    function n() {
      s -= 1, s === 0 && o();
    }
    function f(u) {
      r.indexOf(u) === -1 && r.push(u);
    }
    function o() {
      var u, y = r.length;
      for (u = 0; u < y; u += 1)
        r[u].release();
      r.length = 0;
    }
    i.renderer.compInterface = Ns(i.renderer), i.renderer.globalData.projectInterface.registerComposition(i.renderer), i.renderer.globalData.pushExpression = a, i.renderer.globalData.popExpression = n, i.renderer.globalData.registerExpressionProperty = f;
  }
  return t;
}(), Ia = function() {
  function t(i, s) {
    this._mask = i, this._data = s;
  }
  Object.defineProperty(t.prototype, "maskPath", {
    get: function() {
      return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
    }
  }), Object.defineProperty(t.prototype, "maskOpacity", {
    get: function() {
      return this._mask.op.k && this._mask.op.getValue(), this._mask.op.v * 100;
    }
  });
  var e = function(i) {
    var s = mt(i.viewData.length), r, a = i.viewData.length;
    for (r = 0; r < a; r += 1)
      s[r] = new t(i.viewData[r], i.masksProperties[r]);
    var n = function(f) {
      for (r = 0; r < a; ) {
        if (i.masksProperties[r].nm === f)
          return s[r];
        r += 1;
      }
      return null;
    };
    return n;
  };
  return e;
}(), $ = /* @__PURE__ */ function() {
  var t = { pv: 0, v: 0, mult: 1 }, e = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };
  function i(n, f, o) {
    Object.defineProperty(n, "velocity", {
      get: function() {
        return f.getVelocityAtTime(f.comp.currentFrame);
      }
    }), n.numKeys = f.keyframes ? f.keyframes.length : 0, n.key = function(u) {
      if (!n.numKeys)
        return 0;
      var y = "";
      "s" in f.keyframes[u - 1] ? y = f.keyframes[u - 1].s : "e" in f.keyframes[u - 2] ? y = f.keyframes[u - 2].e : y = f.keyframes[u - 2].s;
      var P = o === "unidimensional" ? new Number(y) : Object.assign({}, y);
      return P.time = f.keyframes[u - 1].t / f.elem.comp.globalData.frameRate, P.value = o === "unidimensional" ? y[0] : y, P;
    }, n.valueAtTime = f.getValueAtTime, n.speedAtTime = f.getSpeedAtTime, n.velocityAtTime = f.getVelocityAtTime, n.propertyGroup = f.propertyGroup;
  }
  function s(n) {
    (!n || !("pv" in n)) && (n = t);
    var f = 1 / n.mult, o = n.pv * f, u = new Number(o);
    return u.value = o, i(u, n, "unidimensional"), function() {
      return n.k && n.getValue(), o = n.v * f, u.value !== o && (u = new Number(o), u.value = o, u[0] = o, i(u, n, "unidimensional")), u;
    };
  }
  function r(n) {
    (!n || !("pv" in n)) && (n = e);
    var f = 1 / n.mult, o = n.data && n.data.l || n.pv.length, u = rt("float32", o), y = rt("float32", o);
    return u.value = y, i(u, n, "multidimensional"), function() {
      n.k && n.getValue();
      for (var P = 0; P < o; P += 1)
        y[P] = n.v[P] * f, u[P] = y[P];
      return u;
    };
  }
  function a() {
    return t;
  }
  return function(n) {
    return n ? n.propType === "unidimensional" ? s(n) : r(n) : a;
  };
}(), Ta = /* @__PURE__ */ function() {
  return function(t) {
    function e(n) {
      switch (n) {
        case "scale":
        case "Scale":
        case "ADBE Scale":
        case 6:
          return e.scale;
        case "rotation":
        case "Rotation":
        case "ADBE Rotation":
        case "ADBE Rotate Z":
        case 10:
          return e.rotation;
        case "ADBE Rotate X":
          return e.xRotation;
        case "ADBE Rotate Y":
          return e.yRotation;
        case "position":
        case "Position":
        case "ADBE Position":
        case 2:
          return e.position;
        case "ADBE Position_0":
          return e.xPosition;
        case "ADBE Position_1":
          return e.yPosition;
        case "ADBE Position_2":
          return e.zPosition;
        case "anchorPoint":
        case "AnchorPoint":
        case "Anchor Point":
        case "ADBE AnchorPoint":
        case 1:
          return e.anchorPoint;
        case "opacity":
        case "Opacity":
        case 11:
          return e.opacity;
        default:
          return null;
      }
    }
    Object.defineProperty(e, "rotation", {
      get: $(t.r || t.rz)
    }), Object.defineProperty(e, "zRotation", {
      get: $(t.rz || t.r)
    }), Object.defineProperty(e, "xRotation", {
      get: $(t.rx)
    }), Object.defineProperty(e, "yRotation", {
      get: $(t.ry)
    }), Object.defineProperty(e, "scale", {
      get: $(t.s)
    });
    var i, s, r, a;
    return t.p ? a = $(t.p) : (i = $(t.px), s = $(t.py), t.pz && (r = $(t.pz))), Object.defineProperty(e, "position", {
      get: function() {
        return t.p ? a() : [
          i(),
          s(),
          r ? r() : 0
        ];
      }
    }), Object.defineProperty(e, "xPosition", {
      get: $(t.px)
    }), Object.defineProperty(e, "yPosition", {
      get: $(t.py)
    }), Object.defineProperty(e, "zPosition", {
      get: $(t.pz)
    }), Object.defineProperty(e, "anchorPoint", {
      get: $(t.a)
    }), Object.defineProperty(e, "opacity", {
      get: $(t.o)
    }), Object.defineProperty(e, "skew", {
      get: $(t.sk)
    }), Object.defineProperty(e, "skewAxis", {
      get: $(t.sa)
    }), Object.defineProperty(e, "orientation", {
      get: $(t.or)
    }), e;
  };
}(), Fa = /* @__PURE__ */ function() {
  function t(u) {
    var y = new ut();
    if (u !== void 0) {
      var P = this._elem.finalTransform.mProp.getValueAtTime(u);
      P.clone(y);
    } else {
      var c = this._elem.finalTransform.mProp;
      c.applyToMatrix(y);
    }
    return y;
  }
  function e(u, y) {
    var P = this.getMatrix(y);
    return P.props[12] = 0, P.props[13] = 0, P.props[14] = 0, this.applyPoint(P, u);
  }
  function i(u, y) {
    var P = this.getMatrix(y);
    return this.applyPoint(P, u);
  }
  function s(u, y) {
    var P = this.getMatrix(y);
    return P.props[12] = 0, P.props[13] = 0, P.props[14] = 0, this.invertPoint(P, u);
  }
  function r(u, y) {
    var P = this.getMatrix(y);
    return this.invertPoint(P, u);
  }
  function a(u, y) {
    if (this._elem.hierarchy && this._elem.hierarchy.length) {
      var P, c = this._elem.hierarchy.length;
      for (P = 0; P < c; P += 1)
        this._elem.hierarchy[P].finalTransform.mProp.applyToMatrix(u);
    }
    return u.applyToPointArray(y[0], y[1], y[2] || 0);
  }
  function n(u, y) {
    if (this._elem.hierarchy && this._elem.hierarchy.length) {
      var P, c = this._elem.hierarchy.length;
      for (P = 0; P < c; P += 1)
        this._elem.hierarchy[P].finalTransform.mProp.applyToMatrix(u);
    }
    return u.inversePoint(y);
  }
  function f(u) {
    var y = new ut();
    if (y.reset(), this._elem.finalTransform.mProp.applyToMatrix(y), this._elem.hierarchy && this._elem.hierarchy.length) {
      var P, c = this._elem.hierarchy.length;
      for (P = 0; P < c; P += 1)
        this._elem.hierarchy[P].finalTransform.mProp.applyToMatrix(y);
      return y.inversePoint(u);
    }
    return y.inversePoint(u);
  }
  function o() {
    return [1, 1, 1, 1];
  }
  return function(u) {
    var y;
    function P(d) {
      v.mask = new Ia(d, u);
    }
    function c(d) {
      v.effect = d;
    }
    function v(d) {
      switch (d) {
        case "ADBE Root Vectors Group":
        case "Contents":
        case 2:
          return v.shapeInterface;
        case 1:
        case 6:
        case "Transform":
        case "transform":
        case "ADBE Transform Group":
          return y;
        case 4:
        case "ADBE Effect Parade":
        case "effects":
        case "Effects":
          return v.effect;
        case "ADBE Text Properties":
          return v.textInterface;
        default:
          return null;
      }
    }
    v.getMatrix = t, v.invertPoint = n, v.applyPoint = a, v.toWorld = i, v.toWorldVec = e, v.fromWorld = r, v.fromWorldVec = s, v.toComp = i, v.fromComp = f, v.sampleImage = o, v.sourceRectAtTime = u.sourceRectAtTime.bind(u), v._elem = u, y = Ta(u.finalTransform.mProp);
    var g = Ae(y, "anchorPoint");
    return Object.defineProperties(v, {
      hasParent: {
        get: function() {
          return u.hierarchy.length;
        }
      },
      parent: {
        get: function() {
          return u.hierarchy[0].layerInterface;
        }
      },
      rotation: Ae(y, "rotation"),
      scale: Ae(y, "scale"),
      position: Ae(y, "position"),
      opacity: Ae(y, "opacity"),
      anchorPoint: g,
      anchor_point: g,
      transform: {
        get: function() {
          return y;
        }
      },
      active: {
        get: function() {
          return u.isInRange;
        }
      }
    }), v.startTime = u.data.st, v.index = u.data.ind, v.source = u.data.refId, v.height = u.data.ty === 0 ? u.data.h : 100, v.width = u.data.ty === 0 ? u.data.w : 100, v.inPoint = u.data.ip / u.comp.globalData.frameRate, v.outPoint = u.data.op / u.comp.globalData.frameRate, v._name = u.data.nm, v.registerMaskInterface = P, v.registerEffectsInterface = c, v;
  };
}(), kt = /* @__PURE__ */ function() {
  return function(t, e) {
    return function(i) {
      return i = i === void 0 ? 1 : i, i <= 0 ? t : e(i - 1);
    };
  };
}(), tt = /* @__PURE__ */ function() {
  return function(t, e) {
    var i = {
      _name: t
    };
    function s(r) {
      return r = r === void 0 ? 1 : r, r <= 0 ? i : e(r - 1);
    }
    return s;
  };
}(), Va = /* @__PURE__ */ function() {
  var t = {
    createEffectsInterface: e
  };
  function e(r, a) {
    if (r.effectsManager) {
      var n = [], f = r.data.ef, o, u = r.effectsManager.effectElements.length;
      for (o = 0; o < u; o += 1)
        n.push(i(f[o], r.effectsManager.effectElements[o], a, r));
      var y = r.data.ef || [], P = function(c) {
        for (o = 0, u = y.length; o < u; ) {
          if (c === y[o].nm || c === y[o].mn || c === y[o].ix)
            return n[o];
          o += 1;
        }
        return null;
      };
      return Object.defineProperty(P, "numProperties", {
        get: function() {
          return y.length;
        }
      }), P;
    }
    return null;
  }
  function i(r, a, n, f) {
    function o(v) {
      for (var g = r.ef, d = 0, k = g.length; d < k; ) {
        if (v === g[d].nm || v === g[d].mn || v === g[d].ix)
          return g[d].ty === 5 ? y[d] : y[d]();
        d += 1;
      }
      throw new Error();
    }
    var u = kt(o, n), y = [], P, c = r.ef.length;
    for (P = 0; P < c; P += 1)
      r.ef[P].ty === 5 ? y.push(i(r.ef[P], a.effectElements[P], a.effectElements[P].propertyGroup, f)) : y.push(s(a.effectElements[P], r.ef[P].ty, f, u));
    return r.mn === "ADBE Color Control" && Object.defineProperty(o, "color", {
      get: function() {
        return y[0]();
      }
    }), Object.defineProperties(o, {
      numProperties: {
        get: function() {
          return r.np;
        }
      },
      _name: { value: r.nm },
      propertyGroup: { value: u }
    }), o.enabled = r.en !== 0, o.active = o.enabled, o;
  }
  function s(r, a, n, f) {
    var o = $(r.p);
    function u() {
      return a === 10 ? n.comp.compInterface(r.p.v) : o();
    }
    return r.p.setGroupProperty && r.p.setGroupProperty(tt("", f)), u;
  }
  return t;
}(), La = /* @__PURE__ */ function() {
  return function(t, e, i) {
    var s = e.sh;
    function r(n) {
      return n === "Shape" || n === "shape" || n === "Path" || n === "path" || n === "ADBE Vector Shape" || n === 2 ? r.path : null;
    }
    var a = kt(r, i);
    return s.setGroupProperty(tt("Path", a)), Object.defineProperties(r, {
      path: {
        get: function() {
          return s.k && s.getValue(), s;
        }
      },
      shape: {
        get: function() {
          return s.k && s.getValue(), s;
        }
      },
      _name: { value: t.nm },
      ix: { value: t.ix },
      propertyIndex: { value: t.ix },
      mn: { value: t.mn },
      propertyGroup: { value: i }
    }), r;
  };
}(), Ra = /* @__PURE__ */ function() {
  function t(g, d, k) {
    var l = [], h, p = g ? g.length : 0;
    for (h = 0; h < p; h += 1)
      g[h].ty === "gr" ? l.push(i(g[h], d[h], k)) : g[h].ty === "fl" ? l.push(s(g[h], d[h], k)) : g[h].ty === "st" ? l.push(n(g[h], d[h], k)) : g[h].ty === "tm" ? l.push(f(g[h], d[h], k)) : g[h].ty === "tr" || (g[h].ty === "el" ? l.push(u(g[h], d[h], k)) : g[h].ty === "sr" ? l.push(y(g[h], d[h], k)) : g[h].ty === "sh" ? l.push(La(g[h], d[h], k)) : g[h].ty === "rc" ? l.push(P(g[h], d[h], k)) : g[h].ty === "rd" ? l.push(c(g[h], d[h], k)) : g[h].ty === "rp" ? l.push(v(g[h], d[h], k)) : g[h].ty === "gf" ? l.push(r(g[h], d[h], k)) : l.push(a(g[h], d[h])));
    return l;
  }
  function e(g, d, k) {
    var l, h = function(m) {
      for (var b = 0, E = l.length; b < E; ) {
        if (l[b]._name === m || l[b].mn === m || l[b].propertyIndex === m || l[b].ix === m || l[b].ind === m)
          return l[b];
        b += 1;
      }
      return typeof m == "number" ? l[m - 1] : null;
    };
    h.propertyGroup = kt(h, k), l = t(g.it, d.it, h.propertyGroup), h.numProperties = l.length;
    var p = o(g.it[g.it.length - 1], d.it[d.it.length - 1], h.propertyGroup);
    return h.transform = p, h.propertyIndex = g.cix, h._name = g.nm, h;
  }
  function i(g, d, k) {
    var l = function(m) {
      switch (m) {
        case "ADBE Vectors Group":
        case "Contents":
        case 2:
          return l.content;
        // Not necessary for now. Keeping them here in case a new case appears
        // case 'ADBE Vector Transform Group':
        // case 3:
        default:
          return l.transform;
      }
    };
    l.propertyGroup = kt(l, k);
    var h = e(g, d, l.propertyGroup), p = o(g.it[g.it.length - 1], d.it[d.it.length - 1], l.propertyGroup);
    return l.content = h, l.transform = p, Object.defineProperty(l, "_name", {
      get: function() {
        return g.nm;
      }
    }), l.numProperties = g.np, l.propertyIndex = g.ix, l.nm = g.nm, l.mn = g.mn, l;
  }
  function s(g, d, k) {
    function l(h) {
      return h === "Color" || h === "color" ? l.color : h === "Opacity" || h === "opacity" ? l.opacity : null;
    }
    return Object.defineProperties(l, {
      color: {
        get: $(d.c)
      },
      opacity: {
        get: $(d.o)
      },
      _name: { value: g.nm },
      mn: { value: g.mn }
    }), d.c.setGroupProperty(tt("Color", k)), d.o.setGroupProperty(tt("Opacity", k)), l;
  }
  function r(g, d, k) {
    function l(h) {
      return h === "Start Point" || h === "start point" ? l.startPoint : h === "End Point" || h === "end point" ? l.endPoint : h === "Opacity" || h === "opacity" ? l.opacity : null;
    }
    return Object.defineProperties(l, {
      startPoint: {
        get: $(d.s)
      },
      endPoint: {
        get: $(d.e)
      },
      opacity: {
        get: $(d.o)
      },
      type: {
        get: function() {
          return "a";
        }
      },
      _name: { value: g.nm },
      mn: { value: g.mn }
    }), d.s.setGroupProperty(tt("Start Point", k)), d.e.setGroupProperty(tt("End Point", k)), d.o.setGroupProperty(tt("Opacity", k)), l;
  }
  function a() {
    function g() {
      return null;
    }
    return g;
  }
  function n(g, d, k) {
    var l = kt(x, k), h = kt(E, l);
    function p(S) {
      Object.defineProperty(E, g.d[S].nm, {
        get: $(d.d.dataProps[S].p)
      });
    }
    var m, b = g.d ? g.d.length : 0, E = {};
    for (m = 0; m < b; m += 1)
      p(m), d.d.dataProps[m].p.setGroupProperty(h);
    function x(S) {
      return S === "Color" || S === "color" ? x.color : S === "Opacity" || S === "opacity" ? x.opacity : S === "Stroke Width" || S === "stroke width" ? x.strokeWidth : null;
    }
    return Object.defineProperties(x, {
      color: {
        get: $(d.c)
      },
      opacity: {
        get: $(d.o)
      },
      strokeWidth: {
        get: $(d.w)
      },
      dash: {
        get: function() {
          return E;
        }
      },
      _name: { value: g.nm },
      mn: { value: g.mn }
    }), d.c.setGroupProperty(tt("Color", l)), d.o.setGroupProperty(tt("Opacity", l)), d.w.setGroupProperty(tt("Stroke Width", l)), x;
  }
  function f(g, d, k) {
    function l(p) {
      return p === g.e.ix || p === "End" || p === "end" ? l.end : p === g.s.ix ? l.start : p === g.o.ix ? l.offset : null;
    }
    var h = kt(l, k);
    return l.propertyIndex = g.ix, d.s.setGroupProperty(tt("Start", h)), d.e.setGroupProperty(tt("End", h)), d.o.setGroupProperty(tt("Offset", h)), l.propertyIndex = g.ix, l.propertyGroup = k, Object.defineProperties(l, {
      start: {
        get: $(d.s)
      },
      end: {
        get: $(d.e)
      },
      offset: {
        get: $(d.o)
      },
      _name: { value: g.nm }
    }), l.mn = g.mn, l;
  }
  function o(g, d, k) {
    function l(p) {
      return g.a.ix === p || p === "Anchor Point" ? l.anchorPoint : g.o.ix === p || p === "Opacity" ? l.opacity : g.p.ix === p || p === "Position" ? l.position : g.r.ix === p || p === "Rotation" || p === "ADBE Vector Rotation" ? l.rotation : g.s.ix === p || p === "Scale" ? l.scale : g.sk && g.sk.ix === p || p === "Skew" ? l.skew : g.sa && g.sa.ix === p || p === "Skew Axis" ? l.skewAxis : null;
    }
    var h = kt(l, k);
    return d.transform.mProps.o.setGroupProperty(tt("Opacity", h)), d.transform.mProps.p.setGroupProperty(tt("Position", h)), d.transform.mProps.a.setGroupProperty(tt("Anchor Point", h)), d.transform.mProps.s.setGroupProperty(tt("Scale", h)), d.transform.mProps.r.setGroupProperty(tt("Rotation", h)), d.transform.mProps.sk && (d.transform.mProps.sk.setGroupProperty(tt("Skew", h)), d.transform.mProps.sa.setGroupProperty(tt("Skew Angle", h))), d.transform.op.setGroupProperty(tt("Opacity", h)), Object.defineProperties(l, {
      opacity: {
        get: $(d.transform.mProps.o)
      },
      position: {
        get: $(d.transform.mProps.p)
      },
      anchorPoint: {
        get: $(d.transform.mProps.a)
      },
      scale: {
        get: $(d.transform.mProps.s)
      },
      rotation: {
        get: $(d.transform.mProps.r)
      },
      skew: {
        get: $(d.transform.mProps.sk)
      },
      skewAxis: {
        get: $(d.transform.mProps.sa)
      },
      _name: { value: g.nm }
    }), l.ty = "tr", l.mn = g.mn, l.propertyGroup = k, l;
  }
  function u(g, d, k) {
    function l(m) {
      return g.p.ix === m ? l.position : g.s.ix === m ? l.size : null;
    }
    var h = kt(l, k);
    l.propertyIndex = g.ix;
    var p = d.sh.ty === "tm" ? d.sh.prop : d.sh;
    return p.s.setGroupProperty(tt("Size", h)), p.p.setGroupProperty(tt("Position", h)), Object.defineProperties(l, {
      size: {
        get: $(p.s)
      },
      position: {
        get: $(p.p)
      },
      _name: { value: g.nm }
    }), l.mn = g.mn, l;
  }
  function y(g, d, k) {
    function l(m) {
      return g.p.ix === m ? l.position : g.r.ix === m ? l.rotation : g.pt.ix === m ? l.points : g.or.ix === m || m === "ADBE Vector Star Outer Radius" ? l.outerRadius : g.os.ix === m ? l.outerRoundness : g.ir && (g.ir.ix === m || m === "ADBE Vector Star Inner Radius") ? l.innerRadius : g.is && g.is.ix === m ? l.innerRoundness : null;
    }
    var h = kt(l, k), p = d.sh.ty === "tm" ? d.sh.prop : d.sh;
    return l.propertyIndex = g.ix, p.or.setGroupProperty(tt("Outer Radius", h)), p.os.setGroupProperty(tt("Outer Roundness", h)), p.pt.setGroupProperty(tt("Points", h)), p.p.setGroupProperty(tt("Position", h)), p.r.setGroupProperty(tt("Rotation", h)), g.ir && (p.ir.setGroupProperty(tt("Inner Radius", h)), p.is.setGroupProperty(tt("Inner Roundness", h))), Object.defineProperties(l, {
      position: {
        get: $(p.p)
      },
      rotation: {
        get: $(p.r)
      },
      points: {
        get: $(p.pt)
      },
      outerRadius: {
        get: $(p.or)
      },
      outerRoundness: {
        get: $(p.os)
      },
      innerRadius: {
        get: $(p.ir)
      },
      innerRoundness: {
        get: $(p.is)
      },
      _name: { value: g.nm }
    }), l.mn = g.mn, l;
  }
  function P(g, d, k) {
    function l(m) {
      return g.p.ix === m ? l.position : g.r.ix === m ? l.roundness : g.s.ix === m || m === "Size" || m === "ADBE Vector Rect Size" ? l.size : null;
    }
    var h = kt(l, k), p = d.sh.ty === "tm" ? d.sh.prop : d.sh;
    return l.propertyIndex = g.ix, p.p.setGroupProperty(tt("Position", h)), p.s.setGroupProperty(tt("Size", h)), p.r.setGroupProperty(tt("Rotation", h)), Object.defineProperties(l, {
      position: {
        get: $(p.p)
      },
      roundness: {
        get: $(p.r)
      },
      size: {
        get: $(p.s)
      },
      _name: { value: g.nm }
    }), l.mn = g.mn, l;
  }
  function c(g, d, k) {
    function l(m) {
      return g.r.ix === m || m === "Round Corners 1" ? l.radius : null;
    }
    var h = kt(l, k), p = d;
    return l.propertyIndex = g.ix, p.rd.setGroupProperty(tt("Radius", h)), Object.defineProperties(l, {
      radius: {
        get: $(p.rd)
      },
      _name: { value: g.nm }
    }), l.mn = g.mn, l;
  }
  function v(g, d, k) {
    function l(m) {
      return g.c.ix === m || m === "Copies" ? l.copies : g.o.ix === m || m === "Offset" ? l.offset : null;
    }
    var h = kt(l, k), p = d;
    return l.propertyIndex = g.ix, p.c.setGroupProperty(tt("Copies", h)), p.o.setGroupProperty(tt("Offset", h)), Object.defineProperties(l, {
      copies: {
        get: $(p.c)
      },
      offset: {
        get: $(p.o)
      },
      _name: { value: g.nm }
    }), l.mn = g.mn, l;
  }
  return function(g, d, k) {
    var l;
    function h(m) {
      if (typeof m == "number")
        return m = m === void 0 ? 1 : m, m === 0 ? k : l[m - 1];
      for (var b = 0, E = l.length; b < E; ) {
        if (l[b]._name === m)
          return l[b];
        b += 1;
      }
      return null;
    }
    function p() {
      return k;
    }
    return h.propertyGroup = kt(h, p), l = t(g, d, h.propertyGroup), h.numProperties = l.length, h._name = "Contents", h;
  };
}(), Oa = /* @__PURE__ */ function() {
  var t = function(i) {
    var s = "", r = i.getFootageData();
    function a() {
      return s = "", r = i.getFootageData(), n;
    }
    function n(f) {
      if (r[f])
        return s = f, r = r[f], typeof r == "object" ? n : r;
      var o = f.indexOf(s);
      if (o !== -1) {
        var u = parseInt(f.substr(o + s.length), 10);
        return r = r[u], typeof r == "object" ? n : r;
      }
      return "";
    }
    return a;
  }, e = function(i) {
    function s(r) {
      return r === "Outline" ? s.outlineInterface() : null;
    }
    return s._name = "Outline", s.outlineInterface = t(i), s;
  };
  return function(i) {
    function s(r) {
      return r === "Data" ? s.dataInterface : null;
    }
    return s._name = "Data", s.dataInterface = e(i), s;
  };
}();
var za = {
  layer: Fa,
  effects: Va,
  comp: Ns,
  shape: Ra,
  footage: Oa
};
function Ga(t) {
  return za[t] || null;
}
const Ct = /* @__PURE__ */ function() {
  function t(n, f, o) {
    f.x && (o.k = !0, o.x = !0, o.initiateExpression = Pi.initiateExpression, o.effectsSequence.push(o.initiateExpression(n, f, o).bind(o)));
  }
  function e(n) {
    return n *= this.elem.globalData.frameRate, n -= this.offsetTime, n !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < n ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(n, this._cachingAtTime), this._cachingAtTime.lastFrame = n), this._cachingAtTime.value;
  }
  function i(n) {
    var f = -0.01, o = this.getValueAtTime(n), u = this.getValueAtTime(n + f), y = 0;
    if (o.length) {
      var P;
      for (P = 0; P < o.length; P += 1)
        y += Math.pow(u[P] - o[P], 2);
      y = Math.sqrt(y) * 100;
    } else
      y = 0;
    return y;
  }
  function s(n) {
    if (this.vel !== void 0)
      return this.vel;
    var f = -1e-3, o = this.getValueAtTime(n), u = this.getValueAtTime(n + f), y;
    if (o.length) {
      y = rt("float32", o.length);
      var P;
      for (P = 0; P < o.length; P += 1)
        y[P] = (u[P] - o[P]) / f;
    } else
      y = (u - o) / f;
    return y;
  }
  function r() {
    return this.pv;
  }
  function a(n) {
    this.propertyGroup = n;
  }
  return {
    searchExpressions: t,
    getSpeedAtTime: i,
    getVelocityAtTime: s,
    getValueAtTime: e,
    getStaticValueAtTime: r,
    setGroupProperty: a
  };
}();
function Ba() {
  function t(c, v, g) {
    if (!this.k || !this.keyframes)
      return this.pv;
    c = c ? c.toLowerCase() : "";
    var d = this.comp.renderedFrame, k = this.keyframes, l = k[k.length - 1].t;
    if (d <= l)
      return this.pv;
    var h, p;
    g ? (v ? h = Math.abs(l - this.elem.comp.globalData.frameRate * v) : h = Math.max(0, l - this.elem.data.ip), p = l - h) : ((!v || v > k.length - 1) && (v = k.length - 1), p = k[k.length - 1 - v].t, h = l - p);
    var m, b, E;
    if (c === "pingpong") {
      var x = Math.floor((d - p) / h);
      if (x % 2 !== 0)
        return this.getValueAtTime((h - (d - p) % h + p) / this.comp.globalData.frameRate, 0);
    } else if (c === "offset") {
      var S = this.getValueAtTime(p / this.comp.globalData.frameRate, 0), O = this.getValueAtTime(l / this.comp.globalData.frameRate, 0), j = this.getValueAtTime(((d - p) % h + p) / this.comp.globalData.frameRate, 0), X = Math.floor((d - p) / h);
      if (this.pv.length) {
        for (E = new Array(S.length), b = E.length, m = 0; m < b; m += 1)
          E[m] = (O[m] - S[m]) * X + j[m];
        return E;
      }
      return (O - S) * X + j;
    } else if (c === "continue") {
      var Y = this.getValueAtTime(l / this.comp.globalData.frameRate, 0), L = this.getValueAtTime((l - 1e-3) / this.comp.globalData.frameRate, 0);
      if (this.pv.length) {
        for (E = new Array(Y.length), b = E.length, m = 0; m < b; m += 1)
          E[m] = Y[m] + (Y[m] - L[m]) * ((d - l) / this.comp.globalData.frameRate) / 5e-4;
        return E;
      }
      return Y + (Y - L) * ((d - l) / 1e-3);
    }
    return this.getValueAtTime(((d - p) % h + p) / this.comp.globalData.frameRate, 0);
  }
  function e(c, v, g) {
    if (!this.k)
      return this.pv;
    c = c ? c.toLowerCase() : "";
    var d = this.comp.renderedFrame, k = this.keyframes, l = k[0].t;
    if (d >= l)
      return this.pv;
    var h, p;
    g ? (v ? h = Math.abs(this.elem.comp.globalData.frameRate * v) : h = Math.max(0, this.elem.data.op - l), p = l + h) : ((!v || v > k.length - 1) && (v = k.length - 1), p = k[v].t, h = p - l);
    var m, b, E;
    if (c === "pingpong") {
      var x = Math.floor((l - d) / h);
      if (x % 2 === 0)
        return this.getValueAtTime(((l - d) % h + l) / this.comp.globalData.frameRate, 0);
    } else if (c === "offset") {
      var S = this.getValueAtTime(l / this.comp.globalData.frameRate, 0), O = this.getValueAtTime(p / this.comp.globalData.frameRate, 0), j = this.getValueAtTime((h - (l - d) % h + l) / this.comp.globalData.frameRate, 0), X = Math.floor((l - d) / h) + 1;
      if (this.pv.length) {
        for (E = new Array(S.length), b = E.length, m = 0; m < b; m += 1)
          E[m] = j[m] - (O[m] - S[m]) * X;
        return E;
      }
      return j - (O - S) * X;
    } else if (c === "continue") {
      var Y = this.getValueAtTime(l / this.comp.globalData.frameRate, 0), L = this.getValueAtTime((l + 1e-3) / this.comp.globalData.frameRate, 0);
      if (this.pv.length) {
        for (E = new Array(Y.length), b = E.length, m = 0; m < b; m += 1)
          E[m] = Y[m] + (Y[m] - L[m]) * (l - d) / 1e-3;
        return E;
      }
      return Y + (Y - L) * (l - d) / 1e-3;
    }
    return this.getValueAtTime((h - ((l - d) % h + l)) / this.comp.globalData.frameRate, 0);
  }
  function i(c, v) {
    if (!this.k)
      return this.pv;
    if (c = (c || 0.4) * 0.5, v = Math.floor(v || 5), v <= 1)
      return this.pv;
    var g = this.comp.renderedFrame / this.comp.globalData.frameRate, d = g - c, k = g + c, l = v > 1 ? (k - d) / (v - 1) : 1, h = 0, p = 0, m;
    this.pv.length ? m = rt("float32", this.pv.length) : m = 0;
    for (var b; h < v; ) {
      if (b = this.getValueAtTime(d + h * l), this.pv.length)
        for (p = 0; p < this.pv.length; p += 1)
          m[p] += b[p];
      else
        m += b;
      h += 1;
    }
    if (this.pv.length)
      for (p = 0; p < this.pv.length; p += 1)
        m[p] /= v;
    else
      m /= v;
    return m;
  }
  function s(c) {
    this._transformCachingAtTime || (this._transformCachingAtTime = {
      v: new ut()
    });
    var v = this._transformCachingAtTime.v;
    if (v.cloneFromProps(this.pre.props), this.appliedTransformations < 1) {
      var g = this.a.getValueAtTime(c);
      v.translate(
        -g[0] * this.a.mult,
        -g[1] * this.a.mult,
        g[2] * this.a.mult
      );
    }
    if (this.appliedTransformations < 2) {
      var d = this.s.getValueAtTime(c);
      v.scale(
        d[0] * this.s.mult,
        d[1] * this.s.mult,
        d[2] * this.s.mult
      );
    }
    if (this.sk && this.appliedTransformations < 3) {
      var k = this.sk.getValueAtTime(c), l = this.sa.getValueAtTime(c);
      v.skewFromAxis(-k * this.sk.mult, l * this.sa.mult);
    }
    if (this.r && this.appliedTransformations < 4) {
      var h = this.r.getValueAtTime(c);
      v.rotate(-h * this.r.mult);
    } else if (!this.r && this.appliedTransformations < 4) {
      var p = this.rz.getValueAtTime(c), m = this.ry.getValueAtTime(c), b = this.rx.getValueAtTime(c), E = this.or.getValueAtTime(c);
      v.rotateZ(-p * this.rz.mult).rotateY(m * this.ry.mult).rotateX(b * this.rx.mult).rotateZ(-E[2] * this.or.mult).rotateY(E[1] * this.or.mult).rotateX(E[0] * this.or.mult);
    }
    if (this.data.p && this.data.p.s) {
      var x = this.px.getValueAtTime(c), S = this.py.getValueAtTime(c);
      if (this.data.p.z) {
        var O = this.pz.getValueAtTime(c);
        v.translate(
          x * this.px.mult,
          S * this.py.mult,
          -O * this.pz.mult
        );
      } else
        v.translate(x * this.px.mult, S * this.py.mult, 0);
    } else {
      var j = this.p.getValueAtTime(c);
      v.translate(
        j[0] * this.p.mult,
        j[1] * this.p.mult,
        -j[2] * this.p.mult
      );
    }
    return v;
  }
  function r() {
    return this.v.clone(new ut());
  }
  var a = De.getTransformProperty;
  De.getTransformProperty = function(c, v, g) {
    var d = a(c, v, g);
    return d.dynamicProperties.length ? d.getValueAtTime = s.bind(d) : d.getValueAtTime = r.bind(d), d.setGroupProperty = Ct.setGroupProperty, d;
  };
  var n = N.getProp;
  N.getProp = function(c, v, g, d, k) {
    var l = n(c, v, g, d, k);
    l.kf ? l.getValueAtTime = Ct.getValueAtTime.bind(l) : l.getValueAtTime = Ct.getStaticValueAtTime.bind(l), l.setGroupProperty = Ct.setGroupProperty, l.loopOut = t, l.loopIn = e, l.smooth = i, l.getVelocityAtTime = Ct.getVelocityAtTime.bind(l), l.getSpeedAtTime = Ct.getSpeedAtTime.bind(l), l.numKeys = v.a === 1 ? v.k.length : 0, l.propertyIndex = v.ix;
    var h = 0;
    return g !== 0 && (h = rt("float32", v.a === 1 ? v.k[0].s.length : v.k.length)), l._cachingAtTime = {
      lastFrame: He,
      lastIndex: 0,
      value: h
    }, Ct.searchExpressions(c, v, l), l.k && k.addDynamicProperty(l), l;
  };
  function f(c) {
    return this._cachingAtTime || (this._cachingAtTime = {
      shapeValue: gt.clone(this.pv),
      lastIndex: 0,
      lastTime: He
    }), c *= this.elem.globalData.frameRate, c -= this.offsetTime, c !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < c ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = c, this.interpolateShape(c, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue;
  }
  var o = Wt.getConstructorFunction(), u = Wt.getKeyframedConstructorFunction();
  function y() {
  }
  y.prototype = {
    vertices: function(c, v) {
      this.k && this.getValue();
      var g = this.v;
      v !== void 0 && (g = this.getValueAtTime(v, 0));
      var d, k = g._length, l = g[c], h = g.v, p = mt(k);
      for (d = 0; d < k; d += 1)
        c === "i" || c === "o" ? p[d] = [l[d][0] - h[d][0], l[d][1] - h[d][1]] : p[d] = [l[d][0], l[d][1]];
      return p;
    },
    points: function(c) {
      return this.vertices("v", c);
    },
    inTangents: function(c) {
      return this.vertices("i", c);
    },
    outTangents: function(c) {
      return this.vertices("o", c);
    },
    isClosed: function() {
      return this.v.c;
    },
    pointOnPath: function(c, v) {
      var g = this.v;
      v !== void 0 && (g = this.getValueAtTime(v, 0)), this._segmentsLength || (this._segmentsLength = Lt.getSegmentsLength(g));
      for (var d = this._segmentsLength, k = d.lengths, l = d.totalLength * c, h = 0, p = k.length, m = 0, b; h < p; ) {
        if (m + k[h].addedLength > l) {
          var E = h, x = g.c && h === p - 1 ? 0 : h + 1, S = (l - m) / k[h].addedLength;
          b = Lt.getPointInSegment(g.v[E], g.v[x], g.o[E], g.i[x], S, k[h]);
          break;
        } else
          m += k[h].addedLength;
        h += 1;
      }
      return b || (b = g.c ? [g.v[0][0], g.v[0][1]] : [g.v[g._length - 1][0], g.v[g._length - 1][1]]), b;
    },
    vectorOnPath: function(c, v, g) {
      c == 1 ? c = this.v.c : c == 0 && (c = 0.999);
      var d = this.pointOnPath(c, v), k = this.pointOnPath(c + 1e-3, v), l = k[0] - d[0], h = k[1] - d[1], p = Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
      if (p === 0)
        return [0, 0];
      var m = g === "tangent" ? [l / p, h / p] : [-h / p, l / p];
      return m;
    },
    tangentOnPath: function(c, v) {
      return this.vectorOnPath(c, v, "tangent");
    },
    normalOnPath: function(c, v) {
      return this.vectorOnPath(c, v, "normal");
    },
    setGroupProperty: Ct.setGroupProperty,
    getValueAtTime: Ct.getStaticValueAtTime
  }, st([y], o), st([y], u), u.prototype.getValueAtTime = f, u.prototype.initiateExpression = Pi.initiateExpression;
  var P = Wt.getShapeProp;
  Wt.getShapeProp = function(c, v, g, d, k) {
    var l = P(c, v, g, d, k);
    return l.propertyIndex = v.ix, l.lock = !1, g === 3 ? Ct.searchExpressions(c, v.pt, l) : g === 4 && Ct.searchExpressions(c, v.ks, l), l.k && c.addDynamicProperty(l), l;
  };
}
function Na() {
  Ba();
}
function ki() {
}
ki.prototype = {
  createMergeNode: (t, e) => {
    var i = B("feMerge");
    i.setAttribute("result", t);
    var s, r;
    for (r = 0; r < e.length; r += 1)
      s = B("feMergeNode"), s.setAttribute("in", e[r]), i.appendChild(s), i.appendChild(s);
    return i;
  }
};
var js = "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0";
function Ai(t, e, i, s, r) {
  this.filterManager = e;
  var a = B("feColorMatrix");
  a.setAttribute("type", "matrix"), a.setAttribute("color-interpolation-filters", "linearRGB"), a.setAttribute("values", js + " 1 0"), this.linearFilter = a, a.setAttribute("result", s + "_tint_1"), t.appendChild(a), a = B("feColorMatrix"), a.setAttribute("type", "matrix"), a.setAttribute("color-interpolation-filters", "sRGB"), a.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), a.setAttribute("result", s + "_tint_2"), t.appendChild(a), this.matrixFilter = a;
  var n = this.createMergeNode(
    s,
    [
      r,
      s + "_tint_1",
      s + "_tint_2"
    ]
  );
  t.appendChild(n);
}
st([ki], Ai);
Ai.prototype.renderFrame = function(t) {
  if (t || this.filterManager._mdf) {
    var e = this.filterManager.effectElements[0].p.v, i = this.filterManager.effectElements[1].p.v, s = this.filterManager.effectElements[2].p.v / 100;
    this.linearFilter.setAttribute("values", js + " " + s + " 0"), this.matrixFilter.setAttribute("values", i[0] - e[0] + " 0 0 0 " + e[0] + " " + (i[1] - e[1]) + " 0 0 0 " + e[1] + " " + (i[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 1 0");
  }
};
function qs(t, e, i, s) {
  this.filterManager = e;
  var r = B("feColorMatrix");
  r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", s), t.appendChild(r), this.matrixFilter = r;
}
qs.prototype.renderFrame = function(t) {
  if (t || this.filterManager._mdf) {
    var e = this.filterManager.effectElements[2].p.v, i = this.filterManager.effectElements[6].p.v;
    this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + i + " 0");
  }
};
function Ei(t, e, i) {
  this.initialized = !1, this.filterManager = e, this.elem = i, this.paths = [];
}
Ei.prototype.initialize = function() {
  var t = this.elem.layerElement.children || this.elem.layerElement.childNodes, e, i, s, r;
  for (this.filterManager.effectElements[1].p.v === 1 ? (r = this.elem.maskManager.masksProperties.length, s = 0) : (s = this.filterManager.effectElements[0].p.v - 1, r = s + 1), i = B("g"), i.setAttribute("fill", "none"), i.setAttribute("stroke-linecap", "round"), i.setAttribute("stroke-dashoffset", 1), s; s < r; s += 1)
    e = B("path"), i.appendChild(e), this.paths.push({ p: e, m: s });
  if (this.filterManager.effectElements[10].p.v === 3) {
    var a = B("mask"), n = vt();
    a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(i), this.elem.globalData.defs.appendChild(a);
    var f = B("g");
    for (f.setAttribute("mask", "url(" + At() + "#" + n + ")"); t[0]; )
      f.appendChild(t[0]);
    this.elem.layerElement.appendChild(f), this.masker = a, i.setAttribute("stroke", "#fff");
  } else if (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) {
    if (this.filterManager.effectElements[10].p.v === 2)
      for (t = this.elem.layerElement.children || this.elem.layerElement.childNodes; t.length; )
        this.elem.layerElement.removeChild(t[0]);
    this.elem.layerElement.appendChild(i), this.elem.layerElement.removeAttribute("mask"), i.setAttribute("stroke", "#fff");
  }
  this.initialized = !0, this.pathMasker = i;
};
Ei.prototype.renderFrame = function(t) {
  this.initialized || this.initialize();
  var e, i = this.paths.length, s, r;
  for (e = 0; e < i; e += 1)
    if (this.paths[e].m !== -1 && (s = this.elem.maskManager.viewData[this.paths[e].m], r = this.paths[e].p, (t || this.filterManager._mdf || s.prop._mdf) && r.setAttribute("d", s.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || s.prop._mdf)) {
      var a;
      if (this.filterManager.effectElements[7].p.v !== 0 || this.filterManager.effectElements[8].p.v !== 100) {
        var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01, f = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01, o = r.getTotalLength();
        a = "0 0 0 " + o * n + " ";
        var u = o * (f - n), y = 1 + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01, P = Math.floor(u / y), c;
        for (c = 0; c < P; c += 1)
          a += "1 " + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01 + " ";
        a += "0 " + o * 10 + " 0 0";
      } else
        a = "1 " + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01;
      r.setAttribute("stroke-dasharray", a);
    }
  if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", this.filterManager.effectElements[4].p.v * 2), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) && (t || this.filterManager.effectElements[3].p._mdf)) {
    var v = this.filterManager.effectElements[3].p.v;
    this.pathMasker.setAttribute("stroke", "rgb(" + Vt(v[0] * 255) + "," + Vt(v[1] * 255) + "," + Vt(v[2] * 255) + ")");
  }
};
function Hs(t, e, i, s) {
  this.filterManager = e;
  var r = B("feColorMatrix");
  r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), t.appendChild(r);
  var a = B("feComponentTransfer");
  a.setAttribute("color-interpolation-filters", "sRGB"), a.setAttribute("result", s), this.matrixFilter = a;
  var n = B("feFuncR");
  n.setAttribute("type", "table"), a.appendChild(n), this.feFuncR = n;
  var f = B("feFuncG");
  f.setAttribute("type", "table"), a.appendChild(f), this.feFuncG = f;
  var o = B("feFuncB");
  o.setAttribute("type", "table"), a.appendChild(o), this.feFuncB = o, t.appendChild(a);
}
Hs.prototype.renderFrame = function(t) {
  if (t || this.filterManager._mdf) {
    var e = this.filterManager.effectElements[0].p.v, i = this.filterManager.effectElements[1].p.v, s = this.filterManager.effectElements[2].p.v, r = s[0] + " " + i[0] + " " + e[0], a = s[1] + " " + i[1] + " " + e[1], n = s[2] + " " + i[2] + " " + e[2];
    this.feFuncR.setAttribute("tableValues", r), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n);
  }
};
function ai(t, e, i, s) {
  this.filterManager = e;
  var r = this.filterManager.effectElements, a = B("feComponentTransfer");
  (r[10].p.k || r[10].p.v !== 0 || r[11].p.k || r[11].p.v !== 1 || r[12].p.k || r[12].p.v !== 1 || r[13].p.k || r[13].p.v !== 0 || r[14].p.k || r[14].p.v !== 1) && (this.feFuncR = this.createFeFunc("feFuncR", a)), (r[17].p.k || r[17].p.v !== 0 || r[18].p.k || r[18].p.v !== 1 || r[19].p.k || r[19].p.v !== 1 || r[20].p.k || r[20].p.v !== 0 || r[21].p.k || r[21].p.v !== 1) && (this.feFuncG = this.createFeFunc("feFuncG", a)), (r[24].p.k || r[24].p.v !== 0 || r[25].p.k || r[25].p.v !== 1 || r[26].p.k || r[26].p.v !== 1 || r[27].p.k || r[27].p.v !== 0 || r[28].p.k || r[28].p.v !== 1) && (this.feFuncB = this.createFeFunc("feFuncB", a)), (r[31].p.k || r[31].p.v !== 0 || r[32].p.k || r[32].p.v !== 1 || r[33].p.k || r[33].p.v !== 1 || r[34].p.k || r[34].p.v !== 0 || r[35].p.k || r[35].p.v !== 1) && (this.feFuncA = this.createFeFunc("feFuncA", a)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (a.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(a)), (r[3].p.k || r[3].p.v !== 0 || r[4].p.k || r[4].p.v !== 1 || r[5].p.k || r[5].p.v !== 1 || r[6].p.k || r[6].p.v !== 0 || r[7].p.k || r[7].p.v !== 1) && (a = B("feComponentTransfer"), a.setAttribute("color-interpolation-filters", "sRGB"), a.setAttribute("result", s), t.appendChild(a), this.feFuncRComposed = this.createFeFunc("feFuncR", a), this.feFuncGComposed = this.createFeFunc("feFuncG", a), this.feFuncBComposed = this.createFeFunc("feFuncB", a));
}
ai.prototype.createFeFunc = function(t, e) {
  var i = B(t);
  return i.setAttribute("type", "table"), e.appendChild(i), i;
};
ai.prototype.getTableValue = function(t, e, i, s, r) {
  for (var a = 0, n = 256, f, o = Math.min(t, e), u = Math.max(t, e), y = Array.call(null, { length: n }), P, c = 0, v = r - s, g = e - t; a <= 256; )
    f = a / 256, f <= o ? P = g < 0 ? r : s : f >= u ? P = g < 0 ? s : r : P = s + v * Math.pow((f - t) / g, 1 / i), y[c] = P, c += 1, a += 256 / (n - 1);
  return y.join(" ");
};
ai.prototype.renderFrame = function(t) {
  if (t || this.filterManager._mdf) {
    var e, i = this.filterManager.effectElements;
    this.feFuncRComposed && (t || i[3].p._mdf || i[4].p._mdf || i[5].p._mdf || i[6].p._mdf || i[7].p._mdf) && (e = this.getTableValue(i[3].p.v, i[4].p.v, i[5].p.v, i[6].p.v, i[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || i[10].p._mdf || i[11].p._mdf || i[12].p._mdf || i[13].p._mdf || i[14].p._mdf) && (e = this.getTableValue(i[10].p.v, i[11].p.v, i[12].p.v, i[13].p.v, i[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || i[17].p._mdf || i[18].p._mdf || i[19].p._mdf || i[20].p._mdf || i[21].p._mdf) && (e = this.getTableValue(i[17].p.v, i[18].p.v, i[19].p.v, i[20].p.v, i[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || i[24].p._mdf || i[25].p._mdf || i[26].p._mdf || i[27].p._mdf || i[28].p._mdf) && (e = this.getTableValue(i[24].p.v, i[25].p.v, i[26].p.v, i[27].p.v, i[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || i[31].p._mdf || i[32].p._mdf || i[33].p._mdf || i[34].p._mdf || i[35].p._mdf) && (e = this.getTableValue(i[31].p.v, i[32].p.v, i[33].p.v, i[34].p.v, i[35].p.v), this.feFuncA.setAttribute("tableValues", e));
  }
};
function wi(t, e, i, s, r) {
  var a = e.container.globalData.renderConfig.filterSize, n = e.data.fs || a;
  t.setAttribute("x", n.x || a.x), t.setAttribute("y", n.y || a.y), t.setAttribute("width", n.width || a.width), t.setAttribute("height", n.height || a.height), this.filterManager = e;
  var f = B("feGaussianBlur");
  f.setAttribute("in", "SourceAlpha"), f.setAttribute("result", s + "_drop_shadow_1"), f.setAttribute("stdDeviation", "0"), this.feGaussianBlur = f, t.appendChild(f);
  var o = B("feOffset");
  o.setAttribute("dx", "25"), o.setAttribute("dy", "0"), o.setAttribute("in", s + "_drop_shadow_1"), o.setAttribute("result", s + "_drop_shadow_2"), this.feOffset = o, t.appendChild(o);
  var u = B("feFlood");
  u.setAttribute("flood-color", "#00ff00"), u.setAttribute("flood-opacity", "1"), u.setAttribute("result", s + "_drop_shadow_3"), this.feFlood = u, t.appendChild(u);
  var y = B("feComposite");
  y.setAttribute("in", s + "_drop_shadow_3"), y.setAttribute("in2", s + "_drop_shadow_2"), y.setAttribute("operator", "in"), y.setAttribute("result", s + "_drop_shadow_4"), t.appendChild(y);
  var P = this.createMergeNode(
    s,
    [
      s + "_drop_shadow_4",
      r
    ]
  );
  t.appendChild(P);
}
st([ki], wi);
wi.prototype.renderFrame = function(t) {
  if (t || this.filterManager._mdf) {
    if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
      var e = this.filterManager.effectElements[0].p.v;
      this.feFlood.setAttribute("flood-color", Sr(Math.round(e[0] * 255), Math.round(e[1] * 255), Math.round(e[2] * 255)));
    }
    if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
      var i = this.filterManager.effectElements[3].p.v, s = (this.filterManager.effectElements[2].p.v - 90) * lt, r = i * Math.cos(s), a = i * Math.sin(s);
      this.feOffset.setAttribute("dx", r), this.feOffset.setAttribute("dy", a);
    }
  }
};
var je = [];
function be(t, e, i) {
  this.initialized = !1, this.filterManager = e, this.filterElem = t, this.elem = i, i.matteElement = B("g"), i.matteElement.appendChild(i.layerElement), i.matteElement.appendChild(i.transformedElement), i.baseElement = i.matteElement;
}
be.prototype.findSymbol = function(t) {
  for (var e = 0, i = je.length; e < i; ) {
    if (je[e] === t)
      return je[e];
    e += 1;
  }
  return null;
};
be.prototype.replaceInParent = function(t, e) {
  var i = t.layerElement.parentNode;
  if (i) {
    for (var s = i.children, r = 0, a = s.length; r < a && s[r] !== t.layerElement; )
      r += 1;
    var n;
    r <= a - 2 && (n = s[r + 1]);
    var f = B("use");
    f.setAttribute("href", "#" + e), n ? i.insertBefore(f, n) : i.appendChild(f);
  }
};
be.prototype.setElementAsMask = function(t, e) {
  if (!this.findSymbol(e)) {
    var i = vt(), s = B("mask");
    s.setAttribute("id", e.layerId), s.setAttribute("mask-type", "alpha"), je.push(e);
    var r = t.globalData.defs;
    r.appendChild(s);
    var a = B("symbol");
    a.setAttribute("id", i), this.replaceInParent(e, i), a.appendChild(e.layerElement), r.appendChild(a);
    var n = B("use");
    n.setAttribute("href", "#" + i), s.appendChild(n), e.data.hd = !1, e.show();
  }
  t.setMatte(e.layerId);
};
be.prototype.initialize = function() {
  for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, i = 0, s = e.length; i < s; )
    e[i] && e[i].data.ind === t && this.setElementAsMask(this.elem, e[i]), i += 1;
  this.initialized = !0;
};
be.prototype.renderFrame = function() {
  this.initialized || this.initialize();
};
function Xs(t, e, i, s) {
  t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
  var r = B("feGaussianBlur");
  r.setAttribute("result", s), t.appendChild(r), this.feGaussianBlur = r;
}
Xs.prototype.renderFrame = function(t) {
  if (t || this.filterManager._mdf) {
    var e = 0.3, i = this.filterManager.effectElements[0].p.v * e, s = this.filterManager.effectElements[1].p.v, r = s == 3 ? 0 : i, a = s == 2 ? 0 : i;
    this.feGaussianBlur.setAttribute("stdDeviation", r + " " + a);
    var n = this.filterManager.effectElements[2].p.v == 1 ? "wrap" : "duplicate";
    this.feGaussianBlur.setAttribute("edgeMode", n);
  }
};
function Si() {
}
Si.prototype.init = function(t) {
  this.effectsManager = t, this.type = Ms.TRANSFORM_EFFECT, this.matrix = new ut(), this.opacity = -1, this._mdf = !1, this._opMdf = !1;
};
Si.prototype.renderFrame = function(t) {
  if (this._opMdf = !1, this._mdf = !1, t || this.effectsManager._mdf) {
    var e = this.effectsManager.effectElements, i = e[0].p.v, s = e[1].p.v, r = e[2].p.v === 1, a = e[3].p.v, n = r ? a : e[4].p.v, f = e[5].p.v, o = e[6].p.v, u = e[7].p.v;
    this.matrix.reset(), this.matrix.translate(-i[0], -i[1], i[2]), this.matrix.scale(n * 0.01, a * 0.01, 1), this.matrix.rotate(-u * lt), this.matrix.skewFromAxis(-f * lt, (o + 90) * lt), this.matrix.translate(s[0], s[1], 0), this._mdf = !0, this.opacity !== e[8].p.v && (this.opacity = e[8].p.v, this._opMdf = !0);
  }
};
function Us(t, e) {
  this.init(e);
}
st([Si], Us);
_s(Ma);
Cr(Ga);
Na();
Bt(20, Ai, !0);
Bt(21, qs, !0);
Bt(22, Ei, !1);
Bt(23, Hs, !0);
Bt(24, ai, !0);
Bt(25, wi, !0);
Bt(28, be, !1);
Bt(29, Xs, !0);
Bt(35, Us, !1);
function ja(t) {
  return ht.loadAnimation(ke({
    renderer: "svg"
  }, t));
}
const qa = {
  loadAnimation: ja
}, Ha = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  "indianred ": "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370d8",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#d87093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function Xa(t) {
  return t.startsWith("#") ? t.length === 4 ? `#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}` : t : Ha[t.toLowerCase()] || "#000000";
}
function fs(t) {
  if (t === "light" || t === 1 || t === "1")
    return 1;
  if (t === "regular" || t === 2 || t === "2")
    return 2;
  if (t === "bold" || t === 3 || t === "3")
    return 3;
}
function us(t) {
  return structuredClone(t);
}
function cs(t) {
  return t == null;
}
function Ua(t) {
  return t !== null && typeof t == "object";
}
function Ws(t, e, i) {
  const s = Array.isArray(e) ? e : e.split(".");
  let r = t;
  for (const a of s) {
    if (!Ua(r) || !(a in r))
      return i;
    r = r[a];
  }
  return r === void 0 ? i : r;
}
function wt(t, e, i) {
  let s = t;
  const r = Array.isArray(e) ? e : e.split(".");
  for (let a = 0; a < r.length; ++a)
    a === r.length - 1 ? s[r[a]] = i : s = s[r[a]];
}
function ui(t) {
  const e = t.toString(16);
  return e.length == 1 ? "0" + e : e;
}
function ve(t) {
  return Math.round(t / 255 * 1e3) / 1e3;
}
function ci(t) {
  return Math.round(t * 255);
}
function Wa(t) {
  return "#" + ui(t.r) + ui(t.g) + ui(t.b);
}
function $a(t) {
  let e = parseInt(t[0] != "#" ? t : t.substring(1), 16);
  return {
    r: e >> 16 & 255,
    g: e >> 8 & 255,
    b: e & 255
  };
}
function Ya(t) {
  const {
    r: e,
    g: i,
    b: s
  } = $a(t);
  return [ve(e), ve(i), ve(s)];
}
function Za(t) {
  const e = {
    r: ci(t[0]),
    g: ci(t[1]),
    b: ci(t[2])
  };
  return Wa(e);
}
function ms(t, { lottieInstance: e } = {}) {
  const i = [];
  return !t || !t.layers || t.layers.forEach((s, r) => {
    !s.nm || !s.ef || s.ef.forEach((a, n) => {
      var P, c, v;
      const f = (v = (c = (P = a == null ? void 0 : a.ef) == null ? void 0 : P[0]) == null ? void 0 : c.v) == null ? void 0 : v.k;
      if (f === void 0)
        return;
      let o;
      e ? o = `renderer.elements.${r}.effectsManager.effectElements.${n}.effectElements.0.p.v` : o = `layers.${r}.ef.${n}.ef.0.v.k`;
      let u;
      if (a.mn === "ADBE Color Control" ? u = "color" : a.mn === "ADBE Slider Control" ? u = "slider" : a.mn === "ADBE Point Control" ? u = "point" : a.mn === "ADBE Checkbox Control" ? u = "checkbox" : a.mn.startsWith("Pseudo/") && (u = "feature"), !u)
        return;
      const y = a.nm.toLowerCase();
      i.push({
        name: y,
        path: o,
        value: f,
        type: u
      });
    });
  }), i;
}
function Ye(t, e) {
  for (const i of e)
    wt(t, i.path, i.value);
}
function Se(t, e, i) {
  for (const s of e)
    s.type === "color" ? typeof i == "object" && "r" in i && "g" in i && "b" in i ? wt(t, s.path, [ve(i.r), ve(i.g), ve(i.b)]) : Array.isArray(i) ? wt(t, s.path, i) : typeof i == "string" && wt(t, s.path, Ya(Xa(i))) : s.type === "point" ? typeof i == "object" && "x" in i && "y" in i ? (wt(t, s.path + ".0", i.x), wt(t, s.path + ".1", i.y)) : Array.isArray(i) && (wt(t, s.path + ".0", i[0]), wt(t, s.path + ".1", i[1])) : wt(t, s.path, i);
}
const Ja = {
  loop: !1,
  autoplay: !1,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid meet",
    progressiveLoad: !0,
    hideOnTransparent: !0
  }
}, Ka = ["default"];
function Qa() {
  return new Proxy(this, {
    set: (t, e, i, s) => (typeof e == "string" && (i ? Se(
      this.lottieInstance,
      this.lottieProperties.filter((r) => r.type === "color" && r.name === e),
      i
    ) : Ye(
      this.lottieInstance,
      this.lottieProperties.filter((r) => r.type === "color" && r.name === e)
    ), t.refresh()), !0),
    get: (t, e, i) => {
      for (const s of t.lottieProperties)
        if (s.type == "color" && typeof e == "string" && e == s.name) {
          const r = Ws(this.lottieInstance, s.path);
          if (r)
            return Za(r);
        }
    },
    deleteProperty: (t, e) => (typeof e == "string" && (Ye(
      this.lottieInstance,
      this.lottieProperties.filter((i) => i.type === "color" && i.name === e)
    ), t.refresh()), !0),
    ownKeys: (t) => t.lottieProperties.filter((e) => e.type == "color").map((e) => e.name),
    has: (t, e) => {
      for (const i of t.lottieProperties)
        if (i.type == "color" && typeof e == "string" && e == i.name)
          return !0;
      return !1;
    },
    getOwnPropertyDescriptor: (t) => ({
      enumerable: !0,
      configurable: !0
    })
  });
}
class en {
  /**
   * Creates a new Player instance.
   * @param container The DOM element where the animation will be rendered.
   * @param data Lottie animation data.
   * @param properties Initial icon properties (colors, stroke, state, etc.).
   * @param options Additional options (e.g., autoInit).
   */
  constructor(e, i, s, r = { autoInit: !0 }) {
    Et(this, "_container");
    Et(this, "_iconData");
    Et(this, "_initialProperties");
    Et(this, "_lottieInstance");
    Et(this, "_ready", !1);
    Et(this, "_colorsProxy");
    Et(this, "_direction", 1);
    Et(this, "_speed", 1);
    Et(this, "_lottieProperties");
    Et(this, "_eventHandlers", {});
    Et(this, "_state");
    Et(this, "_availableStates");
    if (this._container = e, this._iconData = i, this._initialProperties = s || {}, this._availableStates = (i.markers || []).map((a) => {
      const n = a.cm.split(":"), f = {
        time: a.tm,
        duration: a.dr,
        name: "",
        default: !1,
        params: []
      };
      for (; Ka.includes(n[0]); ) {
        switch (n[0]) {
          case "default":
            f.default = !0;
            break;
          default:
            throw new Error(`Unsupported state flag: ${n[0]}`);
        }
        n.shift();
      }
      return f.name = n[0], f.params = n.slice(1, n.length), f.name === this._initialProperties.state ? this._state = f : f.default && cs(this._initialProperties.state) && (this._state = f), f;
    }).filter((a) => a.duration > 0), this._availableStates.length && (this._initialProperties.stroke && ![1, 2, 3, "light", "regular", "bold"].includes(this._initialProperties.stroke) && delete this._initialProperties.stroke, this._initialProperties.state && !this._state && (this._state = this._availableStates.filter((a) => a.default)[0])), !this._availableStates.length) {
      this._iconData = us(this._iconData);
      const a = ms(this._iconData, { lottieInstance: !1 });
      if (a && this._initialProperties.state) {
        const n = `state-${this._initialProperties.state.toLowerCase()}`;
        Se(
          this._iconData,
          a.filter((f) => f.name.startsWith("state-")),
          0
        ), Se(
          this._iconData,
          a.filter((f) => f.name === n),
          1
        );
      }
      if (a && this._initialProperties.stroke) {
        const n = a.filter((f) => f.name === "stroke")[0];
        if (n) {
          const f = n.value / 50, o = this._initialProperties.stroke * f;
          wt(this._iconData, n.path, o);
        }
      }
      if (a && this._initialProperties.scale) {
        const n = a.filter((f) => f.name === "scale")[0];
        if (n) {
          const f = n.value / 50, o = this._initialProperties.scale * f;
          wt(this._iconData, n.path, o);
        }
      }
      if (a && this._initialProperties.axisX && this._initialProperties.axisY) {
        const n = a.filter((f) => f.name === "axis")[0];
        if (n) {
          const f = (n.value[0] + n.value[1]) / 2 / 50;
          wt(this._iconData, n.path + ".0", this._initialProperties.axisX * f), wt(this._iconData, n.path + ".1", this._initialProperties.axisY * f);
        }
      }
    }
    r.autoInit && this.init();
  }
  /**
   * Initializes the player and connects it to the DOM element.
   * Throws an error if already initialized.
   */
  init() {
    if (this._lottieInstance)
      throw new Error("Already connected player!");
    const e = {}, i = {};
    if (this._state && (i.initialSegment = [this._state.time, this._state.time + this._state.duration + 1]), this._availableStates.length) {
      const s = this._availableStates[0], r = this._availableStates[this._availableStates.length - 1];
      e.ip = s.time, e.op = r.time + r.duration + 1;
    }
    this._lottieInstance = qa.loadAnimation(Hi(ke(ke({}, Ja), i), {
      container: this._container,
      animationData: Object.assign(us(this._iconData), e)
    })), this._initialProperties.colors && (this.colors = this._initialProperties.colors), this._initialProperties.stroke && (this.stroke = this._initialProperties.stroke), this._lottieInstance.addEventListener("complete", () => {
      this.triggerEvent("complete");
    }), this._lottieInstance.addEventListener("loopComplete", () => {
      this.triggerEvent("complete");
    }), this._lottieInstance.addEventListener("enterFrame", () => {
      this.triggerEvent("frame");
    }), this._lottieInstance.isLoaded ? (this._ready = !0, this.triggerEvent("ready")) : this._lottieInstance.addEventListener("config_ready", () => {
      this._ready = !0, this.triggerEvent("ready");
    });
  }
  /**
   * Destroys the player and releases all resources.
   * Throws an error if not initialized.
   */
  destroy() {
    if (!this._lottieInstance)
      throw new Error("Not connected player!");
    this._ready = !1, this._lottieInstance.destroy(), this._lottieInstance = void 0, this._colorsProxy = void 0, this._lottieProperties = void 0;
  }
  /**
   * Registers an event listener for a player event.
   * @param name Event name (e.g., 'complete', 'frame', 'ready').
   * @param handler Handler function to call when the event is triggered.
   * @returns Function to remove the listener.
   */
  addEventListener(e, i) {
    return this._eventHandlers[e] || (this._eventHandlers[e] = []), this._eventHandlers[e].push(i), () => {
      this.removeEventListener(e, i);
    };
  }
  /**
   * Removes an event listener for a player event.
   * @param name Event name.
   * @param handler Handler function to remove. If not provided, removes all handlers for the event.
   */
  removeEventListener(e, i) {
    if (!i)
      this._eventHandlers[e] = null;
    else if (this._eventHandlers[e]) {
      let s = 0, r = this._eventHandlers[e].length;
      for (; s < r; )
        this._eventHandlers[e][s] === i && (this._eventHandlers[e].splice(s, 1), s -= 1, r -= 1), s += 1;
      this._eventHandlers[e].length || (this._eventHandlers[e] = null);
    }
  }
  /**
   * Triggers a player event and invokes all registered callbacks.
   * @param name Event name.
   * @param args Optional arguments to pass to the callbacks.
   */
  triggerEvent(e, i) {
    if (this._eventHandlers[e]) {
      const s = this._eventHandlers[e];
      for (let r = 0; r < s.length; r += 1)
        s[r](i);
    }
  }
  /**
   * Forces a re-render of the animation.
   */
  refresh() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    this._lottieInstance.renderer.renderFrame(null), this.triggerEvent("refresh");
  }
  /**
   * Starts playing the animation from the current frame.
   * Note: If the animation is finished, it cannot be played again from the last frame.
   */
  play() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    this._lottieInstance.setDirection(this._direction), this._lottieInstance.play();
  }
  /**
   * Plays the animation from the beginning of the current state or from the start if no state is set.
   */
  playFromStart() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    this._lottieInstance.setDirection(1), this._state ? this._lottieInstance.playSegments([this._state.time, this._state.time + this._state.duration + 1], !0) : this._lottieInstance.goToAndPlay(0);
  }
  /**
   * Pauses the animation at the current frame.
   */
  pause() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    this._lottieInstance.pause();
  }
  /**
   * Stop the animation.
   */
  stop() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    this._lottieInstance.stop();
  }
  /**
   * Moves the animation to a specific frame and stops.
   * @param frame Frame number to seek to.
   */
  seek(e) {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    this._lottieInstance.goToAndStop(e, !0);
  }
  /**
   * Moves the animation to the first frame and stops.
   */
  seekToStart() {
    this.seek(0);
  }
  /**
   * Moves the animation to the last frame and stops.
   */
  seekToEnd() {
    this.seek(Math.max(0, this.frameCount));
  }
  /**
   * Sets the animation segment to play.
   * If no segment is provided, resets to the default segment.
   * @param segment Optional segment as [start, end] frame numbers.
   */
  switchSegment(e) {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    e ? this._lottieInstance.setSegment(e[0], e[1]) : this._lottieInstance.resetSegments(!0), this._lottieInstance.goToAndStop(0, !0);
  }
  /**
   * Sets multiple icon properties at once. 
   * Any property not provided will be reset to its default value.
   * @param properties Properties to assign.
   */
  set properties(e) {
    this.colors = e.colors || null, this.stroke = e.stroke || null, this.state = e.state || null;
  }
  /**
   * Gets the current icon properties (colors, stroke, state).
   * @returns The current properties.
   */
  get properties() {
    const e = {};
    return this.lottieProperties.filter((i) => i.type === "color").length && (e.colors = ke({}, this.colors)), this.lottieProperties.filter((i) => i.name === "stroke" || i.name === "stroke-layers").length && (e.stroke = this.stroke), this._availableStates.length && (e.state = this.state), e;
  }
  /**
   * Sets all customizable colors at once. 
   * Pass null to reset all colors to default.
   * @param colors Color map or null.
   */
  set colors(e) {
    if (Ye(
      this._lottieInstance,
      this.lottieProperties.filter((i) => i.type === "color")
    ), e)
      for (const [i, s] of Object.entries(e))
        Se(
          this._lottieInstance,
          this.lottieProperties.filter((r) => r.type === "color" && r.name === i),
          s
        );
    this.refresh();
  }
  /**
   * Provides a proxy for reading or updating individual colors by name.
   * 
   * Example:
   *   player.colors.primary = '#ff0000';
   *   delete player.colors.secondary;
   */
  get colors() {
    return this._colorsProxy || (this._colorsProxy = Qa.call(this)), this._colorsProxy;
  }
  /**
   * Sets the stroke width for the icon.
   * Pass null to reset to default.
   * @param stroke Stroke value or null.
   */
  set stroke(e) {
    Ye(
      this._lottieInstance,
      this.lottieProperties.filter((s) => s.name === "stroke" || s.name === "stroke-layers")
    );
    const i = fs(e);
    i && Se(
      this._lottieInstance,
      this.lottieProperties.filter((s) => s.name === "stroke" || s.name === "stroke-layers"),
      i
    ), this.refresh();
  }
  /**
   * Gets the current stroke width of the icon.
   * @returns Stroke value or null if not set.
   */
  get stroke() {
    const e = this.lottieProperties.filter((i) => i.name === "stroke" || i.name === "stroke-layers")[0];
    if (e) {
      let i = +Ws(this._lottieInstance, e.path);
      return fs(i) || null;
    }
    return null;
  }
  /**
   * Sets the current state (animation segment) of the icon.
   * If the state does not exist, falls back to the default state.
   * @param state State name or null for default.
   */
  set state(e) {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    if (e === this.state)
      return;
    const i = this.playing;
    this._state = void 0, cs(e) ? this._state = this._availableStates.filter((s) => s.default)[0] : e && (this._state = this._availableStates.filter((s) => s.name === e)[0], this._state || (this._state = this._availableStates.filter((s) => s.default)[0])), this.switchSegment(
      this._state ? [this._state.time, this._state.time + this._state.duration + 1] : void 0
    ), i && (this.pause(), this.play());
  }
  /**
   * Gets the current state (animation segment) of the icon.
   * @returns State name or null if not set.
   */
  get state() {
    return this._state ? this._state.name : "";
  }
  /**
   * Sets the playback speed of the animation.
   * @param speed Playback speed (1 = normal).
   */
  set speed(e) {
    var i;
    this._speed = e, (i = this._lottieInstance) == null || i.setSpeed(e);
  }
  /**
   * Gets the current playback speed.
   * @returns Playback speed.
   */
  get speed() {
    return this._speed;
  }
  /**
   * Sets the playback direction.
   * @param direction 1 for forward, -1 for reverse.
   */
  set direction(e) {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    this._direction = e, this._lottieInstance.setDirection(e);
  }
  /**
   * Gets the current playback direction.
   * @returns Playback direction.
   */
  get direction() {
    return this._direction;
  }
  /**
   * Enables or disables looping of the animation.
   * @param loop True to loop, false otherwise.
   */
  set loop(e) {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    this._lottieInstance.loop = e;
  }
  /**
   * Gets whether the animation is set to loop.
   * @returns True if looping, false otherwise.
   */
  get loop() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    return !!this._lottieInstance.loop;
  }
  /**
   * Sets the current frame of the animation.
   * @param frame Frame number.
   */
  set frame(e) {
    this.seek(Math.max(0, Math.min(this.frameCount, e)));
  }
  /**
   * Gets the current frame of the animation.
   * @returns Current frame number.
   */
  get frame() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    return this._lottieInstance.currentFrame;
  }
  /**
   * Gets the list of available states for the icon.
   * @returns Array of available states.
   */
  get availableStates() {
    return this._availableStates;
  }
  /**
   * Returns true if the animation is currently playing.
   */
  get playing() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    return !this._lottieInstance.isPaused;
  }
  /**
   * Returns true if the player is ready for interaction.
   */
  get ready() {
    return this._ready;
  }
  /**
   * Gets the total number of frames in the animation.
   * @returns Frame count.
   */
  get frameCount() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    return this._lottieInstance.getDuration(!0) - 1;
  }
  /**
   * Gets the current segment of the animation as [start, end] frame numbers.
   * @returns Segment as [start, end].
   */
  get segment() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    return [
      this._lottieInstance.firstFrame,
      this._lottieInstance.firstFrame + this._lottieInstance.totalFrames
    ];
  }
  /**
   * Gets the duration of the animation in seconds.
   * @returns Duration in seconds.
   */
  get duration() {
    if (!this._lottieInstance) throw new Error("Player not initialized");
    return this._lottieInstance.getDuration(!1);
  }
  /**
   * Provides access to the underlying Lottie player instance.
   * @returns LottieAnimationInstance.
   */
  get lottieInstance() {
    return this._lottieInstance;
  }
  /**
   * Gets all customizable properties for the icon.
   * @returns Array of LottieProperty.
   */
  get lottieProperties() {
    return this._lottieProperties || (this._lottieProperties = ms(this._iconData, { lottieInstance: !0 }), !this._availableStates.length && this._lottieProperties && (this._lottieProperties = this._lottieProperties.filter((e) => e.name !== "scale" && e.name !== "axis" && e.name !== "stroke" && !e.name.startsWith("state-")))), this._lottieProperties || [];
  }
}
export {
  en as Player
};