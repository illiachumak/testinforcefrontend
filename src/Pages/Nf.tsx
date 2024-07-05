import '../scss/Cart.scss'
import {Link} from 'react-router-dom'
function NotFound() {

  return (
    <div className="cart-empty">
    
        <h1>🙃</h1>
        <h3>You`ve lost buddy<br />
       Comeback to  <Link to='/' style={{textDecoration: 'underline'}}>home</Link>😉
        </h3>
       
    </div>
  );
}

export default NotFound;
