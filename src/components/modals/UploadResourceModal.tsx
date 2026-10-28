import React, { useState } from 'react';

interface UploadResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityId: string;
  onUpload: (resource: any) => void;
}

export const UploadResourceModal: React.FC<UploadResourceModalProps> = ({
  isOpen,
  onClose,
  communityId,
  onUpload,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [branch, setBranch] = useState('Computer Science');
  const [semester, setSemester] = useState('Sem 1');
  const [resourceType, setResourceType] = useState<'NOTE' | 'PYQ'>('NOTE');
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;

    const newResource = {
      id: Date.now().toString(),
      communityId,
      title,
      description,
      branch,
      semester,
      resourceType,
      fileUrl: URL.createObjectURL(file),
      fileName: file.name,
      uploadedBy: {
        name: 'Current User',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      },
      createdAt: new Date().toISOString(),
      downloadsCount: 0,
    };

    onUpload(newResource);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Share Notes or PYQ
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Data Structures Mid-Term Notes"
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief details about the notes or syllabus covered..."
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'].map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
            <div className="mt-1 flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="resourceType"
                  checked={resourceType === 'NOTE'}
                  onChange={() => setResourceType('NOTE')}
                />
                <span className="text-slate-800 dark:text-slate-200">Lecture Note</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="resourceType"
                  checked={resourceType === 'PYQ'}
                  onChange={() => setResourceType('PYQ')}
                />
                <span className="text-slate-800 dark:text-slate-200">Previous Year Question (PYQ)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Upload File (PDF/Doc)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium"
            >
              Upload Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};