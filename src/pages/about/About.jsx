import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import "./About.css"
import { useParams } from "react-router-dom";

function About() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
        try {
            const req = await fetch(`http://localhost:3000/recipes/${id}`);
            const data = await req.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, [id]);
console.log(product);
  return (
    <div className="container">
      <div className="block">
        <h1>{product.title}</h1>
        <p><span>Cooking Time: </span>{product.cookingTime}</p>
        <p><span>Method: </span>{product.cookingTime}</p>
        <p><span>Ingredients: </span>{product.ingredients}</p>
        <NavLink to={"/"}>
          <p className='link'>back</p>
        </NavLink>
      </div>
    </div>
  )
}

export default About