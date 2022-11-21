using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class VwStockProducto
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public double Precio { get; set; }

    public int IdStock { get; set; }

    public int Cantidad { get; set; }

    public string? Descripcion { get; set; }

    public int IdTipoProducto { get; set; }
}
