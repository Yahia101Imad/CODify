import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  FiPackage,
  FiShoppingCart,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiTrendingUp,
  FiAlertCircle,
  FiExternalLink
} from "react-icons/fi";
// import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { AddProductModal } from '../components/AddProductModal';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useUser } from "../hooks/useUser";
import {jwtDecode} from "jwt-decode";
import { useProductsBySeller } from "../hooks/useProductsBySeller";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

export function Dashboard() {
const navigate = useNavigate();
// const { products, orders, deleteProduct, updateOrder } = useApp();
const [activeTab, setActiveTab] = useState('products');
const [isAddProductOpen, setIsAddProductOpen] = useState(false);
const [editingProduct, setEditingProduct] = useState(null);

// decoded the token id 
const token = localStorage.getItem("token");
const decoded = jwtDecode(token);

const userId = decoded.id;

// fetching data from hooks
const { user } = useUser(userId);
const { products, refetch } = useProductsBySeller(userId);
const { remove } = useDeleteProduct();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/auth");
    return;
  }
}, []);

  // if (!user) return null;

  useEffect(() => {
  console.log(products);
}, [products]);

// console.log(decoded);

  const stats = {
    totalProducts: products.length,
    // totalOrders: orders.length,
    // pendingOrders: orders.filter(o => o.status === 'pending').length,
    // revenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddProductOpen(false);
    setEditingProduct(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.username}!</h1>
          <p className="text-gray-600">Manage your store and track your performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-xl border-2 hover:border-violet-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Products</p>
                  <p className="text-3xl font-bold">{stats.totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <FiPackage className="text-violet-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-2 hover:border-indigo-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <FiShoppingCart className="text-indigo-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-2 hover:border-yellow-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
                  <p className="text-3xl font-bold">{stats.pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <FiAlertCircle className="text-yellow-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-2 hover:border-green-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold">₹{stats.revenue}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FiTrendingUp className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeTab === 'products' ? 'default' : 'outline'}
            onClick={() => setActiveTab('products')}
            className={activeTab === 'products' ? 'bg-gradient-to-r from-violet-600 to-indigo-600' : ''}
          >
            <FiPackage size={16} className="mr-2" />
            Products
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            onClick={() => setActiveTab('orders')}
            className={activeTab === 'orders' ? 'bg-gradient-to-r from-violet-600 to-indigo-600' : ''}
          >
            <FiShoppingCart size={16} className="mr-2" />
            Orders
            {stats.pendingOrders > 0 && (
              <Badge className="ml-2 bg-red-500">{stats.pendingOrders}</Badge>
            )}
          </Button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Products</h2>
              <Button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              >
                <FiPlus size={16} className="mr-2" />
                Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-violet-600">₹{product.price}</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-1">Sizes</p>
                        <div className="flex flex-wrap gap-1">
                          {product.size.slice(0, 3).map((size) => (
                            <Badge key={size} variant="secondary" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                          {product.size.length > 3 && (
                            <Badge variant="secondary" className="text-xs">+{product.size.length - 3}</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-1">Colors</p>
                        <div className="flex flex-wrap gap-1">
                          {product.color.slice(0, 2).map((color) => (
                            <Badge key={color} variant="secondary" className="text-xs">
                              {color}
                            </Badge>
                          ))}
                          {product.color.length > 2 && (
                            <Badge variant="secondary" className="text-xs">+{product.color.length - 2}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEditProduct(product)}
                      >
                        <FiEdit size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-red-600 hover:bg-red-50"
                        onClick={async () => {
  await remove(product._id);
  refetch();
}}
                      >
                        <FiTrash2 size={14} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {products.length === 0 && (
              <Card className="rounded-xl p-12 text-center">
                <FiPackage size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products yet</h3>
                <p className="text-gray-600 mb-4">Start by adding your first product</p>
                <Button
                  onClick={() => setIsAddProductOpen(true)}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600"
                >
                  <FiPlus size={16} className="mr-2" />
                  Add Your First Product
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Orders</h2>
              <a href={`/store/${user?.username}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <FiExternalLink size={16} className="mr-2" />
                  View Your Store
                </Button>
              </a>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="rounded-xl hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-full lg:w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{order.productName}</h3>
                            <p className="text-sm text-gray-600">Order #{order.id}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Customer</p>
                            <p className="font-medium">{order.customerName}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Quantity</p>
                            <p className="font-medium">{order.quantity} pcs</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Size / Color</p>
                            <p className="font-medium">{order.size} / {order.color}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total</p>
                            <p className="font-medium text-violet-600">₹{order.total}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Select
                            value={order.status}
                            onValueChange={(value) => updateOrder(order.id, value)}
                          >
                            <SelectTrigger className="w-full sm:w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {orders.length === 0 && (
              <Card className="rounded-xl p-12 text-center">
                <FiShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-gray-600">Orders will appear here when customers place them</p>
              </Card>
            )}
          </div>
        )}
      </div>

      <AddProductModal
        open={isAddProductOpen}
        onClose={handleCloseModal}
        product={editingProduct}
        refetch={refetch}
      />
    </div>
  );
}
