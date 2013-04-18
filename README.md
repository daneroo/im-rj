# Raymond-James

Get the data back from time machine:
ls /Volumes/DiracTB/Backups.backupdb/dirac/20??-??-??-??????/Dirac/Users/daniel/Sites/im-rj/portfolio.json

to copy them:

# When HD was named Dirac
for i in `ls /Volumes/DiracTB/Backups.backupdb/dirac/20??-??-??-??????/Dirac/Users/daniel/Sites/im-rj/portfolio.json | cut -d / -f 6`; do echo copying $i ; cp /Volumes/DiracTB/Backups.backupdb/dirac/$i/Dirac/Users/daniel/Sites/im-rj/portfolio.json historical/rj-portfolio-$i.json; done

# When HD was named Macintosh\ HD
for i in `ls /Volumes/DiracTB/Backups.backupdb/dirac/20??-??-??-??????/Macintosh\ HD/Users/daniel/Sites/im-rj/portfolio.json | cut -d / -f 6`; do echo copying $i ; cp /Volumes/DiracTB/Backups.backupdb/dirac/$i/Macintosh\ HD/Users/daniel/Sites/im-rj/portfolio.json historical/rj-portfolio-$i.json; done



scrape the portfolio data

had been failing since 2012-11-03, added --ignore-ssl-errors=yes

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
