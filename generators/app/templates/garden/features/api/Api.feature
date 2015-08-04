Feature: Features API

  @fixtures.load
  Background:
    Given request headers:
      | key          | value            |
      | Content-Type | application/json |
      | Accept       | application/json |


  Scenario: Show a list of Features

    #Given I am a user with security token "IAmAValidToken"

    When I make a GET request to "/app_test.php/features/"
    Then the status code should be 200
    Then the response should be:
    """
    [
      {
        "id": "5467ab88e8a2582108000000",
        "name": "A really cool new feature ",
        "active": true
      },
      {
        "id": "55be97418e6e627140000007",
        "name": "Another new feature",
        "active": true
      },
      {
        "id": "55be8ee58e6e627140000000",
        "name": "One more cool feature",
        "active": true
      }
    ]
    """

  Scenario: Create a new Feature

    Given body of request:
    """
    {
        "name": "A different Feature that I created (in the test environment)."
    }
    """
    When I make a POST request to "/app_test.php/features/"
    Then the status code should be 200

    Then the response should be the following, taking into account that "id" are dynamic fields
    """
    {
      "id": "",
      "name": "A different Feature that I created (in the test environment).",
      "active": true
    }
    """

  Scenario: Update an existing Feature

    Given body of request:
    """
    {
        "id": "5467ab88e8a2582108000000",
        "name": "An existing Feature that I am updating",
        "active": true
    }
    """
    When I make a PUT request to "/app_test.php/features/5467ab88e8a2582108000000/"
    Then the status code should be 200
    Then the response should be:
    """
    {
      "id": "5467ab88e8a2582108000000",
      "name": "An existing Feature that I am updating",
      "active": true
    }
    """

    When I make a GET request to "/app_test.php/features/5467ab88e8a2582108000000/"
    Then the status code should be 200
    Then the response should be:
    """
    {
      "id": "5467ab88e8a2582108000000",
      "name": "An existing Feature that I am updating",
      "active": true
    }
    """

  Scenario: Disable a Feature

    Given body of request:
    """
    {
        "id": "5467ab88e8a2582108000000",
        "name": "An existing Feature that I am disabling",
        "active": false
    }
    """
    When I make a PUT request to "/app_test.php/features/5467ab88e8a2582108000000/"
    Then the status code should be 200
    Then the response should be:
    """
    {
      "id": "5467ab88e8a2582108000000",
      "name": "An existing Feature that I am disabling",
      "active": false
    }
    """

    When I make a GET request to "/app_test.php/features/5467ab88e8a2582108000000/"
    Then the status code should be 200
    Then the response should be:
    """
    {
      "id": "5467ab88e8a2582108000000",
      "name": "An existing Feature that I am disabling",
      "active": false
    }
    """

  @fixtures.load
  Scenario: User has a valid token but requesting resources that do not exist (404)

#    Given I am a user with security token "IAmAValidToken"

    When I make a GET request to "/app_test.php/features/12345"
    Then the status code should be 404

    When I make a PUT request to "/app_test.php/features/12345/"
    Then the status code should be 404


#  @fixtures.load
#  Scenario: Invalid Create and Update requests
#
#    #Given I am a user with security token "XXXXX"
#
#    And an empty request body
#    When I make a POST request to "/app_test.php/features/"
#    Then the status code should be 400
#
#    Given body of request:
#    """
#    {
#        "name": ""
#    }
#    """
#    When I make a POST request to "/app_test.php/features/"
#    Then the status code should be 400
#
#    Given body of request:
#    """
#    {
#        "bad_column_name": ""
#    }
#    """
#    When I make a POST request to "/app_test.php/features/"
#    Then the status code should be 400




#    # Feature Update
#    And an empty request body
#    When I make a PUT request to "/app_test.php/features/5467ab88e8a2582108000000/"
#    Then the status code should be 400
#
#    Given body of request:
#    """
#    {
#        "name": ""
#    }
#    """
#    When I make a PUT request to "/app_test.php/features/5467ab88e8a2582108000000/"
#    Then the status code should be 400
#
#    Given body of request:
#    """
#    {
#        "bad_column_name": ""
#    }
#    """
#    When I make a PUT request to "/app_test.php/features/5467ab88e8a2582108000000/"
#    Then the status code should be 400
#
#  Scenario: Request with an invalid token
#
##    Given I am a user with security token "XYZ"
#
#    When I make a GET request to "/app_test.php/features/"
##    Then the status code should be 403

