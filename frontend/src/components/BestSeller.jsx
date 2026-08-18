import react from 'react'
import { Link } from 'react-router'

const product=[
    {
        "Images": [],
        "_id": "6a74c568bb2a047989626761",
        "name": "Iphone 17pro",
        "description": "the latest and fastesr iphone",
        "price": 130000,
        "category": "smart phone",
        "stock": 1,
        "images": [],
        "isAvailable": true,
        "createdAt": "2026-08-06T17:33:28.752Z",
        "updatedAt": "2026-08-06T17:33:28.752Z",
        "__v": 0
    },
    {
        "Images": [],
        "_id": "6a74c5b0bb2a047989626762",
        "name": "Apple MacBook Air",
        "description": "the new macbook air with m3 chip",
        "price": 110000,
        "category": "laptop",
        "stock": 1,
        "images": [],
        "isAvailable": true,
        "createdAt": "2026-08-06T17:34:40.545Z",
        "updatedAt": "2026-08-06T17:34:40.545Z",
        "__v": 0
    },
    {
        "Images": [],
        "_id": "6a74c5ffbb2a047989626763",
        "name": "Machenical Keyboard",
        "description": "feel the new way of typing experience",
        "price": 5500,
        "category": "Keyboard",
        "stock": 1,
        "images": [],
        "isAvailable": true,
        "createdAt": "2026-08-06T17:35:59.113Z",
        "updatedAt": "2026-08-06T17:35:59.113Z",
        "__v": 0
    },
    {
        "Images": [],
        "_id": "6a79633a76a98f09a9703e41",
        "name": "Chair",
        "description": "A comfortable chair for your long day productivity",
        "price": 10000,
        "category": "Furniture",
        "stock": 1,
        "images": [],
        "isAvailable": true,
        "createdAt": "2026-08-10T05:35:54.368Z",
        "updatedAt": "2026-08-10T05:35:54.368Z",
        "__v": 0
    }
]





const BestSeller=()=>{
    return (
        <div className='h-5 w-full'>
            <h1 className='text-3xl bold text-center'>Recommendation</h1>
            <div className='gap-4 flex justify-evenly items-center'>
            {product.map((prod)=>{
                return <Link to={`/product/${prod._id}`}
                    className='flex justify-center items-center'
                >
                    <div className='flex justify-center items-center flex-col gap-3 h-auto w-max border rounded-4xl p-4'>
                        <img src={prod.Images[0]} alt="" />
                        <h2 className='text-2xl bold'>{prod.name}</h2>
                        <p className='text-pink-800'>{prod.description}</p>
                        <div className='flex justify-evenly items-center w-50 '>Rs.{prod.price} 
                            <button className='border p-2 rounded-2xl text-blue-600'>Add to Cart</button>
                        </div>
                    </div>
                </Link>
            })}
        </div>
        </div>

    )
}

export default BestSeller