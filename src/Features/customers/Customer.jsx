import { useSelector } from "react-redux";

function Customer() {
  const customer=useSelector((store) => store.customer)   //customer store banate time banay he account and customer ka alag alag wahi he ye
  console.log(customer)
  return <h2>👋 Welcome, {customer.fullName}</h2>;
}

export default Customer;
