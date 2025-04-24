#! /bin/bash
name="saki-ui"
port=32300
version="v1.0.9"
branch="main"
DIR=$(cd $(dirname $0) && pwd)
allowMethods=("devBuild sh copyReactTypes buildReactTargetDir zip unzip removeBuildFile copyFile protos stop npmconfig install gitpull dockerremove start logs")

gitpull() {
  echo "-> 正在拉取远程仓库"
  git reset --hard
  git pull origin $branch
}

logs() {
  docker logs -f $name
}

setVersion() {
  echo "-> $version"
  sed -i "s/\"version\":.*$/\"version\":\"${version:1}\",/" ./package.json
}

copyFile() {
  yarn buildScss

  mkdir -p ./dist/saki-ui/css
  cp -r node_modules/quill/dist/quill.core.css ./dist/saki-ui/css
  cp -r node_modules/quill/dist/quill.snow.css ./dist/saki-ui/css
  cp -r node_modules/quill/dist/quill.bubble.css ./dist/saki-ui/css
  cp -r src/globals/cropper.css ./dist/saki-ui/css
  cp -r src/globals/base.css ./dist/saki-ui/css

  mkdir -p ./www/build/css
  cp -r src/globals/interaction.css ./www/build/css
  cp -r src/globals/common.css ./www/build/css
  cp -r node_modules/quill/dist/quill.core.css ./www/build/css
  cp -r node_modules/quill/dist/quill.snow.css ./www/build/css
  cp -r node_modules/quill/dist/quill.bubble.css ./www/build/css
  cp -r src/globals/cropper.css ./www/build/css
  cp -r src/globals/base.css ./www/build/css
  cp -r src/globals/interaction.css ./www/build/css
  cp -r src/globals/common.css ./www/build/css

  sed -i '1i\// @ts-nocheck' ./dist/react/react-component-lib/createOverlayComponent.tsx
  sed -i '1i\// @ts-nocheck' ./dist/react/react-component-lib/utils/index.tsx
}

copyReactTypes() {
  mkdir -p $DIR/dist/saki-ui-react/components
  cp -r ./dist/react/* ./dist/saki-ui-react/components
  cp -r ./dist/types ./dist/saki-ui-react
}

devBuild() {
  yarn build
  rm -rf /home/shiina_aiiko/Workspace/Development/@Aiiko/ShiinaAiikoDevWorkspace/@OpenSourceProject/meow-sticky-note/meow-sticky-note-client/public/saki-ui
  cp -r ./dist /home/shiina_aiiko/Workspace/Development/@Aiiko/ShiinaAiikoDevWorkspace/@OpenSourceProject/meow-sticky-note/meow-sticky-note-client/public/saki-ui
}

buildReactTargetDir() {
  # targetDir="../../game/killer-sudoku-nya/components"
  targetDir="../../nyanya/nyanya-toolbox/components"
  yarn build
  copyReactTypes
  # echo $targetDir"/saki-ui-react"

  rm -r $targetDir"/saki-ui-react"
  cp -r ./dist/saki-ui-react $targetDir
}

start() {
  setVersion

  echo "-> $version"
  sed -i "s/\"version\":.*$/\"version\":\"${version:1}\",/" ./package.json

  echo "-> 正在启动「${name}」服务"
  # gitpull

  echo "-> 正在准备相关资源"
  # 删除无用镜像
  docker rm $(docker ps -q -f status=exited)
  docker rmi -f $(docker images | grep '<none>' | awk '{print $3}')

  # 获取npm配置
  DIR=$(cd $(dirname $0) && pwd)
  cp -r ~/.npmrc $DIR
  cp -r ~/.yarnrc $DIR

  echo "-> 准备构建Docker"
  docker build \
    -t $name . \
    --network host \
    -f Dockerfile.multi

  rm $DIR/.npmrc
  rm $DIR/.yarnrc

  echo "-> 准备运行Docker"

  stop

  docker run \
    --name=$name \
    -p $port:$port \
    --restart=always \
    -d $name

  echo "-> 整理文件资源"

  rm $DIR/build/build_time_*

  docker cp $name:/dist/. $DIR/build
  rm -rf $DIR/build/saki-ui-react/types/
  mkdir -p $DIR/build/packages
  mv $DIR/build/saki-ui.tgz $DIR/build/packages/$name-$version.tgz
  mv $DIR/build/saki-ui-react.tgz $DIR/build/packages/$name-react-$version.tgz

  rm -rf $DIR/build/packages/$version
  mkdir -p $DIR/build/packages/$version

  tar -zxvf $DIR/build/packages/$name-$version.tgz \
    -C $DIR/build/packages/$version
  # tar -zxvf $DIR/build/packages/$name-react-$version.tgz -C ./build/packages/$version

  zip
  stop

  # rm -rf $DIR/build/* | egrep -v "($DIR/build/*.tgz)"
  # ls ./build/* | egrep -v '(./build/saki-ui-v1.0.1.tgz)'
  # rm -rf `ls ./build/* | egrep -v '(./build/packages)'`
  sh
}

sh() {
  ./ssh.sh run
  # rm -rf build.tgz

}

unzip() {
  tar -zxvf ./build.tgz -C ./
  rm -rf build.tgz
}

zip() {
  tar cvzf ./build.tgz -C ./ build
}

removeBuildFile() {
  # 暂时不删除文件，因为后续都采用版本化了
  mkdir -p $DIR/build/packages
  rm $DIR/build/build_time_*
  # for folderName in $(ls $DIR/build); do
  #   if [ "$folderName" != "packages" ]; then
  #     rm -rf $DIR/build/$folderName
  #   fi
  # done
}

stop() {
  docker stop $name
  docker rm $name
}

logs() {
  docker logs -f $name
}

main() {
  if echo "${allowMethods[@]}" | grep -wq "$1"; then
    "$1"
  else
    echo "Invalid command: $1"
  fi
}

main "$1"
