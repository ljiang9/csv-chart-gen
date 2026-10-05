// Node 断言测试：用最小 DOM 桩加载 index.html 中的脚本，验证 CSV 解析与聚合。
// 运行：node tests/test.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

const csv = `月份,销售额,利润
1月,120,30
1月,80,20
2月,200,55`;

function el() {
  return { value: "", innerHTML: "", selectedIndex: 0,
           addEventListener() {} };
}
const document = {
  getElementById: (id) => {
    document._els = document._els || {};
    if (!document._els[id]) {
      document._els[id] = el();
      if (id === "csv") document._els[id].value = csv;
    }
    return document._els[id];
  },
};

const sandbox = { document, module: { exports: {} }, console };
vm.createContext(sandbox);
vm.runInContext(script, sandbox);

let pass = 0, fail = 0;
function assert(cond, msg) {
  if (cond) { pass++; console.log("  ok -", msg); }
  else { fail++; console.error("  FAIL -", msg); }
}

const { parseCSV, aggregate } = sandbox.module.exports || sandbox;
const parsed = parseCSV(csv);
assert(parsed.headers.join(",") === "月份,销售额,利润", "解析表头");
assert(parsed.rows.length === 3, "解析数据行数");
assert(parsed.rows[0]["月份"] === "1月", "首行类别列");

const sums = vm.runInContext("aggregate('月份','销售额')", sandbox);
assert(sums.length === 2, "按类别聚合后类别数=2");
const jan = sums.find(s => s.label === "1月");
assert(jan && jan.value === 200, "1月销售额求和=200 (120+80)");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
