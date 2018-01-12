import { Pager } from "./base.model";

export const PartyTypeID = {
    saller : 1,
    buyer : 2,
    broker : 3,
    loanBorrower : 4
}
export class PartyType {
    partyTypeID : number;
    partyTypeName : string;
}
export class Party {
    partyID : number;
    partyCode : string;
    firstName : string;
    lastName : string;
    phoneNo : string;
    mobileNo : string;
    selectedPartyTypes : string[];
}

export class PartySearch extends Pager {
    userID : number;
    partyCode : string;
    firstName : string;
    lastName : string;
}

export class PartySearchResult {
    startIndex : number;
    pageSize : number;
    recordCount : number;
    partyList : Party[];
}