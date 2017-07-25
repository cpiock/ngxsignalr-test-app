import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { SignalrChannelService, ConnectionState, ChannelEvent} from './signalrchannel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  // An internal "copy" of the connection state stream used because
    //  we want to map the values of the original stream. If we didn't
    //  need to do that then we could use the service's observable
    //  right in the template.
    connectionState$: Observable<string>;

    constructor(
        private signalrChannelService: SignalrChannelService) {
        // Let's wire up to the signalr observables
        //
        this.connectionState$ = this.signalrChannelService.connectionState$
            .map((state: ConnectionState) => { return ConnectionState[state]; });

        this.signalrChannelService.error$.subscribe(
            (error: any) => { console.warn(error); },
            (error: any) => { console.error('errors$ error', error); }
        );

        // Wire up a handler for the starting$ observable to log the
        //  success/fail result
        //
        this.signalrChannelService.starting$.subscribe(
            () => { console.log('signalr service has been started'); },
            () => { console.warn('signalr service failed to start!'); }
        );
    }


    ngOnInit() {
          this.signalrChannelService.start();

          this.signalrChannelService.sub('e0e7a11c-967a-43e4-9d10-7984bc96d9b4').subscribe(
            (x: ChannelEvent) => {
                console.log(x.Data);
            },
            (error: any) => {
                console.warn('Attempt to join channel failed!', error);
            }
        )
    }
}
