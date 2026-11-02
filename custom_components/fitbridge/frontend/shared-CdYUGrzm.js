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
function ee(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var b = 1024, x = 2048, S = 4096, te = 8192, ne = 16384, re = 32768, ie = 1 << 25, ae = 65536, oe = 1 << 19, se = 1 << 20, ce = 1 << 25, le = 1 << 21, ue = 1 << 22, de = 1 << 23, C = Symbol("$state"), fe = Symbol("component"), pe = Symbol("legacy props"), me = Symbol(""), he = Symbol("attributes"), ge = Symbol("class"), _e = Symbol("style"), ve = Symbol("text"), ye = Symbol("form reset"), be = new class extends Error {
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
	return D(/* @__PURE__ */ un(E));
}
function Ae(e) {
	if (T) {
		if (/* @__PURE__ */ un(E) !== null) throw Te(), Se;
		E = e;
	}
}
function je(e = 1) {
	if (T) {
		for (var t = e, n = E; t--;) n = /* @__PURE__ */ un(n);
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
		var i = /* @__PURE__ */ un(n);
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
		for (var r of n) Tn(r);
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
var ct = ~(x | S | b);
function A(e, t) {
	e.f = e.f & ct | t;
}
function lt(e) {
	e.f & 512 || e.deps === null ? A(e, b) : A(e, S);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function ut(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), A(e, b);
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
				z(e, s);
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
		Promise.all(n.map((e) => /* @__PURE__ */ xt(e))).then(u).catch((e) => z(e, s)).finally(d);
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
	var t = 2 | x;
	return K !== null && (K.f |= oe), {
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
	return kn(() => {
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
			l?.(), s.delete(n), t !== bt && (c.activate(), t ? (a.f |= de, Zt(a, t)) : (a.f & 8388608 && (a.f ^= de), Zt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Cn(() => {
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
	return Kn(t), t;
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
		for (var n = 0; n < t.length; n += 1) H(t[n]);
	}
}
function Tt(e) {
	var t, n = K, r = e.parent;
	if (!Wn && r !== null && e.v !== w && r.f & 24576) return we(), e.v;
	q(r);
	try {
		wt(e), t = tr(e);
	} finally {
		q(n);
	}
	return t;
}
function Et(e) {
	var t = Tt(e);
	!e.equals(t) && (e.wv = Qn(), (!j?.is_fork || e.deps === null) && (j === null ? e.v = t : (j.capture(e, t, !0), At?.capture(e, t, !0)), e.deps === null)) ? A(e, b) : Wn || (M === null ? lt(e) : (Sn() || j?.is_fork) && M.set(e, t));
}
function Dt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && pt(() => {
		t.ac.abort(be), t.ac = null;
	}), t.fn !== null && (t.teardown = g), ir(t, 0), Pn(t));
}
function Ot(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ar(t);
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
			for (var r of n.d) A(r, x), t(r);
			for (r of n.m) A(r, S), t(r);
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
		for (let e of this.#u) this.#d.delete(e), A(e, x), this.schedule(e);
		for (let e of this.#d) A(e, S), this.schedule(e);
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
		e.f ^= b;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= b : i & 4 ? t.push(r) : $n(r) && (i & 16 && this.#d.add(r), ar(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), A(i, x), this.schedule(i));
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
		z(e, jt);
	}
}
var N = null;
function Vt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && $n(r) && (N = /* @__PURE__ */ new Set(), ar(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Ln(r), N?.size > 0)) {
				P.clear();
				for (let e of N) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) N.has(n) && (N.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ar(n);
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
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), A(e, b);
		for (var n = e.first; n !== null;) Ut(n, t), n = n.next;
	}
}
function Wt(e) {
	A(e, b);
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
function F(e, t) {
	let n = qt(e, t);
	return Kn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Jt(e, t = !1, n = !0) {
	let r = qt(e);
	return t || (r.equals = Ie), Ye && n && O !== null && O.l !== null && (O.l.s ??= []).push(r), r;
}
function I(e, t, n = !1) {
	return U !== null && (!W || U.f & 131072) && it() && U.f & 4325394 && (J === null || !J.has(e)) && qe(), Zt(e, n ? tn(t) : t, Ft);
}
var Yt = null, Xt = 0;
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		Wn ? P.set(e, t) : P.has(e) || P.set(e, e.v);
		var r = Rt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Tt(t), M === null && lt(t);
		}
		e.wv = Qn(), Yt = null, Xt = 0, en(e, x, n), Yt = null, it() && K !== null && K.f & 1024 && !(K.f & 96) && (Z === null ? qn([e]) : Z.push(e)), !r.is_fork && Gt.size > 0 && !Kt && Qt();
	}
	return t;
}
function Qt() {
	Kt = !1;
	for (let e of Gt) {
		e.f & 1024 && A(e, S);
		let t;
		try {
			t = $n(e);
		} catch {
			t = !0;
		}
		t && ar(e);
	}
	Gt.clear();
}
function $t(e) {
	I(e, e.v + 1);
}
function en(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = it(), a = r.length;
		if (Xt += a, Xt > 1e5 && Yt === null && (Yt = /* @__PURE__ */ new Set()), Yt !== null) {
			if (Yt.has(e)) return;
			Yt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== K) {
				var l = (c & x) === 0;
				if (l && A(s, t), c & 131072) Gt.add(s);
				else if (c & 2) {
					var u = s;
					M?.delete(u), en(u, S, n);
				} else if (l) {
					var d = s;
					c & 16 && N !== null && N.add(d), n === null ? Ht(d) : n.push(d);
				}
			}
		}
	}
}
function tn(e) {
	if (typeof e != "object" || !e || C in e || fe in e) return e;
	let t = m(e);
	if (t !== f && t !== p) return e;
	var n = /* @__PURE__ */ new Map(), r = a(e), i = /* @__PURE__ */ F(0), o = null, s = Xn, c = (e) => {
		if (Xn === s) return e();
		var t = U, n = Xn;
		G(null), Zn(s);
		var r = e();
		return G(t), Zn(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ F(e.length, o)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Ge();
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
					let e = c(() => /* @__PURE__ */ F(w, o));
					n.set(t, e), $t(i);
				}
			} else I(r, w), $t(i);
			return !0;
		},
		get(t, r, i) {
			if (r === C) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || u(t, r)?.writable) && (a = c(() => /* @__PURE__ */ F(tn(s ? t[r] : w), o)), n.set(r, a)), a !== void 0) {
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
			if (t === C) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== w || Reflect.has(e, t);
			return (r !== void 0 || K !== null && (!i || u(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ F(i ? tn(e[t]) : w, o)), n.set(t, r)), Q(r) === w) ? !1 : i;
		},
		set(e, t, a, s) {
			var l = n.get(t), d = t in e;
			if (r && t === "length") for (var f = a; f < l.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ F(w, o)), n.set(f + "", p)) : I(p, w);
			}
			if (l === void 0) (!d || u(e, t)?.writable) && (l = c(() => /* @__PURE__ */ F(void 0, o)), I(l, tn(a)), n.set(t, l));
			else {
				d = l.v !== w;
				var m = c(() => tn(a));
				I(l, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, a), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
				}
				$t(i);
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
function nn(e) {
	try {
		if (typeof e == "object" && e && C in e) return e[C];
	} catch {}
	return e;
}
function rn(e, t) {
	return Object.is(nn(e), nn(t));
}
var an, on, sn, cn;
function ln() {
	if (an === void 0) {
		an = window, on = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		sn = u(t, "firstChild").get, cn = u(t, "nextSibling").get, h(e) && (e[ge] = void 0, e[he] = null, e[_e] = void 0, e.__e = void 0), h(n) && (n[ve] = void 0);
	}
}
function L(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function R(e) {
	return sn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function un(e) {
	return cn.call(e);
}
function dn(e, t) {
	if (!T) return /* @__PURE__ */ R(e);
	var n = /* @__PURE__ */ R(E);
	if (n === null) n = E.appendChild(L());
	else if (t && n.nodeType !== 3) {
		var r = L();
		return n?.before(r), D(r), r;
	}
	return t && vn(n), D(n), n;
}
function fn(e, t = !1) {
	if (!T) {
		var n = /* @__PURE__ */ R(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ un(n) : n;
	}
	if (t) {
		if (E?.nodeType !== 3) {
			var r = L();
			return E?.before(r), D(r), r;
		}
		vn(E);
	}
	return E;
}
function pn(e, t = !1) {
	if (!T) return /* @__PURE__ */ R(e);
	var n = dn(e, t);
	return Ae(e), n;
}
function mn(e, t = 1, n = !1) {
	let r = T ? E : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!T) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = L();
			return r === null ? i?.after(a) : r.before(a), D(a), a;
		}
		vn(r);
	}
	return D(r), r;
}
function hn(e) {
	e.textContent = "";
}
function gn() {
	return !1;
}
function _n(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function vn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function yn(e) {
	var t = K;
	if (t === null) return U.f |= de, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	z(e, t);
}
function z(e, t) {
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
function bn(e) {
	K === null && (U === null && He(e), Ve()), Wn && Be(e);
}
function xn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function B(e, t) {
	var n = K;
	n !== null && n.f & 8192 && (e |= te);
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
	if (e & 4) Pt === null ? Rt.ensure().schedule(r) : Pt.push(r);
	else if (t !== null) {
		try {
			ar(r);
		} catch (e) {
			throw H(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ae));
	}
	if (i !== null && (i.parent = n, n !== null && xn(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Sn() {
	return U !== null && !W;
}
function Cn(e) {
	let t = B(8, null);
	return A(t, b), t.teardown = e, t;
}
function wn(e) {
	bn("$effect");
	var t = K.f;
	if (!U && t & 32 && O !== null && !O.i) {
		var n = O;
		(n.e ??= []).push(e);
	} else return Tn(e);
}
function Tn(e) {
	return B(4 | se, e);
}
function En(e) {
	return bn("$effect.pre"), B(8 | se, e);
}
function Dn(e) {
	Rt.ensure();
	let t = B(64 | oe, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Rn(t, () => {
			H(t), n(void 0);
		}) : (H(t), n(void 0));
	});
}
function On(e) {
	return B(4, e);
}
function kn(e) {
	return B(ue | oe, e);
}
function An(e, t = 0) {
	return B(8 | t, e);
}
function jn(e, t = [], n = [], r = []) {
	ht(r, t, n, (t) => {
		B(8, () => {
			e(...t.map(Q));
		});
	});
}
function Mn(e, t = 0) {
	return B(16 | t, e);
}
function V(e) {
	return B(32 | oe, e);
}
function Nn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Wn, r = U;
		Gn(!0), G(null);
		try {
			t.call(null);
		} catch (t) {
			z(t, e.parent);
		} finally {
			Gn(n), G(r);
		}
	}
}
function Pn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && pt(() => {
			e.abort(be);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : H(n, t), n = r;
	}
}
function Fn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || H(t), t = n;
	}
}
function H(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (In(e.nodes.start, e.nodes.end), n = !0), e.f |= ie, Pn(e, t && !n), ir(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Nn(e), e.f ^= ie, e.f |= ne;
	var i = e.parent;
	i !== null && i.first !== null && Ln(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function In(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ un(e);
		e.remove(), e = n;
	}
}
function Ln(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Rn(e, t, n = !0) {
	var r = [];
	e.f |= 256, zn(e, r, !0);
	var i = () => {
		n && H(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function zn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= te;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				zn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Bn(e) {
	e.f &= -257, Vn(e, !0);
}
function Vn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= te, e.f & 1024 || (A(e, x), Rt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Vn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Hn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ un(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Un = null, Wn = !1;
function Gn(e) {
	Wn = e;
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
function Kn(e) {
	U !== null && (U.f & 2097152 || U.f & 2) && (J ??= /* @__PURE__ */ new Set()).add(e);
}
var Y = null, X = 0, Z = null;
function qn(e) {
	Z = e;
}
var Jn = 1, Yn = 0, Xn = Yn;
function Zn(e) {
	Xn = e;
}
function Qn() {
	return ++Jn;
}
function $n(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if ($n(a) && Et(a), a.wv > e.wv) return !0;
		}
		t & 512 && M === null && A(e, b);
	}
	return !1;
}
function er(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(J !== null && J.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? er(a, t, !1) : t === a && (n ? A(a, x) : a.f & 1024 && A(a, S), Ht(a));
	}
}
function tr(e) {
	var t = Y, n = X, r = Z, i = U, a = J, o = O, s = W, c = Xn, l = e.f;
	Y = null, X = 0, Z = null, U = l & 96 ? null : e, J = null, et(e.ctx), W = !1, Xn = ++Yn, e.ac !== null && (pt(() => {
		e.ac.abort(be);
	}), e.ac = null);
	try {
		e.f |= le;
		var u = e.fn, d = u();
		e.f |= re;
		var f = nr(e);
		if (it() && Z !== null && !W && f !== null && !(e.f & 6146)) for (var p = 0; p < Z.length; p++) er(Z[p], e);
		if (i !== null && i !== e) {
			if (Yn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Yn;
			if (t !== null) for (let e of t) e.rv = Yn;
			Z !== null && (r === null ? r = Z : r.push(...Z));
		}
		return e.f & 8388608 && (e.f ^= de), d;
	} catch (t) {
		return nr(e), yn(t);
	} finally {
		e.f ^= le, Y = t, X = n, Z = r, U = i, J = a, et(o), W = s, Xn = c;
	}
}
function nr(e) {
	var t = e.deps, n = j?.is_fork;
	if (Y !== null) {
		var r;
		if (n || ir(e, X), t !== null && X > 0) for (t.length = X + Y.length, r = 0; r < Y.length; r++) t[X + r] = Y[r];
		else e.deps = t = Y;
		if (Sn() && e.f & 512) for (r = X; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && X < t.length && (ir(e, X), t.length = X);
	return t;
}
function rr(e, t) {
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
			a.ac.abort(be), a.ac = null, A(a, x);
		}), Dt(a), ir(a, 0);
	}
}
function ir(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) rr(e, n[r]);
}
function ar(e) {
	var t = e.f;
	if (!(t & 16384)) {
		A(e, b);
		var n = K;
		K = e;
		try {
			t & 16777232 ? Fn(e) : Pn(e), Nn(e);
			var r = tr(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = Jn;
		} finally {
			K = n;
		}
	}
}
async function or() {
	await Promise.resolve(), zt();
}
function Q(e) {
	var t = !!(e.f & 2);
	if (Un?.add(e), U !== null && !W && !(K !== null && K.f & 16384) && (J === null || !J.has(e))) {
		var n = U.deps;
		if (U.f & 2097152) e.rv < Yn && (e.rv = Yn, Y === null && n !== null && n[X] === e ? X++ : Y === null ? Y = [e] : Y.push(e));
		else {
			U.deps ??= [], s.call(U.deps, e) || U.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [U] : s.call(r, U) || r.push(U);
		}
	}
	if (Wn && P.has(e)) return P.get(e);
	if (t) {
		var i = e;
		if (Wn) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || cr(i)) && (a = Tt(i)), P.set(i, a), a;
		}
		var o = !(i.f & 512) && !W && U !== null && !!(U.f & 512), c = (i.f & re) === 0;
		$n(i) && (o && (i.f |= 512), Et(i)), o && !c && (Ot(i), sr(i));
	}
	if (M?.has(e)) return M.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function sr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : s.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (Ot(n), sr(n));
	}
}
function cr(e) {
	if (e.v === w) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (P.has(t) || t.f & 2 && cr(t)) return !0;
	return !1;
}
function lr(e) {
	var t = W;
	try {
		return W = !0, e();
	} finally {
		W = t;
	}
}
function ur(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (C in e) dr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && C in n && dr(n);
		}
	}
}
function dr(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			dr(e[n], t);
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
var fr = ["touchstart", "touchmove"];
function pr(e) {
	return fr.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var mr = Symbol("events"), hr = /* @__PURE__ */ new Set(), gr = /* @__PURE__ */ new Set();
function _r(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Cr.call(t, e), !e.cancelBubble) return pt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, k(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function vr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = _r(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Cn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function yr(e, t, n) {
	(t[mr] ??= {})[e] = n;
}
function br(e) {
	for (var t = 0; t < e.length; t++) hr.add(e[t]);
	for (var n of gr) n(e);
}
var xr = null, Sr = !1;
function Cr(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	xr = e, Sr || (Sr = !0, setTimeout(() => {
		Sr = !1, xr = null;
	}));
	var o = 0, s = xr === e && e[mr];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[mr] = t;
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
					var h = a[mr]?.[r];
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
			e[mr] = t, delete e.currentTarget, G(d), q(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var wr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Tr(e) {
	return wr?.createHTML(e) ?? e;
}
function Er(e) {
	var t = _n("template");
	return t.innerHTML = Tr(e.replaceAll("<!>", "<!---->")), t.content;
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
function Dr(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (T) return $(E, null), E;
		i === void 0 && (i = Er(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ R(i)));
		var t = r || on ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ R(t), s = t.lastChild;
			$(o, s);
		} else $(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Or(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (T) return $(E, null), E;
		if (!o) {
			var e = /* @__PURE__ */ R(Er(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ R(e);) o.appendChild(/* @__PURE__ */ R(e));
			else o = /* @__PURE__ */ R(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ R(t), r = t.lastChild;
			$(n, r);
		} else $(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function kr(e, t) {
	return /* @__PURE__ */ Or(e, t, "svg");
}
function Ar(e = "") {
	if (!T) {
		var t = L(e + "");
		return $(t, t), t;
	}
	var n = E;
	return n.nodeType === 3 ? vn(n) : (n.before(n = L()), D(n)), $(n, n), n;
}
function jr() {
	if (T) return $(E, null), E;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = L();
	return e.append(t, n), $(t, n), e;
}
function Mr(e, t) {
	if (T) {
		var n = K;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = E), ke();
	} else e !== null && e.before(t);
}
function Nr() {
	if (T && E && E.nodeType === 8 && E.textContent?.startsWith("$")) {
		let e = E.textContent.substring(1);
		return ke(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Pr(e) {
	let t = 0, n = qt(0), r;
	return () => {
		Sn() && (Q(n), An(() => (t === 0 && (r = lr(() => e(() => $t(n)))), t += 1, () => {
			k(() => {
				--t, t === 0 && (r?.(), r = void 0, $t(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Fr = ae | oe;
function Ir(e, t, n, r) {
	new Lr(e, t, n, r);
}
var Lr = class {
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
	#h = Pr(() => (this.#m = qt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = K;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = K.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Mn(() => {
			if (T) {
				let e = Ne(this.#t);
				ke();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Fr), T && (this.#e = E);
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
		k(r), t && (this.#s = V(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? De() : (t = !0, n && Je(), this.#s !== null && Rn(this.#s, () => {
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
					z(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (ne | ie)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = V(() => e(this.#e)), k(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = L(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return V(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							z(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(j)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Rn(this.#o, () => {
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
				Hn(this.#a, e);
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
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && Rn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, k(() => {
			this.#d = !1, this.#m && Zt(this.#m, this.#l);
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
		this.#a &&= (H(this.#a), null), this.#o &&= (H(this.#o), null), this.#s &&= (H(this.#s), null), T && (D(this.#t), je(), D(Me()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return V(() => {
						var r = K;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return z(e, this.#i.parent), null;
				}
			}));
		};
		k(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					z(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => z(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function Rr(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ve] ??= e.nodeValue) && (e[ve] = n, e.nodeValue = `${n}`);
}
function zr(e, t) {
	return Vr(e, t);
}
var Br = /* @__PURE__ */ new Map();
function Vr(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	ln();
	var l = void 0, u = Dn(() => {
		var o = n ?? t.appendChild(L());
		Ir(o, { pending: () => {} }, (t) => {
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
					var i = pr(r);
					for (let e of [t, document]) {
						var a = Br.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Br.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Cr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(c(hr)), gr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Br.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Cr), r.delete(e), r.size === 0 && Br.delete(n)) : r.set(e, i);
			}
			gr.delete(d), o !== n && o.parentNode?.removeChild(o);
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
			if (n) Bn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Bn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
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
						Hn(r, t), t.append(L()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else H(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Rn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (H(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = j, r = gn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = L();
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
		} else T && (this.anchor = E), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Wr(e, t, n = !1) {
	var r;
	T && (r = E, ke());
	var i = new Ur(e), a = n ? ae : 0;
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
	Mn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Gr = Symbol("NaN");
function Kr(e, t, n) {
	T && ke();
	var r = new Ur(e), i = !it();
	Mn(() => {
		var e = t();
		e !== e && (e = Gr), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function qr(e, t) {
	return t;
}
function Jr(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Rn(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Yr(e, c(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			hn(d), d.append(u), e.items.clear();
		}
		Yr(e, t, !l);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Yr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ce, Hn(a, document.createDocumentFragment())) : H(t[i], n);
	}
}
var Xr;
function Zr(e, t, n, r, i, o = null) {
	var s = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		s = T ? D(/* @__PURE__ */ R(u)) : u.appendChild(L());
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
			_.fallback = d, $r(_, n, s, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= ce, ti(d, null, s)) : Bn(d) : Rn(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: Mn(() => {
			var e = Q(f), a = e.length;
			let c = !1;
			T && Ne(s) === "[!" != (a === 0) && (s = Me(), D(s), Oe(!1), c = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = j, v = gn(), y = 0; y < a; y += 1) {
				T && E.nodeType === 8 && E.data === "]" && (s = E, c = !0, Oe(!1));
				var ee = e[y], b = r(ee, y), x = m ? null : l.get(b);
				x ? (x.v && Zt(x.v, ee), x.i && Zt(x.i, y), v && _.unskip_effect(x.e)) : (x = ei(l, m ? s : Xr ??= L(), ee, b, y, i, t, n), m || (x.e.f |= ce), l.set(b, x)), u.add(b);
			}
			if (a === 0 && o && !d && (m ? d = V(() => o(s)) : (d = V(() => o(Xr ??= L())), d.f |= ce)), a > u.size && ze("", "", ""), T && a > 0 && D(Me()), !m) {
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
function Qr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function $r(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, l = Qr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (a) for (v = 0; v < o; v += 1) h = t[v], g = i(h, v), _ = s.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < o; v += 1) {
		if (h = t[v], g = i(h, v), _ = s.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Bn(_), a && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ce, _ === l) ti(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ni(e, d, _), ni(e, _, y), ti(_, y, n), d = _, p = [], m = [], l = Qr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var ee = m[0], b;
					d = ee.prev;
					var x = p[0], S = p[p.length - 1];
					for (b = 0; b < p.length; b += 1) ti(p[b], ee, n);
					for (b = 0; b < m.length; b += 1) u.delete(m[b]);
					ni(e, x.prev, S.next), ni(e, d, x), ni(e, S, ee), l = ee, d = S, --v, p = [], m = [];
				} else u.delete(_), ti(_, l, n), ni(e, _.prev, _.next), ni(e, _, d === null ? e.effect.first : d.next), ni(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Qr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Qr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Yr(e, c(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var te = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || te.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && te.push(l), l = Qr(l.next);
		var ne = te.length;
		if (ne > 0) {
			var re = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.fix();
			}
			Jr(e, te, re);
		}
	}
	a && k(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function ei(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? qt(n) : /* @__PURE__ */ Jt(n, !1, !1) : null, l = o & 2 ? qt(i) : null;
	return {
		v: c,
		i: l,
		e: V(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ti(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ un(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ni(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ri(e, t, ...n) {
	var r = new Ur(e);
	Mn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, ae);
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function ii(e, t, n) {
	var r;
	T && (r = E, ke());
	var i = new Ur(e);
	Mn(() => {
		var e = t() ?? null;
		if (T && Ne(r) === "[" != (e !== null)) {
			var a = Me();
			D(a), i.anchor = a, Oe(!1), i.ensure(e, e && ((t) => n(t, e))), Oe(!0);
		} else i.ensure(e, e && ((t) => n(t, e)));
	}, ae);
}
// node_modules/clsx/dist/clsx.mjs
function ai(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = ai(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function oi() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = ai(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/svelte/src/internal/shared/attributes.js
function si(e) {
	return typeof e == "object" ? oi(e) : e ?? "";
}
var ci = [..." 	\n\r\f\xA0\v﻿"];
function li(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ci.includes(r[o - 1])) && (s === r.length || ci.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function ui(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function di(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function fi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(di)), i && c.push(...Object.keys(i).map(di));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = di(e.substring(l, u).trim());
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
		return r && (n += ui(r)), i && (n += ui(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function pi(e, t, n, r, i, a) {
	var o = e[ge];
	if (T || o !== n || o === void 0) {
		var s = li(n, r, a);
		T && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ge] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function mi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function hi(e, t, n, r) {
	var i = e[_e];
	if (T || i !== t) {
		var a = fi(t, r);
		T && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[_e] = t;
	} else r && (Array.isArray(r) ? (mi(e, n?.[0], r[0]), mi(e, n?.[1], r[1], "important")) : mi(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function gi(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function _i(e, t) {
	var n = e.__defaultValue, r = e.multiple, i = r ? n ?? [] : null;
	if (!r || a(i)) {
		var o = e.selectedIndex, s = t && r ? new Set(e.selectedOptions) : null;
		for (var c of e.options) {
			var l = bi(c);
			gi(c, r ? i.includes(l) : rn(l, n));
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
function vi(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!a(t)) return Ee();
		for (var r of e.options) r.selected = t.includes(bi(r));
	} else {
		for (r of e.options) if (rn(bi(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function yi(e) {
	var t = new MutationObserver((t) => {
		t.every(xi) || ("__defaultValue" in e && _i(e, !1), "__value" in e && vi(e, e.__value));
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Cn(() => {
		t.disconnect();
	});
}
function bi(e) {
	return "__value" in e ? e.__value : e.value;
}
function xi(e) {
	if (e.target.closest("selectedcontent") !== null) return !0;
	if (e.type === "childList") {
		var t = [...e.addedNodes, ...e.removedNodes];
		return t.length > 0 && t.every((e) => e.nodeName === "SELECTEDCONTENT");
	}
	return !1;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Si = Symbol("is custom element"), Ci = Symbol("is html"), wi = xe ? "link" : "LINK", Ti = xe ? "progress" : "PROGRESS";
function Ei(e) {
	if (T) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Oi(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Oi(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ye] = n, k(n), ft();
	}
}
function Di(e, t) {
	var n = ki(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Ti) && (e.value = t ?? "");
}
function Oi(e, t, n, r) {
	var i = ki(e);
	T && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === wi) || i[t] !== (i[t] = n) && (t === "loading" && (e[me] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ji(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function ki(e) {
	return e[he] ??= {
		[Si]: e.nodeName.includes("-"),
		[Ci]: e.namespaceURI === Ce
	};
}
var Ai = /* @__PURE__ */ new Map();
function ji(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ai.get(t);
	if (n) return n;
	Ai.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = d(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = m(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Mi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	mt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ii(e) ? Li(a) : a, n(a), j !== null && r.add(j), await or(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (T && e.defaultValue !== e.value || lr(t) == null && e.value) && (n(Ii(e) ? Li(e.value) : e.value), j !== null && r.add(j)), An(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = j;
			if (r.has(i)) return;
		}
		Ii(e) && n === Li(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
var Ni = /* @__PURE__ */ new Set();
function Pi(e, t, n, r, i = r) {
	var a = n.getAttribute("type") === "checkbox", o = e;
	let s = !1;
	if (t !== null) for (var c of t) o = o[c] ??= [];
	o.push(n), mt(n, "change", () => {
		var e = n.__value;
		a && (e = Fi(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), An(() => {
		var e = r();
		T && n.defaultChecked !== n.checked ? s = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = rn(n.__value, e);
	}), Cn(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), Ni.has(o) || (Ni.add(o), k(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), Ni.delete(o);
	})), k(() => {
		if (s) {
			var e = a ? Fi(o, e, n.checked) : o.find((e) => e.checked)?.__value;
			i(e);
		}
	});
}
function Fi(e, t, n) {
	for (var r = /* @__PURE__ */ new Set(), i = 0; i < e.length; i += 1) e[i].checked && r.add(e[i].__value);
	return n || r.delete(t), Array.from(r);
}
function Ii(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Li(e) {
	return e === "" ? null : +e;
}
var Ri = /* @__PURE__ */ new class e {
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
function zi(e, t, n) {
	var r = Ri.observe(e, () => n(e[t]));
	On(() => (lr(() => n(e[t])), r));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Bi(e, t) {
	return e === t || e?.[C] === t;
}
function Vi(e = rt(), t, n, r) {
	var i = O.r, a = K;
	return On(() => {
		var o, s;
		return An(() => {
			o = s, s = r?.() || [], lr(() => {
				Bi(n(...s), e) || (t(e, ...s), o && Bi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Bi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
function Hi(e, t, n = t) {
	var r = e === "x", i = () => pt(() => {
		a = !0, clearTimeout(o), o = setTimeout(s, 100), n(window[r ? "scrollX" : "scrollY"]);
	});
	addEventListener("scroll", i, { passive: !0 });
	var a = !1, o, s = () => {
		a = !1;
	}, c = !0;
	An(() => {
		var e = t();
		c ? c = !1 : !a && e != null && (a = !0, clearTimeout(o), r ? scrollTo(e, window.scrollY) : scrollTo(window.scrollX, e), o = setTimeout(s, 100));
	}), On(i), Cn(() => {
		removeEventListener("scroll", i);
	});
}
// node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function Ui(e = !1) {
	let t = O, n = t.l.u;
	if (!n) return;
	let r = () => ur(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ yt(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => Q(i);
	}
	n.b.length && En(() => {
		Wi(t, r), v(n.b);
	}), wn(() => {
		let e = lr(() => n.m.map(_));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && wn(() => {
		Wi(t, r), v(n.a);
	});
}
function Wi(e, t) {
	if (e.l.s) for (let t of e.l.s) Q(t);
	t();
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var Gi = !1;
function Ki(e) {
	var t = Gi;
	try {
		return Gi = !1, [e(), Gi];
	} finally {
		Gi = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function qi(e, t, n, r) {
	var i = !Ye || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, d = () => o && i ? (l ??= /* @__PURE__ */ yt(r), Q(l)) : (c && (c = !1, s = o ? lr(r) : r), s);
	let f;
	if (a) {
		var p = C in e || pe in e;
		f = u(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = Ki(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && We(t), f(m)));
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
	var ee = K;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? Q(y) : i && a ? tn(e) : e;
			return I(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return Wn && v || ee.f & 16384 ? y.v : Q(y);
	});
}
function Ji(e) {
	O === null && Le("onMount"), Ye && O.l !== null ? Yi(O).m.push(e) : wn(() => {
		let t = lr(e);
		if (typeof t == "function") return t;
	});
}
function Yi(e) {
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
var Xi = (e) => Math.min(1, Math.max(0, e)), Zi = (e) => String(e).padStart(2, "0"), Qi = (e, t) => t > 0 ? Xi(e / t) : 1, $i = (e) => e.workouts ?? e.gym ?? 0, ea = (e) => [
	e.goal.runs,
	$i(e.goal),
	e.goal.active_days ?? 0
], ta = (e) => [
	e.runs,
	$i(e),
	e.active_days ?? 0
], na = (e) => ta(e).map((t, n) => Qi(t, ea(e)[n])), ra = (e) => e.toLocaleString("en-US");
function ia(e, t) {
	if (e == null) return null;
	let n = t > 0 ? e >= t ? " · Active day ✓" : ` · ${ra(t - e)} to go` : "";
	return `👟 ${ra(e)} steps today${n}`;
}
function aa(e, t) {
	let n = (e) => e ? " ✓" : "", r = ([e, n]) => {
		let r = t[e];
		if (n) return `${r?.name ?? e} ✓`;
		let i = r ? ea(r.week) : [], a = r ? ta(r.week) : [];
		return `${r?.name ?? e} ${i.filter((e, t) => e > 0 && a[t] >= e).length} of ${i.filter((e) => e > 0).length}`;
	};
	if (e.mode === "team") return `${e.team.done} of ${e.team.target} team points${n(e.met)}`;
	let i = Object.entries(e.members_met).map(r);
	return e.mode === "together" && i.push(`${e.together.done} of ${e.together.target} together${n(e.together.done >= e.together.target)}`), i.join(" · ");
}
function oa(e) {
	if (!e.reward) return null;
	if (e.met) return `${e.reward} unlocked!`;
	let t = {
		own: "you both make your goals",
		together: `you both make your goals and do ${e.together.target} together`,
		team: `you reach ${e.team.target} team points`
	};
	return `${e.reward}: unlocks when ${t[e.mode]}`;
}
function sa(e) {
	let t = e.xp - e.level_floor, n = e.next_level_xp - e.level_floor;
	return {
		level: e.level,
		into: t,
		span: n,
		frac: n > 0 ? Xi(t / n) : 1
	};
}
var ca = (e) => `Week ${Number(e.week.split("-W")[1])} · ${e.days_left} ${e.days_left === 1 ? "day" : "days"} left`;
function la(e, t, n = 15) {
	let r = new Date(e);
	return t - r > n * 6e4 ? `Updated ${Zi(r.getHours())}:${Zi(r.getMinutes())}` : null;
}
var ua = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], da = [
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
function fa(e, t = !0) {
	let n = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(e);
	if (!n) return "";
	let [, r, i, a, o] = n, s = `${ua[new Date(Date.UTC(r, i - 1, a)).getUTCDay()]} ${Number(a)} ${da[i - 1]}`;
	return t ? `${s}, ${o}` : s;
}
var pa = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${Zi(e % 60)} min` : `${e / 60} h`, ma = {
	short: "Too short",
	easy: "Too easy",
	type: "Type not counted",
	no_gps: "No GPS"
}, ha = (e) => {
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
}, ga = (e) => ({
	title: e.name,
	when: fa(e.start, e.kind !== "active_day"),
	duration: e.kind === "active_day" ? `${ra(e.steps)} steps` : pa(e.minutes),
	xp: e.xp ? `+${e.xp}` : "",
	label: ma[e.reason] ?? null,
	plan: e.plan && e.caught_up ? `${e.plan} · caught up` : e.plan,
	chip: ha(e),
	removable: e.kind === "active_day" ? null : e.excluded ? "restore" : e.key.startsWith("manual:") ? "delete" : "remove"
});
function _a(e, t) {
	let n = new Set(e.map((e) => e.key));
	return [...e, ...t.filter((e) => !n.has(e.key))];
}
var va = (e, t, n) => e.flatMap((e) => {
	let r = n[`${t}/${e.key}`];
	return r === null ? [] : r === void 0 ? [e] : [{
		...e,
		excluded: r
	}];
}), ya = (e, t) => (/* @__PURE__ */ new Date(Date.parse(`${e}T00:00:00Z`) - t * 864e5)).toISOString().slice(0, 10), ba = (e) => Math.round(e / 30) / 2, xa = (e) => `${ba(e)} min`;
function Sa(e) {
	if (!e?.steps?.length) return "";
	let t = ([e, t]) => `${xa(t)} ${e}`, n = e.times > 1 ? `${e.times} × (${e.steps.map(t).join(" + ")})` : e.steps.map(t).join(" → ");
	return [
		e.warmup_s > 0 && `${xa(e.warmup_s)} warm-up walk`,
		n,
		e.cooldown_s > 0 && `${xa(e.cooldown_s)} cool-down walk`
	].filter(Boolean).join(" · ");
}
function Ca(e, t = null) {
	if (e.state === "none") return "No track to check · counts by duration";
	if (e.state === "indoor") return t == null ? "Indoor run" : `Indoor: ${t.toFixed(1)} km/h average`;
	let n = e.state === "match" ? "matches" : "doesn't match";
	return `${e.found} of ${e.planned} run blocks · ${ba(e.run_s)} of ${xa(e.planned_run_s)} running · ${n} ${e.label}`;
}
function wa(e) {
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
function Ta(e, t) {
	let n = Object.hasOwn(t, e.person) ? e.person : null;
	return {
		self: n,
		others: Object.keys(t).filter((e) => e !== n)
	};
}
var Ea = (e) => `${Number(e.slice(8, 10))} ${da[Number(e.slice(5, 7)) - 1]}`;
function Da(e, t, n) {
	let r = t.find((t) => t.key === e.key);
	return n - e.at > 6e5 || !r || e.want !== null && r.excluded === e.want;
}
function Oa(e, t, n) {
	let r = (e[t] ?? Promise.resolve()).then(n), i = e[t] = r.catch(() => {});
	return i.then(() => e[t] === i && delete e[t]), r;
}
function ka(e) {
	let t = (e) => e < 10 ? e.toFixed(1) : Math.round(e).toLocaleString(), n = e.km == null ? "unknown" : e.km >= e.limit ? "replace" : e.km >= .9 * e.limit ? "soon" : "ok", r = e.last_run ? new Date(e.last_run) : null, i = e.runs ? `${e.runs} ${e.runs === 1 ? "run" : "runs"}` : e.runs === 0 ? "No runs yet" : "";
	return {
		name: e.name,
		km: e.km == null ? "—" : `${t(e.km)} / ${t(e.limit)} km`,
		frac: e.km == null ? 0 : Xi(e.km / e.limit),
		state: n,
		label: {
			soon: "Replace soon",
			replace: "Replace"
		}[n] ?? null,
		detail: [i, r && `last run ${r.getDate()} ${da[r.getMonth()]}`].filter(Boolean).join(" · ")
	};
}
var Aa = {
	name: [1, 40],
	replace_at_km: [
		100,
		3e3,
		10
	]
}, ja = (e, t) => !!t && (e.run_shoes !== void 0 || (e.shoes ?? []).some((e) => e.id != null));
function Ma(e, t, { partial: n = !1 } = {}) {
	let r = {};
	if (!(n && e === void 0)) {
		let t = String(e ?? "").trim();
		if (t.length < Aa.name[0]) return { error: "Give the shoe a name" };
		if (t.length > Aa.name[1]) return { error: `A name of at most ${Aa.name[1]} characters` };
		r.name = t;
	}
	if (!(n && t === void 0)) {
		let [e, n] = Aa.replace_at_km, i = typeof t == "number" ? t : t === null || String(t).trim() === "" ? NaN : Number(t);
		if (!(i >= e && i <= n)) return { error: `Replace at: ${e} to ${n} km` };
		r.replace_at_km = i;
	}
	return r;
}
function Na(e, t) {
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
var Pa = {
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
}, Fa = [
	"runs",
	"workouts",
	"active_days",
	"steps"
], Ia = {
	runs: 0,
	workouts: 0,
	active_days: 0,
	steps: 1e4
};
function La(e, t) {
	let [n, r, i] = Pa[e];
	return Math.min(r, Math.max(n, Math.round(t / i) * i));
}
function Ra(e, t) {
	let n = e.pending ?? e.current, r = (t) => n?.people?.[t] ?? e.defaults?.[t] ?? {};
	return {
		people: Object.fromEntries(Object.keys(t).map((e) => {
			let t = r(e);
			return [e, Object.fromEntries(Fa.map((e) => [e, La(e, t[e] ?? Ia[e])]))];
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
var za = (e) => e ? `Max HR ${e.bpm} · ${e.source === "measured" && e.date ? `measured ${Ea(e.date)}` : e.source}` : "—";
function Ba(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return t.setUTCDate(t.getUTCDate() + 3 - (t.getUTCDay() + 6) % 7), Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5 + 1) / 7);
}
var Va = (e, t) => Fa.every((n) => (n === "workouts" ? $i(t) : t[n]) === e[n]), Ha = (e, t, n) => n - e.at > 6e5 || Object.entries(e.entry.people).every(([e, n]) => !t[e] || Va(n, t[e].week.goal));
function Ua(e, t) {
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
var Wa = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${Zi(e.getMonth() + 1)}-${Zi(e.getDate())}`;
function Ga(e, t, n) {
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
function Ka(e) {
	let t = e.filter((e) => e.active).length;
	return `${t} active ${t === 1 ? "day" : "days"} · ${ra(e.reduce((e, t) => e + (t.steps ?? 0), 0))} steps`;
}
var qa = (e) => `${e.w} ${e.unit} × ${e.r}`, Ja = [
	"Chest",
	"Back",
	"Shoulders",
	"Arms",
	"Legs",
	"Core",
	"Other"
], Ya = (e) => Ja.map((t) => ({
	group: t,
	lifts: (e ?? []).filter((e) => (Ja.includes(e.group) ? e.group : "Other") === t)
})).filter((e) => e.lifts.length), Xa = (e) => Ya(e).map(({ group: e, lifts: t }) => ({
	group: e,
	count: t.length,
	lift: [...t].sort((e, t) => (t.sessions ?? 0) - (e.sessions ?? 0) || t.date.localeCompare(e.date) || e.name.localeCompare(t.name))[0]
})), Za = (e) => Ya(e).map(({ group: e, lifts: t }) => ({
	group: e,
	lifts: [...t].sort((e, t) => e.name.localeCompare(t.name))
})), Qa = (e) => `${Math.floor(e / 60)}:${Zi(e % 60)}`, $a = (e) => new Set([...(e?.lifts ?? []).map((e) => e.key), e?.fastest_1k?.key].filter(Boolean)), eo = (e, t) => !!t && t.last_received == null && !e.feed.length, to = (e, t) => [.../* @__PURE__ */ new Set([e.person, ...e.can_connect ?? []])].filter((e) => Object.hasOwn(t, e)), no = {
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
}, ro = (e) => no[e] ?? {
	title: "Which phone do you have?",
	steps: []
};
function io(e) {
	return e?.invite ? {
		before: `${e.in_ha ? `Open openGym from the Home Assistant sidebar in Chrome, not in the Home Assistant app (${e.url}). Choose` : `Open openGym at ${e.url}, choose`} Create new profile, enter code `,
		code: e.invite,
		after: ", then Add to Home Screen. Does openGym show someone else? Sign out there first."
	} : null;
}
function ao(e, t, n = null) {
	if (e.last_received == null) return {
		state: "waiting",
		text: n?.feed?.length ? "No upload since this update" : "Waiting for the first workout"
	};
	let r = new Date(e.last_received);
	return {
		state: "connected",
		text: `Connected · last workout received ${r.toDateString() === t.toDateString() ? "today" : `${r.getDate()} ${da[r.getMonth()]}`}, ${Zi(r.getHours())}:${Zi(r.getMinutes())}`
	};
}
// src/lib/details.js
var oo = (e) => String(e).padStart(2, "0"), so = (e) => /T(\d+:\d+)/.exec(e ?? "")?.[1] ?? "";
function co(e) {
	let t = Math.round(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60);
	return n ? `${n}:${oo(r)}:${oo(t % 60)}` : `${r}:${oo(t % 60)}`;
}
var lo = (e) => e.summary.kind === "run" || e.summary.kind === "walk", uo = (e) => !!e.route?.length && !lo(e), fo = (e) => e ? 3600 / e : null, po = (e) => ({
	title: e.name,
	date: fa(e.start, !1),
	time: e.end ? `${so(e.start)}–${so(e.end)}` : so(e.start),
	duration: pa(e.minutes),
	plan: e.plan ?? null
});
function mo(e) {
	let t = e.summary, n = t.km > 0 ? t.km : null, r = n && lo(e) ? Math.round(t.minutes * 60 / n) : null;
	return [
		["Distance", n && `${n.toFixed(1)} km`],
		["Pace", r && `${co(r)} /km`],
		["Speed", n && uo(e) && `${(n / (t.minutes / 60)).toFixed(1)} km/h`],
		["Elevation gain", e.gain_m != null && `${Math.round(e.gain_m)} m`],
		["Avg heart rate", t.avg_hr != null && `${Math.round(t.avg_hr)} bpm`],
		["Max heart rate", t.max_hr != null && `${Math.round(t.max_hr)} bpm`],
		["Calories", t.kcal != null && `${Math.round(t.kcal)} kcal`],
		["Shoe", t.kind === "run" && t.shoe?.name]
	].filter(([, e]) => e);
}
function ho(e) {
	let t = uo(e);
	return e.splits.map((e, n) => ({
		km: e.km === 1 ? String(n + 1) : `${e.km} km`,
		time: co(e.s),
		pace: e.pace ? t ? fo(e.pace).toFixed(1) : co(e.pace) : "—",
		hr: e.hr == null ? "—" : String(e.hr),
		climb: e.climb == null ? "—" : `${Math.round(e.climb)} m`
	}));
}
function go(e, t) {
	if (!e) return null;
	let n = e.reduce((e, t) => e + t, 0), r = (e) => Math.round(e * t);
	return e.map((e, t) => ({
		zone: `Z${t + 1}`,
		bpm: t === 4 ? `${r(.9)}+` : `${r(.5 + t / 10)}–${r(.6 + t / 10)}`,
		time: co(e),
		pct: n ? Math.round(e / n * 100) : 0
	}));
}
var _o = (e) => e && {
	exercises: e.exercises.map((e) => ({
		name: e.name,
		set: qa(e),
		record: e.record
	})),
	volume: `${Math.round(e.vol_kg).toLocaleString("en-US")} kg`
};
function vo(e) {
	if (!e.series) return null;
	let { t, pace: n, hr: r, ele: i } = e.series;
	return {
		x: t,
		list: [
			uo(e) ? {
				label: "Speed km/h",
				values: n.map(fo),
				color: "--gym"
			} : {
				label: "Pace /km",
				values: n,
				color: "--run",
				fmt: co
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
function yo(e, t, n) {
	return e?.can_edit?.includes(t) ? {
		remove: ga(n).removable,
		shoe: n.kind === "run"
	} : {
		remove: null,
		shoe: !1
	};
}
var bo = (e) => ({
	file_missing: "Route file not found",
	file_unreadable: "Route file unreadable"
})[e] ?? null, xo = tn({
	wide: !1,
	reducedMotion: !1
}), So = matchMedia("(min-width: 768px)"), Co = matchMedia("(prefers-reduced-motion: reduce)"), wo = () => {
	xo.wide = So.matches, xo.reducedMotion = Co.matches;
};
So.addEventListener("change", wo), Co.addEventListener("change", wo), wo();
export { ia as $, Qe as $t, Ba as A, jr as At, Da as B, jn as Bt, ga as C, Zr as Ct, Xa as D, zr as Dt, Ra as E, Wr as Et, za as F, br as Ft, na as G, pn as Gt, Sa as H, an as Ht, _a as I, yr as It, Na as J, I as Jt, Oa as K, mn as Kt, ya as L, vr as Lt, sa as M, kr as Mt, qa as N, Nr as Nt, Za as O, Rr as Ot, Wa as P, Ar as Pt, la as Q, tt as Qt, va as R, Q as Rt, ta as S, ri as St, Ha as T, Kr as Tt, $a as U, dn as Ut, wa as V, wn as Vt, oa as W, fn as Wt, ja as X, St as Xt, ka as Y, F as Yt, Ea as Z, nt as Zt, La as _, vi as _t, mo as a, n as an, Ji as at, ao as b, si as bt, bo as c, t as cn, Hi as ct, ho as d, Pi as dt, Xe as en, Ka as et, go as f, Mi as ft, Ca as g, yi as gt, Aa as h, Di as ht, yo as i, ee as in, Ua as it, Ta as j, Dr as jt, io as k, Mr as kt, lo as l, Vi as lt, Fa as m, Oi as mt, vo as n, Ae as nn, Ga as nt, _o as o, i as on, qi as ot, Pa as p, Ei as pt, Ma as q, tn as qt, co as r, g as rn, ca as rt, po as s, r as sn, Ui as st, xo as t, je as tn, aa as tt, uo as u, zi as ut, to as v, hi as vt, ea as w, qr as wt, ro as x, ii as xt, eo as y, pi as yt, Qa as z, or as zt };
