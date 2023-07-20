import { Component, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { ShortcutsKeysService } from '../shortcuts-keys.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public ShortcutsKeysService: ShortcutsKeysService){

  }


  editingShortcut = false;
  tempShortcut: any;
  keyString = '';
  keys:string[] = [];

  onKeydownEvent!: (event: KeyboardEvent) => void;

  editShortcut(shortcut: any, input: HTMLInputElement){
    this.tempShortcut = JSON.parse(JSON.stringify(shortcut));
    shortcut.editing = true;
    this.editingShortcut = true;
    input.value = '';
    input.disabled = false;
    input.focus();
    this.onKeydownEvent = (event: KeyboardEvent) => this.onKeydown(event, shortcut);
    input.addEventListener('keydown', this.onKeydownEvent);
  }

  updateShortcut(shortcut: any, input:HTMLInputElement, index: number){
    let shortcutNotTaken = true;
    for(let i=0; i<this.ShortcutsKeysService.shortcuts.length; i++){
      if(i !== index){
        if(shortcut.key === this.ShortcutsKeysService.shortcuts[i].key){
          shortcutNotTaken = false;
        }
      }
    }
    if(shortcutNotTaken){
      shortcut.editing = false;
      this.editingShortcut = false;
      if (input.value === ''){
        shortcut.key = this.tempShortcut.key;
        input.value = this.tempShortcut.key;
      }
      else{
        this.ShortcutsKeysService.update(shortcut, index);
        window.location.reload();
      }
      this.tempShortcut = null;
      this.keyString = '';
      this.keys = [];
      input.removeEventListener('keydown', this.onKeydownEvent);
    }
    else{
      alert("Shortcut already taken.");
    }
  }

  cancelEditShortcut(shortcut: any, input:HTMLInputElement){
    shortcut.editing = false;
    this.editingShortcut = false;
    shortcut.key = this.tempShortcut.key;
    input.value = this.tempShortcut.key;
    this.tempShortcut = null;
    this.keyString = '';
    this.keys = [];
    input.removeEventListener('keydown', this.onKeydownEvent);
  }

  onKeydown = (event: KeyboardEvent, shortcut: any) => {
    event.preventDefault();
    if(this.keys.length === 3){
      return;
    }
    else if(event.key === 'ArrowUp'){
      this.keys.push('up');
    }
    else if(event.key === 'ArrowDown'){
      this.keys.push('down');
    }
    else if(event.key === 'ArrowLeft'){
      this.keys.push('left');
    }
    else if(event.key === 'ArrowRight'){
      this.keys.push('right');
    }
    else if (event.ctrlKey) {
      this.keys.push('ctrl');
    }
    else if (event.altKey) {
      this.keys.push('alt');
    }
    else if (event.shiftKey) {
      this.keys.push('shift');
    }
    else if (event.metaKey) {
      this.keys.push('meta');
    }
    else if(event.key === '+'){
      this.keys.push('plus');
    }
    else if(event.key === ' '){
      this.keys.push('space');
    }
    else if (event.key !== 'Control' && event.key !== 'Alt' && event.key !== 'Shift' && event.key !== 'Meta') {
      this.keys.push(event.key);
    }

    if(this.keys.length === 1){
      this.keyString = this.keys.toString();
    }
    else if(this.keys.length > 1){
      let i = this.keys.length - 1;
        if((['ctrl', 'alt', 'shift', 'meta'].indexOf(this.keys[i-1]) < 0) && (['ctrl', 'alt', 'shift', 'meta'].indexOf(this.keys[i]) < 0)){
          if((['ctrl', 'alt', 'shift', 'meta'].indexOf(this.keys[0]) >= 0)){
            //do nothing
          }
          else{
            this.keyString = this.keyString.concat(' ' + this.keys[i].toString());
          }
        }
        else if((['ctrl', 'alt', 'shift', 'meta'].indexOf(this.keys[0]) >= 0)){
          this.keyString = this.keyString.concat(' + ' + this.keys[i].toString());
        }
        else{
          this.keys.splice(this.keys.length-1, 1);
        }
      }
    shortcut.key = this.keyString;
  }
}

