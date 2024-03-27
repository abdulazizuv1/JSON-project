import { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { IoIosAlarm } from "react-icons/io";
import { FaPen } from "react-icons/fa6";
import { NavLink } from 'react-router-dom'
import "./Home.css"
import { toast } from 'react-toastify';

function Home() {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("Abdulaziz");
  const [ingred, setIngred] = useState("nand'wddawd");
  const [method, setMethod] = useState("fergana");
  const [time, setTime] = useState("nand'wddawd");
  const [id, setId] = useState("");

  const getData = async (api) => {
    try {
      const req = await fetch(api);
      const data = await req.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Error 404")
    }
  };
  
  const deleteData = async (api, config)=>{
    try {
      await fetch(api, config);
      getData("http://localhost:3000/recipes");
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error("Error 404")
    }
  }

  useEffect(() => {
    getData("http://localhost:3000/recipes");
  }, []);
  
  const updateData = async (api, config) => {
    try {
      await fetch(api, config);
      getData("http://localhost:3000/recipes");
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="container">
      <div className="boxes">
        {
          data.map((item)=>{
            return(
              <div className="box">
                <div className="title">
                  <h2>{item.title}</h2>
                  <div className="icons">
                  <FaTrash
                    onClick={()=>{
                      setId(item.id);
                      setModalVisible(true);
                      deleteData(`http://localhost:3000/recipes/${item.id}`, {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        })
                  }} className='trash'/>
                  <FaPen className='pen'/> 
                  </div>
                </div>
                <p>Cooking Times {item.cookingTime}<IoIosAlarm /></p>
                <p>{item.method.slice(0,120)}...</p>
                <NavLink to={`/about/${item.id}`}>
                  <button className='box_btn'>Read More...</button>
                </NavLink>
              </div>
            )
          })
        }
      </div>
      {/* {modalVisible && (
        <div className="modal" >
          <div className="create create2">
          <div className="form_cont container">
      <form action="" onSubmit={(e) => {
              e.preventDefault();
              updateData(`http://localhost:3000/recipes/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title,
                  ingred,
                  method,
                  time
                }),
              });
            }} className="form">
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
          </div>
        </div>
      )} */}
    </div>
  )
}

export default Home