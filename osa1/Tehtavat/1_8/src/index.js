import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.otsikko}</h1>
    </div>
  )
}

const Statistics = (props) => {
  const osat = [
      {
        nimi: 'Hyvä',
        arvo: props.sisalto.hyva
      },
      {
        nimi: 'Neutraali',
        arvo: props.sisalto.neutraali
      },
      {
        nimi: 'Huono',
        arvo: props.sisalto.huono
      },
      {
        nimi: 'Keskiarvo',
        arvo: (props.sisalto.hyva - props.sisalto.huono) / (props.sisalto.hyva + props.sisalto.neutraali + props.sisalto.huono)
      },
      {
        nimi: 'Positiivisia',
        arvo: props.sisalto.hyva / (props.sisalto.hyva + props.sisalto.neutraali + props.sisalto.huono) * 100
      }
    ]


  return (
    <div>
      <Statistic nimi={osat[0].nimi} arvo={osat[0].arvo} />
      <Statistic nimi={osat[1].nimi} arvo={osat[1].arvo} />
      <Statistic nimi={osat[2].nimi} arvo={osat[2].arvo} />
      <Statistic nimi={osat[3].nimi} arvo={osat[3].arvo} />
      <Statistic nimi={osat[4].nimi} arvo={osat[4].arvo} />
    </div>
  )
}

const Statistic = (props) => {
  return (
    <div>
      {props.nimi} {props.arvo}<bR></bR>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.callback}>{props.text}</button>
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
          <Button callback={this.klikHyva} text={'hyva'} />
          <Button callback={this.klikNeutraali} text={'neutraali'} />
          <Button callback={this.klikHuono} text={'huono'} />
          <Otsikko otsikko={this.unicafeSovellus.statistiikka} />
          <Statistics sisalto={this.state} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)