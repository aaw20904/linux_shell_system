#!/bin/bash
free -h
SLEEP 1
df -h
SLEEP 1
sudo fallocate -l 1G /swapfile
SLEEP 1
ls -lh /swapfile
SLEEP 1
sudo chmod 600 /swapfile
SLEEP 1
ls -lh /swapfile
SLEEP 1
sudo mkswap /swapfile
SLEEP 1
sudo swapon /swapfile
SLEEP 1
free -h
SLEEP 1
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
