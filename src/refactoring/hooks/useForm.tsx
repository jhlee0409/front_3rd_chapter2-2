import { useCallback, useMemo, useRef, useState } from "react";
import { createUpdatedObject } from "../lib/object";

type UseFormProps<T> = {
  defaultValues?: T;
};

type InputTypes = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type RegisterOptions = {
  setValueAs?: (value: string) => string | number;
};

// C 계산 form
const convertValueByOptions = (value: string | number, options?: RegisterOptions) => {
  return options?.setValueAs?.(value.toString()) ?? value;
};

// C 계산 form
function changedValue<T>(prev: T, name: string, value: string | number, options?: RegisterOptions) {
  return { ...prev, [name]: convertValueByOptions(value, options) };
}

function useForm<T>(props?: UseFormProps<T>) {
  const { defaultValues = {} as T } = props ?? {};
  const [data, setForm] = useState<T>(defaultValues);
  const inputRefs = useRef<Map<string, InputTypes>>(new Map());

  const setValue = useCallback((name: string, value: string | number, options?: RegisterOptions) => {
    setForm((prev) => changedValue(prev, name, value, options));
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<InputTypes>, options?: RegisterOptions) => {
    const { name, value } = e.target;
    setForm((prev) => changedValue(prev, name, value, options));
  }, []);

  const onBlur = useCallback((e: React.FocusEvent<InputTypes>) => {
    const { name } = e.target;
    inputRefs.current.get(name)?.blur();
  }, []);

  const setRef = useCallback((name: string, el: InputTypes | null) => {
    if (el) {
      inputRefs.current.set(name, el);
    } else {
      inputRefs.current.delete(name);
    }
  }, []);

  const reset = useCallback((newValues?: Partial<T>, options: { keepValues?: boolean } = {}) => {
    if (!newValues) {
      setForm(defaultValues);
    } else {
      setForm((prev) => (options.keepValues ? createUpdatedObject(prev, newValues) : newValues) as T);
    }
  }, []);

  const handleSubmit = useCallback(
    (callback: (props: T) => void, options?: { reset?: boolean }) => (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      callback(data);
      if (options?.reset) {
        reset();
      }
    },
    [data, reset],
  );

  const register = useMemo(
    () => (name: string, options?: RegisterOptions) => {
      return {
        name,
        onBlur,
        onChange: (e: React.ChangeEvent<InputTypes>) => onChange(e, options),
        ref: (el: InputTypes | null) => setRef(name, el),
      };
    },
    [onBlur, onChange, setRef],
  );

  return { data, handleSubmit, register, reset, setValue };
}

//  export type ==============================================================

export type UseFormReturn<T> = ReturnType<typeof useForm<T>>;

type BaseInputProps<T> = {
  label?: string;
  id: string;
  value: T[keyof T];
  placeholder?: string;
} & ReturnType<UseFormReturn<T>["register"]>;

type TextInputProps<T> = BaseInputProps<T> & {
  type: HTMLInputElement["type"];
};

type SelectInputProps<T> = BaseInputProps<T> & {
  type: "select";
  options: {
    label: string;
    value: string;
  }[];
};

export type InputProps<T> = TextInputProps<T> | SelectInputProps<T>;

export default useForm;
