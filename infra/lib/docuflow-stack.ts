import * as path from "node:path";
import {
  RemovalPolicy,
  Stack,
  type StackProps,
} from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as logs from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { CfnOutput } from "aws-cdk-lib";
export class DocuFlowStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const documentsBucket = new s3.Bucket(
      this,
      "DocumentsBucket",
      {
        encryption: s3.BucketEncryption.S3_MANAGED,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        enforceSSL: true,
        removalPolicy: RemovalPolicy.RETAIN,
        cors: [
          {
            allowedMethods: [s3.HttpMethods.PUT],
            allowedOrigins: ["http://localhost:5173"],
            allowedHeaders: ["*"],
            exposedHeaders: ["ETag"],
          },
        ],
      },
    );

    const backendRoot = path.join(__dirname, "../../backend");

   const createUploadUrlLogGroup = new logs.LogGroup(
    this,
    "CreateUploadUrlLogGroup",
    {
      logGroupName: "/docuflow/lambda/create-upload-url",
      retention: logs.RetentionDays.ONE_WEEK,
      removalPolicy: RemovalPolicy.DESTROY,
    },
  );
  
  
  const createUploadUrlFunction = new NodejsFunction(
    this,
    "CreateUploadUrlFunction",
    {
      runtime: lambda.Runtime.NODEJS_24_X,
      logGroup: createUploadUrlLogGroup,
      entry: path.join(
        backendRoot,
        "src/handlers/createUploadUrl.ts",
      ),
      projectRoot: backendRoot,
      depsLockFilePath: path.join(
        backendRoot,
        "package-lock.json",
      ),
      handler: "handler",
      environment: {
        DOCUMENTS_BUCKET_NAME: documentsBucket.bucketName,
      },
      bundling: {
        bundleAwsSDK: true,
        minify: true,
        sourceMap: true,
        target: "node24",
      },
    },
  );
  
  createUploadUrlFunction.addToRolePolicy(
    new iam.PolicyStatement({
      actions: ["s3:PutObject"],
      resources: [documentsBucket.arnForObjects("documents/*")],
    }),
  );
  const httpApi = new apigatewayv2.HttpApi(this, "DocuFlowHttpApi", {
    apiName: "docuflow-api",
    corsPreflight: {
      allowOrigins: ["http://localhost:5173"],
      allowMethods: [apigatewayv2.CorsHttpMethod.POST],
      allowHeaders: ["Content-Type"],
    },
  });
  
  httpApi.addRoutes({
    path: "/upload-url",
    methods: [apigatewayv2.HttpMethod.POST],
    integration: new integrations.HttpLambdaIntegration(
      "CreateUploadUrlIntegration",
      createUploadUrlFunction,
    ),
  });
  
  new CfnOutput(this, "DocuFlowApiUrl", {
    value: httpApi.url ?? "API URL not available",
  });
  
}
}
