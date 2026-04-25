import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Students from "./components/Students";
import Courses from "./components/Courses";
import Enrollments from "./components/Enrollments";
import GPA from "./components/GPA";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => setMsg(res.data.message ?? res.data.msg ?? ""))
      .catch(() => setMsg("Coś poszło nie tak"));
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom right, #fef08a, #fdba74, #f87171)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {msg}
      <div className="container py-4">
        <h1 className="mb-4 fw-bold text-dark">SRMS Dashboard</h1>

        <Students setMsg={setMsg} />
        <Courses />
        <Enrollments />
        <GPA />
      </div>
    </div>
  );
}

export default App;