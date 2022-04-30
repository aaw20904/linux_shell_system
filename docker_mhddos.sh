 #!/bin/bash
 sudo apt update
 SLEEP 2
sudo apt install -y docker.io
SLEEP 2
sudo systemctl enable docker --now
SLEEP 2
docker
SLEEP 2
sudo usermod -aG docker $USER
SLEEP 2
printf '%s\n' "deb https://download.docker.com/linux/debian bullseye stable" | sudo tee /etc/apt/sources.list.d/docker-ce.list ; curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-ce-archive-keyring.gpg
 SLEEP 2
 sudo apt update
SLEEP 2
sudo apt install -y docker-ce docker-ce-cli containerd.io
SLEEP 2
sudo systemctl unmask docker.service
SLEEP 2
sudo systemctl unmask docker.socket
SLEEP 2
sudo systemctl start docker.service
SLEEP 2
sudo chmod 666 /var/run/docker.sock
SLEEP 2
 sudo docker run hello-world
