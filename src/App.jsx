import { useEffect, useState } from "react";
import "./App.css";
import {
  editEmployeeAPI,
  getAllEmployeesAPI,
  getOneEmployeeAPI,
  removeEmployeeAPI,
  saveEmployeeAPI,
} from "./services/allAPI";

function App() {
  const [empDetails, setEmpDetails] = useState({
    empID: "",
    username: "",
    email: "",
    empStatus: "",
  });

  const [allEmployees, setAllEmployees] = useState([]);

  const [editShow, setEditShow] = useState(false);

  const [editDetails, setEditDetails] = useState([]);

  // console.log(empDetails);

  const resetButton = () => {
    setEmpDetails({ empID: "", username: "", email: "", empStatus: "" });
  };

  const handleEmpDetails = async (e) => {
    e.preventDefault();
    const { empID, username, email, empStatus } = empDetails;
    if (empID && username && email && empStatus) {
      try {
        const result = await saveEmployeeAPI(empDetails);
        // console.log(result);
        if (result.status >= 200 && result.status < 300) {
          alert("Employee Added");
          resetButton();
        } else {
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Fill the Form");
    }
  };

  const getAllEmployees = async () => {
    try {
      const result = await getAllEmployeesAPI();
      if (result.status >= 200 && result.status < 300) {
        setAllEmployees(result.data);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const result = await removeEmployeeAPI(id);
    } catch (error) {
      console.log(error);
    }
  };

  const editEmployee = async (id) => {
    setEditShow(true);

    try {
      const result = await getOneEmployeeAPI(id);
      if (result.status >= 200 && result.status < 300) {
        setEditDetails(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editEmpDetails = async (e) => {
    e.preventDefault();

    const {empID, username, email, empStatus } = editDetails;
    if (empID && username && email && empStatus) {
      try {
        
        
        const result = await editEmployeeAPI(editDetails);
        if (result.status >= 200 && result.status < 300) {
          setEditShow(false);
          setEditDetails([])
        } else {
          console.log(result);
          alert("Error");
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      alert("Please fill all fields")
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, [allEmployees]);

  return (
    <>
      <div className="bg-slate-800 h-lvh flex gap-10 text-white">
        {/* FORM */}
        <div className="w-1/4 h-lvh flex flex-col justify-center items-center">
          {editShow ? (
            <>
              <h1 className="text-2xl text-white py-5 font-light">
                Edit Details
              </h1>
              <form
                action=""
                className="flex flex-col gap-3 w-full px-5  text-white"
              >
                <input
                  defaultValue={editDetails?.empID}
                  onChange={e=>setEditDetails({...editDetails,empID:e.target.value})}
                  type="text"
                  placeholder="Employee ID"
                  className="bg-slate-950 px-3 rounded py-2"
                />
                <input
                  defaultValue={editDetails?.username}
                  onChange={e=>setEditDetails({...editDetails,username:e.target.value})}
                  type="text"
                  placeholder="Username"
                  className="bg-slate-950 px-3 rounded py-2"
                />
                <input
                  defaultValue={editDetails?.email}
                  onChange={e=>setEditDetails({...editDetails,email:e.target.value})}
                  type="text"
                  placeholder="Email Address"
                  className="bg-slate-950 px-3 rounded py-2"
                />
                <select
                  defaultValue={editDetails?.empStatus}
                  onChange={e=>setEditDetails({...editDetails,empStatus:e.target.value})}
                  name=""
                  id=""
                  className="bg-slate-950 px-3 rounded py-2"
                >
                  <option>Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="flex justify-evenly mt-5">
                  <button
                    onClick={(e) => editEmpDetails(e)}
                    type="submit"
                    className="px-3 py-2 bg-slate-600 text-white rounded hover:bg-slate-800 hover:text-white  hover:border"
                  >
                    Apply Changes
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="border rounded-xl p-5">
              <h1 className="text-3xl leading-relaxed font-light">
                Employee <br /> Management <br />
                System{" "}
              </h1>
            </div>
          )}
        </div>
        {/* TABLE */}
        <div className="w-3/4 flex flex-col justify-center  mx-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border border-slate-600 p-2">Employee ID</th>
                <th className="border border-slate-600 p-2">Username</th>
                <th className="border border-slate-600 p-2">Email</th>
                <th className="border border-slate-600 p-2">Status</th>
                <th className="border border-slate-600 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allEmployees?.length > 0 ? (
                allEmployees.map((emp) => (
                  <tr key={emp?.id}>
                    <td className="border border-slate-600 p-2">
                      {emp?.empID}
                    </td>
                    <td className="border border-slate-600 p-2">
                      {emp?.username}
                    </td>
                    <td className="border border-slate-600 p-2">
                      {emp?.email}
                    </td>
                    <td className="border border-slate-600 p-2">
                      {emp?.empStatus}
                    </td>
                    <td className="border border-slate-600 p-2 flex justify-evenly">
                      <button
                        onClick={() => editEmployee(emp?.id)}
                        className="border hover:bg-white hover:text-black py-2 rounded w-28"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEmployee(emp?.id)}
                        className="border hover:bg-white hover:text-black py-2 rounded w-28"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="text-center mt-10 text-white">
                  No Employees added Yet !
                </div>
              )}
            </tbody>
          </table>
          <div className="">
            <h1 className="text-2xl text-white py-5 font-light">
              Add Employee
            </h1>
            <form
              action=""
              className="flex flex-col gap-3 w-3/4 px-5  text-black"
            >
              <input
                onChange={(e) =>
                  setEmpDetails({ ...empDetails, empID: e.target.value })
                }
                type="text"
                placeholder="Employee ID"
                className="px-3 rounded py-2"
                required
              />
              <input
                onChange={(e) =>
                  setEmpDetails({ ...empDetails, username: e.target.value })
                }
                type="text"
                placeholder="Username"
                className="px-3 rounded py-2"
                required
              />
              <input
                onChange={(e) =>
                  setEmpDetails({ ...empDetails, email: e.target.value })
                }
                type="text"
                placeholder="Email Address"
                className="px-3 rounded py-2"
                required
              />
              <select
                onChange={(e) =>
                  setEmpDetails({ ...empDetails, empStatus: e.target.value })
                }
                name=""
                id=""
                className="px-3 rounded py-2"
                required
              >
                <option>Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex justify-end gap-5 mt-5">
                <button
                  onClick={resetButton}
                  type="reset"
                  className="px-3 py-2 bg-slate-600 text-white rounded hover:bg-slate-800 hover:text-white  hover:border"
                >
                  Reset
                </button>
                <button
                  onClick={(e) => handleEmpDetails(e)}
                  type="submit"
                  className="px-10 py-2 bg-slate-600 text-white rounded hover:bg-slate-800 hover:text-white  hover:border"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
