import { $ as e, $t as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Gt as h, H as g, Ht as _, I as v, It as y, J as b, Jt as x, K as S, Kt as C, L as w, Lt as T, M as E, Mt as D, N as O, Nt as k, O as A, Ot as j, P as M, Pt as N, Q as P, Qt as F, R as I, Rt as L, S as R, St as ee, T as te, Tt as ne, U as z, Ut as B, V as re, Vt as V, W as ie, Wt as H, X as ae, Xt as U, Y as oe, Yt as W, Z as se, Zt as G, _ as ce, _t as le, a as ue, at as de, b as fe, bt as pe, c as me, cn as he, ct as ge, d as _e, dt as ve, en as ye, et as be, f as xe, ft as Se, g as Ce, gt as we, h as Te, ht as Ee, i as De, in as Oe, it as ke, j as Ae, jt as K, k as je, kt as q, l as Me, lt as Ne, m as Pe, mt as J, n as Fe, nn as Y, nt as Ie, o as Le, on as Re, ot as X, p as ze, pt as Be, q as Ve, qt as He, rn as Ue, rt as We, s as Ge, sn as Ke, st as qe, t as Je, tn as Ye, tt as Xe, u as Ze, ut as Qe, v as $e, vt as Z, w as et, wt as tt, x as nt, xt as rt, y as it, yt as Q, z as at, zt as ot } from "./shared-CdYUGrzm.js";
// src/lib/actions.svelte.js
var st = 5e3, ct = He({}), lt = He({}), ut = He({
	on: !1,
	text: "",
	undo: null
}), dt = He({
	entry: null,
	at: 0
}), ft = He({ n: 0 }), pt, mt = 0, ht = {};
function $(e, t = null) {
	clearTimeout(pt), Object.assign(ut, {
		on: !0,
		text: e,
		undo: t
	}), pt = setTimeout(() => ut.on = !1, st);
}
function gt(e, t = Date.now()) {
	for (let [n, r] of Object.entries(ct)) i(r, e[r.person]?.feed ?? [], t) && delete ct[n];
	dt.entry && te(dt, e, t) && (dt.entry = null);
}
var _t = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant");
async function vt(e, t, n) {
	let r;
	try {
		r = await Ke("POST", "settings", e);
	} catch (e) {
		return $(_t(e)), !1;
	}
	return r.from && r.from > n ? ($(`Saved · from Monday ${se(r.from)}`), !0) : (Object.assign(dt, {
		entry: e,
		at: Date.now()
	}), gt(t), $("Saved · updates within 5 min"), !0);
}
async function yt() {
	let e;
	try {
		e = await Ke("POST", "settings", { action: "cancel" });
	} catch (e) {
		return $(_t(e)), !1;
	}
	return $(e.cancelled === !1 ? "Nothing to cancel · these goals are in force" : "Change cancelled"), !0;
}
async function bt(e, t, n) {
	let r = `${e}/${t}`, i = ct[r], a = ++mt, o = t.startsWith("manual:"), s = o && n === "remove" ? null : n === "remove";
	ct[r] = {
		person: e,
		key: t,
		want: s,
		at: Date.now(),
		n: a
	}, n === "remove" && !o && $("Removed", () => bt(e, t, "restore"));
	try {
		await S(ht, r, () => Ke("POST", "workouts", {
			person: e,
			key: t,
			action: n
		})), lt[r] = s;
	} catch (e) {
		ct[r]?.n === a && (i ? ct[r] = i : delete ct[r]), $(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
var xt = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
async function St(e, t) {
	try {
		return await Re(`feed?person=${encodeURIComponent(e)}&before=${t}`);
	} catch (e) {
		return $(xt(e)), null;
	}
}
async function Ct(e) {
	try {
		await Ke("POST", "shoes", e);
	} catch (e) {
		return $(xt(e)), !1;
	}
	return ft.n++, !0;
}
async function wt(e, t, n, r = null, i = "") {
	try {
		await Ke("POST", "workouts", {
			action: "review",
			person: e,
			key: t,
			decision: n,
			...n === "type" && { type_match: r }
		});
	} catch (e) {
		return $(xt(e)), !1;
	}
	return ft.n++, $({
		plan: `Counts for ${i}`,
		run: "Kept as a run",
		type: `Changed to ${i}`
	}[n] ?? "Decision cleared"), !0;
}
async function Tt(e, t, n) {
	try {
		await Ke("POST", "workouts", {
			action: "shoe",
			person: e,
			key: t,
			shoe_id: n
		});
	} catch (e) {
		return $(xt(e)), !1;
	}
	return ft.n++, $("Moved to the other shoe"), !0;
}
// src/lib/ui/Connect.svelte
var Et = K("<div class=\"url svelte-gy3e4s\"><input readonly=\"\" aria-label=\"Your address\" class=\"svelte-gy3e4s\"/> <button type=\"button\" class=\"btn press\" aria-label=\"Copy address\">Copy</button></div>"), Dt = K("<p class=\"warn svelte-gy3e4s\">This address only works at home.</p>"), Ot = K("<p class=\"caption svelte-gy3e4s\"> </p> <div class=\"choice svelte-gy3e4s\"><button type=\"button\" class=\"btn press svelte-gy3e4s\">iPhone</button> <button type=\"button\" class=\"btn press svelte-gy3e4s\">Android</button></div>", 1), kt = K("<li class=\"svelte-gy3e4s\"> </li>"), At = K("<ol class=\"svelte-gy3e4s\"></ol>"), jt = K("<p class=\"caption svelte-gy3e4s\"> <b> </b> </p>"), Mt = K("<p> </p> <!> <!> <!> <!>", 1), Nt = K("<details class=\"card connect svelte-gy3e4s\"><summary class=\"svelte-gy3e4s\">Connect your phone <small class=\"svelte-gy3e4s\"> </small></summary> <div class=\"inner svelte-gy3e4s\"><!></div></details>"), Pt = K("<section class=\"card connect svelte-gy3e4s\" aria-label=\"Connect your phone\"><div class=\"inner svelte-gy3e4s\"><h2 class=\"svelte-gy3e4s\">Connect your phone</h2><!></div></section>");
function Ft(e, t) {
	F(t, !0);
	let n = (e) => {
		var n = Mt(), r = H(n);
		let i;
		var o = h(r, !0), _ = C(r, 2), v = (e) => {
			var n = Et(), r = B(n);
			Be(r), Ne(r, (e) => x(m, e), () => L(m));
			var i = C(r, 2);
			Y(n), a(() => Ee(r, t.info.url)), T("focus", r, (e) => e.currentTarget.select()), y("click", i, g), q(e, n);
		};
		d(_, (e) => {
			t.info.url && e(v);
		});
		var b = C(_, 2), S = (e) => {
			var t = Dt();
			q(e, t);
		};
		d(b, (e) => {
			t.info.external || e(S);
		});
		var w = C(b, 2), E = (e) => {
			var t = Ot(), n = H(t), r = h(n, !0), i = C(n, 2), o = B(i), s = C(o, 2);
			Y(i), a(() => j(r, L(u).title)), y("click", o, () => x(c, "iphone")), y("click", s, () => x(c, "android")), q(e, t);
		}, D = (e) => {
			var t = At();
			s(t, 20, () => L(u).steps, (e) => e, (e, t) => {
				var n = kt(), r = h(n, !0);
				a(() => j(r, t)), q(e, n);
			}), Y(t), q(e, t);
		};
		d(w, (e) => {
			L(l) ? e(D, -1) : e(E);
		});
		var O = C(w, 2), k = (e) => {
			var t = jt(), n = B(t, !0), r = C(n), i = h(r, !0), o = C(r, 1, !0);
			Y(t), a(() => {
				j(n, L(p).before), j(i, L(p).code), j(o, L(p).after);
			}), q(e, t);
		};
		d(O, (e) => {
			L(p) && e(k);
		}), a(() => {
			i = Q(r, 1, "status svelte-gy3e4s", null, i, { ok: L(f).state === "connected" }), j(o, L(f).text);
		}), q(e, n);
	}, i = X(t, "person", 3, null), o = X(t, "collapsed", 3, !1), c = W(null), l = U(() => t.info.phone ?? L(c)), u = U(() => nt(L(l))), f = U(() => fe(t.info, t.now, i())), p = U(() => je(t.info.opengym)), m = W(void 0);
	async function g() {
		L(m).focus(), L(m).setSelectionRange(0, L(m).value.length);
		let e = !1;
		try {
			await navigator.clipboard.writeText(t.info.url), e = !0;
		} catch {
			try {
				e = document.execCommand("copy");
			} catch {}
		}
		$(e ? "Copied" : "Select and copy the address");
	}
	var _ = r(), v = H(_), b = (e) => {
		var t = Nt(), r = B(t), i = C(B(r)), o = h(i, !0);
		Y(r);
		var s = C(r, 2), c = B(s);
		n(c), Y(s), Y(t), a(() => j(o, L(f).state === "connected" ? "Connected" : "Waiting")), q(e, t);
	}, S = (e) => {
		var t = Pt(), r = B(t), i = C(B(r));
		n(i), Y(r), Y(t), q(e, t);
	};
	d(v, (e) => {
		o() ? e(b) : e(S, -1);
	}), q(e, _), G();
}
p(["click"]);
// src/lib/ui/Badges.svelte
var It = K("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), Lt = K("<ul class=\"svelte-m8wnum\"></ul>"), Rt = K("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), zt = K("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), Bt = K("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function Vt(e, t) {
	F(t, !0);
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
	var o = Bt(), c = B(o), l = (e) => {
		var n = Lt();
		s(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = It(), i = B(n), o = h(i, !0), s = C(i, 2), c = h(s, !0), l = C(s, 2), u = h(l, !0);
			Y(n), a((e, n) => {
				j(o, e), j(c, L(t).title), j(u, n);
			}, [() => r(L(t)), () => se(L(t).unlocked_at)]), q(e, n);
		}), Y(n), q(e, n);
	};
	d(c, (e) => {
		t.badges.recent.length && e(l);
	});
	var u = C(c, 2), f = (e) => {
		var n = Lt();
		s(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = Rt(), o = B(n), s = h(o, !0), c = C(o, 2), l = h(c, !0), u = C(c, 2), d = h(u), f = C(u, 2), p = B(f);
			let m;
			Y(f), Y(n), a((e, n, r, i) => {
				j(s, e), j(l, L(t).title), j(d, `${n ?? ""} of ${r ?? ""}`), m = Z(p, "", m, { width: i });
			}, [
				() => r(L(t)),
				() => i(L(t).current),
				() => i(L(t).target),
				() => `${Math.min(1, L(t).current / L(t).target) * 100}%`
			]), q(e, n);
		}), Y(n), q(e, n);
	};
	d(u, (e) => {
		t.badges.next.length && e(f);
	});
	var p = C(u, 2), m = (e) => {
		var t = zt();
		q(e, t);
	};
	d(p, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(m);
	}), Y(o), q(e, o), G();
}
// src/lib/ui/FeedRow.svelte
var Ht = K("<span class=\"mini svelte-69s4be\"> </span>"), Ut = K("<span> </span>"), Wt = K("<span class=\"mini svelte-69s4be\">Together</span>"), Gt = K("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), Kt = K("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), qt = K("<span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span>", 1), Jt = K("<button type=\"button\" class=\"head svelte-69s4be\"><!></button>"), Yt = K("<div class=\"head svelte-69s4be\"><!></div>"), Xt = K("<li><!></li>");
function Zt(e, t) {
	F(t, !0);
	let n = (e) => {
		var n = qt(), o = H(n), c = h(o, !0), l = C(o, 2), u = B(l), f = B(u), p = C(f), m = (e) => {
			var t = Ht(), n = h(t, !0);
			a(() => j(n, L(s).plan)), q(e, t);
		};
		d(p, (e) => {
			L(s).plan && e(m);
		});
		var g = C(p, 2), _ = (e) => {
			var t = Ut();
			let n;
			var r = h(t, !0);
			a(() => {
				n = Q(t, 1, "mini svelte-69s4be", null, n, { warn: L(s).chip.tone === "warn" }), j(r, L(s).chip.text);
			}), q(e, t);
		};
		d(g, (e) => {
			L(s).chip && e(_);
		});
		var v = C(g, 2), y = (e) => {
			var t = Wt();
			q(e, t);
		};
		d(v, (e) => {
			t.item.joint && e(y);
		});
		var b = C(v, 2), x = (e) => {
			var t = Gt();
			q(e, t);
		};
		d(b, (e) => {
			t.record && e(x);
		}), Y(u);
		var S = C(u, 2), w = h(S);
		Y(l);
		var T = C(l, 2), E = B(T), D = (e) => {
			var t = Kt();
			q(e, t);
		};
		d(E, (e) => {
			L(i) && e(D);
		});
		var O = C(E);
		Y(T), a(() => {
			Q(o, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), j(c, r[t.item.kind] ?? "💪"), j(f, `${L(s).title ?? ""} `), j(w, `${L(s).when ?? ""} · ${L(s).duration ?? ""}`), j(O, ` ${(L(s).removable === "restore" ? "Removed" : L(s).label ?? (L(s).xp && `${L(s).xp} XP`)) ?? ""}`);
		}), q(e, n);
	}, r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, i = U(() => ct[`${t.person}/${t.item.key}`]), s = U(() => o(L(i) && L(i).want !== null ? {
		...t.item,
		excluded: L(i).want
	} : t.item)), c = U(() => L(i)?.want === null), l = U(() => t.item.kind !== "active_day");
	var u = Xt();
	let f;
	var p = B(u), m = (e) => {
		var r = Jt(), i = B(r);
		n(i), Y(r), y("click", r, () => t.onopen(t.item)), q(e, r);
	}, g = (e) => {
		var t = Yt(), r = B(t);
		n(r), Y(t), q(e, t);
	};
	d(p, (e) => {
		L(l) ? e(m) : e(g, -1);
	}), Y(u), a(() => f = Q(u, 1, "svelte-69s4be", null, f, {
		dim: L(s).removable === "restore" || L(c),
		grey: !!L(s).label
	})), q(e, u), G();
}
p(["click"]);
// src/lib/ui/Feed.svelte
var Qt = K("<ul class=\"card svelte-n1344i\"></ul>"), $t = K("<p class=\"caption empty svelte-n1344i\">No workouts in the last 90 days.</p>"), en = K("<button type=\"button\" class=\"btn older svelte-n1344i\">Load older</button>"), tn = K("<!> <!>", 1);
function nn(e, t) {
	F(t, !0);
	let n = W(He([])), r = W(!0), i = W(!1), o = null, c = U(() => v(t.items, I(L(n), t.person, lt)));
	async function l() {
		x(i, !0);
		let e = o ?? L(c).at(-1)?.start.slice(0, 10) ?? w(M(), 88), a = await St(t.person, e);
		x(i, !1), a && (x(n, v(L(n), a.items), !0), o = w(e, 90), x(r, a.more, !0));
	}
	var u = tn(), f = H(u), p = (e) => {
		var n = Qt();
		s(n, 21, () => L(c), (e) => e.key, (e, n) => {
			{
				let r = U(() => t.records?.has(L(n).key));
				Zt(e, {
					get person() {
						return t.person;
					},
					get item() {
						return L(n);
					},
					get record() {
						return L(r);
					},
					get onopen() {
						return t.onopen;
					}
				});
			}
		}), Y(n), q(e, n);
	}, m = (e) => {
		var t = $t();
		q(e, t);
	};
	d(f, (e) => {
		L(c).length ? e(p) : e(m, -1);
	});
	var h = C(f, 2), g = (e) => {
		var t = en();
		a(() => t.disabled = L(i)), y("click", t, l), q(e, t);
	};
	d(h, (e) => {
		L(r) && e(g);
	}), q(e, u), G();
}
p(["click"]);
// src/lib/ui/PlanBar.svelte
var rn = K("<span> </span>"), an = K("<i class=\"svelte-1y5m0aq\"></i>"), on = K("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), sn = K("<span class=\"review svelte-1y5m0aq\"> </span>"), cn = K("<p class=\"caption prog svelte-1y5m0aq\"> <!></p>"), ln = K("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!> <!></div>");
function un(e, t) {
	F(t, !0);
	let n = U(() => re(t.plan)), r = U(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0) + (t.plan.cooldown_s ?? 0)) / 60)), i = U(() => g(t.plan));
	var o = ln(), c = B(o), l = B(c), u = h(l, !0), f = C(l, 2), p = (e) => {
		var n = rn();
		let r;
		var i = h(n, !0);
		a(() => {
			r = Q(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), j(i, t.plan.due_today ? "Due today" : "Rest day");
		}), q(e, n);
	};
	d(f, (e) => {
		L(n).length && e(p);
	}), Y(c);
	var m = C(c, 2), _ = (e) => {
		var t = on(), i = H(t);
		s(i, 21, () => L(n), tt, (e, t) => {
			var n = an();
			let r;
			a(() => r = Z(n, "", r, {
				"flex-grow": L(t).frac,
				background: `var(--${L(t).kind === "run" ? "run" : "fill"})`
			})), q(e, n);
		}), Y(i);
		var o = C(i, 2), c = B(o), l = B(c);
		Z(l, "", {}, { background: "var(--run)" });
		var u = C(l, 2);
		Z(u, "", {}, { background: "var(--fill)" }), Ye(), Y(c);
		var d = C(c, 2), f = h(d);
		Y(o), a(() => {
			J(i, "aria-label", `Run and walk intervals, ${L(r) ?? ""} minutes in total`), j(f, `${L(r) ?? ""} min`);
		}), q(e, t);
	};
	d(m, (e) => {
		L(n).length && e(_);
	});
	var v = C(m, 2), y = (e) => {
		var n = cn(), r = B(n, !0), o = C(r), s = (e) => {
			var n = sn(), r = h(n);
			a(() => j(r, `${L(i) ? " · " : ""}${t.plan.review_pending ?? ""} ${t.plan.review_pending === 1 ? "run" : "runs"} to review`)), q(e, n);
		};
		d(o, (e) => {
			t.plan.review_pending && e(s);
		}), Y(n), a(() => j(r, L(i))), q(e, n);
	};
	d(v, (e) => {
		(L(i) || t.plan.review_pending) && e(y);
	}), Y(o), a(() => j(u, t.plan.state)), q(e, o), G();
}
// src/lib/gesture.js
var dn = (e, t = .998) => e / 1e3 * t / (1 - t), fn = (e, t, n) => e + dn(t) > n / 2;
function pn(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var mn = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), hn = K("<h2 class=\"svelte-9pi54v\"> </h2> <button type=\"button\" class=\"close press svelte-9pi54v\" aria-label=\"Close\">✕</button>", 1), gn = K("<div class=\"grab drag svelte-9pi54v\"><!></div>"), _n = K("<div class=\"grab svelte-9pi54v\"><!></div>"), vn = K("<dialog><!> <div class=\"body svelte-9pi54v\"><!></div></dialog>");
function yn(e, t) {
	let n = k();
	F(t, !0);
	let r = (e) => {
		var r = hn(), i = H(r), o = h(i, !0), s = C(i, 2);
		a(() => {
			J(i, "id", `${n}-t`), j(o, t.title);
		}), y("click", s, () => c.close()), q(e, r);
	}, i = X(t, "drag", 3, !1), o = X(t, "wide", 3, !1), s = X(t, "onclose", 3, null), c, l, u = W(0), f = null, p = W(!1), m = !1, g = !1;
	function _() {
		return c.open ? null : (m = document.documentElement.style.overflow !== "hidden", m && (document.documentElement.style.overflow = "hidden"), c.showModal(), l);
	}
	function v() {
		c.close();
	}
	function b() {
		m && (document.documentElement.style.overflow = ""), m = !1, x(u, 0), s()?.();
	}
	function S(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), f = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, x(p, !0));
	}
	function w(e) {
		f && (x(u, Math.max(0, e.clientY - f.start), !0), f.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), f.samples.length > 8 && f.samples.shift());
	}
	function E(e) {
		if (!f) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = pn([...f.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		f = null, x(p, !1), fn(L(u), n, c.offsetHeight) ? c.close() : x(u, 0);
	}
	var D = {
		show: _,
		close: v
	}, O = vn();
	let A, M;
	var N = B(O), P = (e) => {
		var t = gn(), n = B(t);
		r(n), Y(t), y("pointerdown", t, S), y("pointermove", t, w), y("pointerup", t, E), T("pointercancel", t, E), q(e, t);
	}, I = (e) => {
		var t = _n(), n = B(t);
		r(n), Y(t), q(e, t);
	};
	d(N, (e) => {
		i() ? e(P) : e(I, -1);
	});
	var R = C(N, 2), te = B(R);
	return ee(te, () => t.children), Y(R), Ne(R, (e) => l = e, () => l), Y(O), Ne(O, (e) => c = e, () => c), a(() => {
		J(O, "aria-labelledby", `${n}-t`), A = Q(O, 1, "svelte-9pi54v", null, A, {
			wide: o(),
			dragging: L(p)
		}), M = Z(O, "", M, { transform: L(u) ? `translateY(${L(u)}px)` : null });
	}), y("pointerdown", O, (e) => g = e.target === c), y("click", O, (e) => e.target === c && g && c.close()), T("close", O, b), y("keydown", O, (e) => e.key === "Escape" && e.stopPropagation()), q(e, O), G(D);
}
p([
	"click",
	"pointerdown",
	"keydown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/RecordsDialog.svelte
var bn = K("<li class=\"svelte-18znx9k\"><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), xn = K("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1);
function Sn(e, t) {
	F(t, !0);
	let n;
	function i(e = null) {
		let t = n.show();
		t && (t.scrollTop = 0, e && t.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	var o = { open: i };
	return Ne(yn(e, {
		title: "All records",
		drag: !0,
		children: (e, n) => {
			var i = r(), o = H(i);
			s(o, 17, () => t.groups, (e) => e.group, (e, t) => {
				var n = xn(), r = H(n), i = h(r, !0), o = C(r, 2);
				s(o, 21, () => L(t).lifts, (e) => e.id, (e, t) => {
					var n = bn(), r = B(n), i = B(r), o = C(i), s = h(o, !0), c = C(o);
					Y(r), Y(n), a((e, n) => {
						j(i, `${L(t).name ?? ""} · `), j(s, e), j(c, ` · ${n ?? ""}`);
					}, [() => O(L(t)), () => se(L(t).date)]), q(e, n);
				}), Y(o), a(() => {
					J(r, "data-group", L(t).group), j(i, L(t).group);
				}), q(e, n);
			}), q(e, i);
		},
		$$slots: { default: !0 }
	}), (e) => n = e, () => n), G(o);
}
// src/lib/ui/StepBars.svelte
var Cn = K("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), wn = K("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), Tn = K("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function En(e, t) {
	F(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), r = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var i = Tn(), o = B(i);
	s(o, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = Cn();
		let i;
		var o = B(n), s = B(o);
		let c, l;
		Y(o);
		var u = C(o, 2), d = h(u, !0);
		Y(n), a((e) => {
			J(n, "aria-label", e), J(n, "aria-hidden", L(t).future ? "true" : void 0), J(n, "aria-current", L(t).isToday ? "date" : void 0), i = Q(n, 1, "svelte-1f099m", null, i, { today: L(t).isToday }), c = Q(s, 1, "svelte-1f099m", null, c, {
				active: L(t).active,
				future: L(t).future
			}), l = Z(s, "", l, { height: `${L(t).frac * 100}%` }), j(d, L(t).label);
		}, [() => L(t).future ? void 0 : r(L(t))]), q(e, n);
	}), Y(o);
	var c = C(o, 2), l = (e) => {
		var n = wn();
		let r;
		a(() => r = Z(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), q(e, n);
	};
	d(c, (e) => {
		t.goalFrac !== null && e(l);
	}), Y(i), q(e, i), G();
}
// src/lib/ui/Progress.svelte
var Dn = K("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), On = K("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), kn = K("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), An = K("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), jn = K("<span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span>", 1), Mn = K("<button type=\"button\" class=\"row svelte-kr1x1f\"><!></button>"), Nn = K("<div class=\"row svelte-kr1x1f\"><!></div>"), Pn = K("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), Fn = K("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function In(e, t) {
	F(t, !0);
	let n = U(() => t.person.week.goal.steps ?? 0), i = U(() => Ie(t.person.steps_week, L(n), M())), o = U(() => t.person.pbs.lifts ?? []), l = U(() => c(L(o))), u, f = U(() => t.person.pbs.fastest_1k), p = U(() => t.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var m = Fn(), g = H(m), _ = (e) => {
		var t = Dn(), n = B(t);
		En(n, {
			get bars() {
				return L(i).bars;
			},
			get goalFrac() {
				return L(i).goalFrac;
			}
		});
		var r = C(n, 2), o = h(r, !0);
		Y(t), a((e) => j(o, e), [() => be(L(i).bars)]), q(e, t);
	};
	d(g, (e) => {
		L(i) && e(_);
	});
	var v = C(g, 2), b = B(v), x = (e) => {
		var t = kn(), n = H(t);
		s(n, 21, () => L(l), (e) => e.group, (e, t) => {
			var n = On(), r = B(n), i = B(r), o = h(i, !0), s = C(i), c = B(s), l = C(c), d = h(l, !0);
			Y(s), Y(r), Y(n), a((e) => {
				j(o, L(t).group), j(c, `${L(t).lift.name ?? ""} · `), j(d, e);
			}, [() => O(L(t).lift)]), y("click", r, () => u.open(L(t).group)), q(e, n);
		}), Y(n);
		var r = C(n, 2), i = h(r);
		a(() => j(i, `All records (${L(o).length ?? ""})`)), y("click", r, () => u.open()), q(e, t);
	}, S = (e) => {
		var t = An();
		q(e, t);
	};
	d(b, (e) => {
		L(o).length ? e(x) : e(S, -1);
	}), Y(v);
	var w = C(v, 2), T = B(w), E = (e) => {
		let n = (e) => {
			var t = jn(), n = C(H(t), 2), r = h(n);
			a((e, t) => j(r, `${e ?? ""} · ${t ?? ""}`), [() => at(L(f).seconds), () => se(L(f).date)]), q(e, t);
		};
		var i = r(), o = H(i), s = (e) => {
			var r = Mn(), i = B(r);
			n(i), Y(r), y("click", r, () => t.onopen({ key: L(f).key })), q(e, r);
		}, c = (e) => {
			var t = Nn(), r = B(t);
			n(r), Y(t), q(e, t);
		};
		d(o, (e) => {
			L(f).key ? e(s) : e(c, -1);
		}), q(e, i);
	}, D = (e) => {
		var t = Pn();
		q(e, t);
	};
	d(T, (e) => {
		L(f) ? e(E) : e(D, -1);
	});
	var k = C(T, 2), N = C(B(k)), P = h(N);
	Y(k);
	var I = C(k, 2), R = C(B(I)), ee = h(R);
	Y(I), Y(w);
	var te = C(w, 2);
	{
		let e = U(() => A(L(o)));
		Ne(Sn(te, { get groups() {
			return L(e);
		} }), (e) => u = e, () => u);
	}
	a((e) => {
		j(P, `${e ?? ""} km`), j(ee, `${L(p) ?? ""} t`);
	}, [() => t.person.pbs.longest_session_km.toFixed(1)]), q(e, m), G();
}
p(["click"]);
// src/lib/ui/Shoes.svelte
var Ln = K("<span class=\"label svelte-eu7fja\"> </span>"), Rn = K("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), zn = K("<ul class=\"card svelte-eu7fja\"></ul>");
function Bn(e, t) {
	F(t, !0);
	let n = U(() => t.shoes.map(oe));
	var r = zn();
	s(r, 23, () => L(n), (e, n) => t.shoes[n].id, (e, t) => {
		var n = Rn(), r = B(n), i = B(r), o = h(i, !0), s = C(i), c = h(s, !0);
		Y(r);
		var l = C(r, 2), u = B(l);
		let f;
		Y(l);
		var p = C(l, 2), m = B(p), g = h(m, !0), _ = C(m, 2), v = (e) => {
			var n = Ln(), r = h(n, !0);
			a(() => j(r, L(t).label)), q(e, n);
		};
		d(_, (e) => {
			L(t).label && e(v);
		}), Y(p), Y(n), a(() => {
			Q(n, 1, pe(L(t).state), "svelte-eu7fja"), j(o, L(t).name), j(c, L(t).km), f = Z(u, "", f, { width: `${L(t).frac * 100}%` }), j(g, L(t).detail);
		}), q(e, n);
	}), Y(r), q(e, r), G();
}
// src/lib/ui/ShoesDialog.svelte
var Vn = K("<span class=\"mini svelte-1bogt6u\">Current</span>"), Hn = K("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Un = K("<button type=\"button\" class=\"btn\">Set current</button>"), Wn = K("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Gn = K("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), Kn = K("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe until you set one.</p>"), qn = K("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), Jn = K("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), Yn = K("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), Xn = K("<!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form>", 1);
function Zn(e, t) {
	F(t, !0);
	let n = U(() => t.shoes.map((e) => ({
		...oe(e),
		id: e.id,
		limit: e.limit,
		current: !!e.current
	}))), r, i = W(""), o = W(He(700)), c = W(null), l = W(!1), u = W(null);
	function f() {
		r.show();
	}
	function p() {
		x(u, null), x(c, null);
	}
	async function m(e) {
		x(l, !0);
		let t = await Ct(e);
		return x(l, !1), t;
	}
	async function g(e) {
		e.preventDefault();
		let n = Ve(L(i), L(o));
		x(c, n.error ?? null, !0), !L(c) && await m({
			op: "add",
			person: t.person,
			...n
		}) && x(i, "");
	}
	async function _(e, t) {
		let n = Ve(void 0, e.currentTarget.value, { partial: !0 });
		x(c, n.error ?? null, !0), L(c) ? e.currentTarget.value = t.limit : n.replace_at_km !== t.limit && await m({
			op: "update",
			id: t.id,
			...n
		});
	}
	async function v(e) {
		x(u, null), await m({
			op: "retire",
			id: e.id
		});
	}
	var b = { open: f };
	return Ne(yn(e, {
		title: "Manage shoes",
		onclose: p,
		children: (e, r) => {
			var f = Xn(), p = H(f), b = (e) => {
				var r = qn(), i = H(r);
				s(i, 21, () => L(n), (e) => e.id, (e, n) => {
					var r = Gn(), i = B(r), o = B(i), s = B(o, !0), c = C(s), f = (e) => {
						var t = Vn();
						q(e, t);
					};
					d(c, (e) => {
						L(n).current && e(f);
					}), Y(o);
					var p = C(o, 2), g = h(p, !0);
					Y(i);
					var b = C(i, 2), S = B(b), w = C(B(S));
					Be(w), Ye(), Y(S);
					var T = C(S, 2), E = (e) => {
						var t = Hn(), r = H(t), i = h(r), o = C(r, 2), s = C(o, 2);
						a(() => {
							j(i, `Retire ${L(n).name ?? ""}?`), s.disabled = L(l);
						}), y("click", o, () => x(u, null)), y("click", s, () => v(L(n))), q(e, t);
					}, D = (e) => {
						var r = Wn(), i = H(r), o = (e) => {
							var r = Un();
							a(() => r.disabled = L(l)), y("click", r, () => m({
								op: "current",
								person: t.person,
								id: L(n).id
							})), q(e, r);
						};
						d(i, (e) => {
							L(n).current || e(o);
						});
						var s = C(i, 2);
						a(() => s.disabled = L(l)), y("click", s, () => x(u, L(n).id, !0)), q(e, r);
					};
					d(T, (e) => {
						L(u) === L(n).id ? e(E) : e(D, -1);
					}), Y(b), Y(r), a(() => {
						j(s, L(n).name), j(g, L(n).km), J(w, "min", Te.replace_at_km[0]), J(w, "max", Te.replace_at_km[1]), J(w, "step", Te.replace_at_km[2]), Ee(w, L(n).limit), w.disabled = L(l);
					}), y("change", w, (e) => _(e, L(n))), q(e, r);
				}), Y(i);
				var o = C(i, 2), c = (e) => {
					var t = Kn();
					q(e, t);
				}, f = U(() => !L(n).some((e) => e.current));
				d(o, (e) => {
					L(f) && e(c);
				}), q(e, r);
			}, S = (e) => {
				var t = Jn();
				q(e, t);
			};
			d(p, (e) => {
				L(n).length ? e(b) : e(S, -1);
			});
			var w = C(p, 2), E = C(B(w), 2), D = C(B(E));
			Be(D), Y(E);
			var O = C(E, 2), k = C(B(O));
			Be(k), Y(O);
			var A = C(O, 2), M = (e) => {
				var t = Yn(), n = h(t, !0);
				a(() => j(n, L(c))), q(e, t);
			};
			d(A, (e) => {
				L(c) && e(M);
			});
			var N = C(A, 2);
			Y(w), a(() => {
				J(D, "maxlength", Te.name[1]), D.disabled = L(l), J(k, "min", Te.replace_at_km[0]), J(k, "max", Te.replace_at_km[1]), J(k, "step", Te.replace_at_km[2]), k.disabled = L(l), N.disabled = L(l);
			}), T("submit", w, g), Se(D, () => L(i), (e) => x(i, e)), Se(k, () => L(o), (e) => x(o, e)), q(e, f);
		},
		$$slots: { default: !0 }
	}), (e) => r = e, () => r), G(b);
}
p(["change", "click"]);
// src/lib/ui/WorkoutDialog.svelte
var Qn = K("<p class=\"msg\" role=\"status\"> </p>"), $n = K("<p class=\"msg\" role=\"status\">Loading…</p>"), er = K("<span class=\"mini svelte-1uaoa1p\"> </span>"), tr = K("<span class=\"mini off svelte-1uaoa1p\"> </span>"), nr = K("<div><dt class=\"svelte-1uaoa1p\"> </dt><dd class=\"svelte-1uaoa1p\"> </dd></div>"), rr = K("<option disabled=\"\"> </option>"), ir = K("<option> </option>"), ar = K("<div class=\"shoe svelte-1uaoa1p\"><dt class=\"svelte-1uaoa1p\"><label>Shoe</label></dt><dd class=\"svelte-1uaoa1p\"><select class=\"svelte-1uaoa1p\"><!><!></select></dd></div>"), or = K("<dl class=\"svelte-1uaoa1p\"><!> <!></dl>"), sr = K("<p class=\"caption note svelte-1uaoa1p\"> </p>"), cr = K("<p> </p>"), lr = K("<p class=\"check svelte-1uaoa1p\"> </p>"), ur = K("<button type=\"button\">Not a run…</button>"), dr = K("<select aria-label=\"Change the type to\" class=\"svelte-1uaoa1p\"><option disabled=\"\">Choose a type</option><!><!></select>"), fr = K("<button type=\"button\" class=\"link svelte-1uaoa1p\">Clear decision</button>"), pr = K("<div class=\"acts review svelte-1uaoa1p\"><button type=\"button\">Counts for the plan day</button> <button type=\"button\">A run, not the programme</button> <!> <!> <!></div>"), mr = K("<h3 class=\"svelte-1uaoa1p\">Programme</h3> <!> <!>", 1), hr = K("<p class=\"caption note svelte-1uaoa1p\">Map unavailable</p>"), gr = K("<div class=\"ph svelte-1uaoa1p\" aria-hidden=\"true\"></div>"), _r = K("<h3 class=\"svelte-1uaoa1p\"> </h3> <!>", 1), vr = K("<!> <!>", 1), yr = K("<li class=\"svelte-1uaoa1p\"><span class=\"zn svelte-1uaoa1p\"> <small class=\"svelte-1uaoa1p\"> </small></span> <span class=\"bar svelte-1uaoa1p\"><span class=\"svelte-1uaoa1p\"></span></span> <span class=\"num svelte-1uaoa1p\"> </span></li>"), br = K("<h3 class=\"svelte-1uaoa1p\">Heart-rate zones</h3> <ul class=\"zones svelte-1uaoa1p\"></ul>", 1), xr = K("<tr><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td></tr>"), Sr = K("<h3 class=\"svelte-1uaoa1p\">Splits</h3> <table class=\"svelte-1uaoa1p\"><thead><tr><th class=\"svelte-1uaoa1p\">Km</th><th class=\"svelte-1uaoa1p\">Time</th><th class=\"svelte-1uaoa1p\"> </th><th class=\"svelte-1uaoa1p\">HR</th><th class=\"svelte-1uaoa1p\">Climb</th></tr></thead><tbody></tbody></table>", 1), Cr = K("<span role=\"img\" aria-label=\"Record\">🏆</span>"), wr = K("<li class=\"svelte-1uaoa1p\"> <b class=\"svelte-1uaoa1p\"> </b><!></li>"), Tr = K("<h3 class=\"svelte-1uaoa1p\">Exercises</h3> <ul class=\"gym svelte-1uaoa1p\"><!> <li class=\"vol svelte-1uaoa1p\">Total volume · <b class=\"svelte-1uaoa1p\"> </b></li></ul>", 1), Er = K("<span class=\"ask svelte-1uaoa1p\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1uaoa1p\">Delete</button>", 1), Dr = K("<button type=\"button\"> </button>"), Or = K("<div class=\"acts svelte-1uaoa1p\"><!></div>"), kr = K("<p class=\"sub svelte-1uaoa1p\"> <!> <!></p> <!> <!> <!> <!> <!> <!> <!> <!>", 1);
function Ar(e, t) {
	let n = k();
	F(t, !0);
	let i = X(t, "shoes", 3, null), c = X(t, "reviewTypes", 19, () => ({})), l = () => import("./viz-npB_Vk-6.js"), u, f = W(null), p = W(null), m = W(null), g = W(null), _ = W(null), v = W(!1), S = W(!1), w = 0;
	async function T(e) {
		let n = u.show();
		if (!n) return;
		let r = ++w;
		x(f, e), x(p, x(m, x(_, null))), x(v, x(S, !1), !0), n.scrollTop = 0;
		try {
			let n = await Re(`workout?person=${encodeURIComponent(t.person)}&key=${encodeURIComponent(e.key)}`);
			if (r !== w) return;
			x(p, n), (n.route?.length || n.series) && !L(g) && l().then((e) => x(g, e), (e) => r === w && x(_, e));
		} catch (e) {
			r === w && x(m, e);
		}
	}
	function E() {
		w++, x(f, x(p, null));
	}
	let D = U(() => L(f) && `${t.person}/${L(f).key}`), O = U(() => L(D) && ct[L(D)]), A = U(() => {
		if (!L(f)) return null;
		let e = t.feed.find((e) => e.key === L(f).key) ?? {
			...L(p)?.summary,
			...L(f),
			excluded: lt[L(D)] ?? L(f).excluded ?? !1
		};
		return L(O) && L(O).want !== null ? {
			...e,
			excluded: L(O).want
		} : e;
	}), M = U(() => L(p) && L(A) ? De(t.viewer, t.person, L(A)) : {
		remove: null,
		shoe: !1
	}), N = U(() => L(M).shoe && i() ? b(i(), t.runShoes?.[L(f).key]) : null), P = U(() => L(p) && Ge(L(p).summary)), I = U(() => L(p) ? ue(L(p)).filter(([e]) => !(e === "Shoe" && L(N)?.options.length)) : []), R = U(() => L(p) && Fe(L(p))), ee = U(() => L(p) && xe(L(p).zones, L(p).max_hr)), te = U(() => L(p) ? _e(L(p)) : []), ne = U(() => L(p) && Le(L(p).gym)), z = U(() => L(p) && Ze(L(p))), re = U(() => L(A)?.check ?? null), V = U(() => L(A)?.review ?? null), ie = U(() => c()[L(A)?.source] ?? []), ae = U(() => L(A)?.km && L(A).minutes ? L(A).km / (L(A).minutes / 60) : null), oe = (e) => e.status === 404 ? "Workout not found" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant";
	async function se(e) {
		let n = e.currentTarget;
		await Tt(t.person, L(f).key, Number(n.value)) || (n.value = String(L(N).value));
	}
	let ce = (e, n = null, r = "") => wt(t.person, L(f).key, e, n, r);
	async function de(e) {
		let t = e.currentTarget.value;
		await ce("type", t, L(ie).find((e) => e.match === t)?.name ?? t);
	}
	let fe = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function pe() {
		L(M).remove === "delete" ? x(v, !0) : bt(t.person, L(f).key, L(M).remove);
	}
	var he = { open: T };
	{
		let i = U(() => L(P)?.title ?? L(f)?.name ?? "Workout");
		Ne(yn(e, {
			get title() {
				return L(i);
			},
			drag: !0,
			wide: !0,
			onclose: E,
			children: (e, i) => {
				var c = r(), l = H(c), b = (e) => {
					var t = Qn(), n = h(t, !0);
					a((e) => j(n, e), [() => oe(L(m))]), q(e, t);
				}, w = (e) => {
					var t = $n();
					q(e, t);
				}, T = (e) => {
					var i = kr(), c = H(i), l = B(c), m = C(l), b = (e) => {
						var t = er(), n = h(t, !0);
						a(() => j(n, L(P).plan)), q(e, t);
					};
					d(m, (e) => {
						L(P).plan && e(b);
					});
					var w = C(m, 2), T = (e) => {
						var t = tr(), n = h(t, !0);
						a((e) => j(n, e), [() => o(L(A)).label]), q(e, t);
					}, E = U(() => L(A) && o(L(A)).label);
					d(w, (e) => {
						L(E) && e(T);
					}), Y(c);
					var D = C(c, 2), k = (e) => {
						var t = or(), r = B(t);
						s(r, 17, () => L(I), ([e, t]) => e, (e, t) => {
							var n = U(() => Oe(L(t), 2));
							let r = () => L(n)[0], i = () => L(n)[1];
							var o = nr(), s = B(o), c = h(s, !0), l = C(s), u = h(l, !0);
							Y(o), a(() => {
								j(c, r()), j(u, i());
							}), q(e, o);
						});
						var i = C(r, 2), o = (e) => {
							var t = ar(), r = B(t), i = h(r), o = C(r), c = B(o), l = B(c), u = (e) => {
								var t = rr(), n = h(t, !0);
								t.value = t.__value = "", a(() => j(n, L(N).extra)), q(e, t);
							};
							d(l, (e) => {
								L(N).extra && e(u);
							});
							var f = C(l);
							s(f, 17, () => L(N).options, (e) => e.id, (e, t) => {
								var n = ir(), r = h(n, !0), i = {};
								a(() => {
									j(r, L(t).label), i !== (i = L(t).id) && (n.value = (n.__value = i) ?? "");
								}), q(e, n);
							}), Y(c);
							var p;
							we(c), Y(o), Y(t), a(() => {
								J(i, "for", `${n}-shoe`), J(c, "id", `${n}-shoe`), p !== (p = L(N).value) && (c.value = (c.__value = p) ?? "", le(c, p));
							}), y("change", c, se), q(e, t);
						};
						d(i, (e) => {
							L(N)?.options.length && e(o);
						}), Y(t), q(e, t);
					};
					d(D, (e) => {
						(L(I).length || L(N)?.options.length) && e(k);
					});
					var F = C(D, 2), oe = (e) => {
						var t = sr(), n = h(t, !0);
						a((e) => j(n, e), [() => me(L(p).note)]), q(e, t);
					}, W = U(() => me(L(p).note));
					d(F, (e) => {
						L(W) && e(oe);
					});
					var G = C(F, 2), ue = (e) => {
						var t = mr(), n = C(H(t), 2), r = (e) => {
							var t = cr();
							let n;
							var r = h(t, !0);
							a((e) => {
								n = Q(t, 1, "check svelte-1uaoa1p", null, n, { warn: L(A).needs_review }), j(r, e);
							}, [() => Ce(L(re), L(ae))]), q(e, t);
						}, i = (e) => {
							var t = lr(), n = h(t);
							a((e) => j(n, `Changed to ${e ?? ""}`), [() => L(ie).find((e) => e.match === L(V).type_match)?.name ?? L(V).type_match]), q(e, t);
						};
						d(n, (e) => {
							L(re) ? e(r) : L(V).decision === "type" && e(i, 1);
						});
						var o = C(n, 2), c = (e) => {
							var t = pr(), n = B(t);
							let r;
							var i = C(n, 2);
							let o;
							var c = C(i, 2), l = (e) => {
								var t = ur();
								let n;
								a(() => {
									n = Q(t, 1, "btn svelte-1uaoa1p", null, n, { on: L(V)?.decision === "type" }), J(t, "aria-pressed", L(V)?.decision === "type");
								}), y("click", t, () => x(S, !L(S))), q(e, t);
							};
							d(c, (e) => {
								L(ie).length && e(l);
							});
							var u = C(c, 2), f = (e) => {
								var t = dr(), n = B(t);
								n.value = n.__value = "";
								var r = C(n), i = (e) => {
									var t = ir(), n = h(t, !0), r = {};
									a(() => {
										j(n, L(V).type_match), r !== (r = L(V).type_match) && (t.value = (t.__value = r) ?? "");
									}), q(e, t);
								}, o = U(() => L(V)?.type_match && !L(ie).some((e) => e.match === L(V).type_match));
								d(r, (e) => {
									L(o) && e(i);
								});
								var c = C(r);
								s(c, 17, () => L(ie), (e) => e.match, (e, t) => {
									var n = ir(), r = h(n, !0), i = {};
									a(() => {
										j(r, L(t).name), i !== (i = L(t).match) && (n.value = (n.__value = i) ?? "");
									}), q(e, n);
								}), Y(t);
								var l;
								we(t), a(() => {
									l !== (l = L(V)?.decision === "type" ? L(V).type_match : "") && (t.value = (t.__value = l) ?? "", le(t, l));
								}), y("change", t, de), q(e, t);
							};
							d(u, (e) => {
								(L(S) || L(V)?.decision === "type") && e(f);
							});
							var p = C(u, 2), m = (e) => {
								var t = fr();
								y("click", t, () => ce(null)), q(e, t);
							};
							d(p, (e) => {
								L(V) && e(m);
							}), Y(t), a(() => {
								r = Q(n, 1, "btn svelte-1uaoa1p", null, r, { on: L(V)?.decision === "plan" }), J(n, "aria-pressed", L(V)?.decision === "plan"), o = Q(i, 1, "btn svelte-1uaoa1p", null, o, { on: L(V)?.decision === "run" }), J(i, "aria-pressed", L(V)?.decision === "run");
							}), y("click", n, () => ce("plan", null, L(re)?.label ?? "the plan day")), y("click", i, () => ce("run")), q(e, t);
						};
						d(o, (e) => {
							L(M).remove !== null && (L(A).needs_review || L(V)) && e(c);
						}), q(e, t);
					};
					d(G, (e) => {
						(L(re) || L(V)) && e(ue);
					});
					var he = C(G, 2), ge = (e) => {
						var t = r(), n = H(t), i = (e) => {
							var t = hr();
							q(e, t);
						}, o = (e) => {
							var t = gr();
							let n;
							a(() => n = Z(t, "", n, { height: `${L(p).route?.length ? 220 : 0}px` })), q(e, t);
						}, c = (e) => {
							var t = vr(), n = H(t), i = (e) => {
								var t = r(), n = H(t);
								{
									let e = U(() => Me(L(p)) ? "run" : "gym");
									rt(n, () => L(g).MapView, (t, n) => {
										n(t, {
											get route() {
												return L(p).route;
											},
											get kind() {
												return L(e);
											}
										});
									});
								}
								q(e, t);
							};
							d(n, (e) => {
								L(p).route?.length && e(i);
							});
							var o = C(n, 2);
							s(o, 17, () => L(R)?.list ?? [], (e) => e.label, (e, t) => {
								var n = _r(), r = H(n), i = h(r, !0), o = C(r, 2);
								rt(o, () => L(g).Chart, (e, n) => {
									n(e, {
										get x() {
											return L(R).x;
										},
										get label() {
											return L(t).label;
										},
										get values() {
											return L(t).values;
										},
										get color() {
											return L(t).color;
										},
										get fmt() {
											return L(t).fmt;
										}
									});
								}), a(() => j(i, L(t).label)), q(e, n);
							}), q(e, t);
						};
						d(n, (e) => {
							L(_) ? e(i) : L(g) ? e(c, -1) : e(o, 1);
						}), q(e, t);
					};
					d(he, (e) => {
						(L(p).route?.length || L(R)?.list.length) && e(ge);
					});
					var _e = C(he, 2), ve = (e) => {
						var t = br(), n = C(H(t), 2);
						s(n, 21, () => L(ee), (e) => e.zone, (e, t) => {
							var n = yr(), r = B(n), i = B(r), o = C(i), s = h(o, !0);
							Y(r);
							var c = C(r, 2), l = B(c);
							let u;
							Y(c);
							var d = C(c, 2), f = h(d);
							Y(n), a(() => {
								j(i, `${L(t).zone ?? ""} `), j(s, L(t).bpm), u = Z(l, "", u, { width: `${L(t).pct ?? ""}%` }), j(f, `${L(t).time ?? ""} · ${L(t).pct ?? ""}%`);
							}), q(e, n);
						}), Y(n), q(e, t);
					};
					d(_e, (e) => {
						L(ee) && e(ve);
					});
					var ye = C(_e, 2), be = (e) => {
						var t = Sr(), n = C(H(t), 2), r = B(n), i = B(r), o = C(B(i), 2), c = h(o, !0);
						Ye(2), Y(i), Y(r);
						var l = C(r);
						s(l, 21, () => L(te), tt, (e, t) => {
							var n = xr(), r = B(n), i = h(r, !0), o = C(r), s = h(o, !0), c = C(o), l = h(c, !0), u = C(c), d = h(u, !0), f = C(u), p = h(f, !0);
							Y(n), a(() => {
								j(i, L(t).km), j(s, L(t).time), j(l, L(t).pace), j(d, L(t).hr), j(p, L(t).climb);
							}), q(e, n);
						}), Y(l), Y(n), a(() => j(c, L(z) ? "km/h" : "Pace")), q(e, t);
					};
					d(ye, (e) => {
						L(te).length && e(be);
					});
					var xe = C(ye, 2), Se = (e) => {
						var t = Tr(), n = C(H(t), 2), r = B(n);
						s(r, 17, () => L(ne).exercises, tt, (e, t) => {
							var n = wr(), r = B(n), i = C(r), o = h(i, !0), s = C(i), c = (e) => {
								var t = Cr();
								q(e, t);
							};
							d(s, (e) => {
								L(t).record && e(c);
							}), Y(n), a(() => {
								j(r, `${L(t).name ?? ""} · `), j(o, L(t).set);
							}), q(e, n);
						});
						var i = C(r, 2), o = C(B(i)), c = h(o, !0);
						Y(i), Y(n), a(() => j(c, L(ne).volume)), q(e, t);
					};
					d(xe, (e) => {
						L(ne) && e(Se);
					});
					var Te = C(xe, 2), Ee = (e) => {
						var n = Or(), r = B(n), i = (e) => {
							var n = Er(), r = C(H(n), 2), i = C(r, 2);
							y("click", r, () => x(v, !1)), y("click", i, () => (bt(t.person, L(f).key, "remove"), u.close())), q(e, n);
						}, o = (e) => {
							var t = Dr();
							let n;
							var r = h(t, !0);
							a(() => {
								n = Q(t, 1, "btn svelte-1uaoa1p", null, n, { danger: L(M).remove !== "restore" }), j(r, fe[L(M).remove]);
							}), y("click", t, pe), q(e, t);
						};
						d(r, (e) => {
							L(v) ? e(i) : e(o, -1);
						}), Y(n), q(e, n);
					};
					d(Te, (e) => {
						L(M).remove && L(O)?.want !== null && e(Ee);
					}), a(() => j(l, `${L(P).date ?? ""} · ${L(P).time ?? ""} · ${L(P).duration ?? ""} `)), q(e, i);
				};
				d(l, (e) => {
					L(m) ? e(b) : L(p) ? e(T, -1) : e(w, 1);
				}), q(e, c);
			},
			$$slots: { default: !0 }
		}), (e) => u = e, () => u);
	}
	return G(he);
}
p(["change", "click"]);
// src/lib/ui/Details.svelte
var jr = K("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), Mr = K("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), Nr = K("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), Pr = K("<section><h2 class=\"svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), Fr = K("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!> <!> <!>", 1);
function Ir(e, t) {
	let n = k();
	F(t, !0);
	let r = X(t, "connect", 3, null), i = X(t, "reviewTypes", 19, () => ({})), o = U(() => z(t.person.pbs)), s = U(() => ae(t.person, t.canEdit)), c = W(void 0), l = W(void 0), u = (e) => L(l).open(e);
	var f = Fr(), p = H(f), m = (e) => {
		var r = jr(), i = B(r);
		un(C(i, 2), { get plan() {
			return t.person.plan;
		} }), Y(r), a(() => {
			J(r, "aria-labelledby", `${n}-plan`), J(i, "id", `${n}-plan`);
		}), q(e, r);
	};
	d(p, (e) => {
		t.person.plan && e(m);
	});
	var g = C(p, 2), _ = B(g), v = C(_, 2);
	ne(v, () => t.id, (e) => {
		nn(e, {
			get person() {
				return t.id;
			},
			get items() {
				return t.person.feed;
			},
			get records() {
				return L(o);
			},
			onopen: u
		});
	}), Y(g);
	var b = C(g, 2), S = B(b), w = C(B(S)), T = h(w);
	Y(S), Vt(C(S, 2), { get badges() {
		return t.person.badges;
	} }), Y(b);
	var E = C(b, 2), D = B(E);
	In(C(D, 2), {
		get person() {
			return t.person;
		},
		onopen: u
	}), Y(E);
	var O = C(E, 2);
	{
		let e = U(() => L(s) ? t.person.shoes : null);
		Ne(Ar(O, {
			get person() {
				return t.id;
			},
			get feed() {
				return t.person.feed;
			},
			get viewer() {
				return t.viewer;
			},
			get shoes() {
				return L(e);
			},
			get runShoes() {
				return t.person.run_shoes;
			},
			get reviewTypes() {
				return i();
			}
		}), (e) => x(l, e, !0), () => L(l));
	}
	var A = C(O, 2), M = (e) => {
		var r = Pr(), i = H(r), o = B(i), l = C(B(o)), u = (e) => {
			var t = Mr();
			y("click", t, () => L(c).open()), q(e, t);
		};
		d(l, (e) => {
			L(s) && e(u);
		}), Y(o);
		var f = C(o, 2), p = (e) => {
			Bn(e, { get shoes() {
				return t.person.shoes;
			} });
		}, m = (e) => {
			var t = Nr();
			q(e, t);
		};
		d(f, (e) => {
			t.person.shoes.length ? e(p) : e(m, -1);
		}), Y(i);
		var h = C(i, 2), g = (e) => {
			Ne(Zn(e, {
				get person() {
					return t.id;
				},
				get shoes() {
					return t.person.shoes;
				}
			}), (e) => x(c, e, !0), () => L(c));
		};
		d(h, (e) => {
			L(s) && e(g);
		}), a(() => {
			J(i, "aria-labelledby", `${n}-shoes`), J(o, "id", `${n}-shoes`);
		}), q(e, r);
	};
	d(A, (e) => {
		(t.person.shoes?.length || L(s)) && e(M);
	});
	var N = C(A, 2), P = (e) => {
		Ft(e, {
			get info() {
				return r();
			},
			get now() {
				return t.now;
			},
			get person() {
				return t.person;
			},
			collapsed: !0
		});
	};
	d(N, (e) => {
		r() && e(P);
	}), a(() => {
		J(g, "aria-labelledby", `${n}-feed`), J(_, "id", `${n}-feed`), J(b, "aria-labelledby", `${n}-badges`), J(S, "id", `${n}-badges`), j(T, `${t.person.badges.count ?? ""} unlocked`), J(E, "aria-labelledby", `${n}-pbs`), J(D, "id", `${n}-pbs`);
	}), q(e, f), G();
}
p(["click"]);
// src/lib/ui/Goals.svelte
var Lr = K("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), Rr = K("<p class=\"msg\" role=\"status\"> </p>"), zr = K("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!> <label class=\"year svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Birth year</span> <input type=\"number\" inputmode=\"numeric\" min=\"1900\" placeholder=\"1990\" class=\"svelte-7wncvy\"/></label> <p class=\"caption maxhr svelte-7wncvy\"> </p></section>"), Br = K("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), Vr = K("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), Hr = K("<button type=\"button\" class=\"btn\">Cancel change</button>"), Ur = K("<p class=\"caption svelte-7wncvy\"><!></p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!> <!>", 1), Wr = K("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function Gr(e, r) {
	let i = k();
	F(r, !0);
	let o = [], c = (e, t = Ue, n = Ue, i = Ue) => {
		let o = U(() => {
			let [e, t, r] = ze[n()];
			return {
				lo: e,
				hi: t,
				step: r
			};
		});
		var s = Lr(), c = B(s), l = h(c, !0), u = C(c, 2), d = C(u, 2), f = h(d, !0), p = C(d, 2);
		Y(s), a((e, a, c, d) => {
			J(s, "aria-label", i()), j(l, e), J(u, "aria-label", `Fewer ${a ?? ""}`), u.disabled = r.readOnly || t()[n()] <= L(o).lo, j(f, c), J(p, "aria-label", `More ${d ?? ""}`), p.disabled = r.readOnly || t()[n()] >= L(o).hi;
		}, [
			() => i().split(",")[0],
			() => S(i()),
			() => w(n(), t()[n()]),
			() => S(i())
		]), y("click", u, () => t()[n()] = ce(n(), t()[n()] - L(o).step)), y("click", p, () => t()[n()] = ce(n(), t()[n()] + L(o).step)), q(e, s);
	}, l = W(null), p = W(null), m = W(null), g = W(!1);
	de(() => {
		Re("settings").then((e) => {
			x(l, e, !0), x(m, u(e, r.people), !0);
		}, (e) => x(p, e, !0));
	});
	let _ = {
		runs: "Runs per week",
		workouts: "Workouts per week",
		active_days: "Active days per week",
		steps: "Steps for an active day"
	}, v = [
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
	], b = {
		together: "Workouts together per week",
		team: "Team points per week"
	}, S = (e) => e[0].toLowerCase() + e.slice(1), w = (e, t) => e === "steps" ? t.toLocaleString("en-US") : String(t);
	async function T() {
		x(g, !0);
		let e = await vt(t(L(m)), r.people, L(l).week_start);
		x(g, !1), e && r.onsaved();
	}
	async function E() {
		x(g, !0);
		let e = await yt();
		x(g, !1), e && r.onsaved();
	}
	var D = Wr(), O = C(H(D), 2), A = (e) => {
		var t = Rr(), n = h(t, !0);
		a(() => j(n, L(p) ? L(p).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), q(e, t);
	}, M = (e) => {
		var t = Ur(), u = H(t), p = B(u), x = (e) => {
			var t = N();
			a((e) => j(t, `New goals from Monday ${e ?? ""} are saved`), [() => se(L(l).pending.from)]), q(e, t);
		}, S = (e) => {
			var t = N();
			a((e, n) => j(t, `Changes apply from Monday ${e ?? ""} (week ${n ?? ""})`), [() => se(L(l).applies_from), () => n(L(l).applies_from)]), q(e, t);
		}, w = (e) => {
			var t = N();
			a((e) => j(t, `Applies from this week (week ${e ?? ""})`), [() => n(L(l).week_start)]), q(e, t);
		};
		d(p, (e) => {
			L(l).pending ? e(x) : L(l).applies_from > L(l).week_start ? e(S, 1) : e(w, -1);
		}), Y(u);
		var D = C(u, 2);
		s(D, 16, () => Object.keys(L(m).people), (e) => e, (e, t) => {
			let n = U(() => r.people[t]?.name ?? t);
			var o = zr(), l = B(o), u = h(l, !0), d = C(l, 2);
			s(d, 16, () => Pe, (e) => e, (e, r) => {
				c(e, () => L(m).people[t], () => r, () => `${_[r]}, ${L(n)}`);
			});
			var p = C(d, 2), g = C(B(p), 2);
			Be(g), Y(p);
			var v = C(p, 2), y = h(v, !0);
			Y(o), a((e, a) => {
				J(o, "aria-labelledby", `${i}-${t ?? ""}`), J(l, "id", `${i}-${t ?? ""}`), j(u, L(n)), J(g, "max", e), g.disabled = r.readOnly, j(y, a);
			}, [() => (/* @__PURE__ */ new Date()).getFullYear(), () => f(r.people[t]?.max_hr)]), Se(g, () => L(m).profiles[t].birth_year, (e) => L(m).profiles[t].birth_year = e), q(e, o);
		});
		var O = C(D, 2), k = B(O), A = C(k, 2);
		s(A, 21, () => v, (e) => e.mode, (e, t) => {
			var n = Br();
			let s;
			var c = B(n);
			Be(c);
			var l, u = C(c, 1, !0);
			Y(n), a(() => {
				s = Q(n, 1, "svelte-7wncvy", null, s, { on: L(m).couple.mode === L(t).mode }), J(c, "name", `${i}-mode`), c.disabled = r.readOnly, l !== (l = L(t).mode) && (c.value = (c.__value = l) ?? ""), j(u, L(t).label);
			}), ve(o, [], c, () => (L(t).mode, L(m).couple.mode), (e) => L(m).couple.mode = e), q(e, n);
		}), Y(A);
		var M = C(A, 2), P = h(M, !0), F = C(M, 2), I = (e) => {
			c(e, () => L(m).couple, () => L(m).couple.mode, () => b[L(m).couple.mode]);
		};
		d(F, (e) => {
			b[L(m).couple.mode] && e(I);
		});
		var R = C(F, 2), ee = C(B(R), 2);
		Be(ee), Y(R), Y(O);
		var te = C(O, 2), ne = (e) => {
			var t = Vr();
			a(() => t.disabled = L(g)), y("click", t, T), q(e, t);
		};
		d(te, (e) => {
			r.readOnly || e(ne);
		});
		var z = C(te, 2), re = (e) => {
			var t = Hr();
			a(() => t.disabled = L(g)), y("click", t, E), q(e, t);
		};
		d(z, (e) => {
			!r.readOnly && L(l).pending && e(re);
		}), a((e) => {
			J(O, "aria-labelledby", `${i}-couple`), J(k, "id", `${i}-couple`), J(A, "aria-labelledby", `${i}-couple`), j(P, e), ee.disabled = r.readOnly;
		}, [() => v.find((e) => e.mode === L(m).couple.mode).hint]), Se(ee, () => L(m).couple.reward, (e) => L(m).couple.reward = e), q(e, t);
	};
	d(O, (e) => {
		L(m) ? e(M, -1) : e(A);
	}), q(e, D), G();
}
p(["click"]);
// src/lib/ui/Header.svelte
var Kr = K("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), qr = D("<svg class=\"brand svelte-16l0jix\" viewBox=\"0 0 100 100\" aria-hidden=\"true\"><defs><linearGradient id=\"hdr-brand\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#FFB340\"></stop><stop offset=\"1\" stop-color=\"#FF453A\"></stop></linearGradient></defs><rect width=\"100\" height=\"100\" rx=\"22.4\" fill=\"url(#hdr-brand)\"></rect><path d=\"M50 20 L80 45 V80 H20 V45 Z\" fill=\"#FFF\" stroke=\"#FFF\" stroke-width=\"6\" stroke-linejoin=\"round\"></path><path d=\"M50 42 C55 49 63 55 63 65.5 a13 13 0 0 1 -26 0 C37 58 42 53 45.5 49 C46 53.5 48 56.5 51 57.5 C49.5 52 49 47 50 42 Z\" fill=\"#FF6B2C\"></path></svg>"), Jr = K("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), Yr = K("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"><!> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function Xr(e, t) {
	let n = X(t, "subtitle", 3, ""), r = X(t, "actionLabel", 3, ""), i = X(t, "brand", 3, !1), o = W(0);
	var s = Yr();
	let c;
	var l = B(s), u = B(l), f = (e) => {
		var n = Kr();
		y("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), q(e, n);
	};
	d(u, (e) => {
		t.onback && e(f);
	});
	var p = C(u, 2), m = B(p), g = B(m), _ = (e) => {
		var t = qr();
		q(e, t);
	};
	d(g, (e) => {
		i() && e(_);
	});
	var v = C(g);
	Y(m);
	var b = C(m, 2), S = (e) => {
		var n = Jr(), i = h(n, !0);
		a(() => j(i, r())), y("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), q(e, n);
	};
	d(b, (e) => {
		t.onaction && e(S);
	}), Y(p);
	var w = C(p, 2), T = h(w, !0);
	Y(l), Y(s), a(() => {
		c = Q(s, 1, "svelte-16l0jix", null, c, { scrolled: L(o) > 0 }), j(v, ` ${t.title ?? ""}`), j(T, n() || "\xA0");
	}), ge("y", () => L(o), (e) => x(o, e, !0)), q(e, s);
}
p(["click"]);
// src/lib/motion.js
function Zr(e, { onFrame: t, onSettle: n, snap: r = {
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
var Qr = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), $r = (e) => Qr(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function ei({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var ti = D("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), ni = D("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function ri(e, t) {
	F(t, !0);
	let n = X(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, o = W(He(Je.reducedMotion ? i : 0)), c = U(() => n() * .11), l = U(() => t.fractions.map((e, t) => {
		let a = n() / 2 - L(c) / 2 - t * L(c) * 1.3, s = 2 * Math.PI * a;
		return {
			kind: r[t],
			r: a,
			c: s,
			len: s * e * L(o) / i
		};
	}));
	de(() => {
		if (L(o) === i) return;
		let e = Zr(ei({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => x(o, e, !0) });
		return e.to(i), e.stop;
	});
	var u = ni();
	let d;
	s(u, 21, () => L(l), (e) => e.kind, (e, t) => {
		var r = ti(), i = H(r);
		let o;
		var s = C(i);
		let l;
		a(() => {
			J(i, "cx", n() / 2), J(i, "cy", n() / 2), J(i, "r", L(t).r), J(i, "stroke-width", L(c)), o = Z(i, "", o, { stroke: `var(--${L(t).kind ?? ""})` }), J(s, "cx", n() / 2), J(s, "cy", n() / 2), J(s, "r", L(t).r), J(s, "stroke-width", L(c)), J(s, "stroke-dasharray", `${L(t).len ?? ""} ${L(t).c ?? ""}`), J(s, "opacity", +(L(t).len > .01)), J(s, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), l = Z(s, "", l, { stroke: `var(--${L(t).kind ?? ""})` });
		}), q(e, r);
	}), Y(u), a(() => {
		J(u, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), d = Z(u, "", d, { width: `${n() / 16}rem` });
	}), q(e, u), G();
}
// src/lib/ui/PersonTile.svelte
var ii = K("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), ai = K("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), oi = K("<span class=\"streak svelte-1handop\"> </span>"), si = K("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), ci = K("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), li = K("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), ui = K("<span class=\"steps svelte-1handop\"> </span>"), di = K("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), fi = K("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), pi = K("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function mi(t, n) {
	F(n, !0);
	let r = X(n, "index", 3, 0), i = X(n, "compact", 3, !1), o = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], c = U(() => o[r() % o.length]), l = U(() => Oe(L(c), 2)), u = U(() => L(l)[0]), f = U(() => L(l)[1]), p = U(() => E(n.person)), g = U(() => n.person.week), _ = [
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
	], v = U(() => _.map((e, t) => ({
		...e,
		n: R(L(g))[t],
		of: et(L(g))[t]
	}))), b = U(() => e(n.person.steps_today, L(g).goal.steps)), x = U(() => [
		`Level ${L(p).level}`,
		i() ? `🔥 ${n.person.streak} wk` : `${n.person.xp.toLocaleString()} XP`,
		L(g).paused && "Week paused",
		L(g).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), S = U(() => `${n.person.name}, level ${L(p).level}. This week ${L(v).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${L(g).goal_pending ? "New goals pending. " : ""}${L(g).bonus ? "Weekly bonus earned. " : ""}${L(b) ? L(b).replace("👟 ", "") + ". " : ""}Streak ${n.person.streak} weeks.`);
	var w = pi();
	let T;
	var D = B(w), O = B(D), k = B(O);
	let A;
	var M = h(k, !0), N = C(k, 2), P = B(N), I = h(P, !0), ee = C(P, 2), te = h(ee, !0);
	Y(N);
	var ne = C(N, 2), z = (e) => {
		var t = ai(), n = H(t), r = B(n);
		{
			let e = U(() => m(L(g)));
			ri(r, {
				get fractions() {
					return L(e);
				},
				size: 44
			});
		}
		var i = C(r, 2), o = (e) => {
			var t = ii();
			q(e, t);
		};
		d(i, (e) => {
			L(g).bonus && e(o);
		}), Y(n);
		var s = C(n, 2), c = h(s, !0);
		a(() => j(c, L(S))), q(e, t);
	}, re = (e) => {
		var t = oi(), r = h(t);
		a(() => j(r, `🔥 ${n.person.streak ?? ""} wk`)), q(e, t);
	};
	d(ne, (e) => {
		i() ? e(z) : e(re, -1);
	});
	var V = C(ne, 2), ie = (e) => {
		var t = si();
		q(e, t);
	};
	d(V, (e) => {
		n.onopen && e(ie);
	}), Y(O);
	var ae = C(O, 2), oe = (e) => {
		var t = di(), n = H(t), r = B(n), i = B(r);
		{
			let e = U(() => m(L(g))), t = U(() => Je.wide ? 112 : 88);
			ri(i, {
				get fractions() {
					return L(e);
				},
				get size() {
					return L(t);
				}
			});
		}
		var o = C(i, 2), c = (e) => {
			var t = ci();
			q(e, t);
		};
		d(o, (e) => {
			L(g).bonus && e(c);
		}), Y(r);
		var l = C(r, 2);
		s(l, 21, () => L(v), (e) => e.kind, (e, t) => {
			var n = li(), r = B(n), i = B(r);
			let o;
			var s = C(i, 1, !0);
			Y(r);
			var c = C(r, 2), l = B(c, !0), u = C(l), d = h(u);
			Y(c), Y(n), a(() => {
				o = Z(i, "", o, { background: `var(--${L(t).kind ?? ""})` }), j(s, L(t).label), j(l, L(t).n), j(d, `/${L(t).of ?? ""}`);
			}), q(e, n);
		}), Y(l), Y(n);
		var u = C(n, 2), f = (e) => {
			var t = ui(), n = h(t, !0);
			a(() => j(n, L(b))), q(e, t);
		};
		d(u, (e) => {
			L(b) && e(f);
		});
		var _ = C(u, 2), y = B(_), x = B(y);
		let S;
		Y(y);
		var w = C(y, 2), T = h(w);
		Y(_), a((e, t) => {
			S = Z(x, "", S, { width: `${L(p).frac * 100}%` }), j(T, `${e ?? ""} of ${t ?? ""} XP to level ${L(p).level + 1}`);
		}, [() => L(p).into.toLocaleString(), () => L(p).span.toLocaleString()]), q(e, t);
	};
	d(ae, (e) => {
		i() || e(oe);
	}), Y(D);
	var W = C(D, 2), se = (e) => {
		var t = fi();
		a(() => J(t, "aria-label", L(S))), y("click", t, function(...e) {
			n.onopen?.apply(this, e);
		}), q(e, t);
	};
	d(W, (e) => {
		n.onopen && e(se);
	}), Y(w), a((e) => {
		T = Q(w, 1, "tile glass svelte-1handop", null, T, {
			compact: i(),
			opens: n.onopen
		}), J(D, "aria-hidden", n.onopen ? "true" : void 0), A = Z(k, "", A, {
			"--a1": L(u),
			"--a2": L(f)
		}), j(M, e), j(I, n.person.name), j(te, L(x));
	}, [() => n.person.name.slice(0, 1)]), q(t, w), G();
}
p(["click"]);
// src/lib/ui/Sheet.svelte
var hi = K("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), gi = K("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function _i(e, t) {
	F(t, !0);
	let n = X(t, "from", 3, null), r = 1e3, i = Je.reducedMotion, o = W(He(i ? r : 0)), s = W(0), c = W(1), l = W(!1), u = W("50% 100%"), f, p, m = !1, h = null, g = U(() => i ? +L(l) : Math.min(1, L(o) / 500)), v = U(() => i ? 1 : .5 + .5 * L(o) / r), b = () => {
		m && (L(o) === 0 || L(s) >= L(c)) && (m = !1, t.onclose());
	};
	function S(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = ei({
					value: r,
					damping: o,
					response: s
				}), n = Zr(t, {
					onFrame: e,
					onSettle: b
				}), n.to(i, a);
			}
		};
	}
	let w = S((e) => x(o, e, !0)), E = S((e) => x(s, e, !0));
	function D() {
		m || h || (m = !0, i ? (x(l, !1), setTimeout(t.onclose, $r("--fade"))) : w.to(L(o), 0, { response: .3 }));
	}
	function O(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), w.stop(), E.stop(), m = !1, h = {
			from: L(s),
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		});
	}
	function k(e) {
		if (!h) return;
		let t = h.from + e.clientY - h.start;
		x(s, t < 0 ? -mn(-t, L(c)) : t, !0), h.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), h.samples.length > 8 && h.samples.shift();
	}
	function A(e) {
		if (!h) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = pn([...h.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		h = null, fn(L(s), n, L(c)) ? i ? D() : (m = !0, E.to(L(s), L(c), {
			velocity: n,
			response: .3
		})) : i ? x(s, 0) : (E.to(L(s), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), L(o) < r && w.to(L(o), r));
	}
	de(() => {
		if (n()) {
			let e = n().getBoundingClientRect();
			x(u, `${e.left + e.width / 2 - f.offsetLeft}px ${e.top + e.height / 2 - f.offsetTop}px`);
		}
		p.focus({ preventScroll: !0 });
		let e = document.documentElement;
		return e.style.overflow = "hidden", i ? requestAnimationFrame(() => x(l, !0)) : w.to(0, r), () => {
			w.stop(), E.stop(), e.style.overflow = "";
		};
	});
	var j = { close: D }, M = gi();
	T("keydown", _, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && D());
	var N = H(M);
	let P, I;
	var R = C(N, 2);
	let te, ne;
	var z = B(R), re = C(B(z), 2), V = B(re), ie = (e) => {
		var n = hi();
		y("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), q(e, n);
	};
	d(V, (e) => {
		t.onback && e(ie);
	});
	var ae = C(V, 2);
	Ne(ae, (e) => p = e, () => p), Y(re), Y(z);
	var oe = C(z, 2), se = B(oe);
	return ee(se, () => t.children), Y(oe), Y(R), Ne(R, (e) => f = e, () => f), a((e) => {
		P = Q(N, 1, "scrim svelte-185xwm9", null, P, { fade: i }), I = Z(N, "", I, { opacity: e }), te = Q(R, 1, "sheet svelte-185xwm9", null, te, { fade: i }), J(R, "aria-label", t.label), ne = Z(R, "", ne, {
			opacity: L(g),
			transform: `translate3d(0, ${L(s) ?? ""}px, 0) scale(${L(v) ?? ""})`,
			"transform-origin": L(u)
		});
	}, [() => L(g) * Math.min(1, Math.max(0, 1 - L(s) / L(c)))]), y("click", N, D), y("pointerdown", z, O), y("pointermove", z, k), y("pointerup", z, A), T("pointercancel", z, A), y("click", ae, D), Qe(R, "offsetHeight", (e) => x(c, e)), q(e, M), G(j);
}
p([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var vi = K("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), yi = K("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), bi = K("<p class=\"caption stale svelte-9nj5u4\"> </p>"), xi = K("<!> <!> <!>", 1);
function Si(e, t) {
	F(t, !0);
	let n = U(() => t.scoredAt ? P(t.scoredAt, t.now) : null);
	var r = xi(), i = H(r), o = (e) => {
		var n = vi(), r = C(B(n));
		Y(n), a(() => j(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), q(e, n);
	};
	d(i, (e) => {
		t.configError && e(o);
	});
	var s = C(i, 2), c = (e) => {
		var n = yi(), r = C(B(n));
		Y(n), a(() => j(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), q(e, n);
	};
	d(s, (e) => {
		t.settingsError && e(c);
	});
	var l = C(s, 2), u = (e) => {
		var t = bi(), r = h(t, !0);
		a(() => j(r, L(n))), q(e, t);
	};
	d(l, (e) => {
		L(n) && e(u);
	}), q(e, r), G();
}
// node_modules/svelte/src/internal/flags/legacy.js
ye();
// src/lib/ui/Toast.svelte
var Ci = K("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), wi = K("<span> </span> <!>", 1), Ti = K("<div role=\"status\" aria-live=\"polite\"><!></div>");
function Ei(e, t) {
	F(t, !1);
	function n() {
		let e = ut.undo;
		Object.assign(ut, {
			on: !1,
			undo: null
		}), e();
	}
	qe();
	var r = Ti();
	let i;
	var o = B(r), s = (e) => {
		var t = wi(), r = H(t), i = h(r, !0), o = C(r, 2), s = (e) => {
			var t = Ci();
			y("click", t, n), q(e, t);
		};
		d(o, (e) => {
			ut.undo && e(s);
		}), a(() => j(i, ut.text)), q(e, t);
	};
	d(o, (e) => {
		ut.on && e(s);
	}), Y(r), a(() => i = Q(r, 1, "toast svelte-1fk2ial", null, i, { on: ut.on })), q(e, r), G();
}
p(["click"]);
// src/lib/ui/Together.svelte
var Di = K("<p class=\"progress svelte-1tya3no\"> </p>"), Oi = K("<p> </p>"), ki = K("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), Ai = K("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function ji(e, t) {
	F(t, !0);
	let n = U(() => t.group.week ? Xe(t.group.week, t.people) : ""), r = U(() => t.group.week ? ie(t.group.week) : null), i = U(() => [
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
	var o = Ai(), c = C(B(o), 2), l = (e) => {
		var t = Di(), r = h(t, !0);
		a(() => j(r, L(n))), q(e, t);
	};
	d(c, (e) => {
		L(n) && e(l);
	});
	var u = C(c, 2), f = (e) => {
		var n = Oi();
		let i;
		var o = h(n, !0);
		a(() => {
			i = Q(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), j(o, L(r));
		}), q(e, n);
	};
	d(u, (e) => {
		L(r) && e(f);
	});
	var p = C(u, 2);
	s(p, 21, () => L(i), (e) => e.k, (e, t) => {
		var n = ki(), r = B(n), i = h(r, !0), o = C(r), s = B(o, !0), c = C(s), l = h(c, !0);
		Y(o), Y(n), a(() => {
			j(i, L(t).k), j(s, L(t).v), j(l, L(t).unit);
		}), q(e, n);
	}), Y(p), Y(o), q(e, o), G();
}
// src/App.svelte
var Mi = K("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), Ni = K("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), Pi = K("<div class=\"tiles compact svelte-1n46o8q\"></div>"), Fi = K("<!> <!>", 1), Ii = K("<div class=\"tiles svelte-1n46o8q\"></div>"), Li = K("<!> <!> <!> <!> <!>", 1), Ri = K("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function zi(e, t) {
	F(t, !0);
	let n = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), r = new URLSearchParams(n.location.search), i = r.get("person"), o = /^\/(?!\/)/.test(r.get("back") ?? "") ? r.get("back") : null, c = o && (() => {
		n.history.pushState(null, "", o), n.dispatchEvent(new Event("location-changed"));
	}), l = W(null), u = (e) => (t) => x(l, {
		id: e,
		from: t.currentTarget
	}, !0), f = W(null), p = W(void 0);
	async function m() {
		let e = L(l)?.from ?? L(f)?.from;
		x(l, x(f, null), !0), await ot(), e?.focus({ preventScroll: !0 });
	}
	let g = W(null), _ = W(null), v = W(He(/* @__PURE__ */ new Date())), y = He({}), b;
	async function S() {
		if (clearTimeout(b), !document.hidden) {
			try {
				x(g, await Re("scores"), !0), x(_, null), gt(L(g).people), i && Object.hasOwn(L(g).people, i) && i !== Ae(L(g).viewer, L(g).people).self && x(l, {
					id: i,
					from: null
				}, !0), i = null;
			} catch (e) {
				x(_, e, !0);
			}
			x(v, /* @__PURE__ */ new Date(), !0), L(g) && w(L(g)), clearTimeout(b), b = setTimeout(S, L(g) ? 6e4 : 3e4);
		}
	}
	let w = (e) => $e(e.viewer, e.people).forEach((e) => Re(`connect?person=${encodeURIComponent(e)}`).then((t) => {
		y[e] = t;
	}, () => {
		delete y[e];
	}));
	V(() => {
		S();
		let e = () => document.hidden || S();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(b), document.removeEventListener("visibilitychange", e);
		};
	}), V(() => {
		ft.n && S();
	});
	let T = U(() => ke(L(g)?.people ?? {}, dt.entry)), E = U(() => Object.keys(L(T))), D = U(() => Ae(L(g)?.viewer ?? {}, L(T))), O = U(() => L(T)[L(D).self ?? L(E)[0]]?.week), k = (e) => !!L(g)?.viewer?.can_edit?.includes(e), A = U(() => !!L(D).self && it(L(T)[L(D).self], y[L(D).self])), M = U(() => !!L(l) && Object.hasOwn(L(T), L(l).id) || !!L(f) && !!L(g));
	var N = Ri(), P = H(N), I = B(P);
	{
		let e = U(() => L(O) ? We(L(O)) : ""), t = U(() => L(g) ? (e) => x(f, { from: e.currentTarget }, !0) : void 0);
		Xr(I, {
			title: "Training",
			brand: !0,
			get subtitle() {
				return L(e);
			},
			get onback() {
				return c;
			},
			actionLabel: "Goals",
			get onaction() {
				return L(t);
			}
		});
	}
	var R = C(I, 2), ee = B(R), te = (e) => {
		var t = Ni(), n = C(H(t), 2), r = (e) => {
			var t = Mi(), n = h(t, !0);
			a(() => j(n, L(_).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), q(e, t);
		};
		d(n, (e) => {
			L(_) && e(r);
		}), q(e, t);
	}, ne = (e) => {
		var t = Li(), n = H(t);
		Si(n, {
			get scoredAt() {
				return L(g).scored_at;
			},
			get configError() {
				return L(g).config_error;
			},
			get settingsError() {
				return L(g).settings_error;
			},
			get now() {
				return L(v);
			}
		});
		var r = C(n, 2), i = (e) => {
			Ft(e, {
				get info() {
					return y[L(D).self];
				},
				get now() {
					return L(v);
				},
				get person() {
					return L(T)[L(D).self];
				}
			});
		};
		d(r, (e) => {
			L(A) && e(i);
		});
		var a = C(r, 2), o = (e) => {
			var t = Fi(), n = H(t), r = (e) => {
				var t = Pi();
				s(t, 20, () => L(D).others, (e) => e, (e, t) => {
					{
						let n = U(() => L(E).indexOf(t)), r = U(() => u(t));
						mi(e, {
							get person() {
								return L(T)[t];
							},
							get index() {
								return L(n);
							},
							compact: !0,
							get onopen() {
								return L(r);
							}
						});
					}
				}), Y(t), q(e, t);
			};
			d(n, (e) => {
				L(D).others.length && e(r);
			});
			var i = C(n, 2);
			{
				let e = U(() => L(E).indexOf(L(D).self));
				mi(i, {
					get person() {
						return L(T)[L(D).self];
					},
					get index() {
						return L(e);
					}
				});
			}
			q(e, t);
		}, c = (e) => {
			var t = Ii();
			s(t, 20, () => L(D).others, (e) => e, (e, t) => {
				{
					let n = U(() => L(E).indexOf(t)), r = U(() => u(t));
					mi(e, {
						get person() {
							return L(T)[t];
						},
						get index() {
							return L(n);
						},
						get onopen() {
							return L(r);
						}
					});
				}
			}), Y(t), q(e, t);
		};
		d(a, (e) => {
			L(D).self ? e(o) : e(c, -1);
		});
		var l = C(a, 2), f = (e) => {
			ji(e, {
				get group() {
					return L(g).group;
				},
				get people() {
					return L(T);
				}
			});
		};
		d(l, (e) => {
			L(g).group && e(f);
		});
		var p = C(l, 2), m = (e) => {
			{
				let t = U(() => k(L(D).self)), n = U(() => L(A) ? null : y[L(D).self]);
				Ir(e, {
					get id() {
						return L(D).self;
					},
					get person() {
						return L(T)[L(D).self];
					},
					get canEdit() {
						return L(t);
					},
					get viewer() {
						return L(g).viewer;
					},
					get reviewTypes() {
						return L(g).review_types;
					},
					get connect() {
						return L(n);
					},
					get now() {
						return L(v);
					}
				});
			}
		};
		d(p, (e) => {
			L(D).self && e(m);
		}), q(e, t);
	};
	d(ee, (e) => {
		L(g) ? e(ne, -1) : e(te);
	}), Y(R), Y(P);
	var z = C(P, 2), re = (e) => {
		Ne(_i(e, {
			label: "Goals",
			get from() {
				return L(f).from;
			},
			onclose: m,
			get onback() {
				return c;
			},
			children: (e, t) => {
				{
					let t = U(() => !L(D).self);
					Gr(e, {
						get people() {
							return L(g).people;
						},
						get readOnly() {
							return L(t);
						},
						onsaved: () => L(p)?.close()
					});
				}
			},
			$$slots: { default: !0 }
		}), (e) => x(p, e, !0), () => L(p));
	}, ie = (e) => {
		_i(e, {
			get label() {
				return `${L(T)[L(l).id].name ?? ""}'s details`;
			},
			get from() {
				return L(l).from;
			},
			onclose: m,
			get onback() {
				return c;
			},
			children: (e, t) => {
				var n = Fi(), r = H(n);
				{
					let e = U(() => L(E).indexOf(L(l).id));
					mi(r, {
						get person() {
							return L(T)[L(l).id];
						},
						get index() {
							return L(e);
						}
					});
				}
				var i = C(r, 2);
				{
					let e = U(() => k(L(l).id));
					Ir(i, {
						get id() {
							return L(l).id;
						},
						get person() {
							return L(T)[L(l).id];
						},
						get canEdit() {
							return L(e);
						},
						get viewer() {
							return L(g).viewer;
						},
						get reviewTypes() {
							return L(g).review_types;
						},
						get connect() {
							return y[L(l).id];
						},
						get now() {
							return L(v);
						}
					});
				}
				q(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	d(z, (e) => {
		L(f) && L(g) ? e(re) : L(M) && e(ie, 1);
	}), Ei(C(z, 2), {}), a(() => P.inert = L(M)), q(e, N), G();
}
// src/main.js
var Bi = (e) => l(zi, { target: e }), Vi = () => new Promise((e) => {
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
		he(e);
		let t = e.themes?.darkMode ?? matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.dataset.theme = t ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Vi().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", Bi(e);
		}));
	}
});
