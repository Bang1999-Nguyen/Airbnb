
import './App.css';
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loader from './components/Loader/Loader';
import { adminRoutes, clientRoutes } from './routes';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
const HomePage = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 4 * 1000)).then(
      () => import("./containers/Home/Home")
  );
});

function App() {
  const renderLayout = (routes, Layout) =>{
    return routes.map((route) =>{
      const { path, component, exact, isPrivate } = route;
      return (
        <Layout
          path={path}
          component={component}
          exact={exact}
          isPrivate={isPrivate}
        />
      );
    })
  }
  return (
    <div className="App">
      <Suspense fallback={<Loader/>}>
        <Router>
          <Switch>
           {renderLayout(clientRoutes, ClientLayout)}
           <Route path='/' component={HomePage} exact={true} />
           {renderLayout(adminRoutes, AdminLayout)}
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
