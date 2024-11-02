import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading=false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    //yaha amount and purpose two payload he isliye prepare krna pada call
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += Number(action.payload.amount);
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state){
      state.isLoading=true
    }
  },
});

export function deposit(amount, currency) {
  return async (dispatch) => {
    if (currency === "USD") {
      dispatch({ type: "account/deposit", payload: amount });
      return;
    }

    try {
      dispatch({ type: "account/convertingCurrency" });
      const response = await fetch(
        `https://api.frankfurter.app/latest?base=${currency}&symbols=USD`
      );
      const data = await response.json();
      const convertedAmount = Number((amount * data.rates["USD"]).toFixed(2));
      console.log(convertedAmount);
      dispatch({ type: "account/deposit", payload: convertedAmount });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
}

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
