import { BaseModel } from "./base";

export class Person {
    constructor(name, age, email, city, street, streetNumber, birthday) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
        this.birthday = birthday;
    }
}

export class DataFormModel extends BaseModel {
    constructor(page) {
        super(page);

        this.person = new Person("John", 23, "john@company.com", "New York", "5th Avenue", 11, new Date("06 March 1975").toISOString());

        this.metadata = {
            isReadOnly: false,
            commitMode: "Immediate",
            validationMode: "Immediate",
            propertyAnnotations:
            [
                {
                    name: "name",
                    displayName: "Name",
                    index: 0
                },
                {
                    name: "age",
                    displayName: "Age",
                    index: 1,
                    editor: "Number"
                },
                {
                    name: "email",
                    displayName: "E-Mail",
                    index: 2,
                    editor: "Email"
                },
                {
                    name: "city",
                    displayName: "City",
                    index: 3,
                    editor: "Picker",
                    valuesProvider: ["New York", "Washington", "Los Angeles"]
                },
                {
                    name: "street",
                    displayName: "Street Name",
                    index: 4
                },
                {
                    name: "streetNumber",
                    displayName: "Street Number",
                    index: 5,
                    editor: "Number"
                },
                {
                    name: "birthday",
                    displayName: "Birthday",
                    index: 6,
                    editor: "Date"
                }
            ]
        };
    }
}

export function navigatingTo({ object: page }) {
    page.bindingContext = new DataFormModel(page);
}
