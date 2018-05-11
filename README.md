# validate-git-branch
git 分支约束校验<br>
Simple git branch name validate

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

## Note  配置说明
```

参数 | 功能 | 是否必须 | 默认值
---- | --- |---- | ---
pattern | 分支需要满足的规则,为正则表达式 |  非必填  | ^20\\d{2}(10|11|12|(0\\d))(((0|1)\\d)|(30|31))-\S
ignorePattern | 分支如果满足此正则,就不受 pattern的影响,可用于分支校验的例外场景 |  非必填  | 无
helpMessage | 不满足 pattern的时候,错误提示语 |  非必填  | 分支名字格式无效,有效的格式 日期+描述,如 20180512-add-dialog
justWarnOnfail | 不满足校验的时候还是可以提交 仅仅 warn提示错误 |  非必填  | false
```


## License 证书

This software is licensed under the MIT license
