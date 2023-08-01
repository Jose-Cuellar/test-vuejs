<template>
  <div>
    <div class="content-footer">
      <div class="sections_footer">
        <div class="section_tyc">
          <a href="https://www.facebook.com/04Anonymous" target="_blank">
            <span class="tyc">Términos y condiciones</span>
          </a>
        </div>
        <div class="section_copyright">
          <span class="copyright">© <span id="current_year"></span><span> AgriControl. </span>Todos los derechos reservados.</span>
        </div>
        <div class="section_redes">
          <span>Síguenos</span>
          <a href="https://www.facebook.com/04Anonymous" target="_blank">
            <img class="img_fb" src="../assets/imgs/imgs_redes/facebook.png">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "footerPage",
    data() {
      return {
        year: null,
      };
    },
    methods:{
      showCopyright(){
        this.year = document.querySelector('#current_year');
        this.year.innerHTML = new Date().getFullYear();
      }
    },
    mounted(){
      this.showCopyright();
    }
  }
</script>

<style scoped>
.content-footer{
  width: 100%;
  background-color: #3F2212;
  padding: 10px;
  color: white
}
.sections_footer{
  width: 100%;
  display: flex;
  padding: 5px;
}
.section_tyc a{
  text-decoration: none;
}
.tyc, .copyright{
  color: white
}
.section_tyc, .section_copyright, .section_redes{
  width: 33%;
  margin: auto;
  padding: 2px;
}
.img_fb{
  margin: 0px 0px 0px 10px;
  width: 35px;
  height: 35px;
}
</style>