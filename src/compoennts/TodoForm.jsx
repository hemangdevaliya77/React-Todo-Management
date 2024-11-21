import React, { useState } from 'react';
import '../styles/todo.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Textarea from '@mui/joy/Textarea';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import '../styles/todo.css'

function TodoForm() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDueDate, setFilterDueDate] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage,setCurrentPage]=useState(1)



  function editCard(id) {
    const findItem = tasks.find(item => item.id === id);
    setEditId(id);
    setTitle(findItem.title);
    setStatus(findItem.status);
    setDescription(findItem.description);
    setDueDate(new Date(findItem.dueDate));
  }


  function updateTask() {
    const updatedTasks = tasks.map(item =>
      item.id === editId ? {
        ...item,
        title,
        status,
        description,
        dueDate: new Date(dueDate).toLocaleDateString(),
      }
        : item
    );
    setTasks(updatedTasks);
    resetForm();
  }


  function addTask() {
    if (title && status && description && dueDate) {
      const today = new Date();
      const enteredDueDate = new Date(dueDate);

    //   if (title.includes(' ')) {
    //     alert('white space are not allowed');
    //     return;
    //   }
if(/\d/.test(title)){
    alert('title cannot contain numbers')
    return
}
      if (enteredDueDate < today) {
        alert('Enter a valid due date');
      } 
    
      else {
        const taskObj = {
          id: Date.now(),
          title,
          status,
          description,
          createdDate: today.toLocaleDateString(),
          dueDate: enteredDueDate.toLocaleDateString(),
        };
        setTasks([...tasks, taskObj]);
        resetForm();
      }
    } else {
      alert('Please fill all fields.');
    }
  }
// console.log("fitlerDueDate",new Date(filterDueDate).toLocaleDateString());
 
  function deleteCard(id) {
    const filteredTasks = tasks.filter(item => item.id !== id);
    setTasks(filteredTasks);
   
  }

  
  function resetForm() {
    setTitle('');
    setStatus('');
    setDescription('');
    setDueDate(new Date());
    setEditId(null);
  }
//   let currentPage=1;


// console.log("start,end",start,end);
let filteredTasks = tasks;

// let cardperPage=3
// let totalpages=Math.ceil(tasks.length/cardperPage);
//   console.log("total pages",totalpages);

// let start=(currentPage-1)*cardperPage
// let end=start+cardperPage


// let filteredTasks = tasks.slice(start,end);
if( filterStatus!=='All'){
    filteredTasks =filteredTasks.filter(task=>task.status===filterStatus) ;
}
 
if(filterDueDate){
    filteredTasks=filteredTasks.filter(item=>item.dueDate==new Date(filterDueDate).toLocaleDateString())
}

if (searchTitle) {
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  }
  if (searchDescription) {
    filteredTasks = filteredTasks.filter(task => 
      task.description.toLowerCase().includes(searchDescription.toLowerCase())
    );
  }

  if (sortBy) {
    filteredTasks = filteredTasks.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'dueDate') {

        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sortBy === 'createdDate') {
        // console.log(new Date(a.createdDate));
        return new Date(a.id) - new Date(b.id);
      }
      return 0;
    });
  }
//   console.log(filteredTasks);
const cardPerPage = 3;
const totalPages = Math.ceil(filteredTasks.length / cardPerPage);
const start = (currentPage - 1) * cardPerPage;
const end = start + cardPerPage;
filteredTasks = filteredTasks.slice(start, end);
function nextPage(){
    if(currentPage<totalPages){
        setCurrentPage(currentPage+1)
    }
    // console.log("next page",currentPage);
      

}

function prevPage(){
    if(currentPage>1){
        setCurrentPage(currentPage-1)
    }
    // console.log("prev page",currentPage);
 
// let filteredTasks = tasks.slice(start,end);
}
  return (
    <>
      <div>
        <h1 className='heading'>Todo Form</h1>

<div className="form-container">
<Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            '& > :not(style)': { m: 1, width: '30ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Enter Title"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
           
          />
          <br />
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
            sx={{backgroundColor:'white'}}
          >
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-label">Description</InputLabel>
          <Textarea
            minRows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputLabel id="demo-simple-select-label">Due Date</InputLabel>
          <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
          <br />
          {editId ? (
            <Button variant="contained" onClick={updateTask}>
              Update Task
            </Button>
          ) : (
            <Button variant="contained" onClick={addTask}>
              Add Task
            </Button>
          )}
        </Box>
</div>
       

        <div>
          <h1 className='task-list-heading'>Task List</h1>

<div>

    <div className="dropdowns" style={{display:'flex'}}>
    <InputLabel id="demo-simple-select-label">Filter by Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>


          <InputLabel id="demo-simple-select-label" sx={{marginLeft:6}}>Sort By</InputLabel>

<Select   labelId="demo-simple-select-label"
            id="demo-simple-select" 
            onChange={(e)=>setSortBy(e.target.value)}
            sx={{ width: 200 }}>
    <MenuItem value="title">Title</MenuItem>
    <MenuItem value="dueDate">Due Date</MenuItem>
    <MenuItem value="status">Status</MenuItem>
    <MenuItem value="createdDate">Created Date</MenuItem>

</Select>


          <TextField id="outlined-basic" label="search Title" variant="outlined"  onChange={(e)=>setSearchTitle(e.target.value)} value={searchTitle} sx={{marginLeft:10}}/>
          {/* <input type="search"  style={{height:40}} placeholder='search title' onChange={(e)=>setSearchTitle(e.target.value)} value={searchTitle}/> */}
    
    
          <TextField id="outlined-basic"  sx={{marginLeft:6}} label="search description" variant="outlined"   onChange={(e)=>setSearchDescription(e.target.value)} value={searchDescription}/>

        
    </div>


    <div style ={{display:'flex',justifyContent:'flex-end',marginRight:40,marginTop:30}}>

<InputLabel id="demo-simple-select-label" >Filter By Due Date</InputLabel>
<DatePicker selected={filterDueDate} onChange={(date) => setFilterDueDate(date)}  sx={{marginLeft:20}}/>
</div>

<br />
          
          <br />

</div>
    
<div className="taskContainer">

          {filteredTasks.length>0? filteredTasks.map((item, index) => (
            <div key={item.id}>
              <Card sx={{ width: 345, margin: 10, padding: 4, boxShadow: '1px  3px 4px gray' }} className="task-card">
                <CardContent >
                  <Typography gutterBottom variant="h5" component="div" >
                    Title: {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} className='task-content'>
                    Status: {item.status}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} className='task-content'>
                    Description: {item.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} className='task-content'>
                    DueDate: {item.dueDate}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button sx={{ backgroundColor: 'blue', color: 'white' }} onClick={() => editCard(item.id)}>
                    Update
                  </Button>
                  <Button sx={{ backgroundColor: 'red', color: 'white' }} onClick={() => deleteCard(item.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </div>
          )):<h3 >No Data Found</h3>}
        </div>
      </div>

      <div style={{display:'flex',justifyContent:'space-evenly'}}> 


     {currentPage==1?<Button variant='contained'  onClick={()=>prevPage()} disabled>Previos</Button>:<Button variant='contained'  onClick={()=>prevPage()}>Previos</Button>} {currentPage}/{totalPages}
  {totalPages>1? <Button variant='contained' onClick={()=>nextPage()}>Next</Button>: <Button variant='contained' onClick={()=>nextPage()} disabled>Next</Button>} 
     {/* {currentPage==totalPages&&<Button variant='contained' onClick={()=>nextPage()} disabled>Next</Button>} */}
      </div>
      </div>
    </>
  );
}

export default TodoForm;
