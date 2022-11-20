using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Stock
{
    public int Id { get; set; }

    public int? IdProducto { get; set; }

    public int Cantidad { get; set; }

    public bool? Deleted { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Producto? IdProductoNavigation { get; set; }
}
