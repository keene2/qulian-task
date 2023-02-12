import PATHS from 'consts/paths';

export const ACTIVITIES_CARD_OPTIONS = [
  {
    title: 'Event Centre',
    subtitle: 'Get FREE 500 USDT',
    source: require('assets/group-icon.png'),
    imageStyle: { width: 30, height: 30 },
    path: PATHS.MarketScreen,
  },
  {
    title: 'Gift Card',
    subtitle: `Go get your BTC`,
    source: require('assets/gold-coin.png'),
    // todo: 切图有问题，应该联系UI调整，为交付效果先兼容
    imageStyle: { width: 40, height: 40, transform: [{ translateX: 8 }] },
    path: PATHS.MarketScreen,
  },
];
