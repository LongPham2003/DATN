import { useNavigate } from "react-router-dom";

const Forbidden403 = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const role = localStorage.getItem("userRole");
    if (role === "ROLE_NHANVIEN") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>403 - Forbidden</h1>
      <p style={styles.message}>
        You don&rsquo;t have permission to access this page.
      </p>
      <button style={styles.button} onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#f5c6cb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Forbidden403;
