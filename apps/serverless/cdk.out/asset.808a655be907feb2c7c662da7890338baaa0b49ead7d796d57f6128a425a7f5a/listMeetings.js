import { DynamoDB } from "aws-sdk";

const documentClient = new DynamoDB.DocumentClient();

exports.handler = async () => {
    try {
        if(!process.env.MEETINGS_TABLE) {
            console.log("Error: MEETINGS_TABLE was not specified");
            return null;
        }

        const data = await documentClient
            .scan({ TableName: process.env.MEETINGS_TABLE })
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
