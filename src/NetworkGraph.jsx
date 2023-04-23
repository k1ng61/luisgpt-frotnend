import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'vis/dist/vis-network.min.css';

const VisNetwork = dynamic(() => import('vis-react'), { ssr: false });

const NetworkGraph = () => {
  const [nodes, setNodes] = useState([
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
  ]);
  const [edges, setEdges] = useState([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
  ]);
  const [options, setOptions] = useState({
    layout: {
      hierarchical: {
        direction: 'UD',
      },
    },
    nodes: {
      color: '#8c1515',
      size: 30,
    },
    edges: {
      color: '#000000',
    },
  });

  return (
    <div>
      <VisNetwork
        data={{ nodes, edges }}
        options={options}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default NetworkGraph;