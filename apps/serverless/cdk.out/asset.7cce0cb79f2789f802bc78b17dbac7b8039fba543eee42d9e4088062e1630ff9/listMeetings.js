const { DynamoDB } = require("aws-sdk");

const documentClient = new DynamoDB.DocumentClient();

// https://www.fernandomc.com/posts/eight-examples-of-fetching-data-from-dynamodb-with-node/
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

        // const data = await documentClient
        //     .scan({ TableName: process.env.MEETINGS_TABLE })
        //     .promise();

        const params = {
            KeyConditionExpression: 'city = :city',
            ExpressionAttributeValues: {
                ':city': 'Everett'
            },
            TableName: process.env.MEETINGS_TABLE
        };
        const data = await documentClient
            .query(params)
            .promise();

        console.log(JSON.stringify(data));

        return data.Items;
    } catch (error) {
        console.error("Dang it", error);

        return null;
    }
}


// Hardcoded data
// exports.handler = async () => {
//     return [
//         {
//             "id": "1abc",
//             "name": "A Vision For You",
//             "day": 4
//         },
//         {
//             "id": "2def",
//             "name": "New Life",
//             "day": 3
//         },
//         {
//             "id": "3ghi",
//             "name": "Bridge to Faith",
//             "day": 1
//         }
//     ];
// };
