import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [thumbnail, setThumbnail] = useState('🎮');
  const [description, setDescription] = useState('');
  const [controlsInput, setControlsInput] = useState('WASD / Arrow Keys, Mouse');
  const [iframeCode, setIframeCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }
    if (!iframeCode.trim()) {
      setError('Please provide an iframe embed code or website URL.');
      return;
    }

    let finalIframeCode = iframeCode.trim();
    if (finalIframeCode.startsWith('http://') || finalIframeCode.startsWith('https://')) {
      finalIframeCode = `<iframe src="${finalIframeCode}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
    } else if (!finalIframeCode.toLowerCase().includes('<iframe')) {
      setError('Input must be a valid <iframe> tag or URL starting with https://');
      return;
    }

    const controls = controlsInput
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const newGame = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      description: description.trim() || 'Custom user added unblocked game.',
      controls: controls.length ? controls : ['Mouse & Keyboard'],
      thumbnail: thumbnail.trim() || '🎮',
      rating: 5.0,
      plays: 1,
      featured: false,
      tags: ['custom', category.toLowerCase()],
      iframeCode: finalIframeCode,
      addedDate: new Date().toISOString(),
    };

    onAddGame(newGame);

    // Reset fields
    setTitle('');
    setDescription('');
    setIframeCode('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-lg">
            <Plus size={22} />
            <span>Add Custom Game to JSON</span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Game Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Geometry Runner"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Sports">Sports</option>
                <option value="Retro">Retro</option>
                <option value="Strategy">Strategy</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Thumbnail Emoji
              </label>
              <input
                type="text"
                placeholder="🎮"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 text-center text-lg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Controls (comma separated)
              </label>
              <input
                type="text"
                placeholder="Arrow Keys, Spacebar to jump"
                value={controlsInput}
                onChange={(e) => setControlsInput(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Short description of the game gameplay..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-zinc-300">
                Iframe Code or Web URL *
              </label>
              <span className="text-[11px] text-zinc-500">
                Paste &lt;iframe ...&gt;&lt;/iframe&gt; or URL
              </span>
            </div>
            <textarea
              rows={4}
              placeholder='<iframe src="https://example.com/game" width="100%" height="100%" frameborder="0"></iframe>'
              value={iframeCode}
              onChange={(e) => setIframeCode(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Plus size={16} /> Save to JSON Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
