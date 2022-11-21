import { BrowserRouter, Route, Routes as RRoutes } from 'react-router-dom';

import { Layout } from './ui';
import { Routes } from './models';
import { Home, Reportes, Form } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <RRoutes>
        <Route element={<Layout />}>
          <Route element={<Home />} path={Routes.HOME} />
          <Route element={<Reportes />} path={Routes.REPORTES} />
          <Route element={<Form />} path={`${Routes.REPORTES}/create`} />
          <Route
            element={<Form />}
            path={`${Routes.REPORTES}/edit/:idReporte`}
          />
        </Route>
      </RRoutes>
    </BrowserRouter>
  );
};

export default App;
