
enum Role {
    superadmin = 'superadmin',
    admin= 'admin',
    subscriber = 'subscriber'
}


class User {
    

        constructor(public id: number,public firstName:string, public middleName :string, public lastName:string,public email:string,
            public phone: string,public role: string, public address: string)
        {
     
        }
     }

export { User, Role };