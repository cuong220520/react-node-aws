import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { showSuccessMessage, showErrorMessage } from '../../helpers/alert'
import { isAuth } from '../../helpers/auth'
import Router from 'next/router'

const Register = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    err: '',
    success: '',
    btnTxt: 'Register',
  })

  useEffect(() => {
    isAuth() && Router.push('/')
  }, [])

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      err: '',
      success: '',
      btnTxt: 'Register',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.table({ name, email, password })

    setState({ ...state, btnTxt: 'Registering' })

    try {
      const res = await axios.post(`${process.env.BASE_API}/auth/register`, {
        name,
        email,
        password,
      })

      setState({
        ...state,
        name: '',
        email: '',
        password: '',
        success: res.data.message,
        btnTxt: 'Submitted',
      })
    } catch (err) {
      console.error(err.response)
      setState({ ...state, btnTxt: 'Register', err: err.response.data.error })
    }
  }

  const { name, email, password, err, success, btnTxt } = state

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          name='name'
          value={name}
          onChange={handleChange}
          type='text'
          className='form-control'
          placeholder='Type your name'
        />
      </div>

      <div className='form-group'>
        <input
          name='email'
          value={email}
          onChange={handleChange}
          type='email'
          className='form-control'
          placeholder='Type your email'
        />
      </div>

      <div className='form-group'>
        <input
          name='password'
          value={password}
          onChange={handleChange}
          type='password'
          className='form-control'
          placeholder='Type your password'
        />
      </div>

      <div className='form-group'>
        <button type='submit' className='btn btn-outline-warning'>
          {btnTxt}
        </button>
      </div>
    </form>
  )

  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <h1>Register</h1>
        <br />

        {success && showSuccessMessage(success)}
        {err && showErrorMessage(err)}

        <br />

        {registerForm()}
      </div>
    </Layout>
  )
}

export default Register
