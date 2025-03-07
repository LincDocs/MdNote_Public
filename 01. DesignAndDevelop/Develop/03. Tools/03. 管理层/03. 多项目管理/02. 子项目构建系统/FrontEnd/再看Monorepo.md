---
create_time: 2024-12-26
Author: LincZero
---

# 再看monorepo

以前对这个概念欠缺，近期也经手过一些monorepo，理解也加深了。再调研和分析一次：

## copilot gpt o4

其实有些不解 mono repo 的做法，仓库之前有共享的东西还好说，如果没有的话，是否多仓库会更好？主要对于非仓库主创者，贡献者如果只想使用或维护里面的某几个组件，mono repo 不会导致维护更麻烦吗？

:::info

Mono repo（单一代码库）和多仓库的选择是一个需要根据具体情况和需求来决定的问题。下面是对这两种方法的一些分析和比较，希望能帮助你理解它们的优缺点，并做出更合适的选择。

### Mono Repo 的优点

1. **统一的依赖管理**：所有代码在同一个仓库中，可以更方便地进行依赖管理和版本控制，避免了不同仓库间的依赖冲突。
2. **一致的代码风格和工具链**：可以在整个项目中使用统一的代码风格和开发工具链，提高了代码的一致性和可维护性。
3. **跨项目更容易重用代码**：在同一个仓库中，代码共享和重用变得更加容易，不需要在不同仓库间处理复杂的依赖关系。
4. **更容易进行大规模重构**：如果需要对多个模块进行大规模重构，单一代码库可以更方便地进行整体调整和测试。

### Mono Repo 的缺点

1. **仓库规模庞大**：随着项目的增加，仓库规模会变得非常庞大，可能会导致克隆和拉取时间变长，对版本控制系统的性能要求更高。
2. **权限管理复杂**：如果不同模块需要不同的权限管理，在单一代码库中进行细粒度的权限控制会比较复杂。
3. **贡献者复杂度增加**：对于只关注某些特定模块的贡献者来说，单一代码库中大量无关的代码和变更可能会增加他们的负担和复杂度。

### 多仓库的优点

1. **模块化管理**：每个模块都有独立的仓库，可以根据需要进行独立的版本控制和发布，更加模块化和灵活。
2. **权限管理简化**：可以针对不同的模块设置不同的权限，方便进行细粒度的权限控制。
3. **贡献者友好**：贡献者可以只关注他们感兴趣或负责的模块，避免了大量无关代码和变更的干扰。

### 多仓库的缺点

1. **依赖管理复杂**：跨仓库的依赖管理和版本控制会变得更加复杂，需要额外的工具和流程来处理依赖关系。
2. **代码一致性难以保证**：不同仓库可能会使用不同的代码风格和工具链，难以保证整个项目的代码一致性。
3. **跨项目重用困难**：跨仓库重用代码需要处理复杂的依赖关系，可能需要发布和安装额外的包。

### 结论

选择 mono repo 还是多仓库的方法需要根据项目的具体情况来决定。如果项目中有大量共享的代码和依赖，并且需要进行频繁的跨模块重构和测试，mono repo 可能会更合适。如果项目模块之间的依赖关系较少，且希望模块化管理和独立发布，多仓库可能会更合适。

无论选择哪种方法，都需要建立合理的开发流程和工具链，来应对各自的优缺点，确保项目的可维护性和开发效率。

:::

## 个人总结

对于 NoleBase Integration、VuePress-Hope-Theme Mdit-Enahcne 这两个近期接触的monorepo项目来说。

- 感觉monorepo在这里最大的优点是：依赖的统一，个别模块存在共用的东西
- 最大的缺点是：对只关注某些特定模块的贡献者来说，比较难受

其他优缺点我在这里感觉并不明显


