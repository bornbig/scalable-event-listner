const fs = require('fs');
const sequelize = require("../src/config/connection");
const Activity = require("../src/modal/ActivityModal");
const path = require('path');

class MoveToDB{
    i = null;

    constructor(){
        const that = this;
        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
            this.checkActive();
            that.i = true;
         }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
         });
        setInterval(() => this.checkActive(this.i), 1000 * 60 * 5)
    }

    async start(){
        const that = this;
        const folderPath = "./events"
        try {
            // Read all files in the folder
            const files = await fs.readdirSync(folderPath);
            let listOfEvents = []
     
            for (const file of files) {
                const filePath = path.join(folderPath, file);
     
                // Read JSON file content
                const content = await fs.readFileSync(filePath, 'utf8');
                const jsonData = JSON.parse(content);

                listOfEvents.push(jsonData);
            }

            await Activity.bulkCreate(listOfEvents);

            for(const file of files){
                const filePath = path.join(folderPath, file);
                // Delete file after successful save
                await fs.unlinkSync(filePath);
            }
     
            console.log('All files have been processed and saved.');
        } catch (error) {
            console.error('Error processing files:', error);
        } finally {
            // await connection.end();
        }
    }

    checkActive(i){
        if(i){
            // sequelize.close();
        }
        this.start();
        console.log("Started File Mover")
    }

}

new MoveToDB();