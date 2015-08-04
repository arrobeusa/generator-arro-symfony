Feature: Basic CRUD Operations

  @fixtures.load
  Scenario: Default

    Given I am on the homepage
    Then I should see a grid with a list of 3 <%= pluralResourceNameLower %>
    And I should see a Create New <%= resourceName %> button

    When I fill in input with name "<%= resourceNameLower %>Name" with value "Manage Widgets"
    When I click the Create New <%= resourceName %> button
    Then I should see a new <%= resourceNameLower %> with name "Manage Widgets"

    And each row of the grid should have an Edit button
    When I click on the Edit Button for a <%= resourceName %>
    Then I should see the edit menu
    When I fill in input with name "edit<%= resourceName %>Name" with value "A <%= resourceNameLower %> (edited)"
    Then I should see a new <%= resourceNameLower %> with name "A <%= resourceNameLower %> (edited)"

#  Scenario: An unauthenticated User
#  Scenario: An authenticated User

