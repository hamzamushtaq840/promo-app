import { I18n } from 'i18n-js';

export const translations = {
  en: {
    welcome: 'Welcome Back!',
    name: 'Name',
    language: 'Language',
    emailPlaceholder: 'Email Address',
    passwordPlaceholder: 'Password',
    confirmPasswordPlaceholder: 'Confirm Password',
    forgotPassword: 'Forgot your password?',
    login: 'Login',
    register: 'Register',
    fullName: 'Full Name',
    enterEmail: 'Enter Email',
    c1: 'By registering you agree to our',
    c2: ' Terms and Conditions',
    started: 'Get Started!',
    ourCategories: 'Our Categories',
    home: 'Home',
    search: 'Search',
    bookings: 'Bookings',
    noBooking: 'No bookings found',
    favourites: 'Favourites',
    noFavourites: 'No favourites found',
    update: 'Update',
    logout: 'Logout',
    listWeek: 'List of deals of the week',
    seeAll: 'See all',
    book: 'Book',
    booked: 'Booked',
    promoDetails: 'Promo Details',
    viewAddresses: 'View All Addresses',
    viewLess: 'View Less',
    sendEmail: 'Send Email',
    persons: 'No of persons*',
    bookingDetails: 'Booking Details',
    time: 'Time : ',
    date: 'Date : ',
    selectTime: 'Select Time',
    selectDate: 'Select Date',
    confirm: 'Confirm',
    remarks: 'Remarks',
    flashDeals: 'List of flash deals',
    endingSoon: 'Ending Soon promos',
    randomPromos: 'Random Promos',
    noPromo: 'No promos found',
    addCard: 'Add Card',
    add: 'Add',
    rescan: 'Rescan',
    barCode: 'Bar Code',
    qrCode: 'QR Code',
    appCards: 'App Cards',
    thirdPartyCards: '3rd Party Cards',
    fidelityCards: 'Fidelity Cards',
    tapTo: 'Tap to scan',
    or: 'QR or Barcode',
    cardInfo: 'Card Info',
    noCard1: 'Don’t have any card',
    noCard2: "It’s seems like you don't add any cards. Add card easily in few steps!",
    addNewCard: 'Add New Card',
  },
  fr: {
    welcome: 'Ravi de te revoir!',
    name: 'Nom',
    language: 'Langue',
    emailPlaceholder: 'Adresse e-mail',
    passwordPlaceholder: 'Mot de passe',
    confirmPasswordPlaceholder: 'Confirmer le mot de passe',
    forgotPassword: 'Mot de passe oublié ?',
    login: 'Connexion',
    register: "S'inscrire",
    fullName: 'Nom complet',
    enterEmail: "Entrer l'adresse e-mail",
    c1: 'En vous inscrivant, vous acceptez nos',
    c2: 'conditions générales',
    started: 'Commencer !',
    ourCategories: 'Nos Catégories',
    home: 'Accueil',
    search: 'Recherche',
    bookings: 'Réservations',
    noBooking: 'Aucune réservation trouvée',
    favourites: 'Favoris',
    noFavourites: 'Aucun favori trouvé',
    update: 'Mettre à jour',
    logout: 'Déconnexion',
    listWeek: 'Liste des offres de la semaine',
    seeAll: 'Voir tout',
    book: 'Réserver',
    booked: 'Réservé',
    promoDetails: 'Détails de la promotion',
    viewAddresses: 'Voir toutes les adresses',
    viewLess: 'Voir moins',
    sendEmail: 'Envoyer un e-mail',
    persons: 'Nombre de personnes',
    bookingDetails: 'Détails de la réservation',
    time: "L'heure : ",
    date: 'La date : ',
    selectTime: "Sélectionner l'heure",
    selectDate: 'Sélectionner la date',
    confirm: 'Confirmer',
    remarks: 'Remarques',
    flashDeals: 'Liste des offres éclair',
    endingSoon: 'Promotions se terminant bientôt',
    randomPromos: 'Promos aléatoires',
    noPromo: 'Aucune promotion trouvée',
    addCard: 'Ajouter une carte',
    add: 'Ajouter',
    rescan: 'Rescanner',
    barCode: 'Code-barres',
    qrCode: 'Code QR',
    appCards: "Cartes d'application",
    thirdPartyCards: 'Cartes tierces',
    fidelityCards: 'Cartes de fidélité',
    tapTo: 'Appuyez pour scanner',
    or: 'QR ou code-barres',
    cardInfo: 'Informations sur la carte',
    noCard1: "Vous n'avez aucune carte",
    noCard2:
      "Il semble que vous n'ayez ajouté aucune carte. Ajoutez facilement une carte en quelques étapes !",
    addNewCard: 'Ajouter une nouvelle carte',
  },
};

export const i18n = new I18n(translations);
// Set the locale once at the beginning of your app.

i18n.locale = 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';
