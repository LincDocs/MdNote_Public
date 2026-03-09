---
create_date: 2026-03-09
last_date: 2026-03-09
author:
  - LincZero
---
# Tauri拖拽及冲突

## 解决Tauri2.x拖拽事件问题

见: https://juejin.cn/post/7546014854211436607

最近在使用 Tauri2.x 开发桌面应用时，遇到了一个棘手的问题：拖拽事件无法正常工作。经过一番调查和尝试，终于找到了解决方案。在这篇文章中，我将分享我的解决过程，希望能帮助到遇到类似问题的开发者。

### 问题

使用前端监听拖拽事件时，发现事件无法触发。例如

```ts
document.addEventListener('DOMContentLoaded', () => {
  const uploadZone = document.getElementById('file-upload-zone');
  const fileList = document.getElementById('file-list');

  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-hover');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-hover');

    const files = Array.from(e.dataTransfer.files);
    displayFiles(files);
  });

  function displayFiles(files) {
    fileList.innerHTML = files.map(file =>
      `<div class="file-item">${file.name} (${file.size} bytes)</div>`
    ).join('');
  }
});
```

无论如何拖拽，控制台都没有任何输出。

### 解决

默认情况下，Tauri 配置

```json
{
  "app": {
    "windows": [
      {
        "label": "main",
        "title": "wngtools",
        "width": 800,
        "height": 600,
        "resizable": true,
        "fullscreen": false,
        "dragDropEnabled": true //这个默认是true
        //Whether the drag and drop is enabled or not on the webview. By default it is enabled.
        //Disabling it is required to use HTML5 drag and drop on the frontend on Windows.
      }
    ],
    ...
  },
  ...
}
```

Tauri 的安全策略阻止了拖拽事件。默认情况下，前端事件被 Tauri 拦截，走它自己的事件

比如说`tauri://drag-drop`,`tauri://drag-leave`,`tauri://drag-enter`等。

那么方案就有两个:

- (1) 声明"dragDropEnabled": false，这样前端的拖拽事件就能正常工作了。
  但既然Tauri以权限控制与安全为主，可能这会有问题。
  并且我实测这样好像也还是无法拖拽
- (2) 使用 Tauri 提供的拖拽事件

但既然Tauri以权限控制与安全为主，我选择了第二个方案，使用 Tauri 提供的拖拽事件。

所以要把原有的拖拽事件改成 Tauri 的事件。

```ts
import { listen } from "@tauri-apps/api/event";
listen("tauri://drag-drop", (e) => {
  console.log("Dropped files:", e);
});
listen("tauri://drag-leave", () => {
  console.log("Drag leave");
});
listen("tauri://drag-enter", () => {
  console.log("Drag enter");
});
```

当我尝试拖拽文件到应用窗口时，控制台成功输出了拖拽的文件信息。

当然，根据[官方文档](https://link.juejin.cn?target=https%3A%2F%2Ftauri.app%2Fzh-cn%2Freference%2Fjavascript%2Fapi%2Fnamespaceevent%2F "https://tauri.app/zh-cn/reference/javascript/api/namespaceevent/"), `Tauri://` 事件并不能监听到具体的 **DOM** 对象(~~当然，如果你喜欢用相对坐标来判断那我没话说~~)，所以如果你需要监听具体的 DOM 对象的拖拽事件，还是需要把 `dragDropEnabled` 设置为 `false`,并且使用原生的DOM拖拽事件才能行。

### 参考

- [Tauri 官方文档 - 事件](https://link.juejin.cn?target=https%3A%2F%2Ftauri.app%2Fzh-cn%2Freference%2Fjavascript%2Fapi%2Fnamespaceevent%2F "https://tauri.app/zh-cn/reference/javascript/api/namespaceevent/")
- [解决tauri文件拖放无效问题](https://link.juejin.cn?target=https%3A%2F%2Fblog.erio.work%2Fposts%2F%25E8%25A7%25A3%25E5%2586%25B3tauri%25E6%2596%2587%25E4%25BB%25B6%25E6%258B%2596%25E6%2594%25BE%25E6%2597%25A0%25E6%2595%2588%25E9%2597%25AE%25E9%25A2%2598%2F "https://blog.erio.work/posts/%E8%A7%A3%E5%86%B3tauri%E6%96%87%E4%BB%B6%E6%8B%96%E6%94%BE%E6%97%A0%E6%95%88%E9%97%AE%E9%A2%98/")

## 其他

参考: https://github.com/ant-design/pro-components/issues/9322

而且某些资源可能还会提到一个 `"fileDropEnabled": false`，但这个估计不是 Tauri2 的设置，我写这个他提示没有该字段













