import React, { useState, useEffect, useRef } from 'react';
import { ApiBridge } from '../../services/apiBridge';
import { Send, Volume2, Sparkles, Heart, ArrowLeft, RefreshCw, User, ShieldCheck } from 'lucide-react';

export default function CompanionChatScreen({ character, onBackToCreator }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'companion',
      text: `Hello! I'm ${character.identity?.name || 'Lilith'}. It's wonderful to meet you. I'm calibrated and ready to talk!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const name = character.identity?.name || 'Lilith Vane';
  const occupation = character.identity?.occupation || 'Specialist';
  const mood = character.emotion?.currentMood || 'Focused & Confident';
  const relStatus = character.relationship?.status || 'Trusted Partner';
  const voiceTone = character.speech?.voiceTone || 'Contralto';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await ApiBridge.generateLLMResponse(character, userMsg.text);
      setIsTyping(false);
      const companionMsg = {
        id: Date.now() + 1,
        sender: 'companion',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, companionMsg]);
    } catch (err) {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[78vh] flex flex-col glass-panel rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden animate-fadeIn">
      {/* Companion Chat Header HUD */}
      <div className="p-4 bg-dark-900/90 border-b border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCreator}
            className="p-2 rounded-xl bg-dark-800 border border-slate-700 text-slate-400 hover:text-white transition"
            title="Back to Creator"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center text-white font-extrabold text-lg shadow-md">
            {name.charAt(0)}
          </div>

          <div>
            <h3 className="font-extrabold text-base text-white font-sans flex items-center gap-2">
              {name}
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Online
              </span>
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>{occupation}</span> &bull; <span className="text-brand-300 font-semibold">{mood}</span>
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs">
          <div className="bg-dark-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80 text-right">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Voice Tone</span>
            <span className="font-bold text-brand-300 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-brand-400" /> {voiceTone}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-dark-950/60">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[78%] p-3.5 rounded-2xl space-y-1 ${
                  isUser
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-br-none shadow-md shadow-brand-500/20'
                    : 'bg-dark-800/90 border border-slate-700/80 text-slate-100 rounded-bl-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-75 mb-0.5">
                  <span className="font-bold uppercase tracking-wider">
                    {isUser ? 'You' : name}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="text-xs leading-relaxed font-sans">{msg.text}</p>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-dark-800/90 border border-slate-700/80 p-3 rounded-2xl rounded-bl-none text-xs text-brand-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-400" />
              <span>{name} is contemplating response...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSendMessage} className="p-3 bg-dark-900/90 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Message ${name}...`}
          className="flex-1 bg-dark-950 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-accent hover:opacity-95 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-brand-500/25"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </form>
    </div>
  );
}
