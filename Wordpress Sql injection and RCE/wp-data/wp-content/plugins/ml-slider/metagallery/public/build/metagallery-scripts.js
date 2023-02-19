!(function (t) {
    'function' == typeof define && define.amd ? define(t) : t()
})(function () {
    'use strict'
    /**
     * Muuri v0.9.3
     * https://muuri.dev/
     * Copyright (c) 2015-present, Haltu Oy
     * Released under the MIT license
     * https://github.com/haltu/muuri/blob/master/LICENSE.md
     * @license MIT
     *
     * Muuri Packer
     * Copyright (c) 2016-present, Niklas Rämö <inramo@gmail.com>
     * @license MIT
     *
     * Muuri Ticker / Muuri Emitter / Muuri Dragger
     * Copyright (c) 2018-present, Niklas Rämö <inramo@gmail.com>
     * @license MIT
     *
     * Muuri AutoScroller
     * Copyright (c) 2019-present, Niklas Rämö <inramo@gmail.com>
     * @license MIT
     */ var t = {},
        e = 'function' == typeof Map ? new Map() : null,
        i = 'swap',
        n = 'move',
        r = 'layoutStart',
        s = 'layoutEnd',
        o = 'layoutAbort',
        a = 'remove',
        h = 'hideStart',
        l = 'filter',
        u = 'sort',
        d = 'move',
        c = 'send',
        _ = 'beforeSend',
        f = 'receive',
        p = 'beforeReceive',
        m = 'dragReleaseEnd',
        g = 'ontouchstart' in window,
        v = !!window.PointerEvent,
        y = !!window.navigator.msPointerEnabled
    function b() {
        ;(this._events = {}), (this._queue = []), (this._counter = 0), (this._clearOnEmit = !1)
    }
    ;(b.prototype.on = function (t, e) {
        if (!this._events || !t || !e) return this
        var i = this._events[t]
        return i || (i = this._events[t] = []), i.push(e), this
    }),
        (b.prototype.off = function (t, e) {
            if (!this._events || !t || !e) return this
            var i,
                n = this._events[t]
            if (!n || !n.length) return this
            for (; -1 !== (i = n.indexOf(e)); ) n.splice(i, 1)
            return this
        }),
        (b.prototype.clear = function (t) {
            if (!this._events || !t) return this
            var e = this._events[t]
            return e && ((e.length = 0), delete this._events[t]), this
        }),
        (b.prototype.emit = function (t) {
            if (!this._events || !t) return (this._clearOnEmit = !1), this
            var e = this._events[t]
            if (!e || !e.length) return (this._clearOnEmit = !1), this
            var i,
                n = this._queue,
                r = n.length,
                s = arguments.length - 1
            s > 3 && ((i = []).push.apply(i, arguments), i.shift()),
                n.push.apply(n, e),
                this._clearOnEmit && ((e.length = 0), (this._clearOnEmit = !1)),
                ++this._counter
            for (var o = r, a = n.length; o < a; o++)
                if (
                    (0 === s
                        ? n[o]()
                        : 1 === s
                        ? n[o](arguments[1])
                        : 2 === s
                        ? n[o](arguments[1], arguments[2])
                        : 3 === s
                        ? n[o](arguments[1], arguments[2], arguments[3])
                        : n[o].apply(null, i),
                    !this._events)
                )
                    return this
            return --this._counter, this._counter || (n.length = 0), this
        }),
        (b.prototype.burst = function () {
            return this._events ? ((this._clearOnEmit = !0), this.emit.apply(this, arguments), this) : this
        }),
        (b.prototype.countListeners = function (t) {
            if (!this._events) return 0
            var e = this._events[t]
            return e ? e.length : 0
        }),
        (b.prototype.destroy = function () {
            return this._events ? ((this._queue.length = this._counter = 0), (this._events = null), this) : this
        })
    var w = v ? 'pointerout' : y ? 'MSPointerOut' : ''
    function S(t) {
        w &&
            ((this._dragger = t),
            (this._timeout = null),
            (this._outEvent = null),
            (this._isActive = !1),
            (this._addBehaviour = this._addBehaviour.bind(this)),
            (this._removeBehaviour = this._removeBehaviour.bind(this)),
            (this._onTimeout = this._onTimeout.bind(this)),
            (this._resetData = this._resetData.bind(this)),
            (this._onStart = this._onStart.bind(this)),
            (this._onOut = this._onOut.bind(this)),
            this._dragger.on('start', this._onStart))
    }
    ;(S.prototype._addBehaviour = function () {
        this._isActive ||
            ((this._isActive = !0),
            this._dragger.on('move', this._resetData),
            this._dragger.on('cancel', this._removeBehaviour),
            this._dragger.on('end', this._removeBehaviour),
            window.addEventListener(w, this._onOut))
    }),
        (S.prototype._removeBehaviour = function () {
            this._isActive &&
                (this._dragger.off('move', this._resetData),
                this._dragger.off('cancel', this._removeBehaviour),
                this._dragger.off('end', this._removeBehaviour),
                window.removeEventListener(w, this._onOut),
                this._resetData(),
                (this._isActive = !1))
        }),
        (S.prototype._resetData = function () {
            window.clearTimeout(this._timeout), (this._timeout = null), (this._outEvent = null)
        }),
        (S.prototype._onStart = function (t) {
            'mouse' !== t.pointerType && this._addBehaviour()
        }),
        (S.prototype._onOut = function (t) {
            this._dragger._getTrackedTouch(t) &&
                (this._resetData(), (this._outEvent = t), (this._timeout = window.setTimeout(this._onTimeout, 100)))
        }),
        (S.prototype._onTimeout = function () {
            var t = this._outEvent
            this._resetData(), this._dragger.isActive() && this._dragger._onCancel(t)
        }),
        (S.prototype.destroy = function () {
            w && (this._dragger.off('start', this._onStart), this._removeBehaviour())
        })
    var T = ['', 'webkit', 'moz', 'ms', 'o', 'Webkit', 'Moz', 'MS', 'O'],
        D = {}
    function x(t, e) {
        var i = D[e] || ''
        if (i) return i
        for (var n = e[0].toUpperCase() + e.slice(1), r = 0; r < T.length; ) {
            if ((i = T[r] ? T[r] + n : e) in t) return (D[e] = i), i
            ++r
        }
        return ''
    }
    function A() {
        var t = !1
        try {
            var e = Object.defineProperty({}, 'passive', {
                get: function () {
                    t = !0
                },
            })
            window.addEventListener('testPassive', null, e), window.removeEventListener('testPassive', null, e)
        } catch (t) {}
        return t
    }
    var k = window.navigator.userAgent.toLowerCase(),
        E = k.indexOf('edge') > -1,
        R = k.indexOf('trident') > -1,
        L = k.indexOf('firefox') > -1,
        P = k.indexOf('android') > -1,
        M = !!A() && { passive: !0 },
        I = 'touchAction',
        C = x(document.documentElement.style, I)
    function N(t, e) {
        ;(this._element = t),
            (this._emitter = new b()),
            (this._isDestroyed = !1),
            (this._cssProps = {}),
            (this._touchAction = ''),
            (this._isActive = !1),
            (this._pointerId = null),
            (this._startTime = 0),
            (this._startX = 0),
            (this._startY = 0),
            (this._currentX = 0),
            (this._currentY = 0),
            (this._onStart = this._onStart.bind(this)),
            (this._onMove = this._onMove.bind(this)),
            (this._onCancel = this._onCancel.bind(this)),
            (this._onEnd = this._onEnd.bind(this)),
            (this._edgeHack = null),
            (E || R) && (v || y) && (this._edgeHack = new S(this)),
            this.setCssProps(e),
            this._touchAction || this.setTouchAction('auto'),
            t.addEventListener('dragstart', N._preventDefault, !1),
            t.addEventListener(N._inputEvents.start, this._onStart, M)
    }
    ;(N._pointerEvents = { start: 'pointerdown', move: 'pointermove', cancel: 'pointercancel', end: 'pointerup' }),
        (N._msPointerEvents = {
            start: 'MSPointerDown',
            move: 'MSPointerMove',
            cancel: 'MSPointerCancel',
            end: 'MSPointerUp',
        }),
        (N._touchEvents = { start: 'touchstart', move: 'touchmove', cancel: 'touchcancel', end: 'touchend' }),
        (N._mouseEvents = { start: 'mousedown', move: 'mousemove', cancel: '', end: 'mouseup' }),
        (N._inputEvents = g ? N._touchEvents : v ? N._pointerEvents : y ? N._msPointerEvents : N._mouseEvents),
        (N._emitter = new b()),
        (N._emitterEvents = { start: 'start', move: 'move', end: 'end', cancel: 'cancel' }),
        (N._activeInstances = []),
        (N._preventDefault = function (t) {
            t.preventDefault && !1 !== t.cancelable && t.preventDefault()
        }),
        (N._activateInstance = function (t) {
            N._activeInstances.indexOf(t) > -1 ||
                (N._activeInstances.push(t),
                N._emitter.on(N._emitterEvents.move, t._onMove),
                N._emitter.on(N._emitterEvents.cancel, t._onCancel),
                N._emitter.on(N._emitterEvents.end, t._onEnd),
                1 === N._activeInstances.length && N._bindListeners())
        }),
        (N._deactivateInstance = function (t) {
            var e = N._activeInstances.indexOf(t)
            ;-1 !== e &&
                (N._activeInstances.splice(e, 1),
                N._emitter.off(N._emitterEvents.move, t._onMove),
                N._emitter.off(N._emitterEvents.cancel, t._onCancel),
                N._emitter.off(N._emitterEvents.end, t._onEnd),
                N._activeInstances.length || N._unbindListeners())
        }),
        (N._bindListeners = function () {
            window.addEventListener(N._inputEvents.move, N._onMove, M),
                window.addEventListener(N._inputEvents.end, N._onEnd, M),
                N._inputEvents.cancel && window.addEventListener(N._inputEvents.cancel, N._onCancel, M)
        }),
        (N._unbindListeners = function () {
            window.removeEventListener(N._inputEvents.move, N._onMove, M),
                window.removeEventListener(N._inputEvents.end, N._onEnd, M),
                N._inputEvents.cancel && window.removeEventListener(N._inputEvents.cancel, N._onCancel, M)
        }),
        (N._getEventPointerId = function (t) {
            return 'number' == typeof t.pointerId
                ? t.pointerId
                : t.changedTouches
                ? t.changedTouches[0]
                    ? t.changedTouches[0].identifier
                    : null
                : 1
        }),
        (N._getTouchById = function (t, e) {
            if ('number' == typeof t.pointerId) return t.pointerId === e ? t : null
            if (t.changedTouches) {
                for (var i = 0; i < t.changedTouches.length; i++)
                    if (t.changedTouches[i].identifier === e) return t.changedTouches[i]
                return null
            }
            return t
        }),
        (N._onMove = function (t) {
            N._emitter.emit(N._emitterEvents.move, t)
        }),
        (N._onCancel = function (t) {
            N._emitter.emit(N._emitterEvents.cancel, t)
        }),
        (N._onEnd = function (t) {
            N._emitter.emit(N._emitterEvents.end, t)
        }),
        (N.prototype._reset = function () {
            ;(this._pointerId = null),
                (this._startTime = 0),
                (this._startX = 0),
                (this._startY = 0),
                (this._currentX = 0),
                (this._currentY = 0),
                (this._isActive = !1),
                N._deactivateInstance(this)
        }),
        (N.prototype._createEvent = function (t, e) {
            var i = this._getTrackedTouch(e)
            return {
                type: t,
                srcEvent: e,
                distance: this.getDistance(),
                deltaX: this.getDeltaX(),
                deltaY: this.getDeltaY(),
                deltaTime: t === N._emitterEvents.start ? 0 : this.getDeltaTime(),
                isFirst: t === N._emitterEvents.start,
                isFinal: t === N._emitterEvents.end || t === N._emitterEvents.cancel,
                pointerType: e.pointerType || (e.touches ? 'touch' : 'mouse'),
                identifier: this._pointerId,
                screenX: i.screenX,
                screenY: i.screenY,
                clientX: i.clientX,
                clientY: i.clientY,
                pageX: i.pageX,
                pageY: i.pageY,
                target: i.target,
            }
        }),
        (N.prototype._emit = function (t, e) {
            this._emitter.emit(t, this._createEvent(t, e))
        }),
        (N.prototype._getTrackedTouch = function (t) {
            return null === this._pointerId ? null : N._getTouchById(t, this._pointerId)
        }),
        (N.prototype._onStart = function (t) {
            if (
                !this._isDestroyed &&
                null === this._pointerId &&
                ((this._pointerId = N._getEventPointerId(t)), null !== this._pointerId)
            ) {
                var e = this._getTrackedTouch(t)
                ;(this._startX = this._currentX = e.clientX),
                    (this._startY = this._currentY = e.clientY),
                    (this._startTime = Date.now()),
                    (this._isActive = !0),
                    this._emit(N._emitterEvents.start, t),
                    this._isActive && N._activateInstance(this)
            }
        }),
        (N.prototype._onMove = function (t) {
            var e = this._getTrackedTouch(t)
            e && ((this._currentX = e.clientX), (this._currentY = e.clientY), this._emit(N._emitterEvents.move, t))
        }),
        (N.prototype._onCancel = function (t) {
            this._getTrackedTouch(t) && (this._emit(N._emitterEvents.cancel, t), this._reset())
        }),
        (N.prototype._onEnd = function (t) {
            this._getTrackedTouch(t) && (this._emit(N._emitterEvents.end, t), this._reset())
        }),
        (N.prototype.isActive = function () {
            return this._isActive
        }),
        (N.prototype.setTouchAction = function (t) {
            ;(this._touchAction = t),
                C && ((this._cssProps[C] = ''), (this._element.style[C] = t)),
                g &&
                    (this._element.removeEventListener(N._touchEvents.start, N._preventDefault, !0),
                    (this._element.style[C] !== t || (L && P)) &&
                        this._element.addEventListener(N._touchEvents.start, N._preventDefault, !0))
        }),
        (N.prototype.setCssProps = function (t) {
            if (t) {
                var e,
                    i,
                    n = this._cssProps,
                    r = this._element
                for (e in n) (r.style[e] = n[e]), delete n[e]
                for (e in t)
                    t[e] &&
                        (e !== I
                            ? (i = x(r.style, e)) && ((n[i] = ''), (r.style[i] = t[e]))
                            : this.setTouchAction(t[e]))
            }
        }),
        (N.prototype.getDeltaX = function () {
            return this._currentX - this._startX
        }),
        (N.prototype.getDeltaY = function () {
            return this._currentY - this._startY
        }),
        (N.prototype.getDistance = function () {
            var t = this.getDeltaX(),
                e = this.getDeltaY()
            return Math.sqrt(t * t + e * e)
        }),
        (N.prototype.getDeltaTime = function () {
            return this._startTime ? Date.now() - this._startTime : 0
        }),
        (N.prototype.on = function (t, e) {
            this._emitter.on(t, e)
        }),
        (N.prototype.off = function (t, e) {
            this._emitter.off(t, e)
        }),
        (N.prototype.destroy = function () {
            if (!this._isDestroyed) {
                var t = this._element
                for (var e in (this._edgeHack && this._edgeHack.destroy(),
                this._reset(),
                this._emitter.destroy(),
                t.removeEventListener(N._inputEvents.start, this._onStart, M),
                t.removeEventListener('dragstart', N._preventDefault, !1),
                t.removeEventListener(N._touchEvents.start, N._preventDefault, !0),
                this._cssProps))
                    (t.style[e] = this._cssProps[e]), delete this._cssProps[e]
                ;(this._element = null), (this._isDestroyed = !0)
            }
        })
    var O = (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (t) {
            return this.setTimeout(function () {
                t(Date.now())
            }, 16.666666666666668)
        }
    ).bind(window)
    function X(t) {
        ;(this._nextStep = null),
            (this._lanes = []),
            (this._stepQueue = []),
            (this._stepCallbacks = {}),
            (this._step = this._step.bind(this))
        for (var e = 0; e < t; e++) this._lanes.push(new Y())
    }
    function Y() {
        ;(this.queue = []), (this.indices = {}), (this.callbacks = {})
    }
    ;(X.prototype._step = function (t) {
        var e,
            i,
            n,
            r,
            s,
            o,
            a = this._lanes,
            h = this._stepQueue,
            l = this._stepCallbacks
        for (this._nextStep = null, e = 0; e < a.length; e++) {
            for (r = a[e].queue, s = a[e].callbacks, o = a[e].indices, i = 0; i < r.length; i++)
                (n = r[i]) && (h.push(n), (l[n] = s[n]), delete s[n], delete o[n])
            r.length = 0
        }
        for (e = 0; e < h.length; e++) l[(n = h[e])] && l[n](t), delete l[n]
        h.length = 0
    }),
        (X.prototype.add = function (t, e, i) {
            this._lanes[t].add(e, i), this._nextStep || (this._nextStep = O(this._step))
        }),
        (X.prototype.remove = function (t, e) {
            this._lanes[t].remove(e)
        }),
        (Y.prototype.add = function (t, e) {
            var i = this.indices[t]
            void 0 !== i && (this.queue[i] = void 0),
                this.queue.push(t),
                (this.callbacks[t] = e),
                (this.indices[t] = this.queue.length - 1)
        }),
        (Y.prototype.remove = function (t) {
            var e = this.indices[t]
            void 0 !== e && ((this.queue[e] = void 0), delete this.callbacks[t], delete this.indices[t])
        })
    var q = 'layoutRead',
        H = 'layoutWrite',
        F = 'visibilityRead',
        W = 'visibilityWrite',
        B = 'dragStartRead',
        G = 'dragStartWrite',
        z = 'dragMoveRead',
        V = 'dragMoveWrite',
        j = 'dragScrollRead',
        U = 'dragScrollWrite',
        Q = 'dragSortRead',
        K = 'placeholderLayoutRead',
        $ = 'placeholderLayoutWrite',
        Z = 'placeholderResizeWrite',
        J = 'autoScrollRead',
        tt = 'autoScrollWrite',
        et = 'debounceRead',
        it = new X(3)
    function nt(t) {
        it.remove(0, q + t), it.remove(2, H + t)
    }
    function rt(t) {
        it.remove(0, F + t), it.remove(2, W + t)
    }
    function st(t) {
        it.remove(0, B + t), it.remove(2, G + t)
    }
    function ot(t) {
        it.remove(0, z + t), it.remove(2, V + t)
    }
    function at(t) {
        it.remove(0, j + t), it.remove(2, U + t)
    }
    function ht(t, e) {
        it.add(1, Q + t, e)
    }
    function lt(t) {
        it.remove(0, K + t), it.remove(2, $ + t)
    }
    function ut(t, e) {
        it.add(0, J, t), it.add(2, tt, e)
    }
    function dt(t) {
        return 'function' == typeof t
    }
    var ct,
        _t = 'function' == typeof WeakMap,
        ft = _t ? new WeakMap() : null,
        pt = !0,
        mt = function () {
            pt ? ((ct = window.clearInterval(ct)), (ft = _t ? new WeakMap() : null)) : (pt = !0)
        }
    function gt(t, e) {
        var i = ft && ft.get(t)
        return (
            i || ((i = window.getComputedStyle(t, null)), ft && ft.set(t, i)),
            ft && (ct ? (pt = !1) : (ct = window.setInterval(mt, 3e3))),
            i.getPropertyValue(e)
        )
    }
    function vt(t, e) {
        return parseFloat(gt(t, e)) || 0
    }
    var yt,
        bt = document.documentElement,
        wt = document.body,
        St = { value: 0, offset: 0 }
    function Tt(t) {
        return t === window || t === bt || t === wt ? window : t
    }
    function Dt(t) {
        return t === window ? t.pageXOffset : t.scrollLeft
    }
    function xt(t) {
        return t === window ? t.pageYOffset : t.scrollTop
    }
    function At(t) {
        return t === window ? bt.scrollWidth - bt.clientWidth : t.scrollWidth - t.clientWidth
    }
    function kt(t) {
        return t === window ? bt.scrollHeight - bt.clientHeight : t.scrollHeight - t.clientHeight
    }
    function Et(t, e) {
        if (((e = e || {}), t === window))
            (e.width = bt.clientWidth),
                (e.height = bt.clientHeight),
                (e.left = 0),
                (e.right = e.width),
                (e.top = 0),
                (e.bottom = e.height)
        else {
            var i = t.getBoundingClientRect(),
                n = t.clientLeft || vt(t, 'border-left-width'),
                r = t.clientTop || vt(t, 'border-top-width')
            ;(e.width = t.clientWidth),
                (e.height = t.clientHeight),
                (e.left = i.left + n),
                (e.right = e.left + e.width),
                (e.top = i.top + r),
                (e.bottom = e.top + e.height)
        }
        return e
    }
    function Rt(t) {
        return t._drag._getGrid()._settings.dragAutoScroll
    }
    function Lt(t) {
        t._drag && t._drag._prepareScroll()
    }
    function Pt(t) {
        if (t._drag && t._isActive) {
            var e = t._drag
            ;(e._scrollDiffX = e._scrollDiffY = 0), t._setTranslate(e._left, e._top)
        }
    }
    function Mt(t, e, i, n) {
        return (St.value = Math.min(n / 2, t)), (St.offset = Math.max(0, i + 2 * St.value + n * e - n) / 2), St
    }
    function It() {
        this.reset()
    }
    function Ct() {
        ;(this.element = null),
            (this.requestX = null),
            (this.requestY = null),
            (this.scrollLeft = 0),
            (this.scrollTop = 0)
    }
    function Nt(t, e) {
        ;(this.pool = []), (this.createItem = t), (this.releaseItem = e)
    }
    function Ot(t, e) {
        var i = (function (t, e) {
            return (function (t, e) {
                return !(
                    t.left + t.width <= e.left ||
                    e.left + e.width <= t.left ||
                    t.top + t.height <= e.top ||
                    e.top + e.height <= t.top
                )
            })(t, e)
                ? (Math.min(t.left + t.width, e.left + e.width) - Math.max(t.left, e.left)) *
                      (Math.min(t.top + t.height, e.top + e.height) - Math.max(t.top, e.top))
                : 0
        })(t, e)
        return i ? (i / (Math.min(t.width, e.width) * Math.min(t.height, e.height))) * 100 : 0
    }
    ;(It.prototype.reset = function () {
        this.isActive && this.onStop(),
            (this.item = null),
            (this.element = null),
            (this.isActive = !1),
            (this.isEnding = !1),
            (this.direction = null),
            (this.value = null),
            (this.maxValue = 0),
            (this.threshold = 0),
            (this.distance = 0),
            (this.speed = 0),
            (this.duration = 0),
            (this.action = null)
    }),
        (It.prototype.hasReachedEnd = function () {
            return 4 & this.direction ? this.value >= this.maxValue : this.value <= 0
        }),
        (It.prototype.computeCurrentScrollValue = function () {
            return null === this.value
                ? 1 & this.direction
                    ? Dt(this.element)
                    : xt(this.element)
                : Math.max(0, Math.min(this.value, this.maxValue))
        }),
        (It.prototype.computeNextScrollValue = function (t) {
            var e = this.speed * (t / 1e3),
                i = 4 & this.direction ? this.value + e : this.value - e
            return Math.max(0, Math.min(i, this.maxValue))
        }),
        (It.prototype.computeSpeed =
            ((yt = {
                direction: null,
                threshold: 0,
                distance: 0,
                value: 0,
                maxValue: 0,
                deltaTime: 0,
                duration: 0,
                isEnding: !1,
            }),
            function (t) {
                var e = this.item,
                    i = Rt(e).speed
                return dt(i)
                    ? ((yt.direction = this.direction),
                      (yt.threshold = this.threshold),
                      (yt.distance = this.distance),
                      (yt.value = this.value),
                      (yt.maxValue = this.maxValue),
                      (yt.duration = this.duration),
                      (yt.speed = this.speed),
                      (yt.deltaTime = t),
                      (yt.isEnding = this.isEnding),
                      i(e, this.element, yt))
                    : i
            })),
        (It.prototype.tick = function (t) {
            return (
                this.isActive || ((this.isActive = !0), this.onStart()),
                (this.value = this.computeCurrentScrollValue()),
                (this.speed = this.computeSpeed(t)),
                (this.value = this.computeNextScrollValue(t)),
                (this.duration += t),
                this.value
            )
        }),
        (It.prototype.onStart = function () {
            var t = this.item,
                e = Rt(t).onStart
            dt(e) && e(t, this.element, this.direction)
        }),
        (It.prototype.onStop = function () {
            var t = this.item,
                e = Rt(t).onStop
            dt(e) && e(t, this.element, this.direction), t._drag && t._drag.sort()
        }),
        (Ct.prototype.reset = function () {
            this.requestX && (this.requestX.action = null),
                this.requestY && (this.requestY.action = null),
                (this.element = null),
                (this.requestX = null),
                (this.requestY = null),
                (this.scrollLeft = 0),
                (this.scrollTop = 0)
        }),
        (Ct.prototype.addRequest = function (t) {
            1 & t.direction
                ? (this.removeRequest(this.requestX), (this.requestX = t))
                : (this.removeRequest(this.requestY), (this.requestY = t)),
                (t.action = this)
        }),
        (Ct.prototype.removeRequest = function (t) {
            t &&
                (this.requestX === t
                    ? ((this.requestX = null), (t.action = null))
                    : this.requestY === t && ((this.requestY = null), (t.action = null)))
        }),
        (Ct.prototype.computeScrollValues = function () {
            ;(this.scrollLeft = this.requestX ? this.requestX.value : Dt(this.element)),
                (this.scrollTop = this.requestY ? this.requestY.value : xt(this.element))
        }),
        (Ct.prototype.scroll = function () {
            var t = this.element
            t &&
                (t.scrollTo
                    ? t.scrollTo(this.scrollLeft, this.scrollTop)
                    : ((t.scrollLeft = this.scrollLeft), (t.scrollTop = this.scrollTop)))
        }),
        (Nt.prototype.pick = function () {
            return this.pool.pop() || this.createItem()
        }),
        (Nt.prototype.release = function (t) {
            this.releaseItem(t), -1 === this.pool.indexOf(t) && this.pool.push(t)
        }),
        (Nt.prototype.reset = function () {
            this.pool.length = 0
        })
    var Xt = { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 },
        Yt = { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 }
    function qt() {
        ;(this._isDestroyed = !1),
            (this._isTicking = !1),
            (this._tickTime = 0),
            (this._tickDeltaTime = 0),
            (this._items = []),
            (this._actions = []),
            (this._requests = {}),
            (this._requests[1] = {}),
            (this._requests[2] = {}),
            (this._requestOverlapCheck = {}),
            (this._dragPositions = {}),
            (this._dragDirections = {}),
            (this._overlapCheckInterval = 150),
            (this._requestPool = new Nt(
                function () {
                    return new It()
                },
                function (t) {
                    t.reset()
                },
            )),
            (this._actionPool = new Nt(
                function () {
                    return new Ct()
                },
                function (t) {
                    t.reset()
                },
            )),
            (this._readTick = this._readTick.bind(this)),
            (this._writeTick = this._writeTick.bind(this))
    }
    ;(qt.AXIS_X = 1),
        (qt.AXIS_Y = 2),
        (qt.FORWARD = 4),
        (qt.BACKWARD = 8),
        (qt.LEFT = 9),
        (qt.RIGHT = 5),
        (qt.UP = 10),
        (qt.DOWN = 6),
        (qt.smoothSpeed = function (t, e, i) {
            return function (n, r, s) {
                var o = 0
                if (!s.isEnding)
                    if (s.threshold > 0) {
                        var a = s.threshold - Math.max(0, s.distance)
                        o = (t / s.threshold) * a
                    } else o = t
                var h = s.speed,
                    l = o
                return h === o
                    ? l
                    : h < o
                    ? ((l = h + e * (s.deltaTime / 1e3)), Math.min(o, l))
                    : ((l = h - i * (s.deltaTime / 1e3)), Math.max(o, l))
            }
        }),
        (qt.pointerHandle = function (t) {
            var e = { left: 0, top: 0, width: 0, height: 0 },
                i = t || 1
            return function (t, n, r, s, o, a, h) {
                return (e.left = a - 0.5 * i), (e.top = h - 0.5 * i), (e.width = i), (e.height = i), e
            }
        }),
        (qt.prototype._readTick = function (t) {
            this._isDestroyed ||
                (t && this._tickTime
                    ? ((this._tickDeltaTime = t - this._tickTime),
                      (this._tickTime = t),
                      this._updateRequests(),
                      this._updateActions())
                    : ((this._tickTime = t), (this._tickDeltaTime = 0)))
        }),
        (qt.prototype._writeTick = function () {
            this._isDestroyed || (this._applyActions(), ut(this._readTick, this._writeTick))
        }),
        (qt.prototype._startTicking = function () {
            ;(this._isTicking = !0), ut(this._readTick, this._writeTick)
        }),
        (qt.prototype._stopTicking = function () {
            ;(this._isTicking = !1), (this._tickTime = 0), (this._tickDeltaTime = 0), it.remove(0, J), it.remove(2, tt)
        }),
        (qt.prototype._getItemHandleRect = function (t, e, i) {
            var n = t._drag
            if (e) {
                var r = n._dragMoveEvent || n._dragStartEvent,
                    s = e(t, n._clientX, n._clientY, t._width, t._height, r.clientX, r.clientY)
                ;(i.left = s.left), (i.top = s.top), (i.width = s.width), (i.height = s.height)
            } else (i.left = n._clientX), (i.top = n._clientY), (i.width = t._width), (i.height = t._height)
            return (i.right = i.left + i.width), (i.bottom = i.top + i.height), i
        }),
        (qt.prototype._requestItemScroll = function (t, e, i, n, r, s, o) {
            var a = this._requests[e],
                h = a[t._id]
            h ? (h.element === i && h.direction === n) || h.reset() : (h = this._requestPool.pick()),
                (h.item = t),
                (h.element = i),
                (h.direction = n),
                (h.threshold = r),
                (h.distance = s),
                (h.maxValue = o),
                (a[t._id] = h)
        }),
        (qt.prototype._cancelItemScroll = function (t, e) {
            var i = this._requests[e],
                n = i[t._id]
            n && (n.action && n.action.removeRequest(n), this._requestPool.release(n), delete i[t._id])
        }),
        (qt.prototype._checkItemOverlap = function (t, e, i) {
            var n = Rt(t),
                r = dt(n.targets) ? n.targets(t) : n.targets,
                s = n.threshold,
                o = n.safeZone
            if (!r || !r.length) return e && this._cancelItemScroll(t, 1), void (i && this._cancelItemScroll(t, 2))
            var a = this._dragDirections[t._id],
                h = a[0],
                l = a[1]
            if (!h && !l) return e && this._cancelItemScroll(t, 1), void (i && this._cancelItemScroll(t, 2))
            for (
                var u = this._getItemHandleRect(t, n.handle, Xt),
                    d = Yt,
                    c = null,
                    _ = null,
                    f = !0,
                    p = !0,
                    m = 0,
                    g = 0,
                    v = null,
                    y = null,
                    b = 0,
                    w = 0,
                    S = 0,
                    T = null,
                    D = -1 / 0,
                    x = 0,
                    A = 0,
                    k = null,
                    E = 0,
                    R = 0,
                    L = null,
                    P = -1 / 0,
                    M = 0,
                    I = 0,
                    C = null,
                    N = 0,
                    O = 0,
                    X = 0;
                X < r.length;
                X++
            )
                (c = r[X]),
                    (f = e && h && 2 !== c.axis),
                    (p = i && l && 1 !== c.axis),
                    (g = c.priority || 0),
                    ((!f || g < D) && (!p || g < P)) ||
                        ((_ = Tt(c.element || c)),
                        (w = f ? At(_) : -1),
                        (S = p ? kt(_) : -1),
                        (w || S) &&
                            ((m = Ot(u, (d = Et(_, d)))) <= 0 ||
                                (f &&
                                    g >= D &&
                                    w > 0 &&
                                    (g > D || m > A) &&
                                    ((y = null),
                                    (v = Mt('number' == typeof c.threshold ? c.threshold : s, o, u.width, d.width)),
                                    5 === h
                                        ? (b = d.right + v.offset - u.right) <= v.value && Dt(_) < w && (y = 5)
                                        : 9 === h &&
                                          (b = u.left - (d.left - v.offset)) <= v.value &&
                                          Dt(_) > 0 &&
                                          (y = 9),
                                    null !== y &&
                                        ((T = _), (D = g), (x = v.value), (A = m), (k = y), (E = b), (R = w))),
                                p &&
                                    g >= P &&
                                    S > 0 &&
                                    (g > P || m > I) &&
                                    ((y = null),
                                    (v = Mt('number' == typeof c.threshold ? c.threshold : s, o, u.height, d.height)),
                                    6 === l
                                        ? (b = d.bottom + v.offset - u.bottom) <= v.value && xt(_) < S && (y = 6)
                                        : 10 === l &&
                                          (b = u.top - (d.top - v.offset)) <= v.value &&
                                          xt(_) > 0 &&
                                          (y = 10),
                                    null !== y &&
                                        ((L = _), (P = g), (M = v.value), (I = m), (C = y), (N = b), (O = S))))))
            e && (T ? this._requestItemScroll(t, 1, T, k, x, E, R) : this._cancelItemScroll(t, 1)),
                i && (L ? this._requestItemScroll(t, 2, L, C, M, N, O) : this._cancelItemScroll(t, 2))
        }),
        (qt.prototype._updateScrollRequest = function (t) {
            for (
                var e = t.item,
                    i = Rt(e),
                    n = dt(i.targets) ? i.targets(e) : i.targets,
                    r = (n && n.length) || 0,
                    s = i.threshold,
                    o = i.safeZone,
                    a = this._getItemHandleRect(e, i.handle, Xt),
                    h = Yt,
                    l = null,
                    u = null,
                    d = !1,
                    c = null,
                    _ = null,
                    f = null,
                    p = null,
                    m = null,
                    g = 0;
                g < r;
                g++
            )
                if ((u = Tt((l = n[g]).element || l)) === t.element) {
                    if ((d = !!(1 & t.direction))) {
                        if (2 === l.axis) continue
                    } else if (1 === l.axis) continue
                    if ((p = d ? At(u) : kt(u)) <= 0) break
                    if (Ot(a, (h = Et(u, h))) <= 0) break
                    if (
                        ((c = Mt(
                            'number' == typeof l.threshold ? l.threshold : s,
                            o,
                            d ? a.width : a.height,
                            d ? h.width : h.height,
                        )),
                        (_ =
                            9 === t.direction
                                ? a.left - (h.left - c.offset)
                                : 5 === t.direction
                                ? h.right + c.offset - a.right
                                : 10 === t.direction
                                ? a.top - (h.top - c.offset)
                                : h.bottom + c.offset - a.bottom) > c.value)
                    )
                        break
                    if (((f = d ? Dt(u) : xt(u)), (m = 4 & t.direction ? f >= p : f <= 0))) break
                    return (t.maxValue = p), (t.threshold = c.value), (t.distance = _), (t.isEnding = !1), !0
                }
            return (
                !0 === i.smoothStop && t.speed > 0
                    ? (null === m && (m = t.hasReachedEnd()), (t.isEnding = !m))
                    : (t.isEnding = !1),
                t.isEnding
            )
        }),
        (qt.prototype._updateRequests = function () {
            for (
                var t, e, i, n, r, s, o, a = this._items, h = this._requests[1], l = this._requests[2], u = 0;
                u < a.length;
                u++
            )
                (t = a[u]),
                    (r = (n = this._requestOverlapCheck[t._id]) > 0 && this._tickTime - n > this._overlapCheckInterval),
                    (s = !0),
                    (e = h[t._id]) &&
                        e.isActive &&
                        (s = !this._updateScrollRequest(e)) &&
                        ((r = !0), this._cancelItemScroll(t, 1)),
                    (o = !0),
                    (i = l[t._id]) &&
                        i.isActive &&
                        (o = !this._updateScrollRequest(i)) &&
                        ((r = !0), this._cancelItemScroll(t, 2)),
                    r && ((this._requestOverlapCheck[t._id] = 0), this._checkItemOverlap(t, s, o))
        }),
        (qt.prototype._requestAction = function (t, e) {
            for (var i = this._actions, n = 1 === e, r = null, s = 0; s < i.length; s++) {
                if (((r = i[s]), t.element === r.element)) {
                    if (n ? r.requestX : r.requestY) return void this._cancelItemScroll(t.item, e)
                    break
                }
                r = null
            }
            r || (r = this._actionPool.pick()),
                (r.element = t.element),
                r.addRequest(t),
                t.tick(this._tickDeltaTime),
                i.push(r)
        }),
        (qt.prototype._updateActions = function () {
            var t,
                e,
                i,
                n,
                r = this._items,
                s = this._requests,
                o = this._actions
            for (n = 0; n < r.length; n++)
                (t = r[n]._id),
                    (e = s[1][t]),
                    (i = s[2][t]),
                    e && this._requestAction(e, 1),
                    i && this._requestAction(i, 2)
            for (n = 0; n < o.length; n++) o[n].computeScrollValues()
        }),
        (qt.prototype._applyActions = function () {
            var t,
                e = this._actions,
                i = this._items
            if (e.length) {
                for (t = 0; t < e.length; t++) e[t].scroll(), this._actionPool.release(e[t])
                for (e.length = 0, t = 0; t < i.length; t++) Lt(i[t])
                for (t = 0; t < i.length; t++) Pt(i[t])
            }
        }),
        (qt.prototype._updateDragDirection = function (t) {
            var e = this._dragPositions[t._id],
                i = this._dragDirections[t._id],
                n = t._drag._left,
                r = t._drag._top
            if (e.length) {
                var s = e[0],
                    o = e[1]
                ;(i[0] = n > s ? 5 : n < s ? 9 : i[0] || 0), (i[1] = r > o ? 6 : r < o ? 10 : i[1] || 0)
            }
            ;(e[0] = n), (e[1] = r)
        }),
        (qt.prototype.addItem = function (t) {
            this._isDestroyed ||
                (-1 === this._items.indexOf(t) &&
                    (this._items.push(t),
                    (this._requestOverlapCheck[t._id] = this._tickTime),
                    (this._dragDirections[t._id] = [0, 0]),
                    (this._dragPositions[t._id] = []),
                    this._isTicking || this._startTicking()))
        }),
        (qt.prototype.updateItem = function (t) {
            this._isDestroyed ||
                (this._dragDirections[t._id] &&
                    (this._updateDragDirection(t),
                    this._requestOverlapCheck[t._id] || (this._requestOverlapCheck[t._id] = this._tickTime)))
        }),
        (qt.prototype.removeItem = function (t) {
            if (!this._isDestroyed) {
                var e = this._items.indexOf(t)
                if (-1 !== e) {
                    var i = t._id
                    this._requests[1][i] && (this._cancelItemScroll(t, 1), delete this._requests[1][i]),
                        this._requests[2][i] && (this._cancelItemScroll(t, 2), delete this._requests[2][i]),
                        delete this._requestOverlapCheck[i],
                        delete this._dragPositions[i],
                        delete this._dragDirections[i],
                        this._items.splice(e, 1),
                        this._isTicking && !this._items.length && this._stopTicking()
                }
            }
        }),
        (qt.prototype.isItemScrollingX = function (t) {
            var e = this._requests[1][t._id]
            return !(!e || !e.isActive)
        }),
        (qt.prototype.isItemScrollingY = function (t) {
            var e = this._requests[2][t._id]
            return !(!e || !e.isActive)
        }),
        (qt.prototype.isItemScrolling = function (t) {
            return this.isItemScrollingX(t) || this.isItemScrollingY(t)
        }),
        (qt.prototype.destroy = function () {
            if (!this._isDestroyed) {
                for (var t = this._items.slice(0), e = 0; e < t.length; e++) this.removeItem(t[e])
                ;(this._actions.length = 0),
                    this._requestPool.reset(),
                    this._actionPool.reset(),
                    (this._isDestroyed = !0)
            }
        })
    var Ht = window.Element.prototype,
        Ft =
            Ht.matches ||
            Ht.matchesSelector ||
            Ht.webkitMatchesSelector ||
            Ht.mozMatchesSelector ||
            Ht.msMatchesSelector ||
            Ht.oMatchesSelector ||
            function () {
                return !1
            }
    function Wt(t, e) {
        return Ft.call(t, e)
    }
    function Bt(t, e) {
        e && (t.classList ? t.classList.add(e) : Wt(t, '.' + e) || (t.className += ' ' + e))
    }
    var Gt = []
    function zt(t, e, i) {
        var n = 'number' == typeof i ? i : -1
        n < 0 && (n = t.length - n + 1), t.splice.apply(t, Gt.concat(n, 0, e)), (Gt.length = 0)
    }
    function Vt(t, e, i) {
        var n = Math.max(0, t.length - 1 + (i || 0))
        return e > n ? n : e < 0 ? Math.max(n + e + 1, 0) : e
    }
    function jt(t, e, i) {
        if (!(t.length < 2)) {
            var n = Vt(t, e),
                r = Vt(t, i)
            n !== r && t.splice(r, 0, t.splice(n, 1)[0])
        }
    }
    function Ut(t, e, i) {
        if (!(t.length < 2)) {
            var n,
                r = Vt(t, e),
                s = Vt(t, i)
            r !== s && ((n = t[r]), (t[r] = t[s]), (t[s] = n))
        }
    }
    var Qt = x(document.documentElement.style, 'transform') || 'transform',
        Kt = /([A-Z])/g,
        $t = /^(webkit-|moz-|ms-|o-)/,
        Zt = /^(-m-s-)/
    function Jt(t) {
        var e = t.replace(Kt, '-$1').toLowerCase()
        return (e = (e = e.replace($t, '-$1')).replace(Zt, '-ms-'))
    }
    var te = Jt(Qt)
    function ee(t) {
        var e = gt(t, te)
        if (!e || 'none' === e) return !1
        var i = gt(t, 'display')
        return 'inline' !== i && 'none' !== i
    }
    function ie(t) {
        for (var e = document, i = t || e; i && i !== e && 'static' === gt(i, 'position') && !ee(i); )
            i = i.parentElement || e
        return i
    }
    var ne = {},
        re = {},
        se = {}
    function oe(t, e) {
        var i,
            n = e || {}
        return (
            (n.left = 0),
            (n.top = 0),
            t === document
                ? n
                : ((n.left = window.pageXOffset || 0),
                  (n.top = window.pageYOffset || 0),
                  t.self === window.self ||
                      ((i = t.getBoundingClientRect()),
                      (n.left += i.left),
                      (n.top += i.top),
                      (n.left += vt(t, 'border-left-width')),
                      (n.top += vt(t, 'border-top-width'))),
                  n)
        )
    }
    function ae(t, e, i) {
        return (
            (se.left = 0),
            (se.top = 0),
            t === e ||
                (i && (t = ie(t)) === (e = ie(e))) ||
                (oe(t, ne), oe(e, re), (se.left = re.left - ne.left), (se.top = re.top - ne.top)),
            se
        )
    }
    function he(t) {
        return 'auto' === t || 'scroll' === t || 'overlay' === t
    }
    function le(t) {
        return he(gt(t, 'overflow')) || he(gt(t, 'overflow-x')) || he(gt(t, 'overflow-y'))
    }
    function ue(t, e) {
        for (e = e || []; t && t !== document; )
            t.getRootNode && t instanceof DocumentFragment
                ? (t = t.getRootNode().host)
                : (le(t) && e.push(t), (t = t.parentNode))
        return e.push(window), e
    }
    var de = {},
        ce = /^matrix3d/,
        _e = /([^,]*,){4}/,
        fe = /([^,]*,){12}/,
        pe = /[^,]*,/
    function me(t) {
        ;(de.x = 0), (de.y = 0)
        var e = gt(t, te)
        if (!e || 'none' === e) return de
        var i = ce.test(e),
            n = e.replace(i ? fe : _e, ''),
            r = n.replace(pe, '')
        return (de.x = parseFloat(n) || 0), (de.y = parseFloat(r) || 0), de
    }
    function ge(t, e) {
        e &&
            (t.classList
                ? t.classList.remove(e)
                : Wt(t, '.' + e) && (t.className = (' ' + t.className + ' ').replace(' ' + e + ' ', ' ').trim()))
    }
    var ve,
        ye,
        be,
        we,
        Se =
            /^(iPad|iPhone|iPod)/.test(window.navigator.platform) ||
            (/^Mac/.test(window.navigator.platform) && window.navigator.maxTouchPoints > 1),
        Te = !!A() && { passive: !0 }
    function De(t) {
        var e = t._element,
            i = t.getGrid(),
            n = i._settings
        ;(this._item = t),
            (this._gridId = i._id),
            (this._isDestroyed = !1),
            (this._isMigrating = !1),
            (this._startPredicate = dt(n.dragStartPredicate) ? n.dragStartPredicate : De.defaultStartPredicate),
            (this._startPredicateState = 0),
            (this._startPredicateResult = void 0),
            (this._isSortNeeded = !1),
            (this._sortTimer = void 0),
            (this._blockedSortIndex = null),
            (this._sortX1 = 0),
            (this._sortX2 = 0),
            (this._sortY1 = 0),
            (this._sortY2 = 0),
            this._reset(),
            (this._preStartCheck = this._preStartCheck.bind(this)),
            (this._preEndCheck = this._preEndCheck.bind(this)),
            (this._onScroll = this._onScroll.bind(this)),
            (this._prepareStart = this._prepareStart.bind(this)),
            (this._applyStart = this._applyStart.bind(this)),
            (this._prepareMove = this._prepareMove.bind(this)),
            (this._applyMove = this._applyMove.bind(this)),
            (this._prepareScroll = this._prepareScroll.bind(this)),
            (this._applyScroll = this._applyScroll.bind(this)),
            (this._handleSort = this._handleSort.bind(this)),
            (this._handleSortDelayed = this._handleSortDelayed.bind(this)),
            (this._handle = (n.dragHandle && e.querySelector(n.dragHandle)) || e),
            (this._dragger = new N(this._handle, n.dragCssProps)),
            this._dragger.on('start', this._preStartCheck),
            this._dragger.on('move', this._preStartCheck),
            this._dragger.on('cancel', this._preEndCheck),
            this._dragger.on('end', this._preEndCheck)
    }
    function xe(t, e) {
        var i,
            n,
            r = {}
        if (Array.isArray(e)) for (n = 0; n < e.length; n++) r[(i = e[n])] = gt(t, Jt(i))
        else for (i in e) r[i] = gt(t, Jt(i))
        return r
    }
    ;(De.autoScroller = new qt()),
        (De.defaultStartPredicate = function (t, e, i) {
            var n = t._drag
            if (e.isFirst && e.srcEvent.button) return !1
            if (
                !Se &&
                e.isFirst &&
                !0 === e.srcEvent.isTrusted &&
                !1 === e.srcEvent.defaultPrevented &&
                !1 === e.srcEvent.cancelable
            )
                return !1
            if (!e.isFinal) {
                var r = n._startPredicateData
                if (!r) {
                    var s = i || n._getGrid()._settings.dragStartPredicate || {}
                    n._startPredicateData = r = {
                        distance: Math.max(s.distance, 0) || 0,
                        delay: Math.max(s.delay, 0) || 0,
                    }
                }
                return (
                    r.delay &&
                        ((r.event = e),
                        r.delayTimer ||
                            (r.delayTimer = window.setTimeout(function () {
                                ;(r.delay = 0),
                                    n._resolveStartPredicate(r.event) &&
                                        (n._forceResolveStartPredicate(r.event), n._resetStartPredicate())
                            }, r.delay))),
                    n._resolveStartPredicate(e)
                )
            }
            n._finishStartPredicate(e)
        }),
        (De.defaultSortPredicate =
            ((ve = {}),
            (ye = {}),
            (be = {}),
            (we = []),
            function (t, e) {
                var r = t._drag,
                    s = r._getGrid(),
                    o = e && 'number' == typeof e.threshold ? e.threshold : 50,
                    a = e && e.action === i ? i : n,
                    h = e && e.migrateAction === i ? i : n
                ;(o = Math.min(Math.max(o, 1), 100)),
                    (ve.width = t._width),
                    (ve.height = t._height),
                    (ve.left = r._clientX),
                    (ve.top = r._clientY)
                var l = (function (t, e, i) {
                    var n,
                        r,
                        s,
                        o,
                        a,
                        h,
                        l,
                        u,
                        d,
                        c,
                        _ = null,
                        f = e._settings.dragSort,
                        p = -1
                    if (
                        (!0 === f ? ((we[0] = e), (r = we)) : dt(f) && (r = f.call(e, t)),
                        !r || !Array.isArray(r) || !r.length)
                    )
                        return _
                    for (c = 0; c < r.length; c++)
                        if (!(s = r[c])._isDestroyed) {
                            for (
                                s._updateBoundingRect(),
                                    h = Math.max(0, s._left),
                                    l = Math.max(0, s._top),
                                    u = Math.min(window.innerWidth, s._right),
                                    d = Math.min(window.innerHeight, s._bottom),
                                    o = s._element.parentNode;
                                o && o !== document && o !== document.documentElement && o !== document.body;

                            )
                                if (o.getRootNode && o instanceof DocumentFragment) o = o.getRootNode().host
                                else {
                                    if (
                                        ('visible' !== gt(o, 'overflow') &&
                                            ((a = o.getBoundingClientRect()),
                                            (h = Math.max(h, a.left)),
                                            (l = Math.max(l, a.top)),
                                            (u = Math.min(u, a.right)),
                                            (d = Math.min(d, a.bottom))),
                                        'fixed' === gt(o, 'position'))
                                    )
                                        break
                                    o = o.parentNode
                                }
                            h >= u ||
                                l >= d ||
                                ((ye.left = h),
                                (ye.top = l),
                                (ye.width = u - h),
                                (ye.height = d - l),
                                (n = Ot(ve, ye)) > i && n > p && ((p = n), (_ = s)))
                        }
                    return (we.length = 0), _
                })(t, s, o)
                if (!l) return null
                var u,
                    d,
                    c,
                    _ = t.getGrid() !== l,
                    f = 0,
                    p = 0,
                    m = 0,
                    g = -1,
                    v = !1
                for (
                    l === s
                        ? ((ve.left = r._gridX + t._marginLeft), (ve.top = r._gridY + t._marginTop))
                        : (l._updateBorders(1, 0, 1, 0), (f = l._left + l._borderLeft), (p = l._top + l._borderTop)),
                        c = 0;
                    c < l._items.length;
                    c++
                )
                    (u = l._items[c])._isActive &&
                        u !== t &&
                        ((v = !0),
                        (ye.width = u._width),
                        (ye.height = u._height),
                        (ye.left = u._left + u._marginLeft + f),
                        (ye.top = u._top + u._marginTop + p),
                        (d = Ot(ve, ye)) > m && ((g = c), (m = d)))
                return (
                    _ && m < o && ((g = v ? g : 0), (m = o)),
                    m >= o ? ((be.grid = l), (be.index = g), (be.action = _ ? h : a), be) : null
                )
            })),
        (De.prototype.stop = function () {
            if (this._isActive)
                if (this._isMigrating) this._finishMigration()
                else {
                    De.autoScroller.removeItem(this._item)
                    var t = this._item._id
                    if ((st(t), ot(t), at(t), this._cancelSort(), this._isStarted)) {
                        this._unbindScrollListeners()
                        var e = item._element,
                            i = this._getGrid(),
                            n = i._settings.itemDraggingClass
                        e.parentNode !== i._element &&
                            (i._element.appendChild(e), item._setTranslate(this._gridX, this._gridY)),
                            ge(e, n)
                    }
                    this._reset()
                }
        }),
        (De.prototype.sort = function (t) {
            var e = this._item
            this._isActive &&
                e._isActive &&
                this._dragMoveEvent &&
                (!0 === t ? this._handleSort() : ht(e._id, this._handleSort))
        }),
        (De.prototype.destroy = function () {
            this._isDestroyed ||
                (this.stop(), this._dragger.destroy(), De.autoScroller.removeItem(this._item), (this._isDestroyed = !0))
        }),
        (De.prototype._getGrid = function () {
            return t[this._gridId] || null
        }),
        (De.prototype._reset = function () {
            ;(this._isActive = !1),
                (this._isStarted = !1),
                (this._container = null),
                (this._containingBlock = null),
                (this._dragStartEvent = null),
                (this._dragMoveEvent = null),
                (this._dragPrevMoveEvent = null),
                (this._scrollEvent = null),
                (this._scrollers = []),
                (this._left = 0),
                (this._top = 0),
                (this._gridX = 0),
                (this._gridY = 0),
                (this._clientX = 0),
                (this._clientY = 0),
                (this._scrollDiffX = 0),
                (this._scrollDiffY = 0),
                (this._moveDiffX = 0),
                (this._moveDiffY = 0),
                (this._containerDiffX = 0),
                (this._containerDiffY = 0)
        }),
        (De.prototype._bindScrollListeners = function () {
            var t,
                e,
                i = this._getGrid()._element,
                n = this._container,
                r = this._scrollers
            if (((r.length = 0), ue(this._item._element.parentNode, r), n !== i))
                for (ue(i, (t = [])), e = 0; e < t.length; e++) r.indexOf(t[e]) < 0 && r.push(t[e])
            for (e = 0; e < r.length; e++) r[e].addEventListener('scroll', this._onScroll, Te)
        }),
        (De.prototype._unbindScrollListeners = function () {
            var t,
                e = this._scrollers
            for (t = 0; t < e.length; t++) e[t].removeEventListener('scroll', this._onScroll, Te)
            e.length = 0
        }),
        (De.prototype._resolveStartPredicate = function (t) {
            var e = this._startPredicateData
            if (!(t.distance < e.distance || e.delay)) return this._resetStartPredicate(), !0
        }),
        (De.prototype._forceResolveStartPredicate = function (t) {
            this._isDestroyed || 1 !== this._startPredicateState || ((this._startPredicateState = 2), this._onStart(t))
        }),
        (De.prototype._finishStartPredicate = function (t) {
            var e = this._item._element,
                i = Math.abs(t.deltaX) < 2 && Math.abs(t.deltaY) < 2 && t.deltaTime < 200
            this._resetStartPredicate(),
                i &&
                    (function (t) {
                        if ('a' !== t.tagName.toLowerCase()) return
                        var e = t.getAttribute('href')
                        if (!e) return
                        var i = t.getAttribute('target')
                        i && '_self' !== i ? window.open(e, i) : (window.location.href = e)
                    })(e)
        }),
        (De.prototype._resetHeuristics = function (t, e) {
            ;(this._blockedSortIndex = null), (this._sortX1 = this._sortX2 = t), (this._sortY1 = this._sortY2 = e)
        }),
        (De.prototype._checkHeuristics = function (t, e) {
            var i = this._getGrid()._settings.dragSortHeuristics,
                n = i.minDragDistance
            if (n <= 0) return (this._blockedSortIndex = null), !0
            var r = t - this._sortX2,
                s = e - this._sortY2,
                o = n > 3 && i.minBounceBackAngle > 0
            if ((o || (this._blockedSortIndex = null), Math.abs(r) > n || Math.abs(s) > n)) {
                if (o) {
                    var a = Math.atan2(r, s),
                        h = Math.atan2(this._sortX2 - this._sortX1, this._sortY2 - this._sortY1),
                        l = Math.atan2(Math.sin(a - h), Math.cos(a - h))
                    Math.abs(l) > i.minBounceBackAngle && (this._blockedSortIndex = null)
                }
                return (
                    (this._sortX1 = this._sortX2),
                    (this._sortY1 = this._sortY2),
                    (this._sortX2 = t),
                    (this._sortY2 = e),
                    !0
                )
            }
            return !1
        }),
        (De.prototype._resetStartPredicate = function () {
            var t = this._startPredicateData
            t && (t.delayTimer && (t.delayTimer = window.clearTimeout(t.delayTimer)), (this._startPredicateData = null))
        }),
        (De.prototype._handleSort = function () {
            if (this._isActive) {
                var t = this._getGrid()._settings
                if (!t.dragSort || (!t.dragAutoScroll.sortDuringScroll && De.autoScroller.isItemScrolling(this._item)))
                    return (
                        (this._sortX1 = this._sortX2 = this._gridX),
                        (this._sortY1 = this._sortY2 = this._gridY),
                        (this._isSortNeeded = !0),
                        void (void 0 !== this._sortTimer && (this._sortTimer = window.clearTimeout(this._sortTimer)))
                    )
                var e = this._checkHeuristics(this._gridX, this._gridY)
                if (this._isSortNeeded || e) {
                    var i = t.dragSortHeuristics.sortInterval
                    i <= 0 || this._isSortNeeded
                        ? ((this._isSortNeeded = !1),
                          void 0 !== this._sortTimer && (this._sortTimer = window.clearTimeout(this._sortTimer)),
                          this._checkOverlap())
                        : void 0 === this._sortTimer &&
                          (this._sortTimer = window.setTimeout(this._handleSortDelayed, i))
                }
            }
        }),
        (De.prototype._handleSortDelayed = function () {
            ;(this._isSortNeeded = !0), (this._sortTimer = void 0), ht(this._item._id, this._handleSort)
        }),
        (De.prototype._cancelSort = function () {
            var t
            ;(this._isSortNeeded = !1),
                void 0 !== this._sortTimer && (this._sortTimer = window.clearTimeout(this._sortTimer)),
                (t = this._item._id),
                it.remove(1, Q + t)
        }),
        (De.prototype._finishSort = function () {
            var t = this._getGrid()._settings.dragSort && (this._isSortNeeded || void 0 !== this._sortTimer)
            this._cancelSort(), t && this._checkOverlap()
        }),
        (De.prototype._checkOverlap = function () {
            if (this._isActive) {
                var t,
                    e,
                    r,
                    s,
                    o,
                    a,
                    h,
                    l,
                    u = this._item,
                    m = this._getGrid()._settings
                ;(t = dt(m.dragSortPredicate)
                    ? m.dragSortPredicate(u, this._dragMoveEvent)
                    : De.defaultSortPredicate(u, m.dragSortPredicate)) &&
                    'number' == typeof t.index &&
                    ((h = t.action === i ? i : n),
                    (l = (e = u.getGrid()) !== (s = t.grid || e)),
                    (r = e._items.indexOf(u)),
                    (o = Vt(s._items, t.index, l && h === n ? 1 : 0)),
                    (l || o !== this._blockedSortIndex) &&
                        (l
                            ? ((this._blockedSortIndex = null),
                              (a = s._items[o]),
                              e._hasListeners(_) &&
                                  e._emit(_, { item: u, fromGrid: e, fromIndex: r, toGrid: s, toIndex: o }),
                              s._hasListeners(p) &&
                                  s._emit(p, { item: u, fromGrid: e, fromIndex: r, toGrid: s, toIndex: o }),
                              (u._gridId = s._id),
                              (this._isMigrating = u._gridId !== this._gridId),
                              e._items.splice(r, 1),
                              zt(s._items, u, o),
                              (u._sortData = null),
                              e._hasListeners(c) &&
                                  e._emit(c, { item: u, fromGrid: e, fromIndex: r, toGrid: s, toIndex: o }),
                              s._hasListeners(f) &&
                                  s._emit(f, { item: u, fromGrid: e, fromIndex: r, toGrid: s, toIndex: o }),
                              h === i &&
                                  a &&
                                  a.isActive() &&
                                  s._items.indexOf(a) > -1 &&
                                  s.send(a, e, r, {
                                      appendTo: this._container || document.body,
                                      layoutSender: !1,
                                      layoutReceiver: !1,
                                  }),
                              e.layout(),
                              s.layout())
                            : r !== o &&
                              ((this._blockedSortIndex = r),
                              (h === i ? Ut : jt)(e._items, r, o),
                              e._hasListeners(d) && e._emit(d, { item: u, fromIndex: r, toIndex: o, action: h }),
                              e.layout())))
            }
        }),
        (De.prototype._finishMigration = function () {
            var t,
                e,
                i = this._item,
                n = i._dragRelease,
                r = i._element,
                s = i._isActive,
                o = i.getGrid(),
                a = o._element,
                h = o._settings,
                l = h.dragContainer || a,
                u = this._getGrid()._settings,
                d = r.parentNode,
                c = s ? u.itemVisibleClass : u.itemHiddenClass,
                _ = s ? h.itemVisibleClass : h.itemHiddenClass
            ;(this._isMigrating = !1),
                this.destroy(),
                u.itemClass !== h.itemClass && (ge(r, u.itemClass), Bt(r, h.itemClass)),
                c !== _ && (ge(r, c), Bt(r, _)),
                l !== d && (l.appendChild(r), (e = ae(d, l, !0)), ((t = me(r)).x -= e.left), (t.y -= e.top)),
                i._refreshDimensions(),
                (e = ae(l, a, !0)),
                (n._containerDiffX = e.left),
                (n._containerDiffY = e.top),
                (i._drag = h.dragEnabled ? new De(i) : null),
                l !== d && i._setTranslate(t.x, t.y),
                i._visibility.setStyles(s ? h.visibleStyles : h.hiddenStyles),
                n.start()
        }),
        (De.prototype._preStartCheck = function (t) {
            0 === this._startPredicateState && (this._startPredicateState = 1),
                1 === this._startPredicateState
                    ? ((this._startPredicateResult = this._startPredicate(this._item, t)),
                      !0 === this._startPredicateResult
                          ? ((this._startPredicateState = 2), this._onStart(t))
                          : !1 === this._startPredicateResult &&
                            (this._resetStartPredicate(t), this._dragger._reset(), (this._startPredicateState = 0)))
                    : 2 === this._startPredicateState && this._isActive && this._onMove(t)
        }),
        (De.prototype._preEndCheck = function (t) {
            var e = 2 === this._startPredicateState
            this._startPredicate(this._item, t),
                (this._startPredicateState = 0),
                e && this._isActive && (this._isStarted ? this._onEnd(t) : this.stop())
        }),
        (De.prototype._onStart = function (t) {
            var e,
                i,
                n,
                r = this._item
            r._isActive &&
                ((this._isActive = !0),
                (this._dragStartEvent = t),
                De.autoScroller.addItem(r),
                (e = r._id),
                (i = this._prepareStart),
                (n = this._applyStart),
                it.add(0, B + e, i),
                it.add(2, G + e, n))
        }),
        (De.prototype._prepareStart = function () {
            if (this._isActive) {
                var t = this._item
                if (t._isActive) {
                    var e = t._element,
                        i = this._getGrid(),
                        n = i._settings,
                        r = i._element,
                        s = n.dragContainer || r,
                        o = ie(s),
                        a = me(e),
                        h = e.getBoundingClientRect(),
                        l = s !== r
                    if (
                        ((this._container = s),
                        (this._containingBlock = o),
                        (this._clientX = h.left),
                        (this._clientY = h.top),
                        (this._left = this._gridX = a.x),
                        (this._top = this._gridY = a.y),
                        (this._scrollDiffX = this._scrollDiffY = 0),
                        (this._moveDiffX = this._moveDiffY = 0),
                        this._resetHeuristics(this._gridX, this._gridY),
                        l)
                    ) {
                        var u = ae(o, r)
                        ;(this._containerDiffX = u.left), (this._containerDiffY = u.top)
                    }
                }
            }
        }),
        (De.prototype._applyStart = function () {
            if (this._isActive) {
                var t = this._item
                if (t._isActive) {
                    var e = this._getGrid(),
                        i = t._element,
                        n = t._dragRelease,
                        r = t._migrate,
                        s = this._container !== e._element
                    t.isPositioning() && t._layout.stop(!0, this._left, this._top),
                        r._isActive &&
                            ((this._left -= r._containerDiffX),
                            (this._top -= r._containerDiffY),
                            (this._gridX -= r._containerDiffX),
                            (this._gridY -= r._containerDiffY),
                            r.stop(!0, this._left, this._top)),
                        t.isReleasing() && n._reset(),
                        e._settings.dragPlaceholder.enabled && t._dragPlaceholder.create(),
                        (this._isStarted = !0),
                        e._emit('dragInit', t, this._dragStartEvent),
                        s &&
                            (i.parentNode === this._container
                                ? ((this._gridX -= this._containerDiffX), (this._gridY -= this._containerDiffY))
                                : ((this._left += this._containerDiffX),
                                  (this._top += this._containerDiffY),
                                  this._container.appendChild(i),
                                  t._setTranslate(this._left, this._top))),
                        Bt(i, e._settings.itemDraggingClass),
                        this._bindScrollListeners(),
                        e._emit('dragStart', t, this._dragStartEvent)
                }
            }
        }),
        (De.prototype._onMove = function (t) {
            var e,
                i,
                n,
                r = this._item
            r._isActive
                ? ((this._dragMoveEvent = t),
                  (e = r._id),
                  (i = this._prepareMove),
                  (n = this._applyMove),
                  it.add(0, z + e, i),
                  it.add(2, V + e, n),
                  ht(r._id, this._handleSort))
                : this.stop()
        }),
        (De.prototype._prepareMove = function () {
            if (this._isActive && this._item._isActive) {
                var t = this._getGrid()._settings.dragAxis,
                    e = this._dragMoveEvent,
                    i = this._dragPrevMoveEvent || this._dragStartEvent || e
                if ('y' !== t) {
                    var n = e.clientX - i.clientX
                    ;(this._left = this._left - this._moveDiffX + n),
                        (this._gridX = this._gridX - this._moveDiffX + n),
                        (this._clientX = this._clientX - this._moveDiffX + n),
                        (this._moveDiffX = n)
                }
                if ('x' !== t) {
                    var r = e.clientY - i.clientY
                    ;(this._top = this._top - this._moveDiffY + r),
                        (this._gridY = this._gridY - this._moveDiffY + r),
                        (this._clientY = this._clientY - this._moveDiffY + r),
                        (this._moveDiffY = r)
                }
                this._dragPrevMoveEvent = e
            }
        }),
        (De.prototype._applyMove = function () {
            if (this._isActive) {
                var t = this._item
                t._isActive &&
                    ((this._moveDiffX = this._moveDiffY = 0),
                    t._setTranslate(this._left, this._top),
                    this._getGrid()._emit('dragMove', t, this._dragMoveEvent),
                    De.autoScroller.updateItem(t))
            }
        }),
        (De.prototype._onScroll = function (t) {
            var e,
                i,
                n,
                r = this._item
            r._isActive
                ? ((this._scrollEvent = t),
                  (e = r._id),
                  (i = this._prepareScroll),
                  (n = this._applyScroll),
                  it.add(0, j + e, i),
                  it.add(2, U + e, n),
                  ht(r._id, this._handleSort))
                : this.stop()
        }),
        (De.prototype._prepareScroll = function () {
            if (this._isActive) {
                var t = this._item
                if (t._isActive) {
                    var e = t._element,
                        i = this._getGrid(),
                        n = i._element,
                        r = i._settings.dragAxis,
                        s = 'y' !== r,
                        o = 'x' !== r,
                        a = e.getBoundingClientRect()
                    if (this._container !== n) {
                        var h = ae(this._containingBlock, n)
                        ;(this._containerDiffX = h.left), (this._containerDiffY = h.top)
                    }
                    if (s) {
                        var l = this._clientX - this._moveDiffX - this._scrollDiffX - a.left
                        ;(this._left = this._left - this._scrollDiffX + l), (this._scrollDiffX = l)
                    }
                    if (o) {
                        var u = this._clientY - this._moveDiffY - this._scrollDiffY - a.top
                        ;(this._top = this._top - this._scrollDiffY + u), (this._scrollDiffY = u)
                    }
                    ;(this._gridX = this._left - this._containerDiffX), (this._gridY = this._top - this._containerDiffY)
                }
            }
        }),
        (De.prototype._applyScroll = function () {
            if (this._isActive) {
                var t = this._item
                t._isActive &&
                    ((this._scrollDiffX = this._scrollDiffY = 0),
                    t._setTranslate(this._left, this._top),
                    this._getGrid()._emit('dragScroll', t, this._scrollEvent))
            }
        }),
        (De.prototype._onEnd = function (t) {
            var e = this._item,
                i = e._element,
                n = this._getGrid(),
                r = n._settings,
                s = e._dragRelease
            e._isActive
                ? (st(e._id),
                  ot(e._id),
                  at(e._id),
                  this._finishSort(),
                  this._unbindScrollListeners(),
                  (s._containerDiffX = this._containerDiffX),
                  (s._containerDiffY = this._containerDiffY),
                  this._reset(),
                  ge(i, r.itemDraggingClass),
                  De.autoScroller.removeItem(e),
                  n._emit('dragEnd', e, t),
                  this._isMigrating ? this._finishMigration() : s.start())
                : this.stop()
        })
    var Ae = /^(webkit|moz|ms|o|Webkit|Moz|MS|O)(?=[A-Z])/,
        ke = {}
    function Ee(t) {
        var e = ke[t]
        return e || ((e = t.replace(Ae, '')) !== t && (e = e[0].toLowerCase() + e.slice(1)), (ke[t] = e), e)
    }
    function Re(t, e) {
        for (var i in e) t.style[i] = e[i]
    }
    var Le,
        Pe,
        Me = !(!Element || !dt(Element.prototype.animate)),
        Ie = !!(
            Element &&
            ((Le = Element.prototype.animate),
            (Pe = window.Symbol),
            Le && dt(Pe) && dt(Pe.toString) && Pe(Le).toString().indexOf('[native code]') > -1)
        )
    function Ce(t) {
        ;(this._element = t),
            (this._animation = null),
            (this._duration = 0),
            (this._easing = ''),
            (this._callback = null),
            (this._props = []),
            (this._values = []),
            (this._isDestroyed = !1),
            (this._onFinish = this._onFinish.bind(this))
    }
    function Ne(t, e) {
        var i = {}
        for (var n in t) i[e ? n : Ee(n)] = t[n]
        return i
    }
    function Oe(t, e) {
        return 'translateX(' + t + 'px) translateY(' + e + 'px)'
    }
    function Xe(t) {
        ;(this._item = t),
            (this._animation = new Ce()),
            (this._element = null),
            (this._className = ''),
            (this._didMigrate = !1),
            (this._resetAfterLayout = !1),
            (this._left = 0),
            (this._top = 0),
            (this._transX = 0),
            (this._transY = 0),
            (this._nextTransX = 0),
            (this._nextTransY = 0),
            (this._setupAnimation = this._setupAnimation.bind(this)),
            (this._startAnimation = this._startAnimation.bind(this)),
            (this._updateDimensions = this._updateDimensions.bind(this)),
            (this._onLayoutStart = this._onLayoutStart.bind(this)),
            (this._onLayoutEnd = this._onLayoutEnd.bind(this)),
            (this._onReleaseEnd = this._onReleaseEnd.bind(this)),
            (this._onMigrate = this._onMigrate.bind(this)),
            (this._onHide = this._onHide.bind(this))
    }
    function Ye(t) {
        ;(this._item = t),
            (this._isActive = !1),
            (this._isDestroyed = !1),
            (this._isPositioningStarted = !1),
            (this._containerDiffX = 0),
            (this._containerDiffY = 0)
    }
    ;(Ce.prototype.start = function (t, e, i) {
        if (!this._isDestroyed) {
            var n = this._element,
                r = i || {}
            if (!Me) return Re(n, e), (this._callback = dt(r.onFinish) ? r.onFinish : null), void this._onFinish()
            var s,
                o,
                a,
                h = this._animation,
                l = this._props,
                u = this._values,
                d = r.duration || 300,
                c = r.easing || 'ease',
                _ = !1
            if (h && ((o = 0), (d === this._duration && c === this._easing) || (_ = !0), !_)) {
                for (s in e)
                    if ((++o, -1 === (a = l.indexOf(s)) || e[s] !== u[a])) {
                        _ = !0
                        break
                    }
                o !== l.length && (_ = !0)
            }
            if ((_ && h.cancel(), (this._callback = dt(r.onFinish) ? r.onFinish : null), !h || _)) {
                for (s in ((l.length = u.length = 0), e)) l.push(s), u.push(e[s])
                ;(this._duration = d),
                    (this._easing = c),
                    (this._animation = n.animate([Ne(t, Ie), Ne(e, Ie)], { duration: d, easing: c })),
                    (this._animation.onfinish = this._onFinish),
                    Re(n, e)
            }
        }
    }),
        (Ce.prototype.stop = function () {
            !this._isDestroyed &&
                this._animation &&
                (this._animation.cancel(),
                (this._animation = this._callback = null),
                (this._props.length = this._values.length = 0))
        }),
        (Ce.prototype.getCurrentStyles = function () {
            return xe(element, currentProps)
        }),
        (Ce.prototype.isAnimating = function () {
            return !!this._animation
        }),
        (Ce.prototype.destroy = function () {
            this._isDestroyed || (this.stop(), (this._element = null), (this._isDestroyed = !0))
        }),
        (Ce.prototype._onFinish = function () {
            var t = this._callback
            ;(this._animation = this._callback = null), (this._props.length = this._values.length = 0), t && t()
        }),
        (Xe.prototype._updateDimensions = function () {
            this.isActive() && Re(this._element, { width: this._item._width + 'px', height: this._item._height + 'px' })
        }),
        (Xe.prototype._onLayoutStart = function (t, e) {
            var i = this._item
            if (-1 !== t.indexOf(i)) {
                var n = i._left,
                    r = i._top,
                    s = this._left,
                    o = this._top
                if (((this._left = n), (this._top = r), e || this._didMigrate || s !== n || o !== r)) {
                    var a,
                        h,
                        l,
                        u = n + i._marginLeft,
                        d = r + i._marginTop,
                        c = i.getGrid()
                    if (!(!e && c._settings.layoutDuration > 0) || this._didMigrate)
                        return (
                            lt(i._id),
                            (this._element.style[Qt] = Oe(u, d)),
                            this._animation.stop(),
                            void (
                                this._didMigrate && (c.getElement().appendChild(this._element), (this._didMigrate = !1))
                            )
                        )
                    ;(this._nextTransX = u),
                        (this._nextTransY = d),
                        (a = i._id),
                        (h = this._setupAnimation),
                        (l = this._startAnimation),
                        it.add(0, K + a, h),
                        it.add(2, $ + a, l)
                }
            } else this.reset()
        }),
        (Xe.prototype._setupAnimation = function () {
            if (this.isActive()) {
                var t = me(this._element)
                ;(this._transX = t.x), (this._transY = t.y)
            }
        }),
        (Xe.prototype._startAnimation = function () {
            if (this.isActive()) {
                var t = this._animation,
                    e = this._transX,
                    i = this._transY,
                    n = this._nextTransX,
                    r = this._nextTransY
                if (e !== n || i !== r) {
                    var s = this._item.getGrid()._settings,
                        o = {},
                        a = {}
                    ;(o[Qt] = Oe(e, i)),
                        (a[Qt] = Oe(n, r)),
                        t.start(o, a, {
                            duration: s.layoutDuration,
                            easing: s.layoutEasing,
                            onFinish: this._onLayoutEnd,
                        })
                } else t.isAnimating() && ((this._element.style[Qt] = Oe(n, r)), t.stop())
            }
        }),
        (Xe.prototype._onLayoutEnd = function () {
            this._resetAfterLayout && this.reset()
        }),
        (Xe.prototype._onReleaseEnd = function (t) {
            if (t._id === this._item._id) {
                if (!this._animation.isAnimating()) return void this.reset()
                this._resetAfterLayout = !0
            }
        }),
        (Xe.prototype._onMigrate = function (t) {
            if (t.item === this._item) {
                var e = this._item.getGrid(),
                    i = t.toGrid
                e.off(m, this._onReleaseEnd),
                    e.off(r, this._onLayoutStart),
                    e.off(_, this._onMigrate),
                    e.off(h, this._onHide),
                    i.on(m, this._onReleaseEnd),
                    i.on(r, this._onLayoutStart),
                    i.on(_, this._onMigrate),
                    i.on(h, this._onHide),
                    (this._didMigrate = !0)
            }
        }),
        (Xe.prototype._onHide = function (t) {
            t.indexOf(this._item) > -1 && this.reset()
        }),
        (Xe.prototype.create = function () {
            if (this.isActive()) this._resetAfterLayout = !1
            else {
                var t,
                    e = this._item,
                    i = e.getGrid(),
                    n = i._settings,
                    s = this._animation
                ;(this._left = e._left),
                    (this._top = e._top),
                    (t = dt(n.dragPlaceholder.createElement)
                        ? n.dragPlaceholder.createElement(e)
                        : document.createElement('div')),
                    (this._element = t),
                    (s._element = t),
                    (this._className = n.itemPlaceholderClass || ''),
                    this._className && Bt(t, this._className),
                    Re(t, {
                        position: 'absolute',
                        left: '0px',
                        top: '0px',
                        width: e._width + 'px',
                        height: e._height + 'px',
                    }),
                    (t.style[Qt] = Oe(e._left + e._marginLeft, e._top + e._marginTop)),
                    i.on(r, this._onLayoutStart),
                    i.on(m, this._onReleaseEnd),
                    i.on(_, this._onMigrate),
                    i.on(h, this._onHide),
                    dt(n.dragPlaceholder.onCreate) && n.dragPlaceholder.onCreate(e, t),
                    i.getElement().appendChild(t)
            }
        }),
        (Xe.prototype.reset = function () {
            if (this.isActive()) {
                var t,
                    e = this._element,
                    i = this._item,
                    n = i.getGrid(),
                    s = n._settings,
                    o = this._animation
                ;(this._resetAfterLayout = !1),
                    lt(i._id),
                    (t = i._id),
                    it.remove(2, Z + t),
                    o.stop(),
                    (o._element = null),
                    n.off(m, this._onReleaseEnd),
                    n.off(r, this._onLayoutStart),
                    n.off(_, this._onMigrate),
                    n.off(h, this._onHide),
                    this._className && (ge(e, this._className), (this._className = '')),
                    e.parentNode.removeChild(e),
                    (this._element = null),
                    dt(s.dragPlaceholder.onRemove) && s.dragPlaceholder.onRemove(i, e)
            }
        }),
        (Xe.prototype.isActive = function () {
            return !!this._element
        }),
        (Xe.prototype.getElement = function () {
            return this._element
        }),
        (Xe.prototype.updateDimensions = function () {
            var t, e
            this.isActive() && ((t = this._item._id), (e = this._updateDimensions), it.add(2, Z + t, e))
        }),
        (Xe.prototype.destroy = function () {
            this.reset(), this._animation.destroy(), (this._item = this._animation = null)
        }),
        (Ye.prototype.start = function () {
            if (!this._isDestroyed && !this._isActive) {
                var t = this._item,
                    e = t.getGrid(),
                    i = e._settings
                ;(this._isActive = !0),
                    Bt(t._element, i.itemReleasingClass),
                    i.dragRelease.useDragContainer || this._placeToGrid(),
                    e._emit('dragReleaseStart', t),
                    e._nextLayoutData || t._layout.start(!1)
            }
        }),
        (Ye.prototype.stop = function (t, e, i) {
            if (!this._isDestroyed && this._isActive) {
                var n = this._item,
                    r = n.getGrid()
                t || (void 0 !== e && void 0 !== i) || ((e = n._left), (i = n._top))
                var s = this._placeToGrid(e, i)
                this._reset(s), t || r._emit(m, n)
            }
        }),
        (Ye.prototype.isJustReleased = function () {
            return this._isActive && !1 === this._isPositioningStarted
        }),
        (Ye.prototype.destroy = function () {
            this._isDestroyed || (this.stop(!0), (this._item = null), (this._isDestroyed = !0))
        }),
        (Ye.prototype._placeToGrid = function (t, e) {
            if (!this._isDestroyed) {
                var i = this._item,
                    n = i._element,
                    r = i.getGrid()._element,
                    s = !1
                if (n.parentNode !== r) {
                    if (void 0 === t || void 0 === e) {
                        var o = me(n)
                        ;(t = o.x - this._containerDiffX), (e = o.y - this._containerDiffY)
                    }
                    r.appendChild(n), i._setTranslate(t, e), (s = !0)
                }
                return (this._containerDiffX = 0), (this._containerDiffY = 0), s
            }
        }),
        (Ye.prototype._reset = function (t) {
            if (!this._isDestroyed) {
                var e = this._item,
                    i = e.getGrid()._settings.itemReleasingClass
                ;(this._isActive = !1),
                    (this._isPositioningStarted = !1),
                    (this._containerDiffX = 0),
                    (this._containerDiffY = 0),
                    i && ge(e._element, i)
            }
        })
    function qe(t) {
        var e = t._element,
            i = e.style
        ;(this._item = t),
            (this._isActive = !1),
            (this._isDestroyed = !1),
            (this._isInterrupted = !1),
            (this._currentStyles = {}),
            (this._targetStyles = {}),
            (this._nextLeft = 0),
            (this._nextTop = 0),
            (this._offsetLeft = 0),
            (this._offsetTop = 0),
            (this._skipNextAnimation = !1),
            (this._animOptions = { onFinish: this._finish.bind(this), duration: 0, easing: 0 }),
            (i.left = '0px'),
            (i.top = '0px'),
            t._setTranslate(0, 0),
            (this._animation = new Ce(e)),
            (this._queue = 'layout-' + t._id),
            (this._setupAnimation = this._setupAnimation.bind(this)),
            (this._startAnimation = this._startAnimation.bind(this))
    }
    function He(t) {
        ;(this._item = t),
            (this._isActive = !1),
            (this._isDestroyed = !1),
            (this._container = !1),
            (this._containerDiffX = 0),
            (this._containerDiffY = 0)
    }
    function Fe(t) {
        var e = t._isActive,
            i = t._element,
            n = i.children[0],
            r = t.getGrid()._settings
        if (!n) throw new Error('No valid child element found within item element.')
        ;(this._item = t),
            (this._isDestroyed = !1),
            (this._isHidden = !e),
            (this._isHiding = !1),
            (this._isShowing = !1),
            (this._childElement = n),
            (this._currentStyleProps = []),
            (this._animation = new Ce(n)),
            (this._queue = 'visibility-' + t._id),
            (this._finishShow = this._finishShow.bind(this)),
            (this._finishHide = this._finishHide.bind(this)),
            (i.style.display = e ? '' : 'none'),
            Bt(i, e ? r.itemVisibleClass : r.itemHiddenClass),
            this.setStyles(e ? r.visibleStyles : r.hiddenStyles)
    }
    ;(qe.prototype.start = function (t, e) {
        if (!this._isDestroyed) {
            var i,
                n,
                r,
                s = this._item,
                o = s._dragRelease,
                a = s.getGrid()._settings,
                h = this._isActive,
                l = o.isJustReleased(),
                u = l ? a.dragRelease.duration : a.layoutDuration,
                d = l ? a.dragRelease.easing : a.layoutEasing,
                c = !t && !this._skipNextAnimation && u > 0
            if (
                (h && (nt(s._id), s._emitter.burst(this._queue, !0, s)),
                l && (o._isPositioningStarted = !0),
                dt(e) && s._emitter.on(this._queue, e),
                (this._skipNextAnimation = !1),
                !c)
            )
                return (
                    this._updateOffsets(),
                    s._setTranslate(this._nextLeft, this._nextTop),
                    this._animation.stop(),
                    void this._finish()
                )
            this._animation.isAnimating() && (this._animation._animation.onfinish = null),
                (this._isActive = !0),
                (this._animOptions.easing = d),
                (this._animOptions.duration = u),
                (this._isInterrupted = h),
                (i = s._id),
                (n = this._setupAnimation),
                (r = this._startAnimation),
                it.add(0, q + i, n),
                it.add(2, H + i, r)
        }
    }),
        (qe.prototype.stop = function (t, e, i) {
            if (!this._isDestroyed && this._isActive) {
                var n = this._item
                if ((nt(n._id), this._animation.isAnimating())) {
                    if (void 0 === e || void 0 === i) {
                        var r = me(n._element)
                        ;(e = r.x), (i = r.y)
                    }
                    n._setTranslate(e, i), this._animation.stop()
                }
                ge(n._element, n.getGrid()._settings.itemPositioningClass),
                    (this._isActive = !1),
                    t && n._emitter.burst(this._queue, !0, n)
            }
        }),
        (qe.prototype.destroy = function () {
            if (!this._isDestroyed) {
                var t = this._item._element.style
                this.stop(!0, 0, 0),
                    this._item._emitter.clear(this._queue),
                    this._animation.destroy(),
                    (t[Qt] = ''),
                    (t.left = ''),
                    (t.top = ''),
                    (this._item = null),
                    (this._currentStyles = null),
                    (this._targetStyles = null),
                    (this._animOptions = null),
                    (this._isDestroyed = !0)
            }
        }),
        (qe.prototype._updateOffsets = function () {
            if (!this._isDestroyed) {
                var t = this._item,
                    e = t._migrate,
                    i = t._dragRelease
                ;(this._offsetLeft = i._isActive ? i._containerDiffX : e._isActive ? e._containerDiffX : 0),
                    (this._offsetTop = i._isActive ? i._containerDiffY : e._isActive ? e._containerDiffY : 0),
                    (this._nextLeft = this._item._left + this._offsetLeft),
                    (this._nextTop = this._item._top + this._offsetTop)
            }
        }),
        (qe.prototype._finish = function () {
            if (!this._isDestroyed) {
                var t = this._item,
                    e = t._migrate,
                    i = t._dragRelease
                ;(t._tX = this._nextLeft),
                    (t._tY = this._nextTop),
                    this._isActive &&
                        ((this._isActive = !1), ge(t._element, t.getGrid()._settings.itemPositioningClass)),
                    i._isActive && i.stop(),
                    e._isActive && e.stop(),
                    t._emitter.burst(this._queue, !1, t)
            }
        }),
        (qe.prototype._setupAnimation = function () {
            var t = this._item
            if (void 0 === t._tX || void 0 === t._tY) {
                var e = me(t._element)
                ;(t._tX = e.x), (t._tY = e.y)
            }
        }),
        (qe.prototype._startAnimation = function () {
            var t = this._item,
                e = t.getGrid()._settings,
                i = this._animOptions.duration <= 0
            this._updateOffsets()
            var n = Math.abs(t._left - (t._tX - this._offsetLeft)),
                r = Math.abs(t._top - (t._tY - this._offsetTop))
            if (i || (n < 2 && r < 2))
                return (
                    (n || r || this._isInterrupted) && t._setTranslate(this._nextLeft, this._nextTop),
                    this._animation.stop(),
                    void this._finish()
                )
            this._isInterrupted || Bt(t._element, e.itemPositioningClass),
                (this._currentStyles[Qt] = Oe(t._tX, t._tY)),
                (this._targetStyles[Qt] = Oe(this._nextLeft, this._nextTop)),
                (t._tX = t._tY = void 0),
                this._animation.start(this._currentStyles, this._targetStyles, this._animOptions)
        }),
        (He.prototype.start = function (t, e, i) {
            if (!this._isDestroyed) {
                var n,
                    r,
                    s,
                    o,
                    a,
                    h,
                    l,
                    u,
                    d,
                    m,
                    g = this._item,
                    v = g._element,
                    y = g.isActive(),
                    b = g.isVisible(),
                    w = g.getGrid(),
                    S = w._settings,
                    T = t._settings,
                    D = t._element,
                    x = t._items,
                    A = w._items.indexOf(g),
                    k = i || document.body
                if ('number' == typeof e) n = Vt(x, e, 1)
                else {
                    if (!(r = t.getItem(e))) return
                    n = x.indexOf(r)
                }
                ;(g.isPositioning() || this._isActive || g.isReleasing()) && ((l = (h = me(v)).x), (u = h.y)),
                    g.isPositioning() && g._layout.stop(!0, l, u),
                    this._isActive && ((l -= this._containerDiffX), (u -= this._containerDiffY), this.stop(!0, l, u)),
                    g.isReleasing() &&
                        ((l -= g._dragRelease._containerDiffX),
                        (u -= g._dragRelease._containerDiffY),
                        g._dragRelease.stop(!0, l, u)),
                    g._visibility.stop(!0),
                    g._drag && g._drag.destroy(),
                    w._hasListeners(_) && w._emit(_, { item: g, fromGrid: w, fromIndex: A, toGrid: t, toIndex: n }),
                    t._hasListeners(p) && t._emit(p, { item: g, fromGrid: w, fromIndex: A, toGrid: t, toIndex: n }),
                    S.itemClass !== T.itemClass && (ge(v, S.itemClass), Bt(v, T.itemClass)),
                    (d = b ? S.itemVisibleClass : S.itemHiddenClass) !==
                        (m = b ? T.itemVisibleClass : T.itemHiddenClass) && (ge(v, d), Bt(v, m)),
                    w._items.splice(A, 1),
                    zt(x, g, n),
                    (g._gridId = t._id),
                    y
                        ? k !== (s = v.parentNode) &&
                          (k.appendChild(v),
                          (o = ae(k, s, !0)),
                          h || ((l = (h = me(v)).x), (u = h.y)),
                          g._setTranslate(l + o.left, u + o.top))
                        : D.appendChild(v),
                    g._visibility.setStyles(b ? T.visibleStyles : T.hiddenStyles),
                    y && (a = ae(k, D, !0)),
                    g._refreshDimensions(),
                    (g._sortData = null),
                    (g._drag = T.dragEnabled ? new De(g) : null),
                    y
                        ? ((this._isActive = !0),
                          (this._container = k),
                          (this._containerDiffX = a.left),
                          (this._containerDiffY = a.top))
                        : ((this._isActive = !1),
                          (this._container = null),
                          (this._containerDiffX = 0),
                          (this._containerDiffY = 0)),
                    w._hasListeners(c) && w._emit(c, { item: g, fromGrid: w, fromIndex: A, toGrid: t, toIndex: n }),
                    t._hasListeners(f) && t._emit(f, { item: g, fromGrid: w, fromIndex: A, toGrid: t, toIndex: n })
            }
        }),
        (He.prototype.stop = function (t, e, i) {
            if (!this._isDestroyed && this._isActive) {
                var n,
                    r = this._item,
                    s = r._element,
                    o = r.getGrid()._element
                this._container !== o &&
                    ((void 0 !== e && void 0 !== i) ||
                        (t
                            ? ((e = (n = me(s)).x - this._containerDiffX), (i = n.y - this._containerDiffY))
                            : ((e = r._left), (i = r._top))),
                    o.appendChild(s),
                    r._setTranslate(e, i)),
                    (this._isActive = !1),
                    (this._container = null),
                    (this._containerDiffX = 0),
                    (this._containerDiffY = 0)
            }
        }),
        (He.prototype.destroy = function () {
            this._isDestroyed || (this.stop(!0), (this._item = null), (this._isDestroyed = !0))
        }),
        (Fe.prototype.show = function (t, e) {
            if (!this._isDestroyed) {
                var i = this._item,
                    n = i._element,
                    r = dt(e) ? e : null,
                    s = i.getGrid()._settings
                this._isShowing || this._isHidden
                    ? !this._isShowing || t
                        ? (this._isShowing ||
                              (i._emitter.burst(this._queue, !0, i),
                              ge(n, s.itemHiddenClass),
                              Bt(n, s.itemVisibleClass),
                              this._isHiding || (n.style.display = '')),
                          r && i._emitter.on(this._queue, r),
                          (this._isShowing = !0),
                          (this._isHiding = this._isHidden = !1),
                          this._startAnimation(!0, t, this._finishShow))
                        : r && i._emitter.on(this._queue, r)
                    : r && r(!1, i)
            }
        }),
        (Fe.prototype.hide = function (t, e) {
            if (!this._isDestroyed) {
                var i = this._item,
                    n = i._element,
                    r = dt(e) ? e : null,
                    s = i.getGrid()._settings
                this._isHiding || !this._isHidden
                    ? !this._isHiding || t
                        ? (this._isHiding ||
                              (i._emitter.burst(this._queue, !0, i),
                              Bt(n, s.itemHiddenClass),
                              ge(n, s.itemVisibleClass)),
                          r && i._emitter.on(this._queue, r),
                          (this._isHidden = this._isHiding = !0),
                          (this._isShowing = !1),
                          this._startAnimation(!1, t, this._finishHide))
                        : r && i._emitter.on(this._queue, r)
                    : r && r(!1, i)
            }
        }),
        (Fe.prototype.stop = function (t) {
            if (!this._isDestroyed && (this._isHiding || this._isShowing)) {
                var e = this._item
                rt(e._id), this._animation.stop(), t && e._emitter.burst(this._queue, !0, e)
            }
        }),
        (Fe.prototype.setStyles = function (t) {
            var e = this._childElement,
                i = this._currentStyleProps
            for (var n in (this._removeCurrentStyles(), t)) i.push(n), (e.style[n] = t[n])
        }),
        (Fe.prototype.destroy = function () {
            if (!this._isDestroyed) {
                var t = this._item,
                    e = t._element,
                    i = t.getGrid()._settings
                this.stop(!0),
                    t._emitter.clear(this._queue),
                    this._animation.destroy(),
                    this._removeCurrentStyles(),
                    ge(e, i.itemVisibleClass),
                    ge(e, i.itemHiddenClass),
                    (e.style.display = ''),
                    (this._isHiding = this._isShowing = !1),
                    (this._isDestroyed = this._isHidden = !0)
            }
        }),
        (Fe.prototype._startAnimation = function (t, e, i) {
            if (!this._isDestroyed) {
                var n,
                    r = this._item,
                    s = this._animation,
                    o = this._childElement,
                    a = r.getGrid()._settings,
                    h = t ? a.visibleStyles : a.hiddenStyles,
                    l = t ? a.showDuration : a.hideDuration,
                    u = t ? a.showEasing : a.hideEasing,
                    d = e || l <= 0
                if (h) {
                    if ((rt(r._id), d)) return Re(o, h), s.stop(), void (i && i())
                    var c, _, f
                    s.isAnimating() && (s._animation.onfinish = null),
                        (c = r._id),
                        (_ = function () {
                            n = xe(o, h)
                        }),
                        (f = function () {
                            s.start(n, h, { duration: l, easing: u, onFinish: i })
                        }),
                        it.add(0, F + c, _),
                        it.add(2, W + c, f)
                } else i && i()
            }
        }),
        (Fe.prototype._finishShow = function () {
            this._isHidden || ((this._isShowing = !1), this._item._emitter.burst(this._queue, !1, this._item))
        }),
        (Fe.prototype._finishHide = function () {
            if (this._isHidden) {
                var t = this._item
                ;(this._isHiding = !1),
                    t._layout.stop(!0, 0, 0),
                    (t._element.style.display = 'none'),
                    t._emitter.burst(this._queue, !1, t)
            }
        }),
        (Fe.prototype._removeCurrentStyles = function () {
            for (var t = this._childElement, e = this._currentStyleProps, i = 0; i < e.length; i++) t.style[e[i]] = ''
            e.length = 0
        })
    var We = 0
    function Be() {
        return ++We
    }
    function Ge(t, i, n) {
        var r = t._settings
        if (e) {
            if (e.has(i)) throw new Error('You can only create one Muuri Item per element!')
            e.set(i, this)
        }
        ;(this._id = Be()),
            (this._gridId = t._id),
            (this._element = i),
            (this._isDestroyed = !1),
            (this._left = 0),
            (this._top = 0),
            (this._width = 0),
            (this._height = 0),
            (this._marginLeft = 0),
            (this._marginRight = 0),
            (this._marginTop = 0),
            (this._marginBottom = 0),
            (this._tX = void 0),
            (this._tY = void 0),
            (this._sortData = null),
            (this._emitter = new b()),
            i.parentNode !== t._element && t._element.appendChild(i),
            Bt(i, r.itemClass),
            'boolean' != typeof n && (n = 'none' !== gt(i, 'display')),
            (this._isActive = n),
            (this._visibility = new Fe(this)),
            (this._layout = new qe(this)),
            (this._migrate = new He(this)),
            (this._drag = r.dragEnabled ? new De(this) : null),
            (this._dragRelease = new Ye(this)),
            (this._dragPlaceholder = new Xe(this))
    }
    function ze(t) {
        var e,
            i,
            n,
            r,
            s,
            o = 0.001,
            a = 0.5
        function h(t) {
            return ((((1e3 * t + 0.5) << 0) / 10) << 0) / 100
        }
        function l() {
            ;(this.currentRects = []),
                (this.nextRects = []),
                (this.rectTarget = {}),
                (this.rectStore = []),
                (this.slotSizes = []),
                (this.rectId = 0),
                (this.slotIndex = -1),
                (this.slotData = { left: 0, top: 0, width: 0, height: 0 }),
                (this.sortRectsLeftTop = this.sortRectsLeftTop.bind(this)),
                (this.sortRectsTopLeft = this.sortRectsTopLeft.bind(this))
        }
        if (
            ((l.prototype.computeLayout = function (t, e) {
                var i,
                    n,
                    r,
                    s,
                    o,
                    a,
                    l = t.items,
                    u = t.slots,
                    d = !!(1 & e),
                    c = !!(2 & e),
                    _ = !!(4 & e),
                    f = !!(8 & e),
                    p = !!(16 & e),
                    m = 'number' == typeof l[0]
                if (!l.length) return t
                for (n = m ? 2 : 1, i = 0; i < l.length; i += n)
                    m
                        ? ((s = l[i]), (o = l[i + 1]))
                        : ((s = (r = l[i])._width + r._marginLeft + r._marginRight),
                          (o = r._height + r._marginTop + r._marginBottom)),
                        p && ((s = h(s)), (o = h(o))),
                        (a = this.computeNextSlot(t, s, o, d, c)),
                        c
                            ? a.left + a.width > t.width && (t.width = a.left + a.width)
                            : a.top + a.height > t.height && (t.height = a.top + a.height),
                        (u[++this.slotIndex] = a.left),
                        (u[++this.slotIndex] = a.top),
                        (_ || f) && this.slotSizes.push(a.width, a.height)
                if (_) for (i = 0; i < u.length; i += 2) u[i] = t.width - (u[i] + this.slotSizes[i])
                if (f) for (i = 1; i < u.length; i += 2) u[i] = t.height - (u[i] + this.slotSizes[i])
                return (
                    (this.slotSizes.length = 0),
                    (this.currentRects.length = 0),
                    (this.nextRects.length = 0),
                    (this.rectId = 0),
                    (this.slotIndex = -1),
                    t
                )
            }),
            (l.prototype.computeNextSlot = function (t, e, i, n, r) {
                var s,
                    h,
                    l,
                    u,
                    d,
                    c = this.slotData,
                    _ = this.currentRects,
                    f = this.nextRects,
                    p = !1
                for (f.length = 0, c.left = null, c.top = null, c.width = e, c.height = i, u = 0; u < _.length; u++)
                    if ((h = _[u]) && ((s = this.getRect(h)), c.width <= s.width + o && c.height <= s.height + o)) {
                        ;(c.left = s.left), (c.top = s.top)
                        break
                    }
                if (
                    (null === c.left &&
                        (r ? ((c.left = t.width), (c.top = 0)) : ((c.left = 0), (c.top = t.height)), n || (p = !0)),
                    !r &&
                        c.top + c.height > t.height + o &&
                        (c.left > a && f.push(this.addRect(0, t.height, c.left, 1 / 0)),
                        c.left + c.width < t.width - a &&
                            f.push(this.addRect(c.left + c.width, t.height, t.width - c.left - c.width, 1 / 0)),
                        (t.height = c.top + c.height)),
                    r &&
                        c.left + c.width > t.width + o &&
                        (c.top > a && f.push(this.addRect(t.width, 0, 1 / 0, c.top)),
                        c.top + c.height < t.height - a &&
                            f.push(this.addRect(t.width, c.top + c.height, 1 / 0, t.height - c.top - c.height)),
                        (t.width = c.left + c.width)),
                    !p)
                )
                    for (n && (u = 0); u < _.length; u++)
                        if ((h = _[u]))
                            for (s = this.getRect(h), l = this.splitRect(s, c), d = 0; d < l.length; d++)
                                (h = l[d]),
                                    (s = this.getRect(h)),
                                    (r ? s.left + o < t.width - o : s.top + o < t.height - o) && f.push(h)
                return (
                    f.length > 1 && this.purgeRects(f).sort(r ? this.sortRectsLeftTop : this.sortRectsTopLeft),
                    (this.currentRects = f),
                    (this.nextRects = _),
                    c
                )
            }),
            (l.prototype.addRect = function (t, e, i, n) {
                var r = ++this.rectId
                return (
                    (this.rectStore[r] = t || 0),
                    (this.rectStore[++this.rectId] = e || 0),
                    (this.rectStore[++this.rectId] = i || 0),
                    (this.rectStore[++this.rectId] = n || 0),
                    r
                )
            }),
            (l.prototype.getRect = function (t, e) {
                return (
                    e || (e = this.rectTarget),
                    (e.left = this.rectStore[t] || 0),
                    (e.top = this.rectStore[++t] || 0),
                    (e.width = this.rectStore[++t] || 0),
                    (e.height = this.rectStore[++t] || 0),
                    e
                )
            }),
            (l.prototype.splitRect =
                ((e = []),
                (i = 0),
                (n = 0),
                function (t, r) {
                    return (
                        (e.length = 0),
                        t.left + t.width <= r.left + o ||
                        r.left + r.width <= t.left + o ||
                        t.top + t.height <= r.top + o ||
                        r.top + r.height <= t.top + o
                            ? (e.push(this.addRect(t.left, t.top, t.width, t.height)), e)
                            : ((i = r.left - t.left) >= a && e.push(this.addRect(t.left, t.top, i, t.height)),
                              (i = t.left + t.width - (r.left + r.width)) >= a &&
                                  e.push(this.addRect(r.left + r.width, t.top, i, t.height)),
                              (n = r.top - t.top) >= a && e.push(this.addRect(t.left, t.top, t.width, n)),
                              (n = t.top + t.height - (r.top + r.height)) >= a &&
                                  e.push(this.addRect(t.left, r.top + r.height, t.width, n)),
                              e)
                    )
                })),
            (l.prototype.isRectAWithinRectB = function (t, e) {
                return (
                    t.left + o >= e.left &&
                    t.top + o >= e.top &&
                    t.left + t.width - o <= e.left + e.width &&
                    t.top + t.height - o <= e.top + e.height
                )
            }),
            (l.prototype.purgeRects =
                ((r = {}),
                (s = {}),
                function (t) {
                    for (var e, i = t.length; i--; )
                        if (((e = t.length), t[i]))
                            for (this.getRect(t[i], r); e--; )
                                if (t[e] && i !== e && (this.getRect(t[e], s), this.isRectAWithinRectB(r, s))) {
                                    t[i] = 0
                                    break
                                }
                    return t
                })),
            (l.prototype.sortRectsTopLeft = (function () {
                var t = {},
                    e = {}
                return function (i, n) {
                    return (
                        this.getRect(i, t),
                        this.getRect(n, e),
                        t.top < e.top && t.top + o < e.top
                            ? -1
                            : t.top > e.top && t.top - o > e.top
                            ? 1
                            : t.left < e.left && t.left + o < e.left
                            ? -1
                            : t.left > e.left && t.left - o > e.left
                            ? 1
                            : 0
                    )
                }
            })()),
            (l.prototype.sortRectsLeftTop = (function () {
                var t = {},
                    e = {}
                return function (i, n) {
                    return (
                        this.getRect(i, t),
                        this.getRect(n, e),
                        t.left < e.left && t.left + o < e.left
                            ? -1
                            : t.left > e.left && t.left - o < e.left
                            ? 1
                            : t.top < e.top && t.top + o < e.top
                            ? -1
                            : t.top > e.top && t.top - o > e.top
                            ? 1
                            : 0
                    )
                }
            })()),
            t)
        ) {
            var u = new l()
            self.onmessage = function (t) {
                var e = new Float32Array(t.data),
                    i = e.subarray(4, e.length),
                    n = new Float32Array(i.length),
                    r = e[3],
                    s = { items: i, slots: n, width: e[1], height: e[2] }
                u.computeLayout(s, r),
                    (e[1] = s.width),
                    (e[2] = s.height),
                    e.set(s.slots, 4),
                    postMessage(e.buffer, [e.buffer])
            }
        }
        return l
    }
    ;(Ge.prototype.getGrid = function () {
        return t[this._gridId]
    }),
        (Ge.prototype.getElement = function () {
            return this._element
        }),
        (Ge.prototype.getWidth = function () {
            return this._width
        }),
        (Ge.prototype.getHeight = function () {
            return this._height
        }),
        (Ge.prototype.getMargin = function () {
            return {
                left: this._marginLeft,
                right: this._marginRight,
                top: this._marginTop,
                bottom: this._marginBottom,
            }
        }),
        (Ge.prototype.getPosition = function () {
            return { left: this._left, top: this._top }
        }),
        (Ge.prototype.isActive = function () {
            return this._isActive
        }),
        (Ge.prototype.isVisible = function () {
            return !!this._visibility && !this._visibility._isHidden
        }),
        (Ge.prototype.isShowing = function () {
            return !(!this._visibility || !this._visibility._isShowing)
        }),
        (Ge.prototype.isHiding = function () {
            return !(!this._visibility || !this._visibility._isHiding)
        }),
        (Ge.prototype.isPositioning = function () {
            return !(!this._layout || !this._layout._isActive)
        }),
        (Ge.prototype.isDragging = function () {
            return !(!this._drag || !this._drag._isActive)
        }),
        (Ge.prototype.isReleasing = function () {
            return !(!this._dragRelease || !this._dragRelease._isActive)
        }),
        (Ge.prototype.isDestroyed = function () {
            return this._isDestroyed
        }),
        (Ge.prototype._refreshDimensions = function (t) {
            if (!(this._isDestroyed || (!0 !== t && this._visibility._isHidden))) {
                var e = this._element,
                    i = this._dragPlaceholder,
                    n = e.getBoundingClientRect()
                ;(this._width = n.width),
                    (this._height = n.height),
                    (this._marginLeft = Math.max(0, vt(e, 'margin-left'))),
                    (this._marginRight = Math.max(0, vt(e, 'margin-right'))),
                    (this._marginTop = Math.max(0, vt(e, 'margin-top'))),
                    (this._marginBottom = Math.max(0, vt(e, 'margin-bottom'))),
                    i && i.updateDimensions()
            }
        }),
        (Ge.prototype._refreshSortData = function () {
            if (!this._isDestroyed) {
                var t,
                    e = (this._sortData = {}),
                    i = this.getGrid()._settings.sortData
                for (t in i) e[t] = i[t](this, this._element)
            }
        }),
        (Ge.prototype._addToLayout = function (t, e) {
            !0 !== this._isActive && ((this._isActive = !0), (this._left = t || 0), (this._top = e || 0))
        }),
        (Ge.prototype._removeFromLayout = function () {
            !1 !== this._isActive && ((this._isActive = !1), (this._left = 0), (this._top = 0))
        }),
        (Ge.prototype._canSkipLayout = function (t, e) {
            return (
                this._left === t &&
                this._top === e &&
                !this._migrate._isActive &&
                !this._layout._skipNextAnimation &&
                !this._dragRelease.isJustReleased()
            )
        }),
        (Ge.prototype._setTranslate = function (t, e) {
            return (
                (this._tX !== t || this._tY !== e) &&
                ((this._tX = t), (this._tY = e), (this._element.style[Qt] = Oe(t, e)), !0)
            )
        }),
        (Ge.prototype._destroy = function (t) {
            if (!this._isDestroyed) {
                var i = this._element,
                    n = this.getGrid()._settings
                this._dragPlaceholder.destroy(),
                    this._dragRelease.destroy(),
                    this._migrate.destroy(),
                    this._layout.destroy(),
                    this._visibility.destroy(),
                    this._drag && this._drag.destroy(),
                    this._emitter.destroy(),
                    ge(i, n.itemClass),
                    t && i.parentNode.removeChild(i),
                    e && e.delete(i),
                    (this._isActive = !1),
                    (this._isDestroyed = !0)
            }
        })
    var Ve = ze(),
        je = null,
        Ue = []
    function Qe(t, e) {
        if (
            ((this._options = 0),
            (this._processor = null),
            (this._layoutQueue = []),
            (this._layouts = {}),
            (this._layoutCallbacks = {}),
            (this._layoutWorkers = {}),
            (this._layoutWorkerData = {}),
            (this._workers = []),
            (this._onWorkerMessage = this._onWorkerMessage.bind(this)),
            this.setOptions(e),
            (t = 'number' == typeof t ? Math.max(0, t) : 0) && window.Worker && window.URL && window.Blob)
        )
            try {
                this._workers = (function (t, e) {
                    var i = []
                    if (t > 0) {
                        je ||
                            (je = URL.createObjectURL(
                                new Blob(['(' + ze.toString() + ')(true)'], { type: 'application/javascript' }),
                            ))
                        for (var n, r = 0; r < t; r++)
                            (n = new Worker(je)), e && (n.onmessage = e), i.push(n), Ue.push(n)
                    }
                    return i
                })(t, this._onWorkerMessage)
            } catch (t) {
                this._processor = new Ve()
            }
        else this._processor = new Ve()
    }
    ;(Qe.prototype._sendToWorker = function () {
        if (this._layoutQueue.length && this._workers.length) {
            var t = this._layoutQueue.shift(),
                e = this._workers.pop(),
                i = this._layoutWorkerData[t]
            delete this._layoutWorkerData[t], (this._layoutWorkers[t] = e), e.postMessage(i.buffer, [i.buffer])
        }
    }),
        (Qe.prototype._onWorkerMessage = function (t) {
            var e = new Float32Array(t.data),
                i = e[0],
                n = this._layouts[i],
                r = this._layoutCallbacks[i],
                s = this._layoutWorkers[i]
            n && delete this._layoutCallbacks[i],
                r && delete this._layoutCallbacks[i],
                s && delete this._layoutWorkers[i],
                n &&
                    r &&
                    ((n.width = e[1]),
                    (n.height = e[2]),
                    (n.slots = e.subarray(4, e.length)),
                    this._finalizeLayout(n),
                    r(n)),
                s && (this._workers.push(s), this._sendToWorker())
        }),
        (Qe.prototype._finalizeLayout = function (t) {
            var e = t._grid,
                i = 2 & t._settings,
                n = 'border-box' === e._boxSizing
            return (
                delete t._grid,
                delete t._settings,
                (t.styles = {}),
                i
                    ? (t.styles.width = (n ? t.width + e._borderLeft + e._borderRight : t.width) + 'px')
                    : (t.styles.height = (n ? t.height + e._borderTop + e._borderBottom : t.height) + 'px'),
                t
            )
        }),
        (Qe.prototype.setOptions = function (t) {
            var e, i, n, r, s
            t &&
                ((e = 'boolean' == typeof t.fillGaps ? (t.fillGaps ? 1 : 0) : 1 & this._options),
                (i = 'boolean' == typeof t.horizontal ? (t.horizontal ? 2 : 0) : 2 & this._options),
                (n = 'boolean' == typeof t.alignRight ? (t.alignRight ? 4 : 0) : 4 & this._options),
                (r = 'boolean' == typeof t.alignBottom ? (t.alignBottom ? 8 : 0) : 8 & this._options),
                (s = 'boolean' == typeof t.rounding ? (t.rounding ? 16 : 0) : 16 & this._options),
                (this._options = e | i | n | r | s))
        }),
        (Qe.prototype.createLayout = function (t, e, i, n, r, s) {
            if (this._layouts[e]) throw new Error('A layout with the provided id is currently being processed.')
            var o = 2 & this._options,
                a = {
                    id: e,
                    items: i,
                    slots: null,
                    width: o ? 0 : n,
                    height: o ? r : 0,
                    _grid: t,
                    _settings: this._options,
                }
            if (!i.length) return (a.slots = []), this._finalizeLayout(a), void s(a)
            if (this._processor)
                return (
                    (a.slots = window.Float32Array ? new Float32Array(2 * i.length) : new Array(2 * i.length)),
                    this._processor.computeLayout(a, a._settings),
                    this._finalizeLayout(a),
                    void s(a)
                )
            var h,
                l,
                u,
                d = new Float32Array(4 + 2 * i.length)
            for (d[0] = e, d[1] = a.width, d[2] = a.height, d[3] = a._settings, h = 0, l = 3; h < i.length; h++)
                (u = i[h]),
                    (d[++l] = u._width + u._marginLeft + u._marginRight),
                    (d[++l] = u._height + u._marginTop + u._marginBottom)
            return (
                this._layoutQueue.push(e),
                (this._layouts[e] = a),
                (this._layoutCallbacks[e] = s),
                (this._layoutWorkerData[e] = d),
                this._sendToWorker(),
                this.cancelLayout.bind(this, e)
            )
        }),
        (Qe.prototype.cancelLayout = function (t) {
            if (
                this._layouts[t] &&
                (delete this._layouts[t], delete this._layoutCallbacks[t], this._layoutWorkerData[t])
            ) {
                delete this._layoutWorkerData[t]
                var e = this._layoutQueue.indexOf(t)
                e > -1 && this._layoutQueue.splice(e, 1)
            }
        }),
        (Qe.prototype.destroy = function () {
            for (var t in this._layoutWorkers) this._workers.push(this._layoutWorkers[t])
            !(function (t) {
                for (var e, i, n = 0; n < t.length; n++)
                    ((e = t[n]).onmessage = null),
                        (e.onerror = null),
                        (e.onmessageerror = null),
                        e.terminate(),
                        (i = Ue.indexOf(e)) > -1 && Ue.splice(i, 1)
                je && !Ue.length && (URL.revokeObjectURL(je), (je = null))
            })(this._workers),
                (this._workers.length = 0),
                (this._layoutQueue.length = 0),
                (this._layouts = {}),
                (this._layoutCallbacks = {}),
                (this._layoutWorkers = {}),
                (this._layoutWorkerData = {})
        })
    var Ke = 0
    function $e(t, e) {
        var i = ++Ke,
            n = 0,
            r = 0,
            s = !1,
            o = function (e) {
                s ||
                    (r && (n -= e - r),
                    (r = e),
                    n > 0
                        ? (function (t, e) {
                              it.add(0, et + t, e)
                          })(i, o)
                        : ((n = r = 0), t()))
            }
        return function (a) {
            if (!s) {
                if (!(e <= 0))
                    return !0 === a
                        ? ((s = !0),
                          (n = r = 0),
                          (o = void 0),
                          void (function (t) {
                              it.remove(0, et + t)
                          })(i))
                        : void (n <= 0 ? ((n = e), o(0)) : (n = e))
                !0 !== a && t()
            }
        }
    }
    function Ze(t) {
        var e = Object.prototype.toString.call(t)
        return '[object HTMLCollection]' === e || '[object NodeList]' === e
    }
    var Je = Object.prototype.toString
    function ti(t) {
        return 'object' == typeof t && '[object Object]' === Je.call(t)
    }
    function ei() {}
    var ii,
        ni,
        ri,
        si = 'number',
        oi = 'string',
        ai = 'instant',
        hi = 0
    function li(e, i) {
        if (
            (typeof e === oi && (e = document.querySelector(e)),
            !(e.getRootNode ? e.getRootNode({ composed: !0 }) === document : document.body.contains(e)) ||
                e === document.documentElement)
        )
            throw new Error('Container element must be an existing DOM element.')
        var n = (function (t, e) {
            var i = ui({}, t)
            e && (i = ui(i, e))
            e && e.visibleStyles
                ? (i.visibleStyles = e.visibleStyles)
                : t && t.visibleStyles && (i.visibleStyles = t.visibleStyles)
            e && e.hiddenStyles
                ? (i.hiddenStyles = e.hiddenStyles)
                : t && t.hiddenStyles && (i.hiddenStyles = t.hiddenStyles)
            return i
        })(li.defaultOptions, i)
        ;(n.visibleStyles = di(n.visibleStyles)),
            (n.hiddenStyles = di(n.hiddenStyles)),
            dt(n.dragSort) || (n.dragSort = !!n.dragSort),
            (this._id = Be()),
            (this._element = e),
            (this._settings = n),
            (this._isDestroyed = !1),
            (this._items = []),
            (this._layout = { id: 0, items: [], slots: [] }),
            (this._isLayoutFinished = !0),
            (this._nextLayoutData = null),
            (this._emitter = new b()),
            (this._onLayoutDataReceived = this._onLayoutDataReceived.bind(this)),
            (t[this._id] = this),
            Bt(e, n.containerClass),
            (function (t, e) {
                typeof e !== si && (e = !0 === e ? 0 : -1)
                e >= 0 &&
                    ((t._resizeHandler = $e(function () {
                        t.refreshItems().layout()
                    }, e)),
                    window.addEventListener('resize', t._resizeHandler))
            })(this, n.layoutOnResize),
            this.add(
                (function (t, e) {
                    if ('*' === e) return t.children
                    if (typeof e === oi) {
                        for (var i = [], n = t.children, r = 0; r < n.length; r++) Wt(n[r], e) && i.push(n[r])
                        return i
                    }
                    if (Array.isArray(e) || Ze(e)) return e
                    return []
                })(e, n.items),
                { layout: !1 },
            ),
            n.layoutOnInit && this.layout(!0)
    }
    function ui(t, e) {
        var i,
            n,
            r,
            s = Object.keys(e),
            o = s.length
        for (r = 0; r < o; r++)
            (i = ti(e[(n = s[r])])),
                ti(t[n]) && i
                    ? (t[n] = ui(ui({}, t[n]), e[n]))
                    : i
                    ? (t[n] = ui({}, e[n]))
                    : Array.isArray(e[n])
                    ? (t[n] = e[n].slice(0))
                    : (t[n] = e[n])
        return t
    }
    function di(t) {
        var e,
            i,
            n = {},
            r = document.documentElement.style
        for (e in t) t[e] && (i = x(r, e)) && (n[i] = t[e])
        return n
    }
    function ci(t) {
        for (var e = {}, i = 0; i < t.length; i++) e[t[i]._id] = i
        return e
    }
    function _i(t, e, i) {
        return t[e._id] - t[i._id]
    }
    ;(li.Item = Ge),
        (li.ItemLayout = qe),
        (li.ItemVisibility = Fe),
        (li.ItemMigrate = He),
        (li.ItemDrag = De),
        (li.ItemDragRelease = Ye),
        (li.ItemDragPlaceholder = Xe),
        (li.Emitter = b),
        (li.Animator = Ce),
        (li.Dragger = N),
        (li.Packer = Qe),
        (li.AutoScroller = qt),
        (li.defaultPacker = new Qe(2)),
        (li.defaultOptions = {
            items: '*',
            showDuration: 300,
            showEasing: 'ease',
            hideDuration: 300,
            hideEasing: 'ease',
            visibleStyles: { opacity: '1', transform: 'scale(1)' },
            hiddenStyles: { opacity: '0', transform: 'scale(0.5)' },
            layout: { fillGaps: !1, horizontal: !1, alignRight: !1, alignBottom: !1, rounding: !1 },
            layoutOnResize: 150,
            layoutOnInit: !0,
            layoutDuration: 300,
            layoutEasing: 'ease',
            sortData: null,
            dragEnabled: !1,
            dragContainer: null,
            dragHandle: null,
            dragStartPredicate: { distance: 0, delay: 0 },
            dragAxis: 'xy',
            dragSort: !0,
            dragSortHeuristics: { sortInterval: 100, minDragDistance: 10, minBounceBackAngle: 1 },
            dragSortPredicate: { threshold: 50, action: n, migrateAction: n },
            dragRelease: { duration: 300, easing: 'ease', useDragContainer: !0 },
            dragCssProps: {
                touchAction: 'none',
                userSelect: 'none',
                userDrag: 'none',
                tapHighlightColor: 'rgba(0, 0, 0, 0)',
                touchCallout: 'none',
                contentZooming: 'none',
            },
            dragPlaceholder: { enabled: !1, createElement: null, onCreate: null, onRemove: null },
            dragAutoScroll: {
                targets: [],
                handle: null,
                threshold: 50,
                safeZone: 0.2,
                speed: qt.smoothSpeed(1e3, 2e3, 2500),
                sortDuringScroll: !0,
                smoothStop: !1,
                onStart: null,
                onStop: null,
            },
            containerClass: 'muuri',
            itemClass: 'muuri-item',
            itemVisibleClass: 'muuri-item-shown',
            itemHiddenClass: 'muuri-item-hidden',
            itemPositioningClass: 'muuri-item-positioning',
            itemDraggingClass: 'muuri-item-dragging',
            itemReleasingClass: 'muuri-item-releasing',
            itemPlaceholderClass: 'muuri-item-placeholder',
        }),
        (li.prototype.on = function (t, e) {
            return this._emitter.on(t, e), this
        }),
        (li.prototype.off = function (t, e) {
            return this._emitter.off(t, e), this
        }),
        (li.prototype.getElement = function () {
            return this._element
        }),
        (li.prototype.getItem = function (t) {
            if (this._isDestroyed || (!t && 0 !== t)) return null
            if (typeof t === si) return this._items[t > -1 ? t : this._items.length + t] || null
            if (t instanceof Ge) return t._gridId === this._id ? t : null
            if (e) {
                var i = e.get(t)
                return i && i._gridId === this._id ? i : null
            }
            for (var n = 0; n < this._items.length; n++) if (this._items[n]._element === t) return this._items[n]
            return null
        }),
        (li.prototype.getItems = function (t) {
            if (this._isDestroyed || void 0 === t) return this._items.slice(0)
            var e,
                i,
                n = []
            if (Array.isArray(t) || Ze(t)) for (e = 0; e < t.length; e++) (i = this.getItem(t[e])) && n.push(i)
            else (i = this.getItem(t)) && n.push(i)
            return n
        }),
        (li.prototype.refreshItems = function (t, e) {
            if (this._isDestroyed) return this
            var i,
                n,
                r,
                s,
                o = t || this._items
            if (!0 === e)
                for (s = [], i = 0; i < o.length; i++)
                    (n = o[i]).isVisible() ||
                        n.isHiding() ||
                        (((r = n.getElement().style).visibility = 'hidden'), (r.display = ''), s.push(r))
            for (i = 0; i < o.length; i++) o[i]._refreshDimensions(e)
            if (!0 === e) {
                for (i = 0; i < s.length; i++) ((r = s[i]).visibility = ''), (r.display = 'none')
                s.length = 0
            }
            return this
        }),
        (li.prototype.refreshSortData = function (t) {
            if (this._isDestroyed) return this
            for (var e = t || this._items, i = 0; i < e.length; i++) e[i]._refreshSortData()
            return this
        }),
        (li.prototype.synchronize = function () {
            if (this._isDestroyed) return this
            var t,
                e,
                i = this._items
            if (!i.length) return this
            for (var n = 0; n < i.length; n++)
                (e = i[n]._element).parentNode === this._element &&
                    (t = t || document.createDocumentFragment()).appendChild(e)
            return t ? (this._element.appendChild(t), this._emit('synchronize'), this) : this
        }),
        (li.prototype.layout = function (t, e) {
            if (this._isDestroyed) return this
            var i = this._nextLayoutData
            i && dt(i.cancel) && i.cancel()
            var n = (hi = (hi % 16777216) + 1)
            this._nextLayoutData = { id: n, instant: t, onFinish: e, cancel: null }
            for (var r = this._items, s = [], o = 0; o < r.length; o++) r[o]._isActive && s.push(r[o])
            this._refreshDimensions()
            var a,
                h = this._width - this._borderLeft - this._borderRight,
                l = this._height - this._borderTop - this._borderBottom,
                u = this._settings.layout
            return (
                dt(u)
                    ? (a = u(this, n, s, h, l, this._onLayoutDataReceived))
                    : (li.defaultPacker.setOptions(u),
                      (a = li.defaultPacker.createLayout(this, n, s, h, l, this._onLayoutDataReceived))),
                dt(a) && this._nextLayoutData && this._nextLayoutData.id === n && (this._nextLayoutData.cancel = a),
                this
            )
        }),
        (li.prototype.add = function (t, e) {
            if (this._isDestroyed || !t) return []
            var i,
                n = Ze((i = t)) ? Array.prototype.slice.call(i) : Array.prototype.concat(i)
            if (!n.length) return n
            var r,
                s,
                o,
                a,
                h = e || {},
                l = h.layout ? h.layout : void 0 === h.layout,
                u = this._items,
                d = !1
            for (a = 0; a < n.length; a++)
                (s = n[a]).parentNode !== this._element && (r = r || document.createDocumentFragment()).appendChild(s)
            for (r && this._element.appendChild(r), a = 0; a < n.length; a++)
                (s = n[a]),
                    (o = n[a] = new Ge(this, s, h.active))._isActive && ((d = !0), (o._layout._skipNextAnimation = !0))
            for (a = 0; a < n.length; a++) (o = n[a])._refreshDimensions(), o._refreshSortData()
            return (
                zt(u, n, h.index),
                this._hasListeners('add') && this._emit('add', n.slice(0)),
                d && l && this.layout(l === ai, dt(l) ? l : void 0),
                n
            )
        }),
        (li.prototype.remove = function (t, e) {
            if (this._isDestroyed || !t.length) return []
            var i,
                n,
                r,
                s = e || {},
                o = s.layout ? s.layout : void 0 === s.layout,
                h = !1,
                l = this.getItems(),
                u = [],
                d = []
            for (r = 0; r < t.length; r++)
                (n = t[r])._isDestroyed ||
                    (-1 !== (i = this._items.indexOf(n)) &&
                        (n._isActive && (h = !0),
                        u.push(n),
                        d.push(l.indexOf(n)),
                        n._destroy(s.removeElements),
                        this._items.splice(i, 1)))
            return (
                this._hasListeners(a) && this._emit(a, u.slice(0), d),
                h && o && this.layout(o === ai, dt(o) ? o : void 0),
                u
            )
        }),
        (li.prototype.show = function (t, e) {
            return !this._isDestroyed && t.length && this._setItemsVisibility(t, !0, e), this
        }),
        (li.prototype.hide = function (t, e) {
            return !this._isDestroyed && t.length && this._setItemsVisibility(t, !1, e), this
        }),
        (li.prototype.filter = function (t, e) {
            if (this._isDestroyed || !this._items.length) return this
            var i,
                n,
                r = [],
                s = [],
                o = typeof t === oi,
                a = dt(t),
                h = e || {},
                u = !0 === h.instant,
                d = h.syncWithLayout,
                c = h.layout ? h.layout : void 0 === h.layout,
                _ = dt(h.onFinish) ? h.onFinish : null,
                f = -1,
                p = ei
            if (
                (_ &&
                    (p = function () {
                        ++f && _(r.slice(0), s.slice(0))
                    }),
                a || o)
            )
                for (n = 0; n < this._items.length; n++)
                    (i = this._items[n]), (a ? t(i) : Wt(i._element, t)) ? r.push(i) : s.push(i)
            return (
                r.length ? this.show(r, { instant: u, syncWithLayout: d, onFinish: p, layout: !1 }) : p(),
                s.length ? this.hide(s, { instant: u, syncWithLayout: d, onFinish: p, layout: !1 }) : p(),
                (r.length || s.length) &&
                    (this._hasListeners(l) && this._emit(l, r.slice(0), s.slice(0)),
                    c && this.layout(c === ai, dt(c) ? c : void 0)),
                this
            )
        }),
        (li.prototype.sort = (function () {
            var t, e, i, n
            function r(r, s) {
                for (var o, a, h, l, u = 0, d = 0; d < t.length; d++)
                    if (
                        ((o = t[d][0]),
                        (a = t[d][1]),
                        (h = (r._sortData ? r : r._refreshSortData())._sortData[o]),
                        (l = (s._sortData ? s : s._refreshSortData())._sortData[o]),
                        (u = 'desc' === a || (!a && e) ? (l < h ? -1 : l > h ? 1 : 0) : h < l ? -1 : h > l ? 1 : 0))
                    )
                        return u
                return u || (n || (n = ci(i)), (u = e ? _i(n, s, r) : _i(n, r, s))), u
            }
            function s(r, s) {
                var o = e ? -t(r, s) : t(r, s)
                return o || (n || (n = ci(i)), (o = e ? _i(n, s, r) : _i(n, r, s))), o
            }
            return function (o, a) {
                if (this._isDestroyed || this._items.length < 2) return this
                var h = this._items,
                    l = a || {},
                    d = l.layout ? l.layout : void 0 === l.layout
                if (((e = !!l.descending), (i = h.slice(0)), (n = null), dt(o))) (t = o), h.sort(s)
                else if (typeof o === oi)
                    (t = o
                        .trim()
                        .split(' ')
                        .filter(function (t) {
                            return t
                        })
                        .map(function (t) {
                            return t.split(':')
                        })),
                        h.sort(r)
                else {
                    if (!Array.isArray(o))
                        throw ((t = e = i = n = null), new Error('Invalid comparer argument provided.'))
                    ;(h.length = 0), h.push.apply(h, o)
                }
                return (
                    this._hasListeners(u) && this._emit(u, h.slice(0), i),
                    d && this.layout(d === ai, dt(d) ? d : void 0),
                    (t = e = i = n = null),
                    this
                )
            }
        })()),
        (li.prototype.move = function (t, e, r) {
            if (this._isDestroyed || this._items.length < 2) return this
            var s,
                o,
                a = this._items,
                h = r || {},
                l = h.layout ? h.layout : void 0 === h.layout,
                u = h.action === i,
                c = u ? i : n,
                _ = this.getItem(t),
                f = this.getItem(e)
            return (
                _ &&
                    f &&
                    _ !== f &&
                    ((s = a.indexOf(_)),
                    (o = a.indexOf(f)),
                    u ? Ut(a, s, o) : jt(a, s, o),
                    this._hasListeners(d) && this._emit(d, { item: _, fromIndex: s, toIndex: o, action: c }),
                    l && this.layout(l === ai, dt(l) ? l : void 0)),
                this
            )
        }),
        (li.prototype.send = function (t, e, i, n) {
            if (this._isDestroyed || e._isDestroyed || this === e) return this
            if (!(t = this.getItem(t))) return this
            var r = n || {},
                s = r.appendTo || document.body,
                o = r.layoutSender ? r.layoutSender : void 0 === r.layoutSender,
                a = r.layoutReceiver ? r.layoutReceiver : void 0 === r.layoutReceiver
            return (
                t._migrate.start(e, i, s),
                t._migrate._isActive &&
                    t._isActive &&
                    (o && this.layout(o === ai, dt(o) ? o : void 0), a && e.layout(a === ai, dt(a) ? a : void 0)),
                this
            )
        }),
        (li.prototype.destroy = function (e) {
            if (this._isDestroyed) return this
            var i,
                n,
                r,
                s = this._element,
                o = this._items.slice(0),
                a = (this._layout && this._layout.styles) || {}
            for (
                (r = this)._resizeHandler &&
                    (r._resizeHandler(!0),
                    window.removeEventListener('resize', r._resizeHandler),
                    (r._resizeHandler = null)),
                    i = 0;
                i < o.length;
                i++
            )
                o[i]._destroy(e)
            for (n in ((this._items.length = 0), ge(s, this._settings.containerClass), a)) s.style[n] = ''
            return this._emit('destroy'), this._emitter.destroy(), delete t[this._id], (this._isDestroyed = !0), this
        }),
        (li.prototype._emit = function () {
            this._isDestroyed || this._emitter.emit.apply(this._emitter, arguments)
        }),
        (li.prototype._hasListeners = function (t) {
            return !this._isDestroyed && this._emitter.countListeners(t) > 0
        }),
        (li.prototype._updateBoundingRect = function () {
            var t = this._element.getBoundingClientRect()
            ;(this._width = t.width),
                (this._height = t.height),
                (this._left = t.left),
                (this._top = t.top),
                (this._right = t.right),
                (this._bottom = t.bottom)
        }),
        (li.prototype._updateBorders = function (t, e, i, n) {
            var r = this._element
            t && (this._borderLeft = vt(r, 'border-left-width')),
                e && (this._borderRight = vt(r, 'border-right-width')),
                i && (this._borderTop = vt(r, 'border-top-width')),
                n && (this._borderBottom = vt(r, 'border-bottom-width'))
        }),
        (li.prototype._refreshDimensions = function () {
            this._updateBoundingRect(),
                this._updateBorders(1, 1, 1, 1),
                (this._boxSizing = gt(this._element, 'box-sizing'))
        }),
        (li.prototype._onLayoutDataReceived =
            ((ii = []),
            function (t) {
                if (!this._isDestroyed && this._nextLayoutData && this._nextLayoutData.id === t.id) {
                    var e,
                        i,
                        n,
                        a,
                        h = this,
                        l = this._nextLayoutData.instant,
                        u = this._nextLayoutData.onFinish,
                        d = t.items.length,
                        c = d
                    for (
                        this._nextLayoutData = null,
                            !this._isLayoutFinished &&
                                this._hasListeners(o) &&
                                this._emit(o, this._layout.items.slice(0)),
                            this._layout = t,
                            ii.length = 0,
                            a = 0;
                        a < d;
                        a++
                    )
                        (e = t.items[a])
                            ? ((i = t.slots[2 * a]),
                              (n = t.slots[2 * a + 1]),
                              e._canSkipLayout(i, n)
                                  ? --c
                                  : ((e._left = i), (e._top = n), e.isActive() && !e.isDragging() ? ii.push(e) : --c))
                            : --c
                    if (
                        (t.styles && Re(this._element, t.styles),
                        !this._hasListeners(r) || (this._emit(r, t.items.slice(0), !0 === l), this._layout.id === t.id))
                    ) {
                        var _ = function () {
                            if (!(--c > 0)) {
                                var e = h._layout.id !== t.id,
                                    i = dt(l) ? l : u
                                e || (h._isLayoutFinished = !0),
                                    dt(i) && i(t.items.slice(0), e),
                                    !e && h._hasListeners(s) && h._emit(s, t.items.slice(0))
                            }
                        }
                        if (!ii.length) return _(), this
                        for (this._isLayoutFinished = !1, a = 0; a < ii.length && this._layout.id === t.id; a++)
                            ii[a]._layout.start(!0 === l, _)
                        return this._layout.id === t.id && (ii.length = 0), this
                    }
                }
            })),
        (li.prototype._setItemsVisibility = function (t, e, i) {
            var n,
                s,
                o = this,
                a = t.slice(0),
                l = i || {},
                u = !0 === l.instant,
                d = l.onFinish,
                c = l.layout ? l.layout : void 0 === l.layout,
                _ = a.length,
                f = e ? 'showStart' : h,
                p = e ? 'showEnd' : 'hideEnd',
                m = e ? 'show' : 'hide',
                g = !1,
                v = [],
                y = []
            if (_) {
                for (s = 0; s < a.length; s++)
                    (n = a[s]),
                        ((e && !n._isActive) || (!e && n._isActive)) && (g = !0),
                        (n._layout._skipNextAnimation = !(!e || n._isActive)),
                        e && n._visibility._isHidden && y.push(n),
                        e ? n._addToLayout() : n._removeFromLayout()
                y.length && (this.refreshItems(y, !0), (y.length = 0)),
                    g && !1 !== l.syncWithLayout ? this.on(r, b) : b(),
                    g && c && this.layout(c === ai, dt(c) ? c : void 0)
            } else dt(d) && d(a)
            function b() {
                for (
                    g && !1 !== l.syncWithLayout && o.off(r, b), o._hasListeners(f) && o._emit(f, a.slice(0)), s = 0;
                    s < a.length;
                    s++
                )
                    a[s]._gridId === o._id
                        ? a[s]._visibility[m](u, function (t, e) {
                              t || v.push(e),
                                  --_ < 1 && (dt(d) && d(v.slice(0)), o._hasListeners(p) && o._emit(p, v.slice(0)))
                          })
                        : --_ < 1 && (dt(d) && d(v.slice(0)), o._hasListeners(p) && o._emit(p, v.slice(0)))
            }
        }),
        (ri = {}),
        (function (t, e) {
            function i() {
                ;(this._delay = 0),
                    (this._endDelay = 0),
                    (this._fill = 'none'),
                    (this._iterationStart = 0),
                    (this._iterations = 1),
                    (this._duration = 0),
                    (this._playbackRate = 1),
                    (this._direction = 'normal'),
                    (this._easing = 'linear'),
                    (this._easingFunction = c)
            }
            function n() {
                return t.isDeprecated(
                    'Invalid timing inputs',
                    '2016-03-02',
                    'TypeError exceptions will be thrown instead.',
                    !0,
                )
            }
            function r(e, n, r) {
                var s = new i()
                return (
                    n && ((s.fill = 'both'), (s.duration = 'auto')),
                    'number' != typeof e || isNaN(e)
                        ? void 0 !== e &&
                          Object.getOwnPropertyNames(e).forEach(function (i) {
                              if ('auto' != e[i]) {
                                  if (
                                      ('number' == typeof s[i] || 'duration' == i) &&
                                      ('number' != typeof e[i] || isNaN(e[i]))
                                  )
                                      return
                                  if ('fill' == i && -1 == u.indexOf(e[i])) return
                                  if ('direction' == i && -1 == d.indexOf(e[i])) return
                                  if (
                                      'playbackRate' == i &&
                                      1 !== e[i] &&
                                      t.isDeprecated(
                                          'AnimationEffectTiming.playbackRate',
                                          '2014-11-28',
                                          'Use Animation.playbackRate instead.',
                                      )
                                  )
                                      return
                                  s[i] = e[i]
                              }
                          })
                        : (s.duration = e),
                    s
                )
            }
            function s(t, e, i, n) {
                return t < 0 || t > 1 || i < 0 || i > 1
                    ? c
                    : function (r) {
                          function s(t, e, i) {
                              return 3 * t * (1 - i) * (1 - i) * i + 3 * e * (1 - i) * i * i + i * i * i
                          }
                          if (r <= 0) {
                              var o = 0
                              return t > 0 ? (o = e / t) : !e && i > 0 && (o = n / i), o * r
                          }
                          if (r >= 1) {
                              var a = 0
                              return (
                                  i < 1 ? (a = (n - 1) / (i - 1)) : 1 == i && t < 1 && (a = (e - 1) / (t - 1)),
                                  1 + a * (r - 1)
                              )
                          }
                          for (var h = 0, l = 1; h < l; ) {
                              var u = (h + l) / 2,
                                  d = s(t, i, u)
                              if (Math.abs(r - d) < 1e-5) return s(e, n, u)
                              d < r ? (h = u) : (l = u)
                          }
                          return s(e, n, u)
                      }
            }
            function o(t, e) {
                return function (i) {
                    if (i >= 1) return 1
                    var n = 1 / t
                    return (i += e * n) - (i % n)
                }
            }
            function a(t) {
                g || (g = document.createElement('div').style),
                    (g.animationTimingFunction = ''),
                    (g.animationTimingFunction = t)
                var e = g.animationTimingFunction
                if ('' == e && n()) throw new TypeError(t + ' is not a valid value for easing')
                return e
            }
            function h(t) {
                if ('linear' == t) return c
                var e = y.exec(t)
                if (e) return s.apply(this, e.slice(1).map(Number))
                var i = b.exec(t)
                if (i) return o(Number(i[1]), p)
                var n = w.exec(t)
                return n ? o(Number(n[1]), { start: _, middle: f, end: p }[n[2]]) : m[t] || c
            }
            function l(t, e, i) {
                if (null == e) return S
                var n = i.delay + t + i.endDelay
                return e < Math.min(i.delay, n) ? T : e >= Math.min(i.delay + t, n) ? D : x
            }
            var u = 'backwards|forwards|both|none'.split('|'),
                d = 'reverse|alternate|alternate-reverse'.split('|'),
                c = function (t) {
                    return t
                }
            i.prototype = {
                _setMember: function (e, i) {
                    ;(this['_' + e] = i),
                        this._effect &&
                            ((this._effect._timingInput[e] = i),
                            (this._effect._timing = t.normalizeTimingInput(this._effect._timingInput)),
                            (this._effect.activeDuration = t.calculateActiveDuration(this._effect._timing)),
                            this._effect._animation && this._effect._animation._rebuildUnderlyingAnimation())
                },
                get playbackRate() {
                    return this._playbackRate
                },
                set delay(t) {
                    this._setMember('delay', t)
                },
                get delay() {
                    return this._delay
                },
                set endDelay(t) {
                    this._setMember('endDelay', t)
                },
                get endDelay() {
                    return this._endDelay
                },
                set fill(t) {
                    this._setMember('fill', t)
                },
                get fill() {
                    return this._fill
                },
                set iterationStart(t) {
                    if ((isNaN(t) || t < 0) && n())
                        throw new TypeError('iterationStart must be a non-negative number, received: ' + t)
                    this._setMember('iterationStart', t)
                },
                get iterationStart() {
                    return this._iterationStart
                },
                set duration(t) {
                    if ('auto' != t && (isNaN(t) || t < 0) && n())
                        throw new TypeError('duration must be non-negative or auto, received: ' + t)
                    this._setMember('duration', t)
                },
                get duration() {
                    return this._duration
                },
                set direction(t) {
                    this._setMember('direction', t)
                },
                get direction() {
                    return this._direction
                },
                set easing(t) {
                    ;(this._easingFunction = h(a(t))), this._setMember('easing', t)
                },
                get easing() {
                    return this._easing
                },
                set iterations(t) {
                    if ((isNaN(t) || t < 0) && n())
                        throw new TypeError('iterations must be non-negative, received: ' + t)
                    this._setMember('iterations', t)
                },
                get iterations() {
                    return this._iterations
                },
            }
            var _ = 1,
                f = 0.5,
                p = 0,
                m = {
                    ease: s(0.25, 0.1, 0.25, 1),
                    'ease-in': s(0.42, 0, 1, 1),
                    'ease-out': s(0, 0, 0.58, 1),
                    'ease-in-out': s(0.42, 0, 0.58, 1),
                    'step-start': o(1, _),
                    'step-middle': o(1, f),
                    'step-end': o(1, p),
                },
                g = null,
                v = '\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*',
                y = new RegExp('cubic-bezier\\(' + v + ',' + v + ',' + v + ',' + v + '\\)'),
                b = /steps\(\s*(\d+)\s*\)/,
                w = /steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/,
                S = 0,
                T = 1,
                D = 2,
                x = 3
            ;(t.cloneTimingInput = function (t) {
                if ('number' == typeof t) return t
                var e = {}
                for (var i in t) e[i] = t[i]
                return e
            }),
                (t.makeTiming = r),
                (t.numericTimingToObject = function (t) {
                    return 'number' == typeof t && (t = isNaN(t) ? { duration: 0 } : { duration: t }), t
                }),
                (t.normalizeTimingInput = function (e, i) {
                    return r((e = t.numericTimingToObject(e)), i)
                }),
                (t.calculateActiveDuration = function (t) {
                    return Math.abs(
                        (function (t) {
                            return 0 === t.duration || 0 === t.iterations ? 0 : t.duration * t.iterations
                        })(t) / t.playbackRate,
                    )
                }),
                (t.calculateIterationProgress = function (t, e, i) {
                    var n = l(t, e, i),
                        r = (function (t, e, i, n, r) {
                            switch (n) {
                                case T:
                                    return 'backwards' == e || 'both' == e ? 0 : null
                                case x:
                                    return i - r
                                case D:
                                    return 'forwards' == e || 'both' == e ? t : null
                                case S:
                                    return null
                            }
                        })(t, i.fill, e, n, i.delay)
                    if (null === r) return null
                    var s = (function (t, e, i, n, r) {
                            var s = r
                            return 0 === t ? e !== T && (s += i) : (s += n / t), s
                        })(i.duration, n, i.iterations, r, i.iterationStart),
                        o = (function (t, e, i, n, r, s) {
                            var o = t === 1 / 0 ? e % 1 : t % 1
                            return 0 !== o || i !== D || 0 === n || (0 === r && 0 !== s) || (o = 1), o
                        })(s, i.iterationStart, n, i.iterations, r, i.duration),
                        a = (function (t, e, i, n) {
                            return t === D && e === 1 / 0 ? 1 / 0 : 1 === i ? Math.floor(n) - 1 : Math.floor(n)
                        })(n, i.iterations, o, s),
                        h = (function (t, e, i) {
                            var n = t
                            if ('normal' !== t && 'reverse' !== t) {
                                var r = e
                                'alternate-reverse' === t && (r += 1),
                                    (n = 'normal'),
                                    r !== 1 / 0 && r % 2 != 0 && (n = 'reverse')
                            }
                            return 'normal' === n ? i : 1 - i
                        })(i.direction, a, o)
                    return i._easingFunction(h)
                }),
                (t.calculatePhase = l),
                (t.normalizeEasing = a),
                (t.parseEasingFunction = h)
        })((ni = {})),
        (function (t, e) {
            function i(t, e) {
                return (t in h && h[t][e]) || e
            }
            function n(t, e, n) {
                if (
                    !(function (t) {
                        return (
                            'display' === t ||
                            0 === t.lastIndexOf('animation', 0) ||
                            0 === t.lastIndexOf('transition', 0)
                        )
                    })(t)
                ) {
                    var r = s[t]
                    if (r)
                        for (var a in ((o.style[t] = e), r)) {
                            var h = r[a],
                                l = o.style[h]
                            n[h] = i(h, l)
                        }
                    else n[t] = i(t, e)
                }
            }
            function r(t) {
                var e = []
                for (var i in t)
                    if (!(i in ['easing', 'offset', 'composite'])) {
                        var n = t[i]
                        Array.isArray(n) || (n = [n])
                        for (var r, s = n.length, o = 0; o < s; o++)
                            ((r = {}).offset = 'offset' in t ? t.offset : 1 == s ? 1 : o / (s - 1)),
                                'easing' in t && (r.easing = t.easing),
                                'composite' in t && (r.composite = t.composite),
                                (r[i] = n[o]),
                                e.push(r)
                    }
                return (
                    e.sort(function (t, e) {
                        return t.offset - e.offset
                    }),
                    e
                )
            }
            var s = {
                    background: [
                        'backgroundImage',
                        'backgroundPosition',
                        'backgroundSize',
                        'backgroundRepeat',
                        'backgroundAttachment',
                        'backgroundOrigin',
                        'backgroundClip',
                        'backgroundColor',
                    ],
                    border: [
                        'borderTopColor',
                        'borderTopStyle',
                        'borderTopWidth',
                        'borderRightColor',
                        'borderRightStyle',
                        'borderRightWidth',
                        'borderBottomColor',
                        'borderBottomStyle',
                        'borderBottomWidth',
                        'borderLeftColor',
                        'borderLeftStyle',
                        'borderLeftWidth',
                    ],
                    borderBottom: ['borderBottomWidth', 'borderBottomStyle', 'borderBottomColor'],
                    borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
                    borderLeft: ['borderLeftWidth', 'borderLeftStyle', 'borderLeftColor'],
                    borderRadius: [
                        'borderTopLeftRadius',
                        'borderTopRightRadius',
                        'borderBottomRightRadius',
                        'borderBottomLeftRadius',
                    ],
                    borderRight: ['borderRightWidth', 'borderRightStyle', 'borderRightColor'],
                    borderTop: ['borderTopWidth', 'borderTopStyle', 'borderTopColor'],
                    borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
                    flex: ['flexGrow', 'flexShrink', 'flexBasis'],
                    font: ['fontFamily', 'fontSize', 'fontStyle', 'fontVariant', 'fontWeight', 'lineHeight'],
                    margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
                    outline: ['outlineColor', 'outlineStyle', 'outlineWidth'],
                    padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
                },
                o = document.createElementNS('http://www.w3.org/1999/xhtml', 'div'),
                a = { thin: '1px', medium: '3px', thick: '5px' },
                h = {
                    borderBottomWidth: a,
                    borderLeftWidth: a,
                    borderRightWidth: a,
                    borderTopWidth: a,
                    fontSize: {
                        'xx-small': '60%',
                        'x-small': '75%',
                        small: '89%',
                        medium: '100%',
                        large: '120%',
                        'x-large': '150%',
                        'xx-large': '200%',
                    },
                    fontWeight: { normal: '400', bold: '700' },
                    outlineWidth: a,
                    textShadow: { none: '0px 0px 0px transparent' },
                    boxShadow: { none: '0px 0px 0px 0px transparent' },
                }
            ;(t.convertToArrayForm = r),
                (t.normalizeKeyframes = function (e) {
                    if (null == e) return []
                    window.Symbol &&
                        Symbol.iterator &&
                        Array.prototype.from &&
                        e[Symbol.iterator] &&
                        (e = Array.from(e)),
                        Array.isArray(e) || (e = r(e))
                    for (
                        var i = e.map(function (e) {
                                var i = {}
                                for (var r in e) {
                                    var s = e[r]
                                    if ('offset' == r) {
                                        if (null != s) {
                                            if (((s = Number(s)), !isFinite(s)))
                                                throw new TypeError('Keyframe offsets must be numbers.')
                                            if (s < 0 || s > 1)
                                                throw new TypeError('Keyframe offsets must be between 0 and 1.')
                                        }
                                    } else if ('composite' == r) {
                                        if ('add' == s || 'accumulate' == s)
                                            throw {
                                                type: DOMException.NOT_SUPPORTED_ERR,
                                                name: 'NotSupportedError',
                                                message: 'add compositing is not supported',
                                            }
                                        if ('replace' != s) throw new TypeError('Invalid composite mode ' + s + '.')
                                    } else s = 'easing' == r ? t.normalizeEasing(s) : '' + s
                                    n(r, s, i)
                                }
                                return (
                                    null == i.offset && (i.offset = null), null == i.easing && (i.easing = 'linear'), i
                                )
                            }),
                            s = !0,
                            o = -1 / 0,
                            a = 0;
                        a < i.length;
                        a++
                    ) {
                        var h = i[a].offset
                        if (null != h) {
                            if (h < o)
                                throw new TypeError(
                                    'Keyframes are not loosely sorted by offset. Sort or specify offsets.',
                                )
                            o = h
                        } else s = !1
                    }
                    return (
                        (i = i.filter(function (t) {
                            return t.offset >= 0 && t.offset <= 1
                        })),
                        s ||
                            (function () {
                                var t = i.length
                                null == i[t - 1].offset && (i[t - 1].offset = 1),
                                    t > 1 && null == i[0].offset && (i[0].offset = 0)
                                for (var e = 0, n = i[0].offset, r = 1; r < t; r++) {
                                    var s = i[r].offset
                                    if (null != s) {
                                        for (var o = 1; o < r - e; o++) i[e + o].offset = n + ((s - n) * o) / (r - e)
                                        ;(e = r), (n = s)
                                    }
                                }
                            })(),
                        i
                    )
                })
        })(ni),
        (function (t) {
            var e = {}
            ;(t.isDeprecated = function (t, i, n, r) {
                var s = r ? 'are' : 'is',
                    o = new Date(),
                    a = new Date(i)
                return (
                    a.setMonth(a.getMonth() + 3),
                    !(
                        o < a &&
                        (t in e ||
                            console.warn(
                                'Web Animations: ' +
                                    t +
                                    ' ' +
                                    s +
                                    ' deprecated and will stop working on ' +
                                    a.toDateString() +
                                    '. ' +
                                    n,
                            ),
                        (e[t] = !0),
                        1)
                    )
                )
            }),
                (t.deprecated = function (e, i, n, r) {
                    var s = r ? 'are' : 'is'
                    if (t.isDeprecated(e, i, n, r)) throw new Error(e + ' ' + s + ' no longer supported. ' + n)
                })
        })(ni),
        (function () {
            if (document.documentElement.animate) {
                var t = document.documentElement.animate([], 0),
                    e = !0
                if (
                    (t &&
                        ((e = !1),
                        'play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState'
                            .split('|')
                            .forEach(function (i) {
                                void 0 === t[i] && (e = !0)
                            })),
                    !e)
                )
                    return
            }
            !(function (t, e, i) {
                e.convertEffectInput = function (i) {
                    var n = (function (t) {
                            for (var e = {}, i = 0; i < t.length; i++)
                                for (var n in t[i])
                                    if ('offset' != n && 'easing' != n && 'composite' != n) {
                                        var r = { offset: t[i].offset, easing: t[i].easing, value: t[i][n] }
                                        ;(e[n] = e[n] || []), e[n].push(r)
                                    }
                            for (var s in e) {
                                var o = e[s]
                                if (0 != o[0].offset || 1 != o[o.length - 1].offset)
                                    throw {
                                        type: DOMException.NOT_SUPPORTED_ERR,
                                        name: 'NotSupportedError',
                                        message: 'Partial keyframes are not supported',
                                    }
                            }
                            return e
                        })(t.normalizeKeyframes(i)),
                        r = (function (i) {
                            var n = []
                            for (var r in i)
                                for (var s = i[r], o = 0; o < s.length - 1; o++) {
                                    var a = o,
                                        h = o + 1,
                                        l = s[a].offset,
                                        u = s[h].offset,
                                        d = l,
                                        c = u
                                    0 == o && ((d = -1 / 0), 0 == u && (h = a)),
                                        o == s.length - 2 && ((c = 1 / 0), 1 == l && (a = h)),
                                        n.push({
                                            applyFrom: d,
                                            applyTo: c,
                                            startOffset: s[a].offset,
                                            endOffset: s[h].offset,
                                            easingFunction: t.parseEasingFunction(s[a].easing),
                                            property: r,
                                            interpolation: e.propertyInterpolation(r, s[a].value, s[h].value),
                                        })
                                }
                            return (
                                n.sort(function (t, e) {
                                    return t.startOffset - e.startOffset
                                }),
                                n
                            )
                        })(n)
                    return function (t, i) {
                        if (null != i)
                            r.filter(function (t) {
                                return i >= t.applyFrom && i < t.applyTo
                            }).forEach(function (n) {
                                var r = i - n.startOffset,
                                    s = n.endOffset - n.startOffset,
                                    o = 0 == s ? 0 : n.easingFunction(r / s)
                                e.apply(t, n.property, n.interpolation(o))
                            })
                        else for (var s in n) 'offset' != s && 'easing' != s && 'composite' != s && e.clear(t, s)
                    }
                }
            })(ni, ri),
                (function (t, e, i) {
                    function n(t) {
                        return t.replace(/-(.)/g, function (t, e) {
                            return e.toUpperCase()
                        })
                    }
                    function r(t, e, i) {
                        ;(s[i] = s[i] || []), s[i].push([t, e])
                    }
                    var s = {}
                    e.addPropertiesHandler = function (t, e, i) {
                        for (var s = 0; s < i.length; s++) r(t, e, n(i[s]))
                    }
                    var o = {
                        backgroundColor: 'transparent',
                        backgroundPosition: '0% 0%',
                        borderBottomColor: 'currentColor',
                        borderBottomLeftRadius: '0px',
                        borderBottomRightRadius: '0px',
                        borderBottomWidth: '3px',
                        borderLeftColor: 'currentColor',
                        borderLeftWidth: '3px',
                        borderRightColor: 'currentColor',
                        borderRightWidth: '3px',
                        borderSpacing: '2px',
                        borderTopColor: 'currentColor',
                        borderTopLeftRadius: '0px',
                        borderTopRightRadius: '0px',
                        borderTopWidth: '3px',
                        bottom: 'auto',
                        clip: 'rect(0px, 0px, 0px, 0px)',
                        color: 'black',
                        fontSize: '100%',
                        fontWeight: '400',
                        height: 'auto',
                        left: 'auto',
                        letterSpacing: 'normal',
                        lineHeight: '120%',
                        marginBottom: '0px',
                        marginLeft: '0px',
                        marginRight: '0px',
                        marginTop: '0px',
                        maxHeight: 'none',
                        maxWidth: 'none',
                        minHeight: '0px',
                        minWidth: '0px',
                        opacity: '1.0',
                        outlineColor: 'invert',
                        outlineOffset: '0px',
                        outlineWidth: '3px',
                        paddingBottom: '0px',
                        paddingLeft: '0px',
                        paddingRight: '0px',
                        paddingTop: '0px',
                        right: 'auto',
                        strokeDasharray: 'none',
                        strokeDashoffset: '0px',
                        textIndent: '0px',
                        textShadow: '0px 0px 0px transparent',
                        top: 'auto',
                        transform: '',
                        verticalAlign: '0px',
                        visibility: 'visible',
                        width: 'auto',
                        wordSpacing: 'normal',
                        zIndex: 'auto',
                    }
                    e.propertyInterpolation = function (i, r, a) {
                        var h = i
                        ;/-/.test(i) &&
                            !t.isDeprecated('Hyphenated property names', '2016-03-22', 'Use camelCase instead.', !0) &&
                            (h = n(i)),
                            ('initial' != r && 'initial' != a) ||
                                ('initial' == r && (r = o[h]), 'initial' == a && (a = o[h]))
                        for (var l = r == a ? [] : s[h], u = 0; l && u < l.length; u++) {
                            var d = l[u][0](r),
                                c = l[u][0](a)
                            if (void 0 !== d && void 0 !== c) {
                                var _ = l[u][1](d, c)
                                if (_) {
                                    var f = e.Interpolation.apply(null, _)
                                    return function (t) {
                                        return 0 == t ? r : 1 == t ? a : f(t)
                                    }
                                }
                            }
                        }
                        return e.Interpolation(!1, !0, function (t) {
                            return t ? a : r
                        })
                    }
                })(ni, ri),
                (function (t, e, i) {
                    e.KeyframeEffect = function (i, n, r, s) {
                        var o,
                            a = (function (e) {
                                var i = t.calculateActiveDuration(e),
                                    n = function (n) {
                                        return t.calculateIterationProgress(i, n, e)
                                    }
                                return (n._totalDuration = e.delay + i + e.endDelay), n
                            })(t.normalizeTimingInput(r)),
                            h = e.convertEffectInput(n),
                            l = function () {
                                h(i, o)
                            }
                        return (
                            (l._update = function (t) {
                                return null !== (o = a(t))
                            }),
                            (l._clear = function () {
                                h(i, null)
                            }),
                            (l._hasSameTarget = function (t) {
                                return i === t
                            }),
                            (l._target = i),
                            (l._totalDuration = a._totalDuration),
                            (l._id = s),
                            l
                        )
                    }
                })(ni, ri),
                (function (t, e) {
                    function i(t, e, i) {
                        ;(i.enumerable = !0), (i.configurable = !0), Object.defineProperty(t, e, i)
                    }
                    function n(t) {
                        ;(this._element = t),
                            (this._surrogateStyle = document.createElementNS(
                                'http://www.w3.org/1999/xhtml',
                                'div',
                            ).style),
                            (this._style = t.style),
                            (this._length = 0),
                            (this._isAnimatedProperty = {}),
                            (this._updateSvgTransformAttr = (function (t, e) {
                                return (
                                    !(!e.namespaceURI || -1 == e.namespaceURI.indexOf('/svg')) &&
                                    (s in t ||
                                        (t[s] = /Trident|MSIE|IEMobile|Edge|Android 4/i.test(t.navigator.userAgent)),
                                    t[s])
                                )
                            })(window, t)),
                            (this._savedTransformAttr = null)
                        for (var e = 0; e < this._style.length; e++) {
                            var i = this._style[e]
                            this._surrogateStyle[i] = this._style[i]
                        }
                        this._updateIndices()
                    }
                    function r(t) {
                        if (!t._webAnimationsPatchedStyle) {
                            var e = new n(t)
                            try {
                                i(t, 'style', {
                                    get: function () {
                                        return e
                                    },
                                })
                            } catch (e) {
                                ;(t.style._set = function (e, i) {
                                    t.style[e] = i
                                }),
                                    (t.style._clear = function (e) {
                                        t.style[e] = ''
                                    })
                            }
                            t._webAnimationsPatchedStyle = t.style
                        }
                    }
                    var s = '_webAnimationsUpdateSvgTransformAttr',
                        o = { cssText: 1, length: 1, parentRule: 1 },
                        a = {
                            getPropertyCSSValue: 1,
                            getPropertyPriority: 1,
                            getPropertyValue: 1,
                            item: 1,
                            removeProperty: 1,
                            setProperty: 1,
                        },
                        h = { removeProperty: 1, setProperty: 1 }
                    for (var l in ((n.prototype = {
                        get cssText() {
                            return this._surrogateStyle.cssText
                        },
                        set cssText(t) {
                            for (var e = {}, i = 0; i < this._surrogateStyle.length; i++)
                                e[this._surrogateStyle[i]] = !0
                            for (
                                this._surrogateStyle.cssText = t, this._updateIndices(), i = 0;
                                i < this._surrogateStyle.length;
                                i++
                            )
                                e[this._surrogateStyle[i]] = !0
                            for (var n in e)
                                this._isAnimatedProperty[n] ||
                                    this._style.setProperty(n, this._surrogateStyle.getPropertyValue(n))
                        },
                        get length() {
                            return this._surrogateStyle.length
                        },
                        get parentRule() {
                            return this._style.parentRule
                        },
                        _updateIndices: function () {
                            for (; this._length < this._surrogateStyle.length; )
                                Object.defineProperty(this, this._length, {
                                    configurable: !0,
                                    enumerable: !1,
                                    get: (function (t) {
                                        return function () {
                                            return this._surrogateStyle[t]
                                        }
                                    })(this._length),
                                }),
                                    this._length++
                            for (; this._length > this._surrogateStyle.length; )
                                this._length--,
                                    Object.defineProperty(this, this._length, {
                                        configurable: !0,
                                        enumerable: !1,
                                        value: void 0,
                                    })
                        },
                        _set: function (e, i) {
                            ;(this._style[e] = i),
                                (this._isAnimatedProperty[e] = !0),
                                this._updateSvgTransformAttr &&
                                    'transform' == t.unprefixedPropertyName(e) &&
                                    (null == this._savedTransformAttr &&
                                        (this._savedTransformAttr = this._element.getAttribute('transform')),
                                    this._element.setAttribute('transform', t.transformToSvgMatrix(i)))
                        },
                        _clear: function (e) {
                            ;(this._style[e] = this._surrogateStyle[e]),
                                this._updateSvgTransformAttr &&
                                    'transform' == t.unprefixedPropertyName(e) &&
                                    (this._savedTransformAttr
                                        ? this._element.setAttribute('transform', this._savedTransformAttr)
                                        : this._element.removeAttribute('transform'),
                                    (this._savedTransformAttr = null)),
                                delete this._isAnimatedProperty[e]
                        },
                    }),
                    a))
                        n.prototype[l] = (function (t, e) {
                            return function () {
                                var i = this._surrogateStyle[t].apply(this._surrogateStyle, arguments)
                                return (
                                    e &&
                                        (this._isAnimatedProperty[arguments[0]] ||
                                            this._style[t].apply(this._style, arguments),
                                        this._updateIndices()),
                                    i
                                )
                            }
                        })(l, l in h)
                    for (var u in document.documentElement.style)
                        u in o ||
                            u in a ||
                            (function (t) {
                                i(n.prototype, t, {
                                    get: function () {
                                        return this._surrogateStyle[t]
                                    },
                                    set: function (e) {
                                        ;(this._surrogateStyle[t] = e),
                                            this._updateIndices(),
                                            this._isAnimatedProperty[t] || (this._style[t] = e)
                                    },
                                })
                            })(u)
                    ;(t.apply = function (e, i, n) {
                        r(e), e.style._set(t.propertyName(i), n)
                    }),
                        (t.clear = function (e, i) {
                            e._webAnimationsPatchedStyle && e.style._clear(t.propertyName(i))
                        })
                })(ri),
                (function (t) {
                    window.Element.prototype.animate = function (e, i) {
                        var n = ''
                        return i && i.id && (n = i.id), t.timeline._play(t.KeyframeEffect(this, e, i, n))
                    }
                })(ri),
                (function (t, e) {
                    function i(t, e, n) {
                        if ('number' == typeof t && 'number' == typeof e) return t * (1 - n) + e * n
                        if ('boolean' == typeof t && 'boolean' == typeof e) return n < 0.5 ? t : e
                        if (t.length == e.length) {
                            for (var r = [], s = 0; s < t.length; s++) r.push(i(t[s], e[s], n))
                            return r
                        }
                        throw 'Mismatched interpolation arguments ' + t + ':' + e
                    }
                    t.Interpolation = function (t, e, n) {
                        return function (r) {
                            return n(i(t, e, r))
                        }
                    }
                })(ri),
                (function (t, e) {
                    var i = (function () {
                        function t(t, e) {
                            for (
                                var i = [
                                        [0, 0, 0, 0],
                                        [0, 0, 0, 0],
                                        [0, 0, 0, 0],
                                        [0, 0, 0, 0],
                                    ],
                                    n = 0;
                                n < 4;
                                n++
                            )
                                for (var r = 0; r < 4; r++) for (var s = 0; s < 4; s++) i[n][r] += e[n][s] * t[s][r]
                            return i
                        }
                        return function (e, i, n, r, s) {
                            for (
                                var o = [
                                        [1, 0, 0, 0],
                                        [0, 1, 0, 0],
                                        [0, 0, 1, 0],
                                        [0, 0, 0, 1],
                                    ],
                                    a = 0;
                                a < 4;
                                a++
                            )
                                o[a][3] = s[a]
                            for (a = 0; a < 3; a++) for (var h = 0; h < 3; h++) o[3][a] += e[h] * o[h][a]
                            var l = r[0],
                                u = r[1],
                                d = r[2],
                                c = r[3],
                                _ = [
                                    [1, 0, 0, 0],
                                    [0, 1, 0, 0],
                                    [0, 0, 1, 0],
                                    [0, 0, 0, 1],
                                ]
                            ;(_[0][0] = 1 - 2 * (u * u + d * d)),
                                (_[0][1] = 2 * (l * u - d * c)),
                                (_[0][2] = 2 * (l * d + u * c)),
                                (_[1][0] = 2 * (l * u + d * c)),
                                (_[1][1] = 1 - 2 * (l * l + d * d)),
                                (_[1][2] = 2 * (u * d - l * c)),
                                (_[2][0] = 2 * (l * d - u * c)),
                                (_[2][1] = 2 * (u * d + l * c)),
                                (_[2][2] = 1 - 2 * (l * l + u * u)),
                                (o = t(o, _))
                            var f = [
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, 0, 1],
                            ]
                            for (
                                n[2] && ((f[2][1] = n[2]), (o = t(o, f))),
                                    n[1] && ((f[2][1] = 0), (f[2][0] = n[0]), (o = t(o, f))),
                                    n[0] && ((f[2][0] = 0), (f[1][0] = n[0]), (o = t(o, f))),
                                    a = 0;
                                a < 3;
                                a++
                            )
                                for (h = 0; h < 3; h++) o[a][h] *= i[a]
                            return (function (t) {
                                return (
                                    0 == t[0][2] &&
                                    0 == t[0][3] &&
                                    0 == t[1][2] &&
                                    0 == t[1][3] &&
                                    0 == t[2][0] &&
                                    0 == t[2][1] &&
                                    1 == t[2][2] &&
                                    0 == t[2][3] &&
                                    0 == t[3][2] &&
                                    1 == t[3][3]
                                )
                            })(o)
                                ? [o[0][0], o[0][1], o[1][0], o[1][1], o[3][0], o[3][1]]
                                : o[0].concat(o[1], o[2], o[3])
                        }
                    })()
                    ;(t.composeMatrix = i),
                        (t.quat = function (e, i, n) {
                            var r = t.dot(e, i)
                            r = (function (t, e, i) {
                                return Math.max(Math.min(t, i), e)
                            })(r, -1, 1)
                            var s = []
                            if (1 === r) s = e
                            else
                                for (
                                    var o = Math.acos(r), a = (1 * Math.sin(n * o)) / Math.sqrt(1 - r * r), h = 0;
                                    h < 4;
                                    h++
                                )
                                    s.push(e[h] * (Math.cos(n * o) - r * a) + i[h] * a)
                            return s
                        })
                })(ri),
                (function (t, e, i) {
                    t.sequenceNumber = 0
                    var n = function (t, e, i) {
                        ;(this.target = t),
                            (this.currentTime = e),
                            (this.timelineTime = i),
                            (this.type = 'finish'),
                            (this.bubbles = !1),
                            (this.cancelable = !1),
                            (this.currentTarget = t),
                            (this.defaultPrevented = !1),
                            (this.eventPhase = Event.AT_TARGET),
                            (this.timeStamp = Date.now())
                    }
                    ;(e.Animation = function (e) {
                        ;(this.id = ''),
                            e && e._id && (this.id = e._id),
                            (this._sequenceNumber = t.sequenceNumber++),
                            (this._currentTime = 0),
                            (this._startTime = null),
                            (this._paused = !1),
                            (this._playbackRate = 1),
                            (this._inTimeline = !0),
                            (this._finishedFlag = !0),
                            (this.onfinish = null),
                            (this._finishHandlers = []),
                            (this._effect = e),
                            (this._inEffect = this._effect._update(0)),
                            (this._idle = !0),
                            (this._currentTimePending = !1)
                    }),
                        (e.Animation.prototype = {
                            _ensureAlive: function () {
                                this.playbackRate < 0 && 0 === this.currentTime
                                    ? (this._inEffect = this._effect._update(-1))
                                    : (this._inEffect = this._effect._update(this.currentTime)),
                                    this._inTimeline ||
                                        (!this._inEffect && this._finishedFlag) ||
                                        ((this._inTimeline = !0), e.timeline._animations.push(this))
                            },
                            _tickCurrentTime: function (t, e) {
                                t != this._currentTime &&
                                    ((this._currentTime = t),
                                    this._isFinished &&
                                        !e &&
                                        (this._currentTime = this._playbackRate > 0 ? this._totalDuration : 0),
                                    this._ensureAlive())
                            },
                            get currentTime() {
                                return this._idle || this._currentTimePending ? null : this._currentTime
                            },
                            set currentTime(t) {
                                ;(t = +t),
                                    isNaN(t) ||
                                        (e.restart(),
                                        this._paused ||
                                            null == this._startTime ||
                                            (this._startTime = this._timeline.currentTime - t / this._playbackRate),
                                        (this._currentTimePending = !1),
                                        this._currentTime != t &&
                                            (this._idle && ((this._idle = !1), (this._paused = !0)),
                                            this._tickCurrentTime(t, !0),
                                            e.applyDirtiedAnimation(this)))
                            },
                            get startTime() {
                                return this._startTime
                            },
                            set startTime(t) {
                                ;(t = +t),
                                    isNaN(t) ||
                                        this._paused ||
                                        this._idle ||
                                        ((this._startTime = t),
                                        this._tickCurrentTime(
                                            (this._timeline.currentTime - this._startTime) * this.playbackRate,
                                        ),
                                        e.applyDirtiedAnimation(this))
                            },
                            get playbackRate() {
                                return this._playbackRate
                            },
                            set playbackRate(t) {
                                if (t != this._playbackRate) {
                                    var i = this.currentTime
                                    ;(this._playbackRate = t),
                                        (this._startTime = null),
                                        'paused' != this.playState &&
                                            'idle' != this.playState &&
                                            ((this._finishedFlag = !1),
                                            (this._idle = !1),
                                            this._ensureAlive(),
                                            e.applyDirtiedAnimation(this)),
                                        null != i && (this.currentTime = i)
                                }
                            },
                            get _isFinished() {
                                return (
                                    !this._idle &&
                                    ((this._playbackRate > 0 && this._currentTime >= this._totalDuration) ||
                                        (this._playbackRate < 0 && this._currentTime <= 0))
                                )
                            },
                            get _totalDuration() {
                                return this._effect._totalDuration
                            },
                            get playState() {
                                return this._idle
                                    ? 'idle'
                                    : (null == this._startTime && !this._paused && 0 != this.playbackRate) ||
                                      this._currentTimePending
                                    ? 'pending'
                                    : this._paused
                                    ? 'paused'
                                    : this._isFinished
                                    ? 'finished'
                                    : 'running'
                            },
                            _rewind: function () {
                                if (this._playbackRate >= 0) this._currentTime = 0
                                else {
                                    if (!(this._totalDuration < 1 / 0))
                                        throw new DOMException(
                                            'Unable to rewind negative playback rate animation with infinite duration',
                                            'InvalidStateError',
                                        )
                                    this._currentTime = this._totalDuration
                                }
                            },
                            play: function () {
                                ;(this._paused = !1),
                                    (this._isFinished || this._idle) && (this._rewind(), (this._startTime = null)),
                                    (this._finishedFlag = !1),
                                    (this._idle = !1),
                                    this._ensureAlive(),
                                    e.applyDirtiedAnimation(this)
                            },
                            pause: function () {
                                this._isFinished || this._paused || this._idle
                                    ? this._idle && (this._rewind(), (this._idle = !1))
                                    : (this._currentTimePending = !0),
                                    (this._startTime = null),
                                    (this._paused = !0)
                            },
                            finish: function () {
                                this._idle ||
                                    ((this.currentTime = this._playbackRate > 0 ? this._totalDuration : 0),
                                    (this._startTime = this._totalDuration - this.currentTime),
                                    (this._currentTimePending = !1),
                                    e.applyDirtiedAnimation(this))
                            },
                            cancel: function () {
                                this._inEffect &&
                                    ((this._inEffect = !1),
                                    (this._idle = !0),
                                    (this._paused = !1),
                                    (this._finishedFlag = !0),
                                    (this._currentTime = 0),
                                    (this._startTime = null),
                                    this._effect._update(null),
                                    e.applyDirtiedAnimation(this))
                            },
                            reverse: function () {
                                ;(this.playbackRate *= -1), this.play()
                            },
                            addEventListener: function (t, e) {
                                'function' == typeof e && 'finish' == t && this._finishHandlers.push(e)
                            },
                            removeEventListener: function (t, e) {
                                if ('finish' == t) {
                                    var i = this._finishHandlers.indexOf(e)
                                    i >= 0 && this._finishHandlers.splice(i, 1)
                                }
                            },
                            _fireEvents: function (t) {
                                if (this._isFinished) {
                                    if (!this._finishedFlag) {
                                        var e = new n(this, this._currentTime, t),
                                            i = this._finishHandlers.concat(this.onfinish ? [this.onfinish] : [])
                                        setTimeout(function () {
                                            i.forEach(function (t) {
                                                t.call(e.target, e)
                                            })
                                        }, 0),
                                            (this._finishedFlag = !0)
                                    }
                                } else this._finishedFlag = !1
                            },
                            _tick: function (t, e) {
                                this._idle ||
                                    this._paused ||
                                    (null == this._startTime
                                        ? e && (this.startTime = t - this._currentTime / this.playbackRate)
                                        : this._isFinished ||
                                          this._tickCurrentTime((t - this._startTime) * this.playbackRate)),
                                    e && ((this._currentTimePending = !1), this._fireEvents(t))
                            },
                            get _needsTick() {
                                return this.playState in { pending: 1, running: 1 } || !this._finishedFlag
                            },
                            _targetAnimations: function () {
                                var t = this._effect._target
                                return t._activeAnimations || (t._activeAnimations = []), t._activeAnimations
                            },
                            _markTarget: function () {
                                var t = this._targetAnimations()
                                ;-1 === t.indexOf(this) && t.push(this)
                            },
                            _unmarkTarget: function () {
                                var t = this._targetAnimations(),
                                    e = t.indexOf(this)
                                ;-1 !== e && t.splice(e, 1)
                            },
                        })
                })(ni, ri),
                (function (t, e, i) {
                    function n(t) {
                        var e = l
                        ;(l = []),
                            t < p.currentTime && (t = p.currentTime),
                            p._animations.sort(r),
                            (p._animations = a(t, !0, p._animations)[0]),
                            e.forEach(function (e) {
                                e[1](t)
                            }),
                            o()
                    }
                    function r(t, e) {
                        return t._sequenceNumber - e._sequenceNumber
                    }
                    function s() {
                        ;(this._animations = []),
                            (this.currentTime = window.performance && performance.now ? performance.now() : 0)
                    }
                    function o() {
                        _.forEach(function (t) {
                            t()
                        }),
                            (_.length = 0)
                    }
                    function a(t, i, n) {
                        ;(f = !0), (c = !1), (e.timeline.currentTime = t), (d = !1)
                        var r = [],
                            s = [],
                            o = [],
                            a = []
                        return (
                            n.forEach(function (e) {
                                e._tick(t, i),
                                    e._inEffect
                                        ? (s.push(e._effect), e._markTarget())
                                        : (r.push(e._effect), e._unmarkTarget()),
                                    e._needsTick && (d = !0)
                                var n = e._inEffect || e._needsTick
                                ;(e._inTimeline = n), n ? o.push(e) : a.push(e)
                            }),
                            _.push.apply(_, r),
                            _.push.apply(_, s),
                            d && requestAnimationFrame(function () {}),
                            (f = !1),
                            [o, a]
                        )
                    }
                    var h = window.requestAnimationFrame,
                        l = [],
                        u = 0
                    ;(window.requestAnimationFrame = function (t) {
                        var e = u++
                        return 0 == l.length && h(n), l.push([e, t]), e
                    }),
                        (window.cancelAnimationFrame = function (t) {
                            l.forEach(function (e) {
                                e[0] == t && (e[1] = function () {})
                            })
                        }),
                        (s.prototype = {
                            _play: function (i) {
                                i._timing = t.normalizeTimingInput(i.timing)
                                var n = new e.Animation(i)
                                return (
                                    (n._idle = !1),
                                    (n._timeline = this),
                                    this._animations.push(n),
                                    e.restart(),
                                    e.applyDirtiedAnimation(n),
                                    n
                                )
                            },
                        })
                    var d = !1,
                        c = !1
                    ;(e.restart = function () {
                        return d || ((d = !0), requestAnimationFrame(function () {}), (c = !0)), c
                    }),
                        (e.applyDirtiedAnimation = function (t) {
                            if (!f) {
                                t._markTarget()
                                var i = t._targetAnimations()
                                i.sort(r),
                                    a(e.timeline.currentTime, !1, i.slice())[1].forEach(function (t) {
                                        var e = p._animations.indexOf(t)
                                        ;-1 !== e && p._animations.splice(e, 1)
                                    }),
                                    o()
                            }
                        })
                    var _ = [],
                        f = !1,
                        p = new s()
                    e.timeline = p
                })(ni, ri),
                (function (t, e) {
                    function i(t, e) {
                        for (var i = 0, n = 0; n < t.length; n++) i += t[n] * e[n]
                        return i
                    }
                    function n(t, e) {
                        return [
                            t[0] * e[0] + t[4] * e[1] + t[8] * e[2] + t[12] * e[3],
                            t[1] * e[0] + t[5] * e[1] + t[9] * e[2] + t[13] * e[3],
                            t[2] * e[0] + t[6] * e[1] + t[10] * e[2] + t[14] * e[3],
                            t[3] * e[0] + t[7] * e[1] + t[11] * e[2] + t[15] * e[3],
                            t[0] * e[4] + t[4] * e[5] + t[8] * e[6] + t[12] * e[7],
                            t[1] * e[4] + t[5] * e[5] + t[9] * e[6] + t[13] * e[7],
                            t[2] * e[4] + t[6] * e[5] + t[10] * e[6] + t[14] * e[7],
                            t[3] * e[4] + t[7] * e[5] + t[11] * e[6] + t[15] * e[7],
                            t[0] * e[8] + t[4] * e[9] + t[8] * e[10] + t[12] * e[11],
                            t[1] * e[8] + t[5] * e[9] + t[9] * e[10] + t[13] * e[11],
                            t[2] * e[8] + t[6] * e[9] + t[10] * e[10] + t[14] * e[11],
                            t[3] * e[8] + t[7] * e[9] + t[11] * e[10] + t[15] * e[11],
                            t[0] * e[12] + t[4] * e[13] + t[8] * e[14] + t[12] * e[15],
                            t[1] * e[12] + t[5] * e[13] + t[9] * e[14] + t[13] * e[15],
                            t[2] * e[12] + t[6] * e[13] + t[10] * e[14] + t[14] * e[15],
                            t[3] * e[12] + t[7] * e[13] + t[11] * e[14] + t[15] * e[15],
                        ]
                    }
                    function r(t) {
                        var e = t.rad || 0
                        return ((t.deg || 0) / 360 + (t.grad || 0) / 400 + (t.turn || 0)) * (2 * Math.PI) + e
                    }
                    function s(t) {
                        switch (t.t) {
                            case 'rotatex':
                                var e = r(t.d[0])
                                return [
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    Math.cos(e),
                                    Math.sin(e),
                                    0,
                                    0,
                                    -Math.sin(e),
                                    Math.cos(e),
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                ]
                            case 'rotatey':
                                return (
                                    (e = r(t.d[0])),
                                    [
                                        Math.cos(e),
                                        0,
                                        -Math.sin(e),
                                        0,
                                        0,
                                        1,
                                        0,
                                        0,
                                        Math.sin(e),
                                        0,
                                        Math.cos(e),
                                        0,
                                        0,
                                        0,
                                        0,
                                        1,
                                    ]
                                )
                            case 'rotate':
                            case 'rotatez':
                                return (
                                    (e = r(t.d[0])),
                                    [
                                        Math.cos(e),
                                        Math.sin(e),
                                        0,
                                        0,
                                        -Math.sin(e),
                                        Math.cos(e),
                                        0,
                                        0,
                                        0,
                                        0,
                                        1,
                                        0,
                                        0,
                                        0,
                                        0,
                                        1,
                                    ]
                                )
                            case 'rotate3d':
                                var i = t.d[0],
                                    n = t.d[1],
                                    s = t.d[2],
                                    o = ((e = r(t.d[3])), i * i + n * n + s * s)
                                if (0 === o) (i = 1), (n = 0), (s = 0)
                                else if (1 !== o) {
                                    var a = Math.sqrt(o)
                                    ;(i /= a), (n /= a), (s /= a)
                                }
                                var h = Math.sin(e / 2),
                                    l = h * Math.cos(e / 2),
                                    u = h * h
                                return [
                                    1 - 2 * (n * n + s * s) * u,
                                    2 * (i * n * u + s * l),
                                    2 * (i * s * u - n * l),
                                    0,
                                    2 * (i * n * u - s * l),
                                    1 - 2 * (i * i + s * s) * u,
                                    2 * (n * s * u + i * l),
                                    0,
                                    2 * (i * s * u + n * l),
                                    2 * (n * s * u - i * l),
                                    1 - 2 * (i * i + n * n) * u,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                ]
                            case 'scale':
                                return [t.d[0], 0, 0, 0, 0, t.d[1], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                            case 'scalex':
                                return [t.d[0], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                            case 'scaley':
                                return [1, 0, 0, 0, 0, t.d[0], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                            case 'scalez':
                                return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, t.d[0], 0, 0, 0, 0, 1]
                            case 'scale3d':
                                return [t.d[0], 0, 0, 0, 0, t.d[1], 0, 0, 0, 0, t.d[2], 0, 0, 0, 0, 1]
                            case 'skew':
                                var d = r(t.d[0]),
                                    c = r(t.d[1])
                                return [1, Math.tan(c), 0, 0, Math.tan(d), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                            case 'skewx':
                                return (e = r(t.d[0])), [1, 0, 0, 0, Math.tan(e), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                            case 'skewy':
                                return (e = r(t.d[0])), [1, Math.tan(e), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                            case 'translate':
                                return [
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                    0,
                                    (i = t.d[0].px || 0),
                                    (n = t.d[1].px || 0),
                                    0,
                                    1,
                                ]
                            case 'translatex':
                                return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, (i = t.d[0].px || 0), 0, 0, 1]
                            case 'translatey':
                                return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, (n = t.d[0].px || 0), 0, 1]
                            case 'translatez':
                                return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, (s = t.d[0].px || 0), 1]
                            case 'translate3d':
                                return [
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                    0,
                                    (i = t.d[0].px || 0),
                                    (n = t.d[1].px || 0),
                                    (s = t.d[2].px || 0),
                                    1,
                                ]
                            case 'perspective':
                                return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, t.d[0].px ? -1 / t.d[0].px : 0, 0, 0, 0, 1]
                            case 'matrix':
                                return [t.d[0], t.d[1], 0, 0, t.d[2], t.d[3], 0, 0, 0, 0, 1, 0, t.d[4], t.d[5], 0, 1]
                            case 'matrix3d':
                                return t.d
                        }
                    }
                    function o(t) {
                        return 0 === t.length ? [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] : t.map(s).reduce(n)
                    }
                    var a = (function () {
                        function t(t) {
                            return (
                                t[0][0] * t[1][1] * t[2][2] +
                                t[1][0] * t[2][1] * t[0][2] +
                                t[2][0] * t[0][1] * t[1][2] -
                                t[0][2] * t[1][1] * t[2][0] -
                                t[1][2] * t[2][1] * t[0][0] -
                                t[2][2] * t[0][1] * t[1][0]
                            )
                        }
                        function e(t) {
                            var e = n(t)
                            return [t[0] / e, t[1] / e, t[2] / e]
                        }
                        function n(t) {
                            return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2])
                        }
                        function r(t, e, i, n) {
                            return [i * t[0] + n * e[0], i * t[1] + n * e[1], i * t[2] + n * e[2]]
                        }
                        return function (s) {
                            var o = [s.slice(0, 4), s.slice(4, 8), s.slice(8, 12), s.slice(12, 16)]
                            if (1 !== o[3][3]) return null
                            for (var a = [], h = 0; h < 4; h++) a.push(o[h].slice())
                            for (h = 0; h < 3; h++) a[h][3] = 0
                            if (0 === t(a)) return null
                            var l,
                                u = []
                            o[0][3] || o[1][3] || o[2][3]
                                ? (u.push(o[0][3]),
                                  u.push(o[1][3]),
                                  u.push(o[2][3]),
                                  u.push(o[3][3]),
                                  (l = (function (t, e) {
                                      for (var i = [], n = 0; n < 4; n++) {
                                          for (var r = 0, s = 0; s < 4; s++) r += t[s] * e[s][n]
                                          i.push(r)
                                      }
                                      return i
                                  })(
                                      u,
                                      (function (t) {
                                          return [
                                              [t[0][0], t[1][0], t[2][0], t[3][0]],
                                              [t[0][1], t[1][1], t[2][1], t[3][1]],
                                              [t[0][2], t[1][2], t[2][2], t[3][2]],
                                              [t[0][3], t[1][3], t[2][3], t[3][3]],
                                          ]
                                      })(
                                          (function (e) {
                                              for (
                                                  var i = 1 / t(e),
                                                      n = e[0][0],
                                                      r = e[0][1],
                                                      s = e[0][2],
                                                      o = e[1][0],
                                                      a = e[1][1],
                                                      h = e[1][2],
                                                      l = e[2][0],
                                                      u = e[2][1],
                                                      d = e[2][2],
                                                      c = [
                                                          [
                                                              (a * d - h * u) * i,
                                                              (s * u - r * d) * i,
                                                              (r * h - s * a) * i,
                                                              0,
                                                          ],
                                                          [
                                                              (h * l - o * d) * i,
                                                              (n * d - s * l) * i,
                                                              (s * o - n * h) * i,
                                                              0,
                                                          ],
                                                          [
                                                              (o * u - a * l) * i,
                                                              (l * r - n * u) * i,
                                                              (n * a - r * o) * i,
                                                              0,
                                                          ],
                                                      ],
                                                      _ = [],
                                                      f = 0;
                                                  f < 3;
                                                  f++
                                              ) {
                                                  for (var p = 0, m = 0; m < 3; m++) p += e[3][m] * c[m][f]
                                                  _.push(p)
                                              }
                                              return _.push(1), c.push(_), c
                                          })(a),
                                      ),
                                  )))
                                : (l = [0, 0, 0, 1])
                            var d = o[3].slice(0, 3),
                                c = []
                            c.push(o[0].slice(0, 3))
                            var _ = []
                            _.push(n(c[0])), (c[0] = e(c[0]))
                            var f = []
                            c.push(o[1].slice(0, 3)),
                                f.push(i(c[0], c[1])),
                                (c[1] = r(c[1], c[0], 1, -f[0])),
                                _.push(n(c[1])),
                                (c[1] = e(c[1])),
                                (f[0] /= _[1]),
                                c.push(o[2].slice(0, 3)),
                                f.push(i(c[0], c[2])),
                                (c[2] = r(c[2], c[0], 1, -f[1])),
                                f.push(i(c[1], c[2])),
                                (c[2] = r(c[2], c[1], 1, -f[2])),
                                _.push(n(c[2])),
                                (c[2] = e(c[2])),
                                (f[1] /= _[2]),
                                (f[2] /= _[2])
                            var p = (function (t, e) {
                                return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
                            })(c[1], c[2])
                            if (i(c[0], p) < 0)
                                for (h = 0; h < 3; h++) (_[h] *= -1), (c[h][0] *= -1), (c[h][1] *= -1), (c[h][2] *= -1)
                            var m,
                                g,
                                v = c[0][0] + c[1][1] + c[2][2] + 1
                            return (
                                v > 1e-4
                                    ? ((m = 0.5 / Math.sqrt(v)),
                                      (g = [
                                          (c[2][1] - c[1][2]) * m,
                                          (c[0][2] - c[2][0]) * m,
                                          (c[1][0] - c[0][1]) * m,
                                          0.25 / m,
                                      ]))
                                    : c[0][0] > c[1][1] && c[0][0] > c[2][2]
                                    ? (g = [
                                          0.25 * (m = 2 * Math.sqrt(1 + c[0][0] - c[1][1] - c[2][2])),
                                          (c[0][1] + c[1][0]) / m,
                                          (c[0][2] + c[2][0]) / m,
                                          (c[2][1] - c[1][2]) / m,
                                      ])
                                    : c[1][1] > c[2][2]
                                    ? ((m = 2 * Math.sqrt(1 + c[1][1] - c[0][0] - c[2][2])),
                                      (g = [
                                          (c[0][1] + c[1][0]) / m,
                                          0.25 * m,
                                          (c[1][2] + c[2][1]) / m,
                                          (c[0][2] - c[2][0]) / m,
                                      ]))
                                    : ((m = 2 * Math.sqrt(1 + c[2][2] - c[0][0] - c[1][1])),
                                      (g = [
                                          (c[0][2] + c[2][0]) / m,
                                          (c[1][2] + c[2][1]) / m,
                                          0.25 * m,
                                          (c[1][0] - c[0][1]) / m,
                                      ])),
                                [d, _, f, g, l]
                            )
                        }
                    })()
                    ;(t.dot = i),
                        (t.makeMatrixDecomposition = function (t) {
                            return [a(o(t))]
                        }),
                        (t.transformListToMatrix = o)
                })(ri),
                (function (t) {
                    function e(t, e) {
                        var i = t.exec(e)
                        if (i) return [(i = t.ignoreCase ? i[0].toLowerCase() : i[0]), e.substr(i.length)]
                    }
                    function i(t, e) {
                        var i = t((e = e.replace(/^\s*/, '')))
                        if (i) return [i[0], i[1].replace(/^\s*/, '')]
                    }
                    function n(t, e, i, n, r) {
                        for (
                            var s = [],
                                o = [],
                                a = [],
                                h = (function (t, e) {
                                    for (var i = t, n = e; i && n; ) i > n ? (i %= n) : (n %= i)
                                    return (t * e) / (i + n)
                                })(n.length, r.length),
                                l = 0;
                            l < h;
                            l++
                        ) {
                            var u = e(n[l % n.length], r[l % r.length])
                            if (!u) return
                            s.push(u[0]), o.push(u[1]), a.push(u[2])
                        }
                        return [
                            s,
                            o,
                            function (e) {
                                var n = e
                                    .map(function (t, e) {
                                        return a[e](t)
                                    })
                                    .join(i)
                                return t ? t(n) : n
                            },
                        ]
                    }
                    ;(t.consumeToken = e),
                        (t.consumeTrimmed = i),
                        (t.consumeRepeated = function (t, n, r) {
                            t = i.bind(null, t)
                            for (var s = []; ; ) {
                                var o = t(r)
                                if (!o) return [s, r]
                                if ((s.push(o[0]), !(o = e(n, (r = o[1]))) || '' == o[1])) return [s, r]
                                r = o[1]
                            }
                        }),
                        (t.consumeParenthesised = function (t, e) {
                            for (var i = 0, n = 0; n < e.length && (!/\s|,/.test(e[n]) || 0 != i); n++)
                                if ('(' == e[n]) i++
                                else if (')' == e[n] && (0 == --i && n++, i <= 0)) break
                            var r = t(e.substr(0, n))
                            return null == r ? void 0 : [r, e.substr(n)]
                        }),
                        (t.ignore = function (t) {
                            return function (e) {
                                var i = t(e)
                                return i && (i[0] = void 0), i
                            }
                        }),
                        (t.optional = function (t, e) {
                            return function (i) {
                                return t(i) || [e, i]
                            }
                        }),
                        (t.consumeList = function (e, i) {
                            for (var n = [], r = 0; r < e.length; r++) {
                                var s = t.consumeTrimmed(e[r], i)
                                if (!s || '' == s[0]) return
                                void 0 !== s[0] && n.push(s[0]), (i = s[1])
                            }
                            if ('' == i) return n
                        }),
                        (t.mergeNestedRepeated = n.bind(null, null)),
                        (t.mergeWrappedNestedRepeated = n),
                        (t.mergeList = function (t, e, i) {
                            for (var n = [], r = [], s = [], o = 0, a = 0; a < i.length; a++)
                                if ('function' == typeof i[a]) {
                                    var h = i[a](t[o], e[o++])
                                    n.push(h[0]), r.push(h[1]), s.push(h[2])
                                } else
                                    !(function (t) {
                                        n.push(!1),
                                            r.push(!1),
                                            s.push(function () {
                                                return i[t]
                                            })
                                    })(a)
                            return [
                                n,
                                r,
                                function (t) {
                                    for (var e = '', i = 0; i < t.length; i++) e += s[i](t[i])
                                    return e
                                },
                            ]
                        })
                })(ri),
                (function (t) {
                    function e(e) {
                        var i = { inset: !1, lengths: [], color: null },
                            n = t.consumeRepeated(
                                function (e) {
                                    var n = t.consumeToken(/^inset/i, e)
                                    return n
                                        ? ((i.inset = !0), n)
                                        : (n = t.consumeLengthOrPercent(e))
                                        ? (i.lengths.push(n[0]), n)
                                        : (n = t.consumeColor(e))
                                        ? ((i.color = n[0]), n)
                                        : void 0
                                },
                                /^/,
                                e,
                            )
                        if (n && n[0].length) return [i, n[1]]
                    }
                    var i = function (e, i, n, r) {
                        function s(t) {
                            return {
                                inset: t,
                                color: [0, 0, 0, 0],
                                lengths: [{ px: 0 }, { px: 0 }, { px: 0 }, { px: 0 }],
                            }
                        }
                        for (var o = [], a = [], h = 0; h < n.length || h < r.length; h++) {
                            var l = n[h] || s(r[h].inset),
                                u = r[h] || s(n[h].inset)
                            o.push(l), a.push(u)
                        }
                        return t.mergeNestedRepeated(e, i, o, a)
                    }.bind(
                        null,
                        function (e, i) {
                            for (; e.lengths.length < Math.max(e.lengths.length, i.lengths.length); )
                                e.lengths.push({ px: 0 })
                            for (; i.lengths.length < Math.max(e.lengths.length, i.lengths.length); )
                                i.lengths.push({ px: 0 })
                            if (e.inset == i.inset && !!e.color == !!i.color) {
                                for (var n, r = [], s = [[], 0], o = [[], 0], a = 0; a < e.lengths.length; a++) {
                                    var h = t.mergeDimensions(e.lengths[a], i.lengths[a], 2 == a)
                                    s[0].push(h[0]), o[0].push(h[1]), r.push(h[2])
                                }
                                if (e.color && i.color) {
                                    var l = t.mergeColors(e.color, i.color)
                                    ;(s[1] = l[0]), (o[1] = l[1]), (n = l[2])
                                }
                                return [
                                    s,
                                    o,
                                    function (t) {
                                        for (var i = e.inset ? 'inset ' : ' ', s = 0; s < r.length; s++)
                                            i += r[s](t[0][s]) + ' '
                                        return n && (i += n(t[1])), i
                                    },
                                ]
                            }
                        },
                        ', ',
                    )
                    t.addPropertiesHandler(
                        function (i) {
                            var n = t.consumeRepeated(e, /^,/, i)
                            if (n && '' == n[1]) return n[0]
                        },
                        i,
                        ['box-shadow', 'text-shadow'],
                    )
                })(ri),
                (function (t, e) {
                    function i(t) {
                        return t.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')
                    }
                    function n(t, e, i) {
                        return Math.min(e, Math.max(t, i))
                    }
                    function r(t) {
                        if (/^\s*[-+]?(\d*\.)?\d+\s*$/.test(t)) return Number(t)
                    }
                    function s(t, e) {
                        return function (r, s) {
                            return [
                                r,
                                s,
                                function (r) {
                                    return i(n(t, e, r))
                                },
                            ]
                        }
                    }
                    function o(t) {
                        var e = t.trim().split(/\s*[\s,]\s*/)
                        if (0 !== e.length) {
                            for (var i = [], n = 0; n < e.length; n++) {
                                var s = r(e[n])
                                if (void 0 === s) return
                                i.push(s)
                            }
                            return i
                        }
                    }
                    ;(t.clamp = n),
                        t.addPropertiesHandler(
                            o,
                            function (t, e) {
                                if (t.length == e.length)
                                    return [
                                        t,
                                        e,
                                        function (t) {
                                            return t.map(i).join(' ')
                                        },
                                    ]
                            },
                            ['stroke-dasharray'],
                        ),
                        t.addPropertiesHandler(r, s(0, 1 / 0), ['border-image-width', 'line-height']),
                        t.addPropertiesHandler(r, s(0, 1), ['opacity', 'shape-image-threshold']),
                        t.addPropertiesHandler(
                            r,
                            function (t, e) {
                                if (0 != t) return s(0, 1 / 0)(t, e)
                            },
                            ['flex-grow', 'flex-shrink'],
                        ),
                        t.addPropertiesHandler(
                            r,
                            function (t, e) {
                                return [
                                    t,
                                    e,
                                    function (t) {
                                        return Math.round(n(1, 1 / 0, t))
                                    },
                                ]
                            },
                            ['orphans', 'widows'],
                        ),
                        t.addPropertiesHandler(
                            r,
                            function (t, e) {
                                return [t, e, Math.round]
                            },
                            ['z-index'],
                        ),
                        (t.parseNumber = r),
                        (t.parseNumberList = o),
                        (t.mergeNumbers = function (t, e) {
                            return [t, e, i]
                        }),
                        (t.numberToString = i)
                })(ri),
                (function (t, e) {
                    t.addPropertiesHandler(
                        String,
                        function (t, e) {
                            if ('visible' == t || 'visible' == e)
                                return [
                                    0,
                                    1,
                                    function (i) {
                                        return i <= 0 ? t : i >= 1 ? e : 'visible'
                                    },
                                ]
                        },
                        ['visibility'],
                    )
                })(ri),
                (function (t, e) {
                    function i(t) {
                        ;(t = t.trim()), (s.fillStyle = '#000'), (s.fillStyle = t)
                        var e = s.fillStyle
                        if (((s.fillStyle = '#fff'), (s.fillStyle = t), e == s.fillStyle)) {
                            s.fillRect(0, 0, 1, 1)
                            var i = s.getImageData(0, 0, 1, 1).data
                            s.clearRect(0, 0, 1, 1)
                            var n = i[3] / 255
                            return [i[0] * n, i[1] * n, i[2] * n, n]
                        }
                    }
                    function n(e, i) {
                        return [
                            e,
                            i,
                            function (e) {
                                function i(t) {
                                    return Math.max(0, Math.min(255, t))
                                }
                                if (e[3]) for (var n = 0; n < 3; n++) e[n] = Math.round(i(e[n] / e[3]))
                                return (e[3] = t.numberToString(t.clamp(0, 1, e[3]))), 'rgba(' + e.join(',') + ')'
                            },
                        ]
                    }
                    var r = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')
                    r.width = r.height = 1
                    var s = r.getContext('2d')
                    t.addPropertiesHandler(i, n, [
                        'background-color',
                        'border-bottom-color',
                        'border-left-color',
                        'border-right-color',
                        'border-top-color',
                        'color',
                        'fill',
                        'flood-color',
                        'lighting-color',
                        'outline-color',
                        'stop-color',
                        'stroke',
                        'text-decoration-color',
                    ]),
                        (t.consumeColor = t.consumeParenthesised.bind(null, i)),
                        (t.mergeColors = n)
                })(ri),
                (function (t, e) {
                    function i(t) {
                        function e() {
                            var e = o.exec(t)
                            s = e ? e[0] : void 0
                        }
                        function i() {
                            if ('(' !== s)
                                return (function () {
                                    var t = Number(s)
                                    return e(), t
                                })()
                            e()
                            var t = r()
                            return ')' !== s ? NaN : (e(), t)
                        }
                        function n() {
                            for (var t = i(); '*' === s || '/' === s; ) {
                                var n = s
                                e()
                                var r = i()
                                '*' === n ? (t *= r) : (t /= r)
                            }
                            return t
                        }
                        function r() {
                            for (var t = n(); '+' === s || '-' === s; ) {
                                var i = s
                                e()
                                var r = n()
                                '+' === i ? (t += r) : (t -= r)
                            }
                            return t
                        }
                        var s,
                            o = /([\+\-\w\.]+|[\(\)\*\/])/g
                        return e(), r()
                    }
                    function n(t, e) {
                        if ('0' == (e = e.trim().toLowerCase()) && 'px'.search(t) >= 0) return { px: 0 }
                        if (/^[^(]*$|^calc/.test(e)) {
                            e = e.replace(/calc\(/g, '(')
                            var n = {}
                            e = e.replace(t, function (t) {
                                return (n[t] = null), 'U' + t
                            })
                            for (
                                var r = 'U(' + t.source + ')',
                                    s = e
                                        .replace(/[-+]?(\d*\.)?\d+([Ee][-+]?\d+)?/g, 'N')
                                        .replace(new RegExp('N' + r, 'g'), 'D')
                                        .replace(/\s[+-]\s/g, 'O')
                                        .replace(/\s/g, ''),
                                    o = [/N\*(D)/g, /(N|D)[*\/]N/g, /(N|D)O\1/g, /\((N|D)\)/g],
                                    a = 0;
                                a < o.length;

                            )
                                o[a].test(s) ? ((s = s.replace(o[a], '$1')), (a = 0)) : a++
                            if ('D' == s) {
                                for (var h in n) {
                                    var l = i(e.replace(new RegExp('U' + h, 'g'), '').replace(new RegExp(r, 'g'), '*0'))
                                    if (!isFinite(l)) return
                                    n[h] = l
                                }
                                return n
                            }
                        }
                    }
                    function r(t, e) {
                        return s(t, e, !0)
                    }
                    function s(e, i, n) {
                        var r,
                            s = []
                        for (r in e) s.push(r)
                        for (r in i) s.indexOf(r) < 0 && s.push(r)
                        return (
                            (e = s.map(function (t) {
                                return e[t] || 0
                            })),
                            (i = s.map(function (t) {
                                return i[t] || 0
                            })),
                            [
                                e,
                                i,
                                function (e) {
                                    var i = e
                                        .map(function (i, r) {
                                            return (
                                                1 == e.length && n && (i = Math.max(i, 0)), t.numberToString(i) + s[r]
                                            )
                                        })
                                        .join(' + ')
                                    return e.length > 1 ? 'calc(' + i + ')' : i
                                },
                            ]
                        )
                    }
                    var o = 'px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc',
                        a = n.bind(null, new RegExp(o, 'g')),
                        h = n.bind(null, new RegExp(o + '|%', 'g')),
                        l = n.bind(null, /deg|rad|grad|turn/g)
                    ;(t.parseLength = a),
                        (t.parseLengthOrPercent = h),
                        (t.consumeLengthOrPercent = t.consumeParenthesised.bind(null, h)),
                        (t.parseAngle = l),
                        (t.mergeDimensions = s)
                    var u = t.consumeParenthesised.bind(null, a),
                        d = t.consumeRepeated.bind(void 0, u, /^/),
                        c = t.consumeRepeated.bind(void 0, d, /^,/)
                    t.consumeSizePairList = c
                    var _ = t.mergeNestedRepeated.bind(void 0, r, ' '),
                        f = t.mergeNestedRepeated.bind(void 0, _, ',')
                    ;(t.mergeNonNegativeSizePair = _),
                        t.addPropertiesHandler(
                            function (t) {
                                var e = c(t)
                                if (e && '' == e[1]) return e[0]
                            },
                            f,
                            ['background-size'],
                        ),
                        t.addPropertiesHandler(h, r, [
                            'border-bottom-width',
                            'border-image-width',
                            'border-left-width',
                            'border-right-width',
                            'border-top-width',
                            'flex-basis',
                            'font-size',
                            'height',
                            'line-height',
                            'max-height',
                            'max-width',
                            'outline-width',
                            'width',
                        ]),
                        t.addPropertiesHandler(h, s, [
                            'border-bottom-left-radius',
                            'border-bottom-right-radius',
                            'border-top-left-radius',
                            'border-top-right-radius',
                            'bottom',
                            'left',
                            'letter-spacing',
                            'margin-bottom',
                            'margin-left',
                            'margin-right',
                            'margin-top',
                            'min-height',
                            'min-width',
                            'outline-offset',
                            'padding-bottom',
                            'padding-left',
                            'padding-right',
                            'padding-top',
                            'perspective',
                            'right',
                            'shape-margin',
                            'stroke-dashoffset',
                            'text-indent',
                            'top',
                            'vertical-align',
                            'word-spacing',
                        ])
                })(ri),
                (function (t, e) {
                    function i(e) {
                        return t.consumeLengthOrPercent(e) || t.consumeToken(/^auto/, e)
                    }
                    function n(e) {
                        var n = t.consumeList(
                            [
                                t.ignore(t.consumeToken.bind(null, /^rect/)),
                                t.ignore(t.consumeToken.bind(null, /^\(/)),
                                t.consumeRepeated.bind(null, i, /^,/),
                                t.ignore(t.consumeToken.bind(null, /^\)/)),
                            ],
                            e,
                        )
                        if (n && 4 == n[0].length) return n[0]
                    }
                    var r = t.mergeWrappedNestedRepeated.bind(
                        null,
                        function (t) {
                            return 'rect(' + t + ')'
                        },
                        function (e, i) {
                            return 'auto' == e || 'auto' == i
                                ? [
                                      !0,
                                      !1,
                                      function (n) {
                                          var r = n ? e : i
                                          if ('auto' == r) return 'auto'
                                          var s = t.mergeDimensions(r, r)
                                          return s[2](s[0])
                                      },
                                  ]
                                : t.mergeDimensions(e, i)
                        },
                        ', ',
                    )
                    ;(t.parseBox = n), (t.mergeBoxes = r), t.addPropertiesHandler(n, r, ['clip'])
                })(ri),
                (function (t, e) {
                    function i(t) {
                        return function (e) {
                            var i = 0
                            return t.map(function (t) {
                                return t === l ? e[i++] : t
                            })
                        }
                    }
                    function n(t) {
                        return t
                    }
                    function r(e) {
                        if ('none' == (e = e.toLowerCase().trim())) return []
                        for (var i, n = /\s*(\w+)\(([^)]*)\)/g, r = [], s = 0; (i = n.exec(e)); ) {
                            if (i.index != s) return
                            s = i.index + i[0].length
                            var o = i[1],
                                a = c[o]
                            if (!a) return
                            var h = i[2].split(','),
                                l = a[0]
                            if (l.length < h.length) return
                            for (var _ = [], f = 0; f < l.length; f++) {
                                var p,
                                    m = h[f],
                                    g = l[f]
                                if (
                                    void 0 ===
                                    (p = m
                                        ? {
                                              A: function (e) {
                                                  return '0' == e.trim() ? d : t.parseAngle(e)
                                              },
                                              N: t.parseNumber,
                                              T: t.parseLengthOrPercent,
                                              L: t.parseLength,
                                          }[g.toUpperCase()](m)
                                        : { a: d, n: _[0], t: u }[g])
                                )
                                    return
                                _.push(p)
                            }
                            if ((r.push({ t: o, d: _ }), n.lastIndex == e.length)) return r
                        }
                    }
                    function s(t) {
                        return t.toFixed(6).replace('.000000', '')
                    }
                    function o(e, i) {
                        if (e.decompositionPair !== i) {
                            e.decompositionPair = i
                            var n = t.makeMatrixDecomposition(e)
                        }
                        if (i.decompositionPair !== e) {
                            i.decompositionPair = e
                            var r = t.makeMatrixDecomposition(i)
                        }
                        return null == n[0] || null == r[0]
                            ? [
                                  [!1],
                                  [!0],
                                  function (t) {
                                      return t ? i[0].d : e[0].d
                                  },
                              ]
                            : (n[0].push(0),
                              r[0].push(1),
                              [
                                  n,
                                  r,
                                  function (e) {
                                      var i = t.quat(n[0][3], r[0][3], e[5])
                                      return t.composeMatrix(e[0], e[1], e[2], i, e[4]).map(s).join(',')
                                  },
                              ])
                    }
                    function a(t) {
                        return t.replace(/[xy]/, '')
                    }
                    function h(t) {
                        return t.replace(/(x|y|z|3d)?$/, '3d')
                    }
                    var l = null,
                        u = { px: 0 },
                        d = { deg: 0 },
                        c = {
                            matrix: ['NNNNNN', [l, l, 0, 0, l, l, 0, 0, 0, 0, 1, 0, l, l, 0, 1], n],
                            matrix3d: ['NNNNNNNNNNNNNNNN', n],
                            rotate: ['A'],
                            rotatex: ['A'],
                            rotatey: ['A'],
                            rotatez: ['A'],
                            rotate3d: ['NNNA'],
                            perspective: ['L'],
                            scale: ['Nn', i([l, l, 1]), n],
                            scalex: ['N', i([l, 1, 1]), i([l, 1])],
                            scaley: ['N', i([1, l, 1]), i([1, l])],
                            scalez: ['N', i([1, 1, l])],
                            scale3d: ['NNN', n],
                            skew: ['Aa', null, n],
                            skewx: ['A', null, i([l, d])],
                            skewy: ['A', null, i([d, l])],
                            translate: ['Tt', i([l, l, u]), n],
                            translatex: ['T', i([l, u, u]), i([l, u])],
                            translatey: ['T', i([u, l, u]), i([u, l])],
                            translatez: ['L', i([u, u, l])],
                            translate3d: ['TTL', n],
                        }
                    t.addPropertiesHandler(
                        r,
                        function (e, i) {
                            var n = t.makeMatrixDecomposition && !0,
                                r = !1
                            if (!e.length || !i.length) {
                                e.length || ((r = !0), (e = i), (i = []))
                                for (var s = 0; s < e.length; s++) {
                                    var l = e[s].t,
                                        u = e[s].d,
                                        d = 'scale' == l.substr(0, 5) ? 1 : 0
                                    i.push({
                                        t: l,
                                        d: u.map(function (t) {
                                            if ('number' == typeof t) return d
                                            var e = {}
                                            for (var i in t) e[i] = d
                                            return e
                                        }),
                                    })
                                }
                            }
                            var _ = function (t, e) {
                                    return (
                                        ('perspective' == t && 'perspective' == e) ||
                                        (('matrix' == t || 'matrix3d' == t) && ('matrix' == e || 'matrix3d' == e))
                                    )
                                },
                                f = [],
                                p = [],
                                m = []
                            if (e.length != i.length) {
                                if (!n) return
                                ;(f = [(T = o(e, i))[0]]), (p = [T[1]]), (m = [['matrix', [T[2]]]])
                            } else
                                for (s = 0; s < e.length; s++) {
                                    var g = e[s].t,
                                        v = i[s].t,
                                        y = e[s].d,
                                        b = i[s].d,
                                        w = c[g],
                                        S = c[v]
                                    if (_(g, v)) {
                                        if (!n) return
                                        var T = o([e[s]], [i[s]])
                                        f.push(T[0]), p.push(T[1]), m.push(['matrix', [T[2]]])
                                    } else {
                                        if (g == v) l = g
                                        else if (w[2] && S[2] && a(g) == a(v)) (l = a(g)), (y = w[2](y)), (b = S[2](b))
                                        else {
                                            if (!w[1] || !S[1] || h(g) != h(v)) {
                                                if (!n) return
                                                ;(f = [(T = o(e, i))[0]]), (p = [T[1]]), (m = [['matrix', [T[2]]]])
                                                break
                                            }
                                            ;(l = h(g)), (y = w[1](y)), (b = S[1](b))
                                        }
                                        for (var D = [], x = [], A = [], k = 0; k < y.length; k++)
                                            (T = ('number' == typeof y[k] ? t.mergeNumbers : t.mergeDimensions)(
                                                y[k],
                                                b[k],
                                            )),
                                                (D[k] = T[0]),
                                                (x[k] = T[1]),
                                                A.push(T[2])
                                        f.push(D), p.push(x), m.push([l, A])
                                    }
                                }
                            if (r) {
                                var E = f
                                ;(f = p), (p = E)
                            }
                            return [
                                f,
                                p,
                                function (t) {
                                    return t
                                        .map(function (t, e) {
                                            var i = t
                                                .map(function (t, i) {
                                                    return m[e][1][i](t)
                                                })
                                                .join(',')
                                            return (
                                                'matrix' == m[e][0] &&
                                                    16 == i.split(',').length &&
                                                    (m[e][0] = 'matrix3d'),
                                                m[e][0] + '(' + i + ')'
                                            )
                                        })
                                        .join(' ')
                                },
                            ]
                        },
                        ['transform'],
                    ),
                        (t.transformToSvgMatrix = function (e) {
                            var i = t.transformListToMatrix(r(e))
                            return (
                                'matrix(' +
                                s(i[0]) +
                                ' ' +
                                s(i[1]) +
                                ' ' +
                                s(i[4]) +
                                ' ' +
                                s(i[5]) +
                                ' ' +
                                s(i[12]) +
                                ' ' +
                                s(i[13]) +
                                ')'
                            )
                        })
                })(ri),
                (function (t) {
                    function e(e) {
                        return (
                            (e = 100 * Math.round(e / 100)),
                            400 === (e = t.clamp(100, 900, e)) ? 'normal' : 700 === e ? 'bold' : String(e)
                        )
                    }
                    t.addPropertiesHandler(
                        function (t) {
                            var e = Number(t)
                            if (!(isNaN(e) || e < 100 || e > 900 || e % 100 != 0)) return e
                        },
                        function (t, i) {
                            return [t, i, e]
                        },
                        ['font-weight'],
                    )
                })(ri),
                (function (t) {
                    function e(t) {
                        var e = {}
                        for (var i in t) e[i] = -t[i]
                        return e
                    }
                    function i(e) {
                        return t.consumeToken(/^(left|center|right|top|bottom)\b/i, e) || t.consumeLengthOrPercent(e)
                    }
                    function n(e, n) {
                        var r = t.consumeRepeated(i, /^/, n)
                        if (r && '' == r[1]) {
                            var o = r[0]
                            if (
                                ((o[0] = o[0] || 'center'),
                                (o[1] = o[1] || 'center'),
                                3 == e && (o[2] = o[2] || { px: 0 }),
                                o.length == e)
                            ) {
                                if (/top|bottom/.test(o[0]) || /left|right/.test(o[1])) {
                                    var a = o[0]
                                    ;(o[0] = o[1]), (o[1] = a)
                                }
                                if (/left|right|center|Object/.test(o[0]) && /top|bottom|center|Object/.test(o[1]))
                                    return o.map(function (t) {
                                        return 'object' == typeof t ? t : s[t]
                                    })
                            }
                        }
                    }
                    function r(n) {
                        var r = t.consumeRepeated(i, /^/, n)
                        if (r) {
                            for (
                                var o = r[0], a = [{ '%': 50 }, { '%': 50 }], h = 0, l = !1, u = 0;
                                u < o.length;
                                u++
                            ) {
                                var d = o[u]
                                'string' == typeof d
                                    ? ((l = /bottom|right/.test(d)),
                                      (a[(h = { left: 0, right: 0, center: h, top: 1, bottom: 1 }[d])] = s[d]),
                                      'center' == d && h++)
                                    : (l && ((d = e(d))['%'] = (d['%'] || 0) + 100), (a[h] = d), h++, (l = !1))
                            }
                            return [a, r[1]]
                        }
                    }
                    var s = {
                            left: { '%': 0 },
                            center: { '%': 50 },
                            right: { '%': 100 },
                            top: { '%': 0 },
                            bottom: { '%': 100 },
                        },
                        o = t.mergeNestedRepeated.bind(null, t.mergeDimensions, ' ')
                    t.addPropertiesHandler(n.bind(null, 3), o, ['transform-origin']),
                        t.addPropertiesHandler(n.bind(null, 2), o, ['perspective-origin']),
                        (t.consumePosition = r),
                        (t.mergeOffsetList = o)
                    var a = t.mergeNestedRepeated.bind(null, o, ', ')
                    t.addPropertiesHandler(
                        function (e) {
                            var i = t.consumeRepeated(r, /^,/, e)
                            if (i && '' == i[1]) return i[0]
                        },
                        a,
                        ['background-position', 'object-position'],
                    )
                })(ri),
                (function (t) {
                    var e = t.consumeParenthesised.bind(null, t.parseLengthOrPercent),
                        i = t.consumeRepeated.bind(void 0, e, /^/),
                        n = t.mergeNestedRepeated.bind(void 0, t.mergeDimensions, ' '),
                        r = t.mergeNestedRepeated.bind(void 0, n, ',')
                    t.addPropertiesHandler(
                        function (n) {
                            var r = t.consumeToken(/^circle/, n)
                            if (r && r[0])
                                return ['circle'].concat(
                                    t.consumeList(
                                        [
                                            t.ignore(t.consumeToken.bind(void 0, /^\(/)),
                                            e,
                                            t.ignore(t.consumeToken.bind(void 0, /^at/)),
                                            t.consumePosition,
                                            t.ignore(t.consumeToken.bind(void 0, /^\)/)),
                                        ],
                                        r[1],
                                    ),
                                )
                            var s = t.consumeToken(/^ellipse/, n)
                            if (s && s[0])
                                return ['ellipse'].concat(
                                    t.consumeList(
                                        [
                                            t.ignore(t.consumeToken.bind(void 0, /^\(/)),
                                            i,
                                            t.ignore(t.consumeToken.bind(void 0, /^at/)),
                                            t.consumePosition,
                                            t.ignore(t.consumeToken.bind(void 0, /^\)/)),
                                        ],
                                        s[1],
                                    ),
                                )
                            var o = t.consumeToken(/^polygon/, n)
                            return o && o[0]
                                ? ['polygon'].concat(
                                      t.consumeList(
                                          [
                                              t.ignore(t.consumeToken.bind(void 0, /^\(/)),
                                              t.optional(
                                                  t.consumeToken.bind(void 0, /^nonzero\s*,|^evenodd\s*,/),
                                                  'nonzero,',
                                              ),
                                              t.consumeSizePairList,
                                              t.ignore(t.consumeToken.bind(void 0, /^\)/)),
                                          ],
                                          o[1],
                                      ),
                                  )
                                : void 0
                        },
                        function (e, i) {
                            if (e[0] === i[0])
                                return 'circle' == e[0]
                                    ? t.mergeList(e.slice(1), i.slice(1), [
                                          'circle(',
                                          t.mergeDimensions,
                                          ' at ',
                                          t.mergeOffsetList,
                                          ')',
                                      ])
                                    : 'ellipse' == e[0]
                                    ? t.mergeList(e.slice(1), i.slice(1), [
                                          'ellipse(',
                                          t.mergeNonNegativeSizePair,
                                          ' at ',
                                          t.mergeOffsetList,
                                          ')',
                                      ])
                                    : 'polygon' == e[0] && e[1] == i[1]
                                    ? t.mergeList(e.slice(2), i.slice(2), ['polygon(', e[1], r, ')'])
                                    : void 0
                        },
                        ['shape-outside'],
                    )
                })(ri),
                (function (t, e) {
                    function i(t, e) {
                        e.concat([t]).forEach(function (e) {
                            e in document.documentElement.style && (n[t] = e), (r[e] = t)
                        })
                    }
                    var n = {},
                        r = {}
                    i('transform', ['webkitTransform', 'msTransform']),
                        i('transformOrigin', ['webkitTransformOrigin']),
                        i('perspective', ['webkitPerspective']),
                        i('perspectiveOrigin', ['webkitPerspectiveOrigin']),
                        (t.propertyName = function (t) {
                            return n[t] || t
                        }),
                        (t.unprefixedPropertyName = function (t) {
                            return r[t] || t
                        })
                })(ri)
        })(),
        (function () {
            if (void 0 === document.createElement('div').animate([]).oncancel) {
                if (window.performance && performance.now)
                    var t = function () {
                        return performance.now()
                    }
                else
                    t = function () {
                        return Date.now()
                    }
                var e = function (t, e, i) {
                        ;(this.target = t),
                            (this.currentTime = e),
                            (this.timelineTime = i),
                            (this.type = 'cancel'),
                            (this.bubbles = !1),
                            (this.cancelable = !1),
                            (this.currentTarget = t),
                            (this.defaultPrevented = !1),
                            (this.eventPhase = Event.AT_TARGET),
                            (this.timeStamp = Date.now())
                    },
                    i = window.Element.prototype.animate
                window.Element.prototype.animate = function (n, r) {
                    var s = i.call(this, n, r)
                    ;(s._cancelHandlers = []), (s.oncancel = null)
                    var o = s.cancel
                    s.cancel = function () {
                        o.call(this)
                        var i = new e(this, null, t()),
                            n = this._cancelHandlers.concat(this.oncancel ? [this.oncancel] : [])
                        setTimeout(function () {
                            n.forEach(function (t) {
                                t.call(i.target, i)
                            })
                        }, 0)
                    }
                    var a = s.addEventListener
                    s.addEventListener = function (t, e) {
                        'function' == typeof e && 'cancel' == t ? this._cancelHandlers.push(e) : a.call(this, t, e)
                    }
                    var h = s.removeEventListener
                    return (
                        (s.removeEventListener = function (t, e) {
                            if ('cancel' == t) {
                                var i = this._cancelHandlers.indexOf(e)
                                i >= 0 && this._cancelHandlers.splice(i, 1)
                            } else h.call(this, t, e)
                        }),
                        s
                    )
                }
            }
        })(),
        (function (t) {
            var e = document.documentElement,
                i = null,
                n = !1
            try {
                var r = '0' == getComputedStyle(e).getPropertyValue('opacity') ? '1' : '0'
                ;((i = e.animate({ opacity: [r, r] }, { duration: 1 })).currentTime = 0),
                    (n = getComputedStyle(e).getPropertyValue('opacity') == r)
            } catch (t) {
            } finally {
                i && i.cancel()
            }
            if (!n) {
                var s = window.Element.prototype.animate
                window.Element.prototype.animate = function (e, i) {
                    return (
                        window.Symbol &&
                            Symbol.iterator &&
                            Array.prototype.from &&
                            e[Symbol.iterator] &&
                            (e = Array.from(e)),
                        Array.isArray(e) || null === e || (e = t.convertToArrayForm(e)),
                        s.call(this, e, i)
                    )
                }
            }
        })(ni),
        (window.MetaGallery = li)
})
