// NodeDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ComponentDetails = ({ node }) => {
  const [impactedComponents, setImpactedComponents] = useState([]);

  useEffect(() => {
    if (node) {
      const fetchImpactedComponents = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/graph/impact/${node.id}`
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
      <div className="p-2 border border-gray-400 rounded-lg shadow bg-gray-800 text-white absolute top-5 right-4 w-[350px]">
        <h3 className="text-lg font-bold mb-4 text-center">
          Component Details
        </h3>
        <p>No node selected. Click on a node to see its details.</p>
      </div>
    );
  }

  return (
    <div className="p-2 border border-gray-400 rounded-lg shadow bg-gray-800 text-white absolute top-5 right-4 w-[350px]">
      <h3 className="text-lg font-bold mb-4 text-center">Component Details</h3>
      <div className="flex flex-col space-y-4">
        <p>
          <div className="badge badge-accent badge-outline badge-lg">
            <strong>ID</strong>
          </div>
          <span className="ml-2">: {node.id}</span>
        </p>
        <p>
          <div className="badge badge-accent badge-outline badge-lg">
            <strong>Name</strong>
          </div>
          <span className="ml-2">: {node.name}</span>
        </p>
        <p>
          <div className="badge badge-accent badge-outline badge-lg">
            <strong>Type</strong>
          </div>
          <span className="ml-2">: {node.type}</span>
        </p>
        <p>
          <div className="badge badge-accent badge-outline badge-lg">
            <strong>IP</strong>
          </div>
          <span className="ml-2">: {node.ip}</span>
        </p>
        <p className="flex items-center">
          <div className="badge badge-accent badge-outline badge-lg">
            <strong>Impacted</strong>
          </div>
          <span className="ml-2 mr-2">:</span>
          <select className="bg-gray-800 text-white border rounded-lg shadow p-1 w-40">
            <option value="">Components : </option>
            {impactedComponents.map((component) => (
              <option key={component.elementId} value={component.elementId}>
                {component.properties.name}
              </option>
            ))}
          </select>
        </p>

        <div className="flex justify-center space-x-4">
          <button className="btn bg-green-600">Update</button>
          <button className="btn bg-red-600">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetails;
