export interface ProductResponseData {
    id: string;
    title: string;
    description: string;
    fabricare: string;
    product_image: string;
    ratings: number;
    price: number;
}

export interface ProductSizeResponseData {
    id: string;
    full_name: string;
    short_name: string;
    product_lists_id?: string;
}

export interface ProductColorResponseData {
    id: string;
    color: string;
    hexcode: string;
    product_lists_id?: string;
}

export interface ProductDataDto {
    title: string;
    ratings: string;
    price: string;
    // productColour: string;
    // productSize: string;
    description: string;
    fabricare: string;
    //imageData: any;
  }

export interface ProdudctColorDto {
    color: string;
    hexCode?: string;
    hexcode?: string;
    productId: string;
}

export interface ProductSizeDto {
    shortName: string;
    fullName: string;
    productId: string;
} 

export interface ProductSizeDto {
    shortName: string;
    fullName: string;
    productId: string;
} 