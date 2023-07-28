import { useNavigate } from "react-router-dom"
const Unauthorized = () => {
    const navigate = useNavigate();

    // navigate(-1) means back to the location you are from 
    const goBack = () => navigate(-1);
  return (
    <div>
      <h1>Unauthorized</h1>
      <button onClick={goBack}>Go Back</button>
    </div>
  )
}

export default Unauthorized
