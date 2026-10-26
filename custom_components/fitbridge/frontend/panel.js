// src/lib/api.js
var e, t = (t) => e = t, n = (t, n) => e ? e.fetchWithAuth(t, n) : fetch(t, n);
async function r(t, r, i) {
	if (!e && t !== "GET") return console.info("demo:", t, r, i), { ok: !0 };
	let a = await n(e ? "/api/fitbridge/ui/" + r : `./demo-${r}.json`, {
		method: t,
		headers: i === void 0 ? {} : { "Content-Type": "application/json" },
		body: i === void 0 ? void 0 : JSON.stringify(i)
	});
	if (!a.ok) {
		let e = Error(String(a.status));
		e.status = a.status;
		try {
			let t = (await a.json()).detail;
			typeof t == "string" && (e.detail = t);
		} catch {}
		throw e;
	}
	return a.status === 204 ? null : a.json();
}
var i = (e) => r("GET", e), a = Array.isArray, o = Array.prototype.indexOf, s = Array.prototype.includes, c = Array.from, l = Object.defineProperty, u = Object.getOwnPropertyDescriptor, d = Object.getOwnPropertyDescriptors, f = Object.prototype, p = Array.prototype, m = Object.getPrototypeOf, h = Object.isExtensible, g = () => {};
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
var b = 1024, x = 2048, S = 4096, ee = 8192, te = 16384, ne = 32768, re = 1 << 25, ie = 65536, ae = 1 << 19, oe = 1 << 20, se = 1 << 25, ce = 1 << 21, le = 1 << 22, ue = 1 << 23, de = Symbol("$state"), fe = Symbol("component"), pe = Symbol("legacy props"), me = Symbol(""), he = Symbol("attributes"), ge = Symbol("class"), _e = Symbol("style"), ve = Symbol("text"), ye = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), be = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), xe = {}, C = Symbol("uninitialized"), Se = "http://www.w3.org/1999/xhtml";
function Ce() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function we(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Te() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var w = !1;
function Ee(e) {
	w = e;
}
var T;
function E(e) {
	if (e === null) throw we(), xe;
	return T = e;
}
function De() {
	return E(/* @__PURE__ */ Xt(T));
}
function D(e) {
	if (w) {
		if (/* @__PURE__ */ Xt(T) !== null) throw we(), xe;
		T = e;
	}
}
function Oe(e = 1) {
	if (w) {
		for (var t = e, n = T; t--;) n = /* @__PURE__ */ Xt(n);
		T = n;
	}
}
function ke(e = !0) {
	for (var t = 0, n = T;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ Xt(n);
		e && n.remove(), n = i;
	}
}
function Ae(e) {
	if (!e || e.nodeType !== 8) throw we(), xe;
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
// node_modules/svelte/src/internal/client/context.js
var O = null;
function Ke(e) {
	O = e;
}
function qe(e, t = !1, n) {
	O = {
		p: O,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: G,
		l: null
	};
}
function Je(e) {
	var t = O, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) dn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, O = t.p, Ye(e);
}
function Ye(e = {}) {
	return l(e, fe, { value: !0 }), e;
}
function Xe() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var Ze = [];
function Qe() {
	var e = Ze;
	Ze = [], _(e);
}
function $e(e) {
	if (Ze.length === 0 && !bt) {
		var t = Ze;
		queueMicrotask(() => {
			t === Ze && Qe();
		});
	}
	Ze.push(e);
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var et = ~(x | S | b);
function k(e, t) {
	e.f = e.f & et | t;
}
function tt(e) {
	e.f & 512 || e.deps === null ? k(e, b) : k(e, S);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function nt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), k(e, b);
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function rt(e) {
	var t = U, n = G;
	W(null), jn(null);
	try {
		return e();
	} finally {
		W(t), jn(n);
	}
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function it(e, t, n, r) {
	let i = Xe() ? ct : dt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = G, c = at(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				rn(e, s);
			}
			ot();
		}
	}
	var d = st();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ ut(e))).then(u).catch((e) => rn(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), ot());
	}) : f();
}
function at() {
	var e = G, t = U, n = O, r = j;
	return function(i = !0) {
		jn(e), W(t), Ke(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ot(e = !0) {
	jn(null), W(null), Ke(null), e && j?.deactivate();
}
function st() {
	var e = G, t = e.b, n = j, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ct(e) {
	var t = 2 | x;
	return G !== null && (G.f |= ae), {
		ctx: O,
		deps: null,
		effects: null,
		equals: je,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: C,
		wv: 0,
		parent: G,
		ac: null
	};
}
var lt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function ut(e, t, n) {
	let r = G;
	r === null && Fe();
	var i = void 0, a = It(C), o = !U, s = /* @__PURE__ */ new Set();
	return mn(() => {
		var t = G, n = v();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ye && n.reject(e);
			}).finally(ot);
		} catch (e) {
			n.reject(e), ot();
		}
		var c = j;
		if (o) {
			if (t.f & 32768) var l = st();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(lt);
			else for (let e of s.values()) e.reject(lt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== lt && (c.activate(), t ? (a.f |= ue, Bt(a, t)) : (a.f & 8388608 && (a.f ^= ue), Bt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), ln(() => {
		for (let e of s) e.reject(lt);
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
function A(e) {
	let t = /* @__PURE__ */ ct(e);
	return Nn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function dt(e) {
	let t = /* @__PURE__ */ ct(e);
	return t.equals = Ne, t;
}
function ft(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) H(t[n]);
	}
}
function pt(e) {
	var t, n = G, r = e.parent;
	if (!On && r !== null && e.v !== C && r.f & 24576) return Ce(), e.v;
	jn(r);
	try {
		ft(e), t = Hn(e);
	} finally {
		jn(n);
	}
	return t;
}
function mt(e) {
	var t = pt(e);
	!e.equals(t) && (e.wv = zn(), (!j?.is_fork || e.deps === null) && (j === null ? e.v = t : (j.capture(e, t, !0), vt?.capture(e, t, !0)), e.deps === null)) ? k(e, b) : On || (M === null ? tt(e) : (cn() || j?.is_fork) && M.set(e, t));
}
function ht(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && rt(() => {
		t.ac.abort(ye), t.ac = null;
	}), t.fn !== null && (t.teardown = g), Gn(t, 0), vn(t));
}
function gt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Kn(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var _t = null, j = null, vt = null, M = null, yt = null, bt = !1, xt = !1, St = null, Ct = null, wt = 0, Tt = 1, Et = class e {
	id = Tt++;
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
		_t === null ? _t = this : (_t.#n = this, this.#t = _t), _t = this;
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
			for (var r of n.d) k(r, x), t(r);
			for (r of n.m) k(r, S), t(r);
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
		for (let e of this.#u) this.#d.delete(e), k(e, x), this.schedule(e);
		for (let e of this.#d) k(e, S), this.schedule(e);
		this.apply();
		for (var t = St = [], n = [], r = Ct = []; this.#c.length > 0;) {
			wt++ > 1e3 && (this.#S(), Dt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Mt(e), this.#h() || this.discard(), t;
			}
		}
		if (j = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (St = null, Ct = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) jt(e, t);
			r.length > 0 && j.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), vt = this, kt(n), kt(t), vt = null, this.#s?.resolve();
			var o = j;
			if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
				if (o !== null) {
					for (let e of this.#c) o.#c.push(e);
					this.#c = [];
				} else o = this;
			}
			o !== null && (Pt.clear(), o.#_());
		}
	}
	#v(e, t, n) {
		e.f ^= b;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= b : i & 4 ? t.push(r) : Bn(r) && (i & 16 && this.#d.add(r), Kn(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), k(i, x), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), j = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) nt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== C && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), M?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		j = this;
	}
	deactivate() {
		j = null, M = null;
	}
	flush() {
		try {
			xt = !0, j = this, this.#_();
		} finally {
			wt = 0, yt = null, St = null, Ct = null, xt = !1, j = null, M = null, Pt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(lt);
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
		this.#m || (this.#m = !0, $e(() => {
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
		if (j === null) {
			let t = j = new e();
			!xt && $e(() => {
				t.#e || t.flush();
			});
		}
		return j;
	}
	apply() {
		M = null;
	}
	schedule(e) {
		yt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? _t = e : t.#t = e, this.linked = !1;
		}
	}
};
function Dt() {
	try {
		Be();
	} catch (e) {
		rn(e, yt);
	}
}
var Ot = null;
function kt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Bn(r) && (Ot = /* @__PURE__ */ new Set(), Kn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && xn(r), Ot?.size > 0)) {
				Pt.clear();
				for (let e of Ot) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Ot.has(n) && (Ot.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Kn(n);
					}
				}
				Ot.clear();
			}
		}
		Ot = null;
	}
}
function At(e) {
	j.schedule(e);
}
function jt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), k(e, b);
		for (var n = e.first; n !== null;) jt(n, t), n = n.next;
	}
}
function Mt(e) {
	k(e, b);
	for (var t = e.first; t !== null;) Mt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Nt = /* @__PURE__ */ new Set(), Pt = /* @__PURE__ */ new Map(), Ft = !1;
function It(e, t) {
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
function N(e, t) {
	let n = It(e, t);
	return Nn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Lt(e, t = !1, n = !0) {
	let r = It(e);
	return t || (r.equals = Ne), r;
}
function P(e, t, n = !1) {
	return U !== null && (!An || U.f & 131072) && Xe() && U.f & 4325394 && (Mn === null || !Mn.has(e)) && We(), Bt(e, n ? Wt(t) : t, Ct);
}
var Rt = null, zt = 0;
function Bt(e, t, n = null) {
	if (!e.equals(t)) {
		On ? Pt.set(e, t) : Pt.has(e) || Pt.set(e, e.v);
		var r = Et.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && pt(t), M === null && tt(t);
		}
		e.wv = zn(), Rt = null, zt = 0, Ut(e, x, n), Rt = null, Xe() && G !== null && G.f & 1024 && !(G.f & 96) && (J === null ? Pn([e]) : J.push(e)), !r.is_fork && Nt.size > 0 && !Ft && Vt();
	}
	return t;
}
function Vt() {
	Ft = !1;
	for (let e of Nt) {
		e.f & 1024 && k(e, S);
		let t;
		try {
			t = Bn(e);
		} catch {
			t = !0;
		}
		t && Kn(e);
	}
	Nt.clear();
}
function Ht(e) {
	P(e, e.v + 1);
}
function Ut(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = Xe(), a = r.length;
		if (zt += a, zt > 1e5 && Rt === null && (Rt = /* @__PURE__ */ new Set()), Rt !== null) {
			if (Rt.has(e)) return;
			Rt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== G) {
				var l = (c & x) === 0;
				if (l && k(s, t), c & 131072) Nt.add(s);
				else if (c & 2) {
					var u = s;
					M?.delete(u), Ut(u, S, n);
				} else if (l) {
					var d = s;
					c & 16 && Ot !== null && Ot.add(d), n === null ? At(d) : n.push(d);
				}
			}
		}
	}
}
function Wt(e) {
	if (typeof e != "object" || !e || de in e || fe in e) return e;
	let t = m(e);
	if (t !== f && t !== p) return e;
	var n = /* @__PURE__ */ new Map(), r = a(e), i = /* @__PURE__ */ N(0), o = null, s = Ln, c = (e) => {
		if (Ln === s) return e();
		var t = U, n = Ln;
		W(null), Rn(s);
		var r = e();
		return W(t), Rn(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ N(e.length, o)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || He();
			var i = n.get(t);
			return i === void 0 ? c(() => {
				var e = /* @__PURE__ */ N(r.value, o);
				return n.set(t, e), e;
			}) : P(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = c(() => /* @__PURE__ */ N(C, o));
					n.set(t, e), Ht(i);
				}
			} else P(r, C), Ht(i);
			return !0;
		},
		get(t, r, i) {
			if (r === de) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || u(t, r)?.writable) && (a = c(() => /* @__PURE__ */ N(Wt(s ? t[r] : C), o)), n.set(r, a)), a !== void 0) {
				var l = Y(a);
				return l === C ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = Y(i);
				if (a === C) return;
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
			if (t === de) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== C || Reflect.has(e, t);
			return (r !== void 0 || G !== null && (!i || u(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ N(i ? Wt(e[t]) : C, o)), n.set(t, r)), Y(r) === C) ? !1 : i;
		},
		set(e, t, a, s) {
			var l = n.get(t), d = t in e;
			if (r && t === "length") for (var f = a; f < l.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ N(C, o)), n.set(f + "", p)) : P(p, C);
			}
			if (l === void 0) (!d || u(e, t)?.writable) && (l = c(() => /* @__PURE__ */ N(void 0, o)), P(l, Wt(a)), n.set(t, l));
			else {
				d = l.v !== C;
				var m = c(() => Wt(a));
				P(l, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, a), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && P(g, _ + 1);
				}
				Ht(i);
			}
			return !0;
		},
		ownKeys(e) {
			Y(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== C;
			});
			for (var [r, a] of n) a.v !== C && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Ue();
		}
	});
}
var Gt, Kt, qt, Jt;
function Yt() {
	if (Gt === void 0) {
		Gt = window, Kt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		qt = u(t, "firstChild").get, Jt = u(t, "nextSibling").get, h(e) && (e[ge] = void 0, e[he] = null, e[_e] = void 0, e.__e = void 0), h(n) && (n[ve] = void 0);
	}
}
function F(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function I(e) {
	return qt.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Xt(e) {
	return Jt.call(e);
}
function L(e, t) {
	if (!w) return /* @__PURE__ */ I(e);
	var n = /* @__PURE__ */ I(T);
	if (n === null) n = T.appendChild(F());
	else if (t && n.nodeType !== 3) {
		var r = F();
		return n?.before(r), E(r), r;
	}
	return t && tn(n), E(n), n;
}
function Zt(e, t = !1) {
	if (!w) {
		var n = /* @__PURE__ */ I(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Xt(n) : n;
	}
	if (t) {
		if (T?.nodeType !== 3) {
			var r = F();
			return T?.before(r), E(r), r;
		}
		tn(T);
	}
	return T;
}
function R(e, t = !1) {
	if (!w) return /* @__PURE__ */ I(e);
	var n = L(e, t);
	return D(e), n;
}
function z(e, t = 1, n = !1) {
	let r = w ? T : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Xt(r);
	if (!w) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = F();
			return r === null ? i?.after(a) : r.before(a), E(a), a;
		}
		tn(r);
	}
	return E(r), r;
}
function Qt(e) {
	e.textContent = "";
}
function $t() {
	return !1;
}
function en(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function tn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function nn(e) {
	var t = G;
	if (t === null) return U.f |= ue, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	rn(e, t);
}
function rn(e, t) {
	if (e === xe) throw e;
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
function an(e) {
	G === null && (U === null && ze(e), Re()), On && Le(e);
}
function on(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function sn(e, t) {
	var n = G;
	n !== null && n.f & 8192 && (e |= ee);
	var r = {
		ctx: O,
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
	j?.register_created_effect(r);
	var i = r;
	if (e & 4) St === null ? Et.ensure().schedule(r) : St.push(r);
	else if (t !== null) {
		try {
			Kn(r);
		} catch (e) {
			throw H(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ie));
	}
	if (i !== null && (i.parent = n, n !== null && on(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function cn() {
	return U !== null && !An;
}
function ln(e) {
	let t = sn(8, null);
	return k(t, b), t.teardown = e, t;
}
function un(e) {
	an("$effect");
	var t = G.f;
	if (!U && t & 32 && O !== null && !O.i) {
		var n = O;
		(n.e ??= []).push(e);
	} else return dn(e);
}
function dn(e) {
	return sn(4 | oe, e);
}
function fn(e) {
	Et.ensure();
	let t = sn(64 | ae, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Sn(t, () => {
			H(t), n(void 0);
		}) : (H(t), n(void 0));
	});
}
function pn(e) {
	return sn(4, e);
}
function mn(e) {
	return sn(le | ae, e);
}
function hn(e, t = 0) {
	return sn(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	it(r, t, n, (t) => {
		sn(8, () => {
			e(...t.map(Y));
		});
	});
}
function gn(e, t = 0) {
	return sn(16 | t, e);
}
function V(e) {
	return sn(32 | ae, e);
}
function _n(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = On, r = U;
		kn(!0), W(null);
		try {
			t.call(null);
		} catch (t) {
			rn(t, e.parent);
		} finally {
			kn(n), W(r);
		}
	}
}
function vn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && rt(() => {
			e.abort(ye);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : H(n, t), n = r;
	}
}
function yn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || H(t), t = n;
	}
}
function H(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (bn(e.nodes.start, e.nodes.end), n = !0), e.f |= re, vn(e, t && !n), Gn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	_n(e), e.f ^= re, e.f |= te;
	var i = e.parent;
	i !== null && i.first !== null && xn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function bn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Xt(e);
		e.remove(), e = n;
	}
}
function xn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Sn(e, t, n = !0) {
	var r = [];
	e.f |= 256, Cn(e, r, !0);
	var i = () => {
		n && H(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Cn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= ee;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Cn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function wn(e) {
	e.f &= -257, Tn(e, !0);
}
function Tn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= ee, e.f & 1024 || (k(e, x), Et.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Tn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function En(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Xt(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Dn = null, On = !1;
function kn(e) {
	On = e;
}
var U = null, An = !1;
function W(e) {
	U = e;
}
var G = null;
function jn(e) {
	G = e;
}
var Mn = null;
function Nn(e) {
	U !== null && (U.f & 2097152 || U.f & 2) && (Mn ??= /* @__PURE__ */ new Set()).add(e);
}
var K = null, q = 0, J = null;
function Pn(e) {
	J = e;
}
var Fn = 1, In = 0, Ln = In;
function Rn(e) {
	Ln = e;
}
function zn() {
	return ++Fn;
}
function Bn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Bn(a) && mt(a), a.wv > e.wv) return !0;
		}
		t & 512 && M === null && k(e, b);
	}
	return !1;
}
function Vn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Mn !== null && Mn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Vn(a, t, !1) : t === a && (n ? k(a, x) : a.f & 1024 && k(a, S), At(a));
	}
}
function Hn(e) {
	var t = K, n = q, r = J, i = U, a = Mn, o = O, s = An, c = Ln, l = e.f;
	K = null, q = 0, J = null, U = l & 96 ? null : e, Mn = null, Ke(e.ctx), An = !1, Ln = ++In, e.ac !== null && (rt(() => {
		e.ac.abort(ye);
	}), e.ac = null);
	try {
		e.f |= ce;
		var u = e.fn, d = u();
		e.f |= ne;
		var f = Un(e);
		if (Xe() && J !== null && !An && f !== null && !(e.f & 6146)) for (var p = 0; p < J.length; p++) Vn(J[p], e);
		if (i !== null && i !== e) {
			if (In++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = In;
			if (t !== null) for (let e of t) e.rv = In;
			J !== null && (r === null ? r = J : r.push(...J));
		}
		return e.f & 8388608 && (e.f ^= ue), d;
	} catch (t) {
		return Un(e), nn(t);
	} finally {
		e.f ^= ce, K = t, q = n, J = r, U = i, Mn = a, Ke(o), An = s, Ln = c;
	}
}
function Un(e) {
	var t = e.deps, n = j?.is_fork;
	if (K !== null) {
		var r;
		if (n || Gn(e, q), t !== null && q > 0) for (t.length = q + K.length, r = 0; r < K.length; r++) t[q + r] = K[r];
		else e.deps = t = K;
		if (cn() && e.f & 512) for (r = q; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && q < t.length && (Gn(e, q), t.length = q);
	return t;
}
function Wn(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = o.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (K === null || !s.call(K, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512), a.v !== C && tt(a), a.ac !== null && rt(() => {
			a.ac.abort(ye), a.ac = null, k(a, x);
		}), ht(a), Gn(a, 0);
	}
}
function Gn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Wn(e, n[r]);
}
function Kn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		k(e, b);
		var n = G;
		G = e;
		try {
			t & 16777232 ? yn(e) : vn(e), _n(e);
			var r = Hn(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = Fn;
		} finally {
			G = n;
		}
	}
}
function Y(e) {
	var t = !!(e.f & 2);
	if (Dn?.add(e), U !== null && !An && !(G !== null && G.f & 16384) && (Mn === null || !Mn.has(e))) {
		var n = U.deps;
		if (U.f & 2097152) e.rv < In && (e.rv = In, K === null && n !== null && n[q] === e ? q++ : K === null ? K = [e] : K.push(e));
		else {
			U.deps ??= [], s.call(U.deps, e) || U.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [U] : s.call(r, U) || r.push(U);
		}
	}
	if (On && Pt.has(e)) return Pt.get(e);
	if (t) {
		var i = e;
		if (On) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Jn(i)) && (a = pt(i)), Pt.set(i, a), a;
		}
		var o = !(i.f & 512) && !An && U !== null && !!(U.f & 512), c = (i.f & ne) === 0;
		Bn(i) && (o && (i.f |= 512), mt(i)), o && !c && (gt(i), qn(i));
	}
	if (M?.has(e)) return M.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function qn(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : s.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (gt(n), qn(n));
	}
}
function Jn(e) {
	if (e.v === C) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Pt.has(t) || t.f & 2 && Jn(t)) return !0;
	return !1;
}
function Yn(e) {
	var t = An;
	try {
		return An = !0, e();
	} finally {
		An = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Xn = ["touchstart", "touchmove"];
function Zn(e) {
	return Xn.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var Qn = Symbol("events"), $n = /* @__PURE__ */ new Set(), er = /* @__PURE__ */ new Set();
function tr(e, t, n) {
	(t[Qn] ??= {})[e] = n;
}
function nr(e) {
	for (var t = 0; t < e.length; t++) $n.add(e[t]);
	for (var n of er) n(e);
}
var rr = null, ir = !1;
function ar(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	rr = e, ir || (ir = !0, setTimeout(() => {
		ir = !1, rr = null;
	}));
	var o = 0, s = rr === e && e[Qn];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Qn] = t;
			return;
		}
		var u = i.indexOf(t);
		if (u === -1) return;
		c <= u && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		l(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var d = U, f = G;
		W(null), jn(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[Qn]?.[r];
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
			e[Qn] = t, delete e.currentTarget, W(d), jn(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var or = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function sr(e) {
	return or?.createHTML(e) ?? e;
}
function cr(e) {
	var t = en("template");
	return t.innerHTML = sr(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function lr(e, t) {
	var n = G;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function X(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (w) return lr(T, null), T;
		i === void 0 && (i = cr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ I(i)));
		var t = r || Kt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ I(t), s = t.lastChild;
			lr(o, s);
		} else lr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ur(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (w) return lr(T, null), T;
		if (!o) {
			var e = /* @__PURE__ */ I(cr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ I(e);) o.appendChild(/* @__PURE__ */ I(e));
			else o = /* @__PURE__ */ I(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ I(t), r = t.lastChild;
			lr(n, r);
		} else lr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function dr(e, t) {
	return /* @__PURE__ */ ur(e, t, "svg");
}
function fr() {
	if (w) return lr(T, null), T;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = F();
	return e.append(t, n), lr(t, n), e;
}
function Z(e, t) {
	if (w) {
		var n = G;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = T), De();
	} else e !== null && e.before(t);
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function pr(e) {
	let t = 0, n = It(0), r;
	return () => {
		cn() && (Y(n), hn(() => (t === 0 && (r = Yn(() => e(() => Ht(n)))), t += 1, () => {
			$e(() => {
				--t, t === 0 && (r?.(), r = void 0, Ht(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var mr = ie | ae;
function hr(e, t, n, r) {
	new gr(e, t, n, r);
}
var gr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = w ? T : null;
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
	#h = pr(() => (this.#m = It(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = G;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = G.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = gn(() => {
			if (w) {
				let e = Ae(this.#t);
				De();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, mr), w && (this.#e = T);
	}
	#g() {
		try {
			this.#a = V(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		$e(r), t && (this.#s = V(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? Te() : (t = !0, n && Ge(), this.#s !== null && Sn(this.#s, () => {
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
					rn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (te | re)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = V(() => e(this.#e)), $e(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = F(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return V(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							rn(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(j)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Sn(this.#o, () => {
					this.#o = null;
				}), this.#S(j));
			}
		}));
	}
	#x() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = V(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				En(this.#a, e);
				let t = this.#n.pending;
				this.#o = V(() => t(this.#e));
			} else this.#S(j);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		nt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = G, n = U, r = O;
		jn(this.#i), W(this.#i), Ke(this.#i.ctx);
		try {
			return Et.ensure(), e();
		} finally {
			jn(t), W(n), Ke(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && Sn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, $e(() => {
			this.#d = !1, this.#m && Bt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), Y(this.#m);
	}
	error(e) {
		if (e === xe || !this.#n.onerror && !this.#n.failed) throw e;
		j?.is_fork ? (this.#a && j.skip_effect(this.#a), this.#o && j.skip_effect(this.#o), this.#s && j.skip_effect(this.#s), j.oncommit(() => {
			this.#y() || this.#T(e);
		})) : this.#T(e);
	}
	#T(e) {
		this.#a &&= (H(this.#a), null), this.#o &&= (H(this.#o), null), this.#s &&= (H(this.#s), null), w && (E(this.#t), Oe(), E(ke()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return V(() => {
						var r = G;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return rn(e, this.#i.parent), null;
				}
			}));
		};
		$e(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					rn(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => rn(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function Q(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ve] ??= e.nodeValue) && (e[ve] = n, e.nodeValue = `${n}`);
}
function _r(e, t) {
	return yr(e, t);
}
var vr = /* @__PURE__ */ new Map();
function yr(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	Yt();
	var l = void 0, u = fn(() => {
		var o = n ?? t.appendChild(F());
		hr(o, { pending: () => {} }, (t) => {
			qe({});
			var n = O;
			if (a && (n.c = a), i && (r.$$events = i), w && lr(t, null), l = e(t, r) || Ye(), w && (G.nodes.end = T, T === null || T.nodeType !== 8 || T.data !== "]")) throw we(), xe;
			Je();
		}, s);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = Zn(r);
					for (let e of [t, document]) {
						var a = vr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), vr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, ar, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(c($n)), er.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = vr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, ar), r.delete(e), r.size === 0 && vr.delete(n)) : r.set(e, i);
			}
			er.delete(d), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return br.set(l, u), l;
}
var br = /* @__PURE__ */ new WeakMap(), xr = class {
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
			if (n) wn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (wn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (H(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						En(r, t), t.append(F()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else H(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Sn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (H(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = j, r = $t();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = F();
				i.append(a), this.#n.set(e, {
					effect: V(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, V(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else w && (this.anchor = T), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Sr(e, t, n = !1) {
	var r;
	w && (r = T, De());
	var i = new xr(e), a = n ? ie : 0;
	function o(e, t) {
		if (w) {
			var n = Ae(r);
			if (e !== parseInt(n.substring(1))) {
				var a = ke();
				E(a), i.anchor = a, Ee(!1), i.ensure(e, t), Ee(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	gn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Cr(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Sn(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					wr(e, c(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			Qt(d), d.append(u), e.items.clear();
		}
		wr(e, t, !l);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function wr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= se, En(a, document.createDocumentFragment())) : H(t[i], n);
	}
}
var Tr;
function Er(e, t, n, r, i, o = null) {
	var s = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		s = w ? E(/* @__PURE__ */ I(u)) : u.appendChild(F());
	}
	w && De();
	var d = null, f = /* @__PURE__ */ dt(() => {
		var e = n();
		return a(e) ? e : e == null ? [] : c(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = Y(f);
			_.fallback = d, Or(_, n, s, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= se, Ar(d, null, s)) : wn(d) : Sn(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: gn(() => {
			var e = Y(f), a = e.length;
			let c = !1;
			w && Ae(s) === "[!" != (a === 0) && (s = ke(), E(s), Ee(!1), c = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = j, v = $t(), y = 0; y < a; y += 1) {
				w && T.nodeType === 8 && T.data === "]" && (s = T, c = !0, Ee(!1));
				var b = e[y], x = r(b, y), S = m ? null : l.get(x);
				S ? (S.v && Bt(S.v, b), S.i && Bt(S.i, y), v && _.unskip_effect(S.e)) : (S = kr(l, m ? s : Tr ??= F(), b, x, y, i, t, n), m || (S.e.f |= se), l.set(x, S)), u.add(x);
			}
			if (a === 0 && o && !d && (m ? d = V(() => o(s)) : (d = V(() => o(Tr ??= F())), d.f |= se)), a > u.size && Ie("", "", ""), w && a > 0 && E(ke()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			c && Ee(!0), Y(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, w && (s = T);
}
function Dr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Or(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, l = Dr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (a) for (v = 0; v < o; v += 1) h = t[v], g = i(h, v), _ = s.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (h = t[v], g = i(h, v), _ = s.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (wn(_), a && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= se, _ === l) Ar(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), jr(e, d, _), jr(e, _, y), Ar(_, y, n), d = _, p = [], m = [], l = Dr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Ar(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					jr(e, S.prev, ee.next), jr(e, d, S), jr(e, ee, b), l = b, d = ee, --v, p = [], m = [];
				} else u.delete(_), Ar(_, l, n), jr(e, _.prev, _.next), jr(e, _, d === null ? e.effect.first : d.next), jr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Dr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Dr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (wr(e, c(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var te = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || te.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && te.push(l), l = Dr(l.next);
		var ne = te.length;
		if (ne > 0) {
			var re = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.fix();
			}
			Cr(e, te, re);
		}
	}
	a && $e(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function kr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? It(n) : /* @__PURE__ */ Lt(n, !1, !1) : null, l = o & 2 ? It(i) : null;
	return {
		v: c,
		i: l,
		e: V(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ar(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Xt(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function jr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/shared/attributes.js
var Mr = [..." 	\n\r\f\xA0\v﻿"];
function Nr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Mr.includes(r[o - 1])) && (s === r.length || Mr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Pr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Fr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Ir(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Fr)), i && c.push(...Object.keys(i).map(Fr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Fr(e.substring(l, u).trim());
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
		return r && (n += Pr(r)), i && (n += Pr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function Lr(e, t, n, r, i, a) {
	var o = e[ge];
	if (w || o !== n || o === void 0) {
		var s = Nr(n, r, a);
		w && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ge] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function Rr(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function zr(e, t, n, r) {
	var i = e[_e];
	if (w || i !== t) {
		var a = Ir(t, r);
		w && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[_e] = t;
	} else r && (Array.isArray(r) ? (Rr(e, n?.[0], r[0]), Rr(e, n?.[1], r[1], "important")) : Rr(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Br = Symbol("is custom element"), Vr = Symbol("is html"), Hr = be ? "link" : "LINK";
function $(e, t, n, r) {
	var i = Ur(e);
	w && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Hr) || i[t] !== (i[t] = n) && (t === "loading" && (e[me] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Gr(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ur(e) {
	return e[he] ??= {
		[Br]: e.nodeName.includes("-"),
		[Vr]: e.namespaceURI === Se
	};
}
var Wr = /* @__PURE__ */ new Map();
function Gr(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Wr.get(t);
	if (n) return n;
	Wr.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = d(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = m(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
function Kr(e, t, n = t) {
	var r = e === "x", i = () => rt(() => {
		a = !0, clearTimeout(o), o = setTimeout(s, 100), n(window[r ? "scrollX" : "scrollY"]);
	});
	addEventListener("scroll", i, { passive: !0 });
	var a = !1, o, s = () => {
		a = !1;
	}, c = !0;
	hn(() => {
		var e = t();
		c ? c = !1 : !a && e != null && (a = !0, clearTimeout(o), r ? scrollTo(e, window.scrollY) : scrollTo(window.scrollX, e), o = setTimeout(s, 100));
	}), pn(i), ln(() => {
		removeEventListener("scroll", i);
	});
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var qr = !1;
function Jr(e) {
	var t = qr;
	try {
		return qr = !1, [e(), qr];
	} finally {
		qr = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function Yr(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, d = () => o && i ? (l ??= /* @__PURE__ */ ct(r), Y(l)) : (c && (c = !1, s = o ? Yn(r) : r), s);
	let f;
	if (a) {
		var p = de in e || pe in e;
		f = u(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = Jr(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ve(t), f(m)));
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
	var v = !1, y = (n & 1 ? ct : dt)(() => (v = !1, g()));
	a && Y(y);
	var b = G;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? Y(y) : i && a ? Wt(e) : e;
			return P(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return On && v || b.f & 16384 ? y.v : Y(y);
	});
}
function Xr(e) {
	O === null && Pe("onMount"), un(() => {
		let t = Yn(e);
		if (typeof t == "function") return t;
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/lib/model.js
var Zr = (e) => Math.min(1, Math.max(0, e)), Qr = (e) => String(e).padStart(2, "0"), $r = (e, t) => t > 0 ? Zr(e / t) : 1, ei = (e) => [
	$r(e.runs, e.goal.runs),
	$r(e.gym, e.goal.gym),
	Zr(e.bonus)
];
function ti(e) {
	let t = e.xp - e.level_floor, n = e.next_level_xp - e.level_floor;
	return {
		level: e.level,
		into: t,
		span: n,
		frac: n > 0 ? Zr(t / n) : 1
	};
}
var ni = (e) => `Week ${Number(e.week.split("-W")[1])} · ${e.days_left} ${e.days_left === 1 ? "day" : "days"} left`;
function ri(e, t, n = 15) {
	let r = new Date(e);
	return t - r > n * 6e4 ? `Updated ${Qr(r.getHours())}:${Qr(r.getMinutes())}` : null;
}
function ii(e, t) {
	let n = Object.hasOwn(t, e.person) ? e.person : null;
	return {
		self: n,
		others: Object.keys(t).filter((e) => e !== n)
	};
}
// src/lib/ui/Header.svelte
var ai = /* @__PURE__ */ X("<header><div class=\"in svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"> </h1> <p class=\"svelte-16l0jix\"> </p></div></header>");
function oi(e, t) {
	let n = Yr(t, "subtitle", 3, ""), r = /* @__PURE__ */ N(0);
	var i = ai();
	let a;
	var o = L(i), s = L(o), c = R(s, !0), l = R(z(s, 2), !0);
	D(o), D(i), B(() => {
		a = Lr(i, 1, "svelte-16l0jix", null, a, { scrolled: Y(r) > 0 }), Q(c, t.title), Q(l, n() || "\xA0");
	}), Kr("y", () => Y(r), (e) => P(r, e, !0)), Z(e, i);
}
// src/lib/media.svelte.js
var si = Wt({
	wide: !1,
	split: !1,
	reducedMotion: !1
}), ci = matchMedia("(min-width: 768px)"), li = matchMedia("(min-width: 1080px)"), ui = matchMedia("(prefers-reduced-motion: reduce)"), di = () => {
	si.wide = ci.matches, si.split = li.matches, si.reducedMotion = ui.matches;
};
ci.addEventListener("change", di), li.addEventListener("change", di), ui.addEventListener("change", di), di();
// src/lib/motion.js
function fi(e, { onFrame: t, onSettle: n, snap: r = {
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
// src/lib/spring.js
function pi({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
// src/lib/ui/Rings.svelte
var mi = /* @__PURE__ */ dr("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), hi = /* @__PURE__ */ dr("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function gi(e, t) {
	qe(t, !0);
	let n = Yr(t, "size", 3, 88), r = Yr(t, "animate", 3, !0), i = [
		"run",
		"gym",
		"bonus"
	], a = 1e3, o = /* @__PURE__ */ N(Wt(r() && !si.reducedMotion ? 0 : a)), s = /* @__PURE__ */ A(() => n() * .11), c = /* @__PURE__ */ A(() => t.fractions.map((e, t) => {
		let r = n() / 2 - Y(s) / 2 - t * Y(s) * 1.3, c = 2 * Math.PI * r;
		return {
			kind: i[t],
			r,
			c,
			len: c * e * Y(o) / a
		};
	}));
	Xr(() => {
		if (Y(o) === a) return;
		let e = fi(pi({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => P(o, e, !0) });
		return e.to(a), e.stop;
	});
	var l = hi();
	let u;
	Er(l, 21, () => Y(c), (e) => e.kind, (e, t) => {
		var r = mi(), i = Zt(r);
		let a;
		var o = z(i);
		let c;
		B(() => {
			$(i, "cx", n() / 2), $(i, "cy", n() / 2), $(i, "r", Y(t).r), $(i, "stroke-width", Y(s)), a = zr(i, "", a, { stroke: `var(--${Y(t).kind ?? ""})` }), $(o, "cx", n() / 2), $(o, "cy", n() / 2), $(o, "r", Y(t).r), $(o, "stroke-width", Y(s)), $(o, "stroke-dasharray", `${Y(t).len ?? ""} ${Y(t).c ?? ""}`), $(o, "opacity", +(Y(t).len > .01)), $(o, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = zr(o, "", c, { stroke: `var(--${Y(t).kind ?? ""})` });
		}), Z(e, r);
	}), D(l), B(() => {
		$(l, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), u = zr(l, "", u, { width: `${n() / 16}rem` });
	}), Z(e, l), Je();
}
// src/lib/ui/PersonTile.svelte
var _i = /* @__PURE__ */ X("<!> <span class=\"sr\"> </span>", 1), vi = /* @__PURE__ */ X("<span class=\"streak svelte-1handop\"> </span>"), yi = /* @__PURE__ */ X("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), bi = /* @__PURE__ */ X("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), xi = /* @__PURE__ */ X("<span class=\"body svelte-1handop\"><!> <span class=\"stats svelte-1handop\"></span></span> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), Si = /* @__PURE__ */ X("<span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!>", 1), Ci = /* @__PURE__ */ X("<button type=\"button\"><!></button>"), wi = /* @__PURE__ */ X("<article><!></article>");
function Ti(e, t) {
	qe(t, !0);
	let n = (e) => {
		var n = Si(), r = Zt(n), a = L(r);
		let o;
		var s = R(a, !0), h = z(a, 2), g = L(h), _ = R(g, !0), v = R(z(g, 2), !0);
		D(h);
		var y = z(h, 2), b = (e) => {
			var t = _i(), n = Zt(t);
			{
				let e = /* @__PURE__ */ A(() => ei(Y(d)));
				gi(n, {
					get fractions() {
						return Y(e);
					},
					size: 44
				});
			}
			var r = R(z(n, 2), !0);
			B(() => Q(r, Y(m))), Z(e, t);
		}, x = (e) => {
			var n = vi(), r = R(n);
			B(() => Q(r, `🔥 ${t.person.streak ?? ""} wk`)), Z(e, n);
		};
		Sr(y, (e) => {
			i() ? e(b) : e(x, -1);
		});
		var S = z(y, 2), ee = (e) => {
			Z(e, yi());
		};
		Sr(S, (e) => {
			t.onopen && e(ee);
		}), D(r);
		var te = z(r, 2), ne = (e) => {
			var t = xi(), n = Zt(t), r = L(n);
			{
				let e = /* @__PURE__ */ A(() => ei(Y(d))), t = /* @__PURE__ */ A(() => si.wide ? 112 : 88);
				gi(r, {
					get fractions() {
						return Y(e);
					},
					get size() {
						return Y(t);
					}
				});
			}
			var i = z(r, 2);
			Er(i, 21, () => Y(f), (e) => e.kind, (e, t) => {
				var n = bi(), r = L(n), i = L(r);
				let a;
				var o = z(i, 1, !0);
				D(r);
				var s = z(r, 2), c = L(s, !0), l = R(z(c));
				D(s), D(n), B(() => {
					a = zr(i, "", a, { background: `var(--${Y(t).kind ?? ""})` }), Q(o, Y(t).label), Q(c, Y(t).n), Q(l, `/${Y(t).of ?? ""}`);
				}), Z(e, n);
			}), D(i), D(n);
			var a = z(n, 2), o = L(a), s = L(o);
			let c;
			D(o);
			var l = R(z(o, 2));
			D(a), B((e, t) => {
				c = zr(s, "", c, { width: `${Y(u).frac * 100}%` }), Q(l, `${e ?? ""} of ${t ?? ""} XP to level ${Y(u).level + 1}`);
			}, [() => Y(u).into.toLocaleString(), () => Y(u).span.toLocaleString()]), Z(e, t);
		};
		Sr(te, (e) => {
			i() || e(ne);
		}), B((e) => {
			o = zr(a, "", o, {
				"--a1": Y(c),
				"--a2": Y(l)
			}), Q(s, e), Q(_, t.person.name), Q(v, Y(p));
		}, [() => t.person.name.slice(0, 1)]), Z(e, n);
	}, r = Yr(t, "index", 3, 0), i = Yr(t, "compact", 3, !1), a = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], o = /* @__PURE__ */ A(() => a[r() % a.length]), s = /* @__PURE__ */ A(() => y(Y(o), 2)), c = /* @__PURE__ */ A(() => Y(s)[0]), l = /* @__PURE__ */ A(() => Y(s)[1]), u = /* @__PURE__ */ A(() => ti(t.person)), d = /* @__PURE__ */ A(() => t.person.week), f = /* @__PURE__ */ A(() => [
		{
			kind: "run",
			label: "Runs",
			n: Y(d).runs,
			of: Y(d).goal.runs
		},
		{
			kind: "gym",
			label: "Gym",
			n: Y(d).gym,
			of: Y(d).goal.gym
		},
		{
			kind: "bonus",
			label: "Bonus",
			n: Y(d).bonus,
			of: 1
		}
	]), p = /* @__PURE__ */ A(() => [
		`Level ${Y(u).level}`,
		i() ? `🔥 ${t.person.streak} wk` : `${t.person.xp.toLocaleString()} XP`,
		Y(d).paused && "Week paused"
	].filter(Boolean).join(" · ")), m = /* @__PURE__ */ A(() => `${t.person.name}, level ${Y(u).level}. This week ${Y(f).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. Streak ${t.person.streak} weeks.`);
	var h = fr(), g = Zt(h), _ = (e) => {
		var r = Ci();
		let a;
		var o = L(r);
		n(o), D(r), B(() => {
			a = Lr(r, 1, "tile glass press svelte-1handop", null, a, { compact: i() }), $(r, "aria-label", Y(m));
		}), tr("click", r, function(...e) {
			t.onopen?.apply(this, e);
		}), Z(e, r);
	}, v = (e) => {
		var t = wi();
		let r;
		var a = L(t);
		n(a), D(t), B(() => r = Lr(t, 1, "tile glass svelte-1handop", null, r, { compact: i() })), Z(e, t);
	};
	Sr(g, (e) => {
		t.onopen ? e(_) : e(v, -1);
	}), Z(e, h), Je();
}
nr(["click"]);
// src/lib/ui/Status.svelte
var Ei = /* @__PURE__ */ X("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), Di = /* @__PURE__ */ X("<p class=\"caption stale svelte-9nj5u4\"> </p>"), Oi = /* @__PURE__ */ X("<!> <!>", 1);
function ki(e, t) {
	qe(t, !0);
	let n = /* @__PURE__ */ A(() => t.scoredAt ? ri(t.scoredAt, t.now) : null);
	var r = Oi(), i = Zt(r), a = (e) => {
		var n = Ei(), r = z(L(n));
		D(n), B(() => Q(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), Z(e, n);
	};
	Sr(i, (e) => {
		t.configError && e(a);
	});
	var o = z(i, 2), s = (e) => {
		var t = Di(), r = R(t, !0);
		B(() => Q(r, Y(n))), Z(e, t);
	};
	Sr(o, (e) => {
		Y(n) && e(s);
	}), Z(e, r), Je();
}
// src/lib/ui/Together.svelte
var Ai = /* @__PURE__ */ X("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), ji = /* @__PURE__ */ X("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <dl class=\"svelte-1tya3no\"></dl></section>");
function Mi(e, t) {
	qe(t, !0);
	let n = /* @__PURE__ */ A(() => [
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
	var r = ji(), i = z(L(r), 2);
	Er(i, 21, () => Y(n), (e) => e.k, (e, t) => {
		var n = Ai(), r = L(n), i = R(r, !0), a = z(r), o = L(a, !0), s = R(z(o), !0);
		D(a), D(n), B(() => {
			Q(i, Y(t).k), Q(o, Y(t).v), Q(s, Y(t).unit);
		}), Z(e, n);
	}), D(i), D(r), Z(e, r), Je();
}
// src/App.svelte
var Ni = /* @__PURE__ */ X("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), Pi = /* @__PURE__ */ X("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), Fi = /* @__PURE__ */ X("<div class=\"tiles compact svelte-1n46o8q\"></div>"), Ii = /* @__PURE__ */ X("<!> <!>", 1), Li = /* @__PURE__ */ X("<div class=\"tiles svelte-1n46o8q\"></div>"), Ri = /* @__PURE__ */ X("<!> <!> <!>", 1), zi = /* @__PURE__ */ X("<!> <main class=\"svelte-1n46o8q\"><!></main>", 1);
function Bi(e, t) {
	qe(t, !0);
	let n = /* @__PURE__ */ N(null), r = /* @__PURE__ */ N(null), a = /* @__PURE__ */ N(Wt(/* @__PURE__ */ new Date())), o;
	async function s() {
		if (clearTimeout(o), !document.hidden) {
			try {
				P(n, await i("scores"), !0), P(r, null);
			} catch (e) {
				P(r, e, !0);
			}
			P(a, /* @__PURE__ */ new Date(), !0), o = setTimeout(s, Y(n) ? 6e4 : 3e4);
		}
	}
	un(() => {
		s();
		let e = () => document.hidden || s();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(o), document.removeEventListener("visibilitychange", e);
		};
	});
	let c = /* @__PURE__ */ A(() => Y(n)?.people ?? {}), l = /* @__PURE__ */ A(() => Object.keys(Y(c))), u = /* @__PURE__ */ A(() => ii(Y(n)?.viewer ?? {}, Y(c))), d = /* @__PURE__ */ A(() => Y(c)[Y(u).self ?? Y(l)[0]]?.week);
	var f = zi(), p = Zt(f);
	{
		let e = /* @__PURE__ */ A(() => Y(d) ? ni(Y(d)) : "");
		oi(p, {
			title: "Training",
			get subtitle() {
				return Y(e);
			}
		});
	}
	var m = z(p, 2), h = L(m), g = (e) => {
		var t = Pi(), n = z(Zt(t), 2), i = (e) => {
			var t = Ni(), n = R(t, !0);
			B(() => Q(n, Y(r).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), Z(e, t);
		};
		Sr(n, (e) => {
			Y(r) && e(i);
		}), Z(e, t);
	}, _ = (e) => {
		var t = Ri(), r = Zt(t);
		ki(r, {
			get scoredAt() {
				return Y(n).scored_at;
			},
			get configError() {
				return Y(n).config_error;
			},
			get now() {
				return Y(a);
			}
		});
		var i = z(r, 2), o = (e) => {
			var t = Ii(), n = Zt(t), r = (e) => {
				var t = Fi();
				Er(t, 20, () => Y(u).others, (e) => e, (e, t) => {
					{
						let n = /* @__PURE__ */ A(() => Y(l).indexOf(t));
						Ti(e, {
							get person() {
								return Y(c)[t];
							},
							get index() {
								return Y(n);
							},
							compact: !0
						});
					}
				}), D(t), Z(e, t);
			};
			Sr(n, (e) => {
				Y(u).others.length && e(r);
			});
			var i = z(n, 2);
			{
				let e = /* @__PURE__ */ A(() => Y(l).indexOf(Y(u).self));
				Ti(i, {
					get person() {
						return Y(c)[Y(u).self];
					},
					get index() {
						return Y(e);
					}
				});
			}
			Z(e, t);
		}, s = (e) => {
			var t = Li();
			Er(t, 20, () => Y(u).others, (e) => e, (e, t) => {
				{
					let n = /* @__PURE__ */ A(() => Y(l).indexOf(t));
					Ti(e, {
						get person() {
							return Y(c)[t];
						},
						get index() {
							return Y(n);
						}
					});
				}
			}), D(t), Z(e, t);
		};
		Sr(i, (e) => {
			Y(u).self ? e(o) : e(s, -1);
		});
		var d = z(i, 2), f = (e) => {
			Mi(e, { get group() {
				return Y(n).group;
			} });
		};
		Sr(d, (e) => {
			Y(n).group && e(f);
		}), Z(e, t);
	};
	Sr(h, (e) => {
		Y(n) ? e(_, -1) : e(g);
	}), D(m), Z(e, f), Je();
}
// src/main.js
var Vi = (e) => _r(Bi, { target: e }), Hi = () => new Promise((e) => {
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
		document.documentElement.dataset.theme = n ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Hi().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", Vi(e);
		}));
	}
});
