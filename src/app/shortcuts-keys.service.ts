import { Injectable } from '@angular/core';
import { ShortcutEventOutput } from 'ng-keyboard-shortcuts';

@Injectable({
  providedIn: 'root'
})


export class ShortcutsKeysService {

  //public disabled: boolean = false;

  constructor() {}

  public update(newVal:any ,index: number){
    //this.shortcuts.splice(index, 1);
    this.shortcuts[index] = newVal;
  }

  public shortcuts =
   [
    {
        title: "Console log",
        description: "Prints 'Hello World!' in the console.",     
        key: "ctrl + g",
        editing: false,
        preventDefault: true,
        command: (output: ShortcutEventOutput) => console.log("Hello World!"),
     },
     {
        title: "Alert",
        description: "Alerts 'Hello World!'.", 
        editing: false,
        key: "ctrl + b",
        preventDefault: true,
        command: (output: ShortcutEventOutput) => alert("Hello World!"),
     },
     {
        title: "Console log 2",
        description: "Prints 'Hi!' in the console.",
        editing: false,
        key: "ctrl + plus",
        preventDefault: true,
        command: (output: ShortcutEventOutput) => console.log("Hi!"),
     }
 ];
 
}
