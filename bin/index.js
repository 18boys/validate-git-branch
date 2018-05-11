#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const execSync = require("child_process").execSync;
const { log } = require('../lib/utils');

const workspaceRoot = process.cwd();
const branchName = execSync('git symbolic-ref --short -q HEAD').toString().trim();

function getConfig() {
  // 默认值
  const defaultPattern = "^20\\\\d{2}(10|11|12|(0\\\\d))(((0|1)\\\\d)|(30|31))-\\S";
  const defaultNote = "分支名字格式无效,有效的格式 日期+描述,如 20180512-add-dialog";

  const packageFolder = path.resolve(workspaceRoot, 'package.json');
  if (!packageFolder) {
    log('No package.json folder found', error);
    process.exit(-1);
  }
  const packageJson = JSON.parse(fs.readFileSync(packageFolder, 'utf8'));

  // 设置默认值
  let pattern;
  let helpMessage;
  let ignorePattern;
  let justWarnOnfail = false;
  if (!packageJson.config || !packageJson.config['validate-git-branch'] || !packageJson.config['validate-git-branch']['pattern']) {
    pattern = defaultPattern;
    helpMessage = defaultNote;
  } else {
    const config = packageJson.config['validate-git-branch'];
    pattern = config.pattern;
    helpMessage = config.helpMessage || "分支名字格式无效";
  }

  if (packageJson.config && packageJson.config['validate-git-branch'] && packageJson.config['validate-git-branch']['ignorePattern']) {
    ignorePattern = packageJson.config['validate-git-branch']['ignorePattern'];
  }

  if (packageJson.config && packageJson.config['validate-git-branch'] && packageJson.config['validate-git-branch']['justWarnOnfail']) {
    justWarnOnfail = packageJson.config['validate-git-branch']['justWarnOnfail'];
  }

  return {
    pattern, helpMessage, ignorePattern, justWarnOnfail
  }
}


function excute() {
  const { pattern, helpMessage, ignorePattern, justWarnOnfail } = getConfig();
  // 校验
  if (ignorePattern && new RegExp(ignorePattern).test(branchName)) {
    log('符合分支名称校验的例外规则', 'info');
    return;
  }
  const targetPattern = new RegExp(pattern);
  if (!targetPattern.test(branchName)) {

    if (!justWarnOnfail) {
      log(helpMessage, 'error');
      process.exit(-1);
    }
    log(helpMessage, 'warn');
    return;
  }
  log('分支名称校验通过', 'info');

}

excute();

