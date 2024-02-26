class Miscellaneous{

    //removes the warning pop-up just after login
    removeWarning(){
        cy.get('#warningModal > div > div > div.modal-footer > button:nth-child(2)',{timeout : 5000}).click({force: true}); 
    }

}
export default Miscellaneous;