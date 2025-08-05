# 💽 PocketAI: Plug-and-Play Offline AI Assistant on a USB Stick

## Overview
PocketAI is a fully offline AI assistant that runs directly from a USB stick. It uses an open-source language model and provides a simple interface for interacting with an intelligent assistant, completely disconnected from the internet.

## Project Structure
```
PocketAI_USB/
├── models/                  # Quantized GGUF models
├── llama.cpp/              # Precompiled llama.cpp LLM backend
├── server/                 # Node.js + TypeScript backend
├── frontend/               # React frontend (local web UI)
├── run_mac.command         # Launch script for macOS
├── run_win.bat             # Launch script for Windows
├── run_linux.sh            # Launch script for Linux
├── user_data/              # Memory, logs, file summaries (encrypted optional)
```

## How It Works
- Uses `llama.cpp` to run an open-weight LLM offline (e.g. GPT-OSS-20B)
- Node.js handles prompt orchestration, memory, tools
- Local UI served via React or used in CLI
- All user data stays on USB, ensuring full privacy

## Requirements
- Node.js (>=18)
- macOS / Windows / Linux
- At least 16GB RAM (recommended for GPT-OSS-20B)

## Getting Started
1. Plug in the USB stick.
2. Run the appropriate script:
   - `run_mac.command` (macOS)
   - `run_win.bat` (Windows)
   - `run_linux.sh` (Linux)
3. Interact via CLI or local web interface at `http://localhost:3000`

## Future Features
- Bootable OS version
- Offline voice support
- Agent memory, planning, file tools
- Encrypted user data

## License
MIT License for PocketAI.
Apache 2.0 for included open-weight models.

---
Built with ❤️ using open models and open code.