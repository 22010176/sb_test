const A = function () {
  function t() {
    this.test = 3;
  }

  t.prototype.temp1 = function () {
    console.log(this.test);
  }
  return t;
}()

const extend = function (t, e) {
  function i() {
    this.constructor = t
  }

  for (var l in e) hasProp.call(e, l) && (t[l] = e[l]);
  
  i.prototype = e.prototype;
  t.prototype = new i;          // { constructor: t, __proto__: e.prototype }
  t.O11O0 = e.prototype;        // t.011O0 = e.prototype
  return t
}
const hasProp = {}.hasOwnProperty

const B = function (t) {
  function e() {
    e.O11O0.constructor.call(this)
  }

  e.prototype.test2 = function () {
    console.log('test2')
  }

  extend(e, t)
  return e;
}(A)


const e = new B();
console.log(B.prototype)