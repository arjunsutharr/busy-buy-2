import tableStyles from "./OrderTable.module.css";

function OrderTable(props) {
  const { order } = props;

  return (
    <div className={tableStyles.container}>
      <div className={tableStyles.orderDate}>{order.createdOn}</div>
      <table className={tableStyles.table}>
        <thead className={tableStyles.thead}>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className={tableStyles.totalAmount}></td>
            <td className={tableStyles.totalAmount}>{order.totalAmount}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default OrderTable;
