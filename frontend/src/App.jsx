
import {Routes, Route} from 'react-router'
import ProductSection from './components/ProductSection.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import HomePage from './components/HomePage.jsx'
import SingleProduct from './components/SingleProduct.jsx'



function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="All" element={<ProductSection />} />
      <Route path="product" element={<SingleProduct />} />
      <Route path="Login" element={<Login />} />
      <Route path="Signup" element={<Signup />} />
     </Routes>
    
    </>
  )
}

export default App