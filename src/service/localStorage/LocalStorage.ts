import { publicEncrypt } from 'crypto';
import * as t from 'io-ts';
import { DecodeError, decodeWithCodec } from '../../util/decode';
import { E, IO, O, pipe, R, RTE } from '../../util/fpts';

/////////////////////////////////////////////////////////
// Intarfaces
/////////////////////////////////////////////////////////

export interface LocalStorage {
   getItem(key: string): IO.IO<O.Option<string>>;
   setItem(key: string, value: string): IO.IO<void>;
   removeItem(key: string): IO.IO<void>;
   clear: IO.IO<void>;
   size: IO.IO<number>;
}

export interface LocalStorageEnv {
   localStorage: LocalStorage;
}

/////////////////////////////////////////////////////////
// RTE and helpers
/////////////////////////////////////////////////////////

export const getItem = (
   key: string
): RTE.ReaderTaskEither<LocalStorageEnv, never, O.Option<string>> =>
   pipe(
      RTE.ask<LocalStorageEnv>(),
      RTE.chain(env => RTE.fromIO(env.localStorage.getItem(key)))
   );

export const setItem = (
   key: string,
   value: string
): RTE.ReaderTaskEither<LocalStorageEnv, never, void> =>
   pipe(
      RTE.ask<LocalStorageEnv>(),
      RTE.chain(env => RTE.fromIO(env.localStorage.setItem(key, value)))
   );
