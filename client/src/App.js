import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const handleLogin = async () => {
    window.location.href = "http://localhost:5000/auth/google";
    // try {
    //   const res = await axios.get("http://localhost:5000/auth/google");
    //   console.log("res", res);
    // } catch (error) {
    //   console.error("res", error);
    // }
  };
  return (
    <div className="App">
      <h1>Google Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default App;
