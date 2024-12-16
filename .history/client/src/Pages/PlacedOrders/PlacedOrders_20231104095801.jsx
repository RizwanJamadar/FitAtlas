import React, { useEffect, useState } from "react";
import "./placedorders.css"; // Create a CSS file for styling
import axios from "axios";
// import data from '../../../../product';

// const data = [
//   {
//     userId: "653211f07f288f0eda696abf",
//     orders: [
//       {
//         order_date: "2023-10-15T14:30:00Z",
//         items: [
//           {
//             productName: "Pump Daddy V2",
//             img: "https://rysesupps.com/cdn/shop/files/pbo_new_br_1_500x.png?v=1694793315",
//             flavour: "Blue Raspberry",
//             price: 5000,
//             quantity: 1,
//             weight: "500gm",
//           },
//           {
//             productName: "MuscleBlaze Raw Whey Isolate",
//             img: "https://img1.hkrtcdn.com/27490/prd_2748910-MuscleBlaze-Raw-Whey-Isolate-1.1-lb-Unflavoured_o.jpg",
//             flavour: "Unflavoured",
//             price: 699,
//             quantity: 1,
//             weight: "500gm",
//           },
//         ],
//         totalPrice: 5699,
//         status: "Placed",
//       },
//     ],
//   },
//   {
//     userId: "653211f07f288f0eda696abf",
//     orders: [
//       {
//         order_date: "2023-10-15T14:30:00Z",
//         items: [
//           {
//             productName: "MuscleBlaze Raw Whey Isolate",
//             img: "https://img1.hkrtcdn.com/27490/prd_2748910-MuscleBlaze-Raw-Whey-Isolate-1.1-lb-Unflavoured_o.jpg",
//             flavour: "Unflavoured",
//             price: 699,
//             quantity: 1,
//             weight: "500gm",
//           },
//         ],
//         totalPrice: 5699,
//       },
//     ],
//   },
// ];

const PlacedOrders = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const authToken = user.token;
  
        const headers = {
          Authorization: `${authToken}`, // Use 'Bearer' if it's a token-based authentication
          "Content-Type": "application/json", // Set the content type according to your API requirements
        };
  
        const res = await axios.get(
          `http://localhost:8800/api/orders/allOrders/`,
          { headers }
        );
        console.log(res);
        setData(res.data)
      } catch (err) {
        setError(err);
      }
    }
    fetchData();
  }, [])
  

  return (
    <div className="admin-orders">
      <table className="order-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Order Date</th>
            <th>Product Img</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) =>
            user.orders.map((order, orderIndex) => (
              <tr key={`order-${index}-${orderIndex}`}>
                <td >{user.userId}</td>
                <td >{order.order_date.slice(0,10)}</td>
                <td><img src={order.items[0].img}/></td>
                <td>{order.items[0].productName}</td>
                <td>{order.items[0].price}</td>
                <td>{order.items[0].quantity}</td>
                <td >{order.totalPrice}</td>
                <td style={{cursor:"pointer"}}>{order.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlacedOrders;
