import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => setMsg(res.data.message ?? res.data.msg ?? ""))
      .catch(() => setMsg("Coś poszło nie tak"));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((res) => {
        const normalized = (res.data || []).map((s) => ({
          id: s.id ?? s.ID ?? s.insertId ?? null,
          full_name: s.full_name ?? s.name ?? "",
          email: s.email ?? "",
        }));
        console.log(normalized)
        setStudents(normalized);
      })
      .catch(() => setMsg("Coś poszło nie tak z /students"));
  }, []);

  const addStudent = () => {
    if (!name || !email) return;

    axios
      .post("http://localhost:3000/students", { name, email })
      .then((res) => {
        const created = {
          id: res.data.id ?? res.data.insertId ?? null,
          full_name: res.data.full_name ?? res.data.name ?? name,
          email: res.data.email ?? email,
        };
        setStudents((prev) => [...prev, created]);
        setName("");
        setEmail("");
      })
      .catch(() => setMsg("Błąd przy dodawaniu studenta"));
  };

  const deleteStudent = (id) => {
    if (!id) {
      setMsg("Brak id studenta — upewnij się, że backend zwraca id w GET/POST");
      return;
    }
    if (!window.confirm("Usuń studenta?")) return;

    axios
      .delete(`http://localhost:3000/students/${id}`)
      .then(() => setStudents((prev) => prev.filter((s) => s.id !== id)))
      .catch(() => setMsg("Błąd przy usuwaniu studenta"));
  };

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

        {/* STUDENTS */}
        <div className="mb-5">
          <h3 className="mb-3">Students</h3>

          <div
            className="card p-3 mb-3"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
            }}
          >
            <div className="row g-2">
              <div className="col-md-5">
                <input
                  className="form-control"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-5">
                <input
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary w-100"
                  style={{ borderRadius: "10px" }}
                  onClick={addStudent}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover shadow">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) =>{
                console.log(s.id)
                return (
                <tr key={s.id ?? i}>
                  <td>{s.full_name ?? s.name}</td>
                  <td>{s.email}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ borderRadius: "8px" }}
                      onClick={() => deleteStudent(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
              } 
              )}
            </tbody>
          </table>
        </div>

        {/* COURSES */}
        <div className="mb-5">
          <h3 className="mb-3">Courses</h3>

          <div
            className="card p-3"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
            }}
          >
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ENROLLMENTS */}
        <div className="mb-5">
          <h3 className="mb-3">Enrollments</h3>
          <div
            className="card p-3 text-muted"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
            }}
          >
            (UI placeholder) Student ↔ Course assignment will be here
          </div>
        </div>

        {/* GPA */}
        <div>
          <h3 className="mb-3">GPA</h3>
          <div
            className="card p-3"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
            }}
          >
            <h2>4.25</h2>
            <p className="text-muted">Sample GPA preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;