import { $ as e, $t as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Gt as h, H as g, Ht as _, I as v, It as y, J as b, Jt as x, K as S, Kt as C, L as w, Lt as T, M as E, Mt as D, N as O, Nt as k, O as A, Ot as j, P as M, Pt as N, Q as ee, Qt as P, R as F, Rt as I, S as te, St as ne, T as L, Tt as re, U as ie, Ut as R, V as ae, Vt as oe, W as se, Wt as z, X as ce, Xt as le, Y as ue, Yt as B, Z as de, Zt as fe, _ as pe, _n as me, _t as he, a as ge, an as _e, at as ve, b as ye, bt as V, c as be, cn as H, ct as xe, d as Se, dn as Ce, dt as we, en as U, et as Te, f as Ee, fn as W, ft as G, g as De, gn as Oe, gt as ke, h as Ae, ht as je, i as Me, in as K, it as Ne, j as Pe, jt as q, k as Fe, kt as Ie, l as Le, ln as Re, lt as ze, m as Be, mn as Ve, mt as He, n as Ue, nn as We, nt as Ge, o as Ke, on as J, ot as qe, p as Je, pn as Ye, pt as Xe, q as Ze, qt as Qe, rn as Y, rt as $e, s as et, sn as X, st as tt, t as nt, tn as Z, tt as rt, u as it, un as at, ut as ot, v as st, vn as ct, vt as lt, w as ut, wt as dt, x as ft, xt as Q, y as pt, yt as mt, z as ht, zt as $ } from "./shared-CtWUCw1Q.js";
// src/lib/actions.svelte.js
var gt = 5e3, _t = We({}), vt = We({}), yt = We({
	on: !1,
	text: "",
	undo: null
}), bt = We({
	entry: null,
	at: 0
}), xt = We({ n: 0 }), St, Ct = 0, wt = {};
function Tt(e, t = null) {
	clearTimeout(St), Object.assign(yt, {
		on: !0,
		text: e,
		undo: t
	}), St = setTimeout(() => yt.on = !1, gt);
}
function Et(e, t = Date.now()) {
	for (let [n, r] of Object.entries(_t)) ae(r, e[r.person]?.feed ?? [], t) && delete _t[n];
	bt.entry && u(bt, e, t) && (bt.entry = null);
}
var Dt = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant");
async function Ot(e, t, n) {
	let r;
	try {
		r = await me("POST", "settings", e);
	} catch (e) {
		return Tt(Dt(e)), !1;
	}
	return r.from && r.from > n ? (Tt(`Saved · from Monday ${$e(r.from)}`), !0) : (Object.assign(bt, {
		entry: e,
		at: Date.now()
	}), Et(t), Tt("Saved · updates within 5 min"), !0);
}
async function kt() {
	let e;
	try {
		e = await me("POST", "settings", { action: "cancel" });
	} catch (e) {
		return Tt(Dt(e)), !1;
	}
	return Tt(e.cancelled === !1 ? "Nothing to cancel · these goals are in force" : "Change cancelled"), !0;
}
async function At(e, t, n) {
	let r = `${e}/${t}`, i = _t[r], a = ++Ct, o = t.startsWith("manual:"), s = o && n === "remove" ? null : n === "remove";
	_t[r] = {
		person: e,
		key: t,
		want: s,
		at: Date.now(),
		n: a
	}, n === "remove" && !o && Tt("Removed", () => At(e, t, "restore"));
	try {
		await ue(wt, r, () => me("POST", "workouts", {
			person: e,
			key: t,
			action: n
		})), vt[r] = s;
	} catch (e) {
		_t[r]?.n === a && (i ? _t[r] = i : delete _t[r]), Tt(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
var jt = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
async function Mt(e, t) {
	try {
		return await Oe(`feed?person=${encodeURIComponent(e)}&before=${t}`);
	} catch (e) {
		return Tt(jt(e)), null;
	}
}
async function Nt(e) {
	try {
		await me("POST", "shoes", e);
	} catch (e) {
		return Tt(jt(e)), !1;
	}
	return xt.n++, !0;
}
async function Pt(e, t, n, r = null, i = "") {
	try {
		await me("POST", "workouts", {
			action: "review",
			person: e,
			key: t,
			decision: n,
			...n === "type" && { type_match: r }
		});
	} catch (e) {
		return Tt(jt(e)), !1;
	}
	return xt.n++, Tt({
		plan: `Counts for ${i}`,
		run: "Kept as a run",
		type: `Changed to ${i}`
	}[n] ?? "Decision cleared"), !0;
}
async function Ft(e, t, n) {
	try {
		await me("POST", "workouts", {
			action: "shoe",
			person: e,
			key: t,
			shoe_id: n
		});
	} catch (e) {
		return Tt(jt(e)), !1;
	}
	return xt.n++, Tt("Moved to the other shoe"), !0;
}
async function It(e) {
	try {
		let t = await me("POST", "plans", e);
		return xt.n++, t;
	} catch (e) {
		return { error: jt(e) };
	}
}
// src/lib/ui/Connect.svelte
var Lt = $("<div class=\"url svelte-gy3e4s\"><input readonly=\"\" aria-label=\"Your address\" class=\"svelte-gy3e4s\"/> <button type=\"button\" class=\"btn press\" aria-label=\"Copy address\">Copy</button></div>"), Rt = $("<p class=\"caption svelte-gy3e4s\">Your token (a password: the phone sends it as the header Authorization: Bearer and the token)</p> <div class=\"url svelte-gy3e4s\"><input readonly=\"\" aria-label=\"Your token\" class=\"svelte-gy3e4s\"/> <button type=\"button\" class=\"btn press\" aria-label=\"Copy token\">Copy</button></div>", 1), zt = $("<p class=\"warn svelte-gy3e4s\">This address only works at home.</p>"), Bt = $("<p class=\"caption svelte-gy3e4s\"> </p> <div class=\"choice svelte-gy3e4s\"><button type=\"button\" class=\"btn press svelte-gy3e4s\">iPhone</button> <button type=\"button\" class=\"btn press svelte-gy3e4s\">Android</button></div>", 1), Vt = $("<li class=\"svelte-gy3e4s\"> </li>"), Ht = $("<ol class=\"svelte-gy3e4s\"></ol>"), Ut = $("<p class=\"caption svelte-gy3e4s\"> <b> </b> </p>"), Wt = $("<p> </p> <!> <!> <!> <!> <!>", 1), Gt = $("<details class=\"card connect svelte-gy3e4s\"><summary class=\"svelte-gy3e4s\">Connect your phone <small class=\"svelte-gy3e4s\"> </small></summary> <div class=\"inner svelte-gy3e4s\"><!></div></details>"), Kt = $("<section class=\"card connect svelte-gy3e4s\" aria-label=\"Connect your phone\"><div class=\"inner svelte-gy3e4s\"><h2 class=\"svelte-gy3e4s\">Connect your phone</h2><!></div></section>");
function qt(e, r) {
	H(r, !0);
	let i = (e) => {
		var n = Wt(), i = t(n);
		let a;
		var o = U(i, !0), _ = Z(i, 2), v = (e) => {
			var t = Lt(), n = P(t);
			V(n), je(n, (e) => Y(p, e), () => C(p));
			var i = Z(n, 2);
			W(t), B(() => ne(n, r.info.url)), h("focus", n, (e) => e.currentTarget.select()), z("click", i, () => g(C(p), "address")), T(e, t);
		};
		N(_, (e) => {
			r.info.url && e(v);
		});
		var b = Z(_, 2), x = (e) => {
			var n = Rt(), i = Z(t(n), 2), a = P(i);
			V(a), je(a, (e) => Y(m, e), () => C(m));
			var o = Z(a, 2);
			W(i), B(() => ne(a, r.info.token)), h("focus", a, (e) => e.currentTarget.select()), z("click", o, () => g(C(m), "token")), T(e, n);
		};
		N(b, (e) => {
			r.info.token && e(x);
		});
		var S = Z(b, 2), w = (e) => {
			var t = zt();
			T(e, t);
		};
		N(S, (e) => {
			r.info.external || e(w);
		});
		var E = Z(S, 2), D = (e) => {
			var n = Bt(), r = t(n), i = U(r, !0), a = Z(r, 2), o = P(a), c = Z(o, 2);
			W(a), B(() => y(i, C(u).title)), z("click", o, () => Y(s, "iphone")), z("click", c, () => Y(s, "android")), T(e, n);
		}, O = (e) => {
			var t = Ht();
			q(t, 20, () => C(u).steps, (e) => e, (e, t) => {
				var n = Vt(), r = U(n, !0);
				B(() => y(r, t)), T(e, n);
			}), W(t), T(e, t);
		};
		N(E, (e) => {
			C(c) ? e(O, -1) : e(D);
		});
		var k = Z(E, 2), A = (e) => {
			var t = Ut(), n = P(t, !0), r = Z(n), i = U(r, !0), a = Z(r, 1, !0);
			W(t), B(() => {
				y(n, C(f).before), y(i, C(f).code), y(a, C(f).after);
			}), T(e, t);
		};
		N(k, (e) => {
			C(f) && e(A);
		}), B(() => {
			a = l(i, 1, "status svelte-gy3e4s", null, a, { ok: C(d).state === "connected" }), y(o, C(d).text);
		}), T(e, n);
	}, a = G(r, "person", 3, null), o = G(r, "collapsed", 3, !1), s = K(null), c = J(() => r.info.phone ?? C(s)), u = J(() => ft(C(c), !!r.info.token)), d = J(() => ye(r.info, r.now, a())), f = J(() => n(r.info.opengym)), p = K(void 0), m = K(void 0);
	async function g(e, t) {
		e.focus(), e.setSelectionRange(0, e.value.length);
		let n = !1;
		try {
			await navigator.clipboard.writeText(e.value), n = !0;
		} catch {
			try {
				n = document.execCommand("copy");
			} catch {}
		}
		Tt(n ? "Copied" : `Select and copy the ${t}`);
	}
	var _ = I(), v = t(_), b = (e) => {
		var t = Gt(), n = P(t), r = Z(P(n)), a = U(r, !0);
		W(n);
		var o = Z(n, 2), s = P(o);
		i(s), W(o), W(t), B(() => y(a, C(d).state === "connected" ? "Connected" : "Waiting")), T(e, t);
	}, x = (e) => {
		var t = Kt(), n = P(t), r = Z(P(n));
		i(r), W(n), W(t), T(e, t);
	};
	N(v, (e) => {
		o() ? e(b) : e(x, -1);
	}), T(e, _), X();
}
R(["click"]);
// src/lib/ui/Badges.svelte
var Jt = $("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), Yt = $("<ul class=\"svelte-m8wnum\"></ul>"), Xt = $("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), Zt = $("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), Qt = $("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function $t(e, t) {
	H(t, !0);
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
	var a = Qt(), o = P(a), s = (e) => {
		var n = Yt();
		q(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = Jt(), i = P(n), a = U(i, !0), o = Z(i, 2), s = U(o, !0), c = Z(o, 2), l = U(c, !0);
			W(n), B((e, n) => {
				y(a, e), y(s, C(t).title), y(l, n);
			}, [() => r(C(t)), () => $e(C(t).unlocked_at)]), T(e, n);
		}), W(n), T(e, n);
	};
	N(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = Z(o, 2), l = (e) => {
		var n = Yt();
		q(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = Xt(), a = P(n), o = U(a, !0), s = Z(a, 2), c = U(s, !0), l = Z(s, 2), u = U(l), f = Z(l, 2), p = P(f);
			let m;
			W(f), W(n), B((e, n, r, i) => {
				y(o, e), y(c, C(t).title), y(u, `${n ?? ""} of ${r ?? ""}`), m = d(p, "", m, { width: i });
			}, [
				() => r(C(t)),
				() => i(C(t).current),
				() => i(C(t).target),
				() => `${Math.min(1, C(t).current / C(t).target) * 100}%`
			]), T(e, n);
		}), W(n), T(e, n);
	};
	N(c, (e) => {
		t.badges.next.length && e(l);
	});
	var u = Z(c, 2), f = (e) => {
		var t = Zt();
		T(e, t);
	};
	N(u, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(f);
	}), W(a), T(e, a), X();
}
// src/lib/ui/FeedRow.svelte
var en = $("<span class=\"mini svelte-69s4be\"> </span>"), tn = $("<span> </span>"), nn = $("<span class=\"mini svelte-69s4be\">Together</span>"), rn = $("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), an = $("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), on = $("<span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span>", 1), sn = $("<button type=\"button\" class=\"head svelte-69s4be\"><!></button>"), cn = $("<div class=\"head svelte-69s4be\"><!></div>"), ln = $("<li><!></li>");
function un(e, n) {
	H(n, !0);
	let r = (e) => {
		var r = on(), s = t(r), c = U(s, !0), u = Z(s, 2), d = P(u), f = P(d), p = Z(f), m = (e) => {
			var t = en(), n = U(t, !0);
			B(() => y(n, C(o).plan)), T(e, t);
		};
		N(p, (e) => {
			C(o).plan && e(m);
		});
		var h = Z(p, 2), g = (e) => {
			var t = tn();
			let n;
			var r = U(t, !0);
			B(() => {
				n = l(t, 1, "mini svelte-69s4be", null, n, { warn: C(o).chip.tone === "warn" }), y(r, C(o).chip.text);
			}), T(e, t);
		};
		N(h, (e) => {
			C(o).chip && e(g);
		});
		var _ = Z(h, 2), v = (e) => {
			var t = nn();
			T(e, t);
		};
		N(_, (e) => {
			n.item.joint && e(v);
		});
		var b = Z(_, 2), x = (e) => {
			var t = rn();
			T(e, t);
		};
		N(b, (e) => {
			n.record && e(x);
		}), W(d);
		var S = Z(d, 2), w = U(S);
		W(u);
		var E = Z(u, 2), D = P(E), O = (e) => {
			var t = an();
			T(e, t);
		};
		N(D, (e) => {
			C(a) && e(O);
		});
		var k = Z(D);
		W(E), B(() => {
			l(s, 1, `ic ${n.item.kind ?? ""}`, "svelte-69s4be"), y(c, i[n.item.kind] ?? "💪"), y(f, `${C(o).title ?? ""} `), y(w, `${C(o).when ?? ""} · ${C(o).duration ?? ""}`), y(k, ` ${(C(o).removable === "restore" ? "Removed" : C(o).label ?? (C(o).xp && `${C(o).xp} XP`)) ?? ""}`);
		}), T(e, r);
	}, i = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, a = J(() => _t[`${n.person}/${n.item.key}`]), o = J(() => ut(C(a) && C(a).want !== null ? {
		...n.item,
		excluded: C(a).want
	} : n.item)), s = J(() => C(a)?.want === null), c = J(() => n.item.kind !== "active_day");
	var u = ln();
	let d;
	var f = P(u), p = (e) => {
		var t = sn(), i = P(t);
		r(i), W(t), z("click", t, () => n.onopen(n.item)), T(e, t);
	}, m = (e) => {
		var t = cn(), n = P(t);
		r(n), W(t), T(e, t);
	};
	N(f, (e) => {
		C(c) ? e(p) : e(m, -1);
	}), W(u), B(() => d = l(u, 1, "svelte-69s4be", null, d, {
		dim: C(o).removable === "restore" || C(s),
		grey: !!C(o).label
	})), T(e, u), X();
}
R(["click"]);
// src/lib/ui/Feed.svelte
var dn = $("<ul class=\"card svelte-n1344i\"></ul>"), fn = $("<p class=\"caption empty svelte-n1344i\">No workouts in the last 90 days.</p>"), pn = $("<button type=\"button\" class=\"btn older svelte-n1344i\">Load older</button>"), mn = $("<!> <!>", 1);
function hn(e, n) {
	H(n, !0);
	let r = K(We([])), i = K(!0), a = K(!1), o = null, s = J(() => w(n.items, ht(C(r), n.person, vt)));
	async function c() {
		Y(a, !0);
		let e = o ?? C(s).at(-1)?.start.slice(0, 10) ?? F(f(), 88), t = await Mt(n.person, e);
		Y(a, !1), t && (Y(r, w(C(r), t.items), !0), o = F(e, 90), Y(i, t.more, !0));
	}
	var l = mn(), u = t(l), d = (e) => {
		var t = dn();
		q(t, 21, () => C(s), (e) => e.key, (e, t) => {
			{
				let r = J(() => n.records?.has(C(t).key));
				un(e, {
					get person() {
						return n.person;
					},
					get item() {
						return C(t);
					},
					get record() {
						return C(r);
					},
					get onopen() {
						return n.onopen;
					}
				});
			}
		}), W(t), T(e, t);
	}, p = (e) => {
		var t = fn();
		T(e, t);
	};
	N(u, (e) => {
		C(s).length ? e(d) : e(p, -1);
	});
	var m = Z(u, 2), h = (e) => {
		var t = pn();
		B(() => t.disabled = C(a)), z("click", t, c), T(e, t);
	};
	N(m, (e) => {
		C(i) && e(h);
	}), T(e, l), X();
}
R(["click"]);
// src/lib/ui/PlanBar.svelte
var gn = $("<p class=\"caption name svelte-1y5m0aq\"> <!></p>"), _n = $("<span> </span>"), vn = $("<i class=\"svelte-1y5m0aq\"></i>"), yn = $("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), bn = $("<span class=\"review svelte-1y5m0aq\"> </span>"), xn = $("<p class=\"caption prog svelte-1y5m0aq\"> <!></p>"), Sn = $("<button type=\"button\" class=\"btn change press svelte-1y5m0aq\">Change plan</button>"), Cn = $("<div class=\"card plan svelte-1y5m0aq\"><!> <div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!> <!> <!></div>");
function wn(e, n) {
	H(n, !0);
	let r = G(n, "canEdit", 3, !1), i = J(() => n.plan.week != null), a = J(() => n.plan.target?.type === "distance" ? [] : g(n.plan)), o = J(() => ie(n.plan)), s = J(() => m(n.plan));
	var c = Cn(), u = P(c), f = (e) => {
		var t = gn(), r = P(t, !0), i = Z(r), a = (e) => {
			var t = _();
			B(() => y(t, `· Round ${n.plan.round ?? ""}`)), T(e, t);
		};
		N(i, (e) => {
			n.plan.loop && e(a);
		}), W(t), B(() => y(r, n.plan.name)), T(e, t);
	};
	N(u, (e) => {
		n.plan.name && e(f);
	});
	var p = Z(u, 2), h = P(p), v = U(h, !0), b = Z(h, 2), x = (e) => {
		var t = _n();
		let r;
		var i = U(t, !0);
		B(() => {
			r = l(t, 1, "tag svelte-1y5m0aq", null, r, { due: n.plan.due_today }), y(i, n.plan.due_today ? "Due today" : "Rest day");
		}), T(e, t);
	};
	N(b, (e) => {
		C(i) && e(x);
	}), W(p);
	var S = Z(p, 2), w = (e) => {
		var n = yn(), r = t(n);
		q(r, 21, () => C(a), D, (e, t) => {
			var n = vn();
			let r;
			B(() => r = d(n, "", r, {
				"flex-grow": C(t).frac,
				background: `var(--${C(t).kind === "run" ? "run" : "fill"})`
			})), T(e, n);
		}), W(r);
		var i = Z(r, 2), s = P(i), c = P(s);
		d(c, "", {}, { background: "var(--run)" });
		var l = Z(c, 2);
		d(l, "", {}, { background: "var(--fill)" }), Ce(), W(s);
		var u = Z(s, 2), f = U(u);
		W(i), B(() => {
			Q(r, "aria-label", `Run and walk intervals, ${C(o) ?? ""} minutes in total`), y(f, `${C(o) ?? ""} min`);
		}), T(e, n);
	};
	N(S, (e) => {
		C(a).length && e(w);
	});
	var E = Z(S, 2), O = (e) => {
		var t = xn(), r = P(t, !0), i = Z(r), a = (e) => {
			var t = bn(), r = U(t);
			B(() => y(r, `${C(s) ? " · " : ""}${n.plan.review_pending ?? ""} ${n.plan.review_pending === 1 ? "run" : "runs"} to review`)), T(e, t);
		};
		N(i, (e) => {
			n.plan.review_pending && e(a);
		}), W(t), B(() => y(r, C(s))), T(e, t);
	};
	N(E, (e) => {
		(C(s) || n.plan.review_pending) && e(O);
	});
	var k = Z(E, 2), A = (e) => {
		var t = Sn();
		z("click", t, function(...e) {
			n.onchange?.apply(this, e);
		}), T(e, t);
	};
	N(k, (e) => {
		r() && e(A);
	}), W(c), B(() => y(v, n.plan.state)), T(e, c), X();
}
R(["click"]);
// src/lib/ui/PlanSession.svelte
var Tn = $("<label class=\"line svelte-dinfsf\"><span class=\"lbl svelte-dinfsf\"> </span> <input class=\"field num svelte-dinfsf\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"180\" step=\"0.5\"/> min</label>"), En = $("<button type=\"button\" class=\"del press svelte-dinfsf\">×</button>"), Dn = $("<div class=\"line iv svelte-dinfsf\" role=\"group\"><select class=\"field svelte-dinfsf\"><option>Run</option><option>Walk</option></select> <input class=\"field num svelte-dinfsf\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"180\"/> <span aria-hidden=\"true\">:</span> <input class=\"field num svelte-dinfsf\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"59\"/> <button type=\"button\" class=\"del press svelte-dinfsf\">×</button></div>"), On = $("<div class=\"line svelte-dinfsf\" role=\"group\" aria-label=\"Times through the intervals\"><span class=\"lbl svelte-dinfsf\" aria-hidden=\"true\">Times</span> <button type=\"button\" class=\"pm press\" aria-label=\"Fewer times\">−</button> <output aria-live=\"polite\" class=\"svelte-dinfsf\"> </output> <button type=\"button\" class=\"pm press\" aria-label=\"More times\">+</button></div>"), kn = $("<!> <button type=\"button\" class=\"btn press svelte-dinfsf\">Add interval</button> <!>", 1), An = $("<label><input class=\"sr svelte-dinfsf\" type=\"radio\"/> </label>"), jn = $("<label class=\"line svelte-dinfsf\"><span class=\"lbl svelte-dinfsf\">Distance</span> <input class=\"field num svelte-dinfsf\" type=\"number\" inputmode=\"decimal\" min=\"0.1\" max=\"100\" step=\"0.1\"/> km</label>"), Mn = $("<i class=\"svelte-dinfsf\"></i>"), Nn = $("<div class=\"segs svelte-dinfsf\" role=\"img\" aria-label=\"Run and walk intervals\"></div>"), Pn = $("<fieldset class=\"session svelte-dinfsf\"><legend class=\"svelte-dinfsf\"> </legend> <!> <!> <!> <!> <div class=\"seg svelte-dinfsf\" role=\"radiogroup\" aria-label=\"Done when\"></div> <p class=\"caption svelte-dinfsf\"> </p> <!> <label class=\"line note svelte-dinfsf\"><span class=\"lbl svelte-dinfsf\">Note</span> <input class=\"field svelte-dinfsf\" type=\"text\" maxlength=\"80\" placeholder=\"Easy pace\"/></label> <div class=\"preview svelte-dinfsf\" aria-live=\"polite\"><!> <p class=\"caption svelte-dinfsf\"> <!></p></div></fieldset>");
function Fn(e, n) {
	let r = oe();
	H(n, !0);
	let i = [], a = (e, t = Ye, n = Ye) => {
		var r = Tn(), i = P(r), a = U(i, !0), s = Z(i, 2);
		V(s), Ce(), W(r), B(() => {
			y(a, n()), ne(s, o()[t()] / 60);
		}), z("change", s, (e) => o(o()[t()] = v(e.currentTarget.valueAsNumber * 60), !0)), T(e, r);
	}, o = G(n, "session", 15), c = G(n, "ondelete", 3, null), u = [
		{
			type: "duration",
			label: "Time",
			hint: "Done at 80% of the planned time."
		},
		{
			type: "distance",
			label: "Distance",
			hint: "Done at 90% of the distance."
		},
		{
			type: "none",
			label: "Any run",
			hint: "Any run counts."
		}
	], f = J(() => o().target.type === "distance"), p = J(() => ee(Re(o()))), h = J(() => C(f) ? [] : g(C(p))), v = (e) => Math.max(0, Math.round(e)) || 0, b = (e, t, n) => e[1] = v(t) * 60 + v(n);
	var x = Pn(), S = P(x), w = U(S, !0), E = Z(S, 2), O = (e) => {
		var t = En();
		B(() => Q(t, "aria-label", `Delete ${n.label ?? ""}`)), z("click", t, function(...e) {
			c()?.apply(this, e);
		}), T(e, t);
	};
	N(E, (e) => {
		c() && e(O);
	});
	var k = Z(E, 2);
	a(k, () => "warmup_s", () => "Warm-up walk");
	var A = Z(k, 2), j = (e) => {
		var n = kn(), r = t(n);
		q(r, 17, () => o().intervals, D, (e, t, n) => {
			var r = Dn();
			Q(r, "aria-label", `Interval ${n + 1}`);
			var i = P(r);
			Q(i, "aria-label", `Interval ${n + 1} kind`);
			var a = P(i);
			a.value = a.__value = "run";
			var c = Z(a);
			c.value = c.__value = "walk", W(i), dt(i);
			var l = Z(i, 2);
			V(l), Q(l, "aria-label", `Interval ${n + 1} minutes`);
			var u = Z(l, 4);
			V(u), Q(u, "aria-label", `Interval ${n + 1} seconds`);
			var d = Z(u, 2);
			Q(d, "aria-label", `Delete interval ${n + 1}`), W(r), B((e) => {
				ne(l, e), ne(u, C(t)[1] % 60);
			}, [() => Math.floor(C(t)[1] / 60)]), s(i, () => C(t)[0], (e) => C(t)[0] = e), z("change", l, (e) => b(C(t), e.currentTarget.valueAsNumber, C(t)[1] % 60)), z("change", u, (e) => b(C(t), Math.floor(C(t)[1] / 60), e.currentTarget.valueAsNumber)), z("click", d, () => o().intervals.splice(n, 1)), T(e, r);
		});
		var i = Z(r, 2), a = Z(i, 2), c = (e) => {
			var t = On(), n = Z(P(t), 2), r = Z(n, 2), i = U(r, !0), a = Z(r, 2);
			W(t), B(() => {
				n.disabled = o().times <= 1, y(i, o().times), a.disabled = o().times >= 50;
			}), z("click", n, () => o(o().times--, !0)), z("click", a, () => o(o().times++, !0)), T(e, t);
		};
		N(a, (e) => {
			o().intervals.length && e(c);
		}), B(() => i.disabled = o().intervals.length >= 30), z("click", i, () => o().intervals.push([o().intervals.at(-1)?.[0] === "run" ? "walk" : "run", 60])), T(e, n);
	};
	N(A, (e) => {
		C(f) || e(j);
	});
	var M = Z(A, 2);
	a(M, () => "cooldown_s", () => "Cool-down walk");
	var F = Z(M, 2);
	q(F, 21, () => u, (e) => e.type, (e, t) => {
		var n = An();
		let a;
		var s = P(n);
		V(s);
		var c, u = Z(s, 1, !0);
		W(n), B(() => {
			a = l(n, 1, "svelte-dinfsf", null, a, { on: o().target.type === C(t).type }), Q(s, "name", `${r}-done`), c !== (c = C(t).type) && (s.value = (s.__value = c) ?? ""), y(u, C(t).label);
		}), lt(i, [], s, () => (C(t).type, o().target.type), (e) => o(o().target.type = e, !0)), T(e, n);
	}), W(F);
	var I = Z(F, 2), te = U(I, !0), L = Z(I, 2), re = (e) => {
		var t = jn(), n = Z(P(t), 2);
		V(n), Ce(), W(t), B(() => ne(n, o().target.km)), z("change", n, (e) => o(o().target.km = Math.round(e.currentTarget.valueAsNumber * 10) / 10 || 0, !0)), T(e, t);
	};
	N(L, (e) => {
		C(f) && e(re);
	});
	var R = Z(L, 2), ae = Z(P(R), 2);
	V(ae), W(R);
	var se = Z(R, 2), ce = P(se), le = (e) => {
		var t = Nn();
		q(t, 21, () => C(h), D, (e, t) => {
			var n = Mn();
			let r;
			B(() => r = d(n, "", r, {
				"flex-grow": C(t).frac,
				background: `var(--${C(t).kind === "run" ? "run" : "fill"})`
			})), T(e, n);
		}), W(t), T(e, t);
	};
	N(ce, (e) => {
		C(h).length && e(le);
	});
	var ue = Z(ce, 2), de = P(ue, !0), fe = Z(de), pe = (e) => {
		var t = _();
		B((e) => y(t, `· ${e ?? ""} min`), [() => ie(C(p))]), T(e, t);
	};
	N(fe, (e) => {
		C(f) || e(pe);
	}), W(ue), W(se), W(x), B((e, t) => {
		y(w, n.label), y(te, e), y(de, t);
	}, [() => u.find((e) => e.type === o().target.type).hint, () => m(C(p)) || "No run yet"]), mt(ae, () => o().note, (e) => o(o().note = e, !0)), T(e, x), X();
}
R(["change", "click"]);
// src/lib/ui/PlanBuilder.svelte
var In = $("<!> <div class=\"acts svelte-1axo6sg\"><button type=\"button\" class=\"btn press\">Add session</button> <button type=\"button\" class=\"btn press\">Duplicate week</button> <button type=\"button\" class=\"btn danger press\">Delete week</button></div>", 1), Ln = $("<section class=\"card week svelte-1axo6sg\"><h3 class=\"svelte-1axo6sg\"><button type=\"button\" class=\"wk svelte-1axo6sg\"> <span class=\"caption\"> </span><span class=\"chev svelte-1axo6sg\" aria-hidden=\"true\"> </span></button></h3> <!></section>"), Rn = $("<p class=\"error svelte-1axo6sg\" role=\"alert\"> </p>"), zn = $("<div class=\"builder svelte-1axo6sg\"><button type=\"button\" class=\"back-link press\"><span aria-hidden=\"true\">‹</span> Back</button> <h2 class=\"heading svelte-1axo6sg\"> </h2> <div class=\"card head svelte-1axo6sg\"><label class=\"line svelte-1axo6sg\"><span class=\"lbl svelte-1axo6sg\">Name</span> <input class=\"field svelte-1axo6sg\" type=\"text\" maxlength=\"40\" placeholder=\"My easy week\"/></label> <label class=\"line toggle svelte-1axo6sg\"><span class=\"lbl svelte-1axo6sg\">Repeat when done<small class=\"caption\">Starts again at week 1, never graduates</small></span> <input type=\"checkbox\" class=\"svelte-1axo6sg\"/></label></div> <!> <button type=\"button\" class=\"btn press\">Add week</button> <!> <button type=\"button\" class=\"btn primary press\">Save</button></div>");
function Bn(e, n) {
	let r = oe();
	H(n, !0);
	let i = G(n, "from", 3, null), a = () => de({
		warmup_s: 300,
		cooldown_s: 300,
		intervals: [["run", 60], ["walk", 90]],
		target: { type: "duration" }
	}), s = (e) => o(e.weeks).map((e) => ({ sessions: e.sessions.map(de) })), c = (e) => n.mode === "copy" ? `${e.name.slice(0, 33)} (copy)` : e.name, l = (e) => e ? {
		name: c(e),
		loop: !!e.loop,
		weeks: s(e)
	} : {
		name: "",
		loop: !1,
		weeks: [{ sessions: [a()] }]
	}, u = We(x(() => l(i()))), d = K(0), f = K(!1), p = K(null), m;
	we(() => m.focus());
	let h = (e) => `${e} ${e === 1 ? "run" : "runs"}`;
	function g(e, t) {
		u.weeks.splice(e, 0, t), Y(d, e, !0);
	}
	async function _() {
		Y(f, !0);
		let e = Re(u), t = {
			name: e.name.trim(),
			loop: e.loop,
			weeks: e.weeks.map((e) => ({ sessions: e.sessions.map(ce) }))
		}, r = await It({
			op: "save",
			...n.mode === "edit" && { id: i().id },
			plan: t
		});
		Y(f, !1), Y(p, r.error ?? null, !0);
		let a = /^weeks\.(\d+)/.exec(C(p) ?? "");
		a && Y(d, a[1] - 1), C(p) || (Tt(`Saved ${t.name}`), n.onback());
	}
	var v = zn(), b = P(v);
	je(b, (e) => m = e, () => m);
	var S = Z(b, 2), w = U(S, !0), E = Z(S, 2), D = P(E), O = Z(P(D), 2);
	V(O), W(D);
	var k = Z(D, 2), A = Z(P(k), 2);
	V(A), W(k), W(E);
	var j = Z(E, 2);
	q(j, 18, () => u.weeks, (e) => e, (e, n, i) => {
		var o = Ln(), s = P(o), c = P(s), l = P(c), f = Z(l), p = U(f), m = Z(f), _ = U(m, !0);
		W(c), W(s);
		var v = Z(s, 2), b = (e) => {
			var r = In(), o = t(r);
			q(o, 18, () => n.sessions, (e) => e, (e, t, r) => {
				{
					let t = J(() => C(i) + 1), a = J(() => C(r) + 1), o = J(() => n.sessions.length > 1 ? () => n.sessions.splice(C(r), 1) : null);
					Fn(e, {
						get label() {
							return `Week ${C(t) ?? ""}, run ${C(a) ?? ""}`;
						},
						get ondelete() {
							return C(o);
						},
						get session() {
							return n.sessions[C(r)];
						},
						set session(e) {
							n.sessions[C(r)] = e;
						}
					});
				}
			});
			var s = Z(o, 2), c = P(s), l = Z(c, 2), f = Z(l, 2);
			W(s), B(() => {
				c.disabled = n.sessions.length >= 7, l.disabled = u.weeks.length >= 52, f.disabled = u.weeks.length <= 1;
			}), z("click", c, () => n.sessions.push(a())), z("click", l, () => g(C(i) + 1, Re(n))), z("click", f, () => {
				u.weeks.splice(C(i), 1), Y(d, -1);
			}), T(e, r);
		};
		N(v, (e) => {
			C(d) === C(i) && e(b);
		}), W(o), B((e) => {
			Q(o, "aria-labelledby", `${r}-w${C(i) ?? ""}`), Q(c, "id", `${r}-w${C(i) ?? ""}`), Q(c, "aria-expanded", C(d) === C(i)), y(l, `Week ${C(i) + 1} `), y(p, `· ${e ?? ""}`), y(_, C(d) === C(i) ? "▾" : "▸");
		}, [() => h(n.sessions.length)]), z("click", c, () => Y(d, C(d) === C(i) ? -1 : C(i), !0)), T(e, o);
	});
	var M = Z(j, 2), ee = Z(M, 2), F = (e) => {
		var t = Rn(), n = U(t, !0);
		B(() => y(n, C(p))), T(e, t);
	};
	N(ee, (e) => {
		C(p) && e(F);
	});
	var I = Z(ee, 2);
	W(v), B(() => {
		y(w, n.mode === "edit" ? "Edit plan" : "New plan"), M.disabled = u.weeks.length >= 52, I.disabled = C(f);
	}), z("click", b, function(...e) {
		n.onback?.apply(this, e);
	}), mt(O, () => u.name, (e) => u.name = e), he(A, () => u.loop, (e) => u.loop = e), z("click", M, () => g(u.weeks.length, { sessions: [a()] })), z("click", I, _), T(e, v), X();
}
R(["click"]);
// src/lib/ui/PlanPicker.svelte
var Vn = $("<button type=\"button\" class=\"btn danger press\">Stop plan</button>"), Hn = $("<p class=\"msg\" role=\"status\"> </p>"), Un = $("<span role=\"img\" aria-label=\"In use\">🔒</span>"), Wn = $("<span class=\"mini svelte-1kupfy5\">Current</span>"), Gn = $("<a class=\"caption by svelte-1kupfy5\" target=\"_blank\" rel=\"noopener noreferrer\"> </a>"), Kn = $("<span class=\"caption by svelte-1kupfy5\"> </span>"), qn = $("<span class=\"ask svelte-1kupfy5\"> </span> <button type=\"button\" class=\"btn press\">Cancel</button> <button type=\"button\" class=\"btn danger press\">Delete</button>", 1), Jn = $("<button type=\"button\" class=\"btn danger press\">Delete</button>"), Yn = $("<button type=\"button\" class=\"btn press\" data-op=\"edit\">Edit</button> <!>", 1), Xn = $("<button type=\"button\" class=\"btn press\" data-op=\"copy\">Copy & edit</button> <!>", 1), Zn = $("<div class=\"acts svelte-1kupfy5\"><div class=\"stepper svelte-1kupfy5\" role=\"group\" aria-label=\"Start week\"><span class=\"lbl svelte-1kupfy5\" aria-hidden=\"true\">Start at week</span> <button type=\"button\" class=\"pm press\" aria-label=\"Earlier start week\">−</button> <output aria-live=\"polite\" class=\"svelte-1kupfy5\"> </output> <button type=\"button\" class=\"pm press\" aria-label=\"Later start week\">+</button></div> <button type=\"button\" class=\"btn primary press wide svelte-1kupfy5\">Start today</button> <!></div>"), Qn = $("<li class=\"svelte-1kupfy5\"><button type=\"button\" class=\"row svelte-1kupfy5\"><span class=\"name svelte-1kupfy5\"> <!> <!></span> <span class=\"caption\"> </span></button> <!> <!></li>"), $n = $("<button type=\"button\" class=\"btn press\" data-op=\"new\">New plan</button>"), er = $("<ul class=\"card svelte-1kupfy5\"></ul> <!>", 1), tr = $("<div class=\"picker svelte-1kupfy5\"><button type=\"button\" class=\"back-link press\"><span aria-hidden=\"true\">‹</span> Back</button> <h2 class=\"heading svelte-1kupfy5\"> </h2> <!> <!></div>");
function nr(e, n) {
	let r = oe();
	H(n, !0);
	let i = G(n, "people", 19, () => ({})), a = G(n, "reopen", 3, null), o = J(() => n.viewer?.person != null), s = K(null), c = K(null), l = K(null), u = K(1), d = K(!1), p = K(null), m, h, g = () => Oe("plans").then((e) => Y(s, e.plans, !0), (e) => Y(c, e, !0));
	we(async () => {
		a() || m.focus(), await g(), a() && (Y(l, a().id ?? null, !0), await Qe(), (h?.querySelector(`[data-op="${a().mode}"]`) ?? m)?.focus());
	});
	let _ = (e) => {
		try {
			return new URL(e).hostname.replace(/^www\./, "");
		} catch {
			return "Source";
		}
	};
	function v(e) {
		Y(l, C(l) === e.id ? null : e.id, !0), Y(u, e.id === n.current?.plan ? n.current.week ?? 1 : 1, !0), Y(p, null);
	}
	async function b(e, t, r) {
		Y(d, !0);
		let i = await It(e);
		Y(d, !1), Tt(i.error ?? (i.from && i.from !== f() ? `Starts tomorrow: today's run already counted for ${n.current?.name}` : t)), i.error || r();
	}
	let x = (e) => b({
		op: "start",
		person: n.person,
		plan: e.id,
		start_week: C(u)
	}, `Started ${e.name}`, n.onback), S = () => b({
		op: "stop",
		person: n.person
	}, "Plan stopped", n.onback), w = (e) => b({
		op: "delete",
		id: e.id
	}, `Deleted ${e.name}`, () => {
		Y(l, Y(p, null), !0), g();
	});
	var E = tr(), D = P(E);
	je(D, (e) => m = e, () => m);
	var O = Z(D, 2), k = U(O, !0), A = Z(O, 2), j = (e) => {
		var t = Vn();
		B(() => t.disabled = C(d)), z("click", t, S), T(e, t);
	};
	N(A, (e) => {
		n.current && e(j);
	});
	var M = Z(A, 2), ee = (e) => {
		var t = Hn(), n = U(t, !0);
		B(() => y(n, C(c) ? C(c).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), T(e, t);
	}, F = (e) => {
		var a = er(), c = t(a);
		q(c, 21, () => C(s), (e) => e.id, (e, r) => {
			let a = J(() => C(l) === C(r).id);
			var s = Qn(), c = P(s), f = P(c), m = P(f), h = Z(m), g = (e) => {
				var t = Un();
				T(e, t);
			};
			N(h, (e) => {
				C(r).used && e(g);
			});
			var b = Z(h, 2), S = (e) => {
				var t = Wn();
				T(e, t);
			};
			N(b, (e) => {
				C(r).id === n.current?.plan && e(S);
			}), W(f);
			var E = Z(f, 2), D = U(E, !0);
			W(c);
			var O = Z(c, 2), k = (e) => {
				var t = Gn(), n = U(t, !0);
				B((e) => {
					Q(t, "href", C(r).source), y(n, e);
				}, [() => _(C(r).source)]), T(e, t);
			}, A = (e) => {
				var t = Kn(), n = U(t);
				B(() => y(n, `by ${i()[C(r).by]?.name ?? C(r).by ?? ""}`)), T(e, t);
			};
			N(O, (e) => {
				C(r).source ? e(k) : C(r).by && e(A, 1);
			});
			var j = Z(O, 2), M = (e) => {
				var i = Zn(), a = P(i), s = Z(P(a), 2), c = Z(s, 2), l = U(c, !0), f = Z(c, 2);
				W(a);
				var m = Z(a, 2), h = Z(m, 2), g = (e) => {
					var i = Xn(), a = t(i), o = Z(a, 2), s = (e) => {
						var i = Yn(), a = t(i), o = Z(a, 2), s = (e) => {
							var n = qn(), i = t(n), a = U(i), o = Z(i, 2), s = Z(o, 2);
							B(() => {
								y(a, `Delete ${C(r).name ?? ""}?`), s.disabled = C(d);
							}), z("click", o, () => Y(p, null)), z("click", s, () => w(C(r))), T(e, n);
						}, c = (e) => {
							var t = Jn();
							z("click", t, () => Y(p, C(r).id, !0)), T(e, t);
						};
						N(o, (e) => {
							C(p) === C(r).id ? e(s) : e(c, -1);
						}), z("click", a, () => n.onbuild(C(r), "edit")), T(e, i);
					};
					N(o, (e) => {
						C(r).custom && !C(r).used && e(s);
					}), z("click", a, () => n.onbuild(C(r), "copy")), T(e, i);
				};
				N(h, (e) => {
					C(o) && e(g);
				}), W(i), B(() => {
					s.disabled = C(u) <= 1, y(l, C(u)), f.disabled = C(u) >= C(r).weeks.length, m.disabled = C(d);
				}), z("click", s, () => _e(u, -1)), z("click", f, () => _e(u)), z("click", m, () => x(C(r))), T(e, i);
			};
			N(j, (e) => {
				C(a) && e(M);
			}), W(s), B((e) => {
				Q(c, "aria-expanded", C(a)), y(m, `${C(r).name ?? ""} `), y(D, e);
			}, [() => se(C(r))]), z("click", c, () => v(C(r))), T(e, s);
		}), W(c);
		var f = Z(c, 2), m = (e) => {
			var t = $n();
			z("click", t, () => n.onbuild(null, "new")), T(e, t);
		};
		N(f, (e) => {
			C(o) && e(m);
		}), B(() => Q(c, "aria-labelledby", `${r}-t`)), T(e, a);
	};
	N(M, (e) => {
		C(s) ? e(F, -1) : e(ee);
	}), W(E), je(E, (e) => h = e, () => h), B(() => {
		Q(O, "id", `${r}-t`), y(k, n.current ? "Change plan" : "Choose a plan");
	}), z("click", D, function(...e) {
		n.onback?.apply(this, e);
	}), T(e, E), X();
}
R(["click"]);
// src/lib/gesture.js
var rr = (e, t = .998) => e / 1e3 * t / (1 - t), ir = (e, t, n) => e + rr(t) > n / 2;
function ar(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var or = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), sr = $("<h2 class=\"svelte-9pi54v\"> </h2> <button type=\"button\" class=\"close press svelte-9pi54v\" aria-label=\"Close\">✕</button>", 1), cr = $("<div class=\"grab drag svelte-9pi54v\"><!></div>"), lr = $("<div class=\"grab svelte-9pi54v\"><!></div>"), ur = $("<dialog><!> <div class=\"body svelte-9pi54v\"><!></div></dialog>");
function dr(e, n) {
	let i = oe();
	H(n, !0);
	let a = (e) => {
		var r = sr(), a = t(r), o = U(a, !0), s = Z(a, 2);
		B(() => {
			Q(a, "id", `${i}-t`), y(o, n.title);
		}), z("click", s, () => u.close()), T(e, r);
	}, o = G(n, "drag", 3, !1), s = G(n, "wide", 3, !1), c = G(n, "onclose", 3, null), u, f, p = K(0), m = null, g = K(!1), _ = !1, v = !1;
	function b() {
		return u.open ? null : (_ = document.documentElement.style.overflow !== "hidden", _ && (document.documentElement.style.overflow = "hidden"), u.showModal(), f);
	}
	function x() {
		u.close();
	}
	function S() {
		_ && (document.documentElement.style.overflow = ""), _ = !1, Y(p, 0), c()?.();
	}
	function w(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), m = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, Y(g, !0));
	}
	function E(e) {
		m && (Y(p, Math.max(0, e.clientY - m.start), !0), m.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), m.samples.length > 8 && m.samples.shift());
	}
	function D(e) {
		if (!m) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = ar([...m.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		m = null, Y(g, !1), ir(C(p), n, u.offsetHeight) ? u.close() : Y(p, 0);
	}
	var O = {
		show: b,
		close: x
	}, k = ur();
	let A, j;
	var M = P(k), ee = (e) => {
		var t = cr(), n = P(t);
		a(n), W(t), z("pointerdown", t, w), z("pointermove", t, E), z("pointerup", t, D), h("pointercancel", t, D), T(e, t);
	}, F = (e) => {
		var t = lr(), n = P(t);
		a(n), W(t), T(e, t);
	};
	N(M, (e) => {
		o() ? e(ee) : e(F, -1);
	});
	var I = Z(M, 2), te = P(I);
	return r(te, () => n.children), W(I), je(I, (e) => f = e, () => f), W(k), je(k, (e) => u = e, () => u), B(() => {
		Q(k, "aria-labelledby", `${i}-t`), A = l(k, 1, "svelte-9pi54v", null, A, {
			wide: s(),
			dragging: C(g)
		}), j = d(k, "", j, { transform: C(p) ? `translateY(${C(p)}px)` : null });
	}), z("pointerdown", k, (e) => v = e.target === u), z("click", k, (e) => e.target === u && v && u.close()), h("close", k, S), z("keydown", k, (e) => e.key === "Escape" && e.stopPropagation()), T(e, k), X(O);
}
R([
	"click",
	"pointerdown",
	"keydown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/RecordsDialog.svelte
var fr = $("<li class=\"svelte-18znx9k\"><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), pr = $("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1);
function mr(e, n) {
	H(n, !0);
	let r;
	function i(e = null) {
		let t = r.show();
		t && (t.scrollTop = 0, e && t.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	var a = { open: i };
	return je(dr(e, {
		title: "All records",
		drag: !0,
		children: (e, r) => {
			var i = I(), a = t(i);
			q(a, 17, () => n.groups, (e) => e.group, (e, n) => {
				var r = pr(), i = t(r), a = U(i, !0), o = Z(i, 2);
				q(o, 21, () => C(n).lifts, (e) => e.id, (e, t) => {
					var n = fr(), r = P(n), i = P(r), a = Z(i), o = U(a, !0), s = Z(a);
					W(r), W(n), B((e, n) => {
						y(i, `${C(t).name ?? ""} · `), y(o, e), y(s, ` · ${n ?? ""}`);
					}, [() => M(C(t)), () => $e(C(t).date)]), T(e, n);
				}), W(o), B(() => {
					Q(i, "data-group", C(n).group), y(a, C(n).group);
				}), T(e, r);
			}), T(e, i);
		},
		$$slots: { default: !0 }
	}), (e) => r = e, () => r), X(a);
}
// src/lib/ui/StepBars.svelte
var hr = $("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), gr = $("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), _r = $("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function vr(e, t) {
	H(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), r = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var i = _r(), a = P(i);
	q(a, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = hr();
		let i;
		var a = P(n), o = P(a);
		let s, c;
		W(a);
		var u = Z(a, 2), f = U(u, !0);
		W(n), B((e) => {
			Q(n, "aria-label", e), Q(n, "aria-hidden", C(t).future ? "true" : void 0), Q(n, "aria-current", C(t).isToday ? "date" : void 0), i = l(n, 1, "svelte-1f099m", null, i, { today: C(t).isToday }), s = l(o, 1, "svelte-1f099m", null, s, {
				active: C(t).active,
				future: C(t).future
			}), c = d(o, "", c, { height: `${C(t).frac * 100}%` }), y(f, C(t).label);
		}, [() => C(t).future ? void 0 : r(C(t))]), T(e, n);
	}), W(a);
	var o = Z(a, 2), s = (e) => {
		var n = gr();
		let r;
		B(() => r = d(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), T(e, n);
	};
	N(o, (e) => {
		t.goalFrac !== null && e(s);
	}), W(i), T(e, i), X();
}
// src/lib/ui/Progress.svelte
var yr = $("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), br = $("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), xr = $("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), Sr = $("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), Cr = $("<span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span>", 1), wr = $("<button type=\"button\" class=\"row svelte-kr1x1f\"><!></button>"), Tr = $("<div class=\"row svelte-kr1x1f\"><!></div>"), Er = $("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), Dr = $("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function Or(e, n) {
	H(n, !0);
	let r = J(() => n.person.week.goal.steps ?? 0), a = J(() => xe(n.person.steps_week, C(r), f())), o = J(() => n.person.pbs.lifts ?? []), s = J(() => A(C(o))), c, l = J(() => n.person.pbs.fastest_1k), u = J(() => n.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var d = Dr(), p = t(d), m = (e) => {
		var t = yr(), n = P(t);
		vr(n, {
			get bars() {
				return C(a).bars;
			},
			get goalFrac() {
				return C(a).goalFrac;
			}
		});
		var r = Z(n, 2), i = U(r, !0);
		W(t), B((e) => y(i, e), [() => qe(C(a).bars)]), T(e, t);
	};
	N(p, (e) => {
		C(a) && e(m);
	});
	var h = Z(p, 2), g = P(h), _ = (e) => {
		var n = xr(), r = t(n);
		q(r, 21, () => C(s), (e) => e.group, (e, t) => {
			var n = br(), r = P(n), i = P(r), a = U(i, !0), o = Z(i), s = P(o), l = Z(s), u = U(l, !0);
			W(o), W(r), W(n), B((e) => {
				y(a, C(t).group), y(s, `${C(t).lift.name ?? ""} · `), y(u, e);
			}, [() => M(C(t).lift)]), z("click", r, () => c.open(C(t).group)), T(e, n);
		}), W(r);
		var i = Z(r, 2), a = U(i);
		B(() => y(a, `All records (${C(o).length ?? ""})`)), z("click", i, () => c.open()), T(e, n);
	}, v = (e) => {
		var t = Sr();
		T(e, t);
	};
	N(g, (e) => {
		C(o).length ? e(_) : e(v, -1);
	}), W(h);
	var b = Z(h, 2), x = P(b), S = (e) => {
		let r = (e) => {
			var n = Cr(), r = Z(t(n), 2), a = U(r);
			B((e, t) => y(a, `${e ?? ""} · ${t ?? ""}`), [() => i(C(l).seconds), () => $e(C(l).date)]), T(e, n);
		};
		var a = I(), o = t(a), s = (e) => {
			var t = wr(), i = P(t);
			r(i), W(t), z("click", t, () => n.onopen({ key: C(l).key })), T(e, t);
		}, c = (e) => {
			var t = Tr(), n = P(t);
			r(n), W(t), T(e, t);
		};
		N(o, (e) => {
			C(l).key ? e(s) : e(c, -1);
		}), T(e, a);
	}, w = (e) => {
		var t = Er();
		T(e, t);
	};
	N(x, (e) => {
		C(l) ? e(S) : e(w, -1);
	});
	var E = Z(x, 2), D = Z(P(E)), O = U(D);
	W(E);
	var k = Z(E, 2), j = Z(P(k)), ee = U(j);
	W(k), W(b);
	var F = Z(b, 2);
	{
		let e = J(() => Fe(C(o)));
		je(mr(F, { get groups() {
			return C(e);
		} }), (e) => c = e, () => c);
	}
	B((e) => {
		y(O, `${e ?? ""} km`), y(ee, `${C(u) ?? ""} t`);
	}, [() => n.person.pbs.longest_session_km.toFixed(1)]), T(e, d), X();
}
R(["click"]);
// src/lib/ui/Shoes.svelte
var kr = $("<span class=\"label svelte-eu7fja\"> </span>"), Ar = $("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), jr = $("<ul class=\"card svelte-eu7fja\"></ul>");
function Mr(e, t) {
	H(t, !0);
	let n = J(() => t.shoes.map(rt));
	var r = jr();
	q(r, 23, () => C(n), (e, n) => t.shoes[n].id, (e, t) => {
		var n = Ar(), r = P(n), i = P(r), a = U(i, !0), o = Z(i), s = U(o, !0);
		W(r);
		var c = Z(r, 2), u = P(c);
		let f;
		W(c);
		var p = Z(c, 2), m = P(p), h = U(m, !0), g = Z(m, 2), _ = (e) => {
			var n = kr(), r = U(n, !0);
			B(() => y(r, C(t).label)), T(e, n);
		};
		N(g, (e) => {
			C(t).label && e(_);
		}), W(p), W(n), B(() => {
			l(n, 1, j(C(t).state), "svelte-eu7fja"), y(a, C(t).name), y(s, C(t).km), f = d(u, "", f, { width: `${C(t).frac * 100}%` }), y(h, C(t).detail);
		}), T(e, n);
	}), W(r), T(e, r), X();
}
// src/lib/ui/ShoesDialog.svelte
var Nr = $("<span class=\"mini svelte-1bogt6u\">Current</span>"), Pr = $("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Fr = $("<button type=\"button\" class=\"btn\">Set current</button>"), Ir = $("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Lr = $("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), Rr = $("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe until you set one.</p>"), zr = $("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), Br = $("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), Vr = $("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), Hr = $("<!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form>", 1);
function Ur(n, r) {
	H(r, !0);
	let i = J(() => r.shoes.map((e) => ({
		...rt(e),
		id: e.id,
		limit: e.limit,
		current: !!e.current
	}))), a, o = K(""), s = K(We(700)), c = K(null), l = K(!1), u = K(null);
	function d() {
		a.show();
	}
	function f() {
		Y(u, null), Y(c, null);
	}
	async function p(e) {
		Y(l, !0);
		let t = await Nt(e);
		return Y(l, !1), t;
	}
	async function m(t) {
		t.preventDefault();
		let n = e(C(o), C(s));
		Y(c, n.error ?? null, !0), !C(c) && await p({
			op: "add",
			person: r.person,
			...n
		}) && Y(o, "");
	}
	async function g(t, n) {
		let r = e(void 0, t.currentTarget.value, { partial: !0 });
		Y(c, r.error ?? null, !0), C(c) ? t.currentTarget.value = n.limit : r.replace_at_km !== n.limit && await p({
			op: "update",
			id: n.id,
			...r
		});
	}
	async function _(e) {
		Y(u, null), await p({
			op: "retire",
			id: e.id
		});
	}
	var v = { open: d };
	return je(dr(n, {
		title: "Manage shoes",
		onclose: f,
		children: (e, n) => {
			var a = Hr(), d = t(a), f = (e) => {
				var n = zr(), a = t(n);
				q(a, 21, () => C(i), (e) => e.id, (e, n) => {
					var i = Lr(), a = P(i), o = P(a), s = P(o, !0), c = Z(s), d = (e) => {
						var t = Nr();
						T(e, t);
					};
					N(c, (e) => {
						C(n).current && e(d);
					}), W(o);
					var f = Z(o, 2), m = U(f, !0);
					W(a);
					var h = Z(a, 2), v = P(h), b = Z(P(v));
					V(b), Ce(), W(v);
					var x = Z(v, 2), S = (e) => {
						var r = Pr(), i = t(r), a = U(i), o = Z(i, 2), s = Z(o, 2);
						B(() => {
							y(a, `Retire ${C(n).name ?? ""}?`), s.disabled = C(l);
						}), z("click", o, () => Y(u, null)), z("click", s, () => _(C(n))), T(e, r);
					}, w = (e) => {
						var i = Ir(), a = t(i), o = (e) => {
							var t = Fr();
							B(() => t.disabled = C(l)), z("click", t, () => p({
								op: "current",
								person: r.person,
								id: C(n).id
							})), T(e, t);
						};
						N(a, (e) => {
							C(n).current || e(o);
						});
						var s = Z(a, 2);
						B(() => s.disabled = C(l)), z("click", s, () => Y(u, C(n).id, !0)), T(e, i);
					};
					N(x, (e) => {
						C(u) === C(n).id ? e(S) : e(w, -1);
					}), W(h), W(i), B(() => {
						y(s, C(n).name), y(m, C(n).km), Q(b, "min", Ae.replace_at_km[0]), Q(b, "max", Ae.replace_at_km[1]), Q(b, "step", Ae.replace_at_km[2]), ne(b, C(n).limit), b.disabled = C(l);
					}), z("change", b, (e) => g(e, C(n))), T(e, i);
				}), W(a);
				var o = Z(a, 2), s = (e) => {
					var t = Rr();
					T(e, t);
				}, c = J(() => !C(i).some((e) => e.current));
				N(o, (e) => {
					C(c) && e(s);
				}), T(e, n);
			}, v = (e) => {
				var t = Br();
				T(e, t);
			};
			N(d, (e) => {
				C(i).length ? e(f) : e(v, -1);
			});
			var b = Z(d, 2), x = Z(P(b), 2), S = Z(P(x));
			V(S), W(x);
			var w = Z(x, 2), E = Z(P(w));
			V(E), W(w);
			var D = Z(w, 2), O = (e) => {
				var t = Vr(), n = U(t, !0);
				B(() => y(n, C(c))), T(e, t);
			};
			N(D, (e) => {
				C(c) && e(O);
			});
			var k = Z(D, 2);
			W(b), B(() => {
				Q(S, "maxlength", Ae.name[1]), S.disabled = C(l), Q(E, "min", Ae.replace_at_km[0]), Q(E, "max", Ae.replace_at_km[1]), Q(E, "step", Ae.replace_at_km[2]), E.disabled = C(l), k.disabled = C(l);
			}), h("submit", b, m), mt(S, () => C(o), (e) => Y(o, e)), mt(E, () => C(s), (e) => Y(s, e)), T(e, a);
		},
		$$slots: { default: !0 }
	}), (e) => a = e, () => a), X(v);
}
R(["change", "click"]);
// src/lib/ui/WorkoutDialog.svelte
var Wr = $("<p class=\"msg\" role=\"status\"> </p>"), Gr = $("<p class=\"msg\" role=\"status\">Loading…</p>"), Kr = $("<span class=\"mini svelte-1uaoa1p\"> </span>"), qr = $("<span class=\"mini off svelte-1uaoa1p\"> </span>"), Jr = $("<div><dt class=\"svelte-1uaoa1p\"> </dt><dd class=\"svelte-1uaoa1p\"> </dd></div>"), Yr = $("<option disabled=\"\"> </option>"), Xr = $("<option> </option>"), Zr = $("<div class=\"shoe svelte-1uaoa1p\"><dt class=\"svelte-1uaoa1p\"><label>Shoe</label></dt><dd class=\"svelte-1uaoa1p\"><select class=\"svelte-1uaoa1p\"><!><!></select></dd></div>"), Qr = $("<dl class=\"svelte-1uaoa1p\"><!> <!></dl>"), $r = $("<p class=\"caption note svelte-1uaoa1p\"> </p>"), ei = $("<p> </p>"), ti = $("<p class=\"check svelte-1uaoa1p\"> </p>"), ni = $("<button type=\"button\">Not a run…</button>"), ri = $("<select aria-label=\"Change the type to\" class=\"svelte-1uaoa1p\"><option disabled=\"\">Choose a type</option><!><!></select>"), ii = $("<button type=\"button\" class=\"link svelte-1uaoa1p\">Clear decision</button>"), ai = $("<div class=\"acts review svelte-1uaoa1p\"><button type=\"button\">Counts for the plan day</button> <button type=\"button\">A run, not the programme</button> <!> <!> <!></div>"), oi = $("<h3 class=\"svelte-1uaoa1p\">Programme</h3> <!> <!>", 1), si = $("<p class=\"caption note svelte-1uaoa1p\">Map unavailable</p>"), ci = $("<div class=\"ph svelte-1uaoa1p\" aria-hidden=\"true\"></div>"), li = $("<h3 class=\"svelte-1uaoa1p\"> </h3> <!>", 1), ui = $("<!> <!>", 1), di = $("<li class=\"svelte-1uaoa1p\"><span class=\"zn svelte-1uaoa1p\"> <small class=\"svelte-1uaoa1p\"> </small></span> <span class=\"bar svelte-1uaoa1p\"><span class=\"svelte-1uaoa1p\"></span></span> <span class=\"num svelte-1uaoa1p\"> </span></li>"), fi = $("<h3 class=\"svelte-1uaoa1p\">Heart-rate zones</h3> <ul class=\"zones svelte-1uaoa1p\"></ul>", 1), pi = $("<tr><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td></tr>"), mi = $("<h3 class=\"svelte-1uaoa1p\">Splits</h3> <table class=\"svelte-1uaoa1p\"><thead><tr><th class=\"svelte-1uaoa1p\">Km</th><th class=\"svelte-1uaoa1p\">Time</th><th class=\"svelte-1uaoa1p\"> </th><th class=\"svelte-1uaoa1p\">HR</th><th class=\"svelte-1uaoa1p\">Climb</th></tr></thead><tbody></tbody></table>", 1), hi = $("<span role=\"img\" aria-label=\"Record\">🏆</span>"), gi = $("<li class=\"svelte-1uaoa1p\"> <b class=\"svelte-1uaoa1p\"> </b><!></li>"), _i = $("<h3 class=\"svelte-1uaoa1p\">Exercises</h3> <ul class=\"gym svelte-1uaoa1p\"><!> <li class=\"vol svelte-1uaoa1p\">Total volume · <b class=\"svelte-1uaoa1p\"> </b></li></ul>", 1), vi = $("<span class=\"ask svelte-1uaoa1p\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1uaoa1p\">Delete</button>", 1), yi = $("<button type=\"button\"> </button>"), bi = $("<div class=\"acts svelte-1uaoa1p\"><!></div>"), xi = $("<p class=\"sub svelte-1uaoa1p\"> <!> <!></p> <!> <!> <!> <!> <!> <!> <!> <!>", 1);
function Si(e, n) {
	let r = oe();
	H(n, !0);
	let i = G(n, "shoes", 3, null), a = G(n, "reviewTypes", 19, () => ({})), o = () => import("./viz-CG7V1LzT.js"), s, c = K(null), u = K(null), f = K(null), p = K(null), m = K(null), h = K(!1), g = K(!1), _ = 0;
	async function v(e) {
		let t = s.show();
		if (!t) return;
		let r = ++_;
		Y(c, e), Y(u, Y(f, Y(m, null))), Y(h, Y(g, !1), !0), t.scrollTop = 0;
		try {
			let t = await Oe(`workout?person=${encodeURIComponent(n.person)}&key=${encodeURIComponent(e.key)}`);
			if (r !== _) return;
			Y(u, t), (t.route?.length || t.series) && !C(p) && o().then((e) => Y(p, e), (e) => r === _ && Y(m, e));
		} catch (e) {
			r === _ && Y(f, e);
		}
	}
	function b() {
		_++, Y(c, Y(u, null));
	}
	let x = J(() => C(c) && `${n.person}/${C(c).key}`), S = J(() => C(x) && _t[C(x)]), w = J(() => {
		if (!C(c)) return null;
		let e = n.feed.find((e) => e.key === C(c).key) ?? {
			...C(u)?.summary,
			...C(c),
			excluded: vt[C(x)] ?? C(c).excluded ?? !1
		};
		return C(S) && C(S).want !== null ? {
			...e,
			excluded: C(S).want
		} : e;
	}), E = J(() => C(u) && C(w) ? Me(n.viewer, n.person, C(w)) : {
		remove: null,
		shoe: !1
	}), O = J(() => C(E).shoe && i() ? Te(i(), n.runShoes?.[C(c).key]) : null), k = J(() => C(u) && et(C(u).summary)), A = J(() => C(u) ? ge(C(u)).filter(([e]) => !(e === "Shoe" && C(O)?.options.length)) : []), j = J(() => C(u) && Ue(C(u))), M = J(() => C(u) && Ee(C(u).zones, C(u).max_hr)), ee = J(() => C(u) ? Se(C(u)) : []), F = J(() => C(u) && Ke(C(u).gym)), te = J(() => C(u) && it(C(u))), ne = J(() => C(w)?.check ?? null), L = J(() => C(w)?.review ?? null), ie = J(() => a()[C(w)?.source] ?? []), R = J(() => C(w)?.km && C(w).minutes ? C(w).km / (C(w).minutes / 60) : null), ae = (e) => e.status === 404 ? "Workout not found" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant";
	async function se(e) {
		let t = e.currentTarget;
		await Ft(n.person, C(c).key, Number(t.value)) || (t.value = String(C(O).value));
	}
	let ce = (e, t = null, r = "") => Pt(n.person, C(c).key, e, t, r);
	async function le(e) {
		let t = e.currentTarget.value;
		await ce("type", t, C(ie).find((e) => e.match === t)?.name ?? t);
	}
	let ue = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function de() {
		C(E).remove === "delete" ? Y(h, !0) : At(n.person, C(c).key, C(E).remove);
	}
	var fe = { open: v };
	{
		let i = J(() => C(k)?.title ?? C(c)?.name ?? "Workout");
		je(dr(e, {
			get title() {
				return C(i);
			},
			drag: !0,
			wide: !0,
			onclose: b,
			children: (e, i) => {
				var a = I(), o = t(a), _ = (e) => {
					var t = Wr(), n = U(t, !0);
					B((e) => y(n, e), [() => ae(C(f))]), T(e, t);
				}, v = (e) => {
					var t = Gr();
					T(e, t);
				}, b = (e) => {
					var i = xi(), a = t(i), o = P(a), f = Z(o), _ = (e) => {
						var t = Kr(), n = U(t, !0);
						B(() => y(n, C(k).plan)), T(e, t);
					};
					N(f, (e) => {
						C(k).plan && e(_);
					});
					var v = Z(f, 2), b = (e) => {
						var t = qr(), n = U(t, !0);
						B((e) => y(n, e), [() => ut(C(w)).label]), T(e, t);
					}, x = J(() => C(w) && ut(C(w)).label);
					N(v, (e) => {
						C(x) && e(b);
					}), W(a);
					var ae = Z(a, 2), oe = (e) => {
						var t = Qr(), n = P(t);
						q(n, 17, () => C(A), ([e, t]) => e, (e, t) => {
							var n = J(() => Ve(C(t), 2));
							let r = () => C(n)[0], i = () => C(n)[1];
							var a = Jr(), o = P(a), s = U(o, !0), c = Z(o), l = U(c, !0);
							W(a), B(() => {
								y(s, r()), y(l, i());
							}), T(e, a);
						});
						var i = Z(n, 2), a = (e) => {
							var t = Zr(), n = P(t), i = U(n), a = Z(n), o = P(a), s = P(o), c = (e) => {
								var t = Yr(), n = U(t, !0);
								t.value = t.__value = "", B(() => y(n, C(O).extra)), T(e, t);
							};
							N(s, (e) => {
								C(O).extra && e(c);
							});
							var l = Z(s);
							q(l, 17, () => C(O).options, (e) => e.id, (e, t) => {
								var n = Xr(), r = U(n, !0), i = {};
								B(() => {
									y(r, C(t).label), i !== (i = C(t).id) && (n.value = (n.__value = i) ?? "");
								}), T(e, n);
							}), W(o);
							var u;
							dt(o), W(a), W(t), B(() => {
								Q(i, "for", `${r}-shoe`), Q(o, "id", `${r}-shoe`), u !== (u = C(O).value) && (o.value = (o.__value = u) ?? "", re(o, u));
							}), z("change", o, se), T(e, t);
						};
						N(i, (e) => {
							C(O)?.options.length && e(a);
						}), W(t), T(e, t);
					};
					N(ae, (e) => {
						(C(A).length || C(O)?.options.length) && e(oe);
					});
					var fe = Z(ae, 2), pe = (e) => {
						var t = $r(), n = U(t, !0);
						B((e) => y(n, e), [() => be(C(u).note)]), T(e, t);
					}, me = J(() => be(C(u).note));
					N(fe, (e) => {
						C(me) && e(pe);
					});
					var he = Z(fe, 2), ge = (e) => {
						var n = oi(), r = Z(t(n), 2), i = (e) => {
							var t = ei();
							let n;
							var r = U(t, !0);
							B((e) => {
								n = l(t, 1, "check svelte-1uaoa1p", null, n, { warn: C(w).needs_review }), y(r, e);
							}, [() => De(C(ne), C(R), C(w).km)]), T(e, t);
						}, a = (e) => {
							var t = ti(), n = U(t);
							B((e) => y(n, `Changed to ${e ?? ""}`), [() => C(ie).find((e) => e.match === C(L).type_match)?.name ?? C(L).type_match]), T(e, t);
						};
						N(r, (e) => {
							C(ne) ? e(i) : C(L).decision === "type" && e(a, 1);
						});
						var o = Z(r, 2), s = (e) => {
							var t = ai(), n = P(t);
							let r;
							var i = Z(n, 2);
							let a;
							var o = Z(i, 2), s = (e) => {
								var t = ni();
								let n;
								B(() => {
									n = l(t, 1, "btn svelte-1uaoa1p", null, n, { on: C(L)?.decision === "type" }), Q(t, "aria-pressed", C(L)?.decision === "type");
								}), z("click", t, () => Y(g, !C(g))), T(e, t);
							};
							N(o, (e) => {
								C(ie).length && e(s);
							});
							var c = Z(o, 2), u = (e) => {
								var t = ri(), n = P(t);
								n.value = n.__value = "";
								var r = Z(n), i = (e) => {
									var t = Xr(), n = U(t, !0), r = {};
									B(() => {
										y(n, C(L).type_match), r !== (r = C(L).type_match) && (t.value = (t.__value = r) ?? "");
									}), T(e, t);
								}, a = J(() => C(L)?.type_match && !C(ie).some((e) => e.match === C(L).type_match));
								N(r, (e) => {
									C(a) && e(i);
								});
								var o = Z(r);
								q(o, 17, () => C(ie), (e) => e.match, (e, t) => {
									var n = Xr(), r = U(n, !0), i = {};
									B(() => {
										y(r, C(t).name), i !== (i = C(t).match) && (n.value = (n.__value = i) ?? "");
									}), T(e, n);
								}), W(t);
								var s;
								dt(t), B(() => {
									s !== (s = C(L)?.decision === "type" ? C(L).type_match : "") && (t.value = (t.__value = s) ?? "", re(t, s));
								}), z("change", t, le), T(e, t);
							};
							N(c, (e) => {
								(C(g) || C(L)?.decision === "type") && e(u);
							});
							var d = Z(c, 2), f = (e) => {
								var t = ii();
								z("click", t, () => ce(null)), T(e, t);
							};
							N(d, (e) => {
								C(L) && e(f);
							}), W(t), B(() => {
								r = l(n, 1, "btn svelte-1uaoa1p", null, r, { on: C(L)?.decision === "plan" }), Q(n, "aria-pressed", C(L)?.decision === "plan"), a = l(i, 1, "btn svelte-1uaoa1p", null, a, { on: C(L)?.decision === "run" }), Q(i, "aria-pressed", C(L)?.decision === "run");
							}), z("click", n, () => ce("plan", null, C(ne)?.label ?? "the plan day")), z("click", i, () => ce("run")), T(e, t);
						};
						N(o, (e) => {
							C(E).remove !== null && (C(w).needs_review || C(L)) && e(s);
						}), T(e, n);
					};
					N(he, (e) => {
						(C(ne) || C(L)) && e(ge);
					});
					var _e = Z(he, 2), ve = (e) => {
						var n = I(), r = t(n), i = (e) => {
							var t = si();
							T(e, t);
						}, a = (e) => {
							var t = ci();
							let n;
							B(() => n = d(t, "", n, { height: `${C(u).route?.length ? 220 : 0}px` })), T(e, t);
						}, o = (e) => {
							var n = ui(), r = t(n), i = (e) => {
								var n = I(), r = t(n);
								{
									let e = J(() => Le(C(u)) ? "run" : "gym");
									Ie(r, () => C(p).MapView, (t, n) => {
										n(t, {
											get route() {
												return C(u).route;
											},
											get kind() {
												return C(e);
											}
										});
									});
								}
								T(e, n);
							};
							N(r, (e) => {
								C(u).route?.length && e(i);
							});
							var a = Z(r, 2);
							q(a, 17, () => C(j)?.list ?? [], (e) => e.label, (e, n) => {
								var r = li(), i = t(r), a = U(i, !0), o = Z(i, 2);
								Ie(o, () => C(p).Chart, (e, t) => {
									t(e, {
										get x() {
											return C(j).x;
										},
										get label() {
											return C(n).label;
										},
										get values() {
											return C(n).values;
										},
										get color() {
											return C(n).color;
										},
										get fmt() {
											return C(n).fmt;
										}
									});
								}), B(() => y(a, C(n).label)), T(e, r);
							}), T(e, n);
						};
						N(r, (e) => {
							C(m) ? e(i) : C(p) ? e(o, -1) : e(a, 1);
						}), T(e, n);
					};
					N(_e, (e) => {
						(C(u).route?.length || C(j)?.list.length) && e(ve);
					});
					var ye = Z(_e, 2), V = (e) => {
						var n = fi(), r = Z(t(n), 2);
						q(r, 21, () => C(M), (e) => e.zone, (e, t) => {
							var n = di(), r = P(n), i = P(r), a = Z(i), o = U(a, !0);
							W(r);
							var s = Z(r, 2), c = P(s);
							let l;
							W(s);
							var u = Z(s, 2), f = U(u);
							W(n), B(() => {
								y(i, `${C(t).zone ?? ""} `), y(o, C(t).bpm), l = d(c, "", l, { width: `${C(t).pct ?? ""}%` }), y(f, `${C(t).time ?? ""} · ${C(t).pct ?? ""}%`);
							}), T(e, n);
						}), W(r), T(e, n);
					};
					N(ye, (e) => {
						C(M) && e(V);
					});
					var H = Z(ye, 2), xe = (e) => {
						var n = mi(), r = Z(t(n), 2), i = P(r), a = P(i), o = Z(P(a), 2), s = U(o, !0);
						Ce(2), W(a), W(i);
						var c = Z(i);
						q(c, 21, () => C(ee), D, (e, t) => {
							var n = pi(), r = P(n), i = U(r, !0), a = Z(r), o = U(a, !0), s = Z(a), c = U(s, !0), l = Z(s), u = U(l, !0), d = Z(l), f = U(d, !0);
							W(n), B(() => {
								y(i, C(t).km), y(o, C(t).time), y(c, C(t).pace), y(u, C(t).hr), y(f, C(t).climb);
							}), T(e, n);
						}), W(c), W(r), B(() => y(s, C(te) ? "km/h" : "Pace")), T(e, n);
					};
					N(H, (e) => {
						C(ee).length && e(xe);
					});
					var Se = Z(H, 2), we = (e) => {
						var n = _i(), r = Z(t(n), 2), i = P(r);
						q(i, 17, () => C(F).exercises, D, (e, t) => {
							var n = gi(), r = P(n), i = Z(r), a = U(i, !0), o = Z(i), s = (e) => {
								var t = hi();
								T(e, t);
							};
							N(o, (e) => {
								C(t).record && e(s);
							}), W(n), B(() => {
								y(r, `${C(t).name ?? ""} · `), y(a, C(t).set);
							}), T(e, n);
						});
						var a = Z(i, 2), o = Z(P(a)), s = U(o, !0);
						W(a), W(r), B(() => y(s, C(F).volume)), T(e, n);
					};
					N(Se, (e) => {
						C(F) && e(we);
					});
					var Te = Z(Se, 2), Ee = (e) => {
						var r = bi(), i = P(r), a = (e) => {
							var r = vi(), i = Z(t(r), 2), a = Z(i, 2);
							z("click", i, () => Y(h, !1)), z("click", a, () => (At(n.person, C(c).key, "remove"), s.close())), T(e, r);
						}, o = (e) => {
							var t = yi();
							let n;
							var r = U(t, !0);
							B(() => {
								n = l(t, 1, "btn svelte-1uaoa1p", null, n, { danger: C(E).remove !== "restore" }), y(r, ue[C(E).remove]);
							}), z("click", t, de), T(e, t);
						};
						N(i, (e) => {
							C(h) ? e(a) : e(o, -1);
						}), W(r), T(e, r);
					};
					N(Te, (e) => {
						C(E).remove && C(S)?.want !== null && e(Ee);
					}), B(() => y(o, `${C(k).date ?? ""} · ${C(k).time ?? ""} · ${C(k).duration ?? ""} `)), T(e, i);
				};
				N(o, (e) => {
					C(f) ? e(_) : C(u) ? e(b, -1) : e(v, 1);
				}), T(e, a);
			},
			$$slots: { default: !0 }
		}), (e) => s = e, () => s);
	}
	return X(fe);
}
R(["change", "click"]);
// src/lib/ui/Details.svelte
var Ci = $("<button type=\"button\" class=\"btn choose press svelte-1341oik\">Choose a plan</button>"), wi = $("<section><h2 class=\"heading svelte-1341oik\">Plan</h2> <!></section>"), Ti = $("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), Ei = $("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), Di = $("<section><h2 class=\"heading svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), Oi = $("<!> <section><h2 class=\"heading svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"heading svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"heading svelte-1341oik\">Progress</h2> <!></section> <!> <!> <!>", 1);
function ki(e, n) {
	let r = oe();
	H(n, !0);
	let i = G(n, "people", 19, () => ({})), a = G(n, "connect", 3, null), o = G(n, "reviewTypes", 19, () => ({})), s = J(() => S(n.person.pbs)), c = J(() => Ge(n.person, n.canEdit)), l = K(void 0), u = K(void 0), d = (e) => C(u).open(e), f = K(null), p = K(void 0);
	async function m() {
		Y(f, null), await Qe(), C(p)?.querySelector("button")?.focus();
	}
	var h = I(), g = t(h), _ = (e) => {
		{
			let t = J(() => C(f).reopen ?? null);
			nr(e, {
				get person() {
					return n.id;
				},
				get current() {
					return n.person.plan;
				},
				get viewer() {
					return n.viewer;
				},
				get people() {
					return i();
				},
				get reopen() {
					return C(t);
				},
				onback: m,
				onbuild: (e, t) => Y(f, {
					from: e,
					mode: t
				}, !0)
			});
		}
	}, v = (e) => {
		Bn(e, {
			get from() {
				return C(f).from;
			},
			get mode() {
				return C(f).mode;
			},
			onback: () => Y(f, {
				pick: !0,
				reopen: {
					id: C(f).from?.id,
					mode: C(f).mode
				}
			}, !0)
		});
	}, b = (e) => {
		var i = Oi(), m = t(i), h = (e) => {
			var t = wi(), i = P(t), a = Z(i, 2), o = (e) => {
				wn(e, {
					get plan() {
						return n.person.plan;
					},
					get canEdit() {
						return n.canEdit;
					},
					onchange: () => Y(f, { pick: !0 }, !0)
				});
			}, s = (e) => {
				var t = Ci();
				z("click", t, () => Y(f, { pick: !0 }, !0)), T(e, t);
			};
			N(a, (e) => {
				n.person.plan ? e(o) : e(s, -1);
			}), W(t), je(t, (e) => Y(p, e), () => C(p)), B(() => {
				Q(t, "aria-labelledby", `${r}-plan`), Q(i, "id", `${r}-plan`);
			}), T(e, t);
		};
		N(m, (e) => {
			(n.person.plan || n.canEdit) && e(h);
		});
		var g = Z(m, 2), _ = P(g), v = Z(_, 2);
		k(v, () => n.id, (e) => {
			hn(e, {
				get person() {
					return n.id;
				},
				get items() {
					return n.person.feed;
				},
				get records() {
					return C(s);
				},
				onopen: d
			});
		}), W(g);
		var b = Z(g, 2), x = P(b), S = Z(P(x)), w = U(S);
		W(x), $t(Z(x, 2), { get badges() {
			return n.person.badges;
		} }), W(b);
		var E = Z(b, 2), D = P(E);
		Or(Z(D, 2), {
			get person() {
				return n.person;
			},
			onopen: d
		}), W(E);
		var O = Z(E, 2);
		{
			let e = J(() => C(c) ? n.person.shoes : null);
			je(Si(O, {
				get person() {
					return n.id;
				},
				get feed() {
					return n.person.feed;
				},
				get viewer() {
					return n.viewer;
				},
				get shoes() {
					return C(e);
				},
				get runShoes() {
					return n.person.run_shoes;
				},
				get reviewTypes() {
					return o();
				}
			}), (e) => Y(u, e, !0), () => C(u));
		}
		var A = Z(O, 2), j = (e) => {
			var i = Di(), a = t(i), o = P(a), s = Z(P(o)), u = (e) => {
				var t = Ti();
				z("click", t, () => C(l).open()), T(e, t);
			};
			N(s, (e) => {
				C(c) && e(u);
			}), W(o);
			var d = Z(o, 2), f = (e) => {
				Mr(e, { get shoes() {
					return n.person.shoes;
				} });
			}, p = (e) => {
				var t = Ei();
				T(e, t);
			};
			N(d, (e) => {
				n.person.shoes.length ? e(f) : e(p, -1);
			}), W(a);
			var m = Z(a, 2), h = (e) => {
				je(Ur(e, {
					get person() {
						return n.id;
					},
					get shoes() {
						return n.person.shoes;
					}
				}), (e) => Y(l, e, !0), () => C(l));
			};
			N(m, (e) => {
				C(c) && e(h);
			}), B(() => {
				Q(a, "aria-labelledby", `${r}-shoes`), Q(o, "id", `${r}-shoes`);
			}), T(e, i);
		};
		N(A, (e) => {
			(n.person.shoes?.length || C(c)) && e(j);
		});
		var M = Z(A, 2), ee = (e) => {
			qt(e, {
				get info() {
					return a();
				},
				get now() {
					return n.now;
				},
				get person() {
					return n.person;
				},
				collapsed: !0
			});
		};
		N(M, (e) => {
			a() && e(ee);
		}), B(() => {
			Q(g, "aria-labelledby", `${r}-feed`), Q(_, "id", `${r}-feed`), Q(b, "aria-labelledby", `${r}-badges`), Q(x, "id", `${r}-badges`), y(w, `${n.person.badges.count ?? ""} unlocked`), Q(E, "aria-labelledby", `${r}-pbs`), Q(D, "id", `${r}-pbs`);
		}), T(e, i);
	};
	N(g, (e) => {
		C(f)?.pick ? e(_) : C(f) ? e(v, 1) : e(b, -1);
	}), T(e, h), X();
}
R(["click"]);
// src/lib/ui/Goals.svelte
var Ai = $("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), ji = $("<p class=\"msg\" role=\"status\"> </p>"), Mi = $("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!> <label class=\"year svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Birth year</span> <input type=\"number\" inputmode=\"numeric\" min=\"1900\" placeholder=\"1990\" class=\"svelte-7wncvy\"/></label> <p class=\"caption maxhr svelte-7wncvy\"> </p></section>"), Ni = $("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), Pi = $("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), Fi = $("<button type=\"button\" class=\"btn\">Cancel change</button>"), Ii = $("<p class=\"caption svelte-7wncvy\"><!></p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!> <!>", 1), Li = $("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function Ri(e, n) {
	let r = oe();
	H(n, !0);
	let i = [], a = (e, t = Ye, r = Ye, i = Ye) => {
		let a = J(() => {
			let [e, t, n] = Je[r()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var o = Ai(), s = P(o), c = U(s, !0), l = Z(s, 2), u = Z(l, 2), d = U(u, !0), f = Z(u, 2);
		W(o), B((e, s, u, p) => {
			Q(o, "aria-label", i()), y(c, e), Q(l, "aria-label", `Fewer ${s ?? ""}`), l.disabled = n.readOnly || t()[r()] <= C(a).lo, y(d, u), Q(f, "aria-label", `More ${p ?? ""}`), f.disabled = n.readOnly || t()[r()] >= C(a).hi;
		}, [
			() => i().split(",")[0],
			() => h(i()),
			() => g(r(), t()[r()]),
			() => h(i())
		]), z("click", l, () => t()[r()] = pe(r(), t()[r()] - C(a).step)), z("click", f, () => t()[r()] = pe(r(), t()[r()] + C(a).step)), T(e, o);
	}, o = K(null), s = K(null), u = K(null), d = K(!1);
	we(() => {
		Oe("settings").then((e) => {
			Y(o, e, !0), Y(u, c(e, n.people), !0);
		}, (e) => Y(s, e, !0));
	});
	let f = {
		runs: "Runs per week",
		workouts: "Workouts per week",
		active_days: "Active days per week",
		steps: "Steps for an active day"
	}, p = [
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
	], m = {
		together: "Workouts together per week",
		team: "Team points per week"
	}, h = (e) => e[0].toLowerCase() + e.slice(1), g = (e, t) => e === "steps" ? t.toLocaleString("en-US") : String(t);
	async function b() {
		Y(d, !0);
		let e = await Ot(Re(C(u)), n.people, C(o).week_start);
		Y(d, !1), e && n.onsaved();
	}
	async function x() {
		Y(d, !0);
		let e = await kt();
		Y(d, !1), e && n.onsaved();
	}
	var S = Li(), w = Z(t(S), 2), E = (e) => {
		var t = ji(), n = U(t, !0);
		B(() => y(n, C(s) ? C(s).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), T(e, t);
	}, D = (e) => {
		var s = Ii(), c = t(s), h = P(c), g = (e) => {
			var t = _();
			B((e) => y(t, `New goals from Monday ${e ?? ""} are saved`), [() => $e(C(o).pending.from)]), T(e, t);
		}, S = (e) => {
			var t = _();
			B((e, n) => y(t, `Changes apply from Monday ${e ?? ""} (week ${n ?? ""})`), [() => $e(C(o).applies_from), () => Pe(C(o).applies_from)]), T(e, t);
		}, w = (e) => {
			var t = _();
			B((e) => y(t, `Applies from this week (week ${e ?? ""})`), [() => Pe(C(o).week_start)]), T(e, t);
		};
		N(h, (e) => {
			C(o).pending ? e(g) : C(o).applies_from > C(o).week_start ? e(S, 1) : e(w, -1);
		}), W(c);
		var E = Z(c, 2);
		q(E, 16, () => Object.keys(C(u).people), (e) => e, (e, t) => {
			let i = J(() => n.people[t]?.name ?? t);
			var o = Mi(), s = P(o), c = U(s, !0), l = Z(s, 2);
			q(l, 16, () => Be, (e) => e, (e, n) => {
				a(e, () => C(u).people[t], () => n, () => `${f[n]}, ${C(i)}`);
			});
			var d = Z(l, 2), p = Z(P(d), 2);
			V(p), W(d);
			var m = Z(d, 2), h = U(m, !0);
			W(o), B((e, a) => {
				Q(o, "aria-labelledby", `${r}-${t ?? ""}`), Q(s, "id", `${r}-${t ?? ""}`), y(c, C(i)), Q(p, "max", e), p.disabled = n.readOnly, y(h, a);
			}, [() => (/* @__PURE__ */ new Date()).getFullYear(), () => v(n.people[t]?.max_hr)]), mt(p, () => C(u).profiles[t].birth_year, (e) => C(u).profiles[t].birth_year = e), T(e, o);
		});
		var D = Z(E, 2), O = P(D), k = Z(O, 2);
		q(k, 21, () => p, (e) => e.mode, (e, t) => {
			var a = Ni();
			let o;
			var s = P(a);
			V(s);
			var c, d = Z(s, 1, !0);
			W(a), B(() => {
				o = l(a, 1, "svelte-7wncvy", null, o, { on: C(u).couple.mode === C(t).mode }), Q(s, "name", `${r}-mode`), s.disabled = n.readOnly, c !== (c = C(t).mode) && (s.value = (s.__value = c) ?? ""), y(d, C(t).label);
			}), lt(i, [], s, () => (C(t).mode, C(u).couple.mode), (e) => C(u).couple.mode = e), T(e, a);
		}), W(k);
		var A = Z(k, 2), j = U(A, !0), M = Z(A, 2), ee = (e) => {
			a(e, () => C(u).couple, () => C(u).couple.mode, () => m[C(u).couple.mode]);
		};
		N(M, (e) => {
			m[C(u).couple.mode] && e(ee);
		});
		var F = Z(M, 2), I = Z(P(F), 2);
		V(I), W(F), W(D);
		var te = Z(D, 2), ne = (e) => {
			var t = Pi();
			B(() => t.disabled = C(d)), z("click", t, b), T(e, t);
		};
		N(te, (e) => {
			n.readOnly || e(ne);
		});
		var L = Z(te, 2), re = (e) => {
			var t = Fi();
			B(() => t.disabled = C(d)), z("click", t, x), T(e, t);
		};
		N(L, (e) => {
			!n.readOnly && C(o).pending && e(re);
		}), B((e) => {
			Q(D, "aria-labelledby", `${r}-couple`), Q(O, "id", `${r}-couple`), Q(k, "aria-labelledby", `${r}-couple`), y(j, e), I.disabled = n.readOnly;
		}, [() => p.find((e) => e.mode === C(u).couple.mode).hint]), mt(I, () => C(u).couple.reward, (e) => C(u).couple.reward = e), T(e, s);
	};
	N(w, (e) => {
		C(u) ? e(D, -1) : e(E);
	}), T(e, S), X();
}
R(["click"]);
// src/lib/ui/Header.svelte
var zi = $("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), Bi = a("<svg class=\"brand svelte-16l0jix\" viewBox=\"0 0 100 100\" aria-hidden=\"true\"><defs><linearGradient id=\"hdr-brand\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#FFB340\"></stop><stop offset=\"1\" stop-color=\"#FF453A\"></stop></linearGradient></defs><rect width=\"100\" height=\"100\" rx=\"22.4\" fill=\"url(#hdr-brand)\"></rect><path d=\"M50 20 L80 45 V80 H20 V45 Z\" fill=\"#FFF\" stroke=\"#FFF\" stroke-width=\"6\" stroke-linejoin=\"round\"></path><path d=\"M50 42 C55 49 63 55 63 65.5 a13 13 0 0 1 -26 0 C37 58 42 53 45.5 49 C46 53.5 48 56.5 51 57.5 C49.5 52 49 47 50 42 Z\" fill=\"#FF6B2C\"></path></svg>"), Vi = $("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), Hi = $("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"><!> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function Ui(e, t) {
	let n = G(t, "subtitle", 3, ""), r = G(t, "actionLabel", 3, ""), i = G(t, "brand", 3, !1), a = K(0);
	var o = Hi();
	let s;
	var c = P(o), u = P(c), d = (e) => {
		var n = zi();
		z("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), T(e, n);
	};
	N(u, (e) => {
		t.onback && e(d);
	});
	var f = Z(u, 2), p = P(f), m = P(p), h = (e) => {
		var t = Bi();
		T(e, t);
	};
	N(m, (e) => {
		i() && e(h);
	});
	var g = Z(m);
	W(p);
	var _ = Z(p, 2), v = (e) => {
		var n = Vi(), i = U(n, !0);
		B(() => y(i, r())), z("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), T(e, n);
	};
	N(_, (e) => {
		t.onaction && e(v);
	}), W(f);
	var b = Z(f, 2), x = U(b, !0);
	W(c), W(o), B(() => {
		s = l(o, 1, "svelte-16l0jix", null, s, { scrolled: C(a) > 0 }), y(g, ` ${t.title ?? ""}`), y(x, n() || "\xA0");
	}), He("y", () => C(a), (e) => Y(a, e, !0)), T(e, o);
}
R(["click"]);
// src/lib/motion.js
function Wi(e, { onFrame: t, onSettle: n, snap: r = {
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
var Gi = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), Ki = (e) => Gi(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function qi({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var Ji = a("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Yi = a("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function Xi(e, n) {
	H(n, !0);
	let r = G(n, "size", 3, 88), i = [
		"run",
		"gym",
		"bonus"
	], a = 1e3, o = K(We(nt.reducedMotion ? a : 0)), s = J(() => r() * .11), c = J(() => n.fractions.map((e, t) => {
		let n = r() / 2 - C(s) / 2 - t * C(s) * 1.3, c = 2 * Math.PI * n;
		return {
			kind: i[t],
			r: n,
			c,
			len: c * e * C(o) / a
		};
	}));
	we(() => {
		if (C(o) === a) return;
		let e = Wi(qi({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => Y(o, e, !0) });
		return e.to(a), e.stop;
	});
	var l = Yi();
	let u;
	q(l, 21, () => C(c), (e) => e.kind, (e, n) => {
		var i = Ji(), a = t(i);
		let o;
		var c = Z(a);
		let l;
		B(() => {
			Q(a, "cx", r() / 2), Q(a, "cy", r() / 2), Q(a, "r", C(n).r), Q(a, "stroke-width", C(s)), o = d(a, "", o, { stroke: `var(--${C(n).kind ?? ""})` }), Q(c, "cx", r() / 2), Q(c, "cy", r() / 2), Q(c, "r", C(n).r), Q(c, "stroke-width", C(s)), Q(c, "stroke-dasharray", `${C(n).len ?? ""} ${C(n).c ?? ""}`), Q(c, "opacity", +(C(n).len > .01)), Q(c, "transform", `rotate(-90 ${r() / 2} ${r() / 2})`), l = d(c, "", l, { stroke: `var(--${C(n).kind ?? ""})` });
		}), T(e, i);
	}), W(l), B(() => {
		Q(l, "viewBox", `0 0 ${r() ?? ""} ${r() ?? ""}`), u = d(l, "", u, { width: `${r() / 16}rem` });
	}), T(e, l), X();
}
// src/lib/ui/PersonTile.svelte
var Zi = $("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Qi = $("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), $i = $("<span class=\"streak svelte-1handop\"> </span>"), ea = $("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), ta = $("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), na = $("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), ra = $("<span class=\"steps svelte-1handop\"> </span>"), ia = $("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), aa = $("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), oa = $("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function sa(e, n) {
	H(n, !0);
	let r = G(n, "index", 3, 0), i = G(n, "compact", 3, !1), a = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], o = J(() => a[r() % a.length]), s = J(() => Ve(C(o), 2)), c = J(() => C(s)[0]), u = J(() => C(s)[1]), f = J(() => O(n.person)), p = J(() => n.person.week), m = [
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
	], h = J(() => m.map((e, t) => ({
		...e,
		n: te(C(p))[t],
		of: L(C(p))[t]
	}))), g = J(() => ve(n.person.steps_today, C(p).goal.steps)), _ = J(() => [
		`Level ${C(f).level}`,
		i() ? `🔥 ${n.person.streak} wk` : `${n.person.xp.toLocaleString()} XP`,
		C(p).paused && "Week paused",
		C(p).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), v = J(() => `${n.person.name}, level ${C(f).level}. This week ${C(h).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${C(p).goal_pending ? "New goals pending. " : ""}${C(p).bonus ? "Weekly bonus earned. " : ""}${C(g) ? C(g).replace("👟 ", "") + ". " : ""}Streak ${n.person.streak} weeks.`);
	var x = oa();
	let S;
	var w = P(x), E = P(w), D = P(E);
	let k;
	var A = U(D, !0), j = Z(D, 2), M = P(j), ee = U(M, !0), F = Z(M, 2), I = U(F, !0);
	W(j);
	var ne = Z(j, 2), re = (e) => {
		var n = Qi(), r = t(n), i = P(r);
		{
			let e = J(() => b(C(p)));
			Xi(i, {
				get fractions() {
					return C(e);
				},
				size: 44
			});
		}
		var a = Z(i, 2), o = (e) => {
			var t = Zi();
			T(e, t);
		};
		N(a, (e) => {
			C(p).bonus && e(o);
		}), W(r);
		var s = Z(r, 2), c = U(s, !0);
		B(() => y(c, C(v))), T(e, n);
	}, ie = (e) => {
		var t = $i(), r = U(t);
		B(() => y(r, `🔥 ${n.person.streak ?? ""} wk`)), T(e, t);
	};
	N(ne, (e) => {
		i() ? e(re) : e(ie, -1);
	});
	var R = Z(ne, 2), ae = (e) => {
		var t = ea();
		T(e, t);
	};
	N(R, (e) => {
		n.onopen && e(ae);
	}), W(E);
	var oe = Z(E, 2), se = (e) => {
		var n = ia(), r = t(n), i = P(r), a = P(i);
		{
			let e = J(() => b(C(p))), t = J(() => nt.wide ? 112 : 88);
			Xi(a, {
				get fractions() {
					return C(e);
				},
				get size() {
					return C(t);
				}
			});
		}
		var o = Z(a, 2), s = (e) => {
			var t = ta();
			T(e, t);
		};
		N(o, (e) => {
			C(p).bonus && e(s);
		}), W(i);
		var c = Z(i, 2);
		q(c, 21, () => C(h), (e) => e.kind, (e, t) => {
			var n = na(), r = P(n), i = P(r);
			let a;
			var o = Z(i, 1, !0);
			W(r);
			var s = Z(r, 2), c = P(s, !0), l = Z(c), u = U(l);
			W(s), W(n), B(() => {
				a = d(i, "", a, { background: `var(--${C(t).kind ?? ""})` }), y(o, C(t).label), y(c, C(t).n), y(u, `/${C(t).of ?? ""}`);
			}), T(e, n);
		}), W(c), W(r);
		var l = Z(r, 2), u = (e) => {
			var t = ra(), n = U(t, !0);
			B(() => y(n, C(g))), T(e, t);
		};
		N(l, (e) => {
			C(g) && e(u);
		});
		var m = Z(l, 2), _ = P(m), v = P(_);
		let x;
		W(_);
		var S = Z(_, 2), w = U(S);
		W(m), B((e, t) => {
			x = d(v, "", x, { width: `${C(f).frac * 100}%` }), y(w, `${e ?? ""} of ${t ?? ""} XP to level ${C(f).level + 1}`);
		}, [() => C(f).into.toLocaleString(), () => C(f).span.toLocaleString()]), T(e, n);
	};
	N(oe, (e) => {
		i() || e(se);
	}), W(w);
	var ce = Z(w, 2), le = (e) => {
		var t = aa();
		B(() => Q(t, "aria-label", C(v))), z("click", t, function(...e) {
			n.onopen?.apply(this, e);
		}), T(e, t);
	};
	N(ce, (e) => {
		n.onopen && e(le);
	}), W(x), B((e) => {
		S = l(x, 1, "tile glass svelte-1handop", null, S, {
			compact: i(),
			opens: n.onopen
		}), Q(w, "aria-hidden", n.onopen ? "true" : void 0), k = d(D, "", k, {
			"--a1": C(c),
			"--a2": C(u)
		}), y(A, e), y(ee, n.person.name), y(I, C(_));
	}, [() => n.person.name.slice(0, 1)]), T(e, x), X();
}
R(["click"]);
// src/lib/ui/Sheet.svelte
var ca = $("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), la = $("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function ua(e, n) {
	H(n, !0);
	let i = G(n, "from", 3, null), a = 1e3, o = nt.reducedMotion, s = K(We(o ? a : 0)), c = K(0), u = K(1), f = K(!1), p = K("50% 100%"), m, g, _ = !1, v = null, y = J(() => o ? +C(f) : Math.min(1, C(s) / 500)), b = J(() => o ? 1 : .5 + .5 * C(s) / a), x = () => {
		_ && (C(s) === 0 || C(c) >= C(u)) && (_ = !1, n.onclose());
	};
	function S(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = qi({
					value: r,
					damping: o,
					response: s
				}), n = Wi(t, {
					onFrame: e,
					onSettle: x
				}), n.to(i, a);
			}
		};
	}
	let w = S((e) => Y(s, e, !0)), E = S((e) => Y(c, e, !0));
	function D() {
		_ || v || (_ = !0, o ? (Y(f, !1), setTimeout(n.onclose, Ki("--fade"))) : w.to(C(s), 0, { response: .3 }));
	}
	function O(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), w.stop(), E.stop(), _ = !1, v = {
			from: C(c),
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		});
	}
	function k(e) {
		if (!v) return;
		let t = v.from + e.clientY - v.start;
		Y(c, t < 0 ? -or(-t, C(u)) : t, !0), v.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), v.samples.length > 8 && v.samples.shift();
	}
	function A(e) {
		if (!v) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = ar([...v.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		v = null, ir(C(c), n, C(u)) ? o ? D() : (_ = !0, E.to(C(c), C(u), {
			velocity: n,
			response: .3
		})) : o ? Y(c, 0) : (E.to(C(c), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), C(s) < a && w.to(C(s), a));
	}
	we(() => {
		if (i()) {
			let e = i().getBoundingClientRect();
			Y(p, `${e.left + e.width / 2 - m.offsetLeft}px ${e.top + e.height / 2 - m.offsetTop}px`);
		}
		g.focus({ preventScroll: !0 });
		let e = document.documentElement;
		return e.style.overflow = "hidden", o ? requestAnimationFrame(() => Y(f, !0)) : w.to(0, a), () => {
			w.stop(), E.stop(), e.style.overflow = "";
		};
	});
	var j = { close: D }, M = la();
	h("keydown", fe, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && D());
	var ee = t(M);
	let F, I;
	var te = Z(ee, 2);
	let ne, L;
	var re = P(te), ie = Z(P(re), 2), R = P(ie), ae = (e) => {
		var t = ca();
		z("click", t, function(...e) {
			n.onback?.apply(this, e);
		}), T(e, t);
	};
	N(R, (e) => {
		n.onback && e(ae);
	});
	var oe = Z(R, 2);
	je(oe, (e) => g = e, () => g), W(ie), W(re);
	var se = Z(re, 2), ce = P(se);
	return r(ce, () => n.children), W(se), W(te), je(te, (e) => m = e, () => m), B((e) => {
		F = l(ee, 1, "scrim svelte-185xwm9", null, F, { fade: o }), I = d(ee, "", I, { opacity: e }), ne = l(te, 1, "sheet svelte-185xwm9", null, ne, { fade: o }), Q(te, "aria-label", n.label), L = d(te, "", L, {
			opacity: C(y),
			transform: `translate3d(0, ${C(c) ?? ""}px, 0) scale(${C(b) ?? ""})`,
			"transform-origin": C(p)
		});
	}, [() => C(y) * Math.min(1, Math.max(0, 1 - C(c) / C(u)))]), z("click", ee, D), z("pointerdown", re, O), z("pointermove", re, k), z("pointerup", re, A), h("pointercancel", re, A), z("click", oe, D), ke(te, "offsetHeight", (e) => Y(u, e)), T(e, M), X(j);
}
R([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var da = $("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), fa = $("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), pa = $("<p class=\"caption stale svelte-9nj5u4\"> </p>"), ma = $("<!> <!> <!>", 1);
function ha(e, n) {
	H(n, !0);
	let r = J(() => n.scoredAt ? Ne(n.scoredAt, n.now) : null);
	var i = ma(), a = t(i), o = (e) => {
		var t = da(), r = Z(P(t));
		W(t), B(() => y(r, ` fitbridge keeps the last valid one. ${n.configError ?? ""}`)), T(e, t);
	};
	N(a, (e) => {
		n.configError && e(o);
	});
	var s = Z(a, 2), c = (e) => {
		var t = fa(), r = Z(P(t));
		W(t), B(() => y(r, ` fitbridge keeps the last valid ones. ${n.settingsError ?? ""}`)), T(e, t);
	};
	N(s, (e) => {
		n.settingsError && e(c);
	});
	var l = Z(s, 2), u = (e) => {
		var t = pa(), n = U(t, !0);
		B(() => y(n, C(r))), T(e, t);
	};
	N(l, (e) => {
		C(r) && e(u);
	}), T(e, i), X();
}
// node_modules/svelte/src/internal/flags/legacy.js
at();
// src/lib/ui/Toast.svelte
var ga = $("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), _a = $("<span> </span> <!>", 1), va = $("<div role=\"status\" aria-live=\"polite\"><!></div>");
function ya(e, n) {
	H(n, !1);
	function r() {
		let e = yt.undo;
		Object.assign(yt, {
			on: !1,
			undo: null
		}), e();
	}
	Xe();
	var i = va();
	let a;
	var o = P(i), s = (e) => {
		var n = _a(), i = t(n), a = U(i, !0), o = Z(i, 2), s = (e) => {
			var t = ga();
			z("click", t, r), T(e, t);
		};
		N(o, (e) => {
			yt.undo && e(s);
		}), B(() => y(a, yt.text)), T(e, n);
	};
	N(o, (e) => {
		yt.on && e(s);
	}), W(i), B(() => a = l(i, 1, "toast svelte-1fk2ial", null, a, { on: yt.on })), T(e, i), X();
}
R(["click"]);
// src/lib/ui/Together.svelte
var ba = $("<p class=\"progress svelte-1tya3no\"> </p>"), xa = $("<p> </p>"), Sa = $("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), Ca = $("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function wa(e, t) {
	H(t, !0);
	let n = J(() => t.group.week ? tt(t.group.week, t.people) : ""), r = J(() => t.group.week ? Ze(t.group.week) : null), i = J(() => [
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
	var a = Ca(), o = Z(P(a), 2), s = (e) => {
		var t = ba(), r = U(t, !0);
		B(() => y(r, C(n))), T(e, t);
	};
	N(o, (e) => {
		C(n) && e(s);
	});
	var c = Z(o, 2), u = (e) => {
		var n = xa();
		let i;
		var a = U(n, !0);
		B(() => {
			i = l(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), y(a, C(r));
		}), T(e, n);
	};
	N(c, (e) => {
		C(r) && e(u);
	});
	var d = Z(c, 2);
	q(d, 21, () => C(i), (e) => e.k, (e, t) => {
		var n = Sa(), r = P(n), i = U(r, !0), a = Z(r), o = P(a, !0), s = Z(o), c = U(s, !0);
		W(a), W(n), B(() => {
			y(i, C(t).k), y(o, C(t).v), y(c, C(t).unit);
		}), T(e, n);
	}), W(d), W(a), T(e, a), X();
}
// src/App.svelte
var Ta = $("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), Ea = $("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), Da = $("<div class=\"tiles compact svelte-1n46o8q\"></div>"), Oa = $("<!> <!>", 1), ka = $("<div class=\"tiles svelte-1n46o8q\"></div>"), Aa = $("<!> <!> <!> <!> <!>", 1), ja = $("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function Ma(e, n) {
	H(n, !0);
	let r = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), i = new URLSearchParams(r.location.search), a = i.get("person"), o = /^\/(?!\/)/.test(i.get("back") ?? "") ? i.get("back") : null, s = o && (() => {
		r.history.pushState(null, "", o), r.dispatchEvent(new Event("location-changed"));
	}), c = K(null), l = (e) => (t) => Y(c, {
		id: e,
		from: t.currentTarget
	}, !0), u = K(null), d = K(void 0);
	async function f() {
		let e = C(c)?.from ?? C(u)?.from;
		Y(c, Y(u, null), !0), await Qe(), e?.focus({ preventScroll: !0 });
	}
	let p = K(null), m = K(null), h = K(We(/* @__PURE__ */ new Date())), g = We({}), _;
	async function v() {
		if (clearTimeout(_), !document.hidden) {
			try {
				Y(p, await Oe("scores"), !0), Y(m, null), Et(C(p).people), a && Object.hasOwn(C(p).people, a) && a !== E(C(p).viewer, C(p).people).self && Y(c, {
					id: a,
					from: null
				}, !0), a = null;
			} catch (e) {
				Y(m, e, !0);
			}
			Y(h, /* @__PURE__ */ new Date(), !0), C(p) && b(C(p)), clearTimeout(_), _ = setTimeout(v, C(p) ? 6e4 : 3e4);
		}
	}
	let b = (e) => st(e.viewer, e.people).forEach((e) => Oe(`connect?person=${encodeURIComponent(e)}`).then((t) => {
		g[e] = t;
	}, () => {
		delete g[e];
	}));
	le(() => {
		v();
		let e = () => document.hidden || v();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(_), document.removeEventListener("visibilitychange", e);
		};
	}), le(() => {
		xt.n && v();
	});
	let x = J(() => ot(C(p)?.people ?? {}, bt.entry)), S = J(() => Object.keys(C(x))), w = J(() => E(C(p)?.viewer ?? {}, C(x))), D = J(() => C(x)[C(w).self ?? C(S)[0]]?.week), O = (e) => !!C(p)?.viewer?.can_edit?.includes(e), k = J(() => !!C(w).self && pt(C(x)[C(w).self], g[C(w).self])), A = J(() => !!C(c) && Object.hasOwn(C(x), C(c).id) || !!C(u) && !!C(p));
	var j = ja(), M = t(j), ee = P(M);
	{
		let e = J(() => C(D) ? ze(C(D)) : ""), t = J(() => C(p) ? (e) => Y(u, { from: e.currentTarget }, !0) : void 0);
		Ui(ee, {
			title: "Training",
			brand: !0,
			get subtitle() {
				return C(e);
			},
			get onback() {
				return s;
			},
			actionLabel: "Goals",
			get onaction() {
				return C(t);
			}
		});
	}
	var F = Z(ee, 2), I = P(F), te = (e) => {
		var n = Ea(), r = Z(t(n), 2), i = (e) => {
			var t = Ta(), n = U(t, !0);
			B(() => y(n, C(m).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), T(e, t);
		};
		N(r, (e) => {
			C(m) && e(i);
		}), T(e, n);
	}, ne = (e) => {
		var n = Aa(), r = t(n);
		ha(r, {
			get scoredAt() {
				return C(p).scored_at;
			},
			get configError() {
				return C(p).config_error;
			},
			get settingsError() {
				return C(p).settings_error;
			},
			get now() {
				return C(h);
			}
		});
		var i = Z(r, 2), a = (e) => {
			qt(e, {
				get info() {
					return g[C(w).self];
				},
				get now() {
					return C(h);
				},
				get person() {
					return C(x)[C(w).self];
				}
			});
		};
		N(i, (e) => {
			C(k) && e(a);
		});
		var o = Z(i, 2), s = (e) => {
			var n = Oa(), r = t(n), i = (e) => {
				var t = Da();
				q(t, 20, () => C(w).others, (e) => e, (e, t) => {
					{
						let n = J(() => C(S).indexOf(t)), r = J(() => l(t));
						sa(e, {
							get person() {
								return C(x)[t];
							},
							get index() {
								return C(n);
							},
							compact: !0,
							get onopen() {
								return C(r);
							}
						});
					}
				}), W(t), T(e, t);
			};
			N(r, (e) => {
				C(w).others.length && e(i);
			});
			var a = Z(r, 2);
			{
				let e = J(() => C(S).indexOf(C(w).self));
				sa(a, {
					get person() {
						return C(x)[C(w).self];
					},
					get index() {
						return C(e);
					}
				});
			}
			T(e, n);
		}, c = (e) => {
			var t = ka();
			q(t, 20, () => C(w).others, (e) => e, (e, t) => {
				{
					let n = J(() => C(S).indexOf(t)), r = J(() => l(t));
					sa(e, {
						get person() {
							return C(x)[t];
						},
						get index() {
							return C(n);
						},
						get onopen() {
							return C(r);
						}
					});
				}
			}), W(t), T(e, t);
		};
		N(o, (e) => {
			C(w).self ? e(s) : e(c, -1);
		});
		var u = Z(o, 2), d = (e) => {
			wa(e, {
				get group() {
					return C(p).group;
				},
				get people() {
					return C(x);
				}
			});
		};
		N(u, (e) => {
			C(p).group && e(d);
		});
		var f = Z(u, 2), m = (e) => {
			{
				let t = J(() => O(C(w).self)), n = J(() => C(k) ? null : g[C(w).self]);
				ki(e, {
					get id() {
						return C(w).self;
					},
					get person() {
						return C(x)[C(w).self];
					},
					get canEdit() {
						return C(t);
					},
					get viewer() {
						return C(p).viewer;
					},
					get people() {
						return C(x);
					},
					get reviewTypes() {
						return C(p).review_types;
					},
					get connect() {
						return C(n);
					},
					get now() {
						return C(h);
					}
				});
			}
		};
		N(f, (e) => {
			C(w).self && e(m);
		}), T(e, n);
	};
	N(I, (e) => {
		C(p) ? e(ne, -1) : e(te);
	}), W(F), W(M);
	var L = Z(M, 2), re = (e) => {
		je(ua(e, {
			label: "Goals",
			get from() {
				return C(u).from;
			},
			onclose: f,
			get onback() {
				return s;
			},
			children: (e, t) => {
				{
					let t = J(() => !C(w).self);
					Ri(e, {
						get people() {
							return C(p).people;
						},
						get readOnly() {
							return C(t);
						},
						onsaved: () => C(d)?.close()
					});
				}
			},
			$$slots: { default: !0 }
		}), (e) => Y(d, e, !0), () => C(d));
	}, ie = (e) => {
		ua(e, {
			get label() {
				return `${C(x)[C(c).id].name ?? ""}'s details`;
			},
			get from() {
				return C(c).from;
			},
			onclose: f,
			get onback() {
				return s;
			},
			children: (e, n) => {
				var r = Oa(), i = t(r);
				{
					let e = J(() => C(S).indexOf(C(c).id));
					sa(i, {
						get person() {
							return C(x)[C(c).id];
						},
						get index() {
							return C(e);
						}
					});
				}
				var a = Z(i, 2);
				{
					let e = J(() => O(C(c).id));
					ki(a, {
						get id() {
							return C(c).id;
						},
						get person() {
							return C(x)[C(c).id];
						},
						get canEdit() {
							return C(e);
						},
						get viewer() {
							return C(p).viewer;
						},
						get people() {
							return C(x);
						},
						get reviewTypes() {
							return C(p).review_types;
						},
						get connect() {
							return g[C(c).id];
						},
						get now() {
							return C(h);
						}
					});
				}
				T(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	N(L, (e) => {
		C(u) && C(p) ? e(re) : C(A) && e(ie, 1);
	}), ya(Z(L, 2), {}), B(() => M.inert = C(A)), T(e, j), X();
}
// src/main.js
var Na = (e) => p(Ma, { target: e }), Pa = () => new Promise((e) => {
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
		ct(e);
		let t = e.themes?.darkMode ?? matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.dataset.theme = t ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Pa().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", Na(e);
		}));
	}
});
