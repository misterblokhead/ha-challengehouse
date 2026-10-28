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
var b = 1024, x = 2048, S = 4096, C = 8192, w = 16384, T = 32768, ee = 1 << 25, te = 65536, E = 1 << 19, ne = 1 << 20, re = 1 << 25, ie = 1 << 21, ae = 1 << 22, oe = 1 << 23, se = Symbol("$state"), ce = Symbol("component"), le = Symbol("legacy props"), ue = Symbol(""), de = Symbol("attributes"), fe = Symbol("class"), pe = Symbol("style"), me = Symbol("text"), he = Symbol("form reset"), ge = new class extends Error {
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
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ce() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var O = !1;
function we(e) {
	O = e;
}
var k;
function Te(e) {
	if (e === null) throw xe(), ve;
	return k = e;
}
function Ee() {
	return Te(/* @__PURE__ */ ln(k));
}
function A(e) {
	if (O) {
		if (/* @__PURE__ */ ln(k) !== null) throw xe(), ve;
		k = e;
	}
}
function De(e = 1) {
	if (O) {
		for (var t = e, n = k; t--;) n = /* @__PURE__ */ ln(n);
		k = n;
	}
}
function Oe(e = !0) {
	for (var t = 0, n = k;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ ln(n);
		e && n.remove(), n = i;
	}
}
function ke(e) {
	if (!e || e.nodeType !== 8) throw xe(), ve;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Ae(e) {
	return e === this.v;
}
function je(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Me(e) {
	return !je(e, this.v);
}
function Ne(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// node_modules/svelte/src/internal/client/errors.js
function Pe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Fe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Ie(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Le() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Re(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function ze() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Be(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Ve() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function He() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ue() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function We() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/flags/index.js
var Ge = !1;
function Ke() {
	Ge = !0;
}
// node_modules/svelte/src/internal/shared/clone.js
var qe = [];
function Je(e, t = !1, n = !1) {
	return Ye(e, /* @__PURE__ */ new Map(), "", qe, null, n);
}
function Ye(e, t, n, r, a = null, o = !1) {
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
				l in e && (c[l] = Ye(u, t, n, r, null, o));
			}
			return c;
		}
		if (p(e) === d) {
			c = {}, t.set(e, c), a !== null && t.set(a, c);
			for (var f of Object.keys(e)) c[f] = Ye(e[f], t, n, r, null, o);
			return c;
		}
		if (e instanceof Date) return e.getTime(), structuredClone(e);
		if (typeof e.toJSON == "function" && !o) return Ye(e.toJSON(), t, n, r, e);
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
function Xe(e) {
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
		l: Ge && !t ? {
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
		for (var r of n) Sn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, j = t.p, Ze(e);
}
function Ze(e = {}) {
	return c(e, ce, { value: !0 }), e;
}
function Qe() {
	return !Ge || j !== null && j.l === null;
}
// node_modules/svelte/src/internal/client/dom/task.js
var $e = [];
function et() {
	var e = $e;
	$e = [], _(e);
}
function tt(e) {
	if ($e.length === 0 && !Dt) {
		var t = $e;
		queueMicrotask(() => {
			t === $e && et();
		});
	}
	$e.push(e);
}
function nt() {
	for (; $e.length > 0;) et();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var rt = ~(x | S | b);
function P(e, t) {
	e.f = e.f & rt | t;
}
function it(e) {
	e.f & 512 || e.deps === null ? P(e, b) : P(e, S);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function at(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), P(e, b);
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
var ot = !1;
function st() {
	ot || (ot = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[he]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ct(e) {
	var t = W, n = G;
	Gn(null), Kn(null);
	try {
		return e();
	} finally {
		Gn(t), Kn(n);
	}
}
function lt(e, t, n, r = n) {
	e.addEventListener(t, () => ct(n));
	let i = e[he];
	e[he] = i ? () => {
		i(), r(!0);
	} : () => r(!0), st();
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function ut(e, t, n, r) {
	let i = Qe() ? mt : _t;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = G, c = dt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				hn(e, s);
			}
			ft();
		}
	}
	var d = pt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ gt(e))).then(u).catch((e) => hn(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), ft());
	}) : f();
}
function dt() {
	var e = G, t = W, n = j, r = I;
	return function(i = !0) {
		Kn(e), Gn(t), Xe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ft(e = !0) {
	Kn(null), Gn(null), Xe(null), e && I?.deactivate();
}
function pt() {
	var e = G, t = e.b, n = I, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function mt(e) {
	var t = 2 | x;
	return G !== null && (G.f |= E), {
		ctx: j,
		deps: null,
		effects: null,
		equals: Ae,
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
var ht = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function gt(e, t, n) {
	let r = G;
	r === null && Pe();
	var i = void 0, a = Wt(D), o = !W, s = /* @__PURE__ */ new Set();
	return En(() => {
		var t = G, n = v();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ge && n.reject(e);
			}).finally(ft);
		} catch (e) {
			n.reject(e), ft();
		}
		var c = I;
		if (o) {
			if (t.f & 32768) var l = pt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(ht);
			else for (let e of s.values()) e.reject(ht);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== ht && (c.activate(), t ? (a.f |= oe, Jt(a, t)) : (a.f & 8388608 && (a.f ^= oe), Jt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), bn(() => {
		for (let e of s) e.reject(ht);
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
	let t = /* @__PURE__ */ mt(e);
	return Jn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	let t = /* @__PURE__ */ mt(e);
	return t.equals = Me, t;
}
function vt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Nn(t[n]);
	}
}
function yt(e) {
	var t, n = G, r = e.parent;
	if (!Hn && r !== null && e.v !== D && r.f & 24576) return be(), e.v;
	Kn(r);
	try {
		vt(e), t = or(e);
	} finally {
		Kn(n);
	}
	return t;
}
function bt(e) {
	var t = yt(e);
	!e.equals(t) && (e.wv = rr(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), wt?.capture(e, t, !0)), e.deps === null)) ? P(e, b) : Hn || (Tt === null ? it(e) : (yn() || I?.is_fork) && Tt.set(e, t));
}
function xt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ct(() => {
		t.ac.abort(ge), t.ac = null;
	}), t.fn !== null && (t.teardown = h), lr(t, 0), jn(t));
}
function St(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var Ct = null, I = null, wt = null, Tt = null, Et = null, Dt = !1, Ot = !1, kt = null, At = null, jt = 0, Mt = 1, Nt = class e {
	id = Mt++;
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
		Ct === null ? Ct = this : (Ct.#n = this, this.#t = Ct), Ct = this;
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
		for (var t = kt = [], n = [], r = At = []; this.#c.length > 0;) {
			jt++ > 1e3 && (this.#S(), Ft());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Bt(e), this.#h() || this.discard(), t;
			}
		}
		if (I = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (kt = null, At = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) zt(e, t);
			r.length > 0 && I.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), wt = this, Lt(n), Lt(t), wt = null, this.#s?.resolve();
			var o = I;
			if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
				if (o !== null) {
					for (let e of this.#c) o.#c.push(e);
					this.#c = [];
				} else o = this;
			}
			o !== null && (Ht.clear(), o.#_());
		}
	}
	#v(e, t, n) {
		e.f ^= b;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= b : i & 4 ? t.push(r) : ir(r) && (i & 16 && this.#d.add(r), ur(r));
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
		for (var t = 0; t < e.length; t += 1) at(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== D && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Tt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, Tt = null;
	}
	flush() {
		try {
			Ot = !0, I = this, this.#_();
		} finally {
			jt = 0, Et = null, kt = null, At = null, Ot = !1, I = null, Tt = null, Ht.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(ht);
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
		this.#m || (this.#m = !0, tt(() => {
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
			!Ot && !Dt && tt(() => {
				t.#e || t.flush();
			});
		}
		return I;
	}
	apply() {
		Tt = null;
	}
	schedule(e) {
		Et = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Ct = e : t.#t = e, this.linked = !1;
		}
	}
};
function Pt(e) {
	var t = Dt, n = wt;
	wt = null, Dt = !0;
	try {
		var r;
		for (e && (Pt(), r = e());;) {
			if (nt(), I === null) return r;
			I.flush();
		}
	} finally {
		Dt = t, wt = n;
	}
}
function Ft() {
	try {
		ze();
	} catch (e) {
		hn(e, Et);
	}
}
var It = null;
function Lt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ir(r) && (It = /* @__PURE__ */ new Set(), ur(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Fn(r), It?.size > 0)) {
				Ht.clear();
				for (let e of It) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) It.has(n) && (It.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ur(n);
					}
				}
				It.clear();
			}
		}
		It = null;
	}
}
function Rt(e) {
	I.schedule(e);
}
function zt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), P(e, b);
		for (var n = e.first; n !== null;) zt(n, t), n = n.next;
	}
}
function Bt(e) {
	P(e, b);
	for (var t = e.first; t !== null;) Bt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Vt = /* @__PURE__ */ new Set(), Ht = /* @__PURE__ */ new Map(), Ut = !1;
function Wt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Ae,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function L(e, t) {
	let n = Wt(e, t);
	return Jn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Gt(e, t = !1, n = !0) {
	let r = Wt(e);
	return t || (r.equals = Me), Ge && n && j !== null && j.l !== null && (j.l.s ??= []).push(r), r;
}
function R(e, t, n = !1) {
	return W !== null && (!Wn || W.f & 131072) && Qe() && W.f & 4325394 && (qn === null || !qn.has(e)) && Ue(), Jt(e, n ? Qt(t) : t, At);
}
var Kt = null, qt = 0;
function Jt(e, t, n = null) {
	if (!e.equals(t)) {
		Hn ? Ht.set(e, t) : Ht.has(e) || Ht.set(e, e.v);
		var r = Nt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && yt(t), Tt === null && it(t);
		}
		e.wv = rr(), Kt = null, qt = 0, Zt(e, x, n), Kt = null, Qe() && G !== null && G.f & 1024 && !(G.f & 96) && (Zn === null ? Qn([e]) : Zn.push(e)), !r.is_fork && Vt.size > 0 && !Ut && Yt();
	}
	return t;
}
function Yt() {
	Ut = !1;
	for (let e of Vt) {
		e.f & 1024 && P(e, S);
		let t;
		try {
			t = ir(e);
		} catch {
			t = !0;
		}
		t && ur(e);
	}
	Vt.clear();
}
function Xt(e) {
	R(e, e.v + 1);
}
function Zt(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = Qe(), a = r.length;
		if (qt += a, qt > 1e5 && Kt === null && (Kt = /* @__PURE__ */ new Set()), Kt !== null) {
			if (Kt.has(e)) return;
			Kt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== G) {
				var l = (c & x) === 0;
				if (l && P(s, t), c & 131072) Vt.add(s);
				else if (c & 2) {
					var u = s;
					Tt?.delete(u), Zt(u, S, n);
				} else if (l) {
					var d = s;
					c & 16 && It !== null && It.add(d), n === null ? Rt(d) : n.push(d);
				}
			}
		}
	}
}
function Qt(e) {
	if (typeof e != "object" || !e || se in e || ce in e) return e;
	let t = p(e);
	if (t !== d && t !== f) return e;
	var n = /* @__PURE__ */ new Map(), r = i(e), a = /* @__PURE__ */ L(0), o = null, s = tr, c = (e) => {
		if (tr === s) return e();
		var t = W, n = tr;
		Gn(null), nr(s);
		var r = e();
		return Gn(t), nr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ L(e.length, o)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Ve();
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
					n.set(t, e), Xt(a);
				}
			} else R(r, D), Xt(a);
			return !0;
		},
		get(t, r, i) {
			if (r === se) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || l(t, r)?.writable) && (a = c(() => /* @__PURE__ */ L(Qt(s ? t[r] : D), o)), n.set(r, a)), a !== void 0) {
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
			return (r !== void 0 || G !== null && (!i || l(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ L(i ? Qt(e[t]) : D, o)), n.set(t, r)), K(r) === D) ? !1 : i;
		},
		set(e, t, i, s) {
			var u = n.get(t), d = t in e;
			if (r && t === "length") for (var f = i; f < u.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ L(D, o)), n.set(f + "", p)) : R(p, D);
			}
			if (u === void 0) (!d || l(e, t)?.writable) && (u = c(() => /* @__PURE__ */ L(void 0, o)), R(u, Qt(i)), n.set(t, u));
			else {
				d = u.v !== D;
				var m = c(() => Qt(i));
				R(u, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, i), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				Xt(a);
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
			He();
		}
	});
}
function $t(e) {
	try {
		if (typeof e == "object" && e && se in e) return e[se];
	} catch {}
	return e;
}
function en(e, t) {
	return Object.is($t(e), $t(t));
}
var tn, nn, rn, an;
function on() {
	if (tn === void 0) {
		tn = window, nn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		rn = l(t, "firstChild").get, an = l(t, "nextSibling").get, m(e) && (e[fe] = void 0, e[de] = null, e[pe] = void 0, e.__e = void 0), m(n) && (n[me] = void 0);
	}
}
function sn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function cn(e) {
	return rn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function ln(e) {
	return an.call(e);
}
function z(e, t) {
	if (!O) return /* @__PURE__ */ cn(e);
	var n = /* @__PURE__ */ cn(k);
	if (n === null) n = k.appendChild(sn());
	else if (t && n.nodeType !== 3) {
		var r = sn();
		return n?.before(r), Te(r), r;
	}
	return t && pn(n), Te(n), n;
}
function B(e, t = !1) {
	if (!O) {
		var n = /* @__PURE__ */ cn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ln(n) : n;
	}
	if (t) {
		if (k?.nodeType !== 3) {
			var r = sn();
			return k?.before(r), Te(r), r;
		}
		pn(k);
	}
	return k;
}
function V(e, t = !1) {
	if (!O) return /* @__PURE__ */ cn(e);
	var n = z(e, t);
	return A(e), n;
}
function H(e, t = 1, n = !1) {
	let r = O ? k : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ ln(r);
	if (!O) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = sn();
			return r === null ? i?.after(a) : r.before(a), Te(a), a;
		}
		pn(r);
	}
	return Te(r), r;
}
function un(e) {
	e.textContent = "";
}
function dn() {
	return !1;
}
function fn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function pn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function mn(e) {
	var t = G;
	if (t === null) return W.f |= oe, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	hn(e, t);
}
function hn(e, t) {
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
function gn(e) {
	G === null && (W === null && Re(e), Le()), Hn && Ie(e);
}
function _n(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function vn(e, t) {
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
	if (e & 4) kt === null ? Nt.ensure().schedule(r) : kt.push(r);
	else if (t !== null) {
		try {
			ur(r);
		} catch (e) {
			throw Nn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= te));
	}
	if (i !== null && (i.parent = n, n !== null && _n(i, n), W !== null && W.f & 2 && !(e & 64))) {
		var a = W;
		(a.effects ??= []).push(i);
	}
	return r;
}
function yn() {
	return W !== null && !Wn;
}
function bn(e) {
	let t = vn(8, null);
	return P(t, b), t.teardown = e, t;
}
function xn(e) {
	gn("$effect");
	var t = G.f;
	if (!W && t & 32 && j !== null && !j.i) {
		var n = j;
		(n.e ??= []).push(e);
	} else return Sn(e);
}
function Sn(e) {
	return vn(4 | ne, e);
}
function Cn(e) {
	return gn("$effect.pre"), vn(8 | ne, e);
}
function wn(e) {
	Nt.ensure();
	let t = vn(64 | E, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? In(t, () => {
			Nn(t), n(void 0);
		}) : (Nn(t), n(void 0));
	});
}
function Tn(e) {
	return vn(4, e);
}
function En(e) {
	return vn(ae | E, e);
}
function Dn(e, t = 0) {
	return vn(8 | t, e);
}
function U(e, t = [], n = [], r = []) {
	ut(r, t, n, (t) => {
		vn(8, () => {
			e(...t.map(K));
		});
	});
}
function On(e, t = 0) {
	return vn(16 | t, e);
}
function kn(e) {
	return vn(32 | E, e);
}
function An(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Hn, r = W;
		Un(!0), Gn(null);
		try {
			t.call(null);
		} catch (t) {
			hn(t, e.parent);
		} finally {
			Un(n), Gn(r);
		}
	}
}
function jn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ct(() => {
			e.abort(ge);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Nn(n, t), n = r;
	}
}
function Mn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Nn(t), t = n;
	}
}
function Nn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Pn(e.nodes.start, e.nodes.end), n = !0), e.f |= ee, jn(e, t && !n), lr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	An(e), e.f ^= ee, e.f |= w;
	var i = e.parent;
	i !== null && i.first !== null && Fn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Pn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ ln(e);
		e.remove(), e = n;
	}
}
function Fn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function In(e, t, n = !0) {
	var r = [];
	e.f |= 256, Ln(e, r, !0);
	var i = () => {
		n && Nn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Ln(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= C;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Ln(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Rn(e) {
	e.f &= -257, zn(e, !0);
}
function zn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= C, e.f & 1024 || (P(e, x), Nt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			zn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Bn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ ln(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Vn = null, Hn = !1;
function Un(e) {
	Hn = e;
}
var W = null, Wn = !1;
function Gn(e) {
	W = e;
}
var G = null;
function Kn(e) {
	G = e;
}
var qn = null;
function Jn(e) {
	W !== null && (W.f & 2097152 || W.f & 2) && (qn ??= /* @__PURE__ */ new Set()).add(e);
}
var Yn = null, Xn = 0, Zn = null;
function Qn(e) {
	Zn = e;
}
var $n = 1, er = 0, tr = er;
function nr(e) {
	tr = e;
}
function rr() {
	return ++$n;
}
function ir(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ir(a) && bt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Tt === null && P(e, b);
	}
	return !1;
}
function ar(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(qn !== null && qn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ar(a, t, !1) : t === a && (n ? P(a, x) : a.f & 1024 && P(a, S), Rt(a));
	}
}
function or(e) {
	var t = Yn, n = Xn, r = Zn, i = W, a = qn, o = j, s = Wn, c = tr, l = e.f;
	Yn = null, Xn = 0, Zn = null, W = l & 96 ? null : e, qn = null, Xe(e.ctx), Wn = !1, tr = ++er, e.ac !== null && (ct(() => {
		e.ac.abort(ge);
	}), e.ac = null);
	try {
		e.f |= ie;
		var u = e.fn, d = u();
		e.f |= T;
		var f = sr(e);
		if (Qe() && Zn !== null && !Wn && f !== null && !(e.f & 6146)) for (var p = 0; p < Zn.length; p++) ar(Zn[p], e);
		if (i !== null && i !== e) {
			if (er++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = er;
			if (t !== null) for (let e of t) e.rv = er;
			Zn !== null && (r === null ? r = Zn : r.push(...Zn));
		}
		return e.f & 8388608 && (e.f ^= oe), d;
	} catch (t) {
		return sr(e), mn(t);
	} finally {
		e.f ^= ie, Yn = t, Xn = n, Zn = r, W = i, qn = a, Xe(o), Wn = s, tr = c;
	}
}
function sr(e) {
	var t = e.deps, n = I?.is_fork;
	if (Yn !== null) {
		var r;
		if (n || lr(e, Xn), t !== null && Xn > 0) for (t.length = Xn + Yn.length, r = 0; r < Yn.length; r++) t[Xn + r] = Yn[r];
		else e.deps = t = Yn;
		if (yn() && e.f & 512) for (r = Xn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Xn < t.length && (lr(e, Xn), t.length = Xn);
	return t;
}
function cr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = a.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (Yn === null || !o.call(Yn, t))) {
		var s = t;
		s.f & 512 && (s.f ^= 512), s.v !== D && it(s), s.ac !== null && ct(() => {
			s.ac.abort(ge), s.ac = null, P(s, x);
		}), xt(s), lr(s, 0);
	}
}
function lr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) cr(e, n[r]);
}
function ur(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, b);
		var n = G;
		G = e;
		try {
			t & 16777232 ? Mn(e) : jn(e), An(e);
			var r = or(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = $n;
		} finally {
			G = n;
		}
	}
}
async function dr() {
	await Promise.resolve(), Pt();
}
function K(e) {
	var t = !!(e.f & 2);
	if (Vn?.add(e), W !== null && !Wn && !(G !== null && G.f & 16384) && (qn === null || !qn.has(e))) {
		var n = W.deps;
		if (W.f & 2097152) e.rv < er && (e.rv = er, Yn === null && n !== null && n[Xn] === e ? Xn++ : Yn === null ? Yn = [e] : Yn.push(e));
		else {
			W.deps ??= [], o.call(W.deps, e) || W.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [W] : o.call(r, W) || r.push(W);
		}
	}
	if (Hn && Ht.has(e)) return Ht.get(e);
	if (t) {
		var i = e;
		if (Hn) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || pr(i)) && (a = yt(i)), Ht.set(i, a), a;
		}
		var s = !(i.f & 512) && !Wn && W !== null && !!(W.f & 512), c = (i.f & T) === 0;
		ir(i) && (s && (i.f |= 512), bt(i)), s && !c && (St(i), fr(i));
	}
	if (Tt?.has(e)) return Tt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : o.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (St(n), fr(n));
	}
}
function pr(e) {
	if (e.v === D) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Ht.has(t) || t.f & 2 && pr(t)) return !0;
	return !1;
}
function mr(e) {
	var t = Wn;
	try {
		return Wn = !0, e();
	} finally {
		Wn = t;
	}
}
function hr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (se in e) gr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && se in n && gr(n);
		}
	}
}
function gr(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			gr(e[n], t);
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
var _r = ["touchstart", "touchmove"];
function vr(e) {
	return _r.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var yr = Symbol("events"), br = /* @__PURE__ */ new Set(), xr = /* @__PURE__ */ new Set();
function Sr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Dr.call(t, e), !e.cancelBubble) return ct(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, tt(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Cr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Sr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && bn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function q(e, t, n) {
	(t[yr] ??= {})[e] = n;
}
function wr(e) {
	for (var t = 0; t < e.length; t++) br.add(e[t]);
	for (var n of xr) n(e);
}
var Tr = null, Er = !1;
function Dr(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Tr = e, Er || (Er = !0, setTimeout(() => {
		Er = !1, Tr = null;
	}));
	var o = 0, s = Tr === e && e[yr];
	if (s) {
		var l = i.indexOf(s);
		if (l !== -1 && (t === document || t === window)) {
			e[yr] = t;
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
		Gn(null), Kn(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[yr]?.[r];
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
			e[yr] = t, delete e.currentTarget, Gn(d), Kn(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Or = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function kr(e) {
	return Or?.createHTML(e) ?? e;
}
function Ar(e) {
	var t = fn("template");
	return t.innerHTML = kr(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function jr(e, t) {
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
		if (O) return jr(k, null), k;
		i === void 0 && (i = Ar(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ cn(i)));
		var t = r || nn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ cn(t), s = t.lastChild;
			jr(o, s);
		} else jr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Mr(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (O) return jr(k, null), k;
		if (!o) {
			var e = /* @__PURE__ */ cn(Ar(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ cn(e);) o.appendChild(/* @__PURE__ */ cn(e));
			else o = /* @__PURE__ */ cn(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ cn(t), r = t.lastChild;
			jr(n, r);
		} else jr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Nr(e, t) {
	return /* @__PURE__ */ Mr(e, t, "svg");
}
function Pr() {
	if (O) return jr(k, null), k;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
	return e.append(t, n), jr(t, n), e;
}
function Y(e, t) {
	if (O) {
		var n = G;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = k), Ee();
	} else e !== null && e.before(t);
}
function Fr() {
	if (O && k && k.nodeType === 8 && k.textContent?.startsWith("$")) {
		let e = k.textContent.substring(1);
		return Ee(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Ir(e) {
	let t = 0, n = Wt(0), r;
	return () => {
		yn() && (K(n), Dn(() => (t === 0 && (r = mr(() => e(() => Xt(n)))), t += 1, () => {
			tt(() => {
				--t, t === 0 && (r?.(), r = void 0, Xt(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Lr = te | E;
function Rr(e, t, n, r) {
	new zr(e, t, n, r);
}
var zr = class {
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
	#h = Ir(() => (this.#m = Wt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = G;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = G.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = On(() => {
			if (O) {
				let e = ke(this.#t);
				Ee();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Lr), O && (this.#e = k);
	}
	#g() {
		try {
			this.#a = kn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		tt(r), t && (this.#s = kn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? Ce() : (t = !0, n && We(), this.#s !== null && In(this.#s, () => {
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
					hn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (w | ee)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = kn(() => e(this.#e)), tt(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = sn(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return kn(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							hn(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(I)) : this.#u === 0 && (this.#e.before(e), this.#c = null, In(this.#o, () => {
					this.#o = null;
				}), this.#S(I));
			}
		}));
	}
	#x() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = kn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Bn(this.#a, e);
				let t = this.#n.pending;
				this.#o = kn(() => t(this.#e));
			} else this.#S(I);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		at(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = G, n = W, r = j;
		Kn(this.#i), Gn(this.#i), Xe(this.#i.ctx);
		try {
			return Nt.ensure(), e();
		} finally {
			Kn(t), Gn(n), Xe(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && In(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, tt(() => {
			this.#d = !1, this.#m && Jt(this.#m, this.#l);
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
		this.#a &&= (Nn(this.#a), null), this.#o &&= (Nn(this.#o), null), this.#s &&= (Nn(this.#s), null), O && (Te(this.#t), De(), Te(Oe()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return kn(() => {
						var r = G;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return hn(e, this.#i.parent), null;
				}
			}));
		};
		tt(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					hn(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => hn(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function X(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[me] ??= e.nodeValue) && (e[me] = n, e.nodeValue = `${n}`);
}
function Br(e, t) {
	return Hr(e, t);
}
var Vr = /* @__PURE__ */ new Map();
function Hr(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: c }) {
	on();
	var l = void 0, u = wn(() => {
		var o = n ?? t.appendChild(sn());
		Rr(o, { pending: () => {} }, (t) => {
			M({});
			var n = j;
			if (a && (n.c = a), i && (r.$$events = i), O && jr(t, null), l = e(t, r) || Ze(), O && (G.nodes.end = k, k === null || k.nodeType !== 8 || k.data !== "]")) throw xe(), ve;
			N();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = vr(r);
					for (let e of [t, document]) {
						var a = Vr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Vr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Dr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(s(br)), xr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Vr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Dr), r.delete(e), r.size === 0 && Vr.delete(n)) : r.set(e, i);
			}
			xr.delete(d), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Ur.set(l, u), l;
}
var Ur = /* @__PURE__ */ new WeakMap(), Wr = class {
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
			if (n) Rn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Rn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Nn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Bn(r, t), t.append(sn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Nn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), In(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Nn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = dn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = sn();
				i.append(a), this.#n.set(e, {
					effect: kn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, kn(() => t(this.anchor)));
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
	O && (r = k, Ee());
	var i = new Wr(e), a = n ? te : 0;
	function o(e, t) {
		if (O) {
			var n = ke(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Oe();
				Te(a), i.anchor = a, we(!1), i.ensure(e, t), we(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	On(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Gr(e, t) {
	return t;
}
function Kr(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, c = 0; c < i; c++) {
		let n = t[c];
		In(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					qr(e, s(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			un(d), d.append(u), e.items.clear();
		}
		qr(e, t, !l);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function qr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= re, Bn(a, document.createDocumentFragment())) : Nn(t[i], n);
	}
}
var Jr;
function Q(e, t, n, r, a, o = null) {
	var c = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		c = O ? Te(/* @__PURE__ */ cn(u)) : u.appendChild(sn());
	}
	O && Ee();
	var d = null, f = /* @__PURE__ */ _t(() => {
		var e = n();
		return i(e) ? e : e == null ? [] : s(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = K(f);
			_.fallback = d, Xr(_, n, c, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= re, Qr(d, null, c)) : Rn(d) : In(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: On(() => {
			var e = K(f), i = e.length;
			let s = !1;
			O && ke(c) === "[!" != (i === 0) && (c = Oe(), Te(c), we(!1), s = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = I, v = dn(), y = 0; y < i; y += 1) {
				O && k.nodeType === 8 && k.data === "]" && (c = k, s = !0, we(!1));
				var b = e[y], x = r(b, y), S = m ? null : l.get(x);
				S ? (S.v && Jt(S.v, b), S.i && Jt(S.i, y), v && _.unskip_effect(S.e)) : (S = Zr(l, m ? c : Jr ??= sn(), b, x, y, a, t, n), m || (S.e.f |= re), l.set(x, S)), u.add(x);
			}
			if (i === 0 && o && !d && (m ? d = kn(() => o(c)) : (d = kn(() => o(Jr ??= sn())), d.f |= re)), i > u.size && Fe("", "", ""), O && i > 0 && Te(Oe()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			s && we(!0), K(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, O && (c = k);
}
function Yr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Xr(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, c = e.items, l = Yr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (a) for (v = 0; v < o; v += 1) h = t[v], g = i(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (h = t[v], g = i(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Rn(_), a && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= re, _ === l) Qr(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), $r(e, d, _), $r(e, _, y), Qr(_, y, n), d = _, p = [], m = [], l = Yr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Qr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					$r(e, S.prev, C.next), $r(e, d, S), $r(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Qr(_, l, n), $r(e, _.prev, _.next), $r(e, _, d === null ? e.effect.first : d.next), $r(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Yr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Yr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (qr(e, s(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Yr(l.next);
		var T = w.length;
		if (T > 0) {
			var ee = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			Kr(e, w, ee);
		}
	}
	a && tt(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Zr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Wt(n) : /* @__PURE__ */ Gt(n, !1, !1) : null, l = o & 2 ? Wt(i) : null;
	return {
		v: c,
		i: l,
		e: kn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Qr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ ln(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function $r(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ei(e, t, ...n) {
	var r = new Wr(e);
	On(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, te);
}
// node_modules/clsx/dist/clsx.mjs
function ti(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = ti(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function ni() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = ti(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/svelte/src/internal/shared/attributes.js
function ri(e) {
	return typeof e == "object" ? ni(e) : e ?? "";
}
var ii = [..." 	\n\r\f\xA0\v﻿"];
function ai(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ii.includes(r[o - 1])) && (s === r.length || ii.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function oi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function si(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function ci(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(si)), i && c.push(...Object.keys(i).map(si));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = si(e.substring(l, u).trim());
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
		return r && (n += oi(r)), i && (n += oi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function li(e, t, n, r, i, a) {
	var o = e[fe];
	if (O || o !== n || o === void 0) {
		var s = ai(n, r, a);
		O && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[fe] = n;
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
function di(e, t, n, r) {
	var i = e[pe];
	if (O || i !== t) {
		var a = ci(t, r);
		O && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[pe] = t;
	} else r && (Array.isArray(r) ? (ui(e, n?.[0], r[0]), ui(e, n?.[1], r[1], "important")) : ui(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function fi(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function pi(e, t) {
	var n = e.__defaultValue, r = e.multiple, a = r ? n ?? [] : null;
	if (!r || i(a)) {
		var o = e.selectedIndex, s = t && r ? new Set(e.selectedOptions) : null;
		for (var c of e.options) {
			var l = gi(c);
			fi(c, r ? a.includes(l) : en(l, n));
		}
		if (t) {
			if (s !== null) for (c of e.options) {
				var u = s.has(c);
				c.selected !== u && (c.selected = u);
			}
			else e.selectedIndex !== o && (e.selectedIndex = o);
		}
	}
}
function mi(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!i(t)) return Se();
		for (var r of e.options) r.selected = t.includes(gi(r));
	} else {
		for (r of e.options) if (en(gi(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function hi(e) {
	var t = new MutationObserver((t) => {
		t.every(_i) || ("__defaultValue" in e && pi(e, !1), "__value" in e && mi(e, e.__value));
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), bn(() => {
		t.disconnect();
	});
}
function gi(e) {
	return "__value" in e ? e.__value : e.value;
}
function _i(e) {
	if (e.target.closest("selectedcontent") !== null) return !0;
	if (e.type === "childList") {
		var t = [...e.addedNodes, ...e.removedNodes];
		return t.length > 0 && t.every((e) => e.nodeName === "SELECTEDCONTENT");
	}
	return !1;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var vi = Symbol("is custom element"), yi = Symbol("is html"), bi = _e ? "link" : "LINK", xi = _e ? "progress" : "PROGRESS";
function Si(e) {
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
		e[he] = n, tt(n), st();
	}
}
function Ci(e, t) {
	var n = wi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === xi) && (e.value = t ?? "");
}
function $(e, t, n, r) {
	var i = wi(e);
	O && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === bi) || i[t] !== (i[t] = n) && (t === "loading" && (e[ue] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ei(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function wi(e) {
	return e[de] ??= {
		[vi]: e.nodeName.includes("-"),
		[yi]: e.namespaceURI === ye
	};
}
var Ti = /* @__PURE__ */ new Map();
function Ei(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ti.get(t);
	if (n) return n;
	Ti.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = u(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = p(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Di(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	lt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ji(e) ? Mi(a) : a, n(a), I !== null && r.add(I), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (O && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(ji(e) ? Mi(e.value) : e.value), I !== null && r.add(I)), Dn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = I;
			if (r.has(i)) return;
		}
		ji(e) && n === Mi(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
var Oi = /* @__PURE__ */ new Set();
function ki(e, t, n, r, i = r) {
	var a = n.getAttribute("type") === "checkbox", o = e;
	let s = !1;
	if (t !== null) for (var c of t) o = o[c] ??= [];
	o.push(n), lt(n, "change", () => {
		var e = n.__value;
		a && (e = Ai(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), Dn(() => {
		var e = r();
		O && n.defaultChecked !== n.checked ? s = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = en(n.__value, e);
	}), bn(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), Oi.has(o) || (Oi.add(o), tt(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), Oi.delete(o);
	})), tt(() => {
		if (s) {
			var e = a ? Ai(o, e, n.checked) : o.find((e) => e.checked)?.__value;
			i(e);
		}
	});
}
function Ai(e, t, n) {
	for (var r = /* @__PURE__ */ new Set(), i = 0; i < e.length; i += 1) e[i].checked && r.add(e[i].__value);
	return n || r.delete(t), Array.from(r);
}
function ji(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Mi(e) {
	return e === "" ? null : +e;
}
var Ni = /* @__PURE__ */ new class e {
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
function Pi(e, t, n) {
	var r = Ni.observe(e, () => n(e[t]));
	Tn(() => (mr(() => n(e[t])), r));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Fi(e, t) {
	return e === t || e?.[se] === t;
}
function Ii(e = Ze(), t, n, r) {
	var i = j.r, a = G;
	return Tn(() => {
		var o, s;
		return Dn(() => {
			o = s, s = r?.() || [], mr(() => {
				Fi(n(...s), e) || (t(e, ...s), o && Fi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Fi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
function Li(e, t, n = t) {
	var r = e === "x", i = () => ct(() => {
		a = !0, clearTimeout(o), o = setTimeout(s, 100), n(window[r ? "scrollX" : "scrollY"]);
	});
	addEventListener("scroll", i, { passive: !0 });
	var a = !1, o, s = () => {
		a = !1;
	}, c = !0;
	Dn(() => {
		var e = t();
		c ? c = !1 : !a && e != null && (a = !0, clearTimeout(o), r ? scrollTo(e, window.scrollY) : scrollTo(window.scrollX, e), o = setTimeout(s, 100));
	}), Tn(i), bn(() => {
		removeEventListener("scroll", i);
	});
}
// node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function Ri(e = !1) {
	let t = j, n = t.l.u;
	if (!n) return;
	let r = () => hr(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ mt(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => K(i);
	}
	n.b.length && Cn(() => {
		zi(t, r), _(n.b);
	}), xn(() => {
		let e = mr(() => n.m.map(g));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && xn(() => {
		zi(t, r), _(n.a);
	});
}
function zi(e, t) {
	if (e.l.s) for (let t of e.l.s) K(t);
	t();
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var Bi = !1;
function Vi(e) {
	var t = Bi;
	try {
		return Bi = !1, [e(), Bi];
	} finally {
		Bi = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function Hi(e, t, n, r) {
	var i = !Ge || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, u = void 0, d = () => o && i ? (u ??= /* @__PURE__ */ mt(r), K(u)) : (c && (c = !1, s = o ? mr(r) : r), s);
	let f;
	if (a) {
		var p = se in e || le in e;
		f = l(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = Vi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Be(t), f(m)));
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
	var v = !1, y = (n & 1 ? mt : _t)(() => (v = !1, g()));
	a && K(y);
	var b = G;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? K(y) : i && a ? Qt(e) : e;
			return R(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return Hn && v || b.f & 16384 ? y.v : K(y);
	});
}
function Ui(e) {
	j === null && Ne("onMount"), Ge && j.l !== null ? Wi(j).m.push(e) : xn(() => {
		let t = mr(e);
		if (typeof t == "function") return t;
	});
}
function Wi(e) {
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
var Gi = (e) => Math.min(1, Math.max(0, e)), Ki = (e) => String(e).padStart(2, "0"), qi = (e, t) => t > 0 ? Gi(e / t) : 1, Ji = (e) => e.workouts ?? e.gym ?? 0, Yi = (e) => [
	e.goal.runs,
	Ji(e.goal),
	e.goal.active_days ?? 0
], Xi = (e) => [
	e.runs,
	Ji(e),
	e.active_days ?? 0
], Zi = (e) => Xi(e).map((t, n) => qi(t, Yi(e)[n])), Qi = (e) => e.toLocaleString("en-US");
function $i(e, t) {
	if (e == null) return null;
	let n = t > 0 ? e >= t ? " · Active day ✓" : ` · ${Qi(t - e)} to go` : "";
	return `👟 ${Qi(e)} steps today${n}`;
}
function ea(e, t) {
	let n = (e) => e ? " ✓" : "", r = ([e, n]) => {
		let r = t[e];
		if (n) return `${r?.name ?? e} ✓`;
		let i = r ? Yi(r.week) : [], a = r ? Xi(r.week) : [];
		return `${r?.name ?? e} ${i.filter((e, t) => e > 0 && a[t] >= e).length} of ${i.filter((e) => e > 0).length}`;
	};
	if (e.mode === "team") return `${e.team.done} of ${e.team.target} team points${n(e.met)}`;
	let i = Object.entries(e.members_met).map(r);
	return e.mode === "together" && i.push(`${e.together.done} of ${e.together.target} together${n(e.together.done >= e.together.target)}`), i.join(" · ");
}
function ta(e) {
	if (!e.reward) return null;
	if (e.met) return `${e.reward} unlocked!`;
	let t = {
		own: "you both make your goals",
		together: `you both make your goals and do ${e.together.target} together`,
		team: `you reach ${e.team.target} team points`
	};
	return `${e.reward}: unlocks when ${t[e.mode]}`;
}
function na(e) {
	let t = e.xp - e.level_floor, n = e.next_level_xp - e.level_floor;
	return {
		level: e.level,
		into: t,
		span: n,
		frac: n > 0 ? Gi(t / n) : 1
	};
}
var ra = (e) => `Week ${Number(e.week.split("-W")[1])} · ${e.days_left} ${e.days_left === 1 ? "day" : "days"} left`;
function ia(e, t, n = 15) {
	let r = new Date(e);
	return t - r > n * 6e4 ? `Updated ${Ki(r.getHours())}:${Ki(r.getMinutes())}` : null;
}
var aa = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], oa = [
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
function sa(e, t = !0) {
	let n = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(e);
	if (!n) return "";
	let [, r, i, a, o] = n, s = `${aa[new Date(Date.UTC(r, i - 1, a)).getUTCDay()]} ${Number(a)} ${oa[i - 1]}`;
	return t ? `${s}, ${o}` : s;
}
var ca = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${Ki(e % 60)} min` : `${e / 60} h`;
function la(e) {
	if (e.kind !== "run" && e.kind !== "walk" || !(e.km > 0)) return null;
	let t = Math.round(e.minutes * 60 / e.km);
	return `${Math.floor(t / 60)}:${Ki(t % 60)} /km`;
}
var ua = (e) => ({
	title: e.name,
	when: sa(e.start, e.kind !== "active_day"),
	duration: e.kind === "active_day" ? `${Qi(e.steps)} steps` : ca(e.minutes),
	xp: e.xp ? `+${e.xp}` : "",
	detail: {
		km: e.km == null ? null : `${e.km.toFixed(1)} km`,
		pace: la(e),
		hr: e.avg_hr == null ? null : `${e.avg_hr} bpm`,
		plan: e.plan ?? null,
		url: e.url ?? null
	},
	removable: e.kind === "active_day" ? null : e.excluded ? "restore" : e.key.startsWith("manual:") ? "delete" : "remove"
});
function da(e) {
	let t = [["walk", e.warmup_s ?? 0], ...e.intervals].filter(([, e]) => e > 0), n = t.reduce((e, [, t]) => e + t, 0);
	return t.map(([e, t]) => ({
		kind: e,
		frac: t / n
	}));
}
function fa(e, t) {
	let n = Object.hasOwn(t, e.person) ? e.person : null;
	return {
		self: n,
		others: Object.keys(t).filter((e) => e !== n)
	};
}
var pa = (e) => `${Number(e.slice(8, 10))} ${oa[Number(e.slice(5, 7)) - 1]}`;
function ma(e, t, n) {
	let r = t.find((t) => t.key === e.key);
	return n - e.at > 6e5 || !r || e.want !== null && r.excluded === e.want;
}
function ha(e, t, n) {
	let r = (e[t] ?? Promise.resolve()).then(n), i = e[t] = r.catch(() => {});
	return i.then(() => e[t] === i && delete e[t]), r;
}
function ga(e) {
	let t = (e) => e < 10 ? e.toFixed(1) : Math.round(e).toLocaleString(), n = e.km == null ? "unknown" : e.km >= e.limit ? "replace" : e.km >= .9 * e.limit ? "soon" : "ok", r = e.last_run ? new Date(e.last_run) : null, i = e.runs ? `${e.runs} ${e.runs === 1 ? "run" : "runs"}` : e.runs === 0 ? "No runs yet" : "";
	return {
		name: e.name,
		km: e.km == null ? "—" : `${t(e.km)} / ${t(e.limit)} km`,
		frac: e.km == null ? 0 : Gi(e.km / e.limit),
		state: n,
		label: {
			soon: "Replace soon",
			replace: "Replace"
		}[n] ?? null,
		detail: [i, r && `last run ${r.getDate()} ${oa[r.getMonth()]}`].filter(Boolean).join(" · ")
	};
}
var _a = {
	name: [1, 40],
	replace_at_km: [
		100,
		3e3,
		10
	]
}, va = (e, t) => !!t && (e.run_shoes !== void 0 || (e.shoes ?? []).some((e) => e.id != null));
function ya(e, t, { partial: n = !1 } = {}) {
	let r = {};
	if (!(n && e === void 0)) {
		let t = String(e ?? "").trim();
		if (t.length < _a.name[0]) return { error: "Give the shoe a name" };
		if (t.length > _a.name[1]) return { error: `A name of at most ${_a.name[1]} characters` };
		r.name = t;
	}
	if (!(n && t === void 0)) {
		let [e, n] = _a.replace_at_km, i = typeof t == "number" ? t : t === null || String(t).trim() === "" ? NaN : Number(t);
		if (!(i >= e && i <= n)) return { error: `Replace at: ${e} to ${n} km` };
		r.replace_at_km = i;
	}
	return r;
}
function ba(e, t) {
	let n = e.map((e) => ({
		id: e.id,
		label: e.current ? `${e.name} (current)` : e.name
	})), r = n.some((e) => e.id === t);
	return {
		value: r ? t : "",
		options: n,
		extra: r ? null : t == null ? "No shoe" : "Retired shoe"
	};
}
var xa = {
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
}, Sa = [
	"runs",
	"workouts",
	"active_days",
	"steps"
], Ca = {
	runs: 0,
	workouts: 0,
	active_days: 0,
	steps: 1e4
};
function wa(e, t) {
	let [n, r, i] = xa[e];
	return Math.min(r, Math.max(n, Math.round(t / i) * i));
}
function Ta(e, t) {
	let n = e.current, r = (t) => n?.people?.[t] ?? e.defaults?.[t] ?? {};
	return {
		people: Object.fromEntries(Object.keys(t).map((e) => {
			let t = r(e);
			return [e, Object.fromEntries(Sa.map((e) => [e, wa(e, t[e] ?? Ca[e])]))];
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
function Ea(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return t.setUTCDate(t.getUTCDate() + 3 - (t.getUTCDay() + 6) % 7), Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5 + 1) / 7);
}
var Da = (e, t) => Sa.every((n) => (n === "workouts" ? Ji(t) : t[n]) === e[n]), Oa = (e, t, n) => n - e.at > 6e5 || Object.entries(e.entry.people).every(([e, n]) => !t[e] || Da(n, t[e].week.goal));
function ka(e, t) {
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
var Aa = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${Ki(e.getMonth() + 1)}-${Ki(e.getDate())}`;
function ja(e, t, n) {
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
function Ma(e) {
	let t = e.filter((e) => e.active).length;
	return `${t} active ${t === 1 ? "day" : "days"} · ${Qi(e.reduce((e, t) => e + (t.steps ?? 0), 0))} steps`;
}
var Na = (e) => `${e.w} ${e.unit} × ${e.r}`, Pa = [
	"Chest",
	"Back",
	"Shoulders",
	"Arms",
	"Legs",
	"Core",
	"Other"
], Fa = (e) => Pa.map((t) => ({
	group: t,
	lifts: (e ?? []).filter((e) => (Pa.includes(e.group) ? e.group : "Other") === t)
})).filter((e) => e.lifts.length), Ia = (e) => Fa(e).map(({ group: e, lifts: t }) => ({
	group: e,
	count: t.length,
	lift: [...t].sort((e, t) => (t.sessions ?? 0) - (e.sessions ?? 0) || t.date.localeCompare(e.date) || e.name.localeCompare(t.name))[0]
})), La = (e) => Fa(e).map(({ group: e, lifts: t }) => ({
	group: e,
	lifts: [...t].sort((e, t) => e.name.localeCompare(t.name))
})), Ra = (e) => `${Math.floor(e / 60)}:${Ki(e % 60)}`, za = (e) => new Set([...(e?.lifts ?? []).map((e) => e.key), e?.fastest_1k?.key].filter(Boolean)), Ba = 5e3, Va = Qt({}), Ha = Qt({
	on: !1,
	text: "",
	undo: null
}), Ua = Qt({
	entry: null,
	at: 0
}), Wa = Qt({ n: 0 }), Ga, Ka = 0, qa = {};
function Ja(e, t = null) {
	clearTimeout(Ga), Object.assign(Ha, {
		on: !0,
		text: e,
		undo: t
	}), Ga = setTimeout(() => Ha.on = !1, Ba);
}
function Ya(e, t = Date.now()) {
	for (let [n, r] of Object.entries(Va)) ma(r, e[r.person]?.feed ?? [], t) && delete Va[n];
	Ua.entry && Oa(Ua, e, t) && (Ua.entry = null);
}
async function Xa(e, t) {
	try {
		await n("POST", "settings", e);
	} catch (e) {
		return Ja(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(Ua, {
		entry: e,
		at: Date.now()
	}), Ya(t), Ja("Saved · updates within 5 min"), !0;
}
async function Za(e, t, r) {
	let i = `${e}/${t}`, a = Va[i], o = ++Ka, s = t.startsWith("manual:");
	Va[i] = {
		person: e,
		key: t,
		want: s && r === "remove" ? null : r === "remove",
		at: Date.now(),
		n: o
	}, r === "remove" && !s && Ja("Removed", () => Za(e, t, "restore"));
	try {
		await ha(qa, i, () => n("POST", "workouts", {
			person: e,
			key: t,
			action: r
		}));
	} catch (e) {
		Va[i]?.n === o && (a ? Va[i] = a : delete Va[i]), Ja(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
var Qa = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
async function $a(e) {
	try {
		await n("POST", "shoes", e);
	} catch (e) {
		return Ja(Qa(e)), !1;
	}
	return Wa.n++, !0;
}
async function eo(e, t, r) {
	try {
		await n("POST", "workouts", {
			action: "shoe",
			person: e,
			key: t,
			shoe_id: r
		});
	} catch (e) {
		return Ja(Qa(e)), !1;
	}
	return Wa.n++, Ja("Moved to the other shoe"), !0;
}
// src/lib/ui/Badges.svelte
var to = /* @__PURE__ */ J("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), no = /* @__PURE__ */ J("<ul class=\"svelte-m8wnum\"></ul>"), ro = /* @__PURE__ */ J("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), io = /* @__PURE__ */ J("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), ao = /* @__PURE__ */ J("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function oo(e, t) {
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
	var a = ao(), o = z(a), s = (e) => {
		var n = no();
		Q(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = to(), i = z(n), a = V(i, !0), o = H(i, 2), s = V(o, !0), c = V(H(o, 2), !0);
			A(n), U((e, n) => {
				X(a, e), X(s, K(t).title), X(c, n);
			}, [() => r(K(t)), () => pa(K(t).unlocked_at)]), Y(e, n);
		}), A(n), Y(e, n);
	};
	Z(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = H(o, 2), l = (e) => {
		var n = no();
		Q(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = ro(), a = z(n), o = V(a, !0), s = H(a, 2), c = V(s, !0), l = H(s, 2), u = V(l), d = H(l, 2), f = z(d);
			let p;
			A(d), A(n), U((e, n, r, i) => {
				X(o, e), X(c, K(t).title), X(u, `${n ?? ""} of ${r ?? ""}`), p = di(f, "", p, { width: i });
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
		Y(e, io());
	};
	Z(u, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(d);
	}), A(a), Y(e, a), N();
}
// src/lib/media.svelte.js
var so = Qt({
	wide: !1,
	reducedMotion: !1
}), co = matchMedia("(min-width: 768px)"), lo = matchMedia("(prefers-reduced-motion: reduce)"), uo = () => {
	so.wide = co.matches, so.reducedMotion = lo.matches;
};
co.addEventListener("change", uo), lo.addEventListener("change", uo), uo();
// src/lib/motion.js
function fo(e, { onFrame: t, onSettle: n, snap: r = {
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
var po = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), mo = (e) => po(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function ho({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var go = /* @__PURE__ */ J("<span class=\"mini svelte-69s4be\"> </span>"), _o = /* @__PURE__ */ J("<span class=\"mini svelte-69s4be\">Together</span>"), vo = /* @__PURE__ */ J("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), yo = /* @__PURE__ */ J("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), bo = /* @__PURE__ */ J("<div><dt class=\"svelte-69s4be\"> </dt><dd class=\"svelte-69s4be\"> </dd></div>"), xo = /* @__PURE__ */ J("<dl class=\"svelte-69s4be\"></dl>"), So = /* @__PURE__ */ J("<option disabled=\"\"> </option>"), Co = /* @__PURE__ */ J("<option> </option>"), wo = /* @__PURE__ */ J("<label class=\"shoe svelte-69s4be\">Shoe: <select class=\"svelte-69s4be\"><!><!></select></label>"), To = /* @__PURE__ */ J("<span class=\"ask svelte-69s4be\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-69s4be\">Delete</button>", 1), Eo = /* @__PURE__ */ J("<button type=\"button\"> </button>"), Do = /* @__PURE__ */ J("<div><div class=\"inner svelte-69s4be\"><!> <!> <div class=\"acts svelte-69s4be\"><!></div></div></div>"), Oo = /* @__PURE__ */ J("<li><button type=\"button\" class=\"head svelte-69s4be\"><span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span></button> <!></li>");
function ko(e, t) {
	let n = Fr();
	M(t, !0);
	let r = Hi(t, "shoes", 3, null), i = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, a = /* @__PURE__ */ F(() => Va[`${t.person}/${t.item.key}`]), o = /* @__PURE__ */ F(() => ua(K(a) && K(a).want !== null ? {
		...t.item,
		excluded: K(a).want
	} : t.item)), s = /* @__PURE__ */ F(() => [
		["Distance", K(o).detail.km],
		["Pace", K(o).detail.pace],
		["Avg heart rate", K(o).detail.hr],
		["Plan session", K(o).detail.plan]
	].filter(([, e]) => e)), c = /* @__PURE__ */ F(() => K(a)?.want === null), l = /* @__PURE__ */ F(() => r() && t.item.kind === "run" ? ba(r(), t.runShoes?.[t.item.key]) : null), u = /* @__PURE__ */ F(() => K(s).length > 0 || t.canEdit && !!K(o).removable || !!K(l)?.options.length), d = /* @__PURE__ */ L(!1), f = /* @__PURE__ */ L(!1), p = /* @__PURE__ */ L(void 0), m = /* @__PURE__ */ L(void 0), h = ho({
		response: .35,
		damping: 1
	}), g = fo(h, {
		onFrame: (e) => K(p).style.height = `${e}px`,
		onSettle: () => K(d) && (K(p).style.height = "auto")
	});
	xn(() => g.stop);
	function _() {
		K(u) && (R(d, !K(d)), R(f, !1), so.reducedMotion ? K(p).style.height = K(d) ? "auto" : "0px" : (g.running || (h.value = K(p).offsetHeight), g.to(K(d) ? K(m).offsetHeight : 0)));
	}
	async function v(e) {
		let n = e.currentTarget;
		await eo(t.person, t.item.key, Number(n.value)) || (n.value = String(K(l).value));
	}
	let b = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function x() {
		K(o).removable === "delete" ? R(f, !0) : Za(t.person, t.item.key, K(o).removable);
	}
	var S = Oo();
	let C;
	var w = z(S), T = z(w), ee = V(T, !0), te = H(T, 2), E = z(te), ne = z(E), re = H(ne), ie = (e) => {
		var n = go(), r = V(n, !0);
		U(() => X(r, t.item.plan)), Y(e, n);
	};
	Z(re, (e) => {
		t.item.plan && e(ie);
	});
	var ae = H(re, 2), oe = (e) => {
		Y(e, _o());
	};
	Z(ae, (e) => {
		t.item.joint && e(oe);
	});
	var se = H(ae, 2), ce = (e) => {
		Y(e, vo());
	};
	Z(se, (e) => {
		t.record && e(ce);
	}), A(E);
	var le = V(H(E, 2));
	A(te);
	var ue = H(te, 2), de = z(ue), fe = (e) => {
		Y(e, yo());
	};
	Z(de, (e) => {
		K(a) && e(fe);
	});
	var pe = H(de);
	A(ue), A(w);
	var me = H(w, 2), he = (e) => {
		var r = Do();
		let i;
		var a = z(r), u = z(a), h = (e) => {
			var t = xo();
			Q(t, 21, () => K(s), ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ F(() => y(K(t), 2));
				let r = () => K(n)[0], i = () => K(n)[1];
				var a = bo(), o = z(a), s = V(o, !0), c = V(H(o), !0);
				A(a), U(() => {
					X(s, r()), X(c, i());
				}), Y(e, a);
			}), A(t), Y(e, t);
		};
		Z(u, (e) => {
			K(s).length && e(h);
		});
		var g = H(u, 2), S = (e) => {
			var t = wo(), n = H(z(t)), r = z(n), i = (e) => {
				var t = So(), n = V(t, !0);
				t.value = t.__value = "", U(() => X(n, K(l).extra)), Y(e, t);
			};
			Z(r, (e) => {
				K(l).extra && e(i);
			}), Q(H(r), 17, () => K(l).options, (e) => e.id, (e, t) => {
				var n = Co(), r = V(n, !0), i = {};
				U(() => {
					X(r, K(t).label), i !== (i = K(t).id) && (n.value = (n.__value = i) ?? "");
				}), Y(e, n);
			}), A(n);
			var a;
			hi(n), A(t), U(() => {
				a !== (a = K(l).value) && (n.value = (n.__value = a) ?? "", mi(n, a));
			}), q("change", n, v), Y(e, t);
		};
		Z(g, (e) => {
			K(l)?.options.length && e(S);
		});
		var C = H(g, 2), w = z(C), T = (e) => {
			var n = Pr(), r = B(n), i = (e) => {
				var n = To(), r = H(B(n), 2), i = H(r, 2);
				q("click", r, () => R(f, !1)), q("click", i, () => (_(), Za(t.person, t.item.key, "remove"))), Y(e, n);
			}, a = (e) => {
				var t = Eo();
				let n;
				var r = V(t, !0);
				U(() => {
					n = li(t, 1, "btn svelte-69s4be", null, n, { danger: K(o).removable !== "restore" }), X(r, b[K(o).removable]);
				}), q("click", t, x), Y(e, t);
			};
			Z(r, (e) => {
				K(f) ? e(i) : e(a, -1);
			}), Y(e, n);
		};
		Z(w, (e) => {
			t.canEdit && !K(c) && K(o).removable && e(T);
		}), A(C), A(a), Ii(a, (e) => R(m, e), () => K(m)), A(r), Ii(r, (e) => R(p, e), () => K(p)), U(() => {
			i = li(r, 1, "more svelte-69s4be", null, i, { open: K(d) }), $(r, "id", `${n}-more`), r.inert = !K(d);
		}), Y(e, r);
	};
	Z(me, (e) => {
		K(u) && e(he);
	}), A(S), U(() => {
		C = li(S, 1, "svelte-69s4be", null, C, { dim: K(o).removable === "restore" || K(c) }), $(w, "aria-expanded", K(u) ? K(d) : void 0), $(w, "aria-controls", K(u) ? `${n}-more` : void 0), li(T, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), X(ee, i[t.item.kind] ?? "💪"), X(ne, `${K(o).title ?? ""} `), X(le, `${K(o).when ?? ""} · ${K(o).duration ?? ""}`), X(pe, ` ${(K(o).removable === "restore" ? "Removed" : K(o).xp && `${K(o).xp} XP`) ?? ""}`);
	}), q("click", w, _), Y(e, S), N();
}
wr(["click", "change"]);
// src/lib/ui/Feed.svelte
var Ao = /* @__PURE__ */ J("<ul class=\"card svelte-n1344i\"></ul>"), jo = /* @__PURE__ */ J("<p class=\"caption empty svelte-n1344i\">No workouts in the last 30 days.</p>");
function Mo(e, t) {
	M(t, !0);
	let n = Hi(t, "shoes", 3, null);
	var r = Pr(), i = B(r), a = (e) => {
		var r = Ao();
		Q(r, 21, () => t.items, (e) => e.key, (e, r) => {
			{
				let i = /* @__PURE__ */ F(() => t.records?.has(K(r).key));
				ko(e, {
					get person() {
						return t.person;
					},
					get item() {
						return K(r);
					},
					get canEdit() {
						return t.canEdit;
					},
					get record() {
						return K(i);
					},
					get shoes() {
						return n();
					},
					get runShoes() {
						return t.runShoes;
					}
				});
			}
		}), A(r), Y(e, r);
	}, o = (e) => {
		Y(e, jo());
	};
	Z(i, (e) => {
		t.items.length ? e(a) : e(o, -1);
	}), Y(e, r), N();
}
// src/lib/ui/PlanBar.svelte
var No = /* @__PURE__ */ J("<span> </span>"), Po = /* @__PURE__ */ J("<i class=\"svelte-1y5m0aq\"></i>"), Fo = /* @__PURE__ */ J("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), Io = /* @__PURE__ */ J("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!></div>");
function Lo(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => da(t.plan)), r = /* @__PURE__ */ F(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0)) / 60));
	var i = Io(), a = z(i), o = z(a), s = V(o, !0), c = H(o, 2), l = (e) => {
		var n = No();
		let r;
		var i = V(n, !0);
		U(() => {
			r = li(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), X(i, t.plan.due_today ? "Due today" : "Rest day");
		}), Y(e, n);
	};
	Z(c, (e) => {
		K(n).length && e(l);
	}), A(a);
	var u = H(a, 2), d = (e) => {
		var t = Fo(), i = B(t);
		Q(i, 21, () => K(n), Gr, (e, t) => {
			var n = Po();
			let r;
			U(() => r = di(n, "", r, {
				"flex-grow": K(t).frac,
				background: `var(--${K(t).kind === "run" ? "run" : "fill"})`
			})), Y(e, n);
		}), A(i);
		var a = H(i, 2), o = z(a), s = z(o);
		di(s, "", {}, { background: "var(--run)" }), di(H(s, 2), "", {}, { background: "var(--fill)" }), De(), A(o);
		var c = V(H(o, 2));
		A(a), U(() => {
			$(i, "aria-label", `Run and walk intervals, ${K(r) ?? ""} minutes in total`), X(c, `${K(r) ?? ""} min`);
		}), Y(e, t);
	};
	Z(u, (e) => {
		K(n).length && e(d);
	}), A(i), U(() => X(s, t.plan.state)), Y(e, i), N();
}
// src/lib/gesture.js
var Ro = (e, t = .998) => e / 1e3 * t / (1 - t), zo = (e, t, n) => e + Ro(t) > n / 2;
function Bo(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var Vo = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), Ho = /* @__PURE__ */ J("<li class=\"svelte-18znx9k\"><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), Uo = /* @__PURE__ */ J("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1), Wo = /* @__PURE__ */ J("<dialog><div class=\"grab svelte-18znx9k\"><h2 class=\"svelte-18znx9k\">All records</h2> <button type=\"button\" class=\"close press svelte-18znx9k\" aria-label=\"Close\">✕</button></div> <div class=\"body svelte-18znx9k\"></div></dialog>");
function Go(e, t) {
	let n = Fr();
	M(t, !0);
	let r, i, a = /* @__PURE__ */ L(0), o = null, s = /* @__PURE__ */ L(!1), c = !1;
	function l(e = null) {
		r.open || (c = document.documentElement.style.overflow !== "hidden", c && (document.documentElement.style.overflow = "hidden"), r.showModal(), i.scrollTop = 0, e && i.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	function u() {
		c && (document.documentElement.style.overflow = ""), c = !1, R(a, 0);
	}
	function d(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), o = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, R(s, !0));
	}
	function f(e) {
		o && (R(a, Math.max(0, e.clientY - o.start), !0), o.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), o.samples.length > 8 && o.samples.shift());
	}
	function p(e) {
		if (!o) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = Bo([...o.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		o = null, R(s, !1), zo(K(a), n, r.offsetHeight) ? r.close() : R(a, 0);
	}
	var m = { open: l }, h = Wo();
	let g, _;
	var v = z(h), y = z(v), b = H(y, 2);
	A(v);
	var x = H(v, 2);
	return Q(x, 21, () => t.groups, (e) => e.group, (e, t) => {
		var n = Uo(), r = B(n), i = V(r, !0), a = H(r, 2);
		Q(a, 21, () => K(t).lifts, (e) => e.id, (e, t) => {
			var n = Ho(), r = z(n), i = z(r), a = H(i), o = V(a, !0), s = H(a);
			A(r), A(n), U((e, n) => {
				X(i, `${K(t).name ?? ""} · `), X(o, e), X(s, ` · ${n ?? ""}`);
			}, [() => Na(K(t)), () => pa(K(t).date)]), Y(e, n);
		}), A(a), U(() => {
			$(r, "data-group", K(t).group), X(i, K(t).group);
		}), Y(e, n);
	}), A(x), Ii(x, (e) => i = e, () => i), A(h), Ii(h, (e) => r = e, () => r), U(() => {
		$(h, "aria-labelledby", `${n}-t`), g = li(h, 1, "svelte-18znx9k", null, g, { dragging: K(s) }), _ = di(h, "", _, { transform: K(a) ? `translateY(${K(a)}px)` : null }), $(y, "id", `${n}-t`);
	}), q("click", h, (e) => e.target === r && r.close()), Cr("close", h, u), q("keydown", h, (e) => e.key === "Escape" && e.stopPropagation()), q("pointerdown", v, d), q("pointermove", v, f), q("pointerup", v, p), Cr("pointercancel", v, p), q("click", b, () => r.close()), Y(e, h), N(m);
}
wr([
	"click",
	"keydown",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/StepBars.svelte
var Ko = /* @__PURE__ */ J("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), qo = /* @__PURE__ */ J("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), Jo = /* @__PURE__ */ J("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function Yo(e, t) {
	M(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), r = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var i = Jo(), a = z(i);
	Q(a, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = Ko();
		let i;
		var a = z(n), o = z(a);
		let s, c;
		A(a);
		var l = V(H(a, 2), !0);
		A(n), U((e) => {
			$(n, "aria-label", e), $(n, "aria-hidden", K(t).future ? "true" : void 0), $(n, "aria-current", K(t).isToday ? "date" : void 0), i = li(n, 1, "svelte-1f099m", null, i, { today: K(t).isToday }), s = li(o, 1, "svelte-1f099m", null, s, {
				active: K(t).active,
				future: K(t).future
			}), c = di(o, "", c, { height: `${K(t).frac * 100}%` }), X(l, K(t).label);
		}, [() => K(t).future ? void 0 : r(K(t))]), Y(e, n);
	}), A(a);
	var o = H(a, 2), s = (e) => {
		var n = qo();
		let r;
		U(() => r = di(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), Y(e, n);
	};
	Z(o, (e) => {
		t.goalFrac !== null && e(s);
	}), A(i), Y(e, i), N();
}
// src/lib/ui/Progress.svelte
var Xo = /* @__PURE__ */ J("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), Zo = /* @__PURE__ */ J("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), Qo = /* @__PURE__ */ J("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), $o = /* @__PURE__ */ J("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), es = /* @__PURE__ */ J("<div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span></div>"), ts = /* @__PURE__ */ J("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), ns = /* @__PURE__ */ J("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function rs(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => t.person.week.goal.steps ?? 0), r = /* @__PURE__ */ F(() => ja(t.person.steps_week, K(n), Aa())), i = /* @__PURE__ */ F(() => t.person.pbs.lifts ?? []), a = /* @__PURE__ */ F(() => Ia(K(i))), o, s = /* @__PURE__ */ F(() => t.person.pbs.fastest_1k), c = /* @__PURE__ */ F(() => t.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var l = ns(), u = B(l), d = (e) => {
		var t = Xo(), n = z(t);
		Yo(n, {
			get bars() {
				return K(r).bars;
			},
			get goalFrac() {
				return K(r).goalFrac;
			}
		});
		var i = V(H(n, 2), !0);
		A(t), U((e) => X(i, e), [() => Ma(K(r).bars)]), Y(e, t);
	};
	Z(u, (e) => {
		K(r) && e(d);
	});
	var f = H(u, 2), p = z(f), m = (e) => {
		var t = Qo(), n = B(t);
		Q(n, 21, () => K(a), (e) => e.group, (e, t) => {
			var n = Zo(), r = z(n), i = z(r), a = V(i, !0), s = H(i), c = z(s), l = V(H(c), !0);
			A(s), A(r), A(n), U((e) => {
				X(a, K(t).group), X(c, `${K(t).lift.name ?? ""} · `), X(l, e);
			}, [() => Na(K(t).lift)]), q("click", r, () => o.open(K(t).group)), Y(e, n);
		}), A(n);
		var r = H(n, 2), s = V(r);
		U(() => X(s, `All records (${K(i).length ?? ""})`)), q("click", r, () => o.open()), Y(e, t);
	}, h = (e) => {
		Y(e, $o());
	};
	Z(p, (e) => {
		K(i).length ? e(m) : e(h, -1);
	}), A(f);
	var g = H(f, 2), _ = z(g), v = (e) => {
		var t = es(), n = V(H(z(t), 2));
		A(t), U((e, t) => X(n, `${e ?? ""} · ${t ?? ""}`), [() => Ra(K(s).seconds), () => pa(K(s).date)]), Y(e, t);
	}, y = (e) => {
		Y(e, ts());
	};
	Z(_, (e) => {
		K(s) ? e(v) : e(y, -1);
	});
	var b = H(_, 2), x = V(H(z(b)));
	A(b);
	var S = H(b, 2), C = V(H(z(S)));
	A(S), A(g);
	var w = H(g, 2);
	{
		let e = /* @__PURE__ */ F(() => La(K(i)));
		Ii(Go(w, { get groups() {
			return K(e);
		} }), (e) => o = e, () => o);
	}
	U((e) => {
		X(x, `${e ?? ""} km`), X(C, `${K(c) ?? ""} t`);
	}, [() => t.person.pbs.longest_session_km.toFixed(1)]), Y(e, l), N();
}
wr(["click"]);
// src/lib/ui/Shoes.svelte
var is = /* @__PURE__ */ J("<span class=\"label svelte-eu7fja\"> </span>"), as = /* @__PURE__ */ J("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), os = /* @__PURE__ */ J("<ul class=\"card svelte-eu7fja\"></ul>");
function ss(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => t.shoes.map(ga));
	var r = os();
	Q(r, 23, () => K(n), (e, n) => t.shoes[n].id ?? t.shoes[n].entity_id, (e, t) => {
		var n = as(), r = z(n), i = z(r), a = V(i, !0), o = V(H(i), !0);
		A(r);
		var s = H(r, 2), c = z(s);
		let l;
		A(s);
		var u = H(s, 2), d = z(u), f = V(d, !0), p = H(d, 2), m = (e) => {
			var n = is(), r = V(n, !0);
			U(() => X(r, K(t).label)), Y(e, n);
		};
		Z(p, (e) => {
			K(t).label && e(m);
		}), A(u), A(n), U(() => {
			li(n, 1, ri(K(t).state), "svelte-eu7fja"), X(a, K(t).name), X(o, K(t).km), l = di(c, "", l, { width: `${K(t).frac * 100}%` }), X(f, K(t).detail);
		}), Y(e, n);
	}), A(r), Y(e, r), N();
}
// src/lib/ui/ShoesDialog.svelte
var cs = /* @__PURE__ */ J("<span class=\"mini svelte-1bogt6u\">Current</span>"), ls = /* @__PURE__ */ J("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), us = /* @__PURE__ */ J("<button type=\"button\" class=\"btn\">Set current</button>"), ds = /* @__PURE__ */ J("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), fs = /* @__PURE__ */ J("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), ps = /* @__PURE__ */ J("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe. Set one.</p>"), ms = /* @__PURE__ */ J("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), hs = /* @__PURE__ */ J("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), gs = /* @__PURE__ */ J("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), _s = /* @__PURE__ */ J("<dialog class=\"svelte-1bogt6u\"><div class=\"grab svelte-1bogt6u\"><h2 class=\"svelte-1bogt6u\">Manage shoes</h2> <button type=\"button\" class=\"close press svelte-1bogt6u\" aria-label=\"Close\">✕</button></div> <div class=\"body svelte-1bogt6u\"><!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form></div></dialog>");
function vs(e, t) {
	let n = Fr();
	M(t, !0);
	let r = /* @__PURE__ */ F(() => t.shoes.map((e) => ({
		...ga(e),
		id: e.id,
		limit: e.limit,
		current: !!e.current
	}))), i, a = /* @__PURE__ */ L(""), o = /* @__PURE__ */ L(Qt(700)), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(!1), l = /* @__PURE__ */ L(null), u = !1;
	function d() {
		i.open || (u = document.documentElement.style.overflow !== "hidden", u && (document.documentElement.style.overflow = "hidden"), i.showModal());
	}
	function f() {
		u && (document.documentElement.style.overflow = ""), u = !1, R(l, null), R(s, null);
	}
	async function p(e) {
		R(c, !0);
		let t = await $a(e);
		return R(c, !1), t;
	}
	async function m(e) {
		e.preventDefault();
		let n = ya(K(a), K(o));
		R(s, n.error ?? null, !0), !K(s) && await p({
			op: "add",
			person: t.person,
			...n
		}) && R(a, "");
	}
	async function h(e, t) {
		let n = ya(void 0, e.currentTarget.value, { partial: !0 });
		R(s, n.error ?? null, !0), K(s) ? e.currentTarget.value = t.limit : n.replace_at_km !== t.limit && await p({
			op: "update",
			id: t.id,
			...n
		});
	}
	async function g(e) {
		R(l, null), await p({
			op: "retire",
			id: e.id
		});
	}
	var _ = { open: d }, v = _s(), y = z(v), b = z(y), x = H(b, 2);
	A(y);
	var S = H(y, 2), C = z(S), w = (e) => {
		var n = ms(), i = B(n);
		Q(i, 21, () => K(r), (e) => e.id, (e, n) => {
			var r = fs(), i = z(r), a = z(i), o = z(a, !0), s = H(o), u = (e) => {
				Y(e, cs());
			};
			Z(s, (e) => {
				K(n).current && e(u);
			}), A(a);
			var d = V(H(a, 2), !0);
			A(i);
			var f = H(i, 2), m = z(f), _ = H(z(m));
			Si(_), De(), A(m);
			var v = H(m, 2), y = (e) => {
				var t = ls(), r = B(t), i = V(r), a = H(r, 2), o = H(a, 2);
				U(() => {
					X(i, `Retire ${K(n).name ?? ""}?`), o.disabled = K(c);
				}), q("click", a, () => R(l, null)), q("click", o, () => g(K(n))), Y(e, t);
			}, b = (e) => {
				var r = ds(), i = B(r), a = (e) => {
					var r = us();
					U(() => r.disabled = K(c)), q("click", r, () => p({
						op: "current",
						person: t.person,
						id: K(n).id
					})), Y(e, r);
				};
				Z(i, (e) => {
					K(n).current || e(a);
				});
				var o = H(i, 2);
				U(() => o.disabled = K(c)), q("click", o, () => R(l, K(n).id, !0)), Y(e, r);
			};
			Z(v, (e) => {
				K(l) === K(n).id ? e(y) : e(b, -1);
			}), A(f), A(r), U(() => {
				X(o, K(n).name), X(d, K(n).km), $(_, "min", _a.replace_at_km[0]), $(_, "max", _a.replace_at_km[1]), $(_, "step", _a.replace_at_km[2]), Ci(_, K(n).limit), _.disabled = K(c);
			}), q("change", _, (e) => h(e, K(n))), Y(e, r);
		}), A(i);
		var a = H(i, 2), o = (e) => {
			Y(e, ps());
		}, s = /* @__PURE__ */ F(() => !K(r).some((e) => e.current));
		Z(a, (e) => {
			K(s) && e(o);
		}), Y(e, n);
	}, T = (e) => {
		Y(e, hs());
	};
	Z(C, (e) => {
		K(r).length ? e(w) : e(T, -1);
	});
	var ee = H(C, 2), te = H(z(ee), 2), E = H(z(te));
	Si(E), A(te);
	var ne = H(te, 2), re = H(z(ne));
	Si(re), A(ne);
	var ie = H(ne, 2), ae = (e) => {
		var t = gs(), n = V(t, !0);
		U(() => X(n, K(s))), Y(e, t);
	};
	Z(ie, (e) => {
		K(s) && e(ae);
	});
	var oe = H(ie, 2);
	return A(ee), A(S), A(v), Ii(v, (e) => i = e, () => i), U(() => {
		$(v, "aria-labelledby", `${n}-t`), $(b, "id", `${n}-t`), $(E, "maxlength", _a.name[1]), E.disabled = K(c), $(re, "min", _a.replace_at_km[0]), $(re, "max", _a.replace_at_km[1]), $(re, "step", _a.replace_at_km[2]), re.disabled = K(c), oe.disabled = K(c);
	}), q("click", v, (e) => e.target === i && i.close()), Cr("close", v, f), q("keydown", v, (e) => e.key === "Escape" && e.stopPropagation()), q("click", x, () => i.close()), Cr("submit", ee, m), Di(E, () => K(a), (e) => R(a, e)), Di(re, () => K(o), (e) => R(o, e)), Y(e, v), N(_);
}
wr([
	"click",
	"keydown",
	"change"
]);
// src/lib/ui/Details.svelte
var ys = /* @__PURE__ */ J("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), bs = /* @__PURE__ */ J("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), xs = /* @__PURE__ */ J("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), Ss = /* @__PURE__ */ J("<section><h2 class=\"svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), Cs = /* @__PURE__ */ J("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!>", 1);
function ws(e, t) {
	let n = Fr();
	M(t, !0);
	let r = /* @__PURE__ */ F(() => za(t.person.pbs)), i = /* @__PURE__ */ F(() => va(t.person, t.canEdit)), a = /* @__PURE__ */ L(void 0);
	var o = Cs(), s = B(o), c = (e) => {
		var r = ys(), i = z(r);
		Lo(H(i, 2), { get plan() {
			return t.person.plan;
		} }), A(r), U(() => {
			$(r, "aria-labelledby", `${n}-plan`), $(i, "id", `${n}-plan`);
		}), Y(e, r);
	};
	Z(s, (e) => {
		t.person.plan && e(c);
	});
	var l = H(s, 2), u = z(l), d = H(u, 2);
	{
		let e = /* @__PURE__ */ F(() => K(i) ? t.person.shoes : null);
		Mo(d, {
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
				return K(r);
			},
			get shoes() {
				return K(e);
			},
			get runShoes() {
				return t.person.run_shoes;
			}
		});
	}
	A(l);
	var f = H(l, 2), p = z(f), m = V(H(z(p)));
	A(p), oo(H(p, 2), { get badges() {
		return t.person.badges;
	} }), A(f);
	var h = H(f, 2), g = z(h);
	rs(H(g, 2), { get person() {
		return t.person;
	} }), A(h);
	var _ = H(h, 2), v = (e) => {
		var r = Ss(), o = B(r), s = z(o), c = H(z(s)), l = (e) => {
			var t = bs();
			q("click", t, () => K(a).open()), Y(e, t);
		};
		Z(c, (e) => {
			K(i) && e(l);
		}), A(s);
		var u = H(s, 2), d = (e) => {
			ss(e, { get shoes() {
				return t.person.shoes;
			} });
		}, f = (e) => {
			Y(e, xs());
		};
		Z(u, (e) => {
			t.person.shoes.length ? e(d) : e(f, -1);
		}), A(o);
		var p = H(o, 2), m = (e) => {
			Ii(vs(e, {
				get person() {
					return t.id;
				},
				get shoes() {
					return t.person.shoes;
				}
			}), (e) => R(a, e, !0), () => K(a));
		};
		Z(p, (e) => {
			K(i) && e(m);
		}), U(() => {
			$(o, "aria-labelledby", `${n}-shoes`), $(s, "id", `${n}-shoes`);
		}), Y(e, r);
	};
	Z(_, (e) => {
		(t.person.shoes?.length || K(i)) && e(v);
	}), U(() => {
		$(l, "aria-labelledby", `${n}-feed`), $(u, "id", `${n}-feed`), $(f, "aria-labelledby", `${n}-badges`), $(p, "id", `${n}-badges`), X(m, `${t.person.badges.count ?? ""} unlocked`), $(h, "aria-labelledby", `${n}-pbs`), $(g, "id", `${n}-pbs`);
	}), Y(e, o), N();
}
wr(["click"]);
// src/lib/ui/Goals.svelte
var Ts = /* @__PURE__ */ J("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), Es = /* @__PURE__ */ J("<p class=\"msg\" role=\"status\"> </p>"), Ds = /* @__PURE__ */ J("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!></section>"), Os = /* @__PURE__ */ J("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), ks = /* @__PURE__ */ J("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), As = /* @__PURE__ */ J("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), js = /* @__PURE__ */ J("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function Ms(e, t) {
	let n = Fr();
	M(t, !0);
	let i = [], a = (e, n = h, r = h, i = h) => {
		let a = /* @__PURE__ */ F(() => {
			let [e, t, n] = xa[r()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var o = Ts(), s = z(o), c = V(s, !0), l = H(s, 2), u = H(l, 2), d = V(u, !0), f = H(u, 2);
		A(o), U((e, s, u, p) => {
			$(o, "aria-label", i()), X(c, e), $(l, "aria-label", `Fewer ${s ?? ""}`), l.disabled = t.readOnly || n()[r()] <= K(a).lo, X(d, u), $(f, "aria-label", `More ${p ?? ""}`), f.disabled = t.readOnly || n()[r()] >= K(a).hi;
		}, [
			() => i().split(",")[0],
			() => p(i()),
			() => m(r(), n()[r()]),
			() => p(i())
		]), q("click", l, () => n()[r()] = wa(r(), n()[r()] - K(a).step)), q("click", f, () => n()[r()] = wa(r(), n()[r()] + K(a).step)), Y(e, o);
	}, o = /* @__PURE__ */ L(null), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L(!1);
	Ui(() => {
		r("settings").then((e) => {
			R(o, e, !0), R(c, Ta(e, t.people), !0);
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
		let e = await Xa(Je(K(c)), t.people);
		R(l, !1), e && t.onsaved();
	}
	var _ = js(), v = H(B(_), 2), y = (e) => {
		var t = Es(), n = V(t, !0);
		U(() => X(n, K(s) ? K(s).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), Y(e, t);
	}, b = (e) => {
		var r = As(), s = B(r), p = V(s), m = H(s, 2);
		Q(m, 16, () => Object.keys(K(c).people), (e) => e, (e, r) => {
			let i = /* @__PURE__ */ F(() => t.people[r]?.name ?? r);
			var o = Ds(), s = z(o), l = V(s, !0);
			Q(H(s, 2), 16, () => Sa, (e) => e, (e, t) => {
				a(e, () => K(c).people[r], () => t, () => `${u[t]}, ${K(i)}`);
			}), A(o), U(() => {
				$(o, "aria-labelledby", `${n}-${r ?? ""}`), $(s, "id", `${n}-${r ?? ""}`), X(l, K(i));
			}), Y(e, o);
		});
		var h = H(m, 2), _ = z(h), v = H(_, 2);
		Q(v, 21, () => d, (e) => e.mode, (e, r) => {
			var a = Os();
			let o;
			var s = z(a);
			Si(s);
			var l, u = H(s, 1, !0);
			A(a), U(() => {
				o = li(a, 1, "svelte-7wncvy", null, o, { on: K(c).couple.mode === K(r).mode }), $(s, "name", `${n}-mode`), s.disabled = t.readOnly, l !== (l = K(r).mode) && (s.value = (s.__value = l) ?? ""), X(u, K(r).label);
			}), ki(i, [], s, () => (K(r).mode, K(c).couple.mode), (e) => K(c).couple.mode = e), Y(e, a);
		}), A(v);
		var y = H(v, 2), b = V(y, !0), x = H(y, 2), S = (e) => {
			a(e, () => K(c).couple, () => K(c).couple.mode, () => f[K(c).couple.mode]);
		};
		Z(x, (e) => {
			f[K(c).couple.mode] && e(S);
		});
		var C = H(x, 2), w = H(z(C), 2);
		Si(w), A(C), A(h);
		var T = H(h, 2), ee = (e) => {
			var t = ks();
			U(() => t.disabled = K(l)), q("click", t, g), Y(e, t);
		};
		Z(T, (e) => {
			t.readOnly || e(ee);
		}), U((e, r) => {
			X(p, `Applies from this week (week ${e ?? ""})`), $(h, "aria-labelledby", `${n}-couple`), $(_, "id", `${n}-couple`), $(v, "aria-labelledby", `${n}-couple`), X(b, r), w.disabled = t.readOnly;
		}, [() => Ea(K(o).week_start), () => d.find((e) => e.mode === K(c).couple.mode).hint]), Di(w, () => K(c).couple.reward, (e) => K(c).couple.reward = e), Y(e, r);
	};
	Z(v, (e) => {
		K(c) ? e(b, -1) : e(y);
	}), Y(e, _), N();
}
wr(["click"]);
// src/lib/ui/Header.svelte
var Ns = /* @__PURE__ */ J("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), Ps = /* @__PURE__ */ J("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), Fs = /* @__PURE__ */ J("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function Is(e, t) {
	let n = Hi(t, "subtitle", 3, ""), r = Hi(t, "actionLabel", 3, ""), i = /* @__PURE__ */ L(0);
	var a = Fs();
	let o;
	var s = z(a), c = z(s), l = (e) => {
		var n = Ns();
		q("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), Y(e, n);
	};
	Z(c, (e) => {
		t.onback && e(l);
	});
	var u = H(c, 2), d = z(u), f = V(d, !0), p = H(d, 2), m = (e) => {
		var n = Ps(), i = V(n, !0);
		U(() => X(i, r())), q("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), Y(e, n);
	};
	Z(p, (e) => {
		t.onaction && e(m);
	}), A(u);
	var h = V(H(u, 2), !0);
	A(s), A(a), U(() => {
		o = li(a, 1, "svelte-16l0jix", null, o, { scrolled: K(i) > 0 }), X(f, t.title), X(h, n() || "\xA0");
	}), Li("y", () => K(i), (e) => R(i, e, !0)), Y(e, a);
}
wr(["click"]);
// src/lib/ui/Rings.svelte
var Ls = /* @__PURE__ */ Nr("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Rs = /* @__PURE__ */ Nr("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function zs(e, t) {
	M(t, !0);
	let n = Hi(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, a = /* @__PURE__ */ L(Qt(so.reducedMotion ? i : 0)), o = /* @__PURE__ */ F(() => n() * .11), s = /* @__PURE__ */ F(() => t.fractions.map((e, t) => {
		let s = n() / 2 - K(o) / 2 - t * K(o) * 1.3, c = 2 * Math.PI * s;
		return {
			kind: r[t],
			r: s,
			c,
			len: c * e * K(a) / i
		};
	}));
	Ui(() => {
		if (K(a) === i) return;
		let e = fo(ho({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => R(a, e, !0) });
		return e.to(i), e.stop;
	});
	var c = Rs();
	let l;
	Q(c, 21, () => K(s), (e) => e.kind, (e, t) => {
		var r = Ls(), i = B(r);
		let a;
		var s = H(i);
		let c;
		U(() => {
			$(i, "cx", n() / 2), $(i, "cy", n() / 2), $(i, "r", K(t).r), $(i, "stroke-width", K(o)), a = di(i, "", a, { stroke: `var(--${K(t).kind ?? ""})` }), $(s, "cx", n() / 2), $(s, "cy", n() / 2), $(s, "r", K(t).r), $(s, "stroke-width", K(o)), $(s, "stroke-dasharray", `${K(t).len ?? ""} ${K(t).c ?? ""}`), $(s, "opacity", +(K(t).len > .01)), $(s, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = di(s, "", c, { stroke: `var(--${K(t).kind ?? ""})` });
		}), Y(e, r);
	}), A(c), U(() => {
		$(c, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), l = di(c, "", l, { width: `${n() / 16}rem` });
	}), Y(e, c), N();
}
// src/lib/ui/PersonTile.svelte
var Bs = /* @__PURE__ */ J("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Vs = /* @__PURE__ */ J("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), Hs = /* @__PURE__ */ J("<span class=\"streak svelte-1handop\"> </span>"), Us = /* @__PURE__ */ J("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), Ws = /* @__PURE__ */ J("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Gs = /* @__PURE__ */ J("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), Ks = /* @__PURE__ */ J("<span class=\"steps svelte-1handop\"> </span>"), qs = /* @__PURE__ */ J("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), Js = /* @__PURE__ */ J("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), Ys = /* @__PURE__ */ J("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function Xs(e, t) {
	M(t, !0);
	let n = Hi(t, "index", 3, 0), r = Hi(t, "compact", 3, !1), i = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], a = /* @__PURE__ */ F(() => i[n() % i.length]), o = /* @__PURE__ */ F(() => y(K(a), 2)), s = /* @__PURE__ */ F(() => K(o)[0]), c = /* @__PURE__ */ F(() => K(o)[1]), l = /* @__PURE__ */ F(() => na(t.person)), u = /* @__PURE__ */ F(() => t.person.week), d = [
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
		n: Xi(K(u))[t],
		of: Yi(K(u))[t]
	}))), p = /* @__PURE__ */ F(() => $i(t.person.steps_today, K(u).goal.steps)), m = /* @__PURE__ */ F(() => [
		`Level ${K(l).level}`,
		r() ? `🔥 ${t.person.streak} wk` : `${t.person.xp.toLocaleString()} XP`,
		K(u).paused && "Week paused",
		K(u).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), h = /* @__PURE__ */ F(() => `${t.person.name}, level ${K(l).level}. This week ${K(f).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${K(u).goal_pending ? "New goals pending. " : ""}${K(u).bonus ? "Weekly bonus earned. " : ""}${K(p) ? K(p).replace("👟 ", "") + ". " : ""}Streak ${t.person.streak} weeks.`);
	var g = Ys();
	let _;
	var v = z(g), b = z(v), x = z(b);
	let S;
	var C = V(x, !0), w = H(x, 2), T = z(w), ee = V(T, !0), te = V(H(T, 2), !0);
	A(w);
	var E = H(w, 2), ne = (e) => {
		var t = Vs(), n = B(t), r = z(n);
		{
			let e = /* @__PURE__ */ F(() => Zi(K(u)));
			zs(r, {
				get fractions() {
					return K(e);
				},
				size: 44
			});
		}
		var i = H(r, 2), a = (e) => {
			Y(e, Bs());
		};
		Z(i, (e) => {
			K(u).bonus && e(a);
		}), A(n);
		var o = V(H(n, 2), !0);
		U(() => X(o, K(h))), Y(e, t);
	}, re = (e) => {
		var n = Hs(), r = V(n);
		U(() => X(r, `🔥 ${t.person.streak ?? ""} wk`)), Y(e, n);
	};
	Z(E, (e) => {
		r() ? e(ne) : e(re, -1);
	});
	var ie = H(E, 2), ae = (e) => {
		Y(e, Us());
	};
	Z(ie, (e) => {
		t.onopen && e(ae);
	}), A(b);
	var oe = H(b, 2), se = (e) => {
		var t = qs(), n = B(t), r = z(n), i = z(r);
		{
			let e = /* @__PURE__ */ F(() => Zi(K(u))), t = /* @__PURE__ */ F(() => so.wide ? 112 : 88);
			zs(i, {
				get fractions() {
					return K(e);
				},
				get size() {
					return K(t);
				}
			});
		}
		var a = H(i, 2), o = (e) => {
			Y(e, Ws());
		};
		Z(a, (e) => {
			K(u).bonus && e(o);
		}), A(r);
		var s = H(r, 2);
		Q(s, 21, () => K(f), (e) => e.kind, (e, t) => {
			var n = Gs(), r = z(n), i = z(r);
			let a;
			var o = H(i, 1, !0);
			A(r);
			var s = H(r, 2), c = z(s, !0), l = V(H(c));
			A(s), A(n), U(() => {
				a = di(i, "", a, { background: `var(--${K(t).kind ?? ""})` }), X(o, K(t).label), X(c, K(t).n), X(l, `/${K(t).of ?? ""}`);
			}), Y(e, n);
		}), A(s), A(n);
		var c = H(n, 2), d = (e) => {
			var t = Ks(), n = V(t, !0);
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
			_ = di(g, "", _, { width: `${K(l).frac * 100}%` }), X(v, `${e ?? ""} of ${t ?? ""} XP to level ${K(l).level + 1}`);
		}, [() => K(l).into.toLocaleString(), () => K(l).span.toLocaleString()]), Y(e, t);
	};
	Z(oe, (e) => {
		r() || e(se);
	}), A(v);
	var ce = H(v, 2), le = (e) => {
		var n = Js();
		U(() => $(n, "aria-label", K(h))), q("click", n, function(...e) {
			t.onopen?.apply(this, e);
		}), Y(e, n);
	};
	Z(ce, (e) => {
		t.onopen && e(le);
	}), A(g), U((e) => {
		_ = li(g, 1, "tile glass svelte-1handop", null, _, {
			compact: r(),
			opens: t.onopen
		}), $(v, "aria-hidden", t.onopen ? "true" : void 0), S = di(x, "", S, {
			"--a1": K(s),
			"--a2": K(c)
		}), X(C, e), X(ee, t.person.name), X(te, K(m));
	}, [() => t.person.name.slice(0, 1)]), Y(e, g), N();
}
wr(["click"]);
// src/lib/ui/Sheet.svelte
var Zs = /* @__PURE__ */ J("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), Qs = /* @__PURE__ */ J("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function $s(e, t) {
	M(t, !0);
	let n = Hi(t, "from", 3, null), r = 1e3, i = so.reducedMotion, a = /* @__PURE__ */ L(Qt(i ? r : 0)), o = /* @__PURE__ */ L(0), s = /* @__PURE__ */ L(1), c = /* @__PURE__ */ L(!1), l = /* @__PURE__ */ L("50% 100%"), u, d, f = !1, p = null, m = /* @__PURE__ */ F(() => i ? +K(c) : Math.min(1, K(a) / 500)), h = /* @__PURE__ */ F(() => i ? 1 : .5 + .5 * K(a) / r), g = () => {
		f && (K(a) === 0 || K(o) >= K(s)) && (f = !1, t.onclose());
	};
	function _(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = ho({
					value: r,
					damping: o,
					response: s
				}), n = fo(t, {
					onFrame: e,
					onSettle: g
				}), n.to(i, a);
			}
		};
	}
	let v = _((e) => R(a, e, !0)), y = _((e) => R(o, e, !0));
	function b() {
		f || p || (f = !0, i ? (R(c, !1), setTimeout(t.onclose, mo("--fade"))) : v.to(K(a), 0, { response: .3 }));
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
		R(o, t < 0 ? -Vo(-t, K(s)) : t, !0), p.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), p.samples.length > 8 && p.samples.shift();
	}
	function C(e) {
		if (!p) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = Bo([...p.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		p = null, zo(K(o), n, K(s)) ? i ? b() : (f = !0, y.to(K(o), K(s), {
			velocity: n,
			response: .3
		})) : i ? R(o, 0) : (y.to(K(o), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), K(a) < r && v.to(K(a), r));
	}
	Ui(() => {
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
	var w = { close: b }, T = Qs();
	Cr("keydown", tn, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && b());
	var ee = B(T);
	let te, E;
	var ne = H(ee, 2);
	let re, ie;
	var ae = z(ne), oe = H(z(ae), 2), se = z(oe), ce = (e) => {
		var n = Zs();
		q("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), Y(e, n);
	};
	Z(se, (e) => {
		t.onback && e(ce);
	});
	var le = H(se, 2);
	Ii(le, (e) => d = e, () => d), A(oe), A(ae);
	var ue = H(ae, 2);
	return ei(z(ue), () => t.children), A(ue), A(ne), Ii(ne, (e) => u = e, () => u), U((e) => {
		te = li(ee, 1, "scrim svelte-185xwm9", null, te, { fade: i }), E = di(ee, "", E, { opacity: e }), re = li(ne, 1, "sheet svelte-185xwm9", null, re, { fade: i }), $(ne, "aria-label", t.label), ie = di(ne, "", ie, {
			opacity: K(m),
			transform: `translate3d(0, ${K(o) ?? ""}px, 0) scale(${K(h) ?? ""})`,
			"transform-origin": K(l)
		});
	}, [() => K(m) * Math.min(1, Math.max(0, 1 - K(o) / K(s)))]), q("click", ee, b), q("pointerdown", ae, x), q("pointermove", ae, S), q("pointerup", ae, C), Cr("pointercancel", ae, C), q("click", le, b), Pi(ne, "offsetHeight", (e) => R(s, e)), Y(e, T), N(w);
}
wr([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var ec = /* @__PURE__ */ J("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), tc = /* @__PURE__ */ J("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), nc = /* @__PURE__ */ J("<p class=\"caption stale svelte-9nj5u4\"> </p>"), rc = /* @__PURE__ */ J("<!> <!> <!>", 1);
function ic(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => t.scoredAt ? ia(t.scoredAt, t.now) : null);
	var r = rc(), i = B(r), a = (e) => {
		var n = ec(), r = H(z(n));
		A(n), U(() => X(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), Y(e, n);
	};
	Z(i, (e) => {
		t.configError && e(a);
	});
	var o = H(i, 2), s = (e) => {
		var n = tc(), r = H(z(n));
		A(n), U(() => X(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), Y(e, n);
	};
	Z(o, (e) => {
		t.settingsError && e(s);
	});
	var c = H(o, 2), l = (e) => {
		var t = nc(), r = V(t, !0);
		U(() => X(r, K(n))), Y(e, t);
	};
	Z(c, (e) => {
		K(n) && e(l);
	}), Y(e, r), N();
}
// node_modules/svelte/src/internal/flags/legacy.js
Ke();
// src/lib/ui/Toast.svelte
var ac = /* @__PURE__ */ J("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), oc = /* @__PURE__ */ J("<span> </span> <!>", 1), sc = /* @__PURE__ */ J("<div role=\"status\" aria-live=\"polite\"><!></div>");
function cc(e, t) {
	M(t, !1);
	function n() {
		let e = Ha.undo;
		Object.assign(Ha, {
			on: !1,
			undo: null
		}), e();
	}
	Ri();
	var r = sc();
	let i;
	var a = z(r), o = (e) => {
		var t = oc(), r = B(t), i = V(r, !0), a = H(r, 2), o = (e) => {
			var t = ac();
			q("click", t, n), Y(e, t);
		};
		Z(a, (e) => {
			Ha.undo && e(o);
		}), U(() => X(i, Ha.text)), Y(e, t);
	};
	Z(a, (e) => {
		Ha.on && e(o);
	}), A(r), U(() => i = li(r, 1, "toast svelte-1fk2ial", null, i, { on: Ha.on })), Y(e, r), N();
}
wr(["click"]);
// src/lib/ui/Together.svelte
var lc = /* @__PURE__ */ J("<p class=\"progress svelte-1tya3no\"> </p>"), uc = /* @__PURE__ */ J("<p> </p>"), dc = /* @__PURE__ */ J("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), fc = /* @__PURE__ */ J("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function pc(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ F(() => t.group.week ? ea(t.group.week, t.people) : ""), r = /* @__PURE__ */ F(() => t.group.week ? ta(t.group.week) : null), i = /* @__PURE__ */ F(() => [
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
	var a = fc(), o = H(z(a), 2), s = (e) => {
		var t = lc(), r = V(t, !0);
		U(() => X(r, K(n))), Y(e, t);
	};
	Z(o, (e) => {
		K(n) && e(s);
	});
	var c = H(o, 2), l = (e) => {
		var n = uc();
		let i;
		var a = V(n, !0);
		U(() => {
			i = li(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), X(a, K(r));
		}), Y(e, n);
	};
	Z(c, (e) => {
		K(r) && e(l);
	});
	var u = H(c, 2);
	Q(u, 21, () => K(i), (e) => e.k, (e, t) => {
		var n = dc(), r = z(n), i = V(r, !0), a = H(r), o = z(a, !0), s = V(H(o), !0);
		A(a), A(n), U(() => {
			X(i, K(t).k), X(o, K(t).v), X(s, K(t).unit);
		}), Y(e, n);
	}), A(u), A(a), Y(e, a), N();
}
// src/App.svelte
var mc = /* @__PURE__ */ J("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), hc = /* @__PURE__ */ J("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), gc = /* @__PURE__ */ J("<div class=\"tiles compact svelte-1n46o8q\"></div>"), _c = /* @__PURE__ */ J("<!> <!>", 1), vc = /* @__PURE__ */ J("<div class=\"tiles svelte-1n46o8q\"></div>"), yc = /* @__PURE__ */ J("<!> <!> <!> <!>", 1), bc = /* @__PURE__ */ J("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function xc(e, t) {
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
		R(c, R(u, null), !0), await dr(), e?.focus({ preventScroll: !0 });
	}
	let p = /* @__PURE__ */ L(null), m = /* @__PURE__ */ L(null), h = /* @__PURE__ */ L(Qt(/* @__PURE__ */ new Date())), g;
	async function _() {
		if (clearTimeout(g), !document.hidden) {
			try {
				R(p, await r("scores"), !0), R(m, null), Ya(K(p).people), a && Object.hasOwn(K(p).people, a) && a !== fa(K(p).viewer, K(p).people).self && R(c, {
					id: a,
					from: null
				}, !0), a = null;
			} catch (e) {
				R(m, e, !0);
			}
			R(h, /* @__PURE__ */ new Date(), !0), clearTimeout(g), g = setTimeout(_, K(p) ? 6e4 : 3e4);
		}
	}
	xn(() => {
		_();
		let e = () => document.hidden || _();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(g), document.removeEventListener("visibilitychange", e);
		};
	}), xn(() => {
		Wa.n && _();
	});
	let v = /* @__PURE__ */ F(() => ka(K(p)?.people ?? {}, Ua.entry)), y = /* @__PURE__ */ F(() => Object.keys(K(v))), b = /* @__PURE__ */ F(() => fa(K(p)?.viewer ?? {}, K(v))), x = /* @__PURE__ */ F(() => K(v)[K(b).self ?? K(y)[0]]?.week), S = (e) => !!K(p)?.viewer?.can_edit?.includes(e), C = /* @__PURE__ */ F(() => !!K(c) && Object.hasOwn(K(v), K(c).id) || !!K(u) && !!K(p));
	var w = bc(), T = B(w), ee = z(T);
	{
		let e = /* @__PURE__ */ F(() => K(x) ? ra(K(x)) : ""), t = /* @__PURE__ */ F(() => K(p) ? (e) => R(u, { from: e.currentTarget }, !0) : void 0);
		Is(ee, {
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
	var te = H(ee, 2), E = z(te), ne = (e) => {
		var t = hc(), n = H(B(t), 2), r = (e) => {
			var t = mc(), n = V(t, !0);
			U(() => X(n, K(m).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), Y(e, t);
		};
		Z(n, (e) => {
			K(m) && e(r);
		}), Y(e, t);
	}, re = (e) => {
		var t = yc(), n = B(t);
		ic(n, {
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
			var t = _c(), n = B(t), r = (e) => {
				var t = gc();
				Q(t, 20, () => K(b).others, (e) => e, (e, t) => {
					{
						let n = /* @__PURE__ */ F(() => K(y).indexOf(t)), r = /* @__PURE__ */ F(() => l(t));
						Xs(e, {
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
				Xs(i, {
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
			var t = vc();
			Q(t, 20, () => K(b).others, (e) => e, (e, t) => {
				{
					let n = /* @__PURE__ */ F(() => K(y).indexOf(t)), r = /* @__PURE__ */ F(() => l(t));
					Xs(e, {
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
			pc(e, {
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
				ws(e, {
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
	Z(E, (e) => {
		K(p) ? e(re, -1) : e(ne);
	}), A(te), A(T);
	var ie = H(T, 2), ae = (e) => {
		Ii($s(e, {
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
					Ms(e, {
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
		$s(e, {
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
				var n = _c(), r = B(n);
				{
					let e = /* @__PURE__ */ F(() => K(y).indexOf(K(c).id));
					Xs(r, {
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
					ws(i, {
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
	}), cc(H(ie, 2), {}), U(() => T.inert = K(C)), Y(e, w), N();
}
// src/main.js
var Sc = (e) => Br(xc, { target: e }), Cc = () => new Promise((e) => {
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
		document.documentElement.dataset.theme = n ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Cc().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", Sc(e);
		}));
	}
});
