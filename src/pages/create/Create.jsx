import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import { toast } from 'react-toastify';

function Create() {
  const [title, setTitle] = useState('');
  const [ingrInput, setIngrInput] = useState('');
  const [ingr, setIngr] = useState([]);
  const [method, setMethod] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const createData = async (api, config) => {
    await fetch(api, config);
    await navigate('/');
    toast.success("added successfully")
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !ingr.length || !method || !time ) {
      toast.error("Fill the form!")
      return;
    }

    const obj = {
      id: `${Math.floor(Math.random() * 99999)}`,
      title: title,
      ingredients: ingr,
      method: method,
      cookingTime: time,
    };
    createData('http://localhost:3000/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  };

  const handleAddIngredient = () => {
    setIngr([...ingr, ingrInput]);
    setIngrInput('');
  };

  return (
    <div className="form_cont container">
      <form action="" onSubmit={handleSubmit} className="form">
        <h1>Create</h1>
        <label htmlFor="title">Title:</label>
        <input onChange={(e) => setTitle(e.target.value)} className="title" type="text" />
        <label htmlFor="ingredients">Ingredients:</label>
        <div className="ingr">
          <input
            onChange={(e) => setIngrInput(e.target.value)}
            value={ingrInput}
            type="text"
          />
          <button className="btn" type="button" onClick={handleAddIngredient}>
            ADD
          </button>
        </div>
        <h4>Ingredients: {ingr.join(', ')}</h4>
        <label htmlFor="method">Method:</label>
        <textarea onChange={(e) => setMethod(e.target.value)} name="" id="" cols="30" rows="4"></textarea>
        <label htmlFor="cookingTime">Cooking Time:</label>
        <input onChange={(e) => setTime(e.target.value)} type="text" />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
