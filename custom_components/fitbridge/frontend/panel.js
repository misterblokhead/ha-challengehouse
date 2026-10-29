import { $ as e, $t as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Gt as h, H as g, Ht as _, I as v, It as y, J as b, Jt as x, K as S, Kt as C, L as w, Lt as T, M as E, Mt as D, N as O, Nt as k, O as A, Ot as j, P as M, Pt as N, Q as P, Qt as ee, R as F, Rt as I, S as te, St as ne, T as re, Tt as L, U as R, Ut as z, V as ie, Vt as ae, W as oe, Wt as B, X as se, Xt as V, Y as ce, Yt as H, Z as le, Zt as U, _ as ue, _t as de, a as fe, an as pe, at as me, b as he, bt as ge, c as _e, ct as ve, d as ye, dt as be, en as xe, et as Se, f as Ce, ft as we, g as Te, gt as Ee, h as De, ht as Oe, i as ke, it as Ae, j as je, jt as W, k as Me, kt as G, l as Ne, lt as K, m as Pe, mt as q, n as Fe, nn as Ie, nt as Le, o as Re, on as ze, ot as J, p as Be, pt as Ve, q as He, qt as Y, rn as Ue, rt as We, s as Ge, sn as Ke, st as qe, t as Je, tn as X, tt as Ye, u as Xe, ut as Ze, v as Qe, vt as Z, w as $e, wt as et, x as tt, xt as nt, y as rt, yt as Q, z as it, zt as $ } from "./shared-Dfvd7FHQ.js";
// src/lib/actions.svelte.js
var at = 5e3, ot = C({}), st = C({}), ct = C({
	on: !1,
	text: "",
	undo: null
}), lt = C({
	entry: null,
	at: 0
}), ut = C({ n: 0 }), dt, ft = 0, pt = {};
function mt(e, t = null) {
	clearTimeout(dt), Object.assign(ct, {
		on: !0,
		text: e,
		undo: t
	}), dt = setTimeout(() => ct.on = !1, at);
}
function ht(e, t = Date.now()) {
	for (let [n, r] of Object.entries(ot)) i(r, e[r.person]?.feed ?? [], t) && delete ot[n];
	lt.entry && re(lt, e, t) && (lt.entry = null);
}
async function gt(e, t) {
	try {
		await ze("POST", "settings", e);
	} catch (e) {
		return mt(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(lt, {
		entry: e,
		at: Date.now()
	}), ht(t), mt("Saved · updates within 5 min"), !0;
}
async function _t(e, t, n) {
	let r = `${e}/${t}`, i = ot[r], a = ++ft, o = t.startsWith("manual:"), s = o && n === "remove" ? null : n === "remove";
	ot[r] = {
		person: e,
		key: t,
		want: s,
		at: Date.now(),
		n: a
	}, n === "remove" && !o && mt("Removed", () => _t(e, t, "restore"));
	try {
		await S(pt, r, () => ze("POST", "workouts", {
			person: e,
			key: t,
			action: n
		})), st[r] = s;
	} catch (e) {
		ot[r]?.n === a && (i ? ot[r] = i : delete ot[r]), mt(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
var vt = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
async function yt(e, t) {
	try {
		return await pe(`feed?person=${encodeURIComponent(e)}&before=${t}`);
	} catch (e) {
		return mt(vt(e)), null;
	}
}
async function bt(e) {
	try {
		await ze("POST", "shoes", e);
	} catch (e) {
		return mt(vt(e)), !1;
	}
	return ut.n++, !0;
}
async function xt(e, t, n, r = null, i = "") {
	try {
		await ze("POST", "workouts", {
			action: "review",
			person: e,
			key: t,
			decision: n,
			...n === "type" && { type_match: r }
		});
	} catch (e) {
		return mt(vt(e)), !1;
	}
	return ut.n++, mt({
		plan: `Counts for ${i}`,
		run: "Kept as a run",
		type: `Changed to ${i}`
	}[n] ?? "Decision cleared"), !0;
}
async function St(e, t, n) {
	try {
		await ze("POST", "workouts", {
			action: "shoe",
			person: e,
			key: t,
			shoe_id: n
		});
	} catch (e) {
		return mt(vt(e)), !1;
	}
	return ut.n++, mt("Moved to the other shoe"), !0;
}
// src/lib/ui/Connect.svelte
var Ct = W("<div class=\"url svelte-gy3e4s\"><input readonly=\"\" aria-label=\"Your address\" class=\"svelte-gy3e4s\"/> <button type=\"button\" class=\"btn press\" aria-label=\"Copy address\">Copy</button></div>"), wt = W("<p class=\"warn svelte-gy3e4s\">This address only works at home.</p>"), Tt = W("<p class=\"caption svelte-gy3e4s\"> </p> <div class=\"choice svelte-gy3e4s\"><button type=\"button\" class=\"btn press svelte-gy3e4s\">iPhone</button> <button type=\"button\" class=\"btn press svelte-gy3e4s\">Android</button></div>", 1), Et = W("<li class=\"svelte-gy3e4s\"> </li>"), Dt = W("<ol class=\"svelte-gy3e4s\"></ol>"), Ot = W("<p class=\"caption svelte-gy3e4s\"> <b> </b> </p>"), kt = W("<p> </p> <!> <!> <!> <!>", 1), At = W("<details class=\"card connect svelte-gy3e4s\"><summary class=\"svelte-gy3e4s\">Connect your phone <small class=\"svelte-gy3e4s\"> </small></summary> <div class=\"inner svelte-gy3e4s\"><!></div></details>"), jt = W("<section class=\"card connect svelte-gy3e4s\" aria-label=\"Connect your phone\"><div class=\"inner svelte-gy3e4s\"><h2 class=\"svelte-gy3e4s\">Connect your phone</h2><!></div></section>");
function Mt(e, t) {
	U(t, !0);
	let n = (e) => {
		var n = kt(), r = z(n);
		let i;
		var a = B(r, !0), v = h(r, 2), b = (e) => {
			var n = Ct(), r = _(n);
			Ve(r), K(r, (e) => Y(m, e), () => T(m));
			var i = h(r, 2);
			X(n), $(() => Oe(r, t.info.url)), y("focus", r, (e) => e.currentTarget.select()), p("click", i, g), G(e, n);
		};
		d(v, (e) => {
			t.info.url && e(b);
		});
		var x = h(v, 2), S = (e) => {
			var t = wt();
			G(e, t);
		};
		d(x, (e) => {
			t.info.external || e(S);
		});
		var C = h(x, 2), w = (e) => {
			var t = Tt(), n = z(t), r = B(n, !0), i = h(n, 2), a = _(i), s = h(a, 2);
			X(i), $(() => j(r, T(l).title)), p("click", a, () => Y(o, "iphone")), p("click", s, () => Y(o, "android")), G(e, t);
		}, E = (e) => {
			var t = Dt();
			s(t, 20, () => T(l).steps, (e) => e, (e, t) => {
				var n = Et(), r = B(n, !0);
				$(() => j(r, t)), G(e, n);
			}), X(t), G(e, t);
		};
		d(C, (e) => {
			T(c) ? e(E, -1) : e(w);
		});
		var D = h(C, 2), O = (e) => {
			var t = Ot(), n = _(t, !0), r = h(n), i = B(r, !0), a = h(r, 1, !0);
			X(t), $(() => {
				j(n, T(f).before), j(i, T(f).code), j(a, T(f).after);
			}), G(e, t);
		};
		d(D, (e) => {
			T(f) && e(O);
		}), $(() => {
			i = Q(r, 1, "status svelte-gy3e4s", null, i, { ok: T(u).state === "connected" }), j(a, T(u).text);
		}), G(e, n);
	}, i = J(t, "person", 3, null), a = J(t, "collapsed", 3, !1), o = x(null), c = H(() => t.info.phone ?? T(o)), l = H(() => tt(T(c))), u = H(() => he(t.info, t.now, i())), f = H(() => Me(t.info.opengym)), m = x(void 0);
	async function g() {
		T(m).focus(), T(m).setSelectionRange(0, T(m).value.length);
		let e = !1;
		try {
			await navigator.clipboard.writeText(t.info.url), e = !0;
		} catch {
			try {
				e = document.execCommand("copy");
			} catch {}
		}
		mt(e ? "Copied" : "Select and copy the address");
	}
	var v = r(), b = z(v), S = (e) => {
		var t = At(), r = _(t), i = h(_(r)), a = B(i, !0);
		X(r);
		var o = h(r, 2), s = _(o);
		n(s), X(o), X(t), $(() => j(a, T(u).state === "connected" ? "Connected" : "Waiting")), G(e, t);
	}, C = (e) => {
		var t = jt(), r = _(t), i = h(_(r));
		n(i), X(r), X(t), G(e, t);
	};
	d(b, (e) => {
		a() ? e(S) : e(C, -1);
	}), G(e, v), V();
}
N(["click"]);
// src/lib/ui/Badges.svelte
var Nt = W("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), Pt = W("<ul class=\"svelte-m8wnum\"></ul>"), Ft = W("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), It = W("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), Lt = W("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function Rt(e, t) {
	U(t, !0);
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
	var a = Lt(), o = _(a), c = (e) => {
		var n = Pt();
		s(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = Nt(), i = _(n), a = B(i, !0), o = h(i, 2), s = B(o, !0), c = h(o, 2), l = B(c, !0);
			X(n), $((e, n) => {
				j(a, e), j(s, T(t).title), j(l, n);
			}, [() => r(T(t)), () => le(T(t).unlocked_at)]), G(e, n);
		}), X(n), G(e, n);
	};
	d(o, (e) => {
		t.badges.recent.length && e(c);
	});
	var l = h(o, 2), u = (e) => {
		var n = Pt();
		s(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = Ft(), a = _(n), o = B(a, !0), s = h(a, 2), c = B(s, !0), l = h(s, 2), u = B(l), d = h(l, 2), f = _(d);
			let p;
			X(d), X(n), $((e, n, r, i) => {
				j(o, e), j(c, T(t).title), j(u, `${n ?? ""} of ${r ?? ""}`), p = Z(f, "", p, { width: i });
			}, [
				() => r(T(t)),
				() => i(T(t).current),
				() => i(T(t).target),
				() => `${Math.min(1, T(t).current / T(t).target) * 100}%`
			]), G(e, n);
		}), X(n), G(e, n);
	};
	d(l, (e) => {
		t.badges.next.length && e(u);
	});
	var f = h(l, 2), p = (e) => {
		var t = It();
		G(e, t);
	};
	d(f, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(p);
	}), X(a), G(e, a), V();
}
// src/lib/ui/FeedRow.svelte
var zt = W("<span class=\"mini svelte-69s4be\"> </span>"), Bt = W("<span> </span>"), Vt = W("<span class=\"mini svelte-69s4be\">Together</span>"), Ht = W("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), Ut = W("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), Wt = W("<span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span>", 1), Gt = W("<button type=\"button\" class=\"head svelte-69s4be\"><!></button>"), Kt = W("<div class=\"head svelte-69s4be\"><!></div>"), qt = W("<li><!></li>");
function Jt(e, t) {
	U(t, !0);
	let n = (e) => {
		var n = Wt(), o = z(n), s = B(o, !0), c = h(o, 2), l = _(c), u = _(l), f = h(u), p = (e) => {
			var t = zt(), n = B(t, !0);
			$(() => j(n, T(a).plan)), G(e, t);
		};
		d(f, (e) => {
			T(a).plan && e(p);
		});
		var m = h(f, 2), g = (e) => {
			var t = Bt();
			let n;
			var r = B(t, !0);
			$(() => {
				n = Q(t, 1, "mini svelte-69s4be", null, n, { warn: T(a).chip.tone === "warn" }), j(r, T(a).chip.text);
			}), G(e, t);
		};
		d(m, (e) => {
			T(a).chip && e(g);
		});
		var v = h(m, 2), y = (e) => {
			var t = Vt();
			G(e, t);
		};
		d(v, (e) => {
			t.item.joint && e(y);
		});
		var b = h(v, 2), x = (e) => {
			var t = Ht();
			G(e, t);
		};
		d(b, (e) => {
			t.record && e(x);
		}), X(l);
		var S = h(l, 2), C = B(S);
		X(c);
		var w = h(c, 2), E = _(w), D = (e) => {
			var t = Ut();
			G(e, t);
		};
		d(E, (e) => {
			T(i) && e(D);
		});
		var O = h(E);
		X(w), $(() => {
			Q(o, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), j(s, r[t.item.kind] ?? "💪"), j(u, `${T(a).title ?? ""} `), j(C, `${T(a).when ?? ""} · ${T(a).duration ?? ""}`), j(O, ` ${(T(a).removable === "restore" ? "Removed" : T(a).label ?? (T(a).xp && `${T(a).xp} XP`)) ?? ""}`);
		}), G(e, n);
	}, r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, i = H(() => ot[`${t.person}/${t.item.key}`]), a = H(() => o(T(i) && T(i).want !== null ? {
		...t.item,
		excluded: T(i).want
	} : t.item)), s = H(() => T(i)?.want === null), c = H(() => t.item.kind !== "active_day");
	var l = qt();
	let u;
	var f = _(l), m = (e) => {
		var r = Gt(), i = _(r);
		n(i), X(r), p("click", r, () => t.onopen(t.item)), G(e, r);
	}, g = (e) => {
		var t = Kt(), r = _(t);
		n(r), X(t), G(e, t);
	};
	d(f, (e) => {
		T(c) ? e(m) : e(g, -1);
	}), X(l), $(() => u = Q(l, 1, "svelte-69s4be", null, u, {
		dim: T(a).removable === "restore" || T(s),
		grey: !!T(a).label
	})), G(e, l), V();
}
N(["click"]);
// src/lib/ui/Feed.svelte
var Yt = W("<ul class=\"card svelte-n1344i\"></ul>"), Xt = W("<p class=\"caption empty svelte-n1344i\">No workouts in the last 90 days.</p>"), Zt = W("<button type=\"button\" class=\"btn older svelte-n1344i\">Load older</button>"), Qt = W("<!> <!>", 1);
function $t(e, t) {
	U(t, !0);
	let n = x(C([])), r = x(!0), i = x(!1), a = null, o = H(() => v(t.items, F(T(n), t.person, st)));
	async function c() {
		Y(i, !0);
		let e = a ?? T(o).at(-1)?.start.slice(0, 10) ?? w(M(), 88), s = await yt(t.person, e);
		Y(i, !1), s && (Y(n, v(T(n), s.items), !0), a = w(e, 90), Y(r, s.more, !0));
	}
	var l = Qt(), u = z(l), f = (e) => {
		var n = Yt();
		s(n, 21, () => T(o), (e) => e.key, (e, n) => {
			{
				let r = H(() => t.records?.has(T(n).key));
				Jt(e, {
					get person() {
						return t.person;
					},
					get item() {
						return T(n);
					},
					get record() {
						return T(r);
					},
					get onopen() {
						return t.onopen;
					}
				});
			}
		}), X(n), G(e, n);
	}, m = (e) => {
		var t = Xt();
		G(e, t);
	};
	d(u, (e) => {
		T(o).length ? e(f) : e(m, -1);
	});
	var g = h(u, 2), _ = (e) => {
		var t = Zt();
		$(() => t.disabled = T(i)), p("click", t, c), G(e, t);
	};
	d(g, (e) => {
		T(r) && e(_);
	}), G(e, l), V();
}
N(["click"]);
// src/lib/ui/PlanBar.svelte
var en = W("<span> </span>"), tn = W("<i class=\"svelte-1y5m0aq\"></i>"), nn = W("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), rn = W("<span class=\"review svelte-1y5m0aq\"> </span>"), an = W("<p class=\"caption prog svelte-1y5m0aq\"> <!></p>"), on = W("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!> <!></div>");
function sn(e, t) {
	U(t, !0);
	let n = H(() => ie(t.plan)), r = H(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0) + (t.plan.cooldown_s ?? 0)) / 60)), i = H(() => g(t.plan));
	var a = on(), o = _(a), c = _(o), l = B(c, !0), u = h(c, 2), f = (e) => {
		var n = en();
		let r;
		var i = B(n, !0);
		$(() => {
			r = Q(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), j(i, t.plan.due_today ? "Due today" : "Rest day");
		}), G(e, n);
	};
	d(u, (e) => {
		T(n).length && e(f);
	}), X(o);
	var p = h(o, 2), m = (e) => {
		var t = nn(), i = z(t);
		s(i, 21, () => T(n), et, (e, t) => {
			var n = tn();
			let r;
			$(() => r = Z(n, "", r, {
				"flex-grow": T(t).frac,
				background: `var(--${T(t).kind === "run" ? "run" : "fill"})`
			})), G(e, n);
		}), X(i);
		var a = h(i, 2), o = _(a), c = _(o);
		Z(c, "", {}, { background: "var(--run)" });
		var l = h(c, 2);
		Z(l, "", {}, { background: "var(--fill)" }), xe(), X(o);
		var u = h(o, 2), d = B(u);
		X(a), $(() => {
			q(i, "aria-label", `Run and walk intervals, ${T(r) ?? ""} minutes in total`), j(d, `${T(r) ?? ""} min`);
		}), G(e, t);
	};
	d(p, (e) => {
		T(n).length && e(m);
	});
	var v = h(p, 2), y = (e) => {
		var n = an(), r = _(n, !0), a = h(r), o = (e) => {
			var n = rn(), r = B(n);
			$(() => j(r, `${T(i) ? " · " : ""}${t.plan.review_pending ?? ""} ${t.plan.review_pending === 1 ? "run" : "runs"} to review`)), G(e, n);
		};
		d(a, (e) => {
			t.plan.review_pending && e(o);
		}), X(n), $(() => j(r, T(i))), G(e, n);
	};
	d(v, (e) => {
		(T(i) || t.plan.review_pending) && e(y);
	}), X(a), $(() => j(l, t.plan.state)), G(e, a), V();
}
// src/lib/gesture.js
var cn = (e, t = .998) => e / 1e3 * t / (1 - t), ln = (e, t, n) => e + cn(t) > n / 2;
function un(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var dn = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), fn = W("<h2 class=\"svelte-9pi54v\"> </h2> <button type=\"button\" class=\"close press svelte-9pi54v\" aria-label=\"Close\">✕</button>", 1), pn = W("<div class=\"grab drag svelte-9pi54v\"><!></div>"), mn = W("<div class=\"grab svelte-9pi54v\"><!></div>"), hn = W("<dialog><!> <div class=\"body svelte-9pi54v\"><!></div></dialog>");
function gn(e, t) {
	let n = k();
	U(t, !0);
	let r = (e) => {
		var r = fn(), i = z(r), a = B(i, !0), o = h(i, 2);
		$(() => {
			q(i, "id", `${n}-t`), j(a, t.title);
		}), p("click", o, () => s.close()), G(e, r);
	}, i = J(t, "drag", 3, !1), a = J(t, "wide", 3, !1), o = J(t, "onclose", 3, null), s, c, l = x(0), u = null, f = x(!1), m = !1, g = !1;
	function v() {
		return s.open ? null : (m = document.documentElement.style.overflow !== "hidden", m && (document.documentElement.style.overflow = "hidden"), s.showModal(), c);
	}
	function b() {
		s.close();
	}
	function S() {
		m && (document.documentElement.style.overflow = ""), m = !1, Y(l, 0), o()?.();
	}
	function C(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), u = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, Y(f, !0));
	}
	function w(e) {
		u && (Y(l, Math.max(0, e.clientY - u.start), !0), u.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), u.samples.length > 8 && u.samples.shift());
	}
	function E(e) {
		if (!u) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = un([...u.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		u = null, Y(f, !1), ln(T(l), n, s.offsetHeight) ? s.close() : Y(l, 0);
	}
	var D = {
		show: v,
		close: b
	}, O = hn();
	let A, M;
	var N = _(O), P = (e) => {
		var t = pn(), n = _(t);
		r(n), X(t), p("pointerdown", t, C), p("pointermove", t, w), p("pointerup", t, E), y("pointercancel", t, E), G(e, t);
	}, ee = (e) => {
		var t = mn(), n = _(t);
		r(n), X(t), G(e, t);
	};
	d(N, (e) => {
		i() ? e(P) : e(ee, -1);
	});
	var F = h(N, 2), I = _(F);
	return ne(I, () => t.children), X(F), K(F, (e) => c = e, () => c), X(O), K(O, (e) => s = e, () => s), $(() => {
		q(O, "aria-labelledby", `${n}-t`), A = Q(O, 1, "svelte-9pi54v", null, A, {
			wide: a(),
			dragging: T(f)
		}), M = Z(O, "", M, { transform: T(l) ? `translateY(${T(l)}px)` : null });
	}), p("pointerdown", O, (e) => g = e.target === s), p("click", O, (e) => e.target === s && g && s.close()), y("close", O, S), p("keydown", O, (e) => e.key === "Escape" && e.stopPropagation()), G(e, O), V(D);
}
N([
	"click",
	"pointerdown",
	"keydown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/RecordsDialog.svelte
var _n = W("<li class=\"svelte-18znx9k\"><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), vn = W("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1);
function yn(e, t) {
	U(t, !0);
	let n;
	function i(e = null) {
		let t = n.show();
		t && (t.scrollTop = 0, e && t.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	var a = { open: i };
	return K(gn(e, {
		title: "All records",
		drag: !0,
		children: (e, n) => {
			var i = r(), a = z(i);
			s(a, 17, () => t.groups, (e) => e.group, (e, t) => {
				var n = vn(), r = z(n), i = B(r, !0), a = h(r, 2);
				s(a, 21, () => T(t).lifts, (e) => e.id, (e, t) => {
					var n = _n(), r = _(n), i = _(r), a = h(i), o = B(a, !0), s = h(a);
					X(r), X(n), $((e, n) => {
						j(i, `${T(t).name ?? ""} · `), j(o, e), j(s, ` · ${n ?? ""}`);
					}, [() => O(T(t)), () => le(T(t).date)]), G(e, n);
				}), X(a), $(() => {
					q(r, "data-group", T(t).group), j(i, T(t).group);
				}), G(e, n);
			}), G(e, i);
		},
		$$slots: { default: !0 }
	}), (e) => n = e, () => n), V(a);
}
// src/lib/ui/StepBars.svelte
var bn = W("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), xn = W("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), Sn = W("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function Cn(e, t) {
	U(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), r = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var i = Sn(), a = _(i);
	s(a, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = bn();
		let i;
		var a = _(n), o = _(a);
		let s, c;
		X(a);
		var l = h(a, 2), u = B(l, !0);
		X(n), $((e) => {
			q(n, "aria-label", e), q(n, "aria-hidden", T(t).future ? "true" : void 0), q(n, "aria-current", T(t).isToday ? "date" : void 0), i = Q(n, 1, "svelte-1f099m", null, i, { today: T(t).isToday }), s = Q(o, 1, "svelte-1f099m", null, s, {
				active: T(t).active,
				future: T(t).future
			}), c = Z(o, "", c, { height: `${T(t).frac * 100}%` }), j(u, T(t).label);
		}, [() => T(t).future ? void 0 : r(T(t))]), G(e, n);
	}), X(a);
	var o = h(a, 2), c = (e) => {
		var n = xn();
		let r;
		$(() => r = Z(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), G(e, n);
	};
	d(o, (e) => {
		t.goalFrac !== null && e(c);
	}), X(i), G(e, i), V();
}
// src/lib/ui/Progress.svelte
var wn = W("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), Tn = W("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), En = W("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), Dn = W("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), On = W("<span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span>", 1), kn = W("<button type=\"button\" class=\"row svelte-kr1x1f\"><!></button>"), An = W("<div class=\"row svelte-kr1x1f\"><!></div>"), jn = W("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), Mn = W("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function Nn(e, t) {
	U(t, !0);
	let n = H(() => t.person.week.goal.steps ?? 0), i = H(() => Le(t.person.steps_week, T(n), M())), a = H(() => t.person.pbs.lifts ?? []), o = H(() => c(T(a))), l, u = H(() => t.person.pbs.fastest_1k), f = H(() => t.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var m = Mn(), g = z(m), v = (e) => {
		var t = wn(), n = _(t);
		Cn(n, {
			get bars() {
				return T(i).bars;
			},
			get goalFrac() {
				return T(i).goalFrac;
			}
		});
		var r = h(n, 2), a = B(r, !0);
		X(t), $((e) => j(a, e), [() => Se(T(i).bars)]), G(e, t);
	};
	d(g, (e) => {
		T(i) && e(v);
	});
	var y = h(g, 2), b = _(y), x = (e) => {
		var t = En(), n = z(t);
		s(n, 21, () => T(o), (e) => e.group, (e, t) => {
			var n = Tn(), r = _(n), i = _(r), a = B(i, !0), o = h(i), s = _(o), c = h(s), u = B(c, !0);
			X(o), X(r), X(n), $((e) => {
				j(a, T(t).group), j(s, `${T(t).lift.name ?? ""} · `), j(u, e);
			}, [() => O(T(t).lift)]), p("click", r, () => l.open(T(t).group)), G(e, n);
		}), X(n);
		var r = h(n, 2), i = B(r);
		$(() => j(i, `All records (${T(a).length ?? ""})`)), p("click", r, () => l.open()), G(e, t);
	}, S = (e) => {
		var t = Dn();
		G(e, t);
	};
	d(b, (e) => {
		T(a).length ? e(x) : e(S, -1);
	}), X(y);
	var C = h(y, 2), w = _(C), E = (e) => {
		let n = (e) => {
			var t = On(), n = h(z(t), 2), r = B(n);
			$((e, t) => j(r, `${e ?? ""} · ${t ?? ""}`), [() => it(T(u).seconds), () => le(T(u).date)]), G(e, t);
		};
		var i = r(), a = z(i), o = (e) => {
			var r = kn(), i = _(r);
			n(i), X(r), p("click", r, () => t.onopen({ key: T(u).key })), G(e, r);
		}, s = (e) => {
			var t = An(), r = _(t);
			n(r), X(t), G(e, t);
		};
		d(a, (e) => {
			T(u).key ? e(o) : e(s, -1);
		}), G(e, i);
	}, D = (e) => {
		var t = jn();
		G(e, t);
	};
	d(w, (e) => {
		T(u) ? e(E) : e(D, -1);
	});
	var k = h(w, 2), N = h(_(k)), P = B(N);
	X(k);
	var ee = h(k, 2), F = h(_(ee)), I = B(F);
	X(ee), X(C);
	var te = h(C, 2);
	{
		let e = H(() => A(T(a)));
		K(yn(te, { get groups() {
			return T(e);
		} }), (e) => l = e, () => l);
	}
	$((e) => {
		j(P, `${e ?? ""} km`), j(I, `${T(f) ?? ""} t`);
	}, [() => t.person.pbs.longest_session_km.toFixed(1)]), G(e, m), V();
}
N(["click"]);
// src/lib/ui/Shoes.svelte
var Pn = W("<span class=\"label svelte-eu7fja\"> </span>"), Fn = W("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), In = W("<ul class=\"card svelte-eu7fja\"></ul>");
function Ln(e, t) {
	U(t, !0);
	let n = H(() => t.shoes.map(ce));
	var r = In();
	s(r, 23, () => T(n), (e, n) => t.shoes[n].id, (e, t) => {
		var n = Fn(), r = _(n), i = _(r), a = B(i, !0), o = h(i), s = B(o, !0);
		X(r);
		var c = h(r, 2), l = _(c);
		let u;
		X(c);
		var f = h(c, 2), p = _(f), m = B(p, !0), g = h(p, 2), v = (e) => {
			var n = Pn(), r = B(n, !0);
			$(() => j(r, T(t).label)), G(e, n);
		};
		d(g, (e) => {
			T(t).label && e(v);
		}), X(f), X(n), $(() => {
			Q(n, 1, ge(T(t).state), "svelte-eu7fja"), j(a, T(t).name), j(s, T(t).km), u = Z(l, "", u, { width: `${T(t).frac * 100}%` }), j(m, T(t).detail);
		}), G(e, n);
	}), X(r), G(e, r), V();
}
// src/lib/ui/ShoesDialog.svelte
var Rn = W("<span class=\"mini svelte-1bogt6u\">Current</span>"), zn = W("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Bn = W("<button type=\"button\" class=\"btn\">Set current</button>"), Vn = W("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Hn = W("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), Un = W("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe until you set one.</p>"), Wn = W("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), Gn = W("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), Kn = W("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), qn = W("<!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form>", 1);
function Jn(e, t) {
	U(t, !0);
	let n = H(() => t.shoes.map((e) => ({
		...ce(e),
		id: e.id,
		limit: e.limit,
		current: !!e.current
	}))), r, i = x(""), a = x(C(700)), o = x(null), c = x(!1), l = x(null);
	function u() {
		r.show();
	}
	function f() {
		Y(l, null), Y(o, null);
	}
	async function m(e) {
		Y(c, !0);
		let t = await bt(e);
		return Y(c, !1), t;
	}
	async function g(e) {
		e.preventDefault();
		let n = He(T(i), T(a));
		Y(o, n.error ?? null, !0), !T(o) && await m({
			op: "add",
			person: t.person,
			...n
		}) && Y(i, "");
	}
	async function v(e, t) {
		let n = He(void 0, e.currentTarget.value, { partial: !0 });
		Y(o, n.error ?? null, !0), T(o) ? e.currentTarget.value = t.limit : n.replace_at_km !== t.limit && await m({
			op: "update",
			id: t.id,
			...n
		});
	}
	async function b(e) {
		Y(l, null), await m({
			op: "retire",
			id: e.id
		});
	}
	var S = { open: u };
	return K(gn(e, {
		title: "Manage shoes",
		onclose: f,
		children: (e, r) => {
			var u = qn(), f = z(u), x = (e) => {
				var r = Wn(), i = z(r);
				s(i, 21, () => T(n), (e) => e.id, (e, n) => {
					var r = Hn(), i = _(r), a = _(i), o = _(a, !0), s = h(o), u = (e) => {
						var t = Rn();
						G(e, t);
					};
					d(s, (e) => {
						T(n).current && e(u);
					}), X(a);
					var f = h(a, 2), g = B(f, !0);
					X(i);
					var y = h(i, 2), x = _(y), S = h(_(x));
					Ve(S), xe(), X(x);
					var C = h(x, 2), w = (e) => {
						var t = zn(), r = z(t), i = B(r), a = h(r, 2), o = h(a, 2);
						$(() => {
							j(i, `Retire ${T(n).name ?? ""}?`), o.disabled = T(c);
						}), p("click", a, () => Y(l, null)), p("click", o, () => b(T(n))), G(e, t);
					}, E = (e) => {
						var r = Vn(), i = z(r), a = (e) => {
							var r = Bn();
							$(() => r.disabled = T(c)), p("click", r, () => m({
								op: "current",
								person: t.person,
								id: T(n).id
							})), G(e, r);
						};
						d(i, (e) => {
							T(n).current || e(a);
						});
						var o = h(i, 2);
						$(() => o.disabled = T(c)), p("click", o, () => Y(l, T(n).id, !0)), G(e, r);
					};
					d(C, (e) => {
						T(l) === T(n).id ? e(w) : e(E, -1);
					}), X(y), X(r), $(() => {
						j(o, T(n).name), j(g, T(n).km), q(S, "min", De.replace_at_km[0]), q(S, "max", De.replace_at_km[1]), q(S, "step", De.replace_at_km[2]), Oe(S, T(n).limit), S.disabled = T(c);
					}), p("change", S, (e) => v(e, T(n))), G(e, r);
				}), X(i);
				var a = h(i, 2), o = (e) => {
					var t = Un();
					G(e, t);
				}, u = H(() => !T(n).some((e) => e.current));
				d(a, (e) => {
					T(u) && e(o);
				}), G(e, r);
			}, S = (e) => {
				var t = Gn();
				G(e, t);
			};
			d(f, (e) => {
				T(n).length ? e(x) : e(S, -1);
			});
			var C = h(f, 2), w = h(_(C), 2), E = h(_(w));
			Ve(E), X(w);
			var D = h(w, 2), O = h(_(D));
			Ve(O), X(D);
			var k = h(D, 2), A = (e) => {
				var t = Kn(), n = B(t, !0);
				$(() => j(n, T(o))), G(e, t);
			};
			d(k, (e) => {
				T(o) && e(A);
			});
			var M = h(k, 2);
			X(C), $(() => {
				q(E, "maxlength", De.name[1]), E.disabled = T(c), q(O, "min", De.replace_at_km[0]), q(O, "max", De.replace_at_km[1]), q(O, "step", De.replace_at_km[2]), O.disabled = T(c), M.disabled = T(c);
			}), y("submit", C, g), we(E, () => T(i), (e) => Y(i, e)), we(O, () => T(a), (e) => Y(a, e)), G(e, u);
		},
		$$slots: { default: !0 }
	}), (e) => r = e, () => r), V(S);
}
N(["change", "click"]);
// src/lib/ui/WorkoutDialog.svelte
var Yn = W("<p class=\"msg\" role=\"status\"> </p>"), Xn = W("<p class=\"msg\" role=\"status\">Loading…</p>"), Zn = W("<span class=\"mini svelte-1uaoa1p\"> </span>"), Qn = W("<span class=\"mini off svelte-1uaoa1p\"> </span>"), $n = W("<div><dt class=\"svelte-1uaoa1p\"> </dt><dd class=\"svelte-1uaoa1p\"> </dd></div>"), er = W("<option disabled=\"\"> </option>"), tr = W("<option> </option>"), nr = W("<div class=\"shoe svelte-1uaoa1p\"><dt class=\"svelte-1uaoa1p\"><label>Shoe</label></dt><dd class=\"svelte-1uaoa1p\"><select class=\"svelte-1uaoa1p\"><!><!></select></dd></div>"), rr = W("<dl class=\"svelte-1uaoa1p\"><!> <!></dl>"), ir = W("<p class=\"caption note svelte-1uaoa1p\"> </p>"), ar = W("<p> </p>"), or = W("<p class=\"check svelte-1uaoa1p\"> </p>"), sr = W("<button type=\"button\">Not a run…</button>"), cr = W("<select aria-label=\"Change the type to\" class=\"svelte-1uaoa1p\"><option disabled=\"\">Choose a type</option><!><!></select>"), lr = W("<button type=\"button\" class=\"link svelte-1uaoa1p\">Clear decision</button>"), ur = W("<div class=\"acts review svelte-1uaoa1p\"><button type=\"button\">Counts for the plan day</button> <button type=\"button\">A run, not the programme</button> <!> <!> <!></div>"), dr = W("<h3 class=\"svelte-1uaoa1p\">Programme</h3> <!> <!>", 1), fr = W("<p class=\"caption note svelte-1uaoa1p\">Map unavailable</p>"), pr = W("<div class=\"ph svelte-1uaoa1p\" aria-hidden=\"true\"></div>"), mr = W("<h3 class=\"svelte-1uaoa1p\"> </h3> <!>", 1), hr = W("<!> <!>", 1), gr = W("<li class=\"svelte-1uaoa1p\"><span class=\"zn svelte-1uaoa1p\"> <small class=\"svelte-1uaoa1p\"> </small></span> <span class=\"bar svelte-1uaoa1p\"><span class=\"svelte-1uaoa1p\"></span></span> <span class=\"num svelte-1uaoa1p\"> </span></li>"), _r = W("<h3 class=\"svelte-1uaoa1p\">Heart-rate zones</h3> <ul class=\"zones svelte-1uaoa1p\"></ul>", 1), vr = W("<tr><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td></tr>"), yr = W("<h3 class=\"svelte-1uaoa1p\">Splits</h3> <table class=\"svelte-1uaoa1p\"><thead><tr><th class=\"svelte-1uaoa1p\">Km</th><th class=\"svelte-1uaoa1p\">Time</th><th class=\"svelte-1uaoa1p\"> </th><th class=\"svelte-1uaoa1p\">HR</th><th class=\"svelte-1uaoa1p\">Climb</th></tr></thead><tbody></tbody></table>", 1), br = W("<span role=\"img\" aria-label=\"Record\">🏆</span>"), xr = W("<li class=\"svelte-1uaoa1p\"> <b class=\"svelte-1uaoa1p\"> </b><!></li>"), Sr = W("<h3 class=\"svelte-1uaoa1p\">Exercises</h3> <ul class=\"gym svelte-1uaoa1p\"><!> <li class=\"vol svelte-1uaoa1p\">Total volume · <b class=\"svelte-1uaoa1p\"> </b></li></ul>", 1), Cr = W("<span class=\"ask svelte-1uaoa1p\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1uaoa1p\">Delete</button>", 1), wr = W("<button type=\"button\"> </button>"), Tr = W("<div class=\"acts svelte-1uaoa1p\"><!></div>"), Er = W("<p class=\"sub svelte-1uaoa1p\"> <!> <!></p> <!> <!> <!> <!> <!> <!> <!> <!>", 1);
function Dr(e, t) {
	let n = k();
	U(t, !0);
	let i = J(t, "shoes", 3, null), a = J(t, "reviewTypes", 19, () => ({})), c = () => import("./viz-ByVPPnL_.js"), l, u = x(null), f = x(null), m = x(null), g = x(null), v = x(null), y = x(!1), S = x(!1), C = 0;
	async function w(e) {
		let n = l.show();
		if (!n) return;
		let r = ++C;
		Y(u, e), Y(f, Y(m, Y(v, null))), Y(y, Y(S, !1), !0), n.scrollTop = 0;
		try {
			let n = await pe(`workout?person=${encodeURIComponent(t.person)}&key=${encodeURIComponent(e.key)}`);
			if (r !== C) return;
			Y(f, n), (n.route?.length || n.series) && !T(g) && c().then((e) => Y(g, e), (e) => r === C && Y(v, e));
		} catch (e) {
			r === C && Y(m, e);
		}
	}
	function E() {
		C++, Y(u, Y(f, null));
	}
	let D = H(() => T(u) && `${t.person}/${T(u).key}`), O = H(() => T(D) && ot[T(D)]), A = H(() => {
		if (!T(u)) return null;
		let e = t.feed.find((e) => e.key === T(u).key) ?? {
			...T(f)?.summary,
			...T(u),
			excluded: st[T(D)] ?? T(u).excluded ?? !1
		};
		return T(O) && T(O).want !== null ? {
			...e,
			excluded: T(O).want
		} : e;
	}), M = H(() => T(f) && T(A) ? ke(t.viewer, t.person, T(A)) : {
		remove: null,
		shoe: !1
	}), N = H(() => T(M).shoe && i() ? b(i(), t.runShoes?.[T(u).key]) : null), P = H(() => T(f) && Ge(T(f).summary)), ee = H(() => T(f) ? fe(T(f)).filter(([e]) => !(e === "Shoe" && T(N)?.options.length)) : []), F = H(() => T(f) && Fe(T(f))), I = H(() => T(f) && Ce(T(f).zones, T(f).max_hr)), te = H(() => T(f) ? ye(T(f)) : []), ne = H(() => T(f) && Re(T(f).gym)), re = H(() => T(f) && Xe(T(f))), L = H(() => T(A)?.check ?? null), R = H(() => T(A)?.review ?? null), ie = H(() => a()[T(A)?.source] ?? []), ae = H(() => T(A)?.km && T(A).minutes ? T(A).km / (T(A).minutes / 60) : null), oe = (e) => e.status === 404 ? "Workout not found" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant";
	async function se(e) {
		let n = e.currentTarget;
		await St(t.person, T(u).key, Number(n.value)) || (n.value = String(T(N).value));
	}
	let ce = (e, n = null, r = "") => xt(t.person, T(u).key, e, n, r);
	async function le(e) {
		let t = e.currentTarget.value;
		await ce("type", t, T(ie).find((e) => e.match === t)?.name ?? t);
	}
	let ue = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function me() {
		T(M).remove === "delete" ? Y(y, !0) : _t(t.person, T(u).key, T(M).remove);
	}
	var he = { open: w };
	{
		let i = H(() => T(P)?.title ?? T(u)?.name ?? "Workout");
		K(gn(e, {
			get title() {
				return T(i);
			},
			drag: !0,
			wide: !0,
			onclose: E,
			children: (e, i) => {
				var a = r(), c = z(a), b = (e) => {
					var t = Yn(), n = B(t, !0);
					$((e) => j(n, e), [() => oe(T(m))]), G(e, t);
				}, x = (e) => {
					var t = Xn();
					G(e, t);
				}, C = (e) => {
					var i = Er(), a = z(i), c = _(a), m = h(c), b = (e) => {
						var t = Zn(), n = B(t, !0);
						$(() => j(n, T(P).plan)), G(e, t);
					};
					d(m, (e) => {
						T(P).plan && e(b);
					});
					var x = h(m, 2), C = (e) => {
						var t = Qn(), n = B(t, !0);
						$((e) => j(n, e), [() => o(T(A)).label]), G(e, t);
					}, w = H(() => T(A) && o(T(A)).label);
					d(x, (e) => {
						T(w) && e(C);
					}), X(a);
					var E = h(a, 2), D = (e) => {
						var t = rr(), r = _(t);
						s(r, 17, () => T(ee), ([e, t]) => e, (e, t) => {
							var n = H(() => Ue(T(t), 2));
							let r = () => T(n)[0], i = () => T(n)[1];
							var a = $n(), o = _(a), s = B(o, !0), c = h(o), l = B(c, !0);
							X(a), $(() => {
								j(s, r()), j(l, i());
							}), G(e, a);
						});
						var i = h(r, 2), a = (e) => {
							var t = nr(), r = _(t), i = B(r), a = h(r), o = _(a), c = _(o), l = (e) => {
								var t = er(), n = B(t, !0);
								t.value = t.__value = "", $(() => j(n, T(N).extra)), G(e, t);
							};
							d(c, (e) => {
								T(N).extra && e(l);
							});
							var u = h(c);
							s(u, 17, () => T(N).options, (e) => e.id, (e, t) => {
								var n = tr(), r = B(n, !0), i = {};
								$(() => {
									j(r, T(t).label), i !== (i = T(t).id) && (n.value = (n.__value = i) ?? "");
								}), G(e, n);
							}), X(o);
							var f;
							Ee(o), X(a), X(t), $(() => {
								q(i, "for", `${n}-shoe`), q(o, "id", `${n}-shoe`), f !== (f = T(N).value) && (o.value = (o.__value = f) ?? "", de(o, f));
							}), p("change", o, se), G(e, t);
						};
						d(i, (e) => {
							T(N)?.options.length && e(a);
						}), X(t), G(e, t);
					};
					d(E, (e) => {
						(T(ee).length || T(N)?.options.length) && e(D);
					});
					var k = h(E, 2), oe = (e) => {
						var t = ir(), n = B(t, !0);
						$((e) => j(n, e), [() => _e(T(f).note)]), G(e, t);
					}, V = H(() => _e(T(f).note));
					d(k, (e) => {
						T(V) && e(oe);
					});
					var U = h(k, 2), fe = (e) => {
						var t = dr(), n = h(z(t), 2), r = (e) => {
							var t = ar();
							let n;
							var r = B(t, !0);
							$((e) => {
								n = Q(t, 1, "check svelte-1uaoa1p", null, n, { warn: T(A).needs_review }), j(r, e);
							}, [() => Te(T(L), T(ae))]), G(e, t);
						}, i = (e) => {
							var t = or(), n = B(t);
							$((e) => j(n, `Changed to ${e ?? ""}`), [() => T(ie).find((e) => e.match === T(R).type_match)?.name ?? T(R).type_match]), G(e, t);
						};
						d(n, (e) => {
							T(L) ? e(r) : T(R).decision === "type" && e(i, 1);
						});
						var a = h(n, 2), o = (e) => {
							var t = ur(), n = _(t);
							let r;
							var i = h(n, 2);
							let a;
							var o = h(i, 2), c = (e) => {
								var t = sr();
								let n;
								$(() => {
									n = Q(t, 1, "btn svelte-1uaoa1p", null, n, { on: T(R)?.decision === "type" }), q(t, "aria-pressed", T(R)?.decision === "type");
								}), p("click", t, () => Y(S, !T(S))), G(e, t);
							};
							d(o, (e) => {
								T(ie).length && e(c);
							});
							var l = h(o, 2), u = (e) => {
								var t = cr(), n = _(t);
								n.value = n.__value = "";
								var r = h(n), i = (e) => {
									var t = tr(), n = B(t, !0), r = {};
									$(() => {
										j(n, T(R).type_match), r !== (r = T(R).type_match) && (t.value = (t.__value = r) ?? "");
									}), G(e, t);
								}, a = H(() => T(R)?.type_match && !T(ie).some((e) => e.match === T(R).type_match));
								d(r, (e) => {
									T(a) && e(i);
								});
								var o = h(r);
								s(o, 17, () => T(ie), (e) => e.match, (e, t) => {
									var n = tr(), r = B(n, !0), i = {};
									$(() => {
										j(r, T(t).name), i !== (i = T(t).match) && (n.value = (n.__value = i) ?? "");
									}), G(e, n);
								}), X(t);
								var c;
								Ee(t), $(() => {
									c !== (c = T(R)?.decision === "type" ? T(R).type_match : "") && (t.value = (t.__value = c) ?? "", de(t, c));
								}), p("change", t, le), G(e, t);
							};
							d(l, (e) => {
								(T(S) || T(R)?.decision === "type") && e(u);
							});
							var f = h(l, 2), m = (e) => {
								var t = lr();
								p("click", t, () => ce(null)), G(e, t);
							};
							d(f, (e) => {
								T(R) && e(m);
							}), X(t), $(() => {
								r = Q(n, 1, "btn svelte-1uaoa1p", null, r, { on: T(R)?.decision === "plan" }), q(n, "aria-pressed", T(R)?.decision === "plan"), a = Q(i, 1, "btn svelte-1uaoa1p", null, a, { on: T(R)?.decision === "run" }), q(i, "aria-pressed", T(R)?.decision === "run");
							}), p("click", n, () => ce("plan", null, T(L)?.label ?? "the plan day")), p("click", i, () => ce("run")), G(e, t);
						};
						d(a, (e) => {
							T(M).remove !== null && (T(A).needs_review || T(R)) && e(o);
						}), G(e, t);
					};
					d(U, (e) => {
						(T(L) || T(R)) && e(fe);
					});
					var pe = h(U, 2), he = (e) => {
						var t = r(), n = z(t), i = (e) => {
							var t = fr();
							G(e, t);
						}, a = (e) => {
							var t = pr();
							let n;
							$(() => n = Z(t, "", n, { height: `${T(f).route?.length ? 220 : 0}px` })), G(e, t);
						}, o = (e) => {
							var t = hr(), n = z(t), i = (e) => {
								var t = r(), n = z(t);
								{
									let e = H(() => Ne(T(f)) ? "run" : "gym");
									nt(n, () => T(g).MapView, (t, n) => {
										n(t, {
											get route() {
												return T(f).route;
											},
											get kind() {
												return T(e);
											}
										});
									});
								}
								G(e, t);
							};
							d(n, (e) => {
								T(f).route?.length && e(i);
							});
							var a = h(n, 2);
							s(a, 17, () => T(F)?.list ?? [], (e) => e.label, (e, t) => {
								var n = mr(), r = z(n), i = B(r, !0), a = h(r, 2);
								nt(a, () => T(g).Chart, (e, n) => {
									n(e, {
										get x() {
											return T(F).x;
										},
										get label() {
											return T(t).label;
										},
										get values() {
											return T(t).values;
										},
										get color() {
											return T(t).color;
										},
										get fmt() {
											return T(t).fmt;
										}
									});
								}), $(() => j(i, T(t).label)), G(e, n);
							}), G(e, t);
						};
						d(n, (e) => {
							T(v) ? e(i) : T(g) ? e(o, -1) : e(a, 1);
						}), G(e, t);
					};
					d(pe, (e) => {
						(T(f).route?.length || T(F)?.list.length) && e(he);
					});
					var ge = h(pe, 2), ve = (e) => {
						var t = _r(), n = h(z(t), 2);
						s(n, 21, () => T(I), (e) => e.zone, (e, t) => {
							var n = gr(), r = _(n), i = _(r), a = h(i), o = B(a, !0);
							X(r);
							var s = h(r, 2), c = _(s);
							let l;
							X(s);
							var u = h(s, 2), d = B(u);
							X(n), $(() => {
								j(i, `${T(t).zone ?? ""} `), j(o, T(t).bpm), l = Z(c, "", l, { width: `${T(t).pct ?? ""}%` }), j(d, `${T(t).time ?? ""} · ${T(t).pct ?? ""}%`);
							}), G(e, n);
						}), X(n), G(e, t);
					};
					d(ge, (e) => {
						T(I) && e(ve);
					});
					var ye = h(ge, 2), be = (e) => {
						var t = yr(), n = h(z(t), 2), r = _(n), i = _(r), a = h(_(i), 2), o = B(a, !0);
						xe(2), X(i), X(r);
						var c = h(r);
						s(c, 21, () => T(te), et, (e, t) => {
							var n = vr(), r = _(n), i = B(r, !0), a = h(r), o = B(a, !0), s = h(a), c = B(s, !0), l = h(s), u = B(l, !0), d = h(l), f = B(d, !0);
							X(n), $(() => {
								j(i, T(t).km), j(o, T(t).time), j(c, T(t).pace), j(u, T(t).hr), j(f, T(t).climb);
							}), G(e, n);
						}), X(c), X(n), $(() => j(o, T(re) ? "km/h" : "Pace")), G(e, t);
					};
					d(ye, (e) => {
						T(te).length && e(be);
					});
					var Se = h(ye, 2), Ce = (e) => {
						var t = Sr(), n = h(z(t), 2), r = _(n);
						s(r, 17, () => T(ne).exercises, et, (e, t) => {
							var n = xr(), r = _(n), i = h(r), a = B(i, !0), o = h(i), s = (e) => {
								var t = br();
								G(e, t);
							};
							d(o, (e) => {
								T(t).record && e(s);
							}), X(n), $(() => {
								j(r, `${T(t).name ?? ""} · `), j(a, T(t).set);
							}), G(e, n);
						});
						var i = h(r, 2), a = h(_(i)), o = B(a, !0);
						X(i), X(n), $(() => j(o, T(ne).volume)), G(e, t);
					};
					d(Se, (e) => {
						T(ne) && e(Ce);
					});
					var we = h(Se, 2), De = (e) => {
						var n = Tr(), r = _(n), i = (e) => {
							var n = Cr(), r = h(z(n), 2), i = h(r, 2);
							p("click", r, () => Y(y, !1)), p("click", i, () => (_t(t.person, T(u).key, "remove"), l.close())), G(e, n);
						}, a = (e) => {
							var t = wr();
							let n;
							var r = B(t, !0);
							$(() => {
								n = Q(t, 1, "btn svelte-1uaoa1p", null, n, { danger: T(M).remove !== "restore" }), j(r, ue[T(M).remove]);
							}), p("click", t, me), G(e, t);
						};
						d(r, (e) => {
							T(y) ? e(i) : e(a, -1);
						}), X(n), G(e, n);
					};
					d(we, (e) => {
						T(M).remove && T(O)?.want !== null && e(De);
					}), $(() => j(c, `${T(P).date ?? ""} · ${T(P).time ?? ""} · ${T(P).duration ?? ""} `)), G(e, i);
				};
				d(c, (e) => {
					T(m) ? e(b) : T(f) ? e(C, -1) : e(x, 1);
				}), G(e, a);
			},
			$$slots: { default: !0 }
		}), (e) => l = e, () => l);
	}
	return V(he);
}
N(["change", "click"]);
// src/lib/ui/Details.svelte
var Or = W("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), kr = W("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), Ar = W("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), jr = W("<section><h2 class=\"svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), Mr = W("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!> <!> <!>", 1);
function Nr(e, t) {
	let n = k();
	U(t, !0);
	let r = J(t, "connect", 3, null), i = J(t, "reviewTypes", 19, () => ({})), a = H(() => R(t.person.pbs)), o = H(() => se(t.person, t.canEdit)), s = x(void 0), c = x(void 0), l = (e) => T(c).open(e);
	var u = Mr(), f = z(u), m = (e) => {
		var r = Or(), i = _(r);
		sn(h(i, 2), { get plan() {
			return t.person.plan;
		} }), X(r), $(() => {
			q(r, "aria-labelledby", `${n}-plan`), q(i, "id", `${n}-plan`);
		}), G(e, r);
	};
	d(f, (e) => {
		t.person.plan && e(m);
	});
	var g = h(f, 2), v = _(g), y = h(v, 2);
	L(y, () => t.id, (e) => {
		$t(e, {
			get person() {
				return t.id;
			},
			get items() {
				return t.person.feed;
			},
			get records() {
				return T(a);
			},
			onopen: l
		});
	}), X(g);
	var b = h(g, 2), S = _(b), C = h(_(S)), w = B(C);
	X(S), Rt(h(S, 2), { get badges() {
		return t.person.badges;
	} }), X(b);
	var E = h(b, 2), D = _(E);
	Nn(h(D, 2), {
		get person() {
			return t.person;
		},
		onopen: l
	}), X(E);
	var O = h(E, 2);
	{
		let e = H(() => T(o) ? t.person.shoes : null);
		K(Dr(O, {
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
				return T(e);
			},
			get runShoes() {
				return t.person.run_shoes;
			},
			get reviewTypes() {
				return i();
			}
		}), (e) => Y(c, e, !0), () => T(c));
	}
	var A = h(O, 2), M = (e) => {
		var r = jr(), i = z(r), a = _(i), c = h(_(a)), l = (e) => {
			var t = kr();
			p("click", t, () => T(s).open()), G(e, t);
		};
		d(c, (e) => {
			T(o) && e(l);
		}), X(a);
		var u = h(a, 2), f = (e) => {
			Ln(e, { get shoes() {
				return t.person.shoes;
			} });
		}, m = (e) => {
			var t = Ar();
			G(e, t);
		};
		d(u, (e) => {
			t.person.shoes.length ? e(f) : e(m, -1);
		}), X(i);
		var g = h(i, 2), v = (e) => {
			K(Jn(e, {
				get person() {
					return t.id;
				},
				get shoes() {
					return t.person.shoes;
				}
			}), (e) => Y(s, e, !0), () => T(s));
		};
		d(g, (e) => {
			T(o) && e(v);
		}), $(() => {
			q(i, "aria-labelledby", `${n}-shoes`), q(a, "id", `${n}-shoes`);
		}), G(e, r);
	};
	d(A, (e) => {
		(t.person.shoes?.length || T(o)) && e(M);
	});
	var N = h(A, 2), P = (e) => {
		Mt(e, {
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
	}), $(() => {
		q(g, "aria-labelledby", `${n}-feed`), q(v, "id", `${n}-feed`), q(b, "aria-labelledby", `${n}-badges`), q(S, "id", `${n}-badges`), j(w, `${t.person.badges.count ?? ""} unlocked`), q(E, "aria-labelledby", `${n}-pbs`), q(D, "id", `${n}-pbs`);
	}), G(e, u), V();
}
N(["click"]);
// src/lib/ui/Goals.svelte
var Pr = W("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), Fr = W("<p class=\"msg\" role=\"status\"> </p>"), Ir = W("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!> <label class=\"year svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Birth year</span> <input type=\"number\" inputmode=\"numeric\" min=\"1900\" placeholder=\"1990\" class=\"svelte-7wncvy\"/></label> <p class=\"caption maxhr svelte-7wncvy\"> </p></section>"), Lr = W("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), Rr = W("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), zr = W("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), Br = W("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function Vr(e, t) {
	let r = k();
	U(t, !0);
	let i = [], a = (e, n = Ie, r = Ie, i = Ie) => {
		let a = H(() => {
			let [e, t, n] = Be[r()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var o = Pr(), s = _(o), c = B(s, !0), l = h(s, 2), u = h(l, 2), d = B(u, !0), f = h(u, 2);
		X(o), $((e, s, u, p) => {
			q(o, "aria-label", i()), j(c, e), q(l, "aria-label", `Fewer ${s ?? ""}`), l.disabled = t.readOnly || n()[r()] <= T(a).lo, j(d, u), q(f, "aria-label", `More ${p ?? ""}`), f.disabled = t.readOnly || n()[r()] >= T(a).hi;
		}, [
			() => i().split(",")[0],
			() => b(i()),
			() => S(r(), n()[r()]),
			() => b(i())
		]), p("click", l, () => n()[r()] = ue(r(), n()[r()] - T(a).step)), p("click", f, () => n()[r()] = ue(r(), n()[r()] + T(a).step)), G(e, o);
	}, o = x(null), c = x(null), l = x(null), m = x(!1);
	me(() => {
		pe("settings").then((e) => {
			Y(o, e, !0), Y(l, u(e, t.people), !0);
		}, (e) => Y(c, e, !0));
	});
	let g = {
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
	], y = {
		together: "Workouts together per week",
		team: "Team points per week"
	}, b = (e) => e[0].toLowerCase() + e.slice(1), S = (e, t) => e === "steps" ? t.toLocaleString("en-US") : String(t);
	async function C() {
		Y(m, !0);
		let e = await gt(ee(T(l)), t.people);
		Y(m, !1), e && t.onsaved();
	}
	var w = Br(), E = h(z(w), 2), D = (e) => {
		var t = Fr(), n = B(t, !0);
		$(() => j(n, T(c) ? T(c).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), G(e, t);
	}, O = (e) => {
		var c = zr(), u = z(c), b = B(u), x = h(u, 2);
		s(x, 16, () => Object.keys(T(l).people), (e) => e, (e, n) => {
			let i = H(() => t.people[n]?.name ?? n);
			var o = Ir(), c = _(o), u = B(c, !0), d = h(c, 2);
			s(d, 16, () => Pe, (e) => e, (e, t) => {
				a(e, () => T(l).people[n], () => t, () => `${g[t]}, ${T(i)}`);
			});
			var p = h(d, 2), m = h(_(p), 2);
			Ve(m), X(p);
			var v = h(p, 2), y = B(v, !0);
			X(o), $((e, a) => {
				q(o, "aria-labelledby", `${r}-${n ?? ""}`), q(c, "id", `${r}-${n ?? ""}`), j(u, T(i)), q(m, "max", e), m.disabled = t.readOnly, j(y, a);
			}, [() => (/* @__PURE__ */ new Date()).getFullYear(), () => f(t.people[n]?.max_hr)]), we(m, () => T(l).profiles[n].birth_year, (e) => T(l).profiles[n].birth_year = e), G(e, o);
		});
		var S = h(x, 2), w = _(S), E = h(w, 2);
		s(E, 21, () => v, (e) => e.mode, (e, n) => {
			var a = Lr();
			let o;
			var s = _(a);
			Ve(s);
			var c, u = h(s, 1, !0);
			X(a), $(() => {
				o = Q(a, 1, "svelte-7wncvy", null, o, { on: T(l).couple.mode === T(n).mode }), q(s, "name", `${r}-mode`), s.disabled = t.readOnly, c !== (c = T(n).mode) && (s.value = (s.__value = c) ?? ""), j(u, T(n).label);
			}), be(i, [], s, () => (T(n).mode, T(l).couple.mode), (e) => T(l).couple.mode = e), G(e, a);
		}), X(E);
		var D = h(E, 2), O = B(D, !0), k = h(D, 2), A = (e) => {
			a(e, () => T(l).couple, () => T(l).couple.mode, () => y[T(l).couple.mode]);
		};
		d(k, (e) => {
			y[T(l).couple.mode] && e(A);
		});
		var M = h(k, 2), N = h(_(M), 2);
		Ve(N), X(M), X(S);
		var P = h(S, 2), ee = (e) => {
			var t = Rr();
			$(() => t.disabled = T(m)), p("click", t, C), G(e, t);
		};
		d(P, (e) => {
			t.readOnly || e(ee);
		}), $((e, n) => {
			j(b, `Applies from this week (week ${e ?? ""})`), q(S, "aria-labelledby", `${r}-couple`), q(w, "id", `${r}-couple`), q(E, "aria-labelledby", `${r}-couple`), j(O, n), N.disabled = t.readOnly;
		}, [() => n(T(o).week_start), () => v.find((e) => e.mode === T(l).couple.mode).hint]), we(N, () => T(l).couple.reward, (e) => T(l).couple.reward = e), G(e, c);
	};
	d(E, (e) => {
		T(l) ? e(O, -1) : e(D);
	}), G(e, w), V();
}
N(["click"]);
// src/lib/ui/Header.svelte
var Hr = W("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), Ur = D("<svg class=\"brand svelte-16l0jix\" viewBox=\"0 0 100 100\" aria-hidden=\"true\"><defs><linearGradient id=\"hdr-brand\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#FFB340\"></stop><stop offset=\"1\" stop-color=\"#FF453A\"></stop></linearGradient></defs><rect width=\"100\" height=\"100\" rx=\"22.4\" fill=\"url(#hdr-brand)\"></rect><path d=\"M50 20 L80 45 V80 H20 V45 Z\" fill=\"#FFF\" stroke=\"#FFF\" stroke-width=\"6\" stroke-linejoin=\"round\"></path><path d=\"M50 42 C55 49 63 55 63 65.5 a13 13 0 0 1 -26 0 C37 58 42 53 45.5 49 C46 53.5 48 56.5 51 57.5 C49.5 52 49 47 50 42 Z\" fill=\"#FF6B2C\"></path></svg>"), Wr = W("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), Gr = W("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"><!> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function Kr(e, t) {
	let n = J(t, "subtitle", 3, ""), r = J(t, "actionLabel", 3, ""), i = J(t, "brand", 3, !1), a = x(0);
	var o = Gr();
	let s;
	var c = _(o), l = _(c), u = (e) => {
		var n = Hr();
		p("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), G(e, n);
	};
	d(l, (e) => {
		t.onback && e(u);
	});
	var f = h(l, 2), m = _(f), g = _(m), v = (e) => {
		var t = Ur();
		G(e, t);
	};
	d(g, (e) => {
		i() && e(v);
	});
	var y = h(g);
	X(m);
	var b = h(m, 2), S = (e) => {
		var n = Wr(), i = B(n, !0);
		$(() => j(i, r())), p("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), G(e, n);
	};
	d(b, (e) => {
		t.onaction && e(S);
	}), X(f);
	var C = h(f, 2), w = B(C, !0);
	X(c), X(o), $(() => {
		s = Q(o, 1, "svelte-16l0jix", null, s, { scrolled: T(a) > 0 }), j(y, ` ${t.title ?? ""}`), j(w, n() || "\xA0");
	}), ve("y", () => T(a), (e) => Y(a, e, !0)), G(e, o);
}
N(["click"]);
// src/lib/motion.js
function qr(e, { onFrame: t, onSettle: n, snap: r = {
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
var Jr = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), Yr = (e) => Jr(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function Xr({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var Zr = D("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Qr = D("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function $r(e, t) {
	U(t, !0);
	let n = J(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, a = x(C(Je.reducedMotion ? i : 0)), o = H(() => n() * .11), c = H(() => t.fractions.map((e, t) => {
		let s = n() / 2 - T(o) / 2 - t * T(o) * 1.3, c = 2 * Math.PI * s;
		return {
			kind: r[t],
			r: s,
			c,
			len: c * e * T(a) / i
		};
	}));
	me(() => {
		if (T(a) === i) return;
		let e = qr(Xr({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => Y(a, e, !0) });
		return e.to(i), e.stop;
	});
	var l = Qr();
	let u;
	s(l, 21, () => T(c), (e) => e.kind, (e, t) => {
		var r = Zr(), i = z(r);
		let a;
		var s = h(i);
		let c;
		$(() => {
			q(i, "cx", n() / 2), q(i, "cy", n() / 2), q(i, "r", T(t).r), q(i, "stroke-width", T(o)), a = Z(i, "", a, { stroke: `var(--${T(t).kind ?? ""})` }), q(s, "cx", n() / 2), q(s, "cy", n() / 2), q(s, "r", T(t).r), q(s, "stroke-width", T(o)), q(s, "stroke-dasharray", `${T(t).len ?? ""} ${T(t).c ?? ""}`), q(s, "opacity", +(T(t).len > .01)), q(s, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = Z(s, "", c, { stroke: `var(--${T(t).kind ?? ""})` });
		}), G(e, r);
	}), X(l), $(() => {
		q(l, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), u = Z(l, "", u, { width: `${n() / 16}rem` });
	}), G(e, l), V();
}
// src/lib/ui/PersonTile.svelte
var ei = W("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), ti = W("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), ni = W("<span class=\"streak svelte-1handop\"> </span>"), ri = W("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), ii = W("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), ai = W("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), oi = W("<span class=\"steps svelte-1handop\"> </span>"), si = W("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), ci = W("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), li = W("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function ui(t, n) {
	U(n, !0);
	let r = J(n, "index", 3, 0), i = J(n, "compact", 3, !1), a = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], o = H(() => a[r() % a.length]), c = H(() => Ue(T(o), 2)), l = H(() => T(c)[0]), u = H(() => T(c)[1]), f = H(() => E(n.person)), g = H(() => n.person.week), v = [
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
	], y = H(() => v.map((e, t) => ({
		...e,
		n: te(T(g))[t],
		of: $e(T(g))[t]
	}))), b = H(() => e(n.person.steps_today, T(g).goal.steps)), x = H(() => [
		`Level ${T(f).level}`,
		i() ? `🔥 ${n.person.streak} wk` : `${n.person.xp.toLocaleString()} XP`,
		T(g).paused && "Week paused",
		T(g).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), S = H(() => `${n.person.name}, level ${T(f).level}. This week ${T(y).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${T(g).goal_pending ? "New goals pending. " : ""}${T(g).bonus ? "Weekly bonus earned. " : ""}${T(b) ? T(b).replace("👟 ", "") + ". " : ""}Streak ${n.person.streak} weeks.`);
	var C = li();
	let w;
	var D = _(C), O = _(D), k = _(O);
	let A;
	var M = B(k, !0), N = h(k, 2), P = _(N), ee = B(P, !0), F = h(P, 2), I = B(F, !0);
	X(N);
	var ne = h(N, 2), re = (e) => {
		var t = ti(), n = z(t), r = _(n);
		{
			let e = H(() => m(T(g)));
			$r(r, {
				get fractions() {
					return T(e);
				},
				size: 44
			});
		}
		var i = h(r, 2), a = (e) => {
			var t = ei();
			G(e, t);
		};
		d(i, (e) => {
			T(g).bonus && e(a);
		}), X(n);
		var o = h(n, 2), s = B(o, !0);
		$(() => j(s, T(S))), G(e, t);
	}, L = (e) => {
		var t = ni(), r = B(t);
		$(() => j(r, `🔥 ${n.person.streak ?? ""} wk`)), G(e, t);
	};
	d(ne, (e) => {
		i() ? e(re) : e(L, -1);
	});
	var R = h(ne, 2), ie = (e) => {
		var t = ri();
		G(e, t);
	};
	d(R, (e) => {
		n.onopen && e(ie);
	}), X(O);
	var ae = h(O, 2), oe = (e) => {
		var t = si(), n = z(t), r = _(n), i = _(r);
		{
			let e = H(() => m(T(g))), t = H(() => Je.wide ? 112 : 88);
			$r(i, {
				get fractions() {
					return T(e);
				},
				get size() {
					return T(t);
				}
			});
		}
		var a = h(i, 2), o = (e) => {
			var t = ii();
			G(e, t);
		};
		d(a, (e) => {
			T(g).bonus && e(o);
		}), X(r);
		var c = h(r, 2);
		s(c, 21, () => T(y), (e) => e.kind, (e, t) => {
			var n = ai(), r = _(n), i = _(r);
			let a;
			var o = h(i, 1, !0);
			X(r);
			var s = h(r, 2), c = _(s, !0), l = h(c), u = B(l);
			X(s), X(n), $(() => {
				a = Z(i, "", a, { background: `var(--${T(t).kind ?? ""})` }), j(o, T(t).label), j(c, T(t).n), j(u, `/${T(t).of ?? ""}`);
			}), G(e, n);
		}), X(c), X(n);
		var l = h(n, 2), u = (e) => {
			var t = oi(), n = B(t, !0);
			$(() => j(n, T(b))), G(e, t);
		};
		d(l, (e) => {
			T(b) && e(u);
		});
		var p = h(l, 2), v = _(p), x = _(v);
		let S;
		X(v);
		var C = h(v, 2), w = B(C);
		X(p), $((e, t) => {
			S = Z(x, "", S, { width: `${T(f).frac * 100}%` }), j(w, `${e ?? ""} of ${t ?? ""} XP to level ${T(f).level + 1}`);
		}, [() => T(f).into.toLocaleString(), () => T(f).span.toLocaleString()]), G(e, t);
	};
	d(ae, (e) => {
		i() || e(oe);
	}), X(D);
	var se = h(D, 2), ce = (e) => {
		var t = ci();
		$(() => q(t, "aria-label", T(S))), p("click", t, function(...e) {
			n.onopen?.apply(this, e);
		}), G(e, t);
	};
	d(se, (e) => {
		n.onopen && e(ce);
	}), X(C), $((e) => {
		w = Q(C, 1, "tile glass svelte-1handop", null, w, {
			compact: i(),
			opens: n.onopen
		}), q(D, "aria-hidden", n.onopen ? "true" : void 0), A = Z(k, "", A, {
			"--a1": T(l),
			"--a2": T(u)
		}), j(M, e), j(ee, n.person.name), j(I, T(x));
	}, [() => n.person.name.slice(0, 1)]), G(t, C), V();
}
N(["click"]);
// src/lib/ui/Sheet.svelte
var di = W("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), fi = W("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function pi(e, t) {
	U(t, !0);
	let n = J(t, "from", 3, null), r = 1e3, i = Je.reducedMotion, a = x(C(i ? r : 0)), o = x(0), s = x(1), c = x(!1), l = x("50% 100%"), u, f, m = !1, g = null, v = H(() => i ? +T(c) : Math.min(1, T(a) / 500)), b = H(() => i ? 1 : .5 + .5 * T(a) / r), S = () => {
		m && (T(a) === 0 || T(o) >= T(s)) && (m = !1, t.onclose());
	};
	function w(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = Xr({
					value: r,
					damping: o,
					response: s
				}), n = qr(t, {
					onFrame: e,
					onSettle: S
				}), n.to(i, a);
			}
		};
	}
	let E = w((e) => Y(a, e, !0)), D = w((e) => Y(o, e, !0));
	function O() {
		m || g || (m = !0, i ? (Y(c, !1), setTimeout(t.onclose, Yr("--fade"))) : E.to(T(a), 0, { response: .3 }));
	}
	function k(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), E.stop(), D.stop(), m = !1, g = {
			from: T(o),
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		});
	}
	function A(e) {
		if (!g) return;
		let t = g.from + e.clientY - g.start;
		Y(o, t < 0 ? -dn(-t, T(s)) : t, !0), g.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), g.samples.length > 8 && g.samples.shift();
	}
	function j(e) {
		if (!g) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = un([...g.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		g = null, ln(T(o), n, T(s)) ? i ? O() : (m = !0, D.to(T(o), T(s), {
			velocity: n,
			response: .3
		})) : i ? Y(o, 0) : (D.to(T(o), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), T(a) < r && E.to(T(a), r));
	}
	me(() => {
		if (n()) {
			let e = n().getBoundingClientRect();
			Y(l, `${e.left + e.width / 2 - u.offsetLeft}px ${e.top + e.height / 2 - u.offsetTop}px`);
		}
		f.focus({ preventScroll: !0 });
		let e = document.documentElement;
		return e.style.overflow = "hidden", i ? requestAnimationFrame(() => Y(c, !0)) : E.to(0, r), () => {
			E.stop(), D.stop(), e.style.overflow = "";
		};
	});
	var M = { close: O }, N = fi();
	y("keydown", ae, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && O());
	var P = z(N);
	let ee, F;
	var I = h(P, 2);
	let te, re;
	var L = _(I), R = h(_(L), 2), ie = _(R), oe = (e) => {
		var n = di();
		p("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), G(e, n);
	};
	d(ie, (e) => {
		t.onback && e(oe);
	});
	var B = h(ie, 2);
	K(B, (e) => f = e, () => f), X(R), X(L);
	var se = h(L, 2), ce = _(se);
	return ne(ce, () => t.children), X(se), X(I), K(I, (e) => u = e, () => u), $((e) => {
		ee = Q(P, 1, "scrim svelte-185xwm9", null, ee, { fade: i }), F = Z(P, "", F, { opacity: e }), te = Q(I, 1, "sheet svelte-185xwm9", null, te, { fade: i }), q(I, "aria-label", t.label), re = Z(I, "", re, {
			opacity: T(v),
			transform: `translate3d(0, ${T(o) ?? ""}px, 0) scale(${T(b) ?? ""})`,
			"transform-origin": T(l)
		});
	}, [() => T(v) * Math.min(1, Math.max(0, 1 - T(o) / T(s)))]), p("click", P, O), p("pointerdown", L, k), p("pointermove", L, A), p("pointerup", L, j), y("pointercancel", L, j), p("click", B, O), Ze(I, "offsetHeight", (e) => Y(s, e)), G(e, N), V(M);
}
N([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var mi = W("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), hi = W("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), gi = W("<p class=\"caption stale svelte-9nj5u4\"> </p>"), _i = W("<!> <!> <!>", 1);
function vi(e, t) {
	U(t, !0);
	let n = H(() => t.scoredAt ? P(t.scoredAt, t.now) : null);
	var r = _i(), i = z(r), a = (e) => {
		var n = mi(), r = h(_(n));
		X(n), $(() => j(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), G(e, n);
	};
	d(i, (e) => {
		t.configError && e(a);
	});
	var o = h(i, 2), s = (e) => {
		var n = hi(), r = h(_(n));
		X(n), $(() => j(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), G(e, n);
	};
	d(o, (e) => {
		t.settingsError && e(s);
	});
	var c = h(o, 2), l = (e) => {
		var t = gi(), r = B(t, !0);
		$(() => j(r, T(n))), G(e, t);
	};
	d(c, (e) => {
		T(n) && e(l);
	}), G(e, r), V();
}
// node_modules/svelte/src/internal/flags/legacy.js
t();
// src/lib/ui/Toast.svelte
var yi = W("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), bi = W("<span> </span> <!>", 1), xi = W("<div role=\"status\" aria-live=\"polite\"><!></div>");
function Si(e, t) {
	U(t, !1);
	function n() {
		let e = ct.undo;
		Object.assign(ct, {
			on: !1,
			undo: null
		}), e();
	}
	qe();
	var r = xi();
	let i;
	var a = _(r), o = (e) => {
		var t = bi(), r = z(t), i = B(r, !0), a = h(r, 2), o = (e) => {
			var t = yi();
			p("click", t, n), G(e, t);
		};
		d(a, (e) => {
			ct.undo && e(o);
		}), $(() => j(i, ct.text)), G(e, t);
	};
	d(a, (e) => {
		ct.on && e(o);
	}), X(r), $(() => i = Q(r, 1, "toast svelte-1fk2ial", null, i, { on: ct.on })), G(e, r), V();
}
N(["click"]);
// src/lib/ui/Together.svelte
var Ci = W("<p class=\"progress svelte-1tya3no\"> </p>"), wi = W("<p> </p>"), Ti = W("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), Ei = W("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function Di(e, t) {
	U(t, !0);
	let n = H(() => t.group.week ? Ye(t.group.week, t.people) : ""), r = H(() => t.group.week ? oe(t.group.week) : null), i = H(() => [
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
	var a = Ei(), o = h(_(a), 2), c = (e) => {
		var t = Ci(), r = B(t, !0);
		$(() => j(r, T(n))), G(e, t);
	};
	d(o, (e) => {
		T(n) && e(c);
	});
	var l = h(o, 2), u = (e) => {
		var n = wi();
		let i;
		var a = B(n, !0);
		$(() => {
			i = Q(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), j(a, T(r));
		}), G(e, n);
	};
	d(l, (e) => {
		T(r) && e(u);
	});
	var f = h(l, 2);
	s(f, 21, () => T(i), (e) => e.k, (e, t) => {
		var n = Ti(), r = _(n), i = B(r, !0), a = h(r), o = _(a, !0), s = h(o), c = B(s, !0);
		X(a), X(n), $(() => {
			j(i, T(t).k), j(o, T(t).v), j(c, T(t).unit);
		}), G(e, n);
	}), X(f), X(a), G(e, a), V();
}
// src/App.svelte
var Oi = W("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), ki = W("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), Ai = W("<div class=\"tiles compact svelte-1n46o8q\"></div>"), ji = W("<!> <!>", 1), Mi = W("<div class=\"tiles svelte-1n46o8q\"></div>"), Ni = W("<!> <!> <!> <!> <!>", 1), Pi = W("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function Fi(e, t) {
	U(t, !0);
	let n = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), r = new URLSearchParams(n.location.search), i = r.get("person"), o = /^\/(?!\/)/.test(r.get("back") ?? "") ? r.get("back") : null, c = o && (() => {
		n.history.pushState(null, "", o), n.dispatchEvent(new Event("location-changed"));
	}), l = x(null), u = (e) => (t) => Y(l, {
		id: e,
		from: t.currentTarget
	}, !0), f = x(null), p = x(void 0);
	async function m() {
		let e = T(l)?.from ?? T(f)?.from;
		Y(l, Y(f, null), !0), await I(), e?.focus({ preventScroll: !0 });
	}
	let g = x(null), v = x(null), y = x(C(/* @__PURE__ */ new Date())), b = C({}), S;
	async function w() {
		if (clearTimeout(S), !document.hidden) {
			try {
				Y(g, await pe("scores"), !0), Y(v, null), ht(T(g).people), i && Object.hasOwn(T(g).people, i) && i !== je(T(g).viewer, T(g).people).self && Y(l, {
					id: i,
					from: null
				}, !0), i = null;
			} catch (e) {
				Y(v, e, !0);
			}
			Y(y, /* @__PURE__ */ new Date(), !0), T(g) && E(T(g)), clearTimeout(S), S = setTimeout(w, T(g) ? 6e4 : 3e4);
		}
	}
	let E = (e) => Qe(e.viewer, e.people).forEach((e) => pe(`connect?person=${encodeURIComponent(e)}`).then((t) => {
		b[e] = t;
	}, () => {
		delete b[e];
	}));
	a(() => {
		w();
		let e = () => document.hidden || w();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(S), document.removeEventListener("visibilitychange", e);
		};
	}), a(() => {
		ut.n && w();
	});
	let D = H(() => Ae(T(g)?.people ?? {}, lt.entry)), O = H(() => Object.keys(T(D))), k = H(() => je(T(g)?.viewer ?? {}, T(D))), A = H(() => T(D)[T(k).self ?? T(O)[0]]?.week), M = (e) => !!T(g)?.viewer?.can_edit?.includes(e), N = H(() => !!T(k).self && rt(T(D)[T(k).self], b[T(k).self])), P = H(() => !!T(l) && Object.hasOwn(T(D), T(l).id) || !!T(f) && !!T(g));
	var ee = Pi(), F = z(ee), te = _(F);
	{
		let e = H(() => T(A) ? We(T(A)) : ""), t = H(() => T(g) ? (e) => Y(f, { from: e.currentTarget }, !0) : void 0);
		Kr(te, {
			title: "Training",
			brand: !0,
			get subtitle() {
				return T(e);
			},
			get onback() {
				return c;
			},
			actionLabel: "Goals",
			get onaction() {
				return T(t);
			}
		});
	}
	var ne = h(te, 2), re = _(ne), L = (e) => {
		var t = ki(), n = h(z(t), 2), r = (e) => {
			var t = Oi(), n = B(t, !0);
			$(() => j(n, T(v).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), G(e, t);
		};
		d(n, (e) => {
			T(v) && e(r);
		}), G(e, t);
	}, R = (e) => {
		var t = Ni(), n = z(t);
		vi(n, {
			get scoredAt() {
				return T(g).scored_at;
			},
			get configError() {
				return T(g).config_error;
			},
			get settingsError() {
				return T(g).settings_error;
			},
			get now() {
				return T(y);
			}
		});
		var r = h(n, 2), i = (e) => {
			Mt(e, {
				get info() {
					return b[T(k).self];
				},
				get now() {
					return T(y);
				},
				get person() {
					return T(D)[T(k).self];
				}
			});
		};
		d(r, (e) => {
			T(N) && e(i);
		});
		var a = h(r, 2), o = (e) => {
			var t = ji(), n = z(t), r = (e) => {
				var t = Ai();
				s(t, 20, () => T(k).others, (e) => e, (e, t) => {
					{
						let n = H(() => T(O).indexOf(t)), r = H(() => u(t));
						ui(e, {
							get person() {
								return T(D)[t];
							},
							get index() {
								return T(n);
							},
							compact: !0,
							get onopen() {
								return T(r);
							}
						});
					}
				}), X(t), G(e, t);
			};
			d(n, (e) => {
				T(k).others.length && e(r);
			});
			var i = h(n, 2);
			{
				let e = H(() => T(O).indexOf(T(k).self));
				ui(i, {
					get person() {
						return T(D)[T(k).self];
					},
					get index() {
						return T(e);
					}
				});
			}
			G(e, t);
		}, c = (e) => {
			var t = Mi();
			s(t, 20, () => T(k).others, (e) => e, (e, t) => {
				{
					let n = H(() => T(O).indexOf(t)), r = H(() => u(t));
					ui(e, {
						get person() {
							return T(D)[t];
						},
						get index() {
							return T(n);
						},
						get onopen() {
							return T(r);
						}
					});
				}
			}), X(t), G(e, t);
		};
		d(a, (e) => {
			T(k).self ? e(o) : e(c, -1);
		});
		var l = h(a, 2), f = (e) => {
			Di(e, {
				get group() {
					return T(g).group;
				},
				get people() {
					return T(D);
				}
			});
		};
		d(l, (e) => {
			T(g).group && e(f);
		});
		var p = h(l, 2), m = (e) => {
			{
				let t = H(() => M(T(k).self)), n = H(() => T(N) ? null : b[T(k).self]);
				Nr(e, {
					get id() {
						return T(k).self;
					},
					get person() {
						return T(D)[T(k).self];
					},
					get canEdit() {
						return T(t);
					},
					get viewer() {
						return T(g).viewer;
					},
					get reviewTypes() {
						return T(g).review_types;
					},
					get connect() {
						return T(n);
					},
					get now() {
						return T(y);
					}
				});
			}
		};
		d(p, (e) => {
			T(k).self && e(m);
		}), G(e, t);
	};
	d(re, (e) => {
		T(g) ? e(R, -1) : e(L);
	}), X(ne), X(F);
	var ie = h(F, 2), ae = (e) => {
		K(pi(e, {
			label: "Goals",
			get from() {
				return T(f).from;
			},
			onclose: m,
			get onback() {
				return c;
			},
			children: (e, t) => {
				{
					let t = H(() => !T(k).self);
					Vr(e, {
						get people() {
							return T(g).people;
						},
						get readOnly() {
							return T(t);
						},
						onsaved: () => T(p)?.close()
					});
				}
			},
			$$slots: { default: !0 }
		}), (e) => Y(p, e, !0), () => T(p));
	}, oe = (e) => {
		pi(e, {
			get label() {
				return `${T(D)[T(l).id].name ?? ""}'s details`;
			},
			get from() {
				return T(l).from;
			},
			onclose: m,
			get onback() {
				return c;
			},
			children: (e, t) => {
				var n = ji(), r = z(n);
				{
					let e = H(() => T(O).indexOf(T(l).id));
					ui(r, {
						get person() {
							return T(D)[T(l).id];
						},
						get index() {
							return T(e);
						}
					});
				}
				var i = h(r, 2);
				{
					let e = H(() => M(T(l).id));
					Nr(i, {
						get id() {
							return T(l).id;
						},
						get person() {
							return T(D)[T(l).id];
						},
						get canEdit() {
							return T(e);
						},
						get viewer() {
							return T(g).viewer;
						},
						get reviewTypes() {
							return T(g).review_types;
						},
						get connect() {
							return b[T(l).id];
						},
						get now() {
							return T(y);
						}
					});
				}
				G(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	d(ie, (e) => {
		T(f) && T(g) ? e(ae) : T(P) && e(oe, 1);
	}), Si(h(ie, 2), {}), $(() => F.inert = T(P)), G(e, ee), V();
}
// src/main.js
var Ii = (e) => l(Fi, { target: e }), Li = () => new Promise((e) => {
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
		Ke(e);
		let t = e.themes?.darkMode ?? matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.dataset.theme = t ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Li().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", Ii(e);
		}));
	}
});
