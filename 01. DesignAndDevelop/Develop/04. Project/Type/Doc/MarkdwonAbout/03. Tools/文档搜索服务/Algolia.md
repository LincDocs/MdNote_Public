# Algolia

先读README

## DocSearch版流程 (新)

流程二：

- ~~(https://www.bilibili.com/video/BV1DY411v7Lt)~~ (删)
- https://theme-hope.vuejs.press/zh/guide/feature/search.html#%E4%BD%BF%E7%94%A8-vuepress-plugin-docsearch

docSearch 分几个子域名：

- https://dashboard.algolia.com/ ， 负责从indices(索引/目录)中检索，并返回数据。可以看 ID、Key、爬取结果
- https://crawler.algolia.com/ ， 负责爬虫、爬取数据后生成indices(索引/目录)。并且会将结果保存到上面的dashboard中。
  用这里的爬虫工具可以代替旧版的CI版流程（自己爬取），当然你可以选择不用这里，而是自己爬取。
- https://docsearch.algolia.com/ ， 限制：所有者、开源仓库、技术类博客

其他

- https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/?q=redirect algolia文档、crawler (配置相关) 的文档

## CI版流程 (旧)

流程一：https://www.bilibili.com/video/BV1eG4y1g7Kj，但他这个流程需要用CI……而且和文档的流程不同一致

1. 创建应用：设置 > General > Applications > 生成一个新应用 > 进入应用
2. Vuepress中配置：
   - 进入应用后看到Welcome标语下面有一个 `API Keys`，点击后获取：应用ID、搜索Key、暂时不要去管那个Admin Key
   - 然后进入到 docs/.vitepress/config 文件中去配置 id 和 key 等，详见vuepress文档
3. Github中配置：
   - 在Github Setting > Secrets > Actions 中创建两个secrets `API_KEY` = Algolia中的Admin key、`APPLICATION_ID` = 应用ID。CI会用到
4. crawlerConfig.json
   - ……
5. Algolia中配置
6. 爬取成功检查：
   - 在AlgoliaSearch侧边栏的search中，能看到爬取的所有数据

