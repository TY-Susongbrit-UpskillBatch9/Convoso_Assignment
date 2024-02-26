import LoginSteps from "../Steps/LoginSteps";
import NavigationPage from "../PageObjects/NavigationPage";
import CallCenterStep from "../Steps/CallCenterSteps";
import CallCenterPage from "../PageObjects/CallCenterPage";

describe("Convoso assignment", () => {
  let userData;
  let credentials;
  const callCenterSteps = new CallCenterStep();
  const navigate = new NavigationPage();
  const login = new LoginSteps();
  const callCenterPage = new CallCenterPage();
  const url = `${Cypress.env("url")}`;

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  before("login and global fixture", () => {
    cy.fixture("updateCredentials").then((data) => {
      userData = data;
    });
    cy.fixture("phoneNumber").then((data) => {
      credentials = data;
    });
  });

  it("perform all the required operations", () => {
    cy.visit(url);
    login.loginAndVerifyConvoso(
      Cypress.env("username"),
      Cypress.env("password")
    );
    navigate.navigateToDnc();
    callCenterSteps.setUpBeforeAddingNumbers();
    credentials.forEach((phoneNumber) => {
      callCenterSteps.addNumbersAndVerify(phoneNumber.number);
    });
    callCenterSteps.searchAddedNumbers(userData.Global_DNC);
    credentials.forEach((phoneNumber) => {
      callCenterPage.checkAddedNumbers(phoneNumber.number);
    });
    callCenterSteps.editAndVerifyNumber(userData.updatedNumber);
    callCenterSteps.searchAddedNumbers(userData.Automation_Campaign);
    callCenterSteps.verifyUpdatedNumberAndSetting(
      userData.updatedNumber,
      userData.Automation_Campaign
    );
  });

  //selecting both the campaign together and performing the delete api call
  after("removal of all phone Numbers", () => {
    callCenterSteps.searchForBothCampaign(
      userData.Automation_Campaign,
      userData.Global_DNC
    );
    callCenterPage.deletePhoneNumbersInSelectedCampaign();
    callCenterPage.clickSearch()
  });
});
