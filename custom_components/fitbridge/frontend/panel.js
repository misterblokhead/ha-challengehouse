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
var b = 1024, x = 2048, S = 4096, ee = 8192, C = 16384, w = 32768, te = 1 << 25, ne = 65536, re = 1 << 19, ie = 1 << 20, ae = 1 << 25, oe = 1 << 21, se = 1 << 22, ce = 1 << 23, le = Symbol("$state"), ue = Symbol("component"), de = Symbol("legacy props"), fe = Symbol(""), pe = Symbol("attributes"), me = Symbol("class"), he = Symbol("style"), ge = Symbol("text"), _e = Symbol("form reset"), ve = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ye = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), be = {}, T = Symbol("uninitialized"), xe = "http://www.w3.org/1999/xhtml";
function Se() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ce(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function we() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var E = !1;
function Te(e) {
	E = e;
}
var D;
function Ee(e) {
	if (e === null) throw Ce(), be;
	return D = e;
}
function De() {
	return Ee(/* @__PURE__ */ un(D));
}
function O(e) {
	if (E) {
		if (/* @__PURE__ */ un(D) !== null) throw Ce(), be;
		D = e;
	}
}
function Oe(e = 1) {
	if (E) {
		for (var t = e, n = D; t--;) n = /* @__PURE__ */ un(n);
		D = n;
	}
}
function ke(e = !0) {
	for (var t = 0, n = D;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ un(n);
		e && n.remove(), n = i;
	}
}
function Ae(e) {
	if (!e || e.nodeType !== 8) throw Ce(), be;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function je(e) {
	return e === this.v;
}
function Me(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ne(e) {
	return !Me(e, this.v);
}
function Pe(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// node_modules/svelte/src/internal/client/errors.js
function Fe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Ie(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Le(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Re() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ze(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Be() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ve(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function He() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ue() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function We() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ge() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/flags/index.js
var Ke = !1;
function qe() {
	Ke = !0;
}
// node_modules/svelte/src/internal/shared/clone.js
var Je = [];
function Ye(e, t = !1, n = !1) {
	return Xe(e, /* @__PURE__ */ new Map(), "", Je, null, n);
}
function Xe(e, t, n, r, a = null, o = !1) {
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
				l in e && (c[l] = Xe(u, t, n, r, null, o));
			}
			return c;
		}
		if (p(e) === d) {
			c = {}, t.set(e, c), a !== null && t.set(a, c);
			for (var f of Object.keys(e)) c[f] = Xe(e[f], t, n, r, null, o);
			return c;
		}
		if (e instanceof Date) return e.getTime(), structuredClone(e);
		if (typeof e.toJSON == "function" && !o) return Xe(e.toJSON(), t, n, r, e);
	}
	if (e instanceof EventTarget) return e;
	try {
		return structuredClone(e);
	} catch {
		return e;
	}
}
// node_modules/svelte/src/internal/client/context.js
var k = null;
function Ze(e) {
	k = e;
}
function A(e, t = !1, n) {
	k = {
		p: k,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: U,
		l: Ke && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function j(e) {
	var t = k, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Cn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, k = t.p, Qe(e);
}
function Qe(e = {}) {
	return c(e, ue, { value: !0 }), e;
}
function $e() {
	return !Ke || k !== null && k.l === null;
}
// node_modules/svelte/src/internal/client/dom/task.js
var et = [];
function tt() {
	var e = et;
	et = [], _(e);
}
function nt(e) {
	if (et.length === 0 && !Ot) {
		var t = et;
		queueMicrotask(() => {
			t === et && tt();
		});
	}
	et.push(e);
}
function rt() {
	for (; et.length > 0;) tt();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var it = ~(x | S | b);
function M(e, t) {
	e.f = e.f & it | t;
}
function at(e) {
	e.f & 512 || e.deps === null ? M(e, b) : M(e, S);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function ot(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), M(e, b);
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
var st = !1;
function ct() {
	st || (st = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[_e]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function lt(e) {
	var t = H, n = U;
	Kn(null), qn(null);
	try {
		return e();
	} finally {
		Kn(t), qn(n);
	}
}
function ut(e, t, n, r = n) {
	e.addEventListener(t, () => lt(n));
	let i = e[_e];
	e[_e] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ct();
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function dt(e, t, n, r) {
	let i = $e() ? ht : vt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = U, c = ft(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				gn(e, s);
			}
			pt();
		}
	}
	var d = mt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ _t(e))).then(u).catch((e) => gn(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), pt());
	}) : f();
}
function ft() {
	var e = U, t = H, n = k, r = P;
	return function(i = !0) {
		qn(e), Kn(t), Ze(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function pt(e = !0) {
	qn(null), Kn(null), Ze(null), e && P?.deactivate();
}
function mt() {
	var e = U, t = e.b, n = P, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ht(e) {
	var t = 2 | x;
	return U !== null && (U.f |= re), {
		ctx: k,
		deps: null,
		effects: null,
		equals: je,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: T,
		wv: 0,
		parent: U,
		ac: null
	};
}
var gt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function _t(e, t, n) {
	let r = U;
	r === null && Fe();
	var i = void 0, a = Gt(T), o = !H, s = /* @__PURE__ */ new Set();
	return Dn(() => {
		var t = U, n = v();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ve && n.reject(e);
			}).finally(pt);
		} catch (e) {
			n.reject(e), pt();
		}
		var c = P;
		if (o) {
			if (t.f & 32768) var l = mt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(gt);
			else for (let e of s.values()) e.reject(gt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== gt && (c.activate(), t ? (a.f |= ce, Yt(a, t)) : (a.f & 8388608 && (a.f ^= ce), Yt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), xn(() => {
		for (let e of s) e.reject(gt);
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
function N(e) {
	let t = /* @__PURE__ */ ht(e);
	return Yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	let t = /* @__PURE__ */ ht(e);
	return t.equals = Ne, t;
}
function yt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Pn(t[n]);
	}
}
function bt(e) {
	var t, n = U, r = e.parent;
	if (!Un && r !== null && e.v !== T && r.f & 24576) return Se(), e.v;
	qn(r);
	try {
		yt(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function xt(e) {
	var t = bt(e);
	!e.equals(t) && (e.wv = ir(), (!P?.is_fork || e.deps === null) && (P === null ? e.v = t : (P.capture(e, t, !0), Tt?.capture(e, t, !0)), e.deps === null)) ? M(e, b) : Un || (Et === null ? at(e) : (bn() || P?.is_fork) && Et.set(e, t));
}
function St(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && lt(() => {
		t.ac.abort(ve), t.ac = null;
	}), t.fn !== null && (t.teardown = h), ur(t, 0), Mn(t));
}
function Ct(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && dr(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var wt = null, P = null, Tt = null, Et = null, Dt = null, Ot = !1, kt = !1, At = null, jt = null, Mt = 0, Nt = 1, Pt = class e {
	id = Nt++;
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
		wt === null ? wt = this : (wt.#n = this, this.#t = wt), wt = this;
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
			for (var r of n.d) M(r, x), t(r);
			for (r of n.m) M(r, S), t(r);
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
		for (let e of this.#u) this.#d.delete(e), M(e, x), this.schedule(e);
		for (let e of this.#d) M(e, S), this.schedule(e);
		this.apply();
		for (var t = At = [], n = [], r = jt = []; this.#c.length > 0;) {
			Mt++ > 1e3 && (this.#S(), It());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Vt(e), this.#h() || this.discard(), t;
			}
		}
		if (P = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (At = null, jt = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Bt(e, t);
			r.length > 0 && P.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), Tt = this, Rt(n), Rt(t), Tt = null, this.#s?.resolve();
			var o = P;
			if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
				if (o !== null) {
					for (let e of this.#c) o.#c.push(e);
					this.#c = [];
				} else o = this;
			}
			o !== null && (Ut.clear(), o.#_());
		}
	}
	#v(e, t, n) {
		e.f ^= b;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= b : i & 4 ? t.push(r) : ar(r) && (i & 16 && this.#d.add(r), dr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), M(i, x), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), P = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) ot(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== T && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Et?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		P = this;
	}
	deactivate() {
		P = null, Et = null;
	}
	flush() {
		try {
			kt = !0, P = this, this.#_();
		} finally {
			Mt = 0, Dt = null, At = null, jt = null, kt = !1, P = null, Et = null, Ut.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(gt);
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
		this.#m || (this.#m = !0, nt(() => {
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
		if (P === null) {
			let t = P = new e();
			!kt && !Ot && nt(() => {
				t.#e || t.flush();
			});
		}
		return P;
	}
	apply() {
		Et = null;
	}
	schedule(e) {
		Dt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? wt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Ft(e) {
	var t = Ot, n = Tt;
	Tt = null, Ot = !0;
	try {
		var r;
		for (e && (Ft(), r = e());;) {
			if (rt(), P === null) return r;
			P.flush();
		}
	} finally {
		Ot = t, Tt = n;
	}
}
function It() {
	try {
		Be();
	} catch (e) {
		gn(e, Dt);
	}
}
var Lt = null;
function Rt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ar(r) && (Lt = /* @__PURE__ */ new Set(), dr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && In(r), Lt?.size > 0)) {
				Ut.clear();
				for (let e of Lt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Lt.has(n) && (Lt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || dr(n);
					}
				}
				Lt.clear();
			}
		}
		Lt = null;
	}
}
function zt(e) {
	P.schedule(e);
}
function Bt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), M(e, b);
		for (var n = e.first; n !== null;) Bt(n, t), n = n.next;
	}
}
function Vt(e) {
	M(e, b);
	for (var t = e.first; t !== null;) Vt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Ht = /* @__PURE__ */ new Set(), Ut = /* @__PURE__ */ new Map(), Wt = !1;
function Gt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: je,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function F(e, t) {
	let n = Gt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Kt(e, t = !1, n = !0) {
	let r = Gt(e);
	return t || (r.equals = Ne), Ke && n && k !== null && k.l !== null && (k.l.s ??= []).push(r), r;
}
function I(e, t, n = !1) {
	return H !== null && (!Gn || H.f & 131072) && $e() && H.f & 4325394 && (Jn === null || !Jn.has(e)) && We(), Yt(e, n ? $t(t) : t, jt);
}
var qt = null, Jt = 0;
function Yt(e, t, n = null) {
	if (!e.equals(t)) {
		Un ? Ut.set(e, t) : Ut.has(e) || Ut.set(e, e.v);
		var r = Pt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && bt(t), Et === null && at(t);
		}
		e.wv = ir(), qt = null, Jt = 0, Qt(e, x, n), qt = null, $e() && U !== null && U.f & 1024 && !(U.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Ht.size > 0 && !Wt && Xt();
	}
	return t;
}
function Xt() {
	Wt = !1;
	for (let e of Ht) {
		e.f & 1024 && M(e, S);
		let t;
		try {
			t = ar(e);
		} catch {
			t = !0;
		}
		t && dr(e);
	}
	Ht.clear();
}
function Zt(e) {
	I(e, e.v + 1);
}
function Qt(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = $e(), a = r.length;
		if (Jt += a, Jt > 1e5 && qt === null && (qt = /* @__PURE__ */ new Set()), qt !== null) {
			if (qt.has(e)) return;
			qt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== U) {
				var l = (c & x) === 0;
				if (l && M(s, t), c & 131072) Ht.add(s);
				else if (c & 2) {
					var u = s;
					Et?.delete(u), Qt(u, S, n);
				} else if (l) {
					var d = s;
					c & 16 && Lt !== null && Lt.add(d), n === null ? zt(d) : n.push(d);
				}
			}
		}
	}
}
function $t(e) {
	if (typeof e != "object" || !e || le in e || ue in e) return e;
	let t = p(e);
	if (t !== d && t !== f) return e;
	var n = /* @__PURE__ */ new Map(), r = i(e), a = /* @__PURE__ */ F(0), o = null, s = nr, c = (e) => {
		if (nr === s) return e();
		var t = H, n = nr;
		Kn(null), rr(s);
		var r = e();
		return Kn(t), rr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ F(e.length, o)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || He();
			var i = n.get(t);
			return i === void 0 ? c(() => {
				var e = /* @__PURE__ */ F(r.value, o);
				return n.set(t, e), e;
			}) : I(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = c(() => /* @__PURE__ */ F(T, o));
					n.set(t, e), Zt(a);
				}
			} else I(r, T), Zt(a);
			return !0;
		},
		get(t, r, i) {
			if (r === le) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || l(t, r)?.writable) && (a = c(() => /* @__PURE__ */ F($t(s ? t[r] : T), o)), n.set(r, a)), a !== void 0) {
				var u = W(a);
				return u === T ? void 0 : u;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = W(i);
				if (a === T) return;
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
			if (t === le) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== T || Reflect.has(e, t);
			return (r !== void 0 || U !== null && (!i || l(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ F(i ? $t(e[t]) : T, o)), n.set(t, r)), W(r) === T) ? !1 : i;
		},
		set(e, t, i, s) {
			var u = n.get(t), d = t in e;
			if (r && t === "length") for (var f = i; f < u.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ F(T, o)), n.set(f + "", p)) : I(p, T);
			}
			if (u === void 0) (!d || l(e, t)?.writable) && (u = c(() => /* @__PURE__ */ F(void 0, o)), I(u, $t(i)), n.set(t, u));
			else {
				d = u.v !== T;
				var m = c(() => $t(i));
				I(u, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, i), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
				}
				Zt(a);
			}
			return !0;
		},
		ownKeys(e) {
			W(a);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== T;
			});
			for (var [r, i] of n) i.v !== T && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Ue();
		}
	});
}
function en(e) {
	try {
		if (typeof e == "object" && e && le in e) return e[le];
	} catch {}
	return e;
}
function tn(e, t) {
	return Object.is(en(e), en(t));
}
var nn, rn, an, on;
function sn() {
	if (nn === void 0) {
		nn = window, rn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		an = l(t, "firstChild").get, on = l(t, "nextSibling").get, m(e) && (e[me] = void 0, e[pe] = null, e[he] = void 0, e.__e = void 0), m(n) && (n[ge] = void 0);
	}
}
function cn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function ln(e) {
	return an.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function un(e) {
	return on.call(e);
}
function L(e, t) {
	if (!E) return /* @__PURE__ */ ln(e);
	var n = /* @__PURE__ */ ln(D);
	if (n === null) n = D.appendChild(cn());
	else if (t && n.nodeType !== 3) {
		var r = cn();
		return n?.before(r), Ee(r), r;
	}
	return t && mn(n), Ee(n), n;
}
function R(e, t = !1) {
	if (!E) {
		var n = /* @__PURE__ */ ln(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ un(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = cn();
			return D?.before(r), Ee(r), r;
		}
		mn(D);
	}
	return D;
}
function z(e, t = !1) {
	if (!E) return /* @__PURE__ */ ln(e);
	var n = L(e, t);
	return O(e), n;
}
function B(e, t = 1, n = !1) {
	let r = E ? D : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!E) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = cn();
			return r === null ? i?.after(a) : r.before(a), Ee(a), a;
		}
		mn(r);
	}
	return Ee(r), r;
}
function dn(e) {
	e.textContent = "";
}
function fn() {
	return !1;
}
function pn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function mn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function hn(e) {
	var t = U;
	if (t === null) return H.f |= ce, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	gn(e, t);
}
function gn(e, t) {
	if (e === be) throw e;
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
function _n(e) {
	U === null && (H === null && ze(e), Re()), Un && Le(e);
}
function vn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function yn(e, t) {
	var n = U;
	n !== null && n.f & 8192 && (e |= ee);
	var r = {
		ctx: k,
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
	P?.register_created_effect(r);
	var i = r;
	if (e & 4) At === null ? Pt.ensure().schedule(r) : At.push(r);
	else if (t !== null) {
		try {
			dr(r);
		} catch (e) {
			throw Pn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ne));
	}
	if (i !== null && (i.parent = n, n !== null && vn(i, n), H !== null && H.f & 2 && !(e & 64))) {
		var a = H;
		(a.effects ??= []).push(i);
	}
	return r;
}
function bn() {
	return H !== null && !Gn;
}
function xn(e) {
	let t = yn(8, null);
	return M(t, b), t.teardown = e, t;
}
function Sn(e) {
	_n("$effect");
	var t = U.f;
	if (!H && t & 32 && k !== null && !k.i) {
		var n = k;
		(n.e ??= []).push(e);
	} else return Cn(e);
}
function Cn(e) {
	return yn(4 | ie, e);
}
function wn(e) {
	return _n("$effect.pre"), yn(8 | ie, e);
}
function Tn(e) {
	Pt.ensure();
	let t = yn(64 | re, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Ln(t, () => {
			Pn(t), n(void 0);
		}) : (Pn(t), n(void 0));
	});
}
function En(e) {
	return yn(4, e);
}
function Dn(e) {
	return yn(se | re, e);
}
function On(e, t = 0) {
	return yn(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	dt(r, t, n, (t) => {
		yn(8, () => {
			e(...t.map(W));
		});
	});
}
function kn(e, t = 0) {
	return yn(16 | t, e);
}
function An(e) {
	return yn(32 | re, e);
}
function jn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Un, r = H;
		Wn(!0), Kn(null);
		try {
			t.call(null);
		} catch (t) {
			gn(t, e.parent);
		} finally {
			Wn(n), Kn(r);
		}
	}
}
function Mn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && lt(() => {
			e.abort(ve);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Pn(n, t), n = r;
	}
}
function Nn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Pn(t), t = n;
	}
}
function Pn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Fn(e.nodes.start, e.nodes.end), n = !0), e.f |= te, Mn(e, t && !n), ur(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	jn(e), e.f ^= te, e.f |= C;
	var i = e.parent;
	i !== null && i.first !== null && In(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Fn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ un(e);
		e.remove(), e = n;
	}
}
function In(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Ln(e, t, n = !0) {
	var r = [];
	e.f |= 256, Rn(e, r, !0);
	var i = () => {
		n && Pn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Rn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= ee;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Rn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function zn(e) {
	e.f &= -257, Bn(e, !0);
}
function Bn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= ee, e.f & 1024 || (M(e, x), Pt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Bn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Vn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ un(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Hn = null, Un = !1;
function Wn(e) {
	Un = e;
}
var H = null, Gn = !1;
function Kn(e) {
	H = e;
}
var U = null;
function qn(e) {
	U = e;
}
var Jn = null;
function Yn(e) {
	H !== null && (H.f & 2097152 || H.f & 2) && (Jn ??= /* @__PURE__ */ new Set()).add(e);
}
var Xn = null, Zn = 0, Qn = null;
function $n(e) {
	Qn = e;
}
var er = 1, tr = 0, nr = tr;
function rr(e) {
	nr = e;
}
function ir() {
	return ++er;
}
function ar(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ar(a) && xt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Et === null && M(e, b);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? M(a, x) : a.f & 1024 && M(a, S), zt(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = H, a = Jn, o = k, s = Gn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, H = l & 96 ? null : e, Jn = null, Ze(e.ctx), Gn = !1, nr = ++tr, e.ac !== null && (lt(() => {
		e.ac.abort(ve);
	}), e.ac = null);
	try {
		e.f |= oe;
		var u = e.fn, d = u();
		e.f |= w;
		var f = cr(e);
		if ($e() && Qn !== null && !Gn && f !== null && !(e.f & 6146)) for (var p = 0; p < Qn.length; p++) or(Qn[p], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= ce), d;
	} catch (t) {
		return cr(e), hn(t);
	} finally {
		e.f ^= oe, Xn = t, Zn = n, Qn = r, H = i, Jn = a, Ze(o), Gn = s, nr = c;
	}
}
function cr(e) {
	var t = e.deps, n = P?.is_fork;
	if (Xn !== null) {
		var r;
		if (n || ur(e, Zn), t !== null && Zn > 0) for (t.length = Zn + Xn.length, r = 0; r < Xn.length; r++) t[Zn + r] = Xn[r];
		else e.deps = t = Xn;
		if (bn() && e.f & 512) for (r = Zn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Zn < t.length && (ur(e, Zn), t.length = Zn);
	return t;
}
function lr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = a.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (Xn === null || !o.call(Xn, t))) {
		var s = t;
		s.f & 512 && (s.f ^= 512), s.v !== T && at(s), s.ac !== null && lt(() => {
			s.ac.abort(ve), s.ac = null, M(s, x);
		}), St(s), ur(s, 0);
	}
}
function ur(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) lr(e, n[r]);
}
function dr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		M(e, b);
		var n = U;
		U = e;
		try {
			t & 16777232 ? Nn(e) : Mn(e), jn(e);
			var r = sr(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = er;
		} finally {
			U = n;
		}
	}
}
async function fr() {
	await Promise.resolve(), Ft();
}
function W(e) {
	var t = !!(e.f & 2);
	if (Hn?.add(e), H !== null && !Gn && !(U !== null && U.f & 16384) && (Jn === null || !Jn.has(e))) {
		var n = H.deps;
		if (H.f & 2097152) e.rv < tr && (e.rv = tr, Xn === null && n !== null && n[Zn] === e ? Zn++ : Xn === null ? Xn = [e] : Xn.push(e));
		else {
			H.deps ??= [], o.call(H.deps, e) || H.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [H] : o.call(r, H) || r.push(H);
		}
	}
	if (Un && Ut.has(e)) return Ut.get(e);
	if (t) {
		var i = e;
		if (Un) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || mr(i)) && (a = bt(i)), Ut.set(i, a), a;
		}
		var s = !(i.f & 512) && !Gn && H !== null && !!(H.f & 512), c = (i.f & w) === 0;
		ar(i) && (s && (i.f |= 512), xt(i)), s && !c && (Ct(i), pr(i));
	}
	if (Et?.has(e)) return Et.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function pr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : o.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (Ct(n), pr(n));
	}
}
function mr(e) {
	if (e.v === T) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Ut.has(t) || t.f & 2 && mr(t)) return !0;
	return !1;
}
function hr(e) {
	var t = Gn;
	try {
		return Gn = !0, e();
	} finally {
		Gn = t;
	}
}
function gr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (le in e) _r(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && le in n && _r(n);
		}
	}
}
function _r(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			_r(e[n], t);
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
var vr = ["touchstart", "touchmove"];
function yr(e) {
	return vr.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var br = Symbol("events"), xr = /* @__PURE__ */ new Set(), Sr = /* @__PURE__ */ new Set();
function Cr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Or.call(t, e), !e.cancelBubble) return lt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, nt(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function wr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Cr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && xn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function G(e, t, n) {
	(t[br] ??= {})[e] = n;
}
function Tr(e) {
	for (var t = 0; t < e.length; t++) xr.add(e[t]);
	for (var n of Sr) n(e);
}
var Er = null, Dr = !1;
function Or(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Er = e, Dr || (Dr = !0, setTimeout(() => {
		Dr = !1, Er = null;
	}));
	var o = 0, s = Er === e && e[br];
	if (s) {
		var l = i.indexOf(s);
		if (l !== -1 && (t === document || t === window)) {
			e[br] = t;
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
		var d = H, f = U;
		Kn(null), qn(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[br]?.[r];
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
			e[br] = t, delete e.currentTarget, Kn(d), qn(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var kr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Ar(e) {
	return kr?.createHTML(e) ?? e;
}
function jr(e) {
	var t = pn("template");
	return t.innerHTML = Ar(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Mr(e, t) {
	var n = U;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function K(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (E) return Mr(D, null), D;
		i === void 0 && (i = jr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ ln(i)));
		var t = r || rn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ ln(t), s = t.lastChild;
			Mr(o, s);
		} else Mr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Nr(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (E) return Mr(D, null), D;
		if (!o) {
			var e = /* @__PURE__ */ ln(jr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ ln(e);) o.appendChild(/* @__PURE__ */ ln(e));
			else o = /* @__PURE__ */ ln(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ ln(t), r = t.lastChild;
			Mr(n, r);
		} else Mr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Pr(e, t) {
	return /* @__PURE__ */ Nr(e, t, "svg");
}
function Fr() {
	if (E) return Mr(D, null), D;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = cn();
	return e.append(t, n), Mr(t, n), e;
}
function q(e, t) {
	if (E) {
		var n = U;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = D), De();
	} else e !== null && e.before(t);
}
function Ir() {
	if (E && D && D.nodeType === 8 && D.textContent?.startsWith("$")) {
		let e = D.textContent.substring(1);
		return De(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Lr(e) {
	let t = 0, n = Gt(0), r;
	return () => {
		bn() && (W(n), On(() => (t === 0 && (r = hr(() => e(() => Zt(n)))), t += 1, () => {
			nt(() => {
				--t, t === 0 && (r?.(), r = void 0, Zt(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Rr = ne | re;
function zr(e, t, n, r) {
	new Br(e, t, n, r);
}
var Br = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = E ? D : null;
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
	#h = Lr(() => (this.#m = Gt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = kn(() => {
			if (E) {
				let e = Ae(this.#t);
				De();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Rr), E && (this.#e = D);
	}
	#g() {
		try {
			this.#a = An(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		nt(r), t && (this.#s = An(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? we() : (t = !0, n && Ge(), this.#s !== null && Ln(this.#s, () => {
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
					gn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (C | te)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = An(() => e(this.#e)), nt(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = cn(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return An(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							gn(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(P)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Ln(this.#o, () => {
					this.#o = null;
				}), this.#S(P));
			}
		}));
	}
	#x() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = An(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Vn(this.#a, e);
				let t = this.#n.pending;
				this.#o = An(() => t(this.#e));
			} else this.#S(P);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		ot(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = U, n = H, r = k;
		qn(this.#i), Kn(this.#i), Ze(this.#i.ctx);
		try {
			return Pt.ensure(), e();
		} finally {
			qn(t), Kn(n), Ze(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && Ln(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, nt(() => {
			this.#d = !1, this.#m && Yt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), W(this.#m);
	}
	error(e) {
		if (e === be || !this.#n.onerror && !this.#n.failed) throw e;
		P?.is_fork ? (this.#a && P.skip_effect(this.#a), this.#o && P.skip_effect(this.#o), this.#s && P.skip_effect(this.#s), P.oncommit(() => {
			this.#y() || this.#T(e);
		})) : this.#T(e);
	}
	#T(e) {
		this.#a &&= (Pn(this.#a), null), this.#o &&= (Pn(this.#o), null), this.#s &&= (Pn(this.#s), null), E && (Ee(this.#t), Oe(), Ee(ke()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return An(() => {
						var r = U;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return gn(e, this.#i.parent), null;
				}
			}));
		};
		nt(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					gn(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => gn(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ge] ??= e.nodeValue) && (e[ge] = n, e.nodeValue = `${n}`);
}
function Vr(e, t) {
	return Ur(e, t);
}
var Hr = /* @__PURE__ */ new Map();
function Ur(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: c }) {
	sn();
	var l = void 0, u = Tn(() => {
		var o = n ?? t.appendChild(cn());
		zr(o, { pending: () => {} }, (t) => {
			A({});
			var n = k;
			if (a && (n.c = a), i && (r.$$events = i), E && Mr(t, null), l = e(t, r) || Qe(), E && (U.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw Ce(), be;
			j();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = yr(r);
					for (let e of [t, document]) {
						var a = Hr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Hr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Or, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(s(xr)), Sr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Hr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Or), r.delete(e), r.size === 0 && Hr.delete(n)) : r.set(e, i);
			}
			Sr.delete(d), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Wr.set(l, u), l;
}
var Wr = /* @__PURE__ */ new WeakMap(), Gr = class {
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
			if (n) zn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (zn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Pn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Vn(r, t), t.append(cn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Pn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Ln(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Pn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = P, r = fn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = cn();
				i.append(a), this.#n.set(e, {
					effect: An(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, An(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else E && (this.anchor = D), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Y(e, t, n = !1) {
	var r;
	E && (r = D, De());
	var i = new Gr(e), a = n ? ne : 0;
	function o(e, t) {
		if (E) {
			var n = Ae(r);
			if (e !== parseInt(n.substring(1))) {
				var a = ke();
				Ee(a), i.anchor = a, Te(!1), i.ensure(e, t), Te(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	kn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Kr(e, t) {
	return t;
}
function qr(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, c = 0; c < i; c++) {
		let n = t[c];
		Ln(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Jr(e, s(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			dn(d), d.append(u), e.items.clear();
		}
		Jr(e, t, !l);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Jr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ae, Vn(a, document.createDocumentFragment())) : Pn(t[i], n);
	}
}
var Yr;
function X(e, t, n, r, a, o = null) {
	var c = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		c = E ? Ee(/* @__PURE__ */ ln(u)) : u.appendChild(cn());
	}
	E && De();
	var d = null, f = /* @__PURE__ */ vt(() => {
		var e = n();
		return i(e) ? e : e == null ? [] : s(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = W(f);
			_.fallback = d, Zr(_, n, c, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= ae, $r(d, null, c)) : zn(d) : Ln(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: kn(() => {
			var e = W(f), i = e.length;
			let s = !1;
			E && Ae(c) === "[!" != (i === 0) && (c = ke(), Ee(c), Te(!1), s = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = P, v = fn(), y = 0; y < i; y += 1) {
				E && D.nodeType === 8 && D.data === "]" && (c = D, s = !0, Te(!1));
				var b = e[y], x = r(b, y), S = m ? null : l.get(x);
				S ? (S.v && Yt(S.v, b), S.i && Yt(S.i, y), v && _.unskip_effect(S.e)) : (S = Qr(l, m ? c : Yr ??= cn(), b, x, y, a, t, n), m || (S.e.f |= ae), l.set(x, S)), u.add(x);
			}
			if (i === 0 && o && !d && (m ? d = An(() => o(c)) : (d = An(() => o(Yr ??= cn())), d.f |= ae)), i > u.size && Ie("", "", ""), E && i > 0 && Ee(ke()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			s && Te(!0), W(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, E && (c = D);
}
function Xr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Zr(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, c = e.items, l = Xr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (a) for (v = 0; v < o; v += 1) h = t[v], g = i(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (h = t[v], g = i(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (zn(_), a && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ae, _ === l) $r(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ei(e, d, _), ei(e, _, y), $r(_, y, n), d = _, p = [], m = [], l = Xr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) $r(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					ei(e, S.prev, ee.next), ei(e, d, S), ei(e, ee, b), l = b, d = ee, --v, p = [], m = [];
				} else u.delete(_), $r(_, l, n), ei(e, _.prev, _.next), ei(e, _, d === null ? e.effect.first : d.next), ei(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Xr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Xr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Jr(e, s(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var C = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || C.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && C.push(l), l = Xr(l.next);
		var w = C.length;
		if (w > 0) {
			var te = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < w; v += 1) C[v].nodes?.a?.measure();
				for (v = 0; v < w; v += 1) C[v].nodes?.a?.fix();
			}
			qr(e, C, te);
		}
	}
	a && nt(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Qr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Gt(n) : /* @__PURE__ */ Kt(n, !1, !1) : null, l = o & 2 ? Gt(i) : null;
	return {
		v: c,
		i: l,
		e: An(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function $r(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ un(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ei(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ti(e, t, ...n) {
	var r = new Gr(e);
	kn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, ne);
}
// node_modules/clsx/dist/clsx.mjs
function ni(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = ni(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function ri() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = ni(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/svelte/src/internal/shared/attributes.js
function ii(e) {
	return typeof e == "object" ? ri(e) : e ?? "";
}
var ai = [..." 	\n\r\f\xA0\v﻿"];
function oi(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ai.includes(r[o - 1])) && (s === r.length || ai.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function si(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function ci(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function li(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(ci)), i && c.push(...Object.keys(i).map(ci));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = ci(e.substring(l, u).trim());
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
		return r && (n += si(r)), i && (n += si(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function Z(e, t, n, r, i, a) {
	var o = e[me];
	if (E || o !== n || o === void 0) {
		var s = oi(n, r, a);
		E && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[me] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function ui(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Q(e, t, n, r) {
	var i = e[he];
	if (E || i !== t) {
		var a = li(t, r);
		E && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[he] = t;
	} else r && (Array.isArray(r) ? (ui(e, n?.[0], r[0]), ui(e, n?.[1], r[1], "important")) : ui(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var di = Symbol("is custom element"), fi = Symbol("is html"), pi = ye ? "link" : "LINK";
function mi(e) {
	if (E) {
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
		e[_e] = n, nt(n), ct();
	}
}
function $(e, t, n, r) {
	var i = hi(e);
	E && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === pi) || i[t] !== (i[t] = n) && (t === "loading" && (e[fe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && _i(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function hi(e) {
	return e[pe] ??= {
		[di]: e.nodeName.includes("-"),
		[fi]: e.namespaceURI === xe
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
	ut(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Si(e) ? Ci(a) : a, n(a), P !== null && r.add(P), await fr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (E && e.defaultValue !== e.value || hr(t) == null && e.value) && (n(Si(e) ? Ci(e.value) : e.value), P !== null && r.add(P)), On(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = P;
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
	o.push(n), ut(n, "change", () => {
		var e = n.__value;
		a && (e = xi(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), On(() => {
		var e = r();
		E && n.defaultChecked !== n.checked ? s = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = tn(n.__value, e);
	}), xn(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), yi.has(o) || (yi.add(o), nt(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), yi.delete(o);
	})), nt(() => {
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
	En(() => (hr(() => n(e[t])), r));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Ei(e, t) {
	return e === t || e?.[le] === t;
}
function Di(e = Qe(), t, n, r) {
	var i = k.r, a = U;
	return En(() => {
		var o, s;
		return On(() => {
			o = s, s = r?.() || [], hr(() => {
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
	var r = e === "x", i = () => lt(() => {
		a = !0, clearTimeout(o), o = setTimeout(s, 100), n(window[r ? "scrollX" : "scrollY"]);
	});
	addEventListener("scroll", i, { passive: !0 });
	var a = !1, o, s = () => {
		a = !1;
	}, c = !0;
	On(() => {
		var e = t();
		c ? c = !1 : !a && e != null && (a = !0, clearTimeout(o), r ? scrollTo(e, window.scrollY) : scrollTo(window.scrollX, e), o = setTimeout(s, 100));
	}), En(i), xn(() => {
		removeEventListener("scroll", i);
	});
}
// node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function ki(e = !1) {
	let t = k, n = t.l.u;
	if (!n) return;
	let r = () => gr(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ ht(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => W(i);
	}
	n.b.length && wn(() => {
		Ai(t, r), _(n.b);
	}), Sn(() => {
		let e = hr(() => n.m.map(g));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && Sn(() => {
		Ai(t, r), _(n.a);
	});
}
function Ai(e, t) {
	if (e.l.s) for (let t of e.l.s) W(t);
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
	var i = !Ke || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, u = void 0, d = () => o && i ? (u ??= /* @__PURE__ */ ht(r), W(u)) : (c && (c = !1, s = o ? hr(r) : r), s);
	let f;
	if (a) {
		var p = le in e || de in e;
		f = l(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = Mi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ve(t), f(m)));
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
	var v = !1, y = (n & 1 ? ht : vt)(() => (v = !1, g()));
	a && W(y);
	var b = U;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? W(y) : i && a ? $t(e) : e;
			return I(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return Un && v || b.f & 16384 ? y.v : W(y);
	});
}
function Pi(e) {
	k === null && Pe("onMount"), Ke && k.l !== null ? Fi(k).m.push(e) : Sn(() => {
		let t = hr(e);
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
var _a = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${Li(e.getMonth() + 1)}-${Li(e.getDate())}`;
function va(e, t, n) {
	if (e == null) return null;
	let r = Date.parse(`${n}T00:00:00Z`), i = r - (new Date(r).getUTCDay() + 6) % 7 * 864e5, a = Array.from({ length: 7 }, (e, t) => new Date(i + t * 864e5).toISOString().slice(0, 10)), o = a.map((t) => t > n ? null : e[t] ?? 0), s = Math.max(t ?? 0, ...o.map((e) => e ?? 0));
	return {
		bars: a.map((e, r) => ({
			label: "MTWTFSS"[r],
			date: e,
			steps: o[r],
			frac: s > 0 ? (o[r] ?? 0) / s : 0,
			active: t > 0 && o[r] >= t,
			isToday: e === n,
			future: e > n
		})),
		goalFrac: t > 0 ? t / s : null
	};
}
function ya(e) {
	let t = e.filter((e) => e.active).length;
	return `${t} active ${t === 1 ? "day" : "days"} · ${Ui(e.reduce((e, t) => e + (t.steps ?? 0), 0))} steps`;
}
var ba = (e) => `${e.w} ${e.unit} × ${e.r}`, xa = [
	"Chest",
	"Back",
	"Shoulders",
	"Arms",
	"Legs",
	"Core",
	"Other"
], Sa = (e) => xa.map((t) => ({
	group: t,
	lifts: (e ?? []).filter((e) => (xa.includes(e.group) ? e.group : "Other") === t)
})).filter((e) => e.lifts.length), Ca = (e) => Sa(e).map(({ group: e, lifts: t }) => ({
	group: e,
	count: t.length,
	lift: [...t].sort((e, t) => (t.sessions ?? 0) - (e.sessions ?? 0) || t.date.localeCompare(e.date) || e.name.localeCompare(t.name))[0]
})), wa = (e) => Sa(e).map(({ group: e, lifts: t }) => ({
	group: e,
	lifts: [...t].sort((e, t) => e.name.localeCompare(t.name))
})), Ta = (e) => `${Math.floor(e / 60)}:${Li(e % 60)}`, Ea = (e) => new Set([...(e?.lifts ?? []).map((e) => e.key), e?.fastest_1k?.key].filter(Boolean)), Da = 5e3, Oa = $t({}), ka = $t({
	on: !1,
	text: "",
	undo: null
}), Aa = $t({
	entry: null,
	at: 0
}), ja, Ma = 0, Na = {};
function Pa(e, t = null) {
	clearTimeout(ja), Object.assign(ka, {
		on: !0,
		text: e,
		undo: t
	}), ja = setTimeout(() => ka.on = !1, Da);
}
function Fa(e, t = Date.now()) {
	for (let [n, r] of Object.entries(Oa)) aa(r, e[r.person]?.feed ?? [], t) && delete Oa[n];
	Aa.entry && ha(Aa, e, t) && (Aa.entry = null);
}
async function Ia(e, t) {
	try {
		await n("POST", "settings", e);
	} catch (e) {
		return Pa(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(Aa, {
		entry: e,
		at: Date.now()
	}), Fa(t), Pa("Saved · updates within 5 min"), !0;
}
async function La(e, t, r) {
	let i = `${e}/${t}`, a = Oa[i], o = ++Ma, s = t.startsWith("manual:");
	Oa[i] = {
		person: e,
		key: t,
		want: s && r === "remove" ? null : r === "remove",
		at: Date.now(),
		n: o
	}, r === "remove" && !s && Pa("Removed", () => La(e, t, "restore"));
	try {
		await oa(Na, i, () => n("POST", "workouts", {
			person: e,
			key: t,
			action: r
		}));
	} catch (e) {
		Oa[i]?.n === o && (a ? Oa[i] = a : delete Oa[i]), Pa(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
// src/lib/ui/Badges.svelte
var Ra = /* @__PURE__ */ K("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), za = /* @__PURE__ */ K("<ul class=\"svelte-m8wnum\"></ul>"), Ba = /* @__PURE__ */ K("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), Va = /* @__PURE__ */ K("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), Ha = /* @__PURE__ */ K("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function Ua(e, t) {
	A(t, !0);
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
	var a = Ha(), o = L(a), s = (e) => {
		var n = za();
		X(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = Ra(), i = L(n), a = z(i, !0), o = B(i, 2), s = z(o, !0), c = z(B(o, 2), !0);
			O(n), V((e, n) => {
				J(a, e), J(s, W(t).title), J(c, n);
			}, [() => r(W(t)), () => ia(W(t).unlocked_at)]), q(e, n);
		}), O(n), q(e, n);
	};
	Y(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = B(o, 2), l = (e) => {
		var n = za();
		X(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = Ba(), a = L(n), o = z(a, !0), s = B(a, 2), c = z(s, !0), l = B(s, 2), u = z(l), d = B(l, 2), f = L(d);
			let p;
			O(d), O(n), V((e, n, r, i) => {
				J(o, e), J(c, W(t).title), J(u, `${n ?? ""} of ${r ?? ""}`), p = Q(f, "", p, { width: i });
			}, [
				() => r(W(t)),
				() => i(W(t).current),
				() => i(W(t).target),
				() => `${Math.min(1, W(t).current / W(t).target) * 100}%`
			]), q(e, n);
		}), O(n), q(e, n);
	};
	Y(c, (e) => {
		t.badges.next.length && e(l);
	});
	var u = B(c, 2), d = (e) => {
		q(e, Va());
	};
	Y(u, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(d);
	}), O(a), q(e, a), j();
}
// src/lib/media.svelte.js
var Wa = $t({
	wide: !1,
	reducedMotion: !1
}), Ga = matchMedia("(min-width: 768px)"), Ka = matchMedia("(prefers-reduced-motion: reduce)"), qa = () => {
	Wa.wide = Ga.matches, Wa.reducedMotion = Ka.matches;
};
Ga.addEventListener("change", qa), Ka.addEventListener("change", qa), qa();
// src/lib/motion.js
function Ja(e, { onFrame: t, onSettle: n, snap: r = {
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
var Ya = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), Xa = (e) => Ya(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function Za({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var Qa = /* @__PURE__ */ K("<span class=\"mini svelte-69s4be\"> </span>"), $a = /* @__PURE__ */ K("<span class=\"mini svelte-69s4be\">Together</span>"), eo = /* @__PURE__ */ K("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), to = /* @__PURE__ */ K("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), no = /* @__PURE__ */ K("<div><dt class=\"svelte-69s4be\"> </dt><dd class=\"svelte-69s4be\"> </dd></div>"), ro = /* @__PURE__ */ K("<dl class=\"svelte-69s4be\"></dl>"), io = /* @__PURE__ */ K("<span class=\"ask svelte-69s4be\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-69s4be\">Delete</button>", 1), ao = /* @__PURE__ */ K("<button type=\"button\"> </button>"), oo = /* @__PURE__ */ K("<div><div class=\"inner svelte-69s4be\"><!> <div class=\"acts svelte-69s4be\"><!></div></div></div>"), so = /* @__PURE__ */ K("<li><button type=\"button\" class=\"head svelte-69s4be\"><span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span></button> <!></li>");
function co(e, t) {
	let n = Ir();
	A(t, !0);
	let r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, i = /* @__PURE__ */ N(() => Oa[`${t.person}/${t.item.key}`]), a = /* @__PURE__ */ N(() => ta(W(i) && W(i).want !== null ? {
		...t.item,
		excluded: W(i).want
	} : t.item)), o = /* @__PURE__ */ N(() => [
		["Distance", W(a).detail.km],
		["Pace", W(a).detail.pace],
		["Avg heart rate", W(a).detail.hr],
		["Plan session", W(a).detail.plan]
	].filter(([, e]) => e)), s = /* @__PURE__ */ N(() => W(i)?.want === null), c = /* @__PURE__ */ N(() => W(o).length > 0 || t.canEdit && !!W(a).removable), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F(void 0), f = /* @__PURE__ */ F(void 0), p = Za({
		response: .35,
		damping: 1
	}), m = Ja(p, {
		onFrame: (e) => W(d).style.height = `${e}px`,
		onSettle: () => W(l) && (W(d).style.height = "auto")
	});
	Sn(() => m.stop);
	function h() {
		W(c) && (I(l, !W(l)), I(u, !1), Wa.reducedMotion ? W(d).style.height = W(l) ? "auto" : "0px" : (m.running || (p.value = W(d).offsetHeight), m.to(W(l) ? W(f).offsetHeight : 0)));
	}
	let g = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function _() {
		W(a).removable === "delete" ? I(u, !0) : La(t.person, t.item.key, W(a).removable);
	}
	var v = so();
	let b;
	var x = L(v), S = L(x), ee = z(S, !0), C = B(S, 2), w = L(C), te = L(w), ne = B(te), re = (e) => {
		var n = Qa(), r = z(n, !0);
		V(() => J(r, t.item.plan)), q(e, n);
	};
	Y(ne, (e) => {
		t.item.plan && e(re);
	});
	var ie = B(ne, 2), ae = (e) => {
		q(e, $a());
	};
	Y(ie, (e) => {
		t.item.joint && e(ae);
	});
	var oe = B(ie, 2), se = (e) => {
		q(e, eo());
	};
	Y(oe, (e) => {
		t.record && e(se);
	}), O(w);
	var ce = z(B(w, 2));
	O(C);
	var le = B(C, 2), ue = L(le), de = (e) => {
		q(e, to());
	};
	Y(ue, (e) => {
		W(i) && e(de);
	});
	var fe = B(ue);
	O(le), O(x);
	var pe = B(x, 2), me = (e) => {
		var r = oo();
		let i;
		var c = L(r), p = L(c), m = (e) => {
			var t = ro();
			X(t, 21, () => W(o), ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ N(() => y(W(t), 2));
				let r = () => W(n)[0], i = () => W(n)[1];
				var a = no(), o = L(a), s = z(o, !0), c = z(B(o), !0);
				O(a), V(() => {
					J(s, r()), J(c, i());
				}), q(e, a);
			}), O(t), q(e, t);
		};
		Y(p, (e) => {
			W(o).length && e(m);
		});
		var v = B(p, 2), b = L(v), x = (e) => {
			var n = Fr(), r = R(n), i = (e) => {
				var n = io(), r = B(R(n), 2), i = B(r, 2);
				G("click", r, () => I(u, !1)), G("click", i, () => (h(), La(t.person, t.item.key, "remove"))), q(e, n);
			}, o = (e) => {
				var t = ao();
				let n;
				var r = z(t, !0);
				V(() => {
					n = Z(t, 1, "btn svelte-69s4be", null, n, { danger: W(a).removable !== "restore" }), J(r, g[W(a).removable]);
				}), G("click", t, _), q(e, t);
			};
			Y(r, (e) => {
				W(u) ? e(i) : e(o, -1);
			}), q(e, n);
		};
		Y(b, (e) => {
			t.canEdit && !W(s) && W(a).removable && e(x);
		}), O(v), O(c), Di(c, (e) => I(f, e), () => W(f)), O(r), Di(r, (e) => I(d, e), () => W(d)), V(() => {
			i = Z(r, 1, "more svelte-69s4be", null, i, { open: W(l) }), $(r, "id", `${n}-more`), r.inert = !W(l);
		}), q(e, r);
	};
	Y(pe, (e) => {
		W(c) && e(me);
	}), O(v), V(() => {
		b = Z(v, 1, "svelte-69s4be", null, b, { dim: W(a).removable === "restore" || W(s) }), $(x, "aria-expanded", W(c) ? W(l) : void 0), $(x, "aria-controls", W(c) ? `${n}-more` : void 0), Z(S, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), J(ee, r[t.item.kind] ?? "💪"), J(te, `${W(a).title ?? ""} `), J(ce, `${W(a).when ?? ""} · ${W(a).duration ?? ""}`), J(fe, ` ${(W(a).removable === "restore" ? "Removed" : W(a).xp && `${W(a).xp} XP`) ?? ""}`);
	}), G("click", x, h), q(e, v), j();
}
Tr(["click"]);
// src/lib/ui/Feed.svelte
var lo = /* @__PURE__ */ K("<ul class=\"card svelte-n1344i\"></ul>"), uo = /* @__PURE__ */ K("<p class=\"caption empty svelte-n1344i\">No workouts in the last 30 days.</p>");
function fo(e, t) {
	A(t, !0);
	var n = Fr(), r = R(n), i = (e) => {
		var n = lo();
		X(n, 21, () => t.items, (e) => e.key, (e, n) => {
			{
				let r = /* @__PURE__ */ N(() => t.records?.has(W(n).key));
				co(e, {
					get person() {
						return t.person;
					},
					get item() {
						return W(n);
					},
					get canEdit() {
						return t.canEdit;
					},
					get record() {
						return W(r);
					}
				});
			}
		}), O(n), q(e, n);
	}, a = (e) => {
		q(e, uo());
	};
	Y(r, (e) => {
		t.items.length ? e(i) : e(a, -1);
	}), q(e, n), j();
}
// src/lib/ui/PlanBar.svelte
var po = /* @__PURE__ */ K("<span> </span>"), mo = /* @__PURE__ */ K("<i class=\"svelte-1y5m0aq\"></i>"), ho = /* @__PURE__ */ K("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), go = /* @__PURE__ */ K("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!></div>");
function _o(e, t) {
	A(t, !0);
	let n = /* @__PURE__ */ N(() => na(t.plan)), r = /* @__PURE__ */ N(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0)) / 60));
	var i = go(), a = L(i), o = L(a), s = z(o, !0), c = B(o, 2), l = (e) => {
		var n = po();
		let r;
		var i = z(n, !0);
		V(() => {
			r = Z(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), J(i, t.plan.due_today ? "Due today" : "Rest day");
		}), q(e, n);
	};
	Y(c, (e) => {
		W(n).length && e(l);
	}), O(a);
	var u = B(a, 2), d = (e) => {
		var t = ho(), i = R(t);
		X(i, 21, () => W(n), Kr, (e, t) => {
			var n = mo();
			let r;
			V(() => r = Q(n, "", r, {
				"flex-grow": W(t).frac,
				background: `var(--${W(t).kind === "run" ? "run" : "fill"})`
			})), q(e, n);
		}), O(i);
		var a = B(i, 2), o = L(a), s = L(o);
		Q(s, "", {}, { background: "var(--run)" }), Q(B(s, 2), "", {}, { background: "var(--fill)" }), Oe(), O(o);
		var c = z(B(o, 2));
		O(a), V(() => {
			$(i, "aria-label", `Run and walk intervals, ${W(r) ?? ""} minutes in total`), J(c, `${W(r) ?? ""} min`);
		}), q(e, t);
	};
	Y(u, (e) => {
		W(n).length && e(d);
	}), O(i), V(() => J(s, t.plan.state)), q(e, i), j();
}
// src/lib/gesture.js
var vo = (e, t = .998) => e / 1e3 * t / (1 - t), yo = (e, t, n) => e + vo(t) > n / 2;
function bo(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var xo = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), So = /* @__PURE__ */ K("<li class=\"svelte-18znx9k\"><span class=\"dot svelte-18znx9k\" aria-hidden=\"true\"></span><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), Co = /* @__PURE__ */ K("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1), wo = /* @__PURE__ */ K("<dialog><div class=\"grab svelte-18znx9k\"><h2 class=\"svelte-18znx9k\">All records</h2> <button type=\"button\" class=\"close press svelte-18znx9k\" aria-label=\"Close\">✕</button></div> <div class=\"body svelte-18znx9k\"></div></dialog>");
function To(e, t) {
	let n = Ir();
	A(t, !0);
	let r, i, a = /* @__PURE__ */ F(0), o = null, s = /* @__PURE__ */ F(!1), c = !1;
	function l(e = null) {
		r.open || (c = document.documentElement.style.overflow !== "hidden", c && (document.documentElement.style.overflow = "hidden"), r.showModal(), i.scrollTop = 0, e && i.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	function u() {
		c && (document.documentElement.style.overflow = ""), c = !1, I(a, 0);
	}
	function d(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), o = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, I(s, !0));
	}
	function f(e) {
		o && (I(a, Math.max(0, e.clientY - o.start), !0), o.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), o.samples.length > 8 && o.samples.shift());
	}
	function p(e) {
		if (!o) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = bo([...o.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		o = null, I(s, !1), yo(W(a), n, r.offsetHeight) ? r.close() : I(a, 0);
	}
	var m = { open: l }, h = wo();
	let g, _;
	var v = L(h), y = L(v), b = B(y, 2);
	O(v);
	var x = B(v, 2);
	return X(x, 21, () => t.groups, (e) => e.group, (e, t) => {
		var n = Co(), r = R(n), i = z(r, !0), a = B(r, 2);
		X(a, 21, () => W(t).lifts, (e) => e.id, (e, t) => {
			var n = So(), r = B(L(n)), i = L(r), a = B(i), o = z(a, !0), s = B(a);
			O(r), O(n), V((e, n) => {
				J(i, `${W(t).name ?? ""} · `), J(o, e), J(s, ` · ${n ?? ""}`);
			}, [() => ba(W(t)), () => ia(W(t).date)]), q(e, n);
		}), O(a), V(() => {
			$(r, "data-group", W(t).group), J(i, W(t).group);
		}), q(e, n);
	}), O(x), Di(x, (e) => i = e, () => i), O(h), Di(h, (e) => r = e, () => r), V(() => {
		$(h, "aria-labelledby", `${n}-t`), g = Z(h, 1, "svelte-18znx9k", null, g, { dragging: W(s) }), _ = Q(h, "", _, { transform: W(a) ? `translateY(${W(a)}px)` : null }), $(y, "id", `${n}-t`);
	}), G("click", h, (e) => e.target === r && r.close()), wr("close", h, u), G("keydown", h, (e) => e.key === "Escape" && e.stopPropagation()), G("pointerdown", v, d), G("pointermove", v, f), G("pointerup", v, p), wr("pointercancel", v, p), G("click", b, () => r.close()), q(e, h), j(m);
}
Tr([
	"click",
	"keydown",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/StepBars.svelte
var Eo = /* @__PURE__ */ K("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), Do = /* @__PURE__ */ K("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), Oo = /* @__PURE__ */ K("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function ko(e, t) {
	A(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), r = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var i = Oo(), a = L(i);
	X(a, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = Eo();
		let i;
		var a = L(n), o = L(a);
		let s, c;
		O(a);
		var l = z(B(a, 2), !0);
		O(n), V((e) => {
			$(n, "aria-label", e), $(n, "aria-hidden", W(t).future ? "true" : void 0), $(n, "aria-current", W(t).isToday ? "date" : void 0), i = Z(n, 1, "svelte-1f099m", null, i, { today: W(t).isToday }), s = Z(o, 1, "svelte-1f099m", null, s, {
				active: W(t).active,
				future: W(t).future
			}), c = Q(o, "", c, { height: `${W(t).frac * 100}%` }), J(l, W(t).label);
		}, [() => W(t).future ? void 0 : r(W(t))]), q(e, n);
	}), O(a);
	var o = B(a, 2), s = (e) => {
		var n = Do();
		let r;
		V(() => r = Q(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), q(e, n);
	};
	Y(o, (e) => {
		t.goalFrac !== null && e(s);
	}), O(i), q(e, i), j();
}
// src/lib/ui/Progress.svelte
var Ao = /* @__PURE__ */ K("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), jo = /* @__PURE__ */ K("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"dot svelte-kr1x1f\" aria-hidden=\"true\"></span><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), Mo = /* @__PURE__ */ K("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), No = /* @__PURE__ */ K("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), Po = /* @__PURE__ */ K("<div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span></div>"), Fo = /* @__PURE__ */ K("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), Io = /* @__PURE__ */ K("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function Lo(e, t) {
	A(t, !0);
	let n = /* @__PURE__ */ N(() => t.person.week.goal.steps ?? 0), r = /* @__PURE__ */ N(() => va(t.person.steps_week, W(n), _a())), i = /* @__PURE__ */ N(() => t.person.pbs.lifts ?? []), a = /* @__PURE__ */ N(() => Ca(W(i))), o, s = /* @__PURE__ */ N(() => t.person.pbs.fastest_1k), c = /* @__PURE__ */ N(() => t.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var l = Io(), u = R(l), d = (e) => {
		var t = Ao(), n = L(t);
		ko(n, {
			get bars() {
				return W(r).bars;
			},
			get goalFrac() {
				return W(r).goalFrac;
			}
		});
		var i = z(B(n, 2), !0);
		O(t), V((e) => J(i, e), [() => ya(W(r).bars)]), q(e, t);
	};
	Y(u, (e) => {
		W(r) && e(d);
	});
	var f = B(u, 2), p = L(f), m = (e) => {
		var t = Mo(), n = R(t);
		X(n, 21, () => W(a), (e) => e.group, (e, t) => {
			var n = jo(), r = L(n), i = B(L(r)), a = z(i, !0), s = B(i), c = L(s), l = z(B(c), !0);
			O(s), O(r), O(n), V((e) => {
				J(a, W(t).group), J(c, `${W(t).lift.name ?? ""} · `), J(l, e);
			}, [() => ba(W(t).lift)]), G("click", r, () => o.open(W(t).group)), q(e, n);
		}), O(n);
		var r = B(n, 2), s = z(r);
		V(() => J(s, `All records (${W(i).length ?? ""})`)), G("click", r, () => o.open()), q(e, t);
	}, h = (e) => {
		q(e, No());
	};
	Y(p, (e) => {
		W(i).length ? e(m) : e(h, -1);
	}), O(f);
	var g = B(f, 2), _ = L(g), v = (e) => {
		var t = Po(), n = z(B(L(t), 2));
		O(t), V((e, t) => J(n, `${e ?? ""} · ${t ?? ""}`), [() => Ta(W(s).seconds), () => ia(W(s).date)]), q(e, t);
	}, y = (e) => {
		q(e, Fo());
	};
	Y(_, (e) => {
		W(s) ? e(v) : e(y, -1);
	});
	var b = B(_, 2), x = z(B(L(b)));
	O(b);
	var S = B(b, 2), ee = z(B(L(S)));
	O(S), O(g);
	var C = B(g, 2);
	{
		let e = /* @__PURE__ */ N(() => wa(W(i)));
		Di(To(C, { get groups() {
			return W(e);
		} }), (e) => o = e, () => o);
	}
	V((e) => {
		J(x, `${e ?? ""} km`), J(ee, `${W(c) ?? ""} t`);
	}, [() => t.person.pbs.longest_session_km.toFixed(1)]), q(e, l), j();
}
Tr(["click"]);
// src/lib/ui/Shoes.svelte
var Ro = /* @__PURE__ */ K("<span class=\"label svelte-eu7fja\"> </span>"), zo = /* @__PURE__ */ K("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), Bo = /* @__PURE__ */ K("<ul class=\"card svelte-eu7fja\"></ul>");
function Vo(e, t) {
	A(t, !0);
	let n = /* @__PURE__ */ N(() => t.shoes.map(sa));
	var r = Bo();
	X(r, 23, () => W(n), (e, n) => t.shoes[n].entity_id, (e, t) => {
		var n = zo(), r = L(n), i = L(r), a = z(i, !0), o = z(B(i), !0);
		O(r);
		var s = B(r, 2), c = L(s);
		let l;
		O(s);
		var u = B(s, 2), d = L(u), f = z(d, !0), p = B(d, 2), m = (e) => {
			var n = Ro(), r = z(n, !0);
			V(() => J(r, W(t).label)), q(e, n);
		};
		Y(p, (e) => {
			W(t).label && e(m);
		}), O(u), O(n), V(() => {
			Z(n, 1, ii(W(t).state), "svelte-eu7fja"), J(a, W(t).name), J(o, W(t).km), l = Q(c, "", l, { width: `${W(t).frac * 100}%` }), J(f, W(t).detail);
		}), q(e, n);
	}), O(r), q(e, r), j();
}
// src/lib/ui/Details.svelte
var Ho = /* @__PURE__ */ K("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), Uo = /* @__PURE__ */ K("<section><h2 class=\"svelte-1341oik\">Shoes</h2> <!></section>"), Wo = /* @__PURE__ */ K("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!>", 1);
function Go(e, t) {
	let n = Ir();
	A(t, !0);
	let r = /* @__PURE__ */ N(() => Ea(t.person.pbs));
	var i = Wo(), a = R(i), o = (e) => {
		var r = Ho(), i = L(r);
		_o(B(i, 2), { get plan() {
			return t.person.plan;
		} }), O(r), V(() => {
			$(r, "aria-labelledby", `${n}-plan`), $(i, "id", `${n}-plan`);
		}), q(e, r);
	};
	Y(a, (e) => {
		t.person.plan && e(o);
	});
	var s = B(a, 2), c = L(s);
	fo(B(c, 2), {
		get person() {
			return t.id;
		},
		get items() {
			return t.person.feed;
		},
		get canEdit() {
			return t.canEdit;
		},
		get records() {
			return W(r);
		}
	}), O(s);
	var l = B(s, 2), u = L(l), d = z(B(L(u)));
	O(u), Ua(B(u, 2), { get badges() {
		return t.person.badges;
	} }), O(l);
	var f = B(l, 2), p = L(f);
	Lo(B(p, 2), { get person() {
		return t.person;
	} }), O(f);
	var m = B(f, 2), h = (e) => {
		var r = Uo(), i = L(r);
		Vo(B(i, 2), { get shoes() {
			return t.person.shoes;
		} }), O(r), V(() => {
			$(r, "aria-labelledby", `${n}-shoes`), $(i, "id", `${n}-shoes`);
		}), q(e, r);
	};
	Y(m, (e) => {
		t.person.shoes?.length && e(h);
	}), V(() => {
		$(s, "aria-labelledby", `${n}-feed`), $(c, "id", `${n}-feed`), $(l, "aria-labelledby", `${n}-badges`), $(u, "id", `${n}-badges`), J(d, `${t.person.badges.count ?? ""} unlocked`), $(f, "aria-labelledby", `${n}-pbs`), $(p, "id", `${n}-pbs`);
	}), q(e, i), j();
}
// src/lib/ui/Goals.svelte
var Ko = /* @__PURE__ */ K("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), qo = /* @__PURE__ */ K("<p class=\"msg\" role=\"status\"> </p>"), Jo = /* @__PURE__ */ K("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!></section>"), Yo = /* @__PURE__ */ K("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), Xo = /* @__PURE__ */ K("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), Zo = /* @__PURE__ */ K("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), Qo = /* @__PURE__ */ K("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function $o(e, t) {
	let n = Ir();
	A(t, !0);
	let i = [], a = (e, n = h, r = h, i = h) => {
		let a = /* @__PURE__ */ N(() => {
			let [e, t, n] = ca[r()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var o = Ko(), s = L(o), c = z(s, !0), l = B(s, 2), u = B(l, 2), d = z(u, !0), f = B(u, 2);
		O(o), V((e, s, u, p) => {
			$(o, "aria-label", i()), J(c, e), $(l, "aria-label", `Fewer ${s ?? ""}`), l.disabled = t.readOnly || n()[r()] <= W(a).lo, J(d, u), $(f, "aria-label", `More ${p ?? ""}`), f.disabled = t.readOnly || n()[r()] >= W(a).hi;
		}, [
			() => i().split(",")[0],
			() => p(i()),
			() => m(r(), n()[r()]),
			() => p(i())
		]), G("click", l, () => n()[r()] = da(r(), n()[r()] - W(a).step)), G("click", f, () => n()[r()] = da(r(), n()[r()] + W(a).step)), q(e, o);
	}, o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(!1);
	Pi(() => {
		r("settings").then((e) => {
			I(o, e, !0), I(c, fa(e, t.people), !0);
		}, (e) => I(s, e, !0));
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
		I(l, !0);
		let e = await Ia(Ye(W(c)), t.people);
		I(l, !1), e && t.onsaved();
	}
	var _ = Qo(), v = B(R(_), 2), y = (e) => {
		var t = qo(), n = z(t, !0);
		V(() => J(n, W(s) ? W(s).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), q(e, t);
	}, b = (e) => {
		var r = Zo(), s = R(r), p = z(s), m = B(s, 2);
		X(m, 16, () => Object.keys(W(c).people), (e) => e, (e, r) => {
			let i = /* @__PURE__ */ N(() => t.people[r]?.name ?? r);
			var o = Jo(), s = L(o), l = z(s, !0);
			X(B(s, 2), 16, () => la, (e) => e, (e, t) => {
				a(e, () => W(c).people[r], () => t, () => `${u[t]}, ${W(i)}`);
			}), O(o), V(() => {
				$(o, "aria-labelledby", `${n}-${r ?? ""}`), $(s, "id", `${n}-${r ?? ""}`), J(l, W(i));
			}), q(e, o);
		});
		var h = B(m, 2), _ = L(h), v = B(_, 2);
		X(v, 21, () => d, (e) => e.mode, (e, r) => {
			var a = Yo();
			let o;
			var s = L(a);
			mi(s);
			var l, u = B(s, 1, !0);
			O(a), V(() => {
				o = Z(a, 1, "svelte-7wncvy", null, o, { on: W(c).couple.mode === W(r).mode }), $(s, "name", `${n}-mode`), s.disabled = t.readOnly, l !== (l = W(r).mode) && (s.value = (s.__value = l) ?? ""), J(u, W(r).label);
			}), bi(i, [], s, () => (W(r).mode, W(c).couple.mode), (e) => W(c).couple.mode = e), q(e, a);
		}), O(v);
		var y = B(v, 2), b = z(y, !0), x = B(y, 2), S = (e) => {
			a(e, () => W(c).couple, () => W(c).couple.mode, () => f[W(c).couple.mode]);
		};
		Y(x, (e) => {
			f[W(c).couple.mode] && e(S);
		});
		var ee = B(x, 2), C = B(L(ee), 2);
		mi(C), O(ee), O(h);
		var w = B(h, 2), te = (e) => {
			var t = Xo();
			V(() => t.disabled = W(l)), G("click", t, g), q(e, t);
		};
		Y(w, (e) => {
			t.readOnly || e(te);
		}), V((e, r) => {
			J(p, `Applies from this week (week ${e ?? ""})`), $(h, "aria-labelledby", `${n}-couple`), $(_, "id", `${n}-couple`), $(v, "aria-labelledby", `${n}-couple`), J(b, r), C.disabled = t.readOnly;
		}, [() => pa(W(o).week_start), () => d.find((e) => e.mode === W(c).couple.mode).hint]), vi(C, () => W(c).couple.reward, (e) => W(c).couple.reward = e), q(e, r);
	};
	Y(v, (e) => {
		W(c) ? e(b, -1) : e(y);
	}), q(e, _), j();
}
Tr(["click"]);
// src/lib/ui/Header.svelte
var es = /* @__PURE__ */ K("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), ts = /* @__PURE__ */ K("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), ns = /* @__PURE__ */ K("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function rs(e, t) {
	let n = Ni(t, "subtitle", 3, ""), r = Ni(t, "actionLabel", 3, ""), i = /* @__PURE__ */ F(0);
	var a = ns();
	let o;
	var s = L(a), c = L(s), l = (e) => {
		var n = es();
		G("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), q(e, n);
	};
	Y(c, (e) => {
		t.onback && e(l);
	});
	var u = B(c, 2), d = L(u), f = z(d, !0), p = B(d, 2), m = (e) => {
		var n = ts(), i = z(n, !0);
		V(() => J(i, r())), G("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), q(e, n);
	};
	Y(p, (e) => {
		t.onaction && e(m);
	}), O(u);
	var h = z(B(u, 2), !0);
	O(s), O(a), V(() => {
		o = Z(a, 1, "svelte-16l0jix", null, o, { scrolled: W(i) > 0 }), J(f, t.title), J(h, n() || "\xA0");
	}), Oi("y", () => W(i), (e) => I(i, e, !0)), q(e, a);
}
Tr(["click"]);
// src/lib/ui/Rings.svelte
var is = /* @__PURE__ */ Pr("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), as = /* @__PURE__ */ Pr("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function os(e, t) {
	A(t, !0);
	let n = Ni(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, a = /* @__PURE__ */ F($t(Wa.reducedMotion ? i : 0)), o = /* @__PURE__ */ N(() => n() * .11), s = /* @__PURE__ */ N(() => t.fractions.map((e, t) => {
		let s = n() / 2 - W(o) / 2 - t * W(o) * 1.3, c = 2 * Math.PI * s;
		return {
			kind: r[t],
			r: s,
			c,
			len: c * e * W(a) / i
		};
	}));
	Pi(() => {
		if (W(a) === i) return;
		let e = Ja(Za({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => I(a, e, !0) });
		return e.to(i), e.stop;
	});
	var c = as();
	let l;
	X(c, 21, () => W(s), (e) => e.kind, (e, t) => {
		var r = is(), i = R(r);
		let a;
		var s = B(i);
		let c;
		V(() => {
			$(i, "cx", n() / 2), $(i, "cy", n() / 2), $(i, "r", W(t).r), $(i, "stroke-width", W(o)), a = Q(i, "", a, { stroke: `var(--${W(t).kind ?? ""})` }), $(s, "cx", n() / 2), $(s, "cy", n() / 2), $(s, "r", W(t).r), $(s, "stroke-width", W(o)), $(s, "stroke-dasharray", `${W(t).len ?? ""} ${W(t).c ?? ""}`), $(s, "opacity", +(W(t).len > .01)), $(s, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = Q(s, "", c, { stroke: `var(--${W(t).kind ?? ""})` });
		}), q(e, r);
	}), O(c), V(() => {
		$(c, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), l = Q(c, "", l, { width: `${n() / 16}rem` });
	}), q(e, c), j();
}
// src/lib/ui/PersonTile.svelte
var ss = /* @__PURE__ */ K("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), cs = /* @__PURE__ */ K("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), ls = /* @__PURE__ */ K("<span class=\"streak svelte-1handop\"> </span>"), us = /* @__PURE__ */ K("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), ds = /* @__PURE__ */ K("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), fs = /* @__PURE__ */ K("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), ps = /* @__PURE__ */ K("<span class=\"steps svelte-1handop\"> </span>"), ms = /* @__PURE__ */ K("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), hs = /* @__PURE__ */ K("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), gs = /* @__PURE__ */ K("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function _s(e, t) {
	A(t, !0);
	let n = Ni(t, "index", 3, 0), r = Ni(t, "compact", 3, !1), i = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], a = /* @__PURE__ */ N(() => i[n() % i.length]), o = /* @__PURE__ */ N(() => y(W(a), 2)), s = /* @__PURE__ */ N(() => W(o)[0]), c = /* @__PURE__ */ N(() => W(o)[1]), l = /* @__PURE__ */ N(() => qi(t.person)), u = /* @__PURE__ */ N(() => t.person.week), d = [
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
	], f = /* @__PURE__ */ N(() => d.map((e, t) => ({
		...e,
		n: Vi(W(u))[t],
		of: Bi(W(u))[t]
	}))), p = /* @__PURE__ */ N(() => Wi(t.person.steps_today, W(u).goal.steps)), m = /* @__PURE__ */ N(() => [
		`Level ${W(l).level}`,
		r() ? `🔥 ${t.person.streak} wk` : `${t.person.xp.toLocaleString()} XP`,
		W(u).paused && "Week paused",
		W(u).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), h = /* @__PURE__ */ N(() => `${t.person.name}, level ${W(l).level}. This week ${W(f).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${W(u).goal_pending ? "New goals pending. " : ""}${W(u).bonus ? "Weekly bonus earned. " : ""}${W(p) ? W(p).replace("👟 ", "") + ". " : ""}Streak ${t.person.streak} weeks.`);
	var g = gs();
	let _;
	var v = L(g), b = L(v), x = L(b);
	let S;
	var ee = z(x, !0), C = B(x, 2), w = L(C), te = z(w, !0), ne = z(B(w, 2), !0);
	O(C);
	var re = B(C, 2), ie = (e) => {
		var t = cs(), n = R(t), r = L(n);
		{
			let e = /* @__PURE__ */ N(() => Hi(W(u)));
			os(r, {
				get fractions() {
					return W(e);
				},
				size: 44
			});
		}
		var i = B(r, 2), a = (e) => {
			q(e, ss());
		};
		Y(i, (e) => {
			W(u).bonus && e(a);
		}), O(n);
		var o = z(B(n, 2), !0);
		V(() => J(o, W(h))), q(e, t);
	}, ae = (e) => {
		var n = ls(), r = z(n);
		V(() => J(r, `🔥 ${t.person.streak ?? ""} wk`)), q(e, n);
	};
	Y(re, (e) => {
		r() ? e(ie) : e(ae, -1);
	});
	var oe = B(re, 2), se = (e) => {
		q(e, us());
	};
	Y(oe, (e) => {
		t.onopen && e(se);
	}), O(b);
	var ce = B(b, 2), le = (e) => {
		var t = ms(), n = R(t), r = L(n), i = L(r);
		{
			let e = /* @__PURE__ */ N(() => Hi(W(u))), t = /* @__PURE__ */ N(() => Wa.wide ? 112 : 88);
			os(i, {
				get fractions() {
					return W(e);
				},
				get size() {
					return W(t);
				}
			});
		}
		var a = B(i, 2), o = (e) => {
			q(e, ds());
		};
		Y(a, (e) => {
			W(u).bonus && e(o);
		}), O(r);
		var s = B(r, 2);
		X(s, 21, () => W(f), (e) => e.kind, (e, t) => {
			var n = fs(), r = L(n), i = L(r);
			let a;
			var o = B(i, 1, !0);
			O(r);
			var s = B(r, 2), c = L(s, !0), l = z(B(c));
			O(s), O(n), V(() => {
				a = Q(i, "", a, { background: `var(--${W(t).kind ?? ""})` }), J(o, W(t).label), J(c, W(t).n), J(l, `/${W(t).of ?? ""}`);
			}), q(e, n);
		}), O(s), O(n);
		var c = B(n, 2), d = (e) => {
			var t = ps(), n = z(t, !0);
			V(() => J(n, W(p))), q(e, t);
		};
		Y(c, (e) => {
			W(p) && e(d);
		});
		var m = B(c, 2), h = L(m), g = L(h);
		let _;
		O(h);
		var v = z(B(h, 2));
		O(m), V((e, t) => {
			_ = Q(g, "", _, { width: `${W(l).frac * 100}%` }), J(v, `${e ?? ""} of ${t ?? ""} XP to level ${W(l).level + 1}`);
		}, [() => W(l).into.toLocaleString(), () => W(l).span.toLocaleString()]), q(e, t);
	};
	Y(ce, (e) => {
		r() || e(le);
	}), O(v);
	var ue = B(v, 2), de = (e) => {
		var n = hs();
		V(() => $(n, "aria-label", W(h))), G("click", n, function(...e) {
			t.onopen?.apply(this, e);
		}), q(e, n);
	};
	Y(ue, (e) => {
		t.onopen && e(de);
	}), O(g), V((e) => {
		_ = Z(g, 1, "tile glass svelte-1handop", null, _, {
			compact: r(),
			opens: t.onopen
		}), $(v, "aria-hidden", t.onopen ? "true" : void 0), S = Q(x, "", S, {
			"--a1": W(s),
			"--a2": W(c)
		}), J(ee, e), J(te, t.person.name), J(ne, W(m));
	}, [() => t.person.name.slice(0, 1)]), q(e, g), j();
}
Tr(["click"]);
// src/lib/ui/Sheet.svelte
var vs = /* @__PURE__ */ K("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), ys = /* @__PURE__ */ K("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function bs(e, t) {
	A(t, !0);
	let n = Ni(t, "from", 3, null), r = 1e3, i = Wa.reducedMotion, a = /* @__PURE__ */ F($t(i ? r : 0)), o = /* @__PURE__ */ F(0), s = /* @__PURE__ */ F(1), c = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F("50% 100%"), u, d, f = !1, p = null, m = /* @__PURE__ */ N(() => i ? +W(c) : Math.min(1, W(a) / 500)), h = /* @__PURE__ */ N(() => i ? 1 : .5 + .5 * W(a) / r), g = () => {
		f && (W(a) === 0 || W(o) >= W(s)) && (f = !1, t.onclose());
	};
	function _(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = Za({
					value: r,
					damping: o,
					response: s
				}), n = Ja(t, {
					onFrame: e,
					onSettle: g
				}), n.to(i, a);
			}
		};
	}
	let v = _((e) => I(a, e, !0)), y = _((e) => I(o, e, !0));
	function b() {
		f || p || (f = !0, i ? (I(c, !1), setTimeout(t.onclose, Xa("--fade"))) : v.to(W(a), 0, { response: .3 }));
	}
	function x(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), v.stop(), y.stop(), f = !1, p = {
			from: W(o),
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
		I(o, t < 0 ? -xo(-t, W(s)) : t, !0), p.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), p.samples.length > 8 && p.samples.shift();
	}
	function ee(e) {
		if (!p) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = bo([...p.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		p = null, yo(W(o), n, W(s)) ? i ? b() : (f = !0, y.to(W(o), W(s), {
			velocity: n,
			response: .3
		})) : i ? I(o, 0) : (y.to(W(o), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), W(a) < r && v.to(W(a), r));
	}
	Pi(() => {
		if (n()) {
			let e = n().getBoundingClientRect();
			I(l, `${e.left + e.width / 2 - u.offsetLeft}px ${e.top + e.height / 2 - u.offsetTop}px`);
		}
		d.focus({ preventScroll: !0 });
		let e = document.documentElement;
		return e.style.overflow = "hidden", i ? requestAnimationFrame(() => I(c, !0)) : v.to(0, r), () => {
			v.stop(), y.stop(), e.style.overflow = "";
		};
	});
	var C = { close: b }, w = ys();
	wr("keydown", nn, (e) => e.key === "Escape" && b());
	var te = R(w);
	let ne, re;
	var ie = B(te, 2);
	let ae, oe;
	var se = L(ie), ce = B(L(se), 2), le = L(ce), ue = (e) => {
		var n = vs();
		G("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), q(e, n);
	};
	Y(le, (e) => {
		t.onback && e(ue);
	});
	var de = B(le, 2);
	Di(de, (e) => d = e, () => d), O(ce), O(se);
	var fe = B(se, 2);
	return ti(L(fe), () => t.children), O(fe), O(ie), Di(ie, (e) => u = e, () => u), V((e) => {
		ne = Z(te, 1, "scrim svelte-185xwm9", null, ne, { fade: i }), re = Q(te, "", re, { opacity: e }), ae = Z(ie, 1, "sheet svelte-185xwm9", null, ae, { fade: i }), $(ie, "aria-label", t.label), oe = Q(ie, "", oe, {
			opacity: W(m),
			transform: `translate3d(0, ${W(o) ?? ""}px, 0) scale(${W(h) ?? ""})`,
			"transform-origin": W(l)
		});
	}, [() => W(m) * Math.min(1, Math.max(0, 1 - W(o) / W(s)))]), G("click", te, b), G("pointerdown", se, x), G("pointermove", se, S), G("pointerup", se, ee), wr("pointercancel", se, ee), G("click", de, b), Ti(ie, "offsetHeight", (e) => I(s, e)), q(e, w), j(C);
}
Tr([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var xs = /* @__PURE__ */ K("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), Ss = /* @__PURE__ */ K("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), Cs = /* @__PURE__ */ K("<p class=\"caption stale svelte-9nj5u4\"> </p>"), ws = /* @__PURE__ */ K("<!> <!> <!>", 1);
function Ts(e, t) {
	A(t, !0);
	let n = /* @__PURE__ */ N(() => t.scoredAt ? Yi(t.scoredAt, t.now) : null);
	var r = ws(), i = R(r), a = (e) => {
		var n = xs(), r = B(L(n));
		O(n), V(() => J(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), q(e, n);
	};
	Y(i, (e) => {
		t.configError && e(a);
	});
	var o = B(i, 2), s = (e) => {
		var n = Ss(), r = B(L(n));
		O(n), V(() => J(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), q(e, n);
	};
	Y(o, (e) => {
		t.settingsError && e(s);
	});
	var c = B(o, 2), l = (e) => {
		var t = Cs(), r = z(t, !0);
		V(() => J(r, W(n))), q(e, t);
	};
	Y(c, (e) => {
		W(n) && e(l);
	}), q(e, r), j();
}
// node_modules/svelte/src/internal/flags/legacy.js
qe();
// src/lib/ui/Toast.svelte
var Es = /* @__PURE__ */ K("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), Ds = /* @__PURE__ */ K("<span> </span> <!>", 1), Os = /* @__PURE__ */ K("<div role=\"status\" aria-live=\"polite\"><!></div>");
function ks(e, t) {
	A(t, !1);
	function n() {
		let e = ka.undo;
		Object.assign(ka, {
			on: !1,
			undo: null
		}), e();
	}
	ki();
	var r = Os();
	let i;
	var a = L(r), o = (e) => {
		var t = Ds(), r = R(t), i = z(r, !0), a = B(r, 2), o = (e) => {
			var t = Es();
			G("click", t, n), q(e, t);
		};
		Y(a, (e) => {
			ka.undo && e(o);
		}), V(() => J(i, ka.text)), q(e, t);
	};
	Y(a, (e) => {
		ka.on && e(o);
	}), O(r), V(() => i = Z(r, 1, "toast svelte-1fk2ial", null, i, { on: ka.on })), q(e, r), j();
}
Tr(["click"]);
// src/lib/ui/Together.svelte
var As = /* @__PURE__ */ K("<p class=\"progress svelte-1tya3no\"> </p>"), js = /* @__PURE__ */ K("<p> </p>"), Ms = /* @__PURE__ */ K("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), Ns = /* @__PURE__ */ K("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function Ps(e, t) {
	A(t, !0);
	let n = /* @__PURE__ */ N(() => t.group.week ? Gi(t.group.week, t.people) : ""), r = /* @__PURE__ */ N(() => t.group.week ? Ki(t.group.week) : null), i = /* @__PURE__ */ N(() => [
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
	var a = Ns(), o = B(L(a), 2), s = (e) => {
		var t = As(), r = z(t, !0);
		V(() => J(r, W(n))), q(e, t);
	};
	Y(o, (e) => {
		W(n) && e(s);
	});
	var c = B(o, 2), l = (e) => {
		var n = js();
		let i;
		var a = z(n, !0);
		V(() => {
			i = Z(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), J(a, W(r));
		}), q(e, n);
	};
	Y(c, (e) => {
		W(r) && e(l);
	});
	var u = B(c, 2);
	X(u, 21, () => W(i), (e) => e.k, (e, t) => {
		var n = Ms(), r = L(n), i = z(r, !0), a = B(r), o = L(a, !0), s = z(B(o), !0);
		O(a), O(n), V(() => {
			J(i, W(t).k), J(o, W(t).v), J(s, W(t).unit);
		}), q(e, n);
	}), O(u), O(a), q(e, a), j();
}
// src/App.svelte
var Fs = /* @__PURE__ */ K("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), Is = /* @__PURE__ */ K("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), Ls = /* @__PURE__ */ K("<div class=\"tiles compact svelte-1n46o8q\"></div>"), Rs = /* @__PURE__ */ K("<!> <!>", 1), zs = /* @__PURE__ */ K("<div class=\"tiles svelte-1n46o8q\"></div>"), Bs = /* @__PURE__ */ K("<!> <!> <!> <!>", 1), Vs = /* @__PURE__ */ K("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function Hs(e, t) {
	A(t, !0);
	let n = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), i = new URLSearchParams(n.location.search), a = i.get("person"), o = /^\/(?!\/)/.test(i.get("back") ?? "") ? i.get("back") : null, s = o && (() => {
		n.history.pushState(null, "", o), n.dispatchEvent(new Event("location-changed"));
	}), c = /* @__PURE__ */ F(null), l = (e) => (t) => I(c, {
		id: e,
		from: t.currentTarget
	}, !0), u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ F(void 0);
	async function f() {
		let e = W(c)?.from ?? W(u)?.from;
		I(c, I(u, null), !0), await fr(), e?.focus({ preventScroll: !0 });
	}
	let p = /* @__PURE__ */ F(null), m = /* @__PURE__ */ F(null), h = /* @__PURE__ */ F($t(/* @__PURE__ */ new Date())), g;
	async function _() {
		if (clearTimeout(g), !document.hidden) {
			try {
				I(p, await r("scores"), !0), I(m, null), Fa(W(p).people), a && Object.hasOwn(W(p).people, a) && a !== ra(W(p).viewer, W(p).people).self && I(c, {
					id: a,
					from: null
				}, !0), a = null;
			} catch (e) {
				I(m, e, !0);
			}
			I(h, /* @__PURE__ */ new Date(), !0), clearTimeout(g), g = setTimeout(_, W(p) ? 6e4 : 3e4);
		}
	}
	Sn(() => {
		_();
		let e = () => document.hidden || _();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(g), document.removeEventListener("visibilitychange", e);
		};
	});
	let v = /* @__PURE__ */ N(() => ga(W(p)?.people ?? {}, Aa.entry)), y = /* @__PURE__ */ N(() => Object.keys(W(v))), b = /* @__PURE__ */ N(() => ra(W(p)?.viewer ?? {}, W(v))), x = /* @__PURE__ */ N(() => W(v)[W(b).self ?? W(y)[0]]?.week), S = (e) => !!W(p)?.viewer?.can_edit?.includes(e), ee = /* @__PURE__ */ N(() => !!W(c) && Object.hasOwn(W(v), W(c).id) || !!W(u) && !!W(p));
	var C = Vs(), w = R(C), te = L(w);
	{
		let e = /* @__PURE__ */ N(() => W(x) ? Ji(W(x)) : ""), t = /* @__PURE__ */ N(() => W(p) ? (e) => I(u, { from: e.currentTarget }, !0) : void 0);
		rs(te, {
			title: "Training",
			get subtitle() {
				return W(e);
			},
			get onback() {
				return s;
			},
			actionLabel: "Goals",
			get onaction() {
				return W(t);
			}
		});
	}
	var ne = B(te, 2), re = L(ne), ie = (e) => {
		var t = Is(), n = B(R(t), 2), r = (e) => {
			var t = Fs(), n = z(t, !0);
			V(() => J(n, W(m).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), q(e, t);
		};
		Y(n, (e) => {
			W(m) && e(r);
		}), q(e, t);
	}, ae = (e) => {
		var t = Bs(), n = R(t);
		Ts(n, {
			get scoredAt() {
				return W(p).scored_at;
			},
			get configError() {
				return W(p).config_error;
			},
			get settingsError() {
				return W(p).settings_error;
			},
			get now() {
				return W(h);
			}
		});
		var r = B(n, 2), i = (e) => {
			var t = Rs(), n = R(t), r = (e) => {
				var t = Ls();
				X(t, 20, () => W(b).others, (e) => e, (e, t) => {
					{
						let n = /* @__PURE__ */ N(() => W(y).indexOf(t)), r = /* @__PURE__ */ N(() => l(t));
						_s(e, {
							get person() {
								return W(v)[t];
							},
							get index() {
								return W(n);
							},
							compact: !0,
							get onopen() {
								return W(r);
							}
						});
					}
				}), O(t), q(e, t);
			};
			Y(n, (e) => {
				W(b).others.length && e(r);
			});
			var i = B(n, 2);
			{
				let e = /* @__PURE__ */ N(() => W(y).indexOf(W(b).self));
				_s(i, {
					get person() {
						return W(v)[W(b).self];
					},
					get index() {
						return W(e);
					}
				});
			}
			q(e, t);
		}, a = (e) => {
			var t = zs();
			X(t, 20, () => W(b).others, (e) => e, (e, t) => {
				{
					let n = /* @__PURE__ */ N(() => W(y).indexOf(t)), r = /* @__PURE__ */ N(() => l(t));
					_s(e, {
						get person() {
							return W(v)[t];
						},
						get index() {
							return W(n);
						},
						get onopen() {
							return W(r);
						}
					});
				}
			}), O(t), q(e, t);
		};
		Y(r, (e) => {
			W(b).self ? e(i) : e(a, -1);
		});
		var o = B(r, 2), s = (e) => {
			Ps(e, {
				get group() {
					return W(p).group;
				},
				get people() {
					return W(v);
				}
			});
		};
		Y(o, (e) => {
			W(p).group && e(s);
		});
		var c = B(o, 2), u = (e) => {
			{
				let t = /* @__PURE__ */ N(() => S(W(b).self));
				Go(e, {
					get id() {
						return W(b).self;
					},
					get person() {
						return W(v)[W(b).self];
					},
					get canEdit() {
						return W(t);
					}
				});
			}
		};
		Y(c, (e) => {
			W(b).self && e(u);
		}), q(e, t);
	};
	Y(re, (e) => {
		W(p) ? e(ae, -1) : e(ie);
	}), O(ne), O(w);
	var oe = B(w, 2), se = (e) => {
		Di(bs(e, {
			label: "Goals",
			get from() {
				return W(u).from;
			},
			onclose: f,
			get onback() {
				return s;
			},
			children: (e, t) => {
				{
					let t = /* @__PURE__ */ N(() => !W(b).self);
					$o(e, {
						get people() {
							return W(p).people;
						},
						get readOnly() {
							return W(t);
						},
						onsaved: () => W(d)?.close()
					});
				}
			},
			$$slots: { default: !0 }
		}), (e) => I(d, e, !0), () => W(d));
	}, ce = (e) => {
		bs(e, {
			get label() {
				return `${W(v)[W(c).id].name ?? ""}'s details`;
			},
			get from() {
				return W(c).from;
			},
			onclose: f,
			get onback() {
				return s;
			},
			children: (e, t) => {
				var n = Rs(), r = R(n);
				{
					let e = /* @__PURE__ */ N(() => W(y).indexOf(W(c).id));
					_s(r, {
						get person() {
							return W(v)[W(c).id];
						},
						get index() {
							return W(e);
						}
					});
				}
				var i = B(r, 2);
				{
					let e = /* @__PURE__ */ N(() => S(W(c).id));
					Go(i, {
						get id() {
							return W(c).id;
						},
						get person() {
							return W(v)[W(c).id];
						},
						get canEdit() {
							return W(e);
						}
					});
				}
				q(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	Y(oe, (e) => {
		W(u) && W(p) ? e(se) : W(ee) && e(ce, 1);
	}), ks(B(oe, 2), {}), V(() => w.inert = W(ee)), q(e, C), j();
}
// src/main.js
var Us = (e) => Vr(Hs, { target: e }), Ws = () => new Promise((e) => {
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
		document.documentElement.dataset.theme = n ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Ws().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", Us(e);
		}));
	}
});
