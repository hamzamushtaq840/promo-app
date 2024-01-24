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
    listWeek: 'List of deals of the week',
    seeAll: 'See all',
    book: 'Book',
    booked: 'Booked',
    promoDetails: 'Promo Details',
    viewAddresses: 'View All Addresses',
    viewLess: 'View Less',
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
    register: 'S\'inscrire',
    fullName: 'Nom complet',
    c1: 'En vous inscrivant, vous acceptez nos',
    c2: 'conditions générales',
    started: "Commencer !",
    ourCategories: 'Nos Catégories',
    home: 'Accueil',
    search: 'Recherche',
    bookings: 'Réservations',
    noBooking: 'Aucune réservation trouvée',
    favourites: 'Favoris',
    noFavourites: 'Aucun favori trouvé',
    update: 'Mettre à jour',
    listWeek: 'Liste des offres de la semaine',
    seeAll: 'Voir tout',
    book: 'Réserver',
    booked: 'Réservé',
    promoDetails: 'Détails de la promotion',
    viewAddresses: 'Voir toutes les adresses',
    viewLess: 'Voir moins',
  },
};


export const i18n = new I18n(translations);
// Set the locale once at the beginning of your app.

i18n.locale = 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';