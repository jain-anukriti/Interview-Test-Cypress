**About project:**

POM design architecture is implemented. All the CRUD functions, locators and helper functions are present at cypress/support/pages/contact-list-app-page.js

The test data is present at fixture/test-contact.json file.

There is a cleanup after every test that result in creation of contact record.

my-spec.cy.js consists of 13 test cases.

The test cases are divided into 3 sections as per functionality(Add, Edit, Delete) using describe block.



**Details regarding tests:**

**Test1: Tests if the application loads correctly**

Result: PASS


**Test2: Tests if a valid contact is added successfully** 

Result: PASS


**Test3: Tests if unable to add exact duplicate contact** (assuming adding exact duplicate contact where all fields are same, is not allowed) : 

Result: FAIL, Duplicate records were added.


**Test4: Tests if unable to add invalid name** (assuming invalid name should NOT be added, FAILS if any contact record is added)

Result: FAIL, Able to add multiple records with different invalid names.


**Test5: Tests if unable to add invalid phone number** (Assuming invalid phone number should NOT be added, FAILS if any contact record is added)

Result: FAIL, Able to add multiple records with different invalid phone numbers.


**Test6: Tests if unable to add invalid emailID** (Assuming invalid email ID should NOT be added, FAILS if any contact record is added)

Result: FAIL, Able to add multiple records with different invalid email IDs.


**Test7: Tests if unable to add just by clicking Add button** (Directly clicking on Add button, shouldn't add empty fields as contact record)

Result: FAIL, Able to add empty record without entering any value in any field, not expected


**Test8: Tests if all textfields after adding remain empty**

Result: PASS


**Test9: Tests if contact name is updated successfully, with other fields remaining unchanged**

Result: FAIL, After updating name the other fields are becoming blank and getting saved.


**Test10: Tests if contact phone number is updated successfully, with other fields remaining unchanged**

Result: PASS


**Test11: Tests if contact email ID is updated successfully, with other fields remaining unchanged**

Result: PASS


**Test12: Tests if contacts all fields are updated successfully**

Result: FAIL, only name is updated correctly, other field became blank.


**Test13: Tests if contact is deleted successfully**

Result: PASS



Below is the snippet of the test results:

![Tests_Cypress](https://github.com/jain-anukriti/Interview-Test-Cypress/assets/139177735/458050ea-9fba-4ff4-a411-b3e4e178b95d)



