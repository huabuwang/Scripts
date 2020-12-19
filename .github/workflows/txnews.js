# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions
# push:
#   branches: 
#   - master 

name: 腾讯新闻

on:
  workflow_dispatch:
  schedule:
     - cron: '*/7 * * * *'
  watch:
     types: started
    
jobs:
  build:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    env:
      TXNEWS_SIGN: ${{ secrets.TXNEWS_SIGN }}
      TXNEWS_COOKIE: ${{ secrets.TXNEWS_COOKIE }}
      TXNEWS_VIDEO: ${{ secrets.TXNEWS_VIDEO }}
    steps:
      - name: Checkout
        run: |
          git clone https://github.com/Sunert/Scripts.git ~/Scripts
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - name: npm install
        run: |
          cd ~/Scripts
          npm install
      - name: '运行 【腾讯新闻】'
        if: env.TXNEWS_COOKIE
        run: |
          cd ~/Scripts
          node Task/txnews.js
        env:
          PUSH_KEY: ${{ secrets.PUSH_KEY }}
          BARK_PUSH: ${{ secrets.BARK_PUSH }}
          TXNEWS_NOTIFY_CONTROL: ${{ secrets.TXNEWS_NOTIFY_CONTROL }}
          TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
          TG_USER_ID: ${{ secrets.TG_USER_ID }}
          BARK_SOUND: ${{ secrets.BARK_SOUND }}
          DD_BOT_TOKEN: ${{ secrets.DD_BOT_TOKEN }}
          DD_BOT_SECRET: ${{ secrets.DD_BOT_SECRET }}
