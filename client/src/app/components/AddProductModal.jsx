import { useState, useEffect } from "react";
import { FiX, FiUpload, FiPlus, FiTrash2 } from "react-icons/fi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

export function AddProductModal({ open, onClose, product, refetch }) {
  const { create, error: createError } = useCreateProduct();
  const { update, error: updateError } = useUpdateProduct();

  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    description: product?.description || "",
    size: product?.size || [],
    color: product?.color || [],
    images: product?.images || [],
  });

  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        size: product.size,
        color: product.color,
        images: product.images,
      });
    } else {
      setFormData({
        name: "",
        price: 0,
        description: "",
        size: [],
        color: [],
        images: [],
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (product) {
        await update(product._id, formData);
      } else {
        await create(formData);
      }

      if (refetch) {
        await refetch();
      }

      onClose();

      setFormData({
        name: "",
        price: 0,
        description: "",
        size: [],
        color: [],
        images: [],
      });
    } catch (err) {
      console.log("Error:", err);
    }
  };

  // const addSize = () => {
  //   if (newSize && !formData.size.includes(newSize)) {
  //     setFormData({ ...formData, size: [...formData.size, newSize] });
  //     setNewSize("");
  //   }
  // };
  const addSize = () => {
    const sizes = newSize
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // setFormData({
    //   ...formData,
    //   size: [...formData.size, ...sizes],
    // });

    setFormData({
      ...formData,
      size: [...new Set([...formData.size, ...sizes])],
    });

    setNewSize("");
  };

  const removeSize = (sizeToRemove) => {
    setFormData({
      ...formData,
      size: formData.size.filter((s) => s !== sizeToRemove),
    });
  };

  // const addColor = () => {
  //   if (newColor && !formData.color.includes(newColor)) {
  //     setFormData({ ...formData, color: [...formData.color, newColor] });
  //     setNewColor("");
  //   }
  // };
  const addColor = () => {
    const colors = newColor
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    // setFormData({
    //   ...formData,
    //   color: [...formData.color, ...colors],
    // });
    setFormData({
      ...formData,
      color: [...new Set([...formData.color, ...colors])],
    });

    setNewColor("");
  };

  const removeColor = (colorToRemove) => {
    setFormData({
      ...formData,
      color: formData.color.filter((c) => c !== colorToRemove),
    });
  };

  const addImage = () => {
    if (imageUrl && !formData.images.includes(imageUrl)) {
      setFormData({ ...formData, images: [...formData.images, imageUrl] });
      setImageUrl("");
    }
  };

  const removeImage = (imageToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((i) => i !== imageToRemove),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {createError && (
        <p className="text-red-500 text-sm">
          Error: {createError.message || createError}
        </p>
      )}
      {updateError && (
        <p className="text-red-500 text-sm">
          Error: {updateError.message || updateError}
        </p>
      )}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Cotton T-Shirt"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-price">Price (₹)</Label>
            <Input
              id="product-price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              placeholder="299"
              required
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your product..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Available Sizes</Label>
            <div className="flex gap-2">
              <Input
                value={newSize}
                // onChange={(e) => setNewSize(e.target.value)}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value.includes(",")) {
                    const sizes = value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);

                    setFormData((prev) => ({
                      ...prev,
                      size: [...new Set([...prev.size, ...sizes])],
                    }));

                    setNewSize("");
                  } else {
                    setNewSize(value);
                  }
                }}
                placeholder="e.g., M, L, XL"
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSize())
                }
              />
              <Button type="button" onClick={addSize} size="sm">
                <FiPlus size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.size.map((size) => (
                <Badge key={size} variant="secondary" className="gap-1">
                  {size}
                  <button
                    type="button"
                    onClick={() => removeSize(size)}
                    className="hover:text-red-500"
                  >
                    <FiX size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Available Colors</Label>
            <div className="flex gap-2">
              <Input
                value={newColor}
                // onChange={(e) => setNewColor(e.target.value)}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value.includes(",")) {
                    const colors = value
                      .split(",")
                      .map((c) => c.trim())
                      .filter(Boolean);

                    setFormData((prev) => ({
                      ...prev,
                      color: [...new Set([...prev.color, ...colors])],
                    }));

                    setNewColor("");
                  } else {
                    setNewColor(value);
                  }
                }}
                placeholder="e.g., Red, Blue, Green"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addColor();
                  }
                }}
              />
              <Button type="button" onClick={addColor} size="sm">
                <FiPlus size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.color.map((color) => (
                <Badge key={color} variant="secondary" className="gap-1">
                  {color}
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="hover:text-red-500"
                  >
                    <FiX size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Product Images</Label>

            <div className="flex gap-2">
              <Input
                value={imageUrl}
                // onChange={(e) => setImageUrl(e.target.value)}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value.includes(",")) {
                    const images = value
                      .split(",")
                      .map((i) => i.trim())
                      .filter(Boolean);

                    setFormData((prev) => ({
                      ...prev,
                      images: [...new Set([...prev.images, ...images])],
                    }));

                    setImageUrl("");
                  } else {
                    setImageUrl(value);
                  }
                }}
                placeholder="Enter image URL"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImage();
                  }
                }}
              />

              <Button type="button" onClick={addImage} size="sm">
                <FiUpload size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(image)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            >
              {product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
