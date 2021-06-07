import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import withUser from '../withUser'

const UserIdx = ({ user, token }) => {
  return (
    <Layout>
      {JSON.stringify(user)}, {token}
    </Layout>
  )
}

export default withUser(UserIdx)
