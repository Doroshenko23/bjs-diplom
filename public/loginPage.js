
'use strict'
           
const userForm = new UserForm(); 

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, serverData => {
    if (serverData.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(serverData.error);
      }
  });
}

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, serverData => {
    if (serverData.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(serverData.error);
      }
  });
}