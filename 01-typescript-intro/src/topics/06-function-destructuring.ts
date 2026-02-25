interface Product{
    description: string;
    price: number;
    
}

const phone: Product = {
    description: 'Nokia A1',
    price: 150.0
}

const{ description: phoneDescription, price: phonePrice} = phone;


const tablet: Product = {
    description: 'iPad Air',
    price: 250.0
}

const{ description: tabletDescription, price: tabletPrice} = tablet;

interface TaxCalculationOptions{
    tax: number;
    products: Product[];    
}



const shoppingCart = [phone, tablet];
const tax = 0.15;

const options:TaxCalculationOptions = {
    products: shoppingCart,
    tax: tax
}


const{products,tax:taxes} = options;

function taxCalculation(options:TaxCalculationOptions):number[]{
    let total = 0;
    options.products.forEach(product =>{
        total += product.price;
    });
    return [total, total * options.tax];
}

const result = taxCalculation(options);
console.log('Total: ', result[0]);
console.log('Tax: ', result[1]);
export{}