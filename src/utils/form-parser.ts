import formidable, { Fields } from "formidable";
import path from "path";
import { ProductData } from "../ecommerce.types";

export async function parsedProductsForm(req): Promise<ProductData | { errorMessege?: string }> {
  
  let imageFileName = "";
  let productData = {} as ProductData;

    const form = formidable({
            multiples: false,
            uploadDir: path.resolve(__dirname, "../../static"),
            keepExtensions: true
    });

    // console.log("req", req);

      return new Promise((resolve, reject) => {
          form.parse(req, async (err, fields: Fields, files) => {
              if (err) {
                  console.log(err);
                  return resolve({ errorMessege: err.messege})
              } 
    
              files.files?.forEach(eachObj => {
                imageFileName = eachObj.newFilename;
              })

              console.log("files", files, "fields", fields, "imageFileName", imageFileName);
    
              productData = {
                title: fields.title?.toString(),
                ratings: fields.ratings?.toString(),
                price: fields.price?.toString(),
                description: fields.description?.toString(),
                fabricare: fields?.fabricare?.toString(),
                product_image: imageFileName,
              } as ProductData;

              console.log("2.product Data:", productData);

              if (!productData.title) {
                return reject({ errorMessege: "failed to parse the data: title is missing" });
              
              }
              return resolve(productData); 
      });
  })
}


    // if (!productData.title) {
    //   return { errorMesseege: "failed to parse form data" };
    // }
    // console.log("3.product data:", productData);
    // return productData;
