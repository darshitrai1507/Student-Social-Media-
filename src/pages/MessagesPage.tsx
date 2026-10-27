import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  ArrowLeft, 
  MoreVertical, 
  FileText, 
  Image, 
  Sparkles, 
  ShieldAlert, 
  User as UserIcon,
  CheckCheck
} from 'lucide-react';
import { Conversation, Message } from '../types';

export const MessagesPage: React.FC = () => {
  const { 
    conversations, 
    messages, 
    selectedConversationId, 
    setSelectedConversationId, 
    sendMessage, 
    viewUserProfile, 
    openReportModal, 
    showToast, 
    currentUser 
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const [searchConvQuery, setSearchConvQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === selectedConversationId) || conversations[0];
  const activeMessages: Message[] = activeConv ? messages[activeConv.id] || [] : [];

  // Filter conversations
  const filteredConversations: Conversation[] = conversations.filter((c: Conversation) => 
    c.participant.name.toLowerCase().includes(searchConvQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchConvQuery.toLowerCase())
  );

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length, selectedConversationId]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageText.trim() || !activeConv) return;
    sendMessage(activeConv.id, messageText);
    setMessageText('');
  };

  const handleSendMockAttachment = (type: 'image' | 'file') => {
    if (!activeConv) return;
    if (type === 'image') {
      sendMessage(activeConv.id, 'Shared project wireframe screenshot', {
        type: 'image',
        name: 'UI_Design_Preview.png',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
      });
    } else {
      sendMessage(activeConv.id, 'Attached study reference notes', {
        type: 'file',
        name: 'Operating_Systems_Concurrency.pdf',
        url: '#',
        size: '2.4 MB'
      });
    }
    setShowAttachmentMenu(false);
    showToast('Mock attachment sent!', 'info');
  };

  const emojis = ['👍', '🎉', '🔥', '🚀', '💡', '📚', '🤝', '🙌'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-5rem)] min-h-[600px] flex flex-col">
      
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle flex-1 flex overflow-hidden">
        
        {/* COLUMN 1: CONVERSATIONS LIST (Hidden on mobile if chat is active) */}
        <div className={`w-full md:w-80 lg:w-88 border-r border-slate-200/90 flex flex-col ${
          showMobileChat ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header & Search */}
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-slate-900">Direct Messages</h2>
              <span className="text-[10px] font-semibold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full border border-brand-200/60">
                Peer Connect
              </span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchConvQuery}
                onChange={e => setSearchConvQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No conversations found.
              </div>
            ) : (
              filteredConversations.map((conv: Conversation) => {
                const isSelected = activeConv?.id === conv.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => {
                      setSelectedConversationId(conv.id);
                      setShowMobileChat(true);
                    }}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-brand-50/70 border-r-2 border-brand-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <Avatar 
                      src={conv.participant.avatar} 
                      name={conv.participant.name} 
                      size="md" 
                      showOnline 
                      online={conv.participant.onlineStatus}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {conv.participant.name}
                        </span>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate leading-snug">
                        {conv.lastMessage}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge role={conv.participant.roleBadge} size="xs" />
                        <span className="text-[10px] text-slate-400 truncate">
                          {conv.participant.branch.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* COLUMN 2: ACTIVE CHAT CONVERSATION */}
        {activeConv ? (
          <div className={`flex-1 flex flex-col bg-slate-50/30 ${
            !showMobileChat ? 'hidden md:flex' : 'flex'
          }`}>
            
            {/* Chat Top Header */}
            <div className="p-3.5 sm:p-4 bg-white border-b border-slate-200/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setShowMobileChat(false)}
                  className="p-1 text-slate-500 hover:text-slate-800 md:hidden"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <Avatar 
                  src={activeConv.participant.avatar} 
                  name={activeConv.participant.name} 
                  size="sm" 
                  showOnline 
                  online={activeConv.participant.onlineStatus}
                  onClick={() => viewUserProfile(activeConv.participant.id)}
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span 
                      onClick={() => viewUserProfile(activeConv.participant.id)}
                      className="text-xs sm:text-sm font-bold text-slate-900 hover:text-brand-600 cursor-pointer truncate"
                    >
                      {activeConv.participant.name}
                    </span>
                    <Badge role={activeConv.participant.roleBadge} size="xs" />
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {activeConv.participant.college} • {activeConv.participant.branch}
                  </p>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => viewUserProfile(activeConv.participant.id)}
                  className="p-2 text-slate-500 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition-colors"
                  title="View Profile"
                >
                  <UserIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openReportModal('User', activeConv.participant.id, activeConv.participant.name)}
                  className="p-2 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Report User"
                >
                  <ShieldAlert className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
              
              <div className="text-center my-2">
                <span className="text-[10px] text-slate-400 bg-white border border-slate-200/80 px-2.5 py-1 rounded-full font-medium">
                  End-to-end encrypted campus session • Prototype simulation
                </span>
              </div>

              {activeMessages.map((msg: Message) => {
                const isMine = msg.isMine;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2.5 ${isMine ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMine && (
                      <Avatar 
                        src={activeConv.participant.avatar} 
                        name={activeConv.participant.name} 
                        size="xs" 
                      />
                    )}

                    <div className={`max-w-md sm:max-w-lg rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      isMine
                        ? 'bg-brand-600 text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200 shadow-xs'
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Mock Attachment preview */}
                      {msg.attachment && (
                        <div className="mt-2 pt-2 border-t border-white/20">
                          {msg.attachment.type === 'image' ? (
                            <img 
                              src={msg.attachment.url} 
                              alt="Attachment" 
                              className="rounded-lg max-h-48 w-full object-cover" 
                            />
                          ) : (
                            <div className="p-2 rounded-lg bg-black/10 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <div className="min-w-0 flex-1">
                                <span className="font-bold text-[11px] block truncate">{msg.attachment.name}</span>
                                <span className="text-[10px] opacity-80">{msg.attachment.size}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${
                        isMine ? 'text-brand-200' : 'text-slate-400'
                      }`}>
                        <span>{msg.timestamp}</span>
                        {isMine && <CheckCheck className="w-3 h-3 text-brand-200" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Emoji Bar */}
            {showEmojiPicker && (
              <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
                <span className="text-[11px] text-slate-400 font-semibold mr-1">Quick:</span>
                {emojis.map(e => (
                  <button
                    key={e}
                    onClick={() => {
                      setMessageText(prev => prev + ' ' + e);
                      setShowEmojiPicker(false);
                    }}
                    className="text-base hover:scale-125 transition-transform"
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}

            {/* Attachment Menu */}
            {showAttachmentMenu && (
              <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => handleSendMockAttachment('file')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
                >
                  <FileText className="w-4 h-4 text-brand-600" />
                  <span>Send PDF Notes</span>
                </button>
                <button
                  onClick={() => handleSendMockAttachment('image')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
                >
                  <Image className="w-4 h-4 text-emerald-600" />
                  <span>Send Project Screenshot</span>
                </button>
              </div>
            )}

            {/* Message Composer Bar */}
            <form onSubmit={handleSendMessage} className="p-3.5 bg-white border-t border-slate-200/90 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Attach Document or Image"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Add Emoji"
              >
                <Smile className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                placeholder={`Message ${activeConv.participant.name.split(' ')[0]}...`}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />

              <button
                type="submit"
                disabled={!messageText.trim()}
                className="p-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-xs">
            Select a conversation to start messaging.
          </div>
        )}

        {/* COLUMN 3: RIGHT PANEL (Participant profile info, shared communities) - Desktop only */}
        {activeConv && (
          <div className="hidden lg:flex flex-col w-72 border-l border-slate-200/90 p-5 bg-white space-y-5 overflow-y-auto">
            <div className="text-center">
              <Avatar 
                src={activeConv.participant.avatar} 
                name={activeConv.participant.name} 
                size="xl" 
                className="mx-auto mb-2"
              />
              <h3 className="font-bold text-sm text-slate-900">{activeConv.participant.name}</h3>
              <p className="text-xs text-brand-700 font-medium mt-0.5">{activeConv.participant.branch}</p>
              <p className="text-[11px] text-slate-400">{activeConv.participant.year} • {activeConv.participant.college}</p>

              <div className="mt-2 flex items-center justify-center gap-1.5">
                <Badge role={activeConv.participant.roleBadge} size="xs" />
                {activeConv.participant.isMentor && (
                  <Badge role="Mentor" size="xs" />
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                About Student
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeConv.participant.bio}
              </p>
            </div>

            {/* Skills */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Skills & Tech
              </span>
              <div className="flex flex-wrap gap-1">
                {activeConv.participant.skills.map((s: string) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => viewUserProfile(activeConv.participant.id)}
                className="w-full py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                View Full Campus Profile
              </button>

              <button
                onClick={() => openReportModal('User', activeConv.participant.id, activeConv.participant.name)}
                className="w-full py-2 px-3 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-medium transition-colors"
              >
                Report or Block User
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
