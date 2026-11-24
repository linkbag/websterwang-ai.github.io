"""Rebuild Night tide, an original CC0 ambience, with Python's standard library."""

import math
from pathlib import Path
import random
import struct
import wave


def write_tide(path):
    rate = 16000
    duration = 12
    rng = random.Random(130968)
    # Warm both filters before capture. Two broad bands suggest distant surf.
    low, air = 0.0, 0.0
    sample_count = duration * rate
    frames = bytearray()
    for i in range(-rate, sample_count):
        noise = rng.uniform(-1, 1)
        low += 0.047 * (noise - low)
        air += 0.23 * (noise - air)
        if i < 0:
            continue
        turn = math.tau * i / sample_count
        swell = (0.5 + 0.5 * math.cos(2 * turn + 0.8 * math.sin(turn))) ** 1.7
        # The short edge fade removes a click when a player repeats the loop.
        fade = min(1, i / 800, (sample_count - 1 - i) / 800)
        signal = (low * 0.33 + (air - low) * 0.065) * (0.26 + 0.74 * swell)
        frames.extend(struct.pack('<h', round(32767 * signal * fade)))
    with wave.open(str(path), 'wb') as target:
        target.setparams((1, 2, rate, 0, 'NONE', 'not compressed'))
        target.writeframes(frames)


if __name__ == '__main__':
    write_tide(Path(__file__).with_name('night-tide.wav'))
