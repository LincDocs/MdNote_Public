import{_ as s,c as i,a as t,d as n,f as e,b as r,o as a}from"./app-ChQY40fo.js";const o={};function d(c,l){return a(),i("div",null,[...l[0]||(l[0]=[t("h1",{id:"typora-plugin-分析",tabindex:"-1"},"Typora_plugin 分析",-1),t("p",null,[n("分析项目: "),t("a",{href:"https://github.com/obgnail/typora_plugin/",target:"_blank",rel:"noopener noreferrer"},"https://github.com/obgnail/typora_plugin/")],-1),t("p",null,"编写本文档时，使用 1.10.26 (笔者之前安装时的版本) / 1.19.8 (笔者编写文档时的最新版本) 版本",-1),t("h2",{id:"项目结构分析",tabindex:"-1"},"项目结构分析",-1),t("h3",{id:"项目结构",tabindex:"-1"},"项目结构",-1),t("div",{class:"ab-note drop-shadow"},[t("div",{class:"ab-list-table-parent"},[t("table",{class:"ab-table ab-list-table ab-table-folder"},[t("tbody",null,[t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"false",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 0
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"develop")]),t("td",{rowspan:"1"},[t("div",{class:"ab-list-table-witharrow markdown-rendered"},[t("div",null,[t("p",null,"编译项目，编译插件")])])])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"false",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 1
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"plugin")]),t("td",{rowspan:"1"},[t("div",{class:"ab-list-table-witharrow markdown-rendered"},[t("div",null,[t("p",null,"插件模块，包含许多不同的插件模块")])])])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"true",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 2
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"(配置类)")]),t("td",{rowspan:"1"},[t("div",{class:"ab-list-table-witharrow markdown-rendered"},[t("div",null,[t("p",null,"github 与 vscode 配置")])])])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:"editorconfig"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 3
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},".editorconfig")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 4
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},".github")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:"gitattributes"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 5
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},".gitattributes")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:"gitignore"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 6
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},".gitignore")])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"true",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 7
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"(文档类)")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 8
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"assets")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:"md"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 9
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"AGENTS.md")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:"md"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 10
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"README-cm.md")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:"md"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 11
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"README.md")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:`LICENSE
`},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 12
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"LICENSE")])])])]),t("button",{class:"ab-table-fold",is_fold:"false",onclick:`          const btn = this;
          const svgStr_fold = \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fold-vertical-icon lucide-fold-vertical"><path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3-3-3 3"/><path d="m15 5-3 3-3-3"/></svg>\`;
          const svgStr_unfold = \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-unfold-vertical-icon lucide-unfold-vertical"><path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3 3-3-3"/><path d="m15 5-3-3-3 3"/></svg>\`;
          const table = btn.parentNode?.querySelector("table");
          if (!table) return;
          
          const is_all_fold = btn.getAttribute("is_fold")
          if (is_all_fold=="true") {
            btn.setAttribute("is_fold", "false"); btn.innerHTML = svgStr_fold;
            const btn_subs = table.querySelectorAll("tr[is_fold='true']>td:first-child");
              btn_subs.forEach((btn_sub) => { btn_sub.click() }) // 注意setAttr版本无断言
          }
          else {
            btn.setAttribute("is_fold", "true"); btn.innerHTML = svgStr_unfold;
            const btn_subs = table.querySelectorAll("tr[is_fold='false']>td:first-child");
              btn_subs.forEach((btn_sub) => { btn_sub.click() }) // 注意setAttr版本无断言
          }`},[t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"lucide lucide-fold-vertical-icon lucide-fold-vertical"},[t("path",{d:"M12 22v-6"}),t("path",{d:"M12 8V2"}),t("path",{d:"M4 12H2"}),t("path",{d:"M10 12H8"}),t("path",{d:"M16 12h-2"}),t("path",{d:"M22 12h-2"}),t("path",{d:"m15 19-3-3-3 3"}),t("path",{d:"m15 5-3 3-3-3"})])])])],-1),t("h3",{id:"发布的压缩包结构",tabindex:"-1"},"发布的压缩包结构",-1),t("div",{class:"ab-note drop-shadow"},[t("div",{class:"ab-list-table-parent"},[t("table",{class:"ab-table ab-list-table ab-table-folder"},[t("tbody",null,[t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"false",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 0
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"assets")])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"true",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 1
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"plugin")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"true",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 2
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"bin")])]),t("tr",{class:"ab-foldable-tr",tr_level:"2",is_fold:"false",able_fold:"false",type:"sh      "},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 3
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"install_linux.sh")]),t("td",{rowspan:"1"},[t("div",{class:"ab-list-table-witharrow markdown-rendered"},[t("div",null,[t("p",null,"linux 使用")])])])]),t("tr",{class:"ab-foldable-tr",tr_level:"2",is_fold:"false",able_fold:"false",type:"install_linux_amd_x64"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 4
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"install_linux_amd_x64")])]),t("tr",{class:"ab-foldable-tr",tr_level:"2",is_fold:"false",able_fold:"false",type:"ps1   "},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 5
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"install_windows.ps1")]),t("td",{rowspan:"1"},[t("div",{class:"ab-list-table-witharrow markdown-rendered"},[t("div",null,[t("p",null,"windows 使用")])])])]),t("tr",{class:"ab-foldable-tr",tr_level:"2",is_fold:"false",able_fold:"false",type:"exe"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 6
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"install_windows_amd_x64.exe")])]),t("tr",{class:"ab-foldable-tr",tr_level:"2",is_fold:"false",able_fold:"false",type:"md"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 7
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"报毒了怎么办.md")])]),t("tr",{class:"ab-foldable-tr",tr_level:"2",is_fold:"false",able_fold:"false",type:""},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 8
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"...")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:""},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 9
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"...")])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"false",type:"gitignore"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 10
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},".gitignore")])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"false",type:"(文档类，他不应该)"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 11
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"(文档类，他不应该)")])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"false",type:"LICENSE"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 12
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"LICENSE")])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"false",type:`md
`},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 13
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"README.md")])])])]),t("button",{class:"ab-table-fold",is_fold:"false",onclick:`          const btn = this;
          const svgStr_fold = \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fold-vertical-icon lucide-fold-vertical"><path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3-3-3 3"/><path d="m15 5-3 3-3-3"/></svg>\`;
          const svgStr_unfold = \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-unfold-vertical-icon lucide-unfold-vertical"><path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3 3-3-3"/><path d="m15 5-3-3-3 3"/></svg>\`;
          const table = btn.parentNode?.querySelector("table");
          if (!table) return;
          
          const is_all_fold = btn.getAttribute("is_fold")
          if (is_all_fold=="true") {
            btn.setAttribute("is_fold", "false"); btn.innerHTML = svgStr_fold;
            const btn_subs = table.querySelectorAll("tr[is_fold='true']>td:first-child");
              btn_subs.forEach((btn_sub) => { btn_sub.click() }) // 注意setAttr版本无断言
          }
          else {
            btn.setAttribute("is_fold", "true"); btn.innerHTML = svgStr_unfold;
            const btn_subs = table.querySelectorAll("tr[is_fold='false']>td:first-child");
              btn_subs.forEach((btn_sub) => { btn_sub.click() }) // 注意setAttr版本无断言
          }`},[t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"lucide lucide-fold-vertical-icon lucide-fold-vertical"},[t("path",{d:"M12 22v-6"}),t("path",{d:"M12 8V2"}),t("path",{d:"M4 12H2"}),t("path",{d:"M10 12H8"}),t("path",{d:"M16 12h-2"}),t("path",{d:"M22 12h-2"}),t("path",{d:"m15 19-3-3-3 3"}),t("path",{d:"m15 5-3 3-3-3"})])])])],-1),t("h3",{id:"typora-原项目结构",tabindex:"-1"},"Typora 原项目结构",-1),t("p",null,"我们先来看看 Typora 安装后的原项目结构:",-1),t("div",{class:"ab-note drop-shadow"},[t("div",{class:"ab-list-table-parent"},[t("table",{class:"ab-table ab-list-table ab-table-folder"},[t("tbody",null,[t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"true",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 0
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"locales")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:"html"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 1
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"window.html")])]),t("tr",{class:"ab-foldable-tr",tr_level:"1",is_fold:"false",able_fold:"false",type:""},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 2
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"...")])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"false",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 3
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"resources")])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"false",type:"folder"},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 4
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"swiftshader")])]),t("tr",{class:"ab-foldable-tr",tr_level:"0",is_fold:"false",able_fold:"false",type:`
`},[t("td",{rowspan:"1",onclick:`            const tr = (this.tagName == "TD") ? this.parentNode : this
            const l_tr = tr.parentNode.querySelectorAll("tr")
            const i = 5
            
            const tr_level = Number(tr.getAttribute("tr_level"))
            if (isNaN(tr_level)) return
            const tr_isfold = tr.getAttribute("is_fold")
            if (!tr_isfold) return
            let flag_do_fold = false  // 防止折叠最小层
            for (let j=i+1; j<l_tr.length; j++){
              const tr2 = l_tr[j]
              const tr_level2 = Number(tr2.getAttribute("tr_level"))
              if (isNaN(tr_level2)) break
              if (tr_level2 <= tr_level) break // 影响所有后代级
              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)
              (tr_isfold == "true") ? tr2.style.display = "" : tr2.style.display = "none"
              flag_do_fold = true
            }
            if (flag_do_fold) tr.setAttribute("is_fold", tr_isfold=="true"?"false":"true")
          `},[t("div",{class:"ab-list-table-svg"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},[e("!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."),t("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"})])]),t("div",{class:"ab-list-table-witharrow"},"...")])])])]),t("button",{class:"ab-table-fold",is_fold:"false",onclick:`          const btn = this;
          const svgStr_fold = \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fold-vertical-icon lucide-fold-vertical"><path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3-3-3 3"/><path d="m15 5-3 3-3-3"/></svg>\`;
          const svgStr_unfold = \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-unfold-vertical-icon lucide-unfold-vertical"><path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3 3-3-3"/><path d="m15 5-3-3-3 3"/></svg>\`;
          const table = btn.parentNode?.querySelector("table");
          if (!table) return;
          
          const is_all_fold = btn.getAttribute("is_fold")
          if (is_all_fold=="true") {
            btn.setAttribute("is_fold", "false"); btn.innerHTML = svgStr_fold;
            const btn_subs = table.querySelectorAll("tr[is_fold='true']>td:first-child");
              btn_subs.forEach((btn_sub) => { btn_sub.click() }) // 注意setAttr版本无断言
          }
          else {
            btn.setAttribute("is_fold", "true"); btn.innerHTML = svgStr_unfold;
            const btn_subs = table.querySelectorAll("tr[is_fold='false']>td:first-child");
              btn_subs.forEach((btn_sub) => { btn_sub.click() }) // 注意setAttr版本无断言
          }`},[t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"lucide lucide-fold-vertical-icon lucide-fold-vertical"},[t("path",{d:"M12 22v-6"}),t("path",{d:"M12 8V2"}),t("path",{d:"M4 12H2"}),t("path",{d:"M10 12H8"}),t("path",{d:"M16 12h-2"}),t("path",{d:"M22 12h-2"}),t("path",{d:"m15 19-3-3-3 3"}),t("path",{d:"m15 5-3 3-3-3"})])])])],-1),r(`<h3 id="插件用法与原理" tabindex="-1">插件用法与原理</h3><p>Windows 中，插件的使用方法是:</p><ul><li>将发布的压缩包解压并替换到对应的位置 (包含 window.html 的目标文件夹) <ul><li>正式版 Typora 的相对路径为：./resources/</li><li>免费版 Typora 的相对路径为：./resources/app/</li></ul></li><li>运行该文件下的 <code>plugin/bin/install_windows.ps1</code></li></ul><p>脚本 (install_windows.ps1) 内容: (脚本已被添加中文注释与中文输出)</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-shell"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 计算 Typora 根目录。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 该脚本通常位于 Typora 安装目录下的 plugin/bin 中，</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 因此当前目录向上两级即为 Typora 根目录。</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$rootDir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = (</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Get-Location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).Path | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Split-Path</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -Parent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Split-Path</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -Parent</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># Typora 旧版本资源目录：app</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$appPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = Join-Path -Path </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$rootDir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> -ChildPath </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;app&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># Typora 新版本资源目录：appsrc</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$appsrcPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = Join-Path -Path </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$rootDir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> -ChildPath </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;appsrc&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># Typora 主页面文件 window.html</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$windowHTMLPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = Join-Path -Path </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$rootDir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> -ChildPath </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;window.html&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># window.html 的备份文件</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$windowHTMLBakPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = Join-Path -Path </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$rootDir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> -ChildPath </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;window.html.bak&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 需要注入到 window.html 中的插件脚本标签</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$pluginScript</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;&lt;script src=\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;./plugin/index.js</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot; defer=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;defer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;&gt;&lt;/script&gt;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 旧版本 window.html 中原本存在的 frame.js 脚本标签</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$oldFrameScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> = &quot;&lt;script src=\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;./app/window/frame.js</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot; defer=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;defer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;&gt;&lt;/script&gt;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 新版本 window.html 中原本存在的 frame.js 脚本标签</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$newFrameScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> = &quot;&lt;script src=\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;./appsrc/window/frame.js</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot; defer=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;defer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;&gt;&lt;/script&gt;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 实际需要匹配的 frame.js 脚本标签，会根据 Typora 版本决定</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$frameScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> = &quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 安装脚本 banner</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$banner</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> = @&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">____________________________________________________________________</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">   ______                                      __            _</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  /_  __/_  ______  ____  _________ _   ____  / /_  ______ _(_)___</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">   / / / / / / __ \\/ __ \\/ ___/ __ \`\`/  / __ \\/ / / / / __ \`\`/ / __ </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  / / / /_/ / /_/ / /_/ / /  / /_/ /  / /_/ / / /_/ / /_/ / / / / /</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /_/  \\__, / .___/\\____/_/   \\__,_/  / .___/_/\\__,_/\\__, /_/_/ /_/</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">     /____/_/                       /_/            /____/</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">                        Designed by obgnail</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">              https://github.com/obgnail/typora_plugin</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">____________________________________________________________________</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;@</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 输出消息后暂停，等待用户按键，然后退出脚本</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> finish</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> {[CmdletBinding()]param (</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$msg</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">) Write-Host </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$msg</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">PAUSE</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Exit}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 输出错误消息后暂停，等待用户按键，然后退出脚本</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> panic</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> {[CmdletBinding()]param (</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$msg</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">) Write-Error </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$msg</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">PAUSE</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Exit}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Write-Host</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $banner</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Write-Host</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># [1/5] 检查 window.html 是否存在</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Write-Host</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;[1/5] 检查文件 window.html 是否存在于 </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$rootDir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">!</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Test-Path</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -Path</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $windowHTMLPath</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">)) {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    panic</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;window.html 不存在于 </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$rootDir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># [2/5] 检查 app / appsrc 目录，并根据目录选择对应的 frame.js 脚本标签</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Write-Host</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;[2/5] 检查文件夹 app/appsrc 是否存在于 </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$rootDir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> (</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Test-Path</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -Path</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $appsrcPath</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    $frameScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> = </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$newFrameScript</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">} elseif (</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Test-Path</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -Path</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $appPath</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    $frameScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> = </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$oldFrameScript</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">} </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    panic</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;appsrc/app 不存在于 </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$rootDir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 读取 window.html 的原始内容</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$fileContent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> = Get-Content -Path </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$windowHTMLPath</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> -Encoding UTF8 -Raw</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 替换内容：保留原 frame.js 脚本标签，并在其后追加插件脚本标签</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$replacement</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> = -Join(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$frameScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$pluginScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># [3/5] 检查 window.html 内容</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Write-Host</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;[3/5] 检查 window.html 内容&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">!</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$fileContent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">.Contains(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$frameScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">)) {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    panic</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;window.html 中不包含：</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$frameScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">}</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$fileContent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">.Contains(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$pluginScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">)) {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    finish</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;插件已经安装，无需重复安装&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># [4/5] 备份 window.html</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Write-Host</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;[4/5] 备份 window.html&quot;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Copy-Item</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -Path</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $windowHTMLPath</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -Destination</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $windowHTMLBakPath</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># [5/5] 更新 window.html</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Write-Host</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;[5/5] 更新 window.html&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 将原 frame.js 脚本标签替换为：frame.js 脚本标签 + 插件脚本标签</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$newFileContent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> = </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$fileContent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> -Replace [Regex]::Escape(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$frameScript</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">), </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$replacement</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 将修改后的内容写回 window.html</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Set-Content</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -Path</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $windowHTMLPath</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -Value</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $newFileContent</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -Encoding</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> UTF8</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">finish</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;插件安装成功&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单概括就是找到 html 文件，在 <code>frame.js</code> 脚本标签的后面 追加一个引用自己的脚本的 <code>&lt;script&gt;</code> 标签。</p><h3 id="插件分类系统" tabindex="-1">插件分类系统</h3><p>obgnail/typora_plugin 的插件类别分为:</p><ul><li>导航与管理</li><li>编辑增强</li><li>组件</li><li>视图与主题</li><li>高级功能</li></ul><h2 id="贡献" tabindex="-1">贡献</h2><p>其插件的开发与项目无关，这点很好。</p><p>你只需要仿照已有插件来编写插件文件，然后放到项目的 <code>plugin/</code> 文件夹内并PR。</p><p>例如仿照 <a href="https://github.com/obgnail/typora_plugin/blob/master/plugin/chart/index.js" target="_blank" rel="noopener noreferrer">chart</a> 插件。</p><p>项目编译时，就会将插件一同编译起来。</p>`,14)])])}const f=s(o,[["render",d]]),h=JSON.parse('{"path":"/Unclassified/FrontEnd/Typora_plugin%20%E5%88%86%E6%9E%90.html","title":"Typora_plugin 分析","lang":"zh-CN","frontmatter":{"create_date":"2026-09-29T00:00:00.000Z","last_date":"2026-09-29T00:00:00.000Z","tags":["源码"],"description":"Typora_plugin 分析 分析项目: https://github.com/obgnail/typora_plugin/ 编写本文档时，使用 1.10.26 (笔者之前安装时的版本) / 1.19.8 (笔者编写文档时的最新版本) 版本 项目结构分析 项目结构 发布的压缩包结构 Typora 原项目结构 我们先来看看 Typora 安装后的原项...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Typora_plugin 分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://LincDocs.github.io/MdNote_Public/Unclassified/FrontEnd/Typora_plugin%20%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"MdNote_Public"}],["meta",{"property":"og:title","content":"Typora_plugin 分析"}],["meta",{"property":"og:description","content":"Typora_plugin 分析 分析项目: https://github.com/obgnail/typora_plugin/ 编写本文档时，使用 1.10.26 (笔者之前安装时的版本) / 1.19.8 (笔者编写文档时的最新版本) 版本 项目结构分析 项目结构 发布的压缩包结构 Typora 原项目结构 我们先来看看 Typora 安装后的原项..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"源码"}]],"tag":["源码"]},"git":{},"readingTime":{"minutes":3.44,"words":1033},"filePathRelative":"Unclassified/FrontEnd/Typora_plugin 分析.md","excerpt":"\\n<p>分析项目: <a href=\\"https://github.com/obgnail/typora_plugin/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/obgnail/typora_plugin/</a></p>\\n<p>编写本文档时，使用 1.10.26 (笔者之前安装时的版本) / 1.19.8 (笔者编写文档时的最新版本) 版本</p>\\n<h2>项目结构分析</h2>\\n<h3>项目结构</h3>\\n<div class=\\"ab-note drop-shadow\\"><div class=\\"ab-list-table-parent\\"><table class=\\"ab-table ab-list-table ab-table-folder\\"><tbody><tr class=\\"ab-foldable-tr\\" tr_level=\\"0\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"folder\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 0\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">develop</div></td><td rowspan=\\"1\\"><div class=\\"ab-list-table-witharrow markdown-rendered\\"><div><p>编译项目，编译插件</p>\\n</div></div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"0\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"folder\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 1\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">plugin</div></td><td rowspan=\\"1\\"><div class=\\"ab-list-table-witharrow markdown-rendered\\"><div><p>插件模块，包含许多不同的插件模块</p>\\n</div></div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"0\\" is_fold=\\"false\\" able_fold=\\"true\\" type=\\"folder\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 2\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">(配置类)</div></td><td rowspan=\\"1\\"><div class=\\"ab-list-table-witharrow markdown-rendered\\"><div><p>github 与 vscode 配置</p>\\n</div></div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"1\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"editorconfig\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 3\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 384 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">.editorconfig</div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"1\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"folder\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 4\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">.github</div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"1\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"gitattributes\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 5\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 384 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">.gitattributes</div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"1\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"gitignore\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 6\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 384 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">.gitignore</div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"0\\" is_fold=\\"false\\" able_fold=\\"true\\" type=\\"folder\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 7\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">(文档类)</div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"1\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"folder\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 8\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">assets</div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"1\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"md\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 9\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 384 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">AGENTS.md</div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"1\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"md\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 10\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 384 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">README-cm.md</div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"1\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"md\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 11\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 384 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">README.md</div></td></tr><tr class=\\"ab-foldable-tr\\" tr_level=\\"1\\" is_fold=\\"false\\" able_fold=\\"false\\" type=\\"LICENSE\\n\\"><td rowspan=\\"1\\" onclick=\\"            const tr = (this.tagName == &quot;TD&quot;) ? this.parentNode : this\\n            const l_tr = tr.parentNode.querySelectorAll(&quot;tr&quot;)\\n            const i = 12\\n            \\n            const tr_level = Number(tr.getAttribute(&quot;tr_level&quot;))\\n            if (isNaN(tr_level)) return\\n            const tr_isfold = tr.getAttribute(&quot;is_fold&quot;)\\n            if (!tr_isfold) return\\n            let flag_do_fold = false  // 防止折叠最小层\\n            for (let j=i+1; j<l_tr.length; j++){\\n              const tr2 = l_tr[j]\\n              const tr_level2 = Number(tr2.getAttribute(&quot;tr_level&quot;))\\n              if (isNaN(tr_level2)) break\\n              if (tr_level2 <= tr_level) break // 影响所有后代级\\n              // if (tr_level2 != tr_level+1) break // 影响下一级的 (话说这里可能有列表规范性问题?)\\n              (tr_isfold == &quot;true&quot;) ? tr2.style.display = &quot;&quot; : tr2.style.display = &quot;none&quot;\\n              flag_do_fold = true\\n            }\\n            if (flag_do_fold) tr.setAttribute(&quot;is_fold&quot;, tr_isfold==&quot;true&quot;?&quot;false&quot;:&quot;true&quot;)\\n          \\"><div class=\\"ab-list-table-svg\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 384 512\\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\\"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z\\"/></svg></div><div class=\\"ab-list-table-witharrow\\">LICENSE</div></td></tr></tbody></table><button class=\\"ab-table-fold\\" is_fold=\\"false\\" onclick=\\"          const btn = this;\\n          const svgStr_fold = `<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;24&quot; height=&quot;24&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; class=&quot;lucide lucide-fold-vertical-icon lucide-fold-vertical&quot;><path d=&quot;M12 22v-6&quot;/><path d=&quot;M12 8V2&quot;/><path d=&quot;M4 12H2&quot;/><path d=&quot;M10 12H8&quot;/><path d=&quot;M16 12h-2&quot;/><path d=&quot;M22 12h-2&quot;/><path d=&quot;m15 19-3-3-3 3&quot;/><path d=&quot;m15 5-3 3-3-3&quot;/></svg>`;\\n          const svgStr_unfold = `<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;24&quot; height=&quot;24&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; class=&quot;lucide lucide-unfold-vertical-icon lucide-unfold-vertical&quot;><path d=&quot;M12 22v-6&quot;/><path d=&quot;M12 8V2&quot;/><path d=&quot;M4 12H2&quot;/><path d=&quot;M10 12H8&quot;/><path d=&quot;M16 12h-2&quot;/><path d=&quot;M22 12h-2&quot;/><path d=&quot;m15 19-3 3-3-3&quot;/><path d=&quot;m15 5-3-3-3 3&quot;/></svg>`;\\n          const table = btn.parentNode?.querySelector(&quot;table&quot;);\\n          if (!table) return;\\n          \\n          const is_all_fold = btn.getAttribute(&quot;is_fold&quot;)\\n          if (is_all_fold==&quot;true&quot;) {\\n            btn.setAttribute(&quot;is_fold&quot;, &quot;false&quot;); btn.innerHTML = svgStr_fold;\\n            const btn_subs = table.querySelectorAll(&quot;tr[is_fold=\'true\']>td:first-child&quot;);\\n              btn_subs.forEach((btn_sub) => { btn_sub.click() }) // 注意setAttr版本无断言\\n          }\\n          else {\\n            btn.setAttribute(&quot;is_fold&quot;, &quot;true&quot;); btn.innerHTML = svgStr_unfold;\\n            const btn_subs = table.querySelectorAll(&quot;tr[is_fold=\'false\']>td:first-child&quot;);\\n              btn_subs.forEach((btn_sub) => { btn_sub.click() }) // 注意setAttr版本无断言\\n          }\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" class=\\"lucide lucide-fold-vertical-icon lucide-fold-vertical\\"><path d=\\"M12 22v-6\\"/><path d=\\"M12 8V2\\"/><path d=\\"M4 12H2\\"/><path d=\\"M10 12H8\\"/><path d=\\"M16 12h-2\\"/><path d=\\"M22 12h-2\\"/><path d=\\"m15 19-3-3-3 3\\"/><path d=\\"m15 5-3 3-3-3\\"/></svg></button></div></div>","autoDesc":true,"bioChainData":{"outlink":[],"backlink":[],"localMap":{"nodes":[{"id":"Unclassified/FrontEnd/Typora_plugin 分析.md","value":{"title":"Typora_plugin 分析","path":"Unclassified/FrontEnd/Typora_plugin 分析.md","outlink":[],"backlink":[]}}],"links":[]}}}');export{f as comp,h as data};
