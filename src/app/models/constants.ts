export const AppConstants = {
    downloadFileHeaderKey : "downloadFile",
    excelContentType : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    numericDisplayFormat : '1.2-2',
    dateDisplayFormat : 'dd/MM/yyyy',
    numericDisplayFormat4 : '1.2-4',
}

export class GlobalLib {
    public static displayDate(dt : Date) : string {
        let newDt = new Date(dt);
        if(newDt.getFullYear() == 1900 || newDt.getFullYear() == 1){
            return '';
        }
        return newDt.getDate() + '/' + (newDt.getMonth() + 1) + '/' + newDt.getFullYear();
    }
    
    public static dateToString(dt : Date) : string {
        if(dt === undefined){
            return '';
        }
        let newDt = new Date(dt); 
        if(newDt.getFullYear() == 1900 || newDt.getFullYear() == 1){
            return '';
        }
        return (newDt.getMonth() + 1) + '/' + newDt.getDate()  + '/' + newDt.getFullYear();
    }

    public static getDateFromDatePicker(dp : any) : Date {
        let date : any;
        if(dp !== undefined && dp != null && dp.year){
            date = new Date(dp.year, dp.month-1, dp.day);
        }
        return date;
    }
}