# Scalable Event Listener

This Next.js project demonstrates a scalable solution for listening to events and saving them to a database efficiently.

## Problem

Events can be emitted multiple times per second, especially when listening to a large number of smart contracts. Querying the database for each event can overwhelm the DB.

## Solution

### Components

#### 1. `activityListner.js`
- Listens to one or multiple smart contracts (currently designed for one).
- Creates unique files for each event using contract address, a random number, and a timestamp to avoid collisions.
- Refreshes the WebSocket connection every 2 minutes for reliability.

#### 2. `moveFilesToDB.js`
- Takes snapshots of the event files every 5 minutes and writes them to the database in bulk.
- Deletes the files after saving the data to prepare for the next batch.

### Improvements
- Modify `activityListner.js` to handle multiple contracts by accepting an array.
- Use Redis cache for recent records to improve access speed.
- Implement Redis cache in the API for scalable data delivery.

## API

### Endpoint
- `/api/v1/nft/activity`: Returns the latest 100 activities.

## Frontend

- `index.js`: Displays the latest activities fetched by the system.

## Database Configuration

- `config/connection.js`: Manages the DB connection settings.

## Model

- `modal/ActivityModal.js`: Defines the schema for storing activities.

## Running the Project

1. **Setup**: Install dependencies using `npm install`.
2. **Start the Listener and Mover**: Use a process manager like `pm2` to run `activityListner.js` and `moveFilesToDB.js` in parallel with the Next.js server.

## About

No additional description, website, or topics provided.
