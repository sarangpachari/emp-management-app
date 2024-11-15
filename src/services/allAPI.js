import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";

export const saveEmployeeAPI = async (empDetails) => {
  return await commonAPI("POST", `${SERVERURL}/employees`, empDetails);
};

export const getAllEmployeesAPI = async () => {
  return await commonAPI("GET", `${SERVERURL}/employees`, {});
};

export const removeEmployeeAPI = async (id) => {
  return await commonAPI("DELETE", `${SERVERURL}/employees/${id}`, {});
};

export const editEmployeeAPI = async (empDetails) => {
  return await commonAPI("PUT", `${SERVERURL}/employees/${empDetails.id}`, empDetails);
};

export const getOneEmployeeAPI = async (id) => {
  return await commonAPI("GET", `${SERVERURL}/employees/${id}`, {});
};
