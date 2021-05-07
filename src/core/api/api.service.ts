import { UtilService } from "../utilitaires/parsing.util";
const _API_URL = "https://randomuser.me/api";


/**
 * I create this class to centralize all api calls of the program
 * Although in our case we have only one type of call so not really necessary
 * But for me it remains an essential part of the good cutting of a program
 */
class ApiService {
  static query(method:string, api, body) {
    var myHeaders = new Headers();
    var params:any = {
      method: method,
      headers: myHeaders,
      redirect: "follow",
    };

    if (body) {
      if (method === "GET") {
        api += "?" + UtilService.objectToUrl(body);
      } else {
        params.body = JSON.stringify(body);
      }
    }

    return fetch(`${_API_URL}${api?api:''}`, params)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      })
     
  }

  static post(api, body) {
    return ApiService.query("post", api, body);
  }

  static put(api, body) {
    return ApiService.query("put", api, body);
  }

  static delete(api, body) {
    return ApiService.query("delete", api, body);
  }

  static get(api?:string, body?:any) {
    return ApiService.query("GET", api, body);
  }
}

export default ApiService;
