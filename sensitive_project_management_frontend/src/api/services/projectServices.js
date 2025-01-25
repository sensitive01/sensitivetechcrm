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


export const projectname=async() => {
  try {
    const responsename = await projectServices.get(`/project/projectname` );
    return responsename;
  } catch (err) {
    return err;
  }
};



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


export const createPayroll=async(formData) => {
  try {
    const response = await projectServices.post(`/payroll/createpayroll`, formData, {
      headers: {
          "Content-Type": "application/json",
      },
  });
    return response;
  } catch (err) {
    return err;
  }
};


export const getAllPayroll=async() => {
  try {
    const response = await projectServices.get(`/payroll/getpayroll` );
    return response;
  } catch (err) {
    return err;
  }
};

export const getPayrollById = async (payrollId) => {
  try {
    const response = await projectServices.get(`/payroll/getpayrollbyid/${payrollId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};


export const updatePayroll = async (payrollId, formData) => {
  try {
    const response = await projectServices.put(`/payroll/updatepayroll/${payrollId}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const getTotalEmployees=async() => {
  try {
    const response = await projectServices.get(`/totalemployee` );
    return response;
  } catch (err) {
    return err;
  }
};


export const getAttendance = async () => {
  try {
    const response = await projectServices.get(`/attendance/totalattendance`);
    return response;
  } catch (err) {
    return err;
  }
};

export const getTotalProjects = async () => {
  try {
    const response = await projectServices.get(`/project/totalprojects`);
    return response;
  } catch (err) {
    return err;
  }
};

export const getTasks = async () => {
  try {
    const response = await projectServices.get(`/task/totaltasks`);
    return response;
  } catch (err) {
    return err;
  }
};

export const getClients = async () => {
  try {
    const response = await projectServices.get(`/clients/totalclients`);
    return response;
  } catch (err) {
    return err;
  }
};

export const getLeave = async () => {
  try {
    const response = await projectServices.get(`/leaves/totalleaverequests`);
    return response;
  } catch (err) {
    return err;
  }
};

export const getTotalPayrolls = async () => {
  try {
    const response = await projectServices.get(`/payroll/totalpayrolls`);
    return response;
  } catch (err) {
    return err;
  }
};

export const getTotalLeads = async () => {
  try {
    const response = await projectServices.get(`/leads/totalleads`);
    return response;
  } catch (err) {
    return err;
  }
};


export const getLeaveById = async (id) => {
  try {
    const response = await projectServices.get(`/leaves/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const createPayment = async (formData) => {
  try {
    const response = await projectServices.post(`/payments/createpayment`, formData, {
      headers: {
        // No need to set "Content-Type" manually for FormData
      },
    });
    return response; // Return the successful response
  } catch (error) {
    console.error("Error in createPayment API:", error);
    // Re-throw the error to handle it properly in `handleSubmit`
    throw error;
  }
};

export const getTotalPayments = async () => {
  try {
    const response = await projectServices.get(`/payments/getallpayments`);
    return response;
  } catch (err) {
    return err;
  }
};

export const updatePaymentById = async (paymentId, formData) => {
  try {
    const response = await projectServices.put(`/payments/updatepayment/${paymentId}`, formData);
    return response;
  } catch (err) {
    console.error("Error in updatePaymentById:", err);
    throw err;
  }
};


export const getPaymentById = async (paymentId) => {
  try {
    const response = await projectServices.get(`/payments/getpayment/${paymentId}`,  {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const createExpense = async (formData) => {
  try {
    const response = await projectServices.post(`/expense/createexpense`, formData, {
      headers: {
      },
    });
    return response;
  } catch (error) {
    console.error("Error in createPayment API:", error);
    throw error;
  }
};

export const getTotalExpense = async () => {
  try {
    const response = await projectServices.get(`/expense/getallexpense`);
    return response;
  } catch (err) {
    return err;
  }
};


export const updateExpenseById = async (expenseId, formData) => {
  try {
    const response = await projectServices.put(`/expense/updateexpense/${expenseId}`, formData);
    return response;
  } catch (err) {
    console.error("Error in updateExpenseById:", err);
    throw err;
  }
};


export const getExpenseById = async (expenseId) => {
  try {
    const response = await projectServices.get(`/expense/getexpense/${expenseId}`,  {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};




