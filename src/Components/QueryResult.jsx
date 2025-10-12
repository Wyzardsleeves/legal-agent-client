const QueryResult = props => {
  const {query, result} = props.answer
  console.log(props.answer)
  return(
    <div className="card-panel blue darken-3 col s12">
      {result && 
        <>
          <h5><b><i>Q:</i></b> {query}</h5>
          <p><b><i>A:</i> </b>{result}</p>
        </>
      }
    </div>
  )
}

export default QueryResult;