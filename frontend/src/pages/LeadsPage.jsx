import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { leadsAPI } from "../services/api";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";

const LeadsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const leadId = searchParams.get("id");
  const navigate = useNavigate();

  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(false);
  const [editedPost, setEditedPost] = useState("");

  useEffect(() => {
    if (leadId) {
      fetchLeadById(leadId);
    } else {
      setSelectedLead(null);
    }
  }, [leadId]);

  const fetchLeadById = async (id) => {
    try {
      setLoading(true);
      const response = await leadsAPI.getById(id);
      setSelectedLead(response.data.data.lead);
      setEditedPost(
        response.data.data.lead?.generatedSocialPosts?.linkedin || ""
      );
    } catch (error) {
      console.error("Failed to fetch lead:", error);
      setError(
        "Failed to load lead details. " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPost = () => {
    const text = editingPost || selectedLead?.generatedSocialPosts?.linkedin;
    if (text) {
      navigator.clipboard.writeText(text);
      alert("Post copied to clipboard!");
    }
  };

  const handleSavePost = async () => {
    try {
      await leadsAPI.createSocialPost({
        leadId: selectedLead._id,
        platform: "linkedin",
        message: editedPost,
        tone: "professional",
      });
      alert("Post saved successfully!");
      setEditingPost(false);
      await fetchLeadById(selectedLead._id);
    } catch (error) {
      console.error("Failed to save post:", error);
      alert("Failed to save post. Please try again.");
    }
  };

  if (!selectedLead) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <Card className="text-center py-12">
            <p className="text-gray-400 mb-6">No post selected</p>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              {selectedLead.companyName}
            </h1>
            <p className="text-gray-400 text-sm mt-1">{selectedLead.url}</p>
          </div>
          <Button onClick={() => navigate("/dashboard")} variant="secondary">
            ← Back
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Company Summary Card */}
        <Card className="mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 text-sm">Industry</span>
                  <p className="font-medium">
                    {selectedLead.industry || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Location</span>
                  <p className="font-medium">
                    {selectedLead.location || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Size</span>
                  <p className="font-medium">
                    {selectedLead.companySize || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Summary</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {selectedLead.summary}
              </p>
            </div>
          </div>
        </Card>

        {/* LinkedIn Post Card */}
        {selectedLead.generatedSocialPosts?.linkedin ? (
          <Card className="gradient-bg mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Your LinkedIn Post</h2>
              <p className="text-gray-400">Ready to share on LinkedIn</p>
            </div>

            {!editingPost ? (
              <>
                <div className="bg-slate-700/30 rounded-lg p-6 mb-6 border border-slate-600/50">
                  <p className="whitespace-pre-wrap text-gray-100 leading-relaxed">
                    {selectedLead.generatedSocialPosts.linkedin}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleCopyPost} className="flex-1">
                    📋 Copy to Clipboard
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingPost(true);
                      setEditedPost(selectedLead.generatedSocialPosts.linkedin);
                    }}
                    variant="secondary"
                    className="flex-1"
                  >
                    ✏️ Edit Post
                  </Button>
                </div>
              </>
            ) : (
              <>
                <textarea
                  value={editedPost}
                  onChange={(e) => setEditedPost(e.target.value)}
                  className="input-field w-full mb-6 min-h-48 font-mono text-sm"
                />

                <div className="flex gap-3">
                  <Button onClick={handleSavePost} className="flex-1">
                    💾 Save Changes
                  </Button>
                  <Button
                    onClick={() => setEditingPost(false)}
                    variant="secondary"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </Card>
        ) : (
          <Card className="gradient-bg text-center py-12">
            <p className="text-gray-400 mb-4">No LinkedIn post generated yet</p>
            <Button onClick={() => navigate("/dashboard")}>
              Generate New Post
            </Button>
          </Card>
        )}

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {selectedLead.painPoints?.length > 0 && (
            <Card>
              <h3 className="font-semibold mb-4">Pain Points</h3>
              <ul className="space-y-2">
                {selectedLead.painPoints.map((point, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    • {point}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {selectedLead.services?.length > 0 && (
            <Card>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {selectedLead.services.map((service, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    • {service}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {selectedLead.techStack?.length > 0 && (
            <Card>
              <h3 className="font-semibold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {selectedLead.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {selectedLead.contacts?.emails?.length > 0 && (
            <Card>
              <h3 className="font-semibold mb-4">Contact Emails</h3>
              <ul className="space-y-2">
                {selectedLead.contacts.emails.map((email, i) => (
                  <li key={i} className="text-sm text-teal-400 break-all">
                    {email}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
