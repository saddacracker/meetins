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

        const data = await documentClient
            .scan({ TableName: process.env.MEETINGS_TABLE })
            .promise();

        return data.Items;

        // do {
        //     result = await documentClient.query({
        //         TableName: process.env.MEETINGS_TABLE,
        //         ExclusiveStartKey,
        //         Limit: 5,
        //         KeyConditionExpression: 'id = :hashKey and createdAt > :rangeKey',
        //         ExpressionAttributeValues: {
        //             'hashKey': '123',
        //             'rangeKey': 201501101
        //         },
        //     }).promise();

        //     ExclusiveStartKey = result.LastEvaluatedKey;
        //     accumulated = [...accumulated, ...result.Items];
        // } while (result.Items.length || result.LastEvaluatedKey);

        // return result; 
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
