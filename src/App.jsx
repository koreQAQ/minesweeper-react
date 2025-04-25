import './App.css'

function Board({width,height}) {
  const buttons = Array(width).fill(Array(height).fill('X'))
  function handleClick(r1,c1){
    console.log(`${r1} - ${c1}`)
  }
  return (
    buttons.map(
      (row,r1) => { const data = row.map((value,c1) => {
      return (
        <button onClick={() => handleClick(r1+1,c1+1)} className="box"> {r1} {c1} </button>
      )
    })
    return (
      <div key={r1}> {data} </div>
    )
  }))
}

function App() {
  return (
    <Board width={10} height={10} />
  )
}



export default App
