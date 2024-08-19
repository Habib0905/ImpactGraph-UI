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
  const [componentType, setComponentType] = useState("");
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
        {/* <video
          className="w-full h-full object-cover absolute top-0 left-0"
          src="bg.mp4"
          autoPlay
          loop
          muted
        /> */}

        <img
          className="w-full h-full object-cover  top-0 left-0"
          src="loma.avif"
        />

        <p className=" absolute top-0 text-center   text-4xl text-pink-900  p-5 mb-14 mx-auto font-abc font-bold">
          {" "}
          Create Component{" "}
        </p>

        <form onSubmit={handleSubmit}>
          <div className=" absolute top-0 left-0 w-full h-full"></div>

          <div className="relative mt-10 z-10 mb-10 bg-white border-pink-900 border-2 bg-opacity-90 rounded shadow-2xl shadow-white w-[700px] h-auto p-10 mx-auto flex flex-col justify-center items-center">
            <label
              htmlFor="name"
              className="input input-bordered input-black flex items-center w-full gap-2"
            >
              Name :
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
              className="input input-bordered input-black flex items-center gap-2 w-full  mt-5"
            >
              IP :
              <input
                required
                type="text"
                id="ip"
                name="ip"
                value={componentData.ip}
                onChange={handleInputChange}
                className="grow"
                placeholder="e.g. 192.168.1.30 "
              />
            </label>

            <div className="w-full mt-5 flex items-center">
              <select
                className="select select-bordered w-full max-w"
                value={componentType}
                onChange={(e) => setComponentType(e.target.value)}
              >
                <option value="" disabled>
                  Select Type
                </option>
                {[
                  ...new Map(
                    allComponents.map((component) => [
                      component.type.toLowerCase(),
                      component.type,
                    ])
                  ).values(),
                ].map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-center w-full mt-5">
              <h3 className="text-lg text-pink-900 font-bold">
                {" "}
                Selected Incoming Components :
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

            <div className="w-full mt-5 flex items-center ">
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
              <h3 className="text-lg text-pink-900  font-bold">
                {" "}
                Selected Outgoing Components :
              </h3>
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
                        className="ml-2 text-red-500 "
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

            <div className="w-full mt-5 flex items-center ">
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
              className="btn btn-wide bg-white  shadow-md shadow-pink-900 text-pink-900 mt-9 hover:bg-pink-900 hover:text-white "
              type="submit"
            >
              {(isLoading && (
                <div>
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              )) || <span>Create</span>}
            </button>
          </div>
        </form>

        <dialog id="modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <p className="py-4"> The Component is Already Selected </p>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Add;
