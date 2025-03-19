# expressjs

资料

- github https://github.com/expressjs/express
- 官网 https://expressjs.com/

## 核心流程

### step1，通用环境和依赖

```bash
node --version # v20.10.0
npm --version # 10.2.3
```

### step2，编写/下载项目

shell

```bash
npm init
npm install express --save
git init
```

main.js

```bash
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```




