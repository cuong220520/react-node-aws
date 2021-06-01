import React, { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'

// Router.onRouteChangeStart = (url) => NProgress.start()
// Router.onRouteChangeComplete = (url) => NProgress.done()
// Router.onRouteChangeError = (url) => NProgress.done()

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})

const Layout = ({ children }) => {
  const head = () => (
    <Head>
      <link
        rel='stylesheet'
        href='/bootstrap-4.5.0-dist/css/bootstrap.min.css'
      />

      <link rel='stylesheet' href='/static/css/styles.css' />
    </Head>
  )

  const nav = () => (
    <ul className='nav nav-tabs bg-warning'>
      <li className='nav-item'>
        <Link href='/'>
          <a className='nav-link text-dark'>Home</a>
        </Link>
      </li>

      <li className='nav-item'>
        <Link href='/login'>
          <a className='nav-link text-dark'>Login</a>
        </Link>
      </li>

      <li className='nav-item'>
        <Link href='/register'>
          <a className='nav-link text-dark'>Register</a>
        </Link>
      </li>
    </ul>
  )

  return (
    <Fragment>
      {head()}
      {nav()}

      <div className='container pt-5 pb-5'>{children}</div>
    </Fragment>
  )
}

export default Layout
