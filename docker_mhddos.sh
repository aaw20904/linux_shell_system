 #!/bin/bash
 
 sudo apt update
sleep 10
sudo apt install -y docker.io
sleep 10
sudo systemctl enable docker --now
sleep 10
docker
sleep 10
sudo usermod -aG docker $USER
sleep 10
printf '%s\n' "deb https://download.docker.com/linux/debian bullseye stable" | sudo tee /etc/apt/sources.list.d/docker-ce.list ; curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-ce-archive-keyring.gpg
sleep 10
 sudo apt update
sleep 10
sudo apt install -y docker-ce docker-ce-cli containerd.io
sleep 10
sudo systemctl unmask docker.service
sleep 10
sudo systemctl unmask docker.socket
sleep 10
sudo systemctl start docker.service
sleep 10
sudo chmod 666 /var/run/docker.sock
sleep 10
 sudo docker run hello-world
