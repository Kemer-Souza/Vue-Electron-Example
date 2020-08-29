<template>
  <v-container fluid>
      <v-form>
          <v-file-input
           multiple chips 
           v-model="file" 
           label="selecione as Legendas"
          prepend-icon="mdi-message-text" 
          append-outer-icon="mdi-send"
          @click:append-outer="processSubTitles">
          </v-file-input>
      </v-form>
      <div class="pills">
          <Pill v-for='palavra in grupoDePalavras' :key="palavra.name" :name="palavra.name" :mencionada="palavra.mencionada"></Pill>
      </div>
  </v-container>
</template>

<script>
//import  {ipcRenderer} from 'electron' //usado para disparar o evento da interface grafica
import Pill from './Pill'

export default {
    components:{
        Pill
    },
    data:function(){
    
        return{
            file:[],
            grupoDePalavras:[{
                name:'you',
                mencionada:900
            },
            {
                name:'he',
                mencionada:1500
            }]
        }

    },
    methods:{
        processSubTitles(){
            console.log(this.file)
           
            
        }
    }
    

}
</script>

<style>
.pills{
    display: flex;
    flex-wrap: wrap;
}

</style>