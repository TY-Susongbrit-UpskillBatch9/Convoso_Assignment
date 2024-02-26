let data;
class CallCenterPage{

    //clicking on upload DNC button
    clickOnUploadDnc(){
        cy.get('[class="btn-label icon fa fa-upload"]',{timeout : 5000}).click();
        //verify that you are redirected to the DNC upload page
        cy.title().should('eq','Upload DNC')
    }

    //selecting country
    selectCountryAsUsa(){
       cy.get('[ng-model="data.country_id_number"]',{timeout : 5000}).select('+1 United States')
    }

    //select campaign option
    selectCampaign(){
        cy.get('[ng-model="data.campaign_id_number"]',{timeout : 5000}).select('Global DNC List')
    }

    //adding and verifying that the numbers are added
    addNumbersAndVerify(values){
        cy.get('[id="number"]').click().type(values)
        cy.get('[ng-click="addNumber()"]').click();
        cy.get('[class="note note-success ng-binding"]').eq(1).contains(`Added DNC number ${values} to Global DNC List`)
        cy.get('[ng-model="data.number"]').click().clear()
    }

    //filtering by campaign
    filterByCampaign(){
        cy.get('[ng-model="selectOptions[key_f].name"]',{timeout : 5000}).select('Campaign')
    }

    //filtering by selecting either Global DNC or Automation Campaign
    selectGlobalDnc(value){
        cy.get('input[type="text"]').eq(0).click();
        cy.get('[data-value]').contains(value).click();
    }

    //clicking on Search button
    clickSearch(){
        cy.get(`[ng-click="search('')"]`).click();
       
    }

    //verifying if the numbers are added under DNC manager table
    checkAddedNumbers(value){
        cy.get('table[class="table table-striped"] >tbody >tr >td:nth-child(2)').each(($phoneNumber)=>{
            data = $phoneNumber.text();
            if(data == value){
                cy.log(`The added numbers ${value} is equal to the number ${data} visible in the table`)
            }
        })
    }

    //finding the penultimate number
    penultimateNumberFinder(){
        cy.get('table[class="table table-striped"] >tbody >tr >td:nth-child(2)').eq(8).then(($val)=>{
        let penNumber = $val.text();
        cy.log(penNumber)
        })
    }

    //clicking Edit in Actions area
    clickActionButton(){
        cy.get('[class="btn btn-info dropdown-toggle"]',{timeout : 5000}).eq(8).click();
        cy.get('table[class="table table-striped"] >tbody >tr >td:nth-child(5)>div>ul > li:first-child > a')
            .eq(8)
            .click()
    }

    //edit the number and change it to automation campaign and apply
    editAndChangeAutomationCampaign(newValue){
        cy.get('[ng-model="data.CurrentGeneralOptions.campaign_id"]').select('Automation Campaign')
        cy.get('[ng-model="data.CurrentGeneralOptions.phone_number"]').click().clear().type(newValue)
        cy.get('[id="send-email"]').click();
    }

    //verify updated settings/campaign in the phone Number table
    verifyUpdatedCampaign(value){
        cy.get('table[class="table table-striped"] >tbody >tr >td:nth-child(3) > a').then(($value)=>{
            if($value.text() == value){
                cy.log(`Setting is updated as expected to ${value}`)
            }
        })
    }

    //delete all the phone numbers from selected campaign
    deleteAllPhoneNumber(value){ 
        cy.request({
            method : 'POST',
            url : 'https://admin-dt.convoso.com/dnc/search',
            headers : {
              username: Cypress.env('username'),
              password: Cypress.env('password'),
            },
            body:
            {
            "name" : "id",
            "value" : "DESC",
            "page" : 0,
            "selectOptions" : [
                {
                    "name": "campaign_id",
                    "operator": "IN"
                }
              ]
            }
          })
          .then((res)=>{
            cy.log(JSON.stringify(res.body))
            const userId =  res.body.data.results[value].id
            cy.log(userId)
            cy.request({
                method : 'DELETE',
                url : `https://admin-dt.convoso.com/dnc/${userId}/delete?id=${userId}`,
                headers : {
                    username: Cypress.env('username'),
                    password: Cypress.env('password'),
                  },
            })
            .then((response)=>{
                expect(response.status).to.eq(200)
            })

          })
    }

    //getting the length of phoneNumber rows then deleting them by fetching the id for the particular row index
    deletePhoneNumbersInSelectedCampaign(){ 
        cy.get('table[class="table table-striped"] >tbody >tr >td:nth-child(2)').then(($val)=>{
           const len = $val.length
            for(let i = len-1; i>=0 ; i--){
                cy.wrap(i).then((index) => {
                    this.deleteAllPhoneNumber(index);
                  })
            }
         })
    }

}
export default CallCenterPage;