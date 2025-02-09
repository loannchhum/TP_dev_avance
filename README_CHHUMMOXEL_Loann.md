# TP Développement avancé - Elo Ranker

## CHHUM--MOXEL Loann 31A

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

pnpm run libs:ui:build
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

## Liste des implémentations effectuées

#### Création d'un joueur avec les erreurs associées**

Ajout de la fonctionnalité permettant de créer un nouveau joueur. Les erreurs possibles (comme un nom de joueur déjà existant) sont gérées et renvoyées de manière appropriée.

Fichiers de logique ajoutés :

    - apps/realtime-elo-ranker-server/player/src/player.controller.ts
    - apps/realtime-elo-ranker-server/player/src/player.service.ts
    - apps/realtime-elo-ranker-server/player/src/player.module.ts

Fichiers de tests :

    - apps/realtime-elo-ranker-server/player/src/player.service.spec.ts
    - apps/realtime-elo-ranker-server/player/src/player.controller.spec.ts


#### Création d'un match et calcul de l'Elo en conséquence

Ajout de la fonctionnalité permettant de créer un nouveau match entre deux joueurs. Le système calcule automatiquement les nouveaux scores Elo des joueurs en fonction du résultat du match.

    Fichiers de logique ajoutés :

    - apps/realtime-elo-ranker-server/match/src/match.controller.ts
    - apps/realtime-elo-ranker-server/match/src/match.service.ts
    - apps/realtime-elo-ranker-server/match/src/match.module.ts

Fichiers de tests :

    - apps/realtime-elo-ranker-server/match/src/match.service.spec.ts
    - apps/realtime-elo-ranker-server/match/src/match.controller.spec.ts

#### Gestion du ranking après un match

Gestion du classement des joueurs en fonction des nouveaux scores Elo calculés.

    Fichiers de logique ajoutés :

    - apps/realtime-elo-ranker-server/ranking/src/ranking.controller.ts
    - apps/realtime-elo-ranker-server/ranking/src/ranking.service.ts
    - apps/realtime-elo-ranker-server/ranking/src/ranking.module.ts

Fichiers de tests :

    - apps/realtime-elo-ranker-server/ranking/src/ranking.service.spec.ts
    - apps/realtime-elo-ranker-server/ranking/src/ranking.controller.spec.ts

#### Événements permettant de mettre à jour en temps réel

J'ai ajouté d'événements en temps réel pour mettre à jour l'interface utilisateur et les données des joueurs dès qu'un match est terminé ou qu'un joueur est créé. Pour cela, j'ai mis en place des event emitters qui permettent d'émettre les données d'un événement pour que celles-ci soient récupérées par la suite par le controleur associé et que celui-ci puisse réagir en conséquence.

#### Ajouts de tests

J'ai ajouté des tests unitaires et d'intégration pour vérifier le bon fonctionnement des différentes fonctionnalités implémentées. Les tests couvrent la création de joueurs, la création de matchs, le calcul des scores Elo, et la mise à jour du classement. Chaque test vérifie que les résultats attendus sont obtenus et que les erreurs sont correctement gérées.

Les tests peuvent etre lancés en utilisant la commande :

```
pnpm run test
```

Il est important de s'assurer que vous êtes dans le répertoire du serveur avant d'exécuter cette commande.

Fichiers de tests ajoutés :

player:

    - apps/realtime-elo-ranker-server/player/src/player.service.spec.ts
    - apps/realtime-elo-ranker-server/player/src/player.controller.spec.ts

match :

    - apps/realtime-elo-ranker-server/match/src/match.service.spec.ts
    - apps/realtime-elo-ranker-server/match/src/match.controller.spec.ts

ranking :

    - apps/realtime-elo-ranker-server/ranking/src/ranking.service.spec.ts
    - apps/realtime-elo-ranker-server/ranking/src/ranking.controller.spec.ts

## Problèmes rencontrés

### Event emitter pour un match

J'ai eu des difficultés à faire fonctionner l'event emitter d'un match mais celui-ci fonction enfin. Cependant, le nom des joueurs ayant effectué le dernier match ne disparaissent plus sans que je ne réussisse à trouver pourquoi.

### Coverage des tests

Je n'ai pas réussi à faire fonctionner la couverture des tests. Malgré plusieurs tentatives et changements de configurations, les rapports de couverture ne s'affichent pas.

## Point important

J'ai terminé le projet sur mon ordinateur personnel sous Windows. Le projet a bien été retesté et vérifié sur un environnement Linux avant le dépot. Cependant, des dépendances et des fichiers de configuration risques d'avoir été modifiés durant l'implémentation des dernières fonctionnalités.
