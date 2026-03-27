---
title: discrete convolutions
date: 2026-03-27
---

the convolution operation is the foundation of computer vision. it's what allows a neural network to "see" edges, textures, and patterns.

## the sliding window

at its core, a convolution is just a sliding window (a kernel) moving across an input grid. at each step, we perform an element-wise multiplication and sum the results.

if we have an input size N x N and a kernel of size K x K, the output size O for a "valid" convolution (no padding) is:

O = N - K + 1

on the homepage, i've visualized this with an 8x8 input and a 3x3 kernel.

8 - 3 + 1 = 6

this results in a 6x6 output matrix. 

## why it matters

by changing the values inside the 3x3 kernel, we can perform different operations:

- **sharpening**: accentuates the difference between pixels.
- **blurring**: averages neighboring pixels.
- **edge detection**: finds rapid changes in intensity (gradient).

the visualizer on the homepage uses a randomized input and a simplified visual representation of this data flow.
