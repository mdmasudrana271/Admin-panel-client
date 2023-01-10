import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import { AuthContext } from "../../../context/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["report-product"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products?email=${user.email}`
      );
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <section className="h-[100vh]">
      {products?.length === 0 ? (
        <p className="text-3xl mt-10 font-bold text-center">
          You have no products
        </p>
      ) : (
        <>
          <h2 className="text-3xl font-bold">My Products</h2>
          <div className="my-5">
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div>
                          <div className="font-bold">{product.name}</div>
                        </div>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.status}</td>
                      <td><Link to={`/my-products/${product._id}`}>Edit</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MyProducts;
