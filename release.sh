#! /bin/bash
name="saki-ui"
port=32300
branch="main"
allowMethods=("protos stop npmconfig install gitpull dockerremove start logs")


gitpull() {
  echo "-> 正在拉取远程仓库"
  git reset --hard
  git pull origin $branch
}

logs() {
  docker logs -f $name
}

start() {
  echo "-> 正在启动「${name}」服务"
  # gitpull

  echo "-> 正在准备相关资源"
  # 删除无用镜像
  docker rm $(docker ps -q -f status=exited)
  docker rmi -f $(docker images | grep '<none>' | awk '{print $3}')

  # 获取npm配置
  DIR=$(cd $(dirname $0) && pwd)
  cp -r ~/.npmrc $DIR

  echo "-> 准备构建Docker"
  docker build \
    -t $name . \
    -f Dockerfile.multi
  rm $DIR/.npmrc

  echo "-> 准备运行Docker"
  docker stop $name
  docker rm $name
  docker run \
    --name=$name \
    -p $port:$port \
    --restart=always \
    -d $name
}
stop() {
  docker stop $name
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
