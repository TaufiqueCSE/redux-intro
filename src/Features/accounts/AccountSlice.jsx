const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading:false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state,isLoading:false, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return {...state,isLoading:true}
    default:
      return state;
  }
}
 

//yahan me api se conversion kr raha hu frankfurter.app pe mil jayega documentraion
export function deposit(amount, currency) {
  return async (dispatch) => {
    if (currency === "USD") {
      dispatch({ type: "account/deposit", payload: amount });
      return;
    }

    try {
      dispatch({type:"account/convertingCurrency"})
      const response = await fetch(`https://api.frankfurter.app/latest?base=${currency}&symbols=USD`);
      const data = await response.json();
      const convertedAmount = Number((amount * data.rates["USD"]).toFixed(2));
      console.log(convertedAmount)
      dispatch({ type: "account/deposit", payload: convertedAmount });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
}



export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
