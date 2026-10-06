/**
 * Café Zéro — Mountain Ambience & Café Sound Engine
 * Provides authentic procedural Web Audio soundscapes:
 * 1. 'mountain' (DEFAULT): Pure Himalayan Ridge Wind, whistling mountain gusts, deep valley air mass, and pine breeze.
 *    (NO coffee steam, NO cup clinks - 100% authentic mountain nature!)
 * 2. 'cafe': Artisan coffeehouse steam, espresso extraction, and warm coffee lounge room tone.
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.soundMode = 'mountain'; // 'mountain' (default) | 'cafe'
    this.volume = 0.65;
    this.nodes = [];
    this.intervals = [];
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener({
      isPlaying: this.isPlaying,
      volume: this.volume,
      soundMode: this.soundMode,
    });
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = {
      isPlaying: this.isPlaying,
      volume: this.volume,
      soundMode: this.soundMode,
    };
    this.listeners.forEach((l) => {
      try {
        l(state);
      } catch (err) {
        console.error('Sound listener error:', err);
      }
    });
  }

  async getContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        throw new Error('Web Audio API is not supported by your browser.');
      }
      this.ctx = new AudioCtx();
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    return this.ctx;
  }

  setSoundMode(mode) {
    if (mode === this.soundMode) return;
    this.soundMode = mode;
    if (this.isPlaying) {
      // Smoothly restart with the new soundscape
      this.stopNodes();
      this.startCurrentSoundscape();
    }
    this.notify();
  }

  async play(mode = null) {
    if (mode && mode !== this.soundMode) {
      this.soundMode = mode;
    }

    try {
      const ctx = await this.getContext();
      if (!ctx) return false;

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      if (this.isPlaying) {
        this.notify();
        return true;
      }

      const now = ctx.currentTime;

      if (!this.masterGain) {
        this.masterGain = ctx.createGain();
        this.masterGain.connect(ctx.destination);
      }

      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, this.volume), now + 0.8);

      this.stopNodes();
      this.startCurrentSoundscape();

      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      console.warn('Could not start sound:', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  startCurrentSoundscape() {
    if (!this.ctx) return;
    if (this.soundMode === 'mountain') {
      this.buildMountainWindSoundscape();
    } else {
      this.buildCoffeeMakingSoundscape();
    }
  }

  /**
   * PURE HIMALAYAN MOUNTAIN WIND SOUNDSCAPE
   * Authentic whistling ridge gusts, deep valley atmosphere, pine needle rustle.
   * Completely free of any kitchen, cup, or machine noises!
   */
  buildMountainWindSoundscape() {
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Pink / Brown Noise Buffer (4 seconds seamless loop)
    const bufferLength = Math.min(ctx.sampleRate * 4, 176400);
    const noiseBuffer = ctx.createBuffer(1, bufferLength, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferLength; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise component for deep wind mass
      lastOut = (lastOut + 0.02 * white) / 1.02;
      // Pink noise component for wind hiss
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.1;
      b6 = white * 0.115926;

      data[i] = lastOut * 0.6 + pink * 0.4;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // --- Sub-layer A: Deep Mountain Air Mass (Sub-rumble 80-140 Hz) ---
    const deepRumbleFilter = ctx.createBiquadFilter();
    deepRumbleFilter.type = 'lowpass';
    deepRumbleFilter.frequency.setValueAtTime(120, now);
    const deepGain = ctx.createGain();
    deepGain.gain.setValueAtTime(0.35, now);

    noiseSource.connect(deepRumbleFilter);
    deepRumbleFilter.connect(deepGain);
    deepGain.connect(this.masterGain);

    // --- Sub-layer B: Whistling Himalayan Ridge Wind (Swept Bandpass with high Q) ---
    // Gust 1 (Lower whistling wind peak)
    const gustFilter1 = ctx.createBiquadFilter();
    gustFilter1.type = 'bandpass';
    gustFilter1.frequency.setValueAtTime(360, now);
    gustFilter1.Q.setValueAtTime(5.2, now); // Whistling characteristic

    const gustLfo1 = ctx.createOscillator();
    gustLfo1.frequency.setValueAtTime(0.08, now); // 12.5s gust cycle
    const gustLfoGain1 = ctx.createGain();
    gustLfoGain1.gain.setValueAtTime(190, now); // Sweeps 170Hz - 550Hz
    gustLfo1.connect(gustLfoGain1);
    gustLfoGain1.connect(gustFilter1.frequency);

    const gustGain1 = ctx.createGain();
    gustGain1.gain.setValueAtTime(0.28, now);

    noiseSource.connect(gustFilter1);
    gustFilter1.connect(gustGain1);
    gustGain1.connect(this.masterGain);

    // Gust 2 (Higher whistling Himalayan mountain air)
    const gustFilter2 = ctx.createBiquadFilter();
    gustFilter2.type = 'bandpass';
    gustFilter2.frequency.setValueAtTime(580, now);
    gustFilter2.Q.setValueAtTime(6.0, now); // Resonant mountain breeze

    const gustLfo2 = ctx.createOscillator();
    gustLfo2.frequency.setValueAtTime(0.05, now); // 20s asynchronous natural swell
    const gustLfoGain2 = ctx.createGain();
    gustLfoGain2.gain.setValueAtTime(260, now); // Sweeps 320Hz - 840Hz
    gustLfo2.connect(gustLfoGain2);
    gustLfoGain2.connect(gustFilter2.frequency);

    const gustGain2 = ctx.createGain();
    gustGain2.gain.setValueAtTime(0.22, now);

    noiseSource.connect(gustFilter2);
    gustFilter2.connect(gustGain2);
    gustGain2.connect(this.masterGain);

    // --- Sub-layer C: Pine Valley Wind Swell (Gentle high mountain whispering air) ---
    const pineFilter = ctx.createBiquadFilter();
    pineFilter.type = 'lowpass';
    pineFilter.frequency.setValueAtTime(800, now);
    const pineGain = ctx.createGain();
    pineGain.gain.setValueAtTime(0.18, now);

    // Swell LFO
    const swellLfo = ctx.createOscillator();
    swellLfo.frequency.setValueAtTime(0.1, now);
    const swellLfoGain = ctx.createGain();
    swellLfoGain.gain.setValueAtTime(0.08, now);
    swellLfo.connect(swellLfoGain);
    swellLfoGain.connect(pineGain.gain);

    noiseSource.connect(pineFilter);
    pineFilter.connect(pineGain);
    pineGain.connect(this.masterGain);

    // Start mountain sources
    noiseSource.start(now);
    gustLfo1.start(now);
    gustLfo2.start(now);
    swellLfo.start(now);

    this.nodes.push(noiseSource, gustLfo1, gustLfo2, swellLfo);

    // --- Sub-layer D: Himalayan Singing Bowl & Ridge Bell (Distinctive High-Altitude Mountain Tone) ---
    const playHimalayanBell = (timeOffset = 0) => {
      if (!this.isPlaying || !this.ctx || this.soundMode !== 'mountain') return;
      try {
        const t = this.ctx.currentTime + timeOffset;
        // Fundamental (432 Hz - meditative mountain frequency)
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(432, t);

        // Overtone shimmer (864 Hz harmonic)
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(864.5, t);

        gain1.gain.setValueAtTime(0.0001, t);
        gain1.gain.exponentialRampToValueAtTime(0.09, t + 0.08);
        gain1.gain.exponentialRampToValueAtTime(0.0001, t + 4.5);

        gain2.gain.setValueAtTime(0.0001, t);
        gain2.gain.exponentialRampToValueAtTime(0.04, t + 0.08);
        gain2.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);

        osc1.connect(gain1);
        gain1.connect(this.masterGain);

        osc2.connect(gain2);
        gain2.connect(this.masterGain);

        osc1.start(t);
        osc1.stop(t + 4.8);
        osc2.start(t);
        osc2.stop(t + 3.5);
      } catch (e) {}
    };

    // Play one gentle bell shortly after start (0.6s) to confirm mountain ambience
    playHimalayanBell(0.6);

    // Periodic gentle mountain singing bowl resonance
    const bellInterval = setInterval(() => {
      playHimalayanBell(0);
    }, 13000);
    this.intervals.push(bellInterval);
  }

  /**
   * ARTISAN COFFEE MAKING & ESPRESSO BAR SOUNDSCAPE
   * Gentle espresso extraction, steam wand hissing, and warm café room tone.
   */
  buildCoffeeMakingSoundscape() {
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const bufferLength = Math.min(ctx.sampleRate * 3, 132300);
    const noiseBuffer = ctx.createBuffer(1, bufferLength, ctx.sampleRate);
    const channel = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferLength; i++) {
      channel[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const steamSource = ctx.createBufferSource();
    steamSource.buffer = noiseBuffer;
    steamSource.loop = true;

    // Steam wand filter (hissing milk frother & coffee extraction)
    const steamFilter = ctx.createBiquadFilter();
    steamFilter.type = 'bandpass';
    steamFilter.frequency.setValueAtTime(1400, now);
    steamFilter.Q.setValueAtTime(1.5, now);

    // Steam swell modulation
    const steamLfo = ctx.createOscillator();
    steamLfo.frequency.setValueAtTime(0.18, now);
    const steamLfoGain = ctx.createGain();
    steamLfoGain.gain.setValueAtTime(0.08, now);
    steamLfo.connect(steamLfoGain);

    const steamGain = ctx.createGain();
    steamGain.gain.setValueAtTime(0.18, now);
    steamLfoGain.connect(steamGain.gain);

    steamSource.connect(steamFilter);
    steamFilter.connect(steamGain);
    steamGain.connect(this.masterGain);

    // Warm café background murmur (low room tone)
    const roomFilter = ctx.createBiquadFilter();
    roomFilter.type = 'lowpass';
    roomFilter.frequency.setValueAtTime(380, now);
    const roomGain = ctx.createGain();
    roomGain.gain.setValueAtTime(0.25, now);

    steamSource.connect(roomFilter);
    roomFilter.connect(roomGain);
    roomGain.connect(this.masterGain);

    steamSource.start(now);
    steamLfo.start(now);

    this.nodes.push(steamSource, steamLfo);

    // Occasional gentle porcelain cup clink every 7-9 seconds
    const triggerCup = () => {
      if (!this.isPlaying || !this.ctx || this.soundMode !== 'cafe') return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1480, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.12, t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.7);
      } catch (e) {}
    };

    const interval = setInterval(triggerCup, 7500);
    this.intervals.push(interval);
  }

  stop() {
    if (!this.isPlaying) return;

    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];

    if (this.masterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      } catch (e) {}
    }

    setTimeout(() => {
      this.stopNodes();
      if (this.ctx && this.ctx.state === 'running') {
        this.ctx.suspend().catch(() => {});
      }
    }, 380);

    this.isPlaying = false;
    this.notify();
  }

  async toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      return await this.play();
    }
  }

  setVolume(newVol) {
    this.volume = Math.max(0.05, Math.min(1, newVol));
    if (this.masterGain && this.ctx && this.isPlaying) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 0.1);
      } catch (e) {}
    }
    this.notify();
  }

  stopNodes() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];

    this.nodes.forEach((node) => {
      try {
        node.stop();
      } catch (e) {}
      try {
        node.disconnect();
      } catch (e) {}
    });
    this.nodes = [];
  }
}

export const soundManager = new SoundManager();
