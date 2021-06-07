import axios from 'axios'
import { getCookie } from '../helpers/auth'

const withUser = (Page) => {
  const WithAuthUser = (props) => <Page {...props} />

  WithAuthUser.getInitialProps = async (context) => {
    const token = getCookie('token', context.req)

    let user = null

    if (token) {
      try {
        const res = await axios.get(`${process.env.BASE_API}/profile/user`, {
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
    } else {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps : {}),
        user,
        token,
      }
    }
  }

  return WithAuthUser
}

export default withUser
