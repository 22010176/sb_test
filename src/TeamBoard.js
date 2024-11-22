const TeamBoard = function(e) {
  function i(t, e, s) {
    this.team = t,
      this.mode = e,
      this.l1110 = s,
      i.lOlOI.constructor.call(this, {
      pressed: function(t) {
        return function() {
          return t.teamSelected(), !0
        }
      }(this)
    }), this.start = !0,
      this.displayed = !0,
      this.enabled = this.start && this.team.open,
      this.force_ratio = this.start ? .5 : .6,
      this.blending = THREE.AdditiveBlending,
      this.num_players = 10,
      this.warning_count = 0,
      this.warning_blink = !1
  }
  return extend(i, e), i.prototype.teamSelected = function() {
    return this.mode.teamSelected(this.team)
  }, i.prototype.updateScore = function(t) {
    if (this.scoredata = t, this.displayed) return this.l1110.display.addJob(1, function(t) {
      return function() {
        return t.I0lOO = !0
      }
    }(this))
  }, i.prototype.mouseMove = function(t, e, i) {
    return !!this.start && (this.mode.team_start_page.mouseOver(this.team), !1)
  }, i.prototype.IlIII = function(e) {
    var i, s, l, n, a, o, r, h, u, d, c, p, I, O, m, f, g, y, v, b, w, x, k, E, _, z, M, T, S, R, P, A, H, D, C, j, G, L, B, F, V, N, q, U, K, W, Y, J, Z;
    if (this.enabled = this.start && this.team.open,
      this.background = "hsla(" + this.team.hue + ",70%,30%,.15)",
      this.medium = "hsla(" + this.team.hue + ",50%,50%,.4)",
      this.color = "hsla(" + this.team.hue + ",50%,80%,1)",
      e.save(), e.translate(this.px, this.lOlIl),
      K = Math.round(20 * this.IOl00 / 512),
      e.font = K + "pt Play",
      e.textBaseline = "middle",
      e.textAlign = "left",
      e.fillStyle = this.color,
      e.beginPath(),


      e.moveTo(0, .025 * this.IOl00),
      e.lineTo(0, .1 * this.IOl00),
      e.lineTo(this.IOl00, .1 * this.IOl00),

      this.l1110.is_mobile_app ? e.lineTo(this.IOl00, 0) : (e.lineTo(this.IOl00, .09 * this.IOl00),
        e.lineTo(.75 * this.IOl00, .09 * this.IOl00),
        e.lineTo(.72 * this.IOl00, 0)), e.lineTo(.025 * this.IOl00, 0), e.closePath(), e.fill(), e.fillStyle = this.medium, e.fillRect(0, .1 * this.IOl00, this.IOl00, .1 * this.IOl00), e.fillStyle = this.background, e.fillRect(0, .2 * this.IOl00, this.IOl00, this.IIIlI - .2 * this.IOl00), e.fillStyle = this.color, e.fillStyle = "#000", e.fillText(this.team.faction, .05 * this.IOl00, .05 * this.IOl00), e.fillStyle = this.color, e.fillText(this.team.base_name, .05 * this.IOl00, .15 * this.IOl00), this.start || this.l1110.is_mobile_app || (e.textAlign = "center",

      e.font = Math.round(.8 * K) + "pt Play", e.fillText("TAB", .9 * this.IOl00, .15 * this.IOl00), e.strokeStyle = this.color, e.strokeRect(.85 * this.IOl00, .12 * this.IOl00, .1 * this.IOl00, .06 * this.IOl00)), e.font = K + "pt Play", n = .0025 * this.IOl00, E = .09 * this.IOl00, p = this.IIIlI - E * this.num_players, U = IO1O0.getShipIcon(101), q = 0, null != U && null != this.scoredata) {
      for (D = this.scoredata.getUint8(1), g = 2, y = 0, j = D - 1; y <= j; y += 1) I = this.scoredata.getUint8(g), r = this.l1110.names.getData(I), g += 8, null != r && r.friendly === this.team.id && q++;
      e.globalAlpha = .75, e.drawImage(U, this.IOl00 - E + n, .25 * this.IOl00 - E / 2 + n, E - 2 * n, E - 2 * n), e.fillStyle = "#FFF", e.textAlign = "right", e.fillText(q, this.IOl00 - E + n, .25 * this.IOl00), e.globalAlpha = 1
    }
    if (this.start && (p -= 2 * E, e.font = 2 * K + "pt FontAwesome", e.textAlign = "center", this.team.open ? (e.fillStyle = this.color, e.fillRect(0, this.IIIlI - 2 * E, this.IOl00, 2 * E), e.fillStyle = "#000", e.fillText("", this.IOl00 / 2, this.IIIlI - E)) : (e.fillStyle = this.color, e.fillText("", this.IOl00 / 2, this.IIIlI - E))), e.font = K + "pt Play", z = .25 * E, e.fillStyle = this.color, e.textAlign = "right", k = this.team.station_model.level, e.fillText("Lv" + (k + 1), this.IOl00 - z, p - E / 2), s = this.IOl00 - 2 * z - 2 * E, e.fillStyle = this.medium, e.fillRect(z + E, p - E + z, s, E - 2 * z), e.fillStyle = "#000", e.fillRect(z + E + 2, p - E + z + 2, s - 4, E - 2 * z - 4), e.fillStyle = "#F88", o = this.team.station_model.l001O / this.team.station_model.crystals_max, e.fillRect(z + E + 4, p - E + z + 4, (s - 8) * o, E - 2 * z - 8), e.font = K + "pt FontAwesome", e.textAlign = "left", e.fillText("", z, p - E / 2), e.font = Math.round(.6 * K) + "pt Play", e.textAlign = "left", e.fillText(this.team.station_model.l001O, z + E + 4, p - 1 * E), e.textAlign = "right", e.fillText(this.team.station_model.crystals_max, z + E + 4 + s - 8, p - 1 * E), this.team.station_model.hasDestroyedModule() && (e.textAlign = "center", e.fillText(t("REPAIR"), z + E + s * this.mode.options.repair_threshold, p - 1 * E), e.beginPath(), e.strokeStyle = "#FFF", e.moveTo(z + E + s * this.mode.options.repair_threshold, p - E + z), e.lineTo(z + E + s * this.mode.options.repair_threshold, p), e.stroke()), e.font = K + "pt Play", a = 0, this.team.station_model.alive_ships = 0, N = !1, null != this.scoredata)
      for (D = this.scoredata.getUint8(1), g = 2, v = 0, G = D - 1; v <= G && !(a >= 10); v += 1) {
        if (I = this.scoredata.getUint8(g), null != (r = this.l1110.names.getData(I)) && r.friendly === this.team.id) {
          if (this.mode.team === this.team && 7 === a && I !== this.l1110.lIIO1.lI000.status.id && !this.start && !N) {
            g += 8;
            continue
          }
          I === this.l1110.lIIO1.lI000.status.id && (N = !0), c = this.scoredata.getUint8(g + 3), i = !0 & c, A = 1 + (this.scoredata.getUint32(g + 4, !0) >> 24), k = 1 + (c >> 5 & 7), V = 16777215 & this.scoredata.getUint32(g + 4, !0), i && this.team.station_model.alive_ships++, e.globalAlpha = .75, I === this.l1110.lIIO1.lI000.status.id ? e.fillStyle = "rgba(255,255,255,.1)" : e.fillStyle = "#000", e.fillRect(n, p + a * E + n, this.IOl00 - 2 * n, E - 2 * n), U = IO1O0.getShipIcon(100 * k + A), null != U && e.drawImage(U, this.IOl00 - E + n, p + a * E + n, E - 2 * n, E - 2 * n), e.globalAlpha = 1, null == r.custom || this.start || (O = OIOOO.I0I1O(r.custom.badge, r.custom.laser, r.custom.finish, 48, r.custom.hue), e.drawImage(O, n, p + a * E, 2 * E, E)), e.fillStyle = this.color, e.textAlign = "left", C = 2.5 * E, null != this.team.stats && (this.team.stats.killer.id === I && (e.font = K + "pt SBGlyphs", e.fillText("[", C, p + (a + .5) * E), C += .8 * E), this.team.stats.contributor.id === I && (e.font = K + "pt SBGlyphs", e.fillText("D", C, p + (a + .5) * E), C += .8 * E), this.team.stats.healer.id === I && (e.font = K + "pt SBGlyphs", e.fillText("", C, p + (a + .5) * E), C += .8 * E)), e.font = K + "pt Play", e.fillText(r.player_name.toUpperCase(), C, p + (a + .5) * E), e.textAlign = "right", Y = e.measureText(V).width, e.fillStyle = "#000", e.fillRect(this.IOl00 - 1.5 * E - Y - 2, p + (a + .25) * E - 1, Y + 4, .5 * E + 2), e.fillStyle = this.color, e.fillText(V, this.IOl00 - 1.5 * E, p + (a + .5) * E), a++
        }
        g += 8
      }
    for (F = this.IIIlI - .2 * this.IOl00 - E * (this.num_players + 1) - (this.start ? 2 * E : 0), F = Math.min(F, this.IOl00), S = 10, M = -10, R = 10, T = -10, L = this.team.station_model.modules, b = 0, w = L.length; b < w; b++) _ = L[b], S = Math.min(S, _.IOI01.position.x / 20), R = Math.min(R, _.IOI01.position.y / 20), M = Math.max(M, _.IOI01.position.x / 20), T = Math.max(T, _.IOI01.position.y / 20);
    for ((M + S) / 2 + .5, (T + R) / 2 + .5, h = Math.max(4, M - S), u = Math.max(4, T - R), l = Math.min(this.IOl00 / (u + 2), F / (h + 1)), B = this.team.station_model.modules, H = 0, x = B.length; H < x; H++) _ = B[H], P = STATION_MODULES.types_by_id[_.type], m = StationModuleModel.getModuleImageColorized(P, 16728128), f = StationModuleModel.getModuleImageColorized(P, 4259839), Z = _.IOI01.position.x / 20, J = _.IOI01.position.y / 20, d = _.dir, Math.min(this.IOl00, F), W = _.shield, e.save(), e.translate(this.IOl00 / 2, F / 2 + .2 * this.IOl00), e.scale(l, l), e.translate(J, Z), e.rotate(180 * THREE.Math.DEG2RAD * d * .5), _.alive ? (e.globalAlpha = Math.sqrt(W), e.drawImage(f, -1.5, -1.5, 3, 3), e.globalAlpha = Math.sqrt(1 - W), e.drawImage(m, -1.5, -1.5, 3, 3)) : (e.globalAlpha = .1, e.drawImage(f, -1.5, -1.5, 3, 3), e.drawImage(m, -1.5, -1.5, 3, 3)), e.restore();
    return this.warning_count > 0 && (this.warning_blink = !this.warning_blink, this.warning_blink && (e.font = 1.5 * K + "pt FontAwesome", e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = "#F88", e.shadowBlur = 8, e.shadowColor = "#F00", e.shadowOpacity = 1, e.fillText("", .1 * this.IOl00, .3 * this.IOl00)), this.warning_count--), e.restore()
  }, i.prototype.O00I0 = function() {
    if (!this.displayed) return null != this.close_timer && clearTimeout(this.close_timer), this.visible = !0, this.I0lOO = !0, this.l1l0l.set(), this.displayed = !0
  }, i.prototype.hide = function() {
    if (this.displayed) return this.l1l0l.set({
      lllO0: 1.1
    }), this.displayed = !1, this.close_timer = setTimeout(function(t) {
      return function() {
        return t.visible = !1, t.close_timer = null
      }
    }(this), 1e3)
  }, i.prototype.l0111 = function(t, e, s) {
    return this.l1110.is_mobile_app && !this.start ? (this.mode.switchScoreboard(), !0) : i.lOlOI.l0111.call(this, t, e, s)
  }, i
}(llO11)