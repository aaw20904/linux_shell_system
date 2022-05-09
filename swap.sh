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
