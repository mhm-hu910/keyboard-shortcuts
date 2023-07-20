import { Injectable } from '@angular/core';
import { ShortcutEventOutput } from 'ng-keyboard-shortcuts';

@Injectable({
  providedIn: 'root'
})

export class ShortcutsKeysService {

  constructor() {
    //localStorage.removeItem('shortcuts');
    let v = JSON.parse(localStorage.getItem('shortcuts')!);
    if(v !== null){
      for(let i = 0; i<this.shortcuts.length; i++){
        v.forEach((e: any) => {   
          if(e.index === i){
            this.shortcuts[e.index].key = e.val;
          }
        });
      }
    }
  }

  public update(newVal:any ,index: number){
    const newShortcut = {index: index, val: newVal.key};
    let s_old = JSON.parse(localStorage.getItem('shortcuts')!);
    if (s_old !== null){
      let i = s_old.indexOf(newShortcut);
      if (i === -1) {
        s_old.push(newShortcut);
      }
      else{
        s_old.splice(i, 1);
        s_old.push(newShortcut);
      }
      localStorage.setItem('shortcuts', JSON.stringify(s_old));
    }
    else{
      let s_new = JSON.stringify([newShortcut]);
      localStorage.setItem('shortcuts', s_new);
    }
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
