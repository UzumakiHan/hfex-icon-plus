const { program } = require('commander');
const axios = require('axios');
const fs = require('fs');
const xmldom = require('@xmldom/xmldom')
const SvgPath = require('svgpath')
const lodash = require('lodash')
const path = require('path');
const ejs = require('ejs');

const { resolve } = path;
const { camelCase,upperFirst } =lodash ;
const { writeFile, existsSync, mkdir } = fs;

const createIconJson = require('./create-icon')
program
    .requiredOption('-f, --file <string>', 'Iconfont svg file');

program.parse(process.argv);

const options = program.opts();

console.log(`- update ${options.file}`);
// 输出文件的存储路径
const outputPath = path.join(process.cwd(),'icons')
const outputVuePath = path.join(process.cwd(),'src/vue/hfex-icon.vue')
// svg 文件模板
const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="_VIEWBOX_" aria-hidden="true"
style="overflow: hidden;vertical-align: -0.15em;"><path d="__PATH__"/></svg>`;
const errHandle = err => {
    if (Boolean(err)) {
        throw err
    }
}
const importSvgFont = (data) => {
    // console.log(data)
    const xmlDoc = new xmldom.DOMParser().parseFromString(data, 'application/xml');
   
    const svgFont = xmlDoc.getElementsByTagName('font')[0];
  
    const svgFontface = xmlDoc.getElementsByTagName('font-face')[0];
    const svgGlyps = xmlDoc.getElementsByTagName('glyph');
    const fontHorizAdvX = svgFont.getAttribute('horiz-adv-x');
    const fontAscent = svgFontface.getAttribute('ascent') || 0;
    const fontUnitsPerEm = parseInt(svgFontface.getAttribute('units-per-em') || '') || 1000;
    const scale = 1000 / fontUnitsPerEm;
    const temp = {};
    Array.from(svgGlyps).forEach(svgGlyph => {
        let d = svgGlyph.getAttribute('d') || '';
        const glyphHorizAdvX = svgGlyph.hasAttribute('horiz-adv-x')
            ? svgGlyph.getAttribute('horiz-adv-x')
            : fontHorizAdvX;
        const glyphName = svgGlyph.getAttribute('glyph-name') || '';

        if (!glyphHorizAdvX || !d || !glyphName) {
            return;
        }
        d = new SvgPath(d).translate(0, -fontAscent).scale(scale, -scale).abs().round(1).toString();
        const componentName = upperFirst(camelCase(`hfex-icon-${glyphName}`))
        temp[glyphName] = {
            componentName,
            d,
            width: parseInt(glyphHorizAdvX) * scale
        };
    });

    return temp;
}
const isExit = existsSync(outputPath);
if (!isExit) {
    mkdir(outputPath, { recursive: true }, err => {
        if (err) throw err;
    })
} 
axios({
    url: options.file,
    methods: 'GET'
}).then(res => {
    const svgRes =  res.data;
    const iconArray = svgRes.match(/<glyph[^\n]*\/>/g);
    // console.log(svgRes)
    const icons = importSvgFont(svgRes)
    const ejsTemp = ejs.render(fs.readFileSync('./icon-template.tpl', 'utf-8'), {
        icons
    })
    writeFile(
        resolve(outputVuePath),
        ejsTemp,
        errHandle
    )
    // console.log(icons)
    iconArray.forEach(item => {
        const className = item.match(/glyph-name="([\w-_]+)"/)[1];
        writeFile(
            resolve(outputPath, className + '.svg'),
            svgTemplate.replace('__PATH__', icons[className].d).replace('_VIEWBOX_', `0 0 ${icons[className].width} ${icons[className].width}`),
            errHandle
        );
    });
    createIconJson()
});
