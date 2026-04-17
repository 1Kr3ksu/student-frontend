import { use, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  
  const [students, setStudents] = useState([

  ]);

  const [courses] = useState([
    { id: 1, name: "Matematyka", code: "MATH101" },
    { id: 2, name: "Informatyka", code: "CS102" },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
const [msg , setMsg] =useState("");
useEffect(() => {
axios.get("http://localhost:3000/")
.then(res => setMsg(res.data.message) 
)
.catch(err => {
  
  console.log(err)
setMsg("Coś poszło nie tak")})
}, [])


useEffect(() => {
axios.get("http://localhost:3000/students")
.then(res => setStudents(res.data) 
)
.catch(err => {
  
  console.log(err)
setMsg("Coś poszło nie tak z /students")})
}, [])
  const addStudent = () => {
    if (!name || !email) return;
    setStudents([...students, { id: Date.now(), name, email }]);
    setName("");
    setEmail("");
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #fef08a, #fdba74, #f87171)",
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
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
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
              ))}
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