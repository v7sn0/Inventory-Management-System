# Inventory Management System #

## Date 5/19/2026 ##

### By: Hasan Mahfoodh ###

#### [LinkedIn](https://www.linkedin.com/in/hasan-mahfoodh) | [GitHub](https://github.com/v7sn0) ####
#### [Trello Page](https://trello.com/b/8UWEasjo/ims-project) ####
***
### Description ###
A website where the users can enter the products they have and their quantity and adjust them when they sell or purchase more products or remove them when they are no longer in stock.

***

### Technologies ###

* MongoDB + Mongoose
* Express.js
* React
* Node.js

***

### Deployed Website ###



[IMS Website](https://ims-seven-sigma.vercel.app/)


***
### Getting Started ###
1. Fork and clone the repository.

2. Install the required dependencies for the frontend and the backend by using `npm install`, in VS Code terminal.

3. Create 2 .env files, one in the backend folder and the second one in frontend folder:
   * Backend .env contains:
      * MONGODB_URI: A MongoDB connection string.
      * APP_SECRET: Any word you want.
      * SALT_ROUNDS: a number between 1 and 14.
      * PORT: A port number.
    * Frontend .env contains:
      * VITE_API_URL: Backend API URL.

4. Run both the backend and the frontend by using: `npm run dev`, in VS Code terminal.

5. In the frontend terminal, after running `npm run dev`, press Ctrl and click on the link that appeared in the terminal, or copy it and paste it in any browser, and start using the website.
***

### Screenshots ###
#### Welcome Page ####
![Welcome Page](./assets/Screenshot%20-%20Welcome%20page.png)

#### Home Page ####
![Home Page](./assets/Screenshot%20-%20Home%20page.png)

#### Add Product Page ####
![Add Product Page](./assets//Screenshot%20-%20Add%20product%20page.png)
***

### Task List ###
- [x] Create the backend.
- [x] Create the frontend.
- [x] Style the website.

### Credits ###

* [Protected Routes Tutorial](https://www.youtube.com/watch?v=pyfwQUc5Ssk)
* [useState Hook to Handle Loading Tutorial](https://www.youtube.com/watch?v=qtheqr0jgIQ)
* [useState Hook to Handle Errors Tutorial](https://www.youtube.com/watch?v=DTBta08fXGU)
* [RegExp in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
* [$regex in MongoDB](https://www.mongodb.com/docs/manual/reference/operator/query/regex/?utm_source=chatgpt.com#-regex--query-predicate-operator-)
* [Username Regex](https://ihateregex.io/expr/username/)
* [Password Regex](https://ihateregex.io/expr/password/)
* [Regex Testing Website](https://regexr.com/)
