import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";

const EdgeDetails = ({ selectedEdge }) => {
  const token = localStorage.getItem("token");
  const encryptedRole = localStorage.getItem("role");
  const secretKey = "lomatulhabibinterns2"; // Use the same secret key
  const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
  const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

  console.log(decryptedRole);
  const role = JSON.parse(decryptedRole);
  console.log(role);

  const deleteView = () => {
    if (role.includes("ROLE_ADMIN")) {
      document.getElementById("deleteEdge").showModal();
    } else {
      document.getElementById("modal3").showModal();
    }
  };
  const deleteEdge = async (id) => {
    try {
      console.log("Edge Id", id);
      await axios.delete(`http://localhost:8081/api/graph/edge/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Edge Deleted Sucessfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error deleting edge:", error);
      alert("Failed to delete edge");
    }
  };
  const modalshow = () => {
    document.getElementById("modal").showModal();
  };
  return (
    <div className="p-4 z-10 border border-gray-400 rounded-lg shadow bg-black text-white absolute top-5 right-4 w-[350px]">
      <h3 className="text-lg font-bold mb-4 text-center">Edge Details</h3>
      <div className="flex flex-col space-y-4 ">
        <p>
          <span className="badge badge-outline">
            <strong>Source </strong>
          </span>
          <span> : {selectedEdge.from}</span>
        </p>
        <p>
          <span className="badge badge-outline">
            <strong>Target </strong>
          </span>
          <span> : {selectedEdge.to}</span>
        </p>
        {role == "ROLE_ADMIN" && (
          <button className="btn bg-pink-900 text-white" onClick={deleteView}>
            Delete Edge
          </button>
        )}
      </div>

      <dialog id="deleteEdge" className="modal">
        <div className="modal-box bg-white">
          <p className="py-4 text-black"> Do you want to delete this edge ? </p>

          <div className="flex flex-row justify-center items-center space-x-5 ">
            <button
              className="bg-gradient-to-br from-black to-pink-950 text-white py-2 px-10 mt-5 rounded-lg"
              onClick={() => deleteEdge(selectedEdge.id)}
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
  );
};

export default EdgeDetails;
