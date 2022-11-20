using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class TipoProducto
{
    public int Id { get; set; }

    public string? Descripcion { get; set; }

    public bool? Deleted { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Producto> Productos { get; } = new List<Producto>();
}
