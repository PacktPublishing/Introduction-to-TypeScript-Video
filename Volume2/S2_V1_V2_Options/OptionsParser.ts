import * as minimist from 'minimist';

import { DEFAULT_ENCODER } from './encoders';
import { Options, ProcessArgs } from './Options';

/**
 * Creates a strongly-typed intersection between a given type 
 * and the minimist ParsedArgs type.
 */
function minimistAs<T>(args?: string[], opts?: minimist.Opts): T & minimist.ParsedArgs {
    return <T & minimist.ParsedArgs>minimist(args, opts);
}

export function fromArgv(argv: string[]): Options {
    var parsedArgs = minimistAs<ProcessArgs>(argv, {
        boolean: 'decode',
        alias:   { encoding: 'e', decode: 'd' },
        default: { encoding: DEFAULT_ENCODER }
    });

    return new Options(parsedArgs._.join(' '), parsedArgs);
}