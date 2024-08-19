import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Add = () => {
  const [componentData, setComponentData] = useState({
    name: "",
    ip: "",
    type: "",
    incomingNodeIds: [],
    outgoingNodeIds: [],
  });

  const [allComponents, setAllComponents] = useState([]);
  const [incomingComponent, setIncomingComponent] = useState("");
  const [outgoingComponent, setOutgoingComponent] = useState("");
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllComponents = () => {
    axios
      .get("http://localhost:8081/api/components/all")
      .then((response) => {
        setAllComponents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the components!", error);
      });
  };

  useEffect(() => {
    fetchAllComponents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComponentData({ ...componentData, [name]: value });

    if (name === "type") {
      // Convert all component types to lowercase and use a Set to filter out duplicates
      const uniqueTypes = [
        ...new Set(
          allComponents
            .map((component) => component.type.toLowerCase())
            .filter((type) => type.trim() !== "") // Remove empty types
        ),
      ];

      // Filter types based on input value, ensuring case-insensitive comparison
      const filtered = uniqueTypes.filter((type) =>
        type.includes(value.toLowerCase())
      );

      // Update state with the filtered unique types
      setFilteredTypes(filtered);
      setShowTypeOptions(true);
    }
  };

  const handleTypeOptionClick = (type) => {
    setComponentData({ ...componentData, type });
    setShowTypeOptions(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowTypeOptions(false), 200);
  };

  const modalshow = () => {
    document.getElementById("modal").showModal();
  };

  const handleNodeSelect = (id, type) => {
    if (type === "incoming") {
      if (!componentData.incomingNodeIds.includes(id)) {
        setComponentData({
          ...componentData,
          incomingNodeIds: [...componentData.incomingNodeIds, id],
        });
      } else {
        modalshow();
      }
    } else {
      if (!componentData.outgoingNodeIds.includes(id)) {
        setComponentData({
          ...componentData,
          outgoingNodeIds: [...componentData.outgoingNodeIds, id],
        });
      } else {
        modalshow();
      }
    }
  };

  const handleNodeRemove = (id, type) => {
    if (type === "incoming") {
      setComponentData({
        ...componentData,
        incomingNodeIds: componentData.incomingNodeIds.filter(
          (nodeId) => nodeId !== id
        ),
      });
    } else {
      setComponentData({
        ...componentData,
        outgoingNodeIds: componentData.outgoingNodeIds.filter(
          (nodeId) => nodeId !== id
        ),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("http://localhost:8081/api/components/create", componentData)
      .then((response) => {
        console.log("Component created successfully!", response.data);
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate("/graph");
        }, 3000);
        fetchAllComponents();
      })
      .catch((error) => {
        console.error("There was an error creating the component!", error);
        setAlertType("error");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Alert type={alertType} isVisible={alertVisible} />
      <div className="hero min-h-screen relative">
        <img
          className="w-full h-full object-cover top-0 left-0"
          src="loma.avif"
          alt="Background"
        />

        <p className="absolute top-0 text-center text-4xl text-pink-900 p-5 mb-14 mx-auto font-abc font-bold">
          Create Component
        </p>

        <form onSubmit={handleSubmit}>
          <div className="absolute top-0 left-0 w-full h-full"></div>

          <div className="relative mt-10 z-10 mb-10 bg-white border-pink-900 border-2 bg-opacity-90 rounded shadow-2xl shadow-white w-[700px] h-auto p-10 mx-auto flex flex-col justify-center items-center">
            <label
              htmlFor="name"
              className="input input-bordered input-black flex items-center w-full gap-2"
            >
              Name:
              <input
                required
                type="text"
                id="name"
                name="name"
                value={componentData.name}
                onChange={handleInputChange}
                className="grow"
                placeholder="e.g. Database"
              />
            </label>

            <label
              htmlFor="ip"
              className="input input-bordered input-black flex items-center gap-2 w-full mt-5"
            >
              IP:
              <input
                required
                type="text"
                id="ip"
                name="ip"
                value={componentData.ip}
                onChange={handleInputChange}
                className="grow"
                placeholder="e.g. 192.168.1.30"
              />
            </label>

            <label
              htmlFor="type"
              className="input input-bordered input-black flex items-center w-full gap-2 mt-5 relative"
            >
              Type:
              <input
                required
                type="text"
                id="type"
                name="type"
                value={componentData.type}
                onChange={handleInputChange}
                onFocus={() => setShowTypeOptions(true)}
                onBlur={handleBlur}
                className="grow"
                placeholder="e.g. Database"
              />
              {showTypeOptions && filteredTypes.length > 0 && (
                <ul className="absolute z-10 bg-black border border-gray-300 text-white w-full left-0 top-full transform mt-1 max-h-60 overflow-y-auto">
                  {filteredTypes.map((type, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-600"
                      onClick={() => handleTypeOptionClick(type)}
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              )}
            </label>

            {/* Incoming and Outgoing Components Section */}
            <div className="flex items-center w-full mt-5">
              <h3 className="text-lg text-pink-900 font-bold">
                Selected Incoming Components:
              </h3>
              <div className="flex flex-wrap">
                <ul className="flex flex-wrap gap-3">
                  {componentData.incomingNodeIds.map((id) => {
                    const node = allComponents.find(
                      (component) => component.id === id
                    );
                    return (
                      <li
                        className="bg-white rounded-md p-2 mt-3 flex items-center"
                        key={id}
                      >
                        {node.name}
                        <button
                          className="ml-2 text-red-500"
                          type="button"
                          onClick={() => handleNodeRemove(id, "incoming")}
                        >
                          &times;
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="w-full mt-5 flex items-center">
              <select
                className="select select-bordered w-full max-w"
                value={incomingComponent}
                onChange={(e) => setIncomingComponent(e.target.value)}
              >
                <option value="" disabled>
                  Incoming Components
                </option>
                {allComponents.map((component) => (
                  <option key={component.id} value={component.id}>
                    {component.name} - {component.ip}
                  </option>
                ))}
              </select>
              <button
                className="btn ml-5 w-20 bg-white shadow-md shadow-pink-900 text-pink-900 hover:bg-pink-900 hover:text-white"
                type="button"
                onClick={() =>
                  handleNodeSelect(parseInt(incomingComponent), "incoming")
                }
              >
                Add
              </button>
            </div>

            <div className="w-full mt-5">
              <h3 className="text-lg text-pink-900 font-bold">
                Selected Outgoing Components:
              </h3>
              <div className="flex flex-wrap">
                <ul className="flex flex-wrap gap-3">
                  {componentData.outgoingNodeIds.map((id) => {
                    const node = allComponents.find(
                      (component) => component.id === id
                    );
                    return (
                      <li
                        className="bg-white rounded-md p-2 mt-3 flex items-center"
                        key={id}
                      >
                        {node.name}
                        <button
                          className="ml-2 text-red-500"
                          type="button"
                          onClick={() => handleNodeRemove(id, "outgoing")}
                        >
                          &times;
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="w-full mt-5 flex items-center">
              <select
                className="select select-bordered w-full max-w"
                value={outgoingComponent}
                onChange={(e) => setOutgoingComponent(e.target.value)}
              >
                <option value="" disabled>
                  Outgoing Components
                </option>
                {allComponents.map((component) => (
                  <option key={component.id} value={component.id}>
                    {component.name} - {component.ip}
                  </option>
                ))}
              </select>
              <button
                className="btn ml-5 w-20 bg-white shadow-md shadow-pink-900 text-pink-900 hover:bg-pink-900 hover:text-white"
                type="button"
                onClick={() =>
                  handleNodeSelect(parseInt(outgoingComponent), "outgoing")
                }
              >
                Add
              </button>
            </div>

            <button
              className="btn bg-pink-900 text-white mt-5 hover:bg-pink-700"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>

      <dialog id="modal" className="modal">
        <div className="modal-box">
          <h2 className="text-xl font-bold mb-4">Alert</h2>
          <p>
            This component is already added. Please choose another one or remove
            the existing one.
          </p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Add;
