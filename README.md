# validate-git-branch"
Simple git branch name validate
git 分支校验

## Installation 安装

```
npm install validate-git-branch --save-dev
```

## Config 配置

```
{
  …
  "config": {
   "validate-git-branch": {
         "pattern": "^20\\d{2}(10|11|12|(0\\d))(((0|1)\\d)|(30|31))-aaaa-\\d{1,4}-\\S+$",
         "ignorePattern": "bbb",
         "helpMessage": "推送的分支名称格式不正确,正确的格式是日期+jira+描述,如20180512-aaa-1234-add-dialog",
         "justWarnOnfail": true
    }
  }
  …
}
```

# Note  配置说明
pattern: 分支需要满足的正则表达
ignorePattern: 分支如果满足此正则,就不受 pattern的影响
helpMessage: 不满足 pattern的时候,错误提示语
justWarnOnfail: 不满足校验的时候还是可以提交 仅仅 warn提示错误

## License 证书

This software is licensed under the MIT license
