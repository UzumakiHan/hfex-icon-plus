
const fs = require('fs');

const { writeFile, existsSync, mkdir } = fs;
const path = require('path');
const iconifyImportDirectory = require('@iconify/tools/lib/import/directory')
const iconCleanupSVG = require('@iconify/tools/lib/svg/cleanup')
const iconRunSVGO = require('@iconify/tools/lib/optimise/svgo')
const iconParse = require('@iconify/tools/lib/colors/parse')

const importDirectory = iconifyImportDirectory.importDirectory;
const cleanupSVG = iconCleanupSVG.cleanupSVG;
const runSVGO = iconRunSVGO.runSVGO;
const parseColors = iconParse.parseColors;
const isEmptyColor = iconParse.isEmptyColor;

//icon svg文件夹
const svgDir =path.join(process.cwd(),'icons')
const info = {
	name: 'Hfex Design Icons',
	author: {
		name: 'HE'
	},
	samples: ['account-check', 'bell-alert-outline', 'calendar-edit'],
	height: 24,
	category: "General",
	palette: false
};
const errHandle = err => {
	if (Boolean(err)) {
		throw err
	}
}
// 输出文件的存储路径
const outputPath = path.join(process.cwd(),'iconify-json')
module.exports= createIconJson = ()=>{
    (async () => {
        // Import icons
        const iconSet = await importDirectory(svgDir, {
            prefix: 'hfex-icon',
        });
        iconSet.info = info;
        // console.log(iconSet)
        // Validate, clean up, fix palette and optimise
        await iconSet.forEach(async (name, type) => {
            if (type !== 'icon') {
                return;
            }
            const svg = iconSet.toSVG(name);
            if (!svg) {
                // Invalid icon
                iconSet.remove(name);
                return;
            }
            
            // Clean up and optimise icons
            try {
                await cleanupSVG(svg);
    
                await parseColors(svg, {
                    defaultColor: 'currentColor',
                    callback: (attr, colorStr, color) => {
                        return !color || isEmptyColor(color)
                            ? colorStr
                            : 'currentColor';
                    },
                });
                await runSVGO(svg);
            } catch (err) {
                // Invalid icon
                console.error(`Error parsing ${name}:`, err);
                iconSet.remove(name);
                return;
            }
            // Update icon
            iconSet.fromSVG(name, svg);
    
        });
        // Export as IconifyJSON
        const exported = JSON.stringify(iconSet.export(), null, '\t') + '\n';
    
        // Save to file
        const isExit = existsSync(outputPath);
        if (!isExit) {
            mkdir(outputPath, { recursive: true }, err => {
                if (err) throw err;
            })
        }
        writeFile(`${outputPath}/${iconSet.prefix}.json`, exported, errHandle);
    
    })();
}
