import {NavigationServices} from "../api/NavigationService";

export const goToProductDetails = (product_id) => {
    NavigationServices.navigate("ProductDetails", {product_id: product_id})
};

export const goToSearchProductDetails = (product_id) => {
    NavigationServices.navigate("SearchProductDetails", {product_id: product_id})
};