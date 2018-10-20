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
    <div>
      <Otsikko kurssi={props.kurssi} />
      <Sisalto kurssi={props.kurssi} />
      <Yhteensa kurssi={props.kurssi} />
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
       {props.kurssi.osat.map(osa=><Osa key={osa.id} osa={osa}/>)}
    </div>
  )
}

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
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

  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
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
      },
      {
        nimi: 'Redux',
        tehtavia: 14,
        id: 4
      }
    ]
  }


  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)