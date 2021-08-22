
export class Bioskop
{
    constructor(id,naziv,adresa)
    {
        this.id=id;
        this.naziv=naziv;
        this.adresa=adresa;

        this.bioskopSale=new Array();
        this.kontejner=null;
    }
   
    crtaj(host)
    {
        if(!host) throw new Error("Greska!");

   
        let divBioskop=document.createElement("div");
        divBioskop.className="divBioskop";
        this.kontejner=divBioskop;
        host.appendChild(this.kontejner);

        let divNaslov=document.createElement("div");
        divNaslov.className="divNaslov";
        divBioskop.appendChild(divNaslov);

        
        // var noviRed=document.createElement("br");
        // divBioskop.appendChild(noviRed);

        let labNaziv=document.createElement("label");
        labNaziv.className="labNaziv";
        labNaziv.style.display="block";
        labNaziv.innerHTML=this.naziv;
        divNaslov.appendChild(labNaziv);

        let inputNaziv=document.createElement("input");
        inputNaziv.style.display="none"; 
        inputNaziv.className="naziv";
        inputNaziv.type="text";
        divNaslov.appendChild(inputNaziv);
        
        // var noviRed=document.createElement("br");
        // divBioskop.appendChild(noviRed);

        let labAdresa=document.createElement("label");
        labAdresa.className="labAdresa";
        labAdresa.style.display="block";
        labAdresa.innerHTML=this.adresa;
        divNaslov.appendChild(labAdresa);

        let inputAdresa=document.createElement("input");
        inputAdresa.style.display="none"; 
        inputAdresa.className="adresa";
        inputAdresa.type="text";
        divNaslov.appendChild(inputAdresa);
               
        // var noviRed=document.createElement("br");
        // divBioskop.appendChild(noviRed);

        let dugmeIzmeni=document.createElement("button");
        dugmeIzmeni.innerHTML="Izmeni";
        dugmeIzmeni.className="btn btn-outline-secondary dugme";
        dugmeIzmeni.style.display="block";
        divNaslov.appendChild(dugmeIzmeni);

        let dugmeSacuvaj=document.createElement("button");
        dugmeSacuvaj.innerHTML="Sacuvaj";
        dugmeSacuvaj.className="btn btn-outline-success dugme";
        dugmeSacuvaj.style.display="none";
        divNaslov.appendChild(dugmeSacuvaj);

        let dugmeOtkazi=document.createElement("button");
        dugmeOtkazi.innerHTML="Otkazi";

        dugmeOtkazi.className="btn btn-outline-secondary dugme";
        dugmeOtkazi.style.display="none";
        divNaslov.appendChild(dugmeOtkazi);

        dugmeIzmeni.onclick=(ev)=>

        {
            labNaziv.style.display="none";
            labAdresa.style.display="none";

            inputNaziv.style.display="block";
            inputAdresa.style.display="block";

            dugmeIzmeni.style.display="none";
            dugmeSacuvaj.style.display="block";
            dugmeOtkazi.style.display="block";
            divNaslov.querySelector(".naziv").value=this.naziv;
            divNaslov.querySelector(".adresa").value=this.adresa;
            
        }

        dugmeSacuvaj.onclick=(ev)=>
        {
            let naziv=divNaslov.querySelector(".naziv").value;
            let adresa=divNaslov.querySelector(".adresa").value;
            fetch("https://localhost:5001/Bioskop/IzmeniBioskop/",{
                method:"PUT",
                    headers:{
                            "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        "id":this.id,
                        "naziv":naziv,
                        "adresa":adresa
                    })      
            }).then(p=>{
                if(p.ok)
                {
                    console.log("PROSLO");
                    labNaziv.innerHTML=naziv;
                    labNaziv.style.display="block";
                    labAdresa.innerHTML=adresa;
                    labAdresa.style.display="block";

                    inputNaziv.style.display="none";
                    inputAdresa.style.display="none";

                    dugmeIzmeni.style.display="block";
                    dugmeSacuvaj.style.display="none";
                    dugmeOtkazi.style.display="none";
                }
                else
                {
                    console.log("NIJE PROSLO");  
                    labNaziv.innerHTML=this.naziv;
                    labNaziv.style.display="block";
                    labAdresa.innerHTML=this.adresa;
                    labAdresa.style.display="block";

                    inputNaziv.style.display="none";
                    inputAdresa.style.display="none";

                    dugmeIzmeni.style.display="block";
                    dugmeSacuvaj.style.display="none";
                    dugmeOtkazi.style.display="none";

                    
                }
            })

        }

        dugmeOtkazi.onclick=(ev)=>
        {
            labNaziv.innerHTML=this.naziv;
            labNaziv.style.display="block";
            labAdresa.innerHTML=this.adresa;
            labAdresa.style.display="block";

            inputNaziv.style.display="none";
            inputAdresa.style.display="none";

            dugmeIzmeni.style.display="block";
            dugmeSacuvaj.style.display="none";
            dugmeOtkazi.style.display="none";
        }
        // var noviRed=document.createElement("br");
        // divBioskop.appendChild(noviRed);

        let dugmeObrisi=document.createElement("button");
        dugmeObrisi.innerHTML="Obrisi";
        dugmeObrisi.className="btn btn-outline-danger dugme";
        divNaslov.appendChild(dugmeObrisi);

        dugmeObrisi.onclick=(ev)=>
        {
            fetch("https://localhost:5001/Bioskop/ObrisiBioskop/"+this.id, {
            method: "DELETE"
            }).then(p => {
            if(p.ok) {

                alert("Uspesno ste obrisali Bisokop "+this.naziv+" "+this.adresa+" ! ");
                document.location.reload()
            }
            else{
                alert("Doslo je do greske!");
            }
            });
        }

        
        this.dodajSaluUBioskop(divBioskop);
              
    }
    dodajSaluUBioskop(divBioskop)
    {
        fetch("https://localhost:5001/Bioskop/UzmiSaleIzBioksopa/"+this.id, {

            method:"GET"
           }).then(p => p.json().then(data => {
               if(data.length > 0)
               {
               data.forEach(el => {
               
                    let divSale=document.createElement("div");
                    divSale.className="divSale";
                    divBioskop.appendChild(divSale);
            
                    let divNaslov=document.createElement("div");
                    divNaslov.className="divNaslov";
                    divSale.appendChild(divNaslov);
            
                    let labSale=document.createElement("h4");
                    labSale.className="labSale";
                    labSale.innerHTML="Sala: "+el.oznaka;
                    divNaslov.appendChild(labSale);
    
                    let dugmeObrisi=document.createElement("button");
                    dugmeObrisi.innerHTML="Obrisi";
                    dugmeObrisi.className="btn btn-outline-danger";
                    divNaslov.appendChild(dugmeObrisi);
    
                    dugmeObrisi.onclick=(ev)=>
                    {
                        this.ObrisiSalu(ev,el);
                    }
    
    
                    this.UzmiTermieZaSalu(el.id,divSale); 
    
                })
            }
           }));
    }

    ObrisiSalu(ev,sala)
    {
        fetch("https://localhost:5001/Bioskop/ObrisiSalu/"+sala.id, {
            method: "DELETE"
        }).then(p => {
            if(p.ok) {

                alert("Uspesno ste obrisali salu "+sala.naziv+"!");
                document.location.reload()
            }
            else{
                alert("Doslo je do greske!");
            }
        });
    }
    UzmiTermieZaSalu(id,divSale)
    {
        if(id != null)
        {
                    
        let divTermin=document.createElement("div");
        divTermin.className="divTermin";
        divSale.appendChild(divTermin);

        let labFilm=document.createElement("h5");
        labFilm.className="labFilm";
        labFilm.innerHTML="Filmovi:";
        divTermin.appendChild(labFilm);

        
        var noviRed=document.createElement("br");
        divTermin.appendChild(noviRed);

        let filmTabela=document.createElement("table");
        // filmTabela.className="table";
        filmTabela.className="table";
        divTermin.appendChild(filmTabela);

        let thead=document.createElement("thead");
        // thead.className="table-dark";
        filmTabela.appendChild(thead);

        let filmTr=document.createElement("tr");
        thead.appendChild(filmTr);

        var naziv=document.createElement("th");
        filmTr.appendChild(naziv);

        var lab=document.createElement("label");
        lab.innerHTML="Naziv";
        naziv.appendChild(lab);

        var zanr=document.createElement("th");
        filmTr.appendChild(zanr);

        var lab=document.createElement("label");
        lab.innerHTML="Zanr";
        zanr.appendChild(lab);


        var trajanje=document.createElement("th");
        filmTr.appendChild(trajanje); 

        var lab=document.createElement("label");
        lab.innerHTML="Trajanje (u minutima)";
        trajanje.appendChild(lab);

        var termin=document.createElement("th");
        filmTr.appendChild(termin);

        var lab=document.createElement("label");
        lab.innerHTML="Termin";
        termin.appendChild(lab);

        var glumci=document.createElement("th");
        filmTr.appendChild(glumci);

        var lab=document.createElement("label");
        lab.innerHTML="Glumci";
        glumci.appendChild(lab);

        var filmTh=document.createElement("th");
        filmTr.appendChild(filmTh);
        
        var filmTh=document.createElement("th");
        filmTr.appendChild(filmTh);
        var filmTh=document.createElement("th");
        filmTr.appendChild(filmTh);
        

        let tbody=document.createElement("tbody");
        filmTabela.appendChild(tbody);

        let br=0;
       
        fetch("https://localhost:5001/Bioskop/UzmiSveFilmSalaIzSale/"+id, {

            method:"GET"
           }).then(p => p.json().then(data => {
               data.forEach(el => {
                
               this.UzmiFilm(el,tbody);
               
               })}));
            }
    }
    UzmiFilm(termin,tbody)
    {

        fetch("https://localhost:5001/Bioskop/PreuzmiFilm/"+termin.filmID, {

            method:"GET"
           }).then(p => p.json().then(data => {

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
                    inputNaziv.value=data.naziv;
                    inputNaziv.type="text";
                    inputNaziv.name="naziv"+termin.id;
                    inputNaziv.className="inputNaziv";
                    inputNaziv.style.display="block";
                    inputNaziv.disabled=true;
                    filmTd.appendChild(inputNaziv);

                    var filmTd=document.createElement("td");
                    filmTr.appendChild(filmTd);

                    var inputZanr=document.createElement("input");
                    inputZanr.value=data.zanr;
                    inputZanr.type="text";
                    inputZanr.name="zanr"+termin.id;
                    inputZanr.className="inputZanr";
                    inputZanr.style.display="block";
                    inputZanr.disabled=true;
                    filmTd.appendChild(inputZanr);

                    var filmTd=document.createElement("td");
                    filmTr.appendChild(filmTd);

                    var inputTrajanja=document.createElement("input");
                    inputTrajanja.value=data.vremeTrajanja;
                    inputTrajanja.type="text";
                    inputTrajanja.name="trajanje"+termin.id;
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
                    inputGlumci.value=data.glumci;
                    inputGlumci.type="text";
                    inputGlumci.name="glumci"+termin.id;
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
                        //show drugo dugmeq

                        let staroVreme=termin.termin;

                        inputNaziv.disabled=false;
                        inputTermin.disabled=false;
                        inputTrajanja.disabled=false;
                        inputZanr.disabled=false;
                        inputGlumci.disabled=false;

                        select.style.display="block";
                        inputNaziv.style.display="none";
                      //  inputTermin.style.display="none";
                        inputTrajanja.style.display="none";
                        inputZanr.style.display="none";
                        inputGlumci.style.display="none";

                        dugmeIzmeni.style.display="none"; //ne prikazuje se
                        dugmeSacuvaj.style.display="block";
                        dugmeOtkazi.style.display="block";
                        
                        dugmeSacuvaj.onclick=(ev)=>
                        {
                            
                            let vreme=document.querySelector('input[name="datum'+termin.id+'"]');
                            let novoVreme=vreme.value;

                           
                            fetch("https://localhost:5001/Bioskop/IzmeniFilmSalaTermin/"+termin.id+"/"+novoVreme,{
                            method:"PUT",
                                headers:{
                                //   "Accept": "application/json; charset=utf-8",
                                    "Content-Type": "application/json"
                                },
                                body:JSON.stringify({
                                    
                                })      
                            }).then(p=>{
                                if(p.ok)
                                {
                                    console.log("PROSLO");
                                    inputTermin.value=novoVreme;

                                    inputTermin.disabled=true;
                                    dugmeIzmeni.style.display="block"; 
                                    dugmeSacuvaj.style.display="none";
                                    dugmeOtkazi.style.display="none";

                                }
                                else
                                {
                                    console.log("NIJE PROSLO");  
                                    inputTermin.value=staroVreme;

                                    inputTermin.disabled=true;
                                    dugmeIzmeni.style.display="block"; 
                                    dugmeSacuvaj.style.display="none";
                                    dugmeOtkazi.style.display="none";
                                }
                            })

                            var filmID=filmTr.querySelector('select[name="select"]').value;
                  
                            
                            fetch("https://localhost:5001/Bioskop/PreuzmiFilm/"+filmID,{
                                method:"GET"
                            }).then(p => p.json().then(data => {
                                if(p.ok)
                                {
                                    console.log("PROSLO");
                                    inputNaziv.value=data.naziv;


                                    inputNaziv.disabled=true;
                                    inputTermin.disabled=true;
                                    inputTrajanja.disabled=true;
                                    inputZanr.disabled=true;
                                    inputGlumci.disabled=true;

                                    inputNaziv.value=data.naziv;
                                   // inputTermin.value=data.termin;
                                    inputTrajanja.value=data.vremeTrajanja;
                                    inputZanr.value=data.zanr;
                                    inputGlumci.value=data.glumci;

                                    
                                    select.style.display="none";
                                    dugmeIzmeni.style.display="block"; 
                                    dugmeSacuvaj.style.display="none";
                                    dugmeOtkazi.style.display="none";

                                    
                                    inputNaziv.style.display="block";
                                    //  inputTermin.style.display="none";
                                    inputTrajanja.style.display="block";
                                    inputZanr.style.display="block";
                                    inputGlumci.style.display="block";
                                    
                                }
                                else
                                {
                                    console.log("NIJE PROSLO");  
    
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
                                    //  inputTermin.style.display="none";
                                    inputTrajanja.style.display="block";
                                    inputZanr.style.display="block";
                                    inputGlumci.style.display="block";
                                }
                            }))   

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
                            //  inputTermin.style.display="none";
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
                        fetch("https://localhost:5001/Bioskop/ObrisiFilmSala/"+termin.id, {
                            method: "DELETE"
                        }).then(p => {
                            if(p.ok) {

                                alert("Uspesno ste obrisali film!");
                                document.location.reload()
                            }
                            else{
                                alert("Doslo je do greske!");
                            }
                        });
                    }
                }));
        
    }

    

}