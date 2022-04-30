#!/bin/bash
sudo apt update -y
SLEEP 3
sudo apt install --upgrade git -y
SLEEP 3
sudo apt install --upgrade python3 -y
SLEEP 3
sudo apt install --upgrade python3-pip -y
SLEEP 3
sudo rm -r mhddos_proxy  //если было установлено ранее
SLEEP 3
git clone https://github.com/porthole-ascend-cinnamon/mhddos_proxy.git
SLEEP 3
cd mhddos_proxy
SLEEP 3
sudo python3 -m pip install -r requirements.txt
