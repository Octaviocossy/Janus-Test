import { BrowserRouter, Route, Routes as RRoutes } from 'react-router-dom';

import { Layout } from './ui';
import { Routes } from './models';
import { Home, Reportes } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <RRoutes>
        <Route element={<Layout />}>
          <Route element={<Home />} path={Routes.HOME} />
          <Route element={<Reportes />} path={Routes.REPORTES} />
          <Route element={<p>Create</p>} path={`${Routes.REPORTES}/create`} />
          <Route
            element={<p>Edit</p>}
            path={`${Routes.REPORTES}/edit/:idReporte`}
          />
        </Route>
      </RRoutes>
    </BrowserRouter>
  );
};

export default App;
