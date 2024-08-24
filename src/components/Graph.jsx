import React, { useEffect, useRef, useState } from "react";
import Vis from "vis-network";
import ComponentDetails from "./ComponentDetails";
import axios from "axios";
import EdgeDetails from "./EdgeDetails";
import BigNumber from "bignumber.js";

const Graph = () => {
  const networkRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        console.log("Starting to fetch data");

        const token = localStorage.getItem("token");
        console.log("the token is :", token);

        const response = await axios.get(
          "http://localhost:8081/api/graph/data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Data Fetched");
        const data = response.data;
        console.log("Fetched data:", data);

        const container = document.getElementById("network");
        console.log("Graph Visualized");
        const options = {
          nodes: {
            shape: "dot",
            size: 40,
            font: { color: "black" },
          },
          edges: {
            arrows: {
              to: { enabled: true, scaleFactor: 1 },
            },
            color: {
              color: "black",
              highlight: "red",
              hover: "black",
            },
            font: {
              color: "black",
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
                `http://localhost:8081/api/graph/impact/${intId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
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
            // Node was clicked
            const nodeId = params.nodes[0];
            const actualNodeId = nodeId.split(":").pop();
            const intId = parseInt(actualNodeId, 10);

            try {
              const result = await axios.get(
                `http://localhost:8081/api/graph/node/${intId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (result.data) {
                setSelectedNode({ id: intId, ...result.data.properties });
                setSelectedEdge(null);
              }
            } catch (error) {
              console.error("Error fetching node details:", error);
            }
          } else if (params.edges.length > 0) {
            // Edge was clicked
            const edgeId = params.edges[0];
            console.log(edgeId);
            const edge = visNetwork.body.data.edges.get(edgeId);
            console.log(edge);
            const sourceNode = visNetwork.body.data.nodes.get(edge.from);
            const targetNode = visNetwork.body.data.nodes.get(edge.to);
            const relationId = edge.elementId;
            console.log("Real edge id", relationId);
            const actualRelationId = relationId.split(":").pop();
            const intRelationId = new BigNumber(actualRelationId);
            console.log("Integer real edge id", intRelationId.c);

            setSelectedEdge({
              id: intRelationId,
              from: sourceNode.label,
              to: targetNode.label,
            });
            setSelectedNode(null);
          } else {
            setSelectedNode(null);
            setSelectedEdge(null);
            const nodes = visNetwork.body.data.nodes.get();
            const updates = [];

            nodes.forEach((node) => {
              updates.push({ id: node.id, color: "lightblue" });
            });

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
    <div className="hero relative h-screen  bg-white">
      {/* <img className='w-full h-auto object-cover  top-0 left-0' src='graphbg.jpg' /> */}

      <div
        id="network"
        className="bg-white"
        style={{ width: "100%", height: "100%" }}
      ></div>

      <div className="bg-white">
        {!selectedNode && !selectedEdge && (
          <div className="p-4 border border-gray-400 rounded-lg shadow bg-black text-white absolute top-5 right-4 w-[350px]">
            <h3 className="text-lg font-bold mb-4 text-center">
              Component Details
            </h3>
            <p>
              No node or edge selected. Click on a node or edge to see its
              details.
            </p>
          </div>
        )}
        {selectedNode && <ComponentDetails node={selectedNode} />}
        {selectedEdge && <EdgeDetails selectedEdge={selectedEdge} />}
      </div>
    </div>
  );
};

export default Graph;
