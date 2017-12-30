import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/observable/of';
import { LogEntry } from './log.service';

export abstract class LogPublisher {
  location: string;
  abstract log(record: LogEntry):
             Observable<boolean>
  abstract clear(): Observable<boolean>;
}

export class LogPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}

export class LogConsole extends LogPublisher {
    log(entry: LogEntry): Observable<boolean> {
      // Log to console
      console.log(entry.buildLogString());
      return Observable.of(true);
    }
    clear(): Observable<boolean> {
      console.clear();
      return Observable.of(true);
    }
}
  
export class LogWebApi extends LogPublisher {
  constructor(private http: HttpClient) {
    // Must call super() from derived classes
    super();
    // Set location
    this.location = "/api/log";
  }
      
  // Add log entry to back end data store
  log(entry: LogEntry): Observable<boolean> {
    return this.http.post(this.location,entry)
      .map(response => response)
      .catch(this.handleErrors);
  }
      
  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return Observable.of(true);
  }
      
  private handleErrors(error: any):Observable<any> {
    let errors: string[] = [];
    let msg: string = "";
      
    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    if (error.json()) {
      msg += " - Exception Message: " +
             error.json().exceptionMessage;
    }
    errors.push(msg);      
    console.error('An error occurred', errors);      
    return Observable.throw(errors);
  }
}