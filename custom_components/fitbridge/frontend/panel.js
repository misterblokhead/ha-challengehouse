import { $ as e, $t as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Gt as h, H as g, Ht as _, I as v, It as y, J as b, Jt as x, K as S, Kt as C, L as w, Lt as T, M as E, Mt as D, N as O, Nt as k, O as A, Ot as j, P as M, Pt as N, Q as ee, Qt as P, R as F, Rt as I, S as L, St as R, T as z, Tt as te, U as B, Ut as V, V as ne, Vt as H, W as re, Wt as ie, X as ae, Y as oe, Yt as se, Z as ce, Zt as le, _ as ue, _t as de, a as fe, at as pe, b as me, bt as U, c as he, ct as ge, d as _e, dt as W, et as ve, f as ye, ft as be, g as xe, gt as Se, h as Ce, ht as G, i as we, it as Te, j as Ee, jt as K, k as De, kt as q, l as Oe, lt as ke, m as Ae, mt as je, nt as Me, o as Ne, ot as J, p as Pe, pt as Fe, q as Ie, qt as Y, r as Le, rt as Re, s as ze, st as Be, t as Ve, tt as He, u as Ue, ut as X, v as We, vt as Z, w as Ge, wt as Ke, x as qe, xt as Q, y as Je, yt as Ye, z as Xe, zt as $ } from "./shared-DIjUeyr6.js";
// src/lib/actions.svelte.js
var Ze = 5e3, Qe = I({}), $e = I({}), et = I({
	on: !1,
	text: "",
	undo: null
}), tt = I({
	entry: null,
	at: 0
}), nt = I({ n: 0 }), rt, it = 0, at = {};
function ot(e, t = null) {
	clearTimeout(rt), Object.assign(et, {
		on: !0,
		text: e,
		undo: t
	}), rt = setTimeout(() => et.on = !1, Ze);
}
function st(e, t = Date.now()) {
	for (let [n, r] of Object.entries(Qe)) O(r, e[r.person]?.feed ?? [], t) && delete Qe[n];
	tt.entry && Je(tt, e, t) && (tt.entry = null);
}
async function ct(e, t) {
	try {
		await P("POST", "settings", e);
	} catch (e) {
		return ot(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(tt, {
		entry: e,
		at: Date.now()
	}), st(t), ot("Saved · updates within 5 min"), !0;
}
async function lt(e, t, n) {
	let r = `${e}/${t}`, i = Qe[r], a = ++it, o = t.startsWith("manual:"), s = o && n === "remove" ? null : n === "remove";
	Qe[r] = {
		person: e,
		key: t,
		want: s,
		at: Date.now(),
		n: a
	}, n === "remove" && !o && ot("Removed", () => lt(e, t, "restore"));
	try {
		await F(at, r, () => P("POST", "workouts", {
			person: e,
			key: t,
			action: n
		})), $e[r] = s;
	} catch (e) {
		Qe[r]?.n === a && (i ? Qe[r] = i : delete Qe[r]), ot(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
var ut = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
async function dt(e, t) {
	try {
		return await le(`feed?person=${encodeURIComponent(e)}&before=${t}`);
	} catch (e) {
		return ot(ut(e)), null;
	}
}
async function ft(e) {
	try {
		await P("POST", "shoes", e);
	} catch (e) {
		return ot(ut(e)), !1;
	}
	return nt.n++, !0;
}
async function pt(e, t, n) {
	try {
		await P("POST", "workouts", {
			action: "shoe",
			person: e,
			key: t,
			shoe_id: n
		});
	} catch (e) {
		return ot(ut(e)), !1;
	}
	return nt.n++, ot("Moved to the other shoe"), !0;
}
// src/lib/ui/Badges.svelte
var mt = s("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), ht = s("<ul class=\"svelte-m8wnum\"></ul>"), gt = s("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), _t = s("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), vt = s("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function yt(e, t) {
	V(t, !0);
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
	var a = vt(), o = N(a), s = (e) => {
		var n = ht();
		G(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = mt(), i = N(n), a = y(i, !0), o = T(i, 2), s = y(o, !0), c = T(o, 2), l = y(c, !0);
			Y(n), K((e, n) => {
				U(a, e), U(s, q(t).title), U(l, n);
			}, [() => r(q(t)), () => B(q(t).unlocked_at)]), Q(e, n);
		}), Y(n), Q(e, n);
	};
	Z(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = T(o, 2), l = (e) => {
		var n = ht();
		G(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = gt(), a = N(n), o = y(a, !0), s = T(a, 2), c = y(s, !0), l = T(s, 2), u = y(l), d = T(l, 2), f = N(d);
			let p;
			Y(d), Y(n), K((e, n, r, i) => {
				U(o, e), U(c, q(t).title), U(u, `${n ?? ""} of ${r ?? ""}`), p = X(f, "", p, { width: i });
			}, [
				() => r(q(t)),
				() => i(q(t).current),
				() => i(q(t).target),
				() => `${Math.min(1, q(t).current / q(t).target) * 100}%`
			]), Q(e, n);
		}), Y(n), Q(e, n);
	};
	Z(c, (e) => {
		t.badges.next.length && e(l);
	});
	var u = T(c, 2), d = (e) => {
		var t = _t();
		Q(e, t);
	};
	Z(u, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(d);
	}), Y(a), Q(e, a), _();
}
// src/lib/ui/FeedRow.svelte
var bt = s("<span class=\"mini svelte-69s4be\"> </span>"), xt = s("<span class=\"mini svelte-69s4be\">Together</span>"), St = s("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), Ct = s("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), wt = s("<span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span>", 1), Tt = s("<button type=\"button\" class=\"head svelte-69s4be\"><!></button>"), Et = s("<div class=\"head svelte-69s4be\"><!></div>"), Dt = s("<li><!></li>");
function Ot(e, t) {
	V(t, !0);
	let n = (e) => {
		var n = wt(), o = p(n), s = y(o, !0), c = T(o, 2), l = N(c), u = N(l), d = T(u), f = (e) => {
			var n = bt(), r = y(n, !0);
			K(() => U(r, t.item.plan)), Q(e, n);
		};
		Z(d, (e) => {
			t.item.plan && e(f);
		});
		var m = T(d, 2), h = (e) => {
			var t = xt();
			Q(e, t);
		};
		Z(m, (e) => {
			t.item.joint && e(h);
		});
		var g = T(m, 2), _ = (e) => {
			var t = St();
			Q(e, t);
		};
		Z(g, (e) => {
			t.record && e(_);
		}), Y(l);
		var v = T(l, 2), b = y(v);
		Y(c);
		var x = T(c, 2), S = N(x), C = (e) => {
			var t = Ct();
			Q(e, t);
		};
		Z(S, (e) => {
			q(i) && e(C);
		});
		var w = T(S);
		Y(x), K(() => {
			W(o, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), U(s, r[t.item.kind] ?? "💪"), U(u, `${q(a).title ?? ""} `), U(b, `${q(a).when ?? ""} · ${q(a).duration ?? ""}`), U(w, ` ${(q(a).removable === "restore" ? "Removed" : q(a).label ?? (q(a).xp && `${q(a).xp} XP`)) ?? ""}`);
		}), Q(e, n);
	}, r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, i = H(() => Qe[`${t.person}/${t.item.key}`]), a = H(() => ue(q(i) && q(i).want !== null ? {
		...t.item,
		excluded: q(i).want
	} : t.item)), o = H(() => q(i)?.want === null), s = H(() => t.item.kind !== "active_day");
	var c = Dt();
	let u;
	var d = N(c), f = (e) => {
		var r = Tt(), i = N(r);
		n(i), Y(r), l("click", r, () => t.onopen(t.item)), Q(e, r);
	}, m = (e) => {
		var t = Et(), r = N(t);
		n(r), Y(t), Q(e, t);
	};
	Z(d, (e) => {
		q(s) ? e(f) : e(m, -1);
	}), Y(c), K(() => u = W(c, 1, "svelte-69s4be", null, u, {
		dim: q(a).removable === "restore" || q(o),
		grey: !!q(a).label
	})), Q(e, c), _();
}
d(["click"]);
// src/lib/ui/Feed.svelte
var kt = s("<ul class=\"card svelte-n1344i\"></ul>"), At = s("<p class=\"caption empty svelte-n1344i\">No workouts in the last 90 days.</p>"), jt = s("<button type=\"button\" class=\"btn older svelte-n1344i\">Load older</button>"), Mt = s("<!> <!>", 1);
function Nt(e, t) {
	V(t, !0);
	let r = a(I([])), i = a(!0), o = a(!1), s = null, u = H(() => De(t.items, Ee(q(r), t.person, $e)));
	async function d() {
		$(o, !0);
		let e = s ?? q(u).at(-1)?.start.slice(0, 10) ?? n(c(), 88), a = await dt(t.person, e);
		$(o, !1), a && ($(r, De(q(r), a.items), !0), s = n(e, 90), $(i, a.more, !0));
	}
	var f = Mt(), m = p(f), h = (e) => {
		var n = kt();
		G(n, 21, () => q(u), (e) => e.key, (e, n) => {
			{
				let r = H(() => t.records?.has(q(n).key));
				Ot(e, {
					get person() {
						return t.person;
					},
					get item() {
						return q(n);
					},
					get record() {
						return q(r);
					},
					get onopen() {
						return t.onopen;
					}
				});
			}
		}), Y(n), Q(e, n);
	}, g = (e) => {
		var t = At();
		Q(e, t);
	};
	Z(m, (e) => {
		q(u).length ? e(h) : e(g, -1);
	});
	var v = T(m, 2), y = (e) => {
		var t = jt();
		K(() => t.disabled = q(o)), l("click", t, d), Q(e, t);
	};
	Z(v, (e) => {
		q(i) && e(y);
	}), Q(e, f), _();
}
d(["click"]);
// src/lib/ui/PlanBar.svelte
var Pt = s("<span> </span>"), Ft = s("<i class=\"svelte-1y5m0aq\"></i>"), It = s("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), Lt = s("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!></div>");
function Rt(e, t) {
	V(t, !0);
	let n = H(() => M(t.plan)), r = H(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0)) / 60));
	var i = Lt(), a = N(i), o = N(a), s = y(o, !0), c = T(o, 2), l = (e) => {
		var n = Pt();
		let r;
		var i = y(n, !0);
		K(() => {
			r = W(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), U(i, t.plan.due_today ? "Due today" : "Rest day");
		}), Q(e, n);
	};
	Z(c, (e) => {
		q(n).length && e(l);
	}), Y(a);
	var u = T(a, 2), d = (e) => {
		var t = It(), i = p(t);
		G(i, 21, () => q(n), Se, (e, t) => {
			var n = Ft();
			let r;
			K(() => r = X(n, "", r, {
				"flex-grow": q(t).frac,
				background: `var(--${q(t).kind === "run" ? "run" : "fill"})`
			})), Q(e, n);
		}), Y(i);
		var a = T(i, 2), o = N(a), s = N(o);
		X(s, "", {}, { background: "var(--run)" });
		var c = T(s, 2);
		X(c, "", {}, { background: "var(--fill)" }), C(), Y(o);
		var l = T(o, 2), u = y(l);
		Y(a), K(() => {
			J(i, "aria-label", `Run and walk intervals, ${q(r) ?? ""} minutes in total`), U(u, `${q(r) ?? ""} min`);
		}), Q(e, t);
	};
	Z(u, (e) => {
		q(n).length && e(d);
	}), Y(i), K(() => U(s, t.plan.state)), Q(e, i), _();
}
// src/lib/gesture.js
var zt = (e, t = .998) => e / 1e3 * t / (1 - t), Bt = (e, t, n) => e + zt(t) > n / 2;
function Vt(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var Ht = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), Ut = s("<li class=\"svelte-18znx9k\"><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), Wt = s("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1), Gt = s("<dialog><div class=\"grab svelte-18znx9k\"><h2 class=\"svelte-18znx9k\">All records</h2> <button type=\"button\" class=\"close press svelte-18znx9k\" aria-label=\"Close\">✕</button></div> <div class=\"body svelte-18znx9k\"></div></dialog>");
function Kt(e, t) {
	let n = te();
	V(t, !0);
	let r, i, o = a(0), s = null, c = a(!1), d = !1;
	function f(e = null) {
		r.open || (d = document.documentElement.style.overflow !== "hidden", d && (document.documentElement.style.overflow = "hidden"), r.showModal(), i.scrollTop = 0, e && i.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	function m() {
		d && (document.documentElement.style.overflow = ""), d = !1, $(o, 0);
	}
	function h(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), s = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, $(c, !0));
	}
	function g(e) {
		s && ($(o, Math.max(0, e.clientY - s.start), !0), s.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), s.samples.length > 8 && s.samples.shift());
	}
	function v(e) {
		if (!s) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = Vt([...s.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		s = null, $(c, !1), Bt(q(o), n, r.offsetHeight) ? r.close() : $(o, 0);
	}
	var b = { open: f }, x = Gt();
	let S, C;
	var w = N(x), E = N(w), D = T(E, 2);
	Y(w);
	var O = T(w, 2);
	return G(O, 21, () => t.groups, (e) => e.group, (e, t) => {
		var n = Wt(), r = p(n), i = y(r, !0), a = T(r, 2);
		G(a, 21, () => q(t).lifts, (e) => e.id, (e, t) => {
			var n = Ut(), r = N(n), i = N(r), a = T(i), o = y(a, !0), s = T(a);
			Y(r), Y(n), K((e, n) => {
				U(i, `${q(t).name ?? ""} · `), U(o, e), U(s, ` · ${n ?? ""}`);
			}, [() => u(q(t)), () => B(q(t).date)]), Q(e, n);
		}), Y(a), K(() => {
			J(r, "data-group", q(t).group), U(i, q(t).group);
		}), Q(e, n);
	}), Y(O), He(O, (e) => i = e, () => i), Y(x), He(x, (e) => r = e, () => r), K(() => {
		J(x, "aria-labelledby", `${n}-t`), S = W(x, 1, "svelte-18znx9k", null, S, { dragging: q(c) }), C = X(x, "", C, { transform: q(o) ? `translateY(${q(o)}px)` : null }), J(E, "id", `${n}-t`);
	}), l("click", x, (e) => e.target === r && r.close()), j("close", x, m), l("keydown", x, (e) => e.key === "Escape" && e.stopPropagation()), l("pointerdown", w, h), l("pointermove", w, g), l("pointerup", w, v), j("pointercancel", w, v), l("click", D, () => r.close()), Q(e, x), _(b);
}
d([
	"click",
	"keydown",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/StepBars.svelte
var qt = s("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), Jt = s("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), Yt = s("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function Xt(e, t) {
	V(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), r = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var i = Yt(), a = N(i);
	G(a, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = qt();
		let i;
		var a = N(n), o = N(a);
		let s, c;
		Y(a);
		var l = T(a, 2), u = y(l, !0);
		Y(n), K((e) => {
			J(n, "aria-label", e), J(n, "aria-hidden", q(t).future ? "true" : void 0), J(n, "aria-current", q(t).isToday ? "date" : void 0), i = W(n, 1, "svelte-1f099m", null, i, { today: q(t).isToday }), s = W(o, 1, "svelte-1f099m", null, s, {
				active: q(t).active,
				future: q(t).future
			}), c = X(o, "", c, { height: `${q(t).frac * 100}%` }), U(u, q(t).label);
		}, [() => q(t).future ? void 0 : r(q(t))]), Q(e, n);
	}), Y(a);
	var o = T(a, 2), s = (e) => {
		var n = Jt();
		let r;
		K(() => r = X(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), Q(e, n);
	};
	Z(o, (e) => {
		t.goalFrac !== null && e(s);
	}), Y(i), Q(e, i), _();
}
// src/lib/ui/Progress.svelte
var Zt = s("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), Qt = s("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), $t = s("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), en = s("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), tn = s("<span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span>", 1), nn = s("<button type=\"button\" class=\"row svelte-kr1x1f\"><!></button>"), rn = s("<div class=\"row svelte-kr1x1f\"><!></div>"), an = s("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), on = s("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function sn(e, t) {
	V(t, !0);
	let n = H(() => t.person.week.goal.steps ?? 0), r = H(() => b(t.person.steps_week, q(n), c())), i = H(() => t.person.pbs.lifts ?? []), a = H(() => qe(q(i))), o, s = H(() => t.person.pbs.fastest_1k), d = H(() => t.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var f = on(), m = p(f), h = (e) => {
		var t = Zt(), n = N(t);
		Xt(n, {
			get bars() {
				return q(r).bars;
			},
			get goalFrac() {
				return q(r).goalFrac;
			}
		});
		var i = T(n, 2), a = y(i, !0);
		Y(t), K((e) => U(a, e), [() => S(q(r).bars)]), Q(e, t);
	};
	Z(m, (e) => {
		q(r) && e(h);
	});
	var g = T(m, 2), v = N(g), x = (e) => {
		var t = $t(), n = p(t);
		G(n, 21, () => q(a), (e) => e.group, (e, t) => {
			var n = Qt(), r = N(n), i = N(r), a = y(i, !0), s = T(i), c = N(s), d = T(c), f = y(d, !0);
			Y(s), Y(r), Y(n), K((e) => {
				U(a, q(t).group), U(c, `${q(t).lift.name ?? ""} · `), U(f, e);
			}, [() => u(q(t).lift)]), l("click", r, () => o.open(q(t).group)), Q(e, n);
		}), Y(n);
		var r = T(n, 2), s = y(r);
		K(() => U(s, `All records (${q(i).length ?? ""})`)), l("click", r, () => o.open()), Q(e, t);
	}, C = (e) => {
		var t = en();
		Q(e, t);
	};
	Z(v, (e) => {
		q(i).length ? e(x) : e(C, -1);
	}), Y(g);
	var w = T(g, 2), D = N(w), O = (e) => {
		let n = (e) => {
			var t = tn(), n = T(p(t), 2), r = y(n);
			K((e, t) => U(r, `${e ?? ""} · ${t ?? ""}`), [() => E(q(s).seconds), () => B(q(s).date)]), Q(e, t);
		};
		var r = R(), i = p(r), a = (e) => {
			var r = nn(), i = N(r);
			n(i), Y(r), l("click", r, () => t.onopen({ key: q(s).key })), Q(e, r);
		}, o = (e) => {
			var t = rn(), r = N(t);
			n(r), Y(t), Q(e, t);
		};
		Z(i, (e) => {
			q(s).key ? e(a) : e(o, -1);
		}), Q(e, r);
	}, k = (e) => {
		var t = an();
		Q(e, t);
	};
	Z(D, (e) => {
		q(s) ? e(O) : e(k, -1);
	});
	var A = T(D, 2), j = T(N(A)), M = y(j);
	Y(A);
	var ee = T(A, 2), P = T(N(ee)), F = y(P);
	Y(ee), Y(w);
	var I = T(w, 2);
	{
		let e = H(() => L(q(i)));
		He(Kt(I, { get groups() {
			return q(e);
		} }), (e) => o = e, () => o);
	}
	K((e) => {
		U(M, `${e ?? ""} km`), U(F, `${q(d) ?? ""} t`);
	}, [() => t.person.pbs.longest_session_km.toFixed(1)]), Q(e, f), _();
}
d(["click"]);
// src/lib/ui/Shoes.svelte
var cn = s("<span class=\"label svelte-eu7fja\"> </span>"), ln = s("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), un = s("<ul class=\"card svelte-eu7fja\"></ul>");
function dn(e, t) {
	V(t, !0);
	let n = H(() => t.shoes.map(ne));
	var r = un();
	G(r, 23, () => q(n), (e, n) => t.shoes[n].id ?? t.shoes[n].entity_id, (e, t) => {
		var n = ln(), r = N(n), i = N(r), a = y(i, !0), o = T(i), s = y(o, !0);
		Y(r);
		var c = T(r, 2), l = N(c);
		let u;
		Y(c);
		var d = T(c, 2), f = N(d), p = y(f, !0), m = T(f, 2), h = (e) => {
			var n = cn(), r = y(n, !0);
			K(() => U(r, q(t).label)), Q(e, n);
		};
		Z(m, (e) => {
			q(t).label && e(h);
		}), Y(d), Y(n), K(() => {
			W(n, 1, be(q(t).state), "svelte-eu7fja"), U(a, q(t).name), U(s, q(t).km), u = X(l, "", u, { width: `${q(t).frac * 100}%` }), U(p, q(t).detail);
		}), Q(e, n);
	}), Y(r), Q(e, r), _();
}
// src/lib/ui/ShoesDialog.svelte
var fn = s("<span class=\"mini svelte-1bogt6u\">Current</span>"), pn = s("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), mn = s("<button type=\"button\" class=\"btn\">Set current</button>"), hn = s("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), gn = s("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), _n = s("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe until you set one.</p>"), vn = s("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), yn = s("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), bn = s("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), xn = s("<dialog class=\"svelte-1bogt6u\"><div class=\"grab svelte-1bogt6u\"><h2 class=\"svelte-1bogt6u\">Manage shoes</h2> <button type=\"button\" class=\"close press svelte-1bogt6u\" aria-label=\"Close\">✕</button></div> <div class=\"body svelte-1bogt6u\"><!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form></div></dialog>");
function Sn(e, t) {
	let n = te();
	V(t, !0);
	let r = H(() => t.shoes.map((e) => ({
		...ne(e),
		id: e.id,
		limit: e.limit,
		current: !!e.current
	}))), i, o = a(""), s = a(I(700)), c = a(null), u = a(!1), d = a(null), f = !1;
	function m() {
		i.open || (f = document.documentElement.style.overflow !== "hidden", f && (document.documentElement.style.overflow = "hidden"), i.showModal());
	}
	function h() {
		f && (document.documentElement.style.overflow = ""), f = !1, $(d, null), $(c, null);
	}
	async function g(e) {
		$(u, !0);
		let t = await ft(e);
		return $(u, !1), t;
	}
	async function v(e) {
		e.preventDefault();
		let n = Xe(q(o), q(s));
		$(c, n.error ?? null, !0), !q(c) && await g({
			op: "add",
			person: t.person,
			...n
		}) && $(o, "");
	}
	async function b(e, t) {
		let n = Xe(void 0, e.currentTarget.value, { partial: !0 });
		$(c, n.error ?? null, !0), q(c) ? e.currentTarget.value = t.limit : n.replace_at_km !== t.limit && await g({
			op: "update",
			id: t.id,
			...n
		});
	}
	async function x(e) {
		$(d, null), await g({
			op: "retire",
			id: e.id
		});
	}
	var S = { open: m }, w = xn(), E = N(w), D = N(E), O = T(D, 2);
	Y(E);
	var k = T(E, 2), A = N(k), M = (e) => {
		var n = vn(), i = p(n);
		G(i, 21, () => q(r), (e) => e.id, (e, n) => {
			var r = gn(), i = N(r), a = N(i), o = N(a, !0), s = T(o), c = (e) => {
				var t = fn();
				Q(e, t);
			};
			Z(s, (e) => {
				q(n).current && e(c);
			}), Y(a);
			var f = T(a, 2), m = y(f, !0);
			Y(i);
			var h = T(i, 2), _ = N(h), v = T(N(_));
			pe(v), C(), Y(_);
			var S = T(_, 2), w = (e) => {
				var t = pn(), r = p(t), i = y(r), a = T(r, 2), o = T(a, 2);
				K(() => {
					U(i, `Retire ${q(n).name ?? ""}?`), o.disabled = q(u);
				}), l("click", a, () => $(d, null)), l("click", o, () => x(q(n))), Q(e, t);
			}, E = (e) => {
				var r = hn(), i = p(r), a = (e) => {
					var r = mn();
					K(() => r.disabled = q(u)), l("click", r, () => g({
						op: "current",
						person: t.person,
						id: q(n).id
					})), Q(e, r);
				};
				Z(i, (e) => {
					q(n).current || e(a);
				});
				var o = T(i, 2);
				K(() => o.disabled = q(u)), l("click", o, () => $(d, q(n).id, !0)), Q(e, r);
			};
			Z(S, (e) => {
				q(d) === q(n).id ? e(w) : e(E, -1);
			}), Y(h), Y(r), K(() => {
				U(o, q(n).name), U(m, q(n).km), J(v, "min", Ae.replace_at_km[0]), J(v, "max", Ae.replace_at_km[1]), J(v, "step", Ae.replace_at_km[2]), Be(v, q(n).limit), v.disabled = q(u);
			}), l("change", v, (e) => b(e, q(n))), Q(e, r);
		}), Y(i);
		var a = T(i, 2), o = (e) => {
			var t = _n();
			Q(e, t);
		}, s = H(() => !q(r).some((e) => e.current));
		Z(a, (e) => {
			q(s) && e(o);
		}), Q(e, n);
	}, ee = (e) => {
		var t = yn();
		Q(e, t);
	};
	Z(A, (e) => {
		q(r).length ? e(M) : e(ee, -1);
	});
	var P = T(A, 2), F = T(N(P), 2), L = T(N(F));
	pe(L), Y(F);
	var R = T(F, 2), z = T(N(R));
	pe(z), Y(R);
	var B = T(R, 2), re = (e) => {
		var t = bn(), n = y(t, !0);
		K(() => U(n, q(c))), Q(e, t);
	};
	Z(B, (e) => {
		q(c) && e(re);
	});
	var ie = T(B, 2);
	return Y(P), Y(k), Y(w), He(w, (e) => i = e, () => i), K(() => {
		J(w, "aria-labelledby", `${n}-t`), J(D, "id", `${n}-t`), J(L, "maxlength", Ae.name[1]), L.disabled = q(u), J(z, "min", Ae.replace_at_km[0]), J(z, "max", Ae.replace_at_km[1]), J(z, "step", Ae.replace_at_km[2]), z.disabled = q(u), ie.disabled = q(u);
	}), l("click", w, (e) => e.target === i && i.close()), j("close", w, h), l("keydown", w, (e) => e.key === "Escape" && e.stopPropagation()), l("click", O, () => i.close()), j("submit", P, v), Te(L, () => q(o), (e) => $(o, e)), Te(z, () => q(s), (e) => $(s, e)), Q(e, w), _(S);
}
d([
	"click",
	"keydown",
	"change"
]);
// src/lib/ui/WorkoutDialog.svelte
var Cn = s("<p class=\"msg\" role=\"status\"> </p>"), wn = s("<p class=\"msg\" role=\"status\">Loading…</p>"), Tn = s("<span class=\"mini svelte-1uaoa1p\"> </span>"), En = s("<span class=\"mini off svelte-1uaoa1p\"> </span>"), Dn = s("<div><dt class=\"svelte-1uaoa1p\"> </dt><dd class=\"svelte-1uaoa1p\"> </dd></div>"), On = s("<option disabled=\"\"> </option>"), kn = s("<option> </option>"), An = s("<div class=\"shoe svelte-1uaoa1p\"><dt class=\"svelte-1uaoa1p\"><label>Shoe</label></dt><dd class=\"svelte-1uaoa1p\"><select class=\"svelte-1uaoa1p\"><!><!></select></dd></div>"), jn = s("<dl class=\"svelte-1uaoa1p\"><!> <!></dl>"), Mn = s("<p class=\"caption note svelte-1uaoa1p\"> </p>"), Nn = s("<div class=\"ph svelte-1uaoa1p\" aria-hidden=\"true\"></div>"), Pn = s("<h3 class=\"svelte-1uaoa1p\"> </h3> <!>", 1), Fn = s("<!> <!>", 1), In = s("<li class=\"svelte-1uaoa1p\"><span class=\"zn svelte-1uaoa1p\"> <small class=\"svelte-1uaoa1p\"> </small></span> <span class=\"bar svelte-1uaoa1p\"><span class=\"svelte-1uaoa1p\"></span></span> <span class=\"num svelte-1uaoa1p\"> </span></li>"), Ln = s("<h3 class=\"svelte-1uaoa1p\">Heart-rate zones</h3> <ul class=\"zones svelte-1uaoa1p\"></ul>", 1), Rn = s("<tr><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td></tr>"), zn = s("<h3 class=\"svelte-1uaoa1p\">Splits</h3> <table class=\"svelte-1uaoa1p\"><thead><tr><th class=\"svelte-1uaoa1p\">Km</th><th class=\"svelte-1uaoa1p\">Time</th><th class=\"svelte-1uaoa1p\"> </th><th class=\"svelte-1uaoa1p\">HR</th><th class=\"svelte-1uaoa1p\">Climb</th></tr></thead><tbody></tbody></table>", 1), Bn = s("<span role=\"img\" aria-label=\"Record\">🏆</span>"), Vn = s("<li class=\"svelte-1uaoa1p\"> <b class=\"svelte-1uaoa1p\"> </b><!></li>"), Hn = s("<h3 class=\"svelte-1uaoa1p\">Exercises</h3> <ul class=\"gym svelte-1uaoa1p\"><!> <li class=\"vol svelte-1uaoa1p\">Total volume · <b class=\"svelte-1uaoa1p\"> </b></li></ul>", 1), Un = s("<span class=\"ask svelte-1uaoa1p\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1uaoa1p\">Delete</button>", 1), Wn = s("<button type=\"button\"> </button>"), Gn = s("<div class=\"acts svelte-1uaoa1p\"><!></div>"), Kn = s("<p class=\"sub svelte-1uaoa1p\"> <!> <!></p> <!> <!> <!> <!> <!> <!> <!>", 1), qn = s("<dialog><div class=\"grab svelte-1uaoa1p\"><h2 class=\"svelte-1uaoa1p\"> </h2> <button type=\"button\" class=\"close press svelte-1uaoa1p\" aria-label=\"Close\">✕</button></div> <div class=\"body svelte-1uaoa1p\"><!></div></dialog>");
function Jn(e, t) {
	let n = te();
	V(t, !0);
	let r = ee(t, "shoes", 3, null), o = () => import("./viz-CvcBuQV1.js"), s, c, u = a(null), d = a(null), f = a(null), m = a(null), h = a(null), g = a(!1), v = a(0), b = null, x = a(!1), S = !1, w = 0;
	async function E(e) {
		if (s.open) return;
		let n = ++w;
		$(u, e), $(d, $(f, $(h, null))), $(g, !1), S = document.documentElement.style.overflow !== "hidden", S && (document.documentElement.style.overflow = "hidden"), s.showModal(), c.scrollTop = 0;
		try {
			let r = await le(`workout?person=${encodeURIComponent(t.person)}&key=${encodeURIComponent(e.key)}`);
			if (n !== w) return;
			$(d, r), (r.route?.length || r.series) && !q(m) && o().then((e) => $(m, e), (e) => n === w && $(h, e));
		} catch (e) {
			n === w && $(f, e);
		}
	}
	function D() {
		S && (document.documentElement.style.overflow = ""), S = !1, $(v, 0), w++, $(u, $(d, null));
	}
	function O(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), b = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, $(x, !0));
	}
	function k(e) {
		b && ($(v, Math.max(0, e.clientY - b.start), !0), b.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), b.samples.length > 8 && b.samples.shift());
	}
	function A(e) {
		if (!b) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = Vt([...b.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		b = null, $(x, !1), Bt(q(v), n, s.offsetHeight) ? s.close() : $(v, 0);
	}
	let M = H(() => q(u) && `${t.person}/${q(u).key}`), P = H(() => q(M) && Qe[q(M)]), F = H(() => {
		if (!q(u)) return null;
		let e = t.feed.find((e) => e.key === q(u).key) ?? {
			...q(d)?.summary,
			...q(u),
			excluded: $e[q(M)] ?? q(u).excluded ?? !1
		};
		return q(P) && q(P).want !== null ? {
			...e,
			excluded: q(P).want
		} : e;
	}), I = H(() => q(d) && q(F) ? Le(t.viewer, t.person, q(F)) : {
		remove: null,
		shoe: !1
	}), L = H(() => q(I).shoe && r() ? i(r(), t.runShoes?.[q(u).key]) : null), z = H(() => q(d) && Ne(q(d).summary)), B = H(() => q(d) ? we(q(d)).filter(([e]) => !(e === "Shoe" && q(L)?.options.length)) : []), ne = H(() => q(d) && Ve(q(d))), re = H(() => q(d) && _e(q(d).zones, q(d).max_hr)), ie = H(() => q(d) ? Oe(q(d)) : []), ae = H(() => q(d) && fe(q(d).gym)), oe = H(() => Ue(q(h))), ce = H(() => q(d) && he(q(d))), de = (e) => e.status === 404 ? "Workout not found" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant";
	async function pe(e) {
		let n = e.currentTarget;
		await pt(t.person, q(u).key, Number(n.value)) || (n.value = String(q(L).value));
	}
	let me = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function ve() {
		q(I).remove === "delete" ? $(g, !0) : lt(t.person, q(u).key, q(I).remove);
	}
	var ye = { open: E }, be = qn();
	let xe, Ce;
	var Te = N(be), Ee = N(Te), De = y(Ee, !0), Ae = T(Ee, 2);
	Y(Te);
	var je = T(Te, 2), Me = N(je), Pe = (e) => {
		var t = Cn(), n = y(t, !0);
		K((e) => U(n, e), [() => de(q(f))]), Q(e, t);
	}, Ie = (e) => {
		var t = wn();
		Q(e, t);
	}, Re = (e) => {
		var r = Kn(), i = p(r), a = N(i), o = T(a), c = (e) => {
			var t = Tn(), n = y(t, !0);
			K(() => U(n, q(z).plan)), Q(e, t);
		};
		Z(o, (e) => {
			q(z).plan && e(c);
		});
		var f = T(o, 2), h = (e) => {
			var t = En(), n = y(t, !0);
			K((e) => U(n, e), [() => ue(q(F)).label]), Q(e, t);
		}, _ = H(() => q(F) && ue(q(F)).label);
		Z(f, (e) => {
			q(_) && e(h);
		}), Y(i);
		var v = T(i, 2), b = (e) => {
			var t = jn(), r = N(t);
			G(r, 17, () => q(B), ([e, t]) => e, (e, t) => {
				var n = H(() => se(q(t), 2));
				let r = () => q(n)[0], i = () => q(n)[1];
				var a = Dn(), o = N(a), s = y(o, !0), c = T(o), l = y(c, !0);
				Y(a), K(() => {
					U(s, r()), U(l, i());
				}), Q(e, a);
			});
			var i = T(r, 2), a = (e) => {
				var t = An(), r = N(t), i = y(r), a = T(r), o = N(a), s = N(o), c = (e) => {
					var t = On(), n = y(t, !0);
					t.value = t.__value = "", K(() => U(n, q(L).extra)), Q(e, t);
				};
				Z(s, (e) => {
					q(L).extra && e(c);
				});
				var u = T(s);
				G(u, 17, () => q(L).options, (e) => e.id, (e, t) => {
					var n = kn(), r = y(n, !0), i = {};
					K(() => {
						U(r, q(t).label), i !== (i = q(t).id) && (n.value = (n.__value = i) ?? "");
					}), Q(e, n);
				}), Y(o);
				var d;
				ge(o), Y(a), Y(t), K(() => {
					J(i, "for", `${n}-shoe`), J(o, "id", `${n}-shoe`), d !== (d = q(L).value) && (o.value = (o.__value = d) ?? "", ke(o, d));
				}), l("change", o, pe), Q(e, t);
			};
			Z(i, (e) => {
				q(L)?.options.length && e(a);
			}), Y(t), Q(e, t);
		};
		Z(v, (e) => {
			(q(B).length || q(L)?.options.length) && e(b);
		});
		var x = T(v, 2), S = (e) => {
			var t = Mn(), n = y(t, !0);
			K((e) => U(n, e), [() => ze(q(d).note)]), Q(e, t);
		}, w = H(() => ze(q(d).note));
		Z(x, (e) => {
			q(w) && e(S);
		});
		var E = T(x, 2), D = (e) => {
			var t = R(), n = p(t), r = (e) => {
				var t = Mn(), n = y(t, !0);
				K(() => U(n, q(oe).message)), Q(e, t);
			}, i = (e) => {
				var t = Nn();
				let n;
				K(() => n = X(t, "", n, { height: `${q(d).route?.length ? 220 : 0}px` })), Q(e, t);
			}, a = (e) => {
				var t = Fn(), n = p(t), r = (e) => {
					var t = R(), n = p(t);
					{
						let e = H(() => q(d).summary.kind === "run" || q(d).summary.kind === "walk" ? "run" : "gym");
						Fe(n, () => q(m).MapView, (t, n) => {
							n(t, {
								get route() {
									return q(d).route;
								},
								get kind() {
									return q(e);
								}
							});
						});
					}
					Q(e, t);
				};
				Z(n, (e) => {
					q(d).route?.length && e(r);
				});
				var i = T(n, 2);
				G(i, 17, () => q(ne)?.list ?? [], (e) => e.label, (e, t) => {
					var n = Pn(), r = p(n), i = y(r, !0), a = T(r, 2);
					Fe(a, () => q(m).Chart, (e, n) => {
						n(e, {
							get x() {
								return q(ne).x;
							},
							get label() {
								return q(t).label;
							},
							get values() {
								return q(t).values;
							},
							get color() {
								return q(t).color;
							},
							get fmt() {
								return q(t).fmt;
							}
						});
					}), K(() => U(i, q(t).label)), Q(e, n);
				}), Q(e, t);
			};
			Z(n, (e) => {
				q(oe).map ? q(m) ? e(a, -1) : e(i, 1) : e(r);
			}), Q(e, t);
		};
		Z(E, (e) => {
			(q(d).route?.length || q(ne)?.list.length) && e(D);
		});
		var O = T(E, 2), k = (e) => {
			var t = Ln(), n = T(p(t), 2);
			G(n, 21, () => q(re), (e) => e.zone, (e, t) => {
				var n = In(), r = N(n), i = N(r), a = T(i), o = y(a, !0);
				Y(r);
				var s = T(r, 2), c = N(s);
				let l;
				Y(s);
				var u = T(s, 2), d = y(u);
				Y(n), K(() => {
					U(i, `${q(t).zone ?? ""} `), U(o, q(t).bpm), l = X(c, "", l, { width: `${q(t).pct ?? ""}%` }), U(d, `${q(t).time ?? ""} · ${q(t).pct ?? ""}%`);
				}), Q(e, n);
			}), Y(n), Q(e, t);
		};
		Z(O, (e) => {
			q(re) && e(k);
		});
		var A = T(O, 2), j = (e) => {
			var t = zn(), n = T(p(t), 2), r = N(n), i = N(r), a = T(N(i), 2), o = y(a, !0);
			C(2), Y(i), Y(r);
			var s = T(r);
			G(s, 21, () => q(ie), Se, (e, t) => {
				var n = Rn(), r = N(n), i = y(r, !0), a = T(r), o = y(a, !0), s = T(a), c = y(s, !0), l = T(s), u = y(l, !0), d = T(l), f = y(d, !0);
				Y(n), K(() => {
					U(i, q(t).km), U(o, q(t).time), U(c, q(t).pace), U(u, q(t).hr), U(f, q(t).climb);
				}), Q(e, n);
			}), Y(s), Y(n), K(() => U(o, q(ce) ? "km/h" : "Pace")), Q(e, t);
		};
		Z(A, (e) => {
			q(ie).length && e(j);
		});
		var M = T(A, 2), ee = (e) => {
			var t = Hn(), n = T(p(t), 2), r = N(n);
			G(r, 17, () => q(ae).exercises, Se, (e, t) => {
				var n = Vn(), r = N(n), i = T(r), a = y(i, !0), o = T(i), s = (e) => {
					var t = Bn();
					Q(e, t);
				};
				Z(o, (e) => {
					q(t).record && e(s);
				}), Y(n), K(() => {
					U(r, `${q(t).name ?? ""} · `), U(a, q(t).set);
				}), Q(e, n);
			});
			var i = T(r, 2), a = T(N(i)), o = y(a, !0);
			Y(i), Y(n), K(() => U(o, q(ae).volume)), Q(e, t);
		};
		Z(M, (e) => {
			q(ae) && e(ee);
		});
		var te = T(M, 2), V = (e) => {
			var n = Gn(), r = N(n), i = (e) => {
				var n = Un(), r = T(p(n), 2), i = T(r, 2);
				l("click", r, () => $(g, !1)), l("click", i, () => (lt(t.person, q(u).key, "remove"), s.close())), Q(e, n);
			}, a = (e) => {
				var t = Wn();
				let n;
				var r = y(t, !0);
				K(() => {
					n = W(t, 1, "btn svelte-1uaoa1p", null, n, { danger: q(I).remove !== "restore" }), U(r, me[q(I).remove]);
				}), l("click", t, ve), Q(e, t);
			};
			Z(r, (e) => {
				q(g) ? e(i) : e(a, -1);
			}), Y(n), Q(e, n);
		};
		Z(te, (e) => {
			q(I).remove && q(P)?.want !== null && e(V);
		}), K(() => U(a, `${q(z).date ?? ""} · ${q(z).time ?? ""} · ${q(z).duration ?? ""} `)), Q(e, r);
	};
	return Z(Me, (e) => {
		q(f) ? e(Pe) : q(d) ? e(Re, -1) : e(Ie, 1);
	}), Y(je), He(je, (e) => c = e, () => c), Y(be), He(be, (e) => s = e, () => s), K(() => {
		J(be, "aria-labelledby", `${n}-t`), xe = W(be, 1, "svelte-1uaoa1p", null, xe, { dragging: q(x) }), Ce = X(be, "", Ce, { transform: q(v) ? `translateY(${q(v)}px)` : null }), J(Ee, "id", `${n}-t`), U(De, q(z)?.title ?? q(u)?.name ?? "Workout");
	}), l("click", be, (e) => e.target === s && s.close()), j("close", be, D), l("keydown", be, (e) => e.key === "Escape" && e.stopPropagation()), l("pointerdown", Te, O), l("pointermove", Te, k), l("pointerup", Te, A), j("pointercancel", Te, A), l("click", Ae, () => s.close()), Q(e, be), _(ye);
}
d([
	"click",
	"keydown",
	"pointerdown",
	"pointermove",
	"pointerup",
	"change"
]);
// src/lib/ui/Details.svelte
var Yn = s("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), Xn = s("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), Zn = s("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), Qn = s("<section><h2 class=\"svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), $n = s("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!> <!>", 1);
function er(e, t) {
	let n = te();
	V(t, !0);
	let r = H(() => f(t.person.pbs)), i = H(() => g(t.person, t.canEdit)), o = a(void 0), s = a(void 0), c = (e) => q(s).open(e);
	var u = $n(), d = p(u), m = (e) => {
		var r = Yn(), i = N(r);
		Rt(T(i, 2), { get plan() {
			return t.person.plan;
		} }), Y(r), K(() => {
			J(r, "aria-labelledby", `${n}-plan`), J(i, "id", `${n}-plan`);
		}), Q(e, r);
	};
	Z(d, (e) => {
		t.person.plan && e(m);
	});
	var h = T(d, 2), v = N(h), b = T(v, 2);
	de(b, () => t.id, (e) => {
		Nt(e, {
			get person() {
				return t.id;
			},
			get items() {
				return t.person.feed;
			},
			get records() {
				return q(r);
			},
			onopen: c
		});
	}), Y(h);
	var x = T(h, 2), S = N(x), C = T(N(S)), w = y(C);
	Y(S), yt(T(S, 2), { get badges() {
		return t.person.badges;
	} }), Y(x);
	var E = T(x, 2), D = N(E);
	sn(T(D, 2), {
		get person() {
			return t.person;
		},
		onopen: c
	}), Y(E);
	var O = T(E, 2);
	{
		let e = H(() => q(i) ? t.person.shoes : null);
		He(Jn(O, {
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
				return q(e);
			},
			get runShoes() {
				return t.person.run_shoes;
			}
		}), (e) => $(s, e, !0), () => q(s));
	}
	var k = T(O, 2), A = (e) => {
		var r = Qn(), a = p(r), s = N(a), c = T(N(s)), u = (e) => {
			var t = Xn();
			l("click", t, () => q(o).open()), Q(e, t);
		};
		Z(c, (e) => {
			q(i) && e(u);
		}), Y(s);
		var d = T(s, 2), f = (e) => {
			dn(e, { get shoes() {
				return t.person.shoes;
			} });
		}, m = (e) => {
			var t = Zn();
			Q(e, t);
		};
		Z(d, (e) => {
			t.person.shoes.length ? e(f) : e(m, -1);
		}), Y(a);
		var h = T(a, 2), g = (e) => {
			He(Sn(e, {
				get person() {
					return t.id;
				},
				get shoes() {
					return t.person.shoes;
				}
			}), (e) => $(o, e, !0), () => q(o));
		};
		Z(h, (e) => {
			q(i) && e(g);
		}), K(() => {
			J(a, "aria-labelledby", `${n}-shoes`), J(s, "id", `${n}-shoes`);
		}), Q(e, r);
	};
	Z(k, (e) => {
		(t.person.shoes?.length || q(i)) && e(A);
	}), K(() => {
		J(h, "aria-labelledby", `${n}-feed`), J(v, "id", `${n}-feed`), J(x, "aria-labelledby", `${n}-badges`), J(S, "id", `${n}-badges`), U(w, `${t.person.badges.count ?? ""} unlocked`), J(E, "aria-labelledby", `${n}-pbs`), J(D, "id", `${n}-pbs`);
	}), Q(e, u), _();
}
d(["click"]);
// src/lib/ui/Goals.svelte
var tr = s("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), nr = s("<p class=\"msg\" role=\"status\"> </p>"), rr = s("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!> <label class=\"year svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Birth year</span> <input type=\"number\" inputmode=\"numeric\" min=\"1900\" placeholder=\"1990\" class=\"svelte-7wncvy\"/></label> <p class=\"caption maxhr svelte-7wncvy\"> </p></section>"), ir = s("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), ar = s("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), or = s("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), sr = s("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function cr(e, t) {
	let n = te();
	V(t, !0);
	let r = [], i = (e, n = x, r = x, i = x) => {
		let a = H(() => {
			let [e, t, n] = ye[r()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var o = tr(), s = N(o), c = y(s, !0), u = T(s, 2), d = T(u, 2), f = y(d, !0), p = T(d, 2);
		Y(o), K((e, s, l, d) => {
			J(o, "aria-label", i()), U(c, e), J(u, "aria-label", `Fewer ${s ?? ""}`), u.disabled = t.readOnly || n()[r()] <= q(a).lo, U(f, l), J(p, "aria-label", `More ${d ?? ""}`), p.disabled = t.readOnly || n()[r()] >= q(a).hi;
		}, [
			() => i().split(",")[0],
			() => g(i()),
			() => v(r(), n()[r()]),
			() => g(i())
		]), l("click", u, () => n()[r()] = Ce(r(), n()[r()] - q(a).step)), l("click", p, () => n()[r()] = Ce(r(), n()[r()] + q(a).step)), Q(e, o);
	}, s = a(null), c = a(null), u = a(null), d = a(!1);
	ce(() => {
		le("settings").then((e) => {
			$(s, e, !0), $(u, me(e, t.people), !0);
		}, (e) => $(c, e, !0));
	});
	let f = {
		runs: "Runs per week",
		workouts: "Workouts per week",
		active_days: "Active days per week",
		steps: "Steps for an active day"
	}, m = [
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
	], h = {
		together: "Workouts together per week",
		team: "Team points per week"
	}, g = (e) => e[0].toLowerCase() + e.slice(1), v = (e, t) => e === "steps" ? t.toLocaleString("en-US") : String(t);
	async function b() {
		$(d, !0);
		let e = await ct(ie(q(u)), t.people);
		$(d, !1), e && t.onsaved();
	}
	var S = sr(), C = T(p(S), 2), w = (e) => {
		var t = nr(), n = y(t, !0);
		K(() => U(n, q(c) ? q(c).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), Q(e, t);
	}, E = (e) => {
		var a = or(), c = p(a), g = y(c), _ = T(c, 2);
		G(_, 16, () => Object.keys(q(u).people), (e) => e, (e, r) => {
			let a = H(() => t.people[r]?.name ?? r);
			var o = rr(), s = N(o), c = y(s, !0), l = T(s, 2);
			G(l, 16, () => Pe, (e) => e, (e, t) => {
				i(e, () => q(u).people[r], () => t, () => `${f[t]}, ${q(a)}`);
			});
			var d = T(l, 2), p = T(N(d), 2);
			pe(p), Y(d);
			var m = T(d, 2), h = y(m, !0);
			Y(o), K((e, i) => {
				J(o, "aria-labelledby", `${n}-${r ?? ""}`), J(s, "id", `${n}-${r ?? ""}`), U(c, q(a)), J(p, "max", e), p.disabled = t.readOnly, U(h, i);
			}, [() => (/* @__PURE__ */ new Date()).getFullYear(), () => A(t.people[r]?.max_hr)]), Te(p, () => q(u).profiles[r].birth_year, (e) => q(u).profiles[r].birth_year = e), Q(e, o);
		});
		var v = T(_, 2), x = N(v), S = T(x, 2);
		G(S, 21, () => m, (e) => e.mode, (e, i) => {
			var a = ir();
			let o;
			var s = N(a);
			pe(s);
			var c, l = T(s, 1, !0);
			Y(a), K(() => {
				o = W(a, 1, "svelte-7wncvy", null, o, { on: q(u).couple.mode === q(i).mode }), J(s, "name", `${n}-mode`), s.disabled = t.readOnly, c !== (c = q(i).mode) && (s.value = (s.__value = c) ?? ""), U(l, q(i).label);
			}), Re(r, [], s, () => (q(i).mode, q(u).couple.mode), (e) => q(u).couple.mode = e), Q(e, a);
		}), Y(S);
		var C = T(S, 2), w = y(C, !0), E = T(C, 2), D = (e) => {
			i(e, () => q(u).couple, () => q(u).couple.mode, () => h[q(u).couple.mode]);
		};
		Z(E, (e) => {
			h[q(u).couple.mode] && e(D);
		});
		var O = T(E, 2), k = T(N(O), 2);
		pe(k), Y(O), Y(v);
		var j = T(v, 2), M = (e) => {
			var t = ar();
			K(() => t.disabled = q(d)), l("click", t, b), Q(e, t);
		};
		Z(j, (e) => {
			t.readOnly || e(M);
		}), K((e, r) => {
			U(g, `Applies from this week (week ${e ?? ""})`), J(v, "aria-labelledby", `${n}-couple`), J(x, "id", `${n}-couple`), J(S, "aria-labelledby", `${n}-couple`), U(w, r), k.disabled = t.readOnly;
		}, [() => o(q(s).week_start), () => m.find((e) => e.mode === q(u).couple.mode).hint]), Te(k, () => q(u).couple.reward, (e) => q(u).couple.reward = e), Q(e, a);
	};
	Z(C, (e) => {
		q(u) ? e(E, -1) : e(w);
	}), Q(e, S), _();
}
d(["click"]);
// src/lib/ui/Header.svelte
var lr = s("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), ur = s("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), dr = s("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function fr(e, t) {
	let n = ee(t, "subtitle", 3, ""), r = ee(t, "actionLabel", 3, ""), i = a(0);
	var o = dr();
	let s;
	var c = N(o), u = N(c), d = (e) => {
		var n = lr();
		l("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), Q(e, n);
	};
	Z(u, (e) => {
		t.onback && e(d);
	});
	var f = T(u, 2), p = N(f), m = y(p, !0), h = T(p, 2), g = (e) => {
		var n = ur(), i = y(n, !0);
		K(() => U(i, r())), l("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), Q(e, n);
	};
	Z(h, (e) => {
		t.onaction && e(g);
	}), Y(f);
	var _ = T(f, 2), v = y(_, !0);
	Y(c), Y(o), K(() => {
		s = W(o, 1, "svelte-16l0jix", null, s, { scrolled: q(i) > 0 }), U(m, t.title), U(v, n() || "\xA0");
	}), ve("y", () => q(i), (e) => $(i, e, !0)), Q(e, o);
}
d(["click"]);
// src/lib/media.svelte.js
var pr = I({
	wide: !1,
	reducedMotion: !1
}), mr = matchMedia("(min-width: 768px)"), hr = matchMedia("(prefers-reduced-motion: reduce)"), gr = () => {
	pr.wide = mr.matches, pr.reducedMotion = hr.matches;
};
mr.addEventListener("change", gr), hr.addEventListener("change", gr), gr();
// src/lib/motion.js
function _r(e, { onFrame: t, onSettle: n, snap: r = {
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
var vr = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), yr = (e) => vr(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function br({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var xr = Ke("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Sr = Ke("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function Cr(e, t) {
	V(t, !0);
	let n = ee(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, o = a(I(pr.reducedMotion ? i : 0)), s = H(() => n() * .11), c = H(() => t.fractions.map((e, t) => {
		let a = n() / 2 - q(s) / 2 - t * q(s) * 1.3, c = 2 * Math.PI * a;
		return {
			kind: r[t],
			r: a,
			c,
			len: c * e * q(o) / i
		};
	}));
	ce(() => {
		if (q(o) === i) return;
		let e = _r(br({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => $(o, e, !0) });
		return e.to(i), e.stop;
	});
	var l = Sr();
	let u;
	G(l, 21, () => q(c), (e) => e.kind, (e, t) => {
		var r = xr(), i = p(r);
		let a;
		var o = T(i);
		let c;
		K(() => {
			J(i, "cx", n() / 2), J(i, "cy", n() / 2), J(i, "r", q(t).r), J(i, "stroke-width", q(s)), a = X(i, "", a, { stroke: `var(--${q(t).kind ?? ""})` }), J(o, "cx", n() / 2), J(o, "cy", n() / 2), J(o, "r", q(t).r), J(o, "stroke-width", q(s)), J(o, "stroke-dasharray", `${q(t).len ?? ""} ${q(t).c ?? ""}`), J(o, "opacity", +(q(t).len > .01)), J(o, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = X(o, "", c, { stroke: `var(--${q(t).kind ?? ""})` });
		}), Q(e, r);
	}), Y(l), K(() => {
		J(l, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), u = X(l, "", u, { width: `${n() / 16}rem` });
	}), Q(e, l), _();
}
// src/lib/ui/PersonTile.svelte
var wr = s("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Tr = s("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), Er = s("<span class=\"streak svelte-1handop\"> </span>"), Dr = s("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), Or = s("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), kr = s("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), Ar = s("<span class=\"steps svelte-1handop\"> </span>"), jr = s("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), Mr = s("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), Nr = s("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function Pr(e, t) {
	V(t, !0);
	let n = ee(t, "index", 3, 0), r = ee(t, "compact", 3, !1), i = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], a = H(() => i[n() % i.length]), o = H(() => se(q(a), 2)), s = H(() => q(o)[0]), c = H(() => q(o)[1]), u = H(() => z(t.person)), d = H(() => t.person.week), f = [
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
	], h = H(() => f.map((e, t) => ({
		...e,
		n: xe(q(d))[t],
		of: We(q(d))[t]
	}))), g = H(() => m(t.person.steps_today, q(d).goal.steps)), v = H(() => [
		`Level ${q(u).level}`,
		r() ? `🔥 ${t.person.streak} wk` : `${t.person.xp.toLocaleString()} XP`,
		q(d).paused && "Week paused",
		q(d).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), b = H(() => `${t.person.name}, level ${q(u).level}. This week ${q(h).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${q(d).goal_pending ? "New goals pending. " : ""}${q(d).bonus ? "Weekly bonus earned. " : ""}${q(g) ? q(g).replace("👟 ", "") + ". " : ""}Streak ${t.person.streak} weeks.`);
	var x = Nr();
	let S;
	var C = N(x), E = N(C), D = N(E);
	let O;
	var k = y(D, !0), A = T(D, 2), j = N(A), M = y(j, !0), P = T(j, 2), F = y(P, !0);
	Y(A);
	var I = T(A, 2), L = (e) => {
		var t = Tr(), n = p(t), r = N(n);
		{
			let e = H(() => w(q(d)));
			Cr(r, {
				get fractions() {
					return q(e);
				},
				size: 44
			});
		}
		var i = T(r, 2), a = (e) => {
			var t = wr();
			Q(e, t);
		};
		Z(i, (e) => {
			q(d).bonus && e(a);
		}), Y(n);
		var o = T(n, 2), s = y(o, !0);
		K(() => U(s, q(b))), Q(e, t);
	}, R = (e) => {
		var n = Er(), r = y(n);
		K(() => U(r, `🔥 ${t.person.streak ?? ""} wk`)), Q(e, n);
	};
	Z(I, (e) => {
		r() ? e(L) : e(R, -1);
	});
	var te = T(I, 2), B = (e) => {
		var t = Dr();
		Q(e, t);
	};
	Z(te, (e) => {
		t.onopen && e(B);
	}), Y(E);
	var ne = T(E, 2), re = (e) => {
		var t = jr(), n = p(t), r = N(n), i = N(r);
		{
			let e = H(() => w(q(d))), t = H(() => pr.wide ? 112 : 88);
			Cr(i, {
				get fractions() {
					return q(e);
				},
				get size() {
					return q(t);
				}
			});
		}
		var a = T(i, 2), o = (e) => {
			var t = Or();
			Q(e, t);
		};
		Z(a, (e) => {
			q(d).bonus && e(o);
		}), Y(r);
		var s = T(r, 2);
		G(s, 21, () => q(h), (e) => e.kind, (e, t) => {
			var n = kr(), r = N(n), i = N(r);
			let a;
			var o = T(i, 1, !0);
			Y(r);
			var s = T(r, 2), c = N(s, !0), l = T(c), u = y(l);
			Y(s), Y(n), K(() => {
				a = X(i, "", a, { background: `var(--${q(t).kind ?? ""})` }), U(o, q(t).label), U(c, q(t).n), U(u, `/${q(t).of ?? ""}`);
			}), Q(e, n);
		}), Y(s), Y(n);
		var c = T(n, 2), l = (e) => {
			var t = Ar(), n = y(t, !0);
			K(() => U(n, q(g))), Q(e, t);
		};
		Z(c, (e) => {
			q(g) && e(l);
		});
		var f = T(c, 2), m = N(f), _ = N(m);
		let v;
		Y(m);
		var b = T(m, 2), x = y(b);
		Y(f), K((e, t) => {
			v = X(_, "", v, { width: `${q(u).frac * 100}%` }), U(x, `${e ?? ""} of ${t ?? ""} XP to level ${q(u).level + 1}`);
		}, [() => q(u).into.toLocaleString(), () => q(u).span.toLocaleString()]), Q(e, t);
	};
	Z(ne, (e) => {
		r() || e(re);
	}), Y(C);
	var ie = T(C, 2), ae = (e) => {
		var n = Mr();
		K(() => J(n, "aria-label", q(b))), l("click", n, function(...e) {
			t.onopen?.apply(this, e);
		}), Q(e, n);
	};
	Z(ie, (e) => {
		t.onopen && e(ae);
	}), Y(x), K((e) => {
		S = W(x, 1, "tile glass svelte-1handop", null, S, {
			compact: r(),
			opens: t.onopen
		}), J(C, "aria-hidden", t.onopen ? "true" : void 0), O = X(D, "", O, {
			"--a1": q(s),
			"--a2": q(c)
		}), U(k, e), U(M, t.person.name), U(F, q(v));
	}, [() => t.person.name.slice(0, 1)]), Q(e, x), _();
}
d(["click"]);
// src/lib/ui/Sheet.svelte
var Fr = s("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), Ir = s("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function Lr(e, t) {
	V(t, !0);
	let n = ee(t, "from", 3, null), r = 1e3, i = pr.reducedMotion, o = a(I(i ? r : 0)), s = a(0), c = a(1), u = a(!1), d = a("50% 100%"), f, m, h = !1, g = null, v = H(() => i ? +q(u) : Math.min(1, q(o) / 500)), y = H(() => i ? 1 : .5 + .5 * q(o) / r), b = () => {
		h && (q(o) === 0 || q(s) >= q(c)) && (h = !1, t.onclose());
	};
	function x(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = br({
					value: r,
					damping: o,
					response: s
				}), n = _r(t, {
					onFrame: e,
					onSettle: b
				}), n.to(i, a);
			}
		};
	}
	let S = x((e) => $(o, e, !0)), C = x((e) => $(s, e, !0));
	function w() {
		h || g || (h = !0, i ? ($(u, !1), setTimeout(t.onclose, yr("--fade"))) : S.to(q(o), 0, { response: .3 }));
	}
	function E(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), S.stop(), C.stop(), h = !1, g = {
			from: q(s),
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		});
	}
	function D(e) {
		if (!g) return;
		let t = g.from + e.clientY - g.start;
		$(s, t < 0 ? -Ht(-t, q(c)) : t, !0), g.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), g.samples.length > 8 && g.samples.shift();
	}
	function O(e) {
		if (!g) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = Vt([...g.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		g = null, Bt(q(s), n, q(c)) ? i ? w() : (h = !0, C.to(q(s), q(c), {
			velocity: n,
			response: .3
		})) : i ? $(s, 0) : (C.to(q(s), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), q(o) < r && S.to(q(o), r));
	}
	ce(() => {
		if (n()) {
			let e = n().getBoundingClientRect();
			$(d, `${e.left + e.width / 2 - f.offsetLeft}px ${e.top + e.height / 2 - f.offsetTop}px`);
		}
		m.focus({ preventScroll: !0 });
		let e = document.documentElement;
		return e.style.overflow = "hidden", i ? requestAnimationFrame(() => $(u, !0)) : S.to(0, r), () => {
			S.stop(), C.stop(), e.style.overflow = "";
		};
	});
	var A = { close: w }, M = Ir();
	j("keydown", k, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && w());
	var P = p(M);
	let F, L;
	var R = T(P, 2);
	let z, te;
	var B = N(R), ne = T(N(B), 2), re = N(ne), ie = (e) => {
		var n = Fr();
		l("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), Q(e, n);
	};
	Z(re, (e) => {
		t.onback && e(ie);
	});
	var ae = T(re, 2);
	He(ae, (e) => m = e, () => m), Y(ne), Y(B);
	var oe = T(B, 2), se = N(oe);
	return je(se, () => t.children), Y(oe), Y(R), He(R, (e) => f = e, () => f), K((e) => {
		F = W(P, 1, "scrim svelte-185xwm9", null, F, { fade: i }), L = X(P, "", L, { opacity: e }), z = W(R, 1, "sheet svelte-185xwm9", null, z, { fade: i }), J(R, "aria-label", t.label), te = X(R, "", te, {
			opacity: q(v),
			transform: `translate3d(0, ${q(s) ?? ""}px, 0) scale(${q(y) ?? ""})`,
			"transform-origin": q(d)
		});
	}, [() => q(v) * Math.min(1, Math.max(0, 1 - q(s) / q(c)))]), l("click", P, w), l("pointerdown", B, E), l("pointermove", B, D), l("pointerup", B, O), j("pointercancel", B, O), l("click", ae, w), Me(R, "offsetHeight", (e) => $(c, e)), Q(e, M), _(A);
}
d([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var Rr = s("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), zr = s("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), Br = s("<p class=\"caption stale svelte-9nj5u4\"> </p>"), Vr = s("<!> <!> <!>", 1);
function Hr(e, t) {
	V(t, !0);
	let n = H(() => t.scoredAt ? re(t.scoredAt, t.now) : null);
	var r = Vr(), i = p(r), a = (e) => {
		var n = Rr(), r = T(N(n));
		Y(n), K(() => U(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), Q(e, n);
	};
	Z(i, (e) => {
		t.configError && e(a);
	});
	var o = T(i, 2), s = (e) => {
		var n = zr(), r = T(N(n));
		Y(n), K(() => U(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), Q(e, n);
	};
	Z(o, (e) => {
		t.settingsError && e(s);
	});
	var c = T(o, 2), l = (e) => {
		var t = Br(), r = y(t, !0);
		K(() => U(r, q(n))), Q(e, t);
	};
	Z(c, (e) => {
		q(n) && e(l);
	}), Q(e, r), _();
}
// node_modules/svelte/src/internal/flags/legacy.js
h();
// src/lib/ui/Toast.svelte
var Ur = s("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), Wr = s("<span> </span> <!>", 1), Gr = s("<div role=\"status\" aria-live=\"polite\"><!></div>");
function Kr(t, n) {
	V(n, !1);
	function r() {
		let e = et.undo;
		Object.assign(et, {
			on: !1,
			undo: null
		}), e();
	}
	e();
	var i = Gr();
	let a;
	var o = N(i), s = (e) => {
		var t = Wr(), n = p(t), i = y(n, !0), a = T(n, 2), o = (e) => {
			var t = Ur();
			l("click", t, r), Q(e, t);
		};
		Z(a, (e) => {
			et.undo && e(o);
		}), K(() => U(i, et.text)), Q(e, t);
	};
	Z(o, (e) => {
		et.on && e(s);
	}), Y(i), K(() => a = W(i, 1, "toast svelte-1fk2ial", null, a, { on: et.on })), Q(t, i), _();
}
d(["click"]);
// src/lib/ui/Together.svelte
var qr = s("<p class=\"progress svelte-1tya3no\"> </p>"), Jr = s("<p> </p>"), Yr = s("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), Xr = s("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function Zr(e, t) {
	V(t, !0);
	let n = H(() => t.group.week ? Ie(t.group.week, t.people) : ""), r = H(() => t.group.week ? v(t.group.week) : null), i = H(() => [
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
	var a = Xr(), o = T(N(a), 2), s = (e) => {
		var t = qr(), r = y(t, !0);
		K(() => U(r, q(n))), Q(e, t);
	};
	Z(o, (e) => {
		q(n) && e(s);
	});
	var c = T(o, 2), l = (e) => {
		var n = Jr();
		let i;
		var a = y(n, !0);
		K(() => {
			i = W(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), U(a, q(r));
		}), Q(e, n);
	};
	Z(c, (e) => {
		q(r) && e(l);
	});
	var u = T(c, 2);
	G(u, 21, () => q(i), (e) => e.k, (e, t) => {
		var n = Yr(), r = N(n), i = y(r, !0), a = T(r), o = N(a, !0), s = T(o), c = y(s, !0);
		Y(a), Y(n), K(() => {
			U(i, q(t).k), U(o, q(t).v), U(c, q(t).unit);
		}), Q(e, n);
	}), Y(u), Y(a), Q(e, a), _();
}
// src/App.svelte
var Qr = s("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), $r = s("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), ei = s("<div class=\"tiles compact svelte-1n46o8q\"></div>"), ti = s("<!> <!>", 1), ni = s("<div class=\"tiles svelte-1n46o8q\"></div>"), ri = s("<!> <!> <!> <!>", 1), ii = s("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function ai(e, t) {
	V(t, !0);
	let n = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), i = new URLSearchParams(n.location.search), o = i.get("person"), s = /^\/(?!\/)/.test(i.get("back") ?? "") ? i.get("back") : null, c = s && (() => {
		n.history.pushState(null, "", s), n.dispatchEvent(new Event("location-changed"));
	}), l = a(null), u = (e) => (t) => $(l, {
		id: e,
		from: t.currentTarget
	}, !0), d = a(null), f = a(void 0);
	async function m() {
		let e = q(l)?.from ?? q(d)?.from;
		$(l, $(d, null), !0), await r(), e?.focus({ preventScroll: !0 });
	}
	let h = a(null), g = a(null), v = a(I(/* @__PURE__ */ new Date())), b;
	async function x() {
		if (clearTimeout(b), !document.hidden) {
			try {
				$(h, await le("scores"), !0), $(g, null), st(q(h).people), o && Object.hasOwn(q(h).people, o) && o !== Ge(q(h).viewer, q(h).people).self && $(l, {
					id: o,
					from: null
				}, !0), o = null;
			} catch (e) {
				$(g, e, !0);
			}
			$(v, /* @__PURE__ */ new Date(), !0), clearTimeout(b), b = setTimeout(x, q(h) ? 6e4 : 3e4);
		}
	}
	D(() => {
		x();
		let e = () => document.hidden || x();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(b), document.removeEventListener("visibilitychange", e);
		};
	}), D(() => {
		nt.n && x();
	});
	let S = H(() => ae(q(h)?.people ?? {}, tt.entry)), C = H(() => Object.keys(q(S))), w = H(() => Ge(q(h)?.viewer ?? {}, q(S))), E = H(() => q(S)[q(w).self ?? q(C)[0]]?.week), O = (e) => !!q(h)?.viewer?.can_edit?.includes(e), k = H(() => !!q(l) && Object.hasOwn(q(S), q(l).id) || !!q(d) && !!q(h));
	var A = ii(), j = p(A), M = N(j);
	{
		let e = H(() => q(E) ? oe(q(E)) : ""), t = H(() => q(h) ? (e) => $(d, { from: e.currentTarget }, !0) : void 0);
		fr(M, {
			title: "Training",
			get subtitle() {
				return q(e);
			},
			get onback() {
				return c;
			},
			actionLabel: "Goals",
			get onaction() {
				return q(t);
			}
		});
	}
	var ee = T(M, 2), P = N(ee), F = (e) => {
		var t = $r(), n = T(p(t), 2), r = (e) => {
			var t = Qr(), n = y(t, !0);
			K(() => U(n, q(g).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), Q(e, t);
		};
		Z(n, (e) => {
			q(g) && e(r);
		}), Q(e, t);
	}, L = (e) => {
		var t = ri(), n = p(t);
		Hr(n, {
			get scoredAt() {
				return q(h).scored_at;
			},
			get configError() {
				return q(h).config_error;
			},
			get settingsError() {
				return q(h).settings_error;
			},
			get now() {
				return q(v);
			}
		});
		var r = T(n, 2), i = (e) => {
			var t = ti(), n = p(t), r = (e) => {
				var t = ei();
				G(t, 20, () => q(w).others, (e) => e, (e, t) => {
					{
						let n = H(() => q(C).indexOf(t)), r = H(() => u(t));
						Pr(e, {
							get person() {
								return q(S)[t];
							},
							get index() {
								return q(n);
							},
							compact: !0,
							get onopen() {
								return q(r);
							}
						});
					}
				}), Y(t), Q(e, t);
			};
			Z(n, (e) => {
				q(w).others.length && e(r);
			});
			var i = T(n, 2);
			{
				let e = H(() => q(C).indexOf(q(w).self));
				Pr(i, {
					get person() {
						return q(S)[q(w).self];
					},
					get index() {
						return q(e);
					}
				});
			}
			Q(e, t);
		}, a = (e) => {
			var t = ni();
			G(t, 20, () => q(w).others, (e) => e, (e, t) => {
				{
					let n = H(() => q(C).indexOf(t)), r = H(() => u(t));
					Pr(e, {
						get person() {
							return q(S)[t];
						},
						get index() {
							return q(n);
						},
						get onopen() {
							return q(r);
						}
					});
				}
			}), Y(t), Q(e, t);
		};
		Z(r, (e) => {
			q(w).self ? e(i) : e(a, -1);
		});
		var o = T(r, 2), s = (e) => {
			Zr(e, {
				get group() {
					return q(h).group;
				},
				get people() {
					return q(S);
				}
			});
		};
		Z(o, (e) => {
			q(h).group && e(s);
		});
		var c = T(o, 2), l = (e) => {
			{
				let t = H(() => O(q(w).self));
				er(e, {
					get id() {
						return q(w).self;
					},
					get person() {
						return q(S)[q(w).self];
					},
					get canEdit() {
						return q(t);
					},
					get viewer() {
						return q(h).viewer;
					}
				});
			}
		};
		Z(c, (e) => {
			q(w).self && e(l);
		}), Q(e, t);
	};
	Z(P, (e) => {
		q(h) ? e(L, -1) : e(F);
	}), Y(ee), Y(j);
	var R = T(j, 2), z = (e) => {
		He(Lr(e, {
			label: "Goals",
			get from() {
				return q(d).from;
			},
			onclose: m,
			get onback() {
				return c;
			},
			children: (e, t) => {
				{
					let t = H(() => !q(w).self);
					cr(e, {
						get people() {
							return q(h).people;
						},
						get readOnly() {
							return q(t);
						},
						onsaved: () => q(f)?.close()
					});
				}
			},
			$$slots: { default: !0 }
		}), (e) => $(f, e, !0), () => q(f));
	}, te = (e) => {
		Lr(e, {
			get label() {
				return `${q(S)[q(l).id].name ?? ""}'s details`;
			},
			get from() {
				return q(l).from;
			},
			onclose: m,
			get onback() {
				return c;
			},
			children: (e, t) => {
				var n = ti(), r = p(n);
				{
					let e = H(() => q(C).indexOf(q(l).id));
					Pr(r, {
						get person() {
							return q(S)[q(l).id];
						},
						get index() {
							return q(e);
						}
					});
				}
				var i = T(r, 2);
				{
					let e = H(() => O(q(l).id));
					er(i, {
						get id() {
							return q(l).id;
						},
						get person() {
							return q(S)[q(l).id];
						},
						get canEdit() {
							return q(e);
						},
						get viewer() {
							return q(h).viewer;
						}
					});
				}
				Q(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	Z(R, (e) => {
		q(d) && q(h) ? e(z) : q(k) && e(te, 1);
	}), Kr(T(R, 2), {}), K(() => j.inert = q(k)), Q(e, A), _();
}
// src/main.js
var oi = (e) => Ye(ai, { target: e }), si = () => new Promise((e) => {
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
		document.documentElement.dataset.theme = n ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", si().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", oi(e);
		}));
	}
});
