#!/bin/bash
sudo apt update -y
SLEEP 1
sudo apt install --upgrade git -y
SLEEP 1
sudo apt install --upgrade python3 -y
SLEEP 1
sudo apt install --upgrade python3-pip -y
SLEEP 1
sudo rm -r mhddos_proxy  //если было установлено ранее
SLEEP 1
git clone https://github.com/porthole-ascend-cinnamon/mhddos_proxy.git
SLEEP 1
cd mhddos_proxy
SLEEP 1
sudo python3 -m pip install -r requirements.txt
