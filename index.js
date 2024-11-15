const {JSDOM} = require('jsdom');
const THREE = require('three');

(async function() {
  const htmlString = new JSDOM(await fetch("https://starblast.io").then(a => a.text()))

  console.log("Fetch done.")

  function temp() {
    const {window} = htmlString
    const document = window.document
    const js = [...document.querySelectorAll("script")].pop().innerHTML
    eval(js)
    console.log(this)
  }

  temp()

})()


// fs.writeFileSync('test.html', result)