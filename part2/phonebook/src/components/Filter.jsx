
const Filter = ({value, callback}) => {
  return (
    <div>
      Filter by: <input type="text" value={value} onChange={callback}/>
    </div>
  )
}

export default Filter