using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Bioskop.Models{
    [Table("Film")]
    public class Film
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}

        [StringLength(60)] 
        [Required(ErrorMessage="Neophodno je uneti naziv filma!")]
        [Column("Naziv")]
        public string Naziv{get;set;}

        [StringLength(60)] 
        [Required(ErrorMessage="Neophodno je uneti zanr filma!")]
        [Column("Zanr")]
        public string Zanr{get;set;}

        [StringLength(60)] 
        [Column("VremeTrajanja")]
        public int vremeTrajanja{get;set;}

        [StringLength(300)] 
        [Column("Glumci")]
        public string Glumci{get;set;}
        public List<FilmSala> FilmSala {get;set;}
        public Film()
        {
            FilmSala=new List<FilmSala>();
        }
    }
}