import axios from "axios";
import { useState } from "react";

export default function LayAnhTheoIdSP(id) {
  const [anh, setAnh] = useState([]);
  let API = `http://localhost:8080/api/hinhanh/${id}`;

  const layAnh = async () => {
    const data = await axios.get(API);
    setAnh(data.data.result);
  };

  useEffect(() => {
    layAnh();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}
