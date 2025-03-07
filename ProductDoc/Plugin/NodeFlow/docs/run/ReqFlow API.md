# ReqFlow API

## API

由于插件设计中其中一个特征是方便与其他插件配合，所以我这里使用了和 rooyca/obsidian-api-request 类似的flag

并借用了其文档说明： https://rooyca.github.io/obsidian-api-request/zh/codeblocks/

- (obsidian-api-request 接口版)
- `await requestUrl({ url, method, headers, body });` (obsidian特供版)
    - 控制台快速测试：`request('https://httpbin.org/get').then(v=>console.log(v))` (仅ob控制台)
- `await fetch(url, {method, headers, body});` (通用版)
    - 控制台快速测试 `fetch('https://httpbin.org/get').then(v=>console.log(v))`

(obsidian-api-request 字段，用于网络请求的是前四个，另外四个不参加网络请求，是其他用途)

| 标志                                                                                | 默认          |
| --------------------------------------------------------------------------------- | ----------- |
| [url](https://rooyca.github.io/obsidian-api-request/zh/codeblocks/#url)           | (无，必须)      |
| [method](https://rooyca.github.io/obsidian-api-request/zh/codeblocks/#method)     | GET         |
| [body](https://rooyca.github.io/obsidian-api-request/zh/codeblocks/#body)         |             |
| [headers](https://rooyca.github.io/obsidian-api-request/zh/codeblocks/#headers)   |             |
| [show](https://rooyca.github.io/obsidian-api-request/zh/codeblocks/#show)         | ALL         |
| [req-id](https://rooyca.github.io/obsidian-api-request/zh/codeblocks/#req-id)     | req-general |
| [disabled](https://rooyca.github.io/obsidian-api-request/zh/codeblocks/#disabled) |             |
| [save-as](https://rooyca.github.io/obsidian-api-request/zh/codeblocks/#save-as)   |             |

## url







