function GPA() {
  return (
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
  );
}

export default GPA;
