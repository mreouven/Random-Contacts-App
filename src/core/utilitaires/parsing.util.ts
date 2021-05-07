export class UtilService {
    static objectToUrl(obj:any) {
        let url = Object.keys(obj).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
        }).join('&');
        return url;
    }
}