import { FilmSala } from "./filmSala.js";
export class Film
{
    constructor(id,naziv,zanr,vreme,glumci)
    {
        this.id=id;
        this.naziv=naziv;
        this.zanr=zanr;
        this.vremeTrajanja=vreme;
        this.glumci=glumci;

        this.FilmSalaNiz=new Array();
    }

    crtaj(tbody,termin)
    {
        this.FilmSalaNiz.push(termin);
        var filmTr=document.createElement("tr");
        filmTr.className="filmTr";
        tbody.appendChild(filmTr);

        var filmTd=document.createElement("td");
        filmTr.appendChild(filmTd);


        var select=document.createElement("select");
        select.name="select";
        select.style.display="none"
        select.required=true;
        filmTd.appendChild(select);

        fetch("https://localhost:5001/Bioskop/PreuzmiFilm", {

         method:"GET"
        }).then(p => p.json().then(data => {
            data.forEach(film => {
                var opcija=document.createElement("option");
                opcija.value=film.id;
                opcija.innerHTML=film.naziv;
                select.appendChild(opcija);
            });
        }));


        var inputNaziv=document.createElement("input");
        inputNaziv.value=this.naziv;
        inputNaziv.type="text";
        inputNaziv.className="inputNaziv";
        inputNaziv.style.display="block";
        inputNaziv.disabled=true;
        filmTd.appendChild(inputNaziv);

        var filmTd=document.createElement("td");
        filmTr.appendChild(filmTd);

        var inputZanr=document.createElement("input");
        inputZanr.value=this.zanr;
        inputZanr.type="text";
        inputZanr.className="inputZanr";
        inputZanr.style.display="block";
        inputZanr.disabled=true;
        filmTd.appendChild(inputZanr);

        var filmTd=document.createElement("td");
        filmTr.appendChild(filmTd);

        var inputTrajanja=document.createElement("input");
        inputTrajanja.value=this.vremeTrajanja;
        inputTrajanja.type="text";
        inputTrajanja.className="inputTrajanja";
        inputTrajanja.style.display="block";
        inputTrajanja.disabled=true;
        filmTd.appendChild(inputTrajanja);

        var filmTd=document.createElement("td");
        filmTr.appendChild(filmTd);

        var inputTermin=document.createElement("input");
        inputTermin.value=termin.termin;
        inputTermin.type="datetime-local";
        inputTermin.name="datum"+termin.id;
        inputTermin.className="inputTermin";
        inputTermin.style.display="block";
        inputTermin.disabled=true;
        filmTd.appendChild(inputTermin);

        var filmTd=document.createElement("td");
        filmTr.appendChild(filmTd);

        var inputGlumci=document.createElement("input");
        inputGlumci.value=this.glumci;
        inputGlumci.type="text";
        inputGlumci.className="inputGlumci";
        inputGlumci.style.display="block";
        inputGlumci.disabled=true;
        filmTd.appendChild(inputGlumci);

        var filmTd=document.createElement("td");
        filmTr.appendChild(filmTd);

        let dugmeIzmeni=document.createElement("button");
        dugmeIzmeni.innerHTML="Izmeni";
        dugmeIzmeni.style.display="block";
        dugmeIzmeni.className="btn btn-outline-secondary dtabela";
        filmTd.appendChild(dugmeIzmeni);


        let dugmeSacuvaj=document.createElement("button");
        dugmeSacuvaj.innerHTML="Sacuvaj"; 
        dugmeSacuvaj.style.display="none";
        dugmeSacuvaj.className="btn btn-outline-success dtabela";
        filmTd.appendChild(dugmeSacuvaj);
        

        let dugmeOtkazi=document.createElement("button");
        dugmeOtkazi.innerHTML="Otkazi"; 
        dugmeOtkazi.style.display="none";
        dugmeOtkazi.className="btn btn-outline-secondary dtabela";
        filmTd.appendChild(dugmeOtkazi);

        dugmeIzmeni.onclick=(ev)=>
        {
            let staroVreme=termin.termin;

            inputNaziv.disabled=false;
            inputTermin.disabled=false;
            inputTrajanja.disabled=false;
            inputZanr.disabled=false;
            inputGlumci.disabled=false;

            select.style.display="block";
            inputNaziv.style.display="none";
            inputTrajanja.style.display="none";
            inputZanr.style.display="none";
            inputGlumci.style.display="none";

            dugmeIzmeni.style.display="none"; 
            dugmeSacuvaj.style.display="block";
            dugmeOtkazi.style.display="block";
            
            dugmeSacuvaj.onclick=(ev)=>
            {
                
                let vreme=document.querySelector('input[name="datum'+termin.id+'"]');
                let novoVreme=vreme.value;

                var filmNovi=filmTr.querySelector('select[name="select"]').value;

                let filmSala=new FilmSala();
                filmSala.izmeni(termin.id,novoVreme,filmNovi);

            }

            dugmeOtkazi.onclick=(ev)=>
            {
                inputTermin.value=staroVreme;

                
                inputNaziv.disabled=true;
                inputTermin.disabled=true;
                inputTrajanja.disabled=true;
                inputZanr.disabled=true;
                inputGlumci.disabled=true;

                select.style.display="none";
                dugmeIzmeni.style.display="block"; 
                dugmeSacuvaj.style.display="none";
                dugmeOtkazi.style.display="none";

                inputNaziv.style.display="block";
                inputTrajanja.style.display="block";
                inputZanr.style.display="block";
                inputGlumci.style.display="block";
            }


        }

        var filmTd=document.createElement("td");
        filmTr.appendChild(filmTd);

        let dugmeObrisi=document.createElement("button");
        dugmeObrisi.innerHTML="Obrisi";
        dugmeObrisi.className="btn btn-outline-danger dtabela";
        filmTd.appendChild(dugmeObrisi);

        dugmeObrisi.onclick=(ev)=>
        {

            let filmSala=new FilmSala();
            filmSala.Obrisi(termin.id);
        }
    }}