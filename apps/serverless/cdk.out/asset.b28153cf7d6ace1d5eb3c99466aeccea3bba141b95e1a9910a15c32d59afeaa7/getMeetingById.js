const { DynamoDB } = require("aws-sdk");

const documentClient = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const meetingId = event.arguments.meetingId;

    try {
        if(!process.env.MEETINGS_TABLE) {
            console.log("Error: MEETINGS_TABLE was not specified");
            return null;
        }

        const { Item } = await documentClient
            .get({ 
                TableName: process.env.MEETINGS_TABLE,
                Key: { id: meetingId }
             })
            .promise();

        return Item;
    } catch (error) {
        console.error("Dang it", error);

        return null;
    }
}