# Usa uma imagem oficial do Node
FROM node:20

# Cria o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta (precisa bater com a do seu app)
EXPOSE 3000

# Comando pra rodar a aplicação
CMD ["npm", "start"]
