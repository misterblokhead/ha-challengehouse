import { $ as e, $t as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Gt as h, H as g, Ht as _, I as v, It as y, J as b, Jt as x, K as S, Kt as C, L as w, Lt as T, M as E, Mt as D, N as O, Nt as k, O as A, Ot as j, P as M, Pt as N, Q as P, Qt as F, R as I, Rt as L, S as R, St as z, T as B, Tt as ee, U as V, Ut as H, V as te, Vt as U, W as ne, Wt as W, X as G, Xt as re, Y as ie, Yt as ae, Z as oe, _ as se, _t as ce, a as le, at as ue, b as de, bt as fe, c as pe, ct as me, d as he, dt as K, en as ge, et as _e, f as ve, ft as q, g as ye, gt as J, h as be, ht as xe, i as Se, it as Ce, j as we, jt as Te, k as Ee, kt as De, l as Oe, lt as ke, m as Ae, mt as je, n as Me, nt as Y, o as Ne, ot as Pe, p as Fe, pt as Ie, q as Le, qt as Re, rt as ze, s as Be, st as X, t as Ve, tt as He, u as Ue, ut as We, v as Ge, vt as Ke, w as qe, wt as Z, x as Je, xt as Q, y as Ye, yt as $, z as Xe, zt as Ze } from "./shared-qkz01SXG.js";
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
	nt.entry && de(nt, e, t) && (nt.entry = null);
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
	W(t, !0);
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
		J(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = ht(), a = p(n), o = T(a, !0), s = L(a, 2), c = T(s, !0), l = L(s, 2), u = T(l, !0);
			x(n), D((e, n) => {
				Q(o, e), Q(c, r(t).title), Q(u, n);
			}, [() => i(r(t)), () => ne(r(t).unlocked_at)]), z(e, n);
		}), x(n), z(e, n);
	};
	$(s, (e) => {
		t.badges.recent.length && e(c);
	});
	var l = L(s, 2), u = (e) => {
		var n = gt();
		J(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = _t(), o = p(n), s = T(o, !0), c = L(o, 2), l = T(c, !0), u = L(c, 2), d = T(u), f = L(u, 2), m = p(f);
			let h;
			x(f), x(n), D((e, n, i, a) => {
				Q(s, e), Q(l, r(t).title), Q(d, `${n ?? ""} of ${i ?? ""}`), h = K(m, "", h, { width: a });
			}, [
				() => i(r(t)),
				() => a(r(t).current),
				() => a(r(t).target),
				() => `${Math.min(1, r(t).current / r(t).target) * 100}%`
			]), z(e, n);
		}), x(n), z(e, n);
	};
	$(l, (e) => {
		t.badges.next.length && e(u);
	});
	var d = L(l, 2), f = (e) => {
		var t = vt();
		z(e, t);
	};
	$(d, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(f);
	}), x(o), z(e, o), H();
}
// src/lib/ui/FeedRow.svelte
var xt = Z("<span class=\"mini svelte-69s4be\"> </span>"), St = Z("<span class=\"mini svelte-69s4be\">Together</span>"), Ct = Z("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), wt = Z("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), Tt = Z("<span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span>", 1), Et = Z("<button type=\"button\" class=\"head svelte-69s4be\"><!></button>"), Dt = Z("<div class=\"head svelte-69s4be\"><!></div>"), Ot = Z("<li><!></li>");
function kt(e, t) {
	W(t, !0);
	let n = (e) => {
		var n = Tt(), s = y(n), c = T(s, !0), l = L(s, 2), u = p(l), d = p(u), f = L(d), m = (e) => {
			var n = xt(), r = T(n, !0);
			D(() => Q(r, t.item.plan)), z(e, n);
		};
		$(f, (e) => {
			t.item.plan && e(m);
		});
		var h = L(f, 2), g = (e) => {
			var t = St();
			z(e, t);
		};
		$(h, (e) => {
			t.item.joint && e(g);
		});
		var _ = L(h, 2), v = (e) => {
			var t = Ct();
			z(e, t);
		};
		$(_, (e) => {
			t.record && e(v);
		}), x(u);
		var b = L(u, 2), S = T(b);
		x(l);
		var C = L(l, 2), w = p(C), E = (e) => {
			var t = wt();
			z(e, t);
		};
		$(w, (e) => {
			r(a) && e(E);
		});
		var O = L(w);
		x(C), D(() => {
			q(s, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), Q(c, i[t.item.kind] ?? "💪"), Q(d, `${r(o).title ?? ""} `), Q(S, `${r(o).when ?? ""} · ${r(o).duration ?? ""}`), Q(O, ` ${(r(o).removable === "restore" ? "Removed" : r(o).label ?? (r(o).xp && `${r(o).xp} XP`)) ?? ""}`);
		}), z(e, n);
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
		n(i), x(r), j("click", r, () => t.onopen(t.item)), z(e, r);
	}, m = (e) => {
		var t = Dt(), r = p(t);
		n(r), x(t), z(e, t);
	};
	$(d, (e) => {
		r(c) ? e(f) : e(m, -1);
	}), x(l), D(() => u = q(l, 1, "svelte-69s4be", null, u, {
		dim: r(o).removable === "restore" || r(s),
		grey: !!r(o).label
	})), z(e, l), H();
}
l(["click"]);
// src/lib/ui/Feed.svelte
var At = Z("<ul class=\"card svelte-n1344i\"></ul>"), jt = Z("<p class=\"caption empty svelte-n1344i\">No workouts in the last 90 days.</p>"), Mt = Z("<button type=\"button\" class=\"btn older svelte-n1344i\">Load older</button>"), Nt = Z("<!> <!>", 1);
function Pt(e, t) {
	W(t, !0);
	let i = U(Ze([])), o = U(!0), s = U(!1), c = null, l = _(() => n(t.items, E(r(i), t.person, et)));
	async function u() {
		a(s, !0);
		let e = c ?? r(l).at(-1)?.start.slice(0, 10) ?? we(A(), 88), u = await ft(t.person, e);
		a(s, !1), u && (a(i, n(r(i), u.items), !0), c = we(e, 90), a(o, u.more, !0));
	}
	var d = Nt(), f = y(d), p = (e) => {
		var n = At();
		J(n, 21, () => r(l), (e) => e.key, (e, n) => {
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
		}), x(n), z(e, n);
	}, m = (e) => {
		var t = jt();
		z(e, t);
	};
	$(f, (e) => {
		r(l).length ? e(p) : e(m, -1);
	});
	var h = L(f, 2), g = (e) => {
		var t = Mt();
		D(() => t.disabled = r(s)), j("click", t, u), z(e, t);
	};
	$(h, (e) => {
		r(o) && e(g);
	}), z(e, d), H();
}
l(["click"]);
// src/lib/ui/PlanBar.svelte
var Ft = Z("<span> </span>"), It = Z("<i class=\"svelte-1y5m0aq\"></i>"), Lt = Z("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), Rt = Z("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!></div>");
function zt(e, t) {
	W(t, !0);
	let n = _(() => f(t.plan)), i = _(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0)) / 60));
	var a = Rt(), o = p(a), s = p(o), c = T(s, !0), l = L(s, 2), u = (e) => {
		var n = Ft();
		let r;
		var i = T(n, !0);
		D(() => {
			r = q(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), Q(i, t.plan.due_today ? "Due today" : "Rest day");
		}), z(e, n);
	};
	$(l, (e) => {
		r(n).length && e(u);
	}), x(o);
	var d = L(o, 2), m = (e) => {
		var t = Lt(), a = y(t);
		J(a, 21, () => r(n), ce, (e, t) => {
			var n = It();
			let i;
			D(() => i = K(n, "", i, {
				"flex-grow": r(t).frac,
				background: `var(--${r(t).kind === "run" ? "run" : "fill"})`
			})), z(e, n);
		}), x(a);
		var o = L(a, 2), s = p(o), c = p(s);
		K(c, "", {}, { background: "var(--run)" });
		var l = L(c, 2);
		K(l, "", {}, { background: "var(--fill)" }), Re(), x(s);
		var u = L(s, 2), d = T(u);
		x(o), D(() => {
			X(a, "aria-label", `Run and walk intervals, ${r(i) ?? ""} minutes in total`), Q(d, `${r(i) ?? ""} min`);
		}), z(e, t);
	};
	$(d, (e) => {
		r(n).length && e(m);
	}), x(a), D(() => Q(c, t.plan.state)), z(e, a), H();
}
// src/lib/gesture.js
var Bt = (e, t = .998) => e / 1e3 * t / (1 - t), Vt = (e, t, n) => e + Bt(t) > n / 2;
function Ht(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var Ut = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), Wt = Z("<h2 class=\"svelte-9pi54v\"> </h2> <button type=\"button\" class=\"close press svelte-9pi54v\" aria-label=\"Close\">✕</button>", 1), Gt = Z("<div class=\"grab drag svelte-9pi54v\"><!></div>"), Kt = Z("<div class=\"grab svelte-9pi54v\"><!></div>"), qt = Z("<dialog><!> <div class=\"body svelte-9pi54v\"><!></div></dialog>");
function Jt(t, n) {
	let i = d();
	W(n, !0);
	let o = (e) => {
		var t = Wt(), r = y(t), a = T(r, !0), o = L(r, 2);
		D(() => {
			X(r, "id", `${i}-t`), Q(a, n.title);
		}), j("click", o, () => u.close()), z(e, t);
	}, s = e(n, "drag", 3, !1), c = e(n, "wide", 3, !1), l = e(n, "onclose", 3, null), u, f, m = U(0), h = null, g = U(!1), _ = !1, v = !1;
	function b() {
		return u.open ? null : (_ = document.documentElement.style.overflow !== "hidden", _ && (document.documentElement.style.overflow = "hidden"), u.showModal(), f);
	}
	function S() {
		u.close();
	}
	function C() {
		_ && (document.documentElement.style.overflow = ""), _ = !1, a(m, 0), l()?.();
	}
	function w(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), h = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, a(g, !0));
	}
	function E(e) {
		h && (a(m, Math.max(0, e.clientY - h.start), !0), h.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), h.samples.length > 8 && h.samples.shift());
	}
	function O(e) {
		if (!h) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = Ht([...h.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		h = null, a(g, !1), Vt(r(m), n, u.offsetHeight) ? u.close() : a(m, 0);
	}
	var k = {
		show: b,
		close: S
	}, A = qt();
	let M, N;
	var P = p(A), F = (e) => {
		var t = Gt(), n = p(t);
		o(n), x(t), j("pointerdown", t, w), j("pointermove", t, E), j("pointerup", t, O), De("pointercancel", t, O), z(e, t);
	}, I = (e) => {
		var t = Kt(), n = p(t);
		o(n), x(t), z(e, t);
	};
	$(P, (e) => {
		s() ? e(F) : e(I, -1);
	});
	var R = L(P, 2), B = p(R);
	return xe(B, () => n.children), x(R), Y(R, (e) => f = e, () => f), x(A), Y(A, (e) => u = e, () => u), D(() => {
		X(A, "aria-labelledby", `${i}-t`), M = q(A, 1, "svelte-9pi54v", null, M, {
			wide: c(),
			dragging: r(g)
		}), N = K(A, "", N, { transform: r(m) ? `translateY(${r(m)}px)` : null });
	}), j("pointerdown", A, (e) => v = e.target === u), j("click", A, (e) => e.target === u && v && u.close()), De("close", A, C), j("keydown", A, (e) => e.key === "Escape" && e.stopPropagation()), z(t, A), H(k);
}
l([
	"click",
	"pointerdown",
	"keydown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/RecordsDialog.svelte
var Yt = Z("<li class=\"svelte-18znx9k\"><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), Xt = Z("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1);
function Zt(e, t) {
	W(t, !0);
	let n;
	function i(e = null) {
		let t = n.show();
		t && (t.scrollTop = 0, e && t.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	var a = { open: i };
	return Y(Jt(e, {
		title: "All records",
		drag: !0,
		children: (e, n) => {
			var i = s(), a = y(i);
			J(a, 17, () => t.groups, (e) => e.group, (e, t) => {
				var n = Xt(), i = y(n), a = T(i, !0), o = L(i, 2);
				J(o, 21, () => r(t).lifts, (e) => e.id, (e, t) => {
					var n = Yt(), i = p(n), a = p(i), o = L(a), s = T(o, !0), l = L(o);
					x(i), x(n), D((e, n) => {
						Q(a, `${r(t).name ?? ""} · `), Q(s, e), Q(l, ` · ${n ?? ""}`);
					}, [() => c(r(t)), () => ne(r(t).date)]), z(e, n);
				}), x(o), D(() => {
					X(i, "data-group", r(t).group), Q(a, r(t).group);
				}), z(e, n);
			}), z(e, i);
		},
		$$slots: { default: !0 }
	}), (e) => n = e, () => n), H(a);
}
// src/lib/ui/StepBars.svelte
var Qt = Z("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), $t = Z("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), en = Z("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function tn(e, t) {
	W(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), i = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var a = en(), o = p(a);
	J(o, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = Qt();
		let a;
		var o = p(n), s = p(o);
		let c, l;
		x(o);
		var u = L(o, 2), d = T(u, !0);
		x(n), D((e) => {
			X(n, "aria-label", e), X(n, "aria-hidden", r(t).future ? "true" : void 0), X(n, "aria-current", r(t).isToday ? "date" : void 0), a = q(n, 1, "svelte-1f099m", null, a, { today: r(t).isToday }), c = q(s, 1, "svelte-1f099m", null, c, {
				active: r(t).active,
				future: r(t).future
			}), l = K(s, "", l, { height: `${r(t).frac * 100}%` }), Q(d, r(t).label);
		}, [() => r(t).future ? void 0 : i(r(t))]), z(e, n);
	}), x(o);
	var s = L(o, 2), c = (e) => {
		var n = $t();
		let r;
		D(() => r = K(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), z(e, n);
	};
	$(s, (e) => {
		t.goalFrac !== null && e(c);
	}), x(a), z(e, a), H();
}
// src/lib/ui/Progress.svelte
var nn = Z("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), rn = Z("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), an = Z("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), on = Z("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), sn = Z("<span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span>", 1), cn = Z("<button type=\"button\" class=\"row svelte-kr1x1f\"><!></button>"), ln = Z("<div class=\"row svelte-kr1x1f\"><!></div>"), un = Z("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), dn = Z("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function fn(e, t) {
	W(t, !0);
	let n = _(() => t.person.week.goal.steps ?? 0), i = _(() => ie(t.person.steps_week, r(n), A())), a = _(() => t.person.pbs.lifts ?? []), l = _(() => R(r(a))), u, d = _(() => t.person.pbs.fastest_1k), f = _(() => t.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var m = dn(), h = y(m), g = (e) => {
		var t = nn(), n = p(t);
		tn(n, {
			get bars() {
				return r(i).bars;
			},
			get goalFrac() {
				return r(i).goalFrac;
			}
		});
		var a = L(n, 2), o = T(a, !0);
		x(t), D((e) => Q(o, e), [() => Le(r(i).bars)]), z(e, t);
	};
	$(h, (e) => {
		r(i) && e(g);
	});
	var v = L(h, 2), b = p(v), S = (e) => {
		var t = an(), n = y(t);
		J(n, 21, () => r(l), (e) => e.group, (e, t) => {
			var n = rn(), i = p(n), a = p(i), o = T(a, !0), s = L(a), l = p(s), d = L(l), f = T(d, !0);
			x(s), x(i), x(n), D((e) => {
				Q(o, r(t).group), Q(l, `${r(t).lift.name ?? ""} · `), Q(f, e);
			}, [() => c(r(t).lift)]), j("click", i, () => u.open(r(t).group)), z(e, n);
		}), x(n);
		var i = L(n, 2), o = T(i);
		D(() => Q(o, `All records (${r(a).length ?? ""})`)), j("click", i, () => u.open()), z(e, t);
	}, C = (e) => {
		var t = on();
		z(e, t);
	};
	$(b, (e) => {
		r(a).length ? e(S) : e(C, -1);
	}), x(v);
	var w = L(v, 2), E = p(w), k = (e) => {
		let n = (e) => {
			var t = sn(), n = L(y(t), 2), i = T(n);
			D((e, t) => Q(i, `${e ?? ""} · ${t ?? ""}`), [() => O(r(d).seconds), () => ne(r(d).date)]), z(e, t);
		};
		var i = s(), a = y(i), o = (e) => {
			var i = cn(), a = p(i);
			n(a), x(i), j("click", i, () => t.onopen({ key: r(d).key })), z(e, i);
		}, c = (e) => {
			var t = ln(), r = p(t);
			n(r), x(t), z(e, t);
		};
		$(a, (e) => {
			r(d).key ? e(o) : e(c, -1);
		}), z(e, i);
	}, M = (e) => {
		var t = un();
		z(e, t);
	};
	$(E, (e) => {
		r(d) ? e(k) : e(M, -1);
	});
	var N = L(E, 2), P = L(p(N)), F = T(P);
	x(N);
	var I = L(N, 2), B = L(p(I)), ee = T(B);
	x(I), x(w);
	var V = L(w, 2);
	{
		let e = _(() => o(r(a)));
		Y(Zt(V, { get groups() {
			return r(e);
		} }), (e) => u = e, () => u);
	}
	D((e) => {
		Q(F, `${e ?? ""} km`), Q(ee, `${r(f) ?? ""} t`);
	}, [() => t.person.pbs.longest_session_km.toFixed(1)]), z(e, m), H();
}
l(["click"]);
// src/lib/ui/Shoes.svelte
var pn = Z("<span class=\"label svelte-eu7fja\"> </span>"), mn = Z("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), hn = Z("<ul class=\"card svelte-eu7fja\"></ul>");
function gn(e, t) {
	W(t, !0);
	let n = _(() => t.shoes.map(g));
	var i = hn();
	J(i, 23, () => r(n), (e, n) => t.shoes[n].id, (e, t) => {
		var n = mn(), i = p(n), a = p(i), o = T(a, !0), s = L(a), c = T(s, !0);
		x(i);
		var l = L(i, 2), u = p(l);
		let d;
		x(l);
		var f = L(l, 2), m = p(f), h = T(m, !0), g = L(m, 2), _ = (e) => {
			var n = pn(), i = T(n, !0);
			D(() => Q(i, r(t).label)), z(e, n);
		};
		$(g, (e) => {
			r(t).label && e(_);
		}), x(f), x(n), D(() => {
			q(n, 1, Ie(r(t).state), "svelte-eu7fja"), Q(o, r(t).name), Q(c, r(t).km), d = K(u, "", d, { width: `${r(t).frac * 100}%` }), Q(h, r(t).detail);
		}), z(e, n);
	}), x(i), z(e, i), H();
}
// src/lib/ui/ShoesDialog.svelte
var _n = Z("<span class=\"mini svelte-1bogt6u\">Current</span>"), vn = Z("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), yn = Z("<button type=\"button\" class=\"btn\">Set current</button>"), bn = Z("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), xn = Z("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), Sn = Z("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe until you set one.</p>"), Cn = Z("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), wn = Z("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), Tn = Z("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), En = Z("<!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form>", 1);
function Dn(e, t) {
	W(t, !0);
	let n = _(() => t.shoes.map((e) => ({
		...g(e),
		id: e.id,
		limit: e.limit,
		current: !!e.current
	}))), o, s = U(""), c = U(Ze(700)), l = U(null), u = U(!1), d = U(null);
	function f() {
		o.show();
	}
	function m() {
		a(d, null), a(l, null);
	}
	async function h(e) {
		a(u, !0);
		let t = await pt(e);
		return a(u, !1), t;
	}
	async function v(e) {
		e.preventDefault();
		let n = i(r(s), r(c));
		a(l, n.error ?? null, !0), !r(l) && await h({
			op: "add",
			person: t.person,
			...n
		}) && a(s, "");
	}
	async function b(e, t) {
		let n = i(void 0, e.currentTarget.value, { partial: !0 });
		a(l, n.error ?? null, !0), r(l) ? e.currentTarget.value = t.limit : n.replace_at_km !== t.limit && await h({
			op: "update",
			id: t.id,
			...n
		});
	}
	async function S(e) {
		a(d, null), await h({
			op: "retire",
			id: e.id
		});
	}
	var C = { open: f };
	return Y(Jt(e, {
		title: "Manage shoes",
		onclose: m,
		children: (e, i) => {
			var o = En(), f = y(o), m = (e) => {
				var i = Cn(), o = y(i);
				J(o, 21, () => r(n), (e) => e.id, (e, n) => {
					var i = xn(), o = p(i), s = p(o), c = p(s, !0), l = L(c), f = (e) => {
						var t = _n();
						z(e, t);
					};
					$(l, (e) => {
						r(n).current && e(f);
					}), x(s);
					var m = L(s, 2), g = T(m, !0);
					x(o);
					var _ = L(o, 2), v = p(_), C = L(p(v));
					Pe(C), Re(), x(v);
					var w = L(v, 2), E = (e) => {
						var t = vn(), i = y(t), o = T(i), s = L(i, 2), c = L(s, 2);
						D(() => {
							Q(o, `Retire ${r(n).name ?? ""}?`), c.disabled = r(u);
						}), j("click", s, () => a(d, null)), j("click", c, () => S(r(n))), z(e, t);
					}, O = (e) => {
						var i = bn(), o = y(i), s = (e) => {
							var i = yn();
							D(() => i.disabled = r(u)), j("click", i, () => h({
								op: "current",
								person: t.person,
								id: r(n).id
							})), z(e, i);
						};
						$(o, (e) => {
							r(n).current || e(s);
						});
						var c = L(o, 2);
						D(() => c.disabled = r(u)), j("click", c, () => a(d, r(n).id, !0)), z(e, i);
					};
					$(w, (e) => {
						r(d) === r(n).id ? e(E) : e(O, -1);
					}), x(_), x(i), D(() => {
						Q(c, r(n).name), Q(g, r(n).km), X(C, "min", be.replace_at_km[0]), X(C, "max", be.replace_at_km[1]), X(C, "step", be.replace_at_km[2]), me(C, r(n).limit), C.disabled = r(u);
					}), j("change", C, (e) => b(e, r(n))), z(e, i);
				}), x(o);
				var s = L(o, 2), c = (e) => {
					var t = Sn();
					z(e, t);
				}, l = _(() => !r(n).some((e) => e.current));
				$(s, (e) => {
					r(l) && e(c);
				}), z(e, i);
			}, g = (e) => {
				var t = wn();
				z(e, t);
			};
			$(f, (e) => {
				r(n).length ? e(m) : e(g, -1);
			});
			var C = L(f, 2), w = L(p(C), 2), E = L(p(w));
			Pe(E), x(w);
			var O = L(w, 2), k = L(p(O));
			Pe(k), x(O);
			var A = L(O, 2), M = (e) => {
				var t = Tn(), n = T(t, !0);
				D(() => Q(n, r(l))), z(e, t);
			};
			$(A, (e) => {
				r(l) && e(M);
			});
			var N = L(A, 2);
			x(C), D(() => {
				X(E, "maxlength", be.name[1]), E.disabled = r(u), X(k, "min", be.replace_at_km[0]), X(k, "max", be.replace_at_km[1]), X(k, "step", be.replace_at_km[2]), k.disabled = r(u), N.disabled = r(u);
			}), De("submit", C, v), ue(E, () => r(s), (e) => a(s, e)), ue(k, () => r(c), (e) => a(c, e)), z(e, o);
		},
		$$slots: { default: !0 }
	}), (e) => o = e, () => o), H(C);
}
l(["change", "click"]);
// src/lib/ui/WorkoutDialog.svelte
var On = Z("<p class=\"msg\" role=\"status\"> </p>"), kn = Z("<p class=\"msg\" role=\"status\">Loading…</p>"), An = Z("<span class=\"mini svelte-1uaoa1p\"> </span>"), jn = Z("<span class=\"mini off svelte-1uaoa1p\"> </span>"), Mn = Z("<div><dt class=\"svelte-1uaoa1p\"> </dt><dd class=\"svelte-1uaoa1p\"> </dd></div>"), Nn = Z("<option disabled=\"\"> </option>"), Pn = Z("<option> </option>"), Fn = Z("<div class=\"shoe svelte-1uaoa1p\"><dt class=\"svelte-1uaoa1p\"><label>Shoe</label></dt><dd class=\"svelte-1uaoa1p\"><select class=\"svelte-1uaoa1p\"><!><!></select></dd></div>"), In = Z("<dl class=\"svelte-1uaoa1p\"><!> <!></dl>"), Ln = Z("<p class=\"caption note svelte-1uaoa1p\"> </p>"), Rn = Z("<p class=\"caption note svelte-1uaoa1p\">Map unavailable</p>"), zn = Z("<div class=\"ph svelte-1uaoa1p\" aria-hidden=\"true\"></div>"), Bn = Z("<h3 class=\"svelte-1uaoa1p\"> </h3> <!>", 1), Vn = Z("<!> <!>", 1), Hn = Z("<li class=\"svelte-1uaoa1p\"><span class=\"zn svelte-1uaoa1p\"> <small class=\"svelte-1uaoa1p\"> </small></span> <span class=\"bar svelte-1uaoa1p\"><span class=\"svelte-1uaoa1p\"></span></span> <span class=\"num svelte-1uaoa1p\"> </span></li>"), Un = Z("<h3 class=\"svelte-1uaoa1p\">Heart-rate zones</h3> <ul class=\"zones svelte-1uaoa1p\"></ul>", 1), Wn = Z("<tr><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td></tr>"), Gn = Z("<h3 class=\"svelte-1uaoa1p\">Splits</h3> <table class=\"svelte-1uaoa1p\"><thead><tr><th class=\"svelte-1uaoa1p\">Km</th><th class=\"svelte-1uaoa1p\">Time</th><th class=\"svelte-1uaoa1p\"> </th><th class=\"svelte-1uaoa1p\">HR</th><th class=\"svelte-1uaoa1p\">Climb</th></tr></thead><tbody></tbody></table>", 1), Kn = Z("<span role=\"img\" aria-label=\"Record\">🏆</span>"), qn = Z("<li class=\"svelte-1uaoa1p\"> <b class=\"svelte-1uaoa1p\"> </b><!></li>"), Jn = Z("<h3 class=\"svelte-1uaoa1p\">Exercises</h3> <ul class=\"gym svelte-1uaoa1p\"><!> <li class=\"vol svelte-1uaoa1p\">Total volume · <b class=\"svelte-1uaoa1p\"> </b></li></ul>", 1), Yn = Z("<span class=\"ask svelte-1uaoa1p\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1uaoa1p\">Delete</button>", 1), Xn = Z("<button type=\"button\"> </button>"), Zn = Z("<div class=\"acts svelte-1uaoa1p\"><!></div>"), Qn = Z("<p class=\"sub svelte-1uaoa1p\"> <!> <!></p> <!> <!> <!> <!> <!> <!> <!>", 1);
function $n(t, n) {
	let i = d();
	W(n, !0);
	let o = e(n, "shoes", 3, null), c = () => import("./viz-BRzGYncM.js"), l, u = U(null), f = U(null), m = U(null), h = U(null), g = U(null), v = U(!1), b = 0;
	async function S(e) {
		let t = l.show();
		if (!t) return;
		let i = ++b;
		a(u, e), a(f, a(m, a(g, null))), a(v, !1), t.scrollTop = 0;
		try {
			let t = await F(`workout?person=${encodeURIComponent(n.person)}&key=${encodeURIComponent(e.key)}`);
			if (i !== b) return;
			a(f, t), (t.route?.length || t.series) && !r(h) && c().then((e) => a(h, e), (e) => i === b && a(g, e));
		} catch (e) {
			i === b && a(m, e);
		}
	}
	function C() {
		b++, a(u, a(f, null));
	}
	let w = _(() => r(u) && `${n.person}/${r(u).key}`), E = _(() => r(w) && $e[r(w)]), O = _(() => {
		if (!r(u)) return null;
		let e = n.feed.find((e) => e.key === r(u).key) ?? {
			...r(f)?.summary,
			...r(u),
			excluded: et[r(w)] ?? r(u).excluded ?? !1
		};
		return r(E) && r(E).want !== null ? {
			...e,
			excluded: r(E).want
		} : e;
	}), k = _(() => r(f) && r(O) ? Se(n.viewer, n.person, r(O)) : {
		remove: null,
		shoe: !1
	}), A = _(() => r(k).shoe && o() ? te(o(), n.runShoes?.[r(u).key]) : null), M = _(() => r(f) && Be(r(f).summary)), N = _(() => r(f) ? le(r(f)).filter(([e]) => !(e === "Shoe" && r(A)?.options.length)) : []), P = _(() => r(f) && Me(r(f))), I = _(() => r(f) && ve(r(f).zones, r(f).max_hr)), R = _(() => r(f) ? he(r(f)) : []), B = _(() => r(f) && Ne(r(f).gym)), ee = _(() => r(f) && Ue(r(f))), V = (e) => e.status === 404 ? "Workout not found" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant";
	async function ne(e) {
		let t = e.currentTarget;
		await mt(n.person, r(u).key, Number(t.value)) || (t.value = String(r(A).value));
	}
	let G = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function ie() {
		r(k).remove === "delete" ? a(v, !0) : ut(n.person, r(u).key, r(k).remove);
	}
	var ae = { open: S };
	{
		let e = _(() => r(M)?.title ?? r(u)?.name ?? "Workout");
		Y(Jt(t, {
			get title() {
				return r(e);
			},
			drag: !0,
			wide: !0,
			onclose: C,
			children: (e, t) => {
				var o = s(), c = y(o), d = (e) => {
					var t = On(), n = T(t, !0);
					D((e) => Q(n, e), [() => V(r(m))]), z(e, t);
				}, b = (e) => {
					var t = kn();
					z(e, t);
				}, S = (e) => {
					var t = Qn(), o = y(t), c = p(o), d = L(c), m = (e) => {
						var t = An(), n = T(t, !0);
						D(() => Q(n, r(M).plan)), z(e, t);
					};
					$(d, (e) => {
						r(M).plan && e(m);
					});
					var b = L(d, 2), S = (e) => {
						var t = jn(), n = T(t, !0);
						D((e) => Q(n, e), [() => Ge(r(O)).label]), z(e, t);
					}, C = _(() => r(O) && Ge(r(O)).label);
					$(b, (e) => {
						r(C) && e(S);
					}), x(o);
					var w = L(o, 2), F = (e) => {
						var t = In(), n = p(t);
						J(n, 17, () => r(N), ([e, t]) => e, (e, t) => {
							var n = _(() => re(r(t), 2));
							let i = () => r(n)[0], a = () => r(n)[1];
							var o = Mn(), s = p(o), c = T(s, !0), l = L(s), u = T(l, !0);
							x(o), D(() => {
								Q(c, i()), Q(u, a());
							}), z(e, o);
						});
						var a = L(n, 2), o = (e) => {
							var t = Fn(), n = p(t), a = T(n), o = L(n), s = p(o), c = p(s), l = (e) => {
								var t = Nn(), n = T(t, !0);
								t.value = t.__value = "", D(() => Q(n, r(A).extra)), z(e, t);
							};
							$(c, (e) => {
								r(A).extra && e(l);
							});
							var u = L(c);
							J(u, 17, () => r(A).options, (e) => e.id, (e, t) => {
								var n = Pn(), i = T(n, !0), a = {};
								D(() => {
									Q(i, r(t).label), a !== (a = r(t).id) && (n.value = (n.__value = a) ?? "");
								}), z(e, n);
							}), x(s);
							var d;
							ke(s), x(o), x(t), D(() => {
								X(a, "for", `${i}-shoe`), X(s, "id", `${i}-shoe`), d !== (d = r(A).value) && (s.value = (s.__value = d) ?? "", We(s, d));
							}), j("change", s, ne), z(e, t);
						};
						$(a, (e) => {
							r(A)?.options.length && e(o);
						}), x(t), z(e, t);
					};
					$(w, (e) => {
						(r(N).length || r(A)?.options.length) && e(F);
					});
					var V = L(w, 2), H = (e) => {
						var t = Ln(), n = T(t, !0);
						D((e) => Q(n, e), [() => pe(r(f).note)]), z(e, t);
					}, te = _(() => pe(r(f).note));
					$(V, (e) => {
						r(te) && e(H);
					});
					var U = L(V, 2), W = (e) => {
						var t = s(), n = y(t), i = (e) => {
							var t = Rn();
							z(e, t);
						}, a = (e) => {
							var t = zn();
							let n;
							D(() => n = K(t, "", n, { height: `${r(f).route?.length ? 220 : 0}px` })), z(e, t);
						}, o = (e) => {
							var t = Vn(), n = y(t), i = (e) => {
								var t = s(), n = y(t);
								{
									let e = _(() => Oe(r(f)) ? "run" : "gym");
									je(n, () => r(h).MapView, (t, n) => {
										n(t, {
											get route() {
												return r(f).route;
											},
											get kind() {
												return r(e);
											}
										});
									});
								}
								z(e, t);
							};
							$(n, (e) => {
								r(f).route?.length && e(i);
							});
							var a = L(n, 2);
							J(a, 17, () => r(P)?.list ?? [], (e) => e.label, (e, t) => {
								var n = Bn(), i = y(n), a = T(i, !0), o = L(i, 2);
								je(o, () => r(h).Chart, (e, n) => {
									n(e, {
										get x() {
											return r(P).x;
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
								}), D(() => Q(a, r(t).label)), z(e, n);
							}), z(e, t);
						};
						$(n, (e) => {
							r(g) ? e(i) : r(h) ? e(o, -1) : e(a, 1);
						}), z(e, t);
					};
					$(U, (e) => {
						(r(f).route?.length || r(P)?.list.length) && e(W);
					});
					var ae = L(U, 2), oe = (e) => {
						var t = Un(), n = L(y(t), 2);
						J(n, 21, () => r(I), (e) => e.zone, (e, t) => {
							var n = Hn(), i = p(n), a = p(i), o = L(a), s = T(o, !0);
							x(i);
							var c = L(i, 2), l = p(c);
							let u;
							x(c);
							var d = L(c, 2), f = T(d);
							x(n), D(() => {
								Q(a, `${r(t).zone ?? ""} `), Q(s, r(t).bpm), u = K(l, "", u, { width: `${r(t).pct ?? ""}%` }), Q(f, `${r(t).time ?? ""} · ${r(t).pct ?? ""}%`);
							}), z(e, n);
						}), x(n), z(e, t);
					};
					$(ae, (e) => {
						r(I) && e(oe);
					});
					var se = L(ae, 2), le = (e) => {
						var t = Gn(), n = L(y(t), 2), i = p(n), a = p(i), o = L(p(a), 2), s = T(o, !0);
						Re(2), x(a), x(i);
						var c = L(i);
						J(c, 21, () => r(R), ce, (e, t) => {
							var n = Wn(), i = p(n), a = T(i, !0), o = L(i), s = T(o, !0), c = L(o), l = T(c, !0), u = L(c), d = T(u, !0), f = L(u), m = T(f, !0);
							x(n), D(() => {
								Q(a, r(t).km), Q(s, r(t).time), Q(l, r(t).pace), Q(d, r(t).hr), Q(m, r(t).climb);
							}), z(e, n);
						}), x(c), x(n), D(() => Q(s, r(ee) ? "km/h" : "Pace")), z(e, t);
					};
					$(se, (e) => {
						r(R).length && e(le);
					});
					var ue = L(se, 2), de = (e) => {
						var t = Jn(), n = L(y(t), 2), i = p(n);
						J(i, 17, () => r(B).exercises, ce, (e, t) => {
							var n = qn(), i = p(n), a = L(i), o = T(a, !0), s = L(a), c = (e) => {
								var t = Kn();
								z(e, t);
							};
							$(s, (e) => {
								r(t).record && e(c);
							}), x(n), D(() => {
								Q(i, `${r(t).name ?? ""} · `), Q(o, r(t).set);
							}), z(e, n);
						});
						var a = L(i, 2), o = L(p(a)), s = T(o, !0);
						x(a), x(n), D(() => Q(s, r(B).volume)), z(e, t);
					};
					$(ue, (e) => {
						r(B) && e(de);
					});
					var fe = L(ue, 2), me = (e) => {
						var t = Zn(), i = p(t), o = (e) => {
							var t = Yn(), i = L(y(t), 2), o = L(i, 2);
							j("click", i, () => a(v, !1)), j("click", o, () => (ut(n.person, r(u).key, "remove"), l.close())), z(e, t);
						}, s = (e) => {
							var t = Xn();
							let n;
							var i = T(t, !0);
							D(() => {
								n = q(t, 1, "btn svelte-1uaoa1p", null, n, { danger: r(k).remove !== "restore" }), Q(i, G[r(k).remove]);
							}), j("click", t, ie), z(e, t);
						};
						$(i, (e) => {
							r(v) ? e(o) : e(s, -1);
						}), x(t), z(e, t);
					};
					$(fe, (e) => {
						r(k).remove && r(E)?.want !== null && e(me);
					}), D(() => Q(c, `${r(M).date ?? ""} · ${r(M).time ?? ""} · ${r(M).duration ?? ""} `)), z(e, t);
				};
				$(c, (e) => {
					r(m) ? e(d) : r(f) ? e(S, -1) : e(b, 1);
				}), z(e, o);
			},
			$$slots: { default: !0 }
		}), (e) => l = e, () => l);
	}
	return H(ae);
}
l(["change", "click"]);
// src/lib/ui/Details.svelte
var er = Z("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), tr = Z("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), nr = Z("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), rr = Z("<section><h2 class=\"svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), ir = Z("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!> <!>", 1);
function ar(e, t) {
	let n = d();
	W(t, !0);
	let i = _(() => v(t.person.pbs)), o = _(() => V(t.person, t.canEdit)), s = U(void 0), c = U(void 0), l = (e) => r(c).open(e);
	var u = ir(), f = y(u), m = (e) => {
		var r = er(), i = p(r);
		zt(L(i, 2), { get plan() {
			return t.person.plan;
		} }), x(r), D(() => {
			X(r, "aria-labelledby", `${n}-plan`), X(i, "id", `${n}-plan`);
		}), z(e, r);
	};
	$(f, (e) => {
		t.person.plan && e(m);
	});
	var h = L(f, 2), g = p(h), b = L(g, 2);
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
	var S = L(h, 2), C = p(S), w = L(p(C)), E = T(w);
	x(C), bt(L(C, 2), { get badges() {
		return t.person.badges;
	} }), x(S);
	var O = L(S, 2), k = p(O);
	fn(L(k, 2), {
		get person() {
			return t.person;
		},
		onopen: l
	}), x(O);
	var A = L(O, 2);
	{
		let e = _(() => r(o) ? t.person.shoes : null);
		Y($n(A, {
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
	var M = L(A, 2), N = (e) => {
		var i = rr(), c = y(i), l = p(c), u = L(p(l)), d = (e) => {
			var t = tr();
			j("click", t, () => r(s).open()), z(e, t);
		};
		$(u, (e) => {
			r(o) && e(d);
		}), x(l);
		var f = L(l, 2), m = (e) => {
			gn(e, { get shoes() {
				return t.person.shoes;
			} });
		}, h = (e) => {
			var t = nr();
			z(e, t);
		};
		$(f, (e) => {
			t.person.shoes.length ? e(m) : e(h, -1);
		}), x(c);
		var g = L(c, 2), _ = (e) => {
			Y(Dn(e, {
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
		}), z(e, i);
	};
	$(M, (e) => {
		(t.person.shoes?.length || r(o)) && e(N);
	}), D(() => {
		X(h, "aria-labelledby", `${n}-feed`), X(g, "id", `${n}-feed`), X(S, "aria-labelledby", `${n}-badges`), X(C, "id", `${n}-badges`), Q(E, `${t.person.badges.count ?? ""} unlocked`), X(O, "aria-labelledby", `${n}-pbs`), X(k, "id", `${n}-pbs`);
	}), z(e, u), H();
}
l(["click"]);
// src/lib/ui/Goals.svelte
var or = Z("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), sr = Z("<p class=\"msg\" role=\"status\"> </p>"), cr = Z("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!> <label class=\"year svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Birth year</span> <input type=\"number\" inputmode=\"numeric\" min=\"1900\" placeholder=\"1990\" class=\"svelte-7wncvy\"/></label> <p class=\"caption maxhr svelte-7wncvy\"> </p></section>"), lr = Z("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), ur = Z("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), dr = Z("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), fr = Z("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function pr(e, t) {
	let n = d();
	W(t, !0);
	let i = [], o = (e, n = ae, i = ae, a = ae) => {
		let o = _(() => {
			let [e, t, n] = Fe[i()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var s = or(), c = p(s), l = T(c, !0), u = L(c, 2), d = L(u, 2), f = T(d, !0), m = L(d, 2);
		x(s), D((e, c, d, p) => {
			X(s, "aria-label", a()), Q(l, e), X(u, "aria-label", `Fewer ${c ?? ""}`), u.disabled = t.readOnly || n()[i()] <= r(o).lo, Q(f, d), X(m, "aria-label", `More ${p ?? ""}`), m.disabled = t.readOnly || n()[i()] >= r(o).hi;
		}, [
			() => a().split(",")[0],
			() => v(a()),
			() => b(i(), n()[i()]),
			() => v(a())
		]), j("click", u, () => n()[i()] = ye(i(), n()[i()] - r(o).step)), j("click", m, () => n()[i()] = ye(i(), n()[i()] + r(o).step)), z(e, s);
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
	var C = fr(), w = L(y(C), 2), E = (e) => {
		var t = sr(), n = T(t, !0);
		D(() => Q(n, r(c) ? r(c).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), z(e, t);
	}, O = (e) => {
		var a = dr(), c = y(a), d = T(c), h = L(c, 2);
		J(h, 16, () => Object.keys(r(l).people), (e) => e, (e, i) => {
			let a = _(() => t.people[i]?.name ?? i);
			var s = cr(), c = p(s), u = T(c, !0), d = L(c, 2);
			J(d, 16, () => Ae, (e) => e, (e, t) => {
				o(e, () => r(l).people[i], () => t, () => `${f[t]}, ${r(a)}`);
			});
			var m = L(d, 2), h = L(p(m), 2);
			Pe(h), x(m);
			var g = L(m, 2), v = T(g, !0);
			x(s), D((e, o) => {
				X(s, "aria-labelledby", `${n}-${i ?? ""}`), X(c, "id", `${n}-${i ?? ""}`), Q(u, r(a)), X(h, "max", e), h.disabled = t.readOnly, Q(v, o);
			}, [() => (/* @__PURE__ */ new Date()).getFullYear(), () => Ee(t.people[i]?.max_hr)]), ue(h, () => r(l).profiles[i].birth_year, (e) => r(l).profiles[i].birth_year = e), z(e, s);
		});
		var v = L(h, 2), b = p(v), C = L(b, 2);
		J(C, 21, () => m, (e) => e.mode, (e, a) => {
			var o = lr();
			let s;
			var c = p(o);
			Pe(c);
			var u, d = L(c, 1, !0);
			x(o), D(() => {
				s = q(o, 1, "svelte-7wncvy", null, s, { on: r(l).couple.mode === r(a).mode }), X(c, "name", `${n}-mode`), c.disabled = t.readOnly, u !== (u = r(a).mode) && (c.value = (c.__value = u) ?? ""), Q(d, r(a).label);
			}), Ce(i, [], c, () => (r(a).mode, r(l).couple.mode), (e) => r(l).couple.mode = e), z(e, o);
		}), x(C);
		var w = L(C, 2), E = T(w, !0), O = L(w, 2), k = (e) => {
			o(e, () => r(l).couple, () => r(l).couple.mode, () => g[r(l).couple.mode]);
		};
		$(O, (e) => {
			g[r(l).couple.mode] && e(k);
		});
		var A = L(O, 2), M = L(p(A), 2);
		Pe(M), x(A), x(v);
		var N = L(v, 2), P = (e) => {
			var t = ur();
			D(() => t.disabled = r(u)), j("click", t, S), z(e, t);
		};
		$(N, (e) => {
			t.readOnly || e(P);
		}), D((e, r) => {
			Q(d, `Applies from this week (week ${e ?? ""})`), X(v, "aria-labelledby", `${n}-couple`), X(b, "id", `${n}-couple`), X(C, "aria-labelledby", `${n}-couple`), Q(E, r), M.disabled = t.readOnly;
		}, [() => qe(r(s).week_start), () => m.find((e) => e.mode === r(l).couple.mode).hint]), ue(M, () => r(l).couple.reward, (e) => r(l).couple.reward = e), z(e, a);
	};
	$(w, (e) => {
		r(l) ? e(O, -1) : e(E);
	}), z(e, C), H();
}
l(["click"]);
// src/lib/ui/Header.svelte
var mr = Z("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), hr = ee("<svg class=\"brand svelte-16l0jix\" viewBox=\"0 0 100 100\" aria-hidden=\"true\"><defs><linearGradient id=\"hdr-brand\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#FFB340\"></stop><stop offset=\"1\" stop-color=\"#FF453A\"></stop></linearGradient></defs><rect width=\"100\" height=\"100\" rx=\"22.4\" fill=\"url(#hdr-brand)\"></rect><path d=\"M50 20 L80 45 V80 H20 V45 Z\" fill=\"#FFF\" stroke=\"#FFF\" stroke-width=\"6\" stroke-linejoin=\"round\"></path><path d=\"M50 42 C55 49 63 55 63 65.5 a13 13 0 0 1 -26 0 C37 58 42 53 45.5 49 C46 53.5 48 56.5 51 57.5 C49.5 52 49 47 50 42 Z\" fill=\"#FF6B2C\"></path></svg>"), gr = Z("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), _r = Z("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"><!> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function vr(t, n) {
	let i = e(n, "subtitle", 3, ""), o = e(n, "actionLabel", 3, ""), s = e(n, "brand", 3, !1), c = U(0);
	var l = _r();
	let u;
	var d = p(l), f = p(d), m = (e) => {
		var t = mr();
		j("click", t, function(...e) {
			n.onback?.apply(this, e);
		}), z(e, t);
	};
	$(f, (e) => {
		n.onback && e(m);
	});
	var h = L(f, 2), g = p(h), _ = p(g), v = (e) => {
		var t = hr();
		z(e, t);
	};
	$(_, (e) => {
		s() && e(v);
	});
	var y = L(_);
	x(g);
	var b = L(g, 2), S = (e) => {
		var t = gr(), r = T(t, !0);
		D(() => Q(r, o())), j("click", t, function(...e) {
			n.onaction?.apply(this, e);
		}), z(e, t);
	};
	$(b, (e) => {
		n.onaction && e(S);
	}), x(h);
	var C = L(h, 2), w = T(C, !0);
	x(d), x(l), D(() => {
		u = q(l, 1, "svelte-16l0jix", null, u, { scrolled: r(c) > 0 }), Q(y, ` ${n.title ?? ""}`), Q(w, i() || "\xA0");
	}), He("y", () => r(c), (e) => a(c, e, !0)), z(t, l);
}
l(["click"]);
// src/lib/motion.js
function yr(e, { onFrame: t, onSettle: n, snap: r = {
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
var br = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), xr = (e) => br(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function Sr({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var Cr = ee("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), wr = ee("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function Tr(t, n) {
	W(n, !0);
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
		let e = yr(Sr({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => a(c, e, !0) });
		return e.to(s), e.stop;
	});
	var d = wr();
	let f;
	J(d, 21, () => r(u), (e) => e.kind, (e, t) => {
		var n = Cr(), a = y(n);
		let o;
		var s = L(a);
		let c;
		D(() => {
			X(a, "cx", i() / 2), X(a, "cy", i() / 2), X(a, "r", r(t).r), X(a, "stroke-width", r(l)), o = K(a, "", o, { stroke: `var(--${r(t).kind ?? ""})` }), X(s, "cx", i() / 2), X(s, "cy", i() / 2), X(s, "r", r(t).r), X(s, "stroke-width", r(l)), X(s, "stroke-dasharray", `${r(t).len ?? ""} ${r(t).c ?? ""}`), X(s, "opacity", +(r(t).len > .01)), X(s, "transform", `rotate(-90 ${i() / 2} ${i() / 2})`), c = K(s, "", c, { stroke: `var(--${r(t).kind ?? ""})` });
		}), z(e, n);
	}), x(d), D(() => {
		X(d, "viewBox", `0 0 ${i() ?? ""} ${i() ?? ""}`), f = K(d, "", f, { width: `${i() / 16}rem` });
	}), z(t, d), H();
}
// src/lib/ui/PersonTile.svelte
var Er = Z("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Dr = Z("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), Or = Z("<span class=\"streak svelte-1handop\"> </span>"), kr = Z("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), Ar = Z("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), jr = Z("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), Mr = Z("<span class=\"steps svelte-1handop\"> </span>"), Nr = Z("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), Pr = Z("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), Fr = Z("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function Ir(t, n) {
	W(n, !0);
	let i = e(n, "index", 3, 0), a = e(n, "compact", 3, !1), o = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], s = _(() => o[i() % o.length]), c = _(() => re(r(s), 2)), l = _(() => r(c)[0]), d = _(() => r(c)[1]), f = _(() => u(n.person)), m = _(() => n.person.week), h = [
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
		n: se(r(m))[t],
		of: Ye(r(m))[t]
	}))), v = _(() => S(n.person.steps_today, r(m).goal.steps)), b = _(() => [
		`Level ${r(f).level}`,
		a() ? `🔥 ${n.person.streak} wk` : `${n.person.xp.toLocaleString()} XP`,
		r(m).paused && "Week paused",
		r(m).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), C = _(() => `${n.person.name}, level ${r(f).level}. This week ${r(g).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${r(m).goal_pending ? "New goals pending. " : ""}${r(m).bonus ? "Weekly bonus earned. " : ""}${r(v) ? r(v).replace("👟 ", "") + ". " : ""}Streak ${n.person.streak} weeks.`);
	var w = Fr();
	let E;
	var O = p(w), k = p(O), A = p(k);
	let M;
	var N = T(A, !0), P = L(A, 2), F = p(P), R = T(F, !0), B = L(F, 2), ee = T(B, !0);
	x(P);
	var V = L(P, 2), te = (e) => {
		var t = Dr(), n = y(t), i = p(n);
		{
			let e = _(() => I(r(m)));
			Tr(i, {
				get fractions() {
					return r(e);
				},
				size: 44
			});
		}
		var a = L(i, 2), o = (e) => {
			var t = Er();
			z(e, t);
		};
		$(a, (e) => {
			r(m).bonus && e(o);
		}), x(n);
		var s = L(n, 2), c = T(s, !0);
		D(() => Q(c, r(C))), z(e, t);
	}, U = (e) => {
		var t = Or(), r = T(t);
		D(() => Q(r, `🔥 ${n.person.streak ?? ""} wk`)), z(e, t);
	};
	$(V, (e) => {
		a() ? e(te) : e(U, -1);
	});
	var ne = L(V, 2), G = (e) => {
		var t = kr();
		z(e, t);
	};
	$(ne, (e) => {
		n.onopen && e(G);
	}), x(k);
	var ie = L(k, 2), ae = (e) => {
		var t = Nr(), n = y(t), i = p(n), a = p(i);
		{
			let e = _(() => I(r(m))), t = _(() => Ve.wide ? 112 : 88);
			Tr(a, {
				get fractions() {
					return r(e);
				},
				get size() {
					return r(t);
				}
			});
		}
		var o = L(a, 2), s = (e) => {
			var t = Ar();
			z(e, t);
		};
		$(o, (e) => {
			r(m).bonus && e(s);
		}), x(i);
		var c = L(i, 2);
		J(c, 21, () => r(g), (e) => e.kind, (e, t) => {
			var n = jr(), i = p(n), a = p(i);
			let o;
			var s = L(a, 1, !0);
			x(i);
			var c = L(i, 2), l = p(c, !0), u = L(l), d = T(u);
			x(c), x(n), D(() => {
				o = K(a, "", o, { background: `var(--${r(t).kind ?? ""})` }), Q(s, r(t).label), Q(l, r(t).n), Q(d, `/${r(t).of ?? ""}`);
			}), z(e, n);
		}), x(c), x(n);
		var l = L(n, 2), u = (e) => {
			var t = Mr(), n = T(t, !0);
			D(() => Q(n, r(v))), z(e, t);
		};
		$(l, (e) => {
			r(v) && e(u);
		});
		var d = L(l, 2), h = p(d), b = p(h);
		let S;
		x(h);
		var C = L(h, 2), w = T(C);
		x(d), D((e, t) => {
			S = K(b, "", S, { width: `${r(f).frac * 100}%` }), Q(w, `${e ?? ""} of ${t ?? ""} XP to level ${r(f).level + 1}`);
		}, [() => r(f).into.toLocaleString(), () => r(f).span.toLocaleString()]), z(e, t);
	};
	$(ie, (e) => {
		a() || e(ae);
	}), x(O);
	var oe = L(O, 2), ce = (e) => {
		var t = Pr();
		D(() => X(t, "aria-label", r(C))), j("click", t, function(...e) {
			n.onopen?.apply(this, e);
		}), z(e, t);
	};
	$(oe, (e) => {
		n.onopen && e(ce);
	}), x(w), D((e) => {
		E = q(w, 1, "tile glass svelte-1handop", null, E, {
			compact: a(),
			opens: n.onopen
		}), X(O, "aria-hidden", n.onopen ? "true" : void 0), M = K(A, "", M, {
			"--a1": r(l),
			"--a2": r(d)
		}), Q(N, e), Q(R, n.person.name), Q(ee, r(b));
	}, [() => n.person.name.slice(0, 1)]), z(t, w), H();
}
l(["click"]);
// src/lib/ui/Sheet.svelte
var Lr = Z("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), Rr = Z("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function zr(t, n) {
	W(n, !0);
	let i = e(n, "from", 3, null), o = 1e3, s = Ve.reducedMotion, c = U(Ze(s ? o : 0)), l = U(0), u = U(1), d = U(!1), f = U("50% 100%"), m, h, g = !1, v = null, b = _(() => s ? +r(d) : Math.min(1, r(c) / 500)), S = _(() => s ? 1 : .5 + .5 * r(c) / o), C = () => {
		g && (r(c) === 0 || r(l) >= r(u)) && (g = !1, n.onclose());
	};
	function w(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = Sr({
					value: r,
					damping: o,
					response: s
				}), n = yr(t, {
					onFrame: e,
					onSettle: C
				}), n.to(i, a);
			}
		};
	}
	let T = w((e) => a(c, e, !0)), E = w((e) => a(l, e, !0));
	function O() {
		g || v || (g = !0, s ? (a(d, !1), setTimeout(n.onclose, xr("--fade"))) : T.to(r(c), 0, { response: .3 }));
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
	var F = { close: O }, I = Rr();
	De("keydown", N, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && O());
	var R = y(I);
	let B, ee;
	var V = L(R, 2);
	let te, ne;
	var G = p(V), re = L(p(G), 2), ie = p(re), ae = (e) => {
		var t = Lr();
		j("click", t, function(...e) {
			n.onback?.apply(this, e);
		}), z(e, t);
	};
	$(ie, (e) => {
		n.onback && e(ae);
	});
	var oe = L(ie, 2);
	Y(oe, (e) => h = e, () => h), x(re), x(G);
	var se = L(G, 2), ce = p(se);
	return xe(ce, () => n.children), x(se), x(V), Y(V, (e) => m = e, () => m), D((e) => {
		B = q(R, 1, "scrim svelte-185xwm9", null, B, { fade: s }), ee = K(R, "", ee, { opacity: e }), te = q(V, 1, "sheet svelte-185xwm9", null, te, { fade: s }), X(V, "aria-label", n.label), ne = K(V, "", ne, {
			opacity: r(b),
			transform: `translate3d(0, ${r(l) ?? ""}px, 0) scale(${r(S) ?? ""})`,
			"transform-origin": r(f)
		});
	}, [() => r(b) * Math.min(1, Math.max(0, 1 - r(l) / r(u)))]), j("click", R, O), j("pointerdown", G, k), j("pointermove", G, A), j("pointerup", G, M), De("pointercancel", G, M), j("click", oe, O), ze(V, "offsetHeight", (e) => a(u, e)), z(t, I), H(F);
}
l([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var Br = Z("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), Vr = Z("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), Hr = Z("<p class=\"caption stale svelte-9nj5u4\"> </p>"), Ur = Z("<!> <!> <!>", 1);
function Wr(e, t) {
	W(t, !0);
	let n = _(() => t.scoredAt ? m(t.scoredAt, t.now) : null);
	var i = Ur(), a = y(i), o = (e) => {
		var n = Br(), r = L(p(n));
		x(n), D(() => Q(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), z(e, n);
	};
	$(a, (e) => {
		t.configError && e(o);
	});
	var s = L(a, 2), c = (e) => {
		var n = Vr(), r = L(p(n));
		x(n), D(() => Q(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), z(e, n);
	};
	$(s, (e) => {
		t.settingsError && e(c);
	});
	var l = L(s, 2), u = (e) => {
		var t = Hr(), i = T(t, !0);
		D(() => Q(i, r(n))), z(e, t);
	};
	$(l, (e) => {
		r(n) && e(u);
	}), z(e, i), H();
}
// node_modules/svelte/src/internal/flags/legacy.js
C();
// src/lib/ui/Toast.svelte
var Gr = Z("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), Kr = Z("<span> </span> <!>", 1), qr = Z("<div role=\"status\" aria-live=\"polite\"><!></div>");
function Jr(e, t) {
	W(t, !1);
	function n() {
		let e = tt.undo;
		Object.assign(tt, {
			on: !1,
			undo: null
		}), e();
	}
	_e();
	var r = qr();
	let i;
	var a = p(r), o = (e) => {
		var t = Kr(), r = y(t), i = T(r, !0), a = L(r, 2), o = (e) => {
			var t = Gr();
			j("click", t, n), z(e, t);
		};
		$(a, (e) => {
			tt.undo && e(o);
		}), D(() => Q(i, tt.text)), z(e, t);
	};
	$(a, (e) => {
		tt.on && e(o);
	}), x(r), D(() => i = q(r, 1, "toast svelte-1fk2ial", null, i, { on: tt.on })), z(e, r), H();
}
l(["click"]);
// src/lib/ui/Together.svelte
var Yr = Z("<p class=\"progress svelte-1tya3no\"> </p>"), Xr = Z("<p> </p>"), Zr = Z("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), Qr = Z("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function $r(e, t) {
	W(t, !0);
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
	var o = Qr(), s = L(p(o), 2), c = (e) => {
		var t = Yr(), i = T(t, !0);
		D(() => Q(i, r(n))), z(e, t);
	};
	$(s, (e) => {
		r(n) && e(c);
	});
	var l = L(s, 2), u = (e) => {
		var n = Xr();
		let a;
		var o = T(n, !0);
		D(() => {
			a = q(n, 1, "reward svelte-1tya3no", null, a, { met: t.group.week.met }), Q(o, r(i));
		}), z(e, n);
	};
	$(l, (e) => {
		r(i) && e(u);
	});
	var d = L(l, 2);
	J(d, 21, () => r(a), (e) => e.k, (e, t) => {
		var n = Zr(), i = p(n), a = T(i, !0), o = L(i), s = p(o, !0), c = L(s), l = T(c, !0);
		x(o), x(n), D(() => {
			Q(a, r(t).k), Q(s, r(t).v), Q(l, r(t).unit);
		}), z(e, n);
	}), x(d), x(o), z(e, o), H();
}
// src/App.svelte
var ei = Z("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), ti = Z("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), ni = Z("<div class=\"tiles compact svelte-1n46o8q\"></div>"), ri = Z("<!> <!>", 1), ii = Z("<div class=\"tiles svelte-1n46o8q\"></div>"), ai = Z("<!> <!> <!> <!>", 1), oi = Z("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function si(e, t) {
	W(t, !0);
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
		a(l, a(d, null), !0), await Te(), e?.focus({ preventScroll: !0 });
	}
	let h = U(null), g = U(null), v = U(Ze(/* @__PURE__ */ new Date())), b;
	async function S() {
		if (clearTimeout(b), !document.hidden) {
			try {
				a(h, await F("scores"), !0), a(g, null), ct(r(h).people), o && Object.hasOwn(r(h).people, o) && o !== B(r(h).viewer, r(h).people).self && a(l, {
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
	let C = _(() => oe(r(h)?.people ?? {}, nt.entry)), w = _(() => Object.keys(r(C))), E = _(() => B(r(h)?.viewer ?? {}, r(C))), O = _(() => r(C)[r(E).self ?? r(w)[0]]?.week), A = (e) => !!r(h)?.viewer?.can_edit?.includes(e), j = _(() => !!r(l) && Object.hasOwn(r(C), r(l).id) || !!r(d) && !!r(h));
	var M = oi(), N = y(M), P = p(N);
	{
		let e = _(() => r(O) ? G(r(O)) : ""), t = _(() => r(h) ? (e) => a(d, { from: e.currentTarget }, !0) : void 0);
		vr(P, {
			title: "Training",
			brand: !0,
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
	var I = L(P, 2), R = p(I), ee = (e) => {
		var t = ti(), n = L(y(t), 2), i = (e) => {
			var t = ei(), n = T(t, !0);
			D(() => Q(n, r(g).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), z(e, t);
		};
		$(n, (e) => {
			r(g) && e(i);
		}), z(e, t);
	}, V = (e) => {
		var t = ai(), n = y(t);
		Wr(n, {
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
		var i = L(n, 2), a = (e) => {
			var t = ri(), n = y(t), i = (e) => {
				var t = ni();
				J(t, 20, () => r(E).others, (e) => e, (e, t) => {
					{
						let n = _(() => r(w).indexOf(t)), i = _(() => u(t));
						Ir(e, {
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
				}), x(t), z(e, t);
			};
			$(n, (e) => {
				r(E).others.length && e(i);
			});
			var a = L(n, 2);
			{
				let e = _(() => r(w).indexOf(r(E).self));
				Ir(a, {
					get person() {
						return r(C)[r(E).self];
					},
					get index() {
						return r(e);
					}
				});
			}
			z(e, t);
		}, o = (e) => {
			var t = ii();
			J(t, 20, () => r(E).others, (e) => e, (e, t) => {
				{
					let n = _(() => r(w).indexOf(t)), i = _(() => u(t));
					Ir(e, {
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
			}), x(t), z(e, t);
		};
		$(i, (e) => {
			r(E).self ? e(a) : e(o, -1);
		});
		var s = L(i, 2), c = (e) => {
			$r(e, {
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
		var l = L(s, 2), d = (e) => {
			{
				let t = _(() => A(r(E).self));
				ar(e, {
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
		}), z(e, t);
	};
	$(R, (e) => {
		r(h) ? e(V, -1) : e(ee);
	}), x(I), x(N);
	var te = L(N, 2), ne = (e) => {
		Y(zr(e, {
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
					pr(e, {
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
	}, re = (e) => {
		zr(e, {
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
				var n = ri(), i = y(n);
				{
					let e = _(() => r(w).indexOf(r(l).id));
					Ir(i, {
						get person() {
							return r(C)[r(l).id];
						},
						get index() {
							return r(e);
						}
					});
				}
				var a = L(i, 2);
				{
					let e = _(() => A(r(l).id));
					ar(a, {
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
				z(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	$(te, (e) => {
		r(d) && r(h) ? e(ne) : r(j) && e(re, 1);
	}), Jr(L(te, 2), {}), D(() => N.inert = r(j)), z(e, M), H();
}
// src/main.js
var ci = (e) => fe(si, { target: e }), li = () => new Promise((e) => {
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
		ge(e);
		let t = e.themes?.darkMode ?? matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.dataset.theme = t ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", li().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", ci(e);
		}));
	}
});
