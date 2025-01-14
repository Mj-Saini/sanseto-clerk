import "./App.css";
import ScrollTop from "./components/common/ScrollTop";
import UserLogin from "./routes/main-routes/UserLogin";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
    <ScrollTop/>
   
      <UserLogin />
    </>
  );
}

export default App;
