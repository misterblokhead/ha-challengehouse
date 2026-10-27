// src/lib/api.js
var e, t = (t) => e = t;
async function n(t, n, r) {
	if (!e && t !== "GET") return console.info("demo:", t, n, r), { ok: !0 };
	let i = {
		method: t,
		headers: r === void 0 ? {} : { "Content-Type": "application/json" },
		body: r === void 0 ? void 0 : JSON.stringify(r)
	}, a = await (e ? e.fetchWithAuth("/api/fitbridge/ui/" + n, i) : fetch(`./demo-${n}.json`, i));
	if (!a.ok) {
		let e = await a.json().then((e) => e?.detail, () => void 0);
		throw Object.assign(Error(String(a.status)), {
			status: a.status,
			detail: e
		});
	}
	return a.json();
}
var r = (e) => n("GET", e), i = Array.isArray, a = Array.prototype.indexOf, o = Array.prototype.includes, s = Array.from, c = Object.defineProperty, l = Object.getOwnPropertyDescriptor, u = Object.getOwnPropertyDescriptors, d = Object.prototype, f = Array.prototype, p = Object.getPrototypeOf, m = Object.isExtensible, h = () => {};
function g(e) {
	return e();
}
function _(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function v() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function y(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var b = 1024, x = 2048, S = 4096, C = 8192, w = 16384, T = 32768, E = 1 << 25, ee = 65536, te = 1 << 19, ne = 1 << 20, re = 1 << 25, ie = 1 << 21, ae = 1 << 22, oe = 1 << 23, se = Symbol("$state"), ce = Symbol("component"), le = Symbol("legacy props"), ue = Symbol(""), de = Symbol("attributes"), fe = Symbol("class"), pe = Symbol("style"), me = Symbol("text"), he = Symbol("form reset"), ge = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), _e = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), ve = {}, D = Symbol("uninitialized"), ye = "http://www.w3.org/1999/xhtml";
function be() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function xe(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Se() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var O = !1;
function Ce(e) {
	O = e;
}
var k;
function we(e) {
	if (e === null) throw xe(), ve;
	return k = e;
}
function Te() {
	return we(/* @__PURE__ */ cn(k));
}
function A(e) {
	if (O) {
		if (/* @__PURE__ */ cn(k) !== null) throw xe(), ve;
		k = e;
	}
}
function Ee(e = 1) {
	if (O) {
		for (var t = e, n = k; t--;) n = /* @__PURE__ */ cn(n);
		k = n;
	}
}
function De(e = !0) {
	for (var t = 0, n = k;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ cn(n);
		e && n.remove(), n = i;
	}
}
function Oe(e) {
	if (!e || e.nodeType !== 8) throw xe(), ve;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function ke(e) {
	return e === this.v;
}
function Ae(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function je(e) {
	return !Ae(e, this.v);
}
function Me(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// node_modules/svelte/src/internal/client/errors.js
function Ne() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Pe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Fe(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Ie() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Le(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Re() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ze(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Be() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ve() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function He() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ue() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/flags/index.js
var We = !1;
function Ge() {
	We = !0;
}
// node_modules/svelte/src/internal/shared/clone.js
var Ke = [];
function qe(e, t = !1, n = !1) {
	return Je(e, /* @__PURE__ */ new Map(), "", Ke, null, n);
}
function Je(e, t, n, r, a = null, o = !1) {
	if (typeof e == "object" && e) {
		var s = t.get(e);
		if (s !== void 0) return s;
		if (e instanceof Map) return new Map(e);
		if (e instanceof Set) return new Set(e);
		if (i(e)) {
			var c = Array(e.length);
			t.set(e, c), a !== null && t.set(a, c);
			for (var l = 0; l < e.length; l += 1) {
				var u = e[l];
				l in e && (c[l] = Je(u, t, n, r, null, o));
			}
			return c;
		}
		if (p(e) === d) {
			c = {}, t.set(e, c), a !== null && t.set(a, c);
			for (var f of Object.keys(e)) c[f] = Je(e[f], t, n, r, null, o);
			return c;
		}
		if (e instanceof Date) return e.getTime(), structuredClone(e);
		if (typeof e.toJSON == "function" && !o) return Je(e.toJSON(), t, n, r, e);
	}
	if (e instanceof EventTarget) return e;
	try {
		return structuredClone(e);
	} catch {
		return e;
	}
}
// node_modules/svelte/src/internal/client/context.js
var j = null;
function Ye(e) {
	j = e;
}
function M(e, t = !1, n) {
	j = {
		p: j,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: G,
		l: We && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function N(e) {
	var t = j, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) xn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, j = t.p, Xe(e);
}
function Xe(e = {}) {
	return c(e, ce, { value: !0 }), e;
}
function Ze() {
	return !We || j !== null && j.l === null;
}
// node_modules/svelte/src/internal/client/dom/task.js
var Qe = [];
function $e() {
	var e = Qe;
	Qe = [], _(e);
}
function et(e) {
	if (Qe.length === 0 && !Et) {
		var t = Qe;
		queueMicrotask(() => {
			t === Qe && $e();
		});
	}
	Qe.push(e);
}
function tt() {
	for (; Qe.length > 0;) $e();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var nt = ~(x | S | b);
function P(e, t) {
	e.f = e.f & nt | t;
}
function rt(e) {
	e.f & 512 || e.deps === null ? P(e, b) : P(e, S);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function it(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), P(e, b);
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
var at = !1;
function ot() {
	at || (at = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[he]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function st(e) {
	var t = W, n = G;
	Wn(null), Gn(null);
	try {
		return e();
	} finally {
		Wn(t), Gn(n);
	}
}
function ct(e, t, n, r = n) {
	e.addEventListener(t, () => st(n));
	let i = e[he];
	e[he] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ot();
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function lt(e, t, n, r) {
	let i = Ze() ? pt : gt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = G, c = ut(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				mn(e, s);
			}
			dt();
		}
	}
	var d = ft();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ ht(e))).then(u).catch((e) => mn(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), dt());
	}) : f();
}
function ut() {
	var e = G, t = W, n = j, r = I;
	return function(i = !0) {
		Gn(e), Wn(t), Ye(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function dt(e = !0) {
	Gn(null), Wn(null), Ye(null), e && I?.deactivate();
}
function ft() {
	var e = G, t = e.b, n = I, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function pt(e) {
	var t = 2 | x;
	return G !== null && (G.f |= te), {
		ctx: j,
		deps: null,
		effects: null,
		equals: ke,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: D,
		wv: 0,
		parent: G,
		ac: null
	};
}
var mt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function ht(e, t, n) {
	let r = G;
	r === null && Ne();
	var i = void 0, a = Ut(D), o = !W, s = /* @__PURE__ */ new Set();
	return Tn(() => {
		var t = G, n = v();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ge && n.reject(e);
			}).finally(dt);
		} catch (e) {
			n.reject(e), dt();
		}
		var c = I;
		if (o) {
			if (t.f & 32768) var l = ft();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(mt);
			else for (let e of s.values()) e.reject(mt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== mt && (c.activate(), t ? (a.f |= oe, qt(a, t)) : (a.f & 8388608 && (a.f ^= oe), qt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), yn(() => {
		for (let e of s) e.reject(mt);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function F(e) {
	let t = /* @__PURE__ */ pt(e);
	return qn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function gt(e) {
	let t = /* @__PURE__ */ pt(e);
	return t.equals = je, t;
}
function _t(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Mn(t[n]);
	}
}
function vt(e) {
	var t, n = G, r = e.parent;
	if (!Vn && r !== null && e.v !== D && r.f & 24576) return be(), e.v;
	Gn(r);
	try {
		_t(e), t = ar(e);
	} finally {
		Gn(n);
	}
	return t;
}
function yt(e) {
	var t = vt(e);
	!e.equals(t) && (e.wv = nr(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), Ct?.capture(e, t, !0)), e.deps === null)) ? P(e, b) : Vn || (wt === null ? rt(e) : (vn() || I?.is_fork) && wt.set(e, t));
}
function bt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && st(() => {
		t.ac.abort(ge), t.ac = null;
	}), t.fn !== null && (t.teardown = h), cr(t, 0), An(t));
}
function xt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && lr(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var St = null, I = null, Ct = null, wt = null, Tt = null, Et = !1, Dt = !1, Ot = null, kt = null, At = 0, jt = 1, Mt = class e {
	id = jt++;
	#e = !1;
	linked = !0;
	#t = null;
	#n = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = /* @__PURE__ */ new Set();
	#a = 0;
	#o = /* @__PURE__ */ new Map();
	#s = null;
	#c = [];
	#l = [];
	#u = /* @__PURE__ */ new Set();
	#d = /* @__PURE__ */ new Set();
	#f = /* @__PURE__ */ new Map();
	#p = /* @__PURE__ */ new Set();
	is_fork = !1;
	#m = !1;
	constructor() {
		St === null ? St = this : (St.#n = this, this.#t = St), St = this;
	}
	#h() {
		if (this.is_fork) return !0;
		for (let n of this.#o.keys()) {
			for (var e = n, t = !1; e.parent !== null;) {
				if (this.#f.has(e)) {
					t = !0;
					break;
				}
				e = e.parent;
			}
			if (!t) return !0;
		}
		return !1;
	}
	skip_effect(e) {
		this.#f.has(e) || this.#f.set(e, {
			d: [],
			m: []
		}), this.#p.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#f.get(e);
		if (n) {
			this.#f.delete(e);
			for (var r of n.d) P(r, x), t(r);
			for (r of n.m) P(r, S), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		var e = [];
		for (let i of this.#c) if (!(i.f & 16384 || !(i.f & 6144))) {
			for (var t = i, n = !1; t.parent !== null;) {
				t = t.parent;
				var r = t.f;
				if (r & 96) {
					if (!(r & 1024)) {
						n = !0;
						break;
					}
					t.f ^= b;
				}
			}
			n || e.push(t);
		}
		return this.#c = [], e;
	}
	#_() {
		this.#e = !0;
		for (let e of this.#u) this.#d.delete(e), P(e, x), this.schedule(e);
		for (let e of this.#d) P(e, S), this.schedule(e);
		this.apply();
		for (var t = Ot = [], n = [], r = kt = []; this.#c.length > 0;) {
			At++ > 1e3 && (this.#S(), Pt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw zt(e), this.#h() || this.discard(), t;
			}
		}
		if (I = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Ot = null, kt = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Rt(e, t);
			r.length > 0 && I.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), Ct = this, It(n), It(t), Ct = null, this.#s?.resolve();
			var o = I;
			if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
				if (o !== null) {
					for (let e of this.#c) o.#c.push(e);
					this.#c = [];
				} else o = this;
			}
			o !== null && (Vt.clear(), o.#_());
		}
	}
	#v(e, t, n) {
		e.f ^= b;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= b : i & 4 ? t.push(r) : rr(r) && (i & 16 && this.#d.add(r), lr(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#y() {
		for (var e = this.#t; e !== null;) {
			if (!e.is_fork) {
				for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
			}
			e = e.#t;
		}
		return null;
	}
	#b(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve).catch(e.reject);
		}
		e.async_deriveds.clear(), this.transfer_effects(e.#u, e.#d);
		let t = (e) => {
			var n = e.reactions;
			if (n !== null && !(e.f & 2 && !(e.f & 6144))) for (let e of n) {
				var r = e.f;
				if (r & 2) t(e);
				else {
					var i = e;
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), P(i, x), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), I = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) it(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== D && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), wt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, wt = null;
	}
	flush() {
		try {
			Dt = !0, I = this, this.#_();
		} finally {
			At = 0, Tt = null, Ot = null, kt = null, Dt = !1, I = null, wt = null, Vt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(mt);
		this.#S(), this.#s?.resolve();
	}
	register_created_effect(e) {
		this.#l.push(e);
	}
	increment(e, t) {
		if (this.#a += 1, e) {
			let e = this.#o.get(t) ?? 0;
			this.#o.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#a, e) {
			let e = this.#o.get(t) ?? 0;
			e === 1 ? this.#o.delete(t) : this.#o.set(t, e - 1);
		}
		this.#m || (this.#m = !0, et(() => {
			this.#m = !1, this.linked && this.flush();
		}));
	}
	transfer_effects(e, t) {
		for (let t of e) this.#u.add(t);
		for (let e of t) this.#d.add(e);
		e.clear(), t.clear();
	}
	oncommit(e) {
		this.#r.add(e);
	}
	ondiscard(e) {
		this.#i.add(e);
	}
	settled() {
		return (this.#s ??= v()).promise;
	}
	static ensure() {
		if (I === null) {
			let t = I = new e();
			!Dt && !Et && et(() => {
				t.#e || t.flush();
			});
		}
		return I;
	}
	apply() {
		wt = null;
	}
	schedule(e) {
		Tt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? St = e : t.#t = e, this.linked = !1;
		}
	}
};
function Nt(e) {
	var t = Et, n = Ct;
	Ct = null, Et = !0;
	try {
		var r;
		for (e && (Nt(), r = e());;) {
			if (tt(), I === null) return r;
			I.flush();
		}
	} finally {
		Et = t, Ct = n;
	}
}
function Pt() {
	try {
		Re();
	} catch (e) {
		mn(e, Tt);
	}
}
var Ft = null;
function It(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && rr(r) && (Ft = /* @__PURE__ */ new Set(), lr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Pn(r), Ft?.size > 0)) {
				Vt.clear();
				for (let e of Ft) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Ft.has(n) && (Ft.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || lr(n);
					}
				}
				Ft.clear();
			}
		}
		Ft = null;
	}
}
function Lt(e) {
	I.schedule(e);
}
function Rt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), P(e, b);
		for (var n = e.first; n !== null;) Rt(n, t), n = n.next;
	}
}
function zt(e) {
	P(e, b);
	for (var t = e.first; t !== null;) zt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Bt = /* @__PURE__ */ new Set(), Vt = /* @__PURE__ */ new Map(), Ht = !1;
function Ut(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: ke,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function L(e, t) {
	let n = Ut(e, t);
	return qn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Wt(e, t = !1, n = !0) {
	let r = Ut(e);
	return t || (r.equals = je), We && n && j !== null && j.l !== null && (j.l.s ??= []).push(r), r;
}
function R(e, t, n = !1) {
	return W !== null && (!Un || W.f & 131072) && Ze() && W.f & 4325394 && (Kn === null || !Kn.has(e)) && He(), qt(e, n ? Zt(t) : t, kt);
}
var Gt = null, Kt = 0;
function qt(e, t, n = null) {
	if (!e.equals(t)) {
		Vn ? Vt.set(e, t) : Vt.has(e) || Vt.set(e, e.v);
		var r = Mt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && vt(t), wt === null && rt(t);
		}
		e.wv = nr(), Gt = null, Kt = 0, Xt(e, x, n), Gt = null, Ze() && G !== null && G.f & 1024 && !(G.f & 96) && (Xn === null ? Zn([e]) : Xn.push(e)), !r.is_fork && Bt.size > 0 && !Ht && Jt();
	}
	return t;
}
function Jt() {
	Ht = !1;
	for (let e of Bt) {
		e.f & 1024 && P(e, S);
		let t;
		try {
			t = rr(e);
		} catch {
			t = !0;
		}
		t && lr(e);
	}
	Bt.clear();
}
function Yt(e) {
	R(e, e.v + 1);
}
function Xt(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = Ze(), a = r.length;
		if (Kt += a, Kt > 1e5 && Gt === null && (Gt = /* @__PURE__ */ new Set()), Gt !== null) {
			if (Gt.has(e)) return;
			Gt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== G) {
				var l = (c & x) === 0;
				if (l && P(s, t), c & 131072) Bt.add(s);
				else if (c & 2) {
					var u = s;
					wt?.delete(u), Xt(u, S, n);
				} else if (l) {
					var d = s;
					c & 16 && Ft !== null && Ft.add(d), n === null ? Lt(d) : n.push(d);
				}
			}
		}
	}
}
function Zt(e) {
	if (typeof e != "object" || !e || se in e || ce in e) return e;
	let t = p(e);
	if (t !== d && t !== f) return e;
	var n = /* @__PURE__ */ new Map(), r = i(e), a = /* @__PURE__ */ L(0), o = null, s = er, c = (e) => {
		if (er === s) return e();
		var t = W, n = er;
		Wn(null), tr(s);
		var r = e();
		return Wn(t), tr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ L(e.length, o)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Be();
			var i = n.get(t);
			return i === void 0 ? c(() => {
				var e = /* @__PURE__ */ L(r.value, o);
				return n.set(t, e), e;
			}) : R(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = c(() => /* @__PURE__ */ L(D, o));
					n.set(t, e), Yt(a);
				}
			} else R(r, D), Yt(a);
			return !0;
		},
		get(t, r, i) {
			if (r === se) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || l(t, r)?.writable) && (a = c(() => /* @__PURE__ */ L(Zt(s ? t[r] : D), o)), n.set(r, a)), a !== void 0) {
				var u = K(a);
				return u === D ? void 0 : u;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = K(i);
				if (a === D) return;
				if (r && "value" in r) r.value = a;
				else return {
					enumerable: !0,
					configurable: !0,
					value: a,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === se) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== D || Reflect.has(e, t);
			return (r !== void 0 || G !== null && (!i || l(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ L(i ? Zt(e[t]) : D, o)), n.set(t, r)), K(r) === D) ? !1 : i;
		},
		set(e, t, i, s) {
			var u = n.get(t), d = t in e;
			if (r && t === "length") for (var f = i; f < u.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ L(D, o)), n.set(f + "", p)) : R(p, D);
			}
			if (u === void 0) (!d || l(e, t)?.writable) && (u = c(() => /* @__PURE__ */ L(void 0, o)), R(u, Zt(i)), n.set(t, u));
			else {
				d = u.v !== D;
				var m = c(() => Zt(i));
				R(u, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, i), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				Yt(a);
			}
			return !0;
		},
		ownKeys(e) {
			K(a);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== D;
			});
			for (var [r, i] of n) i.v !== D && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Ve();
		}
	});
}
function Qt(e) {
	try {
		if (typeof e == "object" && e && se in e) return e[se];
	} catch {}
	return e;
}
function $t(e, t) {
	return Object.is(Qt(e), Qt(t));
}
var en, tn, nn, rn;
function an() {
	if (en === void 0) {
		en = window, tn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		nn = l(t, "firstChild").get, rn = l(t, "nextSibling").get, m(e) && (e[fe] = void 0, e[de] = null, e[pe] = void 0, e.__e = void 0), m(n) && (n[me] = void 0);
	}
}
function on(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function sn(e) {
	return nn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function cn(e) {
	return rn.call(e);
}
function z(e, t) {
	if (!O) return /* @__PURE__ */ sn(e);
	var n = /* @__PURE__ */ sn(k);
	if (n === null) n = k.appendChild(on());
	else if (t && n.nodeType !== 3) {
		var r = on();
		return n?.before(r), we(r), r;
	}
	return t && fn(n), we(n), n;
}
function B(e, t = !1) {
	if (!O) {
		var n = /* @__PURE__ */ sn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ cn(n) : n;
	}
	if (t) {
		if (k?.nodeType !== 3) {
			var r = on();
			return k?.before(r), we(r), r;
		}
		fn(k);
	}
	return k;
}
function V(e, t = !1) {
	if (!O) return /* @__PURE__ */ sn(e);
	var n = z(e, t);
	return A(e), n;
}
function H(e, t = 1, n = !1) {
	let r = O ? k : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ cn(r);
	if (!O) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = on();
			return r === null ? i?.after(a) : r.before(a), we(a), a;
		}
		fn(r);
	}
	return we(r), r;
}
function ln(e) {
	e.textContent = "";
}
function un() {
	return !1;
}
function dn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function fn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function pn(e) {
	var t = G;
	if (t === null) return W.f |= oe, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	mn(e, t);
}
function mn(e, t) {
	if (e === ve) throw e;
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128 && !(t.f & 33570816)) {
				if (!(t.f & 32768)) throw e;
				try {
					t.b.error(e);
					return;
				} catch (t) {
					e = t;
				}
			}
			t = t.parent;
		}
		throw e;
	}
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function hn(e) {
	G === null && (W === null && Le(e), Ie()), Vn && Fe(e);
}
function gn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function _n(e, t) {
	var n = G;
	n !== null && n.f & 8192 && (e |= C);
	var r = {
		ctx: j,
		deps: null,
		nodes: null,
		f: e | x | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	I?.register_created_effect(r);
	var i = r;
	if (e & 4) Ot === null ? Mt.ensure().schedule(r) : Ot.push(r);
	else if (t !== null) {
		try {
			lr(r);
		} catch (e) {
			throw Mn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ee));
	}
	if (i !== null && (i.parent = n, n !== null && gn(i, n), W !== null && W.f & 2 && !(e & 64))) {
		var a = W;
		(a.effects ??= []).push(i);
	}
	return r;
}
function vn() {
	return W !== null && !Un;
}
function yn(e) {
	let t = _n(8, null);
	return P(t, b), t.teardown = e, t;
}
function bn(e) {
	hn("$effect");
	var t = G.f;
	if (!W && t & 32 && j !== null && !j.i) {
		var n = j;
		(n.e ??= []).push(e);
	} else return xn(e);
}
function xn(e) {
	return _n(4 | ne, e);
}
function Sn(e) {
	return hn("$effect.pre"), _n(8 | ne, e);
}
function Cn(e) {
	Mt.ensure();
	let t = _n(64 | te, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Fn(t, () => {
			Mn(t), n(void 0);
		}) : (Mn(t), n(void 0));
	});
}
function wn(e) {
	return _n(4, e);
}
function Tn(e) {
	return _n(ae | te, e);
}
function En(e, t = 0) {
	return _n(8 | t, e);
}
function U(e, t = [], n = [], r = []) {
	lt(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(K));
		});
	});
}
function Dn(e, t = 0) {
	return _n(16 | t, e);
}
function On(e) {
	return _n(32 | te, e);
}
function kn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Vn, r = W;
		Hn(!0), Wn(null);
		try {
			t.call(null);
		} catch (t) {
			mn(t, e.parent);
		} finally {
			Hn(n), Wn(r);
		}
	}
}
function An(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && st(() => {
			e.abort(ge);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Mn(n, t), n = r;
	}
}
function jn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Mn(t), t = n;
	}
}
function Mn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Nn(e.nodes.start, e.nodes.end), n = !0), e.f |= E, An(e, t && !n), cr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	kn(e), e.f ^= E, e.f |= w;
	var i = e.parent;
	i !== null && i.first !== null && Pn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Nn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ cn(e);
		e.remove(), e = n;
	}
}
function Pn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Fn(e, t, n = !0) {
	var r = [];
	e.f |= 256, In(e, r, !0);
	var i = () => {
		n && Mn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function In(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= C;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				In(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Ln(e) {
	e.f &= -257, Rn(e, !0);
}
function Rn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= C, e.f & 1024 || (P(e, x), Mt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Rn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function zn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ cn(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Bn = null, Vn = !1;
function Hn(e) {
	Vn = e;
}
var W = null, Un = !1;
function Wn(e) {
	W = e;
}
var G = null;
function Gn(e) {
	G = e;
}
var Kn = null;
function qn(e) {
	W !== null && (W.f & 2097152 || W.f & 2) && (Kn ??= /* @__PURE__ */ new Set()).add(e);
}
var Jn = null, Yn = 0, Xn = null;
function Zn(e) {
	Xn = e;
}
var Qn = 1, $n = 0, er = $n;
function tr(e) {
	er = e;
}
function nr() {
	return ++Qn;
}
function rr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (rr(a) && yt(a), a.wv > e.wv) return !0;
		}
		t & 512 && wt === null && P(e, b);
	}
	return !1;
}
function ir(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Kn !== null && Kn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ir(a, t, !1) : t === a && (n ? P(a, x) : a.f & 1024 && P(a, S), Lt(a));
	}
}
function ar(e) {
	var t = Jn, n = Yn, r = Xn, i = W, a = Kn, o = j, s = Un, c = er, l = e.f;
	Jn = null, Yn = 0, Xn = null, W = l & 96 ? null : e, Kn = null, Ye(e.ctx), Un = !1, er = ++$n, e.ac !== null && (st(() => {
		e.ac.abort(ge);
	}), e.ac = null);
	try {
		e.f |= ie;
		var u = e.fn, d = u();
		e.f |= T;
		var f = or(e);
		if (Ze() && Xn !== null && !Un && f !== null && !(e.f & 6146)) for (var p = 0; p < Xn.length; p++) ir(Xn[p], e);
		if (i !== null && i !== e) {
			if ($n++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = $n;
			if (t !== null) for (let e of t) e.rv = $n;
			Xn !== null && (r === null ? r = Xn : r.push(...Xn));
		}
		return e.f & 8388608 && (e.f ^= oe), d;
	} catch (t) {
		return or(e), pn(t);
	} finally {
		e.f ^= ie, Jn = t, Yn = n, Xn = r, W = i, Kn = a, Ye(o), Un = s, er = c;
	}
}
function or(e) {
	var t = e.deps, n = I?.is_fork;
	if (Jn !== null) {
		var r;
		if (n || cr(e, Yn), t !== null && Yn > 0) for (t.length = Yn + Jn.length, r = 0; r < Jn.length; r++) t[Yn + r] = Jn[r];
		else e.deps = t = Jn;
		if (vn() && e.f & 512) for (r = Yn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Yn < t.length && (cr(e, Yn), t.length = Yn);
	return t;
}
function sr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = a.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (Jn === null || !o.call(Jn, t))) {
		var s = t;
		s.f & 512 && (s.f ^= 512), s.v !== D && rt(s), s.ac !== null && st(() => {
			s.ac.abort(ge), s.ac = null, P(s, x);
		}), bt(s), cr(s, 0);
	}
}
function cr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) sr(e, n[r]);
}
function lr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, b);
		var n = G;
		G = e;
		try {
			t & 16777232 ? jn(e) : An(e), kn(e);
			var r = ar(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = Qn;
		} finally {
			G = n;
		}
	}
}
async function ur() {
	await Promise.resolve(), Nt();
}
function K(e) {
	var t = !!(e.f & 2);
	if (Bn?.add(e), W !== null && !Un && !(G !== null && G.f & 16384) && (Kn === null || !Kn.has(e))) {
		var n = W.deps;
		if (W.f & 2097152) e.rv < $n && (e.rv = $n, Jn === null && n !== null && n[Yn] === e ? Yn++ : Jn === null ? Jn = [e] : Jn.push(e));
		else {
			W.deps ??= [], o.call(W.deps, e) || W.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [W] : o.call(r, W) || r.push(W);
		}
	}
	if (Vn && Vt.has(e)) return Vt.get(e);
	if (t) {
		var i = e;
		if (Vn) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || fr(i)) && (a = vt(i)), Vt.set(i, a), a;
		}
		var s = !(i.f & 512) && !Un && W !== null && !!(W.f & 512), c = (i.f & T) === 0;
		rr(i) && (s && (i.f |= 512), yt(i)), s && !c && (xt(i), dr(i));
	}
	if (wt?.has(e)) return wt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function dr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : o.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (xt(n), dr(n));
	}
}
function fr(e) {
	if (e.v === D) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Vt.has(t) || t.f & 2 && fr(t)) return !0;
	return !1;
}
function pr(e) {
	var t = Un;
	try {
		return Un = !0, e();
	} finally {
		Un = t;
	}
}
function mr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (se in e) hr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && se in n && hr(n);
		}
	}
}
function hr(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			hr(e[n], t);
		} catch {}
		let n = p(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = u(n);
			for (let n in t) {
				let r = t[n].get;
				if (r) try {
					r.call(e);
				} catch {}
			}
		}
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var gr = ["touchstart", "touchmove"];
function _r(e) {
	return gr.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var vr = Symbol("events"), yr = /* @__PURE__ */ new Set(), br = /* @__PURE__ */ new Set();
function xr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Er.call(t, e), !e.cancelBubble) return st(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, et(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Sr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = xr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && yn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function q(e, t, n) {
	(t[vr] ??= {})[e] = n;
}
function Cr(e) {
	for (var t = 0; t < e.length; t++) yr.add(e[t]);
	for (var n of br) n(e);
}
var wr = null, Tr = !1;
function Er(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	wr = e, Tr || (Tr = !0, setTimeout(() => {
		Tr = !1, wr = null;
	}));
	var o = 0, s = wr === e && e[vr];
	if (s) {
		var l = i.indexOf(s);
		if (l !== -1 && (t === document || t === window)) {
			e[vr] = t;
			return;
		}
		var u = i.indexOf(t);
		if (u === -1) return;
		l <= u && (o = l);
	}
	if (a = i[o] || e.target, a !== t) {
		c(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var d = W, f = G;
		Wn(null), Gn(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[vr]?.[r];
					h == null || a.disabled && e.target !== a || h.call(a, e);
				} catch (e) {
					p ? m.push(e) : p = e;
				}
				if (e.cancelBubble) break;
				o++, a = o < i.length ? i[o] : null;
			}
			if (p) {
				for (let e of m) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[vr] = t, delete e.currentTarget, Wn(d), Gn(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Dr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Or(e) {
	return Dr?.createHTML(e) ?? e;
}
function kr(e) {
	var t = dn("template");
	return t.innerHTML = Or(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Ar(e, t) {
	var n = G;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function J(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (O) return Ar(k, null), k;
		i === void 0 && (i = kr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ sn(i)));
		var t = r || tn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ sn(t), s = t.lastChild;
			Ar(o, s);
		} else Ar(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function jr(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (O) return Ar(k, null), k;
		if (!o) {
			var e = /* @__PURE__ */ sn(kr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ sn(e);) o.appendChild(/* @__PURE__ */ sn(e));
			else o = /* @__PURE__ */ sn(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ sn(t), r = t.lastChild;
			Ar(n, r);
		} else Ar(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Mr(e, t) {
	return /* @__PURE__ */ jr(e, t, "svg");
}
function Nr() {
	if (O) return Ar(k, null), k;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = on();
	return e.append(t, n), Ar(t, n), e;
}
function Y(e, t) {
	if (O) {
		var n = G;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = k), Te();
	} else e !== null && e.before(t);
}
function Pr() {
	if (O && k && k.nodeType === 8 && k.textContent?.startsWith("$")) {
		let e = k.textContent.substring(1);
		return Te(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Fr(e) {
	let t = 0, n = Ut(0), r;
	return () => {
		vn() && (K(n), En(() => (t === 0 && (r = pr(() => e(() => Yt(n)))), t += 1, () => {
			et(() => {
				--t, t === 0 && (r?.(), r = void 0, Yt(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ir = ee | te;
function Lr(e, t, n, r) {
	new Rr(e, t, n, r);
}
var Rr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = O ? k : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Set();
	#m = null;
	#h = Fr(() => (this.#m = Ut(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = G;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = G.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Dn(() => {
			if (O) {
				let e = Oe(this.#t);
				Te();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Ir), O && (this.#e = k);
	}
	#g() {
		try {
			this.#a = On(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		et(r), t && (this.#s = On(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? Se() : (t = !0, n && Ue(), this.#s !== null && Fn(this.#s, () => {
				this.#s = null;
			}), this.#C(() => {
				this.#x();
			})));
		};
		return {
			reset: r,
			invoke_onerror: () => {
				if (!this.#y()) try {
					n = !0, this.#n.onerror?.(e, r), n = !1;
				} catch (e) {
					mn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (w | E)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = On(() => e(this.#e)), et(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = on(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return On(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							mn(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(I)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Fn(this.#o, () => {
					this.#o = null;
				}), this.#S(I));
			}
		}));
	}
	#x() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = On(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				zn(this.#a, e);
				let t = this.#n.pending;
				this.#o = On(() => t(this.#e));
			} else this.#S(I);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		it(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = G, n = W, r = j;
		Gn(this.#i), Wn(this.#i), Ye(this.#i.ctx);
		try {
			return Mt.ensure(), e();
		} finally {
			Gn(t), Wn(n), Ye(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && Fn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, et(() => {
			this.#d = !1, this.#m && qt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), K(this.#m);
	}
	error(e) {
		if (e === ve || !this.#n.onerror && !this.#n.failed) throw e;
		I?.is_fork ? (this.#a && I.skip_effect(this.#a), this.#o && I.skip_effect(this.#o), this.#s && I.skip_effect(this.#s), I.oncommit(() => {
			this.#y() || this.#T(e);
		})) : this.#T(e);
	}
	#T(e) {
		this.#a &&= (Mn(this.#a), null), this.#o &&= (Mn(this.#o), null), this.#s &&= (Mn(this.#s), null), O && (we(this.#t), Ee(), we(De()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return On(() => {
						var r = G;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return mn(e, this.#i.parent), null;
				}
			}));
		};
		et(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					mn(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => mn(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function X(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[me] ??= e.nodeValue) && (e[me] = n, e.nodeValue = `${n}`);
}
function zr(e, t) {
	return Vr(e, t);
}
var Br = /* @__PURE__ */ new Map();
function Vr(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: c }) {
	an();
	var l = void 0, u = Cn(() => {
		var o = n ?? t.appendChild(on());
		Lr(o, { pending: () => {} }, (t) => {
			M({});
			var n = j;
			if (a && (n.c = a), i && (r.$$events = i), O && Ar(t, null), l = e(t, r) || Xe(), O && (G.nodes.end = k, k === null || k.nodeType !== 8 || k.data !== "]")) throw xe(), ve;
			N();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = _r(r);
					for (let e of [t, document]) {
						var a = Br.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Br.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Er, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(s(yr)), br.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Br.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Er), r.delete(e), r.size === 0 && Br.delete(n)) : r.set(e, i);
			}
			br.delete(d), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Hr.set(l, u), l;
}
var Hr = /* @__PURE__ */ new WeakMap(), Ur = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) Ln(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Ln(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Mn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						zn(r, t), t.append(on()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Mn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Fn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Mn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = un();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = on();
				i.append(a), this.#n.set(e, {
					effect: On(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, On(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else O && (this.anchor = k), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Z(e, t, n = !1) {
	var r;
	O && (r = k, Te());
	var i = new Ur(e), a = n ? ee : 0;
	function o(e, t) {
		if (O) {
			var n = Oe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = De();
				we(a), i.anchor = a, Ce(!1), i.ensure(e, t), Ce(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Dn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Wr(e, t) {
	return t;
}
function Gr(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, c = 0; c < i; c++) {
		let n = t[c];
		Fn(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Kr(e, s(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			ln(d), d.append(u), e.items.clear();
		}
		Kr(e, t, !l);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Kr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= re, zn(a, document.createDocumentFragment())) : Mn(t[i], n);
	}
}
var qr;
function Q(e, t, n, r, a, o = null) {
	var c = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		c = O ? we(/* @__PURE__ */ sn(u)) : u.appendChild(on());
	}
	O && Te();
	var d = null, f = /* @__PURE__ */ gt(() => {
		var e = n();
		return i(e) ? e : e == null ? [] : s(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = K(f);
			_.fallback = d, Yr(_, n, c, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= re, Zr(d, null, c)) : Ln(d) : Fn(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: Dn(() => {
			var e = K(f), i = e.length;
			let s = !1;
			O && Oe(c) === "[!" != (i === 0) && (c = De(), we(c), Ce(!1), s = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = I, v = un(), y = 0; y < i; y += 1) {
				O && k.nodeType === 8 && k.data === "]" && (c = k, s = !0, Ce(!1));
				var b = e[y], x = r(b, y), S = m ? null : l.get(x);
				S ? (S.v && qt(S.v, b), S.i && qt(S.i, y), v && _.unskip_effect(S.e)) : (S = Xr(l, m ? c : qr ??= on(), b, x, y, a, t, n), m || (S.e.f |= re), l.set(x, S)), u.add(x);
			}
			if (i === 0 && o && !d && (m ? d = On(() => o(c)) : (d = On(() => o(qr ??= on())), d.f |= re)), i > u.size && Pe("", "", ""), O && i > 0 && we(De()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			s && Ce(!0), K(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, O && (c = k);
}
function Jr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Yr(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, c = e.items, l = Jr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (a) for (v = 0; v < o; v += 1) h = t[v], g = i(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (h = t[v], g = i(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Ln(_), a && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= re, _ === l) Zr(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Qr(e, d, _), Qr(e, _, y), Zr(_, y, n), d = _, p = [], m = [], l = Jr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Zr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Qr(e, S.prev, C.next), Qr(e, d, S), Qr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Zr(_, l, n), Qr(e, _.prev, _.next), Qr(e, _, d === null ? e.effect.first : d.next), Qr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Jr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Jr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Kr(e, s(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Jr(l.next);
		var T = w.length;
		if (T > 0) {
			var E = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			Gr(e, w, E);
		}
	}
	a && et(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Xr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Ut(n) : /* @__PURE__ */ Wt(n, !1, !1) : null, l = o & 2 ? Ut(i) : null;
	return {
		v: c,
		i: l,
		e: On(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Zr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ cn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Qr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function $r(e, t, ...n) {
	var r = new Ur(e);
	Dn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, ee);
}
// node_modules/clsx/dist/clsx.mjs
function ei(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = ei(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function ti() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = ei(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/svelte/src/internal/shared/attributes.js
function ni(e) {
	return typeof e == "object" ? ti(e) : e ?? "";
}
var ri = [..." 	\n\r\f\xA0\v﻿"];
function ii(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ri.includes(r[o - 1])) && (s === r.length || ri.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function ai(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function oi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function si(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(oi)), i && c.push(...Object.keys(i).map(oi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = oi(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += ai(r)), i && (n += ai(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function ci(e, t, n, r, i, a) {
	var o = e[fe];
	if (O || o !== n || o === void 0) {
		var s = ii(n, r, a);
		O && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[fe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function li(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function ui(e, t, n, r) {
	var i = e[pe];
	if (O || i !== t) {
		var a = si(t, r);
		O && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[pe] = t;
	} else r && (Array.isArray(r) ? (li(e, n?.[0], r[0]), li(e, n?.[1], r[1], "important")) : li(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var di = Symbol("is custom element"), fi = Symbol("is html"), pi = _e ? "link" : "LINK";
function mi(e) {
	if (O) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					$(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					$(e, "checked", null), e.checked = r;
				}
			}
		};
		e[he] = n, et(n), ot();
	}
}
function $(e, t, n, r) {
	var i = hi(e);
	O && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === pi) || i[t] !== (i[t] = n) && (t === "loading" && (e[ue] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && _i(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function hi(e) {
	return e[de] ??= {
		[di]: e.nodeName.includes("-"),
		[fi]: e.namespaceURI === ye
	};
}
var gi = /* @__PURE__ */ new Map();
function _i(e) {
	var t = e.getAttribute("is") || e.nodeName, n = gi.get(t);
	if (n) return n;
	gi.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = u(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = p(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function vi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ct(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Si(e) ? Ci(a) : a, n(a), I !== null && r.add(I), await ur(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (O && e.defaultValue !== e.value || pr(t) == null && e.value) && (n(Si(e) ? Ci(e.value) : e.value), I !== null && r.add(I)), En(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = I;
			if (r.has(i)) return;
		}
		Si(e) && n === Ci(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
var yi = /* @__PURE__ */ new Set();
function bi(e, t, n, r, i = r) {
	var a = n.getAttribute("type") === "checkbox", o = e;
	let s = !1;
	if (t !== null) for (var c of t) o = o[c] ??= [];
	o.push(n), ct(n, "change", () => {
		var e = n.__value;
		a && (e = xi(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), En(() => {
		var e = r();
		O && n.defaultChecked !== n.checked ? s = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = $t(n.__value, e);
	}), yn(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), yi.has(o) || (yi.add(o), et(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), yi.delete(o);
	})), et(() => {
		if (s) {
			var e = a ? xi(o, e, n.checked) : o.find((e) => e.checked)?.__value;
			i(e);
		}
	});
}
function xi(e, t, n) {
	for (var r = /* @__PURE__ */ new Set(), i = 0; i < e.length; i += 1) e[i].checked && r.add(e[i].__value);
	return n || r.delete(t), Array.from(r);
}
function Si(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ci(e) {
	return e === "" ? null : +e;
}
var wi = /* @__PURE__ */ new class e {
	#e = /* @__PURE__ */ new WeakMap();
	#t;
	#n;
	static entries = /* @__PURE__ */ new WeakMap();
	constructor(e) {
		this.#n = e;
	}
	observe(e, t) {
		var n = this.#e.get(e) || /* @__PURE__ */ new Set();
		return n.add(t), this.#e.set(e, n), this.#r().observe(e, this.#n), () => {
			var n = this.#e.get(e);
			n.delete(t), n.size === 0 && (this.#e.delete(e), this.#t.unobserve(e));
		};
	}
	#r() {
		return this.#t ??= new ResizeObserver((t) => {
			for (var n of t) {
				e.entries.set(n.target, n);
				for (var r of this.#e.get(n.target) || []) r(n);
			}
		});
	}
}({ box: "border-box" });
function Ti(e, t, n) {
	var r = wi.observe(e, () => n(e[t]));
	wn(() => (pr(() => n(e[t])), r));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Ei(e, t) {
	return e === t || e?.[se] === t;
}
function Di(e = Xe(), t, n, r) {
	var i = j.r, a = G;
	return wn(() => {
		var o, s;
		return En(() => {
			o = s, s = r?.() || [], pr(() => {
				Ei(n(...s), e) || (t(e, ...s), o && Ei(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Ei(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
function Oi(e, t, n = t) {
	var r = e === "x", i = () => st(() => {
		a = !0, clearTimeout(o), o = setTimeout(s, 100), n(window[r ? "scrollX" : "scrollY"]);
	});
	addEventListener("scroll", i, { passive: !0 });
	var a = !1, o, s = () => {
		a = !1;
	}, c = !0;
	En(() => {
		var e = t();
		c ? c = !1 : !a && e != null && (a = !0, clearTimeout(o), r ? scrollTo(e, window.scrollY) : scrollTo(window.scrollX, e), o = setTimeout(s, 100));
	}), wn(i), yn(() => {
		removeEventListener("scroll", i);
	});
}
// node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function ki(e = !1) {
	let t = j, n = t.l.u;
	if (!n) return;
	let r = () => mr(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ pt(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => K(i);
	}
	n.b.length && Sn(() => {
		Ai(t, r), _(n.b);
	}), bn(() => {
		let e = pr(() => n.m.map(g));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && bn(() => {
		Ai(t, r), _(n.a);
	});
}
function Ai(e, t) {
	if (e.l.s) for (let t of e.l.s) K(t);
	t();
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var ji = !1;
function Mi(e) {
	var t = ji;
	try {
		return ji = !1, [e(), ji];
	} finally {
		ji = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function Ni(e, t, n, r) {
	var i = !We || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, u = void 0, d = () => o && i ? (u ??= /* @__PURE__ */ pt(r), K(u)) : (c && (c = !1, s = o ? pr(r) : r), s);
	let f;
	if (a) {
		var p = se in e || le in e;
		f = l(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = Mi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ze(t), f(m)));
	var g = i ? () => {
		var n = e[t];
		return n === void 0 ? d() : (c = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (s = void 0), n === void 0 ? s : n;
	};
	if (i && !(n & 4)) return g;
	if (f) {
		var _ = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || _ || h) && f(t ? g() : e), e) : g();
		});
	}
	var v = !1, y = (n & 1 ? pt : gt)(() => (v = !1, g()));
	a && K(y);
	var b = G;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? K(y) : i && a ? Zt(e) : e;
			return R(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return Vn && v || b.f & 16384 ? y.v : K(y);
	});
}
function Pi(e) {
	j === null && Me("onMount"), We && j.l !== null ? Fi(j).m.push(e) : bn(() => {
		let t = pr(e);
		if (typeof t == "function") return t;
	});
}
function Fi(e) {
	var t = e.l;
	return t.u ??= {
		a: [],
		b: [],
		m: []
	};
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/lib/model.js
var Ii = (e) => Math.min(1, Math.max(0, e)), Li = (e) => String(e).padStart(2, "0"), Ri = (e, t) => t > 0 ? Ii(e / t) : 1, zi = (e) => e.workouts ?? e.gym ?? 0, Bi = (e) => [
	e.goal.runs,
	zi(e.goal),
	e.goal.active_days ?? 0
], Vi = (e) => [
	e.runs,
	zi(e),
	e.active_days ?? 0
], Hi = (e) => Vi(e).map((t, n) => Ri(t, Bi(e)[n])), Ui = (e) => e.toLocaleString("en-US");
function Wi(e, t) {
	if (e == null) return null;
	let n = t > 0 ? e >= t ? " · Active day ✓" : ` · ${Ui(t - e)} to go` : "";
	return `👟 ${Ui(e)} steps today${n}`;
}
function Gi(e, t) {
	let n = (e) => e ? " ✓" : "", r = ([e, n]) => {
		let r = t[e];
		if (n) return `${r?.name ?? e} ✓`;
		let i = r ? Bi(r.week) : [], a = r ? Vi(r.week) : [];
		return `${r?.name ?? e} ${i.filter((e, t) => e > 0 && a[t] >= e).length} of ${i.filter((e) => e > 0).length}`;
	};
	if (e.mode === "team") return `${e.team.done} of ${e.team.target} team points${n(e.met)}`;
	let i = Object.entries(e.members_met).map(r);
	return e.mode === "together" && i.push(`${e.together.done} of ${e.together.target} together${n(e.together.done >= e.together.target)}`), i.join(" · ");
}
function Ki(e) {
	if (!e.reward) return null;
	if (e.met) return `${e.reward} unlocked!`;
	let t = {
		own: "you both make your goals",
		together: `you both make your goals and do ${e.together.target} together`,
		team: `you reach ${e.team.target} team points`
	};
	return `${e.reward}: unlocks when ${t[e.mode]}`;
}
function qi(e) {
	let t = e.xp - e.level_floor, n = e.next_level_xp - e.level_floor;
	return {
		level: e.level,
		into: t,
		span: n,
		frac: n > 0 ? Ii(t / n) : 1
	};
}
var Ji = (e) => `Week ${Number(e.week.split("-W")[1])} · ${e.days_left} ${e.days_left === 1 ? "day" : "days"} left`;
function Yi(e, t, n = 15) {
	let r = new Date(e);
	return t - r > n * 6e4 ? `Updated ${Li(r.getHours())}:${Li(r.getMinutes())}` : null;
}
var Xi = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], Zi = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function Qi(e, t = !0) {
	let n = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(e);
	if (!n) return "";
	let [, r, i, a, o] = n, s = `${Xi[new Date(Date.UTC(r, i - 1, a)).getUTCDay()]} ${Number(a)} ${Zi[i - 1]}`;
	return t ? `${s}, ${o}` : s;
}
var $i = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${Li(e % 60)} min` : `${e / 60} h`;
function ea(e) {
	if (e.kind !== "run" && e.kind !== "walk" || !(e.km > 0)) return null;
	let t = Math.round(e.minutes * 60 / e.km);
	return `${Math.floor(t / 60)}:${Li(t % 60)} /km`;
}
var ta = (e) => ({
	title: e.name,
	when: Qi(e.start, e.kind !== "active_day"),
	duration: e.kind === "active_day" ? `${Ui(e.steps)} steps` : $i(e.minutes),
	xp: e.xp ? `+${e.xp}` : "",
	detail: {
		km: e.km == null ? null : `${e.km.toFixed(1)} km`,
		pace: ea(e),
		hr: e.avg_hr == null ? null : `${e.avg_hr} bpm`,
		plan: e.plan ?? null,
		url: e.url ?? null
	},
	removable: e.kind === "active_day" ? null : e.excluded ? "restore" : e.key.startsWith("manual:") ? "delete" : "remove"
});
function na(e) {
	let t = [["walk", e.warmup_s ?? 0], ...e.intervals].filter(([, e]) => e > 0), n = t.reduce((e, [, t]) => e + t, 0);
	return t.map(([e, t]) => ({
		kind: e,
		frac: t / n
	}));
}
function ra(e, t) {
	let n = Object.hasOwn(t, e.person) ? e.person : null;
	return {
		self: n,
		others: Object.keys(t).filter((e) => e !== n)
	};
}
var ia = (e) => `${Number(e.slice(8, 10))} ${Zi[Number(e.slice(5, 7)) - 1]}`;
function aa(e, t, n) {
	let r = t.find((t) => t.key === e.key);
	return n - e.at > 6e5 || !r || e.want !== null && r.excluded === e.want;
}
function oa(e, t, n) {
	let r = (e[t] ?? Promise.resolve()).then(n), i = e[t] = r.catch(() => {});
	return i.then(() => e[t] === i && delete e[t]), r;
}
function sa(e) {
	let t = (e) => e < 10 ? e.toFixed(1) : Math.round(e).toLocaleString(), n = e.km == null ? "unknown" : e.km >= e.limit ? "replace" : e.km >= .9 * e.limit ? "soon" : "ok", r = e.last_run ? new Date(e.last_run) : null, i = e.runs ? `${e.runs} ${e.runs === 1 ? "run" : "runs"}` : e.runs === 0 ? "No runs yet" : "";
	return {
		name: e.name,
		km: e.km == null ? "—" : `${t(e.km)} / ${t(e.limit)} km`,
		frac: e.km == null ? 0 : Ii(e.km / e.limit),
		state: n,
		label: {
			soon: "Replace soon",
			replace: "Replace"
		}[n] ?? null,
		detail: [i, r && `last run ${r.getDate()} ${Zi[r.getMonth()]}`].filter(Boolean).join(" · ")
	};
}
var ca = {
	runs: [
		0,
		7,
		1
	],
	workouts: [
		0,
		7,
		1
	],
	active_days: [
		0,
		7,
		1
	],
	steps: [
		2e3,
		3e4,
		1e3
	],
	together: [
		1,
		3,
		1
	],
	team: [
		1,
		42,
		1
	]
}, la = [
	"runs",
	"workouts",
	"active_days",
	"steps"
], ua = {
	runs: 0,
	workouts: 0,
	active_days: 0,
	steps: 1e4
};
function da(e, t) {
	let [n, r, i] = ca[e];
	return Math.min(r, Math.max(n, Math.round(t / i) * i));
}
function fa(e, t) {
	let n = e.current, r = (t) => n?.people?.[t] ?? e.defaults?.[t] ?? {};
	return {
		people: Object.fromEntries(Object.keys(t).map((e) => {
			let t = r(e);
			return [e, Object.fromEntries(la.map((e) => [e, da(e, t[e] ?? ua[e])]))];
		})),
		couple: {
			mode: "own",
			together: 1,
			team: 8,
			reward: "",
			...n?.couple
		}
	};
}
function pa(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return t.setUTCDate(t.getUTCDate() + 3 - (t.getUTCDay() + 6) % 7), Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5 + 1) / 7);
}
var ma = (e, t) => la.every((n) => (n === "workouts" ? zi(t) : t[n]) === e[n]), ha = (e, t, n) => n - e.at > 6e5 || Object.entries(e.entry.people).every(([e, n]) => !t[e] || ma(n, t[e].week.goal));
function ga(e, t) {
	if (!t) return e;
	let n = { ...e };
	for (let [r, i] of Object.entries(t.people)) {
		let t = e[r];
		t && (n[r] = {
			...t,
			week: {
				...t.week,
				goal: {
					...t.week.goal,
					...i
				},
				goal_pending: !0
			}
		});
	}
	return n;
}
// src/lib/actions.svelte.js
var _a = 5e3, va = Zt({}), ya = Zt({
	on: !1,
	text: "",
	undo: null
}), ba = Zt({
	entry: null,
	at: 0
}), xa, Sa = 0, Ca = {};
function wa(e, t = null) {
	clearTimeout(xa), Object.assign(ya, {
		on: !0,
		text: e,
		undo: t
	}), xa = setTimeout(() => ya.on = !1, _a);
}
function Ta(e, t = Date.now()) {
	for (let [n, r] of Object.entries(va)) aa(r, e[r.person]?.feed ?? [], t) && delete va[n];
	ba.entry && ha(ba, e, t) && (ba.entry = null);
}
async function Ea(e, t) {
	try {
		await n("POST", "settings", e);
	} catch (e) {
		return wa(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(ba, {
		entry: e,
		at: Date.now()
	}), Ta(t), wa("Saved · updates within 5 min"), !0;
}
async function Da(e, t, r) {
	let i = `${e}/${t}`, a = va[i], o = ++Sa, s = t.startsWith("manual:");
	va[i] = {
		person: e,
		key: t,
		want: s && r === "remove" ? null : r === "remove",
		at: Date.now(),
		n: o
	}, r === "remove" && !s && wa("Removed", () => Da(e, t, "restore"));
	try {
		await oa(Ca, i, () => n("POST", "workouts", {
			person: e,
			key: t,
			action: r
		}));
	} catch (e) {
		va[i]?.n === o && (a ? va[i] = a : delete va[i]), wa(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
// src/lib/ui/Badges.svelte
var Oa = /* @__PURE__ */ J("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), ka = /* @__PURE__ */ J("<ul class=\"svelte-m8wnum\"></ul>"), Aa = /* @__PURE__ */ J("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), ja = /* @__PURE__ */ J("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), Ma = /* @__PURE__ */ J("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function Na(e, t) {
	M(t, !0);
	let n = {
		run: "🏃",
		"run-fast": "🏃",
		"map-marker-distance": "📍",
		ruler: "📏",
		"calendar-check": "📅",
		dumbbell: "🏋️",
		"weight-lifter": "🏋️",
		trophy: "🏆",
		"trophy-award": "🏆",
		target: "🎯",
		fire: "🔥",
		"star-circle": "⭐",
		beach: "🏖️",
		"weather-sunset-up": "🌅",
		"weather-night": "🌙",
		"account-multiple": "👥",
		medal: "🏅",
		yoga: "🧘",
		"shoe-print": "👟"
	}, r = (e) => n[String(e.icon).replace(/^mdi:/, "")] ?? "🏅", i = (e) => e.toLocaleString(void 0, { maximumFractionDigits: 1 });
	var a = Ma(), o = z(a), s = (e) => {
		var n = ka();
		Q(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = Oa(), i = z(n), a = V(i, !0), o = H(i, 2), s = V(o, !0), c = V(H(o, 2), !0);
			A(n), U((e, n) => {
				X(a, e), X(s, K(t).title), X(c, n);
			}, [() => r(K(t)), () => ia(K(t).unlocked_at)]), Y(e, n);
		}), A(n), Y(e, n);
	};
	Z(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = H(o, 2), l = (e) => {
		var n = ka();
		Q(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = Aa(), a = z(n), o = V(a, !0), s = H(a, 2), c = V(s, !0), l = H(s, 2), u = V(l), d = H(l, 2), f = z(d);
			let p;
			A(d), A(n), U((e, n, r, i) => {
				X(o, e), X(c, K(t).title), X(u, `${n ?? ""} of ${r ?? ""}`), p = ui(f, "", p, { width: i });
			}, [
				() => r(K(t)),
				() => i(K(t).current),
				() => i(K(t).target),
				() => `${Math.min(1, K(t).current / K(t).target) * 100}%`
			]), Y(e, n);
		}), A(n), Y(e, n);
	};
	Z(c, (e) => {
		t.badges.next.length && e(l);
	});
	var u = H(c, 2), d = (e) => {
		Y(e, ja());
	};
	Z(u, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(d);
	}), A(a), Y(e, a), N();
}
// src/lib/media.svelte.js
var Pa = Zt({
	wide: !1,
	reducedMotion: !1
}), Fa = matchMedia("(min-width: 768px)"), Ia = matchMedia("(prefers-reduced-motion: reduce)"), La = () => {
	Pa.wide = Fa.matches, Pa.reducedMotion = Ia.matches;
};
Fa.addEventListener("change", La), Ia.addEventListener("change", La), La();
// src/lib/motion.js
function Ra(e, { onFrame: t, onSettle: n, snap: r = {
	distance: .5,
	speed: .5
}, frame: i = requestAnimationFrame, cancel: a = cancelAnimationFrame, now: o = performance.now.bind(performance) }) {
	let s = null, c = 0, l = () => {
		c++, s !== null && a(s), s = null;
	};
	return {
		get running() {
			return s !== null;
		},
		stop: l,
		to(a, u) {
			l(), e.set(a, { velocity: u });
			let d = c, f = 0, p = (a = o()) => {
				s = null;
				let l = e.step(Math.min((a - (f || a - 16)) / 1e3, .05));
				f = a, !l && Math.abs(e.value - e.target) < r.distance && Math.abs(e.velocity) < r.speed && (Object.assign(e, {
					value: e.target,
					velocity: 0
				}), l = !0), t(e.value), d === c && (l ? n?.() : s = i(p));
			};
			s = i(p);
		}
	};
}
var za = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), Ba = (e) => za(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function Va({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
	let r = (2 * Math.PI / t) ** 2, i = 4 * Math.PI * n / t, a = {
		value: e,
		velocity: 0,
		target: e,
		set(e, { velocity: t } = {}) {
			a.target = e, t != null && (a.velocity = t);
		},
		step(e) {
			for (let t = e; t > 0;) {
				let e = Math.min(t, .004);
				a.velocity += (-r * (a.value - a.target) - i * a.velocity) * e, a.value += a.velocity * e, t -= e;
			}
			return Math.abs(a.value - a.target) < .5 && Math.abs(a.velocity) < .5 && (a.value = a.target, a.velocity = 0, !0);
		}
	};
	return a;
}
// src/lib/ui/FeedRow.svelte
var Ha = /* @__PURE__ */ J("<span class=\"mini svelte-69s4be\"> </span>"), Ua = /* @__PURE__ */ J("<span class=\"mini svelte-69s4be\">Together</span>"), Wa = /* @__PURE__ */ J("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), Ga = /* @__PURE__ */ J("<div><dt class=\"svelte-69s4be\"> </dt><dd class=\"svelte-69s4be\"> </dd></div>"), Ka = /* @__PURE__ */ J("<dl class=\"svelte-69s4be\"></dl>"), qa = /* @__PURE__ */ J("<a class=\"btn link svelte-69s4be\" target=\"_blank\" rel=\"noopener noreferrer\">Open in Endurain</a>"), Ja = /* @__PURE__ */ J("<span class=\"ask svelte-69s4be\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-69s4be\">Delete</button>", 1), Ya = /* @__PURE__ */ J("<button type=\"button\"> </button>"), Xa = /* @__PURE__ */ J("<div><div class=\"inner svelte-69s4be\"><!> <div class=\"acts svelte-69s4be\"><!> <!></div></div></div>"), Za = /* @__PURE__ */ J("<li><button type=\"button\" class=\"head svelte-69s4be\"><span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span></button> <!></li>");
function Qa(e, t) {
	let n = Pr();
	M(t, !0);
	let r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, i = /* @__PURE__ */ F(() => va[`${t.person}/${t.item.key}`]), a = /* @__PURE__ */ F(() => ta(K(i) && K(i).want !== null ? {
		...t.item,
		excluded: K(i).want
	} : t.item)), o = /* @__PURE__ */ F(() => [
		["Distance", K(a).detail.km],
		["Pace", K(a).detail.pace],
		["Avg heart rate", K(a).detail.hr],
		["Plan session", K(a).detail.plan]
	].filter(([, e]) => e)), s = /* @__PURE__ */ F(() => K(i)?.want === null), c = /* @__PURE__ */ F(() => K(o).length > 0 || !!K(a).detail.url || t.canEdit && !!K(a).removable), l = /* @__PURE__ */ L(!1), u = /* @__PURE__ */ L(!1), d = /* @__PURE__ */ L(void 0), f = /* @__PURE__ */ L(void 0), p = Va({
		response: .35,
		damping: 1
	}), m = Ra(p, {
		onFrame: (e) => K(d).style.height = `${e}px`,
		onSettle: () => K(l) && (K(d).style.height = "auto")
	});
	bn(() => m.stop);
	function h() {
		K(c) && (R(l, !K(l)), R(u, !1), Pa.reducedMotion ? K(d).style.height = K(l) ? "auto" : "0px" : (m.running || (p.value = K(d).offsetHeight), m.to(K(l) ? K(f).offsetHeight : 0)));
	}
	let g = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function _() {
		K(a).removable === "delete" ? R(u, !0) : Da(t.person, t.item.key, K(a).removable);
	}
	var v = Za();
	let b;
	var x = z(v), S = z(x), C = V(S, !0), w = H(S, 2), T = z(w), E = z(T), ee = H(E), te = (e) => {
		var n = Ha(), r = V(n, !0);
		U(() => X(r, t.item.plan)), Y(e, n);
	};
	Z(ee, (e) => {
		t.item.plan && e(te);
	});
	var ne = H(ee, 2), re = (e) => {
		Y(e, Ua());
	};
	Z(ne, (e) => {
		t.item.joint && e(re);
	}), A(T);
	var ie = V(H(T, 2));
	A(w);
	var ae = H(w, 2), oe = z(ae), se = (e) => {
		Y(e, Wa());
	};
	Z(oe, (e) => {
		K(i) && e(se);
	});
	var ce = H(oe);
	A(ae), A(x);
	var le = H(x, 2), ue = (e) => {
		var r = Xa();
		let i;
		var c = z(r), p = z(c), m = (e) => {
			var t = Ka();
			Q(t, 21, () => K(o), ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ F(() => y(K(t), 2));
				let r = () => K(n)[0], i = () => K(n)[1];
				var a = Ga(), o = z(a), s = V(o, !0), c = V(H(o), !0);
				A(a), U(() => {
					X(s, r()), X(c, i());
				}), Y(e, a);
			}), A(t), Y(e, t);
		};
		Z(p, (e) => {
			K(o).length && e(m);
		});
		var v = H(p, 2), b = z(v), x = (e) => {
			var t = qa();
			U(() => $(t, "href", K(a).detail.url)), Y(e, t);
		};
		Z(b, (e) => {
			K(a).detail.url && e(x);
		});
		var S = H(b, 2), C = (e) => {
			var n = Nr(), r = B(n), i = (e) => {
				var n = Ja(), r = H(B(n), 2), i = H(r, 2);
				q("click", r, () => R(u, !1)), q("click", i, () => (h(), Da(t.person, t.item.key, "remove"))), Y(e, n);
			}, o = (e) => {
				var t = Ya();
				let n;
				var r = V(t, !0);
				U(() => {
					n = ci(t, 1, "btn svelte-69s4be", null, n, { danger: K(a).removable !== "restore" }), X(r, g[K(a).removable]);
				}), q("click", t, _), Y(e, t);
			};
			Z(r, (e) => {
				K(u) ? e(i) : e(o, -1);
			}), Y(e, n);
		};
		Z(S, (e) => {
			t.canEdit && !K(s) && K(a).removable && e(C);
		}), A(v), A(c), Di(c, (e) => R(f, e), () => K(f)), A(r), Di(r, (e) => R(d, e), () => K(d)), U(() => {
			i = ci(r, 1, "more svelte-69s4be", null, i, { open: K(l) }), $(r, "id", `${n}-more`), r.inert = !K(l);
		}), Y(e, r);
	};
	Z(le, (e) => {
		K(c) && e(ue);
	}), A(v), U(() => {
		b = ci(v, 1, "svelte-69s4be", null, b, { dim: K(a).removable === "restore" || K(s) }), $(x, "aria-expanded", K(c) ? K(l) : void 0), $(x, "aria-controls", K(c) ? `${n}-more` : void 0), ci(S, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), X(C, r[t.item.kind] ?? "💪"), X(E, `${K(a).title ?? ""} `), X(ie, `${K(a).when ?? ""} · ${K(a).duration ?? ""}`), X(ce, ` ${(K(a).removable === "restore" ? "Removed" : K(a).xp && `${K(a).xp} XP`) ?? ""}`);
	}), q("click", x, h), Y(e, v), N();
}
Cr(["click"]);
// src/lib/ui/Feed.svelte
var $a = /* @__PURE__ */ J("<ul class=\"card svelte-n1344i\"></ul>"), eo = /* @__PURE__ */ J("<p class=\"caption empty svelte-n1344i\">No workouts in the last 30 days.</p>");
function to(e, t) {
	M(t, !0);
	var n = Nr(), r = B(n), i = (e) => {
		var n = $a();
		Q(n, 21, () => t.items, (e) => e.key, (e, n) => {
			Qa(e, {
				get person() {
					return t.person;
				},
				get item() {
					return K(n);
				},
				get canEdit() {
					return t.canEdit;
				}
			});
		}), A(n), Y(e, n);
	}, a = (e) => {
		Y(e, eo());
	};
	Z(r, (e) => {
		t.items.length ? e(i) : e(a, -1);
	}), Y(e, n), N();
}
// src/lib/ui/PlanBar.svelte
var no = /* @__PURE__ */ J("<span> </span>"), ro = /* @__PURE__ */ J("<i class=\"svelte-1y5m0aq\"></i>"), io = /* @__PURE__ */ J("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), ao = /* @__PURE__ */ J("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!></div>");
function oo(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => na(t.plan)), r = /* @__PURE__ */ F(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0)) / 60));
	var i = ao(), a = z(i), o = z(a), s = V(o, !0), c = H(o, 2), l = (e) => {
		var n = no();
		let r;
		var i = V(n, !0);
		U(() => {
			r = ci(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), X(i, t.plan.due_today ? "Due today" : "Rest day");
		}), Y(e, n);
	};
	Z(c, (e) => {
		K(n).length && e(l);
	}), A(a);
	var u = H(a, 2), d = (e) => {
		var t = io(), i = B(t);
		Q(i, 21, () => K(n), Wr, (e, t) => {
			var n = ro();
			let r;
			U(() => r = ui(n, "", r, {
				"flex-grow": K(t).frac,
				background: `var(--${K(t).kind === "run" ? "run" : "fill"})`
			})), Y(e, n);
		}), A(i);
		var a = H(i, 2), o = z(a), s = z(o);
		ui(s, "", {}, { background: "var(--run)" }), ui(H(s, 2), "", {}, { background: "var(--fill)" }), Ee(), A(o);
		var c = V(H(o, 2));
		A(a), U(() => {
			$(i, "aria-label", `Run and walk intervals, ${K(r) ?? ""} minutes in total`), X(c, `${K(r) ?? ""} min`);
		}), Y(e, t);
	};
	Z(u, (e) => {
		K(n).length && e(d);
	}), A(i), U(() => X(s, t.plan.state)), Y(e, i), N();
}
// src/lib/ui/Records.svelte
var so = /* @__PURE__ */ J("<div class=\"svelte-70kwy0\"><dt class=\"svelte-70kwy0\"> </dt><dd class=\"svelte-70kwy0\"> </dd></div>"), co = /* @__PURE__ */ J("<dl class=\"card svelte-70kwy0\"></dl>");
function lo(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => [
		["Longest session", `${t.pbs.longest_session_km.toFixed(1)} km`],
		["Gym PRs", t.pbs.prs.toLocaleString()],
		["Total lifted", `${t.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 })} t`]
	]);
	var r = co();
	Q(r, 21, () => K(n), ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ F(() => y(K(t), 2));
		let r = () => K(n)[0], i = () => K(n)[1];
		var a = so(), o = z(a), s = V(o, !0), c = V(H(o), !0);
		A(a), U(() => {
			X(s, r()), X(c, i());
		}), Y(e, a);
	}), A(r), Y(e, r), N();
}
// src/lib/ui/Shoes.svelte
var uo = /* @__PURE__ */ J("<span class=\"label svelte-eu7fja\"> </span>"), fo = /* @__PURE__ */ J("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), po = /* @__PURE__ */ J("<ul class=\"card svelte-eu7fja\"></ul>");
function mo(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => t.shoes.map(sa));
	var r = po();
	Q(r, 23, () => K(n), (e, n) => t.shoes[n].entity_id, (e, t) => {
		var n = fo(), r = z(n), i = z(r), a = V(i, !0), o = V(H(i), !0);
		A(r);
		var s = H(r, 2), c = z(s);
		let l;
		A(s);
		var u = H(s, 2), d = z(u), f = V(d, !0), p = H(d, 2), m = (e) => {
			var n = uo(), r = V(n, !0);
			U(() => X(r, K(t).label)), Y(e, n);
		};
		Z(p, (e) => {
			K(t).label && e(m);
		}), A(u), A(n), U(() => {
			ci(n, 1, ni(K(t).state), "svelte-eu7fja"), X(a, K(t).name), X(o, K(t).km), l = ui(c, "", l, { width: `${K(t).frac * 100}%` }), X(f, K(t).detail);
		}), Y(e, n);
	}), A(r), Y(e, r), N();
}
// src/lib/ui/Details.svelte
var ho = /* @__PURE__ */ J("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), go = /* @__PURE__ */ J("<section><h2 class=\"svelte-1341oik\">Shoes</h2> <!></section>"), _o = /* @__PURE__ */ J("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Records</h2> <!></section> <!>", 1);
function vo(e, t) {
	let n = Pr();
	M(t, !0);
	var r = _o(), i = B(r), a = (e) => {
		var r = ho(), i = z(r);
		oo(H(i, 2), { get plan() {
			return t.person.plan;
		} }), A(r), U(() => {
			$(r, "aria-labelledby", `${n}-plan`), $(i, "id", `${n}-plan`);
		}), Y(e, r);
	};
	Z(i, (e) => {
		t.person.plan && e(a);
	});
	var o = H(i, 2), s = z(o);
	to(H(s, 2), {
		get person() {
			return t.id;
		},
		get items() {
			return t.person.feed;
		},
		get canEdit() {
			return t.canEdit;
		}
	}), A(o);
	var c = H(o, 2), l = z(c), u = V(H(z(l)));
	A(l), Na(H(l, 2), { get badges() {
		return t.person.badges;
	} }), A(c);
	var d = H(c, 2), f = z(d);
	lo(H(f, 2), { get pbs() {
		return t.person.pbs;
	} }), A(d);
	var p = H(d, 2), m = (e) => {
		var r = go(), i = z(r);
		mo(H(i, 2), { get shoes() {
			return t.person.shoes;
		} }), A(r), U(() => {
			$(r, "aria-labelledby", `${n}-shoes`), $(i, "id", `${n}-shoes`);
		}), Y(e, r);
	};
	Z(p, (e) => {
		t.person.shoes?.length && e(m);
	}), U(() => {
		$(o, "aria-labelledby", `${n}-feed`), $(s, "id", `${n}-feed`), $(c, "aria-labelledby", `${n}-badges`), $(l, "id", `${n}-badges`), X(u, `${t.person.badges.count ?? ""} unlocked`), $(d, "aria-labelledby", `${n}-pbs`), $(f, "id", `${n}-pbs`);
	}), Y(e, r), N();
}
// src/lib/ui/Goals.svelte
var yo = /* @__PURE__ */ J("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), bo = /* @__PURE__ */ J("<p class=\"msg\" role=\"status\"> </p>"), xo = /* @__PURE__ */ J("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!></section>"), So = /* @__PURE__ */ J("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), Co = /* @__PURE__ */ J("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), wo = /* @__PURE__ */ J("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), To = /* @__PURE__ */ J("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function Eo(e, t) {
	let n = Pr();
	M(t, !0);
	let i = [], a = (e, n = h, r = h, i = h) => {
		let a = /* @__PURE__ */ F(() => {
			let [e, t, n] = ca[r()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var o = yo(), s = z(o), c = V(s, !0), l = H(s, 2), u = H(l, 2), d = V(u, !0), f = H(u, 2);
		A(o), U((e, s, u, p) => {
			$(o, "aria-label", i()), X(c, e), $(l, "aria-label", `Fewer ${s ?? ""}`), l.disabled = t.readOnly || n()[r()] <= K(a).lo, X(d, u), $(f, "aria-label", `More ${p ?? ""}`), f.disabled = t.readOnly || n()[r()] >= K(a).hi;
		}, [
			() => i().split(",")[0],
			() => p(i()),
			() => m(r(), n()[r()]),
			() => p(i())
		]), q("click", l, () => n()[r()] = da(r(), n()[r()] - K(a).step)), q("click", f, () => n()[r()] = da(r(), n()[r()] + K(a).step)), Y(e, o);
	}, o = /* @__PURE__ */ L(null), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L(!1);
	Pi(() => {
		r("settings").then((e) => {
			R(o, e, !0), R(c, fa(e, t.people), !0);
		}, (e) => R(s, e, !0));
	});
	let u = {
		runs: "Runs per week",
		workouts: "Workouts per week",
		active_days: "Active days per week",
		steps: "Steps for an active day"
	}, d = [
		{
			mode: "own",
			label: "Own",
			hint: "Met when you both make your own goals."
		},
		{
			mode: "together",
			label: "Together",
			hint: "Your own goals, plus workouts done together."
		},
		{
			mode: "team",
			label: "Team",
			hint: "Your runs, workouts and active days added up."
		}
	], f = {
		together: "Workouts together per week",
		team: "Team points per week"
	}, p = (e) => e[0].toLowerCase() + e.slice(1), m = (e, t) => e === "steps" ? t.toLocaleString("en-US") : String(t);
	async function g() {
		R(l, !0);
		let e = await Ea(qe(K(c)), t.people);
		R(l, !1), e && t.onsaved();
	}
	var _ = To(), v = H(B(_), 2), y = (e) => {
		var t = bo(), n = V(t, !0);
		U(() => X(n, K(s) ? K(s).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), Y(e, t);
	}, b = (e) => {
		var r = wo(), s = B(r), p = V(s), m = H(s, 2);
		Q(m, 16, () => Object.keys(K(c).people), (e) => e, (e, r) => {
			let i = /* @__PURE__ */ F(() => t.people[r]?.name ?? r);
			var o = xo(), s = z(o), l = V(s, !0);
			Q(H(s, 2), 16, () => la, (e) => e, (e, t) => {
				a(e, () => K(c).people[r], () => t, () => `${u[t]}, ${K(i)}`);
			}), A(o), U(() => {
				$(o, "aria-labelledby", `${n}-${r ?? ""}`), $(s, "id", `${n}-${r ?? ""}`), X(l, K(i));
			}), Y(e, o);
		});
		var h = H(m, 2), _ = z(h), v = H(_, 2);
		Q(v, 21, () => d, (e) => e.mode, (e, r) => {
			var a = So();
			let o;
			var s = z(a);
			mi(s);
			var l, u = H(s, 1, !0);
			A(a), U(() => {
				o = ci(a, 1, "svelte-7wncvy", null, o, { on: K(c).couple.mode === K(r).mode }), $(s, "name", `${n}-mode`), s.disabled = t.readOnly, l !== (l = K(r).mode) && (s.value = (s.__value = l) ?? ""), X(u, K(r).label);
			}), bi(i, [], s, () => (K(r).mode, K(c).couple.mode), (e) => K(c).couple.mode = e), Y(e, a);
		}), A(v);
		var y = H(v, 2), b = V(y, !0), x = H(y, 2), S = (e) => {
			a(e, () => K(c).couple, () => K(c).couple.mode, () => f[K(c).couple.mode]);
		};
		Z(x, (e) => {
			f[K(c).couple.mode] && e(S);
		});
		var C = H(x, 2), w = H(z(C), 2);
		mi(w), A(C), A(h);
		var T = H(h, 2), E = (e) => {
			var t = Co();
			U(() => t.disabled = K(l)), q("click", t, g), Y(e, t);
		};
		Z(T, (e) => {
			t.readOnly || e(E);
		}), U((e, r) => {
			X(p, `Applies from this week (week ${e ?? ""})`), $(h, "aria-labelledby", `${n}-couple`), $(_, "id", `${n}-couple`), $(v, "aria-labelledby", `${n}-couple`), X(b, r), w.disabled = t.readOnly;
		}, [() => pa(K(o).week_start), () => d.find((e) => e.mode === K(c).couple.mode).hint]), vi(w, () => K(c).couple.reward, (e) => K(c).couple.reward = e), Y(e, r);
	};
	Z(v, (e) => {
		K(c) ? e(b, -1) : e(y);
	}), Y(e, _), N();
}
Cr(["click"]);
// src/lib/ui/Header.svelte
var Do = /* @__PURE__ */ J("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), Oo = /* @__PURE__ */ J("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), ko = /* @__PURE__ */ J("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function Ao(e, t) {
	let n = Ni(t, "subtitle", 3, ""), r = Ni(t, "actionLabel", 3, ""), i = /* @__PURE__ */ L(0);
	var a = ko();
	let o;
	var s = z(a), c = z(s), l = (e) => {
		var n = Do();
		q("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), Y(e, n);
	};
	Z(c, (e) => {
		t.onback && e(l);
	});
	var u = H(c, 2), d = z(u), f = V(d, !0), p = H(d, 2), m = (e) => {
		var n = Oo(), i = V(n, !0);
		U(() => X(i, r())), q("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), Y(e, n);
	};
	Z(p, (e) => {
		t.onaction && e(m);
	}), A(u);
	var h = V(H(u, 2), !0);
	A(s), A(a), U(() => {
		o = ci(a, 1, "svelte-16l0jix", null, o, { scrolled: K(i) > 0 }), X(f, t.title), X(h, n() || "\xA0");
	}), Oi("y", () => K(i), (e) => R(i, e, !0)), Y(e, a);
}
Cr(["click"]);
// src/lib/ui/Rings.svelte
var jo = /* @__PURE__ */ Mr("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Mo = /* @__PURE__ */ Mr("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function No(e, t) {
	M(t, !0);
	let n = Ni(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, a = /* @__PURE__ */ L(Zt(Pa.reducedMotion ? i : 0)), o = /* @__PURE__ */ F(() => n() * .11), s = /* @__PURE__ */ F(() => t.fractions.map((e, t) => {
		let s = n() / 2 - K(o) / 2 - t * K(o) * 1.3, c = 2 * Math.PI * s;
		return {
			kind: r[t],
			r: s,
			c,
			len: c * e * K(a) / i
		};
	}));
	Pi(() => {
		if (K(a) === i) return;
		let e = Ra(Va({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => R(a, e, !0) });
		return e.to(i), e.stop;
	});
	var c = Mo();
	let l;
	Q(c, 21, () => K(s), (e) => e.kind, (e, t) => {
		var r = jo(), i = B(r);
		let a;
		var s = H(i);
		let c;
		U(() => {
			$(i, "cx", n() / 2), $(i, "cy", n() / 2), $(i, "r", K(t).r), $(i, "stroke-width", K(o)), a = ui(i, "", a, { stroke: `var(--${K(t).kind ?? ""})` }), $(s, "cx", n() / 2), $(s, "cy", n() / 2), $(s, "r", K(t).r), $(s, "stroke-width", K(o)), $(s, "stroke-dasharray", `${K(t).len ?? ""} ${K(t).c ?? ""}`), $(s, "opacity", +(K(t).len > .01)), $(s, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = ui(s, "", c, { stroke: `var(--${K(t).kind ?? ""})` });
		}), Y(e, r);
	}), A(c), U(() => {
		$(c, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), l = ui(c, "", l, { width: `${n() / 16}rem` });
	}), Y(e, c), N();
}
// src/lib/ui/PersonTile.svelte
var Po = /* @__PURE__ */ J("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Fo = /* @__PURE__ */ J("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), Io = /* @__PURE__ */ J("<span class=\"streak svelte-1handop\"> </span>"), Lo = /* @__PURE__ */ J("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), Ro = /* @__PURE__ */ J("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), zo = /* @__PURE__ */ J("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), Bo = /* @__PURE__ */ J("<span class=\"steps svelte-1handop\"> </span>"), Vo = /* @__PURE__ */ J("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), Ho = /* @__PURE__ */ J("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), Uo = /* @__PURE__ */ J("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function Wo(e, t) {
	M(t, !0);
	let n = Ni(t, "index", 3, 0), r = Ni(t, "compact", 3, !1), i = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], a = /* @__PURE__ */ F(() => i[n() % i.length]), o = /* @__PURE__ */ F(() => y(K(a), 2)), s = /* @__PURE__ */ F(() => K(o)[0]), c = /* @__PURE__ */ F(() => K(o)[1]), l = /* @__PURE__ */ F(() => qi(t.person)), u = /* @__PURE__ */ F(() => t.person.week), d = [
		{
			kind: "run",
			label: "Runs"
		},
		{
			kind: "gym",
			label: "Workouts"
		},
		{
			kind: "bonus",
			label: "Active days"
		}
	], f = /* @__PURE__ */ F(() => d.map((e, t) => ({
		...e,
		n: Vi(K(u))[t],
		of: Bi(K(u))[t]
	}))), p = /* @__PURE__ */ F(() => Wi(t.person.steps_today, K(u).goal.steps)), m = /* @__PURE__ */ F(() => [
		`Level ${K(l).level}`,
		r() ? `🔥 ${t.person.streak} wk` : `${t.person.xp.toLocaleString()} XP`,
		K(u).paused && "Week paused",
		K(u).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), h = /* @__PURE__ */ F(() => `${t.person.name}, level ${K(l).level}. This week ${K(f).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${K(u).goal_pending ? "New goals pending. " : ""}${K(u).bonus ? "Weekly bonus earned. " : ""}${K(p) ? K(p).replace("👟 ", "") + ". " : ""}Streak ${t.person.streak} weeks.`);
	var g = Uo();
	let _;
	var v = z(g), b = z(v), x = z(b);
	let S;
	var C = V(x, !0), w = H(x, 2), T = z(w), E = V(T, !0), ee = V(H(T, 2), !0);
	A(w);
	var te = H(w, 2), ne = (e) => {
		var t = Fo(), n = B(t), r = z(n);
		{
			let e = /* @__PURE__ */ F(() => Hi(K(u)));
			No(r, {
				get fractions() {
					return K(e);
				},
				size: 44
			});
		}
		var i = H(r, 2), a = (e) => {
			Y(e, Po());
		};
		Z(i, (e) => {
			K(u).bonus && e(a);
		}), A(n);
		var o = V(H(n, 2), !0);
		U(() => X(o, K(h))), Y(e, t);
	}, re = (e) => {
		var n = Io(), r = V(n);
		U(() => X(r, `🔥 ${t.person.streak ?? ""} wk`)), Y(e, n);
	};
	Z(te, (e) => {
		r() ? e(ne) : e(re, -1);
	});
	var ie = H(te, 2), ae = (e) => {
		Y(e, Lo());
	};
	Z(ie, (e) => {
		t.onopen && e(ae);
	}), A(b);
	var oe = H(b, 2), se = (e) => {
		var t = Vo(), n = B(t), r = z(n), i = z(r);
		{
			let e = /* @__PURE__ */ F(() => Hi(K(u))), t = /* @__PURE__ */ F(() => Pa.wide ? 112 : 88);
			No(i, {
				get fractions() {
					return K(e);
				},
				get size() {
					return K(t);
				}
			});
		}
		var a = H(i, 2), o = (e) => {
			Y(e, Ro());
		};
		Z(a, (e) => {
			K(u).bonus && e(o);
		}), A(r);
		var s = H(r, 2);
		Q(s, 21, () => K(f), (e) => e.kind, (e, t) => {
			var n = zo(), r = z(n), i = z(r);
			let a;
			var o = H(i, 1, !0);
			A(r);
			var s = H(r, 2), c = z(s, !0), l = V(H(c));
			A(s), A(n), U(() => {
				a = ui(i, "", a, { background: `var(--${K(t).kind ?? ""})` }), X(o, K(t).label), X(c, K(t).n), X(l, `/${K(t).of ?? ""}`);
			}), Y(e, n);
		}), A(s), A(n);
		var c = H(n, 2), d = (e) => {
			var t = Bo(), n = V(t, !0);
			U(() => X(n, K(p))), Y(e, t);
		};
		Z(c, (e) => {
			K(p) && e(d);
		});
		var m = H(c, 2), h = z(m), g = z(h);
		let _;
		A(h);
		var v = V(H(h, 2));
		A(m), U((e, t) => {
			_ = ui(g, "", _, { width: `${K(l).frac * 100}%` }), X(v, `${e ?? ""} of ${t ?? ""} XP to level ${K(l).level + 1}`);
		}, [() => K(l).into.toLocaleString(), () => K(l).span.toLocaleString()]), Y(e, t);
	};
	Z(oe, (e) => {
		r() || e(se);
	}), A(v);
	var ce = H(v, 2), le = (e) => {
		var n = Ho();
		U(() => $(n, "aria-label", K(h))), q("click", n, function(...e) {
			t.onopen?.apply(this, e);
		}), Y(e, n);
	};
	Z(ce, (e) => {
		t.onopen && e(le);
	}), A(g), U((e) => {
		_ = ci(g, 1, "tile glass svelte-1handop", null, _, {
			compact: r(),
			opens: t.onopen
		}), $(v, "aria-hidden", t.onopen ? "true" : void 0), S = ui(x, "", S, {
			"--a1": K(s),
			"--a2": K(c)
		}), X(C, e), X(E, t.person.name), X(ee, K(m));
	}, [() => t.person.name.slice(0, 1)]), Y(e, g), N();
}
Cr(["click"]);
// src/lib/gesture.js
var Go = (e, t = .998) => e / 1e3 * t / (1 - t), Ko = (e, t, n) => e + Go(t) > n / 2;
function qo(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var Jo = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), Yo = /* @__PURE__ */ J("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), Xo = /* @__PURE__ */ J("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function Zo(e, t) {
	M(t, !0);
	let n = Ni(t, "from", 3, null), r = 1e3, i = Pa.reducedMotion, a = /* @__PURE__ */ L(Zt(i ? r : 0)), o = /* @__PURE__ */ L(0), s = /* @__PURE__ */ L(1), c = /* @__PURE__ */ L(!1), l = /* @__PURE__ */ L("50% 100%"), u, d, f = !1, p = null, m = /* @__PURE__ */ F(() => i ? +K(c) : Math.min(1, K(a) / 500)), h = /* @__PURE__ */ F(() => i ? 1 : .5 + .5 * K(a) / r), g = () => {
		f && (K(a) === 0 || K(o) >= K(s)) && (f = !1, t.onclose());
	};
	function _(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = Va({
					value: r,
					damping: o,
					response: s
				}), n = Ra(t, {
					onFrame: e,
					onSettle: g
				}), n.to(i, a);
			}
		};
	}
	let v = _((e) => R(a, e, !0)), y = _((e) => R(o, e, !0));
	function b() {
		f || p || (f = !0, i ? (R(c, !1), setTimeout(t.onclose, Ba("--fade"))) : v.to(K(a), 0, { response: .3 }));
	}
	function x(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), v.stop(), y.stop(), f = !1, p = {
			from: K(o),
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		});
	}
	function S(e) {
		if (!p) return;
		let t = p.from + e.clientY - p.start;
		R(o, t < 0 ? -Jo(-t, K(s)) : t, !0), p.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), p.samples.length > 8 && p.samples.shift();
	}
	function C(e) {
		if (!p) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = qo([...p.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		p = null, Ko(K(o), n, K(s)) ? i ? b() : (f = !0, y.to(K(o), K(s), {
			velocity: n,
			response: .3
		})) : i ? R(o, 0) : (y.to(K(o), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), K(a) < r && v.to(K(a), r));
	}
	Pi(() => {
		if (n()) {
			let e = n().getBoundingClientRect();
			R(l, `${e.left + e.width / 2 - u.offsetLeft}px ${e.top + e.height / 2 - u.offsetTop}px`);
		}
		d.focus({ preventScroll: !0 });
		let e = document.documentElement;
		return e.style.overflow = "hidden", i ? requestAnimationFrame(() => R(c, !0)) : v.to(0, r), () => {
			v.stop(), y.stop(), e.style.overflow = "";
		};
	});
	var w = { close: b }, T = Xo();
	Sr("keydown", en, (e) => e.key === "Escape" && b());
	var E = B(T);
	let ee, te;
	var ne = H(E, 2);
	let re, ie;
	var ae = z(ne), oe = H(z(ae), 2), se = z(oe), ce = (e) => {
		var n = Yo();
		q("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), Y(e, n);
	};
	Z(se, (e) => {
		t.onback && e(ce);
	});
	var le = H(se, 2);
	Di(le, (e) => d = e, () => d), A(oe), A(ae);
	var ue = H(ae, 2);
	return $r(z(ue), () => t.children), A(ue), A(ne), Di(ne, (e) => u = e, () => u), U((e) => {
		ee = ci(E, 1, "scrim svelte-185xwm9", null, ee, { fade: i }), te = ui(E, "", te, { opacity: e }), re = ci(ne, 1, "sheet svelte-185xwm9", null, re, { fade: i }), $(ne, "aria-label", t.label), ie = ui(ne, "", ie, {
			opacity: K(m),
			transform: `translate3d(0, ${K(o) ?? ""}px, 0) scale(${K(h) ?? ""})`,
			"transform-origin": K(l)
		});
	}, [() => K(m) * Math.min(1, Math.max(0, 1 - K(o) / K(s)))]), q("click", E, b), q("pointerdown", ae, x), q("pointermove", ae, S), q("pointerup", ae, C), Sr("pointercancel", ae, C), q("click", le, b), Ti(ne, "offsetHeight", (e) => R(s, e)), Y(e, T), N(w);
}
Cr([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var Qo = /* @__PURE__ */ J("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), $o = /* @__PURE__ */ J("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), es = /* @__PURE__ */ J("<p class=\"caption stale svelte-9nj5u4\"> </p>"), ts = /* @__PURE__ */ J("<!> <!> <!>", 1);
function ns(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => t.scoredAt ? Yi(t.scoredAt, t.now) : null);
	var r = ts(), i = B(r), a = (e) => {
		var n = Qo(), r = H(z(n));
		A(n), U(() => X(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), Y(e, n);
	};
	Z(i, (e) => {
		t.configError && e(a);
	});
	var o = H(i, 2), s = (e) => {
		var n = $o(), r = H(z(n));
		A(n), U(() => X(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), Y(e, n);
	};
	Z(o, (e) => {
		t.settingsError && e(s);
	});
	var c = H(o, 2), l = (e) => {
		var t = es(), r = V(t, !0);
		U(() => X(r, K(n))), Y(e, t);
	};
	Z(c, (e) => {
		K(n) && e(l);
	}), Y(e, r), N();
}
// node_modules/svelte/src/internal/flags/legacy.js
Ge();
// src/lib/ui/Toast.svelte
var rs = /* @__PURE__ */ J("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), is = /* @__PURE__ */ J("<span> </span> <!>", 1), as = /* @__PURE__ */ J("<div role=\"status\" aria-live=\"polite\"><!></div>");
function os(e, t) {
	M(t, !1);
	function n() {
		let e = ya.undo;
		Object.assign(ya, {
			on: !1,
			undo: null
		}), e();
	}
	ki();
	var r = as();
	let i;
	var a = z(r), o = (e) => {
		var t = is(), r = B(t), i = V(r, !0), a = H(r, 2), o = (e) => {
			var t = rs();
			q("click", t, n), Y(e, t);
		};
		Z(a, (e) => {
			ya.undo && e(o);
		}), U(() => X(i, ya.text)), Y(e, t);
	};
	Z(a, (e) => {
		ya.on && e(o);
	}), A(r), U(() => i = ci(r, 1, "toast svelte-1fk2ial", null, i, { on: ya.on })), Y(e, r), N();
}
Cr(["click"]);
// src/lib/ui/Together.svelte
var ss = /* @__PURE__ */ J("<p class=\"progress svelte-1tya3no\"> </p>"), cs = /* @__PURE__ */ J("<p> </p>"), ls = /* @__PURE__ */ J("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), us = /* @__PURE__ */ J("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function ds(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => t.group.week ? Gi(t.group.week, t.people) : ""), r = /* @__PURE__ */ F(() => t.group.week ? Ki(t.group.week) : null), i = /* @__PURE__ */ F(() => [
		{
			v: `🔥 ${t.group.streak}`,
			unit: " wk",
			k: "Couple streak"
		},
		{
			v: String(t.group.month_joint),
			unit: "",
			k: "Joint this month"
		},
		{
			v: t.group.km_together.toFixed(1),
			unit: " km",
			k: "Distance"
		}
	]);
	var a = us(), o = H(z(a), 2), s = (e) => {
		var t = ss(), r = V(t, !0);
		U(() => X(r, K(n))), Y(e, t);
	};
	Z(o, (e) => {
		K(n) && e(s);
	});
	var c = H(o, 2), l = (e) => {
		var n = cs();
		let i;
		var a = V(n, !0);
		U(() => {
			i = ci(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), X(a, K(r));
		}), Y(e, n);
	};
	Z(c, (e) => {
		K(r) && e(l);
	});
	var u = H(c, 2);
	Q(u, 21, () => K(i), (e) => e.k, (e, t) => {
		var n = ls(), r = z(n), i = V(r, !0), a = H(r), o = z(a, !0), s = V(H(o), !0);
		A(a), A(n), U(() => {
			X(i, K(t).k), X(o, K(t).v), X(s, K(t).unit);
		}), Y(e, n);
	}), A(u), A(a), Y(e, a), N();
}
// src/App.svelte
var fs = /* @__PURE__ */ J("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), ps = /* @__PURE__ */ J("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), ms = /* @__PURE__ */ J("<div class=\"tiles compact svelte-1n46o8q\"></div>"), hs = /* @__PURE__ */ J("<!> <!>", 1), gs = /* @__PURE__ */ J("<div class=\"tiles svelte-1n46o8q\"></div>"), _s = /* @__PURE__ */ J("<!> <!> <!> <!>", 1), vs = /* @__PURE__ */ J("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function ys(e, t) {
	M(t, !0);
	let n = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), i = new URLSearchParams(n.location.search), a = i.get("person"), o = /^\/(?!\/)/.test(i.get("back") ?? "") ? i.get("back") : null, s = o && (() => {
		n.history.pushState(null, "", o), n.dispatchEvent(new Event("location-changed"));
	}), c = /* @__PURE__ */ L(null), l = (e) => (t) => R(c, {
		id: e,
		from: t.currentTarget
	}, !0), u = /* @__PURE__ */ L(null), d = /* @__PURE__ */ L(void 0);
	async function f() {
		let e = K(c)?.from ?? K(u)?.from;
		R(c, R(u, null), !0), await ur(), e?.focus({ preventScroll: !0 });
	}
	let p = /* @__PURE__ */ L(null), m = /* @__PURE__ */ L(null), h = /* @__PURE__ */ L(Zt(/* @__PURE__ */ new Date())), g;
	async function _() {
		if (clearTimeout(g), !document.hidden) {
			try {
				R(p, await r("scores"), !0), R(m, null), Ta(K(p).people), a && Object.hasOwn(K(p).people, a) && a !== ra(K(p).viewer, K(p).people).self && R(c, {
					id: a,
					from: null
				}, !0), a = null;
			} catch (e) {
				R(m, e, !0);
			}
			R(h, /* @__PURE__ */ new Date(), !0), clearTimeout(g), g = setTimeout(_, K(p) ? 6e4 : 3e4);
		}
	}
	bn(() => {
		_();
		let e = () => document.hidden || _();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(g), document.removeEventListener("visibilitychange", e);
		};
	});
	let v = /* @__PURE__ */ F(() => ga(K(p)?.people ?? {}, ba.entry)), y = /* @__PURE__ */ F(() => Object.keys(K(v))), b = /* @__PURE__ */ F(() => ra(K(p)?.viewer ?? {}, K(v))), x = /* @__PURE__ */ F(() => K(v)[K(b).self ?? K(y)[0]]?.week), S = (e) => !!K(p)?.viewer?.can_edit?.includes(e), C = /* @__PURE__ */ F(() => !!K(c) && Object.hasOwn(K(v), K(c).id) || !!K(u) && !!K(p));
	var w = vs(), T = B(w), E = z(T);
	{
		let e = /* @__PURE__ */ F(() => K(x) ? Ji(K(x)) : ""), t = /* @__PURE__ */ F(() => K(p) ? (e) => R(u, { from: e.currentTarget }, !0) : void 0);
		Ao(E, {
			title: "Training",
			get subtitle() {
				return K(e);
			},
			get onback() {
				return s;
			},
			actionLabel: "Goals",
			get onaction() {
				return K(t);
			}
		});
	}
	var ee = H(E, 2), te = z(ee), ne = (e) => {
		var t = ps(), n = H(B(t), 2), r = (e) => {
			var t = fs(), n = V(t, !0);
			U(() => X(n, K(m).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), Y(e, t);
		};
		Z(n, (e) => {
			K(m) && e(r);
		}), Y(e, t);
	}, re = (e) => {
		var t = _s(), n = B(t);
		ns(n, {
			get scoredAt() {
				return K(p).scored_at;
			},
			get configError() {
				return K(p).config_error;
			},
			get settingsError() {
				return K(p).settings_error;
			},
			get now() {
				return K(h);
			}
		});
		var r = H(n, 2), i = (e) => {
			var t = hs(), n = B(t), r = (e) => {
				var t = ms();
				Q(t, 20, () => K(b).others, (e) => e, (e, t) => {
					{
						let n = /* @__PURE__ */ F(() => K(y).indexOf(t)), r = /* @__PURE__ */ F(() => l(t));
						Wo(e, {
							get person() {
								return K(v)[t];
							},
							get index() {
								return K(n);
							},
							compact: !0,
							get onopen() {
								return K(r);
							}
						});
					}
				}), A(t), Y(e, t);
			};
			Z(n, (e) => {
				K(b).others.length && e(r);
			});
			var i = H(n, 2);
			{
				let e = /* @__PURE__ */ F(() => K(y).indexOf(K(b).self));
				Wo(i, {
					get person() {
						return K(v)[K(b).self];
					},
					get index() {
						return K(e);
					}
				});
			}
			Y(e, t);
		}, a = (e) => {
			var t = gs();
			Q(t, 20, () => K(b).others, (e) => e, (e, t) => {
				{
					let n = /* @__PURE__ */ F(() => K(y).indexOf(t)), r = /* @__PURE__ */ F(() => l(t));
					Wo(e, {
						get person() {
							return K(v)[t];
						},
						get index() {
							return K(n);
						},
						get onopen() {
							return K(r);
						}
					});
				}
			}), A(t), Y(e, t);
		};
		Z(r, (e) => {
			K(b).self ? e(i) : e(a, -1);
		});
		var o = H(r, 2), s = (e) => {
			ds(e, {
				get group() {
					return K(p).group;
				},
				get people() {
					return K(v);
				}
			});
		};
		Z(o, (e) => {
			K(p).group && e(s);
		});
		var c = H(o, 2), u = (e) => {
			{
				let t = /* @__PURE__ */ F(() => S(K(b).self));
				vo(e, {
					get id() {
						return K(b).self;
					},
					get person() {
						return K(v)[K(b).self];
					},
					get canEdit() {
						return K(t);
					}
				});
			}
		};
		Z(c, (e) => {
			K(b).self && e(u);
		}), Y(e, t);
	};
	Z(te, (e) => {
		K(p) ? e(re, -1) : e(ne);
	}), A(ee), A(T);
	var ie = H(T, 2), ae = (e) => {
		Di(Zo(e, {
			label: "Goals",
			get from() {
				return K(u).from;
			},
			onclose: f,
			get onback() {
				return s;
			},
			children: (e, t) => {
				{
					let t = /* @__PURE__ */ F(() => !K(b).self);
					Eo(e, {
						get people() {
							return K(p).people;
						},
						get readOnly() {
							return K(t);
						},
						onsaved: () => K(d)?.close()
					});
				}
			},
			$$slots: { default: !0 }
		}), (e) => R(d, e, !0), () => K(d));
	}, oe = (e) => {
		Zo(e, {
			get label() {
				return `${K(v)[K(c).id].name ?? ""}'s details`;
			},
			get from() {
				return K(c).from;
			},
			onclose: f,
			get onback() {
				return s;
			},
			children: (e, t) => {
				var n = hs(), r = B(n);
				{
					let e = /* @__PURE__ */ F(() => K(y).indexOf(K(c).id));
					Wo(r, {
						get person() {
							return K(v)[K(c).id];
						},
						get index() {
							return K(e);
						}
					});
				}
				var i = H(r, 2);
				{
					let e = /* @__PURE__ */ F(() => S(K(c).id));
					vo(i, {
						get id() {
							return K(c).id;
						},
						get person() {
							return K(v)[K(c).id];
						},
						get canEdit() {
							return K(e);
						}
					});
				}
				Y(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	Z(ie, (e) => {
		K(u) && K(p) ? e(ae) : K(C) && e(oe, 1);
	}), os(H(ie, 2), {}), U(() => T.inert = K(C)), Y(e, w), N();
}
// src/main.js
var bs = (e) => zr(ys, { target: e }), xs = () => new Promise((e) => {
	let t = new URL(
		/* @vite-ignore */
		"panel.css",
		import.meta.url
	);
	t.search = new URL(import.meta.url).search;
	let n = Object.assign(document.createElement("link"), {
		rel: "stylesheet",
		href: t.href
	});
	n.onload = n.onerror = e, document.head.append(n);
});
customElements.define("fitbridge-panel", class extends HTMLElement {
	#e = !1;
	set hass(e) {
		t(e);
		let n = e.themes?.darkMode ?? matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.dataset.theme = n ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", xs().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", bs(e);
		}));
	}
});
