# NextJsTodoApp

This is just a simple app/project used to learn some basic NextJs, NextAuth concepts, Prisma for MySQL as well as possibly other MySQL related things, and whatever else comes up for things I could learn about. 

I didn't commit the initial app creation process, but to sum it up I used:
- Jotai for global state management
- Prisma for migrations if needed, not for production or queries, only for migrations if/when needed. I'll likely end up using something different in the future for migrations only
- Kysely for type safe MySQL queries. Closest thing to SQL queries without the worry of SQL injections
- Some basic nextjs, though haven't gotten into SSR yet since this app is basically entirely client side rendered, so SSR will be come useful in the future