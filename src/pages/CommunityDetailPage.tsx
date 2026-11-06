import React, { useState } from 'react';
import { UploadResourceModal } from '../components/modals/UploadResourceModal';
import { StudyResource } from '../types';

export const CommunityDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discussions' | 'resources'>('discussions');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
      uploadedBy: { name: 'Darshit Rai', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
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
      uploadedBy: { name: 'Student Peer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
      createdAt: new Date().toISOString(),
      downloadsCount: 29,
    },
  ]);

  const handleAddNewResource = (newResource: StudyResource) => {
    setResources([newResource, ...resources]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white mb-6 shadow-md">
        <h1 className="text-2xl font-bold">Computer Science &amp; Engineering Community</h1>
        <p className="text-indigo-100 text-sm mt-1">Share your study materials, discuss coursework, and clear doubts together.</p>
      </div>

      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('discussions')}
          className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'discussions' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          💬 Discussions
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'resources' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          📚 Notes &amp; PYQs Vault
        </button>
      </div>

      {activeTab === 'discussions' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Community Feed</h3>
          <p className="text-slate-600 text-sm">Regular community chats and posts appear here.</p>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Filter Branch:</span>
              <select
                value={selectedBranchFilter}
                onChange={(e) => setSelectedBranchFilter(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources
              .filter((r) => selectedBranchFilter === 'All' || r.branch === selectedBranchFilter)
              .map((res) => (
                <div key={res.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        res.resourceType === 'PYQ' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {res.resourceType === 'PYQ' ? 'Previous Year Q' : 'Lecture Note'}
                      </span>
                      <span className="text-xs text-slate-500">{res.branch} · {res.semester}</span>
                    </div>
                    <h4 className="font-bold text-slate-900">{res.title}</h4>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{res.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-500">By {res.uploadedBy.name}</span>
                    <a href={res.fileUrl} download={res.fileName} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      📥 Download ({res.downloadsCount})
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <UploadResourceModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        communityId="c1"
        onUpload={handleAddNewResource}
      />
    </div>
  );
};
