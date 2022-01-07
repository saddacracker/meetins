const { DynamoDB } = require("aws-sdk");

const documentClient = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { first, cursor } = event.arguments;
    
    console.log('-----------------');
    console.log(`first`, first)
    console.log(`cursor`, cursor)
    console.log('-----------------');

    try {
        if(!process.env.MEETINGS_TABLE) {
            console.log("Error: MEETINGS_TABLE was not specified");
            return null;
        }

        const data = await documentClient
            .scan({ 
                TableName: process.env.MEETINGS_TABLE,
                FilterExpression : 'city = :city', 
                ExpressionAttributeValues : {':city' : 'Everett'}
            })
            .promise();

        return data.Items;
    } catch (error) {
        console.error("Dang it", error);

        return null;
    }
}