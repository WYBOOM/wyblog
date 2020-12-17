#!/bin/bash
WEB_PATH='/html/www/wyblog'


echo "开始执行shell"
cd $WEB_PATH
echo "pulling source code..."
git pull
echo "changing permissions..."
#chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
echo " git pull 完成. 开始 build"
cd admin/
npm run build
echo "build 完成"
