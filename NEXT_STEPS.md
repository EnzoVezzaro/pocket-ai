# NEXT\_STEPS.md

# PocketAI — Build & Setup Instructions (Starting from Empty Folders)

---

## 1. Prepare the `/models` Folder

* **Purpose:** Store your quantized GGUF model files here.

* **How to add models:**

  1. Download a compatible open-weight model in `.gguf` format, for example:

     * [GPT-OSS-20B](https://openai.com/research/gpt-oss)
     * [Mistral 7B](https://huggingface.co/mistralai/Mistral-7B-v0.1) (check for GGUF availability)
  2. Copy the model file(s) into `/models`.

* **Example:**

  ```bash
  cd PocketAI_USB/models
  wget https://example.com/path/to/gpt-oss-20b.gguf
  ```

---

## 2. Prepare the `/llama.cpp` Folder

* **Purpose:** Contains the `llama.cpp` executable and supporting files to run the model locally.

* **How to build `llama.cpp`:**

  1. Clone the repository:

     ```bash
     git clone https://github.com/ggerganov/llama.cpp.git
     cd llama.cpp
     ```

  2. Build the executable:

     * On Linux/macOS:

       ```bash
       make
       ```

     * On Windows (using MSYS2 or Visual Studio):

       Follow instructions on the official repo:
       [https://github.com/ggerganov/llama.cpp#build-and-run](https://github.com/ggerganov/llama.cpp#build-and-run)

  3. Copy the compiled binary and required files into the `/llama.cpp` folder on the USB.

---

## 3. Setup the `/server` Folder (Node.js + TypeScript Backend)

* **Purpose:** Runs a local API server that manages prompts, memory, and interacts with `llama.cpp`.

* **Steps to build:**

  1. Initialize npm project:

     ```bash
     cd PocketAI_USB/server
     npm init -y
     ```

  2. Install dependencies:

     ```bash
     npm install express typescript ts-node @types/node @types/express
     ```

  3. Create a `tsconfig.json` with minimum config:

     ```json
     {
       "compilerOptions": {
         "target": "ES2020",
         "module": "commonjs",
         "outDir": "dist",
         "rootDir": "src",
         "strict": true,
         "esModuleInterop": true,
         "skipLibCheck": true
       }
     }
     ```

  4. Create a basic Express server in `src/index.ts` that spawns `llama.cpp` and exposes endpoints.

  5. Add scripts in `package.json`:

     ```json
     "scripts": {
       "start": "ts-node src/index.ts"
     }
     ```

* **Tip:** Use `child_process.spawn` to call `llama.cpp` with model path and prompt.

---

## 4. Setup the `/frontend` Folder (React UI)

* **Purpose:** Provide a local web interface for chatting with the AI.

* **Steps to build:**

  1. Use `create-react-app` or `Vite` to scaffold React app:

     ```bash
     cd PocketAI_USB/frontend
     npx create-react-app . --template typescript
     ```

  2. Implement a simple chat UI with an input box and display area.

  3. Configure API calls to the backend at `http://localhost:3000`.

---

## 5. Create the `/user_data` Folder

* **Purpose:** Store user-specific data, memory logs, chat history, and optionally encrypted files.

* **Action:** Just keep it as an empty folder for now. Backend code will create/read files here.

---

## 6. Run the System

* From `/server`:

  ```bash
  npm install
  npm run start
  ```

* From `/frontend`:

  ```bash
  npm install
  npm start
  ```

* Open browser at `http://localhost:3000`.

---

## 7. Use the Launch Scripts

* `run_mac.command` for macOS
* `run_win.bat` for Windows
* `run_linux.sh` for Linux

Make sure to give executable permissions on macOS/Linux:

```bash
chmod +x run_mac.command run_linux.sh
```

---

## Helpful Links

* llama.cpp repo & build: [https://github.com/ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)
* GPT-OSS models: [https://openai.com/research/gpt-oss](https://openai.com/research/gpt-oss)
* React docs: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
* Node.js docs: [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
