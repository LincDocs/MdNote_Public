# Kubernets

# 目录

# Kubernets

## 资料收集

- 官方资料（自带中文）
  - 官网文档：https://kubernetes.io/zh-cn/docs/home/
    - https://kubernetes.io/zh-cn/docs/tasks/tools/
- 中文文档（都挺不错的）
  - https://www.kubernetes.org.cn/k8s， （带评论）
  - https://kuboard.cn/learning/
  - https://kubernetes.io/zh-cn/docs/tutorials/kubernetes-basics/
  - [《Kubernetes 基础教程》](https://lib.jimmysong.io/kubernetes-handbook)
  - https://k8s.easydoc.net/docs/dRiQjyTY/28366845/6GiNOzyZ/9EX8Cp45
- 资料
- 视频（我觉得还是视频适合我入门，文档会提前涉及一些比较难的东西，挺绕）
  - https://www.bilibili.com/video/BV1DL4y187cL






















## 提前调研

GPT4

---

介绍 `Kubernetes集群`，有什么用，用来解决什么问题，介绍要通俗易懂

---

Kubernetes集群是一个可以用来运行容器化应用的平台。首先，来解释一下什么是容器化。当你有一个应用程序（比如一个网页服务，一个数据库，或者一个后台服务）要在不同的环境（比如开发，测试，生产环境）运行的时候，你可能会遇到一些麻烦。你的应用在一种环境下运行得好好的，但是在另一种环境下却出现问题。这是因为不同的环境下有不同的配置，比如操作系统版本，系统库，网络结构等等。

这时，容器就派上用场了。你可以把你的应用及其所有的依赖打包成一个容器，再运行这个容器。你的应用就会在这个容器内部的环境中运行，无论外部的环境如何变化，都不会影响容器内部的环境，从而解决了“在我电脑上运行得好好的”问题。

然后，当你有很多这样的应用需要运行，维护成本就会上来。你需要关注每个应用的状态，比如它是否在正确的运行，是否需要扩容以应对更大的访问压力，是否需要缩容以节约资源，如果一个应用挂了，你需要把它修好，如果一个应用的新版本发布了，你需要对它进行更新等等。这时，Kubernetes集群就派上用场了。

Kubernetes集群是一种可以自动管理和协调容器的系统。它可以帮你监控你的应用的运行状态，并根据需要自动扩容或者缩容，如果一个应用挂了，它可以自动把它修复，当新版本发布时，它可以帮你无缝更新，从而让你可以专注于应用的开发，而无需担心运维问题。这也是为什么大量的公司和组织都在使用Kubernetes集群的原因。

---

```
### Generic
### GKE
### AKS
### EKS
### OpenShift
### RKE
### k3s
### Alibaba ACK
```

这些是什么，与k8s分别有什么关系？

---

这些都是Kubernetes的不同版本或者是Kubernetes的托管服务，下面我逐一为你介绍：

1. **Generic**：这是指的通用的，开源版本的 Kubernetes，你可以在自己的硬件上去部署和维护它。 
2. **GKE**：Google Kubernetes Engine，是Google提供的托管Kubernetes服务。用户无需自己维护集群，由Google Cloud负责集群的创建、升级等操作。 
3. **AKS**：Azure Kubernetes Service，是Microsoft Azure提供的托管Kubernetes服务，与GKE类似，用户无需自己维护Kubernetes集群。 
4. **EKS**：Amazon Elastic Kubernetes Service，是Amazon Web Services (AWS)提供的托管Kubernetes服务。  
5. **OpenShift**：OpenShift是Red Hat的开源容器应用平台，基于Kubernetes，但在原生Kubernetes的基础上增加了许多开箱即用的功能。 
6. **RKE**：Rancher Kubernetes Engine，是由Rancher Labs开源的Kubernetes发行版本，专为Rancher平台优化。 
7. **k3s**：k3s是轻量级Kubernetes发行版，目标是在边缘计算环境中运行，由Rancher Labs开发和维护。 













TrafficMaster









































