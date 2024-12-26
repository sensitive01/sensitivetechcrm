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
      const response = await projectServices.get(`/project/getprojectbyid/${projectId}` );
      return response;
    } catch (err) {
      return err;
    }
  };


  export const updatetheProject = async (projectId, projectData) => {
    try {
        const response = await projectServices.put(`/project/updateprojectby/${projectId}`, projectData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (err) {
      return err;
    }
};


export const deletetheProject = async (projectId) => {
  if (!projectId) throw new Error("Invalid project ID for deletion");

  try {
      const response = await projectServices.delete(`/project/deleteproject/${projectId}`);
      return response;
  }  catch (err) {
    return err;
  }
};

export const createProject=async(projectData) => {
  try {
    const response = await projectServices.post(`/project/createproject`, projectData, {
      headers: {
          "Content-Type": "application/json",
      },
  });
    return response;
  } catch (err) {
    return err;
  }
};


// export const projectname=async() => {
//   try {
//     const response = await projectServices.get(`/projectname` );
//     return response;
//   } catch (err) {
//     return err;
//   }
// };



export const employeename=async() => {
  try {
    const response = await projectServices.get(`/employename` );
    return response;
  } catch (err) {
    return err;
  }
};


export const createTask=async(formData) => {
  try {
    const response = await projectServices.post(`/task/createtask`, formData, {
      headers: {
          "Content-Type": "application/json",
      },
  });
    return response;
  } catch (err) {
    return err;
  }
};


export const getTheTask=async(taskId) => {
  try {
    console.log("edit task")
    const response = await projectServices.get(`/task/gettaskbyid/${taskId}` );
    return response;
  } catch (err) {
    return err;
  }
};


export const updateTheTask = async (taskId, formData) => {
  try {
    const response = await projectServices.put(`/task/updatetask/${taskId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Let the browser set the boundary automatically
      },
    });
    return response.data; 
  } catch (err) {
    return err;
  }
};
