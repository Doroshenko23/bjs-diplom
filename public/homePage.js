'use strict' 

const logoutButton = new LogoutButton();

  logoutButton.action = () => {
    ApiConnector.logout(serverData => {
      if (serverData.success) {
        location.reload();
      }
    });
  }

  ApiConnector.current(serverData => {
    if (serverData.success) {
      ProfileWidget.showProfile(serverData.data);
    }
  });


const ratesBoard = new RatesBoard();

  ratesBoard.getCurrencyExchangeRates = function() {
    ApiConnector.getStocks(serverData => {
      if (serverData.success) {
       ratesBoard.clearTable();
       ratesBoard.fillTable(serverData.data);
      }
    });
  } 
ratesBoard.getCurrencyExchangeRates();
setInterval(ratesBoard.getCurrencyExchangeRates(), 60000);


const moneyManager = new MoneyManager();

  function money(result) {
    if (result.success) {
      ProfileWidget.showProfile(result.data);
      moneyManager.setMessage(result.success, 'Операция успешно выполнена');
    } else {
      moneyManager.setMessage(result.success, result.error);
    }
  }
moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, money);
moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, money);
moneyManager.sendMoneyCallback = (data) => piConnector.transferMoney(data, money);


const favoritesWidget = new FavoritesWidget();

  ApiConnector.getFavorites((serverData)=> {
    if (serverData.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(serverData.data);
      favoritesWidget.updateUsersList(serverData.data);
    }
  });

  function addingUser(serverData) {
    if (serverData.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(serverData.data);
      moneyManager.updateUsersList(serverData.data);
      favoritesWidget.setMessage(serverData.success, 'Операция успешно выполнена');
    } else {
      favoritesWidget.setMessage(serverData.success, serverData.error);
    }
  }
favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, addingUser);
favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, addingUser);
    