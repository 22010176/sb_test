import fs from 'fs'
import path, {dirname} from "node:path";
import {fileURLToPath} from 'url';

import {parse} from 'node-html-parser'
import js_beautify from 'js-beautify'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const resultFolder = 'source'

const htmlString = await fetch("https://starblast.io").then(a => a.text())
console.log("Fetch done.")

const data = parse(htmlString, {})
console.log("Extract code done.")

const beautifyHTML = js_beautify.html_beautify(data.innerHTML, {})

const beautifulJS = js_beautify.js_beautify(data.querySelectorAll("script").pop().innerHTML, {
  indent_char: ' ',
  indent_size: 2,
  space_after_anon_function: true,
  space_before_conditional: true,
  jslint_happy: true,
})
console.log("Format code done.")

fs.writeFileSync(path.join(__dirname, resultFolder, 'temp.js'), beautifulJS)
fs.writeFileSync(path.join(__dirname, resultFolder, 'index.html'), beautifyHTML)
console.log("Write code done.")


// fs.writeFileSync('test.html', result)