import CallCenterPage from "../PageObjects/CallCenterPage";
import NavigationPage from "../PageObjects/NavigationPage";

const callCenterPage = new CallCenterPage();
const navigate = new NavigationPage();

class CallCenterStep{

    //filling all the required domains before proceeding to adding numbers
    setUpBeforeAddingNumbers(){
        callCenterPage.clickOnUploadDnc();
        callCenterPage.selectCountryAsUsa();
        callCenterPage.selectCampaign()
    }

    //adding the numbers and verifying that the numbers are added
    addNumbersAndVerify(value){
        callCenterPage.addNumbersAndVerify(value)
    }

    //searching the added numbers
    searchAddedNumbers(value){
        navigate.navigateToDnc()
        callCenterPage.filterByCampaign()
        callCenterPage.selectGlobalDnc(value)
        callCenterPage.clickSearch()
    }

    //Editing the penultimate number from the list and verifying
    editAndVerifyNumber(newValue){
        callCenterPage.penultimateNumberFinder()
        callCenterPage.clickActionButton()
        callCenterPage.editAndChangeAutomationCampaign(newValue)
    }

    //verify the updated penultimate number and settings
    verifyUpdatedNumberAndSetting(value,setting){
        callCenterPage.checkAddedNumbers(value)
        //adding a small wait period for the end user to see that the phone is updated and campaign is set to automation
        cy.wait(1000)
        callCenterPage.verifyUpdatedCampaign(setting)
    }

    //not completed
    searchForBothCampaign(campaign1,campaign2){
        navigate.navigateToDnc()
        callCenterPage.filterByCampaign()
        callCenterPage.selectGlobalDnc(campaign1)
        callCenterPage.selectGlobalDnc(campaign2)
        callCenterPage.clickSearch()
    }

}
export default CallCenterStep;