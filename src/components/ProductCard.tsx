import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  url?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex-shrink-0 w-64">
      <div className="aspect-[4/3] mb-4 overflow-hidden rounded-md bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="space-y-3">
        <h3 className="font-body font-semibold text-card-foreground line-clamp-2 leading-tight">
          {product.title}
        </h3>
        
        <p className="text-lg font-medium text-accent">
          {product.price}
        </p>
        
        <Button 
          variant="luxury" 
          className="w-full"
          onClick={() => {
            if (product.url) {
              window.open(product.url, '_blank');
            }
          }}
        >
          View Product
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;