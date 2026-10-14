---
create_date: 2026-10-12
last_date: 2026-10-12
---
# vsc-extension-quickstart.md

取自官方 [默认示例项目(hellowrold)](https://github.com/Microsoft/vscode-extension-samples/tree/main/helloworld-minimal-sample) 的 vsc-extension-quickstart.md 文件

欢迎使用你的 VS Code 扩展

## 文件夹内容

* 此文件夹包含扩展所需的所有文件。
* `package.json` — 这是扩展的清单文件，用于声明你的扩展和命令。
* 示例插件注册了一个命令，并定义了其标题和命令名称。这些信息使 VS Code 能在命令面板中显示该命令，此时扩展尚未加载。
* `src/extension.ts` — 这是主文件，你将在其中实现命令功能。
* 该文件导出一个名为 `activate` 的函数，当扩展首次激活时（即执行命令时）会调用此函数。在 `activate` 函数内部，我们调用 `registerCommand`。
* 我们将包含命令实现的函数作为第二个参数传递给 `registerCommand`。

## 立即开始使用

* 按下 `F5`，打开一个新窗口并加载你的扩展。
* 通过按下（Windows/Linux：Ctrl+Shift+P；Mac：Cmd+Shift+P）并输入 `Hello World`，从命令面板运行命令。
* 在 `src/extension.ts` 中为代码设置断点，以调试你的扩展。
* 在调试控制台中查看扩展的输出。

## 进行修改

* 修改 `src/extension.ts` 中的代码后，可以从调试工具栏重新启动扩展。
* 你也可以通过快捷键（Mac 上为 `Ctrl+R` 或 `Cmd+R`）重新加载 VS Code 窗口中的扩展，以加载你的更改。

## 探索 API

* 打开文件 `node_modules/@types/vscode/index.d.ts` 即可查看完整的 API。

## 运行测试

* 安装 [扩展测试运行器](https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)
* 通过 **任务：运行任务** 命令执行“watch”任务。确保该任务正在运行，否则可能无法检测到测试。
* 从活动栏打开“测试”视图，点击“运行测试”按钮，或使用快捷键 `Ctrl/Cmd + ; A`
* 在“测试结果”视图中查看测试结果的输出。
* 修改 `src/test/extension.test.ts` 文件，或在 `test` 文件夹内创建新的测试文件。
* 提供的测试运行器仅会考虑与名称模式 `**.test.ts` 匹配的文件。
* 你可以在 `test` 文件夹内创建子文件夹，按任意方式组织你的测试。

## 进一步操作

* 遵循 [用户体验指南](https://code.visualstudio.com/api/ux-guidelines/overview)，创建与 VS Code 原生界面和模式无缝集成的扩展程序。  
* 通过[打包你的扩展](https://code.visualstudio.com/api/working-with-extensions/bundling-extension)来减小扩展体积并提升启动速度。  
* 将你的扩展发布到 [VS Code 扩展市场](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)。  
* 设置[持续集成](https://code.visualstudio.com/api/working-with-extensions/continuous-integration)，实现自动化构建。  
* 集成[提交问题](https://code.visualstudio.com/api/get-started/wrapping-up#issue-reporting)流程，以便收集用户提出的问题和功能需求。


