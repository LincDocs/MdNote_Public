# Github主页美化-组织版

## 不同点

组织的主页设置与个人版本的有所不同

一是需要创建的仓库名不同

- 个人版本：需要创建一个与你的用户名相同的仓库：例如我的就是 https://github.com/LincZero/LincZero
- 组织版本：需要创建一个名为 `.github` 的创建：例如 https://github.com/vuepress-theme-hope/.github/
- 不太确定两者能不能混用

二是存放 `README.md` 的位置不同

- 个人版本：在那个 `<用户名>` 仓库下可以直接创建 `README.md`、`Sponsors.md` 等文件
- 组织版本：在那个 `.github` 虽然你依然能在仓库下直接创建 `README.md`、`Sponsors.md` 等文件。
  但你还需要在 `profile` 文件夹下才存放一个新的 `README.md` ，才会在组织主页显示，见: https://github.com/vuepress-theme-hope/.github/blob/main/README.md

这种设计似乎有点奇怪

```chat
copilot:
为什么会有这样的区别？

这种设计是为了区分个人用户和组织用户的特殊需求和使用场景。

- 唯一性：个人用户的主页存储库与其用户名一致，确保每个用户主页的唯一性和标识性。
- 组织管理：组织通常会有多个存储库，使用 .github 存储库可以集中管理组织的配置文件和元数据，而不影响其他存储库的命名和使用。
- 结构清晰：将组织的 README 文件放置在 /profile/ 目录下，可以使 .github 存储库更有组织性，避免与其他 GitHub 配置文件混淆。
```


