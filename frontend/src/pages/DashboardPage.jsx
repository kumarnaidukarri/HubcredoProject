import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { leadsAPI } from "../services/api";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";

const DashboardPage = () => {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");
    setAnalyzing(true);

    try {
      const response = await leadsAPI.analyze(url);
      const leadId = response.data.data.lead.id;
      navigate(`/leads?id=${leadId}`);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to analyze website");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-orange-950 ml-64">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-3xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="text-7xl mb-4 float-animation">🚀</div>
          </div>
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Create <span className="gradient-text">Viral</span> LinkedIn Posts
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Paste any website URL and let AI craft a professional, engaging LinkedIn post in seconds
          </p>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleAnalyze} className="mb-16">
          <div className="card gradient-bg">
            <div className="space-y-6">
              <div>
                <label className="block mb-3">
                  <span className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                    🔗 Website URL
                  </span>
                </label>
                <input
                  type="url"
                  required
                  className="input-field text-lg py-4"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={analyzing}
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-5 py-4 rounded-xl text-sm backdrop-blur-sm">
                  <span className="font-semibold">⚠️ Error:</span> {error}
                </div>
              )}

              <Button type="submit" className="w-full text-xl py-5 font-bold" disabled={analyzing}>
                {analyzing ? (
                  <span className="flex items-center justify-center gap-3">
                    <LoadingSpinner size="sm" />
                    <span className="shimmer">Analyzing Website...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <span>✨</span>
                    Generate LinkedIn Post
                    <span>🚀</span>
                  </span>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Features Grid */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="gradient-text">How It Works</span>
          </h3>
          
          <div className="grid gap-6">
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-5">
                <div className="text-5xl flex-shrink-0">📝</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-purple-300">1. Paste URL</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Simply paste any website URL you want to create content about
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-5">
                <div className="text-5xl flex-shrink-0">🤖</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-pink-300">2. AI Analysis</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Our advanced AI extracts key insights, features, and value propositions
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-5">
                <div className="text-5xl flex-shrink-0">✨</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-orange-300">3. Get Your Post</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Receive a professionally crafted LinkedIn post ready to share with your network
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="card gradient-bg">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-2xl font-bold mb-3 gradient-text">Pro Tip</h3>
            <p className="text-gray-300 leading-relaxed">
              Works best with company websites, product pages, blog posts, and landing pages. 
              The AI will analyze the content and create engaging, professional posts tailored for LinkedIn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
