# 控件清单

给控件库工作区当需求来源。只登记本项目实际用到的控件：出现在哪、有哪些状态、多大尺寸、怎么交互。库的结构、API、打包和发布不在这份文档里。

## 范围

- 19 个组件（`src/components/`）、9 个页面（`src/views/`），样式在 `src/styles/` 的 11 个文件里，约 4000 行、568 条规则。
- 组件里没有 `<style scoped>`，类名都是全局的，而且没有前缀（`.btn`、`.dialog`、`.panel` 这类名字直接写在模板里）。
- 两套主题由 `html[data-theme="light"]` / `html[data-theme="dark"]` 切换，取值见 `TOKENS.md`。
- 指针类型写在 `html[data-pointer]`（`mouse` / `touch` / `pen`），用来区分触屏交互，例如任务行的隐藏按钮在触屏下不显示。
- 整页滚动，没有内部滚动容器；宽表格各自横向滚动。

## 通用约定

| 项目       | 取值                                                                    |
| ---------- | ----------------------------------------------------------------------- |
| 基础字号   | 15px / 1.55                                                             |
| 字体       | `PingFang SC, Microsoft YaHei, system-ui, -apple-system, sans-serif`    |
| 控件内间距 | 4 / 8 / 16px                                                            |
| 过渡       | 颜色、边框、背景 0.15s ease；对话框 0.16s；列表位移 0.22s；进度条 0.25s |
| 焦点样式   | 输入类只改边框颜色；按钮类用 `:focus-visible` 2px 描边、偏移 2px        |
| 减少动效   | `prefers-reduced-motion: reduce` 时关闭骨架屏动画、侧栏过渡和列表过渡   |

## 基础控件

### 按钮

- 47 处，变体有默认、`primary`（强调色）、`success`（绿色）、`ghost`（透明底）、`danger`（红字）、`ghost.active`（强调色底）、`primary.danger`（红底红字）。
- 常规尺寸 `padding: 8px 16px`、圆角 8px、字号 13px、1px 边框；侧栏表单里整宽（`padding: 8px 8px`）；导入页大按钮字号 16px、`padding: 16px`、圆角 10px、最小宽 168px。
- 悬停只改边框和文字颜色，带色的变体保持自身配色；没有自定义禁用样式，用浏览器默认表现。
- 样式在 `src/styles/controls.css:1-48`。

### 图标按钮

- 32×32 圆形（顶栏的主题、声音两个），1px 边框，图标用强调色；关闭态（`.is-off`）为次要文字色。
- 28×28 方形（式神统计页的重置、全屏），圆角 8px；`aria-pressed="true"` 时强调色底和边。
- 样式在 `src/styles/topbar.css:217-245`、`src/styles/board.css` 的 `.cultivation-actions`。

### 浮动按钮

- 44px 圆形（≤720px 为 40px），右侧对齐内容区外沿，底部 40px（≤720px 为 20px），带阴影。
- 悬停上移 2px 并换成强调色底；刷新中图标 0.8s 匀速旋转；有新版本时强调色边和底。
- 样式在 `src/styles/fab.css:1-83`。

### 文本输入

- 三种尺寸：紧凑（账号字段、式神字段）`padding: 4px 8px`、圆角 6px、字号 13px；标准（对话框、问答搜索）`padding: 8px 16px`、圆角 8px、字号 14px；行内表单 `padding: 8px 8px`、圆角 8px。
- 类型：文本、数字、日期、只读。数字框隐藏步进箭头；日期框数字等宽。
- 字段布局：左侧标签 + 输入框 + 可选的单位（强调色）或提示文字（11px 次要文字色）。
- 聚焦只把边框换成强调色，不加外发光；占位文字用次要文字色。
- 没有独立的错误态样式，错误信息通过消息气泡表达。
- 样式在 `src/styles/account.css:532-570`、`src/styles/controls.css:97-115`、`src/styles/content.css` 的 `.quiz-search`。

### 原生下拉

- 只用在账号关联一处，样式与紧凑输入框相同（`src/styles/account.css:538-560`）。

### 带选项的输入框

- 获得方式：可以自由输入，输入时按包含关系过滤选项，回车选中第一项，Esc 收起，点外部收起；右侧箭头按钮 `tabindex="-1"`，展开时箭头转 180°；没有匹配项时显示「无匹配选项」。
- 字段选择（趋势图）：触发器 + 菜单，右侧对齐，最小宽 168px，最高 320px；菜单项悬停为次级底色，选中为强调色底；「最近使用」是一排小盒子，右上角带移除按钮。
- 样式在 `src/styles/content.css:539-600`、`src/styles/trend.css:34-120`。

### 勾选框

- 任务勾选：`span[role="checkbox"]`，18×18，圆角 5px，1.5px 边框；选中为绿色底加对勾（深色对勾色，浅色主题为白色），部分完成为一条灰色横线；空格和回车都能切换；`aria-checked` 支持 `mixed`。
- 原生勾选：15×15，`accent-color` 用强调色（式神页、碎片挑选、统计页）。
- 键盘操作时出现 2px 强调色描边，偏移 2px。
- 样式在 `src/styles/workbench.css:435-482`，组件在 `src/components/TaskCheckbox.vue`。

### 色板单选

- 20×20 圆形，八种颜色，选中态用 `outline` 2px 描边、偏移 2px，`role="radio"`。
- 样式在 `src/styles/account.css` 的 `.tone-swatch`。

### 标签页

- 账号 Tab：胶囊，左侧 2px 色边，带角色数；选中为强调色底、边、字；「未关联」占一格。
- 顶栏导航：字号 16px，选中为强调色文字加 2px 下划线；二级菜单项是圆角 8px 的矩形，选中为强调色底。
- 样式在 `src/styles/account.css` 的 `.login-tabs`、`src/styles/topbar.css:87-190`。

### 浮层菜单

- 三处各写一套：导航二级菜单与触发器留 8px 间隙，鼠标从触发器移到菜单的途中不收起；字段菜单右对齐；获得方式菜单与输入框同宽。
- 共同样式：面板底色、1px 强边、8~10px 圆角、阴影、4~8px 内边距、菜单项 6~8px 圆角，悬停为次级底色，选中为强调色底。
- 样式在 `src/styles/topbar.css:134-190`、`src/styles/trend.css:47-120`、`src/styles/content.css:579-600`。

## 组合控件

### 对话框

- 骨架在 `src/components/AppWindow.vue`：传送到 `body`，遮罩 `rgba(6, 8, 12, 0.55)` 加 2px 模糊；点遮罩关闭，Esc 关闭，`aria-modal`；打开时焦点给带 `data-autofocus` 的元素，没有就给操作区第一个按钮；没有焦点陷阱。
- 尺寸：标准宽 `min(400px, 100%)`；管理列弹窗宽 `min(720px, 100%)`、高 `min(620px, calc(100dvh - 32px))`。
- 内容：标题 16px、正文保留换行、可选输入框、操作区右对齐、按钮间距 8px。
- 进场 0.16s：透明度变化加上移 8px、缩放 0.98。
- 确认框在 `src/components/AppDialog.vue`：Enter 确认（输入法组合中不响应）、Esc 取消、危险态确认键为红色。
- 样式在 `src/styles/controls.css:51-134`。

### 消息气泡

- 贴在触发元素的四边，箭头是 45° 的方块，位置对齐目标中心；贴视口边缘时自动收拢，箭头偏移也跟着夹住。
- 最大宽 `min(240px, calc(100vw - 16px))`，圆角 10px，字号 12px，不吃点击（`pointer-events: none`）。
- 可以定时自动收起；任意指针按下或按键立即收起；危险态为红边红字。
- 样式在 `src/styles/controls.css:136-211`，组件在 `src/components/MessageBubble.vue`。

### 进度条

- 高 8px，圆角 999px，1px 边框；填充是金色渐变（`#c9963a` 到强调色），宽度变化 0.25s。
- 样式在 `src/styles/workbench.css` 的 `.overview-bar`、`src/styles/backup.css` 的 `.backup-usage-bar`。

## 反馈与状态

### 骨架屏

- 六种形状：标题、胶囊、搜索条、圆点、行、卡片；底色渐变加 1.4s 横向扫光，减少动效时停止动画。
- 样式在 `src/styles/content.css:29-95`。

### 空状态与错误状态

- 虚线边框、圆角 12px、内边距 16px、居中、次要文字色；错误态换成红色文字和红色虚线边。
- 样式在 `src/styles/content.css:1-22`。

### 徽标

- 四种：圆角 6px 的胶囊（内边距 `1px 8px`，字号 12px，强调色）、圆角 4px 的小标签（`1px 8px`，字号 11px，蓝色）、圆角 999px 的状态标签（`2px 8px`，字号 12px）、圆角 999px 的小提示（`1px 8px`，字号 11px）。
- 颜色来自强调色、绿色、蓝色、红色四组。
- 样式在 `src/styles/account.css` 的 `.current-badge`、`src/styles/workbench.css` 的 `.task-flag` / `.repeat-tag` / `.activity-badge`、`src/styles/content.css` 的 `.collab-badge` / `.bowl-badge`。

### 可点击标签

- 胶囊，`padding: 4px 8px`，圆角 999px，字号 12px，右侧可带灰色计数（字号 11px）；选中为强调色底、边、字；悬停时边框变强调色。
- 33 处，用在式神页、碎片页、统计页的筛选栏。
- 样式在 `src/styles/content.css:249-280`。

## 数据展示

### 表格

- 表头和首列可以吸顶；单元格内边距 8px；数字等宽；可编辑的单元格悬停时给强调色底。
- 排序表头本身是按钮：点一次降序、再点升序、第三次恢复原顺序，排序标记只画在当前列。
- 样式在 `src/styles/board.css:17-190`、`src/styles/trend.css:276-314`。

### 折线图

- SVG 绘制，包含网格线、虚线辅助线、11px 坐标文字、2px 折线、数据点。
- 悬停显示日期和数值的小浮层；下方有时间段切换按钮。
- 样式在 `src/styles/trend.css:120-275`。

### 横向滚动容器

- 宽表格外层，内容超宽时可以按住横向拖动，光标在可拖动时为 `grab`、拖动中为 `grabbing`。
- 样式在 `src/styles/board.css` 的 `.shard-scroll`、`src/styles/trend.css` 的 `.detail-scroll`。

## 布局件

### 顶栏

- 吸顶，半透明底色加 10px 模糊；下方用一条 8px 的同底色条带填住和吸顶卡片之间的缝隙。
- 结构：品牌（54px 图标、标题、副标题）、主导航、日期胶囊、工具按钮。
- 样式在 `src/styles/topbar.css:1-86`。

### 侧栏

- 宽屏固定 162px 并吸顶，窄屏收成一条可以展开的抽屉；内部只有一个滚动区。
- 样式在 `src/styles/account.css:1-200`。

### 面板与卡片

- 面板：面板底色、1px 边框、圆角 12px、内边距 16px、阴影。
- 内容卡：次级面板底色、1px 边框、圆角 10px、内边距 16px；悬停边框加深；选中、完成、置灰各有状态。
- 样式在 `src/styles/workbench.css` 的 `.panel`、`src/styles/content.css:309-340`。

### 文件拖放区

- 拖入文件时整块出现提示层，铺满卡片，提示层里是加号和说明文字；用隐藏的原生文件输入框选择文件。
- 样式在 `src/styles/backup.css` 的 `.backup-drop-hint`，逻辑在 `src/views/BackupView.vue`。

### 全屏容器

- 用浏览器全屏 API，进全屏的是筛选栏加表格那一层；全屏时给底色和内边距。
- 样式在 `src/styles/board.css` 的 `.cultivation-full`，逻辑在 `src/components/CultivationMatrix.vue`。

## 暂不抽取

- 业务组件：`ShishenCard`、`ShardBoard`、`CultivationMatrix`、`ActivityCard`、`AccountSidebar`、`TaskList`、`ActivityTaskList`、`AssetManager`、`AccountManager`、`ShishenRoster`。它们依赖 `store`、配置和业务字段。
- 全局单例：`useDialog`、`useMessage`、`useStore`、`useConfig`。控件库不适合带这类状态。
- 运行时测量的布局：顶栏高度、胶囊高度、概览高度写进 CSS 变量，用来算吸顶位置和锚点偏移，属于页面布局，不属于控件。
- 路由、PWA、本地存储、音效、主题存储键 `yys:theme`。

## 本项目没有的控件

| 控件       | 现在的替代                                               |
| ---------- | -------------------------------------------------------- |
| 开关       | 图标按钮或 `ghost.active` 按钮加 `aria-pressed`          |
| 单选组     | 没有用原生单选；账号色调用 8 个圆形按钮加 `role="radio"` |
| 日期选择器 | 原生 `input[type="date"]`                                |
| 分页       | 问答页滚动到底部继续加载                                 |
| 通知横幅   | 消息气泡代替                                             |
| 抽屉       | 窄屏侧栏用高度过渡展开                                   |
| 通用浮层   | 导航菜单、字段菜单、获得方式菜单、趋势提示各写一套       |
| 上传组件   | 隐藏的原生文件输入框                                     |
| 树形控件   | 无                                                       |
| 步骤条     | 无                                                       |
