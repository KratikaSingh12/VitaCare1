import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const specialities = [
    'General Physician', 'Gynecologist', 'Dermatologist', 'Pediatrician',
    'Neurologist', 'Gastroenterologist', 'Cardiologist', 'Orthopedic',
    'ENT', 'Ophthalmologist', 'Urologist', 'Dentist', 'Oncologist', 'Psychiatrist'
  ];

  const applyFilter = () => {
    if (speciality) {
      const filtered = doctors.filter(doc => doc.speciality === speciality);
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    // console.log("✅ Doctors from context:", doctors);
    // console.log("🔍 Current speciality param:", speciality);
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="my-10">
      <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Browse Specialists</h2>
      <p className='text-gray-500 mb-6'>Select a specialty and view available doctors.</p>

      <div className='flex flex-col sm:flex-row items-start gap-5'>
        {/* Filter Button for Mobile */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-blue-600 text-white' : ''}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Speciality Filters */}
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialities.map((spec) => (
            <p
              key={spec}
              onClick={() => navigate(speciality === spec ? '/doctors' : `/doctors/${spec}`)}
              className={`w-[90vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === spec ? 'bg-blue-100 text-blue-900 font-semibold' : ''
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {filterDoc.length === 0 ? (
            <p className="text-gray-500 col-span-full">No doctors found for selected speciality.</p>
          ) : (
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all duration-300'
              >
                <div className='w-full h-56 bg-gray-100 overflow-hidden'>
                  <img
                    className='w-full h-full object-cover'
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className='p-4 text-center'>
                  <div className='flex items-center justify-center gap-2 text-sm text-green-500'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    <p>Available</p>
                  </div>
                  <p className='mt-2 text-lg font-semibold text-gray-900'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
