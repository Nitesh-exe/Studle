// frontend/src/hooks/useToggle.ts
import { useCallback, useState } from "react";

export default function useToggle(
  initialValue = false,
) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  const enable = useCallback(() => {
    setValue(true);
  }, []);

  const disable = useCallback(() => {
    setValue(false);
  }, []);

  return {
    value,
    setValue,
    toggle,
    enable,
    disable,
  };
}