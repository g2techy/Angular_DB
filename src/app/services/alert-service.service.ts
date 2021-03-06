import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        console.log(`AlertService.success : ${message}`);
        this.subject.next(
            { type: 'success', 
              text: message,
              noFn : () => {
                this.subject.next();
              } 
            }
        );
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        console.log(`AlertService.error : ${message}`);
        this.subject.next(
            { type: 'error', 
              text: message,
              noFn : () => {
                this.subject.next();
              } 
            }
        );
    }

    confirm(message: string, keepAfterNavigationChange = false, noFn : () => void, yesFn : () => void) {
        let objThis = this;
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        console.log(`AlertService.error : ${message}`);
        this.subject.next(
            { type: 'confirm',
              text: message,
              noFn : () => {
                objThis.subject.next();
                noFn();
              },
              yesFn : () => {
                objThis.subject.next();
                yesFn();
              }
            }
        );
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
