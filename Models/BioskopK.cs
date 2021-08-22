using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Bioskop.Models{
    [Table("Bioskop")]
    public class BioskopK
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}

        [StringLength(100)] 
        [Required(ErrorMessage="Neophodno je uneti naziv bioskopa!")]
        [Column("Naziv")]
        public string Naziv{get;set;}

        [StringLength(60)] 
        [Required(ErrorMessage="Neophodno je uneti adresu bioskopa!")]
        [Column("Adresa")]
        public string Adresa {get;set;}
        public List<Sala> Sale{get;set;}

    public BioskopK()
    {
        Sale=new List<Sala>();
    }
    }
}