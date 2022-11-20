namespace Api.Models
{
    public class Reporte : VwStockProducto
    {
        public int precioTotal { get; set; }
        public string status  { get; set; }
    }

    public class StockStatus { 
        public int stock { get; set; }
        public string status { get; set; }
    }
}
