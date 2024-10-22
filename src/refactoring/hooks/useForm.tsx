import { useRef, useState } from "react";

type UseFormProps<T> = {
  defaultValues: T;
};

type InputTypes = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function useForm<T>({ defaultValues }: UseFormProps<T>) {
  const [data, setForm] = useState(defaultValues);
  const inputRefs = useRef<Map<string, InputTypes>>(new Map());

  const handleSubmit = (callback: (data: T) => void, e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    callback(data);
  };

  const onChange = (e: React.ChangeEvent<InputTypes>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onBlur = (e: React.FocusEvent<InputTypes>) => {
    const { name } = e.target;
    inputRefs.current.get(name)?.blur();
  };

  const setRef = (name: string, el: InputTypes | null) => {
    if (el) {
      inputRefs.current.set(name, el);
    } else {
      inputRefs.current.delete(name);
    }
  };

  const register = (name: string) => {
    return {
      name,
      onBlur,
      onChange,
      ref: (el: InputTypes | null) => setRef(name, el),
    };
  };

  const reset = (newValues?: T, options: { keepValues?: boolean } = {}) => {
    if (!newValues) {
      setForm(defaultValues);
      return;
    }
    setForm((prev) => (options.keepValues ? { ...prev, ...newValues } : newValues));
  };

  return { data, handleSubmit, register, reset };
}

// ========================================================

export type UseFormReturn<T> = ReturnType<typeof useForm<T>>;

type BaseInputProps<T> = {
  label: string;
  id: string;
  value: T[keyof T];
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
