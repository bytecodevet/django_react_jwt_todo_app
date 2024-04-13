import React, { useContext, useState } from 'react'

import Button from '../Button/Button';
import { Task, clickEvent } from '../../types';
import TokenContext from '../../context/TokensContext';
import TasksContext from '../../context/TasksContext';
import { baseUrl } from '../../utils';
import './TaskItem.css';


const TaskItem: React.FC<Task> = ({id, title, description, completed}) => {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const {accessToken} = useContext(TokenContext);
  const {tasks, setTasks} = useContext(TasksContext);

  const buttonClickedDecorator = (fn: Function) => {
    return (event: clickEvent) => {
      setButtonClicked(true);
      fn(event);
      setButtonClicked(false);
    }
  }

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const onDeleteButtonClick = buttonClickedDecorator((event: clickEvent) => {
    fetch(`${baseUrl}/api/tasks/${id}/`, {
      method: 'DELETE',
      headers
    }).then(response => {
      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== id));
      }
    })
  });

  const onCompleteButtonClick = buttonClickedDecorator((event: clickEvent) => {
    fetch(`${baseUrl}/api/tasks/${id}/`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({completed: true})
    })
    .then(response => {
      if (response.ok) {
        setTasks(
          tasks.map(task => {
            if (task.id === id) {
              task.completed = true;
            }
            return task;
          })
        );
        const completeBtn = event.currentTarget;
        completeBtn.parentNode?.removeChild(completeBtn);
      }
    });
  });


  return (
    <div className={"task" + (completed ? " task--completed" : "")}>
      <div className="task__texts-wrapper">
        <h2 className="task__title">{title}</h2>
        <p className="task__description">{description}</p>
      </div>
      <div className="task__btns-wrapper">
        {
          completed
          ? ''
          : <Button onClick={onCompleteButtonClick} disabled={buttonClicked} className='task__action-btn btn--success'>Complete</Button>
        }
        <Button onClick={onDeleteButtonClick} disabled={buttonClicked} className='task__action-btn btn--error'>Delete</Button>
      </div>
    </div>
  );
}

export default TaskItem;