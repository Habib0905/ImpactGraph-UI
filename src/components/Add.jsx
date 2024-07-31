import React, { useState, useEffect } from "react";
import axios from "axios";

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
    axios
      .post("http://localhost:8081/api/components/create", componentData)
      .then((response) => {
        console.log("Component created successfully!", response.data);
        fetchAllComponents();
        setAllComponents([...allComponents, response.data]);
      })
      .catch((error) => {
        console.error("There was an error creating the component!", error);
      });
  };

  return (
    <div className="hero min-h-screen relative">
      <video
        className="w-full h-full object-cover absolute top-0 left-0"
        src="bg.mp4"
        autoPlay
        loop
        muted
      />
      <form onSubmit={handleSubmit}>
        <div className="hero-overlay bg-opacity-30 absolute top-0 left-0 w-full h-full"></div>

        <div className="relative mt-10 z-10 mb-10 bg-black bg-opacity-70 rounded shadow-2xl shadow-white w-[500px] h-auto p-10 mx-auto flex flex-col justify-center items-center">
          <label
            htmlFor="name"
            className="input input-bordered input-black flex items-center w-full gap-2"
          >
            Name :
            <input
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
              type="text"
              id="ip"
              name="ip"
              value={componentData.ip}
              onChange={handleInputChange}
              className="grow"
              placeholder="e.g. 192.168.1.30 "
            />
          </label>

          <label
            htmlFor="type"
            className="input input-bordered input-black flex items-center w-full gap-2 mt-5 "
          >
            Type :
            <input
              type="text"
              id="type"
              name="type"
              value={componentData.type}
              onChange={handleInputChange}
              className="grow"
              placeholder="e.g. Database"
            />
          </label>

          <div className="w-full mt-5">
            <h3 className="text-lg text-white font-bold">
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

          <div className="w-full mt-5">
            <select
              className="select select-bordered w-full max-w-xs"
              value={incomingComponent}
              onChange={(e) => setIncomingComponent(e.target.value)}
            >
              <option value="" disabled>
                Incoming Components
              </option>
              {allComponents.map((component) => (
                <option key={component.id} value={component.id}>
                  <div className="flex justify-between">
                    <span>{component.name}</span>
                    <span>{component.ip}</span>
                  </div>
                </option>
              ))}
            </select>
            <button
              className="btn ml-5 w-20"
              type="button"
              onClick={() =>
                handleNodeSelect(parseInt(incomingComponent), "incoming")
              }
            >
              Add
            </button>
          </div>

          <div className="w-full mt-5">
            <h3 className="text-lg text-white font-bold">
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

          <div className="w-full mt-5">
            <select
              className="select select-bordered w-full max-w-xs"
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
              className="btn ml-5 w-20"
              type="button"
              onClick={() =>
                handleNodeSelect(parseInt(outgoingComponent), "outgoing")
              }
            >
              Add
            </button>
          </div>

          <button className="btn btn-wide mt-5" type="submit">
            Create
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
  );
};

export default Add;
