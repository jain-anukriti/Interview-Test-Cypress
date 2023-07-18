export class ContactAppPage {

    table_rows_tr = 'table tbody tr'
    name_textbox = 'input[placeholder = "Name"]'
    phone_textbox = 'input[placeholder = "Phone"]'
    email_textbox = 'input[placeholder = "Email"]'
    add_button = 'Add'
    edit_button = 'button[name="edit"]'
    update_button = 'button[name="update"]'
    delete_button = 'button[name="delete"]'
    td_element = 'td'
    input_field = 'input'

    addContact(name, phoneNumber, emailId) {
        this.enterName(name)
        this.enterPhoneNumber(phoneNumber)
        this.enterEmailId(emailId)
        this.clickAddButton()
    }

    editName(index, newName) {
        this.clickEditButton(index)
        this.getNameByIndex(index).get(this.input_field).eq(0).clear().type(newName)
        this.clickUpdateButton()
    }

    editPhone(index, newPhone) {
        this.clickEditButton(index)
        this.getPhoneByIndex(index).get(this.input_field).eq(1).clear().type(newPhone)
        this.clickUpdateButton()
    }

    editEmail(index, newEmail) {
        this.clickEditButton(index)
        this.getEmailByIndex(index).get(this.input_field).eq(2).clear().type(newEmail)
        this.clickUpdateButton()
    }

    editAll(index, newName, newPhone, newEmail) {
        this.clickEditButton(index)
        this.getNameByIndex(index).get(this.input_field).eq(0).clear().type(newName)
        this.getPhoneByIndex(index).get(this.input_field).eq(1).clear().type(newPhone)
        this.getEmailByIndex(index).get(this.input_field).eq(2).clear().type(newEmail)
        this.clickUpdateButton()
    }

    deleteContact(index) {
        this.clickDeleteButton(index)
    }

    cleanUpTestContacts() {
        cy.get(this.delete_button).each(($ele) => {
            cy.wrap($ele).click({ multiple: true, force: true })
        })
    }

    enterName(name) {
        cy.get(this.name_textbox).type(name)
    }

    enterPhoneNumber(phoneNumber) {
        cy.get(this.phone_textbox).type(phoneNumber)
    }

    enterEmailId(emailId) {
        cy.get(this.email_textbox).type(emailId)
    }

    clickAddButton() {
        cy.contains(this.add_button).click()
    }

    clickEditButton(index) {
        cy.get(this.edit_button).eq(index-1).click()
    }

    clickUpdateButton() {
        cy.get(this.update_button).first().click()
    }

    clickDeleteButton(index) {
        cy.get(this.delete_button).eq(index-1).click()
    }

    getTableRowElement() {
        return cy.get(this.table_rows_tr)
    }

    getTableRowLength() {
        cy.get(this.table_rows_tr).then(($value) => {
            length = $value.length
            return length
        })
    }

    getNameByIndex(index) {
        return cy.get(this.table_rows_tr).eq(index).children().eq(0)
    }

    getPhoneByIndex(index) {
        return cy.get(this.table_rows_tr).eq(index).children().eq(1)
    }

    getEmailByIndex(index) {
        return cy.get(this.table_rows_tr).eq(index).children().eq(2)
    }

}