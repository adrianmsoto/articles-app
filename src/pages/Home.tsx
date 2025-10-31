const Home = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">Articles App</h2>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">
          ✅ Funcionalidades Implementadas
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Listado de artículos</li>
          <li>Paginación</li>
          <li>Filtros por categoria</li>
          <li>Crear y editar artículos</li>
          <li>Ver detalle de un artículo</li>
          <li>Calificar artículos</li>
          <li>Agregar artículos a favoritos en localStorage</li>
          <li>Categorías y subcategorías de artículos con filtros</li>
          <li>Eliminar artículos</li>
          <li>Test</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Estado y Arquitectura</h2>
        <div className="list-disc list-inside space-y-1 ">
          <li>
            React Query: manejo de estado del servidor (fetch, cache, rating,
            categorías)
          </li>
          <li>Arquitectura tipo vertical slice + hexagonal</li>
          <li>
            Separación clara entre lógica de dominio y adaptadores (HTTP,
            almacenamiento, UI)
          </li>
          <li>React Router con rutas anidadas</li>
          <li>Redux: para controlar theme</li>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Pruebas y Calidad</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Jest: pruebas unitarias e integración (Redux + React Query)</li>
          <li>Cypress: pruebas E2E con casos de éxito y edge cases</li>
          <li>Manejo de errores: red, artículos inexistentes, timeouts</li>
          <li>Código legible, consistente y documentado</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Objetivo</h2>
        <p>
          Proyecto listo para mostrar en entrevistas: incluye todas las
          funcionalidades básicas y avanzadas de gestión de artículos, siguiendo
          buenas prácticas de React, Redux, React Query y pruebas.
        </p>
      </section>
    </div>
  );
};

export default Home;
