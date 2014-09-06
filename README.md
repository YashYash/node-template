node-template
=============

Scallable setup for a MEAN project.
How to run this:

1. Go to the directory that contains app.js
2. Run npm install
3. Then run nodemon app.js
4. In your browser -- "locahost:3000"

MongoDB:

1. Open up terminal
2. Type in mongo
3. Type in show dbs --> you should see "node-template" as one of the dbs
4. Type in "use node-template"
5. And you are good to go

API:

1. Local api is setup
2. If you type in localhost:3000/api/test or localhost:3000/api/account, you will see the BSON

Socket.io

It is set up and loaded on the home.jade template.
There is an angular socket facotory that allows you to use 'socket' in the controller and the directive. 

Peer.js and Holla.js

Not need. You can delete them if you want.
It is similar to socket.io. It is used for WebRTC, to create live video chat. It is also set up.

NOTE**
NOt all the dependencies are need

HAVE FUN!!
