import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.otsikko}</h1>
      </div>
    )
  }

  const Sisalto = (props) => {
    return (
      <div>
        Hyvä: {props.sisalto.hyva}<br></br>
        Neutraali: {props.sisalto.neutraali}<br></br>
        Huono: {props.sisalto.huono}<br></br>
        Keskiarvo: {(props.sisalto.hyva - props.sisalto.huono)/(props.sisalto.hyva + props.sisalto.neutraali + props.sisalto.huono) }<br></br>
        Positiivisia: {props.sisalto.hyva/(props.sisalto.hyva + props.sisalto.neutraali + props.sisalto.huono) * 100 }
      </div>
    )
  }


  class App extends React.Component {
    constructor(props) {
      super(props)
      this.unicafeSovellus = {
        annaPalautetta: 'Anna palautetta',
        statistiikka: 'Statistiikka',
      }
    
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }
  
    klikHyva = () => {
      this.setState({
        hyva: this.state.hyva + 1
      })
    }
  
    klikNeutraali = () => {
      this.setState({
        neutraali: this.state.neutraali + 1
      })
    }

    klikHuono = () => {
      this.setState({
        huono: this.state.huono + 1
      })
    }
  
    render() {
      return (
        <div>
          <div>
            <Otsikko otsikko={this.unicafeSovellus.annaPalautetta} />
            <button onClick={this.klikHyva}>hyva</button>
            <button onClick={this.klikNeutraali}>neutraali</button>
            <button onClick={this.klikHuono}>huono</button>
            <Otsikko otsikko={this.unicafeSovellus.statistiikka} />
            <Sisalto sisalto = {this.state} />
          </div>
        </div>
      )
    }
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)