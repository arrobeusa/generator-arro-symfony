Feature: Basic CRUD Operations

  @fixtures.load
  Scenario: Default

    Given I am on the homepage
    Then I should see a grid with a list of 3 features
    And I should see a Create New Feature button

    When I fill in input with name "featureName" with value "Manage Widgets"
    When I click the Create New Feature button
    Then I should see a new feature with name "Manage Widgets"

    And each row of the grid should have an Edit button
    When I click on the Edit Button for a Feature
    Then I should see the edit menu
    When I fill in input with name "editFeatureName" with value "A feature (edited)"
    Then I should see a new feature with name "A feature (edited)"

  @fixtures.load
  Scenario: Activate and Disable a Feature

    Given I am on the homepage
    Then I should see a grid with a list of 3 features
    And each row of the grid should have an Activate button

    # disable a feature
    When I click on the Disable button for a Feature
    Then the Feature should now have an Activate button

    # activate a feature
    When I click on the Activate button for a Feature
    Then the Feature should now have a Disable button


#  Scenario: An unauthenticated User
#  Scenario: An authenticated User

