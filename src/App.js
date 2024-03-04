import React , {useEffect, useState , useRef, createElement, useMemo} from 'react'
import './App.css'
import Data from './data'


const App = () => {
  const[countryCode , setcountryCode] = useState({})
  const[data , setdata] = useState([])
  const[currData , setcurrData] = useState({})
  const[flag , setflag] = useState("AD")
  const[flag2 , setflag2] = useState("AD")
  const[currKey , setcurrKey] = useState("")
  const[currKey2 , setcurrKey2] = useState("")
  const[input , setInput] = useState("1")

  const[Final , setFinal] = useState("80")
  const isFirstRender = useRef(true);
  const [loading, setLoading] = useState(true); // Loading state


  const[clickFinal , setclickFinal] = useState("")
  useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            let code = async () => {
                try {
                    let data1 = await fetch("https://flagcdn.com/en/codes.json");
                    let data2 = await data1.json();
                    setcountryCode(data2);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false); // Once fetched, loading state is set to false
                }
            };
            code();
        }
    }, []);


 //console.log(currData)

  useEffect(() => {
    let newData = [];
    for (let i in countryCode) {
        newData.push(createOption(i, countryCode[i]))
    }
    setdata(newData);
}, [countryCode]);


 
let createOption =   (value, Text) => {
  return createElement('option', { value }, Text);
};


 
 useEffect(()=>{
  let Api = async () =>{
    let currencyData = await fetch(`https://open.er-api.com/v6/latest/${currKey}`)
    let currencyData2 = await currencyData.json()
    setcurrData(currencyData2.rates)
    
  }

  Api()
 },[currKey]) 
 
 //console.log(currData)
 
  

 
//  console.log(data)




 useEffect(() => {
         
  for(let i in Data){
    if( flag == Data[i]){
     setcurrKey(i)
    }
   
 }

 for(let i in Data){
  if( flag2 == Data[i]){
   setcurrKey2(i)
  }
    
}
         
 },[flag,flag2]);

 


  return (
   <>
 {loading ? ( // Rendering loading state if data is still being fetched
                <div>Loading...</div>
            ) :

   <div className="container" >
  <h2>Currency Converter</h2>
  <div className="input-box">
    <p>Enter Amount</p>
    <input type="number" id="inp" onChange={(e)=>{
           setInput(e.target.value)
          
    }} />
  </div>
  <div className="flagContainer">
    <div className="from">
      <p>From</p>
      <img src={`https://flagsapi.com/${flag}/flat/64.png`} alt='true' id="img1" />
      <select name="country" id="countryFlag" onChange={(e)=>{
        
        let upper = e.target.value.toUpperCase()
        setflag(upper)  
            // for(let i in Data){
            //    if( flag == Data[i]){
            //     setcurrKey(i)
            //    }
              
            // }
          //  console.log(currKey)
          //  console.log(flag)
      }}>
        { 
         data.map((option)=>(
              option
         ))

        }
      </select>
    </div>
    <i className="fa-solid fa-arrow-right-arrow-left" />
    <div className="from">
      <p>To</p>
      <img src={`https://flagsapi.com/${flag2}/flat/64.png`} alt='true' id="img1" />
      <select name="country" id="countryFlag"  onChange={
        (e)=>{
        let upper = e.target.value.toUpperCase()
            setflag2(upper)
           
            // for(let i in Data){
            //    if( flag2 == Data[i]){
            //     setcurrKey2(i)
            //    }
                 
            // }
      //  console.log(currKey2)
            
      }
      } >
      { 
         data.map((option)=>(
              option
         ))

        }
      </select>
    </div>
  </div>
  <div className="para" id="para1">
    {input}{currKey}= {Final}  {currKey2}
    {}
  </div>
  <button id="btn" onClick={()=>{ 
     if (currKey && currKey2 && currData[currKey2]) {
      const convertedResult = eval(input * currData[currKey2]);
      setFinal(convertedResult.toString());
  }

  }}>Get Exchange Rate</button>
</div>
 }
   </>
  )
}

export default App
