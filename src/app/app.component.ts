import { Component } from '@angular/core';
import { ShortcutEventOutput } from 'ng-keyboard-shortcuts';
import { ShortcutsKeysService } from './shortcuts-keys.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'keyboard-shortcuts';


  constructor(public ShortcutsKeysService: ShortcutsKeysService){

  }

}
