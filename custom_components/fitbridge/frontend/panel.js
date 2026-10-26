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
	return e();
}
function v(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function y() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function b(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var x = 1024, S = 2048, C = 4096, w = 8192, ee = 16384, te = 32768, ne = 1 << 25, T = 65536, re = 1 << 19, ie = 1 << 20, E = 1 << 25, ae = 1 << 21, oe = 1 << 22, se = 1 << 23, D = Symbol("$state"), ce = Symbol("component"), le = Symbol("legacy props"), ue = Symbol(""), de = Symbol("attributes"), fe = Symbol("class"), pe = Symbol("style"), me = Symbol("text"), he = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ge = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), _e = {}, O = Symbol("uninitialized"), ve = "http://www.w3.org/1999/xhtml";
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
var k = !1;
function Se(e) {
	k = e;
}
var A;
function Ce(e) {
	if (e === null) throw be(), _e;
	return A = e;
}
function we() {
	return Ce(/* @__PURE__ */ $t(A));
}
function j(e) {
	if (k) {
		if (/* @__PURE__ */ $t(A) !== null) throw be(), _e;
		A = e;
	}
}
function Te(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ $t(n);
		A = n;
	}
}
function Ee(e = !0) {
	for (var t = 0, n = A;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ $t(n);
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
var M = null;
function Ge(e) {
	M = e;
}
function N(e, t = !1, n) {
	M = {
		p: M,
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
function Ke(e) {
	var t = M, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) pn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, M = t.p, qe(e);
}
function qe(e = {}) {
	return l(e, ce, { value: !0 }), e;
}
function Je() {
	return !Ue || M !== null && M.l === null;
}
// node_modules/svelte/src/internal/client/dom/task.js
var Ye = [];
function Xe() {
	var e = Ye;
	Ye = [], v(e);
}
function Ze(e) {
	if (Ye.length === 0 && !bt) {
		var t = Ye;
		queueMicrotask(() => {
			t === Ye && Xe();
		});
	}
	Ye.push(e);
}
function Qe() {
	for (; Ye.length > 0;) Xe();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var $e = ~(S | C | x);
function P(e, t) {
	e.f = e.f & $e | t;
}
function et(e) {
	e.f & 512 || e.deps === null ? P(e, x) : P(e, C);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function tt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), P(e, x);
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function nt(e) {
	var t = G, n = K;
	Fn(null), In(null);
	try {
		return e();
	} finally {
		Fn(t), In(n);
	}
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function rt(e, t, n, r) {
	let i = Je() ? st : ut;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = K, c = it(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				on(e, s);
			}
			at();
		}
	}
	var d = ot();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ lt(e))).then(u).catch((e) => on(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), at());
	}) : f();
}
function it() {
	var e = K, t = G, n = M, r = I;
	return function(i = !0) {
		In(e), Fn(t), Ge(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function at(e = !0) {
	In(null), Fn(null), Ge(null), e && I?.deactivate();
}
function ot() {
	var e = K, t = e.b, n = I, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function st(e) {
	var t = 2 | S;
	return K !== null && (K.f |= re), {
		ctx: M,
		deps: null,
		effects: null,
		equals: Oe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: O,
		wv: 0,
		parent: K,
		ac: null
	};
}
var ct = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function lt(e, t, n) {
	let r = K;
	r === null && Me();
	var i = void 0, a = Lt(O), o = !G, s = /* @__PURE__ */ new Set();
	return _n(() => {
		var t = K, n = y();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== he && n.reject(e);
			}).finally(at);
		} catch (e) {
			n.reject(e), at();
		}
		var c = I;
		if (o) {
			if (t.f & 32768) var l = ot();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(ct);
			else for (let e of s.values()) e.reject(ct);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== ct && (c.activate(), t ? (a.f |= se, Vt(a, t)) : (a.f & 8388608 && (a.f ^= se), Vt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), dn(() => {
		for (let e of s) e.reject(ct);
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
	let t = /* @__PURE__ */ st(e);
	return Rn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function ut(e) {
	let t = /* @__PURE__ */ st(e);
	return t.equals = Ae, t;
}
function dt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) W(t[n]);
	}
}
function ft(e) {
	var t, n = K, r = e.parent;
	if (!Mn && r !== null && e.v !== O && r.f & 24576) return ye(), e.v;
	In(r);
	try {
		dt(e), t = Yn(e);
	} finally {
		In(n);
	}
	return t;
}
function pt(e) {
	var t = ft(e);
	!e.equals(t) && (e.wv = Kn(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), _t?.capture(e, t, !0)), e.deps === null)) ? P(e, x) : Mn || (vt === null ? et(e) : (un() || I?.is_fork) && vt.set(e, t));
}
function mt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && nt(() => {
		t.ac.abort(he), t.ac = null;
	}), t.fn !== null && (t.teardown = g), Qn(t, 0), Sn(t));
}
function ht(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && $n(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var gt = null, I = null, _t = null, vt = null, yt = null, bt = !1, xt = !1, St = null, Ct = null, wt = 0, Tt = 1, Et = class e {
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
		gt === null ? gt = this : (gt.#n = this, this.#t = gt), gt = this;
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
			for (var r of n.d) P(r, S), t(r);
			for (r of n.m) P(r, C), t(r);
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
					t.f ^= x;
				}
			}
			n || e.push(t);
		}
		return this.#c = [], e;
	}
	#_() {
		this.#e = !0;
		for (let e of this.#u) this.#d.delete(e), P(e, S), this.schedule(e);
		for (let e of this.#d) P(e, C), this.schedule(e);
		this.apply();
		for (var t = St = [], n = [], r = Ct = []; this.#c.length > 0;) {
			wt++ > 1e3 && (this.#S(), Ot());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Nt(e), this.#h() || this.discard(), t;
			}
		}
		if (I = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (St = null, Ct = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Mt(e, t);
			r.length > 0 && I.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), _t = this, At(n), At(t), _t = null, this.#s?.resolve();
			var o = I;
			if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
				if (o !== null) {
					for (let e of this.#c) o.#c.push(e);
					this.#c = [];
				} else o = this;
			}
			o !== null && (Ft.clear(), o.#_());
		}
	}
	#v(e, t, n) {
		e.f ^= x;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= x : i & 4 ? t.push(r) : qn(r) && (i & 16 && this.#d.add(r), $n(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), P(i, S), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), I = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) tt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== O && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), vt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, vt = null;
	}
	flush() {
		try {
			xt = !0, I = this, this.#_();
		} finally {
			wt = 0, yt = null, St = null, Ct = null, xt = !1, I = null, vt = null, Ft.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(ct);
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
		this.#m || (this.#m = !0, Ze(() => {
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
		return (this.#s ??= y()).promise;
	}
	static ensure() {
		if (I === null) {
			let t = I = new e();
			!xt && !bt && Ze(() => {
				t.#e || t.flush();
			});
		}
		return I;
	}
	apply() {
		vt = null;
	}
	schedule(e) {
		yt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? gt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Dt(e) {
	var t = bt, n = _t;
	_t = null, bt = !0;
	try {
		var r;
		for (e && (Dt(), r = e());;) {
			if (Qe(), I === null) return r;
			I.flush();
		}
	} finally {
		bt = t, _t = n;
	}
}
function Ot() {
	try {
		Le();
	} catch (e) {
		on(e, yt);
	}
}
var kt = null;
function At(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && qn(r) && (kt = /* @__PURE__ */ new Set(), $n(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Tn(r), kt?.size > 0)) {
				Ft.clear();
				for (let e of kt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) kt.has(n) && (kt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || $n(n);
					}
				}
				kt.clear();
			}
		}
		kt = null;
	}
}
function jt(e) {
	I.schedule(e);
}
function Mt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), P(e, x);
		for (var n = e.first; n !== null;) Mt(n, t), n = n.next;
	}
}
function Nt(e) {
	P(e, x);
	for (var t = e.first; t !== null;) Nt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Pt = /* @__PURE__ */ new Set(), Ft = /* @__PURE__ */ new Map(), It = !1;
function Lt(e, t) {
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
	let n = Lt(e, t);
	return Rn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Rt(e, t = !1, n = !0) {
	let r = Lt(e);
	return t || (r.equals = Ae), Ue && n && M !== null && M.l !== null && (M.l.s ??= []).push(r), r;
}
function R(e, t, n = !1) {
	return G !== null && (!Pn || G.f & 131072) && Je() && G.f & 4325394 && (Ln === null || !Ln.has(e)) && Ve(), Vt(e, n ? Gt(t) : t, Ct);
}
var zt = null, Bt = 0;
function Vt(e, t, n = null) {
	if (!e.equals(t)) {
		Mn ? Ft.set(e, t) : Ft.has(e) || Ft.set(e, e.v);
		var r = Et.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && ft(t), vt === null && et(t);
		}
		e.wv = Kn(), zt = null, Bt = 0, Wt(e, S, n), zt = null, Je() && K !== null && K.f & 1024 && !(K.f & 96) && (Bn === null ? Vn([e]) : Bn.push(e)), !r.is_fork && Pt.size > 0 && !It && Ht();
	}
	return t;
}
function Ht() {
	It = !1;
	for (let e of Pt) {
		e.f & 1024 && P(e, C);
		let t;
		try {
			t = qn(e);
		} catch {
			t = !0;
		}
		t && $n(e);
	}
	Pt.clear();
}
function Ut(e) {
	R(e, e.v + 1);
}
function Wt(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = Je(), a = r.length;
		if (Bt += a, Bt > 1e5 && zt === null && (zt = /* @__PURE__ */ new Set()), zt !== null) {
			if (zt.has(e)) return;
			zt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== K) {
				var l = (c & S) === 0;
				if (l && P(s, t), c & 131072) Pt.add(s);
				else if (c & 2) {
					var u = s;
					vt?.delete(u), Wt(u, C, n);
				} else if (l) {
					var d = s;
					c & 16 && kt !== null && kt.add(d), n === null ? jt(d) : n.push(d);
				}
			}
		}
	}
}
function Gt(e) {
	if (typeof e != "object" || !e || D in e || ce in e) return e;
	let t = m(e);
	if (t !== f && t !== p) return e;
	var n = /* @__PURE__ */ new Map(), r = a(e), i = /* @__PURE__ */ L(0), o = null, s = Wn, c = (e) => {
		if (Wn === s) return e();
		var t = G, n = Wn;
		Fn(null), Gn(s);
		var r = e();
		return Fn(t), Gn(n), r;
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
					let e = c(() => /* @__PURE__ */ L(O, o));
					n.set(t, e), Ut(i);
				}
			} else R(r, O), Ut(i);
			return !0;
		},
		get(t, r, i) {
			if (r === D) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || u(t, r)?.writable) && (a = c(() => /* @__PURE__ */ L(Gt(s ? t[r] : O), o)), n.set(r, a)), a !== void 0) {
				var l = J(a);
				return l === O ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = J(i);
				if (a === O) return;
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
			if (t === D) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== O || Reflect.has(e, t);
			return (r !== void 0 || K !== null && (!i || u(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ L(i ? Gt(e[t]) : O, o)), n.set(t, r)), J(r) === O) ? !1 : i;
		},
		set(e, t, a, s) {
			var l = n.get(t), d = t in e;
			if (r && t === "length") for (var f = a; f < l.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ L(O, o)), n.set(f + "", p)) : R(p, O);
			}
			if (l === void 0) (!d || u(e, t)?.writable) && (l = c(() => /* @__PURE__ */ L(void 0, o)), R(l, Gt(a)), n.set(t, l));
			else {
				d = l.v !== O;
				var m = c(() => Gt(a));
				R(l, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, a), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				Ut(i);
			}
			return !0;
		},
		ownKeys(e) {
			J(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== O;
			});
			for (var [r, a] of n) a.v !== O && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Be();
		}
	});
}
var Kt, qt, Jt, Yt;
function Xt() {
	if (Kt === void 0) {
		Kt = window, qt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Jt = u(t, "firstChild").get, Yt = u(t, "nextSibling").get, h(e) && (e[fe] = void 0, e[de] = null, e[pe] = void 0, e.__e = void 0), h(n) && (n[me] = void 0);
	}
}
function Zt(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Qt(e) {
	return Jt.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function $t(e) {
	return Yt.call(e);
}
function z(e, t) {
	if (!k) return /* @__PURE__ */ Qt(e);
	var n = /* @__PURE__ */ Qt(A);
	if (n === null) n = A.appendChild(Zt());
	else if (t && n.nodeType !== 3) {
		var r = Zt();
		return n?.before(r), Ce(r), r;
	}
	return t && rn(n), Ce(n), n;
}
function B(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ Qt(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ $t(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = Zt();
			return A?.before(r), Ce(r), r;
		}
		rn(A);
	}
	return A;
}
function V(e, t = !1) {
	if (!k) return /* @__PURE__ */ Qt(e);
	var n = z(e, t);
	return j(e), n;
}
function H(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ $t(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = Zt();
			return r === null ? i?.after(a) : r.before(a), Ce(a), a;
		}
		rn(r);
	}
	return Ce(r), r;
}
function en(e) {
	e.textContent = "";
}
function tn() {
	return !1;
}
function nn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function rn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function an(e) {
	var t = K;
	if (t === null) return G.f |= se, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	on(e, t);
}
function on(e, t) {
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
function sn(e) {
	K === null && (G === null && Ie(e), Fe()), Mn && Pe(e);
}
function cn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function ln(e, t) {
	var n = K;
	n !== null && n.f & 8192 && (e |= w);
	var r = {
		ctx: M,
		deps: null,
		nodes: null,
		f: e | S | 512,
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
	if (e & 4) St === null ? Et.ensure().schedule(r) : St.push(r);
	else if (t !== null) {
		try {
			$n(r);
		} catch (e) {
			throw W(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= T));
	}
	if (i !== null && (i.parent = n, n !== null && cn(i, n), G !== null && G.f & 2 && !(e & 64))) {
		var a = G;
		(a.effects ??= []).push(i);
	}
	return r;
}
function un() {
	return G !== null && !Pn;
}
function dn(e) {
	let t = ln(8, null);
	return P(t, x), t.teardown = e, t;
}
function fn(e) {
	sn("$effect");
	var t = K.f;
	if (!G && t & 32 && M !== null && !M.i) {
		var n = M;
		(n.e ??= []).push(e);
	} else return pn(e);
}
function pn(e) {
	return ln(4 | ie, e);
}
function mn(e) {
	return sn("$effect.pre"), ln(8 | ie, e);
}
function hn(e) {
	Et.ensure();
	let t = ln(64 | re, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? En(t, () => {
			W(t), n(void 0);
		}) : (W(t), n(void 0));
	});
}
function gn(e) {
	return ln(4, e);
}
function _n(e) {
	return ln(oe | re, e);
}
function vn(e, t = 0) {
	return ln(8 | t, e);
}
function U(e, t = [], n = [], r = []) {
	rt(r, t, n, (t) => {
		ln(8, () => {
			e(...t.map(J));
		});
	});
}
function yn(e, t = 0) {
	return ln(16 | t, e);
}
function bn(e) {
	return ln(32 | re, e);
}
function xn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Mn, r = G;
		Nn(!0), Fn(null);
		try {
			t.call(null);
		} catch (t) {
			on(t, e.parent);
		} finally {
			Nn(n), Fn(r);
		}
	}
}
function Sn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && nt(() => {
			e.abort(he);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : W(n, t), n = r;
	}
}
function Cn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || W(t), t = n;
	}
}
function W(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (wn(e.nodes.start, e.nodes.end), n = !0), e.f |= ne, Sn(e, t && !n), Qn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	xn(e), e.f ^= ne, e.f |= ee;
	var i = e.parent;
	i !== null && i.first !== null && Tn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function wn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ $t(e);
		e.remove(), e = n;
	}
}
function Tn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function En(e, t, n = !0) {
	var r = [];
	e.f |= 256, Dn(e, r, !0);
	var i = () => {
		n && W(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Dn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= w;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Dn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function On(e) {
	e.f &= -257, kn(e, !0);
}
function kn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= w, e.f & 1024 || (P(e, S), Et.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			kn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function An(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ $t(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var jn = null, Mn = !1;
function Nn(e) {
	Mn = e;
}
var G = null, Pn = !1;
function Fn(e) {
	G = e;
}
var K = null;
function In(e) {
	K = e;
}
var Ln = null;
function Rn(e) {
	G !== null && (G.f & 2097152 || G.f & 2) && (Ln ??= /* @__PURE__ */ new Set()).add(e);
}
var q = null, zn = 0, Bn = null;
function Vn(e) {
	Bn = e;
}
var Hn = 1, Un = 0, Wn = Un;
function Gn(e) {
	Wn = e;
}
function Kn() {
	return ++Hn;
}
function qn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (qn(a) && pt(a), a.wv > e.wv) return !0;
		}
		t & 512 && vt === null && P(e, x);
	}
	return !1;
}
function Jn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Ln !== null && Ln.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Jn(a, t, !1) : t === a && (n ? P(a, S) : a.f & 1024 && P(a, C), jt(a));
	}
}
function Yn(e) {
	var t = q, n = zn, r = Bn, i = G, a = Ln, o = M, s = Pn, c = Wn, l = e.f;
	q = null, zn = 0, Bn = null, G = l & 96 ? null : e, Ln = null, Ge(e.ctx), Pn = !1, Wn = ++Un, e.ac !== null && (nt(() => {
		e.ac.abort(he);
	}), e.ac = null);
	try {
		e.f |= ae;
		var u = e.fn, d = u();
		e.f |= te;
		var f = Xn(e);
		if (Je() && Bn !== null && !Pn && f !== null && !(e.f & 6146)) for (var p = 0; p < Bn.length; p++) Jn(Bn[p], e);
		if (i !== null && i !== e) {
			if (Un++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Un;
			if (t !== null) for (let e of t) e.rv = Un;
			Bn !== null && (r === null ? r = Bn : r.push(...Bn));
		}
		return e.f & 8388608 && (e.f ^= se), d;
	} catch (t) {
		return Xn(e), an(t);
	} finally {
		e.f ^= ae, q = t, zn = n, Bn = r, G = i, Ln = a, Ge(o), Pn = s, Wn = c;
	}
}
function Xn(e) {
	var t = e.deps, n = I?.is_fork;
	if (q !== null) {
		var r;
		if (n || Qn(e, zn), t !== null && zn > 0) for (t.length = zn + q.length, r = 0; r < q.length; r++) t[zn + r] = q[r];
		else e.deps = t = q;
		if (un() && e.f & 512) for (r = zn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && zn < t.length && (Qn(e, zn), t.length = zn);
	return t;
}
function Zn(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = o.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (q === null || !s.call(q, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512), a.v !== O && et(a), a.ac !== null && nt(() => {
			a.ac.abort(he), a.ac = null, P(a, S);
		}), mt(a), Qn(a, 0);
	}
}
function Qn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Zn(e, n[r]);
}
function $n(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, x);
		var n = K;
		K = e;
		try {
			t & 16777232 ? Cn(e) : Sn(e), xn(e);
			var r = Yn(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = Hn;
		} finally {
			K = n;
		}
	}
}
async function er() {
	await Promise.resolve(), Dt();
}
function J(e) {
	var t = !!(e.f & 2);
	if (jn?.add(e), G !== null && !Pn && !(K !== null && K.f & 16384) && (Ln === null || !Ln.has(e))) {
		var n = G.deps;
		if (G.f & 2097152) e.rv < Un && (e.rv = Un, q === null && n !== null && n[zn] === e ? zn++ : q === null ? q = [e] : q.push(e));
		else {
			G.deps ??= [], s.call(G.deps, e) || G.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [G] : s.call(r, G) || r.push(G);
		}
	}
	if (Mn && Ft.has(e)) return Ft.get(e);
	if (t) {
		var i = e;
		if (Mn) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || nr(i)) && (a = ft(i)), Ft.set(i, a), a;
		}
		var o = !(i.f & 512) && !Pn && G !== null && !!(G.f & 512), c = (i.f & te) === 0;
		qn(i) && (o && (i.f |= 512), pt(i)), o && !c && (ht(i), tr(i));
	}
	if (vt?.has(e)) return vt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function tr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : s.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (ht(n), tr(n));
	}
}
function nr(e) {
	if (e.v === O) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Ft.has(t) || t.f & 2 && nr(t)) return !0;
	return !1;
}
function rr(e) {
	var t = Pn;
	try {
		return Pn = !0, e();
	} finally {
		Pn = t;
	}
}
function ir(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (D in e) ar(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && D in n && ar(n);
		}
	}
}
function ar(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			ar(e[n], t);
		} catch {}
		let n = m(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = d(n);
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
var or = ["touchstart", "touchmove"];
function sr(e) {
	return or.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var cr = Symbol("events"), lr = /* @__PURE__ */ new Set(), ur = /* @__PURE__ */ new Set();
function dr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || _r.call(t, e), !e.cancelBubble) return nt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, Ze(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function fr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = dr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && dn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function pr(e, t, n) {
	(t[cr] ??= {})[e] = n;
}
function mr(e) {
	for (var t = 0; t < e.length; t++) lr.add(e[t]);
	for (var n of ur) n(e);
}
var hr = null, gr = !1;
function _r(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	hr = e, gr || (gr = !0, setTimeout(() => {
		gr = !1, hr = null;
	}));
	var o = 0, s = hr === e && e[cr];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[cr] = t;
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
		var d = G, f = K;
		Fn(null), In(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[cr]?.[r];
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
			e[cr] = t, delete e.currentTarget, Fn(d), In(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var vr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function yr(e) {
	return vr?.createHTML(e) ?? e;
}
function br(e) {
	var t = nn("template");
	return t.innerHTML = yr(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function xr(e, t) {
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
		if (k) return xr(A, null), A;
		i === void 0 && (i = br(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Qt(i)));
		var t = r || qt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Qt(t), s = t.lastChild;
			xr(o, s);
		} else xr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Sr(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (k) return xr(A, null), A;
		if (!o) {
			var e = /* @__PURE__ */ Qt(br(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ Qt(e);) o.appendChild(/* @__PURE__ */ Qt(e));
			else o = /* @__PURE__ */ Qt(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ Qt(t), r = t.lastChild;
			xr(n, r);
		} else xr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Cr(e, t) {
	return /* @__PURE__ */ Sr(e, t, "svg");
}
function wr() {
	if (k) return xr(A, null), A;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = Zt();
	return e.append(t, n), xr(t, n), e;
}
function X(e, t) {
	if (k) {
		var n = K;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = A), we();
	} else e !== null && e.before(t);
}
function Tr() {
	if (k && A && A.nodeType === 8 && A.textContent?.startsWith("$")) {
		let e = A.textContent.substring(1);
		return we(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Er(e) {
	let t = 0, n = Lt(0), r;
	return () => {
		un() && (J(n), vn(() => (t === 0 && (r = rr(() => e(() => Ut(n)))), t += 1, () => {
			Ze(() => {
				--t, t === 0 && (r?.(), r = void 0, Ut(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Dr = T | re;
function Or(e, t, n, r) {
	new kr(e, t, n, r);
}
var kr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = k ? A : null;
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
	#h = Er(() => (this.#m = Lt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = K;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = K.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = yn(() => {
			if (k) {
				let e = De(this.#t);
				we();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Dr), k && (this.#e = A);
	}
	#g() {
		try {
			this.#a = bn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Ze(r), t && (this.#s = bn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? xe() : (t = !0, n && He(), this.#s !== null && En(this.#s, () => {
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
					on(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (ee | ne)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = bn(() => e(this.#e)), Ze(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = Zt(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return bn(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							on(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(I)) : this.#u === 0 && (this.#e.before(e), this.#c = null, En(this.#o, () => {
					this.#o = null;
				}), this.#S(I));
			}
		}));
	}
	#x() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = bn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				An(this.#a, e);
				let t = this.#n.pending;
				this.#o = bn(() => t(this.#e));
			} else this.#S(I);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		tt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = K, n = G, r = M;
		In(this.#i), Fn(this.#i), Ge(this.#i.ctx);
		try {
			return Et.ensure(), e();
		} finally {
			In(t), Fn(n), Ge(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && En(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ze(() => {
			this.#d = !1, this.#m && Vt(this.#m, this.#l);
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
		this.#a &&= (W(this.#a), null), this.#o &&= (W(this.#o), null), this.#s &&= (W(this.#s), null), k && (Ce(this.#t), Te(), Ce(Ee()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return bn(() => {
						var r = K;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return on(e, this.#i.parent), null;
				}
			}));
		};
		Ze(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					on(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => on(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function Z(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[me] ??= e.nodeValue) && (e[me] = n, e.nodeValue = `${n}`);
}
function Ar(e, t) {
	return Mr(e, t);
}
var jr = /* @__PURE__ */ new Map();
function Mr(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	Xt();
	var l = void 0, u = hn(() => {
		var o = n ?? t.appendChild(Zt());
		Or(o, { pending: () => {} }, (t) => {
			N({});
			var n = M;
			if (a && (n.c = a), i && (r.$$events = i), k && xr(t, null), l = e(t, r) || qe(), k && (K.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw be(), _e;
			Ke();
		}, s);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = sr(r);
					for (let e of [t, document]) {
						var a = jr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), jr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, _r, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(c(lr)), ur.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = jr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, _r), r.delete(e), r.size === 0 && jr.delete(n)) : r.set(e, i);
			}
			ur.delete(d), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Nr.set(l, u), l;
}
var Nr = /* @__PURE__ */ new WeakMap(), Pr = class {
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
			if (n) On(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (On(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
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
						An(r, t), t.append(Zt()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else W(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), En(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (W(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = tn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = Zt();
				i.append(a), this.#n.set(e, {
					effect: bn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, bn(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else k && (this.anchor = A), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Q(e, t, n = !1) {
	var r;
	k && (r = A, we());
	var i = new Pr(e), a = n ? T : 0;
	function o(e, t) {
		if (k) {
			var n = De(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ee();
				Ce(a), i.anchor = a, Se(!1), i.ensure(e, t), Se(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	yn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Fr(e, t) {
	return t;
}
function Ir(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		En(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Lr(e, c(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			en(d), d.append(u), e.items.clear();
		}
		Lr(e, t, !l);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Lr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= E, An(a, document.createDocumentFragment())) : W(t[i], n);
	}
}
var Rr;
function zr(e, t, n, r, i, o = null) {
	var s = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		s = k ? Ce(/* @__PURE__ */ Qt(u)) : u.appendChild(Zt());
	}
	k && we();
	var d = null, f = /* @__PURE__ */ ut(() => {
		var e = n();
		return a(e) ? e : e == null ? [] : c(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = J(f);
			_.fallback = d, Vr(_, n, s, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= E, Ur(d, null, s)) : On(d) : En(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: yn(() => {
			var e = J(f), a = e.length;
			let c = !1;
			k && De(s) === "[!" != (a === 0) && (s = Ee(), Ce(s), Se(!1), c = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = I, v = tn(), y = 0; y < a; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (s = A, c = !0, Se(!1));
				var b = e[y], x = r(b, y), S = m ? null : l.get(x);
				S ? (S.v && Vt(S.v, b), S.i && Vt(S.i, y), v && _.unskip_effect(S.e)) : (S = Hr(l, m ? s : Rr ??= Zt(), b, x, y, i, t, n), m || (S.e.f |= E), l.set(x, S)), u.add(x);
			}
			if (a === 0 && o && !d && (m ? d = bn(() => o(s)) : (d = bn(() => o(Rr ??= Zt())), d.f |= E)), a > u.size && Ne("", "", ""), k && a > 0 && Ce(Ee()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			c && Se(!0), J(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, k && (s = A);
}
function Br(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Vr(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, l = Br(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (a) for (v = 0; v < o; v += 1) h = t[v], g = i(h, v), _ = s.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (h = t[v], g = i(h, v), _ = s.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (On(_), a && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= E, _ === l) Ur(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Wr(e, d, _), Wr(e, _, y), Ur(_, y, n), d = _, p = [], m = [], l = Br(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Ur(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Wr(e, S.prev, C.next), Wr(e, d, S), Wr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Ur(_, l, n), Wr(e, _.prev, _.next), Wr(e, _, d === null ? e.effect.first : d.next), Wr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Br(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Br(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Lr(e, c(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Br(l.next);
		var ee = w.length;
		if (ee > 0) {
			var te = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.fix();
			}
			Ir(e, w, te);
		}
	}
	a && Ze(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Hr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Lt(n) : /* @__PURE__ */ Rt(n, !1, !1) : null, l = o & 2 ? Lt(i) : null;
	return {
		v: c,
		i: l,
		e: bn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ur(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ $t(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Wr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function Gr(e, t, ...n) {
	var r = new Pr(e);
	yn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, T);
}
// node_modules/svelte/src/internal/shared/attributes.js
var Kr = [..." 	\n\r\f\xA0\v﻿"];
function qr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Kr.includes(r[o - 1])) && (s === r.length || Kr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Jr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Yr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Xr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Yr)), i && c.push(...Object.keys(i).map(Yr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Yr(e.substring(l, u).trim());
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
		return r && (n += Jr(r)), i && (n += Jr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function Zr(e, t, n, r, i, a) {
	var o = e[fe];
	if (k || o !== n || o === void 0) {
		var s = qr(n, r, a);
		k && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[fe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function Qr(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function $r(e, t, n, r) {
	var i = e[pe];
	if (k || i !== t) {
		var a = Xr(t, r);
		k && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[pe] = t;
	} else r && (Array.isArray(r) ? (Qr(e, n?.[0], r[0]), Qr(e, n?.[1], r[1], "important")) : Qr(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ei = Symbol("is custom element"), ti = Symbol("is html"), ni = ge ? "link" : "LINK";
function $(e, t, n, r) {
	var i = ri(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ni) || i[t] !== (i[t] = n) && (t === "loading" && (e[ue] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ai(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function ri(e) {
	return e[de] ??= {
		[ei]: e.nodeName.includes("-"),
		[ti]: e.namespaceURI === ve
	};
}
var ii = /* @__PURE__ */ new Map();
function ai(e) {
	var t = e.getAttribute("is") || e.nodeName, n = ii.get(t);
	if (n) return n;
	ii.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = d(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = m(i);
	}
	return n;
}
var oi = /* @__PURE__ */ new class e {
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
function si(e, t, n) {
	var r = oi.observe(e, () => n(e[t]));
	gn(() => (rr(() => n(e[t])), r));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ci(e, t) {
	return e === t || e?.[D] === t;
}
function li(e = qe(), t, n, r) {
	var i = M.r, a = K;
	return gn(() => {
		var o, s;
		return vn(() => {
			o = s, s = r?.() || [], rr(() => {
				ci(n(...s), e) || (t(e, ...s), o && ci(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ci(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
function ui(e, t, n = t) {
	var r = e === "x", i = () => nt(() => {
		a = !0, clearTimeout(o), o = setTimeout(s, 100), n(window[r ? "scrollX" : "scrollY"]);
	});
	addEventListener("scroll", i, { passive: !0 });
	var a = !1, o, s = () => {
		a = !1;
	}, c = !0;
	vn(() => {
		var e = t();
		c ? c = !1 : !a && e != null && (a = !0, clearTimeout(o), r ? scrollTo(e, window.scrollY) : scrollTo(window.scrollX, e), o = setTimeout(s, 100));
	}), gn(i), dn(() => {
		removeEventListener("scroll", i);
	});
}
// node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function di(e = !1) {
	let t = M, n = t.l.u;
	if (!n) return;
	let r = () => ir(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ st(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => J(i);
	}
	n.b.length && mn(() => {
		fi(t, r), v(n.b);
	}), fn(() => {
		let e = rr(() => n.m.map(_));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && fn(() => {
		fi(t, r), v(n.a);
	});
}
function fi(e, t) {
	if (e.l.s) for (let t of e.l.s) J(t);
	t();
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var pi = !1;
function mi(e) {
	var t = pi;
	try {
		return pi = !1, [e(), pi];
	} finally {
		pi = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function hi(e, t, n, r) {
	var i = !Ue || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, d = () => o && i ? (l ??= /* @__PURE__ */ st(r), J(l)) : (c && (c = !1, s = o ? rr(r) : r), s);
	let f;
	if (a) {
		var p = D in e || le in e;
		f = u(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = mi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Re(t), f(m)));
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
	var v = !1, y = (n & 1 ? st : ut)(() => (v = !1, g()));
	a && J(y);
	var b = K;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? J(y) : i && a ? Gt(e) : e;
			return R(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return Mn && v || b.f & 16384 ? y.v : J(y);
	});
}
function gi(e) {
	M === null && je("onMount"), Ue && M.l !== null ? _i(M).m.push(e) : fn(() => {
		let t = rr(e);
		if (typeof t == "function") return t;
	});
}
function _i(e) {
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
var vi = (e) => Math.min(1, Math.max(0, e)), yi = (e) => String(e).padStart(2, "0"), bi = (e, t) => t > 0 ? vi(e / t) : 1, xi = (e) => [
	bi(e.runs, e.goal.runs),
	bi(e.gym, e.goal.gym),
	vi(e.bonus)
];
function Si(e) {
	let t = e.xp - e.level_floor, n = e.next_level_xp - e.level_floor;
	return {
		level: e.level,
		into: t,
		span: n,
		frac: n > 0 ? vi(t / n) : 1
	};
}
var Ci = (e) => `Week ${Number(e.week.split("-W")[1])} · ${e.days_left} ${e.days_left === 1 ? "day" : "days"} left`;
function wi(e, t, n = 15) {
	let r = new Date(e);
	return t - r > n * 6e4 ? `Updated ${yi(r.getHours())}:${yi(r.getMinutes())}` : null;
}
var Ti = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], Ei = [
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
function Di(e) {
	let t = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(e);
	if (!t) return "";
	let [, n, r, i, a] = t;
	return `${Ti[new Date(Date.UTC(n, r - 1, i)).getUTCDay()]} ${Number(i)} ${Ei[r - 1]}, ${a}`;
}
var Oi = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${yi(e % 60)} min` : `${e / 60} h`;
function ki(e) {
	if (e.kind !== "run" && e.kind !== "walk" || !(e.km > 0)) return null;
	let t = Math.round(e.minutes * 60 / e.km);
	return `${Math.floor(t / 60)}:${yi(t % 60)} /km`;
}
var Ai = (e) => ({
	title: e.name,
	when: Di(e.start),
	duration: Oi(e.minutes),
	xp: e.xp ? `+${e.xp}` : "",
	detail: {
		km: e.km == null ? null : `${e.km.toFixed(1)} km`,
		pace: ki(e),
		hr: e.avg_hr == null ? null : `${e.avg_hr} bpm`,
		plan: e.plan ?? null,
		url: e.url ?? null
	},
	removable: e.excluded ? "restore" : e.key.startsWith("manual:") ? "delete" : "remove"
});
function ji(e) {
	let t = [["walk", e.warmup_s ?? 0], ...e.intervals].filter(([, e]) => e > 0), n = t.reduce((e, [, t]) => e + t, 0);
	return t.map(([e, t]) => ({
		kind: e,
		frac: t / n
	}));
}
function Mi(e, t) {
	let n = Object.hasOwn(t, e.person) ? e.person : null;
	return {
		self: n,
		others: Object.keys(t).filter((e) => e !== n)
	};
}
var Ni = (e) => `${Number(e.slice(8, 10))} ${Ei[Number(e.slice(5, 7)) - 1]}`;
function Pi(e, t, n) {
	let r = t.find((t) => t.key === e.key);
	return n - e.at > 36e4 || !r || e.want !== null && r.excluded === e.want;
}
// src/lib/actions.svelte.js
var Fi = 5e3, Ii = Gt({}), Li = Gt({
	on: !1,
	text: "",
	undo: null
}), Ri, zi = 0;
function Bi(e, t = null) {
	clearTimeout(Ri), Object.assign(Li, {
		on: !0,
		text: e,
		undo: t
	}), Ri = setTimeout(() => Li.on = !1, Fi);
}
function Vi(e, t = Date.now()) {
	for (let [n, r] of Object.entries(Ii)) Pi(r, e[r.person]?.feed ?? [], t) && delete Ii[n];
}
async function Hi(e, t, n) {
	let i = `${e}/${t}`, a = Ii[i], o = ++zi, s = t.startsWith("manual:");
	Ii[i] = {
		person: e,
		key: t,
		want: s && n === "remove" ? null : n === "remove",
		at: Date.now(),
		n: o
	}, n === "remove" && !s && Bi("Removed", () => Hi(e, t, "restore"));
	try {
		await r("POST", "workouts", {
			person: e,
			key: t,
			action: n
		});
	} catch (e) {
		Ii[i]?.n === o && (a ? Ii[i] = a : delete Ii[i]), Bi(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
// src/lib/ui/Badges.svelte
var Ui = /* @__PURE__ */ Y("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), Wi = /* @__PURE__ */ Y("<ul class=\"svelte-m8wnum\"></ul>"), Gi = /* @__PURE__ */ Y("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), Ki = /* @__PURE__ */ Y("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), qi = /* @__PURE__ */ Y("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function Ji(e, t) {
	N(t, !0);
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
	var a = qi(), o = z(a), s = (e) => {
		var n = Wi();
		zr(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = Ui(), i = z(n), a = V(i, !0), o = H(i, 2), s = V(o, !0), c = V(H(o, 2), !0);
			j(n), U((e, n) => {
				Z(a, e), Z(s, J(t).title), Z(c, n);
			}, [() => r(J(t)), () => Ni(J(t).unlocked_at)]), X(e, n);
		}), j(n), X(e, n);
	};
	Q(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = H(o, 2), l = (e) => {
		var n = Wi();
		zr(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = Gi(), a = z(n), o = V(a, !0), s = H(a, 2), c = V(s, !0), l = H(s, 2), u = V(l), d = H(l, 2), f = z(d);
			let p;
			j(d), j(n), U((e, n, r, i) => {
				Z(o, e), Z(c, J(t).title), Z(u, `${n ?? ""} of ${r ?? ""}`), p = $r(f, "", p, { width: i });
			}, [
				() => r(J(t)),
				() => i(J(t).current),
				() => i(J(t).target),
				() => `${Math.min(1, J(t).current / J(t).target) * 100}%`
			]), X(e, n);
		}), j(n), X(e, n);
	};
	Q(c, (e) => {
		t.badges.next.length && e(l);
	});
	var u = H(c, 2), d = (e) => {
		X(e, Ki());
	};
	Q(u, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(d);
	}), j(a), X(e, a), Ke();
}
// src/lib/media.svelte.js
var Yi = Gt({
	wide: !1,
	split: !1,
	reducedMotion: !1
}), Xi = matchMedia("(min-width: 768px)"), Zi = matchMedia("(min-width: 1080px)"), Qi = matchMedia("(prefers-reduced-motion: reduce)"), $i = () => {
	Yi.wide = Xi.matches, Yi.split = Zi.matches, Yi.reducedMotion = Qi.matches;
};
Xi.addEventListener("change", $i), Zi.addEventListener("change", $i), Qi.addEventListener("change", $i), $i();
// src/lib/motion.js
function ea(e, { onFrame: t, onSettle: n, snap: r = {
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
var ta = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), na = (e) => ta(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function ra({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var ia = /* @__PURE__ */ Y("<span class=\"mini svelte-69s4be\"> </span>"), aa = /* @__PURE__ */ Y("<span class=\"mini svelte-69s4be\">Together</span>"), oa = /* @__PURE__ */ Y("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), sa = /* @__PURE__ */ Y("<div><dt class=\"svelte-69s4be\"> </dt><dd class=\"svelte-69s4be\"> </dd></div>"), ca = /* @__PURE__ */ Y("<dl class=\"svelte-69s4be\"></dl>"), la = /* @__PURE__ */ Y("<a class=\"btn link svelte-69s4be\" target=\"_blank\" rel=\"noopener noreferrer\">Open in Endurain</a>"), ua = /* @__PURE__ */ Y("<span class=\"ask svelte-69s4be\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-69s4be\">Delete</button>", 1), da = /* @__PURE__ */ Y("<button type=\"button\"> </button>"), fa = /* @__PURE__ */ Y("<li><button type=\"button\" class=\"head svelte-69s4be\"><span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span></button> <div><div class=\"inner svelte-69s4be\"><!> <div class=\"acts svelte-69s4be\"><!> <!></div></div></div></li>");
function pa(e, t) {
	let n = Tr();
	N(t, !0);
	let r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️"
	}, i = /* @__PURE__ */ F(() => Ii[`${t.person}/${t.item.key}`]), a = /* @__PURE__ */ F(() => Ai(J(i) && J(i).want !== null ? {
		...t.item,
		excluded: J(i).want
	} : t.item)), o = /* @__PURE__ */ F(() => [
		["Distance", J(a).detail.km],
		["Pace", J(a).detail.pace],
		["Avg heart rate", J(a).detail.hr],
		["Plan session", J(a).detail.plan]
	].filter(([, e]) => e)), s = /* @__PURE__ */ F(() => J(i)?.want === null), c = /* @__PURE__ */ L(!1), l = /* @__PURE__ */ L(!1), u, d, f = ra({
		response: .35,
		damping: 1
	}), p = ea(f, {
		onFrame: (e) => u.style.height = `${e}px`,
		onSettle: () => J(c) && (u.style.height = "auto")
	});
	fn(() => p.stop);
	function m() {
		R(c, !J(c)), R(l, !1), Yi.reducedMotion ? u.style.height = J(c) ? "auto" : "0px" : (p.running || (f.value = u.offsetHeight), p.to(J(c) ? d.offsetHeight : 0));
	}
	let h = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function g() {
		J(a).removable === "delete" ? R(l, !0) : Hi(t.person, t.item.key, J(a).removable);
	}
	var _ = fa();
	let v;
	var y = z(_), x = z(y), S = V(x, !0), C = H(x, 2), w = z(C), ee = z(w), te = H(ee), ne = (e) => {
		var n = ia(), r = V(n, !0);
		U(() => Z(r, t.item.plan)), X(e, n);
	};
	Q(te, (e) => {
		t.item.plan && e(ne);
	});
	var T = H(te, 2), re = (e) => {
		X(e, aa());
	};
	Q(T, (e) => {
		t.item.joint && e(re);
	}), j(w);
	var ie = V(H(w, 2));
	j(C);
	var E = H(C, 2), ae = z(E), oe = (e) => {
		X(e, oa());
	};
	Q(ae, (e) => {
		J(i) && e(oe);
	});
	var se = H(ae);
	j(E), j(y);
	var D = H(y, 2);
	let ce;
	var le = z(D), ue = z(le), de = (e) => {
		var t = ca();
		zr(t, 21, () => J(o), ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ F(() => b(J(t), 2));
			let r = () => J(n)[0], i = () => J(n)[1];
			var a = sa(), o = z(a), s = V(o, !0), c = V(H(o), !0);
			j(a), U(() => {
				Z(s, r()), Z(c, i());
			}), X(e, a);
		}), j(t), X(e, t);
	};
	Q(ue, (e) => {
		J(o).length && e(de);
	});
	var fe = H(ue, 2), pe = z(fe), me = (e) => {
		var t = la();
		U(() => $(t, "href", J(a).detail.url)), X(e, t);
	};
	Q(pe, (e) => {
		J(a).detail.url && e(me);
	});
	var he = H(pe, 2), ge = (e) => {
		var n = wr(), r = B(n), i = (e) => {
			var n = ua(), r = H(B(n), 2), i = H(r, 2);
			pr("click", r, () => R(l, !1)), pr("click", i, () => (m(), Hi(t.person, t.item.key, "remove"))), X(e, n);
		}, o = (e) => {
			var t = da();
			let n;
			var r = V(t, !0);
			U(() => {
				n = Zr(t, 1, "btn svelte-69s4be", null, n, { danger: J(a).removable !== "restore" }), Z(r, h[J(a).removable]);
			}), pr("click", t, g), X(e, t);
		};
		Q(r, (e) => {
			J(l) ? e(i) : e(o, -1);
		}), X(e, n);
	};
	Q(he, (e) => {
		t.canEdit && !J(s) && e(ge);
	}), j(fe), j(le), li(le, (e) => d = e, () => d), j(D), li(D, (e) => u = e, () => u), j(_), U(() => {
		v = Zr(_, 1, "svelte-69s4be", null, v, { dim: J(a).removable === "restore" || J(s) }), $(y, "aria-expanded", J(c)), $(y, "aria-controls", `${n}-more`), Zr(x, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), Z(S, r[t.item.kind] ?? "💪"), Z(ee, `${J(a).title ?? ""} `), Z(ie, `${J(a).when ?? ""} · ${J(a).duration ?? ""}`), Z(se, ` ${(J(a).removable === "restore" ? "Removed" : J(a).xp && `${J(a).xp} XP`) ?? ""}`), ce = Zr(D, 1, "more svelte-69s4be", null, ce, { open: J(c) }), $(D, "id", `${n}-more`), D.inert = !J(c);
	}), pr("click", y, m), X(e, _), Ke();
}
mr(["click"]);
// src/lib/ui/Feed.svelte
var ma = /* @__PURE__ */ Y("<ul class=\"card svelte-n1344i\"></ul>"), ha = /* @__PURE__ */ Y("<p class=\"caption empty svelte-n1344i\">No workouts in the last 30 days.</p>");
function ga(e, t) {
	N(t, !0);
	var n = wr(), r = B(n), i = (e) => {
		var n = ma();
		zr(n, 21, () => t.items, (e) => e.key, (e, n) => {
			pa(e, {
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
		}), j(n), X(e, n);
	}, a = (e) => {
		X(e, ha());
	};
	Q(r, (e) => {
		t.items.length ? e(i) : e(a, -1);
	}), X(e, n), Ke();
}
// src/lib/ui/PlanBar.svelte
var _a = /* @__PURE__ */ Y("<span> </span>"), va = /* @__PURE__ */ Y("<i class=\"svelte-1y5m0aq\"></i>"), ya = /* @__PURE__ */ Y("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), ba = /* @__PURE__ */ Y("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!></div>");
function xa(e, t) {
	N(t, !0);
	let n = /* @__PURE__ */ F(() => ji(t.plan)), r = /* @__PURE__ */ F(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0)) / 60));
	var i = ba(), a = z(i), o = z(a), s = V(o, !0), c = H(o, 2), l = (e) => {
		var n = _a();
		let r;
		var i = V(n, !0);
		U(() => {
			r = Zr(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), Z(i, t.plan.due_today ? "Due today" : "Rest day");
		}), X(e, n);
	};
	Q(c, (e) => {
		J(n).length && e(l);
	}), j(a);
	var u = H(a, 2), d = (e) => {
		var t = ya(), i = B(t);
		zr(i, 21, () => J(n), Fr, (e, t) => {
			var n = va();
			let r;
			U(() => r = $r(n, "", r, {
				"flex-grow": J(t).frac,
				background: `var(--${J(t).kind === "run" ? "run" : "fill"})`
			})), X(e, n);
		}), j(i);
		var a = H(i, 2), o = z(a), s = z(o);
		$r(s, "", {}, { background: "var(--run)" }), $r(H(s, 2), "", {}, { background: "var(--fill)" }), Te(), j(o);
		var c = V(H(o, 2));
		j(a), U(() => {
			$(i, "aria-label", `Run and walk intervals, ${J(r) ?? ""} minutes in total`), Z(c, `${J(r) ?? ""} min`);
		}), X(e, t);
	};
	Q(u, (e) => {
		J(n).length && e(d);
	}), j(i), U(() => Z(s, t.plan.state)), X(e, i), Ke();
}
// src/lib/ui/Records.svelte
var Sa = /* @__PURE__ */ Y("<div class=\"svelte-70kwy0\"><dt class=\"svelte-70kwy0\"> </dt><dd class=\"svelte-70kwy0\"> </dd></div>"), Ca = /* @__PURE__ */ Y("<dl class=\"card svelte-70kwy0\"></dl>");
function wa(e, t) {
	N(t, !0);
	let n = /* @__PURE__ */ F(() => [
		["Longest session", `${t.pbs.longest_session_km.toFixed(1)} km`],
		["Gym PRs", t.pbs.prs.toLocaleString()],
		["Total lifted", `${t.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 })} t`]
	]);
	var r = Ca();
	zr(r, 21, () => J(n), ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ F(() => b(J(t), 2));
		let r = () => J(n)[0], i = () => J(n)[1];
		var a = Sa(), o = z(a), s = V(o, !0), c = V(H(o), !0);
		j(a), U(() => {
			Z(s, r()), Z(c, i());
		}), X(e, a);
	}), j(r), X(e, r), Ke();
}
// src/lib/ui/Details.svelte
var Ta = /* @__PURE__ */ Y("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), Ea = /* @__PURE__ */ Y("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Records</h2> <!></section>", 1);
function Da(e, t) {
	let n = Tr();
	N(t, !0);
	var r = Ea(), i = B(r), a = (e) => {
		var r = Ta(), i = z(r);
		xa(H(i, 2), { get plan() {
			return t.person.plan;
		} }), j(r), U(() => {
			$(r, "aria-labelledby", `${n}-plan`), $(i, "id", `${n}-plan`);
		}), X(e, r);
	};
	Q(i, (e) => {
		t.person.plan && e(a);
	});
	var o = H(i, 2), s = z(o);
	ga(H(s, 2), {
		get person() {
			return t.id;
		},
		get items() {
			return t.person.feed;
		},
		get canEdit() {
			return t.canEdit;
		}
	}), j(o);
	var c = H(o, 2), l = z(c), u = V(H(z(l)));
	j(l), Ji(H(l, 2), { get badges() {
		return t.person.badges;
	} }), j(c);
	var d = H(c, 2), f = z(d);
	wa(H(f, 2), { get pbs() {
		return t.person.pbs;
	} }), j(d), U(() => {
		$(o, "aria-labelledby", `${n}-feed`), $(s, "id", `${n}-feed`), $(c, "aria-labelledby", `${n}-badges`), $(l, "id", `${n}-badges`), Z(u, `${t.person.badges.count ?? ""} unlocked`), $(d, "aria-labelledby", `${n}-pbs`), $(f, "id", `${n}-pbs`);
	}), X(e, r), Ke();
}
// src/lib/ui/Header.svelte
var Oa = /* @__PURE__ */ Y("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), ka = /* @__PURE__ */ Y("<header><div class=\"in svelte-16l0jix\"><!> <h1 class=\"svelte-16l0jix\"> </h1> <p class=\"svelte-16l0jix\"> </p></div></header>");
function Aa(e, t) {
	let n = hi(t, "subtitle", 3, ""), r = /* @__PURE__ */ L(0);
	var i = ka();
	let a;
	var o = z(i), s = z(o), c = (e) => {
		var n = Oa();
		pr("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), X(e, n);
	};
	Q(s, (e) => {
		t.onback && e(c);
	});
	var l = H(s, 2), u = V(l, !0), d = V(H(l, 2), !0);
	j(o), j(i), U(() => {
		a = Zr(i, 1, "svelte-16l0jix", null, a, { scrolled: J(r) > 0 }), Z(u, t.title), Z(d, n() || "\xA0");
	}), ui("y", () => J(r), (e) => R(r, e, !0)), X(e, i);
}
mr(["click"]);
// src/lib/ui/Rings.svelte
var ja = /* @__PURE__ */ Cr("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Ma = /* @__PURE__ */ Cr("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function Na(e, t) {
	N(t, !0);
	let n = hi(t, "size", 3, 88), r = hi(t, "animate", 3, !0), i = [
		"run",
		"gym",
		"bonus"
	], a = 1e3, o = /* @__PURE__ */ L(Gt(r() && !Yi.reducedMotion ? 0 : a)), s = /* @__PURE__ */ F(() => n() * .11), c = /* @__PURE__ */ F(() => t.fractions.map((e, t) => {
		let r = n() / 2 - J(s) / 2 - t * J(s) * 1.3, c = 2 * Math.PI * r;
		return {
			kind: i[t],
			r,
			c,
			len: c * e * J(o) / a
		};
	}));
	gi(() => {
		if (J(o) === a) return;
		let e = ea(ra({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => R(o, e, !0) });
		return e.to(a), e.stop;
	});
	var l = Ma();
	let u;
	zr(l, 21, () => J(c), (e) => e.kind, (e, t) => {
		var r = ja(), i = B(r);
		let a;
		var o = H(i);
		let c;
		U(() => {
			$(i, "cx", n() / 2), $(i, "cy", n() / 2), $(i, "r", J(t).r), $(i, "stroke-width", J(s)), a = $r(i, "", a, { stroke: `var(--${J(t).kind ?? ""})` }), $(o, "cx", n() / 2), $(o, "cy", n() / 2), $(o, "r", J(t).r), $(o, "stroke-width", J(s)), $(o, "stroke-dasharray", `${J(t).len ?? ""} ${J(t).c ?? ""}`), $(o, "opacity", +(J(t).len > .01)), $(o, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = $r(o, "", c, { stroke: `var(--${J(t).kind ?? ""})` });
		}), X(e, r);
	}), j(l), U(() => {
		$(l, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), u = $r(l, "", u, { width: `${n() / 16}rem` });
	}), X(e, l), Ke();
}
// src/lib/ui/PersonTile.svelte
var Pa = /* @__PURE__ */ Y("<!> <span class=\"sr\"> </span>", 1), Fa = /* @__PURE__ */ Y("<span class=\"streak svelte-1handop\"> </span>"), Ia = /* @__PURE__ */ Y("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), La = /* @__PURE__ */ Y("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), Ra = /* @__PURE__ */ Y("<span class=\"body svelte-1handop\"><!> <span class=\"stats svelte-1handop\"></span></span> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), za = /* @__PURE__ */ Y("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), Ba = /* @__PURE__ */ Y("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function Va(e, t) {
	N(t, !0);
	let n = hi(t, "index", 3, 0), r = hi(t, "compact", 3, !1), i = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], a = /* @__PURE__ */ F(() => i[n() % i.length]), o = /* @__PURE__ */ F(() => b(J(a), 2)), s = /* @__PURE__ */ F(() => J(o)[0]), c = /* @__PURE__ */ F(() => J(o)[1]), l = /* @__PURE__ */ F(() => Si(t.person)), u = /* @__PURE__ */ F(() => t.person.week), d = /* @__PURE__ */ F(() => [
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
	var m = Ba();
	let h;
	var g = z(m), _ = z(g), v = z(_);
	let y;
	var x = V(v, !0), S = H(v, 2), C = z(S), w = V(C, !0), ee = V(H(C, 2), !0);
	j(S);
	var te = H(S, 2), ne = (e) => {
		var t = Pa(), n = B(t);
		{
			let e = /* @__PURE__ */ F(() => xi(J(u)));
			Na(n, {
				get fractions() {
					return J(e);
				},
				size: 44
			});
		}
		var r = V(H(n, 2), !0);
		U(() => Z(r, J(p))), X(e, t);
	}, T = (e) => {
		var n = Fa(), r = V(n);
		U(() => Z(r, `🔥 ${t.person.streak ?? ""} wk`)), X(e, n);
	};
	Q(te, (e) => {
		r() ? e(ne) : e(T, -1);
	});
	var re = H(te, 2), ie = (e) => {
		X(e, Ia());
	};
	Q(re, (e) => {
		t.onopen && e(ie);
	}), j(_);
	var E = H(_, 2), ae = (e) => {
		var t = Ra(), n = B(t), r = z(n);
		{
			let e = /* @__PURE__ */ F(() => xi(J(u))), t = /* @__PURE__ */ F(() => Yi.wide ? 112 : 88);
			Na(r, {
				get fractions() {
					return J(e);
				},
				get size() {
					return J(t);
				}
			});
		}
		var i = H(r, 2);
		zr(i, 21, () => J(d), (e) => e.kind, (e, t) => {
			var n = La(), r = z(n), i = z(r);
			let a;
			var o = H(i, 1, !0);
			j(r);
			var s = H(r, 2), c = z(s, !0), l = V(H(c));
			j(s), j(n), U(() => {
				a = $r(i, "", a, { background: `var(--${J(t).kind ?? ""})` }), Z(o, J(t).label), Z(c, J(t).n), Z(l, `/${J(t).of ?? ""}`);
			}), X(e, n);
		}), j(i), j(n);
		var a = H(n, 2), o = z(a), s = z(o);
		let c;
		j(o);
		var f = V(H(o, 2));
		j(a), U((e, t) => {
			c = $r(s, "", c, { width: `${J(l).frac * 100}%` }), Z(f, `${e ?? ""} of ${t ?? ""} XP to level ${J(l).level + 1}`);
		}, [() => J(l).into.toLocaleString(), () => J(l).span.toLocaleString()]), X(e, t);
	};
	Q(E, (e) => {
		r() || e(ae);
	}), j(g);
	var oe = H(g, 2), se = (e) => {
		var n = za();
		U(() => $(n, "aria-label", J(p))), pr("click", n, function(...e) {
			t.onopen?.apply(this, e);
		}), X(e, n);
	};
	Q(oe, (e) => {
		t.onopen && e(se);
	}), j(m), U((e) => {
		h = Zr(m, 1, "tile glass svelte-1handop", null, h, {
			compact: r(),
			opens: t.onopen
		}), $(g, "aria-hidden", t.onopen ? "true" : void 0), y = $r(v, "", y, {
			"--a1": J(s),
			"--a2": J(c)
		}), Z(x, e), Z(w, t.person.name), Z(ee, J(f));
	}, [() => t.person.name.slice(0, 1)]), X(e, m), Ke();
}
mr(["click"]);
// src/lib/gesture.js
var Ha = (e, t = .998) => e / 1e3 * t / (1 - t), Ua = (e, t, n) => e + Ha(t) > n / 2;
function Wa(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var Ga = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), Ka = /* @__PURE__ */ Y("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), qa = /* @__PURE__ */ Y("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function Ja(e, t) {
	N(t, !0);
	let n = hi(t, "from", 3, null), r = 1e3, i = Yi.reducedMotion, a = /* @__PURE__ */ L(Gt(i ? r : 0)), o = /* @__PURE__ */ L(0), s = /* @__PURE__ */ L(1), c = /* @__PURE__ */ L(!1), l = /* @__PURE__ */ L("50% 100%"), u, d, f = !1, p = null, m = /* @__PURE__ */ F(() => i ? +J(c) : Math.min(1, J(a) / 500)), h = /* @__PURE__ */ F(() => i ? 1 : .5 + .5 * J(a) / r), g = () => {
		f && (J(a) === 0 || J(o) >= J(s)) && (f = !1, t.onclose());
	};
	function _(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = ra({
					value: r,
					damping: o,
					response: s
				}), n = ea(t, {
					onFrame: e,
					onSettle: g
				}), n.to(i, a);
			}
		};
	}
	let v = _((e) => R(a, e, !0)), y = _((e) => R(o, e, !0));
	function b() {
		f || (f = !0, i ? (R(c, !1), setTimeout(t.onclose, na("--fade"))) : v.to(J(a), 0, { response: .3 }));
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
		R(o, t < 0 ? -Ga(-t, J(s)) : t, !0), p.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), p.samples.length > 8 && p.samples.shift();
	}
	function C(e) {
		if (!p) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = Wa([...p.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		p = null, Ua(J(o), n, J(s)) ? i ? b() : (f = !0, y.to(J(o), J(s), {
			velocity: n,
			response: .3
		})) : i ? R(o, 0) : (y.to(J(o), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), J(a) < r && v.to(J(a), r));
	}
	gi(() => {
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
	var w = qa();
	fr("keydown", Kt, (e) => e.key === "Escape" && b());
	var ee = B(w);
	let te, ne;
	var T = H(ee, 2);
	let re, ie;
	var E = z(T), ae = H(z(E), 2), oe = z(ae), se = (e) => {
		var n = Ka();
		pr("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), X(e, n);
	};
	Q(oe, (e) => {
		t.onback && e(se);
	});
	var D = H(oe, 2);
	li(D, (e) => d = e, () => d), j(ae), j(E);
	var ce = H(E, 2);
	Gr(z(ce), () => t.children), j(ce), j(T), li(T, (e) => u = e, () => u), U((e) => {
		te = Zr(ee, 1, "scrim svelte-185xwm9", null, te, { fade: i }), ne = $r(ee, "", ne, { opacity: e }), re = Zr(T, 1, "sheet svelte-185xwm9", null, re, { fade: i }), $(T, "aria-label", t.label), ie = $r(T, "", ie, {
			opacity: J(m),
			transform: `translate3d(0, ${J(o) ?? ""}px, 0) scale(${J(h) ?? ""})`,
			"transform-origin": J(l)
		});
	}, [() => J(m) * Math.min(1, Math.max(0, 1 - J(o) / J(s)))]), pr("click", ee, b), pr("pointerdown", E, x), pr("pointermove", E, S), pr("pointerup", E, C), fr("pointercancel", E, C), pr("click", D, b), si(T, "offsetHeight", (e) => R(s, e)), X(e, w), Ke();
}
mr([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var Ya = /* @__PURE__ */ Y("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), Xa = /* @__PURE__ */ Y("<p class=\"caption stale svelte-9nj5u4\"> </p>"), Za = /* @__PURE__ */ Y("<!> <!>", 1);
function Qa(e, t) {
	N(t, !0);
	let n = /* @__PURE__ */ F(() => t.scoredAt ? wi(t.scoredAt, t.now) : null);
	var r = Za(), i = B(r), a = (e) => {
		var n = Ya(), r = H(z(n));
		j(n), U(() => Z(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), X(e, n);
	};
	Q(i, (e) => {
		t.configError && e(a);
	});
	var o = H(i, 2), s = (e) => {
		var t = Xa(), r = V(t, !0);
		U(() => Z(r, J(n))), X(e, t);
	};
	Q(o, (e) => {
		J(n) && e(s);
	}), X(e, r), Ke();
}
// node_modules/svelte/src/internal/flags/legacy.js
We();
// src/lib/ui/Toast.svelte
var $a = /* @__PURE__ */ Y("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), eo = /* @__PURE__ */ Y("<span> </span> <!>", 1), to = /* @__PURE__ */ Y("<div role=\"status\" aria-live=\"polite\"><!></div>");
function no(e, t) {
	N(t, !1);
	function n() {
		let e = Li.undo;
		Object.assign(Li, {
			on: !1,
			undo: null
		}), e();
	}
	di();
	var r = to();
	let i;
	var a = z(r), o = (e) => {
		var t = eo(), r = B(t), i = V(r, !0), a = H(r, 2), o = (e) => {
			var t = $a();
			pr("click", t, n), X(e, t);
		};
		Q(a, (e) => {
			Li.undo && e(o);
		}), U(() => Z(i, Li.text)), X(e, t);
	};
	Q(a, (e) => {
		Li.on && e(o);
	}), j(r), U(() => i = Zr(r, 1, "toast svelte-1fk2ial", null, i, { on: Li.on })), X(e, r), Ke();
}
mr(["click"]);
// src/lib/ui/Together.svelte
var ro = /* @__PURE__ */ Y("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), io = /* @__PURE__ */ Y("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <dl class=\"svelte-1tya3no\"></dl></section>");
function ao(e, t) {
	N(t, !0);
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
	var r = io(), i = H(z(r), 2);
	zr(i, 21, () => J(n), (e) => e.k, (e, t) => {
		var n = ro(), r = z(n), i = V(r, !0), a = H(r), o = z(a, !0), s = V(H(o), !0);
		j(a), j(n), U(() => {
			Z(i, J(t).k), Z(o, J(t).v), Z(s, J(t).unit);
		}), X(e, n);
	}), j(i), j(r), X(e, r), Ke();
}
// src/App.svelte
var oo = /* @__PURE__ */ Y("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), so = /* @__PURE__ */ Y("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), co = /* @__PURE__ */ Y("<div class=\"tiles compact svelte-1n46o8q\"></div>"), lo = /* @__PURE__ */ Y("<!> <!>", 1), uo = /* @__PURE__ */ Y("<div class=\"tiles svelte-1n46o8q\"></div>"), fo = /* @__PURE__ */ Y("<!> <!> <!> <!>", 1), po = /* @__PURE__ */ Y("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function mo(e, t) {
	N(t, !0);
	let n = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), r = new URLSearchParams(n.location.search), a = r.get("person"), o = /^\/(?!\/)/.test(r.get("back") ?? "") ? r.get("back") : null, s = o && (() => {
		n.history.pushState(null, "", o), n.dispatchEvent(new Event("location-changed"));
	}), c = /* @__PURE__ */ L(null), l = (e) => (t) => R(c, {
		id: e,
		from: t.currentTarget
	}, !0);
	async function u() {
		let e = J(c)?.from;
		R(c, null), await er(), e?.focus({ preventScroll: !0 });
	}
	let d = /* @__PURE__ */ L(null), f = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L(Gt(/* @__PURE__ */ new Date())), m;
	async function h() {
		if (clearTimeout(m), !document.hidden) {
			try {
				R(d, await i("scores"), !0), R(f, null), Vi(J(d).people), a && Object.hasOwn(J(d).people, a) && a !== Mi(J(d).viewer, J(d).people).self && R(c, {
					id: a,
					from: null
				}, !0), a = null;
			} catch (e) {
				R(f, e, !0);
			}
			R(p, /* @__PURE__ */ new Date(), !0), clearTimeout(m), m = setTimeout(h, J(d) ? 6e4 : 3e4);
		}
	}
	fn(() => {
		h();
		let e = () => document.hidden || h();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(m), document.removeEventListener("visibilitychange", e);
		};
	});
	let g = /* @__PURE__ */ F(() => J(d)?.people ?? {}), _ = /* @__PURE__ */ F(() => Object.keys(J(g))), v = /* @__PURE__ */ F(() => Mi(J(d)?.viewer ?? {}, J(g))), y = /* @__PURE__ */ F(() => J(g)[J(v).self ?? J(_)[0]]?.week), b = (e) => !!J(d)?.viewer?.can_edit?.includes(e);
	var x = po(), S = B(x), C = z(S);
	{
		let e = /* @__PURE__ */ F(() => J(y) ? Ci(J(y)) : "");
		Aa(C, {
			title: "Training",
			get subtitle() {
				return J(e);
			},
			get onback() {
				return s;
			}
		});
	}
	var w = H(C, 2), ee = z(w), te = (e) => {
		var t = so(), n = H(B(t), 2), r = (e) => {
			var t = oo(), n = V(t, !0);
			U(() => Z(n, J(f).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), X(e, t);
		};
		Q(n, (e) => {
			J(f) && e(r);
		}), X(e, t);
	}, ne = (e) => {
		var t = fo(), n = B(t);
		Qa(n, {
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
			var t = lo(), n = B(t), r = (e) => {
				var t = co();
				zr(t, 20, () => J(v).others, (e) => e, (e, t) => {
					{
						let n = /* @__PURE__ */ F(() => J(_).indexOf(t)), r = /* @__PURE__ */ F(() => l(t));
						Va(e, {
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
				}), j(t), X(e, t);
			};
			Q(n, (e) => {
				J(v).others.length && e(r);
			});
			var i = H(n, 2);
			{
				let e = /* @__PURE__ */ F(() => J(_).indexOf(J(v).self));
				Va(i, {
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
			var t = uo();
			zr(t, 20, () => J(v).others, (e) => e, (e, t) => {
				{
					let n = /* @__PURE__ */ F(() => J(_).indexOf(t)), r = /* @__PURE__ */ F(() => l(t));
					Va(e, {
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
			}), j(t), X(e, t);
		};
		Q(r, (e) => {
			J(v).self ? e(i) : e(a, -1);
		});
		var o = H(r, 2), s = (e) => {
			ao(e, { get group() {
				return J(d).group;
			} });
		};
		Q(o, (e) => {
			J(d).group && e(s);
		});
		var c = H(o, 2), u = (e) => {
			{
				let t = /* @__PURE__ */ F(() => b(J(v).self));
				Da(e, {
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
		J(d) ? e(ne, -1) : e(te);
	}), j(w), j(S);
	var T = H(S, 2), re = (e) => {
		Ja(e, {
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
				var n = lo(), r = B(n);
				{
					let e = /* @__PURE__ */ F(() => J(_).indexOf(J(c).id));
					Va(r, {
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
					Da(i, {
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
	Q(T, (e) => {
		J(c) && J(g)[J(c).id] && e(re);
	}), no(H(T, 2), {}), U(() => S.inert = !!J(c)), X(e, x), Ke();
}
// src/main.js
var ho = (e) => Ar(mo, { target: e }), go = () => new Promise((e) => {
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
		document.documentElement.dataset.theme = n ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", go().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", ho(e);
		}));
	}
});
