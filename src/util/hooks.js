import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values
  };
};

export const clearCache = (cache, queryName, args) => {
  if (args) cache.evict({fieldName: queryName, args: args })
  else cache.evict({fieldName: queryName})
  cache.gc();
}