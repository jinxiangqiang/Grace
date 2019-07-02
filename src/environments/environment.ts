// 在构建过程中，可以使用“fileReplacements”数组替换该文件。
// `ng build ---prod` replaces `environment.ts` 与 `environment.prod.ts`.
// 文件替换列表可以在 `angular.json`中找到.

export const environment = {
  SERVER_URL: `./`,
  production: false,
  useHash: true,
  hmr: false,
};

/*
 *在开发模式下，忽略区域相关的错误堆栈帧，例如
 *’zone.run”、“zoneDelegate。为了更容易调试，您可以这样做
 *导入以下文件，但请在生产模式下注释
 *因为抛出错误时会影响性能
 */

// 导入“zone.js / dist / zone-error”;//包含在Angular CLI中。
