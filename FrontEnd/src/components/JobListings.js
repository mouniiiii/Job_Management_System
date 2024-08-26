import React, { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const recentJobs = isHome ? jobs.slice(0, 3) : jobs;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/jobs');
        console.log('API Response:', response.data);
        setJobs(response.data.data);
      } catch (error) {
        console.error('Error fetching data from Strapi:', error);
        setError('Error fetching data from Strapi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          Recent Jobs
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {jobs.length > 0 ? (
            recentJobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))
          ) : (
            <div>No jobs available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
