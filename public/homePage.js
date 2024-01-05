'use strict' 

const logoutButton = new LogoutButton();

  logoutButton.action = () => {
    ApiConnector.logout(serverData => {
      if (serverData.success == true) {
        location.reload();
      }
    });
  }

  ApiConnector.current(serverData => {
    if (serverData.success == true) {
      ProfileWidget.showProfile(serverData.data);
    }
  });


const ratesBoard = new RatesBoard();

 const ratesInterval = setInterval(() => {
   if (serverData) {
     ratesBoard.clearTable();
     ratesBoard.fillTable(serverData.data);
   }
 }, 60000);
ratesInterval();


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, result => {
    if (result) {
      moneyManager.showProfile();
      moneyManager.setMessage('Успех');
    } else {
      moneyManager.setMessage('Ошибка');
    }
  });
}
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, result => {
    if (result) {
      moneyManager.showProfile();
      moneyManager.setMessage('Успех');
    } else {
      moneyManager.setMessage('Ошибка');
    }
  });
}


let favoritesWidget = new FavoritesWidget();

  ApiConnector.getFavorites((serverData)=> {
    if (serverData) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(serverData);
      favoritesWidget.updateUsersList(serverData);
    }
  });

  favoritesWidget.addUserCallback = (user) => {
    ApiConnector.addUserToFavorites(user, result => {
      if (result) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result);
        favoritesWidget.setMessage('Пользователь успешно добавлен в избранное');
      } else {
        favoritesWidget.setMessage(result.error);
      }
    });
  }

  favoritesWidget.removeUserCallback = (user) => {
    ApiConnector.removeUserFromFavorites(user, result => {
      if (result) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result);
        favoritesWidget.setMessage('Пользователь успешно удален из избранного');
      } else {
        favoritesWidget.setMessage(result.error);
      }
    });
  }
