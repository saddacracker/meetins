const { DynamoDB } = require("aws-sdk");

const documentClient = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { city, state, postal_code, day } = event.arguments;
    
    console.log('-----------------');
    console.log(`city`, city)
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
                ExpressionAttributeValues : {':city' : city}
            })
            .promise();

        return data.Items;
    } catch (error) {
        console.error("Dang it", error);

        return null;
    }
}