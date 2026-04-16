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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  🚀 Start Selling Today
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Sell Products with{' '}
                <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
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
                    className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Register as Seller
                    <FaArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl border-2 hover:border-orange-600 hover:text-orange-600 transition-all"
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
                  src="https://images.unsplash.com/photo-1773324089455-a5b32a2e2875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMGFic3RyYWN0fGVufDF8fHx8MTc3NDQ0MzY0OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="E-commerce illustration"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CODify?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to run a successful COD e-commerce business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow border-2 hover:border-orange-200 rounded-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <FaBox className="text-orange-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Product Management</h3>
              <p className="text-gray-600">
                Add, edit, and manage your products with a simple, intuitive interface. Upload multiple images and track inventory effortlessly.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-shadow border-2 hover:border-orange-200 rounded-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center mb-4">
                <FaCreditCard className="text-yellow-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cash on Delivery</h3>
              <p className="text-gray-600">
                Accept COD payments with zero transaction fees. Build trust with customers who prefer paying on delivery.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-shadow border-2 hover:border-orange-200 rounded-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <FaChartLine className="text-orange-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-gray-600">
                Track your sales, monitor orders, and analyze performance with comprehensive dashboard analytics.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-shadow border-2 hover:border-orange-200 rounded-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center mb-4">
                <FaShieldAlt className="text-yellow-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security. Focus on selling while we handle the infrastructure.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-shadow border-2 hover:border-orange-200 rounded-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <FaBolt className="text-orange-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast Setup</h3>
              <p className="text-gray-600">
                Get your online store up and running in minutes. No technical knowledge required.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-shadow border-2 hover:border-orange-200 rounded-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center mb-4">
                <FaUsers className="text-yellow-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Store Pages</h3>
              <p className="text-gray-600">
                Get your own branded store URL. Share it anywhere and start receiving orders instantly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Sellers</h2>
            <p className="text-xl text-gray-600">
              See what our community has to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 rounded-2xl bg-white shadow-lg">
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
              </div>
              <p className="text-gray-700 mb-6">
                "CODify transformed my small business. I went from manual orders to a fully automated system in just one day. Sales increased by 300%!"
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1687422808565-929533931584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Fashion Boutique Owner</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 rounded-2xl bg-white shadow-lg">
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
              </div>
              <p className="text-gray-700 mb-6">
                "The best part is the COD feature. My customers love it, and I don't have to worry about payment gateways or transaction fees."
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Michael Chen"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-gray-600">Electronics Seller</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 rounded-2xl bg-white shadow-lg">
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
                <FaStar size={18} fill="currentColor" />
              </div>
              <p className="text-gray-700 mb-6">
                "Simple, powerful, and exactly what I needed. The dashboard gives me all the insights I need to grow my business efficiently."
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                  alt="Emma Davis"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">Emma Davis</p>
                  <p className="text-sm text-gray-600">Handmade Crafts</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Selling?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of successful sellers and grow your business with CODify
          </p>
          <Link to="/auth">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Create Your Store Now
              <FaArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
