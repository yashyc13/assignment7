var Role;
(function (Role) {
    Role["superadmin"] = "superadmin";
    Role["admin"] = "admin";
    Role["subscriber"] = "subscriber";
})(Role || (Role = {}));
class User {
    constructor(id, firstName, middleName, lastName, email, phone, role, address) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.address = address;
    }
}
export { User, Role };
//# sourceMappingURL=user.js.map