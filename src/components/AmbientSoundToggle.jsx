import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sliders, Sparkles, Wind, Coffee } from 'lucide-react';
import { soundManager } from '../lib/soundManager.js';

export default function AmbientSoundToggle({ variant = 'nav', className = '' }) {
  const [isPlaying, setIsPlaying] = useState(soundManager.isPlaying);
  const [volume, setVolume] = useState(soundManager.volume);
  const [soundMode, setSoundMode] = useState(soundManager.soundMode);
  const [showVolumeMenu, setShowVolumeMenu] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setVolume(state.volume);
      setSoundMode(state.soundMode);
    });
    return unsubscribe;
  }, []);

  // Close volume popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowVolumeMenu(false);
      }
    };
    if (showVolumeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showVolumeMenu]);

  const handleToggle = async (e) => {
    e.stopPropagation();
    const willPlay = !isPlaying;
    await soundManager.toggle();

    if (willPlay) {
      setStatusNotice(soundMode === 'mountain' ? 'Playing Mountain Wind & Ridge Mist' : 'Playing Café Coffeehouse Ambience');
      setTimeout(() => setStatusNotice(null), 3000);
    } else {
      setStatusNotice('Sound Muted');
      setTimeout(() => setStatusNotice(null), 2000);
    }
  };

  const handleModeSwitch = async (e, mode) => {
    e.stopPropagation();
    soundManager.setSoundMode(mode);
    setSoundMode(mode);
    if (!isPlaying) {
      await soundManager.play(mode);
    }
    setStatusNotice(mode === 'mountain' ? 'Switched to Himalayan Mountain Wind' : 'Switched to Coffee Brewing Ambience');
    setTimeout(() => setStatusNotice(null), 3000);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    soundManager.setVolume(newVol);
  };

  // =========================================================================
  // ATMOSPHERE / HERO BUTTON VARIANT (Prominent pill design with sound switcher)
  // =========================================================================
  if (variant === 'atmosphere' || variant === 'hero') {
    return (
      <div className={`relative inline-flex flex-col items-center max-w-full px-2 ${className}`}>
        <button
          type="button"
          onClick={handleToggle}
          aria-label={
            isPlaying
              ? `Mute ${soundMode === 'mountain' ? 'Himalayan mountain wind' : 'café coffee'} sound`
              : `Play ${soundMode === 'mountain' ? 'Himalayan mountain wind' : 'café coffee'} sound`
          }
          className={`group flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-[13px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-md max-w-full ${
            isPlaying
              ? 'bg-[#C29B38] text-[#1C1815] shadow-[#C29B38]/30 ring-2 ring-[#C29B38]/40 scale-[1.02]'
              : 'bg-white/15 dark:bg-black/40 text-[#FAF8F5] border border-white/25 hover:bg-white/25 hover:border-white/50'
          }`}
        >
          {isPlaying ? (
            <>
              {/* Animated Equalizer Wave */}
              <div className="flex items-end gap-1 h-3.5 w-3.5 shrink-0">
                <span className="w-0.5 bg-current rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-3.5" />
                <span className="w-0.5 bg-current rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.15s] h-2" />
                <span className="w-0.5 bg-current rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.3s] h-3" />
              </div>
              <span className="truncate">
                {soundMode === 'mountain' ? 'Himalayan Mountain Wind Playing' : 'Coffee Brew Ambience Playing'}
              </span>
              {soundMode === 'mountain' ? <Wind className="w-4 h-4 shrink-0 ml-0.5" /> : <Coffee className="w-4 h-4 shrink-0 ml-0.5" />}
            </>
          ) : (
            <>
              {soundMode === 'mountain' ? (
                <Wind className="w-4 h-4 text-white/80 group-hover:text-white shrink-0" />
              ) : (
                <VolumeX className="w-4 h-4 text-white/80 group-hover:text-white shrink-0" />
              )}
              <span className="truncate">
                {soundMode === 'mountain' ? 'Play Mountain Wind Sound' : 'Play Coffee Making Sound'}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#C29B38] group-hover:scale-110 transition-transform shrink-0" />
            </>
          )}
        </button>

        {/* Soundscape Mode Selector: Mountain Wind vs Coffee Making */}
        <div className="mt-3 flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-md text-[10px] sm:text-[11px] tracking-wider uppercase">
          <button
            type="button"
            onClick={(e) => handleModeSwitch(e, 'mountain')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all cursor-pointer ${
              soundMode === 'mountain'
                ? 'bg-[#C29B38] text-[#1C1815] font-semibold shadow-sm'
                : 'text-white/75 hover:text-white'
            }`}
          >
            <Wind className="w-3 h-3" />
            <span>Mountain Wind</span>
          </button>
          <button
            type="button"
            onClick={(e) => handleModeSwitch(e, 'cafe')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all cursor-pointer ${
              soundMode === 'cafe'
                ? 'bg-[#C29B38] text-[#1C1815] font-semibold shadow-sm'
                : 'text-white/75 hover:text-white'
            }`}
          >
            <Coffee className="w-3 h-3" />
            <span>Coffee Brew</span>
          </button>
        </div>

        {/* Context description */}
        <div className="mt-2 text-[10px] sm:text-[11px] tracking-wider text-white/80 font-light text-center max-w-sm px-2">
          {soundMode === 'mountain'
            ? '5,800 ft Himalayan ridge wind, pine valley breeze & singing bowl chime'
            : 'Artisanal espresso extraction, steam wand & warm coffeehouse tone'}
        </div>
      </div>
    );
  }

  // =========================================================================
  // NAVBAR / COMPACT VARIANT (Responsive for mobile & desktop)
  // =========================================================================
  return (
    <div className={`relative inline-flex items-center ${className}`} ref={menuRef}>
      <button
        onClick={handleToggle}
        type="button"
        title={
          isPlaying
            ? `Mute ${soundMode === 'mountain' ? 'mountain wind' : 'coffee'} sound`
            : `Play ${soundMode === 'mountain' ? 'mountain wind' : 'coffee'} sound`
        }
        aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-[12.5px] tracking-wider uppercase transition-all rounded-sm cursor-pointer border ${
          isPlaying
            ? 'border-[#C29B38]/50 bg-[#C29B38]/10 text-[#C29B38] font-medium shadow-sm'
            : 'border-transparent text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] hover:bg-black/5 dark:hover:bg-white/5'
        }`}
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Waves */}
            <div className="flex items-end gap-[2px] h-3.5 w-3.5 shrink-0">
              <span className="w-[2px] bg-[#C29B38] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3.5" />
              <span className="w-[2px] bg-[#C29B38] rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.2s] h-2" />
              <span className="w-[2px] bg-[#C29B38] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.4s] h-3" />
            </div>
            <span className="hidden md:inline font-semibold">
              {soundMode === 'mountain' ? 'Wind On' : 'Coffee On'}
            </span>
          </>
        ) : (
          <>
            {soundMode === 'mountain' ? (
              <Wind className="w-4 h-4 opacity-75 shrink-0" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-75 shrink-0" />
            )}
            <span className="hidden md:inline font-medium">Sound</span>
          </>
        )}
      </button>

      {/* Mini Settings / Mode Popover Trigger on Right */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowVolumeMenu(!showVolumeMenu);
        }}
        title="Sound Options & Volume"
        aria-label="Sound options and volume"
        className="ml-1 p-1 text-[#78716C] dark:text-[#A8A29E] hover:text-[#C29B38] dark:hover:text-[#C29B38] transition-colors cursor-pointer"
      >
        <Sliders className="w-3 h-3" />
      </button>

      {/* Popover for Sound Modes & Volume */}
      {showVolumeMenu && (
        <div className="absolute right-0 top-full mt-2 z-50 w-52 p-3.5 bg-[#FAF8F5] dark:bg-[#1C1815] border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 shadow-xl rounded-sm space-y-3">
          {/* Sound Mode Switcher */}
          <div>
            <span className="text-[10px] tracking-wider uppercase text-[#78716C] dark:text-[#A8A29E] block mb-1.5 font-medium">
              Sound Mode
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={(e) => handleModeSwitch(e, 'mountain')}
                className={`py-1.5 px-2 text-[10px] tracking-wider uppercase flex items-center justify-center gap-1 border rounded-xs transition-colors cursor-pointer ${
                  soundMode === 'mountain'
                    ? 'bg-[#C29B38] text-[#1C1815] border-[#C29B38] font-semibold'
                    : 'border-[#1C1917]/15 dark:border-[#FAF8F5]/15 text-[#57534E] dark:text-[#D6D3D1] hover:border-current'
                }`}
              >
                <Wind className="w-3 h-3" />
                <span>Mountain</span>
              </button>
              <button
                type="button"
                onClick={(e) => handleModeSwitch(e, 'cafe')}
                className={`py-1.5 px-2 text-[10px] tracking-wider uppercase flex items-center justify-center gap-1 border rounded-xs transition-colors cursor-pointer ${
                  soundMode === 'cafe'
                    ? 'bg-[#C29B38] text-[#1C1815] border-[#C29B38] font-semibold'
                    : 'border-[#1C1917]/15 dark:border-[#FAF8F5]/15 text-[#57534E] dark:text-[#D6D3D1] hover:border-current'
                }`}
              >
                <Coffee className="w-3 h-3" />
                <span>Coffee</span>
              </button>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="pt-2 border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10">
            <div className="flex items-center justify-between text-[10px] tracking-wider uppercase text-[#78716C] dark:text-[#A8A29E] mb-1.5 font-medium">
              <span>Volume</span>
              <span className="font-mono text-[#C29B38]">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume slider"
              className="w-full accent-[#C29B38] cursor-pointer h-1.5 bg-stone-300 dark:bg-stone-700 rounded"
            />
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {statusNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1815] text-[#FAF8F5] dark:bg-[#FAF8F5] dark:text-[#1C1815] px-4 py-2.5 rounded shadow-2xl text-xs flex items-center gap-2 border border-[#C29B38]/40 animate-slideUp">
          <Volume2 className="w-3.5 h-3.5 text-[#C29B38]" />
          <span>{statusNotice}</span>
        </div>
      )}
    </div>
  );
}
