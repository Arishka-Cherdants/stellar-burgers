import * as orderData from '../fixtures/order.json';
import * as userData from '../fixtures/user.json';

describe('cypress тесты для конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });

  describe('тестирование загрузки ингредиентов', () => {
    it('тестированик сборки бургера', () => {
      cy.request('api/ingredients');
      cy.get(`[data-cy=bun] > .common_button`).eq(0).click();
      cy.get(`[data-cy=main] > .common_button`).eq(1).click();
      cy.get(`[data-cy=main] > .common_button`).eq(4).click();
      cy.get(`[data-cy=sauce] > .common_button`).eq(0).click();

      const assemledBurger = {
        bunTop: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .eq(0),
        mainIngredientFirst: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .eq(1),
        mainIngredientSecond: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .eq(2),
        sauceIngredient: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .eq(3),
        bunBottom: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .eq(4)
      };
      assemledBurger.bunTop.contains('Краторная булка N-200i (верх)');
      assemledBurger.mainIngredientFirst.contains(
        'Филе Люминесцентного тетраодонтимформа'
      );
      assemledBurger.mainIngredientSecond.contains(
        'Хрустящие минеральные кольца'
      );
      assemledBurger.sauceIngredient.contains('Соус Spicy-X');
      assemledBurger.bunBottom.contains('Краторная булка N-200i (низ)');
    });
  });

  describe('тестирование работы модальных окон', () => {
    it('тестирование открытие модального окна ингредиента', () => {
      cy.get(`[data-cy=bun]`).eq(0).click();
      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=modal] h3').contains('Краторная булка N-200i');
    });
    it('тестирование закрытие модального окна по клику на крестик', () => {
      cy.get(`[data-cy=bun]`).eq(0).click();
      cy.get('[data-cy=modal] button svg').click();
      cy.get('[data-cy=modal]').should('not.exist');
    });
    it('тестирование закрытие модального окна по клику на оверлей', () => {
      cy.get(`[data-cy=bun]`).eq(0).click();
      cy.get('[data-cy=modal]')
        .parent()
        .children()
        .last()
        .click({ force: true });
      cy.get('[data-cy=modal]').should('not.exist');
    });
  });

  describe('тестирование создания заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.setCookie('accessToken', userData.accessToken);
      localStorage.setItem('refreshToken', userData.refreshToken);
      cy.intercept('GET', 'api/auth/tokens', {
        fixture: 'user.json'
      });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    });

    it('тестирование сборки, оформления заказа и очистки констурктора', () => {
      cy.get(`[data-cy=bun] > .common_button`).eq(0).click();
      cy.get(`[data-cy=main] > .common_button`).eq(3).click();
      cy.get(`[data-cy=main] > .common_button`).eq(8).click();
      cy.get(`[data-cy=sauce] > .common_button`).eq(3).click();
      cy.get('[data-cy=buttonOrder]').click();

      cy.get('[data-cy=modal] h2').should(
        'contain.text',
        orderData.order.number
      );

      cy.get('[data-cy=modal] button svg').click();
      cy.get('[data-cy=modal]').should('not.exist');

      cy.get('[data-cy=selectTopBun]').contains('Выберите булки');
      cy.get('[data-cy=selectMain]').contains('Выберите начинку');
      cy.get('[data-cy=selectBottomBun]').contains('Выберите булки');
    });
     afterEach(() => {
      cy.clearAllCookies();
      localStorage.removeItem('refreshToken');
    });
  });
});
