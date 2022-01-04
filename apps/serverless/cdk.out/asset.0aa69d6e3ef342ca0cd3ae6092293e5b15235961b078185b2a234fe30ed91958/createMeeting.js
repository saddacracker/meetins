// const { AppSyncResolverHandler } = require("@aws-cdk/aws-lambda");
const { DynamoDB } = require("aws-sdk");

const documentClient = new DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    const meeting = event.arguments.meeting;

    try {
        if(!process.env.MEETINGS_TABLE) {
            console.log("Error: MEETINGS_TABLE was not specified");
            return null;
        }

        await documentClient
            .put({
                TableName: process.env.MEETINGS_TABLE,
                Item: {
                    id: context.awsRequestId, 
                    updated: new Date().toISOString(),
                    ...meeting
                },
            })
            .promise();
        
        return meeting;
    } catch (error) {
        console.error("Dang it", error);

        return null;
    }

    return null;
}