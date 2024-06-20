export const API_NOTIFICATION_MESSAGES = {
  responseFailure: {
    title: "Error!",
    message:
      "An error occur while fetching response from server. Please try again",
  },
  networkError: {
    title: "Error!",
    message:
      "Unable to connect to the server. Please check internet connectivity and try again.",
  },
};


export const service_urls = {
    userLogin:{url:'/login',method:"POST"},
    userSignup:{url:'/signup',method:"POST"},
    userLogout:{url:'/logout',method:"POST"},
    getAllProducts : {url:'/getall',method:"GET"},
    getProductsByCategory: {url:'/getcategory',method:"GET",query:true},
    getProductsById: {url:'/getprod',method:"GET",query:true},
    addProductToCart: {url:'/addtocart',method:'POST'},
    getCartItems:{url:'/getcart',method:"GET"},
    udpateCartItems:{url:'/update',method:"POST"},
    deleteCartItems:{url:'/delete',method:"DELETE",query:true},
    purchaseProduct:{url:'/purchase',method:"POST"},
    getPurchaseHistory:{url:'/purchasehistory',method:"GET"},
}