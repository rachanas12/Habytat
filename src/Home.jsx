import React, { useRef, useState } from 'react'
import "./home.css"
import logo from "./assets/logo.png"
import photo from "./assets/image.svg"
import {MdKeyboardBackspace} from "react-icons/md"
import json from "./country_codes.json"
import TextField from '@mui/material/TextField';
import flag from "./assets/flag.png"

const Home = () => {
    let [sidebar,setSidebar]=useState(false)
    let sidebarref=useRef()
    let [country,setCountry]=useState()
    let [contact,setContact]=useState()
    let [validate,setValidate]=useState(false)
    let [code,setCode]=useState({
        code : ""
    })
    
    
   
    let handleCheck=()=>{
        if(!sidebar){
            setSidebar(true)
        }
            else{
                setSidebar(false)
            }
    }
    let handleBack=()=>{
        setSidebar(false)
    }
    let {code1}=code
   
    let handleData=(e)=>{
        let name=e.target.name
    let value=e.target.value
    setContact({...contact,[name]:value})
    setCode({...code,[name]:value})
    }

    let handleSubmit=async(e)=>{
        e.preventDefault()
        
        let valid= json.map((x)=>{
            if(code1 == x.code)
                {
                    setCountry(x.mobile_validation[0].size)
                    let phone=contact.toString()
                    if(contact.toString().length==x.mobile_validation[0].size){
                        {x.mobile_validation[0].start_with.map((d,i)=>{
                            if(phone.startsWith(d)){
                                setValidate(true)
                            }
                        })} 
                    }
                    else{
                        alert("check mobile number length")
                    }
                }
          })
}

  return (
    <nav className='page'>

    <nav className='home'  >

        <div className='container'  >
        <div className='content' >
        <img src={logo} alt="" />
        <br /><br />
        <div >
            <h1>Did You Know?</h1><br />
            <p>67% of the phone number's submitted through online forms are invalid</p>
            <button onClick={handleCheck} className='homebutton'>check mobile number validity</button>
        </div>
        </div >

        <div className='photo'>
            <img src={photo} alt="" />
        </div>
        </div>
        <p id='bag_text'>PHONE NUMBER</p>
    </nav>

    {sidebar ? <>
    <div className='empty'></div>
    <div className='sidebar' ref={sidebarref} >
    <div className='sidebar_content'>
        <h2 onClick={handleBack}><MdKeyboardBackspace/></h2>
        <p>Check phone number validity</p><br /><br />
        <div id='phone_content'>
        <img src={flag} alt="" id='flag'/>
        <select name="code1" id="" onChange={handleData} >
        
            {json.map((x)=>{
                return(
                    
                    <option value={x.code}>  {x.dial_code}</option>
                )
            })}
        </select>
        <TextField id="standard-basic" className='textfield' label="Phone Number" variant="standard" inputProps={{ maxLength: country, disableUnderline: true }} 
         onChange={(e)=>{setContact(e.target.value)}} />   
             </div>
        <br />
        {validate ==true ? <button id='b1'>The Mobile Number is Valid</button> : <button onClick={handleSubmit}>Check for validity</button>  }
    </div>
    </div></>
    : null}
        </nav>
  )

}
export default Home

