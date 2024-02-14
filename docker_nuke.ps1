docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q) -f
docker rmi $(docker images -q 'docker_video_streaming*')
