//var page = new WebPage();
var page = require('webpage').create();
var fs = require('fs');

if (phantom.args.length<2) {
    console.log('usage: phantomjs scrape-raymondjames.js <username> <passsword>');
    phantom.exit();    
}
var username=phantom.args[0];
var password=phantom.args[1];
var server = 'https://client.raymondjames.ca/';

page.onConsoleMessage = function(msg) {
    stamplog('>> '+msg);
};
page.onAlert = function(msg) {
    console.log('>>> '+msg);
};

stamplog('fetching portfolios for user '+username);

var done = {
  count:0
  // Felix:true,...
}

var portfolios = {}
function checkPageInfo(){
  pageInfo =  page.evaluate(function() {
    var url=''+window.location;
    var pageInfo={
      basename: url.substring(url.lastIndexOf('/') + 1)
    };
    return pageInfo;
  });
  stamplog('got '+pageInfo.basename);
  return pageInfo;
}
//page.open(server+'Login.srf', 'post', data, function (status) {
page.open(server+'home/login', function (status) {
  if (status !== 'success') {
    stamplog('Unable to post!');
    phantom.exit();
  } else {
    var pi = checkPageInfo();
    
    if (pi.basename==='login'){
      page.injectJs("login.js");
      var scriptName='invoke-with-creds-and-remove.js';
      var f = fs.open(scriptName, "w");
      f.write('doLogin("'+username+'","'+password+'");\n');
      f.close();
      page.injectJs(scriptName);
      fs.remove(scriptName);
    } else if (pi.basename==='home'){
      // exenet is: document.querySelector('ul#navigation > li > a.portfolio').getAttribute('href')
      page.open(server+'exenet');
    } else if (pi.basename==='portfolio-n.htm'){
      if (page.injectJs("jquery-1.6.4.min.js")) {}

      var portfolio = page.evaluate(function() {
          // jQuery is loaded, now manipulate the DOM, no need to wait for ready?!
          // that way we can return the value...
          //$(document).ready(extractPortfolio);
          return extractPortfolio();
          function extractPortfolio(){
            portfolio = {
              accounts:[]
            };
            $('div#main > table > tbody > tr').each(function(i,v){
              // $(this)
              //console.log("--"+$(this).html());
              $self = $(this);
              function fld(idx){
                return $.trim($self.find('td:eq('+idx+')').text());
              }
              var account = {
                id:         fld(0),
                name:       fld(1),
                type:       fld(2),
                funds:      fld(3),
                cash:       fld(6),
                securities: fld(7),
                total:      fld(8)
              }
              console.log(JSON.stringify(account));
              portfolio.accounts.push(account);
            });
            return portfolio;
           }
      });
      portfolio.stamp=iso8601(new Date());
      var f = fs.open('portfolio.json', "w");
      f.write(JSON.stringify(portfolio,null,2));
      f.close();
      stamplog('wrote portfolio.json');
      phantom.exit();
    }
  }
  window.setTimeout(function () {
    //page.render(output);
    phantom.exit();
    }, 30000);
});

function stamplog(msg){
    console.log(iso8601(new Date())+' '+msg);
}
function iso8601(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+'Z';
}
