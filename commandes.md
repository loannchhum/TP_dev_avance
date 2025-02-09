# TP Développement avancé

## Installation

Afin de pouvoir faire fonctionner le projet correctement, il sera nécessaire d'exécuter les commandes suivantes :

```
nvm install 22

nvm use 22

nvm alias default 22

corepack enable

corepack prepare pnpm@8 --activate

pnpm corepack use pnpm@8

pnpm install
```

## Lancer l'application

Afin de pouvoir lancer l'application, il faudra en deux temps lancer l'exécution du serveur puis du client comme ceci :

Lancer l'exécution du serveur :

```
pnpm run apps:server:start:dev
```

Puis dans un autre terminal le client :

```
pnpm run apps:client:dev
```

Si vous souhaitez exécuter le lancement du swagger, la commande suivante sera a utiliser :

```
pnpm run docs:swagger:start
```