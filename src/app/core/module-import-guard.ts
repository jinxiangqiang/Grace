// https://angular.io/guide/styleguide#style-04-12
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} 已加载。只导入AppModule中的核心模块。`);
  }
}
