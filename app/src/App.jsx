import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './component/SearchResult/SearchResult';



export const BASE_URL  = "http://localhost:9000"
const App = () => {



  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchFoodData = async() => {
      setLoading(true);
  
      try{
        const response = await fetch(BASE_URL);
  
        const json = await response.json();
  
        
        setData(json);
        setFilterData(json);
        setLoading(false);
      } catch(error) {
        setError("Unable to fetch data");
      }
  
    };
    fetchFoodData();
  }, []);

  // console.log(data);

//   const temp = [
//     {
//         "name": "Boilded Egg",
//         "price": 10,
//         "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
//         "image": "/images/egg.png",
//         "type": "breakfast"
//     }
// ]


const searchFood = (e) => {
  const searchValue = e.target.value;
  if(searchValue === "") {
    setFilterData(null);
  }

  const filter = data?.filter((food) => 
  food.name.toLowerCase().includes(searchValue.toLowerCase())
);
setFilterData(filter);
};

const filterFood = (type) => {
  if (type === "all"){
    setFilterData(data);
    setSelectedBtn(data);
    return;
    
  }
  const filter = data?.filter((food) => 
  food.type.toLowerCase().includes(type.toLowerCase())
  );
setFilterData(filter)
setSelected(type); 
}

const filterBtns = [{
  name:"All",
  type:"all", 
},

{
  name:"Breakfast",
  type:"breakfast", 
},

{
  name:"Lunch",
  type:"lunch", 
},

{
  name:"Dinner",
  type:"dinner", 
},

]

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;


  return (
    <>
      <Container>
    <Topconatiner>
      <div className="logo">
        <img src="/images/logo.svg" alt="logo" />
      </div>

      <div className='search'>
        <input 
        onChange = {searchFood} 
        placeholder='Search Food'
        />
      </div>


    </Topconatiner>

    <Filtercontainer>
      {
        filterBtns.map((value) => (
          <Button
          isSelected={selectedBtn === value.type}
          
          key={value.name} onClick = {() => filterFood (value.type)}>{value.name}</Button>

        ))
      }

    </Filtercontainer>
    
    

  </Container>
  <SearchResult data = {filterData}/>
    </>
  );
};

export default App;

export const Container = styled.div`
max-width: 1200px;
margin: 0 auto;

`;
const Topconatiner = styled.section`
height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;

.search{
  input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    &::placeholder{
      color: white;
    }

  }
}

@media (0 < width < 600px) {
  flex-direction: column;
  height: 120px;
}

`;


const Filtercontainer = styled.section`
display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 40px;
`;

export const Button = styled.button`
background:${({isSelected}) => (isSelected ? "#f22f2f" : "#ff4343") };
outline:1px solid ${({isSelected}) => (isSelected ? "white" : "#ff4343") };

border-radius: 5px;
padding: 6px 12px ;
border: none;
color: white;
height: 24px;
cursor: pointer;
&:hover {
  background-color: #f22f2f;
}

`;


