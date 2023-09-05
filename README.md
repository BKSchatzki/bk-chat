# BK Chat

A chatroom with login and registration using the Appwrite backend. Plans to include unique rooms, user dashboards, and sharing of formatted code between users, and switch to server-side rendering.

**Link to project:** http://bk-chat.netlify.app

![BK Chat](https://res.cloudinary.com/djqsm7sz5/image/upload/v1691468692/bks-portfolio/bk-chat_fleaqo.jpg)

## How It's Made:

**Tech used:** Vite, React, Tailwind, Appwrite

Appwrite enables several things. Instead of architecting a backend, you run CRUD methods on a backend you define in the Appwrite dashboard. The advantage is that you get a library of features you can basically call with a single method, and advanced functionality such as live updates don't need to rely on WebSockets; it's all native to Appwrite. Even local auth is handled totally in-house. I also installed react-router-dom for protected routes and auto-redirects, although that came with several pitfalls as written below.

## Optimizations

I added several features focused on improving the front-end experience. Initially, invalid forms did not display an error to the user, so I added error messages there. There was also no conditional styling for the chat bubbles so that was added. I also added some hover, focus, and active classes to make the app pseudo-skeuomorphic.

## Lessons Learned:

The largest issue with this app is the use of client-side routing. The only get the client makes is to the root path, so there can be issues with page reloads and refreshes, as evidenced by what happens when you try to make a get request to '/login' or '/register'. Additionally, writing local auth from scratch is a pain and I don't like it. I'd rather import a bunch of Passport strategies. Either way, the biggest lesson is that server-side apps rule and client-side things are generally best left on a single page.

## Examples:

Take a look at some more examples in my portfolio:

**C Flat Run:** https://github.com/BKSchatzki/cflatrun-landingpage

**Nick B. Schatzki:** https://github.com/BKSchatzki/nbs-portfolio

**Songstruct:** https://github.com/BKSchatzki/songstruct

**SongStrudel:** https://github.com/BKSchatzki/songstrudel
