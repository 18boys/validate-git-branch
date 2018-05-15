# validate-git-branch
git 分支约束校验<br>
Simple git branch name validate

## Installation 安装

```
#建议使用--save-dev 来安装devDependence 下,同时注意在先线上打包的安装的时候npm install 加上--production的参数来避免在线上打包的时候也生效
#如果因为某些原因不能加--prodution 参数,那么也可以加上disabledBranchValidate=true的环境变量来使此校验无效,详情参见 #Note
npm install validate-git-branch --save-dev

```

## Note 注意
如果由于某些原因,必须要安装此包,但是又不想让其校验分支,可以设置 node或者 shell(比如说 jenkins 打包脚本)设置环境变量
来让此包安装但不执行

```
#在 shell 脚本中
export disabledBranchValidate=true

#或者在 node 运行环境
disabledBranchValidate=true npm install

#或者在 node 环境通过cross-env设置环境变量
{
  "scripts": {
    "build": "cross-env disabledBranchValidate=true npm run childScript",
  }
}

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
    },
  },
  …
}
```

## Note  配置说明

参数 | 功能 | 是否必须 | 默认值
:--: | :--: |:--: | :-------:
pattern | 分支需要满足的规则,为正则表达式 |  非必填  | ^20\\d{2}(10\|11\|12\|(0\\d))(((0\|1)\\d)\|(30\|31))-\S
ignorePattern | 分支如果满足此正则,就不受 pattern的影响,可用于分支校验的例外场景 |  非必填  | 无
helpMessage | 不满足 pattern的时候,错误提示语 |  非必填  | 分支名字格式无效,有效的格式 日期+描述,如 20180512-add-dialog
justWarnOnfail | 不满足校验的时候还是可以提交 仅仅 warn提示错误 |  非必填  | false



## License 证书

This software is licensed under the MIT license
