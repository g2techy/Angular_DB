export const AppConstants = {
    downloadFileHeaderKey : "downloadFile",
    excelContentType : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    numericDisplayFormat : '1.2-2',
    dateDisplayFormat : 'dd/MM/yyyy'
}

export class GlobalLib {
    public static displayDate(dt : Date) : string {
        let newDt = new Date(dt);
        if(newDt.getFullYear() == 1900 || newDt.getFullYear() == 1){
            return '';
        }
        return newDt.getDate() + '/' + (newDt.getMonth() + 1) + '/' + newDt.getFullYear();
    } 
}