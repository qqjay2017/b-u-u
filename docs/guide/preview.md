# 组件预览配置

组件文档页面右侧内嵌了一个手机模拟器，通过 iframe 加载 H5 demo 站点，实现**文档与实时预览并排展示**。

## 工作原理

当访问组件文档页面（如 `/component/button`）时，自定义 Layout 会在页面右侧渲染一个手机外壳，内部的 iframe 自动指向对应的 H5 demo 页面。

### 路由自动推导

iframe 的地址根据当前 VitePress 路由**自动推导**，无需手动配置：

| 文档路由 | iframe 地址 |
|---------|------------|
| `/component/button` | `{simulatorUrl}/#/pages/button/index` |
| `/component/input` | `{simulatorUrl}/#/pages/input/index` |
| `/component/toast` | `{simulatorUrl}/#/pages/toast/index` |

**推导规则**：`/component/{name}` → `{simulatorUrl}/#/pages/{name}/index`

这要求 H5 demo 的页面路径与组件名称保持一致。例如新增一个 `input` 组件时，需要在 `src/pages.json` 中添加对应的 demo 页面：

```json
{
  "path": "pages/input/index",
  "style": {
    "navigationBarTitleText": "Input 输入框"
  }
}
```

## 配置 H5 基础 URL

iframe 的基础地址通过 VitePress 的 `themeConfig.simulatorUrl` 配置：

```ts
// docs/.vitepress/config.mts
export default defineConfig({
  themeConfig: {
    simulatorUrl: 'http://localhost:5173', // H5 dev server 地址
  },
})
```

### 优先级

地址的解析优先级从高到低为：

1. **页面 frontmatter** — 在组件文档 markdown 顶部指定 `simulatorUrl`，适用于需要覆盖默认地址的场景
2. **themeConfig.simulatorUrl** — 全局配置，通常指向 H5 dev server
3. **默认值** — `http://localhost:5173`

使用 frontmatter 覆盖的示例：

```md
---
simulatorUrl: https://your-deployed-h5.example.com
---

# Button 按钮
```

## H5 Demo 路由映射

H5 demo 的路由在 `src/pages.json` 中配置。每个组件对应一个 demo 页面：

```
src/pages/
├── index.vue              # 首页（组件导航列表）
├── button/
│   └── index.vue          # Button 组件 demo
├── input/
│   └── index.vue          # Input 组件 demo（示例）
└── ...
```

`pages.json` 中的配置：

```json
{
  "pages": [
    {
      "path": "pages/index",
      "type": "home",
      "style": { "navigationBarTitleText": "Battery UI" }
    },
    {
      "path": "pages/button/index",
      "style": { "navigationBarTitleText": "Button 按钮" }
    }
  ]
}
```

## 本地开发

开发时需要同时启动两个服务：

```bash
# 终端 1：启动 H5 demo（端口 5173）
pnpm dev:h5

# 终端 2：启动 VitePress 文档（端口 5174）
pnpm docs:dev
```

打开 `http://localhost:5174/component/button` 即可看到左侧文档 + 右侧手机模拟器预览。

## 新增组件的完整流程

以新增 `Input` 组件为例：

1. **创建 demo 页面** — `src/pages/input/index.vue`
2. **注册路由** — 在 `src/pages.json` 中添加 `pages/input/index`
3. **编写组件文档** — `docs/component/input.md`
4. **注册文档路由** — 在 `docs/.vitepress/config.mts` 的 sidebar 中添加链接

完成后访问 `/component/input`，右侧模拟器会自动加载 `http://localhost:5173/#/pages/input/index`。

## 响应式行为

- **宽屏（≥ 1440px）**：文档与手机模拟器并排显示
- **窄屏（< 1440px）**：手机模拟器自动隐藏，仅显示文档内容
