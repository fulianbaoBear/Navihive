// 临时类型声明以兼容 MUI Icons 在 TS5 bundler 解析下的子路径导入
// 说明：@mui/icons-material v7 的 `esm/*` 子路径可能缺少 .d.ts，
// 导致 TypeScript 无法找到声明文件而报错。这里统一声明为 any，
// 对实际运行无影响，仅用于通过构建。（后续可升级到官方修复版本移除此文件）
declare module '@mui/icons-material/*' {
  const IconComponent: any;
  export default IconComponent;
}