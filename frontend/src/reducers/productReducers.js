export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case "PRODUCT_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_DETAILS_SUCCESS":
      return { loading: false, product: action.payload };
    case "PRODUCT_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDeleteReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_DELETE_REQUEST":
      return { loading: true };
    case "PRODUCT_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "PRODUCT_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productCreateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REQUEST":
      return { loading: true };
    case "PRODUCT_CREATE_SUCCESS":
      return { loading: false, success: true, product: action.payload };
    case "PRODUCT_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "PRODUCT_CREATE_RESET":
      return { product: {} };
    default:
      return state;
  }
};
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_UPDATE_REQUEST":
      return { loading: true };
    case "PRODUCT_UPDATE_SUCCESS":
      return { loading: false, success: true, product: action.payload };
    case "PRODUCT_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "PRODUCT_UPDATE_RESET":
      return { product: {} };
    default:
      return state;
  }
};
export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_REVIEW_CREATE_REQUEST":
      return { loading: true };
    case "PRODUCT_REVIEW_CREATE_SUCCESS":
      return { loading: false, success: true };
    case "PRODUCT_REVIEW_CREATE_FAIL":
      return { loading: false, Error: action.payload };
    case "PRODUCT_REVIEW_CREATE_RESET":
      return {};
    default:
      return state;
  }
};
export const topProductsRated = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_TOP_RATED_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_TOP_RATED_SUCCESS":
      return { loading: false, products: action.payload };
    case "PRODUCT_TOP_RATED_FAIL":
      return { loading: false, Error: action.payload };
    default:
      return state;
  }
};
