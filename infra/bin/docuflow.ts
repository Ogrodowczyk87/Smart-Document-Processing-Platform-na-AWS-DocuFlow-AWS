import * as cdk from "aws-cdk-lib";
import { DocuFlowStack } from "../lib/docuflow-stack";

const app = new cdk.App();

new DocuFlowStack(app, "DocuFlowStack");