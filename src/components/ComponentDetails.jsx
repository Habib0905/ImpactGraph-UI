import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from "./Edit";
import CryptoJS from "crypto-js";
import {BASE_URL} from "../services/helper.js"


const ComponentDetails = ({ node }) => {
  const [impactedComponents, setImpactedComponents] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectNode, setSelectNode] = useState("");
  const [allComponents, setAllComponents] = useState([]);
  const token = localStorage.getItem("token");

  const encryptedRole = localStorage.getItem("role");
  const secretKey = "lomatulhabibinterns2";
  const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
  const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

  console.log(decryptedRole);
  const role = JSON.parse(decryptedRole);
  console.log(role);

  const handleUpdate = () => {
    if (role.includes("ROLE_ADMIN")) {
      if (selectNode != null) {
        setIsEditMode(true);
      }
    } else {
      document.getElementById("modal3").showModal();
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const deleteview = () => {
    if (role.includes("ROLE_ADMIN")) {
      if (impactedComponents.length <= 1) {
        document.getElementById("delete").showModal();
      } else {
        document.getElementById("Nodelete").showModal();
      }
    } else {
      document.getElementById("modal3").showModal();
    }
  };

  const fetchAllComponents = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/components/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllComponents(response.data);
    } catch (error) {
      console.error("There was an error fetching the components!", error);
    }
  };

  useEffect(() => {
    fetchAllComponents();
  }, []);

  useEffect(() => {
    if (node) {
      setSelectNode(
        allComponents.find((component) => component.id === node.id)
      );
      console.log(selectNode);
    }
  });

  const modalshow2 = () => {
    document.getElementById("modal2").showModal();
  };

  const deleteNode = async (id) => {
    modalshow2();
    console.log(id);

    try {
      const response = await axios.delete(
        `${BASE_URL}/api/components/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Successfully Deleted the component!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting the component:", error);
      toast.error("There was an error deleting the component.");
    }
  };

  useEffect(() => {
    if (node) {
      const fetchImpactedComponents = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/graph/impact/${node.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setImpactedComponents(response.data);
        } catch (error) {
          console.error("Error fetching impacted components:", error);
        }
      };

      fetchImpactedComponents();
    } else {
      setImpactedComponents([]);
    }
  }, [node]);

  if (!node) {
    return (
      <div className="p-4 border border-gray-400 rounded-lg shadow bg-black text-white absolute top-5 right-4 w-[350px]">
        <h3 className="text-lg font-bold mb-4 text-center">
          Component Details
        </h3>
        <p>No node selected. Click on a node to see its details.</p>
      </div>
    );
  }

  return (
    <div>
      {isEditMode ? (
        // console.log(selectNode)
        <div className="p-4 z-10 absolute top-5 right-4 w-[400px]">
          <Edit Component={selectNode} func={handleCancel} />
        </div>
      ) : (
        <div className="p-4 z-10 border border-gray-400 rounded-lg shadow bg-black  text-white absolute top-5 right-4 w-[350px]">
          <h3 className="text-lg font-bold mb-4 text-center">
            Component Details
          </h3>
          <div className="flex flex-col space-y-4">
            <p className="flex flex-row">
              <strong className="flex flex-row mr-2">
                <img className="h-6 w-6 mr-2" src="com.png"></img>
                Name:
              </strong>{" "}
              {node.name}
            </p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <p className="flex flex-row">
              <strong className="flex flex-row mr-2">
                <img className="h-6 w-6 mr-2" src="com.png"></img>
                ID:
              </strong>{" "}
              {node.id}
            </p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <p className="flex flex-row">
              <strong className="flex flex-row mr-2">
                <img className="h-6 w-6 mr-2" src="com.png"></img>
                Type:
              </strong>{" "}
              {node.type}
            </p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <p className="flex flex-row">
              <strong className="flex flex-row mr-2">
                <img className="h-6 w-6 mr-2" src="com.png"></img>
                IP:
              </strong>{" "}
              {node.ip}
            </p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <div className="w-full mt-5">
              <h3 className="text-lg text-white font-bold">
                {" "}
                Impacted Components :
              </h3>

              <div className="flex flex-wrap">
                <ul className="flex flex-wrap gap-3">
                  {impactedComponents.map((component, index) => {
                    return (
                      <li
                        className="bg-white text-pink-900 border-2 border-pink-950 rounded-md p-2 mt-3 flex items-center shadow-sm shadow-pink-900"
                        key={index}
                      >
                        {component ? (
                          component.properties.name
                        ) : (
                          <div>
                            <span className="loading loading-dots loading-xs"></span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {role == "ROLE_ADMIN" && (
              <div className="flex flex-row justify-center items-center space-x-5 ">
                <button
                  className="bg-white text-black hover:bg-pink-900 hover:text-white py-2 px-10 mt-5 rounded-lg"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="bg-white text-black hover:bg-pink-900 hover:text-white py-2 px-10 mt-5 rounded-lg"
                  onClick={deleteview}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <dialog id="delete" className="modal">
            <div className="modal-box bg-white">
              <p className="py-4 text-black">
                {" "}
                Do you want to delete the node ?{" "}
              </p>

              <div className="flex flex-row justify-center items-center space-x-5 ">
                <button
                  className="bg-gradient-to-br from-black to-pink-950 text-white py-2 px-10 mt-5 rounded-lg"
                  onClick={() => deleteNode(node.id)}
                >
                  Yes
                </button>
                <form method="dialog">
                  <button className="bg-gradient-to-br from-black to-pink-950 text-white py-2 px-10 mt-5 rounded-lg">
                    No
                  </button>
                </form>
              </div>
            </div>
          </dialog>

          <dialog id="Nodelete" className="modal">
            <div className="modal-box bg-white">
              <form method="dialog">
                <button className="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <p className="py-4 text-black ">
                {" "}
                The node you want to delete has impact on other nodes{" "}
              </p>
              <p className="py-4 text-black ">
                {" "}
                Please remove the edges of the node and try again !!{" "}
              </p>
            </div>
          </dialog>

          <dialog id="modal2" className="modal">
            <div>
              <span className="loading loading-spinner w-20 h-20 border-3"></span>
            </div>
          </dialog>

          <dialog id="modal3" className="modal">
            <div className="modal-box bg-white">
              <form method="dialog">
                <button className="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <p className="py-4 text-pink-900 ">
                {" "}
                Login As Admin and Try Again !!{" "}
              </p>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default ComponentDetails;
