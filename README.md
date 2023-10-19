# hfex图标库

## Install
```
npm i -D hfex-icon
```
## 主要提供2种使用方式

## 方式一
## 通过svg图标资源，借助unplugin-icons库将svg图标文件生成vue组件，然后通过vue组件的引入方式在vue中使用
## unplugin-icons github 
https://github.com/antfu/unplugin-icons
## 兼容vue2和vue3 

## 在vue.config.js的plugins中配置
## Install unplugin-icons

```
npm i -D unplugin-icons
```
# Webpack版本
```
const path = require('path')
const Icons = require('unplugin-icons/webpack');
const { FileSystemIconLoader } = require('unplugin-icons/loaders');
module.exports = {
  configureWebpack:{
    plugins:[
        Icons({
            compiler: vue2,//vue2或者vue3，看当前项目
            customCollections: {
                'hfex-icon': FileSystemIconLoader(path.join(process.cwd(), './node_modules/hfex-icon/icons'), svg =>
                    svg.replace(/^<svg /, '<svg fill="currentColor" ')
                )
            }
        })
    ]
  }
}
```
# Vite版本
```
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import path from 'path'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
export default defineConfig({
  plugins:[
    Icons({
    compiler: vue3,//vue2或者vue3，看当前项目
    customCollections: {
      'hfex-icon': FileSystemIconLoader(path.join(process.cwd(), './node_modules/hfex-icon/icons'), svg => {
        return svg.replace(/^<svg /, '<svg fill="currentColor" ')
      }

    )
  }
}),
]
})
```
## 也可以通过hfex-icon-plugin 配置，hfex-icon-plugin是将以上plugin上的配置封装起来

Use with [`hfex-icon-plugin`](https://github.com/UzumakiHan/hfex-icon-plugin)

## Install
```
npm i hfex-icon-plugin -D
```

## Usage

<details>
<summary>vue+webpack</summary><br>

For example in Vue:

```js
// vue.config.js
const HfexIconPlugin = require('hfex-icon-plugin/webpack')
module.exports = {
    configureWebpack:{
        plugins:[
            HfexIconPlugin()
        ]
    }
}
```

</details>


<details>
<summary>vue+vite</summary><br>


For example in Vite:

```js
// vite.config.ts
import HfexIconPlugin from 'hfex-icon-plugin';
export default defineConfig({
    plugins:[
        HfexIconPlugin()
    ]
})
```
</details>

## 在vue入口文件引入注册组件
```
import HfexIcon from 'hfex-icon'
app.use(HfexIcon) //vue3
Vue.use(MfexIcon); //vue2

```
## 使用
```
<hfex-icon name="home" color="#999" size="80px"/>
```

## 效果展示
![Image text](https://raw.githubusercontent.com/UzumakiHan/static-files/master/images/hfex-icon-show.png)

## 参数支持
|   参数    |    类型  |  默认值     |
| :-------: | :------: | :--------: |
|   name    |  string  |    home    |
|   size    |  string  |    28px    |
|   color   |  string  |    #000    |




## 方式二

## 配合unocss使用

## Install unocss
```
npm install -D unocss
```
## 在vue入口文件引入
```
import 'uno.css'
```
## 在vue.config.js的plugins中配置
```
npm install -D @unocss/webpack
```

```
//vue.config.js
const UnoCSS = require('@unocss/webpack').default
const presetIcons = require('unocss').presetIcons
const presetUno = require('unocss').presetUno
const presetAttributify = require('unocss').presetAttributify

module.exports = {
  configureWebpack:{
    plugins:[
      UnoCSS({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            collections: {
              'hfex-icon': () => require('hfex-icon/iconify-json/hfex-icon.json')
            }
          })
        ]
      }),
    ]
  }
}

```


## vite中使用
```
//vite.config.ts
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  plugins:[
      UnoCSS({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            collections: {
              'hfex-icon': () => require('hfex-icon/iconify-json/hfex-icon.json')
            }
          })
        ]
      }),
    ]
})


```


## 使用
```
<div class="i-hfex-icon:message w-80px h-80px bg-#cde6c7"></div>
<div class="i-hfex-icon:delete w-80px h-80px bg-#994405"></div>
<div class="i-hfex-icon:share w-80px h-80px bg-#cde6c7"></div>
```

## 效果展示
![Image text](https://raw.githubusercontent.com/UzumakiHan/static-files/master/images/unocss-show.png)
## 图标支持
![Image text](https://raw.githubusercontent.com/UzumakiHan/static-files/master/images/icon-support.png)

