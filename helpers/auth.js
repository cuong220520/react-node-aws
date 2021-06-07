import cookie from 'js-cookie'
import Router from 'next/router'

// set in cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 1 })
  }
}

// remove from cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key)
  }
}

// get from cookie such as stored token
// will be useful when we need to make request to server with auth token
export const getCookie = (key, req) => {
  // if (process.browser) {
  //   return cookie.get(key)
  // }
  return process.browser ? getCookieClient(key) : getCookieServer(key, req)
}

export const getCookieClient = (key) => {
  return cookie.get(key)
}

export const getCookieServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined
  }

  let token = req.headers.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith(`${key}=`))

  if (!token) return undefined

  let tokenVal = token.split('=')[1]

  return tokenVal
}

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// remove from localstorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key)
  }
}

// authenticate by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  setCookie('token', response.data.token)
  setLocalStorage('user', response.data.user)
  next()
}

// access user infor from localstorage
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
      } else {
        return false
      }
    }
  }
}

export const logout = () => {
  removeCookie('token')
  removeLocalStorage('user')
  Router.push('/auth/login')
}
