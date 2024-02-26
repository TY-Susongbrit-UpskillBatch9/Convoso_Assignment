import LoginPage from "../PageObjects/LoginPage";
import Miscellaneous from "../PageObjects/miscellaneousPage";

const login = new LoginPage();
const warning = new Miscellaneous();

class LoginSteps{

//signing in and verifying after login if it landing on the Dashboard page
   loginAndVerifyConvoso(username,password){
    login.loginToConvoso(username,password)
    warning.removeWarning();
    cy.title().should('eq','Dashboard')
    cy.url().should('exist');
   }

}
export default LoginSteps