---
create_time: 2025-01-09
Author: LincZero
---
# .github/

文件夹名是 `.github`，用于保存一些github扩展和设置

其文件下面通常有：

[dir]

- .github/
  - workflows/
    - 工作流文件名.yml | 最常用的功能之一，利用github的action工作流
  - FUNDING.yml      | 赞助名单，会在仓库页的右侧显示
  - renovate.json
  - (other) | 可能还有一切其他配置，是我没见过/没用过的

详细具体的得查下github文档，有的我也没见过/没用过

## workflows/xxx.yml 示例

略，我记得我好像写过这方面的笔记？不知道放哪了

## FUNDING.yml 示例

参考： https://github.com/nolebase/integrations/blob/main/.github/FUNDING.yml

```yml
# These are supported funding model platforms

github: [LittleSound,nekomeowww] # Replace with up to 4 GitHub Sponsors-enabled usernames e.g., [user1, user2]
patreon: # Replace with a single Patreon username
open_collective: # Replace with a single Open Collective username
ko_fi: # Replace with a single Ko-fi username
tidelift: # Replace with a single Tidelift platform-name/package-name e.g., npm/babel
community_bridge: # Replace with a single Community Bridge project-name e.g., cloud-foundry
liberapay: # Replace with a single Liberapay username
issuehunt: # Replace with a single IssueHunt username
lfx_crowdfunding: # Replace with a single LFX Crowdfunding project-name e.g., cloud-foundry
polar: # Replace with a single Polar username
buy_me_a_coffee: # Replace with a single Buy Me a Coffee username
custom: # Replace with up to 4 custom sponsorship URLs e.g., ['link1', 'link2']
```


