import { Radio } from "@material-tailwind/react";

export default function UpdateMauSac() {
  return (
    <>
      <form action="">
        <span>Cap nhat mau sac</span>
        <div>
          <label htmlFor="">Ten mau sac</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Trang Thai</label>
          <Radio name="status" value="kinh_doanh" onChange={() => {}} />
          Kinh doanh
          <br />
          <Radio name="status" value="ngung_kinh_doanh" onChange={() => {}} />
          Ngung Kinh doanh
        </div>
        <button type="submit">sua</button>
      </form>
    </>
  );
}
