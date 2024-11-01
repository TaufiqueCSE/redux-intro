const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payLoad.fullname,
        nationalID: action.payLoad.nationalID,
        createdAt: action.payLoad.createdAt,
      };
    case "account/updateName":
      return { ...state, fullName: action.payLoad };
    default:
        return state
  }
}

export function createCustomer(fullname, nationalID) {
  return {
    type: "customer/createCustomer",
    payLoad: { fullname, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullname) {
  return { type: "account/updateName", payLoad: fullname };
}

// store.dispatch(createCustomer("Md taufique", "42143"));
// console.log(store.getState());
