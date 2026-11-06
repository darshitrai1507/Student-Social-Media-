import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../supabaseClient';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';

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
  const { currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [branch, setBranch] = useState<string>(currentUser.branch || 'Computer Science');
  const [semester, setSemester] = useState('Sem 1');
  const [resourceType, setResourceType] = useState<'NOTE' | 'PYQ'>('NOTE');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;

    try {
      setUploading(true);

      let publicFileUrl = '#';
      let uploadedRecord: any = null;

      // 1. If Supabase is connected, upload to Storage and Database
      if (isSupabaseConfigured) {
        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}_${currentUser.id.slice(0, 8)}.${fileExt}`;
          const filePath = `notes/${fileName}`;

          const { error: storageError } = await supabase.storage
            .from('study-resources')
            .upload(filePath, file);

          if (!storageError) {
            const { data: urlData } = supabase.storage
              .from('study-resources')
              .getPublicUrl(filePath);

            publicFileUrl = urlData.publicUrl;
          }

          const newResourcePayload = {
            title,
            description,
            branch,
            semester,
            resource_type: resourceType,
            file_url: publicFileUrl,
            file_name: file.name,
            user_id: currentUser.id,
            uploaded_by_id: currentUser.id,
            uploaded_by_name: currentUser.name,
            uploaded_by_avatar: currentUser.avatar,
          };

          const { data, error: dbError } = await supabase
            .from('study_resources')
            .insert([newResourcePayload])
            .select()
            .single();

          if (!dbError && data) {
            uploadedRecord = data;
          }
        } catch (sbErr) {
          console.warn('Supabase remote upload warning, falling back to local state:', sbErr);
        }
      }

      // If no remote URL obtained, use local blob object URL for immediate browser preview
      if (!publicFileUrl || publicFileUrl === '#') {
        publicFileUrl = URL.createObjectURL(file);
      }

      // Convert format for local UI view state with dynamic authenticated user info
      onUpload({
        id: uploadedRecord?.id || `res-${Date.now()}`,
        communityId,
        title: uploadedRecord?.title || title,
        description: uploadedRecord?.description || description,
        branch: uploadedRecord?.branch || branch,
        semester: uploadedRecord?.semester || semester,
        resourceType: uploadedRecord?.resource_type || resourceType,
        fileUrl: uploadedRecord?.file_url || publicFileUrl,
        fileName: uploadedRecord?.file_name || file.name,
        uploadedBy: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        createdAt: uploadedRecord?.created_at || new Date().toISOString(),
        downloadsCount: uploadedRecord?.downloads_count || 0,
      });

      // Reset form & close
      setTitle('');
      setDescription('');
      setFile(null);
      onClose();
    } catch (err: any) {
      alert(`Upload failed: ${err.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Share Notes or PYQ
          </h3>
          {/* Uploader Preview */}
          <div className="flex items-center gap-2 bg-indigo-50/70 dark:bg-slate-800 px-3 py-1.5 rounded-full">
            <Avatar src={currentUser.avatar} name={currentUser.name} size="xs" />
            <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-200 truncate max-w-[140px]">
              {currentUser.name}
            </span>
          </div>
        </div>

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
                <option value="Information Technology">Information Technology</option>
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
                <span className="text-slate-800 dark:text-slate-200 text-sm">Lecture Note</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="resourceType"
                  checked={resourceType === 'PYQ'}
                  onChange={() => setResourceType('PYQ')}
                />
                <span className="text-slate-800 dark:text-slate-200 text-sm">Previous Year Question (PYQ)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Upload File (PDF/Doc)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
