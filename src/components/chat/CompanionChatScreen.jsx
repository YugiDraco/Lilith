import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Sparkles, Heart, Volume2, ShieldCheck, ArrowLeft, Image as ImageIcon, Brain, RefreshCw, Bookmark } from 'lucide-react';

export default function CompanionChatScreen({ character, onBackToCreator }) {
  const name = character.identity?.name || 'Lilith Vane';
  const occupation = character.identity?.occupation || 'Specialist';
  const mood = character.emotion?.currentMood || 'Focused & Confident';
  const relStatus = character.relationship?.status || 'Trusted Companion';
  const voiceTone = character.speech?.voiceTone || 'Contralto';

  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'companion',
      text: `Hello there! I'm ${name}. I'm fully online, and our conversation context, memory engine, and live identity lock are active. What would you like to talk about or see today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userText = inputText.trim();
    setInputText('');

    const userMsg = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Call Real REST API Endpoint: POST /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character,
          message: userText,
          history: messages
        })
      });

      const resData = await response.json();
      setIsTyping(false);

      if (resData.success) {
        const companionMsg = {
          id: resData.messageId || `msg_${Date.now()}`,
          sender: 'companion',
          text: resData.text,
          imageAttachment: resData.imageAttachment || null,
          memorySaved: resData.memorySaved || null,
          intent: resData.intent || 'CHAT',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, companionMsg]);
      } else {
        // Fallback error handling
        setMessages(prev => [
          ...prev,
          {
            id: `msg_err_${Date.now()}`,
            sender: 'companion',
            text: `I heard you loud and clear! I'm reflecting on "${userText}" right now.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      console.error('Chat API Error:', err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `msg_err_${Date.now()}`,
          sender: 'companion',
          text: `I'm fully here with you! Let's keep chatting about "${userText}".`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const samplePrompts = [
    "How are you feeling today?",
    "Send me a selfie",
    "Remember my favorite color is emerald green",
    "Show me your outfit"
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-120px)] max-h-[820px] glass-panel rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 border-b border-slate-800 bg-dark-950/80 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCreator}
            className="p-2 rounded-xl bg-dark-900 border border-slate-800 text-slate-400 hover:text-white transition"
            title="Back to Studio Creator"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <h2 className="font-extrabold text-base text-white font-sans flex items-center gap-2">
              {name} <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h2>
            <p className="text-[11px] text-slate-400">{occupation} &bull; Live Real-Time AI Chat</p>
          </div>
        </div>

        {/* Companion HUD Badges */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <div className="bg-dark-900 px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5 text-brand-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" /> {mood}
          </div>
          <div className="bg-dark-900 px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5 text-pink-300">
            <Heart className="w-3.5 h-3.5 text-pink-400" /> {relStatus}
          </div>
        </div>
      </div>

      {/* Messages Scroll Workspace */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 scrollbar-none">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-accent text-white rounded-br-none shadow-lg shadow-brand-500/20'
                  : 'bg-dark-900/95 border border-slate-800 text-slate-100 rounded-bl-none shadow-xl'
              }`}
            >
              <p>{msg.text}</p>

              {/* Inline Generated Photo Attachment */}
              {msg.imageAttachment && (
                <div className="pt-2">
                  <img
                    src={msg.imageAttachment}
                    alt="Companion attachment"
                    className="w-full max-h-64 object-cover rounded-2xl border border-slate-700 shadow-md"
                  />
                  <span className="text-[10px] text-brand-300 font-mono mt-1 block flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-brand-400" /> Identity-Locked Image Synthesized
                  </span>
                </div>
              )}

              {/* Memory Saved Notification */}
              {msg.memorySaved && (
                <div className="bg-brand-500/10 border border-brand-500/30 p-2 rounded-xl text-[11px] text-brand-300 flex items-center gap-2 mt-2">
                  <Brain className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  <span>Memory Stored in Companion Memory Engine</span>
                </div>
              )}

              <span
                className={`text-[9px] font-mono block text-right mt-1 ${
                  msg.sender === 'user' ? 'text-brand-200' : 'text-slate-500'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator Shimmer */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-brand-400 font-sans p-3 bg-dark-900/80 rounded-2xl max-w-xs border border-slate-800"
          >
            <RefreshCw className="w-4 h-4 animate-spin text-brand-400" />
            <span className="animate-pulse font-semibold">{name} is reflecting & generating response...</span>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Messages Bar */}
      <div className="px-4 py-2 bg-dark-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Ideas:</span>
        {samplePrompts.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => setInputText(sample)}
            className="text-[11px] text-slate-300 bg-dark-900 hover:bg-dark-800 border border-slate-800 rounded-xl px-3 py-1 whitespace-nowrap transition"
          >
            "{sample}"
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-dark-950/90 backdrop-blur-md flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message ${name}... (Try "Send me a selfie" or "Remember my birthday")`}
          className="flex-1 bg-dark-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className={`p-3 rounded-2xl transition shadow-lg ${
            inputText.trim() && !isTyping
              ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-accent text-white shadow-brand-500/30 hover:opacity-95'
              : 'bg-dark-900 text-slate-600 border border-slate-800 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
