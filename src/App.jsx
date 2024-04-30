import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { privateRoutes, publicRoutes } from "./routes";
import { DefaultLayout } from "./layouts";
import { RequireAuth, PersistLogin } from "./components";
const App = () => {
  return (
    <Router>
      <div className="w-full overflow-hidden">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = route.layout === null ? Fragment : DefaultLayout;
            let Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              {privateRoutes.map((route, index) => {
                let Layout = route.layout === null ? Fragment : DefaultLayout;
                let Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
