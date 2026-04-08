import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import type { ClassConstructor } from "class-transformer/types/interfaces";

export type ValidationResult<T> =
  | { success: true; validData: T }
  | { success: false };

export function validateData<T extends object>(
  data: unknown,
  dtoClass: ClassConstructor<T>,
): ValidationResult<T> {
  const instance = plainToInstance(dtoClass, data, {
    excludeExtraneousValues: false,
    exposeUnsetFields: false,
  });

  const errors = validateSync(instance, {
    stopAtFirstError: false,
    skipUndefinedProperties: false,
    skipNullProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors.map((error) =>
      Object.values(error.constraints || {}).join(", "),
    );
    console.log('Ошибка при валидации:', errorMessages);
    return {
      success: false,
    };
  }

  return {
    success: true,
    validData: instance,
  };
}
