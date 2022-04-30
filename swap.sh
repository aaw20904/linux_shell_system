#!/bin/bash
free -h
SLEEP 3
df -h
SLEEP 3
sudo fallocate -l 1G /swapfile
SLEEP 3
ls -lh /swapfile
SLEEP 3
sudo chmod 600 /swapfile
SLEEP 3
ls -lh /swapfile
SLEEP 3
sudo mkswap /swapfile
SLEEP 3
sudo swapon /swapfile
SLEEP 3
free -h
SLEEP 3
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
