import { Component, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { ShortcutsKeysService } from '../shortcuts-keys.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  //@ViewChild('html', { static: true }) html!: HTMLElement;


  constructor(public ShortcutsKeysService: ShortcutsKeysService){

  }


  editingShortcut = false;
  tempShortcut: any;
  keyString = '';
  keys:String[] = [];

  onKeydownEvent!: (event: KeyboardEvent) => void;

  editShortcut(shortcut: any, input: HTMLInputElement){
    this.tempShortcut = JSON.parse(JSON.stringify(shortcut));
    shortcut.key = '';
    shortcut.editing = true;
    this.editingShortcut = true;
    input.value = '';
    input.disabled = false;
    input.focus();
    this.onKeydownEvent = (event: KeyboardEvent) => this.onKeydown(event, shortcut);
    input.addEventListener('keydown', this.onKeydownEvent);
  }

  updateShortcut(shortcut: any, input:HTMLInputElement, index: number){
    shortcut.editing = false;
    this.editingShortcut = false;
    if (input.value === ''){
      input.value = JSON.parse(JSON.stringify(this.tempShortcut.key));
    }
    else{
      this.ShortcutsKeysService.update(shortcut, index);
    }
    this.tempShortcut = null;
    this.keyString = '';
    this.keys = [];
    input.removeEventListener('keydown', this.onKeydownEvent);
  }

  cancelEditShortcut(shortcut: any, input:HTMLInputElement){
    shortcut.editing = false;
    this.editingShortcut = false;
    shortcut.key = JSON.parse(JSON.stringify(this.tempShortcut.key));
    this.tempShortcut = null;
    this.keyString = '';
    this.keys = [];
    input.removeEventListener('keydown', this.onKeydownEvent);
  }

  onKeydown = (event: KeyboardEvent, shortcut: any) => {
    event.preventDefault();
    if (event.ctrlKey) {
      this.keys.push('ctrl');
    }
    if (event.altKey) {
      this.keys.push('alt');
    }
    if (event.shiftKey) {
      this.keys.push('shift');
    }
    if (event.metaKey) {
      this.keys.push('meta');
    }
    if (event.key !== 'Control' && event.key !== 'Alt' && event.key !== 'Shift' && event.key !== 'Meta') {
      this.keys.push(event.key);
    }
    this.keyString = this.keys.join(' + ');
    shortcut.key = this.keyString;
  }

}
function updateShortcutInService() {
  throw new Error('Function not implemented.');
}

