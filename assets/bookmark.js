export default {

  beforeMount() {
    this.cargarBookmark();
  },
  data() {

    return {

      enEdicion: false,
      item :{},

      form: {
        nombre: '',
        url: '',
        categoria: null,
        descripcion: '',
        acciones: true
      },

      marcadores: [{}],

      categoria: [{
        text: 'Selecciona la categoria',
        value: null,
        disabled: true
      }, 'Educativo', 'Social', 'Media', 'Juegos'],
      show: true
    }
  },
  methods: {

    datosFormulario() {

      this.form = {
        nombre: document.getElementById('nombre').value,
        url: document.getElementById('url').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value
      }
      return this.form;
    },

    guardarMarcador() {
      let url = 'http://localhost:3001/marcadores'
      this.$axios.post(url, this.datosFormulario()).then(respuesta => {
        this.cargarBookmark();
      }).catch(error => {});
    },

    eliminarMarcador({item}) {
      let url = `http://localhost:3001/marcadores/${item.id}`
      this.$axios.delete(url, this.datosFormulario()).then(respuesta => {
        this.cargarBookmark();
      }).catch(error => {});
    },

    modificarMarcador({ item }) {

      this.form.nombre = item.nombre;
      this.form.url = item.url;
      this.form.categoria = item.categoria;
      this.form.descripcion = item.descripcion;
      this.item = item;
      this.enEdicion = true;
    },

    actualizarMarcador(){
      
      let actualizado ={
        id: this.item.id,
        nombre: document.getElementById('nombre').value,
        url: document.getElementById('url').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value,
        acciones: true
      }

      let url = `http://localhost:3001/marcadores/${this.item.id}`
      this.$axios.put(url, actualizado).then(respuesta => {
        alert(`El marcador ${this.item.nombre} ha sido actualizado`);
        this.item = {};
        this.enEdicion = false;
        this.cargarBookmark();
      }).catch(error => {
        alert(`No pudo actualizarse el marcador, error: ${error}`)
        this.item = {};
        this.enEdicion = false;
      });
      
    },


    cargarBookmark() {
      let url = 'http://localhost:3001/marcadores';
      this.loading = true;
      this.$axios
        .get(url)
        .then(response => {
          let marca = response.data.info;
          this.marcadores = marca;
        })
        .catch(error => {
          console.log(error);         
        });
    },

    irURL({
      item
    }) {
      window.open(item.url, item.nombre);
    },

    onSubmit(evt) {

      evt.preventDefault()
      this.guardarMarcador();
      alert(JSON.stringify(this.form))


    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.form.nombre = "";
      this.form.url = "";
      this.form.descripcion = "";
      this.form.categoria = null;
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
