
import {Routes, Route} from 'react-router'
import ProductSection from './components/ProductSection.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import HomePage from './components/HomePage.jsx'
import SingleProduct from './components/SingleProduct.jsx';
import Layout from './components/Layout.jsx';
import MenDamins from './components/MenDamins.jsx';
// import BestSeller from './components/BestSeller.jsx'



function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="All" element={<ProductSection />} />
      <Route path="products/id:" element={<SingleProduct />} />
      <Route path="Login" element={<Login />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="Collection" element={<Layout />}>
        <Route path="Men-collection" element={<MenDamins />} />
      </Route>
     </Routes>
    {/* <BestSeller /> */}

    
    </>
  )
}

export default App