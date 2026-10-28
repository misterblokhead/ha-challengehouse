import { $ as e, $t as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Gt as h, H as g, Ht as _, I as v, It as y, J as b, Jt as x, K as S, Kt as C, L as w, Lt as T, M as E, Mt as D, N as O, Nt as k, O as A, Ot as j, P as M, Pt as N, Q as P, Qt as F, R as ee, Rt as I, S as L, St as R, T as z, Tt as B, U as V, Ut as H, V as te, Vt as U, W, Wt as G, X as K, Xt as ne, Y as re, Yt as ie, Z as ae, _ as oe, _t as se, a as ce, at as le, b as ue, bt as de, c as fe, ct as pe, d as me, dt as q, en as he, et as ge, f as _e, ft as J, g as ve, gt as Y, h as ye, ht as be, i as xe, it as Se, j as Ce, jt as we, k as Te, kt as Ee, l as De, lt as Oe, m as ke, mt as Ae, n as je, nt as Me, o as Ne, ot as Pe, p as Fe, pt as Ie, q as Le, qt as Re, rt as ze, s as Be, st as X, t as Ve, tt as He, u as Ue, ut as We, v as Ge, vt as Ke, w as qe, wt as Z, x as Je, xt as Q, y as Ye, yt as $, z as Xe, zt as Ze } from "./shared-CIkHX0G_.js";
// src/lib/actions.svelte.js
var Qe = 5e3, $e = Ze({}), et = Ze({}), tt = Ze({
	on: !1,
	text: "",
	undo: null
}), nt = Ze({
	entry: null,
	at: 0
}), rt = Ze({ n: 0 }), it, at = 0, ot = {};
function st(e, t = null) {
	clearTimeout(it), Object.assign(tt, {
		on: !0,
		text: e,
		undo: t
	}), it = setTimeout(() => tt.on = !1, Qe);
}
function ct(e, t = Date.now()) {
	for (let [n, r] of Object.entries($e)) M(r, e[r.person]?.feed ?? [], t) && delete $e[n];
	nt.entry && ue(nt, e, t) && (nt.entry = null);
}
async function lt(e, n) {
	try {
		await t("POST", "settings", e);
	} catch (e) {
		return st(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(nt, {
		entry: e,
		at: Date.now()
	}), ct(n), st("Saved · updates within 5 min"), !0;
}
async function ut(e, n, r) {
	let i = `${e}/${n}`, a = $e[i], o = ++at, s = n.startsWith("manual:"), c = s && r === "remove" ? null : r === "remove";
	$e[i] = {
		person: e,
		key: n,
		want: c,
		at: Date.now(),
		n: o
	}, r === "remove" && !s && st("Removed", () => ut(e, n, "restore"));
	try {
		await Xe(ot, i, () => t("POST", "workouts", {
			person: e,
			key: n,
			action: r
		})), et[i] = c;
	} catch (e) {
		$e[i]?.n === o && (a ? $e[i] = a : delete $e[i]), st(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
var dt = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
async function ft(e, t) {
	try {
		return await F(`feed?person=${encodeURIComponent(e)}&before=${t}`);
	} catch (e) {
		return st(dt(e)), null;
	}
}
async function pt(e) {
	try {
		await t("POST", "shoes", e);
	} catch (e) {
		return st(dt(e)), !1;
	}
	return rt.n++, !0;
}
async function mt(e, n, r) {
	try {
		await t("POST", "workouts", {
			action: "shoe",
			person: e,
			key: n,
			shoe_id: r
		});
	} catch (e) {
		return st(dt(e)), !1;
	}
	return rt.n++, st("Moved to the other shoe"), !0;
}
// src/lib/ui/Badges.svelte
var ht = Z("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), gt = Z("<ul class=\"svelte-m8wnum\"></ul>"), _t = Z("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), vt = Z("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), yt = Z("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function bt(e, t) {
	G(t, !0);
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
	}, i = (e) => n[String(e.icon).replace(/^mdi:/, "")] ?? "🏅", a = (e) => e.toLocaleString(void 0, { maximumFractionDigits: 1 });
	var o = yt(), s = p(o), c = (e) => {
		var n = gt();
		Y(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = ht(), a = p(n), o = T(a, !0), s = I(a, 2), c = T(s, !0), l = I(s, 2), u = T(l, !0);
			x(n), D((e, n) => {
				Q(o, e), Q(c, r(t).title), Q(u, n);
			}, [() => i(r(t)), () => W(r(t).unlocked_at)]), R(e, n);
		}), x(n), R(e, n);
	};
	$(s, (e) => {
		t.badges.recent.length && e(c);
	});
	var l = I(s, 2), u = (e) => {
		var n = gt();
		Y(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = _t(), o = p(n), s = T(o, !0), c = I(o, 2), l = T(c, !0), u = I(c, 2), d = T(u), f = I(u, 2), m = p(f);
			let h;
			x(f), x(n), D((e, n, i, a) => {
				Q(s, e), Q(l, r(t).title), Q(d, `${n ?? ""} of ${i ?? ""}`), h = q(m, "", h, { width: a });
			}, [
				() => i(r(t)),
				() => a(r(t).current),
				() => a(r(t).target),
				() => `${Math.min(1, r(t).current / r(t).target) * 100}%`
			]), R(e, n);
		}), x(n), R(e, n);
	};
	$(l, (e) => {
		t.badges.next.length && e(u);
	});
	var d = I(l, 2), f = (e) => {
		var t = vt();
		R(e, t);
	};
	$(d, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(f);
	}), x(o), R(e, o), H();
}
// src/lib/ui/FeedRow.svelte
var xt = Z("<span class=\"mini svelte-69s4be\"> </span>"), St = Z("<span class=\"mini svelte-69s4be\">Together</span>"), Ct = Z("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), wt = Z("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), Tt = Z("<span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span>", 1), Et = Z("<button type=\"button\" class=\"head svelte-69s4be\"><!></button>"), Dt = Z("<div class=\"head svelte-69s4be\"><!></div>"), Ot = Z("<li><!></li>");
function kt(e, t) {
	G(t, !0);
	let n = (e) => {
		var n = Tt(), s = y(n), c = T(s, !0), l = I(s, 2), u = p(l), d = p(u), f = I(d), m = (e) => {
			var n = xt(), r = T(n, !0);
			D(() => Q(r, t.item.plan)), R(e, n);
		};
		$(f, (e) => {
			t.item.plan && e(m);
		});
		var h = I(f, 2), g = (e) => {
			var t = St();
			R(e, t);
		};
		$(h, (e) => {
			t.item.joint && e(g);
		});
		var _ = I(h, 2), v = (e) => {
			var t = Ct();
			R(e, t);
		};
		$(_, (e) => {
			t.record && e(v);
		}), x(u);
		var b = I(u, 2), S = T(b);
		x(l);
		var C = I(l, 2), w = p(C), E = (e) => {
			var t = wt();
			R(e, t);
		};
		$(w, (e) => {
			r(a) && e(E);
		});
		var O = I(w);
		x(C), D(() => {
			J(s, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), Q(c, i[t.item.kind] ?? "💪"), Q(d, `${r(o).title ?? ""} `), Q(S, `${r(o).when ?? ""} · ${r(o).duration ?? ""}`), Q(O, ` ${(r(o).removable === "restore" ? "Removed" : r(o).label ?? (r(o).xp && `${r(o).xp} XP`)) ?? ""}`);
		}), R(e, n);
	}, i = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, a = _(() => $e[`${t.person}/${t.item.key}`]), o = _(() => Ge(r(a) && r(a).want !== null ? {
		...t.item,
		excluded: r(a).want
	} : t.item)), s = _(() => r(a)?.want === null), c = _(() => t.item.kind !== "active_day");
	var l = Ot();
	let u;
	var d = p(l), f = (e) => {
		var r = Et(), i = p(r);
		n(i), x(r), j("click", r, () => t.onopen(t.item)), R(e, r);
	}, m = (e) => {
		var t = Dt(), r = p(t);
		n(r), x(t), R(e, t);
	};
	$(d, (e) => {
		r(c) ? e(f) : e(m, -1);
	}), x(l), D(() => u = J(l, 1, "svelte-69s4be", null, u, {
		dim: r(o).removable === "restore" || r(s),
		grey: !!r(o).label
	})), R(e, l), H();
}
l(["click"]);
// src/lib/ui/Feed.svelte
var At = Z("<ul class=\"card svelte-n1344i\"></ul>"), jt = Z("<p class=\"caption empty svelte-n1344i\">No workouts in the last 90 days.</p>"), Mt = Z("<button type=\"button\" class=\"btn older svelte-n1344i\">Load older</button>"), Nt = Z("<!> <!>", 1);
function Pt(e, t) {
	G(t, !0);
	let i = U(Ze([])), o = U(!0), s = U(!1), c = null, l = _(() => n(t.items, E(r(i), t.person, et)));
	async function u() {
		a(s, !0);
		let e = c ?? r(l).at(-1)?.start.slice(0, 10) ?? Ce(A(), 88), u = await ft(t.person, e);
		a(s, !1), u && (a(i, n(r(i), u.items), !0), c = Ce(e, 90), a(o, u.more, !0));
	}
	var d = Nt(), f = y(d), p = (e) => {
		var n = At();
		Y(n, 21, () => r(l), (e) => e.key, (e, n) => {
			{
				let i = _(() => t.records?.has(r(n).key));
				kt(e, {
					get person() {
						return t.person;
					},
					get item() {
						return r(n);
					},
					get record() {
						return r(i);
					},
					get onopen() {
						return t.onopen;
					}
				});
			}
		}), x(n), R(e, n);
	}, m = (e) => {
		var t = jt();
		R(e, t);
	};
	$(f, (e) => {
		r(l).length ? e(p) : e(m, -1);
	});
	var h = I(f, 2), g = (e) => {
		var t = Mt();
		D(() => t.disabled = r(s)), j("click", t, u), R(e, t);
	};
	$(h, (e) => {
		r(o) && e(g);
	}), R(e, d), H();
}
l(["click"]);
// src/lib/ui/PlanBar.svelte
var Ft = Z("<span> </span>"), It = Z("<i class=\"svelte-1y5m0aq\"></i>"), Lt = Z("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), Rt = Z("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!></div>");
function zt(e, t) {
	G(t, !0);
	let n = _(() => f(t.plan)), i = _(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0)) / 60));
	var a = Rt(), o = p(a), s = p(o), c = T(s, !0), l = I(s, 2), u = (e) => {
		var n = Ft();
		let r;
		var i = T(n, !0);
		D(() => {
			r = J(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), Q(i, t.plan.due_today ? "Due today" : "Rest day");
		}), R(e, n);
	};
	$(l, (e) => {
		r(n).length && e(u);
	}), x(o);
	var d = I(o, 2), m = (e) => {
		var t = Lt(), a = y(t);
		Y(a, 21, () => r(n), se, (e, t) => {
			var n = It();
			let i;
			D(() => i = q(n, "", i, {
				"flex-grow": r(t).frac,
				background: `var(--${r(t).kind === "run" ? "run" : "fill"})`
			})), R(e, n);
		}), x(a);
		var o = I(a, 2), s = p(o), c = p(s);
		q(c, "", {}, { background: "var(--run)" });
		var l = I(c, 2);
		q(l, "", {}, { background: "var(--fill)" }), Re(), x(s);
		var u = I(s, 2), d = T(u);
		x(o), D(() => {
			X(a, "aria-label", `Run and walk intervals, ${r(i) ?? ""} minutes in total`), Q(d, `${r(i) ?? ""} min`);
		}), R(e, t);
	};
	$(d, (e) => {
		r(n).length && e(m);
	}), x(a), D(() => Q(c, t.plan.state)), R(e, a), H();
}
// src/lib/gesture.js
var Bt = (e, t = .998) => e / 1e3 * t / (1 - t), Vt = (e, t, n) => e + Bt(t) > n / 2;
function Ht(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var Ut = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), Wt = Z("<li class=\"svelte-18znx9k\"><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), Gt = Z("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1), Kt = Z("<dialog><div class=\"grab svelte-18znx9k\"><h2 class=\"svelte-18znx9k\">All records</h2> <button type=\"button\" class=\"close press svelte-18znx9k\" aria-label=\"Close\">✕</button></div> <div class=\"body svelte-18znx9k\"></div></dialog>");
function qt(e, t) {
	let n = d();
	G(t, !0);
	let i, o, s = U(0), l = null, u = U(!1), f = !1;
	function m(e = null) {
		i.open || (f = document.documentElement.style.overflow !== "hidden", f && (document.documentElement.style.overflow = "hidden"), i.showModal(), o.scrollTop = 0, e && o.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	function h() {
		f && (document.documentElement.style.overflow = ""), f = !1, a(s, 0);
	}
	function g(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), l = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, a(u, !0));
	}
	function _(e) {
		l && (a(s, Math.max(0, e.clientY - l.start), !0), l.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), l.samples.length > 8 && l.samples.shift());
	}
	function v(e) {
		if (!l) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = Ht([...l.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		l = null, a(u, !1), Vt(r(s), n, i.offsetHeight) ? i.close() : a(s, 0);
	}
	var b = { open: m }, S = Kt();
	let C, w;
	var E = p(S), O = p(E), k = I(O, 2);
	x(E);
	var A = I(E, 2);
	return Y(A, 21, () => t.groups, (e) => e.group, (e, t) => {
		var n = Gt(), i = y(n), a = T(i, !0), o = I(i, 2);
		Y(o, 21, () => r(t).lifts, (e) => e.id, (e, t) => {
			var n = Wt(), i = p(n), a = p(i), o = I(a), s = T(o, !0), l = I(o);
			x(i), x(n), D((e, n) => {
				Q(a, `${r(t).name ?? ""} · `), Q(s, e), Q(l, ` · ${n ?? ""}`);
			}, [() => c(r(t)), () => W(r(t).date)]), R(e, n);
		}), x(o), D(() => {
			X(i, "data-group", r(t).group), Q(a, r(t).group);
		}), R(e, n);
	}), x(A), Me(A, (e) => o = e, () => o), x(S), Me(S, (e) => i = e, () => i), D(() => {
		X(S, "aria-labelledby", `${n}-t`), C = J(S, 1, "svelte-18znx9k", null, C, { dragging: r(u) }), w = q(S, "", w, { transform: r(s) ? `translateY(${r(s)}px)` : null }), X(O, "id", `${n}-t`);
	}), j("click", S, (e) => e.target === i && i.close()), Ee("close", S, h), j("keydown", S, (e) => e.key === "Escape" && e.stopPropagation()), j("pointerdown", E, g), j("pointermove", E, _), j("pointerup", E, v), Ee("pointercancel", E, v), j("click", k, () => i.close()), R(e, S), H(b);
}
l([
	"click",
	"keydown",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/StepBars.svelte
var Jt = Z("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), Yt = Z("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), Xt = Z("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function Zt(e, t) {
	G(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), i = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var a = Xt(), o = p(a);
	Y(o, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = Jt();
		let a;
		var o = p(n), s = p(o);
		let c, l;
		x(o);
		var u = I(o, 2), d = T(u, !0);
		x(n), D((e) => {
			X(n, "aria-label", e), X(n, "aria-hidden", r(t).future ? "true" : void 0), X(n, "aria-current", r(t).isToday ? "date" : void 0), a = J(n, 1, "svelte-1f099m", null, a, { today: r(t).isToday }), c = J(s, 1, "svelte-1f099m", null, c, {
				active: r(t).active,
				future: r(t).future
			}), l = q(s, "", l, { height: `${r(t).frac * 100}%` }), Q(d, r(t).label);
		}, [() => r(t).future ? void 0 : i(r(t))]), R(e, n);
	}), x(o);
	var s = I(o, 2), c = (e) => {
		var n = Yt();
		let r;
		D(() => r = q(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), R(e, n);
	};
	$(s, (e) => {
		t.goalFrac !== null && e(c);
	}), x(a), R(e, a), H();
}
// src/lib/ui/Progress.svelte
var Qt = Z("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), $t = Z("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), en = Z("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), tn = Z("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), nn = Z("<span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span>", 1), rn = Z("<button type=\"button\" class=\"row svelte-kr1x1f\"><!></button>"), an = Z("<div class=\"row svelte-kr1x1f\"><!></div>"), on = Z("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), sn = Z("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function cn(e, t) {
	G(t, !0);
	let n = _(() => t.person.week.goal.steps ?? 0), i = _(() => re(t.person.steps_week, r(n), A())), a = _(() => t.person.pbs.lifts ?? []), l = _(() => L(r(a))), u, d = _(() => t.person.pbs.fastest_1k), f = _(() => t.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var m = sn(), h = y(m), g = (e) => {
		var t = Qt(), n = p(t);
		Zt(n, {
			get bars() {
				return r(i).bars;
			},
			get goalFrac() {
				return r(i).goalFrac;
			}
		});
		var a = I(n, 2), o = T(a, !0);
		x(t), D((e) => Q(o, e), [() => Le(r(i).bars)]), R(e, t);
	};
	$(h, (e) => {
		r(i) && e(g);
	});
	var v = I(h, 2), b = p(v), S = (e) => {
		var t = en(), n = y(t);
		Y(n, 21, () => r(l), (e) => e.group, (e, t) => {
			var n = $t(), i = p(n), a = p(i), o = T(a, !0), s = I(a), l = p(s), d = I(l), f = T(d, !0);
			x(s), x(i), x(n), D((e) => {
				Q(o, r(t).group), Q(l, `${r(t).lift.name ?? ""} · `), Q(f, e);
			}, [() => c(r(t).lift)]), j("click", i, () => u.open(r(t).group)), R(e, n);
		}), x(n);
		var i = I(n, 2), o = T(i);
		D(() => Q(o, `All records (${r(a).length ?? ""})`)), j("click", i, () => u.open()), R(e, t);
	}, C = (e) => {
		var t = tn();
		R(e, t);
	};
	$(b, (e) => {
		r(a).length ? e(S) : e(C, -1);
	}), x(v);
	var w = I(v, 2), E = p(w), k = (e) => {
		let n = (e) => {
			var t = nn(), n = I(y(t), 2), i = T(n);
			D((e, t) => Q(i, `${e ?? ""} · ${t ?? ""}`), [() => O(r(d).seconds), () => W(r(d).date)]), R(e, t);
		};
		var i = s(), a = y(i), o = (e) => {
			var i = rn(), a = p(i);
			n(a), x(i), j("click", i, () => t.onopen({ key: r(d).key })), R(e, i);
		}, c = (e) => {
			var t = an(), r = p(t);
			n(r), x(t), R(e, t);
		};
		$(a, (e) => {
			r(d).key ? e(o) : e(c, -1);
		}), R(e, i);
	}, M = (e) => {
		var t = on();
		R(e, t);
	};
	$(E, (e) => {
		r(d) ? e(k) : e(M, -1);
	});
	var N = I(E, 2), P = I(p(N)), F = T(P);
	x(N);
	var ee = I(N, 2), z = I(p(ee)), B = T(z);
	x(ee), x(w);
	var V = I(w, 2);
	{
		let e = _(() => o(r(a)));
		Me(qt(V, { get groups() {
			return r(e);
		} }), (e) => u = e, () => u);
	}
	D((e) => {
		Q(F, `${e ?? ""} km`), Q(B, `${r(f) ?? ""} t`);
	}, [() => t.person.pbs.longest_session_km.toFixed(1)]), R(e, m), H();
}
l(["click"]);
// src/lib/ui/Shoes.svelte
var ln = Z("<span class=\"label svelte-eu7fja\"> </span>"), un = Z("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), dn = Z("<ul class=\"card svelte-eu7fja\"></ul>");
function fn(e, t) {
	G(t, !0);
	let n = _(() => t.shoes.map(g));
	var i = dn();
	Y(i, 23, () => r(n), (e, n) => t.shoes[n].id ?? t.shoes[n].entity_id, (e, t) => {
		var n = un(), i = p(n), a = p(i), o = T(a, !0), s = I(a), c = T(s, !0);
		x(i);
		var l = I(i, 2), u = p(l);
		let d;
		x(l);
		var f = I(l, 2), m = p(f), h = T(m, !0), g = I(m, 2), _ = (e) => {
			var n = ln(), i = T(n, !0);
			D(() => Q(i, r(t).label)), R(e, n);
		};
		$(g, (e) => {
			r(t).label && e(_);
		}), x(f), x(n), D(() => {
			J(n, 1, Ie(r(t).state), "svelte-eu7fja"), Q(o, r(t).name), Q(c, r(t).km), d = q(u, "", d, { width: `${r(t).frac * 100}%` }), Q(h, r(t).detail);
		}), R(e, n);
	}), x(i), R(e, i), H();
}
// src/lib/ui/ShoesDialog.svelte
var pn = Z("<span class=\"mini svelte-1bogt6u\">Current</span>"), mn = Z("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), hn = Z("<button type=\"button\" class=\"btn\">Set current</button>"), gn = Z("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), _n = Z("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), vn = Z("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe until you set one.</p>"), yn = Z("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), bn = Z("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), xn = Z("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), Sn = Z("<dialog class=\"svelte-1bogt6u\"><div class=\"grab svelte-1bogt6u\"><h2 class=\"svelte-1bogt6u\">Manage shoes</h2> <button type=\"button\" class=\"close press svelte-1bogt6u\" aria-label=\"Close\">✕</button></div> <div class=\"body svelte-1bogt6u\"><!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form></div></dialog>");
function Cn(e, t) {
	let n = d();
	G(t, !0);
	let o = _(() => t.shoes.map((e) => ({
		...g(e),
		id: e.id,
		limit: e.limit,
		current: !!e.current
	}))), s, c = U(""), l = U(Ze(700)), u = U(null), f = U(!1), m = U(null), h = !1;
	function v() {
		s.open || (h = document.documentElement.style.overflow !== "hidden", h && (document.documentElement.style.overflow = "hidden"), s.showModal());
	}
	function b() {
		h && (document.documentElement.style.overflow = ""), h = !1, a(m, null), a(u, null);
	}
	async function S(e) {
		a(f, !0);
		let t = await pt(e);
		return a(f, !1), t;
	}
	async function C(e) {
		e.preventDefault();
		let n = i(r(c), r(l));
		a(u, n.error ?? null, !0), !r(u) && await S({
			op: "add",
			person: t.person,
			...n
		}) && a(c, "");
	}
	async function w(e, t) {
		let n = i(void 0, e.currentTarget.value, { partial: !0 });
		a(u, n.error ?? null, !0), r(u) ? e.currentTarget.value = t.limit : n.replace_at_km !== t.limit && await S({
			op: "update",
			id: t.id,
			...n
		});
	}
	async function E(e) {
		a(m, null), await S({
			op: "retire",
			id: e.id
		});
	}
	var O = { open: v }, k = Sn(), A = p(k), M = p(A), N = I(M, 2);
	x(A);
	var P = I(A, 2), F = p(P), ee = (e) => {
		var n = yn(), i = y(n);
		Y(i, 21, () => r(o), (e) => e.id, (e, n) => {
			var i = _n(), o = p(i), s = p(o), c = p(s, !0), l = I(c), u = (e) => {
				var t = pn();
				R(e, t);
			};
			$(l, (e) => {
				r(n).current && e(u);
			}), x(s);
			var d = I(s, 2), h = T(d, !0);
			x(o);
			var g = I(o, 2), _ = p(g), v = I(p(_));
			Pe(v), Re(), x(_);
			var b = I(_, 2), C = (e) => {
				var t = mn(), i = y(t), o = T(i), s = I(i, 2), c = I(s, 2);
				D(() => {
					Q(o, `Retire ${r(n).name ?? ""}?`), c.disabled = r(f);
				}), j("click", s, () => a(m, null)), j("click", c, () => E(r(n))), R(e, t);
			}, O = (e) => {
				var i = gn(), o = y(i), s = (e) => {
					var i = hn();
					D(() => i.disabled = r(f)), j("click", i, () => S({
						op: "current",
						person: t.person,
						id: r(n).id
					})), R(e, i);
				};
				$(o, (e) => {
					r(n).current || e(s);
				});
				var c = I(o, 2);
				D(() => c.disabled = r(f)), j("click", c, () => a(m, r(n).id, !0)), R(e, i);
			};
			$(b, (e) => {
				r(m) === r(n).id ? e(C) : e(O, -1);
			}), x(g), x(i), D(() => {
				Q(c, r(n).name), Q(h, r(n).km), X(v, "min", ye.replace_at_km[0]), X(v, "max", ye.replace_at_km[1]), X(v, "step", ye.replace_at_km[2]), pe(v, r(n).limit), v.disabled = r(f);
			}), j("change", v, (e) => w(e, r(n))), R(e, i);
		}), x(i);
		var s = I(i, 2), c = (e) => {
			var t = vn();
			R(e, t);
		}, l = _(() => !r(o).some((e) => e.current));
		$(s, (e) => {
			r(l) && e(c);
		}), R(e, n);
	}, L = (e) => {
		var t = bn();
		R(e, t);
	};
	$(F, (e) => {
		r(o).length ? e(ee) : e(L, -1);
	});
	var z = I(F, 2), B = I(p(z), 2), V = I(p(B));
	Pe(V), x(B);
	var te = I(B, 2), W = I(p(te));
	Pe(W), x(te);
	var K = I(te, 2), ne = (e) => {
		var t = xn(), n = T(t, !0);
		D(() => Q(n, r(u))), R(e, t);
	};
	$(K, (e) => {
		r(u) && e(ne);
	});
	var re = I(K, 2);
	return x(z), x(P), x(k), Me(k, (e) => s = e, () => s), D(() => {
		X(k, "aria-labelledby", `${n}-t`), X(M, "id", `${n}-t`), X(V, "maxlength", ye.name[1]), V.disabled = r(f), X(W, "min", ye.replace_at_km[0]), X(W, "max", ye.replace_at_km[1]), X(W, "step", ye.replace_at_km[2]), W.disabled = r(f), re.disabled = r(f);
	}), j("click", k, (e) => e.target === s && s.close()), Ee("close", k, b), j("keydown", k, (e) => e.key === "Escape" && e.stopPropagation()), j("click", N, () => s.close()), Ee("submit", z, C), le(V, () => r(c), (e) => a(c, e)), le(W, () => r(l), (e) => a(l, e)), R(e, k), H(O);
}
l([
	"click",
	"keydown",
	"change"
]);
// src/lib/ui/WorkoutDialog.svelte
var wn = Z("<p class=\"msg\" role=\"status\"> </p>"), Tn = Z("<p class=\"msg\" role=\"status\">Loading…</p>"), En = Z("<span class=\"mini svelte-1uaoa1p\"> </span>"), Dn = Z("<span class=\"mini off svelte-1uaoa1p\"> </span>"), On = Z("<div><dt class=\"svelte-1uaoa1p\"> </dt><dd class=\"svelte-1uaoa1p\"> </dd></div>"), kn = Z("<option disabled=\"\"> </option>"), An = Z("<option> </option>"), jn = Z("<div class=\"shoe svelte-1uaoa1p\"><dt class=\"svelte-1uaoa1p\"><label>Shoe</label></dt><dd class=\"svelte-1uaoa1p\"><select class=\"svelte-1uaoa1p\"><!><!></select></dd></div>"), Mn = Z("<dl class=\"svelte-1uaoa1p\"><!> <!></dl>"), Nn = Z("<p class=\"caption note svelte-1uaoa1p\"> </p>"), Pn = Z("<div class=\"ph svelte-1uaoa1p\" aria-hidden=\"true\"></div>"), Fn = Z("<h3 class=\"svelte-1uaoa1p\"> </h3> <!>", 1), In = Z("<!> <!>", 1), Ln = Z("<li class=\"svelte-1uaoa1p\"><span class=\"zn svelte-1uaoa1p\"> <small class=\"svelte-1uaoa1p\"> </small></span> <span class=\"bar svelte-1uaoa1p\"><span class=\"svelte-1uaoa1p\"></span></span> <span class=\"num svelte-1uaoa1p\"> </span></li>"), Rn = Z("<h3 class=\"svelte-1uaoa1p\">Heart-rate zones</h3> <ul class=\"zones svelte-1uaoa1p\"></ul>", 1), zn = Z("<tr><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td></tr>"), Bn = Z("<h3 class=\"svelte-1uaoa1p\">Splits</h3> <table class=\"svelte-1uaoa1p\"><thead><tr><th class=\"svelte-1uaoa1p\">Km</th><th class=\"svelte-1uaoa1p\">Time</th><th class=\"svelte-1uaoa1p\"> </th><th class=\"svelte-1uaoa1p\">HR</th><th class=\"svelte-1uaoa1p\">Climb</th></tr></thead><tbody></tbody></table>", 1), Vn = Z("<span role=\"img\" aria-label=\"Record\">🏆</span>"), Hn = Z("<li class=\"svelte-1uaoa1p\"> <b class=\"svelte-1uaoa1p\"> </b><!></li>"), Un = Z("<h3 class=\"svelte-1uaoa1p\">Exercises</h3> <ul class=\"gym svelte-1uaoa1p\"><!> <li class=\"vol svelte-1uaoa1p\">Total volume · <b class=\"svelte-1uaoa1p\"> </b></li></ul>", 1), Wn = Z("<span class=\"ask svelte-1uaoa1p\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1uaoa1p\">Delete</button>", 1), Gn = Z("<button type=\"button\"> </button>"), Kn = Z("<div class=\"acts svelte-1uaoa1p\"><!></div>"), qn = Z("<p class=\"sub svelte-1uaoa1p\"> <!> <!></p> <!> <!> <!> <!> <!> <!> <!>", 1), Jn = Z("<dialog><div class=\"grab svelte-1uaoa1p\"><h2 class=\"svelte-1uaoa1p\"> </h2> <button type=\"button\" class=\"close press svelte-1uaoa1p\" aria-label=\"Close\">✕</button></div> <div class=\"body svelte-1uaoa1p\"><!></div></dialog>");
function Yn(t, n) {
	let i = d();
	G(n, !0);
	let o = e(n, "shoes", 3, null), c = () => import("./viz-DFLrl_Ws.js"), l, u, f = U(null), m = U(null), h = U(null), g = U(null), v = U(null), b = U(!1), S = U(0), C = null, w = U(!1), E = !1, O = 0, k = !1;
	async function A(e) {
		if (l.open) return;
		let t = ++O;
		a(f, e), a(m, a(h, a(v, null))), a(b, !1), E = document.documentElement.style.overflow !== "hidden", E && (document.documentElement.style.overflow = "hidden"), l.showModal(), u.scrollTop = 0;
		try {
			let i = await F(`workout?person=${encodeURIComponent(n.person)}&key=${encodeURIComponent(e.key)}`);
			if (t !== O) return;
			a(m, i), (i.route?.length || i.series) && !r(g) && c().then((e) => a(g, e), (e) => t === O && a(v, e));
		} catch (e) {
			t === O && a(h, e);
		}
	}
	function M() {
		E && (document.documentElement.style.overflow = ""), E = !1, a(S, 0), O++, a(f, a(m, null));
	}
	function N(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), C = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, a(w, !0));
	}
	function P(e) {
		C && (a(S, Math.max(0, e.clientY - C.start), !0), C.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), C.samples.length > 8 && C.samples.shift());
	}
	function ee(e) {
		if (!C) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = Ht([...C.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		C = null, a(w, !1), Vt(r(S), n, l.offsetHeight) ? l.close() : a(S, 0);
	}
	let L = _(() => r(f) && `${n.person}/${r(f).key}`), z = _(() => r(L) && $e[r(L)]), B = _(() => {
		if (!r(f)) return null;
		let e = n.feed.find((e) => e.key === r(f).key) ?? {
			...r(m)?.summary,
			...r(f),
			excluded: et[r(L)] ?? r(f).excluded ?? !1
		};
		return r(z) && r(z).want !== null ? {
			...e,
			excluded: r(z).want
		} : e;
	}), V = _(() => r(m) && r(B) ? xe(n.viewer, n.person, r(B)) : {
		remove: null,
		shoe: !1
	}), W = _(() => r(V).shoe && o() ? te(o(), n.runShoes?.[r(f).key]) : null), K = _(() => r(m) && Be(r(m).summary)), re = _(() => r(m) ? ce(r(m)).filter(([e]) => !(e === "Shoe" && r(W)?.options.length)) : []), ie = _(() => r(m) && je(r(m))), ae = _(() => r(m) && _e(r(m).zones, r(m).max_hr)), oe = _(() => r(m) ? Ue(r(m)) : []), le = _(() => r(m) && Ne(r(m).gym)), ue = _(() => me(r(v))), de = _(() => r(m) && De(r(m))), pe = (e) => e.status === 404 ? "Workout not found" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant";
	async function he(e) {
		let t = e.currentTarget;
		await mt(n.person, r(f).key, Number(t.value)) || (t.value = String(r(W).value));
	}
	let ge = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function ve() {
		r(V).remove === "delete" ? a(b, !0) : ut(n.person, r(f).key, r(V).remove);
	}
	var ye = { open: A }, be = Jn();
	let Se, Ce;
	var we = p(be), Te = p(we), ke = T(Te, !0), Pe = I(Te, 2);
	x(we);
	var Fe = I(we, 2), Ie = p(Fe), Le = (e) => {
		var t = wn(), n = T(t, !0);
		D((e) => Q(n, e), [() => pe(r(h))]), R(e, t);
	}, ze = (e) => {
		var t = Tn();
		R(e, t);
	}, Ve = (e) => {
		var t = qn(), o = y(t), c = p(o), u = I(c), d = (e) => {
			var t = En(), n = T(t, !0);
			D(() => Q(n, r(K).plan)), R(e, t);
		};
		$(u, (e) => {
			r(K).plan && e(d);
		});
		var h = I(u, 2), v = (e) => {
			var t = Dn(), n = T(t, !0);
			D((e) => Q(n, e), [() => Ge(r(B)).label]), R(e, t);
		}, S = _(() => r(B) && Ge(r(B)).label);
		$(h, (e) => {
			r(S) && e(v);
		}), x(o);
		var C = I(o, 2), w = (e) => {
			var t = Mn(), n = p(t);
			Y(n, 17, () => r(re), ([e, t]) => e, (e, t) => {
				var n = _(() => ne(r(t), 2));
				let i = () => r(n)[0], a = () => r(n)[1];
				var o = On(), s = p(o), c = T(s, !0), l = I(s), u = T(l, !0);
				x(o), D(() => {
					Q(c, i()), Q(u, a());
				}), R(e, o);
			});
			var a = I(n, 2), o = (e) => {
				var t = jn(), n = p(t), a = T(n), o = I(n), s = p(o), c = p(s), l = (e) => {
					var t = kn(), n = T(t, !0);
					t.value = t.__value = "", D(() => Q(n, r(W).extra)), R(e, t);
				};
				$(c, (e) => {
					r(W).extra && e(l);
				});
				var u = I(c);
				Y(u, 17, () => r(W).options, (e) => e.id, (e, t) => {
					var n = An(), i = T(n, !0), a = {};
					D(() => {
						Q(i, r(t).label), a !== (a = r(t).id) && (n.value = (n.__value = a) ?? "");
					}), R(e, n);
				}), x(s);
				var d;
				Oe(s), x(o), x(t), D(() => {
					X(a, "for", `${i}-shoe`), X(s, "id", `${i}-shoe`), d !== (d = r(W).value) && (s.value = (s.__value = d) ?? "", We(s, d));
				}), j("change", s, he), R(e, t);
			};
			$(a, (e) => {
				r(W)?.options.length && e(o);
			}), x(t), R(e, t);
		};
		$(C, (e) => {
			(r(re).length || r(W)?.options.length) && e(w);
		});
		var E = I(C, 2), O = (e) => {
			var t = Nn(), n = T(t, !0);
			D((e) => Q(n, e), [() => fe(r(m).note)]), R(e, t);
		}, k = _(() => fe(r(m).note));
		$(E, (e) => {
			r(k) && e(O);
		});
		var A = I(E, 2), M = (e) => {
			var t = s(), n = y(t), i = (e) => {
				var t = Nn(), n = T(t, !0);
				D(() => Q(n, r(ue).message)), R(e, t);
			}, a = (e) => {
				var t = Pn();
				let n;
				D(() => n = q(t, "", n, { height: `${r(m).route?.length ? 220 : 0}px` })), R(e, t);
			}, o = (e) => {
				var t = In(), n = y(t), i = (e) => {
					var t = s(), n = y(t);
					{
						let e = _(() => r(m).summary.kind === "run" || r(m).summary.kind === "walk" ? "run" : "gym");
						Ae(n, () => r(g).MapView, (t, n) => {
							n(t, {
								get route() {
									return r(m).route;
								},
								get kind() {
									return r(e);
								}
							});
						});
					}
					R(e, t);
				};
				$(n, (e) => {
					r(m).route?.length && e(i);
				});
				var a = I(n, 2);
				Y(a, 17, () => r(ie)?.list ?? [], (e) => e.label, (e, t) => {
					var n = Fn(), i = y(n), a = T(i, !0), o = I(i, 2);
					Ae(o, () => r(g).Chart, (e, n) => {
						n(e, {
							get x() {
								return r(ie).x;
							},
							get label() {
								return r(t).label;
							},
							get values() {
								return r(t).values;
							},
							get color() {
								return r(t).color;
							},
							get fmt() {
								return r(t).fmt;
							}
						});
					}), D(() => Q(a, r(t).label)), R(e, n);
				}), R(e, t);
			};
			$(n, (e) => {
				r(ue).map ? r(g) ? e(o, -1) : e(a, 1) : e(i);
			}), R(e, t);
		};
		$(A, (e) => {
			(r(m).route?.length || r(ie)?.list.length) && e(M);
		});
		var N = I(A, 2), P = (e) => {
			var t = Rn(), n = I(y(t), 2);
			Y(n, 21, () => r(ae), (e) => e.zone, (e, t) => {
				var n = Ln(), i = p(n), a = p(i), o = I(a), s = T(o, !0);
				x(i);
				var c = I(i, 2), l = p(c);
				let u;
				x(c);
				var d = I(c, 2), f = T(d);
				x(n), D(() => {
					Q(a, `${r(t).zone ?? ""} `), Q(s, r(t).bpm), u = q(l, "", u, { width: `${r(t).pct ?? ""}%` }), Q(f, `${r(t).time ?? ""} · ${r(t).pct ?? ""}%`);
				}), R(e, n);
			}), x(n), R(e, t);
		};
		$(N, (e) => {
			r(ae) && e(P);
		});
		var F = I(N, 2), ee = (e) => {
			var t = Bn(), n = I(y(t), 2), i = p(n), a = p(i), o = I(p(a), 2), s = T(o, !0);
			Re(2), x(a), x(i);
			var c = I(i);
			Y(c, 21, () => r(oe), se, (e, t) => {
				var n = zn(), i = p(n), a = T(i, !0), o = I(i), s = T(o, !0), c = I(o), l = T(c, !0), u = I(c), d = T(u, !0), f = I(u), m = T(f, !0);
				x(n), D(() => {
					Q(a, r(t).km), Q(s, r(t).time), Q(l, r(t).pace), Q(d, r(t).hr), Q(m, r(t).climb);
				}), R(e, n);
			}), x(c), x(n), D(() => Q(s, r(de) ? "km/h" : "Pace")), R(e, t);
		};
		$(F, (e) => {
			r(oe).length && e(ee);
		});
		var L = I(F, 2), H = (e) => {
			var t = Un(), n = I(y(t), 2), i = p(n);
			Y(i, 17, () => r(le).exercises, se, (e, t) => {
				var n = Hn(), i = p(n), a = I(i), o = T(a, !0), s = I(a), c = (e) => {
					var t = Vn();
					R(e, t);
				};
				$(s, (e) => {
					r(t).record && e(c);
				}), x(n), D(() => {
					Q(i, `${r(t).name ?? ""} · `), Q(o, r(t).set);
				}), R(e, n);
			});
			var a = I(i, 2), o = I(p(a)), s = T(o, !0);
			x(a), x(n), D(() => Q(s, r(le).volume)), R(e, t);
		};
		$(L, (e) => {
			r(le) && e(H);
		});
		var te = I(L, 2), U = (e) => {
			var t = Kn(), i = p(t), o = (e) => {
				var t = Wn(), i = I(y(t), 2), o = I(i, 2);
				j("click", i, () => a(b, !1)), j("click", o, () => (ut(n.person, r(f).key, "remove"), l.close())), R(e, t);
			}, s = (e) => {
				var t = Gn();
				let n;
				var i = T(t, !0);
				D(() => {
					n = J(t, 1, "btn svelte-1uaoa1p", null, n, { danger: r(V).remove !== "restore" }), Q(i, ge[r(V).remove]);
				}), j("click", t, ve), R(e, t);
			};
			$(i, (e) => {
				r(b) ? e(o) : e(s, -1);
			}), x(t), R(e, t);
		};
		$(te, (e) => {
			r(V).remove && r(z)?.want !== null && e(U);
		}), D(() => Q(c, `${r(K).date ?? ""} · ${r(K).time ?? ""} · ${r(K).duration ?? ""} `)), R(e, t);
	};
	return $(Ie, (e) => {
		r(h) ? e(Le) : r(m) ? e(Ve, -1) : e(ze, 1);
	}), x(Fe), Me(Fe, (e) => u = e, () => u), x(be), Me(be, (e) => l = e, () => l), D(() => {
		X(be, "aria-labelledby", `${i}-t`), Se = J(be, 1, "svelte-1uaoa1p", null, Se, { dragging: r(w) }), Ce = q(be, "", Ce, { transform: r(S) ? `translateY(${r(S)}px)` : null }), X(Te, "id", `${i}-t`), Q(ke, r(K)?.title ?? r(f)?.name ?? "Workout");
	}), j("pointerdown", be, (e) => k = e.target === l), j("click", be, (e) => e.target === l && k && l.close()), Ee("close", be, M), j("keydown", be, (e) => e.key === "Escape" && e.stopPropagation()), j("pointerdown", we, N), j("pointermove", we, P), j("pointerup", we, ee), Ee("pointercancel", we, ee), j("click", Pe, () => l.close()), R(t, be), H(ye);
}
l([
	"pointerdown",
	"click",
	"keydown",
	"pointermove",
	"pointerup",
	"change"
]);
// src/lib/ui/Details.svelte
var Xn = Z("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), Zn = Z("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), Qn = Z("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), $n = Z("<section><h2 class=\"svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), er = Z("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!> <!>", 1);
function tr(e, t) {
	let n = d();
	G(t, !0);
	let i = _(() => v(t.person.pbs)), o = _(() => V(t.person, t.canEdit)), s = U(void 0), c = U(void 0), l = (e) => r(c).open(e);
	var u = er(), f = y(u), m = (e) => {
		var r = Xn(), i = p(r);
		zt(I(i, 2), { get plan() {
			return t.person.plan;
		} }), x(r), D(() => {
			X(r, "aria-labelledby", `${n}-plan`), X(i, "id", `${n}-plan`);
		}), R(e, r);
	};
	$(f, (e) => {
		t.person.plan && e(m);
	});
	var h = I(f, 2), g = p(h), b = I(g, 2);
	Ke(b, () => t.id, (e) => {
		Pt(e, {
			get person() {
				return t.id;
			},
			get items() {
				return t.person.feed;
			},
			get records() {
				return r(i);
			},
			onopen: l
		});
	}), x(h);
	var S = I(h, 2), C = p(S), w = I(p(C)), E = T(w);
	x(C), bt(I(C, 2), { get badges() {
		return t.person.badges;
	} }), x(S);
	var O = I(S, 2), k = p(O);
	cn(I(k, 2), {
		get person() {
			return t.person;
		},
		onopen: l
	}), x(O);
	var A = I(O, 2);
	{
		let e = _(() => r(o) ? t.person.shoes : null);
		Me(Yn(A, {
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
				return r(e);
			},
			get runShoes() {
				return t.person.run_shoes;
			}
		}), (e) => a(c, e, !0), () => r(c));
	}
	var M = I(A, 2), N = (e) => {
		var i = $n(), c = y(i), l = p(c), u = I(p(l)), d = (e) => {
			var t = Zn();
			j("click", t, () => r(s).open()), R(e, t);
		};
		$(u, (e) => {
			r(o) && e(d);
		}), x(l);
		var f = I(l, 2), m = (e) => {
			fn(e, { get shoes() {
				return t.person.shoes;
			} });
		}, h = (e) => {
			var t = Qn();
			R(e, t);
		};
		$(f, (e) => {
			t.person.shoes.length ? e(m) : e(h, -1);
		}), x(c);
		var g = I(c, 2), _ = (e) => {
			Me(Cn(e, {
				get person() {
					return t.id;
				},
				get shoes() {
					return t.person.shoes;
				}
			}), (e) => a(s, e, !0), () => r(s));
		};
		$(g, (e) => {
			r(o) && e(_);
		}), D(() => {
			X(c, "aria-labelledby", `${n}-shoes`), X(l, "id", `${n}-shoes`);
		}), R(e, i);
	};
	$(M, (e) => {
		(t.person.shoes?.length || r(o)) && e(N);
	}), D(() => {
		X(h, "aria-labelledby", `${n}-feed`), X(g, "id", `${n}-feed`), X(S, "aria-labelledby", `${n}-badges`), X(C, "id", `${n}-badges`), Q(E, `${t.person.badges.count ?? ""} unlocked`), X(O, "aria-labelledby", `${n}-pbs`), X(k, "id", `${n}-pbs`);
	}), R(e, u), H();
}
l(["click"]);
// src/lib/ui/Goals.svelte
var nr = Z("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), rr = Z("<p class=\"msg\" role=\"status\"> </p>"), ir = Z("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!> <label class=\"year svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Birth year</span> <input type=\"number\" inputmode=\"numeric\" min=\"1900\" placeholder=\"1990\" class=\"svelte-7wncvy\"/></label> <p class=\"caption maxhr svelte-7wncvy\"> </p></section>"), ar = Z("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), or = Z("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), sr = Z("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), cr = Z("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function lr(e, t) {
	let n = d();
	G(t, !0);
	let i = [], o = (e, n = ie, i = ie, a = ie) => {
		let o = _(() => {
			let [e, t, n] = Fe[i()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var s = nr(), c = p(s), l = T(c, !0), u = I(c, 2), d = I(u, 2), f = T(d, !0), m = I(d, 2);
		x(s), D((e, c, d, p) => {
			X(s, "aria-label", a()), Q(l, e), X(u, "aria-label", `Fewer ${c ?? ""}`), u.disabled = t.readOnly || n()[i()] <= r(o).lo, Q(f, d), X(m, "aria-label", `More ${p ?? ""}`), m.disabled = t.readOnly || n()[i()] >= r(o).hi;
		}, [
			() => a().split(",")[0],
			() => v(a()),
			() => b(i(), n()[i()]),
			() => v(a())
		]), j("click", u, () => n()[i()] = ve(i(), n()[i()] - r(o).step)), j("click", m, () => n()[i()] = ve(i(), n()[i()] + r(o).step)), R(e, s);
	}, s = U(null), c = U(null), l = U(null), u = U(!1);
	P(() => {
		F("settings").then((e) => {
			a(s, e, !0), a(l, Je(e, t.people), !0);
		}, (e) => a(c, e, !0));
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
	], g = {
		together: "Workouts together per week",
		team: "Team points per week"
	}, v = (e) => e[0].toLowerCase() + e.slice(1), b = (e, t) => e === "steps" ? t.toLocaleString("en-US") : String(t);
	async function S() {
		a(u, !0);
		let e = await lt(h(r(l)), t.people);
		a(u, !1), e && t.onsaved();
	}
	var C = cr(), w = I(y(C), 2), E = (e) => {
		var t = rr(), n = T(t, !0);
		D(() => Q(n, r(c) ? r(c).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), R(e, t);
	}, O = (e) => {
		var a = sr(), c = y(a), d = T(c), h = I(c, 2);
		Y(h, 16, () => Object.keys(r(l).people), (e) => e, (e, i) => {
			let a = _(() => t.people[i]?.name ?? i);
			var s = ir(), c = p(s), u = T(c, !0), d = I(c, 2);
			Y(d, 16, () => ke, (e) => e, (e, t) => {
				o(e, () => r(l).people[i], () => t, () => `${f[t]}, ${r(a)}`);
			});
			var m = I(d, 2), h = I(p(m), 2);
			Pe(h), x(m);
			var g = I(m, 2), v = T(g, !0);
			x(s), D((e, o) => {
				X(s, "aria-labelledby", `${n}-${i ?? ""}`), X(c, "id", `${n}-${i ?? ""}`), Q(u, r(a)), X(h, "max", e), h.disabled = t.readOnly, Q(v, o);
			}, [() => (/* @__PURE__ */ new Date()).getFullYear(), () => Te(t.people[i]?.max_hr)]), le(h, () => r(l).profiles[i].birth_year, (e) => r(l).profiles[i].birth_year = e), R(e, s);
		});
		var v = I(h, 2), b = p(v), C = I(b, 2);
		Y(C, 21, () => m, (e) => e.mode, (e, a) => {
			var o = ar();
			let s;
			var c = p(o);
			Pe(c);
			var u, d = I(c, 1, !0);
			x(o), D(() => {
				s = J(o, 1, "svelte-7wncvy", null, s, { on: r(l).couple.mode === r(a).mode }), X(c, "name", `${n}-mode`), c.disabled = t.readOnly, u !== (u = r(a).mode) && (c.value = (c.__value = u) ?? ""), Q(d, r(a).label);
			}), Se(i, [], c, () => (r(a).mode, r(l).couple.mode), (e) => r(l).couple.mode = e), R(e, o);
		}), x(C);
		var w = I(C, 2), E = T(w, !0), O = I(w, 2), k = (e) => {
			o(e, () => r(l).couple, () => r(l).couple.mode, () => g[r(l).couple.mode]);
		};
		$(O, (e) => {
			g[r(l).couple.mode] && e(k);
		});
		var A = I(O, 2), M = I(p(A), 2);
		Pe(M), x(A), x(v);
		var N = I(v, 2), P = (e) => {
			var t = or();
			D(() => t.disabled = r(u)), j("click", t, S), R(e, t);
		};
		$(N, (e) => {
			t.readOnly || e(P);
		}), D((e, r) => {
			Q(d, `Applies from this week (week ${e ?? ""})`), X(v, "aria-labelledby", `${n}-couple`), X(b, "id", `${n}-couple`), X(C, "aria-labelledby", `${n}-couple`), Q(E, r), M.disabled = t.readOnly;
		}, [() => qe(r(s).week_start), () => m.find((e) => e.mode === r(l).couple.mode).hint]), le(M, () => r(l).couple.reward, (e) => r(l).couple.reward = e), R(e, a);
	};
	$(w, (e) => {
		r(l) ? e(O, -1) : e(E);
	}), R(e, C), H();
}
l(["click"]);
// src/lib/ui/Header.svelte
var ur = Z("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), dr = Z("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), fr = Z("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function pr(t, n) {
	let i = e(n, "subtitle", 3, ""), o = e(n, "actionLabel", 3, ""), s = U(0);
	var c = fr();
	let l;
	var u = p(c), d = p(u), f = (e) => {
		var t = ur();
		j("click", t, function(...e) {
			n.onback?.apply(this, e);
		}), R(e, t);
	};
	$(d, (e) => {
		n.onback && e(f);
	});
	var m = I(d, 2), h = p(m), g = T(h, !0), _ = I(h, 2), v = (e) => {
		var t = dr(), r = T(t, !0);
		D(() => Q(r, o())), j("click", t, function(...e) {
			n.onaction?.apply(this, e);
		}), R(e, t);
	};
	$(_, (e) => {
		n.onaction && e(v);
	}), x(m);
	var y = I(m, 2), b = T(y, !0);
	x(u), x(c), D(() => {
		l = J(c, 1, "svelte-16l0jix", null, l, { scrolled: r(s) > 0 }), Q(g, n.title), Q(b, i() || "\xA0");
	}), He("y", () => r(s), (e) => a(s, e, !0)), R(t, c);
}
l(["click"]);
// src/lib/motion.js
function mr(e, { onFrame: t, onSettle: n, snap: r = {
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
var hr = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), gr = (e) => hr(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function _r({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var vr = B("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), yr = B("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function br(t, n) {
	G(n, !0);
	let i = e(n, "size", 3, 88), o = [
		"run",
		"gym",
		"bonus"
	], s = 1e3, c = U(Ze(Ve.reducedMotion ? s : 0)), l = _(() => i() * .11), u = _(() => n.fractions.map((e, t) => {
		let n = i() / 2 - r(l) / 2 - t * r(l) * 1.3, a = 2 * Math.PI * n;
		return {
			kind: o[t],
			r: n,
			c: a,
			len: a * e * r(c) / s
		};
	}));
	P(() => {
		if (r(c) === s) return;
		let e = mr(_r({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => a(c, e, !0) });
		return e.to(s), e.stop;
	});
	var d = yr();
	let f;
	Y(d, 21, () => r(u), (e) => e.kind, (e, t) => {
		var n = vr(), a = y(n);
		let o;
		var s = I(a);
		let c;
		D(() => {
			X(a, "cx", i() / 2), X(a, "cy", i() / 2), X(a, "r", r(t).r), X(a, "stroke-width", r(l)), o = q(a, "", o, { stroke: `var(--${r(t).kind ?? ""})` }), X(s, "cx", i() / 2), X(s, "cy", i() / 2), X(s, "r", r(t).r), X(s, "stroke-width", r(l)), X(s, "stroke-dasharray", `${r(t).len ?? ""} ${r(t).c ?? ""}`), X(s, "opacity", +(r(t).len > .01)), X(s, "transform", `rotate(-90 ${i() / 2} ${i() / 2})`), c = q(s, "", c, { stroke: `var(--${r(t).kind ?? ""})` });
		}), R(e, n);
	}), x(d), D(() => {
		X(d, "viewBox", `0 0 ${i() ?? ""} ${i() ?? ""}`), f = q(d, "", f, { width: `${i() / 16}rem` });
	}), R(t, d), H();
}
// src/lib/ui/PersonTile.svelte
var xr = Z("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Sr = Z("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), Cr = Z("<span class=\"streak svelte-1handop\"> </span>"), wr = Z("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), Tr = Z("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Er = Z("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), Dr = Z("<span class=\"steps svelte-1handop\"> </span>"), Or = Z("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), kr = Z("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), Ar = Z("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function jr(t, n) {
	G(n, !0);
	let i = e(n, "index", 3, 0), a = e(n, "compact", 3, !1), o = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], s = _(() => o[i() % o.length]), c = _(() => ne(r(s), 2)), l = _(() => r(c)[0]), d = _(() => r(c)[1]), f = _(() => u(n.person)), m = _(() => n.person.week), h = [
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
	], g = _(() => h.map((e, t) => ({
		...e,
		n: oe(r(m))[t],
		of: Ye(r(m))[t]
	}))), v = _(() => S(n.person.steps_today, r(m).goal.steps)), b = _(() => [
		`Level ${r(f).level}`,
		a() ? `🔥 ${n.person.streak} wk` : `${n.person.xp.toLocaleString()} XP`,
		r(m).paused && "Week paused",
		r(m).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), C = _(() => `${n.person.name}, level ${r(f).level}. This week ${r(g).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${r(m).goal_pending ? "New goals pending. " : ""}${r(m).bonus ? "Weekly bonus earned. " : ""}${r(v) ? r(v).replace("👟 ", "") + ". " : ""}Streak ${n.person.streak} weeks.`);
	var w = Ar();
	let E;
	var O = p(w), k = p(O), A = p(k);
	let M;
	var N = T(A, !0), P = I(A, 2), F = p(P), L = T(F, !0), z = I(F, 2), B = T(z, !0);
	x(P);
	var V = I(P, 2), te = (e) => {
		var t = Sr(), n = y(t), i = p(n);
		{
			let e = _(() => ee(r(m)));
			br(i, {
				get fractions() {
					return r(e);
				},
				size: 44
			});
		}
		var a = I(i, 2), o = (e) => {
			var t = xr();
			R(e, t);
		};
		$(a, (e) => {
			r(m).bonus && e(o);
		}), x(n);
		var s = I(n, 2), c = T(s, !0);
		D(() => Q(c, r(C))), R(e, t);
	}, U = (e) => {
		var t = Cr(), r = T(t);
		D(() => Q(r, `🔥 ${n.person.streak ?? ""} wk`)), R(e, t);
	};
	$(V, (e) => {
		a() ? e(te) : e(U, -1);
	});
	var W = I(V, 2), K = (e) => {
		var t = wr();
		R(e, t);
	};
	$(W, (e) => {
		n.onopen && e(K);
	}), x(k);
	var re = I(k, 2), ie = (e) => {
		var t = Or(), n = y(t), i = p(n), a = p(i);
		{
			let e = _(() => ee(r(m))), t = _(() => Ve.wide ? 112 : 88);
			br(a, {
				get fractions() {
					return r(e);
				},
				get size() {
					return r(t);
				}
			});
		}
		var o = I(a, 2), s = (e) => {
			var t = Tr();
			R(e, t);
		};
		$(o, (e) => {
			r(m).bonus && e(s);
		}), x(i);
		var c = I(i, 2);
		Y(c, 21, () => r(g), (e) => e.kind, (e, t) => {
			var n = Er(), i = p(n), a = p(i);
			let o;
			var s = I(a, 1, !0);
			x(i);
			var c = I(i, 2), l = p(c, !0), u = I(l), d = T(u);
			x(c), x(n), D(() => {
				o = q(a, "", o, { background: `var(--${r(t).kind ?? ""})` }), Q(s, r(t).label), Q(l, r(t).n), Q(d, `/${r(t).of ?? ""}`);
			}), R(e, n);
		}), x(c), x(n);
		var l = I(n, 2), u = (e) => {
			var t = Dr(), n = T(t, !0);
			D(() => Q(n, r(v))), R(e, t);
		};
		$(l, (e) => {
			r(v) && e(u);
		});
		var d = I(l, 2), h = p(d), b = p(h);
		let S;
		x(h);
		var C = I(h, 2), w = T(C);
		x(d), D((e, t) => {
			S = q(b, "", S, { width: `${r(f).frac * 100}%` }), Q(w, `${e ?? ""} of ${t ?? ""} XP to level ${r(f).level + 1}`);
		}, [() => r(f).into.toLocaleString(), () => r(f).span.toLocaleString()]), R(e, t);
	};
	$(re, (e) => {
		a() || e(ie);
	}), x(O);
	var ae = I(O, 2), se = (e) => {
		var t = kr();
		D(() => X(t, "aria-label", r(C))), j("click", t, function(...e) {
			n.onopen?.apply(this, e);
		}), R(e, t);
	};
	$(ae, (e) => {
		n.onopen && e(se);
	}), x(w), D((e) => {
		E = J(w, 1, "tile glass svelte-1handop", null, E, {
			compact: a(),
			opens: n.onopen
		}), X(O, "aria-hidden", n.onopen ? "true" : void 0), M = q(A, "", M, {
			"--a1": r(l),
			"--a2": r(d)
		}), Q(N, e), Q(L, n.person.name), Q(B, r(b));
	}, [() => n.person.name.slice(0, 1)]), R(t, w), H();
}
l(["click"]);
// src/lib/ui/Sheet.svelte
var Mr = Z("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), Nr = Z("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function Pr(t, n) {
	G(n, !0);
	let i = e(n, "from", 3, null), o = 1e3, s = Ve.reducedMotion, c = U(Ze(s ? o : 0)), l = U(0), u = U(1), d = U(!1), f = U("50% 100%"), m, h, g = !1, v = null, b = _(() => s ? +r(d) : Math.min(1, r(c) / 500)), S = _(() => s ? 1 : .5 + .5 * r(c) / o), C = () => {
		g && (r(c) === 0 || r(l) >= r(u)) && (g = !1, n.onclose());
	};
	function w(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = _r({
					value: r,
					damping: o,
					response: s
				}), n = mr(t, {
					onFrame: e,
					onSettle: C
				}), n.to(i, a);
			}
		};
	}
	let T = w((e) => a(c, e, !0)), E = w((e) => a(l, e, !0));
	function O() {
		g || v || (g = !0, s ? (a(d, !1), setTimeout(n.onclose, gr("--fade"))) : T.to(r(c), 0, { response: .3 }));
	}
	function k(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), T.stop(), E.stop(), g = !1, v = {
			from: r(l),
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		});
	}
	function A(e) {
		if (!v) return;
		let t = v.from + e.clientY - v.start;
		a(l, t < 0 ? -Ut(-t, r(u)) : t, !0), v.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), v.samples.length > 8 && v.samples.shift();
	}
	function M(e) {
		if (!v) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = Ht([...v.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		v = null, Vt(r(l), n, r(u)) ? s ? O() : (g = !0, E.to(r(l), r(u), {
			velocity: n,
			response: .3
		})) : s ? a(l, 0) : (E.to(r(l), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), r(c) < o && T.to(r(c), o));
	}
	P(() => {
		if (i()) {
			let e = i().getBoundingClientRect();
			a(f, `${e.left + e.width / 2 - m.offsetLeft}px ${e.top + e.height / 2 - m.offsetTop}px`);
		}
		h.focus({ preventScroll: !0 });
		let e = document.documentElement;
		return e.style.overflow = "hidden", s ? requestAnimationFrame(() => a(d, !0)) : T.to(0, o), () => {
			T.stop(), E.stop(), e.style.overflow = "";
		};
	});
	var F = { close: O }, ee = Nr();
	Ee("keydown", N, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && O());
	var L = y(ee);
	let z, B;
	var V = I(L, 2);
	let te, W;
	var K = p(V), ne = I(p(K), 2), re = p(ne), ie = (e) => {
		var t = Mr();
		j("click", t, function(...e) {
			n.onback?.apply(this, e);
		}), R(e, t);
	};
	$(re, (e) => {
		n.onback && e(ie);
	});
	var ae = I(re, 2);
	Me(ae, (e) => h = e, () => h), x(ne), x(K);
	var oe = I(K, 2), se = p(oe);
	return be(se, () => n.children), x(oe), x(V), Me(V, (e) => m = e, () => m), D((e) => {
		z = J(L, 1, "scrim svelte-185xwm9", null, z, { fade: s }), B = q(L, "", B, { opacity: e }), te = J(V, 1, "sheet svelte-185xwm9", null, te, { fade: s }), X(V, "aria-label", n.label), W = q(V, "", W, {
			opacity: r(b),
			transform: `translate3d(0, ${r(l) ?? ""}px, 0) scale(${r(S) ?? ""})`,
			"transform-origin": r(f)
		});
	}, [() => r(b) * Math.min(1, Math.max(0, 1 - r(l) / r(u)))]), j("click", L, O), j("pointerdown", K, k), j("pointermove", K, A), j("pointerup", K, M), Ee("pointercancel", K, M), j("click", ae, O), ze(V, "offsetHeight", (e) => a(u, e)), R(t, ee), H(F);
}
l([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var Fr = Z("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), Ir = Z("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), Lr = Z("<p class=\"caption stale svelte-9nj5u4\"> </p>"), Rr = Z("<!> <!> <!>", 1);
function zr(e, t) {
	G(t, !0);
	let n = _(() => t.scoredAt ? m(t.scoredAt, t.now) : null);
	var i = Rr(), a = y(i), o = (e) => {
		var n = Fr(), r = I(p(n));
		x(n), D(() => Q(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), R(e, n);
	};
	$(a, (e) => {
		t.configError && e(o);
	});
	var s = I(a, 2), c = (e) => {
		var n = Ir(), r = I(p(n));
		x(n), D(() => Q(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), R(e, n);
	};
	$(s, (e) => {
		t.settingsError && e(c);
	});
	var l = I(s, 2), u = (e) => {
		var t = Lr(), i = T(t, !0);
		D(() => Q(i, r(n))), R(e, t);
	};
	$(l, (e) => {
		r(n) && e(u);
	}), R(e, i), H();
}
// node_modules/svelte/src/internal/flags/legacy.js
C();
// src/lib/ui/Toast.svelte
var Br = Z("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), Vr = Z("<span> </span> <!>", 1), Hr = Z("<div role=\"status\" aria-live=\"polite\"><!></div>");
function Ur(e, t) {
	G(t, !1);
	function n() {
		let e = tt.undo;
		Object.assign(tt, {
			on: !1,
			undo: null
		}), e();
	}
	ge();
	var r = Hr();
	let i;
	var a = p(r), o = (e) => {
		var t = Vr(), r = y(t), i = T(r, !0), a = I(r, 2), o = (e) => {
			var t = Br();
			j("click", t, n), R(e, t);
		};
		$(a, (e) => {
			tt.undo && e(o);
		}), D(() => Q(i, tt.text)), R(e, t);
	};
	$(a, (e) => {
		tt.on && e(o);
	}), x(r), D(() => i = J(r, 1, "toast svelte-1fk2ial", null, i, { on: tt.on })), R(e, r), H();
}
l(["click"]);
// src/lib/ui/Together.svelte
var Wr = Z("<p class=\"progress svelte-1tya3no\"> </p>"), Gr = Z("<p> </p>"), Kr = Z("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), qr = Z("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function Jr(e, t) {
	G(t, !0);
	let n = _(() => t.group.week ? b(t.group.week, t.people) : ""), i = _(() => t.group.week ? w(t.group.week) : null), a = _(() => [
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
	var o = qr(), s = I(p(o), 2), c = (e) => {
		var t = Wr(), i = T(t, !0);
		D(() => Q(i, r(n))), R(e, t);
	};
	$(s, (e) => {
		r(n) && e(c);
	});
	var l = I(s, 2), u = (e) => {
		var n = Gr();
		let a;
		var o = T(n, !0);
		D(() => {
			a = J(n, 1, "reward svelte-1tya3no", null, a, { met: t.group.week.met }), Q(o, r(i));
		}), R(e, n);
	};
	$(l, (e) => {
		r(i) && e(u);
	});
	var d = I(l, 2);
	Y(d, 21, () => r(a), (e) => e.k, (e, t) => {
		var n = Kr(), i = p(n), a = T(i, !0), o = I(i), s = p(o, !0), c = I(s), l = T(c, !0);
		x(o), x(n), D(() => {
			Q(a, r(t).k), Q(s, r(t).v), Q(l, r(t).unit);
		}), R(e, n);
	}), x(d), x(o), R(e, o), H();
}
// src/App.svelte
var Yr = Z("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), Xr = Z("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), Zr = Z("<div class=\"tiles compact svelte-1n46o8q\"></div>"), Qr = Z("<!> <!>", 1), $r = Z("<div class=\"tiles svelte-1n46o8q\"></div>"), ei = Z("<!> <!> <!> <!>", 1), ti = Z("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function ni(e, t) {
	G(t, !0);
	let n = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), i = new URLSearchParams(n.location.search), o = i.get("person"), s = /^\/(?!\/)/.test(i.get("back") ?? "") ? i.get("back") : null, c = s && (() => {
		n.history.pushState(null, "", s), n.dispatchEvent(new Event("location-changed"));
	}), l = U(null), u = (e) => (t) => a(l, {
		id: e,
		from: t.currentTarget
	}, !0), d = U(null), f = U(void 0);
	async function m() {
		let e = r(l)?.from ?? r(d)?.from;
		a(l, a(d, null), !0), await we(), e?.focus({ preventScroll: !0 });
	}
	let h = U(null), g = U(null), v = U(Ze(/* @__PURE__ */ new Date())), b;
	async function S() {
		if (clearTimeout(b), !document.hidden) {
			try {
				a(h, await F("scores"), !0), a(g, null), ct(r(h).people), o && Object.hasOwn(r(h).people, o) && o !== z(r(h).viewer, r(h).people).self && a(l, {
					id: o,
					from: null
				}, !0), o = null;
			} catch (e) {
				a(g, e, !0);
			}
			a(v, /* @__PURE__ */ new Date(), !0), clearTimeout(b), b = setTimeout(S, r(h) ? 6e4 : 3e4);
		}
	}
	k(() => {
		S();
		let e = () => document.hidden || S();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(b), document.removeEventListener("visibilitychange", e);
		};
	}), k(() => {
		rt.n && S();
	});
	let C = _(() => ae(r(h)?.people ?? {}, nt.entry)), w = _(() => Object.keys(r(C))), E = _(() => z(r(h)?.viewer ?? {}, r(C))), O = _(() => r(C)[r(E).self ?? r(w)[0]]?.week), A = (e) => !!r(h)?.viewer?.can_edit?.includes(e), j = _(() => !!r(l) && Object.hasOwn(r(C), r(l).id) || !!r(d) && !!r(h));
	var M = ti(), N = y(M), P = p(N);
	{
		let e = _(() => r(O) ? K(r(O)) : ""), t = _(() => r(h) ? (e) => a(d, { from: e.currentTarget }, !0) : void 0);
		pr(P, {
			title: "Training",
			get subtitle() {
				return r(e);
			},
			get onback() {
				return c;
			},
			actionLabel: "Goals",
			get onaction() {
				return r(t);
			}
		});
	}
	var ee = I(P, 2), L = p(ee), B = (e) => {
		var t = Xr(), n = I(y(t), 2), i = (e) => {
			var t = Yr(), n = T(t, !0);
			D(() => Q(n, r(g).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), R(e, t);
		};
		$(n, (e) => {
			r(g) && e(i);
		}), R(e, t);
	}, V = (e) => {
		var t = ei(), n = y(t);
		zr(n, {
			get scoredAt() {
				return r(h).scored_at;
			},
			get configError() {
				return r(h).config_error;
			},
			get settingsError() {
				return r(h).settings_error;
			},
			get now() {
				return r(v);
			}
		});
		var i = I(n, 2), a = (e) => {
			var t = Qr(), n = y(t), i = (e) => {
				var t = Zr();
				Y(t, 20, () => r(E).others, (e) => e, (e, t) => {
					{
						let n = _(() => r(w).indexOf(t)), i = _(() => u(t));
						jr(e, {
							get person() {
								return r(C)[t];
							},
							get index() {
								return r(n);
							},
							compact: !0,
							get onopen() {
								return r(i);
							}
						});
					}
				}), x(t), R(e, t);
			};
			$(n, (e) => {
				r(E).others.length && e(i);
			});
			var a = I(n, 2);
			{
				let e = _(() => r(w).indexOf(r(E).self));
				jr(a, {
					get person() {
						return r(C)[r(E).self];
					},
					get index() {
						return r(e);
					}
				});
			}
			R(e, t);
		}, o = (e) => {
			var t = $r();
			Y(t, 20, () => r(E).others, (e) => e, (e, t) => {
				{
					let n = _(() => r(w).indexOf(t)), i = _(() => u(t));
					jr(e, {
						get person() {
							return r(C)[t];
						},
						get index() {
							return r(n);
						},
						get onopen() {
							return r(i);
						}
					});
				}
			}), x(t), R(e, t);
		};
		$(i, (e) => {
			r(E).self ? e(a) : e(o, -1);
		});
		var s = I(i, 2), c = (e) => {
			Jr(e, {
				get group() {
					return r(h).group;
				},
				get people() {
					return r(C);
				}
			});
		};
		$(s, (e) => {
			r(h).group && e(c);
		});
		var l = I(s, 2), d = (e) => {
			{
				let t = _(() => A(r(E).self));
				tr(e, {
					get id() {
						return r(E).self;
					},
					get person() {
						return r(C)[r(E).self];
					},
					get canEdit() {
						return r(t);
					},
					get viewer() {
						return r(h).viewer;
					}
				});
			}
		};
		$(l, (e) => {
			r(E).self && e(d);
		}), R(e, t);
	};
	$(L, (e) => {
		r(h) ? e(V, -1) : e(B);
	}), x(ee), x(N);
	var te = I(N, 2), W = (e) => {
		Me(Pr(e, {
			label: "Goals",
			get from() {
				return r(d).from;
			},
			onclose: m,
			get onback() {
				return c;
			},
			children: (e, t) => {
				{
					let t = _(() => !r(E).self);
					lr(e, {
						get people() {
							return r(h).people;
						},
						get readOnly() {
							return r(t);
						},
						onsaved: () => r(f)?.close()
					});
				}
			},
			$$slots: { default: !0 }
		}), (e) => a(f, e, !0), () => r(f));
	}, ne = (e) => {
		Pr(e, {
			get label() {
				return `${r(C)[r(l).id].name ?? ""}'s details`;
			},
			get from() {
				return r(l).from;
			},
			onclose: m,
			get onback() {
				return c;
			},
			children: (e, t) => {
				var n = Qr(), i = y(n);
				{
					let e = _(() => r(w).indexOf(r(l).id));
					jr(i, {
						get person() {
							return r(C)[r(l).id];
						},
						get index() {
							return r(e);
						}
					});
				}
				var a = I(i, 2);
				{
					let e = _(() => A(r(l).id));
					tr(a, {
						get id() {
							return r(l).id;
						},
						get person() {
							return r(C)[r(l).id];
						},
						get canEdit() {
							return r(e);
						},
						get viewer() {
							return r(h).viewer;
						}
					});
				}
				R(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	$(te, (e) => {
		r(d) && r(h) ? e(W) : r(j) && e(ne, 1);
	}), Ur(I(te, 2), {}), D(() => N.inert = r(j)), R(e, M), H();
}
// src/main.js
var ri = (e) => de(ni, { target: e }), ii = () => new Promise((e) => {
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
		document.documentElement.dataset.theme = t ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", ii().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", ri(e);
		}));
	}
});
