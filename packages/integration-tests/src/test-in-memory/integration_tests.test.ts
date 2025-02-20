import { dataStorageAuthWithTriggers } from '../test-projects/data-storage-auth-with-triggers-ts/amplify/test_factories.js';
import {
  assertExpectedLogicalIds,
  synthesizeBackendTemplates,
} from '../define_backend_template_harness.js';
import { it } from 'node:test';
import { dataWithoutAuth } from '../test-projects/standalone-data-auth-modes/amplify/test_factories.js';
import { dataWithoutAuthNoAuthMode } from '../test-projects/standalone-data-sandbox-mode/amplify/test_factories.js';

/**
 * This test suite is meant to provide a fast feedback loop to sanity check that different feature verticals are working properly together.
 * Specific feature configurations should be checked at the unit test level.
 * Some assertions about how feature verticals interact could be appropriate here.
 * Critical path interactions should be exercised in a full e2e test.
 */

void it('data storage auth with triggers', () => {
  const templates = synthesizeBackendTemplates(dataStorageAuthWithTriggers);

  assertExpectedLogicalIds(templates.root, 'AWS::CloudFormation::Stack', [
    'auth179371D7',
    'data7552DF31',
    'function1351588B',
    'storage0EC3F24A',
  ]);

  assertExpectedLogicalIds(templates.auth, 'AWS::Cognito::UserPool', [
    'amplifyAuthUserPool4BA7F805',
  ]);

  assertExpectedLogicalIds(templates.data, 'AWS::AppSync::GraphQLApi', [
    'amplifyDataGraphQLAPI42A6FA33',
  ]);
  assertExpectedLogicalIds(templates.data, 'AWS::CloudFormation::Stack', [
    'amplifyDataAmplifyTableManagerNestedStackAmplifyTableManagerNestedStackResource86290833',
    'amplifyDataFunctionDirectiveStackNestedStackFunctionDirectiveStackNestedStackResource1246A302',
    'amplifyDataTodoNestedStackTodoNestedStackResource551CEA56',
  ]);

  assertExpectedLogicalIds(templates.storage, 'AWS::S3::Bucket', [
    // eslint-disable-next-line spellcheck/spell-checker
    'testNameBucketB4152AD5',
  ]);
});

void it('data without auth with lambda auth mode', () => {
  const templates = synthesizeBackendTemplates(dataWithoutAuth);

  assertExpectedLogicalIds(templates.root, 'AWS::CloudFormation::Stack', [
    'data7552DF31',
    'function1351588B',
  ]);
  assertExpectedLogicalIds(templates.data, 'AWS::AppSync::GraphQLApi', [
    'amplifyDataGraphQLAPI42A6FA33',
  ]);
  assertExpectedLogicalIds(templates.data, 'AWS::CloudFormation::Stack', [
    'amplifyDataAmplifyTableManagerNestedStackAmplifyTableManagerNestedStackResource86290833',
    'amplifyDataTodoNestedStackTodoNestedStackResource551CEA56',
  ]);
});

void it('data without auth with default auth mode', () => {
  const templates = synthesizeBackendTemplates(dataWithoutAuthNoAuthMode);

  assertExpectedLogicalIds(templates.root, 'AWS::CloudFormation::Stack', [
    'data7552DF31',
  ]);
  assertExpectedLogicalIds(templates.data, 'AWS::AppSync::GraphQLApi', [
    'amplifyDataGraphQLAPI42A6FA33',
  ]);
  assertExpectedLogicalIds(templates.data, 'AWS::CloudFormation::Stack', [
    'amplifyDataAmplifyTableManagerNestedStackAmplifyTableManagerNestedStackResource86290833',
    'amplifyDataTodoNestedStackTodoNestedStackResource551CEA56',
  ]);
});
