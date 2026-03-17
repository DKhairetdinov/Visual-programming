import { describe, it, expectTypeOf } from 'vitest';
import { DeepReadonly, PickedByType, EventHandlers } from './index.js';

describe('Lab 6 - Utility Types', () => {

  it('1. DeepReadonly work recursion', () => {
    type Config = {
      api: {
        port: number;
        settings: {
          debug: boolean;
        };
      };
    };

    type ReadonlyConfig = DeepReadonly<Config>;

    // Проверяем, что верхний уровень readonly
    expectTypeOf<ReadonlyConfig>().toEqualTypeOf<{
      readonly api: {
        readonly port: number;
        readonly settings: {
          readonly debug: boolean;
        };
      };
    }>();
  });

  it('2. PickedByType filter properties by type', () => {
    type User = {
      id: number;
      name: string;
      age: number;
      email: string;
      isActive: boolean;
    };

    type OnlyStrings = PickedByType<User, string>;

    expectTypeOf<OnlyStrings>().toEqualTypeOf<{
      name: string;
      email: string;
    }>();

    expectTypeOf<OnlyStrings>().not.toHaveProperty('id');
    expectTypeOf<OnlyStrings>().not.toHaveProperty('isActive');
  });

  it('3. EventHandlers generate name onClick, onHover etc.', () => {
    type MyEvents = {
      click: { x: number; y: number };
      focus: { target: string };
    };

    type Handlers = EventHandlers<MyEvents>;

    expectTypeOf<Handlers>().toEqualTypeOf<{
      onClick: (event: { x: number; y: number }) => void;
      onFocus: (event: { target: string }) => void;
    }>();
  });
});