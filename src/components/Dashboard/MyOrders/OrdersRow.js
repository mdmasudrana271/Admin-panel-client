import React from "react";
import { Link } from "react-router-dom";

const OrdersRow = ({ product }) => {
  return (
    <tr>
      <td></td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={product.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{product.product_name}</div>
          </div>
        </div>
      </td>
      <td>{product.price}</td>
      <td>{product.email}</td>
    </tr>
  );
};

export default OrdersRow;
