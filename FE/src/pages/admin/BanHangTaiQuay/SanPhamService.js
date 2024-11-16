import axios from "./../../../api/axiosConfig";

export const getAllSPCTBH = async (params = {}) => {
    const ApiLaySPCT = `http://localhost:8080/api/sanphamchitiet/getallSPCTBH`;
    const data = await axios.get(ApiLaySPCT, { params });
    return data.data.result;
};