# Raymond-James

## Historical Data
Historical data is in JSON format in: `historical/rj-portfolio-20??-??-??-??????.json`

## Shutdown on 2013-04-26
Moved this directory from `dirac:~/Site/im-rj` to `~/Dropbox/Finance/RaymondJames/im-rj`

## Historical Data from TimeMachine
I also got the data back from time machine:

    ls /Volumes/DiracTB/Backups.backupdb/dirac/20??-??-??-??????/Dirac/Users/daniel/Sites/im-rj/portfolio.json

to copy them:

    # When HD was named Dirac
    for i in `ls /Volumes/DiracTB/Backups.backupdb/dirac/20??-??-??-??????/Dirac/Users/daniel/Sites/im-rj/portfolio.json | cut -d / -f 6`; do echo copying $i ; cp /Volumes/DiracTB/Backups.backupdb/dirac/$i/Dirac/Users/daniel/Sites/im-rj/portfolio.json historical/rj-portfolio-$i.json; done

    # When HD was named Macintosh\ HD
    for i in `ls /Volumes/DiracTB/Backups.backupdb/dirac/20??-??-??-??????/Macintosh\ HD/Users/daniel/Sites/im-rj/portfolio.json | cut -d / -f 6`; do echo copying $i ; cp /Volumes/DiracTB/Backups.backupdb/dirac/$i/Macintosh\ HD/Users/daniel/Sites/im-rj/portfolio.json historical/rj-portfolio-$i.json; done

# Cron

    # Shutdown 2013-04-26 - moved to ~/Dropbox/Finance/RaymondJames/im-rj
    # imetrical raymond james
    #05 00,23 * * * cd /Users/daniel/Sites/im-rj; /usr/local/bin/phantomjs-1.6.1 --ignore-ssl-errors=yes scrape-raymondjames.js USER PASS >> scrape.log 2>&1


scrape the portfolio data

had been failing since 2012-11-03, added --ignore-ssl-errors=yes

## phantomjs: getting the page
We use [phantomjs-1.3](http://www.phantomjs.org/) to scrape-n-script the site access.
The script invocations generates the `portfolio.json` file (git ignored).

    # in 1.3 : 
    phantomjs scrape-raymondjames.js username passsword

