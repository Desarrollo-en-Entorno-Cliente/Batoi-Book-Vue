<script>

</script>

<template>
     <div id="form">
    <h2 id="formTitle">Añadir libro</h2>
    <form id="bookForm" novalidate>
      <div id="book-id-container">
        <label for="bookId">ID:</label>
        <input type="text" id="bookId" name="bookId" disabled />
      </div>
      <div>
        <label for="moduleCode">Módulo:</label>
        <select id="moduleCode" name="moduleCode" required></select>
        <span class="error"></span>
      </div>
      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher" name="publisher" required minlength="3" />
        <span class="error"></span>
      </div>
      <div>
        <label for="price">Precio:</label>
        <input type="number" id="price" name="price" required min="0" step="0.01" />
        <span class="error"></span>
      </div>
      <div>
        <label for="pages">Páginas:</label>
        <input type="number" id="pages" name="pages" required min="1" />
        <span class="error"></span>
      </div>
      <div>
        <label>Estado:</label>
        <input type="radio" id="status-new" name="status" value="new" required />
        <label for="status-new">Nuevo</label>
        <input type="radio" id="status-good" name="status" value="good" />
        <label for="status-good">Bueno</label>
        <input type="radio" id="status-bad" name="status" value="bad" />
        <label for="status-bad">Malo</label>
        <br>
        <span class="error"></span>
      </div>
      <div>
        <label for="comments">Comentarios:</label>
        <textarea id="comments" name="comments"></textarea>
      </div>
      <div>
        <label for="soldDate">Fecha de venta (opcional):</label>
        <input type="date" id="soldDate" name="soldDate" />
      </div>
      <button type="submit">Guardar</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>