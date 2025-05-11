export interface ProductData {
    id?: string | undefined;
    title: string | undefined;
    ratings: string | undefined;
    price: string | undefined;
    description: string | undefined;
    fabriCare: string | undefined;
    fabricare?: string | undefined;
    product_image: string | undefined;
}

export interface UserInfo {
    id?: string;
    username: string;
    email?: string;
    password: string;
}

export interface ProductSizeInfo {
    id?: string;
    shortName: string;
    fullName: string;
    productId: string;
    short_name?: string;
    full_name?: string;
    product_lists_id?: string;
}

export interface ProductColorInfo {
    id: string;
    color: string;
    hexCode: string;
    hexcode: string;
    productId: string;
    product_lists_id: string;
}

export interface ProductDbInfo {
    id: string;
    title: string;
    ratings: number;
    product_image: string;
    description: string;
    fabricare: string;
    price?: number;
}

export interface ProductSizeDbInfo {
    id: string;
    short_name: string;
    full_name: string;
}

export interface ProductColorDbInfo {
    id: string;
    color: string;
    hexcode: string;
}

export interface EcommerceSevicesType {
    getProductToEdit: (id: any) => any;
    getAllProducts: () => any;
    createProducts: (productData: ProductData) => any;
    registerCustomers: (userInfo: UserInfo) => any;
    isLogin: (userInfo: UserInfo) => any;
    createProductSize: (productSizeInfo: ProductSizeInfo) => any;
    getProductSizes: () => any;
    getProductSizeToEdit: (productId: string) => any;
    createProductcolor: (productcolorinfo: ProductColorInfo) => any;
    getProductColors: () => any;
    getProductColorToEdit: (productId: string) => any;
    getProductById: (productId: string) => any;
    editProduct: (productId: string, productData: ProductData) => any;
    deleteProduct: (productId: string) => any;
    editProductColor: (productData: ProductColorInfo) => any;
    deleteProductColor: (productId: string) => any;
    editProductSize: (productSizeData: ProductSizeInfo) => any;
    deleteProductSize: (productSizeId: string) => any;
    getRelatedProducts: (productId: string) => any;
}