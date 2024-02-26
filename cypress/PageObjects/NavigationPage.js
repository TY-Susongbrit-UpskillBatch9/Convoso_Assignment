class NavigationPage {

    //method used for navigating to DNC section
    navigateToDnc(){
        cy.get('[ng-hide="tooSmalltoShow"]').contains('Call Center').should('be.visible').click();
        cy.get('#main-navbar-collapse > ul > li.dropdown.open > ul > li').each(($el) =>{
            if($el.text() === 'DNC'){
                cy.wrap($el).click();
            }
        })
    }
}
export default NavigationPage;