const { DynamoDB } = require("aws-sdk");
const dynoexpr = require("@tuplo/dynoexpr");

const documentClient = new DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    const meeting = event.arguments.meeting;

    try {
        if(!process.env.MEETINGS_TABLE) {
            console.log("Error: MEETINGS_TABLE was not specified");
            return null;
        }

        const params = dynoexpr({
            TableName: process.env.MEETINGS_TABLE,
            Key: { id: meeting.id },
            ReturnValues: "ALL_NEW",
            Update: {
                ...(meeting.name !== undefined ? { name: meeting.name } : {}),
                ...(meeting.day !== undefined ? { day: meeting.day } : {}),
                ...(meeting.slug !== undefined ? { slug: meeting.slug } : {}),
                ...(meeting.time !== undefined ? { time: meeting.time } : {}),
                ...(meeting.end_time !== undefined ? { end_time: meeting.end_time } : {}),
                ...(meeting.group !== undefined ? { group: meeting.group } : {}),
                ...(meeting.notes !== undefined ? { notes: meeting.notes } : {}),
                ...(meeting.url !== undefined ? { url: meeting.url } : {}),
                ...(meeting.address !== undefined ? { address: meeting.address } : {}),
                ...(meeting.city !== undefined ? { city: meeting.city } : {}),
                ...(meeting.state !== undefined ? { state: meeting.state } : {}),
                ...(meeting.postal_code !== undefined ? { postal_code: meeting.postal_code } : {}),
                ...(meeting.country !== undefined ? { country: meeting.country } : {}),
                ...(meeting.approximate !== undefined ? { approximate: meeting.approximate } : {}),
                ...(meeting.rating !== undefined ? { rating: meeting.rating } : {}),
            }
        })

        const result = await documentClient.update(params).promise();
        
        return result.Attributes;
    } catch (error) {
        console.error("Dang it", error);

        return null;
    }

}