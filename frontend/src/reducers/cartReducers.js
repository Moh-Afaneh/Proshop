export const HandleCart = (state = { cart: [] }, action) => {
  const product = action?.payload?.product;
  const qty = +action?.payload?.qty;

  switch (action.type) {
    case "ADDITEM":
      const exist = state.find((x) => x?._id === product?._id);
      if (exist) {
        return state.map((x) =>
          x?._id === product?._id ? { ...x, qty: qty ? qty + x.qty : 1 } : x
        );
      } else {
        const product = action?.payload?.product;
        const qty = +action?.payload?.qty;

        return [
          ...state,
          {
            ...product,
            qty,
          },
        ];
      }
    case "UPATEITEM":
      const Update = state.find((x) => x?._id === product?._id);
      if (Update) {
        return state.map((x) =>
          x?._id === product?._id ? { ...x, qty: qty ? qty : qty + 1 } : x
        );
      } else {
        const product = action?.payload?.product;
        const qty = +action?.payload?.qty;

        return [
          ...state,
          {
            ...product,
            qty,
          },
        ];
      }

    case "DELITEM":
      const existDel = state.find((x) => x?._id === product?._id);
      if (existDel.qty === 1) {
        return state.filter((x) => x?._id !== existDel?._id);
      } else {
        return state.map((x) =>
          x._id === product?._id ? { ...x, qty: x.qty - 1 } : x
        );
      }
    case "RESETITEM":
      return { cart: [] };

    default:
      return state;
  }
};
