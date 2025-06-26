---

# TextLogFilter: Uma Ferramenta Simples para Filtrar Logs no Navegador

---

O **TextLogFilter** é uma aplicação web leve e intuitiva projetada para ajudar você a filtrar rapidamente linhas em arquivos de texto (`.txt` ou `.log`) diretamente no seu navegador. Com uma interface limpa e funcionalidades úteis, você pode extrair informações importantes de seus logs sem precisar de ferramentas complexas ou enviar seus arquivos para servidores externos, garantindo total **privacidade** e **segurança**.

---

## Funcionalidades

* **Seleção de Arquivo Conveniente**:
    * **Upload Tradicional**: Escolha seus arquivos `.txt` ou `.log` usando o seletor de arquivos padrão.
    * **Arrastar e Soltar (Drag-and-Drop)**: Simplesmente arraste e solte seu arquivo diretamente na área designada para carregá-lo.
* **Filtragem por Palavra(s)-Chave**:
    * Insira uma única palavra-chave ou múltiplas palavras-chave separadas por vírgula (ex: `ERROR, WARNING, INFO`). A ferramenta buscará linhas que contenham *qualquer uma* das palavras-chave fornecidas.
* **Controle de Sensibilidade a Maiúsculas/Minúsculas**:
    * Decida se a filtragem deve diferenciar maiúsculas e minúsculas com um simples checkbox.
* **Pré-visualização do Conteúdo Filtrado**:
    * Visualize o resultado da filtragem em uma caixa de texto dedicada antes de baixar o arquivo.
* **Download Direto do Arquivo Filtrado**:
    * Baixe o conteúdo filtrado como um novo arquivo de texto, com um nome de arquivo sugerido automaticamente com base no arquivo original e nas palavras-chave usadas.
* **Feedback ao Usuário**:
    * Mensagens claras de status, sucesso e erro, algumas das quais desaparecem automaticamente para não poluir a interface.
    * Barra de progresso visual durante o carregamento e processamento do arquivo.
* **Persistência da Palavra-Chave**:
    * A última palavra-chave utilizada é salva no seu navegador, então você não precisa digitá-la novamente ao retornar à página.
* **Totalmente no Navegador (Client-Side)**:
    * Seu arquivo nunca sai do seu computador. Todo o processamento é feito localmente, garantindo **privacidade** e **segurança** dos seus dados.

---

## Como Usar

1.  Acesse a aplicação online: [https://viccttor.github.io/TextLogFilter/](https://viccttor.github.io/TextLogFilter/)
2.  **Selecione o Arquivo de Log**: Clique na área "Arraste e solte o arquivo de log aqui ou clique para selecionar" ou arraste e solte seu arquivo `.txt` ou `.log` nessa área.
3.  **Insira a(s) Palavra(s)-Chave**: Digite a palavra ou palavras-chave (separadas por vírgulas) que você deseja encontrar nas linhas do log.
4.  **Ajuste a Sensibilidade**: Marque ou desmarque o checkbox "Diferenciar maiúsculas/minúsculas" conforme sua necessidade.
5.  **Processe o Arquivo**: Clique no botão "Processar Arquivo".
6.  **Visualize e Baixe**: As linhas filtradas aparecerão na caixa de texto abaixo. Se houver resultados, um botão "Baixar Arquivo Filtrado" surgirá para você salvar o novo arquivo em seu computador.

---

## Desenvolvimento

Esta aplicação foi construída com as seguintes tecnologias:

* **HTML5**: Estrutura da página.
* **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
* **JavaScript (Vanilla JS)**: Lógica principal de processamento de arquivos e interatividade da interface.
* **Google Fonts (Inter)**: Para uma tipografia moderna e legível.

---

## Contribuição

Contribuições são bem-vindas! Se você tiver ideias para melhorias, relatar bugs ou quiser adicionar novas funcionalidades, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request* no repositório do GitHub.

---

## Licença

Este projeto está licenciado sob a Licença MIT.

---

Esperamos que o TextLogFilter seja uma ferramenta útil para suas necessidades de análise de logs!