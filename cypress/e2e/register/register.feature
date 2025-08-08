Feature: Register
    Scenario: Register with valid data
        Given I am on the register page
        When I fill the register form with valid data
        Then I should be redirected to the home page