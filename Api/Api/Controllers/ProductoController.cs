using Api.Models;
using Api.Models.Parameters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        public TestContext db;
        public ProductoController(TestContext _db) {
            db = _db;
        }

        [HttpGet]
        public IActionResult GetProductos() {
            try {
                var req = db.Productos.Where(producto => producto.Deleted == false).ToList();
                return Ok(new { type = "success", value = req });
            }
            catch (Exception exception) {
                return Ok(new { type = "error", value = new { message = $"Error al recuperar productos: {exception.Message}"} });
            }
        }

        [HttpPost]
        public IActionResult CreateProducto(Param model) {
            try {
                var tipoProdReq = db.TipoProductos.Where(tipo => tipo.Id == model.Producto.IdTipoProducto).ToList();

                if (tipoProdReq.Count == 0) throw new Exception("Tipo de producto no encontrado.");

                Producto newProd = new ();
                newProd = model.Producto;
                newProd.CreatedAt = DateTime.Now;

                db.Productos.Add(newProd);

                db.SaveChanges();

                Stock newStock = new() { 
                    IdProducto = model.Producto.Id,
                    Cantidad = model.Stock.Cantidad,
                    CreatedAt = DateTime.Now
                };

                db.Stocks.Add(newStock);

                db.SaveChanges();

                return Ok(new { type = "success", value = new { message = "Producto creado con exito."} });
            } catch (Exception exception) {
                return Ok(new { type = "error", value = new { message = $"Error al cargar producto: {exception.Message}" } });
            }
        }

        [HttpPut]
        public IActionResult EditProducto(Param model) {
            try {
                var productReq = db.Productos.Find(model.Producto.Id);

                if (productReq == null) throw new Exception("Producto no encontrado.");

                var tipoProdReq = db.TipoProductos.Find(model.Producto.IdTipoProducto);

                if (tipoProdReq == null) throw new Exception("Tipo de producto no encontrado.");

                productReq.IdTipoProducto = model.Producto.IdTipoProducto;
                productReq.Precio = model.Producto.Precio;
                productReq.Nombre = model.Producto.Nombre;

                var stockReq = db.Stocks.Find(model.Stock.Id);

                if (stockReq == null) throw new Exception("Registro de stock no encontrado.");

                stockReq.Cantidad = model.Stock.Cantidad;

                db.SaveChanges();

                return Ok(new { type = "success", value = new { message = "Producto actualizado con exito."} });

            } catch (Exception exception) {
                return Ok(new { type = "error", value = new { message = $"Error al actualizar producto: {exception.Message}" } });
            }
        }

        [HttpDelete]
        public IActionResult DeleteProducto(Param model) {
            try {
                var productReq = db.Productos.Find(model.Producto.Id);

                if (productReq == null) throw new Exception("Producto no encontrado.");

                productReq.Deleted = true;

                var stockReq = db.Stocks.Find(model.Stock.Id);

                if (stockReq == null) throw new Exception("Registro de stock no encontrado.");

                stockReq.Deleted = true;

                db.SaveChanges();

                return Ok(new { type = "success", value = new { message = "Producto eliminado con exito."} });

            } catch (Exception exception) {
                return Ok(new { type = "error", value = new { message = $"Error al eliminar producto: {exception.Message}" } });
            }
        }
    }
}
