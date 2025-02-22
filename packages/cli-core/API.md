## API Report File for "@aws-amplify/cli-core"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="node" />

import { PackageManagerController } from '@aws-amplify/plugin-types';

// @public
export class AmplifyPrompter {
    static input: (options: {
        message: string;
        defaultValue?: string;
    }) => Promise<string>;
    static secretValue: (promptMessage?: string) => Promise<string>;
    static yesOrNo: (options: {
        message: string;
        defaultValue?: boolean;
    }) => Promise<boolean>;
}

// @public
export enum COLOR {
    // (undocumented)
    RED = "31m"
}

// @public
export const format: {
    list: (lines: string[]) => string;
    indent: (message: string) => string;
};

// @public (undocumented)
export enum LogLevel {
    // (undocumented)
    DEBUG = 2,
    // (undocumented)
    ERROR = 0,
    // (undocumented)
    INFO = 1
}

// @public
export class PackageManagerControllerFactory {
    constructor(cwd: string, printer: Printer);
    getPackageManagerController(): PackageManagerController;
}

// @public
export class Printer {
    constructor(minimumLogLevel: LogLevel, stdout?: NodeJS.WriteStream, stderr?: NodeJS.WriteStream, refreshRate?: number);
    indicateProgress(message: string, callback: () => Promise<void>): Promise<void>;
    log(message: string, level?: LogLevel, eol?: boolean): void;
    print: (message: string, colorName?: COLOR) => void;
    printNewLine: () => void;
    printRecords: <T extends Record<string | number, RecordValue>>(...objects: T[]) => void;
}

// @public (undocumented)
export type RecordValue = string | number | string[] | Date;

// (No @packageDocumentation comment for this package)

```
