import React, { useContext, useEffect, useMemo, useState } from 'react';

import TaskItem from '../TaskItem/TaskItem';
import TasksContext from '../../context/TasksContext';
import './TaskList.css';

const TaskList = () => {
  const {tasks} = useContext(TasksContext);

  return (
    <div className="tasks">
      {
        tasks.length == 0
        ? <h2 className="tasks__empty">Tasks Not Found!</h2>
        : tasks.map(task => {
          return <TaskItem key={task.id} {...task}/>
        })
      }
    </div>
  )
}

export default TaskList;