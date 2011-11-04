console.log('define doLogin');
function doLogin(username,password){
  console.log('invoke doLogin: '+username);
  if(document.querySelector('#user_login')){
    document.querySelector('#user_login').value = username;
    document.querySelector('#user_password').value = password
    document.querySelector('form#login').submit();
  }  
}
