import { $ as e, $t as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Gt as h, H as g, Ht as _, I as v, It as y, J as b, Jt as x, K as S, Kt as C, L as w, Lt as T, M as E, Mt as D, N as O, Nt as k, O as A, Ot as j, P as M, Pt as N, Q as P, Qt as F, R as I, Rt as L, S as ee, St as R, T as te, Tt as z, U as ne, Ut as B, V as re, Vt as V, W as H, Wt as U, X as ie, Xt as W, Y as ae, Yt as G, Z as oe, Zt as se, _ as ce, _t as K, a as le, an as ue, at as q, b as de, bt as fe, c as pe, ct as J, d as me, dt as he, en as Y, et as ge, f as _e, ft as ve, g as ye, gt as be, h as xe, ht as Se, i as Ce, in as we, it as Te, j as Ee, jt as De, k as Oe, kt as ke, l as Ae, lt as je, m as Me, mt as Ne, n as Pe, nn as Fe, nt as Ie, o as Le, on as Re, ot as ze, p as Be, pt as X, q as Ve, qt as Z, rt as He, s as Ue, st as We, t as Ge, tn as Ke, tt as qe, u as Je, ut as Ye, v as Xe, vt as Q, w as Ze, wt as Qe, x as $e, xt as et, y as tt, yt as nt, z as rt, zt as it } from "./shared-5BpQZL6K.js";
// src/lib/actions.svelte.js
var at = 5e3, ot = h({}), st = h({}), ct = h({
	on: !1,
	text: "",
	undo: null
}), lt = h({
	entry: null,
	at: 0
}), ut = h({ n: 0 }), dt, ft = 0, pt = {};
function $(e, t = null) {
	clearTimeout(dt), Object.assign(ct, {
		on: !0,
		text: e,
		undo: t
	}), dt = setTimeout(() => ct.on = !1, at);
}
function mt(e, t = Date.now()) {
	for (let [n, r] of Object.entries(ot)) rt(r, e[r.person]?.feed ?? [], t) && delete ot[n];
	lt.entry && te(lt, e, t) && (lt.entry = null);
}
async function ht(e, t) {
	try {
		await ue("POST", "settings", e);
	} catch (e) {
		return $(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(lt, {
		entry: e,
		at: Date.now()
	}), mt(t), $("Saved · updates within 5 min"), !0;
}
async function gt(e, t, n) {
	let r = `${e}/${t}`, i = ot[r], a = ++ft, o = t.startsWith("manual:"), s = o && n === "remove" ? null : n === "remove";
	ot[r] = {
		person: e,
		key: t,
		want: s,
		at: Date.now(),
		n: a
	}, n === "remove" && !o && $("Removed", () => gt(e, t, "restore"));
	try {
		await m(pt, r, () => ue("POST", "workouts", {
			person: e,
			key: t,
			action: n
		})), st[r] = s;
	} catch (e) {
		ot[r]?.n === a && (i ? ot[r] = i : delete ot[r]), $(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
var _t = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
async function vt(e, t) {
	try {
		return await we(`feed?person=${encodeURIComponent(e)}&before=${t}`);
	} catch (e) {
		return $(_t(e)), null;
	}
}
async function yt(e) {
	try {
		await ue("POST", "shoes", e);
	} catch (e) {
		return $(_t(e)), !1;
	}
	return ut.n++, !0;
}
async function bt(e, t, n, r = null, i = "") {
	try {
		await ue("POST", "workouts", {
			action: "review",
			person: e,
			key: t,
			decision: n,
			...n === "type" && { type_match: r }
		});
	} catch (e) {
		return $(_t(e)), !1;
	}
	return ut.n++, $({
		plan: `Counts for ${i}`,
		run: "Kept as a run",
		type: `Changed to ${i}`
	}[n] ?? "Decision cleared"), !0;
}
async function xt(e, t, n) {
	try {
		await ue("POST", "workouts", {
			action: "shoe",
			person: e,
			key: t,
			shoe_id: n
		});
	} catch (e) {
		return $(_t(e)), !1;
	}
	return ut.n++, $("Moved to the other shoe"), !0;
}
// src/lib/ui/Connect.svelte
var St = r("<div class=\"url svelte-gy3e4s\"><input readonly=\"\" aria-label=\"Your address\" class=\"svelte-gy3e4s\"/> <button type=\"button\" class=\"btn press\" aria-label=\"Copy address\">Copy</button></div>"), Ct = r("<p class=\"warn svelte-gy3e4s\">This address only works at home.</p>"), wt = r("<p class=\"caption svelte-gy3e4s\"> </p> <div class=\"choice svelte-gy3e4s\"><button type=\"button\" class=\"btn press svelte-gy3e4s\">iPhone</button> <button type=\"button\" class=\"btn press svelte-gy3e4s\">Android</button></div>", 1), Tt = r("<li class=\"svelte-gy3e4s\"> </li>"), Et = r("<ol class=\"svelte-gy3e4s\"></ol>"), Dt = r("<p class=\"caption svelte-gy3e4s\"> <b> </b>, then Add to Home Screen.</p>"), Ot = r("<p> </p> <!> <!> <!> <!>", 1), kt = r("<details class=\"card connect svelte-gy3e4s\"><summary class=\"svelte-gy3e4s\">Connect your phone <small class=\"svelte-gy3e4s\"> </small></summary> <div class=\"inner svelte-gy3e4s\"><!></div></details>"), At = r("<section class=\"card connect svelte-gy3e4s\" aria-label=\"Connect your phone\"><div class=\"inner svelte-gy3e4s\"><h2 class=\"svelte-gy3e4s\">Connect your phone</h2><!></div></section>");
function jt(e, n) {
	W(n, !0);
	let r = (e) => {
		var r = Ot(), i = _(r);
		let a;
		var m = B(i, !0), h = U(i, 2), g = (e) => {
			var t = St(), r = V(t);
			ve(r), J(r, (e) => C(d, e), () => y(d));
			var i = U(r, 2);
			Y(t), L(() => Ne(r, n.info.url)), p("focus", r, (e) => e.currentTarget.select()), N("click", i, f), j(e, t);
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
			Y(i), L(() => l(r, y(c).title)), N("click", a, () => C(o, "iphone")), N("click", s, () => C(o, "android")), j(e, t);
		}, w = (e) => {
			var t = Et();
			R(t, 20, () => y(c).steps, (e) => e, (e, t) => {
				var n = Tt(), r = B(n, !0);
				L(() => l(r, t)), j(e, n);
			}), Y(t), j(e, t);
		};
		z(x, (e) => {
			y(s) ? e(w, -1) : e(S);
		});
		var T = U(x, 2), E = (e) => {
			var r = Dt(), i = V(r), a = U(i), o = B(a, !0);
			t(), Y(r), L(() => {
				l(i, `Open openGym at ${n.info.opengym.url ?? ""}, choose Sign up, enter code `), l(o, n.info.opengym.invite);
			}), j(e, r);
		};
		z(T, (e) => {
			n.info.opengym?.invite && e(E);
		}), L(() => {
			a = Q(i, 1, "status svelte-gy3e4s", null, a, { ok: y(u).state === "connected" }), l(m, y(u).text);
		}), j(e, r);
	}, i = q(n, "person", 3, null), a = q(n, "collapsed", 3, !1), o = Z(null), s = x(() => n.info.phone ?? y(o)), c = x(() => $e(y(s))), u = x(() => de(n.info, n.now, i())), d = Z(void 0);
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
		$(e ? "Copied" : "Select and copy the address");
	}
	var m = ke(), h = _(m), g = (e) => {
		var t = kt(), n = V(t), i = U(V(n)), a = B(i, !0);
		Y(n);
		var o = U(n, 2), s = V(o);
		r(s), Y(o), Y(t), L(() => l(a, y(u).state === "connected" ? "Connected" : "Waiting")), j(e, t);
	}, v = (e) => {
		var t = At(), n = V(t), i = U(V(n));
		r(i), Y(n), Y(t), j(e, t);
	};
	z(h, (e) => {
		a() ? e(g) : e(v, -1);
	}), j(e, m), G();
}
k(["click"]);
// src/lib/ui/Badges.svelte
var Mt = r("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), Nt = r("<ul class=\"svelte-m8wnum\"></ul>"), Pt = r("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), Ft = r("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), It = r("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function Lt(e, t) {
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
	}, r = (e) => n[String(e.icon).replace(/^mdi:/, "")] ?? "🏅", i = (e) => e.toLocaleString(void 0, { maximumFractionDigits: 1 });
	var a = It(), o = V(a), s = (e) => {
		var n = Nt();
		R(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = Mt(), i = V(n), a = B(i, !0), o = U(i, 2), s = B(o, !0), c = U(o, 2), u = B(c, !0);
			Y(n), L((e, n) => {
				l(a, e), l(s, y(t).title), l(u, n);
			}, [() => r(y(t)), () => ie(y(t).unlocked_at)]), j(e, n);
		}), Y(n), j(e, n);
	};
	z(o, (e) => {
		t.badges.recent.length && e(s);
	});
	var c = U(o, 2), u = (e) => {
		var n = Nt();
		R(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = Pt(), a = V(n), o = B(a, !0), s = U(a, 2), c = B(s, !0), u = U(s, 2), d = B(u), f = U(u, 2), p = V(f);
			let m;
			Y(f), Y(n), L((e, n, r, i) => {
				l(o, e), l(c, y(t).title), l(d, `${n ?? ""} of ${r ?? ""}`), m = K(p, "", m, { width: i });
			}, [
				() => r(y(t)),
				() => i(y(t).current),
				() => i(y(t).target),
				() => `${Math.min(1, y(t).current / y(t).target) * 100}%`
			]), j(e, n);
		}), Y(n), j(e, n);
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
	}), Y(a), j(e, a), G();
}
// src/lib/ui/FeedRow.svelte
var Rt = r("<span class=\"mini svelte-69s4be\"> </span>"), zt = r("<span> </span>"), Bt = r("<span class=\"mini svelte-69s4be\">Together</span>"), Vt = r("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), Ht = r("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), Ut = r("<span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span>", 1), Wt = r("<button type=\"button\" class=\"head svelte-69s4be\"><!></button>"), Gt = r("<div class=\"head svelte-69s4be\"><!></div>"), Kt = r("<li><!></li>");
function qt(e, t) {
	W(t, !0);
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
				n = Q(t, 1, "mini svelte-69s4be", null, n, { warn: y(a).chip.tone === "warn" }), l(r, y(a).chip.text);
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
		}), Y(u);
		var S = U(u, 2), C = B(S);
		Y(c);
		var w = U(c, 2), T = V(w), E = (e) => {
			var t = Ht();
			j(e, t);
		};
		z(T, (e) => {
			y(i) && e(E);
		});
		var D = U(T);
		Y(w), L(() => {
			Q(o, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), l(s, r[t.item.kind] ?? "💪"), l(d, `${y(a).title ?? ""} `), l(C, `${y(a).when ?? ""} · ${y(a).duration ?? ""}`), l(D, ` ${(y(a).removable === "restore" ? "Removed" : y(a).label ?? (y(a).xp && `${y(a).xp} XP`)) ?? ""}`);
		}), j(e, n);
	}, r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, i = x(() => ot[`${t.person}/${t.item.key}`]), a = x(() => o(y(i) && y(i).want !== null ? {
		...t.item,
		excluded: y(i).want
	} : t.item)), s = x(() => y(i)?.want === null), c = x(() => t.item.kind !== "active_day");
	var u = Kt();
	let d;
	var f = V(u), p = (e) => {
		var r = Wt(), i = V(r);
		n(i), Y(r), N("click", r, () => t.onopen(t.item)), j(e, r);
	}, m = (e) => {
		var t = Gt(), r = V(t);
		n(r), Y(t), j(e, t);
	};
	z(f, (e) => {
		y(c) ? e(p) : e(m, -1);
	}), Y(u), L(() => d = Q(u, 1, "svelte-69s4be", null, d, {
		dim: y(a).removable === "restore" || y(s),
		grey: !!y(a).label
	})), j(e, u), G();
}
k(["click"]);
// src/lib/ui/Feed.svelte
var Jt = r("<ul class=\"card svelte-n1344i\"></ul>"), Yt = r("<p class=\"caption empty svelte-n1344i\">No workouts in the last 90 days.</p>"), Xt = r("<button type=\"button\" class=\"btn older svelte-n1344i\">Load older</button>"), Zt = r("<!> <!>", 1);
function Qt(e, t) {
	W(t, !0);
	let n = Z(h([])), r = Z(!0), i = Z(!1), a = null, o = x(() => f(t.items, w(y(n), t.person, st)));
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
		}), Y(n), j(e, n);
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
	}), j(e, c), G();
}
k(["click"]);
// src/lib/ui/PlanBar.svelte
var $t = r("<span> </span>"), en = r("<i class=\"svelte-1y5m0aq\"></i>"), tn = r("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), nn = r("<span class=\"review svelte-1y5m0aq\"> </span>"), rn = r("<p class=\"caption prog svelte-1y5m0aq\"> <!></p>"), an = r("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!> <!></div>");
function on(e, n) {
	W(n, !0);
	let r = x(() => i(n.plan)), a = x(() => Math.round(((n.plan.warmup_s ?? 0) + n.plan.intervals.reduce((e, [, t]) => e + t, 0) + (n.plan.cooldown_s ?? 0)) / 60)), o = x(() => re(n.plan));
	var c = an(), u = V(c), d = V(u), f = B(d, !0), p = U(d, 2), m = (e) => {
		var t = $t();
		let r;
		var i = B(t, !0);
		L(() => {
			r = Q(t, 1, "tag svelte-1y5m0aq", null, r, { due: n.plan.due_today }), l(i, n.plan.due_today ? "Due today" : "Rest day");
		}), j(e, t);
	};
	z(p, (e) => {
		y(r).length && e(m);
	}), Y(u);
	var h = U(u, 2), g = (e) => {
		var n = tn(), i = _(n);
		R(i, 21, () => y(r), s, (e, t) => {
			var n = en();
			let r;
			L(() => r = K(n, "", r, {
				"flex-grow": y(t).frac,
				background: `var(--${y(t).kind === "run" ? "run" : "fill"})`
			})), j(e, n);
		}), Y(i);
		var o = U(i, 2), c = V(o), u = V(c);
		K(u, "", {}, { background: "var(--run)" });
		var d = U(u, 2);
		K(d, "", {}, { background: "var(--fill)" }), t(), Y(c);
		var f = U(c, 2), p = B(f);
		Y(o), L(() => {
			X(i, "aria-label", `Run and walk intervals, ${y(a) ?? ""} minutes in total`), l(p, `${y(a) ?? ""} min`);
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
		}), Y(t), L(() => l(r, y(o))), j(e, t);
	};
	z(v, (e) => {
		(y(o) || n.plan.review_pending) && e(b);
	}), Y(c), L(() => l(f, n.plan.state)), j(e, c), G();
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
	W(t, !0);
	let r = (e) => {
		var r = dn(), i = _(r), a = B(i, !0), o = U(i, 2);
		L(() => {
			X(i, "id", `${n}-t`), l(a, t.title);
		}), N("click", o, () => s.close()), j(e, r);
	}, i = q(t, "drag", 3, !1), a = q(t, "wide", 3, !1), o = q(t, "onclose", 3, null), s, c, u = Z(0), d = null, f = Z(!1), m = !1, h = !1;
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
		r(n), Y(t), N("pointerdown", t, x), N("pointermove", t, S), N("pointerup", t, w), p("pointercancel", t, w), j(e, t);
	}, P = (e) => {
		var t = pn(), n = V(t);
		r(n), Y(t), j(e, t);
	};
	z(A, (e) => {
		i() ? e(M) : e(P, -1);
	});
	var F = U(A, 2), I = V(F);
	return et(I, () => t.children), Y(F), J(F, (e) => c = e, () => c), Y(E), J(E, (e) => s = e, () => s), L(() => {
		X(E, "aria-labelledby", `${n}-t`), O = Q(E, 1, "svelte-9pi54v", null, O, {
			wide: a(),
			dragging: y(f)
		}), k = K(E, "", k, { transform: y(u) ? `translateY(${y(u)}px)` : null });
	}), N("pointerdown", E, (e) => h = e.target === s), N("click", E, (e) => e.target === s && h && s.close()), p("close", E, b), N("keydown", E, (e) => e.key === "Escape" && e.stopPropagation()), j(e, E), G(T);
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
	W(t, !0);
	let n;
	function r(e = null) {
		let t = n.show();
		t && (t.scrollTop = 0, e && t.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	var i = { open: r };
	return J(hn(e, {
		title: "All records",
		drag: !0,
		children: (e, n) => {
			var r = ke(), i = _(r);
			R(i, 17, () => t.groups, (e) => e.group, (e, t) => {
				var n = _n(), r = _(n), i = B(r, !0), a = U(r, 2);
				R(a, 21, () => y(t).lifts, (e) => e.id, (e, t) => {
					var n = gn(), r = V(n), i = V(r), a = U(i), o = B(a, !0), s = U(a);
					Y(r), Y(n), L((e, n) => {
						l(i, `${y(t).name ?? ""} · `), l(o, e), l(s, ` · ${n ?? ""}`);
					}, [() => E(y(t)), () => ie(y(t).date)]), j(e, n);
				}), Y(a), L(() => {
					X(r, "data-group", y(t).group), l(i, y(t).group);
				}), j(e, n);
			}), j(e, r);
		},
		$$slots: { default: !0 }
	}), (e) => n = e, () => n), G(i);
}
// src/lib/ui/StepBars.svelte
var yn = r("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), bn = r("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), xn = r("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function Sn(e, t) {
	W(t, !0);
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
		Y(a);
		var u = U(a, 2), d = B(u, !0);
		Y(n), L((e) => {
			X(n, "aria-label", e), X(n, "aria-hidden", y(t).future ? "true" : void 0), X(n, "aria-current", y(t).isToday ? "date" : void 0), i = Q(n, 1, "svelte-1f099m", null, i, { today: y(t).isToday }), s = Q(o, 1, "svelte-1f099m", null, s, {
				active: y(t).active,
				future: y(t).future
			}), c = K(o, "", c, { height: `${y(t).frac * 100}%` }), l(d, y(t).label);
		}, [() => y(t).future ? void 0 : r(y(t))]), j(e, n);
	}), Y(a);
	var o = U(a, 2), s = (e) => {
		var n = bn();
		let r;
		L(() => r = K(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), j(e, n);
	};
	z(o, (e) => {
		t.goalFrac !== null && e(s);
	}), Y(i), j(e, i), G();
}
// src/lib/ui/Progress.svelte
var Cn = r("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), wn = r("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), Tn = r("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), En = r("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), Dn = r("<span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span>", 1), On = r("<button type=\"button\" class=\"row svelte-kr1x1f\"><!></button>"), kn = r("<div class=\"row svelte-kr1x1f\"><!></div>"), An = r("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), jn = r("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function Mn(t, n) {
	W(n, !0);
	let r = x(() => n.person.week.goal.steps ?? 0), i = x(() => qe(n.person.steps_week, y(r), O())), a = x(() => n.person.pbs.lifts ?? []), o = x(() => c(y(a))), s, u = x(() => n.person.pbs.fastest_1k), d = x(() => n.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
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
		Y(n), L((e) => l(o, e), [() => e(y(i).bars)]), j(t, n);
	};
	z(p, (e) => {
		y(i) && e(m);
	});
	var h = U(p, 2), g = V(h), v = (e) => {
		var t = Tn(), n = _(t);
		R(n, 21, () => y(o), (e) => e.group, (e, t) => {
			var n = wn(), r = V(n), i = V(r), a = B(i, !0), o = U(i), c = V(o), u = U(c), d = B(u, !0);
			Y(o), Y(r), Y(n), L((e) => {
				l(a, y(t).group), l(c, `${y(t).lift.name ?? ""} · `), l(d, e);
			}, [() => E(y(t).lift)]), N("click", r, () => s.open(y(t).group)), j(e, n);
		}), Y(n);
		var r = U(n, 2), i = B(r);
		L(() => l(i, `All records (${y(a).length ?? ""})`)), N("click", r, () => s.open()), j(e, t);
	}, b = (e) => {
		var t = En();
		j(e, t);
	};
	z(g, (e) => {
		y(a).length ? e(v) : e(b, -1);
	}), Y(h);
	var S = U(h, 2), C = V(S), w = (e) => {
		let t = (e) => {
			var t = Dn(), n = U(_(t), 2), r = B(n);
			L((e, t) => l(r, `${e ?? ""} · ${t ?? ""}`), [() => I(y(u).seconds), () => ie(y(u).date)]), j(e, t);
		};
		var r = ke(), i = _(r), a = (e) => {
			var r = On(), i = V(r);
			t(i), Y(r), N("click", r, () => n.onopen({ key: y(u).key })), j(e, r);
		}, o = (e) => {
			var n = kn(), r = V(n);
			t(r), Y(n), j(e, n);
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
	Y(D);
	var P = U(D, 2), F = U(V(P)), ee = B(F);
	Y(P), Y(S);
	var te = U(S, 2);
	{
		let e = x(() => A(y(a)));
		J(vn(te, { get groups() {
			return y(e);
		} }), (e) => s = e, () => s);
	}
	L((e) => {
		l(M, `${e ?? ""} km`), l(ee, `${y(d) ?? ""} t`);
	}, [() => n.person.pbs.longest_session_km.toFixed(1)]), j(t, f), G();
}
k(["click"]);
// src/lib/ui/Shoes.svelte
var Nn = r("<span class=\"label svelte-eu7fja\"> </span>"), Pn = r("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), Fn = r("<ul class=\"card svelte-eu7fja\"></ul>");
function In(e, t) {
	W(t, !0);
	let n = x(() => t.shoes.map(b));
	var r = Fn();
	R(r, 23, () => y(n), (e, n) => t.shoes[n].id, (e, t) => {
		var n = Pn(), r = V(n), i = V(r), a = B(i, !0), o = U(i), s = B(o, !0);
		Y(r);
		var c = U(r, 2), u = V(c);
		let d;
		Y(c);
		var f = U(c, 2), p = V(f), m = B(p, !0), h = U(p, 2), g = (e) => {
			var n = Nn(), r = B(n, !0);
			L(() => l(r, y(t).label)), j(e, n);
		};
		z(h, (e) => {
			y(t).label && e(g);
		}), Y(f), Y(n), L(() => {
			Q(n, 1, nt(y(t).state), "svelte-eu7fja"), l(a, y(t).name), l(s, y(t).km), d = K(u, "", d, { width: `${y(t).frac * 100}%` }), l(m, y(t).detail);
		}), j(e, n);
	}), Y(r), j(e, r), G();
}
// src/lib/ui/ShoesDialog.svelte
var Ln = r("<span class=\"mini svelte-1bogt6u\">Current</span>"), Rn = r("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), zn = r("<button type=\"button\" class=\"btn\">Set current</button>"), Bn = r("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Vn = r("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), Hn = r("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe until you set one.</p>"), Un = r("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), Wn = r("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), Gn = r("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), Kn = r("<!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form>", 1);
function qn(e, n) {
	W(n, !0);
	let r = x(() => n.shoes.map((e) => ({
		...b(e),
		id: e.id,
		limit: e.limit,
		current: !!e.current
	}))), i, a = Z(""), o = Z(h(700)), s = Z(null), c = Z(!1), u = Z(null);
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
	return J(hn(e, {
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
					}), Y(o);
					var p = U(o, 2), h = B(p, !0);
					Y(a);
					var g = U(a, 2), b = V(g), x = U(V(b));
					ve(x), t(), Y(b);
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
					}), Y(g), Y(i), L(() => {
						l(s, y(r).name), l(h, y(r).km), X(x, "min", xe.replace_at_km[0]), X(x, "max", xe.replace_at_km[1]), X(x, "step", xe.replace_at_km[2]), Ne(x, y(r).limit), x.disabled = y(c);
					}), N("change", x, (e) => v(e, y(r))), j(e, i);
				}), Y(a);
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
			ve(E), Y(T);
			var D = U(T, 2), O = U(V(D));
			ve(O), Y(D);
			var k = U(D, 2), A = (e) => {
				var t = Gn(), n = B(t, !0);
				L(() => l(n, y(s))), j(e, t);
			};
			z(k, (e) => {
				y(s) && e(A);
			});
			var M = U(k, 2);
			Y(S), L(() => {
				X(E, "maxlength", xe.name[1]), E.disabled = y(c), X(O, "min", xe.replace_at_km[0]), X(O, "max", xe.replace_at_km[1]), X(O, "step", xe.replace_at_km[2]), O.disabled = y(c), M.disabled = y(c);
			}), p("submit", S, g), he(E, () => y(a), (e) => C(a, e)), he(O, () => y(o), (e) => C(o, e)), j(e, d);
		},
		$$slots: { default: !0 }
	}), (e) => i = e, () => i), G(T);
}
k(["change", "click"]);
// src/lib/ui/WorkoutDialog.svelte
var Jn = r("<p class=\"msg\" role=\"status\"> </p>"), Yn = r("<p class=\"msg\" role=\"status\">Loading…</p>"), Xn = r("<span class=\"mini svelte-1uaoa1p\"> </span>"), Zn = r("<span class=\"mini off svelte-1uaoa1p\"> </span>"), Qn = r("<div><dt class=\"svelte-1uaoa1p\"> </dt><dd class=\"svelte-1uaoa1p\"> </dd></div>"), $n = r("<option disabled=\"\"> </option>"), er = r("<option> </option>"), tr = r("<div class=\"shoe svelte-1uaoa1p\"><dt class=\"svelte-1uaoa1p\"><label>Shoe</label></dt><dd class=\"svelte-1uaoa1p\"><select class=\"svelte-1uaoa1p\"><!><!></select></dd></div>"), nr = r("<dl class=\"svelte-1uaoa1p\"><!> <!></dl>"), rr = r("<p class=\"caption note svelte-1uaoa1p\"> </p>"), ir = r("<button type=\"button\">Not a run…</button>"), ar = r("<select aria-label=\"Change the type to\" class=\"svelte-1uaoa1p\"><option disabled=\"\">Choose a type</option><!></select>"), or = r("<button type=\"button\" class=\"link svelte-1uaoa1p\">Clear decision</button>"), sr = r("<div class=\"acts review svelte-1uaoa1p\"><button type=\"button\">Counts for the plan day</button> <button type=\"button\">A run, not the programme</button> <!> <!> <!></div>"), cr = r("<h3 class=\"svelte-1uaoa1p\">Programme</h3> <p> </p> <!>", 1), lr = r("<p class=\"caption note svelte-1uaoa1p\">Map unavailable</p>"), ur = r("<div class=\"ph svelte-1uaoa1p\" aria-hidden=\"true\"></div>"), dr = r("<h3 class=\"svelte-1uaoa1p\"> </h3> <!>", 1), fr = r("<!> <!>", 1), pr = r("<li class=\"svelte-1uaoa1p\"><span class=\"zn svelte-1uaoa1p\"> <small class=\"svelte-1uaoa1p\"> </small></span> <span class=\"bar svelte-1uaoa1p\"><span class=\"svelte-1uaoa1p\"></span></span> <span class=\"num svelte-1uaoa1p\"> </span></li>"), mr = r("<h3 class=\"svelte-1uaoa1p\">Heart-rate zones</h3> <ul class=\"zones svelte-1uaoa1p\"></ul>", 1), hr = r("<tr><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td></tr>"), gr = r("<h3 class=\"svelte-1uaoa1p\">Splits</h3> <table class=\"svelte-1uaoa1p\"><thead><tr><th class=\"svelte-1uaoa1p\">Km</th><th class=\"svelte-1uaoa1p\">Time</th><th class=\"svelte-1uaoa1p\"> </th><th class=\"svelte-1uaoa1p\">HR</th><th class=\"svelte-1uaoa1p\">Climb</th></tr></thead><tbody></tbody></table>", 1), _r = r("<span role=\"img\" aria-label=\"Record\">🏆</span>"), vr = r("<li class=\"svelte-1uaoa1p\"> <b class=\"svelte-1uaoa1p\"> </b><!></li>"), yr = r("<h3 class=\"svelte-1uaoa1p\">Exercises</h3> <ul class=\"gym svelte-1uaoa1p\"><!> <li class=\"vol svelte-1uaoa1p\">Total volume · <b class=\"svelte-1uaoa1p\"> </b></li></ul>", 1), br = r("<span class=\"ask svelte-1uaoa1p\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1uaoa1p\">Delete</button>", 1), xr = r("<button type=\"button\"> </button>"), Sr = r("<div class=\"acts svelte-1uaoa1p\"><!></div>"), Cr = r("<p class=\"sub svelte-1uaoa1p\"> <!> <!></p> <!> <!> <!> <!> <!> <!> <!> <!>", 1);
function wr(e, n) {
	let r = D();
	W(n, !0);
	let i = q(n, "shoes", 3, null), a = q(n, "reviewTypes", 19, () => ({})), c = () => import("./viz-D7VNQQ_j.js"), u, d = Z(null), f = Z(null), p = Z(null), m = Z(null), h = Z(null), g = Z(!1), v = Z(!1), b = 0;
	async function S(e) {
		let t = u.show();
		if (!t) return;
		let r = ++b;
		C(d, e), C(f, C(p, C(h, null))), C(g, C(v, !1), !0), t.scrollTop = 0;
		try {
			let t = await we(`workout?person=${encodeURIComponent(n.person)}&key=${encodeURIComponent(e.key)}`);
			if (r !== b) return;
			C(f, t), (t.route?.length || t.series) && !y(m) && c().then((e) => C(m, e), (e) => r === b && C(h, e));
		} catch (e) {
			r === b && C(p, e);
		}
	}
	function w() {
		b++, C(d, C(f, null));
	}
	let T = x(() => y(d) && `${n.person}/${y(d).key}`), E = x(() => y(T) && ot[y(T)]), O = x(() => {
		if (!y(d)) return null;
		let e = n.feed.find((e) => e.key === y(d).key) ?? {
			...y(f)?.summary,
			...y(d),
			excluded: st[y(T)] ?? y(d).excluded ?? !1
		};
		return y(E) && y(E).want !== null ? {
			...e,
			excluded: y(E).want
		} : e;
	}), k = x(() => y(f) && y(O) ? Ce(n.viewer, n.person, y(O)) : {
		remove: null,
		shoe: !1
	}), A = x(() => y(k).shoe && i() ? Ve(i(), n.runShoes?.[y(d).key]) : null), M = x(() => y(f) && Ue(y(f).summary)), P = x(() => y(f) ? le(y(f)).filter(([e]) => !(e === "Shoe" && y(A)?.options.length)) : []), F = x(() => y(f) && Pe(y(f))), I = x(() => y(f) && _e(y(f).zones, y(f).max_hr)), ee = x(() => y(f) ? me(y(f)) : []), te = x(() => y(f) && Le(y(f).gym)), ne = x(() => y(f) && Je(y(f))), re = x(() => y(O)?.check ?? null), H = x(() => y(O)?.review ?? null), ie = x(() => a()[y(O)?.source] ?? []), ae = x(() => y(O)?.km && y(O).minutes ? y(O).km / (y(O).minutes / 60) : null), oe = (e) => e.status === 404 ? "Workout not found" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant";
	async function se(e) {
		let t = e.currentTarget;
		await xt(n.person, y(d).key, Number(t.value)) || (t.value = String(y(A).value));
	}
	let ce = (e, t = null, r = "") => bt(n.person, y(d).key, e, t, r);
	async function ue(e) {
		let t = e.currentTarget.value;
		await ce("type", t, y(ie).find((e) => e.match === t)?.name);
	}
	let de = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function he() {
		y(k).remove === "delete" ? C(g, !0) : gt(n.person, y(d).key, y(k).remove);
	}
	var ge = { open: S };
	{
		let i = x(() => y(M)?.title ?? y(d)?.name ?? "Workout");
		J(hn(e, {
			get title() {
				return y(i);
			},
			drag: !0,
			wide: !0,
			onclose: w,
			children: (e, i) => {
				var a = ke(), c = _(a), b = (e) => {
					var t = Jn(), n = B(t, !0);
					L((e) => l(n, e), [() => oe(y(p))]), j(e, t);
				}, S = (e) => {
					var t = Yn();
					j(e, t);
				}, w = (e) => {
					var i = Cr(), a = _(i), c = V(a), p = U(c), b = (e) => {
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
					}), Y(a);
					var D = U(a, 2), W = (e) => {
						var t = nr(), n = V(t);
						R(n, 17, () => y(P), ([e, t]) => e, (e, t) => {
							var n = x(() => Fe(y(t), 2));
							let r = () => y(n)[0], i = () => y(n)[1];
							var a = Qn(), o = V(a), s = B(o, !0), c = U(o), u = B(c, !0);
							Y(a), L(() => {
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
							}), Y(o);
							var d;
							Se(o), Y(a), Y(t), L(() => {
								X(i, "for", `${r}-shoe`), X(o, "id", `${r}-shoe`), d !== (d = y(A).value) && (o.value = (o.__value = d) ?? "", be(o, d));
							}), N("change", o, se), j(e, t);
						};
						z(i, (e) => {
							y(A)?.options.length && e(a);
						}), Y(t), j(e, t);
					};
					z(D, (e) => {
						(y(P).length || y(A)?.options.length) && e(W);
					});
					var G = U(D, 2), oe = (e) => {
						var t = rr(), n = B(t, !0);
						L((e) => l(n, e), [() => pe(y(f).note)]), j(e, t);
					}, le = x(() => pe(y(f).note));
					z(G, (e) => {
						y(le) && e(oe);
					});
					var q = U(G, 2), J = (e) => {
						var t = cr(), n = U(_(t), 2);
						let r;
						var i = B(n, !0), a = U(n, 2), o = (e) => {
							var t = sr(), n = V(t);
							let r;
							var i = U(n, 2);
							let a;
							var o = U(i, 2), s = (e) => {
								var t = ir();
								let n;
								L(() => {
									n = Q(t, 1, "btn svelte-1uaoa1p", null, n, { on: y(H)?.decision === "type" }), X(t, "aria-pressed", y(H)?.decision === "type");
								}), N("click", t, () => C(v, !y(v))), j(e, t);
							};
							z(o, (e) => {
								y(ie).length && e(s);
							});
							var c = U(o, 2), u = (e) => {
								var t = ar(), n = V(t);
								n.value = n.__value = "";
								var r = U(n);
								R(r, 17, () => y(ie), (e) => e.match, (e, t) => {
									var n = er(), r = B(n, !0), i = {};
									L(() => {
										l(r, y(t).name), i !== (i = y(t).match) && (n.value = (n.__value = i) ?? "");
									}), j(e, n);
								}), Y(t);
								var i;
								Se(t), L(() => {
									i !== (i = y(H)?.decision === "type" ? y(H).type_match : "") && (t.value = (t.__value = i) ?? "", be(t, i));
								}), N("change", t, ue), j(e, t);
							};
							z(c, (e) => {
								(y(v) || y(H)?.decision === "type") && e(u);
							});
							var d = U(c, 2), f = (e) => {
								var t = or();
								N("click", t, () => ce(null)), j(e, t);
							};
							z(d, (e) => {
								y(H) && e(f);
							}), Y(t), L(() => {
								r = Q(n, 1, "btn svelte-1uaoa1p", null, r, { on: y(H)?.decision === "plan" }), X(n, "aria-pressed", y(H)?.decision === "plan"), a = Q(i, 1, "btn svelte-1uaoa1p", null, a, { on: y(H)?.decision === "run" }), X(i, "aria-pressed", y(H)?.decision === "run");
							}), N("click", n, () => ce("plan", null, y(re).label)), N("click", i, () => ce("run")), j(e, t);
						};
						z(a, (e) => {
							y(k).remove !== null && e(o);
						}), L((e) => {
							r = Q(n, 1, "check svelte-1uaoa1p", null, r, { warn: y(re).state === "review" && !y(H) }), l(i, e);
						}, [() => ye(y(re), y(ae))]), j(e, t);
					};
					z(q, (e) => {
						y(re) && e(J);
					});
					var me = U(q, 2), ge = (e) => {
						var t = ke(), n = _(t), r = (e) => {
							var t = lr();
							j(e, t);
						}, i = (e) => {
							var t = ur();
							let n;
							L(() => n = K(t, "", n, { height: `${y(f).route?.length ? 220 : 0}px` })), j(e, t);
						}, a = (e) => {
							var t = fr(), n = _(t), r = (e) => {
								var t = ke(), n = _(t);
								{
									let e = x(() => Ae(y(f)) ? "run" : "gym");
									fe(n, () => y(m).MapView, (t, n) => {
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
								var n = dr(), r = _(n), i = B(r, !0), a = U(r, 2);
								fe(a, () => y(m).Chart, (e, n) => {
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
					z(me, (e) => {
						(y(f).route?.length || y(F)?.list.length) && e(ge);
					});
					var _e = U(me, 2), ve = (e) => {
						var t = mr(), n = U(_(t), 2);
						R(n, 21, () => y(I), (e) => e.zone, (e, t) => {
							var n = pr(), r = V(n), i = V(r), a = U(i), o = B(a, !0);
							Y(r);
							var s = U(r, 2), c = V(s);
							let u;
							Y(s);
							var d = U(s, 2), f = B(d);
							Y(n), L(() => {
								l(i, `${y(t).zone ?? ""} `), l(o, y(t).bpm), u = K(c, "", u, { width: `${y(t).pct ?? ""}%` }), l(f, `${y(t).time ?? ""} · ${y(t).pct ?? ""}%`);
							}), j(e, n);
						}), Y(n), j(e, t);
					};
					z(_e, (e) => {
						y(I) && e(ve);
					});
					var xe = U(_e, 2), Ce = (e) => {
						var n = gr(), r = U(_(n), 2), i = V(r), a = V(i), o = U(V(a), 2), c = B(o, !0);
						t(2), Y(a), Y(i);
						var u = U(i);
						R(u, 21, () => y(ee), s, (e, t) => {
							var n = hr(), r = V(n), i = B(r, !0), a = U(r), o = B(a, !0), s = U(a), c = B(s, !0), u = U(s), d = B(u, !0), f = U(u), p = B(f, !0);
							Y(n), L(() => {
								l(i, y(t).km), l(o, y(t).time), l(c, y(t).pace), l(d, y(t).hr), l(p, y(t).climb);
							}), j(e, n);
						}), Y(u), Y(r), L(() => l(c, y(ne) ? "km/h" : "Pace")), j(e, n);
					};
					z(xe, (e) => {
						y(ee).length && e(Ce);
					});
					var we = U(xe, 2), Te = (e) => {
						var t = yr(), n = U(_(t), 2), r = V(n);
						R(r, 17, () => y(te).exercises, s, (e, t) => {
							var n = vr(), r = V(n), i = U(r), a = B(i, !0), o = U(i), s = (e) => {
								var t = _r();
								j(e, t);
							};
							z(o, (e) => {
								y(t).record && e(s);
							}), Y(n), L(() => {
								l(r, `${y(t).name ?? ""} · `), l(a, y(t).set);
							}), j(e, n);
						});
						var i = U(r, 2), a = U(V(i)), o = B(a, !0);
						Y(i), Y(n), L(() => l(o, y(te).volume)), j(e, t);
					};
					z(we, (e) => {
						y(te) && e(Te);
					});
					var Ee = U(we, 2), De = (e) => {
						var t = Sr(), r = V(t), i = (e) => {
							var t = br(), r = U(_(t), 2), i = U(r, 2);
							N("click", r, () => C(g, !1)), N("click", i, () => (gt(n.person, y(d).key, "remove"), u.close())), j(e, t);
						}, a = (e) => {
							var t = xr();
							let n;
							var r = B(t, !0);
							L(() => {
								n = Q(t, 1, "btn svelte-1uaoa1p", null, n, { danger: y(k).remove !== "restore" }), l(r, de[y(k).remove]);
							}), N("click", t, he), j(e, t);
						};
						z(r, (e) => {
							y(g) ? e(i) : e(a, -1);
						}), Y(t), j(e, t);
					};
					z(Ee, (e) => {
						y(k).remove && y(E)?.want !== null && e(De);
					}), L(() => l(c, `${y(M).date ?? ""} · ${y(M).time ?? ""} · ${y(M).duration ?? ""} `)), j(e, i);
				};
				z(c, (e) => {
					y(p) ? e(b) : y(f) ? e(w, -1) : e(S, 1);
				}), j(e, a);
			},
			$$slots: { default: !0 }
		}), (e) => u = e, () => u);
	}
	return G(ge);
}
k(["change", "click"]);
// src/lib/ui/Details.svelte
var Tr = r("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), Er = r("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), Dr = r("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), Or = r("<section><h2 class=\"svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), kr = r("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!> <!> <!>", 1);
function Ar(e, t) {
	let n = D();
	W(t, !0);
	let r = q(t, "connect", 3, null), i = q(t, "reviewTypes", 19, () => ({})), a = x(() => g(t.person.pbs)), o = x(() => ae(t.person, t.canEdit)), s = Z(void 0), c = Z(void 0), u = (e) => y(c).open(e);
	var d = kr(), f = _(d), p = (e) => {
		var r = Tr(), i = V(r);
		on(U(i, 2), { get plan() {
			return t.person.plan;
		} }), Y(r), L(() => {
			X(r, "aria-labelledby", `${n}-plan`), X(i, "id", `${n}-plan`);
		}), j(e, r);
	};
	z(f, (e) => {
		t.person.plan && e(p);
	});
	var m = U(f, 2), h = V(m), v = U(h, 2);
	Qe(v, () => t.id, (e) => {
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
	}), Y(m);
	var b = U(m, 2), S = V(b), w = U(V(S)), T = B(w);
	Y(S), Lt(U(S, 2), { get badges() {
		return t.person.badges;
	} }), Y(b);
	var E = U(b, 2), O = V(E);
	Mn(U(O, 2), {
		get person() {
			return t.person;
		},
		onopen: u
	}), Y(E);
	var k = U(E, 2);
	{
		let e = x(() => y(o) ? t.person.shoes : null);
		J(wr(k, {
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
		var r = Or(), i = _(r), a = V(i), c = U(V(a)), l = (e) => {
			var t = Er();
			N("click", t, () => y(s).open()), j(e, t);
		};
		z(c, (e) => {
			y(o) && e(l);
		}), Y(a);
		var u = U(a, 2), d = (e) => {
			In(e, { get shoes() {
				return t.person.shoes;
			} });
		}, f = (e) => {
			var t = Dr();
			j(e, t);
		};
		z(u, (e) => {
			t.person.shoes.length ? e(d) : e(f, -1);
		}), Y(i);
		var p = U(i, 2), m = (e) => {
			J(qn(e, {
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
			X(i, "aria-labelledby", `${n}-shoes`), X(a, "id", `${n}-shoes`);
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
		X(m, "aria-labelledby", `${n}-feed`), X(h, "id", `${n}-feed`), X(b, "aria-labelledby", `${n}-badges`), X(S, "id", `${n}-badges`), l(T, `${t.person.badges.count ?? ""} unlocked`), X(E, "aria-labelledby", `${n}-pbs`), X(O, "id", `${n}-pbs`);
	}), j(e, d), G();
}
k(["click"]);
// src/lib/ui/Goals.svelte
var jr = r("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), Mr = r("<p class=\"msg\" role=\"status\"> </p>"), Nr = r("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!> <label class=\"year svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Birth year</span> <input type=\"number\" inputmode=\"numeric\" min=\"1900\" placeholder=\"1990\" class=\"svelte-7wncvy\"/></label> <p class=\"caption maxhr svelte-7wncvy\"> </p></section>"), Pr = r("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), Fr = r("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), Ir = r("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), Lr = r("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function Rr(e, t) {
	let n = D();
	W(t, !0);
	let r = [], i = (e, n = Ke, r = Ke, i = Ke) => {
		let a = x(() => {
			let [e, t, n] = Be[r()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var o = jr(), s = V(o), c = B(s, !0), u = U(s, 2), d = U(u, 2), f = B(d, !0), p = U(d, 2);
		Y(o), L((e, s, d, m) => {
			X(o, "aria-label", i()), l(c, e), X(u, "aria-label", `Fewer ${s ?? ""}`), u.disabled = t.readOnly || n()[r()] <= y(a).lo, l(f, d), X(p, "aria-label", `More ${m ?? ""}`), p.disabled = t.readOnly || n()[r()] >= y(a).hi;
		}, [
			() => i().split(",")[0],
			() => m(i()),
			() => h(r(), n()[r()]),
			() => m(i())
		]), N("click", u, () => n()[r()] = ce(r(), n()[r()] - y(a).step)), N("click", p, () => n()[r()] = ce(r(), n()[r()] + y(a).step)), j(e, o);
	}, a = Z(null), o = Z(null), s = Z(null), c = Z(!1);
	Te(() => {
		we("settings").then((e) => {
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
		let e = await ht(se(y(s)), t.people);
		C(c, !1), e && t.onsaved();
	}
	var v = Lr(), b = U(_(v), 2), S = (e) => {
		var t = Mr(), n = B(t, !0);
		L(() => l(n, y(o) ? y(o).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), j(e, t);
	}, w = (e) => {
		var o = Ir(), u = _(o), m = B(u), h = U(u, 2);
		R(h, 16, () => Object.keys(y(s).people), (e) => e, (e, r) => {
			let a = x(() => t.people[r]?.name ?? r);
			var o = Nr(), c = V(o), u = B(c, !0), f = U(c, 2);
			R(f, 16, () => Me, (e) => e, (e, t) => {
				i(e, () => y(s).people[r], () => t, () => `${d[t]}, ${y(a)}`);
			});
			var p = U(f, 2), m = U(V(p), 2);
			ve(m), Y(p);
			var h = U(p, 2), g = B(h, !0);
			Y(o), L((e, i) => {
				X(o, "aria-labelledby", `${n}-${r ?? ""}`), X(c, "id", `${n}-${r ?? ""}`), l(u, y(a)), X(m, "max", e), m.disabled = t.readOnly, l(g, i);
			}, [() => (/* @__PURE__ */ new Date()).getFullYear(), () => M(t.people[r]?.max_hr)]), he(m, () => y(s).profiles[r].birth_year, (e) => y(s).profiles[r].birth_year = e), j(e, o);
		});
		var v = U(h, 2), b = V(v), S = U(b, 2);
		R(S, 21, () => f, (e) => e.mode, (e, i) => {
			var a = Pr();
			let o;
			var c = V(a);
			ve(c);
			var u, d = U(c, 1, !0);
			Y(a), L(() => {
				o = Q(a, 1, "svelte-7wncvy", null, o, { on: y(s).couple.mode === y(i).mode }), X(c, "name", `${n}-mode`), c.disabled = t.readOnly, u !== (u = y(i).mode) && (c.value = (c.__value = u) ?? ""), l(d, y(i).label);
			}), Ye(r, [], c, () => (y(i).mode, y(s).couple.mode), (e) => y(s).couple.mode = e), j(e, a);
		}), Y(S);
		var C = U(S, 2), w = B(C, !0), T = U(C, 2), E = (e) => {
			i(e, () => y(s).couple, () => y(s).couple.mode, () => p[y(s).couple.mode]);
		};
		z(T, (e) => {
			p[y(s).couple.mode] && e(E);
		});
		var D = U(T, 2), O = U(V(D), 2);
		ve(O), Y(D), Y(v);
		var k = U(v, 2), A = (e) => {
			var t = Fr();
			L(() => t.disabled = y(c)), N("click", t, g), j(e, t);
		};
		z(k, (e) => {
			t.readOnly || e(A);
		}), L((e, r) => {
			l(m, `Applies from this week (week ${e ?? ""})`), X(v, "aria-labelledby", `${n}-couple`), X(b, "id", `${n}-couple`), X(S, "aria-labelledby", `${n}-couple`), l(w, r), O.disabled = t.readOnly;
		}, [() => Oe(y(a).week_start), () => f.find((e) => e.mode === y(s).couple.mode).hint]), he(O, () => y(s).couple.reward, (e) => y(s).couple.reward = e), j(e, o);
	};
	z(b, (e) => {
		y(s) ? e(w, -1) : e(S);
	}), j(e, v), G();
}
k(["click"]);
// src/lib/ui/Header.svelte
var zr = r("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), Br = De("<svg class=\"brand svelte-16l0jix\" viewBox=\"0 0 100 100\" aria-hidden=\"true\"><defs><linearGradient id=\"hdr-brand\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#FFB340\"></stop><stop offset=\"1\" stop-color=\"#FF453A\"></stop></linearGradient></defs><rect width=\"100\" height=\"100\" rx=\"22.4\" fill=\"url(#hdr-brand)\"></rect><path d=\"M50 20 L80 45 V80 H20 V45 Z\" fill=\"#FFF\" stroke=\"#FFF\" stroke-width=\"6\" stroke-linejoin=\"round\"></path><path d=\"M50 42 C55 49 63 55 63 65.5 a13 13 0 0 1 -26 0 C37 58 42 53 45.5 49 C46 53.5 48 56.5 51 57.5 C49.5 52 49 47 50 42 Z\" fill=\"#FF6B2C\"></path></svg>"), Vr = r("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), Hr = r("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"><!> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function Ur(e, t) {
	let n = q(t, "subtitle", 3, ""), r = q(t, "actionLabel", 3, ""), i = q(t, "brand", 3, !1), a = Z(0);
	var o = Hr();
	let s;
	var c = V(o), u = V(c), d = (e) => {
		var n = zr();
		N("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), j(e, n);
	};
	z(u, (e) => {
		t.onback && e(d);
	});
	var f = U(u, 2), p = V(f), m = V(p), h = (e) => {
		var t = Br();
		j(e, t);
	};
	z(m, (e) => {
		i() && e(h);
	});
	var g = U(m);
	Y(p);
	var _ = U(p, 2), v = (e) => {
		var n = Vr(), i = B(n, !0);
		L(() => l(i, r())), N("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), j(e, n);
	};
	z(_, (e) => {
		t.onaction && e(v);
	}), Y(f);
	var b = U(f, 2), x = B(b, !0);
	Y(c), Y(o), L(() => {
		s = Q(o, 1, "svelte-16l0jix", null, s, { scrolled: y(a) > 0 }), l(g, ` ${t.title ?? ""}`), l(x, n() || "\xA0");
	}), We("y", () => y(a), (e) => C(a, e, !0)), j(e, o);
}
k(["click"]);
// src/lib/motion.js
function Wr(e, { onFrame: t, onSettle: n, snap: r = {
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
var Gr = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), Kr = (e) => Gr(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function qr({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var Jr = De("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Yr = De("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function Xr(e, t) {
	W(t, !0);
	let n = q(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, a = Z(h(Ge.reducedMotion ? i : 0)), o = x(() => n() * .11), s = x(() => t.fractions.map((e, t) => {
		let s = n() / 2 - y(o) / 2 - t * y(o) * 1.3, c = 2 * Math.PI * s;
		return {
			kind: r[t],
			r: s,
			c,
			len: c * e * y(a) / i
		};
	}));
	Te(() => {
		if (y(a) === i) return;
		let e = Wr(qr({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => C(a, e, !0) });
		return e.to(i), e.stop;
	});
	var c = Yr();
	let l;
	R(c, 21, () => y(s), (e) => e.kind, (e, t) => {
		var r = Jr(), i = _(r);
		let a;
		var s = U(i);
		let c;
		L(() => {
			X(i, "cx", n() / 2), X(i, "cy", n() / 2), X(i, "r", y(t).r), X(i, "stroke-width", y(o)), a = K(i, "", a, { stroke: `var(--${y(t).kind ?? ""})` }), X(s, "cx", n() / 2), X(s, "cy", n() / 2), X(s, "r", y(t).r), X(s, "stroke-width", y(o)), X(s, "stroke-dasharray", `${y(t).len ?? ""} ${y(t).c ?? ""}`), X(s, "opacity", +(y(t).len > .01)), X(s, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), c = K(s, "", c, { stroke: `var(--${y(t).kind ?? ""})` });
		}), j(e, r);
	}), Y(c), L(() => {
		X(c, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), l = K(c, "", l, { width: `${n() / 16}rem` });
	}), j(e, c), G();
}
// src/lib/ui/PersonTile.svelte
var Zr = r("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Qr = r("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), $r = r("<span class=\"streak svelte-1handop\"> </span>"), ei = r("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), ti = r("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), ni = r("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), ri = r("<span class=\"steps svelte-1handop\"> </span>"), ii = r("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), ai = r("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), oi = r("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function si(e, t) {
	W(t, !0);
	let n = q(t, "index", 3, 0), r = q(t, "compact", 3, !1), i = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], a = x(() => i[n() % i.length]), o = x(() => Fe(y(a), 2)), s = x(() => y(o)[0]), c = x(() => y(o)[1]), u = x(() => Ee(t.person)), d = x(() => t.person.week), f = [
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
		of: Ze(y(d))[t]
	}))), m = x(() => P(t.person.steps_today, y(d).goal.steps)), h = x(() => [
		`Level ${y(u).level}`,
		r() ? `🔥 ${t.person.streak} wk` : `${t.person.xp.toLocaleString()} XP`,
		y(d).paused && "Week paused",
		y(d).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), g = x(() => `${t.person.name}, level ${y(u).level}. This week ${y(p).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${y(d).goal_pending ? "New goals pending. " : ""}${y(d).bonus ? "Weekly bonus earned. " : ""}${y(m) ? y(m).replace("👟 ", "") + ". " : ""}Streak ${t.person.streak} weeks.`);
	var v = oi();
	let b;
	var S = V(v), C = V(S), w = V(C);
	let T;
	var E = B(w, !0), D = U(w, 2), O = V(D), k = B(O, !0), A = U(O, 2), M = B(A, !0);
	Y(D);
	var F = U(D, 2), I = (e) => {
		var t = Qr(), n = _(t), r = V(n);
		{
			let e = x(() => H(y(d)));
			Xr(r, {
				get fractions() {
					return y(e);
				},
				size: 44
			});
		}
		var i = U(r, 2), a = (e) => {
			var t = Zr();
			j(e, t);
		};
		z(i, (e) => {
			y(d).bonus && e(a);
		}), Y(n);
		var o = U(n, 2), s = B(o, !0);
		L(() => l(s, y(g))), j(e, t);
	}, te = (e) => {
		var n = $r(), r = B(n);
		L(() => l(r, `🔥 ${t.person.streak ?? ""} wk`)), j(e, n);
	};
	z(F, (e) => {
		r() ? e(I) : e(te, -1);
	});
	var ne = U(F, 2), re = (e) => {
		var t = ei();
		j(e, t);
	};
	z(ne, (e) => {
		t.onopen && e(re);
	}), Y(C);
	var ie = U(C, 2), ae = (e) => {
		var t = ii(), n = _(t), r = V(n), i = V(r);
		{
			let e = x(() => H(y(d))), t = x(() => Ge.wide ? 112 : 88);
			Xr(i, {
				get fractions() {
					return y(e);
				},
				get size() {
					return y(t);
				}
			});
		}
		var a = U(i, 2), o = (e) => {
			var t = ti();
			j(e, t);
		};
		z(a, (e) => {
			y(d).bonus && e(o);
		}), Y(r);
		var s = U(r, 2);
		R(s, 21, () => y(p), (e) => e.kind, (e, t) => {
			var n = ni(), r = V(n), i = V(r);
			let a;
			var o = U(i, 1, !0);
			Y(r);
			var s = U(r, 2), c = V(s, !0), u = U(c), d = B(u);
			Y(s), Y(n), L(() => {
				a = K(i, "", a, { background: `var(--${y(t).kind ?? ""})` }), l(o, y(t).label), l(c, y(t).n), l(d, `/${y(t).of ?? ""}`);
			}), j(e, n);
		}), Y(s), Y(n);
		var c = U(n, 2), f = (e) => {
			var t = ri(), n = B(t, !0);
			L(() => l(n, y(m))), j(e, t);
		};
		z(c, (e) => {
			y(m) && e(f);
		});
		var h = U(c, 2), g = V(h), v = V(g);
		let b;
		Y(g);
		var S = U(g, 2), C = B(S);
		Y(h), L((e, t) => {
			b = K(v, "", b, { width: `${y(u).frac * 100}%` }), l(C, `${e ?? ""} of ${t ?? ""} XP to level ${y(u).level + 1}`);
		}, [() => y(u).into.toLocaleString(), () => y(u).span.toLocaleString()]), j(e, t);
	};
	z(ie, (e) => {
		r() || e(ae);
	}), Y(S);
	var oe = U(S, 2), se = (e) => {
		var n = ai();
		L(() => X(n, "aria-label", y(g))), N("click", n, function(...e) {
			t.onopen?.apply(this, e);
		}), j(e, n);
	};
	z(oe, (e) => {
		t.onopen && e(se);
	}), Y(v), L((e) => {
		b = Q(v, 1, "tile glass svelte-1handop", null, b, {
			compact: r(),
			opens: t.onopen
		}), X(S, "aria-hidden", t.onopen ? "true" : void 0), T = K(w, "", T, {
			"--a1": y(s),
			"--a2": y(c)
		}), l(E, e), l(k, t.person.name), l(M, y(h));
	}, [() => t.person.name.slice(0, 1)]), j(e, v), G();
}
k(["click"]);
// src/lib/ui/Sheet.svelte
var ci = r("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), li = r("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function ui(e, t) {
	W(t, !0);
	let n = q(t, "from", 3, null), r = 1e3, i = Ge.reducedMotion, o = Z(h(i ? r : 0)), s = Z(0), c = Z(1), l = Z(!1), u = Z("50% 100%"), d, f, m = !1, g = null, v = x(() => i ? +y(l) : Math.min(1, y(o) / 500)), b = x(() => i ? 1 : .5 + .5 * y(o) / r), S = () => {
		m && (y(o) === 0 || y(s) >= y(c)) && (m = !1, t.onclose());
	};
	function w(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = qr({
					value: r,
					damping: o,
					response: s
				}), n = Wr(t, {
					onFrame: e,
					onSettle: S
				}), n.to(i, a);
			}
		};
	}
	let T = w((e) => C(o, e, !0)), E = w((e) => C(s, e, !0));
	function D() {
		m || g || (m = !0, i ? (C(l, !1), setTimeout(t.onclose, Kr("--fade"))) : T.to(y(o), 0, { response: .3 }));
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
	Te(() => {
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
	var M = { close: D }, P = li();
	p("keydown", a, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && D());
	var F = _(P);
	let I, ee;
	var R = U(F, 2);
	let te, ne;
	var B = V(R), re = U(V(B), 2), H = V(re), ie = (e) => {
		var n = ci();
		N("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), j(e, n);
	};
	z(H, (e) => {
		t.onback && e(ie);
	});
	var ae = U(H, 2);
	J(ae, (e) => f = e, () => f), Y(re), Y(B);
	var oe = U(B, 2), se = V(oe);
	return et(se, () => t.children), Y(oe), Y(R), J(R, (e) => d = e, () => d), L((e) => {
		I = Q(F, 1, "scrim svelte-185xwm9", null, I, { fade: i }), ee = K(F, "", ee, { opacity: e }), te = Q(R, 1, "sheet svelte-185xwm9", null, te, { fade: i }), X(R, "aria-label", t.label), ne = K(R, "", ne, {
			opacity: y(v),
			transform: `translate3d(0, ${y(s) ?? ""}px, 0) scale(${y(b) ?? ""})`,
			"transform-origin": y(u)
		});
	}, [() => y(v) * Math.min(1, Math.max(0, 1 - y(s) / y(c)))]), N("click", F, D), N("pointerdown", B, O), N("pointermove", B, k), N("pointerup", B, A), p("pointercancel", B, A), N("click", ae, D), je(R, "offsetHeight", (e) => C(c, e)), j(e, P), G(M);
}
k([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var di = r("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), fi = r("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), pi = r("<p class=\"caption stale svelte-9nj5u4\"> </p>"), mi = r("<!> <!> <!>", 1);
function hi(e, t) {
	W(t, !0);
	let n = x(() => t.scoredAt ? oe(t.scoredAt, t.now) : null);
	var r = mi(), i = _(r), a = (e) => {
		var n = di(), r = U(V(n));
		Y(n), L(() => l(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), j(e, n);
	};
	z(i, (e) => {
		t.configError && e(a);
	});
	var o = U(i, 2), s = (e) => {
		var n = fi(), r = U(V(n));
		Y(n), L(() => l(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), j(e, n);
	};
	z(o, (e) => {
		t.settingsError && e(s);
	});
	var c = U(o, 2), u = (e) => {
		var t = pi(), r = B(t, !0);
		L(() => l(r, y(n))), j(e, t);
	};
	z(c, (e) => {
		y(n) && e(u);
	}), j(e, r), G();
}
// node_modules/svelte/src/internal/flags/legacy.js
F();
// src/lib/ui/Toast.svelte
var gi = r("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), _i = r("<span> </span> <!>", 1), vi = r("<div role=\"status\" aria-live=\"polite\"><!></div>");
function yi(e, t) {
	W(t, !1);
	function n() {
		let e = ct.undo;
		Object.assign(ct, {
			on: !1,
			undo: null
		}), e();
	}
	ze();
	var r = vi();
	let i;
	var a = V(r), o = (e) => {
		var t = _i(), r = _(t), i = B(r, !0), a = U(r, 2), o = (e) => {
			var t = gi();
			N("click", t, n), j(e, t);
		};
		z(a, (e) => {
			ct.undo && e(o);
		}), L(() => l(i, ct.text)), j(e, t);
	};
	z(a, (e) => {
		ct.on && e(o);
	}), Y(r), L(() => i = Q(r, 1, "toast svelte-1fk2ial", null, i, { on: ct.on })), j(e, r), G();
}
k(["click"]);
// src/lib/ui/Together.svelte
var bi = r("<p class=\"progress svelte-1tya3no\"> </p>"), xi = r("<p> </p>"), Si = r("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), Ci = r("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function wi(e, t) {
	W(t, !0);
	let n = x(() => t.group.week ? ge(t.group.week, t.people) : ""), r = x(() => t.group.week ? ne(t.group.week) : null), i = x(() => [
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
	var a = Ci(), o = U(V(a), 2), s = (e) => {
		var t = bi(), r = B(t, !0);
		L(() => l(r, y(n))), j(e, t);
	};
	z(o, (e) => {
		y(n) && e(s);
	});
	var c = U(o, 2), u = (e) => {
		var n = xi();
		let i;
		var a = B(n, !0);
		L(() => {
			i = Q(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), l(a, y(r));
		}), j(e, n);
	};
	z(c, (e) => {
		y(r) && e(u);
	});
	var d = U(c, 2);
	R(d, 21, () => y(i), (e) => e.k, (e, t) => {
		var n = Si(), r = V(n), i = B(r, !0), a = U(r), o = V(a, !0), s = U(o), c = B(s, !0);
		Y(a), Y(n), L(() => {
			l(i, y(t).k), l(o, y(t).v), l(c, y(t).unit);
		}), j(e, n);
	}), Y(d), Y(a), j(e, a), G();
}
// src/App.svelte
var Ti = r("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), Ei = r("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), Di = r("<div class=\"tiles compact svelte-1n46o8q\"></div>"), Oi = r("<!> <!>", 1), ki = r("<div class=\"tiles svelte-1n46o8q\"></div>"), Ai = r("<!> <!> <!> <!> <!>", 1), ji = r("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function Mi(e, t) {
	W(t, !0);
	let r = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), i = new URLSearchParams(r.location.search), a = i.get("person"), o = /^\/(?!\/)/.test(i.get("back") ?? "") ? i.get("back") : null, s = o && (() => {
		r.history.pushState(null, "", o), r.dispatchEvent(new Event("location-changed"));
	}), c = Z(null), u = (e) => (t) => C(c, {
		id: e,
		from: t.currentTarget
	}, !0), d = Z(null), f = Z(void 0);
	async function p() {
		let e = y(c)?.from ?? y(d)?.from;
		C(c, C(d, null), !0), await T(), e?.focus({ preventScroll: !0 });
	}
	let m = Z(null), g = Z(null), v = Z(h(/* @__PURE__ */ new Date())), b = h({}), S;
	async function w() {
		if (clearTimeout(S), !document.hidden) {
			try {
				C(m, await we("scores"), !0), C(g, null), mt(y(m).people), a && Object.hasOwn(y(m).people, a) && a !== n(y(m).viewer, y(m).people).self && C(c, {
					id: a,
					from: null
				}, !0), a = null;
			} catch (e) {
				C(g, e, !0);
			}
			C(v, /* @__PURE__ */ new Date(), !0), y(m) && E(y(m)), clearTimeout(S), S = setTimeout(w, y(m) ? 6e4 : 3e4);
		}
	}
	let E = (e) => Xe(e.viewer, e.people).forEach((e) => we(`connect?person=${encodeURIComponent(e)}`).then((t) => {
		b[e] = t;
	}, () => {
		delete b[e];
	}));
	it(() => {
		w();
		let e = () => document.hidden || w();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(S), document.removeEventListener("visibilitychange", e);
		};
	}), it(() => {
		ut.n && w();
	});
	let D = x(() => He(y(m)?.people ?? {}, lt.entry)), O = x(() => Object.keys(y(D))), k = x(() => n(y(m)?.viewer ?? {}, y(D))), A = x(() => y(D)[y(k).self ?? y(O)[0]]?.week), M = (e) => !!y(m)?.viewer?.can_edit?.includes(e), N = x(() => !!y(k).self && tt(y(D)[y(k).self], b[y(k).self])), P = x(() => !!y(c) && Object.hasOwn(y(D), y(c).id) || !!y(d) && !!y(m));
	var F = ji(), I = _(F), ee = V(I);
	{
		let e = x(() => y(A) ? Ie(y(A)) : ""), t = x(() => y(m) ? (e) => C(d, { from: e.currentTarget }, !0) : void 0);
		Ur(ee, {
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
		var t = Ei(), n = U(_(t), 2), r = (e) => {
			var t = Ti(), n = B(t, !0);
			L(() => l(n, y(g).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), j(e, t);
		};
		z(n, (e) => {
			y(g) && e(r);
		}), j(e, t);
	}, H = (e) => {
		var t = Ai(), n = _(t);
		hi(n, {
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
			var t = Oi(), n = _(t), r = (e) => {
				var t = Di();
				R(t, 20, () => y(k).others, (e) => e, (e, t) => {
					{
						let n = x(() => y(O).indexOf(t)), r = x(() => u(t));
						si(e, {
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
				}), Y(t), j(e, t);
			};
			z(n, (e) => {
				y(k).others.length && e(r);
			});
			var i = U(n, 2);
			{
				let e = x(() => y(O).indexOf(y(k).self));
				si(i, {
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
			var t = ki();
			R(t, 20, () => y(k).others, (e) => e, (e, t) => {
				{
					let n = x(() => y(O).indexOf(t)), r = x(() => u(t));
					si(e, {
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
			}), Y(t), j(e, t);
		};
		z(a, (e) => {
			y(k).self ? e(o) : e(s, -1);
		});
		var c = U(a, 2), l = (e) => {
			wi(e, {
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
				Ar(e, {
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
	}), Y(te), Y(I);
	var ie = U(I, 2), ae = (e) => {
		J(ui(e, {
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
					Rr(e, {
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
	}, oe = (e) => {
		ui(e, {
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
				var n = Oi(), r = _(n);
				{
					let e = x(() => y(O).indexOf(y(c).id));
					si(r, {
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
					Ar(i, {
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
	z(ie, (e) => {
		y(d) && y(m) ? e(ae) : y(P) && e(oe, 1);
	}), yi(U(ie, 2), {}), L(() => I.inert = y(P)), j(e, F), G();
}
// src/main.js
var Ni = (e) => d(Mi, { target: e }), Pi = () => new Promise((e) => {
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
		Re(e);
		let t = e.themes?.darkMode ?? matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.dataset.theme = t ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Pi().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", Ni(e);
		}));
	}
});
