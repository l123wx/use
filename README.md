# @l123wx/use

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

A tool for automatically importing [@l123wx/shared](https://github.com/l123wx/shared) into a project

一个用来将 [@l123wx/shared](https://github.com/l123wx/shared) 公共方法库导入到项目中的工具

## Usage

```shell
npx @l123wx/shared
```

```js
import { useLoading } from '@l123wx/shared'

const [isLoading, run] = useLoading()
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@l123wx/use?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@l123wx/use
[npm-downloads-src]: https://img.shields.io/npm/dm/@l123wx/use?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@l123wx/use

## TODO

 - [x] 将文件移动到 package 目录下
 - [ ] ~~解决 package 在项目打包时的 tree sharking 问题，参考 [vue/scripts/build.js](https://github.com/vuejs/vue/blob/main/scripts/build.js)~~ 不存在这个问题
 - [ ] 将这个项目和 `@l123wx/shared` 解耦，变成适用其他公共代码库的工具
