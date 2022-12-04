class HttpService {
    accessToken = ""
    async get(url: string) {
        try {
            let requestInit: any = {}
            requestInit = {
                headers: {
                    'Accept': 'application/json'
                }
            }
            if (typeof (this.accessToken) != "undefined") {
                requestInit.headers['Authorization'] = `Bearer ${this.accessToken}`
            }
            let response = await fetch(url, requestInit)
            if (response.ok) {
                return await response.json()
            }
        } catch (error) {
            console.log(error)
        }
        return undefined;
    }

    async post(url: string, content: any) {
        try {
            let requestInit: any = {}
            requestInit = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(content)
            }

            if (typeof (this.accessToken) != "undefined") {
                requestInit.headers['Authorization'] = `Bearer ${this.accessToken}`
            }
            let response = await fetch(url, requestInit)
            if (response.ok) {
                return await response.json()
            }
        } catch (error) {
            console.log(error)
        }
        return undefined;
    }

    async put(url: string, body: any) {
        try {
            let requestInit: any = {}
            requestInit = {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }

            if (typeof (this.accessToken) != "undefined") {
                requestInit.headers['Authorization'] = `Bearer ${this.accessToken}`
            }
            let response = await fetch(url, requestInit)
            if (response.ok) {
                return response.ok
            }
        } catch (error) {
            console.log(error)
        }
        return undefined;
    }

    async delete(url: string) {
        try {
            let requestInit: any = {}
            requestInit = {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

            if (typeof (this.accessToken) != "undefined") {
                requestInit.headers['Authorization'] = `Bearer ${this.accessToken}`
            }
            let response = await fetch(url, requestInit)
            if (response.ok) {
                return response.ok
            }
        } catch (error) {
            console.log(error)
        }
        return undefined;
    }

    async auth(url: string, content: any) {
        try {
            let requestInit: RequestInit = {}
            requestInit = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(content),
                
            }
            let response = await fetch(url, requestInit)
            if (response.ok) {
                return await response.json()
            }
        } catch (error) {
            console.log(error)
        }
        return undefined;
    //await fetch("/api/users/login")
    }
    
}

export const httpService = new HttpService()