#!/bin/bash
sudo apt update -y
sleep 1
sudo apt install --upgrade git -y
sleep 1
sudo apt install --upgrade python3 -y
sleep 1
sudo apt install --upgrade python3-pip -y
sleep 1
sudo rm -r mhddos_proxy  //если было установлено ранее
sleep 1
git clone https://github.com/porthole-ascend-cinnamon/mhddos_proxy.git
sleep 1
cd mhddos_proxy
sleep 1
sudo python3 -m pip install -r requirements.txt
