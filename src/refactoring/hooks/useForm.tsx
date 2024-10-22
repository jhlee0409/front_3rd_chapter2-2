import { useRef, useState } from "react";

type UseFormProps<T> = {
  defaultValues: T;
};

function useForm<T>({ defaultValues }: UseFormProps<T>) {
  const [data, setForm] = useState(defaultValues);
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const handleSubmit = (callback: (data: T) => void) => {
    callback(data);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    inputRefs.current.get(name)?.blur();
  };

  const setRef = (name: string, el: HTMLInputElement) => {
    inputRefs.current.set(name, el);
  };

  const register = (name: string) => {
    return {
      name,
      onBlur,
      onChange,
      ref: setRef,
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

export default useForm;
