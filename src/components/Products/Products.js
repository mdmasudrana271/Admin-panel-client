import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetch('https://admin-panel-server.vercel.app/all-products')
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            setProducts(data)
        })
    },[])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-10'>
            {
                products.map(product=> <ProductCard key={product._id} product={product}></ProductCard>)
            }
        </div>
    );
};

export default Products;