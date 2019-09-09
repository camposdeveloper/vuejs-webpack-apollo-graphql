// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Import's for Apollo 2.0 - GraphQl
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
// Acesse os requests http realizadas com Apollo. Por exemplo para adicionar headers
import { setContext } from 'apollo-link-context';

const middlewareLink = setContext(() => ({
  headers: {
    // authorization: `Bearer ${HOWEVER_I_GET_MY_JWT}`
  }
}));

// Register the VueApollo plugin with Vue.
Vue.use(VueApollo);

const httpLink = new HttpLink({
  uri: `http://localhost:8090//graphql`
})

const link = middlewareLink.concat(httpLink);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

// Configurando o Apollo client
const apolloClient = new ApolloClient({
  // Informe ao Apollo para usar a cadeia de links com o link http configurado
  link,
  // Lida com o cache de queries e mutations
  cache: new InMemoryCache(),
  // Útil se você tiver o Apollo DevTools instalado no seu navegador.
  connectToDevTools: true,
  // Desativar cache
  defaultOptions: defaultOptions,
});

// Informe o Veu e o VueApollo sobre o Apollo Cliente configurado acima
const apolloProvider = new VueApollo({
  // Apollo 2.0 permite vários clientes ativos ao mesmo tempo
  // Aqui selecionamos o cliente padrão (e somente)
  defaultClient: apolloClient,
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // Injete o apolloProvider para os componentes usarem
  provide: apolloProvider.provide()
})
