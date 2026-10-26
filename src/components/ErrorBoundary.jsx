import { Component } from 'react'
import i18n from '../i18n'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    if (error?.message?.includes('removeChild') || error?.message?.includes('Node')) {
      this.setState({ hasError: false })
      return
    }
    console.error('[ErrorBoundary]', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>{i18n.t('error.generic')} <button onClick={() => { this.setState({ hasError: false }); window.location.reload() }}>{i18n.t('error.reload')}</button></p>
        </div>
      )
    }
    return this.props.children
  }
}
