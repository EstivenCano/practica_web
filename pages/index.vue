<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-img
        src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/book-bookmark-icon.png"
        fluid
        alt="Responsive image"
        width="40px"
        heigth="20px"
      ></b-img>
      <b-navbar-brand href="#">Bookmarks</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav> </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <center>
      <b-card
        title="Agregar Bookmarks"
        style="margin-left: 50px; margin-right: 50px; margin-top: 20px;"
      >
        <div>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Nombre de marcador:"
              label-for="input-1"
            >
              <b-form-input
                id="nombre"
                v-model="form.nombre"
                required
                placeholder="Ingresa el nombre del marcador"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="URL:" label-for="input-2">
              <b-form-input
                id="boxUrl"
                type = "url"
                required
                v-model="form.url"
                placeholder="Ingresa la URL del marcador"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Categorias:"
              label-for="input-3"
            >
              <b-form-select
                v-model="form.categoria"
                id="boxCategoria"
                :options="categoria"
                required
              >
              </b-form-select>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Descripcion:"
              label-for="input-4"
            >
              <b-form-input
                id="boxDescripcion"
                required
                v-model="form.descripcion"
                placeholder="Ingresa una descripcion del marcador"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Agregar</b-button>
            <b-button type="reset" variant="danger">Limpiar</b-button>
          </b-form>
        </div>
      </b-card>
    </center>
  </div>
</template>

<script src="@/assets/bookmark.js" />

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
