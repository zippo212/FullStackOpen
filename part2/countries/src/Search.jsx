
const Search = ({value, handleInput}) => {
  return (
    <div>
      <label htmlFor="search">Find countries </label>
      <input id="search" type="text" value={value} onChange={handleInput}/>
    </div>
  )
}

export default Search