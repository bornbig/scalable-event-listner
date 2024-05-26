This is a nextJS Project developed to demonstrate a scalable solution to listen to events and save it to the databse.

Problem:
Events can be emitted multiple times with in a sececond, specially if you are listning to a large number of smart contracts. Query database every time you get an event can make the DB non usable.

Solution:
There are two files under cron folder:

1. activityListner.js
This file listen to one or multiple smart contracts ( Right now designed just to listen one).

Improvements: We can make it to listen to multiple contracts by taking array as an input and looping the code inside the "start" function.

This file is responsible to create unique files as and when we get an event from a contract, these files should be unique so that we dont overwrite an event to another. We are using the contract address, a random number and timestamp so that it can never colide with each other the random number makes it even safer, as if the time colides.

Theoritically a folder in an ext4 system can hold upto 10,000,000 files. That means we can save 10M events for now. Asuming, we are getting 1M events per minute, we can save 5M files per minute.

We also refresh our wss connectio every 2 minutes for better reliablity.

2. moveFilesToDB
This file takes a snapshot of the files in every 5 minutes and take the entire to push it to the DB, this creates one write call to the DB. After saving all the data, it deletes all the files so that we can take new files in the next 5 minutes.

Improvements: We can also use redis cache here so that we can save 100-500 latest records for easy access.

These two files need to be run through something like pm2 parallaly with the nextJs project.


API
/api/v1/nft/activity
This gives us the list of latest 100 activity saved

Improvements: We can enable redis cache to be taken here ( if present ), this will make delivery easy and scalable.



Frontend
index.js
It has a small UI that calls the api to display the latest activity fetched by the system.


DB Config
config/connection.js

Modal
modal/ActivityModal