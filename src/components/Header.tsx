
import '../scss/Header.scss';
import logoImg from '../assets/logo.png'
import cartImg from '../assets/cart.svg'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const Header = () => {

    const {totalPrice, cartList} = useAppSelector(state => state.productList)
    console.log(totalPrice)

    return(
        <div className="header-container">
            <div className="logo-block">
                <Link to='/'>
                <img className="logo" alt='logo img' src={logoImg}></img></Link>
                <div className="logo-text-container">
                <Link to='/'><span>REACT SHOP</span></Link>
                    <span className='pizza-text'>The best products are here</span>
                </div>
            </div>

            <Link to='/cart' className="cart">
                <div className="cart-price">{totalPrice}$</div>
                <div className="cart-btn">
                    <img className='cart-img' src={cartImg} alt='cart'></img>
                    <div>{cartList.length}</div>
                </div>
            </Link>
        </div>
    );
}

export default Header;
