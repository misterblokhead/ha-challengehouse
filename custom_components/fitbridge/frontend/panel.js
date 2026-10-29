import { $ as e, $t as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Gt as h, H as g, Ht as _, I as v, It as y, J as b, Jt as x, K as S, Kt as C, L as w, Lt as T, M as E, Mt as D, N as O, Nt as k, O as A, Ot as j, P as M, Pt as N, Q as P, Qt as F, R as I, Rt as L, S as ee, St as R, T as te, Tt as z, U as ne, Ut as B, V as re, Vt as V, W as H, Wt as U, X as W, Xt as G, Y as ie, Yt as K, Z as ae, Zt as oe, _ as se, _t as q, a as ce, an as le, at as J, b as ue, bt as de, c as fe, ct as Y, d as pe, dt as me, en as X, et as he, f as ge, ft as _e, g as ve, gt as ye, h as be, ht as xe, i as Se, in as Ce, it as we, j as Te, jt as Ee, k as De, kt as Oe, l as ke, lt as Ae, m as je, mt as Me, n as Ne, nn as Pe, nt as Fe, o as Ie, on as Le, ot as Re, p as ze, pt as Z, q as Be, qt as Q, rt as Ve, s as He, st as Ue, t as We, tn as Ge, tt as Ke, u as qe, ut as Je, v as Ye, vt as $, w as Xe, wt as Ze, x as Qe, xt as $e, y as et, yt as tt, z as nt, zt as rt } from "./shared-BUd3tpul.js";
// src/lib/actions.svelte.js
var it = 5e3, at = h({}), ot = h({}), st = h({
	on: !1,
	text: "",
	undo: null
}), ct = h({
	entry: null,
	at: 0
}), lt = h({ n: 0 }), ut, dt = 0, ft = {};
function pt(e, t = null) {
	clearTimeout(ut), Object.assign(st, {
		on: !0,
		text: e,
		undo: t
	}), ut = setTimeout(() => st.on = !1, it);
}
function mt(e, t = Date.now()) {
	for (let [n, r] of Object.entries(at)) nt(r, e[r.person]?.feed ?? [], t) && delete at[n];
	ct.entry && te(ct, e, t) && (ct.entry = null);
}
async function ht(e, t) {
	try {
		await le("POST", "settings", e);
	} catch (e) {
		return pt(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(ct, {
		entry: e,
		at: Date.now()
	}), mt(t), pt("Saved · updates within 5 min"), !0;
}
async function gt(e, t, n) {
	let r = `${e}/${t}`, i = at[r], a = ++dt, o = t.startsWith("manual:"), s = o && n === "remove" ? null : n === "remove";
	at[r] = {
		person: e,
		key: t,
		want: s,
		at: Date.now(),
		n: a
	}, n === "remove" && !o && pt("Removed", () => gt(e, t, "restore"));
	try {
		await m(ft, r, () => le("POST", "workouts", {
			person: e,
			key: t,
			action: n
		})), ot[r] = s;
	} catch (e) {
		at[r]?.n === a && (i ? at[r] = i : delete at[r]), pt(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
var _t = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
async function vt(e, t) {
	try {
		return await Ce(`feed?person=${encodeURIComponent(e)}&before=${t}`);
	} catch (e) {
		return pt(_t(e)), null;
	}
}
async function yt(e) {
	try {
		await le("POST", "shoes", e);
	} catch (e) {
		return pt(_t(e)), !1;
	}
	return lt.n++, !0;
}
async function bt(e, t, n, r = null, i = "") {
	try {
		await le("POST", "workouts", {
			action: "review",
			person: e,
			key: t,
			decision: n,
			...n === "type" && { type_match: r }
		});
	} catch (e) {
		return pt(_t(e)), !1;
	}
	return lt.n++, pt({
		plan: `Counts for ${i}`,
		run: "Kept as a run",
		type: `Changed to ${i}`
	}[n] ?? "Decision cleared"), !0;
}
async function xt(e, t, n) {
	try {
		await le("POST", "workouts", {
			action: "shoe",
			person: e,
			key: t,
			shoe_id: n
		});
	} catch (e) {
		return pt(_t(e)), !1;
	}
	return lt.n++, pt("Moved to the other shoe"), !0;
}
// src/lib/ui/Connect.svelte
var St = r("<div class=\"url svelte-gy3e4s\"><input readonly=\"\" aria-label=\"Your address\" class=\"svelte-gy3e4s\"/> <button type=\"button\" class=\"btn press\" aria-label=\"Copy address\">Copy</button></div>"), Ct = r("<p class=\"warn svelte-gy3e4s\">This address only works at home.</p>"), wt = r("<p class=\"caption svelte-gy3e4s\"> </p> <div class=\"choice svelte-gy3e4s\"><button type=\"button\" class=\"btn press svelte-gy3e4s\">iPhone</button> <button type=\"button\" class=\"btn press svelte-gy3e4s\">Android</button></div>", 1), Tt = r("<li class=\"svelte-gy3e4s\"> </li>"), Et = r("<ol class=\"svelte-gy3e4s\"></ol>"), Dt = r("<p class=\"caption svelte-gy3e4s\"> <b> </b>, then Add to Home Screen.</p>"), Ot = r("<p> </p> <!> <!> <!> <!>", 1), kt = r("<details class=\"card connect svelte-gy3e4s\"><summary class=\"svelte-gy3e4s\">Connect your phone <small class=\"svelte-gy3e4s\"> </small></summary> <div class=\"inner svelte-gy3e4s\"><!></div></details>"), At = r("<section class=\"card connect svelte-gy3e4s\" aria-label=\"Connect your phone\"><div class=\"inner svelte-gy3e4s\"><h2 class=\"svelte-gy3e4s\">Connect your phone</h2><!></div></section>");
function jt(e, n) {
	G(n, !0);
	let r = (e) => {
		var r = Ot(), i = _(r);
		let a;
		var m = B(i, !0), h = U(i, 2), g = (e) => {
			var t = St(), r = V(t);
			_e(r), Y(r, (e) => C(d, e), () => y(d));
			var i = U(r, 2);
			X(t), L(() => Me(r, n.info.url)), p("focus", r, (e) => e.currentTarget.select()), N("click", i, f), j(e, t);
		};
		z(h, (e) => {
			n.info.url && e(g);
		});
		var v = U(h, 2), b = (e) => {
			var t = Ct();
			j(e, t);
		};
		z(v, (e) => {
			n.info.external || e(b);
		});
		var x = U(v, 2), S = (e) => {
			var t = wt(), n = _(t), r = B(n, !0), i = U(n, 2), a = V(i), s = U(a, 2);
			X(i), L(() => l(r, y(c).title)), N("click", a, () => C(o, "iphone")), N("click", s, () => C(o, "android")), j(e, t);
		}, w = (e) => {
			var t = Et();
			R(t, 20, () => y(c).steps, (e) => e, (e, t) => {
				var n = Tt(), r = B(n, !0);
				L(() => l(r, t)), j(e, n);
			}), X(t), j(e, t);
		};
		z(x, (e) => {
			y(s) ? e(w, -1) : e(S);
		});
		var T = U(x, 2), E = (e) => {
			var r = Dt(), i = V(r), a = U(i), o = B(a, !0);
			t(), X(r), L(() => {
				l(i, `Open openGym at ${n.info.opengym.url ?? ""}, choose Create new profile, enter code `), l(o, n.info.opengym.invite);
			}), j(e, r);
		};
		z(T, (e) => {
			n.info.opengym?.invite && e(E);
		}), L(() => {
			a = $(i, 1, "status svelte-gy3e4s", null, a, { ok: y(u).state === "connected" }), l(m, y(u).text);
		}), j(e, r);
	}, i = J(n, "person", 3, null), a = J(n, "collapsed", 3, !1), o = Q(null), s = x(() => n.info.phone ?? y(o)), c = x(() => Qe(y(s))), u = x(() => ue(n.info, n.now, i())), d = Q(void 0);
	async function f() {
		y(d).focus(), y(d).setSelectionRange(0, y(d).value.length);
		let e = !1;
		try {
			await navigator.clipboard.writeText(n.info.url), e = !0;
		} catch {
			try {
				e = document.execCommand("copy");
			} catch {}
		}
		pt(e ? "Copied" : "Select and copy the address");
	}
	var m = Oe(), h = _(m), g = (e) => {
		var t = kt(), n = V(t), i = U(V(n)), a = B(i, !0);
		X(n);
		var o = U(n, 2), s = V(o);
		r(s), X(o), X(t), L(() => l(a, y(u).state === "connected" ? "Connected" : "Waiting")), j(e, t);
	}, v = (e) => {
		var t = At(), n = V(t), i = U(V(n));
		r(i), X(n), X(t), j(e, t);
	};
	z(h, (e) => {
		a() ? e(g) : e(v, -1);
	}), j(e, m), K();
}
k(["click"]);
// src/lib/ui/Badges.svelte
var Mt = r("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), Nt = r("<ul class=\"svelte-m8wnum\"></ul>"), Pt = r("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), Ft = r("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), It = r("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function Lt(e, t) {
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
	}, r = (e) => n[String(e.icon).replace(/^mdi:/, "")] ?? "🏅", i = (e) => e.toLocaleString(void 0, { maximumFractionDigits: 1 });
	var a = It(), o = V(a), s = (e) => {
		var n = Nt();
		R(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = Mt(), i = V(n), a = B(i, !0), o = U(i, 2), s = B(o, !0), c = U(o, 2), u = B(c, !0);
			X(n), L((e, n) => {
				l(a, e), l(s, y(t).title), l(u, n);
			}, [() => r(y(t)), () => W(y(t).unlocked_at)]), j(e, n);
		}), X(n), j(e, n);
	};
	z(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = U(o, 2), u = (e) => {
		var n = Nt();
		R(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = Pt(), a = V(n), o = B(a, !0), s = U(a, 2), c = B(s, !0), u = U(s, 2), d = B(u), f = U(u, 2), p = V(f);
			let m;
			X(f), X(n), L((e, n, r, i) => {
				l(o, e), l(c, y(t).title), l(d, `${n ?? ""} of ${r ?? ""}`), m = q(p, "", m, { width: i });
			}, [
				() => r(y(t)),
				() => i(y(t).current),
				() => i(y(t).target),
				() => `${Math.min(1, y(t).current / y(t).target) * 100}%`
			]), j(e, n);
		}), X(n), j(e, n);
	};
	z(c, (e) => {
		t.badges.next.length && e(u);
	});
	var d = U(c, 2), f = (e) => {
		var t = Ft();
		j(e, t);
	};
	z(d, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(f);
	}), X(a), j(e, a), K();
}
// src/lib/ui/FeedRow.svelte
var Rt = r("<span class=\"mini svelte-69s4be\"> </span>"), zt = r("<span> </span>"), Bt = r("<span class=\"mini svelte-69s4be\">Together</span>"), Vt = r("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), Ht = r("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), Ut = r("<span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span>", 1), Wt = r("<button type=\"button\" class=\"head svelte-69s4be\"><!></button>"), Gt = r("<div class=\"head svelte-69s4be\"><!></div>"), Kt = r("<li><!></li>");
function qt(e, t) {
	G(t, !0);
	let n = (e) => {
		var n = Ut(), o = _(n), s = B(o, !0), c = U(o, 2), u = V(c), d = V(u), f = U(d), p = (e) => {
			var t = Rt(), n = B(t, !0);
			L(() => l(n, y(a).plan)), j(e, t);
		};
		z(f, (e) => {
			y(a).plan && e(p);
		});
		var m = U(f, 2), h = (e) => {
			var t = zt();
			let n;
			var r = B(t, !0);
			L(() => {
				n = $(t, 1, "mini svelte-69s4be", null, n, { warn: y(a).chip.tone === "warn" }), l(r, y(a).chip.text);
			}), j(e, t);
		};
		z(m, (e) => {
			y(a).chip && e(h);
		});
		var g = U(m, 2), v = (e) => {
			var t = Bt();
			j(e, t);
		};
		z(g, (e) => {
			t.item.joint && e(v);
		});
		var b = U(g, 2), x = (e) => {
			var t = Vt();
			j(e, t);
		};
		z(b, (e) => {
			t.record && e(x);
		}), X(u);
		var S = U(u, 2), C = B(S);
		X(c);
		var w = U(c, 2), T = V(w), E = (e) => {
			var t = Ht();
			j(e, t);
		};
		z(T, (e) => {
			y(i) && e(E);
		});
		var D = U(T);
		X(w), L(() => {
			$(o, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), l(s, r[t.item.kind] ?? "💪"), l(d, `${y(a).title ?? ""} `), l(C, `${y(a).when ?? ""} · ${y(a).duration ?? ""}`), l(D, ` ${(y(a).removable === "restore" ? "Removed" : y(a).label ?? (y(a).xp && `${y(a).xp} XP`)) ?? ""}`);
		}), j(e, n);
	}, r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, i = x(() => at[`${t.person}/${t.item.key}`]), a = x(() => o(y(i) && y(i).want !== null ? {
		...t.item,
		excluded: y(i).want
	} : t.item)), s = x(() => y(i)?.want === null), c = x(() => t.item.kind !== "active_day");
	var u = Kt();
	let d;
	var f = V(u), p = (e) => {
		var r = Wt(), i = V(r);
		n(i), X(r), N("click", r, () => t.onopen(t.item)), j(e, r);
	}, m = (e) => {
		var t = Gt(), r = V(t);
		n(r), X(t), j(e, t);
	};
	z(f, (e) => {
		y(c) ? e(p) : e(m, -1);
	}), X(u), L(() => d = $(u, 1, "svelte-69s4be", null, d, {
		dim: y(a).removable === "restore" || y(s),
		grey: !!y(a).label
	})), j(e, u), K();
}
k(["click"]);
// src/lib/ui/Feed.svelte
var Jt = r("<ul class=\"card svelte-n1344i\"></ul>"), Yt = r("<p class=\"caption empty svelte-n1344i\">No workouts in the last 90 days.</p>"), Xt = r("<button type=\"button\" class=\"btn older svelte-n1344i\">Load older</button>"), Zt = r("<!> <!>", 1);
function Qt(e, t) {
	G(t, !0);
	let n = Q(h([])), r = Q(!0), i = Q(!1), a = null, o = x(() => f(t.items, w(y(n), t.person, ot)));
	async function s() {
		C(i, !0);
		let e = a ?? y(o).at(-1)?.start.slice(0, 10) ?? v(O(), 88), s = await vt(t.person, e);
		C(i, !1), s && (C(n, f(y(n), s.items), !0), a = v(e, 90), C(r, s.more, !0));
	}
	var c = Zt(), l = _(c), u = (e) => {
		var n = Jt();
		R(n, 21, () => y(o), (e) => e.key, (e, n) => {
			{
				let r = x(() => t.records?.has(y(n).key));
				qt(e, {
					get person() {
						return t.person;
					},
					get item() {
						return y(n);
					},
					get record() {
						return y(r);
					},
					get onopen() {
						return t.onopen;
					}
				});
			}
		}), X(n), j(e, n);
	}, d = (e) => {
		var t = Yt();
		j(e, t);
	};
	z(l, (e) => {
		y(o).length ? e(u) : e(d, -1);
	});
	var p = U(l, 2), m = (e) => {
		var t = Xt();
		L(() => t.disabled = y(i)), N("click", t, s), j(e, t);
	};
	z(p, (e) => {
		y(r) && e(m);
	}), j(e, c), K();
}
k(["click"]);
// src/lib/ui/PlanBar.svelte
var $t = r("<span> </span>"), en = r("<i class=\"svelte-1y5m0aq\"></i>"), tn = r("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), nn = r("<span class=\"review svelte-1y5m0aq\"> </span>"), rn = r("<p class=\"caption prog svelte-1y5m0aq\"> <!></p>"), an = r("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!> <!></div>");
function on(e, n) {
	G(n, !0);
	let r = x(() => i(n.plan)), a = x(() => Math.round(((n.plan.warmup_s ?? 0) + n.plan.intervals.reduce((e, [, t]) => e + t, 0) + (n.plan.cooldown_s ?? 0)) / 60)), o = x(() => re(n.plan));
	var c = an(), u = V(c), d = V(u), f = B(d, !0), p = U(d, 2), m = (e) => {
		var t = $t();
		let r;
		var i = B(t, !0);
		L(() => {
			r = $(t, 1, "tag svelte-1y5m0aq", null, r, { due: n.plan.due_today }), l(i, n.plan.due_today ? "Due today" : "Rest day");
		}), j(e, t);
	};
	z(p, (e) => {
		y(r).length && e(m);
	}), X(u);
	var h = U(u, 2), g = (e) => {
		var n = tn(), i = _(n);
		R(i, 21, () => y(r), s, (e, t) => {
			var n = en();
			let r;
			L(() => r = q(n, "", r, {
				"flex-grow": y(t).frac,
				background: `var(--${y(t).kind === "run" ? "run" : "fill"})`
			})), j(e, n);
		}), X(i);
		var o = U(i, 2), c = V(o), u = V(c);
		q(u, "", {}, { background: "var(--run)" });
		var d = U(u, 2);
		q(d, "", {}, { background: "var(--fill)" }), t(), X(c);
		var f = U(c, 2), p = B(f);
		X(o), L(() => {
			Z(i, "aria-label", `Run and walk intervals, ${y(a) ?? ""} minutes in total`), l(p, `${y(a) ?? ""} min`);
		}), j(e, n);
	};
	z(h, (e) => {
		y(r).length && e(g);
	});
	var v = U(h, 2), b = (e) => {
		var t = rn(), r = V(t, !0), i = U(r), a = (e) => {
			var t = nn(), r = B(t);
			L(() => l(r, `${y(o) ? " · " : ""}${n.plan.review_pending ?? ""} ${n.plan.review_pending === 1 ? "run" : "runs"} to review`)), j(e, t);
		};
		z(i, (e) => {
			n.plan.review_pending && e(a);
		}), X(t), L(() => l(r, y(o))), j(e, t);
	};
	z(v, (e) => {
		(y(o) || n.plan.review_pending) && e(b);
	}), X(c), L(() => l(f, n.plan.state)), j(e, c), K();
}
// src/lib/gesture.js
var sn = (e, t = .998) => e / 1e3 * t / (1 - t), cn = (e, t, n) => e + sn(t) > n / 2;
function ln(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var un = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), dn = r("<h2 class=\"svelte-9pi54v\"> </h2> <button type=\"button\" class=\"close press svelte-9pi54v\" aria-label=\"Close\">✕</button>", 1), fn = r("<div class=\"grab drag svelte-9pi54v\"><!></div>"), pn = r("<div class=\"grab svelte-9pi54v\"><!></div>"), mn = r("<dialog><!> <div class=\"body svelte-9pi54v\"><!></div></dialog>");
function hn(e, t) {
	let n = D();
	G(t, !0);
	let r = (e) => {
		var r = dn(), i = _(r), a = B(i, !0), o = U(i, 2);
		L(() => {
			Z(i, "id", `${n}-t`), l(a, t.title);
		}), N("click", o, () => s.close()), j(e, r);
	}, i = J(t, "drag", 3, !1), a = J(t, "wide", 3, !1), o = J(t, "onclose", 3, null), s, c, u = Q(0), d = null, f = Q(!1), m = !1, h = !1;
	function g() {
		return s.open ? null : (m = document.documentElement.style.overflow !== "hidden", m && (document.documentElement.style.overflow = "hidden"), s.showModal(), c);
	}
	function v() {
		s.close();
	}
	function b() {
		m && (document.documentElement.style.overflow = ""), m = !1, C(u, 0), o()?.();
	}
	function x(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), d = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, C(f, !0));
	}
	function S(e) {
		d && (C(u, Math.max(0, e.clientY - d.start), !0), d.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), d.samples.length > 8 && d.samples.shift());
	}
	function w(e) {
		if (!d) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = ln([...d.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		d = null, C(f, !1), cn(y(u), n, s.offsetHeight) ? s.close() : C(u, 0);
	}
	var T = {
		show: g,
		close: v
	}, E = mn();
	let O, k;
	var A = V(E), M = (e) => {
		var t = fn(), n = V(t);
		r(n), X(t), N("pointerdown", t, x), N("pointermove", t, S), N("pointerup", t, w), p("pointercancel", t, w), j(e, t);
	}, P = (e) => {
		var t = pn(), n = V(t);
		r(n), X(t), j(e, t);
	};
	z(A, (e) => {
		i() ? e(M) : e(P, -1);
	});
	var F = U(A, 2), I = V(F);
	return $e(I, () => t.children), X(F), Y(F, (e) => c = e, () => c), X(E), Y(E, (e) => s = e, () => s), L(() => {
		Z(E, "aria-labelledby", `${n}-t`), O = $(E, 1, "svelte-9pi54v", null, O, {
			wide: a(),
			dragging: y(f)
		}), k = q(E, "", k, { transform: y(u) ? `translateY(${y(u)}px)` : null });
	}), N("pointerdown", E, (e) => h = e.target === s), N("click", E, (e) => e.target === s && h && s.close()), p("close", E, b), N("keydown", E, (e) => e.key === "Escape" && e.stopPropagation()), j(e, E), K(T);
}
k([
	"click",
	"pointerdown",
	"keydown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/RecordsDialog.svelte
var gn = r("<li class=\"svelte-18znx9k\"><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), _n = r("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1);
function vn(e, t) {
	G(t, !0);
	let n;
	function r(e = null) {
		let t = n.show();
		t && (t.scrollTop = 0, e && t.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	var i = { open: r };
	return Y(hn(e, {
		title: "All records",
		drag: !0,
		children: (e, n) => {
			var r = Oe(), i = _(r);
			R(i, 17, () => t.groups, (e) => e.group, (e, t) => {
				var n = _n(), r = _(n), i = B(r, !0), a = U(r, 2);
				R(a, 21, () => y(t).lifts, (e) => e.id, (e, t) => {
					var n = gn(), r = V(n), i = V(r), a = U(i), o = B(a, !0), s = U(a);
					X(r), X(n), L((e, n) => {
						l(i, `${y(t).name ?? ""} · `), l(o, e), l(s, ` · ${n ?? ""}`);
					}, [() => E(y(t)), () => W(y(t).date)]), j(e, n);
				}), X(a), L(() => {
					Z(r, "data-group", y(t).group), l(i, y(t).group);
				}), j(e, n);
			}), j(e, r);
		},
		$$slots: { default: !0 }
	}), (e) => n = e, () => n), K(i);
}
// src/lib/ui/StepBars.svelte
var yn = r("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), bn = r("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), xn = r("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function Sn(e, t) {
	G(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), r = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var i = xn(), a = V(i);
	R(a, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = yn();
		let i;
		var a = V(n), o = V(a);
		let s, c;
		X(a);
		var u = U(a, 2), d = B(u, !0);
		X(n), L((e) => {
			Z(n, "aria-label", e), Z(n, "aria-hidden", y(t).future ? "true" : void 0), Z(n, "aria-current", y(t).isToday ? "date" : void 0), i = $(n, 1, "svelte-1f099m", null, i, { today: y(t).isToday }), s = $(o, 1, "svelte-1f099m", null, s, {
				active: y(t).active,
				future: y(t).future
			}), c = q(o, "", c, { height: `${y(t).frac * 100}%` }), l(d, y(t).label);
		}, [() => y(t).future ? void 0 : r(y(t))]), j(e, n);
	}), X(a);
	var o = U(a, 2), s = (e) => {
		var n = bn();
		let r;
		L(() => r = q(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), j(e, n);
	};
	z(o, (e) => {
		t.goalFrac !== null && e(s);
	}), X(i), j(e, i), K();
}
// src/lib/ui/Progress.svelte
var Cn = r("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), wn = r("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), Tn = r("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), En = r("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), Dn = r("<span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span>", 1), On = r("<button type=\"button\" class=\"row svelte-kr1x1f\"><!></button>"), kn = r("<div class=\"row svelte-kr1x1f\"><!></div>"), An = r("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), jn = r("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function Mn(t, n) {
	G(n, !0);
	let r = x(() => n.person.week.goal.steps ?? 0), i = x(() => Ke(n.person.steps_week, y(r), O())), a = x(() => n.person.pbs.lifts ?? []), o = x(() => c(y(a))), s, u = x(() => n.person.pbs.fastest_1k), d = x(() => n.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var f = jn(), p = _(f), m = (t) => {
		var n = Cn(), r = V(n);
		Sn(r, {
			get bars() {
				return y(i).bars;
			},
			get goalFrac() {
				return y(i).goalFrac;
			}
		});
		var a = U(r, 2), o = B(a, !0);
		X(n), L((e) => l(o, e), [() => e(y(i).bars)]), j(t, n);
	};
	z(p, (e) => {
		y(i) && e(m);
	});
	var h = U(p, 2), g = V(h), v = (e) => {
		var t = Tn(), n = _(t);
		R(n, 21, () => y(o), (e) => e.group, (e, t) => {
			var n = wn(), r = V(n), i = V(r), a = B(i, !0), o = U(i), c = V(o), u = U(c), d = B(u, !0);
			X(o), X(r), X(n), L((e) => {
				l(a, y(t).group), l(c, `${y(t).lift.name ?? ""} · `), l(d, e);
			}, [() => E(y(t).lift)]), N("click", r, () => s.open(y(t).group)), j(e, n);
		}), X(n);
		var r = U(n, 2), i = B(r);
		L(() => l(i, `All records (${y(a).length ?? ""})`)), N("click", r, () => s.open()), j(e, t);
	}, b = (e) => {
		var t = En();
		j(e, t);
	};
	z(g, (e) => {
		y(a).length ? e(v) : e(b, -1);
	}), X(h);
	var S = U(h, 2), C = V(S), w = (e) => {
		let t = (e) => {
			var t = Dn(), n = U(_(t), 2), r = B(n);
			L((e, t) => l(r, `${e ?? ""} · ${t ?? ""}`), [() => I(y(u).seconds), () => W(y(u).date)]), j(e, t);
		};
		var r = Oe(), i = _(r), a = (e) => {
			var r = On(), i = V(r);
			t(i), X(r), N("click", r, () => n.onopen({ key: y(u).key })), j(e, r);
		}, o = (e) => {
			var n = kn(), r = V(n);
			t(r), X(n), j(e, n);
		};
		z(i, (e) => {
			y(u).key ? e(a) : e(o, -1);
		}), j(e, r);
	}, T = (e) => {
		var t = An();
		j(e, t);
	};
	z(C, (e) => {
		y(u) ? e(w) : e(T, -1);
	});
	var D = U(C, 2), k = U(V(D)), M = B(k);
	X(D);
	var P = U(D, 2), F = U(V(P)), ee = B(F);
	X(P), X(S);
	var te = U(S, 2);
	{
		let e = x(() => A(y(a)));
		Y(vn(te, { get groups() {
			return y(e);
		} }), (e) => s = e, () => s);
	}
	L((e) => {
		l(M, `${e ?? ""} km`), l(ee, `${y(d) ?? ""} t`);
	}, [() => n.person.pbs.longest_session_km.toFixed(1)]), j(t, f), K();
}
k(["click"]);
// src/lib/ui/Shoes.svelte
var Nn = r("<span class=\"label svelte-eu7fja\"> </span>"), Pn = r("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), Fn = r("<ul class=\"card svelte-eu7fja\"></ul>");
function In(e, t) {
	G(t, !0);
	let n = x(() => t.shoes.map(b));
	var r = Fn();
	R(r, 23, () => y(n), (e, n) => t.shoes[n].id, (e, t) => {
		var n = Pn(), r = V(n), i = V(r), a = B(i, !0), o = U(i), s = B(o, !0);
		X(r);
		var c = U(r, 2), u = V(c);
		let d;
		X(c);
		var f = U(c, 2), p = V(f), m = B(p, !0), h = U(p, 2), g = (e) => {
			var n = Nn(), r = B(n, !0);
			L(() => l(r, y(t).label)), j(e, n);
		};
		z(h, (e) => {
			y(t).label && e(g);
		}), X(f), X(n), L(() => {
			$(n, 1, tt(y(t).state), "svelte-eu7fja"), l(a, y(t).name), l(s, y(t).km), d = q(u, "", d, { width: `${y(t).frac * 100}%` }), l(m, y(t).detail);
		}), j(e, n);
	}), X(r), j(e, r), K();
}
// src/lib/ui/ShoesDialog.svelte
var Ln = r("<span class=\"mini svelte-1bogt6u\">Current</span>"), Rn = r("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), zn = r("<button type=\"button\" class=\"btn\">Set current</button>"), Bn = r("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Vn = r("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), Hn = r("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe until you set one.</p>"), Un = r("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), Wn = r("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), Gn = r("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), Kn = r("<!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form>", 1);
function qn(e, n) {
	G(n, !0);
	let r = x(() => n.shoes.map((e) => ({
		...b(e),
		id: e.id,
		limit: e.limit,
		current: !!e.current
	}))), i, a = Q(""), o = Q(h(700)), s = Q(null), c = Q(!1), u = Q(null);
	function d() {
		i.show();
	}
	function f() {
		C(u, null), C(s, null);
	}
	async function m(e) {
		C(c, !0);
		let t = await yt(e);
		return C(c, !1), t;
	}
	async function g(e) {
		e.preventDefault();
		let t = S(y(a), y(o));
		C(s, t.error ?? null, !0), !y(s) && await m({
			op: "add",
			person: n.person,
			...t
		}) && C(a, "");
	}
	async function v(e, t) {
		let n = S(void 0, e.currentTarget.value, { partial: !0 });
		C(s, n.error ?? null, !0), y(s) ? e.currentTarget.value = t.limit : n.replace_at_km !== t.limit && await m({
			op: "update",
			id: t.id,
			...n
		});
	}
	async function w(e) {
		C(u, null), await m({
			op: "retire",
			id: e.id
		});
	}
	var T = { open: d };
	return Y(hn(e, {
		title: "Manage shoes",
		onclose: f,
		children: (e, i) => {
			var d = Kn(), f = _(d), h = (e) => {
				var i = Un(), a = _(i);
				R(a, 21, () => y(r), (e) => e.id, (e, r) => {
					var i = Vn(), a = V(i), o = V(a), s = V(o, !0), d = U(s), f = (e) => {
						var t = Ln();
						j(e, t);
					};
					z(d, (e) => {
						y(r).current && e(f);
					}), X(o);
					var p = U(o, 2), h = B(p, !0);
					X(a);
					var g = U(a, 2), b = V(g), x = U(V(b));
					_e(x), t(), X(b);
					var S = U(b, 2), T = (e) => {
						var t = Rn(), n = _(t), i = B(n), a = U(n, 2), o = U(a, 2);
						L(() => {
							l(i, `Retire ${y(r).name ?? ""}?`), o.disabled = y(c);
						}), N("click", a, () => C(u, null)), N("click", o, () => w(y(r))), j(e, t);
					}, E = (e) => {
						var t = Bn(), i = _(t), a = (e) => {
							var t = zn();
							L(() => t.disabled = y(c)), N("click", t, () => m({
								op: "current",
								person: n.person,
								id: y(r).id
							})), j(e, t);
						};
						z(i, (e) => {
							y(r).current || e(a);
						});
						var o = U(i, 2);
						L(() => o.disabled = y(c)), N("click", o, () => C(u, y(r).id, !0)), j(e, t);
					};
					z(S, (e) => {
						y(u) === y(r).id ? e(T) : e(E, -1);
					}), X(g), X(i), L(() => {
						l(s, y(r).name), l(h, y(r).km), Z(x, "min", be.replace_at_km[0]), Z(x, "max", be.replace_at_km[1]), Z(x, "step", be.replace_at_km[2]), Me(x, y(r).limit), x.disabled = y(c);
					}), N("change", x, (e) => v(e, y(r))), j(e, i);
				}), X(a);
				var o = U(a, 2), s = (e) => {
					var t = Hn();
					j(e, t);
				}, d = x(() => !y(r).some((e) => e.current));
				z(o, (e) => {
					y(d) && e(s);
				}), j(e, i);
			}, b = (e) => {
				var t = Wn();
				j(e, t);
			};
			z(f, (e) => {
				y(r).length ? e(h) : e(b, -1);
			});
			var S = U(f, 2), T = U(V(S), 2), E = U(V(T));
			_e(E), X(T);
			var D = U(T, 2), O = U(V(D));
			_e(O), X(D);
			var k = U(D, 2), A = (e) => {
				var t = Gn(), n = B(t, !0);
				L(() => l(n, y(s))), j(e, t);
			};
			z(k, (e) => {
				y(s) && e(A);
			});
			var M = U(k, 2);
			X(S), L(() => {
				Z(E, "maxlength", be.name[1]), E.disabled = y(c), Z(O, "min", be.replace_at_km[0]), Z(O, "max", be.replace_at_km[1]), Z(O, "step", be.replace_at_km[2]), O.disabled = y(c), M.disabled = y(c);
			}), p("submit", S, g), me(E, () => y(a), (e) => C(a, e)), me(O, () => y(o), (e) => C(o, e)), j(e, d);
		},
		$$slots: { default: !0 }
	}), (e) => i = e, () => i), K(T);
}
k(["change", "click"]);
// src/lib/ui/WorkoutDialog.svelte
var Jn = r("<p class=\"msg\" role=\"status\"> </p>"), Yn = r("<p class=\"msg\" role=\"status\">Loading…</p>"), Xn = r("<span class=\"mini svelte-1uaoa1p\"> </span>"), Zn = r("<span class=\"mini off svelte-1uaoa1p\"> </span>"), Qn = r("<div><dt class=\"svelte-1uaoa1p\"> </dt><dd class=\"svelte-1uaoa1p\"> </dd></div>"), $n = r("<option disabled=\"\"> </option>"), er = r("<option> </option>"), tr = r("<div class=\"shoe svelte-1uaoa1p\"><dt class=\"svelte-1uaoa1p\"><label>Shoe</label></dt><dd class=\"svelte-1uaoa1p\"><select class=\"svelte-1uaoa1p\"><!><!></select></dd></div>"), nr = r("<dl class=\"svelte-1uaoa1p\"><!> <!></dl>"), rr = r("<p class=\"caption note svelte-1uaoa1p\"> </p>"), ir = r("<p> </p>"), ar = r("<p class=\"check svelte-1uaoa1p\"> </p>"), or = r("<button type=\"button\">Not a run…</button>"), sr = r("<select aria-label=\"Change the type to\" class=\"svelte-1uaoa1p\"><option disabled=\"\">Choose a type</option><!><!></select>"), cr = r("<button type=\"button\" class=\"link svelte-1uaoa1p\">Clear decision</button>"), lr = r("<div class=\"acts review svelte-1uaoa1p\"><button type=\"button\">Counts for the plan day</button> <button type=\"button\">A run, not the programme</button> <!> <!> <!></div>"), ur = r("<h3 class=\"svelte-1uaoa1p\">Programme</h3> <!> <!>", 1), dr = r("<p class=\"caption note svelte-1uaoa1p\">Map unavailable</p>"), fr = r("<div class=\"ph svelte-1uaoa1p\" aria-hidden=\"true\"></div>"), pr = r("<h3 class=\"svelte-1uaoa1p\"> </h3> <!>", 1), mr = r("<!> <!>", 1), hr = r("<li class=\"svelte-1uaoa1p\"><span class=\"zn svelte-1uaoa1p\"> <small class=\"svelte-1uaoa1p\"> </small></span> <span class=\"bar svelte-1uaoa1p\"><span class=\"svelte-1uaoa1p\"></span></span> <span class=\"num svelte-1uaoa1p\"> </span></li>"), gr = r("<h3 class=\"svelte-1uaoa1p\">Heart-rate zones</h3> <ul class=\"zones svelte-1uaoa1p\"></ul>", 1), _r = r("<tr><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td></tr>"), vr = r("<h3 class=\"svelte-1uaoa1p\">Splits</h3> <table class=\"svelte-1uaoa1p\"><thead><tr><th class=\"svelte-1uaoa1p\">Km</th><th class=\"svelte-1uaoa1p\">Time</th><th class=\"svelte-1uaoa1p\"> </th><th class=\"svelte-1uaoa1p\">HR</th><th class=\"svelte-1uaoa1p\">Climb</th></tr></thead><tbody></tbody></table>", 1), yr = r("<span role=\"img\" aria-label=\"Record\">🏆</span>"), br = r("<li class=\"svelte-1uaoa1p\"> <b class=\"svelte-1uaoa1p\"> </b><!></li>"), xr = r("<h3 class=\"svelte-1uaoa1p\">Exercises</h3> <ul class=\"gym svelte-1uaoa1p\"><!> <li class=\"vol svelte-1uaoa1p\">Total volume · <b class=\"svelte-1uaoa1p\"> </b></li></ul>", 1), Sr = r("<span class=\"ask svelte-1uaoa1p\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1uaoa1p\">Delete</button>", 1), Cr = r("<button type=\"button\"> </button>"), wr = r("<div class=\"acts svelte-1uaoa1p\"><!></div>"), Tr = r("<p class=\"sub svelte-1uaoa1p\"> <!> <!></p> <!> <!> <!> <!> <!> <!> <!> <!>", 1);
function Er(e, n) {
	let r = D();
	G(n, !0);
	let i = J(n, "shoes", 3, null), a = J(n, "reviewTypes", 19, () => ({})), c = () => import("./viz-BQUAc_tO.js"), u, d = Q(null), f = Q(null), p = Q(null), m = Q(null), h = Q(null), g = Q(!1), v = Q(!1), b = 0;
	async function S(e) {
		let t = u.show();
		if (!t) return;
		let r = ++b;
		C(d, e), C(f, C(p, C(h, null))), C(g, C(v, !1), !0), t.scrollTop = 0;
		try {
			let t = await Ce(`workout?person=${encodeURIComponent(n.person)}&key=${encodeURIComponent(e.key)}`);
			if (r !== b) return;
			C(f, t), (t.route?.length || t.series) && !y(m) && c().then((e) => C(m, e), (e) => r === b && C(h, e));
		} catch (e) {
			r === b && C(p, e);
		}
	}
	function w() {
		b++, C(d, C(f, null));
	}
	let T = x(() => y(d) && `${n.person}/${y(d).key}`), E = x(() => y(T) && at[y(T)]), O = x(() => {
		if (!y(d)) return null;
		let e = n.feed.find((e) => e.key === y(d).key) ?? {
			...y(f)?.summary,
			...y(d),
			excluded: ot[y(T)] ?? y(d).excluded ?? !1
		};
		return y(E) && y(E).want !== null ? {
			...e,
			excluded: y(E).want
		} : e;
	}), k = x(() => y(f) && y(O) ? Se(n.viewer, n.person, y(O)) : {
		remove: null,
		shoe: !1
	}), A = x(() => y(k).shoe && i() ? Be(i(), n.runShoes?.[y(d).key]) : null), M = x(() => y(f) && He(y(f).summary)), P = x(() => y(f) ? ce(y(f)).filter(([e]) => !(e === "Shoe" && y(A)?.options.length)) : []), F = x(() => y(f) && Ne(y(f))), I = x(() => y(f) && ge(y(f).zones, y(f).max_hr)), ee = x(() => y(f) ? pe(y(f)) : []), te = x(() => y(f) && Ie(y(f).gym)), ne = x(() => y(f) && qe(y(f))), re = x(() => y(O)?.check ?? null), H = x(() => y(O)?.review ?? null), W = x(() => a()[y(O)?.source] ?? []), ie = x(() => y(O)?.km && y(O).minutes ? y(O).km / (y(O).minutes / 60) : null), ae = (e) => e.status === 404 ? "Workout not found" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant";
	async function oe(e) {
		let t = e.currentTarget;
		await xt(n.person, y(d).key, Number(t.value)) || (t.value = String(y(A).value));
	}
	let se = (e, t = null, r = "") => bt(n.person, y(d).key, e, t, r);
	async function le(e) {
		let t = e.currentTarget.value;
		await se("type", t, y(W).find((e) => e.match === t)?.name ?? t);
	}
	let ue = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function me() {
		y(k).remove === "delete" ? C(g, !0) : gt(n.person, y(d).key, y(k).remove);
	}
	var he = { open: S };
	{
		let i = x(() => y(M)?.title ?? y(d)?.name ?? "Workout");
		Y(hn(e, {
			get title() {
				return y(i);
			},
			drag: !0,
			wide: !0,
			onclose: w,
			children: (e, i) => {
				var a = Oe(), c = _(a), b = (e) => {
					var t = Jn(), n = B(t, !0);
					L((e) => l(n, e), [() => ae(y(p))]), j(e, t);
				}, S = (e) => {
					var t = Yn();
					j(e, t);
				}, w = (e) => {
					var i = Tr(), a = _(i), c = V(a), p = U(c), b = (e) => {
						var t = Xn(), n = B(t, !0);
						L(() => l(n, y(M).plan)), j(e, t);
					};
					z(p, (e) => {
						y(M).plan && e(b);
					});
					var S = U(p, 2), w = (e) => {
						var t = Zn(), n = B(t, !0);
						L((e) => l(n, e), [() => o(y(O)).label]), j(e, t);
					}, T = x(() => y(O) && o(y(O)).label);
					z(S, (e) => {
						y(T) && e(w);
					}), X(a);
					var D = U(a, 2), G = (e) => {
						var t = nr(), n = V(t);
						R(n, 17, () => y(P), ([e, t]) => e, (e, t) => {
							var n = x(() => Pe(y(t), 2));
							let r = () => y(n)[0], i = () => y(n)[1];
							var a = Qn(), o = V(a), s = B(o, !0), c = U(o), u = B(c, !0);
							X(a), L(() => {
								l(s, r()), l(u, i());
							}), j(e, a);
						});
						var i = U(n, 2), a = (e) => {
							var t = tr(), n = V(t), i = B(n), a = U(n), o = V(a), s = V(o), c = (e) => {
								var t = $n(), n = B(t, !0);
								t.value = t.__value = "", L(() => l(n, y(A).extra)), j(e, t);
							};
							z(s, (e) => {
								y(A).extra && e(c);
							});
							var u = U(s);
							R(u, 17, () => y(A).options, (e) => e.id, (e, t) => {
								var n = er(), r = B(n, !0), i = {};
								L(() => {
									l(r, y(t).label), i !== (i = y(t).id) && (n.value = (n.__value = i) ?? "");
								}), j(e, n);
							}), X(o);
							var d;
							xe(o), X(a), X(t), L(() => {
								Z(i, "for", `${r}-shoe`), Z(o, "id", `${r}-shoe`), d !== (d = y(A).value) && (o.value = (o.__value = d) ?? "", ye(o, d));
							}), N("change", o, oe), j(e, t);
						};
						z(i, (e) => {
							y(A)?.options.length && e(a);
						}), X(t), j(e, t);
					};
					z(D, (e) => {
						(y(P).length || y(A)?.options.length) && e(G);
					});
					var K = U(D, 2), ae = (e) => {
						var t = rr(), n = B(t, !0);
						L((e) => l(n, e), [() => fe(y(f).note)]), j(e, t);
					}, ce = x(() => fe(y(f).note));
					z(K, (e) => {
						y(ce) && e(ae);
					});
					var J = U(K, 2), Y = (e) => {
						var t = ur(), n = U(_(t), 2), r = (e) => {
							var t = ir();
							let n;
							var r = B(t, !0);
							L((e) => {
								n = $(t, 1, "check svelte-1uaoa1p", null, n, { warn: y(O).needs_review }), l(r, e);
							}, [() => ve(y(re), y(ie))]), j(e, t);
						}, i = (e) => {
							var t = ar(), n = B(t);
							L((e) => l(n, `Changed to ${e ?? ""}`), [() => y(W).find((e) => e.match === y(H).type_match)?.name ?? y(H).type_match]), j(e, t);
						};
						z(n, (e) => {
							y(re) ? e(r) : y(H).decision === "type" && e(i, 1);
						});
						var a = U(n, 2), o = (e) => {
							var t = lr(), n = V(t);
							let r;
							var i = U(n, 2);
							let a;
							var o = U(i, 2), s = (e) => {
								var t = or();
								let n;
								L(() => {
									n = $(t, 1, "btn svelte-1uaoa1p", null, n, { on: y(H)?.decision === "type" }), Z(t, "aria-pressed", y(H)?.decision === "type");
								}), N("click", t, () => C(v, !y(v))), j(e, t);
							};
							z(o, (e) => {
								y(W).length && e(s);
							});
							var c = U(o, 2), u = (e) => {
								var t = sr(), n = V(t);
								n.value = n.__value = "";
								var r = U(n), i = (e) => {
									var t = er(), n = B(t, !0), r = {};
									L(() => {
										l(n, y(H).type_match), r !== (r = y(H).type_match) && (t.value = (t.__value = r) ?? "");
									}), j(e, t);
								}, a = x(() => y(H)?.type_match && !y(W).some((e) => e.match === y(H).type_match));
								z(r, (e) => {
									y(a) && e(i);
								});
								var o = U(r);
								R(o, 17, () => y(W), (e) => e.match, (e, t) => {
									var n = er(), r = B(n, !0), i = {};
									L(() => {
										l(r, y(t).name), i !== (i = y(t).match) && (n.value = (n.__value = i) ?? "");
									}), j(e, n);
								}), X(t);
								var s;
								xe(t), L(() => {
									s !== (s = y(H)?.decision === "type" ? y(H).type_match : "") && (t.value = (t.__value = s) ?? "", ye(t, s));
								}), N("change", t, le), j(e, t);
							};
							z(c, (e) => {
								(y(v) || y(H)?.decision === "type") && e(u);
							});
							var d = U(c, 2), f = (e) => {
								var t = cr();
								N("click", t, () => se(null)), j(e, t);
							};
							z(d, (e) => {
								y(H) && e(f);
							}), X(t), L(() => {
								r = $(n, 1, "btn svelte-1uaoa1p", null, r, { on: y(H)?.decision === "plan" }), Z(n, "aria-pressed", y(H)?.decision === "plan"), a = $(i, 1, "btn svelte-1uaoa1p", null, a, { on: y(H)?.decision === "run" }), Z(i, "aria-pressed", y(H)?.decision === "run");
							}), N("click", n, () => se("plan", null, y(re)?.label ?? "the plan day")), N("click", i, () => se("run")), j(e, t);
						};
						z(a, (e) => {
							y(k).remove !== null && (y(O).needs_review || y(H)) && e(o);
						}), j(e, t);
					};
					z(J, (e) => {
						(y(re) || y(H)) && e(Y);
					});
					var pe = U(J, 2), he = (e) => {
						var t = Oe(), n = _(t), r = (e) => {
							var t = dr();
							j(e, t);
						}, i = (e) => {
							var t = fr();
							let n;
							L(() => n = q(t, "", n, { height: `${y(f).route?.length ? 220 : 0}px` })), j(e, t);
						}, a = (e) => {
							var t = mr(), n = _(t), r = (e) => {
								var t = Oe(), n = _(t);
								{
									let e = x(() => ke(y(f)) ? "run" : "gym");
									de(n, () => y(m).MapView, (t, n) => {
										n(t, {
											get route() {
												return y(f).route;
											},
											get kind() {
												return y(e);
											}
										});
									});
								}
								j(e, t);
							};
							z(n, (e) => {
								y(f).route?.length && e(r);
							});
							var i = U(n, 2);
							R(i, 17, () => y(F)?.list ?? [], (e) => e.label, (e, t) => {
								var n = pr(), r = _(n), i = B(r, !0), a = U(r, 2);
								de(a, () => y(m).Chart, (e, n) => {
									n(e, {
										get x() {
											return y(F).x;
										},
										get label() {
											return y(t).label;
										},
										get values() {
											return y(t).values;
										},
										get color() {
											return y(t).color;
										},
										get fmt() {
											return y(t).fmt;
										}
									});
								}), L(() => l(i, y(t).label)), j(e, n);
							}), j(e, t);
						};
						z(n, (e) => {
							y(h) ? e(r) : y(m) ? e(a, -1) : e(i, 1);
						}), j(e, t);
					};
					z(pe, (e) => {
						(y(f).route?.length || y(F)?.list.length) && e(he);
					});
					var ge = U(pe, 2), _e = (e) => {
						var t = gr(), n = U(_(t), 2);
						R(n, 21, () => y(I), (e) => e.zone, (e, t) => {
							var n = hr(), r = V(n), i = V(r), a = U(i), o = B(a, !0);
							X(r);
							var s = U(r, 2), c = V(s);
							let u;
							X(s);
							var d = U(s, 2), f = B(d);
							X(n), L(() => {
								l(i, `${y(t).zone ?? ""} `), l(o, y(t).bpm), u = q(c, "", u, { width: `${y(t).pct ?? ""}%` }), l(f, `${y(t).time ?? ""} · ${y(t).pct ?? ""}%`);
							}), j(e, n);
						}), X(n), j(e, t);
					};
					z(ge, (e) => {
						y(I) && e(_e);
					});
					var be = U(ge, 2), Se = (e) => {
						var n = vr(), r = U(_(n), 2), i = V(r), a = V(i), o = U(V(a), 2), c = B(o, !0);
						t(2), X(a), X(i);
						var u = U(i);
						R(u, 21, () => y(ee), s, (e, t) => {
							var n = _r(), r = V(n), i = B(r, !0), a = U(r), o = B(a, !0), s = U(a), c = B(s, !0), u = U(s), d = B(u, !0), f = U(u), p = B(f, !0);
							X(n), L(() => {
								l(i, y(t).km), l(o, y(t).time), l(c, y(t).pace), l(d, y(t).hr), l(p, y(t).climb);
							}), j(e, n);
						}), X(u), X(r), L(() => l(c, y(ne) ? "km/h" : "Pace")), j(e, n);
					};
					z(be, (e) => {
						y(ee).length && e(Se);
					});
					var Ce = U(be, 2), we = (e) => {
						var t = xr(), n = U(_(t), 2), r = V(n);
						R(r, 17, () => y(te).exercises, s, (e, t) => {
							var n = br(), r = V(n), i = U(r), a = B(i, !0), o = U(i), s = (e) => {
								var t = yr();
								j(e, t);
							};
							z(o, (e) => {
								y(t).record && e(s);
							}), X(n), L(() => {
								l(r, `${y(t).name ?? ""} · `), l(a, y(t).set);
							}), j(e, n);
						});
						var i = U(r, 2), a = U(V(i)), o = B(a, !0);
						X(i), X(n), L(() => l(o, y(te).volume)), j(e, t);
					};
					z(Ce, (e) => {
						y(te) && e(we);
					});
					var Te = U(Ce, 2), Ee = (e) => {
						var t = wr(), r = V(t), i = (e) => {
							var t = Sr(), r = U(_(t), 2), i = U(r, 2);
							N("click", r, () => C(g, !1)), N("click", i, () => (gt(n.person, y(d).key, "remove"), u.close())), j(e, t);
						}, a = (e) => {
							var t = Cr();
							let n;
							var r = B(t, !0);
							L(() => {
								n = $(t, 1, "btn svelte-1uaoa1p", null, n, { danger: y(k).remove !== "restore" }), l(r, ue[y(k).remove]);
							}), N("click", t, me), j(e, t);
						};
						z(r, (e) => {
							y(g) ? e(i) : e(a, -1);
						}), X(t), j(e, t);
					};
					z(Te, (e) => {
						y(k).remove && y(E)?.want !== null && e(Ee);
					}), L(() => l(c, `${y(M).date ?? ""} · ${y(M).time ?? ""} · ${y(M).duration ?? ""} `)), j(e, i);
				};
				z(c, (e) => {
					y(p) ? e(b) : y(f) ? e(w, -1) : e(S, 1);
				}), j(e, a);
			},
			$$slots: { default: !0 }
		}), (e) => u = e, () => u);
	}
	return K(he);
}
k(["change", "click"]);
// src/lib/ui/Details.svelte
var Dr = r("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), Or = r("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), kr = r("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), Ar = r("<section><h2 class=\"svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), jr = r("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!> <!> <!>", 1);
function Mr(e, t) {
	let n = D();
	G(t, !0);
	let r = J(t, "connect", 3, null), i = J(t, "reviewTypes", 19, () => ({})), a = x(() => g(t.person.pbs)), o = x(() => ie(t.person, t.canEdit)), s = Q(void 0), c = Q(void 0), u = (e) => y(c).open(e);
	var d = jr(), f = _(d), p = (e) => {
		var r = Dr(), i = V(r);
		on(U(i, 2), { get plan() {
			return t.person.plan;
		} }), X(r), L(() => {
			Z(r, "aria-labelledby", `${n}-plan`), Z(i, "id", `${n}-plan`);
		}), j(e, r);
	};
	z(f, (e) => {
		t.person.plan && e(p);
	});
	var m = U(f, 2), h = V(m), v = U(h, 2);
	Ze(v, () => t.id, (e) => {
		Qt(e, {
			get person() {
				return t.id;
			},
			get items() {
				return t.person.feed;
			},
			get records() {
				return y(a);
			},
			onopen: u
		});
	}), X(m);
	var b = U(m, 2), S = V(b), w = U(V(S)), T = B(w);
	X(S), Lt(U(S, 2), { get badges() {
		return t.person.badges;
	} }), X(b);
	var E = U(b, 2), O = V(E);
	Mn(U(O, 2), {
		get person() {
			return t.person;
		},
		onopen: u
	}), X(E);
	var k = U(E, 2);
	{
		let e = x(() => y(o) ? t.person.shoes : null);
		Y(Er(k, {
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
				return y(e);
			},
			get runShoes() {
				return t.person.run_shoes;
			},
			get reviewTypes() {
				return i();
			}
		}), (e) => C(c, e, !0), () => y(c));
	}
	var A = U(k, 2), M = (e) => {
		var r = Ar(), i = _(r), a = V(i), c = U(V(a)), l = (e) => {
			var t = Or();
			N("click", t, () => y(s).open()), j(e, t);
		};
		z(c, (e) => {
			y(o) && e(l);
		}), X(a);
		var u = U(a, 2), d = (e) => {
			In(e, { get shoes() {
				return t.person.shoes;
			} });
		}, f = (e) => {
			var t = kr();
			j(e, t);
		};
		z(u, (e) => {
			t.person.shoes.length ? e(d) : e(f, -1);
		}), X(i);
		var p = U(i, 2), m = (e) => {
			Y(qn(e, {
				get person() {
					return t.id;
				},
				get shoes() {
					return t.person.shoes;
				}
			}), (e) => C(s, e, !0), () => y(s));
		};
		z(p, (e) => {
			y(o) && e(m);
		}), L(() => {
			Z(i, "aria-labelledby", `${n}-shoes`), Z(a, "id", `${n}-shoes`);
		}), j(e, r);
	};
	z(A, (e) => {
		(t.person.shoes?.length || y(o)) && e(M);
	});
	var P = U(A, 2), F = (e) => {
		jt(e, {
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
	z(P, (e) => {
		r() && e(F);
	}), L(() => {
		Z(m, "aria-labelledby", `${n}-feed`), Z(h, "id", `${n}-feed`), Z(b, "aria-labelledby", `${n}-badges`), Z(S, "id", `${n}-badges`), l(T, `${t.person.badges.count ?? ""} unlocked`), Z(E, "aria-labelledby", `${n}-pbs`), Z(O, "id", `${n}-pbs`);
	}), j(e, d), K();
}
k(["click"]);
// src/lib/ui/Goals.svelte
var Nr = r("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), Pr = r("<p class=\"msg\" role=\"status\"> </p>"), Fr = r("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!> <label class=\"year svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Birth year</span> <input type=\"number\" inputmode=\"numeric\" min=\"1900\" placeholder=\"1990\" class=\"svelte-7wncvy\"/></label> <p class=\"caption maxhr svelte-7wncvy\"> </p></section>"), Ir = r("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), Lr = r("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), Rr = r("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), zr = r("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function Br(e, t) {
	let n = D();
	G(t, !0);
	let r = [], i = (e, n = Ge, r = Ge, i = Ge) => {
		let a = x(() => {
			let [e, t, n] = ze[r()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var o = Nr(), s = V(o), c = B(s, !0), u = U(s, 2), d = U(u, 2), f = B(d, !0), p = U(d, 2);
		X(o), L((e, s, d, m) => {
			Z(o, "aria-label", i()), l(c, e), Z(u, "aria-label", `Fewer ${s ?? ""}`), u.disabled = t.readOnly || n()[r()] <= y(a).lo, l(f, d), Z(p, "aria-label", `More ${m ?? ""}`), p.disabled = t.readOnly || n()[r()] >= y(a).hi;
		}, [
			() => i().split(",")[0],
			() => m(i()),
			() => h(r(), n()[r()]),
			() => m(i())
		]), N("click", u, () => n()[r()] = se(r(), n()[r()] - y(a).step)), N("click", p, () => n()[r()] = se(r(), n()[r()] + y(a).step)), j(e, o);
	}, a = Q(null), o = Q(null), s = Q(null), c = Q(!1);
	we(() => {
		Ce("settings").then((e) => {
			C(a, e, !0), C(s, u(e, t.people), !0);
		}, (e) => C(o, e, !0));
	});
	let d = {
		runs: "Runs per week",
		workouts: "Workouts per week",
		active_days: "Active days per week",
		steps: "Steps for an active day"
	}, f = [
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
	], p = {
		together: "Workouts together per week",
		team: "Team points per week"
	}, m = (e) => e[0].toLowerCase() + e.slice(1), h = (e, t) => e === "steps" ? t.toLocaleString("en-US") : String(t);
	async function g() {
		C(c, !0);
		let e = await ht(oe(y(s)), t.people);
		C(c, !1), e && t.onsaved();
	}
	var v = zr(), b = U(_(v), 2), S = (e) => {
		var t = Pr(), n = B(t, !0);
		L(() => l(n, y(o) ? y(o).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), j(e, t);
	}, w = (e) => {
		var o = Rr(), u = _(o), m = B(u), h = U(u, 2);
		R(h, 16, () => Object.keys(y(s).people), (e) => e, (e, r) => {
			let a = x(() => t.people[r]?.name ?? r);
			var o = Fr(), c = V(o), u = B(c, !0), f = U(c, 2);
			R(f, 16, () => je, (e) => e, (e, t) => {
				i(e, () => y(s).people[r], () => t, () => `${d[t]}, ${y(a)}`);
			});
			var p = U(f, 2), m = U(V(p), 2);
			_e(m), X(p);
			var h = U(p, 2), g = B(h, !0);
			X(o), L((e, i) => {
				Z(o, "aria-labelledby", `${n}-${r ?? ""}`), Z(c, "id", `${n}-${r ?? ""}`), l(u, y(a)), Z(m, "max", e), m.disabled = t.readOnly, l(g, i);
			}, [() => (/* @__PURE__ */ new Date()).getFullYear(), () => M(t.people[r]?.max_hr)]), me(m, () => y(s).profiles[r].birth_year, (e) => y(s).profiles[r].birth_year = e), j(e, o);
		});
		var v = U(h, 2), b = V(v), S = U(b, 2);
		R(S, 21, () => f, (e) => e.mode, (e, i) => {
			var a = Ir();
			let o;
			var c = V(a);
			_e(c);
			var u, d = U(c, 1, !0);
			X(a), L(() => {
				o = $(a, 1, "svelte-7wncvy", null, o, { on: y(s).couple.mode === y(i).mode }), Z(c, "name", `${n}-mode`), c.disabled = t.readOnly, u !== (u = y(i).mode) && (c.value = (c.__value = u) ?? ""), l(d, y(i).label);
			}), Je(r, [], c, () => (y(i).mode, y(s).couple.mode), (e) => y(s).couple.mode = e), j(e, a);
		}), X(S);
		var C = U(S, 2), w = B(C, !0), T = U(C, 2), E = (e) => {
			i(e, () => y(s).couple, () => y(s).couple.mode, () => p[y(s).couple.mode]);
		};
		z(T, (e) => {
			p[y(s).couple.mode] && e(E);
		});
		var D = U(T, 2), O = U(V(D), 2);
		_e(O), X(D), X(v);
		var k = U(v, 2), A = (e) => {
			var t = Lr();
			L(() => t.disabled = y(c)), N("click", t, g), j(e, t);
		};
		z(k, (e) => {
			t.readOnly || e(A);
		}), L((e, r) => {
			l(m, `Applies from this week (week ${e ?? ""})`), Z(v, "aria-labelledby", `${n}-couple`), Z(b, "id", `${n}-couple`), Z(S, "aria-labelledby", `${n}-couple`), l(w, r), O.disabled = t.readOnly;
		}, [() => De(y(a).week_start), () => f.find((e) => e.mode === y(s).couple.mode).hint]), me(O, () => y(s).couple.reward, (e) => y(s).couple.reward = e), j(e, o);
	};
	z(b, (e) => {
		y(s) ? e(w, -1) : e(S);
	}), j(e, v), K();
}
k(["click"]);
// src/lib/ui/Header.svelte
var Vr = r("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), Hr = Ee("<svg class=\"brand svelte-16l0jix\" viewBox=\"0 0 100 100\" aria-hidden=\"true\"><defs><linearGradient id=\"hdr-brand\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#FFB340\"></stop><stop offset=\"1\" stop-color=\"#FF453A\"></stop></linearGradient></defs><rect width=\"100\" height=\"100\" rx=\"22.4\" fill=\"url(#hdr-brand)\"></rect><path d=\"M50 20 L80 45 V80 H20 V45 Z\" fill=\"#FFF\" stroke=\"#FFF\" stroke-width=\"6\" stroke-linejoin=\"round\"></path><path d=\"M50 42 C55 49 63 55 63 65.5 a13 13 0 0 1 -26 0 C37 58 42 53 45.5 49 C46 53.5 48 56.5 51 57.5 C49.5 52 49 47 50 42 Z\" fill=\"#FF6B2C\"></path></svg>"), Ur = r("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), Wr = r("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"><!> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function Gr(e, t) {
	let n = J(t, "subtitle", 3, ""), r = J(t, "actionLabel", 3, ""), i = J(t, "brand", 3, !1), a = Q(0);
	var o = Wr();
	let s;
	var c = V(o), u = V(c), d = (e) => {
		var n = Vr();
		N("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), j(e, n);
	};
	z(u, (e) => {
		t.onback && e(d);
	});
	var f = U(u, 2), p = V(f), m = V(p), h = (e) => {
		var t = Hr();
		j(e, t);
	};
	z(m, (e) => {
		i() && e(h);
	});
	var g = U(m);
	X(p);
	var _ = U(p, 2), v = (e) => {
		var n = Ur(), i = B(n, !0);
		L(() => l(i, r())), N("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), j(e, n);
	};
	z(_, (e) => {
		t.onaction && e(v);
	}), X(f);
	var b = U(f, 2), x = B(b, !0);
	X(c), X(o), L(() => {
		s = $(o, 1, "svelte-16l0jix", null, s, { scrolled: y(a) > 0 }), l(g, ` ${t.title ?? ""}`), l(x, n() || "\xA0");
	}), Ue("y", () => y(a), (e) => C(a, e, !0)), j(e, o);
}
k(["click"]);
// src/lib/motion.js
function Kr(e, { onFrame: t, onSettle: n, snap: r = {
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
var qr = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), Jr = (e) => qr(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function Yr({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var Xr = Ee("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Zr = Ee("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function Qr(e, t) {
	G(t, !0);
	let n = J(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, a = Q(h(We.reducedMotion ? i : 0)), o = x(() => n() * .11), s = x(() => t.fractions.map((e, t) => {
		let s = n() / 2 - y(o) / 2 - t * y(o) * 1.3, c = 2 * Math.PI * s;
		return {
			kind: r[t],
			r: s,
			c,
			len: c * e * y(a) / i
		};
	}));
	we(() => {
		if (y(a) === i) return;
		let e = Kr(Yr({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => C(a, e, !0) });
		return e.to(i), e.stop;
	});
	var c = Zr();
	let l;
	R(c, 21, () => y(s), (e) => e.kind, (e, t) => {
		var r = Xr(), i = _(r);
		let a;
		var s = U(i);
		let c;
		L(() => {
			Z(i, "cx", n() / 2), Z(i, "cy", n() / 2), Z(i, "r", y(t).r), Z(i, "stroke-width", y(o)), a = q(i, "", a, { stroke: `var(--${y(t).kind ?? ""})` }), Z(s, "cx", n() / 2), Z(s, "cy", n() / 2), Z(s, "r", y(t).r), Z(s, "stroke-width", y(o)), Z(s, "stroke-dasharray", `${y(t).len ?? ""} ${y(t).c ?? ""}`), Z(s, "opacity", +(y(t).len > .01)), Z(s, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = q(s, "", c, { stroke: `var(--${y(t).kind ?? ""})` });
		}), j(e, r);
	}), X(c), L(() => {
		Z(c, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), l = q(c, "", l, { width: `${n() / 16}rem` });
	}), j(e, c), K();
}
// src/lib/ui/PersonTile.svelte
var $r = r("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), ei = r("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), ti = r("<span class=\"streak svelte-1handop\"> </span>"), ni = r("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), ri = r("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), ii = r("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), ai = r("<span class=\"steps svelte-1handop\"> </span>"), oi = r("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), si = r("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), ci = r("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function li(e, t) {
	G(t, !0);
	let n = J(t, "index", 3, 0), r = J(t, "compact", 3, !1), i = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], a = x(() => i[n() % i.length]), o = x(() => Pe(y(a), 2)), s = x(() => y(o)[0]), c = x(() => y(o)[1]), u = x(() => Te(t.person)), d = x(() => t.person.week), f = [
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
	], p = x(() => f.map((e, t) => ({
		...e,
		n: ee(y(d))[t],
		of: Xe(y(d))[t]
	}))), m = x(() => P(t.person.steps_today, y(d).goal.steps)), h = x(() => [
		`Level ${y(u).level}`,
		r() ? `🔥 ${t.person.streak} wk` : `${t.person.xp.toLocaleString()} XP`,
		y(d).paused && "Week paused",
		y(d).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), g = x(() => `${t.person.name}, level ${y(u).level}. This week ${y(p).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${y(d).goal_pending ? "New goals pending. " : ""}${y(d).bonus ? "Weekly bonus earned. " : ""}${y(m) ? y(m).replace("👟 ", "") + ". " : ""}Streak ${t.person.streak} weeks.`);
	var v = ci();
	let b;
	var S = V(v), C = V(S), w = V(C);
	let T;
	var E = B(w, !0), D = U(w, 2), O = V(D), k = B(O, !0), A = U(O, 2), M = B(A, !0);
	X(D);
	var F = U(D, 2), I = (e) => {
		var t = ei(), n = _(t), r = V(n);
		{
			let e = x(() => H(y(d)));
			Qr(r, {
				get fractions() {
					return y(e);
				},
				size: 44
			});
		}
		var i = U(r, 2), a = (e) => {
			var t = $r();
			j(e, t);
		};
		z(i, (e) => {
			y(d).bonus && e(a);
		}), X(n);
		var o = U(n, 2), s = B(o, !0);
		L(() => l(s, y(g))), j(e, t);
	}, te = (e) => {
		var n = ti(), r = B(n);
		L(() => l(r, `🔥 ${t.person.streak ?? ""} wk`)), j(e, n);
	};
	z(F, (e) => {
		r() ? e(I) : e(te, -1);
	});
	var ne = U(F, 2), re = (e) => {
		var t = ni();
		j(e, t);
	};
	z(ne, (e) => {
		t.onopen && e(re);
	}), X(C);
	var W = U(C, 2), ie = (e) => {
		var t = oi(), n = _(t), r = V(n), i = V(r);
		{
			let e = x(() => H(y(d))), t = x(() => We.wide ? 112 : 88);
			Qr(i, {
				get fractions() {
					return y(e);
				},
				get size() {
					return y(t);
				}
			});
		}
		var a = U(i, 2), o = (e) => {
			var t = ri();
			j(e, t);
		};
		z(a, (e) => {
			y(d).bonus && e(o);
		}), X(r);
		var s = U(r, 2);
		R(s, 21, () => y(p), (e) => e.kind, (e, t) => {
			var n = ii(), r = V(n), i = V(r);
			let a;
			var o = U(i, 1, !0);
			X(r);
			var s = U(r, 2), c = V(s, !0), u = U(c), d = B(u);
			X(s), X(n), L(() => {
				a = q(i, "", a, { background: `var(--${y(t).kind ?? ""})` }), l(o, y(t).label), l(c, y(t).n), l(d, `/${y(t).of ?? ""}`);
			}), j(e, n);
		}), X(s), X(n);
		var c = U(n, 2), f = (e) => {
			var t = ai(), n = B(t, !0);
			L(() => l(n, y(m))), j(e, t);
		};
		z(c, (e) => {
			y(m) && e(f);
		});
		var h = U(c, 2), g = V(h), v = V(g);
		let b;
		X(g);
		var S = U(g, 2), C = B(S);
		X(h), L((e, t) => {
			b = q(v, "", b, { width: `${y(u).frac * 100}%` }), l(C, `${e ?? ""} of ${t ?? ""} XP to level ${y(u).level + 1}`);
		}, [() => y(u).into.toLocaleString(), () => y(u).span.toLocaleString()]), j(e, t);
	};
	z(W, (e) => {
		r() || e(ie);
	}), X(S);
	var ae = U(S, 2), oe = (e) => {
		var n = si();
		L(() => Z(n, "aria-label", y(g))), N("click", n, function(...e) {
			t.onopen?.apply(this, e);
		}), j(e, n);
	};
	z(ae, (e) => {
		t.onopen && e(oe);
	}), X(v), L((e) => {
		b = $(v, 1, "tile glass svelte-1handop", null, b, {
			compact: r(),
			opens: t.onopen
		}), Z(S, "aria-hidden", t.onopen ? "true" : void 0), T = q(w, "", T, {
			"--a1": y(s),
			"--a2": y(c)
		}), l(E, e), l(k, t.person.name), l(M, y(h));
	}, [() => t.person.name.slice(0, 1)]), j(e, v), K();
}
k(["click"]);
// src/lib/ui/Sheet.svelte
var ui = r("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), di = r("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function fi(e, t) {
	G(t, !0);
	let n = J(t, "from", 3, null), r = 1e3, i = We.reducedMotion, o = Q(h(i ? r : 0)), s = Q(0), c = Q(1), l = Q(!1), u = Q("50% 100%"), d, f, m = !1, g = null, v = x(() => i ? +y(l) : Math.min(1, y(o) / 500)), b = x(() => i ? 1 : .5 + .5 * y(o) / r), S = () => {
		m && (y(o) === 0 || y(s) >= y(c)) && (m = !1, t.onclose());
	};
	function w(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = Yr({
					value: r,
					damping: o,
					response: s
				}), n = Kr(t, {
					onFrame: e,
					onSettle: S
				}), n.to(i, a);
			}
		};
	}
	let T = w((e) => C(o, e, !0)), E = w((e) => C(s, e, !0));
	function D() {
		m || g || (m = !0, i ? (C(l, !1), setTimeout(t.onclose, Jr("--fade"))) : T.to(y(o), 0, { response: .3 }));
	}
	function O(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), T.stop(), E.stop(), m = !1, g = {
			from: y(s),
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		});
	}
	function k(e) {
		if (!g) return;
		let t = g.from + e.clientY - g.start;
		C(s, t < 0 ? -un(-t, y(c)) : t, !0), g.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), g.samples.length > 8 && g.samples.shift();
	}
	function A(e) {
		if (!g) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = ln([...g.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		g = null, cn(y(s), n, y(c)) ? i ? D() : (m = !0, E.to(y(s), y(c), {
			velocity: n,
			response: .3
		})) : i ? C(s, 0) : (E.to(y(s), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), y(o) < r && T.to(y(o), r));
	}
	we(() => {
		if (n()) {
			let e = n().getBoundingClientRect();
			C(u, `${e.left + e.width / 2 - d.offsetLeft}px ${e.top + e.height / 2 - d.offsetTop}px`);
		}
		f.focus({ preventScroll: !0 });
		let e = document.documentElement;
		return e.style.overflow = "hidden", i ? requestAnimationFrame(() => C(l, !0)) : T.to(0, r), () => {
			T.stop(), E.stop(), e.style.overflow = "";
		};
	});
	var M = { close: D }, P = di();
	p("keydown", a, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && D());
	var F = _(P);
	let I, ee;
	var R = U(F, 2);
	let te, ne;
	var B = V(R), re = U(V(B), 2), H = V(re), W = (e) => {
		var n = ui();
		N("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), j(e, n);
	};
	z(H, (e) => {
		t.onback && e(W);
	});
	var ie = U(H, 2);
	Y(ie, (e) => f = e, () => f), X(re), X(B);
	var ae = U(B, 2), oe = V(ae);
	return $e(oe, () => t.children), X(ae), X(R), Y(R, (e) => d = e, () => d), L((e) => {
		I = $(F, 1, "scrim svelte-185xwm9", null, I, { fade: i }), ee = q(F, "", ee, { opacity: e }), te = $(R, 1, "sheet svelte-185xwm9", null, te, { fade: i }), Z(R, "aria-label", t.label), ne = q(R, "", ne, {
			opacity: y(v),
			transform: `translate3d(0, ${y(s) ?? ""}px, 0) scale(${y(b) ?? ""})`,
			"transform-origin": y(u)
		});
	}, [() => y(v) * Math.min(1, Math.max(0, 1 - y(s) / y(c)))]), N("click", F, D), N("pointerdown", B, O), N("pointermove", B, k), N("pointerup", B, A), p("pointercancel", B, A), N("click", ie, D), Ae(R, "offsetHeight", (e) => C(c, e)), j(e, P), K(M);
}
k([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var pi = r("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), mi = r("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), hi = r("<p class=\"caption stale svelte-9nj5u4\"> </p>"), gi = r("<!> <!> <!>", 1);
function _i(e, t) {
	G(t, !0);
	let n = x(() => t.scoredAt ? ae(t.scoredAt, t.now) : null);
	var r = gi(), i = _(r), a = (e) => {
		var n = pi(), r = U(V(n));
		X(n), L(() => l(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), j(e, n);
	};
	z(i, (e) => {
		t.configError && e(a);
	});
	var o = U(i, 2), s = (e) => {
		var n = mi(), r = U(V(n));
		X(n), L(() => l(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), j(e, n);
	};
	z(o, (e) => {
		t.settingsError && e(s);
	});
	var c = U(o, 2), u = (e) => {
		var t = hi(), r = B(t, !0);
		L(() => l(r, y(n))), j(e, t);
	};
	z(c, (e) => {
		y(n) && e(u);
	}), j(e, r), K();
}
// node_modules/svelte/src/internal/flags/legacy.js
F();
// src/lib/ui/Toast.svelte
var vi = r("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), yi = r("<span> </span> <!>", 1), bi = r("<div role=\"status\" aria-live=\"polite\"><!></div>");
function xi(e, t) {
	G(t, !1);
	function n() {
		let e = st.undo;
		Object.assign(st, {
			on: !1,
			undo: null
		}), e();
	}
	Re();
	var r = bi();
	let i;
	var a = V(r), o = (e) => {
		var t = yi(), r = _(t), i = B(r, !0), a = U(r, 2), o = (e) => {
			var t = vi();
			N("click", t, n), j(e, t);
		};
		z(a, (e) => {
			st.undo && e(o);
		}), L(() => l(i, st.text)), j(e, t);
	};
	z(a, (e) => {
		st.on && e(o);
	}), X(r), L(() => i = $(r, 1, "toast svelte-1fk2ial", null, i, { on: st.on })), j(e, r), K();
}
k(["click"]);
// src/lib/ui/Together.svelte
var Si = r("<p class=\"progress svelte-1tya3no\"> </p>"), Ci = r("<p> </p>"), wi = r("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), Ti = r("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function Ei(e, t) {
	G(t, !0);
	let n = x(() => t.group.week ? he(t.group.week, t.people) : ""), r = x(() => t.group.week ? ne(t.group.week) : null), i = x(() => [
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
	var a = Ti(), o = U(V(a), 2), s = (e) => {
		var t = Si(), r = B(t, !0);
		L(() => l(r, y(n))), j(e, t);
	};
	z(o, (e) => {
		y(n) && e(s);
	});
	var c = U(o, 2), u = (e) => {
		var n = Ci();
		let i;
		var a = B(n, !0);
		L(() => {
			i = $(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), l(a, y(r));
		}), j(e, n);
	};
	z(c, (e) => {
		y(r) && e(u);
	});
	var d = U(c, 2);
	R(d, 21, () => y(i), (e) => e.k, (e, t) => {
		var n = wi(), r = V(n), i = B(r, !0), a = U(r), o = V(a, !0), s = U(o), c = B(s, !0);
		X(a), X(n), L(() => {
			l(i, y(t).k), l(o, y(t).v), l(c, y(t).unit);
		}), j(e, n);
	}), X(d), X(a), j(e, a), K();
}
// src/App.svelte
var Di = r("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), Oi = r("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), ki = r("<div class=\"tiles compact svelte-1n46o8q\"></div>"), Ai = r("<!> <!>", 1), ji = r("<div class=\"tiles svelte-1n46o8q\"></div>"), Mi = r("<!> <!> <!> <!> <!>", 1), Ni = r("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function Pi(e, t) {
	G(t, !0);
	let r = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), i = new URLSearchParams(r.location.search), a = i.get("person"), o = /^\/(?!\/)/.test(i.get("back") ?? "") ? i.get("back") : null, s = o && (() => {
		r.history.pushState(null, "", o), r.dispatchEvent(new Event("location-changed"));
	}), c = Q(null), u = (e) => (t) => C(c, {
		id: e,
		from: t.currentTarget
	}, !0), d = Q(null), f = Q(void 0);
	async function p() {
		let e = y(c)?.from ?? y(d)?.from;
		C(c, C(d, null), !0), await T(), e?.focus({ preventScroll: !0 });
	}
	let m = Q(null), g = Q(null), v = Q(h(/* @__PURE__ */ new Date())), b = h({}), S;
	async function w() {
		if (clearTimeout(S), !document.hidden) {
			try {
				C(m, await Ce("scores"), !0), C(g, null), mt(y(m).people), a && Object.hasOwn(y(m).people, a) && a !== n(y(m).viewer, y(m).people).self && C(c, {
					id: a,
					from: null
				}, !0), a = null;
			} catch (e) {
				C(g, e, !0);
			}
			C(v, /* @__PURE__ */ new Date(), !0), y(m) && E(y(m)), clearTimeout(S), S = setTimeout(w, y(m) ? 6e4 : 3e4);
		}
	}
	let E = (e) => Ye(e.viewer, e.people).forEach((e) => Ce(`connect?person=${encodeURIComponent(e)}`).then((t) => {
		b[e] = t;
	}, () => {
		delete b[e];
	}));
	rt(() => {
		w();
		let e = () => document.hidden || w();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(S), document.removeEventListener("visibilitychange", e);
		};
	}), rt(() => {
		lt.n && w();
	});
	let D = x(() => Ve(y(m)?.people ?? {}, ct.entry)), O = x(() => Object.keys(y(D))), k = x(() => n(y(m)?.viewer ?? {}, y(D))), A = x(() => y(D)[y(k).self ?? y(O)[0]]?.week), M = (e) => !!y(m)?.viewer?.can_edit?.includes(e), N = x(() => !!y(k).self && et(y(D)[y(k).self], b[y(k).self])), P = x(() => !!y(c) && Object.hasOwn(y(D), y(c).id) || !!y(d) && !!y(m));
	var F = Ni(), I = _(F), ee = V(I);
	{
		let e = x(() => y(A) ? Fe(y(A)) : ""), t = x(() => y(m) ? (e) => C(d, { from: e.currentTarget }, !0) : void 0);
		Gr(ee, {
			title: "Training",
			brand: !0,
			get subtitle() {
				return y(e);
			},
			get onback() {
				return s;
			},
			actionLabel: "Goals",
			get onaction() {
				return y(t);
			}
		});
	}
	var te = U(ee, 2), ne = V(te), re = (e) => {
		var t = Oi(), n = U(_(t), 2), r = (e) => {
			var t = Di(), n = B(t, !0);
			L(() => l(n, y(g).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), j(e, t);
		};
		z(n, (e) => {
			y(g) && e(r);
		}), j(e, t);
	}, H = (e) => {
		var t = Mi(), n = _(t);
		_i(n, {
			get scoredAt() {
				return y(m).scored_at;
			},
			get configError() {
				return y(m).config_error;
			},
			get settingsError() {
				return y(m).settings_error;
			},
			get now() {
				return y(v);
			}
		});
		var r = U(n, 2), i = (e) => {
			jt(e, {
				get info() {
					return b[y(k).self];
				},
				get now() {
					return y(v);
				},
				get person() {
					return y(D)[y(k).self];
				}
			});
		};
		z(r, (e) => {
			y(N) && e(i);
		});
		var a = U(r, 2), o = (e) => {
			var t = Ai(), n = _(t), r = (e) => {
				var t = ki();
				R(t, 20, () => y(k).others, (e) => e, (e, t) => {
					{
						let n = x(() => y(O).indexOf(t)), r = x(() => u(t));
						li(e, {
							get person() {
								return y(D)[t];
							},
							get index() {
								return y(n);
							},
							compact: !0,
							get onopen() {
								return y(r);
							}
						});
					}
				}), X(t), j(e, t);
			};
			z(n, (e) => {
				y(k).others.length && e(r);
			});
			var i = U(n, 2);
			{
				let e = x(() => y(O).indexOf(y(k).self));
				li(i, {
					get person() {
						return y(D)[y(k).self];
					},
					get index() {
						return y(e);
					}
				});
			}
			j(e, t);
		}, s = (e) => {
			var t = ji();
			R(t, 20, () => y(k).others, (e) => e, (e, t) => {
				{
					let n = x(() => y(O).indexOf(t)), r = x(() => u(t));
					li(e, {
						get person() {
							return y(D)[t];
						},
						get index() {
							return y(n);
						},
						get onopen() {
							return y(r);
						}
					});
				}
			}), X(t), j(e, t);
		};
		z(a, (e) => {
			y(k).self ? e(o) : e(s, -1);
		});
		var c = U(a, 2), l = (e) => {
			Ei(e, {
				get group() {
					return y(m).group;
				},
				get people() {
					return y(D);
				}
			});
		};
		z(c, (e) => {
			y(m).group && e(l);
		});
		var d = U(c, 2), f = (e) => {
			{
				let t = x(() => M(y(k).self)), n = x(() => y(N) ? null : b[y(k).self]);
				Mr(e, {
					get id() {
						return y(k).self;
					},
					get person() {
						return y(D)[y(k).self];
					},
					get canEdit() {
						return y(t);
					},
					get viewer() {
						return y(m).viewer;
					},
					get reviewTypes() {
						return y(m).review_types;
					},
					get connect() {
						return y(n);
					},
					get now() {
						return y(v);
					}
				});
			}
		};
		z(d, (e) => {
			y(k).self && e(f);
		}), j(e, t);
	};
	z(ne, (e) => {
		y(m) ? e(H, -1) : e(re);
	}), X(te), X(I);
	var W = U(I, 2), ie = (e) => {
		Y(fi(e, {
			label: "Goals",
			get from() {
				return y(d).from;
			},
			onclose: p,
			get onback() {
				return s;
			},
			children: (e, t) => {
				{
					let t = x(() => !y(k).self);
					Br(e, {
						get people() {
							return y(m).people;
						},
						get readOnly() {
							return y(t);
						},
						onsaved: () => y(f)?.close()
					});
				}
			},
			$$slots: { default: !0 }
		}), (e) => C(f, e, !0), () => y(f));
	}, ae = (e) => {
		fi(e, {
			get label() {
				return `${y(D)[y(c).id].name ?? ""}'s details`;
			},
			get from() {
				return y(c).from;
			},
			onclose: p,
			get onback() {
				return s;
			},
			children: (e, t) => {
				var n = Ai(), r = _(n);
				{
					let e = x(() => y(O).indexOf(y(c).id));
					li(r, {
						get person() {
							return y(D)[y(c).id];
						},
						get index() {
							return y(e);
						}
					});
				}
				var i = U(r, 2);
				{
					let e = x(() => M(y(c).id));
					Mr(i, {
						get id() {
							return y(c).id;
						},
						get person() {
							return y(D)[y(c).id];
						},
						get canEdit() {
							return y(e);
						},
						get viewer() {
							return y(m).viewer;
						},
						get reviewTypes() {
							return y(m).review_types;
						},
						get connect() {
							return b[y(c).id];
						},
						get now() {
							return y(v);
						}
					});
				}
				j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	z(W, (e) => {
		y(d) && y(m) ? e(ie) : y(P) && e(ae, 1);
	}), xi(U(W, 2), {}), L(() => I.inert = y(P)), j(e, F), K();
}
// src/main.js
var Fi = (e) => d(Pi, { target: e }), Ii = () => new Promise((e) => {
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
		Le(e);
		let t = e.themes?.darkMode ?? matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.dataset.theme = t ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Ii().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", Fi(e);
		}));
	}
});
