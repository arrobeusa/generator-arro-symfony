Feature: <%= pluralResourceName %> API

  @fixtures.load
  Background:
    Given request headers:
      | key          | value            |
      | Content-Type | application/json |
      | Accept       | application/json |


  Scenario: Show a list of <%= pluralResourceName %>

    #Given I am a user with security token "IAmAValidToken"

    When I make a GET request to "/<%= pluralResourceNameLower %>/"
    Then the status code should be 200
    Then the response should be:
    """
    [
      {
        "id": "5467ab88e8a2582108000000",
        "name": "A really cool new <%=resourceName %> "
      },
      {
        "id": "55be97418e6e627140000007",
        "name": "Another new <%=resourceName %>"
      },
      {
        "id": "55be8ee58e6e627140000000",
        "name": "One more cool <%=resourceName %>"
      }
    ]
    """

  Scenario: Create a new <%= resourceName %>

    Given body of request:
    """
    {
        "name": "A different <%= resourceName %> that I created (in the test environment)."
    }
    """
    When I make a POST request to "/<%= pluralResourceNameLower %>/"
    Then the status code should be 200

    Then the response should be the following, taking into account that "id" are dynamic fields
    """
    {
      "id": "",
      "name": "A different <%= resourceName %> that I created (in the test environment)."
    }
    """

  Scenario: Update an existing <%= resourceName %>

    Given body of request:
    """
    {
        "id": "5467ab88e8a2582108000000",
        "name": "An existing <%= resourceName %> that I am updating"
    }
    """
    When I make a PUT request to "/<%= pluralResourceNameLower %>/5467ab88e8a2582108000000/"
    Then the status code should be 200
    Then the response should be:
    """
    {
      "id": "5467ab88e8a2582108000000",
      "name": "An existing <%= resourceName %> that I am updating"
    }
    """

    When I make a GET request to "/<%= pluralResourceNameLower %>/5467ab88e8a2582108000000/"
    Then the status code should be 200
    Then the response should be:
    """
    {
      "id": "5467ab88e8a2582108000000",
      "name": "An existing <%= resourceName %> that I am updating"
    }
    """

  Scenario: Disable a <%= resourceName %>

    Given body of request:
    """
    {
        "id": "5467ab88e8a2582108000000",
        "name": "An existing <%= resourceName %> that I am disabling"
    }
    """
    When I make a PUT request to "/<%= pluralResourceNameLower %>/5467ab88e8a2582108000000/"
    Then the status code should be 200
    Then the response should be:
    """
    {
      "id": "5467ab88e8a2582108000000",
      "name": "An existing <%= resourceName %> that I am disabling"
    }
    """

    When I make a GET request to "/<%= pluralResourceNameLower %>/5467ab88e8a2582108000000/"
    Then the status code should be 200
    Then the response should be:
    """
    {
      "id": "5467ab88e8a2582108000000",
      "name": "An existing <%= resourceName %> that I am disabling"
    }
    """

  @fixtures.load
  Scenario: User has a valid token but requesting resources that do not exist (404)

#    Given I am a user with security token "IAmAValidToken"

    When I make a GET request to "/<%= pluralResourceNameLower %>/12345"
    Then the status code should be 404

    When I make a PUT request to "/<%= pluralResourceNameLower %>/12345/"
    Then the status code should be 404


#  @fixtures.load
#  Scenario: Invalid Create and Update requests
#
#    #Given I am a user with security token "XXXXX"
#
#    And an empty request body
#    When I make a POST request to "/<%= pluralResourceNameLower %>/"
#    Then the status code should be 400
#
#    Given body of request:
#    """
#    {
#        "name": ""
#    }
#    """
#    When I make a POST request to "/<%= pluralResourceNameLower %>/"
#    Then the status code should be 400
#
#    Given body of request:
#    """
#    {
#        "bad_column_name": ""
#    }
#    """
#    When I make a POST request to "/<%= pluralResourceNameLower %>/"
#    Then the status code should be 400




#    # <%= resourceName %> Update
#    And an empty request body
#    When I make a PUT request to "/<%= pluralResourceNameLower %>/5467ab88e8a2582108000000/"
#    Then the status code should be 400
#
#    Given body of request:
#    """
#    {
#        "name": ""
#    }
#    """
#    When I make a PUT request to "/<%= pluralResourceNameLower %>/5467ab88e8a2582108000000/"
#    Then the status code should be 400
#
#    Given body of request:
#    """
#    {
#        "bad_column_name": ""
#    }
#    """
#    When I make a PUT request to "/<%= pluralResourceNameLower %>/5467ab88e8a2582108000000/"
#    Then the status code should be 400
#
#  Scenario: Request with an invalid token
#
##    Given I am a user with security token "XYZ"
#
#    When I make a GET request to "/<%= pluralResourceNameLower %>/"
##    Then the status code should be 403

