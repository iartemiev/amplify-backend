import { describe, it } from 'node:test';
import { StackMetadataBackendOutputStorageStrategy } from './stack_metadata_output_storage_strategy.js';
import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { backendOutputStackMetadataSchema } from '@aws-amplify/backend-output-schemas';

void describe('StackMetadataBackendOutputStorageStrategy', () => {
  void describe('storeOutput', () => {
    void it('adds stack output and metadata for entry', () => {
      const app = new App();
      const stack = new Stack(app);
      const outputStorage = new StackMetadataBackendOutputStorageStrategy(
        stack
      );
      outputStorage.addBackendOutputEntry('TestStorageOutput', {
        version: '1',
        payload: {
          something: 'special',
        },
      });

      const template = Template.fromStack(stack);
      template.hasOutput('something', { Value: 'special' });
      template.templateMatches({
        Metadata: {
          TestStorageOutput: {
            version: '1',
            stackOutputs: ['something'],
          },
        },
      });
    });

    void it('conforms stack metadata to primitive type', () => {
      const app = new App();
      const stack = new Stack(app);
      const outputStorage = new StackMetadataBackendOutputStorageStrategy(
        stack
      );
      outputStorage.addBackendOutputEntry('TestStorageOutput', {
        version: '44',
        payload: {
          something: 'special',
        },
      });

      const template = Template.fromStack(stack);
      // successfully parsing the metadata means it validated against the schema
      backendOutputStackMetadataSchema.parse(template.toJSON().Metadata);
    });
  });
});
