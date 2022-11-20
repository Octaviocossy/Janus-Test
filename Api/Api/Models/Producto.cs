using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Producto
{
    public int Id { get; set; }

    public int? IdTipoProducto { get; set; }

    public string? Nombre { get; set; }

    public double Precio { get; set; }

    public bool? Deleted { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual TipoProducto? IdTipoProductoNavigation { get; set; }

    public virtual ICollection<Stock> Stocks { get; } = new List<Stock>();
}
