import React from 'react'
import Layout from '../../components/Layout'
import withAdmin from '../withAdmin'

const AdminIdx = ({ user, token }) => {
  return (
    <Layout>
      {JSON.stringify(user)}, {token}
    </Layout>
  )
}

export default withAdmin(AdminIdx)
