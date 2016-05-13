/*! laravel-validator-for-js - v0.5.1 - https://github.com/skaterdav85/validatorjs - 2013-05-23 */ (function () { var t = { required: "The :attribute field is required.", email: "The :attribute format is invalid.", def: "The :attribute attribute has errors.", min: { numeric: "The :attribute must be at least :min.", string: "The :attribute must be at least :min characters." }, max: { numeric: "The :attribute must be less than :max.", string: "The :attribute must be less than :max characters." }, size: { numeric: "The :attribute must be :size.", string: "The :attribute must be :size characters." }, numeric: "The :attribute must be a number.", url: "The :attribute format is invalid." }, e = function (t, e) { this.rules = e, this.input = t, this.errors = {}, this.errorCount = 0, this.check(); }; e.prototype = { constructor: e, _createMessage: function (t, e) { var r, i; if ("string" == typeof t && "object" == typeof e) {
        r = t;
        for (i in e)
            e.hasOwnProperty(i) && (r = r.replace(":" + i, e[i]));
    }
    else
        r = t.replace(/:attribute/, e); return r; }, check: function () { var e, r, i, n, s, a, u, o, h, c, f; for (e in this.input)
        if (this.input.hasOwnProperty(e) && (r = this.input[e], this.rules.hasOwnProperty(e)))
            for (i = this.rules[e].split("|"), n = i.length, s = 0; n > s; s++)
                if (a = i[s], f = [], a.indexOf(":") >= 0 && (a = a.split(":")), a instanceof Array ? (u = a[1], a = a[0], o = this.validate[a](r, u)) : (u = null, o = this.validate[a](r)), !o) {
                    if (this.errors.hasOwnProperty(e) || (this.errors[e] = []), t.hasOwnProperty(a))
                        if (c = t[a], "object" == typeof c) {
                            switch (typeof r) {
                                case "number":
                                    c = c.numeric;
                                    break;
                                case "string": c = c.string;
                            }
                            f.attribute = e, f[a] = u, h = this._createMessage(c, f);
                        }
                        else
                            h = this._createMessage(c, e);
                    else
                        c = t.def, h = this._createMessage(c, e);
                    this.errors[e].push(h), this.errorCount++;
                } }, passes: function () { return 0 === this.errorCount ? !0 : !1; }, fails: function () { return this.errorCount > 0 ? !0 : !1; }, first: function (t) { return this.errors.hasOwnProperty(t) ? this.errors[t][0] : null; }, validate: { required: function (t) { var e = t.replace(/\s/g, ""); return (e + "").length > 0 ? !0 : !1; }, size: function (t, e) { return e = parseFloat(e), "number" == typeof t ? t === e ? !0 : !1 : t.length === e ? !0 : !1; }, min: function (t, e) { return "number" == typeof t ? t >= e ? !0 : !1 : t.length >= e ? !0 : !1; }, max: function (t, e) { return "number" == typeof t ? e >= t ? !0 : !1 : e >= t.length ? !0 : !1; }, email: function (t) { var e = /\w+@\w{2,}\.\w{2,}/; return t.match(e) ? !0 : !1; }, numeric: function (t) { var e = Number(t); return "number" != typeof e || isNaN(e) || "boolean" == typeof t ? !1 : !0; }, url: function (t) { var e = /^https?:\/\/\S+/; return t.match(e); } } }, e.register = function (e, r, i) { this.prototype.validate[e] = r, "string" == typeof i && (t[e] = i); }, "undefined" != typeof module && "undefined" != typeof require ? module.exports = e : window.Validator = e; })();
