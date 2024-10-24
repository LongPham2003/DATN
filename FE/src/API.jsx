import axios from "axios";

export const get = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const post = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const put = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const del = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
