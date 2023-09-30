let myform = document.querySelector("form")
let myTabla = document.querySelector("#myData");
let total = document.querySelector("#total");
let elementos;



async function crearTabla (){ 
    let res = await ( await fetch("http://localhost:3000/registros")).json();
    res.forEach(element => {
        myTabla.insertAdjacentHTML("beforeend",`
            <tr class ="updateEvent" >

                <td> ${element.id} </td>
                <td>  ${element.valor} </td>
                <td> ${element.caja} </td>


            </tr>`
            )        
        }
    ); 
    let modificar = null;
    elementos =  document.querySelectorAll(".updateEvent  :nth-child(2), .updateEvent   :nth-child(3)");    
    elementos.forEach( (x)  =>  x.addEventListener("click",  async(j) => {
        if(!modificar){
            let valoraCambiar = (j.target)
            modificar = document.createElement("div");
            let plantilla ='<input type="text" class="inputValorNuevo" placeholder="Ingrese un nuevo valor">'
            modificar.innerHTML = plantilla;
            valoraCambiar.parentNode.parentNode.insertBefore(modificar,valoraCambiar.parentNode.nextSibling)
            let fila = valoraCambiar.parentNode;
            modificar.children[0].addEventListener("keydown",async (e)=>{
                let nuevoContenido = e.target;
                if (e.key === 'Enter')  {
                    if(valoraCambiar.parentNode.children[1] === valoraCambiar){
                        if (isNaN(Number(nuevoContenido.value))){
                            alert("por favor ingresa un numero");
                            return ;
                        }
                    }else{
                        let caja = ["ingreso","egreso"];
                        if (!isNaN(Number(nuevoContenido.value))){
                            alert("por favor ingresa un string con el tipo de caja");
                            return ;
                        }
                        else if( !caja.includes(nuevoContenido.value.toLowerCase()) ) {
                            alert("solo puedes ingresar : ingreso y egreso");
                            return ;
                        }
                        
                    }
                    valoraCambiar.textContent = nuevoContenido.value;  
                    nuevoContenido.parentNode.remove(); 
                    modificar=null; 
                    let config = {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "valor": Number(fila.children[1].textContent) ,
                            "caja": (fila.children[2].textContent ),
                            "id": fila.children[0].textContent
                        })
                    };
                    let id = Number(fila.children[0].textContent)
                    console.log(id)
                    let res2 = await (await fetch(`http://localhost:3000/registros/${id}`,config)).json();
                    console.log(res2)
                }
            }
            )
        }
    }))
    let eliminar = document.querySelectorAll(".updateEvent  :nth-child(1)");
    eliminar.forEach(x =>{
        x.addEventListener('mouseenter',()=>x.style.cursor = "pointer");
        x.addEventListener('mouseleave',()=>x.style.cursor = "auto");
        x.addEventListener('click',async()=>{
            let config = {
                method: "DELETE",
                headers : {"Content-type": "application/json"},
            }
            let id = Number(x.textContent);
            
            let res = await (await fetch(`http://localhost:3000/registros/${id}`,config)).json();
            x.parentNode.remove();
            console.log(res);
            
        });
    });
};



myform.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let id = Number(myTabla.lastElementChild.firstElementChild.textContent) + 1;
    let data = Object.fromEntries( new FormData(e.target))
    data["id"] = String(id);
    const { valor }   = data;
    data.valor = (typeof valor ==="string" ) ? Number(valor) : valor;
    let config = {

        method: "POST",
        headers: {"Content-type": "application/json"},
        
        body: JSON.stringify(data)
    }
    
    let res = await (await fetch("http://localhost:3000/registros",config)).json();
    
    
        
})


crearTabla();






