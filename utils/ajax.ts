import { getToken } from "./functions";

export interface DoAjaxResponse<T> {
    data: T;
    status:"SUCCESS"|"FAILURE";
    message:string
}


export default class DoAjax {
    private hostUrl = "https://appservice-server.onrender.com"
    // private hostUrl = "http://localhost:9000"
    private token = getToken()
    private appName = "dhanmitra"
    private urlVersion = "/api/v1";
    private url: string;
    private header  = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
    }
    private method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    private body: string|null = null;
    private static instance: DoAjax;
    private constructor(url: string, method:'GET' | 'POST' | 'PUT' | 'DELETE') {
        this.url = url;
        this.method = method;
        this.setToken();
    };

    private async setToken(){
        let sessionToken = await getToken()
        if(sessionToken && sessionToken != "undefined"){
            this.header.Authorization = `Bearer ${sessionToken}`
        }
    }
    async exec (){

        console.group(this.hostUrl+`/${this.appName}`+this.urlVersion+this.url,"url")
        console.log(this.header,"header")
        console.log(this.body,"body")
        console.groupEnd()
        await this.setToken()
        let res =  await fetch( this.hostUrl+`/${this.appName}`+this.urlVersion+this.url, {
            method: this.method,
            headers: this.header,
            body: this.body,
        })
        let response =  await res.json()
        return response
    }
    payload(data: unknown) {
        this.body = JSON.stringify(data) as string;
        return this;
    }
    setHeader(header: HeadersInit) {
        this.header = { ...this.header, ...header };
        return this;
    }
    setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
        this.method = method;
        return this;
    }
    setUrl(url: string) {
        this.url = url;
        return this;
    }
    static setBaseUrl(url: string) {
        this.instance.urlVersion = url;
        return this.instance;
    }
    static get(url: string) {
        this.instance = new DoAjax(url, "GET");
        return this.instance
    }
    static post(url: string) {
        this.instance = new DoAjax(url, "POST" );
        return this.instance
    }
    static put(url: string) {
        this.instance = new DoAjax(url, "PUT" );
        return this.instance
    }
    static delete(url: string) {
        this.instance = new DoAjax(url, "DELETE");
        return this.instance
    }
}
export const asyncErrorHandler = (callback:Function)=>{
    try {
       return callback();
    } catch (error) {
        return Promise.resolve({
            message: error,
            status:0
        })
    }
} 