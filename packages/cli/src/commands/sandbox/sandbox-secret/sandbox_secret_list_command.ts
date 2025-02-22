import { CommandModule } from 'yargs';
import { SecretClient } from '@aws-amplify/backend-secret';
import { SandboxBackendIdResolver } from '../sandbox_id_resolver.js';
import { printer } from '../../../printer.js';

/**
 * Command to list sandbox secrets.
 */
export class SandboxSecretListCommand implements CommandModule<object> {
  /**
   * @inheritDoc
   */
  readonly command: string;

  /**
   * @inheritDoc
   */
  readonly describe: string;

  /**
   * List sandbox secret command.
   */
  constructor(
    private readonly sandboxIdResolver: SandboxBackendIdResolver,
    private readonly secretClient: SecretClient
  ) {
    this.command = 'list';
    this.describe = 'List all sandbox secrets';
  }

  /**
   * @inheritDoc
   */
  handler = async (): Promise<void> => {
    const sandboxBackendIdentifier = await this.sandboxIdResolver.resolve();
    const secretIds = await this.secretClient.listSecrets(
      sandboxBackendIdentifier
    );

    printer.printRecords({
      names: secretIds.map((secretId) => secretId.name),
    });
  };
}
