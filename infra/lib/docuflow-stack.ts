import * as path from "node:path";
import {
  RemovalPolicy,
  Stack,
  type StackProps,
} from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

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

    const createUploadUrlFunction = new NodejsFunction(
      this,
      "CreateUploadUrlFunction",
      {
        runtime: lambda.Runtime.NODEJS_24_X,
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
  }
}
