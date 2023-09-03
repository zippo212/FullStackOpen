
const PersonForm = ({formCallback,nameInput,numberInput}) => {
  return (
    <form onSubmit={formCallback}>
      <div>
        <div>{nameInput.name} <input value={nameInput.value} onChange={nameInput.callback}/></div>
        <div>{numberInput.name} <input value={numberInput.value} onChange={numberInput.callback}/></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm