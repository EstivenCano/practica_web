export default {

  beforeMount() {
    //Carga los marcadores antes de ser llamados por la página.
    this.cargarBookmark();
  },
  data() {

    return {

      //Estado que define si se esta actualizando.
      enEdicion: false,
      //Item global para guardar row.
      item :{},

      //Formulario 
      form: {
        nombre: '',
        url: '',
        categoria: null,
        descripcion: '',
        acciones: true
      },
      
      //Array de marcadores que seran enlistados en la página.
      marcadores: [{}],

      //Array de categoría, opciones disponibles para seleccionar.
      categoria: [{
        text: 'Selecciona la categoria',
        value: null,
        disabled: true
      }, 'Educativo', 'Social', 'Media', 'Juegos','Noticias','Deportes','Otros'],
      show: true
    }
  },
  methods: {

    //Toma los datos del formulario.
    datosFormulario() {

      this.form = {
        nombre: document.getElementById('nombre').value,
        url: document.getElementById('url').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value
      }
      return this.form;
    },

    //Guarda el marcador que fue ingresado en la página.
    guardarMarcador() {
      let url = 'http://localhost:3001/marcadores'
      this.$axios.post(url, this.datosFormulario()).then(respuesta => {
        //Recarga los marcadores de la base de datos.
        alert("Marcador guardado con éxito")
        this.cargarBookmark();
        //Reestablece los campos del formulario.

        this.form.nombre = "";
        this.form.url = "";
        this.form.descripcion = "";
        this.form.categoria = null;
        this.enEdicion = false;
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        })
      }).catch(error => {

      });
    },

    //Elimina el marcador seleccionado. 
    eliminarMarcador({item}) {
      let url = `http://localhost:3001/marcadores/${item.id}`

      var opcion = confirm(`¿Desea eliminar el marcador ${item.nombre}?`);
      if (opcion == true) {
        this.$axios.delete(url, this.datosFormulario()).then(respuesta => {
          this.cargarBookmark();
          alert(`El marcador ${item.nombre} ha sido eliminado`);
        }).catch(error => {});
    } else {
      alert(`La operación ha sido cancelada`);
    }
    },

    //Asigna a las cajas de texto del formulario los valores de la columna seleccionada. 
    modificarMarcador({ item }) {

      this.form.nombre = item.nombre;
      this.form.url = item.url;
      this.form.categoria = item.categoria;
      this.form.descripcion = item.descripcion;
      this.item = item;
      this.enEdicion = true;
    },

    //Actualiza el marcador seleccionado con los datos ingresados en la página.
    actualizarMarcador(){
      
      //Elemento que será el body enviado en el put
      let actualizado ={
        id: this.item.id,
        nombre: document.getElementById('nombre').value,
        url: document.getElementById('url').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value,
        acciones: true
      }

      //Actualiza el elemento con el id ingresado en la url.
      let url = `http://localhost:3001/marcadores/${this.item.id}`
      this.$axios.put(url, actualizado).then(respuesta => {
        //Alerta de éxito.
        alert(`El marcador ${this.item.nombre} ha sido actualizado`);
        //Reestablece el objeto.
        this.item = {};
        //Cambia el estado de edición, y con ello la visibilidad del botón. 
        this.enEdicion = false;
        this.cargarBookmark();
      }).catch(error => {
        //Alerta de error.
        alert(`No pudo actualizarse el marcador, error: ${error}`)
        this.item = {};
        this.enEdicion = false;
      });
      
    },

    //Conexión de API 
    cargarBookmark() {
      let url = 'http://localhost:3001/marcadores';
      this.loading = true;
      //Trae todos los marcadores desde la base de datos.
      this.$axios
        .get(url)
        .then(response => {
          //Asigna los marcadores al array de marcadores global para ser enlistados.
          this.marcadores = response.data.info;
          this.ordenarAsc(this.marcadores,'nombre');
          
        })
        .catch(error => {
          console.log(error);         
        });
        
    },

    //Ordenar array de marcadores para ser enlistados.
    ordenarAsc(p_array_json, p_key) {
      p_array_json.sort(function (a, b) {
         return a[p_key]> b[p_key];
      });
   },
    //Abrir URL del marcador seleccionado.
    irURL({
      item
    }) {
      window.open(item.url, item.nombre);
    },

    //Invoca el método guardarMarcador al llenar formulario.
    onSubmit(evt) {

      evt.preventDefault()  
      this.guardarMarcador();
      
    },

    //Reestablece los valores de los campos de texto del formulario.
    onReset(evt) {
      evt.preventDefault()

      this.show = false
      this.form.nombre = "";
      this.form.url = "";
      this.form.descripcion = "";
      this.form.categoria = null;
      this.enEdicion = false,
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
