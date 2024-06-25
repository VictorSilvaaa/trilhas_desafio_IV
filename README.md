
# API Documentação

## **BUSCAR ESTADOS:**

| VERBO | ROTA |Variáveis URL|
|--|--|--|
| GET | /estados |  |

## **BUSCAR CIDADES:**
| VERBO | ROTA |Variáveis URL|
|--|--|--|
| GET | /estados/:uf/cidades | uf→string |


## **CADASTRAR USUÁRIO**
| VERBO | ROTA |Variáveis URL|
|--|--|--|
| POST | /usuarios |  |


-   Exemplo de corpo da requisição:
- `{
        "nome": "João Victor da Silva Sales",
        "email": "victor60651@gmail.com",
        "username": "victor490",
        "data_nascimento": "2023-09-27",
        "genero": "M",
        "estado_id": 10,
        "cidade_id": 635,
        "senha": "99925505"
    }`
    ` 
    

## **REALIZAR LOGIN**
| VERBO | ROTA |Variáveis URL|
|--|--|--|
| POST| /login | |

-   Exemplo de corpo da requisição:
    `{
        "email": "victor60651@gmail.com",
        "senha": "99925505"
    }`