# think

## Date

Friday Nov 14, 2020.

### Location of deployed application

**server** [https://think-api.herokuapp.com/](https://think-api.herokuapp.com/)

**client** [https://think-client.herokuapp.com/](https://think-client.herokuapp.com/)

### Time spent

6-7 hrs with some distractions/exploration.

### Assumptions made

- only positive numbers starting at 0 are accepted. no other values will work.
- I started the count at 0. (that way the user can submit a number or start with `/next`)
- `-0` will set the identifier to 0. I consider it a happy path for the user.

### Shortcuts/Compromises made

- the limit of the initger is not infinit. Supports what `Math.sign()` can.
- doesn't support IE. Mainly because of `Math.sign()`
- github and email/password auth share a token to enable bearer auth on all requests. Matching the token is done losely with (`==`) to accomodate not having a db to store a user on. (everything is session based)
- since the app is session based (no users/db) we all share the same integer. It's a crowed sourced integer app!
- the client is light on testing. Some of this is time saving, I know that will bite us as the app grows, but I felt the server handled most of the edge cases and I'm the only dev.
- the client side app is not a compiled production build.
- I'm not using redux as most of the state is form based and complexity is simple.
- No UI for API error responses. You'll need to check the console.

### Stretch goals attempted

- OAuth with Github is implemented
- client and server are bothed hosted
- the client logs you in, and out with 401, and consums the server. built with react

### Instructions to run assignment locally

**client**

- yarn install
- yarn start
- yarn test

**server**

- yarn install
- yarn start
- yarn test
- bash curl-script.sh 👈 used by me to test server with curl durig dev (uses remote server, but can be pointed to http://localhost:3000)

### What did you not include in your solution that you want us to know about?

- more client side testing

### Other information about your submission that you feel it's important that we know if applicable.

  I did some experimenting with server side rendered react for the client. I moved away from it as I felt the implementations I was finding was to big a refactor at the time or would have required me to bind the single page app via handlebars to the DOM, which seemed flaky to me.

### Your feedback on this technical challenge

I enjoyed it! 