import React, { useEffect, useRef, useState } from "react";
import neo4j from "neo4j-driver";
import Vis from "vis-network";
import axios from 'axios';

import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


const Graph = () => {


  const networkRef = useRef(null);
  const driverRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState("");
  const [selectedId, setSelectedId] = useState("");


  const deleteview =() => {
  
    document.getElementById('delete').showModal();
  }

  const deSelect =()=>{
    // visNetwork.on("deselectNode");
  }


  
const deleteNode =(id) => {
  console.log(selectedId);
  console.log(id);
    axios.delete('http://localhost:8081/api/components/delete/' + id)
    .then(res=>{
      toast.success('Component Deleted successfully', { position: "top-right" });
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      setSelectedNode(res.data);
      console.log(res.data);
    })
    .catch(err => console.log(err));
}
 




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
            // color: "pink-900"
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
              highlight: "white",
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

        visNetwork.on("selectNode", async(params)=>{
          console.log("Single clicked");
          document.getElementById('modal'). showModal();

          if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            console.log(`Node ${nodeId} double clicked`);
            const actualNodeId = nodeId.split(":").pop();
            const intId = parseInt(actualNodeId, 10);
            console.log("Extracted node id: ", actualNodeId);
            console.log("Extracted node id in int : ", intId);

            setSelectedId(intId);

            
          
              axios.get('http://localhost:8081/api/components/ComID/' + intId)
              .then(res=>{
                setSelectedNode(res.data);
                console.log(res.data);
              })
              .catch(err => 
                   console.log(intId)
                  );

                  
          }
        })

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

  return (
  
    <div className="hero min-h-screen">
    <video  className='w-full h-full object-cover' src='network.mp4' autoPlay  
    loop muted />
    <div className="hero-overlay bg-opacity-0"></div>

    <div id="network" style={{ width: "100%", height: "600px" }}>
    </div>


      <dialog id="modal" className="modal">
      <div className='modal-box border-1 p-3 rounded-md shadow-lg shadow-pink-950 border-pink-950 '>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={deSelect}>✕</button>
            </form>
            <h2 className="text-xl text-center text-pink-950 font-bold mb-4">{selectedNode.name}</h2>

          <p className='flex flex-row'> 
              <strong className='flex flex-row mr-2'>
              <img
              className="h-6 w-6 mr-2"
              src='com.png'>           
              </img>
              ID:</strong> 
              {selectedNode? selectedNode.id : 
                         <div>
                         <span className="loading loading-dots loading-xs"></span>
                       </div>
                       }
          </p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>


            <p className='flex flex-row'> 
              <strong className='flex flex-row mr-2'>
              <img
              className="h-6 w-6 mr-2"
              src='com.png'>           
              </img>
              Type:</strong>
                      {selectedNode? selectedNode.type : 
                         <div>
                         <span className="loading loading-dots loading-xs"></span>
                       </div>
                       }</p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>


            <p className='flex flex-row'> 
              <strong className='flex flex-row mr-2'>
              <img
              className="h-6 w-6 mr-2"
              src='com.png'>           
              </img>
              Ip:</strong> {selectedNode.ip}</p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>


            <div className="flex flex-row justify-center items-center space-x-5 ">
              <button  className="bg-gradient-to-br from-black to-pink-950 text-white py-2 px-10 mt-5 rounded-lg" >
              see Impacted nodes
              </button>
              <button className="bg-gradient-to-br from-black to-pink-950 text-white py-2 px-10 mt-5 rounded-lg" onClick={deleteview} >
              Delete
              </button>
           </div>


          </div>
      </dialog>


      <dialog id="delete" className="modal">
          <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <p className="py-4"> Do you want to delete the node ? </p>

                <div className="flex flex-row justify-center items-center space-x-5 ">
                    <button className='bg-gradient-to-br from-black to-pink-950 text-white py-2 px-10 mt-5 rounded-lg' onClick={ () => deleteNode(selectedNode.id)}>Yes</button>         
                    <form method="dialog">
                      <button className="bg-gradient-to-br from-black to-pink-950 text-white py-2 px-10 mt-5 rounded-lg">No</button>
                    </form>
                </div>
          </div>
      </dialog>



    </div>

)
}
export default Graph;
