import { Pager } from "./base.model";

export class SaleSearch extends Pager {
    startDate : string;
    endDate : string;
    buyerID : number;
    sallerID : number;
    refNo : string;
}

export class Sale {
    saleID : number;
    saleDate : Date;
    buyer : number;
    saller : number;
    totalWeight : number;
    rejectionWt : number;
    selectionWt : number;
    unitPrice : number;
    netSaleAmount : number;
    dueDays : number;
    totalBrokerage : number;
    totalPayment : number;
    payDate : Date;
    status : string;
    refNo : string;
    dueDate : Date;
    lessPer : number;
}

export class SaleSearchResult {
    startIndex : number;
    pageSize : number;
    recordCount : number;
    salesList : Sale[];
} 

export class SaleAdd {
    saleID : number;
    saleDate : string;
    buyerID : number;
    sallerID : number;
    dueDays : number;
    totalWeight : number;
    rejectionWeight : number;
    selectionWeight : number;
    unitPrice : number;
    netSaleAmount : number;
    lessPer : number;
}

export class Party {
    partyID : number;
    partyName : string;
}