import { httpService } from "./httpService"

class AuthService {
    async login(userData: any) {
        return await httpService.auth("/api/users/login", userData)
    }
    async googleLogin(tokenData: any){
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAfdUUIzsM11swGfMVGyei-qLCs0FdV6es"
        return await httpService.auth(url, tokenData)
    }
    async signUp(userData: any){
        return await httpService.auth("/api/users", userData)
    }
    // async signup(email, password) {
    //     this.userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    //     httpService.accessToken = this.userCredentials.user.accessToken
    //     console.log("SigUp:")
    //     console.log(this.userCredentials)
    // }
    // async logout() {
    //     await signOut(auth)
    //     this.userCredentials = undefined
    //     httpService.accessToken = undefined
    //     console.log("Logout:")
    //     console.log(this.userCredentials)
    // }
}

export const authService = new AuthService()