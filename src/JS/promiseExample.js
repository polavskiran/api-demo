const user1 = {
    firstName: "kiran",
    lastName: "kumar"
};

const user2 = {
    firstName: "Swathi",
    lastName: "Lakshmi",
    getFullName: function fullName(city) {
        console.log(`my name is ${this.firstName} ${this.lastName} and I live in ${city}`)
    }
};

user2.getFullName.call(user1, ['Bangalore']);
user2.getFullName('Kakinada');

let fullName = user2.getFullName.bind(user1);
fullName('Visakhapatnam');