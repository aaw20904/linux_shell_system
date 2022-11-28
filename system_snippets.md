
#### *******SSH CONNECTION**********
//for the access from the VS Code and other applications-
// you can:
// A) create an asymmetric ssh - key:
// run on the CLIENT mashine (who will have been coonecting to the remote server) as Admin in the terminal - :-

	**ssh-keygen**:-
	
// enter a filename (for example mykey.key), and  password:-
//after generation - there will be TWO files: 'mykey.key' - (a private key) 'mykey.key.pub' - (a public key):-

// B) Open the remote server - a file  /userName/.ssh/authorized_keys:-
// c) Insert on the new string a content of file 'mykey.key.pub' - the public key:-
// d) Test a connection - in the VS Code open a file /.ssh/config and create a new connection::-
 
      **Host remote_cloud:-
  HostName 18.134.157.188:-
  User ubuntu:-
  IdentityFile d:\aws\xone.key **:-
 
  E) OPTIONAL - test a connection from the  Power Shell as Administrator:
   ** ssh -i d:/aws/xone.key  ubuntu@18.134.157.188**:-
  
### ****M Y   S Q L****  SECURE INSTALLATION *****
        check a status of the service::-
**$ sudo systemctl status mysql:-
	after installation START the service::-
$ sudo systemctl start mysql.service:-
$ sudo mysql**:-
/*Run the following SQL query:*/:-
	**ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SetRootPasswordHere';:-
	exit**:-
/*after it you can install*/:-
	**$ sudo mysql_secure_installation**:-
/*LOG IN in MYsql*/:-
	**$ sudo mysql -u root -p**:-

#### MYSQL REMOTE ACCESS :-
//for the begin, allow remote access.:-
//To do it - open the file :-
     /etc/mysql/mysql.conf.d/mysqld.cnf :-
..and change the string::-
 
	**bind-address            = 127.0.0.1**:-

to allow access from anywhere - type 0.0.0.0 instead of 127.0.0.1:-
restart:-
	**$ sudo systemctl restart mysql**:-
run mySQL as sudo user and create a new user, run with the -A option::-
	**$ sudo mysql -u root -p -A:-
	mysql> USE mysql;:-
	mysql> SELECT user FROM user;**:-
create a user::-
	**mydsql> CREATE USER 'sammy'@'remote_host' IDENTIFIED WITH mysql_native_password BY 'password';**:-
or::-
	**mysql> CREATE USER 'sammy'@'remote_server_ip' IDENTIFIED BY 'password';**:-
set privilegies and premissions::-
	**GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'sammy'@'remote_host' WITH GRANT OPTION;**:-
apply it::-
	**mysql> FLUSH PRIVILEGES;:-
        mysql> exit;**:-
If you only plan to access the database server from one specific machine, you can grant that machine
 exclusive permission to connect to the database remotely with the following command. 
Make sure to replace remote_IP_address with the actual IP address of the machine you plan to connect with:
	**$ sudo ufw allow from remote_IP_address to any port 3306**:-
or from any IP::-
	**$ sudo ufw allow 3306**:-
RUN sql script::-
	** mysql> source \home\user\Desktop\myscript.sql;**:-
/*E N D*/

#### ******GIT ONE FILE GETTING*****
GET one file from github - :-
   **wget	https://raw.githubusercontent.com/aaw20904/exem_app/main/session_learn.sql**:-
---------------------------- -----------------------------
## NPM   dependences from  package.json :-
		**$npm install package.json**:-
----------------------------- -----------------------------  
 ### Certificate self-signed  :-
	**$ openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out example.crt -keyout example.key**:-
## node SSL self-signed connection:-

const connectionDB = mysql.createConnection({
  user: 'tester',
  password: databasePassword,
  host: databaseHost,
  database: databaseName,
  ssl:{
    ca: fs.readFileSync('./client.csr'),
    key: fs.readFileSync('./client.key.pem'),
    rejectUnauthorized: false
  }

})


####	NODEJS LAST STABLE VERSION
	sudo npm cache clean -f
	sudo npm install -g n
	sudo n stable

####  RUN NODEJS app as a daemon
// 1)create a file :  /etc/systemd/system/my-app.service

			**[Unit]
		Description="My Express App"

		[Service]
		Type=simple
		ExecStart=/usr/bin/node /home/ubuntu/soft/server.js serve  
		WorkingDirectory=/home/ubuntu/soft          
		Restart=always
		RestartSec=10
		StandardOutput=syslog
		StandardError=syslog
		SyslogIdentifier=MyApp
		Environment=NODE_ENV=production PORT=8080   /*port which will be listening*/

		[Install]
		WantedBy=multi-user.target**
		
// 2) enable the service:
		**$ sudo systemctl enable my-app.service**
// 3) run the one:
		**$ sudo systemctl start my-app.service**
// 4)   check status:
		**$ sudo  systemctl status my-app**
// 5) optional: when thre was any error - check it:
		**$ journalctl -u service-name.service**
// 6) optional: when  .my-app.service file as been changed - please reload configuration
               **$ systemctl daemon-reload**
### **CLEAN daemon system journal******** 
    **$ sudo journalctl --flush --rotate
    $ sudo journalctl --vacuum-time=1s**
 #### *** SYSTEM JOURNAL OPTIONS - SIZE******* 
    $ /etc/systemd/journald.conf
    
    #Specifies the maximum disk space that can be used by the journal in persistent storage:
     SystemMaxUse=500M   
     
    #Specifies the amount of space that the journal should leave free when adding journal entries to persistent storage.
    SystemKeepFree=100M
    
    #Controls how large individual journal files can grow to in persistent storage before being rotated.
    SystemMaxFileSize=100M
    
    ///AFTER MODIFICATION - 
    	$ sudo systemctl restart systemd-journald
   //AND FERIFY FINALLY
        $ journalctl --verify
	/******https://www.geeksforgeeks.org/difference-between-node-js-require-and-es6-import-and-export/
/*-----------------------NOHUP runs a task in background-------------------------*/
       $ nohup node script.js &
       To terminate a process running in the background, use the kill command as follows:
       $ kill -9 PID
       