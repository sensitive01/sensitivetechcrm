import { projectServices } from "../axios/axiosInstance";


export const verifyLogin = async (formData) => {
  try {
    const response = await projectServices.post(`/employee-login/login`, 
        formData,
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getAllProject=async() => {
    try {
      const response = await projectServices.get(`/project/getallprojects` );
      return response;
    } catch (err) {
      return err;
    }
  };


  export const getTheProject=async(projectId) => {
    try {
      const response = await projectServices.get(`/project/updateprojectby/${projectId}` );
      return response;
    } catch (err) {
      return err;
    }
  };