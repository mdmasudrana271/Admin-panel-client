import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const EditProduct = () => {
    const {register,formState: { errors }, handleSubmit, } = useForm();
    const { user, isLoading, } = useContext(AuthContext);

    const product = useLoaderData();
    console.log(product._id)

const handleEditProduct =(data)=>{
    const product = {
        price: data.price,
      };
  
      fetch(`http://localhost:5000/edit-product/${product._id}`, {
        method: "PATCH",
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then(data => {
          console.log(data)
        //   if (data.acknowledged) {
        //     toast.success("Add Product Successfully");
        //     // navigate("/dashboard/my-products");
        //   }
        });
    
}

  return (
    <div>
      <section className="p-6 ">
        <h1 className="text-3xl font-bold">Add A Product</h1>
        <form
          className="mt-6 w-96 mx-auto"
          onSubmit={handleSubmit(handleEditProduct)}
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
              value={product.name}
            />
            {errors.product && (
              <p role="alert" className="text-error">
                {errors.product?.message}
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
            //   value={product.price}
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
              value={product.description}
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
    </div>
  );
};

export default EditProduct;
