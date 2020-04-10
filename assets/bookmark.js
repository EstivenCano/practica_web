export default {
    data() {
      return {
        form: {
          nombre: '',
          url: '',
          categoria: null,
          descripcion: ''    
        },

        categoria: [{ text: 'Selecciona la categoria', value: null, disabled: true}, 'Educativo', 'Social', 'Media', 'Juegos'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))

      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values

        // Trick to reset/clear native browser form validation state
        this.show = false
        this.form.categoria = null;
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }


function guardarBookmark(params) {
  
  
}