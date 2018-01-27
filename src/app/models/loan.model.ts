import { Pager } from "./base.model";

export class LoanAdd {
    loanID : number;
    startDate : string;
    endDate : string;
    borrowerID : number;
    principalAmount : number;
    monthlyInterest : number;
    comments : string;
    status : number;
    refNo : string;
}

export class Loan {
    loanID : number;
    startDate : Date;
    endDate : Date;
    borrower : string;
    principalAmount : number;
    monthlyInterest : number;
    totalPayAmount : number;
    payDate : Date;
    statusID : number;
    statusName : string;
    refNo : string;
}

export class LoanSearch extends Pager {
    startDate : string;
    endDate : string;
    borrowerID : number;
    refNo : string;
}

export class LoanSearchResult extends Pager {
    recordCount : number;
    loanList : Loan[];
}

export class LoanPaymentAdd {
    loanPayID : number;
    loanID : number;
    payDate : Date;
    payAmount : number;
    payType : number;
    payComments : string;
}

export class LoanPayment {
    loanPayID : number;
    loanID : number;
    payDate : Date;
    payAmount : number;
    payType : number;
    payTypeName : string;
    payComments : string;
    principalPaid : number;
    interestPaid : number;
    outstandingPrincipal : number;
}

export class LoanCalcInterest {
    payAmount : number;
    payDate : Date;
    dailyRate : number;
    intForDays : number;
    intOnAmount : number;
    calcIntAmount : number;
    totalIntPaid : number;
}

export enum LoanStatus  {
    new = 1,
    partialPaid = 2,
    paid = 3,
    closed = 4
}

export enum PayType {
    Principal = 1,
    Interest = 2
}