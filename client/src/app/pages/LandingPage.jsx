import { Link } from 'react-router';
import { 
  FaArrowRight, 
  FaBox, 
  FaCreditCard, 
  FaChartLine, 
  FaShieldAlt, 
  FaBolt, 
  FaUsers, 
  FaStar 
} from "react-icons/fa";
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  🚀 Start Selling Today
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Sell Products with{' '}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Cash on Delivery
                </span>
              </h1>
              
              <p className="text-xl text-gray-600">
                Launch your online store in minutes. Accept COD orders, manage inventory, and grow your business with our simple, powerful platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Register as Seller
                    <FaArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl border-2 hover:border-violet-600 hover:text-violet-600 transition-all"
                >
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    <FaStar size={16} />
                    <FaStar size={16} />
                    <FaStar size={16} />
                    <FaStar size={16} />
                    <FaStar size={16} />
                  </div>
                  <p className="text-sm text-gray-600">Rated 5.0 by sellers</p>
                </div>
                <div className="border-l border-gray-300 h-12"></div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10K+</p>
                  <p className="text-sm text-gray-600">Active sellers</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1773324089455-a5b32a2e2875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="E-commerce illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <Card className="p-8 rounded-2xl">
              <FaBox className="text-violet-600 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Easy Product Management</h3>
            </Card>

            <Card className="p-8 rounded-2xl">
              <FaCreditCard className="text-indigo-600 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Cash on Delivery</h3>
            </Card>

            <Card className="p-8 rounded-2xl">
              <FaChartLine className="text-violet-600 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Analytics</h3>
            </Card>

            <Card className="p-8 rounded-2xl">
              <FaShieldAlt className="text-indigo-600 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Secure</h3>
            </Card>

            <Card className="p-8 rounded-2xl">
              <FaBolt className="text-violet-600 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Fast Setup</h3>
            </Card>

            <Card className="p-8 rounded-2xl">
              <FaUsers className="text-indigo-600 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Custom Store</h3>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <Link to="/auth">
          <Button size="lg">
            Start Now
            <FaArrowRight className="ml-2" />
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}