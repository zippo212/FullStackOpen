import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  function debounce(func, timeout = 500){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  
  const handleChange = debounce((e) => dispatch(setFilter(e.target.value)))

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter