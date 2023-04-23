import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import {axios} from 'axios'
import { Timestamp, collection, orderBy, query, snapshotEqual, getDocs } from "firebase/firestore";

import { auth, databse, db } from '@/firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { ref, onValue } from 'firebase/database'

const nodeTypes = {
  circle: ({ data }) => {
    return (
      <div style={{ borderRadius: '50%', backgroundColor: 'red', width: 50, height: 50 }}>
        {data.label}
      </div>
    );
  }
};

const initialNodes = [
  {
    id: '1',
    type: 'circle',
    data: { label: 'Node 1' },
    position: { x: 100, y: 100 },
    style: {borderRadius:"50%",crossOrigin: 'anonymous' ,backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/hackla.appspot.com/o/shrey.jpg?alt=media&token=fe259ac0-1827-4180-9b53-b7bc050ad7bf)", width:100, height:100, backgroundSize: "cover"}
  },
  
  
];



const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const [iten, setIten] = useState([]);
  const [peoples, setpeoples] = useState([]);
  useEffect(() => {
    const getIten = async() => {
      const usercol = collection(db, "Itenerary");
        const userdata = await getDocs(query(usercol));

        const newData = userdata.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        
        let json = JSON.stringify(newData[0]);
        
        setIten(json);
    }
    getIten();
    const xref = ref(databse, '/people');

    onValue(xref, async (snapshot) => {
      const data = await snapshot.val();
      let temp = [];
      let tempnodes = [];
      for (const person in data) {
        // Get the message from the current dictionary and push it into the messagesArray
        const newp =  data[person];
        const newid = nodes.length + 1;
        const newnode = {
          id: `${newid}`,
          type: 'circle',
          data: { label: newp.full_name },
          position: { x: 100, y: 100 },
          style: {borderRadius:"50%",crossOrigin: 'anonymous' ,backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/hackla.appspot.com/o/shrey.jpg?alt=media&token=fe259ac0-1827-4180-9b53-b7bc050ad7bf)", width:100, height:100, backgroundSize: "cover"}
        };

        tempnodes.push(newnode);
        temp.push(newp);
      }
      setpeoples(temp);
      
      setNodes(tempnodes);
    })
  }, [])

  useEffect(() => {
    console.log(iten);
  }, [iten])
  return (
    <div>
        <div className=" container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          
          
          <div className="  pt-4 flex flex-col w-1/3  justify-center items-start  md:text-left bg-red-300">
          here is where you put itenerary
          </div>

          <div className="  pt-4 flex flex-col w-2/3  justify-center items-start  md:text-left"  style={{ height: 800 }}>

          <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
          </div>
      </div>

    </div>
  );
}
