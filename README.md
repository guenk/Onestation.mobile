
# Onestation.mobile

Onestation.mobile est une application mobile Pictionary en ligne construite avec Expo et React Native. Cette application permet aux utilisateurs de jouer au Pictionary en temps réel sur leurs appareils mobiles.

## Fonctionnalités

- 🎨 Jeu de Pictionary en temps réel
- 📱 Interface utilisateur moderne et réactive
- 🔒 Authentification des utilisateurs
- 📡 Notifications en temps réel via Socket.io
- 🚀 Compatible avec Android, iOS et le web

## Technologies utilisées

### Frontend

- React Native
- Expo
- Redux
- React Navigation
- Socket.io-client

## Installation

### Prérequis

- Node.js
- npm
- Expo CLI

### Cloner le dépôt

```bash
git clone https://github.com/guenk/onestation.mobile.git
cd onestation.mobile
```

### Installer les dépendances

```bash
npm install
```

### Démarrer l'application

Pour démarrer l'application sur un appareil ou un émulateur Android :

```bash
npm run android
```

Pour démarrer l'application sur un appareil ou un simulateur iOS :

```bash
npm run ios
```

Pour démarrer l'application dans un navigateur web :

```bash
npm run web
```

## Structure du projet

```plaintext
onestation.mobile/
├── assets/
├── components/
├── hooks/
├── navigation/
├── screens/
├── store/
├── utils/
├── App.js
├── app.json
├── babel.config.js
└── package.json
```

## Tests

Pour lancer les tests :

```bash
npm run test
```

## Linting

Pour vérifier la qualité du code avec ESLint :

```bash
npm run lint
```

## Contributions

Les contributions sont les bienvenues. Pour contribuer :

1. **Forkez le projet**
2. **Créez votre branche de fonctionnalité** (`git checkout -b feature/ma-nouvelle-fonctionnalité`)
3. **Commitez vos changements** (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`)
4. **Pushez votre branche** (`git push origin feature/ma-nouvelle-fonctionnalité`)
5. **Ouvrez une Pull Request**

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
