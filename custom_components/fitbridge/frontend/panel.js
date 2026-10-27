// src/lib/api.js
var e, t = (t) => e = t;
async function n(t, n, r) {
	if (!e && t !== "GET") return console.info("demo:", t, n, r), { ok: !0 };
	let i = {
		method: t,
		headers: r === void 0 ? {} : { "Content-Type": "application/json" },
		body: r === void 0 ? void 0 : JSON.stringify(r)
	}, a = await (e ? e.fetchWithAuth("/api/fitbridge/ui/" + n, i) : fetch(`./demo-${n}.json`, i));
	if (!a.ok) throw Object.assign(Error(String(a.status)), { status: a.status });
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
var b = 1024, x = 2048, S = 4096, C = 8192, w = 16384, T = 32768, ee = 1 << 25, te = 65536, E = 1 << 19, ne = 1 << 20, re = 1 << 25, ie = 1 << 21, ae = 1 << 22, oe = 1 << 23, se = Symbol("$state"), ce = Symbol("component"), le = Symbol("legacy props"), ue = Symbol(""), de = Symbol("attributes"), fe = Symbol("class"), pe = Symbol("style"), me = Symbol("text"), he = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ge = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), _e = {}, D = Symbol("uninitialized"), ve = "http://www.w3.org/1999/xhtml";
function ye() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function be(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function xe() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var O = !1;
function Se(e) {
	O = e;
}
var k;
function Ce(e) {
	if (e === null) throw be(), _e;
	return k = e;
}
function we() {
	return Ce(/* @__PURE__ */ Qt(k));
}
function A(e) {
	if (O) {
		if (/* @__PURE__ */ Qt(k) !== null) throw be(), _e;
		k = e;
	}
}
function Te(e = 1) {
	if (O) {
		for (var t = e, n = k; t--;) n = /* @__PURE__ */ Qt(n);
		k = n;
	}
}
function Ee(e = !0) {
	for (var t = 0, n = k;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ Qt(n);
		e && n.remove(), n = i;
	}
}
function De(e) {
	if (!e || e.nodeType !== 8) throw be(), _e;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Oe(e) {
	return e === this.v;
}
function ke(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ae(e) {
	return !ke(e, this.v);
}
function je(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// node_modules/svelte/src/internal/client/errors.js
function Me() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Ne(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Pe(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Fe() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Ie(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Le() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Re(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function ze() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Be() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ve() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function He() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/flags/index.js
var Ue = !1;
function We() {
	Ue = !0;
}
// node_modules/svelte/src/internal/client/context.js
var j = null;
function Ge(e) {
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
		r: K,
		l: Ue && !t ? {
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
		for (var r of n) fn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, j = t.p, Ke(e);
}
function Ke(e = {}) {
	return c(e, ce, { value: !0 }), e;
}
function qe() {
	return !Ue || j !== null && j.l === null;
}
// node_modules/svelte/src/internal/client/dom/task.js
var Je = [];
function Ye() {
	var e = Je;
	Je = [], _(e);
}
function Xe(e) {
	if (Je.length === 0 && !yt) {
		var t = Je;
		queueMicrotask(() => {
			t === Je && Ye();
		});
	}
	Je.push(e);
}
function Ze() {
	for (; Je.length > 0;) Ye();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var Qe = ~(x | S | b);
function P(e, t) {
	e.f = e.f & Qe | t;
}
function $e(e) {
	e.f & 512 || e.deps === null ? P(e, b) : P(e, S);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function et(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), P(e, b);
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function tt(e) {
	var t = G, n = K;
	Pn(null), Fn(null);
	try {
		return e();
	} finally {
		Pn(t), Fn(n);
	}
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function nt(e, t, n, r) {
	let i = qe() ? ot : lt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = K, c = rt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				an(e, s);
			}
			it();
		}
	}
	var d = at();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ ct(e))).then(u).catch((e) => an(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), it());
	}) : f();
}
function rt() {
	var e = K, t = G, n = j, r = I;
	return function(i = !0) {
		Fn(e), Pn(t), Ge(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function it(e = !0) {
	Fn(null), Pn(null), Ge(null), e && I?.deactivate();
}
function at() {
	var e = K, t = e.b, n = I, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ot(e) {
	var t = 2 | x;
	return K !== null && (K.f |= E), {
		ctx: j,
		deps: null,
		effects: null,
		equals: Oe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: D,
		wv: 0,
		parent: K,
		ac: null
	};
}
var st = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function ct(e, t, n) {
	let r = K;
	r === null && Me();
	var i = void 0, a = It(D), o = !G, s = /* @__PURE__ */ new Set();
	return gn(() => {
		var t = K, n = v();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== he && n.reject(e);
			}).finally(it);
		} catch (e) {
			n.reject(e), it();
		}
		var c = I;
		if (o) {
			if (t.f & 32768) var l = at();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(st);
			else for (let e of s.values()) e.reject(st);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== st && (c.activate(), t ? (a.f |= oe, Bt(a, t)) : (a.f & 8388608 && (a.f ^= oe), Bt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), un(() => {
		for (let e of s) e.reject(st);
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
	let t = /* @__PURE__ */ ot(e);
	return Ln(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function lt(e) {
	let t = /* @__PURE__ */ ot(e);
	return t.equals = Ae, t;
}
function ut(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) W(t[n]);
	}
}
function dt(e) {
	var t, n = K, r = e.parent;
	if (!jn && r !== null && e.v !== D && r.f & 24576) return ye(), e.v;
	Fn(r);
	try {
		ut(e), t = Jn(e);
	} finally {
		Fn(n);
	}
	return t;
}
function ft(e) {
	var t = dt(e);
	!e.equals(t) && (e.wv = Gn(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), gt?.capture(e, t, !0)), e.deps === null)) ? P(e, b) : jn || (_t === null ? $e(e) : (ln() || I?.is_fork) && _t.set(e, t));
}
function pt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && tt(() => {
		t.ac.abort(he), t.ac = null;
	}), t.fn !== null && (t.teardown = h), Zn(t, 0), xn(t));
}
function mt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Qn(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var ht = null, I = null, gt = null, _t = null, vt = null, yt = !1, bt = !1, xt = null, St = null, Ct = 0, wt = 1, Tt = class e {
	id = wt++;
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
		ht === null ? ht = this : (ht.#n = this, this.#t = ht), ht = this;
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
		for (var t = xt = [], n = [], r = St = []; this.#c.length > 0;) {
			Ct++ > 1e3 && (this.#S(), Dt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Mt(e), this.#h() || this.discard(), t;
			}
		}
		if (I = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (xt = null, St = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) jt(e, t);
			r.length > 0 && I.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), gt = this, kt(n), kt(t), gt = null, this.#s?.resolve();
			var o = I;
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
				a ? r.f ^= b : i & 4 ? t.push(r) : Kn(r) && (i & 16 && this.#d.add(r), Qn(r));
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
		for (var t = 0; t < e.length; t += 1) et(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== D && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), _t?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, _t = null;
	}
	flush() {
		try {
			bt = !0, I = this, this.#_();
		} finally {
			Ct = 0, vt = null, xt = null, St = null, bt = !1, I = null, _t = null, Pt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(st);
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
		this.#m || (this.#m = !0, Xe(() => {
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
			!bt && !yt && Xe(() => {
				t.#e || t.flush();
			});
		}
		return I;
	}
	apply() {
		_t = null;
	}
	schedule(e) {
		vt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? ht = e : t.#t = e, this.linked = !1;
		}
	}
};
function Et(e) {
	var t = yt, n = gt;
	gt = null, yt = !0;
	try {
		var r;
		for (e && (Et(), r = e());;) {
			if (Ze(), I === null) return r;
			I.flush();
		}
	} finally {
		yt = t, gt = n;
	}
}
function Dt() {
	try {
		Le();
	} catch (e) {
		an(e, vt);
	}
}
var Ot = null;
function kt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Kn(r) && (Ot = /* @__PURE__ */ new Set(), Qn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && wn(r), Ot?.size > 0)) {
				Pt.clear();
				for (let e of Ot) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Ot.has(n) && (Ot.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Qn(n);
					}
				}
				Ot.clear();
			}
		}
		Ot = null;
	}
}
function At(e) {
	I.schedule(e);
}
function jt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), P(e, b);
		for (var n = e.first; n !== null;) jt(n, t), n = n.next;
	}
}
function Mt(e) {
	P(e, b);
	for (var t = e.first; t !== null;) Mt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Nt = /* @__PURE__ */ new Set(), Pt = /* @__PURE__ */ new Map(), Ft = !1;
function It(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Oe,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function L(e, t) {
	let n = It(e, t);
	return Ln(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Lt(e, t = !1, n = !0) {
	let r = It(e);
	return t || (r.equals = Ae), Ue && n && j !== null && j.l !== null && (j.l.s ??= []).push(r), r;
}
function R(e, t, n = !1) {
	return G !== null && (!Nn || G.f & 131072) && qe() && G.f & 4325394 && (In === null || !In.has(e)) && Ve(), Bt(e, n ? Wt(t) : t, St);
}
var Rt = null, zt = 0;
function Bt(e, t, n = null) {
	if (!e.equals(t)) {
		jn ? Pt.set(e, t) : Pt.has(e) || Pt.set(e, e.v);
		var r = Tt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && dt(t), _t === null && $e(t);
		}
		e.wv = Gn(), Rt = null, zt = 0, Ut(e, x, n), Rt = null, qe() && K !== null && K.f & 1024 && !(K.f & 96) && (zn === null ? Bn([e]) : zn.push(e)), !r.is_fork && Nt.size > 0 && !Ft && Vt();
	}
	return t;
}
function Vt() {
	Ft = !1;
	for (let e of Nt) {
		e.f & 1024 && P(e, S);
		let t;
		try {
			t = Kn(e);
		} catch {
			t = !0;
		}
		t && Qn(e);
	}
	Nt.clear();
}
function Ht(e) {
	R(e, e.v + 1);
}
function Ut(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = qe(), a = r.length;
		if (zt += a, zt > 1e5 && Rt === null && (Rt = /* @__PURE__ */ new Set()), Rt !== null) {
			if (Rt.has(e)) return;
			Rt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== K) {
				var l = (c & x) === 0;
				if (l && P(s, t), c & 131072) Nt.add(s);
				else if (c & 2) {
					var u = s;
					_t?.delete(u), Ut(u, S, n);
				} else if (l) {
					var d = s;
					c & 16 && Ot !== null && Ot.add(d), n === null ? At(d) : n.push(d);
				}
			}
		}
	}
}
function Wt(e) {
	if (typeof e != "object" || !e || se in e || ce in e) return e;
	let t = p(e);
	if (t !== d && t !== f) return e;
	var n = /* @__PURE__ */ new Map(), r = i(e), a = /* @__PURE__ */ L(0), o = null, s = Un, c = (e) => {
		if (Un === s) return e();
		var t = G, n = Un;
		Pn(null), Wn(s);
		var r = e();
		return Pn(t), Wn(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ L(e.length, o)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || ze();
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
					n.set(t, e), Ht(a);
				}
			} else R(r, D), Ht(a);
			return !0;
		},
		get(t, r, i) {
			if (r === se) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || l(t, r)?.writable) && (a = c(() => /* @__PURE__ */ L(Wt(s ? t[r] : D), o)), n.set(r, a)), a !== void 0) {
				var u = J(a);
				return u === D ? void 0 : u;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = J(i);
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
			return (r !== void 0 || K !== null && (!i || l(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ L(i ? Wt(e[t]) : D, o)), n.set(t, r)), J(r) === D) ? !1 : i;
		},
		set(e, t, i, s) {
			var u = n.get(t), d = t in e;
			if (r && t === "length") for (var f = i; f < u.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ L(D, o)), n.set(f + "", p)) : R(p, D);
			}
			if (u === void 0) (!d || l(e, t)?.writable) && (u = c(() => /* @__PURE__ */ L(void 0, o)), R(u, Wt(i)), n.set(t, u));
			else {
				d = u.v !== D;
				var m = c(() => Wt(i));
				R(u, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, i), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				Ht(a);
			}
			return !0;
		},
		ownKeys(e) {
			J(a);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== D;
			});
			for (var [r, i] of n) i.v !== D && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Be();
		}
	});
}
var Gt, Kt, qt, Jt;
function Yt() {
	if (Gt === void 0) {
		Gt = window, Kt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		qt = l(t, "firstChild").get, Jt = l(t, "nextSibling").get, m(e) && (e[fe] = void 0, e[de] = null, e[pe] = void 0, e.__e = void 0), m(n) && (n[me] = void 0);
	}
}
function Xt(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Zt(e) {
	return qt.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Qt(e) {
	return Jt.call(e);
}
function z(e, t) {
	if (!O) return /* @__PURE__ */ Zt(e);
	var n = /* @__PURE__ */ Zt(k);
	if (n === null) n = k.appendChild(Xt());
	else if (t && n.nodeType !== 3) {
		var r = Xt();
		return n?.before(r), Ce(r), r;
	}
	return t && nn(n), Ce(n), n;
}
function B(e, t = !1) {
	if (!O) {
		var n = /* @__PURE__ */ Zt(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Qt(n) : n;
	}
	if (t) {
		if (k?.nodeType !== 3) {
			var r = Xt();
			return k?.before(r), Ce(r), r;
		}
		nn(k);
	}
	return k;
}
function V(e, t = !1) {
	if (!O) return /* @__PURE__ */ Zt(e);
	var n = z(e, t);
	return A(e), n;
}
function H(e, t = 1, n = !1) {
	let r = O ? k : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Qt(r);
	if (!O) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = Xt();
			return r === null ? i?.after(a) : r.before(a), Ce(a), a;
		}
		nn(r);
	}
	return Ce(r), r;
}
function $t(e) {
	e.textContent = "";
}
function en() {
	return !1;
}
function tn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function nn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function rn(e) {
	var t = K;
	if (t === null) return G.f |= oe, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	an(e, t);
}
function an(e, t) {
	if (e === _e) throw e;
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
function on(e) {
	K === null && (G === null && Ie(e), Fe()), jn && Pe(e);
}
function sn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function cn(e, t) {
	var n = K;
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
	if (e & 4) xt === null ? Tt.ensure().schedule(r) : xt.push(r);
	else if (t !== null) {
		try {
			Qn(r);
		} catch (e) {
			throw W(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= te));
	}
	if (i !== null && (i.parent = n, n !== null && sn(i, n), G !== null && G.f & 2 && !(e & 64))) {
		var a = G;
		(a.effects ??= []).push(i);
	}
	return r;
}
function ln() {
	return G !== null && !Nn;
}
function un(e) {
	let t = cn(8, null);
	return P(t, b), t.teardown = e, t;
}
function dn(e) {
	on("$effect");
	var t = K.f;
	if (!G && t & 32 && j !== null && !j.i) {
		var n = j;
		(n.e ??= []).push(e);
	} else return fn(e);
}
function fn(e) {
	return cn(4 | ne, e);
}
function pn(e) {
	return on("$effect.pre"), cn(8 | ne, e);
}
function mn(e) {
	Tt.ensure();
	let t = cn(64 | E, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Tn(t, () => {
			W(t), n(void 0);
		}) : (W(t), n(void 0));
	});
}
function hn(e) {
	return cn(4, e);
}
function gn(e) {
	return cn(ae | E, e);
}
function _n(e, t = 0) {
	return cn(8 | t, e);
}
function U(e, t = [], n = [], r = []) {
	nt(r, t, n, (t) => {
		cn(8, () => {
			e(...t.map(J));
		});
	});
}
function vn(e, t = 0) {
	return cn(16 | t, e);
}
function yn(e) {
	return cn(32 | E, e);
}
function bn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = jn, r = G;
		Mn(!0), Pn(null);
		try {
			t.call(null);
		} catch (t) {
			an(t, e.parent);
		} finally {
			Mn(n), Pn(r);
		}
	}
}
function xn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && tt(() => {
			e.abort(he);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : W(n, t), n = r;
	}
}
function Sn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || W(t), t = n;
	}
}
function W(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Cn(e.nodes.start, e.nodes.end), n = !0), e.f |= ee, xn(e, t && !n), Zn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	bn(e), e.f ^= ee, e.f |= w;
	var i = e.parent;
	i !== null && i.first !== null && wn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Cn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Qt(e);
		e.remove(), e = n;
	}
}
function wn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Tn(e, t, n = !0) {
	var r = [];
	e.f |= 256, En(e, r, !0);
	var i = () => {
		n && W(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function En(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= C;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				En(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Dn(e) {
	e.f &= -257, On(e, !0);
}
function On(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= C, e.f & 1024 || (P(e, x), Tt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			On(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function kn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Qt(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var An = null, jn = !1;
function Mn(e) {
	jn = e;
}
var G = null, Nn = !1;
function Pn(e) {
	G = e;
}
var K = null;
function Fn(e) {
	K = e;
}
var In = null;
function Ln(e) {
	G !== null && (G.f & 2097152 || G.f & 2) && (In ??= /* @__PURE__ */ new Set()).add(e);
}
var q = null, Rn = 0, zn = null;
function Bn(e) {
	zn = e;
}
var Vn = 1, Hn = 0, Un = Hn;
function Wn(e) {
	Un = e;
}
function Gn() {
	return ++Vn;
}
function Kn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Kn(a) && ft(a), a.wv > e.wv) return !0;
		}
		t & 512 && _t === null && P(e, b);
	}
	return !1;
}
function qn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(In !== null && In.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? qn(a, t, !1) : t === a && (n ? P(a, x) : a.f & 1024 && P(a, S), At(a));
	}
}
function Jn(e) {
	var t = q, n = Rn, r = zn, i = G, a = In, o = j, s = Nn, c = Un, l = e.f;
	q = null, Rn = 0, zn = null, G = l & 96 ? null : e, In = null, Ge(e.ctx), Nn = !1, Un = ++Hn, e.ac !== null && (tt(() => {
		e.ac.abort(he);
	}), e.ac = null);
	try {
		e.f |= ie;
		var u = e.fn, d = u();
		e.f |= T;
		var f = Yn(e);
		if (qe() && zn !== null && !Nn && f !== null && !(e.f & 6146)) for (var p = 0; p < zn.length; p++) qn(zn[p], e);
		if (i !== null && i !== e) {
			if (Hn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Hn;
			if (t !== null) for (let e of t) e.rv = Hn;
			zn !== null && (r === null ? r = zn : r.push(...zn));
		}
		return e.f & 8388608 && (e.f ^= oe), d;
	} catch (t) {
		return Yn(e), rn(t);
	} finally {
		e.f ^= ie, q = t, Rn = n, zn = r, G = i, In = a, Ge(o), Nn = s, Un = c;
	}
}
function Yn(e) {
	var t = e.deps, n = I?.is_fork;
	if (q !== null) {
		var r;
		if (n || Zn(e, Rn), t !== null && Rn > 0) for (t.length = Rn + q.length, r = 0; r < q.length; r++) t[Rn + r] = q[r];
		else e.deps = t = q;
		if (ln() && e.f & 512) for (r = Rn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Rn < t.length && (Zn(e, Rn), t.length = Rn);
	return t;
}
function Xn(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = a.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (q === null || !o.call(q, t))) {
		var s = t;
		s.f & 512 && (s.f ^= 512), s.v !== D && $e(s), s.ac !== null && tt(() => {
			s.ac.abort(he), s.ac = null, P(s, x);
		}), pt(s), Zn(s, 0);
	}
}
function Zn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Xn(e, n[r]);
}
function Qn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, b);
		var n = K;
		K = e;
		try {
			t & 16777232 ? Sn(e) : xn(e), bn(e);
			var r = Jn(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = Vn;
		} finally {
			K = n;
		}
	}
}
async function $n() {
	await Promise.resolve(), Et();
}
function J(e) {
	var t = !!(e.f & 2);
	if (An?.add(e), G !== null && !Nn && !(K !== null && K.f & 16384) && (In === null || !In.has(e))) {
		var n = G.deps;
		if (G.f & 2097152) e.rv < Hn && (e.rv = Hn, q === null && n !== null && n[Rn] === e ? Rn++ : q === null ? q = [e] : q.push(e));
		else {
			G.deps ??= [], o.call(G.deps, e) || G.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [G] : o.call(r, G) || r.push(G);
		}
	}
	if (jn && Pt.has(e)) return Pt.get(e);
	if (t) {
		var i = e;
		if (jn) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || tr(i)) && (a = dt(i)), Pt.set(i, a), a;
		}
		var s = !(i.f & 512) && !Nn && G !== null && !!(G.f & 512), c = (i.f & T) === 0;
		Kn(i) && (s && (i.f |= 512), ft(i)), s && !c && (mt(i), er(i));
	}
	if (_t?.has(e)) return _t.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function er(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : o.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (mt(n), er(n));
	}
}
function tr(e) {
	if (e.v === D) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Pt.has(t) || t.f & 2 && tr(t)) return !0;
	return !1;
}
function nr(e) {
	var t = Nn;
	try {
		return Nn = !0, e();
	} finally {
		Nn = t;
	}
}
function rr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (se in e) ir(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && se in n && ir(n);
		}
	}
}
function ir(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			ir(e[n], t);
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
var ar = ["touchstart", "touchmove"];
function or(e) {
	return ar.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var sr = Symbol("events"), cr = /* @__PURE__ */ new Set(), lr = /* @__PURE__ */ new Set();
function ur(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || gr.call(t, e), !e.cancelBubble) return tt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, Xe(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function dr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = ur(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && un(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function fr(e, t, n) {
	(t[sr] ??= {})[e] = n;
}
function pr(e) {
	for (var t = 0; t < e.length; t++) cr.add(e[t]);
	for (var n of lr) n(e);
}
var mr = null, hr = !1;
function gr(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	mr = e, hr || (hr = !0, setTimeout(() => {
		hr = !1, mr = null;
	}));
	var o = 0, s = mr === e && e[sr];
	if (s) {
		var l = i.indexOf(s);
		if (l !== -1 && (t === document || t === window)) {
			e[sr] = t;
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
		var d = G, f = K;
		Pn(null), Fn(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[sr]?.[r];
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
			e[sr] = t, delete e.currentTarget, Pn(d), Fn(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var _r = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function vr(e) {
	return _r?.createHTML(e) ?? e;
}
function yr(e) {
	var t = tn("template");
	return t.innerHTML = vr(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function br(e, t) {
	var n = K;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function Y(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (O) return br(k, null), k;
		i === void 0 && (i = yr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Zt(i)));
		var t = r || Kt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Zt(t), s = t.lastChild;
			br(o, s);
		} else br(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function xr(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (O) return br(k, null), k;
		if (!o) {
			var e = /* @__PURE__ */ Zt(yr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ Zt(e);) o.appendChild(/* @__PURE__ */ Zt(e));
			else o = /* @__PURE__ */ Zt(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ Zt(t), r = t.lastChild;
			br(n, r);
		} else br(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Sr(e, t) {
	return /* @__PURE__ */ xr(e, t, "svg");
}
function Cr() {
	if (O) return br(k, null), k;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = Xt();
	return e.append(t, n), br(t, n), e;
}
function X(e, t) {
	if (O) {
		var n = K;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = k), we();
	} else e !== null && e.before(t);
}
function wr() {
	if (O && k && k.nodeType === 8 && k.textContent?.startsWith("$")) {
		let e = k.textContent.substring(1);
		return we(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Tr(e) {
	let t = 0, n = It(0), r;
	return () => {
		ln() && (J(n), _n(() => (t === 0 && (r = nr(() => e(() => Ht(n)))), t += 1, () => {
			Xe(() => {
				--t, t === 0 && (r?.(), r = void 0, Ht(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Er = te | E;
function Dr(e, t, n, r) {
	new Or(e, t, n, r);
}
var Or = class {
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
	#h = Tr(() => (this.#m = It(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = K;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = K.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = vn(() => {
			if (O) {
				let e = De(this.#t);
				we();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Er), O && (this.#e = k);
	}
	#g() {
		try {
			this.#a = yn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Xe(r), t && (this.#s = yn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? xe() : (t = !0, n && He(), this.#s !== null && Tn(this.#s, () => {
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
					an(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (w | ee)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = yn(() => e(this.#e)), Xe(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = Xt(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return yn(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							an(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(I)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Tn(this.#o, () => {
					this.#o = null;
				}), this.#S(I));
			}
		}));
	}
	#x() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = yn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				kn(this.#a, e);
				let t = this.#n.pending;
				this.#o = yn(() => t(this.#e));
			} else this.#S(I);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		et(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = K, n = G, r = j;
		Fn(this.#i), Pn(this.#i), Ge(this.#i.ctx);
		try {
			return Tt.ensure(), e();
		} finally {
			Fn(t), Pn(n), Ge(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && Tn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Xe(() => {
			this.#d = !1, this.#m && Bt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), J(this.#m);
	}
	error(e) {
		if (e === _e || !this.#n.onerror && !this.#n.failed) throw e;
		I?.is_fork ? (this.#a && I.skip_effect(this.#a), this.#o && I.skip_effect(this.#o), this.#s && I.skip_effect(this.#s), I.oncommit(() => {
			this.#y() || this.#T(e);
		})) : this.#T(e);
	}
	#T(e) {
		this.#a &&= (W(this.#a), null), this.#o &&= (W(this.#o), null), this.#s &&= (W(this.#s), null), O && (Ce(this.#t), Te(), Ce(Ee()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return yn(() => {
						var r = K;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return an(e, this.#i.parent), null;
				}
			}));
		};
		Xe(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					an(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => an(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function Z(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[me] ??= e.nodeValue) && (e[me] = n, e.nodeValue = `${n}`);
}
function kr(e, t) {
	return jr(e, t);
}
var Ar = /* @__PURE__ */ new Map();
function jr(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: c }) {
	Yt();
	var l = void 0, u = mn(() => {
		var o = n ?? t.appendChild(Xt());
		Dr(o, { pending: () => {} }, (t) => {
			M({});
			var n = j;
			if (a && (n.c = a), i && (r.$$events = i), O && br(t, null), l = e(t, r) || Ke(), O && (K.nodes.end = k, k === null || k.nodeType !== 8 || k.data !== "]")) throw be(), _e;
			N();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = or(r);
					for (let e of [t, document]) {
						var a = Ar.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Ar.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, gr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(s(cr)), lr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Ar.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, gr), r.delete(e), r.size === 0 && Ar.delete(n)) : r.set(e, i);
			}
			lr.delete(d), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Mr.set(l, u), l;
}
var Mr = /* @__PURE__ */ new WeakMap(), Nr = class {
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
			if (n) Dn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Dn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (W(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						kn(r, t), t.append(Xt()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else W(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Tn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (W(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = en();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = Xt();
				i.append(a), this.#n.set(e, {
					effect: yn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, yn(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else O && (this.anchor = k), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Q(e, t, n = !1) {
	var r;
	O && (r = k, we());
	var i = new Nr(e), a = n ? te : 0;
	function o(e, t) {
		if (O) {
			var n = De(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ee();
				Ce(a), i.anchor = a, Se(!1), i.ensure(e, t), Se(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	vn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Pr(e, t) {
	return t;
}
function Fr(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, c = 0; c < i; c++) {
		let n = t[c];
		Tn(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Ir(e, s(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			$t(d), d.append(u), e.items.clear();
		}
		Ir(e, t, !l);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Ir(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= re, kn(a, document.createDocumentFragment())) : W(t[i], n);
	}
}
var Lr;
function Rr(e, t, n, r, a, o = null) {
	var c = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		c = O ? Ce(/* @__PURE__ */ Zt(u)) : u.appendChild(Xt());
	}
	O && we();
	var d = null, f = /* @__PURE__ */ lt(() => {
		var e = n();
		return i(e) ? e : e == null ? [] : s(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = J(f);
			_.fallback = d, Br(_, n, c, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= re, Hr(d, null, c)) : Dn(d) : Tn(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: vn(() => {
			var e = J(f), i = e.length;
			let s = !1;
			O && De(c) === "[!" != (i === 0) && (c = Ee(), Ce(c), Se(!1), s = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = I, v = en(), y = 0; y < i; y += 1) {
				O && k.nodeType === 8 && k.data === "]" && (c = k, s = !0, Se(!1));
				var b = e[y], x = r(b, y), S = m ? null : l.get(x);
				S ? (S.v && Bt(S.v, b), S.i && Bt(S.i, y), v && _.unskip_effect(S.e)) : (S = Vr(l, m ? c : Lr ??= Xt(), b, x, y, a, t, n), m || (S.e.f |= re), l.set(x, S)), u.add(x);
			}
			if (i === 0 && o && !d && (m ? d = yn(() => o(c)) : (d = yn(() => o(Lr ??= Xt())), d.f |= re)), i > u.size && Ne("", "", ""), O && i > 0 && Ce(Ee()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			s && Se(!0), J(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, O && (c = k);
}
function zr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Br(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, c = e.items, l = zr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (a) for (v = 0; v < o; v += 1) h = t[v], g = i(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (h = t[v], g = i(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Dn(_), a && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= re, _ === l) Hr(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Ur(e, d, _), Ur(e, _, y), Hr(_, y, n), d = _, p = [], m = [], l = zr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Hr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Ur(e, S.prev, C.next), Ur(e, d, S), Ur(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Hr(_, l, n), Ur(e, _.prev, _.next), Ur(e, _, d === null ? e.effect.first : d.next), Ur(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = zr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = zr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Ir(e, s(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = zr(l.next);
		var T = w.length;
		if (T > 0) {
			var ee = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			Fr(e, w, ee);
		}
	}
	a && Xe(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Vr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? It(n) : /* @__PURE__ */ Lt(n, !1, !1) : null, l = o & 2 ? It(i) : null;
	return {
		v: c,
		i: l,
		e: yn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Hr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Qt(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Ur(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function Wr(e, t, ...n) {
	var r = new Nr(e);
	vn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, te);
}
// node_modules/clsx/dist/clsx.mjs
function Gr(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Gr(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Kr() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Gr(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/svelte/src/internal/shared/attributes.js
function qr(e) {
	return typeof e == "object" ? Kr(e) : e ?? "";
}
var Jr = [..." 	\n\r\f\xA0\v﻿"];
function Yr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Jr.includes(r[o - 1])) && (s === r.length || Jr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Xr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Zr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Qr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Zr)), i && c.push(...Object.keys(i).map(Zr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Zr(e.substring(l, u).trim());
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
		return r && (n += Xr(r)), i && (n += Xr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function $r(e, t, n, r, i, a) {
	var o = e[fe];
	if (O || o !== n || o === void 0) {
		var s = Yr(n, r, a);
		O && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[fe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function ei(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function ti(e, t, n, r) {
	var i = e[pe];
	if (O || i !== t) {
		var a = Qr(t, r);
		O && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[pe] = t;
	} else r && (Array.isArray(r) ? (ei(e, n?.[0], r[0]), ei(e, n?.[1], r[1], "important")) : ei(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ni = Symbol("is custom element"), ri = Symbol("is html"), ii = ge ? "link" : "LINK";
function $(e, t, n, r) {
	var i = ai(e);
	O && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ii) || i[t] !== (i[t] = n) && (t === "loading" && (e[ue] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && si(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function ai(e) {
	return e[de] ??= {
		[ni]: e.nodeName.includes("-"),
		[ri]: e.namespaceURI === ve
	};
}
var oi = /* @__PURE__ */ new Map();
function si(e) {
	var t = e.getAttribute("is") || e.nodeName, n = oi.get(t);
	if (n) return n;
	oi.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = u(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = p(i);
	}
	return n;
}
var ci = /* @__PURE__ */ new class e {
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
function li(e, t, n) {
	var r = ci.observe(e, () => n(e[t]));
	hn(() => (nr(() => n(e[t])), r));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ui(e, t) {
	return e === t || e?.[se] === t;
}
function di(e = Ke(), t, n, r) {
	var i = j.r, a = K;
	return hn(() => {
		var o, s;
		return _n(() => {
			o = s, s = r?.() || [], nr(() => {
				ui(n(...s), e) || (t(e, ...s), o && ui(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ui(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
function fi(e, t, n = t) {
	var r = e === "x", i = () => tt(() => {
		a = !0, clearTimeout(o), o = setTimeout(s, 100), n(window[r ? "scrollX" : "scrollY"]);
	});
	addEventListener("scroll", i, { passive: !0 });
	var a = !1, o, s = () => {
		a = !1;
	}, c = !0;
	_n(() => {
		var e = t();
		c ? c = !1 : !a && e != null && (a = !0, clearTimeout(o), r ? scrollTo(e, window.scrollY) : scrollTo(window.scrollX, e), o = setTimeout(s, 100));
	}), hn(i), un(() => {
		removeEventListener("scroll", i);
	});
}
// node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function pi(e = !1) {
	let t = j, n = t.l.u;
	if (!n) return;
	let r = () => rr(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ ot(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => J(i);
	}
	n.b.length && pn(() => {
		mi(t, r), _(n.b);
	}), dn(() => {
		let e = nr(() => n.m.map(g));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && dn(() => {
		mi(t, r), _(n.a);
	});
}
function mi(e, t) {
	if (e.l.s) for (let t of e.l.s) J(t);
	t();
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var hi = !1;
function gi(e) {
	var t = hi;
	try {
		return hi = !1, [e(), hi];
	} finally {
		hi = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function _i(e, t, n, r) {
	var i = !Ue || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, u = void 0, d = () => o && i ? (u ??= /* @__PURE__ */ ot(r), J(u)) : (c && (c = !1, s = o ? nr(r) : r), s);
	let f;
	if (a) {
		var p = se in e || le in e;
		f = l(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = gi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Re(t), f(m)));
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
	var v = !1, y = (n & 1 ? ot : lt)(() => (v = !1, g()));
	a && J(y);
	var b = K;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? J(y) : i && a ? Wt(e) : e;
			return R(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return jn && v || b.f & 16384 ? y.v : J(y);
	});
}
function vi(e) {
	j === null && je("onMount"), Ue && j.l !== null ? yi(j).m.push(e) : dn(() => {
		let t = nr(e);
		if (typeof t == "function") return t;
	});
}
function yi(e) {
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
var bi = (e) => Math.min(1, Math.max(0, e)), xi = (e) => String(e).padStart(2, "0"), Si = (e, t) => t > 0 ? bi(e / t) : 1, Ci = (e) => [
	Si(e.runs, e.goal.runs),
	Si(e.gym, e.goal.gym),
	bi(e.bonus)
];
function wi(e) {
	let t = e.xp - e.level_floor, n = e.next_level_xp - e.level_floor;
	return {
		level: e.level,
		into: t,
		span: n,
		frac: n > 0 ? bi(t / n) : 1
	};
}
var Ti = (e) => `Week ${Number(e.week.split("-W")[1])} · ${e.days_left} ${e.days_left === 1 ? "day" : "days"} left`;
function Ei(e, t, n = 15) {
	let r = new Date(e);
	return t - r > n * 6e4 ? `Updated ${xi(r.getHours())}:${xi(r.getMinutes())}` : null;
}
var Di = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], Oi = [
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
function ki(e) {
	let t = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(e);
	if (!t) return "";
	let [, n, r, i, a] = t;
	return `${Di[new Date(Date.UTC(n, r - 1, i)).getUTCDay()]} ${Number(i)} ${Oi[r - 1]}, ${a}`;
}
var Ai = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${xi(e % 60)} min` : `${e / 60} h`;
function ji(e) {
	if (e.kind !== "run" && e.kind !== "walk" || !(e.km > 0)) return null;
	let t = Math.round(e.minutes * 60 / e.km);
	return `${Math.floor(t / 60)}:${xi(t % 60)} /km`;
}
var Mi = (e) => ({
	title: e.name,
	when: ki(e.start),
	duration: Ai(e.minutes),
	xp: e.xp ? `+${e.xp}` : "",
	detail: {
		km: e.km == null ? null : `${e.km.toFixed(1)} km`,
		pace: ji(e),
		hr: e.avg_hr == null ? null : `${e.avg_hr} bpm`,
		plan: e.plan ?? null,
		url: e.url ?? null
	},
	removable: e.excluded ? "restore" : e.key.startsWith("manual:") ? "delete" : "remove"
});
function Ni(e) {
	let t = [["walk", e.warmup_s ?? 0], ...e.intervals].filter(([, e]) => e > 0), n = t.reduce((e, [, t]) => e + t, 0);
	return t.map(([e, t]) => ({
		kind: e,
		frac: t / n
	}));
}
function Pi(e, t) {
	let n = Object.hasOwn(t, e.person) ? e.person : null;
	return {
		self: n,
		others: Object.keys(t).filter((e) => e !== n)
	};
}
var Fi = (e) => `${Number(e.slice(8, 10))} ${Oi[Number(e.slice(5, 7)) - 1]}`;
function Ii(e, t, n) {
	let r = t.find((t) => t.key === e.key);
	return n - e.at > 6e5 || !r || e.want !== null && r.excluded === e.want;
}
function Li(e, t, n) {
	let r = (e[t] ?? Promise.resolve()).then(n), i = e[t] = r.catch(() => {});
	return i.then(() => e[t] === i && delete e[t]), r;
}
function Ri(e) {
	let t = (e) => e < 10 ? e.toFixed(1) : Math.round(e).toLocaleString(), n = e.km == null ? "unknown" : e.km >= e.limit ? "replace" : e.km >= .9 * e.limit ? "soon" : "ok", r = e.last_run ? new Date(e.last_run) : null, i = e.runs ? `${e.runs} ${e.runs === 1 ? "run" : "runs"}` : e.runs === 0 ? "No runs yet" : "";
	return {
		name: e.name,
		km: e.km == null ? "—" : `${t(e.km)} / ${t(e.limit)} km`,
		frac: e.km == null ? 0 : bi(e.km / e.limit),
		state: n,
		label: {
			soon: "Replace soon",
			replace: "Replace"
		}[n] ?? null,
		detail: [i, r && `last run ${r.getDate()} ${Oi[r.getMonth()]}`].filter(Boolean).join(" · ")
	};
}
// src/lib/actions.svelte.js
var zi = 5e3, Bi = Wt({}), Vi = Wt({
	on: !1,
	text: "",
	undo: null
}), Hi, Ui = 0, Wi = {};
function Gi(e, t = null) {
	clearTimeout(Hi), Object.assign(Vi, {
		on: !0,
		text: e,
		undo: t
	}), Hi = setTimeout(() => Vi.on = !1, zi);
}
function Ki(e, t = Date.now()) {
	for (let [n, r] of Object.entries(Bi)) Ii(r, e[r.person]?.feed ?? [], t) && delete Bi[n];
}
async function qi(e, t, r) {
	let i = `${e}/${t}`, a = Bi[i], o = ++Ui, s = t.startsWith("manual:");
	Bi[i] = {
		person: e,
		key: t,
		want: s && r === "remove" ? null : r === "remove",
		at: Date.now(),
		n: o
	}, r === "remove" && !s && Gi("Removed", () => qi(e, t, "restore"));
	try {
		await Li(Wi, i, () => n("POST", "workouts", {
			person: e,
			key: t,
			action: r
		}));
	} catch (e) {
		Bi[i]?.n === o && (a ? Bi[i] = a : delete Bi[i]), Gi(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
// src/lib/ui/Badges.svelte
var Ji = /* @__PURE__ */ Y("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), Yi = /* @__PURE__ */ Y("<ul class=\"svelte-m8wnum\"></ul>"), Xi = /* @__PURE__ */ Y("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), Zi = /* @__PURE__ */ Y("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), Qi = /* @__PURE__ */ Y("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function $i(e, t) {
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
		medal: "🏅"
	}, r = (e) => n[String(e.icon).replace(/^mdi:/, "")] ?? "🏅", i = (e) => e.toLocaleString(void 0, { maximumFractionDigits: 1 });
	var a = Qi(), o = z(a), s = (e) => {
		var n = Yi();
		Rr(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = Ji(), i = z(n), a = V(i, !0), o = H(i, 2), s = V(o, !0), c = V(H(o, 2), !0);
			A(n), U((e, n) => {
				Z(a, e), Z(s, J(t).title), Z(c, n);
			}, [() => r(J(t)), () => Fi(J(t).unlocked_at)]), X(e, n);
		}), A(n), X(e, n);
	};
	Q(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = H(o, 2), l = (e) => {
		var n = Yi();
		Rr(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = Xi(), a = z(n), o = V(a, !0), s = H(a, 2), c = V(s, !0), l = H(s, 2), u = V(l), d = H(l, 2), f = z(d);
			let p;
			A(d), A(n), U((e, n, r, i) => {
				Z(o, e), Z(c, J(t).title), Z(u, `${n ?? ""} of ${r ?? ""}`), p = ti(f, "", p, { width: i });
			}, [
				() => r(J(t)),
				() => i(J(t).current),
				() => i(J(t).target),
				() => `${Math.min(1, J(t).current / J(t).target) * 100}%`
			]), X(e, n);
		}), A(n), X(e, n);
	};
	Q(c, (e) => {
		t.badges.next.length && e(l);
	});
	var u = H(c, 2), d = (e) => {
		X(e, Zi());
	};
	Q(u, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(d);
	}), A(a), X(e, a), N();
}
// src/lib/media.svelte.js
var ea = Wt({
	wide: !1,
	reducedMotion: !1
}), ta = matchMedia("(min-width: 768px)"), na = matchMedia("(prefers-reduced-motion: reduce)"), ra = () => {
	ea.wide = ta.matches, ea.reducedMotion = na.matches;
};
ta.addEventListener("change", ra), na.addEventListener("change", ra), ra();
// src/lib/motion.js
function ia(e, { onFrame: t, onSettle: n, snap: r = {
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
var aa = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), oa = (e) => aa(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function sa({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var ca = /* @__PURE__ */ Y("<span class=\"mini svelte-69s4be\"> </span>"), la = /* @__PURE__ */ Y("<span class=\"mini svelte-69s4be\">Together</span>"), ua = /* @__PURE__ */ Y("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), da = /* @__PURE__ */ Y("<div><dt class=\"svelte-69s4be\"> </dt><dd class=\"svelte-69s4be\"> </dd></div>"), fa = /* @__PURE__ */ Y("<dl class=\"svelte-69s4be\"></dl>"), pa = /* @__PURE__ */ Y("<a class=\"btn link svelte-69s4be\" target=\"_blank\" rel=\"noopener noreferrer\">Open in Endurain</a>"), ma = /* @__PURE__ */ Y("<span class=\"ask svelte-69s4be\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-69s4be\">Delete</button>", 1), ha = /* @__PURE__ */ Y("<button type=\"button\"> </button>"), ga = /* @__PURE__ */ Y("<li><button type=\"button\" class=\"head svelte-69s4be\"><span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span></button> <div><div class=\"inner svelte-69s4be\"><!> <div class=\"acts svelte-69s4be\"><!> <!></div></div></div></li>");
function _a(e, t) {
	let n = wr();
	M(t, !0);
	let r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️"
	}, i = /* @__PURE__ */ F(() => Bi[`${t.person}/${t.item.key}`]), a = /* @__PURE__ */ F(() => Mi(J(i) && J(i).want !== null ? {
		...t.item,
		excluded: J(i).want
	} : t.item)), o = /* @__PURE__ */ F(() => [
		["Distance", J(a).detail.km],
		["Pace", J(a).detail.pace],
		["Avg heart rate", J(a).detail.hr],
		["Plan session", J(a).detail.plan]
	].filter(([, e]) => e)), s = /* @__PURE__ */ F(() => J(i)?.want === null), c = /* @__PURE__ */ L(!1), l = /* @__PURE__ */ L(!1), u, d, f = sa({
		response: .35,
		damping: 1
	}), p = ia(f, {
		onFrame: (e) => u.style.height = `${e}px`,
		onSettle: () => J(c) && (u.style.height = "auto")
	});
	dn(() => p.stop);
	function m() {
		R(c, !J(c)), R(l, !1), ea.reducedMotion ? u.style.height = J(c) ? "auto" : "0px" : (p.running || (f.value = u.offsetHeight), p.to(J(c) ? d.offsetHeight : 0));
	}
	let h = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function g() {
		J(a).removable === "delete" ? R(l, !0) : qi(t.person, t.item.key, J(a).removable);
	}
	var _ = ga();
	let v;
	var b = z(_), x = z(b), S = V(x, !0), C = H(x, 2), w = z(C), T = z(w), ee = H(T), te = (e) => {
		var n = ca(), r = V(n, !0);
		U(() => Z(r, t.item.plan)), X(e, n);
	};
	Q(ee, (e) => {
		t.item.plan && e(te);
	});
	var E = H(ee, 2), ne = (e) => {
		X(e, la());
	};
	Q(E, (e) => {
		t.item.joint && e(ne);
	}), A(w);
	var re = V(H(w, 2));
	A(C);
	var ie = H(C, 2), ae = z(ie), oe = (e) => {
		X(e, ua());
	};
	Q(ae, (e) => {
		J(i) && e(oe);
	});
	var se = H(ae);
	A(ie), A(b);
	var ce = H(b, 2);
	let le;
	var ue = z(ce), de = z(ue), fe = (e) => {
		var t = fa();
		Rr(t, 21, () => J(o), ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ F(() => y(J(t), 2));
			let r = () => J(n)[0], i = () => J(n)[1];
			var a = da(), o = z(a), s = V(o, !0), c = V(H(o), !0);
			A(a), U(() => {
				Z(s, r()), Z(c, i());
			}), X(e, a);
		}), A(t), X(e, t);
	};
	Q(de, (e) => {
		J(o).length && e(fe);
	});
	var pe = H(de, 2), me = z(pe), he = (e) => {
		var t = pa();
		U(() => $(t, "href", J(a).detail.url)), X(e, t);
	};
	Q(me, (e) => {
		J(a).detail.url && e(he);
	});
	var ge = H(me, 2), _e = (e) => {
		var n = Cr(), r = B(n), i = (e) => {
			var n = ma(), r = H(B(n), 2), i = H(r, 2);
			fr("click", r, () => R(l, !1)), fr("click", i, () => (m(), qi(t.person, t.item.key, "remove"))), X(e, n);
		}, o = (e) => {
			var t = ha();
			let n;
			var r = V(t, !0);
			U(() => {
				n = $r(t, 1, "btn svelte-69s4be", null, n, { danger: J(a).removable !== "restore" }), Z(r, h[J(a).removable]);
			}), fr("click", t, g), X(e, t);
		};
		Q(r, (e) => {
			J(l) ? e(i) : e(o, -1);
		}), X(e, n);
	};
	Q(ge, (e) => {
		t.canEdit && !J(s) && e(_e);
	}), A(pe), A(ue), di(ue, (e) => d = e, () => d), A(ce), di(ce, (e) => u = e, () => u), A(_), U(() => {
		v = $r(_, 1, "svelte-69s4be", null, v, { dim: J(a).removable === "restore" || J(s) }), $(b, "aria-expanded", J(c)), $(b, "aria-controls", `${n}-more`), $r(x, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), Z(S, r[t.item.kind] ?? "💪"), Z(T, `${J(a).title ?? ""} `), Z(re, `${J(a).when ?? ""} · ${J(a).duration ?? ""}`), Z(se, ` ${(J(a).removable === "restore" ? "Removed" : J(a).xp && `${J(a).xp} XP`) ?? ""}`), le = $r(ce, 1, "more svelte-69s4be", null, le, { open: J(c) }), $(ce, "id", `${n}-more`), ce.inert = !J(c);
	}), fr("click", b, m), X(e, _), N();
}
pr(["click"]);
// src/lib/ui/Feed.svelte
var va = /* @__PURE__ */ Y("<ul class=\"card svelte-n1344i\"></ul>"), ya = /* @__PURE__ */ Y("<p class=\"caption empty svelte-n1344i\">No workouts in the last 30 days.</p>");
function ba(e, t) {
	M(t, !0);
	var n = Cr(), r = B(n), i = (e) => {
		var n = va();
		Rr(n, 21, () => t.items, (e) => e.key, (e, n) => {
			_a(e, {
				get person() {
					return t.person;
				},
				get item() {
					return J(n);
				},
				get canEdit() {
					return t.canEdit;
				}
			});
		}), A(n), X(e, n);
	}, a = (e) => {
		X(e, ya());
	};
	Q(r, (e) => {
		t.items.length ? e(i) : e(a, -1);
	}), X(e, n), N();
}
// src/lib/ui/PlanBar.svelte
var xa = /* @__PURE__ */ Y("<span> </span>"), Sa = /* @__PURE__ */ Y("<i class=\"svelte-1y5m0aq\"></i>"), Ca = /* @__PURE__ */ Y("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), wa = /* @__PURE__ */ Y("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!></div>");
function Ta(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => Ni(t.plan)), r = /* @__PURE__ */ F(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0)) / 60));
	var i = wa(), a = z(i), o = z(a), s = V(o, !0), c = H(o, 2), l = (e) => {
		var n = xa();
		let r;
		var i = V(n, !0);
		U(() => {
			r = $r(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), Z(i, t.plan.due_today ? "Due today" : "Rest day");
		}), X(e, n);
	};
	Q(c, (e) => {
		J(n).length && e(l);
	}), A(a);
	var u = H(a, 2), d = (e) => {
		var t = Ca(), i = B(t);
		Rr(i, 21, () => J(n), Pr, (e, t) => {
			var n = Sa();
			let r;
			U(() => r = ti(n, "", r, {
				"flex-grow": J(t).frac,
				background: `var(--${J(t).kind === "run" ? "run" : "fill"})`
			})), X(e, n);
		}), A(i);
		var a = H(i, 2), o = z(a), s = z(o);
		ti(s, "", {}, { background: "var(--run)" }), ti(H(s, 2), "", {}, { background: "var(--fill)" }), Te(), A(o);
		var c = V(H(o, 2));
		A(a), U(() => {
			$(i, "aria-label", `Run and walk intervals, ${J(r) ?? ""} minutes in total`), Z(c, `${J(r) ?? ""} min`);
		}), X(e, t);
	};
	Q(u, (e) => {
		J(n).length && e(d);
	}), A(i), U(() => Z(s, t.plan.state)), X(e, i), N();
}
// src/lib/ui/Records.svelte
var Ea = /* @__PURE__ */ Y("<div class=\"svelte-70kwy0\"><dt class=\"svelte-70kwy0\"> </dt><dd class=\"svelte-70kwy0\"> </dd></div>"), Da = /* @__PURE__ */ Y("<dl class=\"card svelte-70kwy0\"></dl>");
function Oa(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => [
		["Longest session", `${t.pbs.longest_session_km.toFixed(1)} km`],
		["Gym PRs", t.pbs.prs.toLocaleString()],
		["Total lifted", `${t.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 })} t`]
	]);
	var r = Da();
	Rr(r, 21, () => J(n), ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ F(() => y(J(t), 2));
		let r = () => J(n)[0], i = () => J(n)[1];
		var a = Ea(), o = z(a), s = V(o, !0), c = V(H(o), !0);
		A(a), U(() => {
			Z(s, r()), Z(c, i());
		}), X(e, a);
	}), A(r), X(e, r), N();
}
// src/lib/ui/Shoes.svelte
var ka = /* @__PURE__ */ Y("<span class=\"label svelte-eu7fja\"> </span>"), Aa = /* @__PURE__ */ Y("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), ja = /* @__PURE__ */ Y("<ul class=\"card svelte-eu7fja\"></ul>");
function Ma(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => t.shoes.map(Ri));
	var r = ja();
	Rr(r, 23, () => J(n), (e, n) => t.shoes[n].entity_id, (e, t) => {
		var n = Aa(), r = z(n), i = z(r), a = V(i, !0), o = V(H(i), !0);
		A(r);
		var s = H(r, 2), c = z(s);
		let l;
		A(s);
		var u = H(s, 2), d = z(u), f = V(d, !0), p = H(d, 2), m = (e) => {
			var n = ka(), r = V(n, !0);
			U(() => Z(r, J(t).label)), X(e, n);
		};
		Q(p, (e) => {
			J(t).label && e(m);
		}), A(u), A(n), U(() => {
			$r(n, 1, qr(J(t).state), "svelte-eu7fja"), Z(a, J(t).name), Z(o, J(t).km), l = ti(c, "", l, { width: `${J(t).frac * 100}%` }), Z(f, J(t).detail);
		}), X(e, n);
	}), A(r), X(e, r), N();
}
// src/lib/ui/Details.svelte
var Na = /* @__PURE__ */ Y("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), Pa = /* @__PURE__ */ Y("<section><h2 class=\"svelte-1341oik\">Shoes</h2> <!></section>"), Fa = /* @__PURE__ */ Y("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Records</h2> <!></section> <!>", 1);
function Ia(e, t) {
	let n = wr();
	M(t, !0);
	var r = Fa(), i = B(r), a = (e) => {
		var r = Na(), i = z(r);
		Ta(H(i, 2), { get plan() {
			return t.person.plan;
		} }), A(r), U(() => {
			$(r, "aria-labelledby", `${n}-plan`), $(i, "id", `${n}-plan`);
		}), X(e, r);
	};
	Q(i, (e) => {
		t.person.plan && e(a);
	});
	var o = H(i, 2), s = z(o);
	ba(H(s, 2), {
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
	A(l), $i(H(l, 2), { get badges() {
		return t.person.badges;
	} }), A(c);
	var d = H(c, 2), f = z(d);
	Oa(H(f, 2), { get pbs() {
		return t.person.pbs;
	} }), A(d);
	var p = H(d, 2), m = (e) => {
		var r = Pa(), i = z(r);
		Ma(H(i, 2), { get shoes() {
			return t.person.shoes;
		} }), A(r), U(() => {
			$(r, "aria-labelledby", `${n}-shoes`), $(i, "id", `${n}-shoes`);
		}), X(e, r);
	};
	Q(p, (e) => {
		t.person.shoes?.length && e(m);
	}), U(() => {
		$(o, "aria-labelledby", `${n}-feed`), $(s, "id", `${n}-feed`), $(c, "aria-labelledby", `${n}-badges`), $(l, "id", `${n}-badges`), Z(u, `${t.person.badges.count ?? ""} unlocked`), $(d, "aria-labelledby", `${n}-pbs`), $(f, "id", `${n}-pbs`);
	}), X(e, r), N();
}
// src/lib/ui/Header.svelte
var La = /* @__PURE__ */ Y("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), Ra = /* @__PURE__ */ Y("<header><div class=\"in svelte-16l0jix\"><!> <h1 class=\"svelte-16l0jix\"> </h1> <p class=\"svelte-16l0jix\"> </p></div></header>");
function za(e, t) {
	let n = _i(t, "subtitle", 3, ""), r = /* @__PURE__ */ L(0);
	var i = Ra();
	let a;
	var o = z(i), s = z(o), c = (e) => {
		var n = La();
		fr("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), X(e, n);
	};
	Q(s, (e) => {
		t.onback && e(c);
	});
	var l = H(s, 2), u = V(l, !0), d = V(H(l, 2), !0);
	A(o), A(i), U(() => {
		a = $r(i, 1, "svelte-16l0jix", null, a, { scrolled: J(r) > 0 }), Z(u, t.title), Z(d, n() || "\xA0");
	}), fi("y", () => J(r), (e) => R(r, e, !0)), X(e, i);
}
pr(["click"]);
// src/lib/ui/Rings.svelte
var Ba = /* @__PURE__ */ Sr("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Va = /* @__PURE__ */ Sr("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function Ha(e, t) {
	M(t, !0);
	let n = _i(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, a = /* @__PURE__ */ L(Wt(ea.reducedMotion ? i : 0)), o = /* @__PURE__ */ F(() => n() * .11), s = /* @__PURE__ */ F(() => t.fractions.map((e, t) => {
		let s = n() / 2 - J(o) / 2 - t * J(o) * 1.3, c = 2 * Math.PI * s;
		return {
			kind: r[t],
			r: s,
			c,
			len: c * e * J(a) / i
		};
	}));
	vi(() => {
		if (J(a) === i) return;
		let e = ia(sa({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => R(a, e, !0) });
		return e.to(i), e.stop;
	});
	var c = Va();
	let l;
	Rr(c, 21, () => J(s), (e) => e.kind, (e, t) => {
		var r = Ba(), i = B(r);
		let a;
		var s = H(i);
		let c;
		U(() => {
			$(i, "cx", n() / 2), $(i, "cy", n() / 2), $(i, "r", J(t).r), $(i, "stroke-width", J(o)), a = ti(i, "", a, { stroke: `var(--${J(t).kind ?? ""})` }), $(s, "cx", n() / 2), $(s, "cy", n() / 2), $(s, "r", J(t).r), $(s, "stroke-width", J(o)), $(s, "stroke-dasharray", `${J(t).len ?? ""} ${J(t).c ?? ""}`), $(s, "opacity", +(J(t).len > .01)), $(s, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = ti(s, "", c, { stroke: `var(--${J(t).kind ?? ""})` });
		}), X(e, r);
	}), A(c), U(() => {
		$(c, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), l = ti(c, "", l, { width: `${n() / 16}rem` });
	}), X(e, c), N();
}
// src/lib/ui/PersonTile.svelte
var Ua = /* @__PURE__ */ Y("<!> <span class=\"sr\"> </span>", 1), Wa = /* @__PURE__ */ Y("<span class=\"streak svelte-1handop\"> </span>"), Ga = /* @__PURE__ */ Y("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), Ka = /* @__PURE__ */ Y("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), qa = /* @__PURE__ */ Y("<span class=\"body svelte-1handop\"><!> <span class=\"stats svelte-1handop\"></span></span> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), Ja = /* @__PURE__ */ Y("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), Ya = /* @__PURE__ */ Y("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function Xa(e, t) {
	M(t, !0);
	let n = _i(t, "index", 3, 0), r = _i(t, "compact", 3, !1), i = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], a = /* @__PURE__ */ F(() => i[n() % i.length]), o = /* @__PURE__ */ F(() => y(J(a), 2)), s = /* @__PURE__ */ F(() => J(o)[0]), c = /* @__PURE__ */ F(() => J(o)[1]), l = /* @__PURE__ */ F(() => wi(t.person)), u = /* @__PURE__ */ F(() => t.person.week), d = /* @__PURE__ */ F(() => [
		{
			kind: "run",
			label: "Runs",
			n: J(u).runs,
			of: J(u).goal.runs
		},
		{
			kind: "gym",
			label: "Gym",
			n: J(u).gym,
			of: J(u).goal.gym
		},
		{
			kind: "bonus",
			label: "Bonus",
			n: J(u).bonus,
			of: 1
		}
	]), f = /* @__PURE__ */ F(() => [
		`Level ${J(l).level}`,
		r() ? `🔥 ${t.person.streak} wk` : `${t.person.xp.toLocaleString()} XP`,
		J(u).paused && "Week paused"
	].filter(Boolean).join(" · ")), p = /* @__PURE__ */ F(() => `${t.person.name}, level ${J(l).level}. This week ${J(d).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. Streak ${t.person.streak} weeks.`);
	var m = Ya();
	let h;
	var g = z(m), _ = z(g), v = z(_);
	let b;
	var x = V(v, !0), S = H(v, 2), C = z(S), w = V(C, !0), T = V(H(C, 2), !0);
	A(S);
	var ee = H(S, 2), te = (e) => {
		var t = Ua(), n = B(t);
		{
			let e = /* @__PURE__ */ F(() => Ci(J(u)));
			Ha(n, {
				get fractions() {
					return J(e);
				},
				size: 44
			});
		}
		var r = V(H(n, 2), !0);
		U(() => Z(r, J(p))), X(e, t);
	}, E = (e) => {
		var n = Wa(), r = V(n);
		U(() => Z(r, `🔥 ${t.person.streak ?? ""} wk`)), X(e, n);
	};
	Q(ee, (e) => {
		r() ? e(te) : e(E, -1);
	});
	var ne = H(ee, 2), re = (e) => {
		X(e, Ga());
	};
	Q(ne, (e) => {
		t.onopen && e(re);
	}), A(_);
	var ie = H(_, 2), ae = (e) => {
		var t = qa(), n = B(t), r = z(n);
		{
			let e = /* @__PURE__ */ F(() => Ci(J(u))), t = /* @__PURE__ */ F(() => ea.wide ? 112 : 88);
			Ha(r, {
				get fractions() {
					return J(e);
				},
				get size() {
					return J(t);
				}
			});
		}
		var i = H(r, 2);
		Rr(i, 21, () => J(d), (e) => e.kind, (e, t) => {
			var n = Ka(), r = z(n), i = z(r);
			let a;
			var o = H(i, 1, !0);
			A(r);
			var s = H(r, 2), c = z(s, !0), l = V(H(c));
			A(s), A(n), U(() => {
				a = ti(i, "", a, { background: `var(--${J(t).kind ?? ""})` }), Z(o, J(t).label), Z(c, J(t).n), Z(l, `/${J(t).of ?? ""}`);
			}), X(e, n);
		}), A(i), A(n);
		var a = H(n, 2), o = z(a), s = z(o);
		let c;
		A(o);
		var f = V(H(o, 2));
		A(a), U((e, t) => {
			c = ti(s, "", c, { width: `${J(l).frac * 100}%` }), Z(f, `${e ?? ""} of ${t ?? ""} XP to level ${J(l).level + 1}`);
		}, [() => J(l).into.toLocaleString(), () => J(l).span.toLocaleString()]), X(e, t);
	};
	Q(ie, (e) => {
		r() || e(ae);
	}), A(g);
	var oe = H(g, 2), se = (e) => {
		var n = Ja();
		U(() => $(n, "aria-label", J(p))), fr("click", n, function(...e) {
			t.onopen?.apply(this, e);
		}), X(e, n);
	};
	Q(oe, (e) => {
		t.onopen && e(se);
	}), A(m), U((e) => {
		h = $r(m, 1, "tile glass svelte-1handop", null, h, {
			compact: r(),
			opens: t.onopen
		}), $(g, "aria-hidden", t.onopen ? "true" : void 0), b = ti(v, "", b, {
			"--a1": J(s),
			"--a2": J(c)
		}), Z(x, e), Z(w, t.person.name), Z(T, J(f));
	}, [() => t.person.name.slice(0, 1)]), X(e, m), N();
}
pr(["click"]);
// src/lib/gesture.js
var Za = (e, t = .998) => e / 1e3 * t / (1 - t), Qa = (e, t, n) => e + Za(t) > n / 2;
function $a(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var eo = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), to = /* @__PURE__ */ Y("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), no = /* @__PURE__ */ Y("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function ro(e, t) {
	M(t, !0);
	let n = _i(t, "from", 3, null), r = 1e3, i = ea.reducedMotion, a = /* @__PURE__ */ L(Wt(i ? r : 0)), o = /* @__PURE__ */ L(0), s = /* @__PURE__ */ L(1), c = /* @__PURE__ */ L(!1), l = /* @__PURE__ */ L("50% 100%"), u, d, f = !1, p = null, m = /* @__PURE__ */ F(() => i ? +J(c) : Math.min(1, J(a) / 500)), h = /* @__PURE__ */ F(() => i ? 1 : .5 + .5 * J(a) / r), g = () => {
		f && (J(a) === 0 || J(o) >= J(s)) && (f = !1, t.onclose());
	};
	function _(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = sa({
					value: r,
					damping: o,
					response: s
				}), n = ia(t, {
					onFrame: e,
					onSettle: g
				}), n.to(i, a);
			}
		};
	}
	let v = _((e) => R(a, e, !0)), y = _((e) => R(o, e, !0));
	function b() {
		f || p || (f = !0, i ? (R(c, !1), setTimeout(t.onclose, oa("--fade"))) : v.to(J(a), 0, { response: .3 }));
	}
	function x(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), v.stop(), y.stop(), f = !1, p = {
			from: J(o),
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
		R(o, t < 0 ? -eo(-t, J(s)) : t, !0), p.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), p.samples.length > 8 && p.samples.shift();
	}
	function C(e) {
		if (!p) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = $a([...p.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		p = null, Qa(J(o), n, J(s)) ? i ? b() : (f = !0, y.to(J(o), J(s), {
			velocity: n,
			response: .3
		})) : i ? R(o, 0) : (y.to(J(o), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), J(a) < r && v.to(J(a), r));
	}
	vi(() => {
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
	var w = no();
	dr("keydown", Gt, (e) => e.key === "Escape" && b());
	var T = B(w);
	let ee, te;
	var E = H(T, 2);
	let ne, re;
	var ie = z(E), ae = H(z(ie), 2), oe = z(ae), se = (e) => {
		var n = to();
		fr("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), X(e, n);
	};
	Q(oe, (e) => {
		t.onback && e(se);
	});
	var ce = H(oe, 2);
	di(ce, (e) => d = e, () => d), A(ae), A(ie);
	var le = H(ie, 2);
	Wr(z(le), () => t.children), A(le), A(E), di(E, (e) => u = e, () => u), U((e) => {
		ee = $r(T, 1, "scrim svelte-185xwm9", null, ee, { fade: i }), te = ti(T, "", te, { opacity: e }), ne = $r(E, 1, "sheet svelte-185xwm9", null, ne, { fade: i }), $(E, "aria-label", t.label), re = ti(E, "", re, {
			opacity: J(m),
			transform: `translate3d(0, ${J(o) ?? ""}px, 0) scale(${J(h) ?? ""})`,
			"transform-origin": J(l)
		});
	}, [() => J(m) * Math.min(1, Math.max(0, 1 - J(o) / J(s)))]), fr("click", T, b), fr("pointerdown", ie, x), fr("pointermove", ie, S), fr("pointerup", ie, C), dr("pointercancel", ie, C), fr("click", ce, b), li(E, "offsetHeight", (e) => R(s, e)), X(e, w), N();
}
pr([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var io = /* @__PURE__ */ Y("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), ao = /* @__PURE__ */ Y("<p class=\"caption stale svelte-9nj5u4\"> </p>"), oo = /* @__PURE__ */ Y("<!> <!>", 1);
function so(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => t.scoredAt ? Ei(t.scoredAt, t.now) : null);
	var r = oo(), i = B(r), a = (e) => {
		var n = io(), r = H(z(n));
		A(n), U(() => Z(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), X(e, n);
	};
	Q(i, (e) => {
		t.configError && e(a);
	});
	var o = H(i, 2), s = (e) => {
		var t = ao(), r = V(t, !0);
		U(() => Z(r, J(n))), X(e, t);
	};
	Q(o, (e) => {
		J(n) && e(s);
	}), X(e, r), N();
}
// node_modules/svelte/src/internal/flags/legacy.js
We();
// src/lib/ui/Toast.svelte
var co = /* @__PURE__ */ Y("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), lo = /* @__PURE__ */ Y("<span> </span> <!>", 1), uo = /* @__PURE__ */ Y("<div role=\"status\" aria-live=\"polite\"><!></div>");
function fo(e, t) {
	M(t, !1);
	function n() {
		let e = Vi.undo;
		Object.assign(Vi, {
			on: !1,
			undo: null
		}), e();
	}
	pi();
	var r = uo();
	let i;
	var a = z(r), o = (e) => {
		var t = lo(), r = B(t), i = V(r, !0), a = H(r, 2), o = (e) => {
			var t = co();
			fr("click", t, n), X(e, t);
		};
		Q(a, (e) => {
			Vi.undo && e(o);
		}), U(() => Z(i, Vi.text)), X(e, t);
	};
	Q(a, (e) => {
		Vi.on && e(o);
	}), A(r), U(() => i = $r(r, 1, "toast svelte-1fk2ial", null, i, { on: Vi.on })), X(e, r), N();
}
pr(["click"]);
// src/lib/ui/Together.svelte
var po = /* @__PURE__ */ Y("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), mo = /* @__PURE__ */ Y("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <dl class=\"svelte-1tya3no\"></dl></section>");
function ho(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => [
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
	var r = mo(), i = H(z(r), 2);
	Rr(i, 21, () => J(n), (e) => e.k, (e, t) => {
		var n = po(), r = z(n), i = V(r, !0), a = H(r), o = z(a, !0), s = V(H(o), !0);
		A(a), A(n), U(() => {
			Z(i, J(t).k), Z(o, J(t).v), Z(s, J(t).unit);
		}), X(e, n);
	}), A(i), A(r), X(e, r), N();
}
// src/App.svelte
var go = /* @__PURE__ */ Y("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), _o = /* @__PURE__ */ Y("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), vo = /* @__PURE__ */ Y("<div class=\"tiles compact svelte-1n46o8q\"></div>"), yo = /* @__PURE__ */ Y("<!> <!>", 1), bo = /* @__PURE__ */ Y("<div class=\"tiles svelte-1n46o8q\"></div>"), xo = /* @__PURE__ */ Y("<!> <!> <!> <!>", 1), So = /* @__PURE__ */ Y("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function Co(e, t) {
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
	}, !0);
	async function u() {
		let e = J(c)?.from;
		R(c, null), await $n(), e?.focus({ preventScroll: !0 });
	}
	let d = /* @__PURE__ */ L(null), f = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L(Wt(/* @__PURE__ */ new Date())), m;
	async function h() {
		if (clearTimeout(m), !document.hidden) {
			try {
				R(d, await r("scores"), !0), R(f, null), Ki(J(d).people), a && Object.hasOwn(J(d).people, a) && a !== Pi(J(d).viewer, J(d).people).self && R(c, {
					id: a,
					from: null
				}, !0), a = null;
			} catch (e) {
				R(f, e, !0);
			}
			R(p, /* @__PURE__ */ new Date(), !0), clearTimeout(m), m = setTimeout(h, J(d) ? 6e4 : 3e4);
		}
	}
	dn(() => {
		h();
		let e = () => document.hidden || h();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(m), document.removeEventListener("visibilitychange", e);
		};
	});
	let g = /* @__PURE__ */ F(() => J(d)?.people ?? {}), _ = /* @__PURE__ */ F(() => Object.keys(J(g))), v = /* @__PURE__ */ F(() => Pi(J(d)?.viewer ?? {}, J(g))), y = /* @__PURE__ */ F(() => J(g)[J(v).self ?? J(_)[0]]?.week), b = (e) => !!J(d)?.viewer?.can_edit?.includes(e), x = /* @__PURE__ */ F(() => !!J(c) && Object.hasOwn(J(g), J(c).id));
	var S = So(), C = B(S), w = z(C);
	{
		let e = /* @__PURE__ */ F(() => J(y) ? Ti(J(y)) : "");
		za(w, {
			title: "Training",
			get subtitle() {
				return J(e);
			},
			get onback() {
				return s;
			}
		});
	}
	var T = H(w, 2), ee = z(T), te = (e) => {
		var t = _o(), n = H(B(t), 2), r = (e) => {
			var t = go(), n = V(t, !0);
			U(() => Z(n, J(f).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), X(e, t);
		};
		Q(n, (e) => {
			J(f) && e(r);
		}), X(e, t);
	}, E = (e) => {
		var t = xo(), n = B(t);
		so(n, {
			get scoredAt() {
				return J(d).scored_at;
			},
			get configError() {
				return J(d).config_error;
			},
			get now() {
				return J(p);
			}
		});
		var r = H(n, 2), i = (e) => {
			var t = yo(), n = B(t), r = (e) => {
				var t = vo();
				Rr(t, 20, () => J(v).others, (e) => e, (e, t) => {
					{
						let n = /* @__PURE__ */ F(() => J(_).indexOf(t)), r = /* @__PURE__ */ F(() => l(t));
						Xa(e, {
							get person() {
								return J(g)[t];
							},
							get index() {
								return J(n);
							},
							compact: !0,
							get onopen() {
								return J(r);
							}
						});
					}
				}), A(t), X(e, t);
			};
			Q(n, (e) => {
				J(v).others.length && e(r);
			});
			var i = H(n, 2);
			{
				let e = /* @__PURE__ */ F(() => J(_).indexOf(J(v).self));
				Xa(i, {
					get person() {
						return J(g)[J(v).self];
					},
					get index() {
						return J(e);
					}
				});
			}
			X(e, t);
		}, a = (e) => {
			var t = bo();
			Rr(t, 20, () => J(v).others, (e) => e, (e, t) => {
				{
					let n = /* @__PURE__ */ F(() => J(_).indexOf(t)), r = /* @__PURE__ */ F(() => l(t));
					Xa(e, {
						get person() {
							return J(g)[t];
						},
						get index() {
							return J(n);
						},
						get onopen() {
							return J(r);
						}
					});
				}
			}), A(t), X(e, t);
		};
		Q(r, (e) => {
			J(v).self ? e(i) : e(a, -1);
		});
		var o = H(r, 2), s = (e) => {
			ho(e, { get group() {
				return J(d).group;
			} });
		};
		Q(o, (e) => {
			J(d).group && e(s);
		});
		var c = H(o, 2), u = (e) => {
			{
				let t = /* @__PURE__ */ F(() => b(J(v).self));
				Ia(e, {
					get id() {
						return J(v).self;
					},
					get person() {
						return J(g)[J(v).self];
					},
					get canEdit() {
						return J(t);
					}
				});
			}
		};
		Q(c, (e) => {
			J(v).self && e(u);
		}), X(e, t);
	};
	Q(ee, (e) => {
		J(d) ? e(E, -1) : e(te);
	}), A(T), A(C);
	var ne = H(C, 2), re = (e) => {
		ro(e, {
			get label() {
				return `${J(g)[J(c).id].name ?? ""}'s details`;
			},
			get from() {
				return J(c).from;
			},
			onclose: u,
			get onback() {
				return s;
			},
			children: (e, t) => {
				var n = yo(), r = B(n);
				{
					let e = /* @__PURE__ */ F(() => J(_).indexOf(J(c).id));
					Xa(r, {
						get person() {
							return J(g)[J(c).id];
						},
						get index() {
							return J(e);
						}
					});
				}
				var i = H(r, 2);
				{
					let e = /* @__PURE__ */ F(() => b(J(c).id));
					Ia(i, {
						get id() {
							return J(c).id;
						},
						get person() {
							return J(g)[J(c).id];
						},
						get canEdit() {
							return J(e);
						}
					});
				}
				X(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	Q(ne, (e) => {
		J(x) && e(re);
	}), fo(H(ne, 2), {}), U(() => C.inert = J(x)), X(e, S), N();
}
// src/main.js
var wo = (e) => kr(Co, { target: e }), To = () => new Promise((e) => {
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
		document.documentElement.dataset.theme = n ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", To().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", wo(e);
		}));
	}
});
