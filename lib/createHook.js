#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { log } = require('../lib/utils');

const disabledBranchValidate = !!process.env.disabledBranchValidate;
if(disabledBranchValidate){
  log('项目设置分支校验不起作用,现在不生成git校验 hook!','warn');
  return;
}
log('disabledBranchValidate没有设置或者已经设置为 false,现在开始生成git校验 hook!','info');

const workspaceRoot = process.cwd();
// 看看是否已经有对用 hook 的文件,没有则直接新建软连接 有的话备份一下,然后再创建
// 软连接
const tartget = process.argv[2] || 'pre-push'; // 默认是在 pre-push 钩子中做分支号的校验
const hookFile = path.join(workspaceRoot, '../../.git/hooks', tartget);
const targetBin = path.join(workspaceRoot, '../../node_modules/.bin/validate-git-branch')
if (fs.existsSync(hookFile)) {
  fs.renameSync(hookFile, "target.backup");
}
try {
  fs.unlinkSync(hookFile);
} catch(err) {
  // handle the error
}

fs.symlinkSync(targetBin, hookFile);


