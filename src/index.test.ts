import { describe, it, expectTypeOf } from 'vitest';
import { DeepReadonly } from "./index.js"

describe('Lab - 6 Utility type', () => {
  it('1. DeepReadonly recursion work', () => {
    type Config = {
      api: {
        port : {
          settings : {
            debug : boolean;
          }
        }
      }
    }

    type ReadonlyConfig = DeepReadonly<Config>;

    expectTypeOf<ReadonlyConfig>().toEqualTypeOf<{
      readonly api: {
        readonly port: number;
        readonly settings: {
          readonly debug: boolean;
        };
      };
    }>();
  });

}); 
