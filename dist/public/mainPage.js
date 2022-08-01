var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UserCRUD } from "./UserCRUD.js";
const DateTimeFormatter = (target, methodName, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const result = originalMethod.apply(this, args);
        let dateContainer = document.getElementById("Date");
        dateContainer.innerHTML += `${args[0].toLocaleString('en-US')}`;
        return result;
    };
    return descriptor;
};
class MainPage {
    constructor() {
        this.date = new Date();
        this.Btn = document.querySelector(".btn");
        this.userCRUD = new UserCRUD();
        this.Btn.addEventListener('click', () => this.load());
    }
    load() {
        if (this.Btn.innerHTML == "Load Data") {
            this.userCRUD.load();
            this.updateDate(new Date(), this.Btn.innerHTML);
            this.Btn.innerHTML = "Refresh";
        }
        else {
            this.userCRUD.refresh();
            this.updateDate(new Date(), this.Btn.innerHTML);
        }
    }
    updateDate(date, text) {
        let dateContainer = document.getElementById("Date");
        dateContainer.innerHTML = `"${text}" Button was last clicked on: `;
    }
}
__decorate([
    DateTimeFormatter
], MainPage.prototype, "updateDate", null);
new MainPage();
//# sourceMappingURL=mainPage.js.map