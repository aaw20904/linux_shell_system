
#! /bin/bash
echo "docker run -d -it --rm --pull always --net=host ghcr.io/porthole-ascend-cinnamon/mhddos_proxy -t 500 --lang UA" >> attackd.sh
sudo chmod 777 attackd.sh
echo "docker run  -it --rm --pull always --net=host ghcr.io/porthole-ascend-cinnamon/mhddos_proxy -t 500 --lang UA" >> attack.sh
sudo chmod 777 attack.sh
