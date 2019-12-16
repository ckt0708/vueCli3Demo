let loggedIn = false;
export default{
    login(email,password){
        return new Promise((resolve,reject)=>{
            if(email === "user@qq.com" && password === "123456"){
                loggedIn = true;
                resolve();
            }
            else{
                reject();
            }
        })
    },
    logOut(){
        loggedIn = false;
    },
    isAuthenticated(){
        return loggedIn;
    }
}