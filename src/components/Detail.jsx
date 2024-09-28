import React, { useState, useEffect } from "react";
import axios from "axios";
import Edit from "./Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";

const Detail = ({ Component }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [allComponents, setAllComponents] = useState([]);
  const [impactedComponents, setImpactedComponents] = useState([]);
  const token = localStorage.getItem("token");
  const encryptedRole = localStorage.getItem("role");
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
  const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  console.log(decryptedRole);
  const role = JSON.parse(decryptedRole);
  console.log(role);

  const handleUpdate = () => {
    if (role.includes("ROLE_ADMIN")) {
      setIsEditMode(true);
    } else {
      document.getElementById("modal3").showModal();
    }
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
  const modalshow2 = () => {
    document.getElementById("modal2").showModal();
  };

  const deleteNode = (id) => {
    modalshow2();
    console.log(id);

    axios
      .delete(`${baseUrl}/api/components/delete/` + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Successfully Deleted the component !");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        console.log(res.data);
      })
      .catch((err) => toast.error(err));
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    if (Component) {
      const fetchImpactedComponents = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/api/graph/impact/${Component.id}`,
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
  }, [Component]);

  useEffect(() => {
    const fetchAllComponents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/components/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllComponents(response.data);
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };

    fetchAllComponents();
  }, []);

  return (
    <div className="mt-10 h-full bg-white w-full">
      {isEditMode ? (
        <Edit Component={Component} func={handleCancel} />
      ) : (
        <div className=" border-1 p-3 rounded-md shadow-lg shadow-pink-950 border-pink-950 ">
          <h2 className="text-xl text-center text-pink-950 font-bold mb-4">
            {Component.name}
          </h2>

          <p className=" text-pink-950 flex flex-row">
            <strong className=" text-pink-950 flex flex-row mr-2">
              <img className="h-6 w-6 mr-2" src="com.png"></img>
              ID:
            </strong>{" "}
            {Component.id}
          </p>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <p className=" text-pink-950 flex flex-row">
            <strong className=" text-pink-950 flex flex-row mr-2">
              <img className="h-6 w-6 mr-2" src="com.png"></img>
              Type:
            </strong>{" "}
            {Component.type}
          </p>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <p className=" text-pink-950 flex flex-row">
            <strong className=" text-pink-950 flex flex-row mr-2">
              <img className="h-6 w-6 mr-2" src="com.png"></img>
              Ip:
            </strong>{" "}
            {Component.ip}
          </p>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="w-full mt-5">
            <h3 className="text-lg text-pink-950  font-bold">
              Incoming Components :
            </h3>
            <div className="flex flex-wrap">
              <ul className="flex flex-wrap gap-3">
                {Component.incomingNodeIds.map((id) => {
                  const node = allComponents.find(
                    (component) => component.id === id
                  );

                  return (
                    <li
                      className="bg-white  text-pink-900 border-2 border-pink-950 rounded-md p-2 mt-3 flex items-center"
                      key={id}
                    >
                      {node ? (
                        node.name
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

          <div className="w-full mt-5">
            <h3 className="text-lg text-pink-950  font-bold">
              Outgoing Components :
            </h3>
            <div className="flex flex-wrap">
              <ul className="flex flex-wrap gap-3">
                {Component.outgoingNodeIds.map((id) => {
                  const node = allComponents.find(
                    (component) => component.id === id
                  );

                  return (
                    <li
                      className="bg-white border-2 text-pink-900 border-pink-950 rounded-md p-2 mt-3 flex items-center"
                      key={id}
                    >
                      {node ? (
                        node.name
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

          <div className="w-full mt-5">
            <h3 className="text-lg text-pink-950  font-bold">
              Impacted Components :
            </h3>
            <div className="flex flex-wrap">
              <ul className="flex flex-wrap gap-3">
                {impactedComponents.map((component, index) => {
                  return (
                    <li
                      className="bg-white text-pink-900 border-2 border-pink-950 rounded-md p-2 mt-3 flex items-center"
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
            <div className="flex flex-row justify-center items-center gap-5 ">
              <button
                type="button"
                className="bg-pink-900 w-max  text-white hover:bg-black font-bold py-2 px-10 mt-5 rounded-lg"
                onClick={handleUpdate}
              >
                {" "}
                Update{" "}
              </button>

              <button
                type="button"
                className="bg-pink-900 w-max  text-white hover:bg-black font-bold py-2 px-10 mt-5 rounded-lg"
                onClick={deleteview}
              >
                {" "}
                Delete{" "}
              </button>
            </div>
          )}

          <dialog id="delete" className="modal">
            <div className="modal-box bg-white">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <p className="py-4 text-black">
                {" "}
                Do you want to delete the node ?{" "}
              </p>

              <div className="flex flex-row justify-center items-center space-x-5 ">
                <button
                  className="bg-gradient-to-br from-black to-pink-950 text-white py-2 px-10 mt-5 rounded-lg"
                  onClick={() => deleteNode(Component.id)}
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
                The component has impact on other components !{" "}
              </p>
              <p className="py-4 text-black ">
                {" "}
                Please remove the dependencies of the component and try again{" "}
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

export default Detail;
