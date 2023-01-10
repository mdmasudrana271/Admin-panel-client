import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import Spinner from "../../Spinner/Spinner";

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  const { time, user, isLoading, } = useContext(AuthContext);
  const navigate = useNavigate();
  const imageHostKey = process.env.REACT_APP_IMGBB_API_KEY

  const handleAddProduct = (data) => {
    const image = data.image[0];
    const formData = new FormData()
    formData.append('image',image)
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
    fetch(url,{
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imgData =>{
      if(imgData.success){
        const product = {
          name: data.product,
          image: imgData.data.url,
          price:data.price,
          description: data.description,
          time: time,
          email: user.email,
          status: 'available'
        }

        fetch('https://admin-panel-server.vercel.app/products',{
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data =>{
          console.log(data)
          if(data.acknowledged){
            toast.success('Add Product Successfully')
            navigate('/dashboard/my-products')
            reset()
          }
        })

      }

    })

  };
    

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <section className="p-6 ">
      <h1 className="text-3xl font-bold">Add A Product</h1>
      <form
        className="mt-6 w-96 mx-auto"
        onSubmit={handleSubmit(handleAddProduct)}
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            {...register("product", { required: "Product name is required" })}
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full"
          />
          {errors.product && (
            <p role="alert" className="text-error">
              {errors.product?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            {...register("image", { required: "image is required" })}
            type="file"
            className="input input-bordered w-full"
          />
          {errors.image && (
            <p role="alert" className="text-error">
              {errors.image?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            {...register("price", { required: "Price is required" })}
            type="text"
            placeholder="$"
            className="input input-bordered w-full"
          />
          {errors.price && (
            <p role="alert" className="text-error">
              {errors.price?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description", {
              required: "description is required",
            })}
            className="textarea input-bordered"
            placeholder="Description"
          ></textarea>
          {errors.description && (
            <p role="alert" className="text-error">
              {errors.description?.message}
            </p>
          )}
        </div>
        <input
          className="btn btn-accent w-full mt-5"
          value="Add Product"
          type="submit"
        />
      </form>
    </section>
  );
};

export default AddProduct;
