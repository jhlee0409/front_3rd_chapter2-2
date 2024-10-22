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

export default useForm;

// ref 콜백 타입: ref 콜백 함수의 매개변수 타입을 InputTypes | null로 설정하여, null 값도 처리할 수 있도록 합니다.
// 이는 React가 컴포넌트가 언마운트될 때 null을 전달하기 때문입니다.

// setRef 함수: setRef 함수는 el이 null이 아닐 때만 Map에 ref를 저장하고, null일 경우 Map에서 해당 ref를 삭제합니다.

// 이렇게 수정하면 ref 속성이 HTMLInputElement와 호환되며, 오류가 해결됩니다.
