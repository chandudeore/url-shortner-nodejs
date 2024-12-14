import axiosInstance from "./AxiosInstance";

const getData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response;
  } catch (error) {
    return error;
  }
};

const postData = async (endpoint: string, data: unknown) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response;
  } catch (error) {
    return error;
  }
};

export { getData, postData };
