import { makeAutoObservable } from "mobx";
class AuthViewModel {
    email = '';
    password = '';
    isLoggedIn = false;
  
    constructor() {
      makeAutoObservable(this);
    }
  
    setEmail(email) {
      this.email = email;
    }
  
    setPassword(password) {
      this.password = password;
    }
  
    setLoggedIn(loggedIn) {
      this.isLoggedIn = loggedIn;
    }
  }
  
  const authViewModel = new AuthViewModel();
  
  export { authViewModel };