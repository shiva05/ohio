import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { InteropDataPacket } from '../models/interop-datapacket';

@Injectable()
export class InteropService {
    iframe = null;
    messageData = new BehaviorSubject(null);

    constructor() {
        window.addEventListener('message', (event) => {
            if (this.isJson(event.data)) {
                const obj = JSON.parse(event.data);
                if (obj.appName) {
                    this.messageData.next(obj);
                }
            }
        });
    }

    // target - a window object, message anything
    publish(message: any) {
        if (this.iframe && this.iframe.contentWindow) {
            this.iframe.contentWindow.postMessage(JSON.stringify(message), '*');
        }
    }

    dataStream(): Observable<InteropDataPacket> {
        return this.messageData.asObservable();
    }

    isJson(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
}
