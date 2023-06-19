// https://ploi.io/documentation/server/how-to-install-puppeteer-on-ubuntu
/**
options to run on Linux server 
*/

puppetteer.launch({
   headless: true,
   args: ['--no-sandbox']
})

/**
$ sudo npm install -g puppeteer 

$ sudo apt-get install chromium-browser 
 
$ sudo apt-get install libx11-xcb1 libxcomposite1 libasound2 libatk1.0-0 libatk-bridge2.0-0 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 

**/


/*install on AWS Ubuntu:
To install Puppeteer on an AWS Ubuntu instance, you can follow these steps:

1. Connect to your AWS Ubuntu instance using SSH. You can use a terminal application like `ssh` or a tool like PuTTY if you're on Windows.

2. Update the package lists on your instance by running the following command:
   ```
   $ sudo apt update
   ```

3. Install the necessary dependencies for running Puppeteer:
   ```
   $ sudo apt install -y chromium-browser libx11-xcb1 libxcomposite1 libxdamage1 libxi6 libxtst6 libnss3 libcups2 libxss1 libxrandr2 libasound2 libpango-1.0-0 libatk1.0-0 libatk-bridge2.0-0 libgtk-3-0
   ```



4. Install Puppeteer globally using npm:
   ```
   $ sudo npm install -g puppeteer
   ```

   Note: The `-g` flag installs Puppeteer globally, making it available system-wide.

5. Test the installation by running a Puppeteer script. You can create a simple JavaScript file, for example, `test.js`, with the following content:
   ```javascript*/
   const puppeteer = require('puppeteer');

   (async () => {
     const browser = await puppeteer.launch();
     const page = await browser.newPage();
     await page.goto('https://www.example.com');
     await page.screenshot({ path: 'example.png' });
     await browser.close();
   })();
   ```
/*
6. Run the test script using Node.js:
   ```
   $ node test.js
   ```*/

  
