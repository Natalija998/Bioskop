using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Bioskop.Models{
    [Table("Sala")]
    public class Sala
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}
        [Column("Oznaka")]

        [StringLength(60)] 
        [Required(ErrorMessage="Neophodno je uneti naziv sale!")]
        public string Oznaka{get;set;}
        [Column("BrojSedista")]
        public int BrojSedista{get;set;}
        [JsonIgnore]
        public virtual BioskopK Bioskop{get;set;}
        
        public List<FilmSala> FilmSala{get;set;}
        public Sala()
        {
            FilmSala=new List<FilmSala>();
        }

    }
}