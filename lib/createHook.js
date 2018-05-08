#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const workspaceRoot = process.cwd();
// 看看是否已经有对用 hook 的文件,没有则直接新建软连接 有的话备份一下,然后再创建
// 软连接
const tartget = process.argv[2] || 'pre-push'; // 默认是在 pre-push 钩子中做分支号的校验
const hookFile = path.join(workspaceRoot, '.git', 'hooks', tartget);
const targetBin = path.join(workspaceRoot, '/node_modules/.bin/validate-git-branch')
if (fs.existsSync(hookFile)) {
  fs.renameSync(hookFile, "target.backup");
}
fs.unlinkSync(hookFile);
fs.symlinkSync(targetBin, hookFile);

