import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  url?: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="font-display text-xl font-semibold mb-4 text-foreground">
        Recommended For You
      </h3>
      
      <div className="overflow-x-auto luxury-scroll pb-4">
        <div className="flex gap-4 min-w-max">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;