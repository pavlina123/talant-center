export const waLink = (text = 'Здравствуйте! Хочу записаться в центр Талант.') =>
  `https://wa.me/77761748387?text=${encodeURIComponent(text)}`;