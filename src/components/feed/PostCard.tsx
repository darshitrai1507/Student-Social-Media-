import React, { useState } from 'react';
import { Post } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  Send, 
  CheckCircle, 
  AlertCircle,
  BarChart2
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { 
    currentUser, 
    toggleLikePost, 
    toggleBookmarkPost, 
    addComment, 
    votePoll, 
    viewCommunity, 
    viewUserProfile,
    openReportModal,
    showToast 
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Post link copied to clipboard!', 'info');
  };

  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card transition-all duration-200 overflow-hidden">
      
      {/* Post Header */}
      <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <Avatar 
            src={post.authorAvatar} 
            name={post.authorName} 
            size="md" 
            onClick={() => viewUserProfile(post.authorId)}
          />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span 
                onClick={() => viewUserProfile(post.authorId)}
                className="text-xs sm:text-sm font-bold text-slate-900 hover:text-brand-600 cursor-pointer transition-colors"
              >
                {post.authorName}
              </span>
              {post.authorBadge && (
                <Badge role={post.authorBadge} size="xs" />
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 flex-wrap mt-0.5">
              <span>{post.authorCollege}</span>
              <span>•</span>
              <span>{post.authorBranch}</span>
              <span>•</span>
              <span>{post.authorYear}</span>
              <span>•</span>
              <span>{post.timestamp}</span>
            </div>

            {/* Community affiliation tag */}
            {post.communityName && post.communityId && (
              <div className="mt-1">
                <span 
                  onClick={() => viewCommunity(post.communityId!)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                >
                  in {post.communityName}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* More Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-dropdown border border-slate-200 py-1 z-20">
              <button
                onClick={() => {
                  toggleBookmarkPost(post.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Bookmark className="w-3.5 h-3.5" />
                {post.isBookmarked ? 'Remove Bookmark' : 'Save Post'}
              </button>
              <button
                onClick={() => {
                  handleShare();
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                Copy Post Link
              </button>
              <button
                onClick={() => {
                  openReportModal('Post', post.id, `Post by ${post.authorName}`);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                Report Inappropriate
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Text Content */}
      <div className="px-4 sm:px-5 pb-3">
        <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Post Image Attachment */}
      {post.image && (
        <div className="px-4 sm:px-5 pb-3">
          <div className="rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 max-h-96">
            <img 
              src={post.image} 
              alt="Post attachment" 
              className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-200" 
            />
          </div>
        </div>
      )}

      {/* Interactive Poll */}
      {post.poll && (
        <div className="px-4 sm:px-5 pb-4">
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <span className="flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-brand-600" />
                {post.poll.question}
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {post.poll.totalVotes} votes
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {post.poll.options.map(option => {
                const total = post.poll!.totalVotes;
                const percentage = total > 0 ? Math.round((option.votes / total) * 100) : 0;
                const isSelected = post.poll!.userVotedOptionId === option.id;
                const hasVoted = !!post.poll!.userVotedOptionId;

                return (
                  <button
                    key={option.id}
                    onClick={() => votePoll(post.id, option.id)}
                    disabled={hasVoted}
                    className={`relative w-full text-left p-2.5 rounded-lg border text-xs transition-all overflow-hidden ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/40 font-semibold'
                        : hasVoted
                        ? 'border-slate-200 bg-white'
                        : 'border-slate-200 hover:border-brand-300 hover:bg-white bg-slate-50 cursor-pointer'
                    }`}
                  >
                    {/* Background Progress Fill */}
                    {hasVoted && (
                      <div
                        className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                          isSelected ? 'bg-brand-200/60' : 'bg-slate-200/60'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    )}

                    <div className="relative flex items-center justify-between z-10">
                      <span className="flex items-center gap-2 text-slate-800">
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-brand-600" />}
                        {option.text}
                      </span>
                      {hasVoted && (
                        <span className="font-bold text-slate-700 ml-2">
                          {percentage}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="px-4 sm:px-5 py-2.5 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Like Button */}
          <button
            onClick={() => toggleLikePost(post.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
              post.isLiked
                ? 'text-rose-600 bg-rose-50'
                : 'hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{post.likesCount}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
              showComments
                ? 'text-brand-600 bg-brand-50'
                : 'hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{post.comments.length}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmarkPost(post.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
              post.isBookmarked
                ? 'text-brand-600 bg-brand-50'
                : 'hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-brand-600 text-brand-600' : ''}`} />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium hover:bg-slate-100 hover:text-slate-800 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Expandable Comments Section */}
      {showComments && (
        <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50/50 space-y-3">
          
          {/* New Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <Avatar src={currentUser.avatar} name={currentUser.name} size="xs" />
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Write a constructive student comment..."
              className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="p-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Comments List */}
          {post.comments.length === 0 ? (
            <p className="text-center text-[11px] text-slate-400 py-2">
              No comments yet. Start the conversation!
            </p>
          ) : (
            <div className="space-y-2 pt-1">
              {post.comments.map(c => (
                <div key={c.id} className="p-2.5 bg-white rounded-xl border border-slate-150 flex items-start gap-2.5">
                  <Avatar src={c.authorAvatar} name={c.authorName} size="xs" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-slate-900">{c.authorName}</span>
                      {c.authorBadge && <Badge role={c.authorBadge} size="xs" />}
                      <span className="text-[10px] text-slate-400">• {c.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </article>
  );
};
