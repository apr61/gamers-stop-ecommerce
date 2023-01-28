import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import './productPage.css'
import { useLocation } from 'react-router-dom'

//data
import { products } from '../../data/productsData'

function ProductPage() {
  // getting state
  const location = useLocation()
  const productId = location.state?.productId
  // filtering products based on product id
  const filteredProduct = products.filter(product => product.id === productId)[0]
  return (
    <>
      <Navbar />
      <div className="main">
        <h2>Product Page</h2>
        <p>{filteredProduct.name}</p>
      </div>
      <Footer />
    </>
  )
}

export default ProductPage