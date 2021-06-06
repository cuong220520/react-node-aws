import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alert'
import { withRouter } from 'next/router'
import Layout from '../../../components/Layout'

const ActivateAccount = ({ router }) => {
  const [state, setState] = useState({
    name: '',
    token: '',
    btnTxt: 'Activate Account',
    success: '',
    err: '',
  })

  const { name, token, btnTxt, success, err } = state

  useEffect(() => {
    let tken = router.query.token
    if (tken) {
      const { name } = jwt.decode(tken)
      setState({ ...state, name, token: tken })
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submit')
    setState({ ...state, btnTxt: 'Activating' })

    try {
      const res = await axios.post(
        `${process.env.BASE_API}/auth/register/activate`,
        { token }
      )
      setState({
        ...state,
        name: '',
        token: '',
        btnTxt: 'Activated',
        success: res.data.message,
      })
    } catch (err) {
      console.error(err)
      setState({
        ...state,
        btnTxt: 'Activate Account',
        err: err.response.data.error,
      })
    }
  }

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h1>G'day {name}, ready to activate your account</h1>
          <br />
          {success && showSuccessMessage(success)}
          {err && showErrorMessage(err)}
          <button
            className='btn btn-outline-warning btn-block'
            onClick={handleSubmit}
          >
            {btnTxt}
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default withRouter(ActivateAccount)
