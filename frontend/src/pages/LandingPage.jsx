import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-orange-950">
      {/* Navbar */}
      <nav className="border-b border-purple-500/20 backdrop-blur-md sticky top-0 z-40 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">✨</span>
            <h1 className="text-2xl font-bold gradient-text">PostCraft</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <button className="text-gray-300 hover:text-pink-400 transition-colors font-medium">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn-primary text-sm">Sign Up</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center space-y-8 mb-20">
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Transform Websites into
            <span className="block gradient-text mt-2">LinkedIn Posts</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Paste any website URL and instantly generate compelling LinkedIn posts powered by AI. No manual writing needed.
          </p>

        </div>

        {/* Main CTA Card */}
        <div className="card gradient-bg max-w-2xl mx-auto mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-center">Get Started in Seconds</h3>
            <Link to="/signup" className="block">
              <Button className="w-full text-lg py-4">
                Start Creating Posts
              </Button>
            </Link>
            <p className="text-center text-sm text-gray-400">
              No credit card required. Free to try.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="card text-center">
            <div className="text-4xl mb-4">🔗</div>
            <h4 className="text-lg font-semibold mb-2">Paste URL</h4>
            <p className="text-gray-400 text-sm">
              Enter any website URL you want to analyze
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h4 className="text-lg font-semibold mb-2">AI Extracts Info</h4>
            <p className="text-gray-400 text-sm">
              Our AI analyzes the site and extracts key insights
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">✍️</div>
            <h4 className="text-lg font-semibold mb-2">Get LinkedIn Post</h4>
            <p className="text-gray-400 text-sm">
              Instantly get a professional, ready-to-post LinkedIn message
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="card mb-20">
          <h3 className="text-2xl font-semibold mb-8 text-center">Why PostCraft?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-purple-400 text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="font-semibold mb-2">Save Time</h4>
                <p className="text-gray-400">Generate professional posts in seconds, not hours</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-pink-400 text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="font-semibold mb-2">AI-Powered</h4>
                <p className="text-gray-400">Uses advanced AI to craft engaging, authentic content</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-purple-400 text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="font-semibold mb-2">Always Professional</h4>
                <p className="text-gray-400">Every post is tailored, relevant, and on-brand</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-pink-400 text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="font-semibold mb-2">Editable</h4>
                <p className="text-gray-400">Tweak any post before sharing to your network</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-6">Ready to boost your LinkedIn presence?</p>
          <Link to="/signup">
            <Button className="px-12 py-4 text-lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
