const filePathInput = document.getElementById('filePathInput');
const keywordInput = document.getElementById('keywordInput');
const caseSensitiveCheckbox = document.getElementById('caseSensitiveCheckbox');
const outputFileNameInput = document.getElementById('outputFileName');
const processButton = document.getElementById('processButton');
const messageArea = document.getElementById('messageArea');
const downloadArea = document.getElementById('downloadArea');
const downloadLink = document.getElementById('downloadLink');
const filteredContentArea = document.getElementById('filteredContent');
const dropzone = document.getElementById('dropzone');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const keywordError = document.getElementById('keywordError');
const progressBarContainer = document.getElementById('progressBarContainer');
const progressBar = document.getElementById('progressBar');

let selectedFile = null;
let messageTimeout; // Para controlar o tempo das mensagens

const LOCAL_STORAGE_KEYWORD_KEY = 'textLogFilterKeyword';

function loadKeywordFromLocalStorage() {
    const storedKeyword = localStorage.getItem(LOCAL_STORAGE_KEYWORD_KEY);
    if (storedKeyword) {
        keywordInput.value = storedKeyword;
    }
}

function saveKeywordToLocalStorage(keyword) {
    localStorage.setItem(LOCAL_STORAGE_KEYWORD_KEY, keyword);
}

function updateOutputFileName() {
    const keyword = keywordInput.value.trim().replace(/, /g, '-').replace(/,/g, '-');
    if (selectedFile && keyword) {
        const originalFileName = selectedFile.name;
        const parts = originalFileName.split('.');
        const extension = parts.length > 1 ? parts.pop() : 'txt';
        const baseName = parts.join('.');
        outputFileNameInput.value = `${baseName}-filtrado-${keyword}.${extension}`;
    } else {
        outputFileNameInput.value = '';
    }
}

function showMessage(text, type, duration = 5000) { // Adicionado duration para mensagens temporárias
    clearTimeout(messageTimeout); // Limpa qualquer timeout anterior
    messageArea.textContent = text;
    const styles = {
        info: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        processing: 'bg-yellow-100 text-yellow-800 animate-pulse'
    };
    messageArea.className = `text-center p-3 rounded-lg text-sm font-medium ${styles[type] || ''}`;

    // Mensagens de sucesso e info desaparecem após 'duration'
    if (type === 'success' || type === 'info') {
        messageTimeout = setTimeout(() => {
            messageArea.textContent = '';
            messageArea.className = 'text-center p-3 rounded-lg text-sm font-medium min-h-[44px]';
        }, duration);
    }
}

function resetOutput() {
    downloadArea.classList.add('hidden');
    filteredContentArea.value = '';
    messageArea.textContent = '';
    messageArea.className = 'text-center p-3 rounded-lg text-sm font-medium min-h-[44px]';
    keywordError.classList.add('hidden');
    progressBarContainer.classList.add('hidden');
    progressBar.style.width = '0%';
}

function handleFileSelection(file) {
    selectedFile = file;
    resetOutput();
    if (selectedFile) {
        fileNameDisplay.textContent = `Arquivo selecionado: ${selectedFile.name}`;
        showMessage(`Arquivo selecionado: ${selectedFile.name}`, 'info');
        updateOutputFileName();
    } else {
        fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
    }
}

// Event Listeners para a dropzone
dropzone.addEventListener('click', () => filePathInput.click());

dropzone.addEventListener('dragover', (event) => {
    event.preventDefault(); // Necessário para permitir o drop
    dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.classList.remove('dragover');
    if (event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        // Valida o tipo de arquivo
        if (file.name.endsWith('.txt') || file.name.endsWith('.log')) {
            handleFileSelection(file);
        } else {
            showMessage('Por favor, arraste um arquivo .txt ou .log válido.', 'error');
            fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
        }
    }
});


filePathInput.addEventListener('change', (event) => {
    handleFileSelection(event.target.files[0]);
});

keywordInput.addEventListener('input', () => {
    updateOutputFileName();
    saveKeywordToLocalStorage(keywordInput.value.trim());
    // Remove o erro ao digitar
    keywordError.classList.add('hidden');
    keywordInput.classList.remove('border-red-500');
});

processButton.addEventListener('click', async () => {
    if (!selectedFile) {
        showMessage('Por favor, selecione um arquivo primeiro.', 'error');
        return;
    }

    const keywordsRaw = keywordInput.value.trim();
    const keywords = keywordsRaw.split(',').map(k => k.trim()).filter(k => k.length > 0);

    // Validação aprimorada da palavra-chave
    if (keywords.length === 0) {
        showMessage('Por favor, insira pelo menos uma palavra-chave válida para filtrar.', 'error');
        keywordError.classList.remove('hidden');
        keywordInput.classList.add('border-red-500'); // Realça o campo
        return;
    } else {
        keywordError.classList.add('hidden');
        keywordInput.classList.remove('border-red-500');
    }

    showMessage('Processando...', 'processing', 0); // Mensagem de processamento não desaparece
    resetOutput(); // Reset again to clear previous content if any
    progressBarContainer.classList.remove('hidden'); // Mostra a barra de progresso

    const caseSensitive = caseSensitiveCheckbox.checked;

    try {
        // Para arquivos grandes, a leitura pode levar tempo.
        // O `onprogress` do FileReader só funciona com Blob.slice() para simular progresso.
        // A implementação completa de leitura em chunks é mais avançada e foge do escopo de um exemplo simples.
        // Por ora, a barra de progresso é mais simbólica para o tempo de leitura e filtragem.
        const reader = new FileReader();

        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentLoaded = (event.loaded / event.total) * 100;
                progressBar.style.width = `${percentLoaded}%`;
            }
        };

        const fileContent = await new Promise((resolve, reject) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error(`Erro ao ler o arquivo: ${reader.error.message}`));
            reader.readAsText(selectedFile, 'UTF-8');
        });
        
        const lines = fileContent.split(/\r?\n/);
        
        let filteredLines = [];
        if (caseSensitive) {
            filteredLines = lines.filter(line => keywords.some(keyword => line.includes(keyword)));
        } else {
            const lowerCaseKeywords = keywords.map(k => k.toLowerCase());
            filteredLines = lines.filter(line => lowerCaseKeywords.some(keyword => line.toLowerCase().includes(keyword)));
        }
        
        const newFileContent = filteredLines.join('\n');

        filteredContentArea.value = newFileContent;

        if (filteredLines.length === 0) {
            showMessage('Nenhuma linha encontrada com a palavra(s)-chave especificada(s).', 'info');
            progressBarContainer.classList.add('hidden'); // Esconde a barra ao finalizar
            return;
        }

        const blob = new Blob([newFileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        downloadLink.href = url;
        downloadLink.download = outputFileNameInput.value || 'log-filtrado.txt';
        
        showMessage(`${filteredLines.length} linha(s) encontrada(s). Seu arquivo está pronto para download.`, 'success');
        downloadArea.classList.remove('hidden');
        progressBarContainer.classList.add('hidden'); // Esconde a barra ao finalizar

    } catch (error) {
        showMessage(`Ocorreu um erro ao processar o arquivo: ${error.message}`, 'error');
        console.error("Erro no processamento:", error);
        progressBarContainer.classList.add('hidden'); // Esconde a barra em caso de erro
    }
});

// Carregar a palavra-chave salva ao carregar a página
document.addEventListener('DOMContentLoaded', loadKeywordFromLocalStorage);