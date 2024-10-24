import { useState } from "react";

const isNullishStrict = (value: unknown) => {
  return value === null || value === undefined;
};

const isEmptyArray = (value: unknown) => {
  return Array.isArray(value) && value.length === 0;
};

const isEmptyObject = (value: unknown) => {
  return typeof value === "object" && value !== null && Object.keys(value).length === 0;
};

const isObject = (value: unknown) => {
  return typeof value === "object" && value !== null && !Array.isArray(value) && Object.keys(value).length > 0;
};

const isFalsy = (value: unknown) => {
  return !value;
};

const passValidate = (
  value: unknown,
  validator: (value: unknown, options?: { strict?: boolean }) => boolean,
  options?: { strict?: boolean },
) => {
  const { strict = false } = options || {};
  return validator(value, { strict });
};

// ============================================================================

const useValidate = () => {
  const [errors, setErrors] = useState<Record<string, boolean> | null>(null);

  const empty = (value: unknown, options: { strict?: boolean } = {}) => {
    const { strict = false } = options;
    if (isEmptyArray(value)) return true;
    if (isEmptyObject(value)) return true;
    return strict ? isNullishStrict(value) : isFalsy(value);
  };

  const methods = { empty };

  const validate = (value: unknown, validator: (value: unknown) => boolean, options?: { strict?: boolean }) => {
    const { strict = false } = options || {};
    setErrors(null);

    if (isObject(value) && !empty(value)) {
      const entries = Object.entries(value as Record<string, unknown>);

      const result = entries.reduce((acc, [key, value]) => {
        acc[key] = validate(value, validator, { strict });
        return acc;
      }, {} as Record<string, boolean>);

      setErrors(result);
      const isPassed = Object.values(result).every((value) => value);

      return isPassed;
    } else {
      const isPassed = passValidate(value, validator, { strict });
      setErrors(isPassed ? null : { [value as string]: isPassed });
      return isPassed;
    }
  };

  return { validate, errors, methods };
};

export default useValidate;
