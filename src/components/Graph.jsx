import React, { useEffect } from "react";
import NeoVis from "neovis.js";

const Graph = () => {
  useEffect(() => {
    console.log("useEffect called");

    const config = {
      containerId: "viz",
      serverUrl:
        "bolt+s://2128be852715c7cb14a7cf114cb24024.neo4jsandbox.com:7687",
      serverUser: "neo4j",
      serverPassword: "skies-helmsman-residue",
      labels: {
        Component: {
          label: "name",
          value: "pagerank",
          group: "community",
        },
      },
      relationships: {
        DEPENDS_ON: {
          value: "weight",
        },
      },
      initialCypher: "MATCH (n)-[r:DEPENDS_ON]->(m) RETURN n, r, m",
    };

    try {
      const viz = new NeoVis(config);
      console.log("Creating NeoVis instance");
      viz.render();
      console.log("NeoVis render called");

      return () => {
        console.log("Clearing NeoVis network");
        if (viz) {
          viz.clearNetwork();
        }
      };
    } catch (error) {
      console.error("Error rendering graph:", error);
    }
  }, []);

  return (
    <div
      id="viz"
      style={{ width: "100%", height: "600px", border: "1px solid red" }}
    />
  );
};

export default Graph;
