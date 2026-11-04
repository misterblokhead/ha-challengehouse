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
var x = 1024, S = 2048, C = 4096, ee = 8192, te = 16384, ne = 32768, re = 1 << 25, ie = 65536, ae = 1 << 19, oe = 1 << 20, se = 1 << 25, ce = 1 << 21, le = 1 << 22, ue = 1 << 23, de = Symbol("$state"), fe = Symbol("component"), pe = Symbol("legacy props"), me = Symbol(""), he = Symbol("attributes"), ge = Symbol("class"), _e = Symbol("style"), ve = Symbol("text"), ye = Symbol("form reset"), be = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), xe = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), Se = {}, w = Symbol("uninitialized"), Ce = "http://www.w3.org/1999/xhtml";
function we() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Te(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ee() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function De() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var T = !1;
function Oe(e) {
	T = e;
}
var E;
function D(e) {
	if (e === null) throw Te(), Se;
	return E = e;
}
function ke() {
	return D(/* @__PURE__ */ fn(E));
}
function Ae(e) {
	if (T) {
		if (/* @__PURE__ */ fn(E) !== null) throw Te(), Se;
		E = e;
	}
}
function je(e = 1) {
	if (T) {
		for (var t = e, n = E; t--;) n = /* @__PURE__ */ fn(n);
		E = n;
	}
}
function Me(e = !0) {
	for (var t = 0, n = E;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ fn(n);
		e && n.remove(), n = i;
	}
}
function Ne(e) {
	if (!e || e.nodeType !== 8) throw Te(), Se;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Pe(e) {
	return e === this.v;
}
function Fe(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ie(e) {
	return !Fe(e, this.v);
}
function Le(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// node_modules/svelte/src/internal/client/errors.js
function Re() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function ze(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Be(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Ve() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function He(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Ue() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function We(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Ge() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ke() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function qe() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Je() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/flags/index.js
var Ye = !1;
function Xe() {
	Ye = !0;
}
// node_modules/svelte/src/internal/shared/clone.js
var Ze = [];
function Qe(e, t = !1, n = !1) {
	return $e(e, /* @__PURE__ */ new Map(), "", Ze, null, n);
}
function $e(e, t, n, r, i = null, o = !1) {
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
				l in e && (c[l] = $e(u, t, n, r, null, o));
			}
			return c;
		}
		if (m(e) === f) {
			c = {}, t.set(e, c), i !== null && t.set(i, c);
			for (var d of Object.keys(e)) c[d] = $e(e[d], t, n, r, null, o);
			return c;
		}
		if (e instanceof Date) return e.getTime(), structuredClone(e);
		if (typeof e.toJSON == "function" && !o) return $e(e.toJSON(), t, n, r, e);
	}
	if (e instanceof EventTarget) return e;
	try {
		return structuredClone(e);
	} catch {
		return e;
	}
}
// node_modules/svelte/src/internal/client/context.js
var O = null;
function et(e) {
	O = e;
}
function tt(e, t = !1, n) {
	O = {
		p: O,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: K,
		l: Ye && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function nt(e) {
	var t = O, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Dn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, O = t.p, rt(e);
}
function rt(e = {}) {
	return l(e, fe, { value: !0 }), e;
}
function it() {
	return !Ye || O !== null && O.l === null;
}
// node_modules/svelte/src/internal/client/dom/task.js
var at = [];
function ot() {
	var e = at;
	at = [], v(e);
}
function k(e) {
	if (at.length === 0 && !Mt) {
		var t = at;
		queueMicrotask(() => {
			t === at && ot();
		});
	}
	at.push(e);
}
function st() {
	for (; at.length > 0;) ot();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var ct = ~(S | C | x);
function A(e, t) {
	e.f = e.f & ct | t;
}
function lt(e) {
	e.f & 512 || e.deps === null ? A(e, x) : A(e, C);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function ut(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), A(e, x);
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
var dt = !1;
function ft() {
	dt || (dt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ye]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function pt(e) {
	var t = U, n = K;
	G(null), q(null);
	try {
		return e();
	} finally {
		G(t), q(n);
	}
}
function mt(e, t, n, r = n) {
	e.addEventListener(t, () => pt(n));
	let i = e[ye];
	e[ye] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ft();
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function ht(e, t, n, r) {
	let i = it() ? yt : Ct;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = K, c = gt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				R(e, s);
			}
			_t();
		}
	}
	var d = vt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ xt(e))).then(u).catch((e) => R(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), _t());
	}) : f();
}
function gt() {
	var e = K, t = U, n = O, r = j;
	return function(i = !0) {
		q(e), G(t), et(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function _t(e = !0) {
	q(null), G(null), et(null), e && j?.deactivate();
}
function vt() {
	var e = K, t = e.b, n = j, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function yt(e) {
	var t = 2 | S;
	return K !== null && (K.f |= ae), {
		ctx: O,
		deps: null,
		effects: null,
		equals: Pe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: w,
		wv: 0,
		parent: K,
		ac: null
	};
}
var bt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function xt(e, t, n) {
	let r = K;
	r === null && Re();
	var i = void 0, a = qt(w), o = !U, s = /* @__PURE__ */ new Set();
	return jn(() => {
		var t = K, n = y();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== be && n.reject(e);
			}).finally(_t);
		} catch (e) {
			n.reject(e), _t();
		}
		var c = j;
		if (o) {
			if (t.f & 32768) var l = vt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(bt);
			else for (let e of s.values()) e.reject(bt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== bt && (c.activate(), t ? (a.f |= ue, Qt(a, t)) : (a.f & 8388608 && (a.f ^= ue), Qt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Tn(() => {
		for (let e of s) e.reject(bt);
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
function St(e) {
	let t = /* @__PURE__ */ yt(e);
	return qn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Ct(e) {
	let t = /* @__PURE__ */ yt(e);
	return t.equals = Ie, t;
}
function wt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) V(t[n]);
	}
}
function Tt(e) {
	var t, n = K, r = e.parent;
	if (!H && r !== null && e.v !== w && r.f & 24576) return we(), e.v;
	q(r);
	try {
		wt(e), t = nr(e);
	} finally {
		q(n);
	}
	return t;
}
function Et(e) {
	var t = Tt(e);
	!e.equals(t) && (e.wv = $n(), (!j?.is_fork || e.deps === null) && (j === null ? e.v = t : (j.capture(e, t, !0), At?.capture(e, t, !0)), e.deps === null)) ? A(e, x) : H || (M === null ? lt(e) : (wn() || j?.is_fork) && M.set(e, t));
}
function Dt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && pt(() => {
		t.ac.abort(be), t.ac = null;
	}), t.fn !== null && (t.teardown = g), ar(t, 0), In(t));
}
function Ot(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && or(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var kt = null, j = null, At = null, M = null, jt = null, Mt = !1, Nt = !1, Pt = null, Ft = null, It = 0, Lt = 1, Rt = class e {
	id = Lt++;
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
		kt === null ? kt = this : (kt.#n = this, this.#t = kt), kt = this;
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
			for (var r of n.d) A(r, S), t(r);
			for (r of n.m) A(r, C), t(r);
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
		for (let e of this.#u) this.#d.delete(e), A(e, S), this.schedule(e);
		for (let e of this.#d) A(e, C), this.schedule(e);
		this.apply();
		for (var t = Pt = [], n = [], r = Ft = []; this.#c.length > 0;) {
			It++ > 1e3 && (this.#S(), Bt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Wt(e), this.#h() || this.discard(), t;
			}
		}
		if (j = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Pt = null, Ft = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Ut(e, t);
			r.length > 0 && j.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), At = this, Vt(n), Vt(t), At = null, this.#s?.resolve();
			var o = j;
			if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
				if (o !== null) {
					for (let e of this.#c) o.#c.push(e);
					this.#c = [];
				} else o = this;
			}
			o !== null && (P.clear(), o.#_());
		}
	}
	#v(e, t, n) {
		e.f ^= x;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= x : i & 4 ? t.push(r) : er(r) && (i & 16 && this.#d.add(r), or(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), A(i, S), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), j = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) ut(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== w && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), M?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		j = this;
	}
	deactivate() {
		j = null, M = null;
	}
	flush() {
		try {
			Nt = !0, j = this, this.#_();
		} finally {
			It = 0, jt = null, Pt = null, Ft = null, Nt = !1, j = null, M = null, P.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(bt);
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
		this.#m || (this.#m = !0, k(() => {
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
		if (j === null) {
			let t = j = new e();
			!Nt && !Mt && k(() => {
				t.#e || t.flush();
			});
		}
		return j;
	}
	apply() {
		M = null;
	}
	schedule(e) {
		jt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? kt = e : t.#t = e, this.linked = !1;
		}
	}
};
function zt(e) {
	var t = Mt, n = At;
	At = null, Mt = !0;
	try {
		var r;
		for (e && (zt(), r = e());;) {
			if (st(), j === null) return r;
			j.flush();
		}
	} finally {
		Mt = t, At = n;
	}
}
function Bt() {
	try {
		Ue();
	} catch (e) {
		R(e, jt);
	}
}
var N = null;
function Vt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && er(r) && (N = /* @__PURE__ */ new Set(), or(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && zn(r), N?.size > 0)) {
				P.clear();
				for (let e of N) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) N.has(n) && (N.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || or(n);
					}
				}
				N.clear();
			}
		}
		N = null;
	}
}
function Ht(e) {
	j.schedule(e);
}
function Ut(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), A(e, x);
		for (var n = e.first; n !== null;) Ut(n, t), n = n.next;
	}
}
function Wt(e) {
	A(e, x);
	for (var t = e.first; t !== null;) Wt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Gt = /* @__PURE__ */ new Set(), P = /* @__PURE__ */ new Map(), Kt = !1;
function qt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Pe,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Jt(e, t) {
	let n = qt(e, t);
	return qn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Yt(e, t = !1, n = !0) {
	let r = qt(e);
	return t || (r.equals = Ie), Ye && n && O !== null && O.l !== null && (O.l.s ??= []).push(r), r;
}
function F(e, t, n = !1) {
	return U !== null && (!W || U.f & 131072) && it() && U.f & 4325394 && (J === null || !J.has(e)) && qe(), Qt(e, n ? rn(t) : t, Ft);
}
var Xt = null, Zt = 0;
function Qt(e, t, n = null) {
	if (!e.equals(t)) {
		H ? P.set(e, t) : P.has(e) || P.set(e, e.v);
		var r = Rt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Tt(t), M === null && lt(t);
		}
		e.wv = $n(), Xt = null, Zt = 0, nn(e, S, n), Xt = null, it() && K !== null && K.f & 1024 && !(K.f & 96) && (Z === null ? Jn([e]) : Z.push(e)), !r.is_fork && Gt.size > 0 && !Kt && $t();
	}
	return t;
}
function $t() {
	Kt = !1;
	for (let e of Gt) {
		e.f & 1024 && A(e, C);
		let t;
		try {
			t = er(e);
		} catch {
			t = !0;
		}
		t && or(e);
	}
	Gt.clear();
}
function en(e, t = 1) {
	var n = Q(e), r = t === 1 ? n++ : n--;
	return F(e, n), r;
}
function tn(e) {
	F(e, e.v + 1);
}
function nn(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = it(), a = r.length;
		if (Zt += a, Zt > 1e5 && Xt === null && (Xt = /* @__PURE__ */ new Set()), Xt !== null) {
			if (Xt.has(e)) return;
			Xt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== K) {
				var l = (c & S) === 0;
				if (l && A(s, t), c & 131072) Gt.add(s);
				else if (c & 2) {
					var u = s;
					M?.delete(u), nn(u, C, n);
				} else if (l) {
					var d = s;
					c & 16 && N !== null && N.add(d), n === null ? Ht(d) : n.push(d);
				}
			}
		}
	}
}
function rn(e) {
	if (typeof e != "object" || !e || de in e || fe in e) return e;
	let t = m(e);
	if (t !== f && t !== p) return e;
	var n = /* @__PURE__ */ new Map(), r = a(e), i = /* @__PURE__ */ Jt(0), o = null, s = Zn, c = (e) => {
		if (Zn === s) return e();
		var t = U, n = Zn;
		G(null), Qn(s);
		var r = e();
		return G(t), Qn(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ Jt(e.length, o)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Ge();
			var i = n.get(t);
			return i === void 0 ? c(() => {
				var e = /* @__PURE__ */ Jt(r.value, o);
				return n.set(t, e), e;
			}) : F(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = c(() => /* @__PURE__ */ Jt(w, o));
					n.set(t, e), tn(i);
				}
			} else F(r, w), tn(i);
			return !0;
		},
		get(t, r, i) {
			if (r === de) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || u(t, r)?.writable) && (a = c(() => /* @__PURE__ */ Jt(rn(s ? t[r] : w), o)), n.set(r, a)), a !== void 0) {
				var l = Q(a);
				return l === w ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = Q(i);
				if (a === w) return;
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
			var r = n.get(t), i = r !== void 0 && r.v !== w || Reflect.has(e, t);
			return (r !== void 0 || K !== null && (!i || u(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ Jt(i ? rn(e[t]) : w, o)), n.set(t, r)), Q(r) === w) ? !1 : i;
		},
		set(e, t, a, s) {
			var l = n.get(t), d = t in e;
			if (r && t === "length") for (var f = a; f < l.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ Jt(w, o)), n.set(f + "", p)) : F(p, w);
			}
			if (l === void 0) (!d || u(e, t)?.writable) && (l = c(() => /* @__PURE__ */ Jt(void 0, o)), F(l, rn(a)), n.set(t, l));
			else {
				d = l.v !== w;
				var m = c(() => rn(a));
				F(l, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, a), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && F(g, _ + 1);
				}
				tn(i);
			}
			return !0;
		},
		ownKeys(e) {
			Q(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== w;
			});
			for (var [r, a] of n) a.v !== w && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Ke();
		}
	});
}
function an(e) {
	try {
		if (typeof e == "object" && e && de in e) return e[de];
	} catch {}
	return e;
}
function on(e, t) {
	return Object.is(an(e), an(t));
}
var sn, cn, ln, un;
function dn() {
	if (sn === void 0) {
		sn = window, cn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		ln = u(t, "firstChild").get, un = u(t, "nextSibling").get, h(e) && (e[ge] = void 0, e[he] = null, e[_e] = void 0, e.__e = void 0), h(n) && (n[ve] = void 0);
	}
}
function I(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function L(e) {
	return ln.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function fn(e) {
	return un.call(e);
}
function pn(e, t) {
	if (!T) return /* @__PURE__ */ L(e);
	var n = /* @__PURE__ */ L(E);
	if (n === null) n = E.appendChild(I());
	else if (t && n.nodeType !== 3) {
		var r = I();
		return n?.before(r), D(r), r;
	}
	return t && bn(n), D(n), n;
}
function mn(e, t = !1) {
	if (!T) {
		var n = /* @__PURE__ */ L(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ fn(n) : n;
	}
	if (t) {
		if (E?.nodeType !== 3) {
			var r = I();
			return E?.before(r), D(r), r;
		}
		bn(E);
	}
	return E;
}
function hn(e, t = !1) {
	if (!T) return /* @__PURE__ */ L(e);
	var n = pn(e, t);
	return Ae(e), n;
}
function gn(e, t = 1, n = !1) {
	let r = T ? E : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ fn(r);
	if (!T) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = I();
			return r === null ? i?.after(a) : r.before(a), D(a), a;
		}
		bn(r);
	}
	return D(r), r;
}
function _n(e) {
	e.textContent = "";
}
function vn() {
	return !1;
}
function yn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function bn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function xn(e) {
	var t = K;
	if (t === null) return U.f |= ue, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	R(e, t);
}
function R(e, t) {
	if (e === Se) throw e;
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
function Sn(e) {
	K === null && (U === null && He(e), Ve()), H && Be(e);
}
function Cn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function z(e, t) {
	var n = K;
	n !== null && n.f & 8192 && (e |= ee);
	var r = {
		ctx: O,
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
	j?.register_created_effect(r);
	var i = r;
	if (e & 4) Pt === null ? Rt.ensure().schedule(r) : Pt.push(r);
	else if (t !== null) {
		try {
			or(r);
		} catch (e) {
			throw V(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ie));
	}
	if (i !== null && (i.parent = n, n !== null && Cn(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function wn() {
	return U !== null && !W;
}
function Tn(e) {
	let t = z(8, null);
	return A(t, x), t.teardown = e, t;
}
function En(e) {
	Sn("$effect");
	var t = K.f;
	if (!U && t & 32 && O !== null && !O.i) {
		var n = O;
		(n.e ??= []).push(e);
	} else return Dn(e);
}
function Dn(e) {
	return z(4 | oe, e);
}
function On(e) {
	return Sn("$effect.pre"), z(8 | oe, e);
}
function kn(e) {
	Rt.ensure();
	let t = z(64 | ae, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Bn(t, () => {
			V(t), n(void 0);
		}) : (V(t), n(void 0));
	});
}
function An(e) {
	return z(4, e);
}
function jn(e) {
	return z(le | ae, e);
}
function Mn(e, t = 0) {
	return z(8 | t, e);
}
function Nn(e, t = [], n = [], r = []) {
	ht(r, t, n, (t) => {
		z(8, () => {
			e(...t.map(Q));
		});
	});
}
function Pn(e, t = 0) {
	return z(16 | t, e);
}
function B(e) {
	return z(32 | ae, e);
}
function Fn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = H, r = U;
		Kn(!0), G(null);
		try {
			t.call(null);
		} catch (t) {
			R(t, e.parent);
		} finally {
			Kn(n), G(r);
		}
	}
}
function In(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && pt(() => {
			e.abort(be);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : V(n, t), n = r;
	}
}
function Ln(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || V(t), t = n;
	}
}
function V(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Rn(e.nodes.start, e.nodes.end), n = !0), e.f |= re, In(e, t && !n), ar(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Fn(e), e.f ^= re, e.f |= te;
	var i = e.parent;
	i !== null && i.first !== null && zn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Rn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ fn(e);
		e.remove(), e = n;
	}
}
function zn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Bn(e, t, n = !0) {
	var r = [];
	e.f |= 256, Vn(e, r, !0);
	var i = () => {
		n && V(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Vn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= ee;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Vn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Hn(e) {
	e.f &= -257, Un(e, !0);
}
function Un(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= ee, e.f & 1024 || (A(e, S), Rt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Un(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Wn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ fn(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Gn = null, H = !1;
function Kn(e) {
	H = e;
}
var U = null, W = !1;
function G(e) {
	U = e;
}
var K = null;
function q(e) {
	K = e;
}
var J = null;
function qn(e) {
	U !== null && (U.f & 2097152 || U.f & 2) && (J ??= /* @__PURE__ */ new Set()).add(e);
}
var Y = null, X = 0, Z = null;
function Jn(e) {
	Z = e;
}
var Yn = 1, Xn = 0, Zn = Xn;
function Qn(e) {
	Zn = e;
}
function $n() {
	return ++Yn;
}
function er(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (er(a) && Et(a), a.wv > e.wv) return !0;
		}
		t & 512 && M === null && A(e, x);
	}
	return !1;
}
function tr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(J !== null && J.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? tr(a, t, !1) : t === a && (n ? A(a, S) : a.f & 1024 && A(a, C), Ht(a));
	}
}
function nr(e) {
	var t = Y, n = X, r = Z, i = U, a = J, o = O, s = W, c = Zn, l = e.f;
	Y = null, X = 0, Z = null, U = l & 96 ? null : e, J = null, et(e.ctx), W = !1, Zn = ++Xn, e.ac !== null && (pt(() => {
		e.ac.abort(be);
	}), e.ac = null);
	try {
		e.f |= ce;
		var u = e.fn, d = u();
		e.f |= ne;
		var f = rr(e);
		if (it() && Z !== null && !W && f !== null && !(e.f & 6146)) for (var p = 0; p < Z.length; p++) tr(Z[p], e);
		if (i !== null && i !== e) {
			if (Xn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Xn;
			if (t !== null) for (let e of t) e.rv = Xn;
			Z !== null && (r === null ? r = Z : r.push(...Z));
		}
		return e.f & 8388608 && (e.f ^= ue), d;
	} catch (t) {
		return rr(e), xn(t);
	} finally {
		e.f ^= ce, Y = t, X = n, Z = r, U = i, J = a, et(o), W = s, Zn = c;
	}
}
function rr(e) {
	var t = e.deps, n = j?.is_fork;
	if (Y !== null) {
		var r;
		if (n || ar(e, X), t !== null && X > 0) for (t.length = X + Y.length, r = 0; r < Y.length; r++) t[X + r] = Y[r];
		else e.deps = t = Y;
		if (wn() && e.f & 512) for (r = X; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && X < t.length && (ar(e, X), t.length = X);
	return t;
}
function ir(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = o.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (Y === null || !s.call(Y, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512), a.v !== w && lt(a), a.ac !== null && pt(() => {
			a.ac.abort(be), a.ac = null, A(a, S);
		}), Dt(a), ar(a, 0);
	}
}
function ar(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ir(e, n[r]);
}
function or(e) {
	var t = e.f;
	if (!(t & 16384)) {
		A(e, x);
		var n = K;
		K = e;
		try {
			t & 16777232 ? Ln(e) : In(e), Fn(e);
			var r = nr(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = Yn;
		} finally {
			K = n;
		}
	}
}
async function sr() {
	await Promise.resolve(), zt();
}
function Q(e) {
	var t = !!(e.f & 2);
	if (Gn?.add(e), U !== null && !W && !(K !== null && K.f & 16384) && (J === null || !J.has(e))) {
		var n = U.deps;
		if (U.f & 2097152) e.rv < Xn && (e.rv = Xn, Y === null && n !== null && n[X] === e ? X++ : Y === null ? Y = [e] : Y.push(e));
		else {
			U.deps ??= [], s.call(U.deps, e) || U.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [U] : s.call(r, U) || r.push(U);
		}
	}
	if (H && P.has(e)) return P.get(e);
	if (t) {
		var i = e;
		if (H) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || lr(i)) && (a = Tt(i)), P.set(i, a), a;
		}
		var o = !(i.f & 512) && !W && U !== null && !!(U.f & 512), c = (i.f & ne) === 0;
		er(i) && (o && (i.f |= 512), Et(i)), o && !c && (Ot(i), cr(i));
	}
	if (M?.has(e)) return M.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function cr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : s.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (Ot(n), cr(n));
	}
}
function lr(e) {
	if (e.v === w) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (P.has(t) || t.f & 2 && lr(t)) return !0;
	return !1;
}
function ur(e) {
	var t = W;
	try {
		return W = !0, e();
	} finally {
		W = t;
	}
}
function dr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (de in e) fr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && de in n && fr(n);
		}
	}
}
function fr(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			fr(e[n], t);
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
var pr = ["touchstart", "touchmove"];
function mr(e) {
	return pr.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var hr = Symbol("events"), gr = /* @__PURE__ */ new Set(), _r = /* @__PURE__ */ new Set();
function vr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || wr.call(t, e), !e.cancelBubble) return pt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, k(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function yr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = vr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Tn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function br(e, t, n) {
	(t[hr] ??= {})[e] = n;
}
function xr(e) {
	for (var t = 0; t < e.length; t++) gr.add(e[t]);
	for (var n of _r) n(e);
}
var Sr = null, Cr = !1;
function wr(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Sr = e, Cr || (Cr = !0, setTimeout(() => {
		Cr = !1, Sr = null;
	}));
	var o = 0, s = Sr === e && e[hr];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[hr] = t;
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
		var d = U, f = K;
		G(null), q(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[hr]?.[r];
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
			e[hr] = t, delete e.currentTarget, G(d), q(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Tr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Er(e) {
	return Tr?.createHTML(e) ?? e;
}
function Dr(e) {
	var t = yn("template");
	return t.innerHTML = Er(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function $(e, t) {
	var n = K;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function Or(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (T) return $(E, null), E;
		i === void 0 && (i = Dr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ L(i)));
		var t = r || cn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ L(t), s = t.lastChild;
			$(o, s);
		} else $(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function kr(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (T) return $(E, null), E;
		if (!o) {
			var e = /* @__PURE__ */ L(Dr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ L(e);) o.appendChild(/* @__PURE__ */ L(e));
			else o = /* @__PURE__ */ L(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ L(t), r = t.lastChild;
			$(n, r);
		} else $(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Ar(e, t) {
	return /* @__PURE__ */ kr(e, t, "svg");
}
function jr(e = "") {
	if (!T) {
		var t = I(e + "");
		return $(t, t), t;
	}
	var n = E;
	return n.nodeType === 3 ? bn(n) : (n.before(n = I()), D(n)), $(n, n), n;
}
function Mr() {
	if (T) return $(E, null), E;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = I();
	return e.append(t, n), $(t, n), e;
}
function Nr(e, t) {
	if (T) {
		var n = K;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = E), ke();
	} else e !== null && e.before(t);
}
function Pr() {
	if (T && E && E.nodeType === 8 && E.textContent?.startsWith("$")) {
		let e = E.textContent.substring(1);
		return ke(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Fr(e) {
	let t = 0, n = qt(0), r;
	return () => {
		wn() && (Q(n), Mn(() => (t === 0 && (r = ur(() => e(() => tn(n)))), t += 1, () => {
			k(() => {
				--t, t === 0 && (r?.(), r = void 0, tn(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ir = ie | ae;
function Lr(e, t, n, r) {
	new Rr(e, t, n, r);
}
var Rr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = T ? E : null;
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
	#h = Fr(() => (this.#m = qt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = K;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = K.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Pn(() => {
			if (T) {
				let e = Ne(this.#t);
				ke();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Ir), T && (this.#e = E);
	}
	#g() {
		try {
			this.#a = B(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		k(r), t && (this.#s = B(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? De() : (t = !0, n && Je(), this.#s !== null && Bn(this.#s, () => {
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
					R(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (te | re)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = B(() => e(this.#e)), k(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = I(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return B(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							R(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(j)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Bn(this.#o, () => {
					this.#o = null;
				}), this.#S(j));
			}
		}));
	}
	#x() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = B(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Wn(this.#a, e);
				let t = this.#n.pending;
				this.#o = B(() => t(this.#e));
			} else this.#S(j);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		ut(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = K, n = U, r = O;
		q(this.#i), G(this.#i), et(this.#i.ctx);
		try {
			return Rt.ensure(), e();
		} finally {
			q(t), G(n), et(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && Bn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, k(() => {
			this.#d = !1, this.#m && Qt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), Q(this.#m);
	}
	error(e) {
		if (e === Se || !this.#n.onerror && !this.#n.failed) throw e;
		j?.is_fork ? (this.#a && j.skip_effect(this.#a), this.#o && j.skip_effect(this.#o), this.#s && j.skip_effect(this.#s), j.oncommit(() => {
			this.#y() || this.#T(e);
		})) : this.#T(e);
	}
	#T(e) {
		this.#a &&= (V(this.#a), null), this.#o &&= (V(this.#o), null), this.#s &&= (V(this.#s), null), T && (D(this.#t), je(), D(Me()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return B(() => {
						var r = K;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return R(e, this.#i.parent), null;
				}
			}));
		};
		k(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					R(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => R(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function zr(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ve] ??= e.nodeValue) && (e[ve] = n, e.nodeValue = `${n}`);
}
function Br(e, t) {
	return Hr(e, t);
}
var Vr = /* @__PURE__ */ new Map();
function Hr(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	dn();
	var l = void 0, u = kn(() => {
		var o = n ?? t.appendChild(I());
		Lr(o, { pending: () => {} }, (t) => {
			tt({});
			var n = O;
			if (a && (n.c = a), i && (r.$$events = i), T && $(t, null), l = e(t, r) || rt(), T && (K.nodes.end = E, E === null || E.nodeType !== 8 || E.data !== "]")) throw Te(), Se;
			nt();
		}, s);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = mr(r);
					for (let e of [t, document]) {
						var a = Vr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Vr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, wr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(c(gr)), _r.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Vr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, wr), r.delete(e), r.size === 0 && Vr.delete(n)) : r.set(e, i);
			}
			_r.delete(d), o !== n && o.parentNode?.removeChild(o);
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
			if (n) Hn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Hn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (V(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Wn(r, t), t.append(I()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else V(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Bn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (V(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = j, r = vn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = I();
				i.append(a), this.#n.set(e, {
					effect: B(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, B(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else T && (this.anchor = E), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Gr(e, t, n = !1) {
	var r;
	T && (r = E, ke());
	var i = new Wr(e), a = n ? ie : 0;
	function o(e, t) {
		if (T) {
			var n = Ne(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Me();
				D(a), i.anchor = a, Oe(!1), i.ensure(e, t), Oe(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Pn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Kr = Symbol("NaN");
function qr(e, t, n) {
	T && ke();
	var r = new Wr(e), i = !it();
	Pn(() => {
		var e = t();
		e !== e && (e = Kr), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Jr(e, t) {
	return t;
}
function Yr(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Bn(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Xr(e, c(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			_n(d), d.append(u), e.items.clear();
		}
		Xr(e, t, !l);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Xr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= se, Wn(a, document.createDocumentFragment())) : V(t[i], n);
	}
}
var Zr;
function Qr(e, t, n, r, i, o = null) {
	var s = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		s = T ? D(/* @__PURE__ */ L(u)) : u.appendChild(I());
	}
	T && ke();
	var d = null, f = /* @__PURE__ */ Ct(() => {
		var e = n();
		return a(e) ? e : e == null ? [] : c(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = Q(f);
			_.fallback = d, ei(_, n, s, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= se, ni(d, null, s)) : Hn(d) : Bn(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: Pn(() => {
			var e = Q(f), a = e.length;
			let c = !1;
			T && Ne(s) === "[!" != (a === 0) && (s = Me(), D(s), Oe(!1), c = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = j, v = vn(), y = 0; y < a; y += 1) {
				T && E.nodeType === 8 && E.data === "]" && (s = E, c = !0, Oe(!1));
				var b = e[y], x = r(b, y), S = m ? null : l.get(x);
				S ? (S.v && Qt(S.v, b), S.i && Qt(S.i, y), v && _.unskip_effect(S.e)) : (S = ti(l, m ? s : Zr ??= I(), b, x, y, i, t, n), m || (S.e.f |= se), l.set(x, S)), u.add(x);
			}
			if (a === 0 && o && !d && (m ? d = B(() => o(s)) : (d = B(() => o(Zr ??= I())), d.f |= se)), a > u.size && ze("", "", ""), T && a > 0 && D(Me()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			c && Oe(!0), Q(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, T && (s = E);
}
function $r(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function ei(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, l = $r(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (a) for (v = 0; v < o; v += 1) h = t[v], g = i(h, v), _ = s.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (h = t[v], g = i(h, v), _ = s.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Hn(_), a && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= se, _ === l) ni(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ri(e, d, _), ri(e, _, y), ni(_, y, n), d = _, p = [], m = [], l = $r(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) ni(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					ri(e, S.prev, C.next), ri(e, d, S), ri(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), ni(_, l, n), ri(e, _.prev, _.next), ri(e, _, d === null ? e.effect.first : d.next), ri(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = $r(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = $r(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Xr(e, c(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = $r(l.next);
		var te = ee.length;
		if (te > 0) {
			var ne = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.fix();
			}
			Yr(e, ee, ne);
		}
	}
	a && k(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function ti(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? qt(n) : /* @__PURE__ */ Yt(n, !1, !1) : null, l = o & 2 ? qt(i) : null;
	return {
		v: c,
		i: l,
		e: B(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ni(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ fn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ri(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ii(e, t, ...n) {
	var r = new Wr(e);
	Pn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, ie);
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function ai(e, t, n) {
	var r;
	T && (r = E, ke());
	var i = new Wr(e);
	Pn(() => {
		var e = t() ?? null;
		if (T && Ne(r) === "[" != (e !== null)) {
			var a = Me();
			D(a), i.anchor = a, Oe(!1), i.ensure(e, e && ((t) => n(t, e))), Oe(!0);
		} else i.ensure(e, e && ((t) => n(t, e)));
	}, ie);
}
// node_modules/clsx/dist/clsx.mjs
function oi(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = oi(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function si() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = oi(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/svelte/src/internal/shared/attributes.js
function ci(e) {
	return typeof e == "object" ? si(e) : e ?? "";
}
var li = [..." 	\n\r\f\xA0\v﻿"];
function ui(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || li.includes(r[o - 1])) && (s === r.length || li.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function di(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function fi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function pi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(fi)), i && c.push(...Object.keys(i).map(fi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = fi(e.substring(l, u).trim());
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
		return r && (n += di(r)), i && (n += di(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function mi(e, t, n, r, i, a) {
	var o = e[ge];
	if (T || o !== n || o === void 0) {
		var s = ui(n, r, a);
		T && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ge] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function hi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function gi(e, t, n, r) {
	var i = e[_e];
	if (T || i !== t) {
		var a = pi(t, r);
		T && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[_e] = t;
	} else r && (Array.isArray(r) ? (hi(e, n?.[0], r[0]), hi(e, n?.[1], r[1], "important")) : hi(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function _i(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function vi(e, t) {
	var n = e.__defaultValue, r = e.multiple, i = r ? n ?? [] : null;
	if (!r || a(i)) {
		var o = e.selectedIndex, s = t && r ? new Set(e.selectedOptions) : null;
		for (var c of e.options) {
			var l = Si(c);
			_i(c, r ? i.includes(l) : on(l, n));
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
function yi(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!a(t)) return Ee();
		for (var r of e.options) r.selected = t.includes(Si(r));
	} else {
		for (r of e.options) if (on(Si(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function bi(e) {
	var t = new MutationObserver((t) => {
		t.every(Ci) || ("__defaultValue" in e && vi(e, !1), "__value" in e && yi(e, e.__value));
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Tn(() => {
		t.disconnect();
	});
}
function xi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	mt(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Si);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Si(o);
		}
		n(a), e.__value = a, j !== null && r.add(j);
	}), An(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = j;
			if (r.has(o)) return;
		}
		if (yi(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = Si(s), n(a));
		}
		e.__value = a, i = !1;
	});
}
function Si(e) {
	return "__value" in e ? e.__value : e.value;
}
function Ci(e) {
	if (e.target.closest("selectedcontent") !== null) return !0;
	if (e.type === "childList") {
		var t = [...e.addedNodes, ...e.removedNodes];
		return t.length > 0 && t.every((e) => e.nodeName === "SELECTEDCONTENT");
	}
	return !1;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var wi = Symbol("is custom element"), Ti = Symbol("is html"), Ei = xe ? "link" : "LINK", Di = xe ? "progress" : "PROGRESS";
function Oi(e) {
	if (T) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Ai(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Ai(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ye] = n, k(n), ft();
	}
}
function ki(e, t) {
	var n = ji(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Di) && (e.value = t ?? "");
}
function Ai(e, t, n, r) {
	var i = ji(e);
	T && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Ei) || i[t] !== (i[t] = n) && (t === "loading" && (e[me] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ni(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function ji(e) {
	return e[he] ??= {
		[wi]: e.nodeName.includes("-"),
		[Ti]: e.namespaceURI === Ce
	};
}
var Mi = /* @__PURE__ */ new Map();
function Ni(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Mi.get(t);
	if (n) return n;
	Mi.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = d(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = m(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Pi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	mt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = zi(e) ? Bi(a) : a, n(a), j !== null && r.add(j), await sr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (T && e.defaultValue !== e.value || ur(t) == null && e.value) && (n(zi(e) ? Bi(e.value) : e.value), j !== null && r.add(j)), Mn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = j;
			if (r.has(i)) return;
		}
		zi(e) && n === Bi(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
var Fi = /* @__PURE__ */ new Set();
function Ii(e, t, n, r, i = r) {
	var a = n.getAttribute("type") === "checkbox", o = e;
	let s = !1;
	if (t !== null) for (var c of t) o = o[c] ??= [];
	o.push(n), mt(n, "change", () => {
		var e = n.__value;
		a && (e = Ri(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), Mn(() => {
		var e = r();
		T && n.defaultChecked !== n.checked ? s = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = on(n.__value, e);
	}), Tn(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), Fi.has(o) || (Fi.add(o), k(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), Fi.delete(o);
	})), k(() => {
		if (s) {
			var e = a ? Ri(o, e, n.checked) : o.find((e) => e.checked)?.__value;
			i(e);
		}
	});
}
function Li(e, t, n = t) {
	mt(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (T && e.defaultChecked !== e.checked || ur(t) == null) && n(e.checked), Mn(() => {
		e.checked = !!t();
	});
}
function Ri(e, t, n) {
	for (var r = /* @__PURE__ */ new Set(), i = 0; i < e.length; i += 1) e[i].checked && r.add(e[i].__value);
	return n || r.delete(t), Array.from(r);
}
function zi(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Bi(e) {
	return e === "" ? null : +e;
}
var Vi = /* @__PURE__ */ new class e {
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
function Hi(e, t, n) {
	var r = Vi.observe(e, () => n(e[t]));
	An(() => (ur(() => n(e[t])), r));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Ui(e, t) {
	return e === t || e?.[de] === t;
}
function Wi(e = rt(), t, n, r) {
	var i = O.r, a = K;
	return An(() => {
		var o, s;
		return Mn(() => {
			o = s, s = r?.() || [], ur(() => {
				Ui(n(...s), e) || (t(e, ...s), o && Ui(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Ui(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
function Gi(e, t, n = t) {
	var r = e === "x", i = () => pt(() => {
		a = !0, clearTimeout(o), o = setTimeout(s, 100), n(window[r ? "scrollX" : "scrollY"]);
	});
	addEventListener("scroll", i, { passive: !0 });
	var a = !1, o, s = () => {
		a = !1;
	}, c = !0;
	Mn(() => {
		var e = t();
		c ? c = !1 : !a && e != null && (a = !0, clearTimeout(o), r ? scrollTo(e, window.scrollY) : scrollTo(window.scrollX, e), o = setTimeout(s, 100));
	}), An(i), Tn(() => {
		removeEventListener("scroll", i);
	});
}
// node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function Ki(e = !1) {
	let t = O, n = t.l.u;
	if (!n) return;
	let r = () => dr(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ yt(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => Q(i);
	}
	n.b.length && On(() => {
		qi(t, r), v(n.b);
	}), En(() => {
		let e = ur(() => n.m.map(_));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && En(() => {
		qi(t, r), v(n.a);
	});
}
function qi(e, t) {
	if (e.l.s) for (let t of e.l.s) Q(t);
	t();
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var Ji = !1;
function Yi(e) {
	var t = Ji;
	try {
		return Ji = !1, [e(), Ji];
	} finally {
		Ji = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function Xi(e, t, n, r) {
	var i = !Ye || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, d = () => o && i ? (l ??= /* @__PURE__ */ yt(r), Q(l)) : (c && (c = !1, s = o ? ur(r) : r), s);
	let f;
	if (a) {
		var p = de in e || pe in e;
		f = u(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = Yi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && We(t), f(m)));
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
	var v = !1, y = (n & 1 ? yt : Ct)(() => (v = !1, g()));
	a && Q(y);
	var b = K;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? Q(y) : i && a ? rn(e) : e;
			return F(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return H && v || b.f & 16384 ? y.v : Q(y);
	});
}
function Zi(e) {
	O === null && Le("onMount"), Ye && O.l !== null ? Qi(O).m.push(e) : En(() => {
		let t = ur(e);
		if (typeof t == "function") return t;
	});
}
function Qi(e) {
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
var $i = (e) => Math.min(1, Math.max(0, e)), ea = (e) => String(e).padStart(2, "0"), ta = (e, t) => t > 0 ? $i(e / t) : 1, na = (e) => e.workouts ?? e.gym ?? 0, ra = (e) => [
	e.goal.runs,
	na(e.goal),
	e.goal.active_days ?? 0
], ia = (e) => [
	e.runs,
	na(e),
	e.active_days ?? 0
], aa = (e) => ia(e).map((t, n) => ta(t, ra(e)[n])), oa = (e) => e.toLocaleString("en-US");
function sa(e, t) {
	if (e == null) return null;
	let n = t > 0 ? e >= t ? " · Active day ✓" : ` · ${oa(t - e)} to go` : "";
	return `👟 ${oa(e)} steps today${n}`;
}
function ca(e, t) {
	let n = (e) => e ? " ✓" : "", r = ([e, n]) => {
		let r = t[e];
		if (n) return `${r?.name ?? e} ✓`;
		let i = r ? ra(r.week) : [], a = r ? ia(r.week) : [];
		return `${r?.name ?? e} ${i.filter((e, t) => e > 0 && a[t] >= e).length} of ${i.filter((e) => e > 0).length}`;
	};
	if (e.mode === "team") return `${e.team.done} of ${e.team.target} team points${n(e.met)}`;
	let i = Object.entries(e.members_met).map(r);
	return e.mode === "together" && i.push(`${e.together.done} of ${e.together.target} together${n(e.together.done >= e.together.target)}`), i.join(" · ");
}
function la(e) {
	if (!e.reward) return null;
	if (e.met) return `${e.reward} unlocked!`;
	let t = {
		own: "you both make your goals",
		together: `you both make your goals and do ${e.together.target} together`,
		team: `you reach ${e.team.target} team points`
	};
	return `${e.reward}: unlocks when ${t[e.mode]}`;
}
function ua(e) {
	let t = e.xp - e.level_floor, n = e.next_level_xp - e.level_floor;
	return {
		level: e.level,
		into: t,
		span: n,
		frac: n > 0 ? $i(t / n) : 1
	};
}
var da = (e) => `Week ${Number(e.week.split("-W")[1])} · ${e.days_left} ${e.days_left === 1 ? "day" : "days"} left`;
function fa(e, t, n = 15) {
	let r = new Date(e);
	return t - r > n * 6e4 ? `Updated ${ea(r.getHours())}:${ea(r.getMinutes())}` : null;
}
var pa = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], ma = [
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
function ha(e, t = !0) {
	let n = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(e);
	if (!n) return "";
	let [, r, i, a, o] = n, s = `${pa[new Date(Date.UTC(r, i - 1, a)).getUTCDay()]} ${Number(a)} ${ma[i - 1]}`;
	return t ? `${s}, ${o}` : s;
}
var ga = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${ea(e % 60)} min` : `${e / 60} h`, _a = {
	short: "Too short",
	easy: "Too easy",
	type: "Type not counted",
	no_gps: "No GPS"
}, va = (e) => String(Math.round(e * 10) / 10), ya = (e) => {
	let t = e.check;
	return e.needs_review ? {
		text: "Review",
		tone: "warn"
	} : t?.planned === 0 && t.planned_km ? {
		text: `${va(e.km ?? 0)} of ${va(t.planned_km)} km`,
		tone: "plain"
	} : t?.planned === 0 ? null : t?.state === "match" ? {
		text: `${t.found}/${t.planned} blocks`,
		tone: "plain"
	} : t?.state === "indoor" ? {
		text: "indoor",
		tone: "plain"
	} : null;
}, ba = (e) => ({
	title: e.name,
	when: ha(e.start, e.kind !== "active_day"),
	duration: e.kind === "active_day" ? `${oa(e.steps)} steps` : ga(e.minutes),
	xp: e.xp ? `+${e.xp}` : "",
	label: _a[e.reason] ?? null,
	plan: e.plan && e.caught_up ? `${e.plan} · caught up` : e.plan,
	chip: ya(e),
	removable: e.kind === "active_day" ? null : e.excluded ? "restore" : e.key.startsWith("manual:") ? "delete" : "remove"
});
function xa(e, t) {
	let n = new Set(e.map((e) => e.key));
	return [...e, ...t.filter((e) => !n.has(e.key))];
}
var Sa = (e, t, n) => e.flatMap((e) => {
	let r = n[`${t}/${e.key}`];
	return r === null ? [] : r === void 0 ? [e] : [{
		...e,
		excluded: r
	}];
}), Ca = (e, t) => (/* @__PURE__ */ new Date(Date.parse(`${e}T00:00:00Z`) - t * 864e5)).toISOString().slice(0, 10), wa = (e) => Math.round(e / 30) / 2, Ta = (e) => `${wa(e)} min`;
function Ea(e) {
	let t = ([e, t]) => `${Ta(t)} ${e}`, n = e?.steps?.length ? e.times > 1 ? `${e.times} × (${e.steps.map(t).join(" + ")})` : e.steps.map(t).join(" → ") : e?.target?.type === "distance" ? `${va(e.target.km)} km run` : e?.target?.type === "none" ? "Any run" : null;
	return n ? [
		e.warmup_s > 0 && `${Ta(e.warmup_s)} warm-up walk`,
		n,
		e.cooldown_s > 0 && `${Ta(e.cooldown_s)} cool-down walk`,
		e.note
	].filter(Boolean).join(" · ") : "";
}
function Da(e, t = null, n = null) {
	if (e.state === "none") return `No track to check · ${e.planned_km ? "counts by distance" : e.planned ? "counts by duration" : "any run counts"}`;
	if (e.state === "indoor") return t == null ? "Indoor run" : `Indoor: ${t.toFixed(1)} km/h average`;
	let r = e.state === "match" ? "matches" : "doesn't match";
	return e.planned === 0 ? `${e.planned_km ? `${va(n ?? 0)} of ${va(e.planned_km)} km` : "Any run"} · ${r} ${e.label}` : `${e.found} of ${e.planned} run blocks · ${wa(e.run_s)} of ${Ta(e.planned_run_s)} running · ${r} ${e.label}`;
}
function Oa(e) {
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
function ka(e) {
	let t = e.weeks.map((e) => e.sessions.length * (e.repeat ?? 1)), n = Math.min(...t), r = Math.max(...t), i = e.weeks.length, a = `${i} ${i === 1 ? "week" : "weeks"}`, o = n === r ? `${a} × ${n} ${n === 1 ? "run" : "runs"}` : `${a} · ${n}-${r} runs a week`;
	return e.loop ? `${o} · repeats` : o;
}
var Aa = (e) => JSON.parse(JSON.stringify(e)), ja = (e) => e.map((e) => ({ sessions: Array.from({ length: e.repeat ?? 1 }, () => e.sessions).flat().map(Aa) })), Ma = (e) => Math.round(((e.warmup_s ?? 0) + e.intervals.reduce((e, [, t]) => e + t, 0) + (e.cooldown_s ?? 0)) / 60), Na = (e) => ({
	...e,
	cooldown_s: e.cooldown_s ?? 0,
	steps: e.intervals ?? [],
	times: e.times ?? 1,
	note: e.note || null,
	intervals: Array.from({ length: e.times ?? 1 }, () => e.intervals ?? []).flat()
}), Pa = (e) => ({
	warmup_s: e.warmup_s ?? 0,
	cooldown_s: e.cooldown_s ?? 0,
	intervals: Aa(e.intervals ?? []),
	times: e.times ?? 1,
	target: {
		type: e.target?.type ?? "duration",
		km: e.target?.km ?? 5
	},
	note: e.note ?? ""
});
function Fa(e) {
	let t = e.target.type === "distance";
	return {
		warmup_s: e.warmup_s,
		cooldown_s: e.cooldown_s,
		...!t && e.intervals.length && {
			intervals: e.intervals,
			times: e.times
		},
		target: t ? {
			type: "distance",
			km: e.target.km
		} : { type: e.target.type },
		...e.note.trim() && { note: e.note.trim() }
	};
}
function Ia(e, t) {
	let n = Object.hasOwn(t, e.person) ? e.person : null;
	return {
		self: n,
		others: Object.keys(t).filter((e) => e !== n)
	};
}
var La = (e) => `${Number(e.slice(8, 10))} ${ma[Number(e.slice(5, 7)) - 1]}`;
function Ra(e, t, n) {
	let r = t.find((t) => t.key === e.key);
	return n - e.at > 6e5 || !r || e.want !== null && r.excluded === e.want;
}
function za(e, t, n) {
	let r = (e[t] ?? Promise.resolve()).then(n), i = e[t] = r.catch(() => {});
	return i.then(() => e[t] === i && delete e[t]), r;
}
function Ba(e) {
	let t = (e) => e < 10 ? e.toFixed(1) : Math.round(e).toLocaleString(), n = e.km == null ? "unknown" : e.km >= e.limit ? "replace" : e.km >= .9 * e.limit ? "soon" : "ok", r = e.last_run ? new Date(e.last_run) : null, i = e.runs ? `${e.runs} ${e.runs === 1 ? "run" : "runs"}` : e.runs === 0 ? "No runs yet" : "";
	return {
		name: e.name,
		km: e.km == null ? "—" : `${t(e.km)} / ${t(e.limit)} km`,
		frac: e.km == null ? 0 : $i(e.km / e.limit),
		state: n,
		label: {
			soon: "Replace soon",
			replace: "Replace"
		}[n] ?? null,
		detail: [i, r && `last run ${r.getDate()} ${ma[r.getMonth()]}`].filter(Boolean).join(" · ")
	};
}
var Va = {
	name: [1, 40],
	replace_at_km: [
		100,
		3e3,
		10
	]
}, Ha = (e, t) => !!t && (e.run_shoes !== void 0 || (e.shoes ?? []).some((e) => e.id != null));
function Ua(e, t, { partial: n = !1 } = {}) {
	let r = {};
	if (!(n && e === void 0)) {
		let t = String(e ?? "").trim();
		if (t.length < Va.name[0]) return { error: "Give the shoe a name" };
		if (t.length > Va.name[1]) return { error: `A name of at most ${Va.name[1]} characters` };
		r.name = t;
	}
	if (!(n && t === void 0)) {
		let [e, n] = Va.replace_at_km, i = typeof t == "number" ? t : t === null || String(t).trim() === "" ? NaN : Number(t);
		if (!(i >= e && i <= n)) return { error: `Replace at: ${e} to ${n} km` };
		r.replace_at_km = i;
	}
	return r;
}
function Wa(e, t) {
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
var Ga = {
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
}, Ka = [
	"runs",
	"workouts",
	"active_days",
	"steps"
], qa = {
	runs: 0,
	workouts: 0,
	active_days: 0,
	steps: 1e4
};
function Ja(e, t) {
	let [n, r, i] = Ga[e];
	return Math.min(r, Math.max(n, Math.round(t / i) * i));
}
function Ya(e, t) {
	let n = e.pending ?? e.current, r = (t) => n?.people?.[t] ?? e.defaults?.[t] ?? {};
	return {
		people: Object.fromEntries(Object.keys(t).map((e) => {
			let t = r(e);
			return [e, Object.fromEntries(Ka.map((e) => [e, Ja(e, t[e] ?? qa[e])]))];
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
var Xa = (e) => e ? `Max HR ${e.bpm} · ${e.source === "measured" && e.date ? `measured ${La(e.date)}` : e.source}` : "—";
function Za(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return t.setUTCDate(t.getUTCDate() + 3 - (t.getUTCDay() + 6) % 7), Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5 + 1) / 7);
}
var Qa = (e, t) => Ka.every((n) => (n === "workouts" ? na(t) : t[n]) === e[n]), $a = (e, t, n) => n - e.at > 6e5 || Object.entries(e.entry.people).every(([e, n]) => !t[e] || Qa(n, t[e].week.goal));
function eo(e, t) {
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
var to = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${ea(e.getMonth() + 1)}-${ea(e.getDate())}`;
function no(e, t, n) {
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
function ro(e) {
	let t = e.filter((e) => e.active).length;
	return `${t} active ${t === 1 ? "day" : "days"} · ${oa(e.reduce((e, t) => e + (t.steps ?? 0), 0))} steps`;
}
var io = (e) => `${e.w} ${e.unit} × ${e.r}`, ao = [
	"Chest",
	"Back",
	"Shoulders",
	"Arms",
	"Legs",
	"Core",
	"Other"
], oo = (e) => ao.map((t) => ({
	group: t,
	lifts: (e ?? []).filter((e) => (ao.includes(e.group) ? e.group : "Other") === t)
})).filter((e) => e.lifts.length), so = (e) => oo(e).map(({ group: e, lifts: t }) => ({
	group: e,
	count: t.length,
	lift: [...t].sort((e, t) => (t.sessions ?? 0) - (e.sessions ?? 0) || t.date.localeCompare(e.date) || e.name.localeCompare(t.name))[0]
})), co = (e) => oo(e).map(({ group: e, lifts: t }) => ({
	group: e,
	lifts: [...t].sort((e, t) => e.name.localeCompare(t.name))
})), lo = (e) => `${Math.floor(e / 60)}:${ea(e % 60)}`, uo = (e) => new Set([...(e?.lifts ?? []).map((e) => e.key), e?.fastest_1k?.key].filter(Boolean)), fo = (e, t) => !!t && t.last_received == null && !e.feed.length, po = (e, t) => [.../* @__PURE__ */ new Set([e.person, ...e.can_connect ?? []])].filter((e) => Object.hasOwn(t, e)), mo = {
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
}, ho = {
	iphone: "In Get Contents of URL add a header: key Authorization, value Bearer, a space, then your token.",
	android: "In the HTTP request block set Request headers to {\"Authorization\": \"Bearer TOKEN\"}, with your token in place of TOKEN."
};
function go(e, t = !1) {
	let n = mo[e];
	return n ? t ? {
		...n,
		steps: [...n.steps, ho[e]]
	} : n : {
		title: "Which phone do you have?",
		steps: []
	};
}
function _o(e) {
	return e?.invite ? {
		before: `${e.in_ha ? `Open openGym from the Home Assistant sidebar in Chrome, not in the Home Assistant app (${e.url}). Choose` : `Open openGym at ${e.url}, choose`} Create new profile, enter code `,
		code: e.invite,
		after: ", then Add to Home Screen. Does openGym show someone else? Sign out there first."
	} : null;
}
function vo(e, t, n = null) {
	if (e.last_received == null) return {
		state: "waiting",
		text: n?.feed?.length ? "No upload since this update" : "Waiting for the first workout"
	};
	let r = new Date(e.last_received);
	return {
		state: "connected",
		text: `Connected · last workout received ${r.toDateString() === t.toDateString() ? "today" : `${r.getDate()} ${ma[r.getMonth()]}`}, ${ea(r.getHours())}:${ea(r.getMinutes())}`
	};
}
// src/lib/details.js
var yo = (e) => String(e).padStart(2, "0"), bo = (e) => /T(\d+:\d+)/.exec(e ?? "")?.[1] ?? "";
function xo(e) {
	let t = Math.round(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60);
	return n ? `${n}:${yo(r)}:${yo(t % 60)}` : `${r}:${yo(t % 60)}`;
}
var So = (e) => e.summary.kind === "run" || e.summary.kind === "walk", Co = (e) => !!e.route?.length && !So(e), wo = (e) => e ? 3600 / e : null, To = (e) => ({
	title: e.name,
	date: ha(e.start, !1),
	time: e.end ? `${bo(e.start)}–${bo(e.end)}` : bo(e.start),
	duration: ga(e.minutes),
	plan: e.plan ?? null
});
function Eo(e) {
	let t = e.summary, n = t.km > 0 ? t.km : null, r = n && So(e) ? Math.round(t.minutes * 60 / n) : null;
	return [
		["Distance", n && `${n.toFixed(1)} km`],
		["Pace", r && `${xo(r)} /km`],
		["Speed", n && Co(e) && `${(n / (t.minutes / 60)).toFixed(1)} km/h`],
		["Elevation gain", e.gain_m != null && `${Math.round(e.gain_m)} m`],
		["Avg heart rate", t.avg_hr != null && `${Math.round(t.avg_hr)} bpm`],
		["Max heart rate", t.max_hr != null && `${Math.round(t.max_hr)} bpm`],
		["Calories", t.kcal != null && `${Math.round(t.kcal)} kcal`],
		["Shoe", t.kind === "run" && t.shoe?.name]
	].filter(([, e]) => e);
}
function Do(e) {
	let t = Co(e);
	return e.splits.map((e, n) => ({
		km: e.km === 1 ? String(n + 1) : `${e.km} km`,
		time: xo(e.s),
		pace: e.pace ? t ? wo(e.pace).toFixed(1) : xo(e.pace) : "—",
		hr: e.hr == null ? "—" : String(e.hr),
		climb: e.climb == null ? "—" : `${Math.round(e.climb)} m`
	}));
}
function Oo(e, t) {
	if (!e) return null;
	let n = e.reduce((e, t) => e + t, 0), r = (e) => Math.round(e * t);
	return e.map((e, t) => ({
		zone: `Z${t + 1}`,
		bpm: t === 4 ? `${r(.9)}+` : `${r(.5 + t / 10)}–${r(.6 + t / 10)}`,
		time: xo(e),
		pct: n ? Math.round(e / n * 100) : 0
	}));
}
var ko = (e) => e && {
	exercises: e.exercises.map((e) => ({
		name: e.name,
		set: io(e),
		record: e.record
	})),
	volume: `${Math.round(e.vol_kg).toLocaleString("en-US")} kg`
};
function Ao(e) {
	if (!e.series) return null;
	let { t, pace: n, hr: r, ele: i } = e.series;
	return {
		x: t,
		list: [
			Co(e) ? {
				label: "Speed km/h",
				values: n.map(wo),
				color: "--gym"
			} : {
				label: "Pace /km",
				values: n,
				color: "--run",
				fmt: xo
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
function jo(e, t, n) {
	return e?.can_edit?.includes(t) ? {
		remove: ba(n).removable,
		shoe: n.kind === "run"
	} : {
		remove: null,
		shoe: !1
	};
}
var Mo = (e) => ({
	file_missing: "Route file not found",
	file_unreadable: "Route file unreadable"
})[e] ?? null, No = rn({
	wide: !1,
	reducedMotion: !1
}), Po = matchMedia("(min-width: 768px)"), Fo = matchMedia("(prefers-reduced-motion: reduce)"), Io = () => {
	No.wide = Po.matches, No.reducedMotion = Fo.matches;
};
Po.addEventListener("change", Io), Fo.addEventListener("change", Io), Io();
export { Ua as $, mn as $t, _o as A, ii as At, lo as B, Ar as Bt, ja as C, xi as Ct, Ya as D, mi as Dt, $a as E, gi as Et, to as F, Br as Ft, Ea as G, yr as Gt, Oa as H, jr as Ht, Xa as I, zr as It, aa as J, ur as Jt, uo as K, Q as Kt, xa as L, Nr as Lt, Ia as M, Jr as Mt, ua as N, qr as Nt, so as O, ci as Ot, io as P, Gr as Pt, Na as Q, pn as Qt, Ca as R, Mr as Rt, ia as S, ki as St, ra as T, yi as Tt, Ma as U, xr as Ut, Ra as V, Pr as Vt, ka as W, br as Wt, Fa as X, En as Xt, za as Y, Nn as Yt, Pa as Z, sn as Zt, Ja as _, r as _n, Li as _t, Eo as a, en as an, sa as at, vo as b, Oi as bt, Mo as c, tt as cn, no as ct, Do as d, je as dn, Zi as dt, hn as en, Wa as et, Oo as f, Ae as fn, Xi as ft, Da as g, i as gn, Hi as gt, Va as h, n as hn, Wi as ht, jo as i, Jt as in, fa as it, Za as j, Qr as jt, co as k, ai as kt, So as l, Qe as ln, da as lt, Ka as m, b as mn, Gi as mt, Ao as n, rn as nn, Ha as nt, ko as o, St as on, ro as ot, Ga as p, g as pn, Ki as pt, la as q, sr as qt, xo as r, F as rn, La as rt, To as s, nt as sn, ca as st, No as t, gn as tn, Ba as tt, Co as u, Xe as un, eo as ut, po as v, t as vn, Ii as vt, ba as w, bi as wt, go as x, Ai as xt, fo as y, Pi as yt, Sa as z, Or as zt };
