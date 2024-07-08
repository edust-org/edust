import axiosInstance from "../axios-instance";

export const siteBuilder = {
  getPages: async () => {
    try {
      const res = await axiosInstance.get("/organization_page");
      if (res.status === 200) {
        return res.data;
      } else {
        console.error(`Unexpected response status: ${res.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching site pages:", error);
      return null;
    }
  },
  postPage: async (data: unknown) => {
    try {
      const response = await axiosInstance.post("/organization_page", data);
      if (response.status === 201) {
        return response.data;
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error posting organization page data:", error);
      return null;
    }
  },
};
