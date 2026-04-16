import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
// import { User, Store, Mail, Edit, ExternalLink, Package, ShoppingCart, Clock } from 'lucide-react';
import { 
  FiUser, 
  FiShoppingBag, 
  FiEdit, 
  FiExternalLink, 
  FiPackage, 
  FiShoppingCart, 
  FiClock 
} from "react-icons/fi";
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, products, orders, updateProfile } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    storeName: user?.storeName || '',
    profilePicture: user?.profilePicture || ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="rounded-2xl mb-8 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-orange-600 to-yellow-600"></div>
          <CardContent className="p-8 -mt-16">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-xl overflow-hidden">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                      <FiUser size={48} className="text-orange-600" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-1">{user.email}</p>
                <p className="text-gray-600 mb-4">@{user.username}</p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => setIsEditModalOpen(true)}
                    className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
                  >
                    <FiEdit size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                  <Link to={`/store/${user.username}`} target="_blank">
                    <Button variant="outline">
                      <FiExternalLink size={16} className="mr-2" />
                      View Store
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Info */}
        <Card className="rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiShoppingBag size={20} />
              Store Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm text-gray-600">Store Name</Label>
                <p className="text-lg font-semibold mt-1">{user.storeName}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Store URL</Label>
                <p className="text-lg font-semibold mt-1 text-orange-600">
                  /store/{user.username}
                </p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100">
              <p className="text-sm text-gray-700 mb-2">
                Share your store link with customers:
              </p>
              <div className="flex gap-2">
                <Input
                  value={`${window.location.origin}/store/${user.username}`}
                  readOnly
                  className="bg-white"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/store/${user.username}`);
                    alert('Link copied to clipboard!');
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="rounded-xl border-2 hover:border-orange-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FiPackage className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-2 hover:border-yellow-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <FiShoppingCart className="text-yellow-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-2 hover:border-yellow-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <FiClock className="text-yellow-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/dashboard">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <FiPackage size={20} className="mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">Manage Products</p>
                    <p className="text-sm text-gray-600">Add or edit your products</p>
                  </div>
                </Button>
              </Link>

              <Link to="/dashboard">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <FiShoppingCart size={20} className="mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">View Orders</p>
                    <p className="text-sm text-gray-600">Check and manage orders</p>
                  </div>
                </Button>
              </Link>

              <Link to={`/store/${user.username}`} target="_blank">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <FiShoppingBag size={20} className="mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">Preview Store</p>
                    <p className="text-sm text-gray-600">See how customers view your store</p>
                  </div>
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4"
                onClick={() => setIsEditModalOpen(true)}
              >
                <FiEdit size={20} className="mr-3" />
                <div className="text-left">
                  <p className="font-semibold">Edit Profile</p>
                  <p className="text-sm text-gray-600">Update your information</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdateProfile} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-store">Store Name</Label>
              <Input
                id="edit-store"
                value={editForm.storeName}
                onChange={(e) => setEditForm({ ...editForm, storeName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-picture">Profile Picture URL</Label>
              <Input
                id="edit-picture"
                value={editForm.profilePicture}
                onChange={(e) => setEditForm({ ...editForm, profilePicture: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
