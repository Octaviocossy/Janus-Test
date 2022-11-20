import { createContext } from 'react';

import { Reporte } from '../models';

interface State {
  reportes: Reporte[];
}

interface Actions {
  getReportes: () => void;
}

interface Props {
  state: State;
  actions: Actions;
}

const Context = createContext({} as Props);

export default Context;
