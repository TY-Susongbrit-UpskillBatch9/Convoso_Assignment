import Miscellaneous from "./miscellaneousPage";

class LoginPage{

    //method created for entering the credentials and click on login button in login page
    loginToConvoso(username , password){
        cy.get('[id="username"]').click().type(username);
        cy.get('[id="password"]').click().type(password);
        cy.get('[type="submit"]').should('be.visible').click();
    }

}
export default LoginPage;