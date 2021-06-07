import axios from 'axios'
import { getCookie } from '../helpers/auth'

const withAdmin = (Page) => {
  const WithAdminUser = (props) => <Page {...props} />

  WithAdminUser.getInitialProps = async (context) => {
    const token = getCookie('token', context.req)

    let user = null

    if (token) {
      try {
        const res = await axios.get(`${process.env.BASE_API}/profile/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        user = res.data
      } catch (err) {
        if (err.response.status === 401) {
          user = null
        }
      }
    }

    if (user === null) {
      // redirect
      context.res.writeHead(302, {
        Location: '/',
      })
      context.res.end()
    } else {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps : {}),
        user,
        token,
      }
    }
  }

  return WithAdminUser
}

export default withAdmin
