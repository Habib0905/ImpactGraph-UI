import React, { useEffect, useRef, useState } from "react";
import Vis from "vis-network";
import ComponentDetails from "./ComponentDetails";
import axios from "axios";

const Graph = () => {

  const networkRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        console.log("Starting to fetch data");
        const response = await axios.get(
          "http://localhost:8081/api/graph/data"
        );
        console.log("Data Fetched");
        const data = response.data;
        console.log("Fetched data:", data);

        const container = document.getElementById("network");
        const options = {
          nodes: {
            shape: "dot",
            size: 30,
            font: { color: "white" },
          },
          edges: {
            arrows: {
              to: { enabled: true, scaleFactor: 1 },
            },
            color: {
              color: "#848484",
              highlight: "#848484",
              hover: "#848484",
            },
            font: {
              color: "#343434",
              size: 14,
              face: "arial",
            },
            width: 1,
            smooth: { enabled: true, type: "dynamic", roundness: 0.5 },
          },
          physics: {
            stabilization: false,
            solver: "forceAtlas2Based",
            forceAtlas2Based: {
              springLength: 200,
              springConstant: 0.01,
            },
          },
          interaction: {
            hover: true,
            dragView: true,
          },
          layout: {
            improvedLayout: true,
          },
        };

        if (networkRef.current) {
          networkRef.current.destroy();
        }

        const visNetwork = new Vis.Network(container, data, options);
        networkRef.current = visNetwork;

        visNetwork.on("doubleClick", async (params) => {
          if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            console.log(`Node ${nodeId} double-clicked`);
            const actualNodeId = nodeId.split(":").pop();
            const intId = parseInt(actualNodeId, 10);
            console.log("Extracted node id: ", actualNodeId);

            try {
              const result = await axios.get(
                `http://localhost:8081/api/graph/impact/${intId}`
              );
              const impactedNodes = result.data.map((node) => node.elementId);
              console.log("Impacted nodes:", impactedNodes);

              const nodes = visNetwork.body.data.nodes.get();
              const updates = [];

              nodes.forEach((node) => {
                if (impactedNodes.includes(node.id)) {
                  updates.push({ id: node.id, color: "red" });
                } else if (node.color === "red") {
                  updates.push({ id: node.id, color: "lightblue" });
                }
              });

              visNetwork.body.data.nodes.update(updates);
            } catch (error) {
              console.error("Error finding impacted nodes:", error);
            }
          }
        });

        visNetwork.on("click", async (params) => {
          if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const actualNodeId = nodeId.split(":").pop();
            const intId = parseInt(actualNodeId, 10);

            try {
              const result = await axios.get(
                `http://localhost:8081/api/graph/node/${intId}`
              );
              if (result.data) {
                setSelectedNode({ id: intId, ...result.data.properties });
              }
            } catch (error) {
              console.error("Error fetching node details:", error);
            }
          } else {
            const nodes = visNetwork.body.data.nodes.get();
            const updates = nodes.map((node) => ({
              id: node.id,
              color: "lightblue",
            }));
            visNetwork.body.data.nodes.update(updates);
          }
        });
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();
  }, []);

  return (
    <div className="hero relative min-h-screen">
       <img className='w-full h-auto object-cover  top-0 left-0' src='graphbg.jpg' />
    <div className="hero-overlay bg-black opacity-70 "></div>

    <div id="network" style={{ width: "100%"  , height:"100%"}}>
    </div> 

      <div>
        <ComponentDetails node={selectedNode} />
      </div>

    </div>
  );
};

export default Graph;
