import {UserCRUD} from "./UserCRUD.js";

import {ImainPage} from "./mainButtonsInterface";
 
const DateTimeFormatter = 
    (target:Object, methodName: string, descriptor: PropertyDescriptor) => 
    {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any) {
            
            const result = originalMethod.apply(this, args);
            let dateContainer = document.getElementById("Date")! as HTMLHeadElement;
            dateContainer.innerHTML += `${args[0].toLocaleString('en-US')}`;
            return result;
          };
        
          return descriptor;
    } 

 class MainPage implements ImainPage
 {
    Btn: HTMLButtonElement;
    userCRUD: UserCRUD;
    AddBtn: HTMLButtonElement;
    date: Date = new Date();

    constructor()
    {
        this.Btn = document.querySelector(".btn")!;
        this.userCRUD = new UserCRUD();
        this.Btn.addEventListener('click',() => this.load());
        
    }

    
    load()
    {
        if(this.Btn.innerHTML == "Load Data")
        {
            this.userCRUD.load(); 
            this.updateDate(new Date(),this.Btn.innerHTML);
            this.Btn.innerHTML = "Refresh";
        }
        else{
            this.userCRUD.refresh();
           this.updateDate(new Date(),this.Btn.innerHTML);
        }       
        
    } 
 
     @DateTimeFormatter
    updateDate(date: Date,text:String): void {
    
      let dateContainer = document.getElementById("Date")! as HTMLHeadElement;
       dateContainer.innerHTML = `"${text}" Button was last clicked on: `;
    }  
}

new MainPage(); 
