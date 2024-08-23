import { useContext, useRef, useState } from 'react';
import { Handle } from '@xyflow/react';
import classes from './List.module.css';
import { NodeContext } from '../pages/FlowPage';

export default function List({ id, data }) {
  const { handleDeleteNode, handleEditNode } = useContext(NodeContext);
  const [disabled, setDisabled] = useState(true);
  const editedElementRef = useRef(null);
  console.log(data);
  const handleEdit = () => {
    setDisabled((prevStatus) => !prevStatus);
    console.log(editedElementRef.current);

    handleEditNode(id, {
      ...data,
      title: data.title,
      elementType: data.elementType,
    });
  };
  if (!disabled) {
    editedElementRef.current.focus();
    editedElementRef.current.color = 'red';
  }

  const handleDelete = () => {
    handleDeleteNode(id);
  };

  if (data.elementType === 'normal')
    return (
      <div className={classes.container}>
        <h3>
          <input
            type="text"
            defaultValue={data.title}
            disabled={disabled}
            ref={editedElementRef}
          />
          <button onClick={handleEdit}>{disabled ? 'Edit' : 'Save'}</button>
          <button onClick={handleDelete}>Delete</button>
        </h3>

        <Handle type="target" position="bottom" />
      </div>
    );
  if (data.elementType === 'list')
    return (
      <div className={classes.container}>
        <ul>
          {data.items.map((item, index) => (
            <li key={item}>
              <input
                type="text"
                defaultValue={item}
                disabled={disabled}
                ref={editedElementRef}
              />
              <button onClick={handleEdit}>{disabled ? 'Edit' : 'Save'}</button>
              <button
                onClick={() =>
                  handleEditNode(id, {
                    ...data,
                    items: data.items.filter((_, i) => i !== index),
                  })
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <Handle type="target" position="bottom" />
      </div>
    );
}
