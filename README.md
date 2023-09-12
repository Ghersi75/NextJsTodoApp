# NextJsTodoApp

This is just a simple app/project used to learn some basic NextJs, NextAuth concepts, Prisma for MySQL as well as possibly other MySQL related things, and whatever else comes up for things I could learn about. 

I didn't commit the initial app creation process, but to sum it up I used:
- Jotai for global state management
- Prisma for migrations if needed, not for production or queries, only for migrations if/when needed. I'll likely end up using something different in the future for migrations only
- Kysely for type safe MySQL queries. Closest thing to SQL queries without the worry of SQL injections
- Some basic nextjs, though haven't gotten into SSR yet since this app is basically entirely client side rendered, so SSR will be come useful in the future

This "project" was just a very simple intro into nextjs, prisma/kysely, mysql, and next auth. There are still a lot of things missing and important changes that should be made for this to be considered a more "complete" project, but I'd rather get back to working on the main project since this was more of a side thing used to learn.

Here's some things that could definitely need some work:
- Store user data when logging in with a next auth provider such as google. This data would be necessary to keep track of users' todos. To make this work properly, there would need to be a field added to the users table to keep track of what provider the login is for, or if unified. For example, if a user logs in with the credentials provider (email/password), then the password would need to be checked against what's stored in the database (bcrypt salted password). If the login is google or some other auth provider, the authentication has already been dealt with and only identifying user data would need to be returned (username, email, profile picture, etc.). No password check would be needed in this case. If a user decided to sign up with an email **and** login with the same email through a third party auth such as google, there would need to be some other way to keep track of these "unified" login options. Additionally, a way to check whether a user logged in through oauth or credentials would be needed, and password checking done as needed. 
- UI isn't great. If a note exceeds screen size the screen width will simply expand width wise. This is likely a simply fix through a parent component having a width of screen, and setting text overflow to scroll. I may be wrong though. 
- More complete backend/API. At the moment, the data validation is lacking quite a bit, and bad inputs are simply taken and dealt with in try catch statements. Ideally data would be validated on both the frontend and backend to save the server from using badly formatted data, and save the frontend from sending data that isn't formatted properly (email validation for example). Also, there is currently no session handling, so JWT or Cookie based sessions would need to be added for better user experience. With this better security would need to be implemented such as CSRF tokens to prevent CSRF attacks. 
- I'm sure I missed some stuff, but this is a relatively small project, so not a lot could go wrong.

Here's things I learned from this and things I'd change or try to do differently in the future:
- Using prisma for migrations only worked fine, but having to define the schema twice is rather annoying. Kysely unfortunately isn't an ORM and only deals with query building. I will definitely look into a better way to handle migrations and query building. 
- Handle API separately. NextJS having integrated API is great, but, in my opinion, it abstracts things too much. I have used NestJS and Express in the past, and will likely use one of these two. Leaning heavily towards NestJs because I've used it in the past for another side project, and have overall used it more than Express as well.
- Look into mixing UI libraries with Tailwind. Tailwind is great, but I'm not a UI developer, so it would be great to have some premade components with the option to extend them with tailwind. I'm not sure if this is an option, but given how much tailwind has grown, I'd assume this is an option.

