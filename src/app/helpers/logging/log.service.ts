import { Injectable } from "@angular/core";

import { LogPublisher } from "./log-publishers";
import { LogPublishersService } from "./log-publishers.service";

export enum LogLevel {
    All = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6
}

export class LogEntry {
    // Public Properties
    entryDate: Date = new Date();
    message: string = "";
    level: LogLevel = LogLevel.Debug;
    extraInfo: any[] = [];
    logWithDate: boolean = true;
        
    buildLogString(): string {
        let ret: string = "";
        
        if (this.logWithDate) {
            ret = this.dataToString(new Date(), 'yyyy-MM-dd hh:mm:ss') + " - ";
        }
        ret += "Type: " + LogLevel[this.level];
        ret += " - Message: " + this.message;
        if (this.extraInfo.length) {
            ret += " - Extra Info: "
            + this.formatParams(this.extraInfo);
        }
        
        return ret;
    }
        
    private formatParams(params: any[]): string {
        let ret: string = params.join(",");        
        // Is there at least one object in the array?
        if (params.some(p => typeof p == "object")) {
            ret = "";
            // Build comma-delimited string
            for (let item of params) {
                ret += JSON.stringify(item) + ",";
            }
        }
        
        return ret;
    }

    private dataToString(x : Date, y : string) : string {
        var z = {
            M: x.getMonth() + 1,
            d: x.getDate(),
            h: x.getHours(),
            m: x.getMinutes(),
            s: x.getSeconds()
        };
        y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
        });
    
        return y.replace(/(y+)/g, function(v) {
            return x.getFullYear().toString().slice(-v.length)
        });
    }
}
  
@Injectable()
export class LogService {

    level: LogLevel = LogLevel.All;
    logWithDate: boolean = true;
    publishers : LogPublisher[];

    constructor(private logPubService : LogPublishersService ) {
        this.publishers = this.logPubService.publishers;
    }

    debug(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Debug,
                        optionalParams);
      }
            
      info(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Info,
                        optionalParams);
      }
            
      warn(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Warn,
                        optionalParams);
      }
            
      error(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Error,
                        optionalParams);
      }
            
      fatal(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Fatal,
                        optionalParams);
      }
            
      log(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.All,
                        optionalParams);
      }

      private writeToLog(msg: string, level: LogLevel, params: any[]) {
            if (this.shouldLog(level)) {
                let entry: LogEntry = new LogEntry();
                entry.message = msg;
                entry.level = level;
                entry.extraInfo = params;
                entry.logWithDate = this.logWithDate;
                for (let logger of this.publishers) {
                    logger.log(entry)
                        .subscribe(response =>
                                    console.log(response));
                }
            }
        }
        private formatParams(params: any[]): string {
            let ret: string = params.join(",");
            // Is there at least one object in the array?
            if (params.some(p => typeof p == "object")) {
                ret = "";
                // Build comma-delimited string
                for (let item of params) {
                ret += JSON.stringify(item) + ",";
                }
            }
            return ret;
        }

        private shouldLog(level: LogLevel): boolean {
            let ret: boolean = false;
            if ((level >= this.level &&
                 level !== LogLevel.Off) ||
                 this.level === LogLevel.All) {
              ret = true;
            }
            return ret;
        }

}