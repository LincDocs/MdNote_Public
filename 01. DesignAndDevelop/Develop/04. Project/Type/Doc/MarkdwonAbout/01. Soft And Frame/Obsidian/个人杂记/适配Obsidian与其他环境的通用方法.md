---
create_date: 2025-10-09
last_date: 2025-10-09
Author: LincZero
---
# 适配Obsidian与其他环境的通用方法

在过去，我经常这样做。如 load mermaid、load prismjs、render Markdown、网络api 等等。

不过我过去这样做的时候，还没有写这篇笔记。具体的可以去查我 (LincZero) 的github项目

## ...许多

当初忘写笔记了

## 网络api

```ts
import { RequestUrlParam, requestUrl } from 'obsidian'

// 获取目录
  public async giteeGetDirectory() {
    const RequestUrlParam: RequestUrlParam = {
      url: `${this.giteeBaseUrl}store/directory/dir.json`,
      method: 'GET'
    };
    try {
      const response = await requestUrl(RequestUrlParam); // arrayBuffer headers json status text
      return { 'code': 0, 'data': response.json };
    } catch (error) {
      return { 'code': -1, 'msg': error };
    }
  }

  // 获取翻译文件
  public async giteeGetDict() {
    try {
      const RequestUrlParam: RequestUrlParam = {
        url: `${this.giteeBaseUrl}store/dict/AdQuote.toml`,
        method: 'GET'
      };
      const response = await requestUrl(RequestUrlParam);
      return { 'code': 0, 'data': response.text };
    } catch (error) {
      return { 'code': -1, 'msg': error };
    }
  }





// 弄一个适配器方法，能在obsidian环境中使用obsidian的这个方法，能在非obsidian环境中使用其他无依赖的方法。封装成一个通用的入口，能输入相同的参数和返回值。例如：
// 
// 定义以下接口（仅示例，可修改），需要在obsidian环境和其他环境分别初始化该函数。然后再去使用

urlRequest: (conf: {
      url: string,
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
      headers?: Record<string, string>,
      body?: BodyInit | null
    }) => Promise<{
      code: number,
      data?: {
        text?: string;
        json?: any;
        originalResponse?: any; // 原始响应对象，用于调试
      },
      msg?: string,
    }>
```

### api

```ts
/**
 * 请求配置接口
 */
export interface UrlRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: BodyInit | null;
  // 这里可以加个是否预期json返回结果，默认true，若false则跳过尝试解析的环节
}

/**
 * 响应数据接口
 */
export interface UrlResponseData {
  text: string;
  json?: any;
  originalResponse: any; // 原始响应对象，用于调试
}

/**
 * 统一响应接口
 */
export interface UrlResponse {
  code: number; // 0 表示成功, -1 表示失败
  data?: UrlResponseData;
  msg?: string;
}

/**
 * 请求处理器函数类型
 */
export type UrlRequestHandler = (conf: UrlRequestConfig) => Promise<UrlResponse>;
```

### 自动适配 (入口不同则不需要这步)

```ts
/**
 * 检查当前环境是否为 Obsidian 环境
 * @returns {boolean} 如果是 Obsidian 环境则返回 true，否则返回 false
 */
const isObsidianEnvironment = (): boolean => {
  // 'obsidian' 是 Obsidian API 的全局入口点
  return typeof obsidian !== 'undefined' && typeof obsidianRequestUrl === 'function';
};

/**
 * 根据当前环境选择并返回合适的请求处理器。
 * @returns {UrlRequestHandler}
 */
const createUrlRequestHandler = (): UrlRequestHandler => {
  if (isObsidianEnvironment()) {
    console.log("Running in Obsidian environment. Using 'requestUrl'.");
    return obsidianUrlRequest;
  } else {
    console.log("Running in a standard environment. Using 'fetch'.");
    return fetchUrlRequest;
  }
};

/**
 * 通用的请求函数实例，根据环境自动适配。
 * 你可以在你的应用中直接导入和使用这个函数。
 */
export const urlRequest: UrlRequestHandler = createUrlRequestHandler();
```

### obsidian环境

```ts
import { RequestUrlParam, requestUrl as obsidianRequestUrl } from 'obsidian';

/**
 * Obsidian 环境下的请求实现
 * @param {UrlRequestConfig} conf - 请求配置
 * @returns {Promise<UrlResponse>}
 */
const obsidianUrlRequest: UrlRequestHandler = async (conf) => {
  try {
  // 参数适配
    const requestParams: RequestUrlParam = {
      url: conf.url,
      method: conf.method || 'GET',
      headers: conf.headers,
      body: conf.body as string | ArrayBuffer, // Obsidian `requestUrl` 需要更具体的类型
    };

    const response = await obsidianRequestUrl(requestParams);

    // 返回值适配
    let json;
    try {
      json = response.json;
    } catch (e) {
      // response.json 可能因为不是有效的json而抛出异常
      json = null;
    }
    return {
      code: 0,
      data: {
        text: response.text,
        json: json,
        originalResponse: response,
      },
    };
  } catch (error: any) {
    console.error('Obsidian request failed:', error);
    return {
      code: -1,
      msg: error?.message || 'An unknown error occurred in Obsidian request.',
      data: {
        text: '',
        originalResponse: error
      }
    };
  }
};
```

### 通用环境

```ts
/**
 * 通用环境下的请求实现 (使用 fetch API)
 * @param {UrlRequestConfig} conf - 请求配置
 * @returns {Promise<UrlResponse>}
 */
const fetchUrlRequest: UrlRequestHandler = async (conf) => {
  try {
    const response = await fetch(conf.url, {
      method: conf.method || 'GET',
      headers: conf.headers,
      body: conf.body,
    });

    if (!response.ok) {
      // 处理 HTTP 错误状态 (例如 404, 500)
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    
    // 尝试解析 JSON，如果失败则回退
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      json = null;
    }

    return {
      code: 0,
      data: {
        text: text,
        json: json,
        originalResponse: response,
      },
    };
  } catch (error: any) {
    console.error('Fetch request failed:', error);
    return {
      code: -1,
      msg: error?.message || 'An unknown error occurred in fetch request.',
      data: {
        text: '',
        originalResponse: error
      }
    };
  }
};
```



### 使用示例

```ts
// 你可以在你的代码中这样使用，无需关心环境差异

// 假设这是你的某个业务文件
import { urlRequest } from './requestAdapter';

class MyGiteeService {
  private giteeBaseUrl = 'https://gitee.com/api/v5/repos/owner/repo/'; // 请替换为你的 Gitee 仓库地址

  public async giteeGetDirectory() {
    const response = await urlRequest({
      url: `${this.giteeBaseUrl}store/directory/dir.json`,
      method: 'GET'
    });

    if (response.code === 0) {
      return { 'code': 0, 'data': response.data?.json };
    } else {
      return { 'code': -1, 'msg': response.msg };
    }
  }

  public async giteeGetDict() {
    const response = await urlRequest({
      url: `${this.giteeBaseUrl}store/dict/AdQuote.toml`,
      method: 'GET'
    });

    if (response.code === 0) {
      return { 'code': 0, 'data': response.data?.text };
    } else {
      return { 'code': -1, 'msg': response.msg };
    }
  }
}

// 使用
const service = new MyGiteeService();
service.giteeGetDirectory().then(result => {
  console.log('Directory:', result);
});
```


