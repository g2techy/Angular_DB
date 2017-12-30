import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { LogPublisher, LogConsole, LogWebApi, LogPublisherConfig } from "./log-publishers";

const PUBLISHERS_FILE = "/assets/log-publishers.json";

@Injectable()
export class LogPublishersService {
    constructor(private http : HttpClient) {
    // Build publishers arrays
        this.buildPublishers();
    }

    // Public properties
    publishers: LogPublisher[] = [];

    // Build publishers array
    buildPublishers(): void {
        let logPub: LogPublisher;
        
        this.getLoggers().subscribe(response => {
            for (let pub of response.filter(p => p.isActive)) {
                switch (pub.loggerName.toLowerCase()) {
                    case "console":
                        logPub = new LogConsole();
                        break;
                    case "webapi":
                        logPub = new LogWebApi(this.http);
                        break;
                }
                // Set location of logging
                logPub.location = pub.loggerLocation;
                // Add publisher to array
                this.publishers.push(logPub);
            }
        });
    }

    getLoggers(): Observable<LogPublisherConfig[]> {
        // return this.http.get<LogPublisherConfig[]>(PUBLISHERS_FILE)
        //                 .map(response => response);

        return Observable.of([
            {
              loggerName: "console",
              loggerLocation: "",
              isActive: true
            }
        ]);
    }
}