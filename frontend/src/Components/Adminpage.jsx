import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adminpage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admintoken');
    if (!token) {
      navigate('/admin');
      return;
    }

    // axios.get('http://localhost:3333/api/adminpage', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .catch((err) => {
    //   console.log("Unauthorized or Token Invalid");
    //   navigate('/admin');
    // });
  }, []);

  return (
    <div>
      <h1>this is admin page</h1>
    </div>
  );
};

export default Adminpage;
