import React from 'react'

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

  const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.kurssi.nimi}</h1>
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
  

export default Kurssi