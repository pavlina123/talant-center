export const WHATSAPP = '77757021109'; // Новый номер
export const PHONE_DISPLAY = '+7 775 702 1109';
export const INSTAGRAM_URL = 'https://www.instagram.com/centertalant';

export const waLink = (text = 'Здравствуйте! Хочу записаться в центр Талант.') =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;