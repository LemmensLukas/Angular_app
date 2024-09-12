# Project

Link: https://movies-d069d.web.app/
Link 2: https://movies-d069d.firebaseapp.com/movies

admin login:
email: admin@admin.com
password: admin123

# Testing plan

I have written five unit test for my add movie component. 
In these tests I will test the reactive form of the component.

In the first two test I will be testing the validators of my field title.
In the first one I pass a valid value => so I expect my title to be valid.
In the second one I will pass an invalid value => so I expect my title to be invalid and have a status INVALID

In the following two I will be testing the rating field on a correct input and an invalid input.
In the first one I will pass a valid rating ( 0 -5 ) => so I expect my rating to have a status VALID.
In the second one I will pass a invalid rating that exceeds the maximum rating => so I expect my rating to have a status INVALID.

In the last test I will be testing if my form is invalid if a field that is required is missing or invalid
the form will be invalid.
In this test I will pass valid and invalid values to my required fields => so I expect my form to be INVALID.

