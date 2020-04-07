
# 工作中的git操作
 

#### 常用 git 指令

| 指令| 说明|
| :------ | :-------------------------------- |
| git status | 查看当前分支的 code status|
| git add `.` | 将文件操作保存进暂存区|
| git commit -m `'your commit's message'` | 给当前提交的 package 添加描述信息|
| git push origin `branch-name` | 将 本地分支 缓存区 code change 提交到远程分支 |
| git branch -a | 查看仓储下的全部分支 |
| git branch `branch-name` | 创建本地仓储分支 |
| git checkout `branch-name` | 切换到本地仓储分支 |
| git pull origin `branch-name` | 拉取远程仓储某分支的 code change并自动合并到本地当前分支 |
| git merge `branch-name`|  将某个分支的 code change 合并到当前分支 |
| git stash save `"your stash's message"`|暂时存储 本地分支 code change 进暂存区|
| git stash list | 查看 stash 列表|
| git stash pop | 将暂存区最近1个 stash 合并到当前分支 |
| git stash clear | 清空暂存区的 stash |

#### 不常用 git 指令

| 指令| 说明|
| :------ | :-------------------------------- |
| git fetch origin master:`branch-name，如:tmp`| 从远程 maste 分支 获取最新版本到本地 tmp 分支 |
| git diff `branch-name，如:tmp`| 当前本地分支 与 本地 tmp 分支进行比较 |
| git checkout `.`| 将当前分支缓存区外的code change全部撤销，返回上1个缓存区的状态 |
| git log | 查看当前分支下的 commit list|
| git reset `file-name`| 将已经放入缓存区的文件 移出 缓存区 |
| git reset `commit-id` --hard| 回滚到此 commit id提交后的状态 --hard不保存变更,--soft保留且处于staged,--mixed保留且处于Modified |
| git reflog| 查看全部的 commit 操作记录  (commit id 短的，显示前7位) |
| git rebase `branch-name`| 变基，主要用在基于相同模板的但是更有不通的以最新的 master 分支的 commit 流为基准，不断merge 当前分支后的 commit |
| git rebase --continue| 变基的冲突 add 进入暂存区后，继续后面的 rebase commit 操作|




#### 记一次恢复代码 灾难

> 有1次新入职组员晕乎乎的，只提了 commit 没有 push，然后还把本地分支删了！没错，删了！怎么才能把代码重新弄回来呢?

+ 1 切换开发分支
+ 2 通过 `git reflog` 找到 短 `commit id`
+ 3 git reset `commit-id` --mixed 
+ 4 解决冲突后 常规操作 add commit push
