import { Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider } from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage'
import MainLayout from './Layouts/MainLayout'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, {jobLoader } from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import axios from 'axios'
import EditJobPage from './pages/EditJobPage'

const App = () => {

  // Add New Job
const addJob = async (newJob) => {
  try {
    const formattedJob = {
      data: {
        title: newJob.title,
        type: newJob.type,
        location: newJob.location,
        description: newJob.description,
        salary: newJob.salary,
        company: newJob.company,
      }
    };

    const res = await axios.post('http://localhost:1337/api/jobs', formattedJob, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error adding job:', error);
    throw error;
  }
};

 //Delete Job
 const deleteJob = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:1337/api/jobs/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
 }

 // Update Job
 const updateJob = async (job) => {
  try {
    const res = await axios.put(`http://localhost:1337/api/jobs/${job.id}`, {
      data: {
        title: job.title,
        type: job.type,
        location: job.location,
        description: job.description,
        salary: job.salary,
        company: job.company,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element= { <HomePage /> }/>
        <Route path='/jobs' element={<JobsPage/>}/>
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>}/>
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader }/>
        <Route path='/jobs/:id' element={<JobPage deleteJob={ deleteJob}/>} loader={jobLoader }/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Route>
    )
  )
  return <RouterProvider router={router} />;
}

export default App
