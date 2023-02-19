!(function (t) {
    'function' == typeof define && define.amd ? define(t) : t()
})(function () {
    'use strict'
    var t =
        'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : {}
    function e(t) {
        var e = { exports: {} }
        return t(e, e.exports), e.exports
    }
    e(function (t, e) {
        t.exports = (function () {
            var t = function () {
                    if (!window.Alpine)
                        throw new Error(
                            '[Magic Helpers] Alpine is required for the magic helpers to function correctly.',
                        )
                    if (!window.Alpine.version || !s('2.5.0', window.Alpine.version))
                        throw new Error('Invalid Alpine version. Please use Alpine version 2.5.0 or above')
                },
                e = function (t, e, i) {
                    e.getAttribute('x-bind:data-last-refresh') ||
                        e.setAttribute('x-bind:data-last-refresh', 'Date.now()')
                    var n = function t(n) {
                        return (
                            void 0 === n && (n = null),
                            {
                                get: function (e, i) {
                                    if (null !== e[i] && 'object' == typeof e[i]) {
                                        var r = n ? n + '.' + i : i
                                        return new Proxy(e[i], t(r))
                                    }
                                    return e[i]
                                },
                                set: function (t, r, s) {
                                    if (!e.__x) throw new Error('Error communicating with observed component')
                                    var o = n ? n + '.' + r : r
                                    return i.call(e, e.__x.$data, o, s), !0
                                },
                            }
                        )
                    }
                    return new Proxy(t, n())
                },
                i = function (t, e) {
                    t.getAttribute('x-bind:data-last-refresh') ||
                        t.setAttribute('x-bind:data-last-refresh', 'Date.now()'),
                        new MutationObserver(function (i) {
                            for (var n = 0; n < i.length; n++) {
                                var r = i[n].target.closest('[x-data]')
                                if (!r || r.isSameNode(t)) return void e()
                            }
                        }).observe(t, { attributes: !0, childList: !0, subtree: !0 })
                },
                n = function (t, e, i) {
                    return (
                        ((e = e.toString().match(/[^.[\]]+/g) || []).slice(0, -1).reduce(function (t, i, n) {
                            return (
                                Object(t[i]) !== t[i] && (t[i] = Math.abs(e[n + 1]) >> 0 == +e[n + 1] ? [] : {}), t[i]
                            )
                        }, t)[e[e.length - 1]] = i),
                        t
                    )
                },
                r = function (t) {
                    return t.__x ? t.__x.getUnobservedData() : o(t.getAttribute('x-data'), t)
                }
            function s(t, e) {
                for (var i = t.split('.'), n = e.split('.'), r = 0; r < i.length; r++)
                    if (!n[r] || parseInt(n[r]) < parseInt(i[r])) return !1
                return !0
            }
            function o(t, e, i) {
                return (
                    void 0 === i && (i = {}),
                    'function' == typeof t
                        ? t.call(e)
                        : new Function(
                              ['$data'].concat(Object.keys(i)),
                              'var __alpine_result; with($data) { __alpine_result = ' +
                                  t +
                                  ' }; return __alpine_result',
                          ).apply(void 0, [e].concat(Object.values(i)))
                )
            }
            var a = {
                    start: function () {
                        t(),
                            Alpine.addMagicProperty('parent', function (t) {
                                if (void 0 !== t.$parent) return t.$parent
                                var s = t.parentNode.closest('[x-data]')
                                if (!s) throw new Error('Parent component not found')
                                return (
                                    (t.$parent = e(r(s), s, n)),
                                    i(s, function () {
                                        ;(t.$parent = e(s.__x.getUnobservedData(), s, n)), t.__x.updateElements(t)
                                    }),
                                    t.$parent
                                )
                            }),
                            Alpine.addMagicProperty('component', function (t) {
                                return function (s) {
                                    var o = this
                                    if (void 0 !== this[s]) return this[s]
                                    var a = document.querySelector('[x-data][x-id="' + s + '"], [x-data]#' + s)
                                    if (!a) throw new Error('Component not found')
                                    return (
                                        (this[s] = e(r(a), a, n)),
                                        i(a, function () {
                                            ;(o[s] = e(a.__x.getUnobservedData(), a, n)), t.__x.updateElements(t)
                                        }),
                                        this[s]
                                    )
                                }
                            })
                    },
                },
                l =
                    window.deferLoadingAlpine ||
                    function (t) {
                        return t()
                    }
            return (
                (window.deferLoadingAlpine = function (t) {
                    l(t), a.start()
                }),
                a
            )
        })()
    })
    const i = {
            start() {
                if (!window.Alpine) throw new Error('Alpine is required for `alpine-clipboard` to work.')
                Alpine.addMagicProperty(
                    'clipboard',
                    () =>
                        function (t) {
                            let e = t
                            if ('function' == typeof e) e = e()
                            else if ('string' != typeof e)
                                try {
                                    e = JSON.stringify(e)
                                } catch (t) {
                                    console.warn(t)
                                }
                            const i = document.createElement('textarea')
                            if (
                                ((i.value = e),
                                i.setAttribute('readonly', ''),
                                (i.style.cssText = 'position:fixed;pointer-events:none;z-index:-9999;opacity:0;'),
                                document.body.appendChild(i),
                                navigator.userAgent && navigator.userAgent.match(/ipad|ipod|iphone/i))
                            ) {
                                ;(i.contentEditable = !0), (i.readOnly = !0)
                                const t = document.createRange()
                                t.selectNodeContents(i)
                                const e = window.getSelection()
                                e.removeAllRanges(), e.addRange(t), i.setSelectionRange(0, 999999)
                            } else i.select()
                            try {
                                document.execCommand('copy')
                            } catch (t) {
                                console.warn(err)
                            }
                            document.body.removeChild(i)
                        },
                )
            },
        },
        n = window.deferLoadingAlpine || ((t) => t())
    window.deferLoadingAlpine = function (t) {
        i.start(), n(t)
    }
    e(function (t, e) {
        t.exports = (function () {
            function t(t, e, i) {
                return (
                    e in t
                        ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                        : (t[e] = i),
                    t
                )
            }
            function e(t, e) {
                var i = Object.keys(t)
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(t)
                    e &&
                        (n = n.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable
                        })),
                        i.push.apply(i, n)
                }
                return i
            }
            function i(i) {
                for (var n = 1; n < arguments.length; n++) {
                    var r = null != arguments[n] ? arguments[n] : {}
                    n % 2
                        ? e(Object(r), !0).forEach(function (e) {
                              t(i, e, r[e])
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(r))
                        : e(Object(r)).forEach(function (t) {
                              Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(r, t))
                          })
                }
                return i
            }
            function n() {
                return new Promise((t) => {
                    'loading' == document.readyState ? document.addEventListener('DOMContentLoaded', t) : t()
                })
            }
            function r(t) {
                return Array.from(new Set(t))
            }
            function s() {
                return navigator.userAgent.includes('Node.js') || navigator.userAgent.includes('jsdom')
            }
            function o(t, e) {
                return t == e
            }
            function a(t, e) {
                'template' !== t.tagName.toLowerCase()
                    ? console.warn(
                          `Alpine: [${e}] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#${e}`,
                      )
                    : 1 !== t.content.childElementCount &&
                      console.warn(
                          `Alpine: <template> tag with [${e}] encountered with multiple element roots. Make sure <template> only has a single child element.`,
                      )
            }
            function l(t) {
                return t
                    .replace(/([a-z])([A-Z])/g, '$1-$2')
                    .replace(/[_\s]/, '-')
                    .toLowerCase()
            }
            function h(t) {
                return t.toLowerCase().replace(/-(\w)/g, (t, e) => e.toUpperCase())
            }
            function u(t, e) {
                if (!1 === e(t)) return
                let i = t.firstElementChild
                for (; i; ) u(i, e), (i = i.nextElementSibling)
            }
            function c(t, e) {
                var i
                return function () {
                    var n = this,
                        r = arguments,
                        s = function () {
                            ;(i = null), t.apply(n, r)
                        }
                    clearTimeout(i), (i = setTimeout(s, e))
                }
            }
            const d = (t, e, i) => {
                if ((console.warn(`Alpine Error: "${i}"\n\nExpression: "${e}"\nElement:`, t), !s())) throw i
            }
            function f(t, { el: e, expression: i }) {
                try {
                    const n = t()
                    return n instanceof Promise ? n.catch((t) => d(e, i, t)) : n
                } catch (t) {
                    d(e, i, t)
                }
            }
            function p(t, e, i, n = {}) {
                return f(
                    () =>
                        'function' == typeof e
                            ? e.call(i)
                            : new Function(
                                  ['$data', ...Object.keys(n)],
                                  `var __alpine_result; with($data) { __alpine_result = ${e} }; return __alpine_result`,
                              )(i, ...Object.values(n)),
                    { el: t, expression: e },
                )
            }
            function _(t, e, i, n = {}) {
                return f(
                    () => {
                        if ('function' == typeof e) return Promise.resolve(e.call(i, n.$event))
                        let t = Function
                        if (
                            ((t = Object.getPrototypeOf(async function () {}).constructor), Object.keys(i).includes(e))
                        ) {
                            let t = new Function(
                                ['dataContext', ...Object.keys(n)],
                                `with(dataContext) { return ${e} }`,
                            )(i, ...Object.values(n))
                            return 'function' == typeof t ? Promise.resolve(t.call(i, n.$event)) : Promise.resolve()
                        }
                        return Promise.resolve(
                            new t(['dataContext', ...Object.keys(n)], `with(dataContext) { ${e} }`)(
                                i,
                                ...Object.values(n),
                            ),
                        )
                    },
                    { el: t, expression: e },
                )
            }
            const m = /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/
            function g(t) {
                const e = x(t.name)
                return m.test(e)
            }
            function v(t, e, i) {
                let n = Array.from(t.attributes).filter(g).map(b),
                    r = n.filter((t) => 'spread' === t.type)[0]
                if (r) {
                    let i = p(t, r.expression, e.$data)
                    n = n.concat(Object.entries(i).map(([t, e]) => b({ name: t, value: e })))
                }
                return i ? n.filter((t) => t.type === i) : y(n)
            }
            function y(t) {
                let e = ['bind', 'model', 'show', 'catch-all']
                return t.sort((t, i) => {
                    let n = -1 === e.indexOf(t.type) ? 'catch-all' : t.type,
                        r = -1 === e.indexOf(i.type) ? 'catch-all' : i.type
                    return e.indexOf(n) - e.indexOf(r)
                })
            }
            function b({ name: t, value: e }) {
                const i = x(t),
                    n = i.match(m),
                    r = i.match(/:([a-zA-Z0-9\-:]+)/),
                    s = i.match(/\.[^.\]]+(?=[^\]]*$)/g) || []
                return {
                    type: n ? n[1] : null,
                    value: r ? r[1] : null,
                    modifiers: s.map((t) => t.replace('.', '')),
                    expression: e,
                }
            }
            function w(t) {
                return [
                    'disabled',
                    'checked',
                    'required',
                    'readonly',
                    'hidden',
                    'open',
                    'selected',
                    'autofocus',
                    'itemscope',
                    'multiple',
                    'novalidate',
                    'allowfullscreen',
                    'allowpaymentrequest',
                    'formnovalidate',
                    'autoplay',
                    'controls',
                    'loop',
                    'muted',
                    'playsinline',
                    'default',
                    'ismap',
                    'reversed',
                    'async',
                    'defer',
                    'nomodule',
                ].includes(t)
            }
            function x(t) {
                return t.startsWith('@') ? t.replace('@', 'x-on:') : t.startsWith(':') ? t.replace(':', 'x-bind:') : t
            }
            function S(t, e = Boolean) {
                return t.split(' ').filter(e)
            }
            const E = 'in',
                T = 'out',
                D = 'cancelled'
            function A(t, e, i, n, r = !1) {
                if (r) return e()
                if (t.__x_transition && t.__x_transition.type === E) return
                const s = v(t, n, 'transition'),
                    o = v(t, n, 'show')[0]
                if (o && o.modifiers.includes('transition')) {
                    let n = o.modifiers
                    if (n.includes('out') && !n.includes('in')) return e()
                    const r = n.includes('in') && n.includes('out')
                    ;(n = r ? n.filter((t, e) => e < n.indexOf('out')) : n), R(t, n, e, i)
                } else s.some((t) => ['enter', 'enter-start', 'enter-end'].includes(t.value)) ? M(t, n, s, e, i) : e()
            }
            function k(t, e, i, n, r = !1) {
                if (r) return e()
                if (t.__x_transition && t.__x_transition.type === T) return
                const s = v(t, n, 'transition'),
                    o = v(t, n, 'show')[0]
                if (o && o.modifiers.includes('transition')) {
                    let n = o.modifiers
                    if (n.includes('in') && !n.includes('out')) return e()
                    const r = n.includes('in') && n.includes('out')
                    ;(n = r ? n.filter((t, e) => e > n.indexOf('out')) : n), P(t, n, r, e, i)
                } else s.some((t) => ['leave', 'leave-start', 'leave-end'].includes(t.value)) ? I(t, n, s, e, i) : e()
            }
            function R(t, e, i, n) {
                L(
                    t,
                    e,
                    i,
                    () => {},
                    n,
                    {
                        duration: O(e, 'duration', 150),
                        origin: O(e, 'origin', 'center'),
                        first: { opacity: 0, scale: O(e, 'scale', 95) },
                        second: { opacity: 1, scale: 100 },
                    },
                    E,
                )
            }
            function P(t, e, i, n, r) {
                L(
                    t,
                    e,
                    () => {},
                    n,
                    r,
                    {
                        duration: i ? O(e, 'duration', 150) : O(e, 'duration', 150) / 2,
                        origin: O(e, 'origin', 'center'),
                        first: { opacity: 1, scale: 100 },
                        second: { opacity: 0, scale: O(e, 'scale', 95) },
                    },
                    T,
                )
            }
            function O(t, e, i) {
                if (-1 === t.indexOf(e)) return i
                const n = t[t.indexOf(e) + 1]
                if (!n) return i
                if ('scale' === e && !j(n)) return i
                if ('duration' === e) {
                    let t = n.match(/([0-9]+)ms/)
                    if (t) return t[1]
                }
                return 'origin' === e && ['top', 'right', 'left', 'center', 'bottom'].includes(t[t.indexOf(e) + 2])
                    ? [n, t[t.indexOf(e) + 2]].join(' ')
                    : n
            }
            function L(t, e, i, n, r, s, o) {
                t.__x_transition && t.__x_transition.cancel && t.__x_transition.cancel()
                const a = t.style.opacity,
                    l = t.style.transform,
                    h = t.style.transformOrigin,
                    u = !e.includes('opacity') && !e.includes('scale'),
                    c = u || e.includes('opacity'),
                    d = u || e.includes('scale'),
                    f = {
                        start() {
                            c && (t.style.opacity = s.first.opacity),
                                d && (t.style.transform = `scale(${s.first.scale / 100})`)
                        },
                        during() {
                            d && (t.style.transformOrigin = s.origin),
                                (t.style.transitionProperty = [c ? 'opacity' : '', d ? 'transform' : '']
                                    .join(' ')
                                    .trim()),
                                (t.style.transitionDuration = s.duration / 1e3 + 's'),
                                (t.style.transitionTimingFunction = 'cubic-bezier(0.4, 0.0, 0.2, 1)')
                        },
                        show() {
                            i()
                        },
                        end() {
                            c && (t.style.opacity = s.second.opacity),
                                d && (t.style.transform = `scale(${s.second.scale / 100})`)
                        },
                        hide() {
                            n()
                        },
                        cleanup() {
                            c && (t.style.opacity = a),
                                d && (t.style.transform = l),
                                d && (t.style.transformOrigin = h),
                                (t.style.transitionProperty = null),
                                (t.style.transitionDuration = null),
                                (t.style.transitionTimingFunction = null)
                        },
                    }
                q(t, f, o, r)
            }
            const C = (t, e, i) => ('function' == typeof t ? i.evaluateReturnExpression(e, t) : t)
            function M(t, e, i, n, r) {
                N(
                    t,
                    S(C((i.find((t) => 'enter' === t.value) || { expression: '' }).expression, t, e)),
                    S(C((i.find((t) => 'enter-start' === t.value) || { expression: '' }).expression, t, e)),
                    S(C((i.find((t) => 'enter-end' === t.value) || { expression: '' }).expression, t, e)),
                    n,
                    () => {},
                    E,
                    r,
                )
            }
            function I(t, e, i, n, r) {
                N(
                    t,
                    S(C((i.find((t) => 'leave' === t.value) || { expression: '' }).expression, t, e)),
                    S(C((i.find((t) => 'leave-start' === t.value) || { expression: '' }).expression, t, e)),
                    S(C((i.find((t) => 'leave-end' === t.value) || { expression: '' }).expression, t, e)),
                    () => {},
                    n,
                    T,
                    r,
                )
            }
            function N(t, e, i, n, r, s, o, a) {
                t.__x_transition && t.__x_transition.cancel && t.__x_transition.cancel()
                const l = t.__x_original_classes || [],
                    h = {
                        start() {
                            t.classList.add(...i)
                        },
                        during() {
                            t.classList.add(...e)
                        },
                        show() {
                            r()
                        },
                        end() {
                            t.classList.remove(...i.filter((t) => !l.includes(t))), t.classList.add(...n)
                        },
                        hide() {
                            s()
                        },
                        cleanup() {
                            t.classList.remove(...e.filter((t) => !l.includes(t))),
                                t.classList.remove(...n.filter((t) => !l.includes(t)))
                        },
                    }
                q(t, h, o, a)
            }
            function q(t, e, i, n) {
                const r = X(() => {
                    e.hide(), t.isConnected && e.cleanup(), delete t.__x_transition
                })
                ;(t.__x_transition = {
                    type: i,
                    cancel: X(() => {
                        n(D), r()
                    }),
                    finish: r,
                    nextFrame: null,
                }),
                    e.start(),
                    e.during(),
                    (t.__x_transition.nextFrame = requestAnimationFrame(() => {
                        let i = 1e3 * Number(getComputedStyle(t).transitionDuration.replace(/,.*/, '').replace('s', ''))
                        0 === i && (i = 1e3 * Number(getComputedStyle(t).animationDuration.replace('s', ''))),
                            e.show(),
                            (t.__x_transition.nextFrame = requestAnimationFrame(() => {
                                e.end(), setTimeout(t.__x_transition.finish, i)
                            }))
                    }))
            }
            function j(t) {
                return !Array.isArray(t) && !isNaN(t)
            }
            function X(t) {
                let e = !1
                return function () {
                    e || ((e = !0), t.apply(this, arguments))
                }
            }
            function F(t, e, i, n, r) {
                a(e, 'x-for')
                let s = H('function' == typeof i ? t.evaluateReturnExpression(e, i) : i),
                    o = z(t, e, s, r),
                    l = e
                o.forEach((i, a) => {
                    let h = Y(s, i, a, o, r()),
                        u = B(t, e, a, h),
                        c = $(l.nextElementSibling, u)
                    c
                        ? (delete c.__x_for_key, (c.__x_for = h), t.updateElements(c, () => c.__x_for))
                        : ((c = W(e, l)),
                          A(
                              c,
                              () => {},
                              () => {},
                              t,
                              n,
                          ),
                          (c.__x_for = h),
                          t.initializeElements(c, () => c.__x_for)),
                        (l = c),
                        (l.__x_for_key = u)
                }),
                    G(l, t)
            }
            function H(t) {
                let e = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
                    i = /^\(|\)$/g,
                    n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
                    r = t.match(n)
                if (!r) return
                let s = {}
                s.items = r[2].trim()
                let o = r[1].trim().replace(i, ''),
                    a = o.match(e)
                return (
                    a
                        ? ((s.item = o.replace(e, '').trim()),
                          (s.index = a[1].trim()),
                          a[2] && (s.collection = a[2].trim()))
                        : (s.item = o),
                    s
                )
            }
            function Y(t, e, n, r, s) {
                let o = s ? i({}, s) : {}
                return (o[t.item] = e), t.index && (o[t.index] = n), t.collection && (o[t.collection] = r), o
            }
            function B(t, e, i, n) {
                let r = v(e, t, 'bind').filter((t) => 'key' === t.value)[0]
                return r ? t.evaluateReturnExpression(e, r.expression, () => n) : i
            }
            function z(t, e, i, n) {
                let r = v(e, t, 'if')[0]
                if (r && !t.evaluateReturnExpression(e, r.expression)) return []
                let s = t.evaluateReturnExpression(e, i.items, n)
                return j(s) && s > 0 && (s = Array.from(Array(s).keys(), (t) => t + 1)), s
            }
            function W(t, e) {
                let i = document.importNode(t.content, !0)
                return e.parentElement.insertBefore(i, e.nextElementSibling), e.nextElementSibling
            }
            function $(t, e) {
                if (!t) return
                if (void 0 === t.__x_for_key) return
                if (t.__x_for_key === e) return t
                let i = t
                for (; i; ) {
                    if (i.__x_for_key === e) return i.parentElement.insertBefore(i, t)
                    i = !(!i.nextElementSibling || void 0 === i.nextElementSibling.__x_for_key) && i.nextElementSibling
                }
            }
            function G(t, e) {
                for (
                    var i =
                        !(!t.nextElementSibling || void 0 === t.nextElementSibling.__x_for_key) && t.nextElementSibling;
                    i;

                ) {
                    let t = i,
                        n = i.nextElementSibling
                    k(
                        i,
                        () => {
                            t.remove()
                        },
                        () => {},
                        e,
                    ),
                        (i = !(!n || void 0 === n.__x_for_key) && n)
                }
            }
            function U(t, e, i, n, s, a, l) {
                var u = t.evaluateReturnExpression(e, n, s)
                if ('value' === i) {
                    if ($t.ignoreFocusedForValueBinding && document.activeElement.isSameNode(e)) return
                    if ((void 0 === u && n.match(/\./) && (u = ''), 'radio' === e.type))
                        void 0 === e.attributes.value && 'bind' === a
                            ? (e.value = u)
                            : 'bind' !== a && (e.checked = o(e.value, u))
                    else if ('checkbox' === e.type)
                        'boolean' == typeof u || [null, void 0].includes(u) || 'bind' !== a
                            ? 'bind' !== a &&
                              (Array.isArray(u) ? (e.checked = u.some((t) => o(t, e.value))) : (e.checked = !!u))
                            : (e.value = String(u))
                    else if ('SELECT' === e.tagName) J(e, u)
                    else {
                        if (e.value === u) return
                        e.value = u
                    }
                } else if ('class' === i)
                    if (Array.isArray(u)) {
                        const t = e.__x_original_classes || []
                        e.setAttribute('class', r(t.concat(u)).join(' '))
                    } else if ('object' == typeof u)
                        Object.keys(u)
                            .sort((t, e) => u[t] - u[e])
                            .forEach((t) => {
                                u[t]
                                    ? S(t).forEach((t) => e.classList.add(t))
                                    : S(t).forEach((t) => e.classList.remove(t))
                            })
                    else {
                        const t = e.__x_original_classes || [],
                            i = u ? S(u) : []
                        e.setAttribute('class', r(t.concat(i)).join(' '))
                    }
                else
                    (i = l.includes('camel') ? h(i) : i),
                        [null, void 0, !1].includes(u) ? e.removeAttribute(i) : w(i) ? V(e, i, i) : V(e, i, u)
            }
            function V(t, e, i) {
                t.getAttribute(e) != i && t.setAttribute(e, i)
            }
            function J(t, e) {
                const i = [].concat(e).map((t) => t + '')
                Array.from(t.options).forEach((t) => {
                    t.selected = i.includes(t.value || t.text)
                })
            }
            function K(t, e, i) {
                void 0 === e && i.match(/\./) && (e = ''), (t.textContent = e)
            }
            function Q(t, e, i, n) {
                e.innerHTML = t.evaluateReturnExpression(e, i, n)
            }
            function Z(t, e, i, n, r = !1) {
                const s = () => {
                        ;(e.style.display = 'none'), (e.__x_is_shown = !1)
                    },
                    o = () => {
                        1 === e.style.length && 'none' === e.style.display
                            ? e.removeAttribute('style')
                            : e.style.removeProperty('display'),
                            (e.__x_is_shown = !0)
                    }
                if (!0 === r) return void (i ? o() : s())
                const a = (n, r) => {
                    i
                        ? (('none' === e.style.display || e.__x_transition) &&
                              A(
                                  e,
                                  () => {
                                      o()
                                  },
                                  r,
                                  t,
                              ),
                          n(() => {}))
                        : 'none' !== e.style.display
                        ? k(
                              e,
                              () => {
                                  n(() => {
                                      s()
                                  })
                              },
                              r,
                              t,
                          )
                        : n(() => {})
                }
                n.includes('immediate')
                    ? a(
                          (t) => t(),
                          () => {},
                      )
                    : (t.showDirectiveLastElement &&
                          !t.showDirectiveLastElement.contains(e) &&
                          t.executeAndClearRemainingShowDirectiveStack(),
                      t.showDirectiveStack.push(a),
                      (t.showDirectiveLastElement = e))
            }
            function tt(t, e, i, n, r) {
                a(e, 'x-if')
                const s = e.nextElementSibling && !0 === e.nextElementSibling.__x_inserted_me
                if (!i || (s && !e.__x_transition))
                    !i &&
                        s &&
                        k(
                            e.nextElementSibling,
                            () => {
                                e.nextElementSibling.remove()
                            },
                            () => {},
                            t,
                            n,
                        )
                else {
                    const i = document.importNode(e.content, !0)
                    e.parentElement.insertBefore(i, e.nextElementSibling),
                        A(
                            e.nextElementSibling,
                            () => {},
                            () => {},
                            t,
                            n,
                        ),
                        t.initializeElements(e.nextElementSibling, r),
                        (e.nextElementSibling.__x_inserted_me = !0)
                }
            }
            function et(t, e, i, n, r, s = {}) {
                const o = { passive: n.includes('passive') }
                if ((n.includes('camel') && (i = h(i)), n.includes('away'))) {
                    let a = (l) => {
                        e.contains(l.target) ||
                            (e.offsetWidth < 1 && e.offsetHeight < 1) ||
                            (it(t, r, l, s), n.includes('once') && document.removeEventListener(i, a, o))
                    }
                    document.addEventListener(i, a, o)
                } else {
                    let a = n.includes('window') ? window : n.includes('document') ? document : e,
                        l = (h) => {
                            ;(a !== window && a !== document) || document.body.contains(e)
                                ? (nt(i) && rt(h, n)) ||
                                  (n.includes('prevent') && h.preventDefault(),
                                  n.includes('stop') && h.stopPropagation(),
                                  n.includes('self') && h.target !== e) ||
                                  it(t, r, h, s).then((t) => {
                                      !1 === t
                                          ? h.preventDefault()
                                          : n.includes('once') && a.removeEventListener(i, l, o)
                                  })
                                : a.removeEventListener(i, l, o)
                        }
                    if (n.includes('debounce')) {
                        let t = n[n.indexOf('debounce') + 1] || 'invalid-wait',
                            e = j(t.split('ms')[0]) ? Number(t.split('ms')[0]) : 250
                        l = c(l, e)
                    }
                    a.addEventListener(i, l, o)
                }
            }
            function it(t, e, n, r) {
                return t.evaluateCommandExpression(n.target, e, () => i(i({}, r()), {}, { $event: n }))
            }
            function nt(t) {
                return ['keydown', 'keyup'].includes(t)
            }
            function rt(t, e) {
                let i = e.filter((t) => !['window', 'document', 'prevent', 'stop'].includes(t))
                if (i.includes('debounce')) {
                    let t = i.indexOf('debounce')
                    i.splice(t, j((i[t + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1)
                }
                if (0 === i.length) return !1
                if (1 === i.length && i[0] === st(t.key)) return !1
                const n = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'].filter((t) => i.includes(t))
                return (
                    (i = i.filter((t) => !n.includes(t))),
                    !(
                        n.length > 0 &&
                        n.filter((e) => (('cmd' !== e && 'super' !== e) || (e = 'meta'), t[`${e}Key`])).length ===
                            n.length &&
                        i[0] === st(t.key)
                    )
                )
            }
            function st(t) {
                switch (t) {
                    case '/':
                        return 'slash'
                    case ' ':
                    case 'Spacebar':
                        return 'space'
                    default:
                        return t && l(t)
                }
            }
            function ot(t, e, n, r, s) {
                var o =
                    'select' === e.tagName.toLowerCase() || ['checkbox', 'radio'].includes(e.type) || n.includes('lazy')
                        ? 'change'
                        : 'input'
                et(t, e, o, n, `${r} = rightSideOfExpression($event, ${r})`, () =>
                    i(i({}, s()), {}, { rightSideOfExpression: at(e, n, r) }),
                )
            }
            function at(t, e, i) {
                return (
                    'radio' === t.type && (t.hasAttribute('name') || t.setAttribute('name', i)),
                    (i, n) => {
                        if (i instanceof CustomEvent && i.detail) return i.detail
                        if ('checkbox' === t.type) {
                            if (Array.isArray(n)) {
                                const t = e.includes('number') ? lt(i.target.value) : i.target.value
                                return i.target.checked ? n.concat([t]) : n.filter((e) => !o(e, t))
                            }
                            return i.target.checked
                        }
                        if ('select' === t.tagName.toLowerCase() && t.multiple)
                            return e.includes('number')
                                ? Array.from(i.target.selectedOptions).map((t) => lt(t.value || t.text))
                                : Array.from(i.target.selectedOptions).map((t) => t.value || t.text)
                        {
                            const t = i.target.value
                            return e.includes('number') ? lt(t) : e.includes('trim') ? t.trim() : t
                        }
                    }
                )
            }
            function lt(t) {
                const e = t ? parseFloat(t) : null
                return j(e) ? e : t
            }
            const { isArray: ht } = Array,
                {
                    getPrototypeOf: ut,
                    create: ct,
                    defineProperty: dt,
                    defineProperties: ft,
                    isExtensible: pt,
                    getOwnPropertyDescriptor: _t,
                    getOwnPropertyNames: mt,
                    getOwnPropertySymbols: gt,
                    preventExtensions: vt,
                    hasOwnProperty: yt,
                } = Object,
                { push: bt, concat: wt, map: xt } = Array.prototype
            function St(t) {
                return void 0 === t
            }
            function Et(t) {
                return 'function' == typeof t
            }
            function Tt(t) {
                return 'object' == typeof t
            }
            const Dt = new WeakMap()
            function At(t, e) {
                Dt.set(t, e)
            }
            const kt = (t) => Dt.get(t) || t
            function Rt(t, e) {
                return t.valueIsObservable(e) ? t.getProxy(e) : e
            }
            function Pt(t) {
                return yt.call(t, 'value') && (t.value = kt(t.value)), t
            }
            function Ot(t, e, i) {
                wt.call(mt(i), gt(i)).forEach((n) => {
                    let r = _t(i, n)
                    r.configurable || (r = Ht(t, r, Rt)), dt(e, n, r)
                }),
                    vt(e)
            }
            class Lt {
                constructor(t, e) {
                    ;(this.originalTarget = e), (this.membrane = t)
                }
                get(t, e) {
                    const { originalTarget: i, membrane: n } = this,
                        r = i[e],
                        { valueObserved: s } = n
                    return s(i, e), n.getProxy(r)
                }
                set(t, e, i) {
                    const {
                        originalTarget: n,
                        membrane: { valueMutated: r },
                    } = this
                    return n[e] !== i ? ((n[e] = i), r(n, e)) : 'length' === e && ht(n) && r(n, e), !0
                }
                deleteProperty(t, e) {
                    const {
                        originalTarget: i,
                        membrane: { valueMutated: n },
                    } = this
                    return delete i[e], n(i, e), !0
                }
                apply(t, e, i) {}
                construct(t, e, i) {}
                has(t, e) {
                    const {
                        originalTarget: i,
                        membrane: { valueObserved: n },
                    } = this
                    return n(i, e), e in i
                }
                ownKeys(t) {
                    const { originalTarget: e } = this
                    return wt.call(mt(e), gt(e))
                }
                isExtensible(t) {
                    const e = pt(t)
                    if (!e) return e
                    const { originalTarget: i, membrane: n } = this,
                        r = pt(i)
                    return r || Ot(n, t, i), r
                }
                setPrototypeOf(t, e) {}
                getPrototypeOf(t) {
                    const { originalTarget: e } = this
                    return ut(e)
                }
                getOwnPropertyDescriptor(t, e) {
                    const { originalTarget: i, membrane: n } = this,
                        { valueObserved: r } = this.membrane
                    r(i, e)
                    let s = _t(i, e)
                    if (St(s)) return s
                    const o = _t(t, e)
                    return St(o) ? ((s = Ht(n, s, Rt)), s.configurable || dt(t, e, s), s) : o
                }
                preventExtensions(t) {
                    const { originalTarget: e, membrane: i } = this
                    return Ot(i, t, e), vt(e), !0
                }
                defineProperty(t, e, i) {
                    const { originalTarget: n, membrane: r } = this,
                        { valueMutated: s } = r,
                        { configurable: o } = i
                    if (yt.call(i, 'writable') && !yt.call(i, 'value')) {
                        const t = _t(n, e)
                        i.value = t.value
                    }
                    return dt(n, e, Pt(i)), !1 === o && dt(t, e, Ht(r, i, Rt)), s(n, e), !0
                }
            }
            function Ct(t, e) {
                return t.valueIsObservable(e) ? t.getReadOnlyProxy(e) : e
            }
            class Mt {
                constructor(t, e) {
                    ;(this.originalTarget = e), (this.membrane = t)
                }
                get(t, e) {
                    const { membrane: i, originalTarget: n } = this,
                        r = n[e],
                        { valueObserved: s } = i
                    return s(n, e), i.getReadOnlyProxy(r)
                }
                set(t, e, i) {
                    return !1
                }
                deleteProperty(t, e) {
                    return !1
                }
                apply(t, e, i) {}
                construct(t, e, i) {}
                has(t, e) {
                    const {
                        originalTarget: i,
                        membrane: { valueObserved: n },
                    } = this
                    return n(i, e), e in i
                }
                ownKeys(t) {
                    const { originalTarget: e } = this
                    return wt.call(mt(e), gt(e))
                }
                setPrototypeOf(t, e) {}
                getOwnPropertyDescriptor(t, e) {
                    const { originalTarget: i, membrane: n } = this,
                        { valueObserved: r } = n
                    r(i, e)
                    let s = _t(i, e)
                    if (St(s)) return s
                    const o = _t(t, e)
                    return St(o)
                        ? ((s = Ht(n, s, Ct)), yt.call(s, 'set') && (s.set = void 0), s.configurable || dt(t, e, s), s)
                        : o
                }
                preventExtensions(t) {
                    return !1
                }
                defineProperty(t, e, i) {
                    return !1
                }
            }
            function It(t) {
                let e
                return ht(t) ? (e = []) : Tt(t) && (e = {}), e
            }
            const Nt = Object.prototype
            function qt(t) {
                if (null === t) return !1
                if ('object' != typeof t) return !1
                if (ht(t)) return !0
                const e = ut(t)
                return e === Nt || null === e || null === ut(e)
            }
            const jt = (t, e) => {},
                Xt = (t, e) => {},
                Ft = (t) => t
            function Ht(t, e, i) {
                const { set: n, get: r } = e
                return (
                    yt.call(e, 'value')
                        ? (e.value = i(t, e.value))
                        : (St(r) ||
                              (e.get = function () {
                                  return i(t, r.call(kt(this)))
                              }),
                          St(n) ||
                              (e.set = function (e) {
                                  n.call(kt(this), t.unwrapProxy(e))
                              })),
                    e
                )
            }
            class Yt {
                constructor(t) {
                    if (
                        ((this.valueDistortion = Ft),
                        (this.valueMutated = Xt),
                        (this.valueObserved = jt),
                        (this.valueIsObservable = qt),
                        (this.objectGraph = new WeakMap()),
                        !St(t))
                    ) {
                        const { valueDistortion: e, valueMutated: i, valueObserved: n, valueIsObservable: r } = t
                        ;(this.valueDistortion = Et(e) ? e : Ft),
                            (this.valueMutated = Et(i) ? i : Xt),
                            (this.valueObserved = Et(n) ? n : jt),
                            (this.valueIsObservable = Et(r) ? r : qt)
                    }
                }
                getProxy(t) {
                    const e = kt(t),
                        i = this.valueDistortion(e)
                    if (this.valueIsObservable(i)) {
                        const n = this.getReactiveState(e, i)
                        return n.readOnly === t ? t : n.reactive
                    }
                    return i
                }
                getReadOnlyProxy(t) {
                    t = kt(t)
                    const e = this.valueDistortion(t)
                    return this.valueIsObservable(e) ? this.getReactiveState(t, e).readOnly : e
                }
                unwrapProxy(t) {
                    return kt(t)
                }
                getReactiveState(t, e) {
                    const { objectGraph: i } = this
                    let n = i.get(e)
                    if (n) return n
                    const r = this
                    return (
                        (n = {
                            get reactive() {
                                const i = new Lt(r, e),
                                    n = new Proxy(It(e), i)
                                return At(n, t), dt(this, 'reactive', { value: n }), n
                            },
                            get readOnly() {
                                const i = new Mt(r, e),
                                    n = new Proxy(It(e), i)
                                return At(n, t), dt(this, 'readOnly', { value: n }), n
                            },
                        }),
                        i.set(e, n),
                        n
                    )
                }
            }
            function Bt(t, e) {
                let i = new Yt({
                    valueMutated(t, i) {
                        e(t, i)
                    },
                })
                return { data: i.getProxy(t), membrane: i }
            }
            function zt(t, e) {
                let i = t.unwrapProxy(e),
                    n = {}
                return (
                    Object.keys(i).forEach((t) => {
                        ;['$el', '$refs', '$nextTick', '$watch'].includes(t) || (n[t] = i[t])
                    }),
                    n
                )
            }
            class Wt {
                constructor(t, e = null) {
                    this.$el = t
                    const i = this.$el.getAttribute('x-data'),
                        n = '' === i ? '{}' : i,
                        r = this.$el.getAttribute('x-init')
                    let s = { $el: this.$el },
                        o = e ? e.$el : this.$el
                    Object.entries($t.magicProperties).forEach(([t, e]) => {
                        Object.defineProperty(s, `$${t}`, {
                            get: function () {
                                return e(o)
                            },
                        })
                    }),
                        (this.unobservedData = e ? e.getUnobservedData() : p(t, n, s))
                    let { membrane: a, data: l } = this.wrapDataInObservable(this.unobservedData)
                    var h
                    ;(this.$data = l),
                        (this.membrane = a),
                        (this.unobservedData.$el = this.$el),
                        (this.unobservedData.$refs = this.getRefsProxy()),
                        (this.nextTickStack = []),
                        (this.unobservedData.$nextTick = (t) => {
                            this.nextTickStack.push(t)
                        }),
                        (this.watchers = {}),
                        (this.unobservedData.$watch = (t, e) => {
                            this.watchers[t] || (this.watchers[t] = []), this.watchers[t].push(e)
                        }),
                        Object.entries($t.magicProperties).forEach(([t, e]) => {
                            Object.defineProperty(this.unobservedData, `$${t}`, {
                                get: function () {
                                    return e(o, this.$el)
                                },
                            })
                        }),
                        (this.showDirectiveStack = []),
                        e || $t.onBeforeComponentInitializeds.forEach((t) => t(this)),
                        r &&
                            !e &&
                            ((this.pauseReactivity = !0),
                            (h = this.evaluateReturnExpression(this.$el, r)),
                            (this.pauseReactivity = !1)),
                        this.initializeElements(this.$el),
                        this.listenForNewElementsToInitialize(),
                        'function' == typeof h && h.call(this.$data),
                        e ||
                            setTimeout(() => {
                                $t.onComponentInitializeds.forEach((t) => t(this))
                            }, 0)
                }
                getUnobservedData() {
                    return zt(this.membrane, this.$data)
                }
                wrapDataInObservable(t) {
                    var e = this
                    let i = c(function () {
                        e.updateElements(e.$el)
                    }, 0)
                    return Bt(t, (t, n) => {
                        e.watchers[n]
                            ? e.watchers[n].forEach((e) => e(t[n]))
                            : Array.isArray(t)
                            ? Object.keys(e.watchers).forEach((i) => {
                                  let r = i.split('.')
                                  'length' !== n &&
                                      r.reduce(
                                          (n, r) => (Object.is(t, n[r]) && e.watchers[i].forEach((e) => e(t)), n[r]),
                                          e.unobservedData,
                                      )
                              })
                            : Object.keys(e.watchers)
                                  .filter((t) => t.includes('.'))
                                  .forEach((i) => {
                                      let r = i.split('.')
                                      n === r[r.length - 1] &&
                                          r.reduce(
                                              (r, s) => (
                                                  Object.is(t, r) && e.watchers[i].forEach((e) => e(t[n])), r[s]
                                              ),
                                              e.unobservedData,
                                          )
                                  }),
                            e.pauseReactivity || i()
                    })
                }
                walkAndSkipNestedComponents(t, e, i = () => {}) {
                    u(t, (t) => (t.hasAttribute('x-data') && !t.isSameNode(this.$el) ? (t.__x || i(t), !1) : e(t)))
                }
                initializeElements(t, e = () => {}) {
                    this.walkAndSkipNestedComponents(
                        t,
                        (t) =>
                            void 0 === t.__x_for_key &&
                            void 0 === t.__x_inserted_me &&
                            void this.initializeElement(t, e),
                        (t) => {
                            t.__x = new Wt(t)
                        },
                    ),
                        this.executeAndClearRemainingShowDirectiveStack(),
                        this.executeAndClearNextTickStack(t)
                }
                initializeElement(t, e) {
                    t.hasAttribute('class') &&
                        v(t, this).length > 0 &&
                        (t.__x_original_classes = S(t.getAttribute('class'))),
                        this.registerListeners(t, e),
                        this.resolveBoundAttributes(t, !0, e)
                }
                updateElements(t, e = () => {}) {
                    this.walkAndSkipNestedComponents(
                        t,
                        (t) => {
                            if (void 0 !== t.__x_for_key && !t.isSameNode(this.$el)) return !1
                            this.updateElement(t, e)
                        },
                        (t) => {
                            t.__x = new Wt(t)
                        },
                    ),
                        this.executeAndClearRemainingShowDirectiveStack(),
                        this.executeAndClearNextTickStack(t)
                }
                executeAndClearNextTickStack(t) {
                    t === this.$el &&
                        this.nextTickStack.length > 0 &&
                        requestAnimationFrame(() => {
                            for (; this.nextTickStack.length > 0; ) this.nextTickStack.shift()()
                        })
                }
                executeAndClearRemainingShowDirectiveStack() {
                    this.showDirectiveStack
                        .reverse()
                        .map(
                            (t) =>
                                new Promise((e, i) => {
                                    t(e, i)
                                }),
                        )
                        .reduce(
                            (t, e) =>
                                t.then(() =>
                                    e.then((t) => {
                                        t()
                                    }),
                                ),
                            Promise.resolve(() => {}),
                        )
                        .catch((t) => {
                            if (t !== D) throw t
                        }),
                        (this.showDirectiveStack = []),
                        (this.showDirectiveLastElement = void 0)
                }
                updateElement(t, e) {
                    this.resolveBoundAttributes(t, !1, e)
                }
                registerListeners(t, e) {
                    v(t, this).forEach(({ type: i, value: n, modifiers: r, expression: s }) => {
                        switch (i) {
                            case 'on':
                                et(this, t, n, r, s, e)
                                break
                            case 'model':
                                ot(this, t, r, s, e)
                        }
                    })
                }
                resolveBoundAttributes(t, e = !1, i) {
                    let n = v(t, this)
                    n.forEach(({ type: r, value: s, modifiers: o, expression: a }) => {
                        switch (r) {
                            case 'model':
                                U(this, t, 'value', a, i, r, o)
                                break
                            case 'bind':
                                if ('template' === t.tagName.toLowerCase() && 'key' === s) return
                                U(this, t, s, a, i, r, o)
                                break
                            case 'text':
                                var l = this.evaluateReturnExpression(t, a, i)
                                K(t, l, a)
                                break
                            case 'html':
                                Q(this, t, a, i)
                                break
                            case 'show':
                                ;(l = this.evaluateReturnExpression(t, a, i)), Z(this, t, l, o, e)
                                break
                            case 'if':
                                if (n.some((t) => 'for' === t.type)) return
                                ;(l = this.evaluateReturnExpression(t, a, i)), tt(this, t, l, e, i)
                                break
                            case 'for':
                                F(this, t, a, e, i)
                                break
                            case 'cloak':
                                t.removeAttribute('x-cloak')
                        }
                    })
                }
                evaluateReturnExpression(t, e, n = () => {}) {
                    return p(t, e, this.$data, i(i({}, n()), {}, { $dispatch: this.getDispatchFunction(t) }))
                }
                evaluateCommandExpression(t, e, n = () => {}) {
                    return _(t, e, this.$data, i(i({}, n()), {}, { $dispatch: this.getDispatchFunction(t) }))
                }
                getDispatchFunction(t) {
                    return (e, i = {}) => {
                        t.dispatchEvent(new CustomEvent(e, { detail: i, bubbles: !0 }))
                    }
                }
                listenForNewElementsToInitialize() {
                    const t = this.$el,
                        e = { childList: !0, attributes: !0, subtree: !0 }
                    new MutationObserver((t) => {
                        for (let e = 0; e < t.length; e++) {
                            const i = t[e].target.closest('[x-data]')
                            if (i && i.isSameNode(this.$el)) {
                                if ('attributes' === t[e].type && 'x-data' === t[e].attributeName) {
                                    const i = t[e].target.getAttribute('x-data') || '{}',
                                        n = p(this.$el, i, { $el: this.$el })
                                    Object.keys(n).forEach((t) => {
                                        this.$data[t] !== n[t] && (this.$data[t] = n[t])
                                    })
                                }
                                t[e].addedNodes.length > 0 &&
                                    t[e].addedNodes.forEach((t) => {
                                        1 !== t.nodeType ||
                                            t.__x_inserted_me ||
                                            (!t.matches('[x-data]') || t.__x
                                                ? this.initializeElements(t)
                                                : (t.__x = new Wt(t)))
                                    })
                            }
                        }
                    }).observe(t, e)
                }
                getRefsProxy() {
                    var t = this
                    return new Proxy(
                        {},
                        {
                            get(e, i) {
                                return (
                                    '$isAlpineProxy' === i ||
                                    (t.walkAndSkipNestedComponents(t.$el, (t) => {
                                        t.hasAttribute('x-ref') && t.getAttribute('x-ref') === i && (n = t)
                                    }),
                                    n)
                                )
                                var n
                            },
                        },
                    )
                }
            }
            const $t = {
                version: '2.8.0',
                pauseMutationObserver: !1,
                magicProperties: {},
                onComponentInitializeds: [],
                onBeforeComponentInitializeds: [],
                ignoreFocusedForValueBinding: !1,
                start: async function () {
                    s() || (await n()),
                        this.discoverComponents((t) => {
                            this.initializeComponent(t)
                        }),
                        document.addEventListener('turbolinks:load', () => {
                            this.discoverUninitializedComponents((t) => {
                                this.initializeComponent(t)
                            })
                        }),
                        this.listenForNewUninitializedComponentsAtRunTime()
                },
                discoverComponents: function (t) {
                    document.querySelectorAll('[x-data]').forEach((e) => {
                        t(e)
                    })
                },
                discoverUninitializedComponents: function (t, e = null) {
                    const i = (e || document).querySelectorAll('[x-data]')
                    Array.from(i)
                        .filter((t) => void 0 === t.__x)
                        .forEach((e) => {
                            t(e)
                        })
                },
                listenForNewUninitializedComponentsAtRunTime: function () {
                    const t = document.querySelector('body'),
                        e = { childList: !0, attributes: !0, subtree: !0 }
                    new MutationObserver((t) => {
                        if (!this.pauseMutationObserver)
                            for (let e = 0; e < t.length; e++)
                                t[e].addedNodes.length > 0 &&
                                    t[e].addedNodes.forEach((t) => {
                                        1 === t.nodeType &&
                                            ((t.parentElement && t.parentElement.closest('[x-data]')) ||
                                                this.discoverUninitializedComponents((t) => {
                                                    this.initializeComponent(t)
                                                }, t.parentElement))
                                    })
                    }).observe(t, e)
                },
                initializeComponent: function (t) {
                    if (!t.__x)
                        try {
                            t.__x = new Wt(t)
                        } catch (t) {
                            setTimeout(() => {
                                throw t
                            }, 0)
                        }
                },
                clone: function (t, e) {
                    e.__x || (e.__x = new Wt(e, t))
                },
                addMagicProperty: function (t, e) {
                    this.magicProperties[t] = e
                },
                onComponentInitialized: function (t) {
                    this.onComponentInitializeds.push(t)
                },
                onBeforeComponentInitialized: function (t) {
                    this.onBeforeComponentInitializeds.push(t)
                },
            }
            return (
                s() ||
                    ((window.Alpine = $t),
                    window.deferLoadingAlpine
                        ? window.deferLoadingAlpine(function () {
                              window.Alpine.start()
                          })
                        : window.Alpine.start()),
                $t
            )
        })()
    })
    var r = e(function (e, i) {
        ;(function () {
            var t = function (t) {
                    return '[object Array]' === toString.call(t)
                },
                n = function (t) {
                    var e,
                        i,
                        n = ''
                    for (e = 0; e < t.length; e += 1)
                        switch ((i = t.charAt(e))) {
                            case '<':
                                n += '&lt;'
                                break
                            case '>':
                                n += '&gt;'
                                break
                            case '&':
                                n += '&amp;'
                                break
                            case '/':
                                n += '&#x2F;'
                                break
                            case '"':
                                n += '&quot;'
                                break
                            case "'":
                                n += '&#x27;'
                                break
                            default:
                                n += i
                        }
                    return n
                },
                r = function (t) {
                    return t
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#x27;')
                        .replace(/\//g, '&#x2F;')
                },
                s = function (e, i) {
                    var o, a, l, h
                    if (
                        (function (t) {
                            return 'string' == typeof t
                        })(e)
                    )
                        (h = e.length),
                            (o = 'charForLoopStrategy' === i ? n(e) : 'regexStrategy' === i || h > 32 ? r(e) : n(e))
                    else if (
                        'number' == typeof e ||
                        (function (t) {
                            return 'boolean' == typeof t
                        })(e)
                    )
                        o = e
                    else if (t(e)) for (o = [], l = 0; l < e.length; l += 1) o.push(s(e[l]))
                    else if (
                        (function (e) {
                            return !t(e) && e instanceof Object
                        })(e)
                    )
                        for (a in ((o = {}), e)) e.hasOwnProperty(a) && (o[a] = s(e[a]))
                    return o
                }
            e.exports && (i = e.exports = s), (i.xssEscape = s)
        }.call(t))
    })
    var s = function (t, e) {
            return function () {
                for (var i = new Array(arguments.length), n = 0; n < i.length; n++) i[n] = arguments[n]
                return t.apply(e, i)
            }
        },
        o = Object.prototype.toString
    function a(t) {
        return '[object Array]' === o.call(t)
    }
    function l(t) {
        return void 0 === t
    }
    function h(t) {
        return null !== t && 'object' == typeof t
    }
    function u(t) {
        if ('[object Object]' !== o.call(t)) return !1
        var e = Object.getPrototypeOf(t)
        return null === e || e === Object.prototype
    }
    function c(t) {
        return '[object Function]' === o.call(t)
    }
    function d(t, e) {
        if (null != t)
            if (('object' != typeof t && (t = [t]), a(t)))
                for (var i = 0, n = t.length; i < n; i++) e.call(null, t[i], i, t)
            else for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.call(null, t[r], r, t)
    }
    var f = {
        isArray: a,
        isArrayBuffer: function (t) {
            return '[object ArrayBuffer]' === o.call(t)
        },
        isBuffer: function (t) {
            return (
                null !== t &&
                !l(t) &&
                null !== t.constructor &&
                !l(t.constructor) &&
                'function' == typeof t.constructor.isBuffer &&
                t.constructor.isBuffer(t)
            )
        },
        isFormData: function (t) {
            return 'undefined' != typeof FormData && t instanceof FormData
        },
        isArrayBufferView: function (t) {
            return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                ? ArrayBuffer.isView(t)
                : t && t.buffer && t.buffer instanceof ArrayBuffer
        },
        isString: function (t) {
            return 'string' == typeof t
        },
        isNumber: function (t) {
            return 'number' == typeof t
        },
        isObject: h,
        isPlainObject: u,
        isUndefined: l,
        isDate: function (t) {
            return '[object Date]' === o.call(t)
        },
        isFile: function (t) {
            return '[object File]' === o.call(t)
        },
        isBlob: function (t) {
            return '[object Blob]' === o.call(t)
        },
        isFunction: c,
        isStream: function (t) {
            return h(t) && c(t.pipe)
        },
        isURLSearchParams: function (t) {
            return 'undefined' != typeof URLSearchParams && t instanceof URLSearchParams
        },
        isStandardBrowserEnv: function () {
            return (
                ('undefined' == typeof navigator ||
                    ('ReactNative' !== navigator.product &&
                        'NativeScript' !== navigator.product &&
                        'NS' !== navigator.product)) &&
                'undefined' != typeof window &&
                'undefined' != typeof document
            )
        },
        forEach: d,
        merge: function t() {
            var e = {}
            function i(i, n) {
                u(e[n]) && u(i)
                    ? (e[n] = t(e[n], i))
                    : u(i)
                    ? (e[n] = t({}, i))
                    : a(i)
                    ? (e[n] = i.slice())
                    : (e[n] = i)
            }
            for (var n = 0, r = arguments.length; n < r; n++) d(arguments[n], i)
            return e
        },
        extend: function (t, e, i) {
            return (
                d(e, function (e, n) {
                    t[n] = i && 'function' == typeof e ? s(e, i) : e
                }),
                t
            )
        },
        trim: function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '')
        },
        stripBOM: function (t) {
            return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t
        },
    }
    function p(t) {
        return encodeURIComponent(t)
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']')
    }
    var _ = function (t, e, i) {
        if (!e) return t
        var n
        if (i) n = i(e)
        else if (f.isURLSearchParams(e)) n = e.toString()
        else {
            var r = []
            f.forEach(e, function (t, e) {
                null != t &&
                    (f.isArray(t) ? (e += '[]') : (t = [t]),
                    f.forEach(t, function (t) {
                        f.isDate(t) ? (t = t.toISOString()) : f.isObject(t) && (t = JSON.stringify(t)),
                            r.push(p(e) + '=' + p(t))
                    }))
            }),
                (n = r.join('&'))
        }
        if (n) {
            var s = t.indexOf('#')
            ;-1 !== s && (t = t.slice(0, s)), (t += (-1 === t.indexOf('?') ? '?' : '&') + n)
        }
        return t
    }
    function m() {
        this.handlers = []
    }
    ;(m.prototype.use = function (t, e, i) {
        return (
            this.handlers.push({
                fulfilled: t,
                rejected: e,
                synchronous: !!i && i.synchronous,
                runWhen: i ? i.runWhen : null,
            }),
            this.handlers.length - 1
        )
    }),
        (m.prototype.eject = function (t) {
            this.handlers[t] && (this.handlers[t] = null)
        }),
        (m.prototype.forEach = function (t) {
            f.forEach(this.handlers, function (e) {
                null !== e && t(e)
            })
        })
    var g = m,
        v = function (t, e) {
            f.forEach(t, function (i, n) {
                n !== e && n.toUpperCase() === e.toUpperCase() && ((t[e] = i), delete t[n])
            })
        },
        y = function (t, e, i, n, r) {
            return (
                (t.config = e),
                i && (t.code = i),
                (t.request = n),
                (t.response = r),
                (t.isAxiosError = !0),
                (t.toJSON = function () {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: this.config,
                        code: this.code,
                    }
                }),
                t
            )
        },
        b = function (t, e, i, n, r) {
            var s = new Error(t)
            return y(s, e, i, n, r)
        },
        w = f.isStandardBrowserEnv()
            ? {
                  write: function (t, e, i, n, r, s) {
                      var o = []
                      o.push(t + '=' + encodeURIComponent(e)),
                          f.isNumber(i) && o.push('expires=' + new Date(i).toGMTString()),
                          f.isString(n) && o.push('path=' + n),
                          f.isString(r) && o.push('domain=' + r),
                          !0 === s && o.push('secure'),
                          (document.cookie = o.join('; '))
                  },
                  read: function (t) {
                      var e = document.cookie.match(new RegExp('(^|;\\s*)(' + t + ')=([^;]*)'))
                      return e ? decodeURIComponent(e[3]) : null
                  },
                  remove: function (t) {
                      this.write(t, '', Date.now() - 864e5)
                  },
              }
            : {
                  write: function () {},
                  read: function () {
                      return null
                  },
                  remove: function () {},
              },
        x = [
            'age',
            'authorization',
            'content-length',
            'content-type',
            'etag',
            'expires',
            'from',
            'host',
            'if-modified-since',
            'if-unmodified-since',
            'last-modified',
            'location',
            'max-forwards',
            'proxy-authorization',
            'referer',
            'retry-after',
            'user-agent',
        ],
        S = f.isStandardBrowserEnv()
            ? (function () {
                  var t,
                      e = /(msie|trident)/i.test(navigator.userAgent),
                      i = document.createElement('a')
                  function n(t) {
                      var n = t
                      return (
                          e && (i.setAttribute('href', n), (n = i.href)),
                          i.setAttribute('href', n),
                          {
                              href: i.href,
                              protocol: i.protocol ? i.protocol.replace(/:$/, '') : '',
                              host: i.host,
                              search: i.search ? i.search.replace(/^\?/, '') : '',
                              hash: i.hash ? i.hash.replace(/^#/, '') : '',
                              hostname: i.hostname,
                              port: i.port,
                              pathname: '/' === i.pathname.charAt(0) ? i.pathname : '/' + i.pathname,
                          }
                      )
                  }
                  return (
                      (t = n(window.location.href)),
                      function (e) {
                          var i = f.isString(e) ? n(e) : e
                          return i.protocol === t.protocol && i.host === t.host
                      }
                  )
              })()
            : function () {
                  return !0
              },
        E = function (t) {
            return new Promise(function (e, i) {
                var n = t.data,
                    r = t.headers,
                    s = t.responseType
                f.isFormData(n) && delete r['Content-Type']
                var o = new XMLHttpRequest()
                if (t.auth) {
                    var a = t.auth.username || '',
                        l = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : ''
                    r.Authorization = 'Basic ' + btoa(a + ':' + l)
                }
                var h,
                    u,
                    c =
                        ((h = t.baseURL),
                        (u = t.url),
                        h && !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(u)
                            ? (function (t, e) {
                                  return e ? t.replace(/\/+$/, '') + '/' + e.replace(/^\/+/, '') : t
                              })(h, u)
                            : u)
                function d() {
                    if (o) {
                        var n,
                            r,
                            a,
                            l,
                            h,
                            u =
                                'getAllResponseHeaders' in o
                                    ? ((n = o.getAllResponseHeaders()),
                                      (h = {}),
                                      n
                                          ? (f.forEach(n.split('\n'), function (t) {
                                                if (
                                                    ((l = t.indexOf(':')),
                                                    (r = f.trim(t.substr(0, l)).toLowerCase()),
                                                    (a = f.trim(t.substr(l + 1))),
                                                    r)
                                                ) {
                                                    if (h[r] && x.indexOf(r) >= 0) return
                                                    h[r] =
                                                        'set-cookie' === r
                                                            ? (h[r] ? h[r] : []).concat([a])
                                                            : h[r]
                                                            ? h[r] + ', ' + a
                                                            : a
                                                }
                                            }),
                                            h)
                                          : h)
                                    : null,
                            c = {
                                data: s && 'text' !== s && 'json' !== s ? o.response : o.responseText,
                                status: o.status,
                                statusText: o.statusText,
                                headers: u,
                                config: t,
                                request: o,
                            }
                        !(function (t, e, i) {
                            var n = i.config.validateStatus
                            i.status && n && !n(i.status)
                                ? e(b('Request failed with status code ' + i.status, i.config, null, i.request, i))
                                : t(i)
                        })(e, i, c),
                            (o = null)
                    }
                }
                if (
                    (o.open(t.method.toUpperCase(), _(c, t.params, t.paramsSerializer), !0),
                    (o.timeout = t.timeout),
                    'onloadend' in o
                        ? (o.onloadend = d)
                        : (o.onreadystatechange = function () {
                              o &&
                                  4 === o.readyState &&
                                  (0 !== o.status || (o.responseURL && 0 === o.responseURL.indexOf('file:'))) &&
                                  setTimeout(d)
                          }),
                    (o.onabort = function () {
                        o && (i(b('Request aborted', t, 'ECONNABORTED', o)), (o = null))
                    }),
                    (o.onerror = function () {
                        i(b('Network Error', t, null, o)), (o = null)
                    }),
                    (o.ontimeout = function () {
                        var e = 'timeout of ' + t.timeout + 'ms exceeded'
                        t.timeoutErrorMessage && (e = t.timeoutErrorMessage),
                            i(
                                b(
                                    e,
                                    t,
                                    t.transitional && t.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
                                    o,
                                ),
                            ),
                            (o = null)
                    }),
                    f.isStandardBrowserEnv())
                ) {
                    var p = (t.withCredentials || S(c)) && t.xsrfCookieName ? w.read(t.xsrfCookieName) : void 0
                    p && (r[t.xsrfHeaderName] = p)
                }
                'setRequestHeader' in o &&
                    f.forEach(r, function (t, e) {
                        void 0 === n && 'content-type' === e.toLowerCase() ? delete r[e] : o.setRequestHeader(e, t)
                    }),
                    f.isUndefined(t.withCredentials) || (o.withCredentials = !!t.withCredentials),
                    s && 'json' !== s && (o.responseType = t.responseType),
                    'function' == typeof t.onDownloadProgress && o.addEventListener('progress', t.onDownloadProgress),
                    'function' == typeof t.onUploadProgress &&
                        o.upload &&
                        o.upload.addEventListener('progress', t.onUploadProgress),
                    t.cancelToken &&
                        t.cancelToken.promise.then(function (t) {
                            o && (o.abort(), i(t), (o = null))
                        }),
                    n || (n = null),
                    o.send(n)
            })
        },
        T = { 'Content-Type': 'application/x-www-form-urlencoded' }
    function D(t, e) {
        !f.isUndefined(t) && f.isUndefined(t['Content-Type']) && (t['Content-Type'] = e)
    }
    var A,
        k = {
            transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
            adapter:
                (('undefined' != typeof XMLHttpRequest ||
                    ('undefined' != typeof process &&
                        '[object process]' === Object.prototype.toString.call(process))) &&
                    (A = E),
                A),
            transformRequest: [
                function (t, e) {
                    return (
                        v(e, 'Accept'),
                        v(e, 'Content-Type'),
                        f.isFormData(t) ||
                        f.isArrayBuffer(t) ||
                        f.isBuffer(t) ||
                        f.isStream(t) ||
                        f.isFile(t) ||
                        f.isBlob(t)
                            ? t
                            : f.isArrayBufferView(t)
                            ? t.buffer
                            : f.isURLSearchParams(t)
                            ? (D(e, 'application/x-www-form-urlencoded;charset=utf-8'), t.toString())
                            : f.isObject(t) || (e && 'application/json' === e['Content-Type'])
                            ? (D(e, 'application/json'), JSON.stringify(t))
                            : t
                    )
                },
            ],
            transformResponse: [
                function (t) {
                    var e = this.transitional,
                        i = e && e.silentJSONParsing,
                        n = e && e.forcedJSONParsing,
                        r = !i && 'json' === this.responseType
                    if (r || (n && f.isString(t) && t.length))
                        try {
                            return JSON.parse(t)
                        } catch (t) {
                            if (r) {
                                if ('SyntaxError' === t.name) throw y(t, this, 'E_JSON_PARSE')
                                throw t
                            }
                        }
                    return t
                },
            ],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            validateStatus: function (t) {
                return t >= 200 && t < 300
            },
        }
    ;(k.headers = { common: { Accept: 'application/json, text/plain, */*' } }),
        f.forEach(['delete', 'get', 'head'], function (t) {
            k.headers[t] = {}
        }),
        f.forEach(['post', 'put', 'patch'], function (t) {
            k.headers[t] = f.merge(T)
        })
    var R = k,
        P = function (t, e, i) {
            var n = this || R
            return (
                f.forEach(i, function (i) {
                    t = i.call(n, t, e)
                }),
                t
            )
        },
        O = function (t) {
            return !(!t || !t.__CANCEL__)
        }
    function L(t) {
        t.cancelToken && t.cancelToken.throwIfRequested()
    }
    var C = function (t) {
            return (
                L(t),
                (t.headers = t.headers || {}),
                (t.data = P.call(t, t.data, t.headers, t.transformRequest)),
                (t.headers = f.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers)),
                f.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (e) {
                    delete t.headers[e]
                }),
                (t.adapter || R.adapter)(t).then(
                    function (e) {
                        return L(t), (e.data = P.call(t, e.data, e.headers, t.transformResponse)), e
                    },
                    function (e) {
                        return (
                            O(e) ||
                                (L(t),
                                e &&
                                    e.response &&
                                    (e.response.data = P.call(
                                        t,
                                        e.response.data,
                                        e.response.headers,
                                        t.transformResponse,
                                    ))),
                            Promise.reject(e)
                        )
                    },
                )
            )
        },
        M = function (t, e) {
            e = e || {}
            var i = {},
                n = ['url', 'method', 'data'],
                r = ['headers', 'auth', 'proxy', 'params'],
                s = [
                    'baseURL',
                    'transformRequest',
                    'transformResponse',
                    'paramsSerializer',
                    'timeout',
                    'timeoutMessage',
                    'withCredentials',
                    'adapter',
                    'responseType',
                    'xsrfCookieName',
                    'xsrfHeaderName',
                    'onUploadProgress',
                    'onDownloadProgress',
                    'decompress',
                    'maxContentLength',
                    'maxBodyLength',
                    'maxRedirects',
                    'transport',
                    'httpAgent',
                    'httpsAgent',
                    'cancelToken',
                    'socketPath',
                    'responseEncoding',
                ],
                o = ['validateStatus']
            function a(t, e) {
                return f.isPlainObject(t) && f.isPlainObject(e)
                    ? f.merge(t, e)
                    : f.isPlainObject(e)
                    ? f.merge({}, e)
                    : f.isArray(e)
                    ? e.slice()
                    : e
            }
            function l(n) {
                f.isUndefined(e[n]) ? f.isUndefined(t[n]) || (i[n] = a(void 0, t[n])) : (i[n] = a(t[n], e[n]))
            }
            f.forEach(n, function (t) {
                f.isUndefined(e[t]) || (i[t] = a(void 0, e[t]))
            }),
                f.forEach(r, l),
                f.forEach(s, function (n) {
                    f.isUndefined(e[n]) ? f.isUndefined(t[n]) || (i[n] = a(void 0, t[n])) : (i[n] = a(void 0, e[n]))
                }),
                f.forEach(o, function (n) {
                    n in e ? (i[n] = a(t[n], e[n])) : n in t && (i[n] = a(void 0, t[n]))
                })
            var h = n.concat(r).concat(s).concat(o),
                u = Object.keys(t)
                    .concat(Object.keys(e))
                    .filter(function (t) {
                        return -1 === h.indexOf(t)
                    })
            return f.forEach(u, l), i
        },
        I = {
            _args: [['axios@0.21.2', '/usr/src/app']],
            _from: 'axios@0.21.2',
            _id: 'axios@0.21.2',
            _inBundle: !1,
            _integrity:
                'sha512-87otirqUw3e8CzHTMO+/9kh/FSgXt/eVDvipijwDtEuwbkySWZ9SBm6VEubmJ/kLKEoLQV/POhxXFb66bfekfg==',
            _location: '/axios',
            _phantomChildren: {},
            _requested: {
                type: 'version',
                registry: !0,
                raw: 'axios@0.21.2',
                name: 'axios',
                escapedName: 'axios',
                rawSpec: '0.21.2',
                saveSpec: null,
                fetchSpec: '0.21.2',
            },
            _requiredBy: ['/'],
            _resolved: 'https://registry.npmjs.org/axios/-/axios-0.21.2.tgz',
            _spec: '0.21.2',
            _where: '/usr/src/app',
            author: { name: 'Matt Zabriskie' },
            browser: { './lib/adapters/http.js': './lib/adapters/xhr.js' },
            bugs: { url: 'https://github.com/axios/axios/issues' },
            bundlesize: [{ path: './dist/axios.min.js', threshold: '5kB' }],
            dependencies: { 'follow-redirects': '^1.14.0' },
            description: 'Promise based HTTP client for the browser and node.js',
            devDependencies: {
                coveralls: '^3.0.0',
                'es6-promise': '^4.2.4',
                grunt: '^1.3.0',
                'grunt-banner': '^0.6.0',
                'grunt-cli': '^1.2.0',
                'grunt-contrib-clean': '^1.1.0',
                'grunt-contrib-watch': '^1.0.0',
                'grunt-eslint': '^23.0.0',
                'grunt-karma': '^4.0.0',
                'grunt-mocha-test': '^0.13.3',
                'grunt-ts': '^6.0.0-beta.19',
                'grunt-webpack': '^4.0.2',
                'istanbul-instrumenter-loader': '^1.0.0',
                'jasmine-core': '^2.4.1',
                karma: '^6.3.2',
                'karma-chrome-launcher': '^3.1.0',
                'karma-firefox-launcher': '^2.1.0',
                'karma-jasmine': '^1.1.1',
                'karma-jasmine-ajax': '^0.1.13',
                'karma-safari-launcher': '^1.0.0',
                'karma-sauce-launcher': '^4.3.6',
                'karma-sinon': '^1.0.5',
                'karma-sourcemap-loader': '^0.3.8',
                'karma-webpack': '^4.0.2',
                'load-grunt-tasks': '^3.5.2',
                minimist: '^1.2.0',
                mocha: '^8.2.1',
                sinon: '^4.5.0',
                'terser-webpack-plugin': '^4.2.3',
                typescript: '^4.0.5',
                'url-search-params': '^0.10.0',
                webpack: '^4.44.2',
                'webpack-dev-server': '^3.11.0',
            },
            homepage: 'https://axios-http.com',
            jsdelivr: 'dist/axios.min.js',
            keywords: ['xhr', 'http', 'ajax', 'promise', 'node'],
            license: 'MIT',
            main: 'index.js',
            name: 'axios',
            repository: { type: 'git', url: 'git+https://github.com/axios/axios.git' },
            scripts: {
                build: 'NODE_ENV=production grunt build',
                coveralls: 'cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js',
                examples: 'node ./examples/server.js',
                fix: 'eslint --fix lib/**/*.js',
                postversion: 'git push && git push --tags',
                preversion: 'npm test',
                start: 'node ./sandbox/server.js',
                test: 'grunt test',
                version:
                    'npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json',
            },
            typings: './index.d.ts',
            unpkg: 'dist/axios.min.js',
            version: '0.21.2',
        },
        N = {}
    ;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (t, e) {
        N[t] = function (i) {
            return typeof i === t || 'a' + (e < 1 ? 'n ' : ' ') + t
        }
    })
    var q = {},
        j = I.version.split('.')
    function X(t, e) {
        for (var i = e ? e.split('.') : j, n = t.split('.'), r = 0; r < 3; r++) {
            if (i[r] > n[r]) return !0
            if (i[r] < n[r]) return !1
        }
        return !1
    }
    N.transitional = function (t, e, i) {
        var n = e && X(e)
        function r(t, e) {
            return '[Axios v' + I.version + "] Transitional option '" + t + "'" + e + (i ? '. ' + i : '')
        }
        return function (i, s, o) {
            if (!1 === t) throw new Error(r(s, ' has been removed in ' + e))
            return (
                n &&
                    !q[s] &&
                    ((q[s] = !0),
                    console.warn(r(s, ' has been deprecated since v' + e + ' and will be removed in the near future'))),
                !t || t(i, s, o)
            )
        }
    }
    var F = {
            isOlderVersion: X,
            assertOptions: function (t, e, i) {
                if ('object' != typeof t) throw new TypeError('options must be an object')
                for (var n = Object.keys(t), r = n.length; r-- > 0; ) {
                    var s = n[r],
                        o = e[s]
                    if (o) {
                        var a = t[s],
                            l = void 0 === a || o(a, s, t)
                        if (!0 !== l) throw new TypeError('option ' + s + ' must be ' + l)
                    } else if (!0 !== i) throw Error('Unknown option ' + s)
                }
            },
            validators: N,
        },
        H = F.validators
    function Y(t) {
        ;(this.defaults = t), (this.interceptors = { request: new g(), response: new g() })
    }
    ;(Y.prototype.request = function (t) {
        'string' == typeof t ? ((t = arguments[1] || {}).url = arguments[0]) : (t = t || {}),
            (t = M(this.defaults, t)).method
                ? (t.method = t.method.toLowerCase())
                : this.defaults.method
                ? (t.method = this.defaults.method.toLowerCase())
                : (t.method = 'get')
        var e = t.transitional
        void 0 !== e &&
            F.assertOptions(
                e,
                {
                    silentJSONParsing: H.transitional(H.boolean, '1.0.0'),
                    forcedJSONParsing: H.transitional(H.boolean, '1.0.0'),
                    clarifyTimeoutError: H.transitional(H.boolean, '1.0.0'),
                },
                !1,
            )
        var i = [],
            n = !0
        this.interceptors.request.forEach(function (e) {
            ;('function' == typeof e.runWhen && !1 === e.runWhen(t)) ||
                ((n = n && e.synchronous), i.unshift(e.fulfilled, e.rejected))
        })
        var r,
            s = []
        if (
            (this.interceptors.response.forEach(function (t) {
                s.push(t.fulfilled, t.rejected)
            }),
            !n)
        ) {
            var o = [C, void 0]
            for (Array.prototype.unshift.apply(o, i), o.concat(s), r = Promise.resolve(t); o.length; )
                r = r.then(o.shift(), o.shift())
            return r
        }
        for (var a = t; i.length; ) {
            var l = i.shift(),
                h = i.shift()
            try {
                a = l(a)
            } catch (t) {
                h(t)
                break
            }
        }
        try {
            r = C(a)
        } catch (t) {
            return Promise.reject(t)
        }
        for (; s.length; ) r = r.then(s.shift(), s.shift())
        return r
    }),
        (Y.prototype.getUri = function (t) {
            return (t = M(this.defaults, t)), _(t.url, t.params, t.paramsSerializer).replace(/^\?/, '')
        }),
        f.forEach(['delete', 'get', 'head', 'options'], function (t) {
            Y.prototype[t] = function (e, i) {
                return this.request(M(i || {}, { method: t, url: e, data: (i || {}).data }))
            }
        }),
        f.forEach(['post', 'put', 'patch'], function (t) {
            Y.prototype[t] = function (e, i, n) {
                return this.request(M(n || {}, { method: t, url: e, data: i }))
            }
        })
    var B = Y
    function z(t) {
        this.message = t
    }
    ;(z.prototype.toString = function () {
        return 'Cancel' + (this.message ? ': ' + this.message : '')
    }),
        (z.prototype.__CANCEL__ = !0)
    var W = z
    function $(t) {
        if ('function' != typeof t) throw new TypeError('executor must be a function.')
        var e
        this.promise = new Promise(function (t) {
            e = t
        })
        var i = this
        t(function (t) {
            i.reason || ((i.reason = new W(t)), e(i.reason))
        })
    }
    ;($.prototype.throwIfRequested = function () {
        if (this.reason) throw this.reason
    }),
        ($.source = function () {
            var t
            return {
                token: new $(function (e) {
                    t = e
                }),
                cancel: t,
            }
        })
    var G = $
    function U(t) {
        var e = new B(t),
            i = s(B.prototype.request, e)
        return f.extend(i, B.prototype, e), f.extend(i, e), i
    }
    var V = U(R)
    ;(V.Axios = B),
        (V.create = function (t) {
            return U(M(V.defaults, t))
        }),
        (V.Cancel = W),
        (V.CancelToken = G),
        (V.isCancel = O),
        (V.all = function (t) {
            return Promise.all(t)
        }),
        (V.spread = function (t) {
            return function (e) {
                return t.apply(null, e)
            }
        }),
        (V.isAxiosError = function (t) {
            return 'object' == typeof t && !0 === t.isAxiosError
        })
    var J = V,
        K = V
    J.default = K
    var Q = J.create({
            baseURL: window.metagalleryData.root,
            headers: { 'X-WP-Nonce': window.metagalleryData.nonce, 'X-Requested-With': 'XMLHttpRequest' },
        }),
        Z = function (t, e, i, n) {
            var r = new FormData()
            return (
                r.append('title', e),
                r.append('images', JSON.stringify(i)),
                r.append('settings', JSON.stringify(n)),
                Q.post('gallery/' + t, r, { headers: { 'Content-Type': 'multipart/form-data' } })
            )
        }
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
     */
    var tt = {},
        et = 'function' == typeof Map ? new Map() : null,
        it = 'swap',
        nt = 'move',
        rt = 'layoutStart',
        st = 'layoutEnd',
        ot = 'layoutAbort',
        at = 'remove',
        lt = 'hideStart',
        ht = 'filter',
        ut = 'sort',
        ct = 'move',
        dt = 'send',
        ft = 'beforeSend',
        pt = 'receive',
        _t = 'beforeReceive',
        mt = 'dragReleaseEnd',
        gt = 'ontouchstart' in window,
        vt = !!window.PointerEvent,
        yt = !!window.navigator.msPointerEnabled
    function bt() {
        ;(this._events = {}), (this._queue = []), (this._counter = 0), (this._clearOnEmit = !1)
    }
    ;(bt.prototype.on = function (t, e) {
        if (!this._events || !t || !e) return this
        var i = this._events[t]
        return i || (i = this._events[t] = []), i.push(e), this
    }),
        (bt.prototype.off = function (t, e) {
            if (!this._events || !t || !e) return this
            var i,
                n = this._events[t]
            if (!n || !n.length) return this
            for (; -1 !== (i = n.indexOf(e)); ) n.splice(i, 1)
            return this
        }),
        (bt.prototype.clear = function (t) {
            if (!this._events || !t) return this
            var e = this._events[t]
            return e && ((e.length = 0), delete this._events[t]), this
        }),
        (bt.prototype.emit = function (t) {
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
        (bt.prototype.burst = function () {
            return this._events ? ((this._clearOnEmit = !0), this.emit.apply(this, arguments), this) : this
        }),
        (bt.prototype.countListeners = function (t) {
            if (!this._events) return 0
            var e = this._events[t]
            return e ? e.length : 0
        }),
        (bt.prototype.destroy = function () {
            return this._events ? ((this._queue.length = this._counter = 0), (this._events = null), this) : this
        })
    var wt = vt ? 'pointerout' : yt ? 'MSPointerOut' : ''
    function xt(t) {
        wt &&
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
    ;(xt.prototype._addBehaviour = function () {
        this._isActive ||
            ((this._isActive = !0),
            this._dragger.on('move', this._resetData),
            this._dragger.on('cancel', this._removeBehaviour),
            this._dragger.on('end', this._removeBehaviour),
            window.addEventListener(wt, this._onOut))
    }),
        (xt.prototype._removeBehaviour = function () {
            this._isActive &&
                (this._dragger.off('move', this._resetData),
                this._dragger.off('cancel', this._removeBehaviour),
                this._dragger.off('end', this._removeBehaviour),
                window.removeEventListener(wt, this._onOut),
                this._resetData(),
                (this._isActive = !1))
        }),
        (xt.prototype._resetData = function () {
            window.clearTimeout(this._timeout), (this._timeout = null), (this._outEvent = null)
        }),
        (xt.prototype._onStart = function (t) {
            'mouse' !== t.pointerType && this._addBehaviour()
        }),
        (xt.prototype._onOut = function (t) {
            this._dragger._getTrackedTouch(t) &&
                (this._resetData(), (this._outEvent = t), (this._timeout = window.setTimeout(this._onTimeout, 100)))
        }),
        (xt.prototype._onTimeout = function () {
            var t = this._outEvent
            this._resetData(), this._dragger.isActive() && this._dragger._onCancel(t)
        }),
        (xt.prototype.destroy = function () {
            wt && (this._dragger.off('start', this._onStart), this._removeBehaviour())
        })
    var St = ['', 'webkit', 'moz', 'ms', 'o', 'Webkit', 'Moz', 'MS', 'O'],
        Et = {}
    function Tt(t, e) {
        var i = Et[e] || ''
        if (i) return i
        for (var n = e[0].toUpperCase() + e.slice(1), r = 0; r < St.length; ) {
            if ((i = St[r] ? St[r] + n : e) in t) return (Et[e] = i), i
            ++r
        }
        return ''
    }
    function Dt() {
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
    var At = window.navigator.userAgent.toLowerCase(),
        kt = At.indexOf('edge') > -1,
        Rt = At.indexOf('trident') > -1,
        Pt = At.indexOf('firefox') > -1,
        Ot = At.indexOf('android') > -1,
        Lt = !!Dt() && { passive: !0 },
        Ct = 'touchAction',
        Mt = Tt(document.documentElement.style, Ct)
    function It(t, e) {
        ;(this._element = t),
            (this._emitter = new bt()),
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
            (kt || Rt) && (vt || yt) && (this._edgeHack = new xt(this)),
            this.setCssProps(e),
            this._touchAction || this.setTouchAction('auto'),
            t.addEventListener('dragstart', It._preventDefault, !1),
            t.addEventListener(It._inputEvents.start, this._onStart, Lt)
    }
    ;(It._pointerEvents = { start: 'pointerdown', move: 'pointermove', cancel: 'pointercancel', end: 'pointerup' }),
        (It._msPointerEvents = {
            start: 'MSPointerDown',
            move: 'MSPointerMove',
            cancel: 'MSPointerCancel',
            end: 'MSPointerUp',
        }),
        (It._touchEvents = { start: 'touchstart', move: 'touchmove', cancel: 'touchcancel', end: 'touchend' }),
        (It._mouseEvents = { start: 'mousedown', move: 'mousemove', cancel: '', end: 'mouseup' }),
        (It._inputEvents = gt ? It._touchEvents : vt ? It._pointerEvents : yt ? It._msPointerEvents : It._mouseEvents),
        (It._emitter = new bt()),
        (It._emitterEvents = { start: 'start', move: 'move', end: 'end', cancel: 'cancel' }),
        (It._activeInstances = []),
        (It._preventDefault = function (t) {
            t.preventDefault && !1 !== t.cancelable && t.preventDefault()
        }),
        (It._activateInstance = function (t) {
            It._activeInstances.indexOf(t) > -1 ||
                (It._activeInstances.push(t),
                It._emitter.on(It._emitterEvents.move, t._onMove),
                It._emitter.on(It._emitterEvents.cancel, t._onCancel),
                It._emitter.on(It._emitterEvents.end, t._onEnd),
                1 === It._activeInstances.length && It._bindListeners())
        }),
        (It._deactivateInstance = function (t) {
            var e = It._activeInstances.indexOf(t)
            ;-1 !== e &&
                (It._activeInstances.splice(e, 1),
                It._emitter.off(It._emitterEvents.move, t._onMove),
                It._emitter.off(It._emitterEvents.cancel, t._onCancel),
                It._emitter.off(It._emitterEvents.end, t._onEnd),
                It._activeInstances.length || It._unbindListeners())
        }),
        (It._bindListeners = function () {
            window.addEventListener(It._inputEvents.move, It._onMove, Lt),
                window.addEventListener(It._inputEvents.end, It._onEnd, Lt),
                It._inputEvents.cancel && window.addEventListener(It._inputEvents.cancel, It._onCancel, Lt)
        }),
        (It._unbindListeners = function () {
            window.removeEventListener(It._inputEvents.move, It._onMove, Lt),
                window.removeEventListener(It._inputEvents.end, It._onEnd, Lt),
                It._inputEvents.cancel && window.removeEventListener(It._inputEvents.cancel, It._onCancel, Lt)
        }),
        (It._getEventPointerId = function (t) {
            return 'number' == typeof t.pointerId
                ? t.pointerId
                : t.changedTouches
                ? t.changedTouches[0]
                    ? t.changedTouches[0].identifier
                    : null
                : 1
        }),
        (It._getTouchById = function (t, e) {
            if ('number' == typeof t.pointerId) return t.pointerId === e ? t : null
            if (t.changedTouches) {
                for (var i = 0; i < t.changedTouches.length; i++)
                    if (t.changedTouches[i].identifier === e) return t.changedTouches[i]
                return null
            }
            return t
        }),
        (It._onMove = function (t) {
            It._emitter.emit(It._emitterEvents.move, t)
        }),
        (It._onCancel = function (t) {
            It._emitter.emit(It._emitterEvents.cancel, t)
        }),
        (It._onEnd = function (t) {
            It._emitter.emit(It._emitterEvents.end, t)
        }),
        (It.prototype._reset = function () {
            ;(this._pointerId = null),
                (this._startTime = 0),
                (this._startX = 0),
                (this._startY = 0),
                (this._currentX = 0),
                (this._currentY = 0),
                (this._isActive = !1),
                It._deactivateInstance(this)
        }),
        (It.prototype._createEvent = function (t, e) {
            var i = this._getTrackedTouch(e)
            return {
                type: t,
                srcEvent: e,
                distance: this.getDistance(),
                deltaX: this.getDeltaX(),
                deltaY: this.getDeltaY(),
                deltaTime: t === It._emitterEvents.start ? 0 : this.getDeltaTime(),
                isFirst: t === It._emitterEvents.start,
                isFinal: t === It._emitterEvents.end || t === It._emitterEvents.cancel,
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
        (It.prototype._emit = function (t, e) {
            this._emitter.emit(t, this._createEvent(t, e))
        }),
        (It.prototype._getTrackedTouch = function (t) {
            return null === this._pointerId ? null : It._getTouchById(t, this._pointerId)
        }),
        (It.prototype._onStart = function (t) {
            if (
                !this._isDestroyed &&
                null === this._pointerId &&
                ((this._pointerId = It._getEventPointerId(t)), null !== this._pointerId)
            ) {
                var e = this._getTrackedTouch(t)
                ;(this._startX = this._currentX = e.clientX),
                    (this._startY = this._currentY = e.clientY),
                    (this._startTime = Date.now()),
                    (this._isActive = !0),
                    this._emit(It._emitterEvents.start, t),
                    this._isActive && It._activateInstance(this)
            }
        }),
        (It.prototype._onMove = function (t) {
            var e = this._getTrackedTouch(t)
            e && ((this._currentX = e.clientX), (this._currentY = e.clientY), this._emit(It._emitterEvents.move, t))
        }),
        (It.prototype._onCancel = function (t) {
            this._getTrackedTouch(t) && (this._emit(It._emitterEvents.cancel, t), this._reset())
        }),
        (It.prototype._onEnd = function (t) {
            this._getTrackedTouch(t) && (this._emit(It._emitterEvents.end, t), this._reset())
        }),
        (It.prototype.isActive = function () {
            return this._isActive
        }),
        (It.prototype.setTouchAction = function (t) {
            ;(this._touchAction = t),
                Mt && ((this._cssProps[Mt] = ''), (this._element.style[Mt] = t)),
                gt &&
                    (this._element.removeEventListener(It._touchEvents.start, It._preventDefault, !0),
                    (this._element.style[Mt] !== t || (Pt && Ot)) &&
                        this._element.addEventListener(It._touchEvents.start, It._preventDefault, !0))
        }),
        (It.prototype.setCssProps = function (t) {
            if (t) {
                var e,
                    i,
                    n = this._cssProps,
                    r = this._element
                for (e in n) (r.style[e] = n[e]), delete n[e]
                for (e in t)
                    t[e] &&
                        (e !== Ct
                            ? (i = Tt(r.style, e)) && ((n[i] = ''), (r.style[i] = t[e]))
                            : this.setTouchAction(t[e]))
            }
        }),
        (It.prototype.getDeltaX = function () {
            return this._currentX - this._startX
        }),
        (It.prototype.getDeltaY = function () {
            return this._currentY - this._startY
        }),
        (It.prototype.getDistance = function () {
            var t = this.getDeltaX(),
                e = this.getDeltaY()
            return Math.sqrt(t * t + e * e)
        }),
        (It.prototype.getDeltaTime = function () {
            return this._startTime ? Date.now() - this._startTime : 0
        }),
        (It.prototype.on = function (t, e) {
            this._emitter.on(t, e)
        }),
        (It.prototype.off = function (t, e) {
            this._emitter.off(t, e)
        }),
        (It.prototype.destroy = function () {
            if (!this._isDestroyed) {
                var t = this._element
                for (var e in (this._edgeHack && this._edgeHack.destroy(),
                this._reset(),
                this._emitter.destroy(),
                t.removeEventListener(It._inputEvents.start, this._onStart, Lt),
                t.removeEventListener('dragstart', It._preventDefault, !1),
                t.removeEventListener(It._touchEvents.start, It._preventDefault, !0),
                this._cssProps))
                    (t.style[e] = this._cssProps[e]), delete this._cssProps[e]
                ;(this._element = null), (this._isDestroyed = !0)
            }
        })
    var Nt = (
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
    function qt(t) {
        ;(this._nextStep = null),
            (this._lanes = []),
            (this._stepQueue = []),
            (this._stepCallbacks = {}),
            (this._step = this._step.bind(this))
        for (var e = 0; e < t; e++) this._lanes.push(new jt())
    }
    function jt() {
        ;(this.queue = []), (this.indices = {}), (this.callbacks = {})
    }
    ;(qt.prototype._step = function (t) {
        var e,
            i,
            n,
            r,
            s,
            o,
            a = this._lanes,
            l = this._stepQueue,
            h = this._stepCallbacks
        for (this._nextStep = null, e = 0; e < a.length; e++) {
            for (r = a[e].queue, s = a[e].callbacks, o = a[e].indices, i = 0; i < r.length; i++)
                (n = r[i]) && (l.push(n), (h[n] = s[n]), delete s[n], delete o[n])
            r.length = 0
        }
        for (e = 0; e < l.length; e++) h[(n = l[e])] && h[n](t), delete h[n]
        l.length = 0
    }),
        (qt.prototype.add = function (t, e, i) {
            this._lanes[t].add(e, i), this._nextStep || (this._nextStep = Nt(this._step))
        }),
        (qt.prototype.remove = function (t, e) {
            this._lanes[t].remove(e)
        }),
        (jt.prototype.add = function (t, e) {
            var i = this.indices[t]
            void 0 !== i && (this.queue[i] = void 0),
                this.queue.push(t),
                (this.callbacks[t] = e),
                (this.indices[t] = this.queue.length - 1)
        }),
        (jt.prototype.remove = function (t) {
            var e = this.indices[t]
            void 0 !== e && ((this.queue[e] = void 0), delete this.callbacks[t], delete this.indices[t])
        })
    var Xt = 'layoutRead',
        Ft = 'layoutWrite',
        Ht = 'visibilityRead',
        Yt = 'visibilityWrite',
        Bt = 'dragStartRead',
        zt = 'dragStartWrite',
        Wt = 'dragMoveRead',
        $t = 'dragMoveWrite',
        Gt = 'dragScrollRead',
        Ut = 'dragScrollWrite',
        Vt = 'dragSortRead',
        Jt = 'placeholderLayoutRead',
        Kt = 'placeholderLayoutWrite',
        Qt = 'placeholderResizeWrite',
        Zt = 'autoScrollRead',
        te = 'autoScrollWrite',
        ee = 'debounceRead',
        ie = new qt(3)
    function ne(t) {
        ie.remove(0, Xt + t), ie.remove(2, Ft + t)
    }
    function re(t) {
        ie.remove(0, Ht + t), ie.remove(2, Yt + t)
    }
    function se(t) {
        ie.remove(0, Bt + t), ie.remove(2, zt + t)
    }
    function oe(t) {
        ie.remove(0, Wt + t), ie.remove(2, $t + t)
    }
    function ae(t) {
        ie.remove(0, Gt + t), ie.remove(2, Ut + t)
    }
    function le(t, e) {
        ie.add(1, Vt + t, e)
    }
    function he(t) {
        ie.remove(0, Jt + t), ie.remove(2, Kt + t)
    }
    function ue(t, e) {
        ie.add(0, Zt, t), ie.add(2, te, e)
    }
    function ce(t) {
        return 'function' == typeof t
    }
    var de,
        fe = 'function' == typeof WeakMap,
        pe = fe ? new WeakMap() : null,
        _e = !0,
        me = function () {
            _e ? ((de = window.clearInterval(de)), (pe = fe ? new WeakMap() : null)) : (_e = !0)
        }
    function ge(t, e) {
        var i = pe && pe.get(t)
        return (
            i || ((i = window.getComputedStyle(t, null)), pe && pe.set(t, i)),
            pe && (de ? (_e = !1) : (de = window.setInterval(me, 3e3))),
            i.getPropertyValue(e)
        )
    }
    function ve(t, e) {
        return parseFloat(ge(t, e)) || 0
    }
    var ye,
        be = document.documentElement,
        we = document.body,
        xe = { value: 0, offset: 0 }
    function Se(t) {
        return t === window || t === be || t === we ? window : t
    }
    function Ee(t) {
        return t === window ? t.pageXOffset : t.scrollLeft
    }
    function Te(t) {
        return t === window ? t.pageYOffset : t.scrollTop
    }
    function De(t) {
        return t === window ? be.scrollWidth - be.clientWidth : t.scrollWidth - t.clientWidth
    }
    function Ae(t) {
        return t === window ? be.scrollHeight - be.clientHeight : t.scrollHeight - t.clientHeight
    }
    function ke(t, e) {
        if (((e = e || {}), t === window))
            (e.width = be.clientWidth),
                (e.height = be.clientHeight),
                (e.left = 0),
                (e.right = e.width),
                (e.top = 0),
                (e.bottom = e.height)
        else {
            var i = t.getBoundingClientRect(),
                n = t.clientLeft || ve(t, 'border-left-width'),
                r = t.clientTop || ve(t, 'border-top-width')
            ;(e.width = t.clientWidth),
                (e.height = t.clientHeight),
                (e.left = i.left + n),
                (e.right = e.left + e.width),
                (e.top = i.top + r),
                (e.bottom = e.top + e.height)
        }
        return e
    }
    function Re(t) {
        return t._drag._getGrid()._settings.dragAutoScroll
    }
    function Pe(t) {
        t._drag && t._drag._prepareScroll()
    }
    function Oe(t) {
        if (t._drag && t._isActive) {
            var e = t._drag
            ;(e._scrollDiffX = e._scrollDiffY = 0), t._setTranslate(e._left, e._top)
        }
    }
    function Le(t, e, i, n) {
        return (xe.value = Math.min(n / 2, t)), (xe.offset = Math.max(0, i + 2 * xe.value + n * e - n) / 2), xe
    }
    function Ce() {
        this.reset()
    }
    function Me() {
        ;(this.element = null),
            (this.requestX = null),
            (this.requestY = null),
            (this.scrollLeft = 0),
            (this.scrollTop = 0)
    }
    function Ie(t, e) {
        ;(this.pool = []), (this.createItem = t), (this.releaseItem = e)
    }
    function Ne(t, e) {
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
    ;(Ce.prototype.reset = function () {
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
        (Ce.prototype.hasReachedEnd = function () {
            return 4 & this.direction ? this.value >= this.maxValue : this.value <= 0
        }),
        (Ce.prototype.computeCurrentScrollValue = function () {
            return null === this.value
                ? 1 & this.direction
                    ? Ee(this.element)
                    : Te(this.element)
                : Math.max(0, Math.min(this.value, this.maxValue))
        }),
        (Ce.prototype.computeNextScrollValue = function (t) {
            var e = this.speed * (t / 1e3),
                i = 4 & this.direction ? this.value + e : this.value - e
            return Math.max(0, Math.min(i, this.maxValue))
        }),
        (Ce.prototype.computeSpeed =
            ((ye = {
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
                    i = Re(e).speed
                return ce(i)
                    ? ((ye.direction = this.direction),
                      (ye.threshold = this.threshold),
                      (ye.distance = this.distance),
                      (ye.value = this.value),
                      (ye.maxValue = this.maxValue),
                      (ye.duration = this.duration),
                      (ye.speed = this.speed),
                      (ye.deltaTime = t),
                      (ye.isEnding = this.isEnding),
                      i(e, this.element, ye))
                    : i
            })),
        (Ce.prototype.tick = function (t) {
            return (
                this.isActive || ((this.isActive = !0), this.onStart()),
                (this.value = this.computeCurrentScrollValue()),
                (this.speed = this.computeSpeed(t)),
                (this.value = this.computeNextScrollValue(t)),
                (this.duration += t),
                this.value
            )
        }),
        (Ce.prototype.onStart = function () {
            var t = this.item,
                e = Re(t).onStart
            ce(e) && e(t, this.element, this.direction)
        }),
        (Ce.prototype.onStop = function () {
            var t = this.item,
                e = Re(t).onStop
            ce(e) && e(t, this.element, this.direction), t._drag && t._drag.sort()
        }),
        (Me.prototype.reset = function () {
            this.requestX && (this.requestX.action = null),
                this.requestY && (this.requestY.action = null),
                (this.element = null),
                (this.requestX = null),
                (this.requestY = null),
                (this.scrollLeft = 0),
                (this.scrollTop = 0)
        }),
        (Me.prototype.addRequest = function (t) {
            1 & t.direction
                ? (this.removeRequest(this.requestX), (this.requestX = t))
                : (this.removeRequest(this.requestY), (this.requestY = t)),
                (t.action = this)
        }),
        (Me.prototype.removeRequest = function (t) {
            t &&
                (this.requestX === t
                    ? ((this.requestX = null), (t.action = null))
                    : this.requestY === t && ((this.requestY = null), (t.action = null)))
        }),
        (Me.prototype.computeScrollValues = function () {
            ;(this.scrollLeft = this.requestX ? this.requestX.value : Ee(this.element)),
                (this.scrollTop = this.requestY ? this.requestY.value : Te(this.element))
        }),
        (Me.prototype.scroll = function () {
            var t = this.element
            t &&
                (t.scrollTo
                    ? t.scrollTo(this.scrollLeft, this.scrollTop)
                    : ((t.scrollLeft = this.scrollLeft), (t.scrollTop = this.scrollTop)))
        }),
        (Ie.prototype.pick = function () {
            return this.pool.pop() || this.createItem()
        }),
        (Ie.prototype.release = function (t) {
            this.releaseItem(t), -1 === this.pool.indexOf(t) && this.pool.push(t)
        }),
        (Ie.prototype.reset = function () {
            this.pool.length = 0
        })
    var qe = { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 },
        je = { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 }
    function Xe() {
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
            (this._requestPool = new Ie(
                function () {
                    return new Ce()
                },
                function (t) {
                    t.reset()
                },
            )),
            (this._actionPool = new Ie(
                function () {
                    return new Me()
                },
                function (t) {
                    t.reset()
                },
            )),
            (this._readTick = this._readTick.bind(this)),
            (this._writeTick = this._writeTick.bind(this))
    }
    ;(Xe.AXIS_X = 1),
        (Xe.AXIS_Y = 2),
        (Xe.FORWARD = 4),
        (Xe.BACKWARD = 8),
        (Xe.LEFT = 9),
        (Xe.RIGHT = 5),
        (Xe.UP = 10),
        (Xe.DOWN = 6),
        (Xe.smoothSpeed = function (t, e, i) {
            return function (n, r, s) {
                var o = 0
                if (!s.isEnding)
                    if (s.threshold > 0) {
                        var a = s.threshold - Math.max(0, s.distance)
                        o = (t / s.threshold) * a
                    } else o = t
                var l = s.speed,
                    h = o
                return l === o
                    ? h
                    : l < o
                    ? ((h = l + e * (s.deltaTime / 1e3)), Math.min(o, h))
                    : ((h = l - i * (s.deltaTime / 1e3)), Math.max(o, h))
            }
        }),
        (Xe.pointerHandle = function (t) {
            var e = { left: 0, top: 0, width: 0, height: 0 },
                i = t || 1
            return function (t, n, r, s, o, a, l) {
                return (e.left = a - 0.5 * i), (e.top = l - 0.5 * i), (e.width = i), (e.height = i), e
            }
        }),
        (Xe.prototype._readTick = function (t) {
            this._isDestroyed ||
                (t && this._tickTime
                    ? ((this._tickDeltaTime = t - this._tickTime),
                      (this._tickTime = t),
                      this._updateRequests(),
                      this._updateActions())
                    : ((this._tickTime = t), (this._tickDeltaTime = 0)))
        }),
        (Xe.prototype._writeTick = function () {
            this._isDestroyed || (this._applyActions(), ue(this._readTick, this._writeTick))
        }),
        (Xe.prototype._startTicking = function () {
            ;(this._isTicking = !0), ue(this._readTick, this._writeTick)
        }),
        (Xe.prototype._stopTicking = function () {
            ;(this._isTicking = !1), (this._tickTime = 0), (this._tickDeltaTime = 0), ie.remove(0, Zt), ie.remove(2, te)
        }),
        (Xe.prototype._getItemHandleRect = function (t, e, i) {
            var n = t._drag
            if (e) {
                var r = n._dragMoveEvent || n._dragStartEvent,
                    s = e(t, n._clientX, n._clientY, t._width, t._height, r.clientX, r.clientY)
                ;(i.left = s.left), (i.top = s.top), (i.width = s.width), (i.height = s.height)
            } else (i.left = n._clientX), (i.top = n._clientY), (i.width = t._width), (i.height = t._height)
            return (i.right = i.left + i.width), (i.bottom = i.top + i.height), i
        }),
        (Xe.prototype._requestItemScroll = function (t, e, i, n, r, s, o) {
            var a = this._requests[e],
                l = a[t._id]
            l ? (l.element === i && l.direction === n) || l.reset() : (l = this._requestPool.pick()),
                (l.item = t),
                (l.element = i),
                (l.direction = n),
                (l.threshold = r),
                (l.distance = s),
                (l.maxValue = o),
                (a[t._id] = l)
        }),
        (Xe.prototype._cancelItemScroll = function (t, e) {
            var i = this._requests[e],
                n = i[t._id]
            n && (n.action && n.action.removeRequest(n), this._requestPool.release(n), delete i[t._id])
        }),
        (Xe.prototype._checkItemOverlap = function (t, e, i) {
            var n = Re(t),
                r = ce(n.targets) ? n.targets(t) : n.targets,
                s = n.threshold,
                o = n.safeZone
            if (!r || !r.length) return e && this._cancelItemScroll(t, 1), void (i && this._cancelItemScroll(t, 2))
            var a = this._dragDirections[t._id],
                l = a[0],
                h = a[1]
            if (!l && !h) return e && this._cancelItemScroll(t, 1), void (i && this._cancelItemScroll(t, 2))
            for (
                var u = this._getItemHandleRect(t, n.handle, qe),
                    c = je,
                    d = null,
                    f = null,
                    p = !0,
                    _ = !0,
                    m = 0,
                    g = 0,
                    v = null,
                    y = null,
                    b = 0,
                    w = 0,
                    x = 0,
                    S = null,
                    E = -1 / 0,
                    T = 0,
                    D = 0,
                    A = null,
                    k = 0,
                    R = 0,
                    P = null,
                    O = -1 / 0,
                    L = 0,
                    C = 0,
                    M = null,
                    I = 0,
                    N = 0,
                    q = 0;
                q < r.length;
                q++
            )
                (d = r[q]),
                    (p = e && l && 2 !== d.axis),
                    (_ = i && h && 1 !== d.axis),
                    (g = d.priority || 0),
                    ((!p || g < E) && (!_ || g < O)) ||
                        ((f = Se(d.element || d)),
                        (w = p ? De(f) : -1),
                        (x = _ ? Ae(f) : -1),
                        (w || x) &&
                            ((m = Ne(u, (c = ke(f, c)))) <= 0 ||
                                (p &&
                                    g >= E &&
                                    w > 0 &&
                                    (g > E || m > D) &&
                                    ((y = null),
                                    (v = Le('number' == typeof d.threshold ? d.threshold : s, o, u.width, c.width)),
                                    5 === l
                                        ? (b = c.right + v.offset - u.right) <= v.value && Ee(f) < w && (y = 5)
                                        : 9 === l &&
                                          (b = u.left - (c.left - v.offset)) <= v.value &&
                                          Ee(f) > 0 &&
                                          (y = 9),
                                    null !== y &&
                                        ((S = f), (E = g), (T = v.value), (D = m), (A = y), (k = b), (R = w))),
                                _ &&
                                    g >= O &&
                                    x > 0 &&
                                    (g > O || m > C) &&
                                    ((y = null),
                                    (v = Le('number' == typeof d.threshold ? d.threshold : s, o, u.height, c.height)),
                                    6 === h
                                        ? (b = c.bottom + v.offset - u.bottom) <= v.value && Te(f) < x && (y = 6)
                                        : 10 === h &&
                                          (b = u.top - (c.top - v.offset)) <= v.value &&
                                          Te(f) > 0 &&
                                          (y = 10),
                                    null !== y &&
                                        ((P = f), (O = g), (L = v.value), (C = m), (M = y), (I = b), (N = x))))))
            e && (S ? this._requestItemScroll(t, 1, S, A, T, k, R) : this._cancelItemScroll(t, 1)),
                i && (P ? this._requestItemScroll(t, 2, P, M, L, I, N) : this._cancelItemScroll(t, 2))
        }),
        (Xe.prototype._updateScrollRequest = function (t) {
            for (
                var e = t.item,
                    i = Re(e),
                    n = ce(i.targets) ? i.targets(e) : i.targets,
                    r = (n && n.length) || 0,
                    s = i.threshold,
                    o = i.safeZone,
                    a = this._getItemHandleRect(e, i.handle, qe),
                    l = je,
                    h = null,
                    u = null,
                    c = !1,
                    d = null,
                    f = null,
                    p = null,
                    _ = null,
                    m = null,
                    g = 0;
                g < r;
                g++
            )
                if ((u = Se((h = n[g]).element || h)) === t.element) {
                    if ((c = !!(1 & t.direction))) {
                        if (2 === h.axis) continue
                    } else if (1 === h.axis) continue
                    if ((_ = c ? De(u) : Ae(u)) <= 0) break
                    if (Ne(a, (l = ke(u, l))) <= 0) break
                    if (
                        ((d = Le(
                            'number' == typeof h.threshold ? h.threshold : s,
                            o,
                            c ? a.width : a.height,
                            c ? l.width : l.height,
                        )),
                        (f =
                            9 === t.direction
                                ? a.left - (l.left - d.offset)
                                : 5 === t.direction
                                ? l.right + d.offset - a.right
                                : 10 === t.direction
                                ? a.top - (l.top - d.offset)
                                : l.bottom + d.offset - a.bottom) > d.value)
                    )
                        break
                    if (((p = c ? Ee(u) : Te(u)), (m = 4 & t.direction ? p >= _ : p <= 0))) break
                    return (t.maxValue = _), (t.threshold = d.value), (t.distance = f), (t.isEnding = !1), !0
                }
            return (
                !0 === i.smoothStop && t.speed > 0
                    ? (null === m && (m = t.hasReachedEnd()), (t.isEnding = !m))
                    : (t.isEnding = !1),
                t.isEnding
            )
        }),
        (Xe.prototype._updateRequests = function () {
            for (
                var t, e, i, n, r, s, o, a = this._items, l = this._requests[1], h = this._requests[2], u = 0;
                u < a.length;
                u++
            )
                (t = a[u]),
                    (r = (n = this._requestOverlapCheck[t._id]) > 0 && this._tickTime - n > this._overlapCheckInterval),
                    (s = !0),
                    (e = l[t._id]) &&
                        e.isActive &&
                        (s = !this._updateScrollRequest(e)) &&
                        ((r = !0), this._cancelItemScroll(t, 1)),
                    (o = !0),
                    (i = h[t._id]) &&
                        i.isActive &&
                        (o = !this._updateScrollRequest(i)) &&
                        ((r = !0), this._cancelItemScroll(t, 2)),
                    r && ((this._requestOverlapCheck[t._id] = 0), this._checkItemOverlap(t, s, o))
        }),
        (Xe.prototype._requestAction = function (t, e) {
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
        (Xe.prototype._updateActions = function () {
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
        (Xe.prototype._applyActions = function () {
            var t,
                e = this._actions,
                i = this._items
            if (e.length) {
                for (t = 0; t < e.length; t++) e[t].scroll(), this._actionPool.release(e[t])
                for (e.length = 0, t = 0; t < i.length; t++) Pe(i[t])
                for (t = 0; t < i.length; t++) Oe(i[t])
            }
        }),
        (Xe.prototype._updateDragDirection = function (t) {
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
        (Xe.prototype.addItem = function (t) {
            this._isDestroyed ||
                (-1 === this._items.indexOf(t) &&
                    (this._items.push(t),
                    (this._requestOverlapCheck[t._id] = this._tickTime),
                    (this._dragDirections[t._id] = [0, 0]),
                    (this._dragPositions[t._id] = []),
                    this._isTicking || this._startTicking()))
        }),
        (Xe.prototype.updateItem = function (t) {
            this._isDestroyed ||
                (this._dragDirections[t._id] &&
                    (this._updateDragDirection(t),
                    this._requestOverlapCheck[t._id] || (this._requestOverlapCheck[t._id] = this._tickTime)))
        }),
        (Xe.prototype.removeItem = function (t) {
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
        (Xe.prototype.isItemScrollingX = function (t) {
            var e = this._requests[1][t._id]
            return !(!e || !e.isActive)
        }),
        (Xe.prototype.isItemScrollingY = function (t) {
            var e = this._requests[2][t._id]
            return !(!e || !e.isActive)
        }),
        (Xe.prototype.isItemScrolling = function (t) {
            return this.isItemScrollingX(t) || this.isItemScrollingY(t)
        }),
        (Xe.prototype.destroy = function () {
            if (!this._isDestroyed) {
                for (var t = this._items.slice(0), e = 0; e < t.length; e++) this.removeItem(t[e])
                ;(this._actions.length = 0),
                    this._requestPool.reset(),
                    this._actionPool.reset(),
                    (this._isDestroyed = !0)
            }
        })
    var Fe = window.Element.prototype,
        He =
            Fe.matches ||
            Fe.matchesSelector ||
            Fe.webkitMatchesSelector ||
            Fe.mozMatchesSelector ||
            Fe.msMatchesSelector ||
            Fe.oMatchesSelector ||
            function () {
                return !1
            }
    function Ye(t, e) {
        return He.call(t, e)
    }
    function Be(t, e) {
        e && (t.classList ? t.classList.add(e) : Ye(t, '.' + e) || (t.className += ' ' + e))
    }
    var ze = []
    function We(t, e, i) {
        var n = 'number' == typeof i ? i : -1
        n < 0 && (n = t.length - n + 1), t.splice.apply(t, ze.concat(n, 0, e)), (ze.length = 0)
    }
    function $e(t, e, i) {
        var n = Math.max(0, t.length - 1 + (i || 0))
        return e > n ? n : e < 0 ? Math.max(n + e + 1, 0) : e
    }
    function Ge(t, e, i) {
        if (!(t.length < 2)) {
            var n = $e(t, e),
                r = $e(t, i)
            n !== r && t.splice(r, 0, t.splice(n, 1)[0])
        }
    }
    function Ue(t, e, i) {
        if (!(t.length < 2)) {
            var n,
                r = $e(t, e),
                s = $e(t, i)
            r !== s && ((n = t[r]), (t[r] = t[s]), (t[s] = n))
        }
    }
    var Ve = Tt(document.documentElement.style, 'transform') || 'transform',
        Je = /([A-Z])/g,
        Ke = /^(webkit-|moz-|ms-|o-)/,
        Qe = /^(-m-s-)/
    function Ze(t) {
        var e = t.replace(Je, '-$1').toLowerCase()
        return (e = (e = e.replace(Ke, '-$1')).replace(Qe, '-ms-'))
    }
    var ti = Ze(Ve)
    function ei(t) {
        var e = ge(t, ti)
        if (!e || 'none' === e) return !1
        var i = ge(t, 'display')
        return 'inline' !== i && 'none' !== i
    }
    function ii(t) {
        for (var e = document, i = t || e; i && i !== e && 'static' === ge(i, 'position') && !ei(i); )
            i = i.parentElement || e
        return i
    }
    var ni = {},
        ri = {},
        si = {}
    function oi(t, e) {
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
                      (n.left += ve(t, 'border-left-width')),
                      (n.top += ve(t, 'border-top-width'))),
                  n)
        )
    }
    function ai(t, e, i) {
        return (
            (si.left = 0),
            (si.top = 0),
            t === e ||
                (i && (t = ii(t)) === (e = ii(e))) ||
                (oi(t, ni), oi(e, ri), (si.left = ri.left - ni.left), (si.top = ri.top - ni.top)),
            si
        )
    }
    function li(t) {
        return 'auto' === t || 'scroll' === t || 'overlay' === t
    }
    function hi(t) {
        return li(ge(t, 'overflow')) || li(ge(t, 'overflow-x')) || li(ge(t, 'overflow-y'))
    }
    function ui(t, e) {
        for (e = e || []; t && t !== document; )
            t.getRootNode && t instanceof DocumentFragment
                ? (t = t.getRootNode().host)
                : (hi(t) && e.push(t), (t = t.parentNode))
        return e.push(window), e
    }
    var ci = {},
        di = /^matrix3d/,
        fi = /([^,]*,){4}/,
        pi = /([^,]*,){12}/,
        _i = /[^,]*,/
    function mi(t) {
        ;(ci.x = 0), (ci.y = 0)
        var e = ge(t, ti)
        if (!e || 'none' === e) return ci
        var i = di.test(e),
            n = e.replace(i ? pi : fi, ''),
            r = n.replace(_i, '')
        return (ci.x = parseFloat(n) || 0), (ci.y = parseFloat(r) || 0), ci
    }
    function gi(t, e) {
        e &&
            (t.classList
                ? t.classList.remove(e)
                : Ye(t, '.' + e) && (t.className = (' ' + t.className + ' ').replace(' ' + e + ' ', ' ').trim()))
    }
    var vi,
        yi,
        bi,
        wi,
        xi =
            /^(iPad|iPhone|iPod)/.test(window.navigator.platform) ||
            (/^Mac/.test(window.navigator.platform) && window.navigator.maxTouchPoints > 1),
        Si = !!Dt() && { passive: !0 }
    function Ei(t) {
        var e = t._element,
            i = t.getGrid(),
            n = i._settings
        ;(this._item = t),
            (this._gridId = i._id),
            (this._isDestroyed = !1),
            (this._isMigrating = !1),
            (this._startPredicate = ce(n.dragStartPredicate) ? n.dragStartPredicate : Ei.defaultStartPredicate),
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
            (this._dragger = new It(this._handle, n.dragCssProps)),
            this._dragger.on('start', this._preStartCheck),
            this._dragger.on('move', this._preStartCheck),
            this._dragger.on('cancel', this._preEndCheck),
            this._dragger.on('end', this._preEndCheck)
    }
    function Ti(t, e) {
        var i,
            n,
            r = {}
        if (Array.isArray(e)) for (n = 0; n < e.length; n++) r[(i = e[n])] = ge(t, Ze(i))
        else for (i in e) r[i] = ge(t, Ze(i))
        return r
    }
    ;(Ei.autoScroller = new Xe()),
        (Ei.defaultStartPredicate = function (t, e, i) {
            var n = t._drag
            if (e.isFirst && e.srcEvent.button) return !1
            if (
                !xi &&
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
        (Ei.defaultSortPredicate =
            ((vi = {}),
            (yi = {}),
            (bi = {}),
            (wi = []),
            function (t, e) {
                var i = t._drag,
                    n = i._getGrid(),
                    r = e && 'number' == typeof e.threshold ? e.threshold : 50,
                    s = e && e.action === it ? it : nt,
                    o = e && e.migrateAction === it ? it : nt
                ;(r = Math.min(Math.max(r, 1), 100)),
                    (vi.width = t._width),
                    (vi.height = t._height),
                    (vi.left = i._clientX),
                    (vi.top = i._clientY)
                var a = (function (t, e, i) {
                    var n,
                        r,
                        s,
                        o,
                        a,
                        l,
                        h,
                        u,
                        c,
                        d,
                        f = null,
                        p = e._settings.dragSort,
                        _ = -1
                    if (
                        (!0 === p ? ((wi[0] = e), (r = wi)) : ce(p) && (r = p.call(e, t)),
                        !r || !Array.isArray(r) || !r.length)
                    )
                        return f
                    for (d = 0; d < r.length; d++)
                        if (!(s = r[d])._isDestroyed) {
                            for (
                                s._updateBoundingRect(),
                                    l = Math.max(0, s._left),
                                    h = Math.max(0, s._top),
                                    u = Math.min(window.innerWidth, s._right),
                                    c = Math.min(window.innerHeight, s._bottom),
                                    o = s._element.parentNode;
                                o && o !== document && o !== document.documentElement && o !== document.body;

                            )
                                if (o.getRootNode && o instanceof DocumentFragment) o = o.getRootNode().host
                                else {
                                    if (
                                        ('visible' !== ge(o, 'overflow') &&
                                            ((a = o.getBoundingClientRect()),
                                            (l = Math.max(l, a.left)),
                                            (h = Math.max(h, a.top)),
                                            (u = Math.min(u, a.right)),
                                            (c = Math.min(c, a.bottom))),
                                        'fixed' === ge(o, 'position'))
                                    )
                                        break
                                    o = o.parentNode
                                }
                            l >= u ||
                                h >= c ||
                                ((yi.left = l),
                                (yi.top = h),
                                (yi.width = u - l),
                                (yi.height = c - h),
                                (n = Ne(vi, yi)) > i && n > _ && ((_ = n), (f = s)))
                        }
                    return (wi.length = 0), f
                })(t, n, r)
                if (!a) return null
                var l,
                    h,
                    u,
                    c = t.getGrid() !== a,
                    d = 0,
                    f = 0,
                    p = 0,
                    _ = -1,
                    m = !1
                for (
                    a === n
                        ? ((vi.left = i._gridX + t._marginLeft), (vi.top = i._gridY + t._marginTop))
                        : (a._updateBorders(1, 0, 1, 0), (d = a._left + a._borderLeft), (f = a._top + a._borderTop)),
                        u = 0;
                    u < a._items.length;
                    u++
                )
                    (l = a._items[u])._isActive &&
                        l !== t &&
                        ((m = !0),
                        (yi.width = l._width),
                        (yi.height = l._height),
                        (yi.left = l._left + l._marginLeft + d),
                        (yi.top = l._top + l._marginTop + f),
                        (h = Ne(vi, yi)) > p && ((_ = u), (p = h)))
                return (
                    c && p < r && ((_ = m ? _ : 0), (p = r)),
                    p >= r ? ((bi.grid = a), (bi.index = _), (bi.action = c ? o : s), bi) : null
                )
            })),
        (Ei.prototype.stop = function () {
            if (this._isActive)
                if (this._isMigrating) this._finishMigration()
                else {
                    Ei.autoScroller.removeItem(this._item)
                    var t = this._item._id
                    if ((se(t), oe(t), ae(t), this._cancelSort(), this._isStarted)) {
                        this._unbindScrollListeners()
                        var e = item._element,
                            i = this._getGrid(),
                            n = i._settings.itemDraggingClass
                        e.parentNode !== i._element &&
                            (i._element.appendChild(e), item._setTranslate(this._gridX, this._gridY)),
                            gi(e, n)
                    }
                    this._reset()
                }
        }),
        (Ei.prototype.sort = function (t) {
            var e = this._item
            this._isActive &&
                e._isActive &&
                this._dragMoveEvent &&
                (!0 === t ? this._handleSort() : le(e._id, this._handleSort))
        }),
        (Ei.prototype.destroy = function () {
            this._isDestroyed ||
                (this.stop(), this._dragger.destroy(), Ei.autoScroller.removeItem(this._item), (this._isDestroyed = !0))
        }),
        (Ei.prototype._getGrid = function () {
            return tt[this._gridId] || null
        }),
        (Ei.prototype._reset = function () {
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
        (Ei.prototype._bindScrollListeners = function () {
            var t,
                e,
                i = this._getGrid()._element,
                n = this._container,
                r = this._scrollers
            if (((r.length = 0), ui(this._item._element.parentNode, r), n !== i))
                for (ui(i, (t = [])), e = 0; e < t.length; e++) r.indexOf(t[e]) < 0 && r.push(t[e])
            for (e = 0; e < r.length; e++) r[e].addEventListener('scroll', this._onScroll, Si)
        }),
        (Ei.prototype._unbindScrollListeners = function () {
            var t,
                e = this._scrollers
            for (t = 0; t < e.length; t++) e[t].removeEventListener('scroll', this._onScroll, Si)
            e.length = 0
        }),
        (Ei.prototype._resolveStartPredicate = function (t) {
            var e = this._startPredicateData
            if (!(t.distance < e.distance || e.delay)) return this._resetStartPredicate(), !0
        }),
        (Ei.prototype._forceResolveStartPredicate = function (t) {
            this._isDestroyed || 1 !== this._startPredicateState || ((this._startPredicateState = 2), this._onStart(t))
        }),
        (Ei.prototype._finishStartPredicate = function (t) {
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
        (Ei.prototype._resetHeuristics = function (t, e) {
            ;(this._blockedSortIndex = null), (this._sortX1 = this._sortX2 = t), (this._sortY1 = this._sortY2 = e)
        }),
        (Ei.prototype._checkHeuristics = function (t, e) {
            var i = this._getGrid()._settings.dragSortHeuristics,
                n = i.minDragDistance
            if (n <= 0) return (this._blockedSortIndex = null), !0
            var r = t - this._sortX2,
                s = e - this._sortY2,
                o = n > 3 && i.minBounceBackAngle > 0
            if ((o || (this._blockedSortIndex = null), Math.abs(r) > n || Math.abs(s) > n)) {
                if (o) {
                    var a = Math.atan2(r, s),
                        l = Math.atan2(this._sortX2 - this._sortX1, this._sortY2 - this._sortY1),
                        h = Math.atan2(Math.sin(a - l), Math.cos(a - l))
                    Math.abs(h) > i.minBounceBackAngle && (this._blockedSortIndex = null)
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
        (Ei.prototype._resetStartPredicate = function () {
            var t = this._startPredicateData
            t && (t.delayTimer && (t.delayTimer = window.clearTimeout(t.delayTimer)), (this._startPredicateData = null))
        }),
        (Ei.prototype._handleSort = function () {
            if (this._isActive) {
                var t = this._getGrid()._settings
                if (!t.dragSort || (!t.dragAutoScroll.sortDuringScroll && Ei.autoScroller.isItemScrolling(this._item)))
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
        (Ei.prototype._handleSortDelayed = function () {
            ;(this._isSortNeeded = !0), (this._sortTimer = void 0), le(this._item._id, this._handleSort)
        }),
        (Ei.prototype._cancelSort = function () {
            var t
            ;(this._isSortNeeded = !1),
                void 0 !== this._sortTimer && (this._sortTimer = window.clearTimeout(this._sortTimer)),
                (t = this._item._id),
                ie.remove(1, Vt + t)
        }),
        (Ei.prototype._finishSort = function () {
            var t = this._getGrid()._settings.dragSort && (this._isSortNeeded || void 0 !== this._sortTimer)
            this._cancelSort(), t && this._checkOverlap()
        }),
        (Ei.prototype._checkOverlap = function () {
            if (this._isActive) {
                var t,
                    e,
                    i,
                    n,
                    r,
                    s,
                    o,
                    a,
                    l = this._item,
                    h = this._getGrid()._settings
                ;(t = ce(h.dragSortPredicate)
                    ? h.dragSortPredicate(l, this._dragMoveEvent)
                    : Ei.defaultSortPredicate(l, h.dragSortPredicate)) &&
                    'number' == typeof t.index &&
                    ((o = t.action === it ? it : nt),
                    (a = (e = l.getGrid()) !== (n = t.grid || e)),
                    (i = e._items.indexOf(l)),
                    (r = $e(n._items, t.index, a && o === nt ? 1 : 0)),
                    (a || r !== this._blockedSortIndex) &&
                        (a
                            ? ((this._blockedSortIndex = null),
                              (s = n._items[r]),
                              e._hasListeners(ft) &&
                                  e._emit(ft, { item: l, fromGrid: e, fromIndex: i, toGrid: n, toIndex: r }),
                              n._hasListeners(_t) &&
                                  n._emit(_t, { item: l, fromGrid: e, fromIndex: i, toGrid: n, toIndex: r }),
                              (l._gridId = n._id),
                              (this._isMigrating = l._gridId !== this._gridId),
                              e._items.splice(i, 1),
                              We(n._items, l, r),
                              (l._sortData = null),
                              e._hasListeners(dt) &&
                                  e._emit(dt, { item: l, fromGrid: e, fromIndex: i, toGrid: n, toIndex: r }),
                              n._hasListeners(pt) &&
                                  n._emit(pt, { item: l, fromGrid: e, fromIndex: i, toGrid: n, toIndex: r }),
                              o === it &&
                                  s &&
                                  s.isActive() &&
                                  n._items.indexOf(s) > -1 &&
                                  n.send(s, e, i, {
                                      appendTo: this._container || document.body,
                                      layoutSender: !1,
                                      layoutReceiver: !1,
                                  }),
                              e.layout(),
                              n.layout())
                            : i !== r &&
                              ((this._blockedSortIndex = i),
                              (o === it ? Ue : Ge)(e._items, i, r),
                              e._hasListeners(ct) && e._emit(ct, { item: l, fromIndex: i, toIndex: r, action: o }),
                              e.layout())))
            }
        }),
        (Ei.prototype._finishMigration = function () {
            var t,
                e,
                i = this._item,
                n = i._dragRelease,
                r = i._element,
                s = i._isActive,
                o = i.getGrid(),
                a = o._element,
                l = o._settings,
                h = l.dragContainer || a,
                u = this._getGrid()._settings,
                c = r.parentNode,
                d = s ? u.itemVisibleClass : u.itemHiddenClass,
                f = s ? l.itemVisibleClass : l.itemHiddenClass
            ;(this._isMigrating = !1),
                this.destroy(),
                u.itemClass !== l.itemClass && (gi(r, u.itemClass), Be(r, l.itemClass)),
                d !== f && (gi(r, d), Be(r, f)),
                h !== c && (h.appendChild(r), (e = ai(c, h, !0)), ((t = mi(r)).x -= e.left), (t.y -= e.top)),
                i._refreshDimensions(),
                (e = ai(h, a, !0)),
                (n._containerDiffX = e.left),
                (n._containerDiffY = e.top),
                (i._drag = l.dragEnabled ? new Ei(i) : null),
                h !== c && i._setTranslate(t.x, t.y),
                i._visibility.setStyles(s ? l.visibleStyles : l.hiddenStyles),
                n.start()
        }),
        (Ei.prototype._preStartCheck = function (t) {
            0 === this._startPredicateState && (this._startPredicateState = 1),
                1 === this._startPredicateState
                    ? ((this._startPredicateResult = this._startPredicate(this._item, t)),
                      !0 === this._startPredicateResult
                          ? ((this._startPredicateState = 2), this._onStart(t))
                          : !1 === this._startPredicateResult &&
                            (this._resetStartPredicate(t), this._dragger._reset(), (this._startPredicateState = 0)))
                    : 2 === this._startPredicateState && this._isActive && this._onMove(t)
        }),
        (Ei.prototype._preEndCheck = function (t) {
            var e = 2 === this._startPredicateState
            this._startPredicate(this._item, t),
                (this._startPredicateState = 0),
                e && this._isActive && (this._isStarted ? this._onEnd(t) : this.stop())
        }),
        (Ei.prototype._onStart = function (t) {
            var e,
                i,
                n,
                r = this._item
            r._isActive &&
                ((this._isActive = !0),
                (this._dragStartEvent = t),
                Ei.autoScroller.addItem(r),
                (e = r._id),
                (i = this._prepareStart),
                (n = this._applyStart),
                ie.add(0, Bt + e, i),
                ie.add(2, zt + e, n))
        }),
        (Ei.prototype._prepareStart = function () {
            if (this._isActive) {
                var t = this._item
                if (t._isActive) {
                    var e = t._element,
                        i = this._getGrid(),
                        n = i._settings,
                        r = i._element,
                        s = n.dragContainer || r,
                        o = ii(s),
                        a = mi(e),
                        l = e.getBoundingClientRect(),
                        h = s !== r
                    if (
                        ((this._container = s),
                        (this._containingBlock = o),
                        (this._clientX = l.left),
                        (this._clientY = l.top),
                        (this._left = this._gridX = a.x),
                        (this._top = this._gridY = a.y),
                        (this._scrollDiffX = this._scrollDiffY = 0),
                        (this._moveDiffX = this._moveDiffY = 0),
                        this._resetHeuristics(this._gridX, this._gridY),
                        h)
                    ) {
                        var u = ai(o, r)
                        ;(this._containerDiffX = u.left), (this._containerDiffY = u.top)
                    }
                }
            }
        }),
        (Ei.prototype._applyStart = function () {
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
                        Be(i, e._settings.itemDraggingClass),
                        this._bindScrollListeners(),
                        e._emit('dragStart', t, this._dragStartEvent)
                }
            }
        }),
        (Ei.prototype._onMove = function (t) {
            var e,
                i,
                n,
                r = this._item
            r._isActive
                ? ((this._dragMoveEvent = t),
                  (e = r._id),
                  (i = this._prepareMove),
                  (n = this._applyMove),
                  ie.add(0, Wt + e, i),
                  ie.add(2, $t + e, n),
                  le(r._id, this._handleSort))
                : this.stop()
        }),
        (Ei.prototype._prepareMove = function () {
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
        (Ei.prototype._applyMove = function () {
            if (this._isActive) {
                var t = this._item
                t._isActive &&
                    ((this._moveDiffX = this._moveDiffY = 0),
                    t._setTranslate(this._left, this._top),
                    this._getGrid()._emit('dragMove', t, this._dragMoveEvent),
                    Ei.autoScroller.updateItem(t))
            }
        }),
        (Ei.prototype._onScroll = function (t) {
            var e,
                i,
                n,
                r = this._item
            r._isActive
                ? ((this._scrollEvent = t),
                  (e = r._id),
                  (i = this._prepareScroll),
                  (n = this._applyScroll),
                  ie.add(0, Gt + e, i),
                  ie.add(2, Ut + e, n),
                  le(r._id, this._handleSort))
                : this.stop()
        }),
        (Ei.prototype._prepareScroll = function () {
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
                        var l = ai(this._containingBlock, n)
                        ;(this._containerDiffX = l.left), (this._containerDiffY = l.top)
                    }
                    if (s) {
                        var h = this._clientX - this._moveDiffX - this._scrollDiffX - a.left
                        ;(this._left = this._left - this._scrollDiffX + h), (this._scrollDiffX = h)
                    }
                    if (o) {
                        var u = this._clientY - this._moveDiffY - this._scrollDiffY - a.top
                        ;(this._top = this._top - this._scrollDiffY + u), (this._scrollDiffY = u)
                    }
                    ;(this._gridX = this._left - this._containerDiffX), (this._gridY = this._top - this._containerDiffY)
                }
            }
        }),
        (Ei.prototype._applyScroll = function () {
            if (this._isActive) {
                var t = this._item
                t._isActive &&
                    ((this._scrollDiffX = this._scrollDiffY = 0),
                    t._setTranslate(this._left, this._top),
                    this._getGrid()._emit('dragScroll', t, this._scrollEvent))
            }
        }),
        (Ei.prototype._onEnd = function (t) {
            var e = this._item,
                i = e._element,
                n = this._getGrid(),
                r = n._settings,
                s = e._dragRelease
            e._isActive
                ? (se(e._id),
                  oe(e._id),
                  ae(e._id),
                  this._finishSort(),
                  this._unbindScrollListeners(),
                  (s._containerDiffX = this._containerDiffX),
                  (s._containerDiffY = this._containerDiffY),
                  this._reset(),
                  gi(i, r.itemDraggingClass),
                  Ei.autoScroller.removeItem(e),
                  n._emit('dragEnd', e, t),
                  this._isMigrating ? this._finishMigration() : s.start())
                : this.stop()
        })
    var Di = /^(webkit|moz|ms|o|Webkit|Moz|MS|O)(?=[A-Z])/,
        Ai = {}
    function ki(t) {
        var e = Ai[t]
        return e || ((e = t.replace(Di, '')) !== t && (e = e[0].toLowerCase() + e.slice(1)), (Ai[t] = e), e)
    }
    function Ri(t, e) {
        for (var i in e) t.style[i] = e[i]
    }
    var Pi,
        Oi,
        Li = !(!Element || !ce(Element.prototype.animate)),
        Ci = !!(
            Element &&
            ((Pi = Element.prototype.animate),
            (Oi = window.Symbol),
            Pi && ce(Oi) && ce(Oi.toString) && Oi(Pi).toString().indexOf('[native code]') > -1)
        )
    function Mi(t) {
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
    function Ii(t, e) {
        var i = {}
        for (var n in t) i[e ? n : ki(n)] = t[n]
        return i
    }
    function Ni(t, e) {
        return 'translateX(' + t + 'px) translateY(' + e + 'px)'
    }
    function qi(t) {
        ;(this._item = t),
            (this._animation = new Mi()),
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
    function ji(t) {
        ;(this._item = t),
            (this._isActive = !1),
            (this._isDestroyed = !1),
            (this._isPositioningStarted = !1),
            (this._containerDiffX = 0),
            (this._containerDiffY = 0)
    }
    ;(Mi.prototype.start = function (t, e, i) {
        if (!this._isDestroyed) {
            var n = this._element,
                r = i || {}
            if (!Li) return Ri(n, e), (this._callback = ce(r.onFinish) ? r.onFinish : null), void this._onFinish()
            var s,
                o,
                a,
                l = this._animation,
                h = this._props,
                u = this._values,
                c = r.duration || 300,
                d = r.easing || 'ease',
                f = !1
            if (l && ((o = 0), (c === this._duration && d === this._easing) || (f = !0), !f)) {
                for (s in e)
                    if ((++o, -1 === (a = h.indexOf(s)) || e[s] !== u[a])) {
                        f = !0
                        break
                    }
                o !== h.length && (f = !0)
            }
            if ((f && l.cancel(), (this._callback = ce(r.onFinish) ? r.onFinish : null), !l || f)) {
                for (s in ((h.length = u.length = 0), e)) h.push(s), u.push(e[s])
                ;(this._duration = c),
                    (this._easing = d),
                    (this._animation = n.animate([Ii(t, Ci), Ii(e, Ci)], { duration: c, easing: d })),
                    (this._animation.onfinish = this._onFinish),
                    Ri(n, e)
            }
        }
    }),
        (Mi.prototype.stop = function () {
            !this._isDestroyed &&
                this._animation &&
                (this._animation.cancel(),
                (this._animation = this._callback = null),
                (this._props.length = this._values.length = 0))
        }),
        (Mi.prototype.getCurrentStyles = function () {
            return Ti(element, currentProps)
        }),
        (Mi.prototype.isAnimating = function () {
            return !!this._animation
        }),
        (Mi.prototype.destroy = function () {
            this._isDestroyed || (this.stop(), (this._element = null), (this._isDestroyed = !0))
        }),
        (Mi.prototype._onFinish = function () {
            var t = this._callback
            ;(this._animation = this._callback = null), (this._props.length = this._values.length = 0), t && t()
        }),
        (qi.prototype._updateDimensions = function () {
            this.isActive() && Ri(this._element, { width: this._item._width + 'px', height: this._item._height + 'px' })
        }),
        (qi.prototype._onLayoutStart = function (t, e) {
            var i = this._item
            if (-1 !== t.indexOf(i)) {
                var n = i._left,
                    r = i._top,
                    s = this._left,
                    o = this._top
                if (((this._left = n), (this._top = r), e || this._didMigrate || s !== n || o !== r)) {
                    var a,
                        l,
                        h,
                        u = n + i._marginLeft,
                        c = r + i._marginTop,
                        d = i.getGrid()
                    if (!(!e && d._settings.layoutDuration > 0) || this._didMigrate)
                        return (
                            he(i._id),
                            (this._element.style[Ve] = Ni(u, c)),
                            this._animation.stop(),
                            void (
                                this._didMigrate && (d.getElement().appendChild(this._element), (this._didMigrate = !1))
                            )
                        )
                    ;(this._nextTransX = u),
                        (this._nextTransY = c),
                        (a = i._id),
                        (l = this._setupAnimation),
                        (h = this._startAnimation),
                        ie.add(0, Jt + a, l),
                        ie.add(2, Kt + a, h)
                }
            } else this.reset()
        }),
        (qi.prototype._setupAnimation = function () {
            if (this.isActive()) {
                var t = mi(this._element)
                ;(this._transX = t.x), (this._transY = t.y)
            }
        }),
        (qi.prototype._startAnimation = function () {
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
                    ;(o[Ve] = Ni(e, i)),
                        (a[Ve] = Ni(n, r)),
                        t.start(o, a, {
                            duration: s.layoutDuration,
                            easing: s.layoutEasing,
                            onFinish: this._onLayoutEnd,
                        })
                } else t.isAnimating() && ((this._element.style[Ve] = Ni(n, r)), t.stop())
            }
        }),
        (qi.prototype._onLayoutEnd = function () {
            this._resetAfterLayout && this.reset()
        }),
        (qi.prototype._onReleaseEnd = function (t) {
            if (t._id === this._item._id) {
                if (!this._animation.isAnimating()) return void this.reset()
                this._resetAfterLayout = !0
            }
        }),
        (qi.prototype._onMigrate = function (t) {
            if (t.item === this._item) {
                var e = this._item.getGrid(),
                    i = t.toGrid
                e.off(mt, this._onReleaseEnd),
                    e.off(rt, this._onLayoutStart),
                    e.off(ft, this._onMigrate),
                    e.off(lt, this._onHide),
                    i.on(mt, this._onReleaseEnd),
                    i.on(rt, this._onLayoutStart),
                    i.on(ft, this._onMigrate),
                    i.on(lt, this._onHide),
                    (this._didMigrate = !0)
            }
        }),
        (qi.prototype._onHide = function (t) {
            t.indexOf(this._item) > -1 && this.reset()
        }),
        (qi.prototype.create = function () {
            if (this.isActive()) this._resetAfterLayout = !1
            else {
                var t,
                    e = this._item,
                    i = e.getGrid(),
                    n = i._settings,
                    r = this._animation
                ;(this._left = e._left),
                    (this._top = e._top),
                    (t = ce(n.dragPlaceholder.createElement)
                        ? n.dragPlaceholder.createElement(e)
                        : document.createElement('div')),
                    (this._element = t),
                    (r._element = t),
                    (this._className = n.itemPlaceholderClass || ''),
                    this._className && Be(t, this._className),
                    Ri(t, {
                        position: 'absolute',
                        left: '0px',
                        top: '0px',
                        width: e._width + 'px',
                        height: e._height + 'px',
                    }),
                    (t.style[Ve] = Ni(e._left + e._marginLeft, e._top + e._marginTop)),
                    i.on(rt, this._onLayoutStart),
                    i.on(mt, this._onReleaseEnd),
                    i.on(ft, this._onMigrate),
                    i.on(lt, this._onHide),
                    ce(n.dragPlaceholder.onCreate) && n.dragPlaceholder.onCreate(e, t),
                    i.getElement().appendChild(t)
            }
        }),
        (qi.prototype.reset = function () {
            if (this.isActive()) {
                var t,
                    e = this._element,
                    i = this._item,
                    n = i.getGrid(),
                    r = n._settings,
                    s = this._animation
                ;(this._resetAfterLayout = !1),
                    he(i._id),
                    (t = i._id),
                    ie.remove(2, Qt + t),
                    s.stop(),
                    (s._element = null),
                    n.off(mt, this._onReleaseEnd),
                    n.off(rt, this._onLayoutStart),
                    n.off(ft, this._onMigrate),
                    n.off(lt, this._onHide),
                    this._className && (gi(e, this._className), (this._className = '')),
                    e.parentNode.removeChild(e),
                    (this._element = null),
                    ce(r.dragPlaceholder.onRemove) && r.dragPlaceholder.onRemove(i, e)
            }
        }),
        (qi.prototype.isActive = function () {
            return !!this._element
        }),
        (qi.prototype.getElement = function () {
            return this._element
        }),
        (qi.prototype.updateDimensions = function () {
            var t, e
            this.isActive() && ((t = this._item._id), (e = this._updateDimensions), ie.add(2, Qt + t, e))
        }),
        (qi.prototype.destroy = function () {
            this.reset(), this._animation.destroy(), (this._item = this._animation = null)
        }),
        (ji.prototype.start = function () {
            if (!this._isDestroyed && !this._isActive) {
                var t = this._item,
                    e = t.getGrid(),
                    i = e._settings
                ;(this._isActive = !0),
                    Be(t._element, i.itemReleasingClass),
                    i.dragRelease.useDragContainer || this._placeToGrid(),
                    e._emit('dragReleaseStart', t),
                    e._nextLayoutData || t._layout.start(!1)
            }
        }),
        (ji.prototype.stop = function (t, e, i) {
            if (!this._isDestroyed && this._isActive) {
                var n = this._item,
                    r = n.getGrid()
                t || (void 0 !== e && void 0 !== i) || ((e = n._left), (i = n._top))
                var s = this._placeToGrid(e, i)
                this._reset(s), t || r._emit(mt, n)
            }
        }),
        (ji.prototype.isJustReleased = function () {
            return this._isActive && !1 === this._isPositioningStarted
        }),
        (ji.prototype.destroy = function () {
            this._isDestroyed || (this.stop(!0), (this._item = null), (this._isDestroyed = !0))
        }),
        (ji.prototype._placeToGrid = function (t, e) {
            if (!this._isDestroyed) {
                var i = this._item,
                    n = i._element,
                    r = i.getGrid()._element,
                    s = !1
                if (n.parentNode !== r) {
                    if (void 0 === t || void 0 === e) {
                        var o = mi(n)
                        ;(t = o.x - this._containerDiffX), (e = o.y - this._containerDiffY)
                    }
                    r.appendChild(n), i._setTranslate(t, e), (s = !0)
                }
                return (this._containerDiffX = 0), (this._containerDiffY = 0), s
            }
        }),
        (ji.prototype._reset = function (t) {
            if (!this._isDestroyed) {
                var e = this._item,
                    i = e.getGrid()._settings.itemReleasingClass
                ;(this._isActive = !1),
                    (this._isPositioningStarted = !1),
                    (this._containerDiffX = 0),
                    (this._containerDiffY = 0),
                    i && gi(e._element, i)
            }
        })
    function Xi(t) {
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
            (this._animation = new Mi(e)),
            (this._queue = 'layout-' + t._id),
            (this._setupAnimation = this._setupAnimation.bind(this)),
            (this._startAnimation = this._startAnimation.bind(this))
    }
    function Fi(t) {
        ;(this._item = t),
            (this._isActive = !1),
            (this._isDestroyed = !1),
            (this._container = !1),
            (this._containerDiffX = 0),
            (this._containerDiffY = 0)
    }
    function Hi(t) {
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
            (this._animation = new Mi(n)),
            (this._queue = 'visibility-' + t._id),
            (this._finishShow = this._finishShow.bind(this)),
            (this._finishHide = this._finishHide.bind(this)),
            (i.style.display = e ? '' : 'none'),
            Be(i, e ? r.itemVisibleClass : r.itemHiddenClass),
            this.setStyles(e ? r.visibleStyles : r.hiddenStyles)
    }
    ;(Xi.prototype.start = function (t, e) {
        if (!this._isDestroyed) {
            var i,
                n,
                r,
                s = this._item,
                o = s._dragRelease,
                a = s.getGrid()._settings,
                l = this._isActive,
                h = o.isJustReleased(),
                u = h ? a.dragRelease.duration : a.layoutDuration,
                c = h ? a.dragRelease.easing : a.layoutEasing,
                d = !t && !this._skipNextAnimation && u > 0
            if (
                (l && (ne(s._id), s._emitter.burst(this._queue, !0, s)),
                h && (o._isPositioningStarted = !0),
                ce(e) && s._emitter.on(this._queue, e),
                (this._skipNextAnimation = !1),
                !d)
            )
                return (
                    this._updateOffsets(),
                    s._setTranslate(this._nextLeft, this._nextTop),
                    this._animation.stop(),
                    void this._finish()
                )
            this._animation.isAnimating() && (this._animation._animation.onfinish = null),
                (this._isActive = !0),
                (this._animOptions.easing = c),
                (this._animOptions.duration = u),
                (this._isInterrupted = l),
                (i = s._id),
                (n = this._setupAnimation),
                (r = this._startAnimation),
                ie.add(0, Xt + i, n),
                ie.add(2, Ft + i, r)
        }
    }),
        (Xi.prototype.stop = function (t, e, i) {
            if (!this._isDestroyed && this._isActive) {
                var n = this._item
                if ((ne(n._id), this._animation.isAnimating())) {
                    if (void 0 === e || void 0 === i) {
                        var r = mi(n._element)
                        ;(e = r.x), (i = r.y)
                    }
                    n._setTranslate(e, i), this._animation.stop()
                }
                gi(n._element, n.getGrid()._settings.itemPositioningClass),
                    (this._isActive = !1),
                    t && n._emitter.burst(this._queue, !0, n)
            }
        }),
        (Xi.prototype.destroy = function () {
            if (!this._isDestroyed) {
                var t = this._item._element.style
                this.stop(!0, 0, 0),
                    this._item._emitter.clear(this._queue),
                    this._animation.destroy(),
                    (t[Ve] = ''),
                    (t.left = ''),
                    (t.top = ''),
                    (this._item = null),
                    (this._currentStyles = null),
                    (this._targetStyles = null),
                    (this._animOptions = null),
                    (this._isDestroyed = !0)
            }
        }),
        (Xi.prototype._updateOffsets = function () {
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
        (Xi.prototype._finish = function () {
            if (!this._isDestroyed) {
                var t = this._item,
                    e = t._migrate,
                    i = t._dragRelease
                ;(t._tX = this._nextLeft),
                    (t._tY = this._nextTop),
                    this._isActive &&
                        ((this._isActive = !1), gi(t._element, t.getGrid()._settings.itemPositioningClass)),
                    i._isActive && i.stop(),
                    e._isActive && e.stop(),
                    t._emitter.burst(this._queue, !1, t)
            }
        }),
        (Xi.prototype._setupAnimation = function () {
            var t = this._item
            if (void 0 === t._tX || void 0 === t._tY) {
                var e = mi(t._element)
                ;(t._tX = e.x), (t._tY = e.y)
            }
        }),
        (Xi.prototype._startAnimation = function () {
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
            this._isInterrupted || Be(t._element, e.itemPositioningClass),
                (this._currentStyles[Ve] = Ni(t._tX, t._tY)),
                (this._targetStyles[Ve] = Ni(this._nextLeft, this._nextTop)),
                (t._tX = t._tY = void 0),
                this._animation.start(this._currentStyles, this._targetStyles, this._animOptions)
        }),
        (Fi.prototype.start = function (t, e, i) {
            if (!this._isDestroyed) {
                var n,
                    r,
                    s,
                    o,
                    a,
                    l,
                    h,
                    u,
                    c,
                    d,
                    f = this._item,
                    p = f._element,
                    _ = f.isActive(),
                    m = f.isVisible(),
                    g = f.getGrid(),
                    v = g._settings,
                    y = t._settings,
                    b = t._element,
                    w = t._items,
                    x = g._items.indexOf(f),
                    S = i || document.body
                if ('number' == typeof e) n = $e(w, e, 1)
                else {
                    if (!(r = t.getItem(e))) return
                    n = w.indexOf(r)
                }
                ;(f.isPositioning() || this._isActive || f.isReleasing()) && ((h = (l = mi(p)).x), (u = l.y)),
                    f.isPositioning() && f._layout.stop(!0, h, u),
                    this._isActive && ((h -= this._containerDiffX), (u -= this._containerDiffY), this.stop(!0, h, u)),
                    f.isReleasing() &&
                        ((h -= f._dragRelease._containerDiffX),
                        (u -= f._dragRelease._containerDiffY),
                        f._dragRelease.stop(!0, h, u)),
                    f._visibility.stop(!0),
                    f._drag && f._drag.destroy(),
                    g._hasListeners(ft) && g._emit(ft, { item: f, fromGrid: g, fromIndex: x, toGrid: t, toIndex: n }),
                    t._hasListeners(_t) && t._emit(_t, { item: f, fromGrid: g, fromIndex: x, toGrid: t, toIndex: n }),
                    v.itemClass !== y.itemClass && (gi(p, v.itemClass), Be(p, y.itemClass)),
                    (c = m ? v.itemVisibleClass : v.itemHiddenClass) !==
                        (d = m ? y.itemVisibleClass : y.itemHiddenClass) && (gi(p, c), Be(p, d)),
                    g._items.splice(x, 1),
                    We(w, f, n),
                    (f._gridId = t._id),
                    _
                        ? S !== (s = p.parentNode) &&
                          (S.appendChild(p),
                          (o = ai(S, s, !0)),
                          l || ((h = (l = mi(p)).x), (u = l.y)),
                          f._setTranslate(h + o.left, u + o.top))
                        : b.appendChild(p),
                    f._visibility.setStyles(m ? y.visibleStyles : y.hiddenStyles),
                    _ && (a = ai(S, b, !0)),
                    f._refreshDimensions(),
                    (f._sortData = null),
                    (f._drag = y.dragEnabled ? new Ei(f) : null),
                    _
                        ? ((this._isActive = !0),
                          (this._container = S),
                          (this._containerDiffX = a.left),
                          (this._containerDiffY = a.top))
                        : ((this._isActive = !1),
                          (this._container = null),
                          (this._containerDiffX = 0),
                          (this._containerDiffY = 0)),
                    g._hasListeners(dt) && g._emit(dt, { item: f, fromGrid: g, fromIndex: x, toGrid: t, toIndex: n }),
                    t._hasListeners(pt) && t._emit(pt, { item: f, fromGrid: g, fromIndex: x, toGrid: t, toIndex: n })
            }
        }),
        (Fi.prototype.stop = function (t, e, i) {
            if (!this._isDestroyed && this._isActive) {
                var n,
                    r = this._item,
                    s = r._element,
                    o = r.getGrid()._element
                this._container !== o &&
                    ((void 0 !== e && void 0 !== i) ||
                        (t
                            ? ((e = (n = mi(s)).x - this._containerDiffX), (i = n.y - this._containerDiffY))
                            : ((e = r._left), (i = r._top))),
                    o.appendChild(s),
                    r._setTranslate(e, i)),
                    (this._isActive = !1),
                    (this._container = null),
                    (this._containerDiffX = 0),
                    (this._containerDiffY = 0)
            }
        }),
        (Fi.prototype.destroy = function () {
            this._isDestroyed || (this.stop(!0), (this._item = null), (this._isDestroyed = !0))
        }),
        (Hi.prototype.show = function (t, e) {
            if (!this._isDestroyed) {
                var i = this._item,
                    n = i._element,
                    r = ce(e) ? e : null,
                    s = i.getGrid()._settings
                this._isShowing || this._isHidden
                    ? !this._isShowing || t
                        ? (this._isShowing ||
                              (i._emitter.burst(this._queue, !0, i),
                              gi(n, s.itemHiddenClass),
                              Be(n, s.itemVisibleClass),
                              this._isHiding || (n.style.display = '')),
                          r && i._emitter.on(this._queue, r),
                          (this._isShowing = !0),
                          (this._isHiding = this._isHidden = !1),
                          this._startAnimation(!0, t, this._finishShow))
                        : r && i._emitter.on(this._queue, r)
                    : r && r(!1, i)
            }
        }),
        (Hi.prototype.hide = function (t, e) {
            if (!this._isDestroyed) {
                var i = this._item,
                    n = i._element,
                    r = ce(e) ? e : null,
                    s = i.getGrid()._settings
                this._isHiding || !this._isHidden
                    ? !this._isHiding || t
                        ? (this._isHiding ||
                              (i._emitter.burst(this._queue, !0, i),
                              Be(n, s.itemHiddenClass),
                              gi(n, s.itemVisibleClass)),
                          r && i._emitter.on(this._queue, r),
                          (this._isHidden = this._isHiding = !0),
                          (this._isShowing = !1),
                          this._startAnimation(!1, t, this._finishHide))
                        : r && i._emitter.on(this._queue, r)
                    : r && r(!1, i)
            }
        }),
        (Hi.prototype.stop = function (t) {
            if (!this._isDestroyed && (this._isHiding || this._isShowing)) {
                var e = this._item
                re(e._id), this._animation.stop(), t && e._emitter.burst(this._queue, !0, e)
            }
        }),
        (Hi.prototype.setStyles = function (t) {
            var e = this._childElement,
                i = this._currentStyleProps
            for (var n in (this._removeCurrentStyles(), t)) i.push(n), (e.style[n] = t[n])
        }),
        (Hi.prototype.destroy = function () {
            if (!this._isDestroyed) {
                var t = this._item,
                    e = t._element,
                    i = t.getGrid()._settings
                this.stop(!0),
                    t._emitter.clear(this._queue),
                    this._animation.destroy(),
                    this._removeCurrentStyles(),
                    gi(e, i.itemVisibleClass),
                    gi(e, i.itemHiddenClass),
                    (e.style.display = ''),
                    (this._isHiding = this._isShowing = !1),
                    (this._isDestroyed = this._isHidden = !0)
            }
        }),
        (Hi.prototype._startAnimation = function (t, e, i) {
            if (!this._isDestroyed) {
                var n,
                    r = this._item,
                    s = this._animation,
                    o = this._childElement,
                    a = r.getGrid()._settings,
                    l = t ? a.visibleStyles : a.hiddenStyles,
                    h = t ? a.showDuration : a.hideDuration,
                    u = t ? a.showEasing : a.hideEasing,
                    c = e || h <= 0
                if (l) {
                    if ((re(r._id), c)) return Ri(o, l), s.stop(), void (i && i())
                    var d, f, p
                    s.isAnimating() && (s._animation.onfinish = null),
                        (d = r._id),
                        (f = function () {
                            n = Ti(o, l)
                        }),
                        (p = function () {
                            s.start(n, l, { duration: h, easing: u, onFinish: i })
                        }),
                        ie.add(0, Ht + d, f),
                        ie.add(2, Yt + d, p)
                } else i && i()
            }
        }),
        (Hi.prototype._finishShow = function () {
            this._isHidden || ((this._isShowing = !1), this._item._emitter.burst(this._queue, !1, this._item))
        }),
        (Hi.prototype._finishHide = function () {
            if (this._isHidden) {
                var t = this._item
                ;(this._isHiding = !1),
                    t._layout.stop(!0, 0, 0),
                    (t._element.style.display = 'none'),
                    t._emitter.burst(this._queue, !1, t)
            }
        }),
        (Hi.prototype._removeCurrentStyles = function () {
            for (var t = this._childElement, e = this._currentStyleProps, i = 0; i < e.length; i++) t.style[e[i]] = ''
            e.length = 0
        })
    var Yi = 0
    function Bi() {
        return ++Yi
    }
    function zi(t, e, i) {
        var n = t._settings
        if (et) {
            if (et.has(e)) throw new Error('You can only create one Muuri Item per element!')
            et.set(e, this)
        }
        ;(this._id = Bi()),
            (this._gridId = t._id),
            (this._element = e),
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
            (this._emitter = new bt()),
            e.parentNode !== t._element && t._element.appendChild(e),
            Be(e, n.itemClass),
            'boolean' != typeof i && (i = 'none' !== ge(e, 'display')),
            (this._isActive = i),
            (this._visibility = new Hi(this)),
            (this._layout = new Xi(this)),
            (this._migrate = new Fi(this)),
            (this._drag = n.dragEnabled ? new Ei(this) : null),
            (this._dragRelease = new ji(this)),
            (this._dragPlaceholder = new qi(this))
    }
    function Wi(t) {
        var e,
            i,
            n,
            r,
            s,
            o = 0.001,
            a = 0.5
        function l(t) {
            return ((((1e3 * t + 0.5) << 0) / 10) << 0) / 100
        }
        function h() {
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
            ((h.prototype.computeLayout = function (t, e) {
                var i,
                    n,
                    r,
                    s,
                    o,
                    a,
                    h = t.items,
                    u = t.slots,
                    c = !!(1 & e),
                    d = !!(2 & e),
                    f = !!(4 & e),
                    p = !!(8 & e),
                    _ = !!(16 & e),
                    m = 'number' == typeof h[0]
                if (!h.length) return t
                for (n = m ? 2 : 1, i = 0; i < h.length; i += n)
                    m
                        ? ((s = h[i]), (o = h[i + 1]))
                        : ((s = (r = h[i])._width + r._marginLeft + r._marginRight),
                          (o = r._height + r._marginTop + r._marginBottom)),
                        _ && ((s = l(s)), (o = l(o))),
                        (a = this.computeNextSlot(t, s, o, c, d)),
                        d
                            ? a.left + a.width > t.width && (t.width = a.left + a.width)
                            : a.top + a.height > t.height && (t.height = a.top + a.height),
                        (u[++this.slotIndex] = a.left),
                        (u[++this.slotIndex] = a.top),
                        (f || p) && this.slotSizes.push(a.width, a.height)
                if (f) for (i = 0; i < u.length; i += 2) u[i] = t.width - (u[i] + this.slotSizes[i])
                if (p) for (i = 1; i < u.length; i += 2) u[i] = t.height - (u[i] + this.slotSizes[i])
                return (
                    (this.slotSizes.length = 0),
                    (this.currentRects.length = 0),
                    (this.nextRects.length = 0),
                    (this.rectId = 0),
                    (this.slotIndex = -1),
                    t
                )
            }),
            (h.prototype.computeNextSlot = function (t, e, i, n, r) {
                var s,
                    l,
                    h,
                    u,
                    c,
                    d = this.slotData,
                    f = this.currentRects,
                    p = this.nextRects,
                    _ = !1
                for (p.length = 0, d.left = null, d.top = null, d.width = e, d.height = i, u = 0; u < f.length; u++)
                    if ((l = f[u]) && ((s = this.getRect(l)), d.width <= s.width + o && d.height <= s.height + o)) {
                        ;(d.left = s.left), (d.top = s.top)
                        break
                    }
                if (
                    (null === d.left &&
                        (r ? ((d.left = t.width), (d.top = 0)) : ((d.left = 0), (d.top = t.height)), n || (_ = !0)),
                    !r &&
                        d.top + d.height > t.height + o &&
                        (d.left > a && p.push(this.addRect(0, t.height, d.left, 1 / 0)),
                        d.left + d.width < t.width - a &&
                            p.push(this.addRect(d.left + d.width, t.height, t.width - d.left - d.width, 1 / 0)),
                        (t.height = d.top + d.height)),
                    r &&
                        d.left + d.width > t.width + o &&
                        (d.top > a && p.push(this.addRect(t.width, 0, 1 / 0, d.top)),
                        d.top + d.height < t.height - a &&
                            p.push(this.addRect(t.width, d.top + d.height, 1 / 0, t.height - d.top - d.height)),
                        (t.width = d.left + d.width)),
                    !_)
                )
                    for (n && (u = 0); u < f.length; u++)
                        if ((l = f[u]))
                            for (s = this.getRect(l), h = this.splitRect(s, d), c = 0; c < h.length; c++)
                                (l = h[c]),
                                    (s = this.getRect(l)),
                                    (r ? s.left + o < t.width - o : s.top + o < t.height - o) && p.push(l)
                return (
                    p.length > 1 && this.purgeRects(p).sort(r ? this.sortRectsLeftTop : this.sortRectsTopLeft),
                    (this.currentRects = p),
                    (this.nextRects = f),
                    d
                )
            }),
            (h.prototype.addRect = function (t, e, i, n) {
                var r = ++this.rectId
                return (
                    (this.rectStore[r] = t || 0),
                    (this.rectStore[++this.rectId] = e || 0),
                    (this.rectStore[++this.rectId] = i || 0),
                    (this.rectStore[++this.rectId] = n || 0),
                    r
                )
            }),
            (h.prototype.getRect = function (t, e) {
                return (
                    e || (e = this.rectTarget),
                    (e.left = this.rectStore[t] || 0),
                    (e.top = this.rectStore[++t] || 0),
                    (e.width = this.rectStore[++t] || 0),
                    (e.height = this.rectStore[++t] || 0),
                    e
                )
            }),
            (h.prototype.splitRect =
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
            (h.prototype.isRectAWithinRectB = function (t, e) {
                return (
                    t.left + o >= e.left &&
                    t.top + o >= e.top &&
                    t.left + t.width - o <= e.left + e.width &&
                    t.top + t.height - o <= e.top + e.height
                )
            }),
            (h.prototype.purgeRects =
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
            (h.prototype.sortRectsTopLeft = (function () {
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
            (h.prototype.sortRectsLeftTop = (function () {
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
            var u = new h()
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
        return h
    }
    ;(zi.prototype.getGrid = function () {
        return tt[this._gridId]
    }),
        (zi.prototype.getElement = function () {
            return this._element
        }),
        (zi.prototype.getWidth = function () {
            return this._width
        }),
        (zi.prototype.getHeight = function () {
            return this._height
        }),
        (zi.prototype.getMargin = function () {
            return {
                left: this._marginLeft,
                right: this._marginRight,
                top: this._marginTop,
                bottom: this._marginBottom,
            }
        }),
        (zi.prototype.getPosition = function () {
            return { left: this._left, top: this._top }
        }),
        (zi.prototype.isActive = function () {
            return this._isActive
        }),
        (zi.prototype.isVisible = function () {
            return !!this._visibility && !this._visibility._isHidden
        }),
        (zi.prototype.isShowing = function () {
            return !(!this._visibility || !this._visibility._isShowing)
        }),
        (zi.prototype.isHiding = function () {
            return !(!this._visibility || !this._visibility._isHiding)
        }),
        (zi.prototype.isPositioning = function () {
            return !(!this._layout || !this._layout._isActive)
        }),
        (zi.prototype.isDragging = function () {
            return !(!this._drag || !this._drag._isActive)
        }),
        (zi.prototype.isReleasing = function () {
            return !(!this._dragRelease || !this._dragRelease._isActive)
        }),
        (zi.prototype.isDestroyed = function () {
            return this._isDestroyed
        }),
        (zi.prototype._refreshDimensions = function (t) {
            if (!(this._isDestroyed || (!0 !== t && this._visibility._isHidden))) {
                var e = this._element,
                    i = this._dragPlaceholder,
                    n = e.getBoundingClientRect()
                ;(this._width = n.width),
                    (this._height = n.height),
                    (this._marginLeft = Math.max(0, ve(e, 'margin-left'))),
                    (this._marginRight = Math.max(0, ve(e, 'margin-right'))),
                    (this._marginTop = Math.max(0, ve(e, 'margin-top'))),
                    (this._marginBottom = Math.max(0, ve(e, 'margin-bottom'))),
                    i && i.updateDimensions()
            }
        }),
        (zi.prototype._refreshSortData = function () {
            if (!this._isDestroyed) {
                var t,
                    e = (this._sortData = {}),
                    i = this.getGrid()._settings.sortData
                for (t in i) e[t] = i[t](this, this._element)
            }
        }),
        (zi.prototype._addToLayout = function (t, e) {
            !0 !== this._isActive && ((this._isActive = !0), (this._left = t || 0), (this._top = e || 0))
        }),
        (zi.prototype._removeFromLayout = function () {
            !1 !== this._isActive && ((this._isActive = !1), (this._left = 0), (this._top = 0))
        }),
        (zi.prototype._canSkipLayout = function (t, e) {
            return (
                this._left === t &&
                this._top === e &&
                !this._migrate._isActive &&
                !this._layout._skipNextAnimation &&
                !this._dragRelease.isJustReleased()
            )
        }),
        (zi.prototype._setTranslate = function (t, e) {
            return (
                (this._tX !== t || this._tY !== e) &&
                ((this._tX = t), (this._tY = e), (this._element.style[Ve] = Ni(t, e)), !0)
            )
        }),
        (zi.prototype._destroy = function (t) {
            if (!this._isDestroyed) {
                var e = this._element,
                    i = this.getGrid()._settings
                this._dragPlaceholder.destroy(),
                    this._dragRelease.destroy(),
                    this._migrate.destroy(),
                    this._layout.destroy(),
                    this._visibility.destroy(),
                    this._drag && this._drag.destroy(),
                    this._emitter.destroy(),
                    gi(e, i.itemClass),
                    t && e.parentNode.removeChild(e),
                    et && et.delete(e),
                    (this._isActive = !1),
                    (this._isDestroyed = !0)
            }
        })
    var $i = Wi(),
        Gi = null,
        Ui = []
    function Vi(t, e) {
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
                        Gi ||
                            (Gi = URL.createObjectURL(
                                new Blob(['(' + Wi.toString() + ')(true)'], { type: 'application/javascript' }),
                            ))
                        for (var n, r = 0; r < t; r++)
                            (n = new Worker(Gi)), e && (n.onmessage = e), i.push(n), Ui.push(n)
                    }
                    return i
                })(t, this._onWorkerMessage)
            } catch (t) {
                this._processor = new $i()
            }
        else this._processor = new $i()
    }
    ;(Vi.prototype._sendToWorker = function () {
        if (this._layoutQueue.length && this._workers.length) {
            var t = this._layoutQueue.shift(),
                e = this._workers.pop(),
                i = this._layoutWorkerData[t]
            delete this._layoutWorkerData[t], (this._layoutWorkers[t] = e), e.postMessage(i.buffer, [i.buffer])
        }
    }),
        (Vi.prototype._onWorkerMessage = function (t) {
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
        (Vi.prototype._finalizeLayout = function (t) {
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
        (Vi.prototype.setOptions = function (t) {
            var e, i, n, r, s
            t &&
                ((e = 'boolean' == typeof t.fillGaps ? (t.fillGaps ? 1 : 0) : 1 & this._options),
                (i = 'boolean' == typeof t.horizontal ? (t.horizontal ? 2 : 0) : 2 & this._options),
                (n = 'boolean' == typeof t.alignRight ? (t.alignRight ? 4 : 0) : 4 & this._options),
                (r = 'boolean' == typeof t.alignBottom ? (t.alignBottom ? 8 : 0) : 8 & this._options),
                (s = 'boolean' == typeof t.rounding ? (t.rounding ? 16 : 0) : 16 & this._options),
                (this._options = e | i | n | r | s))
        }),
        (Vi.prototype.createLayout = function (t, e, i, n, r, s) {
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
            var l,
                h,
                u,
                c = new Float32Array(4 + 2 * i.length)
            for (c[0] = e, c[1] = a.width, c[2] = a.height, c[3] = a._settings, l = 0, h = 3; l < i.length; l++)
                (u = i[l]),
                    (c[++h] = u._width + u._marginLeft + u._marginRight),
                    (c[++h] = u._height + u._marginTop + u._marginBottom)
            return (
                this._layoutQueue.push(e),
                (this._layouts[e] = a),
                (this._layoutCallbacks[e] = s),
                (this._layoutWorkerData[e] = c),
                this._sendToWorker(),
                this.cancelLayout.bind(this, e)
            )
        }),
        (Vi.prototype.cancelLayout = function (t) {
            if (
                this._layouts[t] &&
                (delete this._layouts[t], delete this._layoutCallbacks[t], this._layoutWorkerData[t])
            ) {
                delete this._layoutWorkerData[t]
                var e = this._layoutQueue.indexOf(t)
                e > -1 && this._layoutQueue.splice(e, 1)
            }
        }),
        (Vi.prototype.destroy = function () {
            for (var t in this._layoutWorkers) this._workers.push(this._layoutWorkers[t])
            !(function (t) {
                for (var e, i, n = 0; n < t.length; n++)
                    ((e = t[n]).onmessage = null),
                        (e.onerror = null),
                        (e.onmessageerror = null),
                        e.terminate(),
                        (i = Ui.indexOf(e)) > -1 && Ui.splice(i, 1)
                Gi && !Ui.length && (URL.revokeObjectURL(Gi), (Gi = null))
            })(this._workers),
                (this._workers.length = 0),
                (this._layoutQueue.length = 0),
                (this._layouts = {}),
                (this._layoutCallbacks = {}),
                (this._layoutWorkers = {}),
                (this._layoutWorkerData = {})
        })
    var Ji = 0
    function Ki(t, e) {
        var i = ++Ji,
            n = 0,
            r = 0,
            s = !1,
            o = function (e) {
                s ||
                    (r && (n -= e - r),
                    (r = e),
                    n > 0
                        ? (function (t, e) {
                              ie.add(0, ee + t, e)
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
                              ie.remove(0, ee + t)
                          })(i))
                        : void (n <= 0 ? ((n = e), o(0)) : (n = e))
                !0 !== a && t()
            }
        }
    }
    function Qi(t) {
        var e = Object.prototype.toString.call(t)
        return '[object HTMLCollection]' === e || '[object NodeList]' === e
    }
    var Zi = Object.prototype.toString
    function tn(t) {
        return 'object' == typeof t && '[object Object]' === Zi.call(t)
    }
    function en() {}
    var nn,
        rn,
        sn,
        on = 'number',
        an = 'string',
        ln = 'instant',
        hn = 0
    function un(t, e) {
        if (
            (typeof t === an && (t = document.querySelector(t)),
            !(t.getRootNode ? t.getRootNode({ composed: !0 }) === document : document.body.contains(t)) ||
                t === document.documentElement)
        )
            throw new Error('Container element must be an existing DOM element.')
        var i = (function (t, e) {
            var i = cn({}, t)
            e && (i = cn(i, e))
            e && e.visibleStyles
                ? (i.visibleStyles = e.visibleStyles)
                : t && t.visibleStyles && (i.visibleStyles = t.visibleStyles)
            e && e.hiddenStyles
                ? (i.hiddenStyles = e.hiddenStyles)
                : t && t.hiddenStyles && (i.hiddenStyles = t.hiddenStyles)
            return i
        })(un.defaultOptions, e)
        ;(i.visibleStyles = dn(i.visibleStyles)),
            (i.hiddenStyles = dn(i.hiddenStyles)),
            ce(i.dragSort) || (i.dragSort = !!i.dragSort),
            (this._id = Bi()),
            (this._element = t),
            (this._settings = i),
            (this._isDestroyed = !1),
            (this._items = []),
            (this._layout = { id: 0, items: [], slots: [] }),
            (this._isLayoutFinished = !0),
            (this._nextLayoutData = null),
            (this._emitter = new bt()),
            (this._onLayoutDataReceived = this._onLayoutDataReceived.bind(this)),
            (tt[this._id] = this),
            Be(t, i.containerClass),
            (function (t, e) {
                typeof e !== on && (e = !0 === e ? 0 : -1)
                e >= 0 &&
                    ((t._resizeHandler = Ki(function () {
                        t.refreshItems().layout()
                    }, e)),
                    window.addEventListener('resize', t._resizeHandler))
            })(this, i.layoutOnResize),
            this.add(
                (function (t, e) {
                    if ('*' === e) return t.children
                    if (typeof e === an) {
                        for (var i = [], n = t.children, r = 0; r < n.length; r++) Ye(n[r], e) && i.push(n[r])
                        return i
                    }
                    if (Array.isArray(e) || Qi(e)) return e
                    return []
                })(t, i.items),
                { layout: !1 },
            ),
            i.layoutOnInit && this.layout(!0)
    }
    function cn(t, e) {
        var i,
            n,
            r,
            s = Object.keys(e),
            o = s.length
        for (r = 0; r < o; r++)
            (i = tn(e[(n = s[r])])),
                tn(t[n]) && i
                    ? (t[n] = cn(cn({}, t[n]), e[n]))
                    : i
                    ? (t[n] = cn({}, e[n]))
                    : Array.isArray(e[n])
                    ? (t[n] = e[n].slice(0))
                    : (t[n] = e[n])
        return t
    }
    function dn(t) {
        var e,
            i,
            n = {},
            r = document.documentElement.style
        for (e in t) t[e] && (i = Tt(r, e)) && (n[i] = t[e])
        return n
    }
    function fn(t) {
        for (var e = {}, i = 0; i < t.length; i++) e[t[i]._id] = i
        return e
    }
    function pn(t, e, i) {
        return t[e._id] - t[i._id]
    }
    ;(un.Item = zi),
        (un.ItemLayout = Xi),
        (un.ItemVisibility = Hi),
        (un.ItemMigrate = Fi),
        (un.ItemDrag = Ei),
        (un.ItemDragRelease = ji),
        (un.ItemDragPlaceholder = qi),
        (un.Emitter = bt),
        (un.Animator = Mi),
        (un.Dragger = It),
        (un.Packer = Vi),
        (un.AutoScroller = Xe),
        (un.defaultPacker = new Vi(2)),
        (un.defaultOptions = {
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
            dragSortPredicate: { threshold: 50, action: nt, migrateAction: nt },
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
                speed: Xe.smoothSpeed(1e3, 2e3, 2500),
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
        (un.prototype.on = function (t, e) {
            return this._emitter.on(t, e), this
        }),
        (un.prototype.off = function (t, e) {
            return this._emitter.off(t, e), this
        }),
        (un.prototype.getElement = function () {
            return this._element
        }),
        (un.prototype.getItem = function (t) {
            if (this._isDestroyed || (!t && 0 !== t)) return null
            if (typeof t === on) return this._items[t > -1 ? t : this._items.length + t] || null
            if (t instanceof zi) return t._gridId === this._id ? t : null
            if (et) {
                var e = et.get(t)
                return e && e._gridId === this._id ? e : null
            }
            for (var i = 0; i < this._items.length; i++) if (this._items[i]._element === t) return this._items[i]
            return null
        }),
        (un.prototype.getItems = function (t) {
            if (this._isDestroyed || void 0 === t) return this._items.slice(0)
            var e,
                i,
                n = []
            if (Array.isArray(t) || Qi(t)) for (e = 0; e < t.length; e++) (i = this.getItem(t[e])) && n.push(i)
            else (i = this.getItem(t)) && n.push(i)
            return n
        }),
        (un.prototype.refreshItems = function (t, e) {
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
        (un.prototype.refreshSortData = function (t) {
            if (this._isDestroyed) return this
            for (var e = t || this._items, i = 0; i < e.length; i++) e[i]._refreshSortData()
            return this
        }),
        (un.prototype.synchronize = function () {
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
        (un.prototype.layout = function (t, e) {
            if (this._isDestroyed) return this
            var i = this._nextLayoutData
            i && ce(i.cancel) && i.cancel()
            var n = (hn = (hn % 16777216) + 1)
            this._nextLayoutData = { id: n, instant: t, onFinish: e, cancel: null }
            for (var r = this._items, s = [], o = 0; o < r.length; o++) r[o]._isActive && s.push(r[o])
            this._refreshDimensions()
            var a,
                l = this._width - this._borderLeft - this._borderRight,
                h = this._height - this._borderTop - this._borderBottom,
                u = this._settings.layout
            return (
                ce(u)
                    ? (a = u(this, n, s, l, h, this._onLayoutDataReceived))
                    : (un.defaultPacker.setOptions(u),
                      (a = un.defaultPacker.createLayout(this, n, s, l, h, this._onLayoutDataReceived))),
                ce(a) && this._nextLayoutData && this._nextLayoutData.id === n && (this._nextLayoutData.cancel = a),
                this
            )
        }),
        (un.prototype.add = function (t, e) {
            if (this._isDestroyed || !t) return []
            var i,
                n = Qi((i = t)) ? Array.prototype.slice.call(i) : Array.prototype.concat(i)
            if (!n.length) return n
            var r,
                s,
                o,
                a,
                l = e || {},
                h = l.layout ? l.layout : void 0 === l.layout,
                u = this._items,
                c = !1
            for (a = 0; a < n.length; a++)
                (s = n[a]).parentNode !== this._element && (r = r || document.createDocumentFragment()).appendChild(s)
            for (r && this._element.appendChild(r), a = 0; a < n.length; a++)
                (s = n[a]),
                    (o = n[a] = new zi(this, s, l.active))._isActive && ((c = !0), (o._layout._skipNextAnimation = !0))
            for (a = 0; a < n.length; a++) (o = n[a])._refreshDimensions(), o._refreshSortData()
            return (
                We(u, n, l.index),
                this._hasListeners('add') && this._emit('add', n.slice(0)),
                c && h && this.layout(h === ln, ce(h) ? h : void 0),
                n
            )
        }),
        (un.prototype.remove = function (t, e) {
            if (this._isDestroyed || !t.length) return []
            var i,
                n,
                r,
                s = e || {},
                o = s.layout ? s.layout : void 0 === s.layout,
                a = !1,
                l = this.getItems(),
                h = [],
                u = []
            for (r = 0; r < t.length; r++)
                (n = t[r])._isDestroyed ||
                    (-1 !== (i = this._items.indexOf(n)) &&
                        (n._isActive && (a = !0),
                        h.push(n),
                        u.push(l.indexOf(n)),
                        n._destroy(s.removeElements),
                        this._items.splice(i, 1)))
            return (
                this._hasListeners(at) && this._emit(at, h.slice(0), u),
                a && o && this.layout(o === ln, ce(o) ? o : void 0),
                h
            )
        }),
        (un.prototype.show = function (t, e) {
            return !this._isDestroyed && t.length && this._setItemsVisibility(t, !0, e), this
        }),
        (un.prototype.hide = function (t, e) {
            return !this._isDestroyed && t.length && this._setItemsVisibility(t, !1, e), this
        }),
        (un.prototype.filter = function (t, e) {
            if (this._isDestroyed || !this._items.length) return this
            var i,
                n,
                r = [],
                s = [],
                o = typeof t === an,
                a = ce(t),
                l = e || {},
                h = !0 === l.instant,
                u = l.syncWithLayout,
                c = l.layout ? l.layout : void 0 === l.layout,
                d = ce(l.onFinish) ? l.onFinish : null,
                f = -1,
                p = en
            if (
                (d &&
                    (p = function () {
                        ++f && d(r.slice(0), s.slice(0))
                    }),
                a || o)
            )
                for (n = 0; n < this._items.length; n++)
                    (i = this._items[n]), (a ? t(i) : Ye(i._element, t)) ? r.push(i) : s.push(i)
            return (
                r.length ? this.show(r, { instant: h, syncWithLayout: u, onFinish: p, layout: !1 }) : p(),
                s.length ? this.hide(s, { instant: h, syncWithLayout: u, onFinish: p, layout: !1 }) : p(),
                (r.length || s.length) &&
                    (this._hasListeners(ht) && this._emit(ht, r.slice(0), s.slice(0)),
                    c && this.layout(c === ln, ce(c) ? c : void 0)),
                this
            )
        }),
        (un.prototype.sort = (function () {
            var t, e, i, n
            function r(r, s) {
                for (var o, a, l, h, u = 0, c = 0; c < t.length; c++)
                    if (
                        ((o = t[c][0]),
                        (a = t[c][1]),
                        (l = (r._sortData ? r : r._refreshSortData())._sortData[o]),
                        (h = (s._sortData ? s : s._refreshSortData())._sortData[o]),
                        (u = 'desc' === a || (!a && e) ? (h < l ? -1 : h > l ? 1 : 0) : l < h ? -1 : l > h ? 1 : 0))
                    )
                        return u
                return u || (n || (n = fn(i)), (u = e ? pn(n, s, r) : pn(n, r, s))), u
            }
            function s(r, s) {
                var o = e ? -t(r, s) : t(r, s)
                return o || (n || (n = fn(i)), (o = e ? pn(n, s, r) : pn(n, r, s))), o
            }
            return function (o, a) {
                if (this._isDestroyed || this._items.length < 2) return this
                var l = this._items,
                    h = a || {},
                    u = h.layout ? h.layout : void 0 === h.layout
                if (((e = !!h.descending), (i = l.slice(0)), (n = null), ce(o))) (t = o), l.sort(s)
                else if (typeof o === an)
                    (t = o
                        .trim()
                        .split(' ')
                        .filter(function (t) {
                            return t
                        })
                        .map(function (t) {
                            return t.split(':')
                        })),
                        l.sort(r)
                else {
                    if (!Array.isArray(o))
                        throw ((t = e = i = n = null), new Error('Invalid comparer argument provided.'))
                    ;(l.length = 0), l.push.apply(l, o)
                }
                return (
                    this._hasListeners(ut) && this._emit(ut, l.slice(0), i),
                    u && this.layout(u === ln, ce(u) ? u : void 0),
                    (t = e = i = n = null),
                    this
                )
            }
        })()),
        (un.prototype.move = function (t, e, i) {
            if (this._isDestroyed || this._items.length < 2) return this
            var n,
                r,
                s = this._items,
                o = i || {},
                a = o.layout ? o.layout : void 0 === o.layout,
                l = o.action === it,
                h = l ? it : nt,
                u = this.getItem(t),
                c = this.getItem(e)
            return (
                u &&
                    c &&
                    u !== c &&
                    ((n = s.indexOf(u)),
                    (r = s.indexOf(c)),
                    l ? Ue(s, n, r) : Ge(s, n, r),
                    this._hasListeners(ct) && this._emit(ct, { item: u, fromIndex: n, toIndex: r, action: h }),
                    a && this.layout(a === ln, ce(a) ? a : void 0)),
                this
            )
        }),
        (un.prototype.send = function (t, e, i, n) {
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
                    (o && this.layout(o === ln, ce(o) ? o : void 0), a && e.layout(a === ln, ce(a) ? a : void 0)),
                this
            )
        }),
        (un.prototype.destroy = function (t) {
            if (this._isDestroyed) return this
            var e,
                i,
                n,
                r = this._element,
                s = this._items.slice(0),
                o = (this._layout && this._layout.styles) || {}
            for (
                (n = this)._resizeHandler &&
                    (n._resizeHandler(!0),
                    window.removeEventListener('resize', n._resizeHandler),
                    (n._resizeHandler = null)),
                    e = 0;
                e < s.length;
                e++
            )
                s[e]._destroy(t)
            for (i in ((this._items.length = 0), gi(r, this._settings.containerClass), o)) r.style[i] = ''
            return this._emit('destroy'), this._emitter.destroy(), delete tt[this._id], (this._isDestroyed = !0), this
        }),
        (un.prototype._emit = function () {
            this._isDestroyed || this._emitter.emit.apply(this._emitter, arguments)
        }),
        (un.prototype._hasListeners = function (t) {
            return !this._isDestroyed && this._emitter.countListeners(t) > 0
        }),
        (un.prototype._updateBoundingRect = function () {
            var t = this._element.getBoundingClientRect()
            ;(this._width = t.width),
                (this._height = t.height),
                (this._left = t.left),
                (this._top = t.top),
                (this._right = t.right),
                (this._bottom = t.bottom)
        }),
        (un.prototype._updateBorders = function (t, e, i, n) {
            var r = this._element
            t && (this._borderLeft = ve(r, 'border-left-width')),
                e && (this._borderRight = ve(r, 'border-right-width')),
                i && (this._borderTop = ve(r, 'border-top-width')),
                n && (this._borderBottom = ve(r, 'border-bottom-width'))
        }),
        (un.prototype._refreshDimensions = function () {
            this._updateBoundingRect(),
                this._updateBorders(1, 1, 1, 1),
                (this._boxSizing = ge(this._element, 'box-sizing'))
        }),
        (un.prototype._onLayoutDataReceived =
            ((nn = []),
            function (t) {
                if (!this._isDestroyed && this._nextLayoutData && this._nextLayoutData.id === t.id) {
                    var e,
                        i,
                        n,
                        r,
                        s = this,
                        o = this._nextLayoutData.instant,
                        a = this._nextLayoutData.onFinish,
                        l = t.items.length,
                        h = l
                    for (
                        this._nextLayoutData = null,
                            !this._isLayoutFinished &&
                                this._hasListeners(ot) &&
                                this._emit(ot, this._layout.items.slice(0)),
                            this._layout = t,
                            nn.length = 0,
                            r = 0;
                        r < l;
                        r++
                    )
                        (e = t.items[r])
                            ? ((i = t.slots[2 * r]),
                              (n = t.slots[2 * r + 1]),
                              e._canSkipLayout(i, n)
                                  ? --h
                                  : ((e._left = i), (e._top = n), e.isActive() && !e.isDragging() ? nn.push(e) : --h))
                            : --h
                    if (
                        (t.styles && Ri(this._element, t.styles),
                        !this._hasListeners(rt) ||
                            (this._emit(rt, t.items.slice(0), !0 === o), this._layout.id === t.id))
                    ) {
                        var u = function () {
                            if (!(--h > 0)) {
                                var e = s._layout.id !== t.id,
                                    i = ce(o) ? o : a
                                e || (s._isLayoutFinished = !0),
                                    ce(i) && i(t.items.slice(0), e),
                                    !e && s._hasListeners(st) && s._emit(st, t.items.slice(0))
                            }
                        }
                        if (!nn.length) return u(), this
                        for (this._isLayoutFinished = !1, r = 0; r < nn.length && this._layout.id === t.id; r++)
                            nn[r]._layout.start(!0 === o, u)
                        return this._layout.id === t.id && (nn.length = 0), this
                    }
                }
            })),
        (un.prototype._setItemsVisibility = function (t, e, i) {
            var n,
                r,
                s = this,
                o = t.slice(0),
                a = i || {},
                l = !0 === a.instant,
                h = a.onFinish,
                u = a.layout ? a.layout : void 0 === a.layout,
                c = o.length,
                d = e ? 'showStart' : lt,
                f = e ? 'showEnd' : 'hideEnd',
                p = e ? 'show' : 'hide',
                _ = !1,
                m = [],
                g = []
            if (c) {
                for (r = 0; r < o.length; r++)
                    (n = o[r]),
                        ((e && !n._isActive) || (!e && n._isActive)) && (_ = !0),
                        (n._layout._skipNextAnimation = !(!e || n._isActive)),
                        e && n._visibility._isHidden && g.push(n),
                        e ? n._addToLayout() : n._removeFromLayout()
                g.length && (this.refreshItems(g, !0), (g.length = 0)),
                    _ && !1 !== a.syncWithLayout ? this.on(rt, v) : v(),
                    _ && u && this.layout(u === ln, ce(u) ? u : void 0)
            } else ce(h) && h(o)
            function v() {
                for (
                    _ && !1 !== a.syncWithLayout && s.off(rt, v), s._hasListeners(d) && s._emit(d, o.slice(0)), r = 0;
                    r < o.length;
                    r++
                )
                    o[r]._gridId === s._id
                        ? o[r]._visibility[p](l, function (t, e) {
                              t || m.push(e),
                                  --c < 1 && (ce(h) && h(m.slice(0)), s._hasListeners(f) && s._emit(f, m.slice(0)))
                          })
                        : --c < 1 && (ce(h) && h(m.slice(0)), s._hasListeners(f) && s._emit(f, m.slice(0)))
            }
        }),
        (sn = {}),
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
                    (this._easingFunction = d)
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
                                  if ('direction' == i && -1 == c.indexOf(e[i])) return
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
                    ? d
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
                          for (var l = 0, h = 1; l < h; ) {
                              var u = (l + h) / 2,
                                  c = s(t, i, u)
                              if (Math.abs(r - c) < 1e-5) return s(e, n, u)
                              c < r ? (l = u) : (h = u)
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
            function l(t) {
                if ('linear' == t) return d
                var e = y.exec(t)
                if (e) return s.apply(this, e.slice(1).map(Number))
                var i = b.exec(t)
                if (i) return o(Number(i[1]), _)
                var n = w.exec(t)
                return n ? o(Number(n[1]), { start: f, middle: p, end: _ }[n[2]]) : m[t] || d
            }
            function h(t, e, i) {
                if (null == e) return x
                var n = i.delay + t + i.endDelay
                return e < Math.min(i.delay, n) ? S : e >= Math.min(i.delay + t, n) ? E : T
            }
            var u = 'backwards|forwards|both|none'.split('|'),
                c = 'reverse|alternate|alternate-reverse'.split('|'),
                d = function (t) {
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
                    ;(this._easingFunction = l(a(t))), this._setMember('easing', t)
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
            var f = 1,
                p = 0.5,
                _ = 0,
                m = {
                    ease: s(0.25, 0.1, 0.25, 1),
                    'ease-in': s(0.42, 0, 1, 1),
                    'ease-out': s(0, 0, 0.58, 1),
                    'ease-in-out': s(0.42, 0, 0.58, 1),
                    'step-start': o(1, f),
                    'step-middle': o(1, p),
                    'step-end': o(1, _),
                },
                g = null,
                v = '\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*',
                y = new RegExp('cubic-bezier\\(' + v + ',' + v + ',' + v + ',' + v + '\\)'),
                b = /steps\(\s*(\d+)\s*\)/,
                w = /steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/,
                x = 0,
                S = 1,
                E = 2,
                T = 3
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
                    var n = h(t, e, i),
                        r = (function (t, e, i, n, r) {
                            switch (n) {
                                case S:
                                    return 'backwards' == e || 'both' == e ? 0 : null
                                case T:
                                    return i - r
                                case E:
                                    return 'forwards' == e || 'both' == e ? t : null
                                case x:
                                    return null
                            }
                        })(t, i.fill, e, n, i.delay)
                    if (null === r) return null
                    var s = (function (t, e, i, n, r) {
                            var s = r
                            return 0 === t ? e !== S && (s += i) : (s += n / t), s
                        })(i.duration, n, i.iterations, r, i.iterationStart),
                        o = (function (t, e, i, n, r, s) {
                            var o = t === 1 / 0 ? e % 1 : t % 1
                            return 0 !== o || i !== E || 0 === n || (0 === r && 0 !== s) || (o = 1), o
                        })(s, i.iterationStart, n, i.iterations, r, i.duration),
                        a = (function (t, e, i, n) {
                            return t === E && e === 1 / 0 ? 1 / 0 : 1 === i ? Math.floor(n) - 1 : Math.floor(n)
                        })(n, i.iterations, o, s),
                        l = (function (t, e, i) {
                            var n = t
                            if ('normal' !== t && 'reverse' !== t) {
                                var r = e
                                'alternate-reverse' === t && (r += 1),
                                    (n = 'normal'),
                                    r !== 1 / 0 && r % 2 != 0 && (n = 'reverse')
                            }
                            return 'normal' === n ? i : 1 - i
                        })(i.direction, a, o)
                    return i._easingFunction(l)
                }),
                (t.calculatePhase = h),
                (t.normalizeEasing = a),
                (t.parseEasingFunction = l)
        })((rn = {})),
        (function (t, e) {
            function i(t, e) {
                return (t in l && l[t][e]) || e
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
                            var l = r[a],
                                h = o.style[l]
                            n[l] = i(l, h)
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
                l = {
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
                        var l = i[a].offset
                        if (null != l) {
                            if (l < o)
                                throw new TypeError(
                                    'Keyframes are not loosely sorted by offset. Sort or specify offsets.',
                                )
                            o = l
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
        })(rn),
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
        })(rn),
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
                                        l = o + 1,
                                        h = s[a].offset,
                                        u = s[l].offset,
                                        c = h,
                                        d = u
                                    0 == o && ((c = -1 / 0), 0 == u && (l = a)),
                                        o == s.length - 2 && ((d = 1 / 0), 1 == h && (a = l)),
                                        n.push({
                                            applyFrom: c,
                                            applyTo: d,
                                            startOffset: s[a].offset,
                                            endOffset: s[l].offset,
                                            easingFunction: t.parseEasingFunction(s[a].easing),
                                            property: r,
                                            interpolation: e.propertyInterpolation(r, s[a].value, s[l].value),
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
            })(rn, sn),
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
                        var l = i
                        ;/-/.test(i) &&
                            !t.isDeprecated('Hyphenated property names', '2016-03-22', 'Use camelCase instead.', !0) &&
                            (l = n(i)),
                            ('initial' != r && 'initial' != a) ||
                                ('initial' == r && (r = o[l]), 'initial' == a && (a = o[l]))
                        for (var h = r == a ? [] : s[l], u = 0; h && u < h.length; u++) {
                            var c = h[u][0](r),
                                d = h[u][0](a)
                            if (void 0 !== c && void 0 !== d) {
                                var f = h[u][1](c, d)
                                if (f) {
                                    var p = e.Interpolation.apply(null, f)
                                    return function (t) {
                                        return 0 == t ? r : 1 == t ? a : p(t)
                                    }
                                }
                            }
                        }
                        return e.Interpolation(!1, !0, function (t) {
                            return t ? a : r
                        })
                    }
                })(rn, sn),
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
                            l = e.convertEffectInput(n),
                            h = function () {
                                l(i, o)
                            }
                        return (
                            (h._update = function (t) {
                                return null !== (o = a(t))
                            }),
                            (h._clear = function () {
                                l(i, null)
                            }),
                            (h._hasSameTarget = function (t) {
                                return i === t
                            }),
                            (h._target = i),
                            (h._totalDuration = a._totalDuration),
                            (h._id = s),
                            h
                        )
                    }
                })(rn, sn),
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
                        l = { removeProperty: 1, setProperty: 1 }
                    for (var h in ((n.prototype = {
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
                        n.prototype[h] = (function (t, e) {
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
                        })(h, h in l)
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
                })(sn),
                (function (t) {
                    window.Element.prototype.animate = function (e, i) {
                        var n = ''
                        return i && i.id && (n = i.id), t.timeline._play(t.KeyframeEffect(this, e, i, n))
                    }
                })(sn),
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
                })(sn),
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
                            for (a = 0; a < 3; a++) for (var l = 0; l < 3; l++) o[3][a] += e[l] * o[l][a]
                            var h = r[0],
                                u = r[1],
                                c = r[2],
                                d = r[3],
                                f = [
                                    [1, 0, 0, 0],
                                    [0, 1, 0, 0],
                                    [0, 0, 1, 0],
                                    [0, 0, 0, 1],
                                ]
                            ;(f[0][0] = 1 - 2 * (u * u + c * c)),
                                (f[0][1] = 2 * (h * u - c * d)),
                                (f[0][2] = 2 * (h * c + u * d)),
                                (f[1][0] = 2 * (h * u + c * d)),
                                (f[1][1] = 1 - 2 * (h * h + c * c)),
                                (f[1][2] = 2 * (u * c - h * d)),
                                (f[2][0] = 2 * (h * c - u * d)),
                                (f[2][1] = 2 * (u * c + h * d)),
                                (f[2][2] = 1 - 2 * (h * h + u * u)),
                                (o = t(o, f))
                            var p = [
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, 0, 1],
                            ]
                            for (
                                n[2] && ((p[2][1] = n[2]), (o = t(o, p))),
                                    n[1] && ((p[2][1] = 0), (p[2][0] = n[0]), (o = t(o, p))),
                                    n[0] && ((p[2][0] = 0), (p[1][0] = n[0]), (o = t(o, p))),
                                    a = 0;
                                a < 3;
                                a++
                            )
                                for (l = 0; l < 3; l++) o[a][l] *= i[a]
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
                                    var o = Math.acos(r), a = (1 * Math.sin(n * o)) / Math.sqrt(1 - r * r), l = 0;
                                    l < 4;
                                    l++
                                )
                                    s.push(e[l] * (Math.cos(n * o) - r * a) + i[l] * a)
                            return s
                        })
                })(sn),
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
                })(rn, sn),
                (function (t, e, i) {
                    function n(t) {
                        var e = h
                        ;(h = []),
                            t < _.currentTime && (t = _.currentTime),
                            _._animations.sort(r),
                            (_._animations = a(t, !0, _._animations)[0]),
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
                        f.forEach(function (t) {
                            t()
                        }),
                            (f.length = 0)
                    }
                    function a(t, i, n) {
                        ;(p = !0), (d = !1), (e.timeline.currentTime = t), (c = !1)
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
                                    e._needsTick && (c = !0)
                                var n = e._inEffect || e._needsTick
                                ;(e._inTimeline = n), n ? o.push(e) : a.push(e)
                            }),
                            f.push.apply(f, r),
                            f.push.apply(f, s),
                            c && requestAnimationFrame(function () {}),
                            (p = !1),
                            [o, a]
                        )
                    }
                    var l = window.requestAnimationFrame,
                        h = [],
                        u = 0
                    ;(window.requestAnimationFrame = function (t) {
                        var e = u++
                        return 0 == h.length && l(n), h.push([e, t]), e
                    }),
                        (window.cancelAnimationFrame = function (t) {
                            h.forEach(function (e) {
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
                    var c = !1,
                        d = !1
                    ;(e.restart = function () {
                        return c || ((c = !0), requestAnimationFrame(function () {}), (d = !0)), d
                    }),
                        (e.applyDirtiedAnimation = function (t) {
                            if (!p) {
                                t._markTarget()
                                var i = t._targetAnimations()
                                i.sort(r),
                                    a(e.timeline.currentTime, !1, i.slice())[1].forEach(function (t) {
                                        var e = _._animations.indexOf(t)
                                        ;-1 !== e && _._animations.splice(e, 1)
                                    }),
                                    o()
                            }
                        })
                    var f = [],
                        p = !1,
                        _ = new s()
                    e.timeline = _
                })(rn, sn),
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
                                var l = Math.sin(e / 2),
                                    h = l * Math.cos(e / 2),
                                    u = l * l
                                return [
                                    1 - 2 * (n * n + s * s) * u,
                                    2 * (i * n * u + s * h),
                                    2 * (i * s * u - n * h),
                                    0,
                                    2 * (i * n * u - s * h),
                                    1 - 2 * (i * i + s * s) * u,
                                    2 * (n * s * u + i * h),
                                    0,
                                    2 * (i * s * u + n * h),
                                    2 * (n * s * u - i * h),
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
                                var c = r(t.d[0]),
                                    d = r(t.d[1])
                                return [1, Math.tan(d), 0, 0, Math.tan(c), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
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
                            for (var a = [], l = 0; l < 4; l++) a.push(o[l].slice())
                            for (l = 0; l < 3; l++) a[l][3] = 0
                            if (0 === t(a)) return null
                            var h,
                                u = []
                            o[0][3] || o[1][3] || o[2][3]
                                ? (u.push(o[0][3]),
                                  u.push(o[1][3]),
                                  u.push(o[2][3]),
                                  u.push(o[3][3]),
                                  (h = (function (t, e) {
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
                                                      l = e[1][2],
                                                      h = e[2][0],
                                                      u = e[2][1],
                                                      c = e[2][2],
                                                      d = [
                                                          [
                                                              (a * c - l * u) * i,
                                                              (s * u - r * c) * i,
                                                              (r * l - s * a) * i,
                                                              0,
                                                          ],
                                                          [
                                                              (l * h - o * c) * i,
                                                              (n * c - s * h) * i,
                                                              (s * o - n * l) * i,
                                                              0,
                                                          ],
                                                          [
                                                              (o * u - a * h) * i,
                                                              (h * r - n * u) * i,
                                                              (n * a - r * o) * i,
                                                              0,
                                                          ],
                                                      ],
                                                      f = [],
                                                      p = 0;
                                                  p < 3;
                                                  p++
                                              ) {
                                                  for (var _ = 0, m = 0; m < 3; m++) _ += e[3][m] * d[m][p]
                                                  f.push(_)
                                              }
                                              return f.push(1), d.push(f), d
                                          })(a),
                                      ),
                                  )))
                                : (h = [0, 0, 0, 1])
                            var c = o[3].slice(0, 3),
                                d = []
                            d.push(o[0].slice(0, 3))
                            var f = []
                            f.push(n(d[0])), (d[0] = e(d[0]))
                            var p = []
                            d.push(o[1].slice(0, 3)),
                                p.push(i(d[0], d[1])),
                                (d[1] = r(d[1], d[0], 1, -p[0])),
                                f.push(n(d[1])),
                                (d[1] = e(d[1])),
                                (p[0] /= f[1]),
                                d.push(o[2].slice(0, 3)),
                                p.push(i(d[0], d[2])),
                                (d[2] = r(d[2], d[0], 1, -p[1])),
                                p.push(i(d[1], d[2])),
                                (d[2] = r(d[2], d[1], 1, -p[2])),
                                f.push(n(d[2])),
                                (d[2] = e(d[2])),
                                (p[1] /= f[2]),
                                (p[2] /= f[2])
                            var _ = (function (t, e) {
                                return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
                            })(d[1], d[2])
                            if (i(d[0], _) < 0)
                                for (l = 0; l < 3; l++) (f[l] *= -1), (d[l][0] *= -1), (d[l][1] *= -1), (d[l][2] *= -1)
                            var m,
                                g,
                                v = d[0][0] + d[1][1] + d[2][2] + 1
                            return (
                                v > 1e-4
                                    ? ((m = 0.5 / Math.sqrt(v)),
                                      (g = [
                                          (d[2][1] - d[1][2]) * m,
                                          (d[0][2] - d[2][0]) * m,
                                          (d[1][0] - d[0][1]) * m,
                                          0.25 / m,
                                      ]))
                                    : d[0][0] > d[1][1] && d[0][0] > d[2][2]
                                    ? (g = [
                                          0.25 * (m = 2 * Math.sqrt(1 + d[0][0] - d[1][1] - d[2][2])),
                                          (d[0][1] + d[1][0]) / m,
                                          (d[0][2] + d[2][0]) / m,
                                          (d[2][1] - d[1][2]) / m,
                                      ])
                                    : d[1][1] > d[2][2]
                                    ? ((m = 2 * Math.sqrt(1 + d[1][1] - d[0][0] - d[2][2])),
                                      (g = [
                                          (d[0][1] + d[1][0]) / m,
                                          0.25 * m,
                                          (d[1][2] + d[2][1]) / m,
                                          (d[0][2] - d[2][0]) / m,
                                      ]))
                                    : ((m = 2 * Math.sqrt(1 + d[2][2] - d[0][0] - d[1][1])),
                                      (g = [
                                          (d[0][2] + d[2][0]) / m,
                                          (d[1][2] + d[2][1]) / m,
                                          0.25 * m,
                                          (d[1][0] - d[0][1]) / m,
                                      ])),
                                [c, f, p, g, h]
                            )
                        }
                    })()
                    ;(t.dot = i),
                        (t.makeMatrixDecomposition = function (t) {
                            return [a(o(t))]
                        }),
                        (t.transformListToMatrix = o)
                })(sn),
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
                                l = (function (t, e) {
                                    for (var i = t, n = e; i && n; ) i > n ? (i %= n) : (n %= i)
                                    return (t * e) / (i + n)
                                })(n.length, r.length),
                                h = 0;
                            h < l;
                            h++
                        ) {
                            var u = e(n[h % n.length], r[h % r.length])
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
                                    var l = i[a](t[o], e[o++])
                                    n.push(l[0]), r.push(l[1]), s.push(l[2])
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
                })(sn),
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
                        for (var o = [], a = [], l = 0; l < n.length || l < r.length; l++) {
                            var h = n[l] || s(r[l].inset),
                                u = r[l] || s(n[l].inset)
                            o.push(h), a.push(u)
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
                                    var l = t.mergeDimensions(e.lengths[a], i.lengths[a], 2 == a)
                                    s[0].push(l[0]), o[0].push(l[1]), r.push(l[2])
                                }
                                if (e.color && i.color) {
                                    var h = t.mergeColors(e.color, i.color)
                                    ;(s[1] = h[0]), (o[1] = h[1]), (n = h[2])
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
                })(sn),
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
                })(sn),
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
                })(sn),
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
                })(sn),
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
                                for (var l in n) {
                                    var h = i(e.replace(new RegExp('U' + l, 'g'), '').replace(new RegExp(r, 'g'), '*0'))
                                    if (!isFinite(h)) return
                                    n[l] = h
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
                        l = n.bind(null, new RegExp(o + '|%', 'g')),
                        h = n.bind(null, /deg|rad|grad|turn/g)
                    ;(t.parseLength = a),
                        (t.parseLengthOrPercent = l),
                        (t.consumeLengthOrPercent = t.consumeParenthesised.bind(null, l)),
                        (t.parseAngle = h),
                        (t.mergeDimensions = s)
                    var u = t.consumeParenthesised.bind(null, a),
                        c = t.consumeRepeated.bind(void 0, u, /^/),
                        d = t.consumeRepeated.bind(void 0, c, /^,/)
                    t.consumeSizePairList = d
                    var f = t.mergeNestedRepeated.bind(void 0, r, ' '),
                        p = t.mergeNestedRepeated.bind(void 0, f, ',')
                    ;(t.mergeNonNegativeSizePair = f),
                        t.addPropertiesHandler(
                            function (t) {
                                var e = d(t)
                                if (e && '' == e[1]) return e[0]
                            },
                            p,
                            ['background-size'],
                        ),
                        t.addPropertiesHandler(l, r, [
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
                        t.addPropertiesHandler(l, s, [
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
                })(sn),
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
                })(sn),
                (function (t, e) {
                    function i(t) {
                        return function (e) {
                            var i = 0
                            return t.map(function (t) {
                                return t === h ? e[i++] : t
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
                                a = d[o]
                            if (!a) return
                            var l = i[2].split(','),
                                h = a[0]
                            if (h.length < l.length) return
                            for (var f = [], p = 0; p < h.length; p++) {
                                var _,
                                    m = l[p],
                                    g = h[p]
                                if (
                                    void 0 ===
                                    (_ = m
                                        ? {
                                              A: function (e) {
                                                  return '0' == e.trim() ? c : t.parseAngle(e)
                                              },
                                              N: t.parseNumber,
                                              T: t.parseLengthOrPercent,
                                              L: t.parseLength,
                                          }[g.toUpperCase()](m)
                                        : { a: c, n: f[0], t: u }[g])
                                )
                                    return
                                f.push(_)
                            }
                            if ((r.push({ t: o, d: f }), n.lastIndex == e.length)) return r
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
                    function l(t) {
                        return t.replace(/(x|y|z|3d)?$/, '3d')
                    }
                    var h = null,
                        u = { px: 0 },
                        c = { deg: 0 },
                        d = {
                            matrix: ['NNNNNN', [h, h, 0, 0, h, h, 0, 0, 0, 0, 1, 0, h, h, 0, 1], n],
                            matrix3d: ['NNNNNNNNNNNNNNNN', n],
                            rotate: ['A'],
                            rotatex: ['A'],
                            rotatey: ['A'],
                            rotatez: ['A'],
                            rotate3d: ['NNNA'],
                            perspective: ['L'],
                            scale: ['Nn', i([h, h, 1]), n],
                            scalex: ['N', i([h, 1, 1]), i([h, 1])],
                            scaley: ['N', i([1, h, 1]), i([1, h])],
                            scalez: ['N', i([1, 1, h])],
                            scale3d: ['NNN', n],
                            skew: ['Aa', null, n],
                            skewx: ['A', null, i([h, c])],
                            skewy: ['A', null, i([c, h])],
                            translate: ['Tt', i([h, h, u]), n],
                            translatex: ['T', i([h, u, u]), i([h, u])],
                            translatey: ['T', i([u, h, u]), i([u, h])],
                            translatez: ['L', i([u, u, h])],
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
                                    var h = e[s].t,
                                        u = e[s].d,
                                        c = 'scale' == h.substr(0, 5) ? 1 : 0
                                    i.push({
                                        t: h,
                                        d: u.map(function (t) {
                                            if ('number' == typeof t) return c
                                            var e = {}
                                            for (var i in t) e[i] = c
                                            return e
                                        }),
                                    })
                                }
                            }
                            var f = function (t, e) {
                                    return (
                                        ('perspective' == t && 'perspective' == e) ||
                                        (('matrix' == t || 'matrix3d' == t) && ('matrix' == e || 'matrix3d' == e))
                                    )
                                },
                                p = [],
                                _ = [],
                                m = []
                            if (e.length != i.length) {
                                if (!n) return
                                ;(p = [(S = o(e, i))[0]]), (_ = [S[1]]), (m = [['matrix', [S[2]]]])
                            } else
                                for (s = 0; s < e.length; s++) {
                                    var g = e[s].t,
                                        v = i[s].t,
                                        y = e[s].d,
                                        b = i[s].d,
                                        w = d[g],
                                        x = d[v]
                                    if (f(g, v)) {
                                        if (!n) return
                                        var S = o([e[s]], [i[s]])
                                        p.push(S[0]), _.push(S[1]), m.push(['matrix', [S[2]]])
                                    } else {
                                        if (g == v) h = g
                                        else if (w[2] && x[2] && a(g) == a(v)) (h = a(g)), (y = w[2](y)), (b = x[2](b))
                                        else {
                                            if (!w[1] || !x[1] || l(g) != l(v)) {
                                                if (!n) return
                                                ;(p = [(S = o(e, i))[0]]), (_ = [S[1]]), (m = [['matrix', [S[2]]]])
                                                break
                                            }
                                            ;(h = l(g)), (y = w[1](y)), (b = x[1](b))
                                        }
                                        for (var E = [], T = [], D = [], A = 0; A < y.length; A++)
                                            (S = ('number' == typeof y[A] ? t.mergeNumbers : t.mergeDimensions)(
                                                y[A],
                                                b[A],
                                            )),
                                                (E[A] = S[0]),
                                                (T[A] = S[1]),
                                                D.push(S[2])
                                        p.push(E), _.push(T), m.push([h, D])
                                    }
                                }
                            if (r) {
                                var k = p
                                ;(p = _), (_ = k)
                            }
                            return [
                                p,
                                _,
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
                })(sn),
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
                })(sn),
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
                                var o = r[0], a = [{ '%': 50 }, { '%': 50 }], l = 0, h = !1, u = 0;
                                u < o.length;
                                u++
                            ) {
                                var c = o[u]
                                'string' == typeof c
                                    ? ((h = /bottom|right/.test(c)),
                                      (a[(l = { left: 0, right: 0, center: l, top: 1, bottom: 1 }[c])] = s[c]),
                                      'center' == c && l++)
                                    : (h && ((c = e(c))['%'] = (c['%'] || 0) + 100), (a[l] = c), l++, (h = !1))
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
                })(sn),
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
                })(sn),
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
                })(sn)
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
                    var l = s.removeEventListener
                    return (
                        (s.removeEventListener = function (t, e) {
                            if ('cancel' == t) {
                                var i = this._cancelHandlers.indexOf(e)
                                i >= 0 && this._cancelHandlers.splice(i, 1)
                            } else l.call(this, t, e)
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
        })(rn),
        Array.from(document.querySelectorAll('#wpbody-content > *:not(.metagallery-allowed)')).forEach(function (t) {
            return t.style.setProperty('display', 'none', 'important')
        }),
        (window.__ = function (t, e) {
            return t
        }),
        (window.CurrentGallery = function (t) {
            return {
                data: t,
                title: '',
                dirty: !1,
                saving: !1,
                images: [{ _uid: 0, height: 0, width: 0, title: '', alt: '', caption: '' }],
                settings: { maxImageWidth: '600', minImageWidth: '315', percentImageWidth: '25', imageSpacing: '15' },
                init: function () {
                    ;(this.title = this.data.meta.title),
                        (this.images = this.data.meta.images),
                        (this.settings = Object.assign(this.settings, this.data.meta.settings))
                },
                save: async function () {
                    console.log('MetaGallery: Saving...'),
                        await new Promise(function (t) {
                            return setTimeout(t, 250)
                        }),
                        window.metagalleryGrid && this.updateImageOrder(window.metagalleryGrid.getItems()),
                        (this.saving = !0),
                        (this.dirty = !1),
                        await Z(this.data.ID, this.title, this.images, this.settings),
                        await new Promise(function (t) {
                            return setTimeout(t, 1500)
                        }),
                        (this.saving = !1)
                },
                updateTitle: function (t) {
                    console.log('MetaGallery: Updating title to:', t), (this.dirty = !0), (this.title = t)
                },
                updateSetting: function (t, e) {
                    console.log('MetaGallery: Updating ' + t + ' to:', e),
                        (this.dirty = !0),
                        (this.settings[t] = parseInt(e, 10) < 0 ? 0 : e),
                        this.updateLayout()
                },
                updateImageSetting: function (t, e, i) {
                    console.log('MetaGallery: Updating image ' + t + ' ' + e + ' to:', i),
                        (this.dirty = !0),
                        (this.images.find(function (e) {
                            return e._uid == t
                        }).alt = i),
                        this.updateLayout()
                },
                addImages: function (t) {
                    var e
                    console.log('MetaGallery: Adding ' + t.length + ' ' + (t.length > 1 ? 'images' : 'image')),
                        (this.dirty = !0),
                        (e = this.images).push.apply(e, t),
                        window.dispatchEvent(
                            new CustomEvent('metagallery-images-added', { detail: { images: t }, bubbles: !0 }),
                        )
                },
                updateImageOrder: function (t) {
                    var e = this
                    ;(t = t.map(function (t) {
                        return t.getElement().querySelector('[x-data]').__x.getUnobservedData()._uid
                    })),
                        (this.images = t.reduce(function (t, i, n) {
                            return (
                                (t[n] = e.images.find(function (t) {
                                    return t._uid == i
                                })),
                                t
                            )
                        }, []))
                },
                updateLayout: function () {
                    setTimeout(function () {
                        window.dispatchEvent(new CustomEvent('reset-layout', { detail: {}, bubbles: !0 }))
                    }, 0)
                },
            }
        }),
        (window.Gallery = function () {
            return {
                muuri: null,
                images: [],
                init: function () {
                    var t = this
                    ;(this.images = JSON.parse(JSON.stringify(this.$component('current').images))),
                        this.images.length &&
                            ((window.metagalleryGrid = new window.Muuri(
                                '[id=metagallery-grid-' + this.$component('current').data.ID + ']',
                                {
                                    items: this.images.map(function (e) {
                                        return t.buildImage(e)
                                    }),
                                    dragSortPredicate: { action: 'move' },
                                    dragEnabled: !0,
                                    layout: { fillGaps: !0 },
                                },
                            )),
                            window.metagalleryGrid.on('move', function (e) {
                                t.$component('current').dirty = !0
                            }))
                },
                get containerStyles() {
                    return (
                        '\n                margin: 0 -' +
                        this.$component('current').settings.imageSpacing +
                        'px;\n            '
                    )
                },
                addImages: function (t) {
                    var e = this
                    if (!window.metagalleryGrid) return this.init()
                    window.metagalleryGrid.add(
                        t.map(function (t) {
                            return e.buildImage(t)
                        }),
                        { index: 0 },
                    )
                },
                removeImages: function (t) {
                    this.$component('current').dirty = !0
                    var e = window.metagalleryGrid.getItems()
                    window.metagalleryGrid.remove(
                        t.map(function (t) {
                            return e.find(function (e) {
                                return e.getElement().querySelector('[x-data]').__x.getUnobservedData()._uid == t
                            })
                        }),
                        { removeElements: !0 },
                    )
                },
                buildImage: function (t) {
                    var e = document.createElement('div'),
                        i = (function (t) {
                            return (
                                "<div\n        x-title=\"Image Wrapper\"\n        x-data=\"{\n            get itemWrapper() {\n                return $el.style.cssText +\n                'width:' + this.$component('current').settings.percentImageWidth + '%;' +\n                'min-width:' + this.$component('current').settings.minImageWidth + 'px;' +\n                'max-width:' + this.$component('current').settings.maxImageWidth + 'px;'\n            },\n\n        }\"\n        class=\"item absolute overflow-hidden\"\n        :style=\"itemWrapper\">\n        <div class=\"item-content relative h-full w-full\">\n            <div\n                x-title=\"Gallery Image\"\n                x-data=\"GalleryImage(" +
                                t._uid +
                                ')"\n                x-init="init()"\n                class="group cursor-move">\n                <button\n                    x-cloak\n                    class="transition p-2 rounded-full duration-200 bg-nord0 text-nord13 absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus:outline-none ring-2 ring-nord2 focus:ring-nord9 ring-opacity-70 focus:ring-opacity-100 focus:text-nord9"\n                    :class="{ \'opacity-100 ring-4\': open }"\n                    :style="buttonStyles"\n                    @click="$dispatch(\'open-image-settings\', { image: ' +
                                t._uid +
                                ' })">\n                    <svg class="w-6 h-6 block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />\n                    </svg>\n                    <span class="sr-only">' +
                                window.__('edit', 'metagallery') +
                                '</span>\n                </button>\n                <img\n                    class="border-0"\n                    :style="imageStyles"\n                    width="' +
                                t.width +
                                '"\n                    height="' +
                                t.height +
                                '"\n                    src="' +
                                t.src.main.url +
                                '"\n                    alt="' +
                                r.xssEscape(t.alt) +
                                '"/>\n            </div>\n        </div>\n    </div>'
                            )
                        })(t)
                    return (e.innerHTML = i), e.firstChild
                },
            }
        }),
        (window.GalleryImage = function (t) {
            return {
                _uid: t,
                get open() {
                    return this.$component('image-settings').imageId == this._uid
                },
                get imageStyles() {
                    return (
                        '\n                padding:' +
                        this.$component('current').settings.imageSpacing +
                        'px;\n            '
                    )
                },
                get buttonStyles() {
                    return (
                        '\n                margin-top: ' +
                        this.$component('current').settings.imageSpacing +
                        'px;\n                margin-right: ' +
                        this.$component('current').settings.imageSpacing +
                        'px;\n            '
                    )
                },
                init: function () {
                    setTimeout(function () {
                        window.dispatchEvent(new CustomEvent('reset-layout', { detail: {}, bubbles: !0 }))
                    }, 0)
                },
            }
        }),
        (window.MediaLibrary = function () {
            return {
                manager: {},
                init: function () {
                    var t = this
                    this.manager = wp.media.frames.file_frame = wp.media({
                        title: __('Select Images', 'metagallery'),
                        multiple: !0,
                        library: { type: 'image' },
                    })
                    var e = this.manager.states.models.filter(function (t) {
                        return !['library'].includes(t.id)
                    })
                    this.manager.states.remove(e),
                        this.manager.on('select', function () {
                            var e = t.manager
                                .state()
                                .get('selection')
                                .toJSON()
                                .filter(function (t) {
                                    return 'image' === t.type
                                })
                                .map(function (t) {
                                    return {
                                        _uid: parseInt(Date.now() + Math.floor(1e6 * Math.random()), 10),
                                        height: t.height,
                                        width: t.width,
                                        title: t.title,
                                        alt: r.xssEscape(t.alt),
                                        caption: t.caption,
                                        src: { main: t.sizes.full, thumbnail: t.sizes.thumbnail },
                                        WP: { id: t.id },
                                    }
                                })
                            t.$component('current').addImages(e)
                        })
                },
            }
        }),
        (window.Alpine.pauseMutationObserver = !0),
        (window.Muuri = un)
})
