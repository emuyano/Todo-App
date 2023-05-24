import { useState, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function App() {

  //Task (Todo List) State
  const [toDo, setTodo] = useState([
    { "id": 1, 
      "title": "Sample Task 1", 
      "status": false
    },
  ]);

  //Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');


//Add Task
const addTask = () =>{
  if(newTask){
    let num = toDo.length + 1;
    let newEntry = {
      "id": num,
      "title": newTask,
      "Status": false
    }
    setTodo([...toDo, newEntry])
    setNewTask('');
  }
}

//Delete Task
const deleteTask = (id) =>{
  let newTask = toDo.filter(task => task.id !== id)
  setTodo(newTask);
}

//Mark task done or completed
const markDone = (id) =>{
  let newTask = toDo.map(task => {
    if(task.id === id){
      return ({...task, status: !task.status})
    }
    return task;
  })
  setTodo(newTask);
}

//CancelUpdate 
const CancelUpdate = () =>{
  setUpdateData('');
}

//change task for update
const changeTask = (e) =>{
  let newEntry = {
    id: updateData.id,
    title: e.target.value,
    status: updateData.status ? true : false
  }
  setUpdateData(newEntry);
}

//Update Task
const updateTask = () =>{
  let filterRecords = [...toDo].filter(task => task.id !== updateData.id)
  let updatedObjects = [...filterRecords, updateData]
  setTodo(updatedObjects);
  setUpdateData('');
}


return (
  <div className="container App">
      <h2>Todo App Task</h2>
  {/*Update Task*/}
  <div className='row'>
    <div className='col'>
        <input 
        value={ updateData && updateData.title}
        onChange={ (e) => changeTask(e)}
        type='text' className='form-control form-control-lg'/>
    </div>
    <div className='col-auto'>
        <button 
          onClick={ updateTask }
        className='btn btn-lg btn-success mr-20'>
          Update
        </button>
        <button 
        onClick={ CancelUpdate }
        className='btn btn-lg btn-warning'>
          Cancel
        </button>          
    </div>
  </div>
<br/>

 
{/*Add Task*/}
<div className='row'>
  <div className='col'>
      <input 
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      type='text' className='form-control form-control-lg'/>
  </div>
  <div className='col-auto'>
      <button onClick={addTask} className='btn btn-lg btn-success'>
        Add Task
      </button>
  </div>
</div>
<br/>

      {toDo && toDo.length ? '' : 'No tasks'}

      {toDo && toDo
      .sort((a, b) => a.id > b.id ? 1 : -1)
      .map((task, index) => {
            return (
              <Fragment key={task.id}>

              <div className='col taskBg'>
                <div className={task.status ? 'done' : ''}>
                  <span className="taskNumber">{index + 1}</span>
                  <span className="taskText">{task.title}</span>

                  <div className='iconWrap'>
                     <span 
                     onClick={(e) => markDone(task.id)}
                     title='Completed / Not Completed'><FontAwesomeIcon icon={faCircleCheck}/></span>
                     {task.status ? null : (<span 
                      onClick={() => setUpdateData({ 
                        id: task.id, 
                        title: task.title,
                        status:!task.status ? true : false
                      })}
                     title='Edit'><FontAwesomeIcon icon={faPen}/></span>)}
                     
                     <span title='Delete'
                        onClick={() => deleteTask(task.id)}
                     ><FontAwesomeIcon icon={faTrashCan}/></span>
                  </div>

                </div>
              </div>
              </Fragment>
              )
        })
      }

    </div>
  );
}

export default App;
  