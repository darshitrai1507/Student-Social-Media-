import React, { useState } from 'react';
import { UploadResourceModal } from '../components/modals/UploadResourceModal';
import { StudyResource } from '../types';

export const CommunityDetailPage: React.FC = () => {
  // Tab state: 'discussions' or 'resources'
  const [activeTab, setActiveTab] = useState<'discussions' | 'resources'>('discussions');
  
  // Branch filter state
  const [selectedBranchFilter, setSelectedBranchFilter] = useState('All');
  
  // Modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Sample initial resources
  const [resources, setResources] = useState<StudyResource[]>([
    {
      id: '1',
      communityId: 'c1',
      title: 'Data Structures & Algorithms Complete Notes',
      description: 'Handwritten lecture notes covering trees, graphs, and dynamic programming.',
      branch: 'Computer Science',
      semester: 'Sem 3',
      resourceType: 'NOTE',
      fileUrl: '#',
      fileName: 'DSA_Notes.pdf',
      uploadedBy: {
        name: 'Darshit Rai',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      },
      createdAt: new Date().toISOString(),
      downloadsCount: 14,
    },
    {
      id: '2',
      communityId: 'c1',
      title: 'Operating Systems Previous Year Question Paper (2025)',
      description: 'End-term exam paper with important repeated questions.',
      branch: 'Computer Science',
      semester: 'Sem 4',
      resourceType: 'PYQ',
      fileUrl: '#',
      fileName: 'OS_2025_PYQ.pdf',
      uploadedBy: {
        name: 'Student Peer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      },
      createdAt: new Date().toISOString(),
      downloadsCount: 29,
    },
  ]);

  // Handle newly uploaded resource from modal
  const handleAddNewResource = (newResource: StudyResource) => {
    setResources([newResource, ...resources]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Community Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white mb-6 shadow-md">
        <h1 className="text-2xl font-bold">Computer Science & Engineering Community</h1>
        <p className="text-indigo-100 text-sm mt-1">
          Share your study materials, discuss coursework, and clear doubts together.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('discussions')}
          className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'discussions'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
          }`}
        >
          💬 Discussions & Chat
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'resources'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
          }`}
        >
          📚 Notes & PYQs Vault
        </button>
      </div>

      {/* Tab 1: Discussions */}
      {activeTab === 'discussions' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Community Feed & Chat</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            This is where your regular community chats and posts appear. Click on the <b>"Notes & PYQs Vault"</b> tab above to check out study materials!
          </p>
        </div>
      )}

      {/* Tab 2: Notes & PYQs Vault */}
      {activeTab === 'resources' && (
        <div className="space-y-4">
          {/* Filter bar & Upload Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Filter Branch:</span>
              <select
                value={selectedBranchFilter}
                onChange={(e) => setSelectedBranchFilter(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="All">All Branches</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
            >
              + Upload Notes / PYQ
            </button>
          </div>

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources
              .filter((r) => selectedBranchFilter === 'All' || r.branch === selectedBranchFilter)
              .map((res) => (
                <div 
                  key={res.id} 
                  className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        res.resourceType === 'PYQ' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {res.resourceType === 'PYQ' ? 'Previous Year Q' : 'Lecture Note'}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{res.branch} • {res.semester}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{res.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{res.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">By {res.uploadedBy.name}</span>
                    <a
                      href={res.fileUrl}
                      download={res.fileName}
                      className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                      📥 Download ({res.downloadsCount})
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Upload Modal Component */}
      <UploadResourceModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        communityId="c1"
        onUpload={handleAddNewResource}
      />
    </div>
  );
};