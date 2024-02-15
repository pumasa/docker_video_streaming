docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q) -f
docker rmi $(docker images -q 'docker_video_streaming*')

$UserInput = Read-Host "Nuke volume? [y/n]"
if ($UserInput -eq "y") {
  docker volume rm docker_video_streaming_shared_volume -f
}
