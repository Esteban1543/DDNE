
# DDNE | Gestion de Inventario y documentos

Este README describe el proceso para configurar tu entorno de desarrollo y incializar enfocado en Ubuntu, para trabajar con Docker


## Instalacion

1. Instalar Docker

```
    sudo apt update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
```

```
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
        $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt-get update
```

```
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```


 - [Docker Instalacion oficial](https://docs.docker.com/engine/install/ubuntu/)


## Inicializacion

1. Por primera vez

```
    docker compose up --build;

```

2. Segunda vez
   
```
    docker compose up
```
