import ApiService from "../../core/api/api.service";
import { IContactResponse } from "../interfaces/contact-responce.interface";


export interface IContact{
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
    image: string;
    imageTumb: string;
}
export class ContactApiService {

    constructor(){

    }
     /**
     *  Api call from https://randomuser.me/
     *  And return cleaned data
     *  @return {@return {IContact[]}}
     */
    static getSingleContact(){
        return new Promise<IContact>((resolve, reject) =>{
            ApiService.get().then((x:IContactResponse)=>{
                //Check if the data is valid
                if(x&&x.results&&x.results.length>0){
                    let result=x.results[0];
                    //Cleaning the data
                    let contact:IContact={
                        firstName:result.name.first,
                        lastName:result.name.last,
                        address:`${result.location.street.number} ${result.location.street.name} ${result.location.city} ${result.location.state}`, 
                        email:result.email,
                        phone:result.phone,
                        image:result.picture.medium,
                        imageTumb:result.picture.thumbnail
                    }
                    resolve(contact);
                }
                
                reject("Invalid Data");
            }).catch((err) =>reject(err));
        })
    }
    /**
     * This function create an array of promise, and return a contact array with n elements
     *  @return {Promise<IContact[]>}
     */
    static LoadMultipleContacts(number:number=10): Promise<IContact[]>{
        let promises:Promise<IContact>[]=[];

        for (let index = 0; index < number; index++) {
            promises.push(ContactApiService.getSingleContact())
        }
        return Promise.all(promises);


    }
}
