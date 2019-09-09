<template>
  <div>
    
    <h1>{{msg}}</h1>
    
    <div>
      <input type="text" v-model="newString">
      <button @click="adicionarString()">Adicionar String</button>
      <button @click="arrayString = []">Limpar Array String</button>
      <button @click="buscarListString()">Buscar List String</button>
      <br>arrayString: {{arrayString}}
      <br>Response: {{responseString}}
    </div>

    <br>

    <div>
      <input type="number" v-model="newInteger">
      <button @click="adicionarInteger()">adicionar Integer</button>
      <button @click="arrayInteger = []">Limpar Array Integer</button>
      <button @click="buscarListInteger()">Buscar List Integer</button>
      <br>arrayInteger: {{arrayInteger}}
      <br>Response: {{responseInteger}}
    </div>
    
  </div>
</template>

<script>

import gql from 'graphql-tag';

export default {
  name: 'Graphql',
  data () {
    return {
      
      msg: 'Welcome to Vue.js App with GraphQL',
      
      newString: null,
      arrayString: [],
      responseString: null,
      
      newInteger: null,
      arrayInteger: [],
      responseInteger: null,

    }
  },
  methods: {
    adicionarString(){
      this.arrayString.push(this.newString);
    },
    buscarListString(){
      this.$apollo.query({
        query: gql`
        query getListString($arrayString: [String]) {
          getListString(list: $arrayString)
        }`,
        variables: { arrayString: this.arrayString }
      }).then( response => {
        if(response){
          if(response.data){
            console.log("response: ");
            console.log(response.data.getListString);
            this.responseString = response.data.getListString;
          }else if(response.errors){
            console.log("Erro: ");
            console.log(response.errors);
            this.responseString = response.errors;
          }
        }
      })
    },
    adicionarInteger(){
      this.arrayInteger.push(this.newInteger);
    },
    buscarListInteger(){
      this.$apollo.query({
        query: gql`
        query getListInteger($paramArray: [Int]) {
          getListInteger(list: $paramArray)
        }`,
        variables: { paramArray: this.arrayInteger }
      }).then( response => {
        if(response){
          if(response.data){
            console.log("response: ");
            console.log(response.data.getListInteger);
            this.responseInteger = response.data.getListInteger;
          }else if(response.errors){
            console.log("Erro: ");
            console.log(response.errors);
            this.responseInteger = response.errors;
          }
        }
      })
    }
  },
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
