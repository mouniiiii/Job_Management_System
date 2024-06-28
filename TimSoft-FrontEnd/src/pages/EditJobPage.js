import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditJobPage = ({ updateJobSubmit }) => {
  const jobData = useLoaderData();
  const job = jobData.data;
  const [title, setTitle] = useState(job.attributes.title || '');
  const [type, setType] = useState(job.attributes.type || '');
  const [location, setLocation] = useState(job.attributes.location || '');
  const [description, setDescription] = useState(
    job.attributes.description ? job.attributes.description[0]?.children[0]?.text || '' : ''
  );
  const [salary, setSalary] = useState(job.attributes.salary || '');
  const [companyId, setCompanyId] = useState(job.attributes.company?.data?.id || '');
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch existing companies from Strapi
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/companies');
        setCompanies(response.data.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedJob = {
      id,
      title,
      type,
      location,
      description: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: description,
            },
          ],
        },
      ],
      salary,
      company: companyId,
    };

    try {
      await updateJobSubmit(updatedJob);
      toast.success('Job Updated Successfully');
      navigate(`/jobs/${id}`);
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    }
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Update Job</h2>

            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>Job Type</label>
              <select
                id='type'
                name='type'
                className='border rounded w-full py-2 px-3'
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value='Full-Time'>Full-Time</option>
                <option value='Part-Time'>Part-Time</option>
                <option value='Remote'>Remote</option>
                <option value='Internship'>Internship</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Job Listing Name</label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Beautiful Apartment In Miami'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='description' className='block text-gray-700 font-bold mb-2'>Description</label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add any job duties, expectations, requirements, etc'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>Salary</label>
              <select
                id='salary'
                name='salary'
                className='border rounded w-full py-2 px-3'
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              >
                <option value='Under $50K'>Under $50K</option>
                <option value='$50K - 60K'>$50K - $60K</option>
                <option value='$60K - 70K'>$60K - $70K</option>
                <option value='$70K - 80K'>$70K - $80K</option>
                <option value='$80K - 90K'>$80K - $90K</option>
                <option value='$90K - $100K'>$90K - $100K</option>
                <option value='$100K - 125K'>$100K - $125K</option>
                <option value='$125K - 150K'>$125K - $150K</option>
                <option value='$150K - 175K'>$150K - $175K</option>
                <option value='$175K - $200K'>$175K - $200K</option>
                <option value='Over $200K'>Over $200K</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Location</label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Location'
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <h3 className='text-2xl mb-5'>Company Info</h3>

            <div className='mb-4'>
              <label htmlFor='company' className='block text-gray-700 font-bold mb-2'>Company Name</label>
              <select
                id='company'
                name='company'
                className='border rounded w-full py-2 px-3'
                required
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
              >
                <option value=''>Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.attributes.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
