#!/bin/bash

# コミットメッセージの入力を求める
read -p "コミットメッセージを入力してください: " commit_message

# git add, commit, pushを実行
git add .
git commit -m "$commit_message"
git push

echo "プッシュが完了しました。" 