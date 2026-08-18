import react from 'react'
import {useEffect, useState}from 'react'
import {useParams} from 'react-router'
 const SingleProduct=()=>{

    const[product,setProduct] = useState({});
    const {id}= useParams;
    useEffect(()=>{
        async function getProduct(){
            const response= await fetch(`http://localhost:3000/products/${id}`);
            const data=await response.json();

            if(!response.ok){
                console.log("error occured");
            }

            setProduct(data.product[0]);
        }
        getProduct();
        console.log(product);
    },[])
    
    return(
        <>
        <div>SingleProduct</div>
        
        </>
    )
}

export default SingleProduct