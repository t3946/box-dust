Server starts up

1. create simple ubuntu 22.04 server
   1. if it was Beget then username is root and ssh auth instead password
   2. `sudo apt update`
2. install mysql
   1. `sudo apt install mysql-server mysql-client`
   2. `mysql -V` must have ^8.0
   3. `sudo systemctl status mysql`
3. import mysql database
   1. `CREATE DATABASE box_dust;`
   2. `CREATE USER 'box_dust_admin'@'localhost' IDENTIFIED BY 'password';`
   3. `GRANT ALL PRIVILEGES ON box_dust.* TO 'box_dust_admin'@'localhost';`
   4. `exit;`
   5. `mysql -u box_dust_admin -p box_dust < box_dust.sql`
4. install node & npm
   1. `sudo apt install build-essential checkinstall` 
   2. `sudo apt install libssl-dev`
   3. `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash`
   4. restart terminal
   5. `nvm install --lts`
   6. `nvm use --lts`
   7. `node -v & npm -v`
5. install nginx
   1. `sudo apt-add-repository ppa:nginx/stable`
   2. `sudo apt install nginx`
   3. `sudo systemctl enable nginx`
   4. open server ip in browser
6. install git
   1. `sudo apt install git`
   2. `git --version`
7. import project 
   1. `cd /var/www/html`
   2. `mkdir box-dust`
   3. `cd ~`
   4. `ln -s /var/www/html/box-dust box-dust`
   5. `ssh-keygen`
   6. add ssh-key to git
   7. `cd box-dust`
   8. `git clone git@github.com:t3946/box-dust.git .`
8. build project
   1. `npm i`
   2. write all required env variables`sudo -H gedit /etc/environment` then reboot server
9. expose project
   1. just open ports for nodes 
   2. client `sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT`
   3. api    `sudo iptables -A INPUT -p tcp --dport 3080 -j ACCEPT`
   4. check that's all right `sudo iptables -nvL`
10. in client part you need install submodules
    1. `git submodule init`
    2. `git submodule update --init`
    3. if not working then go in submodule and use git manually
    4. `npm run start`
    5. create link to storage for roulette `ln -s /var/www/html/box-dust/admin/storage/app/public/ storage` (`mklink /D storage "C:\Users\Air\OpenServer\domains\localhost\box-dust\admin\storage\app\public"`)
11. setup admin part. You can read this instruction https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-laravel-with-nginx-on-ubuntu-20-04". Don't forget to install php-fpm for current php version and check nginx config for right fpm version.
    1. `sudo apt install php-mbstring php-xml php-bcmath`
    2. install composer
       1. `sudo apt install curl php-cli php-mbstring git unzip`
       2. `curl -sS https://getcomposer.org/installer -o composer-setup.php`
       3. `sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer`
       4. check it `composer`
    3. install packages
       1. `cd admin`
       2. `composer update`
       3. check laravel `php artisan`
    4. link to admin storage `ln -s /var/www/html/box-dust/admin/storage/app/public/ storage`
12. domain and port settings
    1. change in nginx config port 80 to 8000 (admin laravel must work on 8000 port)
    2. redirect incoming http to client application:
       `sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000`
       `sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 3000`
       `sudo iptables-save`

# Registration/authorisation
If you register through email and password then you must confirm your account before use it. Not confirmed accounts will be deleted after one day.

Dto validation objects good for development more and prevent database errors. Client get errors either before form send or after form send and data is valid but controller declined their by third-side cause (then I write explicitly req.send(errors: {email: "already registered"}) -- email is ok but after check db I got that it can't to use).

# DB Database -- Recovering
At first You need to apply migrations that in admin part. After You can to generate other date from prisma schema in server part.
`cd admin`
`php artisan migrate`
`php artisan voyager:install --with-dummy`
`cd sever`
`npx prisma db push`
Then you should generate admin user
`php artisan voyager:admin admin --create`
And now you can go to admin
