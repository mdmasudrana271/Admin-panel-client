import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

const ProductCard = ({ product }) => {
  console.log(product);

  const {user} = useContext(AuthContext)

  const { name, description, price, image, status } = product;


  const handleOrder = ()=>{
    const order = {
        product_name: name,
        price: price,
        image: image,
        buyer_name: user.displayName,
        email: user.email
    }
    fetch('https://admin-panel-server.vercel.app/orders',{
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data =>{
          console.log(data)
          if(data.acknowledged){
            toast.success('Add Product Successfully')
            
          }
        })
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Dress" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="flex justify-between items-center">
        <p className="text-orange-400 font-bold">{price}</p>
        <p>{status}</p>
        </div>
        <div className="card-actions justify-end">
          <button onClick={handleOrder} class="relative px-5 py-2 font-medium text-white group">
            <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
            <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
            <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
            <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
            <span class="relative">Order Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
