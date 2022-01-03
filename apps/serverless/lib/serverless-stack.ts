import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as nodeJsLambda from "@aws-cdk/aws-lambda-nodejs";
import * as path from "path";
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
      },
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL
      }
    })

    const commonLambdaProps: Omit<lambda.FunctionProps, "handler"> = {
      code: lambda.Code.fromAsset("functions"),
      runtime: lambda.Runtime.NODEJS_14_X,
      memorySize: 1024,
      architecture: lambda.Architecture.ARM_64,
      environment: {
        MEETINGS_TABLE: meetingsTable.tableName,
      },
    }

    ////////////////////
    // Query: All Meetings
    ////////////////////
    const listMeetingsLambda = new lambda.Function(this, "listMeetingsHandler", {
      handler: "listMeetings.handler",
      ...commonLambdaProps
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
      handler: "getMeetingById.handler",
      ...commonLambdaProps
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
      handler: "createMeeting.handler",
      ...commonLambdaProps
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


    ////////////////////
    // Mutation: Update
    ////////////////////

    // (uses entry vs handler)
    // Note: Delete yarn.lock before running `cdk deploy` or this mofo will fail
    const updateMeetingLambda = new nodeJsLambda.NodejsFunction(
      this, 
      "updateMeetingHandler", 
      {
        ...commonLambdaProps,
        entry: path.join(__dirname, "../functions/updateMeeting.js"),
      },
    );

    meetingsTable.grantReadWriteData(updateMeetingLambda);

    const updateMeetingDataSource = api.addLambdaDataSource(
      "updateMeetingDataSource", 
      updateMeetingLambda,
    );

    // Mutation Resolver function
    updateMeetingDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateMeeting"
    });
    
  }
}