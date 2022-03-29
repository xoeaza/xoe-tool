#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="oldEmail"
CORRECT_NAME="name"
CORRECT_EMAIL="newEmail"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags:

# 赋予执行权限 chmod +x email.sh
# 运行 ./email.sh
# 覆盖远端 git push origin --force --all
#         git push origin --force --tags