import { useParams } from "react-router-dom";
import AnhSP from "./component/Anh";
import ChonSizeVSMauSac from "./component/ThongTinSPvaChonSizeMS";
import ThongTinKhac from "./component/CacThongTinKhac";

export default function ChiTietSanPham() {
  const id = useParams();
  const idInt = id.id;

  console.log(idInt);

  return (
    <>
      <div className="mt-5">
        <div className="flex gap-4">
          <div className="w-1/2">
            <AnhSP id={idInt} />
          </div>
          {/* Thong tin SP */}
          <div className="w-1/2">
            <ChonSizeVSMauSac id={idInt} />
          </div>
        </div>
      </div>
    </>
  );
}
