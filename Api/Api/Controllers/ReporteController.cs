using Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReporteController : ControllerBase
    {
        public TestContext db;
        public ReporteController(TestContext _db) {
            db = _db;
        }

        [HttpGet]
        public IActionResult GetReportes() {
            try {
                var reqReporte = db.VwStockProductos.ToList();

                var parseReporte = new List<Reporte>();

                List<StockStatus> StockStatus = new();

                StockStatus.Add(new StockStatus { stock = 0, status = "Sin Stock" });
                StockStatus.Add(new StockStatus { stock = 10, status = "Faltante" });

                foreach (VwStockProducto producto in reqReporte) {

                    string _status = null;

                    foreach (StockStatus item in StockStatus)
                    {
                        if (producto.Cantidad <= item.stock) {
                            _status = item.status;
                            break;
                        } 
                    }

                    Reporte reporte = new()
                    {
                        Id = producto.Id,
                        Nombre = producto.Nombre,
                        Precio = producto.Precio,
                        Cantidad = producto.Cantidad,
                        Descripcion = producto.Descripcion,
                        IdStock = producto.IdStock,
                        IdTipoProducto = producto.IdTipoProducto,
                        precioTotal = producto.Cantidad * (int)producto.Precio,
                        status = _status != null ?  _status : "Suficiente"
                    };

                    parseReporte.Add(reporte);
                }

                return Ok(new { type = "success", value = parseReporte });
            }
            catch (Exception exception) {
                return Ok(new { type = "error", value = new { message = $"Error al recuperar reportes: {exception.Message}"} });
            }
        }
    }
}
