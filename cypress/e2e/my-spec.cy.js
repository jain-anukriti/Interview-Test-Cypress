//Author : Anukriti Jain : j.anukriti210@gmail.com

// Implementing POM design principle to separate functions and locators from spec file
import { ContactAppPage } from "../support/pages/contact-list-app-page"

//Creating reference variable of contact page class to access all the CRUD and helper functions
const contactAppPage = new ContactAppPage()

describe('Test Contact App', () => {

    //Used for storing content of json file having different contact data
    var testContactData;

    beforeEach(() => {
        cy.visit('./contact_app.html')

        //Getting contact test data from json file in fixture folder to be reused by most tests
        cy.fixture('test-contact').then((testContact) => {
            testContactData = testContact;
        })
    })
    //Test1
    it('Test if the application loads correctly', () => {
        cy.get('h1.text-center').should('have.text', 'Contact List App');
        contactAppPage.getTableRowElement().should('have.length', 1)
    })

    describe('Test Add functionality', () => {

        //Cleanup to delete rows which were added for tests
        afterEach(() => {
            contactAppPage.cleanUpTestContacts()
        })

        //Test2
        it('Test if a valid contact is added successfully', () => {
            //Adding valid test data from fixture file
            const name = testContactData.validData[0].name
            const phone = testContactData.validData[0].phone
            const email = testContactData.validData[0].email

            contactAppPage.addContact(name, phone, email)

            //Verify if a new row is added
            contactAppPage.getTableRowElement().should('have.length', 2)

            //Verify the content of the fields
            contactAppPage.getNameByIndex(1).should('contain', name)
            contactAppPage.getPhoneByIndex(1).should('contain', phone)
            contactAppPage.getEmailByIndex(1).should('contain', email)

        })

        //Test3
        //Assuming adding exact duplicate contact where all fields are same, is not allowed
        it('Test if unable to add exact duplicate contact', () => {
            const name = testContactData.validData[0].name
            const phone = testContactData.validData[0].phone
            const email = testContactData.validData[0].email

            //Adding 2 contacts with same fields
            contactAppPage.addContact(name, phone, email)
            contactAppPage.addContact(name, phone, email)

            //Verifying that only 1 record is added
            contactAppPage.getTableRowElement().should('have.length', 2)
        })

        //Test4
        it('Test if able to add multiple valid customers', () => {
            var rows_added = 1

            testContactData.validData.forEach((data) => {
                contactAppPage.addContact(data.name, data.phone, data.email)
                rows_added++
            });
            //Verify all records are added
            contactAppPage.getTableRowElement().should('have.length', rows_added)

        })

        //Test5
        //Assuming invalid name should NOT be added, FAILS if any contact record is added
        it('Test if unable to add invalid name', () => {
            //Adding inavlid names from fixture file
            const phone = testContactData.validData[0].phone
            const email = testContactData.validData[0].email

            testContactData.invalidNames.forEach((invalidName) => {
                contactAppPage.addContact(invalidName, phone, email)
            });
            //Verify if no new row is added
            contactAppPage.getTableRowElement().should('have.length', 1)

        })

        //Test6
        //Assuming invalid phone number should NOT be added, FAILS if any contact record is added
        it('Test if unable to add invalid phone number', () => {
            //Adding invalid phone numbers from fixture file
            const name = testContactData.validData[0].name
            const email = testContactData.validData[0].email

            testContactData.invalidPhones.forEach((invalidPhone) => {
                contactAppPage.addContact(name, invalidPhone, email)
            });
            //Verify if no new row is added
            contactAppPage.getTableRowElement().should('have.length', 1)

        })

        //Test7
        //Assuming invalid email ID should NOT be added, FAILS if any contact record is added
        it('Test if unable to add invalid emailID', () => {
            //Adding invalid email IDs from fixture file
            const name = testContactData.validData[0].name
            const phone = testContactData.validData[0].phone

            testContactData.invalidEmails.forEach((invalidEmail) => {
                contactAppPage.addContact(name, phone, invalidEmail)
            });
            //Verify if no new row is added
            contactAppPage.getTableRowElement().should('have.length', 1)
        })

        //Test8
        it('Test if unable to add just by clicking Add button', () => {
            //Directly clicking on Add button, shouldn't add empty fields as contact record
            contactAppPage.clickAddButton()
            //Verify if no new row is added
            contactAppPage.getTableRowElement().should('have.length', 1)
        })

        //Test9
        it('Test if all textfields after adding remain empty', () => {
            const name = testContactData.validData[0].name
            const phone = testContactData.validData[0].phone
            const email = testContactData.validData[0].email

            contactAppPage.addContact(name, phone, email)

            //Verify all textfields are empty
            cy.get(contactAppPage.name_textbox).should('be.empty')
            cy.get(contactAppPage.phone_textbox).should('be.empty')
            cy.get(contactAppPage.email_textbox).should('be.empty')
        })

    })

    describe('Test Edit functionality', () => {

        //Cleanup to delete rows which were added for tests
        afterEach(() => {
            contactAppPage.cleanUpTestContacts()
        })

        //Test10
        it('Test if contact name is updated successfully, with other fields remaining unchanged', () => {
            const name = testContactData.validData[0].name
            const phone = testContactData.validData[0].phone
            const email = testContactData.validData[0].email

            const newName = testContactData.newValidData.name

            contactAppPage.addContact(name, phone, email)

            //editing name only and saving
            contactAppPage.editName(1, newName)

            //Verify the content of the fields
            contactAppPage.getNameByIndex(1).should('contain', newName)
            contactAppPage.getPhoneByIndex(1).should('contain', phone)
            contactAppPage.getEmailByIndex(1).should('contain', email)
        })

       //Test11
        it('Test if contact phone number is updated successfully, with other fields remaining unchanged', () => {
            const name = testContactData.validData[0].name
            const phone = testContactData.validData[0].phone
            const email = testContactData.validData[0].email

            const newPhone = testContactData.newValidData.phone

            contactAppPage.addContact(name, phone, email)

            //editing only phone
            contactAppPage.editPhone(1, newPhone)

            //Verify the content of all the fields
            contactAppPage.getPhoneByIndex(1).should('contain', newPhone)
            contactAppPage.getNameByIndex(1).should('contain', name)
            contactAppPage.getEmailByIndex(1).should('contain', email)
        })

        //Test12
        it('Test if contact email ID is updated successfully, with other fields remaining unchanged', () => {
            const name = testContactData.validData[0].name
            const phone = testContactData.validData[0].phone
            const email = testContactData.validData[0].email

            const newEmail = testContactData.newValidData.email

            contactAppPage.addContact(name, phone, email)

            //editing only email ID
            contactAppPage.editEmail(1, newEmail)

            //Verify the content of the fields
            contactAppPage.getEmailByIndex(1).should('contain', newEmail)
            contactAppPage.getNameByIndex(1).should('contain', name)
            contactAppPage.getPhoneByIndex(1).should('contain', phone)
        })

        //Test13
        it('Test if contacts all fields are updated successfully', () => {
            const name = testContactData.validData[0].name
            const phone = testContactData.validData[0].phone
            const email = testContactData.validData[0].email

            const newName = testContactData.newValidData.name
            const newPhone = testContactData.newValidData.phone
            const newEmail = testContactData.newValidData.email

            contactAppPage.addContact(name, phone, email)

            //editing all the fields together
            contactAppPage.editAll(1, newName, newPhone, newEmail)

            //Verify the content of the fields
            contactAppPage.getNameByIndex(1).should('contain', newName)
            contactAppPage.getPhoneByIndex(1).should('contain', newPhone)
            contactAppPage.getEmailByIndex(1).should('contain', newEmail)
        })

        //Test14
        it('Test if able to edit the email of last record out of the multiple records', () => {
            var rows_added = 0

            const newEmail = testContactData.newValidData.email

            testContactData.validData.forEach((data) => {
                contactAppPage.addContact(data.name, data.phone, data.email)
                rows_added++
            });

            //editing only email ID of the last record added
            contactAppPage.editEmail(rows_added, newEmail)

            //Verify the content of the fields
            contactAppPage.getNameByIndex(rows_added).should('contain', testContactData.validData[rows_added-1].name)
            contactAppPage.getPhoneByIndex(rows_added).should('contain', testContactData.validData[rows_added - 1].phone)
            contactAppPage.getEmailByIndex(rows_added).should('contain', newEmail)
        })
    })

    describe('Test Delete functionality', () => {

        //Test15
        it('Test if contact is deleted successfully', () => {
            const name = testContactData.validData[0].name
            const phone = testContactData.validData[0].phone
            const email = testContactData.validData[0].email
            contactAppPage.addContact(name, phone, email)

            //Delete added contact
            contactAppPage.deleteContact(1)

            //Verify if the record is not there
            contactAppPage.getTableRowElement().should('not.have.text', phone)
            contactAppPage.getTableRowElement().should('have.length', 1)
        })

        //Test16
        it('Test if second contact is deleted out of the multiple records', () => {
            var rows_added = 1

            testContactData.validData.forEach((data) => {
                contactAppPage.addContact(data.name, data.phone, data.email)
                rows_added++
            });

            //Delete second added contact
            contactAppPage.deleteContact(2)

            //Verify if the second record is deleted
            contactAppPage.getTableRowElement().should('not.have.text', testContactData.validData[1].phone)
            contactAppPage.getTableRowElement().should('have.length', rows_added - 1)
        })

        //Test17
        it('Test if multiple contacts are deleted', () => {
            var rows_added = 1

            testContactData.validData.forEach((data) => {
                contactAppPage.addContact(data.name, data.phone, data.email)
                rows_added++
            });

            //Delete all contacts one by one
            for (var i = 1; i < rows_added; i++) {
                contactAppPage.deleteContact(1)
            }

            //Verify if no row is left
            contactAppPage.getTableRowElement().should('have.length', 1)
        })
    })
})
