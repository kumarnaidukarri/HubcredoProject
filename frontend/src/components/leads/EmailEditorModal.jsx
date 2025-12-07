import React, { useState } from "react";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";

const EmailEditorModal = ({ isOpen, onClose, onSend, initialData }) => {
  // repurposed as Social Post modal (keeps filename for minimal changes)
  const [formData, setFormData] = useState({
    platform: initialData?.platform || "linkedin",
    message: initialData?.message || "",
    tone: initialData?.tone || "professional",
  });

  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await onSend(formData);
    setSending(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-gray-800/50">
          <h3 className="text-xl font-semibold text-white">
            Create Social Post
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Platform
            </label>
            <select
              value={formData.platform}
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value })
              }
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none"
            >
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) =>
                setFormData({ ...formData, tone: e.target.value })
              }
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="excited">Excited</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Post Content
            </label>
            <textarea
              required
              rows={10}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none font-mono text-sm leading-relaxed"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700 mt-6">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={sending}>
              {sending ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" /> Posting...
                </span>
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailEditorModal;
