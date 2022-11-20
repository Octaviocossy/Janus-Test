import { useContext } from 'react';

import { Context } from '../context';

const useProvider = () => {
  const { state, actions } = useContext(Context);

  return { state, actions };
};

export default useProvider;
