---
create_date: 2025-10-07
last_date: 2025-10-07
Author: LincZero
tags:
  - 源码
main_tag: github
---
# 使用github和gitee作为用户词典

参考项目: https://github.com/Obsidian-Forge/obsidian-i18n/

## 项目结构

- 核心代码位置:
  - https://github.com/Obsidian-Forge/obsidian-i18n/blob/master/src/api.ts#L124
    ```ts
    // 获取翻译文件
    public async githubGetTranslation(type: string, id: string, version: string);
	  // 获取翻译文件
	  public async giteeGetTranslation(type: string, id: string, version: string);
    ```
- 词典位置: 
  - https://gitee.com/zero--two/obsidian-i18n-translation/raw/master/translation/mark/zh-cn.json
  - https://github.com/Obsidian-Forge/obsidian-i18n/blob/master/translation/mark/zh-cn.json
- 词典位置: 
  - https://github.com/Obsidian-Forge/obsidian-i18n/blob/master/translation/dict/
  - 有非常多文件夹，第一层表示插件，第二层代表语言，第三层 (最后一层) 表示插件版本
  - 每个文件的内容是个json。有 manifest、description、dict 字段。前两个为描述信息，最后一个是翻译字典 `dict: Record<string, string>`

## 核心代码

api.ts

```ts
class API {
  // 自身插件 (i18n) 的版本和token
  // url: https://gitee.com/zero--two/obsidian-i18n-translation/raw/master/version.json
  version()

  // 遮罩，表示这些插件本身已经实现了多语言，不要再去翻译了
  // url: https://gitee.com/zero--two/obsidian-i18n-translation/raw/master/translation/mark/zh-cn.json
  getMark()
  
  // ------------------------
  // 核心 - 找词典
  // url: https://raw.githubusercontent.com/0011000000110010/obsidian-i18n/refs/heads/master/${type}/dict/${id}/zh-cn/${version}.json
  githubGetTranslation()
  // https://gitee.com/zero--two/obsidian-i18n-translation/raw/master/${type}/dict/${id}/zh-cn/${version}.json
  giteeGetTranslation()
  
  // ------------------------
  // 下面的部分专注于使用gitee完成一些在线读写，需要一些额外的权限
  giteeGetToken()
  giteeGetDirectory()
  giteeGetDirectoryAdmin()
  giteeGetSha()
  giteeGetContents()
  giteeGetContributor()
  giteeGetReleasesLatest()
  giteeGetAllIssue()
  giteeGetIssue()
  giteePostIssue()
  giteePatchIssue()
  giteePostIssueComments()
  // 从 Gitee 下载文件
  giteeDownload()
  // 从 Gitee 获取文件
  giteeGetFile()
  // 异步创建或更新 Gitee 仓库中的文件内容
  giteeCreateFileContent()
  // 异步更新 Gitee 仓库中指定路径的文件内容
  giteeUpdateFileContent()
  // 异步获取 Gitee 用户信息的函数
  giteeUser()
  // 检查用户是否是仓库的成员
  checkUser()

  // ------------------------
  // 用来机器翻译
  baiduAPI()
  openAI()
  openAITest()
}

// 封装各个厂商的api
TranslationAPI {
  baiduAPI()
  openAI()
  openAITest()
}
```

核心

```ts
// 获取翻译文件
public async githubGetTranslation(type: string, id: string, version: string) {
  try {
    const RequestUrlParam: RequestUrlParam = {
      url: `https://raw.githubusercontent.com/0011000000110010/obsidian-i18n/refs/heads/master/${type}/dict/${id}/zh-cn/${version}.json`,
      method: 'GET'
    };
    console.log(RequestUrlParam)
    const response = await requestUrl(RequestUrlParam);
    return { 'state': true, 'data': response.json };
  } catch (error) {
    return { 'state': false, 'data': '' };
  }
}
// 获取翻译文件
public async giteeGetTranslation(type: string, id: string, version: string) {
  try {
    const RequestUrlParam: RequestUrlParam = {
      url: `https://gitee.com/zero--two/obsidian-i18n-translation/raw/master/${type}/dict/${id}/zh-cn/${version}.json`,
      method: 'GET'
    };
    const response = await requestUrl(RequestUrlParam);
    return { 'state': true, 'data': response.json };
  } catch (error) {
    return { 'state': false, 'data': '' };
  }
}
```

参数:

- type: "translation"/"theme" (前者应该是历史遗留的问题，译作插件应该更合适)
- id: 插件id
- version: 插件版本






