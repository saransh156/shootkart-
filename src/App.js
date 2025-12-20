import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Mail, Phone, User, Menu, X, MessageCircle, Star, Send, ArrowLeft, Heart, Share2, Award, Users, Briefcase, Edit } from 'lucide-react';

const initializeDatabase = () => {
  const stored = sessionStorage.getItem('shootkart_db');
  if (stored) {
    return JSON.parse(stored);
  }
  
  const defaultDB = {
    users: [],
    photographers: [
      {
        id: 1,
        userId: null,
        name: "Rajesh Kumar",
        category: "Wedding",
        city: "Mumbai",
        price: 25000,
        rating: 4.8,
        reviews: 156,
        experience: "8 years",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
        bio: "Specialized in capturing beautiful wedding moments with a cinematic touch.",
        email: "rajesh@shootkart.com",
        phone: "+91 98765 43210",
        portfolio: [
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop"
        ],
        services: ["Wedding Photography", "Pre-Wedding Shoot"],
        achievements: ["200+ Happy Couples"],
        clientCount: 45
      }
    ],
    messages: [],
    contacts: []
  };
  
  sessionStorage.setItem('shootkart_db', JSON.stringify(defaultDB));
  return defaultDB;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [database, setDatabase] = useState(() => initializeDatabase());
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    city: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    sessionStorage.setItem('shootkart_db', JSON.stringify(database));
  }, [database]);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const viewPhotographerProfile = (photographer) => {
    setSelectedPhotographer(photographer);
    setCurrentPage('photographer-profile');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        currentUser={currentUser} 
        setCurrentPage={setCurrentPage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleLogout={handleLogout}
      />
      
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'browse' && (
        <BrowsePage 
          filters={filters} 
          setFilters={setFilters} 
          photographers={database.photographers}
          viewPhotographerProfile={viewPhotographerProfile}
        />
      )}
      {currentPage === 'photographer-profile' && selectedPhotographer && (
        <PhotographerProfilePage 
          photographer={selectedPhotographer}
          currentUser={currentUser}
          setCurrentPage={setCurrentPage}
          database={database}
          setDatabase={setDatabase}
        />
      )}
      {currentPage === 'photographer-dashboard' && currentUser && (
        <PhotographerDashboard
          currentUser={currentUser}
          database={database}
          setDatabase={setDatabase}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === 'register' && (
        <RegisterPage 
          database={database}
          setDatabase={setDatabase}
          setCurrentUser={setCurrentUser}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === 'login' && (
        <LoginPage
          database={database}
          setCurrentUser={setCurrentUser}
          setCurrentPage={setCurrentPage}
        />
      )}
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

const Header = ({ currentUser, setCurrentPage, isMenuOpen, setIsMenuOpen, handleLogout }) => (
  <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setCurrentPage('home')}
        >
          <Camera className="text-yellow-400" size={32} />
          <span className="text-xl font-bold">ShootKart</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setCurrentPage('browse')}
            className="hover:text-yellow-400 transition"
          >
            Browse
          </button>
          {currentUser ? (
            <>
              {currentUser.userType === 'Photographer' && (
                <button 
                  onClick={() => setCurrentPage('photographer-dashboard')}
                  className="hover:text-yellow-400 transition"
                >
                  Dashboard
                </button>
              )}
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>{currentUser.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setCurrentPage('login')}
                className="hover:text-yellow-400 transition"
              >
                Login
              </button>
              <button 
                onClick={() => setCurrentPage('register')}
                className="bg-yellow-400 text-gray-900 px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition"
              >
                Register
              </button>
            </>
          )}
        </div>

        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  </header>
);

const HomePage = ({ setCurrentPage }) => (
  <main>
    <section className="relative h-96 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=400&fit=crop')"
        }}
      />
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Perfect <span className="text-yellow-400">Photographer</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-300">
          Book professional photographers for weddings, events, and more
        </p>
        <button 
          onClick={() => setCurrentPage('browse')}
          className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition"
        >
          Browse Photographers
        </button>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Are You a Photographer?
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          Join thousands of professionals earning on ShootKart
        </p>
        <button 
          onClick={() => setCurrentPage('register')}
          className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Start Earning Today
        </button>
      </div>
    </section>
  </main>
);

const BrowsePage = ({ filters, setFilters, photographers, viewPhotographerProfile }) => {
  const [showFilters, setShowFilters] = useState(false);

  const filteredPhotographers = photographers.filter(p => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.city && !p.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.minPrice && p.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && p.price > parseInt(filters.maxPrice)) return false;
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-80 bg-gray-800 rounded-lg p-6 h-fit`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button 
              className="md:hidden"
              onClick={() => setShowFilters(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select 
                className="w-full bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">All Categories</option>
                <option value="Wedding">Wedding</option>
                <option value="Events">Events</option>
                <option value="Fashion">Fashion</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input 
                type="text"
                placeholder="Photographer name"
                className="w-full bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input 
                type="text"
                placeholder="Enter city"
                className="w-full bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
              />
            </div>

            <button 
              className="w-full bg-yellow-400 text-gray-900 py-2 rounded font-semibold hover:bg-yellow-500 transition"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {filteredPhotographers.length} Photographers Found
            </h1>
            <button 
              className="md:hidden bg-yellow-400 text-gray-900 px-4 py-2 rounded font-semibold"
              onClick={() => setShowFilters(true)}
            >
              Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotographers.map(photographer => (
              <PhotographerCard 
                key={photographer.id} 
                photographer={photographer}
                viewPhotographerProfile={viewPhotographerProfile}
              />
            ))}
          </div>

          {filteredPhotographers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No photographers found</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const PhotographerCard = ({ photographer, viewPhotographerProfile }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition">
    <img 
      src={photographer.image} 
      alt={photographer.name}
      className="w-full h-48 object-cover cursor-pointer"
      onClick={() => viewPhotographerProfile(photographer)}
    />
    <div className="p-4">
      <h3 
        className="text-xl font-bold mb-2 cursor-pointer hover:text-yellow-400"
        onClick={() => viewPhotographerProfile(photographer)}
      >
        {photographer.name}
      </h3>
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        <MapPin size={16} />
        <span className="text-sm">{photographer.city}</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-sm font-semibold">
          {photographer.category}
        </span>
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 font-semibold">{photographer.rating}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">₹{photographer.price.toLocaleString()}</span>
        <button 
          onClick={() => viewPhotographerProfile(photographer)}
          className="bg-yellow-400 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  </div>
);

const PhotographerDashboard = ({ currentUser, database, setDatabase }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [portfolioUrl, setPortfolioUrl] = useState('');

  const photographerProfile = database.photographers.find(p => p.userId === currentUser.id);
  const totalClients = database.users.filter(u => u.userType === 'Client').length;
  
  useEffect(() => {
    if (photographerProfile) {
      setProfileData(photographerProfile);
    } else {
      setProfileData({
        userId: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        category: 'Wedding',
        city: '',
        price: 20000,
        rating: 5.0,
        reviews: 0,
        experience: '1 year',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop',
        bio: '',
        phone: '',
        portfolio: [],
        services: [],
        achievements: [],
        clientCount: 0
      });
    }
  }, [photographerProfile, currentUser]);

  const handleSaveProfile = () => {
    if (!profileData.city || !profileData.phone || !profileData.bio) {
      alert('Please fill in City, Phone, and Bio to make your profile visible to clients!');
      return;
    }

    const updatedDB = {...database};
    
    if (photographerProfile) {
      const index = updatedDB.photographers.findIndex(p => p.userId === currentUser.id);
      updatedDB.photographers[index] = profileData;
    } else {
      const newProfile = {
        ...profileData,
        id: Date.now()
      };
      updatedDB.photographers.push(newProfile);
    }
    
    setDatabase(updatedDB);
    setIsEditing(false);
    alert('Profile saved! You are now visible to clients.');
  };

  const handleAddPortfolioImage = () => {
    if (portfolioUrl.trim()) {
      setProfileData({
        ...profileData,
        portfolio: [...profileData.portfolio, portfolioUrl.trim()]
      });
      setPortfolioUrl('');
    }
  };

  const handleRemovePortfolioImage = (index) => {
    const newPortfolio = profileData.portfolio.filter((_, i) => i !== index);
    setProfileData({...profileData, portfolio: newPortfolio});
  };

  const handleAddService = () => {
    const service = prompt('Enter service name:');
    if (service && service.trim()) {
      setProfileData({
        ...profileData,
        services: [...profileData.services, service.trim()]
      });
    }
  };

  const handleRemoveService = (index) => {
    const newServices = profileData.services.filter((_, i) => i !== index);
    setProfileData({...profileData, services: newServices});
  };

  if (!profileData) return null;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Photographer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Users size={32} className="text-yellow-400" />
            <span className="text-3xl font-bold">{totalClients}</span>
          </div>
          <h3 className="text-gray-400">Total Clients on Platform</h3>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Star size={32} className="text-yellow-400" />
            <span className="text-3xl font-bold">{profileData.rating}</span>
          </div>
          <h3 className="text-gray-400">Your Rating</h3>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Briefcase size={32} className="text-yellow-400" />
            <span className="text-3xl font-bold">{profileData.clientCount || 0}</span>
          </div>
          <h3 className="text-gray-400">Your Clients</h3>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Profile</h2>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition"
          >
            <Edit size={20} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {!photographerProfile && !isEditing && (
          <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
            <p className="font-semibold mb-2">⚠️ Complete your profile to appear in search results!</p>
            <p className="text-sm mb-3">Clients can only see photographers with complete profiles</p>
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
            >
              Create Profile Now
            </button>
          </div>
        )}

        {isEditing ? (
          <div className="space-y-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Profile Photo</h3>
              <div className="flex items-center gap-4">
                <img 
                  src={profileData.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                  <input 
                    type="text"
                    placeholder="Paste image URL"
                    className="w-full bg-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={profileData.image}
                    onChange={(e) => setProfileData({...profileData, image: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input 
                  type="text"
                  className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone * (Required)</label>
                <input 
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City * (Required)</label>
                <input 
                  type="text"
                  placeholder="Mumbai"
                  className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={profileData.city}
                  onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select 
                  className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={profileData.category}
                  onChange={(e) => setProfileData({...profileData, category: e.target.value})}
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Events">Events</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price (₹)</label>
                <input 
                  type="number"
                  className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={profileData.price}
                  onChange={(e) => setProfileData({...profileData, price: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experience</label>
                <input 
                  type="text"
                  placeholder="e.g., 5 years"
                  className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={profileData.experience}
                  onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio * (Required)</label>
              <textarea 
                rows="4"
                className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                placeholder="Tell clients about yourself..."
              />
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Portfolio Images</h3>
              <div className="flex gap-2 mb-4">
                <input 
                  type="text"
                  placeholder="Paste image URL and click Add"
                  className="flex-1 bg-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPortfolioImage()}
                />
                <button 
                  onClick={handleAddPortfolioImage}
                  className="bg-yellow-400 text-gray-900 px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition"
                >
                  Add Image
                </button>
              </div>
              
              {profileData.portfolio.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {profileData.portfolio.map((img, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={img}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        onClick={() => handleRemovePortfolioImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No portfolio images yet</p>
              )}
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Services Offered</h3>
                <button 
                  onClick={handleAddService}
                  className="bg-yellow-400 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition text-sm"
                >
                  + Add Service
                </button>
              </div>
              {profileData.services.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profileData.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-600 px-3 py-1 rounded">
                      <span>{service}</span>
                      <button
                        onClick={() => handleRemoveService(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No services added yet</p>
              )}
            </div>

            <button 
              onClick={handleSaveProfile}
              className="w-full bg-yellow-400 text-gray-900 py-3 rounded font-semibold hover:bg-yellow-500 transition text-lg"
            >
              Save Profile & Make Visible to Clients
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={profileData.image}
                alt={profileData.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold">{profileData.name}</h3>
                <p className="text-gray-400">{profileData.category} Photographer</p>
                <p className="text-gray-400">{profileData.city}</p>
                {photographerProfile ? (
                  <p className="text-green-400 text-sm mt-1">✓ Visible to clients</p>
                ) : (
                  <p className="text-red-400 text-sm mt-1">✗ Not visible yet</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400">Phone:</span>
                <p className="font-semibold">{profileData.phone || 'Not set'}</p>
              </div>
              <div>
                <span className="text-gray-400">Price:</span>
                <p className="font-semibold">₹{profileData.price.toLocaleString()}</p>
              </div>
            </div>

            {profileData.bio && (
              <div>
                <span className="text-gray-400">Bio:</span>
                <p className="mt-2">{profileData.bio}</p>
              </div>
            )}

            {profileData.portfolio.length > 0 && (
              <div>
                <span className="text-gray-400">Portfolio ({profileData.portfolio.length} images):</span>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {profileData.portfolio.slice(0, 8).map((img, i) => (
                    <img key={i} src={img} alt={`Portfolio ${i+1}`} className="w-full h-24 object-cover rounded" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

const PhotographerProfilePage = ({ photographer, currentUser, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [showChat, setShowChat] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={() => setCurrentPage('browse')}
        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Browse
      </button>

      <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
        <div className="relative h-64">
          <img 
            src={photographer.portfolio && photographer.portfolio[0] ? photographer.portfolio[0] : photographer.image}
            alt={photographer.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img 
              src={photographer.image}
              alt={photographer.name}
              className="w-32 h-32 rounded-full border-4 border-gray-700 -mt-20 relative z-10"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{photographer.name}</h1>
              <div className="flex items-center gap-4 text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {photographer.city}
                </span>
                <span>•</span>
                <span>{photographer.experience} experience</span>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xl font-bold">{photographer.rating}</span>
                  <span className="text-gray-400">({photographer.reviews} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-yellow-400">
                  ₹{photographer.price.toLocaleString()}
                </div>
              </div>

              <button 
                onClick={() => {
                  if (!currentUser) {
                    alert('Please login to contact photographer');
                    setCurrentPage('login');
                    return;
                  }
                  setShowChat(true);
                }}
                className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                <MessageCircle size={20} />
                Contact Photographer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex gap-4 border-b border-gray-700 mb-6">
              <button 
                className={`pb-3 px-4 font-semibold ${activeTab === 'about' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button 
                className={`pb-3 px-4 font-semibold ${activeTab === 'portfolio' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('portfolio')}
              >
                Portfolio
              </button>
              <button 
                className={`pb-3 px-4 font-semibold ${activeTab === 'services' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('services')}
              >
                Services
              </button>
            </div>

            {activeTab === 'about' && (
              <div>
                <h3 className="text-xl font-bold mb-4">About Me</h3>
                <p className="text-gray-300">{photographer.bio}</p>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div>
                <h3 className="text-xl font-bold mb-4">My Work</h3>
                {photographer.portfolio && photographer.portfolio.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photographer.portfolio.map((image, index) => (
                      <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg">
                        <img 
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No portfolio images yet</p>
                )}
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Services Offered</h3>
                {photographer.services && photographer.services.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {photographer.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-700 p-4 rounded-lg">
                        <Camera size={20} className="text-yellow-400" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No services listed yet</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-yellow-400" />
                <span className="text-gray-300 text-sm">{photographer.email}</span>
              </div>
              {photographer.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-yellow-400" />
                  <span className="text-gray-300">{photographer.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showChat && (
        <ChatModal 
          photographer={photographer}
          currentUser={currentUser}
          onClose={() => setShowChat(false)}
        />
      )}
    </main>
  );
};

const ChatModal = ({ photographer, currentUser, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'photographer',
      text: `Hi ${currentUser.name}! Thanks for reaching out.`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setChatMessages([...chatMessages, {
      id: chatMessages.length + 1,
      sender: 'client',
      text: message,
      timestamp: new Date().toLocaleTimeString()
    }]);
    setMessage('');

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'photographer',
        text: "Thank you! I'll get back to you shortly.",
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img 
              src={photographer.image}
              alt={photographer.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-bold">{photographer.name}</h3>
              <span className="text-sm text-gray-400">Online</span>
            </div>
          </div>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs ${msg.sender === 'client' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700'} rounded-lg p-3`}>
                <p>{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input 
              type="text"
              placeholder="Type message..."
              className="flex-1 bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              className="bg-yellow-400 text-gray-900 p-3 rounded-lg hover:bg-yellow-500 transition"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterPage = ({ database, setDatabase, setCurrentUser, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'Client'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    const existingUser = database.users.find(u => u.email === formData.email);
    if (existingUser) {
      setError('Email already registered');
      return;
    }

    const newUser = {
      id: Date.now(),
      ...formData
    };

    const updatedDB = {
      ...database,
      users: [...database.users, newUser]
    };

    setDatabase(updatedDB);
    setCurrentUser(newUser);
    
    if (formData.userType === 'Photographer') {
      setCurrentPage('photographer-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="text-center mb-8">
          <Camera className="text-yellow-400 mx-auto mb-4" size={48} />
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        </div>

        {error && (
          <div className="bg-red-600 text-white px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text"
              className="w-full bg-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email"
              className="w-full bg-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password"
              className="w-full bg-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">I am a</label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 py-3 rounded font-semibold ${formData.userType === 'Client' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700'}`}
                onClick={() => setFormData({...formData, userType: 'Client'})}
              >
                Client
              </button>
              <button
                type="button"
                className={`flex-1 py-3 rounded font-semibold ${formData.userType === 'Photographer' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700'}`}
                onClick={() => setFormData({...formData, userType: 'Photographer'})}
              >
                Photographer
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-3 rounded font-semibold hover:bg-yellow-500 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account?{' '}
          <button 
            onClick={() => setCurrentPage('login')}
            className="text-yellow-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </main>
  );
};

const LoginPage = ({ database, setCurrentUser, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = database.users.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      setCurrentUser(user);
      if (user.userType === 'Photographer') {
        setCurrentPage('photographer-dashboard');
      } else {
        setCurrentPage('home');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="text-center mb-8">
          <Camera className="text-yellow-400 mx-auto mb-4" size={48} />
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        </div>

        {error && (
          <div className="bg-red-600 text-white px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email"
              className="w-full bg-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password"
              className="w-full bg-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-3 rounded font-semibold hover:bg-yellow-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{' '}
          <button 
            onClick={() => setCurrentPage('register')}
            className="text-yellow-400 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </main>
  );
};

const Footer = ({ setCurrentPage }) => (
  <footer className="bg-gray-800 border-t border-gray-700 mt-16">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Camera className="text-yellow-400" size={32} />
          <span className="text-xl font-bold">ShootKart</span>
        </div>
        <p className="text-gray-400 text-sm">
          Your marketplace for professional photography services
        </p>
      </div>
    </div>
  </footer>
);

export default App;