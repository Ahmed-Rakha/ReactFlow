import { useContext, useRef, useState } from 'react';
import { Handle } from '@xyflow/react';
import classes from './CustomNode.module.css';
import { NodeContext } from '../pages/FlowPage';

export default function CustomNode({ id, data }) {
  const [task, setTask] = useState('');
  const [shape, setShape] = useState('list');
  const formRef = useRef(null);
  const { handleAddNode, nodes, handleAddList } = useContext(NodeContext);

  const options = Array.isArray(data?.options) ? data.options : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const elementType = formData.get('shape');
    const containList = nodes.some((node) => node.data.elementType === 'list');

    if (elementType === 'list') {
      if (containList) {
        handleAddList({
          title: formData.get('task'),
        });
      } else {
        handleAddNode({
          id: `${Date.now()}`,
          data: {
            title: formData.get('task'),
            elementType,
            items: [formData.get('task')],
          },
          position: { x: Math.random() * 200, y: Math.random() * 200 },
          type: 'list',
        });
      }
    } else if (elementType === 'normal') {
      handleAddNode({
        id: `${Date.now()}`,
        data: {
          title: formData.get('task'),
          elementType,
        },
        position: { x: Math.random() * 200, y: Math.random() * 200 },
        type: 'list',
      });
    }
  };

  return (
    <div className={classes.container}>
      <h2>{data?.title}</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="">{data?.label_1}</label>
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          name="task"
          onChange={(e) => setTask(e.target.value)}
        />
        <label htmlFor="">{data?.label_2}</label>
        <select
          name="shape"
          value={shape}
          onChange={(e) => setShape(e.target.value)}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input type="submit" />
      </form>

      <Handle type="source" position="bottom" />
    </div>
  );
}
