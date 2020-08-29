<template>
  <div class="pill">
      <span class="name">{{name}}</span>
      <span class="mencionada"> {{mencionada}}</span>
  </div>
</template>

<script>
export default {
    props:['name','mencionada']

}
</script>

<style scope>
.pill{
    background-color: rgba(187, 28, 28, 0.808);
    margin: 10px;
    color: white;
    height: 55px;
    border-radius: 30px;
    font-size: 1.0em;
    display: flex;
    align-items: center;
    font-weight: bold;

}
.pill .name{
    margin-left: 13px;
}
.pill .mencionada{
    margin:10px;
    padding: 5px;
    height: 35px;
    width: 35px;
    border-radius: 18px;
    background-color: white;
    font-size: 14px;
    color:rgba(187, 28, 28, 0.808); 
    display: flex;
    justify-content: center; 
    align-items: center;    
}
</style>