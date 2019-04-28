import { Info } from '../info/info';
import { Card } from '../card/card';

export class Booking {

    idUser: string;

    idProfessional: string;
    
    idService: string;
    
    total: any;
    
    dateBegin: any;
    
    idCompany: string;
    
    color: string;
    
    info: Info;
    
    card: Card;
    
    nameProfessional: string;

    occupationProfessional: string;

    companyUserId: string;

    companyNameProfessional: string;

    companyDocumentProfessional: string;

    companyAddressProfessional: any;
    
    companyDocumentUser: any;

    nameService: string;

    code: string;

    serviceAddress: any;

    unitaryValue: any;

    minimunQuantity: any;

    visitValue: any;

    nameUser: string;

    occupationUser: string;

    companyNameUser: string;

    companyAddressUser: any;

}