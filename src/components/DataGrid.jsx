function DataGrid({ title }) {

    return (
        <div className="mb-5">
            <h3 className="mb-3">{title}</h3>

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
    )
}

export default DataGrid