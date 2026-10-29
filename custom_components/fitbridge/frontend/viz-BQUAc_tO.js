import { At as e, It as t, Kt as n, Ot as r, Rt as i, Xt as a, Yt as o, _t as s, at as c, ct as l, pt as u, qt as d, r as f, rn as p, t as m, zt as h } from "./shared-BUd3tpul.js";
// \0rolldown/runtime.js
var g = Object.create, _ = Object.defineProperty, v = Object.getOwnPropertyDescriptor, y = Object.getOwnPropertyNames, b = Object.getPrototypeOf, x = Object.prototype.hasOwnProperty, S = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), C = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = y(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !x.call(e, s) && s !== n && _(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = v(t, s)) || r.enumerable
	});
	return e;
}, w = (e, t, n) => (n = e == null ? {} : g(b(e)), C(t || !e || !e.__esModule || !x.call(e, "default") ? _(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), T = ".leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;top:0;left:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:0 0}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{-webkit-transform-origin:0 0;width:1600px;height:1600px}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{width:auto;padding:0;max-width:none!important;max-height:none!important}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:#33b5e566}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{box-sizing:border-box;z-index:800;width:0;height:0}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{z-index:800;pointer-events:visiblePainted;pointer-events:auto;position:relative}.leaflet-top,.leaflet-bottom{z-index:1000;pointer-events:none;position:absolute}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{outline-offset:1px;background:#ddd}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{background:#ffffff80;border:2px dotted #38f}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:.75rem;line-height:1.5}.leaflet-bar{border-radius:4px;box-shadow:0 1px 5px #000000a6}.leaflet-bar a{text-align:center;color:#000;background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;text-decoration:none;display:block}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom:none;border-bottom-right-radius:4px;border-bottom-left-radius:4px}.leaflet-bar a.leaflet-disabled{cursor:default;color:#bbb;background-color:#f4f4f4}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-right-radius:2px;border-bottom-left-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{text-indent:1px;font:700 18px Lucida Console,Monaco,monospace}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{background:#fff;border-radius:5px;box-shadow:0 1px 5px #0006}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{color:#333;background:#fff;padding:6px 10px 6px 6px}.leaflet-control-layers-scrollbar{padding-right:5px;overflow:hidden scroll}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{font-size:1.08333em;display:block}.leaflet-control-layers-separator{border-top:1px solid #ddd;height:0;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{color:#333;padding:0 5px;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{width:1em;height:.6669em;vertical-align:baseline!important;display:inline!important}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{white-space:nowrap;box-sizing:border-box;text-shadow:1px 1px #fff;background:#fffc;border:2px solid #777;border-top:none;padding:2px 5px 1px;line-height:1.1}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{background-clip:padding-box;border:2px solid #0003}.leaflet-popup{text-align:center;margin-bottom:20px;position:absolute}.leaflet-popup-content-wrapper{text-align:left;border-radius:12px;padding:1px}.leaflet-popup-content{min-height:1px;margin:13px 24px 13px 20px;font-size:1.08333em;line-height:1.3}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{pointer-events:none;width:40px;height:20px;margin-top:-1px;margin-left:-20px;position:absolute;left:50%;overflow:hidden}.leaflet-popup-tip{pointer-events:auto;width:17px;height:17px;margin:-10px auto 0;padding:1px;transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{color:#333;background:#fff;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{text-align:center;color:#757575;background:0 0;border:none;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;text-decoration:none;position:absolute;top:0;right:0}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{-ms-filter:\"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";width:24px;filter:progid:DXImageTransform.Microsoft.Matrix(M11=.707107, M12=.707107, M21=-.707107, M22=.707107);margin:0 auto}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{color:#222;white-space:nowrap;-webkit-user-select:none;user-select:none;pointer-events:none;background-color:#fff;border:1px solid #fff;border-radius:3px;padding:6px;position:absolute;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{pointer-events:none;content:\"\";background:0 0;border:6px solid #0000;position:absolute}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{margin-left:-6px;left:50%}.leaflet-tooltip-top:before{border-top-color:#fff;margin-bottom:-12px;bottom:0}.leaflet-tooltip-bottom:before{border-bottom-color:#fff;margin-top:-12px;margin-left:-6px;top:0}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{margin-top:-6px;top:50%}.leaflet-tooltip-left:before{border-left-color:#fff;margin-right:-12px;right:0}.leaflet-tooltip-right:before{border-right-color:#fff;margin-left:-12px;left:0}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}", E = ".uplot,.uplot *,.uplot :before,.uplot :after{box-sizing:border-box}.uplot{width:min-content;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{-webkit-user-select:none;user-select:none;position:relative}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{width:100%;height:100%;display:block;position:relative}.u-axis{position:absolute}.u-legend{text-align:center;margin:auto;font-size:14px}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:\":\";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{pointer-events:none;background:#00000012;position:absolute}.u-cursor-x,.u-cursor-y{pointer-events:none;will-change:transform;position:absolute;top:0;left:0}.u-hz .u-cursor-x,.u-vt .u-cursor-y{border-right:1px dashed #607d8b;height:100%}.u-hz .u-cursor-y,.u-vt .u-cursor-x{border-bottom:1px dashed #607d8b;width:100%}.u-cursor-pt{pointer-events:none;will-change:transform;border:0 solid;border-radius:50%;position:absolute;top:0;left:0;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}", D = /* @__PURE__ */ w((/* @__PURE__ */ S(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? r(e) : typeof define == "function" && define.amd ? define(["exports"], r) : (n = typeof globalThis < "u" ? globalThis : n || self, r(n.leaflet = {}));
	})(n, (function(e) {
		var t = "1.9.4";
		function n(e) {
			for (var t, n = 1, r = arguments.length, i; n < r; n++) for (t in i = arguments[n], i) e[t] = i[t];
			return e;
		}
		var r = Object.create || (function() {
			function e() {}
			return function(t) {
				return e.prototype = t, new e();
			};
		})();
		function i(e, t) {
			var n = Array.prototype.slice;
			if (e.bind) return e.bind.apply(e, n.call(arguments, 1));
			var r = n.call(arguments, 2);
			return function() {
				return e.apply(t, r.length ? r.concat(n.call(arguments)) : arguments);
			};
		}
		var a = 0;
		function o(e) {
			return "_leaflet_id" in e || (e._leaflet_id = ++a), e._leaflet_id;
		}
		function s(e, t, n) {
			var r, i, a, o = function() {
				r = !1, i &&= (a.apply(n, i), !1);
			};
			return a = function() {
				r ? i = arguments : (e.apply(n, arguments), setTimeout(o, t), r = !0);
			}, a;
		}
		function c(e, t, n) {
			var r = t[1], i = t[0], a = r - i;
			return e === r && n ? e : ((e - i) % a + a) % a + i;
		}
		function l() {
			return !1;
		}
		function u(e, t) {
			if (t === !1) return e;
			var n = 10 ** (t === void 0 ? 6 : t);
			return Math.round(e * n) / n;
		}
		function d(e) {
			return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
		}
		function f(e) {
			return d(e).split(/\s+/);
		}
		function p(e, t) {
			for (var n in Object.prototype.hasOwnProperty.call(e, "options") || (e.options = e.options ? r(e.options) : {}), t) e.options[n] = t[n];
			return e.options;
		}
		function m(e, t, n) {
			var r = [];
			for (var i in e) r.push(encodeURIComponent(n ? i.toUpperCase() : i) + "=" + encodeURIComponent(e[i]));
			return (!t || t.indexOf("?") === -1 ? "?" : "&") + r.join("&");
		}
		var h = /\{ *([\w_ -]+) *\}/g;
		function g(e, t) {
			return e.replace(h, function(e, n) {
				var r = t[n];
				if (r === void 0) throw Error("No value provided for variable " + e);
				return typeof r == "function" && (r = r(t)), r;
			});
		}
		var _ = Array.isArray || function(e) {
			return Object.prototype.toString.call(e) === "[object Array]";
		};
		function v(e, t) {
			for (var n = 0; n < e.length; n++) if (e[n] === t) return n;
			return -1;
		}
		var y = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
		function b(e) {
			return window["webkit" + e] || window["moz" + e] || window["ms" + e];
		}
		var x = 0;
		function S(e) {
			var t = +/* @__PURE__ */ new Date(), n = Math.max(0, 16 - (t - x));
			return x = t + n, window.setTimeout(e, n);
		}
		var C = window.requestAnimationFrame || b("RequestAnimationFrame") || S, w = window.cancelAnimationFrame || b("CancelAnimationFrame") || b("CancelRequestAnimationFrame") || function(e) {
			window.clearTimeout(e);
		};
		function T(e, t, n) {
			if (n && C === S) e.call(t);
			else return C.call(window, i(e, t));
		}
		function E(e) {
			e && w.call(window, e);
		}
		var D = {
			__proto__: null,
			extend: n,
			create: r,
			bind: i,
			get lastId() {
				return a;
			},
			stamp: o,
			throttle: s,
			wrapNum: c,
			falseFn: l,
			formatNum: u,
			trim: d,
			splitWords: f,
			setOptions: p,
			getParamString: m,
			template: g,
			isArray: _,
			indexOf: v,
			emptyImageUrl: y,
			requestFn: C,
			cancelFn: w,
			requestAnimFrame: T,
			cancelAnimFrame: E
		};
		function O() {}
		O.extend = function(e) {
			var t = function() {
				p(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
			}, i = t.__super__ = this.prototype, a = r(i);
			for (var o in a.constructor = t, t.prototype = a, this) Object.prototype.hasOwnProperty.call(this, o) && o !== "prototype" && o !== "__super__" && (t[o] = this[o]);
			return e.statics && n(t, e.statics), e.includes && (ee(e.includes), n.apply(null, [a].concat(e.includes))), n(a, e), delete a.statics, delete a.includes, a.options && (a.options = i.options ? r(i.options) : {}, n(a.options, e.options)), a._initHooks = [], a.callInitHooks = function() {
				if (!this._initHooksCalled) {
					i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
					for (var e = 0, t = a._initHooks.length; e < t; e++) a._initHooks[e].call(this);
				}
			}, t;
		}, O.include = function(e) {
			var t = this.prototype.options;
			return n(this.prototype, e), e.options && (this.prototype.options = t, this.mergeOptions(e.options)), this;
		}, O.mergeOptions = function(e) {
			return n(this.prototype.options, e), this;
		}, O.addInitHook = function(e) {
			var t = Array.prototype.slice.call(arguments, 1), n = typeof e == "function" ? e : function() {
				this[e].apply(this, t);
			};
			return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n), this;
		};
		function ee(e) {
			if (typeof L < "u" && L && L.Mixin) {
				e = _(e) ? e : [e];
				for (var t = 0; t < e.length; t++) e[t] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (/* @__PURE__ */ Error()).stack);
			}
		}
		var k = {
			on: function(e, t, n) {
				if (typeof e == "object") for (var r in e) this._on(r, e[r], t);
				else {
					e = f(e);
					for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n);
				}
				return this;
			},
			off: function(e, t, n) {
				if (!arguments.length) delete this._events;
				else if (typeof e == "object") for (var r in e) this._off(r, e[r], t);
				else {
					e = f(e);
					for (var i = arguments.length === 1, a = 0, o = e.length; a < o; a++) i ? this._off(e[a]) : this._off(e[a], t, n);
				}
				return this;
			},
			_on: function(e, t, n, r) {
				if (typeof t != "function") console.warn("wrong listener type: " + typeof t);
				else if (this._listens(e, t, n) === !1) {
					n === this && (n = void 0);
					var i = {
						fn: t,
						ctx: n
					};
					r && (i.once = !0), this._events = this._events || {}, this._events[e] = this._events[e] || [], this._events[e].push(i);
				}
			},
			_off: function(e, t, n) {
				var r, i, a;
				if (this._events && (r = this._events[e], r)) {
					if (arguments.length === 1) {
						if (this._firingCount) for (i = 0, a = r.length; i < a; i++) r[i].fn = l;
						delete this._events[e];
					} else if (typeof t != "function") console.warn("wrong listener type: " + typeof t);
					else {
						var o = this._listens(e, t, n);
						if (o !== !1) {
							var s = r[o];
							this._firingCount && (s.fn = l, this._events[e] = r = r.slice()), r.splice(o, 1);
						}
					}
				}
			},
			fire: function(e, t, r) {
				if (!this.listens(e, r)) return this;
				var i = n({}, t, {
					type: e,
					target: this,
					sourceTarget: t && t.sourceTarget || this
				});
				if (this._events) {
					var a = this._events[e];
					if (a) {
						this._firingCount = this._firingCount + 1 || 1;
						for (var o = 0, s = a.length; o < s; o++) {
							var c = a[o], l = c.fn;
							c.once && this.off(e, l, c.ctx), l.call(c.ctx || this, i);
						}
						this._firingCount--;
					}
				}
				return r && this._propagateEvent(i), this;
			},
			listens: function(e, t, n, r) {
				typeof e != "string" && console.warn("\"string\" type argument expected");
				var i = t;
				typeof t != "function" && (r = !!t, i = void 0, n = void 0);
				var a = this._events && this._events[e];
				if (a && a.length && this._listens(e, i, n) !== !1) return !0;
				if (r) {
					for (var o in this._eventParents) if (this._eventParents[o].listens(e, t, n, r)) return !0;
				}
				return !1;
			},
			_listens: function(e, t, n) {
				if (!this._events) return !1;
				var r = this._events[e] || [];
				if (!t) return !!r.length;
				n === this && (n = void 0);
				for (var i = 0, a = r.length; i < a; i++) if (r[i].fn === t && r[i].ctx === n) return i;
				return !1;
			},
			once: function(e, t, n) {
				if (typeof e == "object") for (var r in e) this._on(r, e[r], t, !0);
				else {
					e = f(e);
					for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n, !0);
				}
				return this;
			},
			addEventParent: function(e) {
				return this._eventParents = this._eventParents || {}, this._eventParents[o(e)] = e, this;
			},
			removeEventParent: function(e) {
				return this._eventParents && delete this._eventParents[o(e)], this;
			},
			_propagateEvent: function(e) {
				for (var t in this._eventParents) this._eventParents[t].fire(e.type, n({
					layer: e.target,
					propagatedFrom: e.target
				}, e), !0);
			}
		};
		k.addEventListener = k.on, k.removeEventListener = k.clearAllEventListeners = k.off, k.addOneTimeEventListener = k.once, k.fireEvent = k.fire, k.hasEventListeners = k.listens;
		var A = O.extend(k);
		function j(e, t, n) {
			this.x = n ? Math.round(e) : e, this.y = n ? Math.round(t) : t;
		}
		var te = Math.trunc || function(e) {
			return e > 0 ? Math.floor(e) : Math.ceil(e);
		};
		j.prototype = {
			clone: function() {
				return new j(this.x, this.y);
			},
			add: function(e) {
				return this.clone()._add(M(e));
			},
			_add: function(e) {
				return this.x += e.x, this.y += e.y, this;
			},
			subtract: function(e) {
				return this.clone()._subtract(M(e));
			},
			_subtract: function(e) {
				return this.x -= e.x, this.y -= e.y, this;
			},
			divideBy: function(e) {
				return this.clone()._divideBy(e);
			},
			_divideBy: function(e) {
				return this.x /= e, this.y /= e, this;
			},
			multiplyBy: function(e) {
				return this.clone()._multiplyBy(e);
			},
			_multiplyBy: function(e) {
				return this.x *= e, this.y *= e, this;
			},
			scaleBy: function(e) {
				return new j(this.x * e.x, this.y * e.y);
			},
			unscaleBy: function(e) {
				return new j(this.x / e.x, this.y / e.y);
			},
			round: function() {
				return this.clone()._round();
			},
			_round: function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
			},
			floor: function() {
				return this.clone()._floor();
			},
			_floor: function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
			},
			ceil: function() {
				return this.clone()._ceil();
			},
			_ceil: function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
			},
			trunc: function() {
				return this.clone()._trunc();
			},
			_trunc: function() {
				return this.x = te(this.x), this.y = te(this.y), this;
			},
			distanceTo: function(e) {
				e = M(e);
				var t = e.x - this.x, n = e.y - this.y;
				return Math.sqrt(t * t + n * n);
			},
			equals: function(e) {
				return e = M(e), e.x === this.x && e.y === this.y;
			},
			contains: function(e) {
				return e = M(e), Math.abs(e.x) <= Math.abs(this.x) && Math.abs(e.y) <= Math.abs(this.y);
			},
			toString: function() {
				return "Point(" + u(this.x) + ", " + u(this.y) + ")";
			}
		};
		function M(e, t, n) {
			return e instanceof j ? e : _(e) ? new j(e[0], e[1]) : e == null ? e : typeof e == "object" && "x" in e && "y" in e ? new j(e.x, e.y) : new j(e, t, n);
		}
		function N(e, t) {
			if (e) for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r]);
		}
		N.prototype = {
			extend: function(e) {
				var t, n;
				if (!e) return this;
				if (e instanceof j || typeof e[0] == "number" || "x" in e) t = n = M(e);
				else if (e = ne(e), t = e.min, n = e.max, !t || !n) return this;
				return !this.min && !this.max ? (this.min = t.clone(), this.max = n.clone()) : (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(n.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(n.y, this.max.y)), this;
			},
			getCenter: function(e) {
				return M((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, e);
			},
			getBottomLeft: function() {
				return M(this.min.x, this.max.y);
			},
			getTopRight: function() {
				return M(this.max.x, this.min.y);
			},
			getTopLeft: function() {
				return this.min;
			},
			getBottomRight: function() {
				return this.max;
			},
			getSize: function() {
				return this.max.subtract(this.min);
			},
			contains: function(e) {
				var t, n;
				return e = typeof e[0] == "number" || e instanceof j ? M(e) : ne(e), e instanceof N ? (t = e.min, n = e.max) : t = n = e, t.x >= this.min.x && n.x <= this.max.x && t.y >= this.min.y && n.y <= this.max.y;
			},
			intersects: function(e) {
				e = ne(e);
				var t = this.min, n = this.max, r = e.min, i = e.max, a = i.x >= t.x && r.x <= n.x, o = i.y >= t.y && r.y <= n.y;
				return a && o;
			},
			overlaps: function(e) {
				e = ne(e);
				var t = this.min, n = this.max, r = e.min, i = e.max, a = i.x > t.x && r.x < n.x, o = i.y > t.y && r.y < n.y;
				return a && o;
			},
			isValid: function() {
				return !!(this.min && this.max);
			},
			pad: function(e) {
				var t = this.min, n = this.max, r = Math.abs(t.x - n.x) * e, i = Math.abs(t.y - n.y) * e;
				return ne(M(t.x - r, t.y - i), M(n.x + r, n.y + i));
			},
			equals: function(e) {
				return e ? (e = ne(e), this.min.equals(e.getTopLeft()) && this.max.equals(e.getBottomRight())) : !1;
			}
		};
		function ne(e, t) {
			return !e || e instanceof N ? e : new N(e, t);
		}
		function re(e, t) {
			if (e) for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r]);
		}
		re.prototype = {
			extend: function(e) {
				var t = this._southWest, n = this._northEast, r, i;
				if (e instanceof P) r = e, i = e;
				else if (e instanceof re) {
					if (r = e._southWest, i = e._northEast, !r || !i) return this;
				} else return e ? this.extend(F(e) || ie(e)) : this;
				return !t && !n ? (this._southWest = new P(r.lat, r.lng), this._northEast = new P(i.lat, i.lng)) : (t.lat = Math.min(r.lat, t.lat), t.lng = Math.min(r.lng, t.lng), n.lat = Math.max(i.lat, n.lat), n.lng = Math.max(i.lng, n.lng)), this;
			},
			pad: function(e) {
				var t = this._southWest, n = this._northEast, r = Math.abs(t.lat - n.lat) * e, i = Math.abs(t.lng - n.lng) * e;
				return new re(new P(t.lat - r, t.lng - i), new P(n.lat + r, n.lng + i));
			},
			getCenter: function() {
				return new P((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
			},
			getSouthWest: function() {
				return this._southWest;
			},
			getNorthEast: function() {
				return this._northEast;
			},
			getNorthWest: function() {
				return new P(this.getNorth(), this.getWest());
			},
			getSouthEast: function() {
				return new P(this.getSouth(), this.getEast());
			},
			getWest: function() {
				return this._southWest.lng;
			},
			getSouth: function() {
				return this._southWest.lat;
			},
			getEast: function() {
				return this._northEast.lng;
			},
			getNorth: function() {
				return this._northEast.lat;
			},
			contains: function(e) {
				e = typeof e[0] == "number" || e instanceof P || "lat" in e ? F(e) : ie(e);
				var t = this._southWest, n = this._northEast, r, i;
				return e instanceof re ? (r = e.getSouthWest(), i = e.getNorthEast()) : r = i = e, r.lat >= t.lat && i.lat <= n.lat && r.lng >= t.lng && i.lng <= n.lng;
			},
			intersects: function(e) {
				e = ie(e);
				var t = this._southWest, n = this._northEast, r = e.getSouthWest(), i = e.getNorthEast(), a = i.lat >= t.lat && r.lat <= n.lat, o = i.lng >= t.lng && r.lng <= n.lng;
				return a && o;
			},
			overlaps: function(e) {
				e = ie(e);
				var t = this._southWest, n = this._northEast, r = e.getSouthWest(), i = e.getNorthEast(), a = i.lat > t.lat && r.lat < n.lat, o = i.lng > t.lng && r.lng < n.lng;
				return a && o;
			},
			toBBoxString: function() {
				return [
					this.getWest(),
					this.getSouth(),
					this.getEast(),
					this.getNorth()
				].join(",");
			},
			equals: function(e, t) {
				return e ? (e = ie(e), this._southWest.equals(e.getSouthWest(), t) && this._northEast.equals(e.getNorthEast(), t)) : !1;
			},
			isValid: function() {
				return !!(this._southWest && this._northEast);
			}
		};
		function ie(e, t) {
			return e instanceof re ? e : new re(e, t);
		}
		function P(e, t, n) {
			if (isNaN(e) || isNaN(t)) throw Error("Invalid LatLng object: (" + e + ", " + t + ")");
			this.lat = +e, this.lng = +t, n !== void 0 && (this.alt = +n);
		}
		P.prototype = {
			equals: function(e, t) {
				return e ? (e = F(e), Math.max(Math.abs(this.lat - e.lat), Math.abs(this.lng - e.lng)) <= (t === void 0 ? 1e-9 : t)) : !1;
			},
			toString: function(e) {
				return "LatLng(" + u(this.lat, e) + ", " + u(this.lng, e) + ")";
			},
			distanceTo: function(e) {
				return oe.distance(this, F(e));
			},
			wrap: function() {
				return oe.wrapLatLng(this);
			},
			toBounds: function(e) {
				var t = 180 * e / 40075017, n = t / Math.cos(Math.PI / 180 * this.lat);
				return ie([this.lat - t, this.lng - n], [this.lat + t, this.lng + n]);
			},
			clone: function() {
				return new P(this.lat, this.lng, this.alt);
			}
		};
		function F(e, t, n) {
			return e instanceof P ? e : _(e) && typeof e[0] != "object" ? e.length === 3 ? new P(e[0], e[1], e[2]) : e.length === 2 ? new P(e[0], e[1]) : null : e == null ? e : typeof e == "object" && "lat" in e ? new P(e.lat, "lng" in e ? e.lng : e.lon, e.alt) : t === void 0 ? null : new P(e, t, n);
		}
		var ae = {
			latLngToPoint: function(e, t) {
				var n = this.projection.project(e), r = this.scale(t);
				return this.transformation._transform(n, r);
			},
			pointToLatLng: function(e, t) {
				var n = this.scale(t), r = this.transformation.untransform(e, n);
				return this.projection.unproject(r);
			},
			project: function(e) {
				return this.projection.project(e);
			},
			unproject: function(e) {
				return this.projection.unproject(e);
			},
			scale: function(e) {
				return 256 * 2 ** e;
			},
			zoom: function(e) {
				return Math.log(e / 256) / Math.LN2;
			},
			getProjectedBounds: function(e) {
				if (this.infinite) return null;
				var t = this.projection.bounds, n = this.scale(e);
				return new N(this.transformation.transform(t.min, n), this.transformation.transform(t.max, n));
			},
			infinite: !1,
			wrapLatLng: function(e) {
				var t = this.wrapLng ? c(e.lng, this.wrapLng, !0) : e.lng, n = this.wrapLat ? c(e.lat, this.wrapLat, !0) : e.lat, r = e.alt;
				return new P(n, t, r);
			},
			wrapLatLngBounds: function(e) {
				var t = e.getCenter(), n = this.wrapLatLng(t), r = t.lat - n.lat, i = t.lng - n.lng;
				if (r === 0 && i === 0) return e;
				var a = e.getSouthWest(), o = e.getNorthEast();
				return new re(new P(a.lat - r, a.lng - i), new P(o.lat - r, o.lng - i));
			}
		}, oe = n({}, ae, {
			wrapLng: [-180, 180],
			R: 6371e3,
			distance: function(e, t) {
				var n = Math.PI / 180, r = e.lat * n, i = t.lat * n, a = Math.sin((t.lat - e.lat) * n / 2), o = Math.sin((t.lng - e.lng) * n / 2), s = a * a + Math.cos(r) * Math.cos(i) * o * o, c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
				return this.R * c;
			}
		}), se = 6378137, ce = {
			R: se,
			MAX_LATITUDE: 85.0511287798,
			project: function(e) {
				var t = Math.PI / 180, n = this.MAX_LATITUDE, r = Math.max(Math.min(n, e.lat), -n), i = Math.sin(r * t);
				return new j(this.R * e.lng * t, this.R * Math.log((1 + i) / (1 - i)) / 2);
			},
			unproject: function(e) {
				var t = 180 / Math.PI;
				return new P((2 * Math.atan(Math.exp(e.y / this.R)) - Math.PI / 2) * t, e.x * t / this.R);
			},
			bounds: (function() {
				var e = se * Math.PI;
				return new N([-e, -e], [e, e]);
			})()
		};
		function le(e, t, n, r) {
			_(e) ? (this._a = e[0], this._b = e[1], this._c = e[2], this._d = e[3]) : (this._a = e, this._b = t, this._c = n, this._d = r);
		}
		le.prototype = {
			transform: function(e, t) {
				return this._transform(e.clone(), t);
			},
			_transform: function(e, t) {
				return t ||= 1, e.x = t * (this._a * e.x + this._b), e.y = t * (this._c * e.y + this._d), e;
			},
			untransform: function(e, t) {
				return t ||= 1, new j((e.x / t - this._b) / this._a, (e.y / t - this._d) / this._c);
			}
		};
		function ue(e, t, n, r) {
			return new le(e, t, n, r);
		}
		var de = n({}, oe, {
			code: "EPSG:3857",
			projection: ce,
			transformation: function() {
				var e = .5 / (Math.PI * ce.R);
				return ue(e, .5, -e, .5);
			}()
		}), fe = n({}, de, { code: "EPSG:900913" });
		function pe(e) {
			return document.createElementNS("http://www.w3.org/2000/svg", e);
		}
		function me(e, t) {
			for (var n = "", r = 0, i, a = e.length, o, s, c; r < a; r++) {
				for (s = e[r], i = 0, o = s.length; i < o; i++) c = s[i], n += (i ? "L" : "M") + c.x + " " + c.y;
				n += t ? z.svg ? "z" : "x" : "";
			}
			return n || "M0 0";
		}
		var he = document.documentElement.style, ge = "ActiveXObject" in window, _e = ge && !document.addEventListener, ve = "msLaunchUri" in navigator && !("documentMode" in document), ye = Xe("webkit"), be = Xe("android"), xe = Xe("android 2") || Xe("android 3"), Se = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Ce = be && Xe("Google") && Se < 537 && !("AudioNode" in window), we = !!window.opera, Te = !ve && Xe("chrome"), Ee = Xe("gecko") && !ye && !we && !ge, De = !Te && Xe("safari"), Oe = Xe("phantom"), ke = "OTransition" in he, Ae = navigator.platform.indexOf("Win") === 0, je = ge && "transition" in he, Me = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !xe, Ne = "MozPerspective" in he, Pe = !window.L_DISABLE_3D && (je || Me || Ne) && !ke && !Oe, Fe = typeof orientation < "u" || Xe("mobile"), Ie = Fe && ye, Le = Fe && Me, Re = !window.PointerEvent && window.MSPointerEvent, ze = !!(window.PointerEvent || Re), I = "ontouchstart" in window || !!window.TouchEvent, R = !window.L_NO_TOUCH && (I || ze), Be = Fe && we, Ve = Fe && Ee, He = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Ue = function() {
			var e = !1;
			try {
				var t = Object.defineProperty({}, "passive", { get: function() {
					e = !0;
				} });
				window.addEventListener("testPassiveEventSupport", l, t), window.removeEventListener("testPassiveEventSupport", l, t);
			} catch {}
			return e;
		}(), We = function() {
			return !!document.createElement("canvas").getContext;
		}(), Ge = !!(document.createElementNS && pe("svg").createSVGRect), Ke = !!Ge && (function() {
			var e = document.createElement("div");
			return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
		})(), qe = !Ge && function() {
			try {
				var e = document.createElement("div");
				e.innerHTML = "<v:shape adj=\"1\"/>";
				var t = e.firstChild;
				return t.style.behavior = "url(#default#VML)", t && typeof t.adj == "object";
			} catch {
				return !1;
			}
		}(), Je = navigator.platform.indexOf("Mac") === 0, Ye = navigator.platform.indexOf("Linux") === 0;
		function Xe(e) {
			return navigator.userAgent.toLowerCase().indexOf(e) >= 0;
		}
		var z = {
			ie: ge,
			ielt9: _e,
			edge: ve,
			webkit: ye,
			android: be,
			android23: xe,
			androidStock: Ce,
			opera: we,
			chrome: Te,
			gecko: Ee,
			safari: De,
			phantom: Oe,
			opera12: ke,
			win: Ae,
			ie3d: je,
			webkit3d: Me,
			gecko3d: Ne,
			any3d: Pe,
			mobile: Fe,
			mobileWebkit: Ie,
			mobileWebkit3d: Le,
			msPointer: Re,
			pointer: ze,
			touch: R,
			touchNative: I,
			mobileOpera: Be,
			mobileGecko: Ve,
			retina: He,
			passiveEvents: Ue,
			canvas: We,
			svg: Ge,
			vml: qe,
			inlineSvg: Ke,
			mac: Je,
			linux: Ye
		}, Ze = z.msPointer ? "MSPointerDown" : "pointerdown", Qe = z.msPointer ? "MSPointerMove" : "pointermove", $e = z.msPointer ? "MSPointerUp" : "pointerup", et = z.msPointer ? "MSPointerCancel" : "pointercancel", tt = {
			touchstart: Ze,
			touchmove: Qe,
			touchend: $e,
			touchcancel: et
		}, nt = {
			touchstart: ft,
			touchmove: dt,
			touchend: dt,
			touchcancel: dt
		}, rt = {}, it = !1;
		function at(e, t, n) {
			return t === "touchstart" && ut(), nt[t] ? (n = nt[t].bind(this, n), e.addEventListener(tt[t], n, !1), n) : (console.warn("wrong event specified:", t), l);
		}
		function ot(e, t, n) {
			tt[t] ? e.removeEventListener(tt[t], n, !1) : console.warn("wrong event specified:", t);
		}
		function st(e) {
			rt[e.pointerId] = e;
		}
		function ct(e) {
			rt[e.pointerId] && (rt[e.pointerId] = e);
		}
		function lt(e) {
			delete rt[e.pointerId];
		}
		function ut() {
			it ||= (document.addEventListener(Ze, st, !0), document.addEventListener(Qe, ct, !0), document.addEventListener($e, lt, !0), document.addEventListener(et, lt, !0), !0);
		}
		function dt(e, t) {
			if (t.pointerType !== (t.MSPOINTER_TYPE_MOUSE || "mouse")) {
				for (var n in t.touches = [], rt) t.touches.push(rt[n]);
				t.changedTouches = [t], e(t);
			}
		}
		function ft(e, t) {
			t.MSPOINTER_TYPE_TOUCH && t.pointerType === t.MSPOINTER_TYPE_TOUCH && Zt(t), dt(e, t);
		}
		function pt(e) {
			var t = {}, n, r;
			for (r in e) n = e[r], t[r] = n && n.bind ? n.bind(e) : n;
			return e = t, t.type = "dblclick", t.detail = 2, t.isTrusted = !1, t._simulated = !0, t;
		}
		var mt = 200;
		function B(e, t) {
			e.addEventListener("dblclick", t);
			var n = 0, r;
			function i(e) {
				if (e.detail !== 1) r = e.detail;
				else if (!(e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents)) {
					var i = $t(e);
					if (!i.some(function(e) {
						return e instanceof HTMLLabelElement && e.attributes.for;
					}) || i.some(function(e) {
						return e instanceof HTMLInputElement || e instanceof HTMLSelectElement;
					})) {
						var a = Date.now();
						a - n <= mt ? (r++, r === 2 && t(pt(e))) : r = 1, n = a;
					}
				}
			}
			return e.addEventListener("click", i), {
				dblclick: t,
				simDblclick: i
			};
		}
		function ht(e, t) {
			e.removeEventListener("dblclick", t.dblclick), e.removeEventListener("click", t.simDblclick);
		}
		var gt = At([
			"transform",
			"webkitTransform",
			"OTransform",
			"MozTransform",
			"msTransform"
		]), _t = At([
			"webkitTransition",
			"transition",
			"OTransition",
			"MozTransition",
			"msTransition"
		]), vt = _t === "webkitTransition" || _t === "OTransition" ? _t + "End" : "transitionend";
		function yt(e) {
			return typeof e == "string" ? document.getElementById(e) : e;
		}
		function bt(e, t) {
			var n = e.style[t] || e.currentStyle && e.currentStyle[t];
			if ((!n || n === "auto") && document.defaultView) {
				var r = document.defaultView.getComputedStyle(e, null);
				n = r ? r[t] : null;
			}
			return n === "auto" ? null : n;
		}
		function V(e, t, n) {
			var r = document.createElement(e);
			return r.className = t || "", n && n.appendChild(r), r;
		}
		function H(e) {
			var t = e.parentNode;
			t && t.removeChild(e);
		}
		function xt(e) {
			for (; e.firstChild;) e.removeChild(e.firstChild);
		}
		function St(e) {
			var t = e.parentNode;
			t && t.lastChild !== e && t.appendChild(e);
		}
		function Ct(e) {
			var t = e.parentNode;
			t && t.firstChild !== e && t.insertBefore(e, t.firstChild);
		}
		function wt(e, t) {
			if (e.classList !== void 0) return e.classList.contains(t);
			var n = Dt(e);
			return n.length > 0 && RegExp("(^|\\s)" + t + "(\\s|$)").test(n);
		}
		function U(e, t) {
			if (e.classList !== void 0) for (var n = f(t), r = 0, i = n.length; r < i; r++) e.classList.add(n[r]);
			else if (!wt(e, t)) {
				var a = Dt(e);
				Et(e, (a ? a + " " : "") + t);
			}
		}
		function Tt(e, t) {
			e.classList === void 0 ? Et(e, d((" " + Dt(e) + " ").replace(" " + t + " ", " "))) : e.classList.remove(t);
		}
		function Et(e, t) {
			e.className.baseVal === void 0 ? e.className = t : e.className.baseVal = t;
		}
		function Dt(e) {
			return e.correspondingElement && (e = e.correspondingElement), e.className.baseVal === void 0 ? e.className : e.className.baseVal;
		}
		function Ot(e, t) {
			"opacity" in e.style ? e.style.opacity = t : "filter" in e.style && kt(e, t);
		}
		function kt(e, t) {
			var n = !1, r = "DXImageTransform.Microsoft.Alpha";
			try {
				n = e.filters.item(r);
			} catch {
				if (t === 1) return;
			}
			t = Math.round(t * 100), n ? (n.Enabled = t !== 100, n.Opacity = t) : e.style.filter += " progid:" + r + "(opacity=" + t + ")";
		}
		function At(e) {
			for (var t = document.documentElement.style, n = 0; n < e.length; n++) if (e[n] in t) return e[n];
			return !1;
		}
		function W(e, t, n) {
			var r = t || new j(0, 0);
			e.style[gt] = (z.ie3d ? "translate(" + r.x + "px," + r.y + "px)" : "translate3d(" + r.x + "px," + r.y + "px,0)") + (n ? " scale(" + n + ")" : "");
		}
		function jt(e, t) {
			e._leaflet_pos = t, z.any3d ? W(e, t) : (e.style.left = t.x + "px", e.style.top = t.y + "px");
		}
		function Mt(e) {
			return e._leaflet_pos || new j(0, 0);
		}
		var G, K, Nt;
		if ("onselectstart" in document) G = function() {
			J(window, "selectstart", Zt);
		}, K = function() {
			Y(window, "selectstart", Zt);
		};
		else {
			var Pt = At([
				"userSelect",
				"WebkitUserSelect",
				"OUserSelect",
				"MozUserSelect",
				"msUserSelect"
			]);
			G = function() {
				if (Pt) {
					var e = document.documentElement.style;
					Nt = e[Pt], e[Pt] = "none";
				}
			}, K = function() {
				Pt && (document.documentElement.style[Pt] = Nt, Nt = void 0);
			};
		}
		function Ft() {
			J(window, "dragstart", Zt);
		}
		function It() {
			Y(window, "dragstart", Zt);
		}
		var Lt, Rt;
		function zt(e) {
			for (; e.tabIndex === -1;) e = e.parentNode;
			e.style && (Bt(), Lt = e, Rt = e.style.outlineStyle, e.style.outlineStyle = "none", J(window, "keydown", Bt));
		}
		function Bt() {
			Lt && (Lt.style.outlineStyle = Rt, Lt = void 0, Rt = void 0, Y(window, "keydown", Bt));
		}
		function Vt(e) {
			do
				e = e.parentNode;
			while ((!e.offsetWidth || !e.offsetHeight) && e !== document.body);
			return e;
		}
		function Ht(e) {
			var t = e.getBoundingClientRect();
			return {
				x: t.width / e.offsetWidth || 1,
				y: t.height / e.offsetHeight || 1,
				boundingClientRect: t
			};
		}
		var q = {
			__proto__: null,
			TRANSFORM: gt,
			TRANSITION: _t,
			TRANSITION_END: vt,
			get: yt,
			getStyle: bt,
			create: V,
			remove: H,
			empty: xt,
			toFront: St,
			toBack: Ct,
			hasClass: wt,
			addClass: U,
			removeClass: Tt,
			setClass: Et,
			getClass: Dt,
			setOpacity: Ot,
			testProp: At,
			setTransform: W,
			setPosition: jt,
			getPosition: Mt,
			get disableTextSelection() {
				return G;
			},
			get enableTextSelection() {
				return K;
			},
			disableImageDrag: Ft,
			enableImageDrag: It,
			preventOutline: zt,
			restoreOutline: Bt,
			getSizedParentNode: Vt,
			getScale: Ht
		};
		function J(e, t, n, r) {
			if (t && typeof t == "object") for (var i in t) Kt(e, i, t[i], n);
			else {
				t = f(t);
				for (var a = 0, o = t.length; a < o; a++) Kt(e, t[a], n, r);
			}
			return this;
		}
		var Ut = "_leaflet_events";
		function Y(e, t, n, r) {
			if (arguments.length === 1) Wt(e), delete e[Ut];
			else if (t && typeof t == "object") for (var i in t) qt(e, i, t[i], n);
			else if (t = f(t), arguments.length === 2) Wt(e, function(e) {
				return v(t, e) !== -1;
			});
			else for (var a = 0, o = t.length; a < o; a++) qt(e, t[a], n, r);
			return this;
		}
		function Wt(e, t) {
			for (var n in e[Ut]) {
				var r = n.split(/\d/)[0];
				(!t || t(r)) && qt(e, r, null, null, n);
			}
		}
		var Gt = {
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			wheel: !("onwheel" in window) && "mousewheel"
		};
		function Kt(e, t, n, r) {
			var i = t + o(n) + (r ? "_" + o(r) : "");
			if (e[Ut] && e[Ut][i]) return this;
			var a = function(t) {
				return n.call(r || e, t || window.event);
			}, s = a;
			!z.touchNative && z.pointer && t.indexOf("touch") === 0 ? a = at(e, t, a) : z.touch && t === "dblclick" ? a = B(e, a) : "addEventListener" in e ? t === "touchstart" || t === "touchmove" || t === "wheel" || t === "mousewheel" ? e.addEventListener(Gt[t] || t, a, z.passiveEvents ? { passive: !1 } : !1) : t === "mouseenter" || t === "mouseleave" ? (a = function(t) {
				t ||= window.event, rn(e, t) && s(t);
			}, e.addEventListener(Gt[t], a, !1)) : e.addEventListener(t, s, !1) : e.attachEvent("on" + t, a), e[Ut] = e[Ut] || {}, e[Ut][i] = a;
		}
		function qt(e, t, n, r, i) {
			i ||= t + o(n) + (r ? "_" + o(r) : "");
			var a = e[Ut] && e[Ut][i];
			if (!a) return this;
			!z.touchNative && z.pointer && t.indexOf("touch") === 0 ? ot(e, t, a) : z.touch && t === "dblclick" ? ht(e, a) : "removeEventListener" in e ? e.removeEventListener(Gt[t] || t, a, !1) : e.detachEvent("on" + t, a), e[Ut][i] = null;
		}
		function Jt(e) {
			return e.stopPropagation ? e.stopPropagation() : e.originalEvent ? e.originalEvent._stopped = !0 : e.cancelBubble = !0, this;
		}
		function Yt(e) {
			return Kt(e, "wheel", Jt), this;
		}
		function Xt(e) {
			return J(e, "mousedown touchstart dblclick contextmenu", Jt), e._leaflet_disable_click = !0, this;
		}
		function Zt(e) {
			return e.preventDefault ? e.preventDefault() : e.returnValue = !1, this;
		}
		function Qt(e) {
			return Zt(e), Jt(e), this;
		}
		function $t(e) {
			if (e.composedPath) return e.composedPath();
			for (var t = [], n = e.target; n;) t.push(n), n = n.parentNode;
			return t;
		}
		function en(e, t) {
			if (!t) return new j(e.clientX, e.clientY);
			var n = Ht(t), r = n.boundingClientRect;
			return new j((e.clientX - r.left) / n.x - t.clientLeft, (e.clientY - r.top) / n.y - t.clientTop);
		}
		var tn = z.linux && z.chrome ? window.devicePixelRatio : z.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
		function nn(e) {
			return z.edge ? e.wheelDeltaY / 2 : e.deltaY && e.deltaMode === 0 ? -e.deltaY / tn : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : e.detail ? e.detail / -32765 * 60 : 0;
		}
		function rn(e, t) {
			var n = t.relatedTarget;
			if (!n) return !0;
			try {
				for (; n && n !== e;) n = n.parentNode;
			} catch {
				return !1;
			}
			return n !== e;
		}
		var an = {
			__proto__: null,
			on: J,
			off: Y,
			stopPropagation: Jt,
			disableScrollPropagation: Yt,
			disableClickPropagation: Xt,
			preventDefault: Zt,
			stop: Qt,
			getPropagationPath: $t,
			getMousePosition: en,
			getWheelDelta: nn,
			isExternalTarget: rn,
			addListener: J,
			removeListener: Y
		}, on = A.extend({
			run: function(e, t, n, r) {
				this.stop(), this._el = e, this._inProgress = !0, this._duration = n || .25, this._easeOutPower = 1 / Math.max(r || .5, .2), this._startPos = Mt(e), this._offset = t.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
			},
			stop: function() {
				this._inProgress && (this._step(!0), this._complete());
			},
			_animate: function() {
				this._animId = T(this._animate, this), this._step();
			},
			_step: function(e) {
				var t = +/* @__PURE__ */ new Date() - this._startTime, n = this._duration * 1e3;
				t < n ? this._runFrame(this._easeOut(t / n), e) : (this._runFrame(1), this._complete());
			},
			_runFrame: function(e, t) {
				var n = this._startPos.add(this._offset.multiplyBy(e));
				t && n._round(), jt(this._el, n), this.fire("step");
			},
			_complete: function() {
				E(this._animId), this._inProgress = !1, this.fire("end");
			},
			_easeOut: function(e) {
				return 1 - (1 - e) ** this._easeOutPower;
			}
		}), X = A.extend({
			options: {
				crs: de,
				center: void 0,
				zoom: void 0,
				minZoom: void 0,
				maxZoom: void 0,
				layers: [],
				maxBounds: void 0,
				renderer: void 0,
				zoomAnimation: !0,
				zoomAnimationThreshold: 4,
				fadeAnimation: !0,
				markerZoomAnimation: !0,
				transform3DLimit: 8388608,
				zoomSnap: 1,
				zoomDelta: 1,
				trackResize: !0
			},
			initialize: function(e, t) {
				t = p(this, t), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(e), this._initLayout(), this._onResize = i(this._onResize, this), this._initEvents(), t.maxBounds && this.setMaxBounds(t.maxBounds), t.zoom !== void 0 && (this._zoom = this._limitZoom(t.zoom)), t.center && t.zoom !== void 0 && this.setView(F(t.center), t.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = _t && z.any3d && !z.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), J(this._proxy, vt, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
			},
			setView: function(e, t, r) {
				return t = t === void 0 ? this._zoom : this._limitZoom(t), e = this._limitCenter(F(e), t, this.options.maxBounds), r ||= {}, this._stop(), this._loaded && !r.reset && r !== !0 && (r.animate !== void 0 && (r.zoom = n({ animate: r.animate }, r.zoom), r.pan = n({
					animate: r.animate,
					duration: r.duration
				}, r.pan)), this._zoom === t ? this._tryAnimatedPan(e, r.pan) : this._tryAnimatedZoom && this._tryAnimatedZoom(e, t, r.zoom)) ? (clearTimeout(this._sizeTimer), this) : (this._resetView(e, t, r.pan && r.pan.noMoveStart), this);
			},
			setZoom: function(e, t) {
				return this._loaded ? this.setView(this.getCenter(), e, { zoom: t }) : (this._zoom = e, this);
			},
			zoomIn: function(e, t) {
				return e ||= z.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom + e, t);
			},
			zoomOut: function(e, t) {
				return e ||= z.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom - e, t);
			},
			setZoomAround: function(e, t, n) {
				var r = this.getZoomScale(t), i = this.getSize().divideBy(2), a = (e instanceof j ? e : this.latLngToContainerPoint(e)).subtract(i).multiplyBy(1 - 1 / r), o = this.containerPointToLatLng(i.add(a));
				return this.setView(o, t, { zoom: n });
			},
			_getBoundsCenterZoom: function(e, t) {
				t ||= {}, e = e.getBounds ? e.getBounds() : ie(e);
				var n = M(t.paddingTopLeft || t.padding || [0, 0]), r = M(t.paddingBottomRight || t.padding || [0, 0]), i = this.getBoundsZoom(e, !1, n.add(r));
				if (i = typeof t.maxZoom == "number" ? Math.min(t.maxZoom, i) : i, i === Infinity) return {
					center: e.getCenter(),
					zoom: i
				};
				var a = r.subtract(n).divideBy(2), o = this.project(e.getSouthWest(), i), s = this.project(e.getNorthEast(), i);
				return {
					center: this.unproject(o.add(s).divideBy(2).add(a), i),
					zoom: i
				};
			},
			fitBounds: function(e, t) {
				if (e = ie(e), !e.isValid()) throw Error("Bounds are not valid.");
				var n = this._getBoundsCenterZoom(e, t);
				return this.setView(n.center, n.zoom, t);
			},
			fitWorld: function(e) {
				return this.fitBounds([[-90, -180], [90, 180]], e);
			},
			panTo: function(e, t) {
				return this.setView(e, this._zoom, { pan: t });
			},
			panBy: function(e, t) {
				if (e = M(e).round(), t ||= {}, !e.x && !e.y) return this.fire("moveend");
				if (t.animate !== !0 && !this.getSize().contains(e)) return this._resetView(this.unproject(this.project(this.getCenter()).add(e)), this.getZoom()), this;
				if (this._panAnim || (this._panAnim = new on(), this._panAnim.on({
					step: this._onPanTransitionStep,
					end: this._onPanTransitionEnd
				}, this)), t.noMoveStart || this.fire("movestart"), t.animate !== !1) {
					U(this._mapPane, "leaflet-pan-anim");
					var n = this._getMapPanePos().subtract(e).round();
					this._panAnim.run(this._mapPane, n, t.duration || .25, t.easeLinearity);
				} else this._rawPanBy(e), this.fire("move").fire("moveend");
				return this;
			},
			flyTo: function(e, t, n) {
				if (n ||= {}, n.animate === !1 || !z.any3d) return this.setView(e, t, n);
				this._stop();
				var r = this.project(this.getCenter()), i = this.project(e), a = this.getSize(), o = this._zoom;
				e = F(e), t = t === void 0 ? o : t;
				var s = Math.max(a.x, a.y), c = s * this.getZoomScale(o, t), l = i.distanceTo(r) || 1, u = 1.42, d = u * u;
				function f(e) {
					var t = e ? -1 : 1, n = e ? c : s, r = (c * c - s * s + t * d * d * l * l) / (2 * n * d * l), i = Math.sqrt(r * r + 1) - r;
					return i < 1e-9 ? -18 : Math.log(i);
				}
				function p(e) {
					return (Math.exp(e) - Math.exp(-e)) / 2;
				}
				function m(e) {
					return (Math.exp(e) + Math.exp(-e)) / 2;
				}
				function h(e) {
					return p(e) / m(e);
				}
				var g = f(0);
				function _(e) {
					return s * (m(g) / m(g + u * e));
				}
				function v(e) {
					return s * (m(g) * h(g + u * e) - p(g)) / d;
				}
				function y(e) {
					return 1 - (1 - e) ** 1.5;
				}
				var b = Date.now(), x = (f(1) - g) / u, S = n.duration ? 1e3 * n.duration : 1e3 * x * .8;
				function C() {
					var n = (Date.now() - b) / S, a = y(n) * x;
					n <= 1 ? (this._flyToFrame = T(C, this), this._move(this.unproject(r.add(i.subtract(r).multiplyBy(v(a) / l)), o), this.getScaleZoom(s / _(a), o), { flyTo: !0 })) : this._move(e, t)._moveEnd(!0);
				}
				return this._moveStart(!0, n.noMoveStart), C.call(this), this;
			},
			flyToBounds: function(e, t) {
				var n = this._getBoundsCenterZoom(e, t);
				return this.flyTo(n.center, n.zoom, t);
			},
			setMaxBounds: function(e) {
				return e = ie(e), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), e.isValid() ? (this.options.maxBounds = e, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
			},
			setMinZoom: function(e) {
				var t = this.options.minZoom;
				return this.options.minZoom = e, this._loaded && t !== e && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(e) : this;
			},
			setMaxZoom: function(e) {
				var t = this.options.maxZoom;
				return this.options.maxZoom = e, this._loaded && t !== e && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(e) : this;
			},
			panInsideBounds: function(e, t) {
				this._enforcingBounds = !0;
				var n = this.getCenter(), r = this._limitCenter(n, this._zoom, ie(e));
				return n.equals(r) || this.panTo(r, t), this._enforcingBounds = !1, this;
			},
			panInside: function(e, t) {
				t ||= {};
				var n = M(t.paddingTopLeft || t.padding || [0, 0]), r = M(t.paddingBottomRight || t.padding || [0, 0]), i = this.project(this.getCenter()), a = this.project(e), o = this.getPixelBounds(), s = ne([o.min.add(n), o.max.subtract(r)]), c = s.getSize();
				if (!s.contains(a)) {
					this._enforcingBounds = !0;
					var l = a.subtract(s.getCenter()), u = s.extend(a).getSize().subtract(c);
					i.x += l.x < 0 ? -u.x : u.x, i.y += l.y < 0 ? -u.y : u.y, this.panTo(this.unproject(i), t), this._enforcingBounds = !1;
				}
				return this;
			},
			invalidateSize: function(e) {
				if (!this._loaded) return this;
				e = n({
					animate: !1,
					pan: !0
				}, e === !0 ? { animate: !0 } : e);
				var t = this.getSize();
				this._sizeChanged = !0, this._lastCenter = null;
				var r = this.getSize(), a = t.divideBy(2).round(), o = r.divideBy(2).round(), s = a.subtract(o);
				return !s.x && !s.y ? this : (e.animate && e.pan ? this.panBy(s) : (e.pan && this._rawPanBy(s), this.fire("move"), e.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(i(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
					oldSize: t,
					newSize: r
				}));
			},
			stop: function() {
				return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
			},
			locate: function(e) {
				if (e = this._locateOptions = n({
					timeout: 1e4,
					watch: !1
				}, e), !("geolocation" in navigator)) return this._handleGeolocationError({
					code: 0,
					message: "Geolocation not supported."
				}), this;
				var t = i(this._handleGeolocationResponse, this), r = i(this._handleGeolocationError, this);
				return e.watch ? this._locationWatchId = navigator.geolocation.watchPosition(t, r, e) : navigator.geolocation.getCurrentPosition(t, r, e), this;
			},
			stopLocate: function() {
				return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
			},
			_handleGeolocationError: function(e) {
				if (this._container._leaflet_id) {
					var t = e.code, n = e.message || (t === 1 ? "permission denied" : t === 2 ? "position unavailable" : "timeout");
					this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
						code: t,
						message: "Geolocation error: " + n + "."
					});
				}
			},
			_handleGeolocationResponse: function(e) {
				if (this._container._leaflet_id) {
					var t = e.coords.latitude, n = e.coords.longitude, r = new P(t, n), i = r.toBounds(e.coords.accuracy * 2), a = this._locateOptions;
					if (a.setView) {
						var o = this.getBoundsZoom(i);
						this.setView(r, a.maxZoom ? Math.min(o, a.maxZoom) : o);
					}
					var s = {
						latlng: r,
						bounds: i,
						timestamp: e.timestamp
					};
					for (var c in e.coords) typeof e.coords[c] == "number" && (s[c] = e.coords[c]);
					this.fire("locationfound", s);
				}
			},
			addHandler: function(e, t) {
				if (!t) return this;
				var n = this[e] = new t(this);
				return this._handlers.push(n), this.options[e] && n.enable(), this;
			},
			remove: function() {
				if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id) throw Error("Map container is being reused by another instance");
				try {
					delete this._container._leaflet_id, delete this._containerId;
				} catch {
					this._container._leaflet_id = void 0, this._containerId = void 0;
				}
				for (var e in this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), H(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest &&= (E(this._resizeRequest), null), this._clearHandlers(), this._loaded && this.fire("unload"), this._layers) this._layers[e].remove();
				for (e in this._panes) H(this._panes[e]);
				return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
			},
			createPane: function(e, t) {
				var n = V("div", "leaflet-pane" + (e ? " leaflet-" + e.replace("Pane", "") + "-pane" : ""), t || this._mapPane);
				return e && (this._panes[e] = n), n;
			},
			getCenter: function() {
				return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
			},
			getZoom: function() {
				return this._zoom;
			},
			getBounds: function() {
				var e = this.getPixelBounds();
				return new re(this.unproject(e.getBottomLeft()), this.unproject(e.getTopRight()));
			},
			getMinZoom: function() {
				return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
			},
			getMaxZoom: function() {
				return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
			},
			getBoundsZoom: function(e, t, n) {
				e = ie(e), n = M(n || [0, 0]);
				var r = this.getZoom() || 0, i = this.getMinZoom(), a = this.getMaxZoom(), o = e.getNorthWest(), s = e.getSouthEast(), c = this.getSize().subtract(n), l = ne(this.project(s, r), this.project(o, r)).getSize(), u = z.any3d ? this.options.zoomSnap : 1, d = c.x / l.x, f = c.y / l.y, p = t ? Math.max(d, f) : Math.min(d, f);
				return r = this.getScaleZoom(p, r), u && (r = Math.round(r / (u / 100)) * (u / 100), r = t ? Math.ceil(r / u) * u : Math.floor(r / u) * u), Math.max(i, Math.min(a, r));
			},
			getSize: function() {
				return (!this._size || this._sizeChanged) && (this._size = new j(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone();
			},
			getPixelBounds: function(e, t) {
				var n = this._getTopLeftPoint(e, t);
				return new N(n, n.add(this.getSize()));
			},
			getPixelOrigin: function() {
				return this._checkIfLoaded(), this._pixelOrigin;
			},
			getPixelWorldBounds: function(e) {
				return this.options.crs.getProjectedBounds(e === void 0 ? this.getZoom() : e);
			},
			getPane: function(e) {
				return typeof e == "string" ? this._panes[e] : e;
			},
			getPanes: function() {
				return this._panes;
			},
			getContainer: function() {
				return this._container;
			},
			getZoomScale: function(e, t) {
				var n = this.options.crs;
				return t = t === void 0 ? this._zoom : t, n.scale(e) / n.scale(t);
			},
			getScaleZoom: function(e, t) {
				var n = this.options.crs;
				t = t === void 0 ? this._zoom : t;
				var r = n.zoom(e * n.scale(t));
				return isNaN(r) ? Infinity : r;
			},
			project: function(e, t) {
				return t = t === void 0 ? this._zoom : t, this.options.crs.latLngToPoint(F(e), t);
			},
			unproject: function(e, t) {
				return t = t === void 0 ? this._zoom : t, this.options.crs.pointToLatLng(M(e), t);
			},
			layerPointToLatLng: function(e) {
				var t = M(e).add(this.getPixelOrigin());
				return this.unproject(t);
			},
			latLngToLayerPoint: function(e) {
				return this.project(F(e))._round()._subtract(this.getPixelOrigin());
			},
			wrapLatLng: function(e) {
				return this.options.crs.wrapLatLng(F(e));
			},
			wrapLatLngBounds: function(e) {
				return this.options.crs.wrapLatLngBounds(ie(e));
			},
			distance: function(e, t) {
				return this.options.crs.distance(F(e), F(t));
			},
			containerPointToLayerPoint: function(e) {
				return M(e).subtract(this._getMapPanePos());
			},
			layerPointToContainerPoint: function(e) {
				return M(e).add(this._getMapPanePos());
			},
			containerPointToLatLng: function(e) {
				var t = this.containerPointToLayerPoint(M(e));
				return this.layerPointToLatLng(t);
			},
			latLngToContainerPoint: function(e) {
				return this.layerPointToContainerPoint(this.latLngToLayerPoint(F(e)));
			},
			mouseEventToContainerPoint: function(e) {
				return en(e, this._container);
			},
			mouseEventToLayerPoint: function(e) {
				return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
			},
			mouseEventToLatLng: function(e) {
				return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
			},
			_initContainer: function(e) {
				var t = this._container = yt(e);
				if (!t) throw Error("Map container not found.");
				if (t._leaflet_id) throw Error("Map container is already initialized.");
				J(t, "scroll", this._onScroll, this), this._containerId = o(t);
			},
			_initLayout: function() {
				var e = this._container;
				this._fadeAnimated = this.options.fadeAnimation && z.any3d, U(e, "leaflet-container" + (z.touch ? " leaflet-touch" : "") + (z.retina ? " leaflet-retina" : "") + (z.ielt9 ? " leaflet-oldie" : "") + (z.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
				var t = bt(e, "position");
				t !== "absolute" && t !== "relative" && t !== "fixed" && t !== "sticky" && (e.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
			},
			_initPanes: function() {
				var e = this._panes = {};
				this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), jt(this._mapPane, new j(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (U(e.markerPane, "leaflet-zoom-hide"), U(e.shadowPane, "leaflet-zoom-hide"));
			},
			_resetView: function(e, t, n) {
				jt(this._mapPane, new j(0, 0));
				var r = !this._loaded;
				this._loaded = !0, t = this._limitZoom(t), this.fire("viewprereset");
				var i = this._zoom !== t;
				this._moveStart(i, n)._move(e, t)._moveEnd(i), this.fire("viewreset"), r && this.fire("load");
			},
			_moveStart: function(e, t) {
				return e && this.fire("zoomstart"), t || this.fire("movestart"), this;
			},
			_move: function(e, t, n, r) {
				t === void 0 && (t = this._zoom);
				var i = this._zoom !== t;
				return this._zoom = t, this._lastCenter = e, this._pixelOrigin = this._getNewPixelOrigin(e), r ? n && n.pinch && this.fire("zoom", n) : ((i || n && n.pinch) && this.fire("zoom", n), this.fire("move", n)), this;
			},
			_moveEnd: function(e) {
				return e && this.fire("zoomend"), this.fire("moveend");
			},
			_stop: function() {
				return E(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
			},
			_rawPanBy: function(e) {
				jt(this._mapPane, this._getMapPanePos().subtract(e));
			},
			_getZoomSpan: function() {
				return this.getMaxZoom() - this.getMinZoom();
			},
			_panInsideMaxBounds: function() {
				this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
			},
			_checkIfLoaded: function() {
				if (!this._loaded) throw Error("Set map center and zoom first.");
			},
			_initEvents: function(e) {
				this._targets = {}, this._targets[o(this._container)] = this;
				var t = e ? Y : J;
				t(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && t(window, "resize", this._onResize, this), z.any3d && this.options.transform3DLimit && (e ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
			},
			_onResize: function() {
				E(this._resizeRequest), this._resizeRequest = T(function() {
					this.invalidateSize({ debounceMoveend: !0 });
				}, this);
			},
			_onScroll: function() {
				this._container.scrollTop = 0, this._container.scrollLeft = 0;
			},
			_onMoveEnd: function() {
				var e = this._getMapPanePos();
				Math.max(Math.abs(e.x), Math.abs(e.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
			},
			_findEventTargets: function(e, t) {
				for (var n = [], r, i = t === "mouseout" || t === "mouseover", a = e.target || e.srcElement, s = !1; a;) {
					if (r = this._targets[o(a)], r && (t === "click" || t === "preclick") && this._draggableMoved(r)) {
						s = !0;
						break;
					}
					if (r && r.listens(t, !0) && (i && !rn(a, e) || (n.push(r), i)) || a === this._container) break;
					a = a.parentNode;
				}
				return !n.length && !s && !i && this.listens(t, !0) && (n = [this]), n;
			},
			_isClickDisabled: function(e) {
				for (; e && e !== this._container;) {
					if (e._leaflet_disable_click) return !0;
					e = e.parentNode;
				}
			},
			_handleDOMEvent: function(e) {
				var t = e.target || e.srcElement;
				if (!(!this._loaded || t._leaflet_disable_events || e.type === "click" && this._isClickDisabled(t))) {
					var n = e.type;
					n === "mousedown" && zt(t), this._fireDOMEvent(e, n);
				}
			},
			_mouseEvents: [
				"click",
				"dblclick",
				"mouseover",
				"mouseout",
				"contextmenu"
			],
			_fireDOMEvent: function(e, t, r) {
				if (e.type === "click") {
					var i = n({}, e);
					i.type = "preclick", this._fireDOMEvent(i, i.type, r);
				}
				var a = this._findEventTargets(e, t);
				if (r) {
					for (var o = [], s = 0; s < r.length; s++) r[s].listens(t, !0) && o.push(r[s]);
					a = o.concat(a);
				}
				if (a.length) {
					t === "contextmenu" && Zt(e);
					var c = a[0], l = { originalEvent: e };
					if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
						var u = c.getLatLng && (!c._radius || c._radius <= 10);
						l.containerPoint = u ? this.latLngToContainerPoint(c.getLatLng()) : this.mouseEventToContainerPoint(e), l.layerPoint = this.containerPointToLayerPoint(l.containerPoint), l.latlng = u ? c.getLatLng() : this.layerPointToLatLng(l.layerPoint);
					}
					for (s = 0; s < a.length; s++) if (a[s].fire(t, l, !0), l.originalEvent._stopped || a[s].options.bubblingMouseEvents === !1 && v(this._mouseEvents, t) !== -1) return;
				}
			},
			_draggableMoved: function(e) {
				return e = e.dragging && e.dragging.enabled() ? e : this, e.dragging && e.dragging.moved() || this.boxZoom && this.boxZoom.moved();
			},
			_clearHandlers: function() {
				for (var e = 0, t = this._handlers.length; e < t; e++) this._handlers[e].disable();
			},
			whenReady: function(e, t) {
				return this._loaded ? e.call(t || this, { target: this }) : this.on("load", e, t), this;
			},
			_getMapPanePos: function() {
				return Mt(this._mapPane) || new j(0, 0);
			},
			_moved: function() {
				var e = this._getMapPanePos();
				return e && !e.equals([0, 0]);
			},
			_getTopLeftPoint: function(e, t) {
				return (e && t !== void 0 ? this._getNewPixelOrigin(e, t) : this.getPixelOrigin()).subtract(this._getMapPanePos());
			},
			_getNewPixelOrigin: function(e, t) {
				var n = this.getSize()._divideBy(2);
				return this.project(e, t)._subtract(n)._add(this._getMapPanePos())._round();
			},
			_latLngToNewLayerPoint: function(e, t, n) {
				var r = this._getNewPixelOrigin(n, t);
				return this.project(e, t)._subtract(r);
			},
			_latLngBoundsToNewLayerBounds: function(e, t, n) {
				var r = this._getNewPixelOrigin(n, t);
				return ne([
					this.project(e.getSouthWest(), t)._subtract(r),
					this.project(e.getNorthWest(), t)._subtract(r),
					this.project(e.getSouthEast(), t)._subtract(r),
					this.project(e.getNorthEast(), t)._subtract(r)
				]);
			},
			_getCenterLayerPoint: function() {
				return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
			},
			_getCenterOffset: function(e) {
				return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint());
			},
			_limitCenter: function(e, t, n) {
				if (!n) return e;
				var r = this.project(e, t), i = this.getSize().divideBy(2), a = new N(r.subtract(i), r.add(i)), o = this._getBoundsOffset(a, n, t);
				return Math.abs(o.x) <= 1 && Math.abs(o.y) <= 1 ? e : this.unproject(r.add(o), t);
			},
			_limitOffset: function(e, t) {
				if (!t) return e;
				var n = this.getPixelBounds(), r = new N(n.min.add(e), n.max.add(e));
				return e.add(this._getBoundsOffset(r, t));
			},
			_getBoundsOffset: function(e, t, n) {
				var r = ne(this.project(t.getNorthEast(), n), this.project(t.getSouthWest(), n)), i = r.min.subtract(e.min), a = r.max.subtract(e.max);
				return new j(this._rebound(i.x, -a.x), this._rebound(i.y, -a.y));
			},
			_rebound: function(e, t) {
				return e + t > 0 ? Math.round(e - t) / 2 : Math.max(0, Math.ceil(e)) - Math.max(0, Math.floor(t));
			},
			_limitZoom: function(e) {
				var t = this.getMinZoom(), n = this.getMaxZoom(), r = z.any3d ? this.options.zoomSnap : 1;
				return r && (e = Math.round(e / r) * r), Math.max(t, Math.min(n, e));
			},
			_onPanTransitionStep: function() {
				this.fire("move");
			},
			_onPanTransitionEnd: function() {
				Tt(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
			},
			_tryAnimatedPan: function(e, t) {
				var n = this._getCenterOffset(e)._trunc();
				return (t && t.animate) !== !0 && !this.getSize().contains(n) ? !1 : (this.panBy(n, t), !0);
			},
			_createAnimProxy: function() {
				var e = this._proxy = V("div", "leaflet-proxy leaflet-zoom-animated");
				this._panes.mapPane.appendChild(e), this.on("zoomanim", function(e) {
					var t = gt, n = this._proxy.style[t];
					W(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[t] && this._animatingZoom && this._onZoomTransitionEnd();
				}, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
			},
			_destroyAnimProxy: function() {
				H(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
			},
			_animMoveEnd: function() {
				var e = this.getCenter(), t = this.getZoom();
				W(this._proxy, this.project(e, t), this.getZoomScale(t, 1));
			},
			_catchTransitionEnd: function(e) {
				this._animatingZoom && e.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
			},
			_nothingToAnimate: function() {
				return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
			},
			_tryAnimatedZoom: function(e, t, n) {
				if (this._animatingZoom) return !0;
				if (n ||= {}, !this._zoomAnimated || n.animate === !1 || this._nothingToAnimate() || Math.abs(t - this._zoom) > this.options.zoomAnimationThreshold) return !1;
				var r = this.getZoomScale(t), i = this._getCenterOffset(e)._divideBy(1 - 1 / r);
				return n.animate !== !0 && !this.getSize().contains(i) ? !1 : (T(function() {
					this._moveStart(!0, n.noMoveStart || !1)._animateZoom(e, t, !0);
				}, this), !0);
			},
			_animateZoom: function(e, t, n, r) {
				this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = e, this._animateToZoom = t, U(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
					center: e,
					zoom: t,
					noUpdate: r
				}), this._tempFireZoomEvent ||= this._zoom !== this._animateToZoom, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(i(this._onZoomTransitionEnd, this), 250));
			},
			_onZoomTransitionEnd: function() {
				this._animatingZoom && (this._mapPane && Tt(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
			}
		});
		function sn(e, t) {
			return new X(e, t);
		}
		var cn = O.extend({
			options: { position: "topright" },
			initialize: function(e) {
				p(this, e);
			},
			getPosition: function() {
				return this.options.position;
			},
			setPosition: function(e) {
				var t = this._map;
				return t && t.removeControl(this), this.options.position = e, t && t.addControl(this), this;
			},
			getContainer: function() {
				return this._container;
			},
			addTo: function(e) {
				this.remove(), this._map = e;
				var t = this._container = this.onAdd(e), n = this.getPosition(), r = e._controlCorners[n];
				return U(t, "leaflet-control"), n.indexOf("bottom") === -1 ? r.appendChild(t) : r.insertBefore(t, r.firstChild), this._map.on("unload", this.remove, this), this;
			},
			remove: function() {
				return this._map &&= (H(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), null), this;
			},
			_refocusOnMap: function(e) {
				this._map && e && e.screenX > 0 && e.screenY > 0 && this._map.getContainer().focus();
			}
		}), ln = function(e) {
			return new cn(e);
		};
		X.include({
			addControl: function(e) {
				return e.addTo(this), this;
			},
			removeControl: function(e) {
				return e.remove(), this;
			},
			_initControlPos: function() {
				var e = this._controlCorners = {}, t = "leaflet-", n = this._controlContainer = V("div", t + "control-container", this._container);
				function r(r, i) {
					var a = t + r + " " + t + i;
					e[r + i] = V("div", a, n);
				}
				r("top", "left"), r("top", "right"), r("bottom", "left"), r("bottom", "right");
			},
			_clearControlPos: function() {
				for (var e in this._controlCorners) H(this._controlCorners[e]);
				H(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
			}
		});
		var un = cn.extend({
			options: {
				collapsed: !0,
				position: "topright",
				autoZIndex: !0,
				hideSingleBase: !1,
				sortLayers: !1,
				sortFunction: function(e, t, n, r) {
					return n < r ? -1 : +(r < n);
				}
			},
			initialize: function(e, t, n) {
				for (var r in p(this, n), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1, e) this._addLayer(e[r], r);
				for (r in t) this._addLayer(t[r], r, !0);
			},
			onAdd: function(e) {
				this._initLayout(), this._update(), this._map = e, e.on("zoomend", this._checkDisabledLayers, this);
				for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.on("add remove", this._onLayerChange, this);
				return this._container;
			},
			addTo: function(e) {
				return cn.prototype.addTo.call(this, e), this._expandIfNotCollapsed();
			},
			onRemove: function() {
				this._map.off("zoomend", this._checkDisabledLayers, this);
				for (var e = 0; e < this._layers.length; e++) this._layers[e].layer.off("add remove", this._onLayerChange, this);
			},
			addBaseLayer: function(e, t) {
				return this._addLayer(e, t), this._map ? this._update() : this;
			},
			addOverlay: function(e, t) {
				return this._addLayer(e, t, !0), this._map ? this._update() : this;
			},
			removeLayer: function(e) {
				e.off("add remove", this._onLayerChange, this);
				var t = this._getLayer(o(e));
				return t && this._layers.splice(this._layers.indexOf(t), 1), this._map ? this._update() : this;
			},
			expand: function() {
				U(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
				var e = this._map.getSize().y - (this._container.offsetTop + 50);
				return e < this._section.clientHeight ? (U(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = e + "px") : Tt(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
			},
			collapse: function() {
				return Tt(this._container, "leaflet-control-layers-expanded"), this;
			},
			_initLayout: function() {
				var e = "leaflet-control-layers", t = this._container = V("div", e), n = this.options.collapsed;
				t.setAttribute("aria-haspopup", !0), Xt(t), Yt(t);
				var r = this._section = V("section", e + "-list");
				n && (this._map.on("click", this.collapse, this), J(t, {
					mouseenter: this._expandSafely,
					mouseleave: this.collapse
				}, this));
				var i = this._layersLink = V("a", e + "-toggle", t);
				i.href = "#", i.title = "Layers", i.setAttribute("role", "button"), J(i, {
					keydown: function(e) {
						e.keyCode === 13 && this._expandSafely();
					},
					click: function(e) {
						Zt(e), this._expandSafely();
					}
				}, this), n || this.expand(), this._baseLayersList = V("div", e + "-base", r), this._separator = V("div", e + "-separator", r), this._overlaysList = V("div", e + "-overlays", r), t.appendChild(r);
			},
			_getLayer: function(e) {
				for (var t = 0; t < this._layers.length; t++) if (this._layers[t] && o(this._layers[t].layer) === e) return this._layers[t];
			},
			_addLayer: function(e, t, n) {
				this._map && e.on("add remove", this._onLayerChange, this), this._layers.push({
					layer: e,
					name: t,
					overlay: n
				}), this.options.sortLayers && this._layers.sort(i(function(e, t) {
					return this.options.sortFunction(e.layer, t.layer, e.name, t.name);
				}, this)), this.options.autoZIndex && e.setZIndex && (this._lastZIndex++, e.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
			},
			_update: function() {
				if (!this._container) return this;
				xt(this._baseLayersList), xt(this._overlaysList), this._layerControlInputs = [];
				var e, t, n, r, i = 0;
				for (n = 0; n < this._layers.length; n++) r = this._layers[n], this._addItem(r), t ||= r.overlay, e ||= !r.overlay, i += +!r.overlay;
				return this.options.hideSingleBase && (e &&= i > 1, this._baseLayersList.style.display = e ? "" : "none"), this._separator.style.display = t && e ? "" : "none", this;
			},
			_onLayerChange: function(e) {
				this._handlingClick || this._update();
				var t = this._getLayer(o(e.target)), n = t.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
				n && this._map.fire(n, t);
			},
			_createRadioElement: function(e, t) {
				var n = "<input type=\"radio\" class=\"leaflet-control-layers-selector\" name=\"" + e + "\"" + (t ? " checked=\"checked\"" : "") + "/>", r = document.createElement("div");
				return r.innerHTML = n, r.firstChild;
			},
			_addItem: function(e) {
				var t = document.createElement("label"), n = this._map.hasLayer(e.layer), r;
				e.overlay ? (r = document.createElement("input"), r.type = "checkbox", r.className = "leaflet-control-layers-selector", r.defaultChecked = n) : r = this._createRadioElement("leaflet-base-layers_" + o(this), n), this._layerControlInputs.push(r), r.layerId = o(e.layer), J(r, "click", this._onInputClick, this);
				var i = document.createElement("span");
				i.innerHTML = " " + e.name;
				var a = document.createElement("span");
				return t.appendChild(a), a.appendChild(r), a.appendChild(i), (e.overlay ? this._overlaysList : this._baseLayersList).appendChild(t), this._checkDisabledLayers(), t;
			},
			_onInputClick: function() {
				if (!this._preventClick) {
					var e = this._layerControlInputs, t, n, r = [], i = [];
					this._handlingClick = !0;
					for (var a = e.length - 1; a >= 0; a--) t = e[a], n = this._getLayer(t.layerId).layer, t.checked ? r.push(n) : t.checked || i.push(n);
					for (a = 0; a < i.length; a++) this._map.hasLayer(i[a]) && this._map.removeLayer(i[a]);
					for (a = 0; a < r.length; a++) this._map.hasLayer(r[a]) || this._map.addLayer(r[a]);
					this._handlingClick = !1, this._refocusOnMap();
				}
			},
			_checkDisabledLayers: function() {
				for (var e = this._layerControlInputs, t, n, r = this._map.getZoom(), i = e.length - 1; i >= 0; i--) t = e[i], n = this._getLayer(t.layerId).layer, t.disabled = n.options.minZoom !== void 0 && r < n.options.minZoom || n.options.maxZoom !== void 0 && r > n.options.maxZoom;
			},
			_expandIfNotCollapsed: function() {
				return this._map && !this.options.collapsed && this.expand(), this;
			},
			_expandSafely: function() {
				var e = this._section;
				this._preventClick = !0, J(e, "click", Zt), this.expand();
				var t = this;
				setTimeout(function() {
					Y(e, "click", Zt), t._preventClick = !1;
				});
			}
		}), dn = function(e, t, n) {
			return new un(e, t, n);
		}, fn = cn.extend({
			options: {
				position: "topleft",
				zoomInText: "<span aria-hidden=\"true\">+</span>",
				zoomInTitle: "Zoom in",
				zoomOutText: "<span aria-hidden=\"true\">&#x2212;</span>",
				zoomOutTitle: "Zoom out"
			},
			onAdd: function(e) {
				var t = "leaflet-control-zoom", n = V("div", t + " leaflet-bar"), r = this.options;
				return this._zoomInButton = this._createButton(r.zoomInText, r.zoomInTitle, t + "-in", n, this._zoomIn), this._zoomOutButton = this._createButton(r.zoomOutText, r.zoomOutTitle, t + "-out", n, this._zoomOut), this._updateDisabled(), e.on("zoomend zoomlevelschange", this._updateDisabled, this), n;
			},
			onRemove: function(e) {
				e.off("zoomend zoomlevelschange", this._updateDisabled, this);
			},
			disable: function() {
				return this._disabled = !0, this._updateDisabled(), this;
			},
			enable: function() {
				return this._disabled = !1, this._updateDisabled(), this;
			},
			_zoomIn: function(e) {
				!this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_zoomOut: function(e) {
				!this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_createButton: function(e, t, n, r, i) {
				var a = V("a", n, r);
				return a.innerHTML = e, a.href = "#", a.title = t, a.setAttribute("role", "button"), a.setAttribute("aria-label", t), Xt(a), J(a, "click", Qt), J(a, "click", i, this), J(a, "click", this._refocusOnMap, this), a;
			},
			_updateDisabled: function() {
				var e = this._map, t = "leaflet-disabled";
				Tt(this._zoomInButton, t), Tt(this._zoomOutButton, t), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || e._zoom === e.getMinZoom()) && (U(this._zoomOutButton, t), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || e._zoom === e.getMaxZoom()) && (U(this._zoomInButton, t), this._zoomInButton.setAttribute("aria-disabled", "true"));
			}
		});
		X.mergeOptions({ zoomControl: !0 }), X.addInitHook(function() {
			this.options.zoomControl && (this.zoomControl = new fn(), this.addControl(this.zoomControl));
		});
		var pn = function(e) {
			return new fn(e);
		}, mn = cn.extend({
			options: {
				position: "bottomleft",
				maxWidth: 100,
				metric: !0,
				imperial: !0
			},
			onAdd: function(e) {
				var t = "leaflet-control-scale", n = V("div", t), r = this.options;
				return this._addScales(r, t + "-line", n), e.on(r.updateWhenIdle ? "moveend" : "move", this._update, this), e.whenReady(this._update, this), n;
			},
			onRemove: function(e) {
				e.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
			},
			_addScales: function(e, t, n) {
				e.metric && (this._mScale = V("div", t, n)), e.imperial && (this._iScale = V("div", t, n));
			},
			_update: function() {
				var e = this._map, t = e.getSize().y / 2, n = e.distance(e.containerPointToLatLng([0, t]), e.containerPointToLatLng([this.options.maxWidth, t]));
				this._updateScales(n);
			},
			_updateScales: function(e) {
				this.options.metric && e && this._updateMetric(e), this.options.imperial && e && this._updateImperial(e);
			},
			_updateMetric: function(e) {
				var t = this._getRoundNum(e), n = t < 1e3 ? t + " m" : t / 1e3 + " km";
				this._updateScale(this._mScale, n, t / e);
			},
			_updateImperial: function(e) {
				var t = e * 3.2808399, n, r, i;
				t > 5280 ? (n = t / 5280, r = this._getRoundNum(n), this._updateScale(this._iScale, r + " mi", r / n)) : (i = this._getRoundNum(t), this._updateScale(this._iScale, i + " ft", i / t));
			},
			_updateScale: function(e, t, n) {
				e.style.width = Math.round(this.options.maxWidth * n) + "px", e.innerHTML = t;
			},
			_getRoundNum: function(e) {
				var t = 10 ** ((Math.floor(e) + "").length - 1), n = e / t;
				return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, t * n;
			}
		}), hn = function(e) {
			return new mn(e);
		}, gn = cn.extend({
			options: {
				position: "bottomright",
				prefix: "<a href=\"https://leafletjs.com\" title=\"A JavaScript library for interactive maps\">" + (z.inlineSvg ? "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\" class=\"leaflet-attribution-flag\"><path fill=\"#4C7BE1\" d=\"M0 0h12v4H0z\"/><path fill=\"#FFD500\" d=\"M0 4h12v3H0z\"/><path fill=\"#E0BC00\" d=\"M0 7h12v1H0z\"/></svg> " : "") + "Leaflet</a>"
			},
			initialize: function(e) {
				p(this, e), this._attributions = {};
			},
			onAdd: function(e) {
				for (var t in e.attributionControl = this, this._container = V("div", "leaflet-control-attribution"), Xt(this._container), e._layers) e._layers[t].getAttribution && this.addAttribution(e._layers[t].getAttribution());
				return this._update(), e.on("layeradd", this._addAttribution, this), this._container;
			},
			onRemove: function(e) {
				e.off("layeradd", this._addAttribution, this);
			},
			_addAttribution: function(e) {
				e.layer.getAttribution && (this.addAttribution(e.layer.getAttribution()), e.layer.once("remove", function() {
					this.removeAttribution(e.layer.getAttribution());
				}, this));
			},
			setPrefix: function(e) {
				return this.options.prefix = e, this._update(), this;
			},
			addAttribution: function(e) {
				return e && (this._attributions[e] || (this._attributions[e] = 0), this._attributions[e]++, this._update()), this;
			},
			removeAttribution: function(e) {
				return e && this._attributions[e] && (this._attributions[e]--, this._update()), this;
			},
			_update: function() {
				if (this._map) {
					var e = [];
					for (var t in this._attributions) this._attributions[t] && e.push(t);
					var n = [];
					this.options.prefix && n.push(this.options.prefix), e.length && n.push(e.join(", ")), this._container.innerHTML = n.join(" <span aria-hidden=\"true\">|</span> ");
				}
			}
		});
		X.mergeOptions({ attributionControl: !0 }), X.addInitHook(function() {
			this.options.attributionControl && new gn().addTo(this);
		}), cn.Layers = un, cn.Zoom = fn, cn.Scale = mn, cn.Attribution = gn, ln.layers = dn, ln.zoom = pn, ln.scale = hn, ln.attribution = function(e) {
			return new gn(e);
		};
		var _n = O.extend({
			initialize: function(e) {
				this._map = e;
			},
			enable: function() {
				return this._enabled || (this._enabled = !0, this.addHooks()), this;
			},
			disable: function() {
				return this._enabled && (this._enabled = !1, this.removeHooks()), this;
			},
			enabled: function() {
				return !!this._enabled;
			}
		});
		_n.addTo = function(e, t) {
			return e.addHandler(t, this), this;
		};
		var vn = { Events: k }, yn = z.touch ? "touchstart mousedown" : "mousedown", bn = A.extend({
			options: { clickTolerance: 3 },
			initialize: function(e, t, n, r) {
				p(this, r), this._element = e, this._dragStartTarget = t || e, this._preventOutline = n;
			},
			enable: function() {
				this._enabled ||= (J(this._dragStartTarget, yn, this._onDown, this), !0);
			},
			disable: function() {
				this._enabled && (bn._dragging === this && this.finishDrag(!0), Y(this._dragStartTarget, yn, this._onDown, this), this._enabled = !1, this._moved = !1);
			},
			_onDown: function(e) {
				if (this._enabled && (this._moved = !1, !wt(this._element, "leaflet-zoom-anim"))) {
					if (e.touches && e.touches.length !== 1) bn._dragging === this && this.finishDrag();
					else if (!(bn._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) && (bn._dragging = this, this._preventOutline && zt(this._element), Ft(), G(), !this._moving)) {
						this.fire("down");
						var t = e.touches ? e.touches[0] : e, n = Vt(this._element);
						this._startPoint = new j(t.clientX, t.clientY), this._startPos = Mt(this._element), this._parentScale = Ht(n);
						var r = e.type === "mousedown";
						J(document, r ? "mousemove" : "touchmove", this._onMove, this), J(document, r ? "mouseup" : "touchend touchcancel", this._onUp, this);
					}
				}
			},
			_onMove: function(e) {
				if (this._enabled) {
					if (e.touches && e.touches.length > 1) this._moved = !0;
					else {
						var t = e.touches && e.touches.length === 1 ? e.touches[0] : e, n = new j(t.clientX, t.clientY)._subtract(this._startPoint);
						(n.x || n.y) && (Math.abs(n.x) + Math.abs(n.y) < this.options.clickTolerance || (n.x /= this._parentScale.x, n.y /= this._parentScale.y, Zt(e), this._moved || (this.fire("dragstart"), this._moved = !0, U(document.body, "leaflet-dragging"), this._lastTarget = e.target || e.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), U(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(n), this._moving = !0, this._lastEvent = e, this._updatePosition()));
					}
				}
			},
			_updatePosition: function() {
				var e = { originalEvent: this._lastEvent };
				this.fire("predrag", e), jt(this._element, this._newPos), this.fire("drag", e);
			},
			_onUp: function() {
				this._enabled && this.finishDrag();
			},
			finishDrag: function(e) {
				Tt(document.body, "leaflet-dragging"), this._lastTarget &&= (Tt(this._lastTarget, "leaflet-drag-target"), null), Y(document, "mousemove touchmove", this._onMove, this), Y(document, "mouseup touchend touchcancel", this._onUp, this), It(), K();
				var t = this._moved && this._moving;
				this._moving = !1, bn._dragging = !1, t && this.fire("dragend", {
					noInertia: e,
					distance: this._newPos.distanceTo(this._startPos)
				});
			}
		});
		function xn(e, t, n) {
			for (var r, i = [
				1,
				4,
				2,
				8
			], a = 0, o, s, c, l, u = e.length, d, f; a < u; a++) e[a]._code = Pn(e[a], t);
			for (s = 0; s < 4; s++) {
				for (d = i[s], r = [], a = 0, u = e.length, o = u - 1; a < u; o = a++) c = e[a], l = e[o], c._code & d ? l._code & d || (f = Nn(l, c, d, t, n), f._code = Pn(f, t), r.push(f)) : (l._code & d && (f = Nn(l, c, d, t, n), f._code = Pn(f, t), r.push(f)), r.push(c));
				e = r;
			}
			return e;
		}
		function Sn(e, t) {
			var n, r, i, a, o, s, c, l, u;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			Z(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var d = F([0, 0]), f = ie(e);
			f.getNorthWest().distanceTo(f.getSouthWest()) * f.getNorthEast().distanceTo(f.getNorthWest()) < 1700 && (d = Cn(e));
			var p = e.length, m = [];
			for (n = 0; n < p; n++) {
				var h = F(e[n]);
				m.push(t.project(F([h.lat - d.lat, h.lng - d.lng])));
			}
			for (s = c = l = 0, n = 0, r = p - 1; n < p; r = n++) i = m[n], a = m[r], o = i.y * a.x - a.y * i.x, c += (i.x + a.x) * o, l += (i.y + a.y) * o, s += o * 3;
			u = s === 0 ? m[0] : [c / s, l / s];
			var g = t.unproject(M(u));
			return F([g.lat + d.lat, g.lng + d.lng]);
		}
		function Cn(e) {
			for (var t = 0, n = 0, r = 0, i = 0; i < e.length; i++) {
				var a = F(e[i]);
				t += a.lat, n += a.lng, r++;
			}
			return F([t / r, n / r]);
		}
		var wn = {
			__proto__: null,
			clipPolygon: xn,
			polygonCenter: Sn,
			centroid: Cn
		};
		function Tn(e, t) {
			if (!t || !e.length) return e.slice();
			var n = t * t;
			return e = An(e, n), e = On(e, n), e;
		}
		function En(e, t, n) {
			return Math.sqrt(In(e, t, n, !0));
		}
		function Dn(e, t, n) {
			return In(e, t, n);
		}
		function On(e, t) {
			var n = e.length, r = new (typeof Uint8Array < "u" ? Uint8Array : Array)(n);
			r[0] = r[n - 1] = 1, kn(e, r, t, 0, n - 1);
			var i, a = [];
			for (i = 0; i < n; i++) r[i] && a.push(e[i]);
			return a;
		}
		function kn(e, t, n, r, i) {
			for (var a = 0, o, s = r + 1, c; s <= i - 1; s++) c = In(e[s], e[r], e[i], !0), c > a && (o = s, a = c);
			a > n && (t[o] = 1, kn(e, t, n, r, o), kn(e, t, n, o, i));
		}
		function An(e, t) {
			for (var n = [e[0]], r = 1, i = 0, a = e.length; r < a; r++) Fn(e[r], e[i]) > t && (n.push(e[r]), i = r);
			return i < a - 1 && n.push(e[a - 1]), n;
		}
		var jn;
		function Mn(e, t, n, r, i) {
			var a = r ? jn : Pn(e, n), o = Pn(t, n), s, c, l;
			for (jn = o;;) {
				if (!(a | o)) return [e, t];
				if (a & o) return !1;
				s = a || o, c = Nn(e, t, s, n, i), l = Pn(c, n), s === a ? (e = c, a = l) : (t = c, o = l);
			}
		}
		function Nn(e, t, n, r, i) {
			var a = t.x - e.x, o = t.y - e.y, s = r.min, c = r.max, l, u;
			return n & 8 ? (l = e.x + a * (c.y - e.y) / o, u = c.y) : n & 4 ? (l = e.x + a * (s.y - e.y) / o, u = s.y) : n & 2 ? (l = c.x, u = e.y + o * (c.x - e.x) / a) : n & 1 && (l = s.x, u = e.y + o * (s.x - e.x) / a), new j(l, u, i);
		}
		function Pn(e, t) {
			var n = 0;
			return e.x < t.min.x ? n |= 1 : e.x > t.max.x && (n |= 2), e.y < t.min.y ? n |= 4 : e.y > t.max.y && (n |= 8), n;
		}
		function Fn(e, t) {
			var n = t.x - e.x, r = t.y - e.y;
			return n * n + r * r;
		}
		function In(e, t, n, r) {
			var i = t.x, a = t.y, o = n.x - i, s = n.y - a, c = o * o + s * s, l;
			return c > 0 && (l = ((e.x - i) * o + (e.y - a) * s) / c, l > 1 ? (i = n.x, a = n.y) : l > 0 && (i += o * l, a += s * l)), o = e.x - i, s = e.y - a, r ? o * o + s * s : new j(i, a);
		}
		function Z(e) {
			return !_(e[0]) || typeof e[0][0] != "object" && e[0][0] !== void 0;
		}
		function Ln(e) {
			return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), Z(e);
		}
		function Q(e, t) {
			var n, r, i, a, o, s, c, l;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			Z(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var u = F([0, 0]), d = ie(e);
			d.getNorthWest().distanceTo(d.getSouthWest()) * d.getNorthEast().distanceTo(d.getNorthWest()) < 1700 && (u = Cn(e));
			var f = e.length, p = [];
			for (n = 0; n < f; n++) {
				var m = F(e[n]);
				p.push(t.project(F([m.lat - u.lat, m.lng - u.lng])));
			}
			for (n = 0, r = 0; n < f - 1; n++) r += p[n].distanceTo(p[n + 1]) / 2;
			if (r === 0) l = p[0];
			else for (n = 0, a = 0; n < f - 1; n++) if (o = p[n], s = p[n + 1], i = o.distanceTo(s), a += i, a > r) {
				c = (a - r) / i, l = [s.x - c * (s.x - o.x), s.y - c * (s.y - o.y)];
				break;
			}
			var h = t.unproject(M(l));
			return F([h.lat + u.lat, h.lng + u.lng]);
		}
		var Rn = {
			__proto__: null,
			simplify: Tn,
			pointToSegmentDistance: En,
			closestPointOnSegment: Dn,
			clipSegment: Mn,
			_getEdgeIntersection: Nn,
			_getBitCode: Pn,
			_sqClosestPointOnSegment: In,
			isFlat: Z,
			_flat: Ln,
			polylineCenter: Q
		}, zn = {
			project: function(e) {
				return new j(e.lng, e.lat);
			},
			unproject: function(e) {
				return new P(e.y, e.x);
			},
			bounds: new N([-180, -90], [180, 90])
		}, Bn = {
			R: 6378137,
			R_MINOR: 6356752.314245179,
			bounds: new N([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
			project: function(e) {
				var t = Math.PI / 180, n = this.R, r = e.lat * t, i = this.R_MINOR / n, a = Math.sqrt(1 - i * i), o = a * Math.sin(r), s = Math.tan(Math.PI / 4 - r / 2) / ((1 - o) / (1 + o)) ** (a / 2);
				return r = -n * Math.log(Math.max(s, 1e-10)), new j(e.lng * t * n, r);
			},
			unproject: function(e) {
				for (var t = 180 / Math.PI, n = this.R, r = this.R_MINOR / n, i = Math.sqrt(1 - r * r), a = Math.exp(-e.y / n), o = Math.PI / 2 - 2 * Math.atan(a), s = 0, c = .1, l; s < 15 && Math.abs(c) > 1e-7; s++) l = i * Math.sin(o), l = ((1 - l) / (1 + l)) ** (i / 2), c = Math.PI / 2 - 2 * Math.atan(a * l) - o, o += c;
				return new P(o * t, e.x * t / n);
			}
		}, Vn = {
			__proto__: null,
			LonLat: zn,
			Mercator: Bn,
			SphericalMercator: ce
		}, Hn = n({}, oe, {
			code: "EPSG:3395",
			projection: Bn,
			transformation: function() {
				var e = .5 / (Math.PI * Bn.R);
				return ue(e, .5, -e, .5);
			}()
		}), Un = n({}, oe, {
			code: "EPSG:4326",
			projection: zn,
			transformation: ue(1 / 180, 1, -1 / 180, .5)
		}), Wn = n({}, ae, {
			projection: zn,
			transformation: ue(1, 0, -1, 0),
			scale: function(e) {
				return 2 ** e;
			},
			zoom: function(e) {
				return Math.log(e) / Math.LN2;
			},
			distance: function(e, t) {
				var n = t.lng - e.lng, r = t.lat - e.lat;
				return Math.sqrt(n * n + r * r);
			},
			infinite: !0
		});
		ae.Earth = oe, ae.EPSG3395 = Hn, ae.EPSG3857 = de, ae.EPSG900913 = fe, ae.EPSG4326 = Un, ae.Simple = Wn;
		var Gn = A.extend({
			options: {
				pane: "overlayPane",
				attribution: null,
				bubblingMouseEvents: !0
			},
			addTo: function(e) {
				return e.addLayer(this), this;
			},
			remove: function() {
				return this.removeFrom(this._map || this._mapToAdd);
			},
			removeFrom: function(e) {
				return e && e.removeLayer(this), this;
			},
			getPane: function(e) {
				return this._map.getPane(e ? this.options[e] || e : this.options.pane);
			},
			addInteractiveTarget: function(e) {
				return this._map._targets[o(e)] = this, this;
			},
			removeInteractiveTarget: function(e) {
				return delete this._map._targets[o(e)], this;
			},
			getAttribution: function() {
				return this.options.attribution;
			},
			_layerAdd: function(e) {
				var t = e.target;
				if (t.hasLayer(this)) {
					if (this._map = t, this._zoomAnimated = t._zoomAnimated, this.getEvents) {
						var n = this.getEvents();
						t.on(n, this), this.once("remove", function() {
							t.off(n, this);
						}, this);
					}
					this.onAdd(t), this.fire("add"), t.fire("layeradd", { layer: this });
				}
			}
		});
		X.include({
			addLayer: function(e) {
				if (!e._layerAdd) throw Error("The provided object is not a Layer.");
				var t = o(e);
				return this._layers[t] || (this._layers[t] = e, e._mapToAdd = this, e.beforeAdd && e.beforeAdd(this), this.whenReady(e._layerAdd, e)), this;
			},
			removeLayer: function(e) {
				var t = o(e);
				return this._layers[t] && (this._loaded && e.onRemove(this), delete this._layers[t], this._loaded && (this.fire("layerremove", { layer: e }), e.fire("remove")), e._map = e._mapToAdd = null), this;
			},
			hasLayer: function(e) {
				return o(e) in this._layers;
			},
			eachLayer: function(e, t) {
				for (var n in this._layers) e.call(t, this._layers[n]);
				return this;
			},
			_addLayers: function(e) {
				e = e ? _(e) ? e : [e] : [];
				for (var t = 0, n = e.length; t < n; t++) this.addLayer(e[t]);
			},
			_addZoomLimit: function(e) {
				isNaN(e.options.maxZoom) && isNaN(e.options.minZoom) || (this._zoomBoundLayers[o(e)] = e, this._updateZoomLevels());
			},
			_removeZoomLimit: function(e) {
				var t = o(e);
				this._zoomBoundLayers[t] && (delete this._zoomBoundLayers[t], this._updateZoomLevels());
			},
			_updateZoomLevels: function() {
				var e = Infinity, t = -Infinity, n = this._getZoomSpan();
				for (var r in this._zoomBoundLayers) {
					var i = this._zoomBoundLayers[r].options;
					e = i.minZoom === void 0 ? e : Math.min(e, i.minZoom), t = i.maxZoom === void 0 ? t : Math.max(t, i.maxZoom);
				}
				this._layersMaxZoom = t === -Infinity ? void 0 : t, this._layersMinZoom = e === Infinity ? void 0 : e, n !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
			}
		});
		var Kn = Gn.extend({
			initialize: function(e, t) {
				p(this, t), this._layers = {};
				var n, r;
				if (e) for (n = 0, r = e.length; n < r; n++) this.addLayer(e[n]);
			},
			addLayer: function(e) {
				var t = this.getLayerId(e);
				return this._layers[t] = e, this._map && this._map.addLayer(e), this;
			},
			removeLayer: function(e) {
				var t = e in this._layers ? e : this.getLayerId(e);
				return this._map && this._layers[t] && this._map.removeLayer(this._layers[t]), delete this._layers[t], this;
			},
			hasLayer: function(e) {
				return (typeof e == "number" ? e : this.getLayerId(e)) in this._layers;
			},
			clearLayers: function() {
				return this.eachLayer(this.removeLayer, this);
			},
			invoke: function(e) {
				var t = Array.prototype.slice.call(arguments, 1), n, r;
				for (n in this._layers) r = this._layers[n], r[e] && r[e].apply(r, t);
				return this;
			},
			onAdd: function(e) {
				this.eachLayer(e.addLayer, e);
			},
			onRemove: function(e) {
				this.eachLayer(e.removeLayer, e);
			},
			eachLayer: function(e, t) {
				for (var n in this._layers) e.call(t, this._layers[n]);
				return this;
			},
			getLayer: function(e) {
				return this._layers[e];
			},
			getLayers: function() {
				var e = [];
				return this.eachLayer(e.push, e), e;
			},
			setZIndex: function(e) {
				return this.invoke("setZIndex", e);
			},
			getLayerId: function(e) {
				return o(e);
			}
		}), qn = function(e, t) {
			return new Kn(e, t);
		}, Jn = Kn.extend({
			addLayer: function(e) {
				return this.hasLayer(e) ? this : (e.addEventParent(this), Kn.prototype.addLayer.call(this, e), this.fire("layeradd", { layer: e }));
			},
			removeLayer: function(e) {
				return this.hasLayer(e) ? (e in this._layers && (e = this._layers[e]), e.removeEventParent(this), Kn.prototype.removeLayer.call(this, e), this.fire("layerremove", { layer: e })) : this;
			},
			setStyle: function(e) {
				return this.invoke("setStyle", e);
			},
			bringToFront: function() {
				return this.invoke("bringToFront");
			},
			bringToBack: function() {
				return this.invoke("bringToBack");
			},
			getBounds: function() {
				var e = new re();
				for (var t in this._layers) {
					var n = this._layers[t];
					e.extend(n.getBounds ? n.getBounds() : n.getLatLng());
				}
				return e;
			}
		}), Yn = function(e, t) {
			return new Jn(e, t);
		}, Xn = O.extend({
			options: {
				popupAnchor: [0, 0],
				tooltipAnchor: [0, 0],
				crossOrigin: !1
			},
			initialize: function(e) {
				p(this, e);
			},
			createIcon: function(e) {
				return this._createIcon("icon", e);
			},
			createShadow: function(e) {
				return this._createIcon("shadow", e);
			},
			_createIcon: function(e, t) {
				var n = this._getIconUrl(e);
				if (!n) {
					if (e === "icon") throw Error("iconUrl not set in Icon options (see the docs).");
					return null;
				}
				var r = this._createImg(n, t && t.tagName === "IMG" ? t : null);
				return this._setIconStyles(r, e), (this.options.crossOrigin || this.options.crossOrigin === "") && (r.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), r;
			},
			_setIconStyles: function(e, t) {
				var n = this.options, r = n[t + "Size"];
				typeof r == "number" && (r = [r, r]);
				var i = M(r), a = M(t === "shadow" && n.shadowAnchor || n.iconAnchor || i && i.divideBy(2, !0));
				e.className = "leaflet-marker-" + t + " " + (n.className || ""), a && (e.style.marginLeft = -a.x + "px", e.style.marginTop = -a.y + "px"), i && (e.style.width = i.x + "px", e.style.height = i.y + "px");
			},
			_createImg: function(e, t) {
				return t ||= document.createElement("img"), t.src = e, t;
			},
			_getIconUrl: function(e) {
				return z.retina && this.options[e + "RetinaUrl"] || this.options[e + "Url"];
			}
		});
		function Zn(e) {
			return new Xn(e);
		}
		var Qn = Xn.extend({
			options: {
				iconUrl: "marker-icon.png",
				iconRetinaUrl: "marker-icon-2x.png",
				shadowUrl: "marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				tooltipAnchor: [16, -28],
				shadowSize: [41, 41]
			},
			_getIconUrl: function(e) {
				return typeof Qn.imagePath != "string" && (Qn.imagePath = this._detectIconPath()), (this.options.imagePath || Qn.imagePath) + Xn.prototype._getIconUrl.call(this, e);
			},
			_stripUrl: function(e) {
				var t = function(e, t, n) {
					var r = t.exec(e);
					return r && r[n];
				};
				return e = t(e, /^url\((['"])?(.+)\1\)$/, 2), e && t(e, /^(.*)marker-icon\.png$/, 1);
			},
			_detectIconPath: function() {
				var e = V("div", "leaflet-default-icon-path", document.body), t = bt(e, "background-image") || bt(e, "backgroundImage");
				if (document.body.removeChild(e), t = this._stripUrl(t), t) return t;
				var n = document.querySelector("link[href$=\"leaflet.css\"]");
				return n ? n.href.substring(0, n.href.length - 11 - 1) : "";
			}
		}), $n = _n.extend({
			initialize: function(e) {
				this._marker = e;
			},
			addHooks: function() {
				var e = this._marker._icon;
				this._draggable ||= new bn(e, e, !0), this._draggable.on({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).enable(), U(e, "leaflet-marker-draggable");
			},
			removeHooks: function() {
				this._draggable.off({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).disable(), this._marker._icon && Tt(this._marker._icon, "leaflet-marker-draggable");
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			_adjustPan: function(e) {
				var t = this._marker, n = t._map, r = this._marker.options.autoPanSpeed, i = this._marker.options.autoPanPadding, a = Mt(t._icon), o = n.getPixelBounds(), s = n.getPixelOrigin(), c = ne(o.min._subtract(s).add(i), o.max._subtract(s).subtract(i));
				if (!c.contains(a)) {
					var l = M((Math.max(c.max.x, a.x) - c.max.x) / (o.max.x - c.max.x) - (Math.min(c.min.x, a.x) - c.min.x) / (o.min.x - c.min.x), (Math.max(c.max.y, a.y) - c.max.y) / (o.max.y - c.max.y) - (Math.min(c.min.y, a.y) - c.min.y) / (o.min.y - c.min.y)).multiplyBy(r);
					n.panBy(l, { animate: !1 }), this._draggable._newPos._add(l), this._draggable._startPos._add(l), jt(t._icon, this._draggable._newPos), this._onDrag(e), this._panRequest = T(this._adjustPan.bind(this, e));
				}
			},
			_onDragStart: function() {
				this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
			},
			_onPreDrag: function(e) {
				this._marker.options.autoPan && (E(this._panRequest), this._panRequest = T(this._adjustPan.bind(this, e)));
			},
			_onDrag: function(e) {
				var t = this._marker, n = t._shadow, r = Mt(t._icon), i = t._map.layerPointToLatLng(r);
				n && jt(n, r), t._latlng = i, e.latlng = i, e.oldLatLng = this._oldLatLng, t.fire("move", e).fire("drag", e);
			},
			_onDragEnd: function(e) {
				E(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", e);
			}
		}), er = Gn.extend({
			options: {
				icon: new Qn(),
				interactive: !0,
				keyboard: !0,
				title: "",
				alt: "Marker",
				zIndexOffset: 0,
				opacity: 1,
				riseOnHover: !1,
				riseOffset: 250,
				pane: "markerPane",
				shadowPane: "shadowPane",
				bubblingMouseEvents: !1,
				autoPanOnFocus: !0,
				draggable: !1,
				autoPan: !1,
				autoPanPadding: [50, 50],
				autoPanSpeed: 10
			},
			initialize: function(e, t) {
				p(this, t), this._latlng = F(e);
			},
			onAdd: function(e) {
				this._zoomAnimated = this._zoomAnimated && e.options.markerZoomAnimation, this._zoomAnimated && e.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
			},
			onRemove: function(e) {
				this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && e.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
			},
			getEvents: function() {
				return {
					zoom: this.update,
					viewreset: this.update
				};
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(e) {
				var t = this._latlng;
				return this._latlng = F(e), this.update(), this.fire("move", {
					oldLatLng: t,
					latlng: this._latlng
				});
			},
			setZIndexOffset: function(e) {
				return this.options.zIndexOffset = e, this.update();
			},
			getIcon: function() {
				return this.options.icon;
			},
			setIcon: function(e) {
				return this.options.icon = e, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
			},
			getElement: function() {
				return this._icon;
			},
			update: function() {
				if (this._icon && this._map) {
					var e = this._map.latLngToLayerPoint(this._latlng).round();
					this._setPos(e);
				}
				return this;
			},
			_initIcon: function() {
				var e = this.options, t = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), n = e.icon.createIcon(this._icon), r = !1;
				n !== this._icon && (this._icon && this._removeIcon(), r = !0, e.title && (n.title = e.title), n.tagName === "IMG" && (n.alt = e.alt || "")), U(n, t), e.keyboard && (n.tabIndex = "0", n.setAttribute("role", "button")), this._icon = n, e.riseOnHover && this.on({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && J(n, "focus", this._panOnFocus, this);
				var i = e.icon.createShadow(this._shadow), a = !1;
				i !== this._shadow && (this._removeShadow(), a = !0), i && (U(i, t), i.alt = ""), this._shadow = i, e.opacity < 1 && this._updateOpacity(), r && this.getPane().appendChild(this._icon), this._initInteraction(), i && a && this.getPane(e.shadowPane).appendChild(this._shadow);
			},
			_removeIcon: function() {
				this.options.riseOnHover && this.off({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && Y(this._icon, "focus", this._panOnFocus, this), H(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
			},
			_removeShadow: function() {
				this._shadow && H(this._shadow), this._shadow = null;
			},
			_setPos: function(e) {
				this._icon && jt(this._icon, e), this._shadow && jt(this._shadow, e), this._zIndex = e.y + this.options.zIndexOffset, this._resetZIndex();
			},
			_updateZIndex: function(e) {
				this._icon && (this._icon.style.zIndex = this._zIndex + e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center).round();
				this._setPos(t);
			},
			_initInteraction: function() {
				if (this.options.interactive && (U(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), $n)) {
					var e = this.options.draggable;
					this.dragging && (e = this.dragging.enabled(), this.dragging.disable()), this.dragging = new $n(this), e && this.dragging.enable();
				}
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._map && this._updateOpacity(), this;
			},
			_updateOpacity: function() {
				var e = this.options.opacity;
				this._icon && Ot(this._icon, e), this._shadow && Ot(this._shadow, e);
			},
			_bringToFront: function() {
				this._updateZIndex(this.options.riseOffset);
			},
			_resetZIndex: function() {
				this._updateZIndex(0);
			},
			_panOnFocus: function() {
				var e = this._map;
				if (e) {
					var t = this.options.icon.options, n = t.iconSize ? M(t.iconSize) : M(0, 0), r = t.iconAnchor ? M(t.iconAnchor) : M(0, 0);
					e.panInside(this._latlng, {
						paddingTopLeft: r,
						paddingBottomRight: n.subtract(r)
					});
				}
			},
			_getPopupAnchor: function() {
				return this.options.icon.options.popupAnchor;
			},
			_getTooltipAnchor: function() {
				return this.options.icon.options.tooltipAnchor;
			}
		});
		function tr(e, t) {
			return new er(e, t);
		}
		var nr = Gn.extend({
			options: {
				stroke: !0,
				color: "#3388ff",
				weight: 3,
				opacity: 1,
				lineCap: "round",
				lineJoin: "round",
				dashArray: null,
				dashOffset: null,
				fill: !1,
				fillColor: null,
				fillOpacity: .2,
				fillRule: "evenodd",
				interactive: !0,
				bubblingMouseEvents: !0
			},
			beforeAdd: function(e) {
				this._renderer = e.getRenderer(this);
			},
			onAdd: function() {
				this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
			},
			onRemove: function() {
				this._renderer._removePath(this);
			},
			redraw: function() {
				return this._map && this._renderer._updatePath(this), this;
			},
			setStyle: function(e) {
				return p(this, e), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && e && Object.prototype.hasOwnProperty.call(e, "weight") && this._updateBounds()), this;
			},
			bringToFront: function() {
				return this._renderer && this._renderer._bringToFront(this), this;
			},
			bringToBack: function() {
				return this._renderer && this._renderer._bringToBack(this), this;
			},
			getElement: function() {
				return this._path;
			},
			_reset: function() {
				this._project(), this._update();
			},
			_clickTolerance: function() {
				return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
			}
		}), rr = nr.extend({
			options: {
				fill: !0,
				radius: 10
			},
			initialize: function(e, t) {
				p(this, t), this._latlng = F(e), this._radius = this.options.radius;
			},
			setLatLng: function(e) {
				var t = this._latlng;
				return this._latlng = F(e), this.redraw(), this.fire("move", {
					oldLatLng: t,
					latlng: this._latlng
				});
			},
			getLatLng: function() {
				return this._latlng;
			},
			setRadius: function(e) {
				return this.options.radius = this._radius = e, this.redraw();
			},
			getRadius: function() {
				return this._radius;
			},
			setStyle: function(e) {
				var t = e && e.radius || this._radius;
				return nr.prototype.setStyle.call(this, e), this.setRadius(t), this;
			},
			_project: function() {
				this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
			},
			_updateBounds: function() {
				var e = this._radius, t = this._radiusY || e, n = this._clickTolerance(), r = [e + n, t + n];
				this._pxBounds = new N(this._point.subtract(r), this._point.add(r));
			},
			_update: function() {
				this._map && this._updatePath();
			},
			_updatePath: function() {
				this._renderer._updateCircle(this);
			},
			_empty: function() {
				return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
			},
			_containsPoint: function(e) {
				return e.distanceTo(this._point) <= this._radius + this._clickTolerance();
			}
		});
		function ir(e, t) {
			return new rr(e, t);
		}
		var ar = rr.extend({
			initialize: function(e, t, r) {
				if (typeof t == "number" && (t = n({}, r, { radius: t })), p(this, t), this._latlng = F(e), isNaN(this.options.radius)) throw Error("Circle radius cannot be NaN");
				this._mRadius = this.options.radius;
			},
			setRadius: function(e) {
				return this._mRadius = e, this.redraw();
			},
			getRadius: function() {
				return this._mRadius;
			},
			getBounds: function() {
				var e = [this._radius, this._radiusY || this._radius];
				return new re(this._map.layerPointToLatLng(this._point.subtract(e)), this._map.layerPointToLatLng(this._point.add(e)));
			},
			setStyle: nr.prototype.setStyle,
			_project: function() {
				var e = this._latlng.lng, t = this._latlng.lat, n = this._map, r = n.options.crs;
				if (r.distance === oe.distance) {
					var i = Math.PI / 180, a = this._mRadius / oe.R / i, o = n.project([t + a, e]), s = n.project([t - a, e]), c = o.add(s).divideBy(2), l = n.unproject(c).lat, u = Math.acos((Math.cos(a * i) - Math.sin(t * i) * Math.sin(l * i)) / (Math.cos(t * i) * Math.cos(l * i))) / i;
					(isNaN(u) || u === 0) && (u = a / Math.cos(Math.PI / 180 * t)), this._point = c.subtract(n.getPixelOrigin()), this._radius = isNaN(u) ? 0 : c.x - n.project([l, e - u]).x, this._radiusY = c.y - o.y;
				} else {
					var d = r.unproject(r.project(this._latlng).subtract([this._mRadius, 0]));
					this._point = n.latLngToLayerPoint(this._latlng), this._radius = this._point.x - n.latLngToLayerPoint(d).x;
				}
				this._updateBounds();
			}
		});
		function or(e, t, n) {
			return new ar(e, t, n);
		}
		var sr = nr.extend({
			options: {
				smoothFactor: 1,
				noClip: !1
			},
			initialize: function(e, t) {
				p(this, t), this._setLatLngs(e);
			},
			getLatLngs: function() {
				return this._latlngs;
			},
			setLatLngs: function(e) {
				return this._setLatLngs(e), this.redraw();
			},
			isEmpty: function() {
				return !this._latlngs.length;
			},
			closestLayerPoint: function(e) {
				for (var t = Infinity, n = null, r = In, i, a, o = 0, s = this._parts.length; o < s; o++) for (var c = this._parts[o], l = 1, u = c.length; l < u; l++) {
					i = c[l - 1], a = c[l];
					var d = r(e, i, a, !0);
					d < t && (t = d, n = r(e, i, a));
				}
				return n && (n.distance = Math.sqrt(t)), n;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return Q(this._defaultShape(), this._map.options.crs);
			},
			getBounds: function() {
				return this._bounds;
			},
			addLatLng: function(e, t) {
				return t ||= this._defaultShape(), e = F(e), t.push(e), this._bounds.extend(e), this.redraw();
			},
			_setLatLngs: function(e) {
				this._bounds = new re(), this._latlngs = this._convertLatLngs(e);
			},
			_defaultShape: function() {
				return Z(this._latlngs) ? this._latlngs : this._latlngs[0];
			},
			_convertLatLngs: function(e) {
				for (var t = [], n = Z(e), r = 0, i = e.length; r < i; r++) n ? (t[r] = F(e[r]), this._bounds.extend(t[r])) : t[r] = this._convertLatLngs(e[r]);
				return t;
			},
			_project: function() {
				var e = new N();
				this._rings = [], this._projectLatlngs(this._latlngs, this._rings, e), this._bounds.isValid() && e.isValid() && (this._rawPxBounds = e, this._updateBounds());
			},
			_updateBounds: function() {
				var e = this._clickTolerance(), t = new j(e, e);
				this._rawPxBounds && (this._pxBounds = new N([this._rawPxBounds.min.subtract(t), this._rawPxBounds.max.add(t)]));
			},
			_projectLatlngs: function(e, t, n) {
				var r = e[0] instanceof P, i = e.length, a, o;
				if (r) {
					for (o = [], a = 0; a < i; a++) o[a] = this._map.latLngToLayerPoint(e[a]), n.extend(o[a]);
					t.push(o);
				} else for (a = 0; a < i; a++) this._projectLatlngs(e[a], t, n);
			},
			_clipPoints: function() {
				var e = this._renderer._bounds;
				if (this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
					if (this.options.noClip) this._parts = this._rings;
					else for (var t = this._parts, n = 0, r, i = 0, a = this._rings.length, o, s, c; n < a; n++) for (c = this._rings[n], r = 0, o = c.length; r < o - 1; r++) s = Mn(c[r], c[r + 1], e, r, !0), s && (t[i] = t[i] || [], t[i].push(s[0]), (s[1] !== c[r + 1] || r === o - 2) && (t[i].push(s[1]), i++));
				}
			},
			_simplifyPoints: function() {
				for (var e = this._parts, t = this.options.smoothFactor, n = 0, r = e.length; n < r; n++) e[n] = Tn(e[n], t);
			},
			_update: function() {
				this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
			},
			_updatePath: function() {
				this._renderer._updatePoly(this);
			},
			_containsPoint: function(e, t) {
				var n, r, i, a, o, s, c = this._clickTolerance();
				if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
				for (n = 0, a = this._parts.length; n < a; n++) for (s = this._parts[n], r = 0, o = s.length, i = o - 1; r < o; i = r++) if ((t || r !== 0) && En(e, s[i], s[r]) <= c) return !0;
				return !1;
			}
		});
		function cr(e, t) {
			return new sr(e, t);
		}
		sr._flat = Ln;
		var lr = sr.extend({
			options: { fill: !0 },
			isEmpty: function() {
				return !this._latlngs.length || !this._latlngs[0].length;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return Sn(this._defaultShape(), this._map.options.crs);
			},
			_convertLatLngs: function(e) {
				var t = sr.prototype._convertLatLngs.call(this, e), n = t.length;
				return n >= 2 && t[0] instanceof P && t[0].equals(t[n - 1]) && t.pop(), t;
			},
			_setLatLngs: function(e) {
				sr.prototype._setLatLngs.call(this, e), Z(this._latlngs) && (this._latlngs = [this._latlngs]);
			},
			_defaultShape: function() {
				return Z(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
			},
			_clipPoints: function() {
				var e = this._renderer._bounds, t = this.options.weight, n = new j(t, t);
				if (e = new N(e.min.subtract(n), e.max.add(n)), this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
					if (this.options.noClip) this._parts = this._rings;
					else for (var r = 0, i = this._rings.length, a; r < i; r++) a = xn(this._rings[r], e, !0), a.length && this._parts.push(a);
				}
			},
			_updatePath: function() {
				this._renderer._updatePoly(this, !0);
			},
			_containsPoint: function(e) {
				var t = !1, n, r, i, a, o, s, c, l;
				if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
				for (a = 0, c = this._parts.length; a < c; a++) for (n = this._parts[a], o = 0, l = n.length, s = l - 1; o < l; s = o++) r = n[o], i = n[s], r.y > e.y != i.y > e.y && e.x < (i.x - r.x) * (e.y - r.y) / (i.y - r.y) + r.x && (t = !t);
				return t || sr.prototype._containsPoint.call(this, e, !0);
			}
		});
		function ur(e, t) {
			return new lr(e, t);
		}
		var dr = Jn.extend({
			initialize: function(e, t) {
				p(this, t), this._layers = {}, e && this.addData(e);
			},
			addData: function(e) {
				var t = _(e) ? e : e.features, n, r, i;
				if (t) {
					for (n = 0, r = t.length; n < r; n++) i = t[n], (i.geometries || i.geometry || i.features || i.coordinates) && this.addData(i);
					return this;
				}
				var a = this.options;
				if (a.filter && !a.filter(e)) return this;
				var o = fr(e, a);
				return o ? (o.feature = yr(e), o.defaultOptions = o.options, this.resetStyle(o), a.onEachFeature && a.onEachFeature(e, o), this.addLayer(o)) : this;
			},
			resetStyle: function(e) {
				return e === void 0 ? this.eachLayer(this.resetStyle, this) : (e.options = n({}, e.defaultOptions), this._setLayerStyle(e, this.options.style), this);
			},
			setStyle: function(e) {
				return this.eachLayer(function(t) {
					this._setLayerStyle(t, e);
				}, this);
			},
			_setLayerStyle: function(e, t) {
				e.setStyle && (typeof t == "function" && (t = t(e.feature)), e.setStyle(t));
			}
		});
		function fr(e, t) {
			var n = e.type === "Feature" ? e.geometry : e, r = n ? n.coordinates : null, i = [], a = t && t.pointToLayer, o = t && t.coordsToLatLng || mr, s, c, l, u;
			if (!r && !n) return null;
			switch (n.type) {
				case "Point": return s = o(r), pr(a, e, s, t);
				case "MultiPoint":
					for (l = 0, u = r.length; l < u; l++) s = o(r[l]), i.push(pr(a, e, s, t));
					return new Jn(i);
				case "LineString":
				case "MultiLineString": return c = hr(r, n.type === "LineString" ? 0 : 1, o), new sr(c, t);
				case "Polygon":
				case "MultiPolygon": return c = hr(r, n.type === "Polygon" ? 1 : 2, o), new lr(c, t);
				case "GeometryCollection":
					for (l = 0, u = n.geometries.length; l < u; l++) {
						var d = fr({
							geometry: n.geometries[l],
							type: "Feature",
							properties: e.properties
						}, t);
						d && i.push(d);
					}
					return new Jn(i);
				case "FeatureCollection":
					for (l = 0, u = n.features.length; l < u; l++) {
						var f = fr(n.features[l], t);
						f && i.push(f);
					}
					return new Jn(i);
				default: throw Error("Invalid GeoJSON object.");
			}
		}
		function pr(e, t, n, r) {
			return e ? e(t, n) : new er(n, r && r.markersInheritOptions && r);
		}
		function mr(e) {
			return new P(e[1], e[0], e[2]);
		}
		function hr(e, t, n) {
			for (var r = [], i = 0, a = e.length, o; i < a; i++) o = t ? hr(e[i], t - 1, n) : (n || mr)(e[i]), r.push(o);
			return r;
		}
		function gr(e, t) {
			return e = F(e), e.alt === void 0 ? [u(e.lng, t), u(e.lat, t)] : [
				u(e.lng, t),
				u(e.lat, t),
				u(e.alt, t)
			];
		}
		function _r(e, t, n, r) {
			for (var i = [], a = 0, o = e.length; a < o; a++) i.push(t ? _r(e[a], Z(e[a]) ? 0 : t - 1, n, r) : gr(e[a], r));
			return !t && n && i.length > 0 && i.push(i[0].slice()), i;
		}
		function vr(e, t) {
			return e.feature ? n({}, e.feature, { geometry: t }) : yr(t);
		}
		function yr(e) {
			return e.type === "Feature" || e.type === "FeatureCollection" ? e : {
				type: "Feature",
				properties: {},
				geometry: e
			};
		}
		var br = { toGeoJSON: function(e) {
			return vr(this, {
				type: "Point",
				coordinates: gr(this.getLatLng(), e)
			});
		} };
		er.include(br), ar.include(br), rr.include(br), sr.include({ toGeoJSON: function(e) {
			var t = !Z(this._latlngs), n = _r(this._latlngs, +!!t, !1, e);
			return vr(this, {
				type: (t ? "Multi" : "") + "LineString",
				coordinates: n
			});
		} }), lr.include({ toGeoJSON: function(e) {
			var t = !Z(this._latlngs), n = t && !Z(this._latlngs[0]), r = _r(this._latlngs, n ? 2 : +!!t, !0, e);
			return t || (r = [r]), vr(this, {
				type: (n ? "Multi" : "") + "Polygon",
				coordinates: r
			});
		} }), Kn.include({
			toMultiPoint: function(e) {
				var t = [];
				return this.eachLayer(function(n) {
					t.push(n.toGeoJSON(e).geometry.coordinates);
				}), vr(this, {
					type: "MultiPoint",
					coordinates: t
				});
			},
			toGeoJSON: function(e) {
				var t = this.feature && this.feature.geometry && this.feature.geometry.type;
				if (t === "MultiPoint") return this.toMultiPoint(e);
				var n = t === "GeometryCollection", r = [];
				return this.eachLayer(function(t) {
					if (t.toGeoJSON) {
						var i = t.toGeoJSON(e);
						if (n) r.push(i.geometry);
						else {
							var a = yr(i);
							a.type === "FeatureCollection" ? r.push.apply(r, a.features) : r.push(a);
						}
					}
				}), n ? vr(this, {
					geometries: r,
					type: "GeometryCollection"
				}) : {
					type: "FeatureCollection",
					features: r
				};
			}
		});
		function xr(e, t) {
			return new dr(e, t);
		}
		var Sr = xr, Cr = Gn.extend({
			options: {
				opacity: 1,
				alt: "",
				interactive: !1,
				crossOrigin: !1,
				errorOverlayUrl: "",
				zIndex: 1,
				className: ""
			},
			initialize: function(e, t, n) {
				this._url = e, this._bounds = ie(t), p(this, n);
			},
			onAdd: function() {
				this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (U(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
			},
			onRemove: function() {
				H(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._image && this._updateOpacity(), this;
			},
			setStyle: function(e) {
				return e.opacity && this.setOpacity(e.opacity), this;
			},
			bringToFront: function() {
				return this._map && St(this._image), this;
			},
			bringToBack: function() {
				return this._map && Ct(this._image), this;
			},
			setUrl: function(e) {
				return this._url = e, this._image && (this._image.src = e), this;
			},
			setBounds: function(e) {
				return this._bounds = ie(e), this._map && this._reset(), this;
			},
			getEvents: function() {
				var e = {
					zoom: this._reset,
					viewreset: this._reset
				};
				return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			setZIndex: function(e) {
				return this.options.zIndex = e, this._updateZIndex(), this;
			},
			getBounds: function() {
				return this._bounds;
			},
			getElement: function() {
				return this._image;
			},
			_initImage: function() {
				var e = this._url.tagName === "IMG", t = this._image = e ? this._url : V("img");
				U(t, "leaflet-image-layer"), this._zoomAnimated && U(t, "leaflet-zoom-animated"), this.options.className && U(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onload = i(this.fire, this, "load"), t.onerror = i(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (t.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), e ? this._url = t.src : (t.src = this._url, t.alt = this.options.alt);
			},
			_animateZoom: function(e) {
				var t = this._map.getZoomScale(e.zoom), n = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
				W(this._image, n, t);
			},
			_reset: function() {
				var e = this._image, t = new N(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), n = t.getSize();
				jt(e, t.min), e.style.width = n.x + "px", e.style.height = n.y + "px";
			},
			_updateOpacity: function() {
				Ot(this._image, this.options.opacity);
			},
			_updateZIndex: function() {
				this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
			},
			_overlayOnError: function() {
				this.fire("error");
				var e = this.options.errorOverlayUrl;
				e && this._url !== e && (this._url = e, this._image.src = e);
			},
			getCenter: function() {
				return this._bounds.getCenter();
			}
		}), wr = function(e, t, n) {
			return new Cr(e, t, n);
		}, Tr = Cr.extend({
			options: {
				autoplay: !0,
				loop: !0,
				keepAspectRatio: !0,
				muted: !1,
				playsInline: !0
			},
			_initImage: function() {
				var e = this._url.tagName === "VIDEO", t = this._image = e ? this._url : V("video");
				if (U(t, "leaflet-image-layer"), this._zoomAnimated && U(t, "leaflet-zoom-animated"), this.options.className && U(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onloadeddata = i(this.fire, this, "load"), e) {
					for (var n = t.getElementsByTagName("source"), r = [], a = 0; a < n.length; a++) r.push(n[a].src);
					this._url = n.length > 0 ? r : [t.src];
				} else {
					_(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(t.style, "objectFit") && (t.style.objectFit = "fill"), t.autoplay = !!this.options.autoplay, t.loop = !!this.options.loop, t.muted = !!this.options.muted, t.playsInline = !!this.options.playsInline;
					for (var o = 0; o < this._url.length; o++) {
						var s = V("source");
						s.src = this._url[o], t.appendChild(s);
					}
				}
			}
		});
		function Er(e, t, n) {
			return new Tr(e, t, n);
		}
		var Dr = Cr.extend({ _initImage: function() {
			var e = this._image = this._url;
			U(e, "leaflet-image-layer"), this._zoomAnimated && U(e, "leaflet-zoom-animated"), this.options.className && U(e, this.options.className), e.onselectstart = l, e.onmousemove = l;
		} });
		function Or(e, t, n) {
			return new Dr(e, t, n);
		}
		var kr = Gn.extend({
			options: {
				interactive: !1,
				offset: [0, 0],
				className: "",
				pane: void 0,
				content: ""
			},
			initialize: function(e, t) {
				e && (e instanceof P || _(e)) ? (this._latlng = F(e), p(this, t)) : (p(this, e), this._source = t), this.options.content && (this._content = this.options.content);
			},
			openOn: function(e) {
				return e = arguments.length ? e : this._source._map, e.hasLayer(this) || e.addLayer(this), this;
			},
			close: function() {
				return this._map && this._map.removeLayer(this), this;
			},
			toggle: function(e) {
				return this._map ? this.close() : (arguments.length ? this._source = e : e = this._source, this._prepareOpen(), this.openOn(e._map)), this;
			},
			onAdd: function(e) {
				this._zoomAnimated = e._zoomAnimated, this._container || this._initLayout(), e._fadeAnimated && Ot(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), e._fadeAnimated && Ot(this._container, 1), this.bringToFront(), this.options.interactive && (U(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
			},
			onRemove: function(e) {
				e._fadeAnimated ? (Ot(this._container, 0), this._removeTimeout = setTimeout(i(H, void 0, this._container), 200)) : H(this._container), this.options.interactive && (Tt(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(e) {
				return this._latlng = F(e), this._map && (this._updatePosition(), this._adjustPan()), this;
			},
			getContent: function() {
				return this._content;
			},
			setContent: function(e) {
				return this._content = e, this.update(), this;
			},
			getElement: function() {
				return this._container;
			},
			update: function() {
				this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
			},
			getEvents: function() {
				var e = {
					zoom: this._updatePosition,
					viewreset: this._updatePosition
				};
				return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			isOpen: function() {
				return !!this._map && this._map.hasLayer(this);
			},
			bringToFront: function() {
				return this._map && St(this._container), this;
			},
			bringToBack: function() {
				return this._map && Ct(this._container), this;
			},
			_prepareOpen: function(e) {
				var t = this._source;
				if (!t._map) return !1;
				if (t instanceof Jn) {
					t = null;
					var n = this._source._layers;
					for (var r in n) if (n[r]._map) {
						t = n[r];
						break;
					}
					if (!t) return !1;
					this._source = t;
				}
				if (!e) {
					if (t.getCenter) e = t.getCenter();
					else if (t.getLatLng) e = t.getLatLng();
					else if (t.getBounds) e = t.getBounds().getCenter();
					else throw Error("Unable to get source layer LatLng.");
				}
				return this.setLatLng(e), this._map && this.update(), !0;
			},
			_updateContent: function() {
				if (this._content) {
					var e = this._contentNode, t = typeof this._content == "function" ? this._content(this._source || this) : this._content;
					if (typeof t == "string") e.innerHTML = t;
					else {
						for (; e.hasChildNodes();) e.removeChild(e.firstChild);
						e.appendChild(t);
					}
					this.fire("contentupdate");
				}
			},
			_updatePosition: function() {
				if (this._map) {
					var e = this._map.latLngToLayerPoint(this._latlng), t = M(this.options.offset), n = this._getAnchor();
					this._zoomAnimated ? jt(this._container, e.add(n)) : t = t.add(e).add(n);
					var r = this._containerBottom = -t.y, i = this._containerLeft = -Math.round(this._containerWidth / 2) + t.x;
					this._container.style.bottom = r + "px", this._container.style.left = i + "px";
				}
			},
			_getAnchor: function() {
				return [0, 0];
			}
		});
		X.include({ _initOverlay: function(e, t, n, r) {
			var i = t;
			return i instanceof e || (i = new e(r).setContent(t)), n && i.setLatLng(n), i;
		} }), Gn.include({ _initOverlay: function(e, t, n, r) {
			var i = n;
			return i instanceof e ? (p(i, r), i._source = this) : (i = t && !r ? t : new e(r, this), i.setContent(n)), i;
		} });
		var Ar = kr.extend({
			options: {
				pane: "popupPane",
				offset: [0, 7],
				maxWidth: 300,
				minWidth: 50,
				maxHeight: null,
				autoPan: !0,
				autoPanPaddingTopLeft: null,
				autoPanPaddingBottomRight: null,
				autoPanPadding: [5, 5],
				keepInView: !1,
				closeButton: !0,
				autoClose: !0,
				closeOnEscapeKey: !0,
				className: ""
			},
			openOn: function(e) {
				return e = arguments.length ? e : this._source._map, !e.hasLayer(this) && e._popup && e._popup.options.autoClose && e.removeLayer(e._popup), e._popup = this, kr.prototype.openOn.call(this, e);
			},
			onAdd: function(e) {
				kr.prototype.onAdd.call(this, e), e.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof nr || this._source.on("preclick", Jt));
			},
			onRemove: function(e) {
				kr.prototype.onRemove.call(this, e), e.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof nr || this._source.off("preclick", Jt));
			},
			getEvents: function() {
				var e = kr.prototype.getEvents.call(this);
				return (this.options.closeOnClick === void 0 ? this._map.options.closePopupOnClick : this.options.closeOnClick) && (e.preclick = this.close), this.options.keepInView && (e.moveend = this._adjustPan), e;
			},
			_initLayout: function() {
				var e = "leaflet-popup", t = this._container = V("div", e + " " + (this.options.className || "") + " leaflet-zoom-animated"), n = this._wrapper = V("div", e + "-content-wrapper", t);
				if (this._contentNode = V("div", e + "-content", n), Xt(t), Yt(this._contentNode), J(t, "contextmenu", Jt), this._tipContainer = V("div", e + "-tip-container", t), this._tip = V("div", e + "-tip", this._tipContainer), this.options.closeButton) {
					var r = this._closeButton = V("a", e + "-close-button", t);
					r.setAttribute("role", "button"), r.setAttribute("aria-label", "Close popup"), r.href = "#close", r.innerHTML = "<span aria-hidden=\"true\">&#215;</span>", J(r, "click", function(e) {
						Zt(e), this.close();
					}, this);
				}
			},
			_updateLayout: function() {
				var e = this._contentNode, t = e.style;
				t.width = "", t.whiteSpace = "nowrap";
				var n = e.offsetWidth;
				n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), t.width = n + 1 + "px", t.whiteSpace = "", t.height = "";
				var r = e.offsetHeight, i = this.options.maxHeight, a = "leaflet-popup-scrolled";
				i && r > i ? (t.height = i + "px", U(e, a)) : Tt(e, a), this._containerWidth = this._container.offsetWidth;
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), n = this._getAnchor();
				jt(this._container, t.add(n));
			},
			_adjustPan: function() {
				if (this.options.autoPan) {
					if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) this._autopanning = !1;
					else {
						var e = this._map, t = parseInt(bt(this._container, "marginBottom"), 10) || 0, n = this._container.offsetHeight + t, r = this._containerWidth, i = new j(this._containerLeft, -n - this._containerBottom);
						i._add(Mt(this._container));
						var a = e.layerPointToContainerPoint(i), o = M(this.options.autoPanPadding), s = M(this.options.autoPanPaddingTopLeft || o), c = M(this.options.autoPanPaddingBottomRight || o), l = e.getSize(), u = 0, d = 0;
						a.x + r + c.x > l.x && (u = a.x + r - l.x + c.x), a.x - u - s.x < 0 && (u = a.x - s.x), a.y + n + c.y > l.y && (d = a.y + n - l.y + c.y), a.y - d - s.y < 0 && (d = a.y - s.y), (u || d) && (this.options.keepInView && (this._autopanning = !0), e.fire("autopanstart").panBy([u, d]));
					}
				}
			},
			_getAnchor: function() {
				return M(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
			}
		}), jr = function(e, t) {
			return new Ar(e, t);
		};
		X.mergeOptions({ closePopupOnClick: !0 }), X.include({
			openPopup: function(e, t, n) {
				return this._initOverlay(Ar, e, t, n).openOn(this), this;
			},
			closePopup: function(e) {
				return e = arguments.length ? e : this._popup, e && e.close(), this;
			}
		}), Gn.include({
			bindPopup: function(e, t) {
				return this._popup = this._initOverlay(Ar, this._popup, e, t), this._popupHandlersAdded ||= (this.on({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				}), !0), this;
			},
			unbindPopup: function() {
				return this._popup &&= (this.off({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				}), this._popupHandlersAdded = !1, null), this;
			},
			openPopup: function(e) {
				return this._popup && (this instanceof Jn || (this._popup._source = this), this._popup._prepareOpen(e || this._latlng) && this._popup.openOn(this._map)), this;
			},
			closePopup: function() {
				return this._popup && this._popup.close(), this;
			},
			togglePopup: function() {
				return this._popup && this._popup.toggle(this), this;
			},
			isPopupOpen: function() {
				return this._popup ? this._popup.isOpen() : !1;
			},
			setPopupContent: function(e) {
				return this._popup && this._popup.setContent(e), this;
			},
			getPopup: function() {
				return this._popup;
			},
			_openPopup: function(e) {
				if (this._popup && this._map) {
					Qt(e);
					var t = e.layer || e.target;
					this._popup._source === t && !(t instanceof nr) ? this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(e.latlng) : (this._popup._source = t, this.openPopup(e.latlng));
				}
			},
			_movePopup: function(e) {
				this._popup.setLatLng(e.latlng);
			},
			_onKeyPress: function(e) {
				e.originalEvent.keyCode === 13 && this._openPopup(e);
			}
		});
		var Mr = kr.extend({
			options: {
				pane: "tooltipPane",
				offset: [0, 0],
				direction: "auto",
				permanent: !1,
				sticky: !1,
				opacity: .9
			},
			onAdd: function(e) {
				kr.prototype.onAdd.call(this, e), this.setOpacity(this.options.opacity), e.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
			},
			onRemove: function(e) {
				kr.prototype.onRemove.call(this, e), e.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
			},
			getEvents: function() {
				var e = kr.prototype.getEvents.call(this);
				return this.options.permanent || (e.preclick = this.close), e;
			},
			_initLayout: function() {
				var e = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
				this._contentNode = this._container = V("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + o(this));
			},
			_updateLayout: function() {},
			_adjustPan: function() {},
			_setPosition: function(e) {
				var t, n, r = this._map, i = this._container, a = r.latLngToContainerPoint(r.getCenter()), o = r.layerPointToContainerPoint(e), s = this.options.direction, c = i.offsetWidth, l = i.offsetHeight, u = M(this.options.offset), d = this._getAnchor();
				s === "top" ? (t = c / 2, n = l) : s === "bottom" ? (t = c / 2, n = 0) : s === "center" ? (t = c / 2, n = l / 2) : s === "right" ? (t = 0, n = l / 2) : s === "left" ? (t = c, n = l / 2) : o.x < a.x ? (s = "right", t = 0, n = l / 2) : (s = "left", t = c + (u.x + d.x) * 2, n = l / 2), e = e.subtract(M(t, n, !0)).add(u).add(d), Tt(i, "leaflet-tooltip-right"), Tt(i, "leaflet-tooltip-left"), Tt(i, "leaflet-tooltip-top"), Tt(i, "leaflet-tooltip-bottom"), U(i, "leaflet-tooltip-" + s), jt(i, e);
			},
			_updatePosition: function() {
				var e = this._map.latLngToLayerPoint(this._latlng);
				this._setPosition(e);
			},
			setOpacity: function(e) {
				this.options.opacity = e, this._container && Ot(this._container, e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
				this._setPosition(t);
			},
			_getAnchor: function() {
				return M(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
			}
		}), Nr = function(e, t) {
			return new Mr(e, t);
		};
		X.include({
			openTooltip: function(e, t, n) {
				return this._initOverlay(Mr, e, t, n).openOn(this), this;
			},
			closeTooltip: function(e) {
				return e.close(), this;
			}
		}), Gn.include({
			bindTooltip: function(e, t) {
				return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Mr, this._tooltip, e, t), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
			},
			unbindTooltip: function() {
				return this._tooltip &&= (this._initTooltipInteractions(!0), this.closeTooltip(), null), this;
			},
			_initTooltipInteractions: function(e) {
				if (e || !this._tooltipHandlersAdded) {
					var t = e ? "off" : "on", n = {
						remove: this.closeTooltip,
						move: this._moveTooltip
					};
					this._tooltip.options.permanent ? n.add = this._openTooltip : (n.mouseover = this._openTooltip, n.mouseout = this.closeTooltip, n.click = this._openTooltip, this._map ? this._addFocusListeners() : n.add = this._addFocusListeners), this._tooltip.options.sticky && (n.mousemove = this._moveTooltip), this[t](n), this._tooltipHandlersAdded = !e;
				}
			},
			openTooltip: function(e) {
				return this._tooltip && (this instanceof Jn || (this._tooltip._source = this), this._tooltip._prepareOpen(e) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
			},
			closeTooltip: function() {
				if (this._tooltip) return this._tooltip.close();
			},
			toggleTooltip: function() {
				return this._tooltip && this._tooltip.toggle(this), this;
			},
			isTooltipOpen: function() {
				return this._tooltip.isOpen();
			},
			setTooltipContent: function(e) {
				return this._tooltip && this._tooltip.setContent(e), this;
			},
			getTooltip: function() {
				return this._tooltip;
			},
			_addFocusListeners: function() {
				this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
			},
			_addFocusListenersOnLayer: function(e) {
				var t = typeof e.getElement == "function" && e.getElement();
				t && (J(t, "focus", function() {
					this._tooltip._source = e, this.openTooltip();
				}, this), J(t, "blur", this.closeTooltip, this));
			},
			_setAriaDescribedByOnLayer: function(e) {
				var t = typeof e.getElement == "function" && e.getElement();
				t && t.setAttribute("aria-describedby", this._tooltip._container.id);
			},
			_openTooltip: function(e) {
				if (this._tooltip && this._map) {
					if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
						this._openOnceFlag = !0;
						var t = this;
						this._map.once("moveend", function() {
							t._openOnceFlag = !1, t._openTooltip(e);
						});
					} else this._tooltip._source = e.layer || e.target, this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
				}
			},
			_moveTooltip: function(e) {
				var t = e.latlng, n, r;
				this._tooltip.options.sticky && e.originalEvent && (n = this._map.mouseEventToContainerPoint(e.originalEvent), r = this._map.containerPointToLayerPoint(n), t = this._map.layerPointToLatLng(r)), this._tooltip.setLatLng(t);
			}
		});
		var Pr = Xn.extend({
			options: {
				iconSize: [12, 12],
				html: !1,
				bgPos: null,
				className: "leaflet-div-icon"
			},
			createIcon: function(e) {
				var t = e && e.tagName === "DIV" ? e : document.createElement("div"), n = this.options;
				if (n.html instanceof Element ? (xt(t), t.appendChild(n.html)) : t.innerHTML = n.html === !1 ? "" : n.html, n.bgPos) {
					var r = M(n.bgPos);
					t.style.backgroundPosition = -r.x + "px " + -r.y + "px";
				}
				return this._setIconStyles(t, "icon"), t;
			},
			createShadow: function() {
				return null;
			}
		});
		function Fr(e) {
			return new Pr(e);
		}
		Xn.Default = Qn;
		var Ir = Gn.extend({
			options: {
				tileSize: 256,
				opacity: 1,
				updateWhenIdle: z.mobile,
				updateWhenZooming: !0,
				updateInterval: 200,
				zIndex: 1,
				bounds: null,
				minZoom: 0,
				maxZoom: void 0,
				maxNativeZoom: void 0,
				minNativeZoom: void 0,
				noWrap: !1,
				pane: "tilePane",
				className: "",
				keepBuffer: 2
			},
			initialize: function(e) {
				p(this, e);
			},
			onAdd: function() {
				this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
			},
			beforeAdd: function(e) {
				e._addZoomLimit(this);
			},
			onRemove: function(e) {
				this._removeAllTiles(), H(this._container), e._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
			},
			bringToFront: function() {
				return this._map && (St(this._container), this._setAutoZIndex(Math.max)), this;
			},
			bringToBack: function() {
				return this._map && (Ct(this._container), this._setAutoZIndex(Math.min)), this;
			},
			getContainer: function() {
				return this._container;
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._updateOpacity(), this;
			},
			setZIndex: function(e) {
				return this.options.zIndex = e, this._updateZIndex(), this;
			},
			isLoading: function() {
				return this._loading;
			},
			redraw: function() {
				if (this._map) {
					this._removeAllTiles();
					var e = this._clampZoom(this._map.getZoom());
					e !== this._tileZoom && (this._tileZoom = e, this._updateLevels()), this._update();
				}
				return this;
			},
			getEvents: function() {
				var e = {
					viewprereset: this._invalidateAll,
					viewreset: this._resetView,
					zoom: this._resetView,
					moveend: this._onMoveEnd
				};
				return this.options.updateWhenIdle || (this._onMove ||= s(this._onMoveEnd, this.options.updateInterval, this), e.move = this._onMove), this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			createTile: function() {
				return document.createElement("div");
			},
			getTileSize: function() {
				var e = this.options.tileSize;
				return e instanceof j ? e : new j(e, e);
			},
			_updateZIndex: function() {
				this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
			},
			_setAutoZIndex: function(e) {
				for (var t = this.getPane().children, n = -e(-Infinity, Infinity), r = 0, i = t.length, a; r < i; r++) a = t[r].style.zIndex, t[r] !== this._container && a && (n = e(n, +a));
				isFinite(n) && (this.options.zIndex = n + e(-1, 1), this._updateZIndex());
			},
			_updateOpacity: function() {
				if (this._map && !z.ielt9) {
					Ot(this._container, this.options.opacity);
					var e = +/* @__PURE__ */ new Date(), t = !1, n = !1;
					for (var r in this._tiles) {
						var i = this._tiles[r];
						if (i.current && i.loaded) {
							var a = Math.min(1, (e - i.loaded) / 200);
							Ot(i.el, a), a < 1 ? t = !0 : (i.active ? n = !0 : this._onOpaqueTile(i), i.active = !0);
						}
					}
					n && !this._noPrune && this._pruneTiles(), t && (E(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this));
				}
			},
			_onOpaqueTile: l,
			_initContainer: function() {
				this._container || (this._container = V("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
			},
			_updateLevels: function() {
				var e = this._tileZoom, t = this.options.maxZoom;
				if (e !== void 0) {
					for (var n in this._levels) n = Number(n), this._levels[n].el.children.length || n === e ? (this._levels[n].el.style.zIndex = t - Math.abs(e - n), this._onUpdateLevel(n)) : (H(this._levels[n].el), this._removeTilesAtZoom(n), this._onRemoveLevel(n), delete this._levels[n]);
					var r = this._levels[e], i = this._map;
					return r || (r = this._levels[e] = {}, r.el = V("div", "leaflet-tile-container leaflet-zoom-animated", this._container), r.el.style.zIndex = t, r.origin = i.project(i.unproject(i.getPixelOrigin()), e).round(), r.zoom = e, this._setZoomTransform(r, i.getCenter(), i.getZoom()), r.el.offsetWidth, this._onCreateLevel(r)), this._level = r, r;
				}
			},
			_onUpdateLevel: l,
			_onRemoveLevel: l,
			_onCreateLevel: l,
			_pruneTiles: function() {
				if (this._map) {
					var e, t, n = this._map.getZoom();
					if (n > this.options.maxZoom || n < this.options.minZoom) this._removeAllTiles();
					else {
						for (e in this._tiles) t = this._tiles[e], t.retain = t.current;
						for (e in this._tiles) if (t = this._tiles[e], t.current && !t.active) {
							var r = t.coords;
							this._retainParent(r.x, r.y, r.z, r.z - 5) || this._retainChildren(r.x, r.y, r.z, r.z + 2);
						}
						for (e in this._tiles) this._tiles[e].retain || this._removeTile(e);
					}
				}
			},
			_removeTilesAtZoom: function(e) {
				for (var t in this._tiles) this._tiles[t].coords.z === e && this._removeTile(t);
			},
			_removeAllTiles: function() {
				for (var e in this._tiles) this._removeTile(e);
			},
			_invalidateAll: function() {
				for (var e in this._levels) H(this._levels[e].el), this._onRemoveLevel(Number(e)), delete this._levels[e];
				this._removeAllTiles(), this._tileZoom = void 0;
			},
			_retainParent: function(e, t, n, r) {
				var i = Math.floor(e / 2), a = Math.floor(t / 2), o = n - 1, s = new j(+i, +a);
				s.z = +o;
				var c = this._tileCoordsToKey(s), l = this._tiles[c];
				return l && l.active ? (l.retain = !0, !0) : (l && l.loaded && (l.retain = !0), o > r && this._retainParent(i, a, o, r));
			},
			_retainChildren: function(e, t, n, r) {
				for (var i = 2 * e; i < 2 * e + 2; i++) for (var a = 2 * t; a < 2 * t + 2; a++) {
					var o = new j(i, a);
					o.z = n + 1;
					var s = this._tileCoordsToKey(o), c = this._tiles[s];
					c && c.active ? c.retain = !0 : (c && c.loaded && (c.retain = !0), n + 1 < r && this._retainChildren(i, a, n + 1, r));
				}
			},
			_resetView: function(e) {
				var t = e && (e.pinch || e.flyTo);
				this._setView(this._map.getCenter(), this._map.getZoom(), t, t);
			},
			_animateZoom: function(e) {
				this._setView(e.center, e.zoom, !0, e.noUpdate);
			},
			_clampZoom: function(e) {
				var t = this.options;
				return t.minNativeZoom !== void 0 && e < t.minNativeZoom ? t.minNativeZoom : t.maxNativeZoom !== void 0 && t.maxNativeZoom < e ? t.maxNativeZoom : e;
			},
			_setView: function(e, t, n, r) {
				var i = Math.round(t);
				i = this.options.maxZoom !== void 0 && i > this.options.maxZoom || this.options.minZoom !== void 0 && i < this.options.minZoom ? void 0 : this._clampZoom(i);
				var a = this.options.updateWhenZooming && i !== this._tileZoom;
				(!r || a) && (this._tileZoom = i, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), i !== void 0 && this._update(e), n || this._pruneTiles(), this._noPrune = !!n), this._setZoomTransforms(e, t);
			},
			_setZoomTransforms: function(e, t) {
				for (var n in this._levels) this._setZoomTransform(this._levels[n], e, t);
			},
			_setZoomTransform: function(e, t, n) {
				var r = this._map.getZoomScale(n, e.zoom), i = e.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(t, n)).round();
				z.any3d ? W(e.el, i, r) : jt(e.el, i);
			},
			_resetGrid: function() {
				var e = this._map, t = e.options.crs, n = this._tileSize = this.getTileSize(), r = this._tileZoom, i = this._map.getPixelWorldBounds(this._tileZoom);
				i && (this._globalTileRange = this._pxBoundsToTileRange(i)), this._wrapX = t.wrapLng && !this.options.noWrap && [Math.floor(e.project([0, t.wrapLng[0]], r).x / n.x), Math.ceil(e.project([0, t.wrapLng[1]], r).x / n.y)], this._wrapY = t.wrapLat && !this.options.noWrap && [Math.floor(e.project([t.wrapLat[0], 0], r).y / n.x), Math.ceil(e.project([t.wrapLat[1], 0], r).y / n.y)];
			},
			_onMoveEnd: function() {
				this._map && !this._map._animatingZoom && this._update();
			},
			_getTiledPixelBounds: function(e) {
				var t = this._map, n = t._animatingZoom ? Math.max(t._animateToZoom, t.getZoom()) : t.getZoom(), r = t.getZoomScale(n, this._tileZoom), i = t.project(e, this._tileZoom).floor(), a = t.getSize().divideBy(r * 2);
				return new N(i.subtract(a), i.add(a));
			},
			_update: function(e) {
				var t = this._map;
				if (t) {
					var n = this._clampZoom(t.getZoom());
					if (e === void 0 && (e = t.getCenter()), this._tileZoom !== void 0) {
						var r = this._getTiledPixelBounds(e), i = this._pxBoundsToTileRange(r), a = i.getCenter(), o = [], s = this.options.keepBuffer, c = new N(i.getBottomLeft().subtract([s, -s]), i.getTopRight().add([s, -s]));
						if (!(isFinite(i.min.x) && isFinite(i.min.y) && isFinite(i.max.x) && isFinite(i.max.y))) throw Error("Attempted to load an infinite number of tiles");
						for (var l in this._tiles) {
							var u = this._tiles[l].coords;
							u.z === this._tileZoom && c.contains(new j(u.x, u.y)) || (this._tiles[l].current = !1);
						}
						if (Math.abs(n - this._tileZoom) > 1) this._setView(e, n);
						else {
							for (var d = i.min.y; d <= i.max.y; d++) for (var f = i.min.x; f <= i.max.x; f++) {
								var p = new j(f, d);
								if (p.z = this._tileZoom, this._isValidTile(p)) {
									var m = this._tiles[this._tileCoordsToKey(p)];
									m ? m.current = !0 : o.push(p);
								}
							}
							if (o.sort(function(e, t) {
								return e.distanceTo(a) - t.distanceTo(a);
							}), o.length !== 0) {
								this._loading || (this._loading = !0, this.fire("loading"));
								var h = document.createDocumentFragment();
								for (f = 0; f < o.length; f++) this._addTile(o[f], h);
								this._level.el.appendChild(h);
							}
						}
					}
				}
			},
			_isValidTile: function(e) {
				var t = this._map.options.crs;
				if (!t.infinite) {
					var n = this._globalTileRange;
					if (!t.wrapLng && (e.x < n.min.x || e.x > n.max.x) || !t.wrapLat && (e.y < n.min.y || e.y > n.max.y)) return !1;
				}
				if (!this.options.bounds) return !0;
				var r = this._tileCoordsToBounds(e);
				return ie(this.options.bounds).overlaps(r);
			},
			_keyToBounds: function(e) {
				return this._tileCoordsToBounds(this._keyToTileCoords(e));
			},
			_tileCoordsToNwSe: function(e) {
				var t = this._map, n = this.getTileSize(), r = e.scaleBy(n), i = r.add(n);
				return [t.unproject(r, e.z), t.unproject(i, e.z)];
			},
			_tileCoordsToBounds: function(e) {
				var t = this._tileCoordsToNwSe(e), n = new re(t[0], t[1]);
				return this.options.noWrap || (n = this._map.wrapLatLngBounds(n)), n;
			},
			_tileCoordsToKey: function(e) {
				return e.x + ":" + e.y + ":" + e.z;
			},
			_keyToTileCoords: function(e) {
				var t = e.split(":"), n = new j(+t[0], +t[1]);
				return n.z = +t[2], n;
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				t && (H(t.el), delete this._tiles[e], this.fire("tileunload", {
					tile: t.el,
					coords: this._keyToTileCoords(e)
				}));
			},
			_initTile: function(e) {
				U(e, "leaflet-tile");
				var t = this.getTileSize();
				e.style.width = t.x + "px", e.style.height = t.y + "px", e.onselectstart = l, e.onmousemove = l, z.ielt9 && this.options.opacity < 1 && Ot(e, this.options.opacity);
			},
			_addTile: function(e, t) {
				var n = this._getTilePos(e), r = this._tileCoordsToKey(e), a = this.createTile(this._wrapCoords(e), i(this._tileReady, this, e));
				this._initTile(a), this.createTile.length < 2 && T(i(this._tileReady, this, e, null, a)), jt(a, n), this._tiles[r] = {
					el: a,
					coords: e,
					current: !0
				}, t.appendChild(a), this.fire("tileloadstart", {
					tile: a,
					coords: e
				});
			},
			_tileReady: function(e, t, n) {
				t && this.fire("tileerror", {
					error: t,
					tile: n,
					coords: e
				});
				var r = this._tileCoordsToKey(e);
				n = this._tiles[r], n && (n.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (Ot(n.el, 0), E(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), t || (U(n.el, "leaflet-tile-loaded"), this.fire("tileload", {
					tile: n.el,
					coords: e
				})), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), z.ielt9 || !this._map._fadeAnimated ? T(this._pruneTiles, this) : setTimeout(i(this._pruneTiles, this), 250)));
			},
			_getTilePos: function(e) {
				return e.scaleBy(this.getTileSize()).subtract(this._level.origin);
			},
			_wrapCoords: function(e) {
				var t = new j(this._wrapX ? c(e.x, this._wrapX) : e.x, this._wrapY ? c(e.y, this._wrapY) : e.y);
				return t.z = e.z, t;
			},
			_pxBoundsToTileRange: function(e) {
				var t = this.getTileSize();
				return new N(e.min.unscaleBy(t).floor(), e.max.unscaleBy(t).ceil().subtract([1, 1]));
			},
			_noTilesToLoad: function() {
				for (var e in this._tiles) if (!this._tiles[e].loaded) return !1;
				return !0;
			}
		});
		function Lr(e) {
			return new Ir(e);
		}
		var Rr = Ir.extend({
			options: {
				minZoom: 0,
				maxZoom: 18,
				subdomains: "abc",
				errorTileUrl: "",
				zoomOffset: 0,
				tms: !1,
				zoomReverse: !1,
				detectRetina: !1,
				crossOrigin: !1,
				referrerPolicy: !1
			},
			initialize: function(e, t) {
				this._url = e, t = p(this, t), t.detectRetina && z.retina && t.maxZoom > 0 ? (t.tileSize = Math.floor(t.tileSize / 2), t.zoomReverse ? (t.zoomOffset--, t.minZoom = Math.min(t.maxZoom, t.minZoom + 1)) : (t.zoomOffset++, t.maxZoom = Math.max(t.minZoom, t.maxZoom - 1)), t.minZoom = Math.max(0, t.minZoom)) : t.zoomReverse ? t.minZoom = Math.min(t.maxZoom, t.minZoom) : t.maxZoom = Math.max(t.minZoom, t.maxZoom), typeof t.subdomains == "string" && (t.subdomains = t.subdomains.split("")), this.on("tileunload", this._onTileRemove);
			},
			setUrl: function(e, t) {
				return this._url === e && t === void 0 && (t = !0), this._url = e, t || this.redraw(), this;
			},
			createTile: function(e, t) {
				var n = document.createElement("img");
				return J(n, "load", i(this._tileOnLoad, this, t, n)), J(n, "error", i(this._tileOnError, this, t, n)), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (n.referrerPolicy = this.options.referrerPolicy), n.alt = "", n.src = this.getTileUrl(e), n;
			},
			getTileUrl: function(e) {
				var t = {
					r: z.retina ? "@2x" : "",
					s: this._getSubdomain(e),
					x: e.x,
					y: e.y,
					z: this._getZoomForUrl()
				};
				if (this._map && !this._map.options.crs.infinite) {
					var r = this._globalTileRange.max.y - e.y;
					this.options.tms && (t.y = r), t["-y"] = r;
				}
				return g(this._url, n(t, this.options));
			},
			_tileOnLoad: function(e, t) {
				z.ielt9 ? setTimeout(i(e, this, null, t), 0) : e(null, t);
			},
			_tileOnError: function(e, t, n) {
				var r = this.options.errorTileUrl;
				r && t.getAttribute("src") !== r && (t.src = r), e(n, t);
			},
			_onTileRemove: function(e) {
				e.tile.onload = null;
			},
			_getZoomForUrl: function() {
				var e = this._tileZoom, t = this.options.maxZoom, n = this.options.zoomReverse, r = this.options.zoomOffset;
				return n && (e = t - e), e + r;
			},
			_getSubdomain: function(e) {
				var t = Math.abs(e.x + e.y) % this.options.subdomains.length;
				return this.options.subdomains[t];
			},
			_abortLoading: function() {
				var e, t;
				for (e in this._tiles) if (this._tiles[e].coords.z !== this._tileZoom && (t = this._tiles[e].el, t.onload = l, t.onerror = l, !t.complete)) {
					t.src = y;
					var n = this._tiles[e].coords;
					H(t), delete this._tiles[e], this.fire("tileabort", {
						tile: t,
						coords: n
					});
				}
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				if (t) return t.el.setAttribute("src", y), Ir.prototype._removeTile.call(this, e);
			},
			_tileReady: function(e, t, n) {
				if (!(!this._map || n && n.getAttribute("src") === y)) return Ir.prototype._tileReady.call(this, e, t, n);
			}
		});
		function zr(e, t) {
			return new Rr(e, t);
		}
		var Br = Rr.extend({
			defaultWmsParams: {
				service: "WMS",
				request: "GetMap",
				layers: "",
				styles: "",
				format: "image/jpeg",
				transparent: !1,
				version: "1.1.1"
			},
			options: {
				crs: null,
				uppercase: !1
			},
			initialize: function(e, t) {
				this._url = e;
				var r = n({}, this.defaultWmsParams);
				for (var i in t) i in this.options || (r[i] = t[i]);
				t = p(this, t);
				var a = t.detectRetina && z.retina ? 2 : 1, o = this.getTileSize();
				r.width = o.x * a, r.height = o.y * a, this.wmsParams = r;
			},
			onAdd: function(e) {
				this._crs = this.options.crs || e.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
				var t = this._wmsVersion >= 1.3 ? "crs" : "srs";
				this.wmsParams[t] = this._crs.code, Rr.prototype.onAdd.call(this, e);
			},
			getTileUrl: function(e) {
				var t = this._tileCoordsToNwSe(e), n = this._crs, r = ne(n.project(t[0]), n.project(t[1])), i = r.min, a = r.max, o = (this._wmsVersion >= 1.3 && this._crs === Un ? [
					i.y,
					i.x,
					a.y,
					a.x
				] : [
					i.x,
					i.y,
					a.x,
					a.y
				]).join(","), s = Rr.prototype.getTileUrl.call(this, e);
				return s + m(this.wmsParams, s, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + o;
			},
			setParams: function(e, t) {
				return n(this.wmsParams, e), t || this.redraw(), this;
			}
		});
		function Vr(e, t) {
			return new Br(e, t);
		}
		Rr.WMS = Br, zr.wms = Vr;
		var Hr = Gn.extend({
			options: { padding: .1 },
			initialize: function(e) {
				p(this, e), o(this), this._layers = this._layers || {};
			},
			onAdd: function() {
				this._container || (this._initContainer(), U(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
			},
			onRemove: function() {
				this.off("update", this._updatePaths, this), this._destroyContainer();
			},
			getEvents: function() {
				var e = {
					viewreset: this._reset,
					zoom: this._onZoom,
					moveend: this._update,
					zoomend: this._onZoomEnd
				};
				return this._zoomAnimated && (e.zoomanim = this._onAnimZoom), e;
			},
			_onAnimZoom: function(e) {
				this._updateTransform(e.center, e.zoom);
			},
			_onZoom: function() {
				this._updateTransform(this._map.getCenter(), this._map.getZoom());
			},
			_updateTransform: function(e, t) {
				var n = this._map.getZoomScale(t, this._zoom), r = this._map.getSize().multiplyBy(.5 + this.options.padding), i = this._map.project(this._center, t), a = r.multiplyBy(-n).add(i).subtract(this._map._getNewPixelOrigin(e, t));
				z.any3d ? W(this._container, a, n) : jt(this._container, a);
			},
			_reset: function() {
				for (var e in this._update(), this._updateTransform(this._center, this._zoom), this._layers) this._layers[e]._reset();
			},
			_onZoomEnd: function() {
				for (var e in this._layers) this._layers[e]._project();
			},
			_updatePaths: function() {
				for (var e in this._layers) this._layers[e]._update();
			},
			_update: function() {
				var e = this.options.padding, t = this._map.getSize(), n = this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();
				this._bounds = new N(n, n.add(t.multiplyBy(1 + e * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
			}
		}), Ur = Hr.extend({
			options: { tolerance: 0 },
			getEvents: function() {
				var e = Hr.prototype.getEvents.call(this);
				return e.viewprereset = this._onViewPreReset, e;
			},
			_onViewPreReset: function() {
				this._postponeUpdatePaths = !0;
			},
			onAdd: function() {
				Hr.prototype.onAdd.call(this), this._draw();
			},
			_initContainer: function() {
				var e = this._container = document.createElement("canvas");
				J(e, "mousemove", this._onMouseMove, this), J(e, "click dblclick mousedown mouseup contextmenu", this._onClick, this), J(e, "mouseout", this._handleMouseOut, this), e._leaflet_disable_events = !0, this._ctx = e.getContext("2d");
			},
			_destroyContainer: function() {
				E(this._redrawRequest), delete this._ctx, H(this._container), Y(this._container), delete this._container;
			},
			_updatePaths: function() {
				if (!this._postponeUpdatePaths) {
					var e;
					for (var t in this._redrawBounds = null, this._layers) e = this._layers[t], e._update();
					this._redraw();
				}
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					Hr.prototype._update.call(this);
					var e = this._bounds, t = this._container, n = e.getSize(), r = z.retina ? 2 : 1;
					jt(t, e.min), t.width = r * n.x, t.height = r * n.y, t.style.width = n.x + "px", t.style.height = n.y + "px", z.retina && this._ctx.scale(2, 2), this._ctx.translate(-e.min.x, -e.min.y), this.fire("update");
				}
			},
			_reset: function() {
				Hr.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
			},
			_initPath: function(e) {
				this._updateDashArray(e), this._layers[o(e)] = e;
				var t = e._order = {
					layer: e,
					prev: this._drawLast,
					next: null
				};
				this._drawLast && (this._drawLast.next = t), this._drawLast = t, this._drawFirst = this._drawFirst || this._drawLast;
			},
			_addPath: function(e) {
				this._requestRedraw(e);
			},
			_removePath: function(e) {
				var t = e._order, n = t.next, r = t.prev;
				n ? n.prev = r : this._drawLast = r, r ? r.next = n : this._drawFirst = n, delete e._order, delete this._layers[o(e)], this._requestRedraw(e);
			},
			_updatePath: function(e) {
				this._extendRedrawBounds(e), e._project(), e._update(), this._requestRedraw(e);
			},
			_updateStyle: function(e) {
				this._updateDashArray(e), this._requestRedraw(e);
			},
			_updateDashArray: function(e) {
				if (typeof e.options.dashArray == "string") {
					for (var t = e.options.dashArray.split(/[, ]+/), n = [], r, i = 0; i < t.length; i++) {
						if (r = Number(t[i]), isNaN(r)) return;
						n.push(r);
					}
					e.options._dashArray = n;
				} else e.options._dashArray = e.options.dashArray;
			},
			_requestRedraw: function(e) {
				this._map && (this._extendRedrawBounds(e), this._redrawRequest = this._redrawRequest || T(this._redraw, this));
			},
			_extendRedrawBounds: function(e) {
				if (e._pxBounds) {
					var t = (e.options.weight || 0) + 1;
					this._redrawBounds = this._redrawBounds || new N(), this._redrawBounds.extend(e._pxBounds.min.subtract([t, t])), this._redrawBounds.extend(e._pxBounds.max.add([t, t]));
				}
			},
			_redraw: function() {
				this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
			},
			_clear: function() {
				var e = this._redrawBounds;
				if (e) {
					var t = e.getSize();
					this._ctx.clearRect(e.min.x, e.min.y, t.x, t.y);
				} else this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
			},
			_draw: function() {
				var e, t = this._redrawBounds;
				if (this._ctx.save(), t) {
					var n = t.getSize();
					this._ctx.beginPath(), this._ctx.rect(t.min.x, t.min.y, n.x, n.y), this._ctx.clip();
				}
				this._drawing = !0;
				for (var r = this._drawFirst; r; r = r.next) e = r.layer, (!t || e._pxBounds && e._pxBounds.intersects(t)) && e._updatePath();
				this._drawing = !1, this._ctx.restore();
			},
			_updatePoly: function(e, t) {
				if (this._drawing) {
					var n, r, i, a, o = e._parts, s = o.length, c = this._ctx;
					if (s) {
						for (c.beginPath(), n = 0; n < s; n++) {
							for (r = 0, i = o[n].length; r < i; r++) a = o[n][r], c[r ? "lineTo" : "moveTo"](a.x, a.y);
							t && c.closePath();
						}
						this._fillStroke(c, e);
					}
				}
			},
			_updateCircle: function(e) {
				if (this._drawing && !e._empty()) {
					var t = e._point, n = this._ctx, r = Math.max(Math.round(e._radius), 1), i = (Math.max(Math.round(e._radiusY), 1) || r) / r;
					i !== 1 && (n.save(), n.scale(1, i)), n.beginPath(), n.arc(t.x, t.y / i, r, 0, Math.PI * 2, !1), i !== 1 && n.restore(), this._fillStroke(n, e);
				}
			},
			_fillStroke: function(e, t) {
				var n = t.options;
				n.fill && (e.globalAlpha = n.fillOpacity, e.fillStyle = n.fillColor || n.color, e.fill(n.fillRule || "evenodd")), n.stroke && n.weight !== 0 && (e.setLineDash && e.setLineDash(t.options && t.options._dashArray || []), e.globalAlpha = n.opacity, e.lineWidth = n.weight, e.strokeStyle = n.color, e.lineCap = n.lineCap, e.lineJoin = n.lineJoin, e.stroke());
			},
			_onClick: function(e) {
				for (var t = this._map.mouseEventToLayerPoint(e), n, r, i = this._drawFirst; i; i = i.next) n = i.layer, n.options.interactive && n._containsPoint(t) && (e.type !== "click" && e.type !== "preclick" || !this._map._draggableMoved(n)) && (r = n);
				this._fireEvent(r ? [r] : !1, e);
			},
			_onMouseMove: function(e) {
				if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
					var t = this._map.mouseEventToLayerPoint(e);
					this._handleMouseHover(e, t);
				}
			},
			_handleMouseOut: function(e) {
				var t = this._hoveredLayer;
				t && (Tt(this._container, "leaflet-interactive"), this._fireEvent([t], e, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
			},
			_handleMouseHover: function(e, t) {
				if (!this._mouseHoverThrottled) {
					for (var n, r, a = this._drawFirst; a; a = a.next) n = a.layer, n.options.interactive && n._containsPoint(t) && (r = n);
					r !== this._hoveredLayer && (this._handleMouseOut(e), r && (U(this._container, "leaflet-interactive"), this._fireEvent([r], e, "mouseover"), this._hoveredLayer = r)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, e), this._mouseHoverThrottled = !0, setTimeout(i(function() {
						this._mouseHoverThrottled = !1;
					}, this), 32);
				}
			},
			_fireEvent: function(e, t, n) {
				this._map._fireDOMEvent(t, n || t.type, e);
			},
			_bringToFront: function(e) {
				var t = e._order;
				if (t) {
					var n = t.next, r = t.prev;
					if (n) n.prev = r;
					else return;
					r ? r.next = n : n && (this._drawFirst = n), t.prev = this._drawLast, this._drawLast.next = t, t.next = null, this._drawLast = t, this._requestRedraw(e);
				}
			},
			_bringToBack: function(e) {
				var t = e._order;
				if (t) {
					var n = t.next, r = t.prev;
					if (r) r.next = n;
					else return;
					n ? n.prev = r : r && (this._drawLast = r), t.prev = null, t.next = this._drawFirst, this._drawFirst.prev = t, this._drawFirst = t, this._requestRedraw(e);
				}
			}
		});
		function Wr(e) {
			return z.canvas ? new Ur(e) : null;
		}
		var Gr = (function() {
			try {
				return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(e) {
					return document.createElement("<lvml:" + e + " class=\"lvml\">");
				};
			} catch {}
			return function(e) {
				return document.createElement("<" + e + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"lvml\">");
			};
		})(), Kr = {
			_initContainer: function() {
				this._container = V("div", "leaflet-vml-container");
			},
			_update: function() {
				this._map._animatingZoom || (Hr.prototype._update.call(this), this.fire("update"));
			},
			_initPath: function(e) {
				var t = e._container = Gr("shape");
				U(t, "leaflet-vml-shape " + (this.options.className || "")), t.coordsize = "1 1", e._path = Gr("path"), t.appendChild(e._path), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				var t = e._container;
				this._container.appendChild(t), e.options.interactive && e.addInteractiveTarget(t);
			},
			_removePath: function(e) {
				var t = e._container;
				H(t), e.removeInteractiveTarget(t), delete this._layers[o(e)];
			},
			_updateStyle: function(e) {
				var t = e._stroke, n = e._fill, r = e.options, i = e._container;
				i.stroked = !!r.stroke, i.filled = !!r.fill, r.stroke ? (t ||= e._stroke = Gr("stroke"), i.appendChild(t), t.weight = r.weight + "px", t.color = r.color, t.opacity = r.opacity, r.dashArray ? t.dashStyle = _(r.dashArray) ? r.dashArray.join(" ") : r.dashArray.replace(/( *, *)/g, " ") : t.dashStyle = "", t.endcap = r.lineCap.replace("butt", "flat"), t.joinstyle = r.lineJoin) : t && (i.removeChild(t), e._stroke = null), r.fill ? (n ||= e._fill = Gr("fill"), i.appendChild(n), n.color = r.fillColor || r.color, n.opacity = r.fillOpacity) : n && (i.removeChild(n), e._fill = null);
			},
			_updateCircle: function(e) {
				var t = e._point.round(), n = Math.round(e._radius), r = Math.round(e._radiusY || n);
				this._setPath(e, e._empty() ? "M0 0" : "AL " + t.x + "," + t.y + " " + n + "," + r + " 0,23592600");
			},
			_setPath: function(e, t) {
				e._path.v = t;
			},
			_bringToFront: function(e) {
				St(e._container);
			},
			_bringToBack: function(e) {
				Ct(e._container);
			}
		}, qr = z.vml ? Gr : pe, Jr = Hr.extend({
			_initContainer: function() {
				this._container = qr("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = qr("g"), this._container.appendChild(this._rootGroup);
			},
			_destroyContainer: function() {
				H(this._container), Y(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					Hr.prototype._update.call(this);
					var e = this._bounds, t = e.getSize(), n = this._container;
					this._svgSize && this._svgSize.equals(t) || (this._svgSize = t, n.setAttribute("width", t.x), n.setAttribute("height", t.y)), jt(n, e.min), n.setAttribute("viewBox", [
						e.min.x,
						e.min.y,
						t.x,
						t.y
					].join(" ")), this.fire("update");
				}
			},
			_initPath: function(e) {
				var t = e._path = qr("path");
				e.options.className && U(t, e.options.className), e.options.interactive && U(t, "leaflet-interactive"), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				this._rootGroup || this._initContainer(), this._rootGroup.appendChild(e._path), e.addInteractiveTarget(e._path);
			},
			_removePath: function(e) {
				H(e._path), e.removeInteractiveTarget(e._path), delete this._layers[o(e)];
			},
			_updatePath: function(e) {
				e._project(), e._update();
			},
			_updateStyle: function(e) {
				var t = e._path, n = e.options;
				t && (n.stroke ? (t.setAttribute("stroke", n.color), t.setAttribute("stroke-opacity", n.opacity), t.setAttribute("stroke-width", n.weight), t.setAttribute("stroke-linecap", n.lineCap), t.setAttribute("stroke-linejoin", n.lineJoin), n.dashArray ? t.setAttribute("stroke-dasharray", n.dashArray) : t.removeAttribute("stroke-dasharray"), n.dashOffset ? t.setAttribute("stroke-dashoffset", n.dashOffset) : t.removeAttribute("stroke-dashoffset")) : t.setAttribute("stroke", "none"), n.fill ? (t.setAttribute("fill", n.fillColor || n.color), t.setAttribute("fill-opacity", n.fillOpacity), t.setAttribute("fill-rule", n.fillRule || "evenodd")) : t.setAttribute("fill", "none"));
			},
			_updatePoly: function(e, t) {
				this._setPath(e, me(e._parts, t));
			},
			_updateCircle: function(e) {
				var t = e._point, n = Math.max(Math.round(e._radius), 1), r = Math.max(Math.round(e._radiusY), 1) || n, i = "a" + n + "," + r + " 0 1,0 ", a = e._empty() ? "M0 0" : "M" + (t.x - n) + "," + t.y + i + n * 2 + ",0 " + i + -n * 2 + ",0 ";
				this._setPath(e, a);
			},
			_setPath: function(e, t) {
				e._path.setAttribute("d", t);
			},
			_bringToFront: function(e) {
				St(e._path);
			},
			_bringToBack: function(e) {
				Ct(e._path);
			}
		});
		z.vml && Jr.include(Kr);
		function Yr(e) {
			return z.svg || z.vml ? new Jr(e) : null;
		}
		X.include({
			getRenderer: function(e) {
				var t = e.options.renderer || this._getPaneRenderer(e.options.pane) || this.options.renderer || this._renderer;
				return t ||= this._renderer = this._createRenderer(), this.hasLayer(t) || this.addLayer(t), t;
			},
			_getPaneRenderer: function(e) {
				if (e === "overlayPane" || e === void 0) return !1;
				var t = this._paneRenderers[e];
				return t === void 0 && (t = this._createRenderer({ pane: e }), this._paneRenderers[e] = t), t;
			},
			_createRenderer: function(e) {
				return this.options.preferCanvas && Wr(e) || Yr(e);
			}
		});
		var Xr = lr.extend({
			initialize: function(e, t) {
				lr.prototype.initialize.call(this, this._boundsToLatLngs(e), t);
			},
			setBounds: function(e) {
				return this.setLatLngs(this._boundsToLatLngs(e));
			},
			_boundsToLatLngs: function(e) {
				return e = ie(e), [
					e.getSouthWest(),
					e.getNorthWest(),
					e.getNorthEast(),
					e.getSouthEast()
				];
			}
		});
		function Zr(e, t) {
			return new Xr(e, t);
		}
		Jr.create = qr, Jr.pointsToPath = me, dr.geometryToLayer = fr, dr.coordsToLatLng = mr, dr.coordsToLatLngs = hr, dr.latLngToCoords = gr, dr.latLngsToCoords = _r, dr.getFeature = vr, dr.asFeature = yr, X.mergeOptions({ boxZoom: !0 });
		var Qr = _n.extend({
			initialize: function(e) {
				this._map = e, this._container = e._container, this._pane = e._panes.overlayPane, this._resetStateTimeout = 0, e.on("unload", this._destroy, this);
			},
			addHooks: function() {
				J(this._container, "mousedown", this._onMouseDown, this);
			},
			removeHooks: function() {
				Y(this._container, "mousedown", this._onMouseDown, this);
			},
			moved: function() {
				return this._moved;
			},
			_destroy: function() {
				H(this._pane), delete this._pane;
			},
			_resetState: function() {
				this._resetStateTimeout = 0, this._moved = !1;
			},
			_clearDeferredResetState: function() {
				this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
			},
			_onMouseDown: function(e) {
				if (!e.shiftKey || e.which !== 1 && e.button !== 1) return !1;
				this._clearDeferredResetState(), this._resetState(), G(), Ft(), this._startPoint = this._map.mouseEventToContainerPoint(e), J(document, {
					contextmenu: Qt,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseMove: function(e) {
				this._moved || (this._moved = !0, this._box = V("div", "leaflet-zoom-box", this._container), U(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(e);
				var t = new N(this._point, this._startPoint), n = t.getSize();
				jt(this._box, t.min), this._box.style.width = n.x + "px", this._box.style.height = n.y + "px";
			},
			_finish: function() {
				this._moved && (H(this._box), Tt(this._container, "leaflet-crosshair")), K(), It(), Y(document, {
					contextmenu: Qt,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseUp: function(e) {
				if ((e.which === 1 || e.button === 1) && (this._finish(), this._moved)) {
					this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(i(this._resetState, this), 0);
					var t = new re(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
					this._map.fitBounds(t).fire("boxzoomend", { boxZoomBounds: t });
				}
			},
			_onKeyDown: function(e) {
				e.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
			}
		});
		X.addInitHook("addHandler", "boxZoom", Qr), X.mergeOptions({ doubleClickZoom: !0 });
		var $r = _n.extend({
			addHooks: function() {
				this._map.on("dblclick", this._onDoubleClick, this);
			},
			removeHooks: function() {
				this._map.off("dblclick", this._onDoubleClick, this);
			},
			_onDoubleClick: function(e) {
				var t = this._map, n = t.getZoom(), r = t.options.zoomDelta, i = e.originalEvent.shiftKey ? n - r : n + r;
				t.options.doubleClickZoom === "center" ? t.setZoom(i) : t.setZoomAround(e.containerPoint, i);
			}
		});
		X.addInitHook("addHandler", "doubleClickZoom", $r), X.mergeOptions({
			dragging: !0,
			inertia: !0,
			inertiaDeceleration: 3400,
			inertiaMaxSpeed: Infinity,
			easeLinearity: .2,
			worldCopyJump: !1,
			maxBoundsViscosity: 0
		});
		var ei = _n.extend({
			addHooks: function() {
				if (!this._draggable) {
					var e = this._map;
					this._draggable = new bn(e._mapPane, e._container), this._draggable.on({
						dragstart: this._onDragStart,
						drag: this._onDrag,
						dragend: this._onDragEnd
					}, this), this._draggable.on("predrag", this._onPreDragLimit, this), e.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), e.on("zoomend", this._onZoomEnd, this), e.whenReady(this._onZoomEnd, this));
				}
				U(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
			},
			removeHooks: function() {
				Tt(this._map._container, "leaflet-grab"), Tt(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			moving: function() {
				return this._draggable && this._draggable._moving;
			},
			_onDragStart: function() {
				var e = this._map;
				if (e._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
					var t = ie(this._map.options.maxBounds);
					this._offsetLimit = ne(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
				} else this._offsetLimit = null;
				e.fire("movestart").fire("dragstart"), e.options.inertia && (this._positions = [], this._times = []);
			},
			_onDrag: function(e) {
				if (this._map.options.inertia) {
					var t = this._lastTime = +/* @__PURE__ */ new Date(), n = this._lastPos = this._draggable._absPos || this._draggable._newPos;
					this._positions.push(n), this._times.push(t), this._prunePositions(t);
				}
				this._map.fire("move", e).fire("drag", e);
			},
			_prunePositions: function(e) {
				for (; this._positions.length > 1 && e - this._times[0] > 50;) this._positions.shift(), this._times.shift();
			},
			_onZoomEnd: function() {
				var e = this._map.getSize().divideBy(2), t = this._map.latLngToLayerPoint([0, 0]);
				this._initialWorldOffset = t.subtract(e).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
			},
			_viscousLimit: function(e, t) {
				return e - (e - t) * this._viscosity;
			},
			_onPreDragLimit: function() {
				if (this._viscosity && this._offsetLimit) {
					var e = this._draggable._newPos.subtract(this._draggable._startPos), t = this._offsetLimit;
					e.x < t.min.x && (e.x = this._viscousLimit(e.x, t.min.x)), e.y < t.min.y && (e.y = this._viscousLimit(e.y, t.min.y)), e.x > t.max.x && (e.x = this._viscousLimit(e.x, t.max.x)), e.y > t.max.y && (e.y = this._viscousLimit(e.y, t.max.y)), this._draggable._newPos = this._draggable._startPos.add(e);
				}
			},
			_onPreDragWrap: function() {
				var e = this._worldWidth, t = Math.round(e / 2), n = this._initialWorldOffset, r = this._draggable._newPos.x, i = (r - t + n) % e + t - n, a = (r + t + n) % e - t - n, o = Math.abs(i + n) < Math.abs(a + n) ? i : a;
				this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = o;
			},
			_onDragEnd: function(e) {
				var t = this._map, n = t.options, r = !n.inertia || e.noInertia || this._times.length < 2;
				if (t.fire("dragend", e), r) t.fire("moveend");
				else {
					this._prunePositions(+/* @__PURE__ */ new Date());
					var i = this._lastPos.subtract(this._positions[0]), a = (this._lastTime - this._times[0]) / 1e3, o = n.easeLinearity, s = i.multiplyBy(o / a), c = s.distanceTo([0, 0]), l = Math.min(n.inertiaMaxSpeed, c), u = s.multiplyBy(l / c), d = l / (n.inertiaDeceleration * o), f = u.multiplyBy(-d / 2).round();
					!f.x && !f.y ? t.fire("moveend") : (f = t._limitOffset(f, t.options.maxBounds), T(function() {
						t.panBy(f, {
							duration: d,
							easeLinearity: o,
							noMoveStart: !0,
							animate: !0
						});
					}));
				}
			}
		});
		X.addInitHook("addHandler", "dragging", ei), X.mergeOptions({
			keyboard: !0,
			keyboardPanDelta: 80
		});
		var ti = _n.extend({
			keyCodes: {
				left: [37],
				right: [39],
				down: [40],
				up: [38],
				zoomIn: [
					187,
					107,
					61,
					171
				],
				zoomOut: [
					189,
					109,
					54,
					173
				]
			},
			initialize: function(e) {
				this._map = e, this._setPanDelta(e.options.keyboardPanDelta), this._setZoomDelta(e.options.zoomDelta);
			},
			addHooks: function() {
				var e = this._map._container;
				e.tabIndex <= 0 && (e.tabIndex = "0"), J(e, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this), this._map.on({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			removeHooks: function() {
				this._removeHooks(), Y(this._map._container, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this), this._map.off({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			_onMouseDown: function() {
				if (!this._focused) {
					var e = document.body, t = document.documentElement, n = e.scrollTop || t.scrollTop, r = e.scrollLeft || t.scrollLeft;
					this._map._container.focus(), window.scrollTo(r, n);
				}
			},
			_onFocus: function() {
				this._focused = !0, this._map.fire("focus");
			},
			_onBlur: function() {
				this._focused = !1, this._map.fire("blur");
			},
			_setPanDelta: function(e) {
				for (var t = this._panKeys = {}, n = this.keyCodes, r = 0, i = n.left.length; r < i; r++) t[n.left[r]] = [-1 * e, 0];
				for (r = 0, i = n.right.length; r < i; r++) t[n.right[r]] = [e, 0];
				for (r = 0, i = n.down.length; r < i; r++) t[n.down[r]] = [0, e];
				for (r = 0, i = n.up.length; r < i; r++) t[n.up[r]] = [0, -1 * e];
			},
			_setZoomDelta: function(e) {
				for (var t = this._zoomKeys = {}, n = this.keyCodes, r = 0, i = n.zoomIn.length; r < i; r++) t[n.zoomIn[r]] = e;
				for (r = 0, i = n.zoomOut.length; r < i; r++) t[n.zoomOut[r]] = -e;
			},
			_addHooks: function() {
				J(document, "keydown", this._onKeyDown, this);
			},
			_removeHooks: function() {
				Y(document, "keydown", this._onKeyDown, this);
			},
			_onKeyDown: function(e) {
				if (!(e.altKey || e.ctrlKey || e.metaKey)) {
					var t = e.keyCode, n = this._map, r;
					if (t in this._panKeys) {
						if (!n._panAnim || !n._panAnim._inProgress) {
							if (r = this._panKeys[t], e.shiftKey && (r = M(r).multiplyBy(3)), n.options.maxBounds && (r = n._limitOffset(M(r), n.options.maxBounds)), n.options.worldCopyJump) {
								var i = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(r)));
								n.panTo(i);
							} else n.panBy(r);
						}
					} else if (t in this._zoomKeys) n.setZoom(n.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[t]);
					else if (t === 27 && n._popup && n._popup.options.closeOnEscapeKey) n.closePopup();
					else return;
					Qt(e);
				}
			}
		});
		X.addInitHook("addHandler", "keyboard", ti), X.mergeOptions({
			scrollWheelZoom: !0,
			wheelDebounceTime: 40,
			wheelPxPerZoomLevel: 60
		});
		var ni = _n.extend({
			addHooks: function() {
				J(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
			},
			removeHooks: function() {
				Y(this._map._container, "wheel", this._onWheelScroll, this);
			},
			_onWheelScroll: function(e) {
				var t = nn(e), n = this._map.options.wheelDebounceTime;
				this._delta += t, this._lastMousePos = this._map.mouseEventToContainerPoint(e), this._startTime ||= +/* @__PURE__ */ new Date();
				var r = Math.max(n - (+/* @__PURE__ */ new Date() - this._startTime), 0);
				clearTimeout(this._timer), this._timer = setTimeout(i(this._performZoom, this), r), Qt(e);
			},
			_performZoom: function() {
				var e = this._map, t = e.getZoom(), n = this._map.options.zoomSnap || 0;
				e._stop();
				var r = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), i = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(r)))) / Math.LN2, a = n ? Math.ceil(i / n) * n : i, o = e._limitZoom(t + (this._delta > 0 ? a : -a)) - t;
				this._delta = 0, this._startTime = null, o && (e.options.scrollWheelZoom === "center" ? e.setZoom(t + o) : e.setZoomAround(this._lastMousePos, t + o));
			}
		});
		X.addInitHook("addHandler", "scrollWheelZoom", ni);
		var ri = 600;
		X.mergeOptions({
			tapHold: z.touchNative && z.safari && z.mobile,
			tapTolerance: 15
		});
		var ii = _n.extend({
			addHooks: function() {
				J(this._map._container, "touchstart", this._onDown, this);
			},
			removeHooks: function() {
				Y(this._map._container, "touchstart", this._onDown, this);
			},
			_onDown: function(e) {
				if (clearTimeout(this._holdTimeout), e.touches.length === 1) {
					var t = e.touches[0];
					this._startPos = this._newPos = new j(t.clientX, t.clientY), this._holdTimeout = setTimeout(i(function() {
						this._cancel(), this._isTapValid() && (J(document, "touchend", Zt), J(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", t));
					}, this), ri), J(document, "touchend touchcancel contextmenu", this._cancel, this), J(document, "touchmove", this._onMove, this);
				}
			},
			_cancelClickPrevent: function e() {
				Y(document, "touchend", Zt), Y(document, "touchend touchcancel", e);
			},
			_cancel: function() {
				clearTimeout(this._holdTimeout), Y(document, "touchend touchcancel contextmenu", this._cancel, this), Y(document, "touchmove", this._onMove, this);
			},
			_onMove: function(e) {
				var t = e.touches[0];
				this._newPos = new j(t.clientX, t.clientY);
			},
			_isTapValid: function() {
				return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
			},
			_simulateEvent: function(e, t) {
				var n = new MouseEvent(e, {
					bubbles: !0,
					cancelable: !0,
					view: window,
					screenX: t.screenX,
					screenY: t.screenY,
					clientX: t.clientX,
					clientY: t.clientY
				});
				n._simulated = !0, t.target.dispatchEvent(n);
			}
		});
		X.addInitHook("addHandler", "tapHold", ii), X.mergeOptions({
			touchZoom: z.touch,
			bounceAtZoomLimits: !0
		});
		var ai = _n.extend({
			addHooks: function() {
				U(this._map._container, "leaflet-touch-zoom"), J(this._map._container, "touchstart", this._onTouchStart, this);
			},
			removeHooks: function() {
				Tt(this._map._container, "leaflet-touch-zoom"), Y(this._map._container, "touchstart", this._onTouchStart, this);
			},
			_onTouchStart: function(e) {
				var t = this._map;
				if (!(!e.touches || e.touches.length !== 2 || t._animatingZoom || this._zooming)) {
					var n = t.mouseEventToContainerPoint(e.touches[0]), r = t.mouseEventToContainerPoint(e.touches[1]);
					this._centerPoint = t.getSize()._divideBy(2), this._startLatLng = t.containerPointToLatLng(this._centerPoint), t.options.touchZoom !== "center" && (this._pinchStartLatLng = t.containerPointToLatLng(n.add(r)._divideBy(2))), this._startDist = n.distanceTo(r), this._startZoom = t.getZoom(), this._moved = !1, this._zooming = !0, t._stop(), J(document, "touchmove", this._onTouchMove, this), J(document, "touchend touchcancel", this._onTouchEnd, this), Zt(e);
				}
			},
			_onTouchMove: function(e) {
				if (e.touches && e.touches.length === 2 && this._zooming) {
					var t = this._map, n = t.mouseEventToContainerPoint(e.touches[0]), r = t.mouseEventToContainerPoint(e.touches[1]), a = n.distanceTo(r) / this._startDist;
					if (this._zoom = t.getScaleZoom(a, this._startZoom), !t.options.bounceAtZoomLimits && (this._zoom < t.getMinZoom() && a < 1 || this._zoom > t.getMaxZoom() && a > 1) && (this._zoom = t._limitZoom(this._zoom)), t.options.touchZoom === "center") {
						if (this._center = this._startLatLng, a === 1) return;
					} else {
						var o = n._add(r)._divideBy(2)._subtract(this._centerPoint);
						if (a === 1 && o.x === 0 && o.y === 0) return;
						this._center = t.unproject(t.project(this._pinchStartLatLng, this._zoom).subtract(o), this._zoom);
					}
					this._moved ||= (t._moveStart(!0, !1), !0), E(this._animRequest);
					var s = i(t._move, t, this._center, this._zoom, {
						pinch: !0,
						round: !1
					}, void 0);
					this._animRequest = T(s, this, !0), Zt(e);
				}
			},
			_onTouchEnd: function() {
				!this._moved || !this._zooming ? this._zooming = !1 : (this._zooming = !1, E(this._animRequest), Y(document, "touchmove", this._onTouchMove, this), Y(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom)));
			}
		});
		X.addInitHook("addHandler", "touchZoom", ai), X.BoxZoom = Qr, X.DoubleClickZoom = $r, X.Drag = ei, X.Keyboard = ti, X.ScrollWheelZoom = ni, X.TapHold = ii, X.TouchZoom = ai, e.Bounds = N, e.Browser = z, e.CRS = ae, e.Canvas = Ur, e.Circle = ar, e.CircleMarker = rr, e.Class = O, e.Control = cn, e.DivIcon = Pr, e.DivOverlay = kr, e.DomEvent = an, e.DomUtil = q, e.Draggable = bn, e.Evented = A, e.FeatureGroup = Jn, e.GeoJSON = dr, e.GridLayer = Ir, e.Handler = _n, e.Icon = Xn, e.ImageOverlay = Cr, e.LatLng = P, e.LatLngBounds = re, e.Layer = Gn, e.LayerGroup = Kn, e.LineUtil = Rn, e.Map = X, e.Marker = er, e.Mixin = vn, e.Path = nr, e.Point = j, e.PolyUtil = wn, e.Polygon = lr, e.Polyline = sr, e.Popup = Ar, e.PosAnimation = on, e.Projection = Vn, e.Rectangle = Xr, e.Renderer = Hr, e.SVG = Jr, e.SVGOverlay = Dr, e.TileLayer = Rr, e.Tooltip = Mr, e.Transformation = le, e.Util = D, e.VideoOverlay = Tr, e.bind = i, e.bounds = ne, e.canvas = Wr, e.circle = or, e.circleMarker = ir, e.control = ln, e.divIcon = Fr, e.extend = n, e.featureGroup = Yn, e.geoJSON = xr, e.geoJson = Sr, e.gridLayer = Lr, e.icon = Zn, e.imageOverlay = wr, e.latLng = F, e.latLngBounds = ie, e.layerGroup = qn, e.map = sn, e.marker = tr, e.point = M, e.polygon = ur, e.polyline = cr, e.popup = jr, e.rectangle = Zr, e.setOptions = p, e.stamp = o, e.svg = Yr, e.svgOverlay = Or, e.tileLayer = zr, e.tooltip = Nr, e.transformation = ue, e.version = t, e.videoOverlay = Er;
		var oi = window.L;
		e.noConflict = function() {
			return window.L = oi, this;
		}, window.L = e;
	}));
})))()), O = /* @__PURE__ */ new Map();
function ee(e) {
	let t = O.get(e);
	if (t ? O.delete(e) : (t = p(e).then(async (e) => {
		if (!e.ok) throw Error(String(e.status));
		return URL.createObjectURL(await e.blob());
	}), t.catch(() => O.get(e) === t && O.delete(e))), O.set(e, t), O.size > 200) {
		let [e, t] = O.entries().next().value;
		O.delete(e), t.then((e) => URL.revokeObjectURL(e), () => {});
	}
	return t;
}
// src/lib/ui/MapView.svelte
var k = e("<div class=\"map svelte-1zqw7d\" role=\"region\"></div>");
function A(e, f) {
	a(f, !0);
	let p = D.default.TileLayer.extend({ createTile(e, t) {
		let n = document.createElement("img");
		return n.alt = "", D.default.DomEvent.on(n, "load", D.default.Util.bind(this._tileOnLoad, this, t, n)), D.default.DomEvent.on(n, "error", D.default.Util.bind(this._tileOnError, this, t, n)), ee(this.getTileUrl(e)).then((e) => n.src = e, (e) => t(e, n)), n;
	} }), g = c(f, "height", 3, 220), _ = c(f, "label", 3, "Route map"), v = d(void 0);
	h(() => {
		let e = getComputedStyle(t(v)).getPropertyValue(`--${f.kind}`).trim(), n = matchMedia("(pointer: coarse)").matches, r = !m.reducedMotion, i = D.default.map(t(v), {
			scrollWheelZoom: !1,
			dragging: !n,
			zoomAnimation: r,
			fadeAnimation: r,
			markerZoomAnimation: r
		});
		i.attributionControl.setPrefix(!1), new p("/api/map_tiles/raster/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\" rel=\"noopener\">OpenStreetMap</a> contributors"
		}).addTo(i);
		let a = f.route.filter((e) => e.length), o = D.default.latLngBounds([]);
		for (let t of a) D.default.polyline(t, {
			color: e,
			weight: 4
		}).addTo(i), o.extend(t);
		(a.length ? [a[0][0], a.at(-1).at(-1)] : []).forEach((t, n) => D.default.circleMarker(t, {
			radius: 6,
			fillColor: e,
			fillOpacity: 1,
			color: "#fff",
			weight: n ? 2 : 0
		}).addTo(i)), o.isValid() && i.fitBounds(o, {
			padding: [16, 16],
			maxZoom: 17
		});
		let s = () => (i.scrollWheelZoom.enable(), i.dragging.enable()), c = () => i.scrollWheelZoom.disable(), l = [
			["click", s],
			["focus", s],
			["blur", () => (c(), n && i.dragging.disable())],
			["mouseleave", c]
		];
		for (let [e, n] of l) t(v).addEventListener(e, n, { passive: !0 });
		let u = new ResizeObserver(() => i.invalidateSize());
		return u.observe(t(v)), () => {
			u.disconnect();
			for (let [e, n] of l) t(v).removeEventListener(e, n);
			i.remove();
		};
	});
	var y = k();
	let b;
	l(y, (e) => n(v, e), () => t(v)), i(() => {
		u(y, "aria-label", _()), b = s(y, "", b, { height: `${g() ?? ""}px` });
	}), r(e, y), o();
}
// node_modules/uplot/dist/uPlot.esm.js
var j = !0, te = "uplot", M = "u-hz", N = "u-vt", ne = "u-title", re = "u-wrap", ie = "u-under", P = "u-over", F = "u-axis", ae = "u-off", oe = "u-select", se = "u-cursor-x", ce = "u-cursor-y", le = "u-cursor-pt", ue = "u-legend", de = "u-live", fe = "u-inline", pe = "u-series", me = "u-marker", he = "u-label", ge = "u-value", _e = "width", ve = "height", ye = "top", be = "bottom", xe = "left", Se = "right", Ce = "#000", we = "#0000", Te = "mousemove", Ee = "mousedown", De = "mouseup", Oe = "mouseenter", ke = "mouseleave", Ae = "dblclick", je = "resize", Me = "scroll", Ne = "change", Pe = "dppxchange", Fe = "--", Ie = typeof window < "u", Le = Ie ? document : null, Re = Ie ? window : null, ze = Ie ? navigator : null, I, R;
function Be() {
	let e = devicePixelRatio;
	I != e && (I = e, R && et(Ne, R, Be), R = matchMedia(`(min-resolution: ${I - .001}dppx) and (max-resolution: ${I + .001}dppx)`), $e(Ne, R, Be), Re.dispatchEvent(new CustomEvent(Pe)));
}
function Ve(e, t) {
	if (t != null) {
		let n = e.classList;
		!n.contains(t) && n.add(t);
	}
}
function He(e, t) {
	let n = e.classList;
	n.contains(t) && n.remove(t);
}
function Ue(e, t, n) {
	e.style[t] = n + "px";
}
function We(e, t, n, r) {
	let i = Le.createElement(e);
	return t != null && Ve(i, t), n?.insertBefore(i, r), i;
}
function Ge(e, t) {
	return We("div", e, t);
}
var Ke = /* @__PURE__ */ new WeakMap();
function qe(e, t, n, r, i) {
	let a = "translate(" + t + "px," + n + "px)";
	a != Ke.get(e) && (e.style.transform = a, Ke.set(e, a), t < 0 || n < 0 || t > r || n > i ? Ve(e, ae) : He(e, ae));
}
var Je = /* @__PURE__ */ new WeakMap();
function Ye(e, t, n) {
	let r = t + n;
	r != Je.get(e) && (Je.set(e, r), e.style.background = t, e.style.borderColor = n);
}
var Xe = /* @__PURE__ */ new WeakMap();
function z(e, t, n, r) {
	let i = t + "" + n;
	i != Xe.get(e) && (Xe.set(e, i), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = r ? -t / 2 + "px" : 0, e.style.marginTop = r ? -n / 2 + "px" : 0);
}
var Ze = { passive: !0 }, Qe = {
	...Ze,
	capture: !0
};
function $e(e, t, n, r) {
	t.addEventListener(e, n, r ? Qe : Ze);
}
function et(e, t, n, r) {
	t.removeEventListener(e, n, Ze);
}
Ie && Be();
function tt(e, t, n, r) {
	let i;
	n ||= 0, r ||= t.length - 1;
	let a = r <= 2147483647;
	for (; r - n > 1;) i = a ? n + r >> 1 : H((n + r) / 2), t[i] < e ? n = i : r = i;
	return e - t[n] <= t[r] - e ? n : r;
}
function nt(e) {
	return (t, n, r) => {
		let i = -1, a = -1;
		for (let a = n; a <= r; a++) if (e(t[a])) {
			i = a;
			break;
		}
		for (let i = r; i >= n; i--) if (e(t[i])) {
			a = i;
			break;
		}
		return [i, a];
	};
}
var rt = (e) => e != null, it = (e) => e != null && e > 0, at = nt(rt), ot = nt(it);
function st(e, t, n, r = 0, i = !1) {
	let a = i ? ot : at, o = i ? it : rt;
	[t, n] = a(e, t, n);
	let s = e[t], c = e[t];
	if (t > -1) {
		if (r == 1) s = e[t], c = e[n];
		else if (r == -1) s = e[n], c = e[t];
		else for (let r = t; r <= n; r++) {
			let t = e[r];
			o(t) && (t < s ? s = t : t > c && (c = t));
		}
	}
	return [s ?? At, c ?? -At];
}
function ct(e, t, n, r) {
	let i = Tt(e), a = Tt(t);
	e == t && (i == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
	let o = n == 10 ? Et : Dt, s = i == 1 ? H : St, c = a == 1 ? St : H, l = s(o(V(e))), u = c(o(V(t))), d = U(n, l), f = U(n, u);
	return n == 10 && (l < 0 && (d = q(d, -l)), u < 0 && (f = q(f, -u))), r || n == 2 ? (e = d * i, t = f * a) : (e = Ht(e, d), t = Vt(t, f)), [e, t];
}
function lt(e, t, n, r) {
	let i = ct(e, t, n, r);
	return e == 0 && (i[0] = 0), t == 0 && (i[1] = 0), i;
}
var ut = .1, dt = {
	mode: 3,
	pad: ut
}, ft = {
	pad: 0,
	soft: null,
	mode: 0
}, pt = {
	min: ft,
	max: ft
};
function mt(e, t, n, r) {
	return Zt(n) ? gt(e, t, n) : (ft.pad = n, ft.soft = r ? 0 : null, ft.mode = r ? 3 : 0, gt(e, t, pt));
}
function B(e, t) {
	return e ?? t;
}
function ht(e, t, n) {
	for (t = B(t, 0), n = B(n, e.length - 1); t <= n;) {
		if (e[t] != null) return !0;
		t++;
	}
	return !1;
}
function gt(e, t, n) {
	let r = n.min, i = n.max, a = B(r.pad, 0), o = B(i.pad, 0), s = B(r.hard, -At), c = B(i.hard, At), l = B(r.soft, At), u = B(i.soft, -At), d = B(r.mode, 0), f = B(i.mode, 0), p = t - e, m = Et(p), h = wt(V(e), V(t)), g = V(Et(h) - m);
	(p < 1e-24 || g > 10) && (p = 0, (e == 0 || t == 0) && (p = 1e-24, d == 2 && l != At && (a = 0), f == 2 && u != -At && (o = 0)));
	let _ = p || h || 1e3, v = U(10, H(Et(_))), y = q(Ht(e - _ * (p == 0 ? e == 0 ? .1 : 1 : a), v / 10), 24), b = e >= l && (d == 1 || d == 3 && y <= l || d == 2 && y >= l) ? l : At, x = wt(s, y < b && e >= b ? b : Ct(b, y)), S = q(Vt(t + _ * (p == 0 ? t == 0 ? .1 : 1 : o), v / 10), 24), C = t <= u && (f == 1 || f == 3 && S >= u || f == 2 && S <= u) ? u : -At, w = Ct(c, S > C && t <= C ? C : wt(C, S));
	return x == w && x == 0 && (w = 100), [x, w];
}
var _t = new Intl.NumberFormat(Ie ? ze.language : "en-US"), vt = (e) => _t.format(e), yt = Math, bt = yt.PI, V = yt.abs, H = yt.floor, xt = yt.round, St = yt.ceil, Ct = yt.min, wt = yt.max, U = yt.pow, Tt = yt.sign, Et = yt.log10, Dt = yt.log2, Ot = (e, t = 1) => yt.sinh(e) * t, kt = (e, t = 1) => yt.asinh(e / t), At = Infinity;
function W(e) {
	return (Et((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function jt(e, t, n) {
	return Ct(wt(e, t), n);
}
function Mt(e) {
	return typeof e == "function";
}
function G(e) {
	return Mt(e) ? e : () => e;
}
var K = () => {}, Nt = (e) => e, Pt = (e, t) => t, Ft = (e) => null, It = (e) => !0, Lt = (e, t) => e == t, Rt = /\.\d*?(?=9{6,}|0{6,})/gm, zt = (e) => {
	if (Jt(e) || J.has(e)) return e;
	let t = `${e}`, n = t.match(Rt);
	if (n == null) return e;
	let r = n[0].length - 1;
	if (t.indexOf("e-") != -1) {
		let [e, n] = t.split("e");
		return +`${zt(e)}e${n}`;
	}
	return q(e, r);
};
function Bt(e, t) {
	return zt(q(zt(e / t)) * t);
}
function Vt(e, t) {
	return zt(St(zt(e / t)) * t);
}
function Ht(e, t) {
	return zt(H(zt(e / t)) * t);
}
function q(e, t = 0) {
	if (Jt(e)) return e;
	let n = 10 ** t;
	return xt(e * n * (1 + 2 ** -52)) / n;
}
var J = /* @__PURE__ */ new Map();
function Ut(e) {
	return (("" + e).split(".")[1] || "").length;
}
function Y(e, t, n, r) {
	let i = [], a = r.map(Ut);
	for (let o = t; o < n; o++) {
		let t = V(o), n = q(U(e, o), t);
		for (let s = 0; s < r.length; s++) {
			let c = e == 10 ? +`${r[s]}e${o}` : r[s] * n, l = (o >= 0 ? 0 : t) + (o >= a[s] ? 0 : a[s]), u = e == 10 ? c : q(c, l);
			i.push(u), J.set(u, l);
		}
	}
	return i;
}
var Wt = {}, Gt = [], Kt = [null, null], qt = Array.isArray, Jt = Number.isInteger, Yt = (e) => e === void 0;
function Xt(e) {
	return typeof e == "string";
}
function Zt(e) {
	let t = !1;
	if (e != null) {
		let n = e.constructor;
		t = n == null || n == Object;
	}
	return t;
}
function Qt(e) {
	return typeof e == "object" && !!e;
}
var $t = Object.getPrototypeOf(Uint8Array), en = "__proto__";
function tn(e, t = Zt) {
	let n;
	if (qt(e)) {
		let r = e.find((e) => e != null);
		if (qt(r) || t(r)) {
			n = Array(e.length);
			for (let r = 0; r < e.length; r++) n[r] = tn(e[r], t);
		} else n = e.slice();
	} else if (e instanceof $t) n = e.slice();
	else if (t(e)) {
		n = {};
		for (let r in e) r != en && (n[r] = tn(e[r], t));
	} else n = e;
	return n;
}
function nn(e) {
	let t = arguments;
	for (let n = 1; n < t.length; n++) {
		let r = t[n];
		for (let t in r) t != en && (Zt(e[t]) ? nn(e[t], tn(r[t])) : e[t] = tn(r[t]));
	}
	return e;
}
var rn = 0, an = 1, on = 2;
function X(e, t, n) {
	for (let r = 0, i, a = -1; r < t.length; r++) {
		let o = t[r];
		if (o > a) {
			for (i = o - 1; i >= 0 && e[i] == null;) e[i--] = null;
			for (i = o + 1; i < n && e[i] == null;) e[a = i++] = null;
		}
	}
}
function sn(e, t) {
	if (un(e)) {
		let t = e[0].slice();
		for (let n = 1; n < e.length; n++) t.push(...e[n].slice(1));
		return dn(t[0]) || (t = ln(t)), t;
	}
	let n = /* @__PURE__ */ new Set();
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = r.length;
		for (let e = 0; e < i; e++) n.add(r[e]);
	}
	let r = [Array.from(n).sort((e, t) => e - t)], i = r[0].length, a = /* @__PURE__ */ new Map();
	for (let e = 0; e < i; e++) a.set(r[0][e], e);
	for (let n = 0; n < e.length; n++) {
		let o = e[n], s = o[0];
		for (let e = 1; e < o.length; e++) {
			let c = o[e], l = Array(i).fill(void 0), u = t ? t[n][e] : an, d = [];
			for (let e = 0; e < c.length; e++) {
				let t = c[e], n = a.get(s[e]);
				t === null ? u != rn && (l[n] = t, u == on && d.push(n)) : l[n] = t;
			}
			X(l, d, i), r.push(l);
		}
	}
	return r;
}
var cn = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function ln(e) {
	let t = e[0], n = t.length, r = Array(n);
	for (let e = 0; e < r.length; e++) r[e] = e;
	r.sort((e, n) => t[e] - t[n]);
	let i = [];
	for (let t = 0; t < e.length; t++) {
		let a = e[t], o = Array(n);
		for (let e = 0; e < n; e++) o[e] = a[r[e]];
		i.push(o);
	}
	return i;
}
function un(e) {
	let t = e[0][0], n = t.length;
	for (let r = 1; r < e.length; r++) {
		let i = e[r][0];
		if (i.length != n) return !1;
		if (i != t) {
			for (let e = 0; e < n; e++) if (i[e] != t[e]) return !1;
		}
	}
	return !0;
}
function dn(e, t = 100) {
	let n = e.length;
	if (n <= 1) return !0;
	let r = 0, i = n - 1;
	for (; r <= i && e[r] == null;) r++;
	for (; i >= r && e[i] == null;) i--;
	if (i <= r) return !0;
	let a = wt(1, H((i - r + 1) / t));
	for (let t = e[r], n = r + a; n <= i; n += a) {
		let r = e[n];
		if (r != null) {
			if (r <= t) return !1;
			t = r;
		}
	}
	return !0;
}
var fn = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
], pn = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
function mn(e) {
	return e.slice(0, 3);
}
var hn = pn.map(mn), gn = {
	MMMM: fn,
	MMM: fn.map(mn),
	WWWW: pn,
	WWW: hn
};
function _n(e) {
	return (e < 10 ? "0" : "") + e;
}
function vn(e) {
	return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
var yn = {
	YYYY: (e) => e.getFullYear(),
	YY: (e) => (e.getFullYear() + "").slice(2),
	MMMM: (e, t) => t.MMMM[e.getMonth()],
	MMM: (e, t) => t.MMM[e.getMonth()],
	MM: (e) => _n(e.getMonth() + 1),
	M: (e) => e.getMonth() + 1,
	DD: (e) => _n(e.getDate()),
	D: (e) => e.getDate(),
	WWWW: (e, t) => t.WWWW[e.getDay()],
	WWW: (e, t) => t.WWW[e.getDay()],
	HH: (e) => _n(e.getHours()),
	H: (e) => e.getHours(),
	h: (e) => {
		let t = e.getHours();
		return t == 0 ? 12 : t > 12 ? t - 12 : t;
	},
	AA: (e) => e.getHours() >= 12 ? "PM" : "AM",
	aa: (e) => e.getHours() >= 12 ? "pm" : "am",
	a: (e) => e.getHours() >= 12 ? "p" : "a",
	mm: (e) => _n(e.getMinutes()),
	m: (e) => e.getMinutes(),
	ss: (e) => _n(e.getSeconds()),
	s: (e) => e.getSeconds(),
	fff: (e) => vn(e.getMilliseconds())
};
function bn(e, t) {
	t ||= gn;
	let n = [], r = /\{([a-z]+)\}|[^{]+/gi, i;
	for (; i = r.exec(e);) n.push(i[0][0] == "{" ? yn[i[1]] : i[0]);
	return (e) => {
		let r = "";
		for (let i = 0; i < n.length; i++) r += typeof n[i] == "string" ? n[i] : n[i](e, t);
		return r;
	};
}
var xn = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Sn(e, t) {
	let n;
	return t == "UTC" || t == "Etc/UTC" ? n = /* @__PURE__ */ new Date(+e + e.getTimezoneOffset() * 6e4) : t == xn ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
var Cn = (e) => e % 1 == 0, wn = [
	1,
	2,
	2.5,
	5
], Tn = Y(10, -32, 0, wn), En = Y(10, 0, 32, wn), Dn = En.filter(Cn), On = Tn.concat(En), kn = "\n", An = "{YYYY}", jn = kn + An, Mn = "{M}/{D}", Nn = kn + Mn, Pn = Nn + "/{YY}", Fn = "{aa}", In = "{h}:{mm}" + Fn, Z = kn + In, Ln = ":{ss}", Q = null;
function Rn(e) {
	let t = e * 1e3, n = t * 60, r = n * 60, i = r * 24, a = i * 30, o = i * 365, s = (e == 1 ? Y(10, 0, 3, wn).filter(Cn) : Y(10, -3, 0, wn)).concat([
		t,
		t * 5,
		t * 10,
		t * 15,
		t * 30,
		n,
		n * 5,
		n * 10,
		n * 15,
		n * 30,
		r,
		r * 2,
		r * 3,
		r * 4,
		r * 6,
		r * 8,
		r * 12,
		i,
		i * 2,
		i * 3,
		i * 4,
		i * 5,
		i * 6,
		i * 7,
		i * 8,
		i * 9,
		i * 10,
		i * 15,
		a,
		a * 2,
		a * 3,
		a * 4,
		a * 6,
		o,
		o * 2,
		o * 5,
		o * 10,
		o * 25,
		o * 50,
		o * 100
	]), c = [
		[
			o,
			An,
			Q,
			Q,
			Q,
			Q,
			Q,
			Q,
			1
		],
		[
			i * 28,
			"{MMM}",
			jn,
			Q,
			Q,
			Q,
			Q,
			Q,
			1
		],
		[
			i,
			Mn,
			jn,
			Q,
			Q,
			Q,
			Q,
			Q,
			1
		],
		[
			r,
			"{h}" + Fn,
			Pn,
			Q,
			Nn,
			Q,
			Q,
			Q,
			1
		],
		[
			n,
			In,
			Pn,
			Q,
			Nn,
			Q,
			Q,
			Q,
			1
		],
		[
			t,
			Ln,
			Pn + " " + In,
			Q,
			Nn + " " + In,
			Q,
			Z,
			Q,
			1
		],
		[
			e,
			Ln + ".{fff}",
			Pn + " " + In,
			Q,
			Nn + " " + In,
			Q,
			Z,
			Q,
			1
		]
	];
	function l(t) {
		return (s, c, l, u, d, f) => {
			let p = [], m = d >= o, h = d >= a && d < o, g = t(l), _ = q(g * e, 3), v = Jn(g.getFullYear(), m ? 0 : g.getMonth(), h || m ? 1 : g.getDate()), y = q(v * e, 3);
			if (h || m) {
				let n = h ? d / a : 0, r = m ? d / o : 0, i = _ == y ? _ : q(Jn(v.getFullYear() + r, v.getMonth() + n, 1) * e, 3), s = new Date(xt(i / e)), c = s.getFullYear(), l = s.getMonth();
				for (let a = 0; i <= u; a++) {
					let o = Jn(c + r * a, l + n * a, 1), s = o - t(q(o * e, 3));
					i = q((+o + s) * e, 3), i <= u && p.push(i);
				}
			} else {
				let a = d >= i ? i : d, o = y + (H(l) - H(_)) + Vt(_ - y, a);
				p.push(o);
				let m = t(o), h = m.getHours() + m.getMinutes() / n + m.getSeconds() / r, g = d / r, v = f / s.axes[c]._space;
				for (; o = q(o + d, e == 1 ? 0 : 3), !(o > u);) if (g > 1) {
					let e = H(q(h + g, 6)) % 24, n = t(o).getHours() - e;
					n > 1 && (n = -1), o -= n * r, h = (h + g) % 24;
					let i = p[p.length - 1];
					q((o - i) / d, 3) * v >= .7 && p.push(o);
				} else p.push(o);
			}
			return p;
		};
	}
	return [
		s,
		c,
		l
	];
}
var [zn, Bn, Vn] = Rn(1), [Hn, Un, Wn] = Rn(.001);
Y(2, -53, 53, [1]);
function Gn(e, t) {
	return e.map((e) => e.map((n, r) => r == 0 || r == 8 || n == null ? n : t(r == 1 || e[8] == 0 ? n : e[1] + n)));
}
function Kn(e, t) {
	return (n, r, i, a, o) => {
		let s = t.find((e) => o >= e[0]) || t[t.length - 1], c, l, u, d, f, p;
		return r.map((t) => {
			let n = e(t), r = n.getFullYear(), i = n.getMonth(), a = n.getDate(), o = n.getHours(), m = n.getMinutes(), h = n.getSeconds(), g = r != c && s[2] || i != l && s[3] || a != u && s[4] || o != d && s[5] || m != f && s[6] || h != p && s[7] || s[1];
			return c = r, l = i, u = a, d = o, f = m, p = h, g(n);
		});
	};
}
function qn(e, t) {
	let n = bn(t);
	return (t, r, i, a, o) => r.map((t) => n(e(t)));
}
function Jn(e, t, n) {
	return new Date(e, t, n);
}
function Yn(e, t) {
	return t(e);
}
var Xn = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function Zn(e, t) {
	return (n, r, i, a) => a == null ? Fe : t(e(r));
}
function Qn(e, t) {
	let n = e.series[t];
	return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function $n(e, t) {
	return e.series[t].fill(e, t);
}
var er = {
	show: !0,
	live: !0,
	isolate: !1,
	mount: K,
	markers: {
		show: !0,
		width: 2,
		stroke: Qn,
		fill: $n,
		dash: "solid"
	},
	idx: null,
	idxs: null,
	values: []
};
function tr(e, t) {
	let n = e.cursor.points, r = Ge(), i = n.size(e, t);
	Ue(r, _e, i), Ue(r, ve, i);
	let a = i / -2;
	Ue(r, "marginLeft", a), Ue(r, "marginTop", a);
	let o = n.width(e, t, i);
	return o && Ue(r, "borderWidth", o), r;
}
function nr(e, t) {
	let n = e.series[t].points;
	return n._fill || n._stroke;
}
function rr(e, t) {
	let n = e.series[t].points;
	return n._stroke || n._fill;
}
function ir(e, t) {
	return e.series[t].points.size;
}
var ar = [0, 0];
function or(e, t, n) {
	return ar[0] = t, ar[1] = n, ar;
}
function sr(e, t, n, r = !0) {
	return (e) => {
		e.button != 0 || r && e.target != t || n(e);
	};
}
function cr(e, t, n, r = !0) {
	return (e) => {
		r && e.target != t || n(e);
	};
}
var lr = {
	show: !0,
	x: !0,
	y: !0,
	lock: !1,
	move: or,
	points: {
		one: !1,
		show: tr,
		size: ir,
		width: 0,
		stroke: rr,
		fill: nr
	},
	bind: {
		mousedown: sr,
		mouseup: sr,
		click: sr,
		dblclick: sr,
		mousemove: cr,
		mouseleave: cr,
		mouseenter: cr
	},
	drag: {
		setScale: !0,
		x: !0,
		y: !1,
		dist: 0,
		uni: null,
		click: (e, t) => {
			t.stopPropagation(), t.stopImmediatePropagation();
		},
		_x: !1,
		_y: !1
	},
	focus: {
		dist: (e, t, n, r, i) => r - i,
		prox: -1,
		bias: 0
	},
	hover: {
		skip: [void 0],
		prox: null,
		bias: 0
	},
	left: -10,
	top: -10,
	idx: null,
	dataIdx: null,
	idxs: null,
	event: null
}, ur = {
	show: !0,
	stroke: "rgba(0,0,0,0.07)",
	width: 2
}, dr = nn({}, ur, { filter: Pt }), fr = nn({}, dr, { size: 10 }), pr = nn({}, ur, { show: !1 }), mr = "12px system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"", hr = "bold " + mr, gr = 1.5, _r = {
	show: !0,
	scale: "x",
	stroke: Ce,
	space: 50,
	gap: 5,
	alignTo: 1,
	size: 50,
	labelGap: 0,
	labelSize: 30,
	labelFont: hr,
	side: 2,
	grid: dr,
	ticks: fr,
	border: pr,
	font: mr,
	lineGap: gr,
	rotate: 0
}, vr = "Value", yr = "Time", br = {
	show: !0,
	scale: "x",
	auto: !1,
	sorted: 1,
	min: At,
	max: -Infinity,
	idxs: []
};
function xr(e, t, n, r, i) {
	return t.map((e) => e == null ? "" : vt(e));
}
function Sr(e, t, n, r, i, a, o) {
	let s = [], c = J.get(i) || 0;
	n = o ? n : q(Vt(n, i), c);
	for (let e = n; e <= r; e = q(e + i, c)) s.push(Object.is(e, -0) ? 0 : e);
	return s;
}
function Cr(e, t, n, r, i, a, o) {
	let s = [], c = e.scales[e.axes[t].scale].log;
	i = U(c, H((c == 10 ? Et : Dt)(n))), c == 10 && (i = On[tt(i, On)]);
	let l = n, u = i * c;
	c == 10 && (u = On[tt(u, On)]);
	do
		s.push(l), l += i, c == 10 && !J.has(l) && (l = q(l, J.get(i))), l >= u && (i = l, u = i * c, c == 10 && (u = On[tt(u, On)]));
	while (l <= r);
	return s;
}
function wr(e, t, n, r, i, a, o) {
	let s = e.scales[e.axes[t].scale].asinh, c = r > s ? Cr(e, t, wt(s, n), r, i) : [s], l = r >= 0 && n <= 0 ? [0] : [];
	return (n < -s ? Cr(e, t, wt(s, -r), -n, i) : [s]).reverse().map((e) => -e).concat(l, c);
}
var Tr = /./, Er = /[12357]/, Dr = /[125]/, Or = /1/, kr = (e, t, n, r) => e.map((e, i) => t == 4 && e == 0 || i % r == 0 && n.test(e.toExponential()[+(e < 0)]) ? e : null);
function Ar(e, t, n, r, i) {
	let a = e.axes[n], o = a.scale, s = e.scales[o], c = e.valToPos, l = a._space, u = c(10, o), d = c(9, o) - u >= l ? Tr : c(7, o) - u >= l ? Er : c(5, o) - u >= l ? Dr : Or;
	if (d == Or) {
		let e = V(c(1, o) - u);
		if (e < l) return kr(t.slice().reverse(), s.distr, d, St(l / e)).reverse();
	}
	return kr(t, s.distr, d, 1);
}
function jr(e, t, n, r, i) {
	let a = e.axes[n], o = a.scale, s = a._space, c = e.valToPos, l = V(c(1, o) - c(2, o));
	return l < s ? kr(t.slice().reverse(), 3, Tr, St(s / l)).reverse() : t;
}
function Mr(e, t, n, r) {
	return r == null ? Fe : t == null ? "" : vt(t);
}
var Nr = {
	show: !0,
	scale: "y",
	stroke: Ce,
	space: 30,
	gap: 5,
	alignTo: 1,
	size: 50,
	labelGap: 0,
	labelSize: 30,
	labelFont: hr,
	side: 3,
	grid: dr,
	ticks: fr,
	border: pr,
	font: mr,
	lineGap: gr,
	rotate: 0
};
function Pr(e, t) {
	return q((3 + (e || 1) * 2) * t, 3);
}
function Fr(e, t) {
	let { scale: n, idxs: r } = e.series[0], i = e._data[0], a = e.valToPos(i[r[0]], n, !0), o = V(e.valToPos(i[r[1]], n, !0) - a) / (e.series[t].points.space * I);
	return r[1] - r[0] <= o;
}
var Ir = {
	scale: null,
	auto: !0,
	sorted: 0,
	min: At,
	max: -Infinity
}, Lr = (e, t, n, r, i) => i, Rr = {
	show: !0,
	auto: !0,
	sorted: 0,
	gaps: Lr,
	alpha: 1,
	facets: [nn({}, Ir, { scale: "x" }), nn({}, Ir, { scale: "y" })]
}, zr = {
	scale: "y",
	auto: !0,
	sorted: 0,
	show: !0,
	spanGaps: !1,
	gaps: Lr,
	alpha: 1,
	points: {
		show: Fr,
		filter: null
	},
	values: null,
	min: At,
	max: -Infinity,
	idxs: [],
	path: null,
	clip: null
};
function Br(e, t, n, r, i) {
	return n / 10;
}
var Vr = {
	time: j,
	auto: !0,
	distr: 1,
	log: 10,
	asinh: 1,
	min: null,
	max: null,
	dir: 1,
	ori: 0
}, Hr = nn({}, Vr, {
	time: !1,
	ori: 1
}), Ur = {};
function Wr(e, t) {
	let n = Ur[e];
	return n || (n = {
		key: e,
		plots: [],
		sub(e) {
			n.plots.push(e);
		},
		unsub(e) {
			n.plots = n.plots.filter((t) => t != e);
		},
		pub(e, t, r, i, a, o, s) {
			for (let c = 0; c < n.plots.length; c++) n.plots[c] != t && n.plots[c].pub(e, t, r, i, a, o, s);
		}
	}, e != null && (Ur[e] = n)), n;
}
var Gr = 1, Kr = 2;
function qr(e, t, n) {
	let r = e.mode, i = e.series[t], a = r == 2 ? e._data[t] : e._data, o = e.scales, s = e.bbox, c = a[0], l = r == 2 ? a[1] : a[t], u = r == 2 ? o[i.facets[0].scale] : o[e.series[0].scale], d = r == 2 ? o[i.facets[1].scale] : o[i.scale], f = s.left, p = s.top, m = s.width, h = s.height, g = e.valToPosH, _ = e.valToPosV;
	return u.ori == 0 ? n(i, c, l, u, d, g, _, f, p, m, h, ni, ii, oi, ci, ui) : n(i, c, l, u, d, _, g, p, f, h, m, ri, ai, si, li, di);
}
function Jr(e, t) {
	let n = 0, r = 0, i = B(e.bands, Gt);
	for (let e = 0; e < i.length; e++) {
		let a = i[e];
		a.series[0] == t ? n = a.dir : a.series[1] == t && (a.dir == 1 ? r |= 1 : r |= 2);
	}
	return [n, r == 1 ? -1 : r == 2 ? 1 : r == 3 ? 2 : 0];
}
function Yr(e, t, n, r, i) {
	let a = e.mode, o = e.series[t], s = a == 2 ? o.facets[1].scale : o.scale, c = e.scales[s];
	return i == -1 ? c.min : i == 1 ? c.max : c.distr == 3 ? c.dir == 1 ? c.min : c.max : 0;
}
function Xr(e, t, n, r, i, a) {
	return qr(e, t, (e, t, o, s, c, l, u, d, f, p, m) => {
		let h = e.pxRound, g = s.dir * (s.ori == 0 ? 1 : -1), _ = s.ori == 0 ? ii : ai, v, y;
		g == 1 ? (v = n, y = r) : (v = r, y = n);
		let b = h(l(t[v], s, p, d)), x = h(u(o[v], c, m, f)), S = h(l(t[y], s, p, d)), C = h(u(a == 1 ? c.max : c.min, c, m, f)), w = new Path2D(i);
		return _(w, S, C), _(w, b, C), _(w, b, x), w;
	});
}
function Zr(e, t, n, r, i, a) {
	let o = null;
	if (e.length > 0) {
		o = new Path2D();
		let s = t == 0 ? oi : si, c = n;
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			if (n[1] > n[0]) {
				let e = n[0] - c;
				e > 0 && s(o, c, r, e, r + a), c = n[1];
			}
		}
		let l = n + i - c;
		l > 0 && s(o, c, r - 5, l, r + a + 10);
	}
	return o;
}
function Qr(e, t, n) {
	let r = e[e.length - 1];
	r && r[0] == t ? r[1] = n : e.push([t, n]);
}
function $r(e, t, n, r, i, a, o) {
	let s = [], c = e.length;
	for (let l = i == 1 ? n : r; l >= n && l <= r; l += i) if (t[l] === null) {
		let u = l, d = l;
		if (i == 1) for (; ++l <= r && t[l] === null;) d = l;
		else for (; --l >= n && t[l] === null;) d = l;
		let f = a(e[u]), p = d == u ? f : a(e[d]), m = u - i;
		f = o <= 0 && m >= 0 && m < c ? a(e[m]) : f;
		let h = d + i;
		p = o >= 0 && h >= 0 && h < c ? a(e[h]) : p, p >= f && s.push([f, p]);
	}
	return s;
}
function ei(e) {
	return e == 0 ? Nt : e == 1 ? xt : (t) => Bt(t, e);
}
function ti(e) {
	let t = e == 0 ? ni : ri, n = e == 0 ? (e, t, n, r, i, a) => {
		e.arcTo(t, n, r, i, a);
	} : (e, t, n, r, i, a) => {
		e.arcTo(n, t, i, r, a);
	}, r = e == 0 ? (e, t, n, r, i) => {
		e.rect(t, n, r, i);
	} : (e, t, n, r, i) => {
		e.rect(n, t, i, r);
	};
	return (e, i, a, o, s, c = 0, l = 0) => {
		c == 0 && l == 0 ? r(e, i, a, o, s) : (c = Ct(c, o / 2, s / 2), l = Ct(l, o / 2, s / 2), t(e, i + c, a), n(e, i + o, a, i + o, a + s, c), n(e, i + o, a + s, i, a + s, l), n(e, i, a + s, i, a, l), n(e, i, a, i + o, a, c), e.closePath());
	};
}
var ni = (e, t, n) => {
	e.moveTo(t, n);
}, ri = (e, t, n) => {
	e.moveTo(n, t);
}, ii = (e, t, n) => {
	e.lineTo(t, n);
}, ai = (e, t, n) => {
	e.lineTo(n, t);
}, oi = ti(0), si = ti(1), ci = (e, t, n, r, i, a) => {
	e.arc(t, n, r, i, a);
}, li = (e, t, n, r, i, a) => {
	e.arc(n, t, r, i, a);
}, ui = (e, t, n, r, i, a, o) => {
	e.bezierCurveTo(t, n, r, i, a, o);
}, di = (e, t, n, r, i, a, o) => {
	e.bezierCurveTo(n, t, i, r, o, a);
};
function fi(e) {
	return (e, t, n, r, i) => qr(e, t, (t, a, o, s, c, l, u, d, f, p, m) => {
		let { pxRound: h, points: g } = t, _, v;
		s.ori == 0 ? (_ = ni, v = ci) : (_ = ri, v = li);
		let y = q(g.width * I, 3), b = (g.size - g.width) / 2 * I, x = q(b * 2, 3), S = new Path2D(), C = new Path2D(), { left: w, top: T, width: E, height: D } = e.bbox;
		oi(C, w - x, T - x, E + x * 2, D + x * 2);
		let O = (e) => {
			if (o[e] != null) {
				let t = h(l(a[e], s, p, d)), n = h(u(o[e], c, m, f));
				_(S, t + b, n), v(S, t, n, b, 0, bt * 2);
			}
		};
		if (i) i.forEach(O);
		else for (let e = n; e <= r; e++) O(e);
		return {
			stroke: y > 0 ? S : null,
			fill: S,
			clip: C,
			flags: 3
		};
	});
}
function pi(e) {
	return (t, n, r, i, a, o) => {
		r != i && (a != r && o != r && e(t, n, r), a != i && o != i && e(t, n, i), e(t, n, o));
	};
}
var mi = pi(ii), hi = pi(ai);
function gi(e) {
	let t = B(e?.alignGaps, 0);
	return (e, n, r, i) => qr(e, n, (a, o, s, c, l, u, d, f, p, m, h) => {
		[r, i] = at(s, r, i);
		let g = a.pxRound, _ = (e) => g(u(e, c, m, f)), v = (e) => g(d(e, l, h, p)), y, b;
		c.ori == 0 ? (y = ii, b = mi) : (y = ai, b = hi);
		let x = c.dir * (c.ori == 0 ? 1 : -1), S = {
			stroke: new Path2D(),
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: Gr
		}, C = S.stroke, w = !1;
		if (i - r >= m * 4) {
			let t = (t) => e.posToVal(t, c.key, !0), n = null, a = null, l, u, d, f = _(o[x == 1 ? r : i]), p = _(o[r]), m = _(o[i]), h = t(x == 1 ? p + 1 : m - 1);
			for (let e = x == 1 ? r : i; e >= r && e <= i; e += x) {
				let r = o[e], i = (x == 1 ? r < h : r > h) ? f : _(r), c = s[e];
				i == f ? c == null ? c === null && (w = !0) : (u = c, n == null ? (y(C, i, v(u)), l = n = a = u) : u < n ? n = u : u > a && (a = u)) : (n != null && b(C, f, v(n), v(a), v(l), v(u)), c == null ? (n = a = null, c === null && (w = !0)) : (u = c, y(C, i, v(u)), n = a = l = u), f = i, h = t(f + x));
			}
			n != null && n != a && d != f && b(C, f, v(n), v(a), v(l), v(u));
		} else for (let e = x == 1 ? r : i; e >= r && e <= i; e += x) {
			let t = s[e];
			t === null ? w = !0 : t != null && y(C, _(o[e]), v(t));
		}
		let [T, E] = Jr(e, n);
		if (a.fill != null || T != 0) {
			let t = S.fill = new Path2D(C), s = v(a.fillTo(e, n, a.min, a.max, T)), c = _(o[r]), l = _(o[i]);
			x == -1 && ([l, c] = [c, l]), y(t, l, s), y(t, c, s);
		}
		if (!a.spanGaps) {
			let l = [];
			w && l.push(...$r(o, s, r, i, x, _, t)), S.gaps = l = a.gaps(e, n, r, i, l), S.clip = Zr(l, c.ori, f, p, m, h);
		}
		return E != 0 && (S.band = E == 2 ? [Xr(e, n, r, i, C, -1), Xr(e, n, r, i, C, 1)] : Xr(e, n, r, i, C, E)), S;
	});
}
function _i(e) {
	let t = B(e.align, 1), n = B(e.ascDesc, !1), r = B(e.alignGaps, 0), i = B(e.extend, !1);
	return (e, a, o, s) => qr(e, a, (c, l, u, d, f, p, m, h, g, _, v) => {
		[o, s] = at(u, o, s);
		let y = c.pxRound, { left: b, width: x } = e.bbox, S = (e) => y(p(e, d, _, h)), C = (e) => y(m(e, f, v, g)), w = d.ori == 0 ? ii : ai, T = {
			stroke: new Path2D(),
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: Gr
		}, E = T.stroke, D = d.dir * (d.ori == 0 ? 1 : -1), O = C(u[D == 1 ? o : s]), ee = S(l[D == 1 ? o : s]), k = ee, A = ee;
		i && t == -1 && (A = b, w(E, A, O)), w(E, ee, O);
		for (let e = D == 1 ? o : s; e >= o && e <= s; e += D) {
			let n = u[e];
			if (n == null) continue;
			let r = S(l[e]), i = C(n);
			t == 1 ? w(E, r, O) : w(E, k, i), w(E, r, i), O = i, k = r;
		}
		let j = k;
		i && t == 1 && (j = b + x, w(E, j, O));
		let [te, M] = Jr(e, a);
		if (c.fill != null || te != 0) {
			let t = T.fill = new Path2D(E), n = C(c.fillTo(e, a, c.min, c.max, te));
			w(t, j, n), w(t, A, n);
		}
		if (!c.spanGaps) {
			let i = [];
			i.push(...$r(l, u, o, s, D, S, r));
			let f = c.width * I / 2, p = n || t == 1 ? f : -f, m = n || t == -1 ? -f : f;
			i.forEach((e) => {
				e[0] += p, e[1] += m;
			}), T.gaps = i = c.gaps(e, a, o, s, i), T.clip = Zr(i, d.ori, h, g, _, v);
		}
		return M != 0 && (T.band = M == 2 ? [Xr(e, a, o, s, E, -1), Xr(e, a, o, s, E, 1)] : Xr(e, a, o, s, E, M)), T;
	});
}
function vi(e, t, n, r, i, a, o = At) {
	if (e.length > 1) {
		let s = null;
		for (let c = 0, l = Infinity; c < e.length; c++) if (t[c] !== void 0) {
			if (s != null) {
				let t = V(e[c] - e[s]);
				t < l && (l = t, o = V(n(e[c], r, i, a) - n(e[s], r, i, a)));
			}
			s = c;
		}
	}
	return o;
}
function yi(e) {
	e ||= Wt;
	let t = B(e.size, [
		.6,
		At,
		1
	]), n = e.align || 0, r = e.gap || 0, i = e.radius;
	i = i == null ? [0, 0] : typeof i == "number" ? [i, 0] : i;
	let a = G(i), o = 1 - t[0], s = B(t[1], At), c = B(t[2], 1), l = B(e.disp, Wt), u = B(e.each, (e) => {}), { fill: d, stroke: f } = l;
	return (e, t, i, p) => qr(e, t, (m, h, g, _, v, y, b, x, S, C, w) => {
		let T = m.pxRound, E = n, D = r * I, O = s * I, ee = c * I, k, A;
		_.ori == 0 ? [k, A] = a(e, t) : [A, k] = a(e, t);
		let j = _.dir * (_.ori == 0 ? 1 : -1), te = _.ori == 0 ? oi : si, M = _.ori == 0 ? u : (e, t, n, r, i, a, o) => {
			u(e, t, n, i, r, o, a);
		}, N = B(e.bands, Gt).find((e) => e.series[0] == t), ne = N == null ? 0 : N.dir, re = m.fillTo(e, t, m.min, m.max, ne), ie = T(b(re, v, w, S)), P, F, ae, oe = C, se = T(m.width * I), ce = !1, le = null, ue = null, de = null, fe = null;
		d != null && (se == 0 || f != null) && (ce = !0, le = d.values(e, t, i, p), ue = /* @__PURE__ */ new Map(), new Set(le).forEach((e) => {
			e != null && ue.set(e, new Path2D());
		}), se > 0 && (de = f.values(e, t, i, p), fe = /* @__PURE__ */ new Map(), new Set(de).forEach((e) => {
			e != null && fe.set(e, new Path2D());
		})));
		let { x0: pe, size: me } = l;
		if (pe != null && me != null) {
			E = 1, h = pe.values(e, t, i, p), pe.unit == 2 && (h = h.map((t) => e.posToVal(x + t * C, _.key, !0)));
			let n = me.values(e, t, i, p);
			F = me.unit == 2 ? n[0] * C : y(n[0], _, C, x) - y(0, _, C, x), oe = vi(h, g, y, _, C, x, oe), ae = oe - F + D;
		} else oe = vi(h, g, y, _, C, x, oe), ae = oe * o + D, F = oe - ae;
		ae < 1 && (ae = 0), se >= F / 2 && (se = 0), ae < 5 && (T = Nt);
		let he = ae > 0, ge = oe - ae - (he ? se : 0);
		F = T(jt(ge, ee, O)), P = (E == 0 ? F / 2 : E == j ? 0 : F) - E * j * ((E == 0 ? D / 2 : 0) + (he ? se / 2 : 0));
		let _e = {
			stroke: null,
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: 0
		}, ve = ce ? null : new Path2D(), ye = null;
		if (N != null) ye = e.data[N.series[1]];
		else {
			let { y0: n, y1: r } = l;
			n != null && r != null && (g = r.values(e, t, i, p), ye = n.values(e, t, i, p));
		}
		let be = k * F, xe = A * F;
		for (let n = j == 1 ? i : p; n >= i && n <= p; n += j) {
			let r = g[n];
			if (r == null) continue;
			if (ye != null) {
				let e = ye[n] ?? 0;
				if (r - e == 0) continue;
				ie = b(e, v, w, S);
			}
			let i = y(_.distr != 2 || l != null ? h[n] : n, _, C, x), a = b(B(r, re), v, w, S), o = T(i - P), s = T(wt(a, ie)), c = T(Ct(a, ie)), u = s - c;
			if (r != null) {
				let i = r < 0 ? xe : be, a = r < 0 ? be : xe;
				ce ? (se > 0 && de[n] != null && te(fe.get(de[n]), o, c + H(se / 2), F, wt(0, u - se), i, a), le[n] != null && te(ue.get(le[n]), o, c + H(se / 2), F, wt(0, u - se), i, a)) : te(ve, o, c + H(se / 2), F, wt(0, u - se), i, a), M(e, t, n, o - se / 2, c, F + se, u);
			}
		}
		return se > 0 ? _e.stroke = ce ? fe : ve : ce || (_e._fill = m.width == 0 ? m._fill : m._stroke ?? m._fill, _e.width = 0), _e.fill = ce ? ue : ve, _e;
	});
}
function bi(e, t) {
	let n = B(t?.alignGaps, 0);
	return (t, r, i, a) => qr(t, r, (o, s, c, l, u, d, f, p, m, h, g) => {
		[i, a] = at(c, i, a);
		let _ = o.pxRound, v = (e) => _(d(e, l, h, p)), y = (e) => _(f(e, u, g, m)), b, x, S;
		l.ori == 0 ? (b = ni, S = ii, x = ui) : (b = ri, S = ai, x = di);
		let C = l.dir * (l.ori == 0 ? 1 : -1), w = v(s[C == 1 ? i : a]), T = w, E = [], D = [];
		for (let e = C == 1 ? i : a; e >= i && e <= a; e += C) if (c[e] != null) {
			let t = s[e], n = v(t);
			E.push(T = n), D.push(y(c[e]));
		}
		let O = {
			stroke: e(E, D, b, S, x, _),
			fill: null,
			clip: null,
			band: null,
			gaps: null,
			flags: Gr
		}, ee = O.stroke, [k, A] = Jr(t, r);
		if (o.fill != null || k != 0) {
			let e = O.fill = new Path2D(ee), n = y(o.fillTo(t, r, o.min, o.max, k));
			S(e, T, n), S(e, w, n);
		}
		if (!o.spanGaps) {
			let e = [];
			e.push(...$r(s, c, i, a, C, v, n)), O.gaps = e = o.gaps(t, r, i, a, e), O.clip = Zr(e, l.ori, p, m, h, g);
		}
		return A != 0 && (O.band = A == 2 ? [Xr(t, r, i, a, ee, -1), Xr(t, r, i, a, ee, 1)] : Xr(t, r, i, a, ee, A)), O;
	});
}
function xi(e) {
	return bi(Si, e);
}
function Si(e, t, n, r, i, a) {
	let o = e.length;
	if (o < 2) return null;
	let s = new Path2D();
	if (n(s, e[0], t[0]), o == 2) r(s, e[1], t[1]);
	else {
		let n = Array(o), r = Array(o - 1), a = Array(o - 1), c = Array(o - 1);
		for (let n = 0; n < o - 1; n++) a[n] = t[n + 1] - t[n], c[n] = e[n + 1] - e[n], r[n] = a[n] / c[n];
		n[0] = r[0];
		for (let e = 1; e < o - 1; e++) r[e] === 0 || r[e - 1] === 0 || r[e - 1] > 0 != r[e] > 0 ? n[e] = 0 : (n[e] = 3 * (c[e - 1] + c[e]) / ((2 * c[e] + c[e - 1]) / r[e - 1] + (c[e] + 2 * c[e - 1]) / r[e]), isFinite(n[e]) || (n[e] = 0));
		n[o - 1] = r[o - 2];
		for (let r = 0; r < o - 1; r++) i(s, e[r] + c[r] / 3, t[r] + n[r] * c[r] / 3, e[r + 1] - c[r] / 3, t[r + 1] - n[r + 1] * c[r] / 3, e[r + 1], t[r + 1]);
	}
	return s;
}
var Ci = /* @__PURE__ */ new Set();
function wi() {
	for (let e of Ci) e.syncRect(!0);
}
Ie && ($e(je, Re, wi), $e(Me, Re, wi, !0), $e(Pe, Re, () => {
	$.pxRatio = I;
}));
var Ti = gi(), Ei = fi();
function Di(e, t, n, r) {
	return (r ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((e, r) => ki(e, r, t, n));
}
function Oi(e, t) {
	return e.map((e, n) => n == 0 ? {} : nn({}, t, e));
}
function ki(e, t, n, r) {
	return nn({}, t == 0 ? n : r, e);
}
function Ai(e, t, n) {
	return t == null ? Kt : [t, n];
}
var ji = Ai;
function Mi(e, t, n) {
	return t == null ? Kt : mt(t, n, ut, !0);
}
function Ni(e, t, n, r) {
	return t == null ? Kt : ct(t, n, e.scales[r].log, !1);
}
var Pi = Ni;
function Fi(e, t, n, r) {
	return t == null ? Kt : lt(t, n, e.scales[r].log, !1);
}
var Ii = Fi;
function Li(e, t, n, r, i) {
	let a = wt(W(e), W(t)), o = t - e, s = tt(i / r * o, n);
	do {
		let e = n[s], t = r * e / o;
		if (t >= i && a + (e < 5 ? J.get(e) : 0) <= 17) return [e, t];
	} while (++s < n.length);
	return [0, 0];
}
function Ri(e) {
	let t, n;
	return e = e.replace(/(\d+)px/, (e, r) => (t = xt((n = +r) * I)) + "px"), [
		e,
		t,
		n
	];
}
function zi(e) {
	e.show && [e.font, e.labelFont].forEach((e) => {
		let t = q(e[2] * I, 1);
		e[0] = e[0].replace(/[0-9.]+px/, t + "px"), e[1] = t;
	});
}
function $(e, t, n) {
	let r = { mode: B(e.mode, 1) }, i = r.mode;
	function a(e, t, n, r) {
		let i = t.valToPct(e);
		return r + n * (t.dir == -1 ? 1 - i : i);
	}
	function o(e, t, n, r) {
		let i = t.valToPct(e);
		return r + n * (t.dir == -1 ? i : 1 - i);
	}
	function s(e, t, n, r) {
		return t.ori == 0 ? a(e, t, n, r) : o(e, t, n, r);
	}
	r.valToPosH = a, r.valToPosV = o;
	let c = !1;
	r.status = 0;
	let l = r.root = Ge(te);
	if (e.id != null && (l.id = e.id), Ve(l, e.class), e.title) {
		let t = Ge(ne, l);
		t.textContent = e.title;
	}
	let u = We("canvas"), d = r.ctx = u.getContext("2d"), f = Ge(re, l);
	$e("click", f, (e) => {
		e.target === m && (yi != hi || bi != gi) && Si.click(r, e);
	}, !0);
	let p = r.under = Ge(ie, f);
	f.appendChild(u);
	let m = r.over = Ge(P, f);
	e = tn(e);
	let h = +B(e.pxAlign, 1), g = ei(h);
	(e.plugins || []).forEach((t) => {
		t.opts && (e = t.opts(r, e) || e);
	});
	let _ = e.ms || .001, v = r.series = i == 1 ? Di(e.series || [], br, zr, !1) : Oi(e.series || [null], Rr), y = r.axes = Di(e.axes || [], _r, Nr, !0), b = r.scales = {}, x = r.bands = e.bands || [];
	x.forEach((e) => {
		e.fill = G(e.fill || null), e.dir = B(e.dir, -1);
	});
	let S = i == 2 ? v[1].facets[0].scale : v[0].scale, C = {
		axes: Qr,
		series: Dr
	}, w = (e.drawOrder || ["axes", "series"]).map((e) => C[e]);
	function T(e) {
		let t = e.distr == 3 ? (t) => Et(t > 0 ? t : e.clamp(r, t, e.min, e.max, e.key)) : e.distr == 4 ? (t) => kt(t, e.asinh) : e.distr == 100 ? (t) => e.fwd(t) : (e) => e;
		return (n) => {
			let r = t(n), { _min: i, _max: a } = e, o = a - i;
			return (r - i) / o;
		};
	}
	function E(t) {
		let n = b[t];
		if (n == null) {
			let r = (e.scales || Wt)[t] || Wt;
			if (r.from != null) {
				E(r.from);
				let e = nn({}, b[r.from], r, { key: t });
				e.valToPct = T(e), b[t] = e;
			} else {
				n = b[t] = nn({}, t == S ? Vr : Hr, r), n.key = t;
				let e = n.time, a = n.range, o = qt(a);
				if ((t != S || i == 2 && !e) && (o && (a[0] == null || a[1] == null) && (a = {
					min: a[0] == null ? dt : {
						mode: 1,
						hard: a[0],
						soft: a[0]
					},
					max: a[1] == null ? dt : {
						mode: 1,
						hard: a[1],
						soft: a[1]
					}
				}, o = !1), !o && Zt(a))) {
					let e = a;
					a = (t, n, r) => n == null ? Kt : mt(n, r, e);
				}
				n.range = G(a || (e ? ji : t == S ? n.distr == 3 ? Pi : n.distr == 4 ? Ii : Ai : n.distr == 3 ? Ni : n.distr == 4 ? Fi : Mi)), n.auto = G(!o && n.auto), n.clamp = G(n.clamp || Br), n._min = n._max = null, n.valToPct = T(n);
			}
		}
	}
	E("x"), E("y"), i == 1 && v.forEach((e) => {
		E(e.scale);
	}), y.forEach((e) => {
		E(e.scale);
	});
	for (let t in e.scales) E(t);
	let D = b[S], O = D.distr, ee, k;
	D.ori == 0 ? (Ve(l, M), ee = a, k = o) : (Ve(l, N), ee = o, k = a);
	let A = {};
	for (let e in b) {
		let t = b[e];
		(t.min != null || t.max != null) && (A[e] = {
			min: t.min,
			max: t.max
		}, t.min = t.max = null);
	}
	let j = e.tzDate || ((e) => new Date(xt(e / _))), Ce = e.fmtDate || bn, je = _ == 1 ? Vn(j) : Wn(j), Me = Kn(j, Gn(_ == 1 ? Bn : Un, Ce)), Ne = Zn(j, Yn(Xn, Ce)), Ie = [], ze = r.legend = nn({}, er, e.legend), R = r.cursor = nn({}, lr, { drag: { y: i == 2 } }, e.cursor), Be = ze.show, Ke = R.show, Je = ze.markers;
	ze.idxs = Ie, Je.width = G(Je.width), Je.dash = G(Je.dash), Je.stroke = G(Je.stroke), Je.fill = G(Je.fill);
	let Xe, Ze, Qe, nt = [], rt = [], it, at = !1, ot = {};
	if (ze.live) {
		let e = v[1] ? v[1].values : null;
		at = e != null, it = at ? e(r, 1, 0) : { _: 0 };
		for (let e in it) ot[e] = Fe;
	}
	if (Be) {
		if (Xe = We("table", ue, l), Qe = We("tbody", null, Xe), ze.mount(r, Xe), at) {
			Ze = We("thead", null, Xe, Qe);
			let e = We("tr", null, Ze);
			for (var ft in We("th", null, e), it) We("th", he, e).textContent = ft;
		} else Ve(Xe, fe), ze.live && Ve(Xe, de);
	}
	let pt = { show: !0 }, gt = { show: !1 };
	function _t(e, t) {
		if (t == 0 && (at || !ze.live || i == 2)) return Kt;
		let n = [], a = We("tr", pe, Qe, Qe.childNodes[t]);
		Ve(a, e.class), e.show || Ve(a, ae);
		let o = We("th", null, a);
		if (Je.show) {
			let e = Ge(me, o);
			if (t > 0) {
				let n = Je.width(r, t);
				n && (e.style.border = n + "px " + Je.dash(r, t) + " " + Je.stroke(r, t)), e.style.background = Je.fill(r, t);
			}
		}
		let s = Ge(he, o);
		for (var c in e.label instanceof HTMLElement ? s.appendChild(e.label) : s.textContent = e.label, t > 0 && (Je.show || (s.style.color = e.width > 0 ? Je.stroke(r, t) : Je.fill(r, t)), yt("click", o, (t) => {
			if (R._lock) return;
			_n(t);
			let n = v.indexOf(e);
			if ((t.ctrlKey || t.metaKey) != ze.isolate) {
				let e = v.some((e, t) => t > 0 && t != n && e.show);
				v.forEach((t, r) => {
					r > 0 && Gi(r, e ? r == n ? pt : gt : pt, !0, Aa.setSeries);
				});
			} else Gi(n, { show: !e.show }, !0, Aa.setSeries);
		}, !1), xn && yt(Oe, o, (t) => {
			R._lock || (_n(t), Gi(v.indexOf(e), $i, !0, Aa.setSeries));
		}, !1)), it) {
			let e = We("td", ge, a);
			e.textContent = "--", n.push(e);
		}
		return [a, n];
	}
	let vt = /* @__PURE__ */ new Map();
	function yt(e, t, n, i = !0) {
		let a = vt.get(t) || {}, o = R.bind[e](r, t, n, i);
		o && ($e(e, t, a[e] = o), vt.set(t, a));
	}
	function H(e, t, n) {
		let r = vt.get(t) || {};
		for (let n in r) (e == null || n == e) && (et(n, t, r[n]), delete r[n]);
		e ?? vt.delete(t);
	}
	let Tt = 0, Dt = 0, W = 0, K = 0, Nt = 0, Rt = 0, zt = Nt, Vt = Rt, Ht = W, Y = K, Jt = 0, $t = 0, en = 0, rn = 0;
	r.bbox = {};
	let an = !1, on = !1, X = !1, sn = !1, ln = !1, un = !1;
	function dn(e, t, n) {
		(n || e != r.width || t != r.height) && fn(e, t), $r(!1), X = !0, on = !0, ai();
	}
	function fn(e, t) {
		r.width = Tt = W = e, r.height = Dt = K = t, Nt = Rt = 0, hn(), gn();
		let n = r.bbox;
		Jt = n.left = Bt(Nt * I, .5), $t = n.top = Bt(Rt * I, .5), en = n.width = Bt(W * I, .5), rn = n.height = Bt(K * I, .5);
	}
	function pn() {
		let e = !1, t = 0;
		for (; !e;) {
			t++;
			let n = Xr(t), i = Zr(t);
			e = t == 3 || n && i, e || (fn(r.width, r.height), on = !0);
		}
	}
	function mn({ width: e, height: t }) {
		dn(e, t);
	}
	r.setSize = mn;
	function hn() {
		let e = !1, t = !1, n = !1, r = !1;
		y.forEach((i, a) => {
			if (i.show && i._show) {
				let { side: a, _size: o } = i, s = a % 2, c = o + (i.label == null ? 0 : i.labelSize);
				c > 0 && (s ? (W -= c, a == 3 ? (Nt += c, r = !0) : n = !0) : (K -= c, a == 0 ? (Rt += c, e = !0) : t = !0));
			}
		}), Mn[0] = e, Mn[1] = n, Mn[2] = t, Mn[3] = r, W -= In[1] + In[3], Nt += In[3], K -= In[2] + In[0], Rt += In[0];
	}
	function gn() {
		let e = Nt + W, t = Rt + K, n = Nt, r = Rt;
		function i(i, a) {
			switch (i) {
				case 1: return e += a, e - a;
				case 2: return t += a, t - a;
				case 3: return n -= a, n + a;
				case 0: return r -= a, r + a;
			}
		}
		y.forEach((e, t) => {
			if (e.show && e._show) {
				let t = e.side;
				e._pos = i(t, e._size), e.label != null && (e._lpos = i(t, e.labelSize));
			}
		});
	}
	if (R.dataIdx == null) {
		let e = R.hover, n = e.skip = new Set(e.skip ?? []);
		n.add(void 0);
		let r = e.prox = G(e.prox), i = e.bias ??= 0;
		R.dataIdx = (e, a, o, s) => {
			if (a == 0) return o;
			let c = o, l = r(e, a, o, s) ?? At, u = l >= 0 && l < At, d = D.ori == 0 ? W : K, f = R.left, p = t[0], m = t[a];
			if (n.has(m[o])) {
				c = null;
				let e = null, t = null, r;
				if (i == 0 || i == -1) for (r = o; e == null && r-- > 0;) n.has(m[r]) || (e = r);
				if (i == 0 || i == 1) for (r = o; t == null && r++ < m.length;) n.has(m[r]) || (t = r);
				if (e != null || t != null) {
					if (u) {
						let n = e == null ? -Infinity : ee(p[e], D, d, 0), r = t == null ? Infinity : ee(p[t], D, d, 0), i = f - n, a = r - f;
						i <= a ? i <= l && (c = e) : a <= l && (c = t);
					} else c = t == null ? e : e == null ? t : o - e <= t - o ? e : t;
				}
			} else u && V(f - ee(p[o], D, d, 0)) > l && (c = null);
			return c;
		};
	}
	let _n = (e) => {
		R.event = e;
	};
	R.idxs = Ie, R._lock = !1;
	let vn = R.points;
	vn.show = G(vn.show), vn.size = G(vn.size), vn.stroke = G(vn.stroke), vn.width = G(vn.width), vn.fill = G(vn.fill);
	let yn = r.focus = nn({}, e.focus || { alpha: .3 }, R.focus), xn = yn.prox >= 0, Sn = xn && vn.one, Cn = [], wn = [], Tn = [];
	function En(e, t) {
		let n = vn.show(r, t);
		if (n instanceof HTMLElement) return Ve(n, le), Ve(n, e.class), qe(n, -10, -10, W, K), m.insertBefore(n, Cn[t]), n;
	}
	function kn(e, t) {
		if (i == 1 || t > 0) {
			let t = i == 1 && b[e.scale].time, n = e.value;
			e.value = t ? Xt(n) ? Zn(j, Yn(n, Ce)) : n || Ne : n || Mr, e.label = e.label || (t ? yr : vr);
		}
		if (Sn || t > 0) {
			e.width = e.width == null ? 1 : e.width, e.paths = e.paths || Ti || Ft, e.fillTo = G(e.fillTo || Yr), e.pxAlign = +B(e.pxAlign, h), e.pxRound = ei(e.pxAlign), e.stroke = G(e.stroke || null), e.fill = G(e.fill || null), e._stroke = e._fill = e._paths = e._focus = null;
			let t = Pr(wt(1, e.width), 1), n = e.points = nn({}, {
				size: t,
				width: wt(1, t * .2),
				stroke: e.stroke,
				space: t * 2,
				paths: Ei,
				_stroke: null,
				_fill: null
			}, e.points);
			n.show = G(n.show), n.filter = G(n.filter), n.fill = G(n.fill), n.stroke = G(n.stroke), n.paths = G(n.paths), n.pxAlign = e.pxAlign;
		}
		if (Be) {
			let n = _t(e, t);
			nt.splice(t, 0, n[0]), rt.splice(t, 0, n[1]), ze.values.push(null);
		}
		if (Ke) {
			Ie.splice(t, 0, null);
			let n = null;
			Sn ? t == 0 && (n = En(e, t)) : t > 0 && (n = En(e, t)), Cn.splice(t, 0, n), wn.splice(t, 0, 0), Tn.splice(t, 0, 0);
		}
		Oa("addSeries", t);
	}
	function An(e, t) {
		t ??= v.length, e = i == 1 ? ki(e, t, br, zr) : ki(e, t, {}, Rr), v.splice(t, 0, e), kn(v[t], t);
	}
	r.addSeries = An;
	function jn(e) {
		if (v.splice(e, 1), Be) {
			ze.values.splice(e, 1), rt.splice(e, 1);
			let t = nt.splice(e, 1)[0];
			H(null, t.firstChild), t.remove();
		}
		Ke && (Ie.splice(e, 1), Cn.splice(e, 1)[0].remove(), wn.splice(e, 1), Tn.splice(e, 1)), Oa("delSeries", e);
	}
	r.delSeries = jn;
	let Mn = [
		!1,
		!1,
		!1,
		!1
	];
	function Nn(e, t) {
		if (e._show = e.show, e.show) {
			let n = e.side % 2, i = b[e.scale];
			i ??= (e.scale = n ? v[1].scale : S, b[e.scale]);
			let a = i.time;
			e.size = G(e.size), e.space = G(e.space), e.rotate = G(e.rotate), qt(e.incrs) && e.incrs.forEach((e) => {
				!J.has(e) && J.set(e, Ut(e));
			}), e.incrs = G(e.incrs || (i.distr == 2 ? Dn : a ? _ == 1 ? zn : Hn : On)), e.splits = G(e.splits || (a && i.distr == 1 ? je : i.distr == 3 ? Cr : i.distr == 4 ? wr : Sr)), e.stroke = G(e.stroke), e.grid.stroke = G(e.grid.stroke), e.ticks.stroke = G(e.ticks.stroke), e.border.stroke = G(e.border.stroke);
			let o = e.values;
			e.values = qt(o) && !qt(o[0]) ? G(o) : a ? qt(o) ? Kn(j, Gn(o, Ce)) : Xt(o) ? qn(j, o) : o || Me : o || xr, e.filter = G(e.filter || (i.distr >= 3 && i.log == 10 ? Ar : i.distr == 3 && i.log == 2 ? jr : Pt)), e.font = Ri(e.font), e.labelFont = Ri(e.labelFont), e._size = e.size(r, null, t, 0), e._space = e._rotate = e._incrs = e._found = e._splits = e._values = null, e._size > 0 && (Mn[t] = !0, e._el = Ge(F, f));
		}
	}
	function Pn(e, t, n, r) {
		let [i, a, o, s] = n, c = t % 2, l = 0;
		return c == 0 && (s || a) && (l = t == 0 && !i || t == 2 && !o ? xt(_r.size / 3) : 0), c == 1 && (i || o) && (l = t == 1 && !a || t == 3 && !s ? xt(Nr.size / 2) : 0), l;
	}
	let Fn = r.padding = (e.padding || [
		Pn,
		Pn,
		Pn,
		Pn
	]).map((e) => G(B(e, Pn))), In = r._padding = Fn.map((e, t) => e(r, t, Mn, 0)), Z, Ln = null, Q = null, Rn = i == 1 ? v[0].idxs : null, Jn = null, Qn = !1;
	function $n(e, n) {
		if (t = e ?? [], r.data = r._data = t, i == 2) {
			Z = 0;
			for (let e = 1; e < v.length; e++) Z += t[e][0].length;
		} else {
			t.length == 0 && (r.data = r._data = t = [[]]), Jn = t[0], Z = Jn.length;
			let e = t;
			if (O == 2) {
				e = t.slice();
				let n = e[0] = Array(Z);
				for (let e = 0; e < Z; e++) n[e] = e;
			}
			r._data = t = e;
		}
		if ($r(!0), Oa("setData"), O == 2 && (X = !0), n !== !1) {
			let e = D;
			e.auto(r, Qn) ? tr() : Wi(S, e.min, e.max), sn ||= R.left >= 0, un = !0, ai();
		}
	}
	r.setData = $n;
	function tr() {
		Qn = !0;
		let e, n;
		i == 1 && (Z > 0 ? (Ln = Rn[0] = 0, Q = Rn[1] = Z - 1, e = t[0][Ln], n = t[0][Q], O == 2 ? (e = Ln, n = Q) : e == n && (O == 3 ? [e, n] = ct(e, e, D.log, !1) : O == 4 ? [e, n] = lt(e, e, D.log, !1) : D.time ? n = e + xt(86400 / _) : [e, n] = mt(e, n, ut, !0))) : (Ln = Rn[0] = e = null, Q = Rn[1] = n = null)), Wi(S, e, n);
	}
	let nr, rr, ir, ar, or, sr, cr, ur, dr, fr;
	function pr(e, t, n, r, i, a) {
		e ??= we, n ??= Gt, r ??= "butt", i ??= we, a ??= "round", e != nr && (d.strokeStyle = nr = e), i != rr && (d.fillStyle = rr = i), t != ir && (d.lineWidth = ir = t), a != or && (d.lineJoin = or = a), r != sr && (d.lineCap = sr = r), n != ar && d.setLineDash(ar = n);
	}
	function mr(e, t, n, r) {
		t != rr && (d.fillStyle = rr = t), e != cr && (d.font = cr = e), n != ur && (d.textAlign = ur = n), r != dr && (d.textBaseline = dr = r);
	}
	function hr(e, t, n, i, a = 0) {
		if (i.length > 0 && e.auto(r, Qn) && (t == null || t.min == null)) {
			let t = B(Ln, 0), r = B(Q, i.length - 1), o = n.min == null ? st(i, t, r, a, e.distr == 3) : [n.min, n.max];
			e.min = Ct(e.min, n.min = o[0]), e.max = wt(e.max, n.max = o[1]);
		}
	}
	let gr = {
		min: null,
		max: null
	};
	function Tr() {
		for (let e in b) {
			let t = b[e];
			A[e] == null && (t.min == null || A[S] != null && t.auto(r, Qn)) && (A[e] = gr);
		}
		for (let e in b) {
			let t = b[e];
			A[e] == null && t.from != null && A[t.from] != null && (A[e] = gr);
		}
		A[S] != null && $r(!0);
		let e = {};
		for (let t in A) {
			let n = A[t];
			if (n != null) {
				let a = e[t] = tn(b[t], Qt);
				if (n.min != null) nn(a, n);
				else if (t != S || i == 2) {
					if (Z == 0 && a.from == null) {
						let e = a.range(r, null, null, t);
						a.min = e[0], a.max = e[1];
					} else a.min = At, a.max = -Infinity;
				}
			}
		}
		if (Z > 0) {
			v.forEach((n, a) => {
				if (i == 1) {
					let i = n.scale, o = A[i];
					if (o == null) return;
					let s = e[i];
					if (a == 0) {
						let e = s.range(r, s.min, s.max, i);
						s.min = e[0], s.max = e[1], Ln = tt(s.min, t[0]), Q = tt(s.max, t[0]), Q - Ln > 1 && (t[0][Ln] < s.min && Ln++, t[0][Q] > s.max && Q--), n.min = Jn[Ln], n.max = Jn[Q];
					} else n.show && n.auto && hr(s, o, n, t[a], n.sorted);
					n.idxs[0] = Ln, n.idxs[1] = Q;
				} else if (a > 0 && n.show && n.auto) {
					let [r, i] = n.facets, o = r.scale, s = i.scale, [c, l] = t[a], u = e[o], d = e[s];
					u != null && hr(u, A[o], r, c, r.sorted), d != null && hr(d, A[s], i, l, i.sorted), n.min = i.min, n.max = i.max;
				}
			});
			for (let t in e) {
				let n = e[t], i = A[t];
				if (n.from == null && (i == null || i.min == null)) {
					let e = n.range(r, n.min == At ? null : n.min, n.max == -Infinity ? null : n.max, t);
					n.min = e[0], n.max = e[1];
				}
			}
		}
		for (let t in e) {
			let n = e[t];
			if (n.from != null) {
				let i = e[n.from];
				if (i.min == null) n.min = n.max = null;
				else {
					let e = n.range(r, i.min, i.max, t);
					n.min = e[0], n.max = e[1];
				}
			}
		}
		let n = {}, a = !1;
		for (let t in e) {
			let r = e[t], i = b[t];
			if (i.min != r.min || i.max != r.max) {
				i.min = r.min, i.max = r.max;
				let e = i.distr;
				i._min = e == 3 ? Et(i.min) : e == 4 ? kt(i.min, i.asinh) : e == 100 ? i.fwd(i.min) : i.min, i._max = e == 3 ? Et(i.max) : e == 4 ? kt(i.max, i.asinh) : e == 100 ? i.fwd(i.max) : i.max, n[t] = a = !0;
			}
		}
		if (a) {
			v.forEach((e, t) => {
				i == 2 ? t > 0 && n.y && (e._paths = null) : n[e.scale] && (e._paths = null);
			});
			for (let e in n) X = !0, Oa("setScale", e);
			Ke && R.left >= 0 && (sn = un = !0);
		}
		for (let e in A) A[e] = null;
	}
	function Er(e) {
		let t = jt(Ln - 1, 0, Z - 1), n = jt(Q + 1, 0, Z - 1);
		for (; e[t] == null && t > 0;) t--;
		for (; e[n] == null && n < Z - 1;) n++;
		return [t, n];
	}
	function Dr() {
		if (Z > 0) {
			let e = v.some((e) => e._focus) && fr != yn.alpha;
			e && (d.globalAlpha = fr = yn.alpha), v.forEach((e, n) => {
				if (n > 0 && e.show && (Or(n, !1), Or(n, !0), e._paths == null)) {
					let a = fr;
					fr != e.alpha && (d.globalAlpha = fr = e.alpha);
					let o = i == 2 ? [0, t[n][0].length - 1] : Er(t[n]);
					e._paths = e.paths(r, n, o[0], o[1]), fr != a && (d.globalAlpha = fr = a);
				}
			}), v.forEach((e, t) => {
				if (t > 0 && e.show) {
					let n = fr;
					fr != e.alpha && (d.globalAlpha = fr = e.alpha), e._paths != null && kr(t, !1);
					{
						let n = e._paths == null ? null : e._paths.gaps, i = e.points.show(r, t, Ln, Q, n), a = e.points.filter(r, t, i, n);
						(i || a) && (e.points._paths = e.points.paths(r, t, Ln, Q, a), kr(t, !0));
					}
					fr != n && (d.globalAlpha = fr = n), Oa("drawSeries", t);
				}
			}), e && (d.globalAlpha = fr = 1);
		}
	}
	function Or(e, t) {
		let n = t ? v[e].points : v[e];
		n._stroke = n.stroke(r, e), n._fill = n.fill(r, e);
	}
	function kr(e, t) {
		let n = t ? v[e].points : v[e], { stroke: r, fill: i, clip: a, flags: o, _stroke: s = n._stroke, _fill: c = n._fill, _width: l = n.width } = n._paths;
		l = q(l * I, 3);
		let u = null, f = l % 2 / 2;
		t && c == null && (c = l > 0 ? "#fff" : s);
		let p = n.pxAlign == 1 && f > 0;
		if (p && d.translate(f, f), !t) {
			let e = Jt - l / 2, t = $t - l / 2, n = en + l, r = rn + l;
			u = new Path2D(), u.rect(e, t, n, r);
		}
		t ? Ir(s, l, n.dash, n.cap, c, r, i, o, a) : Fr(e, s, l, n.dash, n.cap, c, r, i, o, u, a), p && d.translate(-f, -f);
	}
	function Fr(e, n, i, a, o, s, c, l, u, d, f) {
		let p = !1;
		u != 0 && x.forEach((m, h) => {
			if (m.series[0] == e) {
				let e = v[m.series[1]], g = t[m.series[1]], _ = (e._paths || Wt).band;
				qt(_) && (_ = m.dir == 1 ? _[0] : _[1]);
				let y, b = null;
				e.show && _ && ht(g, Ln, Q) ? (b = m.fill(r, h) || s, y = e._paths.clip) : _ = null, Ir(n, i, a, o, b, c, l, u, d, f, y, _), p = !0;
			}
		}), p || Ir(n, i, a, o, s, c, l, u, d, f);
	}
	function Ir(e, t, n, r, i, a, o, s, c, l, u, f) {
		pr(e, t, n, r, i), (c || l || f) && (d.save(), c && d.clip(c), l && d.clip(l)), f ? (s & 3) == 3 ? (d.clip(f), u && d.clip(u), Ur(i, o), Lr(e, a, t)) : s & Kr ? (Ur(i, o), d.clip(f), Lr(e, a, t)) : s & Gr && (d.save(), d.clip(f), u && d.clip(u), Ur(i, o), d.restore(), Lr(e, a, t)) : (Ur(i, o), Lr(e, a, t)), (c || l || f) && d.restore();
	}
	function Lr(e, t, n) {
		n > 0 && (t instanceof Map ? t.forEach((e, t) => {
			d.strokeStyle = nr = t, d.stroke(e);
		}) : t != null && e && d.stroke(t));
	}
	function Ur(e, t) {
		t instanceof Map ? t.forEach((e, t) => {
			d.fillStyle = rr = t, d.fill(e);
		}) : t != null && e && d.fill(t);
	}
	function qr(e, t, n, i) {
		let a = y[e], o;
		if (i <= 0) o = [0, 0];
		else {
			let s = a._space = a.space(r, e, t, n, i);
			o = Li(t, n, a._incrs = a.incrs(r, e, t, n, i, s), i, s);
		}
		return a._found = o;
	}
	function Jr(e, t, n, r, i, a, o, s, c, l) {
		let u = o % 2 / 2;
		h == 1 && d.translate(u, u), pr(s, o, c, l, s), d.beginPath();
		let f, p, m, g, _ = i + (r == 0 || r == 3 ? -a : a);
		n == 0 ? (p = i, g = _) : (f = i, m = _);
		for (let r = 0; r < e.length; r++) t[r] != null && (n == 0 ? f = m = e[r] : p = g = e[r], d.moveTo(f, p), d.lineTo(m, g));
		d.stroke(), h == 1 && d.translate(-u, -u);
	}
	function Xr(e) {
		let t = !0;
		return y.forEach((n, i) => {
			if (!n.show) return;
			let a = b[n.scale];
			if (a.min == null) {
				n._show && (t = !1, n._show = !1, $r(!1));
				return;
			}
			n._show || (t = !1, n._show = !0, $r(!1));
			let o = n.side, s = o % 2, { min: c, max: l } = a, [u, d] = qr(i, c, l, s == 0 ? W : K);
			if (d == 0) return;
			let f = a.distr == 2, p = n._splits = n.splits(r, i, c, l, u, d, f), m = a.distr == 2 ? p.map((e) => Jn[e]) : p, h = a.distr == 2 ? Jn[p[1]] - Jn[p[0]] : u, g = n._values = n.values(r, n.filter(r, m, i, d, h), i, d, h);
			n._rotate = o == 2 ? n.rotate(r, g, i, d) : 0;
			let _ = n._size;
			n._size = St(n.size(r, g, i, e)), _ != null && n._size != _ && (t = !1);
		}), t;
	}
	function Zr(e) {
		let t = !0;
		return Fn.forEach((n, i) => {
			let a = n(r, i, Mn, e);
			a != In[i] && (t = !1), In[i] = a;
		}), t;
	}
	function Qr() {
		for (let e = 0; e < y.length; e++) {
			let t = y[e];
			if (!t.show || !t._show) continue;
			let n = t.side, i = n % 2, a, o, c = t.stroke(r, e), l = n == 0 || n == 3 ? -1 : 1, [u, f] = t._found;
			if (t.label != null) {
				let s = t.labelGap * l, p = xt((t._lpos + s) * I);
				mr(t.labelFont[0], c, "center", n == 2 ? ye : be), d.save(), i == 1 ? (a = o = 0, d.translate(p, xt($t + rn / 2)), d.rotate((n == 3 ? -bt : bt) / 2)) : (a = xt(Jt + en / 2), o = p);
				let m = Mt(t.label) ? t.label(r, e, u, f) : t.label;
				d.fillText(m, a, o), d.restore();
			}
			if (f == 0) continue;
			let p = b[t.scale], m = i == 0 ? en : rn, h = i == 0 ? Jt : $t, _ = t._splits, v = p.distr == 2 ? _.map((e) => Jn[e]) : _, x = p.distr == 2 ? Jn[_[1]] - Jn[_[0]] : u, S = t.ticks, C = t.border, w = S.show ? S.size : 0, T = xt(w * I), E = xt((t.alignTo == 2 ? t._size - w - t.gap : t.gap) * I), D = t._rotate * -bt / 180, O = g(t._pos * I), ee = O + (T + E) * l;
			o = i == 0 ? ee : 0, a = i == 1 ? ee : 0;
			let k = t.font[0];
			mr(k, c, t.align == 1 ? xe : t.align == 2 ? Se : D > 0 ? xe : D < 0 ? Se : i == 0 ? "center" : n == 3 ? Se : xe, D || i == 1 ? "middle" : n == 2 ? ye : be);
			let A = t.font[1] * t.lineGap, j = _.map((e) => g(s(e, p, m, h))), te = t._values;
			for (let e = 0; e < te.length; e++) {
				let t = te[e];
				if (t != null) {
					i == 0 ? a = j[e] : o = j[e], t = "" + t;
					let n = t.indexOf("\n") == -1 ? [t] : t.split(/\n/gm);
					for (let e = 0; e < n.length; e++) {
						let t = n[e];
						D ? (d.save(), d.translate(a, o + e * A), d.rotate(D), d.fillText(t, 0, 0), d.restore()) : d.fillText(t, a, o + e * A);
					}
				}
			}
			S.show && Jr(j, S.filter(r, v, e, f, x), i, n, O, T, q(S.width * I, 3), S.stroke(r, e), S.dash, S.cap);
			let M = t.grid;
			M.show && Jr(j, M.filter(r, v, e, f, x), i, i == 0 ? 2 : 1, i == 0 ? $t : Jt, i == 0 ? rn : en, q(M.width * I, 3), M.stroke(r, e), M.dash, M.cap), C.show && Jr([O], [1], +(i == 0), i == 0 ? 1 : 2, i == 1 ? $t : Jt, i == 1 ? rn : en, q(C.width * I, 3), C.stroke(r, e), C.dash, C.cap);
		}
		Oa("drawAxes");
	}
	function $r(e) {
		v.forEach((t, n) => {
			n > 0 && (t._paths = null, e && (i == 1 ? (t.min = null, t.max = null) : t.facets.forEach((e) => {
				e.min = null, e.max = null;
			})));
		});
	}
	let ti = !1, ni = !1, ri = [];
	function ii() {
		ni = !1;
		for (let e = 0; e < ri.length; e++) Oa(...ri[e]);
		ri.length = 0;
	}
	function ai() {
		ti ||= (cn(si), !0);
	}
	function oi(e, t = !1) {
		ti = !0, ni = t, e(r), si(), t && ri.length > 0 && queueMicrotask(ii);
	}
	r.batch = oi;
	function si() {
		if (an &&= (Tr(), !1), X &&= (pn(), !1), on) {
			if (Ue(p, xe, Nt), Ue(p, ye, Rt), Ue(p, _e, W), Ue(p, ve, K), Ue(m, xe, Nt), Ue(m, ye, Rt), Ue(m, _e, W), Ue(m, ve, K), Ue(f, _e, Tt), Ue(f, ve, Dt), u.width = xt(Tt * I), u.height = xt(Dt * I), y.forEach(({ _el: e, _show: t, _size: n, _pos: r, side: i }) => {
				if (e != null) {
					if (t) {
						let t = i === 3 || i === 0 ? n : 0, a = i % 2 == 1;
						Ue(e, a ? "left" : "top", r - t), Ue(e, a ? "width" : "height", n), Ue(e, a ? "top" : "left", a ? Rt : Nt), Ue(e, a ? "height" : "width", a ? K : W), He(e, ae);
					} else Ve(e, ae);
				}
			}), nr = rr = ir = or = sr = cr = ur = dr = ar = null, fr = 1, fa(!0), Nt != zt || Rt != Vt || W != Ht || K != Y) {
				$r(!1);
				let e = W / Ht, t = K / Y;
				if (Ke && !sn && R.left >= 0) {
					R.left *= e, R.top *= t, di && qe(di, xt(R.left), 0, W, K), fi && qe(fi, 0, xt(R.top), W, K);
					for (let n = 0; n < Cn.length; n++) {
						let r = Cn[n];
						r != null && (wn[n] *= e, Tn[n] *= t, qe(r, St(wn[n]), St(Tn[n]), W, K));
					}
				}
				if (Bi.show && !ln && Bi.left >= 0 && Bi.width > 0) {
					Bi.left *= e, Bi.width *= e, Bi.top *= t, Bi.height *= t;
					for (let e in ha) Ue(Vi, e, Bi[e]);
				}
				zt = Nt, Vt = Rt, Ht = W, Y = K;
			}
			Oa("setSize"), on = !1;
		}
		Tt > 0 && Dt > 0 && (d.clearRect(0, 0, u.width, u.height), Oa("drawClear"), w.forEach((e) => e()), Oa("draw")), Bi.show && ln && (Hi(Bi), ln = !1), Ke && sn && (ua(null, !0, !1), sn = !1), ze.show && ze.live && un && (ca(), un = !1), c || (c = !0, r.status = 1, Oa("ready")), Qn = !1, ti = !1;
	}
	r.redraw = (e, t) => {
		X = t || !1, e === !1 ? ai() : Wi(S, D.min, D.max);
	};
	function ci(e, n) {
		let i = b[e];
		if (i.from == null) {
			if (Z == 0) {
				let t = i.range(r, n.min, n.max, e);
				n.min = t[0], n.max = t[1];
			}
			if (n.min > n.max) {
				let e = n.min;
				n.min = n.max, n.max = e;
			}
			if (Z > 1 && n.min != null && n.max != null && n.max - n.min < 1e-16) return;
			e == S && i.distr == 2 && Z > 0 && (n.min = tt(n.min, t[0]), n.max = tt(n.max, t[0]), n.min == n.max && n.max++), A[e] = n, an = !0, ai();
		}
	}
	r.setScale = ci;
	let li, ui, di, fi, pi, mi, hi, gi, _i, vi, yi, bi, xi = !1, Si = R.drag, wi = Si.x, $ = Si.y;
	Ke && (R.x && (li = Ge(se, m)), R.y && (ui = Ge(ce, m)), D.ori == 0 ? (di = li, fi = ui) : (di = ui, fi = li), yi = R.left, bi = R.top);
	let Bi = r.select = nn({
		show: !0,
		over: !0,
		left: 0,
		width: 0,
		top: 0,
		height: 0
	}, e.select), Vi = Bi.show ? Ge(oe, Bi.over ? m : p) : null;
	function Hi(e, t) {
		if (Bi.show) {
			for (let t in e) Bi[t] = e[t], t in ha && Ue(Vi, t, e[t]);
			t !== !1 && Oa("setSelect");
		}
	}
	r.setSelect = Hi;
	function Ui(e) {
		if (v[e].show) Be && He(nt[e], ae);
		else if (Be && Ve(nt[e], ae), Ke) {
			let t = Sn ? Cn[0] : Cn[e];
			t != null && qe(t, -10, -10, W, K);
		}
	}
	function Wi(e, t, n) {
		ci(e, {
			min: t,
			max: n
		});
	}
	function Gi(e, t, n, a) {
		t.focus != null && ea(e), t.show != null && v.forEach((n, r) => {
			r > 0 && (e == r || e == null) && (n.show = t.show, Ui(r), i == 2 ? (Wi(n.facets[0].scale, null, null), Wi(n.facets[1].scale, null, null)) : Wi(n.scale, null, null), ai());
		}), n !== !1 && Oa("setSeries", e, t), a && Na("setSeries", r, e, t);
	}
	r.setSeries = Gi;
	function Ki(e, t) {
		nn(x[e], t);
	}
	function qi(e, t) {
		e.fill = G(e.fill || null), e.dir = B(e.dir, -1), t ??= x.length, x.splice(t, 0, e);
	}
	function Ji(e) {
		e == null ? x.length = 0 : x.splice(e, 1);
	}
	r.addBand = qi, r.setBand = Ki, r.delBand = Ji;
	function Yi(e, t) {
		v[e].alpha = t, Ke && Cn[e] != null && (Cn[e].style.opacity = t), Be && nt[e] && (nt[e].style.opacity = t);
	}
	let Xi, Zi, Qi, $i = { focus: !0 };
	function ea(e) {
		if (e != Qi) {
			let t = e == null, n = yn.alpha != 1;
			v.forEach((r, a) => {
				if (i == 1 || a > 0) {
					let i = t || a == 0 || a == e;
					r._focus = t ? null : i, n && Yi(a, i ? 1 : yn.alpha);
				}
			}), Qi = e, n && ai();
		}
	}
	Be && xn && yt(ke, Xe, (e) => {
		R._lock || (_n(e), Qi != null && Gi(null, $i, !0, Aa.setSeries));
	});
	function ta(e, t, n) {
		let r = b[t];
		n && (e = e / I - (r.ori == 1 ? Rt : Nt));
		let i = W;
		r.ori == 1 && (i = K, e = i - e), r.dir == -1 && (e = i - e);
		let a = r._min, o = r._max, s = e / i, c = a + (o - a) * s, l = r.distr;
		return l == 3 ? U(10, c) : l == 4 ? Ot(c, r.asinh) : l == 100 ? r.bwd(c) : c;
	}
	function na(e, n) {
		return tt(ta(e, S, n), t[0], Ln, Q);
	}
	r.valToIdx = (e) => tt(e, t[0]), r.posToIdx = na, r.posToVal = ta, r.valToPos = (e, t, n) => b[t].ori == 0 ? a(e, b[t], n ? en : W, n ? Jt : 0) : o(e, b[t], n ? rn : K, n ? $t : 0), r.setCursor = (e, t, n) => {
		yi = e.left, bi = e.top, ua(null, t, n);
	};
	function ra(e, t) {
		Ue(Vi, xe, Bi.left = e), Ue(Vi, _e, Bi.width = t);
	}
	function ia(e, t) {
		Ue(Vi, ye, Bi.top = e), Ue(Vi, ve, Bi.height = t);
	}
	let aa = D.ori == 0 ? ra : ia, oa = D.ori == 1 ? ra : ia;
	function sa() {
		if (Be && ze.live) for (let e = +(i == 2); e < v.length; e++) {
			if (e == 0 && at) continue;
			let t = ze.values[e], n = 0;
			for (let r in t) rt[e][n++].firstChild.nodeValue = t[r];
		}
	}
	function ca(e, t) {
		if (e != null && (e.idxs ? e.idxs.forEach((e, t) => {
			Ie[t] = e;
		}) : Yt(e.idx) || Ie.fill(e.idx), ze.idx = Ie[0]), Be && ze.live) {
			for (let e = 0; e < v.length; e++) (e > 0 || i == 1 && !at) && la(e, Ie[e]);
			sa();
		}
		un = !1, t !== !1 && Oa("setLegend");
	}
	r.setLegend = ca;
	function la(e, n) {
		let i = v[e], a = e == 0 && O == 2 ? Jn : t[e], o;
		at ? o = i.values(r, e, n) ?? ot : (o = i.value(r, n == null ? null : a[n], e, n), o = o == null ? ot : { _: o }), ze.values[e] = o;
	}
	function ua(e, n, a) {
		_i = yi, vi = bi, [yi, bi] = R.move(r, yi, bi), R.left = yi, R.top = bi, Ke && (di && qe(di, xt(yi), 0, W, K), fi && qe(fi, 0, xt(bi), W, K));
		let o, s = Ln > Q;
		Xi = At, Zi = null;
		let c = D.ori == 0 ? W : K, l = D.ori == 1 ? W : K;
		if (yi < 0 || Z == 0 || s) {
			o = R.idx = null;
			for (let e = 0; e < v.length; e++) {
				let t = Cn[e];
				t != null && qe(t, -10, -10, W, K);
			}
			xn && Gi(null, $i, !0, e == null && Aa.setSeries), ze.live && (Ie.fill(o), un = !0);
		} else {
			let e, n, a;
			i == 1 && (e = D.ori == 0 ? yi : bi, n = ta(e, S), o = R.idx = tt(n, t[0], Ln, Q), a = ee(t[0][o], D, c, 0));
			let s = -10, u = -10, d = 0, f = 0, p = !0, m = "", h = "";
			for (let e = +(i == 2); e < v.length; e++) {
				let g = v[e], _ = Ie[e], y = _ == null ? null : i == 1 ? t[e][_] : t[e][1][_], x = R.dataIdx(r, e, o, n), S = x == null ? null : i == 1 ? t[e][x] : t[e][1][x];
				if (un = un || S != y || x != _, Ie[e] = x, e > 0 && g.show) {
					let n = x == null ? -10 : x == o ? a : ee(i == 1 ? t[0][x] : t[e][0][x], D, c, 0), _ = S == null ? -10 : k(S, i == 1 ? b[g.scale] : b[g.facets[1].scale], l, 0);
					if (xn && S != null) {
						let t = D.ori == 1 ? yi : bi, n = V(yn.dist(r, e, x, _, t));
						if (n < Xi) {
							let r = yn.bias;
							if (r != 0) {
								let i = ta(t, g.scale), a = S >= 0 ? 1 : -1, o = i >= 0 ? 1 : -1;
								o == a && (o == 1 ? r == 1 ? S >= i : S <= i : r == 1 ? S <= i : S >= i) && (Xi = n, Zi = e);
							} else Xi = n, Zi = e;
						}
					}
					if (un || Sn) {
						let t, i;
						D.ori == 0 ? (t = n, i = _) : (t = _, i = n);
						let a, o, c, l, g, v, y = !0, b = vn.bbox;
						if (b != null) {
							y = !1;
							let t = b(r, e);
							c = t.left, l = t.top, a = t.width, o = t.height;
						} else c = t, l = i, a = o = vn.size(r, e);
						if (v = vn.fill(r, e), g = vn.stroke(r, e), Sn) e == Zi && Xi <= yn.prox && (s = c, u = l, d = a, f = o, p = y, m = v, h = g);
						else {
							let t = Cn[e];
							t != null && (wn[e] = c, Tn[e] = l, z(t, a, o, y), Ye(t, v, g), qe(t, St(c), St(l), W, K));
						}
					}
				}
			}
			if (Sn) {
				let e = yn.prox;
				if (un || (Qi == null ? Xi <= e : Xi > e || Zi != Qi)) {
					let e = Cn[0];
					e != null && (wn[0] = s, Tn[0] = u, z(e, d, f, p), Ye(e, m, h), qe(e, St(s), St(u), W, K));
				}
			}
		}
		if (Bi.show && xi) {
			if (e != null) {
				let [t, n] = Aa.scales, [r, i] = Aa.match, [a, o] = e.cursor.sync.scales, s = e.cursor.drag;
				if (wi = s._x, $ = s._y, wi || $) {
					let { left: s, top: u, width: d, height: f } = e.select, p = e.scales[a].ori, m = e.posToVal, h, g, _, v, y, x = t != null && r(t, a), S = n != null && i(n, o);
					x && wi ? (p == 0 ? (h = s, g = d) : (h = u, g = f), _ = b[t], v = ee(m(h, a), _, c, 0), y = ee(m(h + g, a), _, c, 0), aa(Ct(v, y), V(y - v))) : aa(0, c), S && $ ? (p == 1 ? (h = s, g = d) : (h = u, g = f), _ = b[n], v = k(m(h, o), _, l, 0), y = k(m(h + g, o), _, l, 0), oa(Ct(v, y), V(y - v))) : oa(0, l);
				} else ga();
			} else {
				let e = V(_i - pi), t = V(vi - mi);
				if (D.ori == 1) {
					let n = e;
					e = t, t = n;
				}
				wi = Si.x && e >= Si.dist, $ = Si.y && t >= Si.dist;
				let n = Si.uni;
				n == null ? Si.x && Si.y && (wi || $) && (wi = $ = !0) : wi && $ && (wi = e >= n, $ = t >= n, !wi && !$ && (t > e ? $ = !0 : wi = !0));
				let r, i;
				wi && (D.ori == 0 ? (r = hi, i = yi) : (r = gi, i = bi), aa(Ct(r, i), V(i - r)), $ || oa(0, l)), $ && (D.ori == 1 ? (r = hi, i = yi) : (r = gi, i = bi), oa(Ct(r, i), V(i - r)), wi || aa(0, c)), !wi && !$ && (aa(0, 0), oa(0, 0));
			}
		}
		if (Si._x = wi, Si._y = $, e == null) {
			if (a) {
				if (ja != null) {
					let [e, t] = Aa.scales;
					Aa.values[0] = e == null ? null : ta(D.ori == 0 ? yi : bi, e), Aa.values[1] = t == null ? null : ta(D.ori == 1 ? yi : bi, t);
				}
				Na(Te, r, yi, bi, W, K, o);
			}
			if (xn) {
				let e = a && Aa.setSeries, t = yn.prox;
				Qi == null ? Xi <= t && Gi(Zi, $i, !0, e) : Xi > t ? Gi(null, $i, !0, e) : Zi != Qi && Gi(Zi, $i, !0, e);
			}
		}
		un && (ze.idx = o, ca()), n !== !1 && Oa("setCursor");
	}
	let da = null;
	Object.defineProperty(r, "rect", { get() {
		return da ?? fa(!1), da;
	} });
	function fa(e = !1) {
		e ? da = null : (da = m.getBoundingClientRect(), Oa("syncRect", da));
	}
	function pa(e, t, n, r, i, a, o) {
		R._lock || xi && e != null && e.movementX == 0 && e.movementY == 0 || (ma(e, t, n, r, i, a, o, !1, e != null), e == null ? ua(t, !0, !1) : ua(null, !0, !0));
	}
	function ma(e, t, n, i, a, o, c, l, u) {
		if (da ?? fa(!1), _n(e), e != null) n = e.clientX - da.left, i = e.clientY - da.top;
		else {
			if (n < 0 || i < 0) {
				yi = -10, bi = -10;
				return;
			}
			let [e, r] = Aa.scales, c = t.cursor.sync, [l, u] = c.values, [d, f] = c.scales, [p, m] = Aa.match, h = t.axes[0].side % 2 == 1, g = D.ori == 0 ? W : K, _ = D.ori == 1 ? W : K, v = h ? o : a, y = h ? a : o, x = h ? i : n, S = h ? n : i;
			if (n = d == null ? x / v * g : p(e, d) ? s(l, b[e], g, 0) : -10, i = f == null ? S / y * _ : m(r, f) ? s(u, b[r], _, 0) : -10, D.ori == 1) {
				let e = n;
				n = i, i = e;
			}
		}
		u && (t == null || t.cursor.event.type == Te) && ((n <= 1 || n >= W - 1) && (n = Bt(n, W)), (i <= 1 || i >= K - 1) && (i = Bt(i, K))), l ? (pi = n, mi = i, [hi, gi] = R.move(r, n, i)) : (yi = n, bi = i);
	}
	let ha = {
		width: 0,
		height: 0,
		left: 0,
		top: 0
	};
	function ga() {
		Hi(ha, !1);
	}
	let _a, va, ya, ba;
	function xa(e, t, n, i, a, o, s) {
		xi = !0, wi = $ = Si._x = Si._y = !1, ma(e, t, n, i, a, o, s, !0, !1), e != null && (yt(De, Le, Sa, !1), Na(Ee, r, hi, gi, W, K, null));
		let { left: c, top: l, width: u, height: d } = Bi;
		_a = c, va = l, ya = u, ba = d;
	}
	function Sa(e, t, n, i, a, o, s) {
		xi = Si._x = Si._y = !1, ma(e, t, n, i, a, o, s, !1, !0);
		let { left: c, top: l, width: u, height: d } = Bi, f = u > 0 || d > 0, p = _a != c || va != l || ya != u || ba != d;
		if (f && p && Hi(Bi), Si.setScale && f && p) {
			let e = c, t = u, n = l, r = d;
			if (D.ori == 1 && (e = l, t = d, n = c, r = u), wi && Wi(S, ta(e, S), ta(e + t, S)), $) for (let e in b) {
				let t = b[e];
				e != S && t.from == null && t.min != At && Wi(e, ta(n + r, e), ta(n, e));
			}
			ga();
		} else R.lock && (R._lock = !R._lock, ua(t, !0, e != null));
		e != null && (H(De, Le), Na(De, r, yi, bi, W, K, null));
	}
	function Ca(e, t, n, r, i, a, o) {
		if (R._lock) return;
		_n(e);
		let s = xi;
		if (xi) {
			let e = !0, t = !0, n, r;
			D.ori == 0 ? (n = wi, r = $) : (n = $, r = wi), n && r && (e = yi <= 10 || yi >= W - 10, t = bi <= 10 || bi >= K - 10), n && e && (yi = yi < hi ? 0 : W), r && t && (bi = bi < gi ? 0 : K), ua(null, !0, !0), xi = !1;
		}
		yi = -10, bi = -10, Ie.fill(null), ua(null, !0, !0), s && (xi = s);
	}
	function wa(e, t, n, i, a, o, s) {
		R._lock || (_n(e), tr(), ga(), e != null && Na(Ae, r, yi, bi, W, K, null));
	}
	function Ta() {
		y.forEach(zi), dn(r.width, r.height, !0);
	}
	$e(Pe, Re, Ta);
	let Ea = {};
	Ea.mousedown = xa, Ea.mousemove = pa, Ea.mouseup = Sa, Ea.dblclick = wa, Ea.setSeries = (e, t, n, i) => {
		let a = Aa.match[2];
		n = a(r, t, n), n != -1 && Gi(n, i, !0, !1);
	}, Ke && (yt(Ee, m, xa), yt(Te, m, pa), yt(Oe, m, (e) => {
		_n(e), fa(!1);
	}), yt(ke, m, Ca), yt(Ae, m, wa), Ci.add(r), r.syncRect = fa);
	let Da = r.hooks = e.hooks || {};
	function Oa(e, t, n) {
		ni ? ri.push([
			e,
			t,
			n
		]) : e in Da && Da[e].forEach((e) => {
			e.call(null, r, t, n);
		});
	}
	(e.plugins || []).forEach((e) => {
		for (let t in e.hooks) Da[t] = (Da[t] || []).concat(e.hooks[t]);
	});
	let ka = (e, t, n) => n, Aa = nn({
		key: null,
		setSeries: !1,
		filters: {
			pub: It,
			sub: It
		},
		scales: [S, v[1] ? v[1].scale : null],
		match: [
			Lt,
			Lt,
			ka
		],
		values: [null, null]
	}, R.sync);
	Aa.match.length == 2 && Aa.match.push(ka), R.sync = Aa;
	let ja = Aa.key, Ma = Wr(ja);
	function Na(e, t, n, r, i, a, o) {
		Aa.filters.pub(e, t, n, r, i, a, o) && Ma.pub(e, t, n, r, i, a, o);
	}
	Ma.sub(r);
	function Pa(e, t, n, r, i, a, o) {
		Aa.filters.sub(e, t, n, r, i, a, o) && Ea[e](null, t, n, r, i, a, o);
	}
	r.pub = Pa;
	function Fa() {
		Ma.unsub(r), Ci.delete(r), vt.clear(), et(Pe, Re, Ta), l.remove(), Xe?.remove(), Oa("destroy");
	}
	r.destroy = Fa;
	function Ia() {
		Oa("init", e, t), $n(t || e.data, !1), A[S] ? ci(S, A[S]) : tr(), ln = Bi.show && (Bi.width > 0 || Bi.height > 0), sn = un = !0, dn(e.width, e.height);
	}
	return v.forEach(kn), y.forEach(Nn), n ? n instanceof HTMLElement ? (n.appendChild(l), Ia()) : n(r, Ia) : Ia(), r;
}
$.assign = nn, $.fmtNum = vt, $.rangeNum = mt, $.rangeLog = ct, $.rangeAsinh = lt, $.orient = qr, $.pxRatio = I, $.join = sn, $.fmtDate = bn, $.tzDate = Sn, $.sync = Wr;
{
	$.addGap = Qr, $.clipGaps = Zr;
	let e = $.paths = { points: fi };
	e.linear = gi, e.stepped = _i, e.bars = yi, e.spline = xi;
}
// src/lib/Chart.svelte
var Bi = e("<div class=\"chart svelte-1knyfmf\" role=\"img\"></div>");
function Vi(e, t) {
	a(t, !0);
	let n = c(t, "fmt", 3, null), s = c(t, "height", 3, 140), d;
	h(() => {
		let e = getComputedStyle(d), r = (t) => e.getPropertyValue(t).trim(), i = r("--muted"), a = r("--line"), o = `11px ${r("--font")}`, c = (e) => ({
			stroke: i,
			font: o,
			grid: {
				stroke: a,
				width: 1
			},
			ticks: {
				stroke: a,
				width: 1
			},
			...e
		}), l = new $({
			width: d.clientWidth || 300,
			height: s(),
			legend: { show: !1 },
			cursor: { drag: {
				x: !1,
				y: !1
			} },
			scales: { x: { time: !1 } },
			axes: [c({ values: (e, t) => t.map(f) }), c(n() ? {
				values: (e, t) => t.map(n()),
				size: 48
			} : {})],
			series: [{}, {
				label: t.label,
				stroke: r(t.color),
				width: 2,
				spanGaps: !1,
				points: { show: !1 }
			}]
		}, [t.x, t.values], d), u = new ResizeObserver(() => l.setSize({
			width: d.clientWidth,
			height: s()
		}));
		return u.observe(d), () => {
			u.disconnect(), l.destroy();
		};
	});
	var p = Bi();
	l(p, (e) => d = e, () => d), i(() => u(p, "aria-label", `Graph: ${t.label ?? ""} against time`)), r(e, p), o();
}
// src/lib/viz.js
document.head.append(Object.assign(document.createElement("style"), { textContent: T + E }));
export { Vi as Chart, A as MapView };
