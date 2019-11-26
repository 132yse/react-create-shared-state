import { useState, useEffect } from 'fre'

export function createContext(defaultValue) {
  const listeners = new Set()
  let backupValue = defaultValue

  return (): [ValueType, React.Dispatch<React.SetStateAction<ValueType>>] => {
    const [value, setValue] = useState<ValueType>(backupValue);

    useEffect(() => {
      backupValue = value;
      listeners.forEach(listener => listener !== setValue && listener(value));
    }, [value]);

    useEffect(() => {
      listeners.add(setValue);
      return () => {
        listeners.delete(setValue);
      };
    }, []);

    return [value, setValue];
  };
}
