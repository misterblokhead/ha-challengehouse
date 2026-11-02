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
var b = 1024, x = 2048, S = 4096, te = 8192, ne = 16384, re = 32768, ie = 1 << 25, ae = 65536, oe = 1 << 19, se = 1 << 20, ce = 1 << 25, le = 1 << 21, ue = 1 << 22, de = 1 << 23, fe = Symbol("$state"), pe = Symbol("component"), me = Symbol("legacy props"), he = Symbol(""), ge = Symbol("attributes"), _e = Symbol("class"), ve = Symbol("style"), ye = Symbol("text"), be = Symbol("form reset"), xe = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Se = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), Ce = {}, C = Symbol("uninitialized"), we = "http://www.w3.org/1999/xhtml";
function Te() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ee(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function De() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Oe() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var w = !1;
function ke(e) {
	w = e;
}
var T;
function E(e) {
	if (e === null) throw Ee(), Ce;
	return T = e;
}
function Ae() {
	return E(/* @__PURE__ */ L(T));
}
function je(e) {
	if (w) {
		if (/* @__PURE__ */ L(T) !== null) throw Ee(), Ce;
		T = e;
	}
}
function Me(e = 1) {
	if (w) {
		for (var t = e, n = T; t--;) n = /* @__PURE__ */ L(n);
		T = n;
	}
}
function Ne(e = !0) {
	for (var t = 0, n = T;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ L(n);
		e && n.remove(), n = i;
	}
}
function Pe(e) {
	if (!e || e.nodeType !== 8) throw Ee(), Ce;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Fe(e) {
	return e === this.v;
}
function Ie(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Le(e) {
	return !Ie(e, this.v);
}
function Re(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// node_modules/svelte/src/internal/client/errors.js
function ze() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Be(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Ve(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function He() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Ue(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function We() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ge(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Ke() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function qe() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Je() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ye() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/flags/index.js
var Xe = !1;
function Ze() {
	Xe = !0;
}
// node_modules/svelte/src/internal/shared/clone.js
var Qe = [];
function $e(e, t = !1, n = !1) {
	return et(e, /* @__PURE__ */ new Map(), "", Qe, null, n);
}
function et(e, t, n, r, i = null, o = !1) {
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
				l in e && (c[l] = et(u, t, n, r, null, o));
			}
			return c;
		}
		if (m(e) === f) {
			c = {}, t.set(e, c), i !== null && t.set(i, c);
			for (var d of Object.keys(e)) c[d] = et(e[d], t, n, r, null, o);
			return c;
		}
		if (e instanceof Date) return e.getTime(), structuredClone(e);
		if (typeof e.toJSON == "function" && !o) return et(e.toJSON(), t, n, r, e);
	}
	if (e instanceof EventTarget) return e;
	try {
		return structuredClone(e);
	} catch {
		return e;
	}
}
// node_modules/svelte/src/internal/client/context.js
var D = null;
function tt(e) {
	D = e;
}
function nt(e, t = !1, n) {
	D = {
		p: D,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: G,
		l: Xe && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function rt(e) {
	var t = D, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Dn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, D = t.p, it(e);
}
function it(e = {}) {
	return l(e, pe, { value: !0 }), e;
}
function at() {
	return !Xe || D !== null && D.l === null;
}
// node_modules/svelte/src/internal/client/dom/task.js
var ot = [];
function st() {
	var e = ot;
	ot = [], v(e);
}
function O(e) {
	if (ot.length === 0 && !Nt) {
		var t = ot;
		queueMicrotask(() => {
			t === ot && st();
		});
	}
	ot.push(e);
}
function ct() {
	for (; ot.length > 0;) st();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var lt = ~(x | S | b);
function k(e, t) {
	e.f = e.f & lt | t;
}
function ut(e) {
	e.f & 512 || e.deps === null ? k(e, b) : k(e, S);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function dt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), k(e, b);
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
var ft = !1;
function pt() {
	ft || (ft = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[be]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function mt(e) {
	var t = H, n = G;
	W(null), K(null);
	try {
		return e();
	} finally {
		W(t), K(n);
	}
}
function ht(e, t, n, r = n) {
	e.addEventListener(t, () => mt(n));
	let i = e[be];
	e[be] = i ? () => {
		i(), r(!0);
	} : () => r(!0), pt();
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function gt(e, t, n, r) {
	let i = at() ? bt : wt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = G, c = _t(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				R(e, s);
			}
			vt();
		}
	}
	var d = yt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ St(e))).then(u).catch((e) => R(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), vt());
	}) : f();
}
function _t() {
	var e = G, t = H, n = D, r = A;
	return function(i = !0) {
		K(e), W(t), tt(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function vt(e = !0) {
	K(null), W(null), tt(null), e && A?.deactivate();
}
function yt() {
	var e = G, t = e.b, n = A, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function bt(e) {
	var t = 2 | x;
	return G !== null && (G.f |= oe), {
		ctx: D,
		deps: null,
		effects: null,
		equals: Fe,
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
var xt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function St(e, t, n) {
	let r = G;
	r === null && ze();
	var i = void 0, a = Yt(C), o = !H, s = /* @__PURE__ */ new Set();
	return jn(() => {
		var t = G, n = y();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== xe && n.reject(e);
			}).finally(vt);
		} catch (e) {
			n.reject(e), vt();
		}
		var c = A;
		if (o) {
			if (t.f & 32768) var l = yt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(xt);
			else for (let e of s.values()) e.reject(xt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== xt && (c.activate(), t ? (a.f |= de, $t(a, t)) : (a.f & 8388608 && (a.f ^= de), $t(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Tn(() => {
		for (let e of s) e.reject(xt);
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
function Ct(e) {
	let t = /* @__PURE__ */ bt(e);
	return Jn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function wt(e) {
	let t = /* @__PURE__ */ bt(e);
	return t.equals = Le, t;
}
function Tt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) V(t[n]);
	}
}
function Et(e) {
	var t, n = G, r = e.parent;
	if (!Kn && r !== null && e.v !== C && r.f & 24576) return Te(), e.v;
	K(r);
	try {
		Tt(e), t = rr(e);
	} finally {
		K(n);
	}
	return t;
}
function Dt(e) {
	var t = Et(e);
	!e.equals(t) && (e.wv = er(), (!A?.is_fork || e.deps === null) && (A === null ? e.v = t : (A.capture(e, t, !0), jt?.capture(e, t, !0)), e.deps === null)) ? k(e, b) : Kn || (j === null ? ut(e) : (wn() || A?.is_fork) && j.set(e, t));
}
function Ot(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && mt(() => {
		t.ac.abort(xe), t.ac = null;
	}), t.fn !== null && (t.teardown = g), or(t, 0), In(t));
}
function kt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && sr(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var At = null, A = null, jt = null, j = null, Mt = null, Nt = !1, Pt = !1, Ft = null, It = null, Lt = 0, Rt = 1, zt = class e {
	id = Rt++;
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
		At === null ? At = this : (At.#n = this, this.#t = At), At = this;
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
		for (var t = Ft = [], n = [], r = It = []; this.#c.length > 0;) {
			Lt++ > 1e3 && (this.#S(), Vt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Kt(e), this.#h() || this.discard(), t;
			}
		}
		if (A = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Ft = null, It = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Gt(e, t);
			r.length > 0 && A.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), jt = this, Ut(n), Ut(t), jt = null, this.#s?.resolve();
			var o = A;
			if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
				if (o !== null) {
					for (let e of this.#c) o.#c.push(e);
					this.#c = [];
				} else o = this;
			}
			o !== null && (M.clear(), o.#_());
		}
	}
	#v(e, t, n) {
		e.f ^= b;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= b : i & 4 ? t.push(r) : tr(r) && (i & 16 && this.#d.add(r), sr(r));
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
		this.oncommit(() => e.discard()), e.#S(), A = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) dt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== C && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), j?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		A = this;
	}
	deactivate() {
		A = null, j = null;
	}
	flush() {
		try {
			Pt = !0, A = this, this.#_();
		} finally {
			Lt = 0, Mt = null, Ft = null, It = null, Pt = !1, A = null, j = null, M.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(xt);
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
		this.#m || (this.#m = !0, O(() => {
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
		if (A === null) {
			let t = A = new e();
			!Pt && !Nt && O(() => {
				t.#e || t.flush();
			});
		}
		return A;
	}
	apply() {
		j = null;
	}
	schedule(e) {
		Mt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? At = e : t.#t = e, this.linked = !1;
		}
	}
};
function Bt(e) {
	var t = Nt, n = jt;
	jt = null, Nt = !0;
	try {
		var r;
		for (e && (Bt(), r = e());;) {
			if (ct(), A === null) return r;
			A.flush();
		}
	} finally {
		Nt = t, jt = n;
	}
}
function Vt() {
	try {
		We();
	} catch (e) {
		R(e, Mt);
	}
}
var Ht = null;
function Ut(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && tr(r) && (Ht = /* @__PURE__ */ new Set(), sr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && zn(r), Ht?.size > 0)) {
				M.clear();
				for (let e of Ht) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Ht.has(n) && (Ht.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || sr(n);
					}
				}
				Ht.clear();
			}
		}
		Ht = null;
	}
}
function Wt(e) {
	A.schedule(e);
}
function Gt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), k(e, b);
		for (var n = e.first; n !== null;) Gt(n, t), n = n.next;
	}
}
function Kt(e) {
	k(e, b);
	for (var t = e.first; t !== null;) Kt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var qt = /* @__PURE__ */ new Set(), M = /* @__PURE__ */ new Map(), Jt = !1;
function Yt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Fe,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function N(e, t) {
	let n = Yt(e, t);
	return Jn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Xt(e, t = !1, n = !0) {
	let r = Yt(e);
	return t || (r.equals = Le), Xe && n && D !== null && D.l !== null && (D.l.s ??= []).push(r), r;
}
function P(e, t, n = !1) {
	return H !== null && (!U || H.f & 131072) && at() && H.f & 4325394 && (q === null || !q.has(e)) && Je(), $t(e, n ? an(t) : t, It);
}
var Zt = null, Qt = 0;
function $t(e, t, n = null) {
	if (!e.equals(t)) {
		Kn ? M.set(e, t) : M.has(e) || M.set(e, e.v);
		var r = zt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Et(t), j === null && ut(t);
		}
		e.wv = er(), Zt = null, Qt = 0, rn(e, x, n), Zt = null, at() && G !== null && G.f & 1024 && !(G.f & 96) && (X === null ? Yn([e]) : X.push(e)), !r.is_fork && qt.size > 0 && !Jt && en();
	}
	return t;
}
function en() {
	Jt = !1;
	for (let e of qt) {
		e.f & 1024 && k(e, S);
		let t;
		try {
			t = tr(e);
		} catch {
			t = !0;
		}
		t && sr(e);
	}
	qt.clear();
}
function tn(e, t = 1) {
	var n = Z(e), r = t === 1 ? n++ : n--;
	return P(e, n), r;
}
function nn(e) {
	P(e, e.v + 1);
}
function rn(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = at(), a = r.length;
		if (Qt += a, Qt > 1e5 && Zt === null && (Zt = /* @__PURE__ */ new Set()), Zt !== null) {
			if (Zt.has(e)) return;
			Zt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== G) {
				var l = (c & x) === 0;
				if (l && k(s, t), c & 131072) qt.add(s);
				else if (c & 2) {
					var u = s;
					j?.delete(u), rn(u, S, n);
				} else if (l) {
					var d = s;
					c & 16 && Ht !== null && Ht.add(d), n === null ? Wt(d) : n.push(d);
				}
			}
		}
	}
}
function an(e) {
	if (typeof e != "object" || !e || fe in e || pe in e) return e;
	let t = m(e);
	if (t !== f && t !== p) return e;
	var n = /* @__PURE__ */ new Map(), r = a(e), i = /* @__PURE__ */ N(0), o = null, s = Qn, c = (e) => {
		if (Qn === s) return e();
		var t = H, n = Qn;
		W(null), $n(s);
		var r = e();
		return W(t), $n(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ N(e.length, o)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Ke();
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
					n.set(t, e), nn(i);
				}
			} else P(r, C), nn(i);
			return !0;
		},
		get(t, r, i) {
			if (r === fe) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || u(t, r)?.writable) && (a = c(() => /* @__PURE__ */ N(an(s ? t[r] : C), o)), n.set(r, a)), a !== void 0) {
				var l = Z(a);
				return l === C ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = Z(i);
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
			if (t === fe) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== C || Reflect.has(e, t);
			return (r !== void 0 || G !== null && (!i || u(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ N(i ? an(e[t]) : C, o)), n.set(t, r)), Z(r) === C) ? !1 : i;
		},
		set(e, t, a, s) {
			var l = n.get(t), d = t in e;
			if (r && t === "length") for (var f = a; f < l.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ N(C, o)), n.set(f + "", p)) : P(p, C);
			}
			if (l === void 0) (!d || u(e, t)?.writable) && (l = c(() => /* @__PURE__ */ N(void 0, o)), P(l, an(a)), n.set(t, l));
			else {
				d = l.v !== C;
				var m = c(() => an(a));
				P(l, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, a), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && P(g, _ + 1);
				}
				nn(i);
			}
			return !0;
		},
		ownKeys(e) {
			Z(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== C;
			});
			for (var [r, a] of n) a.v !== C && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			qe();
		}
	});
}
function on(e) {
	try {
		if (typeof e == "object" && e && fe in e) return e[fe];
	} catch {}
	return e;
}
function sn(e, t) {
	return Object.is(on(e), on(t));
}
var cn, ln, un, dn;
function fn() {
	if (cn === void 0) {
		cn = window, ln = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		un = u(t, "firstChild").get, dn = u(t, "nextSibling").get, h(e) && (e[_e] = void 0, e[ge] = null, e[ve] = void 0, e.__e = void 0), h(n) && (n[ye] = void 0);
	}
}
function F(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function I(e) {
	return un.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function L(e) {
	return dn.call(e);
}
function pn(e, t) {
	if (!w) return /* @__PURE__ */ I(e);
	var n = /* @__PURE__ */ I(T);
	if (n === null) n = T.appendChild(F());
	else if (t && n.nodeType !== 3) {
		var r = F();
		return n?.before(r), E(r), r;
	}
	return t && bn(n), E(n), n;
}
function mn(e, t = !1) {
	if (!w) {
		var n = /* @__PURE__ */ I(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ L(n) : n;
	}
	if (t) {
		if (T?.nodeType !== 3) {
			var r = F();
			return T?.before(r), E(r), r;
		}
		bn(T);
	}
	return T;
}
function hn(e, t = !1) {
	if (!w) return /* @__PURE__ */ I(e);
	var n = pn(e, t);
	return je(e), n;
}
function gn(e, t = 1, n = !1) {
	let r = w ? T : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ L(r);
	if (!w) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = F();
			return r === null ? i?.after(a) : r.before(a), E(a), a;
		}
		bn(r);
	}
	return E(r), r;
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
	var t = G;
	if (t === null) return H.f |= de, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	R(e, t);
}
function R(e, t) {
	if (e === Ce) throw e;
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
	G === null && (H === null && Ue(e), He()), Kn && Ve(e);
}
function Cn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function z(e, t) {
	var n = G;
	n !== null && n.f & 8192 && (e |= te);
	var r = {
		ctx: D,
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
	A?.register_created_effect(r);
	var i = r;
	if (e & 4) Ft === null ? zt.ensure().schedule(r) : Ft.push(r);
	else if (t !== null) {
		try {
			sr(r);
		} catch (e) {
			throw V(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ae));
	}
	if (i !== null && (i.parent = n, n !== null && Cn(i, n), H !== null && H.f & 2 && !(e & 64))) {
		var a = H;
		(a.effects ??= []).push(i);
	}
	return r;
}
function wn() {
	return H !== null && !U;
}
function Tn(e) {
	let t = z(8, null);
	return k(t, b), t.teardown = e, t;
}
function En(e) {
	Sn("$effect");
	var t = G.f;
	if (!H && t & 32 && D !== null && !D.i) {
		var n = D;
		(n.e ??= []).push(e);
	} else return Dn(e);
}
function Dn(e) {
	return z(4 | se, e);
}
function On(e) {
	return Sn("$effect.pre"), z(8 | se, e);
}
function kn(e) {
	zt.ensure();
	let t = z(64 | oe, e);
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
	return z(ue | oe, e);
}
function Mn(e, t = 0) {
	return z(8 | t, e);
}
function Nn(e, t = [], n = [], r = []) {
	gt(r, t, n, (t) => {
		z(8, () => {
			e(...t.map(Z));
		});
	});
}
function Pn(e, t = 0) {
	return z(16 | t, e);
}
function B(e) {
	return z(32 | oe, e);
}
function Fn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Kn, r = H;
		qn(!0), W(null);
		try {
			t.call(null);
		} catch (t) {
			R(t, e.parent);
		} finally {
			qn(n), W(r);
		}
	}
}
function In(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && mt(() => {
			e.abort(xe);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Rn(e.nodes.start, e.nodes.end), n = !0), e.f |= ie, In(e, t && !n), or(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Fn(e), e.f ^= ie, e.f |= ne;
	var i = e.parent;
	i !== null && i.first !== null && zn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Rn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ L(e);
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
		e.f ^= te;
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
		e.f ^= te, e.f & 1024 || (k(e, x), zt.ensure().schedule(e));
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
		var i = n === r ? null : /* @__PURE__ */ L(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Gn = null, Kn = !1;
function qn(e) {
	Kn = e;
}
var H = null, U = !1;
function W(e) {
	H = e;
}
var G = null;
function K(e) {
	G = e;
}
var q = null;
function Jn(e) {
	H !== null && (H.f & 2097152 || H.f & 2) && (q ??= /* @__PURE__ */ new Set()).add(e);
}
var J = null, Y = 0, X = null;
function Yn(e) {
	X = e;
}
var Xn = 1, Zn = 0, Qn = Zn;
function $n(e) {
	Qn = e;
}
function er() {
	return ++Xn;
}
function tr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (tr(a) && Dt(a), a.wv > e.wv) return !0;
		}
		t & 512 && j === null && k(e, b);
	}
	return !1;
}
function nr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(q !== null && q.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? nr(a, t, !1) : t === a && (n ? k(a, x) : a.f & 1024 && k(a, S), Wt(a));
	}
}
function rr(e) {
	var t = J, n = Y, r = X, i = H, a = q, o = D, s = U, c = Qn, l = e.f;
	J = null, Y = 0, X = null, H = l & 96 ? null : e, q = null, tt(e.ctx), U = !1, Qn = ++Zn, e.ac !== null && (mt(() => {
		e.ac.abort(xe);
	}), e.ac = null);
	try {
		e.f |= le;
		var u = e.fn, d = u();
		e.f |= re;
		var f = ir(e);
		if (at() && X !== null && !U && f !== null && !(e.f & 6146)) for (var p = 0; p < X.length; p++) nr(X[p], e);
		if (i !== null && i !== e) {
			if (Zn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Zn;
			if (t !== null) for (let e of t) e.rv = Zn;
			X !== null && (r === null ? r = X : r.push(...X));
		}
		return e.f & 8388608 && (e.f ^= de), d;
	} catch (t) {
		return ir(e), xn(t);
	} finally {
		e.f ^= le, J = t, Y = n, X = r, H = i, q = a, tt(o), U = s, Qn = c;
	}
}
function ir(e) {
	var t = e.deps, n = A?.is_fork;
	if (J !== null) {
		var r;
		if (n || or(e, Y), t !== null && Y > 0) for (t.length = Y + J.length, r = 0; r < J.length; r++) t[Y + r] = J[r];
		else e.deps = t = J;
		if (wn() && e.f & 512) for (r = Y; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Y < t.length && (or(e, Y), t.length = Y);
	return t;
}
function ar(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = o.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (J === null || !s.call(J, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512), a.v !== C && ut(a), a.ac !== null && mt(() => {
			a.ac.abort(xe), a.ac = null, k(a, x);
		}), Ot(a), or(a, 0);
	}
}
function or(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ar(e, n[r]);
}
function sr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		k(e, b);
		var n = G;
		G = e;
		try {
			t & 16777232 ? Ln(e) : In(e), Fn(e);
			var r = rr(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = Xn;
		} finally {
			G = n;
		}
	}
}
async function cr() {
	await Promise.resolve(), Bt();
}
function Z(e) {
	var t = !!(e.f & 2);
	if (Gn?.add(e), H !== null && !U && !(G !== null && G.f & 16384) && (q === null || !q.has(e))) {
		var n = H.deps;
		if (H.f & 2097152) e.rv < Zn && (e.rv = Zn, J === null && n !== null && n[Y] === e ? Y++ : J === null ? J = [e] : J.push(e));
		else {
			H.deps ??= [], s.call(H.deps, e) || H.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [H] : s.call(r, H) || r.push(H);
		}
	}
	if (Kn && M.has(e)) return M.get(e);
	if (t) {
		var i = e;
		if (Kn) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || ur(i)) && (a = Et(i)), M.set(i, a), a;
		}
		var o = !(i.f & 512) && !U && H !== null && !!(H.f & 512), c = (i.f & re) === 0;
		tr(i) && (o && (i.f |= 512), Dt(i)), o && !c && (kt(i), lr(i));
	}
	if (j?.has(e)) return j.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function lr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : s.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (kt(n), lr(n));
	}
}
function ur(e) {
	if (e.v === C) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (M.has(t) || t.f & 2 && ur(t)) return !0;
	return !1;
}
function Q(e) {
	var t = U;
	try {
		return U = !0, e();
	} finally {
		U = t;
	}
}
function dr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (fe in e) fr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && fe in n && fr(n);
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
		if (r.capture || wr.call(t, e), !e.cancelBubble) return mt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, O(() => {
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
		var d = H, f = G;
		W(null), K(null);
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
			e[hr] = t, delete e.currentTarget, W(d), K(f);
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
	var n = G;
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
		if (w) return $(T, null), T;
		i === void 0 && (i = Dr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ I(i)));
		var t = r || ln ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ I(t), s = t.lastChild;
			$(o, s);
		} else $(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function kr(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (w) return $(T, null), T;
		if (!o) {
			var e = /* @__PURE__ */ I(Dr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ I(e);) o.appendChild(/* @__PURE__ */ I(e));
			else o = /* @__PURE__ */ I(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ I(t), r = t.lastChild;
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
	if (!w) {
		var t = F(e + "");
		return $(t, t), t;
	}
	var n = T;
	return n.nodeType === 3 ? bn(n) : (n.before(n = F()), E(n)), $(n, n), n;
}
function Mr() {
	if (w) return $(T, null), T;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = F();
	return e.append(t, n), $(t, n), e;
}
function Nr(e, t) {
	if (w) {
		var n = G;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = T), Ae();
	} else e !== null && e.before(t);
}
function Pr() {
	if (w && T && T.nodeType === 8 && T.textContent?.startsWith("$")) {
		let e = T.textContent.substring(1);
		return Ae(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Fr(e) {
	let t = 0, n = Yt(0), r;
	return () => {
		wn() && (Z(n), Mn(() => (t === 0 && (r = Q(() => e(() => nn(n)))), t += 1, () => {
			O(() => {
				--t, t === 0 && (r?.(), r = void 0, nn(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ir = ae | oe;
function Lr(e, t, n, r) {
	new Rr(e, t, n, r);
}
var Rr = class {
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
	#h = Fr(() => (this.#m = Yt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = G;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = G.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Pn(() => {
			if (w) {
				let e = Pe(this.#t);
				Ae();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Ir), w && (this.#e = T);
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
		O(r), t && (this.#s = B(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? Oe() : (t = !0, n && Ye(), this.#s !== null && Bn(this.#s, () => {
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
		return (this.#i.f & (ne | ie)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = B(() => e(this.#e)), O(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = F(), n = !1;
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
				}), this.#a === null ? (this.#c = null, n && this.#S(A)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Bn(this.#o, () => {
					this.#o = null;
				}), this.#S(A));
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
			} else this.#S(A);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		dt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = G, n = H, r = D;
		K(this.#i), W(this.#i), tt(this.#i.ctx);
		try {
			return zt.ensure(), e();
		} finally {
			K(t), W(n), tt(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && Bn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, O(() => {
			this.#d = !1, this.#m && $t(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), Z(this.#m);
	}
	error(e) {
		if (e === Ce || !this.#n.onerror && !this.#n.failed) throw e;
		A?.is_fork ? (this.#a && A.skip_effect(this.#a), this.#o && A.skip_effect(this.#o), this.#s && A.skip_effect(this.#s), A.oncommit(() => {
			this.#y() || this.#T(e);
		})) : this.#T(e);
	}
	#T(e) {
		this.#a &&= (V(this.#a), null), this.#o &&= (V(this.#o), null), this.#s &&= (V(this.#s), null), w && (E(this.#t), Me(), E(Ne()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return B(() => {
						var r = G;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return R(e, this.#i.parent), null;
				}
			}));
		};
		O(() => {
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
	n !== (e[ye] ??= e.nodeValue) && (e[ye] = n, e.nodeValue = `${n}`);
}
function Br(e, t) {
	return Hr(e, t);
}
var Vr = /* @__PURE__ */ new Map();
function Hr(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	fn();
	var l = void 0, u = kn(() => {
		var o = n ?? t.appendChild(F());
		Lr(o, { pending: () => {} }, (t) => {
			nt({});
			var n = D;
			if (a && (n.c = a), i && (r.$$events = i), w && $(t, null), l = e(t, r) || it(), w && (G.nodes.end = T, T === null || T.nodeType !== 8 || T.data !== "]")) throw Ee(), Ce;
			rt();
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
						Wn(r, t), t.append(F()), this.#n.set(e, {
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
		var n = A, r = vn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = F();
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
		} else w && (this.anchor = T), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Gr(e, t, n = !1) {
	var r;
	w && (r = T, Ae());
	var i = new Wr(e), a = n ? ae : 0;
	function o(e, t) {
		if (w) {
			var n = Pe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ne();
				E(a), i.anchor = a, ke(!1), i.ensure(e, t), ke(!0);
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
	w && Ae();
	var r = new Wr(e), i = !at();
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
		r?.has(a) ? (a.f |= ce, Wn(a, document.createDocumentFragment())) : V(t[i], n);
	}
}
var Zr;
function Qr(e, t, n, r, i, o = null) {
	var s = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		s = w ? E(/* @__PURE__ */ I(u)) : u.appendChild(F());
	}
	w && Ae();
	var d = null, f = /* @__PURE__ */ wt(() => {
		var e = n();
		return a(e) ? e : e == null ? [] : c(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = Z(f);
			_.fallback = d, ei(_, n, s, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= ce, ni(d, null, s)) : Hn(d) : Bn(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: Pn(() => {
			var e = Z(f), a = e.length;
			let c = !1;
			w && Pe(s) === "[!" != (a === 0) && (s = Ne(), E(s), ke(!1), c = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = A, v = vn(), y = 0; y < a; y += 1) {
				w && T.nodeType === 8 && T.data === "]" && (s = T, c = !0, ke(!1));
				var ee = e[y], b = r(ee, y), x = m ? null : l.get(b);
				x ? (x.v && $t(x.v, ee), x.i && $t(x.i, y), v && _.unskip_effect(x.e)) : (x = ti(l, m ? s : Zr ??= F(), ee, b, y, i, t, n), m || (x.e.f |= ce), l.set(b, x)), u.add(b);
			}
			if (a === 0 && o && !d && (m ? d = B(() => o(s)) : (d = B(() => o(Zr ??= F())), d.f |= ce)), a > u.size && Be("", "", ""), w && a > 0 && E(Ne()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			c && ke(!0), Z(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, w && (s = T);
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
			if (_.f ^= ce, _ === l) ni(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ri(e, d, _), ri(e, _, y), ni(_, y, n), d = _, p = [], m = [], l = $r(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var ee = m[0], b;
					d = ee.prev;
					var x = p[0], S = p[p.length - 1];
					for (b = 0; b < p.length; b += 1) ni(p[b], ee, n);
					for (b = 0; b < m.length; b += 1) u.delete(m[b]);
					ri(e, x.prev, S.next), ri(e, d, x), ri(e, S, ee), l = ee, d = S, --v, p = [], m = [];
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
		var te = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || te.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && te.push(l), l = $r(l.next);
		var ne = te.length;
		if (ne > 0) {
			var re = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.fix();
			}
			Yr(e, te, re);
		}
	}
	a && O(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function ti(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Yt(n) : /* @__PURE__ */ Xt(n, !1, !1) : null, l = o & 2 ? Yt(i) : null;
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
		var o = /* @__PURE__ */ L(r);
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
	}, ae);
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function ai(e, t, n) {
	var r;
	w && (r = T, Ae());
	var i = new Wr(e);
	Pn(() => {
		var e = t() ?? null;
		if (w && Pe(r) === "[" != (e !== null)) {
			var a = Ne();
			E(a), i.anchor = a, ke(!1), i.ensure(e, e && ((t) => n(t, e))), ke(!0);
		} else i.ensure(e, e && ((t) => n(t, e)));
	}, ae);
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
	var o = e[_e];
	if (w || o !== n || o === void 0) {
		var s = ui(n, r, a);
		w && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[_e] = n;
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
	var i = e[ve];
	if (w || i !== t) {
		var a = pi(t, r);
		w && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ve] = t;
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
			_i(c, r ? i.includes(l) : sn(l, n));
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
		if (!a(t)) return De();
		for (var r of e.options) r.selected = t.includes(Si(r));
	} else {
		for (r of e.options) if (sn(Si(r), t)) {
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
	ht(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Si);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Si(o);
		}
		n(a), e.__value = a, A !== null && r.add(A);
	}), An(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = A;
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
var wi = Symbol("is custom element"), Ti = Symbol("is html"), Ei = Se ? "link" : "LINK", Di = Se ? "progress" : "PROGRESS";
function Oi(e) {
	if (w) {
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
		e[be] = n, O(n), pt();
	}
}
function ki(e, t) {
	var n = ji(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Di) && (e.value = t ?? "");
}
function Ai(e, t, n, r) {
	var i = ji(e);
	w && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Ei) || i[t] !== (i[t] = n) && (t === "loading" && (e[he] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ni(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function ji(e) {
	return e[ge] ??= {
		[wi]: e.nodeName.includes("-"),
		[Ti]: e.namespaceURI === we
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
	ht(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = zi(e) ? Bi(a) : a, n(a), A !== null && r.add(A), await cr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (w && e.defaultValue !== e.value || Q(t) == null && e.value) && (n(zi(e) ? Bi(e.value) : e.value), A !== null && r.add(A)), Mn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = A;
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
	o.push(n), ht(n, "change", () => {
		var e = n.__value;
		a && (e = Ri(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), Mn(() => {
		var e = r();
		w && n.defaultChecked !== n.checked ? s = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = sn(n.__value, e);
	}), Tn(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), Fi.has(o) || (Fi.add(o), O(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), Fi.delete(o);
	})), O(() => {
		if (s) {
			var e = a ? Ri(o, e, n.checked) : o.find((e) => e.checked)?.__value;
			i(e);
		}
	});
}
function Li(e, t, n = t) {
	ht(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (w && e.defaultChecked !== e.checked || Q(t) == null) && n(e.checked), Mn(() => {
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
	An(() => (Q(() => n(e[t])), r));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Ui(e, t) {
	return e === t || e?.[fe] === t;
}
function Wi(e = it(), t, n, r) {
	var i = D.r, a = G;
	return An(() => {
		var o, s;
		return Mn(() => {
			o = s, s = r?.() || [], Q(() => {
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
	var r = e === "x", i = () => mt(() => {
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
	let t = D, n = t.l.u;
	if (!n) return;
	let r = () => dr(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ bt(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => Z(i);
	}
	n.b.length && On(() => {
		qi(t, r), v(n.b);
	}), En(() => {
		let e = Q(() => n.m.map(_));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && En(() => {
		qi(t, r), v(n.a);
	});
}
function qi(e, t) {
	if (e.l.s) for (let t of e.l.s) Z(t);
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
	var i = !Xe || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, d = () => o && i ? (l ??= /* @__PURE__ */ bt(r), Z(l)) : (c && (c = !1, s = o ? Q(r) : r), s);
	let f;
	if (a) {
		var p = fe in e || me in e;
		f = u(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = Yi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ge(t), f(m)));
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
	var v = !1, y = (n & 1 ? bt : wt)(() => (v = !1, g()));
	a && Z(y);
	var ee = G;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? Z(y) : i && a ? an(e) : e;
			return P(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return Kn && v || ee.f & 16384 ? y.v : Z(y);
	});
}
function Zi(e) {
	D === null && Re("onMount"), Xe && D.l !== null ? Qi(D).m.push(e) : En(() => {
		let t = Q(e);
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
	} : t?.state === "match" ? {
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
	let t = ([e, t]) => `${Ta(t)} ${e}`, n = e?.steps?.length ? e.times > 1 ? `${e.times} × (${e.steps.map(t).join(" + ")})` : e.steps.map(t).join(" → ") : e?.target?.type === "distance" ? `${va(e.target.km)} km run` : null;
	return n ? [
		e.warmup_s > 0 && `${Ta(e.warmup_s)} warm-up walk`,
		n,
		e.cooldown_s > 0 && `${Ta(e.cooldown_s)} cool-down walk`,
		e.note
	].filter(Boolean).join(" · ") : "";
}
function Da(e, t = null) {
	if (e.state === "none") return "No track to check · counts by duration";
	if (e.state === "indoor") return t == null ? "Indoor run" : `Indoor: ${t.toFixed(1)} km/h average`;
	let n = e.state === "match" ? "matches" : "doesn't match";
	return `${e.found} of ${e.planned} run blocks · ${wa(e.run_s)} of ${Ta(e.planned_run_s)} running · ${n} ${e.label}`;
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
var Aa = (e) => e.map((e) => ({ sessions: Array.from({ length: e.repeat ?? 1 }, () => e.sessions).flat().map((e) => structuredClone(e)) })), ja = (e) => (e.warmup_s ?? 0) + (e.times ?? 1) * (e.intervals ?? []).reduce((e, [, t]) => e + t, 0) + (e.cooldown_s ?? 0), Ma = (e) => ({
	...e,
	cooldown_s: e.cooldown_s ?? 0,
	steps: e.intervals ?? [],
	times: e.times ?? 1,
	note: e.note || null,
	intervals: Array.from({ length: e.times ?? 1 }, () => e.intervals ?? []).flat()
}), Na = (e) => ({
	warmup_s: e.warmup_s ?? 0,
	cooldown_s: e.cooldown_s ?? 0,
	intervals: structuredClone(e.intervals ?? []),
	times: e.times ?? 1,
	target: {
		type: e.target?.type ?? "duration",
		km: e.target?.km ?? 5
	},
	note: e.note ?? ""
});
function Pa(e) {
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
function Fa(e, t) {
	let n = Object.hasOwn(t, e.person) ? e.person : null;
	return {
		self: n,
		others: Object.keys(t).filter((e) => e !== n)
	};
}
var Ia = (e) => `${Number(e.slice(8, 10))} ${ma[Number(e.slice(5, 7)) - 1]}`;
function La(e, t, n) {
	let r = t.find((t) => t.key === e.key);
	return n - e.at > 6e5 || !r || e.want !== null && r.excluded === e.want;
}
function Ra(e, t, n) {
	let r = (e[t] ?? Promise.resolve()).then(n), i = e[t] = r.catch(() => {});
	return i.then(() => e[t] === i && delete e[t]), r;
}
function za(e) {
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
var Ba = {
	name: [1, 40],
	replace_at_km: [
		100,
		3e3,
		10
	]
}, Va = (e, t) => !!t && (e.run_shoes !== void 0 || (e.shoes ?? []).some((e) => e.id != null));
function Ha(e, t, { partial: n = !1 } = {}) {
	let r = {};
	if (!(n && e === void 0)) {
		let t = String(e ?? "").trim();
		if (t.length < Ba.name[0]) return { error: "Give the shoe a name" };
		if (t.length > Ba.name[1]) return { error: `A name of at most ${Ba.name[1]} characters` };
		r.name = t;
	}
	if (!(n && t === void 0)) {
		let [e, n] = Ba.replace_at_km, i = typeof t == "number" ? t : t === null || String(t).trim() === "" ? NaN : Number(t);
		if (!(i >= e && i <= n)) return { error: `Replace at: ${e} to ${n} km` };
		r.replace_at_km = i;
	}
	return r;
}
function Ua(e, t) {
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
var Wa = {
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
}, Ga = [
	"runs",
	"workouts",
	"active_days",
	"steps"
], Ka = {
	runs: 0,
	workouts: 0,
	active_days: 0,
	steps: 1e4
};
function qa(e, t) {
	let [n, r, i] = Wa[e];
	return Math.min(r, Math.max(n, Math.round(t / i) * i));
}
function Ja(e, t) {
	let n = e.current, r = (t) => n?.people?.[t] ?? e.defaults?.[t] ?? {};
	return {
		people: Object.fromEntries(Object.keys(t).map((e) => {
			let t = r(e);
			return [e, Object.fromEntries(Ga.map((e) => [e, qa(e, t[e] ?? Ka[e])]))];
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
var Ya = (e) => e ? `Max HR ${e.bpm} · ${e.source === "measured" && e.date ? `measured ${Ia(e.date)}` : e.source}` : "—";
function Xa(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return t.setUTCDate(t.getUTCDate() + 3 - (t.getUTCDay() + 6) % 7), Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5 + 1) / 7);
}
var Za = (e, t) => Ga.every((n) => (n === "workouts" ? na(t) : t[n]) === e[n]), Qa = (e, t, n) => n - e.at > 6e5 || Object.entries(e.entry.people).every(([e, n]) => !t[e] || Za(n, t[e].week.goal));
function $a(e, t) {
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
var eo = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${ea(e.getMonth() + 1)}-${ea(e.getDate())}`;
function to(e, t, n) {
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
function no(e) {
	let t = e.filter((e) => e.active).length;
	return `${t} active ${t === 1 ? "day" : "days"} · ${oa(e.reduce((e, t) => e + (t.steps ?? 0), 0))} steps`;
}
var ro = (e) => `${e.w} ${e.unit} × ${e.r}`, io = [
	"Chest",
	"Back",
	"Shoulders",
	"Arms",
	"Legs",
	"Core",
	"Other"
], ao = (e) => io.map((t) => ({
	group: t,
	lifts: (e ?? []).filter((e) => (io.includes(e.group) ? e.group : "Other") === t)
})).filter((e) => e.lifts.length), oo = (e) => ao(e).map(({ group: e, lifts: t }) => ({
	group: e,
	count: t.length,
	lift: [...t].sort((e, t) => (t.sessions ?? 0) - (e.sessions ?? 0) || t.date.localeCompare(e.date) || e.name.localeCompare(t.name))[0]
})), so = (e) => ao(e).map(({ group: e, lifts: t }) => ({
	group: e,
	lifts: [...t].sort((e, t) => e.name.localeCompare(t.name))
})), co = (e) => `${Math.floor(e / 60)}:${ea(e % 60)}`, lo = (e) => new Set([...(e?.lifts ?? []).map((e) => e.key), e?.fastest_1k?.key].filter(Boolean)), uo = (e, t) => !!t && t.last_received == null && !e.feed.length, fo = (e, t) => [.../* @__PURE__ */ new Set([e.person, ...e.can_connect ?? []])].filter((e) => Object.hasOwn(t, e)), po = {
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
}, mo = (e) => po[e] ?? {
	title: "Which phone do you have?",
	steps: []
};
function ho(e) {
	return e?.invite ? {
		before: `${e.in_ha ? `Open openGym from the Home Assistant sidebar in Chrome, not in the Home Assistant app (${e.url}). Choose` : `Open openGym at ${e.url}, choose`} Create new profile, enter code `,
		code: e.invite,
		after: ", then Add to Home Screen. Does openGym show someone else? Sign out there first."
	} : null;
}
function go(e, t, n = null) {
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
var _o = (e) => String(e).padStart(2, "0"), vo = (e) => /T(\d+:\d+)/.exec(e ?? "")?.[1] ?? "";
function yo(e) {
	let t = Math.round(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60);
	return n ? `${n}:${_o(r)}:${_o(t % 60)}` : `${r}:${_o(t % 60)}`;
}
var bo = (e) => e.summary.kind === "run" || e.summary.kind === "walk", xo = (e) => !!e.route?.length && !bo(e), So = (e) => e ? 3600 / e : null, Co = (e) => ({
	title: e.name,
	date: ha(e.start, !1),
	time: e.end ? `${vo(e.start)}–${vo(e.end)}` : vo(e.start),
	duration: ga(e.minutes),
	plan: e.plan ?? null
});
function wo(e) {
	let t = e.summary, n = t.km > 0 ? t.km : null, r = n && bo(e) ? Math.round(t.minutes * 60 / n) : null;
	return [
		["Distance", n && `${n.toFixed(1)} km`],
		["Pace", r && `${yo(r)} /km`],
		["Speed", n && xo(e) && `${(n / (t.minutes / 60)).toFixed(1)} km/h`],
		["Elevation gain", e.gain_m != null && `${Math.round(e.gain_m)} m`],
		["Avg heart rate", t.avg_hr != null && `${Math.round(t.avg_hr)} bpm`],
		["Max heart rate", t.max_hr != null && `${Math.round(t.max_hr)} bpm`],
		["Calories", t.kcal != null && `${Math.round(t.kcal)} kcal`],
		["Shoe", t.kind === "run" && t.shoe?.name]
	].filter(([, e]) => e);
}
function To(e) {
	let t = xo(e);
	return e.splits.map((e, n) => ({
		km: e.km === 1 ? String(n + 1) : `${e.km} km`,
		time: yo(e.s),
		pace: e.pace ? t ? So(e.pace).toFixed(1) : yo(e.pace) : "—",
		hr: e.hr == null ? "—" : String(e.hr),
		climb: e.climb == null ? "—" : `${Math.round(e.climb)} m`
	}));
}
function Eo(e, t) {
	if (!e) return null;
	let n = e.reduce((e, t) => e + t, 0), r = (e) => Math.round(e * t);
	return e.map((e, t) => ({
		zone: `Z${t + 1}`,
		bpm: t === 4 ? `${r(.9)}+` : `${r(.5 + t / 10)}–${r(.6 + t / 10)}`,
		time: yo(e),
		pct: n ? Math.round(e / n * 100) : 0
	}));
}
var Do = (e) => e && {
	exercises: e.exercises.map((e) => ({
		name: e.name,
		set: ro(e),
		record: e.record
	})),
	volume: `${Math.round(e.vol_kg).toLocaleString("en-US")} kg`
};
function Oo(e) {
	if (!e.series) return null;
	let { t, pace: n, hr: r, ele: i } = e.series;
	return {
		x: t,
		list: [
			xo(e) ? {
				label: "Speed km/h",
				values: n.map(So),
				color: "--gym"
			} : {
				label: "Pace /km",
				values: n,
				color: "--run",
				fmt: yo
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
function ko(e, t, n) {
	return e?.can_edit?.includes(t) ? {
		remove: ba(n).removable,
		shoe: n.kind === "run"
	} : {
		remove: null,
		shoe: !1
	};
}
var Ao = (e) => ({
	file_missing: "Route file not found",
	file_unreadable: "Route file unreadable"
})[e] ?? null, jo = an({
	wide: !1,
	reducedMotion: !1
}), Mo = matchMedia("(min-width: 768px)"), No = matchMedia("(prefers-reduced-motion: reduce)"), Po = () => {
	jo.wide = Mo.matches, jo.reducedMotion = No.matches;
};
Mo.addEventListener("change", Po), No.addEventListener("change", Po), Po();
export { Ha as $, mn as $t, ho as A, ii as At, co as B, Ar as Bt, Aa as C, xi as Ct, Ja as D, mi as Dt, Qa as E, gi as Et, eo as F, Br as Ft, lo as G, yr as Gt, Oa as H, jr as Ht, Ya as I, zr as It, Ra as J, Q as Jt, la as K, Z as Kt, xa as L, Nr as Lt, Fa as M, Jr as Mt, ua as N, qr as Nt, oo as O, ci as Ot, ro as P, Gr as Pt, ja as Q, pn as Qt, Ca as R, Mr as Rt, ia as S, ki as St, ra as T, yi as Tt, ka as U, xr as Ut, La as V, Pr as Vt, Ea as W, br as Wt, Na as X, En as Xt, Pa as Y, Nn as Yt, Ma as Z, cn as Zt, qa as _, r as _n, Li as _t, wo as a, tn as an, sa as at, go as b, Oi as bt, Ao as c, nt as cn, to as ct, To as d, Me as dn, Zi as dt, hn as en, Ua as et, Eo as f, je as fn, Xi as ft, Da as g, i as gn, Hi as gt, Ba as h, n as hn, Wi as ht, ko as i, N as in, fa as it, Xa as j, Qr as jt, so as k, ai as kt, bo as l, $e as ln, da as lt, Ga as m, ee as mn, Gi as mt, Oo as n, an as nn, Va as nt, Do as o, Ct as on, no as ot, Wa as p, g as pn, Ki as pt, aa as q, cr as qt, yo as r, P as rn, Ia as rt, Co as s, rt as sn, ca as st, jo as t, gn as tn, za as tt, xo as u, Ze as un, $a as ut, fo as v, t as vn, Ii as vt, ba as w, bi as wt, mo as x, Ai as xt, uo as y, Pi as yt, Sa as z, Or as zt };
