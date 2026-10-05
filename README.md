# csv-chart-gen

CSV → 图表单页应用。粘贴 CSV，纯前端 JS 生成柱状/折线/饼图（SVG），可切换类别列、数值列与图型。单 HTML 文件、零依赖。

## 快速开始

直接用浏览器打开 `index.html`，或：

```bash
open index.html        # macOS
xdg-open index.html    # Linux
```

在文本框粘贴 CSV（首行表头），选择列与图型，点「绘制」。

## 功能

- 解析 CSV 表头与数据行；
- 按类别列分组求和数值列；
- 柱状图 / 折线图 / 饼图，纯 SVG 绘制；
- 全部本地运行，无需联网与后端。

## 测试（Node 断言）

```bash
node tests/test.js
```

验证 CSV 表头/行解析、按类别分组求和聚合。

## 目录结构

```
csv-chart-gen/
├── index.html      # 单页应用（HTML+CSS+JS 内联）
├── tests/test.js   # Node 断言
├── README.md / LICENSE
```

## 许可证

[MIT](./LICENSE)
