import React, {useEffect, useState} from "react"
import {useGlobalContext} from "../context"
import NavBar from "../components/NavBar"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Link } from "react-router-dom"
import Title from "../components/Title"
import FirstStep from "../components/forms/FirstStep"
import Footer from "../components/Footer/Footer"

const AddStudent = () => {
  const {
    active,
    setActive,
    setError,
    setMessages,
    smessages,
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
    phone,
    setPhone,
    roomNumber,
    setRoomNumber
  } = useGlobalContext()

  

  useEffect(() => {
    if (active) {
      setActive(!active)
    }
  }, [active])

  useEffect(() => {
    if (smessages) {
      setMessages("")
    }
  }, [smessages])

  return (
    <>
      <NavBar />
     <Title title="Add Student"/>
     <FirstStep/>
     <Footer/>
    </>
  )
}

export default AddStudent
