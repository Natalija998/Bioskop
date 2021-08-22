using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System;
namespace Bioskop.Models
{
    public class FilmSala{
        public int ID{get;set;}
        [JsonIgnore]
        public Sala Sala{get;set;}
        public int SalaID{get;set;}
        [JsonIgnore]
        public Film Film{get;set;}
        public int FilmID{get;set;}
        [Column("Termin")]
        public DateTime Termin{get;set;}
    }
}