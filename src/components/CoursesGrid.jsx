function CoursesGrid(){
return(
    <>
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
    </>
)
}
export default CoursesGrid