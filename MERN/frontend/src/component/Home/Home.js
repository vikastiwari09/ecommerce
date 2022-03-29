import React, { Fragment,useEffect } from 'react'
import { CgMouse } from 'react-icons/cg';
import './Home.css'
import Product from './ProductCard.js'
import MetaData from '../layout/MetaData';
import {clearErrors, getProduct} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loading from '../layout/loader/loader'
import {useAlert} from 'react-alert'

const Home = () => {

  const alert=useAlert();
  const dispatch = useDispatch();
  const {loading,error,products} = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  return (
    <Fragment>
    {loading ? (
      <Loading />
      ) : (
      <Fragment>
      <MetaData title="ECOMMERCE" />

      <div className='banner'>
          <p>WELCOME TO ECOMMERCE</p>
          <h1>FIND AMAZING PRODUCT BELOW</h1>

          <a href='#container'>
              <button>
                Scroll <CgMouse />
              </button>
          </a>
      </div>

    <h2 className='homeHeading'>FEATURED PRODUCT</h2>

    <div className='container' id='container'>
      
      {products && products.map((product) => <Product product={product}/>)}
      
    </div>
    </Fragment>
    )}
    </Fragment>
  );
}

export default Home;