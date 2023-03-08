import {createContext, useContext, useState, useEffect, useRef} from "react"
import axios from "axios"
import React from "react"
import { useIsAuthenticated, useSignIn, useSignOut } from "react-auth-kit"
import {useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import {api} from "./api/api"

const AppContext = createContext()

const AppProvider = ({children}) => {
  
  const signIn = useSignIn();
  const signOut = useSignOut();
 const isAuthenicated = useIsAuthenticated();
 const nagivate = useNavigate();
  const [getdata,setData] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [smessages, setMessages] = useState("")
  const [active, setActive] = useState(false)
  const [studentId, setStudentId] = useState("")
  const [firstname, setFirstName] = useState("")
  const [middlename, setMiddleName] = useState("")
  const [lastname, setLastName] = useState("")
  const [dob, onChange] = useState(new Date())
  const [address, setAddress] = useState("")
  const [phone,setPhone] = useState("")
  const [roomNumber,setRoomNumber] = useState("")
  const [search,setSearch] = useState("")
  const [text,setSearchText] = useState("")
  const errRef = useRef()

  const USER_URL = "https://myauthapivone.herokuapp.com/api/login"
  const ADD_STUDENT = "https://myauthapivone.herokuapp.com/api/create-student"
  // const Student = `https://myauthapivone.herokuapp.com/api/student/${search}`


  const postData = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Controll-Allow-Origin": "*",
    },
  }

   const toastData = {
    position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",

  }

  //Get Student Data
  
    const fetchData = async(URL)=>{
      setLoading(true)
      try{
      const data = await api.get(URL)
      if(data.data.student){
        setData(data.data.student)
        console.log(data)
      }else{
        setData([])
      }
      }catch(error){
        setError(error.response)
      }
      setLoading(false)
    }

   
    useEffect(() => {
      if(!search) return
      fetchData(`/student/${search}`)
      setMessages(" There is no student by the name of  " + search)

    },[search]);

    const ResetData = () =>{
        fetchData("/students")
        setSearch("")
     }

  
  const handleLogout = async () => {
    signOut();
    toast.success("You have been logged out",toastData)
    nagivate("/")
  }


  const handleStudent = async(e) => {
    e.preventDefault()
    try {
     
      const student = {
        studentId,
        roomNumber,
        firstname,
        lastname,
        middlename,
        dob,
        address,
        phone
      }
      const addStudent = await axios.post(ADD_STUDENT, JSON.stringify(student), postData)
      console.log(addStudent)
      if(addStudent.data.status.success = "success"){
        nagivate("/dashboard")
      }else{
        alert("Unable to add student")
      } 
    } catch (error) {
      setError(error)
    }
  }
  return (
    <AppContext.Provider
      value={{
        toastData,
        USER_URL,
        signIn,
        signOut,
        postData,
        ResetData,
        fetchData,
        // Student,
        text,
        setSearchText,
        setSearch,
        search,
        roomNumber,
        setRoomNumber,
        phone,
        setPhone,
        getdata,
        setData,
        setActive,
        active,
        setError,
        error,
        success,
        email,
        setEmail,
        password,
        setPassword,
        setMessages,
        smessages,
        // handleLogin,
        handleLogout,
        errRef,
        loading,
        studentId,
        firstname,
        lastname,
        middlename,
        dob,
        address,
        setFirstName,
        setLastName,
        setAddress,
        setMiddleName,
        onChange,
        setStudentId,
        handleStudent,
        fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}
export {AppContext, AppProvider}
