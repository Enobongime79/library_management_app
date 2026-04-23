# library management website

Tech stack:

Frontend - HTML, TailwindCSS, Javascript

Backend - NodeJs, Express js

Encryption - bcrypt

Database - Postgres, Supabase

Hosting - Vercel

I did this project to learn express js, specifically ejs. Formerly i used hbs but ejs is significantly easier to use because you are writing javascript directly which in my exprerience makes it easier to loop and work with variable on the frontend which was useful for this application.

I am going to explain what i did for each page in this website

Admin page

For the admin page i designed the login bar and i created two roles the admin and the superadmin

The admin has access to everything in the website just not the ability to create more admins which is the enabled for the superadmin which can be the owner of the library

So basically you enter your details in the login form and then it sends it to the backend which checks the database if the email exist first if the email doesnt exist it will send you back to the login page. But if the email is valid it is then going to check if the password you entered is the same as the one in the database, and by the way the password in the database is encrypted using bcrypt and they are compared by also using bcrypt. so if the password is valid it would route you to the borrow page

Borrow Page

First of all in the backend it is going to fetch all the borrow records from the database and then send it as an array of objects to the frontend and then i used a for loop to display the values in tabular rows, and as you can see it shows only five records at a time i did this to organise it and to prevent unnecessary scrolling so it will be easier to find the person you are looking for and also there is a search bar that automatically searches/filters when inputing the values. In a future update i will add the ability to filter by book or author. The add borrow record buttonn opens a modal then you enter the values, if it not complete the page will show an alert for you to complete the form, the once you complete it. it updates the records in the table without reloading the page, and for the edit button it first fetches the data on that row and then displays the modal with the information so that the user would not have to guess who he is editing, then you edit it updates the database and the page visually

Author Page

Basically the same thing with the borrow page but for the number of books i use a count function in sql to count all the books the author has and also the edit and add is just the author name 

Books Page

Basically the same thing with the borrow page when it comes to styling and functionality, but also ina future update i want to fix the avaialbility row to update the number of books available

Issues i had while building this project:

1. I had some minor issues when it came with communicating with the database nothing complex just minor syntax problems

2. The main issue i has was integrating supabase which was quite stressful at the start, i think supabase updated their ui so when i asked ai or searched youtube or reddit the solutions where for a former ui and it was stressing me because they were like go to a setting page you will see all the connection strings there and copy it to your code and i was like i dont see anything like that in the setting, only for me to see one green connect button in the dashboard page, then the next one was the connection string and for that one i used session pooler because of an issue with ipv4, i didnt really look into it but it works i guess.

3. One thing that slowed me down what trying to build the ui for each page so maybe next time i would use a component ui to quicken the work

Other than that it was a relatively medium project, the only issue i had was that it took time to build which also brought stress but other than that i think it was a solid learning exprience

Things i learnt

1. Postgres - Funny enough, postgres was actually easier to learn and use than sqlite which is supposed to be the easier one

2. Supabase - i wanted to host this project so i had to use supabase for the database online, and is was easy to push it to supabase since it is kinda similar to postgres or uses postgres i will clarify that later.

3. Architecture and features - In my last project which is the school management system, one issue i had was that when i updated the value like adding or editing something in the database i always reloaded the frontend and when i wanted to go back to the former page it would be repeating the same page until i reach the initial point and also i didnt want that when i make an update that it will reload the page, i wanted it to appear immediately the submit button was pressed.

4. Environment variables - i had to use this to store my postgres database details and also store the supabase url and i face and issue with this when i hosted the website on vercel, the website would load the admin page and when you try to login it would show server error and i was confused because i was like where is the bug coming from only for me to learn that you have to put you environment variables in vercel when you want to host the site, because since you already hide the environment variables when you are posting to github it doesnt know the key to interact with the database which is why it was showing that error and then i put it and then if fixed and started working normally.

So this is the website if you want to check it out. - library-management-app-kmtx.vercel.app/login
Send a dm if you want login details or have a job offer - twitter: isaac_analyst
email - enobongime79@gmail.com

