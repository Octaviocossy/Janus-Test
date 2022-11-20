using Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TipoProductoController : ControllerBase
    {
        public TestContext db;
        public TipoProductoController(TestContext _db) {
            db = _db;
        }

        [HttpGet]
        public IActionResult GetTipoProducto() {
            try {
                var req = db.TipoProductos.Where(tProducto => tProducto.Deleted == false).ToList();
                return Ok(new { type = "success", value = req });
            }
            catch (Exception exception) {
                return Ok(new { type = "error", value = new { message = $"Error al recuperar tipo de productos: {exception.Message}"} });
            }
        }

        [HttpPost]
        public IActionResult CreateTipoProducto(TipoProducto model) {
            try {
                var verifProducto = db.TipoProductos.Where(tProducto => tProducto.Descripcion == model.Descripcion).ToList();

                if (verifProducto.Count != 0) return Ok(new { type = "alert", value = new { message = "Tipo de producto existente."} });

                TipoProducto tipoProd = new();
                tipoProd = model;
                tipoProd.CreatedAt = DateTime.Now;

                db.TipoProductos.Add(tipoProd);

                db.SaveChanges();

                return Ok(new { type = "success", value = new { message = "Tipo de producto creado correctamente."} });
            } catch (Exception exception) {
                return Ok(new { type = "error", value = new { message = $"Error al crear tipo de producto: {exception.Message}"} });
            }
        }

        [HttpPut]
        public IActionResult EditTipoProducto(TipoProducto model) {
            try {
                var tipoProdReq = db.TipoProductos.Find(model.Id);

                if (tipoProdReq == null) throw new Exception("Tipo de producto no encontrado.");

                tipoProdReq.Descripcion = model.Descripcion;

                var verifProducto = db.TipoProductos.Where(tProducto => tProducto.Descripcion == model.Descripcion).ToList();

                if (verifProducto.Count != 0) return Ok(new { type = "alert", value = new { message = "Tipo de producto existente." } });

                db.SaveChanges();

                return Ok(new { type = "success", value = new { message = "Tipo de producto actualizado correctamente."} });
            } catch (Exception exception) {
                return Ok(new { type = "error", value = new { message = $"Error al actualizar tipo de producto: {exception.Message}"} });
            }
        }

        [HttpDelete]
        public IActionResult DeleteTipoProducto(TipoProducto model) {
            try {
                var tipoProdReq = db.TipoProductos.Find(model.Id);

                if (tipoProdReq == null) throw new Exception("Tipo de producto no encontrado.");

                tipoProdReq.Deleted = true;

                db.SaveChanges();

                return Ok(new { type = "success", value = new { message = "Tipo de producto eliminado con exito."} });

            } catch (Exception exception) {
                return Ok(new { type = "error", value = new { message = $"Error al eliminar tipo de producto: {exception.Message}" } });
            }
        }
    }
}
