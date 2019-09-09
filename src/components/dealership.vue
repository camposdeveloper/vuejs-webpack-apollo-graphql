<template>
  <div>
    <h1>{{msg}}</h1>
    <div>
      <input type="text" v-model="temporaryName">
      <button @click="salvar()">Save Address</button>
    </div>
    
    <div><input type="text" v-model="paramId"><button @click="buscar()">Buscar</button></div>
    
    <div>
      <input type="text" v-model="add">
      <button @click="adicionar()">adicionar</button>
      <button @click="buscarListParam()">Buscar List</button>
      paramArray: {{paramArray}}
    </div>

    <div>
      <input type="text" v-model="add">
      <button @click="adicionar()">adicionar</button>
      <button @click="buscarListParamInteger()">Buscar List Integer</button>
      paramArray: {{paramArray}}
    </div>
    
    <div></div>
    
    <p v-if="dealershipGraphQlApi">From GraphQL: {{dealershipGraphQlApi}}</p>

  </div>
</template>

<script>

import gql from 'graphql-tag';

export default {
  name: 'Graphql',
  data () {
    return {
      msg: 'Welcome to Vue.js App with GraphQL',
      temporaryName: '',
      paramId: null,
      paramArray: [],
      add: null
    }
  },
  methods: {
    adicionar(){
      this.paramArray.push(this.add);
    },
    salvar() {
      console.log("Salvando...");
      this.$apollo.mutate({
        mutation: gql`
          mutation ($name: String!) {
            saveAddress(address: {
              type: "Avenida"
              name: $name
              number: 1031
              neighborhood:"Jd D'Abril"
              city: "Osasco"
              state: "SP"
              country: "Brasil"
            }){
              id
              name
            }
          }
        `,
        variables: { name: this.temporaryName }
      }).then(response => {
        // Do stuff with the result.
        console.log(`Address saved. id: ${response.data.saveAddress.id} - name: ${response.data.saveAddress.name}`)
      });
    },
    buscar(){
      this.$apollo.query({
        query: gql`
        query findAddressById ($parametro: Int!) {
          findAddressById(id: $parametro) {
            id name
          }
        }`,
        variables: { parametro: this.paramId },
        
      }).then( response => {
        console.log("response: ")
        console.log(response.data.findAddressById);
      })
    },
    buscarListParam(){
      console.log("this.paramArray: ");
      console.log(this.paramArray);
      this.$apollo.query({
        query: gql`
        query getListString($paramArray: [String]) {
          getListString(list: $paramArray)
        }`,
        variables: { paramArray: this.paramArray }
      }).then( response => {
        console.log("response: ")
        console.log(response.data);
      })
    },
    buscarListParamInteger(){
      console.log("this.paramArray: ");
      console.log(this.paramArray);
      this.$apollo.query({
        query: gql`
        query getListInteger($paramArray: [Int]) {
          getListInteger(list: $paramArray)
        }`,
        variables: { paramArray: this.paramArray }
      }).then( response => {
        console.log("response: ")
        console.log(response.data);
      })
    }
  },
  apollo: {
    dealershipGraphQlApi: {
      query: gql`
        query dealershipQuery {
          findAddress {
            id
            name
            number
          }
        }
      `,
      update: result => result.findAddress,
      // pollInterval: 500,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
