import { $ as e, $t as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Gt as h, H as g, Ht as _, I as v, It as y, J as b, Jt as x, K as S, Kt as C, L as w, Lt as T, M as E, Mt as D, N as O, Nt as k, O as A, Ot as j, P as M, Pt as N, Q as ee, Qt as P, R as F, Rt as I, S as te, St as ne, T as L, Tt as re, U as ie, Ut as R, V as ae, Vt as oe, W as se, Wt as z, X as ce, Xt as le, Y as ue, Yt as B, Z as de, Zt as fe, _ as pe, _n as me, _t as he, a as ge, an as _e, at as ve, b as ye, bt as V, c as be, cn as H, ct as xe, d as Se, dn as Ce, dt as we, en as U, et as Te, f as Ee, fn as W, ft as G, g as De, gn as Oe, gt as ke, h as Ae, ht as je, i as Me, in as K, it as Ne, j as Pe, jt as q, k as Fe, kt as Ie, l as Le, ln as Re, lt as ze, m as Be, mn as Ve, mt as He, n as Ue, nn as We, nt as Ge, o as Ke, on as J, ot as qe, p as Je, pn as Ye, pt as Xe, q as Ze, qt as Qe, rn as Y, rt as $e, s as et, sn as X, st as tt, t as nt, tn as Z, tt as rt, u as it, un as at, ut as ot, v as st, vn as ct, vt as lt, w as ut, wt as dt, x as ft, xt as Q, y as pt, yt as mt, z as ht, zt as $ } from "./shared-dm47Tgzx.js";
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
async function Dt(e, t) {
	try {
		await me("POST", "settings", e);
	} catch (e) {
		return Tt(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(bt, {
		entry: e,
		at: Date.now()
	}), Et(t), Tt("Saved · updates within 5 min"), !0;
}
async function Ot(e, t, n) {
	let r = `${e}/${t}`, i = _t[r], a = ++Ct, o = t.startsWith("manual:"), s = o && n === "remove" ? null : n === "remove";
	_t[r] = {
		person: e,
		key: t,
		want: s,
		at: Date.now(),
		n: a
	}, n === "remove" && !o && Tt("Removed", () => Ot(e, t, "restore"));
	try {
		await b(wt, r, () => me("POST", "workouts", {
			person: e,
			key: t,
			action: n
		})), vt[r] = s;
	} catch (e) {
		_t[r]?.n === a && (i ? _t[r] = i : delete _t[r]), Tt(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
var kt = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
async function At(e, t) {
	try {
		return await Oe(`feed?person=${encodeURIComponent(e)}&before=${t}`);
	} catch (e) {
		return Tt(kt(e)), null;
	}
}
async function jt(e) {
	try {
		await me("POST", "shoes", e);
	} catch (e) {
		return Tt(kt(e)), !1;
	}
	return xt.n++, !0;
}
async function Mt(e, t, n, r = null, i = "") {
	try {
		await me("POST", "workouts", {
			action: "review",
			person: e,
			key: t,
			decision: n,
			...n === "type" && { type_match: r }
		});
	} catch (e) {
		return Tt(kt(e)), !1;
	}
	return xt.n++, Tt({
		plan: `Counts for ${i}`,
		run: "Kept as a run",
		type: `Changed to ${i}`
	}[n] ?? "Decision cleared"), !0;
}
async function Nt(e, t, n) {
	try {
		await me("POST", "workouts", {
			action: "shoe",
			person: e,
			key: t,
			shoe_id: n
		});
	} catch (e) {
		return Tt(kt(e)), !1;
	}
	return xt.n++, Tt("Moved to the other shoe"), !0;
}
async function Pt(e) {
	try {
		let t = await me("POST", "plans", e);
		return xt.n++, t;
	} catch (e) {
		return { error: kt(e) };
	}
}
// src/lib/ui/Connect.svelte
var Ft = $("<div class=\"url svelte-gy3e4s\"><input readonly=\"\" aria-label=\"Your address\" class=\"svelte-gy3e4s\"/> <button type=\"button\" class=\"btn press\" aria-label=\"Copy address\">Copy</button></div>"), It = $("<p class=\"warn svelte-gy3e4s\">This address only works at home.</p>"), Lt = $("<p class=\"caption svelte-gy3e4s\"> </p> <div class=\"choice svelte-gy3e4s\"><button type=\"button\" class=\"btn press svelte-gy3e4s\">iPhone</button> <button type=\"button\" class=\"btn press svelte-gy3e4s\">Android</button></div>", 1), Rt = $("<li class=\"svelte-gy3e4s\"> </li>"), zt = $("<ol class=\"svelte-gy3e4s\"></ol>"), Bt = $("<p class=\"caption svelte-gy3e4s\"> <b> </b> </p>"), Vt = $("<p> </p> <!> <!> <!> <!>", 1), Ht = $("<details class=\"card connect svelte-gy3e4s\"><summary class=\"svelte-gy3e4s\">Connect your phone <small class=\"svelte-gy3e4s\"> </small></summary> <div class=\"inner svelte-gy3e4s\"><!></div></details>"), Ut = $("<section class=\"card connect svelte-gy3e4s\" aria-label=\"Connect your phone\"><div class=\"inner svelte-gy3e4s\"><h2 class=\"svelte-gy3e4s\">Connect your phone</h2><!></div></section>");
function Wt(e, r) {
	H(r, !0);
	let i = (e) => {
		var n = Vt(), i = t(n);
		let a;
		var o = U(i, !0), g = Z(i, 2), _ = (e) => {
			var t = Ft(), n = P(t);
			V(n), je(n, (e) => Y(p, e), () => C(p));
			var i = Z(n, 2);
			W(t), B(() => ne(n, r.info.url)), h("focus", n, (e) => e.currentTarget.select()), z("click", i, m), T(e, t);
		};
		N(g, (e) => {
			r.info.url && e(_);
		});
		var v = Z(g, 2), b = (e) => {
			var t = It();
			T(e, t);
		};
		N(v, (e) => {
			r.info.external || e(b);
		});
		var x = Z(v, 2), S = (e) => {
			var n = Lt(), r = t(n), i = U(r, !0), a = Z(r, 2), o = P(a), c = Z(o, 2);
			W(a), B(() => y(i, C(u).title)), z("click", o, () => Y(s, "iphone")), z("click", c, () => Y(s, "android")), T(e, n);
		}, w = (e) => {
			var t = zt();
			q(t, 20, () => C(u).steps, (e) => e, (e, t) => {
				var n = Rt(), r = U(n, !0);
				B(() => y(r, t)), T(e, n);
			}), W(t), T(e, t);
		};
		N(x, (e) => {
			C(c) ? e(w, -1) : e(S);
		});
		var E = Z(x, 2), D = (e) => {
			var t = Bt(), n = P(t, !0), r = Z(n), i = U(r, !0), a = Z(r, 1, !0);
			W(t), B(() => {
				y(n, C(f).before), y(i, C(f).code), y(a, C(f).after);
			}), T(e, t);
		};
		N(E, (e) => {
			C(f) && e(D);
		}), B(() => {
			a = l(i, 1, "status svelte-gy3e4s", null, a, { ok: C(d).state === "connected" }), y(o, C(d).text);
		}), T(e, n);
	}, a = G(r, "person", 3, null), o = G(r, "collapsed", 3, !1), s = K(null), c = J(() => r.info.phone ?? C(s)), u = J(() => ft(C(c))), d = J(() => ye(r.info, r.now, a())), f = J(() => n(r.info.opengym)), p = K(void 0);
	async function m() {
		C(p).focus(), C(p).setSelectionRange(0, C(p).value.length);
		let e = !1;
		try {
			await navigator.clipboard.writeText(r.info.url), e = !0;
		} catch {
			try {
				e = document.execCommand("copy");
			} catch {}
		}
		Tt(e ? "Copied" : "Select and copy the address");
	}
	var g = I(), _ = t(g), v = (e) => {
		var t = Ht(), n = P(t), r = Z(P(n)), a = U(r, !0);
		W(n);
		var o = Z(n, 2), s = P(o);
		i(s), W(o), W(t), B(() => y(a, C(d).state === "connected" ? "Connected" : "Waiting")), T(e, t);
	}, b = (e) => {
		var t = Ut(), n = P(t), r = Z(P(n));
		i(r), W(n), W(t), T(e, t);
	};
	N(_, (e) => {
		o() ? e(v) : e(b, -1);
	}), T(e, g), X();
}
R(["click"]);
// src/lib/ui/Badges.svelte
var Gt = $("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), Kt = $("<ul class=\"svelte-m8wnum\"></ul>"), qt = $("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), Jt = $("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), Yt = $("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function Xt(e, t) {
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
	var a = Yt(), o = P(a), s = (e) => {
		var n = Kt();
		q(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = Gt(), i = P(n), a = U(i, !0), o = Z(i, 2), s = U(o, !0), c = Z(o, 2), l = U(c, !0);
			W(n), B((e, n) => {
				y(a, e), y(s, C(t).title), y(l, n);
			}, [() => r(C(t)), () => $e(C(t).unlocked_at)]), T(e, n);
		}), W(n), T(e, n);
	};
	N(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = Z(o, 2), l = (e) => {
		var n = Kt();
		q(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = qt(), a = P(n), o = U(a, !0), s = Z(a, 2), c = U(s, !0), l = Z(s, 2), u = U(l), f = Z(l, 2), p = P(f);
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
		var t = Jt();
		T(e, t);
	};
	N(u, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(f);
	}), W(a), T(e, a), X();
}
// src/lib/ui/FeedRow.svelte
var Zt = $("<span class=\"mini svelte-69s4be\"> </span>"), Qt = $("<span> </span>"), $t = $("<span class=\"mini svelte-69s4be\">Together</span>"), en = $("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), tn = $("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), nn = $("<span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span>", 1), rn = $("<button type=\"button\" class=\"head svelte-69s4be\"><!></button>"), an = $("<div class=\"head svelte-69s4be\"><!></div>"), on = $("<li><!></li>");
function sn(e, n) {
	H(n, !0);
	let r = (e) => {
		var r = nn(), s = t(r), c = U(s, !0), u = Z(s, 2), d = P(u), f = P(d), p = Z(f), m = (e) => {
			var t = Zt(), n = U(t, !0);
			B(() => y(n, C(o).plan)), T(e, t);
		};
		N(p, (e) => {
			C(o).plan && e(m);
		});
		var h = Z(p, 2), g = (e) => {
			var t = Qt();
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
			var t = $t();
			T(e, t);
		};
		N(_, (e) => {
			n.item.joint && e(v);
		});
		var b = Z(_, 2), x = (e) => {
			var t = en();
			T(e, t);
		};
		N(b, (e) => {
			n.record && e(x);
		}), W(d);
		var S = Z(d, 2), w = U(S);
		W(u);
		var E = Z(u, 2), D = P(E), O = (e) => {
			var t = tn();
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
	var u = on();
	let d;
	var f = P(u), p = (e) => {
		var t = rn(), i = P(t);
		r(i), W(t), z("click", t, () => n.onopen(n.item)), T(e, t);
	}, m = (e) => {
		var t = an(), n = P(t);
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
var cn = $("<ul class=\"card svelte-n1344i\"></ul>"), ln = $("<p class=\"caption empty svelte-n1344i\">No workouts in the last 90 days.</p>"), un = $("<button type=\"button\" class=\"btn older svelte-n1344i\">Load older</button>"), dn = $("<!> <!>", 1);
function fn(e, n) {
	H(n, !0);
	let r = K(We([])), i = K(!0), a = K(!1), o = null, s = J(() => w(n.items, ht(C(r), n.person, vt)));
	async function c() {
		Y(a, !0);
		let e = o ?? C(s).at(-1)?.start.slice(0, 10) ?? F(f(), 88), t = await At(n.person, e);
		Y(a, !1), t && (Y(r, w(C(r), t.items), !0), o = F(e, 90), Y(i, t.more, !0));
	}
	var l = dn(), u = t(l), d = (e) => {
		var t = cn();
		q(t, 21, () => C(s), (e) => e.key, (e, t) => {
			{
				let r = J(() => n.records?.has(C(t).key));
				sn(e, {
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
		var t = ln();
		T(e, t);
	};
	N(u, (e) => {
		C(s).length ? e(d) : e(p, -1);
	});
	var m = Z(u, 2), h = (e) => {
		var t = un();
		B(() => t.disabled = C(a)), z("click", t, c), T(e, t);
	};
	N(m, (e) => {
		C(i) && e(h);
	}), T(e, l), X();
}
R(["click"]);
// src/lib/ui/PlanBar.svelte
var pn = $("<p class=\"caption name svelte-1y5m0aq\"> <!></p>"), mn = $("<span> </span>"), hn = $("<i class=\"svelte-1y5m0aq\"></i>"), gn = $("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), _n = $("<span class=\"review svelte-1y5m0aq\"> </span>"), vn = $("<p class=\"caption prog svelte-1y5m0aq\"> <!></p>"), yn = $("<button type=\"button\" class=\"btn change press svelte-1y5m0aq\">Change plan</button>"), bn = $("<div class=\"card plan svelte-1y5m0aq\"><!> <div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!> <!> <!></div>");
function xn(e, n) {
	H(n, !0);
	let r = G(n, "canEdit", 3, !1), i = J(() => n.plan.week != null), a = J(() => n.plan.target?.type === "distance" ? [] : g(n.plan)), o = J(() => Math.round(((n.plan.warmup_s ?? 0) + n.plan.intervals.reduce((e, [, t]) => e + t, 0) + (n.plan.cooldown_s ?? 0)) / 60)), s = J(() => se(n.plan));
	var c = bn(), u = P(c), f = (e) => {
		var t = pn(), r = P(t, !0), i = Z(r), a = (e) => {
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
	var p = Z(u, 2), m = P(p), h = U(m, !0), v = Z(m, 2), b = (e) => {
		var t = mn();
		let r;
		var i = U(t, !0);
		B(() => {
			r = l(t, 1, "tag svelte-1y5m0aq", null, r, { due: n.plan.due_today }), y(i, n.plan.due_today ? "Due today" : "Rest day");
		}), T(e, t);
	};
	N(v, (e) => {
		C(i) && e(b);
	}), W(p);
	var x = Z(p, 2), S = (e) => {
		var n = gn(), r = t(n);
		q(r, 21, () => C(a), D, (e, t) => {
			var n = hn();
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
	N(x, (e) => {
		C(a).length && e(S);
	});
	var w = Z(x, 2), E = (e) => {
		var t = vn(), r = P(t, !0), i = Z(r), a = (e) => {
			var t = _n(), r = U(t);
			B(() => y(r, `${C(s) ? " · " : ""}${n.plan.review_pending ?? ""} ${n.plan.review_pending === 1 ? "run" : "runs"} to review`)), T(e, t);
		};
		N(i, (e) => {
			n.plan.review_pending && e(a);
		}), W(t), B(() => y(r, C(s))), T(e, t);
	};
	N(w, (e) => {
		(C(s) || n.plan.review_pending) && e(E);
	});
	var O = Z(w, 2), k = (e) => {
		var t = yn();
		z("click", t, function(...e) {
			n.onchange?.apply(this, e);
		}), T(e, t);
	};
	N(O, (e) => {
		r() && e(k);
	}), W(c), B(() => y(h, n.plan.state)), T(e, c), X();
}
R(["click"]);
// src/lib/ui/PlanSession.svelte
var Sn = $("<label class=\"line svelte-dinfsf\"><span class=\"lbl svelte-dinfsf\"> </span> <input class=\"field num svelte-dinfsf\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"180\" step=\"0.5\"/> min</label>"), Cn = $("<button type=\"button\" class=\"del press svelte-dinfsf\">×</button>"), wn = $("<div class=\"line iv svelte-dinfsf\" role=\"group\"><select class=\"field svelte-dinfsf\"><option>Run</option><option>Walk</option></select> <input class=\"field num svelte-dinfsf\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"180\"/> <span aria-hidden=\"true\">:</span> <input class=\"field num svelte-dinfsf\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"59\"/> <button type=\"button\" class=\"del press svelte-dinfsf\">×</button></div>"), Tn = $("<div class=\"line svelte-dinfsf\" role=\"group\" aria-label=\"Times through the intervals\"><span class=\"lbl svelte-dinfsf\" aria-hidden=\"true\">Times</span> <button type=\"button\" class=\"pm press\" aria-label=\"Fewer times\">−</button> <output aria-live=\"polite\" class=\"svelte-dinfsf\"> </output> <button type=\"button\" class=\"pm press\" aria-label=\"More times\">+</button></div>"), En = $("<!> <button type=\"button\" class=\"btn press svelte-dinfsf\">Add interval</button> <!>", 1), Dn = $("<label><input class=\"sr svelte-dinfsf\" type=\"radio\"/> </label>"), On = $("<label class=\"line svelte-dinfsf\"><span class=\"lbl svelte-dinfsf\">Distance</span> <input class=\"field num svelte-dinfsf\" type=\"number\" inputmode=\"decimal\" min=\"0.1\" max=\"100\" step=\"0.1\"/> km</label>"), kn = $("<i class=\"svelte-dinfsf\"></i>"), An = $("<div class=\"segs svelte-dinfsf\" role=\"img\" aria-label=\"Run and walk intervals\"></div>"), jn = $("<fieldset class=\"session svelte-dinfsf\"><legend class=\"svelte-dinfsf\"> </legend> <!> <!> <!> <!> <div class=\"seg svelte-dinfsf\" role=\"radiogroup\" aria-label=\"Done when\"></div> <p class=\"caption svelte-dinfsf\"> </p> <!> <label class=\"line note svelte-dinfsf\"><span class=\"lbl svelte-dinfsf\">Note</span> <input class=\"field svelte-dinfsf\" type=\"text\" maxlength=\"80\" placeholder=\"Easy pace\"/></label> <div class=\"preview svelte-dinfsf\" aria-live=\"polite\"><!> <p class=\"caption svelte-dinfsf\"> <!></p></div></fieldset>");
function Mn(e, n) {
	let r = oe();
	H(n, !0);
	let i = [], a = (e, t = Ye, n = Ye) => {
		var r = Sn(), i = P(r), a = U(i, !0), s = Z(i, 2);
		V(s), Ce(), W(r), B(() => {
			y(a, n()), ne(s, o()[t()] / 60);
		}), z("change", s, (e) => o(o()[t()] = h(e.currentTarget.valueAsNumber * 60), !0)), T(e, r);
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
	], f = J(() => o().target.type === "distance"), p = J(() => de(Re(o()))), m = J(() => C(f) ? [] : g(C(p))), h = (e) => Math.max(0, Math.round(e)) || 0, v = (e, t, n) => e[1] = h(t) * 60 + h(n);
	var b = jn(), x = P(b), S = U(x, !0), w = Z(x, 2), E = (e) => {
		var t = Cn();
		B(() => Q(t, "aria-label", `Delete ${n.label ?? ""}`)), z("click", t, function(...e) {
			c()?.apply(this, e);
		}), T(e, t);
	};
	N(w, (e) => {
		c() && e(E);
	});
	var O = Z(w, 2);
	a(O, () => "warmup_s", () => "Warm-up walk");
	var k = Z(O, 2), A = (e) => {
		var n = En(), r = t(n);
		q(r, 17, () => o().intervals, D, (e, t, n) => {
			var r = wn();
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
			}, [() => Math.floor(C(t)[1] / 60)]), s(i, () => C(t)[0], (e) => C(t)[0] = e), z("change", l, (e) => v(C(t), e.currentTarget.valueAsNumber, C(t)[1] % 60)), z("change", u, (e) => v(C(t), Math.floor(C(t)[1] / 60), e.currentTarget.valueAsNumber)), z("click", d, () => o().intervals.splice(n, 1)), T(e, r);
		});
		var i = Z(r, 2), a = Z(i, 2), c = (e) => {
			var t = Tn(), n = Z(P(t), 2), r = Z(n, 2), i = U(r, !0), a = Z(r, 2);
			W(t), B(() => {
				n.disabled = o().times <= 1, y(i, o().times), a.disabled = o().times >= 50;
			}), z("click", n, () => o(o().times--, !0)), z("click", a, () => o(o().times++, !0)), T(e, t);
		};
		N(a, (e) => {
			o().intervals.length && e(c);
		}), B(() => i.disabled = o().intervals.length >= 30), z("click", i, () => o().intervals.push([o().intervals.at(-1)?.[0] === "run" ? "walk" : "run", 60])), T(e, n);
	};
	N(k, (e) => {
		C(f) || e(A);
	});
	var j = Z(k, 2);
	a(j, () => "cooldown_s", () => "Cool-down walk");
	var M = Z(j, 2);
	q(M, 21, () => u, (e) => e.type, (e, t) => {
		var n = Dn();
		let a;
		var s = P(n);
		V(s);
		var c, u = Z(s, 1, !0);
		W(n), B(() => {
			a = l(n, 1, "svelte-dinfsf", null, a, { on: o().target.type === C(t).type }), Q(s, "name", `${r}-done`), c !== (c = C(t).type) && (s.value = (s.__value = c) ?? ""), y(u, C(t).label);
		}), lt(i, [], s, () => (C(t).type, o().target.type), (e) => o(o().target.type = e, !0)), T(e, n);
	}), W(M);
	var F = Z(M, 2), I = U(F, !0), te = Z(F, 2), L = (e) => {
		var t = On(), n = Z(P(t), 2);
		V(n), Ce(), W(t), B(() => ne(n, o().target.km)), z("change", n, (e) => o(o().target.km = Math.round(e.currentTarget.valueAsNumber * 10) / 10 || 0, !0)), T(e, t);
	};
	N(te, (e) => {
		C(f) && e(L);
	});
	var re = Z(te, 2), ie = Z(P(re), 2);
	V(ie), W(re);
	var R = Z(re, 2), ae = P(R), ce = (e) => {
		var t = An();
		q(t, 21, () => C(m), D, (e, t) => {
			var n = kn();
			let r;
			B(() => r = d(n, "", r, {
				"flex-grow": C(t).frac,
				background: `var(--${C(t).kind === "run" ? "run" : "fill"})`
			})), T(e, n);
		}), W(t), T(e, t);
	};
	N(ae, (e) => {
		C(m).length && e(ce);
	});
	var le = Z(ae, 2), ue = P(le, !0), fe = Z(ue), pe = (e) => {
		var t = _();
		B((e) => y(t, `· ${e ?? ""} min`), [() => Math.round(ee(o()) / 60)]), T(e, t);
	};
	N(fe, (e) => {
		C(f) || e(pe);
	}), W(le), W(R), W(b), B((e, t) => {
		y(S, n.label), y(I, e), y(ue, t);
	}, [() => u.find((e) => e.type === o().target.type).hint, () => se(C(p)) || "No run yet"]), mt(ie, () => o().note, (e) => o(o().note = e, !0)), T(e, b), X();
}
R(["change", "click"]);
// src/lib/ui/PlanBuilder.svelte
var Nn = $("<!> <div class=\"acts svelte-1axo6sg\"><button type=\"button\" class=\"btn press\">Add session</button> <button type=\"button\" class=\"btn press\">Duplicate week</button> <button type=\"button\" class=\"btn danger press\">Delete week</button></div>", 1), Pn = $("<section class=\"card week svelte-1axo6sg\"><h3 class=\"svelte-1axo6sg\"><button type=\"button\" class=\"wk svelte-1axo6sg\"> <span class=\"caption\"> </span><span class=\"chev svelte-1axo6sg\" aria-hidden=\"true\"> </span></button></h3> <!></section>"), Fn = $("<p class=\"error svelte-1axo6sg\" role=\"alert\"> </p>"), In = $("<div class=\"builder svelte-1axo6sg\"><button type=\"button\" class=\"back press svelte-1axo6sg\"><span aria-hidden=\"true\">‹</span> Back</button> <h2 class=\"svelte-1axo6sg\"> </h2> <div class=\"card head svelte-1axo6sg\"><label class=\"line svelte-1axo6sg\"><span class=\"lbl svelte-1axo6sg\">Name</span> <input class=\"field svelte-1axo6sg\" type=\"text\" maxlength=\"40\" placeholder=\"My easy week\"/></label> <label class=\"line toggle svelte-1axo6sg\"><span class=\"lbl svelte-1axo6sg\">Repeat when done<small class=\"caption\">Starts again at week 1, never graduates</small></span> <input type=\"checkbox\" class=\"svelte-1axo6sg\"/></label></div> <!> <button type=\"button\" class=\"btn press\">Add week</button> <!> <button type=\"button\" class=\"btn primary press\">Save</button></div>");
function Ln(e, n) {
	let r = oe();
	H(n, !0);
	let i = G(n, "from", 3, null), a = () => ce({
		warmup_s: 300,
		cooldown_s: 300,
		intervals: [["run", 60], ["walk", 90]],
		target: { type: "duration" }
	}), s = (e) => o(e.weeks).map((e) => ({ sessions: e.sessions.map(ce) })), c = (e) => n.mode === "copy" ? `${e.name.slice(0, 33)} (copy)` : e.name, l = (e) => e ? {
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
			weeks: e.weeks.map((e) => ({ sessions: e.sessions.map(ue) }))
		}, r = await Pt({
			op: "save",
			...n.mode === "edit" && { id: i().id },
			plan: t
		});
		Y(f, !1), Y(p, r.error ?? null, !0);
		let a = /^weeks\.(\d+)/.exec(C(p) ?? "");
		a && Y(d, a[1] - 1), C(p) || (Tt(`Saved ${t.name}`), n.onback());
	}
	var v = In(), b = P(v);
	je(b, (e) => m = e, () => m);
	var S = Z(b, 2), w = U(S, !0), E = Z(S, 2), D = P(E), O = Z(P(D), 2);
	V(O), W(D);
	var k = Z(D, 2), A = Z(P(k), 2);
	V(A), W(k), W(E);
	var j = Z(E, 2);
	q(j, 18, () => u.weeks, (e) => e, (e, n, i) => {
		var o = Pn(), s = P(o), c = P(s), l = P(c), f = Z(l), p = U(f), m = Z(f), _ = U(m, !0);
		W(c), W(s);
		var v = Z(s, 2), b = (e) => {
			var r = Nn(), o = t(r);
			q(o, 18, () => n.sessions, (e) => e, (e, t, r) => {
				{
					let t = J(() => C(i) + 1), a = J(() => C(r) + 1), o = J(() => n.sessions.length > 1 ? () => n.sessions.splice(C(r), 1) : null);
					Mn(e, {
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
			}), z("click", c, () => n.sessions.push(a())), z("click", l, () => g(C(i) + 1, structuredClone(Re(n)))), z("click", f, () => {
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
		var t = Fn(), n = U(t, !0);
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
var Rn = $("<button type=\"button\" class=\"btn danger press\">Stop plan</button>"), zn = $("<p class=\"msg\" role=\"status\"> </p>"), Bn = $("<span role=\"img\" aria-label=\"In use\">🔒</span>"), Vn = $("<span class=\"mini svelte-1kupfy5\">Current</span>"), Hn = $("<a class=\"caption by svelte-1kupfy5\" target=\"_blank\" rel=\"noopener noreferrer\"> </a>"), Un = $("<span class=\"caption by svelte-1kupfy5\"> </span>"), Wn = $("<span class=\"ask svelte-1kupfy5\"> </span> <button type=\"button\" class=\"btn press\">Cancel</button> <button type=\"button\" class=\"btn danger press\">Delete</button>", 1), Gn = $("<button type=\"button\" class=\"btn danger press\">Delete</button>"), Kn = $("<button type=\"button\" class=\"btn press\">Edit</button> <!>", 1), qn = $("<button type=\"button\" class=\"btn press\">Copy & edit</button> <!>", 1), Jn = $("<div class=\"acts svelte-1kupfy5\"><div class=\"stepper svelte-1kupfy5\" role=\"group\" aria-label=\"Start week\"><span class=\"lbl svelte-1kupfy5\" aria-hidden=\"true\">Start at week</span> <button type=\"button\" class=\"pm press\" aria-label=\"Earlier start week\">−</button> <output aria-live=\"polite\" class=\"svelte-1kupfy5\"> </output> <button type=\"button\" class=\"pm press\" aria-label=\"Later start week\">+</button></div> <button type=\"button\" class=\"btn primary press wide svelte-1kupfy5\">Start today</button> <!></div>"), Yn = $("<li class=\"svelte-1kupfy5\"><button type=\"button\" class=\"row svelte-1kupfy5\"><span class=\"name svelte-1kupfy5\"> <!> <!></span> <span class=\"caption\"> </span></button> <!> <!></li>"), Xn = $("<button type=\"button\" class=\"btn press\">New plan</button>"), Zn = $("<ul class=\"card svelte-1kupfy5\"></ul> <!>", 1), Qn = $("<div class=\"picker svelte-1kupfy5\"><button type=\"button\" class=\"back press svelte-1kupfy5\"><span aria-hidden=\"true\">‹</span> Back</button> <h2 class=\"svelte-1kupfy5\"> </h2> <!> <!></div>");
function $n(e, n) {
	let r = oe();
	H(n, !0);
	let i = G(n, "people", 19, () => ({})), a = J(() => n.viewer?.person != null), o = K(null), s = K(null), c = K(null), l = K(1), u = K(!1), d = K(null), f, p = () => Oe("plans").then((e) => Y(o, e.plans, !0), (e) => Y(s, e, !0));
	we(() => {
		f.focus(), p();
	});
	let m = (e) => {
		try {
			return new URL(e).hostname.replace(/^www\./, "");
		} catch {
			return "Source";
		}
	};
	function h(e) {
		Y(c, C(c) === e.id ? null : e.id, !0), Y(l, 1), Y(d, null);
	}
	async function g(e, t, n) {
		Y(u, !0);
		let r = await Pt(e);
		Y(u, !1), Tt(r.error ?? t), r.error || n();
	}
	let _ = (e) => g({
		op: "start",
		person: n.person,
		plan: e.id,
		start_week: C(l)
	}, `Started ${e.name}`, n.onback), v = () => g({
		op: "stop",
		person: n.person
	}, "Plan stopped", n.onback), b = (e) => g({
		op: "delete",
		id: e.id
	}, `Deleted ${e.name}`, () => {
		Y(c, Y(d, null), !0), p();
	});
	var x = Qn(), S = P(x);
	je(S, (e) => f = e, () => f);
	var w = Z(S, 2), E = U(w, !0), D = Z(w, 2), O = (e) => {
		var t = Rn();
		B(() => t.disabled = C(u)), z("click", t, v), T(e, t);
	};
	N(D, (e) => {
		n.current && e(O);
	});
	var k = Z(D, 2), A = (e) => {
		var t = zn(), n = U(t, !0);
		B(() => y(n, C(s) ? C(s).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), T(e, t);
	}, j = (e) => {
		var s = Zn(), f = t(s);
		q(f, 21, () => C(o), (e) => e.id, (e, r) => {
			let o = J(() => C(c) === C(r).id);
			var s = Yn(), f = P(s), p = P(f), g = P(p), v = Z(g), x = (e) => {
				var t = Bn();
				T(e, t);
			};
			N(v, (e) => {
				C(r).used && e(x);
			});
			var S = Z(v, 2), w = (e) => {
				var t = Vn();
				T(e, t);
			};
			N(S, (e) => {
				C(r).id === n.current?.plan && e(w);
			}), W(p);
			var E = Z(p, 2), D = U(E, !0);
			W(f);
			var O = Z(f, 2), k = (e) => {
				var t = Hn(), n = U(t, !0);
				B((e) => {
					Q(t, "href", C(r).source), y(n, e);
				}, [() => m(C(r).source)]), T(e, t);
			}, A = (e) => {
				var t = Un(), n = U(t);
				B(() => y(n, `by ${i()[C(r).by]?.name ?? C(r).by ?? ""}`)), T(e, t);
			};
			N(O, (e) => {
				C(r).source ? e(k) : C(r).by && e(A, 1);
			});
			var j = Z(O, 2), M = (e) => {
				var i = Jn(), o = P(i), s = Z(P(o), 2), c = Z(s, 2), f = U(c, !0), p = Z(c, 2);
				W(o);
				var m = Z(o, 2), h = Z(m, 2), g = (e) => {
					var i = qn(), a = t(i), o = Z(a, 2), s = (e) => {
						var i = Kn(), a = t(i), o = Z(a, 2), s = (e) => {
							var n = Wn(), i = t(n), a = U(i), o = Z(i, 2), s = Z(o, 2);
							B(() => {
								y(a, `Delete ${C(r).name ?? ""}?`), s.disabled = C(u);
							}), z("click", o, () => Y(d, null)), z("click", s, () => b(C(r))), T(e, n);
						}, c = (e) => {
							var t = Gn();
							z("click", t, () => Y(d, C(r).id, !0)), T(e, t);
						};
						N(o, (e) => {
							C(d) === C(r).id ? e(s) : e(c, -1);
						}), z("click", a, () => n.onbuild(C(r), "edit")), T(e, i);
					};
					N(o, (e) => {
						C(r).custom && !C(r).used && e(s);
					}), z("click", a, () => n.onbuild(C(r), "copy")), T(e, i);
				};
				N(h, (e) => {
					C(a) && e(g);
				}), W(i), B(() => {
					s.disabled = C(l) <= 1, y(f, C(l)), p.disabled = C(l) >= C(r).weeks.length, m.disabled = C(u);
				}), z("click", s, () => _e(l, -1)), z("click", p, () => _e(l)), z("click", m, () => _(C(r))), T(e, i);
			};
			N(j, (e) => {
				C(o) && e(M);
			}), W(s), B((e) => {
				Q(f, "aria-expanded", C(o)), y(g, `${C(r).name ?? ""} `), y(D, e);
			}, [() => ie(C(r))]), z("click", f, () => h(C(r))), T(e, s);
		}), W(f);
		var p = Z(f, 2), g = (e) => {
			var t = Xn();
			z("click", t, () => n.onbuild(null, "new")), T(e, t);
		};
		N(p, (e) => {
			C(a) && e(g);
		}), B(() => Q(f, "aria-labelledby", `${r}-t`)), T(e, s);
	};
	N(k, (e) => {
		C(o) ? e(j, -1) : e(A);
	}), W(x), B(() => {
		Q(w, "id", `${r}-t`), y(E, n.current ? "Change plan" : "Choose a plan");
	}), z("click", S, function(...e) {
		n.onback?.apply(this, e);
	}), T(e, x), X();
}
R(["click"]);
// src/lib/gesture.js
var er = (e, t = .998) => e / 1e3 * t / (1 - t), tr = (e, t, n) => e + er(t) > n / 2;
function nr(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var rr = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), ir = $("<h2 class=\"svelte-9pi54v\"> </h2> <button type=\"button\" class=\"close press svelte-9pi54v\" aria-label=\"Close\">✕</button>", 1), ar = $("<div class=\"grab drag svelte-9pi54v\"><!></div>"), or = $("<div class=\"grab svelte-9pi54v\"><!></div>"), sr = $("<dialog><!> <div class=\"body svelte-9pi54v\"><!></div></dialog>");
function cr(e, n) {
	let i = oe();
	H(n, !0);
	let a = (e) => {
		var r = ir(), a = t(r), o = U(a, !0), s = Z(a, 2);
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
		}], n = nr([...m.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		m = null, Y(g, !1), tr(C(p), n, u.offsetHeight) ? u.close() : Y(p, 0);
	}
	var O = {
		show: b,
		close: x
	}, k = sr();
	let A, j;
	var M = P(k), ee = (e) => {
		var t = ar(), n = P(t);
		a(n), W(t), z("pointerdown", t, w), z("pointermove", t, E), z("pointerup", t, D), h("pointercancel", t, D), T(e, t);
	}, F = (e) => {
		var t = or(), n = P(t);
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
var lr = $("<li class=\"svelte-18znx9k\"><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), ur = $("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1);
function dr(e, n) {
	H(n, !0);
	let r;
	function i(e = null) {
		let t = r.show();
		t && (t.scrollTop = 0, e && t.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	var a = { open: i };
	return je(cr(e, {
		title: "All records",
		drag: !0,
		children: (e, r) => {
			var i = I(), a = t(i);
			q(a, 17, () => n.groups, (e) => e.group, (e, n) => {
				var r = ur(), i = t(r), a = U(i, !0), o = Z(i, 2);
				q(o, 21, () => C(n).lifts, (e) => e.id, (e, t) => {
					var n = lr(), r = P(n), i = P(r), a = Z(i), o = U(a, !0), s = Z(a);
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
var fr = $("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), pr = $("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), mr = $("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function hr(e, t) {
	H(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), r = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var i = mr(), a = P(i);
	q(a, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = fr();
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
		var n = pr();
		let r;
		B(() => r = d(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), T(e, n);
	};
	N(o, (e) => {
		t.goalFrac !== null && e(s);
	}), W(i), T(e, i), X();
}
// src/lib/ui/Progress.svelte
var gr = $("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), _r = $("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), vr = $("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), yr = $("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), br = $("<span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span>", 1), xr = $("<button type=\"button\" class=\"row svelte-kr1x1f\"><!></button>"), Sr = $("<div class=\"row svelte-kr1x1f\"><!></div>"), Cr = $("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), wr = $("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function Tr(e, n) {
	H(n, !0);
	let r = J(() => n.person.week.goal.steps ?? 0), a = J(() => xe(n.person.steps_week, C(r), f())), o = J(() => n.person.pbs.lifts ?? []), s = J(() => A(C(o))), c, l = J(() => n.person.pbs.fastest_1k), u = J(() => n.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var d = wr(), p = t(d), m = (e) => {
		var t = gr(), n = P(t);
		hr(n, {
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
		var n = vr(), r = t(n);
		q(r, 21, () => C(s), (e) => e.group, (e, t) => {
			var n = _r(), r = P(n), i = P(r), a = U(i, !0), o = Z(i), s = P(o), l = Z(s), u = U(l, !0);
			W(o), W(r), W(n), B((e) => {
				y(a, C(t).group), y(s, `${C(t).lift.name ?? ""} · `), y(u, e);
			}, [() => M(C(t).lift)]), z("click", r, () => c.open(C(t).group)), T(e, n);
		}), W(r);
		var i = Z(r, 2), a = U(i);
		B(() => y(a, `All records (${C(o).length ?? ""})`)), z("click", i, () => c.open()), T(e, n);
	}, v = (e) => {
		var t = yr();
		T(e, t);
	};
	N(g, (e) => {
		C(o).length ? e(_) : e(v, -1);
	}), W(h);
	var b = Z(h, 2), x = P(b), S = (e) => {
		let r = (e) => {
			var n = br(), r = Z(t(n), 2), a = U(r);
			B((e, t) => y(a, `${e ?? ""} · ${t ?? ""}`), [() => i(C(l).seconds), () => $e(C(l).date)]), T(e, n);
		};
		var a = I(), o = t(a), s = (e) => {
			var t = xr(), i = P(t);
			r(i), W(t), z("click", t, () => n.onopen({ key: C(l).key })), T(e, t);
		}, c = (e) => {
			var t = Sr(), n = P(t);
			r(n), W(t), T(e, t);
		};
		N(o, (e) => {
			C(l).key ? e(s) : e(c, -1);
		}), T(e, a);
	}, w = (e) => {
		var t = Cr();
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
		je(dr(F, { get groups() {
			return C(e);
		} }), (e) => c = e, () => c);
	}
	B((e) => {
		y(O, `${e ?? ""} km`), y(ee, `${C(u) ?? ""} t`);
	}, [() => n.person.pbs.longest_session_km.toFixed(1)]), T(e, d), X();
}
R(["click"]);
// src/lib/ui/Shoes.svelte
var Er = $("<span class=\"label svelte-eu7fja\"> </span>"), Dr = $("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), Or = $("<ul class=\"card svelte-eu7fja\"></ul>");
function kr(e, t) {
	H(t, !0);
	let n = J(() => t.shoes.map(rt));
	var r = Or();
	q(r, 23, () => C(n), (e, n) => t.shoes[n].id, (e, t) => {
		var n = Dr(), r = P(n), i = P(r), a = U(i, !0), o = Z(i), s = U(o, !0);
		W(r);
		var c = Z(r, 2), u = P(c);
		let f;
		W(c);
		var p = Z(c, 2), m = P(p), h = U(m, !0), g = Z(m, 2), _ = (e) => {
			var n = Er(), r = U(n, !0);
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
var Ar = $("<span class=\"mini svelte-1bogt6u\">Current</span>"), jr = $("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Mr = $("<button type=\"button\" class=\"btn\">Set current</button>"), Nr = $("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Pr = $("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), Fr = $("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe until you set one.</p>"), Ir = $("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), Lr = $("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), Rr = $("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), zr = $("<!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form>", 1);
function Br(n, r) {
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
		let t = await jt(e);
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
	return je(cr(n, {
		title: "Manage shoes",
		onclose: f,
		children: (e, n) => {
			var a = zr(), d = t(a), f = (e) => {
				var n = Ir(), a = t(n);
				q(a, 21, () => C(i), (e) => e.id, (e, n) => {
					var i = Pr(), a = P(i), o = P(a), s = P(o, !0), c = Z(s), d = (e) => {
						var t = Ar();
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
						var r = jr(), i = t(r), a = U(i), o = Z(i, 2), s = Z(o, 2);
						B(() => {
							y(a, `Retire ${C(n).name ?? ""}?`), s.disabled = C(l);
						}), z("click", o, () => Y(u, null)), z("click", s, () => _(C(n))), T(e, r);
					}, w = (e) => {
						var i = Nr(), a = t(i), o = (e) => {
							var t = Mr();
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
					var t = Fr();
					T(e, t);
				}, c = J(() => !C(i).some((e) => e.current));
				N(o, (e) => {
					C(c) && e(s);
				}), T(e, n);
			}, v = (e) => {
				var t = Lr();
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
				var t = Rr(), n = U(t, !0);
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
var Vr = $("<p class=\"msg\" role=\"status\"> </p>"), Hr = $("<p class=\"msg\" role=\"status\">Loading…</p>"), Ur = $("<span class=\"mini svelte-1uaoa1p\"> </span>"), Wr = $("<span class=\"mini off svelte-1uaoa1p\"> </span>"), Gr = $("<div><dt class=\"svelte-1uaoa1p\"> </dt><dd class=\"svelte-1uaoa1p\"> </dd></div>"), Kr = $("<option disabled=\"\"> </option>"), qr = $("<option> </option>"), Jr = $("<div class=\"shoe svelte-1uaoa1p\"><dt class=\"svelte-1uaoa1p\"><label>Shoe</label></dt><dd class=\"svelte-1uaoa1p\"><select class=\"svelte-1uaoa1p\"><!><!></select></dd></div>"), Yr = $("<dl class=\"svelte-1uaoa1p\"><!> <!></dl>"), Xr = $("<p class=\"caption note svelte-1uaoa1p\"> </p>"), Zr = $("<p> </p>"), Qr = $("<p class=\"check svelte-1uaoa1p\"> </p>"), $r = $("<button type=\"button\">Not a run…</button>"), ei = $("<select aria-label=\"Change the type to\" class=\"svelte-1uaoa1p\"><option disabled=\"\">Choose a type</option><!><!></select>"), ti = $("<button type=\"button\" class=\"link svelte-1uaoa1p\">Clear decision</button>"), ni = $("<div class=\"acts review svelte-1uaoa1p\"><button type=\"button\">Counts for the plan day</button> <button type=\"button\">A run, not the programme</button> <!> <!> <!></div>"), ri = $("<h3 class=\"svelte-1uaoa1p\">Programme</h3> <!> <!>", 1), ii = $("<p class=\"caption note svelte-1uaoa1p\">Map unavailable</p>"), ai = $("<div class=\"ph svelte-1uaoa1p\" aria-hidden=\"true\"></div>"), oi = $("<h3 class=\"svelte-1uaoa1p\"> </h3> <!>", 1), si = $("<!> <!>", 1), ci = $("<li class=\"svelte-1uaoa1p\"><span class=\"zn svelte-1uaoa1p\"> <small class=\"svelte-1uaoa1p\"> </small></span> <span class=\"bar svelte-1uaoa1p\"><span class=\"svelte-1uaoa1p\"></span></span> <span class=\"num svelte-1uaoa1p\"> </span></li>"), li = $("<h3 class=\"svelte-1uaoa1p\">Heart-rate zones</h3> <ul class=\"zones svelte-1uaoa1p\"></ul>", 1), ui = $("<tr><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td></tr>"), di = $("<h3 class=\"svelte-1uaoa1p\">Splits</h3> <table class=\"svelte-1uaoa1p\"><thead><tr><th class=\"svelte-1uaoa1p\">Km</th><th class=\"svelte-1uaoa1p\">Time</th><th class=\"svelte-1uaoa1p\"> </th><th class=\"svelte-1uaoa1p\">HR</th><th class=\"svelte-1uaoa1p\">Climb</th></tr></thead><tbody></tbody></table>", 1), fi = $("<span role=\"img\" aria-label=\"Record\">🏆</span>"), pi = $("<li class=\"svelte-1uaoa1p\"> <b class=\"svelte-1uaoa1p\"> </b><!></li>"), mi = $("<h3 class=\"svelte-1uaoa1p\">Exercises</h3> <ul class=\"gym svelte-1uaoa1p\"><!> <li class=\"vol svelte-1uaoa1p\">Total volume · <b class=\"svelte-1uaoa1p\"> </b></li></ul>", 1), hi = $("<span class=\"ask svelte-1uaoa1p\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1uaoa1p\">Delete</button>", 1), gi = $("<button type=\"button\"> </button>"), _i = $("<div class=\"acts svelte-1uaoa1p\"><!></div>"), vi = $("<p class=\"sub svelte-1uaoa1p\"> <!> <!></p> <!> <!> <!> <!> <!> <!> <!> <!>", 1);
function yi(e, n) {
	let r = oe();
	H(n, !0);
	let i = G(n, "shoes", 3, null), a = G(n, "reviewTypes", 19, () => ({})), o = () => import("./viz-Ciaz47cb.js"), s, c = K(null), u = K(null), f = K(null), p = K(null), m = K(null), h = K(!1), g = K(!1), _ = 0;
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
		await Nt(n.person, C(c).key, Number(t.value)) || (t.value = String(C(O).value));
	}
	let ce = (e, t = null, r = "") => Mt(n.person, C(c).key, e, t, r);
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
		C(E).remove === "delete" ? Y(h, !0) : Ot(n.person, C(c).key, C(E).remove);
	}
	var fe = { open: v };
	{
		let i = J(() => C(k)?.title ?? C(c)?.name ?? "Workout");
		je(cr(e, {
			get title() {
				return C(i);
			},
			drag: !0,
			wide: !0,
			onclose: b,
			children: (e, i) => {
				var a = I(), o = t(a), _ = (e) => {
					var t = Vr(), n = U(t, !0);
					B((e) => y(n, e), [() => ae(C(f))]), T(e, t);
				}, v = (e) => {
					var t = Hr();
					T(e, t);
				}, b = (e) => {
					var i = vi(), a = t(i), o = P(a), f = Z(o), _ = (e) => {
						var t = Ur(), n = U(t, !0);
						B(() => y(n, C(k).plan)), T(e, t);
					};
					N(f, (e) => {
						C(k).plan && e(_);
					});
					var v = Z(f, 2), b = (e) => {
						var t = Wr(), n = U(t, !0);
						B((e) => y(n, e), [() => ut(C(w)).label]), T(e, t);
					}, x = J(() => C(w) && ut(C(w)).label);
					N(v, (e) => {
						C(x) && e(b);
					}), W(a);
					var ae = Z(a, 2), oe = (e) => {
						var t = Yr(), n = P(t);
						q(n, 17, () => C(A), ([e, t]) => e, (e, t) => {
							var n = J(() => Ve(C(t), 2));
							let r = () => C(n)[0], i = () => C(n)[1];
							var a = Gr(), o = P(a), s = U(o, !0), c = Z(o), l = U(c, !0);
							W(a), B(() => {
								y(s, r()), y(l, i());
							}), T(e, a);
						});
						var i = Z(n, 2), a = (e) => {
							var t = Jr(), n = P(t), i = U(n), a = Z(n), o = P(a), s = P(o), c = (e) => {
								var t = Kr(), n = U(t, !0);
								t.value = t.__value = "", B(() => y(n, C(O).extra)), T(e, t);
							};
							N(s, (e) => {
								C(O).extra && e(c);
							});
							var l = Z(s);
							q(l, 17, () => C(O).options, (e) => e.id, (e, t) => {
								var n = qr(), r = U(n, !0), i = {};
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
						var t = Xr(), n = U(t, !0);
						B((e) => y(n, e), [() => be(C(u).note)]), T(e, t);
					}, me = J(() => be(C(u).note));
					N(fe, (e) => {
						C(me) && e(pe);
					});
					var he = Z(fe, 2), ge = (e) => {
						var n = ri(), r = Z(t(n), 2), i = (e) => {
							var t = Zr();
							let n;
							var r = U(t, !0);
							B((e) => {
								n = l(t, 1, "check svelte-1uaoa1p", null, n, { warn: C(w).needs_review }), y(r, e);
							}, [() => De(C(ne), C(R))]), T(e, t);
						}, a = (e) => {
							var t = Qr(), n = U(t);
							B((e) => y(n, `Changed to ${e ?? ""}`), [() => C(ie).find((e) => e.match === C(L).type_match)?.name ?? C(L).type_match]), T(e, t);
						};
						N(r, (e) => {
							C(ne) ? e(i) : C(L).decision === "type" && e(a, 1);
						});
						var o = Z(r, 2), s = (e) => {
							var t = ni(), n = P(t);
							let r;
							var i = Z(n, 2);
							let a;
							var o = Z(i, 2), s = (e) => {
								var t = $r();
								let n;
								B(() => {
									n = l(t, 1, "btn svelte-1uaoa1p", null, n, { on: C(L)?.decision === "type" }), Q(t, "aria-pressed", C(L)?.decision === "type");
								}), z("click", t, () => Y(g, !C(g))), T(e, t);
							};
							N(o, (e) => {
								C(ie).length && e(s);
							});
							var c = Z(o, 2), u = (e) => {
								var t = ei(), n = P(t);
								n.value = n.__value = "";
								var r = Z(n), i = (e) => {
									var t = qr(), n = U(t, !0), r = {};
									B(() => {
										y(n, C(L).type_match), r !== (r = C(L).type_match) && (t.value = (t.__value = r) ?? "");
									}), T(e, t);
								}, a = J(() => C(L)?.type_match && !C(ie).some((e) => e.match === C(L).type_match));
								N(r, (e) => {
									C(a) && e(i);
								});
								var o = Z(r);
								q(o, 17, () => C(ie), (e) => e.match, (e, t) => {
									var n = qr(), r = U(n, !0), i = {};
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
								var t = ti();
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
							var t = ii();
							T(e, t);
						}, a = (e) => {
							var t = ai();
							let n;
							B(() => n = d(t, "", n, { height: `${C(u).route?.length ? 220 : 0}px` })), T(e, t);
						}, o = (e) => {
							var n = si(), r = t(n), i = (e) => {
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
								var r = oi(), i = t(r), a = U(i, !0), o = Z(i, 2);
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
						var n = li(), r = Z(t(n), 2);
						q(r, 21, () => C(M), (e) => e.zone, (e, t) => {
							var n = ci(), r = P(n), i = P(r), a = Z(i), o = U(a, !0);
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
						var n = di(), r = Z(t(n), 2), i = P(r), a = P(i), o = Z(P(a), 2), s = U(o, !0);
						Ce(2), W(a), W(i);
						var c = Z(i);
						q(c, 21, () => C(ee), D, (e, t) => {
							var n = ui(), r = P(n), i = U(r, !0), a = Z(r), o = U(a, !0), s = Z(a), c = U(s, !0), l = Z(s), u = U(l, !0), d = Z(l), f = U(d, !0);
							W(n), B(() => {
								y(i, C(t).km), y(o, C(t).time), y(c, C(t).pace), y(u, C(t).hr), y(f, C(t).climb);
							}), T(e, n);
						}), W(c), W(r), B(() => y(s, C(te) ? "km/h" : "Pace")), T(e, n);
					};
					N(H, (e) => {
						C(ee).length && e(xe);
					});
					var Se = Z(H, 2), we = (e) => {
						var n = mi(), r = Z(t(n), 2), i = P(r);
						q(i, 17, () => C(F).exercises, D, (e, t) => {
							var n = pi(), r = P(n), i = Z(r), a = U(i, !0), o = Z(i), s = (e) => {
								var t = fi();
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
						var r = _i(), i = P(r), a = (e) => {
							var r = hi(), i = Z(t(r), 2), a = Z(i, 2);
							z("click", i, () => Y(h, !1)), z("click", a, () => (Ot(n.person, C(c).key, "remove"), s.close())), T(e, r);
						}, o = (e) => {
							var t = gi();
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
var bi = $("<button type=\"button\" class=\"btn choose press svelte-1341oik\">Choose a plan</button>"), xi = $("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), Si = $("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), Ci = $("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), wi = $("<section><h2 class=\"svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), Ti = $("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!> <!> <!>", 1);
function Ei(e, n) {
	let r = oe();
	H(n, !0);
	let i = G(n, "people", 19, () => ({})), a = G(n, "connect", 3, null), o = G(n, "reviewTypes", 19, () => ({})), s = J(() => m(n.person.pbs)), c = J(() => Ge(n.person, n.canEdit)), l = K(void 0), u = K(void 0), d = (e) => C(u).open(e), f = K(null);
	var p = I(), h = t(p), g = (e) => {
		$n(e, {
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
			onback: () => Y(f, null),
			onbuild: (e, t) => Y(f, {
				from: e,
				mode: t
			}, !0)
		});
	}, _ = (e) => {
		Ln(e, {
			get from() {
				return C(f).from;
			},
			get mode() {
				return C(f).mode;
			},
			onback: () => Y(f, "pick")
		});
	}, v = (e) => {
		var i = Ti(), p = t(i), m = (e) => {
			var t = xi(), i = P(t), a = Z(i, 2), o = (e) => {
				xn(e, {
					get plan() {
						return n.person.plan;
					},
					get canEdit() {
						return n.canEdit;
					},
					onchange: () => Y(f, "pick")
				});
			}, s = (e) => {
				var t = bi();
				z("click", t, () => Y(f, "pick")), T(e, t);
			};
			N(a, (e) => {
				n.person.plan ? e(o) : e(s, -1);
			}), W(t), B(() => {
				Q(t, "aria-labelledby", `${r}-plan`), Q(i, "id", `${r}-plan`);
			}), T(e, t);
		};
		N(p, (e) => {
			(n.person.plan || n.canEdit) && e(m);
		});
		var h = Z(p, 2), g = P(h), _ = Z(g, 2);
		k(_, () => n.id, (e) => {
			fn(e, {
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
		}), W(h);
		var v = Z(h, 2), b = P(v), x = Z(P(b)), S = U(x);
		W(b), Xt(Z(b, 2), { get badges() {
			return n.person.badges;
		} }), W(v);
		var w = Z(v, 2), E = P(w);
		Tr(Z(E, 2), {
			get person() {
				return n.person;
			},
			onopen: d
		}), W(w);
		var D = Z(w, 2);
		{
			let e = J(() => C(c) ? n.person.shoes : null);
			je(yi(D, {
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
		var O = Z(D, 2), A = (e) => {
			var i = wi(), a = t(i), o = P(a), s = Z(P(o)), u = (e) => {
				var t = Si();
				z("click", t, () => C(l).open()), T(e, t);
			};
			N(s, (e) => {
				C(c) && e(u);
			}), W(o);
			var d = Z(o, 2), f = (e) => {
				kr(e, { get shoes() {
					return n.person.shoes;
				} });
			}, p = (e) => {
				var t = Ci();
				T(e, t);
			};
			N(d, (e) => {
				n.person.shoes.length ? e(f) : e(p, -1);
			}), W(a);
			var m = Z(a, 2), h = (e) => {
				je(Br(e, {
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
		N(O, (e) => {
			(n.person.shoes?.length || C(c)) && e(A);
		});
		var j = Z(O, 2), M = (e) => {
			Wt(e, {
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
		N(j, (e) => {
			a() && e(M);
		}), B(() => {
			Q(h, "aria-labelledby", `${r}-feed`), Q(g, "id", `${r}-feed`), Q(v, "aria-labelledby", `${r}-badges`), Q(b, "id", `${r}-badges`), y(S, `${n.person.badges.count ?? ""} unlocked`), Q(w, "aria-labelledby", `${r}-pbs`), Q(E, "id", `${r}-pbs`);
		}), T(e, i);
	};
	N(h, (e) => {
		C(f) === "pick" ? e(g) : C(f) ? e(_, 1) : e(v, -1);
	}), T(e, p), X();
}
R(["click"]);
// src/lib/ui/Goals.svelte
var Di = $("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), Oi = $("<p class=\"msg\" role=\"status\"> </p>"), ki = $("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!> <label class=\"year svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Birth year</span> <input type=\"number\" inputmode=\"numeric\" min=\"1900\" placeholder=\"1990\" class=\"svelte-7wncvy\"/></label> <p class=\"caption maxhr svelte-7wncvy\"> </p></section>"), Ai = $("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), ji = $("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), Mi = $("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), Ni = $("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function Pi(e, n) {
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
		var o = Di(), s = P(o), c = U(s, !0), l = Z(s, 2), u = Z(l, 2), d = U(u, !0), f = Z(u, 2);
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
	async function _() {
		Y(d, !0);
		let e = await Dt(Re(C(u)), n.people);
		Y(d, !1), e && n.onsaved();
	}
	var b = Ni(), x = Z(t(b), 2), S = (e) => {
		var t = Oi(), n = U(t, !0);
		B(() => y(n, C(s) ? C(s).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), T(e, t);
	}, w = (e) => {
		var s = Mi(), c = t(s), h = U(c), g = Z(c, 2);
		q(g, 16, () => Object.keys(C(u).people), (e) => e, (e, t) => {
			let i = J(() => n.people[t]?.name ?? t);
			var o = ki(), s = P(o), c = U(s, !0), l = Z(s, 2);
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
		var b = Z(g, 2), x = P(b), S = Z(x, 2);
		q(S, 21, () => p, (e) => e.mode, (e, t) => {
			var a = Ai();
			let o;
			var s = P(a);
			V(s);
			var c, d = Z(s, 1, !0);
			W(a), B(() => {
				o = l(a, 1, "svelte-7wncvy", null, o, { on: C(u).couple.mode === C(t).mode }), Q(s, "name", `${r}-mode`), s.disabled = n.readOnly, c !== (c = C(t).mode) && (s.value = (s.__value = c) ?? ""), y(d, C(t).label);
			}), lt(i, [], s, () => (C(t).mode, C(u).couple.mode), (e) => C(u).couple.mode = e), T(e, a);
		}), W(S);
		var w = Z(S, 2), E = U(w, !0), D = Z(w, 2), O = (e) => {
			a(e, () => C(u).couple, () => C(u).couple.mode, () => m[C(u).couple.mode]);
		};
		N(D, (e) => {
			m[C(u).couple.mode] && e(O);
		});
		var k = Z(D, 2), A = Z(P(k), 2);
		V(A), W(k), W(b);
		var j = Z(b, 2), M = (e) => {
			var t = ji();
			B(() => t.disabled = C(d)), z("click", t, _), T(e, t);
		};
		N(j, (e) => {
			n.readOnly || e(M);
		}), B((e, t) => {
			y(h, `Applies from this week (week ${e ?? ""})`), Q(b, "aria-labelledby", `${r}-couple`), Q(x, "id", `${r}-couple`), Q(S, "aria-labelledby", `${r}-couple`), y(E, t), A.disabled = n.readOnly;
		}, [() => Pe(C(o).week_start), () => p.find((e) => e.mode === C(u).couple.mode).hint]), mt(A, () => C(u).couple.reward, (e) => C(u).couple.reward = e), T(e, s);
	};
	N(x, (e) => {
		C(u) ? e(w, -1) : e(S);
	}), T(e, b), X();
}
R(["click"]);
// src/lib/ui/Header.svelte
var Fi = $("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), Ii = a("<svg class=\"brand svelte-16l0jix\" viewBox=\"0 0 100 100\" aria-hidden=\"true\"><defs><linearGradient id=\"hdr-brand\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#FFB340\"></stop><stop offset=\"1\" stop-color=\"#FF453A\"></stop></linearGradient></defs><rect width=\"100\" height=\"100\" rx=\"22.4\" fill=\"url(#hdr-brand)\"></rect><path d=\"M50 20 L80 45 V80 H20 V45 Z\" fill=\"#FFF\" stroke=\"#FFF\" stroke-width=\"6\" stroke-linejoin=\"round\"></path><path d=\"M50 42 C55 49 63 55 63 65.5 a13 13 0 0 1 -26 0 C37 58 42 53 45.5 49 C46 53.5 48 56.5 51 57.5 C49.5 52 49 47 50 42 Z\" fill=\"#FF6B2C\"></path></svg>"), Li = $("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), Ri = $("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"><!> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function zi(e, t) {
	let n = G(t, "subtitle", 3, ""), r = G(t, "actionLabel", 3, ""), i = G(t, "brand", 3, !1), a = K(0);
	var o = Ri();
	let s;
	var c = P(o), u = P(c), d = (e) => {
		var n = Fi();
		z("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), T(e, n);
	};
	N(u, (e) => {
		t.onback && e(d);
	});
	var f = Z(u, 2), p = P(f), m = P(p), h = (e) => {
		var t = Ii();
		T(e, t);
	};
	N(m, (e) => {
		i() && e(h);
	});
	var g = Z(m);
	W(p);
	var _ = Z(p, 2), v = (e) => {
		var n = Li(), i = U(n, !0);
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
function Bi(e, { onFrame: t, onSettle: n, snap: r = {
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
var Vi = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), Hi = (e) => Vi(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function Ui({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var Wi = a("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Gi = a("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function Ki(e, n) {
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
		let e = Bi(Ui({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => Y(o, e, !0) });
		return e.to(a), e.stop;
	});
	var l = Gi();
	let u;
	q(l, 21, () => C(c), (e) => e.kind, (e, n) => {
		var i = Wi(), a = t(i);
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
var qi = $("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Ji = $("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), Yi = $("<span class=\"streak svelte-1handop\"> </span>"), Xi = $("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), Zi = $("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Qi = $("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), $i = $("<span class=\"steps svelte-1handop\"> </span>"), ea = $("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), ta = $("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), na = $("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function ra(e, n) {
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
	var b = na();
	let x;
	var S = P(b), w = P(S), E = P(w);
	let D;
	var k = U(E, !0), A = Z(E, 2), j = P(A), M = U(j, !0), ee = Z(j, 2), F = U(ee, !0);
	W(A);
	var I = Z(A, 2), ne = (e) => {
		var n = Ji(), r = t(n), i = P(r);
		{
			let e = J(() => Ze(C(p)));
			Ki(i, {
				get fractions() {
					return C(e);
				},
				size: 44
			});
		}
		var a = Z(i, 2), o = (e) => {
			var t = qi();
			T(e, t);
		};
		N(a, (e) => {
			C(p).bonus && e(o);
		}), W(r);
		var s = Z(r, 2), c = U(s, !0);
		B(() => y(c, C(v))), T(e, n);
	}, re = (e) => {
		var t = Yi(), r = U(t);
		B(() => y(r, `🔥 ${n.person.streak ?? ""} wk`)), T(e, t);
	};
	N(I, (e) => {
		i() ? e(ne) : e(re, -1);
	});
	var ie = Z(I, 2), R = (e) => {
		var t = Xi();
		T(e, t);
	};
	N(ie, (e) => {
		n.onopen && e(R);
	}), W(w);
	var ae = Z(w, 2), oe = (e) => {
		var n = ea(), r = t(n), i = P(r), a = P(i);
		{
			let e = J(() => Ze(C(p))), t = J(() => nt.wide ? 112 : 88);
			Ki(a, {
				get fractions() {
					return C(e);
				},
				get size() {
					return C(t);
				}
			});
		}
		var o = Z(a, 2), s = (e) => {
			var t = Zi();
			T(e, t);
		};
		N(o, (e) => {
			C(p).bonus && e(s);
		}), W(i);
		var c = Z(i, 2);
		q(c, 21, () => C(h), (e) => e.kind, (e, t) => {
			var n = Qi(), r = P(n), i = P(r);
			let a;
			var o = Z(i, 1, !0);
			W(r);
			var s = Z(r, 2), c = P(s, !0), l = Z(c), u = U(l);
			W(s), W(n), B(() => {
				a = d(i, "", a, { background: `var(--${C(t).kind ?? ""})` }), y(o, C(t).label), y(c, C(t).n), y(u, `/${C(t).of ?? ""}`);
			}), T(e, n);
		}), W(c), W(r);
		var l = Z(r, 2), u = (e) => {
			var t = $i(), n = U(t, !0);
			B(() => y(n, C(g))), T(e, t);
		};
		N(l, (e) => {
			C(g) && e(u);
		});
		var m = Z(l, 2), _ = P(m), v = P(_);
		let b;
		W(_);
		var x = Z(_, 2), S = U(x);
		W(m), B((e, t) => {
			b = d(v, "", b, { width: `${C(f).frac * 100}%` }), y(S, `${e ?? ""} of ${t ?? ""} XP to level ${C(f).level + 1}`);
		}, [() => C(f).into.toLocaleString(), () => C(f).span.toLocaleString()]), T(e, n);
	};
	N(ae, (e) => {
		i() || e(oe);
	}), W(S);
	var se = Z(S, 2), ce = (e) => {
		var t = ta();
		B(() => Q(t, "aria-label", C(v))), z("click", t, function(...e) {
			n.onopen?.apply(this, e);
		}), T(e, t);
	};
	N(se, (e) => {
		n.onopen && e(ce);
	}), W(b), B((e) => {
		x = l(b, 1, "tile glass svelte-1handop", null, x, {
			compact: i(),
			opens: n.onopen
		}), Q(S, "aria-hidden", n.onopen ? "true" : void 0), D = d(E, "", D, {
			"--a1": C(c),
			"--a2": C(u)
		}), y(k, e), y(M, n.person.name), y(F, C(_));
	}, [() => n.person.name.slice(0, 1)]), T(e, b), X();
}
R(["click"]);
// src/lib/ui/Sheet.svelte
var ia = $("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), aa = $("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function oa(e, n) {
	H(n, !0);
	let i = G(n, "from", 3, null), a = 1e3, o = nt.reducedMotion, s = K(We(o ? a : 0)), c = K(0), u = K(1), f = K(!1), p = K("50% 100%"), m, g, _ = !1, v = null, y = J(() => o ? +C(f) : Math.min(1, C(s) / 500)), b = J(() => o ? 1 : .5 + .5 * C(s) / a), x = () => {
		_ && (C(s) === 0 || C(c) >= C(u)) && (_ = !1, n.onclose());
	};
	function S(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = Ui({
					value: r,
					damping: o,
					response: s
				}), n = Bi(t, {
					onFrame: e,
					onSettle: x
				}), n.to(i, a);
			}
		};
	}
	let w = S((e) => Y(s, e, !0)), E = S((e) => Y(c, e, !0));
	function D() {
		_ || v || (_ = !0, o ? (Y(f, !1), setTimeout(n.onclose, Hi("--fade"))) : w.to(C(s), 0, { response: .3 }));
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
		Y(c, t < 0 ? -rr(-t, C(u)) : t, !0), v.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), v.samples.length > 8 && v.samples.shift();
	}
	function A(e) {
		if (!v) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = nr([...v.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		v = null, tr(C(c), n, C(u)) ? o ? D() : (_ = !0, E.to(C(c), C(u), {
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
	var j = { close: D }, M = aa();
	h("keydown", fe, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && D());
	var ee = t(M);
	let F, I;
	var te = Z(ee, 2);
	let ne, L;
	var re = P(te), ie = Z(P(re), 2), R = P(ie), ae = (e) => {
		var t = ia();
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
var sa = $("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), ca = $("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), la = $("<p class=\"caption stale svelte-9nj5u4\"> </p>"), ua = $("<!> <!> <!>", 1);
function da(e, n) {
	H(n, !0);
	let r = J(() => n.scoredAt ? Ne(n.scoredAt, n.now) : null);
	var i = ua(), a = t(i), o = (e) => {
		var t = sa(), r = Z(P(t));
		W(t), B(() => y(r, ` fitbridge keeps the last valid one. ${n.configError ?? ""}`)), T(e, t);
	};
	N(a, (e) => {
		n.configError && e(o);
	});
	var s = Z(a, 2), c = (e) => {
		var t = ca(), r = Z(P(t));
		W(t), B(() => y(r, ` fitbridge keeps the last valid ones. ${n.settingsError ?? ""}`)), T(e, t);
	};
	N(s, (e) => {
		n.settingsError && e(c);
	});
	var l = Z(s, 2), u = (e) => {
		var t = la(), n = U(t, !0);
		B(() => y(n, C(r))), T(e, t);
	};
	N(l, (e) => {
		C(r) && e(u);
	}), T(e, i), X();
}
// node_modules/svelte/src/internal/flags/legacy.js
at();
// src/lib/ui/Toast.svelte
var fa = $("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), pa = $("<span> </span> <!>", 1), ma = $("<div role=\"status\" aria-live=\"polite\"><!></div>");
function ha(e, n) {
	H(n, !1);
	function r() {
		let e = yt.undo;
		Object.assign(yt, {
			on: !1,
			undo: null
		}), e();
	}
	Xe();
	var i = ma();
	let a;
	var o = P(i), s = (e) => {
		var n = pa(), i = t(n), a = U(i, !0), o = Z(i, 2), s = (e) => {
			var t = fa();
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
var ga = $("<p class=\"progress svelte-1tya3no\"> </p>"), _a = $("<p> </p>"), va = $("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), ya = $("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function ba(e, t) {
	H(t, !0);
	let n = J(() => t.group.week ? tt(t.group.week, t.people) : ""), r = J(() => t.group.week ? S(t.group.week) : null), i = J(() => [
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
	var a = ya(), o = Z(P(a), 2), s = (e) => {
		var t = ga(), r = U(t, !0);
		B(() => y(r, C(n))), T(e, t);
	};
	N(o, (e) => {
		C(n) && e(s);
	});
	var c = Z(o, 2), u = (e) => {
		var n = _a();
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
		var n = va(), r = P(n), i = U(r, !0), a = Z(r), o = P(a, !0), s = Z(o), c = U(s, !0);
		W(a), W(n), B(() => {
			y(i, C(t).k), y(o, C(t).v), y(c, C(t).unit);
		}), T(e, n);
	}), W(d), W(a), T(e, a), X();
}
// src/App.svelte
var xa = $("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), Sa = $("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), Ca = $("<div class=\"tiles compact svelte-1n46o8q\"></div>"), wa = $("<!> <!>", 1), Ta = $("<div class=\"tiles svelte-1n46o8q\"></div>"), Ea = $("<!> <!> <!> <!> <!>", 1), Da = $("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function Oa(e, n) {
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
	var j = Da(), M = t(j), ee = P(M);
	{
		let e = J(() => C(D) ? ze(C(D)) : ""), t = J(() => C(p) ? (e) => Y(u, { from: e.currentTarget }, !0) : void 0);
		zi(ee, {
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
		var n = Sa(), r = Z(t(n), 2), i = (e) => {
			var t = xa(), n = U(t, !0);
			B(() => y(n, C(m).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), T(e, t);
		};
		N(r, (e) => {
			C(m) && e(i);
		}), T(e, n);
	}, ne = (e) => {
		var n = Ea(), r = t(n);
		da(r, {
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
			Wt(e, {
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
			var n = wa(), r = t(n), i = (e) => {
				var t = Ca();
				q(t, 20, () => C(w).others, (e) => e, (e, t) => {
					{
						let n = J(() => C(S).indexOf(t)), r = J(() => l(t));
						ra(e, {
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
				ra(a, {
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
			var t = Ta();
			q(t, 20, () => C(w).others, (e) => e, (e, t) => {
				{
					let n = J(() => C(S).indexOf(t)), r = J(() => l(t));
					ra(e, {
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
			ba(e, {
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
				Ei(e, {
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
		je(oa(e, {
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
					Pi(e, {
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
		oa(e, {
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
				var r = wa(), i = t(r);
				{
					let e = J(() => C(S).indexOf(C(c).id));
					ra(i, {
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
					Ei(a, {
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
	}), ha(Z(L, 2), {}), B(() => M.inert = C(A)), T(e, j), X();
}
// src/main.js
var ka = (e) => p(Oa, { target: e }), Aa = () => new Promise((e) => {
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
		document.documentElement.dataset.theme = t ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Aa().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", ka(e);
		}));
	}
});
