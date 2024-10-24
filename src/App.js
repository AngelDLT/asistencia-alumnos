import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Login,
  Home,
  NotFound,
  PrivateRoute,
  GlobalProvider,
} from "./components";

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
