const TeamStartPage = function (e) {
  function i(e, s) {
    var l, n, a, o, r, h, u, d, c;
    for (this.l1110 = e,
           this.mode = s,
           i.lOlOI.constructor.call(this),
           h = this.mode.teams.length,
           d = .2,
           u = this.mode.teams,
           a = o = 0, r = u.length; o < r; a = ++o) c = u[a], l = new TeamBoard(c, this.mode, this.l1110), this.mode.teamboards.push(l), this.add(l, [.5 - h / 2 * d + a * d + .01, .2, d - .02, .7]), this.animate(l, 3 + .5 * a);
    this.choose = new lI1I0(t("Choose sides")),
      this.choose.font = "Play", this.choose.color = "#FFF", this.choose.background = null, this.add(this.choose, [.2, .05, .6, .05]), this.animate(this.choose, 5), this.systemname = new lI1I0(this.mode.game_info.name + " System"), this.systemname.font = "Play", this.systemname.color = "#FFF", this.systemname.background = null, this.systemname.align = "left", this.add(this.systemname, [.2, .9, .5, .05]), this.animate(this.systemname, 1), n = new Date, n.setYear(n.getFullYear() + 4337 - 2017), n = n.toLocaleString(translations.getLang(), {
      month: "long",
      day: "numeric",
      year: "numeric"
    }), this.gamedate = new lI1I0(n), this.gamedate.font = "Play", this.gamedate.color = "#FFF", this.gamedate.background = null, this.gamedate.align = "right", this.add(this.gamedate, [.3, .9, .5, .05]), this.animate(this.gamedate, 2)
  }

  return extend(i, e), i.prototype.I0lIO = function () {
    var t, e;
    if (this.l1110.is_app && null == this.caret) return this.caret = new Caret("OI1O1"), this.caret_index = 0, t = this.mode.teamboards[0].l0O11[0] + this.mode.teamboards[0].l0O11[2] / 2, e = this.mode.teamboards[0].l0O11[1], this.add(this.caret, [t - .025, e - .02, .05, .05]), this.caret_spacing = (this.mode.teamboards[1].l0O11[0] - this.mode.teamboards[0].l0O11[0]) / .05, this.l1110.lIIO1.control.setNavigationListener(this), this.animate(this.caret, 3.5)
  }, i.prototype.animate = function (t, e) {
    return t.l1l0l.init({
      I11O1: .5,
      O1I11: .5,
      opacity: 0
    }), t.l1l0l.pause(e), t.l1l0l.push({
      O11ll: 10,
      k: .01,
      f: .17
    })
  }, i.prototype.gamepadNavigation = function (t) {
    switch (t) {
      case "left":
        return this.setIndex((this.caret_index + this.mode.teams.length - 1) % this.mode.teams.length);
      case "right":
        return this.setIndex((this.caret_index + 1) % this.mode.teams.length);
      case "ok":
        if (this.mode.teamboards[this.caret_index].enabled) return this.mode.teamboards[this.caret_index].teamSelected(), this.l1110.lIIO1.control.setNavigationListener(null)
    }
  }, i.prototype.setIndex = function (t) {
    if (null != this.caret && t !== this.caret_index) return this.caret_index = t, this.caret.setOffset(this.caret_index * this.caret_spacing, 0)
  }, i.prototype.mouseOver = function (t) {
    var e, i, s, l;
    for (l = this.mode.teams, e = i = 0, s = l.length; i < s; e = ++i) l[e] === t && this.setIndex(e)
  }, i
}(O0I1O)