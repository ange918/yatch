import { Component } from 'react'

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
          <p>Une erreur est survenue. <button onClick={() => { this.setState({ hasError: false }); window.location.reload() }}>Recharger</button></p>
        </div>
      )
    }
    return this.props.children
  }
}
