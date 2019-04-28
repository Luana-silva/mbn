import { Address } from '../address/address';
import { Info } from '../info/info';

export class Company {

  id : string;

  idUser: string;
  
  fantasyName : string;

  gender : string;

  document : string;

  phone : string;

  phoneCountryCode : any;

  phoneNumber : any;

  addressInfo : Address;

  info : Info;

}
