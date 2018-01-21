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
    status : number;
}

export class Party {
    partyID : number;
    partyName : string;
}

export class SalePaymentAdd {
    saleID : number;
    payID : number;
    payDate : Date;
    payAmount : number;
    courierFrom : string;
    courierTo : string;
}

export class SalePayment {
    payment : SalePaymentAdd;
    paymentList : SalePaymentAdd[]
}

export class SaleBrokerage {
    bdid : number;
    saleID : number;
    brokerID : number;
    brokerName : string;
    brokerage : number;
    brokerageAmount : number;
    isPaid : boolean;
    payDate : Date;
    payComments : string;
}

export class SaleBrokerageAdd {
    bDID : number;
    saleID : number;
    brokerID : number;
    brokerage : number;
}

export class SaleBrokPayment {
    bDID : number;
    payDate : Date;
    payComments : string;
}

export enum SaleStatus  {
    new = 1,
    partialPaid = 2,
    paid = 3,
    closed = 4
}

export class SaleReport {
    startDate : string;
    endDate : string;
    sallerID : number;
    buyerID : number;
    status : number;
    dueDays : number;
}

export class Status {
    statusID : number;
    statusName : string;
}