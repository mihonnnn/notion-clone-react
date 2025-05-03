#!/bin/bash

# コミットメッセージの入力を求める
read -p "コミットメッセージを入力してください: " commit_message

# git add, commit, pushを実行
git add .
git commit -m "$commit_message"
git push

echo "プッシュが完了しました。"

# PRを作成するかどうかを確認
read -p "PRを作成しますか？ (y/n): " create_pr
if [ "$create_pr" = "y" ]; then
    # PRのタイトルを入力
    read -p "PRのタイトルを入力してください: " pr_title
    
    # PRの説明を入力
    read -p "PRの説明を入力してください: " pr_body
    
    # ベースブランチを入力（デフォルトはmain）
    read -p "ベースブランチを入力してください（デフォルト: main）: " base_branch
    base_branch=${base_branch:-main}
    
    # PRを作成
    gh pr create --title "$pr_title" --body "$pr_body" --base "$base_branch"
    
    echo "PRの作成が完了しました。"
fi 