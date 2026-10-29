// src/lib/api.js
var e, t = (t) => e = t, n = (t, n) => e ? e.fetchWithAuth(t, n) : fetch(t, n);
async function r(t, n, r) {
	if (!e && t !== "GET") return console.info("demo:", t, n, r), { ok: !0 };
	let i = {
		method: t,
		headers: r === void 0 ? {} : { "Content-Type": "application/json" },
		body: r === void 0 ? void 0 : JSON.stringify(r)
	}, a = await (e ? e.fetchWithAuth("/api/fitbridge/ui/" + n, i) : fetch(`./demo-${n.split("?")[0]}.json`, i));
	if (!a.ok) {
		let e = await a.json().then((e) => e?.detail, () => void 0);
		throw Object.assign(Error(String(a.status)), {
			status: a.status,
			detail: e
		});
	}
	return a.json();
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
var x = 1024, S = 2048, C = 4096, ee = 8192, te = 16384, ne = 32768, re = 1 << 25, ie = 65536, ae = 1 << 19, oe = 1 << 20, se = 1 << 25, ce = 1 << 21, le = 1 << 22, ue = 1 << 23, w = Symbol("$state"), de = Symbol("component"), fe = Symbol("legacy props"), pe = Symbol(""), me = Symbol("attributes"), he = Symbol("class"), ge = Symbol("style"), _e = Symbol("text"), ve = Symbol("form reset"), ye = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), be = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), xe = {}, T = Symbol("uninitialized"), Se = "http://www.w3.org/1999/xhtml";
function Ce() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function we(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Te() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ee() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var E = !1;
function De(e) {
	E = e;
}
var D;
function O(e) {
	if (e === null) throw we(), xe;
	return D = e;
}
function Oe() {
	return O(/* @__PURE__ */ ln(D));
}
function ke(e) {
	if (E) {
		if (/* @__PURE__ */ ln(D) !== null) throw we(), xe;
		D = e;
	}
}
function Ae(e = 1) {
	if (E) {
		for (var t = e, n = D; t--;) n = /* @__PURE__ */ ln(n);
		D = n;
	}
}
function je(e = !0) {
	for (var t = 0, n = D;;) {
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
function Me(e) {
	if (!e || e.nodeType !== 8) throw we(), xe;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Ne(e) {
	return e === this.v;
}
function Pe(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Fe(e) {
	return !Pe(e, this.v);
}
function Ie(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// node_modules/svelte/src/internal/client/errors.js
function Le() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Re(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function ze(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Be() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Ve(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function He() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ue(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function We() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ge() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ke() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function qe() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/flags/index.js
var Je = !1;
function Ye() {
	Je = !0;
}
// node_modules/svelte/src/internal/shared/clone.js
var Xe = [];
function Ze(e, t = !1, n = !1) {
	return Qe(e, /* @__PURE__ */ new Map(), "", Xe, null, n);
}
function Qe(e, t, n, r, i = null, o = !1) {
	if (typeof e == "object" && e) {
		var s = t.get(e);
		if (s !== void 0) return s;
		if (e instanceof Map) return new Map(e);
		if (e instanceof Set) return new Set(e);
		if (a(e)) {
			var c = Array(e.length);
			t.set(e, c), i !== null && t.set(i, c);
			for (var l = 0; l < e.length; l += 1) {
				var u = e[l];
				l in e && (c[l] = Qe(u, t, n, r, null, o));
			}
			return c;
		}
		if (m(e) === f) {
			c = {}, t.set(e, c), i !== null && t.set(i, c);
			for (var d of Object.keys(e)) c[d] = Qe(e[d], t, n, r, null, o);
			return c;
		}
		if (e instanceof Date) return e.getTime(), structuredClone(e);
		if (typeof e.toJSON == "function" && !o) return Qe(e.toJSON(), t, n, r, e);
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
function $e(e) {
	k = e;
}
function et(e, t = !1, n) {
	k = {
		p: k,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: q,
		l: Je && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function tt(e) {
	var t = k, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) wn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, k = t.p, nt(e);
}
function nt(e = {}) {
	return l(e, de, { value: !0 }), e;
}
function rt() {
	return !Je || k !== null && k.l === null;
}
// node_modules/svelte/src/internal/client/dom/task.js
var it = [];
function at() {
	var e = it;
	it = [], v(e);
}
function A(e) {
	if (it.length === 0 && !jt) {
		var t = it;
		queueMicrotask(() => {
			t === it && at();
		});
	}
	it.push(e);
}
function ot() {
	for (; it.length > 0;) at();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var st = ~(S | C | x);
function j(e, t) {
	e.f = e.f & st | t;
}
function ct(e) {
	e.f & 512 || e.deps === null ? j(e, x) : j(e, C);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function lt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), j(e, x);
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
var ut = !1;
function dt() {
	ut || (ut = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ve]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ft(e) {
	var t = W, n = q;
	K(null), J(null);
	try {
		return e();
	} finally {
		K(t), J(n);
	}
}
function pt(e, t, n, r = n) {
	e.addEventListener(t, () => ft(n));
	let i = e[ve];
	e[ve] = i ? () => {
		i(), r(!0);
	} : () => r(!0), dt();
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function mt(e, t, n, r) {
	let i = rt() ? vt : St;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = q, c = ht(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				B(e, s);
			}
			gt();
		}
	}
	var d = _t();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ bt(e))).then(u).catch((e) => B(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), gt());
	}) : f();
}
function ht() {
	var e = q, t = W, n = k, r = M;
	return function(i = !0) {
		J(e), K(t), $e(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function gt(e = !0) {
	J(null), K(null), $e(null), e && M?.deactivate();
}
function _t() {
	var e = q, t = e.b, n = M, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	var t = 2 | S;
	return q !== null && (q.f |= ae), {
		ctx: k,
		deps: null,
		effects: null,
		equals: Ne,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: T,
		wv: 0,
		parent: q,
		ac: null
	};
}
var yt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function bt(e, t, n) {
	let r = q;
	r === null && Le();
	var i = void 0, a = Kt(T), o = !W, s = /* @__PURE__ */ new Set();
	return On(() => {
		var t = q, n = y();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ye && n.reject(e);
			}).finally(gt);
		} catch (e) {
			n.reject(e), gt();
		}
		var c = M;
		if (o) {
			if (t.f & 32768) var l = _t();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(yt);
			else for (let e of s.values()) e.reject(yt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== yt && (c.activate(), t ? (a.f |= ue, Xt(a, t)) : (a.f & 8388608 && (a.f ^= ue), Xt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Sn(() => {
		for (let e of s) e.reject(yt);
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
function xt(e) {
	let t = /* @__PURE__ */ vt(e);
	return Gn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function St(e) {
	let t = /* @__PURE__ */ vt(e);
	return t.equals = Fe, t;
}
function Ct(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) U(t[n]);
	}
}
function wt(e) {
	var t, n = q, r = e.parent;
	if (!Un && r !== null && e.v !== T && r.f & 24576) return Ce(), e.v;
	J(r);
	try {
		Ct(e), t = er(e);
	} finally {
		J(n);
	}
	return t;
}
function Tt(e) {
	var t = wt(e);
	!e.equals(t) && (e.wv = Zn(), (!M?.is_fork || e.deps === null) && (M === null ? e.v = t : (M.capture(e, t, !0), kt?.capture(e, t, !0)), e.deps === null)) ? j(e, x) : Un || (N === null ? ct(e) : (xn() || M?.is_fork) && N.set(e, t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ft(() => {
		t.ac.abort(ye), t.ac = null;
	}), t.fn !== null && (t.teardown = g), rr(t, 0), Nn(t));
}
function Dt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ir(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var Ot = null, M = null, kt = null, N = null, At = null, jt = !1, Mt = !1, Nt = null, Pt = null, Ft = 0, It = 1, Lt = class e {
	id = It++;
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
		Ot === null ? Ot = this : (Ot.#n = this, this.#t = Ot), Ot = this;
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
			for (var r of n.d) j(r, S), t(r);
			for (r of n.m) j(r, C), t(r);
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
		for (let e of this.#u) this.#d.delete(e), j(e, S), this.schedule(e);
		for (let e of this.#d) j(e, C), this.schedule(e);
		this.apply();
		for (var t = Nt = [], n = [], r = Pt = []; this.#c.length > 0;) {
			Ft++ > 1e3 && (this.#S(), zt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Ut(e), this.#h() || this.discard(), t;
			}
		}
		if (M = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Nt = null, Pt = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Ht(e, t);
			r.length > 0 && M.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), kt = this, Bt(n), Bt(t), kt = null, this.#s?.resolve();
			var o = M;
			if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
				if (o !== null) {
					for (let e of this.#c) o.#c.push(e);
					this.#c = [];
				} else o = this;
			}
			o !== null && (F.clear(), o.#_());
		}
	}
	#v(e, t, n) {
		e.f ^= x;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= x : i & 4 ? t.push(r) : Qn(r) && (i & 16 && this.#d.add(r), ir(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), j(i, S), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), M = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) lt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== T && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), N?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		M = this;
	}
	deactivate() {
		M = null, N = null;
	}
	flush() {
		try {
			Mt = !0, M = this, this.#_();
		} finally {
			Ft = 0, At = null, Nt = null, Pt = null, Mt = !1, M = null, N = null, F.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(yt);
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
		this.#m || (this.#m = !0, A(() => {
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
		if (M === null) {
			let t = M = new e();
			!Mt && !jt && A(() => {
				t.#e || t.flush();
			});
		}
		return M;
	}
	apply() {
		N = null;
	}
	schedule(e) {
		At = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Ot = e : t.#t = e, this.linked = !1;
		}
	}
};
function Rt(e) {
	var t = jt, n = kt;
	kt = null, jt = !0;
	try {
		var r;
		for (e && (Rt(), r = e());;) {
			if (ot(), M === null) return r;
			M.flush();
		}
	} finally {
		jt = t, kt = n;
	}
}
function zt() {
	try {
		He();
	} catch (e) {
		B(e, At);
	}
}
var P = null;
function Bt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Qn(r) && (P = /* @__PURE__ */ new Set(), ir(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && In(r), P?.size > 0)) {
				F.clear();
				for (let e of P) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) P.has(n) && (P.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ir(n);
					}
				}
				P.clear();
			}
		}
		P = null;
	}
}
function Vt(e) {
	M.schedule(e);
}
function Ht(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), j(e, x);
		for (var n = e.first; n !== null;) Ht(n, t), n = n.next;
	}
}
function Ut(e) {
	j(e, x);
	for (var t = e.first; t !== null;) Ut(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Wt = /* @__PURE__ */ new Set(), F = /* @__PURE__ */ new Map(), Gt = !1;
function Kt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Ne,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function I(e, t) {
	let n = Kt(e, t);
	return Gn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function qt(e, t = !1, n = !0) {
	let r = Kt(e);
	return t || (r.equals = Fe), Je && n && k !== null && k.l !== null && (k.l.s ??= []).push(r), r;
}
function L(e, t, n = !1) {
	return W !== null && (!G || W.f & 131072) && rt() && W.f & 4325394 && (Y === null || !Y.has(e)) && Ke(), Xt(e, n ? en(t) : t, Pt);
}
var Jt = null, Yt = 0;
function Xt(e, t, n = null) {
	if (!e.equals(t)) {
		Un ? F.set(e, t) : F.has(e) || F.set(e, e.v);
		var r = Lt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && wt(t), N === null && ct(t);
		}
		e.wv = Zn(), Jt = null, Yt = 0, $t(e, S, n), Jt = null, rt() && q !== null && q.f & 1024 && !(q.f & 96) && (Q === null ? Kn([e]) : Q.push(e)), !r.is_fork && Wt.size > 0 && !Gt && Zt();
	}
	return t;
}
function Zt() {
	Gt = !1;
	for (let e of Wt) {
		e.f & 1024 && j(e, C);
		let t;
		try {
			t = Qn(e);
		} catch {
			t = !0;
		}
		t && ir(e);
	}
	Wt.clear();
}
function Qt(e) {
	L(e, e.v + 1);
}
function $t(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = rt(), a = r.length;
		if (Yt += a, Yt > 1e5 && Jt === null && (Jt = /* @__PURE__ */ new Set()), Jt !== null) {
			if (Jt.has(e)) return;
			Jt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== q) {
				var l = (c & S) === 0;
				if (l && j(s, t), c & 131072) Wt.add(s);
				else if (c & 2) {
					var u = s;
					N?.delete(u), $t(u, C, n);
				} else if (l) {
					var d = s;
					c & 16 && P !== null && P.add(d), n === null ? Vt(d) : n.push(d);
				}
			}
		}
	}
}
function en(e) {
	if (typeof e != "object" || !e || w in e || de in e) return e;
	let t = m(e);
	if (t !== f && t !== p) return e;
	var n = /* @__PURE__ */ new Map(), r = a(e), i = /* @__PURE__ */ I(0), o = null, s = Yn, c = (e) => {
		if (Yn === s) return e();
		var t = W, n = Yn;
		K(null), Xn(s);
		var r = e();
		return K(t), Xn(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ I(e.length, o)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || We();
			var i = n.get(t);
			return i === void 0 ? c(() => {
				var e = /* @__PURE__ */ I(r.value, o);
				return n.set(t, e), e;
			}) : L(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = c(() => /* @__PURE__ */ I(T, o));
					n.set(t, e), Qt(i);
				}
			} else L(r, T), Qt(i);
			return !0;
		},
		get(t, r, i) {
			if (r === w) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || u(t, r)?.writable) && (a = c(() => /* @__PURE__ */ I(en(s ? t[r] : T), o)), n.set(r, a)), a !== void 0) {
				var l = $(a);
				return l === T ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = $(i);
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
			if (t === w) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== T || Reflect.has(e, t);
			return (r !== void 0 || q !== null && (!i || u(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ I(i ? en(e[t]) : T, o)), n.set(t, r)), $(r) === T) ? !1 : i;
		},
		set(e, t, a, s) {
			var l = n.get(t), d = t in e;
			if (r && t === "length") for (var f = a; f < l.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ I(T, o)), n.set(f + "", p)) : L(p, T);
			}
			if (l === void 0) (!d || u(e, t)?.writable) && (l = c(() => /* @__PURE__ */ I(void 0, o)), L(l, en(a)), n.set(t, l));
			else {
				d = l.v !== T;
				var m = c(() => en(a));
				L(l, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, a), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && L(g, _ + 1);
				}
				Qt(i);
			}
			return !0;
		},
		ownKeys(e) {
			$(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== T;
			});
			for (var [r, a] of n) a.v !== T && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Ge();
		}
	});
}
function tn(e) {
	try {
		if (typeof e == "object" && e && w in e) return e[w];
	} catch {}
	return e;
}
function nn(e, t) {
	return Object.is(tn(e), tn(t));
}
var rn, an, on, sn;
function cn() {
	if (rn === void 0) {
		rn = window, an = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		on = u(t, "firstChild").get, sn = u(t, "nextSibling").get, h(e) && (e[he] = void 0, e[me] = null, e[ge] = void 0, e.__e = void 0), h(n) && (n[_e] = void 0);
	}
}
function R(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function z(e) {
	return on.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function ln(e) {
	return sn.call(e);
}
function un(e, t) {
	if (!E) return /* @__PURE__ */ z(e);
	var n = /* @__PURE__ */ z(D);
	if (n === null) n = D.appendChild(R());
	else if (t && n.nodeType !== 3) {
		var r = R();
		return n?.before(r), O(r), r;
	}
	return t && _n(n), O(n), n;
}
function dn(e, t = !1) {
	if (!E) {
		var n = /* @__PURE__ */ z(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ln(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = R();
			return D?.before(r), O(r), r;
		}
		_n(D);
	}
	return D;
}
function fn(e, t = !1) {
	if (!E) return /* @__PURE__ */ z(e);
	var n = un(e, t);
	return ke(e), n;
}
function pn(e, t = 1, n = !1) {
	let r = E ? D : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ ln(r);
	if (!E) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = R();
			return r === null ? i?.after(a) : r.before(a), O(a), a;
		}
		_n(r);
	}
	return O(r), r;
}
function mn(e) {
	e.textContent = "";
}
function hn() {
	return !1;
}
function gn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function _n(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function vn(e) {
	var t = q;
	if (t === null) return W.f |= ue, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	B(e, t);
}
function B(e, t) {
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
function yn(e) {
	q === null && (W === null && Ve(e), Be()), Un && ze(e);
}
function bn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function V(e, t) {
	var n = q;
	n !== null && n.f & 8192 && (e |= ee);
	var r = {
		ctx: k,
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
	M?.register_created_effect(r);
	var i = r;
	if (e & 4) Nt === null ? Lt.ensure().schedule(r) : Nt.push(r);
	else if (t !== null) {
		try {
			ir(r);
		} catch (e) {
			throw U(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ie));
	}
	if (i !== null && (i.parent = n, n !== null && bn(i, n), W !== null && W.f & 2 && !(e & 64))) {
		var a = W;
		(a.effects ??= []).push(i);
	}
	return r;
}
function xn() {
	return W !== null && !G;
}
function Sn(e) {
	let t = V(8, null);
	return j(t, x), t.teardown = e, t;
}
function Cn(e) {
	yn("$effect");
	var t = q.f;
	if (!W && t & 32 && k !== null && !k.i) {
		var n = k;
		(n.e ??= []).push(e);
	} else return wn(e);
}
function wn(e) {
	return V(4 | oe, e);
}
function Tn(e) {
	return yn("$effect.pre"), V(8 | oe, e);
}
function En(e) {
	Lt.ensure();
	let t = V(64 | ae, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Ln(t, () => {
			U(t), n(void 0);
		}) : (U(t), n(void 0));
	});
}
function Dn(e) {
	return V(4, e);
}
function On(e) {
	return V(le | ae, e);
}
function kn(e, t = 0) {
	return V(8 | t, e);
}
function An(e, t = [], n = [], r = []) {
	mt(r, t, n, (t) => {
		V(8, () => {
			e(...t.map($));
		});
	});
}
function jn(e, t = 0) {
	return V(16 | t, e);
}
function H(e) {
	return V(32 | ae, e);
}
function Mn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Un, r = W;
		Wn(!0), K(null);
		try {
			t.call(null);
		} catch (t) {
			B(t, e.parent);
		} finally {
			Wn(n), K(r);
		}
	}
}
function Nn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ft(() => {
			e.abort(ye);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : U(n, t), n = r;
	}
}
function Pn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || U(t), t = n;
	}
}
function U(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Fn(e.nodes.start, e.nodes.end), n = !0), e.f |= re, Nn(e, t && !n), rr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Mn(e), e.f ^= re, e.f |= te;
	var i = e.parent;
	i !== null && i.first !== null && In(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Fn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ ln(e);
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
		n && U(e), t && t();
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
		e.f ^= ee, e.f & 1024 || (j(e, S), Lt.ensure().schedule(e));
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
		var i = n === r ? null : /* @__PURE__ */ ln(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Hn = null, Un = !1;
function Wn(e) {
	Un = e;
}
var W = null, G = !1;
function K(e) {
	W = e;
}
var q = null;
function J(e) {
	q = e;
}
var Y = null;
function Gn(e) {
	W !== null && (W.f & 2097152 || W.f & 2) && (Y ??= /* @__PURE__ */ new Set()).add(e);
}
var X = null, Z = 0, Q = null;
function Kn(e) {
	Q = e;
}
var qn = 1, Jn = 0, Yn = Jn;
function Xn(e) {
	Yn = e;
}
function Zn() {
	return ++qn;
}
function Qn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Qn(a) && Tt(a), a.wv > e.wv) return !0;
		}
		t & 512 && N === null && j(e, x);
	}
	return !1;
}
function $n(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Y !== null && Y.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? $n(a, t, !1) : t === a && (n ? j(a, S) : a.f & 1024 && j(a, C), Vt(a));
	}
}
function er(e) {
	var t = X, n = Z, r = Q, i = W, a = Y, o = k, s = G, c = Yn, l = e.f;
	X = null, Z = 0, Q = null, W = l & 96 ? null : e, Y = null, $e(e.ctx), G = !1, Yn = ++Jn, e.ac !== null && (ft(() => {
		e.ac.abort(ye);
	}), e.ac = null);
	try {
		e.f |= ce;
		var u = e.fn, d = u();
		e.f |= ne;
		var f = tr(e);
		if (rt() && Q !== null && !G && f !== null && !(e.f & 6146)) for (var p = 0; p < Q.length; p++) $n(Q[p], e);
		if (i !== null && i !== e) {
			if (Jn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Jn;
			if (t !== null) for (let e of t) e.rv = Jn;
			Q !== null && (r === null ? r = Q : r.push(...Q));
		}
		return e.f & 8388608 && (e.f ^= ue), d;
	} catch (t) {
		return tr(e), vn(t);
	} finally {
		e.f ^= ce, X = t, Z = n, Q = r, W = i, Y = a, $e(o), G = s, Yn = c;
	}
}
function tr(e) {
	var t = e.deps, n = M?.is_fork;
	if (X !== null) {
		var r;
		if (n || rr(e, Z), t !== null && Z > 0) for (t.length = Z + X.length, r = 0; r < X.length; r++) t[Z + r] = X[r];
		else e.deps = t = X;
		if (xn() && e.f & 512) for (r = Z; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Z < t.length && (rr(e, Z), t.length = Z);
	return t;
}
function nr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = o.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (X === null || !s.call(X, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512), a.v !== T && ct(a), a.ac !== null && ft(() => {
			a.ac.abort(ye), a.ac = null, j(a, S);
		}), Et(a), rr(a, 0);
	}
}
function rr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) nr(e, n[r]);
}
function ir(e) {
	var t = e.f;
	if (!(t & 16384)) {
		j(e, x);
		var n = q;
		q = e;
		try {
			t & 16777232 ? Pn(e) : Nn(e), Mn(e);
			var r = er(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = qn;
		} finally {
			q = n;
		}
	}
}
async function ar() {
	await Promise.resolve(), Rt();
}
function $(e) {
	var t = !!(e.f & 2);
	if (Hn?.add(e), W !== null && !G && !(q !== null && q.f & 16384) && (Y === null || !Y.has(e))) {
		var n = W.deps;
		if (W.f & 2097152) e.rv < Jn && (e.rv = Jn, X === null && n !== null && n[Z] === e ? Z++ : X === null ? X = [e] : X.push(e));
		else {
			W.deps ??= [], s.call(W.deps, e) || W.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [W] : s.call(r, W) || r.push(W);
		}
	}
	if (Un && F.has(e)) return F.get(e);
	if (t) {
		var i = e;
		if (Un) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || sr(i)) && (a = wt(i)), F.set(i, a), a;
		}
		var o = !(i.f & 512) && !G && W !== null && !!(W.f & 512), c = (i.f & ne) === 0;
		Qn(i) && (o && (i.f |= 512), Tt(i)), o && !c && (Dt(i), or(i));
	}
	if (N?.has(e)) return N.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function or(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : s.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (Dt(n), or(n));
	}
}
function sr(e) {
	if (e.v === T) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (F.has(t) || t.f & 2 && sr(t)) return !0;
	return !1;
}
function cr(e) {
	var t = G;
	try {
		return G = !0, e();
	} finally {
		G = t;
	}
}
function lr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (w in e) ur(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && w in n && ur(n);
		}
	}
}
function ur(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			ur(e[n], t);
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
var dr = ["touchstart", "touchmove"];
function fr(e) {
	return dr.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var pr = Symbol("events"), mr = /* @__PURE__ */ new Set(), hr = /* @__PURE__ */ new Set();
function gr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Sr.call(t, e), !e.cancelBubble) return ft(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, A(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function _r(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = gr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Sn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function vr(e, t, n) {
	(t[pr] ??= {})[e] = n;
}
function yr(e) {
	for (var t = 0; t < e.length; t++) mr.add(e[t]);
	for (var n of hr) n(e);
}
var br = null, xr = !1;
function Sr(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	br = e, xr || (xr = !0, setTimeout(() => {
		xr = !1, br = null;
	}));
	var o = 0, s = br === e && e[pr];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[pr] = t;
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
		var d = W, f = q;
		K(null), J(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[pr]?.[r];
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
			e[pr] = t, delete e.currentTarget, K(d), J(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Cr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function wr(e) {
	return Cr?.createHTML(e) ?? e;
}
function Tr(e) {
	var t = gn("template");
	return t.innerHTML = wr(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Er(e, t) {
	var n = q;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function Dr(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (E) return Er(D, null), D;
		i === void 0 && (i = Tr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ z(i)));
		var t = r || an ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ z(t), s = t.lastChild;
			Er(o, s);
		} else Er(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Or(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (E) return Er(D, null), D;
		if (!o) {
			var e = /* @__PURE__ */ z(Tr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ z(e);) o.appendChild(/* @__PURE__ */ z(e));
			else o = /* @__PURE__ */ z(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ z(t), r = t.lastChild;
			Er(n, r);
		} else Er(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function kr(e, t) {
	return /* @__PURE__ */ Or(e, t, "svg");
}
function Ar() {
	if (E) return Er(D, null), D;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = R();
	return e.append(t, n), Er(t, n), e;
}
function jr(e, t) {
	if (E) {
		var n = q;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = D), Oe();
	} else e !== null && e.before(t);
}
function Mr() {
	if (E && D && D.nodeType === 8 && D.textContent?.startsWith("$")) {
		let e = D.textContent.substring(1);
		return Oe(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Nr(e) {
	let t = 0, n = Kt(0), r;
	return () => {
		xn() && ($(n), kn(() => (t === 0 && (r = cr(() => e(() => Qt(n)))), t += 1, () => {
			A(() => {
				--t, t === 0 && (r?.(), r = void 0, Qt(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Pr = ie | ae;
function Fr(e, t, n, r) {
	new Ir(e, t, n, r);
}
var Ir = class {
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
	#h = Nr(() => (this.#m = Kt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = q;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = q.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = jn(() => {
			if (E) {
				let e = Me(this.#t);
				Oe();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Pr), E && (this.#e = D);
	}
	#g() {
		try {
			this.#a = H(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		A(r), t && (this.#s = H(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? Ee() : (t = !0, n && qe(), this.#s !== null && Ln(this.#s, () => {
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
					B(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (te | re)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = H(() => e(this.#e)), A(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = R(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return H(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							B(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(M)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Ln(this.#o, () => {
					this.#o = null;
				}), this.#S(M));
			}
		}));
	}
	#x() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = H(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Vn(this.#a, e);
				let t = this.#n.pending;
				this.#o = H(() => t(this.#e));
			} else this.#S(M);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		lt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = q, n = W, r = k;
		J(this.#i), K(this.#i), $e(this.#i.ctx);
		try {
			return Lt.ensure(), e();
		} finally {
			J(t), K(n), $e(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && Ln(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, A(() => {
			this.#d = !1, this.#m && Xt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), $(this.#m);
	}
	error(e) {
		if (e === xe || !this.#n.onerror && !this.#n.failed) throw e;
		M?.is_fork ? (this.#a && M.skip_effect(this.#a), this.#o && M.skip_effect(this.#o), this.#s && M.skip_effect(this.#s), M.oncommit(() => {
			this.#y() || this.#T(e);
		})) : this.#T(e);
	}
	#T(e) {
		this.#a &&= (U(this.#a), null), this.#o &&= (U(this.#o), null), this.#s &&= (U(this.#s), null), E && (O(this.#t), Ae(), O(je()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return H(() => {
						var r = q;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return B(e, this.#i.parent), null;
				}
			}));
		};
		A(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					B(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => B(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function Lr(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[_e] ??= e.nodeValue) && (e[_e] = n, e.nodeValue = `${n}`);
}
function Rr(e, t) {
	return Br(e, t);
}
var zr = /* @__PURE__ */ new Map();
function Br(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	cn();
	var l = void 0, u = En(() => {
		var o = n ?? t.appendChild(R());
		Fr(o, { pending: () => {} }, (t) => {
			et({});
			var n = k;
			if (a && (n.c = a), i && (r.$$events = i), E && Er(t, null), l = e(t, r) || nt(), E && (q.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw we(), xe;
			tt();
		}, s);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = fr(r);
					for (let e of [t, document]) {
						var a = zr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), zr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Sr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(c(mr)), hr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = zr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Sr), r.delete(e), r.size === 0 && zr.delete(n)) : r.set(e, i);
			}
			hr.delete(d), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Vr.set(l, u), l;
}
var Vr = /* @__PURE__ */ new WeakMap(), Hr = class {
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
				r && (U(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Vn(r, t), t.append(R()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else U(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Ln(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (U(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = M, r = hn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = R();
				i.append(a), this.#n.set(e, {
					effect: H(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, H(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else E && (this.anchor = D), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Ur(e, t, n = !1) {
	var r;
	E && (r = D, Oe());
	var i = new Hr(e), a = n ? ie : 0;
	function o(e, t) {
		if (E) {
			var n = Me(r);
			if (e !== parseInt(n.substring(1))) {
				var a = je();
				O(a), i.anchor = a, De(!1), i.ensure(e, t), De(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	jn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Wr = Symbol("NaN");
function Gr(e, t, n) {
	E && Oe();
	var r = new Hr(e), i = !rt();
	jn(() => {
		var e = t();
		e !== e && (e = Wr), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Kr(e, t) {
	return t;
}
function qr(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Ln(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Jr(e, c(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			mn(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= se, Vn(a, document.createDocumentFragment())) : U(t[i], n);
	}
}
var Yr;
function Xr(e, t, n, r, i, o = null) {
	var s = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		s = E ? O(/* @__PURE__ */ z(u)) : u.appendChild(R());
	}
	E && Oe();
	var d = null, f = /* @__PURE__ */ St(() => {
		var e = n();
		return a(e) ? e : e == null ? [] : c(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = $(f);
			_.fallback = d, Qr(_, n, s, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= se, ei(d, null, s)) : zn(d) : Ln(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: jn(() => {
			var e = $(f), a = e.length;
			let c = !1;
			E && Me(s) === "[!" != (a === 0) && (s = je(), O(s), De(!1), c = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = M, v = hn(), y = 0; y < a; y += 1) {
				E && D.nodeType === 8 && D.data === "]" && (s = D, c = !0, De(!1));
				var b = e[y], x = r(b, y), S = m ? null : l.get(x);
				S ? (S.v && Xt(S.v, b), S.i && Xt(S.i, y), v && _.unskip_effect(S.e)) : (S = $r(l, m ? s : Yr ??= R(), b, x, y, i, t, n), m || (S.e.f |= se), l.set(x, S)), u.add(x);
			}
			if (a === 0 && o && !d && (m ? d = H(() => o(s)) : (d = H(() => o(Yr ??= R())), d.f |= se)), a > u.size && Re("", "", ""), E && a > 0 && O(je()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			c && De(!0), $(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, E && (s = D);
}
function Zr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Qr(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, l = Zr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (a) for (v = 0; v < o; v += 1) h = t[v], g = i(h, v), _ = s.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (h = t[v], g = i(h, v), _ = s.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (zn(_), a && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= se, _ === l) ei(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ti(e, d, _), ti(e, _, y), ei(_, y, n), d = _, p = [], m = [], l = Zr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) ei(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					ti(e, S.prev, C.next), ti(e, d, S), ti(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), ei(_, l, n), ti(e, _.prev, _.next), ti(e, _, d === null ? e.effect.first : d.next), ti(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Zr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Zr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Jr(e, c(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = Zr(l.next);
		var te = ee.length;
		if (te > 0) {
			var ne = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.fix();
			}
			qr(e, ee, ne);
		}
	}
	a && A(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function $r(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Kt(n) : /* @__PURE__ */ qt(n, !1, !1) : null, l = o & 2 ? Kt(i) : null;
	return {
		v: c,
		i: l,
		e: H(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ei(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ ln(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ti(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ni(e, t, ...n) {
	var r = new Hr(e);
	jn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, ie);
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function ri(e, t, n) {
	var r;
	E && (r = D, Oe());
	var i = new Hr(e);
	jn(() => {
		var e = t() ?? null;
		if (E && Me(r) === "[" != (e !== null)) {
			var a = je();
			O(a), i.anchor = a, De(!1), i.ensure(e, e && ((t) => n(t, e))), De(!0);
		} else i.ensure(e, e && ((t) => n(t, e)));
	}, ie);
}
// node_modules/clsx/dist/clsx.mjs
function ii(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = ii(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function ai() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = ii(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/svelte/src/internal/shared/attributes.js
function oi(e) {
	return typeof e == "object" ? ai(e) : e ?? "";
}
var si = [..." 	\n\r\f\xA0\v﻿"];
function ci(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || si.includes(r[o - 1])) && (s === r.length || si.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function li(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function ui(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function di(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(ui)), i && c.push(...Object.keys(i).map(ui));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = ui(e.substring(l, u).trim());
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
		return r && (n += li(r)), i && (n += li(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function fi(e, t, n, r, i, a) {
	var o = e[he];
	if (E || o !== n || o === void 0) {
		var s = ci(n, r, a);
		E && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[he] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function pi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function mi(e, t, n, r) {
	var i = e[ge];
	if (E || i !== t) {
		var a = di(t, r);
		E && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ge] = t;
	} else r && (Array.isArray(r) ? (pi(e, n?.[0], r[0]), pi(e, n?.[1], r[1], "important")) : pi(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function hi(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function gi(e, t) {
	var n = e.__defaultValue, r = e.multiple, i = r ? n ?? [] : null;
	if (!r || a(i)) {
		var o = e.selectedIndex, s = t && r ? new Set(e.selectedOptions) : null;
		for (var c of e.options) {
			var l = yi(c);
			hi(c, r ? i.includes(l) : nn(l, n));
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
function _i(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!a(t)) return Te();
		for (var r of e.options) r.selected = t.includes(yi(r));
	} else {
		for (r of e.options) if (nn(yi(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function vi(e) {
	var t = new MutationObserver((t) => {
		t.every(bi) || ("__defaultValue" in e && gi(e, !1), "__value" in e && _i(e, e.__value));
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Sn(() => {
		t.disconnect();
	});
}
function yi(e) {
	return "__value" in e ? e.__value : e.value;
}
function bi(e) {
	if (e.target.closest("selectedcontent") !== null) return !0;
	if (e.type === "childList") {
		var t = [...e.addedNodes, ...e.removedNodes];
		return t.length > 0 && t.every((e) => e.nodeName === "SELECTEDCONTENT");
	}
	return !1;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var xi = Symbol("is custom element"), Si = Symbol("is html"), Ci = be ? "link" : "LINK", wi = be ? "progress" : "PROGRESS";
function Ti(e) {
	if (E) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Di(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Di(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ve] = n, A(n), dt();
	}
}
function Ei(e, t) {
	var n = Oi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === wi) && (e.value = t ?? "");
}
function Di(e, t, n, r) {
	var i = Oi(e);
	E && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Ci) || i[t] !== (i[t] = n) && (t === "loading" && (e[pe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ai(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Oi(e) {
	return e[me] ??= {
		[xi]: e.nodeName.includes("-"),
		[Si]: e.namespaceURI === Se
	};
}
var ki = /* @__PURE__ */ new Map();
function Ai(e) {
	var t = e.getAttribute("is") || e.nodeName, n = ki.get(t);
	if (n) return n;
	ki.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = d(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = m(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function ji(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	pt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Fi(e) ? Ii(a) : a, n(a), M !== null && r.add(M), await ar(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (E && e.defaultValue !== e.value || cr(t) == null && e.value) && (n(Fi(e) ? Ii(e.value) : e.value), M !== null && r.add(M)), kn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = M;
			if (r.has(i)) return;
		}
		Fi(e) && n === Ii(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
var Mi = /* @__PURE__ */ new Set();
function Ni(e, t, n, r, i = r) {
	var a = n.getAttribute("type") === "checkbox", o = e;
	let s = !1;
	if (t !== null) for (var c of t) o = o[c] ??= [];
	o.push(n), pt(n, "change", () => {
		var e = n.__value;
		a && (e = Pi(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), kn(() => {
		var e = r();
		E && n.defaultChecked !== n.checked ? s = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = nn(n.__value, e);
	}), Sn(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), Mi.has(o) || (Mi.add(o), A(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), Mi.delete(o);
	})), A(() => {
		if (s) {
			var e = a ? Pi(o, e, n.checked) : o.find((e) => e.checked)?.__value;
			i(e);
		}
	});
}
function Pi(e, t, n) {
	for (var r = /* @__PURE__ */ new Set(), i = 0; i < e.length; i += 1) e[i].checked && r.add(e[i].__value);
	return n || r.delete(t), Array.from(r);
}
function Fi(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ii(e) {
	return e === "" ? null : +e;
}
var Li = /* @__PURE__ */ new class e {
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
function Ri(e, t, n) {
	var r = Li.observe(e, () => n(e[t]));
	Dn(() => (cr(() => n(e[t])), r));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function zi(e, t) {
	return e === t || e?.[w] === t;
}
function Bi(e = nt(), t, n, r) {
	var i = k.r, a = q;
	return Dn(() => {
		var o, s;
		return kn(() => {
			o = s, s = r?.() || [], cr(() => {
				zi(n(...s), e) || (t(e, ...s), o && zi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && zi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
function Vi(e, t, n = t) {
	var r = e === "x", i = () => ft(() => {
		a = !0, clearTimeout(o), o = setTimeout(s, 100), n(window[r ? "scrollX" : "scrollY"]);
	});
	addEventListener("scroll", i, { passive: !0 });
	var a = !1, o, s = () => {
		a = !1;
	}, c = !0;
	kn(() => {
		var e = t();
		c ? c = !1 : !a && e != null && (a = !0, clearTimeout(o), r ? scrollTo(e, window.scrollY) : scrollTo(window.scrollX, e), o = setTimeout(s, 100));
	}), Dn(i), Sn(() => {
		removeEventListener("scroll", i);
	});
}
// node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function Hi(e = !1) {
	let t = k, n = t.l.u;
	if (!n) return;
	let r = () => lr(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ vt(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => $(i);
	}
	n.b.length && Tn(() => {
		Ui(t, r), v(n.b);
	}), Cn(() => {
		let e = cr(() => n.m.map(_));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && Cn(() => {
		Ui(t, r), v(n.a);
	});
}
function Ui(e, t) {
	if (e.l.s) for (let t of e.l.s) $(t);
	t();
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var Wi = !1;
function Gi(e) {
	var t = Wi;
	try {
		return Wi = !1, [e(), Wi];
	} finally {
		Wi = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function Ki(e, t, n, r) {
	var i = !Je || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, d = () => o && i ? (l ??= /* @__PURE__ */ vt(r), $(l)) : (c && (c = !1, s = o ? cr(r) : r), s);
	let f;
	if (a) {
		var p = w in e || fe in e;
		f = u(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = Gi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ue(t), f(m)));
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
	var v = !1, y = (n & 1 ? vt : St)(() => (v = !1, g()));
	a && $(y);
	var b = q;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? $(y) : i && a ? en(e) : e;
			return L(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return Un && v || b.f & 16384 ? y.v : $(y);
	});
}
function qi(e) {
	k === null && Ie("onMount"), Je && k.l !== null ? Ji(k).m.push(e) : Cn(() => {
		let t = cr(e);
		if (typeof t == "function") return t;
	});
}
function Ji(e) {
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
var Yi = (e) => Math.min(1, Math.max(0, e)), Xi = (e) => String(e).padStart(2, "0"), Zi = (e, t) => t > 0 ? Yi(e / t) : 1, Qi = (e) => e.workouts ?? e.gym ?? 0, $i = (e) => [
	e.goal.runs,
	Qi(e.goal),
	e.goal.active_days ?? 0
], ea = (e) => [
	e.runs,
	Qi(e),
	e.active_days ?? 0
], ta = (e) => ea(e).map((t, n) => Zi(t, $i(e)[n])), na = (e) => e.toLocaleString("en-US");
function ra(e, t) {
	if (e == null) return null;
	let n = t > 0 ? e >= t ? " · Active day ✓" : ` · ${na(t - e)} to go` : "";
	return `👟 ${na(e)} steps today${n}`;
}
function ia(e, t) {
	let n = (e) => e ? " ✓" : "", r = ([e, n]) => {
		let r = t[e];
		if (n) return `${r?.name ?? e} ✓`;
		let i = r ? $i(r.week) : [], a = r ? ea(r.week) : [];
		return `${r?.name ?? e} ${i.filter((e, t) => e > 0 && a[t] >= e).length} of ${i.filter((e) => e > 0).length}`;
	};
	if (e.mode === "team") return `${e.team.done} of ${e.team.target} team points${n(e.met)}`;
	let i = Object.entries(e.members_met).map(r);
	return e.mode === "together" && i.push(`${e.together.done} of ${e.together.target} together${n(e.together.done >= e.together.target)}`), i.join(" · ");
}
function aa(e) {
	if (!e.reward) return null;
	if (e.met) return `${e.reward} unlocked!`;
	let t = {
		own: "you both make your goals",
		together: `you both make your goals and do ${e.together.target} together`,
		team: `you reach ${e.team.target} team points`
	};
	return `${e.reward}: unlocks when ${t[e.mode]}`;
}
function oa(e) {
	let t = e.xp - e.level_floor, n = e.next_level_xp - e.level_floor;
	return {
		level: e.level,
		into: t,
		span: n,
		frac: n > 0 ? Yi(t / n) : 1
	};
}
var sa = (e) => `Week ${Number(e.week.split("-W")[1])} · ${e.days_left} ${e.days_left === 1 ? "day" : "days"} left`;
function ca(e, t, n = 15) {
	let r = new Date(e);
	return t - r > n * 6e4 ? `Updated ${Xi(r.getHours())}:${Xi(r.getMinutes())}` : null;
}
var la = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], ua = [
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
function da(e, t = !0) {
	let n = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(e);
	if (!n) return "";
	let [, r, i, a, o] = n, s = `${la[new Date(Date.UTC(r, i - 1, a)).getUTCDay()]} ${Number(a)} ${ua[i - 1]}`;
	return t ? `${s}, ${o}` : s;
}
var fa = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${Xi(e % 60)} min` : `${e / 60} h`, pa = {
	short: "Too short",
	easy: "Too easy",
	type: "Type not counted",
	no_gps: "No GPS"
}, ma = (e) => {
	let t = e.check;
	return e.needs_review ? {
		text: "Review",
		tone: "warn"
	} : t?.state === "match" ? {
		text: `${t.found}/${t.planned} blocks`,
		tone: "plain"
	} : t?.state === "indoor" ? {
		text: "indoor",
		tone: "plain"
	} : null;
}, ha = (e) => ({
	title: e.name,
	when: da(e.start, e.kind !== "active_day"),
	duration: e.kind === "active_day" ? `${na(e.steps)} steps` : fa(e.minutes),
	xp: e.xp ? `+${e.xp}` : "",
	label: pa[e.reason] ?? null,
	plan: e.plan && e.caught_up ? `${e.plan} · caught up` : e.plan,
	chip: ma(e),
	removable: e.kind === "active_day" ? null : e.excluded ? "restore" : e.key.startsWith("manual:") ? "delete" : "remove"
});
function ga(e, t) {
	let n = new Set(e.map((e) => e.key));
	return [...e, ...t.filter((e) => !n.has(e.key))];
}
var _a = (e, t, n) => e.flatMap((e) => {
	let r = n[`${t}/${e.key}`];
	return r === null ? [] : r === void 0 ? [e] : [{
		...e,
		excluded: r
	}];
}), va = (e, t) => (/* @__PURE__ */ new Date(Date.parse(`${e}T00:00:00Z`) - t * 864e5)).toISOString().slice(0, 10), ya = (e) => Math.round(e / 30) / 2, ba = (e) => `${ya(e)} min`;
function xa(e) {
	if (!e?.steps?.length) return "";
	let t = ([e, t]) => `${ba(t)} ${e}`, n = e.times > 1 ? `${e.times} × (${e.steps.map(t).join(" + ")})` : e.steps.map(t).join(" → ");
	return [
		e.warmup_s > 0 && `${ba(e.warmup_s)} warm-up walk`,
		n,
		e.cooldown_s > 0 && `${ba(e.cooldown_s)} cool-down walk`
	].filter(Boolean).join(" · ");
}
function Sa(e, t = null) {
	if (e.state === "none") return "No track to check · counts by duration";
	if (e.state === "indoor") return t == null ? "Indoor run" : `Indoor: ${t.toFixed(1)} km/h average`;
	let n = e.state === "match" ? "matches" : "doesn't match";
	return `${e.found} of ${e.planned} run blocks · ${ya(e.run_s)} of ${ba(e.planned_run_s)} running · ${n} ${e.label}`;
}
function Ca(e) {
	if (!e) return [];
	let t = [
		["walk", e.warmup_s ?? 0],
		...e.intervals,
		["walk", e.cooldown_s ?? 0]
	].filter(([, e]) => e > 0), n = t.reduce((e, [, t]) => e + t, 0);
	return t.map(([e, t]) => ({
		kind: e,
		frac: t / n
	}));
}
function wa(e, t) {
	let n = Object.hasOwn(t, e.person) ? e.person : null;
	return {
		self: n,
		others: Object.keys(t).filter((e) => e !== n)
	};
}
var Ta = (e) => `${Number(e.slice(8, 10))} ${ua[Number(e.slice(5, 7)) - 1]}`;
function Ea(e, t, n) {
	let r = t.find((t) => t.key === e.key);
	return n - e.at > 6e5 || !r || e.want !== null && r.excluded === e.want;
}
function Da(e, t, n) {
	let r = (e[t] ?? Promise.resolve()).then(n), i = e[t] = r.catch(() => {});
	return i.then(() => e[t] === i && delete e[t]), r;
}
function Oa(e) {
	let t = (e) => e < 10 ? e.toFixed(1) : Math.round(e).toLocaleString(), n = e.km == null ? "unknown" : e.km >= e.limit ? "replace" : e.km >= .9 * e.limit ? "soon" : "ok", r = e.last_run ? new Date(e.last_run) : null, i = e.runs ? `${e.runs} ${e.runs === 1 ? "run" : "runs"}` : e.runs === 0 ? "No runs yet" : "";
	return {
		name: e.name,
		km: e.km == null ? "—" : `${t(e.km)} / ${t(e.limit)} km`,
		frac: e.km == null ? 0 : Yi(e.km / e.limit),
		state: n,
		label: {
			soon: "Replace soon",
			replace: "Replace"
		}[n] ?? null,
		detail: [i, r && `last run ${r.getDate()} ${ua[r.getMonth()]}`].filter(Boolean).join(" · ")
	};
}
var ka = {
	name: [1, 40],
	replace_at_km: [
		100,
		3e3,
		10
	]
}, Aa = (e, t) => !!t && (e.run_shoes !== void 0 || (e.shoes ?? []).some((e) => e.id != null));
function ja(e, t, { partial: n = !1 } = {}) {
	let r = {};
	if (!(n && e === void 0)) {
		let t = String(e ?? "").trim();
		if (t.length < ka.name[0]) return { error: "Give the shoe a name" };
		if (t.length > ka.name[1]) return { error: `A name of at most ${ka.name[1]} characters` };
		r.name = t;
	}
	if (!(n && t === void 0)) {
		let [e, n] = ka.replace_at_km, i = typeof t == "number" ? t : t === null || String(t).trim() === "" ? NaN : Number(t);
		if (!(i >= e && i <= n)) return { error: `Replace at: ${e} to ${n} km` };
		r.replace_at_km = i;
	}
	return r;
}
function Ma(e, t) {
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
var Na = {
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
}, Pa = [
	"runs",
	"workouts",
	"active_days",
	"steps"
], Fa = {
	runs: 0,
	workouts: 0,
	active_days: 0,
	steps: 1e4
};
function Ia(e, t) {
	let [n, r, i] = Na[e];
	return Math.min(r, Math.max(n, Math.round(t / i) * i));
}
function La(e, t) {
	let n = e.current, r = (t) => n?.people?.[t] ?? e.defaults?.[t] ?? {};
	return {
		people: Object.fromEntries(Object.keys(t).map((e) => {
			let t = r(e);
			return [e, Object.fromEntries(Pa.map((e) => [e, Ia(e, t[e] ?? Fa[e])]))];
		})),
		couple: {
			mode: "own",
			together: 1,
			team: 8,
			reward: "",
			...n?.couple
		},
		profiles: Object.fromEntries(Object.keys(t).map((t) => [t, { birth_year: e.profiles?.[t]?.birth_year ?? null }]))
	};
}
var Ra = (e) => e ? `Max HR ${e.bpm} · ${e.source === "measured" && e.date ? `measured ${Ta(e.date)}` : e.source}` : "—";
function za(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return t.setUTCDate(t.getUTCDate() + 3 - (t.getUTCDay() + 6) % 7), Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5 + 1) / 7);
}
var Ba = (e, t) => Pa.every((n) => (n === "workouts" ? Qi(t) : t[n]) === e[n]), Va = (e, t, n) => n - e.at > 6e5 || Object.entries(e.entry.people).every(([e, n]) => !t[e] || Ba(n, t[e].week.goal));
function Ha(e, t) {
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
var Ua = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${Xi(e.getMonth() + 1)}-${Xi(e.getDate())}`;
function Wa(e, t, n) {
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
function Ga(e) {
	let t = e.filter((e) => e.active).length;
	return `${t} active ${t === 1 ? "day" : "days"} · ${na(e.reduce((e, t) => e + (t.steps ?? 0), 0))} steps`;
}
var Ka = (e) => `${e.w} ${e.unit} × ${e.r}`, qa = [
	"Chest",
	"Back",
	"Shoulders",
	"Arms",
	"Legs",
	"Core",
	"Other"
], Ja = (e) => qa.map((t) => ({
	group: t,
	lifts: (e ?? []).filter((e) => (qa.includes(e.group) ? e.group : "Other") === t)
})).filter((e) => e.lifts.length), Ya = (e) => Ja(e).map(({ group: e, lifts: t }) => ({
	group: e,
	count: t.length,
	lift: [...t].sort((e, t) => (t.sessions ?? 0) - (e.sessions ?? 0) || t.date.localeCompare(e.date) || e.name.localeCompare(t.name))[0]
})), Xa = (e) => Ja(e).map(({ group: e, lifts: t }) => ({
	group: e,
	lifts: [...t].sort((e, t) => e.name.localeCompare(t.name))
})), Za = (e) => `${Math.floor(e / 60)}:${Xi(e % 60)}`, Qa = (e) => new Set([...(e?.lifts ?? []).map((e) => e.key), e?.fastest_1k?.key].filter(Boolean)), $a = (e, t) => !!t && t.last_received == null && !e.feed.length, eo = (e, t) => [.../* @__PURE__ */ new Set([e.person, ...e.can_connect ?? []])].filter((e) => Object.hasOwn(t, e)), to = {
	iphone: {
		title: "iPhone",
		steps: [
			"Install Health Exporter & Shortcuts (a paid one-time app) and turn on routes in it.",
			"In Shortcuts make a shortcut called \"Sync workouts\": Export Workouts (last 7 days, all types), then Repeat with each, then Get Contents of URL (method POST, request body File, your address).",
			"Add a personal automation that runs it when a social app is opened.",
			"Add a second one that runs it when an Apple Watch workout ends."
		]
	},
	android: {
		title: "Android",
		steps: [
			"Install OpenTracks from F-Droid and turn on instant GPX export.",
			"Install Automate and import the flow file from the repo's phone/ folder.",
			"In the flow, open the HTTP request block and paste your address as its URL, then start the flow."
		]
	}
}, no = (e) => to[e] ?? {
	title: "Which phone do you have?",
	steps: []
};
function ro(e) {
	return e?.invite ? {
		before: `${e.in_ha ? `Open openGym from the Home Assistant sidebar in Chrome, not in the Home Assistant app (${e.url}). Choose` : `Open openGym at ${e.url}, choose`} Create new profile, enter code `,
		code: e.invite,
		after: ", then Add to Home Screen. Does openGym show someone else? Sign out there first."
	} : null;
}
function io(e, t, n = null) {
	if (e.last_received == null) return {
		state: "waiting",
		text: n?.feed?.length ? "No upload since this update" : "Waiting for the first workout"
	};
	let r = new Date(e.last_received);
	return {
		state: "connected",
		text: `Connected · last workout received ${r.toDateString() === t.toDateString() ? "today" : `${r.getDate()} ${ua[r.getMonth()]}`}, ${Xi(r.getHours())}:${Xi(r.getMinutes())}`
	};
}
// src/lib/details.js
var ao = (e) => String(e).padStart(2, "0"), oo = (e) => /T(\d+:\d+)/.exec(e ?? "")?.[1] ?? "";
function so(e) {
	let t = Math.round(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60);
	return n ? `${n}:${ao(r)}:${ao(t % 60)}` : `${r}:${ao(t % 60)}`;
}
var co = (e) => e.summary.kind === "run" || e.summary.kind === "walk", lo = (e) => !!e.route?.length && !co(e), uo = (e) => e ? 3600 / e : null, fo = (e) => ({
	title: e.name,
	date: da(e.start, !1),
	time: e.end ? `${oo(e.start)}–${oo(e.end)}` : oo(e.start),
	duration: fa(e.minutes),
	plan: e.plan ?? null
});
function po(e) {
	let t = e.summary, n = t.km > 0 ? t.km : null, r = n && co(e) ? Math.round(t.minutes * 60 / n) : null;
	return [
		["Distance", n && `${n.toFixed(1)} km`],
		["Pace", r && `${so(r)} /km`],
		["Speed", n && lo(e) && `${(n / (t.minutes / 60)).toFixed(1)} km/h`],
		["Elevation gain", e.gain_m != null && `${Math.round(e.gain_m)} m`],
		["Avg heart rate", t.avg_hr != null && `${Math.round(t.avg_hr)} bpm`],
		["Max heart rate", t.max_hr != null && `${Math.round(t.max_hr)} bpm`],
		["Calories", t.kcal != null && `${Math.round(t.kcal)} kcal`],
		["Shoe", t.kind === "run" && t.shoe?.name]
	].filter(([, e]) => e);
}
function mo(e) {
	let t = lo(e);
	return e.splits.map((e, n) => ({
		km: e.km === 1 ? String(n + 1) : `${e.km} km`,
		time: so(e.s),
		pace: e.pace ? t ? uo(e.pace).toFixed(1) : so(e.pace) : "—",
		hr: e.hr == null ? "—" : String(e.hr),
		climb: e.climb == null ? "—" : `${Math.round(e.climb)} m`
	}));
}
function ho(e, t) {
	if (!e) return null;
	let n = e.reduce((e, t) => e + t, 0), r = (e) => Math.round(e * t);
	return e.map((e, t) => ({
		zone: `Z${t + 1}`,
		bpm: t === 4 ? `${r(.9)}+` : `${r(.5 + t / 10)}–${r(.6 + t / 10)}`,
		time: so(e),
		pct: n ? Math.round(e / n * 100) : 0
	}));
}
var go = (e) => e && {
	exercises: e.exercises.map((e) => ({
		name: e.name,
		set: Ka(e),
		record: e.record
	})),
	volume: `${Math.round(e.vol_kg).toLocaleString("en-US")} kg`
};
function _o(e) {
	if (!e.series) return null;
	let { t, pace: n, hr: r, ele: i } = e.series;
	return {
		x: t,
		list: [
			lo(e) ? {
				label: "Speed km/h",
				values: n.map(uo),
				color: "--gym"
			} : {
				label: "Pace /km",
				values: n,
				color: "--run",
				fmt: so
			},
			{
				label: "Heart rate",
				values: r,
				color: "--warn-text"
			},
			{
				label: "Elevation m",
				values: i,
				color: "--bonus"
			}
		].filter((e) => e.values.some((e) => e != null))
	};
}
function vo(e, t, n) {
	return e?.can_edit?.includes(t) ? {
		remove: ha(n).removable,
		shoe: n.kind === "run"
	} : {
		remove: null,
		shoe: !1
	};
}
var yo = (e) => ({
	file_missing: "Route file not found",
	file_unreadable: "Route file unreadable"
})[e] ?? null, bo = en({
	wide: !1,
	reducedMotion: !1
}), xo = matchMedia("(min-width: 768px)"), So = matchMedia("(prefers-reduced-motion: reduce)"), Co = () => {
	bo.wide = xo.matches, bo.reducedMotion = So.matches;
};
xo.addEventListener("change", Co), So.addEventListener("change", Co), Co();
export { ra as $, Ye as $t, za as A, Ar as At, Ea as B, Cn as Bt, ha as C, Xr as Ct, Ya as D, Rr as Dt, La as E, Ur as Et, Ra as F, vr as Ft, ta as G, pn as Gt, xa as H, un as Ht, ga as I, _r as It, Ma as J, I as Jt, Da as K, en as Kt, va as L, $ as Lt, oa as M, kr as Mt, Ka as N, Mr as Nt, Xa as O, Lr as Ot, Ua as P, yr as Pt, ca as Q, Ze as Qt, _a as R, ar as Rt, ea as S, ni as St, Va as T, Gr as Tt, Qa as U, dn as Ut, Ca as V, rn as Vt, aa as W, fn as Wt, Aa as X, tt as Xt, Oa as Y, xt as Yt, Ta as Z, et as Zt, Ia as _, _i as _t, po as a, i as an, qi as at, io as b, oi as bt, yo as c, Vi as ct, mo as d, Ni as dt, Ae as en, Ga as et, ho as f, ji as ft, Sa as g, vi as gt, ka as h, Ei as ht, vo as i, n as in, Ha as it, wa as j, Dr as jt, ro as k, jr as kt, co as l, Bi as lt, Pa as m, Di as mt, _o as n, g as nn, Wa as nt, go as o, r as on, Ki as ot, Na as p, Ti as pt, ja as q, L as qt, so as r, b as rn, sa as rt, fo as s, t as sn, Hi as st, bo as t, ke as tn, ia as tt, lo as u, Ri as ut, eo as v, mi as vt, $i as w, Kr as wt, no as x, ri as xt, $a as y, fi as yt, Za as z, An as zt };
