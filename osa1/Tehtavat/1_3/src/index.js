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
        <Osa osa={props.osa1} maara={props.tehtavia1} />
        <Osa osa={props.osa2} maara={props.tehtavia2} />
        <Osa osa={props.osa3} maara={props.tehtavia3} />
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
        <p>Yhteensä {props.yhteensa} tehtävää</p>
      </div>
    )
  }

const App = () => {

  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto osa1={osa1.nimi} maara1={osa1.tehtavia} osa2={osa2.nimi} maara2={osa2.tehtavia} osa3={osa3.nimi} maara3={osa3.tehtavia}/>
      <Yhteensa  yhteensa={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)