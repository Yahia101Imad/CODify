import { useState } from "react";
import { useParams } from "react-router";
import { FiShoppingBag, FiFilter, FiX } from "react-icons/fi";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { useStoreProducts } from "../hooks/useStoreProduct";
import { createOrder } from "../services/api";

export function StorePage() {
  const { username } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [filterSize, setFilterSize] = useState("all");
  const [filterColor, setFilterColor] = useState("all");

  const [orderForm, setOrderForm] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    quantity: 1,
    selectedSize: "",
    selectedColor: "",
  });

  const { products, store } = useStoreProducts(username);

  // Get all unique sizes and colors
  const allSizes = Array.from(new Set(products.flatMap((p) => p.size)));
  const allColors = Array.from(new Set(products.flatMap((p) => p.color)));

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (filterSize !== "all" && !product.size.includes(filterSize))
      return false;
    if (filterColor !== "all" && !product.color.includes(filterColor))
      return false;
    return true;
  });

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setOrderForm({
      ...orderForm,
      selectedSize: product.size[0] || "",
      selectedColor: product.color[0] || "",
    });
    setOrderModalOpen(true);
  };

  // const handleSubmitOrder = (e) => {
  //   e.preventDefault();
  //   // In production, this would submit to backend
  //   toast.success(
  //     "Order placed successfully! The seller will contact you soon.",
  //     {
  //       description: `Order for ${selectedProduct?.name} - ₹${selectedProduct?.price * orderForm.quantity}`,
  //     },
  //   );
  //   setOrderModalOpen(false);
  //   setOrderForm({
  //     customerName: "",
  //     customerPhone: "",
  //     customerAddress: "",
  //     quantity: 1,
  //     selectedSize: "",
  //     selectedColor: "",
  //   });
  // };

  const handleSubmitOrder = async (e) => {
  e.preventDefault();

  try {
    const orderData = {
      productId: selectedProduct._id,
      sellerId: selectedProduct.sellerId,

      customerName: orderForm.customerName,
      customerPhone: orderForm.customerPhone,
      customerAddress: orderForm.customerAddress,

      quantity: orderForm.quantity,
      size: orderForm.selectedSize,
      color: orderForm.selectedColor,

      totalPrice: selectedProduct.price * orderForm.quantity,
    };

    await createOrder(orderData);

    toast.success("Order placed successfully!");

    setOrderModalOpen(false);
    setOrderForm({
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      quantity: 1,
      selectedSize: "",
      selectedColor: "",
    });
  } catch (error) {
    toast.error("Failed to place order");
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <div className="relative h-64 bg-gradient-to-r from-violet-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={store?.profileImage}
            alt="Store banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <FiShoppingBag className="text-violet-600" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{store?.storeName}</h1>
                <p className="text-violet-100">@{store?.username}</p>
              </div>
            </div>
            {/* <p className="text-lg text-violet-100">{store?.description}</p> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="p-4 mb-6 rounded-xl">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <FiFilter size={20} className="text-gray-600" />
              <span className="font-medium">Filters:</span>
            </div>

            <div className="flex flex-wrap gap-3 flex-1">
              <Select value={filterSize} onValueChange={setFilterSize}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  {allSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterColor} onValueChange={setFilterColor}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colors</SelectItem>
                  {allColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(filterSize || filterColor) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFilterSize("");
                    setFilterColor("");
                  }}
                >
                  <FiX size={16} className="mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>

            <div className="text-sm text-gray-600">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              className="rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleOrderClick(product)}
            >
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button className="w-full bg-white text-violet-600 hover:bg-gray-100">
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {product?.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product?.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-violet-600">
                    ₹{product?.price}
                  </span>
                  <Badge className="bg-green-100 text-green-700">
                    COD Available
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Sizes:</span>
                    <div className="flex flex-wrap gap-1">
                      {product?.size.map((size) => (
                        <Badge
                          key={size}
                          variant="secondary"
                          className="text-xs"
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Colors:</span>
                    <div className="flex flex-wrap gap-1">
                      {product?.color.map((color) => (
                        <Badge
                          key={color}
                          variant="secondary"
                          className="text-xs"
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="rounded-xl p-12 text-center">
            <FiShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </Card>
        )}
      </div>

      {/* Order Modal */}
      <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Place Order - {selectedProduct?.name}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitOrder} className="space-y-4 mt-4">
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={selectedProduct?.images[0]}
                alt={selectedProduct?.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-semibold">{selectedProduct?.name}</h4>
                <p className="text-2xl font-bold text-violet-600">
                  ₹{selectedProduct?.price}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={orderForm.customerName}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, customerName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={orderForm.customerPhone}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, customerPhone: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                value={orderForm.customerAddress}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    customerAddress: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select
                  value={orderForm.selectedSize}
                  onValueChange={(value) =>
                    setOrderForm({ ...orderForm, selectedSize: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProduct?.size.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select
                  value={orderForm.selectedColor}
                  onValueChange={(value) =>
                    setOrderForm({ ...orderForm, selectedColor: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProduct?.color.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={orderForm.quantity}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    quantity: Number(e.target.value),
                  })
                }
                required
              />
            </div>

            <div className="bg-violet-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">
                  ₹{selectedProduct?.price * orderForm.quantity}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Payment Method:</span>
                <Badge className="bg-green-100 text-green-700">
                  Cash on Delivery
                </Badge>
              </div>
              <div className="border-t border-violet-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-violet-600">
                    ₹{selectedProduct?.price * orderForm.quantity}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOrderModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              >
                Place Order
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
