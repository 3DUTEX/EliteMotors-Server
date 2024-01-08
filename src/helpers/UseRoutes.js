export default class UseRoutes {
  /**
   * @param {object} app instância do express (app)
   */
  constructor(app) {
    this.app = app;
  }

  /**
   *
   * @param {object} routes Array contendo as rotas a serem utilizadas pelo app
   * @returns void
   */
  use(routes) {
    if (!this.app) { throw Error('A instância do express (app) é obrigatória'); }

    if (!Array.isArray(routes)) { throw TypeError('Routes precisa ser um array'); }

    if (routes.length < 1) { throw Error('Array de rotas não pode estar vazio'); }

    // eslint-disable-next-line no-restricted-syntax
    for (const route of routes) {
      this.app.use(route);
    }
    return null;
  }
}
