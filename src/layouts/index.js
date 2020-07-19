import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import PublicLayout from './Public'
import AppLayout from './App'

const Layouts = {
  public: PublicLayout,
  app: AppLayout,
}

@withRouter
class Layout extends React.PureComponent {
  previousPath = ''

  componentDidUpdate(prevProps) {
    const {
      location: { pathname },
    } = this.props
    const {
      location: { pathname: prevPathname },
    } = prevProps
    if (pathname !== prevPathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const {
      children,
      location: { pathname, search },
    } = this.props

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    // Layout Rendering
    const getLayout = () => {
      if (pathname === '/') {
        return 'public'
      }
      return 'app'
    }

    const Container = Layouts[getLayout()]

    const BootstrappedLayout = () => {
      // in other case render previously set layout
      return <Container>{children}</Container>
    }

    return (
      <Fragment>
        <Helmet titleTemplate="Weather app | %s" title="Weather app" />
        {BootstrappedLayout()}
      </Fragment>
    )
  }
}

export default Layout
