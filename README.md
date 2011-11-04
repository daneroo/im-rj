# Raymond-James
scrape the portfolio data

## phantomjs: getting the page
We use [phantomjs-1.3](http://www.phantomjs.org/) to scrape-n-script the site access.
The script invocations generates the `portfolio.json` file (git ignored).

    # in 1.3 : 
    phantomjs scrape-raymondjames.js username passsword

## setting up CRON (on dirac every hour)
This produces the portfolio.json file. it is meant to be deployed in a static web-served folder.

    # crontab -e # on dirac
    55 * * * * cd /Users/daniel/Sites/im-rj; /usr/local/bin/phantomjs scrape-raymondjames.js danlau raymondjames-password >> scrape.log 2>&1
    
## deploying on (no.de,cloudfoundy,goedel,dirac,etc)
deploying publicly accessible (password protect data)


    idea

    login
    document.querySelectorAll('ul#navigation > li > a.portfolio').click()
    document.querySelector('ul#navigation > li > a.portfolio').getAttribute('href')
    which is /exenet and redirects appropriately

    Then compile the data:
     document.querySelectorAll('#main table tr')

