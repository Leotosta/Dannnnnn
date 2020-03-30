import React, {useState, useEffect} from 'react';
// Nao se preocupe quantoa a isso, framework do javascript

import { Bar, Line, Radar} from 'react-chartjs-2'
// tipo de grafio, escolhi o bar. Vc pode checar outros no link https://www.chartjs.org/, (sample)

function App() {
  
  const [chartData, setChartData] = useState({})
  
  useEffect(() => {
    async function fetchData(){
      //quando a pagina carregar essa funçao sera ativada
      const resp = await fetch('https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-total.csv')
      //essa url dos dados que vc me deu
      const data = await resp.text()
      const x = data.split(/\n/).splice(1)
      //x retornara um array

      const states = x.map(item => {
        let each = item.split(',')
        let state = each[1]
          // ignora essa logia, so estou passando o formato csv para json( para javascript )

        let totalCases = each[2]
        let numCases = parseInt(totalCases)
        let death = each[5]
        return {state, numCases, death}
        // "colocos os dados nos objs(chave e valor), poderia colocar ou outros mas apenas coloquei esses 3"
        //     
      })     
      return states
    } 

    fetchData().then(item => {
      chart(...item)
      //coloco os dados na funçao chart q esta a baixo
    })     
    
}, [])   

    
function chart(...item){
  // console.log(...item)
  const y = [...item]
  y.shift()
  y.pop()

 let states = y.map(docs => {
  return docs.state
})

let number = y.map( item => {
  return item.numCases
})

let deaths = y.map(item => {
  return item.death
})

//colo separado os estado, casos e numero de mortes para "construçao do grafico"


  setChartData({
    
    labels:  states,  

    datasets: [
      {
        label: 'Total',
        data: number ,
        backgroundColor: 'rgba(75, 192,198,0.6)',
        //dados para o total

      },
      {
        label: 'Death',
        data: deaths ,
        backgroundColor: '#ff0000',
        //numero de mortes
      }
    ], 
      borderWidth: 4
      //dados para o grafico
  })

}

  return (
    <div>
        <h1>Test</h1>
         <div style={{ height: "2000px", width: "1300px"  }}>
           <Bar data={chartData} options={{ responsive: true ,
           //chartData => declarei la em cima como obj
          title: {text: 'Grafic'}}} legend={{
            display:true,
            position:'top'        
          }} />
          {/* coloco os dados dentro do "Bar" que importei la em cima, coloco algumas opçoes de estilo
            para tentar fazer bonito :(*/}

      </div>

    </div>
  );
}

export default App;
