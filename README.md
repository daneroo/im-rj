# Raymond-James
scrape the portfolio data

had been failing since 2012-211-03, added --ignore-ssl-errors=yes

## phantomjs: getting the page
We use [phantomjs-1.3](http://www.phantomjs.org/) to scrape-n-script the site access.
The script invocations generates the `portfolio.json` file (git ignored).

    # in 1.3 : 
    phantomjs scrape-raymondjames.js username passsword

## setting up CRON (on dirac every hour)
This produces the portfolio.json file. it is meant to be deployed in a static web-served folder.

    # crontab -e # on dirac
    05 00,23 * * * cd /Users/daniel/Sites/im-rj; /usr/local/bin/phantomjs --ignore-ssl-errors=yes scrape-raymondjames.js danlau top3oak >> scrape.log 2>&1
    
## deploying on (no.de,cloudfoundy,goedel,dirac,etc)
deploying publicly accessible (password protect data)
