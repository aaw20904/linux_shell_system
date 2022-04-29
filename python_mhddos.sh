#!/bin/bash
sudo apt update -y
sudo apt install --upgrade git -y
sudo apt install --upgrade python3 -y
sudo apt install --upgrade python3-pip -y
sudo rm -r mhddos_proxy  //если было установлено ранее

git clone https://github.com/porthole-ascend-cinnamon/mhddos_proxy.git
cd mhddos_proxy
sudo python3 -m pip install -r requirements.txt
