// src/context/ProjectsContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectsData = [
      {
        id: 1,
        titulo: "Proyecto Alpha",
        descripcion: "Aplicación de gestión de tareas con subtareas y múltiples estados.",
        tests: [
          {
            tipo: "Casos de Prueba",
            titulo: "Casos de Prueba",
            descripcion: "Validar la creación, edición y eliminación de tareas.",
            items: [
              {
                ID: "CP-101",
                titulo: "Creación de Tarea",
                descripcion: "Probar la funcionalidad para crear una nueva tarea.",
                precondiciones: "Usuario con sesión iniciada.",
                pasos: "1. Ingresar datos de la tarea. 2. Guardar.",
                resultadoEsperado: "La tarea se crea exitosamente.",
                resultadoObtenido: "La tarea aparece en la lista con un ID asignado.",
                estado: "Pass",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=101"
                }
              },
              {
                ID: "CP-102",
                titulo: "Edición de Tarea",
                descripcion: "Probar la edición de una tarea existente.",
                precondiciones: "Debe haber una tarea creada.",
                pasos: "1. Seleccionar la tarea. 2. Cambiar campos. 3. Guardar.",
                resultadoEsperado: "Los cambios se reflejan en la tarea.",
                resultadoObtenido: "Se pierden algunos campos al guardar.",
                estado: "Fail",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=102"
                }
              },
              {
                ID: "CP-103",
                titulo: "Eliminar Tarea",
                descripcion: "Probar la funcionalidad para eliminar una tarea.",
                precondiciones: "Debe existir una tarea en la lista.",
                pasos: "1. Seleccionar la tarea. 2. Dar clic en Eliminar.",
                resultadoEsperado: "La tarea se elimina del sistema.",
                resultadoObtenido: "La tarea permanece en la lista.",
                estado: "Fail",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=103"
                }
              }
            ]
          },
          {
            tipo: "Reportes de Bug",
            titulo: "Reportes de Bug",
            descripcion: "Defectos encontrados en la interfaz de tareas.",
            items: [
              {
                ID: "BUG-101",
                titulo: "Error en Filtro",
                descripcion: "El filtro de tareas completadas muestra también tareas no completadas.",
                steps: "1. Marcar tareas como completadas. 2. Activar filtro 'Completadas'.",
                resultadoEsperado: "Solo se muestran tareas completadas.",
                resultadoObtenido: "Aparecen también tareas en estado Pendiente.",
                environment: "Windows 10, Chrome 110",
                severityPriority: "Media / Alta",
                attachments: "",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=999"
                }
              },
              {
                ID: "BUG-102",
                titulo: "Problema de Subtareas",
                descripcion: "Al asignar varias subtareas, algunas no se guardan.",
                steps: "1. Agregar 3 subtareas. 2. Guardar la tarea.",
                resultadoEsperado: "Las 3 subtareas deben aparecer en la tarea.",
                resultadoObtenido: "Solo 2 subtareas se registran.",
                environment: "Windows 11, Edge 110",
                severityPriority: "Media / Media",
                attachments: "",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=998"
                }
              }
            ]
          }
        ]
      },
      {
        id: 2,
        titulo: "Proyecto Beta",
        descripcion: "E-commerce con carrito de compras y sistema de pagos.",
        tests: [
          {
            tipo: "Casos de Prueba",
            titulo: "Casos de Prueba",
            descripcion: "Validar el flujo de compra y la aplicación de cupones.",
            items: [
              {
                ID: "CP-201",
                titulo: "Flujo de Compra Completo",
                descripcion: "Verificar la selección de producto, checkout y pago.",
                precondiciones: "Usuario con sesión iniciada y productos en el catálogo.",
                pasos: "1. Agregar producto al carrito. 2. Realizar checkout. 3. Ingresar datos de pago.",
                resultadoEsperado: "La compra se registra y se descuenta el stock.",
                resultadoObtenido: "El stock no se descuenta.",
                estado: "Fail",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=201"
                }
              },
              {
                ID: "CP-202",
                titulo: "Aplicar Cupón",
                descripcion: "Probar la funcionalidad para cupones de descuento.",
                precondiciones: "Usuario con un cupón válido.",
                pasos: "1. Agregar producto al carrito. 2. Aplicar cupón. 3. Verificar el descuento.",
                resultadoEsperado: "El descuento se refleja en el total.",
                resultadoObtenido: "Se cobra el precio completo.",
                estado: "Fail",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=202"
                }
              },
              {
                ID: "CP-203",
                titulo: "Cancelar Pedido",
                descripcion: "Verificar la cancelación antes de confirmar el pago.",
                precondiciones: "Pedido en estado pendiente.",
                pasos: "1. Seleccionar 'Cancelar'. 2. Confirmar la cancelación.",
                resultadoEsperado: "Pedido se marca como cancelado.",
                resultadoObtenido: "El pedido sigue activo.",
                estado: "Fail",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=203"
                }
              }
            ]
          },
          {
            tipo: "Pruebas API",
            titulo: "Pruebas API",
            descripcion: "Endpoints de productos y checkout.",
            items: [
              {
                ID: "API-201",
                titulo: "Obtener Productos",
                descripcion: "Probar el endpoint GET /products para listar productos.",
                method: "GET",
                endpoint: "/products",
                inputData: "Ninguno",
                resultadoEsperado: "Código 200 y lista de productos.",
                resultadoObtenido: "Código 200 y lista vacía.",
                estado: "Warning",
                comments: "Posible problema de conexión a la base de datos.",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=211"
                }
              },
              {
                ID: "API-202",
                titulo: "Checkout",
                descripcion: "Verificar el endpoint POST /checkout para procesar pagos.",
                method: "POST",
                endpoint: "/checkout",
                inputData: "{\"userId\": 123, \"cart\": [{\"productId\": 456, \"quantity\": 2}]}",
                resultadoEsperado: "Código 200 y confirmación de compra.",
                resultadoObtenido: "Código 500, error interno.",
                estado: "Fail",
                comments: "El servidor lanza excepción al calcular impuestos.",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=212"
                }
              },
              {
                ID: "API-203",
                titulo: "Historial de Compras",
                descripcion: "GET /orders para listar compras del usuario.",
                method: "GET",
                endpoint: "/orders",
                inputData: "userId=123",
                resultadoEsperado: "Código 200 y array de compras.",
                resultadoObtenido: "Código 200 pero array vacío.",
                estado: "Warning",
                comments: "Pendiente revisar base de datos de órdenes.",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=213"
                }
              }
            ]
          },
          {
            tipo: "Pruebas de Rendimiento",
            titulo: "Pruebas de Rendimiento",
            descripcion: "Evaluar la velocidad de carga en el checkout.",
            items: [
              {
                ID: "PERF-201",
                titulo: "Checkout Bajo Carga",
                descripcion: "Medir el tiempo de respuesta al procesar 50 compras simultáneas.",
                metric: "Tiempo de Respuesta",
                value: "2.2s",
                threshold: "2s",
                estado: "Warning",
                comments: "Se requiere optimización del endpoint /checkout.",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=220"
                }
              },
              {
                ID: "PERF-202",
                titulo: "Carga de Página Principal",
                descripcion: "Medir tiempo de carga con 100 usuarios concurrentes.",
                metric: "Tiempo de Carga",
                value: "3.0s",
                threshold: "2.5s",
                estado: "Fail",
                comments: "Necesaria optimización de recursos estáticos.",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=221"
                }
              }
            ]
          }
        ]
      },
      {
        id: 3,
        titulo: "Proyecto Gamma",
        descripcion: "Aplicación móvil para seguimiento de rutinas de ejercicio.",
        tests: [
          {
            tipo: "Casos de Prueba",
            titulo: "Casos de Prueba",
            descripcion: "Validar la creación de rutinas y el registro de progreso.",
            items: [
              {
                ID: "CP-301",
                titulo: "Crear Rutina",
                descripcion: "Probar la creación de una nueva rutina de ejercicio.",
                precondiciones: "Usuario con perfil deportivo.",
                pasos: "1. Configurar nueva rutina. 2. Guardar.",
                resultadoEsperado: "La rutina aparece en la lista.",
                resultadoObtenido: "Se registra correctamente.",
                estado: "Pass",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=301"
                }
              },
              {
                ID: "CP-302",
                titulo: "Editar Rutina",
                descripcion: "Cambiar la duración o ejercicios en la rutina.",
                precondiciones: "Debe existir una rutina creada.",
                pasos: "1. Seleccionar rutina. 2. Modificar datos. 3. Guardar.",
                resultadoEsperado: "Los cambios se guardan.",
                resultadoObtenido: "Se pierde la configuración previa.",
                estado: "Fail",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=302"
                }
              }
            ]
          },
          {
            tipo: "Reportes de Bug",
            titulo: "Reportes de Bug",
            descripcion: "Defectos encontrados en la versión móvil iOS.",
            items: [
              {
                ID: "BUG-301",
                titulo: "Crash al Iniciar",
                descripcion: "La app se cierra al iniciarse en dispositivos iPhone 8.",
                steps: "1. Abrir la app en iPhone 8. 2. Esperar 5 seg.",
                resultadoEsperado: "La app se muestra normalmente.",
                resultadoObtenido: "Ocurre un crash inmediato.",
                environment: "iOS 14 en iPhone 8",
                severityPriority: "Alta / Alta",
                attachments: "",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=303"
                }
              },
              {
                ID: "BUG-302",
                titulo: "Notificaciones no llegan",
                descripcion: "Las notificaciones push no se muestran en iOS.",
                steps: "1. Configurar notificación. 2. Esperar hora programada.",
                resultadoEsperado: "La notificación se muestra.",
                resultadoObtenido: "No se recibe ninguna alerta.",
                environment: "iOS 15 en iPhone 12",
                severityPriority: "Media / Alta",
                attachments: "",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=304"
                }
              },
              {
                ID: "BUG-303",
                titulo: "Sincronización Parcial",
                descripcion: "Los datos no se sincronizan en segundo plano.",
                steps: "1. Minimizar app. 2. Revisar datos en el servidor.",
                resultadoEsperado: "La info se actualiza incluso en segundo plano.",
                resultadoObtenido: "Se requiere que la app esté abierta.",
                environment: "iOS 14, iPhone XR",
                severityPriority: "Media / Media",
                attachments: "",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=305"
                }
              }
            ]
          }
        ]
      },
      {
        id: 4,
        titulo: "Proyecto Delta",
        descripcion: "Plataforma de streaming con reproductor de video y búsquedas avanzadas.",
        tests: [
          {
            tipo: "Casos de Prueba",
            titulo: "Casos de Prueba",
            descripcion: "Validar la reproducción de videos y la función de búsqueda.",
            items: [
              {
                ID: "CP-401",
                titulo: "Reproducir Video",
                descripcion: "Probar que un video se reproduzca correctamente al seleccionarlo.",
                precondiciones: "Debe haber videos disponibles en el catálogo.",
                pasos: "1. Seleccionar un video. 2. Dar play.",
                resultadoEsperado: "El video inicia reproducción sin cortes.",
                resultadoObtenido: "El video tarda 10 seg en iniciar.",
                estado: "Warning",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=401"
                }
              },
              {
                ID: "CP-402",
                titulo: "Búsqueda de Series",
                descripcion: "Verificar que las series se encuentren correctamente al usar la barra de búsqueda.",
                precondiciones: "Usuario con suscripción activa.",
                pasos: "1. Ingresar el nombre de la serie en la barra. 2. Buscar.",
                resultadoEsperado: "Aparecen los resultados relevantes.",
                resultadoObtenido: "Se muestran resultados irrelevantes mezclados.",
                estado: "Fail",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=402"
                }
              },
              {
                ID: "CP-403",
                titulo: "Agregar a Favoritos",
                descripcion: "Probar la funcionalidad de marcar una serie como favorita.",
                precondiciones: "Usuario con cuenta activa.",
                pasos: "1. Seleccionar la serie. 2. Clic en 'Agregar a favoritos'.",
                resultadoEsperado: "La serie aparece en la sección de favoritos.",
                resultadoObtenido: "No se añade a la lista.",
                estado: "Fail",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=403"
                }
              }
            ]
          }
        ]
      },
      {
        id: 5,
        titulo: "Proyecto Epsilon",
        descripcion: "Sistema de control de inventarios en almacenes automatizados.",
        tests: [
          {
            tipo: "Reportes de Bug",
            titulo: "Reportes de Bug",
            descripcion: "Incidencias detectadas en la actualización de stock.",
            items: [
              {
                ID: "BUG-501",
                titulo: "Stock Duplicado",
                descripcion: "El stock se incrementa el doble al procesar una sola orden.",
                steps: "1. Procesar una orden de entrada de 10 items. 2. Verificar el stock.",
                resultadoEsperado: "El stock aumenta en 10.",
                resultadoObtenido: "El stock aumenta en 20.",
                environment: "Chrome 112 en Windows 11",
                severityPriority: "Media / Media",
                attachments: "",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=501"
                }
              },
              {
                ID: "BUG-502",
                titulo: "Movimientos no registrados",
                descripcion: "Los movimientos de inventario no aparecen en el historial.",
                steps: "1. Realizar 3 movimientos de entrada. 2. Revisar historial.",
                resultadoEsperado: "Aparecen los movimientos con fecha y hora.",
                resultadoObtenido: "Solo aparece el más reciente.",
                environment: "Windows 10, Edge 111",
                severityPriority: "Media / Alta",
                attachments: "",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=502"
                }
              }
            ]
          },
          {
            tipo: "Pruebas API",
            titulo: "Pruebas API",
            descripcion: "Endpoints para gestionar la entrada y salida de productos.",
            items: [
              {
                ID: "API-501",
                titulo: "Registrar Entrada",
                descripcion: "Verificar que el endpoint POST /entradas registre correctamente.",
                method: "POST",
                endpoint: "/entradas",
                inputData: "{\"productoId\": 123, \"cantidad\": 10}",
                resultadoEsperado: "Código 200 y confirmación de registro.",
                resultadoObtenido: "Código 500, error de servidor.",
                estado: "Fail",
                comments: "El servidor lanza un error de sintaxis SQL.",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=503"
                }
              },
              {
                ID: "API-502",
                titulo: "Listar Inventario",
                descripcion: "GET /inventory debe retornar la lista de productos con sus cantidades.",
                method: "GET",
                endpoint: "/inventory",
                inputData: "",
                resultadoEsperado: "Código 200 y array de productos.",
                resultadoObtenido: "Código 200 pero array vacío.",
                estado: "Warning",
                comments: "",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=504"
                }
              },
              {
                ID: "API-503",
                titulo: "Registrar Salida",
                descripcion: "POST /salidas para retirar productos del stock.",
                method: "POST",
                endpoint: "/salidas",
                inputData: "{\"productoId\": 789, \"cantidad\": 5}",
                resultadoEsperado: "Código 200 y confirmación de salida.",
                resultadoObtenido: "Código 403, permiso denegado.",
                estado: "Fail",
                comments: "Faltan roles de usuario.",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=505"
                }
              }
            ]
          }
        ]
      },
      {
        id: 6,
        titulo: "Proyecto Zeta",
        descripcion: "Aplicación web para encuestas y votaciones en tiempo real.",
        tests: [
          {
            tipo: "Casos de Prueba",
            titulo: "Casos de Prueba",
            descripcion: "Verificar la creación y participación en encuestas.",
            items: [
              {
                ID: "CP-601",
                titulo: "Crear Encuesta",
                descripcion: "Probar la funcionalidad para crear una encuesta con preguntas múltiples.",
                precondiciones: "Usuario con rol 'organizador'.",
                pasos: "1. Crear encuesta. 2. Agregar preguntas. 3. Publicar.",
                resultadoEsperado: "La encuesta queda visible para los votantes.",
                resultadoObtenido: "Funciona correctamente.",
                estado: "Pass",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=601"
                }
              },
              {
                ID: "CP-602",
                titulo: "Votar Encuesta",
                descripcion: "Probar que los usuarios puedan votar sin problemas.",
                precondiciones: "Encuesta publicada y usuario con rol 'votante'.",
                pasos: "1. Seleccionar encuesta. 2. Escoger opción. 3. Confirmar voto.",
                resultadoEsperado: "El voto se registra correctamente.",
                resultadoObtenido: "Voto no se refleja en resultados.",
                estado: "Fail",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=602"
                }
              },
              {
                ID: "CP-603",
                titulo: "Ver Resultados",
                descripcion: "Mostrar el total de votos en tiempo real.",
                precondiciones: "Encuesta con al menos 5 votos.",
                pasos: "1. Ir a la sección de resultados. 2. Ver estadísticas.",
                resultadoEsperado: "Datos en tiempo real.",
                resultadoObtenido: "Información desactualizada.",
                estado: "Warning",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=603"
                }
              }
            ]
          },
          {
            tipo: "Pruebas de Rendimiento",
            titulo: "Pruebas de Rendimiento",
            descripcion: "Evaluar la respuesta en tiempo real para 100 usuarios concurrentes.",
            items: [
              {
                ID: "PERF-601",
                titulo: "Votación Masiva",
                descripcion: "Medir el tiempo de procesamiento cuando 100 usuarios emiten voto simultáneamente.",
                metric: "Tiempo de Respuesta",
                value: "2.5s",
                threshold: "2s",
                estado: "Warning",
                comments: "Posible cuello de botella en la base de datos.",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=604"
                }
              },
              {
                ID: "PERF-602",
                titulo: "Carga de Página de Resultados",
                descripcion: "Verificar que la página se mantenga estable con 200 usuarios concurrentes.",
                metric: "Tiempo de Carga",
                value: "3.2s",
                threshold: "2.5s",
                estado: "Fail",
                comments: "Optimizar consultas y caché.",
                evidencia: {
                  imagen: "https://picsum.photos/640/480?random=605"
                }
              }
            ]
          }
        ]
      }
    ];

    setProjects(projectsData);
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
