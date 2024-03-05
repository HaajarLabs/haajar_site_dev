import React from 'react';

const Model = ({ isvisible, onClose, children }) => {
  if (!isvisible) return null;

  const handleClose = (e) => {
    const target = e.target;
    if (target.id === 'wrapper') onClose();
  };

  return (
    <div className='z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ' id='wrapper' onClick={handleClose}>
      <div className='w-[600px]'>
        <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
        <div className='bg-white p-2 rounded-xl'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Model;
