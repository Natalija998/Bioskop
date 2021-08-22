using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Bioskop.Models;
using Microsoft.EntityFrameworkCore;

namespace Bioskop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BioskopController:ControllerBase
    {
        public BioskopContext Context{get;set;}
        public BioskopController(BioskopContext context)
        {
            Context=context;
        }
        [HttpGet]
        [Route("PreuzmiBioskop")]
         public async Task<JsonResult> GetBioskop()
       {
           var bioskop=await Context.Bioskopi.Include(x=>x.Sale).ToListAsync();
           return new JsonResult(bioskop);
        }

        [HttpPost]
        [Route("DodajBioskop")]
        public async Task AddBioskop(BioskopK bioskop)
        {
           Context.Bioskopi.Add(bioskop);
            await Context.SaveChangesAsync();
        }
        [HttpDelete]
        [Route("ObrisiBioskop/{id}")]
        public async Task DeleteBioskop(int id)
        {
            
            var bioskop=await Context.Bioskopi.FindAsync(id);
            var sale=await Context.Sale.Where(x=>x.Bioskop==bioskop).ToListAsync();
            sale.ForEach(sala=>{
                Context.Sale.Remove(sala);
            });
            Context.Bioskopi.Remove(bioskop);
            await Context.SaveChangesAsync();
        }
        [HttpPut]
        [Route("IzmeniBioskop")]
        public async Task UpdateBioskop(BioskopK bioskop)
        {
            Context.Bioskopi.Update(bioskop);
            await Context.SaveChangesAsync();
        }
         [HttpGet]
        [Route("PreuzmiSalu")]
         public async Task<JsonResult> GetSala()
       {
           var sala=await Context.Sale.ToListAsync();
           return new JsonResult(sala);
        }
        [HttpPost]
        [Route("DodajSalu/{idBioskopa}")]
        public async Task AddSala(int idBioskopa,Sala sala)
        {
            var bioskop=await Context.Bioskopi.FindAsync(idBioskopa);
            sala.Bioskop=bioskop;
            Context.Sale.Add(sala);
            await Context.SaveChangesAsync();

        }
        [HttpDelete]
        [Route("ObrisiSalu/{id}")]
        public async Task DeleteSala(int id)
        {
            var sala= await Context.Sale.FindAsync(id);
            Context.Sale.Remove(sala);
            await Context.SaveChangesAsync();
        }
        [HttpPut]
        [Route("IzmeniSalu")]
        public async Task EditSala(Sala sala)
        {
            Context.Sale.Update(sala);
            await Context.SaveChangesAsync();
        }
        [HttpGet]
        [Route("UzmiSaleIzBioksopa/{idBioskopa}")]
        public async Task<JsonResult> UzmiSveSaleIzBioskopa(int idBioskopa)
        {
            var bioskop=await Context.Bioskopi.FindAsync(idBioskopa);
            var sale=await Context.Sale.Where(x=>x.Bioskop.ID == idBioskopa).ToListAsync();
            return new JsonResult(sale);
        }
        [HttpGet]
        [Route("UzmiSveFilmoveIzSale/{idSala}")]
        public async Task<List<JsonResult>> UzmiSveFilmoveIzSale(int idSala)
        {
            var filmSala=await Context.FilmSala.Where(x=>x.Sala.ID==idSala).Include(x=>x.Film).ToListAsync();
            List<JsonResult> Filmovi=new List<JsonResult>();
            foreach(var fs in filmSala)
            {
                var film= await Context.Filmovi.Where(x=>x==fs.Film).ToListAsync();
                Filmovi.Add(new JsonResult(film));
            }
            return Filmovi;
        }
        [HttpGet]
        [Route("UzmiSveFilmSalaIzSale/{idSala}")]
        public async Task<JsonResult> UzmiSveFilmSalaIzSale(int idSala)
        {
            var filmSala=await Context.FilmSala.Where(x=>x.Sala.ID==idSala).ToListAsync();
            
            return new JsonResult(filmSala);
        }
        [HttpPost]
        [Route("DodajFilm")]
        public async Task AddFilm(Film film)
        {
            Context.Filmovi.Add(film);
            await Context.SaveChangesAsync();
        }
        [HttpGet]
        [Route("PreuzmiFilm")]
         public async Task<JsonResult> GetFilm()
       {
           var film=await Context.Filmovi.ToListAsync();
           return new JsonResult(film);
        }
         [HttpGet]
        [Route("PreuzmiFilm/{idFilma}")]
         public async Task<JsonResult> GetFilmID(int idFilma)
       {
           var film=await Context.Filmovi.FindAsync(idFilma);
           return new JsonResult(film);
        }
        [HttpPut]
        [Route("IzmeniFilm")]
        public async Task EditFilm(Film film)
        {
            Context.Filmovi.Update(film);
            await Context.SaveChangesAsync();
        }
        [HttpDelete]
        [Route("ObrisiFilm/{idBioskopa}")]
        public async Task DeleteFilm(int idBioskopa)
        {
            var film=await Context.Filmovi.FindAsync(idBioskopa);
            Context.Filmovi.Remove(film);
            await Context.SaveChangesAsync();
        }
         [HttpPost]
        [Route("DodajFilmUSalu/{idFilma}/{idSala}/{termin}")]
        public async Task DodajFilmUSalu(int idFilma,int idSala,DateTime termin)
        {
            var sala= await Context.Sale.Where(x=>x.ID==idSala).FirstAsync();
            var film =await Context.Filmovi.Where(x=>x.ID==idFilma).FirstAsync();

            FilmSala filmSala=new FilmSala();
            filmSala.Film=film;
            filmSala.Sala=sala;
            filmSala.Termin=termin;
            
            Context.FilmSala.Add(filmSala);
            await Context.SaveChangesAsync();
        }
        [HttpPut]
        [Route("IzmeniFilmSalaTermin/{idFilmSala}/{termin}/{filmID}")]
        public async Task IzmeniTermin(int idFilmSala,DateTime termin,int filmID)
        {
            var t=await Context.FilmSala.FindAsync(idFilmSala);
            t.Termin=termin;
            t.FilmID=filmID;
            Context.FilmSala.Update(t);

            await Context.SaveChangesAsync();
        }   
        [HttpDelete]
        [Route("ObrisiFilmSala/{idFilmSala}")]
        public async Task DeleteFilmSala(int idFilmSala)
        {
            var filmSala=await Context.FilmSala.FindAsync(idFilmSala);
            Context.FilmSala.Remove(filmSala);
            await Context.SaveChangesAsync();
        }
     }
}