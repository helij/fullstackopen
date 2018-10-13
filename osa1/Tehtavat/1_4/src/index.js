import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.kurssi}</h1>
      </div>
    )
  }

  const Sisalto = (props) => {
    return (
      <div>
        <Osa osa = {props.osat[0].nimi} maara={props.osat[0].tehtavia} />
        <Osa osa = {props.osat[1].nimi} maara={props.osat[1].tehtavia} />
        <Osa osa = {props.osat[2].nimi} maara={props.osat[2].tehtavia} />
      </div>
    )
  }

  const Osa = (props) => {
    return (
      <div>
         <p>{props.osa} {props.maara}</p>
      </div>
    )
  }

  const Yhteensa = (props) => {
    return (
      <div>
        <p>Yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
      </div>
    )
  }

const App = () => {

  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]


  return (
    <div>
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={osat} />
      <Yhteensa osat={osat} />
    </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)