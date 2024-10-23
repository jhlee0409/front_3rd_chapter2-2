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
  const [errors, setErrors] = useState<Record<string, boolean>[] | null>(null);

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

    // if (Object.keys(value).length === 0) {
    //   return true;
    // } else if (!empty(value)) {
    //   const entries = Object.entries(value as Record<string, unknown>);

    //   const result = entries.map(([key, value]) => {
    //     return { [key]: validate(value, validator, { strict }) };
    //   });

    //   setErrors(result);
    //   const isPassed = result.filter((item) => !item[key]).length === 0;
    //   return true
    // }

    const isPassed = passValidate(value, validator, { strict });
    setErrors(isPassed ? null : [{ [value as string]: isPassed }]);
    return isPassed;
  };

  return { validate, errors, methods };
};

export default useValidate;
