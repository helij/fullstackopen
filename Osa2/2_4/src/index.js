import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi.nimi}</h1>
    </div>
  )
}

const Kurssi = (props) => {
  return (
    props.kurssit.map(kurssi=>
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto kurssi={kurssi} />
      <Yhteensa kurssi={kurssi} />
    </div>
    )
  )
}

const Sisalto = (props) => {
  return (
    <div>
       {props.kurssi.osat.map(osa=><Osa key={osa.id} osa={osa}/>)}
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const result = props.kurssi.osat.map(osa => osa.tehtavia);
  return (
    <div>
      <p>Yhteensä {result.reduce(reducer)} tehtävää</p>
    </div>
  )
}

const App = () => {

  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Kurssi kurssit={kurssit} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)