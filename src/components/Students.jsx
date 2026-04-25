import { useState, useEffect } from "react";
import axios from "axios";

function Students({ setMsg }) {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((res) => {
        const normalized = (res.data || []).map((s) => ({
          id: s.id ?? s.ID ?? s.insertId ?? null,
          full_name: s.full_name ?? s.name ?? "",
          email: s.email ?? "",
        }));
        console.log(normalized);
        setStudents(normalized);
      })
      .catch(() => setMsg("Coś poszło nie tak z /students"));
  }, [setMsg]);

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
          {students.map((s, i) => {
            console.log(s.id);
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
