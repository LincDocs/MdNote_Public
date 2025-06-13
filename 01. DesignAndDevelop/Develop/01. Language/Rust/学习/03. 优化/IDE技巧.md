# IDE技巧

话说VSCode的Rust高亮，感觉比其他语言丰富很多啊，像是调过一样。

- [x] 具备类型补全显示
- [x] 支持mut变量下滑线
- [x] 及时的错误警告显示

通常VSCode装扩展为：rust-analyzer

自用设置: (有时类型显示太多太长了)

```json
"rust-analyzer.hover.maxSubstitutionLength": 20,
"rust-analyzer.inlayHints.typeHints.enable": false, // 这个好像没用，只能一个一个局部地关
"rust-analyzer.inlayHints.typeHints.hideClosureInitialization": true,
"rust-analyzer.inlayHints.typeHints.hideClosureParameter": true,
"rust-analyzer.inlayHints.typeHints.hideNamedConstructor": true,
"rust-analyzer.inlayHints.parameterHints.enable": false,
"rust-analyzer.hover.actions.gotoTypeDef.enable": false,
"rust-analyzer.inlayHints.chainingHints.enable": false
```


