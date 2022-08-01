var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User, Role } from "./user.js";
import { findIndexByID } from "./findOperations.js";
export class UserCRUD {
    constructor() {
        this.users = [];
        this.col = [];
        this.tableContainer = document.querySelector('.table');
        this.myURL = `http://localhost:5000`;
        this.tableEle = document.createElement("table");
        this.AddBtn = document.createElement("button");
        this.AddBtn.classList.add("create-btn");
        this.AddBtn.addEventListener('click', () => this.addUser());
        this.addContainer = document.querySelector('.AddContainer');
        this.initialize();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.myURL + '/users');
            const data = yield response.json();
            for (let key in data[0]) {
                if (this.col.indexOf(key) < 0 && (key !== "id")) {
                    this.col.push(key);
                }
            }
            data.forEach((ob) => {
                this.users.push(new User(ob.id, ob.firstname, ob.middlename, ob.lastname, ob.email, ob.phone, ob.role, ob.address));
            });
        });
    }
    load() {
        this.tableEle = document.createElement("table");
        let tr = this.tableEle.insertRow(-1);
        for (let i = 0; i < this.col.length; i++) {
            let th = tr.insertCell(i);
            th.innerHTML = this.col[i];
        }
        this.AddBtn.innerHTML = "Add User";
        this.addContainer.append(this.AddBtn);
        this.users.forEach((user) => this.loadTableContent(user));
    }
    loadTableContent(user) {
        let tr = document.createElement("tr");
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.addEventListener('click', () => this.update(user));
        editBtn.setAttribute('class', 'edit');
        let deleteBtn = document.createElement("button");
        deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener('click', () => this.delete(user));
        deleteBtn.classList.add("dlt");
        tr.innerHTML = `<td id = "fname">${user.firstName}</td>
                        <td id = "middle">${user.middleName}</td>
                        <td id = "last">${user.lastName}</td>
                        <td id = "email">${user.email}</td>
                        <td id = "phone">${user.phone}</td>
                        <td id = "role-cell">${user.role}</td>
                        <td id = "address">${user.address}</td>
                        `;
        tr.append(editBtn);
        tr.append(deleteBtn);
        this.tableEle.append(tr);
        this.tableContainer.innerHTML = "";
        this.tableContainer.append(this.tableEle);
    }
    addUser() {
        let tr = this.tableEle.insertRow(-1);
        let user;
        for (let cols in this.col) {
            let td = tr.insertCell(-1);
            td.contentEditable = "true";
            td.setAttribute('id', `${this.col[cols]}`);
            if (this.col[cols] == "role") {
                let select = document.createElement("select");
                select.classList.add("select");
                select.setAttribute('id', 'select');
                for (const i in Role) {
                    const option = document.createElement("option");
                    option.value = i;
                    option.textContent = i;
                    if (td.textContent === i) {
                        option.selected = true;
                    }
                    else
                        option.selected = false;
                    select.appendChild(option);
                }
                td.replaceWith(select);
            }
        }
        let submit = document.createElement("button");
        submit.classList.add('submit');
        submit.innerHTML = "Submit";
        tr.append(submit);
        submit.addEventListener("click", () => {
            for (let i = 0; i < this.col.length; i++) {
                let cell = tr.children[i];
                cell.contentEditable = "false";
            }
            let selectedrole;
            for (let i = 0; i <= 2; i++) {
                let s = tr.children[5].children[i];
                if (s.selected) {
                    selectedrole = s.textContent;
                }
            }
            user = {
                "id": 0,
                "firstName": tr.cells.namedItem('firstname').textContent,
                "middleName": tr.cells.namedItem('middlename').textContent,
                "lastName": tr.cells.namedItem('lastname').textContent,
                "email": tr.cells.namedItem('email').textContent,
                "phone": tr.cells.namedItem('phone').textContent,
                "role": selectedrole,
                "address": tr.cells.namedItem('address').textContent
            };
            this.create(user);
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const addURL = this.myURL + '/add';
            const response = yield fetch(addURL, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            });
            const response1 = yield fetch(this.myURL + '/users');
            const data1 = yield response1.json();
            const ob = data1[data1.length - 1];
            const newUser = {
                "id": ob.id,
                "firstName": ob.firstname,
                "middleName": ob.middlename,
                "lastName": ob.lastname,
                "email": ob.email,
                "phone": ob.phone,
                "role": ob.role,
                "address": ob.address
            };
            this.users.push(newUser);
            this.load();
        });
    }
    read() {
        return this.users;
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = findIndexByID(user.id, this.users);
            let tr = this.tableEle.children[index + 1];
            let editbtn = tr.children[tr.children.length - 2];
            let dltbtn = tr.children[tr.children.length - 1];
            let cell = tr.cells.namedItem("role-cell");
            if (editbtn.innerHTML === "Edit") {
                tr.contentEditable = "true";
                editbtn.innerHTML = "Save";
                dltbtn.innerHTML = "Cancel";
                editbtn.contentEditable = "false";
                dltbtn.contentEditable = "false";
                let select = document.createElement("select");
                select.classList.add("select");
                select.setAttribute('id', 'select');
                for (const i in Role) {
                    const option = document.createElement("option");
                    option.value = i;
                    option.textContent = i;
                    if (cell.textContent === i) {
                        option.selected = true;
                    }
                    else
                        option.selected = false;
                    select.appendChild(option);
                }
                cell.replaceWith(select);
            }
            else {
                this.save(user);
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = findIndexByID(user.id, this.users);
            let tr = this.tableEle.children[index + 1];
            let editbtn = tr.children[tr.children.length - 2];
            let dltbtn = tr.children[tr.children.length - 1];
            let fnameCell = tr.cells.namedItem("fname");
            let middlenameCell = tr.cells.namedItem("middle");
            let lastnameCell = tr.cells.namedItem("last");
            let emailCell = tr.cells.namedItem("email");
            let phoneCell = tr.cells.namedItem("phone");
            let addressCell = tr.cells.namedItem("address");
            let selectCell = tr.cells.namedItem("select");
            tr.contentEditable = "false";
            editbtn.innerHTML = "Edit";
            dltbtn.innerHTML = "Delete";
            const updateURL = this.myURL + '/update/' + `${user.id}`;
            user.firstName = fnameCell.textContent;
            user.middleName = middlenameCell.textContent;
            user.lastName = lastnameCell.textContent;
            user.email = emailCell.textContent;
            user.phone = phoneCell.textContent;
            user.address = addressCell.textContent;
            for (let i = 0; i <= 2; i++) {
                let s = tr.children[5].children[i];
                if (s.selected) {
                    user.role = s.textContent;
                }
            }
            let td = document.createElement("td");
            td.setAttribute('id', 'role-cell');
            tr.children[5].replaceWith(td);
            let roleCell = tr.cells.namedItem('role-cell');
            roleCell.innerHTML = user.role;
            const mybody = {
                "id": user.id,
                "firstName": user.firstName,
                "middleName": user.middleName,
                "lastName": user.lastName,
                "email": user.email,
                "phone": user.phone,
                "role": user.role,
                "address": user.address
            };
            const response = yield fetch(updateURL, {
                method: 'PUT',
                body: JSON.stringify(mybody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = findIndexByID(user.id, this.users);
            let tr = this.tableEle.children[index + 1];
            let dltbtn = tr.children[tr.children.length - 1];
            if (dltbtn.innerHTML === "Delete") {
                const deleteURL = this.myURL + '/delete/' + `${user.id}`;
                const response = yield fetch(deleteURL, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });
                tr.remove();
                this.users.splice(index, 1);
                this.load();
            }
            else {
                this.cancel(user);
            }
        });
    }
    cancel(user) {
        let index = findIndexByID(user.id, this.users);
        let tr = this.tableEle.children[index + 1];
        let editbtn = tr.children[tr.children.length - 2];
        let dltbtn = tr.children[tr.children.length - 1];
        tr.contentEditable = "false";
        dltbtn.innerHTML = "Delete";
        editbtn.innerHTML = "Edit";
        this.load();
    }
    refresh() {
        this.users = [];
        this.initialize();
        this.load();
    }
}
//# sourceMappingURL=UserCRUD.js.map