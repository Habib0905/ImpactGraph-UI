import React, { useEffect, useRef } from "react";
import neo4j from "neo4j-driver";
import Vis from "vis-network";

const Graph = () => {
  const networkRef = useRef(null);
  const driverRef = useRef(null);

  useEffect(() => {
    const driver = neo4j.driver(
      "neo4j+s://b93c2f97.databases.neo4j.io",
      neo4j.auth.basic("neo4j", "eLcSToxpFiFbX9W8NG8ZnOs5WkL2PfaGtoDYJMQ0370")
    );
    driverRef.current = driver;

    const fetchGraphData = async () => {
      const session = driver.session();
      try {
        const result = await session.run(
          "MATCH (n)-[r]->(m) RETURN n, r, m UNION MATCH (n) RETURN n AS n, NULL AS r, NULL AS m"
        );

        const nodeMap = new Map();
        const edges = [];

        console.log("Fetched records:", result.records);

        result.records.forEach((record) => {
          const nodeData = record.get("n");
          const targetNodeData = record.get("m");
          const relationshipData = record.get("r");

          if (relationshipData != null && targetNodeData != null) {
            nodeMap.set(nodeData.elementId, {
              id: nodeData.elementId,
              label: nodeData.properties.name,
            });

            nodeMap.set(targetNodeData.elementId, {
              id: targetNodeData.elementId,
              label: targetNodeData.properties.name,
            });

            edges.push({
              from: nodeData.elementId,
              to: targetNodeData.elementId,
            });
          } else {
            nodeMap.set(nodeData.elementId, {
              id: nodeData.elementId,
              label: nodeData.properties.name,
            });
          }
        });

        console.log("All nodes: ", nodeMap);
        console.log("Unique nodes:", Array.from(nodeMap.values()));
        console.log("Edges:", edges);

        const nodeArray = Array.from(nodeMap.values());
        const data = {
          nodes: nodeArray,
          edges: edges,
        };

        console.log("Node Array: ", nodeArray);

        const container = document.getElementById("network");
        const options = {
          nodes: {
            shape: "dot",
            size: 30,
            font: { color: "white" },
          },
          edges: {
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 1,
              },
            },
            color: {
              color: "#848484",
              highlight: "#848484",
              hover: "#848484",
            },
            font: {
              color: "#343434",
              size: 14, // px
              face: "arial",
            },
            width: 1,
            smooth: {
              enabled: true,
              type: "dynamic",
              roundness: 0.5,
            },
          },
          physics: {
            stabilization: false,
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
            console.log(`Node ${nodeId} double clicked`);
            const actualNodeId = nodeId.split(":").pop();
            const intId = parseInt(actualNodeId, 10);
            console.log("Extracted node id: ", actualNodeId);

            const driver = driverRef.current;
            const session = driver.session();
            try {
              const result = await session.run(
                `
                  MATCH (m) -[:DEPENDS_ON*0..]->(n)
                  WHERE ID(n) = $id
                  RETURN DISTINCT m
                `,
                { id: intId }
              );

              console.log("Impact results", result);
              console.log("Imapact records: ", result.records);

              const impactedNodes = result.records.map(
                (record) => record.get("m").elementId
              );
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
            } finally {
              session.close();
            }
          }
        });
      } catch (error) {
        console.error("Error fetching graph data:", error);
      } finally {
      }
    };

    fetchGraphData();

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
      }
      if (driverRef.current) {
        driverRef.current.close();
      }
    };
  }, []);

  return <div id="network" style={{ width: "100%", height: "600px" }} />;
};

export default Graph;
