import express from 'express';
import { spawn } from 'child_process';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/chat', (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).send({ error: 'Prompt is required' });
    }

    const llamaPath = path.join(__dirname, '..', '..', 'llama.cpp', 'build', 'bin', 'llama-cli');
    const modelPath = path.join(__dirname, '..', '..', 'models', 'gemma-3-4b-it-Q4_K_M.gguf');

    const llamaProcess = spawn(llamaPath, [
        '-m', modelPath,
        '-p', prompt,
        '-n', '256',
        '--ctx-size', '2048',
        '--batch-size', '1024',
        // Add any other required flags here
    ]);

    let output = '';
    llamaProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    llamaProcess.stderr.on('data', (data) => {
        console.error(`llama.cpp stderr: ${data}`);
        output += data.toString();
    });

    llamaProcess.on('exit', (code) => {
        console.log(`llama.cpp process exited with code ${code}`);
        if (code !== 0) {
            console.log('error output: ', output);
            return res.status(500).send({ error: 'Failed to run llama.cpp', details: output });
        }
        console.log('is there any output: ', output);
        res.send({ response: output });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
