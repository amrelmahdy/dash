import {Image} from 'react-native';



export const home = {
    allProducts: require('./../assets/home/all_products.png'),
    empty: require('./../assets/home/no_products.png'),

};

export const cart = {
    close: require('./../assets/cart/close.png'),
    minus: require('./../assets/cart/minus.png'),
    plus: require('./../assets/cart/plus.png'),
    empty: require('./../assets/cart/empty_cart.png'),
    delete: require('./../assets/cart/delete.png'),
    checked: require('./../assets/cart/selected.png'),
    unchecked: require('./../assets/cart/unselected.png'),
};
export const menu = {
  settings: require('./../assets/menu/settings.png'),
  about: require('./../assets/menu/about_us.png'),
  contact: require('./../assets/menu/contact_us.png'),
  logout: require('./../assets/menu/log_out.png'),
  profile: require('./../assets/menu/emoji.png'),
};
export const contact = {
    contactUs: require('./../assets/contact/contact_us.png'),
    mail: require('./../assets/contact/mail.png'),
    phone: require('./../assets/contact/phone.png'),
    address: require('./../assets/contact/address.png'),
};

export const tabBar = {
  active: {
    Home: require('./../assets/tabbar/home_active.png'),
    Cart: require('./../assets/tabbar/cart_active.png'),
    Notifications: require('./../assets/tabbar/notification_active.png'),
    Menu: require('./../assets/tabbar/menu_active.png'),
    Search: require('./../assets/tabbar/search_active.png'),
  },
  inactive: {
    Home: require('./../assets/tabbar/home_inactive.png'),
    Cart: require('./../assets/tabbar/cart_inactive.png'),
    Notifications: require('./../assets/tabbar/notification_inactive.png'),
    Menu: require('./../assets/tabbar/menu_inactive.png'),
    Search: require('./../assets/tabbar/search_inactive.png'),
  },
};

export const notifications = {
  read: require('./../assets/notifications/inactive_notification_list.png'),
  unread: require('./../assets/notifications/active_notification_list.png'),
  empty: require('./../assets/notifications/no_notifications.png'),
};


export const Images = {
  slogan: require('./../assets/logo/slogan.png'),
  splashBg: require('./../assets/splash.png'),
  //   facebookLogin: require('./../../assets/login/facebook.png'),
  //   twitterLogin: require('./../../assets/login/twitter.png'),
  //   notification: require('./../../assets/notifications/inactive_notification_list.png'),
  //   bullet: require('./../../assets/menu/bullet.png'),
  logoAbout: require('./../assets/about/logo_about_us.png'),
  //   logoTitle: require('./../../assets/home/logo_home.png'),
  //   splash: require('../../assets/splash.png'),
  //   appIcon: require('./../../assets/app-icon.png'),
  no_internet: require('./../assets/no_connection.png'),
  logoSplash: Image.resolveAssetSource(
    require('./../assets/logo/logo_splash.png'),
  ),
  home,
  cart,
  notifications,
  tabBar,
  menu,
  contact
};