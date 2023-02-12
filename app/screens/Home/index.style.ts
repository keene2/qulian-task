import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');

export default StyleSheet.create({
  container: {},
  banner: {
    width: win.width,
    height: win.width / 2,
    justifyContent: 'flex-end',
    marginBottom: 94,
  },
  purchaseContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  purchaseContent: {
    justifyContent: 'center',
    paddingLeft: 74,
    height: 80,
  },
  purchaseContentTitle: {
    color: '#1F2126',
  },
  activitiesCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  activitiesCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 10,
    width: (win.width - 30) / 2,
    height: 70,
    backgroundColor: '#fff',
  },
  cardCommon: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  cardCommonShadow: {
    shadowColor: 'rgba(239,233,255,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 6,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
