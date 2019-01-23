export class StorageUtils {

    public storeToken(token: string) {
      localStorage.setItem("token", token);
    }
    
    public storeUser(user: any) {
      let userStr  = JSON.stringify(user);
      localStorage.setItem("user", userStr);
    }

    public storeName(name: any) {
      let nameStr  = JSON.stringify(name);
      localStorage.setItem("name", nameStr);
    }

    public getToken() {
      return localStorage.token;
    }
    
    public getUser() {
      return localStorage.user;
    }
    
    public getName() {
      return localStorage.name;
    }

    public idUser(idUser: string) {
      localStorage.setItem("idUser", idUser);
    }
  
    public getIdUser() {
      return localStorage.idUser
    }
  
    public idEvent(idEvent: string) {
      localStorage.setItem("idEvent", idEvent);
    }
  
    public getIdEvent() {
      return localStorage.idEvent
    }
  
    public idCompany(idCompany: string) {
      localStorage.setItem("idCompany", idCompany);
    }
  
    public getIdCompany() {
      return localStorage.idCompany
    }
  
    public roleId(roleId: string) {
      localStorage.setItem("roleId", roleId);
    }
  
    public getRoleId() {
      return localStorage.roleId
    }

    
  }
  