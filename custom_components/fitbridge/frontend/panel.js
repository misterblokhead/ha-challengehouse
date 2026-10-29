import { $ as e, $t as t, A as n, At as r, B as i, Bt as a, C as o, Ct as s, D as c, Dt as l, E as u, Et as d, F as f, Ft as p, G as m, Gt as h, H as g, Ht as _, I as v, It as y, J as b, Jt as x, K as S, Kt as C, L as w, Lt as T, M as E, Mt as D, N as O, Nt as k, O as A, Ot as j, P as M, Pt as N, Q as P, Qt as F, R as I, Rt as L, S as ee, St as R, T as z, Tt as B, U as V, Ut as H, V as te, Vt as U, W, Wt as G, X as ne, Xt as re, Y as ie, Yt as ae, Z as oe, Zt as se, _ as ce, _t as le, a as ue, at as de, b as fe, bt as K, c as pe, ct as me, d as he, dt as q, en as ge, et as _e, f as ve, ft as ye, g as be, gt as J, h as xe, ht as Y, i as Se, in as Ce, it as we, j as Te, jt as X, k as Ee, kt as De, l as Oe, lt as ke, m as Ae, mt as je, n as Me, nn as Ne, nt as Pe, o as Fe, ot as Ie, p as Le, pt as Re, q as ze, qt as Z, rn as Be, rt as Q, s as Ve, st as He, t as Ue, tt as We, u as Ge, ut as Ke, v as qe, vt as Je, w as Ye, wt as Xe, x as Ze, xt as Qe, y as $e, yt as et, z as tt, zt as $ } from "./shared-fHTYD0sh.js";
// src/lib/actions.svelte.js
var nt = 5e3, rt = H({}), it = H({}), at = H({
	on: !1,
	text: "",
	undo: null
}), ot = H({
	entry: null,
	at: 0
}), st = H({ n: 0 }), ct, lt = 0, ut = {};
function dt(e, t = null) {
	clearTimeout(ct), Object.assign(at, {
		on: !0,
		text: e,
		undo: t
	}), ct = setTimeout(() => at.on = !1, nt);
}
function ft(e, t = Date.now()) {
	for (let [n, r] of Object.entries(rt)) I(r, e[r.person]?.feed ?? [], t) && delete rt[n];
	ot.entry && Ye(ot, e, t) && (ot.entry = null);
}
async function pt(e, t) {
	try {
		await Be("POST", "settings", e);
	} catch (e) {
		return dt(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), !1;
	}
	return Object.assign(ot, {
		entry: e,
		at: Date.now()
	}), ft(t), dt("Saved · updates within 5 min"), !0;
}
async function mt(e, t, n) {
	let r = `${e}/${t}`, i = rt[r], a = ++lt, o = t.startsWith("manual:"), s = o && n === "remove" ? null : n === "remove";
	rt[r] = {
		person: e,
		key: t,
		want: s,
		at: Date.now(),
		n: a
	}, n === "remove" && !o && dt("Removed", () => mt(e, t, "restore"));
	try {
		await V(ut, r, () => Be("POST", "workouts", {
			person: e,
			key: t,
			action: n
		})), it[r] = s;
	} catch (e) {
		rt[r]?.n === a && (i ? rt[r] = i : delete rt[r]), dt(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
	}
}
var ht = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
async function gt(e, t) {
	try {
		return await Ne(`feed?person=${encodeURIComponent(e)}&before=${t}`);
	} catch (e) {
		return dt(ht(e)), null;
	}
}
async function _t(e) {
	try {
		await Be("POST", "shoes", e);
	} catch (e) {
		return dt(ht(e)), !1;
	}
	return st.n++, !0;
}
async function vt(e, t, n) {
	try {
		await Be("POST", "workouts", {
			action: "shoe",
			person: e,
			key: t,
			shoe_id: n
		});
	} catch (e) {
		return dt(ht(e)), !1;
	}
	return st.n++, dt("Moved to the other shoe"), !0;
}
// src/lib/ui/Connect.svelte
var yt = j("<div class=\"url svelte-gy3e4s\"><input readonly=\"\" aria-label=\"Your address\" class=\"svelte-gy3e4s\"/> <button type=\"button\" class=\"btn press\">Copy</button></div>"), bt = j("<p class=\"warn svelte-gy3e4s\">This address only works at home.</p>"), xt = j("<p class=\"caption svelte-gy3e4s\"> </p> <div class=\"choice svelte-gy3e4s\"><button type=\"button\" class=\"btn press svelte-gy3e4s\">iPhone</button> <button type=\"button\" class=\"btn press svelte-gy3e4s\">Android</button></div>", 1), St = j("<li class=\"svelte-gy3e4s\"> </li>"), Ct = j("<ol class=\"svelte-gy3e4s\"></ol>"), wt = j("<p class=\"caption svelte-gy3e4s\"> <b> </b>, then Add to Home Screen.</p>"), Tt = j("<p> </p> <!> <!> <!> <!>", 1), Et = j("<details class=\"card connect svelte-gy3e4s\"><summary class=\"svelte-gy3e4s\">Connect your phone <small class=\"svelte-gy3e4s\"> </small></summary> <div class=\"inner svelte-gy3e4s\"><!></div></details>"), Dt = j("<section class=\"card connect svelte-gy3e4s\" aria-label=\"Connect your phone\"><div class=\"inner svelte-gy3e4s\"><h2 class=\"svelte-gy3e4s\">Connect your phone</h2><!></div></section>");
function Ot(e, t) {
	x(t, !0);
	let n = (e) => {
		var n = Tt(), r = a(n);
		let l;
		var m = U(r, !0), h = _(r, 2), g = (e) => {
			var n = yt(), r = $(n);
			Ke(r), Ie(r, (e) => G(f, e), () => N(f));
			var i = _(r, 2);
			F(n), y(() => ye(r, t.info.url)), k("focus", r, (e) => e.currentTarget.select()), D("click", i, p), d(e, n);
		};
		s(h, (e) => {
			t.info.url && e(g);
		});
		var v = _(h, 2), b = (e) => {
			var t = bt();
			d(e, t);
		};
		s(v, (e) => {
			t.info.external || e(b);
		});
		var x = _(v, 2), S = (e) => {
			var t = xt(), n = a(t), r = U(n, !0), o = _(n, 2), s = $(o), l = _(s, 2);
			F(o), y(() => B(r, N(c).title)), D("click", s, () => G(i, "iphone")), D("click", l, () => G(i, "android")), d(e, t);
		}, C = (e) => {
			var t = Ct();
			K(t, 20, () => N(c).steps, (e) => e, (e, t) => {
				var n = St(), r = U(n, !0);
				y(() => B(r, t)), d(e, n);
			}), F(t), d(e, t);
		};
		s(x, (e) => {
			N(o) ? e(C, -1) : e(S);
		});
		var w = _(x, 2), T = (e) => {
			var n = wt(), r = $(n), i = _(r), a = U(i, !0);
			se(), F(n), y(() => {
				B(r, `Open openGym at ${t.info.opengym.url ?? ""}, choose Sign up, enter code `), B(a, t.info.opengym.invite);
			}), d(e, n);
		};
		s(w, (e) => {
			t.info.opengym?.invite && e(T);
		}), y(() => {
			l = J(r, 1, "status svelte-gy3e4s", null, l, { ok: N(u).state === "connected" }), B(m, N(u).text);
		}), d(e, n);
	}, r = Q(t, "collapsed", 3, !1), i = h(null), o = C(() => t.info.phone ?? N(i)), c = C(() => fe(N(o))), u = C(() => $e(t.info, t.now)), f = h(void 0);
	async function p() {
		try {
			await navigator.clipboard.writeText(t.info.url), dt("Address copied");
		} catch {
			N(f).select();
		}
	}
	var m = l(), g = a(m), v = (e) => {
		var t = Et(), r = $(t), i = _($(r)), a = U(i, !0);
		F(r);
		var o = _(r, 2), s = $(o);
		n(s), F(o), F(t), y(() => B(a, N(u).state === "connected" ? "Connected" : "Waiting")), d(e, t);
	}, b = (e) => {
		var t = Dt(), r = $(t), i = _($(r));
		n(i), F(r), F(t), d(e, t);
	};
	s(g, (e) => {
		r() ? e(v) : e(b, -1);
	}), d(e, m), Z();
}
X(["click"]);
// src/lib/ui/Badges.svelte
var kt = j("<li class=\"new svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span></li>"), At = j("<ul class=\"svelte-m8wnum\"></ul>"), jt = j("<li class=\"locked svelte-m8wnum\"><span class=\"medal svelte-m8wnum\" aria-hidden=\"true\"> </span> <span class=\"t svelte-m8wnum\"> </span> <span class=\"s svelte-m8wnum\"> </span> <span class=\"prog svelte-m8wnum\" aria-hidden=\"true\"><i class=\"svelte-m8wnum\"></i></span></li>"), Mt = j("<p class=\"caption svelte-m8wnum\">No badges yet.</p>"), Nt = j("<div class=\"card badges svelte-m8wnum\"><!> <!> <!></div>");
function Pt(e, t) {
	x(t, !0);
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
	var a = Nt(), o = $(a), c = (e) => {
		var n = At();
		K(n, 21, () => t.badges.recent, (e) => e.id, (e, t) => {
			var n = kt(), i = $(n), a = U(i, !0), o = _(i, 2), s = U(o, !0), c = _(o, 2), l = U(c, !0);
			F(n), y((e, n) => {
				B(a, e), B(s, N(t).title), B(l, n);
			}, [() => r(N(t)), () => b(N(t).unlocked_at)]), d(e, n);
		}), F(n), d(e, n);
	};
	s(o, (e) => {
		t.badges.recent.length && e(c);
	});
	var l = _(o, 2), u = (e) => {
		var n = At();
		K(n, 21, () => t.badges.next, (e) => e.id, (e, t) => {
			var n = jt(), a = $(n), o = U(a, !0), s = _(a, 2), c = U(s, !0), l = _(s, 2), u = U(l), f = _(l, 2), p = $(f);
			let m;
			F(f), F(n), y((e, n, r, i) => {
				B(o, e), B(c, N(t).title), B(u, `${n ?? ""} of ${r ?? ""}`), m = Y(p, "", m, { width: i });
			}, [
				() => r(N(t)),
				() => i(N(t).current),
				() => i(N(t).target),
				() => `${Math.min(1, N(t).current / N(t).target) * 100}%`
			]), d(e, n);
		}), F(n), d(e, n);
	};
	s(l, (e) => {
		t.badges.next.length && e(u);
	});
	var f = _(l, 2), p = (e) => {
		var t = Mt();
		d(e, t);
	};
	s(f, (e) => {
		!t.badges.recent.length && !t.badges.next.length && e(p);
	}), F(a), d(e, a), Z();
}
// src/lib/ui/FeedRow.svelte
var Ft = j("<span class=\"mini svelte-69s4be\"> </span>"), It = j("<span class=\"mini svelte-69s4be\">Together</span>"), Lt = j("<span role=\"img\" aria-label=\"Holds a record\">🏆</span>"), Rt = j("<span class=\"spin svelte-69s4be\" role=\"img\" aria-label=\"Saving\"></span>"), zt = j("<span aria-hidden=\"true\"> </span> <span class=\"main svelte-69s4be\"><span class=\"t1 svelte-69s4be\"> <!> <!> <!></span> <span class=\"t2 svelte-69s4be\"> </span></span> <span class=\"right svelte-69s4be\"><!> </span>", 1), Bt = j("<button type=\"button\" class=\"head svelte-69s4be\"><!></button>"), Vt = j("<div class=\"head svelte-69s4be\"><!></div>"), Ht = j("<li><!></li>");
function Ut(e, t) {
	x(t, !0);
	let n = (e) => {
		var n = zt(), c = a(n), l = U(c, !0), u = _(c, 2), f = $(u), p = $(f), m = _(p), h = (e) => {
			var n = Ft(), r = U(n, !0);
			y(() => B(r, t.item.plan)), d(e, n);
		};
		s(m, (e) => {
			t.item.plan && e(h);
		});
		var g = _(m, 2), v = (e) => {
			var t = It();
			d(e, t);
		};
		s(g, (e) => {
			t.item.joint && e(v);
		});
		var b = _(g, 2), x = (e) => {
			var t = Lt();
			d(e, t);
		};
		s(b, (e) => {
			t.record && e(x);
		}), F(f);
		var S = _(f, 2), C = U(S);
		F(u);
		var w = _(u, 2), T = $(w), E = (e) => {
			var t = Rt();
			d(e, t);
		};
		s(T, (e) => {
			N(i) && e(E);
		});
		var D = _(T);
		F(w), y(() => {
			J(c, 1, `ic ${t.item.kind ?? ""}`, "svelte-69s4be"), B(l, r[t.item.kind] ?? "💪"), B(p, `${N(o).title ?? ""} `), B(C, `${N(o).when ?? ""} · ${N(o).duration ?? ""}`), B(D, ` ${(N(o).removable === "restore" ? "Removed" : N(o).label ?? (N(o).xp && `${N(o).xp} XP`)) ?? ""}`);
		}), d(e, n);
	}, r = {
		run: "🏃",
		walk: "🚶",
		gym: "🏋️",
		home: "🧘",
		active_day: "👟"
	}, i = C(() => rt[`${t.person}/${t.item.key}`]), o = C(() => ee(N(i) && N(i).want !== null ? {
		...t.item,
		excluded: N(i).want
	} : t.item)), c = C(() => N(i)?.want === null), l = C(() => t.item.kind !== "active_day");
	var u = Ht();
	let f;
	var p = $(u), m = (e) => {
		var r = Bt(), i = $(r);
		n(i), F(r), D("click", r, () => t.onopen(t.item)), d(e, r);
	}, h = (e) => {
		var t = Vt(), r = $(t);
		n(r), F(t), d(e, t);
	};
	s(p, (e) => {
		N(l) ? e(m) : e(h, -1);
	}), F(u), y(() => f = J(u, 1, "svelte-69s4be", null, f, {
		dim: N(o).removable === "restore" || N(c),
		grey: !!N(o).label
	})), d(e, u), Z();
}
X(["click"]);
// src/lib/ui/Feed.svelte
var Wt = j("<ul class=\"card svelte-n1344i\"></ul>"), Gt = j("<p class=\"caption empty svelte-n1344i\">No workouts in the last 90 days.</p>"), Kt = j("<button type=\"button\" class=\"btn older svelte-n1344i\">Load older</button>"), qt = j("<!> <!>", 1);
function Jt(e, t) {
	x(t, !0);
	let n = h(H([])), r = h(!0), i = h(!1), o = null, c = C(() => M(t.items, v(N(n), t.person, it)));
	async function l() {
		G(i, !0);
		let e = o ?? N(c).at(-1)?.start.slice(0, 10) ?? f(E(), 88), a = await gt(t.person, e);
		G(i, !1), a && (G(n, M(N(n), a.items), !0), o = f(e, 90), G(r, a.more, !0));
	}
	var u = qt(), p = a(u), m = (e) => {
		var n = Wt();
		K(n, 21, () => N(c), (e) => e.key, (e, n) => {
			{
				let r = C(() => t.records?.has(N(n).key));
				Ut(e, {
					get person() {
						return t.person;
					},
					get item() {
						return N(n);
					},
					get record() {
						return N(r);
					},
					get onopen() {
						return t.onopen;
					}
				});
			}
		}), F(n), d(e, n);
	}, g = (e) => {
		var t = Gt();
		d(e, t);
	};
	s(p, (e) => {
		N(c).length ? e(m) : e(g, -1);
	});
	var b = _(p, 2), S = (e) => {
		var t = Kt();
		y(() => t.disabled = N(i)), D("click", t, l), d(e, t);
	};
	s(b, (e) => {
		N(r) && e(S);
	}), d(e, u), Z();
}
X(["click"]);
// src/lib/ui/PlanBar.svelte
var Yt = j("<span> </span>"), Xt = j("<i class=\"svelte-1y5m0aq\"></i>"), Zt = j("<div class=\"segs svelte-1y5m0aq\" role=\"img\"></div> <div class=\"legend caption svelte-1y5m0aq\"><span><i class=\"dot svelte-1y5m0aq\"></i> run · <i class=\"dot svelte-1y5m0aq\"></i> walk</span> <span> </span></div>", 1), Qt = j("<div class=\"card plan svelte-1y5m0aq\"><div class=\"top svelte-1y5m0aq\"><span class=\"big\"> </span> <!></div> <!></div>");
function $t(e, t) {
	x(t, !0);
	let n = C(() => tt(t.plan)), r = C(() => Math.round(((t.plan.warmup_s ?? 0) + t.plan.intervals.reduce((e, [, t]) => e + t, 0)) / 60));
	var i = Qt(), o = $(i), c = $(o), l = U(c, !0), u = _(c, 2), f = (e) => {
		var n = Yt();
		let r;
		var i = U(n, !0);
		y(() => {
			r = J(n, 1, "tag svelte-1y5m0aq", null, r, { due: t.plan.due_today }), B(i, t.plan.due_today ? "Due today" : "Rest day");
		}), d(e, n);
	};
	s(u, (e) => {
		N(n).length && e(f);
	}), F(o);
	var p = _(o, 2), m = (e) => {
		var t = Zt(), i = a(t);
		K(i, 21, () => N(n), Qe, (e, t) => {
			var n = Xt();
			let r;
			y(() => r = Y(n, "", r, {
				"flex-grow": N(t).frac,
				background: `var(--${N(t).kind === "run" ? "run" : "fill"})`
			})), d(e, n);
		}), F(i);
		var o = _(i, 2), s = $(o), c = $(s);
		Y(c, "", {}, { background: "var(--run)" });
		var l = _(c, 2);
		Y(l, "", {}, { background: "var(--fill)" }), se(), F(s);
		var u = _(s, 2), f = U(u);
		F(o), y(() => {
			q(i, "aria-label", `Run and walk intervals, ${N(r) ?? ""} minutes in total`), B(f, `${N(r) ?? ""} min`);
		}), d(e, t);
	};
	s(p, (e) => {
		N(n).length && e(m);
	}), F(i), y(() => B(l, t.plan.state)), d(e, i), Z();
}
// src/lib/gesture.js
var en = (e, t = .998) => e / 1e3 * t / (1 - t), tn = (e, t, n) => e + en(t) > n / 2;
function nn(e) {
	let t = e[0], n = e[e.length - 1];
	return t && n && n.t > t.t ? (n.x - t.x) / (n.t - t.t) * 1e3 : 0;
}
var rn = (e, t, n = .55) => e * t * n / (t + n * Math.abs(e)), an = j("<h2 class=\"svelte-9pi54v\"> </h2> <button type=\"button\" class=\"close press svelte-9pi54v\" aria-label=\"Close\">✕</button>", 1), on = j("<div class=\"grab drag svelte-9pi54v\"><!></div>"), sn = j("<div class=\"grab svelte-9pi54v\"><!></div>"), cn = j("<dialog><!> <div class=\"body svelte-9pi54v\"><!></div></dialog>");
function ln(e, t) {
	let n = r();
	x(t, !0);
	let i = (e) => {
		var r = an(), i = a(r), o = U(i, !0), s = _(i, 2);
		y(() => {
			q(i, "id", `${n}-t`), B(o, t.title);
		}), D("click", s, () => u.close()), d(e, r);
	}, o = Q(t, "drag", 3, !1), c = Q(t, "wide", 3, !1), l = Q(t, "onclose", 3, null), u, f, p = h(0), m = null, g = h(!1), v = !1, b = !1;
	function S() {
		return u.open ? null : (v = document.documentElement.style.overflow !== "hidden", v && (document.documentElement.style.overflow = "hidden"), u.showModal(), f);
	}
	function C() {
		u.close();
	}
	function w() {
		v && (document.documentElement.style.overflow = ""), v = !1, G(p, 0), l()?.();
	}
	function T(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), m = {
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		}, G(g, !0));
	}
	function E(e) {
		m && (G(p, Math.max(0, e.clientY - m.start), !0), m.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), m.samples.length > 8 && m.samples.shift());
	}
	function O(e) {
		if (!m) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = nn([...m.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		m = null, G(g, !1), tn(N(p), n, u.offsetHeight) ? u.close() : G(p, 0);
	}
	var A = {
		show: S,
		close: C
	}, j = cn();
	let M, P;
	var I = $(j), L = (e) => {
		var t = on(), n = $(t);
		i(n), F(t), D("pointerdown", t, T), D("pointermove", t, E), D("pointerup", t, O), k("pointercancel", t, O), d(e, t);
	}, ee = (e) => {
		var t = sn(), n = $(t);
		i(n), F(t), d(e, t);
	};
	s(I, (e) => {
		o() ? e(L) : e(ee, -1);
	});
	var R = _(I, 2), z = $(R);
	return et(z, () => t.children), F(R), Ie(R, (e) => f = e, () => f), F(j), Ie(j, (e) => u = e, () => u), y(() => {
		q(j, "aria-labelledby", `${n}-t`), M = J(j, 1, "svelte-9pi54v", null, M, {
			wide: c(),
			dragging: N(g)
		}), P = Y(j, "", P, { transform: N(p) ? `translateY(${N(p)}px)` : null });
	}), D("pointerdown", j, (e) => b = e.target === u), D("click", j, (e) => e.target === u && b && u.close()), k("close", j, w), D("keydown", j, (e) => e.key === "Escape" && e.stopPropagation()), d(e, j), Z(A);
}
X([
	"click",
	"pointerdown",
	"keydown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/RecordsDialog.svelte
var un = j("<li class=\"svelte-18znx9k\"><span> <b class=\"svelte-18znx9k\"> </b> </span></li>"), dn = j("<h3 class=\"svelte-18znx9k\"> </h3> <ul class=\"svelte-18znx9k\"></ul>", 1);
function fn(e, t) {
	x(t, !0);
	let n;
	function r(e = null) {
		let t = n.show();
		t && (t.scrollTop = 0, e && t.querySelector(`[data-group="${e}"]`)?.scrollIntoView({ block: "start" }));
	}
	var i = { open: r };
	return Ie(ln(e, {
		title: "All records",
		drag: !0,
		children: (e, n) => {
			var r = l(), i = a(r);
			K(i, 17, () => t.groups, (e) => e.group, (e, t) => {
				var n = dn(), r = a(n), i = U(r, !0), o = _(r, 2);
				K(o, 21, () => N(t).lifts, (e) => e.id, (e, t) => {
					var n = un(), r = $(n), i = $(r), a = _(i), o = U(a, !0), s = _(a);
					F(r), F(n), y((e, n) => {
						B(i, `${N(t).name ?? ""} · `), B(o, e), B(s, ` · ${n ?? ""}`);
					}, [() => Te(N(t)), () => b(N(t).date)]), d(e, n);
				}), F(o), y(() => {
					q(r, "data-group", N(t).group), B(i, N(t).group);
				}), d(e, n);
			}), d(e, r);
		},
		$$slots: { default: !0 }
	}), (e) => n = e, () => n), Z(i);
}
// src/lib/ui/StepBars.svelte
var pn = j("<li><span class=\"col svelte-1f099m\" aria-hidden=\"true\"><i></i></span> <span class=\"day svelte-1f099m\" aria-hidden=\"true\"> </span></li>"), mn = j("<span class=\"goal svelte-1f099m\" aria-hidden=\"true\"></span>"), hn = j("<div class=\"chart svelte-1f099m\"><ul aria-label=\"Steps this week\" class=\"svelte-1f099m\"></ul> <!></div>");
function gn(e, t) {
	x(t, !0);
	let n = (e) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString("en-GB", {
		weekday: "long",
		timeZone: "UTC"
	}), r = (e) => `${n(e.date)} ${e.steps.toLocaleString("en-US")} steps`;
	var i = hn(), a = $(i);
	K(a, 21, () => t.bars, (e) => e.date, (e, t) => {
		var n = pn();
		let i;
		var a = $(n), o = $(a);
		let s, c;
		F(a);
		var l = _(a, 2), u = U(l, !0);
		F(n), y((e) => {
			q(n, "aria-label", e), q(n, "aria-hidden", N(t).future ? "true" : void 0), q(n, "aria-current", N(t).isToday ? "date" : void 0), i = J(n, 1, "svelte-1f099m", null, i, { today: N(t).isToday }), s = J(o, 1, "svelte-1f099m", null, s, {
				active: N(t).active,
				future: N(t).future
			}), c = Y(o, "", c, { height: `${N(t).frac * 100}%` }), B(u, N(t).label);
		}, [() => N(t).future ? void 0 : r(N(t))]), d(e, n);
	}), F(a);
	var o = _(a, 2), c = (e) => {
		var n = mn();
		let r;
		y(() => r = Y(n, "", r, { bottom: `calc(1.5rem + (100% - 1.5rem) * ${t.goalFrac ?? ""})` })), d(e, n);
	};
	s(o, (e) => {
		t.goalFrac !== null && e(c);
	}), F(i), d(e, i), Z();
}
// src/lib/ui/Progress.svelte
var _n = j("<div class=\"card steps svelte-kr1x1f\"><!> <p class=\"caption svelte-kr1x1f\"> </p></div>"), vn = j("<li class=\"svelte-kr1x1f\"><button type=\"button\" class=\"grp svelte-kr1x1f\"><span class=\"g svelte-kr1x1f\"> </span><span> <b class=\"svelte-kr1x1f\"> </b></span></button></li>"), yn = j("<ul class=\"svelte-kr1x1f\"></ul> <button type=\"button\" class=\"btn more svelte-kr1x1f\"> </button>", 1), bn = j("<p class=\"caption empty svelte-kr1x1f\">Your heaviest sets appear here after your first gym session.</p>"), xn = j("<span class=\"k svelte-kr1x1f\"><span class=\"chip svelte-kr1x1f\" aria-hidden=\"true\">⚡</span>Fastest 1 km</span> <span class=\"v run svelte-kr1x1f\"> </span>", 1), Sn = j("<button type=\"button\" class=\"row svelte-kr1x1f\"><!></button>"), Cn = j("<div class=\"row svelte-kr1x1f\"><!></div>"), wn = j("<p class=\"caption empty svelte-kr1x1f\">Run 1 km with GPS to set your first time.</p>"), Tn = j("<!> <div class=\"card svelte-kr1x1f\"><!></div> <div class=\"card rows svelte-kr1x1f\"><!> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Longest session</span><span class=\"v svelte-kr1x1f\"> </span></div> <div class=\"row svelte-kr1x1f\"><span class=\"k svelte-kr1x1f\">Total lifted</span><span class=\"v svelte-kr1x1f\"> </span></div></div> <!>", 1);
function En(t, n) {
	x(n, !0);
	let r = C(() => n.person.week.goal.steps ?? 0), i = C(() => e(n.person.steps_week, N(r), E())), o = C(() => n.person.pbs.lifts ?? []), f = C(() => u(N(o))), p, m = C(() => n.person.pbs.fastest_1k), h = C(() => n.person.pbs.gym_tonnes.toLocaleString(void 0, { maximumFractionDigits: 1 }));
	var g = Tn(), v = a(g), S = (e) => {
		var t = _n(), n = $(t);
		gn(n, {
			get bars() {
				return N(i).bars;
			},
			get goalFrac() {
				return N(i).goalFrac;
			}
		});
		var r = _(n, 2), a = U(r, !0);
		F(t), y((e) => B(a, e), [() => oe(N(i).bars)]), d(e, t);
	};
	s(v, (e) => {
		N(i) && e(S);
	});
	var T = _(v, 2), O = $(T), k = (e) => {
		var t = yn(), n = a(t);
		K(n, 21, () => N(f), (e) => e.group, (e, t) => {
			var n = vn(), r = $(n), i = $(r), a = U(i, !0), o = _(i), s = $(o), c = _(s), l = U(c, !0);
			F(o), F(r), F(n), y((e) => {
				B(a, N(t).group), B(s, `${N(t).lift.name ?? ""} · `), B(l, e);
			}, [() => Te(N(t).lift)]), D("click", r, () => p.open(N(t).group)), d(e, n);
		}), F(n);
		var r = _(n, 2), i = U(r);
		y(() => B(i, `All records (${N(o).length ?? ""})`)), D("click", r, () => p.open()), d(e, t);
	}, A = (e) => {
		var t = bn();
		d(e, t);
	};
	s(O, (e) => {
		N(o).length ? e(k) : e(A, -1);
	}), F(T);
	var j = _(T, 2), M = $(j), P = (e) => {
		let t = (e) => {
			var t = xn(), n = _(a(t), 2), r = U(n);
			y((e, t) => B(r, `${e ?? ""} · ${t ?? ""}`), [() => w(N(m).seconds), () => b(N(m).date)]), d(e, t);
		};
		var r = l(), i = a(r), o = (e) => {
			var r = Sn(), i = $(r);
			t(i), F(r), D("click", r, () => n.onopen({ key: N(m).key })), d(e, r);
		}, c = (e) => {
			var n = Cn(), r = $(n);
			t(r), F(n), d(e, n);
		};
		s(i, (e) => {
			N(m).key ? e(o) : e(c, -1);
		}), d(e, r);
	}, I = (e) => {
		var t = wn();
		d(e, t);
	};
	s(M, (e) => {
		N(m) ? e(P) : e(I, -1);
	});
	var L = _(M, 2), ee = _($(L)), R = U(ee);
	F(L);
	var z = _(L, 2), V = _($(z)), H = U(V);
	F(z), F(j);
	var te = _(j, 2);
	{
		let e = C(() => c(N(o)));
		Ie(fn(te, { get groups() {
			return N(e);
		} }), (e) => p = e, () => p);
	}
	y((e) => {
		B(R, `${e ?? ""} km`), B(H, `${N(h) ?? ""} t`);
	}, [() => n.person.pbs.longest_session_km.toFixed(1)]), d(t, g), Z();
}
X(["click"]);
// src/lib/ui/Shoes.svelte
var Dn = j("<span class=\"label svelte-eu7fja\"> </span>"), On = j("<li><div class=\"top svelte-eu7fja\"><span class=\"name svelte-eu7fja\"> </span><span class=\"km svelte-eu7fja\"> </span></div> <span class=\"bar svelte-eu7fja\" aria-hidden=\"true\"><i class=\"svelte-eu7fja\"></i></span> <div class=\"caption svelte-eu7fja\"><span> </span> <!></div></li>"), kn = j("<ul class=\"card svelte-eu7fja\"></ul>");
function An(e, t) {
	x(t, !0);
	let n = C(() => t.shoes.map(S));
	var r = kn();
	K(r, 23, () => N(n), (e, n) => t.shoes[n].id, (e, t) => {
		var n = On(), r = $(n), i = $(r), a = U(i, !0), o = _(i), c = U(o, !0);
		F(r);
		var l = _(r, 2), u = $(l);
		let f;
		F(l);
		var p = _(l, 2), m = $(p), h = U(m, !0), g = _(m, 2), v = (e) => {
			var n = Dn(), r = U(n, !0);
			y(() => B(r, N(t).label)), d(e, n);
		};
		s(g, (e) => {
			N(t).label && e(v);
		}), F(p), F(n), y(() => {
			J(n, 1, le(N(t).state), "svelte-eu7fja"), B(a, N(t).name), B(c, N(t).km), f = Y(u, "", f, { width: `${N(t).frac * 100}%` }), B(h, N(t).detail);
		}), d(e, n);
	}), F(r), d(e, r), Z();
}
// src/lib/ui/ShoesDialog.svelte
var jn = j("<span class=\"mini svelte-1bogt6u\">Current</span>"), Mn = j("<span class=\"ask svelte-1bogt6u\"> </span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Nn = j("<button type=\"button\" class=\"btn\">Set current</button>"), Pn = j("<!> <button type=\"button\" class=\"btn danger svelte-1bogt6u\">Retire</button>", 1), Fn = j("<li class=\"svelte-1bogt6u\"><div class=\"top svelte-1bogt6u\"><span class=\"name svelte-1bogt6u\"> <!></span> <span class=\"caption\"> </span></div> <div class=\"acts svelte-1bogt6u\"><label class=\"svelte-1bogt6u\">Replace at <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/> km</label> <!></div></li>"), In = j("<p class=\"caption note svelte-1bogt6u\">No current shoe: new runs count on no shoe until you set one.</p>"), Ln = j("<ul class=\"svelte-1bogt6u\"></ul> <!>", 1), Rn = j("<p class=\"caption note svelte-1bogt6u\">No shoes yet.</p>"), zn = j("<p class=\"error svelte-1bogt6u\" role=\"alert\"> </p>"), Bn = j("<!> <form class=\"svelte-1bogt6u\"><h3 class=\"svelte-1bogt6u\">Add a shoe</h3> <label class=\"svelte-1bogt6u\">Name <input type=\"text\" class=\"svelte-1bogt6u\"/></label> <label class=\"svelte-1bogt6u\">Replace at (km) <input type=\"number\" inputmode=\"numeric\" class=\"svelte-1bogt6u\"/></label> <!> <button type=\"submit\" class=\"btn add svelte-1bogt6u\">Add</button></form>", 1);
function Vn(e, t) {
	x(t, !0);
	let n = C(() => t.shoes.map((e) => ({
		...S(e),
		id: e.id,
		limit: e.limit,
		current: !!e.current
	}))), r, i = h(""), o = h(H(700)), c = h(null), l = h(!1), u = h(null);
	function f() {
		r.show();
	}
	function p() {
		G(u, null), G(c, null);
	}
	async function m(e) {
		G(l, !0);
		let t = await _t(e);
		return G(l, !1), t;
	}
	async function g(e) {
		e.preventDefault();
		let n = W(N(i), N(o));
		G(c, n.error ?? null, !0), !N(c) && await m({
			op: "add",
			person: t.person,
			...n
		}) && G(i, "");
	}
	async function v(e, t) {
		let n = W(void 0, e.currentTarget.value, { partial: !0 });
		G(c, n.error ?? null, !0), N(c) ? e.currentTarget.value = t.limit : n.replace_at_km !== t.limit && await m({
			op: "update",
			id: t.id,
			...n
		});
	}
	async function b(e) {
		G(u, null), await m({
			op: "retire",
			id: e.id
		});
	}
	var w = { open: f };
	return Ie(ln(e, {
		title: "Manage shoes",
		onclose: p,
		children: (e, r) => {
			var f = Bn(), p = a(f), h = (e) => {
				var r = Ln(), i = a(r);
				K(i, 21, () => N(n), (e) => e.id, (e, n) => {
					var r = Fn(), i = $(r), o = $(i), c = $(o, !0), f = _(c), p = (e) => {
						var t = jn();
						d(e, t);
					};
					s(f, (e) => {
						N(n).current && e(p);
					}), F(o);
					var h = _(o, 2), g = U(h, !0);
					F(i);
					var x = _(i, 2), S = $(x), C = _($(S));
					Ke(C), se(), F(S);
					var w = _(S, 2), T = (e) => {
						var t = Mn(), r = a(t), i = U(r), o = _(r, 2), s = _(o, 2);
						y(() => {
							B(i, `Retire ${N(n).name ?? ""}?`), s.disabled = N(l);
						}), D("click", o, () => G(u, null)), D("click", s, () => b(N(n))), d(e, t);
					}, E = (e) => {
						var r = Pn(), i = a(r), o = (e) => {
							var r = Nn();
							y(() => r.disabled = N(l)), D("click", r, () => m({
								op: "current",
								person: t.person,
								id: N(n).id
							})), d(e, r);
						};
						s(i, (e) => {
							N(n).current || e(o);
						});
						var c = _(i, 2);
						y(() => c.disabled = N(l)), D("click", c, () => G(u, N(n).id, !0)), d(e, r);
					};
					s(w, (e) => {
						N(u) === N(n).id ? e(T) : e(E, -1);
					}), F(x), F(r), y(() => {
						B(c, N(n).name), B(g, N(n).km), q(C, "min", xe.replace_at_km[0]), q(C, "max", xe.replace_at_km[1]), q(C, "step", xe.replace_at_km[2]), ye(C, N(n).limit), C.disabled = N(l);
					}), D("change", C, (e) => v(e, N(n))), d(e, r);
				}), F(i);
				var o = _(i, 2), c = (e) => {
					var t = In();
					d(e, t);
				}, f = C(() => !N(n).some((e) => e.current));
				s(o, (e) => {
					N(f) && e(c);
				}), d(e, r);
			}, x = (e) => {
				var t = Rn();
				d(e, t);
			};
			s(p, (e) => {
				N(n).length ? e(h) : e(x, -1);
			});
			var S = _(p, 2), w = _($(S), 2), T = _($(w));
			Ke(T), F(w);
			var E = _(w, 2), O = _($(E));
			Ke(O), F(E);
			var A = _(E, 2), j = (e) => {
				var t = zn(), n = U(t, !0);
				y(() => B(n, N(c))), d(e, t);
			};
			s(A, (e) => {
				N(c) && e(j);
			});
			var M = _(A, 2);
			F(S), y(() => {
				q(T, "maxlength", xe.name[1]), T.disabled = N(l), q(O, "min", xe.replace_at_km[0]), q(O, "max", xe.replace_at_km[1]), q(O, "step", xe.replace_at_km[2]), O.disabled = N(l), M.disabled = N(l);
			}), k("submit", S, g), ke(T, () => N(i), (e) => G(i, e)), ke(O, () => N(o), (e) => G(o, e)), d(e, f);
		},
		$$slots: { default: !0 }
	}), (e) => r = e, () => r), Z(w);
}
X(["change", "click"]);
// src/lib/ui/WorkoutDialog.svelte
var Hn = j("<p class=\"msg\" role=\"status\"> </p>"), Un = j("<p class=\"msg\" role=\"status\">Loading…</p>"), Wn = j("<span class=\"mini svelte-1uaoa1p\"> </span>"), Gn = j("<span class=\"mini off svelte-1uaoa1p\"> </span>"), Kn = j("<div><dt class=\"svelte-1uaoa1p\"> </dt><dd class=\"svelte-1uaoa1p\"> </dd></div>"), qn = j("<option disabled=\"\"> </option>"), Jn = j("<option> </option>"), Yn = j("<div class=\"shoe svelte-1uaoa1p\"><dt class=\"svelte-1uaoa1p\"><label>Shoe</label></dt><dd class=\"svelte-1uaoa1p\"><select class=\"svelte-1uaoa1p\"><!><!></select></dd></div>"), Xn = j("<dl class=\"svelte-1uaoa1p\"><!> <!></dl>"), Zn = j("<p class=\"caption note svelte-1uaoa1p\"> </p>"), Qn = j("<p class=\"caption note svelte-1uaoa1p\">Map unavailable</p>"), $n = j("<div class=\"ph svelte-1uaoa1p\" aria-hidden=\"true\"></div>"), er = j("<h3 class=\"svelte-1uaoa1p\"> </h3> <!>", 1), tr = j("<!> <!>", 1), nr = j("<li class=\"svelte-1uaoa1p\"><span class=\"zn svelte-1uaoa1p\"> <small class=\"svelte-1uaoa1p\"> </small></span> <span class=\"bar svelte-1uaoa1p\"><span class=\"svelte-1uaoa1p\"></span></span> <span class=\"num svelte-1uaoa1p\"> </span></li>"), rr = j("<h3 class=\"svelte-1uaoa1p\">Heart-rate zones</h3> <ul class=\"zones svelte-1uaoa1p\"></ul>", 1), ir = j("<tr><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td><td class=\"svelte-1uaoa1p\"> </td></tr>"), ar = j("<h3 class=\"svelte-1uaoa1p\">Splits</h3> <table class=\"svelte-1uaoa1p\"><thead><tr><th class=\"svelte-1uaoa1p\">Km</th><th class=\"svelte-1uaoa1p\">Time</th><th class=\"svelte-1uaoa1p\"> </th><th class=\"svelte-1uaoa1p\">HR</th><th class=\"svelte-1uaoa1p\">Climb</th></tr></thead><tbody></tbody></table>", 1), or = j("<span role=\"img\" aria-label=\"Record\">🏆</span>"), sr = j("<li class=\"svelte-1uaoa1p\"> <b class=\"svelte-1uaoa1p\"> </b><!></li>"), cr = j("<h3 class=\"svelte-1uaoa1p\">Exercises</h3> <ul class=\"gym svelte-1uaoa1p\"><!> <li class=\"vol svelte-1uaoa1p\">Total volume · <b class=\"svelte-1uaoa1p\"> </b></li></ul>", 1), lr = j("<span class=\"ask svelte-1uaoa1p\">Delete manual entry?</span> <button type=\"button\" class=\"btn\">Cancel</button> <button type=\"button\" class=\"btn danger svelte-1uaoa1p\">Delete</button>", 1), ur = j("<button type=\"button\"> </button>"), dr = j("<div class=\"acts svelte-1uaoa1p\"><!></div>"), fr = j("<p class=\"sub svelte-1uaoa1p\"> <!> <!></p> <!> <!> <!> <!> <!> <!> <!>", 1);
function pr(e, t) {
	let n = r();
	x(t, !0);
	let i = Q(t, "shoes", 3, null), o = () => import("./viz-3I83KMq2.js"), c, u = h(null), f = h(null), p = h(null), g = h(null), v = h(null), b = h(!1), S = 0;
	async function w(e) {
		let n = c.show();
		if (!n) return;
		let r = ++S;
		G(u, e), G(f, G(p, G(v, null))), G(b, !1), n.scrollTop = 0;
		try {
			let n = await Ne(`workout?person=${encodeURIComponent(t.person)}&key=${encodeURIComponent(e.key)}`);
			if (r !== S) return;
			G(f, n), (n.route?.length || n.series) && !N(g) && o().then((e) => G(g, e), (e) => r === S && G(v, e));
		} catch (e) {
			r === S && G(p, e);
		}
	}
	function T() {
		S++, G(u, G(f, null));
	}
	let E = C(() => N(u) && `${t.person}/${N(u).key}`), O = C(() => N(E) && rt[N(E)]), k = C(() => {
		if (!N(u)) return null;
		let e = t.feed.find((e) => e.key === N(u).key) ?? {
			...N(f)?.summary,
			...N(u),
			excluded: it[N(E)] ?? N(u).excluded ?? !1
		};
		return N(O) && N(O).want !== null ? {
			...e,
			excluded: N(O).want
		} : e;
	}), A = C(() => N(f) && N(k) ? Se(t.viewer, t.person, N(k)) : {
		remove: null,
		shoe: !1
	}), j = C(() => N(A).shoe && i() ? m(i(), t.runShoes?.[N(u).key]) : null), M = C(() => N(f) && Ve(N(f).summary)), P = C(() => N(f) ? ue(N(f)).filter(([e]) => !(e === "Shoe" && N(j)?.options.length)) : []), I = C(() => N(f) && Me(N(f))), L = C(() => N(f) && ve(N(f).zones, N(f).max_hr)), R = C(() => N(f) ? he(N(f)) : []), z = C(() => N(f) && Fe(N(f).gym)), V = C(() => N(f) && Ge(N(f))), H = (e) => e.status === 404 ? "Workout not found" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant";
	async function te(e) {
		let n = e.currentTarget;
		await vt(t.person, N(u).key, Number(n.value)) || (n.value = String(N(j).value));
	}
	let W = {
		remove: "Remove",
		restore: "Restore",
		delete: "Delete"
	};
	function ne() {
		N(A).remove === "delete" ? G(b, !0) : mt(t.person, N(u).key, N(A).remove);
	}
	var re = { open: w };
	{
		let r = C(() => N(M)?.title ?? N(u)?.name ?? "Workout");
		Ie(ln(e, {
			get title() {
				return N(r);
			},
			drag: !0,
			wide: !0,
			onclose: T,
			children: (e, r) => {
				var i = l(), o = a(i), m = (e) => {
					var t = Hn(), n = U(t, !0);
					y((e) => B(n, e), [() => H(N(p))]), d(e, t);
				}, h = (e) => {
					var t = Un();
					d(e, t);
				}, x = (e) => {
					var r = fr(), i = a(r), o = $(i), p = _(o), m = (e) => {
						var t = Wn(), n = U(t, !0);
						y(() => B(n, N(M).plan)), d(e, t);
					};
					s(p, (e) => {
						N(M).plan && e(m);
					});
					var h = _(p, 2), x = (e) => {
						var t = Gn(), n = U(t, !0);
						y((e) => B(n, e), [() => ee(N(k)).label]), d(e, t);
					}, S = C(() => N(k) && ee(N(k)).label);
					s(h, (e) => {
						N(S) && e(x);
					}), F(i);
					var w = _(i, 2), T = (e) => {
						var t = Xn(), r = $(t);
						K(r, 17, () => N(P), ([e, t]) => e, (e, t) => {
							var n = C(() => ge(N(t), 2));
							let r = () => N(n)[0], i = () => N(n)[1];
							var a = Kn(), o = $(a), s = U(o, !0), c = _(o), l = U(c, !0);
							F(a), y(() => {
								B(s, r()), B(l, i());
							}), d(e, a);
						});
						var i = _(r, 2), a = (e) => {
							var t = Yn(), r = $(t), i = U(r), a = _(r), o = $(a), c = $(o), l = (e) => {
								var t = qn(), n = U(t, !0);
								t.value = t.__value = "", y(() => B(n, N(j).extra)), d(e, t);
							};
							s(c, (e) => {
								N(j).extra && e(l);
							});
							var u = _(c);
							K(u, 17, () => N(j).options, (e) => e.id, (e, t) => {
								var n = Jn(), r = U(n, !0), i = {};
								y(() => {
									B(r, N(t).label), i !== (i = N(t).id) && (n.value = (n.__value = i) ?? "");
								}), d(e, n);
							}), F(o);
							var f;
							Re(o), F(a), F(t), y(() => {
								q(i, "for", `${n}-shoe`), q(o, "id", `${n}-shoe`), f !== (f = N(j).value) && (o.value = (o.__value = f) ?? "", je(o, f));
							}), D("change", o, te), d(e, t);
						};
						s(i, (e) => {
							N(j)?.options.length && e(a);
						}), F(t), d(e, t);
					};
					s(w, (e) => {
						(N(P).length || N(j)?.options.length) && e(T);
					});
					var E = _(w, 2), H = (e) => {
						var t = Zn(), n = U(t, !0);
						y((e) => B(n, e), [() => pe(N(f).note)]), d(e, t);
					}, re = C(() => pe(N(f).note));
					s(E, (e) => {
						N(re) && e(H);
					});
					var ie = _(E, 2), ae = (e) => {
						var t = l(), n = a(t), r = (e) => {
							var t = Qn();
							d(e, t);
						}, i = (e) => {
							var t = $n();
							let n;
							y(() => n = Y(t, "", n, { height: `${N(f).route?.length ? 220 : 0}px` })), d(e, t);
						}, o = (e) => {
							var t = tr(), n = a(t), r = (e) => {
								var t = l(), n = a(t);
								{
									let e = C(() => Oe(N(f)) ? "run" : "gym");
									Je(n, () => N(g).MapView, (t, n) => {
										n(t, {
											get route() {
												return N(f).route;
											},
											get kind() {
												return N(e);
											}
										});
									});
								}
								d(e, t);
							};
							s(n, (e) => {
								N(f).route?.length && e(r);
							});
							var i = _(n, 2);
							K(i, 17, () => N(I)?.list ?? [], (e) => e.label, (e, t) => {
								var n = er(), r = a(n), i = U(r, !0), o = _(r, 2);
								Je(o, () => N(g).Chart, (e, n) => {
									n(e, {
										get x() {
											return N(I).x;
										},
										get label() {
											return N(t).label;
										},
										get values() {
											return N(t).values;
										},
										get color() {
											return N(t).color;
										},
										get fmt() {
											return N(t).fmt;
										}
									});
								}), y(() => B(i, N(t).label)), d(e, n);
							}), d(e, t);
						};
						s(n, (e) => {
							N(v) ? e(r) : N(g) ? e(o, -1) : e(i, 1);
						}), d(e, t);
					};
					s(ie, (e) => {
						(N(f).route?.length || N(I)?.list.length) && e(ae);
					});
					var oe = _(ie, 2), ce = (e) => {
						var t = rr(), n = _(a(t), 2);
						K(n, 21, () => N(L), (e) => e.zone, (e, t) => {
							var n = nr(), r = $(n), i = $(r), a = _(i), o = U(a, !0);
							F(r);
							var s = _(r, 2), c = $(s);
							let l;
							F(s);
							var u = _(s, 2), f = U(u);
							F(n), y(() => {
								B(i, `${N(t).zone ?? ""} `), B(o, N(t).bpm), l = Y(c, "", l, { width: `${N(t).pct ?? ""}%` }), B(f, `${N(t).time ?? ""} · ${N(t).pct ?? ""}%`);
							}), d(e, n);
						}), F(n), d(e, t);
					};
					s(oe, (e) => {
						N(L) && e(ce);
					});
					var le = _(oe, 2), ue = (e) => {
						var t = ar(), n = _(a(t), 2), r = $(n), i = $(r), o = _($(i), 2), s = U(o, !0);
						se(2), F(i), F(r);
						var c = _(r);
						K(c, 21, () => N(R), Qe, (e, t) => {
							var n = ir(), r = $(n), i = U(r, !0), a = _(r), o = U(a, !0), s = _(a), c = U(s, !0), l = _(s), u = U(l, !0), f = _(l), p = U(f, !0);
							F(n), y(() => {
								B(i, N(t).km), B(o, N(t).time), B(c, N(t).pace), B(u, N(t).hr), B(p, N(t).climb);
							}), d(e, n);
						}), F(c), F(n), y(() => B(s, N(V) ? "km/h" : "Pace")), d(e, t);
					};
					s(le, (e) => {
						N(R).length && e(ue);
					});
					var de = _(le, 2), fe = (e) => {
						var t = cr(), n = _(a(t), 2), r = $(n);
						K(r, 17, () => N(z).exercises, Qe, (e, t) => {
							var n = sr(), r = $(n), i = _(r), a = U(i, !0), o = _(i), c = (e) => {
								var t = or();
								d(e, t);
							};
							s(o, (e) => {
								N(t).record && e(c);
							}), F(n), y(() => {
								B(r, `${N(t).name ?? ""} · `), B(a, N(t).set);
							}), d(e, n);
						});
						var i = _(r, 2), o = _($(i)), c = U(o, !0);
						F(i), F(n), y(() => B(c, N(z).volume)), d(e, t);
					};
					s(de, (e) => {
						N(z) && e(fe);
					});
					var me = _(de, 2), he = (e) => {
						var n = dr(), r = $(n), i = (e) => {
							var n = lr(), r = _(a(n), 2), i = _(r, 2);
							D("click", r, () => G(b, !1)), D("click", i, () => (mt(t.person, N(u).key, "remove"), c.close())), d(e, n);
						}, o = (e) => {
							var t = ur();
							let n;
							var r = U(t, !0);
							y(() => {
								n = J(t, 1, "btn svelte-1uaoa1p", null, n, { danger: N(A).remove !== "restore" }), B(r, W[N(A).remove]);
							}), D("click", t, ne), d(e, t);
						};
						s(r, (e) => {
							N(b) ? e(i) : e(o, -1);
						}), F(n), d(e, n);
					};
					s(me, (e) => {
						N(A).remove && N(O)?.want !== null && e(he);
					}), y(() => B(o, `${N(M).date ?? ""} · ${N(M).time ?? ""} · ${N(M).duration ?? ""} `)), d(e, r);
				};
				s(o, (e) => {
					N(p) ? e(m) : N(f) ? e(x, -1) : e(h, 1);
				}), d(e, i);
			},
			$$slots: { default: !0 }
		}), (e) => c = e, () => c);
	}
	return Z(re);
}
X(["change", "click"]);
// src/lib/ui/Details.svelte
var mr = j("<section><h2 class=\"svelte-1341oik\">Plan</h2> <!></section>"), hr = j("<button type=\"button\" class=\"manage press svelte-1341oik\">Manage</button>"), gr = j("<p class=\"caption none svelte-1341oik\">No shoes yet.</p>"), _r = j("<section><h2 class=\"svelte-1341oik\">Shoes <!></h2> <!></section> <!>", 1), vr = j("<!> <section><h2 class=\"svelte-1341oik\">Activity</h2> <!></section> <section><h2 class=\"svelte-1341oik\">Badges <small class=\"svelte-1341oik\"> </small></h2> <!></section> <section><h2 class=\"svelte-1341oik\">Progress</h2> <!></section> <!> <!> <!>", 1);
function yr(e, t) {
	let n = r();
	x(t, !0);
	let o = Q(t, "connect", 3, null), c = C(() => i(t.person.pbs)), l = C(() => ze(t.person, t.canEdit)), u = h(void 0), f = h(void 0), p = (e) => N(f).open(e);
	var m = vr(), g = a(m), v = (e) => {
		var r = mr(), i = $(r);
		$t(_(i, 2), { get plan() {
			return t.person.plan;
		} }), F(r), y(() => {
			q(r, "aria-labelledby", `${n}-plan`), q(i, "id", `${n}-plan`);
		}), d(e, r);
	};
	s(g, (e) => {
		t.person.plan && e(v);
	});
	var b = _(g, 2), S = $(b), w = _(S, 2);
	R(w, () => t.id, (e) => {
		Jt(e, {
			get person() {
				return t.id;
			},
			get items() {
				return t.person.feed;
			},
			get records() {
				return N(c);
			},
			onopen: p
		});
	}), F(b);
	var T = _(b, 2), E = $(T), O = _($(E)), k = U(O);
	F(E), Pt(_(E, 2), { get badges() {
		return t.person.badges;
	} }), F(T);
	var A = _(T, 2), j = $(A);
	En(_(j, 2), {
		get person() {
			return t.person;
		},
		onopen: p
	}), F(A);
	var M = _(A, 2);
	{
		let e = C(() => N(l) ? t.person.shoes : null);
		Ie(pr(M, {
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
				return N(e);
			},
			get runShoes() {
				return t.person.run_shoes;
			}
		}), (e) => G(f, e, !0), () => N(f));
	}
	var P = _(M, 2), I = (e) => {
		var r = _r(), i = a(r), o = $(i), c = _($(o)), f = (e) => {
			var t = hr();
			D("click", t, () => N(u).open()), d(e, t);
		};
		s(c, (e) => {
			N(l) && e(f);
		}), F(o);
		var p = _(o, 2), m = (e) => {
			An(e, { get shoes() {
				return t.person.shoes;
			} });
		}, h = (e) => {
			var t = gr();
			d(e, t);
		};
		s(p, (e) => {
			t.person.shoes.length ? e(m) : e(h, -1);
		}), F(i);
		var g = _(i, 2), v = (e) => {
			Ie(Vn(e, {
				get person() {
					return t.id;
				},
				get shoes() {
					return t.person.shoes;
				}
			}), (e) => G(u, e, !0), () => N(u));
		};
		s(g, (e) => {
			N(l) && e(v);
		}), y(() => {
			q(i, "aria-labelledby", `${n}-shoes`), q(o, "id", `${n}-shoes`);
		}), d(e, r);
	};
	s(P, (e) => {
		(t.person.shoes?.length || N(l)) && e(I);
	});
	var L = _(P, 2), ee = (e) => {
		Ot(e, {
			get info() {
				return o();
			},
			get now() {
				return t.now;
			},
			collapsed: !0
		});
	};
	s(L, (e) => {
		o() && e(ee);
	}), y(() => {
		q(b, "aria-labelledby", `${n}-feed`), q(S, "id", `${n}-feed`), q(T, "aria-labelledby", `${n}-badges`), q(E, "id", `${n}-badges`), B(k, `${t.person.badges.count ?? ""} unlocked`), q(A, "aria-labelledby", `${n}-pbs`), q(j, "id", `${n}-pbs`);
	}), d(e, m), Z();
}
X(["click"]);
// src/lib/ui/Goals.svelte
var br = j("<div class=\"stepper svelte-7wncvy\" role=\"group\"><span class=\"name svelte-7wncvy\" aria-hidden=\"true\"> </span> <button type=\"button\" class=\"pm press svelte-7wncvy\">−</button> <output aria-live=\"polite\" class=\"svelte-7wncvy\"> </output> <button type=\"button\" class=\"pm press svelte-7wncvy\">+</button></div>"), xr = j("<p class=\"msg\" role=\"status\"> </p>"), Sr = j("<section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\"> </h3> <!> <label class=\"year svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Birth year</span> <input type=\"number\" inputmode=\"numeric\" min=\"1900\" placeholder=\"1990\" class=\"svelte-7wncvy\"/></label> <p class=\"caption maxhr svelte-7wncvy\"> </p></section>"), Cr = j("<label><input class=\"sr svelte-7wncvy\" type=\"radio\"/> </label>"), wr = j("<button type=\"button\" class=\"btn save svelte-7wncvy\">Save</button>"), Tr = j("<p class=\"caption svelte-7wncvy\"> </p> <!> <section class=\"group glass svelte-7wncvy\"><h3 class=\"svelte-7wncvy\">Together</h3> <div class=\"seg svelte-7wncvy\" role=\"radiogroup\"></div> <p class=\"caption hint svelte-7wncvy\"> </p> <!> <label class=\"reward svelte-7wncvy\"><span class=\"name svelte-7wncvy\">Reward</span> <input type=\"text\" maxlength=\"60\" placeholder=\"Pizza night\" class=\"svelte-7wncvy\"/></label></section> <!>", 1), Er = j("<h2 class=\"title svelte-7wncvy\">Goals</h2> <!>", 1);
function Dr(e, n) {
	let i = r();
	x(n, !0);
	let o = [], c = (e, r = t, i = t, a = t) => {
		let o = C(() => {
			let [e, t, n] = Le[i()];
			return {
				lo: e,
				hi: t,
				step: n
			};
		});
		var s = br(), c = $(s), l = U(c, !0), u = _(c, 2), f = _(u, 2), p = U(f, !0), m = _(f, 2);
		F(s), y((e, t, c, d) => {
			q(s, "aria-label", a()), B(l, e), q(u, "aria-label", `Fewer ${t ?? ""}`), u.disabled = n.readOnly || r()[i()] <= N(o).lo, B(p, c), q(m, "aria-label", `More ${d ?? ""}`), m.disabled = n.readOnly || r()[i()] >= N(o).hi;
		}, [
			() => a().split(",")[0],
			() => b(a()),
			() => S(i(), r()[i()]),
			() => b(a())
		]), D("click", u, () => r()[i()] = be(i(), r()[i()] - N(o).step)), D("click", m, () => r()[i()] = be(i(), r()[i()] + N(o).step)), d(e, s);
	}, l = h(null), u = h(null), f = h(null), p = h(!1);
	Pe(() => {
		Ne("settings").then((e) => {
			G(l, e, !0), G(f, z(e, n.people), !0);
		}, (e) => G(u, e, !0));
	});
	let m = {
		runs: "Runs per week",
		workouts: "Workouts per week",
		active_days: "Active days per week",
		steps: "Steps for an active day"
	}, g = [
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
	], v = {
		together: "Workouts together per week",
		team: "Team points per week"
	}, b = (e) => e[0].toLowerCase() + e.slice(1), S = (e, t) => e === "steps" ? t.toLocaleString("en-US") : String(t);
	async function w() {
		G(p, !0);
		let e = await pt(ae(N(f)), n.people);
		G(p, !1), e && n.onsaved();
	}
	var T = Er(), E = _(a(T), 2), k = (e) => {
		var t = xr(), n = U(t, !0);
		y(() => B(n, N(u) ? N(u).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant" : "Loading…")), d(e, t);
	}, j = (e) => {
		var t = Tr(), r = a(t), u = U(r), h = _(r, 2);
		K(h, 16, () => Object.keys(N(f).people), (e) => e, (e, t) => {
			let r = C(() => n.people[t]?.name ?? t);
			var a = Sr(), o = $(a), s = U(o, !0), l = _(o, 2);
			K(l, 16, () => Ae, (e) => e, (e, n) => {
				c(e, () => N(f).people[t], () => n, () => `${m[n]}, ${N(r)}`);
			});
			var u = _(l, 2), p = _($(u), 2);
			Ke(p), F(u);
			var h = _(u, 2), g = U(h, !0);
			F(a), y((e, c) => {
				q(a, "aria-labelledby", `${i}-${t ?? ""}`), q(o, "id", `${i}-${t ?? ""}`), B(s, N(r)), q(p, "max", e), p.disabled = n.readOnly, B(g, c);
			}, [() => (/* @__PURE__ */ new Date()).getFullYear(), () => O(n.people[t]?.max_hr)]), ke(p, () => N(f).profiles[t].birth_year, (e) => N(f).profiles[t].birth_year = e), d(e, a);
		});
		var b = _(h, 2), x = $(b), S = _(x, 2);
		K(S, 21, () => g, (e) => e.mode, (e, t) => {
			var r = Cr();
			let a;
			var s = $(r);
			Ke(s);
			var c, l = _(s, 1, !0);
			F(r), y(() => {
				a = J(r, 1, "svelte-7wncvy", null, a, { on: N(f).couple.mode === N(t).mode }), q(s, "name", `${i}-mode`), s.disabled = n.readOnly, c !== (c = N(t).mode) && (s.value = (s.__value = c) ?? ""), B(l, N(t).label);
			}), me(o, [], s, () => (N(t).mode, N(f).couple.mode), (e) => N(f).couple.mode = e), d(e, r);
		}), F(S);
		var T = _(S, 2), E = U(T, !0), k = _(T, 2), j = (e) => {
			c(e, () => N(f).couple, () => N(f).couple.mode, () => v[N(f).couple.mode]);
		};
		s(k, (e) => {
			v[N(f).couple.mode] && e(j);
		});
		var M = _(k, 2), P = _($(M), 2);
		Ke(P), F(M), F(b);
		var I = _(b, 2), L = (e) => {
			var t = wr();
			y(() => t.disabled = N(p)), D("click", t, w), d(e, t);
		};
		s(I, (e) => {
			n.readOnly || e(L);
		}), y((e, t) => {
			B(u, `Applies from this week (week ${e ?? ""})`), q(b, "aria-labelledby", `${i}-couple`), q(x, "id", `${i}-couple`), q(S, "aria-labelledby", `${i}-couple`), B(E, t), P.disabled = n.readOnly;
		}, [() => A(N(l).week_start), () => g.find((e) => e.mode === N(f).couple.mode).hint]), ke(P, () => N(f).couple.reward, (e) => N(f).couple.reward = e), d(e, t);
	};
	s(E, (e) => {
		N(f) ? e(j, -1) : e(k);
	}), d(e, T), Z();
}
X(["click"]);
// src/lib/ui/Header.svelte
var Or = j("<button type=\"button\" class=\"back press svelte-16l0jix\"><span aria-hidden=\"true\" class=\"svelte-16l0jix\">‹</span> Back</button>"), kr = De("<svg class=\"brand svelte-16l0jix\" viewBox=\"0 0 100 100\" aria-hidden=\"true\"><defs><linearGradient id=\"hdr-brand\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#FFB340\"></stop><stop offset=\"1\" stop-color=\"#FF453A\"></stop></linearGradient></defs><rect width=\"100\" height=\"100\" rx=\"22.4\" fill=\"url(#hdr-brand)\"></rect><path d=\"M50 20 L80 45 V80 H20 V45 Z\" fill=\"#FFF\" stroke=\"#FFF\" stroke-width=\"6\" stroke-linejoin=\"round\"></path><path d=\"M50 42 C55 49 63 55 63 65.5 a13 13 0 0 1 -26 0 C37 58 42 53 45.5 49 C46 53.5 48 56.5 51 57.5 C49.5 52 49 47 50 42 Z\" fill=\"#FF6B2C\"></path></svg>"), Ar = j("<button type=\"button\" class=\"action press svelte-16l0jix\"> </button>"), jr = j("<header><div class=\"in svelte-16l0jix\"><!> <div class=\"row svelte-16l0jix\"><h1 class=\"svelte-16l0jix\"><!> </h1> <!></div> <p class=\"svelte-16l0jix\"> </p></div></header>");
function Mr(e, t) {
	let n = Q(t, "subtitle", 3, ""), r = Q(t, "actionLabel", 3, ""), i = Q(t, "brand", 3, !1), a = h(0);
	var o = jr();
	let c;
	var l = $(o), u = $(l), f = (e) => {
		var n = Or();
		D("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), d(e, n);
	};
	s(u, (e) => {
		t.onback && e(f);
	});
	var p = _(u, 2), m = $(p), g = $(m), v = (e) => {
		var t = kr();
		d(e, t);
	};
	s(g, (e) => {
		i() && e(v);
	});
	var b = _(g);
	F(m);
	var x = _(m, 2), S = (e) => {
		var n = Ar(), i = U(n, !0);
		y(() => B(i, r())), D("click", n, function(...e) {
			t.onaction?.apply(this, e);
		}), d(e, n);
	};
	s(x, (e) => {
		t.onaction && e(S);
	}), F(p);
	var C = _(p, 2), w = U(C, !0);
	F(l), F(o), y(() => {
		c = J(o, 1, "svelte-16l0jix", null, c, { scrolled: N(a) > 0 }), B(b, ` ${t.title ?? ""}`), B(w, n() || "\xA0");
	}), de("y", () => N(a), (e) => G(a, e, !0)), d(e, o);
}
X(["click"]);
// src/lib/motion.js
function Nr(e, { onFrame: t, onSettle: n, snap: r = {
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
var Pr = (e) => parseFloat(e) * (e.trim().endsWith("ms") ? 1 : 1e3), Fr = (e) => Pr(getComputedStyle(document.documentElement).getPropertyValue(e));
// src/lib/spring.js
function Ir({ value: e = 0, response: t = .35, damping: n = 1 } = {}) {
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
var Lr = De("<circle class=\"track svelte-1a5ed6t\"></circle><circle class=\"svelte-1a5ed6t\"></circle>", 1), Rr = De("<svg aria-hidden=\"true\" class=\"svelte-1a5ed6t\"></svg>");
function zr(e, t) {
	x(t, !0);
	let n = Q(t, "size", 3, 88), r = [
		"run",
		"gym",
		"bonus"
	], i = 1e3, o = h(H(Ue.reducedMotion ? i : 0)), s = C(() => n() * .11), c = C(() => t.fractions.map((e, t) => {
		let a = n() / 2 - N(s) / 2 - t * N(s) * 1.3, c = 2 * Math.PI * a;
		return {
			kind: r[t],
			r: a,
			c,
			len: c * e * N(o) / i
		};
	}));
	Pe(() => {
		if (N(o) === i) return;
		let e = Nr(Ir({
			value: 0,
			response: .35,
			damping: 1
		}), { onFrame: (e) => G(o, e, !0) });
		return e.to(i), e.stop;
	});
	var l = Rr();
	let u;
	K(l, 21, () => N(c), (e) => e.kind, (e, t) => {
		var r = Lr(), i = a(r);
		let o;
		var c = _(i);
		let l;
		y(() => {
			q(i, "cx", n() / 2), q(i, "cy", n() / 2), q(i, "r", N(t).r), q(i, "stroke-width", N(s)), o = Y(i, "", o, { stroke: `var(--${N(t).kind ?? ""})` }), q(c, "cx", n() / 2), q(c, "cy", n() / 2), q(c, "r", N(t).r), q(c, "stroke-width", N(s)), q(c, "stroke-dasharray", `${N(t).len ?? ""} ${N(t).c ?? ""}`), q(c, "opacity", +(N(t).len > .01)), q(c, "transform", `rotate(-90 ${n() / 2} ${n() / 2})`), l = Y(c, "", l, { stroke: `var(--${N(t).kind ?? ""})` });
		}), d(e, r);
	}), F(l), y(() => {
		q(l, "viewBox", `0 0 ${n() ?? ""} ${n() ?? ""}`), u = Y(l, "", u, { width: `${n() / 16}rem` });
	}), d(e, l), Z();
}
// src/lib/ui/PersonTile.svelte
var Br = j("<span class=\"star small svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Vr = j("<span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"sr\"> </span>", 1), Hr = j("<span class=\"streak svelte-1handop\"> </span>"), Ur = j("<span class=\"chev svelte-1handop\" aria-hidden=\"true\">›</span>"), Wr = j("<span class=\"star svelte-1handop\" aria-hidden=\"true\">⭐</span>"), Gr = j("<span class=\"stat svelte-1handop\"><span class=\"k svelte-1handop\"><i class=\"svelte-1handop\"></i> </span> <span class=\"v svelte-1handop\"> <small class=\"svelte-1handop\"> </small></span></span>"), Kr = j("<span class=\"steps svelte-1handop\"> </span>"), qr = j("<span class=\"body svelte-1handop\"><span class=\"rings svelte-1handop\"><!> <!></span> <span class=\"stats svelte-1handop\"></span></span> <!> <span class=\"xp svelte-1handop\"><span class=\"bar svelte-1handop\"><i class=\"svelte-1handop\"></i></span> <span class=\"caption svelte-1handop\"> </span></span>", 1), Jr = j("<button type=\"button\" class=\"hit svelte-1handop\"></button>"), Yr = j("<article><div><span class=\"head svelte-1handop\"><span class=\"avatar svelte-1handop\" aria-hidden=\"true\"> </span> <span class=\"who svelte-1handop\"><span class=\"name svelte-1handop\"> </span> <span class=\"lvl svelte-1handop\"> </span></span> <!> <!></span> <!></div> <!></article>");
function Xr(e, t) {
	x(t, !0);
	let r = Q(t, "index", 3, 0), i = Q(t, "compact", 3, !1), c = [
		["#30D158", "#0A84FF"],
		["#FF9F0A", "#FF375F"],
		["#64D2FF", "#5E5CE6"],
		["#FFD60A", "#FF9F0A"]
	], l = C(() => c[r() % c.length]), u = C(() => ge(N(l), 2)), f = C(() => N(u)[0]), p = C(() => N(u)[1]), m = C(() => n(t.person)), h = C(() => t.person.week), v = [
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
	], b = C(() => v.map((e, t) => ({
		...e,
		n: Ze(N(h))[t],
		of: o(N(h))[t]
	}))), S = C(() => ne(t.person.steps_today, N(h).goal.steps)), w = C(() => [
		`Level ${N(m).level}`,
		i() ? `🔥 ${t.person.streak} wk` : `${t.person.xp.toLocaleString()} XP`,
		N(h).paused && "Week paused",
		N(h).goal_pending && "New goals pending"
	].filter(Boolean).join(" · ")), T = C(() => `${t.person.name}, level ${N(m).level}. This week ${N(b).map((e) => `${e.label.toLowerCase()} ${e.n} of ${e.of}`).join(", ")}. ${N(h).goal_pending ? "New goals pending. " : ""}${N(h).bonus ? "Weekly bonus earned. " : ""}${N(S) ? N(S).replace("👟 ", "") + ". " : ""}Streak ${t.person.streak} weeks.`);
	var E = Yr();
	let O;
	var k = $(E), A = $(k), j = $(A);
	let M;
	var P = U(j, !0), I = _(j, 2), L = $(I), ee = U(L, !0), R = _(L, 2), z = U(R, !0);
	F(I);
	var V = _(I, 2), H = (e) => {
		var t = Vr(), n = a(t), r = $(n);
		{
			let e = C(() => g(N(h)));
			zr(r, {
				get fractions() {
					return N(e);
				},
				size: 44
			});
		}
		var i = _(r, 2), o = (e) => {
			var t = Br();
			d(e, t);
		};
		s(i, (e) => {
			N(h).bonus && e(o);
		}), F(n);
		var c = _(n, 2), l = U(c, !0);
		y(() => B(l, N(T))), d(e, t);
	}, te = (e) => {
		var n = Hr(), r = U(n);
		y(() => B(r, `🔥 ${t.person.streak ?? ""} wk`)), d(e, n);
	};
	s(V, (e) => {
		i() ? e(H) : e(te, -1);
	});
	var W = _(V, 2), G = (e) => {
		var t = Ur();
		d(e, t);
	};
	s(W, (e) => {
		t.onopen && e(G);
	}), F(A);
	var re = _(A, 2), ie = (e) => {
		var t = qr(), n = a(t), r = $(n), i = $(r);
		{
			let e = C(() => g(N(h))), t = C(() => Ue.wide ? 112 : 88);
			zr(i, {
				get fractions() {
					return N(e);
				},
				get size() {
					return N(t);
				}
			});
		}
		var o = _(i, 2), c = (e) => {
			var t = Wr();
			d(e, t);
		};
		s(o, (e) => {
			N(h).bonus && e(c);
		}), F(r);
		var l = _(r, 2);
		K(l, 21, () => N(b), (e) => e.kind, (e, t) => {
			var n = Gr(), r = $(n), i = $(r);
			let a;
			var o = _(i, 1, !0);
			F(r);
			var s = _(r, 2), c = $(s, !0), l = _(c), u = U(l);
			F(s), F(n), y(() => {
				a = Y(i, "", a, { background: `var(--${N(t).kind ?? ""})` }), B(o, N(t).label), B(c, N(t).n), B(u, `/${N(t).of ?? ""}`);
			}), d(e, n);
		}), F(l), F(n);
		var u = _(n, 2), f = (e) => {
			var t = Kr(), n = U(t, !0);
			y(() => B(n, N(S))), d(e, t);
		};
		s(u, (e) => {
			N(S) && e(f);
		});
		var p = _(u, 2), v = $(p), x = $(v);
		let w;
		F(v);
		var T = _(v, 2), E = U(T);
		F(p), y((e, t) => {
			w = Y(x, "", w, { width: `${N(m).frac * 100}%` }), B(E, `${e ?? ""} of ${t ?? ""} XP to level ${N(m).level + 1}`);
		}, [() => N(m).into.toLocaleString(), () => N(m).span.toLocaleString()]), d(e, t);
	};
	s(re, (e) => {
		i() || e(ie);
	}), F(k);
	var ae = _(k, 2), oe = (e) => {
		var n = Jr();
		y(() => q(n, "aria-label", N(T))), D("click", n, function(...e) {
			t.onopen?.apply(this, e);
		}), d(e, n);
	};
	s(ae, (e) => {
		t.onopen && e(oe);
	}), F(E), y((e) => {
		O = J(E, 1, "tile glass svelte-1handop", null, O, {
			compact: i(),
			opens: t.onopen
		}), q(k, "aria-hidden", t.onopen ? "true" : void 0), M = Y(j, "", M, {
			"--a1": N(f),
			"--a2": N(p)
		}), B(P, e), B(ee, t.person.name), B(z, N(w));
	}, [() => t.person.name.slice(0, 1)]), d(e, E), Z();
}
X(["click"]);
// src/lib/ui/Sheet.svelte
var Zr = j("<button type=\"button\" class=\"back press svelte-185xwm9\"><span aria-hidden=\"true\" class=\"svelte-185xwm9\">‹</span> Back</button>"), Qr = j("<div aria-hidden=\"true\"></div> <div role=\"dialog\" aria-modal=\"true\"><div class=\"grab svelte-185xwm9\"><span class=\"handle svelte-185xwm9\" aria-hidden=\"true\"></span> <div class=\"bar svelte-185xwm9\"><!> <button type=\"button\" class=\"close press svelte-185xwm9\" aria-label=\"Close\">✕</button></div></div> <div class=\"body svelte-185xwm9\"><!></div></div>", 1);
function $r(e, t) {
	x(t, !0);
	let n = Q(t, "from", 3, null), r = 1e3, i = Ue.reducedMotion, o = h(H(i ? r : 0)), c = h(0), l = h(1), u = h(!1), f = h("50% 100%"), p, m, g = !1, v = null, b = C(() => i ? +N(u) : Math.min(1, N(o) / 500)), S = C(() => i ? 1 : .5 + .5 * N(o) / r), w = () => {
		g && (N(o) === 0 || N(c) >= N(l)) && (g = !1, t.onclose());
	};
	function T(e) {
		let t, n;
		return {
			stop: () => n?.stop(),
			to(r, i, { velocity: a = n?.running ? t.velocity : 0, damping: o = 1, response: s = .35 } = {}) {
				n?.stop(), t = Ir({
					value: r,
					damping: o,
					response: s
				}), n = Nr(t, {
					onFrame: e,
					onSettle: w
				}), n.to(i, a);
			}
		};
	}
	let E = T((e) => G(o, e, !0)), O = T((e) => G(c, e, !0));
	function A() {
		g || v || (g = !0, i ? (G(u, !1), setTimeout(t.onclose, Fr("--fade"))) : E.to(N(o), 0, { response: .3 }));
	}
	function j(e) {
		e.button > 0 || e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), E.stop(), O.stop(), g = !1, v = {
			from: N(c),
			start: e.clientY,
			samples: [{
				t: e.timeStamp,
				x: e.clientY
			}]
		});
	}
	function M(e) {
		if (!v) return;
		let t = v.from + e.clientY - v.start;
		G(c, t < 0 ? -rn(-t, N(l)) : t, !0), v.samples.push({
			t: e.timeStamp,
			x: e.clientY
		}), v.samples.length > 8 && v.samples.shift();
	}
	function P(e) {
		if (!v) return;
		let t = e.type === "pointercancel" ? [] : [{
			t: e.timeStamp,
			x: e.clientY
		}], n = nn([...v.samples, ...t].filter((t) => e.timeStamp - t.t <= 100));
		v = null, tn(N(c), n, N(l)) ? i ? A() : (g = !0, O.to(N(c), N(l), {
			velocity: n,
			response: .3
		})) : i ? G(c, 0) : (O.to(N(c), 0, {
			velocity: n,
			damping: .8,
			response: .3
		}), N(o) < r && E.to(N(o), r));
	}
	Pe(() => {
		if (n()) {
			let e = n().getBoundingClientRect();
			G(f, `${e.left + e.width / 2 - p.offsetLeft}px ${e.top + e.height / 2 - p.offsetTop}px`);
		}
		m.focus({ preventScroll: !0 });
		let e = document.documentElement;
		return e.style.overflow = "hidden", i ? requestAnimationFrame(() => G(u, !0)) : E.to(0, r), () => {
			E.stop(), O.stop(), e.style.overflow = "";
		};
	});
	var I = { close: A }, ee = Qr();
	k("keydown", L, (e) => e.key === "Escape" && !document.querySelector("dialog[open]") && A());
	var R = a(ee);
	let z, B;
	var V = _(R, 2);
	let te, U;
	var W = $(V), ne = _($(W), 2), re = $(ne), ie = (e) => {
		var n = Zr();
		D("click", n, function(...e) {
			t.onback?.apply(this, e);
		}), d(e, n);
	};
	s(re, (e) => {
		t.onback && e(ie);
	});
	var ae = _(re, 2);
	Ie(ae, (e) => m = e, () => m), F(ne), F(W);
	var oe = _(W, 2), se = $(oe);
	return et(se, () => t.children), F(oe), F(V), Ie(V, (e) => p = e, () => p), y((e) => {
		z = J(R, 1, "scrim svelte-185xwm9", null, z, { fade: i }), B = Y(R, "", B, { opacity: e }), te = J(V, 1, "sheet svelte-185xwm9", null, te, { fade: i }), q(V, "aria-label", t.label), U = Y(V, "", U, {
			opacity: N(b),
			transform: `translate3d(0, ${N(c) ?? ""}px, 0) scale(${N(S) ?? ""})`,
			"transform-origin": N(f)
		});
	}, [() => N(b) * Math.min(1, Math.max(0, 1 - N(c) / N(l)))]), D("click", R, A), D("pointerdown", W, j), D("pointermove", W, M), D("pointerup", W, P), k("pointercancel", W, P), D("click", ae, A), He(V, "offsetHeight", (e) => G(l, e)), d(e, ee), Z(I);
}
X([
	"click",
	"pointerdown",
	"pointermove",
	"pointerup"
]);
// src/lib/ui/Status.svelte
var ei = j("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Scoring config has an error.</b> </p>"), ti = j("<p class=\"warn card svelte-9nj5u4\" role=\"alert\"><b>Goal settings have an error.</b> </p>"), ni = j("<p class=\"caption stale svelte-9nj5u4\"> </p>"), ri = j("<!> <!> <!>", 1);
function ii(e, t) {
	x(t, !0);
	let n = C(() => t.scoredAt ? ie(t.scoredAt, t.now) : null);
	var r = ri(), i = a(r), o = (e) => {
		var n = ei(), r = _($(n));
		F(n), y(() => B(r, ` fitbridge keeps the last valid one. ${t.configError ?? ""}`)), d(e, n);
	};
	s(i, (e) => {
		t.configError && e(o);
	});
	var c = _(i, 2), l = (e) => {
		var n = ti(), r = _($(n));
		F(n), y(() => B(r, ` fitbridge keeps the last valid ones. ${t.settingsError ?? ""}`)), d(e, n);
	};
	s(c, (e) => {
		t.settingsError && e(l);
	});
	var u = _(c, 2), f = (e) => {
		var t = ni(), r = U(t, !0);
		y(() => B(r, N(n))), d(e, t);
	};
	s(u, (e) => {
		N(n) && e(f);
	}), d(e, r), Z();
}
// node_modules/svelte/src/internal/flags/legacy.js
re();
// src/lib/ui/Toast.svelte
var ai = j("<button type=\"button\" class=\"press svelte-1fk2ial\">Undo</button>"), oi = j("<span> </span> <!>", 1), si = j("<div role=\"status\" aria-live=\"polite\"><!></div>");
function ci(e, t) {
	x(t, !1);
	function n() {
		let e = at.undo;
		Object.assign(at, {
			on: !1,
			undo: null
		}), e();
	}
	we();
	var r = si();
	let i;
	var o = $(r), c = (e) => {
		var t = oi(), r = a(t), i = U(r, !0), o = _(r, 2), c = (e) => {
			var t = ai();
			D("click", t, n), d(e, t);
		};
		s(o, (e) => {
			at.undo && e(c);
		}), y(() => B(i, at.text)), d(e, t);
	};
	s(o, (e) => {
		at.on && e(c);
	}), F(r), y(() => i = J(r, 1, "toast svelte-1fk2ial", null, i, { on: at.on })), d(e, r), Z();
}
X(["click"]);
// src/lib/ui/Together.svelte
var li = j("<p class=\"progress svelte-1tya3no\"> </p>"), ui = j("<p> </p>"), di = j("<div><dt class=\"svelte-1tya3no\"> </dt><dd class=\"svelte-1tya3no\"> <small class=\"svelte-1tya3no\"> </small></dd></div>"), fi = j("<section class=\"together glass svelte-1tya3no\" aria-labelledby=\"together-title\"><h2 id=\"together-title\" class=\"svelte-1tya3no\">Together</h2> <!> <!> <dl class=\"svelte-1tya3no\"></dl></section>");
function pi(e, t) {
	x(t, !0);
	let n = C(() => t.group.week ? P(t.group.week, t.people) : ""), r = C(() => t.group.week ? te(t.group.week) : null), i = C(() => [
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
	var a = fi(), o = _($(a), 2), c = (e) => {
		var t = li(), r = U(t, !0);
		y(() => B(r, N(n))), d(e, t);
	};
	s(o, (e) => {
		N(n) && e(c);
	});
	var l = _(o, 2), u = (e) => {
		var n = ui();
		let i;
		var a = U(n, !0);
		y(() => {
			i = J(n, 1, "reward svelte-1tya3no", null, i, { met: t.group.week.met }), B(a, N(r));
		}), d(e, n);
	};
	s(l, (e) => {
		N(r) && e(u);
	});
	var f = _(l, 2);
	K(f, 21, () => N(i), (e) => e.k, (e, t) => {
		var n = di(), r = $(n), i = U(r, !0), a = _(r), o = $(a, !0), s = _(o), c = U(s, !0);
		F(a), F(n), y(() => {
			B(i, N(t).k), B(o, N(t).v), B(c, N(t).unit);
		}), d(e, n);
	}), F(f), F(a), d(e, a), Z();
}
// src/App.svelte
var mi = j("<p class=\"msg svelte-1n46o8q\" role=\"status\"> </p>"), hi = j("<div class=\"tiles svelte-1n46o8q\" aria-hidden=\"true\"><div class=\"tile skeleton glass svelte-1n46o8q\"></div> <div class=\"tile skeleton glass svelte-1n46o8q\"></div></div> <!>", 1), gi = j("<div class=\"tiles compact svelte-1n46o8q\"></div>"), _i = j("<!> <!>", 1), vi = j("<div class=\"tiles svelte-1n46o8q\"></div>"), yi = j("<!> <!> <!> <!> <!>", 1), bi = j("<div><!> <main class=\"svelte-1n46o8q\"><!></main></div> <!> <!>", 1);
function xi(e, t) {
	x(t, !0);
	let n = (() => {
		try {
			return window.parent.location.search === void 0 ? window : window.parent;
		} catch {
			return window;
		}
	})(), r = new URLSearchParams(n.location.search), i = r.get("person"), o = /^\/(?!\/)/.test(r.get("back") ?? "") ? r.get("back") : null, c = o && (() => {
		n.history.pushState(null, "", o), n.dispatchEvent(new Event("location-changed"));
	}), l = h(null), u = (e) => (t) => G(l, {
		id: e,
		from: t.currentTarget
	}, !0), f = h(null), m = h(void 0);
	async function g() {
		let e = N(l)?.from ?? N(f)?.from;
		G(l, G(f, null), !0), await p(), e?.focus({ preventScroll: !0 });
	}
	let v = h(null), b = h(null), S = h(H(/* @__PURE__ */ new Date())), w = H({}), E;
	async function D() {
		if (clearTimeout(E), !document.hidden) {
			try {
				G(v, await Ne("scores"), !0), G(b, null), ft(N(v).people), i && Object.hasOwn(N(v).people, i) && i !== Ee(N(v).viewer, N(v).people).self && G(l, {
					id: i,
					from: null
				}, !0), i = null;
			} catch (e) {
				G(b, e, !0);
			}
			G(S, /* @__PURE__ */ new Date(), !0), N(v) && O(N(v)), clearTimeout(E), E = setTimeout(D, N(v) ? 6e4 : 3e4);
		}
	}
	let O = (e) => ce(e.viewer, e.people).forEach((e) => Ne(`connect?person=${encodeURIComponent(e)}`).then((t) => {
		w[e] = t;
	}, () => {}));
	T(() => {
		D();
		let e = () => document.hidden || D();
		return document.addEventListener("visibilitychange", e), () => {
			clearTimeout(E), document.removeEventListener("visibilitychange", e);
		};
	}), T(() => {
		st.n && D();
	});
	let k = C(() => We(N(v)?.people ?? {}, ot.entry)), A = C(() => Object.keys(N(k))), j = C(() => Ee(N(v)?.viewer ?? {}, N(k))), M = C(() => N(k)[N(j).self ?? N(A)[0]]?.week), P = (e) => !!N(v)?.viewer?.can_edit?.includes(e), I = C(() => !!N(j).self && qe(N(k)[N(j).self], w[N(j).self])), L = C(() => !!N(l) && Object.hasOwn(N(k), N(l).id) || !!N(f) && !!N(v));
	var ee = bi(), R = a(ee), z = $(R);
	{
		let e = C(() => N(M) ? _e(N(M)) : ""), t = C(() => N(v) ? (e) => G(f, { from: e.currentTarget }, !0) : void 0);
		Mr(z, {
			title: "Training",
			brand: !0,
			get subtitle() {
				return N(e);
			},
			get onback() {
				return c;
			},
			actionLabel: "Goals",
			get onaction() {
				return N(t);
			}
		});
	}
	var V = _(z, 2), te = $(V), W = (e) => {
		var t = hi(), n = _(a(t), 2), r = (e) => {
			var t = mi(), n = U(t, !0);
			y(() => B(n, N(b).status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant")), d(e, t);
		};
		s(n, (e) => {
			N(b) && e(r);
		}), d(e, t);
	}, ne = (e) => {
		var t = yi(), n = a(t);
		ii(n, {
			get scoredAt() {
				return N(v).scored_at;
			},
			get configError() {
				return N(v).config_error;
			},
			get settingsError() {
				return N(v).settings_error;
			},
			get now() {
				return N(S);
			}
		});
		var r = _(n, 2), i = (e) => {
			Ot(e, {
				get info() {
					return w[N(j).self];
				},
				get now() {
					return N(S);
				}
			});
		};
		s(r, (e) => {
			N(I) && e(i);
		});
		var o = _(r, 2), c = (e) => {
			var t = _i(), n = a(t), r = (e) => {
				var t = gi();
				K(t, 20, () => N(j).others, (e) => e, (e, t) => {
					{
						let n = C(() => N(A).indexOf(t)), r = C(() => u(t));
						Xr(e, {
							get person() {
								return N(k)[t];
							},
							get index() {
								return N(n);
							},
							compact: !0,
							get onopen() {
								return N(r);
							}
						});
					}
				}), F(t), d(e, t);
			};
			s(n, (e) => {
				N(j).others.length && e(r);
			});
			var i = _(n, 2);
			{
				let e = C(() => N(A).indexOf(N(j).self));
				Xr(i, {
					get person() {
						return N(k)[N(j).self];
					},
					get index() {
						return N(e);
					}
				});
			}
			d(e, t);
		}, l = (e) => {
			var t = vi();
			K(t, 20, () => N(j).others, (e) => e, (e, t) => {
				{
					let n = C(() => N(A).indexOf(t)), r = C(() => u(t));
					Xr(e, {
						get person() {
							return N(k)[t];
						},
						get index() {
							return N(n);
						},
						get onopen() {
							return N(r);
						}
					});
				}
			}), F(t), d(e, t);
		};
		s(o, (e) => {
			N(j).self ? e(c) : e(l, -1);
		});
		var f = _(o, 2), p = (e) => {
			pi(e, {
				get group() {
					return N(v).group;
				},
				get people() {
					return N(k);
				}
			});
		};
		s(f, (e) => {
			N(v).group && e(p);
		});
		var m = _(f, 2), h = (e) => {
			{
				let t = C(() => P(N(j).self)), n = C(() => N(I) ? null : w[N(j).self]);
				yr(e, {
					get id() {
						return N(j).self;
					},
					get person() {
						return N(k)[N(j).self];
					},
					get canEdit() {
						return N(t);
					},
					get viewer() {
						return N(v).viewer;
					},
					get connect() {
						return N(n);
					},
					get now() {
						return N(S);
					}
				});
			}
		};
		s(m, (e) => {
			N(j).self && e(h);
		}), d(e, t);
	};
	s(te, (e) => {
		N(v) ? e(ne, -1) : e(W);
	}), F(V), F(R);
	var re = _(R, 2), ie = (e) => {
		Ie($r(e, {
			label: "Goals",
			get from() {
				return N(f).from;
			},
			onclose: g,
			get onback() {
				return c;
			},
			children: (e, t) => {
				{
					let t = C(() => !N(j).self);
					Dr(e, {
						get people() {
							return N(v).people;
						},
						get readOnly() {
							return N(t);
						},
						onsaved: () => N(m)?.close()
					});
				}
			},
			$$slots: { default: !0 }
		}), (e) => G(m, e, !0), () => N(m));
	}, ae = (e) => {
		$r(e, {
			get label() {
				return `${N(k)[N(l).id].name ?? ""}'s details`;
			},
			get from() {
				return N(l).from;
			},
			onclose: g,
			get onback() {
				return c;
			},
			children: (e, t) => {
				var n = _i(), r = a(n);
				{
					let e = C(() => N(A).indexOf(N(l).id));
					Xr(r, {
						get person() {
							return N(k)[N(l).id];
						},
						get index() {
							return N(e);
						}
					});
				}
				var i = _(r, 2);
				{
					let e = C(() => P(N(l).id));
					yr(i, {
						get id() {
							return N(l).id;
						},
						get person() {
							return N(k)[N(l).id];
						},
						get canEdit() {
							return N(e);
						},
						get viewer() {
							return N(v).viewer;
						},
						get connect() {
							return w[N(l).id];
						},
						get now() {
							return N(S);
						}
					});
				}
				d(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	s(re, (e) => {
		N(f) && N(v) ? e(ie) : N(L) && e(ae, 1);
	}), ci(_(re, 2), {}), y(() => R.inert = N(L)), d(e, ee), Z();
}
// src/main.js
var Si = (e) => Xe(xi, { target: e }), Ci = () => new Promise((e) => {
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
		Ce(e);
		let t = e.themes?.darkMode ?? matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.dataset.theme = t ? "dark" : "light", !this.#e && (this.#e = !0, this.style.display = "block", this.style.height = "100%", Ci().then(() => {
			let e = this.appendChild(document.createElement("div"));
			e.id = "app", Si(e);
		}));
	}
});
