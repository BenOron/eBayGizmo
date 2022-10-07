
import './App.css';
import './styles/style.css'
import AboutPage from "./component/AboutPage"
import ImagesByDate from "./component/ImagesByDate"
import MarsWeather from "./component/MarsWeather"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";



function App() {

    const routes = [
        {
            path: "/imagesByDate",
            component: ImagesByDate
        },
        {
            path: "/marsWeather",
            component: MarsWeather
        },
        {
            path: "/",
            component: AboutPage
        },

    ];

    const RouteWithSubRoutes = (route)  => {
        return (
            <Route
                path={route.path}
                render={props => (
                    // pass the sub-routes down to keep nesting
                    <route.component {...props} routes={route.routes} />
                )}
            />
        );
    }


  return (
      <div className="App">
        <Router>

            <Switch>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </Switch>
        </Router>
      </div>
  );
}

export default App;
