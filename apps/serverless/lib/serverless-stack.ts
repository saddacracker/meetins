import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from '@aws-cdk/aws-dynamodb';
export class ServerlessStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const meetingsTable = new dynamodb.Table(this, "MeetingsTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const api = new appsync.GraphqlApi(this, "MyMeetingsApi", {
      name: "my-meetings-api",
      schema: appsync.Schema.fromAsset("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: "My Meetings API key",
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          }
        }
      }
    })

    ////////////////////
    // Query: All Meetings
    ////////////////////
    const listMeetingsLambda = new lambda.Function(this, "listMeetingsHandler", {
      code: lambda.Code.fromAsset("functions"),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "listMeetings.handler",
      memorySize: 1024,
      environment: {
        MEETINGS_TABLE: meetingsTable.tableName,
      },
    })

    meetingsTable.grantReadData(listMeetingsLambda);

    const listMeetingsDataSource = api.addLambdaDataSource(
      "listMeetingsDataSource", 
      listMeetingsLambda,
    )

    // Query Resolver function
    listMeetingsDataSource.createResolver({
      typeName: "Query",
      fieldName: "listMeetings"
    })

    ////////////////////
    // Query: Meeting By ID
    ////////////////////
    const getMeetingByIdLambda = new lambda.Function(this, "getMeetingByIdHandler", {
      code: lambda.Code.fromAsset("functions"),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "getMeetingById.handler",
      memorySize: 1024,
      environment: {
        MEETINGS_TABLE: meetingsTable.tableName,
      },
    })

    meetingsTable.grantReadData(getMeetingByIdLambda);

    const getMeetingByIdDataSource = api.addLambdaDataSource(
      "getMeetingByIdDataSource", 
      getMeetingByIdLambda,
    )

    // Query Resolver function
    getMeetingByIdDataSource.createResolver({
      typeName: "Query",
      fieldName: "getMeetingById"
    })


    ////////////////////
    // Mutation
    ////////////////////
    const createMeetingLambda = new lambda.Function(this, "createMeetingHandler", {
      code: lambda.Code.fromAsset("functions"),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "createMeeting.handler",
      environment: {
        MEETINGS_TABLE: meetingsTable.tableName,
      },
    });

    meetingsTable.grantReadWriteData(createMeetingLambda);

    const createMeetingDataSource = api.addLambdaDataSource(
      "createMeetingDataSource", 
      createMeetingLambda,
    )

    // Mutation Resolver function
    createMeetingDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "createMeeting"
    })
  }
}