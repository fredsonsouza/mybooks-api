# Cadastro de livro

**RF**
- Deve ser possível cadastrar um novo livro.


**RN** 
- Não deve ser possível cadastrar um livro com um nome já existente.
- O carro deve ser cadastrado, por padrão, com quantitade maior do que 0.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de livros

**RF** 
- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros disponíveis pelo - nome do genero
- Deve ser possível listar todos os carros disponíveis pelo - nome do livro

**RN**
- O usuário não precisar estar logado no sistema.

# Cadastro de imagens do livro

**RF**
- Deve ser possível cadastrar a imagem do livro

**RNF**
- Utilizar o multer para upload dos arquivos

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o - mesmo livro
- O usuário responsável pelo cadastro deve ser um usuário - administrador.


# Pedido de livro

**RF**
- Deve ser possível cadastrar um pedido


**RN**
- O aluguel deve ter duração mínima de 48 horas.
- Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo usuário
- O usuário deve estar logado na aplicação
- Ao realizar um aluguel, a quantitade de livros deverá ser - decrementada


# Pedido do livro

**RF**
- Deve ser possível realizar o pedido de um livro

**RN**
- Ao realizar a retirada, o usuário deverá ser liberado - para outro aluguel.
- Caso o horário de retirada seja superior ao horário - previsto de retirada, o pedido deve ser cancelado 
- O usuário deve estar logado na aplicação


# Listagem de pedidos para usuário

**RF**
- Deve ser possível realizar a busca de todos os pedidos para o usuário

**RN**
- O usuário deve estar logado na aplicação

<br />
<br />



<!--END_SECTION:footer-->
