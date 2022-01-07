const { DynamoDB } = require("aws-sdk");

const documentClient = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { first, cursor } = event.arguments;
    let result, accumulated, ExclusiveStartKey;
    
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

        // 1) Establish Secondary Key: https://www.fernandomc.com/posts/eight-examples-of-fetching-data-from-dynamodb-with-node/
        // 2) https://dynobase.dev/dynamodb-nodejs/
        const data = await documentClient
            .query({
                TableName: 'my-table',
                IndexName: 'cityIndex', // <----------- Specifying index name
                KeyConditionExpression: 'city = :city', // <----- KeyConditionExpression using indexed attributes
                // KeyConditionExpression: 'gsi1pk = :gsi1pk and gsi1sk > :gsi1sk'
                ExpressionAttributeValues: { // <----- ExpressionAttributeValues using indexed attributes
                    ':city': 'Everett',
                    // ':gsi1sk': 20150101
                }
            })
            .promise();

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
