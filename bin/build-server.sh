#!/usr/bin/env bash

PKG_DIR=dist/trilium-linux-x64-server
NODE_VERSION=14.16.0

if [ "$1" != "DONTCOPY" ]
then
    ./bin/copy-trilium.sh $PKG_DIR
fi

cd dist
wget https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz
tar xvfJ node-v${NODE_VERSION}-linux-x64.tar.xz
rm node-v${NODE_VERSION}-linux-x64.tar.xz
cd ..

mv dist/node-v${NODE_VERSION}-linux-x64 $PKG_DIR/node

rm -r $PKG_DIR/node/lib/node_modules/npm
rm -r $PKG_DIR/node/include/node

rm -r $PKG_DIR/node_modules/electron*

cp -r bin/better-sqlite3/linux-server-better_sqlite3.node $PKG_DIR/node_modules/better-sqlite3/build/Release/better_sqlite3.node

printf "#!/bin/sh\n./node/bin/node src/www" > $PKG_DIR/trilium.sh
chmod 755 $PKG_DIR/trilium.sh

VERSION=`jq -r ".version" package.json`

cd dist

tar cJf trilium-linux-x64-server-${VERSION}.tar.xz trilium-linux-x64-server
