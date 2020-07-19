import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import TopBar from 'components/layout/TopBar'

const mapStateToProps = ({ settings }) => ({ settings })

@withRouter
@connect(mapStateToProps)
class AppLayout extends React.PureComponent {
  render() {
    const {
      children,
      settings: {
        isGrayBackground,
        isSquaredBorders,
        isCardShadow,
        isBorderless,
      },
    } = this.props

    return (
      <div className={classNames({ air__layout__grayBackground: isGrayBackground })}>
        <Layout
          className={classNames({
            air__layout__contentNoMaxWidth: true,
            air__layout__grayBackground: isGrayBackground,
            air__layout__squaredBorders: isSquaredBorders,
            air__layout__cardsShadow: isCardShadow,
            air__layout__borderless: isBorderless,
          })}
        >

          <Layout>
            <Layout.Header className={classNames('air__layout__header air__layout__fixedHeader air__layout__headerGray')}>
              <TopBar />
            </Layout.Header>
            <Layout>
              <Layout>
                <Layout.Content style={{ height: '100%' }}>
                  <div className="air__utils__content">{children}</div>
                </Layout.Content>
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default AppLayout
