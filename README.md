# Passo a passo de como iniciar o projeto

Necessário que estejam instalados em máquina o docker e o docker-compose
Use o docker-compose up -d para criar o banco no docker.

Tanto no backend quanto no frontend é necessário estar utilizando a versão do 18 do node.

No backend inicie fazendo as instalações necessárias do com npm install.

Crie um env como mostrado no arquivo .env, basta usar a mesma URL que está descrita no docker-compose.yml.

Use o comando npx prisma migrate dev para criar as tabelas necessárias e em seguida o npx prisma generate para criar o restante da configuração para o prisma.

O backend roda com o comando npm run dev na rota localhost:3333.

Utilize a rota localhost:3333/upload para subir o arquivo data.csv dentro da pasta backend, a rota em questão é do tipo post e é necessário que a subida do arquivo seja através de multipart com o campo sendo chamado de csv. O arquivo em questão possui 10000 linhas.

Com o banco populado, podemos seguir para o frontend. Na pasta em questão utilize npm install para instalar todas as dependências. 

O comando que inicia o front é o npm run dev. 

Certifique-se que as portas para o banco, backend e frontend estão liberadas.

Com todos rodando, o front irá renderizar uma lista de 20 itens no banco. Ainda existe a possibilidade de fazer uma busca especifica a um cnpj ou cpf. O data.csv só possui casos com exemplos que geram valores incosistentes. O sistema deve demosntrar todos eles como vermelho. Caso tenham valores consistentes, o sistema deve não mostra-los em outras cor.

Não consegui preencher todos os itens pedidos devido ao tempo e por serem experiências novas. Com tudo, agradeço a atenção e gostaria de um feedback sobre meu código se for possível.

Muito obrigado.