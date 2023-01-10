import React from "react";
import { Link } from "react-router-dom";

const OrdersRow = ({product}) => {
  return (
    <tr>
      <td>
      {product.product}
      </td>
      <td>{product.price}</td>
      <td>{product.location}</td>
      <th>
       {
        product.paid === true ? 'Paid' :  <Link to={`/dashboard/payment/${product._id}`}><button className="btn btn-warning btn-xs">Pay</button></Link>
       }
      </th>
    </tr>
  );
};

export default OrdersRow;
