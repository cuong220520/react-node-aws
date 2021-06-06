import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import { showSuccessMessage, showErrorMessage } from '../../helpers/alert'
import { authenticate, isAuth } from '../../helpers/auth'

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    err: '',
    success: '',
    btnTxt: 'Login',
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
      btnTxt: 'Login',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.table({ name, email, password })

    setState({ ...state, btnTxt: 'Loging in' })

    try {
      const res = await axios.post(`${process.env.BASE_API}/auth/login`, {
        email,
        password,
      })

      authenticate(res, () =>
        isAuth() && isAuth().role === 'admin'
          ? Router.push('/admin')
          : Router.push('/user')
      )
    } catch (err) {
      console.error(err.response)
      setState({ ...state, btnTxt: 'Login', err: err.response.data.error })
    }
  }

  const { email, password, err, success, btnTxt } = state

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
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
        <h1>Login</h1>
        <br />

        {success && showSuccessMessage(success)}
        {err && showErrorMessage(err)}

        <br />

        {loginForm()}
      </div>
    </Layout>
  )
}

export default Login
