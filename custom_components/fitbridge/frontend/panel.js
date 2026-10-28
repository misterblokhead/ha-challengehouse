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
var b = 1024, x = 2048, S = 4096, C = 8192, w = 16384, T = 32768, ee = 1 << 25, te = 65536, ne = 1 << 19, re = 1 << 20, ie = 1 << 25, ae = 1 << 21, oe = 1 << 22, se = 1 << 23, ce = Symbol("$state"), le = Symbol("component"), ue = Symbol("legacy props"), de = Symbol(""), fe = Symbol("attributes"), pe = Symbol("class"), me = Symbol("style"), he = Symbol("text"), ge = Symbol("form reset"), _e = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ve = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), ye = {}, E = Symbol("uninitialized"), be = "http://www.w3.org/1999/xhtml";
function xe() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Se(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ce() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var D = !1;
function we(e) {
	D = e;
}
var O;
function Te(e) {
	if (e === null) throw Se(), ye;
	return O = e;
}
function Ee() {
	return Te(/* @__PURE__ */ ln(O));
}
function k(e) {
	if (D) {
		if (/* @__PURE__ */ ln(O) !== null) throw Se(), ye;
		O = e;
	}
}
function De(e = 1) {
	if (D) {
		for (var t = e, n = O; t--;) n = /* @__PURE__ */ ln(n);
		O = n;
	}
}
function Oe(e = !0) {
	for (var t = 0, n = O;;) {
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
	if (!e || e.nodeType !== 8) throw Se(), ye;
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
var A = null;
function Xe(e) {
	A = e;
}
function j(e, t = !1, n) {
	A = {
		p: A,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: W,
		l: Ge && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function M(e) {
	var t = A, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Sn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, A = t.p, Ze(e);
}
function Ze(e = {}) {
	return c(e, le, { value: !0 }), e;
}
function Qe() {
	return !Ge || A !== null && A.l === null;
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
function N(e, t) {
	e.f = e.f & rt | t;
}
function it(e) {
	e.f & 512 || e.deps === null ? N(e, b) : N(e, S);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function at(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), N(e, b);
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
var ot = !1;
function st() {
	ot || (ot = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ge]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ct(e) {
	var t = U, n = W;
	Gn(null), Kn(null);
	try {
		return e();
	} finally {
		Gn(t), Kn(n);
	}
}
function lt(e, t, n, r = n) {
	e.addEventListener(t, () => ct(n));
	let i = e[ge];
	e[ge] = i ? () => {
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
	var s = W, c = dt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
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
	var e = W, t = U, n = A, r = F;
	return function(i = !0) {
		Kn(e), Gn(t), Xe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ft(e = !0) {
	Kn(null), Gn(null), Xe(null), e && F?.deactivate();
}
function pt() {
	var e = W, t = e.b, n = F, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function mt(e) {
	var t = 2 | x;
	return W !== null && (W.f |= ne), {
		ctx: A,
		deps: null,
		effects: null,
		equals: Ae,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: E,
		wv: 0,
		parent: W,
		ac: null
	};
}
var ht = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function gt(e, t, n) {
	let r = W;
	r === null && Pe();
	var i = void 0, a = Wt(E), o = !U, s = /* @__PURE__ */ new Set();
	return En(() => {
		var t = W, n = v();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== _e && n.reject(e);
			}).finally(ft);
		} catch (e) {
			n.reject(e), ft();
		}
		var c = F;
		if (o) {
			if (t.f & 32768) var l = pt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(ht);
			else for (let e of s.values()) e.reject(ht);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== ht && (c.activate(), t ? (a.f |= se, Jt(a, t)) : (a.f & 8388608 && (a.f ^= se), Jt(a, e)), c.deactivate());
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
function P(e) {
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
	var t, n = W, r = e.parent;
	if (!Hn && r !== null && e.v !== E && r.f & 24576) return xe(), e.v;
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
	!e.equals(t) && (e.wv = rr(), (!F?.is_fork || e.deps === null) && (F === null ? e.v = t : (F.capture(e, t, !0), wt?.capture(e, t, !0)), e.deps === null)) ? N(e, b) : Hn || (Tt === null ? it(e) : (yn() || F?.is_fork) && Tt.set(e, t));
}
function xt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ct(() => {
		t.ac.abort(_e), t.ac = null;
	}), t.fn !== null && (t.teardown = h), lr(t, 0), jn(t));
}
function St(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var Ct = null, F = null, wt = null, Tt = null, Et = null, Dt = !1, Ot = !1, kt = null, At = null, jt = 0, Mt = 1, Nt = class e {
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
			for (var r of n.d) N(r, x), t(r);
			for (r of n.m) N(r, S), t(r);
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
		for (let e of this.#u) this.#d.delete(e), N(e, x), this.schedule(e);
		for (let e of this.#d) N(e, S), this.schedule(e);
		this.apply();
		for (var t = kt = [], n = [], r = At = []; this.#c.length > 0;) {
			jt++ > 1e3 && (this.#S(), Ft());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Bt(e), this.#h() || this.discard(), t;
			}
		}
		if (F = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (kt = null, At = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) zt(e, t);
			r.length > 0 && F.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), wt = this, Lt(n), Lt(t), wt = null, this.#s?.resolve();
			var o = F;
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), N(i, x), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), F = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) at(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== E && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Tt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		F = this;
	}
	deactivate() {
		F = null, Tt = null;
	}
	flush() {
		try {
			Ot = !0, F = this, this.#_();
		} finally {
			jt = 0, Et = null, kt = null, At = null, Ot = !1, F = null, Tt = null, Ht.clear();
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
		if (F === null) {
			let t = F = new e();
			!Ot && !Dt && tt(() => {
				t.#e || t.flush();
			});
		}
		return F;
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
			if (nt(), F === null) return r;
			F.flush();
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
	F.schedule(e);
}
function zt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), N(e, b);
		for (var n = e.first; n !== null;) zt(n, t), n = n.next;
	}
}
function Bt(e) {
	N(e, b);
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
function I(e, t) {
	let n = Wt(e, t);
	return Jn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Gt(e, t = !1, n = !0) {
	let r = Wt(e);
	return t || (r.equals = Me), Ge && n && A !== null && A.l !== null && (A.l.s ??= []).push(r), r;
}
function L(e, t, n = !1) {
	return U !== null && (!Wn || U.f & 131072) && Qe() && U.f & 4325394 && (qn === null || !qn.has(e)) && Ue(), Jt(e, n ? Qt(t) : t, At);
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
		e.wv = rr(), Kt = null, qt = 0, Zt(e, x, n), Kt = null, Qe() && W !== null && W.f & 1024 && !(W.f & 96) && (Zn === null ? Qn([e]) : Zn.push(e)), !r.is_fork && Vt.size > 0 && !Ut && Yt();
	}
	return t;
}
function Yt() {
	Ut = !1;
	for (let e of Vt) {
		e.f & 1024 && N(e, S);
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
	L(e, e.v + 1);
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
			if (i || s !== W) {
				var l = (c & x) === 0;
				if (l && N(s, t), c & 131072) Vt.add(s);
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
	if (typeof e != "object" || !e || ce in e || le in e) return e;
	let t = p(e);
	if (t !== d && t !== f) return e;
	var n = /* @__PURE__ */ new Map(), r = i(e), a = /* @__PURE__ */ I(0), o = null, s = tr, c = (e) => {
		if (tr === s) return e();
		var t = U, n = tr;
		Gn(null), nr(s);
		var r = e();
		return Gn(t), nr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ I(e.length, o)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Ve();
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
					let e = c(() => /* @__PURE__ */ I(E, o));
					n.set(t, e), Xt(a);
				}
			} else L(r, E), Xt(a);
			return !0;
		},
		get(t, r, i) {
			if (r === ce) return e;
			var a = n.get(r), s = r in t;
			if (a === void 0 && (!s || l(t, r)?.writable) && (a = c(() => /* @__PURE__ */ I(Qt(s ? t[r] : E), o)), n.set(r, a)), a !== void 0) {
				var u = G(a);
				return u === E ? void 0 : u;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = G(i);
				if (a === E) return;
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
			if (t === ce) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== E || Reflect.has(e, t);
			return (r !== void 0 || W !== null && (!i || l(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ I(i ? Qt(e[t]) : E, o)), n.set(t, r)), G(r) === E) ? !1 : i;
		},
		set(e, t, i, s) {
			var u = n.get(t), d = t in e;
			if (r && t === "length") for (var f = i; f < u.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ I(E, o)), n.set(f + "", p)) : L(p, E);
			}
			if (u === void 0) (!d || l(e, t)?.writable) && (u = c(() => /* @__PURE__ */ I(void 0, o)), L(u, Qt(i)), n.set(t, u));
			else {
				d = u.v !== E;
				var m = c(() => Qt(i));
				L(u, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, i), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && L(g, _ + 1);
				}
				Xt(a);
			}
			return !0;
		},
		ownKeys(e) {
			G(a);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== E;
			});
			for (var [r, i] of n) i.v !== E && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			He();
		}
	});
}
function $t(e) {
	try {
		if (typeof e == "object" && e && ce in e) return e[ce];
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
		rn = l(t, "firstChild").get, an = l(t, "nextSibling").get, m(e) && (e[pe] = void 0, e[fe] = null, e[me] = void 0, e.__e = void 0), m(n) && (n[he] = void 0);
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
function R(e, t) {
	if (!D) return /* @__PURE__ */ cn(e);
	var n = /* @__PURE__ */ cn(O);
	if (n === null) n = O.appendChild(sn());
	else if (t && n.nodeType !== 3) {
		var r = sn();
		return n?.before(r), Te(r), r;
	}
	return t && pn(n), Te(n), n;
}
function z(e, t = !1) {
	if (!D) {
		var n = /* @__PURE__ */ cn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ln(n) : n;
	}
	if (t) {
		if (O?.nodeType !== 3) {
			var r = sn();
			return O?.before(r), Te(r), r;
		}
		pn(O);
	}
	return O;
}
function B(e, t = !1) {
	if (!D) return /* @__PURE__ */ cn(e);
	var n = R(e, t);
	return k(e), n;
}
function V(e, t = 1, n = !1) {
	let r = D ? O : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ ln(r);
	if (!D) return r;
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
	var t = W;
	if (t === null) return U.f |= se, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	hn(e, t);
}
function hn(e, t) {
	if (e === ye) throw e;
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
	W === null && (U === null && Re(e), Le()), Hn && Ie(e);
}
function _n(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function vn(e, t) {
	var n = W;
	n !== null && n.f & 8192 && (e |= C);
	var r = {
		ctx: A,
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
	F?.register_created_effect(r);
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
	if (i !== null && (i.parent = n, n !== null && _n(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function yn() {
	return U !== null && !Wn;
}
function bn(e) {
	let t = vn(8, null);
	return N(t, b), t.teardown = e, t;
}
function xn(e) {
	gn("$effect");
	var t = W.f;
	if (!U && t & 32 && A !== null && !A.i) {
		var n = A;
		(n.e ??= []).push(e);
	} else return Sn(e);
}
function Sn(e) {
	return vn(4 | re, e);
}
function Cn(e) {
	return gn("$effect.pre"), vn(8 | re, e);
}
function wn(e) {
	Nt.ensure();
	let t = vn(64 | ne, e);
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
	return vn(oe | ne, e);
}
function Dn(e, t = 0) {
	return vn(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	ut(r, t, n, (t) => {
		vn(8, () => {
			e(...t.map(G));
		});
	});
}
function On(e, t = 0) {
	return vn(16 | t, e);
}
function kn(e) {
	return vn(32 | ne, e);
}
function An(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Hn, r = U;
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
			e.abort(_e);
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
		e.f ^= C, e.f & 1024 || (N(e, x), Nt.ensure().schedule(e));
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
var U = null, Wn = !1;
function Gn(e) {
	U = e;
}
var W = null;
function Kn(e) {
	W = e;
}
var qn = null;
function Jn(e) {
	U !== null && (U.f & 2097152 || U.f & 2) && (qn ??= /* @__PURE__ */ new Set()).add(e);
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
		t & 512 && Tt === null && N(e, b);
	}
	return !1;
}
function ar(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(qn !== null && qn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ar(a, t, !1) : t === a && (n ? N(a, x) : a.f & 1024 && N(a, S), Rt(a));
	}
}
function or(e) {
	var t = Yn, n = Xn, r = Zn, i = U, a = qn, o = A, s = Wn, c = tr, l = e.f;
	Yn = null, Xn = 0, Zn = null, U = l & 96 ? null : e, qn = null, Xe(e.ctx), Wn = !1, tr = ++er, e.ac !== null && (ct(() => {
		e.ac.abort(_e);
	}), e.ac = null);
	try {
		e.f |= ae;
		var u = e.fn, d = u();
		e.f |= T;
		var f = sr(e);
		if (Qe() && Zn !== null && !Wn && f !== null && !(e.f & 6146)) for (var p = 0; p < Zn.length; p++) ar(Zn[p], e);
		if (i !== null && i !== e) {
			if (er++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = er;
			if (t !== null) for (let e of t) e.rv = er;
			Zn !== null && (r === null ? r = Zn : r.push(...Zn));
		}
		return e.f & 8388608 && (e.f ^= se), d;
	} catch (t) {
		return sr(e), mn(t);
	} finally {
		e.f ^= ae, Yn = t, Xn = n, Zn = r, U = i, qn = a, Xe(o), Wn = s, tr = c;
	}
}
function sr(e) {
	var t = e.deps, n = F?.is_fork;
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
		s.f & 512 && (s.f ^= 512), s.v !== E && it(s), s.ac !== null && ct(() => {
			s.ac.abort(_e), s.ac = null, N(s, x);
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
		N(e, b);
		var n = W;
		W = e;
		try {
			t & 16777232 ? Mn(e) : jn(e), An(e);
			var r = or(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = $n;
		} finally {
			W = n;
		}
	}
}
async function dr() {
	await Promise.resolve(), Pt();
}
function G(e) {
	var t = !!(e.f & 2);
	if (Vn?.add(e), U !== null && !Wn && !(W !== null && W.f & 16384) && (qn === null || !qn.has(e))) {
		var n = U.deps;
		if (U.f & 2097152) e.rv < er && (e.rv = er, Yn === null && n !== null && n[Xn] === e ? Xn++ : Yn === null ? Yn = [e] : Yn.push(e));
		else {
			U.deps ??= [], o.call(U.deps, e) || U.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [U] : o.call(r, U) || r.push(U);
		}
	}
	if (Hn && Ht.has(e)) return Ht.get(e);
	if (t) {
		var i = e;
		if (Hn) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || pr(i)) && (a = yt(i)), Ht.set(i, a), a;
		}
		var s = !(i.f & 512) && !Wn && U !== null && !!(U.f & 512), c = (i.f & T) === 0;
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
	if (e.v === E) return !0;
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
		if (ce in e) gr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && ce in n && gr(n);
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
function K(e, t, n) {
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
		var d = U, f = W;
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
	var n = W;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function q(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (D) return jr(O, null), O;
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
		if (D) return jr(O, null), O;
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
function Pr(e = "") {
	if (!D) {
		var t = sn(e + "");
		return jr(t, t), t;
	}
	var n = O;
	return n.nodeType === 3 ? pn(n) : (n.before(n = sn()), Te(n)), jr(n, n), n;
}
function Fr() {
	if (D) return jr(O, null), O;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
	return e.append(t, n), jr(t, n), e;
}
function J(e, t) {
	if (D) {
		var n = W;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = O), Ee();
	} else e !== null && e.before(t);
}
function Ir() {
	if (D && O && O.nodeType === 8 && O.textContent?.startsWith("$")) {
		let e = O.textContent.substring(1);
		return Ee(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Lr(e) {
	let t = 0, n = Wt(0), r;
	return () => {
		yn() && (G(n), Dn(() => (t === 0 && (r = mr(() => e(() => Xt(n)))), t += 1, () => {
			tt(() => {
				--t, t === 0 && (r?.(), r = void 0, Xt(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Rr = te | ne;
function zr(e, t, n, r) {
	new Br(e, t, n, r);
}
var Br = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = D ? O : null;
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
	#h = Lr(() => (this.#m = Wt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = W;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = W.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = On(() => {
			if (D) {
				let e = ke(this.#t);
				Ee();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Rr), D && (this.#e = O);
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
				}), this.#a === null ? (this.#c = null, n && this.#S(F)) : this.#u === 0 && (this.#e.before(e), this.#c = null, In(this.#o, () => {
					this.#o = null;
				}), this.#S(F));
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
			} else this.#S(F);
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
		var t = W, n = U, r = A;
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
		return this.#h(), G(this.#m);
	}
	error(e) {
		if (e === ye || !this.#n.onerror && !this.#n.failed) throw e;
		F?.is_fork ? (this.#a && F.skip_effect(this.#a), this.#o && F.skip_effect(this.#o), this.#s && F.skip_effect(this.#s), F.oncommit(() => {
			this.#y() || this.#T(e);
		})) : this.#T(e);
	}
	#T(e) {
		this.#a &&= (Nn(this.#a), null), this.#o &&= (Nn(this.#o), null), this.#s &&= (Nn(this.#s), null), D && (Te(this.#t), De(), Te(Oe()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return kn(() => {
						var r = W;
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
function Y(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[he] ??= e.nodeValue) && (e[he] = n, e.nodeValue = `${n}`);
}
function Vr(e, t) {
	return Ur(e, t);
}
var Hr = /* @__PURE__ */ new Map();
function Ur(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: c }) {
	on();
	var l = void 0, u = wn(() => {
		var o = n ?? t.appendChild(sn());
		zr(o, { pending: () => {} }, (t) => {
			j({});
			var n = A;
			if (a && (n.c = a), i && (r.$$events = i), D && jr(t, null), l = e(t, r) || Ze(), D && (W.nodes.end = O, O === null || O.nodeType !== 8 || O.data !== "]")) throw Se(), ye;
			M();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = vr(r);
					for (let e of [t, document]) {
						var a = Hr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Hr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Dr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(s(br)), xr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Hr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Dr), r.delete(e), r.size === 0 && Hr.delete(n)) : r.set(e, i);
			}
			xr.delete(d), o !== n && o.parentNode?.removeChild(o);
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
		var n = F, r = dn();
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
		} else D && (this.anchor = O), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function X(e, t, n = !1) {
	var r;
	D && (r = O, Ee());
	var i = new Gr(e), a = n ? te : 0;
	function o(e, t) {
		if (D) {
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
function Kr(e, t) {
	return t;
}
function qr(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, c = 0; c < i; c++) {
		let n = t[c];
		In(n, () => {
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
			un(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= ie, Bn(a, document.createDocumentFragment())) : Nn(t[i], n);
	}
}
var Yr;
function Z(e, t, n, r, a, o = null) {
	var c = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		c = D ? Te(/* @__PURE__ */ cn(u)) : u.appendChild(sn());
	}
	D && Ee();
	var d = null, f = /* @__PURE__ */ _t(() => {
		var e = n();
		return i(e) ? e : e == null ? [] : s(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = G(f);
			_.fallback = d, Zr(_, n, c, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= ie, $r(d, null, c)) : Rn(d) : In(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: On(() => {
			var e = G(f), i = e.length;
			let s = !1;
			D && ke(c) === "[!" != (i === 0) && (c = Oe(), Te(c), we(!1), s = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = F, v = dn(), y = 0; y < i; y += 1) {
				D && O.nodeType === 8 && O.data === "]" && (c = O, s = !0, we(!1));
				var b = e[y], x = r(b, y), S = m ? null : l.get(x);
				S ? (S.v && Jt(S.v, b), S.i && Jt(S.i, y), v && _.unskip_effect(S.e)) : (S = Qr(l, m ? c : Yr ??= sn(), b, x, y, a, t, n), m || (S.e.f |= ie), l.set(x, S)), u.add(x);
			}
			if (i === 0 && o && !d && (m ? d = kn(() => o(c)) : (d = kn(() => o(Yr ??= sn())), d.f |= ie)), i > u.size && Fe("", "", ""), D && i > 0 && Te(Oe()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			s && we(!0), G(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, D && (c = O);
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
		if (_.f & 8192 && (Rn(_), a && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ie, _ === l) $r(_, null, n);
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
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) $r(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					ei(e, S.prev, C.next), ei(e, d, S), ei(e, C, b), l = b, d = C, --v, p = [], m = [];
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
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Xr(l.next);
		var T = w.length;
		if (T > 0) {
			var ee = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			qr(e, w, ee);
		}
	}
	a && tt(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Qr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Wt(n) : /* @__PURE__ */ Gt(n, !1, !1) : null, l = o & 2 ? Wt(i) : null;
	return {
		v: c,
		i: l,
		e: kn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function $r(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ ln(r);
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
	On(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, te);
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
function Q(e, t, n, r, i, a) {
	var o = e[pe];
	if (D || o !== n || o === void 0) {
		var s = oi(n, r, a);
		D && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[pe] = n;
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
	var i = e[me];
	if (D || i !== t) {
		var a = li(t, r);
		D && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[me] = t;
	} else r && (Array.isArray(r) ? (ui(e, n?.[0], r[0]), ui(e, n?.[1], r[1], "important")) : ui(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var fi = Symbol("is custom element"), pi = Symbol("is html"), mi = ve ? "link" : "LINK";
function hi(e) {
	if (D) {
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
		e[ge] = n, tt(n), st();
	}
}
function $(e, t, n, r) {
	var i = gi(e);
	D && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === mi) || i[t] !== (i[t] = n) && (t === "loading" && (e[de] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && vi(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function gi(e) {
	return e[fe] ??= {
		[fi]: e.nodeName.includes("-"),
		[pi]: e.namespaceURI === be
	};
}
var _i = /* @__PURE__ */ new Map();
function vi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = _i.get(t);
	if (n) return n;
	_i.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = u(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = p(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function yi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	lt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ci(e) ? wi(a) : a, n(a), F !== null && r.add(F), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (D && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(Ci(e) ? wi(e.value) : e.value), F !== null && r.add(F)), Dn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = F;
			if (r.has(i)) return;
		}
		Ci(e) && n === wi(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
var bi = /* @__PURE__ */ new Set();
function xi(e, t, n, r, i = r) {
	var a = n.getAttribute("type") === "checkbox", o = e;
	let s = !1;
	if (t !== null) for (var c of t) o = o[c] ??= [];
	o.push(n), lt(n, "change", () => {
		var e = n.__value;
		a && (e = Si(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), Dn(() => {
		var e = r();
		D && n.defaultChecked !== n.checked ? s = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = en(n.__value, e);
	}), bn(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), bi.has(o) || (bi.add(o), tt(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), bi.delete(o);
	})), tt(() => {
		if (s) {
			var e = a ? Si(o, e, n.checked) : o.find((e) => e.checked)?.__value;
			i(e);
		}
	});
}
function Si(e, t, n) {
	for (var r = /* @__PURE__ */ new Set(), i = 0; i < e.length; i += 1) e[i].checked && r.add(e[i].__value);
	return n || r.delete(t), Array.from(r);
}
function Ci(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function wi(e) {
	return e === "" ? null : +e;
}
var Ti = /* @__PURE__ */ new class e {
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
function Ei(e, t, n) {
	var r = Ti.observe(e, () => n(e[t]));
	Tn(() => (mr(() => n(e[t])), r));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Di(e, t) {
	return e === t || e?.[ce] === t;
}
function Oi(e = Ze(), t, n, r) {
	var i = A.r, a = W;
	return Tn(() => {
		var o, s;
		return Dn(() => {
			o = s, s = r?.() || [], mr(() => {
				Di(n(...s), e) || (t(e, ...s), o && Di(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Di(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
function ki(e, t, n = t) {
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
function Ai(e = !1) {
	let t = A, n = t.l.u;
	if (!n) return;
	let r = () => hr(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ mt(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => G(i);
	}
	n.b.length && Cn(() => {
		ji(t, r), _(n.b);
	}), xn(() => {
		let e = mr(() => n.m.map(g));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && xn(() => {
		ji(t, r), _(n.a);
	});
}
function ji(e, t) {
	if (e.l.s) for (let t of e.l.s) G(t);
	t();
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var Mi = !1;
function Ni(e) {
	var t = Mi;
	try {
		return Mi = !1, [e(), Mi];
	} finally {
		Mi = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function Pi(e, t, n, r) {
	var i = !Ge || !!(n & 2), a = !!(n & 8), o = !!(n & 16), s = r, c = !0, u = void 0, d = () => o && i ? (u ??= /* @__PURE__ */ mt(r), G(u)) : (c && (c = !1, s = o ? mr(r) : r), s);
	let f;
	if (a) {
		var p = ce in e || ue in e;
		f = l(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = Ni(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Be(t), f(m)));
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
	a && G(y);
	var b = W;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? G(y) : i && a ? Qt(e) : e;
			return L(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return Hn && v || b.f & 16384 ? y.v : G(y);
	});
}
function Fi(e) {
	A === null && Ne("onMount"), Ge && A.l !== null ? Ii(A).m.push(e) : xn(() => {
		let t = mr(e);
		if (typeof t == "function") return t;
	});
}
function Ii(e) {
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
var Li = (e) => Math.min(1, Math.max(0, e)), Ri = (e) => String(e).padStart(2, "0"), zi = (e, t) => t > 0 ? Li(e / t) : 1, Bi = (e) => e.workouts ?? e.gym ?? 0, Vi = (e) => [
	e.goal.runs,
	Bi(e.goal),
	e.goal.active_days ?? 0
], Hi = (e) => [
	e.runs,
	Bi(e),
	e.active_days ?? 0
], Ui = (e) => Hi(e).map((t, n) => zi(t, Vi(e)[n])), Wi = (e) => e.toLocaleString("en-US");
function Gi(e, t) {
	if (e == null) return null;
	let n = t > 0 ? e >= t ? " · Active day ✓" : ` · ${Wi(t - e)} to go` : "";
	return `👟 ${Wi(e)} steps today${n}`;
}
function Ki(e, t) {
	let n = (e) => e ? " ✓" : "", r = ([e, n]) => {
		let r = t[e];
		if (n) return `${r?.name ?? e} ✓`;
		let i = r ? Vi(r.week) : [], a = r ? Hi(r.week) : [];
		return `${r?.name ?? e} ${i.filter((e, t) => e > 0 && a[t] >= e).length} of ${i.filter((e) => e > 0).length}`;
	};
	if (e.mode === "team") return `${e.team.done} of ${e.team.target} team points${n(e.met)}`;
	let i = Object.entries(e.members_met).map(r);
	return e.mode === "together" && i.push(`${e.together.done} of ${e.together.target} together${n(e.together.done >= e.together.target)}`), i.join(" · ");
}
function qi(e) {
	if (!e.reward) return null;
	if (e.met) return `${e.reward} unlocked!`;
	let t = {
		own: "you both make your goals",
		together: `you both make your goals and do ${e.together.target} together`,
		team: `you reach ${e.team.target} team points`
	};
	return `${e.reward}: unlocks when ${t[e.mode]}`;
}
function Ji(e) {
	let t = e.xp - e.level_floor, n = e.next_level_xp - e.level_floor;
	return {
		level: e.level,
		into: t,
		span: n,
		frac: n > 0 ? Li(t / n) : 1
	};
}
var Yi = (e) => `Week ${Number(e.week.split("-W")[1])} · ${e.days_left} ${e.days_left === 1 ? "day" : "days"} left`;
function Xi(e, t, n = 15) {
	let r = new Date(e);
	return t - r > n * 6e4 ? `Updated ${Ri(r.getHours())}:${Ri(r.getMinutes())}` : null;
}
var Zi = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], Qi = [
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
function $i(e, t = !0) {
	let n = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(e);
	if (!n) return "";
	let [, r, i, a, o] = n, s = `${Zi[new Date(Date.UTC(r, i - 1, a)).getUTCDay()]} ${Number(a)} ${Qi[i - 1]}`;
	return t ? `${s}, ${o}` : s;
}
var ea = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${Ri(e % 60)} min` : `${e / 60} h`;
function ta(e) {
	if (e.kind !== "run" && e.kind !== "walk" || !(e.km > 0)) return null;
	let t = Math.round(e.minutes * 60 / e.km);
	return `${Math.floor(t / 60)}:${Ri(t % 60)} /km`;
}
var na = (e) => ({
	title: e.name,
	when: $i(e.start, e.kind !== "active_day"),
	duration: e.kind === "active_day" ? `${Wi(e.steps)} steps` : ea(e.minutes),
	xp: e.xp ? `+${e.xp}` : "",
	detail: {
		km: e.km == null ? null : `${e.km.toFixed(1)} km`,
		pace: ta(e),
		hr: e.avg_hr == null ? null : `${e.avg_hr} bpm`,
		plan: e.plan ?? null,
		url: e.url ?? null
	},
	removable: e.kind === "active_day" ? null : e.excluded ? "restore" : e.key.startsWith("manual:") ? "delete" : "remove"
});
function ra(e) {
	let t = [["walk", e.warmup_s ?? 0], ...e.intervals].filter(([, e]) => e > 0), n = t.reduce((e, [, t]) => e + t, 0);
	return t.map(([e, t]) => ({
		kind: e,
		frac: t / n
	}));
}
function ia(e, t) {
	let n = Object.hasOwn(t, e.person) ? e.person : null;
	return {
		self: n,
		others: Object.keys(t).filter((e) => e !== n)
	};
}
var aa = (e) => `${Number(e.slice(8, 10))} ${Qi[Number(e.slice(5, 7)) - 1]}`;
function oa(e, t, n) {
	let r = t.find((t) => t.key === e.key);
	return n - e.at > 6e5 || !r || e.want !== null && r.excluded === e.want;
}
function sa(e, t, n) {
	let r = (e[t] ?? Promise.resolve()).then(n), i = e[t] = r.catch(() => {});
	return i.then(() => e[t] === i && delete e[t]), r;
}
function ca(e) {
	let t = (e) => e < 10 ? e.toFixed(1) : Math.round(e).toLocaleString(), n = e.km == null ? "unknown" : e.km >= e.limit ? "replace" : e.km >= .9 * e.limit ? "soon" : "ok", r = e.last_run ? new Date(e.last_run) : null, i = e.runs ? `${e.runs} ${e.runs === 1 ? "run" : "runs"}` : e.runs === 0 ? "No runs yet" : "";
	return {
		name: e.name,
		km: e.km == null ? "—" : `${t(e.km)} / ${t(e.limit)} km`,
		frac: e.km == null ? 0 : Li(e.km / e.limit),
		state: n,
		label: {
			soon: "Replace soon",
			replace: "Replace"
		}[n] ?? null,
		detail: [i, r && `last run ${r.getDate()} ${Qi[r.getMonth()]}`].filter(Boolean).join(" · ")
	};
}
var la = {
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
}, ua = [
	"runs",
	"workouts",
	"active_days",
	"steps"
], da = {
	runs: 0,
	workouts: 0,
	active_days: 0,
	steps: 1e4
};
function fa(e, t) {
	let [n, r, i] = la[e];
	return Math.min(r, Math.max(n, Math.round(t / i) * i));
}
function pa(e, t) {
	let n = e.current, r = (t) => n?.people?.[t] ?? e.defaults?.[t] ?? {};
	return {
		people: Object.fromEntries(Object.keys(t).map((e) => {
			let t = r(e);
			return [e, Object.fromEntries(ua.map((e) => [e, fa(e, t[e] ?? da[e])]))];
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
function ma(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return t.setUTCDate(t.getUTCDate() + 3 - (t.getUTCDay() + 6) % 7), Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5 + 1) / 7);
}
var ha = (e, t) => ua.every((n) => (n === "workouts" ? Bi(t) : t[n]) === e[n]), ga = (e, t, n) => n - e.at > 6e5 || Object.entries(e.entry.people).every(([e, n]) => !t[e] || ha(n, t[e].week.goal));
function _a(e, t) {
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
function va(e, t, n) {
	if (e == null) return null;
	let r = Date.parse(`${n}T00:00:00Z`), i = r - (new Date(r).getUTCDay() + 6) % 7 * 864e5, a = Array.from({ length: 7 }, (e, t) => new Date(i + t * 864e5).toISOString().slice(0, 10)), o = a.map((t) => t > n ? null : e[t] ?? 0), s = Math.max(t ?? 0, ...o.map((e) => e ?? 0));
	return a.map((e, r) => ({
		label: "MTWTFSS"[r],
		date: e,
		steps: o[r],
		frac: s > 0 ? (o[r] ?? 0) / s : 0,
		active: t > 0 && o[r] >= t,
		isToday: e === n,
		future: e > n
	}));
}
function ya(e) {
	let t = e.filter((e) => e.active).length;
	return `${t} active ${t === 1 ? "day" : "days"} · ${Wi(e.reduce((e, t) => e + (t.steps ?? 0), 0))} steps`;
}
var ba = (e) => `${e.name} · ${e.w} ${e.unit} × ${e.r} · ${aa(e.date)}`, xa = (e, t = 5) => (e ?? []).slice(0, t), Sa = (e) => [...e ?? []].sort((e, t) => e.name.localeCompare(t.name)), Ca = (e) => `${Math.floor(e / 60)}:${Ri(e % 60)}`, wa = (e) => new Set([...(e?.lifts ?? []).map((e) => e.key), e?.fastest_1k?.key].filter(Boolean)), Ta = 5e3, Ea = Qt({}), Da = Qt({
	on: !1,
	text: "",
	undo: null
}), Oa = Qt({
	entry: null,
	at: 0
}), ka, Aa = 0, ja = {};
function Ma(e, t = null) {
	clearTimeout(ka), Object.assign(Da, {
		on: !0,
		text: e,
		undo: t
	}), ka = setTimeout(() => Da.on = !1, Ta);
}
function Na(e, t = Date.now()) {
	for (let [n, r] of Object.entries(Ea)) oa(r, e[r.person]?.feed ?? [], t) && delete Ea[n];
	Oa.entry && ga(Oa, e, t) && (Oa.entry = null);
}
async function Pa(e, t) {
	try {
		await n("POST", "settings", e);
	} catch (e) {
		return Ma(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(Oa, {
		entry: e,
		at: Date.now()
	}), Na(t), Ma("Saved · updates within 5 min"), !0;
}
async function Fa(e, t, r) {
	let i = `${e}/${t}`, a = Ea[i], o = ++Aa, s = t.startsWith("manual:");
	Ea[i] = {
		person: e,
		key: t,
		want: s && r === "remove" ? null : r === "remove",
		at: Date.now(),
		n: o
	}, r === "remove" && !s && Ma("Removed", () => Fa(e, t, "restore"));
	try {
		await sa(ja, i, () => n("POST", "workouts", {
			person: e,
			key: t,
			action: r
		}));
	} catch (e) {
		Ea[i]?.n === o && (a ? Ea[i] = a : delete Ea[i]), Ma(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
// src/lib/ui/Badges.svelte
var Ia = /* @__PURE__ */ q("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), La = /* @__PURE__ */ q("<ul class=\"svelte-m8wnum\"></ul>"), Ra = /* @__PURE__ */ q("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), za = /* @__PURE__ */ q("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), Ba = /* @__PURE__ */ q("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function Va(e, t) {
	j(t, !0);
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
	var a = Ba(), o = R(a), s = (e) => {
		var n = La();
		Z(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = Ia(), i = R(n), a = B(i, !0), o = V(i, 2), s = B(o, !0), c = B(V(o, 2), !0);
			k(n), H((e, n) => {
				Y(a, e), Y(s, G(t).title), Y(c, n);
			}, [() => r(G(t)), () => aa(G(t).unlocked_at)]), J(e, n);
		}), k(n), J(e, n);
	};
	X(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = V(o, 2), l = (e) => {
		var n = La();
		Z(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = Ra(), a = R(n), o = B(a, !0), s = V(a, 2), c = B(s, !0), l = V(s, 2), u = B(l), d = V(l, 2), f = R(d);
			let p;
			k(d), k(n), H((e, n, r, i) => {
				Y(o, e), Y(c, G(t).title), Y(u, `${n ?? ""} of ${r ?? ""}`), p = di(f, "", p, { width: i });
			}, [
				() => r(G(t)),
				() => i(G(t).current),
				() => i(G(t).target),
				() => `${Math.min(1, G(t).current / G(t).target) * 100}%`
			]), J(e, n);
		}), k(n), J(e, n);
	};
	X(c, (e) => {
		t.badges.next.length && e(l);
	});
	var u = V(c, 2), d = (e) => {
		J(e, za());
	};
	X(u, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(d);
	}), k(a), J(e, a), M();
}
// src/lib/media.svelte.js
var Ha = Qt({
	wide: !1,
	reducedMotion: !1
}), Ua = matchMedia("(min-width: 768px)"), Wa = matchMedia("(prefers-reduced-motion: reduce)"), Ga = () => {
	Ha.wide = Ua.matches, Ha.reducedMotion = Wa.matches;
};
Ua.addEventListener("change", Ga), Wa.addEventListener("change", Ga), Ga();
// src/lib/motion.js
function Ka(e, { onFrame: t, onSettle: n, snap: r = {
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
var qa = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), Ja = (e) => qa(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function Ya({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var Xa = /* @__PURE__ */ q("<span class=\"mini svelte-69s4be\"> </span>"), Za = /* @__PURE__ */ q("<span class=\"mini svelte-69s4be\">Together</span>"), Qa = /* @__PURE__ */ q("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), $a = /* @__PURE__ */ q("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), eo = /* @__PURE__ */ q("<div><dt class=\"svelte-69s4be\"> </dt><dd class=\"svelte-69s4be\"> </dd></div>"), to = /* @__PURE__ */ q("<dl class=\"svelte-69s4be\"></dl>"), no = /* @__PURE__ */ q("<a class=\"btn link svelte-69s4be\" target=\"_blank\" rel=\"noopener noreferrer\">Open in Endurain</a>"), ro = /* @__PURE__ */ q("<span class=\"ask svelte-69s4be\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-69s4be\">Delete</button>", 1), io = /* @__PURE__ */ q("<button type=\"button\"> </button>"), ao = /* @__PURE__ */ q("<div><div class=\"inner svelte-69s4be\"><!> <div class=\"acts svelte-69s4be\"><!> <!></div></div></div>"), oo = /* @__PURE__ */ q("<li><button type=\"button\" class=\"head svelte-69s4be\"><span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span></button> <!></li>");
function so(e, t) {
	let n = Ir();
	j(t, !0);
	let r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, i = /* @__PURE__ */ P(() => Ea[`${t.person}/${t.item.key}`]), a = /* @__PURE__ */ P(() => na(G(i) && G(i).want !== null ? {
		...t.item,
		excluded: G(i).want
	} : t.item)), o = /* @__PURE__ */ P(() => [
		["Distance", G(a).detail.km],
		["Pace", G(a).detail.pace],
		["Avg heart rate", G(a).detail.hr],
		["Plan session", G(a).detail.plan]
	].filter(([, e]) => e)), s = /* @__PURE__ */ P(() => G(i)?.want === null), c = /* @__PURE__ */ P(() => G(o).length > 0 || !!G(a).detail.url || t.canEdit && !!G(a).removable), l = /* @__PURE__ */ I(!1), u = /* @__PURE__ */ I(!1), d = /* @__PURE__ */ I(void 0), f = /* @__PURE__ */ I(void 0), p = Ya({
		response: .35,
		damping: 1
	}), m = Ka(p, {
		onFrame: (e) => G(d).style.height = `${e}px`,
		onSettle: () => G(l) && (G(d).style.height = "auto")
	});
	xn(() => m.stop);
	function h() {
		G(c) && (L(l, !G(l)), L(u, !1), Ha.reducedMotion ? G(d).style.height = G(l) ? "auto" : "0px" : (m.running || (p.value = G(d).offsetHeight), m.to(G(l) ? G(f).offsetHeight : 0)));
	}
	let g = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function _() {
		G(a).removable === "delete" ? L(u, !0) : Fa(t.person, t.item.key, G(a).removable);
	}
	var v = oo();
	let b;
	var x = R(v), S = R(x), C = B(S, !0), w = V(S, 2), T = R(w), ee = R(T), te = V(ee), ne = (e) => {
		var n = Xa(), r = B(n, !0);
		H(() => Y(r, t.item.plan)), J(e, n);
	};
	X(te, (e) => {
		t.item.plan && e(ne);
	});
	var re = V(te, 2), ie = (e) => {
		J(e, Za());
	};
	X(re, (e) => {
		t.item.joint && e(ie);
	});
	var ae = V(re, 2), oe = (e) => {
		J(e, Qa());
	};
	X(ae, (e) => {
		t.record && e(oe);
	}), k(T);
	var se = B(V(T, 2));
	k(w);
	var ce = V(w, 2), le = R(ce), ue = (e) => {
		J(e, $a());
	};
	X(le, (e) => {
		G(i) && e(ue);
	});
	var de = V(le);
	k(ce), k(x);
	var fe = V(x, 2), pe = (e) => {
		var r = ao();
		let i;
		var c = R(r), p = R(c), m = (e) => {
			var t = to();
			Z(t, 21, () => G(o), ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ P(() => y(G(t), 2));
				let r = () => G(n)[0], i = () => G(n)[1];
				var a = eo(), o = R(a), s = B(o, !0), c = B(V(o), !0);
				k(a), H(() => {
					Y(s, r()), Y(c, i());
				}), J(e, a);
			}), k(t), J(e, t);
		};
		X(p, (e) => {
			G(o).length && e(m);
		});
		var v = V(p, 2), b = R(v), x = (e) => {
			var t = no();
			H(() => $(t, "href", G(a).detail.url)), J(e, t);
		};
		X(b, (e) => {
			G(a).detail.url && e(x);
		});
		var S = V(b, 2), C = (e) => {
			var n = Fr(), r = z(n), i = (e) => {
				var n = ro(), r = V(z(n), 2), i = V(r, 2);
				K("click", r, () => L(u, !1)), K("click", i, () => (h(), Fa(t.person, t.item.key, "remove"))), J(e, n);
			}, o = (e) => {
				var t = io();
				let n;
				var r = B(t, !0);
				H(() => {
					n = Q(t, 1, "btn svelte-69s4be", null, n, { danger: G(a).removable !== "restore" }), Y(r, g[G(a).removable]);
				}), K("click", t, _), J(e, t);
			};
			X(r, (e) => {
				G(u) ? e(i) : e(o, -1);
			}), J(e, n);
		};
		X(S, (e) => {
			t.canEdit && !G(s) && G(a).removable && e(C);
		}), k(v), k(c), Oi(c, (e) => L(f, e), () => G(f)), k(r), Oi(r, (e) => L(d, e), () => G(d)), H(() => {
			i = Q(r, 1, "more svelte-69s4be", null, i, { open: G(l) }), $(r, "id", `${n}-more`), r.inert = !G(l);
		}), J(e, r);
	};
	X(fe, (e) => {
		G(c) && e(pe);
	}), k(v), H(() => {
		b = Q(v, 1, "svelte-69s4be", null, b, { dim: G(a).removable === "restore" || G(s) }), $(x, "aria-expanded", G(c) ? G(l) : void 0), $(x, "aria-controls", G(c) ? `${n}-more` : void 0), Q(S, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), Y(C, r[t.item.kind] ?? "💪"), Y(ee, `${G(a).title ?? ""} `), Y(se, `${G(a).when ?? ""} · ${G(a).duration ?? ""}`), Y(de, ` ${(G(a).removable === "restore" ? "Removed" : G(a).xp && `${G(a).xp} XP`) ?? ""}`);
	}), K("click", x, h), J(e, v), M();
}
wr(["click"]);
// src/lib/ui/Feed.svelte
var co = /* @__PURE__ */ q("<ul class=\"card svelte-n1344i\"></ul>"), lo = /* @__PURE__ */ q("<p class=\"caption empty svelte-n1344i\">No workouts in the last 30 days.</p>");
function uo(e, t) {
	j(t, !0);
	var n = Fr(), r = z(n), i = (e) => {
		var n = co();
		Z(n, 21, () => t.items, (e) => e.key, (e, n) => {
			{
				let r = /* @__PURE__ */ P(() => t.records?.has(G(n).key));
				so(e, {
					get person() {
						return t.person;
					},
					get item() {
						return G(n);
					},
					get canEdit() {
						return t.canEdit;
					},
					get record() {
						return G(r);
					}
				});
			}
		}), k(n), J(e, n);
	}, a = (e) => {
		J(e, lo());
	};
	X(r, (e) => {
		t.items.length ? e(i) : e(a, -1);
	}), J(e, n), M();
}
// src/lib/ui/PlanBar.svelte
var fo = /* @__PURE__ */ q("<span> </span>"), po = /* @__PURE__ */ q("<i class=\"svelte-1y5m0aq\"></i>"), mo = /* @__PURE__ */ q("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), ho = /* @__PURE__ */ q("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!></div>");
function go(e, t) {
	j(t, !0);
	let n = /* @__PURE__ */ P(() => ra(t.plan)), r = /* @__PURE__ */ P(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0)) / 60));
	var i = ho(), a = R(i), o = R(a), s = B(o, !0), c = V(o, 2), l = (e) => {
		var n = fo();
		let r;
		var i = B(n, !0);
		H(() => {
			r = Q(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), Y(i, t.plan.due_today ? "Due today" : "Rest day");
		}), J(e, n);
	};
	X(c, (e) => {
		G(n).length && e(l);
	}), k(a);
	var u = V(a, 2), d = (e) => {
		var t = mo(), i = z(t);
		Z(i, 21, () => G(n), Kr, (e, t) => {
			var n = po();
			let r;
			H(() => r = di(n, "", r, {
				"flex-grow": G(t).frac,
				background: `var(--${G(t).kind === "run" ? "run" : "fill"})`
			})), J(e, n);
		}), k(i);
		var a = V(i, 2), o = R(a), s = R(o);
		di(s, "", {}, { background: "var(--run)" }), di(V(s, 2), "", {}, { background: "var(--fill)" }), De(), k(o);
		var c = B(V(o, 2));
		k(a), H(() => {
			$(i, "aria-label", `Run and walk intervals, ${G(r) ?? ""} minutes in total`), Y(c, `${G(r) ?? ""} min`);
		}), J(e, t);
	};
	X(u, (e) => {
		G(n).length && e(d);
	}), k(i), H(() => Y(s, t.plan.state)), J(e, i), M();
}
// src/lib/ui/StepBars.svelte
var _o = /* @__PURE__ */ q("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), vo = /* @__PURE__ */ q("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), yo = /* @__PURE__ */ q("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function bo(e, t) {
	j(t, !0);
	let n = /* @__PURE__ */ P(() => Math.max(t.goal, ...t.bars.map((e) => e.steps ?? 0))), r = /* @__PURE__ */ P(() => t.goal > 0 ? t.goal / G(n) : null), i = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), a = (e) => `${i(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var o = yo(), s = R(o);
	Z(s, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = _o();
		let r;
		var i = R(n), o = R(i);
		let s, c;
		k(i);
		var l = B(V(i, 2), !0);
		k(n), H((e) => {
			$(n, "aria-label", e), $(n, "aria-hidden", G(t).future ? "true" : void 0), $(n, "aria-current", G(t).isToday ? "date" : void 0), r = Q(n, 1, "svelte-1f099m", null, r, { today: G(t).isToday }), s = Q(o, 1, "svelte-1f099m", null, s, {
				active: G(t).active,
				future: G(t).future
			}), c = di(o, "", c, { height: `${G(t).frac * 100}%` }), Y(l, G(t).label);
		}, [() => G(t).future ? void 0 : a(G(t))]), J(e, n);
	}), k(s);
	var c = V(s, 2), l = (e) => {
		var t = vo();
		let n;
		H(() => n = di(t, "", n, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${G(r) ?? ""})` })), J(e, t);
	};
	X(c, (e) => {
		G(r) !== null && e(l);
	}), k(o), J(e, o), M();
}
// src/lib/ui/Progress.svelte
var xo = /* @__PURE__ */ q("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), So = /* @__PURE__ */ q("<li class=\"svelte-kr1x1f\"> </li>"), Co = /* @__PURE__ */ q("<button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>"), wo = /* @__PURE__ */ q("<ul class=\"svelte-kr1x1f\"></ul> <!>", 1), To = /* @__PURE__ */ q("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), Eo = /* @__PURE__ */ q("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"svelte-kr1x1f\"> </a>"), Do = /* @__PURE__ */ q("<div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Fastest 1 km</span> <span class=\"v svelte-kr1x1f\"><!> </span></div>"), Oo = /* @__PURE__ */ q("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), ko = /* @__PURE__ */ q("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div>", 1);
function Ao(e, t) {
	let n = Ir();
	j(t, !0);
	let r = /* @__PURE__ */ P(() => t.person.week.goal.steps ?? 0), i = /* @__PURE__ */ P(() => va(t.person.steps_week, G(r), (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"))), a = /* @__PURE__ */ P(() => t.person.pbs.lifts ?? []), o = /* @__PURE__ */ I(!1), s = /* @__PURE__ */ P(() => G(o) ? Sa(G(a)) : xa(G(a))), c = /* @__PURE__ */ P(() => t.person.pbs.fastest_1k), l = /* @__PURE__ */ P(() => t.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var u = ko(), d = z(u), f = (e) => {
		var t = xo(), n = R(t);
		bo(n, {
			get bars() {
				return G(i);
			},
			get goal() {
				return G(r);
			}
		});
		var a = B(V(n, 2), !0);
		k(t), H((e) => Y(a, e), [() => ya(G(i))]), J(e, t);
	};
	X(d, (e) => {
		G(i) && e(f);
	});
	var p = V(d, 2), m = R(p), h = (e) => {
		var t = wo(), r = z(t);
		Z(r, 21, () => G(s), (e) => e.id, (e, t) => {
			var n = So(), r = B(n, !0);
			H((e) => Y(r, e), [() => ba(G(t))]), J(e, n);
		}), k(r);
		var i = V(r, 2), c = (e) => {
			var t = Co(), r = B(t, !0);
			H(() => {
				$(t, "aria-expanded", G(o)), $(t, "aria-controls", `${n}-lifts`), Y(r, G(o) ? "Show fewer" : `Show all (${G(a).length})`);
			}), K("click", t, () => L(o, !G(o))), J(e, t);
		}, l = /* @__PURE__ */ P(() => G(a).length > xa(G(a)).length);
		X(i, (e) => {
			G(l) && e(c);
		}), H(() => $(r, "id", `${n}-lifts`)), J(e, t);
	}, g = (e) => {
		J(e, To());
	};
	X(m, (e) => {
		G(a).length ? e(h) : e(g, -1);
	}), k(p);
	var _ = V(p, 2), v = R(_), y = (e) => {
		var t = Do(), n = V(R(t), 2), r = R(n), i = (e) => {
			var t = Eo(), n = B(t, !0);
			H((e) => {
				$(t, "href", G(c).url), Y(n, e);
			}, [() => Ca(G(c).seconds)]), J(e, t);
		}, a = (e) => {
			var t = Pr();
			H((e) => Y(t, e), [() => Ca(G(c).seconds)]), J(e, t);
		};
		X(r, (e) => {
			G(c).url ? e(i) : e(a, -1);
		});
		var o = V(r);
		k(n), k(t), H((e) => Y(o, ` · ${e ?? ""}`), [() => aa(G(c).date)]), J(e, t);
	}, b = (e) => {
		J(e, Oo());
	};
	X(v, (e) => {
		G(c) ? e(y) : e(b, -1);
	});
	var x = V(v, 2), S = B(V(R(x)));
	k(x);
	var C = V(x, 2), w = B(V(R(C)));
	k(C), k(_), H((e) => {
		Y(S, `${e ?? ""} km`), Y(w, `${G(l) ?? ""} t`);
	}, [() => t.person.pbs.longest_session_km.toFixed(1)]), J(e, u), M();
}
wr(["click"]);
// src/lib/ui/Shoes.svelte
var jo = /* @__PURE__ */ q("<span class=\"label svelte-eu7fja\"> </span>"), Mo = /* @__PURE__ */ q("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), No = /* @__PURE__ */ q("<ul class=\"card svelte-eu7fja\"></ul>");
function Po(e, t) {
	j(t, !0);
	let n = /* @__PURE__ */ P(() => t.shoes.map(ca));
	var r = No();
	Z(r, 23, () => G(n), (e, n) => t.shoes[n].entity_id, (e, t) => {
		var n = Mo(), r = R(n), i = R(r), a = B(i, !0), o = B(V(i), !0);
		k(r);
		var s = V(r, 2), c = R(s);
		let l;
		k(s);
		var u = V(s, 2), d = R(u), f = B(d, !0), p = V(d, 2), m = (e) => {
			var n = jo(), r = B(n, !0);
			H(() => Y(r, G(t).label)), J(e, n);
		};
		X(p, (e) => {
			G(t).label && e(m);
		}), k(u), k(n), H(() => {
			Q(n, 1, ii(G(t).state), "svelte-eu7fja"), Y(a, G(t).name), Y(o, G(t).km), l = di(c, "", l, { width: `${G(t).frac * 100}%` }), Y(f, G(t).detail);
		}), J(e, n);
	}), k(r), J(e, r), M();
}
// src/lib/ui/Details.svelte
var Fo = /* @__PURE__ */ q("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), Io = /* @__PURE__ */ q("<section><h2 class=\"svelte-1341oik\">Shoes</h2> <!></section>"), Lo = /* @__PURE__ */ q("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!>", 1);
function Ro(e, t) {
	let n = Ir();
	j(t, !0);
	let r = /* @__PURE__ */ P(() => wa(t.person.pbs));
	var i = Lo(), a = z(i), o = (e) => {
		var r = Fo(), i = R(r);
		go(V(i, 2), { get plan() {
			return t.person.plan;
		} }), k(r), H(() => {
			$(r, "aria-labelledby", `${n}-plan`), $(i, "id", `${n}-plan`);
		}), J(e, r);
	};
	X(a, (e) => {
		t.person.plan && e(o);
	});
	var s = V(a, 2), c = R(s);
	uo(V(c, 2), {
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
			return G(r);
		}
	}), k(s);
	var l = V(s, 2), u = R(l), d = B(V(R(u)));
	k(u), Va(V(u, 2), { get badges() {
		return t.person.badges;
	} }), k(l);
	var f = V(l, 2), p = R(f);
	Ao(V(p, 2), { get person() {
		return t.person;
	} }), k(f);
	var m = V(f, 2), h = (e) => {
		var r = Io(), i = R(r);
		Po(V(i, 2), { get shoes() {
			return t.person.shoes;
		} }), k(r), H(() => {
			$(r, "aria-labelledby", `${n}-shoes`), $(i, "id", `${n}-shoes`);
		}), J(e, r);
	};
	X(m, (e) => {
		t.person.shoes?.length && e(h);
	}), H(() => {
		$(s, "aria-labelledby", `${n}-feed`), $(c, "id", `${n}-feed`), $(l, "aria-labelledby", `${n}-badges`), $(u, "id", `${n}-badges`), Y(d, `${t.person.badges.count ?? ""} unlocked`), $(f, "aria-labelledby", `${n}-pbs`), $(p, "id", `${n}-pbs`);
	}), J(e, i), M();
}
// src/lib/ui/Goals.svelte
var zo = /* @__PURE__ */ q("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), Bo = /* @__PURE__ */ q("<p class=\"msg\" role=\"status\"> </p>"), Vo = /* @__PURE__ */ q("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!></section>"), Ho = /* @__PURE__ */ q("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), Uo = /* @__PURE__ */ q("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), Wo = /* @__PURE__ */ q("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), Go = /* @__PURE__ */ q("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function Ko(e, t) {
	let n = Ir();
	j(t, !0);
	let i = [], a = (e, n = h, r = h, i = h) => {
		let a = /* @__PURE__ */ P(() => {
			let [e, t, n] = la[r()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var o = zo(), s = R(o), c = B(s, !0), l = V(s, 2), u = V(l, 2), d = B(u, !0), f = V(u, 2);
		k(o), H((e, s, u, p) => {
			$(o, "aria-label", i()), Y(c, e), $(l, "aria-label", `Fewer ${s ?? ""}`), l.disabled = t.readOnly || n()[r()] <= G(a).lo, Y(d, u), $(f, "aria-label", `More ${p ?? ""}`), f.disabled = t.readOnly || n()[r()] >= G(a).hi;
		}, [
			() => i().split(",")[0],
			() => p(i()),
			() => m(r(), n()[r()]),
			() => p(i())
		]), K("click", l, () => n()[r()] = fa(r(), n()[r()] - G(a).step)), K("click", f, () => n()[r()] = fa(r(), n()[r()] + G(a).step)), J(e, o);
	}, o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(!1);
	Fi(() => {
		r("settings").then((e) => {
			L(o, e, !0), L(c, pa(e, t.people), !0);
		}, (e) => L(s, e, !0));
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
		L(l, !0);
		let e = await Pa(Je(G(c)), t.people);
		L(l, !1), e && t.onsaved();
	}
	var _ = Go(), v = V(z(_), 2), y = (e) => {
		var t = Bo(), n = B(t, !0);
		H(() => Y(n, G(s) ? G(s).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), J(e, t);
	}, b = (e) => {
		var r = Wo(), s = z(r), p = B(s), m = V(s, 2);
		Z(m, 16, () => Object.keys(G(c).people), (e) => e, (e, r) => {
			let i = /* @__PURE__ */ P(() => t.people[r]?.name ?? r);
			var o = Vo(), s = R(o), l = B(s, !0);
			Z(V(s, 2), 16, () => ua, (e) => e, (e, t) => {
				a(e, () => G(c).people[r], () => t, () => `${u[t]}, ${G(i)}`);
			}), k(o), H(() => {
				$(o, "aria-labelledby", `${n}-${r ?? ""}`), $(s, "id", `${n}-${r ?? ""}`), Y(l, G(i));
			}), J(e, o);
		});
		var h = V(m, 2), _ = R(h), v = V(_, 2);
		Z(v, 21, () => d, (e) => e.mode, (e, r) => {
			var a = Ho();
			let o;
			var s = R(a);
			hi(s);
			var l, u = V(s, 1, !0);
			k(a), H(() => {
				o = Q(a, 1, "svelte-7wncvy", null, o, { on: G(c).couple.mode === G(r).mode }), $(s, "name", `${n}-mode`), s.disabled = t.readOnly, l !== (l = G(r).mode) && (s.value = (s.__value = l) ?? ""), Y(u, G(r).label);
			}), xi(i, [], s, () => (G(r).mode, G(c).couple.mode), (e) => G(c).couple.mode = e), J(e, a);
		}), k(v);
		var y = V(v, 2), b = B(y, !0), x = V(y, 2), S = (e) => {
			a(e, () => G(c).couple, () => G(c).couple.mode, () => f[G(c).couple.mode]);
		};
		X(x, (e) => {
			f[G(c).couple.mode] && e(S);
		});
		var C = V(x, 2), w = V(R(C), 2);
		hi(w), k(C), k(h);
		var T = V(h, 2), ee = (e) => {
			var t = Uo();
			H(() => t.disabled = G(l)), K("click", t, g), J(e, t);
		};
		X(T, (e) => {
			t.readOnly || e(ee);
		}), H((e, r) => {
			Y(p, `Applies from this week (week ${e ?? ""})`), $(h, "aria-labelledby", `${n}-couple`), $(_, "id", `${n}-couple`), $(v, "aria-labelledby", `${n}-couple`), Y(b, r), w.disabled = t.readOnly;
		}, [() => ma(G(o).week_start), () => d.find((e) => e.mode === G(c).couple.mode).hint]), yi(w, () => G(c).couple.reward, (e) => G(c).couple.reward = e), J(e, r);
	};
	X(v, (e) => {
		G(c) ? e(b, -1) : e(y);
	}), J(e, _), M();
}
wr(["click"]);
// src/lib/ui/Header.svelte
var qo = /* @__PURE__ */ q("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), Jo = /* @__PURE__ */ q("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), Yo = /* @__PURE__ */ q("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function Xo(e, t) {
	let n = Pi(t, "subtitle", 3, ""), r = Pi(t, "actionLabel", 3, ""), i = /* @__PURE__ */ I(0);
	var a = Yo();
	let o;
	var s = R(a), c = R(s), l = (e) => {
		var n = qo();
		K("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), J(e, n);
	};
	X(c, (e) => {
		t.onback && e(l);
	});
	var u = V(c, 2), d = R(u), f = B(d, !0), p = V(d, 2), m = (e) => {
		var n = Jo(), i = B(n, !0);
		H(() => Y(i, r())), K("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), J(e, n);
	};
	X(p, (e) => {
		t.onaction && e(m);
	}), k(u);
	var h = B(V(u, 2), !0);
	k(s), k(a), H(() => {
		o = Q(a, 1, "svelte-16l0jix", null, o, { scrolled: G(i) > 0 }), Y(f, t.title), Y(h, n() || "\xA0");
	}), ki("y", () => G(i), (e) => L(i, e, !0)), J(e, a);
}
wr(["click"]);
// src/lib/ui/Rings.svelte
var Zo = /* @__PURE__ */ Nr("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Qo = /* @__PURE__ */ Nr("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function $o(e, t) {
	j(t, !0);
	let n = Pi(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, a = /* @__PURE__ */ I(Qt(Ha.reducedMotion ? i : 0)), o = /* @__PURE__ */ P(() => n() * .11), s = /* @__PURE__ */ P(() => t.fractions.map((e, t) => {
		let s = n() / 2 - G(o) / 2 - t * G(o) * 1.3, c = 2 * Math.PI * s;
		return {
			kind: r[t],
			r: s,
			c,
			len: c * e * G(a) / i
		};
	}));
	Fi(() => {
		if (G(a) === i) return;
		let e = Ka(Ya({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => L(a, e, !0) });
		return e.to(i), e.stop;
	});
	var c = Qo();
	let l;
	Z(c, 21, () => G(s), (e) => e.kind, (e, t) => {
		var r = Zo(), i = z(r);
		let a;
		var s = V(i);
		let c;
		H(() => {
			$(i, "cx", n() / 2), $(i, "cy", n() / 2), $(i, "r", G(t).r), $(i, "stroke-width", G(o)), a = di(i, "", a, { stroke: `var(--${G(t).kind ?? ""})` }), $(s, "cx", n() / 2), $(s, "cy", n() / 2), $(s, "r", G(t).r), $(s, "stroke-width", G(o)), $(s, "stroke-dasharray", `${G(t).len ?? ""} ${G(t).c ?? ""}`), $(s, "opacity", +(G(t).len > .01)), $(s, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = di(s, "", c, { stroke: `var(--${G(t).kind ?? ""})` });
		}), J(e, r);
	}), k(c), H(() => {
		$(c, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), l = di(c, "", l, { width: `${n() / 16}rem` });
	}), J(e, c), M();
}
// src/lib/ui/PersonTile.svelte
var es = /* @__PURE__ */ q("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), ts = /* @__PURE__ */ q("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), ns = /* @__PURE__ */ q("<span class=\"streak svelte-1handop\"> </span>"), rs = /* @__PURE__ */ q("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), is = /* @__PURE__ */ q("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), as = /* @__PURE__ */ q("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), os = /* @__PURE__ */ q("<span class=\"steps svelte-1handop\"> </span>"), ss = /* @__PURE__ */ q("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), cs = /* @__PURE__ */ q("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), ls = /* @__PURE__ */ q("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function us(e, t) {
	j(t, !0);
	let n = Pi(t, "index", 3, 0), r = Pi(t, "compact", 3, !1), i = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], a = /* @__PURE__ */ P(() => i[n() % i.length]), o = /* @__PURE__ */ P(() => y(G(a), 2)), s = /* @__PURE__ */ P(() => G(o)[0]), c = /* @__PURE__ */ P(() => G(o)[1]), l = /* @__PURE__ */ P(() => Ji(t.person)), u = /* @__PURE__ */ P(() => t.person.week), d = [
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
	], f = /* @__PURE__ */ P(() => d.map((e, t) => ({
		...e,
		n: Hi(G(u))[t],
		of: Vi(G(u))[t]
	}))), p = /* @__PURE__ */ P(() => Gi(t.person.steps_today, G(u).goal.steps)), m = /* @__PURE__ */ P(() => [
		`Level ${G(l).level}`,
		r() ? `🔥 ${t.person.streak} wk` : `${t.person.xp.toLocaleString()} XP`,
		G(u).paused && "Week paused",
		G(u).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), h = /* @__PURE__ */ P(() => `${t.person.name}, level ${G(l).level}. This week ${G(f).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${G(u).goal_pending ? "New goals pending. " : ""}${G(u).bonus ? "Weekly bonus earned. " : ""}${G(p) ? G(p).replace("👟 ", "") + ". " : ""}Streak ${t.person.streak} weeks.`);
	var g = ls();
	let _;
	var v = R(g), b = R(v), x = R(b);
	let S;
	var C = B(x, !0), w = V(x, 2), T = R(w), ee = B(T, !0), te = B(V(T, 2), !0);
	k(w);
	var ne = V(w, 2), re = (e) => {
		var t = ts(), n = z(t), r = R(n);
		{
			let e = /* @__PURE__ */ P(() => Ui(G(u)));
			$o(r, {
				get fractions() {
					return G(e);
				},
				size: 44
			});
		}
		var i = V(r, 2), a = (e) => {
			J(e, es());
		};
		X(i, (e) => {
			G(u).bonus && e(a);
		}), k(n);
		var o = B(V(n, 2), !0);
		H(() => Y(o, G(h))), J(e, t);
	}, ie = (e) => {
		var n = ns(), r = B(n);
		H(() => Y(r, `🔥 ${t.person.streak ?? ""} wk`)), J(e, n);
	};
	X(ne, (e) => {
		r() ? e(re) : e(ie, -1);
	});
	var ae = V(ne, 2), oe = (e) => {
		J(e, rs());
	};
	X(ae, (e) => {
		t.onopen && e(oe);
	}), k(b);
	var se = V(b, 2), ce = (e) => {
		var t = ss(), n = z(t), r = R(n), i = R(r);
		{
			let e = /* @__PURE__ */ P(() => Ui(G(u))), t = /* @__PURE__ */ P(() => Ha.wide ? 112 : 88);
			$o(i, {
				get fractions() {
					return G(e);
				},
				get size() {
					return G(t);
				}
			});
		}
		var a = V(i, 2), o = (e) => {
			J(e, is());
		};
		X(a, (e) => {
			G(u).bonus && e(o);
		}), k(r);
		var s = V(r, 2);
		Z(s, 21, () => G(f), (e) => e.kind, (e, t) => {
			var n = as(), r = R(n), i = R(r);
			let a;
			var o = V(i, 1, !0);
			k(r);
			var s = V(r, 2), c = R(s, !0), l = B(V(c));
			k(s), k(n), H(() => {
				a = di(i, "", a, { background: `var(--${G(t).kind ?? ""})` }), Y(o, G(t).label), Y(c, G(t).n), Y(l, `/${G(t).of ?? ""}`);
			}), J(e, n);
		}), k(s), k(n);
		var c = V(n, 2), d = (e) => {
			var t = os(), n = B(t, !0);
			H(() => Y(n, G(p))), J(e, t);
		};
		X(c, (e) => {
			G(p) && e(d);
		});
		var m = V(c, 2), h = R(m), g = R(h);
		let _;
		k(h);
		var v = B(V(h, 2));
		k(m), H((e, t) => {
			_ = di(g, "", _, { width: `${G(l).frac * 100}%` }), Y(v, `${e ?? ""} of ${t ?? ""} XP to level ${G(l).level + 1}`);
		}, [() => G(l).into.toLocaleString(), () => G(l).span.toLocaleString()]), J(e, t);
	};
	X(se, (e) => {
		r() || e(ce);
	}), k(v);
	var le = V(v, 2), ue = (e) => {
		var n = cs();
		H(() => $(n, "aria-label", G(h))), K("click", n, function(...e) {
			t.onopen?.apply(this, e);
		}), J(e, n);
	};
	X(le, (e) => {
		t.onopen && e(ue);
	}), k(g), H((e) => {
		_ = Q(g, 1, "tile glass svelte-1handop", null, _, {
			compact: r(),
			opens: t.onopen
		}), $(v, "aria-hidden", t.onopen ? "true" : void 0), S = di(x, "", S, {
			"--a1": G(s),
			"--a2": G(c)
		}), Y(C, e), Y(ee, t.person.name), Y(te, G(m));
	}, [() => t.person.name.slice(0, 1)]), J(e, g), M();
}
wr(["click"]);
// src/lib/gesture.js
var ds = (e, t = .998) => e / 1e3 * t / (1 - t), fs = (e, t, n) => e + ds(t) > n / 2;
function ps(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var ms = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), hs = /* @__PURE__ */ q("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), gs = /* @__PURE__ */ q("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function _s(e, t) {
	j(t, !0);
	let n = Pi(t, "from", 3, null), r = 1e3, i = Ha.reducedMotion, a = /* @__PURE__ */ I(Qt(i ? r : 0)), o = /* @__PURE__ */ I(0), s = /* @__PURE__ */ I(1), c = /* @__PURE__ */ I(!1), l = /* @__PURE__ */ I("50% 100%"), u, d, f = !1, p = null, m = /* @__PURE__ */ P(() => i ? +G(c) : Math.min(1, G(a) / 500)), h = /* @__PURE__ */ P(() => i ? 1 : .5 + .5 * G(a) / r), g = () => {
		f && (G(a) === 0 || G(o) >= G(s)) && (f = !1, t.onclose());
	};
	function _(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = Ya({
					value: r,
					damping: o,
					response: s
				}), n = Ka(t, {
					onFrame: e,
					onSettle: g
				}), n.to(i, a);
			}
		};
	}
	let v = _((e) => L(a, e, !0)), y = _((e) => L(o, e, !0));
	function b() {
		f || p || (f = !0, i ? (L(c, !1), setTimeout(t.onclose, Ja("--fade"))) : v.to(G(a), 0, { response: .3 }));
	}
	function x(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), v.stop(), y.stop(), f = !1, p = {
			from: G(o),
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
		L(o, t < 0 ? -ms(-t, G(s)) : t, !0), p.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), p.samples.length > 8 && p.samples.shift();
	}
	function C(e) {
		if (!p) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = ps([...p.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		p = null, fs(G(o), n, G(s)) ? i ? b() : (f = !0, y.to(G(o), G(s), {
			velocity: n,
			response: .3
		})) : i ? L(o, 0) : (y.to(G(o), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), G(a) < r && v.to(G(a), r));
	}
	Fi(() => {
		if (n()) {
			let e = n().getBoundingClientRect();
			L(l, `${e.left + e.width / 2 - u.offsetLeft}px ${e.top + e.height / 2 - u.offsetTop}px`);
		}
		d.focus({ preventScroll: !0 });
		let e = document.documentElement;
		return e.style.overflow = "hidden", i ? requestAnimationFrame(() => L(c, !0)) : v.to(0, r), () => {
			v.stop(), y.stop(), e.style.overflow = "";
		};
	});
	var w = { close: b }, T = gs();
	Cr("keydown", tn, (e) => e.key === "Escape" && b());
	var ee = z(T);
	let te, ne;
	var re = V(ee, 2);
	let ie, ae;
	var oe = R(re), se = V(R(oe), 2), ce = R(se), le = (e) => {
		var n = hs();
		K("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), J(e, n);
	};
	X(ce, (e) => {
		t.onback && e(le);
	});
	var ue = V(ce, 2);
	Oi(ue, (e) => d = e, () => d), k(se), k(oe);
	var de = V(oe, 2);
	return ti(R(de), () => t.children), k(de), k(re), Oi(re, (e) => u = e, () => u), H((e) => {
		te = Q(ee, 1, "scrim svelte-185xwm9", null, te, { fade: i }), ne = di(ee, "", ne, { opacity: e }), ie = Q(re, 1, "sheet svelte-185xwm9", null, ie, { fade: i }), $(re, "aria-label", t.label), ae = di(re, "", ae, {
			opacity: G(m),
			transform: `translate3d(0, ${G(o) ?? ""}px, 0) scale(${G(h) ?? ""})`,
			"transform-origin": G(l)
		});
	}, [() => G(m) * Math.min(1, Math.max(0, 1 - G(o) / G(s)))]), K("click", ee, b), K("pointerdown", oe, x), K("pointermove", oe, S), K("pointerup", oe, C), Cr("pointercancel", oe, C), K("click", ue, b), Ei(re, "offsetHeight", (e) => L(s, e)), J(e, T), M(w);
}
wr([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var vs = /* @__PURE__ */ q("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), ys = /* @__PURE__ */ q("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), bs = /* @__PURE__ */ q("<p class=\"caption stale svelte-9nj5u4\"> </p>"), xs = /* @__PURE__ */ q("<!> <!> <!>", 1);
function Ss(e, t) {
	j(t, !0);
	let n = /* @__PURE__ */ P(() => t.scoredAt ? Xi(t.scoredAt, t.now) : null);
	var r = xs(), i = z(r), a = (e) => {
		var n = vs(), r = V(R(n));
		k(n), H(() => Y(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), J(e, n);
	};
	X(i, (e) => {
		t.configError && e(a);
	});
	var o = V(i, 2), s = (e) => {
		var n = ys(), r = V(R(n));
		k(n), H(() => Y(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), J(e, n);
	};
	X(o, (e) => {
		t.settingsError && e(s);
	});
	var c = V(o, 2), l = (e) => {
		var t = bs(), r = B(t, !0);
		H(() => Y(r, G(n))), J(e, t);
	};
	X(c, (e) => {
		G(n) && e(l);
	}), J(e, r), M();
}
// node_modules/svelte/src/internal/flags/legacy.js
Ke();
// src/lib/ui/Toast.svelte
var Cs = /* @__PURE__ */ q("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), ws = /* @__PURE__ */ q("<span> </span> <!>", 1), Ts = /* @__PURE__ */ q("<div role=\"status\" aria-live=\"polite\"><!></div>");
function Es(e, t) {
	j(t, !1);
	function n() {
		let e = Da.undo;
		Object.assign(Da, {
			on: !1,
			undo: null
		}), e();
	}
	Ai();
	var r = Ts();
	let i;
	var a = R(r), o = (e) => {
		var t = ws(), r = z(t), i = B(r, !0), a = V(r, 2), o = (e) => {
			var t = Cs();
			K("click", t, n), J(e, t);
		};
		X(a, (e) => {
			Da.undo && e(o);
		}), H(() => Y(i, Da.text)), J(e, t);
	};
	X(a, (e) => {
		Da.on && e(o);
	}), k(r), H(() => i = Q(r, 1, "toast svelte-1fk2ial", null, i, { on: Da.on })), J(e, r), M();
}
wr(["click"]);
// src/lib/ui/Together.svelte
var Ds = /* @__PURE__ */ q("<p class=\"progress svelte-1tya3no\"> </p>"), Os = /* @__PURE__ */ q("<p> </p>"), ks = /* @__PURE__ */ q("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), As = /* @__PURE__ */ q("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function js(e, t) {
	j(t, !0);
	let n = /* @__PURE__ */ P(() => t.group.week ? Ki(t.group.week, t.people) : ""), r = /* @__PURE__ */ P(() => t.group.week ? qi(t.group.week) : null), i = /* @__PURE__ */ P(() => [
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
	var a = As(), o = V(R(a), 2), s = (e) => {
		var t = Ds(), r = B(t, !0);
		H(() => Y(r, G(n))), J(e, t);
	};
	X(o, (e) => {
		G(n) && e(s);
	});
	var c = V(o, 2), l = (e) => {
		var n = Os();
		let i;
		var a = B(n, !0);
		H(() => {
			i = Q(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), Y(a, G(r));
		}), J(e, n);
	};
	X(c, (e) => {
		G(r) && e(l);
	});
	var u = V(c, 2);
	Z(u, 21, () => G(i), (e) => e.k, (e, t) => {
		var n = ks(), r = R(n), i = B(r, !0), a = V(r), o = R(a, !0), s = B(V(o), !0);
		k(a), k(n), H(() => {
			Y(i, G(t).k), Y(o, G(t).v), Y(s, G(t).unit);
		}), J(e, n);
	}), k(u), k(a), J(e, a), M();
}
// src/App.svelte
var Ms = /* @__PURE__ */ q("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), Ns = /* @__PURE__ */ q("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), Ps = /* @__PURE__ */ q("<div class=\"tiles compact svelte-1n46o8q\"></div>"), Fs = /* @__PURE__ */ q("<!> <!>", 1), Is = /* @__PURE__ */ q("<div class=\"tiles svelte-1n46o8q\"></div>"), Ls = /* @__PURE__ */ q("<!> <!> <!> <!>", 1), Rs = /* @__PURE__ */ q("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function zs(e, t) {
	j(t, !0);
	let n = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), i = new URLSearchParams(n.location.search), a = i.get("person"), o = /^\/(?!\/)/.test(i.get("back") ?? "") ? i.get("back") : null, s = o && (() => {
		n.history.pushState(null, "", o), n.dispatchEvent(new Event("location-changed"));
	}), c = /* @__PURE__ */ I(null), l = (e) => (t) => L(c, {
		id: e,
		from: t.currentTarget
	}, !0), u = /* @__PURE__ */ I(null), d = /* @__PURE__ */ I(void 0);
	async function f() {
		let e = G(c)?.from ?? G(u)?.from;
		L(c, L(u, null), !0), await dr(), e?.focus({ preventScroll: !0 });
	}
	let p = /* @__PURE__ */ I(null), m = /* @__PURE__ */ I(null), h = /* @__PURE__ */ I(Qt(/* @__PURE__ */ new Date())), g;
	async function _() {
		if (clearTimeout(g), !document.hidden) {
			try {
				L(p, await r("scores"), !0), L(m, null), Na(G(p).people), a && Object.hasOwn(G(p).people, a) && a !== ia(G(p).viewer, G(p).people).self && L(c, {
					id: a,
					from: null
				}, !0), a = null;
			} catch (e) {
				L(m, e, !0);
			}
			L(h, /* @__PURE__ */ new Date(), !0), clearTimeout(g), g = setTimeout(_, G(p) ? 6e4 : 3e4);
		}
	}
	xn(() => {
		_();
		let e = () => document.hidden || _();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(g), document.removeEventListener("visibilitychange", e);
		};
	});
	let v = /* @__PURE__ */ P(() => _a(G(p)?.people ?? {}, Oa.entry)), y = /* @__PURE__ */ P(() => Object.keys(G(v))), b = /* @__PURE__ */ P(() => ia(G(p)?.viewer ?? {}, G(v))), x = /* @__PURE__ */ P(() => G(v)[G(b).self ?? G(y)[0]]?.week), S = (e) => !!G(p)?.viewer?.can_edit?.includes(e), C = /* @__PURE__ */ P(() => !!G(c) && Object.hasOwn(G(v), G(c).id) || !!G(u) && !!G(p));
	var w = Rs(), T = z(w), ee = R(T);
	{
		let e = /* @__PURE__ */ P(() => G(x) ? Yi(G(x)) : ""), t = /* @__PURE__ */ P(() => G(p) ? (e) => L(u, { from: e.currentTarget }, !0) : void 0);
		Xo(ee, {
			title: "Training",
			get subtitle() {
				return G(e);
			},
			get onback() {
				return s;
			},
			actionLabel: "Goals",
			get onaction() {
				return G(t);
			}
		});
	}
	var te = V(ee, 2), ne = R(te), re = (e) => {
		var t = Ns(), n = V(z(t), 2), r = (e) => {
			var t = Ms(), n = B(t, !0);
			H(() => Y(n, G(m).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), J(e, t);
		};
		X(n, (e) => {
			G(m) && e(r);
		}), J(e, t);
	}, ie = (e) => {
		var t = Ls(), n = z(t);
		Ss(n, {
			get scoredAt() {
				return G(p).scored_at;
			},
			get configError() {
				return G(p).config_error;
			},
			get settingsError() {
				return G(p).settings_error;
			},
			get now() {
				return G(h);
			}
		});
		var r = V(n, 2), i = (e) => {
			var t = Fs(), n = z(t), r = (e) => {
				var t = Ps();
				Z(t, 20, () => G(b).others, (e) => e, (e, t) => {
					{
						let n = /* @__PURE__ */ P(() => G(y).indexOf(t)), r = /* @__PURE__ */ P(() => l(t));
						us(e, {
							get person() {
								return G(v)[t];
							},
							get index() {
								return G(n);
							},
							compact: !0,
							get onopen() {
								return G(r);
							}
						});
					}
				}), k(t), J(e, t);
			};
			X(n, (e) => {
				G(b).others.length && e(r);
			});
			var i = V(n, 2);
			{
				let e = /* @__PURE__ */ P(() => G(y).indexOf(G(b).self));
				us(i, {
					get person() {
						return G(v)[G(b).self];
					},
					get index() {
						return G(e);
					}
				});
			}
			J(e, t);
		}, a = (e) => {
			var t = Is();
			Z(t, 20, () => G(b).others, (e) => e, (e, t) => {
				{
					let n = /* @__PURE__ */ P(() => G(y).indexOf(t)), r = /* @__PURE__ */ P(() => l(t));
					us(e, {
						get person() {
							return G(v)[t];
						},
						get index() {
							return G(n);
						},
						get onopen() {
							return G(r);
						}
					});
				}
			}), k(t), J(e, t);
		};
		X(r, (e) => {
			G(b).self ? e(i) : e(a, -1);
		});
		var o = V(r, 2), s = (e) => {
			js(e, {
				get group() {
					return G(p).group;
				},
				get people() {
					return G(v);
				}
			});
		};
		X(o, (e) => {
			G(p).group && e(s);
		});
		var c = V(o, 2), u = (e) => {
			{
				let t = /* @__PURE__ */ P(() => S(G(b).self));
				Ro(e, {
					get id() {
						return G(b).self;
					},
					get person() {
						return G(v)[G(b).self];
					},
					get canEdit() {
						return G(t);
					}
				});
			}
		};
		X(c, (e) => {
			G(b).self && e(u);
		}), J(e, t);
	};
	X(ne, (e) => {
		G(p) ? e(ie, -1) : e(re);
	}), k(te), k(T);
	var ae = V(T, 2), oe = (e) => {
		Oi(_s(e, {
			label: "Goals",
			get from() {
				return G(u).from;
			},
			onclose: f,
			get onback() {
				return s;
			},
			children: (e, t) => {
				{
					let t = /* @__PURE__ */ P(() => !G(b).self);
					Ko(e, {
						get people() {
							return G(p).people;
						},
						get readOnly() {
							return G(t);
						},
						onsaved: () => G(d)?.close()
					});
				}
			},
			$$slots: { default: !0 }
		}), (e) => L(d, e, !0), () => G(d));
	}, se = (e) => {
		_s(e, {
			get label() {
				return `${G(v)[G(c).id].name ?? ""}'s details`;
			},
			get from() {
				return G(c).from;
			},
			onclose: f,
			get onback() {
				return s;
			},
			children: (e, t) => {
				var n = Fs(), r = z(n);
				{
					let e = /* @__PURE__ */ P(() => G(y).indexOf(G(c).id));
					us(r, {
						get person() {
							return G(v)[G(c).id];
						},
						get index() {
							return G(e);
						}
					});
				}
				var i = V(r, 2);
				{
					let e = /* @__PURE__ */ P(() => S(G(c).id));
					Ro(i, {
						get id() {
							return G(c).id;
						},
						get person() {
							return G(v)[G(c).id];
						},
						get canEdit() {
							return G(e);
						}
					});
				}
				J(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	X(ae, (e) => {
		G(u) && G(p) ? e(oe) : G(C) && e(se, 1);
	}), Es(V(ae, 2), {}), H(() => T.inert = G(C)), J(e, w), M();
}
// src/main.js
var Bs = (e) => Vr(zs, { target: e }), Vs = () => new Promise((e) => {
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
		document.documentElement.dataset.theme = n ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Vs().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", Bs(e);
		}));
	}
});
